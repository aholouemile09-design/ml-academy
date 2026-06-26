import { CURRICULUM, totalLessons } from "@/lib/curriculum";

export function computeStats(state) {
  const total = totalLessons();
  const done = state.completedLessons.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const moduleStats = CURRICULUM.map((m) => {
    const doneInModule = m.lessons.filter((l) => state.completedLessons.includes(l.id)).length;
    const quiz = state.quizScores[m.id];
    return {
      id: m.id,
      title: m.title,
      icon: m.icon,
      level: m.level,
      done: doneInModule,
      total: m.lessons.length,
      pct: Math.round((doneInModule / m.lessons.length) * 100),
      quiz,
      completed: doneInModule === m.lessons.length && quiz && quiz.score === quiz.total,
    };
  });

  const level =
    state.xp >= 2000 ? "Expert" : state.xp >= 1200 ? "Avancé" : state.xp >= 600 ? "Intermédiaire" : state.xp >= 200 ? "Apprenti" : "Débutant";

  const badges = [];
  if (done >= 1) badges.push({ icon: "🎯", label: "Première leçon" });
  if (done >= 5) badges.push({ icon: "📚", label: "5 leçons complétées" });
  if (Object.keys(state.quizScores).length >= 1) badges.push({ icon: "✅", label: "Premier quiz" });
  if (Object.values(state.quizScores).some((q) => q.score === q.total)) badges.push({ icon: "💯", label: "Quiz parfait" });
  if (moduleStats.some((m) => m.completed)) badges.push({ icon: "🏆", label: "Module maîtrisé" });
  if (state.xp >= 1000) badges.push({ icon: "⚡", label: "1000 XP" });
  if (pct === 100) badges.push({ icon: "🎓", label: "Diplômé CodeGraft Academy" });

  return { total, done, pct, moduleStats, level, badges };
}
