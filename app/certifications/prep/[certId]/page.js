"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCertPrep } from "@/lib/certPrep";
import { useUserProgress as useProgress } from "@/lib/userProgress";

const DIFFICULTY_LABELS = { 1: "Très facile", 2: "Facile", 3: "Moyen", 4: "Difficile", 5: "Expert" };
const DIFF_COLORS = {
  facile: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  moyen: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  difficile: "text-rose-400 bg-rose-500/10 border-rose-500/30",
};

function QuizSection({ questions, certId }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const progress = useProgress();

  const q = questions[current];

  const validate = () => {
    if (selected === null) return;
    setValidated(true);
    if (selected === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setValidated(false);
    } else {
      setFinished(true);
      if (progress) progress.saveQuiz(`cert-${certId}`, score + (selected === q.answer ? 1 : 0), questions.length);
    }
  };

  if (finished) {
    const finalScore = score + (validated && selected === q.answer ? 1 : 0);
    const pct = Math.round((finalScore / questions.length) * 100);
    return (
      <div className="text-center py-10">
        <div className={`text-6xl font-extrabold mb-3 ${pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-amber-400" : "text-rose-400"}`}>
          {pct}%
        </div>
        <p className="text-white font-bold text-xl mb-1">{finalScore}/{questions.length} bonnes réponses</p>
        <p className="text-slate-400 mb-6">
          {pct >= 80 ? "🎯 Excellent ! Tu es prêt pour l'examen." : pct >= 60 ? "📚 Bon début — encore quelques révisions." : "🔁 Revois les concepts et réessaie."}
        </p>
        <button onClick={() => { setCurrent(0); setSelected(null); setValidated(false); setScore(0); setFinished(false); }}
          className="btn-primary">
          Recommencer le quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">Question {current + 1} / {questions.length}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFF_COLORS[q.difficulty] || DIFF_COLORS.moyen}`}>
          {q.difficulty}
        </span>
      </div>
      <div className="h-1.5 bg-ink-800 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent to-accent-cyan transition-all"
          style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>

      <p className="text-white font-semibold text-base mb-5 whitespace-pre-line leading-relaxed">{q.question}</p>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let cls = "card p-4 text-sm cursor-pointer transition-all border-2 text-left w-full ";
          if (!validated) {
            cls += selected === i ? "border-accent bg-accent/10 text-white" : "border-ink-700 text-slate-300 hover:border-accent/50";
          } else {
            if (i === q.answer) cls += "border-emerald-500 bg-emerald-500/10 text-emerald-300";
            else if (i === selected && selected !== q.answer) cls += "border-rose-500 bg-rose-500/10 text-rose-300";
            else cls += "border-ink-700 text-slate-500";
          }
          return (
            <button key={i} onClick={() => !validated && setSelected(i)} className={cls}>
              <span className="font-mono text-xs mr-3 text-slate-500">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {validated && (
        <div className="card p-4 mb-4 border-accent/20 bg-accent/5">
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-white">💡 Explication : </span>{q.explanation}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!validated ? (
          <button onClick={validate} disabled={selected === null} className="btn-primary disabled:opacity-40">
            Valider
          </button>
        ) : (
          <button onClick={next} className="btn-primary">
            {current + 1 < questions.length ? "Question suivante →" : "Voir le résultat"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CertPrepPage() {
  const { certId } = useParams();
  const cert = getCertPrep(certId);
  const progress = useProgress();
  const [activeTab, setActiveTab] = useState("plan");

  if (!cert) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Préparation non disponible pour cette certification.</p>
        <p className="text-slate-500 text-sm mb-6">Les préparations disponibles : Kaggle Python (c1), Kaggle ML (c3), MLOps DeepLearning.AI (c5), AWS CLF-C02 (c6).</p>
        <Link href="/certifications" className="btn-primary">← Retour aux certifications</Link>
      </div>
    );
  }

  const quizScore = progress?.quizScores?.[`cert-${certId}`];
  const tabs = [
    { id: "plan", label: "📅 Plan d'étude" },
    { id: "topics", label: "📌 Topics clés" },
    { id: "quiz", label: "🧪 Examens blancs" },
    { id: "cheat", label: "📋 Fiches" },
    { id: "tips", label: "💬 Conseils" },
  ];

  const colorMap = {
    emerald: { ring: "ring-emerald-500/30", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
    blue: { ring: "ring-blue-500/30", badge: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
    purple: { ring: "ring-purple-500/30", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
    amber: { ring: "ring-amber-500/30", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  };
  const colors = colorMap[cert.color] || colorMap.blue;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/certifications" className="text-sm text-slate-500 hover:text-accent-light">
        ← Certifications
      </Link>

      {/* Header */}
      <div className={`card p-6 mt-4 mb-6 ring-1 ${colors.ring}`}>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-5xl">{cert.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${colors.badge}`}>
                {cert.provider}
              </span>
              <span className="text-xs text-slate-500">⏱ {cert.duration}</span>
              <span className="text-xs text-slate-500">
                Difficulté : {"★".repeat(cert.difficulty)}{"☆".repeat(5 - cert.difficulty)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{cert.title}</h1>
            <p className="text-sm text-slate-400 mt-1">Préparation complète — plan semaine par semaine, quiz style examen réel, fiches et conseils de réussite</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {quizScore && (
              <div className="text-right">
                <div className="text-lg font-bold text-accent-light">{Math.round((quizScore.score / quizScore.total) * 100)}%</div>
                <div className="text-xs text-slate-500">dernier quiz</div>
              </div>
            )}
            <a href={cert.officialExamUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary text-sm">
              S'inscrire à l'examen →
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t.id
                ? "bg-accent/20 text-accent-light border border-accent/30"
                : "text-slate-400 hover:text-white hover:bg-ink-800"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PLAN D'ÉTUDE ── */}
      {activeTab === "plan" && (
        <div className="space-y-5">
          {cert.studyPlan.map((week) => (
            <div key={week.week} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-sm font-bold text-accent-light shrink-0">
                  S{week.week}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{week.theme}</h3>
                  <span className="text-xs text-slate-500">⏱ ~{week.hours}h cette semaine</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Objectifs</p>
                <ul className="space-y-1">
                  {week.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-accent-light mt-0.5 shrink-0">✓</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Ressources</p>
                <div className="flex flex-wrap gap-2">
                  {week.resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1 rounded-full border border-ink-700 text-accent-light hover:border-accent transition-colors">
                      🔗 {r.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-ink-950/60 rounded-xl p-3 border border-ink-700">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Exercice de la semaine</p>
                <p className="text-sm text-slate-300">{week.exercise}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TOPICS CLÉS ── */}
      {activeTab === "topics" && (
        <div className="card p-6">
          <h2 className="font-bold text-white mb-4 text-lg">Topics à maîtriser pour réussir</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {cert.keyTopics.map((topic, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-ink-950/60 border border-ink-700">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent-light text-xs flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-300">{topic}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-sm text-slate-400">
              <strong className="text-white">Méthode recommandée :</strong> Pour chaque topic, tu dois pouvoir l'expliquer à voix haute sans regarder tes notes (technique Feynman). Si tu bloques, reviens au plan d'étude pour cette section.
            </p>
          </div>
        </div>
      )}

      {/* ── QUIZ ── */}
      {activeTab === "quiz" && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-white text-lg">Questions style examen réel</h2>
              <p className="text-sm text-slate-500 mt-1">{cert.practiceQuestions.length} questions • Avec explications détaillées</p>
            </div>
            {quizScore && (
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-light">{Math.round((quizScore.score / quizScore.total) * 100)}%</div>
                <div className="text-xs text-slate-500">meilleur score</div>
              </div>
            )}
          </div>
          <QuizSection questions={cert.practiceQuestions} certId={certId} />
        </div>
      )}

      {/* ── FICHES ── */}
      {activeTab === "cheat" && (
        <div className="space-y-5">
          <div className="card p-4 bg-amber-500/5 border-amber-500/20">
            <p className="text-sm text-amber-300">
              📌 Ces fiches sont un aide-mémoire pour la révision finale — pas un substitut au cours. Assure-toi de comprendre chaque ligne avant l'examen.
            </p>
          </div>
          {cert.cheatsheet.map((section, i) => (
            <div key={i} className="card p-5">
              <h3 className="font-bold text-white mb-3">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2 p-2 rounded-lg bg-ink-950/60 border border-ink-700">
                    <span className="text-accent-light text-xs mt-0.5 shrink-0 font-mono">›</span>
                    <code className="text-sm text-slate-300 font-mono leading-relaxed">{item}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONSEILS ── */}
      {activeTab === "tips" && (
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="font-bold text-white text-lg mb-5">Conseils de personnes qui ont réussi</h2>
            <div className="space-y-4">
              {cert.tipsFromPeople.map((tip, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-ink-950/60 border border-ink-700">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-accent/5 border-accent/20">
            <h3 className="font-bold text-white mb-3">📐 Règle du 85%</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ne t'inscris à l'examen que lorsque tu obtiens <strong className="text-white">85% ou plus</strong> sur 3 examens blancs consécutifs.
              En dessous, tu risques l'échec et des frais inutiles. Sois patient — une semaine de plus de préparation vaut mieux qu'une tentative ratée.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-white mb-3">📅 Le jour de l'examen</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">✓</span> Dors 8h la nuit avant — l'examen teste la mémorisation, pas l'endurance</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">✓</span> Lis chaque question entièrement avant de choisir une réponse</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">✓</span> Marque les questions incertaines et reviens à la fin</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">✓</span> Si tu hésites entre 2 réponses, élimine les 2 mauvaises d'abord</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">✓</span> Ne change pas tes premières réponses sauf si tu as une raison précise</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
