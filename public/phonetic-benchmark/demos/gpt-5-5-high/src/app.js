import {
  createRun,
  getCurrentQuestion,
  isRunComplete,
  markHintUsed,
  submitAnswer,
  summarizeRun
} from "./domain.js";
import { t } from "./i18n.js";

const app = document.querySelector("#app");

const state = {
  language: "en",
  alphabetKey: "polish",
  mode: "keyboard",
  alphabets: null,
  multipleChoiceOptions: null,
  run: null,
  lastSummary: null,
  feedback: "",
  status: "loading"
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

async function boot() {
  try {
    const [alphabets, multipleChoiceOptions] = await Promise.all([
      loadJson("./benchmark-data/alphabets.json"),
      loadJson("./benchmark-data/multiple-choice-options.json")
    ]);
    state.alphabets = alphabets;
    state.multipleChoiceOptions = multipleChoiceOptions;
    state.status = "ready";
  } catch (error) {
    state.status = "error";
    console.error(error);
  }

  render();
}

function setLanguage(language) {
  state.language = language;
  document.documentElement.lang = language;
  render();
}

function startRun() {
  state.run = createRun({
    alphabetKey: state.alphabetKey,
    mode: state.mode,
    alphabets: state.alphabets,
    multipleChoiceOptions: state.multipleChoiceOptions
  });
  state.lastSummary = null;
  state.feedback = "";
  render();
}

function resetToSetup() {
  state.run = null;
  state.lastSummary = null;
  state.feedback = "";
  render();
}

function showHint() {
  markHintUsed(state.run);
  state.feedback = "";
  render();
}

function answerCurrentQuestion(answer) {
  const result = submitAnswer(state.run, answer);

  if (!result.accepted) {
    state.feedback = t(state.language, "wrongFeedback");
    render();
    return;
  }

  if (result.complete) {
    state.lastSummary = summarizeRun(state.run);
  }

  state.feedback = result.complete ? "" : t(state.language, "correctFeedback");
  render();
}

function labelForAlphabet(key) {
  return key === "polish" ? t(state.language, "polishAlphabet") : t(state.language, "natoAlphabet");
}

function labelForMode(mode) {
  return mode === "keyboard" ? t(state.language, "keyboardMode") : t(state.language, "suggestionMode");
}

function renderLanguageControls() {
  return `
    <fieldset class="control-group compact">
      <legend>${t(state.language, "language")}</legend>
      <div class="segmented" role="group" aria-label="${t(state.language, "language")}">
        <button class="segment ${state.language === "en" ? "is-selected" : ""}" data-action="language" data-value="en" type="button">${t(state.language, "english")}</button>
        <button class="segment ${state.language === "pl" ? "is-selected" : ""}" data-action="language" data-value="pl" type="button">${t(state.language, "polishLanguage")}</button>
      </div>
    </fieldset>
  `;
}

function renderSetup() {
  return `
    <main class="panel">
      <div class="panel-heading">
        <p class="eyebrow">${t(state.language, "setup")}</p>
        <h1>${t(state.language, "appTitle")}</h1>
        <p>${t(state.language, "appSubtitle")}</p>
      </div>

      ${renderLanguageControls()}

      <fieldset class="control-group">
        <legend>${t(state.language, "alphabet")}</legend>
        <label class="choice">
          <input type="radio" name="alphabet" value="polish" ${state.alphabetKey === "polish" ? "checked" : ""}>
          <span>${t(state.language, "polishAlphabet")}</span>
        </label>
        <label class="choice">
          <input type="radio" name="alphabet" value="nato" ${state.alphabetKey === "nato" ? "checked" : ""}>
          <span>${t(state.language, "natoAlphabet")}</span>
        </label>
      </fieldset>

      <fieldset class="control-group">
        <legend>${t(state.language, "mode")}</legend>
        <label class="choice stacked">
          <input type="radio" name="mode" value="keyboard" ${state.mode === "keyboard" ? "checked" : ""}>
          <span>
            <strong>${t(state.language, "keyboardMode")}</strong>
            <small>${t(state.language, "keyboardDescription")}</small>
          </span>
        </label>
        <label class="choice stacked">
          <input type="radio" name="mode" value="suggestion" ${state.mode === "suggestion" ? "checked" : ""}>
          <span>
            <strong>${t(state.language, "suggestionMode")}</strong>
            <small>${t(state.language, "suggestionDescription")}</small>
          </span>
        </label>
      </fieldset>

      <button class="primary-action" data-action="start" type="button">${t(state.language, "startRun")}</button>
    </main>
  `;
}

function renderRun() {
  if (isRunComplete(state.run)) {
    return renderResult();
  }

  const question = getCurrentQuestion(state.run);
  const currentNumber = state.run.currentIndex + 1;
  const total = state.run.questions.length;
  const progressPercent = Math.round((state.run.currentIndex / total) * 100);

  return `
    <main class="trainer">
      <header class="run-header">
        <div>
          <p class="eyebrow">${labelForAlphabet(state.run.alphabetKey)} / ${labelForMode(state.run.mode)}</p>
          <h1>${t(state.language, "questionLabel")}: ${question.symbol}</h1>
        </div>
        <div class="header-actions">
          ${renderLanguageControls()}
          <button class="secondary-action" data-action="restart" type="button">${t(state.language, "restart")}</button>
        </div>
      </header>

      <section class="progress-block" aria-label="${t(state.language, "progress")}">
        <div class="progress-copy">
          <strong>${t(state.language, "progress")}</strong>
          <span>${currentNumber} / ${total}</span>
        </div>
        <div class="progress-track"><span style="width: ${progressPercent}%"></span></div>
      </section>

      <section class="question-card">
        <div class="symbol" aria-label="${t(state.language, "questionLabel")}">${question.symbol}</div>
        ${state.run.mode === "keyboard" ? renderKeyboardForm() : renderSuggestions(question)}
        <button class="hint-action" data-action="hint" type="button">${t(state.language, "hint")}</button>
        ${question.hinted ? `<p class="hint"><strong>${t(state.language, "hintLabel")}:</strong> ${t(state.language, "correctAnswer")} ${question.codeword}</p>` : ""}
        ${state.feedback ? `<p class="feedback" role="status">${state.feedback}</p>` : ""}
      </section>
    </main>
  `;
}

function renderKeyboardForm() {
  return `
    <form class="answer-form" data-role="keyboard-form">
      <label for="answer-input">${t(state.language, "answerLabel")}</label>
      <div class="input-row">
        <input id="answer-input" name="answer" autocomplete="off" spellcheck="false" placeholder="${t(state.language, "answerPlaceholder")}">
        <button class="primary-action" type="submit">${t(state.language, "submit")}</button>
      </div>
    </form>
  `;
}

function renderSuggestions(question) {
  return `
    <div class="suggestion-grid" aria-label="${t(state.language, "answerLabel")}">
      ${question.options
        .map(
          (option) => `
            <button class="suggestion-button" data-action="suggestion" data-value="${escapeAttribute(option)}" type="button">
              ${option}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderResult() {
  const summary = state.lastSummary ?? summarizeRun(state.run);

  return `
    <main class="result-panel">
      <div class="panel-heading">
        <p class="eyebrow">${t(state.language, "finished")}</p>
        <h1>${summary.scorePercent}%</h1>
        <p>${t(state.language, "runContext")}: ${labelForAlphabet(state.run.alphabetKey)} / ${labelForMode(state.run.mode)}</p>
      </div>

      <dl class="score-grid">
        <div>
          <dt>${t(state.language, "score")}</dt>
          <dd>${summary.scorePercent}%</dd>
        </div>
        <div>
          <dt>${t(state.language, "cleanQuestions")}</dt>
          <dd>${summary.cleanQuestions} / ${summary.totalQuestions}</dd>
        </div>
        <div>
          <dt>${t(state.language, "hintedQuestions")}</dt>
          <dd>${summary.hintedQuestions}</dd>
        </div>
      </dl>

      <div class="result-actions">
        ${renderLanguageControls()}
        <button class="primary-action" data-action="restart" type="button">${t(state.language, "newRun")}</button>
      </div>
    </main>
  `;
}

function renderStatus() {
  const message = state.status === "error" ? t(state.language, "loadingError") : t(state.language, "loading");
  return `<main class="panel"><p>${message}</p></main>`;
}

function render() {
  const content = state.status === "ready" ? (state.run ? renderRun() : renderSetup()) : renderStatus();

  app.innerHTML = `
    ${content}
    <footer>${t(state.language, "attribution")}</footer>
  `;

  const input = document.querySelector("#answer-input");
  if (input) {
    input.focus();
  }
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

app.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    return;
  }

  const { action, value } = actionTarget.dataset;

  if (action === "language") {
    setLanguage(value);
  }

  if (action === "start") {
    startRun();
  }

  if (action === "restart") {
    resetToSetup();
  }

  if (action === "hint") {
    showHint();
  }

  if (action === "suggestion") {
    answerCurrentQuestion(value);
  }
});

app.addEventListener("change", (event) => {
  const { name, value } = event.target;

  if (name === "alphabet") {
    state.alphabetKey = value;
  }

  if (name === "mode") {
    state.mode = value;
  }
});

app.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-role='keyboard-form']");
  if (!form) {
    return;
  }

  event.preventDefault();
  const formData = new FormData(form);
  answerCurrentQuestion(formData.get("answer") ?? "");
});

boot();
