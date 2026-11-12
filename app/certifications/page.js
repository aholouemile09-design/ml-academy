"use client";
import Link from "next/link";
import { CertificationIllustration } from "@/components/Illustrations";
import { CERT_PREP } from "@/lib/certPrep";

// La liste est passée de huit entrées à trois, sur un critère unique : est-ce
// un examen réel, et dit-il « ML Engineer » à quelqu'un qui recrute ?
//
// Écartés, et pourquoi — c'est la partie utile :
//   Kaggle Python / Pandas / Intro to ML  les badges de fin de cours Kaggle ne
//     sont pas des certifications : aucun examen, aucune surveillance, aucune
//     valeur sur un CV. Les cours eux-mêmes restent de bons entraînements
//     gratuits, ils n'ont simplement rien à faire sur une feuille de route.
//   IBM Data Science Professional  fait doublon avec ce parcours, pour 50 USD
//     par mois. L'argent est mieux placé sur un examen surveillé.
//   AWS Solutions Architect (SAA-C03)  c'est de l'architecture, pas du ML.
//   AWS Professional / CKA  hors sujet pour un premier poste.
const CERTIFICATIONS = [
  {
    id: "c5",
    title: "DeepLearning.AI — ML in Production (MLOps)",
    provider: "DeepLearning.AI / Coursera",
    when: "Mi-2027",
    condition: "Après avoir une API ML locale fonctionnelle",
    cost: "Audit gratuit — certificat payant",
    url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-mlops/",
    priority: "A",
    color: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/5",
    icon: "🎓",
    why: "La seule formation qui couvre exactement le métier visé : dérive, surveillance, cycle de vie d'un modèle. Le nom d'Andrew Ng est reconnu dans le milieu, et le contenu tient tout seul même sans le certificat.",
  },
  {
    id: "mla",
    title: "AWS Certified Machine Learning Engineer — Associate (MLA-C02)",
    provider: "Amazon Web Services",
    when: "Fin 2027 — début 2028",
    condition: "Après avoir déployé toi-même un modèle sur AWS",
    cost: "Tarif à confirmer chez AWS — préparation gratuite sur Skill Builder",
    url: "https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/",
    priority: "A",
    color: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/5",
    icon: "☁️",
    why: "Examen surveillé, et le seul dont l'intitulé est exactement le poste. La version C02 a remplacé C01 le 29 septembre 2026 : même découpage en quatre domaines, mais la moitié du contenu ajouté porte sur Bedrock, le RAG et les agents. 65 questions dont 50 comptent, 720 sur 1000 pour passer. Aucun prérequis : inutile de passer Cloud Practitioner avant.",
  },
  {
    id: "c6",
    title: "AWS Cloud Practitioner (CLF-C02)",
    provider: "Amazon Web Services",
    when: "Optionnel, 2027",
    condition: "Seulement si le vocabulaire AWS reste opaque après tes premiers déploiements",
    cost: "~100 USD",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    priority: "B",
    color: "text-amber-400",
    badge: "border-amber-500/30 bg-amber-500/5",
    icon: "☁️",
    why: "Une marche d'échauffement, pas un argument d'embauche. Elle n'est pas exigée pour MLA-C01 : la passer quand même, c'est 100 USD pour du confort. À sauter si les déploiements se passent bien.",
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
            Trois, pas huit. Une certification vaut quelque chose parce qu'elle suit la pratique — et une certification sans dépôt de projets derrière est un signal négatif, pas un atout.
          </p>
        </div>
      </div>
      <div className="flex gap-3 mb-10 flex-wrap text-sm">
        <span className="px-3 py-1 rounded-full border text-emerald-400 border-emerald-500/30 bg-emerald-500/5">Priorité A — À viser</span>
        <span className="px-3 py-1 rounded-full border text-amber-400 border-amber-500/30 bg-amber-500/5">Priorité B — Optionnel</span>
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
