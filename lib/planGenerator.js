import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

const CURRICULA = { ml: CURRICULUM, web: WEB_CURRICULUM, pmp: PMP_CURRICULUM };

function parseDuration(str = "") {
  const m = str.match(/(\d+)/);
  return m ? parseInt(m[1]) : 30;
}

function dateStr(date) {
  return date.toISOString().split("T")[0];
}

function addDays(from, n) {
  const d = new Date(from);
  d.setDate(d.getDate() + n);
  return dateStr(d);
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function nextPreferredDay(fromStr, preferredDays) {
  const d = new Date(fromStr);
  d.setDate(d.getDate() + 1);
  for (let i = 0; i < 14; i++) {
    if (preferredDays.includes(d.getDay())) return dateStr(d);
    d.setDate(d.getDate() + 1);
  }
  return dateStr(d);
}

export function generatePlan({ track, targetDate, hoursPerWeek, preferredDays, completedLessons = [] }) {
  const curriculum = CURRICULA[track] || CURRICULUM;
  const today = dateStr(new Date());
  const daysAvailable = daysBetween(today, targetDate);

  if (daysAvailable <= 0) return { items: [], warning: "La date cible est déjà passée." };

  // Build task list: lessons + quizzes not yet done
  const tasks = [];
  for (const mod of curriculum) {
    for (const lesson of mod.lessons) {
      if (completedLessons.includes(lesson.id)) continue;
      tasks.push({
        type: "lesson",
        moduleId: mod.id,
        moduleTitle: mod.title,
        lessonId: lesson.id,
        title: lesson.title,
        minutes: parseDuration(lesson.duration),
      });
    }
    if (mod.quiz?.length > 0) {
      tasks.push({
        type: "quiz",
        moduleId: mod.id,
        moduleTitle: mod.title,
        lessonId: null,
        title: `Quiz — ${mod.title}`,
        minutes: Math.max(10, Math.round(mod.quiz.length * 1.5)),
      });
    }
  }

  const totalMinutesNeeded = tasks.reduce((s, t) => s + t.minutes, 0);
  const minutesPerWeek = hoursPerWeek * 60;
  const weeksNeeded = totalMinutesNeeded / minutesPerWeek;
  const daysNeeded = Math.ceil(weeksNeeded * 7);

  const warning = daysNeeded > daysAvailable
    ? `⚠️ Il faudrait environ ${Math.ceil(weeksNeeded)} semaine(s) à ce rythme, mais il ne reste que ${Math.ceil(daysAvailable / 7)} semaine(s) avant ta date cible. Augmente tes heures ou repousse la date.`
    : null;

  // Distribute tasks over preferred days
  const minutesPerDay = preferredDays.length > 0
    ? (minutesPerWeek / preferredDays.length)
    : minutesPerWeek / 5;

  const items = [];
  let cursor = today;
  let dayMinutes = 0;
  let taskIndex = 0;

  // Advance to first preferred day
  if (preferredDays.length > 0 && !preferredDays.includes(new Date(cursor).getDay())) {
    cursor = nextPreferredDay(cursor, preferredDays);
  } else {
    cursor = addDays(cursor, 1);
    if (preferredDays.length > 0 && !preferredDays.includes(new Date(cursor).getDay())) {
      cursor = nextPreferredDay(cursor, preferredDays);
    }
  }

  let safetyBreak = 0;
  while (taskIndex < tasks.length && cursor <= targetDate && safetyBreak < 500) {
    safetyBreak++;
    const task = tasks[taskIndex];

    if (dayMinutes + task.minutes <= minutesPerDay + 15) {
      items.push({ ...task, date: cursor });
      dayMinutes += task.minutes;
      taskIndex++;
    } else {
      // Move to next preferred day
      cursor = nextPreferredDay(cursor, preferredDays.length > 0 ? preferredDays : [1,2,3,4,5]);
      dayMinutes = 0;
    }
  }

  // Add review slots every 7 days of study
  const reviewDates = new Set();
  let reviewCursor = addDays(today, 7);
  while (reviewCursor <= targetDate) {
    reviewDates.add(reviewCursor);
    reviewCursor = addDays(reviewCursor, 7);
  }
  for (const date of reviewDates) {
    items.push({ type: "review", date, title: "🃏 Session de révision espacée", minutes: 20, moduleId: null, lessonId: null, moduleTitle: null });
  }

  items.sort((a, b) => a.date.localeCompare(b.date));

  const remaining = tasks.length - taskIndex;
  const finalWarning = remaining > 0 && !warning
    ? `${remaining} tâche(s) n'ont pas pu être planifiées avant la date cible. Augmente tes heures ou repousse la date.`
    : warning;

  return { items, warning: finalWarning, totalMinutes: totalMinutesNeeded, weeksNeeded: Math.ceil(weeksNeeded) };
}

export function exportIcs(items, trackLabel) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CodeGraft Academy//Plan d'étude//FR",
    `X-WR-CALNAME:CodeGraft - ${trackLabel}`,
    "X-WR-TIMEZONE:UTC",
  ];

  for (const item of items) {
    const dtstart = item.date.replace(/-/g, "");
    const uid = `${dtstart}-${item.moduleId || "review"}-${item.lessonId || "0"}@codegraft`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtstart}`,
      `SUMMARY:${item.title}`,
      item.moduleTitle ? `DESCRIPTION:Module: ${item.moduleTitle}\\nDurée estimée: ${item.minutes} min` : `DESCRIPTION:Durée estimée: ${item.minutes} min`,
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
