"use client";

import { useEffect, useState } from "react";
import { useUserProgress as useProgress } from "@/lib/userProgress";

export default function Parametres() {
  const progress = useProgress();

  const [goalType, setGoalType] = useState("lessons");
  const [goalTarget, setGoalTarget] = useState(5);
  const [reminderOptIn, setReminderOptIn] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);

  useEffect(() => {
    if (progress?.loaded) {
      setGoalType(progress.weeklyGoalType || "lessons");
      setGoalTarget(progress.weeklyGoalTarget || 5);
      setReminderOptIn(progress.reminderOptIn || false);
    }
  }, [progress?.loaded]);

  const saveGoal = () => {
    progress?.updateGoal(goalType, Number(goalTarget), reminderOptIn);
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Paramètres</h1>
        <p className="text-slate-400">Votre objectif de travail et votre progression.</p>
      </div>

      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-white">🎯 Objectif hebdomadaire</h2>
        <p className="text-sm text-slate-400">Définis le nombre de jours actifs que tu veux atteindre chaque semaine.</p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Jours par semaine :</label>
            <select value={goalTarget} onChange={e => setGoalTarget(e.target.value)}
              className="bg-ink-950 border border-ink-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent">
              {[1,2,3,4,5,6,7].map(n => (
                <option key={n} value={n}>{n} jour{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="reminder" checked={reminderOptIn}
            onChange={e => setReminderOptIn(e.target.checked)}
            className="w-4 h-4 accent-[#D9AE5F]" />
          <label htmlFor="reminder" className="text-sm text-slate-300">
            Recevoir un email de rappel quotidien (si aucune activité dans la journée)
          </label>
        </div>
        {reminderOptIn && (
          <p className="text-xs text-slate-500">
            📧 Les rappels seront envoyés à <strong className="text-white">{progress?.user?.email}</strong>.
            Tu peux te désabonner ici à tout moment.
          </p>
        )}
        <div className="flex items-center gap-3">
          <button onClick={saveGoal} className="btn-primary text-sm">Enregistrer</button>
          {goalSaved && <span className="text-sm text-emerald-400">Sauvegardé !</span>}
        </div>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-white">📊 Progression</h2>
        <p className="text-sm text-slate-400">
          Votre progression ({progress?.xp ?? 0} XP, {progress?.completedLessons?.length ?? 0} leçons) est
          sauvegardée localement dans ce navigateur.
        </p>
        <button
          onClick={() => {
            if (confirm("Réinitialiser toute votre progression ?")) progress?.resetProgress();
          }}
          className="btn-secondary text-rose-400 border-rose-500/30 hover:border-rose-500"
        >
          Réinitialiser ma progression
        </button>
      </section>
    </div>
  );
}
