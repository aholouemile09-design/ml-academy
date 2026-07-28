/**
 * Suivi du temps d'étude.
 *
 * Deux mécanismes distincts :
 *
 *  1. L'ÉTAT DU MINUTEUR (`codegraft-timer`) — pour que le compte à rebours
 *     survive à un rafraîchissement. On stocke un horodatage de fin absolu
 *     plutôt qu'un nombre de secondes restantes : c'est la seule façon de
 *     rester juste si l'onglet est mis en arrière-plan (les navigateurs
 *     bridant setInterval à ~1 Hz, voire moins, sur les onglets inactifs).
 *
 *  2. LE TEMPS PAR MODULE (`codegraft-module-time`) — le cumul du temps
 *     réellement passé sur chaque module, affiché à la complétion.
 */

const TIMER_KEY = "codegraft-timer";
const MODULE_TIME_KEY = "codegraft-module-time";

const canUseStorage = () => typeof window !== "undefined" && !!window.localStorage;

/* ── État du minuteur ────────────────────────────────────────────────────── */

export function loadTimerState() {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (typeof s?.totalSeconds !== "number") return null;

    // En cours : on recalcule le restant depuis l'horodatage de fin.
    if (s.running && typeof s.endsAt === "number") {
      const remaining = Math.max(0, Math.round((s.endsAt - Date.now()) / 1000));
      return { ...s, remaining, running: remaining > 0, finished: remaining === 0 };
    }
    return { ...s, running: false };
  } catch {
    return null;
  }
}

export function saveTimerState(state) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(TIMER_KEY, JSON.stringify(state));
  } catch {
    /* quota dépassé ou mode privé — le minuteur fonctionne quand même en mémoire */
  }
}

export function clearTimerState() {
  if (!canUseStorage()) return;
  try {
    localStorage.removeItem(TIMER_KEY);
  } catch {
    /* ignoré */
  }
}

/* ── Temps passé par module ──────────────────────────────────────────────── */

export function loadModuleTime() {
  if (!canUseStorage()) return {};
  try {
    return JSON.parse(localStorage.getItem(MODULE_TIME_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Ajoute des secondes au cumul d'un module. Retourne le nouveau total. */
export function addModuleSeconds(moduleId, seconds) {
  if (!moduleId || !seconds || seconds <= 0) return 0;
  const all = loadModuleTime();
  const next = (all[moduleId] || 0) + Math.round(seconds);
  all[moduleId] = next;
  if (canUseStorage()) {
    try {
      localStorage.setItem(MODULE_TIME_KEY, JSON.stringify(all));
    } catch {
      /* ignoré */
    }
  }
  return next;
}

export function getModuleSeconds(moduleId) {
  return loadModuleTime()[moduleId] || 0;
}

/** Fusionne deux relevés (local + serveur) en gardant le maximum par module. */
export function mergeModuleTime(a = {}, b = {}) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) {
    out[k] = Math.max(out[k] || 0, v || 0);
  }
  return out;
}

/* ── Formatage ───────────────────────────────────────────────────────────── */

/** 3725 → "1 h 02 min" · 125 → "2 min" · 45 → "45 s" */
export function formatDuration(seconds) {
  const s = Math.max(0, Math.round(seconds || 0));
  if (s < 60) return `${s} s`;

  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);

  if (h === 0) return `${m} min`;
  return `${h} h ${String(m).padStart(2, "0")} min`;
}
