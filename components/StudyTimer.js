"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUserProgress } from "@/lib/userProgress";
import { usePathname } from "next/navigation";

const HIDDEN_PATHS = ["/connexion", "/inscription"];

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function getTodayMinutes(studyPlan) {
  if (!studyPlan?.items?.length) return 0;
  const today = todayStr();
  return studyPlan.items
    .filter(item => item.date === today)
    .reduce((sum, item) => sum + (item.minutes || 0), 0);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PRESETS = [15, 25, 30, 45, 60, 90];

export default function StudyTimer() {
  const ctx = useUserProgress();
  const pathname = usePathname();

  const planMinutes = getTodayMinutes(ctx?.studyPlan);
  const defaultMinutes = planMinutes || 25;

  const [open, setOpen] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(defaultMinutes * 60);
  const [remaining, setRemaining] = useState(defaultMinutes * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [customInput, setCustomInput] = useState(String(defaultMinutes));

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Mettre à jour si le plan change
  useEffect(() => {
    if (!running) {
      const mins = planMinutes || 25;
      setTotalSeconds(mins * 60);
      setRemaining(mins * 60);
      setCustomInput(String(mins));
    }
  }, [planMinutes, running]);

  const tick = useCallback(() => {
    setRemaining(r => {
      if (r <= 1) {
        setRunning(false);
        setFinished(true);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
        return 0;
      }
      return r - 1;
    });
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  const handleStart = () => { setFinished(false); setRunning(true); };
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setFinished(false);
    setRemaining(totalSeconds);
  };

  const applyMinutes = (mins) => {
    const secs = mins * 60;
    setTotalSeconds(secs);
    setRemaining(secs);
    setRunning(false);
    setFinished(false);
    setCustomInput(String(mins));
  };

  const handleCustom = (e) => {
    const val = parseInt(e.target.value);
    setCustomInput(e.target.value);
    if (val > 0 && val <= 300) applyMinutes(val);
  };

  if (HIDDEN_PATHS.includes(pathname)) return null;
  if (!ctx?.user) return null;

  const progress = totalSeconds > 0 ? (totalSeconds - remaining) / totalSeconds : 0;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const ringColor = finished ? "#f87171" : running ? "#6366f1" : "#475569";

  return (
    <>
      {/* Son de fin (bip discret) */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA..." type="audio/wav" />
      </audio>

      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {/* Panneau étendu */}
        {open && (
          <div className="bg-ink-900 border border-ink-700 rounded-2xl shadow-2xl p-5 w-64 animate-fade-in">
            {finished ? (
              <div className="text-center space-y-3">
                <div className="text-4xl animate-bounce">🎉</div>
                <p className="text-white font-semibold">Temps écoulé !</p>
                <p className="text-sm text-slate-400 leading-snug">
                  Bravo pour ta session. Prends une vraie pause — lève-toi, étire-toi, hydrate-toi. 💧
                </p>
                <button onClick={handleReset} className="btn-primary text-sm w-full">
                  Nouvelle session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Minuteur d'étude</p>
                  {planMinutes > 0 && (
                    <span className="text-xs text-accent-light bg-accent/10 px-2 py-0.5 rounded-full">
                      Plan: {planMinutes} min
                    </span>
                  )}
                </div>

                {/* Anneau + temps */}
                <div className="flex justify-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r={radius} fill="none" stroke="#1e293b" strokeWidth="4" />
                      <circle
                        cx="28" cy="28" r={radius} fill="none"
                        stroke={ringColor} strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
                      />
                    </svg>
                    <span className={`text-2xl font-mono font-bold ${running ? "text-white" : "text-slate-400"}`}>
                      {formatTime(remaining)}
                    </span>
                  </div>
                </div>

                {/* Contrôles */}
                <div className="flex gap-2 justify-center">
                  {!running ? (
                    <button onClick={handleStart} className="btn-primary text-sm flex-1">
                      ▶ {remaining < totalSeconds ? "Reprendre" : "Démarrer"}
                    </button>
                  ) : (
                    <button onClick={handlePause} className="btn-secondary text-sm flex-1">
                      ⏸ Pause
                    </button>
                  )}
                  <button onClick={handleReset} className="btn-secondary text-sm px-3" title="Réinitialiser">
                    ↺
                  </button>
                </div>

                {/* Durée rapide */}
                {!running && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600">Changer la durée</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESETS.map(m => (
                        <button key={m} onClick={() => applyMinutes(m)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            totalSeconds === m * 60
                              ? "border-accent bg-accent/15 text-white"
                              : "border-ink-700 text-slate-500 hover:border-accent/40"
                          }`}>
                          {m}min
                        </button>
                      ))}
                    </div>
                    <input
                      type="number" min="1" max="300"
                      value={customInput}
                      onChange={handleCustom}
                      placeholder="Min personnalisé"
                      className="w-full bg-ink-950 border border-ink-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bouton flottant */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Minuteur d'étude"
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative ${
            finished
              ? "bg-gradient-to-br from-rose-500 to-orange-500 animate-pulse"
              : running
              ? "bg-gradient-to-br from-indigo-500 to-violet-500"
              : "bg-ink-800 border border-ink-700"
          }`}
        >
          {running ? (
            <svg className="absolute inset-0 -rotate-90 w-14 h-14" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="#312e81" strokeWidth="3" />
              <circle
                cx="28" cy="28" r="24" fill="none"
                stroke="#a5b4fc" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 * (1 - progress)}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
          ) : null}
          <span className="text-xl relative z-10">{finished ? "🎉" : "⏱️"}</span>
        </button>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95) translateY(4px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.2s ease-out; }
        `}</style>
      </div>
    </>
  );
}
