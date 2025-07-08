<!-- Oliver Rayner -->

<script lang="ts">
    
    import * as d3 from 'd3'
    import { fade } from 'svelte/transition'

    import monopolyHouse from '$lib/images/block_chart/monopoly_house.svg'
    import monopolyHouseDim from '$lib/images/block_chart/monopoly_house_dim.svg'

    import { currentCard, neighborhoods, averageRents2025 } from '$lib/stores/CurrentCard'

    import { CorporateOwnershipdata } from "$lib/stores/CorporateOwnershipdata";
    import type { CorporateOwnershipdataItem } from "$lib/stores/CorporateOwnershipdata";
    import { bostonNeighborhoodToZip } from '$lib/stores/A2EDAdata';
    import { monthlyRentByZip } from '$lib/stores/FY2024Propertydata';
    import { dataLoaded } from '$lib/stores/CurrentCard'

    interface ProcessedData {
        year: Date,
        owner_occ_rate: number,
        rental_rate: number,
    }

    let processed_data: ProcessedData[] = [];
    let data: CorporateOwnershipdataItem[] = [];

    let corpRate:Boolean[]
    const numHouse = 5;
    const convertPercentageToArray = (percentage: number) => Array(numHouse).fill(false).map((_, i) => i < Math.floor(percentage * numHouse));
    let monthlyRent = 0;

    $: meanVal = 0;
    $: if ($CorporateOwnershipdata) {

        let neighborhood_name = $currentCard;
        if ($currentCard == "Seaport") neighborhood_name = "South Boston Waterfront" // Hacky fix for Seaport

        data = $CorporateOwnershipdata.filter(d => d.neighborhood==neighborhood_name && d.year.getFullYear() == 2024)
        processed_data = Array.from(data, (d) => ({
            year: d.year,
            owner_occ_rate: d.own_occ_rate,
            rental_rate: 1-d.own_occ_rate,
        }))
        console.log($currentCard, processed_data)
        meanVal = d3.mean(processed_data, d => d.rental_rate)!
        corpRate = convertPercentageToArray(meanVal!);
    }

    $: if ($dataLoaded) {
        // monthlyRent = monthlyRentByZip(bostonNeighborhoodToZip[$currentCard])!
        monthlyRent = averageRents2025[$currentCard]!
    }

</script>

<div style="position: relative; height:calc(25vw * 1.44);">

    <div class="" style="position: absolute; top:4%">
        <div class="block_chart_text">
            Prospective homeowners entering Boston's housing market in <b>2025</b> should expect to pay roughly <b>30%</b> more on their <b>mortgages</b> than their <b>1995</b> counterparts.
        </div>
    </div>
    {#key $currentCard}
    <div class="block_chart" transition:fade={{ duration: 750 }}>
        {#each corpRate as v}
            <img src={v ? monopolyHouse : monopolyHouseDim} alt="" />
        {/each} 
    </div>
    {/key}
    <div class="text_container"> 
        <div style="display:flex;">
            <div class="big">
                {Math.floor(meanVal * numHouse)}/{numHouse}
            </div>
            <div class="block_chart_text">
                of residential properties in <b>{$currentCard}</b> are non-owner-occupied rentals in 2024.
            </div>
        </div>
        <div class="block_chart_text" style="padding-top: 0%;">
            As of 2025, the average monthly mortgage payment in <b>{$currentCard}</b> is  <b>{
            new Intl.NumberFormat('en-US', 
            {
                style:'currency', 
                currency:'USD', 
                minimumFractionDigits:0, 
                maximumFractionDigits:0
            }).format(monthlyRent)
            }</b>.
        </div>
        <div class="block_chart_text">
            In the years following the 2008 recession, the <b>corporate ownership</b> rate of housing has on average <b>more than quintupled</b> in Boston.
        </div>
    </div>
</div>


<style>

    .block_chart {
        justify-content: center;
        position: absolute;
        width: 100%;
        top: 32.5%;
    }
    img {
        width:18%;
    }
    .block_chart_text {
        font-size: 1.5vw;
        padding-top: 0%;
        padding-bottom: 1vw;
    }
    .big {
        font-size: 4.5vw;
        font-weight: bold;
        letter-spacing: 2.5pt;
        /* position: absolute; */
        top: 0;
        padding-right: 5%;
    }
    .text_container {
        position: absolute;
        width: 100%;
        top: 50%;
        display: flex;
        flex-direction: column;
    }

</style>