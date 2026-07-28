"use client";

import { useEffect, useRef, useState } from "react";
import { addModuleSeconds, getModuleSeconds } from "@/lib/studyTime";

const TICK_MS = 5000;          // cadence d'accumulation
const IDLE_TIMEOUT_MS = 120000; // 2 min sans interaction → on ne compte plus

/**
 * Compte le temps réellement passé sur un module.
 *
 * Ne compte pas quand l'onglet est masqué ni après 2 minutes sans
 * interaction : sinon un onglet oublié toute la nuit afficherait
 * « 8 h d'étude », ce qui n'aiderait personne.
 *
 * @returns {number} total de secondes cumulées sur ce module
 */
export function useModuleTime(moduleId) {
  const [seconds, setSeconds] = useState(0);
  const lastActivityRef = useRef(Date.now());

  // Total déjà cumulé lors des sessions précédentes.
  useEffect(() => {
    if (moduleId) setSeconds(getModuleSeconds(moduleId));
  }, [moduleId]);

  useEffect(() => {
    if (!moduleId) return;

    const markActive = () => { lastActivityRef.current = Date.now(); };
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, markActive, { passive: true }));

    const id = setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - lastActivityRef.current > IDLE_TIMEOUT_MS) return;
      setSeconds(addModuleSeconds(moduleId, TICK_MS / 1000));
    }, TICK_MS);

    return () => {
      clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, markActive));
    };
  }, [moduleId]);

  return seconds;
}
