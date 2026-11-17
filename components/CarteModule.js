import Link from "next/link";

// Carte d'un module dans la grille d'un parcours. Les trois catalogues
// (/parcours, /webdev, /pmp) affichaient la même carte en pleine ligne sur
// 896 px ; en grille, quatre modules tiennent côte à côte sur grand écran.
// Le rang reste en tête de carte, à l'accent quand le module est terminé.
export default function CarteModule({ href, rang, prefixe, niveau, title, description, done, total, complement }) {
  const pct = Math.round((done / total) * 100);

  return (
    <Link
      href={href}
      className="card p-5 flex flex-col h-full hover:border-accent/50 transition-colors group"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className={`font-mono text-2xl ${pct === 100 ? "text-accent-light" : "text-slate-600"}`}>
          {String(rang).padStart(2, "0")}
        </span>
        <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${niveau.badge} ${niveau.color}`}>
          {niveau.label}
        </span>
      </div>
      <span className="text-slate-500 font-mono text-xs mb-1">
        {prefixe} {rang}
      </span>
      <h2 className="text-base font-bold text-white group-hover:text-accent-light transition-colors">
        {title}
      </h2>
      <p className="text-sm text-slate-400 mt-2 line-clamp-4">{description}</p>
      <div className="mt-auto pt-5">
        <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-accent-cyan" style={{ width: `${pct}%` }} />
        </div>
        <span className="block mt-2 text-xs text-slate-500">
          {done}/{total} leçons
          {complement}
        </span>
      </div>
    </Link>
  );
}
