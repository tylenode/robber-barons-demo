<script lang="ts">
  import { onMount } from 'svelte';
  import { selectedTileId, currentPin } from '$lib/stores/BoardVisualization/store';
  import { currentPlayerSvg } from '$lib/stores/BoardVisualization/PlayerPanel/PlayerData';
  import { getTileIdFromCoordinates, initializeBoard } from './board';
  import boardImage from '$lib/images/new-board.png';
  import MonopolyCardWithTab from '$lib/components/MonopolyCard/MonopolyCardWithTab.svelte';

  let svgContainer: SVGSVGElement;
  let boardImageElement: HTMLImageElement;
  let boardController: ReturnType<typeof initializeBoard>;

  function handleClick(event: MouseEvent) {
    if (!boardImageElement) return;
    const rect = boardImageElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const tileId = getTileIdFromCoordinates(x, y, boardImageElement);
    
    if (tileId) {
      $selectedTileId = tileId;
      currentPin.set({
        tileId: $currentPin.tileId === tileId ? null : tileId,
        svg: $currentPin.tileId === tileId ? null : $currentPlayerSvg
      });
    }
  }

  onMount(() => {
    if (!svgContainer || !boardImageElement) return;
    const init = () => {
      boardController = initializeBoard(svgContainer, (tileId) => {
        $selectedTileId = tileId;
      });
    };
    init();
    const resizeObserver = new ResizeObserver(() => {
      boardController?.updateDimensions(boardImageElement.clientWidth);
    });
    resizeObserver.observe(boardImageElement);
    return () => resizeObserver.disconnect();
  });
</script>

<button class="board" on:click={handleClick}>
  <img
    bind:this={boardImageElement}
    src={boardImage}
    alt="Game board layout with tiles"
    class="board-image"
  />
  <svg
    bind:this={svgContainer}
    class="board-overlay"
  ></svg>
  {#if $selectedTileId}
    <div class="card-display">
      <MonopolyCardWithTab neighborhood={$selectedTileId} />
    </div>
  {/if}
</button>

<style>
  .board {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    cursor: pointer;
  }

  .board-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .board-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .card-display {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 18.5rem;
    transform: translate(-50%, -50%);
    border: 2px solid #666;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.95);
  }
</style>
