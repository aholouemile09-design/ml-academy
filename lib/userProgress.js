"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const defaultRow = {
  displayName: "",
  colorId: "indigo",
  avatarId: "robot",
  completedLessons: [],
  quizScores: {},
  calendarChecks: {},
  calendarStart: "",
  trackPreference: "ml",
  xp: 0,
};

function rowFromDb(row) {
  return {
    displayName: row.display_name || "",
    colorId: row.color_id || "indigo",
    avatarId: row.avatar_id || "robot",
    completedLessons: row.completed_lessons || [],
    quizScores: row.quiz_scores || {},
    calendarChecks: row.calendar_checks || {},
    calendarStart: row.calendar_start || "",
    trackPreference: row.track_preference || "ml",
    xp: row.xp || 0,
  };
}

const UserProgressContext = createContext(null);

export function UserProgressProvider({ children }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState(null);
  const [data, setData] = useState(defaultRow);
  const [ready, setReady] = useState(false);

  const loadRow = useCallback(async (userId) => {
    const { data: row } = await supabase.from("user_progress").select("*").eq("user_id", userId).single();
    if (row) setData(rowFromDb(row));
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (!mounted) return;
      setUser(u || null);
      if (u) loadRow(u.id).then(() => mounted && setReady(true));
      else setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      setUser(u);
      if (u) loadRow(u.id);
      else setData(defaultRow);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase, loadRow]);

  const persist = async (patch) => {
    if (!user) return;
    setData((d) => ({ ...d, ...patch }));
    const dbPatch = {};
    if ("displayName" in patch) dbPatch.display_name = patch.displayName;
    if ("colorId" in patch) dbPatch.color_id = patch.colorId;
    if ("avatarId" in patch) dbPatch.avatar_id = patch.avatarId;
    if ("completedLessons" in patch) dbPatch.completed_lessons = patch.completedLessons;
    if ("quizScores" in patch) dbPatch.quiz_scores = patch.quizScores;
    if ("calendarChecks" in patch) dbPatch.calendar_checks = patch.calendarChecks;
    if ("calendarStart" in patch) dbPatch.calendar_start = patch.calendarStart;
    if ("trackPreference" in patch) dbPatch.track_preference = patch.trackPreference;
    if ("xp" in patch) dbPatch.xp = patch.xp;
    await supabase.from("user_progress").update(dbPatch).eq("user_id", user.id);
  };

  const completeLesson = (lessonId) => {
    if (data.completedLessons.includes(lessonId)) return;
    persist({ completedLessons: [...data.completedLessons, lessonId], xp: data.xp + 50 });
  };

  const saveQuiz = (moduleId, score, total) => {
    const prev = data.quizScores[moduleId];
    const gained = !prev || score > prev.score ? (score - (prev?.score || 0)) * 25 : 0;
    persist({
      quizScores: { ...data.quizScores, [moduleId]: { score: Math.max(score, prev?.score || 0), total } },
      xp: data.xp + Math.max(gained, 0),
    });
  };

  const resetProgress = () => persist({ completedLessons: [], quizScores: {}, calendarChecks: {}, xp: 0 });

  const updateProfile = (patch) => persist(patch);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Fusionne d'anciennes données localStorage (pré-Supabase) dans le compte, une seule fois.
  const importLegacy = async (legacy) => {
    if (!user) return;
    const mergedLessons = Array.from(new Set([...data.completedLessons, ...(legacy.completedLessons || [])]));
    const mergedQuizzes = { ...data.quizScores };
    for (const [k, v] of Object.entries(legacy.quizScores || {})) {
      if (!mergedQuizzes[k] || v.score > mergedQuizzes[k].score) mergedQuizzes[k] = v;
    }
    const recomputedXp =
      mergedLessons.length * 50 + Object.values(mergedQuizzes).reduce((sum, q) => sum + q.score * 25, 0);
    await persist({ completedLessons: mergedLessons, quizScores: mergedQuizzes, xp: recomputedXp });
  };

  return (
    <UserProgressContext.Provider
      value={{
        ...data,
        loaded: ready,
        ready,
        user,
        completeLesson,
        saveQuiz,
        resetProgress,
        updateProfile,
        signOut,
        importLegacy,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  return useContext(UserProgressContext);
}

export { computeStats } from "@/lib/progressStats";
