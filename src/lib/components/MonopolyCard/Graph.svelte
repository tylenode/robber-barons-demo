<!-- Oliver Rayner, April 2025 -->

<script lang="ts">
    import { onMount } from "svelte"
    import * as d3 from 'd3'

    export let neighborhood_name = "Allston"

    import { CorporateOwnershipdata } from "$lib/stores/CorporateOwnershipdata";
    import type { CorporateOwnershipdataItem } from "$lib/stores/CorporateOwnershipdata";
    import { dataLoaded } from "$lib/stores/CurrentCard";

    interface ProcessedData {
        year: Date,
        corp_own_rate: number
    }

    let processed_data: ProcessedData[] = [];

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

    onMount(async () => {

    });

    $: if ($CorporateOwnershipdata) {

        if (neighborhood_name == "Seaport") neighborhood_name = "South Boston Waterfront" // Hacky fix for Seaport

        data = $CorporateOwnershipdata.filter(d => d.neighborhood==neighborhood_name)
        processed_data = Array.from(data, (d) => ({
            year: d.year,
            corp_own_rate: d.corp_own_rate
        })).sort((a,b) => a.year.getTime() - b.year.getTime())

    }

    $: xScale = d3.scaleTime()
        .domain(d3.extent(processed_data, d => d.year) as [Date, Date])
        .range([usableArea.left, usableArea.right]);

    $: yScale = d3.scaleLinear()
        .domain([minVal! * 0.9, maxVal! * 1.1])
        .range([usableArea.bottom, usableArea.top]);

    $: minVal = d3.min(processed_data, d => d.corp_own_rate)
    $: maxVal = d3.max(processed_data, d => d.corp_own_rate)
    $: y2006 = processed_data.find(d => +d.year === +new Date(2006, 0, 1))

    $: {

        if (processed_data.length > 0) {

            // X AXIS
            d3.select(xAxis).call(
                d3.axisBottom(xScale)
                .ticks(d3.timeYear.every(1)) // Tick every 3 months
                .tickFormat((d, i) => {
                    const date = new Date(d as Date)
                    const year = date.getFullYear();
                    return i % 4 === 2 ? `${year}` : ""
                })
            )
            .selectAll("path")
                .style("stroke", "hsl(0, 4%, 20%)")
            
            d3.select(xAxis).selectAll("line")
                .style("stroke", "hsl(0, 4%, 20%)")

            // Y AXIS
            const formatPercent = d3.format(".0%") 
            const yticks = d3.range(minVal!, maxVal! + 0.001, (maxVal! - minVal!)/10)

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

    $: lineGenerator = d3.line<ProcessedData>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.corp_own_rate));



</script>


<!-- <p>Total lines of code: {d3.mean(prices)}</p> -->
<svg viewBox="0 0 {width} {height}">

    <g class="axis x-axis" transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g class="axis y-axis" transform="translate({usableArea.left}, 0)" bind:this={yAxis} />

    <defs>
        <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="0"
        refY="3.5"
        orient="auto"
        markerUnits="strokeWidth"
        >
        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
    </defs>

    <text
        x="{width/2}"
        y="{-20}"
        text-anchor="middle"
        font-size="45"
        fill="hsl(0, 4%, 20%)"
    >
        <tspan x={width/2}>Corp. Ownership Rate of Residential</tspan>
        <tspan x={width/2} dy=45>Property in {neighborhood_name}</tspan>
    </text>

    {#if processed_data.length > 0}
        <path
            d={lineGenerator(processed_data)}
            fill="none"
            stroke="hsl(4, 93%, 42%)"
            stroke-width="7.5"
            stroke-linecap="round"
        />

        <line
            x1={usableArea.left}
            x2={usableArea.right}
            y1={yScale(maxVal!)}
            y2={yScale(maxVal!)}
            stroke="black"
            stroke-dasharray="20 10"
            stroke-width="1.5"
        />

        <line
            x1={xScale(y2006!.year)}
            y1={yScale(y2006!.corp_own_rate)}
            x2={xScale(y2006!.year )}
            y2={yScale(maxVal!) + 40}
            stroke="hsl(0, 4%, 20%)"
            stroke-width="5"
            marker-end="url(#arrowhead)"
        />

        <text
            x="{180}"
            y="{height/2}"
            text-anchor="middle"
            font-size="45"
            fill="hsl(0, 4%, 20%)"
        >+{d3.format(".0%")(maxVal! - y2006!.corp_own_rate)}
        </text>        
    {/if}

</svg>


<style>
    svg {
        overflow: visible;
        width: 80%;
    }
    g.axis {
        font-size: 28pt;
    }
</style>