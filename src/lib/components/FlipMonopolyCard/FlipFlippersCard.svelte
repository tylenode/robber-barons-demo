<script lang="ts">
    // --- props ---------------------------------------------------------------
    import { createEventDispatcher } from 'svelte';
    import backSrc from '$lib/images/flip_card/monopoly_card_back.jpeg'
    import MonopolyCardFront from '$lib/components/MonopolyCard/MonopolyCardFlippersFront.svelte';
    import MonopolyCardBack from '$lib/components/MonopolyCard/MonopolyCardFlippersBack.svelte';

    export let neighborhood: string;                 // text for the white face
    export let allFlipped: boolean | undefined = undefined;   //  NEW
  
    // --- state ---------------------------------------------------------------
    let flipped = false;
    const toggle = () => (flipped = !flipped);

    $: if (allFlipped !== undefined) flipped = allFlipped;
	const dispatch = createEventDispatcher();

	/** flip the card and tell the parent which one was clicked */
	function handleClick() {
		flipped = !flipped;                     // same behaviour as your old toggle()
		dispatch('select', { neighborhood });   // let the parent know
	}

  </script>
  
  <div class="card" on:click={handleClick}>
    <div class="inner" class:flipped={flipped}>
      <!-- blue / “back” ------------------------------------------------------->
      <div class="face back">
            <MonopolyCardBack neighborhood={neighborhood} />
      </div>
  
      <!-- white / “front” ----------------------------------------------------->
      <div class="face front">
          <!-- <img src={frontSrc} alt="card front" /> -->
            <MonopolyCardFront neighborhood={neighborhood} />
      </div>
    </div>
  </div>
  
  <style>
    /* the wrapper gives us 3-D perspective */
    .card {
      perspective: 1000px;
      cursor: pointer;
      width: 145px;          /* tweak to match your art-board */
      height: 235px;
    }
  
    /* ----- inner panel that actually spins ----- */
    .inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    .flipped { transform: rotateY(180deg); }
  
    /* ----- the two faces ---------------------------------------------------- */
    .face {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .face img { width: 100%; height: 100%; object-fit: cover; }
  
    /* front (white) needs to face the viewer after 180° flip */
    .front { transform: rotateY(180deg); }
  
    /* quick “white card” template if no `frontSrc` is supplied -------------- */
    .white-card {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background: #fff;
      border: 2px solid #000;
      padding: 1rem 0.75rem;
      text-align: center;
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
    .white-card p { margin: 0}
  </style>
  