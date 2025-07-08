<!-- Oliver Rayner, April 2025 -->

<script lang="ts">

    import { onMount } from "svelte";
    import CardPage from "./CardPage.svelte";
    import GraphN from "./GraphN.svelte";
    import AnimatedCursor from "./AnimatedCursor.svelte";
    import arrow_sort from '$lib/images/arrow_sort.svg' 
    import color_key from '$lib/images/colorkey.svg'

</script>
 
    <div class="card_pile">
        <CardPage 
            card_size="26"
        />
        <img src={arrow_sort} alt="arrow_sort" class="arrow_sort" />
        <img src={color_key} alt="color key" class="color_key" />
    </div>
    <div class="graph_anchor">

        <div class="title">
           The Hand You're Dealt 
        </div>
        <GraphN />
        <div class="graph_description">
            
            Over the past 20 years, the corporate ownership rate of housing across Boston has nearly <b>quintupled</b> (5x).
            <br><br>
            After the 2008 financial crisis, investors began seeing housing as a <b>stable</b>, <b>lucrative asset</b>, leading to a surge in corporate purchases of residential properties. Boston’s strong job market, top-tier universities, and rising property values have made it especially attractive for <b>institutional investors</b>. At the same time, <b>limited housing</b> supply, <b>slow new construction</b>, and <b>zoning restrictions</b> have driven up demand, making it easier for <b>corporations with capital</b> to <b class="red">outbid individual buyers</b>. A lack of <b>family-focused</b> policies have allowed this trend to continue, leaving loopholes that allow <b>bulk buying</b>, <b>LLC masking</b>, and <b>speculative practices</b> to thrive with minimal regulation.

        </div>
    </div>

    <div class="cursor">
        <AnimatedCursor timeout="6000" />
    </div> 
    
    



<style>
    .title {
        padding: 2rem;
        margin-bottom: 2.5rem;
        font-size: clamp(3rem, 5rem, 45px);
        padding-bottom: 1rem;
        font-weight: 525;
    }
    .graph_anchor {
        width: 60%;
        z-index: -5000;
        display: flex;
        flex-direction: column;
        padding-left: 4rem;
        padding-right: 4rem;
    }
    .graph_description {
        margin-top: -1rem;
        padding: 2rem;
        font-size: clamp(0.5rem, 0.85rem, 2rem);
    }
    .cursor {
        position: absolute;
        left: 16%;
        top: 35%;
        width: 10%;
        opacity:0.95;
    }
    .arrow_sort {
        position: absolute;
        width: 15%;
        right: -25%;
        top: 32.5%;
        z-index: -5000;
    }
    .card_pile {
        position: relative;
        /* border: 1px solid red; */
        height: 100%;
    }
    .color_key {
        /* border: 1px solid red; */
        width: 100%;
        position: absolute;
        top: 49.5%;
        z-index: -5000;
    }
</style>