"use client";

import Link from "next/link";

const DOMAIN_LABELS = {
  people: { label: "People (33%)", icon: "👥" },
  process: { label: "Process (41%)", icon: "⚙️" },
  business: { label: "Business Env. (26%)", icon: "🏢" },
  agile: { label: "Agile / Hybride", icon: "🔄" },
};

const DOMAIN_MODULE_LINKS = {
  people: "/pmp/people",
  process: "/pmp/process",
  business: "/pmp/business",
  agile: "/pmp/agile-hybride",
};

function gaugeColor(index) {
  if (index >= 70) return "from-emerald-500 to-emerald-400";
  if (index >= 50) return "from-amber-500 to-amber-400";
  return "from-rose-500 to-rose-400";
}

function gaugeText(index) {
  if (index >= 75) return "Excellent — tu approches du niveau requis.";
  if (index >= 70) return "Bien — vise 70 %+ stable sur 2–3 examens blancs avant de réserver.";
  if (index >= 50) return "En progrès — renforce les domaines faibles avant de t'inscrire.";
  return "Début — continue les modules et passe les quiz régulièrement.";
}

export default function PmpReadiness({ readiness }) {
  const { index, domainScores, examScore } = readiness;

  if (index === null) {
    return (
      <div className="card p-5 mb-8 border-amber-500/20">
        <h2 className="text-base font-semibold text-white mb-1">Indice de préparation PMP</h2>
        <p className="text-sm text-slate-500">
          Passe les quiz des modules People, Process, Business et l'examen blanc pour voir ton indice apparaître ici.
        </p>
      </div>
    );
  }

  const weakDomains = Object.entries(domainScores)
    .filter(([, s]) => s !== null && s < 70)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3);

  return (
    <div className="card p-6 mb-8 border-accent/20">
      <h2 className="text-base font-semibold text-white mb-4">Indice de préparation PMP</h2>

      {/* Jauge principale */}
      <div className="flex items-end gap-4 mb-4">
        <div className="text-5xl font-extrabold gradient-text">{index}%</div>
        <p className="text-sm text-slate-400 pb-1">{gaugeText(index)}</p>
      </div>
      <div className="w-full h-3 bg-ink-800 rounded-full overflow-hidden mb-6">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all ${gaugeColor(index)}`}
          style={{ width: `${index}%` }}
        />
      </div>

      {/* Scores par domaine */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {Object.entries(DOMAIN_LABELS).map(([key, { label, icon }]) => {
          const s = domainScores[key];
          return (
            <div key={key} className="bg-ink-800 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-xs text-slate-500 mb-1">{label}</div>
              <div className={`text-lg font-bold ${s === null ? "text-slate-600" : s >= 70 ? "text-emerald-400" : s >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                {s !== null ? `${s}%` : "—"}
              </div>
            </div>
          );
        })}
      </div>

      {examScore !== null && (
        <div className="text-sm text-slate-400 mb-4">
          Dernier examen blanc : <span className={`font-semibold ${examScore >= 70 ? "text-emerald-400" : examScore >= 50 ? "text-amber-400" : "text-rose-400"}`}>{examScore}%</span>
          {examScore < 70 && " — vise 70%+ sur 2–3 examens avant de réserver."}
        </div>
      )}

      {/* Recommandations */}
      {weakDomains.length > 0 && (
        <div className="border-t border-ink-700 pt-4">
          <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wide">Domaines prioritaires</p>
          <div className="flex flex-wrap gap-2">
            {weakDomains.map(([key]) => (
              <Link key={key} href={DOMAIN_MODULE_LINKS[key]}
                className="text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors">
                {DOMAIN_LABELS[key].icon} {DOMAIN_LABELS[key].label} →
              </Link>
            ))}
            <Link href="/reviser"
              className="text-xs px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent-light hover:bg-accent/20 transition-colors">
              🃏 Réviser →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
