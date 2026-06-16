// Data layer — loads canonical benchmark data from benchmark-data/

let cachedAlphabets = null; // { polish: [{symbol, codeword}, ...], nato: [...] }
let cachedOptions = null; // { polish: { "A": ["ADAM", ...], ... }, nato: {...} }

export async function loadAlphabets() {
  if (cachedAlphabets) return cachedAlphabets;
  const res = await fetch("benchmark-data/alphabets.json");
  if (!res.ok) throw new Error(`Failed to load alphabets.json: ${res.status}`);
  cachedAlphabets = await res.json();
  return cachedAlphabets;
}

export async function loadMultipleChoiceOptions() {
  if (cachedOptions) return cachedOptions;
  const res = await fetch("benchmark-data/multiple-choice-options.json");
  if (!res.ok)
    throw new Error(
      `Failed to load multiple-choice-options.json: ${res.status}`,
    );
  cachedOptions = await res.json();
  return cachedOptions;
}

/**
 * Get all 4 codewords for a symbol from multiple-choice-options.json.
 * Returns string[] or null.
 */
export function getSymbolOptions(alphabetKey, symbol) {
  return cachedOptions?.[alphabetKey]?.[symbol] ?? null;
}
