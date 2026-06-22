"use client";
import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "ml-academy-profiles";
const ACTIVE_KEY  = "ml-academy-active-profile";
const MAX_PROFILES = 5;

export const AVATAR_COLORS = [
  { id: "indigo",  bg: "bg-indigo-500",  ring: "ring-indigo-400",  hex: "#6366f1", label: "Indigo"  },
  { id: "cyan",    bg: "bg-cyan-500",    ring: "ring-cyan-400",    hex: "#06b6d4", label: "Cyan"    },
  { id: "emerald", bg: "bg-emerald-500", ring: "ring-emerald-400", hex: "#10b981", label: "Vert"    },
  { id: "rose",    bg: "bg-rose-500",    ring: "ring-rose-400",    hex: "#f43f5e", label: "Rose"    },
  { id: "amber",   bg: "bg-amber-500",   ring: "ring-amber-400",   hex: "#f59e0b", label: "Ambre"   },
];

export function createProfile(name, colorId = "indigo") {
  return {
    id: Date.now().toString(),
    name: name.trim(),
    colorId,
    createdAt: new Date().toISOString(),
    completedLessons: [],
    quizScores: {},
    xp: 0,
    calendarChecks: {},
    apiKey: "",
  };
}

// ── Storage helpers ──────────────────────────────────────────────────────────
function loadProfiles() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}
function loadActiveId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_KEY) || null;
}
function saveActiveId(id) {
  localStorage.setItem(ACTIVE_KEY, id);
}

// ── Context ──────────────────────────────────────────────────────────────────
const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profiles, setProfiles]     = useState([]);
  const [activeId, setActiveId]     = useState(null);
  const [ready, setReady]           = useState(false);

  useEffect(() => {
    const p = loadProfiles();
    const a = loadActiveId();
    setProfiles(p);
    setActiveId(p.find(x => x.id === a) ? a : (p[0]?.id || null));
    setReady(true);
  }, []);

  const activeProfile = profiles.find(p => p.id === activeId) || null;

  // ── Persist on every change ──────────────────────────────────────────────
  const persist = (updated, newActiveId) => {
    setProfiles(updated);
    saveProfiles(updated);
    if (newActiveId !== undefined) {
      setActiveId(newActiveId);
      saveActiveId(newActiveId);
    }
  };

  // ── Profile CRUD ─────────────────────────────────────────────────────────
  const addProfile = (name, colorId) => {
    if (profiles.length >= MAX_PROFILES) return null;
    const p = createProfile(name, colorId);
    const updated = [...profiles, p];
    persist(updated, p.id);
    return p;
  };

  const deleteProfile = (id) => {
    const updated = profiles.filter(p => p.id !== id);
    const newActive = updated[0]?.id || null;
    persist(updated, activeId === id ? newActive : activeId);
  };

  const switchProfile = (id) => {
    if (profiles.find(p => p.id === id)) {
      setActiveId(id);
      saveActiveId(id);
    }
  };

  const updateActiveProfile = (patch) => {
    const updated = profiles.map(p =>
      p.id === activeId ? { ...p, ...patch } : p
    );
    persist(updated);
  };

  // ── Progress helpers (mirror lib/progress.js API) ────────────────────────
  const completeLesson = (lessonId) => {
    if (!activeProfile) return;
    if (activeProfile.completedLessons.includes(lessonId)) return;
    updateActiveProfile({
      completedLessons: [...activeProfile.completedLessons, lessonId],
      xp: activeProfile.xp + 50,
    });
  };

  const saveQuiz = (moduleId, score, total) => {
    if (!activeProfile) return;
    updateActiveProfile({
      quizScores: { ...activeProfile.quizScores, [moduleId]: { score, total } },
      xp: activeProfile.xp + score * 25,
    });
  };

  const resetProgress = () => {
    updateActiveProfile({
      completedLessons: [],
      quizScores: {},
      xp: 0,
      calendarChecks: {},
    });
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      activeProfile,
      activeId,
      ready,
      addProfile,
      deleteProfile,
      switchProfile,
      updateActiveProfile,
      completeLesson,
      saveQuiz,
      resetProgress,
      maxReached: profiles.length >= MAX_PROFILES,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfiles() {
  return useContext(ProfileContext);
}
