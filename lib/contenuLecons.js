import fs from "node:fs";
import path from "node:path";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

/**
 * Lecture du contenu des leçons, côté serveur uniquement.
 *
 * Le texte des leçons vit dans contenu/<piste>/<identifiant>.md et non plus
 * dans les fichiers de curriculum. Deux raisons :
 *
 * 1. Il n'est plus embarqué dans le paquet JavaScript envoyé au navigateur.
 *    Les trois curriculums pesaient 7 300 lignes ; une leçon de la longueur
 *    de celles de Coursera aurait multiplié ça par huit.
 * 2. Écrire un bloc de code dans un fichier markdown ne demande pas
 *    d'échapper les backticks. Dans les chaînes JavaScript, 64 des 101 leçons
 *    en contenaient — autant d'occasions de casser le fichier en écrivant.
 */

const PISTES = { ml: CURRICULUM, web: WEB_CURRICULUM, pmp: PMP_CURRICULUM };
const RACINE = path.join(process.cwd(), "contenu");

/**
 * Le catalogue des leçons qui existent, construit depuis le curriculum.
 *
 * C'est lui qui autorise l'accès : un identifiant absent du catalogue n'est
 * jamais transformé en chemin de fichier. La traversée de répertoire n'est
 * donc pas filtrée, elle est impossible — « ../../.env » n'est pas un
 * identifiant de leçon connu, et la requête s'arrête avant le disque.
 */
const CATALOGUE = new Map();
for (const [piste, curriculum] of Object.entries(PISTES)) {
  for (const mod of curriculum) {
    for (const lecon of mod.lessons) {
      CATALOGUE.set(`${piste}/${lecon.id}`, {
        piste,
        lecon: lecon.id,
        titreLecon: lecon.title,
        duree: lecon.duration,
        module: mod.id,
        titreModule: mod.title,
      });
    }
  }
}

/** Les métadonnées d'une leçon (titres, durée, module), ou null. */
export function ficheLecon(piste, identifiant) {
  return CATALOGUE.get(`${piste}/${identifiant}`) ?? null;
}

/** Le contenu markdown d'une leçon, ou null si elle n'existe pas. */
export function lireLecon(piste, identifiant) {
  const fiche = CATALOGUE.get(`${piste}/${identifiant}`);
  if (!fiche) return null;
  try {
    return fs.readFileSync(path.join(RACINE, piste, `${identifiant}.md`), "utf8");
  } catch {
    // Fiche au catalogue mais fichier absent : la leçon existe dans le
    // curriculum et son texte n'a pas encore été écrit.
    return null;
  }
}

/**
 * L'index de recherche plein texte, construit une fois par processus.
 *
 * Les 101 fichiers font 430 Ko en tout. Les relire à chaque requête serait du
 * gâchis ; les mettre en cache pour la vie du processus est sans risque,
 * puisqu'un changement de contenu passe de toute façon par un redéploiement.
 */
let index = null;
export function indexRecherche() {
  if (index) return index;
  index = [...CATALOGUE.values()].map((fiche) => {
    const contenu = lireLecon(fiche.piste, fiche.lecon) ?? "";
    return { ...fiche, contenu, cherchable: `${fiche.titreLecon} ${contenu}`.toLowerCase() };
  });
  return index;
}
