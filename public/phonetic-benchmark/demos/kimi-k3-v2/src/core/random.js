// Randomness utilities.
//
// Randomized behavior is required by the benchmark (shuffled symbol order and
// shuffled suggestion-option order), but tests must not depend on one exact
// random order. All randomness in the app flows through an injectable
// `rng() -> [0, 1)` function, so tests can drive deterministic sequences with
// fixed seeds while the browser seeds from crypto.

// mulberry32: small, well-known seeded PRNG. Deterministic for a given seed.
export function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Random seed for real usage. `crypto.getRandomValues` is available both in
// modern browsers and in Node.js (>= 19) as a global.
export function randomSeed() {
  const buffer = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buffer);
  return buffer[0];
}

export function createDefaultRng() {
  return mulberry32(randomSeed());
}
