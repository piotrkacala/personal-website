// Validation rules for the keyboard-answering mode.
//
// The benchmark contract requires:
//   - leading and trailing whitespace are ignored
//   - matching is case-insensitive
//   - diacritics are significant and must NOT be stripped
// Example: " adam " must match "ADAM", "żaba" must match "ŻABA",
// "zaba" must NOT match "ŻABA".

export function normalizeKeyboardInput(raw) {
  if (typeof raw !== "string") return "";
  return raw.trim();
}

export function compareKeyboardInput(raw, expected) {
  const trimmed = normalizeKeyboardInput(raw);
  if (trimmed.length === 0) return false;
  // Use the Unicode-default case mapping so diacritics stay significant in
  // a deterministic way regardless of host locale.
  return trimmed.toUpperCase() === expected.toUpperCase();
}
