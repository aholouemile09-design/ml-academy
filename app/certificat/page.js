"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useUserProgress } from "@/lib/userProgress";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

function buildModuleList() {
  const list = [];
  for (const mod of CURRICULUM) {
    list.push({ ...mod, track: "ml", trackLabel: "ML & Data Science", trackIcon: "🤖", href: "/parcours" });
  }
  for (const mod of WEB_CURRICULUM) {
    list.push({ ...mod, track: "web", trackLabel: "Web Full Stack", trackIcon: "🌐", href: "/webdev" });
  }
  for (const mod of PMP_CURRICULUM) {
    list.push({ ...mod, track: "pmp", trackLabel: "PMP 2026", trackIcon: "📋", href: "/pmp" });
  }
  return list;
}

const ALL_MODULES = buildModuleList();

export default function CertificatsPage() {
  const ctx = useUserProgress();
  const completedLessons = ctx?.completedLessons || [];
  const displayName = ctx?.displayName || "Apprenant";

  const earned = useMemo(() => {
    return ALL_MODULES.filter(mod => {
      if (!mod.lessons?.length) return false;
      return mod.lessons.every(l => completedLessons.includes(l.id));
    });
  }, [completedLessons]);

  const inProgress = useMemo(() => {
    return ALL_MODULES.filter(mod => {
      if (!mod.lessons?.length) return false;
      const done = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
      return done > 0 && done < mod.lessons.length;
    }).map(mod => {
      const done = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
      return { ...mod, done, total: mod.lessons.length, pct: Math.round((done / mod.lessons.length) * 100) };
    });
  }, [completedLessons]);

  if (!ctx?.user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Connecte-toi pour voir tes certificats.</p>
        <Link href="/connexion" className="btn-primary">Se connecter</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">🏆 Mes Certificats</h1>
      <p className="text-slate-400 text-sm mb-8">
        Un certificat est délivré automatiquement quand tu complètes toutes les leçons d'un module.
        Partage-le sur LinkedIn pour valoriser ta progression.
      </p>

      {/* Certificats obtenus */}
      {earned.length === 0 ? (
        <div className="card p-8 text-center mb-8">
          <p className="text-4xl mb-3">🎯</p>
          <p className="text-white font-semibold mb-1">Aucun certificat encore obtenu</p>
          <p className="text-slate-400 text-sm">Complete toutes les leçons d'un module pour débloquer ton premier certificat.</p>
          <Link href="/parcours" className="inline-block mt-4 btn-primary">Continuer l'apprentissage →</Link>
        </div>
      ) : (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            ✅ Certificats débloqués ({earned.length})
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {earned.map(mod => (
              <Link
                key={mod.id}
                href={`/certificat/${mod.track}-${mod.id}`}
                className="card p-5 hover:border-accent/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-8 translate-x-8" />
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{mod.icon || mod.trackIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-0.5">{mod.trackIcon} {mod.trackLabel}</p>
                    <h3 className="font-bold text-white leading-tight">{mod.title}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-semibold">✅ {mod.lessons.length} leçons complétées</span>
                  <span className="text-xs text-accent-light opacity-0 group-hover:opacity-100 transition-opacity">Voir le certificat →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* En cours */}
      {inProgress.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            ⏳ En cours ({inProgress.length})
          </h2>
          <div className="space-y-3">
            {inProgress.map(mod => (
              <Link key={mod.id} href={`${mod.href}/${mod.id}`}
                className="card p-4 flex items-center gap-4 hover:border-accent/40 transition-colors">
                <span className="text-2xl">{mod.icon || mod.trackIcon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">{mod.trackIcon} {mod.trackLabel}</p>
                  <p className="font-medium text-white text-sm">{mod.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-ink-700 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${mod.pct}%` }} />
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">{mod.done}/{mod.total}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-600">{mod.pct}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
