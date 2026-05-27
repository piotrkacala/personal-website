(async () => {
  // Fetch the alphabets JSON from the server
  const res = await fetch("./benchmark-data/alphabets.json");
  const data = await res.json();

  const select = document.getElementById("alphabetSelect");
  const letterDiv = document.getElementById("letterDisplay");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentAlphabet = null;
  let index = 0;

  function populateSelect() {
    data.forEach((a, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = a.name || `Alphabet ${i + 1}`;
      select.appendChild(opt);
    });
    // Load the first alphabet by default
    loadAlphabet(0);
  }

  function loadAlphabet(i) {
    currentAlphabet = data[i];
    index = 0;
    showLetter();
  }

  function showLetter() {
    if (!currentAlphabet || !Array.isArray(currentAlphabet.entries)) {
      letterDiv.textContent = "No entries available";
      return;
    }
    const entry =
      currentAlphabet.entries[index % currentAlphabet.entries.length];
    letterDiv.textContent = `${entry.char}: ${entry.word}`;
  }

  // UI event listeners
  select.addEventListener("change", (e) =>
    loadAlphabet(Number(e.target.value)),
  );
  prevBtn.addEventListener("click", () => {
    index =
      (index - 1 + currentAlphabet.entries.length) %
      currentAlphabet.entries.length;
    showLetter();
  });
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % currentAlphabet.entries.length;
    showLetter();
  });

  populateSelect();
})();
