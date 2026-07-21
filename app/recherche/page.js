"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

// Flatten all lessons from all tracks into searchable items
function buildIndex() {
  const items = [];

  const addTrack = (curriculum, track, trackLabel, baseHref) => {
    for (const mod of curriculum) {
      for (const lesson of mod.lessons || []) {
        items.push({
          track,
          trackLabel,
          trackIcon: track === "ml" ? "🤖" : track === "web" ? "🌐" : "📋",
          moduleId: mod.id,
          moduleTitle: mod.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          duration: lesson.duration,
          href: `${baseHref}/${mod.id}`,
          // Searchable text (title + content excerpt, lowercased)
          searchable: `${lesson.title} ${lesson.content || ""}`.toLowerCase(),
        });
      }
    }
  };

  addTrack(CURRICULUM,     "ml",  "ML & Data Science", "/parcours");
  addTrack(WEB_CURRICULUM, "web", "Web Full Stack",     "/webdev");
  addTrack(PMP_CURRICULUM, "pmp", "PMP 2026",           "/pmp");

  return items;
}

const INDEX = buildIndex();

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((p, i) =>
    regex.test(p) ? <mark key={i} className="bg-accent/30 text-white rounded px-0.5">{p}</mark> : p
  );
}

function getExcerpt(content = "", query = "", maxLen = 120) {
  const lower = content.toLowerCase();
  const idx = query ? lower.indexOf(query.toLowerCase()) : -1;
  if (idx === -1 || !query) return content.slice(0, maxLen);
  const start = Math.max(0, idx - 40);
  const end = Math.min(content.length, start + maxLen);
  const excerpt = (start > 0 ? "…" : "") + content.slice(start, end) + (end < content.length ? "…" : "");
  return excerpt;
}

const TRACK_FILTERS = [
  { id: "all", label: "Tous", icon: "🎓" },
  { id: "ml",  label: "ML & Data", icon: "🤖" },
  { id: "web", label: "Web Full Stack", icon: "🌐" },
  { id: "pmp", label: "PMP 2026", icon: "📋" },
];

export default function RecherchePage() {
  const [query, setQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    return INDEX
      .filter(item => (trackFilter === "all" || item.track === trackFilter) && item.searchable.includes(q))
      .slice(0, 40);
  }, [query, trackFilter]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">🔍 Recherche globale</h1>
      <p className="text-slate-400 text-sm mb-6">
        Cherche dans toutes les leçons ML, Web Full Stack et PMP.
      </p>

      {/* Barre de recherche */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          placeholder="Ex: gradient descent, hooks React, WBS, ARIMA…"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-ink-700 bg-ink-900 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-accent/60"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">✕</button>
        )}
      </div>

      {/* Filtres par track */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TRACK_FILTERS.map(t => (
          <button
            key={t.id}
            onClick={() => setTrackFilter(t.id)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1 ${
              trackFilter === t.id
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 text-slate-400 hover:border-accent/40"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Résultats */}
      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-2xl mb-2">😕</p>
          <p>Aucun résultat pour "<span className="text-white">{query}</span>"</p>
          <p className="text-xs mt-2">Essaie d'autres mots-clés ou un autre track.</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-3">{results.length} résultat{results.length > 1 ? "s" : ""}</p>
          <div className="space-y-3">
            {results.map(item => {
              const excerpt = getExcerpt(item.searchable, query.trim().toLowerCase());
              return (
                <Link
                  key={`${item.moduleId}-${item.lessonId}`}
                  href={item.href}
                  className="block card p-4 hover:border-accent/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-ink-800 border border-ink-700 text-slate-400">
                          {item.trackIcon} {item.trackLabel}
                        </span>
                        <span className="text-xs text-slate-500">{item.moduleTitle}</span>
                      </div>
                      <p className="font-semibold text-white group-hover:text-accent-light transition-colors">
                        {highlight(item.lessonTitle, query.trim())}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {highlight(excerpt, query.trim())}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-500">{item.duration}</span>
                      <p className="text-accent-light text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Ouvrir →</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {query.length === 0 && (
        <div className="text-center py-12 text-slate-600">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">{INDEX.length} leçons indexées — commence à taper pour chercher</p>
        </div>
      )}
    </div>
  );
}
