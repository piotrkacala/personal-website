// utils.js — Pure utility functions, no DOM or state dependencies.
// Extracted for testability.

/**
 * Shuffle an array in place using Fisher-Yates.
 * Returns the same array reference.
 * @param {any[]} arr
 * @returns {any[]}
 */
export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Normalize an answer for comparison: trim, lowercase.
 * Diacritics are preserved.
 * @param {string} input
 * @returns {string}
 */
export function normalize(input) {
  return input.trim().toLowerCase();
}

/**
 * Check whether a user answer matches the expected codeword.
 * Case-insensitive, trims whitespace, preserves diacritics.
 * @param {string} userAnswer
 * @param {string} expectedCodeword
 * @returns {boolean}
 */
export function checkAnswer(userAnswer, expectedCodeword) {
  return normalize(userAnswer) === normalize(expectedCodeword);
}

/**
 * Calculate the final score percentage.
 * @param {number} totalQuestions
 * @param {number} hintedQuestions
 * @returns {number} Rounded percentage (0–100).
 */
export function calculateScore(totalQuestions, hintedQuestions) {
  if (totalQuestions === 0) return 0;
  const clean = totalQuestions - hintedQuestions;
  return Math.round((clean / totalQuestions) * 100);
}
