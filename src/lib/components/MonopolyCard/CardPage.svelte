<!-- Oliver Rayner, May 7th, 2025 -->

<script lang="ts">

    import { onMount } from "svelte";
    import CardPile from "./CardPile.svelte";
    import DraggableCard from "./DraggableCard.svelte";
    import { neighborhoods } from "$lib/stores/CurrentCard";
    import { cardBlanks } from "$lib/stores/CardBlanks";

    import { pileMap, cardRefs } from "$lib/stores/CardData";


    let indicator_card:any, unselected_cards:any;
    $: if ($cardBlanks) {
        indicator_card = $cardBlanks[`/src/lib/images/card_blanks/selected_cards_indicator.svg`]
        unselected_cards = $cardBlanks[`/src/lib/images/card_blanks/unselected_cards_indicator.svg`]
    }

    import * as d3 from 'd3'
    import { get } from "svelte/store";
    const clamp = (val:number, min:number, max:number) => Math.max(Math.min(max, val), min)

    let pile_top: CardPile;
    let pile_bottom: CardPile;
    let piles: CardPile[];
    let card_selector_graphic: HTMLDivElement;
    let unselected_graphic: HTMLDivElement;

    export let cardComponents: Record<string, DraggableCard> = {};

    export let card_size = "23.5"
    // export let page_id = "1"
    export let num_cards_bottom = "0";

    onMount(async () => {

        piles = [ 
            pile_top, 
            pile_bottom
        ]
        cardRefs.update( r => cardComponents)

    })


</script>

<div class="card_page">
    <CardPile bind:this={pile_top} 
        x="5%"
        y="10%"
        id="top"
    />
    <CardPile bind:this={pile_bottom}
        x="5%"
        y="53%"
        id="bottom"
    />
    <div bind:this={card_selector_graphic} class="card_selector" style={`width: min(${parseFloat(card_size) * 0.9}vw, ${parseFloat(card_size) * 0.9}vh)`}>
        <img src={indicator_card} alt="Card Selector Placeholder" style="width:100%;"/>
    </div>
    <div bind:this={unselected_graphic} class="unselector" style={`width: min(${parseFloat(card_size) * 0.9}vw, ${parseFloat(card_size) * 0.9}vh)`}>
        <img src={unselected_cards} alt="Card Selector Placeholder" style="width:100%;"/>
    </div>
    {#each neighborhoods as neighborhood, i}
        <DraggableCard
            bind:this={cardComponents[neighborhood]}
            neighborhood={neighborhood}
            type="property"
            current_pile={i < neighborhoods.length - parseFloat(num_cards_bottom) ? pile_top : pile_bottom}
            size={card_size}
            card_piles={piles}
            style="transform: rotate({clamp(d3.randomNormal(0, 5)(), -17.5, 17.5)}deg);" 
        />
    {/each} 
</div>

<style>

    .card_page {
        /* border: 1px solid green; */
        width: min(27vw, 27vh);
        height: 100%;
        perspective: 10000px;
        perspective-origin: 5% center;
        transform-style: preserve-3d;
        z-index: -1000;
    }
    .card_selector {
        position: absolute;
        top: 55%;
        left: 8.5%;
        pointer-events: none;
        z-index: -1000;
        transform: rotateZ(-1.5deg)
    }
    .unselector {
        position: absolute;
        top: 12%;
        left: 8.5%;
        pointer-events: none;
        z-index: -1000;
        transform: rotateZ(1.5deg)
    }

</style>