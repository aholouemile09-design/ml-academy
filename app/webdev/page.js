"use client";

import Link from "next/link";
import { WEB_CURRICULUM, WEB_LEVELS } from "@/lib/webdev";
import { useProgress } from "@/lib/progress";

export default function WebDev() {
  const progress = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-4">
          🌐 Nouveau parcours
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">Développement Web Full Stack</h1>
        <p className="text-slate-400 max-w-2xl">
          Crée tes propres applications web : portfolios, dashboards ML, SaaS. Ce parcours est complémentaire au track ML — ensemble, ils te rendent autonome de bout en bout.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">{WEB_CURRICULUM.length}</div>
          <div className="text-xs text-slate-500 mt-1">modules</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">
            {WEB_CURRICULUM.reduce((a, m) => a + m.lessons.length, 0)}
          </div>
          <div className="text-xs text-slate-500 mt-1">leçons</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-extrabold gradient-text">100%</div>
          <div className="text-xs text-slate-500 mt-1">gratuit & open source</div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-ink-700 hidden sm:block" />
        <div className="space-y-5">
          {WEB_CURRICULUM.map((m, i) => {
            const done = progress
              ? m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
              : 0;
            const pct = Math.round((done / m.lessons.length) * 100);

            return (
              <Link
                key={m.id}
                href={`/webdev/${m.id}`}
                className="card p-6 flex gap-5 hover:border-accent/50 transition-colors relative sm:ml-14 group block"
              >
                <div className="absolute -left-14 top-6 w-12 h-12 rounded-full bg-ink-900 border border-ink-700 hidden sm:flex items-center justify-center text-xl">
                  {pct === 100 ? "✅" : m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="text-slate-500 font-mono text-sm">Web {i + 1}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${WEB_LEVELS[m.level].badge} ${WEB_LEVELS[m.level].color}`}>
                      {WEB_LEVELS[m.level].label}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-accent-light transition-colors">
                    <span className="sm:hidden mr-2">{m.icon}</span>
                    {m.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">{m.description}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {done}/{m.lessons.length} leçons
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10 card p-6 bg-blue-500/5 border-blue-500/20">
        <h3 className="font-bold text-white mb-2">🛠 Ce que tu pourras construire</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-400">
          <div>→ Portfolio personnel professionnel</div>
          <div>→ Dashboard de visualisation ML</div>
          <div>→ Interface pour tes APIs FastAPI</div>
          <div>→ SaaS / application web complète</div>
          <div>→ Site vitrine (ce modèle à adapter)</div>
          <div>→ Application avec authentification</div>
        </div>
      </div>
    </div>
  );
}
