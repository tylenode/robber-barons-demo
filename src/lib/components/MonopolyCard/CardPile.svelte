<!-- Oliver Rayner, May 7th, 2025 -->

<!-- A CardPile object consists of a number DraggableCard objects and a CardSnapPositionObject -->

<script lang="ts">

    import { onMount } from "svelte";
    import DraggableCard from "./DraggableCard.svelte";
    import CardSnapPosition from "./CardSnapPosition.svelte";
    import { pileMap } from "$lib/stores/CardData";
    import { get } from "svelte/store";

    let snap_pos: CardSnapPosition;
    export let id = "sdflkasdf"
    export const getId = () => id

    let cardsInPile:string[];
    $: cardsInPile = [];

    export const getCardsInPile = () => [...cardsInPile]
    export const getPosition = () => snap_pos.getCenterPosition();

    export let x:string;
    export let y:string;

    export const getX = () => x;
    export const getY = () => y;

    export function addCardsToPile(new_cards:string[], top:boolean=true) 
    {
        new_cards.forEach((card:string) => {
            if (top)
                cardsInPile.push(card)
            else 
                cardsInPile.unshift(card)
        })
        updateCardStore()
    }
    export function removeCardsFromPile(cards:string[])
    {
        cardsInPile = cardsInPile.filter(n => !cards.includes(n))
        updateCardStore() 
    }

    export function moveToBottom(card:string)
    {
        cardsInPile = cardsInPile.filter(n => card != n)
        cardsInPile.unshift(card)
        updateCardStore()
    }

    export function updateCardStore()
    {
        pileMap.update(map => {
            map.set(id, [...cardsInPile])
            return map
        })
    }


    onMount(async () => {

        // setTimeout( () => {
        //     updateCardStore()
        //     console.log(cardsInPile)
        // }, 1000)

    })


</script>

    <CardSnapPosition bind:this={snap_pos} style={`left:${x};top:${y};`} />

<style>
    
</style>