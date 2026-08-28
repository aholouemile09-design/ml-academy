"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Markdown from "@/components/Markdown";
import { CAS, QUESTIONS, META, repartitionReelle } from "@/lib/examen-blanc";

/**
 * L'examen blanc PMP, en conditions réelles.
 *
 * Ce n'est pas un quiz : c'est une simulation. D'où un composant dédié plutôt
 * qu'une extension de QuizPlayer, dont les besoins sont différents (confiance
 * déclarée, correction immédiate, pas de chrono).
 *
 * Ce que le format 2026 impose et qu'on reproduit ici :
 *   - 180 questions en 240 minutes, dont 10 non notées et non identifiables
 *   - deux pauses de 10 minutes qui SUSPENDENT le chronomètre
 *   - des études de cas : un scénario long suivi de 3 à 5 questions liées
 *   - aucune correction avant la fin — on ne sait pas si on a juste
 *   - un score par domaine ECO, pas un score global
 *
 * L'énoncé est en anglais avec la traduction française en dessous, ce qui
 * reproduit l'aide à la traduction proposée par PMI. On s'entraîne dans la
 * langue de l'examen, avec le filet de sécurité du jour J.
 *
 * La progression est sauvegardée dans le navigateur : quatre heures d'examen
 * ne doivent pas disparaître sur un rechargement accidentel.
 */

const CLE_STOCKAGE = "codegraft:examen-blanc:v1";

const DOMAINES = {
  people: { label: "People", couleur: "text-accent-light", anneau: "border-accent/40" },
  process: { label: "Process", couleur: "text-sky-400", anneau: "border-sky-500/40" },
  business: { label: "Business Environment", couleur: "text-emerald-400", anneau: "border-emerald-500/40" },
};

/** Formate un nombre de secondes en h:mm:ss. */
function chrono(secondes) {
  const s = Math.max(0, Math.floor(secondes));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function chargerEtat() {
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE);
    return brut ? JSON.parse(brut) : null;
  } catch {
    return null;
  }
}

function sauverEtat(etat) {
  try {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat));
  } catch {
    /* stockage indisponible : l'examen continue, sans reprise possible */
  }
}

export default function ExamenBlanc() {
  const [phase, setPhase] = useState("accueil"); // accueil | examen | pause | resultat
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState({}); // { [idQuestion]: indexOption }
  const [marquees, setMarquees] = useState({}); // { [idQuestion]: true }
  const [restant, setRestant] = useState(META.dureeMinutes * 60);
  const [pausesPrises, setPausesPrises] = useState([]);
  const [restantPause, setRestantPause] = useState(0);
  const [grilleOuverte, setGrilleOuverte] = useState(false);
  const [reprisePossible, setReprisePossible] = useState(false);

  const question = QUESTIONS[index];
  const cas = question?.caseId ? CAS[question.caseId] : null;

  // Position dans l'étude de cas, pour l'afficher au candidat
  const positionCas = useMemo(() => {
    if (!question?.caseId) return null;
    const memeCas = QUESTIONS.filter((q) => q.caseId === question.caseId);
    return { n: memeCas.findIndex((q) => q.id === question.id) + 1, total: memeCas.length };
  }, [question]);

  // ── Reprise d'un examen interrompu ────────────────────────────────────────
  useEffect(() => {
    const sauve = chargerEtat();
    if (sauve && sauve.phase === "examen") setReprisePossible(true);
  }, []);

  const reprendre = () => {
    const s = chargerEtat();
    if (!s) return;
    setIndex(s.index ?? 0);
    setReponses(s.reponses ?? {});
    setMarquees(s.marquees ?? {});
    setRestant(s.restant ?? META.dureeMinutes * 60);
    setPausesPrises(s.pausesPrises ?? []);
    setPhase("examen");
    setReprisePossible(false);
  };

  const demarrer = () => {
    setPhase("examen");
    setIndex(0);
    setReponses({});
    setMarquees({});
    setRestant(META.dureeMinutes * 60);
    setPausesPrises([]);
  };

  // ── Chronomètre principal ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "examen") return;
    const t = setInterval(() => {
      setRestant((r) => {
        if (r <= 1) {
          clearInterval(t);
          setPhase("resultat");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // ── Chronomètre de pause : il ne consomme PAS le temps d'examen ───────────
  useEffect(() => {
    if (phase !== "pause") return;
    const t = setInterval(() => {
      setRestantPause((r) => {
        if (r <= 1) {
          clearInterval(t);
          setPhase("examen");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // ── Sauvegarde continue ───────────────────────────────────────────────────
  const sauvegarder = useCallback(() => {
    if (phase !== "examen") return;
    sauverEtat({ phase, index, reponses, marquees, restant, pausesPrises });
  }, [phase, index, reponses, marquees, restant, pausesPrises]);

  const dernierIndex = useRef(index);
  useEffect(() => {
    if (index !== dernierIndex.current) {
      dernierIndex.current = index;
      sauvegarder();
    }
  }, [index, sauvegarder]);

  useEffect(() => {
    if (phase === "resultat") {
      try {
        window.localStorage.removeItem(CLE_STOCKAGE);
      } catch {
        /* non bloquant */
      }
    }
  }, [phase]);

  const repondre = (i) => {
    setReponses((r) => ({ ...r, [question.id]: i }));
  };

  const basculerMarque = () => {
    setMarquees((m) => ({ ...m, [question.id]: !m[question.id] }));
  };

  const suivant = () => {
    const prochain = index + 1;
    // Les pauses sont proposées aux jalons prévus par l'examen réel
    if (META.pausesApres.includes(prochain) && !pausesPrises.includes(prochain)) {
      setPausesPrises((p) => [...p, prochain]);
      setRestantPause(META.dureePauseMinutes * 60);
      setIndex(prochain);
      setPhase("pause");
      return;
    }
    if (prochain < QUESTIONS.length) setIndex(prochain);
  };

  const nbRepondues = Object.keys(reponses).length;
  const nbMarquees = Object.values(marquees).filter(Boolean).length;

  // ── Écran d'accueil ───────────────────────────────────────────────────────
  if (phase === "accueil") {
    const rep = repartitionReelle();
    return (
      <div className="card p-6 sm:p-8 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
            🎯 Examen blanc complet
          </p>
          <h2 className="text-2xl font-bold text-white">
            {QUESTIONS.length} questions · {META.dureeMinutes} minutes
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Calibré sur l'ECO 2026. Énoncés en anglais avec la traduction française — comme l'aide à
            la traduction proposée le jour J.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {Object.entries(DOMAINES).map(([cle, d]) => (
            <div key={cle} className={`rounded-xl border ${d.anneau} p-4`}>
              <p className={`text-xs font-bold uppercase ${d.couleur}`}>{d.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{rep[cle].pct} %</p>
              <p className="text-xs text-slate-500">{rep[cle].n} questions</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-ink-700 bg-ink-900/50 p-5 text-sm text-slate-400 space-y-2">
          <p className="text-white font-semibold">Conditions réelles</p>
          <p>→ {META.dureeMinutes} minutes, soit environ 1 min 20 par question.</p>
          <p>
            → Deux pauses de {META.dureePauseMinutes} minutes sont proposées après les questions{" "}
            {META.pausesApres.join(" et ")}. Le chronomètre est suspendu pendant les pauses.
          </p>
          <p>
            → {META.nonNotees} questions ne sont pas notées, et tu ne peux pas les identifier — comme
            à l'examen.
          </p>
          <p>→ Aucune correction avant la fin. Tu ne sauras pas si tu as juste.</p>
          <p>→ Ta progression est sauvegardée : un rechargement de page ne perd rien.</p>
          <p className="text-amber-400 pt-1">
            ⚠️ Fais-le d'une traite, sans interruption. Un examen blanc fractionné ne mesure rien.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={demarrer} className="btn-primary">
            Commencer l'examen
          </button>
          {reprisePossible && (
            <button onClick={reprendre} className="btn-secondary">
              Reprendre l'examen interrompu
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Écran de pause ────────────────────────────────────────────────────────
  if (phase === "pause") {
    return (
      <div className="card p-8 text-center space-y-4">
        <div className="text-5xl">☕</div>
        <h3 className="text-2xl font-bold text-white">Pause</h3>
        <p className="text-4xl font-mono text-emerald-400">{chrono(restantPause)}</p>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Le chronomètre de l'examen est suspendu. Cette pause ne te coûte aucune minute — lève-toi,
          bois quelque chose, repose tes yeux. La baisse de vigilance après 90 minutes de
          concentration est réelle.
        </p>
        <p className="text-xs text-slate-600">Temps d'examen restant : {chrono(restant)}</p>
        <button onClick={() => setPhase("examen")} className="btn-secondary">
          Reprendre maintenant
        </button>
      </div>
    );
  }

  // ── Écran de résultat ─────────────────────────────────────────────────────
  if (phase === "resultat") {
    return <Resultat reponses={reponses} restant={restant} />;
  }

  // ── Écran d'examen ────────────────────────────────────────────────────────
  const choisie = reponses[question.id];
  const enRetard = restant < ((QUESTIONS.length - index) / QUESTIONS.length) * META.dureeMinutes * 60 * 0.85;

  return (
    <div className="space-y-4">
      {/* Barre de suivi */}
      <div className="card p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-400">
            Question <span className="text-white font-semibold">{index + 1}</span> /{" "}
            {QUESTIONS.length}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">{nbRepondues} répondues</span>
          {nbMarquees > 0 && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400">{nbMarquees} marquées</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-mono text-lg ${enRetard ? "text-rose-400" : "text-slate-300"}`}>
            {chrono(restant)}
          </span>
          <button
            onClick={() => setGrilleOuverte((v) => !v)}
            className="text-xs px-3 py-1.5 rounded-lg border border-ink-700 text-slate-400 hover:border-accent/50"
          >
            {grilleOuverte ? "Masquer" : "Grille"}
          </button>
        </div>
      </div>

      <div className="w-full h-1.5 bg-ink-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all"
          style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Grille de navigation */}
      {grilleOuverte && (
        <div className="card p-4">
          <div className="flex flex-wrap gap-1.5">
            {QUESTIONS.map((q, i) => {
              const repondue = reponses[q.id] !== undefined;
              const marquee = marquees[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setIndex(i);
                    setGrilleOuverte(false);
                  }}
                  className={`w-8 h-8 rounded text-xs font-mono border transition-colors ${
                    i === index
                      ? "border-accent bg-accent text-white"
                      : marquee
                      ? "border-amber-500/60 bg-amber-500/10 text-amber-300"
                      : repondue
                      ? "border-ink-700 bg-ink-800 text-slate-300"
                      : "border-ink-700 text-slate-600"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-600 mt-3">
            Blanc = sans réponse · gris = répondue · orange = marquée
          </p>
        </div>
      )}

      {/* Scénario d'étude de cas */}
      {cas && (
        <div className="card p-6 border-sky-500/25">
          <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400">
              📋 Étude de cas
            </p>
            <span className="text-xs text-slate-500">
              Question {positionCas.n} sur {positionCas.total} de ce cas
            </span>
          </div>
          <div className="text-sm">
            <Markdown text={cas.en} />
          </div>
          <details className="mt-3">
            <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-300">
              Traduction française du scénario
            </summary>
            <div className="mt-2 text-sm text-slate-400 border-l-2 border-ink-700 pl-4">
              <Markdown text={cas.fr} />
            </div>
          </details>
        </div>
      )}

      {/* La question */}
      <div className="card p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-base sm:text-lg font-semibold text-white whitespace-pre-line">
            {question.en.q}
          </p>
          <p className="text-sm text-slate-500 italic mt-2 whitespace-pre-line border-l-2 border-ink-700 pl-3">
            {question.fr.q}
          </p>
        </div>

        <div className="space-y-2">
          {question.en.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => repondre(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                choisie === i
                  ? "border-accent bg-accent/10"
                  : "border-ink-700 hover:border-accent/60"
              }`}
            >
              <span className="text-sm text-slate-200">
                <span className="font-mono text-slate-500 mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </span>
              <span className="block text-xs text-slate-500 italic mt-1 ml-6">
                {question.fr.options[i]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
          <button
            onClick={basculerMarque}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              marquees[question.id]
                ? "border-amber-500 bg-amber-500/10 text-amber-300"
                : "border-ink-700 text-slate-400 hover:border-amber-500/50"
            }`}
          >
            {marquees[question.id] ? "🔖 Marquée" : "🔖 Marquer pour revenir"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="btn-secondary disabled:opacity-40"
            >
              ← Précédente
            </button>
            {index + 1 < QUESTIONS.length ? (
              <button onClick={suivant} className="btn-primary">
                Suivante →
              </button>
            ) : (
              <button onClick={() => setPhase("resultat")} className="btn-primary">
                Terminer l'examen
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            if (
              window.confirm(
                `Terminer maintenant ? ${QUESTIONS.length - nbRepondues} question(s) sans réponse — elles compteront comme fausses.`
              )
            ) {
              setPhase("resultat");
            }
          }}
          className="text-xs text-slate-600 hover:text-rose-400 transition-colors"
        >
          Terminer l'examen avant la fin
        </button>
      </div>
    </div>
  );
}

/* ── Rapport de fin ─────────────────────────────────────────────────────── */

function Resultat({ reponses, restant }) {
  const [filtre, setFiltre] = useState("erreurs"); // erreurs | toutes

  const notees = QUESTIONS.filter((q) => q.scored !== false);
  const parDomaine = {};

  for (const cle of Object.keys(DOMAINES)) {
    const qs = notees.filter((q) => q.domain === cle);
    const justes = qs.filter((q) => reponses[q.id] === q.answer).length;
    parDomaine[cle] = {
      n: qs.length,
      justes,
      pct: qs.length ? Math.round((justes / qs.length) * 100) : 0,
    };
  }

  const totalJustes = notees.filter((q) => reponses[q.id] === q.answer).length;
  const pctGlobal = Math.round((totalJustes / notees.length) * 100);
  const sansReponse = QUESTIONS.filter((q) => reponses[q.id] === undefined).length;

  const niveau = (pct) => (pct >= 75 ? "Above Target" : pct >= 65 ? "Target" : "Below Target");
  const couleurNiveau = (pct) =>
    pct >= 75 ? "text-emerald-400" : pct >= 65 ? "text-amber-400" : "text-rose-400";

  const aRevoir = QUESTIONS.filter((q) =>
    filtre === "erreurs" ? reponses[q.id] !== q.answer : true
  );

  const domaineFaible = Object.entries(parDomaine).sort((a, b) => a[1].pct - b[1].pct)[0];
  const pret = pctGlobal >= 70 && Object.values(parDomaine).every((d) => d.pct >= 65);

  return (
    <div className="space-y-4">
      <div className="card p-6 sm:p-8 text-center space-y-3">
        <div className="text-5xl">{pctGlobal >= 75 ? "🏆" : pctGlobal >= 65 ? "🎯" : "📖"}</div>
        <h2 className="text-3xl font-bold text-white">
          {totalJustes} / {notees.length} — {pctGlobal} %
        </h2>
        <p className={`text-sm font-semibold ${couleurNiveau(pctGlobal)}`}>{niveau(pctGlobal)}</p>
        <p className="text-xs text-slate-500">
          Temps restant à la fin : {chrono(restant)}
          {sansReponse > 0 && ` · ${sansReponse} question(s) sans réponse`}
        </p>
      </div>

      {/* Le rapport par domaine — l'information qui compte */}
      <div className="card p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
          📊 Score par domaine ECO
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          C'est ce tableau qui dit où réviser — pas le score global.
        </p>
        <div className="space-y-3">
          {Object.entries(DOMAINES).map(([cle, d]) => {
            const r = parDomaine[cle];
            return (
              <div key={cle}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={d.couleur}>{d.label}</span>
                  <span className="text-slate-400">
                    {r.justes}/{r.n} —{" "}
                    <span className={couleurNiveau(r.pct)}>
                      {r.pct} % · {niveau(r.pct)}
                    </span>
                  </span>
                </div>
                <div className="w-full h-2 bg-ink-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      r.pct >= 75 ? "bg-emerald-500" : r.pct >= 65 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verdict */}
      <div
        className={`card p-6 ${pret ? "border-emerald-500/30" : "border-amber-500/30"}`}
      >
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          {pret ? "✅ Critère de réservation atteint" : "⚠️ Critère de réservation non atteint"}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Le critère est <strong className="text-white">≥ 70 % de façon stable</strong> sur plusieurs
          examens blancs, <strong className="text-white">et aucun domaine sous 65 %</strong>.
          {!pret && domaineFaible[1].pct < 65 && (
            <>
              {" "}
              Ici, <strong className={DOMAINES[domaineFaible[0]].couleur}>
                {DOMAINES[domaineFaible[0]].label}
              </strong>{" "}
              est à {domaineFaible[1].pct} % — c'est la priorité, même si ce n'est pas le domaine où
              tu as le plus d'erreurs en valeur absolue. On travaille l'écart, pas la taille.
            </>
          )}
          {pret && " Ce résultat le remplit — vérifie qu'il se reproduit sur un second examen blanc avant de réserver."}
        </p>
        <p className="text-xs text-slate-500 mt-3">
          Rappel : le PMI ne publie pas de seuil chiffré et tient compte de la difficulté des
          questions. Ces seuils sont ceux communément retenus en préparation.
        </p>
      </div>

      {/* Revue des questions */}
      <div className="card p-6">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            🔍 Revue des questions
          </h3>
          <div className="flex gap-2">
            {[
              ["erreurs", `Mes erreurs (${notees.length - totalJustes + (QUESTIONS.length - notees.length)})`],
              ["toutes", `Toutes (${QUESTIONS.length})`],
            ].map(([cle, label]) => (
              <button
                key={cle}
                onClick={() => setFiltre(cle)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  filtre === cle
                    ? "border-accent bg-accent/10 text-white"
                    : "border-ink-700 text-slate-400 hover:border-accent/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Pour chaque erreur, écris <strong className="text-slate-300">pourquoi</strong> ta réponse
          te semblait juste et pourquoi la bonne l'est davantage. Lire la correction ne suffit pas —
          c'est l'écriture qui grave.
        </p>

        <div className="space-y-4">
          {aRevoir.map((q) => {
            const donnee = reponses[q.id];
            const juste = donnee === q.answer;
            return (
              <article
                key={q.id}
                className={`rounded-xl border p-5 ${
                  juste ? "border-ink-700" : "border-rose-500/30 bg-rose-500/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-xs font-bold uppercase ${DOMAINES[q.domain].couleur}`}>
                    {DOMAINES[q.domain].label}
                  </span>
                  {q.approach && (
                    <span className="text-xs text-slate-600">· {q.approach}</span>
                  )}
                  {q.scored === false && (
                    <span className="text-xs text-slate-600">· non notée</span>
                  )}
                  <span className="text-xs ml-auto">{juste ? "✅" : "❌"}</span>
                </div>

                <p className="text-sm font-medium text-white whitespace-pre-line">{q.en.q}</p>
                <p className="text-xs text-slate-500 italic mt-1 whitespace-pre-line">{q.fr.q}</p>

                <div className="mt-3 space-y-1.5">
                  {q.en.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`text-xs px-3 py-2 rounded-lg border ${
                        i === q.answer
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-200"
                          : i === donnee
                          ? "border-rose-500/50 bg-rose-500/10 text-rose-200"
                          : "border-ink-700 text-slate-500"
                      }`}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                      {i === q.answer && <span className="ml-2">← bonne réponse</span>}
                      {i === donnee && i !== q.answer && <span className="ml-2">← ta réponse</span>}
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-ink-700 text-sm">
                  <Markdown text={q.explain} />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <button onClick={() => window.location.reload()} className="btn-secondary">
        Repasser un examen blanc
      </button>
    </div>
  );
}
