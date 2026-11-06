#!/usr/bin/env node
/**
 * Vérificateur du middleware de session
 *
 *   node scripts/verifier-middleware.js
 *
 * Rejoue la panne du 03/11/2026 : le projet Supabase mis en pause avait rendu
 * son domaine introuvable, et comme le middleware interrogeait Supabase sur
 * toutes les routes, chaque page partait en timeout de 25 s.
 *
 * Le script lance `next dev` avec une URL Supabase injoignable, puis vérifie
 * que les pages publiques ne passent plus par le middleware et que les routes
 * serveur dégradent au lieu de bloquer.
 *
 * Occupe .next : ne pas lancer pendant un build.
 */

const { spawn } = require("child_process");
const path = require("path");

const RACINE = path.resolve(__dirname, "..");
const PORT = 3999;
const BASE = `http://127.0.0.1:${PORT}`;
const PLAFOND_MS = 8000; // délai session (3 s) + compilation Next, large exprès

const serveur = spawn("npx", ["next", "dev", "--port", String(PORT)], {
  cwd: RACINE,
  shell: true,
  env: {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_URL: "https://hote-supabase-injoignable.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "cle-factice",
  },
});

const arreter = () => { try { process.kill(-serveur.pid); } catch {} serveur.kill("SIGKILL"); };

async function attendrePret(limiteMs = 90000) {
  const fin = Date.now() + limiteMs;
  while (Date.now() < fin) {
    try {
      await fetch(BASE, { signal: AbortSignal.timeout(2000) });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("le serveur de développement n'a pas démarré");
}

async function mesurer(chemin) {
  await fetch(BASE + chemin, { signal: AbortSignal.timeout(60000) }).catch(() => {}); // compilation
  const debut = Date.now();
  const reponse = await fetch(BASE + chemin, { signal: AbortSignal.timeout(60000) });
  return { ms: Date.now() - debut, code: reponse.status };
}

(async () => {
  let echecs = 0;
  try {
    await attendrePret();
    for (const chemin of ["/", "/connexion", "/api/reflections"]) {
      const { ms, code } = await mesurer(chemin);
      const ok = ms < PLAFOND_MS;
      if (!ok) echecs++;
      console.log(`${ok ? "OK  " : "ÉCHEC"} ${chemin} — ${code} en ${ms} ms`);
    }
  } catch (erreur) {
    console.error("ÉCHEC", erreur.message);
    echecs++;
  } finally {
    arreter();
  }
  console.log(echecs === 0 ? "\nSupabase injoignable ne bloque plus les requêtes." : `\n${echecs} échec(s).`);
  process.exit(echecs === 0 ? 0 : 1);
})();
