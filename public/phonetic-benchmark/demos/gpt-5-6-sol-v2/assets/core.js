export const MODES = Object.freeze(["keyboard", "suggestion"]);
export const ALPHABETS = Object.freeze(["polish", "nato"]);

export function shuffle(items, random = Math.random) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function normalizeAnswer(value) {
  return String(value).trim().toLocaleUpperCase("pl-PL");
}

export function isCorrectAnswer(value, codeword) {
  return normalizeAnswer(value) === normalizeAnswer(codeword);
}

export function calculateScore(totalQuestions, hintedQuestions) {
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
    throw new RangeError("totalQuestions must be a positive integer");
  }
  if (
    !Number.isInteger(hintedQuestions) ||
    hintedQuestions < 0 ||
    hintedQuestions > totalQuestions
  ) {
    throw new RangeError("hintedQuestions must be between zero and totalQuestions");
  }
  return Math.round(((totalQuestions - hintedQuestions) / totalQuestions) * 100);
}

export function createRun({ alphabet, mode, entries, optionSets, random = Math.random }) {
  if (!ALPHABETS.includes(alphabet)) throw new Error(`Unsupported alphabet: ${alphabet}`);
  if (!MODES.includes(mode)) throw new Error(`Unsupported mode: ${mode}`);
  if (!Array.isArray(entries) || entries.length === 0) throw new Error("Alphabet is empty");

  const symbols = new Set();
  for (const entry of entries) {
    if (!entry?.symbol || !entry?.codeword || symbols.has(entry.symbol)) {
      throw new Error("Alphabet entries must have unique symbol and codeword values");
    }
    symbols.add(entry.symbol);
    if (mode === "suggestion") validateOptionSet(entry, optionSets?.[entry.symbol]);
  }

  return {
    alphabet,
    mode,
    questions: shuffle(entries, random).map((entry) => ({ ...entry })),
    optionSets,
    currentIndex: 0,
    hintedSymbols: new Set(),
    hintVisible: false,
    wrongAttempts: 0,
    attempts: 0,
  };
}

export function validateOptionSet(entry, options) {
  if (!Array.isArray(options) || options.length !== 4) {
    throw new Error(`Expected four options for ${entry.symbol}`);
  }
  if (new Set(options).size !== 4 || options.filter((option) => option === entry.codeword).length !== 1) {
    throw new Error(`Option set for ${entry.symbol} must contain one correct and three unique incorrect options`);
  }
}

export function currentQuestion(run) {
  return run.questions[run.currentIndex] ?? null;
}

export function revealHint(run) {
  const question = currentQuestion(run);
  if (!question) return run;
  run.hintVisible = true;
  run.hintedSymbols.add(question.symbol);
  return run;
}

export function submitAnswer(run, answer) {
  const question = currentQuestion(run);
  if (!question) return { correct: false, completed: true };

  run.attempts += 1;
  const correct = isCorrectAnswer(answer, question.codeword);
  if (!correct) {
    run.wrongAttempts += 1;
    return { correct: false, completed: false };
  }

  run.currentIndex += 1;
  run.hintVisible = false;
  return { correct: true, completed: run.currentIndex === run.questions.length };
}

export function getOptions(run, random = Math.random) {
  if (run.mode !== "suggestion") throw new Error("Options are only available in suggestion mode");
  const question = currentQuestion(run);
  return question ? shuffle(run.optionSets[question.symbol], random) : [];
}

export function getResult(run) {
  if (currentQuestion(run)) throw new Error("Run is not complete");
  return {
    score: calculateScore(run.questions.length, run.hintedSymbols.size),
    total: run.questions.length,
    hinted: run.hintedSymbols.size,
    clean: run.questions.length - run.hintedSymbols.size,
    wrongAttempts: run.wrongAttempts,
  };
}
