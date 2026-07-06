/**
 * Compute current streak and weekly activity from an array of ISO date strings.
 * Dates are in "YYYY-MM-DD" format (local timezone).
 */

export function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export function computeStreak(activityDates = []) {
  if (!activityDates.length) return { current: 0, record: 0 };

  const unique = [...new Set(activityDates)].sort().reverse();
  const today = todayStr();
  const yesterday = offsetDay(today, -1);

  // Streak starts only if today or yesterday has activity
  if (unique[0] !== today && unique[0] !== yesterday) return { current: 0 };

  let streak = 0;
  let cursor = unique[0] === today ? today : yesterday;

  for (const date of unique) {
    if (date === cursor) {
      streak++;
      cursor = offsetDay(cursor, -1);
    } else if (date < cursor) {
      break;
    }
  }
  return { current: streak };
}

export function weeklyActivity(activityDates = [], goalType = "lessons", completedLessons = [], quizScores = {}) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); // Monday
  const startStr = startOfWeek.toISOString().split("T")[0];
  const todayStr = today.toISOString().split("T")[0];

  // Count activity days this week (for streak display)
  const activeDaysThisWeek = activityDates.filter(d => d >= startStr && d <= todayStr).length;

  return { activeDaysThisWeek, startStr };
}

function offsetDay(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
