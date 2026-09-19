/** Deterministic PRNG so server and client render identical mock data. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(rng: () => number, arr: readonly T[]): T =>
  arr[Math.floor(rng() * arr.length)] as T;

export const between = (rng: () => number, min: number, max: number) => min + rng() * (max - min);

/** Fixed "now" so mock timestamps are stable across renders. */
export const MOCK_NOW = new Date("2026-09-19T07:30:00Z").getTime();
