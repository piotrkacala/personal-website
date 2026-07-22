// Final scoring rule from docs/REQUIREMENTS.md:
//
//   total_questions  = number of symbols in the selected alphabet
//   hinted_questions = questions where the hint was used at least once
//   clean_questions  = total_questions - hinted_questions
//   score_percent    = round((clean_questions / total_questions) * 100)
//
// Wrong attempts without a hint do not reduce the score.

export function computeScorePercent(totalQuestions, hintedQuestions) {
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
    throw new RangeError(`totalQuestions must be a positive integer, got ${totalQuestions}`);
  }
  if (!Number.isInteger(hintedQuestions) || hintedQuestions < 0 || hintedQuestions > totalQuestions) {
    throw new RangeError(
      `hintedQuestions must be an integer between 0 and ${totalQuestions}, got ${hintedQuestions}`,
    );
  }
  const cleanQuestions = totalQuestions - hintedQuestions;
  return Math.round((cleanQuestions / totalQuestions) * 100);
}
