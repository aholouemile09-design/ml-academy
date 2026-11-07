import fs from "node:fs";
import path from "node:path";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";
import { FORMATIONS } from "@/lib/formations";

/**
 * La mémoire du tuteur, côté serveur uniquement.
 *
 * Elle a deux moitiés, et la séparation est le cœur du dispositif :
 *
 * - Le **profil** est stable — qui est l'apprenant, comment lui enseigner, ses
 *   points faibles. Il vit dans contenu/profil-apprenant.md, donc dans git : on
 *   le relit et on le corrige comme du code.
 * - L'**avancement** est vivant. Il est lu dans `user_progress` à chaque
 *   question. Recopié à la main dans le profil, il serait faux la semaine
 *   suivante — et c'est précisément cet écart qui rendait une conversation
 *   Claude plus utile que le tuteur du site.
 */

const PISTES = { ml: CURRICULUM, web: WEB_CURRICULUM, pmp: PMP_CURRICULUM };
const PROFIL = path.join(process.cwd(), "contenu", "profil-apprenant.md");
const LONGUEUR_NOTE = 800;
const SEUIL_QUIZ = 0.7;

let profil = null;

/** Le profil de l'apprenant, mis en cache pour la vie du processus. */
export function lireProfil() {
  if (profil !== null) return profil;
  try {
    // Les commentaires HTML du fichier expliquent au lecteur humain ce qui a sa
    // place dedans. Ils n'ont rien à dire au modèle, donc ils sautent.
    profil = fs.readFileSync(PROFIL, "utf8").replace(/<!--[\s\S]*?-->/g, "").trim();
  } catch {
    profil = "";
  }
  return profil;
}

/** Le titre d'un module, par son identifiant, toutes pistes confondues. */
function titreModule(identifiant) {
  for (const curriculum of Object.values(PISTES)) {
    const trouve = curriculum.find((m) => m.id === identifiant);
    if (trouve) return trouve.title;
  }
  return identifiant;
}

/**
 * L'avancement réel de l'apprenant, en quelques lignes de français.
 *
 * `ligne` est la ligne `user_progress` telle qu'elle sort de la base, en
 * snake_case. `null` est un cas normal : visiteur non connecté, ou compte sans
 * progression — le tuteur travaille alors sans rien savoir de lui, ce qui vaut
 * mieux qu'inventer.
 */
export function resumerProgression(ligne, piste, lecon) {
  if (!ligne) return "";

  const curriculum = PISTES[piste] ?? CURRICULUM;
  const faites = new Set(ligne.completed_lessons ?? []);
  const quiz = ligne.quiz_scores ?? {};
  const notes = ligne.lesson_notes ?? {};

  const lignes = [];
  const total = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const nbFaites = curriculum.reduce(
    (n, m) => n + m.lessons.filter((l) => faites.has(l.id)).length,
    0
  );
  lignes.push(
    `Parcours « ${FORMATIONS[piste]?.domaine ?? piste} » : ${nbFaites} leçons terminées sur ${total}.`
  );

  const termines = [];
  const enCours = [];
  let prochain = null;
  for (const mod of curriculum) {
    const n = mod.lessons.filter((l) => faites.has(l.id)).length;
    if (n === mod.lessons.length) termines.push(mod.title);
    else if (n > 0) enCours.push(`${mod.title} (${n} sur ${mod.lessons.length})`);
    else if (!prochain) prochain = mod.title;
  }

  if (termines.length) lignes.push(`Modules terminés : ${termines.join(", ")}.`);
  if (enCours.length) lignes.push(`Module en cours : ${enCours.join(", ")}.`);
  if (prochain) lignes.push(`Module suivant, pas encore ouvert : ${prochain}.`);

  const faibles = Object.entries(quiz)
    .filter(([, v]) => v?.total && v.score / v.total < SEUIL_QUIZ)
    .map(([id, v]) => `${titreModule(id)} ${v.score}/${v.total}`);
  const reussis = Object.entries(quiz)
    .filter(([, v]) => v?.total && v.score / v.total >= SEUIL_QUIZ)
    .map(([id, v]) => `${titreModule(id)} ${v.score}/${v.total}`);

  if (faibles.length) {
    lignes.push(`Quiz à retravailler, c'est là qu'il faut revenir : ${faibles.join(" ; ")}.`);
  }
  if (reussis.length) lignes.push(`Quiz réussis : ${reussis.join(" ; ")}.`);

  // Ses propres notes valent mieux que n'importe quelle inférence sur son
  // niveau : ce sont ses mots sur ce qu'il a compris.
  const note = lecon ? (notes[lecon] ?? "").trim() : "";
  if (note) {
    lignes.push(
      `Les notes qu'il a écrites lui-même sur cette leçon : « ${note.slice(0, LONGUEUR_NOTE)} »`
    );
  }

  return lignes.join("\n");
}
