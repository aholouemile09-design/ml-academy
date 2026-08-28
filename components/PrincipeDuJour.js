"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { PRINCIPES, CATEGORIES, principeDuJour } from "@/lib/principes";

/**
 * Le principe du jour : une règle de méthode, stable sur 24 h.
 *
 * Volontairement lisible d'un coup d'œil, avec le développement replié —
 * l'idée est de recroiser la phrase, pas d'imposer une lecture.
 *
 * Le calcul dépend de la date, donc du fuseau du visiteur : on le fait après
 * le montage pour éviter un écart entre le rendu serveur et le rendu client.
 */
export default function PrincipeDuJour({ compact = false }) {
  const [principe, setPrincipe] = useState(null);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    setPrincipe(principeDuJour());
  }, []);

  const tirerAuHasard = () => {
    let suivant = principe;
    while (suivant === principe && PRINCIPES.length > 1) {
      suivant = PRINCIPES[Math.floor(Math.random() * PRINCIPES.length)];
    }
    setPrincipe(suivant);
    setOuvert(false);
  };

  if (!principe) {
    // Réserve la hauteur pendant le premier rendu, pour éviter un saut de mise en page.
    return <div className="card p-6 min-h-[132px]" aria-hidden="true" />;
  }

  const cat = CATEGORIES[principe.categorie];

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-lg">{cat.icon}</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${cat.couleur}`}>
            Principe du jour · {cat.label}
          </span>
        </div>
        <button
          onClick={tirerAuHasard}
          className="text-xs text-slate-500 hover:text-accent-light transition-colors"
          title="Afficher un autre principe"
        >
          🎲 un autre
        </button>
      </div>

      <p className="text-lg sm:text-xl font-semibold text-white leading-snug">{principe.court}</p>

      {!compact && (
        <>
          <button
            onClick={() => setOuvert((v) => !v)}
            className="mt-4 text-xs px-3 py-1.5 rounded-lg border border-ink-700 text-slate-400 hover:border-accent/50 hover:text-slate-200 transition-colors"
          >
            {ouvert ? "Replier" : "Pourquoi ça compte →"}
          </button>

          {ouvert && (
            <div className="mt-4 pt-4 border-t border-ink-700 text-sm">
              <p className="text-sm font-semibold text-white mb-2">{principe.titre}</p>
              <Markdown text={principe.texte} />
            </div>
          )}
        </>
      )}

      <div className="mt-4 pt-4 border-t border-ink-700 flex items-center justify-between gap-3 flex-wrap">
        <Link
          href="/principes"
          className="text-xs text-accent-light hover:underline underline-offset-4"
        >
          Lire les {PRINCIPES.length} principes →
        </Link>
        {principe.source && (
          <span className="text-xs text-slate-600">rencontré dans « {principe.source} »</span>
        )}
      </div>
    </div>
  );
}
