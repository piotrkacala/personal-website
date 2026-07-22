// Exercise run state machine. Pure logic, no DOM access, fully testable.
//
// Contract covered here (docs/REQUIREMENTS.md, docs/TEST_CASES.md):
// - a run uses the full chosen alphabet exactly once per symbol
// - symbols are presented in randomized order
// - the user progresses only after the correct codeword
// - the run ends only after all symbols are completed
// - keyboard and suggestion input methods stay separate for the whole run
// - hint reveals the answer, stays visible until the question is completed,
//   and never auto-completes the question
// - suggestion options come from fixed project data, exactly four per
//   question, displayed in randomized order

import { answersMatch } from './matching.js';
import { computeScorePercent } from './scoring.js';
import { shuffle } from './shuffle.js';

export const MODES = Object.freeze(['keyboard', 'suggestion']);

export function createRun({ alphabetKey, mode, entries, optionSets, rng }) {
  if (typeof alphabetKey !== 'string' || alphabetKey.length === 0) {
    throw new TypeError('createRun requires a non-empty alphabetKey');
  }
  if (!MODES.includes(mode)) {
    throw new TypeError(`createRun requires mode to be one of: ${MODES.join(', ')}`);
  }
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new TypeError('createRun requires a non-empty entries array');
  }
  for (const entry of entries) {
    if (!entry || typeof entry.symbol !== 'string' || typeof entry.codeword !== 'string') {
      throw new TypeError('each entry must have string `symbol` and `codeword` fields');
    }
  }
  if (mode === 'suggestion') {
    if (!optionSets || typeof optionSets !== 'object') {
      throw new TypeError('suggestion mode requires fixed optionSets from project data');
    }
    for (const entry of entries) {
      const options = optionSets[entry.symbol];
      if (!Array.isArray(options) || options.length !== 4) {
        throw new TypeError(`option set for symbol "${entry.symbol}" must contain exactly 4 options`);
      }
      if (!options.includes(entry.codeword)) {
        throw new TypeError(`option set for symbol "${entry.symbol}" must contain its codeword`);
      }
    }
  }

  const run = {
    alphabetKey,
    mode,
    questions: shuffle(entries, rng),
    currentIndex: 0,
    hintedSymbols: new Set(),
    hintVisible: false,
    wrongChoices: new Set(),
    currentOptions: null,
    status: 'active',
    rng,
    optionSets: mode === 'suggestion' ? optionSets : null,
  };
  prepareCurrentQuestion(run);
  return run;
}

function prepareCurrentQuestion(run) {
  run.hintVisible = false;
  run.wrongChoices = new Set();
  if (run.mode === 'suggestion' && run.status === 'active') {
    const { symbol } = run.questions[run.currentIndex];
    // Option content is fixed project data; only the display order is shuffled.
    run.currentOptions = shuffle(run.optionSets[symbol], run.rng);
  } else {
    run.currentOptions = null;
  }
}

export function getCurrentQuestion(run) {
  if (run.status !== 'active') {
    return null;
  }
  const entry = run.questions[run.currentIndex];
  return {
    symbol: entry.symbol,
    codeword: entry.codeword,
    index: run.currentIndex,
    total: run.questions.length,
    hintVisible: run.hintVisible,
    options: run.currentOptions ? [...run.currentOptions] : null,
    wrongChoices: new Set(run.wrongChoices),
  };
}

export function useHint(run) {
  if (run.status !== 'active') {
    return;
  }
  const { symbol } = run.questions[run.currentIndex];
  run.hintedSymbols.add(symbol);
  run.hintVisible = true;
}

function advance(run) {
  run.currentIndex += 1;
  if (run.currentIndex >= run.questions.length) {
    run.status = 'completed';
    run.hintVisible = false;
    run.wrongChoices = new Set();
    run.currentOptions = null;
    return;
  }
  prepareCurrentQuestion(run);
}

export function submitKeyboardAnswer(run, text) {
  if (run.mode !== 'keyboard') {
    throw new TypeError('submitKeyboardAnswer is only valid in keyboard mode runs');
  }
  if (run.status !== 'active') {
    throw new TypeError('cannot submit answers after the run is completed');
  }
  const { codeword } = run.questions[run.currentIndex];
  if (!answersMatch(text, codeword)) {
    return { correct: false, status: run.status };
  }
  advance(run);
  return { correct: true, status: run.status };
}

export function submitSuggestionChoice(run, choice) {
  if (run.mode !== 'suggestion') {
    throw new TypeError('submitSuggestionChoice is only valid in suggestion mode runs');
  }
  if (run.status !== 'active') {
    throw new TypeError('cannot submit answers after the run is completed');
  }
  const { codeword } = run.questions[run.currentIndex];
  if (run.wrongChoices.has(choice)) {
    return { correct: false, status: run.status };
  }
  if (choice !== codeword) {
    run.wrongChoices.add(choice);
    return { correct: false, status: run.status };
  }
  advance(run);
  return { correct: true, status: run.status };
}

export function getScore(run) {
  const total = run.questions.length;
  const hinted = run.hintedSymbols.size;
  return {
    total,
    hinted,
    clean: total - hinted,
    percent: computeScorePercent(total, hinted),
  };
}
