"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getWebModule, WEB_LEVELS } from "@/lib/webdev";
import { useUserProgress as useProgress } from "@/lib/userProgress";
import Markdown from "@/components/Markdown";
import QuizPlayer from "@/components/QuizPlayer";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import LessonChat from "@/components/LessonChat";
import LessonResources from "@/components/LessonResources";
import LessonNotes from "@/components/LessonNotes";
import LessonExercises from "@/components/LessonExercises";
import FinalExercise from "@/components/FinalExercise";
import ModuleSyllabus from "@/components/ModuleSyllabus";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import PrincipesBandeau from "@/components/PrincipesBandeau";

export default function WebModulePage() {
  const { moduleId } = useParams();
  const mod = getWebModule(moduleId);
  const progress = useProgress();
  const [activeLesson, setActiveLesson] = useState(0);
  // "lesson" → une leçon | "final" → exercice global | "quiz" → QCM
  const [view, setView] = useState("lesson");

  if (!mod) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400">Module introuvable.</p>
        <Link href="/webdev" className="btn-primary mt-6">
          Retour au parcours Web
        </Link>
      </div>
    );
  }

  const lesson = mod.lessons[activeLesson];
  const isDone = (id) => progress?.completedLessons?.includes(id);
  const quiz = progress?.quizScores?.[`web-${mod.id}`];

  const openLesson = (i) => {
    setActiveLesson(i);
    setView("lesson");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/webdev" className="text-sm text-slate-500 hover:text-accent-light">
        ← Web Dev
      </Link>

      <div className="flex items-center gap-4 mt-4 mb-8 flex-wrap">
        <span className="text-4xl">{mod.icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{mod.title}</h1>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full border text-xs font-medium ${WEB_LEVELS[mod.level].badge} ${WEB_LEVELS[mod.level].color}`}>
            {WEB_LEVELS[mod.level].label}
          </span>
        </div>
      </div>

      <div className="-mx-4 sm:-mx-6 mb-8">
        <PrincipesBandeau />
      </div>

      {/* Syllabus : objectifs, prérequis, lectures. Le problem set n'est masqué
          ici que si le module a un exercice final, qui le reprend en fin de
          parcours — là où l'élève peut réellement le faire. */}
      <ModuleSyllabus moduleId={mod.id} accent="blue" showProblemSet={!mod.finalExercise} />

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-2">
          {mod.lessons.map((l, i) => (
            <button
              key={l.id}
              onClick={() => openLesson(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                view === "lesson" && i === activeLesson
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-ink-700 text-slate-400 hover:border-blue-500/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{isDone(l.id) ? "✅" : "○"}</span>
                <span className="flex-1">{l.title}</span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5 ml-6">
                {l.duration}
                {l.exercises?.length > 0 && <> · {l.exercises.length} exos</>}
              </div>
            </button>
          ))}

          {mod.finalExercise && (
            <button
              onClick={() => setView("final")}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                view === "final"
                  ? "border-emerald-500 bg-emerald-500/10 text-white"
                  : "border-ink-700 text-slate-300 hover:border-emerald-500/50"
              }`}
            >
              🎯 Exercice final
              <span className="block text-xs text-slate-500 font-normal mt-0.5">
                Rassemble tout le module
              </span>
            </button>
          )}

          {mod.quiz?.length > 0 && (
            <button
              onClick={() => setView("quiz")}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                view === "quiz"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-ink-700 text-slate-300 hover:border-blue-500/50"
              }`}
            >
              📝 Quiz de validation
              <span className="block text-xs text-slate-500 font-normal mt-0.5">
                {quiz ? `Score : ${quiz.score}/${quiz.total}` : `${mod.quiz.length} questions`}
              </span>
            </button>
          )}
        </aside>

        <div>
          {view === "quiz" && mod.quiz?.length > 0 ? (
            <>
              <QuizPlayer moduleId={mod.id} questions={mod.quiz} track="web" />
              <ReflectionPrompt moduleId={mod.id} track="web" moduleTitle={mod.title} />
            </>
          ) : view === "final" ? (
            <FinalExercise moduleId={mod.id} finalExercise={mod.finalExercise} />
          ) : (
            <article className="card p-6 sm:p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                <span className="text-xs text-slate-500">⏱ {lesson.duration}</span>
              </div>
              <Markdown text={lesson.content} />
              <LessonResources resources={lesson.resources} />
              <LessonExercises exercises={lesson.exercises} />
              <LessonNotes lessonId={lesson.id} />
              <div className="mt-8 pt-6 border-t border-ink-700 flex items-center justify-between flex-wrap gap-3">
                <LessonCompleteButton
                  moduleId={mod.id}
                  lessonId={lesson.id}
                  isLastLesson={activeLesson + 1 === mod.lessons.length}
                />
                {activeLesson + 1 < mod.lessons.length ? (
                  <button onClick={() => openLesson(activeLesson + 1)} className="btn-secondary">
                    Leçon suivante →
                  </button>
                ) : mod.finalExercise ? (
                  <button onClick={() => setView("final")} className="btn-secondary">
                    Passer à l'exercice final →
                  </button>
                ) : mod.quiz?.length > 0 ? (
                  <button onClick={() => setView("quiz")} className="btn-secondary">
                    Passer au quiz →
                  </button>
                ) : null}
              </div>
            </article>
          )}

          <div className="mt-6 card p-5 flex items-center gap-4">
            <span className="text-2xl">🤖</span>
            <p className="text-sm text-slate-400 flex-1">
              Question sur cette leçon ? Clique sur <strong className="text-white">💬 Demander au tuteur</strong> en bas à droite.
            </p>
          </div>
        </div>
      </div>
      <LessonChat moduleTitle={mod.title} lessonTitle={lesson.title} track="Web Full Stack" />
    </div>
  );
}
