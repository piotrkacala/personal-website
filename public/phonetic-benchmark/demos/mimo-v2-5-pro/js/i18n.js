// i18n.js — Interface language support

const translations = {
  en: {
    setupTitle: "Phonetic Trainer",
    labelLanguage: "Interface Language",
    labelAlphabet: "Phonetic Alphabet",
    labelMode: "Exercise Mode",
    modeKeyboard: "Keyboard",
    modeSuggestion: "Multiple Choice",
    btnStart: "Start",
    btnHint: "Hint",
    btnSubmit: "Submit",
    progressText: "Question {current} of {total}",
    feedbackCorrect: "Correct!",
    feedbackWrong: "Wrong, try again.",
    resultTitle: "Run Complete!",
    resultAlphabet: "Alphabet: {alphabet}",
    resultMode: "Mode: {mode}",
    resultScore: "Score: {score}%",
    btnRestart: "Practice Again",
    alphabetNato: "NATO",
    alphabetPolish: "Polish",
  },
  pl: {
    setupTitle: "Trener Fonetyczny",
    labelLanguage: "Język Interfejsu",
    labelAlphabet: "Alfabet Fonetyczny",
    labelMode: "Tryb Ćwiczenia",
    modeKeyboard: "Klawiatura",
    modeSuggestion: "Wielokrotny Wybór",
    btnStart: "Start",
    btnHint: "Podpowiedź",
    btnSubmit: "Zatwierdź",
    progressText: "Pytanie {current} z {total}",
    feedbackCorrect: "Poprawnie!",
    feedbackWrong: "Błędnie, spróbuj ponownie.",
    resultTitle: "Koniec Serii!",
    resultAlphabet: "Alfabet: {alphabet}",
    resultMode: "Tryb: {mode}",
    resultScore: "Wynik: {score}%",
    btnRestart: "Ćwicz Ponownie",
    alphabetNato: "NATO",
    alphabetPolish: "Polski",
  },
};

let currentLang = "en";

/**
 * Get a translated string for the current language.
 * @param {string} key
 * @param {Object} [params]
 * @returns {string}
 */
export function t(key, params = {}) {
  let str = translations[currentLang]?.[key] ?? translations.en[key] ?? key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}

/**
 * Get the current interface language code.
 * @returns {string}
 */
export function getLang() {
  return currentLang;
}

/**
 * Set the current interface language and update all i18n-labeled DOM elements.
 * @param {string} lang
 */
export function setLang(lang) {
  if (translations[lang]) {
    currentLang = lang;
  }
  applyTranslations();
}

/**
 * Apply translations to all DOM elements with data-i18n attribute,
 * plus known element IDs.
 */
export function applyTranslations() {
  // data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  // Known elements
  const mapping = {
    "setup-title": "setupTitle",
    "label-language": "labelLanguage",
    "label-alphabet": "labelAlphabet",
    "label-mode": "labelMode",
    "btn-start": "btnStart",
    "btn-hint": "btnHint",
    "btn-submit": "btnSubmit",
    "result-title": "resultTitle",
    "btn-restart": "btnRestart",
  };

  for (const [id, key] of Object.entries(mapping)) {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  }

  // Update mode option labels
  const modeSelect = document.getElementById("select-mode");
  if (modeSelect) {
    for (const opt of modeSelect.options) {
      const key = opt.getAttribute("data-i18n");
      if (key) opt.textContent = t(key);
    }
  }
}
