<!-- Oliver Rayner, April 2025 -->

<script lang="ts">

    import cursor from '$lib/images/cursor.svg';
    import { onMount } from 'svelte';
    import { fade } from "svelte/transition";
    let showCursor = true;

    let element: HTMLDivElement;
	let observer: IntersectionObserver;
    export let timeout = "5000";

    onMount(() => {
		observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
                // console.log("starting timeout...")
				setTimeout(() => {
					showCursor = false;
				}, parseFloat(timeout));
				observer.disconnect(); 
			}
		}, { threshold: 0.1 });

		if (element) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
		};
	}); 

</script>


    {#if showCursor}
	    <div 
            bind:this={element}
            class="cursor-icon"
            transition:fade={{ duration: 400 }}
        >
            <img src={cursor} alt="cursor" style="width: 100%;">
        </div>
    {/if}


<style>

    .cursor-icon {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		animation: drag-down 2s ease-in-out infinite;
		pointer-events: none;
		opacity: 0.8;
	}

	@keyframes drag-down {
		0% {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
		30% {
			transform: translateX(-50%) translateY(200px);
			opacity: 1;
		}
		100% {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
	}

</style>