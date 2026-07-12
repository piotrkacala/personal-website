import { calculateScore, isCorrectAnswer, shuffle, validateOptionSet } from './core.js';

const IMPLEMENTATION_DATE = '2026-07-11';
const IMPLEMENTING_MODEL = 'GPT-5.6 Terra';

const copy = {
  en: {
    language: 'Interface language',
    english: 'English',
    polishLanguage: 'Polski',
    eyebrow: 'Phonetic training',
    setupTitle: 'Train the signal, one symbol at a time.',
    setupLead: 'Choose an alphabet and a practice method. Every symbol appears once in a fresh order.',
    alphabet: 'Alphabet',
    polishAlphabet: 'Polish phonetic alphabet',
    natoAlphabet: 'NATO phonetic alphabet',
    mode: 'Practice method',
    keyboard: 'Keyboard',
    keyboardDetail: 'Type the codeword yourself.',
    suggestion: 'Suggestions',
    suggestionDetail: 'Choose from four fixed options.',
    start: 'Start practice',
    setupNote: 'You can change the language and setup choices before starting.',
    runEyebrow: 'Active practice',
    progress: 'Question {current} of {total}',
    prompt: 'What is the codeword for',
    answerLabel: 'Your answer',
    answerPlaceholder: 'Type the codeword',
    submit: 'Check answer',
    hint: 'Reveal hint',
    hintLabel: 'Hint',
    hintText: 'The codeword is {answer}. You still need to answer it.',
    wrong: 'Not quite. Try again — wrong attempts do not reduce your score.',
    reset: 'End practice',
    languageLocked: 'The interface language is locked until this practice run ends.',
    endQuestion: 'End this practice run?',
    endDescription: 'Your current progress and score will be discarded.',
    cancel: 'Keep practicing',
    confirmEnd: 'End and return to setup',
    completeEyebrow: 'Practice complete',
    completeTitle: 'Your signal is clearer.',
    score: 'Final score',
    clean: '{clean} clean of {total} questions',
    usedHint: '{count} question(s) used a hint',
    completedWith: 'Completed with {alphabet} · {mode}',
    practiceAgain: 'Practice again',
    loading: 'Preparing your practice session…',
    loadingDetail: 'Reading the canonical alphabet data.',
    dataError: 'The practice data could not be loaded. Please refresh and try again.',
    attribution: `Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by ${IMPLEMENTING_MODEL} on ${IMPLEMENTATION_DATE}.`
  },
  pl: {
    language: 'Język interfejsu',
    english: 'English',
    polishLanguage: 'Polski',
    eyebrow: 'Trening alfabetu fonetycznego',
    setupTitle: 'Ćwicz sygnał, symbol po symbolu.',
    setupLead: 'Wybierz alfabet i sposób ćwiczenia. Każdy symbol pojawi się raz, w nowej kolejności.',
    alphabet: 'Alfabet',
    polishAlphabet: 'Polski alfabet fonetyczny',
    natoAlphabet: 'Alfabet fonetyczny NATO',
    mode: 'Sposób ćwiczenia',
    keyboard: 'Klawiatura',
    keyboardDetail: 'Wpisz samodzielnie słowo kodowe.',
    suggestion: 'Podpowiedzi',
    suggestionDetail: 'Wybierz jedną z czterech stałych opcji.',
    start: 'Rozpocznij ćwiczenie',
    setupNote: 'Przed rozpoczęciem możesz zmienić język i ustawienia.',
    runEyebrow: 'Trwające ćwiczenie',
    progress: 'Pytanie {current} z {total}',
    prompt: 'Jakie słowo kodowe odpowiada symbolowi',
    answerLabel: 'Twoja odpowiedź',
    answerPlaceholder: 'Wpisz słowo kodowe',
    submit: 'Sprawdź odpowiedź',
    hint: 'Pokaż podpowiedź',
    hintLabel: 'Podpowiedź',
    hintText: 'Słowo kodowe to {answer}. Nadal musisz podać odpowiedź.',
    wrong: 'Jeszcze nie. Spróbuj ponownie — błędne próby nie obniżają wyniku.',
    reset: 'Zakończ ćwiczenie',
    languageLocked: 'Język interfejsu jest zablokowany do zakończenia tego ćwiczenia.',
    endQuestion: 'Zakończyć to ćwiczenie?',
    endDescription: 'Bieżący postęp i wynik zostaną usunięte.',
    cancel: 'Ćwicz dalej',
    confirmEnd: 'Zakończ i wróć do ustawień',
    completeEyebrow: 'Ćwiczenie ukończone',
    completeTitle: 'Twój sygnał jest wyraźniejszy.',
    score: 'Wynik końcowy',
    clean: '{clean} czystych odpowiedzi z {total}',
    usedHint: 'Podpowiedź użyta w: {count} pytaniu/pytaniach',
    completedWith: 'Ukończono: {alphabet} · {mode}',
    practiceAgain: 'Ćwicz ponownie',
    loading: 'Przygotowujemy sesję ćwiczeń…',
    loadingDetail: 'Odczytujemy kanoniczne dane alfabetów.',
    dataError: 'Nie udało się wczytać danych ćwiczenia. Odśwież stronę i spróbuj ponownie.',
    attribution: `Phonetic Benchmark: Piotr Kacała (piotrkacala.pl). Wykonanie: ${IMPLEMENTING_MODEL}, ${IMPLEMENTATION_DATE}.`
  }
};

const state = {
  language: 'en',
  phase: 'loading',
  selectedAlphabet: 'nato',
  selectedMode: 'keyboard',
  alphabets: null,
  optionSets: null,
  order: [],
  index: 0,
  hinted: new Set(),
  currentOptions: [],
  feedback: '',
  confirmEnd: false,
  result: null
};

const main = document.querySelector('main');
const footer = document.querySelector('#footer');
const languageSelect = document.querySelector('#language-select');
const languageLabel = document.querySelector('#language-label');

function t(key, values = {}) {
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    copy[state.language][key]
  );
}

function alphabetName(name) {
  return name === 'polish' ? t('polishAlphabet') : t('natoAlphabet');
}

function modeName(mode) {
  return t(mode);
}

function currentQuestion() {
  return state.order[state.index];
}

function prepareQuestion() {
  const question = currentQuestion();
  state.currentOptions = state.selectedMode === 'suggestion'
    ? shuffle(state.optionSets[state.selectedAlphabet][question.symbol])
    : [];
  state.feedback = '';
  state.confirmEnd = false;
}

function ensureDataContract(alphabets, optionSets) {
  for (const name of ['polish', 'nato']) {
    if (!Array.isArray(alphabets[name]) || !optionSets[name]) throw new Error(`Missing ${name} data.`);
    for (const entry of alphabets[name]) {
      if (!entry.symbol || !entry.codeword || !validateOptionSet(optionSets[name][entry.symbol], entry.codeword)) {
        throw new Error(`Invalid fixed option set for ${name}/${entry.symbol}.`);
      }
    }
  }
}

function startRun() {
  state.order = shuffle(state.alphabets[state.selectedAlphabet]);
  state.index = 0;
  state.hinted = new Set();
  state.phase = 'run';
  prepareQuestion();
  render();
}

function completeCurrentQuestion() {
  if (state.index === state.order.length - 1) {
    const hinted = state.hinted.size;
    state.result = {
      alphabet: state.selectedAlphabet,
      mode: state.selectedMode,
      total: state.order.length,
      hinted,
      score: calculateScore(state.order.length, hinted)
    };
    state.phase = 'result';
    state.feedback = '';
    state.confirmEnd = false;
  } else {
    state.index += 1;
    prepareQuestion();
  }
  render();
}

function showHint() {
  state.hinted.add(state.index);
  render();
}

function endRun() {
  state.phase = 'setup';
  state.order = [];
  state.index = 0;
  state.hinted = new Set();
  state.result = null;
  state.feedback = '';
  state.confirmEnd = false;
  render();
}

function setupView() {
  return `
    <section class="hero" aria-labelledby="setup-title">
      <p class="eyebrow">${t('eyebrow')}</p>
      <h1 id="setup-title">${t('setupTitle')}</h1>
      <p class="lede">${t('setupLead')}</p>
    </section>
    <form class="setup-card" id="setup-form">
      <fieldset>
        <legend>${t('alphabet')}</legend>
        <div class="choice-grid">
          ${choice('alphabet', 'polish', t('polishAlphabet'), '', state.selectedAlphabet === 'polish')}
          ${choice('alphabet', 'nato', t('natoAlphabet'), '', state.selectedAlphabet === 'nato')}
        </div>
      </fieldset>
      <fieldset>
        <legend>${t('mode')}</legend>
        <div class="choice-grid mode-grid">
          ${choice('mode', 'keyboard', t('keyboard'), t('keyboardDetail'), state.selectedMode === 'keyboard')}
          ${choice('mode', 'suggestion', t('suggestion'), t('suggestionDetail'), state.selectedMode === 'suggestion')}
        </div>
      </fieldset>
      <button class="primary-action" type="submit">${t('start')} <span aria-hidden="true">→</span></button>
      <p class="setup-note">${t('setupNote')}</p>
    </form>`;
}

function choice(group, value, title, detail, checked) {
  return `<label class="choice ${checked ? 'is-selected' : ''}">
    <input type="radio" name="${group}" value="${value}" ${checked ? 'checked' : ''} />
    <span><strong>${title}</strong>${detail ? `<small>${detail}</small>` : ''}</span>
  </label>`;
}

function runView() {
  const question = currentQuestion();
  const isHinted = state.hinted.has(state.index);
  const answerControl = state.selectedMode === 'keyboard'
    ? `<form id="answer-form" class="answer-form">
        <label for="answer-input">${t('answerLabel')}</label>
        <div class="input-row">
          <input id="answer-input" name="answer" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${t('answerPlaceholder')}" required autofocus />
          <button class="primary-action compact" type="submit">${t('submit')}</button>
        </div>
      </form>`
    : `<div class="option-grid" aria-label="${t('answerLabel')}">
        ${state.currentOptions.map((option) => `<button class="option" type="button" data-option="${option}">${option}</button>`).join('')}
      </div>`;

  return `<section class="run-shell" aria-labelledby="question-title">
    <div class="run-topline">
      <div><p class="eyebrow">${t('runEyebrow')}</p><p class="progress">${t('progress', { current: state.index + 1, total: state.order.length })}</p></div>
      <button class="quiet-button" id="end-run" type="button">${t('reset')}</button>
    </div>
    <div class="progress-track" aria-hidden="true"><span style="width: ${((state.index + 1) / state.order.length) * 100}%"></span></div>
    <article class="question-card">
      <p class="question-label" id="question-title">${t('prompt')}</p>
      <div class="symbol" aria-label="${question.symbol}">${question.symbol}</div>
      ${answerControl}
      <div class="support-row">
        <button class="hint-button" id="hint" type="button">${t('hint')}</button>
        ${state.feedback ? `<p class="feedback" role="status">${t('wrong')}</p>` : ''}
      </div>
      ${isHinted ? `<aside class="hint-panel" role="status"><strong>${t('hintLabel')}</strong><span>${t('hintText', { answer: question.codeword })}</span></aside>` : ''}
    </article>
    <p class="language-lock" role="note">${t('languageLocked')}</p>
    ${state.confirmEnd ? `<aside class="end-dialog" role="alert"><strong>${t('endQuestion')}</strong><p>${t('endDescription')}</p><div><button class="quiet-button" id="cancel-end" type="button">${t('cancel')}</button><button class="danger-button" id="confirm-end" type="button">${t('confirmEnd')}</button></div></aside>` : ''}
  </section>`;
}

function resultView() {
  const { alphabet, mode, total, hinted, score } = state.result;
  return `<section class="result-shell" aria-labelledby="result-title">
    <p class="eyebrow">${t('completeEyebrow')}</p>
    <h1 id="result-title">${t('completeTitle')}</h1>
    <div class="score-orb"><span>${t('score')}</span><strong>${score}%</strong></div>
    <p class="result-detail">${t('clean', { clean: total - hinted, total })}</p>
    <p class="result-detail muted">${t('usedHint', { count: hinted })}</p>
    <p class="completion-context">${t('completedWith', { alphabet: alphabetName(alphabet), mode: modeName(mode) })}</p>
    <button class="primary-action" id="again" type="button">${t('practiceAgain')} <span aria-hidden="true">→</span></button>
  </section>`;
}

function renderLanguageControl() {
  languageLabel.textContent = t('language');
  languageSelect.innerHTML = `<option value="en">${t('english')}</option><option value="pl">${t('polishLanguage')}</option>`;
  languageSelect.value = state.language;
  languageSelect.disabled = state.phase === 'run';
  languageSelect.setAttribute('aria-label', t('language'));
  document.documentElement.lang = state.language;
  document.title = state.language === 'pl' ? 'Signal · Ćwiczenie fonetyczne' : 'Signal · Phonetic practice';
}

function render() {
  renderLanguageControl();
  footer.textContent = t('attribution');
  if (state.phase === 'loading') {
    main.innerHTML = `<section class="state-card"><p class="eyebrow">${t('eyebrow')}</p><h1>${t('loading')}</h1><p>${t('loadingDetail')}</p></section>`;
  } else if (state.phase === 'error') {
    main.innerHTML = `<section class="state-card"><p class="eyebrow">${t('eyebrow')}</p><h1>${t('dataError')}</h1></section>`;
  } else if (state.phase === 'setup') {
    main.innerHTML = setupView();
  } else if (state.phase === 'run') {
    main.innerHTML = runView();
  } else {
    main.innerHTML = resultView();
  }
}

languageSelect.addEventListener('change', () => {
  if (state.phase !== 'run') {
    state.language = languageSelect.value;
    render();
  }
});

main.addEventListener('change', (event) => {
  if (event.target.name === 'alphabet') state.selectedAlphabet = event.target.value;
  if (event.target.name === 'mode') state.selectedMode = event.target.value;
  if (event.target.name === 'alphabet' || event.target.name === 'mode') render();
});

main.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.id === 'setup-form') startRun();
  if (event.target.id === 'answer-form') {
    const answer = new FormData(event.target).get('answer');
    if (isCorrectAnswer(answer, currentQuestion().codeword)) completeCurrentQuestion();
    else {
      state.feedback = 'wrong';
      render();
      document.querySelector('#answer-input')?.focus();
    }
  }
});

main.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.id === 'hint') showHint();
  if (button.id === 'end-run') {
    state.confirmEnd = true;
    render();
  }
  if (button.id === 'cancel-end') {
    state.confirmEnd = false;
    render();
  }
  if (button.id === 'confirm-end' || button.id === 'again') endRun();
  if (button.dataset.option) {
    if (isCorrectAnswer(button.dataset.option, currentQuestion().codeword)) completeCurrentQuestion();
    else {
      state.feedback = 'wrong';
      render();
    }
  }
});

render();

Promise.all([
  fetch('benchmark-data/alphabets.json').then((response) => response.ok ? response.json() : Promise.reject(new Error('alphabets request failed'))),
  fetch('benchmark-data/multiple-choice-options.json').then((response) => response.ok ? response.json() : Promise.reject(new Error('options request failed')))
]).then(([alphabets, optionSets]) => {
  ensureDataContract(alphabets, optionSets);
  state.alphabets = alphabets;
  state.optionSets = optionSets;
  state.phase = 'setup';
  render();
}).catch(() => {
  state.phase = 'error';
  render();
});
