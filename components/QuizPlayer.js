"use client";

import { useState } from "react";
import { useUserProgress as useProgress } from "@/lib/userProgress";

const CONFIDENCE_LEVELS = [
  { value: "low", label: "Pas sûr(e)", icon: "😕", quality: (correct) => correct ? 0.5 : 0 },
  { value: "medium", label: "Hésitant(e)", icon: "🤔", quality: (correct) => correct ? 0.75 : 0 },
  { value: "high", label: "Certain(e)", icon: "💪", quality: (correct) => correct ? 1 : 0 },
];

export default function QuizPlayer({ moduleId, questions, track = "ml" }) {
  const { saveQuiz } = useProgress();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [validated, setValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);

  const q = questions[current];

  const pushToReview = (questionIndex, quality) => {
    const question_ref = `${track}:${moduleId}:${questionIndex}`;
    fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_ref, quality }),
    }).catch(() => {});
  };

  const validate = () => {
    if (selected === null || confidence === null) return;
    const correct = selected === q.answer;
    const conf = CONFIDENCE_LEVELS.find(c => c.value === confidence);
    const quality = conf.quality(correct);

    setValidated(true);
    if (correct) setScore(s => s + 1);
    setResults(r => [...r, { q: q.q, correct, confidence, overconfident: confidence === "high" && !correct }]);
    pushToReview(current, quality);
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      saveQuiz(moduleId, score + (selected === q.answer ? 0 : 0), questions.length);
      // score already updated via setScore which is async — use results length
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setConfidence(null);
      setValidated(false);
    }
  };

  const finalScore = results.filter(r => r.correct).length;

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setConfidence(null);
    setValidated(false);
    setScore(0);
    setFinished(false);
    setResults([]);
  };

  if (finished) {
    const pct = Math.round((finalScore / questions.length) * 100);
    const overconfident = results.filter(r => r.overconfident);

    return (
      <div className="card p-8 space-y-5">
        <div className="text-center space-y-2">
          <div className="text-5xl">{pct === 100 ? "🏆" : pct >= 70 ? "🎉" : "📖"}</div>
          <h3 className="text-2xl font-bold text-white">
            Score : {finalScore}/{questions.length} ({pct}%)
          </h3>
          <p className="text-slate-400 text-sm">
            {pct === 100
              ? "Parfait ! Module validé avec brio."
              : pct >= 70
              ? "Très bien ! Tu peux relire les questions ratées puis viser le sans-faute."
              : "Relis les leçons du module puis retente le quiz — c'est en répétant qu'on ancre les concepts."}
          </p>
        </div>

        {/* Rapport de calibration */}
        {overconfident.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-amber-300">
              ⚠️ {overconfident.length} question{overconfident.length > 1 ? "s" : ""} où tu étais certain(e) mais faux
            </p>
            <p className="text-xs text-slate-400">
              Ces questions ont été ajoutées en priorité dans ta file de révision. Travaille-les particulièrement — c'est le signe d'une lacune cachée.
            </p>
            <ul className="space-y-1 mt-2">
              {overconfident.map((r, i) => (
                <li key={i} className="text-xs text-amber-200 bg-amber-500/5 rounded-lg px-3 py-1.5">
                  « {r.q.length > 80 ? r.q.slice(0, 80) + "…" : r.q} »
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={restart} className="btn-secondary w-full">
          Recommencer le quiz
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8 space-y-5">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Question {current + 1} / {questions.length}</span>
        <span>Score : {score}</span>
      </div>

      <div className="w-full h-1.5 bg-ink-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all"
          style={{ width: `${((current + (validated ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-lg font-semibold text-white">{q.q}</h3>

      {/* Niveau de confiance */}
      {!validated && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Ton niveau de confiance avant de répondre :</p>
          <div className="flex gap-2">
            {CONFIDENCE_LEVELS.map(c => (
              <button key={c.value} onClick={() => setConfidence(c.value)}
                className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${
                  confidence === c.value
                    ? "border-accent bg-accent/15 text-white"
                    : "border-ink-700 bg-ink-800 text-slate-400 hover:border-accent/40"
                }`}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

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
            <button key={i} disabled={validated} onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-sm ${cls}`}>
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
          <button onClick={validate}
            disabled={selected === null || confidence === null}
            className="btn-primary disabled:opacity-40"
            title={confidence === null ? "Choisis d'abord ton niveau de confiance" : ""}>
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
