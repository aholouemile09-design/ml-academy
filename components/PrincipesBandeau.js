"use client";

import Link from "next/link";
import { PRINCIPES, CATEGORIES } from "@/lib/principes";

/**
 * Bandeau des principes, en défilement continu.
 *
 * Les règles de méthode ne sont rattachées à aucune leçon : elles ont besoin
 * d'un endroit où repasser régulièrement sous les yeux. Le bandeau les fait
 * défiler pendant qu'on travaille ; cliquer dessus ouvre la page complète.
 *
 * Le défilement se met en pause au survol et au focus clavier, pour qu'une
 * phrase qui accroche puisse être lue — un bandeau qu'on ne peut pas arrêter
 * est un bandeau qu'on cesse de regarder.
 */
export default function PrincipesBandeau({ vitesse = 90 }) {
  // La piste contient deux copies de la liste : voir le commentaire CSS.
  const piste = [...PRINCIPES, ...PRINCIPES];

  return (
    <div className="principes-fenetre relative overflow-hidden border-y border-ink-700 bg-ink-900/60 py-2.5">
      <div className="principes-piste" style={{ "--duree-defile": `${vitesse}s` }}>
        {piste.map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/principes#${p.id}`}
            aria-hidden={i >= PRINCIPES.length ? "true" : undefined}
            tabIndex={i >= PRINCIPES.length ? -1 : 0}
            className="group shrink-0 flex items-center gap-2.5 px-5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-base opacity-80">{CATEGORIES[p.categorie].icon}</span>
            <span className="whitespace-nowrap group-hover:underline decoration-accent/60 underline-offset-4">
              {p.court}
            </span>
            <span className="text-ink-700 select-none" aria-hidden="true">
              •
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
