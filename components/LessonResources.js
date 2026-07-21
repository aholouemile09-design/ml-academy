"use client";

const TYPE_META = {
  video:    { icon: "🎥", label: "Vidéo",         color: "border-red-500/30 bg-red-500/5 hover:border-red-500/60" },
  doc:      { icon: "📄", label: "Documentation",  color: "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60" },
  paper:    { icon: "📑", label: "Paper",          color: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60" },
  exercise: { icon: "🧪", label: "Exercice",       color: "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60" },
  book:     { icon: "📖", label: "Livre",          color: "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60" },
  course:   { icon: "🎓", label: "Cours",          color: "border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/60" },
};

const TYPE_ORDER = ["video", "course", "exercise", "doc", "paper", "book"];

export default function LessonResources({ resources }) {
  if (!resources?.length) return null;

  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const items = resources.filter((r) => r.type === type);
    if (items.length) acc[type] = items;
    return acc;
  }, {});

  return (
    <div className="mt-8 pt-6 border-t border-ink-700">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        📚 Pour aller plus loin
      </h3>
      <div className="space-y-4">
        {Object.entries(grouped).map(([type, items]) => {
          const meta = TYPE_META[type];
          return (
            <div key={type}>
              <p className="text-xs text-slate-500 font-medium mb-2">
                {meta.icon} {meta.label}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {items.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl border p-3 transition-colors cursor-pointer ${meta.color}`}
                  >
                    <p className="text-sm font-medium text-white leading-snug">{r.title}</p>
                    {r.author && (
                      <p className="text-xs text-slate-500 mt-0.5">{r.author}</p>
                    )}
                    {r.description && (
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{r.description}</p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
