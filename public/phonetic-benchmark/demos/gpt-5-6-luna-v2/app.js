import { createQuestions, isCorrectAnswer, scorePercent } from './src/game.mjs';

const IMPLEMENTATION_DATE = '2026-07-12';
const MODEL_ATTRIBUTION = 'Codex (GPT-5)';
const state = {
  language: 'en',
  alphabet: 'polish',
  mode: 'keyboard',
  screen: 'setup',
  questions: [],
  questionIndex: 0,
  hinted: new Set(),
  hintVisible: false,
  feedback: '',
  lastRun: null,
  data: null
};

const copy = {
  en: {
    headerKicker: 'PHONETIC BENCHMARK · V2', footerCredit: 'Phonetic Benchmark by Piotr Kacała · piotrkacala.pl',
    setupEyebrow: 'A focused practice ritual', setupTitle: 'Turn symbols into clear signals.',
    setupLead: 'Train the phonetic alphabet one letter at a time. Choose your deck, choose your pace, and make every answer count.',
    alphabetLabel: '01 / Choose an alphabet', polish: 'Polish', nato: 'NATO', polishMeta: '34 symbols · Polish codewords', natoMeta: '26 symbols · International standard',
    modeLabel: '02 / Choose your response', keyboard: 'Keyboard', keyboardMeta: 'Type the codeword yourself', suggestion: 'Suggestions', suggestionMeta: 'Choose from four fixed options',
    start: 'Start practice', setupNote: 'One complete deck · no time limit · hints affect the final score',
    guideTitle: 'How the drill works', guideOneTitle: 'See one symbol', guideOne: 'A randomized deck keeps each round fresh.', guideTwoTitle: 'Answer cleanly', guideTwo: 'Type or choose the matching codeword.', guideThreeTitle: 'Build precision', guideThree: 'Hints are available, but lower your clean score.',
    runLabel: 'Practice in progress', questionOf: 'Question {current} of {total}', modeKeyboard: 'Keyboard mode', modeSuggestion: 'Suggestion mode',
    hint: 'Reveal a hint', hintShown: 'Hint revealed', hintMessage: 'The answer is {answer}. Enter or select it to continue.',
    answerPlaceholder: 'Type the codeword…', submit: 'Check answer', wrongKeyboard: 'Not quite — keep the same symbol and try again.', wrongSuggestion: 'Not quite — choose another option.', correct: 'Correct. Next signal loading…', exit: 'Exit run', exitConfirm: 'Exit this run? Your progress will be discarded.', lockedLanguage: 'Language is locked during a run',
    resultEyebrow: 'Signal received', resultTitle: 'Deck complete.', resultLead: 'You made it through the full {alphabet} deck in {mode}.', scoreLabel: 'Clean score', hintedLabel: 'Hints used', completedLabel: 'Completed', resultNote: 'A clean answer is one completed without revealing its codeword.', again: 'Practice again', changeSettings: 'Change settings',
    yes: 'Yes', no: 'No', footerDate: IMPLEMENTATION_DATE
  },
  pl: {
    headerKicker: 'PHONETIC BENCHMARK · V2', footerCredit: 'Phonetic Benchmark — Piotr Kacała · piotrkacala.pl',
    setupEyebrow: 'Skupiona sesja treningowa', setupTitle: 'Zamień symbole w wyraźne sygnały.',
    setupLead: 'Ćwicz alfabet fonetyczny, litera po literze. Wybierz zestaw, tempo i spraw, by każda odpowiedź miała znaczenie.',
    alphabetLabel: '01 / Wybierz alfabet', polish: 'Polski', nato: 'NATO', polishMeta: '34 symbole · polskie hasła', natoMeta: '26 symboli · standard międzynarodowy',
    modeLabel: '02 / Wybierz sposób odpowiedzi', keyboard: 'Klawiatura', keyboardMeta: 'Wpisz hasło samodzielnie', suggestion: 'Podpowiedzi', suggestionMeta: 'Wybierz jedną z czterech opcji',
    start: 'Rozpocznij trening', setupNote: 'Pełny zestaw · bez limitu czasu · podpowiedzi wpływają na wynik',
    guideTitle: 'Jak działa trening', guideOneTitle: 'Zobacz symbol', guideOne: 'Losowa kolejność sprawia, że każda runda jest świeża.', guideTwoTitle: 'Odpowiedz uważnie', guideTwo: 'Wpisz lub wybierz pasujące hasło.', guideThreeTitle: 'Buduj precyzję', guideThree: 'Podpowiedzi są dostępne, ale obniżają czysty wynik.',
    runLabel: 'Trening w toku', questionOf: 'Pytanie {current} z {total}', modeKeyboard: 'Tryb klawiatury', modeSuggestion: 'Tryb podpowiedzi',
    hint: 'Pokaż podpowiedź', hintShown: 'Podpowiedź pokazana', hintMessage: 'Prawidłowa odpowiedź to {answer}. Wpisz ją lub wybierz, aby przejść dalej.',
    answerPlaceholder: 'Wpisz hasło…', submit: 'Sprawdź odpowiedź', wrongKeyboard: 'Jeszcze nie — zostań przy tym symbolu i spróbuj ponownie.', wrongSuggestion: 'Jeszcze nie — wybierz inną opcję.', correct: 'Dobrze. Ładuję następny sygnał…', exit: 'Zakończ sesję', exitConfirm: 'Zakończyć sesję? Postęp zostanie odrzucony.', lockedLanguage: 'Język jest zablokowany podczas sesji',
    resultEyebrow: 'Sygnał odebrany', resultTitle: 'Zestaw ukończony.', resultLead: 'Przejdź przez cały zestaw {alphabet} w trybie {mode}.', scoreLabel: 'Czysty wynik', hintedLabel: 'Użyte podpowiedzi', completedLabel: 'Ukończone', resultNote: 'Czysta odpowiedź to taka, przy której nie odsłonięto hasła.', again: 'Trenuj ponownie', changeSettings: 'Zmień ustawienia',
    yes: 'Tak', no: 'Nie', footerDate: IMPLEMENTATION_DATE
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), copy[state.language][key] ?? key);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const alphabetLabel = () => state.alphabet === 'polish' ? t('polish') : t('nato');
const modeLabel = () => state.mode === 'keyboard' ? t('modeKeyboard') : t('modeSuggestion');
const currentQuestion = () => state.questions[state.questionIndex];

function announce(message) {
  $('#live-region').textContent = message;
}

function setLanguage(language) {
  if (state.screen === 'run') return;
  state.language = language;
  document.documentElement.lang = language;
  render();
}

function render() {
  const languageButtons = $$('.language-button');
  $('.language-picker')?.setAttribute('aria-label', state.language === 'pl' ? 'Język interfejsu' : 'Interface language');
  languageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.language === state.language);
    button.disabled = state.screen === 'run';
    button.title = state.screen === 'run' ? t('lockedLanguage') : '';
  });
  if (state.screen === 'setup') renderSetup();
  if (state.screen === 'run') renderRun();
  if (state.screen === 'result') renderResult();
}

function renderSetup() {
  $('#app').innerHTML = `
    <section class="setup-grid page-enter" aria-labelledby="setup-title">
      <div class="setup-intro">
        <p class="eyebrow">${t('setupEyebrow')}</p>
        <h1 id="setup-title">${t('setupTitle')}</h1>
        <p class="lede">${t('setupLead')}</p>
        <div class="intro-rule"><span></span><span></span><span></span></div>
      </div>
      <div class="setup-panel panel">
        <div class="step-block">
          <p class="section-label">${t('alphabetLabel')}</p>
          <div class="choice-grid alphabet-choices" role="radiogroup" aria-label="${t('alphabetLabel')}">
            ${choiceCard('polish', 'AĄ', t('polish'), t('polishMeta'), 'flag-pl')}
            ${choiceCard('nato', 'N', t('nato'), t('natoMeta'), 'flag-nato')}
          </div>
        </div>
        <div class="step-block">
          <p class="section-label">${t('modeLabel')}</p>
          <div class="choice-grid mode-choices" role="radiogroup" aria-label="${t('modeLabel')}">
            ${choiceCard('keyboard', '⌨', t('keyboard'), t('keyboardMeta'), 'mode-symbol')}
            ${choiceCard('suggestion', '☷', t('suggestion'), t('suggestionMeta'), 'mode-symbol')}
          </div>
        </div>
        <button class="primary-button start-button" data-action="start">${t('start')} <span aria-hidden="true">↗</span></button>
        <p class="panel-note"><span class="note-mark">✦</span>${t('setupNote')}</p>
      </div>
      <aside class="guide-panel">
        <p class="section-label">${t('guideTitle')}</p>
        <div class="guide-list">
          ${guideItem('01', t('guideOneTitle'), t('guideOne'))}
          ${guideItem('02', t('guideTwoTitle'), t('guideTwo'))}
          ${guideItem('03', t('guideThreeTitle'), t('guideThree'))}
        </div>
      </aside>
    </section>`;
  bindSetupEvents();
}

function choiceCard(value, symbol, title, meta, extraClass) {
  const selected = (value === state.alphabet || value === state.mode);
  return `<button type="button" class="choice-card ${selected ? 'is-selected' : ''}" data-choice="${value}" role="radio" aria-checked="${selected}">
    <span class="choice-icon ${extraClass}">${symbol}</span><span class="choice-copy"><strong>${title}</strong><small>${meta}</small></span><span class="choice-check" aria-hidden="true">${selected ? '✓' : ''}</span>
  </button>`;
}

function guideItem(number, title, description) {
  return `<div class="guide-item"><span class="guide-number">${number}</span><div><strong>${title}</strong><p>${description}</p></div></div>`;
}

function bindSetupEvents() {
  $$('[data-choice]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.choice === 'keyboard' || button.dataset.choice === 'suggestion') state.mode = button.dataset.choice;
    else state.alphabet = button.dataset.choice;
    renderSetup();
  }));
  $('[data-action="start"]').addEventListener('click', startRun);
}

function startRun() {
  const alphabet = state.data.alphabets[state.alphabet];
  const options = state.data.options[state.alphabet];
  state.questions = createQuestions(alphabet, options, state.mode);
  state.questionIndex = 0;
  state.hinted = new Set();
  state.hintVisible = false;
  state.feedback = '';
  state.screen = 'run';
  render();
  announce(t('questionOf', { current: 1, total: state.questions.length }));
  if (state.mode === 'keyboard') setTimeout(() => $('#answer-input')?.focus(), 0);
}

function renderRun() {
  const question = currentQuestion();
  const progress = ((state.questionIndex) / state.questions.length) * 100;
  const feedbackClass = state.feedback === 'correct' ? 'feedback-correct' : 'feedback-wrong';
  $('#app').innerHTML = `
    <section class="run-page page-enter" aria-labelledby="question-title">
      <div class="run-topline"><div><p class="eyebrow">${t('runLabel')}</p><p class="run-context">${alphabetLabel()} <span>·</span> ${modeLabel()}</p></div><button class="text-button exit-button" data-action="exit">↩ ${t('exit')}</button></div>
      <div class="progress-meta"><span>${t('questionOf', { current: state.questionIndex + 1, total: state.questions.length })}</span><span>${Math.round(progress)}%</span></div>
      <div class="progress-track"><span style="width: ${progress}%"></span></div>
        <div class="question-layout">
        <div class="question-card panel">
          <div class="question-card-top"><span class="mode-pill">${state.mode === 'keyboard' ? t('modeKeyboard') : t('modeSuggestion')}</span><span class="question-index">${String(state.questionIndex + 1).padStart(2, '0')}</span></div>
          <div class="symbol-stage"><span class="symbol-halo"></span><span class="symbol-letter" id="question-title">${escapeHtml(question.symbol)}</span></div>
          <div class="prompt-row"><p>${state.mode === 'keyboard' ? t('keyboardMeta') : t('suggestionMeta')}</p><button class="hint-button ${state.hintVisible ? 'is-used' : ''}" data-action="hint" ${state.hintVisible ? 'aria-label="' + t('hintShown') + '"' : ''}>${state.hintVisible ? '✦ ' + t('hintShown') : '✦ ' + t('hint')}</button></div>
          ${state.hintVisible ? `<div class="hint-box" role="status"><span>✦</span><p>${t('hintMessage', { answer: `<strong>${escapeHtml(question.codeword)}</strong>` })}</p></div>` : ''}
          ${state.mode === 'keyboard' ? keyboardForm(question) : suggestionForm(question)}
          ${state.feedback ? `<p class="feedback ${feedbackClass}" role="status"><span>${state.feedback === 'correct' ? '✓' : '!'}</span>${state.feedback === 'correct' ? t('correct') : state.mode === 'keyboard' ? t('wrongKeyboard') : t('wrongSuggestion')}</p>` : ''}
        </div>
        <aside class="run-aside"><div class="aside-stat"><span class="aside-stat-value">${state.questionIndex}</span><span>${t('completedLabel')}</span></div><div class="aside-divider"></div><p>${state.hintVisible ? t('hintShown') : t('guideThree')}</p></aside>
      </div>
    </section>`;
  bindRunEvents();
}

function keyboardForm(question) {
  return `<form class="answer-form" id="answer-form"><label class="sr-only" for="answer-input">${t('answerPlaceholder')}</label><div class="input-wrap"><input id="answer-input" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${t('answerPlaceholder')}" aria-describedby="answer-help"><span aria-hidden="true">↵</span></div><button class="primary-button" type="submit">${t('submit')} <span aria-hidden="true">↗</span></button><p id="answer-help" class="input-help">${escapeHtml(question.symbol)} → ${t('keyboardMeta')}</p></form>`;
}

function suggestionForm(question) {
  return `<div class="suggestion-grid" role="group" aria-label="${t('suggestionMeta')}">${question.options.map((option) => `<button type="button" class="suggestion-button" data-answer="${escapeHtml(option)}"><span class="option-key">${String.fromCharCode(65 + question.options.indexOf(option))}</span><span>${escapeHtml(option)}</span></button>`).join('')}</div>`;
}

function bindRunEvents() {
  $('[data-action="exit"]').addEventListener('click', () => {
    if (window.confirm(t('exitConfirm'))) {
      state.screen = 'setup'; state.questions = []; state.feedback = ''; state.hintVisible = false; render();
    }
  });
  $('[data-action="hint"]').addEventListener('click', () => {
    state.hinted.add(state.questionIndex); state.hintVisible = true; state.feedback = ''; render();
    announce(t('hintMessage', { answer: currentQuestion().codeword }));
  });
  if (state.mode === 'keyboard') {
    $('#answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#answer-input');
      if (isCorrectAnswer(input.value, currentQuestion().codeword)) completeQuestion();
      else { state.feedback = 'wrong'; input.select(); render(); setTimeout(() => $('#answer-input')?.focus(), 0); }
    });
  } else {
    $$('.suggestion-button').forEach((button) => button.addEventListener('click', () => {
      if (isCorrectAnswer(button.dataset.answer, currentQuestion().codeword)) completeQuestion();
      else { state.feedback = 'wrong'; render(); }
    }));
  }
}

function completeQuestion() {
  state.feedback = 'correct';
  announce(t('correct'));
  if (state.questionIndex === state.questions.length - 1) {
    state.lastRun = { alphabet: state.alphabet, mode: state.mode, total: state.questions.length, hinted: state.hinted.size, score: scorePercent(state.questions.length, state.hinted.size) };
    state.screen = 'result';
    setTimeout(render, 260);
    return;
  }
  setTimeout(() => {
    state.questionIndex += 1; state.hintVisible = false; state.feedback = ''; render();
    announce(t('questionOf', { current: state.questionIndex + 1, total: state.questions.length }));
    if (state.mode === 'keyboard') setTimeout(() => $('#answer-input')?.focus(), 0);
  }, 260);
}

function renderResult() {
  const run = state.lastRun;
  const score = run.score;
  $('#app').innerHTML = `
    <section class="result-page page-enter" aria-labelledby="result-title">
      <div class="result-copy"><p class="eyebrow">${t('resultEyebrow')}</p><h1 id="result-title">${t('resultTitle')}</h1><p class="lede">${t('resultLead', { alphabet: alphabetLabel(), mode: modeLabel().toLowerCase() })}</p><div class="result-actions"><button class="primary-button" data-action="again">${t('again')} <span aria-hidden="true">↗</span></button><button class="secondary-button" data-action="settings">${t('changeSettings')}</button></div></div>
      <div class="result-card panel"><div class="score-ring" style="--score: ${score * 3.6}deg"><div><strong>${score}%</strong><span>${t('scoreLabel')}</span></div></div><div class="result-stats"><div><strong>${run.hinted}</strong><span>${t('hintedLabel')}</span></div><div><strong>${run.total}</strong><span>${t('completedLabel')}</span></div></div><p class="result-note">${t('resultNote')}</p></div>
    </section>`;
  $('[data-action="again"]').addEventListener('click', startRun);
  $('[data-action="settings"]').addEventListener('click', () => { state.screen = 'setup'; render(); });
}

async function loadData() {
  const [alphabets, options] = await Promise.all([
    fetch('./benchmark-data/alphabets.json').then((response) => response.json()),
    fetch('./benchmark-data/multiple-choice-options.json').then((response) => response.json())
  ]);
  state.data = { alphabets, options };
  render();
}

$$('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
$('[data-action="home"]').addEventListener('click', (event) => { event.preventDefault(); if (state.screen !== 'run') { state.screen = 'setup'; render(); } });
loadData().catch(() => { $('#app').innerHTML = '<p class="load-error">Unable to load the benchmark data. Please restart the local server.</p>'; });
