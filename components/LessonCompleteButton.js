"use client";

import { useEffect, useState } from "react";
import { useUserProgress } from "@/lib/userProgress";
import { useModuleTime } from "@/lib/useModuleTime";
import { formatDuration } from "@/lib/studyTime";

/**
 * Bouton « Marquer comme complétée » enrichi du temps passé sur le module.
 *
 * Le temps est compté en continu par useModuleTime ; il est remonté vers
 * Supabase au moment de la complétion (et non à chaque tick, pour éviter
 * d'écrire en base toutes les 5 secondes).
 */
export default function LessonCompleteButton({ moduleId, lessonId, isLastLesson }) {
  const ctx = useUserProgress();
  const liveSeconds = useModuleTime(moduleId);
  const [justCompleted, setJustCompleted] = useState(false);

  const done = ctx?.completedLessons?.includes(lessonId);
  const storedSeconds = ctx?.moduleTime?.[moduleId] || 0;
  const totalSeconds = Math.max(liveSeconds, storedSeconds);

  // Synchronise le cumul local vers le compte, sans spammer la base.
  useEffect(() => {
    if (!ctx?.saveModuleTime || !moduleId || !liveSeconds) return;
    const id = setTimeout(() => ctx.saveModuleTime(moduleId, liveSeconds), 30000);
    return () => clearTimeout(id);
  }, [ctx, moduleId, liveSeconds]);

  const handleComplete = () => {
    ctx?.completeLesson(lessonId);
    ctx?.saveModuleTime?.(moduleId, liveSeconds);
    setJustCompleted(true);
  };

  if (done) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-emerald-400 text-sm font-semibold">
          ✅ Leçon complétée (+50 XP)
        </span>
        {totalSeconds > 30 && (
          <span className="text-xs text-slate-500">
            ⏱ {formatDuration(totalSeconds)} passées sur ce module
            {justCompleted && isLastLesson && " — module terminé, bravo !"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button onClick={handleComplete} className="btn-primary">
        Marquer comme complétée (+50 XP)
      </button>
      {totalSeconds > 30 && (
        <span className="text-xs text-slate-500">
          ⏱ {formatDuration(totalSeconds)} sur ce module
        </span>
      )}
    </div>
  );
}
