<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import 'chartjs-plugin-crosshair';
  import type { ChartTypeRegistry, TooltipItem } from 'chart.js';

  let chart: Chart;
  let canvas: HTMLCanvasElement | null = null;

  const medianFamilyIncomes = 
  [38570, 39490, 42020, 42350, 44010, 46750, 52250, 49860, 50960, 52020, 56020, 55330, 58460, 60320, 59370, 60930, 63310, 63660, 62530, 63150, 67860, 72270, 76240, 86350, 87710, 87810, 86570, 93550, 106500, 106501]
  const baseMedianFamilyIncome = medianFamilyIncomes[0] // in 1995

  const housePriceIndex =
  [100.0, 106.5, 109.7, 116.9, 128.1, 148.6, 168.4, 189.5, 212.9, 234.9, 261.4, 272.6, 263.6, 253.8, 239.8, 228.1, 226.4, 224.8, 227.9, 236.7, 249.1, 262.8, 275.5, 293.5, 306.9, 320.4, 342.6, 396.2, 420.8, 454.0]
  const baseAverageHousePrice = 227826

  function formatThatYearPriceOrIncome(indexValue: number, base: number): string {
    // price/income of the year based on index value
    const price = Math.round(base * (indexValue / 100));
    return price >= 1_000_000
      ? `${+(price / 1_000_000).toFixed(2)}M`
      : price >= 1_000
      ? `${+(price / 1_000).toFixed(1)}K`
      : `${price}`;
  }

  const data = {
    labels: ['1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        // https://fred.stlouisfed.org/series/ATNHPIUS14454Q
        label: 'House Price Index',
        data: housePriceIndex,
        borderColor: '#CA6355',
        backgroundColor: '#CA6355',
        borderWidth: 4,
        pointRadius: 0,
        tension: 0.4
      },
      {
        // https://fred.stlouisfed.org/series/MEHOINUSMAA646N
        label: 'Family Income Index',
        data: medianFamilyIncomes.map( v => Number(((v/baseMedianFamilyIncome)*100).toFixed(1))), // Interpolated 1995 data
        borderColor: '#0271BB',
        backgroundColor: '#0271BB',
        borderWidth: 4,
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };



  onMount(() => {

    // this controls the dash line
    const verticalLinePlugin = {
      id: 'verticalLinePlugin',
      afterDraw(chart: Chart) {
        const ctx = chart.ctx;
        const tooltip = chart.tooltip;
        
        if (!tooltip || !tooltip.getActiveElements().length) return;
        
        const activeElement = tooltip.getActiveElements()[0];
        const x = activeElement.element.x;
        const yAxis = chart.scales.y;
      
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, yAxis.top);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#818483';
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.restore();
      }
    };


    chart = new Chart(canvas!, {
      type: 'line',
      data,
      plugins: [verticalLinePlugin],
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          // @ts-ignore - crosshair plugin types
          crosshair: {
            line: {
              color: '#F7FAFC',
              width: 1,
              dashPattern: [5, 5]
            },
            sync: {
              enabled: false
            },
            zoom: {
              enabled: false
            },
            snap: {
              enabled: true
            },
            callbacks: {
              beforeZoom: () => function() { return false; },
              beforePan: () => function() { return false; }
            }
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                const year = context[0].label.replace(',', '');
                return `Year ${year}`
              },
              label: (context: TooltipItem<keyof ChartTypeRegistry>) => {
                const label = context.dataset.label || '';
                const value = typeof context.raw === 'number' ? context.raw.toFixed(1) : context.raw;
                return `${label}: ${value}`;
              },
              afterBody: (context: TooltipItem<keyof ChartTypeRegistry>[]) => {
                if (context.length === 0) return [];

                let averageHomePriceStr = '';
                let medianFamilyIncomeStr = '';
                let affordability = '';

                // Determine if the relevant datasets are present
                const priceItem = context.find(item => item.dataset.label === 'House Price Index');
                const incomeItem = context.find(item => item.dataset.label === 'Family Income Index');

                if (priceItem) {
                  const priceIndex = typeof priceItem.raw === 'number' ? priceItem.raw : 0;
                  const averageHomePrice = formatThatYearPriceOrIncome(priceIndex, baseAverageHousePrice);
                  averageHomePriceStr = `Average Home Price: ${averageHomePrice}`;
                }

                if (incomeItem) {
                  const incomeIndex = typeof incomeItem.raw === 'number' ? incomeItem.raw : 0;
                  const medianFamilyIncome = formatThatYearPriceOrIncome(incomeIndex, baseMedianFamilyIncome);
                  medianFamilyIncomeStr = `Median Family Income: ${medianFamilyIncome}`;
                }

                return [
                  '',
                  ...(averageHomePriceStr ? [averageHomePriceStr] : []),
                  ...(medianFamilyIncomeStr ? [medianFamilyIncomeStr] : []),
                ];
              }

            },
            backgroundColor: 'rgba(26, 32, 44)',
            titleColor: '#F7FAFC', // white
            bodyColor: '#E2E8F0',
            borderColor: '#2D3748',
            borderWidth: 1,
            padding: 12,
            bodySpacing: 8,
            boxPadding: 6,
            cornerRadius: 4,
            displayColors: true
          },
          legend: {
            position: "top",
            align: 'end',
            labels: {
              color: '#818483',
              font: {
                size: 12
              },
              boxWidth: 20,
              padding: 17,
              usePointStyle: true,
              generateLabels: (chart) => {
                const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                return defaultLabels.map(label => ({
                  ...label,
                  text: '   ' + label.text
                }));
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Year',
              color: '#818483'
            },
            grid: {
              display: false
            },
            ticks: {
              color: '#818483',
              font: {
                weight: 'lighter'
              },
              stepSize: 5,
              callback: (value) => Number(value).toString(),
            },
            border: {
              display: false
            }
          },
          y: {
            position: 'right',
            min: 100,
            max: 500,
            title: {
              display: true,
              text: 'Index Value',
              color: '#818483',
            },
            grid: {
              display: false
            },
            ticks: {
              color: '#818483',
              stepSize: 50,
              font: {
                weight: 'lighter',
              }
            },
            border: {
              display: false
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            hoverRadius: 5,
            hoverBorderWidth: 2
          }
        },
        maintainAspectRatio: false,
        backgroundColor: 'transparent'
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    if (canvas?.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
      chart.destroy();
    };
  });
</script>

<section style="position: relative; height: 500px; width: 100%; margin-top: 3.5rem;">
  <div style="position: relative; height: 100%; width: 100%;">
    <canvas bind:this={canvas}></canvas>
  </div>
  <div class="subscript">Baseline Year = 1995. Baseline index = 100 = 1x the price/wage as in 1995. Dataset is inflation-adjusted and sourced from FRED Housing and Income Indices - https://fred.stlouisfed.org</div>
</section>

<style>
  :global(.chartjs-tooltip) {
    opacity: 1 !important;
    pointer-events: none;
    position: absolute;
    background: rgba(26, 32, 44, 0.9) !important;
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  :global(canvas) {
    background: transparent !important;
  }

  .subscript {
    font-size: 0.6rem;
    color: #818483;
    display: flex;
    justify-content: right;
    margin-right: 2rem;
  }
</style>