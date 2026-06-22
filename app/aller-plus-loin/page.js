"use client";

import Link from "next/link";
import Image from "next/image";

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
    description: "Projets de niveau senior pour un portfolio qui se démarque — au-delà des tutoriels, des vrais systèmes.",
    status: "coming",
    items: [
      { label: "🏠 Système de recommandation end-to-end", url: "https://github.com/topics/recommendation-system", note: "Data → modèle collaboratif → API FastAPI → dashboard Streamlit. Tech: pandas, surprise, scikit-learn, FastAPI." },
      { label: "🔍 Moteur de recherche sémantique (RAG)", url: "https://python.langchain.com/docs/tutorials/rag/", note: "Vectorisation documents → ChromaDB → LLM (Llama2 ou Claude) → interface chat. Tech: LangChain, FAISS, HuggingFace." },
      { label: "📈 Détection de fraude bancaire en temps réel", url: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud", note: "Stream Kafka → modèle ML → alertes. Dataset Kaggle Credit Card. Tech: Kafka, PySpark, XGBoost, Redis." },
      { label: "🤖 Agent AI autonome avec outils", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", note: "Agent qui navigue le web, lit des fichiers et répond à des questions complexes. Tech: Claude API, LangGraph, Python." },
      { label: "🌍 Pipeline MLOps complet avec CI/CD", url: "https://mlflow.org/docs/latest/index.html", note: "Train → track avec MLflow → Docker → deploy AWS Lambda → monitoring Grafana. Montre la prod complète." },
      { label: "📷 Application Computer Vision déployée", url: "https://pytorch.org/tutorials/intermediate/torchvision_tutorial.html", note: "Détection d'objets YOLO fine-tuné sur dataset custom → API → interface web. Tech: PyTorch, FastAPI, React." },
    ],
  },
  {
    id: "specialisations",
    icon: "🎓",
    title: "Spécialisations — Master",
    color: "border-sky-500/30 bg-sky-500/5",
    titleColor: "text-sky-400",
    description: "Cloud, Robotique, Pipelines MLOps — 3 voies de Master après le parcours ML/Web, avec universités, conditions d'admission et bourses.",
    status: "disponible",
    link: "/aller-plus-loin/masters",
    items: [
      { label: "☁️ Cloud Computing & Architecture — parcours + universités Canada", url: "/aller-plus-loin/masters", note: "Waterloo, UBC, Concordia + Georgia Tech en ligne" },
      { label: "🤖 Robotique & Systèmes Autonomes — ROS2, Vision, autonomie", url: "/aller-plus-loin/masters", note: "UofT, McGill, Polytechnique, CMU, TU Munich" },
      { label: "🔁 Data Engineering & Pipelines ML — Spark, Kafka, Airflow", url: "/aller-plus-loin/masters", note: "UBC MDS, UofT, McGill, Georgia Tech OMSA" },
    ],
  },
  {
    id: "contribuer",
    icon: "🌍",
    title: "Contribuer à l'open source",
    color: "border-teal-500/30 bg-teal-500/5",
    titleColor: "text-teal-400",
    description: "Comment faire sa première contribution à un projet ML open source et construire sa réputation dans la communauté.",
    status: "coming",
    items: [
      { label: "📘 Guide officiel GitHub — Comment contribuer à l'open source", url: "https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project", note: "Étape 1 : fork → branch → commit → PR. La base absolue." },
      { label: "🐛 scikit-learn — issues labelisées 'good first issue'", url: "https://github.com/scikit-learn/scikit-learn/labels/good%20first%20issue", note: "Niveau idéal après le parcours ML. Amélioration de docs, corrections de bugs mineurs." },
      { label: "🤗 HuggingFace Transformers — première contribution", url: "https://github.com/huggingface/transformers/blob/main/CONTRIBUTING.md", note: "Guide de contribution officiel. Focus sur les tests et la documentation d'abord." },
      { label: "⚡ FastAPI — issues débutant", url: "https://github.com/fastapi/fastapi/labels/good%20first%20issue", note: "Très actif, mainteneur réactif, idéal pour débuter. Améliore tes skills web + ML API." },
      { label: "🔥 PyTorch — écosystème et tutoriels", url: "https://github.com/pytorch/tutorials/blob/main/CONTRIBUTING.md", note: "Contribuer à la documentation et aux tutoriels est souvent plus accessible que le code C++." },
      { label: "🗂 First Contributions — parcours guidé pour ta toute première PR", url: "https://github.com/firstcontributions/first-contributions", note: "Repo dédié aux débutants. Parfait pour pratiquer le workflow GitHub avant de toucher un vrai projet." },
    ],
  },
];

const STATUS_BADGE = {
  "coming":       { cls: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",  label: "✓ Disponible"   },
  "disponible":   { cls: "border-sky-500/30     bg-sky-500/5     text-sky-400",      label: "✓ Disponible"   },
  "à compléter":  { cls: "border-amber-500/30  bg-amber-500/5  text-amber-400",      label: "🔜 À compléter" },
};

export default function AllerPlusLoinPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Banner image */}
      <div className="relative rounded-3xl overflow-hidden mb-10 h-48 sm:h-64">
        <Image
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=75"
          alt="Aller plus loin — ressources avancées ML"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]">
          <span className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-3 w-fit [text-shadow:none]">
            🚀 Section évolutive — se complète au fil du parcours
          </span>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Aller plus loin</h1>
          <p className="text-slate-200/90 max-w-xl text-sm">
            Ressources avancées, communautés, compétitions, projets ambitieux et parcours Master — tout ce qui distingue un praticien d'un expert reconnu.
          </p>
        </div>
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
                <>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                        <div>
                          {item.url.startsWith("/") ? (
                            <Link href={item.url}
                              className="text-sm text-accent-light hover:text-accent-cyan hover:underline">
                              {item.label}
                            </Link>
                          ) : (
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                              className="text-sm text-accent-light hover:text-accent-cyan hover:underline">
                              {item.label}
                            </a>
                          )}
                          {item.note && <p className="text-xs text-slate-600 mt-0.5">{item.note}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {cat.link && (
                    <div className="mt-4">
                      <Link href={cat.link}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm font-semibold hover:bg-sky-500/20 transition-colors">
                        Voir les 3 parcours Master complets →
                      </Link>
                    </div>
                  )}
                </>
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
