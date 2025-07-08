<!-- Oliver Rayner, April 2025 -->

<script lang="ts">
    
    import * as d3 from 'd3'

    import { geoData } from "$lib/stores/GISdata";
    import { pileMap } from "$lib/stores/CardData";
    export let selected_neighborhood:string;
 
    let selected_neighborhoods: string[] = [];
    pileMap.subscribe(map => {
        selected_neighborhoods = map.get("bottom") ?? []
    })

    interface GeoFeature {
        type: string;
        geometry: {
        type: string;
        coordinates: number[][][] | number[][][][];
        };
        properties: Record<string, any>;
    }

    interface GeoJSON {
        type: string;
        features: GeoFeature[];
    }

    const width = 600, height = 400;
    let path:any = null;

    $: if ($geoData)
    {
        const proj = d3.geoMercator().fitSize([width, height], $geoData)
        path = d3.geoPath().projection(proj)
    } 

</script>

<svg viewBox="0 0 {width} {height}">
    <g>
        {#if $geoData }
            {#each $geoData.features as feature}
                <path
                    d={path(feature)}
                    fill=
                    {
                        selected_neighborhoods.includes(feature.properties.name) ? "#ff1a3cb0" : "#f5f5f5"
                    }
                    stroke="#222"
                    stroke-width="0.5"
                /> 
            {/each}
        {/if}
    </g>

</svg>

<style>

    svg {
        width: 100%;
    }

</style>