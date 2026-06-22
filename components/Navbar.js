"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { useProgress } from "@/lib/progress";
import { useProfiles, AVATAR_COLORS, getAvatarEmoji } from "@/lib/profiles";
import { useTheme } from "@/lib/theme";

const NAV_GROUPS = [
  {
    label: "ML & Data",
    links: [
      { href: "/parcours", label: "Parcours ML" },
      { href: "/projets", label: "Projets" },
      { href: "/projets/publier", label: "🐙 Publier sur GitHub" },
      { href: "/certifications", label: "Certifications" },
      { href: "/certifications/prep/c6", label: "🎯 Prép AWS CLF" },
      { href: "/profils", label: "👤 Profils" },
    ],
  },
  {
    label: "Web Dev",
    links: [
      { href: "/webdev", label: "Parcours Web" },
    ],
  },
  {
    label: "Outils",
    links: [
      { href: "/espace", label: "🏠 Mon Espace" },
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
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const closeTimer = useRef(null);
  const profileTimer = useRef(null);
  const { profiles, activeProfile, switchProfile } = useProfiles() || {};
  const { theme, toggleTheme } = useTheme();

  const profileColor = activeProfile
    ? AVATAR_COLORS.find(c => c.id === activeProfile.colorId) || AVATAR_COLORS[0]
    : null;
  const avatarEmoji = activeProfile ? getAvatarEmoji(activeProfile) : "👤";

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
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg shrink-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center text-white text-sm font-black">
            ML
          </span>
          <span className="hidden sm:block">
            ML <span className="gradient-text">Academy</span>
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
                  className="absolute left-0 top-full bg-ink-900 border border-ink-700 rounded-xl shadow-2xl py-2 min-w-[160px] z-50"
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
          {progress && (
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent-light text-xs font-bold">
              ⚡ {activeProfile?.xp ?? progress.xp} XP
            </span>
          )}

          {/* Profile avatar dropdown */}
          {profiles && profiles.length > 0 && (
            <div className="relative hidden sm:block"
              onMouseEnter={() => { if (profileTimer.current) clearTimeout(profileTimer.current); setProfileOpen(true); }}
              onMouseLeave={() => { profileTimer.current = setTimeout(() => setProfileOpen(false), 150); }}>
              <button className={`w-8 h-8 rounded-full ${profileColor?.bg || "bg-slate-600"} flex items-center justify-center text-base ring-2 ring-offset-1 ring-offset-ink-950 ${profileColor?.ring || "ring-slate-500"}`}>
                {avatarEmoji}
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 bg-ink-900 border border-ink-700 rounded-xl shadow-2xl py-2 min-w-[180px] z-50"
                  onMouseEnter={() => { if (profileTimer.current) clearTimeout(profileTimer.current); }}
                  onMouseLeave={() => { profileTimer.current = setTimeout(() => setProfileOpen(false), 150); }}>
                  <p className="px-4 py-1 text-xs text-slate-600 uppercase font-semibold">Changer de profil</p>
                  {profiles.map(p => {
                    const col = AVATAR_COLORS.find(c => c.id === p.colorId) || AVATAR_COLORS[0];
                    const ini = p.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
                    return (
                      <button key={p.id} onClick={() => { switchProfile(p.id); setProfileOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${p.id === activeProfile?.id ? "bg-accent/10 text-white" : "text-slate-300 hover:bg-ink-800"}`}>
                        <span className={`w-6 h-6 rounded-full ${col.bg} flex items-center justify-center text-sm shrink-0`}>{getAvatarEmoji(p)}</span>
                        <span className="flex-1 truncate">{p.name}</span>
                        {p.id === activeProfile?.id && <span className="text-emerald-400 text-xs">✓</span>}
                      </button>
                    );
                  })}
                  <div className="border-t border-ink-700 mt-1 pt-1">
                    <Link href="/profils" onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-xs text-slate-400 hover:text-accent-light hover:bg-ink-800 transition-colors">
                      Gérer les profils →
                    </Link>
                  </div>
                </div>
              )}
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
