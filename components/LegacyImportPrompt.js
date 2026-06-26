"use client";

import { useEffect, useState } from "react";
import { useUserProgress } from "@/lib/userProgress";

const FLAG_KEY = "ml-academy-migration-offered";

function readLegacy() {
  try {
    const progress = JSON.parse(localStorage.getItem("ml-academy-progress") || "null");
    const profiles = JSON.parse(localStorage.getItem("ml-academy-profiles") || "null");
    const activeId = localStorage.getItem("ml-academy-active-profile");
    const activeProfile = profiles?.find((p) => p.id === activeId) || profiles?.[0];

    const candidates = [progress, activeProfile].filter(Boolean);
    if (candidates.length === 0) return null;

    // Garde celui avec le plus d'XP comme base, fusionne le reste.
    candidates.sort((a, b) => (b.xp || 0) - (a.xp || 0));
    const best = candidates[0];
    if (!best.completedLessons?.length && !Object.keys(best.quizScores || {}).length) return null;
    return best;
  } catch {
    return null;
  }
}

export default function LegacyImportPrompt() {
  const ctx = useUserProgress();
  const [legacy, setLegacy] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ctx?.user || !ctx.ready) return;
    if (localStorage.getItem(FLAG_KEY)) return;
    const found = readLegacy();
    if (found) setLegacy(found);
    else localStorage.setItem(FLAG_KEY, "1");
  }, [ctx?.user, ctx?.ready]);

  if (!legacy || done) return null;

  const accept = async () => {
    await ctx.importLegacy(legacy);
    localStorage.setItem(FLAG_KEY, "1");
    setDone(true);
  };

  const decline = () => {
    localStorage.setItem(FLAG_KEY, "1");
    setDone(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="card p-6 max-w-sm w-full">
        <h3 className="font-bold text-white mb-2">Progression locale trouvée</h3>
        <p className="text-sm text-slate-400 mb-5">
          On a trouvé une ancienne progression sur ce navigateur ({legacy.xp || 0} XP,{" "}
          {legacy.completedLessons?.length || 0} leçons). Veux-tu la fusionner avec ton compte ?
        </p>
        <div className="flex gap-3">
          <button onClick={accept} className="flex-1 btn-primary text-sm">Fusionner</button>
          <button onClick={decline} className="flex-1 btn-secondary text-sm">Ignorer</button>
        </div>
      </div>
    </div>
  );
}
