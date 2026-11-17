"use client";

import CarteModule from "@/components/CarteModule";
import { WEB_CURRICULUM, WEB_LEVELS } from "@/lib/webdev";
import { FORMATIONS } from "@/lib/formations";
import { useUserProgress as useProgress } from "@/lib/userProgress";
import EnteteParcours from "@/components/EnteteParcours";
import MasteryMap from "@/components/MasteryMap";
import { computeWebMastery } from "@/lib/mastery";

export default function WebDev() {
  const progress = useProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <EnteteParcours {...FORMATIONS.web} />

      {progress && <MasteryMap modules={computeWebMastery(progress.quizScores || {})} title="Ta maîtrise par module" />}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {WEB_CURRICULUM.map((m, i) => {
          const done = progress
            ? m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
            : 0;
          return (
            <CarteModule
              key={m.id}
              href={`/webdev/${m.id}`}
              rang={i + 1}
              prefixe="Web"
              niveau={WEB_LEVELS[m.level]}
              title={m.title}
              description={m.description}
              done={done}
              total={m.lessons.length}
            />
          );
        })}
      </div>

      <div className="mt-10 card p-6 bg-blue-500/5 border-blue-500/20">
        <h3 className="font-bold text-white mb-2">Ce que tu pourras construire</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-400">
          <div>→ Portfolio personnel professionnel</div>
          <div>→ Dashboard de visualisation ML</div>
          <div>→ Interface pour tes APIs FastAPI</div>
          <div>→ SaaS / application web complète</div>
          <div>→ Site vitrine (ce modèle à adapter)</div>
          <div>→ Application avec authentification</div>
        </div>
      </div>
    </div>
  );
}
