<script lang="ts">
  import MessageBox from "../MessageBox/MessageBox.svelte";
  import cash from "$lib/images/flip_profit_slide/cash.png";

  let showPercent = false;
</script>

<div class="outer">
  <div class="return-visual">
    <div class="profit-table">
      <div class="title">Median Yearly Return From Flip Sales (Year 2000–2022)</div>

      <div class="label">Big Corporate Investors</div>
      <div class="number large">
        {#if showPercent}
          20<span class="unit">%</span>
        {:else}
          $189K
        {/if}
      </div>

      <img
        src={cash}
        alt="cash"
        class="cash-img"
        on:mouseenter={() => showPercent = true}
        on:mouseleave={() => showPercent = false}
      />
      <div class="hover-note">Hover me to see return rates</div>

      <div class="divider"></div>

      <div class="label">Other Investors</div>
      <div class="number">
        {#if showPercent}
          9<span class="unit">%</span>
        {:else}
          $66K
        {/if}
      </div>
    </div>

    <div class="absolute-message-box">
      {#if showPercent}
        <MessageBox arrowDirection="top">
          <div class="flex-message">
            <div>
              The percentages you see represent the <span class="bolder">yearly return relative to purchase price</span>.
            </div>
            <div>
              <span class="bolder">Example:</span> If a big corporate investor flips a $500K property for $600K in one year, that’s a $100K profit — a <span class="bolder">20% return</span>.
            </div>
            <div>
              <span class="bolder">Take-away:</span> Big corporate investors don't just make more money — they earn a higher return on every dollar they flip.
            </div>
          </div>
        </MessageBox>
      {:else}
        <MessageBox arrowDirection="top">
          <div class="flex-message">
            <div>
              Not only do big corporate investors flip more often — they also profit way more when they flip.
              In fact, their <span class="bolder">profit is close to 3× more yearly</span> when compared to other investors.
            </div>
            <div>
              With each flip, they accumulate more than before, racking up piles of cash which they can use for their next flips.
            </div>
          </div>
        </MessageBox>
      {/if}
    </div>
  </div>
</div>


<style>
  .outer {
  display: absolute;
  margin-top: -58vh;
  margin-left: 50vw;
  }

  .return-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Segoe UI', sans-serif;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1;
    gap: 0.2rem;
  }

  .profit-table {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .title {
    font-weight: 500;
    opacity: 0.6;
    margin-bottom: 0.2rem;
  }

  .label {
    font-size: 2rem;
    opacity: 0.65;
  }

  .number {
    font-size: 5.2rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  .number.large {
    font-size: 8rem;
    font-weight: 700;
  }

  .divider {
    width: 25.5rem;
    height: 0.35rem;
    background: linear-gradient(to right, hotpink, deepskyblue);
    border-radius: 2px;
    margin: 0.3rem 0;
  }

  .absolute-message-box {
    font-weight: 300;
    width: 25rem;
  }

  .flex-message {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .bolder {
    font-weight: 600;
  }

  .cash-img { 
    position: absolute;
    width: 10rem;
    margin-left: 14.5rem;
    margin-top: 15.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
    cursor: pointer;
  }

  .cash-img:hover {
    transform: translateY(-2px) rotateZ(2deg) scale(1.03);
  }

  .unit {
    font-size: 2.5rem;
    vertical-align: super;
    opacity: 0.7;
  }

  .hover-note {
    position: absolute;
    top: 13rem;
    left: 17rem;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }
</style>