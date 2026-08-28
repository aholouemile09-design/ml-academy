#!/usr/bin/env node
/**
 * Vérificateur de l'examen blanc PMP
 *
 *   node scripts/verifier-examen-blanc.js
 *
 * Contrôle le calibrage sur l'ECO 2026 et l'intégrité des données. Les écarts
 * de calibrage sont des AVERTISSEMENTS (le contenu prime sur la statistique) ;
 * les défauts d'intégrité sont des ÉCHECS.
 *
 * Le contrôle le plus important est celui de la distribution des bonnes
 * réponses : écrites à la main, les questions placent naturellement la réponse
 * attendue en deuxième position, ce qui rendrait l'examen devinable. Le
 * rééquilibrage est fait à l'assemblage — ce script vérifie qu'il a opéré.
 */

const path = require("path");

const RACINE = path.resolve(__dirname, "..");

const CIBLES = {
  total: 180,
  nonNotees: 10,
  domaines: { people: 33, process: 41, business: 26 },
  pctAgileHybride: 60,
  tolerance: 3, // points de pourcentage
};

let echecs = 0;
let avertissements = 0;

const ok = (m) => console.log(`OK      ${m}`);
const avert = (m) => {
  avertissements++;
  console.log(`AVERT   ${m}`);
};
const echec = (m) => {
  echecs++;
  console.log(`ÉCHEC   ${m}`);
};

(async () => {
  const m = await import("file://" + path.join(RACINE, "lib", "examen-blanc.js"));
  const Q = m.QUESTIONS;

  // ── Volume ────────────────────────────────────────────────────────────────
  if (Q.length === CIBLES.total) ok(`${Q.length} questions`);
  else echec(`${Q.length} questions au lieu de ${CIBLES.total}`);

  const nonNotees = Q.filter((q) => q.scored === false).length;
  if (nonNotees === CIBLES.nonNotees) ok(`${nonNotees} questions non notées`);
  else avert(`${nonNotees} questions non notées au lieu de ${CIBLES.nonNotees}`);

  // ── Pondération ECO ───────────────────────────────────────────────────────
  const rep = m.repartitionReelle();
  for (const [cle, cible] of Object.entries(CIBLES.domaines)) {
    const ecart = Math.abs(rep[cle].pct - cible);
    const msg = `${cle} : ${rep[cle].pct} % (${rep[cle].n} questions), cible ${cible} %`;
    if (ecart <= CIBLES.tolerance) ok(msg);
    else avert(msg + ` — écart de ${ecart} points`);
  }

  // ── Approches ─────────────────────────────────────────────────────────────
  const app = m.repartitionApproches();
  const ecartApp = Math.abs(app.pctAgileHybride - CIBLES.pctAgileHybride);
  const msgApp = `agile-hybride : ${app.pctAgileHybride} % sur ${app.contextuelles} questions contextuelles, cible ${CIBLES.pctAgileHybride} %`;
  if (ecartApp <= CIBLES.tolerance) ok(msgApp);
  else avert(msgApp + ` — écart de ${ecartApp} points`);
  console.log(
    `        détail : ${app.agile} agile · ${app.hybrid} hybride · ${app.predictive} prédictif · ${app.neutral} neutre`
  );

  // ── Distribution des bonnes réponses ──────────────────────────────────────
  const d = m.distributionReponses();
  const valeurs = Object.values(d);
  const ecartMax = Math.max(...valeurs) - Math.min(...valeurs);
  const msgD = `positions des bonnes réponses : A ${d.A} · B ${d.B} · C ${d.C} · D ${d.D}`;
  if (ecartMax <= 5) ok(msgD);
  else echec(msgD + ` — écart de ${ecartMax}, l'examen deviendrait devinable`);

  // ── Intégrité ─────────────────────────────────────────────────────────────
  const problemes = [];
  const ids = new Set();

  for (const q of Q) {
    if (ids.has(q.id)) problemes.push(`${q.id} : identifiant en double`);
    ids.add(q.id);
    if (!q.en?.q || !q.fr?.q) problemes.push(`${q.id} : énoncé manquant en anglais ou en français`);
    if (q.en?.options?.length !== 4) problemes.push(`${q.id} : ${q.en?.options?.length} options anglaises`);
    if (q.fr?.options?.length !== 4) problemes.push(`${q.id} : ${q.fr?.options?.length} options françaises`);
    if (!(q.answer >= 0 && q.answer <= 3)) problemes.push(`${q.id} : answer hors bornes`);
    if (!q.explain || q.explain.length < 40) problemes.push(`${q.id} : explication absente ou trop courte`);
    if (!CIBLES.domaines[q.domain]) problemes.push(`${q.id} : domaine inconnu « ${q.domain} »`);
    if (q.caseId && !m.CAS[q.caseId]) problemes.push(`${q.id} : caseId inconnu « ${q.caseId} »`);
    // Une référence à une lettre d'option casse après le rééquilibrage
    if (/\boption [A-D]\b|\bréponse [A-D]\b/.test(q.explain)) {
      problemes.push(`${q.id} : l'explication cite une lettre d'option, invalide après rééquilibrage`);
    }
  }

  // Les questions d'une même étude de cas doivent rester consécutives
  for (let i = 0; i < Q.length; i++) {
    const c = Q[i].caseId;
    if (!c) continue;
    let j = i;
    while (j < Q.length && Q[j].caseId === c) j++;
    if (Q.slice(j).some((x) => x.caseId === c)) {
      problemes.push(`étude de cas « ${c} » : questions non consécutives`);
    }
    i = j - 1;
  }

  const nbCas = Q.filter((q) => q.caseId).length;
  console.log(`        ${nbCas} questions rattachées à ${Object.keys(m.CAS).length} études de cas`);

  if (problemes.length === 0) ok("intégrité des données");
  else {
    problemes.forEach((p) => echec(p));
  }

  console.log(`\n${echecs} échec(s), ${avertissements} avertissement(s)`);
  process.exit(echecs === 0 ? 0 : 1);
})();
