import { indexRecherche } from "@/lib/contenuLecons";

const MAX_RESULTATS = 40;
const LONGUEUR_EXTRAIT = 160;

/** L'extrait autour de la première occurrence, ou le début de la leçon. */
function extraire(contenu, requete) {
  // Les marques de markdown se liraient telles quelles dans l'extrait, qui
  // n'est pas rendu : « le **gradient** ∇f » au lieu de « le gradient ∇f ».
  const texte = contenu
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const i = texte.toLowerCase().indexOf(requete);
  if (i === -1) return texte.slice(0, LONGUEUR_EXTRAIT).trim();
  const debut = Math.max(0, i - 50);
  const fin = Math.min(texte.length, debut + LONGUEUR_EXTRAIT);
  return (debut > 0 ? "…" : "") + texte.slice(debut, fin).trim() + (fin < texte.length ? "…" : "");
}

/**
 * Recherche plein texte dans les leçons.
 *
 * Elle se faisait côté navigateur sur un index construit à partir des trois
 * curriculums — ce qui obligeait à livrer tout le contenu du site à chaque
 * visiteur de la page. Maintenant que le texte est sur le serveur, la
 * recherche y reste aussi.
 */
export async function GET(req) {
  const brut = new URL(req.url).searchParams.get("q");
  const requete = typeof brut === "string" ? brut.trim().slice(0, 120).toLowerCase() : "";

  if (requete.length < 2) {
    return Response.json({ resultats: [] });
  }

  const resultats = indexRecherche()
    .filter((e) => e.cherchable.includes(requete))
    .slice(0, MAX_RESULTATS)
    .map(({ piste, lecon, titreLecon, duree, module: mod, titreModule, contenu }) => ({
      piste,
      lecon,
      titreLecon,
      duree,
      module: mod,
      titreModule,
      extrait: extraire(contenu, requete),
    }));

  return Response.json({ resultats });
}
