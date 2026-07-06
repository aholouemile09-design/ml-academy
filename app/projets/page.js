"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECTS, PROJECT_LEVELS } from "@/lib/projects";
import Link from "next/link";

const FILTERS = ["tous", "debutant", "intermediaire", "avance"];

function HintBadge({ level }) {
  const map = {
    high:   { label: "💡 Assistance maximale", cls: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
    medium: { label: "🔦 Astuces légères",     cls: "text-amber-400   border-amber-500/30   bg-amber-500/5"   },
    none:   { label: "🧠 Autonomie totale",    cls: "text-rose-400    border-rose-500/30    bg-rose-500/5"    },
  };
  const b = map[level] || map.none;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${b.cls}`}>{b.label}</span>
  );
}

function HintsPanel({ hints, steps }) {
  const [openHint, setOpenHint] = useState(null);
  if (!hints || hints.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-ink-700">
      <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Astuces disponibles</p>
      <div className="space-y-2">
        {hints.map((h, i) => (
          <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
            <button
              onClick={() => setOpenHint(openHint === i ? null : i)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-amber-500/10 transition-colors"
            >
              <span className="text-sm font-medium text-amber-300">
                💡 Étape {h.step + 1} — {h.title}
              </span>
              <span className="text-amber-500 text-xs shrink-0">{openHint === i ? "▲" : "▼"}</span>
            </button>
            {openHint === i && (
              <div className="px-4 pb-3">
                <p className="text-sm text-slate-300 leading-relaxed">{h.hint}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projets() {
  const [filter, setFilter]     = useState("tous");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "tous"
    ? PROJECTS
    : PROJECTS.filter(p => p.level === filter);

  const levelCounts = {
    debutant:      PROJECTS.filter(p => p.level === "debutant").length,
    intermediaire: PROJECTS.filter(p => p.level === "intermediaire").length,
    avance:        PROJECTS.filter(p => p.level === "avance").length,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-40 sm:h-52">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=75"
          alt="Projets pratiques Machine Learning"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-1">🛠 Projets pratiques</h1>
          <p className="text-slate-200/90 text-sm">Construis ton portfolio avec des projets guidés, de débutant à expert.</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-slate-400 mb-4">
          Construis ton portfolio avec des projets guidés. Chaque niveau d'assistance est adapté à ta progression.
        </p>
        {/* Compteurs */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(PROJECT_LEVELS).map(([key, lvl]) => (
            <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${lvl.badge} ${lvl.color}`}>
              {lvl.label} — {levelCounts[key]} projets
            </div>
          ))}
        </div>
      </div>

      {/* Règle IA — important */}
      <div className="card p-4 mb-8 border-accent/20 bg-accent/5">
        <p className="text-sm text-slate-300">
          <span className="text-accent-light font-semibold">🤖 Règle du tuteur AI :</span>{" "}
          Tu peux demander de l'aide au tuteur pour comprendre un concept ou débloquer une erreur.
          Mais le tuteur ne fera jamais le projet à ta place — il te guidera pour que TU apprennes.
          C'est comme ça qu'on devient un vrai ingénieur ML.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              filter === f
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 text-slate-400 hover:border-accent/50"
            }`}
          >
            {f === "tous" ? `Tous (${PROJECTS.length})` : `${PROJECT_LEVELS[f]?.label} (${levelCounts[f]})`}
          </button>
        ))}
      </div>

      {/* Grille de projets */}
      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map(p => {
          const lvl = PROJECT_LEVELS[p.level];
          const isOpen = expanded === p.id;
          return (
            <div key={p.id} className="card p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h2 className="font-bold text-white">{p.title}</h2>
                </div>
                <span className={`px-2 py-0.5 rounded-full border text-xs font-medium whitespace-nowrap ${lvl.badge} ${lvl.color}`}>
                  {lvl.label}
                </span>
              </div>

              {/* Badge d'assistance */}
              <div className="mb-3">
                <HintBadge level={p.hint_level} />
              </div>

              <p className="text-sm text-slate-400 mb-3 flex-1">{p.description}</p>

              {/* Objectif d'apprentissage */}
              <p className="text-xs text-slate-500 mb-4 italic">🎯 {p.learning_goal}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.skills.map(s => (
                  <span key={s} className="px-2 py-1 rounded-lg bg-ink-800 text-xs text-slate-300">{s}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">⏱ {p.duration}</span>
                <button
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                  className="text-sm text-accent-light hover:text-accent-cyan font-medium transition-colors"
                >
                  {isOpen ? "Masquer ↑" : "Voir les détails →"}
                </button>
              </div>

              {/* Expanded panel */}
              {isOpen && (
                <div className="mt-2">
                  {/* Étapes */}
                  <div className="pt-4 border-t border-ink-700">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Étapes</p>
                    <ol className="space-y-2">
                      {p.steps.map((s, i) => (
                        <li key={i} className="text-sm text-slate-400 flex gap-3">
                          <span className="text-accent-light font-mono shrink-0 min-w-[1.2rem]">{i + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Astuces (débutant et intermédiaire uniquement) */}
                  {p.hint_level !== "none" && p.hints?.length > 0 && (
                    <HintsPanel hints={p.hints} steps={p.steps} />
                  )}

                  {/* Message avancé */}
                  {p.hint_level === "none" && (
                    <div className="mt-4 pt-4 border-t border-ink-700">
                      <p className="text-xs text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-xl px-4 py-3">
                        <strong>🧠 Niveau avancé :</strong> Pas d'astuces — c'est toi qui dois chercher, décomposer et itérer. C'est exactement ce qu'on attend d'un ML Engineer.
                      </p>
                    </div>
                  )}

                  {/* Ressources */}
                  {p.resources?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-ink-700">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Ressources</p>
                      <div className="flex flex-wrap gap-2">
                        {p.resources.map(r => (
                          <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-accent-light hover:text-accent-cyan underline underline-offset-2">
                            {r.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <Link href="/tuteur"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent-light text-sm font-semibold hover:bg-accent/20 transition-colors">
                      🤖 Demander de l'aide au tuteur
                    </Link>
                    <Link href={`/projets/${p.id}/feedback`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-colors">
                      📋 Soumettre pour feedback
                    </Link>
                    <Link href={`/projets/publier?id=${p.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-800 border border-ink-700 text-slate-300 text-sm font-semibold hover:border-accent/40 hover:text-white transition-colors">
                      🐙 Publier sur GitHub
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
