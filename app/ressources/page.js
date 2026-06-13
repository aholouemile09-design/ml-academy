"use client";

import { useState } from "react";
import { RESOURCES, RESOURCE_CATEGORIES, searchResources, getResourcesByCategory } from "@/lib/resources";

const levelColor = {
  debutant: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  intermediaire: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  avance: "text-rose-400 bg-rose-500/10 border-rose-500/30",
};

const typeIcon = {
  Documentation: "📄",
  Cours: "🎓",
  "Cours interactif": "💻",
  Livre: "📚",
  "Livre interactif": "📖",
  Vidéo: "🎥",
  Certification: "🏅",
  Référence: "🗺",
};

export default function Ressources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [freeOnly, setFreeOnly] = useState(false);

  let results = search.length > 1 ? searchResources(search) : getResourcesByCategory(category === "Tous" ? null : category);
  if (freeOnly) results = results.filter((r) => r.free);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-1">Bibliothèque de Ressources</h1>
      <p className="text-slate-400 mb-8">
        {RESOURCES.length} ressources vérifiées, gratuites et légales — toutes issues des meilleures sources de l'industrie.
      </p>

      {/* Filtres */}
      <div className="card p-5 mb-8 space-y-4">
        <input
          type="text"
          placeholder="Rechercher (python, transformers, docker, sql...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600"
        />
        <div className="flex flex-wrap gap-2 items-center">
          {["Tous", ...RESOURCE_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setSearch(""); }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                category === c && !search
                  ? "border-accent bg-accent/10 text-white"
                  : "border-ink-700 text-slate-400 hover:border-accent/50"
              }`}
            >
              {c}
            </button>
          ))}
          <label className="ml-auto flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="accent-indigo-500"
            />
            Gratuit uniquement
          </label>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">{results.length} ressource{results.length > 1 ? "s" : ""}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((r) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-5 flex flex-col hover:border-accent/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xl">{typeIcon[r.type] || "📌"}</span>
              <div className="flex gap-1.5 flex-wrap justify-end">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColor[r.level]}`}>
                  {r.level}
                </span>
                {r.free ? (
                  <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    Gratuit
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                    Payant
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-bold text-white group-hover:text-accent-light transition-colors mb-1">
              {r.title}
            </h3>
            <p className="text-xs text-accent-light mb-2">{r.source}</p>
            <p className="text-sm text-slate-400 flex-1">{r.description}</p>
            {r.note && (
              <p className="text-xs text-amber-400 mt-2 italic">ℹ {r.note}</p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {r.tags.slice(0, 4).map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-lg bg-ink-800 text-slate-400">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs text-accent-light group-hover:underline flex items-center gap-1">
              Ouvrir la ressource →
            </div>
          </a>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <p className="text-4xl mb-4">🔍</p>
          <p>Aucune ressource trouvée pour cette recherche.</p>
        </div>
      )}

      <div className="mt-12 card p-6 bg-accent/5 border-accent/20">
        <h3 className="font-bold text-white mb-2">⚖️ Mentions légales</h3>
        <p className="text-sm text-slate-400">
          Toutes les ressources listées sont des ressources officielles, de la documentation libre, des livres en open access ou des plateformes pédagogiques reconnues. Aucun contenu piraté, aucun lien vers des ressources payantes obtenues illégalement. Les ressources marquées "Payant" renvoient directement vers les sites officiels des éditeurs.
        </p>
      </div>
    </div>
  );
}
