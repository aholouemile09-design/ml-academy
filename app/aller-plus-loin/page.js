"use client";

import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Structure prête à compléter — les catégories sont là, les contenus viendront
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "competitions",
    icon: "🏆",
    title: "Compétitions & défis",
    color: "border-amber-500/30 bg-amber-500/5",
    titleColor: "text-amber-400",
    description: "Kaggle, DrivenData, Zindi, AI Crowd — mettre ses compétences à l'épreuve contre la communauté mondiale.",
    status: "coming",
    items: [
      { label: "Kaggle Competitions — débutant", url: "https://www.kaggle.com/competitions?hostSegmentIdFilter=5", note: "Titanic, House Prices" },
      { label: "DrivenData — impact social", url: "https://www.drivendata.org/", note: "ML pour la santé, l'environnement" },
      { label: "Zindi — Afrique & marchés émergents", url: "https://zindi.africa/", note: "Défis ML en contexte africain" },
    ],
  },
  {
    id: "recherche",
    icon: "🔬",
    title: "Recherche & papers",
    color: "border-violet-500/30 bg-violet-500/5",
    titleColor: "text-violet-400",
    description: "Les articles de recherche fondateurs en ML/IA — à lire après avoir maîtrisé les bases.",
    status: "coming",
    items: [
      { label: "Attention Is All You Need (Transformers)", url: "https://arxiv.org/abs/1706.03762", note: "Le paper qui a tout changé" },
      { label: "ImageNet Classification (AlexNet)", url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html", note: "Naissance du deep learning moderne" },
      { label: "ArXiv ML — dernières publications", url: "https://arxiv.org/list/cs.LG/recent", note: "Recherche en temps réel" },
      { label: "Papers With Code", url: "https://paperswithcode.com/", note: "Papers + implémentations GitHub" },
    ],
  },
  {
    id: "communaute",
    icon: "👥",
    title: "Communautés & réseaux",
    color: "border-cyan-500/30 bg-cyan-500/5",
    titleColor: "text-cyan-400",
    description: "Rejoindre les bonnes communautés pour apprendre plus vite, trouver un mentor, ou contribuer.",
    status: "coming",
    items: [
      { label: "r/MachineLearning", url: "https://reddit.com/r/MachineLearning", note: "Discussions et actualités" },
      { label: "Discord FastAI", url: "https://discord.gg/fastai", note: "Communauté active de praticiens" },
      { label: "Hugging Face Forums", url: "https://discuss.huggingface.co/", note: "NLP et transformers" },
      { label: "LinkedIn ML Canada", url: "https://linkedin.com", note: "Réseau professionnel ciblé" },
    ],
  },
  {
    id: "carriere",
    icon: "💼",
    title: "Carrière & emploi",
    color: "border-emerald-500/30 bg-emerald-500/5",
    titleColor: "text-emerald-400",
    description: "Stratégies pour trouver son premier poste ML au Canada, préparer les entretiens techniques.",
    status: "coming",
    items: [
      { label: "Interview Query — entretiens ML", url: "https://www.interviewquery.com/", note: "Questions techniques réelles" },
      { label: "Glassdoor Canada — salaires ML", url: "https://www.glassdoor.ca/", note: "Benchmarks salariaux" },
      { label: "LinkedIn Jobs Canada", url: "https://linkedin.com/jobs", note: "Offres ciblées ML Engineer" },
    ],
  },
  {
    id: "lectures",
    icon: "📖",
    title: "Livres avancés",
    color: "border-rose-500/30 bg-rose-500/5",
    titleColor: "text-rose-400",
    description: "Les livres de référence pour aller au-delà des cours — niveau professionnel.",
    status: "coming",
    items: [
      { label: "Deep Learning (Goodfellow)", url: "https://www.deeplearningbook.org/", note: "La bible du deep learning — gratuit en ligne" },
      { label: "Designing ML Systems (Huyen)", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", note: "MLOps et systèmes en production" },
      { label: "The Hundred-Page ML Book", url: "http://themlbook.com/", note: "Dense et pratique" },
    ],
  },
  {
    id: "projets-avances",
    icon: "🚀",
    title: "Projets ambitieux",
    color: "border-indigo-500/30 bg-indigo-500/5",
    titleColor: "text-indigo-400",
    description: "Des idées de projets de niveau senior pour vraiment marquer ton portfolio — à remplir ensemble.",
    status: "à compléter",
    items: [],
    placeholder: "Cette section sera complétée lors de notre prochaine session.",
  },
  {
    id: "specialisations",
    icon: "🎯",
    title: "Spécialisations avancées",
    color: "border-slate-500/30 bg-slate-500/5",
    titleColor: "text-slate-300",
    description: "Robotique, RL, Computer Vision avancée, LLMs — les domaines de spécialisation après les fondations.",
    status: "à compléter",
    items: [],
    placeholder: "À développer après la phase 1 du plan (2027+).",
  },
  {
    id: "contribuer",
    icon: "🌍",
    title: "Contribuer à l'open source",
    color: "border-teal-500/30 bg-teal-500/5",
    titleColor: "text-teal-400",
    description: "Comment commencer à contribuer à scikit-learn, HuggingFace, PyTorch ou d'autres projets ML open source.",
    status: "à compléter",
    items: [],
    placeholder: "Guide de contribution à remplir — première contribution GitHub recommandée après le module MLOps.",
  },
];

const STATUS_BADGE = {
  "coming":       { cls: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",  label: "✓ Disponible"   },
  "à compléter":  { cls: "border-amber-500/30  bg-amber-500/5  text-amber-400",      label: "🔜 À compléter" },
};

export default function AllerPlusLoinPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-4">
          🚀 Section évolutive — se complète au fil du parcours
        </span>
        <h1 className="text-3xl font-bold text-white mb-3">Aller plus loin</h1>
        <p className="text-slate-400 max-w-2xl">
          Une fois les bases maîtrisées, ce n'est que le début. Cette section regroupe les ressources avancées,
          les communautés, les compétitions et les projets ambitieux qui font la différence entre un praticien
          et un expert reconnu.
        </p>
      </div>

      {/* Grille de catégories */}
      <div className="grid sm:grid-cols-2 gap-5">
        {CATEGORIES.map(cat => {
          const badge = STATUS_BADGE[cat.status] || STATUS_BADGE["à compléter"];
          return (
            <div key={cat.id} className={`card p-6 border ${cat.color}`}>
              {/* Header catégorie */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className={`font-bold ${cat.titleColor}`}>{cat.title}</h2>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>

              <p className="text-sm text-slate-400 mb-4">{cat.description}</p>

              {/* Items */}
              {cat.items.length > 0 ? (
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                      <div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          className="text-sm text-accent-light hover:text-accent-cyan hover:underline">
                          {item.label}
                        </a>
                        {item.note && <p className="text-xs text-slate-600 mt-0.5">{item.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-xl border border-dashed border-ink-600 p-4 text-center">
                  <p className="text-sm text-slate-600 italic">{cat.placeholder}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Appel à l'action */}
      <div className="mt-10 card p-8 text-center border-accent/20 bg-accent/5">
        <p className="text-2xl mb-3">🎯</p>
        <h2 className="text-xl font-bold text-white mb-2">Cette section grandit avec toi</h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
          Les sections "À compléter" seront remplies au fil de ta progression.
          Parle au tuteur AI pour qu'il te recommande quoi ajouter ici selon ton niveau actuel.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/tuteur" className="btn-primary">🤖 Demander au tuteur</Link>
          <Link href="/parcours" className="btn-secondary">📚 Retour au parcours</Link>
        </div>
      </div>
    </div>
  );
}
