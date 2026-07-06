"use client";

import Link from "next/link";
import { useUserProgress as useProgress, computeStats } from "@/lib/userProgress";
import { LEVELS } from "@/lib/curriculum";
import { useEffect, useState } from "react";

function ReviewWidget() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    fetch("/api/review")
      .then(r => r.json())
      .then(d => setCount(d.cards?.length ?? 0))
      .catch(() => setCount(0));
  }, []);

  if (count === null) return null;

  return (
    <Link href="/reviser" className="card p-5 flex items-center gap-4 hover:border-accent/50 transition-colors mb-10">
      <div className="text-3xl">🃏</div>
      <div className="flex-1">
        <div className="font-semibold text-white">
          {count === 0 ? "Aucune révision aujourd'hui" : `${count} carte${count > 1 ? "s" : ""} à réviser`}
        </div>
        <div className="text-xs text-slate-400 mt-0.5">
          {count === 0 ? "Tout est à jour ✅" : "Clique pour réviser maintenant →"}
        </div>
      </div>
      {count > 0 && (
        <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent text-white">{count}</span>
      )}
    </Link>
  );
}

export default function Dashboard() {
  const progress = useProgress();
  if (!progress || !progress.loaded) {
    return <div className="max-w-6xl mx-auto px-6 py-20 text-slate-500">Chargement…</div>;
  }

  const stats = computeStats(progress);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-1">Tableau de bord</h1>
      <p className="text-slate-400 mb-10">Votre progression dans le parcours CodeGraft Academy.</p>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="card p-5">
          <div className="text-xs text-slate-500 mb-1">Niveau</div>
          <div className="text-2xl font-extrabold gradient-text">{stats.level}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500 mb-1">Expérience</div>
          <div className="text-2xl font-extrabold text-white">⚡ {progress.xp} XP</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500 mb-1">Leçons complétées</div>
          <div className="text-2xl font-extrabold text-white">
            {stats.done}/{stats.total}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500 mb-1">Progression globale</div>
          <div className="text-2xl font-extrabold text-white">{stats.pct}%</div>
        </div>
      </div>

      <ReviewWidget />

      {/* Global progress bar */}
      <div className="card p-6 mb-10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Parcours complet</span>
          <span className="text-accent-light font-semibold">{stats.pct}%</span>
        </div>
        <div className="w-full h-3 bg-ink-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all"
            style={{ width: `${stats.pct}%` }}
          />
        </div>
      </div>

      {/* Modules */}
      <h2 className="text-xl font-bold text-white mb-4">Modules</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {stats.moduleStats.map((m) => (
          <Link
            key={m.id}
            href={`/parcours/${m.id}`}
            className="card p-5 hover:border-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{m.title}</div>
                <div className={`text-xs ${LEVELS[m.level].color}`}>{LEVELS[m.level].label}</div>
              </div>
              {m.completed && <span className="text-xl">🏆</span>}
            </div>
            <div className="w-full h-2 bg-ink-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent-cyan"
                style={{ width: `${m.pct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>
                {m.done}/{m.total} leçons
              </span>
              <span>
                {m.quiz ? `Quiz : ${m.quiz.score}/${m.quiz.total}` : "Quiz non passé"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Badges */}
      <h2 className="text-xl font-bold text-white mb-4">Badges</h2>
      {stats.badges.length === 0 ? (
        <p className="text-slate-500 text-sm">
          Complétez votre première leçon pour décrocher votre premier badge !
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {stats.badges.map((b) => (
            <span
              key={b.label}
              className="px-4 py-2 rounded-xl bg-ink-900 border border-ink-700 text-sm font-medium"
            >
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
