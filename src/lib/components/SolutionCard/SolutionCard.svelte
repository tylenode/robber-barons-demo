<script lang="ts">
    // --- props ---------------------------------------------------------------
    import backSrc from '$lib/images/flip_card/back_card.svg'
    import frontSrc from '$lib/images/flip_card/front_card.svg'

    export let text: string;                 // text for the white face
  
    // --- state ---------------------------------------------------------------
    let flipped = false;
    const toggle = () => (flipped = !flipped);
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
            <div class="white-card">
                <p>{@html text}</p>
            </div>
      </div>
    </div>
  </div>
  
  <style>
    /* the wrapper gives us 3-D perspective */
    .card {
      perspective: 1000px;
      cursor: pointer;
      height: 210px;
      width: 330px;
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
      user-select: none;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background: #fff;
      border: 2px solid #000;
      padding: 1rem 0.75rem;
      text-align: center;
      font-size: 1.7rem;
      line-height: 2.5rem;
    }
    .white-card p { margin: 0}
  </style>
  