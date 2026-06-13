"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { useProgress } from "@/lib/progress";

const NAV_GROUPS = [
  {
    label: "ML & Data",
    links: [
      { href: "/parcours", label: "Parcours ML" },
      { href: "/projets", label: "Projets" },
      { href: "/certifications", label: "Certifications" },
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
      { href: "/calendrier", label: "Calendrier" },
      { href: "/ressources", label: "Ressources" },
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
  const closeTimer = useRef(null);

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

        {/* XP + mobile menu */}
        <div className="flex items-center gap-3">
          {progress && (
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent-light text-xs font-bold">
              ⚡ {progress.xp} XP
            </span>
          )}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white"
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
