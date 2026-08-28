"use client";

import { useEffect, useState } from "react";
import Markdown from "@/components/Markdown";
import { getSyllabus } from "@/lib/syllabus";

/**
 * L'exercice global de fin de module : le seul qui oblige à choisir soi-même
 * quel outil appliquer à quelle étape. Les exercices de leçon entraînent des
 * gestes isolés ; celui-ci entraîne la décomposition d'un problème réel.
 *
 * Il combine deux sources :
 *   - `mod.finalExercise` (curriculum) — l'énoncé concret, le jeu de données,
 *     les étapes et la checklist d'auto-évaluation ;
 *   - `syllabus.problemSet.rubric`     — la grille de notation, qui vivait déjà
 *     dans le syllabus mais s'affichait EN HAUT du module, donc au moment où
 *     l'élève ne pouvait pas encore la faire.
 *
 * La checklist est stockée en localStorage : elle sert de mémo pendant les
 * quelques heures de travail, pas de donnée de progression synchronisée.
 */
export default function FinalExercise({ moduleId, finalExercise }) {
  const syllabus = getSyllabus(moduleId);
  const rubric = syllabus?.problemSet?.rubric;
  const totalPoints = rubric?.reduce((s, r) => s + r.points, 0) ?? 0;

  const storageKey = `codegraft:final-exercise:${moduleId}`;
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* mode privé ou stockage bloqué : on repart d'une checklist vide */
    }
  }, [storageKey]);

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* non bloquant */
    }
  };

  if (!finalExercise) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-400 text-sm">
          L'exercice final de ce module n'est pas encore rédigé.
        </p>
      </div>
    );
  }

  const items = finalExercise.checklist || [];
  const done = items.filter((_, i) => checked[i]).length;

  return (
    <div className="space-y-4">
      {/* ── En-tête ─────────────────────────────────────────────────────── */}
      <div className="card p-6 sm:p-8 border-emerald-500/25">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
          🎯 Exercice final du module
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          {finalExercise.title}
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          {finalExercise.duration && <>⏱ {finalExercise.duration}</>}
          {finalExercise.covers?.length > 0 && (
            <> · Rassemble les {finalExercise.covers.length} leçons du module</>
          )}
          {totalPoints > 0 && <> · Noté sur {totalPoints} points</>}
        </p>

        <div className="mt-5 text-sm">
          <Markdown text={finalExercise.brief} />
        </div>
      </div>

      {/* ── Jeu de données ──────────────────────────────────────────────── */}
      {finalExercise.dataset && (
        <div className="card p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            📦 Le jeu de données
          </h3>
          <div className="text-sm">
            <Markdown text={finalExercise.dataset} />
          </div>
        </div>
      )}

      {/* ── Étapes ──────────────────────────────────────────────────────── */}
      {finalExercise.steps?.length > 0 && (
        <div className="card p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
            🪜 Travail demandé
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Aucune fonction n'est nommée : c'est à toi de choisir. Écris chaque étape en
            commentaire français avant de coder.
          </p>
          <ol className="space-y-4">
            {finalExercise.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-emerald-500 font-mono text-xs mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="text-sm min-w-0">
                  <Markdown text={s} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Grille de notation (reprise du syllabus) ────────────────────── */}
      {rubric?.length > 0 && (
        <div className="card p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            📊 Grille de notation
          </h3>
          <div className="rounded-xl border border-ink-700 overflow-hidden">
            {rubric.map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm ${
                  i > 0 ? "border-t border-ink-700" : ""
                }`}
              >
                <span className="text-slate-300">{r.criterion}</span>
                <span className="text-slate-500 font-mono text-xs shrink-0">{r.points} pts</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm border-t border-ink-700 bg-ink-800/50">
              <span className="font-semibold text-white">Total</span>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                {totalPoints} pts
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Checklist d'auto-évaluation ─────────────────────────────────── */}
      {items.length > 0 && (
        <div className="card p-6">
          <div className="flex items-baseline justify-between gap-3 mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              ✅ Avant de considérer le module terminé
            </h3>
            <span className="text-xs text-slate-500 shrink-0">
              {done}/{items.length}
            </span>
          </div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                  checked[i]
                    ? "border-emerald-500/40 bg-emerald-500/5 text-slate-300"
                    : "border-ink-700 text-slate-400 hover:border-accent/40"
                }`}
              >
                <span className="shrink-0 mt-0.5">{checked[i] ? "☑️" : "⬜"}</span>
                <span className={checked[i] ? "line-through decoration-slate-600" : ""}>
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Le vrai test ────────────────────────────────────────────────── */}
      {finalExercise.selfCheck && (
        <div className="card p-6 border-amber-500/25 bg-amber-500/5">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
            🔒 Le vrai test
          </h3>
          <div className="text-sm">
            <Markdown text={finalExercise.selfCheck} />
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500 leading-relaxed px-1">
        💡 Le tuteur AI peut t'expliquer un concept ou t'aider à débloquer une erreur, mais il ne
        fera pas ce travail à ta place — c'est en le faisant que tu apprends.
      </p>
    </div>
  );
}
