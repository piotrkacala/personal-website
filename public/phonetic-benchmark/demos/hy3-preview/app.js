// Phonetic Training App - Main Application Logic
// Implemented by Hy3 preview model

// i18n translations
const translations = {
  en: {
    title: "Phonetic Training",
    langLabel: "Interface Language",
    alphabetLabel: "Phonetic Alphabet",
    modeLabel: "Exercise Mode",
    startBtn: "Start",
    progress: "Question {current} of {total}",
    hintBtn: "💡 Hint",
    submitBtn: "Submit",
    inputPlaceholder: "Type the codeword...",
    correct: "Correct!",
    wrong: "Wrong. Try again.",
    resultTitle: "Exercise Complete!",
    resultAlphabet: "Alphabet",
    resultMode: "Mode",
    resultScore: "Score",
    restartBtn: "Restart",
    keyboard: "Keyboard",
    suggestion: "Suggestion",
    polish: "Polish",
    nato: "NATO",
  },
  pl: {
    title: "Trening Fonetyczny",
    langLabel: "Język interfejsu",
    alphabetLabel: "Alfabet fonetyczny",
    modeLabel: "Tryb ćwiczenia",
    startBtn: "Rozpocznij",
    progress: "Pytanie {current} z {total}",
    hintBtn: "💡 Podpowiedź",
    submitBtn: "Zatwierdź",
    inputPlaceholder: "Wpisz słowo kodowe...",
    correct: "Poprawnie!",
    wrong: "Źle. Spróbuj ponownie.",
    resultTitle: "Ćwiczenie zakończone!",
    resultAlphabet: "Alfabet",
    resultMode: "Tryb",
    resultScore: "Wynik",
    restartBtn: "Rozpocznij ponownie",
    keyboard: "Klawiatura",
    suggestion: "Sugestie",
    polish: "Polski",
    nato: "NATO",
  },
};

// Application state
let state = {
  interfaceLang: "en",
  alphabet: "polish",
  mode: "keyboard",
  symbols: [],
  currentIndex: 0,
  hintedQuestions: 0,
  hintUsed: false,
  isComplete: false,
};

// Load benchmark data
let alphabetsData = null;
let optionsData = null;

async function loadData() {
  try {
    const [alphabetsResponse, optionsResponse] = await Promise.all([
      fetch("benchmark-data/alphabets.json"),
      fetch("benchmark-data/multiple-choice-options.json"),
    ]);

    alphabetsData = await alphabetsResponse.json();
    optionsData = await optionsResponse.json();

    console.log("Benchmark data loaded successfully");
  } catch (error) {
    console.error("Error loading benchmark data:", error);
    alert(
      "Error loading benchmark data. Please check that benchmark-data/ files exist.",
    );
  }
}

// Utility: Shuffle array (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get translation
function t(key) {
  return translations[state.interfaceLang][key] || key;
}

// Update UI text based on selected language
function updateUIText() {
  document.getElementById("title").textContent = t("title");
  document.getElementById("lang-label").textContent = t("langLabel");
  document.getElementById("alphabet-label").textContent = t("alphabetLabel");
  document.getElementById("mode-label").textContent = t("modeLabel");
  document.getElementById("start-btn").textContent = t("startBtn");
  document.getElementById("hint-btn").textContent = t("hintBtn");
  document.getElementById("submit-btn").textContent = t("submitBtn");
  document.getElementById("answer-input").placeholder = t("inputPlaceholder");
  document.getElementById("result-title").textContent = t("resultTitle");
  document.getElementById("restart-btn").textContent = t("restartBtn");
}

// Switch screen
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

// Start exercise
function startExercise() {
  if (!alphabetsData || !optionsData) {
    alert("Benchmark data not loaded yet. Please wait.");
    return;
  }

  state.alphabet = document.getElementById("alphabet-select").value;
  state.mode = document.getElementById("mode-select").value;
  state.currentIndex = 0;
  state.hintedQuestions = 0;
  state.hintUsed = false;
  state.isComplete = false;

  // Get symbols for selected alphabet and shuffle
  const alphabetSymbols = alphabetsData[state.alphabet];
  state.symbols = shuffleArray(alphabetSymbols);

  // Show/hide modes
  document.getElementById("keyboard-mode").style.display =
    state.mode === "keyboard" ? "block" : "none";
  document.getElementById("suggestion-mode").style.display =
    state.mode === "suggestion" ? "block" : "none";

  showScreen("exercise-screen");
  showCurrentSymbol();
}

// Display current symbol
function showCurrentSymbol() {
  const current = state.symbols[state.currentIndex];
  document.getElementById("symbol-display").textContent = current.symbol;

  // Reset state for new question
  state.hintUsed = false;
  document.getElementById("hint-text").textContent = "";
  document.getElementById("error-message").textContent = "";
  document.getElementById("answer-input").value = "";
  document.getElementById("answer-input").disabled = false;
  document.getElementById("submit-btn").disabled = false;

  // Update progress
  const total = state.symbols.length;
  const currentQuestion = state.currentIndex + 1;
  document.getElementById("progress-text").textContent = t("progress")
    .replace("{current}", currentQuestion)
    .replace("{total}", total);
  document.getElementById("progress-fill").style.width =
    `${(currentQuestion / total) * 100}%`;

  // Setup suggestion buttons if in suggestion mode
  if (state.mode === "suggestion") {
    setupSuggestionButtons(current.symbol);
  }

  // Focus input in keyboard mode
  if (state.mode === "keyboard") {
    document.getElementById("answer-input").focus();
  }
}

// Setup suggestion buttons
function setupSuggestionButtons(symbol) {
  const buttonsContainer = document.getElementById("suggestion-buttons");
  buttonsContainer.innerHTML = "";

  // Get options from benchmark data
  const options = optionsData[state.alphabet][symbol];
  if (!options) {
    console.error(`No options found for symbol ${symbol} in ${state.alphabet}`);
    return;
  }

  // Shuffle display order
  const shuffledOptions = shuffleArray(options);

  shuffledOptions.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.textContent = option;
    btn.onclick = () => handleSuggestionClick(option, btn);
    buttonsContainer.appendChild(btn);
  });
}

// Handle suggestion click
function handleSuggestionClick(selectedOption, buttonElement) {
  const current = state.symbols[state.currentIndex];
  const correctAnswer = current.codeword.toUpperCase();
  const isCorrect = selectedOption.toUpperCase() === correctAnswer;

  // Disable all buttons
  document.querySelectorAll(".suggestion-btn").forEach((btn) => {
    btn.disabled = true;
  });

  if (isCorrect) {
    // Mark correct button only after user selects it
    buttonElement.classList.add("correct");

    // Move to next question after delay
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  } else {
    // Mark wrong button
    buttonElement.classList.add("wrong");
    document.getElementById("error-message").textContent = t("wrong");

    // Re-enable other buttons after a short delay
    setTimeout(() => {
      document.querySelectorAll(".suggestion-btn").forEach((btn) => {
        if (!btn.classList.contains("wrong")) {
          btn.disabled = false;
        }
      });
      document.getElementById("error-message").textContent = "";
    }, 1500);
  }
}

// Handle keyboard submit
function handleSubmit() {
  const input = document.getElementById("answer-input");
  const userAnswer = input.value.trim();
  const current = state.symbols[state.currentIndex];
  const correctAnswer = current.codeword;

  // Case-insensitive comparison, preserve diacritics
  const normalizeForComparison = (str) => {
    return str.normalize("NFC").toLowerCase();
  };

  if (
    normalizeForComparison(userAnswer) === normalizeForComparison(correctAnswer)
  ) {
    document.getElementById("error-message").textContent = t("correct");
    document.getElementById("error-message").style.color = "#28a745";
    input.disabled = true;
    document.getElementById("submit-btn").disabled = true;

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  } else {
    document.getElementById("error-message").textContent = t("wrong");
    document.getElementById("error-message").style.color = "#dc3545";
    input.select();
  }
}

// Show hint
function showHint() {
  if (state.hintUsed) return;

  const current = state.symbols[state.currentIndex];
  document.getElementById("hint-text").textContent = current.codeword;
  state.hintUsed = true;
  state.hintedQuestions++;

  // In suggestion mode, hint reveals the answer as text only
  // It does NOT mark or auto-select the correct option
  // User still needs to click the correct button
}

// Move to next question
function nextQuestion() {
  state.currentIndex++;

  if (state.currentIndex >= state.symbols.length) {
    showResult();
  } else {
    showCurrentSymbol();
  }
}

// Show result screen
function showResult() {
  state.isComplete = true;

  const total = state.symbols.length;
  const cleanQuestions = total - state.hintedQuestions;
  const score = Math.round((cleanQuestions / total) * 100);

  document.getElementById("score-display").textContent = `${score}%`;

  const alphabetName = state.alphabet === "polish" ? t("polish") : t("nato");
  const modeName = state.mode === "keyboard" ? t("keyboard") : t("suggestion");

  document.getElementById("result-details").innerHTML = `
        <p><strong>${t("resultAlphabet")}:</strong> ${alphabetName}</p>
        <p><strong>${t("resultMode")}:</strong> ${modeName}</p>
        <p><strong>${t("resultScore")}:</strong> ${cleanQuestions}/${total} (${score}%)</p>
    `;

  showScreen("result-screen");
}

// Restart
function restart() {
  document.getElementById("interface-lang").value = state.interfaceLang;
  showScreen("setup-screen");
}

// Update footer attribution
function updateAttribution() {
  const today = new Date().toISOString().split("T")[0];
  const attribution = `Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by Hy3 preview on ${today}.`;
  document.getElementById("footer-attribution").textContent = attribution;
}

// Initialize app
async function init() {
  await loadData();

  // Event listeners
  document.getElementById("interface-lang").addEventListener("change", (e) => {
    state.interfaceLang = e.target.value;
    updateUIText();
  });

  document.getElementById("start-btn").addEventListener("click", startExercise);

  document.getElementById("submit-btn").addEventListener("click", handleSubmit);

  document.getElementById("answer-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });

  document.getElementById("hint-btn").addEventListener("click", showHint);

  document.getElementById("restart-btn").addEventListener("click", restart);

  // Initial UI setup
  updateUIText();
  updateAttribution();
}

// Start app when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
