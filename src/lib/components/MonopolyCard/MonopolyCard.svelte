<!-- Oliver Rayner April 2025 -->

<script lang="ts">

    import * as d3 from 'd3'

    export let neighborhood:string = "Allston"
    import Graph from '$lib/components/MonopolyCard/Graph.svelte'
    import { cardBlanks } from "$lib/stores/CardBlanks"
    import { currentCard, dataLoaded, nextCard, averageRents2025 } from "$lib/stores/CurrentCard"
    import GIS from './GIS.svelte'
    import blank from '$lib/images/card_blanks/blank.svg'
 
    import { A2EDAdata, bostonNeighborhoodToZip } from "$lib/stores/A2EDAdata";
    import { topOwnersByZip, FY2024PropertyData } from "$lib/stores/FY2024Propertydata";
    let median_sale_price:number|string = 104;

    let card_blank:any;
    $: if ($cardBlanks && $FY2024PropertyData) {
        card_blank = $cardBlanks[`/src/lib/images/card_blanks/${neighborhood.toLowerCase()}.svg`]
    }

    $: if ($A2EDAdata) {
        const data = $A2EDAdata.filter(d => (
            (d.neighborhood == neighborhood)
            // && !d.cash_sale
            // && !d.investor
            && (d.usage == "CONDOMINIUM" || d.usage == "1-FAM RES") 
        ));
        median_sale_price = Math.round(d3.median(data.map(d => d.price))! / 1000);
        if (neighborhood == "MIT") median_sale_price = "80B"
        // console.log(median_sale_price);
    }
    
    let topOwner:[string, number] = ["N/A", 0];
    let topOwnerArr:[string, number][] = [["N/A", 0]];
    let sumTopOwners:number = 0;
    let suffix = "";
    let monthlyRent = 0;
    let calculated_mortgage = 0;
    let suffix_m = "";

    $: if ($dataLoaded && $FY2024PropertyData) {
        
        const zip = bostonNeighborhoodToZip[neighborhood];
        topOwnerArr = topOwnersByZip(zip)

        topOwner = topOwnerArr ? topOwnerArr[0] : ["N/A", 0]
        sumTopOwners = topOwnerArr.reduce((t, val) => t + val[1], 0)
        suffix = sumTopOwners > 1_000_000_000 ? "B" : "M" 

        monthlyRent = averageRents2025[neighborhood]!
        calculated_mortgage = monthlyRent * 12 * 30;
        suffix_m = calculated_mortgage > 1_000_000 ? "M" : "K"

    }

    export function wrapTextToTspans(text: string, maxCharsPerLine: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxCharsPerLine) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);

        return lines;
    }

</script>

<div style="position:relative; transform-style:preserve-3d;">
    <div class="back">

        <img src={blank} alt="monopoly_card_back" class="card" />
        <div class="mortgage">
            <svg viewBox="0 0 {500} {200}" style="">
                <text
                    x="50%"
                    y="50%"
                    font-size="40pt"
                    text-anchor="middle"
                    font-family="Times New Roman, serif"
                    font-weight="bold"
                    letter-spacing="-1px"
                >{neighborhood.toUpperCase()}</text>
                <text
                    x="50%"
                    y="70%"
                    font-size="20pt"
                    text-anchor="middle"
                >MORTGAGED</text>
                <text
                    x="50%"
                    y="83.5%"
                    font-size="20pt"
                    text-anchor="middle"
                >FOR {
                    new Intl.NumberFormat('en-US', 
                    {
                        style:'currency', 
                        currency:'USD', 
                        minimumFractionDigits:0, 
                        maximumFractionDigits:suffix_m === "M" ? 2 : 0
                    }).format(calculated_mortgage / (suffix_m === "M" ? 1_000_000 : 1_000))
                }{suffix_m}</text>
            </svg>

        </div>

    </div> 
    <div class="front">

        <img src={card_blank} alt="monopoly_card" class="card" />
        <div class="graph">
            <!-- {#if ($currentCard == neighborhood) || ($nextCard == neighborhood)} -->
                <Graph neighborhood_name={neighborhood} />
                <!-- <GIS selected_neighborhood={neighborhood} /> -->
            <!-- {/if} -->
        </div>
        <div class="list_price">
            <svg viewBox="0 0 {100} {50}">
                <text
                    x="50%"
                    y="50%"
                    font-size="25pt"
                    text-anchor="middle"
                >{median_sale_price}k</text>
            </svg>
        </div>
        <div class="largest_owner">
            <svg viewBox="0 0 {150} {150}">
                <text
                    x="22.5%"
                    y="11%"
                    font-size="4.8pt"
                    text-anchor="left"
                >
                {#each wrapTextToTspans(`${neighborhood}'s ten largest private investors own`, 30) as line, i}
                    <tspan x="2.5%" dy="{i > 0 ? 5 : 0}%">{line}</tspan>
                {/each}
                </text>
                <text
                    x="4%"
                    y="28.5%"
                    font-size="15pt"
                    text-anchor="start"
                >{
                new Intl.NumberFormat('en-US', 
                {
                    style:'currency', 
                    currency:'USD', 
                    minimumFractionDigits:0, 
                    maximumFractionDigits:0
                }).format(sumTopOwners / (suffix == 'M' ? 1_000_000 : 1_000_000_000)) + suffix
                }</text>
                <text
                    x="22.5%"
                    y="35%"
                    font-size="4.8pt"
                    text-anchor="left"
                >
                {#each wrapTextToTspans(`in residential property value.`, 30) as line, i}
                    <tspan x="2.5%" dy="{i > 0 ? 5 : 0}%">{line}</tspan>
                {/each}
                </text>
            </svg>
        </div>
        <div class="gis">
            <!-- {#if ($currentCard == neighborhood) || ($nextCard == neighborhood)} -->
                <!-- <GIS selected_neighborhood={neighborhood} /> -->
            <!-- {/if} -->
        </div>

    </div>
</div>


<style>
    .graph {
        position:absolute;
        top:29.0%;
        left:15%;
        width:90%;
    }
    .card {
        /* border: 2px solid red; */
        /* position: absolute; */
        width: 100%;
        /* border: 1px solid red; */
        top: -50%;

    }
    .back {
        transform: rotateY(180deg);
        position: absolute;
        width: 100%;
    }
    .front {
        position:absolute;
        width: 100%;
    }
    .list_price {
        position:absolute;
        right: 10%;
        top: 65.25%;
        width: 15%;
    }
    .largest_owner {
        position: absolute;
        top: 71.5%;
        left: 24%;
        width: 65%;
        height: 20%;
        /* border: 1px solid blue; */
    }
    .largest_owner_names {
        position: absolute;
        top: 77%;
        right: 11%;
        width: 34%;
        height: 12%;
        /* border: 1px solid blue; */
    }
    .gis {
        position: absolute;
        top: 72.5%;
        width: 42.5%;
        right: 3%;
    }
    .mortgage {
        position: absolute;
        top: 37.5%;
        width: 80%;
        left: 10%;
    }
</style>
