"use client";

import { useUserProgress } from "@/lib/userProgress";
import { AVATAR_COLORS, getAvatarEmoji } from "@/lib/avatars";
import Link from "next/link";

export default function ProfileWidget() {
  const ctx = useUserProgress();
  if (!ctx || !ctx.ready) return null;

  // Pas connecté → inciter à créer un compte
  if (!ctx.user) {
    return (
      <div className="card p-5 border-accent/20 bg-accent/5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-white font-semibold text-sm">👋 Bienvenue sur CodeGraft Academy !</p>
          <p className="text-slate-400 text-xs mt-0.5">Crée un compte pour sauvegarder ta progression sur tous tes appareils.</p>
        </div>
        <Link href="/inscription" className="btn-primary text-sm shrink-0">Créer mon compte →</Link>
      </div>
    );
  }

  const color = AVATAR_COLORS.find(c => c.id === ctx.colorId) || AVATAR_COLORS[0];
  const emoji = getAvatarEmoji({ avatarId: ctx.avatarId });
  const xp = ctx.xp || 0;
  const lessons = ctx.completedLessons?.length || 0;

  const level = xp < 200 ? "Débutant" : xp < 600 ? "Intermédiaire" : xp < 1200 ? "Avancé" : "Expert";
  const nextXp = xp < 200 ? 200 : xp < 600 ? 600 : xp < 1200 ? 1200 : 9999;
  const pct = Math.min(100, Math.round((xp / nextXp) * 100));

  return (
    <div className="card p-5 border-accent/20">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center text-3xl shrink-0`}>
          {emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-white text-lg truncate">{ctx.displayName || ctx.user.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent-light">
              {level}
            </span>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-slate-400">
            <span>⚡ {xp} XP</span>
            <span>📚 {lessons} leçons</span>
          </div>
          <div className="mt-2 h-1.5 bg-ink-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-accent-cyan rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-slate-600 mt-1">{xp} / {nextXp} XP pour le niveau suivant</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <Link href="/dashboard" className="text-xs px-3 py-1.5 rounded-lg bg-ink-800 text-slate-300 hover:text-white hover:bg-ink-700 transition-colors">
            📊 Dashboard
          </Link>
          <Link href="/parcours" className="text-xs px-3 py-1.5 rounded-lg bg-ink-800 text-slate-300 hover:text-white hover:bg-ink-700 transition-colors">
            📚 Cours
          </Link>
          <Link href="/projets" className="text-xs px-3 py-1.5 rounded-lg bg-ink-800 text-slate-300 hover:text-white hover:bg-ink-700 transition-colors">
            🛠 Projets
          </Link>
        </div>
        <Link href="/profils" className="text-xs text-accent-light hover:text-accent-cyan">
          Mon compte →
        </Link>
      </div>
    </div>
  );
}
