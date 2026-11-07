"use client";

import Link from "next/link";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";
import { FORMATIONS } from "@/lib/formations";
import { useUserProgress as useProgress } from "@/lib/userProgress";
import EnteteParcours from "@/components/EnteteParcours";
import MasteryMap from "@/components/MasteryMap";
import { computeMlMastery } from "@/lib/mastery";

export default function Parcours() {
  const progress = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <EnteteParcours {...FORMATIONS.ml} />

      {progress && <MasteryMap modules={computeMlMastery(progress.quizScores || {})} title="Ta maîtrise par module" />}

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-ink-700 hidden sm:block" />
        <div className="space-y-6">
          {CURRICULUM.map((m, i) => {
            const done = progress
              ? m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
              : 0;
            const pct = Math.round((done / m.lessons.length) * 100);
            const quiz = progress?.quizScores?.[m.id];

            return (
              <Link
                key={m.id}
                href={`/parcours/${m.id}`}
                className="card p-6 flex gap-5 hover:border-accent/50 transition-colors relative sm:ml-14 group block"
              >
                {/* Le rang plutôt qu'une pastille d'emoji. Le médaillon doit
                    porter quelque chose, puisqu'il marque la position sur le
                    filet ; un module terminé se lit à l'accent, et surtout au
                    « 12/12 leçons » imprimé juste en dessous. */}
                <div
                  className={`absolute -left-14 top-6 w-12 h-12 rounded-full bg-ink-900 border hidden sm:flex items-center justify-center font-mono text-sm ${
                    pct === 100 ? "border-accent/60 text-accent-light" : "border-ink-700 text-slate-500"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="text-slate-500 font-mono text-sm">Module {i + 1}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-xs font-medium ${LEVELS[m.level].badge} ${LEVELS[m.level].color}`}
                    >
                      {LEVELS[m.level].label}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-accent-light transition-colors">
                    {m.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">{m.description}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent-cyan"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {done}/{m.lessons.length} leçons
                      {quiz ? ` · quiz ${quiz.score}/${quiz.total}` : ""}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
