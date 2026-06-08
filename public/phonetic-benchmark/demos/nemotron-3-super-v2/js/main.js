// Application state
let state = {
    interfaceLanguage: 'en', // 'en' or 'pl'
    phoneticAlphabet: 'nato', // 'nato' or 'polish'
    exerciseMode: 'keyboard', // 'keyboard' or 'suggestion'
    currentSymbolIndex: 0,
    shuffledSymbols: [],
    score: 0,
    hintUsed: new Set(),
    totalQuestions: 0,
    cleanQuestions: 0,
    isRunning: false,
    showResult: false,
    hintDisplayed: false
};

// Text translations
const translations = {
    en: {
        title: "Phonetic Benchmark",
        interfaceLanguage: "Interface Language",
        phoneticAlphabet: "Phonetic Alphabet",
        exerciseMode: "Exercise Mode",
        startExercise: "Start Exercise",
        hint: "Hint",
        next: "Next",
        restart: "Restart",
        language: {
            en: "English",
            pl: "Polish"
        },
        alphabet: {
            nato: "NATO",
            polish: "Polish"
        },
        mode: {
            keyboard: "Keyboard",
            suggestion: "Suggestion"
        },
        progress: "Question {current} of {total}",
        result: "Exercise Complete!",
        score: "Your Score: {score}%",
        attribution: "Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by Nemotron-3-Super on 2026-06-03."
    },
    pl: {
        title: "Benchmark Fonetyczny",
        interfaceLanguage: "Język Interfejsu",
        phoneticAlphabet: "Alfabet Fonetyczny",
        exerciseMode: "Tryb Ćwiczeń",
        startExercise: "Rozpocznij Ćwiczenia",
        hint: "Podpowiedź",
        next: "Dalej",
        restart: "Restart",
        language: {
            en: "Angielski",
            pl: "Polski"
        },
        alphabet: {
            nato: "NATO",
            polish: "Polski"
        },
        mode: {
            keyboard: "Klawiatura",
            suggestion: "Podpowiedzi"
        },
        progress: "Pytanie {current} z {total}",
        result: "Ćwiczenia zakończone!",
        score: "Twój wynik: {score}%",
        attribution: "Benchmark Fonetyczny autorstwa Piotr Kacała (piotrkacala.pl). Opracowane przez Nemotron-3-Super dnia 2026-06-03."
    }
};

// Load benchmark data
let alphabetsData = {};
let multipleChoiceData = {};

// Fetch benchmark data
async function loadBenchmarkData() {
    try {
        const [alphabetsResponse, optionsResponse] = await Promise.all([
            fetch('benchmark-data/alphabets.json'),
            fetch('benchmark-data/multiple-choice-options.json')
        ]);
        
        alphabetsData = await alphabetsResponse.json();
        multipleChoiceData = await optionsResponse.json();
        
        // Initialize application after data is loaded
        initApp();
    } catch (error) {
        console.error('Error loading benchmark data:', error);
        document.getElementById('app').innerHTML = '<div class="loading">Error loading application data. Please try again later.</div>';
    }
}

// Initialize the application
function initApp() {
    render();
    setupEventListeners();
}

// Render the application based on current state
function render() {
    const app = document.getElementById('app');
    
    if (!app) return;
    
    const t = translations[state.interfaceLanguage];
    
    if (state.showResult) {
        app.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>${t.title}</h1>
                </div>
                <div class="result-screen">
                    <h2>${t.result}</h2>
                    <div class="score-display">${t.score.replace('{score}', state.score)}%</div>
                    <p>${t.progress.replace('{current}', state.totalQuestions).replace('{total}', state.totalQuestions)}</p>
                    <p>${t.alphabet[state.phoneticAlphabet]} - ${t.mode[state.exerciseMode]}</p>
                    <button class="control-group button" onclick="restartExercise()">${t.restart}</button>
                    <div class="attribution">
                        ${t.attribution}
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    if (!state.isRunning) {
        app.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>${t.title}</h1>
                </div>
                <div class="controls">
                    <div class="control-group">
                        <label for="language-select">${t.interfaceLanguage}</label>
                        <select id="language-select">
                            <option value="en">${t.language.en}</option>
                            <option value="pl">${t.language.pl}</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label for="alphabet-select">${t.phoneticAlphabet}</label>
                        <select id="alphabet-select">
                            <option value="nato">${t.alphabet.nato}</option>
                            <option value="polish">${t.alphabet.polish}</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label for="mode-select">${t.exerciseMode}</label>
                        <select id="mode-select">
                            <option value="keyboard">${t.mode.keyboard}</option>
                            <option value="suggestion">${t.mode.suggestion}</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <button id="start-button">${t.startExercise}</button>
                    </div>
                </div>
            </div>
        `;
        
        // Set current values
        document.getElementById('language-select').value = state.interfaceLanguage;
        document.getElementById('alphabet-select').value = state.phoneticAlphabet;
        document.getElementById('mode-select').value = state.exerciseMode;
        
        return;
    }
    
    // Exercise screen
    const currentSymbol = state.shuffledSymbols[state.currentSymbolIndex];
    const currentData = alphabetsData[state.phoneticAlphabet].find(item => item.symbol === currentSymbol);
    
    app.innerHTML = `
        <div class="container">
            <div class="header">
                <h1>${t.title}</h1>
            </div>
            <div class="progress">${t.progress.replace('{current}', state.currentSymbolIndex + 1).replace('{total}', state.totalQuestions)}</div>
            <div class="exercise-area">
                <div class="symbol-display">${currentSymbol}</div>
                
                ${state.exerciseMode === 'keyboard' ? `
                    <div class="input-area">
                        <input type="text" id="answer-input" placeholder="Enter codeword..." autocomplete="off" />
                        <button id="submit-button">${state.hintDisplayed ? t.next : 'Submit'}</button>
                    </div>
                ` : `
                    <div class="suggestion-buttons" id="suggestion-buttons">
                        <!-- Buttons will be populated by JS -->
                    </div>
                `}
                
                ${!state.hintDisplayed ? `
                    <button class="hint-button" id="hint-button">${t.hint}</button>
                ` : ''}
                
                ${state.hintDisplayed ? `
                    <div class="hint-display" id="hint-display">
                        Correct answer: ${currentData.codeword}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Populate suggestion buttons if in suggestion mode
    if (state.exerciseMode === 'suggestion') {
        const suggestionButtonsContainer = document.getElementById('suggestion-buttons');
        if (suggestionButtonsContainer) {
            const options = getSuggestionOptions(currentSymbol);
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => handleSuggestionClick(option, currentData.codeword);
                suggestionButtonsContainer.appendChild(button);
            });
        }
    }
    
    // Add event listeners for keyboard mode
    if (state.exerciseMode === 'keyboard') {
        const answerInput = document.getElementById('answer-input');
        const submitButton = document.getElementById('submit-button');
        
        if (answerInput) {
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleKeyboardSubmit();
                }
            });
            
            // Focus on input when rendered
            setTimeout(() => answerInput.focus(), 100);
        }
        
        if (submitButton) {
            submitButton.addEventListener('click', handleKeyboardSubmit);
        }
    }
    
    // Add hint button listener
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', handleHintClick);
    }
}

// Setup event listeners for controls
function setupEventListeners() {
    const languageSelect = document.getElementById('language-select');
    const alphabetSelect = document.getElementById('alphabet-select');
    const modeSelect = document.getElementById('mode-select');
    const startButton = document.getElementById('start-button');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            // Only allow language change when not running
            if (!state.isRunning) {
                state.interfaceLanguage = e.target.value;
            } else {
                // Reset to current language if trying to change during run
                e.target.value = state.interfaceLanguage;
            }
        });
    }
    
    if (alphabetSelect) {
        alphabetSelect.addEventListener('change', (e) => {
            // Only allow alphabet change when not running
            if (!state.isRunning) {
                state.phoneticAlphabet = e.target.value;
            } else {
                // Reset to current alphabet if trying to change during run
                e.target.value = state.phoneticAlphabet;
            }
        });
    }
    
    if (modeSelect) {
        modeSelect.addEventListener('change', (e) => {
            // Only allow mode change when not running
            if (!state.isRunning) {
                state.exerciseMode = e.target.value;
            } else {
                // Reset to current mode if trying to change during run
                e.target.value = state.exerciseMode;
            }
        });
    }
    
    if (startButton) {
        startButton.addEventListener('click', startExercise);
    }
}

// Start the exercise
function startExercise() {
    // Reset state for new exercise
    state.currentSymbolIndex = 0;
    state.score = 0;
    state.hintUsed = new Set();
    state.showResult = false;
    state.hintDisplayed = false;
    state.isRunning = true;
    
    // Get all symbols for the selected alphabet and shuffle them
    const symbols = alphabetsData[state.phoneticAlphabet].map(item => item.symbol);
    state.shuffledSymbols = shuffleArray([...symbols]);
    state.totalQuestions = state.shuffledSymbols.length;
    
    render();
}

// Get shuffled array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Get suggestion options for a symbol
function getSuggestionOptions(symbol) {
    // Get the fixed options from benchmark data
    const options = [...multipleChoiceData[state.phoneticAlphabet][symbol]];
    // Shuffle the options for display
    return shuffleArray(options);
}

// Handle keyboard mode submission
function handleKeyboardSubmit() {
    const answerInput = document.getElementById('answer-input');
    if (!answerInput) return;
    
    const userAnswer = answerInput.value.trim();
    const currentSymbol = state.shuffledSymbols[state.currentSymbolIndex];
    const currentData = alphabetsData[state.phoneticAlphabet].find(item => item.symbol === currentSymbol);
    const correctAnswer = currentData.codeword;
    
    // Check answer (case-insensitive, ignoring whitespace)
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
    if (isCorrect) {
        // Correct answer
        if (!state.hintUsed.has(state.currentSymbolIndex)) {
            state.cleanQuestions++;
        }
        
        // Move to next symbol
        state.currentSymbolIndex++;
        
        // Check if exercise is complete
        if (state.currentSymbolIndex >= state.totalQuestions) {
            finishExercise();
        } else {
            // Reset hint state for next question
            state.hintDisplayed = false;
            render();
        }
    } else {
        // Incorrect answer - show error
        answerInput.style.borderColor = '#dc3545';
        setTimeout(() => {
            answerInput.style.borderColor = '#ddd';
        }, 1500);
    }
    
    // Clear input
    answerInput.value = '';
}

// Handle suggestion mode click
function handleSuggestionClick(selectedOption, correctAnswer) {
    // Check if answer is correct
    const isCorrect = selectedOption.toLowerCase() === correctAnswer.toLowerCase();
    
    if (isCorrect) {
        // Correct answer
        if (!state.hintUsed.has(state.currentSymbolIndex)) {
            state.cleanQuestions++;
        }
        
        // Move to next symbol
        state.currentSymbolIndex++;
        
        // Check if exercise is complete
        if (state.currentSymbolIndex >= state.totalQuestions) {
            finishExercise();
        } else {
            render();
        }
    } else {
        // Incorrect answer - provide visual feedback
        const buttons = document.querySelectorAll('.suggestion-buttons button');
        buttons.forEach(button => {
            if (button.textContent === selectedOption) {
                button.style.backgroundColor = '#f8d7da';
                button.style.borderColor = '#f5c6cb';
            }
            if (button.textContent.toLowerCase() === correctAnswer.toLowerCase()) {
                button.style.backgroundColor = '#d4edda';
                button.style.borderColor = '#c3e6cb';
            }
        });
        
        // Disable buttons temporarily
        setTimeout(() => {
            buttons.forEach(button => {
                button.style.backgroundColor = '';
                button.style.borderColor = '';
            });
        }, 1500);
    }
}

// Handle hint button click
function handleHintClick() {
    state.hintDisplayed = true;
    state.hintUsed.add(state.currentSymbolIndex);
    
    // Update button text based on mode
    const hintButton = document.getElementById('hint-button');
    const submitButton = document.getElementById('submit-button');
    const t = translations[state.interfaceLanguage];
    
    if (hintButton) {
        hintButton.style.display = 'none';
    }
    
    if (submitButton) {
        submitButton.textContent = t.next;
    }
    
    render();
}

// Finish the exercise and show results
function finishExercise() {
    state.isRunning = false;
    state.showResult = true;
    
    // Calculate final score
    state.score = Math.round((state.cleanQuestions / state.totalQuestions) * 100);
    
    render();
}

// Restart the exercise
function restartExercise() {
    // Reset to initial state
    state.interfaceLanguage = 'en';
    state.phoneticAlphabet = 'nato';
    state.exerciseMode = 'keyboard';
    state.currentSymbolIndex = 0;
    state.shuffledSymbols = [];
    state.score = 0;
    state.hintUsed = new Set();
    state.totalQuestions = 0;
    state.cleanQuestions = 0;
    state.isRunning = false;
    state.showResult = false;
    state.hintDisplayed = false;
    
    render();
}

// Load data and initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', loadBenchmarkData);