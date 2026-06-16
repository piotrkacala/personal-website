export function calculateScorePercent(totalQuestions, hintedQuestions) {
  if (totalQuestions <= 0) {
    return 0;
  }

  return Math.round(((totalQuestions - hintedQuestions) / totalQuestions) * 100);
}
