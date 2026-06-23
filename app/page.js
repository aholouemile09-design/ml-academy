import Link from "next/link";
import Image from "next/image";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM, PMP_LEVELS } from "@/lib/pmp";
import { NeuralNetworkIllustration, WebDevIllustration } from "@/components/Illustrations";
import ProfileWidget from "@/components/ProfileWidget";

const features = [
  { icon: "🗺", title: "Trois parcours complets", desc: "ML/Data Science (9 modules), Web Full Stack (6 modules) et préparation PMP (8 modules). Complémentaires et progressifs." },
  { icon: "🤖", title: "Tuteur AI personnel", desc: "Expert ML et web disponible 24/7. Mode simulé sans clé API, mode Claude complet avec votre clé Anthropic." },
  { icon: "📅", title: "Calendrier de discipline", desc: "Plan 2026-2031 avec rythme réaliste (7-9h/semaine), tracker mensuel et roadmap 5 ans." },
  { icon: "📚", title: "Bibliothèque de ressources", desc: "41 ressources vérifiées, gratuites et légales — documentation officielle, livres open-access, cours reconnus." },
  { icon: "✅", title: "Quiz et validation", desc: "Chaque module se valide par un quiz corrigé. On n'avance que sur des bases solides." },
  { icon: "🏅", title: "Certifications guidées", desc: "Ordre réaliste des certifications — chaque cert suit une pratique concrète, pas l'inverse." },
  { icon: "🛠", title: "Projets de portfolio", desc: "15 projets guidés (6 débutant, 5 intermédiaire, 4 avancé) pour un GitHub solide et crédible." },
  { icon: "📊", title: "Suivi de progression", desc: "XP, niveaux, badges et dashboard. Ta progression est sauvegardée dans ton navigateur." },
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

const ML_MODULES = CURRICULUM.slice(0, 5);
const WEB_MODULES = WEB_CURRICULUM.slice(0, 4);
const PMP_MODULES = PMP_CURRICULUM.slice(0, 5);

export default function Home() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08),transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-6">
                🚀 École ML + Web Dev avec tuteur AI — plan 2026-2031
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Maîtrisez le <span className="gradient-text">Machine Learning</span>{" "}
                et le <span className="gradient-text">Web Full Stack</span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Un curriculum complet, un tuteur AI expert, un plan de discipline sur 5 ans et une progression visible sur votre GitHub.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/parcours" className="btn-primary text-base px-7 py-3">Parcours ML →</Link>
                <Link href="/webdev" className="btn-secondary text-base px-7 py-3">Parcours Web</Link>
                <Link href="/calendrier" className="btn-secondary text-base px-7 py-3">📅 Mon plan</Link>
              </div>
              {/* Stats */}
              <div className="mt-10 grid grid-cols-4 gap-4 text-center">
                {STATS.map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold gradient-text">{s.val}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image + illustration */}
            <div className="hidden lg:block relative">
              {/* Image photo réelle — ML / data science */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80"
                  alt="Intelligence artificielle et machine learning"
                  width={600}
                  height={420}
                  className="w-full object-cover rounded-3xl"
                  priority
                />
                {/* Overlay gradient pour intégrer dans le design (foncé fixe — ne blanchit pas en mode clair) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-transparent to-accent/10 rounded-3xl" />
                {/* Badge flottant */}
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-2xl bg-ink-900/90 border border-ink-700 backdrop-blur-sm">
                  <p className="text-xs text-slate-400">Alimenté par</p>
                  <p className="text-sm font-bold gradient-text">Claude Opus · Anthropic</p>
                </div>
              </div>
              {/* Petite illustration SVG en surimpression */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-60">
                <NeuralNetworkIllustration className="w-full" />
              </div>
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
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Tout ce qu'il faut pour <span className="gradient-text">progresser comme à l'école</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-5 hover:border-accent/50 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-1 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRACK ML ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">🤖 Track ML & Data Science</h2>
              <Link href="/parcours" className="text-sm text-accent-light hover:underline">Voir tout →</Link>
            </div>
            <div className="space-y-3">
              {ML_MODULES.map((m, i) => (
                <Link
                  key={m.id}
                  href={`/parcours/${m.id}`}
                  className="card p-5 flex items-center gap-4 hover:border-accent/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center text-xl shrink-0">{m.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-500 text-xs font-mono">0{i + 1}</span>
                      <h3 className="font-semibold text-white group-hover:text-accent-light text-sm">{m.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${LEVELS[m.level].badge} ${LEVELS[m.level].color}`}>
                        {LEVELS[m.level].label}
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-600 group-hover:text-accent-light">→</span>
                </Link>
              ))}
              {CURRICULUM.length > ML_MODULES.length && (
                <Link href="/parcours" className="block text-center py-3 text-sm text-slate-500 hover:text-accent-light">
                  + {CURRICULUM.length - ML_MODULES.length} modules supplémentaires →
                </Link>
              )}
            </div>
          </div>

          {/* Image ML / data science */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"
                alt="Data science et visualisation de données"
                width={340}
                height={420}
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-slate-50 font-bold text-sm">Data Science & ML</p>
                <p className="text-slate-200/90 text-xs mt-1">De l'analyse de données aux modèles de production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK WEB ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">🌐 Track Web Full Stack</h2>
              <Link href="/webdev" className="text-sm text-accent-light hover:underline">Voir tout →</Link>
            </div>
            <div className="space-y-3">
              {WEB_MODULES.map((m, i) => (
                <Link
                  key={m.id}
                  href={`/webdev/${m.id}`}
                  className="card p-5 flex items-center gap-4 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center text-xl shrink-0">{m.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-500 text-xs font-mono">Web {i + 1}</span>
                      <h3 className="font-semibold text-white group-hover:text-blue-400 text-sm">{m.title}</h3>
                    </div>
                  </div>
                  <span className="text-slate-600 group-hover:text-blue-400">→</span>
                </Link>
              ))}
              <Link href="/webdev" className="block text-center py-3 text-sm text-slate-500 hover:text-accent-light">
                + {WEB_CURRICULUM.length - WEB_MODULES.length} modules supplémentaires →
              </Link>
            </div>
          </div>

          {/* Image Web Dev */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&q=80"
                  alt="Développement web et code"
                  width={360}
                  height={400}
                  className="w-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-slate-50 font-bold text-sm">Web Full Stack</p>
                  <p className="text-slate-200/90 text-xs mt-1">React, Next.js, API, déploiement</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 w-24 h-24 opacity-50">
                <WebDevIllustration className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK PMP ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">📋 Parcours PMP — Gestion de projet</h2>
              <Link href="/pmp" className="text-sm text-accent-light hover:underline">Voir tout →</Link>
            </div>
            <div className="space-y-3">
              {PMP_MODULES.map((m, i) => (
                <Link
                  key={m.id}
                  href={`/pmp/${m.id}`}
                  className="card p-5 flex items-center gap-4 hover:border-accent/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-ink-800 flex items-center justify-center text-xl shrink-0">{m.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-500 text-xs font-mono">PMP {i + 1}</span>
                      <h3 className="font-semibold text-white group-hover:text-accent-light text-sm">{m.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${PMP_LEVELS[m.level].badge} ${PMP_LEVELS[m.level].color}`}>
                        {PMP_LEVELS[m.level].label}
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-600 group-hover:text-accent-light">→</span>
                </Link>
              ))}
              <Link href="/pmp" className="block text-center py-3 text-sm text-slate-500 hover:text-accent-light">
                + {PMP_CURRICULUM.length - PMP_MODULES.length} modules supplémentaires →
              </Link>
            </div>
          </div>

          {/* Carte highlight PMP */}
          <div className="hidden lg:block">
            <div className="card p-6 bg-accent/5 border-accent/20">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-bold text-white mb-2">Certification PMP — examen 2026</h3>
              <p className="text-sm text-slate-400 mb-4">
                Prépare le Project Management Professional du PMI (PMBOK 8) : 180 questions, 240 min, domaines People · Process · Business.
              </p>
              <div className="space-y-2 text-xs text-slate-400">
                <div>→ 8 modules · 33 leçons · quiz par module</div>
                <div>→ Agile, hybride et prédictif</div>
                <div>→ Examen blanc chronométré</div>
                <div>→ 8 à 12 semaines de préparation</div>
              </div>
              <Link href="/pmp/examen-blanc" className="btn-secondary text-sm mt-5 w-full justify-center">
                🎯 Tester avec l'examen blanc
              </Link>
            </div>
          </div>
        </div>
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="card p-10 text-center bg-gradient-to-b from-accent/5 to-transparent border-accent/20">
          <h2 className="text-2xl font-bold text-white mb-3">Prêt à commencer ?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Consulte ton calendrier de discipline, choisis ton premier module et commence à construire des preuves sur GitHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calendrier" className="btn-primary">Voir mon plan 2026-2031</Link>
            <Link href="/tuteur" className="btn-secondary">Parler au tuteur AI</Link>
            <Link href="/ressources" className="btn-secondary">Bibliothèque de ressources</Link>
          </div>
        </div>
      </section>
    </div>
  );
}