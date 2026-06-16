import { shuffle } from "./random.js";
import { calculateScorePercent } from "./scoring.js";

export function createRunSession({ alphabetKey, mode, entries, optionMap, random = Math.random }) {
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("Alphabet entries are required to create a run session.");
  }

  const questions = shuffle(entries, random).map((entry) => {
    const question = {
      symbol: entry.symbol,
      codeword: entry.codeword
    };

    if (mode === "suggestion") {
      const fixedOptions = optionMap?.[entry.symbol];
      if (!Array.isArray(fixedOptions) || fixedOptions.length !== 4) {
        throw new Error(`Suggestion data for ${entry.symbol} must contain exactly four options.`);
      }
      if (!fixedOptions.includes(entry.codeword)) {
        throw new Error(`Suggestion data for ${entry.symbol} must include the correct codeword.`);
      }
      question.options = shuffle(fixedOptions, random);
    }

    return question;
  });

  return {
    alphabetKey,
    mode,
    questions,
    currentIndex: 0,
    hintedSymbols: new Set()
  };
}

export function getCurrentQuestion(session) {
  return session.questions[session.currentIndex] ?? null;
}

export function markHintUsed(session) {
  const question = getCurrentQuestion(session);
  if (question) {
    session.hintedSymbols.add(question.symbol);
  }
}

export function advanceSession(session) {
  session.currentIndex += 1;
  return session.currentIndex < session.questions.length;
}

export function finalizeSession(session) {
  const totalQuestions = session.questions.length;
  const hintedQuestions = session.hintedSymbols.size;

  return {
    totalQuestions,
    hintedQuestions,
    cleanQuestions: totalQuestions - hintedQuestions,
    scorePercent: calculateScorePercent(totalQuestions, hintedQuestions)
  };
}
