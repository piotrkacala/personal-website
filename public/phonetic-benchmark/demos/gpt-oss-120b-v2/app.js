// app.js - Vanilla JS to load alphabets and handle UI interactions

document.addEventListener('DOMContentLoaded', () => {
  const alphabetSelect = document.getElementById('alphabet-select');
  const alphabetList = document.getElementById('alphabet-list');
  const themeToggle = document.getElementById('theme-toggle');

  // Theme handling
  const root = document.documentElement;
  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  // Initialize theme from localStorage or default light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Fetch alphabets data once
  let alphabetsData = null;
  fetch('./api/alphabets')
    .then((res) => res.json())
    .then((data) => {
      alphabetsData = data;
      renderAlphabet();
    })
    .catch((err) => {
      console.error('Failed to load alphabets:', err);
      alphabetList.innerHTML = '<p style="color:red;">Failed to load data.</p>';
    });

  // Render based on selected alphabet
  const renderAlphabet = () => {
    if (!alphabetsData) return;
    const selected = alphabetSelect.value;
    const list = selected === 'polish' ? alphabetsData.polish : alphabetsData.nato;
    const cards = list
      .map(
        (item) => `
      <div class="card">
        <div class="symbol">${item.symbol}</div>
        <div class="codeword">${item.codeword}</div>
      </div>`
      )
      .join('');
    alphabetList.innerHTML = cards;
  };

  alphabetSelect.addEventListener('change', renderAlphabet);
});
