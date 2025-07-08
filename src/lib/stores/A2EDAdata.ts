// Oliver Rayner, April 2025

import { writable } from "svelte/store"
import * as d3 from 'd3'

export interface A2EDAdataItem {
    zip: string,
    price: number,
    year: number,
    date: Date,
    cash_sale: boolean,
    neighborhood: string,
    investor: boolean,
    usage: string,
}

export const A2EDAdata = writable < A2EDAdataItem[] | null > (null); 

export async function loadA2EDAdata() 
{
    // const data = await d3.csv("/data/datasets/A2_EDA_Residential.csv", row => ({
    //     zip: row.zip.padStart(5, '0'),
    //     price: Number(row.price),
    //     year: Number(row.year),
    //     date: new Date(row.date),
    //     cash_sale: Number(row.cash_sale) == 1,
    //     neighborhood: bostonZipToNeighborhood[row.zip.padStart(5, '0')],
    //     investor: row.investor_type_purchase !== "Non-investor",
    //     usage: row.usage,
    // }))
    // A2EDAdata.set(data);

    const rawData = await d3.json("/data/jsons/A2_EDA_Residential.json") as A2EDAdataItem[];
    const data: A2EDAdataItem[] = rawData.map(item => ({
        ...item,
        date: new Date(item.date),
        year: Number(item.year),
        price: Number(item.price),
        cash_sale: Boolean(item.cash_sale),
        investor: Boolean(item.investor),
    }));
    A2EDAdata.set(data);
}

export const bostonZipToNeighborhood: { [zip:string]: string } = {
    '02108': 'Beacon Hill',
    '02109': 'Downtown',
    '02110': 'Financial District',
    '02111': 'Chinatown',
    '02113': 'North End',
    '02114': 'West End',
    '02115': 'Longwood',
    '02116': 'Back Bay',
    '02118': 'South End',
    '02119': 'Roxbury',
    '02120': 'West Roxbury',
    '02121': 'Dorchester',
    '02122': 'Dorchester',
    '02124': 'Dorchester',
    '02125': 'Dorchester',
    '02126': 'Mattapan',
    '02127': 'South Boston',
    '02128': 'East Boston',
    '02129': 'Charlestown',
    '02130': 'Jamaica Plain',
    '02131': 'Roslindale',
    '02132': 'West Roxbury',
    '02134': 'Allston',
    '02135': 'Brighton',
    '02136': 'Hyde Park',
    '02210': 'Seaport',
    '02215': 'Fenway',
    '02139': 'Camrbridge',
};

export const bostonNeighborhoodToZip = Object.fromEntries(
  Object.entries(bostonZipToNeighborhood).map(([key, value]) => [value, key])
);