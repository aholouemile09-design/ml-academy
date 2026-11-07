"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const MESSAGES = [
  "Tu progresses bien, continue !",
  "Chaque leçon te rapproche de ton objectif.",
  "La régularité bat le talent. Reviens demain !",
  "N'oublie pas de réviser tes cartes du jour.",
  "Un quiz par jour éloigne l'oubli pour toujours.",
  "Pose une question au tuteur IA si tu bloques !",
  "Ton cerveau aime apprendre par petites doses.",
  "La répétition espacée, c'est la clé du succès.",
  "Tu es plus proche du but qu'hier.",
  "Doctorat ou pas, l'important c'est de comprendre.",
];

const HIDDEN_PATHS = ["/connexion", "/inscription"];

export default function RobotMascot() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDismissed(sessionStorage.getItem("robot-dismissed") === "1");
    }
  }, []);

  useEffect(() => {
    if (HIDDEN_PATHS.includes(pathname) || dismissed) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, [pathname, dismissed]);

  useEffect(() => {
    if (!open) return;
    const idx = Math.floor(Math.random() * MESSAGES.length);
    setMessage(MESSAGES[idx]);
  }, [open]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    setOpen(false);
    sessionStorage.setItem("robot-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Bulle */}
      {open && (
        <div className="bg-ink-900 border border-ink-700 rounded-2xl rounded-br-sm px-4 py-3 max-w-[220px] shadow-2xl animate-fade-in">
          <p className="text-sm text-slate-200 leading-snug">{message}</p>
          <button onClick={() => setOpen(false)} className="text-xs text-slate-600 hover:text-slate-400 mt-2 block">
            Fermer
          </button>
        </div>
      )}

      {/* Robot */}
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Mascotte CodeGraft"
          className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-robot-bounce"
          style={{ animationDuration: "3s" }}
        >
          {/* Une bulle plutôt qu'une tête de robot : le bouton fait parler la
              mascotte, et l'emoji 🤖 était le dernier sticker du site — celui
              qui, posé sur chaque page, signait le plus « produit généré ». */}
          <svg
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <path d="M20.5 11.6a8 8 0 0 1-8.6 8 9.4 9.4 0 0 1-2.7-.4L4.5 20.5l1.4-4a7.8 7.8 0 0 1-1.4-4.9 8 8 0 0 1 8-8 8 8 0 0 1 8 8.1z" />
            <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
          </svg>
        </button>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping opacity-75" />
        )}
        <button
          onClick={handleDismiss}
          aria-label="Masquer le robot"
          className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-ink-800 border border-ink-600 text-slate-500 hover:text-white text-xs flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes robot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-robot-bounce { animation: robot-bounce 3s ease-in-out infinite; }
        /* Le rebond est déclaré ici et non dans globals.css, donc le bloc
           prefers-reduced-motion de la feuille globale ne l'atteignait pas :
           il rebondissait sans fin pour qui demande moins d'animation. */
        @media (prefers-reduced-motion: reduce) {
          .animate-robot-bounce { animation: none; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
