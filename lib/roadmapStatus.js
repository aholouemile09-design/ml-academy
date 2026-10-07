// Dérive l'état des jalons de la roadmap à partir de la progression réelle de
// l'utilisateur, au lieu d'un statut écrit en dur qui se périme.

import { CURRICULUM } from "@/lib/curriculum";

/**
 * Taux d'avancement par module : { [moduleId]: { done, total, complete, started } }
 */
export function moduleCompletion(completedLessons = [], curriculum = CURRICULUM) {
  const set = new Set(completedLessons);
  const out = {};
  for (const mod of curriculum) {
    const lessons = mod.lessons || [];
    const done = lessons.filter(l => set.has(l.id)).length;
    out[mod.id] = {
      done,
      total: lessons.length,
      complete: lessons.length > 0 && done === lessons.length,
      started: done > 0,
    };
  }
  return out;
}

/**
 * Statut d'un jalon :
 *   "done"    — tous ses modules sont terminés
 *   "current" — au moins un module commencé, pas tous terminés
 *   "todo"    — rien de commencé
 * Un jalon sans `modules` (axe ingénierie, administratif) garde son statut écrit.
 */
export function milestoneStatus(milestone, completion) {
  const ids = milestone?.modules;
  if (!ids || ids.length === 0) return milestone?.status || "todo";

  const stats = ids.map(id => completion[id]).filter(Boolean);
  if (stats.length === 0) return milestone?.status || "todo";

  if (stats.every(s => s.complete)) return "done";
  if (stats.some(s => s.started)) return "current";
  return "todo";
}

/**
 * Avancement d'une phase, en pourcentage de leçons terminées sur l'ensemble de
 * ses jalons rattachés à des modules. Renvoie null si la phase n'en a aucun.
 */
export function phaseProgress(phase, completion) {
  const ids = [...new Set((phase.milestones || []).flatMap(m => m.modules || []))];
  if (ids.length === 0) return null;
  let done = 0, total = 0;
  for (const id of ids) {
    const s = completion[id];
    if (!s) continue;
    done += s.done;
    total += s.total;
  }
  if (total === 0) return null;
  return Math.round((done / total) * 100);
}
