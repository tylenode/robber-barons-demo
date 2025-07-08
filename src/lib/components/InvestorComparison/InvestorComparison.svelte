<script lang="ts">
	import * as d3 from 'd3';
	import MessageBox from '$lib/components/MessageBox/MessageBox.svelte';
	import { onMount } from "svelte";
	import { CorporateOwnershipdata } from '$lib/stores/CorporateOwnershipdata'
    import { neighborhoods } from '$lib/stores/CurrentCard';
	import { colorMap } from "$lib/stores/CardData";

	/* -------- props (image sources) ---------- */
	export let leftSrc  = 'left.jpg';
	export let rightSrc = 'right.jpg';

	/* -------- data (pre-populated) ----------- */
	const leftData: Record<number, number> = {
		2005: 1.2, 2006: 1.3, 2007: 1.6, 2008: 2.1, 2009: 3.4,
		2010: 4.0, 2011: 4.3, 2012: 4.6, 2013: 5.0, 2014: 5.4,
		2015: 6.1, 2016: 6.8, 2017: 7.3, 2018: 7.9, 2019: 8.6,
		2020: 8.9, 2021: 9.4, 2022: 9.9, 2023: 10.3, 2024: 10.8
	};
	const rightData: Record<number, number> = {
		2005: 0.8, 2006: 0.9, 2007: 1.0, 2008: 1.4, 2009: 2.2,
		2010: 2.8, 2011: 3.2, 2012: 3.7, 2013: 4.1, 2014: 4.6,
		2015: 5.2, 2016: 5.9, 2017: 6.5, 2018: 7.2, 2019: 7.7,
		2020: 8.1, 2021: 8.7, 2022: 9.1, 2023: 9.6, 2024: 10.0
	};

	// 2004-2024
	const avgCorpOwnershipRate: Record<number, number> = {
		2004: 5.5,
		2005: 6.2,
		2006: 6.4,
		2007: 6.8,
		2008: 7.2,
		2009: 7.1,
		2010: 7.9,
		2011: 8.1,
		2012: 8.1,
		2013: 8.7,
		2014: 8.8,
		2015: 9.5,
		2016: 9.9,
		2017: 11.4,
		2018: 12.3,
		2019: 13.6,
		2020: 17.4,
		2021: 19.9,
		2022: 20.7,
		2023: 22.9,
		2024: 25.3
	};

	const years = d3.range(2004, 2025);

    const minValue = 3.5;   
    const maxValue = 25.3; 

    // Compute a color from black (low) to dark red (mid) to red (high)
    function getGradientColor(value: number) {
        // Normalize value between 0 and 1
        const t = Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
        // Black to dark red to red
        if (t < 0.5) {
            // Black (0,0,0) to dark red (139,0,0)
            const r = Math.round(139 * (t / 0.5));
            return `rgb(${r},0,0)`;
        } else {
            // Dark red (139,0,0) to red (255,0,0)
            const r = Math.round(139 + (255 - 139) * ((t - 0.5) / 0.5));
            return `rgb(${r},0,0)`;
        }
    }

    $: numberColor = getGradientColor(avgValue);


	/* -------- reactive state ----------------- */
	$: year = 2004;
	// $: leftValue  = leftData[year];
	// $: rightValue = rightData[year];
	$: avgValue = avgCorpOwnershipRate[year];

	let showLeft  = false;
	let showRight = false;

	$: corpOwnerData = [];
	$: medSales = {};
	const nbhds = [
		'Dorchester','Mattapan','Roxbury','West Roxbury','West End',
		'South Boston','Hyde Park','Roslindale','Jamaica Plain','Brighton',
		'East Boston','Allston','Fenway','North End','Chinatown','Downtown',
		'Charlestown','Longwood','Seaport','Beacon Hill'
	];

	function getCorpOwnerPercent(nbhd, y) {
		if (nbhd === "Average") {
			return avgCorpOwnershipRate[y];
		}

		let objects = corpOwnerData.filter(d => d.neighborhood === nbhd && d.year.getFullYear() === y);
		if (objects.length > 0) {
			return objects[0].corp_own_rate*100;
		}
		return null;
	}

	function getMedSales(nbhd, y) {
		if (Object.keys(medSales).length > 0) {
			if (nbhd === "Average") {
				let sum = 0.0;
				let count = 0;
				nbhds.forEach(n => {
					if (medSales[n] != null && Object.keys(medSales[n]).includes(y.toString()) && getCorpOwnerPercent(n, y) != null) {
						sum += medSales[n][y];
						count ++;
					}
				})
				if (count > 0) {
					return sum / count;
				}
			}

			if (medSales[nbhd] != null && Object.keys(medSales[nbhd]).includes(y.toString())) {
				return medSales[nbhd][y];
			}
		}
		return null;
	}

	let width = 800, height = 300;
	let margin = {top: 40, right: 50, bottom: 50, left: 70};
	let usableArea = {
		top: margin.top,
		right: width - margin.right,
		bottom: height - margin.bottom,
		left: margin.left
	};
	usableArea.width = usableArea.right - usableArea.left;
	usableArea.height = usableArea.bottom - usableArea.top;

	let xAxis, yAxis;
	$: {
		d3.select(xAxis).call(d3.axisBottom(xScale).tickFormat(d => String(d) + "%"));
		d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => "$" + (d/1000000).toPrecision(2) + "M"));
	}

	// let hoveredNbhd = "";
	// let cursor = {x: 0, y: 0};

	let allCOs = [0, 40];
	let allMSs = [0, 3000000];
	onMount(async () => {
		medSales = await d3.json('../../../data/conversions/median_sales_prices_by_nbhd.json');
		corpOwnerData = $CorporateOwnershipdata;

		allCOs = [];
		allMSs = [];
		nbhds.forEach(n => {
			years.forEach(y => {
				let co = getCorpOwnerPercent(n, y);
				let ms = getMedSales(n, y);
				if (co != null && ms != null) {
					allCOs.push(co);
					allMSs.push(ms);
				}
			})
		})
	});

	$: xScale = d3.scaleLinear()
				.domain(d3.extent(allCOs))
				.range([usableArea.left, usableArea.right])
				.nice();

	$: yScale = d3.scaleLinear()
				.domain(d3.extent(allMSs))
				.range([usableArea.bottom, usableArea.top])
				.nice();


	function generateLineData(nbhd, y) {
		let lineData = [];
		d3.range(2004, y+1).forEach(rangeYear => {
			if (nbhd === "Average") {
			}
			if (getCorpOwnerPercent(nbhd, rangeYear) != null && getMedSales(nbhd, rangeYear) != null) {
				lineData.push({c: getCorpOwnerPercent(nbhd, rangeYear), m: getMedSales(nbhd, rangeYear)});
			}
		})
		return lineData;
	}

	const line = d3.line()
		.x(d => xScale(d.c))
		.y(d => yScale(d.m));


</script>

<section class="investor_comparison">
	<!-- IMAGES -->
	<!-- <div class="image-row">
		<div
			class="image-wrapper"
			on:mouseenter={() => (showLeft = true)}
			on:mouseleave={() => (showLeft = false)}
		>
			<img class="image-left" src={leftSrc} alt="Large Investors" />
			{#if showLeft}
				<span class="hover-label">Large&nbsp;Investors</span>
			{/if}
		</div>

		<div
			class="image-wrapper"
			on:mouseenter={() => (showRight = true)}
			on:mouseleave={() => (showRight = false)}
		>
			<img class="image-right" src={rightSrc} alt="Institutional Investors" />
			{#if showRight}
				<span class="hover-label">Institutional&nbsp;Investors</span>
			{/if}
		</div>
	</div> -->

	<div class="line-graph" height={height}>
		<svg viewBox="0 0 {width} {height}" fill="none">
			<defs>
				<marker
					id="arrow"
					viewBox="0 0 10 10"
					refX="0" refY="5"
					markerUnits="strokeWidth" markerWidth="4" markerHeight="4"
					orient="auto">
					<path d="M0,0 L10,5 L0,10 Z" fill="context-stroke" />
				</marker>
			</defs>
			<g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
			<text x={usableArea.left + usableArea.width/2} y={usableArea.bottom + 40}
				text-anchor="middle" font-size=12 font-weight="bold"
				>Corporate Ownership Rate</text>
			<g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
			<text x={usableArea.left - 60} y={usableArea.top + usableArea.height/2}
				text-anchor="middle" font-size=12 font-weight="bold" transform="rotate(270 {usableArea.left - 60} {usableArea.top + usableArea.height/2})"
				>Median List Price</text>
			{#each nbhds as nbhd}
				<path
					class="line"
					d={line(generateLineData(nbhd, year))}
					stroke={colorMap[nbhd]}
					marker-end="url(#arrow)"
					opacity=0.25
				/>
			{/each}
			<path
				class="line"
				d={line(generateLineData("Average", year))}
				stroke="black"
				marker-end="url(#arrow)"
			/>
		</svg>
		<ul class="legend">
			<li style="--color: black">
				<span class="swatch"></span>
				Average
			</li>
			{#each nbhds as nbhd}
				{#if nbhd != "Seaport"}
					<li style="--color: { colorMap[nbhd] }">
						<span class="swatch"></span>
						{nbhd}
					</li>
				{/if}
			{/each}
		</ul>
	</div>

	<!-- SLIDER -->
	<!-- <div class="panel">
		<div class="value">Average Corporate Ownership Rate in Boston: {avgValue}%</div>
		<div class="year-readout">{year}</div>
		<div class="slider-container">
			<input
				class="year-slider"
				type="range"
				min="2004"
				max="2024"
				bind:value={year}
			/>
		</div>
	</div> -->
	<div class="panel-row">
		<div class="panel">
			<div class="value" style="font-size: 22px; margin-bottom: 1rem;">
				<div class="value-row">
					<span>Average Corporate Ownership Rate in Boston:&nbsp;</span>
					<span class="number" style="color: {numberColor}">{avgValue}%</span>
				</div>
			</div>
			<div class="year-readout" style="color: {numberColor}">{year}</div>
			<div class="slider-container">
				<input
					class="year-slider"
					type="range"
					min="2004"
					max="2024"
					bind:value={year}
				/>
			</div>
		</div>
		<div class="message-container">
			<MessageBox>
				In just 20 years, the average <b>corporate ownership rate</b> in Boston increased from <b>5.5%</b> to <b>25.3%</b>, representing a significant <b style="color: red;">5x</b> increase. During the same period, the <b>median housing price</b> rose from <b>$463,657</b> to <b>$829,774</b>, reflecting a <b style="color: red;">5.6%</b> increase after adjusting for inflation. 
			</MessageBox>
		</div>
	</div>
</section>

<style>
	.value-row {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 0.5rem;
	}
	.number {
		font-weight: bold;
		font-size: 1.2em;
	}
	.panel-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3rem;
		width: auto;              /* Remove 100% width */
		margin: -2.5rem auto 0 auto; /* Top margin, auto left/right for centering */
		justify-content: center;  /* Center items horizontally */
	}

	.panel {
		margin-top: -1.5rem;
	}

	.message-container {
		flex: 1 1 0;
		min-width: 250px;
		max-width: 700px;
		font-size: 1rem;
		/* margin-top: -2.5rem; */
	}

    .investor_comparison {
        margin-top: 4rem;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        gap: 1rem;
        padding: 1rem;
    }
	.image-row {
		display: flex;
		justify-content: center;
		gap: 8rem;
		margin-top: 1.5rem;
		flex-wrap: wrap;
	}
	.image-wrapper {
		position: relative;
		width: 20rem;
	}

	.image-left {
		margin-left: 15%;
		width: 15rem;
	}

	.image-right {
		margin-right: 15%;
		width: 17rem;
	}

	.value {
		position: relative;
        margin-top: 1.2rem;
		font: 700 1.2rem/1 Arial, sans-serif;
	}

	.hover-label {
		position: absolute;
		bottom: 0.75rem;
		left: 50%;
		transform: translate(-50%, -50%);
		font: 700 1.5rem/1 Arial, sans-serif;
		background: rgba(255, 255, 255, 0.95);
		padding: 0.5rem 1.25rem;
		border-radius: 0.5rem;
		animation: pop 0.6s infinite alternate;
	}
	@keyframes pop {
		from { transform: translate(-50%, -50%) scale(1); }
		to   { transform: translate(-50%, -55%) scale(1.15); }
	}

	/* Updated Slider Section */
	.slider-container {
		width: 100%;
		position: relative;
	}

	.year-slider {
		width: 100%;
		max-width: 26rem;
		display: block;
		margin: 0 auto;
	}
/* 
	.message-container {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	} */

	.year-readout {
		text-align: center;
		font: 700 1.1rem/1 Arial, sans-serif;
		margin-bottom: 0.75rem;
        font-size: 4rem;
	}

	svg {
		overflow: visible;
		flex: 1 1 auto;
		width: 90%;
		height: 90%;
		/* max-width: 80em; */
		display: block;
		/* TODO: polish css, add smoothing effect */
	}

	path {
		stroke-width: 2;
		transition: 300ms;
	}

	text {
		fill: rgb(50, 48, 48);
	}

	 /* dl.tooltip {

		&[hidden]:not(:hover, :focus-within) {
		opacity: 0;
		visibility: hidden;
		}
	 } */

	.line-graph {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 2em;
		margin-top: -2rem;
		/* overflow: hidden; */
	}

	.legend {
		border: 1px solid black;
		overflow: visible;
		padding: 1em;
		font-size: 11px;
		/* display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
        border: 1px solid black;
        padding: 4px;
        margin: 4px;
        flex: 1;
        height: auto;
        background: white; */
	}

	.swatch {
        display: inline-flex;
        width: 8px;
        height: 8px;
        background-color: var(--color);
    }

	li {
        display: flex;
        align-items: center;
        gap: 8px;
        color: black;
    }
</style>
