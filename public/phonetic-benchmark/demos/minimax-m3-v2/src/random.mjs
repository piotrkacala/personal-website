// Tiny deterministic-friendly random utilities.
//
// The benchmark contract requires that:
//   1. symbol order within a run is randomized
//   2. the four suggestion options are displayed in a randomized order
// Tests must not rely on a single fixed order. To make randomness testable
// without going flaky, all randomization goes through a single helper that
// uses a Fisher-Yates shuffle and accepts an optional injectable RNG.
// Production callers pass Math.random; tests can pass a stub.

export function shuffle(items, rng = Math.random) {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
