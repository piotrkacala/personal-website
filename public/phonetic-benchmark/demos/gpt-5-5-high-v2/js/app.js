import {
  createRun,
  getCurrentQuestion,
  getRunStats,
  markHint,
  submitAnswer
} from "./core.js";
import { translate } from "./i18n.js";

const state = {
  language: "en",
  alphabets: null,
  optionSets: null,
  currentRun: null,
  lastSettings: {
    alphabetKey: "polish",
    mode: "keyboard"
  }
};

const elements = {
  html: document.documentElement,
  languageSelect: document.querySelector("#languageSelect"),
  setupPanel: document.querySelector("#setupPanel"),
  setupForm: document.querySelector("#setupForm"),
  runPanel: document.querySelector("#runPanel"),
  resultPanel: document.querySelector("#resultPanel"),
  runContext: document.querySelector("#runContext"),
  questionTitle: document.querySelector("#questionTitle"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  symbolDisplay: document.querySelector("#symbolDisplay"),
  feedback: document.querySelector("#feedback"),
  keyboardForm: document.querySelector("#keyboardForm"),
  answerInput: document.querySelector("#answerInput"),
  optionsGrid: document.querySelector("#optionsGrid"),
  hintPanel: document.querySelector("#hintPanel"),
  hintValue: document.querySelector("#hintValue"),
  hintButton: document.querySelector("#hintButton"),
  resetButton: document.querySelector("#resetButton"),
  scoreTitle: document.querySelector("#scoreTitle"),
  resultAlphabetValue: document.querySelector("#resultAlphabetValue"),
  resultModeValue: document.querySelector("#resultModeValue"),
  resultHintsValue: document.querySelector("#resultHintsValue"),
  repeatButton: document.querySelector("#repeatButton"),
  changeSettingsButton: document.querySelector("#changeSettingsButton")
};

loadData().then(() => {
  bindEvents();
  render();
});

async function loadData() {
  try {
    const [alphabetsResponse, optionsResponse] = await Promise.all([
      fetch("./benchmark-data/alphabets.json"),
      fetch("./benchmark-data/multiple-choice-options.json")
    ]);

    if (!alphabetsResponse.ok || !optionsResponse.ok) {
      throw new Error("Benchmark data request failed");
    }

    state.alphabets = await alphabetsResponse.json();
    state.optionSets = await optionsResponse.json();
  } catch (error) {
    document.querySelector("#app").innerHTML = `<section class="setup-panel"><h1>${translate(
      state.language,
      "loadingError"
    )}</h1></section>`;
    throw error;
  }
}

function bindEvents() {
  elements.languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    render();
  });

  elements.setupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(elements.setupForm);
    startRun({
      alphabetKey: form.get("alphabet"),
      mode: form.get("mode")
    });
  });

  elements.keyboardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleAnswer(elements.answerInput.value);
  });

  elements.hintButton.addEventListener("click", () => {
    const question = markHint(state.currentRun);
    elements.hintValue.textContent = translate(state.language, "hintText", {
      answer: question.codeword
    });
    renderCurrentQuestion();
  });

  elements.resetButton.addEventListener("click", () => {
    state.currentRun = null;
    showPanel("setup");
    render();
  });

  elements.repeatButton.addEventListener("click", () => {
    startRun(state.lastSettings);
  });

  elements.changeSettingsButton.addEventListener("click", () => {
    state.currentRun = null;
    showPanel("setup");
    render();
  });
}

function startRun(settings) {
  state.lastSettings = settings;
  state.currentRun = createRun({
    alphabetKey: settings.alphabetKey,
    mode: settings.mode,
    alphabets: state.alphabets,
    optionSets: state.optionSets
  });
  elements.answerInput.value = "";
  showPanel("run");
  render();
  if (settings.mode === "keyboard") {
    elements.answerInput.focus();
  }
}

function handleAnswer(answer) {
  const result = submitAnswer(state.currentRun, answer);
  if (!result.correct) {
    elements.feedback.textContent = translate(
      state.language,
      state.currentRun.mode === "keyboard" ? "wrongKeyboard" : "wrongSuggestion"
    );
    elements.feedback.classList.remove("success");
    return;
  }

  elements.feedback.textContent = translate(state.language, "correct");
  elements.feedback.classList.add("success");
  elements.answerInput.value = "";

  if (result.completed) {
    showResult();
    return;
  }

  renderCurrentQuestion();
  if (state.currentRun.mode === "keyboard") {
    elements.answerInput.focus();
  }
}

function render() {
  elements.html.lang = state.language;
  elements.languageSelect.value = state.language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(state.language, node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", translate(state.language, node.dataset.i18nAria));
  });

  if (state.currentRun?.completed) {
    renderResult();
  } else if (state.currentRun) {
    renderCurrentQuestion();
  }
}

function renderCurrentQuestion() {
  const run = state.currentRun;
  const question = getCurrentQuestion(run);
  const total = run.questions.length;
  const current = run.currentIndex + 1;

  elements.runContext.textContent = translate(state.language, "runContext", {
    alphabet: translate(state.language, `${run.alphabetKey}Alphabet`),
    mode: translate(state.language, `${run.mode}ModeShort`)
  });
  elements.questionTitle.textContent = translate(
    state.language,
    run.mode === "keyboard" ? "questionTitle" : "suggestionTitle"
  );
  elements.progressText.textContent = translate(state.language, "progress", { current, total });
  elements.progressBar.style.width = `${((current - 1) / total) * 100}%`;
  elements.symbolDisplay.textContent = question.symbol;

  elements.hintPanel.classList.toggle("hidden", !question.hinted);
  if (question.hinted) {
    elements.hintValue.textContent = translate(state.language, "hintText", {
      answer: question.codeword
    });
  }

  elements.keyboardForm.classList.toggle("hidden", run.mode !== "keyboard");
  elements.optionsGrid.classList.toggle("hidden", run.mode !== "suggestion");

  if (run.mode === "suggestion") {
    renderOptions(question);
  }
}

function renderOptions(question) {
  elements.optionsGrid.replaceChildren(
    ...question.options.map((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => handleAnswer(option));
      return button;
    })
  );
}

function showResult() {
  elements.progressBar.style.width = "100%";
  showPanel("result");
  renderResult();
}

function renderResult() {
  const run = state.currentRun;
  const stats = getRunStats(run);
  elements.scoreTitle.textContent = translate(state.language, "scoreTitle", {
    score: stats.scorePercent
  });
  elements.resultAlphabetValue.textContent = translate(state.language, `${run.alphabetKey}Alphabet`);
  elements.resultModeValue.textContent = translate(state.language, `${run.mode}Mode`);
  elements.resultHintsValue.textContent = translate(state.language, "hintsValue", {
    hinted: stats.hintedQuestions,
    total: stats.totalQuestions
  });
}

function showPanel(panelName) {
  elements.setupPanel.classList.toggle("hidden", panelName !== "setup");
  elements.runPanel.classList.toggle("hidden", panelName !== "run");
  elements.resultPanel.classList.toggle("hidden", panelName !== "result");
  elements.feedback.textContent = "";
  elements.feedback.classList.remove("success");
}
