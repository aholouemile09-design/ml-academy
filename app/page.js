import Link from "next/link";
import Image from "next/image";
import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";
import ProfileWidget from "@/components/ProfileWidget";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

const compter = (curriculum) => ({
  modules: curriculum.length,
  lecons: curriculum.reduce((total, m) => total + m.lessons.length, 0),
});

/* Les trois formations. Les chiffres sont comptés sur le curriculum réel : une
   durée en heures serait inventée, et c'est précisément le genre de promesse
   qu'on ne peut pas tenir. */
const FORMATIONS = [
  {
    href: "/parcours",
    domaine: "Machine learning & data",
    titre: "Machine learning et data science",
    resume:
      "De Python aux modèles en production : statistiques, ML classique, deep learning, NLP et MLOps.",
    niveau: "Débutant à avancé",
    image: "photo-1551288049-bebda4e38f71",
    alt: "Courbes de performance d'un modèle sur l'écran d'un ordinateur portable",
    ...compter(CURRICULUM),
  },
  {
    href: "/webdev",
    domaine: "Développement web",
    titre: "Développeur web full-stack",
    resume:
      "Du HTML sémantique au déploiement supervisé, en passant par React, les bases de données et la sécurité.",
    niveau: "Débutant accepté",
    image: "photo-1674483699209-25fb6d962119",
    alt: "Développeur devant deux écrans, en train d'écrire du code",
    ...compter(WEB_CURRICULUM),
  },
  {
    href: "/pmp",
    domaine: "Gestion de projet",
    titre: "Certification PMP — examen 2026",
    resume:
      "People, Process et Business Environment, prédictif et agile, avec un examen blanc de 180 questions.",
    niveau: "Niveau intermédiaire",
    image: "photo-1557804506-669a67965ba0",
    alt: "Équipe projet réunie autour d'un tableau blanc, ordinateurs ouverts",
    ...compter(PMP_CURRICULUM),
  },
];

/* Icônes au trait, déclarées une fois et appelées par les cartes. Trois
   pictogrammes de 16 px : les redéclarer dans chaque carte ferait trois fois
   le même SVG dans le balisage. */
const Trait = (props) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    {...props}
  />
);
const IconeModules = () => (
  <Trait><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /></Trait>
);
const IconeLecons = () => (
  <Trait><path d="M4 5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M14 3v6h6" /></Trait>
);
const IconeNiveau = () => (
  <Trait><path d="M4 20V11M10 20V4M16 20v-6M22 20H2" /></Trait>
);

const VALEURS = [
  {
    titre: "Des formations entières",
    texte:
      "Pas une collection de tutoriels : un chemin du premier module à l'évaluation finale.",
    icone: <path d="M12 3 2 8l10 5 10-5-10-5Z M2 14l10 5 10-5" />,
  },
  {
    titre: "On vérifie que vous avez compris",
    texte:
      "Deux exercices par leçon, un quiz par module, et des cartes de révision qui reviennent au bon moment.",
    icone: <path d="m9 11 3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
  {
    titre: "À votre rythme",
    texte:
      "Votre progression est enregistrée. Vous reprenez exactement là où vous vous êtes arrêté.",
    icone: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  },
];

export default function Home() {
  return (
    <div>
      {/* ── HÉROS ────────────────────────────────────────────────────────── */}
      <section className="bg-ink-900 border-b border-ink-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1] [text-wrap:balance]">
              Devenez opérationnel en machine learning, en développement web ou
              en gestion de projet.
            </h1>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-xl">
              Trois formations complètes, structurées en modules, avec exercices
              corrigés, quiz et révisions espacées. À votre rythme, du premier
              cours à l'évaluation finale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#formations" className="btn-primary text-base px-7 py-3">
                Découvrir les formations
              </Link>
              <Link href="/tuteur" className="btn-secondary text-base px-7 py-3">
                Parler au tuteur AI
              </Link>
            </div>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&q=75"
            alt="Poste de travail avec un ordinateur portable et des notes"
            width={1000}
            height={750}
            className="hidden lg:block w-full rounded-2xl object-cover aspect-[4/3]"
            priority
          />
        </div>
      </section>

      {/* ── CE QUE VOUS Y TROUVEZ ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-3 gap-8">
          {VALEURS.map((v) => (
            <div key={v.titre} className="flex gap-3.5">
              <svg
                width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                className="shrink-0 text-accent-light mt-0.5" aria-hidden="true"
              >
                {v.icone}
              </svg>
              <div>
                <h3 className="font-bold text-white mb-1">{v.titre}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.texte}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LES FORMATIONS ───────────────────────────────────────────────── */}
      <section id="formations" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Nos formations</h2>
          <p className="mt-2 text-slate-400">
            Trois parcours complets, chacun mené jusqu'à son évaluation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FORMATIONS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="card overflow-hidden flex flex-col hover:border-accent transition-colors"
            >
              <Image
                src={`https://images.unsplash.com/${f.image}?w=600&q=70`}
                alt={f.alt}
                width={600}
                height={338}
                className="w-full aspect-video object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent-light mb-2">
                  {f.domaine}
                </p>
                <h3 className="text-lg font-bold text-white leading-snug">{f.titre}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.resume}</p>

                <div className="mt-4 pt-4 border-t border-ink-700 flex flex-col gap-2 text-sm text-slate-500">
                  <span className="flex items-center gap-2.5"><IconeModules /> {f.modules} modules</span>
                  <span className="flex items-center gap-2.5"><IconeLecons /> {f.lecons} leçons</span>
                  <span className="flex items-center gap-2.5"><IconeNiveau /> {f.niveau}</span>
                </div>

                <span className="mt-4 text-sm font-semibold text-accent-light">
                  Voir la formation →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PROGRESSION DE L'UTILISATEUR ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <ProfileWidget />
      </section>

      {/* ── COMMENT ÇA MARCHE ────────────────────────────────────────────── */}
      <section className="bg-ink-900 border-y border-ink-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-10">
            Comment ça marche
          </h2>
          <HowItWorks />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-8">
          Questions fréquentes
        </h2>
        <FAQ />
      </section>

      {/* ── APPEL À L'ACTION ─────────────────────────────────────────────── */}
      <section className="bg-accent">
        {/* Couleurs en dur et non `text-white` : ce jeton est réécrit en
            presque noir par le thème clair, ce qui effacerait le texte sur
            l'aplat bleu. Ici le fond ne change pas avec le thème, le texte
            non plus. */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
            Commencez aujourd'hui
          </h2>
          <p className="mt-3 text-[#DBE6FD] max-w-lg mx-auto">
            Choisissez votre formation et ouvrez la première leçon dans la minute.
          </p>
          <Link
            href="/parcours"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 text-base font-semibold text-accent hover:bg-slate-100 transition-colors"
          >
            Commencer le parcours ML
          </Link>
        </div>
      </section>
    </div>
  );
}
