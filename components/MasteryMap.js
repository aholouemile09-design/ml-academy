"use client";

export default function MasteryMap({ modules, title = "Carte de maîtrise" }) {
  const attempted = modules.filter(m => m.pct !== null);
  if (attempted.length === 0) {
    return (
      <div className="card p-5 mb-8">
        <h2 className="text-base font-semibold text-white mb-1">{title}</h2>
        <p className="text-sm text-slate-500">Passe les quiz de chaque module pour voir ta maîtrise apparaître ici.</p>
      </div>
    );
  }

  return (
    <div className="card p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />≥80%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />50–79%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />&lt;50%</span>
        </div>
      </div>
      <div className="space-y-2">
        {modules.map(m => (
          <div key={m.id} className="flex items-center gap-3">
            <span className="text-base w-6 text-center shrink-0">{m.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-slate-300 truncate">{m.title}</span>
                <span className={`text-xs font-semibold ml-2 shrink-0 ${m.textColor}`}>
                  {m.pct !== null ? `${m.pct}%` : "—"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-ink-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${m.color}`}
                  style={{ width: `${m.pct ?? 0}%` }}
                />
              </div>
            </div>
            <span className={`text-xs w-20 text-right shrink-0 ${m.textColor}`}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
