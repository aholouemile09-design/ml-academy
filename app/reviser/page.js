"use client";

import { useEffect, useState, useCallback } from "react";
import { useUserProgress } from "@/lib/userProgress";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";
import Link from "next/link";

// Construit un index global question_ref → question
function buildQuestionIndex() {
  const index = {};
  const tracks = [
    { prefix: "ml", curriculum: CURRICULUM },
    { prefix: "web", curriculum: WEB_CURRICULUM },
    { prefix: "pmp", curriculum: PMP_CURRICULUM },
  ];
  for (const { prefix, curriculum } of tracks) {
    for (const module of curriculum) {
      if (!module.quiz) continue;
      module.quiz.forEach((q, i) => {
        const ref = `${prefix}:${module.id}:${i}`;
        index[ref] = { ...q, ref, moduleTitle: module.title, track: prefix.toUpperCase() };
      });
    }
  }
  return index;
}

const QUESTION_INDEX = buildQuestionIndex();

export default function ReviserPage() {
  const { user, loaded } = useUserProgress();
  const [cards, setCards] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchCards = useCallback(async () => {
    setFetching(true);
    const res = await fetch("/api/review");
    const data = await res.json();
    setCards(data.cards ?? []);
    setFetching(false);
  }, []);

  useEffect(() => {
    if (loaded && user) fetchCards();
    else if (loaded && !user) setFetching(false);
  }, [loaded, user, fetchCards]);

  const submitAnswer = async (quality) => {
    if (answering) return;
    setAnswering(true);
    const card = cards[current];
    await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_ref: card.question_ref, quality }),
    });
    setAnswering(false);
    if (current + 1 >= cards.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setRevealed(false);
      setSelected(null);
    }
  };

  if (!loaded || fetching) {
    return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Connecte-toi pour accéder à tes révisions.</p>
        <Link href="/connexion" className="btn-primary">Se connecter →</Link>
      </div>
    );
  }

  if (done || cards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-2xl font-bold text-white">Tout est à jour !</h1>
        <p className="text-slate-400">
          {done
            ? `Tu as révisé ${cards.length} carte${cards.length > 1 ? "s" : ""} aujourd'hui. Reviens demain pour la prochaine session.`
            : "Aucune carte à réviser aujourd'hui. Continue les quiz pour alimenter ta file de révision."}
        </p>
        <div className="flex gap-3 justify-center mt-4">
          <Link href="/parcours" className="btn-primary">Continuer le cours</Link>
          <Link href="/dashboard" className="btn-secondary">Dashboard</Link>
        </div>
      </div>
    );
  }

  const card = cards[current];
  const question = QUESTION_INDEX[card.question_ref];

  if (!question) {
    // question supprimée du curriculum, on passe
    submitAnswer(1);
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Réviser aujourd'hui</h1>
          <p className="text-sm text-slate-400 mt-1">
            {current + 1} / {cards.length} carte{cards.length > 1 ? "s" : ""}
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent-light font-medium">
          {question.track}
        </span>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-ink-800 rounded-full h-1.5 mb-8">
        <div
          className="bg-accent h-1.5 rounded-full transition-all"
          style={{ width: `${(current / cards.length) * 100}%` }}
        />
      </div>

      <div className="card p-6 space-y-5">
        <p className="text-xs text-slate-500">{question.moduleTitle}</p>
        <p className="text-lg font-semibold text-white leading-snug">{question.q}</p>

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ";
            if (!revealed) {
              cls += selected === i
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 bg-ink-800 text-slate-300 hover:border-accent/50 hover:text-white";
            } else {
              if (i === question.answer) cls += "border-emerald-500 bg-emerald-500/10 text-emerald-300";
              else if (i === selected && i !== question.answer) cls += "border-rose-500 bg-rose-500/10 text-rose-300";
              else cls += "border-ink-700 bg-ink-800 text-slate-500";
            }
            return (
              <button key={i} className={cls}
                onClick={() => { if (!revealed) setSelected(i); }}
                disabled={revealed}>
                {opt}
              </button>
            );
          })}
        </div>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            disabled={selected === null}
            className="btn-primary w-full disabled:opacity-40">
            Vérifier
          </button>
        ) : (
          <div className="space-y-3">
            {question.explain && (
              <div className="bg-ink-800 rounded-xl px-4 py-3 text-sm text-slate-300 border border-ink-700">
                💡 {question.explain}
              </div>
            )}
            <p className="text-sm text-slate-400 text-center">Comment as-tu trouvé cette question ?</p>
            <div className="flex gap-3">
              <button onClick={() => submitAnswer(0)} disabled={answering}
                className="flex-1 btn-secondary text-rose-400 border-rose-500/30 hover:border-rose-500 text-sm disabled:opacity-50">
                😕 Difficile
              </button>
              <button onClick={() => submitAnswer(0.5)} disabled={answering}
                className="flex-1 btn-secondary text-amber-400 border-amber-500/30 hover:border-amber-500 text-sm disabled:opacity-50">
                🤔 Hésitant
              </button>
              <button onClick={() => submitAnswer(1)} disabled={answering}
                className="flex-1 btn-secondary text-emerald-400 border-emerald-500/30 hover:border-emerald-500 text-sm disabled:opacity-50">
                ✅ Facile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
