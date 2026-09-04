// Demande de réinitialisation de mot de passe.
//
// Deux règles de sécurité gouvernent cette route :
//
// 1. La réponse est TOUJOURS identique, que l'email existe ou non. Un
//    formulaire d'oubli qui répond « compte inconnu » devient un outil
//    d'énumération : on y teste une liste d'adresses pour savoir lesquelles
//    sont inscrites. On renvoie donc le même message dans tous les cas, et
//    on ne remonte jamais l'erreur Supabase au client.
//
// 2. L'envoi est limité en débit. Sans plafond, la route sert de robinet à
//    spam : n'importe qui peut faire pleuvoir des mails de réinitialisation
//    sur l'adresse d'un tiers.

import { createClient } from "@/lib/supabase/server";
import { getClientKey, rateLimit } from "@/lib/rateLimit";

const HEURE_MS = 60 * 60 * 1000;
const MAX_PAR_EMAIL = 3; // par heure — un utilisateur légitime n'en a jamais besoin de plus
const MAX_PAR_IP = 8; // par heure — laisse passer un foyer partagé, bloque un script
const LONGUEUR_MAX = 200;

/**
 * Origine réelle de la requête.
 * `new URL(req.url).origin` renvoie l'URL interne derrière le proxy Vercel ;
 * le lien de réinitialisation doit pointer vers le domaine public.
 */
function getOrigin(req) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!host) return new URL(req.url).origin;
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function POST(req) {
  // Message unique, renvoyé quoi qu'il arrive.
  const reponseNeutre = Response.json({
    ok: true,
    message:
      "Si un compte existe avec cette adresse, un lien de réinitialisation vient d'être envoyé.",
  });

  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || email.length > LONGUEUR_MAX || !email.includes("@")) {
      return Response.json({ error: "invalid_email" }, { status: 400 });
    }

    const ip = getClientKey(req);

    const parEmail = rateLimit(`reset:${email}`, { limit: MAX_PAR_EMAIL, windowMs: HEURE_MS });
    const parIp = rateLimit(`reset-ip:${ip}`, { limit: MAX_PAR_IP, windowMs: HEURE_MS });

    if (!parEmail.allowed || !parIp.allowed) {
      const attente = Math.max(parEmail.retryAfterMs || 0, parIp.retryAfterMs || 0);
      return Response.json(
        {
          error: "too_many_requests",
          message: `Trop de demandes. Réessaie dans ${Math.ceil(attente / 60000)} minute(s).`,
        },
        { status: 429, headers: { "Retry-After": String(Math.ceil(attente / 1000)) } }
      );
    }

    const supabase = createClient();

    // Le lien du mail arrive sur /auth/callback, qui échange le code contre
    // une session puis renvoie vers le formulaire de nouveau mot de passe.
    // `type=recovery` autorise le callback à poser le laissez-passer que la
    // route de changement exigera.
    const redirectTo = `${getOrigin(req)}/auth/callback?type=recovery&next=${encodeURIComponent(
      "/reinitialiser-mot-de-passe"
    )}`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    // Journalisé côté serveur, jamais renvoyé : l'erreur dirait au demandeur
    // si l'adresse est connue.
    if (error) console.error("resetPasswordForEmail:", error.message);

    return reponseNeutre;
  } catch (e) {
    console.error("Forgot-password route error:", e);
    return reponseNeutre;
  }
}
