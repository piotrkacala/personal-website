// app.js — DOM controller and screen management
import { t, setLang, applyTranslations } from "./i18n.js";
import * as state from "./state.js";
import * as game from "./game.js";

// DOM references
const $ = (id) => document.getElementById(id);

const screenSetup = $("screen-setup");
const screenRun = $("screen-run");
const screenResult = $("screen-result");
const selectLanguage = $("select-language");
const selectAlphabet = $("select-alphabet");
const selectMode = $("select-mode");
const btnStart = $("btn-start");
const progressText = $("progress-text");
const btnHint = $("btn-hint");
const currentSymbol = $("current-symbol");
const hintText = $("hint-text");
const keyboardArea = $("keyboard-area");
const suggestionArea = $("suggestion-area");
const answerInput = $("answer-input");
const btnSubmit = $("btn-submit");
const suggestionButtons = $("suggestion-buttons");
const feedback = $("feedback");
const resultAlphabet = $("result-alphabet");
const resultMode = $("result-mode");
const resultScore = $("result-score");
const resultPercent = $("result-percent");
const btnRestart = $("btn-restart");

// ---- Screen management ----

function showScreen(screen) {
  [screenSetup, screenRun, screenResult].forEach((s) =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}

// ---- Setup screen ----

function initSetup() {
  applyTranslations();
  showScreen(screenSetup);
}

// Language change updates UI immediately
selectLanguage.addEventListener("change", () => {
  setLang(selectLanguage.value);
  state.setConfig({ lang: selectLanguage.value });
});

// ---- Start run ----

btnStart.addEventListener("click", () => {
  const lang = selectLanguage.value;
  const alphabet = selectAlphabet.value;
  const mode = selectMode.value;

  setLang(lang);
  state.setConfig({ lang, alphabet, mode });

  game.startRun();
  showScreen(screenRun);

  // Show/hide mode areas
  if (mode === "keyboard") {
    keyboardArea.classList.remove("hidden");
    suggestionArea.classList.add("hidden");
  } else {
    keyboardArea.classList.add("hidden");
    suggestionArea.classList.remove("hidden");
  }

  renderQuestion();
});

// ---- Question rendering ----

function renderQuestion() {
  const symbol = game.getCurrentSymbol();
  if (!symbol) {
    finishRun();
    return;
  }

  const total = state.getTotalQuestions();
  const current = state.getCurrentIndex() + 1;

  currentSymbol.textContent = symbol;
  progressText.textContent = t("progressText", { current, total });

  // Reset hint
  hintText.classList.add("hidden");
  hintText.textContent = "";
  btnHint.disabled = false;

  // Reset feedback
  feedback.classList.add("hidden");
  feedback.textContent = "";
  feedback.className = "feedback hidden";

  const config = state.getConfig();

  if (config.mode === "keyboard") {
    answerInput.value = "";
    answerInput.focus();
  } else {
    renderSuggestionButtons(symbol);
  }
}

function renderSuggestionButtons(symbol) {
  const options = game.getSuggestionOptions(symbol);
  suggestionButtons.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => handleSuggestionAnswer(opt, symbol));
    suggestionButtons.appendChild(btn);
  });
}

// ---- Hint ----

btnHint.addEventListener("click", () => {
  const codeword = game.revealHint();
  hintText.textContent = codeword;
  hintText.classList.remove("hidden");
  btnHint.disabled = true;
});

// ---- Keyboard answer ----

btnSubmit.addEventListener("click", handleKeyboardSubmit);
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleKeyboardSubmit();
});

function handleKeyboardSubmit() {
  const symbol = game.getCurrentSymbol();
  if (!symbol) return;

  const userAnswer = answerInput.value;
  const codeword = game.getCodewordForSymbol(symbol);

  if (game.checkAnswer(userAnswer, codeword)) {
    showFeedback(true);
    setTimeout(() => {
      if (game.advanceQuestion()) {
        renderQuestion();
      } else {
        finishRun();
      }
    }, 600);
  } else {
    showFeedback(false);
  }
}

// ---- Suggestion answer ----

function handleSuggestionAnswer(selected, symbol) {
  const codeword = game.getCodewordForSymbol(symbol);

  if (selected === codeword) {
    showFeedback(true);
    setTimeout(() => {
      if (game.advanceQuestion()) {
        renderQuestion();
      } else {
        finishRun();
      }
    }, 600);
  } else {
    showFeedback(false);
  }
}

// ---- Feedback ----

function showFeedback(correct) {
  feedback.classList.remove("hidden", "correct", "wrong");
  if (correct) {
    feedback.textContent = t("feedbackCorrect");
    feedback.classList.add("correct");
  } else {
    feedback.textContent = t("feedbackWrong");
    feedback.classList.add("wrong");
  }
}

// ---- Result screen ----

function finishRun() {
  const config = state.getConfig();
  const total = state.getTotalQuestions();
  const hinted = state.getHintedCount();
  const score = game.calculateScore(total, hinted);

  const alphabetLabel = t(
    config.alphabet === "nato" ? "alphabetNato" : "alphabetPolish"
  );
  const modeLabel = t(
    config.mode === "keyboard" ? "modeKeyboard" : "modeSuggestion"
  );

  resultAlphabet.textContent = t("resultAlphabet", { alphabet: alphabetLabel });
  resultMode.textContent = t("resultMode", { mode: modeLabel });
  resultScore.textContent = t("resultScore", { score });
  resultPercent.textContent = `${score}%`;

  showScreen(screenResult);
}

// ---- Restart ----

btnRestart.addEventListener("click", () => {
  initSetup();
});

// ---- Boot ----

async function boot() {
  await state.loadData();
  initSetup();
}

boot();
