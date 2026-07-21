"use client";

import { useMemo } from "react";
import { computeStreak } from "@/lib/streak";

function offsetDay(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export default function StreakWidget({ activityDates = [], streakRecord = 0 }) {
  const { current, last30 } = useMemo(() => {
    const { current } = computeStreak(activityDates);
    const today = todayStr();
    const days = Array.from({ length: 30 }, (_, i) => {
      const dateStr = offsetDay(today, -(29 - i));
      const active = activityDates.includes(dateStr);
      const dow = new Date(dateStr).toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 1).toUpperCase();
      const isToday = dateStr === today;
      return { dateStr, active, dow, isToday };
    });
    return { current, last30: days };
  }, [activityDates]);

  const record = Math.max(streakRecord, current);

  // Milestone badges
  const milestones = [
    { days: 3,  icon: "🔥", label: "3 jours" },
    { days: 7,  icon: "⚡", label: "1 semaine" },
    { days: 14, icon: "💎", label: "2 semaines" },
    { days: 30, icon: "🏆", label: "1 mois" },
  ];

  return (
    <div className="card p-5">
      <p className="text-xs text-slate-500 uppercase font-semibold mb-4">🔥 Streak de régularité</p>

      {/* Compteurs principaux */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1 rounded-xl bg-orange-500/10 border border-orange-500/20 p-3 text-center">
          <p className="text-3xl font-bold text-orange-400">{current}</p>
          <p className="text-xs text-slate-400 mt-0.5">jour{current !== 1 ? "s" : ""} actuel</p>
        </div>
        <div className="flex-1 rounded-xl bg-ink-800 border border-ink-700 p-3 text-center">
          <p className="text-3xl font-bold text-white">{record}</p>
          <p className="text-xs text-slate-400 mt-0.5">record</p>
        </div>
      </div>

      {/* Heatmap 30 jours */}
      <p className="text-xs text-slate-500 mb-2">30 derniers jours</p>
      <div className="grid grid-cols-[repeat(30,1fr)] gap-0.5 mb-4">
        {last30.map(({ dateStr, active, isToday }) => (
          <div
            key={dateStr}
            title={dateStr}
            className={`aspect-square rounded-sm transition-colors ${
              active
                ? "bg-orange-500"
                : isToday
                ? "bg-ink-700 ring-1 ring-orange-500/50"
                : "bg-ink-800"
            }`}
          />
        ))}
      </div>

      {/* Badges milestone */}
      <div className="flex gap-2 flex-wrap">
        {milestones.map(m => {
          const unlocked = record >= m.days;
          return (
            <div
              key={m.days}
              title={unlocked ? `Débloqué ! ${m.label} de streak` : `${m.days - current} jour${m.days - current !== 1 ? "s" : ""} restants`}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors ${
                unlocked
                  ? "border-orange-500/40 bg-orange-500/10 text-orange-300"
                  : "border-ink-700 text-slate-600"
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </div>
          );
        })}
      </div>

      {current === 0 && (
        <p className="text-xs text-slate-500 mt-3 text-center">
          Complete une leçon aujourd'hui pour démarrer ton streak ! 🚀
        </p>
      )}
    </div>
  );
}
