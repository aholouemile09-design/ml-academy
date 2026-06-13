"use client";

import { useState, useEffect } from "react";
import {
  WEEKLY_SCHEDULE,
  ROADMAP_5ANS,
  MONTHLY_PLAN_2026_2027,
  ANTI_DECOURAGE_RULES,
} from "@/lib/calendar";

const STORAGE_KEY = "ml-academy-calendar-checks";

const dayColors = {
  study: "bg-accent/10 border-accent/40",
  deep:  "bg-accent-cyan/10 border-accent-cyan/40",
  rest:  "bg-ink-800 border-ink-700",
};

const dayIcons = { study: "📖", deep: "🛠️", rest: "😴" };

export default function Calendrier() {
  const [tab, setTab] = useState("semaine");
  const [checks, setChecks] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    setChecks(saved);
    setLoaded(true);
  }, []);

  const toggle = (key) => {
    const next = { ...checks, [key]: !checks[key] };
    setChecks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const monthlyDone = MONTHLY_PLAN_2026_2027.filter((_, i) => checks[`month-${i}`]).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-1">Calendrier de Discipline</h1>
      <p className="text-slate-400 mb-8">
        Ton plan 2026-2031 — rythme réaliste pour un emploi à temps plein.
      </p>

      {/* Règles anti-décrochage */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {ANTI_DECOURAGE_RULES.map((r) => (
          <div key={r.rule} className="card p-4">
            <div className="text-2xl mb-1">{r.icon}</div>
            <div className="text-sm font-semibold text-white">{r.rule}</div>
            <div className="text-xs text-slate-400 mt-1">{r.detail}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {["semaine", "mensuel", "roadmap"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors capitalize ${
              tab === t
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 text-slate-400 hover:border-accent/50"
            }`}
          >
            {t === "semaine" ? "📅 Planning hebdo" : t === "mensuel" ? "🗓 Plan 2026-2027" : "🗺 Roadmap 5 ans"}
          </button>
        ))}
      </div>

      {/* ── PLANNING HEBDO ─────────────────────────────────────────────── */}
      {tab === "semaine" && (
        <div>
          <p className="text-slate-400 text-sm mb-6">
            Charge cible : <strong className="text-white">7–9h / semaine</strong> — assez pour progresser sans s'épuiser.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {WEEKLY_SCHEDULE.map((d) => (
              <div key={d.day} className={`card p-5 border ${dayColors[d.type]}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{dayIcons[d.type]}</span>
                  <div>
                    <div className="font-bold text-white">{d.day}</div>
                    <div className="text-xs text-slate-500 capitalize">
                      {d.type === "study" ? "Soir d'apprentissage (75 min)" : d.type === "deep" ? "Session projet (3h30)" : "Repos protégé"}
                    </div>
                  </div>
                  <div className="ml-auto">
                    {d.sessions.reduce((acc, s) => acc + s.duration, 0) > 0 && (
                      <span className="text-xs text-slate-400">
                        {Math.round(d.sessions.reduce((acc, s) => acc + s.duration, 0) / 60 * 10) / 10}h
                      </span>
                    )}
                  </div>
                </div>
                {d.sessions.map((s) => (
                  <div key={s.label} className="bg-ink-950/50 rounded-xl px-3 py-2 text-sm">
                    <div className="text-accent-light font-medium">{s.time}</div>
                    <div className="text-slate-300">{s.label}</div>
                  </div>
                ))}
                {d.sessions.length === 0 && (
                  <p className="text-sm text-slate-500 italic">
                    Repos absolu — la récupération fait partie du plan.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 card p-5 bg-accent/5 border-accent/20">
            <p className="text-sm text-slate-300">
              💡 <strong className="text-white">Règle finale :</strong> moins de ressources, plus de preuves. Si une ressource ne produit pas un projet ou une compétence testable, elle doit être retirée du planning.
            </p>
          </div>
        </div>
      )}

      {/* ── PLAN MENSUEL 2026-2027 ──────────────────────────────────────── */}
      {tab === "mensuel" && (
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-slate-400 text-sm">Coche chaque bloc complété avec un projet GitHub publié.</p>
            <span className="text-sm text-accent-light font-semibold">
              ✅ {monthlyDone} / {MONTHLY_PLAN_2026_2027.length} blocs
            </span>
          </div>

          <div className="w-full h-3 bg-ink-800 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all"
              style={{ width: `${(monthlyDone / MONTHLY_PLAN_2026_2027.length) * 100}%` }}
            />
          </div>

          <div className="space-y-4">
            {MONTHLY_PLAN_2026_2027.map((bloc, i) => (
              <div
                key={i}
                className={`card p-5 transition-colors ${checks[`month-${i}`] ? "border-emerald-500/40 bg-emerald-500/5" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggle(`month-${i}`)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      checks[`month-${i}`] ? "bg-emerald-500 border-emerald-500" : "border-ink-700 hover:border-emerald-500"
                    }`}
                  >
                    {checks[`month-${i}`] && <span className="text-white text-xs">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className={`text-xs font-mono font-bold ${bloc.color}`}>{bloc.month}</span>
                      <span className="text-xs border border-current rounded px-1.5 py-0.5 text-slate-500">
                        Priorité {bloc.priority}
                      </span>
                      <span className="text-xs text-slate-500">{bloc.weeks} sem.</span>
                    </div>
                    <h3 className="font-semibold text-white">{bloc.bloc}</h3>
                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      <div>📚 <em>{bloc.resource}</em></div>
                      <div>🛠️ <strong className="text-slate-300">Projet :</strong> {bloc.project}</div>
                      <div>✅ <strong className="text-slate-300">Validation :</strong> {bloc.validation}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ROADMAP 5 ANS ──────────────────────────────────────────────── */}
      {tab === "roadmap" && (
        <div className="space-y-6">
          {ROADMAP_5ANS.map((phase) => (
            <div key={phase.id} className={`card p-6 border ${phase.bgColor}`}>
              <div className="flex items-start gap-4">
                <span className="text-4xl">{phase.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className={`font-mono text-sm font-bold ${phase.textColor}`}>{phase.period}</span>
                    {phase.salaryTarget && (
                      <span className="text-xs text-slate-500 border border-ink-700 rounded px-2 py-0.5">
                        🎯 {phase.salaryTarget}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-white mb-1">{phase.title}</h2>
                  <p className="text-sm text-slate-400 mb-4">{phase.objective}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Livrables concrets</div>
                      <ul className="space-y-1">
                        {phase.livrables.map((l) => (
                          <li key={l} className="text-sm text-slate-300 flex gap-2">
                            <span className="text-accent-light">→</span> {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Jalons</div>
                      <ul className="space-y-1">
                        {phase.milestones.map((m) => (
                          <li key={m.month} className="text-sm text-slate-300 flex gap-2">
                            <span className={`font-mono text-xs font-bold shrink-0 ${phase.textColor}`}>{m.month}</span>
                            {m.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
