<!-- Oliver Rayner, May 2025 -->

<script lang="ts">

    import { onMount } from "svelte";
    import CardPile from "./CardPile.svelte";
    import DraggableCard from "./DraggableCard.svelte";
    import right_click_to_flip from "$lib/images/right_click_to_flip.svg"
    import * as d3 from 'd3'

    let pile: CardPile;
    let piles: CardPile[]

    export let num_cards = 5;
    let items = new Array(num_cards);
    export let file_name = ""
    items = [
        "CORPORATE OWNERSHIP RATES ARE ON AVERAGE 5X HIGHER THAN IN 2006",
        "FIRST TIME HOMEBUYERS IN BOSTON NOW FACE SIX-FIGURE DOWN PAYMENTS",
        "MEDIAN PRICE OF A NEW HOME IN THE BOSTON METRO AREA IS NOW $950,000",
        "NEARLY 2,300 ACRES OF PUBLIC LAND SITS EMPTY",
        "NEARLY 1 IN 3 HOMES IN ROBURY ARE INVESTMENT PROPERTIES",
        "MORE THAN HALF OF BOSTON RENTERS SPEND OVER 30% OF INCOME ON HOUSING",
        "THE MEDIAN HOME PRICE IN BOSTON IS UP ALMOST 60% IN 10 YEARS"
    ]
    const file_names = [
        "resolution_card_1",
        "resolution_card_2",
        "resolution_card_3",
        "resolution_card_4",
    ]
    const clamp = (val:number, min:number, max:number) => Math.max(Math.min(max, val), min)

    onMount(() => {
        piles = [
            pile
        ]
    })

    const choose = (choices:any[]) => choices[ Math.floor(Math.random() * choices.length) ]

</script>


    <div class="text_container">

        <div class="title">
            THE GAME CONTINUES
        </div>
        <div class="body">

            Housing as a wealth building asset has lead to the <b>subtle monopolization</b> of markets in Boston. Homeownership has long been a <b>reliable</b> means of generating generational wealth in the U.S., but as corporations buy up homes and drive prices out of reach, that opportunity <b>disappears</b> for many residents. In Boston, <b>long time homeowners struggle</b> to downsize their homes and are often <b>caressed</b> into selling to investment firms well under market price. <b>Prospective homeowners</b> entering the market further struggle to compete, having little ability to out-bid investors. 

            <br><br>

            <b>Corporate housing ownership is bad</b> for Boston's residents <b>across the board</b>. 

            <br><br> 

            By supporting <b>local legislation</b>, <b>rent control</b>, <b>affordable housing initiatives</b>, and <b>community land trusts</b>, individuals can help preserve <b>housing for people</b>, <b>not profit</b>. Getting involved in tenant unions, backing local candidates who prioritize housing justice, and raising awareness through grassroots organizing can all <b>push back against the growing trend of corporate control</b> over Boston’s neighborhoods.

        </div>

    </div>
    <div class="card_container">
        <CardPile bind:this={pile}
            x="14%"
            y="30%"
            id="community"
        />
        <img src={right_click_to_flip} alt="right_click_to_flip" class="rctf" /> 
        {#each file_names as file_name, i }
            <DraggableCard 
                type={choose(["chance", "community_chest"])}
                current_pile={pile}
                size="27.5"
                card_piles={piles}
                neighborhood={`chance_card${i}`}
                style="transform: rotate({-90 + clamp(d3.randomNormal(0, 5)(), -17.5, 17.5)}deg);"
                grab_rotation={-90}
                initial_rotation={-90}
                file_name={file_name}
            />
        {/each}
    </div>

    <div class="snap-subscript">
        This project was developed with guidance and feedback from the 
        <a href="https://www.mapc.org">Metropolitan Area Planning Commission (MAPC)</a>
    </div>


<style>

    .text_container {
        /* border: 1px solid red; */
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        z-index: -1000;
        padding-right: 2rem;
    }
    .text_container > .title {
        font-size: clamp(3rem, 5rem, 45px);
        padding-bottom: 1rem;
        font-weight: 525;
    }
    .text_container > .body {
        font-size: clamp(0.5rem, 2rem, 20px);
    }
    .card_container {
        /* border: 1px solid blue; */
        height: 100%;
        width: min(40vw, 40vh);
        position: relative;
        perspective: 10000px;
        perspective-origin: 4% center;
        transform-style: preserve-3d;
        z-index: -1000;
    }
    .rctf {
        position: absolute;
        top: 30%;
        width: 80%;
        right: -10%;
    }
    .snap-subscript {
		position: absolute; 
		bottom: 1rem;
		font-size: 0.6rem;
		color: #818483;
		margin-left: 55vw;
	}

</style>