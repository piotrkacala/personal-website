// Answer normalization and comparison for keyboard mode.
//
// Benchmark contract (docs/REQUIREMENTS.md):
// - leading and trailing whitespace must be ignored
// - answer matching must be case-insensitive
// - diacritics must remain significant and must not be stripped
// - `żaba` must match `ŻABA`; `zaba` must not match `ŻABA`

export function normalizeAnswer(value) {
  // Unicode-aware default case folding; no diacritic stripping on purpose.
  return String(value ?? '').trim().toLowerCase();
}

export function answersMatch(input, codeword) {
  const normalizedInput = normalizeAnswer(input);
  if (normalizedInput.length === 0) {
    return false;
  }
  return normalizedInput === normalizeAnswer(codeword);
}
