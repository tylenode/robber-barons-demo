// Oliver Rayner, April 2025

import { writable } from 'svelte/store';
import * as d3 from 'd3'

export interface CorporateOwnershipdataItem {
    neighborhood: string,
    year: Date,
    own_occ_rate: number,
    corp_own_rate: number,
}

export const CorporateOwnershipdata = writable < CorporateOwnershipdataItem[] | null > (null); 

export async function loadCorporateOwnershipdata()
{
    // const data = await d3.csv("/data/datasets/Corp_Ownership_and_Occupancy_Over_Time.csv", row => ({
    //     neighborhood: row.Neighborhood,
    //     year: new Date(Number(row.Year), 0, 1),
    //     own_occ_rate: Number(row.own_occ_rate),
    //     corp_own_rate: Number(row.corp_own_rate)
    // }))
    // CorporateOwnershipdata.set(data)

    const rawData = await d3.json("/data/jsons/Corp_Ownership_and_Occupancy_Over_Time.json") as CorporateOwnershipdataItem[];
    const data: CorporateOwnershipdataItem[] = rawData.map(row => ({
        neighborhood: row.neighborhood,
        year: new Date(Number(row.year), 0, 1),
        own_occ_rate: Number(row.own_occ_rate),
        corp_own_rate: Number(row.corp_own_rate),
    }));
    CorporateOwnershipdata.set(data);
}
