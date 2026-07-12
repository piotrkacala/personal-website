/**
 * Pure game rules shared by the browser and the Node test suite.
 * The caller supplies a random function so shuffled sessions are testable.
 */
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function normalizeAnswer(value) {
  return value.trim().toLocaleUpperCase('pl-PL');
}

export function isCorrectAnswer(answer, expected) {
  // Do not use NFD/diacritic stripping: Polish characters are meaningful data.
  return normalizeAnswer(answer) === normalizeAnswer(expected);
}

export function scorePercent(totalQuestions, hintedQuestions) {
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) return 0;
  const cleanQuestions = Math.max(0, totalQuestions - hintedQuestions);
  return Math.round((cleanQuestions / totalQuestions) * 100);
}

export function createQuestions(alphabet, optionMap, mode, random = Math.random) {
  return shuffle(alphabet, random).map((entry) => ({
    ...entry,
    options: mode === 'suggestion' ? shuffle(optionMap[entry.symbol], random) : undefined
  }));
}
