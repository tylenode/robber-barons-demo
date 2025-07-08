<script lang="ts">
    import * as d3 from 'd3';

    /** Neighborhoods in the order you want them plotted */
    // export let sortedNeighborhoods: string[] = [];
    export let neighborhoodNames: string[] = [];

    /* -------- average RENT (1‑bed) -------- */
    const rentByNeighborhood: Record<string, number> = {
        'Dorchester': 2393, 'Mattapan': 2109,   'Roxbury': 2279,
        'West Roxbury': 2057, 'West End': 3271, 'South Boston': 2917,
        'Hyde Park': 2186,   'Roslindale': 2148,'Jamaica Plain': 2468,
        'Brighton': 2381,    'East Boston': 2405,'Allston': 2512,
        'Fenway': 2974,      'North End': 2766, 'Chinatown': 3815,
        'Downtown': 2963,    'Charlestown': 2756,'Longwood': 3000,
        'Seaport': 4816,     'Beacon Hill': 2853
    };

    interface Pt { name: string; rent: number; }
    /* NEW — the neighbourhood that should light up */
    export let activeNeighborhood: string | null = null;

    /* NEW — we need the SVG’s bounding box to convert to screen px */
    let svgEl: SVGSVGElement;

    /* ----- SVG sizing ----- */
    const width  = 1000;
    const height = 200;
    const margin = { top: 20, right: 80, bottom: 100, left: 40 };
    const usable = {
        left:   margin.left,
        right:  width - margin.right,
        top:    margin.top,
        bottom: height - margin.bottom
    };

    /* ----- reactive D3 pieces ----- */
    let data: Pt[]                  = [];
    let xScale: d3.ScalePoint<string>;
    let yScale: d3.ScaleLinear<number, number>;
    let line:   d3.Line<Pt>;
    let xAxisEl: SVGGElement;
    let yAxisEl: SVGGElement;

    $: {
        /* filter + map to the rent values we know */
        data = neighborhoodNames
            .filter(n => n in rentByNeighborhood)
            .map(n => ({ name: n, rent: rentByNeighborhood[n] }));

        /* x: point scale across neighborhoods  */
        xScale = d3.scalePoint<string>()
            .domain(data.map(d => d.name))
            .range([usable.left, usable.right])
            .padding(0.5);

        /* y: linear 0 → 110 % of max rent */
        const maxRent = d3.max(data, d => d.rent) ?? 0;
        yScale = d3.scaleLinear()
            .domain([0, maxRent * 1.1])
            .nice()
            .range([usable.bottom, usable.top]);

        /* generator for the single line */
        line = d3.line<Pt>()
            .x(d => xScale(d.name)!)
            .y(d => yScale(d.rent))
            .curve(d3.curveMonotoneX);

        /* draw / update axes */
        if (xAxisEl) {
            d3.select(xAxisEl)
                .call(d3.axisBottom(xScale))
                .selectAll('text')
                    .attr('transform', 'rotate(-45)')
                    .style('text-anchor', 'end');
        }
        if (yAxisEl) {
            d3.select(yAxisEl)
                .call(
                d3.axisLeft(yScale)
                    .ticks(3) // <-- reduce number of ticks here
                    .tickFormat(d => `$${d}`)
            );
        }
    }

    /* simple tooltip state */
    let tipVisible = false;
    let tipX = 0, tipY = 0;
    let tipLabel = '';

    $: if (activeNeighborhood && data.length && xScale && yScale && svgEl) {
    const p = data.find(d => d.name === activeNeighborhood);
    if (p) {
        const rect = svgEl.getBoundingClientRect();
        const sx   = rect.width  / width;   // viewBox → CSS‑px scale
        const sy   = rect.height / height;

        tipVisible = true;
        tipLabel   = `${p.name}: $${p.rent}`;
        tipX       = rect.left + xScale(p.name)! * sx;
        tipY       = rect.top  + yScale(p.rent)   * sy;
    }
} else {
    tipVisible = false;
}
</script>

<div class="graphR">
    <svg viewBox={`0 0 ${width} ${height}`} bind:this={svgEl}>
        <!-- axes -->
        <g class="axis x-axis" transform={`translate(0,${usable.bottom})`} bind:this={xAxisEl} />
        <g class="axis y-axis" transform={`translate(${usable.left},0)`}     bind:this={yAxisEl} />
        
        {#if yScale}
            <!-- Dashed line at $1625 -->
            <line
                x1={usable.left}
                x2={usable.right}
                y1={yScale(1625)}
                y2={yScale(1625)}
                stroke="black"
                stroke-width="2"
                stroke-dasharray="6,6"
            />
            <!-- Label for the national average -->
            <text
                x={usable.right - 5}
                y={yScale(1625) - 8}
                text-anchor="end"
                fill="black"
                font-size="13"
                font-weight="bold"
            >
                National Avg ($1,625)
            </text>
        {/if}

        {#if data.length}
            <!-- single rent‑trend line -->
            <path
                d={line(data)}
                fill="none"
                stroke="steelblue"
                stroke-width="3"
                stroke-linecap="round"/>

            <!-- circles for interaction -->
            {#each data as p}
                <circle
                    class:active={p.name === activeNeighborhood}
                    cx={xScale(p.name)}
                    cy={yScale(p.rent)}
                    r="6"
                    fill="steelblue"
                    stroke="white"
                    stroke-width="2"
                    on:mouseenter={() => { tipVisible = true; tipLabel = `${p.name}: $${p.rent}`; }}
                    on:mousemove={(e) => { tipX = e.clientX; tipY = e.clientY; }}
                    on:mouseleave={() => { tipVisible = false; }} />
            {/each}
        {/if}
    </svg>

    {#if tipVisible}
        <div class="tooltip" style="left:{tipX + 10}px; top:{tipY + 10}px;">
            {tipLabel}
        </div>
    {/if}
</div>

<style>
    .graphR {
        /* width: 100%;
        width: 100
        position: relative; */
        width: 120rem;

    }
    svg { width: 105%; height: 100%;  overflow: visible; }
    circle.active {
        r: 9;              /* enlarge the focused dot */
        stroke: orange;
        stroke-width: 3;
    }
    g.axis text { font-size: 12px; fill: hsl(0 0% 20%); }
    .tooltip {
        position: fixed;
        background: #383837;
        color: #fff;
        padding: 0.4em 0.8em;
        border-radius: 6px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 999;
        font-size: 0.9rem;
    }
</style>