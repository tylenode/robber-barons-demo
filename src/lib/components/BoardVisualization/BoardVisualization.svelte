<script lang="ts">
    import Board from './MonopolyBoard/board/board.svelte';
    import YearPanel from './YearPanel/YearPanel.svelte';
    import PlayerPanel from './PlayerPanel/PlayerPanel.svelte';
</script>

<section class="visualization-page">
    <div class="panels-wrapper">
        <YearPanel></YearPanel>
        <PlayerPanel></PlayerPanel>
    </div>
    <div class="board-layout">
        <div class="board-container">
            <Board />
        </div>
    </div>
</section>

<style>
    .visualization-page {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 1rem;
        padding: 1rem;
    }
    
    
    .panels-wrapper {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .board-layout {
        display: flex;
        flex: 1;
        gap: 2rem;
        width: 100%;
        padding: 1rem;
    }

    .board-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-width: 50%;
        aspect-ratio: 1;
    }
</style>
