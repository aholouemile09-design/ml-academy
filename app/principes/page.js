"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import PrincipeDuJour from "@/components/PrincipeDuJour";
import { PRINCIPES, CATEGORIES, principesParCategorie } from "@/lib/principes";

/**
 * Les principes, en entier.
 *
 * Le bandeau fait défiler les formules courtes ; cette page porte le
 * développement. Les ancres correspondent aux `id` du fichier lib/principes.js,
 * pour qu'un lien du bandeau ouvre directement la bonne fiche.
 */
export default function PrincipesPage() {
  const groupes = principesParCategorie();
  const [filtre, setFiltre] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [cible, setCible] = useState(null);

  // Surligne la fiche visée par l'ancre, pour qu'on la retrouve à l'arrivée.
  useEffect(() => {
    const ancre = () => setCible(window.location.hash.slice(1) || null);
    ancre();
    window.addEventListener("hashchange", ancre);
    return () => window.removeEventListener("hashchange", ancre);
  }, []);

  const correspond = (p) => {
    if (filtre && p.categorie !== filtre) return false;
    if (!recherche.trim()) return true;
    const q = recherche.toLowerCase();
    return (
      p.court.toLowerCase().includes(q) ||
      p.titre.toLowerCase().includes(q) ||
      p.texte.toLowerCase().includes(q)
    );
  };

  const visibles = PRINCIPES.filter(correspond);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">Les principes</h1>
      <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl">
        Les règles de méthode qui reviennent d'un module à l'autre. Elles ne sont rattachées à
        aucune leçon : ce sont les réflexes qui restent quand la syntaxe est oubliée. À relire de
        temps en temps, pas à apprendre par cœur.
      </p>

      <div className="mt-8">
        <PrincipeDuJour />
      </div>

      {/* ── Filtres ────────────────────────────────────────────────────────── */}
      <div className="mt-10 space-y-3">
        <input
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Chercher un principe…"
          className="w-full rounded-xl border border-ink-700 bg-ink-900 text-slate-300 text-sm px-4 py-2.5 focus:outline-none focus:border-accent/50 placeholder-slate-600"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltre(null)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              filtre === null
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 text-slate-400 hover:border-accent/50"
            }`}
          >
            Tout ({PRINCIPES.length})
          </button>
          {Object.entries(CATEGORIES).map(([cle, cat]) => (
            <button
              key={cle}
              onClick={() => setFiltre(filtre === cle ? null : cle)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                filtre === cle
                  ? "border-accent bg-accent/10 text-white"
                  : "border-ink-700 text-slate-400 hover:border-accent/50"
              }`}
            >
              {cat.icon} {cat.label} ({groupes[cle].length})
            </button>
          ))}
        </div>
      </div>

      {/* ── Les fiches ─────────────────────────────────────────────────────── */}
      {visibles.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">Aucun principe ne correspond à cette recherche.</p>
      ) : (
        Object.entries(CATEGORIES).map(([cle, cat]) => {
          const liste = groupes[cle].filter(correspond);
          if (liste.length === 0) return null;

          return (
            <section key={cle} className="mt-12">
              <h2 className={`text-sm font-bold uppercase tracking-wider mb-4 ${cat.couleur}`}>
                {cat.icon} {cat.label}
              </h2>

              <div className="space-y-4">
                {liste.map((p) => (
                  <article
                    key={p.id}
                    id={p.id}
                    className={`card p-6 scroll-mt-24 transition-colors ${
                      cible === p.id ? "border-accent" : ""
                    }`}
                  >
                    <p className="text-base sm:text-lg font-semibold text-white leading-snug">
                      {p.court}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {p.titre}
                      {p.source && <> · module « {p.source} »</>}
                    </p>

                    <div className="mt-4 pt-4 border-t border-ink-700 text-sm">
                      <Markdown text={p.texte} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}

      <div className="mt-14 card p-6 text-sm text-slate-400 leading-relaxed">
        <p className="text-white font-semibold mb-2">Comment s'en servir</p>
        <p>
          Ne cherche pas à les retenir. Ils reviennent dans le bandeau pendant que tu travailles, et
          c'est le fait de les recroiser au bon moment — devant un score trop beau, devant un fichier
          vide — qui les ancre. Le jour où l'un d'eux te vient avant que tu ne fasses l'erreur, il
          est acquis.
        </p>
        <Link href="/parcours" className="btn-secondary mt-5">
          Retour au parcours
        </Link>
      </div>
    </div>
  );
}
