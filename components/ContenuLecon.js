"use client";

import { useEffect, useState } from "react";
import Markdown from "@/components/Markdown";

/**
 * Le texte d'une leçon, chargé à la demande.
 *
 * Le contenu ne voyage plus dans le paquet JavaScript : il est lu sur le
 * serveur et récupéré quand la leçon s'ouvre. D'où les trois états — un
 * squelette aux dimensions d'un paragraphe, une erreur qu'on peut réessayer,
 * et le texte.
 */
export default function ContenuLecon({ piste, lecon }) {
  const [etat, setEtat] = useState("chargement");
  const [contenu, setContenu] = useState("");
  const [essai, setEssai] = useState(0);

  useEffect(() => {
    let annule = false;
    setEtat("chargement");

    fetch(`/api/lecon/${piste}/${lecon}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (annule) return;
        setContenu(d.contenu);
        setEtat(d.contenu.trim() ? "pret" : "vide");
      })
      .catch(() => !annule && setEtat("erreur"));

    // La leçon peut changer avant la fin de la requête : sans ce drapeau, une
    // réponse en retard écraserait le texte de la leçon suivante.
    return () => {
      annule = true;
    };
  }, [piste, lecon, essai]);

  if (etat === "chargement") {
    return (
      <div className="space-y-3 animate-pulse" aria-busy="true" aria-label="Chargement de la leçon">
        {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((l, i) => (
          <div key={i} className={`h-4 rounded bg-ink-800 ${l}`} />
        ))}
      </div>
    );
  }

  if (etat === "erreur") {
    return (
      <div className="border border-ink-700 rounded-xl p-5">
        <p className="text-sm text-slate-400">
          Le texte de cette leçon n'a pas pu être chargé.
        </p>
        <button onClick={() => setEssai((n) => n + 1)} className="btn-secondary mt-3">
          Réessayer
        </button>
      </div>
    );
  }

  if (etat === "vide") {
    return (
      <div className="border border-ink-700 rounded-xl p-5">
        <p className="text-sm text-slate-400">
          Cette leçon n'a pas encore de texte. Les exercices ci-dessous sont déjà disponibles.
        </p>
      </div>
    );
  }

  return <Markdown text={contenu} />;
}
