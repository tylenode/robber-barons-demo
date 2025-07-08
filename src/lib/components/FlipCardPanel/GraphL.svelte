<!-- GraphL.svelte – median LIST price (condo + 1‑fam‑res) -->
<script lang="ts">
    import * as d3 from 'd3';
    import { A2EDAdata } from '$lib/stores/A2EDAdata';

    export let neighborhoodNames: string[] = [];

    interface Pt { name: string; price: number; }

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

    /* reactive pieces */
    let data: Pt[] = [];
    let xScale: d3.ScalePoint<string>;
    let yScale: d3.ScaleLinear<number, number>;
    let line:   d3.Line<Pt>;
    let xAxisEl: SVGGElement;
    let yAxisEl: SVGGElement;

    /* helper to format tick labels */
    const fmtTick = (v: number) =>
        v >= 1_000_000 ? `$${d3.format('.1f')(v / 1_000_000)}M`
                       : `$${d3.format('~s')(v).replace('k', 'k')}`;

    /* recompute whenever store or props change */
    $: if ($A2EDAdata) {
        data = neighborhoodNames.map(n => {
            const rows = $A2EDAdata.filter(r =>
                r.neighborhood === n &&
                (r.usage === 'CONDOMINIUM' || r.usage === '1-FAM RES')
            );
            let price = rows.length ? d3.median(rows, r => r.price)! : 0;
            if (n === 'MIT') price = 80_000_000_000;   // special 80 B case
            return { name: n, price };
        });

        /* X‑scale: point by neighborhood */
        xScale = d3.scalePoint<string>()
            .domain(data.map(d => d.name))
            .range([usable.left, usable.right])
            .padding(0.5);

        /* Y‑scale: 0 → 110 % of max   */
        const maxPrice = d3.max(data, d => d.price) ?? 0;
        yScale = d3.scaleLinear()
            .domain([0, maxPrice * 1.1])
            .range([usable.bottom, usable.top])
            .nice();

        /* generator for the single line */
        line = d3.line<Pt>()
            .x(d => xScale(d.name)!)
            .y(d => yScale(d.price))
            .curve(d3.curveMonotoneX);

        /* axes (Y – exactly 4 ticks) */
        if (xAxisEl) {
            d3.select(xAxisEl)
                .call(d3.axisBottom(xScale))
                .selectAll('text')
                    .attr('transform', 'rotate(-45)')
                    .style('text-anchor', 'end');
        }
        if (yAxisEl) {
            d3.select(yAxisEl)
                .call(d3.axisLeft(yScale)
                        .ticks(3)
                        .tickFormat(fmtTick as any));
        }
    }

    /* tooltip state */
    export let activeNeighborhood: string | null = null;   // <— new
    let tip = { visible: false, x: 0, y: 0, label: '' };

    let svgEl: SVGSVGElement;              // we need its bounding‑box for coord conversion

    /* whenever the “scroll focus” changes, refresh the tooltip */
    $: if (activeNeighborhood && data.length && xScale && yScale && svgEl) {
        const p = data.find(d => d.name === activeNeighborhood);
        if (p) {
            const svgRect = svgEl.getBoundingClientRect();
            const sx = svgRect.width  / width;    // viewBox → CSS pixels
            const sy = svgRect.height / height;

            tip.visible = true;
            tip.label   = `${p.name}: ${fmtTick(p.price)}`;
            tip.x       = svgRect.left + xScale(p.name)! * sx;
            tip.y       = svgRect.top  + yScale(p.price)   * sy;
        }
    } else {
        tip.visible = false;
    }
</script>

<div class="graphL">
    <svg viewBox={`0 0 ${width} ${height}`} bind:this={svgEl}>
        <!-- axes -->
        <g class="axis x-axis" transform={`translate(0,${usable.bottom})`} bind:this={xAxisEl}/>
        <g class="axis y-axis" transform={`translate(${usable.left},0)`}     bind:this={yAxisEl}/>
        
        {#if yScale}
            <!-- Dashed line at $431,250 -->
            <line
                x1={usable.left}
                x2={usable.right}
                y1={yScale(431250)}
                y2={yScale(431250)}
                stroke="black"
                stroke-width="2"
                stroke-dasharray="6,6"
            />
            <!-- Label for the national average -->
            <text
                x={usable.right - 5}
                y={yScale(431250) - 8}
                text-anchor="end"
                fill="black"
                font-size="13"
                font-weight="bold"
            >
                National Median ($431,250)
            </text>
        {/if}

        {#if data.length}
            <!-- single median‑price line -->
            <path
                d={line(data)}
                fill="none"
                stroke="seagreen"
                stroke-width="3"
                stroke-linecap="round"/>

            <!-- circles for hover -->
            {#each data as p}
                <circle
                    class:active={p.name === activeNeighborhood}
                    cx={xScale(p.name)}
                    cy={yScale(p.price)}
                    r="6"
                    fill="seagreen"
                    stroke="white"
                    stroke-width="2"
                    on:mouseenter={() => { tip.visible = true; tip.label = `${p.name}: ${fmtTick(p.price)}`; }}
                    on:mousemove={(e) => { tip.x = e.clientX; tip.y = e.clientY; }}
                    on:mouseleave={() => tip.visible = false }/>
            {/each}
        {/if}
    </svg>

    {#if tip.visible}
        <div class="tooltip" style="left:{tip.x + 10}px; top:{tip.y + 10}px;">
            {tip.label}
        </div>
    {/if}
</div>

<style>
     .graphL {
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
