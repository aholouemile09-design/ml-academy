// Enregistrement du nouveau mot de passe, après un lien de récupération.
//
// Le changement passe par le serveur et non par le navigateur pour une
// raison précise : c'est le seul endroit où la politique de mot de passe est
// réellement appliquée. Une validation faite uniquement côté client se
// contourne avec la console du navigateur ; ici, elle est exécutée avant
// tout appel à Supabase.

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { validatePassword } from "@/lib/passwordPolicy";
import { RECOVERY_COOKIE } from "@/lib/authRecovery";
import { getClientKey, rateLimit } from "@/lib/rateLimit";

const LONGUEUR_MAX = 200;

export async function POST(req) {
  try {
    const jar = cookies();

    // Le laissez-passer posé par /auth/callback. Sans lui, une session
    // ordinaire — un navigateur resté ouvert, par exemple — pourrait changer
    // le mot de passe sans jamais fournir l'ancien.
    if (jar.get(RECOVERY_COOKIE)?.value !== "1") {
      return Response.json(
        {
          error: "no_recovery_session",
          message:
            "Ce lien de réinitialisation n'est plus valide. Demande un nouveau lien pour continuer.",
        },
        { status: 401 }
      );
    }

    const ip = getClientKey(req);
    const debit = rateLimit(`reset-set:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (!debit.allowed) {
      return Response.json(
        { error: "too_many_requests", message: "Trop de tentatives. Réessaie dans quelques minutes." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password || password.length > LONGUEUR_MAX) {
      return Response.json({ error: "invalid_password" }, { status: 400 });
    }

    const check = validatePassword(password);
    if (!check.valid) {
      return Response.json({ error: "weak_password", message: check.message }, { status: 400 });
    }

    const supabase = createClient();

    // getUser() revalide le jeton auprès de Supabase — contrairement à
    // getSession(), qui se contente de lire le cookie et se laisserait
    // tromper par un cookie forgé.
    const {
      data: { user },
      error: erreurUser,
    } = await supabase.auth.getUser();

    if (erreurUser || !user) {
      jar.delete(RECOVERY_COOKIE);
      return Response.json(
        {
          error: "no_session",
          message: "Ta session de réinitialisation a expiré. Demande un nouveau lien.",
        },
        { status: 401 }
      );
    }

    const { error: erreurUpdate } = await supabase.auth.updateUser({ password });

    if (erreurUpdate) {
      // Message renvoyé tel quel : à ce stade l'utilisateur est authentifié,
      // rien de ce que dit Supabase ici ne renseigne un inconnu.
      return Response.json(
        { error: "update_failed", message: erreurUpdate.message },
        { status: 400 }
      );
    }

    // Le laissez-passer a servi : il ne doit pas pouvoir resservir.
    jar.delete(RECOVERY_COOKIE);

    // Un mot de passe oublié peut l'avoir été parce que quelqu'un d'autre l'a
    // changé, ou parce qu'une session traîne sur un appareil perdu. On ferme
    // toutes les autres sessions ; celle-ci reste ouverte.
    try {
      await supabase.auth.signOut({ scope: "others" });
    } catch (e) {
      console.error("signOut(others) après réinitialisation:", e);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Reset-password route error:", e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
