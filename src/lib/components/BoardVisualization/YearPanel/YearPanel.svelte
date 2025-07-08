<script lang="ts">
    import { referenceYear, currentYear, isPlaying, isValidYear, resetAnimation, togglePlayPause, MIN_YEAR, MAX_YEAR, loopToStart } from '$lib/stores/BoardVisualization/YearPanel/YearData';
    import goImage from '$lib/images/board_visualization/year_panel/go.png';

    let referenceInput: string = $referenceYear.toString();
    $: inputAsNumber = parseInt(referenceInput);
    $: inputIsValid = isValidYear(inputAsNumber);
    let isEditing = false;
    $: showLoopButton = $currentYear === MAX_YEAR;
  
    const handleGoButtonPress = () => {
      if (inputIsValid && referenceInput !== '') {
        referenceYear.set(inputAsNumber);
        resetAnimation();
      }
    };

    const handleYearClick = () => {
      isEditing = true;
    };

    const handleBlur = () => {
      if (!inputIsValid || referenceInput === '') {
        referenceInput = $referenceYear.toString();
      }
      isEditing = false;
    };
</script>
  
  <!-- Reference Year Box -->
  <div class="year-box">
    <div class="box-label">
      Reference Year
      <div class="info-icon" role="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div class="tooltip">
          • Click on the year to edit<br>
          • Enter a year between {MIN_YEAR} and {MAX_YEAR}. This will be set the reference year. <br>
          • Press Go to play animation of how Boston's housing market changed since the reference year.
        </div>
      </div>
    </div>
    <div class="box-content">
      {#if isEditing}
        <input
          class="year-input"
          bind:value={referenceInput}
          type="text"
          placeholder={`${MIN_YEAR} to ${MAX_YEAR}`}
          on:blur={handleBlur}
        />
      {:else}
        <div 
          class="year-display"
          on:click={handleYearClick}
          on:keydown={(e) => e.key === 'Enter' && handleYearClick()}
          tabindex="0"
          role="button"
        >
          {referenceInput}
        </div>
      {/if}
      <button
        class="action-button"
        on:click={handleGoButtonPress}
        disabled={!inputIsValid || referenceInput === ''}
        aria-label={inputAsNumber === MAX_YEAR ? "No future years to play" : "Go to year"}
      >
        <img src={goImage} alt="Go" />
        <div class="tooltip">Go</div>
        {#if inputAsNumber === MAX_YEAR}
          <div class="tooltip">
            No future years available to play
          </div>
        {/if}
      </button>
    </div>
    {#if !inputIsValid && referenceInput !== ''}
      <div class="error-message">
        Please enter a year between {MIN_YEAR} and {MAX_YEAR}
      </div>
    {/if}
  </div>

  <!-- Current Year Box -->
  <div class="year-box current-year-box">
    <div class="box-label">
      Current Year
      <div class="info-icon" role="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div class="tooltip">
          • Click play/pause to control the animation<br>
          • Drag the progress bar to jump to a specific year<br>
          • When animation ended, press replay to start over
        </div>
      </div>
    </div>
    <div class="box-content">
      <div class="year-display">{$currentYear}</div>
      {#if showLoopButton}
        <button
          class="action-button"
          on:click={loopToStart}
          aria-label="Loop to start"
          disabled={$referenceYear === MAX_YEAR}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9"></path>
            <path d="M23 13l-2-3-2 3"></path>
          </svg>
          <div class="tooltip">Replay</div>
        </button>
      {:else}
        <button
          class="action-button"
          on:click={togglePlayPause}
          aria-label={$isPlaying ? "Pause" : "Play"}
          disabled={$referenceYear === MAX_YEAR}
        >
          {#if $isPlaying}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            <div class="tooltip">Pause</div>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <div class="tooltip">Play</div>
          {/if}
        </button>
      {/if}
    </div>
    <div class="progress-container">
      <input 
        type="range" 
        class="progress-bar"
        min={$referenceYear}
        max={MAX_YEAR}
        value={$currentYear}
        disabled={$referenceYear === MAX_YEAR}
        on:input={(e) => {
          const target = e.target as HTMLInputElement;
          currentYear.set(parseInt(target.value));
        }}
      />
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

  .current-year-box {
    min-height: 5rem;
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
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding: 0 0.5rem;
  }

  .year-input {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    background: transparent;
    border: none;
    border-bottom: 0.125rem solid #1A1A1A;
    color: #1A1A1A;
    outline: none;
    margin: 0 auto;
  }

  .year-input::placeholder {
    font-size: 1.8rem;
    opacity: 0.5;
  }

  .year-display {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: #1A1A1A;
    cursor: pointer;
    margin: 0 auto;
  }

  .action-button {
    margin-left: 0.5rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3.5rem;
    min-height: 2.5rem;
    position: relative;
  }

  .action-button img {
    width: 4.2rem;
    height: 3rem;
  }

  .action-button svg {
    width: 3.5rem;
    height: 2.5rem;
    color: #1A1A1A;
  }

  .action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error-message {
    color: #666666;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    text-align: center;
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .info-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: help;
  }

  .info-icon svg {
    width: 1rem;
    height: 1rem;
    color: #666;
  }

  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0.5rem);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    width: max-content;
    max-width: 20rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
    z-index: 1000;
  }

  .info-icon:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0.25rem);
  }

  .tooltip::before {
    display: none;
  }

  .progress-container {
    margin: 0.5rem 0;
    padding: 0 0.5rem;
  }

  .progress-bar {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 0.25rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.125rem;
    outline: none;
    cursor: pointer;
  }

  .progress-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: #1A1A1A;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .progress-bar::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    background: #1A1A1A;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .progress-bar::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .progress-bar::-moz-range-thumb:hover {
    transform: scale(1.2);
  }

  .progress-bar:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .progress-bar:disabled::-webkit-slider-thumb {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .progress-bar:disabled::-moz-range-thumb {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .action-button .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0.5rem);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    width: max-content;
    max-width: 20rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
    z-index: 1000;
  }

  .action-button:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0.25rem);
  }

  .action-button .tooltip::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0.5rem;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
  }
</style>
  
