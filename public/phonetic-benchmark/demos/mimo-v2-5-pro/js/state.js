// state.js — Centralized application state

/** @type {Object|null} */
let alphabets = null;

/** @type {Object|null} */
let multipleChoiceOptions = null;

/** @type {{ lang: string, alphabet: string, mode: string }} */
let config = { lang: "en", alphabet: "nato", mode: "keyboard" };

/** @type {string[]} */
let symbolOrder = [];

/** @type {number} */
let currentIndex = 0;

/** @type {Set<number>} */
let hintedIndices = new Set();

/** @type {boolean} */
let hintUsedOnCurrent = false;

/**
 * Load benchmark data from the server.
 * @returns {Promise<void>}
 */
export async function loadData() {
  const [alphaRes, mcRes] = await Promise.all([
    fetch("./benchmark-data/alphabets.json"),
    fetch("./benchmark-data/multiple-choice-options.json"),
  ]);
  alphabets = await alphaRes.json();
  multipleChoiceOptions = await mcRes.json();
}

export function getAlphabets() {
  return alphabets;
}

export function getMultipleChoiceOptions() {
  return multipleChoiceOptions;
}

/**
 * Get the current alphabet entries as an array of { symbol, codeword }.
 * @returns {Array<{ symbol: string, codeword: string }>}
 */
export function getCurrentAlphabetEntries() {
  if (!alphabets) return [];
  return alphabets[config.alphabet] || [];
}

/**
 * Get the multiple-choice options for the current alphabet.
 * @returns {Object}
 */
export function getCurrentOptions() {
  if (!multipleChoiceOptions) return {};
  return multipleChoiceOptions[config.alphabet] || {};
}

export function getConfig() {
  return { ...config };
}

export function setConfig(partial) {
  Object.assign(config, partial);
}

export function getSymbolOrder() {
  return symbolOrder;
}

export function setSymbolOrder(order) {
  symbolOrder = order;
}

export function getCurrentIndex() {
  return currentIndex;
}

export function setCurrentIndex(i) {
  currentIndex = i;
}

export function isHinted(index) {
  return hintedIndices.has(index);
}

export function markHinted(index) {
  hintedIndices.add(index);
}

export function isHintUsedOnCurrent() {
  return hintUsedOnCurrent;
}

export function setHintUsedOnCurrent(val) {
  hintUsedOnCurrent = val;
}

export function getHintedCount() {
  return hintedIndices.size;
}

export function getTotalQuestions() {
  return symbolOrder.length;
}

/**
 * Reset the run state for a new run.
 */
export function resetRun() {
  symbolOrder = [];
  currentIndex = 0;
  hintedIndices = new Set();
  hintUsedOnCurrent = false;
}
