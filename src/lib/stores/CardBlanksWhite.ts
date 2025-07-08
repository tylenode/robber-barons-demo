// Oliver Rayner, April 2025

import { writable } from "svelte/store"

export const cardBlanksWhite = writable<Record<string, any>>({});

export async function loadCardBlanksWhite()
{
    const data = import.meta.glob('$lib/images/card_blanks_white/*.svg',
        { eager: true, as: 'url' }
    )
    cardBlanksWhite.set(data)
}