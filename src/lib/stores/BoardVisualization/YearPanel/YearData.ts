import { writable, get } from 'svelte/store';

export const MIN_YEAR = 2010;
export const MAX_YEAR = 2024;
export const PLAY_INTERVAL_IN_MS = 1000;

export const referenceYear = writable<number>(MIN_YEAR);
export const currentYear = writable<number>(MIN_YEAR);
export const isPlaying = writable<boolean>(false);

let interval: number | null = null;

export const isValidYear = (year: number) => {
  return year >= MIN_YEAR && year <= MAX_YEAR;
}

export const togglePlayPause = () => {
  if (get(isPlaying)) {
    stopAnimation();
  } else {
    isPlaying.set(true);
    startAnimation();
  }
};

export const resetAnimation = () => {
  const ref = get(referenceYear);
  currentYear.set(ref);
  isPlaying.set(true);
  startAnimation();
};

export const startAnimation = () => {
  clearPlayback();
  const ref = get(referenceYear);
  interval = setInterval(() => {
    currentYear.update((y) => {
      if (y >= MAX_YEAR) {
        stopAnimation();
        return MAX_YEAR;
      }
      return y + 1;
    });
  }, PLAY_INTERVAL_IN_MS);
};

export const stopAnimation = () => {
  clearPlayback();
  isPlaying.set(false);
};

export const loopToStart = () => {
  const ref = get(referenceYear);
  currentYear.set(ref);
  isPlaying.set(true);
  startAnimation();
};

function clearPlayback() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}
