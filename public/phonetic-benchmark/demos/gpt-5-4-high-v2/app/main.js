import { isKeyboardAnswerCorrect } from "./logic/answers.js";
import { IMPLEMENTATION_INFO } from "./logic/constants.js";
import {
  advanceSession,
  createRunSession,
  finalizeSession,
  getCurrentQuestion,
  markHintUsed
} from "./logic/session.js";
import { translations } from "./translations.js";

const appElement = document.querySelector("#app");

const state = {
  status: "loading",
  uiLanguage: "en",
  selectedAlphabet: "polish",
  selectedMode: "keyboard",
  data: null,
  run: null,
  hintVisible: false,
  keyboardDraft: "",
  feedback: null,
  result: null
};

function currentCopy() {
  return translations[state.uiLanguage];
}

function currentQuestion() {
  return state.run ? getCurrentQuestion(state.run) : null;
}

async function loadData() {
  const [alphabetsResponse, optionsResponse] = await Promise.all([
    fetch("./benchmark-data/alphabets.json"),
    fetch("./benchmark-data/multiple-choice-options.json")
  ]);

  if (!alphabetsResponse.ok || !optionsResponse.ok) {
    throw new Error("Failed to load benchmark data.");
  }

  const alphabets = await alphabetsResponse.json();
  const options = await optionsResponse.json();

  for (const key of ["polish", "nato"]) {
    if (!Array.isArray(alphabets[key]) || typeof options[key] !== "object") {
      throw new Error(`Benchmark data for ${key} is incomplete.`);
    }
  }

  return { alphabets, options };
}

function resetTransientState() {
  state.hintVisible = false;
  state.keyboardDraft = "";
  state.feedback = null;
}

function startRun() {
  state.run = createRunSession({
    alphabetKey: state.selectedAlphabet,
    mode: state.selectedMode,
    entries: state.data.alphabets[state.selectedAlphabet],
    optionMap: state.data.options[state.selectedAlphabet]
  });
  state.status = "running";
  state.result = null;
  resetTransientState();
  render();
}

function restartRun() {
  startRun();
}

function leaveRun() {
  state.run = null;
  state.result = null;
  state.status = "setup";
  resetTransientState();
  render();
}

function handleCorrectAnswer() {
  const hasMoreQuestions = advanceSession(state.run);

  if (!hasMoreQuestions) {
    state.result = finalizeSession(state.run);
    state.status = "result";
    render();
    return;
  }

  resetTransientState();
  render();
}

function revealHint() {
  if (!state.run || state.hintVisible) {
    return;
  }

  state.hintVisible = true;
  markHintUsed(state.run);
  render();
}

function handleKeyboardSubmit(event) {
  event.preventDefault();

  const question = currentQuestion();
  if (!question) {
    return;
  }

  if (isKeyboardAnswerCorrect(state.keyboardDraft, question.codeword)) {
    handleCorrectAnswer();
    return;
  }

  state.feedback = {
    type: "error",
    message: currentCopy().wrongKeyboard
  };
  render();
}

function handleSuggestionChoice(option) {
  const question = currentQuestion();
  if (!question) {
    return;
  }

  if (option === question.codeword) {
    handleCorrectAnswer();
    return;
  }

  state.feedback = {
    type: "error",
    message: currentCopy().wrongSuggestion
  };
  render();
}

function setupActions() {
  const languageSelect = document.querySelector("#language-select");
  const alphabetSelect = document.querySelector("#alphabet-select");
  const keyboardInput = document.querySelector("#keyboard-input");
  const setupForm = document.querySelector("#setup-form");
  const keyboardForm = document.querySelector("#keyboard-form");
  const hintButton = document.querySelector("[data-action='hint']");
  const restartButton = document.querySelector("[data-action='restart']");
  const leaveButton = document.querySelector("[data-action='leave']");
  const replayButton = document.querySelector("[data-action='replay']");
  const backToSetupButton = document.querySelector("[data-action='result-setup']");

  languageSelect?.addEventListener("change", (event) => {
    state.uiLanguage = event.target.value;
    render();
  });

  alphabetSelect?.addEventListener("change", (event) => {
    state.selectedAlphabet = event.target.value;
  });

  document.querySelectorAll("input[name='mode']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.selectedMode = event.target.value;
    });
  });

  keyboardInput?.addEventListener("input", (event) => {
    state.keyboardDraft = event.target.value;
  });

  setupForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    startRun();
  });

  keyboardForm?.addEventListener("submit", handleKeyboardSubmit);
  hintButton?.addEventListener("click", revealHint);
  restartButton?.addEventListener("click", restartRun);
  leaveButton?.addEventListener("click", leaveRun);
  replayButton?.addEventListener("click", restartRun);
  backToSetupButton?.addEventListener("click", leaveRun);

  document.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      handleSuggestionChoice(button.dataset.option);
    });
  });

  if (keyboardInput) {
    keyboardInput.focus();
  }
}

function renderSetup(copy) {
  const sideBullets = copy.sideBullets.map((item) => `<li>${item}</li>`).join("");

  return `
    <section class="panel">
      <h2>${copy.setupTitle}</h2>
      <p>${copy.setupCopy}</p>
      <form id="setup-form" class="stack">
        <div class="field">
          <label for="alphabet-select">${copy.alphabetLabel}</label>
          <select id="alphabet-select" name="alphabet">
            <option value="polish" ${state.selectedAlphabet === "polish" ? "selected" : ""}>
              ${copy.alphabets.polish}
            </option>
            <option value="nato" ${state.selectedAlphabet === "nato" ? "selected" : ""}>
              ${copy.alphabets.nato}
            </option>
          </select>
        </div>
        <fieldset class="radio-group">
          <legend>${copy.modeLabel}</legend>
          <div class="radio-grid">
            <label class="choice">
              <input type="radio" name="mode" value="keyboard" ${state.selectedMode === "keyboard" ? "checked" : ""} />
              <span>
                <strong>${copy.modes.keyboard}</strong>
                <small>${copy.modeDescriptions.keyboard}</small>
              </span>
            </label>
            <label class="choice">
              <input type="radio" name="mode" value="suggestion" ${state.selectedMode === "suggestion" ? "checked" : ""} />
              <span>
                <strong>${copy.modes.suggestion}</strong>
                <small>${copy.modeDescriptions.suggestion}</small>
              </span>
            </label>
          </div>
        </fieldset>
        <button class="button button-primary" type="submit">${copy.startRun}</button>
      </form>
    </section>
    <aside class="panel">
      <h2>${copy.sideTitle}</h2>
      <p>${copy.sideCopy}</p>
      <ul>
        ${sideBullets}
      </ul>
    </aside>
  `;
}

function renderRunning(copy) {
  const question = currentQuestion();
  const totalQuestions = state.run.questions.length;
  const currentPosition = state.run.currentIndex + 1;
  const progressPercent = (currentPosition / totalQuestions) * 100;
  const feedbackHtml = state.feedback
    ? `<div class="feedback feedback-${state.feedback.type}" aria-live="polite">${state.feedback.message}</div>`
    : "";
  const hintHtml = state.hintVisible
    ? `
      <div class="hint-box">
        <strong>${copy.hintTitle}</strong>
        <div>${question.codeword}</div>
        <div class="hint-note">${copy.hintCopy}</div>
      </div>
    `
    : "";

  const answerArea = state.selectedMode === "keyboard"
    ? `
      <form id="keyboard-form" class="stack">
        <div class="input-row">
          <input
            id="keyboard-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            value="${escapeHtml(state.keyboardDraft)}"
            placeholder="${copy.keyboardPlaceholder}"
          />
          <button class="button button-primary" type="submit">${copy.submit}</button>
        </div>
      </form>
    `
    : `
      <div class="suggestion-grid">
        ${question.options
          .map(
            (option) => `
              <button class="suggestion-button" type="button" data-option="${escapeHtml(option)}">
                ${option}
              </button>
            `
          )
          .join("")}
      </div>
    `;

  return `
    <section class="panel stack">
      <div class="progress-box">
        <div class="summary-tags">
          <span class="tag">${copy.alphabets[state.run.alphabetKey]}</span>
          <span class="tag">${copy.modes[state.run.mode]}</span>
        </div>
        <div>
          <strong>${copy.progressLabel}</strong>
          <div class="microcopy">${copy.progressText(currentPosition, totalQuestions)}</div>
        </div>
        <div class="progress-line" aria-hidden="true">
          <span style="width: ${progressPercent}%"></span>
        </div>
      </div>
      <div class="status-box symbol-card">
        <h2>${copy.activeRunTitle}</h2>
        <p>${copy.activeRunCopy}</p>
        <div class="symbol">${question.symbol}</div>
        <div class="prompt">${copy.prompt}</div>
      </div>
      ${hintHtml}
      ${feedbackHtml}
      ${answerArea}
      <div class="action-row">
        <button class="button button-secondary" type="button" data-action="hint" ${state.hintVisible ? "disabled" : ""}>
          ${state.hintVisible ? copy.hintUsed : copy.hint}
        </button>
        <button class="button button-ghost" type="button" data-action="restart">${copy.restartRun}</button>
        <button class="button button-ghost" type="button" data-action="leave">${copy.backToSetup}</button>
      </div>
    </section>
    <aside class="panel">
      <h2>${copy.runSummaryTitle}</h2>
      <dl class="summary-list">
        <div>
          <dt>${copy.alphabetLabel}</dt>
          <dd>${copy.alphabets[state.run.alphabetKey]}</dd>
        </div>
        <div>
          <dt>${copy.modeLabel}</dt>
          <dd>${copy.modes[state.run.mode]}</dd>
        </div>
        <div>
          <dt>${copy.hintTitle}</dt>
          <dd>${copy.sideCopy}</dd>
        </div>
      </dl>
    </aside>
  `;
}

function renderResult(copy) {
  const result = state.result;

  return `
    <section class="panel stack">
      <div class="result-box">
        <h2>${copy.resultTitle}</h2>
        <p>${copy.resultCopy}</p>
        <p class="result-score">${result.scorePercent}%</p>
      </div>
      <div class="summary-tags">
        <span class="tag">${copy.alphabets[state.run.alphabetKey]}</span>
        <span class="tag">${copy.modes[state.run.mode]}</span>
      </div>
      <dl class="summary-list">
        <div>
          <dt>${copy.resultScoreLabel}</dt>
          <dd>${result.scorePercent}%</dd>
        </div>
        <div>
          <dt>${copy.resultCleanLabel}</dt>
          <dd>${result.cleanQuestions} / ${result.totalQuestions}</dd>
        </div>
        <div>
          <dt>${copy.resultHintedLabel}</dt>
          <dd>${result.hintedQuestions}</dd>
        </div>
      </dl>
      <div class="action-row">
        <button class="button button-primary" type="button" data-action="replay">${copy.replay}</button>
        <button class="button button-ghost" type="button" data-action="result-setup">${copy.backToSetup}</button>
      </div>
    </section>
    <aside class="panel">
      <h2>${copy.runSummaryTitle}</h2>
      <p>${copy.sideCopy}</p>
    </aside>
  `;
}

function renderBody(copy) {
  if (state.status === "loading") {
    return `
      <section class="panel">
        <h2>${copy.setupTitle}</h2>
        <p>${copy.loading}</p>
      </section>
    `;
  }

  if (state.status === "error") {
    return `
      <section class="panel">
        <h2>${copy.setupTitle}</h2>
        <p>${copy.loadError}</p>
      </section>
    `;
  }

  if (state.status === "running") {
    return renderRunning(copy);
  }

  if (state.status === "result") {
    return renderResult(copy);
  }

  return renderSetup(copy);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function render() {
  const copy = currentCopy();
  const running = state.status === "running";

  document.documentElement.lang = state.uiLanguage === "pl" ? "pl" : "en";
  document.title = copy.pageTitle;

  appElement.innerHTML = `
    <div class="shell">
      <header class="hero">
        <div class="hero-top">
          <div class="hero-copy">
            <div class="eyebrow">${copy.eyebrow}</div>
            <h1>${copy.title}</h1>
            <p>${copy.intro}</p>
          </div>
          <div class="language-wrap">
            <label for="language-select">${copy.interfaceLanguageLabel}</label>
            <select id="language-select" ${running ? "disabled" : ""}>
              <option value="en" ${state.uiLanguage === "en" ? "selected" : ""}>English</option>
              <option value="pl" ${state.uiLanguage === "pl" ? "selected" : ""}>Polski</option>
            </select>
            ${running ? `<div class="language-note">${copy.languageLocked}</div>` : ""}
          </div>
        </div>
      </header>
      <main class="layout">
        ${renderBody(copy)}
      </main>
      <footer class="footer">
        ${copy.footer(IMPLEMENTATION_INFO)}
      </footer>
    </div>
  `;

  setupActions();
}

async function bootstrap() {
  render();

  try {
    state.data = await loadData();
    state.status = "setup";
  } catch (error) {
    console.error(error);
    state.status = "error";
  }

  render();
}

bootstrap();
