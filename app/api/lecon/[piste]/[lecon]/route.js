import { lireLecon } from "@/lib/contenuLecons";

/**
 * Le texte d'une leçon.
 *
 * Les deux segments d'URL ne sont pas assainis mais vérifiés : `lireLecon`
 * n'accepte qu'un couple piste/identifiant présent au catalogue. Un
 * identifiant inconnu — forgé ou simplement faux — repart en 404, jamais en
 * 403 : on ne confirme pas l'existence de ce qu'on refuse.
 */
export async function GET(_req, { params }) {
  const contenu = lireLecon(params.piste, params.lecon);

  if (contenu === null) {
    return Response.json({ error: "lecon_introuvable" }, { status: 404 });
  }

  return Response.json(
    { contenu },
    // Le contenu ne change qu'au redéploiement : le navigateur peut le garder
    // une heure et le revalider en tâche de fond pendant une journée.
    { headers: { "cache-control": "public, max-age=3600, stale-while-revalidate=86400" } }
  );
}
