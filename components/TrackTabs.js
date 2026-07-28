"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Les trois parcours en onglets plutôt qu'en sections empilées :
 * ils tiennent dans un écran et se comparent d'un clic.
 */
export default function TrackTabs({ tracks }) {
  const [active, setActive] = useState(0);
  const track = tracks[active];

  return (
    <div>
      {/* Sélecteur */}
      <div
        role="tablist"
        aria-label="Parcours disponibles"
        className="flex gap-2 p-1.5 rounded-2xl bg-ink-900 border border-ink-700 w-fit mx-auto mb-10 flex-wrap justify-center"
      >
        {tracks.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
              i === active
                ? "bg-accent text-ink-950 shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
            style={{ transitionTimingFunction: "var(--ease-soft)" }}
          >
            <span aria-hidden="true">{t.icon}</span>
            <span>{t.label}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md ${
                i === active ? "bg-ink-950/20" : "bg-ink-800"
              }`}
            >
              {t.total}
            </span>
          </button>
        ))}
      </div>

      {/* Panneau */}
      <div
        key={track.id}
        id={`panel-${track.id}`}
        role="tabpanel"
        className="animate-fade-up"
      >
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="space-y-3">
            {track.modules.map((m, i) => (
              <Link
                key={m.id}
                href={`${track.basePath}/${m.id}`}
                className="card p-4 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center text-xl shrink-0">
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-500 text-xs font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-white group-hover:text-accent-light text-sm transition-colors">
                      {m.title}
                    </h3>
                  </div>
                  {m.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.description}</p>
                  )}
                </div>
                <span className="text-slate-600 group-hover:text-accent-light transition-colors">→</span>
              </Link>
            ))}
            <Link
              href={track.basePath}
              className="block text-center py-3 text-sm text-slate-500 hover:text-accent-light transition-colors link-underline w-fit mx-auto"
            >
              Voir les {track.total} modules du parcours →
            </Link>
          </div>

          {/* Fiche récapitulative */}
          <div className="card p-6 gradient-border">
            <div className="text-3xl mb-3">{track.icon}</div>
            <h3 className="font-bold text-white mb-2">{track.title}</h3>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">{track.pitch}</p>
            <div className="space-y-2.5 mb-6">
              {track.highlights.map((h) => (
                <div key={h} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-accent-light shrink-0">→</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
            <Link href={track.basePath} className="btn-primary w-full justify-center text-sm">
              Commencer ce parcours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
