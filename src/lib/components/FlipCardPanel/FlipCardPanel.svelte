<script lang="ts">
import MonopolyCard from "../MonopolyCard/MonopolyCard.svelte";
import MonopolyCardInfo from "../MonopolyCard/MonopolyCardInfo.svelte";
import GraphR from "./GraphR.svelte";
import GraphL from "./GraphL.svelte";
import FlipMonopolyCard from "../FlipMonopolyCard/FlipMonopolyCard.svelte";
import type { NeighborhoodStats } from "./types";
import { A2EDAdata } from '$lib/stores/A2EDAdata';
import * as d3 from 'd3';
import scroll from '$lib/images/scroll.svg';
import MessageBox from '$lib/components/MessageBox/MessageBox.svelte';

const names = [
    'Dorchester','Mattapan','Roxbury','West Roxbury','West End',
    'South Boston','Hyde Park','Roslindale','Jamaica Plain','Brighton',
    'East Boston','Allston','Fenway','North End','Chinatown','Downtown',
    'Charlestown','Longwood','Seaport','Beacon Hill'
];

const rentByNeighborhood: Record<string, number> = {
    'Dorchester': 2393, 'Mattapan': 2109, 'Roxbury': 2279,
    'West Roxbury': 2057, 'West End': 3271, 'South Boston': 2917,
    'Hyde Park': 2186, 'Roslindale': 2148, 'Jamaica Plain': 2468,
    'Brighton': 2381, 'East Boston': 2405, 'Allston': 2512,
    'Fenway': 2974, 'North End': 2766, 'Chinatown': 3815,
    'Downtown': 2963, 'Charlestown': 2756, 'Longwood': 3000,
    'Seaport': 4816, 'Beacon Hill': 2853
};

$: neighborhoods = $A2EDAdata
    ? names.map(name => {
        const rows = $A2EDAdata.filter(r =>
            r.neighborhood === name &&
            (r.usage === 'CONDOMINIUM' || r.usage === '1-FAM RES')
        );
        const price = rows.length
            ? Math.round(d3.median(rows, d => d.price)! / 1000)
            : 0;
        const rent = rentByNeighborhood[name] ?? 0;
        return { name, stats: { rent, sales_price: price } } as NeighborhoodStats;
    })
    : [];

let allFlipped = false;
let currentPage = 0;

type SortOption = { label: string; key: keyof NeighborhoodStats['stats']; order: 'asc' | 'desc' };
const sortOptions: SortOption[] = [
    { label: 'Sort by Average Rent',  key: 'rent',         order: 'asc'  },
    { label: 'Sort by Median List Price', key: 'sales_price',  order: 'asc'  }
];

let currentSort = sortOptions[0];
let dropdownOpen = false;

$: sortedNeighborhoods = [...neighborhoods].sort((a, b) => {
    const diff = Number(a.stats[currentSort.key]) - Number(b.stats[currentSort.key]);
    return currentSort.order === 'asc' ? diff : -diff;
});

$: totalPages = Math.ceil(sortedNeighborhoods.length / 10);

$: paginatedNeighborhoods = [...Array(totalPages)].map((_, i) =>
    sortedNeighborhoods.slice(i * 10, (i + 1) * 10)
);

function resetView() {
    currentPage = 0;
    allFlipped  = false;
    window.scrollTo(0, 0);
}

function handleSort(e: Event) {
    currentSort  = sortOptions[(e.target as HTMLSelectElement).selectedIndex];
}

function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
}

let cardScrollEl: HTMLDivElement;
$: neighborhoodNames = sortedNeighborhoods.map(n => n.name);
let activeNeighborhood: string | null = null;

function handleScroll(e: UIEvent) {
    const pane = e.currentTarget as HTMLElement;
    const maxScroll = pane.scrollWidth - pane.clientWidth;
    if (maxScroll === 0) return;
    const ratio = pane.scrollLeft / maxScroll;
    const idx = Math.round(ratio * (sortedNeighborhoods.length - 1));
    activeNeighborhood = sortedNeighborhoods[idx]?.name;
}

function selectSortOption(option: SortOption) {
    currentSort = option;
    dropdownOpen = false;
    cardScrollEl.scrollLeft = 0;
    activeNeighborhood = sortedNeighborhoods[0].name;
}
</script>

<div class="grid-container">
    <div class="controls">
        <div class="left-controls">
            <div class="dropdown">
                <button class="dropdown-btn" on:click={toggleDropdown}>
                    {currentSort.label}
                </button>
                {#if dropdownOpen}
                    <div class="dropdown-menu">
                        {#each sortOptions as option}
                            <div class="dropdown-item" on:click={() => selectSortOption(option)}>
                                {option.label}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
            <img src={scroll} alt="Scroll hint" class="scroll-img" />
        </div>
        <div class="message-container">
            <MessageBox arrowDirection="bottom">
                The national average rent is <b>$1,625 per month</b>, and the median U.S. listing price is <b>$431,250</b>. Properties in most Boston neighborhoods have rents and listing prices that exceed the national averages.
            </MessageBox>
        </div>
    </div>
    <div class="main-content">
        <div class="card-scroll" on:scroll={handleScroll} bind:this={cardScrollEl}>
            {#each sortedNeighborhoods as n (n.name)}
                <div class="card-wrapper {n.name === activeNeighborhood ? 'active-card' : ''}">
                    <div class="card-content-scaler">
                        <MonopolyCardInfo neighborhood={n.name}/>
                    </div>
                </div>
            {/each}
        </div>
        <div class="graph-container">
            {#if currentSort.key === 'rent'}
                <GraphR {neighborhoodNames} {activeNeighborhood} />
            {:else if currentSort.key === 'sales_price'}
                <GraphL {neighborhoodNames} {activeNeighborhood} />
            {/if}
        </div>
    </div>
</div>

<style>
.grid-container {
    margin-left: 10vw;
    margin-right: 10vw;
    /* margin-right: 10vw; */

    margin-top: 6rem;
    /* padding-inline: max(5vw, 1.25rem); */
    /* width: 100%; */
    box-sizing: border-box;

    /* border-style: solid; */
}
.controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    /* border-style: solid; */
}
.left-controls {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}
.message-container {
    flex: 1;
    min-width: 250px;
}
.dropdown {
    position: relative;
    border-color: #3a3737;
    border-width: 2px;
    border-style: solid;
    border-radius: 8px;
}
.dropdown-btn {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    background-color: #f8f9fa;
    cursor: pointer;
    font-weight: 600;
    width: 16rem;
    text-align: left;
    font-size: 1.1rem;
}
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    z-index: 10;
}
.dropdown-item {
    padding: 0.75rem;
    cursor: pointer;
    font-weight: 600;
}
.dropdown-item:hover {
    background-color: #f1f1f1;
}
.scroll-img {
    height: 70px;
    user-select: none;
    pointer-events: none;
}
.main-content {
    display: flex;
    flex-direction: column;
    height: 75vh;
    min-height: 350px;
    max-height: 90vh;
    gap: 0.5rem;

    /* border-style: solid; */
    margin-top: -2.5rem;
}
.card-scroll {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0.5rem 0;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* height: clamp(90px, 50vh, 500px); */
    max-width: 100vw;
    box-sizing: border-box;

    /* border-style: solid; */
}
.card-scroll::-webkit-scrollbar {
    display: none;
}
.card-wrapper {
    flex: 0 0 auto;
    scroll-snap-align: start;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 12px;
    box-sizing: border-box;
    margin: 0;
    width: clamp(80px, 18vw, 160px);
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
}

.card-content-scaler {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.card-content-scaler > :global(*) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    overflow: hidden;
}
.card-wrapper.active-card {
    border: 4px solid orange;
}
.graph-container {
    margin-top: -4rem;

    flex: 1 1 auto;
    width: 100%;
    /* min-height: 0; */

    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: stretch;

    /* border-style: solid; */
}

</style>
