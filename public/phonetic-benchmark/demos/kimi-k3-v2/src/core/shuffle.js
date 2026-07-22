// Fisher-Yates shuffle against an injectable rng.
// Returns a new array; never mutates the input.

export function shuffle(items, rng) {
  if (typeof rng !== 'function') {
    throw new TypeError('shuffle requires an rng function');
  }
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
