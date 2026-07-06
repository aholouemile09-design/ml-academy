"use client";

import { useEffect, useState } from "react";
import { useUserProgress as useProgress } from "@/lib/userProgress";

export default function Parametres() {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);
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

  useEffect(() => {
    setHasKey(Boolean(localStorage.getItem("ml-academy-api-key")));
  }, []);

  const save = () => {
    if (key.trim()) {
      localStorage.setItem("ml-academy-api-key", key.trim());
      setHasKey(true);
      setKey("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const remove = () => {
    localStorage.removeItem("ml-academy-api-key");
    setHasKey(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Paramètres</h1>
        <p className="text-slate-400">Configuration du tuteur AI et de votre progression.</p>
      </div>

      <section className="card p-6 space-y-4">
        <h2 className="font-bold text-white">🔑 Clé API Anthropic</h2>
        <p className="text-sm text-slate-400">
          Sans clé, le tuteur fonctionne en <strong className="text-white">mode simulé</strong> (réponses
          pré-construites sur les concepts du parcours). Avec une clé, il devient un vrai agent
          conversationnel propulsé par Claude, capable de répondre à tout, corriger votre code et créer
          des exercices sur mesure. Obtenez une clé sur{" "}
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noreferrer"
            className="text-accent-light underline"
          >
            console.anthropic.com
          </a>
          .
        </p>
        <p className="text-xs text-slate-500">
          La clé est stockée uniquement dans votre navigateur (localStorage) et transite par le backend du
          site pour appeler l'API — elle n'est jamais partagée ailleurs.
        </p>

        {hasKey ? (
          <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
            <span className="text-sm text-emerald-400 font-medium">✅ Clé API configurée — tuteur complet actif</span>
            <button onClick={remove} className="text-sm text-rose-400 hover:underline">
              Supprimer
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600"
            />
            <button onClick={save} className="btn-primary">
              Enregistrer
            </button>
          </div>
        )}
        {saved && <p className="text-sm text-emerald-400">Clé enregistrée !</p>}
      </section>

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
            className="w-4 h-4 accent-indigo-500" />
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
