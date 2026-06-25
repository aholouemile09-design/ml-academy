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
