<!-- Oliver Rayner, April 2025 -->

<script context="module" lang="ts">
    export let zIndexCounter = -2;
</script>

<script lang="ts">
    import { onMount } from "svelte";

    import gsap from 'gsap';
    import MonopolyCard from "./MonopolyCard.svelte";
    import ChanceCard from "./ChanceCard.svelte";
    import CommunityChestCard from "./CommunityChestCard.svelte";
    import CardPile from "./CardPile.svelte";
    import { pileMap } from "$lib/stores/CardData";

    export let style = "";
    export let neighborhood = "";
    export let type = "property";
    export let current_pile: CardPile;
    export let size:string = "85vw"
    export let card_piles: CardPile[];
    export let text:string = "";
    export let initial_rotation:number = 0;
    export let grab_rotation:number=0;
    export let file_name:string="";

    let initial_pile: CardPile;

    let boxEl : HTMLDivElement;

    $: zIndex = 0;
    $: rotation = 0; 
    $: zIndexProper = 0;
    $: current_pile;
    
    let current_cards: string[];
    $: current_cards;
    
    $: if (current_pile && boxEl) current_cards = current_pile.getCardsInPile()
    $: if (current_cards && boxEl)
    {
        zIndexProper = ((current_cards?.indexOf(neighborhood) ?? -1)+1) * 3
        boxEl.style.zIndex = `${zIndexProper}`
    }

    pileMap.subscribe( map => {
        if (!current_pile)
            return
        let current_cards_store = map.get(current_pile.getId())
        current_cards = [...current_cards_store ?? []]
    })

    
    onMount(async () => {

        const Draggable = await import('gsap/Draggable').then( res => res.default)
        gsap.registerPlugin(Draggable);
        
        initial_rotation = getRotationFromCSS(boxEl)

        const back: HTMLElement | null = boxEl.querySelector('.back')
        const front: HTMLElement | null = boxEl.querySelector('.front')

        zIndexCounter = Number(zIndex);

        boxEl.style.left = current_pile.getX()
        boxEl.style.top = current_pile.getY()

        current_pile.addCardsToPile([ neighborhood ])
        initial_pile = current_pile;

        if (typeof window !== 'undefined') 
        {
            gsap.registerPlugin(Draggable);
            Draggable.create(boxEl, 
            {
            type: "x,y",
                inertia: true,

                onPress() 
                {
                    this.target.style.cursor = "grabbing"; 
                    gsap.to(boxEl,
                    {
                        rotateZ: grab_rotation, 
                        z: 500,
                        duration: 0.3,
                        overwrite: true,
                    })
 
                },
                onRelease() 
                {                 
         
                    this.target.style.cursor = "grab";
                    const distance = (pos1:any, pos2:any): number => {
                        const dx = (pos2.x) - pos1.x;
                        const dy = (pos2.y) - pos1.y;
                        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                    }
                    
                    let r_smallest = Infinity, next_pile = null;
                    const current_position = initial_pile.getPosition()
                    card_piles.forEach((pile:CardPile) => {
                        const snap_position = pile.getPosition()
                        const r = distance(snap_position, { x: current_position.x + this.x, y: current_position.y + this.y });
                        if (r < r_smallest)
                        {
                            r_smallest = r;
                            next_pile = pile;
                        }
                    })

                    moveToPile(next_pile!.getId(), false)

                    if (this.pointerEvent.button == 2)
                    {
                        
                        const flip = async (d: number) => {

                            rotation += 180;
                            gsap.to(boxEl,
                            {
                                rotateY: rotation % 360,
                                duration: 0.75,
                                ease: "power2.out",
                            })
                            await new Promise( _  => setTimeout(_, d*1000))

                            back!.style.zIndex = `${Number(boxEl.style.zIndex) + (rotation % 360 == 0 ? -1 : 1)}`;
                            front!.style.zIndex = `${Number(boxEl.style.zIndex) + (rotation % 360 == 0 ? 1 : -1)}`; 
                        }
                        flip(0.75/5.8)
                        
                    } 
                    
                    const r_norm = r_smallest / Math.sqrt(Math.pow(this.target.offsetWidth, 2) + Math.pow(this.target.offsetHeight, 2))
                    if (((r_norm >= 0.5) || (r_norm <= 0.01)) && (this.pointerEvent.button != 2 && current_pile == next_pile!))
                    {
                        gsap.to(boxEl, 
                        {
                            z: 0,
                            rotationY: rotation % 360,
                            duration: 0.0,
                        })
                        current_pile.moveToBottom(neighborhood)
                    }

                    updatePiles(next_pile!)
    
                }
            });
        }
    });



    function getRotationFromCSS(el: HTMLElement): number 
    {
        const computedStyle = window.getComputedStyle(el);
        const transform = computedStyle.transform;

        if (transform === 'none') return 0;

        const values = transform.match(/matrix\(([^)]+)\)/);
        if (!values) return 0;

        const [a, b] = values[1].split(',').map(parseFloat);

        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    function getHeight(width:string, aspect_ratio:number)
    {
        const w = parseFloat(width)
        const h = w/aspect_ratio
        return `${h}`;
    }

    export function updatePiles(next_pile: CardPile)
    {
       if (current_pile != next_pile)
        {
            current_pile.removeCardsFromPile([ neighborhood ])
            next_pile!.addCardsToPile([ neighborhood ])
            // console.log(`Next pile = ${next_pile!.getCardsInPile()}`)
        }
        current_pile = next_pile! 
    }

    export function moveToPile(id:string, bringUp:boolean=true)
    {
        const current_position = initial_pile.getPosition()
        const next_pile = card_piles.find( p => p.getId() == id)

        const x = next_pile!.getPosition().x - (current_position.x)
        const y = next_pile!.getPosition().y - (current_position.y)

        const tl = gsap.timeline();
        tl.to(boxEl,
        {
            z: 500,
            duration: bringUp ? 0.3 : 0.0,
        }).to(boxEl, {
            rotate: initial_rotation,
            duration: 0.5,
            x,
            y,
            ease: "power2.out",
            rotationY: rotation % 360,
            overwrite: bringUp ? false : true
        }).to(boxEl, {
            z: 0,
            duration: 0.3,
            ease: "power2.out"
        })

        updatePiles(next_pile!)

    }


</script>

<div bind:this={boxEl} id="box" class="draggable" style={style + `width:min(${size}vw, ${size}vh);height:min(${getHeight(size,0.7)}vw, ${getHeight(size,0.7)}vh);`}>
    {#if type == "property"}
        <MonopolyCard neighborhood={neighborhood} />
    {:else if type == "chance"}
        <ChanceCard text={text} file_name={file_name} />
    {:else if type == "community_chest"}
        <CommunityChestCard text={text} file_name={file_name} />
    {/if}
</div>

<style>
    .draggable {
        position: absolute;
        transform-origin: center center;
        /* max-height: 25vh; */
        /* max-width: 500px; */
        /* border: 1px solid green; */
    }
</style>  