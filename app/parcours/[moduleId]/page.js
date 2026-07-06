"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getModule, LEVELS } from "@/lib/curriculum";
import { useUserProgress as useProgress } from "@/lib/userProgress";
import Markdown from "@/components/Markdown";
import QuizPlayer from "@/components/QuizPlayer";
import ReflectionPrompt from "@/components/ReflectionPrompt";

export default function ModulePage() {
  const { moduleId } = useParams();
  const mod = getModule(moduleId);
  const progress = useProgress();
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!mod) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400">Module introuvable.</p>
        <Link href="/parcours" className="btn-primary mt-6">
          Retour au parcours
        </Link>
      </div>
    );
  }

  const lesson = mod.lessons[activeLesson];
  const isDone = (id) => progress?.completedLessons?.includes(id);
  const quiz = progress?.quizScores?.[mod.id];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/parcours" className="text-sm text-slate-500 hover:text-accent-light">
        ← Parcours
      </Link>

      <div className="flex items-center gap-4 mt-4 mb-8 flex-wrap">
        <span className="text-4xl">{mod.icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{mod.title}</h1>
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full border text-xs font-medium ${LEVELS[mod.level].badge} ${LEVELS[mod.level].color}`}
          >
            {LEVELS[mod.level].label}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-2">
          {mod.lessons.map((l, i) => (
            <button
              key={l.id}
              onClick={() => {
                setActiveLesson(i);
                setShowQuiz(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                !showQuiz && i === activeLesson
                  ? "border-accent bg-accent/10 text-white"
                  : "border-ink-700 text-slate-400 hover:border-accent/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{isDone(l.id) ? "✅" : "○"}</span>
                <span className="flex-1">{l.title}</span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5 ml-6">{l.duration}</div>
            </button>
          ))}
          <button
            onClick={() => setShowQuiz(true)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
              showQuiz
                ? "border-accent bg-accent/10 text-white"
                : "border-ink-700 text-slate-300 hover:border-accent/50"
            }`}
          >
            📝 Quiz de validation
            {quiz && (
              <span className="block text-xs text-slate-500 font-normal mt-0.5">
                Meilleur score : {quiz.score}/{quiz.total}
              </span>
            )}
          </button>
        </aside>

        {/* Content */}
        <div>
          {showQuiz ? (
            <>
              <QuizPlayer moduleId={mod.id} questions={mod.quiz} track="ml" />
              <ReflectionPrompt moduleId={mod.id} track="ml" moduleTitle={mod.title} />
            </>
          ) : (
            <article className="card p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                <span className="text-xs text-slate-500">⏱ {lesson.duration}</span>
              </div>

              <Markdown text={lesson.content} />

              <div className="mt-8 pt-6 border-t border-ink-700 flex items-center justify-between flex-wrap gap-3">
                {isDone(lesson.id) ? (
                  <span className="text-emerald-400 text-sm font-semibold">✅ Leçon complétée (+50 XP)</span>
                ) : (
                  <button onClick={() => progress?.completeLesson(lesson.id)} className="btn-primary">
                    Marquer comme complétée (+50 XP)
                  </button>
                )}
                {activeLesson + 1 < mod.lessons.length ? (
                  <button onClick={() => setActiveLesson(activeLesson + 1)} className="btn-secondary">
                    Leçon suivante →
                  </button>
                ) : (
                  <button onClick={() => setShowQuiz(true)} className="btn-secondary">
                    Passer au quiz →
                  </button>
                )}
              </div>
            </article>
          )}

          <div className="mt-6 card p-5 flex items-center gap-4">
            <span className="text-2xl">🤖</span>
            <p className="text-sm text-slate-400 flex-1">
              Un point pas clair ? Demandez à votre tuteur AI de vous l'expliquer autrement.
            </p>
            <Link href="/tuteur" className="btn-secondary text-sm whitespace-nowrap">
              Poser une question
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
