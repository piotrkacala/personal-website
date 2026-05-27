/* ========================================================================
   Phonetic Benchmark App — DeepSeek V4 Pro implementation
   Canonical data: ../benchmark-data/alphabets.json
                   ../benchmark-data/multiple-choice-options.json
   ======================================================================== */

// ── i18n strings ────────────────────────────────────────────────────────
const I18N = {
  pl: {
    appTitle: "Trener Fonetyczny",
    setupHeading: "Rozpocznij sesję treningową",
    chooseAlphabet: "Wybierz alfabet",
    polishAlphabet: "Polski",
    natoAlphabet: "NATO",
    chooseMode: "Wybierz tryb",
    modeKeyboard: "Klawiatura",
    modeSuggestion: "Sugestie (4 opcje)",
    startRun: "Rozpocznij",
    submit: "Sprawdź",
    showHint: "Pokaż podpowiedź",
    typeAnswer: "Wpisz odpowiedź…",
    wrongAnswer: "Nieprawidłowo, spróbuj ponownie.",
    hintRevealed: "Podpowiedź została wyświetlona. Wprowadź poprawną odpowiedź.",
    progress: "Pytanie {current} z {total}",
    resultHeading: "Sesja zakończona",
    resultAlphabet: "Alfabet:",
    resultMode: "Tryb:",
    resultQuestions: "Pytań:",
    resultHinted: "Z podpowiedzią:",
    resultClean: "Czystych:",
    newRun: "Nowa sesja",
    polishLabel: "Polski",
    natoLabel: "NATO",
    keyboardLabel: "Klawiatura",
    suggestionLabel: "Sugestie",
    loading: "Ładowanie…",
    loadError: "Nie udało się załadować danych. Odśwież stronę.",
  },
  en: {
    appTitle: "Phonetic Trainer",
    setupHeading: "Start a practice run",
    chooseAlphabet: "Choose alphabet",
    polishAlphabet: "Polish",
    natoAlphabet: "NATO",
    chooseMode: "Choose mode",
    modeKeyboard: "Keyboard",
    modeSuggestion: "Suggestion (4 options)",
    startRun: "Start Run",
    submit: "Submit",
    showHint: "Show Hint",
    typeAnswer: "Type answer…",
    wrongAnswer: "Incorrect, try again.",
    hintRevealed: "Hint revealed. Enter the correct answer.",
    progress: "Question {current} of {total}",
    resultHeading: "Run Complete",
    resultAlphabet: "Alphabet:",
    resultMode: "Mode:",
    resultQuestions: "Questions:",
    resultHinted: "Hinted:",
    resultClean: "Clean:",
    newRun: "New Run",
    polishLabel: "Polish",
    natoLabel: "NATO",
    keyboardLabel: "Keyboard",
    suggestionLabel: "Suggestion",
    loading: "Loading…",
    loadError: "Failed to load data. Refresh the page.",
  },
};

// ── DOM references ──────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);

const screens = {
  setup: $("#setup"),
  exercise: $("#exercise"),
  result: $("#result"),
};
const elLangPl = $("#lang-pl");
const elLangEn = $("#lang-en");
const elStartBtn = $("#startBtn");
const elSymbol = $("#symbolDisplay");
const elKeyboardInput = $("#keyboardInput");
const elSuggestionInput = $("#suggestionInput");
const elAnswerInput = $("#answerInput");
const elSubmit = $("#submitAnswer");
const elOptionButtons = $("#optionButtons");
const elFeedback = $("#feedback");
const elHintBtn = $("#hintBtn");
const elHintText = $("#hintText");
const elProgress = $("#progress");
const elRunAlphabet = $("#runAlphabet");
const elRunMode = $("#runMode");
const elScoreCircle = $("#scoreCircle");
const elResultAlphabet = $("#resultAlphabet");
const elResultMode = $("#resultMode");
const elResultTotal = $("#resultTotal");
const elResultHinted = $("#resultHinted");
const elResultClean = $("#resultClean");
const elRestartBtn = $("#restartBtn");

// ── State ───────────────────────────────────────────────────────────────
let lang = "en";
let alphabets = null; // { polish: [...], nato: [...] }
let optionsData = null; // { polish: { symbol: [...] }, nato: { symbol: [...] } }

let run = {
  active: false,
  alphabetKey: null, // "polish" | "nato"
  mode: null, // "keyboard" | "suggestion"
  queue: [], // shuffled symbol indices
  currentIndex: 0, // position within queue
  hinted: new Set(), // Set of symbol indices that were hinted
  hintUsedThisQuestion: false,
  hintVisible: false,
};

// ── Helpers ─────────────────────────────────────────────────────────────
function t(key, vars) {
  let s = I18N[lang][key] || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, String(v));
    }
  }
  return s;
}

function applyI18n() {
  document.documentElement.lang = lang;
  document.title = t("appTitle");

  // Text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  // Template content (progress line)
  document.querySelectorAll("[data-i18n-template]").forEach((el) => {
    const key = el.dataset.i18nTemplate;
    if (!key) return;
    if (run.active) {
      const alphabet = alphabets[run.alphabetKey];
      el.textContent = t(key, {
        current: run.currentIndex + 1,
        total: alphabet.length,
      });
    }
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key);
  });
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

// ── Data loading ────────────────────────────────────────────────────────
async function loadData() {
  try {
    const [alphaRes, optRes] = await Promise.all([
      fetch("./benchmark-data/alphabets.json"),
      fetch("./benchmark-data/multiple-choice-options.json"),
    ]);
    if (!alphaRes.ok || !optRes.ok) throw new Error("Fetch failed");
    alphabets = await alphaRes.json();
    optionsData = await optRes.json();
  } catch (err) {
    console.error("Data load error:", err);
    alert(t("loadError"));
    throw err;
  }
}

// ── Scoring ─────────────────────────────────────────────────────────────
function computeScore(alphabetKey, hintedSet) {
  const total = alphabets[alphabetKey].length;
  const hinted = hintedSet.size;
  const clean = total - hinted;
  const pct = Math.round((clean / total) * 100);
  return { total, hinted, clean, pct };
}

// ── Normalization ───────────────────────────────────────────────────────
// Case-insensitive, trim whitespace, preserve diacritics
function normalizeAnswer(raw) {
  return raw.trim();
}

function answersMatch(input, expected) {
  // Case-insensitive comparison; diacritics preserved (localeCompare to handle
  // Polish diacritics safely; but simple toUpperCase/toLowerCase comparison
  // also preserves diacritics in JS since they are part of the character).
  // To be safe, use direct upper-case comparison that keeps diacritics.
  return (
    normalizeAnswer(input).toUpperCase() === expected.trim().toUpperCase()
  );
}

// ── Run management ──────────────────────────────────────────────────────
function startRun(alphabetKey, mode) {
  const alphabet = alphabets[alphabetKey];
  const indices = alphabet.map((_, i) => i);
  const shuffled = shuffle(indices);

  run = {
    active: true,
    alphabetKey,
    mode,
    queue: shuffled,
    currentIndex: 0,
    hinted: new Set(),
    hintUsedThisQuestion: false,
    hintVisible: false,
  };

  showScreen("exercise");
  elRunAlphabet.textContent = t(alphabetKey + "Label");
  elRunMode.textContent = mode === "keyboard" ? t("keyboardLabel") : t("suggestionLabel");

  elHintText.classList.add("hidden");
  elHintText.textContent = "";
  elHintBtn.disabled = false;

  renderQuestion();
}

function renderQuestion() {
  const alphabet = alphabets[run.alphabetKey];
  const symIdx = run.queue[run.currentIndex];
  const entry = alphabet[symIdx];
  const sym = entry.symbol;

  // Reset per-question state
  run.hintUsedThisQuestion = false;
  run.hintVisible = false;
  elHintText.classList.add("hidden");
  elHintText.textContent = "";
  elHintBtn.disabled = false;
  elFeedback.classList.add("hidden");
  elFeedback.textContent = "";
  elFeedback.className = "feedback hidden";

  // Symbol display
  elSymbol.textContent = sym;

  // Progress
  applyI18n();

  // Show appropriate input mode
  if (run.mode === "keyboard") {
    elKeyboardInput.classList.remove("hidden");
    elSuggestionInput.classList.add("hidden");
    elAnswerInput.value = "";
    elAnswerInput.focus();
  } else {
    elKeyboardInput.classList.add("hidden");
    elSuggestionInput.classList.remove("hidden");
    renderOptionButtons(sym);
  }
}

function renderOptionButtons(sym) {
  const opts = optionsData[run.alphabetKey][sym];
  if (!opts) {
    console.error("Missing options data for symbol:", sym);
    return;
  }

  // Find the correct codeword
  const alphabet = alphabets[run.alphabetKey];
  const symIdx = run.queue[run.currentIndex];
  const correct = alphabet[symIdx].codeword;

  // Shuffle display order
  const shuffled = shuffle(opts);

  elOptionButtons.innerHTML = "";
  shuffled.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.dataset.value = opt;
    btn.addEventListener("click", () => handleSuggestionClick(opt, correct, btn));
    elOptionButtons.appendChild(btn);
  });
}

function handleSuggestionClick(selected, correct, btnEl) {
  if (!run.active) return;

  if (selected === correct) {
    // Disable all option buttons after correct answer
    document.querySelectorAll(".opt-btn").forEach((b) => (b.disabled = true));
    advanceQuestion();
  } else {
    showFeedback("error");
  }
}

function showFeedback(type) {
  elFeedback.classList.remove("hidden");
  elFeedback.className = "feedback " + type;
  if (type === "error") {
    elFeedback.textContent = t("wrongAnswer");
  }
}

// ── Hint ────────────────────────────────────────────────────────────────
function showHint() {
  if (!run.active) return;

  const alphabet = alphabets[run.alphabetKey];
  const symIdx = run.queue[run.currentIndex];
  const correct = alphabet[symIdx].codeword;

  run.hintUsedThisQuestion = true;
  run.hintVisible = true;
  run.hinted.add(symIdx);

  elHintText.textContent = correct;
  elHintText.classList.remove("hidden");
  elHintBtn.disabled = true;

  // Show feedback about hint
  elFeedback.classList.remove("hidden");
  elFeedback.className = "feedback";
  elFeedback.textContent = t("hintRevealed");
}

// ── Answer checking ─────────────────────────────────────────────────────
function checkKeyboardAnswer() {
  if (!run.active) return;

  const alphabet = alphabets[run.alphabetKey];
  const symIdx = run.queue[run.currentIndex];
  const correct = alphabet[symIdx].codeword;
  const input = elAnswerInput.value;

  if (answersMatch(input, correct)) {
    advanceQuestion();
  } else {
    showFeedback("error");
  }
}

function advanceQuestion() {
  if (!run.active) return;

  run.currentIndex++;

  const alphabet = alphabets[run.alphabetKey];
  if (run.currentIndex >= alphabet.length) {
    finishRun();
  } else {
    renderQuestion();
  }
}

// ── Finish ──────────────────────────────────────────────────────────────
function finishRun() {
  run.active = false;

  const score = computeScore(run.alphabetKey, run.hinted);

  showScreen("result");

  // Score circle
  elScoreCircle.textContent = score.pct + "%";
  elScoreCircle.className = "score-circle";
  if (score.pct === 100) {
    elScoreCircle.classList.add("perfect");
  } else if (score.pct < 50) {
    elScoreCircle.classList.add("low");
  }

  // Details
  elResultAlphabet.textContent = t(run.alphabetKey + "Label");
  elResultMode.textContent =
    run.mode === "keyboard" ? t("keyboardLabel") : t("suggestionLabel");
  elResultTotal.textContent = score.total;
  elResultHinted.textContent = score.hinted;
  elResultClean.textContent = score.clean;

  // Update i18n labels
  applyI18n();
}

function resetToSetup() {
  run.active = false;
  run.hinted = new Set();
  run.hintUsedThisQuestion = false;
  run.hintVisible = false;

  elAnswerInput.value = "";
  elHintText.classList.add("hidden");
  elHintText.textContent = "";
  elHintBtn.disabled = false;
  elFeedback.classList.add("hidden");

  showScreen("setup");
  applyI18n();
}

// ── Language switching ──────────────────────────────────────────────────
function setLang(newLang) {
  if (lang === newLang) return;

  // Decision: Language switching is NOT allowed during an active run.
  // This keeps the run experience consistent.
  if (run.active) return;

  lang = newLang;
  elLangPl.classList.toggle("active", lang === "pl");
  elLangEn.classList.toggle("active", lang === "en");
  applyI18n();
}

// ── Event bindings ──────────────────────────────────────────────────────
elLangPl.addEventListener("click", () => setLang("pl"));
elLangEn.addEventListener("click", () => setLang("en"));

elStartBtn.addEventListener("click", () => {
  const alphabetRadio = document.querySelector('input[name="alphabet"]:checked');
  const modeRadio = document.querySelector('input[name="mode"]:checked');
  const alphabetKey = alphabetRadio.value;
  const mode = modeRadio.value;
  startRun(alphabetKey, mode);
});

elSubmit.addEventListener("click", checkKeyboardAnswer);
elAnswerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkKeyboardAnswer();
});

elHintBtn.addEventListener("click", showHint);

elRestartBtn.addEventListener("click", resetToSetup);

// ── Init ────────────────────────────────────────────────────────────────
async function init() {
  elLangEn.classList.add("active");
  applyI18n();
  showScreen("setup");

  try {
    await loadData();
  } catch {
    // alert already shown
  }
}

init();
