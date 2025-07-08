<script lang="ts">
  import { fade } from 'svelte/transition';
  export let align: 'left' | 'center' | 'right' = 'left';
</script>

<div class="snap-text-wrapper" in:fade={{ duration: 1500 }}>
  <div 
    class="snap-subtext" 
    style="text-align: {align}; padding-left: {align === 'left' ? '10vw' : '0'}; padding-right: {align === 'right' ? '10vw' : '0'}"
  >
    <slot />
    </div>
</div>

<style>
  .snap-text-wrapper {
      max-width: 65%;
      text-wrap: normal;
      position: absolute;

      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      overflow: hidden;
  }

  .snap-subtext {
    margin-top: 9.5rem;

    line-height: 1.25rem;
    max-width: 90vw;

    font-size: 1.05rem;
    margin-left: 0.2rem;
    font-weight: 300;
    line-height: 1.3rem;
    color: rgb(50, 48, 48);

  }
</style>