// game.js — Core game logic (stateless helpers + run orchestration)
import * as state from "./state.js";
import { shuffle, checkAnswer, calculateScore } from "./utils.js";

export { shuffle, checkAnswer, calculateScore };

/**
 * Generate the randomized symbol order for a run.
 * @returns {string[]} Array of symbol strings in randomized order.
 */
export function generateSymbolOrder() {
  const entries = state.getCurrentAlphabetEntries();
  const symbols = entries.map((e) => e.symbol);
  return shuffle([...symbols]);
}

/**
 * Get the codeword for a given symbol in the current alphabet.
 * @param {string} symbol
 * @returns {string}
 */
export function getCodewordForSymbol(symbol) {
  const entries = state.getCurrentAlphabetEntries();
  const entry = entries.find((e) => e.symbol === symbol);
  return entry ? entry.codeword : "";
}

/**
 * Get the four multiple-choice options for a given symbol.
 * Returns an array of 4 strings in randomized order, with the correct answer included.
 * @param {string} symbol
 * @returns {string[]}
 */
export function getSuggestionOptions(symbol) {
  const options = state.getCurrentOptions();
  const optionSet = options[symbol];
  if (!optionSet || optionSet.length < 4) return [];
  return shuffle([...optionSet]);
}

/**
 * Start a new run: generate symbol order and reset run state.
 */
export function startRun() {
  state.resetRun();
  const order = generateSymbolOrder();
  state.setSymbolOrder(order);
  state.setCurrentIndex(0);
}

/**
 * Get the current question's symbol.
 * @returns {string|null}
 */
export function getCurrentSymbol() {
  const order = state.getSymbolOrder();
  const idx = state.getCurrentIndex();
  if (idx >= order.length) return null;
  return order[idx];
}

/**
 * Advance to the next question.
 * @returns {boolean} true if there are more questions, false if run is complete.
 */
export function advanceQuestion() {
  const nextIdx = state.getCurrentIndex() + 1;
  state.setCurrentIndex(nextIdx);
  state.setHintUsedOnCurrent(false);
  return nextIdx < state.getSymbolOrder().length;
}

/**
 * Reveal the hint for the current question.
 * Records that this question was hinted.
 */
export function revealHint() {
  const idx = state.getCurrentIndex();
  state.markHinted(idx);
  state.setHintUsedOnCurrent(true);
  return getCodewordForSymbol(getCurrentSymbol());
}

/**
 * Check if the current question has been hinted.
 * @returns {boolean}
 */
export function isCurrentHinted() {
  return state.isHintUsedOnCurrent();
}
