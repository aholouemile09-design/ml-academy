/**
 * SM-2 spaced repetition algorithm.
 * Returns updated card fields based on whether the answer was correct.
 *
 * quality: 0 = wrong, 1 = correct
 */
export function sm2(card, quality) {
  let { easiness, interval_days, repetitions } = card;

  if (quality === 0) {
    repetitions = 0;
    interval_days = 1;
  } else {
    if (repetitions === 0) interval_days = 1;
    else if (repetitions === 1) interval_days = 6;
    else interval_days = Math.round(interval_days * easiness);

    easiness = Math.max(1.3, easiness + 0.1 - (1 - quality) * (0.08 + (1 - quality) * 0.02));
    repetitions += 1;
  }

  const due = new Date();
  due.setDate(due.getDate() + interval_days);
  const due_date = due.toISOString().split("T")[0];

  return { easiness, interval_days, repetitions, due_date, last_result: quality === 1 };
}
