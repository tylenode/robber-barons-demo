<script lang="ts">
  import { selectedTileId, selectedYear } from '$lib/stores/BoardVisualization/store';
  import { StatLabel } from './types';
  import { DEFAULT_MESSAGES, TILE_COLOR_BY_TILE_ID } from './constants';
  import { BOARD_TILE_BY_TILE_ID } from '../../board/constants';
  import cardImage from '$lib/images/card.png';
  import { TileType } from '../../board/types';
  import { SLIDER_DEFAULT_YEAR } from '../slider/constants';

  // Redeploy
  const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1
  });

  $: displayedTile = $selectedTileId ? BOARD_TILE_BY_TILE_ID.get($selectedTileId) : null;
  $: displayedTileName = $selectedTileId ? $selectedTileId.toUpperCase() : "";
  $: displayedTileColor = TILE_COLOR_BY_TILE_ID.get($selectedTileId) || "#FFFFFF"; 

  $: absenteeRateChange = displayedTile && displayedTile.stats ? displayedTile.stats[$selectedYear].absentee_rate - displayedTile.stats[SLIDER_DEFAULT_YEAR].absentee_rate : null
  $: corporateOwnershipRateChange = displayedTile && displayedTile.stats ? displayedTile.stats[$selectedYear].corporate_ownership_rate - displayedTile.stats[SLIDER_DEFAULT_YEAR].corporate_ownership_rate : null
</script>

<div class="info-card">
  <div class="card">
  {#if displayedTileName && displayedTile}
      <!-- This is our empty template card -->
      <img src={cardImage} alt="Card" class="card-image" />
      <!-- And the dynamic color/name we inject -->
      <div class="dynamic-box" style:background-color={displayedTileColor}>
        <span class="dynamic-name">{displayedTileName}</span>
      </div>
      {#if displayedTile.type === TileType.NEIGHBORHOOD && displayedTile.stats}
      {#if displayedTile.stats[$selectedYear]}
        <div class="stats">
          <!-- Absentee rate -->
          <div>
            {StatLabel.ABSENTEE_RATE}: {displayedTile.stats[$selectedYear].absentee_rate}
              <!-- Showing relative change! -->
              {#if absenteeRateChange && Math.abs(absenteeRateChange) > 0} 
                <span
                    class="stat-container flash"
                    class:positive={absenteeRateChange > 0}
                    class:negative={absenteeRateChange < 0}
                    style="--magnitude: {absenteeRateChange}"
                  >
                  {percentFormatter.format(absenteeRateChange)}
                <svg class="arrow-icon" width="16" height="16" fill="var(--flash-color)">
                {#if absenteeRateChange >= 0}
                  <!-- Green up arrow -->
                  <path d="M8 4l4 4H4z" />
                {:else}
                  <!-- Red down arrow -->
                  <path d="M8 12l-4-4h8z" />
                {/if}
                </svg>
                </span>
              {/if}
          </div>
          
          <!-- Corporate ownership rate -->
          <div>
            {StatLabel.CORPORATE_OWNER_RATE}: {displayedTile.stats[$selectedYear].corporate_ownership_rate}
              <!-- Showing relative change! -->
              {#if corporateOwnershipRateChange && Math.abs(corporateOwnershipRateChange) > 0} 
                <span
                    class="stat-container flash"
                    class:positive={corporateOwnershipRateChange > 0}
                    class:negative={corporateOwnershipRateChange < 0}
                    style="--magnitude: {corporateOwnershipRateChange}"
                  >
                  {percentFormatter.format(corporateOwnershipRateChange)}
                <svg class="arrow-icon" width="16" height="16" fill="var(--flash-color)">
                {#if corporateOwnershipRateChange >= 0}
                  <!-- Green up arrow -->
                  <path d="M8 4l4 4H4z" />
                {:else}
                  <!-- Red down arrow -->
                  <path d="M8 12l-4-4h8z" />
                {/if}
                </svg>
                </span>
              {/if}
          </div>

        </div>
        {:else}
          <div class="stat-no-data">
            {DEFAULT_MESSAGES.noData}
          </div>
        {/if}
      {:else}
        <p>
        {#if displayedTileName === "MIT"}
          {DEFAULT_MESSAGES.mitTile}
        {:else}
          {DEFAULT_MESSAGES.specialTile}
        {/if}
        </p>
      {/if}
  {:else}
    <p>{DEFAULT_MESSAGES.selectTile}</p>
  {/if}
  </div>
</div>

<style>
  .info-card {
    width: 300px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  /* Card container with relative positioning for absolute children */
  .card {
    position: relative;
    width: 300px;
    height: 450px;
    text-align: center; /* Merged from parent */
  }

  /* Base card image */
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Dynamic name box - already properly positioned */
  .dynamic-box {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 15%;
    border-radius: 0.3rem;
    outline: 0.1rem solid rgb(39, 38, 38);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dynamic-name {
    font-family: 'OpenSans', sans-serif;
    font-size: 1.33rem;
    font-weight: 700;
    color: #030304;
    padding: 0 10px;
  }

  /* STATS POSITIONING - Add these rules */
  .stats {
    position: absolute;
    top: calc(8% + 15% + 20px); /* dynamic-box top + height + margin */
    left: 10%;
    width: 80%;
    border-radius: 0.5rem;
    text-align: left;
    font-size: 0.9rem;
    color: #333;
  }

  /* stat-no-data message position */
  .stat-no-data {
    position: absolute;
    top: calc(8% + 15% + 20px);
    left: 10%;
    width: 70%;
    padding: 1rem;
    background: rgba(198, 228, 198, 0.9);
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
  }

  /* Special tile message position */
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    font-size: 0.9rem;
    color: #555;
    margin: 0; /* Remove default margin */
  }

  .flash {
    animation: blink linear infinite;
    animation-duration: calc(max(0.25s, 1.2s / (var(--magnitude, 0.01) * 3)));
  }

  .positive {
    --flash-color: green;
    color: var(--flash-color);
  }

  .negative {
    --flash-color: red;
    color: var(--flash-color);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
</style>