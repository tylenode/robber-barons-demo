// Oliver Rayner, April 2025

import { writable } from "svelte/store"
import * as f3 from 'd3'

import DraggableCard from "$lib/components/MonopolyCard/DraggableCard.svelte"

interface MonopolyCard {

    // Data-related fields
    neighborhood: string,
    zip: string,
    median_list_price: number,
    sum_largest_owners: number,
    median_rent_price: number,

    // Visual Elements
    card_blank: string,
    graph: any,

}

export const monopolyCards = writable<MonopolyCard[]>();
export const flipping_animation = writable(false);
export const numCards = writable<number>(0);
export const pileMap = writable<Map<string, string[]>>(new Map());
export const cardRefs = writable<Record<string, DraggableCard>>({});

export const colorMap: {[key: string]: string} = {
    "Dorchester": "#955437",
    "Mattapan": "#ba6a45",
    "Roxbury": "#aae0fc",
    "West Roxbury": "#6bcafa",
    "West End": "#ceedfd",
    "Hyde Park": "#db3b97",
    "Roslindale": "#96125d",
    "Jamaica Plain": "#e368ae",
    "Brighton": "#f8951f",
    "East Boston": "#df7e07",
    "Allston": "#faae52",
    "Fenway": "#f14b53",
    "North End": "#ee1d26",
    // "MIT",
    "Chinatown": "#c9a214",
    "Downtown": "#e3b50e",
    "Charlestown": "#f3c930",
    // "Southie",
    "South Boston": "#21b35b",
    "Longwood": "#30d974",
    "Seaport": "#0372bc",
    "Beacon Hill": "#048fec",
}