"use client";

import { useState } from "react";
import Markdown from "@/components/Markdown";

/**
 * Les deux exercices de fin de leçon.
 *
 * Ils ne sont volontairement pas du même type :
 *   - "application" : guidé, juste après le concept — on applique ce qu'on vient de lire ;
 *   - "blanche"     : énoncé en français, aucun squelette, aucune méthode indiquée ;
 *   - "situation"   : la variante du second pour les parcours non techniques
 *                     (PMP) — un cas à analyser, sans grille fournie.
 *
 * C'est toujours le second qui entraîne le passage « problème → réponse », la
 * compétence qui manque quand on comprend le cours mais qu'on reste bloqué
 * devant un fichier vide — ou devant une question situationnelle d'examen.
 *
 * L'indice et la correction sont masqués par défaut : les révéler trop tôt
 * transforme un exercice de rappel en exercice de lecture.
 */

const KINDS = {
  application: {
    label: "Application directe",
    hint: "Tu appliques ce que tu viens de lire.",
    icon: "🔧",
    ring: "border-accent/30",
    text: "text-accent-light",
  },
  blanche: {
    label: "Page blanche",
    hint: "Aucun squelette : à toi de choisir la méthode.",
    icon: "🎯",
    ring: "border-amber-500/30",
    text: "text-amber-400",
  },
  situation: {
    label: "Cas situationnel",
    hint: "Aucune grille fournie : à toi de raisonner et de justifier.",
    icon: "🧩",
    ring: "border-amber-500/30",
    text: "text-amber-400",
  },
};

export default function LessonExercises({ exercises }) {
  if (!exercises?.length) return null;

  return (
    <div className="mt-8 pt-6 border-t border-ink-700">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          ✍️ Exercices de la leçon
        </h3>
        <span className="text-xs text-slate-600">{exercises.length} exercices</span>
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Fais-les dans l'ordre, dans un vrai fichier{" "}
        <code className="bg-ink-800 border border-ink-700 px-1.5 py-0.5 rounded-md font-mono text-accent-light text-[0.9em]">.py</code> —
        pas dans ta tête. Ne déplie la correction qu'après avoir écrit quelque chose, même faux.
      </p>

      <div className="space-y-3">
        {exercises.map((ex, i) => (
          <ExerciseCard key={ex.id || i} exercise={ex} index={i} />
        ))}
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, index }) {
  const [openHint, setOpenHint] = useState(false);
  const [openSolution, setOpenSolution] = useState(false);

  const kind = KINDS[exercise.kind] || KINDS.application;
  const letter = String.fromCharCode(65 + index); // A, B, …

  return (
    <div className={`rounded-xl border ${kind.ring} bg-ink-900/40 overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3 flex-wrap">
          <span className="text-xl shrink-0">{kind.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white leading-snug">
              Exercice {letter} — {exercise.title}
            </p>
            <p className={`text-xs mt-0.5 ${kind.text}`}>
              {kind.label} · <span className="text-slate-500">{kind.hint}</span>
            </p>
          </div>
        </div>

        <div className="text-sm">
          <Markdown text={exercise.statement} />
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          {exercise.hint && (
            <button
              onClick={() => setOpenHint((v) => !v)}
              className="text-xs px-3 py-1.5 rounded-lg border border-ink-700 text-slate-400 hover:border-accent/50 hover:text-slate-200 transition-colors"
            >
              {openHint ? "Masquer l'indice" : "💡 Un indice"}
            </button>
          )}
          {exercise.solution && (
            <button
              onClick={() => setOpenSolution((v) => !v)}
              className="text-xs px-3 py-1.5 rounded-lg border border-ink-700 text-slate-400 hover:border-emerald-500/50 hover:text-slate-200 transition-colors"
            >
              {openSolution ? "Masquer la correction" : "✅ Voir la correction"}
            </button>
          )}
        </div>

        {openHint && exercise.hint && (
          <div className="mt-4 rounded-xl bg-ink-800/60 border border-ink-700 p-4 text-sm">
            <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Indice</p>
            <Markdown text={exercise.hint} />
          </div>
        )}

        {openSolution && exercise.solution && (
          <div className="mt-4 rounded-xl bg-emerald-500/5 border border-emerald-500/25 p-4 text-sm">
            <p className="text-xs uppercase font-semibold text-emerald-400 mb-3">
              Correction commentée
            </p>
            <Markdown text={exercise.solution} />
          </div>
        )}
      </div>
    </div>
  );
}
