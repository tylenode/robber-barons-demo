<!-- Oliver Rayner, April 2025 -->

<script lang="ts">
    import { onMount } from "svelte"
    import * as d3 from 'd3'

    import no_data from '$lib/images/howtoplay.svg'
    import sort_me from '$lib/images/sort_me.svg'

    import { pileMap } from "$lib/stores/CardData";
    export let neighborhoods: string[] = ["Allston"]
    export let neighborhoods_unselected: string[] = []
    pileMap.subscribe(map => {
        neighborhoods = map.get("bottom") ?? []
        neighborhoods_unselected = map.get("top") ?? []
    })

    import { CorporateOwnershipdata } from "$lib/stores/CorporateOwnershipdata";
    import type { CorporateOwnershipdataItem } from "$lib/stores/CorporateOwnershipdata";
    import { colorMap, cardRefs } from "$lib/stores/CardData";
    import { fade } from "svelte/transition";
    import { get } from "svelte/store";

    interface ProcessedData {
        year: Date,
        corp_own_rate: number
    }

    interface NeighborhoodData {
        name: string,
        values: ProcessedData[]
    }

    let processed_data: NeighborhoodData[] = [];
    let trend_data:NeighborhoodData;
 
    let width = 1000, height = 600;
    let margin = {top: 5, right: 5, bottom: 30, left: 5};

    let usableArea: {[key:string]:any} = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left,
        width: null,
        height: null,
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

    let xAxis: any, yAxis: any;
    let data: CorporateOwnershipdataItem[] = [];

    let tooltipVisible = false;
    let tooltipText = '';
    let tooltipX = 0;
    let tooltipY = 0;

    onMount(async () => {

    });

    $: if ($CorporateOwnershipdata) {
        neighborhoods = neighborhoods.map(name =>
            name === "Seaport" ? "South Boston Waterfront" : name
        );

        processed_data = neighborhoods.map(name => {
            const filtered = $CorporateOwnershipdata
                .filter(d => d.neighborhood === name)
                .map(d => ({
                    year: d.year,
                    corp_own_rate: d.corp_own_rate
                }))
                .sort((a, b) => a.year.getTime() - b.year.getTime());

            return {
                name: name == 'South Boston Waterfront' ? 'Seaport' : name,
                values: filtered
            };
        });

        const yearMap = new Map<string, { date: Date; rates: number[] }>();
        for (const neighborhood of processed_data) {
            for (const entry of neighborhood.values) {
                const key = entry.year.toISOString();
                if (!yearMap.has(key)) {
                    yearMap.set(key, { date: entry.year, rates: [] });
                }
                yearMap.get(key)!.rates.push(entry.corp_own_rate);
            }
        }

        const avgValues = Array.from(yearMap.values())
            .map(({ date, rates }) => ({
                year: date,
                corp_own_rate: d3.mean(rates)!
            }))
            .sort((a, b) => a.year.getTime() - b.year.getTime());

        trend_data = {
            name: "Average",
            values: avgValues
        };      

    }

    // Flatten data to find global min/max and extent
    $: allValues = processed_data.flatMap(d => d.values);
    $: xScale = d3.scaleTime()
        .domain([new Date(2004, 0, 1), new Date(2024, 0, 1)])
        .range([usableArea.left, usableArea.right]);

    $: minVal = d3.min(allValues, d => d.corp_own_rate);
    $: maxVal = d3.max(allValues, d => d.corp_own_rate);
    let maxValTrend, minValTrend;
    $: if ($CorporateOwnershipdata) { 
        maxValTrend = d3.max(trend_data.values, d => d.corp_own_rate) 
        minValTrend = d3.min(trend_data.values, d => d.corp_own_rate)
    }
    // $: maxValTrend = 0.5
    let y2006;
    $: if ($CorporateOwnershipdata) { y2006 = trend_data.values.find(d => +d.year === +new Date(2004, 0, 1)) }
    // $: y2006 = { year: 2006, corp_own_rate: 0.1 }
    $: avgPercentChange = (() => {
        
        if (processed_data.length < 0) return 0;
        const val = (trend_data.values[trend_data.values.length - 1].corp_own_rate - trend_data.values[0].corp_own_rate) / trend_data.values[0].corp_own_rate
        return val

    })

    $: yScale = d3.scaleLinear()
        .domain([0! * 0.9, 0.4! * 1.1])
        .range([usableArea.bottom, usableArea.top]);

    $: lineGenerator = d3.line<ProcessedData>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.corp_own_rate));

    $: {

        if (processed_data.length >= 0) {

            // X AXIS
            d3.select(xAxis).call(
                d3.axisBottom(xScale)
                .ticks(d3.timeYear.every(1)) // Tick every 3 months
                .tickFormat((d, i) => {
                    const date = new Date(d as Date)
                    const year = date.getFullYear();
                    return i % 3 === 1 ? `${year}` : ""
                })
            )
            .selectAll("path")
                .style("stroke", "hsl(0, 4%, 20%)")
            
            d3.select(xAxis).selectAll("line")
                .style("stroke", "hsl(0, 4%, 20%)")

            // Y AXIS
            const formatPercent = d3.format(".0%") 
            const yticks = d3.range(0!, 0.4! + 0.001, (0.5! - 0!)/20)

            d3.select(yAxis).call(
                d3.axisLeft(yScale)
                .tickValues(yticks)
                .tickFormat((d, i) =>     
                    (i % 2 === 0 ? formatPercent(d as number) : "")
                )
            )
            .selectAll("path")
                .style("stroke", "hsl(0, 4%, 20%)")

            d3.selectAll(yAxis).selectAll("line")
                .style("stroke", "hsl(0, 4%, 20%)")

        }

    } 

    
</script>


<div class="graph">

    <div class="graph_window">
    

        {#if processed_data.length == 0}
           <img 
                src={no_data} 
                alt="no cards selected" 
                class="no_cards"
                transition:fade={{ duration: 150 }}
           /> 
        {/if}

        <img src={sort_me} alt="sort_me" class="sort_me" />
        <div class="arrow_description">
            ↑ shows % change as an absolute measure from 2004
        </div>

        <svg viewBox="0 0 {width} {height}">

            <g class="axis x-axis" transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
            <g class="axis y-axis" transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
        
            <text
                x="{width/2}"
                y="{-20}"
                text-anchor="middle"
                font-size="30"
                fill="hsl(0, 4%, 20%)"
            >
                <tspan x={width/2}>Corp. Ownership Rate of Residential</tspan>
                <tspan x={width/2} dy=30>Property in Boston</tspan>
            </text>

             <text
                x={(usableArea.left + usableArea.right) / 2}
                y="102%"
                text-anchor="middle"
                font-size="14"
                fill="hsl(0, 4%, 20%)"
            >
                Date (yrs.)
            </text>
            <text
                x={-(usableArea.bottom + usableArea.top)/2}
                y="-10%"
                transform="rotate(-90)"
                text-anchor="middle"
                font-size="12"
                fill="#333"
            >
                Corporate Ownership Rate (%)
            </text>

            {#if processed_data.length > 0}

                {#each processed_data as neighborhoodData (neighborhoodData.name)}
                    <path
                        role="presentation"
                        d={lineGenerator(neighborhoodData.values)}
                        fill="none"
                        stroke={colorMap[neighborhoodData.name]}
                        stroke-width="5"
                        stroke-linecap="round"
                        transition:fade={{ duration: 400 }}
                        opacity="0.7"
                    />
                    <path
                        d={lineGenerator(neighborhoodData.values)}
                        fill="none"
                        stroke="transparent"
                        stroke-width="30"
                        stroke-linecap="round"
                        style="cursor: grabbing;"
                        on:mouseenter={(e) => {
                            tooltipVisible = true;
                            tooltipText = neighborhoodData.name;
                        }}
                        on:mousemove={(e) => {
                            tooltipX = e.clientX;
                            tooltipY = e.clientY;
                        }}
                        on:mouseleave={() => {
                            tooltipVisible = false;
                        }}
                        role="presentation"
                    />
                {/each}

                {#key JSON.stringify(trend_data.values)}
                    <line
                        x1={usableArea.left}
                        x2={usableArea.right}
                        y1={yScale(maxValTrend!)}
                        y2={yScale(maxValTrend!)}
                        stroke="black"
                        stroke-dasharray="20 10"
                        stroke-width="1.5"
                    />
                    <path
                        d={lineGenerator(trend_data.values)}
                        fill="none"
                        stroke="#242423"
                        stroke-width="2.5"
                        stroke-dasharray="20 10"
                        stroke-linecap="round"
                        role="presentation"
                    />
                    <line
                        x1={xScale(new Date(2006, 0, 1))}
                        y1={yScale(y2006!.corp_own_rate)}
                        x2={xScale(new Date(2006, 0, 1))}
                        y2={yScale(maxValTrend! - 0.03)}
                        stroke="hsl(0, 4%, 20%)"
                        stroke-width="3"
                        marker-end="url(#arrowhead)"
                    />
                    <line
                        x1={xScale(new Date(2005, 0, 1))}
                        y1={yScale(minValTrend!)}
                        x2={xScale(new Date(2007, 0, 1))}
                        y2={yScale(minValTrend!)}
                        stroke="black"
                        stroke-width="1.5"
                        stroke-dasharray="20 10"
                    />
                    <text
                        x={xScale(new Date(2006, 0, 1)) - 50}
                        y="{yScale(maxValTrend! + 0.01)}"
                        text-anchor="left"
                        font-size="45"
                        fill="hsl(0, 4%, 20%)"
                    >+{d3.format(".0%")(maxVal! - y2006!.corp_own_rate)} ({d3.format(".1f")(avgPercentChange() + 1)}x)
                    </text> 
                {/key}
            
            {/if}

        </svg>

        <div class="legend">
            {#each processed_data.reverse() as neighborhoodData}
                <div 
                    role="presentation"
                    class="legend-item"
                    style="cursor: pointer;"
                    on:click={() => {
                        get(cardRefs)[neighborhoodData.name].moveToPile("top")
                    }}
                >
                    <div class="legend-color" style="background-color: {colorMap[neighborhoodData.name]};"></div>
                    <span>{neighborhoodData.name}</span>
                </div>
            {/each}
            <div class="hline"></div>
            {#each neighborhoods_unselected as neighborhood}
                <div 
                    role="presentation"
                    class="legend-item"
                    style="cursor: pointer;"
                    on:click={() => {
                        get(cardRefs)[neighborhood].moveToPile("bottom")
                    }}
                >
                    <div class="legend-color" style="background-color: {colorMap[neighborhood]}; opacity: 0.15;"></div>
                    <span>{neighborhood}</span>
                </div>
            {/each}
            <div class="hline"></div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: black;"></div>
                    <span>Trend Line</span>
                </div>
        </div>

    </div>

    {#if tooltipVisible}
        <div
            class="tooltip"
            style="
                position: fixed;
                left: {tooltipX + 10}px;
                top: {tooltipY + 10}px;
            "
        >
            <div class="legend-color" style="background-color: {colorMap[tooltipText]};"></div> {tooltipText}
        </div>
    {/if}


</div>


<style>
    svg {
        overflow: visible;
        width: 80%;
        padding-left: 10%;
        /* border: 1px solid blue; */
    }
    g.axis {
        font-size: 16pt;
    }
    .graph {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: -5000;
    }
    .graph_window {
        display: flex;
    }
    .legend {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 0.175rem;
        justify-content: center; /* Center horizontally */
        color: hsl(0, 4%, 20%);
        font-size: clamp(0.4rem, 8px, 1.5rem);
        margin-left: 2rem;
        /* border: 1px solid red; */
        width: 15%;
        overflow: visible;
    }
    .legend-item {
        display: flex;
        align-items: center;
    }

    .legend-color {
        width: clamp(7.5px, 1rem, 12.5px);
        height: clamp(7.5px, 1rem, 12.5px); 
        border-radius: clamp(1px, 0.5rem, 3px);
        margin-right: 0.5rem;
    }

    .tooltip {
        background:#383837;
        color: white;
        padding: 0.5em 1em;
        border-radius: 6px;
        pointer-events: none;
        font-size: 1rem;
        white-space: nowrap;
        z-index: 999;
        display: flex;
    }
    .hline {
        border-top: clamp(1px, 0.1rem, 3px) solid black;
        border-radius: 6px;
    }
    .no_cards {
        position: absolute;
        width: 60%;
        top: 30%;
        left: 20%;
    }
    .sort_me {
        position: absolute;
        top: -7%;
        width: 20%;
        right: -5%;
        z-index: -5000;
    }
    .arrow_description {
        position: absolute;
        bottom: 7%;
        right: 20%;
        text-align: right;
        font-size: clamp(0.4rem, 8px, 1.5rem);
    }
</style>