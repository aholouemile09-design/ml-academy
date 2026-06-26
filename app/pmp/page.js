"use client";

import Link from "next/link";
import { PMP_CURRICULUM, PMP_LEVELS } from "@/lib/pmp";
import { useUserProgress as useProgress } from "@/lib/userProgress";

export default function Pmp() {
  const progress = useProgress();
  const totalLessons = PMP_CURRICULUM.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-4">
          📋 Nouveau parcours — examen PMP 2026
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">Préparation à la certification PMP</h1>
        <p className="text-slate-400 max-w-2xl">
          Tout ce qu'il faut pour réussir le <strong className="text-white font-semibold">Project Management Professional</strong> du PMI — version 2026 (PMBOK 8, 180 questions, 240 min). Cours structuré par domaine, mindset PMI, quiz et examen blanc chronométré.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">{PMP_CURRICULUM.length}</div>
          <div className="text-xs text-slate-500 mt-1">modules</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">{totalLessons}</div>
          <div className="text-xs text-slate-500 mt-1">leçons</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">8-12</div>
          <div className="text-xs text-slate-500 mt-1">semaines de prépa</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">2026</div>
          <div className="text-xs text-slate-500 mt-1">examen à jour</div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-ink-700 hidden sm:block" />
        <div className="space-y-5">
          {PMP_CURRICULUM.map((m, i) => {
            const done = progress
              ? m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
              : 0;
            const pct = Math.round((done / m.lessons.length) * 100);

            return (
              <Link
                key={m.id}
                href={`/pmp/${m.id}`}
                className="card p-6 flex gap-5 hover:border-accent/50 transition-colors relative sm:ml-14 group block"
              >
                <div className="absolute -left-14 top-6 w-12 h-12 rounded-full bg-ink-900 border border-ink-700 hidden sm:flex items-center justify-center text-xl">
                  {pct === 100 ? "✅" : m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="text-slate-500 font-mono text-sm">PMP {i + 1}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${PMP_LEVELS[m.level].badge} ${PMP_LEVELS[m.level].color}`}>
                      {PMP_LEVELS[m.level].label}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-accent-light transition-colors">
                    <span className="sm:hidden mr-2">{m.icon}</span>
                    {m.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">{m.description}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent-cyan" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {done}/{m.lessons.length} leçons
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10 card p-6 bg-accent/5 border-accent/20">
        <h3 className="font-bold text-white mb-2">🎓 Ce parcours te prépare à</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-400">
          <div>→ Réussir l'examen PMP 2026 (PMBOK 8)</div>
          <div>→ Maîtriser le mindset et l'éthique PMI</div>
          <div>→ Les 3 domaines : People, Process, Business</div>
          <div>→ Prédictif, agile et hybride</div>
          <div>→ Le calcul de la valeur acquise (EVM)</div>
          <div>→ T'auto-évaluer avec un examen blanc</div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          ⚠️ Le PMP exige aussi de l'expérience en gestion de projet et 35 heures de formation pour candidater — voir le module « Fondamentaux ».
        </p>
      </div>
    </div>
  );
}
