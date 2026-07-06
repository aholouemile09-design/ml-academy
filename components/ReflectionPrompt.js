"use client";

import { useState } from "react";

const PROMPTS = [
  "Qu'est-ce qui a été le plus difficile dans ce module ?",
  "Où vas-tu appliquer ce que tu viens d'apprendre ?",
];

export default function ReflectionPrompt({ moduleId, track, moduleTitle }) {
  const [responses, setResponses] = useState(["", ""]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);

  if (!open) return null;

  const handleSave = async () => {
    const toSave = PROMPTS.map((p, i) => ({ prompt: p, response: responses[i] }))
      .filter(x => x.response.trim());

    if (toSave.length === 0) { setOpen(false); return; }

    setSaving(true);
    setError("");
    try {
      await Promise.all(toSave.map(({ prompt, response }) =>
        fetch("/api/reflections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ module_id: moduleId, track, prompt, response }),
        })
      ));
      setSaved(true);
      setTimeout(() => setOpen(false), 1500);
    } catch {
      setError("Erreur lors de la sauvegarde.");
    }
    setSaving(false);
  };

  if (saved) {
    return (
      <div className="card p-5 mt-6 text-center border-emerald-500/30 bg-emerald-500/5">
        <p className="text-emerald-400 font-semibold">✅ Réflexions sauvegardées dans ton journal !</p>
      </div>
    );
  }

  return (
    <div className="card p-6 mt-6 border-accent/20 bg-accent/5 space-y-5">
      <div>
        <h3 className="text-base font-semibold text-white mb-1">✍️ Prends un moment pour réfléchir</h3>
        <p className="text-xs text-slate-500">Ces réflexions sont sauvegardées dans ton journal d'apprentissage.</p>
      </div>

      {PROMPTS.map((prompt, i) => (
        <div key={i}>
          <label className="text-sm text-slate-300 mb-2 block">{prompt}</label>
          <textarea
            value={responses[i]}
            onChange={e => setResponses(r => r.map((v, j) => j === i ? e.target.value : v))}
            rows={2}
            placeholder="Écris ta réflexion ici…"
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600 resize-none"
          />
        </div>
      ))}

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex gap-3">
        <button onClick={handleSave} disabled={saving}
          className="btn-primary text-sm disabled:opacity-50">
          {saving ? "Sauvegarde…" : "Sauvegarder dans mon journal"}
        </button>
        <button onClick={() => setOpen(false)} className="btn-secondary text-sm text-slate-500">
          Passer
        </button>
      </div>
    </div>
  );
}
