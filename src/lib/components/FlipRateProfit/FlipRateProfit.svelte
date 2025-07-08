<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  import MessageBox from '../MessageBox/MessageBox.svelte';
  
    let canvas: HTMLCanvasElement;
    let chart: Chart;
  
    const flipRates = {
      labels: ['Big corporate Investors', 'Other Investors'],
      datasets: [
        {
          label: 'Flip Sales Rate (%)',
          data: [7.5, 3.2],
          backgroundColor: ['#FF6384', '#36A2EB'],
          borderRadius: 12,
          barThickness: 50,
        }
      ]
    };
  
    onMount(() => {
      chart = new Chart(canvas, {
        type: 'bar',
        data: flipRates,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              xAlign: "right",
              yAlign: 'center'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Average Property Flip Sales Rate: Year 2000-2022',
                font: {
                  size: 20,
                  weight: 'bold'
                },
                padding: { top: 10 }
              },
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            },
            y: {
              min: 0,
              max: 15,
              grid: {
                display: false
              },
              ticks: {
                stepSize: 5,
                callback: (value: number | string) => value + '%',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    });
  </script>
  
  <div class="container">
    <div class="chart-container">
      <div class="message-box">
        <MessageBox arrowDirection="bottom">
          <div class="flex-message">
            <div>
              Big corporations <span class="bolder">flip and resell homes twice as more often</span> other players in the market.
            </div>
            <div>
              This frequent flipping drives up home prices, as each resale often comes with a markup.
            </div>
          </div>
        </MessageBox>
      </div>
      <canvas bind:this={canvas}></canvas>
      <div class="subtitle-flex subtitle">
        This chart contrastst flip sales rate between big corporate investors and others.
        <div>
          Flip sales rate means: "How many of your sales are flips?"
        </div>
        <div>
          A flip means to sell a property within 2 years after purchase.
        </div>
        <div>
          A high flip rate means many properties were resold within 2 years after purchase.
        </div>

        <div>
          <span class="bolder">A big corporate investor</span> is defined as a large or institutional investor. They both often
          have huge capital and a system to stratetically profit from the housing market.
        </div>

      </div>
    </div>
  </div>
  
    
  <style>
    .container {
        /* position: absolute; */
        margin-left: 7vw;
        width: 49%;
    }
  
    .chart-container {
        margin-top: 12rem;
        height: 50vh;
        position: relative;
        /* border-style: solid; */
    }

    .subtitle {
      font-size: 0.8rem;
      font-style: italic;
      color: #888;
      text-align: left;
      max-width: 90%;
      margin-left: 6.5rem;
      margin-right: auto;
    }

    .subtitle-flex {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .message-box {
      position: absolute;
      margin-top: -2.2rem;
      margin-left: 9rem;
      font-weight: 300;

      width: 26rem;

      /* border-style: solid; */
    }

    .bolder {
      font-weight: 600;
    }

    .flex-message {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  </style>