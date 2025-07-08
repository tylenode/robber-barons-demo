<script lang="ts">
  import { selectedYear } from '$lib/stores/BoardVisualization/store';
  import { SLIDER_YEAR_RANGE, SLIDER_DEFAULT_YEAR } from './constants';
  selectedYear.set(SLIDER_DEFAULT_YEAR);
</script>

<div class="slider-container">
  <div class="slider-group">
    <div class="field"><span class="field-title"><span class="field-emoji">🗓️</span> Year:</span> {$selectedYear}</div>
    <input
      class="slider"
      type="range"
      bind:value={$selectedYear}
      min={SLIDER_YEAR_RANGE.min}
      max={SLIDER_YEAR_RANGE.max}
    />
  </div>
</div>

<style>
  .slider-container {
    width: 100%;
    padding-bottom: 0.7rem;
  }
  
  .slider-group {
    display: flex;
    align-items: center;
  }

  input[type="range"] {
    margin-left: 0.5rem;
  }

  .field {
    font-size: 1.1rem;
  }

  .field-title {
    font-weight: bold;
  }

  .slider {
    width: 12rem;
  }

  .field-emoji {
    font-size: 1.5rem;
  }
</style>