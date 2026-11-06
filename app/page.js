import Link from "next/link";
import Image from "next/image";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";
import ProfileWidget from "@/components/ProfileWidget";
import Reveal from "@/components/Reveal";
import HeroPreview from "@/components/HeroPreview";
import TrackTabs from "@/components/TrackTabs";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

// Grille bento : les tailles encodent l'importance. `span` = classes de grille.
const features = [
  {
    title: "Tuteur AI personnel", span: "lg:col-span-2 lg:row-span-2", featured: true,
    desc: "Un expert disponible 24/7 qui connaît la leçon que tu consultes. Il explique, décortique tes erreurs, propose des pistes — mais ne fera jamais tes projets à ta place.",
  },
  {
    title: "Problem sets notés", span: "lg:col-span-2",
    desc: "Une évaluation pratique sur 100 par module, avec sa grille de notation, ancrée dans un cas réel — scoring crédit, détection de fraude, imagerie médicale.",
  },
  {
    title: "Trois parcours", span: "",
    desc: "ML & Data Science, Web Full Stack et préparation PMP 2026.",
  },
  {
    title: "27 projets portfolio", span: "",
    desc: "Guidés, de débutant à expert, pour un GitHub crédible.",
  },
  {
    title: "Lectures de référence", span: "lg:col-span-2",
    desc: "Une sélection par module, gratuites signalées comme telles — MIT, Stanford, Hugging Face — avec la raison précise de chaque recommandation.",
  },
  {
    title: "Streak & régularité", span: "",
    desc: "Ta constance mesurée jour après jour.",
  },
  {
    title: "Certificats vérifiables", span: "",
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
    image: "photo-1551288049-bebda4e38f71",
    imageAlt: "Courbes de performance d'un modèle sur l'écran d'un ordinateur portable",
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
    image: "photo-1674483699209-25fb6d962119",
    imageAlt: "Développeur devant deux écrans, en train d'écrire du code",
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
    image: "photo-1557804506-669a67965ba0",
    imageAlt: "Équipe projet réunie autour d'un tableau blanc, ordinateurs ouverts",
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
      {/* Pas de fond décoratif : les trois halos « aurora » et la grille en
          perspective coloraient la page sans rien dire. Ce qui tient le haut
          de page, c'est la grille de 12 colonnes et le blanc, pas un effet. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 items-end">
          {/* Le texte occupe 7 colonnes sur 12, l'aperçu les 5 suivantes :
              le déséquilibre est ce qui donne sa tension à la composition. */}
          <div className="lg:col-span-7">
            <p className="eyebrow animate-fade-up">École ML &amp; Web · plan 2026–2031</p>
            {/* text-wrap:balance — sans lui, « Apprendre le machine learning »
                se coupait en laissant « learning » seul sur sa ligne. */}
            <h1 className="mt-4 text-[2.75rem] sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] [text-wrap:balance] animate-fade-up delay-75">
              Apprendre le machine learning
              <br />
              <span className="text-slate-500">comme un métier, pas comme un cours.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed animate-fade-up delay-150">
              Un curriculum complet, un tuteur AI qui connaît la leçon que tu lis,
              et une progression visible sur ton GitHub.
            </p>
            {/* Deux actions, pas trois : un troisième bouton de même poids
                transforme un choix en hésitation. */}
            <div className="mt-9 flex flex-wrap gap-3 animate-fade-up delay-225">
              <Link href="/parcours" className="btn-primary text-base px-7 py-3">Commencer le parcours ML →</Link>
              <Link href="/webdev" className="btn-secondary text-base px-7 py-3">Voir le parcours Web</Link>
            </div>
          </div>

          {/* Aperçu produit : l'interface réelle, pas une photo d'illustration */}
          <div className="hidden lg:block lg:col-span-5 animate-fade-up delay-150">
            <HeroPreview />
          </div>
        </div>

        {/* Les chiffres posés sur un filet, en bas de page : des nombres nus et
            leur légende, sans carte ni icône autour. */}
        <div className="mt-16 border-t border-ink-700 grid grid-cols-2 sm:grid-cols-4 animate-fade-up delay-300">
          {STATS.map(s => (
            <div key={s.label} className="py-6 sm:border-r border-ink-700 last:border-r-0 pr-6">
              {/* Chiffres rendus directement : le comptage animé affichait
                  « 1 module ML, 0 modules Web » pendant 1,4 s à chaque
                  visite — une information fausse, pour décorer. */}
              <span className="block text-4xl font-extrabold text-white stat-value">
                {s.val}
              </span>
              {/* `!` : .eyebrow est déclarée après les utilitaires Tailwind et
                  gagnerait sinon sur la couleur. La légende reste grise. */}
              <div className="eyebrow mt-2 !text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROFIL WIDGET ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-4">
        <ProfileWidget />
      </section>

      {/* ── CITATION ─────────────────────────────────────────────────────── */}
      {/* Bandeau pleine largeur, d'un cran plus clair que la page. Sur un fond
          déjà presque noir, c'est l'inverse du bandeau vert foncé de la
          maquette qui produit la même respiration : une bande qui tranche. */}
      <section className="bg-ink-900 border-y border-ink-700 my-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-3xl">
            <p className="text-2xl sm:text-3xl font-medium text-white leading-snug tracking-tight">
              « {QUOTES[0].text} »
            </p>
            <p className="eyebrow mt-5 !text-slate-500">{QUOTES[0].author}</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="mb-12">
          <p className="eyebrow">Ce que contient la plateforme</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tout ce qu'il faut pour progresser comme à l'école
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(150px,auto)]">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 70}
              className={`card card-hover p-6 flex flex-col ${f.span} ${
                f.featured ? "justify-center" : ""
              }`}
            >
              {/* Index en mono plutôt qu'un emoji par carte : sept pictogrammes
                  décoratifs ne hiérarchisent rien et donnent à la grille son
                  air de gabarit générique. Le numéro, lui, ordonne. */}
              <div className="eyebrow mb-4">{String(i + 1).padStart(2, "0")}</div>
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
        <Reveal className="mb-14">
          <p className="eyebrow">Le déroulé</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">Comment ça marche</h2>
          <p className="mt-4 text-slate-400 max-w-xl">
            Le même déroulé que dans une université : objectifs, cours, évaluation, certification.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <HowItWorks />
        </Reveal>
      </section>

      {/* ── LES TROIS PARCOURS (onglets) ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="mb-10">
          <p className="eyebrow">Pour qui</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">Trois parcours complets</h2>
          <p className="mt-4 text-slate-400 max-w-xl">
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
          {/* Le voile est noir en dur, jamais ink-950 : ce jeton devient BLANC
              en thème clair, et le voile effaçait alors le texte au lieu de le
              détacher de la photo. Les couleurs de ce bloc sont fixes pour la
              même raison — elles se lisent sur une photo, pas sur la page. */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-12">
            <div className="max-w-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]">
              <p className="eyebrow mb-2 !text-[#E8845C]">Ton objectif</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] leading-tight mb-4">
                De zéro à ML Engineer en 5 ans
              </h2>
              <p className="text-[#E5E5E5] text-sm mb-5">
                Pas de raccourcis. Un plan solide, des projets réels sur GitHub, et un tuteur AI disponible à toute heure.
              </p>
              <Link href="/calendrier" className="btn-primary">Voir le plan complet →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal className="mb-12">
          <p className="eyebrow">Avant de commencer</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">Questions fréquentes</h2>
        </Reveal>
        <Reveal delay={100}>
          <FAQ />
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink-900 border-t border-ink-700">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Prêt à commencer ?
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Choisis ton premier module et commence à construire des preuves sur GitHub.
          </p>
          {/* Deux actions : « Bibliothèque de ressources » n'est pas une fin de
              page, c'est une page du menu. La proposer ici diluait la seule
              chose qu'on demande vraiment. */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/calendrier" className="btn-primary text-base px-7 py-3">Voir mon plan 2026-2031</Link>
            <Link href="/tuteur" className="btn-secondary text-base px-7 py-3">Parler au tuteur AI</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}