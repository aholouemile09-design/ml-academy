#!/usr/bin/env node
/**
 * Vérificateur des fichiers d'exercices
 *
 *   node scripts/verifier-exercices.js
 *
 * Couvre les trois parcours :
 *   lib/exercises.js      greffé sur CURRICULUM      (ML & Data Science)
 *   lib/exercises-web.js  greffé sur WEB_CURRICULUM  (Web Full Stack)
 *   lib/exercises-pmp.js  greffé sur PMP_CURRICULUM  (PMP 2026)
 *
 * Deux contrôles :
 *
 *  1. Les backticks non échappés à l'intérieur d'un littéral de gabarit.
 *     C'est le piège du format : un ` brut dans un énoncé ferme la chaîne et
 *     produit une erreur de syntaxe à des dizaines de lignes de là, avec un
 *     message qui ne pointe pas vers la vraie cause. Dans les valeurs écrites
 *     entre backticks (statement, hint, solution, brief, dataset, selfCheck),
 *     tout code inline doit s'écrire \` et non `.
 *     Les chaînes entre guillemets (steps, checklist, quiz) ne sont pas
 *     concernées : le backtick y est parfaitement valide.
 *
 *  2. La complétude : 2 exercices par leçon, un exercice final par module,
 *     au moins 10 questions de quiz.
 */

const fs = require("fs");
const path = require("path");

const BT = String.fromCharCode(96);
const RACINE = path.resolve(__dirname, "..");

const PARCOURS = [
  { nom: "ML & Data Science", fichier: "lib/exercises.js", module: "lib/curriculum.js", cle: "CURRICULUM" },
  { nom: "Web Full Stack", fichier: "lib/exercises-web.js", module: "lib/webdev.js", cle: "WEB_CURRICULUM" },
  { nom: "PMP 2026", fichier: "lib/exercises-pmp.js", module: "lib/pmp.js", cle: "PMP_CURRICULUM" },
];

let echecs = 0;

// ── 1. Backticks non échappés ───────────────────────────────────────────────
function verifierBackticks(fichierRelatif) {
  const chemin = path.join(RACINE, fichierRelatif);
  if (!fs.existsSync(chemin)) return;

  const lignes = fs.readFileSync(chemin, "utf8").split("\n");
  const ouvre = new RegExp("^\\s*(statement|hint|solution|brief|dataset|selfCheck):\\s*" + BT);
  const ferme = new RegExp("(^|[^\\\\])" + BT + ",\\s*$");
  const brut = new RegExp("(^|[^\\\\])" + BT, "g");

  let dansGabarit = false;
  const suspects = [];

  lignes.forEach((ligne, i) => {
    let reste = ligne;
    if (!dansGabarit) {
      if (!ouvre.test(ligne)) return;
      dansGabarit = true;
      reste = ligne.replace(ouvre, "");
    }
    if (ferme.test(reste)) {
      dansGabarit = false;
      reste = reste.replace(new RegExp(BT + ",\\s*$"), "");
    }
    if ((reste.match(brut) || []).length > 0) {
      suspects.push({ ligne: i + 1, texte: ligne.trim().slice(0, 110) });
    }
  });

  if (suspects.length === 0) {
    console.log(`OK     ${fichierRelatif} — aucun backtick non échappé`);
    return;
  }
  echecs += suspects.length;
  console.log(`ÉCHEC  ${fichierRelatif} — ${suspects.length} backtick(s) non échappé(s) :`);
  suspects.forEach((s) => console.log(`       ${fichierRelatif}:${s.ligne}  ${s.texte}`));
  console.log(`       -> remplacer  ${BT}code${BT}  par  \\${BT}code\\${BT}`);
}

// ── 2. Complétude ───────────────────────────────────────────────────────────
async function verifierCompletude({ nom, module, cle }) {
  const mod = await import("file://" + path.join(RACINE, module));
  const curriculum = mod[cle];

  let exercices = 0;
  let questions = 0;
  let migres = 0;
  const problemes = [];

  for (const m of curriculum) {
    const n = m.lessons.reduce((s, l) => s + (l.exercises?.length || 0), 0);
    exercices += n;
    questions += m.quiz?.length || 0;
    if (n === 0) continue; // module pas encore migré : ce n'est pas un échec
    migres++;

    const incompletes = m.lessons.filter((l) => (l.exercises?.length || 0) !== 2);
    if (incompletes.length) {
      problemes.push(`${m.id} : leçons sans 2 exercices -> ${incompletes.map((l) => l.id).join(", ")}`);
    }
    if (!m.finalExercise) problemes.push(`${m.id} : pas d'exercice final`);
    if ((m.quiz?.length || 0) < 10) {
      problemes.push(`${m.id} : quiz à ${m.quiz?.length || 0} questions (minimum 10)`);
    }
  }

  console.log(
    `\n${nom} : ${migres}/${curriculum.length} modules migrés | ${exercices} exercices | ${questions} questions`
  );

  if (problemes.length === 0) {
    console.log("OK     tous les modules migrés sont complets");
  } else {
    echecs += problemes.length;
    console.log("ÉCHEC  modules incomplets :");
    problemes.forEach((p) => console.log("       " + p));
  }
}

(async () => {
  for (const p of PARCOURS) verifierBackticks(p.fichier);

  for (const p of PARCOURS) {
    try {
      await verifierCompletude(p);
    } catch (e) {
      echecs += 1;
      console.log(`ÉCHEC  ${p.fichier} ne parse pas : ${e.message}`);
    }
  }

  process.exit(echecs === 0 ? 0 : 1);
})();
