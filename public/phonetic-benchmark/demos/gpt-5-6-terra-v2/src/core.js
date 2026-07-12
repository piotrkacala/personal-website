/** Domain functions kept separate from the UI for deterministic verification. */
export function normalizeAnswer(value) {
  return String(value).trim().toLocaleUpperCase();
}

export function isCorrectAnswer(value, codeword) {
  return normalizeAnswer(value) === normalizeAnswer(codeword);
}

export function calculateScore(totalQuestions, hintedQuestions) {
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
    throw new RangeError('totalQuestions must be a positive integer.');
  }
  if (!Number.isInteger(hintedQuestions) || hintedQuestions < 0 || hintedQuestions > totalQuestions) {
    throw new RangeError('hintedQuestions must be between zero and totalQuestions.');
  }
  return Math.round(((totalQuestions - hintedQuestions) / totalQuestions) * 100);
}

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function validateOptionSet(options, codeword) {
  return Array.isArray(options) && options.length === 4 && new Set(options).size === 4 && options.includes(codeword);
}
