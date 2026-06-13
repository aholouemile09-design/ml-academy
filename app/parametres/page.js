"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";

export default function Parametres() {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const progress = useProgress();

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
