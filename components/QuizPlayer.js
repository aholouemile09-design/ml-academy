"use client";

import { useState } from "react";
import { useUserProgress as useProgress } from "@/lib/userProgress";

export default function QuizPlayer({ moduleId, questions }) {
  const { saveQuiz } = useProgress();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const validate = () => {
    if (selected === null) return;
    setValidated(true);
    if (selected === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    const finalScore = score;
    if (current + 1 >= questions.length) {
      setFinished(true);
      saveQuiz(moduleId, finalScore, questions.length);
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setValidated(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setValidated(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card p-8 text-center space-y-4">
        <div className="text-5xl">{pct === 100 ? "🏆" : pct >= 70 ? "🎉" : "📖"}</div>
        <h3 className="text-2xl font-bold text-white">
          Score : {score}/{questions.length} ({pct}%)
        </h3>
        <p className="text-slate-400">
          {pct === 100
            ? "Parfait ! Module validé avec brio."
            : pct >= 70
            ? "Très bien ! Tu peux relire les questions ratées puis viser le sans-faute."
            : "Relis les leçons du module puis retente le quiz — c'est en répétant qu'on ancre les concepts."}
        </p>
        <button onClick={restart} className="btn-secondary">
          Recommencer le quiz
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8 space-y-5">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          Question {current + 1} / {questions.length}
        </span>
        <span>Score : {score}</span>
      </div>

      <div className="w-full h-1.5 bg-ink-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all"
          style={{ width: `${((current + (validated ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-lg font-semibold text-white">{q.q}</h3>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let cls = "border-ink-700 hover:border-accent/60";
          if (validated) {
            if (i === q.answer) cls = "border-emerald-500 bg-emerald-500/10";
            else if (i === selected) cls = "border-rose-500 bg-rose-500/10";
            else cls = "border-ink-700 opacity-50";
          } else if (i === selected) {
            cls = "border-accent bg-accent/10";
          }
          return (
            <button
              key={i}
              disabled={validated}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-sm ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {validated && (
        <div className="text-sm text-slate-400 bg-ink-800/60 rounded-xl p-4">
          💡 {q.explain}
        </div>
      )}

      <div className="flex justify-end">
        {!validated ? (
          <button onClick={validate} disabled={selected === null} className="btn-primary disabled:opacity-40">
            Valider
          </button>
        ) : (
          <button onClick={next} className="btn-primary">
            {current + 1 >= questions.length ? "Voir le résultat" : "Question suivante"}
          </button>
        )}
      </div>
    </div>
  );
}
