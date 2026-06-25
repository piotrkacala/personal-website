// Pure game logic for the benchmark run.
//
// The state machine and the validation pipeline live here. There is no DOM
// or I/O coupling so this module is unit-tested with node:test.
//
// Status transitions:
//
//   setup -> running  (startRun)
//   running -> result (every symbol has been answered correctly)
//   running -> setup  (quitToSetup)
//   result  -> running (runAgain, re-randomises the queue)
//   result  -> setup  (backToSetup)
//
// Scoring:
//
//   total    = number of symbols in the chosen alphabet
//   hinted   = number of questions for which the user used the hint
//   clean    = total - hinted
//   percent  = round((clean / total) * 100)

import { shuffle } from "./random.mjs";
import { compareKeyboardInput } from "./validation.mjs";

export const STATUS = Object.freeze({
  SETUP: "setup",
  RUNNING: "running",
  RESULT: "result"
});

export const MODE = Object.freeze({
  KEYBOARD: "keyboard",
  SUGGESTION: "suggestion"
});

function makeQueue(entries, rng) {
  return shuffle(entries, rng).map((entry) => ({ ...entry }));
}

export function initialState({ language = "en", alphabet = null, mode = null } = {}) {
  return {
    status: STATUS.SETUP,
    language,
    alphabet,
    mode,
    queue: [],
    currentIndex: 0,
    hintedSet: [],
    hintVisible: false,
    lastWrong: false
  };
}

export function startRun(state, { alphabet, mode, entries, rng = Math.random }) {
  if (!alphabet) throw new Error("startRun: alphabet required");
  if (!mode) throw new Error("startRun: mode required");
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("startRun: entries required");
  }
  return {
    ...state,
    status: STATUS.RUNNING,
    alphabet,
    mode,
    queue: makeQueue(entries, rng),
    currentIndex: 0,
    hintedSet: [],
    hintVisible: false,
    lastWrong: false
  };
}

export function currentQuestion(state) {
  if (state.status !== STATUS.RUNNING) return null;
  return state.queue[state.currentIndex] || null;
}

export function submitKeyboard(state, raw) {
  if (state.status !== STATUS.RUNNING) return { state, accepted: false };
  if (state.mode !== MODE.KEYBOARD) return { state, accepted: false, wrongMode: true };
  const question = currentQuestion(state);
  if (!question) return { state, accepted: false };
  const ok = compareKeyboardInput(raw, question.codeword);
  if (!ok) {
    return {
      state: { ...state, lastWrong: true },
      accepted: false
    };
  }
  return {
    state: advance(state),
    accepted: true
  };
}

export function submitSuggestion(state, codeword) {
  if (state.status !== STATUS.RUNNING) return { state, accepted: false };
  if (state.mode !== MODE.SUGGESTION) return { state, accepted: false, wrongMode: true };
  const question = currentQuestion(state);
  if (!question) return { state, accepted: false };
  if (codeword !== question.codeword) {
    return {
      state: { ...state, lastWrong: true },
      accepted: false
    };
  }
  return {
    state: advance(state),
    accepted: true
  };
}

export function useHint(state) {
  if (state.status !== STATUS.RUNNING) return { state, revealed: null };
  const question = currentQuestion(state);
  if (!question) return { state, revealed: null };
  const hintedSet = state.hintedSet.includes(state.currentIndex)
    ? state.hintedSet
    : [...state.hintedSet, state.currentIndex];
  return {
    state: { ...state, hintedSet, hintVisible: true },
    revealed: question.codeword
  };
}

export function clearWrong(state) {
  if (!state.lastWrong) return state;
  return { ...state, lastWrong: false };
}

function advance(state) {
  const nextIndex = state.currentIndex + 1;
  if (nextIndex >= state.queue.length) {
    return {
      ...state,
      currentIndex: nextIndex,
      status: STATUS.RESULT,
      hintVisible: false,
      lastWrong: false
    };
  }
  return {
    ...state,
    currentIndex: nextIndex,
    hintVisible: false,
    lastWrong: false
  };
}

export function restartRun(state, { entries, rng = Math.random }) {
  if (!entries) throw new Error("restartRun: entries required for the current alphabet");
  return {
    ...state,
    status: STATUS.RUNNING,
    queue: makeQueue(entries, rng),
    currentIndex: 0,
    hintedSet: [],
    hintVisible: false,
    lastWrong: false
  };
}

export function quitToSetup(state) {
  return {
    ...state,
    status: STATUS.SETUP,
    queue: [],
    currentIndex: 0,
    hintedSet: [],
    hintVisible: false,
    lastWrong: false
  };
}

export function runAgain(state, { entries, rng = Math.random }) {
  return restartRun(state, { entries, rng });
}

export function backToSetup(state) {
  return quitToSetup(state);
}

export function setLanguage(state, language) {
  return { ...state, language };
}

export function setSetupAlphabet(state, alphabet) {
  return { ...state, alphabet };
}

export function setSetupMode(state, mode) {
  return { ...state, mode };
}

export function buildOptionsFor(symbol, optionsData, alphabetKey, rng = Math.random) {
  const list = optionsData?.[alphabetKey]?.[symbol];
  if (!Array.isArray(list) || list.length !== 4) {
    throw new Error(`buildOptionsFor: no 4-option set for ${alphabetKey}/${symbol}`);
  }
  return shuffle(list, rng);
}

export function finalScore(state) {
  const total = state.queue.length;
  const hinted = state.hintedSet.length;
  const clean = total - hinted;
  const percent = total === 0 ? 0 : Math.round((clean / total) * 100);
  return { total, hinted, clean, percent };
}
