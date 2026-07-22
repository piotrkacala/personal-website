// View layer: DOM rendering and event wiring.
// All product logic lives in ./core/*.js; this module only translates between
// the DOM and the pure run state machine.

import { translate, LANGUAGES, DEFAULT_LANGUAGE } from './i18n.js';
import { createDefaultRng } from './core/random.js';
import {
  createRun,
  getCurrentQuestion,
  useHint,
  submitKeyboardAnswer,
  submitSuggestionChoice,
  getScore,
} from './core/run.js';

const ALPHABET_KEYS = ['polish', 'nato'];
const MODE_KEYS = ['keyboard', 'suggestion'];

const state = {
  lang: DEFAULT_LANGUAGE,
  screen: 'setup', // 'setup' | 'run' | 'result'
  setup: { alphabetKey: 'polish', mode: 'keyboard' },
  run: null,
  feedback: null, // { kind: 'correct' | 'wrong', key: string }
  data: null, // { alphabets, options }
};

const app = document.getElementById('app');
const siteTitle = document.getElementById('site-title');
const langSwitch = document.getElementById('lang-switch');

function t(key, params) {
  return translate(state.lang, key, params);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function alphabetLabel(alphabetKey) {
  return t(alphabetKey === 'polish' ? 'alphabetPolish' : 'alphabetNato');
}

function modeLabel(mode) {
  return t(mode === 'keyboard' ? 'modeKeyboard' : 'modeSuggestion');
}

async function loadData() {
  const [alphabetsResponse, optionsResponse] = await Promise.all([
    fetch('./benchmark-data/alphabets.json'),
    fetch('./benchmark-data/multiple-choice-options.json'),
  ]);
  if (!alphabetsResponse.ok || !optionsResponse.ok) {
    throw new Error('failed to load benchmark data');
  }
  const alphabets = await alphabetsResponse.json();
  const options = await optionsResponse.json();
  return { alphabets, options };
}

function startRun() {
  const { alphabetKey, mode } = state.setup;
  state.run = createRun({
    alphabetKey,
    mode,
    entries: state.data.alphabets[alphabetKey],
    optionSets: state.data.options[alphabetKey],
    rng: createDefaultRng(),
  });
  state.feedback = null;
  state.screen = 'run';
  render();
}

function exitToSetup() {
  state.run = null;
  state.feedback = null;
  state.screen = 'setup';
  render();
}

function render() {
  document.documentElement.lang = state.lang;
  siteTitle.textContent = t('appTitle');
  langSwitch.setAttribute('aria-label', t('languageSwitcherLabel'));
  for (const button of langSwitch.querySelectorAll('button[data-lang]')) {
    button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang));
  }

  if (state.screen === 'setup') {
    renderSetup();
  } else if (state.screen === 'run') {
    renderRun();
  } else {
    renderResult();
  }
}

function renderSetup() {
  const alphabetChoices = ALPHABET_KEYS.map(
    (key) => `
      <label class="choice">
        <input type="radio" name="alphabet" value="${key}" ${state.setup.alphabetKey === key ? 'checked' : ''} />
        <span><span class="choice-title">${escapeHtml(alphabetLabel(key))}</span></span>
      </label>`,
  ).join('');

  const modeChoices = MODE_KEYS.map(
    (key) => `
      <label class="choice">
        <input type="radio" name="mode" value="${key}" ${state.setup.mode === key ? 'checked' : ''} />
        <span>
          <span class="choice-title">${escapeHtml(modeLabel(key))}</span>
          <span class="choice-desc">${escapeHtml(t(key === 'keyboard' ? 'modeKeyboardDesc' : 'modeSuggestionDesc'))}</span>
        </span>
      </label>`,
  ).join('');

  app.innerHTML = `
    <section class="card" aria-labelledby="setup-heading">
      <h1 id="setup-heading">${escapeHtml(t('setupHeading'))}</h1>
      <form id="setup-form">
        <fieldset class="fieldset">
          <legend>${escapeHtml(t('alphabetLabel'))}</legend>
          <div class="choice-list">${alphabetChoices}</div>
        </fieldset>
        <fieldset class="fieldset">
          <legend>${escapeHtml(t('modeLabel'))}</legend>
          <div class="choice-list">${modeChoices}</div>
        </fieldset>
        <button type="submit" class="primary-button">${escapeHtml(t('startRun'))}</button>
      </form>
    </section>`;

  const form = document.getElementById('setup-form');
  form.addEventListener('change', () => {
    state.setup.alphabetKey = form.elements.alphabet.value;
    state.setup.mode = form.elements.mode.value;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.setup.alphabetKey = form.elements.alphabet.value;
    state.setup.mode = form.elements.mode.value;
    startRun();
  });
}

function feedbackHtml() {
  if (!state.feedback) {
    return '<p class="feedback" aria-live="polite"></p>';
  }
  const className = state.feedback.kind === 'correct' ? 'is-correct' : 'is-wrong';
  return `<p class="feedback ${className}" aria-live="polite">${escapeHtml(t(state.feedback.key))}</p>`;
}

function renderRun() {
  const question = getCurrentQuestion(state.run);
  if (!question) {
    state.screen = 'result';
    render();
    return;
  }

  const progressPercent = Math.round((question.index / question.total) * 100);
  const hintBox = question.hintVisible
    ? `<div class="hint-box" role="note"><span class="hint-label">${escapeHtml(t('hintLabel'))}:</span>${escapeHtml(question.codeword)}</div>`
    : '';
  const hintButton = question.hintVisible
    ? `<button type="button" class="secondary-button" id="hint-button" disabled>${escapeHtml(t('hintUsedButton'))}</button>`
    : `<button type="button" class="secondary-button" id="hint-button">${escapeHtml(t('hintButton'))}</button>`;

  const answerArea =
    state.run.mode === 'keyboard'
      ? `
      <form class="answer-form" id="answer-form" autocomplete="off">
        <div class="answer-input-wrap">
          <label for="answer-input">${escapeHtml(t('answerLabel'))}</label>
          <input
            id="answer-input"
            class="answer-input"
            name="answer"
            type="text"
            placeholder="${escapeHtml(t('answerPlaceholder'))}"
            autocomplete="off"
            autocapitalize="characters"
            spellcheck="false"
          />
        </div>
        <button type="submit" class="primary-button">${escapeHtml(t('submit'))}</button>
      </form>`
      : `
      <div class="options-grid" role="group" aria-label="${escapeHtml(t('modeSuggestion'))}">
        ${question.options
          .map(
            (option) => `
          <button
            type="button"
            class="option-button${question.wrongChoices.has(option) ? ' is-wrong' : ''}"
            data-option="${escapeHtml(option)}"
            ${question.wrongChoices.has(option) ? 'disabled' : ''}
          >${escapeHtml(option)}</button>`,
          )
          .join('')}
      </div>`;

  app.innerHTML = `
    <section aria-labelledby="run-heading">
      <div class="run-topbar">
        <div class="progress" role="status">
          <span class="progress-text" id="run-heading">${escapeHtml(
            t('progressText', { current: question.index + 1, total: question.total }),
          )}</span>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
        </div>
        <div class="run-actions">
          <button type="button" class="secondary-button" id="restart-button">${escapeHtml(t('restartRun'))}</button>
          <button type="button" class="secondary-button" id="exit-button">${escapeHtml(t('exitRun'))}</button>
        </div>
      </div>
      <div class="card">
        <p class="symbol-display" aria-label="${escapeHtml(question.symbol)}">${escapeHtml(question.symbol)}</p>
        <p class="symbol-prompt">${escapeHtml(t('symbolPrompt'))}</p>
        ${answerArea}
        ${feedbackHtml()}
        <div class="hint-area">
          ${hintButton}
          ${hintBox}
        </div>
      </div>
    </section>`;

  document.getElementById('restart-button').addEventListener('click', () => {
    if (window.confirm(t('confirmRestart'))) {
      startRun();
    }
  });
  document.getElementById('exit-button').addEventListener('click', () => {
    if (window.confirm(t('confirmExit'))) {
      exitToSetup();
    }
  });
  document.getElementById('hint-button')?.addEventListener('click', () => {
    useHint(state.run);
    render();
  });

  if (state.run.mode === 'keyboard') {
    const form = document.getElementById('answer-form');
    const input = document.getElementById('answer-input');
    input.focus();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const result = submitKeyboardAnswer(state.run, input.value);
      state.feedback = result.correct
        ? null
        : { kind: 'wrong', key: 'wrongFeedback' };
      if (state.run.status === 'completed') {
        state.screen = 'result';
      }
      render();
    });
  } else {
    for (const button of app.querySelectorAll('.option-button')) {
      button.addEventListener('click', () => {
        const result = submitSuggestionChoice(state.run, button.dataset.option);
        state.feedback = result.correct
          ? null
          : { kind: 'wrong', key: 'wrongOptionFeedback' };
        if (state.run.status === 'completed') {
          state.screen = 'result';
        }
        render();
      });
    }
  }
}

function renderResult() {
  const score = getScore(state.run);
  app.innerHTML = `
    <section class="card" aria-labelledby="result-heading">
      <h1 id="result-heading">${escapeHtml(t('runComplete'))}</h1>
      <p class="result-score" aria-label="${escapeHtml(t('finalScore', { score: score.percent }))}">${score.percent}%</p>
      <div class="result-lines">
        <span>${escapeHtml(t('finalScore', { score: score.percent }))}</span>
        <span>${escapeHtml(
          t('resultSummary', {
            alphabet: alphabetLabel(state.run.alphabetKey),
            mode: modeLabel(state.run.mode),
          }),
        )}</span>
        <span>${escapeHtml(
          t('resultBreakdown', { clean: score.clean, total: score.total, hinted: score.hinted }),
        )}</span>
      </div>
      <div class="result-actions">
        <button type="button" class="primary-button" id="play-again-button">${escapeHtml(t('playAgain'))}</button>
        <button type="button" class="secondary-button" id="change-setup-button">${escapeHtml(t('changeSetup'))}</button>
      </div>
    </section>`;

  document.getElementById('play-again-button').addEventListener('click', () => {
    startRun();
  });
  document.getElementById('change-setup-button').addEventListener('click', () => {
    exitToSetup();
  });
}

langSwitch.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-lang]');
  if (!button) {
    return;
  }
  const nextLang = button.dataset.lang;
  if (!LANGUAGES.includes(nextLang) || nextLang === state.lang) {
    return;
  }
  // Decision: interface-language switching is allowed at any time, including
  // during an active run. Only presentation strings change; the run state
  // (current symbol, progress, hint visibility, score) is left untouched.
  state.lang = nextLang;
  render();
});

loadData()
  .then((data) => {
    state.data = data;
    render();
  })
  .catch(() => {
    app.innerHTML = `<div class="error-box" role="alert">${escapeHtml(t('loadingError'))}</div>`;
  });
