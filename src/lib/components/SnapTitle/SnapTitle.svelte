<script lang="ts">
  import { fade } from 'svelte/transition';
  export let text: string;
  export let align: 'left' | 'center' | 'right' = 'left';
  export let hasUnderline = false;

  $: lines = text.split("@"); // this is our custom line break
</script>

<div class="snap-text-wrapper">
  <div 
    class="snap-text" 
    style="text-align: {align}; padding-left: {align === 'left' ? '10vw' : '0'}; padding-right: {align === 'right' ? '10vw' : '0'}"
  >
    {#each lines as line}
      <div class="title-line">
        {line}
        {#if hasUnderline}
          <slot />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .snap-text-wrapper {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: flex-sxtart;
    align-items: flex-start;
    overflow: hidden;
  }
  
  .snap-text {
    font-size: 2.6rem;
    line-height: 1;
    font-weight: bold;
    margin-top: 2.8rem;
    width: 100%;
    max-width: 90vw;
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    transform-origin: left;
    box-sizing: border-box;
  }

  .title-line {
    margin-bottom: 0.3rem;
    max-width: 100%;
    overflow-wrap: break-word;
    transform-origin: left;
    box-sizing: border-box;
  }
</style>
