<script lang="ts">
    // --- props ---------------------------------------------------------------
    import backSrc from '$lib/images/flip_card/monopoly_card_back.jpeg'
    import MonopolyCardInfo from '$lib/components/MonopolyCard/MonopolyCardInfo.svelte';
    import MonopolyCardWithTab from '../MonopolyCard/MonopolyCardWithTab.svelte';

    export let neighborhood: string;                 // text for the white face
    export let allFlipped: boolean | undefined = undefined;   //  NEW
  
    // --- state ---------------------------------------------------------------
    let flipped = false;
    const toggle = () => (flipped = !flipped);

    $: if (allFlipped !== undefined) flipped = allFlipped;
  </script>
  
  <div class="card" on:click={toggle}>
    <div class="inner" class:flipped={flipped}>
      <!-- blue / “back” ------------------------------------------------------->
      <div class="face back">
        <img src={backSrc} alt="card back" />
      </div>
  
      <!-- white / “front” ----------------------------------------------------->
      <div class="face front">
          <!-- <img src={frontSrc} alt="card front" /> -->
            <MonopolyCardInfo neighborhood={neighborhood} />
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
  
  </style>
  