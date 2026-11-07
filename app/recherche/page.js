"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FORMATIONS } from "@/lib/formations";

/**
 * Recherche plein texte dans les leçons.
 *
 * L'index était construit dans le navigateur à partir des trois curriculums,
 * ce qui obligeait à livrer tout le texte du site à qui ouvrait cette page.
 * Il vit maintenant sur le serveur, derrière /api/recherche.
 */

const PISTES = [
  { id: "all", label: "Toutes" },
  { id: "ml", label: FORMATIONS.ml.domaine },
  { id: "web", label: FORMATIONS.web.domaine },
  { id: "pmp", label: FORMATIONS.pmp.domaine },
];

const HREF = { ml: FORMATIONS.ml.href, web: FORMATIONS.web.href, pmp: FORMATIONS.pmp.href };
const LIBELLE = {
  ml: FORMATIONS.ml.domaine,
  web: FORMATIONS.web.domaine,
  pmp: FORMATIONS.pmp.domaine,
};

function surligner(texte, requete) {
  if (!requete) return texte;
  const motif = new RegExp(`(${requete.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return texte.split(motif).map((part, i) =>
    part.toLowerCase() === requete.toLowerCase() ? (
      <mark key={i} className="bg-accent/20 text-accent-light rounded px-0.5">{part}</mark>
    ) : (
      part
    )
  );
}

export default function RecherchePage() {
  const [requete, setRequete] = useState("");
  const [piste, setPiste] = useState("all");
  const [etat, setEtat] = useState("repos");
  const [resultats, setResultats] = useState([]);

  useEffect(() => {
    const q = requete.trim();
    if (q.length < 2) {
      setEtat("repos");
      setResultats([]);
      return;
    }

    // On attend que la frappe se calme : sans ça, « transformer » part en
    // onze requêtes dont dix sont périmées avant d'arriver.
    const controleur = new AbortController();
    const minuteur = setTimeout(() => {
      setEtat("chargement");
      fetch(`/api/recherche?q=${encodeURIComponent(q)}`, { signal: controleur.signal })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((d) => {
          setResultats(d.resultats);
          setEtat(d.resultats.length ? "pret" : "vide");
        })
        .catch((e) => {
          if (e?.name !== "AbortError") setEtat("erreur");
        });
    }, 250);

    return () => {
      clearTimeout(minuteur);
      controleur.abort();
    };
  }, [requete]);

  const visibles = resultats.filter((r) => piste === "all" || r.piste === piste);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Recherche</h1>
      <p className="text-slate-400 mb-7">
        Cherchez dans les leçons des trois formations.
      </p>

      <div className="relative mb-4">
        <input
          type="search"
          value={requete}
          onChange={(e) => setRequete(e.target.value)}
          autoFocus
          placeholder="descente de gradient, hooks React, WBS, ARIMA…"
          className="w-full px-4 py-3 rounded-lg border border-ink-700 bg-ink-900 text-white placeholder-slate-500 focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex gap-2 mb-7 flex-wrap">
        {PISTES.map((p) => (
          <button
            key={p.id}
            onClick={() => setPiste(p.id)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              piste === p.id
                ? "border-accent bg-accent/10 text-accent-light"
                : "border-ink-700 text-slate-500 hover:border-accent/40"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {etat === "repos" && (
        <p className="text-center py-14 text-sm text-slate-500">
          Tapez au moins deux lettres pour lancer la recherche.
        </p>
      )}

      {etat === "chargement" && (
        <div className="space-y-3 animate-pulse" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-ink-900 border border-ink-700" />
          ))}
        </div>
      )}

      {etat === "erreur" && (
        <div className="border border-ink-700 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-400">La recherche n'a pas abouti.</p>
          <button onClick={() => setRequete((q) => q + " ")} className="btn-secondary mt-3">
            Réessayer
          </button>
        </div>
      )}

      {etat === "vide" && (
        <div className="text-center py-14">
          <p className="text-slate-400">
            Aucun résultat pour « <span className="text-white">{requete.trim()}</span> ».
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Essayez un terme plus court, ou le mot tel qu'il apparaît dans le cours.
          </p>
        </div>
      )}

      {etat === "pret" && (
        <>
          <p className="text-xs text-slate-500 mb-3">
            {visibles.length} résultat{visibles.length > 1 ? "s" : ""}
            {piste !== "all" && ` sur ${resultats.length}`}
          </p>
          <div className="space-y-3">
            {visibles.map((r) => (
              <Link
                key={`${r.piste}-${r.lecon}`}
                href={`${HREF[r.piste]}/${r.module}`}
                className="block card p-4 hover:border-accent transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent-light mb-1">
                      {LIBELLE[r.piste]}
                    </p>
                    <p className="font-bold text-white">{surligner(r.titreLecon, requete.trim())}</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {surligner(r.extrait, requete.trim())}
                    </p>
                    <p className="text-xs text-slate-600 mt-2">{r.titreModule}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{r.duree}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
