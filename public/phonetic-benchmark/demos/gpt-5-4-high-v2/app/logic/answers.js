export function normalizeAnswer(value, locale = "pl-PL") {
  return value.trim().toLocaleUpperCase(locale);
}

export function isKeyboardAnswerCorrect(input, codeword) {
  return normalizeAnswer(input) === normalizeAnswer(codeword);
}
