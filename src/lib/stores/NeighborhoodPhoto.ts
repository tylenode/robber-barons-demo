
import { writable } from "svelte/store"

export const neighborhoodPhoto = writable<Record<string, any>>({});

export async function loadNeighborhoodPhoto()
{
    const data = import.meta.glob('$lib/images/neighborhood_pics/*.jpg',
        { eager: true, as: 'url' }
    )
    neighborhoodPhoto.set(data)
}