"use client";

import { useParams } from "next/navigation";
import { useMemo, useRef } from "react";
import Link from "next/link";
import { useUserProgress } from "@/lib/userProgress";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

function buildModuleMap() {
  const map = {};
  for (const mod of CURRICULUM)     map[`ml-${mod.id}`]  = { ...mod, track: "ml",  trackLabel: "ML & Data Science", trackIcon: "🤖" };
  for (const mod of WEB_CURRICULUM) map[`web-${mod.id}`] = { ...mod, track: "web", trackLabel: "Web Full Stack",    trackIcon: "🌐" };
  for (const mod of PMP_CURRICULUM) map[`pmp-${mod.id}`] = { ...mod, track: "pmp", trackLabel: "PMP 2026",          trackIcon: "📋" };
  return map;
}

const MODULE_MAP = buildModuleMap();

function todayFormatted() {
  return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function CertificatePage() {
  const { certId } = useParams();
  const ctx = useUserProgress();
  const displayName = ctx?.displayName || ctx?.user?.email || "Apprenant";
  const completedLessons = ctx?.completedLessons || [];

  const mod = MODULE_MAP[certId];

  const isEarned = useMemo(() => {
    if (!mod?.lessons?.length) return false;
    return mod.lessons.every(l => completedLessons.includes(l.id));
  }, [mod, completedLessons]);

  if (!ctx?.user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Connecte-toi pour voir ce certificat.</p>
        <Link href="/connexion" className="btn-primary">Se connecter</Link>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Certificat introuvable.</p>
        <Link href="/certificat" className="btn-primary">Mes certificats</Link>
      </div>
    );
  }

  if (!isEarned) {
    const done  = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
    const total = mod.lessons.length;
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-4xl mb-3">🔒</p>
        <h1 className="text-xl font-bold text-white mb-2">Certificat non encore débloqué</h1>
        <p className="text-slate-400 text-sm mb-4">
          Tu as complété {done}/{total} leçons du module "<strong className="text-white">{mod.title}</strong>".
          Termine toutes les leçons pour débloquer ce certificat.
        </p>
        <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-ink-700 mb-6 overflow-hidden">
          <div className="h-full bg-accent rounded-full" style={{ width: `${Math.round(done / total * 100)}%` }} />
        </div>
        <Link href={`/${mod.track === "ml" ? "parcours" : mod.track}/${mod.id}`} className="btn-primary">
          Continuer le module →
        </Link>
      </div>
    );
  }

  const issueDate = todayFormatted();
  const certUrl = typeof window !== "undefined" ? window.location.href : "";

  // LinkedIn "Add to Profile" URL
  const linkedInUrl = new URL("https://www.linkedin.com/profile/add");
  linkedInUrl.searchParams.set("startTask", "CERTIFICATION_NAME");
  linkedInUrl.searchParams.set("name", `${mod.title} — CodeGraft Academy`);
  linkedInUrl.searchParams.set("organizationName", "CodeGraft Academy");
  linkedInUrl.searchParams.set("issueYear", new Date().getFullYear());
  linkedInUrl.searchParams.set("issueMonth", new Date().getMonth() + 1);
  linkedInUrl.searchParams.set("certUrl", certUrl);
  linkedInUrl.searchParams.set("certId", certId);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/certificat" className="text-sm text-slate-500 hover:text-accent-light mb-8 inline-block">
        ← Mes certificats
      </Link>

      {/* Certificat visuel */}
      <div id="certificate-card" className="relative rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-ink-900 via-ink-900 to-accent/5 p-8 sm:p-12 text-center overflow-hidden mb-6 print:border-yellow-500 print:shadow-none">
        {/* Coins décoratifs */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/40 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/40 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/40 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />

        {/* Logo */}
        <div className="text-5xl mb-2">🎓</div>
        <p className="text-xs text-accent-light font-semibold uppercase tracking-widest mb-6">CodeGraft Academy</p>

        <p className="text-slate-400 text-sm mb-2">Ce certificat est décerné à</p>
        <h2 className="text-3xl font-bold text-white mb-6">{displayName}</h2>

        <p className="text-slate-400 text-sm mb-2">pour avoir complété avec succès le module</p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-4xl">{mod.icon || mod.trackIcon}</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{mod.title}</h1>
        <p className="text-sm text-accent-light mb-6">{mod.trackIcon} {mod.trackLabel}</p>

        <div className="flex justify-center gap-6 text-center mb-6">
          <div>
            <p className="text-2xl font-bold text-white">{mod.lessons.length}</p>
            <p className="text-xs text-slate-500">leçons complétées</p>
          </div>
          {mod.quiz?.length > 0 && (
            <div>
              <p className="text-2xl font-bold text-white">{mod.quiz.length}</p>
              <p className="text-xs text-slate-500">questions de quiz</p>
            </div>
          )}
        </div>

        <div className="h-px bg-accent/20 mb-4" />
        <p className="text-xs text-slate-500">Délivré le {issueDate}</p>
        <p className="text-xs text-slate-600 mt-1 font-mono break-all">{certId}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href={linkedInUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077B5] hover:bg-[#005f8f] text-white text-sm font-semibold transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Ajouter à mon profil LinkedIn
        </a>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: `Certificat — ${mod.title}`, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Lien copié dans le presse-papier !");
            }
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink-800 border border-ink-700 text-slate-300 text-sm font-semibold hover:border-accent/40 hover:text-white transition-colors"
        >
          🔗 Partager le lien
        </button>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink-800 border border-ink-700 text-slate-300 text-sm font-semibold hover:border-accent/40 hover:text-white transition-colors"
        >
          🖨️ Imprimer / PDF
        </button>
      </div>

      <p className="text-xs text-slate-600 text-center mt-4">
        Ce certificat est vérifiable via son URL unique. Il atteste de la complétion du module sur CodeGraft Academy.
      </p>
    </div>
  );
}
