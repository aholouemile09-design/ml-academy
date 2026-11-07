import { createClient } from "@/lib/supabase/server";
import { lireHistorique } from "@/lib/conversationTuteur";

/**
 * L'historique d'une conversation avec le tuteur.
 *
 * Une liste vide pour un visiteur non connecté n'est pas un refus : il n'y a
 * simplement rien à reprendre. L'autorisation porte sur la ressource — on ne
 * lit que les messages de l'appelant, par le `user_id` et par le RLS.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const piste = searchParams.get("piste") || null;
  const lecon = searchParams.get("lecon") || null;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return Response.json({ messages: [] });

    return Response.json({ messages: await lireHistorique(supabase, user.id, piste, lecon) });
  } catch {
    return Response.json({ messages: [] });
  }
}
