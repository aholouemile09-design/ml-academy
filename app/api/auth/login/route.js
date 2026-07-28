// Connexion côté serveur avec protection anti brute-force.
//
// Pourquoi passer par une route serveur plutôt que d'appeler Supabase
// directement depuis le navigateur : c'est le seul endroit où l'on peut
// compter les tentatives échouées et bloquer un bot. Le client n'appelle
// plus signInWithPassword lui-même ; la session est posée en cookie ici.

import { createClient } from "@/lib/supabase/server";
import {
  getClientKey,
  checkLoginAllowed,
  recordLoginFailure,
  clearLoginFailures,
  LOGIN_MAX_ATTEMPTS,
} from "@/lib/rateLimit";

const MAX_FIELD_LENGTH = 200;

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password || email.length > MAX_FIELD_LENGTH || password.length > MAX_FIELD_LENGTH) {
      return Response.json({ error: "invalid_credentials" }, { status: 400 });
    }

    const ip = getClientKey(req);

    // Deux compteurs :
    //  - par IP+email : bloque le bourrinage d'un compte précis
    //  - par IP seule : bloque le balayage de plusieurs comptes depuis une même source
    const emailKey = `login:${ip}:${email}`;
    const ipKey = `login-ip:${ip}`;

    for (const key of [emailKey, ipKey]) {
      const gate = checkLoginAllowed(key);
      if (!gate.allowed) {
        return Response.json(
          {
            error: "too_many_attempts",
            retryAfterSec: gate.retryAfterSec,
            message: `Trop de tentatives de connexion. Réessaie dans ${Math.ceil(gate.retryAfterSec / 60)} minute(s).`,
          },
          { status: 429, headers: { "Retry-After": String(gate.retryAfterSec) } }
        );
      }
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const failure = recordLoginFailure(emailKey);
      recordLoginFailure(ipKey);

      // Message volontairement identique pour un email inconnu et un mot de
      // passe faux : ne pas révéler quels comptes existent.
      return Response.json(
        {
          error: "invalid_credentials",
          message: "Email ou mot de passe incorrect.",
          remaining: failure.remaining,
        },
        { status: 401 }
      );
    }

    // Succès → on remet les compteurs à zéro.
    clearLoginFailures(emailKey);
    clearLoginFailures(ipKey);

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Login route error:", e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}

export const maxAttempts = LOGIN_MAX_ATTEMPTS;
