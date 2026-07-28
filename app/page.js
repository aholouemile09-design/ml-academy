import Link from "next/link";
import Image from "next/image";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";
import ProfileWidget from "@/components/ProfileWidget";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroPreview from "@/components/HeroPreview";
import TrackTabs from "@/components/TrackTabs";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

// Grille bento : les tailles encodent l'importance. `span` = classes de grille.
const features = [
  {
    icon: "🤖", title: "Tuteur AI personnel", span: "lg:col-span-2 lg:row-span-2", featured: true,
    desc: "Un expert disponible 24/7 qui connaît la leçon que tu consultes. Il explique, décortique tes erreurs, propose des pistes — mais ne fera jamais tes projets à ta place.",
  },
  {
    icon: "🧪", title: "Problem sets notés", span: "lg:col-span-2",
    desc: "Une évaluation pratique sur 100 par module, avec sa grille de notation, ancrée dans un cas réel — scoring crédit, détection de fraude, imagerie médicale.",
  },
  {
    icon: "🗺", title: "Trois parcours", span: "",
    desc: "ML & Data Science, Web Full Stack et préparation PMP 2026.",
  },
  {
    icon: "🛠", title: "27 projets portfolio", span: "",
    desc: "Guidés, de débutant à expert, pour un GitHub crédible.",
  },
  {
    icon: "📖", title: "Lectures de référence", span: "lg:col-span-2",
    desc: "Une sélection par module, gratuites signalées comme telles — MIT, Stanford, Hugging Face — avec la raison précise de chaque recommandation.",
  },
  {
    icon: "🔥", title: "Streak & régularité", span: "",
    desc: "Ta constance mesurée jour après jour.",
  },
  {
    icon: "🎓", title: "Certificats vérifiables", span: "",
    desc: "Partageables sur LinkedIn, adossés à tes projets.",
  },
];

// Stats bar
const STATS = [
  { val: "9", label: "modules ML" },
  { val: "6", label: "modules Web" },
  { val: "15", label: "projets portfolio" },
  { val: "5 ans", label: "plan structuré" },
];

// Témoignages / citations motivantes
const QUOTES = [
  { text: "L'intelligence artificielle est la nouvelle électricité.", author: "Andrew Ng, co-fondateur de Coursera" },
  { text: "Les données sont le pétrole du 21e siècle, et l'analytics en est le moteur à combustion.", author: "Peter Sondergaard, Gartner" },
  { text: "Le machine learning, c'est l'avenir. Celui qui ne l'apprend pas aujourd'hui sera dépassé demain.", author: "CodeGraft Academy" },
];

// Données des onglets de parcours.
const TRACKS = [
  {
    id: "ml",
    icon: "🤖",
    label: "ML & Data",
    title: "Machine Learning & Data Science",
    basePath: "/parcours",
    pitch:
      "De Python aux modèles en production : statistiques, ML classique, deep learning, NLP et MLOps.",
    highlights: [
      "Problem sets ancrés dans des cas réels",
      "XGBoost, PyTorch, transformers, MLflow",
      "Éthique et équité algorithmique incluses",
      "Livres MIT et Stanford, gratuits",
    ],
    total: CURRICULUM.length,
    modules: CURRICULUM.slice(0, 5),
  },
  {
    id: "web",
    icon: "🌐",
    label: "Web Full Stack",
    title: "Développement Web Full Stack",
    basePath: "/webdev",
    pitch:
      "Du HTML sémantique au déploiement supervisé, en passant par React, les bases de données et la sécurité.",
    highlights: [
      "Bases de données avant le backend",
      "TypeScript strict et validation Zod",
      "Revue OWASP Top 10 obligatoire",
      "CI/CD, supervision et post-mortem",
    ],
    total: WEB_CURRICULUM.length,
    modules: WEB_CURRICULUM.slice(0, 5),
  },
  {
    id: "pmp",
    icon: "📋",
    label: "PMP 2026",
    title: "Certification PMP — examen 2026",
    basePath: "/pmp",
    pitch:
      "Préparation complète au Project Management Professional du PMI : People, Process et Business Environment.",
    highlights: [
      "Aligné sur l'ECO 2026 officiel",
      "Prédictif, agile et hybride",
      "Calculs EVM et analyse de risques",
      "Examen blanc chronométré de 180 questions",
    ],
    total: PMP_CURRICULUM.length,
    modules: PMP_CURRICULUM.slice(0, 5),
  },
];

export default function Home() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Fond aurora animé + grille en perspective */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="aurora-bg animate-aurora"
            style={{ background: "radial-gradient(ellipse 50% 45% at 20% 15%, rgb(var(--accent) / 0.42), transparent 70%)" }}
          />
          <div
            className="aurora-bg animate-aurora"
            style={{
              background: "radial-gradient(ellipse 45% 40% at 80% 70%, rgb(var(--accent-2) / 0.36), transparent 70%)",
              animationDelay: "-6s",
            }}
          />
          <div
            className="aurora-bg animate-aurora"
            style={{
              background: "radial-gradient(ellipse 40% 35% at 60% 20%, rgb(var(--accent-light) / 0.22), transparent 70%)",
              animationDelay: "-12s",
            }}
          />
          <div className="grid-backdrop" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-accent-light text-xs font-semibold mb-6 animate-fade-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                École ML + Web Dev avec tuteur AI — plan 2026-2031
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight animate-fade-up delay-75">
                Maîtrisez le <span className="gradient-text">Machine Learning</span>{" "}
                et le <span className="gradient-text">Web Full Stack</span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed animate-fade-up delay-150">
                Un curriculum complet, un tuteur AI expert, un plan de discipline sur 5 ans et une progression visible sur votre GitHub.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-up delay-225">
                <Link href="/parcours" className="btn-primary text-base px-7 py-3">Parcours ML →</Link>
                <Link href="/webdev" className="btn-secondary text-base px-7 py-3">Parcours Web</Link>
                <Link href="/calendrier" className="btn-secondary text-base px-7 py-3">📅 Mon plan</Link>
              </div>
              {/* Stats */}
              <div className="mt-10 grid grid-cols-4 gap-4 text-center animate-fade-up delay-300">
                {STATS.map(s => (
                  <div key={s.label}>
                    <AnimatedCounter
                      value={s.val}
                      className="block text-3xl font-extrabold gradient-text stat-value"
                    />
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aperçu produit : l'interface réelle, pas une photo d'illustration */}
            <div className="hidden lg:block animate-scale-in delay-150">
              <HeroPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFIL WIDGET ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
        <ProfileWidget />
      </section>

      {/* ── CITATION ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-2xl border border-accent/20 bg-accent/5 px-8 py-6 flex gap-6 items-start">
          <span className="text-4xl shrink-0">💡</span>
          <div>
            <p className="text-lg font-medium text-white italic">"{QUOTES[0].text}"</p>
            <p className="text-sm text-slate-500 mt-2">— {QUOTES[0].author}</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal as="h2" className="text-3xl font-bold text-white text-center mb-12">
          Tout ce qu'il faut pour <span className="gradient-text">progresser comme à l'école</span>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(150px,auto)]">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 70}
              className={`card card-hover p-6 flex flex-col ${f.span} ${
                f.featured ? "gradient-border justify-center" : ""
              }`}
            >
              <div className={f.featured ? "text-5xl mb-4" : "text-3xl mb-3"}>{f.icon}</div>
              <h3 className={`font-bold text-white mb-2 ${f.featured ? "text-xl" : "text-sm"}`}>
                {f.title}
              </h3>
              <p className={`text-slate-400 leading-relaxed ${f.featured ? "text-sm" : "text-xs"}`}>
                {f.desc}
              </p>
              {f.featured && (
                <Link
                  href="/tuteur"
                  className="mt-5 text-sm text-accent-light font-semibold link-underline w-fit"
                >
                  Parler au tuteur →
                </Link>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">
            Comment <span className="gradient-text">ça marche</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Le même déroulé que dans une université : objectifs, cours, évaluation, certification.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <HowItWorks />
        </Reveal>
      </section>

      {/* ── LES TROIS PARCOURS (onglets) ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Trois <span className="gradient-text">parcours complets</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Complémentaires et progressifs. Choisis ton point d'entrée.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <TrackTabs tracks={TRACKS} />
        </Reveal>
      </section>
      {/* ── SECTION IMAGE LARGE — ENVIRONNEMENT ──────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80"
            alt="Espace de travail d'un développeur — objectif ML Engineer"
            width={1200}
            height={400}
            className="w-full object-cover h-64 sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-12">
            <div className="max-w-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]">
              <p className="text-accent-light text-sm font-semibold mb-2">Votre objectif</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-50 leading-tight mb-4">
                De zéro à <span className="gradient-text">ML Engineer</span> en 5 ans
              </h2>
              <p className="text-slate-200/90 text-sm mb-5">
                Pas de raccourcis. Un plan solide, des projets réels sur GitHub, et un tuteur AI disponible à toute heure.
              </p>
              <Link href="/calendrier" className="btn-primary">Voir le plan complet →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <FAQ />
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <Reveal className="card gradient-border p-10 text-center bg-gradient-to-b from-accent/5 to-transparent border-accent/20">
          <h2 className="text-2xl font-bold text-white mb-3">Prêt à commencer ?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Consulte ton calendrier de discipline, choisis ton premier module et commence à construire des preuves sur GitHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calendrier" className="btn-primary">Voir mon plan 2026-2031</Link>
            <Link href="/tuteur" className="btn-secondary">Parler au tuteur AI</Link>
            <Link href="/ressources" className="btn-secondary">Bibliothèque de ressources</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}