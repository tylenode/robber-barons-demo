// Oliver Rayner, April 2025

import { writable } from "svelte/store";
import * as d3 from 'd3'

const geojson_filepath = "/data/geojson/boston.geojson"

export const geoData = writable<any>();
export async function loadGISdata()
{
    const data = await d3.json(geojson_filepath)
    geoData.set(data)
}

