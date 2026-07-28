"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    icon: "👤",
    title: "Crée ton compte",
    desc: "Ta progression, tes notes et ton temps d'étude te suivent sur tous tes appareils.",
  },
  {
    icon: "🎯",
    title: "Ouvre un module",
    desc: "Chaque module commence par ses objectifs d'apprentissage, ses prérequis et ses lectures de référence.",
  },
  {
    icon: "📝",
    title: "Valide par le quiz",
    desc: "Un quiz corrigé par module. On n'avance que sur des bases solides — comme en cours magistral.",
  },
  {
    icon: "🧪",
    title: "Rends le problem set",
    desc: "Une évaluation pratique notée sur 100, ancrée dans un cas réel : scoring crédit, détection de fraude, prévision retail.",
  },
  {
    icon: "🎓",
    title: "Obtiens ton certificat",
    desc: "Vérifiable, partageable sur LinkedIn, adossé à des projets publics sur ton GitHub.",
  },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(STEPS.length);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(STEPS.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Illumination en cascade. Filet de sécurité identique au compteur :
        // si les timers sont bridés (onglet en arrière-plan), on force l'état final.
        STEPS.forEach((_, i) => setTimeout(() => setVisible((v) => Math.max(v, i)), i * 260));
        setTimeout(() => setVisible(STEPS.length), STEPS.length * 260 + 600);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="relative">
        {/* Ligne de liaison — masquée sur mobile où les étapes s'empilent */}
        <div
          className="hidden lg:block absolute top-[26px] left-[10%] right-[10%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(var(--accent) / 0.45), rgb(var(--accent) / 0.45), transparent)",
          }}
        />

        <ol className="grid gap-8 lg:grid-cols-5 relative">
          {STEPS.map((s, i) => {
            const on = i <= visible;
            return (
              <li key={s.title} className="text-center lg:text-left">
                <div
                  className={`w-13 h-13 mx-auto lg:mx-0 rounded-2xl flex items-center justify-center text-2xl mb-4 border transition-all duration-700 ${
                    on
                      ? "border-accent/50 bg-accent/10 scale-100 opacity-100"
                      : "border-ink-700 bg-ink-900 scale-95 opacity-40"
                  }`}
                  style={{ width: 52, height: 52, transitionTimingFunction: "var(--ease-soft)" }}
                >
                  <span aria-hidden="true">{s.icon}</span>
                </div>
                <div
                  className={`transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-40 translate-y-1"}`}
                  style={{ transitionTimingFunction: "var(--ease-soft)" }}
                >
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-1.5">
                    <span className="text-xs font-mono text-accent-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-white text-sm">{s.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
