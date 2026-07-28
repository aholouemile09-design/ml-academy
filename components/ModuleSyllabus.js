"use client";

import { useState } from "react";
import { getSyllabus } from "@/lib/syllabus";

/**
 * Affiche le cadre pédagogique d'un module : objectifs d'apprentissage,
 * prérequis, lectures de référence et problem set noté.
 *
 * Rendu au-dessus des leçons, comme le syllabus d'un cours universitaire.
 */
export default function ModuleSyllabus({ moduleId, accent = "accent" }) {
  const syllabus = getSyllabus(moduleId);
  const [openPset, setOpenPset] = useState(false);

  if (!syllabus) return null;

  const { outcomes, prerequisites, books, problemSet } = syllabus;
  const ring = accent === "blue" ? "border-blue-500/30 bg-blue-500/5" : "border-accent/25 bg-accent/5";
  const totalPoints = problemSet?.rubric?.reduce((s, r) => s + r.points, 0) ?? 0;

  return (
    <div className="space-y-4 mb-8">
      {/* ── Objectifs d'apprentissage ──────────────────────────────────── */}
      <div className={`card p-6 ${ring}`}>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
          🎯 Objectifs d'apprentissage
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          À l'issue de ce module, tu seras capable de :
        </p>
        <ul className="space-y-2">
          {outcomes.map((o, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
              <span className="text-accent-light font-mono text-xs mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>

        {prerequisites?.length > 0 && (
          <div className="mt-5 pt-4 border-t border-ink-700">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1.5">Prérequis</p>
            <p className="text-sm text-slate-400">{prerequisites.join(" · ")}</p>
          </div>
        )}
      </div>

      {/* ── Lectures de référence ──────────────────────────────────────── */}
      {books?.length > 0 && (
        <div className="card p-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
            📖 Lectures de référence
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Sélection d'expert — les ressources gratuites sont signalées.
          </p>
          <div className="space-y-3">
            {books.map((b, i) => (
              <a
                key={i}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-ink-700 p-4 hover:border-accent/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-semibold text-white group-hover:text-accent-light leading-snug">
                    {b.title}
                  </p>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${
                      b.free
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {b.free ? "Gratuit" : "Payant"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{b.author}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{b.why}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Problem set noté ───────────────────────────────────────────── */}
      {problemSet && (
        <div className="card overflow-hidden border-emerald-500/25">
          <button
            onClick={() => setOpenPset(!openPset)}
            className="w-full text-left p-6 hover:bg-emerald-500/5 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  🧪 Évaluation pratique
                </h2>
                <p className="text-base font-semibold text-emerald-400 leading-snug">
                  {problemSet.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Domaine : {problemSet.domain} · Noté sur {totalPoints} points
                </p>
              </div>
              <span className="text-emerald-500 text-sm shrink-0 mt-1">
                {openPset ? "▲" : "▼"}
              </span>
            </div>
            {!openPset && (
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{problemSet.brief}</p>
            )}
          </button>

          {openPset && (
            <div className="px-6 pb-6 space-y-5">
              <p className="text-sm text-slate-300 leading-relaxed">{problemSet.brief}</p>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                  Travail demandé
                </p>
                <ol className="space-y-2">
                  {problemSet.tasks.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <span className="text-emerald-500 font-mono text-xs mt-0.5 shrink-0">
                        {i + 1}.
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                  Grille de notation
                </p>
                <div className="rounded-xl border border-ink-700 overflow-hidden">
                  {problemSet.rubric.map((r, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm ${
                        i > 0 ? "border-t border-ink-700" : ""
                      }`}
                    >
                      <span className="text-slate-300">{r.criterion}</span>
                      <span className="text-slate-500 font-mono text-xs shrink-0">
                        {r.points} pts
                      </span>
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

              <p className="text-xs text-slate-500 leading-relaxed border-t border-ink-700 pt-4">
                💡 Le tuteur AI peut t'expliquer un concept ou t'aider à débloquer une erreur,
                mais il ne fera pas ce travail à ta place — c'est en le faisant que tu apprends.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
