// Phonetic Training Web Application
// Implements the requirements from the benchmark

let currentLanguage = "en"; // default to English
let currentAlphabet = "nato"; // default to NATO
let currentMode = "keyboard"; // default to keyboard mode
let currentAlphabetData = [];
let currentQuestionIndex = 0;
let shuffledSymbols = [];
let hintedQuestions = new Set(); // Track which questions used hint
let totalQuestions = 0;

// Text translations
const translations = {
  en: {
    languageSelection: "Select Language",
    english: "English",
    polish: "Polski",
    alphabetSelection: "Select Alphabet",
    nato: "NATO",
    polishAlphabet: "Polish",
    modeSelection: "Select Mode",
    keyboardMode: "Keyboard Mode",
    suggestionMode: "Suggestion Mode",
    hint: "Hint",
    hideHint: "Hide Hint",
    next: "Next",
    restart: "Restart",
    exerciseComplete: "Exercise Complete",
    finalScore: "Final Score:",
    placeholder: "Type your answer",
    feedbackCorrect: "Correct!",
    feedbackIncorrect: "Incorrect. Try again.",
    attribution:
      "Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by Nemotron 3 Super on 2026-05-27.",
  },
  pl: {
    languageSelection: "Wybierz język",
    english: "Angielski",
    polish: "Polski",
    alphabetSelection: "Wybierz alfabet",
    nato: "NATO",
    polishAlphabet: "Polski",
    modeSelection: "Wybierz tryb",
    keyboardMode: "Tryb klawiatury",
    suggestionMode: "Tryb podpowiedzi",
    hint: "Podpowiedź",
    hideHint: "Ukryj podpowiedź",
    next: "Dalej",
    restart: "Zacznij od nowa",
    exerciseComplete: "Ćwiczenie zakończone",
    finalScore: "Wynik końcowy:",
    placeholder: "Wpisz odpowiedź",
    feedbackCorrect: "Poprawnie!",
    feedbackIncorrect: "Niepoprawnie. Spróbuj ponownie.",
    attribution:
      "Phonetic Benchmark przez Piotr Kacała (piotrkacala.pl). Opracowane przez Nemotron 3 Super w dniu 2026-05-27.",
  },
};

// Load benchmark data
async function loadBenchmarkData() {
  try {
    const alphabetsResponse = await fetch("benchmark-data/alphabets.json");
    const optionsResponse = await fetch(
      "benchmark-data/multiple-choice-options.json",
    );
    const alphabetsData = await alphabetsResponse.json();
    const optionsData = await optionsResponse.json();
    return { alphabets: alphabetsData, options: optionsData };
  } catch (error) {
    console.error("Error loading benchmark data:", error);
    return { alphabets: {}, options: {} };
  }
}

// Initialize the application
async function init() {
  const { alphabets, options } = await loadBenchmarkData();
  window.benchmarkData = { alphabets, options };

  // Set up event listeners
  document
    .getElementById("lang-en")
    .addEventListener("click", () => setLanguage("en"));
  document
    .getElementById("lang-pl")
    .addEventListener("click", () => setLanguage("pl"));
  document
    .getElementById("alphabet-nato")
    .addEventListener("click", () => setAlphabet("nato"));
  document
    .getElementById("alphabet-polish")
    .addEventListener("click", () => setAlphabet("polish"));
  document
    .getElementById("mode-keyboard")
    .addEventListener("click", () => setMode("keyboard"));
  document
    .getElementById("mode-suggestion")
    .addEventListener("click", () => setMode("suggestion"));
  document.getElementById("hint-button").addEventListener("click", showHint);
  document.getElementById("hide-hint").addEventListener("click", hideHint);
  document.getElementById("next-button").addEventListener("click", handleNext);
  document
    .getElementById("restart-button")
    .addEventListener("click", restartApplication);
  document
    .getElementById("keyboard-input")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleNext();
      }
    });

  // Show initial screen
  showScreen("language-selection");
  updateTranslations();
}

// Set language
function setLanguage(lang) {
  currentLanguage = lang;
  updateTranslations();
  showScreen("alphabet-selection");
}

// Set alphabet
function setAlphabet(alphabet) {
  currentAlphabet = alphabet;
  currentAlphabetData = window.benchmarkData.alphabets[alphabet] || [];
  totalQuestions = currentAlphabetData.length;
  showScreen("mode-selection");
}

// Set mode
function setMode(mode) {
  currentMode = mode;
  startExercise();
}

// Start the exercise
function startExercise() {
  // Create shuffled array of indices
  shuffledSymbols = [];
  for (let i = 0; i < totalQuestions; i++) {
    shuffledSymbols.push(i);
  }
  // Fisher-Yates shuffle
  for (let i = shuffledSymbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSymbols[i], shuffledSymbols[j]] = [
      shuffledSymbols[j],
      shuffledSymbols[i],
    ];
  }

  currentQuestionIndex = 0;
  hintedQuestions.clear();
  showScreen("exercise");
  loadQuestion();
}

// Load current question
function loadQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
    showResult();
    return;
  }

  const questionIndex = shuffledSymbols[currentQuestionIndex];
  const currentSymbol = currentAlphabetData[questionIndex].symbol;
  const currentCodeword = currentAlphabetData[questionIndex].codeword;

  // Update UI
  document.getElementById("symbol-display").textContent = currentSymbol;
  document.getElementById("feedback").textContent = "";
  document.getElementById("keyboard-input").value = "";
  document.getElementById("keyboard-input").focus();
  document.getElementById("next-button").classList.add("hidden");
  document.getElementById("hint-container").classList.add("hidden");

  // Clear suggestion buttons
  const suggestionButtons = document.getElementById("suggestion-buttons");
  suggestionButtons.innerHTML = "";

  if (currentMode === "suggestion") {
    loadSuggestionOptions(questionIndex, currentCodeword);
  }
}

// Load suggestion options
function loadSuggestionOptions(questionIndex, correctCodeword) {
  const optionsData = window.benchmarkData.options[currentAlphabet];
  if (!optionsData) return;

  const symbol = currentAlphabetData[questionIndex].symbol;
  const allOptions = optionsData[symbol] || [];

  if (allOptions.length === 0) return;

  // Find the correct option index
  const correctIndex = allOptions.indexOf(correctCodeword);
  if (correctIndex === -1) return;

  // Select 3 incorrect options
  const incorrectOptions = allOptions.filter(
    (_, index) => index !== correctIndex,
  );
  // Shuffle incorrect options
  for (let i = incorrectOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [incorrectOptions[i], incorrectOptions[j]] = [
      incorrectOptions[j],
      incorrectOptions[i],
    ];
  }
  // Take first 3 incorrect options
  const selectedIncorrect = incorrectOptions.slice(0, 3);

  // Combine correct and incorrect options
  const options = [correctCodeword, ...selectedIncorrect];
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Create buttons
  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () =>
      handleSuggestionClick(option, correctCodeword),
    );
    document.getElementById("suggestion-buttons").appendChild(button);
  });
}

// Handle keyboard input submission
function handleNext() {
  if (currentQuestionIndex >= totalQuestions) return;

  const questionIndex = shuffledSymbols[currentQuestionIndex];
  const currentSymbol = currentAlphabetData[questionIndex].symbol;
  const currentCodeword = currentAlphabetData[questionIndex].codeword;

  let isCorrect = false;

  if (currentMode === "keyboard") {
    const userInput = document.getElementById("keyboard-input").value.trim();
    // Case-insensitive comparison, but diacritics significant
    isCorrect = userInput.toLowerCase() === currentCodeword.toLowerCase();
  } else if (currentMode === "suggestion") {
    // Correctness is handled in suggestion click handler
    return;
  }

  if (isCorrect) {
    document.getElementById("feedback").textContent =
      translations[currentLanguage].feedbackCorrect;
    document.getElementById("feedback").className = "correct";
    document.getElementById("next-button").classList.remove("hidden");
    document.getElementById("keyboard-input").disabled = true;
  } else {
    document.getElementById("feedback").textContent =
      translations[currentLanguage].feedbackIncorrect;
    document.getElementById("feedback").className = "incorrect";
  }
}

// Handle suggestion button click
function handleSuggestionClick(selectedOption, correctCodeword) {
  if (currentQuestionIndex >= totalQuestions) return;

  const isCorrect = selectedOption === correctCodeword;

  // Disable all buttons
  const buttons = document
    .getElementById("suggestion-buttons")
    .querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctCodeword) {
      button.style.backgroundColor = "#28a745"; // Green for correct
    } else if (button.textContent === selectedOption && !isCorrect) {
      button.style.backgroundColor = "#dc3545"; // Red for incorrect
    }
  });

  if (isCorrect) {
    document.getElementById("feedback").textContent =
      translations[currentLanguage].feedbackCorrect;
    document.getElementById("feedback").className = "correct";
    document.getElementById("next-button").classList.remove("hidden");
  } else {
    document.getElementById("feedback").textContent =
      translations[currentLanguage].feedbackIncorrect;
    document.getElementById("feedback").className = "incorrect";
  }
}

// Show hint
function showHint() {
  if (currentQuestionIndex >= totalQuestions) return;

  const questionIndex = shuffledSymbols[currentQuestionIndex];
  const currentCodeword = currentAlphabetData[questionIndex].codeword;

  document.getElementById("hint-text").textContent = currentCodeword;
  document.getElementById("hint-container").classList.remove("hidden");

  // Mark this question as hinted
  hintedQuestions.add(questionIndex);
}

// Hide hint
function hideHint() {
  document.getElementById("hint-container").classList.add("hidden");
}

// Show result screen
function showResult() {
  showScreen("result");

  const cleanQuestions = totalQuestions - hintedQuestions.size;
  const scorePercent = Math.round((cleanQuestions / totalQuestions) * 100);

  document.getElementById("result-summary").textContent =
    `${translations[currentLanguage].alphabetSelection}: ${currentAlphabet === "nato" ? translations[currentLanguage].nato : translations[currentLanguage].polishAlphabet}, ` +
    `${translations[currentLanguage].modeSelection}: ${currentMode === "keyboard" ? translations[currentLanguage].keyboardMode : translations[currentLanguage].suggestionMode}`;

  document.getElementById("result-score").textContent = `${scorePercent}%`;

  // Update attribution with actual model and date
  const attributionText = translations[currentLanguage].attribution;
  document.getElementById("attribution").textContent = attributionText;
}

// Show a specific screen
function showScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  // Show the requested screen
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add("active");
  }
}

// Update translations in the UI
function updateTranslations() {
  const t = translations[currentLanguage];

  document
    .getElementById("language-selection")
    .querySelector("h1").textContent = t.languageSelection;
  document.getElementById("lang-en").textContent = t.english;
  document.getElementById("lang-pl").textContent = t.polish;

  document
    .getElementById("alphabet-selection")
    .querySelector("h1").textContent = t.alphabetSelection;
  document.getElementById("alphabet-nato").textContent = t.nato;
  document.getElementById("alphabet-polish").textContent = t.polishAlphabet;

  document.getElementById("mode-selection").querySelector("h1").textContent =
    t.modeSelection;
  document.getElementById("mode-keyboard").textContent = t.keyboardMode;
  document.getElementById("mode-suggestion").textContent = t.suggestionMode;

  document.getElementById("hint-button").textContent = t.hint;
  document.getElementById("hide-hint").textContent = t.hideHint;
  document.getElementById("next-button").textContent = t.next;
  document.getElementById("restart-button").textContent = t.restart;

  document.getElementById("keyboard-input").placeholder = t.placeholder;

  // Update result screen texts (will be updated when shown)
  document.querySelector("#result h1").textContent = t.exerciseComplete;
}

// Restart application
function restartApplication() {
  showScreen("language-selection");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
