"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { useUserProgress } from "@/lib/userProgress";
import { AVATAR_COLORS, getAvatarEmoji } from "@/lib/avatars";
import { useTheme } from "@/lib/theme";
import { computeStreak } from "@/lib/streak";

const NAV_GROUPS = [
  {
    label: "ML & Data",
    links: [
      { href: "/parcours", label: "Parcours ML" },
      { href: "/projets", label: "Projets" },
      { href: "/projets/publier", label: "🐙 Publier sur GitHub" },
      { href: "/certifications", label: "Certifications" },
      { href: "/certifications/prep/c6", label: "🎯 Prép AWS CLF" },
    ],
  },
  {
    label: "Web Dev",
    links: [
      { href: "/webdev", label: "Parcours Web" },
    ],
  },
  {
    label: "PMP",
    links: [
      { href: "/pmp", label: "📋 Parcours PMP" },
      { href: "/pmp/examen-blanc", label: "🎯 Examen blanc" },
    ],
  },
  {
    label: "Outils",
    links: [
      { href: "/espace", label: "🏠 Mon Espace" },
      { href: "/reviser", label: "🃏 Réviser" },
      { href: "/plan", label: "📅 Plan d'étude" },
      { href: "/journal", label: "📓 Mon journal" },
      { href: "/calendrier", label: "Plan général" },
      { href: "/ressources", label: "Ressources" },
      { href: "/aller-plus-loin", label: "🚀 Aller plus loin" },
      { href: "/aller-plus-loin/masters", label: "🎓 Masters spécialisés" },
      { href: "/tuteur", label: "Tuteur AI" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/parametres", label: "Paramètres" },
    ],
  },
];

const ALL_LINKS = NAV_GROUPS.flatMap((g) => g.links);

export default function Navbar() {
  const pathname = usePathname();
  const progress = useUserProgress();
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const closeTimer = useRef(null);
  const profileTimer = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const user = progress?.user;

  const profileColor = user ? AVATAR_COLORS.find(c => c.id === progress.colorId) || AVATAR_COLORS[0] : null;
  const avatarEmoji = user ? getAvatarEmoji(progress) : "👤";

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveGroup(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveGroup(null), 150);
  };

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-ink-950/85 border-b border-ink-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg shrink-0" aria-label="CodeGraft Academy — accueil">
          <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#logo-g)" />
            <g stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" fill="none">
              <path d="M11 25 V12" />
              <path d="M11 18 Q11 11 21 9.5" />
            </g>
            <g fill="#ffffff">
              <circle cx="11" cy="25" r="2.7" />
              <circle cx="11" cy="10" r="2.7" />
              <circle cx="22" cy="9.3" r="2.7" />
            </g>
          </svg>
          <span className="hidden sm:block">
            Code<span className="gradient-text">Graft</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_GROUPS.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => handleEnter(group.label)}
              onMouseLeave={handleLeave}
            >
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  group.links.some((l) => isActive(l.href))
                    ? "text-white bg-ink-800"
                    : "text-slate-400 hover:text-white hover:bg-ink-800/60"
                }`}
              >
                {group.label}
                <span className="text-xs text-slate-600">▾</span>
              </button>
              {activeGroup === group.label && (
                <div
                  className="absolute left-0 top-full nav-dropdown bg-ink-900 border border-ink-700 rounded-xl shadow-2xl py-2 min-w-[160px] z-50"
                  onMouseEnter={() => handleEnter(group.label)}
                  onMouseLeave={handleLeave}
                >
                  {group.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(l.href)
                          ? "text-white bg-accent/10"
                          : "text-slate-300 hover:text-white hover:bg-ink-800"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* XP + Profile switcher + mobile menu */}
        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent-light text-xs font-bold">
              ⚡ {progress.xp} XP
            </span>
          )}
          {user && computeStreak(progress.activityDates || []).current > 0 && (
            <span className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold" title="Série de jours consécutifs">
              🔥 {computeStreak(progress.activityDates || []).current}
            </span>
          )}

          {/* Compte : avatar + menu, ou liens connexion/inscription */}
          {user ? (
            <div className="relative hidden sm:block"
              onMouseEnter={() => { if (profileTimer.current) clearTimeout(profileTimer.current); setProfileOpen(true); }}
              onMouseLeave={() => { profileTimer.current = setTimeout(() => setProfileOpen(false), 150); }}>
              {progress?.avatarUrl ? (
                <img src={progress.avatarUrl} alt="avatar" className={`w-8 h-8 rounded-full object-cover ring-2 ring-offset-1 ring-offset-ink-950 ${profileColor?.ring || "ring-slate-500"}`} />
              ) : (
                <button className={`w-8 h-8 rounded-full ${profileColor?.bg || "bg-slate-600"} flex items-center justify-center text-base ring-2 ring-offset-1 ring-offset-ink-950 ${profileColor?.ring || "ring-slate-500"}`}>
                  {avatarEmoji}
                </button>
              )}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 nav-dropdown bg-ink-900 border border-ink-700 rounded-xl shadow-2xl py-2 min-w-[180px] z-50"
                  onMouseEnter={() => { if (profileTimer.current) clearTimeout(profileTimer.current); }}
                  onMouseLeave={() => { profileTimer.current = setTimeout(() => setProfileOpen(false), 150); }}>
                  <p className="px-4 py-1.5 text-sm text-white truncate">{progress.displayName || user.email}</p>
                  <div className="border-t border-ink-700 mt-1 pt-1">
                    <Link href="/profils" onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-xs text-slate-400 hover:text-accent-light hover:bg-ink-800 transition-colors">
                      Mon compte →
                    </Link>
                    <form action="/auth/logout" method="post">
                      <button type="submit" className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-ink-800 transition-colors">
                        Se déconnecter
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/connexion" className="text-xs text-slate-400 hover:text-white px-2">Connexion</Link>
              <Link href="/inscription" className="text-xs px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent-light hover:bg-accent/20 transition-colors">
                Créer un compte
              </Link>
            </div>
          )}

          {/* Bouton thème sombre / clair */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-ink-700 hover:border-accent/50 transition-colors text-slate-400 hover:text-accent-light"
            title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            aria-label="Changer le thème"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-ink-700 bg-ink-900 px-4 py-4 space-y-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="text-xs text-slate-600 uppercase font-semibold mb-1 px-1">{group.label}</div>
              {group.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive(l.href)
                      ? "text-white bg-ink-800"
                      : "text-slate-300 hover:bg-ink-800"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          {progress && (
            <div className="pt-3 border-t border-ink-700 text-xs text-accent-light font-bold">
              ⚡ {progress.xp} XP
            </div>
          )}
        </div>
      )}
    </header>
  );
}
