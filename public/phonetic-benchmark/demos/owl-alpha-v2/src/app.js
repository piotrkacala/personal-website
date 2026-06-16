import { t } from "./i18n.js";
import {
  loadAlphabets,
  loadMultipleChoiceOptions,
  getSymbolOptions,
} from "./data.js";
import {
  shuffle,
  createRunOrder,
  validateAnswer,
  calculateScore,
  buildSuggestionOptions,
} from "./game.js";

// ── Constants ──────────────────────────────────────────────────────
const MODEL_NAME = "Owl Alpha";
const IMPLEMENTATION_DATE = "2026-06-11";

// ── State ──────────────────────────────────────────────────────────
let state = {
  lang: "en",
  alphabets: null,
  mcOptions: null,
  screen: "setup", // 'setup' | 'run' | 'result'
  alphabetKey: "polish", // 'polish' | 'nato'
  mode: "keyboard", // 'keyboard' | 'suggestion'
  runOrder: [], // shuffled entries
  currentIndex: 0,
  hintedSet: new Set(), // indices where hint was used
  hintRevealed: false, // hint shown for current question
  suggestionOptions: [], // shuffled options for current question
  locked: false, // true after wrong answer animation
};

// ── DOM refs ───────────────────────────────────────────────────────
const app = document.getElementById("app");

// ── Helpers ────────────────────────────────────────────────────────
function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "className") e.className = v;
    else if (k === "textContent") e.textContent = v;
    else if (k === "innerHTML") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function")
      e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === "string") e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  }
  return e;
}

function getAlphabetEntries() {
  return state.alphabets[state.alphabetKey];
}

function getCurrentEntry() {
  return state.runOrder[state.currentIndex];
}

// ── Render ─────────────────────────────────────────────────────────
function render() {
  app.innerHTML = "";

  if (state.screen === "setup") renderSetup();
  else if (state.screen === "run") renderRun();
  else if (state.screen === "result") renderResult();

  renderAttribution();
}

function renderAttribution() {
  const text = t("attribution", state.lang, {
    model: MODEL_NAME,
    date: IMPLEMENTATION_DATE,
  });
  const footer = el("footer", { className: "attribution", innerHTML: text });
  app.appendChild(footer);
}

// ── Setup Screen ───────────────────────────────────────────────────
function renderSetup() {
  const container = el("div", { className: "setup-screen" });

  // Header
  container.appendChild(
    el("div", { className: "header" }, [
      el("h1", { textContent: t("appTitle", state.lang) }),
      el("p", {
        className: "subtitle",
        textContent: t("subtitle", state.lang),
      }),
    ]),
  );

  // Language switcher
  const langRow = el("div", { className: "lang-switcher" });
  for (const code of ["en", "pl"]) {
    const btn = el("button", {
      textContent: code === "en" ? "English" : "Polski",
      className: state.lang === code ? "active" : "",
      onClick: () => {
        state.lang = code;
        render();
      },
    });
    langRow.appendChild(btn);
  }
  container.appendChild(langRow);

  // Alphabet selection
  container.appendChild(
    el("div", { className: "setup-group" }, [
      el("h2", { textContent: t("alphabetLabel", state.lang) }),
      el("div", { className: "options-row" }, [
        renderOptionBtn(
          "polish",
          t("polishAlphabet", state.lang),
          state.alphabetKey === "polish",
          () => {
            state.alphabetKey = "polish";
            render();
          },
        ),
        renderOptionBtn(
          "nato",
          t("natoAlphabet", state.lang),
          state.alphabetKey === "nato",
          () => {
            state.alphabetKey = "nato";
            render();
          },
        ),
      ]),
    ]),
  );

  // Mode selection
  container.appendChild(
    el("div", { className: "setup-group" }, [
      el("h2", { textContent: t("modeLabel", state.lang) }),
      el("div", { className: "options-row" }, [
        renderOptionBtn(
          "keyboard",
          t("keyboardMode", state.lang),
          state.mode === "keyboard",
          () => {
            state.mode = "keyboard";
            render();
          },
        ),
        renderOptionBtn(
          "suggestion",
          t("suggestionMode", state.lang),
          state.mode === "suggestion",
          () => {
            state.mode = "suggestion";
            render();
          },
        ),
      ]),
    ]),
  );

  // Start button
  const startBtn = el("button", {
    className: "start-btn",
    textContent: t("startButton", state.lang),
    onClick: startRun,
  });
  container.appendChild(startBtn);

  app.appendChild(container);
}

function renderOptionBtn(key, label, selected, onClick) {
  return el("button", {
    className: `option-btn ${selected ? "selected" : ""}`,
    textContent: label,
    onClick,
  });
}

// ── Run Screen ─────────────────────────────────────────────────────
function renderRun() {
  const container = el("div", { className: "run-screen" });
  const entry = getCurrentEntry();
  const total = state.runOrder.length;
  const current = state.currentIndex + 1;

  // Header with progress
  container.appendChild(
    el("div", { className: "run-header" }, [
      el("span", {
        className: "run-progress",
        textContent: t("progress", state.lang, { current, total }),
      }),
    ]),
  );

  // Progress bar
  const pct = (state.currentIndex / total) * 100;
  container.appendChild(
    el("div", { className: "progress-bar-track" }, [
      el("div", { className: "progress-bar-fill", style: `width: ${pct}%` }),
    ]),
  );

  // Question area
  const qArea = el("div", { className: "question-area" });
  qArea.appendChild(
    el("div", { className: "symbol-display", textContent: entry.symbol }),
  );

  // Hint display
  if (state.hintRevealed) {
    qArea.appendChild(
      el("div", { className: "codeword-hint", textContent: entry.codeword }),
    );
  } else {
    qArea.appendChild(el("div", { className: "codeword-hint" }));
  }

  // Mode-specific input
  if (state.mode === "keyboard") {
    renderKeyboardInput(qArea);
  } else {
    renderSuggestionInput(qArea);
  }

  container.appendChild(qArea);

  // Hint button
  if (!state.hintRevealed) {
    container.appendChild(
      el("button", {
        className: "hint-btn",
        textContent: t("hint", state.lang),
        onClick: revealHint,
      }),
    );
  }

  app.appendChild(container);
}

function renderKeyboardInput(parent) {
  const inputArea = el("div", { className: "keyboard-input-area" });
  const input = el("input", {
    className: "keyboard-input",
    type: "text",
    placeholder: t("placeholder", state.lang),
    autocomplete: "off",
    autocorrect: "off",
    autocapitalize: "off",
    spellcheck: "false",
  });

  const submitBtn = el("button", {
    className: "submit-btn",
    textContent: t("submit", state.lang),
    onClick: () => handleKeyboardSubmit(input),
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleKeyboardSubmit(input);
  });

  inputArea.appendChild(input);
  inputArea.appendChild(submitBtn);
  parent.appendChild(inputArea);

  // Feedback area
  parent.appendChild(el("div", { className: "feedback", id: "feedback" }));

  // Auto-focus
  setTimeout(() => input.focus(), 50);
}

function handleKeyboardSubmit(input) {
  if (state.locked) return;
  const entry = getCurrentEntry();
  const val = input.value;
  const feedback = document.getElementById("feedback");

  if (validateAnswer(val, entry.codeword)) {
    feedback.textContent = "";
    feedback.className = "feedback";
    advanceQuestion();
  } else {
    feedback.textContent = t("wrong", state.lang);
    feedback.className = "feedback wrong";
    input.value = "";
    input.focus();
  }
}

function renderSuggestionInput(parent) {
  const grid = el("div", { className: "suggestion-grid" });

  for (const opt of state.suggestionOptions) {
    const btn = el("button", {
      className: "suggestion-btn",
      textContent: opt.codeword,
      onClick: () => handleSuggestionClick(opt, btn),
    });
    grid.appendChild(btn);
  }

  parent.appendChild(grid);
}

function handleSuggestionClick(option, btn) {
  if (state.locked) return;

  if (option.correct) {
    btn.classList.add("correct");
    // Small delay so user sees the green flash
    state.locked = true;
    setTimeout(() => advanceQuestion(), 300);
  } else {
    btn.classList.add("wrong");
    // Remove wrong class after animation
    setTimeout(() => btn.classList.remove("wrong"), 600);
  }
}

function revealHint() {
  state.hintRevealed = true;
  render();
}

// ── Result Screen ──────────────────────────────────────────────────
function renderResult() {
  const container = el("div", { className: "result-screen" });
  const total = state.runOrder.length;
  const hinted = state.hintedSet.size;
  const clean = total - hinted;
  const score = calculateScore(total, hinted);

  container.appendChild(
    el("h2", { textContent: t("resultTitle", state.lang) }),
  );
  container.appendChild(
    el("div", { className: "score-display", textContent: `${score}%` }),
  );

  const meta = el("div", { className: "result-meta" });
  meta.appendChild(
    el("p", {}, [
      el("strong", { textContent: t("resultAlphabet", state.lang) + ": " }),
      t(state.alphabetKey, state.lang),
    ]),
  );
  meta.appendChild(
    el("p", {}, [
      el("strong", { textContent: t("resultMode", state.lang) + ": " }),
      t(state.mode, state.lang),
    ]),
  );
  meta.appendChild(
    el("p", {}, [
      el("strong", { textContent: t("resultTotal", state.lang) + ": " }),
      String(total),
    ]),
  );
  meta.appendChild(
    el("p", {}, [
      el("strong", { textContent: t("resultHinted", state.lang) + ": " }),
      String(hinted),
    ]),
  );
  meta.appendChild(
    el("p", {}, [
      el("strong", { textContent: t("resultClean", state.lang) + ": " }),
      String(clean),
    ]),
  );
  container.appendChild(meta);

  container.appendChild(
    el("button", {
      className: "restart-btn",
      textContent: t("restartButton", state.lang),
      onClick: () => {
        state.screen = "setup";
        render();
      },
    }),
  );

  app.appendChild(container);
}

// ── Run lifecycle ──────────────────────────────────────────────────
function startRun() {
  const entries = getAlphabetEntries();
  state.runOrder = createRunOrder(entries);
  state.currentIndex = 0;
  state.hintedSet = new Set();
  state.hintRevealed = false;
  state.locked = false;
  state.screen = "run";
  prepareQuestion();
  render();
}

function prepareQuestion() {
  state.hintRevealed = false;
  state.locked = false;

  if (state.mode === "suggestion") {
    const entry = getCurrentEntry();
    // multiple-choice-options.json has 4 codewords per symbol:
    // index 0 = correct, indices 1-3 = wrong
    const options = getSymbolOptions(state.alphabetKey, entry.symbol);
    if (options) {
      const correctCW = options[0];
      const wrongCWs = options.slice(1);
      state.suggestionOptions = buildSuggestionOptions(
        entry.symbol,
        correctCW,
        wrongCWs,
      );
    }
  }
}

function advanceQuestion() {
  // Mark current as hinted if applicable
  if (state.hintRevealed) {
    state.hintedSet.add(state.currentIndex);
  }

  state.currentIndex++;

  if (state.currentIndex >= state.runOrder.length) {
    state.screen = "result";
    render();
  } else {
    prepareQuestion();
    render();
  }
}

// ── Bootstrap ──────────────────────────────────────────────────────
async function init() {
  try {
    state.alphabets = await loadAlphabets();
    state.mcOptions = await loadMultipleChoiceOptions();
    state.hintedSet = new Set();
    render();
  } catch (err) {
    app.textContent = `Error loading data: ${err.message}`;
  }
}

init();
