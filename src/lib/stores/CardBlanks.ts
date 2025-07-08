// Oliver Rayner, April 2025

import { writable } from "svelte/store"

export const cardBlanks = writable<Record<string, any>>({});

export async function loadCardBlanks()
{
    const data = import.meta.glob('$lib/images/card_blanks/*.svg',
        { eager: true, as: 'url' }
    )
    cardBlanks.set(data)
}