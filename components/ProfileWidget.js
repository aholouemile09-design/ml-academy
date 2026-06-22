"use client";

import { useProfiles, AVATAR_COLORS, getAvatarEmoji } from "@/lib/profiles";
import Link from "next/link";

export default function ProfileWidget() {
  const ctx = useProfiles();
  if (!ctx || !ctx.ready) return null;

  const { profiles, activeProfile, switchProfile } = ctx;

  // Aucun profil existant → inciter à en créer un
  if (profiles.length === 0) {
    return (
      <div className="card p-5 border-accent/20 bg-accent/5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-white font-semibold text-sm">👋 Bienvenue sur ML Academy !</p>
          <p className="text-slate-400 text-xs mt-0.5">Crée ton profil pour sauvegarder ta progression.</p>
        </div>
        <Link href="/profils" className="btn-primary text-sm shrink-0">Créer mon profil →</Link>
      </div>
    );
  }

  const color = AVATAR_COLORS.find(c => c.id === activeProfile?.colorId) || AVATAR_COLORS[0];
  const emoji = getAvatarEmoji(activeProfile);
  const xp = activeProfile?.xp || 0;
  const lessons = activeProfile?.completedLessons?.length || 0;

  // Calcul niveau simple
  const level = xp < 200 ? "Débutant" : xp < 600 ? "Intermédiaire" : xp < 1200 ? "Avancé" : "Expert";
  const nextXp = xp < 200 ? 200 : xp < 600 ? 600 : xp < 1200 ? 1200 : 9999;
  const pct = Math.min(100, Math.round((xp / nextXp) * 100));

  return (
    <div className="card p-5 border-accent/20">
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar actif */}
        <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center text-3xl shrink-0`}>
          {emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-white text-lg truncate">{activeProfile?.name}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent-light">
              {level}
            </span>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-slate-400">
            <span>⚡ {xp} XP</span>
            <span>📚 {lessons} leçons</span>
          </div>
          {/* Barre de progression XP */}
          <div className="mt-2 h-1.5 bg-ink-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-accent-cyan rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-slate-600 mt-1">{xp} / {nextXp} XP pour le niveau suivant</p>
        </div>
      </div>

      {/* Actions rapides */}
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

        {/* Switcher d'autres profils */}
        {profiles.length > 1 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-600 mr-1">Changer :</span>
            {profiles
              .filter(p => p.id !== activeProfile?.id)
              .map(p => {
                const c = AVATAR_COLORS.find(x => x.id === p.colorId) || AVATAR_COLORS[0];
                return (
                  <button key={p.id} onClick={() => switchProfile(p.id)} title={p.name}
                    className={`w-7 h-7 rounded-full ${c.bg} flex items-center justify-center text-sm hover:ring-2 ring-white/20 transition-all`}>
                    {getAvatarEmoji(p)}
                  </button>
                );
              })
            }
            <Link href="/profils" className="text-xs text-accent-light hover:text-accent-cyan ml-1">
              Gérer →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
