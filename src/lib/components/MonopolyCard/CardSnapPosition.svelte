<!-- Oliver Rayner, May 2025 -->

<script lang="ts">

    import { onMount } from "svelte";
    import DraggableCard from "./DraggableCard.svelte";
    
    export let style:string = "" 

    let element: HTMLDivElement;
    export const getDiv = () => element;
    
    export function getCenterPosition()
    {
        const rect = element.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2}
    }
   

</script>

<div bind:this={element} class="snap" style={style}>

</div>

<style>
    .snap {
        width: 50px;
        height: 50px;
        position:absolute;
        /* border: 1px solid red; */
    }
</style>