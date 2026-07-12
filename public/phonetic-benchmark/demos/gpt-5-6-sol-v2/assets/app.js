import {
  calculateScore,
  createRun,
  currentQuestion,
  getOptions,
  getResult,
  revealHint,
  submitAnswer,
} from "./core.js";
import { translate } from "./i18n.js";

const app = document.querySelector("#app");
const headerStatus = document.querySelector("#header-status");
const footer = document.querySelector("#footer");
const announcer = document.querySelector("#announcer");
const siteHeader = document.querySelector("#site-header");
const brand = document.querySelector("#brand");
const brandLabel = document.querySelector("#brand-label");

const state = {
  language: "en",
  alphabet: "polish",
  mode: "keyboard",
  screen: "setup",
  run: null,
  result: null,
  feedback: "",
  showEndDialog: false,
  optionOrder: [],
  data: null,
};

const t = (key, values) => translate(state.language, key, values);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function alphabetName(alphabet = state.alphabet) {
  return t(alphabet === "polish" ? "polishAlphabet" : "natoAlphabet");
}

function modeName(mode = state.mode) {
  return t(mode);
}

function languageSwitcher() {
  return `
    <div class="language-switcher" role="group" aria-label="${escapeHtml(t("interfaceLanguage"))}">
      <button type="button" data-language="pl" aria-pressed="${state.language === "pl"}" lang="pl">PL</button>
      <button type="button" data-language="en" aria-pressed="${state.language === "en"}" lang="en">EN</button>
    </div>`;
}

function renderHeader() {
  siteHeader.setAttribute("aria-label", t("applicationHeader"));
  brand.setAttribute("aria-label", t("appHome"));
  brandLabel.innerHTML = escapeHtml(t("appName")).replace(" ", "<br />");
  headerStatus.innerHTML = state.screen === "run"
    ? `<div class="session-chip" title="${escapeHtml(t("languageLocked"))}">${escapeHtml(alphabetName())} · ${escapeHtml(modeName())}</div>`
    : languageSwitcher();
}

function renderFooter() {
  const copy = escapeHtml(t("footer"));
  footer.innerHTML = copy.replace(
    "piotrkacala.pl",
    '<a href="https://piotrkacala.pl" rel="author">piotrkacala.pl</a>',
  );
}

function renderSetup() {
  const polishCount = state.data.alphabets.polish.length;
  const natoCount = state.data.alphabets.nato.length;
  app.innerHTML = `
    <section class="setup-grid" aria-labelledby="setup-title">
      <div class="intro">
        <p class="eyebrow">${escapeHtml(t("eyebrow"))}</p>
        <h1 id="setup-title">${escapeHtml(t("title"))}</h1>
        <p class="intro-copy">${escapeHtml(t("subtitle"))}</p>
        <div class="motif" aria-hidden="true"><span>A</span><span>Ą</span><span></span></div>
      </div>

      <form id="setup-form" class="setup-card">
        <fieldset class="field-group">
          <legend>01 — ${escapeHtml(t("chooseAlphabet"))}</legend>
          <div class="choice-grid">
            ${setupChoice("alphabet", "polish", "PL", t("polishAlphabet"), t("polishSymbolCount", { count: polishCount }), state.alphabet === "polish")}
            ${setupChoice("alphabet", "nato", "NT", t("natoAlphabet"), t("natoSymbolCount", { count: natoCount }), state.alphabet === "nato")}
          </div>
        </fieldset>
        <fieldset class="field-group">
          <legend>02 — ${escapeHtml(t("chooseMode"))}</legend>
          <div class="choice-grid">
            ${setupChoice("mode", "keyboard", "⌨", t("keyboard"), t("keyboardDescription"), state.mode === "keyboard")}
            ${setupChoice("mode", "suggestion", "••", t("suggestion"), t("suggestionDescription"), state.mode === "suggestion")}
          </div>
        </fieldset>
        <button class="primary-button" type="submit">${escapeHtml(t("begin"))}<span class="button-arrow" aria-hidden="true">→</span></button>
        <p class="setup-note">${escapeHtml(t("setupNote"))}</p>
      </form>
    </section>`;
}

function setupChoice(name, value, symbol, title, meta, checked) {
  return `<div class="choice">
    <input id="${name}-${value}" name="${name}" value="${value}" type="radio" ${checked ? "checked" : ""} />
    <label for="${name}-${value}">
      <span class="choice-symbol" aria-hidden="true">${escapeHtml(symbol)}</span>
      <span class="choice-content"><span class="choice-title">${escapeHtml(title)}</span><span class="choice-meta">${escapeHtml(meta)}</span></span>
    </label>
  </div>`;
}

function renderRun() {
  const question = currentQuestion(state.run);
  const current = state.run.currentIndex + 1;
  const total = state.run.questions.length;
  const progress = (state.run.currentIndex / total) * 100;
  const potential = calculateScore(total, state.run.hintedSymbols.size);

  app.innerHTML = `
    <section class="run-layout" aria-labelledby="question-prompt">
      <div class="run-topline">
        <div class="progress-copy"><strong>${escapeHtml(t("progress"))}</strong><span>${escapeHtml(t("questionOf", { current, total }))}</span></div>
        <div class="potential">${escapeHtml(t("scorePotential"))}: ${potential}%</div>
      </div>
      <div class="progress-track" aria-hidden="true"><span style="width: ${progress}%"></span></div>
      <div class="exercise-card">
        <p id="question-prompt" class="eyebrow">${escapeHtml(t("prompt"))}</p>
        <div class="symbol-display" aria-label="${escapeHtml(question.symbol)}">${escapeHtml(question.symbol)}</div>
        ${state.run.mode === "keyboard" ? keyboardAnswer() : suggestionAnswer()}
        <p class="feedback ${state.feedback ? "error" : ""}" role="status">${escapeHtml(state.feedback)}</p>
        ${state.run.hintVisible ? `<div class="hint-panel"><strong>${escapeHtml(t("hintLabel"))}:</strong>${escapeHtml(t("hintText", { codeword: question.codeword }))}</div>` : ""}
        <div class="run-actions">
          <button class="text-button" type="button" data-action="hint" ${state.run.hintVisible ? "disabled" : ""}>${escapeHtml(t("hint"))}</button>
          <button class="text-button" type="button" data-action="end">${escapeHtml(t("endRun"))}</button>
        </div>
      </div>
    </section>
    ${state.showEndDialog ? endDialog() : ""}`;

  if (state.run.mode === "keyboard") {
    document.querySelector("#answer")?.focus();
  }
  if (state.showEndDialog) document.querySelector('[data-action="cancel-end"]')?.focus();
}

function keyboardAnswer() {
  return `<form id="answer-form" class="answer-form" autocomplete="off">
    <label for="answer">${escapeHtml(t("answerLabel"))}</label>
    <div class="input-row">
      <input id="answer" class="answer-input" name="answer" type="text" maxlength="40" autocapitalize="characters" spellcheck="false" placeholder="${escapeHtml(t("answerPlaceholder"))}" required />
      <button class="primary-button" type="submit">${escapeHtml(t("check"))}</button>
    </div>
  </form>`;
}

function suggestionAnswer() {
  return `<div class="options-grid" role="group" aria-label="${escapeHtml(t("answerOptions"))}">
    ${state.optionOrder.map((option) => `<button class="option-button" type="button" data-option="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}
  </div>`;
}

function endDialog() {
  return `<div class="modal-backdrop">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="end-title" aria-describedby="end-description">
      <h2 id="end-title">${escapeHtml(t("endTitle"))}</h2>
      <p id="end-description">${escapeHtml(t("endDescription"))}</p>
      <div class="modal-actions">
        <button class="secondary-button" type="button" data-action="cancel-end">${escapeHtml(t("keepTraining"))}</button>
        <button class="primary-button danger-button" type="button" data-action="confirm-end">${escapeHtml(t("discardRun"))}</button>
      </div>
    </div>
  </div>`;
}

function renderResult() {
  const rating = state.result.score === 100 ? t("perfect") : state.result.score >= 80 ? t("strong") : t("growing");
  app.innerHTML = `
    <section class="result-card" aria-labelledby="result-title">
      <p class="eyebrow">${escapeHtml(t("completedEyebrow"))}</p>
      <div class="score-ring" style="--score: ${state.result.score}" aria-label="${state.result.score}%"><span>${state.result.score}%</span></div>
      <p class="eyebrow">${escapeHtml(rating)}</p>
      <h1 id="result-title">${escapeHtml(t("completedTitle"))}</h1>
      <p class="result-summary">${escapeHtml(t("resultSummary", { alphabet: alphabetName(), mode: modeName() }))}</p>
      <div class="result-stats">
        ${resultStat(state.result.clean, t("cleanAnswers"))}
        ${resultStat(state.result.hinted, t("hintsUsed"))}
        ${resultStat(state.result.wrongAttempts, t("wrongAttempts"))}
      </div>
      <p class="result-explanation">${escapeHtml(t("scoreExplanation"))}</p>
      <button class="primary-button" type="button" data-action="again">${escapeHtml(t("trainAgain"))} <span class="button-arrow" aria-hidden="true">↻</span></button>
    </section>`;
}

function resultStat(value, label) {
  return `<div class="result-stat"><strong>${value}</strong><span>${escapeHtml(label)}</span></div>`;
}

function render() {
  document.documentElement.lang = state.language;
  document.title = state.language === "pl" ? "Trening fonetyczny" : "Phonetic Practice";
  renderHeader();
  renderFooter();
  if (state.screen === "setup") renderSetup();
  if (state.screen === "run") renderRun();
  if (state.screen === "result") renderResult();
}

function startRun() {
  state.run = createRun({
    alphabet: state.alphabet,
    mode: state.mode,
    entries: state.data.alphabets[state.alphabet],
    optionSets: state.data.options[state.alphabet],
  });
  state.optionOrder = state.mode === "suggestion" ? getOptions(state.run) : [];
  state.feedback = "";
  state.result = null;
  state.screen = "run";
  render();
}

function answer(value) {
  const outcome = submitAnswer(state.run, value);
  if (!outcome.correct) {
    state.feedback = t(state.mode === "keyboard" ? "incorrectKeyboard" : "incorrectSuggestion");
    render();
    announcer.textContent = state.feedback;
    return;
  }
  state.feedback = "";
  if (outcome.completed) {
    state.result = getResult(state.run);
    state.screen = "result";
  } else if (state.mode === "suggestion") {
    state.optionOrder = getOptions(state.run);
  }
  render();
  announcer.textContent = outcome.completed ? t("completedTitle") : t("correct");
}

document.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-language]");
  if (languageButton && state.screen !== "run") {
    state.language = languageButton.dataset.language;
    render();
    return;
  }

  const optionButton = event.target.closest("[data-option]");
  if (optionButton && state.screen === "run" && state.mode === "suggestion") {
    answer(optionButton.dataset.option);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "hint") {
    revealHint(state.run);
    render();
  } else if (action === "end") {
    state.showEndDialog = true;
    render();
  } else if (action === "cancel-end") {
    state.showEndDialog = false;
    render();
  } else if (action === "confirm-end") {
    state.run = null;
    state.showEndDialog = false;
    state.screen = "setup";
    render();
  } else if (action === "again") {
    state.run = null;
    state.result = null;
    state.screen = "setup";
    render();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.name === "alphabet") state.alphabet = event.target.value;
  if (event.target.name === "mode") state.mode = event.target.value;
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.id === "setup-form") startRun();
  if (event.target.id === "answer-form") answer(new FormData(event.target).get("answer"));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.showEndDialog) {
    state.showEndDialog = false;
    render();
  }
});

async function loadData() {
  const [alphabetResponse, optionsResponse] = await Promise.all([
    fetch("./benchmark-data/alphabets.json"),
    fetch("./benchmark-data/multiple-choice-options.json"),
  ]);
  if (!alphabetResponse.ok || !optionsResponse.ok) throw new Error(t("dataError"));
  state.data = {
    alphabets: await alphabetResponse.json(),
    options: await optionsResponse.json(),
  };
  render();
}

loadData().catch((error) => {
  app.innerHTML = `<p role="alert">${escapeHtml(error.message)}</p>`;
});
