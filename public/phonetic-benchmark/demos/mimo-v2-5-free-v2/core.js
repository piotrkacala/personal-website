function computeScore(total, hinted) {
  const clean = total - hinted;
  return Math.round((clean / total) * 100);
}

function normalizeMatch(input, codeword) {
  return input.trim().toLowerCase() === codeword.toLowerCase();
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSuggestionOptions(optionsData, alphabet, symbol) {
  return optionsData[alphabet][symbol];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeScore, normalizeMatch, shuffle, getSuggestionOptions };
}
