import Link from "next/link";
import Image from "next/image";
import { LISTE_FORMATIONS } from "@/lib/formations";
import MetaFormation from "@/components/MetaFormation";
import ProfileWidget from "@/components/ProfileWidget";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

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
          {LISTE_FORMATIONS.map((f) => (
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

                <div className="mt-4 pt-4 border-t border-ink-700">
                  <MetaFormation modules={f.modules} lecons={f.lecons} niveau={f.niveau} />
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
