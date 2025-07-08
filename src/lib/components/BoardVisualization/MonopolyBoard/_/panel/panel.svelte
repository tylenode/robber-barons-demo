<script lang="ts">
  import { selectedYear } from '$lib/stores/BoardVisualization/store';
    import { SLIDER_YEAR_RANGE } from '../slider/constants';
  import { BOSTON_MEDIAN_HOUSEHOLD_INCOME_BY_YEAR, BOSTON_MEDIAN_PROPERTY_SALES_PRICE_BY_YEAR } from "./constants";
    import { computeChange } from './panel';

  export let title: string;

  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0 // Remove decimals
  });

  const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1
  });

  let baselineMedianHouseholdIncome = BOSTON_MEDIAN_HOUSEHOLD_INCOME_BY_YEAR.get(SLIDER_YEAR_RANGE.min)!
  $: displayedMedianHouseholdIncome = BOSTON_MEDIAN_HOUSEHOLD_INCOME_BY_YEAR.get($selectedYear)!;
  $: changeInMedianHouseholdIncome = computeChange(baselineMedianHouseholdIncome, displayedMedianHouseholdIncome);
  $: incomeChangeMagnitude = Math.abs(changeInMedianHouseholdIncome);

  let baselineMedianPropertySalesPrice = BOSTON_MEDIAN_PROPERTY_SALES_PRICE_BY_YEAR.get(SLIDER_YEAR_RANGE.min)!
  $: displayedMedianPropertySalesPrice = BOSTON_MEDIAN_PROPERTY_SALES_PRICE_BY_YEAR.get($selectedYear)!;
  $: changedInMedianPropertySalesPrice = computeChange(baselineMedianPropertySalesPrice, displayedMedianPropertySalesPrice);
  $: propertySalesChangeMagnitude = Math.abs(changedInMedianPropertySalesPrice);
</script>

<div class="panel">
  <div class="title-container">
    <h2 class="graph-title">
      {title}
    </h2>
    <span class="disclaimer">
      *All percent changes are relative to the year {SLIDER_YEAR_RANGE.min}
    </span>
  </div>
  
  <div class="info-strip">
    <slot name="info"></slot>
    <!-- Boston median income !-->
    <div class="field"><span class="field-title"><span class="field-emoji">💰</span>City Median Household Income:</span> 
      <div>
        {usdFormatter.format(displayedMedianHouseholdIncome)}
          <!-- Showing relative change! -->
          {#if incomeChangeMagnitude > 0} 
            <span
                class="stat-container flash"
                class:positive={changeInMedianHouseholdIncome > 0}
                class:negative={changeInMedianHouseholdIncome < 0}
                style="--magnitude: {incomeChangeMagnitude}"
              >
              {percentFormatter.format(changeInMedianHouseholdIncome)}
            <svg class="arrow-icon" width="16" height="16" fill="var(--flash-color)">
            {#if changeInMedianHouseholdIncome >= 0}
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

    <!-- Boston median house price !-->
    <div class="field"><span class="field-title"><span class="field-emoji">🏠</span>City Median Property Sales Price:</span>
      <div>
        {usdFormatter.format(displayedMedianPropertySalesPrice)}
        <!-- Showing relative change! -->
        {#if propertySalesChangeMagnitude > 0} 
          <span
                class="stat-container flash"
                class:positive={changedInMedianPropertySalesPrice > 0}
                class:negative={changedInMedianPropertySalesPrice < 0}
                style="--magnitude: {propertySalesChangeMagnitude}"
              >
              {percentFormatter.format(changedInMedianPropertySalesPrice)}
            <svg class="arrow-icon" width="16" height="16" fill="var(--flash-color)">
            {#if changedInMedianPropertySalesPrice >= 0}
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
    <!-- Price to income ratio !-->
  </div>
</div>

<style>
  .panel {
    width: 100%;
    background-color: #f5f5f5;
  }

  .graph-title {
    font-size: 1.5rem;
    color: #20222a;
    text-align: center;
  }

  .info-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 95%;
    padding-bottom: 0.5rem;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }

  .field {
    font-size: 1.1rem;
    place-items: center; /* Shorthand for both axes */
  }

  .field-title {
    font-weight: bold;
  }

  .field-emoji {
    font-size: 1.5rem;
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

  .title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
}

.disclaimer {
  font-size: 0.9rem;
  color: #666;
  position: absolute;
  right: 1.2%;
  margin-top: 0.5rem;
}

.graph-title {
  font-size: 1.5rem;
  color: #20222a;
  text-align: center;
  /* Remove if previously set */
  margin-bottom: 0.25rem;
}
</style>