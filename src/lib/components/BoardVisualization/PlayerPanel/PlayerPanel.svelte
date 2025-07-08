<script lang="ts">
    import { selectedPlayerType, PlayerType, NameByPlayerType, SvgByPlayerType, currentPlayerSvg } from '$lib/stores/BoardVisualization/PlayerPanel/PlayerData';

    function nextType() {
        const types = Object.values(PlayerType);
        const currentIndex = types.indexOf($selectedPlayerType);
        const nextIndex = (currentIndex + 1) % types.length;
        selectedPlayerType.set(types[nextIndex]);
        currentPlayerSvg.set(SvgByPlayerType[types[nextIndex]]);
    }

    function prevType() {
        const types = Object.values(PlayerType);
        const currentIndex = types.indexOf($selectedPlayerType);
        const prevIndex = (currentIndex - 1 + types.length) % types.length;
        selectedPlayerType.set(types[prevIndex]);
        currentPlayerSvg.set(SvgByPlayerType[types[prevIndex]]);
    }
</script>

<div class="year-box">
    <div class="box-label">
        Play As
        <div class="info-icon" role="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div class="tooltip">
                • Choose which player you want to play by clicking the arrow buttons<br>
            </div>
        </div>
    </div>
    <div class="box-content">
        <div class="player-type-controls">
            <button class="arrow-button" on:click={prevType} aria-label="Previous player type">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <div class="player-display">
                <img src={$currentPlayerSvg} alt="Player" class="player-image" />
                <div class="player-type">{$selectedPlayerType}</div>
                <div class="player-name">{NameByPlayerType[$selectedPlayerType][0]}</div>
            </div>
            <button class="arrow-button" on:click={nextType} aria-label="Next player type">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    </div>
</div>

<style>
    .year-box {
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        position: relative;
        width: 16rem;
        padding: 1rem;
        min-height: 5rem;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
    }

    .box-label {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: 1rem;
        color: #1A1A1A;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .box-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 1.5rem;
        padding: 0 0.5rem;
    }

    .player-type-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .player-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .player-image {
        width: 4rem;
        height: 4rem;
    }

    .player-type {
        font-size: 1.2rem;
        font-weight: 600;
        color: #1A1A1A;
        text-align: center;
    }

    .player-name {
        font-size: 0.9rem;
        color: #1A1A1A;
        text-align: center;
    }

    .arrow-button {
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .arrow-button svg {
        width: 1.5rem;
        height: 1.5rem;
        color: #1A1A1A;
    }

    .arrow-button:hover svg {
        color: #666;
    }

    .info-icon {
        position: relative;
        cursor: help;
    }

    .info-icon svg {
        width: 1rem;
        height: 1rem;
    }

    .tooltip {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 1000;
        display: none;
    }

    .info-icon:hover .tooltip {
        display: block;
    }
</style> 