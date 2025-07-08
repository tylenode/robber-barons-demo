import { writable } from 'svelte/store';
import { SLIDER_DEFAULT_YEAR } from '$lib/components/BoardVisualization/MonopolyBoard/_/slider/constants';

export const selectedTileId = writable<string | null>(null);
export const selectedYear = writable(SLIDER_DEFAULT_YEAR);
export const currentPin = writable<{tileId: string | null, svg: string | null}>({ tileId: null, svg: null });