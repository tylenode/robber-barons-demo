<!-- Oliver Rayner April 2025 -->

<script lang="ts">

    import * as d3 from 'd3'

    export let neighborhood:any = "Allston"
    import Graph from '$lib/components/MonopolyCard/Graph.svelte'
    import { cardBlanksWhite } from "$lib/stores/CardBlanksWhite"
    import { neighborhoodPhoto } from "$lib/stores/NeighborhoodPhoto"
    import { currentCard, dataLoaded, nextCard } from "$lib/stores/CurrentCard"
    import GIS from './GIS.svelte'
 
    import { A2EDAdata, bostonNeighborhoodToZip } from "$lib/stores/A2EDAdata";
    import { topOwnersByZip } from "$lib/stores/FY2024Propertydata";
    let median_sale_price:number|string = 104;

    let card_blank:any;
    $: if ($cardBlanksWhite) {
        card_blank = $cardBlanksWhite[`/src/lib/images/card_blanks_white/${neighborhood.toLowerCase()}.svg`]
    }

    let photo_src:any;
    $: if ($neighborhoodPhoto) {
        photo_src = $neighborhoodPhoto[`/src/lib/images/neighborhood_pics/${neighborhood.toLowerCase()}.jpg`]
    }

    $: if ($A2EDAdata) {
        const data = $A2EDAdata.filter(d => (
            (d.neighborhood == neighborhood)
            // && !d.cash_sale
            && !d.investor
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
    $: if ($dataLoaded) {
        topOwnerArr = topOwnersByZip(
            bostonNeighborhoodToZip[neighborhood]
        )
        topOwner = topOwnerArr ? topOwnerArr[0] : ["N/A", 0]
        sumTopOwners = topOwnerArr.reduce((t, val) => t + val[1], 0)
        suffix = sumTopOwners > 1_000_000_000 ? "B" : "M" 

        // console.log(neighborhood, topOwnerArr)
    }

    export function wrapTextToTspans(text: string, maxCharsPerLine: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            // Check if adding this word would exceed line length
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
	/* -- local state ------------------------------------------------------ */
	const TAB = { TREND:1, MAP:2, STATS:3, PHOTO:4 } as const;
	let   activeTab: 1 | 2 | 3 | 4 = TAB.TREND;

</script>

<div class="card-wrapper">
	<img class="card-bg" src={card_blank} alt="monopoly_card"/>

	<!-- Tab selector ----------------------------------------------------- -->
	<nav class="tab-bar">
		{#each Object.entries(TAB) as [label,id]}
			<button
				class:selected={activeTab===id}
				on:click={() => activeTab = id}
			>
				{label}
			</button>
		{/each}
	</nav>

	<!-- Content area -->
	<div class="content-area">
		<!-- Tab-1: Trend chart ---------------------------------------------- -->
		<div class="tab-content" class:hidden={activeTab!==TAB.TREND}>
			<Graph neighborhood_name={neighborhood}/>
		</div>

		<!-- Tab-2: GIS map --------------------------------------------------- -->
		<div class="tab-content" class:hidden={activeTab!==TAB.MAP}>
			{#if ($currentCard===neighborhood)||($nextCard===neighborhood)}
				<GIS selected_neighborhood={neighborhood}/>
			{/if}
		</div>

		<!-- Tab-3: prices + owners ------------------------------------------ -->
		<div class="tab-content" class:hidden={activeTab!==TAB.STATS}>
			<div class="stats-content">
				<div class="list_price">
					<svg viewBox="0 0 100 50">
						<text x="50%" y="50%" text-anchor="middle" font-size="25pt">
							{median_sale_price}k
						</text>
					</svg>
				</div>

				<div class="largest_owner">
					<svg viewBox="0 0 150 150">
						<!-- top blurb -->
						<text x="2.5%" y="11%" font-size="4.8pt">
							{#each wrapTextToTspans(
								`${neighborhood}'s ten largest private investors own`, 30
							) as line,i}
								<tspan x="2.5%" dy={i>0 ? '5%' : 0}>{line}</tspan>
							{/each}
						</text>

						<!-- big number -->
						<text x="4%" y="28.5%" font-size="15pt">
							{
								new Intl.NumberFormat('en-US',{
									style:'currency',currency:'USD',
									minimumFractionDigits:0,maximumFractionDigits:0
								}).format(
									sumTopOwners / (suffix==='M'?1_000_000:1_000_000_000)
								) + suffix
							}
						</text>

						<!-- bottom blurb -->
						<text x="2.5%" y="35%" font-size="4.8pt">
							<tspan x="2.5%">in residential property value.</tspan>
						</text>
					</svg>
				</div>
			</div>
		</div>

		<!-- Tab-4: photo ----------------------------------------------------- -->
		<div class="tab-content" class:hidden={activeTab!==TAB.PHOTO}>
			<div class="photo">
				<img src={photo_src} alt="{neighborhood} illustration"/>
			</div>
		</div>
	</div>
</div>

<!-- ───────────────────────────────  STYLE  ────────────────────────────── -->
<style>
	.card-wrapper{position:relative;width:100%;}
	.card-bg     {width:100%;display:block;}

	/* Tab bar ----------------------------------------------------------- */
	.tab-bar{
		position:absolute;
		top:26%;
        left:16%;
		display:flex;
        gap:0.4rem;
	}
	.tab-bar button{
		padding:0.15rem 0.4rem;
		font:6pt/1 sans-serif;
		border:none;border-radius:3px;
		background:rgba(245,245,245,.85);
		cursor:pointer;
	}
	.tab-bar button.selected{
		background:#444;color:#e9e9e9;
	}

	/* Content area */
	.content-area {
		position: absolute;
		top: 35%;
		left: 15%;
		width: 70%;
		height: 30%;
	}

	.tab-content {
		width: 100%;
		height: 100%;
	}

	.tab-content.hidden {
		display: none;
	}

	/* Tab specific styles */
	.photo img{max-width:100%;max-height:100%;object-fit:contain;}

	/* Stats-tab extras -------------------------------------------------- */
	.stats-content {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.list_price   {position:absolute; right:10%; top:30%; width:15%;}
	.largest_owner{position:absolute; left:24%; top:36%; width:65%; height:20%;}
</style>