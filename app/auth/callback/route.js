// Point d'atterrissage de tous les liens envoyés par mail : confirmation
// d'inscription, changement d'adresse, réinitialisation de mot de passe.
//
// Supabase peut envoyer deux formes de lien selon le gabarit configuré :
//   - `?code=…`        (flux PKCE, gabarit par défaut)
//   - `?token_hash=…&type=…` (gabarit à jeton, fonctionne d'un appareil à l'autre)
// Les deux sont acceptées ici, pour que le site continue de fonctionner si
// les gabarits Supabase changent.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { RECOVERY_COOKIE, RECOVERY_MAX_AGE_S } from "@/lib/authRecovery";

/**
 * Un paramètre `next` vient de l'URL, donc de l'extérieur. Sans contrôle, il
 * suffirait de forger …/auth/callback?next=https://site-pirate pour se servir
 * de notre domaine comme tremplin de redirection.
 * On n'accepte donc qu'un chemin interne : commence par « / », et pas par
 * « // » ni « /\ » qui désignent un autre hôte.
 */
function cheminInterne(valeur, defaut = "/espace") {
  if (typeof valeur !== "string" || !valeur.startsWith("/")) return defaut;
  if (valeur.startsWith("//") || valeur.startsWith("/\\")) return defaut;
  return valeur;
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = cheminInterne(searchParams.get("next"));

  // Supabase peut refuser le lien avant même de nous le renvoyer
  // (expiré, déjà utilisé…). Le motif reste dans l'URL.
  const erreurAmont = searchParams.get("error_description") || searchParams.get("error");
  if (erreurAmont) {
    return NextResponse.redirect(`${origin}/mot-de-passe-oublie?erreur=lien`);
  }

  const supabase = createClient();
  let erreur = null;

  // `type` vient de l'URL : on ne le transmet à Supabase que s'il fait partie
  // des flux que ce site utilise réellement.
  const TYPES_ADMIS = ["recovery", "signup", "invite", "email_change", "magiclink"];

  if (tokenHash && TYPES_ADMIS.includes(type)) {
    ({ error: erreur } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash }));
  } else if (code) {
    ({ error: erreur } = await supabase.auth.exchangeCodeForSession(code));
  } else {
    erreur = new Error("lien incomplet");
  }

  if (erreur) {
    // Cas le plus fréquent en pratique : le lien a été ouvert dans un autre
    // navigateur que celui qui a fait la demande. La page d'oubli l'explique.
    const destination = type === "recovery" ? "/mot-de-passe-oublie?erreur=lien" : "/connexion?erreur=lien";
    return NextResponse.redirect(`${origin}${destination}`);
  }

  // Laissez-passer de réinitialisation.
  //
  // Changer de mot de passe sans fournir l'ancien est une opération que seul
  // un lien reçu par mail doit autoriser. Ce cookie atteste que la session
  // vient d'être ouverte par un tel lien ; la route de changement l'exige et
  // le consomme. httpOnly : aucun script de la page ne peut le fabriquer.
  if (type === "recovery") {
    cookies().set(RECOVERY_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: RECOVERY_MAX_AGE_S,
    });
  }

  return NextResponse.redirect(`${origin}${next}`);
}
