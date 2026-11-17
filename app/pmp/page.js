"use client";

import CarteModule from "@/components/CarteModule";
import { PMP_CURRICULUM, PMP_LEVELS } from "@/lib/pmp";
import { FORMATIONS } from "@/lib/formations";
import { useUserProgress as useProgress } from "@/lib/userProgress";
import EnteteParcours from "@/components/EnteteParcours";
import MasteryMap from "@/components/MasteryMap";
import PmpReadiness from "@/components/PmpReadiness";
import { computePmpMastery, computePmpReadiness } from "@/lib/mastery";

export default function Pmp() {
  const progress = useProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <EnteteParcours {...FORMATIONS.pmp} />

      {progress && (
        <>
          <PmpReadiness readiness={computePmpReadiness(progress.quizScores || {})} />
          <MasteryMap modules={computePmpMastery(progress.quizScores || {})} title="Maîtrise par module PMP" />
        </>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {PMP_CURRICULUM.map((m, i) => {
          const done = progress
            ? m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
            : 0;
          return (
            <CarteModule
              key={m.id}
              href={`/pmp/${m.id}`}
              rang={i + 1}
              prefixe="PMP"
              niveau={PMP_LEVELS[m.level]}
              title={m.title}
              description={m.description}
              done={done}
              total={m.lessons.length}
            />
          );
        })}
      </div>

      <div className="mt-10 card p-6 bg-accent/5 border-accent/20">
        <h3 className="font-bold text-white mb-2">Ce parcours te prépare à</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-400">
          <div>→ Réussir l'examen PMP 2026 (PMBOK 8)</div>
          <div>→ Maîtriser le mindset et l'éthique PMI</div>
          <div>→ Les 3 domaines : People, Process, Business</div>
          <div>→ Prédictif, agile et hybride</div>
          <div>→ Le calcul de la valeur acquise (EVM)</div>
          <div>→ T'auto-évaluer avec un examen blanc</div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          À noter — le PMP exige aussi de l'expérience en gestion de projet et 35 heures de formation pour candidater, voir le module « Fondamentaux ».
        </p>
      </div>
    </div>
  );
}
