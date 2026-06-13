"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/projects";
import { LEVELS } from "@/lib/curriculum";

export default function Projets() {
  const [filter, setFilter] = useState("tous");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "tous" ? PROJECTS : PROJECTS.filter((p) => p.level === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-1">Projets pratiques</h1>
      <p className="text-slate-400 mb-8">
        Construisez votre portfolio avec des projets guidés, du débutant à l'avancé.
      </p>

      <div className="flex gap-2 mb-8 flex-wrap">
        {["tous", "debutant", "intermediaire", "avance"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              filter === f
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 text-slate-400 hover:border-accent/50"
            }`}
          >
            {f === "tous" ? "Tous" : LEVELS[f].label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map((p) => (
          <div key={p.id} className="card p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="font-bold text-white">{p.title}</h2>
              <span
                className={`px-2 py-0.5 rounded-full border text-xs font-medium whitespace-nowrap ${LEVELS[p.level].badge} ${LEVELS[p.level].color}`}
              >
                {LEVELS[p.level].label}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4 flex-1">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.skills.map((s) => (
                <span key={s} className="px-2 py-1 rounded-lg bg-ink-800 text-xs text-slate-300">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">⏱ {p.duration}</span>
              <button
                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                className="text-sm text-accent-light hover:text-accent-cyan font-medium"
              >
                {expanded === p.id ? "Masquer les étapes ↑" : "Voir les étapes →"}
              </button>
            </div>
            {expanded === p.id && (
              <ol className="mt-4 pt-4 border-t border-ink-700 space-y-2">
                {p.steps.map((s, i) => (
                  <li key={i} className="text-sm text-slate-400 flex gap-3">
                    <span className="text-accent-light font-mono shrink-0">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
