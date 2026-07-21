"use client";

import { useState, useCallback, useRef } from "react";
import { useUserProgress } from "@/lib/userProgress";

export default function LessonNotes({ lessonId }) {
  const ctx = useUserProgress();
  const notes = ctx?.lessonNotes || {};
  const saved = notes[lessonId] || "";

  const [text, setText] = useState(saved);
  const [status, setStatus] = useState(null); // "saving" | "saved" | null
  const timerRef = useRef(null);

  const handleChange = useCallback((e) => {
    const val = e.target.value;
    setText(val);
    setStatus("saving");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (ctx?.saveLessonNote) {
        await ctx.saveLessonNote(lessonId, val);
        setStatus("saved");
        setTimeout(() => setStatus(null), 2000);
      }
    }, 800);
  }, [ctx, lessonId]);

  if (!ctx?.user) return null;

  return (
    <div className="mt-8 pt-6 border-t border-ink-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          📝 Mes notes personnelles
        </h3>
        {status === "saving" && <span className="text-xs text-slate-500">Enregistrement…</span>}
        {status === "saved"  && <span className="text-xs text-emerald-400">✓ Sauvegardé</span>}
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        rows={5}
        placeholder="Écris ici tes notes, résumés, questions ou exemples perso… Elles sont sauvegardées automatiquement."
        className="w-full rounded-xl border border-ink-700 bg-ink-900 text-slate-300 text-sm p-4 resize-y focus:outline-none focus:border-accent/50 placeholder-slate-600 leading-relaxed"
      />
      <p className="text-xs text-slate-600 mt-1.5">
        Tes notes sont privées et synchronisées sur tous tes appareils.
      </p>
    </div>
  );
}
