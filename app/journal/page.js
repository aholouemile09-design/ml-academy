"use client";

import { useEffect, useState } from "react";
import { useUserProgress } from "@/lib/userProgress";
import Link from "next/link";

const TRACK_LABELS = { ml: "ML & Data", web: "Web Dev", pmp: "PMP" };

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function JournalPage() {
  const { user, loaded } = useUserProgress();
  const [reflections, setReflections] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loaded) return;
    if (!user) { setFetching(false); return; }
    fetch("/api/reflections")
      .then(r => r.json())
      .then(d => setReflections(d.reflections ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [loaded, user]);

  if (!loaded || fetching) {
    return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Connecte-toi pour accéder à ton journal.</p>
        <Link href="/connexion" className="btn-primary">Se connecter →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">📓 Mon journal d'apprentissage</h1>
        <p className="text-slate-400">Tes réflexions de fin de module, classées par date.</p>
      </div>

      {reflections.length === 0 ? (
        <div className="card p-8 text-center space-y-3">
          <p className="text-slate-500 text-sm">Ton journal est vide pour l'instant.</p>
          <p className="text-slate-600 text-xs">
            Complète un module et réponds aux questions de réflexion pour alimenter ton journal.
          </p>
          <Link href="/parcours" className="btn-secondary text-sm inline-block mt-2">
            Aller au parcours →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reflections.map(r => (
            <div key={r.id} className="card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent-light font-medium">
                  {TRACK_LABELS[r.track] ?? r.track}
                </span>
                <span className="text-xs text-slate-600">{formatDate(r.created_at)}</span>
              </div>
              <p className="text-xs text-slate-500 italic">{r.prompt}</p>
              <p className="text-sm text-slate-200 leading-relaxed">{r.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
