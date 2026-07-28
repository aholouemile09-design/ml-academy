"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compteur qui s'incrémente quand il entre dans le viewport.
 * Accepte "9", "15", "5 ans" — le suffixe non numérique est conservé.
 *
 * Principe de robustesse : la valeur affichée par défaut est la valeur
 * FINALE. L'animation est un bonus qui repart de zéro seulement si on est
 * certain de pouvoir la mener à terme. Un compteur figé sur un chiffre faux
 * (« 0 modules ML ») est bien pire que l'absence d'animation — et c'est
 * exactement ce qui arrive quand requestAnimationFrame est suspendu par le
 * navigateur sur un onglet en arrière-plan.
 */
export default function AnimatedCounter({ value, duration = 1400, className = "" }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : String(value);

  // On démarre sur la bonne valeur : c'est ce que voient le rendu serveur,
  // les moteurs de recherche, et tout visiteur dont l'animation échoue.
  const [display, setDisplay] = useState(target);

  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let backstop = 0;

    const animate = () => {
      if (started.current) return;
      started.current = true;

      // Filet de sécurité armé AVANT l'animation : quoi qu'il arrive
      // ensuite, la valeur finale sera juste.
      backstop = setTimeout(() => {
        cancelAnimationFrame(raf);
        setDisplay(target);
      }, duration + 400);

      const t0 = performance.now();
      setDisplay(0);

      const step = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        // easeOutExpo : démarre vite, ralentit à l'approche de la cible
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setDisplay(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(step);
        else clearTimeout(backstop);
      };
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(backstop);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
