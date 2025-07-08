<script lang="ts">

	import { onMount } from 'svelte'
	import * as d3 from 'd3'

	// Images
	import chance from '$lib/images/chance.svg';
	import dragme from '$lib/images/dragme.svg';
	import colorkey from '$lib/images/colorkey.svg'
	import large from '$lib/images/large_investor.svg';
	import institutional from '$lib/images/institutional_investor.svg';

	// Section home affordability
	import SnapUnderline from '$lib/components/SnapUnderline/SnapUnderline.svelte';
	import SnapTitle from '$lib/components/SnapTitle/SnapTitle.svelte';
	import SnapSubtext from '$lib/components/SnapSubtext/SnapSubtext.svelte';
	import HousingAffordabilityGraph from '$lib/components/HousingAffordabilityGraph/HousingAffordabilityGraph.svelte';

	// Section corporate ownership
	import InvestorComparison from '$lib/components/InvestorComparison/InvestorComparison.svelte';
	import CentralInfoCard    from '$lib/components/CentralInfoCard/CentralInfoCard.svelte';

	// Section draggable card
	import MonopolyCard from '$lib/components/MonopolyCard/MonopolyCard.svelte';
	import DraggableCard from '$lib/components/MonopolyCard/DraggableCard.svelte';
	import BlockChart from '$lib/components/MonopolyCard/BlockChart.svelte'
	import GIS from '$lib/components/MonopolyCard/GIS.svelte';

	// Section flip rate and profit
	import FlipRateProfit from '$lib/components/FlipRateProfit/FlipRateProfit.svelte';
	import FlipProfitTable from '$lib/components/FlipProfitTable/FlipProfitTable.svelte';

	// Section Chance
	import PicText from '$lib/components/PicText/PicText.svelte';
	
	// Stores and Data
	import { currentCard, cardOrder, bringCardToFront, neighborhoods, dataLoaded } from '$lib/stores/CurrentCard';
	import { loadA2EDAdata } from '$lib/stores/A2EDAdata';
	import { loadCorporateOwnershipdata } from '$lib/stores/CorporateOwnershipdata';
	import { loadCardBlanks } from '$lib/stores/CardBlanks';
	import { loadCardBlanksWhite } from '$lib/stores/CardBlanksWhite';
	import { loadNeighborhoodPhoto } from '$lib/stores/NeighborhoodPhoto';
    import { loadFY2024PropertyData, topOwnersByZip } from '$lib/stores/FY2024Propertydata';
    import { loadGISdata } from '$lib/stores/GISdata';

	import SolutionCard from '$lib/components/SolutionCard/SolutionCard.svelte';
    import FlipMonopolyCard from '$lib/components/FlipMonopolyCard/FlipMonopolyCard.svelte';
	import FlipFlippersCard from '$lib/components/FlipMonopolyCard/FlipFlippersCard.svelte';
  	import FlipCardPanel from '$lib/components/FlipCardPanel/FlipCardPanel.svelte';
    import ChanceCard from '$lib/components/MonopolyCard/ChanceCard.svelte';
    import CardPile from '$lib/components/MonopolyCard/CardPile.svelte';
	import CardPage from '$lib/components/MonopolyCard/CardPage.svelte';
	import GraphN from '$lib/components/MonopolyCard/GraphN.svelte'
    import CardSelectorGraph from '$lib/components/MonopolyCard/CardSelectorGraph.svelte';
    import ResolutionsPage from '$lib/components/MonopolyCard/ResolutionsPage.svelte';

	import FirstSection from '$lib/components/Sections/FirstSection/FirstSection.svelte';
	import SecondSection from '$lib/components/Sections/SecondSection/SecondSection.svelte';

	const messages = [
		`Tax the rich. Do reciprocal housing premium tax on flippers`,

		`Move MIT to South Dakota. Don't make Boston so packed with schools.`,

		`Put a cap on the percentage of residential properties corporate can own in a neighborhood.`
	];

	let allFlipped: boolean | undefined = undefined;

	const openAll  = () => (allFlipped = true);
	const closeAll = () => (allFlipped = false);
	const release  = () => (allFlipped = undefined);   // optional helper

	onMount( async () => {
		console.log("Loading datasets...")
		loadA2EDAdata(),
		loadCorporateOwnershipdata(),
		loadFY2024PropertyData(),
		loadCardBlanks(),
		loadCardBlanksWhite(),
		loadNeighborhoodPhoto(),
		loadGISdata()
		
		$dataLoaded = true;
		console.log("Finished loading datasets.");
	})

	const clamp = (val:number, min:number, max:number) => Math.max(Math.min(max, val), min)

	// $: console.log(neighborhoods.length)

	// $: perSide = Math.ceil(neighborhoods.length / 4);
	$: top    = neighborhoods.slice(2, 10).reverse();
	$: right  = neighborhoods.slice(0, 2).reverse();
	$: bottom = neighborhoods.slice(12, 20).reverse();
	$: left   = neighborhoods.slice(10, 12).reverse();

	/* --- local state ------------------------------------------------------- */
	let selectedNeighborhood = '';   // last card clicked

	/** update the central card whenever a child dispatches `select` */
	function handleSelect(event: CustomEvent<{ neighborhood: string }>) {
		selectedNeighborhood = event.detail.neighborhood;
	}

</script>

<svelte:head>
	<title>Robber Barons</title>
</svelte:head>

<div class="snap-container">

	<section class="snap-page" data-section-index="0">
		<FirstSection />
	</section>

	{#if $dataLoaded}	

		<section class="snap-page " style="display: flex" data-section-index="1">
			<SecondSection />
		</section>

		<section class="snap-page " style="display: flex; background: none; background-color: white; justify-content:center; margin:auto; position:relative;" id="card_container" data-section-index="3">
			<CardSelectorGraph />
		</section>		

		<section class="snap-page " style="display: flex" data-section-index="2">
			<SnapTitle text="Listing Price as a Function of Corporate Ownership" align="left" />
			<InvestorComparison
				leftSrc={large}
				rightSrc={institutional}
			/>
			<div class="footnote">
				<small>
					We use the factor of 0.59 to reflect the inflation adjustment from 2004 to 2024 based on cumulative U.S. inflation over this period.
				</small>
			</div>
		</section>

		<section class="snap-page" data-section-index="4">
			<SnapTitle text="A Growing Rental Market" align="left"/>
			<FlipCardPanel />
			<div class="footnote">
				<small>
					Rent data sourced from apartment.com and bostonpads.com
				</small>
			</div>
		</section>
		
		
		<section class="snap-page " data-section-index="5">
			<SnapTitle text="Large investors profit greatly from" align="left" hasUnderline={true}>
				<SnapUnderline color="#60a5fa" tooltip="Flip (verb): Selling a property within 2 years after purchase for profit">
					flipping
				</SnapUnderline>
			</SnapTitle>
			<FlipRateProfit />
			<FlipProfitTable />
		</section>

		<!-- <section class="snap-page snap-page-2 center" style="display: flex; ">
			<h2 class="community_chest_page_title">Click to see what we can do!</h2>
			<div class="row">
				{#each messages as text}
				<SolutionCard {text}/>
				{/each}
			</div>	
		</section> -->

		<section class="snap-page " style="display: flex; justify-content:center; margin:auto; position:relative;" id="card_container" data-section-index="3">
			<ResolutionsPage />
		</section>

	{/if}

</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
		font-family: Helvetica, sans-serif;
	}

	.snap-container {
		height: 100vh;
		width: 100vw;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		overflow-y: scroll;
		overflow-x: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
		transform: translateZ(0);
		will-change: transform;
	}
	
	.snap-container::-webkit-scrollbar {
		display: none;
	}
	
	.snap-page {
		scroll-snap-align: start;
		height: 100vh;
		width: 100vw;
		/* display: flex; */
		align-items: center;
		justify-content: space-between;
		flex-shrink: 0;
		color: rgb(50, 48, 48);
		position: relative;
		overflow: hidden;
		transform: translateZ(0);
		will-change: transform;
		
		/* background: #D9EDF2; */
	}

    /* Visualization*/
	.card_container {
		position:relative; 
		width:30vw; 
		height:calc(30vw * 1.44); 
		/* z-index:-100;  */
		margin:auto; 
		/* border: 2px solid blue; */
		margin-left: 15vw;
		perspective: 10000px;
		transform-style: preserve-3d;
		overflow: visible;
	}


	/* .gis {
		width: 60vw;
		top: 36%;
		right: 0%;
		position: absolute;
	} */

	.row {
		display: flex;
		gap: 6rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.community_chest_page_title {
		margin: 0 0 1.5rem;         /* space below the title */
		font-size: 3.4rem;
		font-weight: 600;
	}

	.snap-page-2.center {
		/* take the full viewport height (or whatever the snap-page already uses) */
		min-height: 100vh;

		/* turn the section itself into a flex-container */
		display: flex;
		flex-direction: column;     /* stack title then cards */
		justify-content: center;    /* vertical centering */
		align-items: center;        /* horizontal centering */
		text-align: center;         /* center text inside <h2> */
		}

	.dragme {
		position: absolute;
		width: 80%;
		top: -15%;
		left: 50%;
	}

	.colorkey {
		position: absolute;
		width: 80%;
		bottom: -7.5%;
		left: 0%;
	}
	
	.graph_anchor {
		width: 50%;
		z-index: -5000;
		/* border: 1px solid red; */
	}
	.footnote {
        width: 100%;
        text-align: right;
        /* margin-top: 5rem; */
        padding-right: 2vw;
        color: #888;
        font-size: 0.75rem;
        position: absolute;
        bottom: 0.5rem;
        right: 0;
        pointer-events: none;
        z-index: 10;
    }
</style>