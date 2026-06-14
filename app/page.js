import Link from "next/link";
import { CURRICULUM, LEVELS } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { NeuralNetworkIllustration, WebDevIllustration, DashboardIllustration } from "@/components/Illustrations";

const features = [
  { icon: "🗺", title: "Deux parcours complets", desc: "Track ML/Data Science (9 modules) + Track Web Full Stack (6 modules). Complémentaires et progressifs." },
  { icon: "🤖", title: "Tuteur AI personnel", desc: "Expert ML et web disponible 24/7. Mode simulé sans clé API, mode Claude complet avec votre clé Anthropic." },
  { icon: "📅", title: "Calendrier de discipline", desc: "Plan 2026-2031 avec rythme réaliste (7-9h/semaine), tracker mensuel et roadmap 5 ans." },
  { icon: "📚", title: "Bibliothèque de ressources", desc: "41 ressources vérifiées, gratuites et légales — documentation officielle, livres open-access, cours reconnus." },
  { icon: "✅", title: "Quiz et validation", desc: "Chaque module se valide par un quiz corrigé. On n'avance que sur des bases solides." },
  { icon: "🏅", title: "Certifications guidées", desc: "Ordre réaliste des certifications — chaque cert suit une pratique concrète, pas l'inverse." },
  { icon: "🛠", title: "Projets de portfolio", desc: "8 projets guidés ML + 6 projets web pour un GitHub solide et crédible." },
  { icon: "📊", title: "Suivi de progression", desc: "XP, niveaux, badges et dashboard. Ta progression est sauvegardée dans ton navigateur." },
];

const ML_MODULES = CURRICULUM.slice(0, 5);
const WEB_MODULES = WEB_CURRICULUM.slice(0, 4);

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
              <div className="mt-10 grid grid-cols-4 gap-4 text-center">
                {[
                  { val: `${CURRICULUM.length}`, label: "modules ML" },
                  { val: `${WEB_CURRICULUM.length}`, label: "modules Web" },
                  { val: `${CURRICULUM.reduce((a, m) => a + m.lessons.length, 0) + WEB_CURRICULUM.reduce((a, m) => a + m.lessons.length, 0)}`, label: "leçons" },
                  { val: "5 ans", label: "plan structuré" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold gradient-text">{s.val}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-accent/5 blur-2xl" />
                <NeuralNetworkIllustration className="w-full max-w-md relative" />
              </div>
            </div>
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
          {/* Web illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-xl" />
              <WebDevIllustration className="w-full max-w-sm relative opacity-90" />
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
