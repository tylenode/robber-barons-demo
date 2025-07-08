<!-- Oliver Rayner April 2025 -->

<script lang="ts">
  import * as d3 from 'd3';
  import Graph from '$lib/components/MonopolyCard/Graph.svelte';
  import GIS from './GIS.svelte';
  import { cardBlanksWhite } from '$lib/stores/CardBlanksWhite';
  import { neighborhoodPhoto } from '$lib/stores/NeighborhoodPhoto';
  import { currentCard, dataLoaded } from '$lib/stores/CurrentCard';
  import { A2EDAdata, bostonNeighborhoodToZip } from '$lib/stores/A2EDAdata';
  import { topOwnersByZip } from '$lib/stores/FY2024Propertydata';

  export let neighborhood: string = 'Allston';

  let card_blank: any;
  $: if ($cardBlanksWhite)
    card_blank = $cardBlanksWhite[
      `/src/lib/images/card_blanks_white/${neighborhood.toLowerCase()}.svg`
    ];

  let photo_src: any;
  $: if ($neighborhoodPhoto)
    photo_src = $neighborhoodPhoto[
      `/src/lib/images/neighborhood_pics/${neighborhood.toLowerCase()}.jpg`
    ];

  let median_sale_price: string = '0M';
  $: if ($A2EDAdata) {
    const rows = $A2EDAdata.filter(
      (d) =>
        d.neighborhood === neighborhood &&
        (d.usage === 'CONDOMINIUM' || d.usage === '1-FAM RES')
    );
    const price = rows.length ? d3.median(rows, (d) => d.price)! : 0;
    median_sale_price = formatPrice(price);
    if (neighborhood === 'MIT') median_sale_price = '80B';
  }

  const rentByNeighborhood: Record<string, number> = {
    Dorchester: 2393,
    Mattapan: 2109,
    Roxbury: 2279,
    'West Roxbury': 2057,
    'West End': 3271,
    'South Boston': 2917,
    'Hyde Park': 2186,
    Roslindale: 2148,
    'Jamaica Plain': 2468,
    Brighton: 2381,
    'East Boston': 2405,
    Allston: 2512,
    Fenway: 2974,
    'North End': 2766,
    Chinatown: 3815,
    Downtown: 2963,
    Charlestown: 2756,
    Longwood: 3000,
    'Seaport': 4816,
    'Beacon Hill': 2853
  };

  let median_rent = '0k';
  $: {
    const originalRent = rentByNeighborhood[neighborhood] ?? 0;
    median_rent =
      originalRent >= 1000
        ? formatPrice(originalRent)
        : `${originalRent.toFixed(2)}`;
  }

  export function wrapTextToTspans(
    text: string,
    maxCharsPerLine: number
  ): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if (
        (currentLine + (currentLine ? ' ' : '') + word).length <= maxCharsPerLine
      ) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    return lines;
  }

  const TAB = { TREND: 1, MAP: 2, STATS: 3, PHOTO: 4 } as const;
  let activeTab: 1 | 2 | 3 | 4 = TAB.TREND;

  function formatPrice(value: number): string {
    if (value >= 1_000_000) {
      const millions = value / 1_000_000;
      return millions % 1 === 0
        ? `${millions}M`
        : `${millions.toFixed(2)}M`.replace(/\.?0+M$/, 'M');
    }

    if (value >= 1_000) {
      const thousands = value / 1_000;
      return thousands % 1 === 0
        ? `${thousands}K`
        : `${thousands.toFixed(2)}K`.replace(/\.?0+K$/, 'K');
    }

    return value % 1 === 0 ? `${value}` : `${value.toFixed(2)}`.replace(/\.?0+$/, '');
  }
</script>

<!-- COMPONENT HTML -->
<div class="card-wrapper">
  <img class="card-bg" src={card_blank} alt="monopoly_card" />

  <div class="card-overlay">
    {#if photo_src}
      <div class="photo-container">
        <img class="neighborhood-photo" src={photo_src} alt="{neighborhood} photo" />
      </div>
    {/if}
    <div class="stats">
      <div class="info-line">Average Rent: 

        <div>
            <strong>{median_rent}</strong>
        </div>
      </div>
      <div class="info-line">Median Price:

        <div>
            <strong>{median_sale_price}</strong>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- COMPONENT STYLES -->
<style>
  .card-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0.5rem;
  }

  .card-bg {
    width: 100%;
    height: auto;
    display: block;
    border-radius: inherit;
  }

  .card-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.75rem;
    /* background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%); */
    /* color: white; */
    box-sizing: border-box;
    /* z-index: 2; */
  }

  .photo-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .neighborhood-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: clamp(0.75rem, 1vw, 1rem);
    align-items: center;
  }

  .info-line {
    margin: 0;
    /* text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6); */
  }

  .info-line strong {
    display: flex;
    justify-content: center;
    font-weight: 600;
  }
</style>
