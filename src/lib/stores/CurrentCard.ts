// Oliver Rayner, April 2025

import { writable, derived } from "svelte/store";

export const cardOrder = writable<string[]>([]);
export const lastCard = derived(cardOrder, $cardOrder => $cardOrder[0] ?? null)
export const currentCard = derived(cardOrder, $cardOrder => $cardOrder[$cardOrder.length - 1] ?? null)
export const nextCard = derived(cardOrder, $cardOrder => $cardOrder[$cardOrder.length - 2] ?? null)
export const dataLoaded = writable<boolean>(false);

export function bringCardToFront(name: string) {
  cardOrder.update(cards => {
    const filtered = cards.filter(c => c !== name);
    return [name, ...filtered];
  });
}

export const neighborhoods = [
    "Dorchester",
    "Mattapan",
    "Roxbury",
    "West Roxbury",
    "West End",
    "Hyde Park",
    "Roslindale",
    "Jamaica Plain",
    "Brighton",
    "East Boston",
    "Allston",
    "Fenway",
    "North End",
    // "MIT",
    "Chinatown",
    "Downtown",
    "Charlestown",
    // "Southie",
    "South Boston",
    "Longwood",
    "Seaport",
    "Beacon Hill",
].reverse()
cardOrder.set(neighborhoods)

export const averageRents2025: { [key: string]: number | null } =
{
    "Dorchester": 3078,
    "Mattapan": 2445,
    "Roxbury": 2286,
    "West Roxbury": 2772,
    "West End": 3999,
    "Hyde Park": 2650,
    "Roslindale": 2811,
    "Jamaica Plain": 3143,
    "Brighton": 2900,
    "East Boston": 3362,
    "Allston": 3170,
    "Fenway": 4078,
    "North End": 3425,
    "MIT": null,
    "Chinatown": 3991,
    "Downtown": 4439,
    "Charlestown": 3450,
    "Southie": 3957,
    "South Boston": 4213,
    "Longwood": 3749,
    "Seaport": 4188,
    "Beacon Hill": 2791
};
