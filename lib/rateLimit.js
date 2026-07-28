// Limiteur de débit basique en mémoire (par instance serverless).
// Suffisant pour décourager l'abus simple ; pour une garantie stricte
// multi-instance, utiliser un store partagé (Upstash/Redis).

const buckets = new Map();
const WINDOW_MS = 60_000;

export function rateLimit(key, { limit = 20, windowMs = WINDOW_MS } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return { allowed: true };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, retryAfterMs: windowMs - (now - entry.start) };
  }
  return { allowed: true };
}

export function getClientKey(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANTI BRUTE-FORCE — spécifique à la connexion
   ═══════════════════════════════════════════════════════════════════════════
   Différence avec rateLimit() : on ne compte QUE les échecs, et une
   connexion réussie remet le compteur à zéro. Un utilisateur légitime qui
   se trompe deux fois puis réussit n'est jamais pénalisé, alors qu'un bot
   qui enchaîne les essais est bloqué au 5ᵉ échec.
   ═══════════════════════════════════════════════════════════════════════════ */

const failures = new Map();

export const LOGIN_MAX_ATTEMPTS = 5;
export const LOGIN_WINDOW_MS = 60_000;      // fenêtre de comptage : 1 min
export const LOGIN_LOCKOUT_MS = 15 * 60_000; // verrouillage après dépassement : 15 min

/** Purge opportuniste — évite que la Map ne grossisse indéfiniment. */
function sweep(now) {
  if (failures.size < 500) return;
  for (const [k, v] of failures) {
    if (now > v.expiresAt) failures.delete(k);
  }
}

/**
 * Vérifie si la clé est autorisée à tenter une connexion.
 * À appeler AVANT de valider les identifiants.
 */
export function checkLoginAllowed(key) {
  const now = Date.now();
  sweep(now);

  const entry = failures.get(key);
  if (!entry) return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS };

  // Fenêtre (ou verrou) expirée → on repart à zéro.
  if (now > entry.expiresAt) {
    failures.delete(key);
    return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS };
  }

  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.expiresAt - now,
      retryAfterSec: Math.ceil((entry.expiresAt - now) / 1000),
    };
  }

  return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS - entry.count };
}

/**
 * Enregistre un échec de connexion.
 * Au 5ᵉ échec, la clé est verrouillée pour LOGIN_LOCKOUT_MS.
 */
export function recordLoginFailure(key) {
  const now = Date.now();
  const entry = failures.get(key);

  if (!entry || now > entry.expiresAt) {
    failures.set(key, { count: 1, expiresAt: now + LOGIN_WINDOW_MS });
    return { remaining: LOGIN_MAX_ATTEMPTS - 1 };
  }

  entry.count += 1;

  // Seuil atteint → on bascule d'une fenêtre glissante à un vrai verrou.
  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    entry.expiresAt = now + LOGIN_LOCKOUT_MS;
    return { remaining: 0, lockedMs: LOGIN_LOCKOUT_MS };
  }

  return { remaining: LOGIN_MAX_ATTEMPTS - entry.count };
}

/** Connexion réussie → on efface l'historique d'échecs. */
export function clearLoginFailures(key) {
  failures.delete(key);
}
