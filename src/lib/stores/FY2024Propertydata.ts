// Oliver Rayner, April 2025

import { writable, derived, get } from "svelte/store"
import * as d3 from 'd3'

export interface FY2024PropertyDataItem {
    assessed_value: number,
    assessed_building_value: number,
    owner: string,
    owner_occ: string,
    zip: string,
    land_use: string,
    living_area: number,
    estimated_rent: number,
    res_units: number,
}

export const FY2024PropertyData = writable<FY2024PropertyDataItem[] | null>(null); 

export async function loadFY2024PropertyData() 
{
    // const cap_rate = 0.06; // Apparently typical cap rate is 4-8%
    // let data:FY2024PropertyDataItem[] = await d3.csv("/data/datasets/FY2024_Property_Database_Boston.csv", row => ({
    //     assessed_value: parseFloat(row.TOTAL_VALUE.replace(/[^0-9.-]+/g, "")) || 0,
    //     assessed_building_value: parseFloat(row.BLDG_VALUE.replace(/[^0-9.-]+/g, "")) || 0,
    //     owner: row.OWNER,
    //     owner_occ: row.OWN_OCC,
    //     zip: row.ZIP_CODE,
    //     land_use: row.LU,
    //     living_area: Number(row.LIVING_AREA),
    //     estimated_rent: (parseFloat(row.BLDG_VALUE.replace(/[^0-9.-]+/g, "")) || 0) * cap_rate / 12,
    //     res_units: Number(row.RES_UNITS) > 0 ? Number(row.RES_UNITS) : 1,
    // }))
    // FY2024PropertyData.set(data)

    const data = await d3.json("/data/jsons/FY2024_Property_Database_Boston.json") as FY2024PropertyDataItem[];
    FY2024PropertyData.set(data);
}

const residentailLU = new Set(["A", "CD", "CM", "R1", "R2", "R3", "R4", "RC", "RL"])
const residentialLUpruned = new Set(["A", "R1", "R2", "R3", "R4"])
export function topOwnersByZip(zip="02121")
{
    let data = get(FY2024PropertyData)
    data = data!.filter(d =>
        (d.zip === zip)
        && (residentailLU.has(d.land_use))
    )

    type OwnerTotals = Record<string, number>;
    const ownerTotals: OwnerTotals = data.reduce((acc: OwnerTotals, row: FY2024PropertyDataItem) => {
        const owner = row.owner;
        const value = row.assessed_value
        acc[owner] = (acc[owner] || 0) + value;
        return acc;
    }, {});

    const numTop = 10;
    const topOwners = Object.entries(ownerTotals)
        .sort((a, b) => b[1] - a[1])    // Sort descending by total value
        .slice(0, numTop);  // Take top 3
    return topOwners
}

export function monthlyRentByZip(zip="02121")
{
    let data = get(FY2024PropertyData)
    console.log(data![0])
    data = data!.filter(d =>
        (d.zip === zip)
        && d.owner_occ == "Y"
        // && residentialLUpruned.has(d.land_use)
    )
    const processed_data = data!.map(d => d.estimated_rent/d.res_units)
    const average_rent = d3.mean(processed_data)
    // console.log(average_rent)
    return average_rent
}

export const ownerFilter = new Set([
    "MASS CONVENTION CENTER AUTH",
    "BOSTON HOUSING AUTHORITY",
    "MASSACHUSETTS  PORT AUTHORITY"
])