"use client";
import Link from "next/link";
import { CertificationIllustration } from "@/components/Illustrations";
import { CERT_PREP } from "@/lib/certPrep";

const CERTIFICATIONS = [
  {
    id: "c1",
    title: "Kaggle Python Certificate",
    provider: "Kaggle (Google)",
    when: "Août 2026",
    condition: "Après avoir terminé les exercices Python + un mini-projet CLI",
    cost: "Gratuit",
    url: "https://www.kaggle.com/learn/python",
    priority: "A",
    color: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/5",
    icon: "🏅",
    why: "Validation rapide et pratique. Faible pression, reconnu par les recruteurs tech.",
  },
  {
    id: "c2",
    title: "Kaggle Pandas Certificate",
    provider: "Kaggle (Google)",
    when: "Nov 2026",
    condition: "Après le bloc NumPy/Pandas/EDA",
    cost: "Gratuit",
    url: "https://www.kaggle.com/learn/pandas",
    priority: "A",
    color: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/5",
    icon: "🏅",
    why: "Concrétise les compétences data. Gratuit et rapide.",
  },
  {
    id: "c3",
    title: "Kaggle Intro to Machine Learning",
    provider: "Kaggle (Google)",
    when: "Jan 2027",
    condition: "Après le bloc ML classique + premier projet portfolio",
    cost: "Gratuit",
    url: "https://www.kaggle.com/learn/intro-to-machine-learning",
    priority: "A",
    color: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/5",
    icon: "🏅",
    why: "Montre une progression concrète sur le ML.",
  },
  {
    id: "c4",
    title: "IBM Data Science Professional Certificate",
    provider: "IBM / Coursera",
    when: "Mars–Mai 2027",
    condition: "Après avoir un repo data/ML publié sur GitHub",
    cost: "~50 USD/mois (auditable gratuitement)",
    url: "https://www.coursera.org/professional-certificates/ibm-data-science",
    priority: "B",
    color: "text-amber-400",
    badge: "border-amber-500/30 bg-amber-500/5",
    icon: "🎓",
    why: "Structure générale Data Science reconnu par les employeurs. Pas prioritaire sur les projets — à faire si en avance.",
  },
  {
    id: "c5",
    title: "DeepLearning.AI — ML in Production (MLOps)",
    provider: "DeepLearning.AI / Coursera",
    when: "Juin–Juil 2027",
    condition: "Après avoir une API ML locale fonctionnelle",
    cost: "Auditable gratuitement sur Coursera",
    url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-mlops/",
    priority: "A",
    color: "text-amber-400",
    badge: "border-amber-500/30 bg-amber-500/5",
    icon: "🎓",
    why: "Correspond précisément au rôle ML Engineer. À faire après la pratique MLOps, pas avant.",
  },
  {
    id: "c6",
    title: "AWS Cloud Practitioner (CLF-C02)",
    provider: "Amazon Web Services",
    when: "Août 2027",
    condition: "Après avoir déployé au moins une application sur AWS",
    cost: "~100 USD (exam) — préparation gratuite AWS Skill Builder",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    priority: "A",
    color: "text-amber-400",
    badge: "border-amber-500/30 bg-amber-500/5",
    icon: "☁️",
    why: "La certification devient crédible parce qu'elle suit la pratique. Sans pratique d'abord, elle n'a pas de valeur.",
  },
  {
    id: "c7",
    title: "AWS Solutions Architect Associate (SAA-C03)",
    provider: "Amazon Web Services",
    when: "2028 (après expérience cloud réelle)",
    condition: "Après 1 an de pratique cloud sérieuse",
    cost: "~300 USD",
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    priority: "B",
    color: "text-rose-400",
    badge: "border-rose-500/30 bg-rose-500/5",
    icon: "☁️",
    why: "Certification expérimentée. À reporter — trop lourde pour 2026-2027.",
  },
  {
    id: "c8",
    title: "AWS Professional / Kubernetes / CKA",
    provider: "AWS / CNCF",
    when: "2028-2029",
    condition: "Expérience emploi ou projet production significatif",
    cost: "Variés",
    url: "https://aws.amazon.com/certification/",
    priority: "C",
    color: "text-slate-400",
    badge: "border-slate-600/30 bg-slate-600/5",
    icon: "🏗",
    why: "À reporter. Trop lourd avant Docker + API + AWS de base.",
  },
];

const priorityColors = {
  A: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  B: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  C: "text-slate-400 border-slate-600/40 bg-slate-600/10",
};

export default function Certifications() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-6 mb-6">
        <div className="hidden sm:block">
          <CertificationIllustration className="w-40 h-28 opacity-90" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Certifications</h1>
          <p className="text-slate-400">
            Ordre réaliste issu de ton plan — la certification vaut quelque chose parce qu'elle suit la pratique, pas l'inverse.
          </p>
        </div>
      </div>
      <div className="flex gap-3 mb-10 flex-wrap text-sm">
        <span className="px-3 py-1 rounded-full border text-emerald-400 border-emerald-500/30 bg-emerald-500/5">Priorité A — Obligatoire 2026-2027</span>
        <span className="px-3 py-1 rounded-full border text-amber-400 border-amber-500/30 bg-amber-500/5">Priorité B — Si en avance</span>
        <span className="px-3 py-1 rounded-full border text-slate-400 border-slate-600/30 bg-slate-600/5">Priorité C — 2028+</span>
      </div>

      <div className="space-y-5">
        {CERTIFICATIONS.map((c, i) => (
          <div key={c.id} className={`card p-6 border ${c.badge}`}>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{c.icon}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${priorityColors[c.priority]}`}>
                  {c.priority}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h2 className="font-bold text-white">{c.title}</h2>
                </div>
                <p className="text-sm text-accent-light mb-3">{c.provider}</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">📅 Quand : </span>
                    <span className={`font-semibold ${c.color}`}>{c.when}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">💰 Coût : </span>
                    <span className="text-slate-300">{c.cost}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-slate-500">✅ Condition : </span>
                  <span className="text-slate-300">{c.condition}</span>
                </div>
                <div className="mt-2 text-sm text-slate-400 italic">
                  💡 {c.why}
                </div>
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent-light hover:underline"
                  >
                    Voir la certification →
                  </a>
                  {CERT_PREP[c.id] && (
                    <Link
                      href={`/certifications/prep/${c.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent/10 border border-accent/30 text-accent-light text-sm font-semibold hover:bg-accent/20 transition-colors"
                    >
                      🎯 Se préparer
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 card p-6 bg-accent/5 border-accent/20">
        <h3 className="font-bold text-white mb-2">📌 Règle d'or</h3>
        <p className="text-sm text-slate-400">
          <strong className="text-white">Projets d'abord, certifications ensuite.</strong> Un recruteur ML Engineer junior regarde d'abord ton GitHub. La certification confirme une pratique existante — elle ne la remplace pas. Chaque certification de cette liste correspond à une compétence que tu auras déjà exercée sur un vrai projet.
        </p>
      </div>
    </div>
  );
}
