"use client";

import { useState } from "react";
import {
  WEEKLY_SCHEDULE,
  ROADMAP_5ANS,
  MODULE_PLAN,
  TOTAL_WEEKS_ML,
  TOTAL_WEEKS_WEB,
  ANTI_DECOURAGE_RULES,
} from "@/lib/calendar";
import Link from "next/link";

const DAY_STYLE = {
  study: { bg: "bg-accent/10 border-accent/40",           icon: "📖", label: "Étude"     },
  deep:  { bg: "bg-cyan-500/10 border-cyan-500/40",       icon: "🛠️", label: "Bloc profond" },
  rest:  { bg: "bg-ink-800 border-ink-700",               icon: "😴", label: "Repos"      },
};

const TABS = ["Programme type", "Modules ML", "Modules Web", "Roadmap 5 ans", "Règles anti-décrochage"];

function WeeksBar({ weeks, max }) {
  const pct = Math.round((weeks / max) * 100);
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-400 whitespace-nowrap">{weeks} sem.</span>
    </div>
  );
}

export default function CalendrierPage() {
  const [tab, setTab] = useState(0);

  const mlModules  = MODULE_PLAN.filter(m => m.track === "ml");
  const webModules = MODULE_PLAN.filter(m => m.track === "web");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">📅 Plan d'apprentissage</h1>
        <p className="text-slate-400 mb-4">
          Programme générique recommandé — environ <strong className="text-white">7-9h par semaine</strong>.
          Pour un calendrier avec tes propres dates, utilise{" "}
          <Link href="/espace" className="text-accent-light hover:underline">Mon Espace →</Link>
        </p>
        <div className="flex gap-4 flex-wrap">
          <div className="px-4 py-2 rounded-xl border border-accent/30 bg-accent/5 text-sm">
            🤖 ML/Data Science — <span className="text-white font-bold">{TOTAL_WEEKS_ML} semaines</span>
          </div>
          <div className="px-4 py-2 rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-sm text-cyan-400">
            🌐 Web Full Stack — <span className="text-white font-bold">{TOTAL_WEEKS_WEB} semaines</span>
          </div>
          <Link href="/espace" className="px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-sm text-emerald-400 hover:bg-emerald-500/10 transition-colors">
            📆 Mon calendrier personnel →
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              tab === i ? "bg-accent/20 border border-accent/40 text-white" : "text-slate-400 hover:text-white border border-transparent"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab 0 — Programme type hebdomadaire */}
      {tab === 0 && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm mb-6">
            Rythme recommandé : 3 soirs × 75 min + 1 bloc profond le samedi. Total ≈ 7-9h/semaine.
            Le dimanche est protégé pour la récupération.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {WEEKLY_SCHEDULE.map(day => {
              const style = DAY_STYLE[day.type];
              return (
                <div key={day.day} className={`rounded-2xl border p-4 ${style.bg}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{style.icon}</span>
                    <div>
                      <p className="font-semibold text-white">{day.day}</p>
                      <p className="text-xs text-slate-500">{style.label}</p>
                    </div>
                  </div>
                  {day.sessions.length > 0 ? (
                    <div className="space-y-1">
                      {day.sessions.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">{s.label}</span>
                          <span className="text-slate-500 font-mono text-xs">{s.time} ({s.duration}min)</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600 italic">Pas de session prévue</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 1 — Modules ML */}
      {tab === 1 && (
        <div>
          <p className="text-slate-400 text-sm mb-6">
            Durées estimées au rythme de 7-9h/semaine. Ces chiffres sont des moyennes — adapte selon ton niveau de départ.
          </p>
          <div className="space-y-3">
            {mlModules.map((m, i) => (
              <div key={m.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs text-slate-600 font-mono">0{i + 1}</span>
                      <h3 className="font-semibold text-white">{m.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-accent/30 bg-accent/5 text-accent-light">
                        Priorité {m.priority}
                      </span>
                    </div>
                    <WeeksBar weeks={m.weeks} max={10} />
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-xs text-slate-500">
                      <span>📚 {m.resource}</span>
                      <span>🛠 {m.project}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="card p-4 border-accent/30 bg-accent/5 text-center">
              <p className="text-white font-bold">Total parcours ML : <span className="text-accent-light">{TOTAL_WEEKS_ML} semaines</span></p>
              <p className="text-xs text-slate-500 mt-1">≈ {Math.round(TOTAL_WEEKS_ML / 4)} mois au rythme recommandé</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 — Modules Web */}
      {tab === 2 && (
        <div>
          <p className="text-slate-400 text-sm mb-6">
            Le parcours Web peut se faire en parallèle du ML (niveau débutant) ou après (niveaux intermédiaire/avancé).
          </p>
          <div className="space-y-3">
            {webModules.map((m, i) => (
              <div key={m.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs text-slate-600 font-mono">0{i + 1}</span>
                      <h3 className="font-semibold text-white">{m.title}</h3>
                    </div>
                    <WeeksBar weeks={m.weeks} max={8} />
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-xs text-slate-500">
                      <span>📚 {m.resource}</span>
                      <span>🛠 {m.project}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="card p-4 border-cyan-500/30 bg-cyan-500/5 text-center">
              <p className="text-white font-bold">Total parcours Web : <span className="text-cyan-400">{TOTAL_WEEKS_WEB} semaines</span></p>
              <p className="text-xs text-slate-500 mt-1">≈ {Math.round(TOTAL_WEEKS_WEB / 4)} mois au rythme recommandé</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3 — Roadmap 5 ans */}
      {tab === 3 && (
        <div className="space-y-5">
          {ROADMAP_5ANS.map(phase => (
            <div key={phase.id} className={`card p-6 border ${phase.bgColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{phase.icon}</span>
                <div>
                  <p className="text-xs text-slate-500">{phase.period}</p>
                  <h3 className={`font-bold text-lg ${phase.textColor}`}>{phase.title}</h3>
                </div>
                {phase.salaryTarget && (
                  <span className="ml-auto text-xs px-3 py-1 rounded-full bg-black/20 text-slate-300">
                    💰 {phase.salaryTarget}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-sm mb-4">{phase.objective}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Livrables</p>
                  <ul className="space-y-1">
                    {phase.livrables.map((l, i) => (
                      <li key={i} className="text-sm text-slate-300 flex gap-2">
                        <span className="text-emerald-400">✓</span>{l}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Jalons</p>
                  <ul className="space-y-1">
                    {phase.milestones.map((ms, i) => (
                      <li key={i} className="text-sm text-slate-300 flex gap-2">
                        <span className={`font-mono text-xs ${phase.textColor} shrink-0`}>{ms.month}</span>
                        {ms.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4 — Règles anti-décrochage */}
      {tab === 4 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {ANTI_DECOURAGE_RULES.map(r => (
            <div key={r.rule} className="card p-5">
              <div className="text-3xl mb-2">{r.icon}</div>
              <h3 className="font-bold text-white mb-1">{r.rule}</h3>
              <p className="text-sm text-slate-400">{r.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
