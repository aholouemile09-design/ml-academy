import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

// Modules PMP qui comptent pour chaque domaine ECO
const PMP_DOMAIN_MODULES = {
  people: ["people"],
  process: ["process"],
  business: ["business"],
  agile: ["agile-hybride"],
};

function pct(score, total) {
  if (!total) return null;
  return Math.round((score / total) * 100);
}

function masteryColor(p) {
  if (p === null) return "bg-ink-700";
  if (p >= 80) return "bg-emerald-500";
  if (p >= 50) return "bg-amber-400";
  return "bg-rose-500";
}

function masteryLabel(p) {
  if (p === null) return "Non évalué";
  if (p >= 80) return "Maîtrisé";
  if (p >= 50) return "En progrès";
  return "À revoir";
}

function masteryTextColor(p) {
  if (p === null) return "text-slate-500";
  if (p >= 80) return "text-emerald-400";
  if (p >= 50) return "text-amber-400";
  return "text-rose-400";
}

export function computeMlMastery(quizScores) {
  return CURRICULUM.map((mod) => {
    const entry = quizScores[mod.id];
    const p = entry ? pct(entry.score, entry.total) : null;
    return {
      id: mod.id,
      title: mod.title,
      icon: mod.icon,
      pct: p,
      color: masteryColor(p),
      textColor: masteryTextColor(p),
      label: masteryLabel(p),
    };
  });
}

export function computeWebMastery(quizScores) {
  return WEB_CURRICULUM.map((mod) => {
    const entry = quizScores[mod.id];
    const p = entry ? pct(entry.score, entry.total) : null;
    return {
      id: mod.id,
      title: mod.title,
      icon: mod.icon,
      pct: p,
      color: masteryColor(p),
      textColor: masteryTextColor(p),
      label: masteryLabel(p),
    };
  });
}

export function computePmpMastery(quizScores) {
  return PMP_CURRICULUM.map((mod) => {
    const entry = quizScores[mod.id];
    const p = entry ? pct(entry.score, entry.total) : null;
    return {
      id: mod.id,
      title: mod.title,
      icon: mod.icon,
      pct: p,
      color: masteryColor(p),
      textColor: masteryTextColor(p),
      label: masteryLabel(p),
    };
  });
}

// Indice de préparation PMP (0–100)
// Pondéré : People 33%, Process 41%, Business 26% — examen blanc compte double
export function computePmpReadiness(quizScores) {
  const domainScores = {};
  for (const [domain, mods] of Object.entries(PMP_DOMAIN_MODULES)) {
    const entries = mods.map(id => quizScores[id]).filter(Boolean);
    if (entries.length === 0) { domainScores[domain] = null; continue; }
    const avg = entries.reduce((s, e) => s + (e.score / e.total), 0) / entries.length;
    domainScores[domain] = Math.round(avg * 100);
  }

  const examBlanc = quizScores["examen-blanc"];
  const examScore = examBlanc ? pct(examBlanc.score, examBlanc.total) : null;

  // Pondérations ECO 2026
  const weights = [
    { score: domainScores.people, w: 0.20 },
    { score: domainScores.process, w: 0.25 },
    { score: domainScores.business, w: 0.16 },
    { score: domainScores.agile, w: 0.14 },
    { score: examScore, w: 0.25 },
  ].filter(x => x.score !== null);

  if (weights.length === 0) return { index: null, domainScores, examScore };

  const totalW = weights.reduce((s, x) => s + x.w, 0);
  const index = Math.round(weights.reduce((s, x) => s + x.score * x.w, 0) / totalW);

  return { index, domainScores, examScore };
}
