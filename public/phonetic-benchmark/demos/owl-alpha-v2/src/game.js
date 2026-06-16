// Game logic — pure functions for exercise run behavior

/**
 * Shuffle an array using Fisher-Yates algorithm.
 * Returns a new array; does not mutate the input.
 */
export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Create a randomized run order for the given alphabet entries.
 */
export function createRunOrder(entries) {
  return shuffle(entries);
}

/**
 * Validate a keyboard answer against the correct codeword.
 * - Case-insensitive
 * - Leading/trailing whitespace stripped
 * - Diacritics are significant (not stripped)
 */
export function validateAnswer(input, correctCodeword) {
  const trimmed = input.trim();
  return trimmed.toUpperCase() === correctCodeword.toUpperCase();
}

/**
 * Calculate the final score.
 * score_percent = round((clean_questions / total_questions) * 100)
 */
export function calculateScore(totalQuestions, hintedQuestions) {
  const cleanQuestions = totalQuestions - hintedQuestions;
  return Math.round((cleanQuestions / totalQuestions) * 100);
}

/**
 * Build the four suggestion options for a symbol.
 * Uses the fixed multiple-choice data from the benchmark.
 * Returns shuffled options with a `correct` flag.
 *
 * @param {string} symbol - The target symbol
 * @param {string} correctCodeword - The correct codeword
 * @param {string[]} wrongCodewords - The three wrong codewords
 * @returns {{ codeword: string, correct: boolean }[]}
 */
export function buildSuggestionOptions(symbol, correctCodeword, wrongCodewords) {
  const options = [
    { codeword: correctCodeword, correct: true },
    ...wrongCodewords.map(cw => ({ codeword: cw, correct: false })),
  ];
  return shuffle(options);
}
