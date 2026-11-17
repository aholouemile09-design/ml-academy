"use client";

import CarteModule from "@/components/CarteModule";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";
import { FORMATIONS } from "@/lib/formations";
import { useUserProgress as useProgress } from "@/lib/userProgress";
import EnteteParcours from "@/components/EnteteParcours";
import MasteryMap from "@/components/MasteryMap";
import { computeMlMastery } from "@/lib/mastery";

export default function Parcours() {
  const progress = useProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <EnteteParcours {...FORMATIONS.ml} />

      {progress && <MasteryMap modules={computeMlMastery(progress.quizScores || {})} title="Ta maîtrise par module" />}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {CURRICULUM.map((m, i) => {
          const done = progress
            ? m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length
            : 0;
          const quiz = progress?.quizScores?.[m.id];
          return (
            <CarteModule
              key={m.id}
              href={`/parcours/${m.id}`}
              rang={i + 1}
              prefixe="Module"
              niveau={LEVELS[m.level]}
              title={m.title}
              description={m.description}
              done={done}
              total={m.lessons.length}
              complement={quiz ? ` · quiz ${quiz.score}/${quiz.total}` : ""}
            />
          );
        })}
      </div>
    </div>
  );
}
