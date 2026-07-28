"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    q: "Combien d'heures par semaine faut-il prévoir ?",
    a: "Le plan est calibré sur 7 à 9 heures par semaine, soit environ une heure par jour plus une session longue le week-end. C'est un rythme tenable en parallèle d'un emploi. Tu peux aller plus vite, mais l'expérience montre que la régularité bat l'intensité : mieux vaut une heure tous les jours que sept heures le dimanche.",
  },
  {
    q: "Faut-il déjà savoir coder pour commencer ?",
    a: "Non. Le parcours ML démarre par un module Setup (terminal, Git, environnements Python) puis un module Python complet. Le parcours Web démarre par HTML/CSS. Chaque module indique ses prérequis explicitement — tu sais toujours ce qu'il faut maîtriser avant d'ouvrir la porte suivante.",
  },
  {
    q: "Comment fonctionne le tuteur AI ?",
    a: "Il s'appuie sur Claude d'Anthropic et connaît le contenu de la leçon que tu consultes. Il t'explique un concept, décortique une erreur dans ton code, te suggère une piste. En revanche il refusera de faire tes projets à ta place — c'est une règle stricte de son prompt, parce qu'un projet fait par quelqu'un d'autre ne t'apprend rien.",
  },
  {
    q: "Les livres recommandés sont-ils obligatoires ?",
    a: "Non, et une bonne partie sont gratuits et légaux : Mathematics for Machine Learning, Dive into Deep Learning, Forecasting Principles and Practice, Eloquent JavaScript. Les livres payants sont signalés comme tels avec leur prix indicatif et la raison précise de l'achat. Tu peux terminer le cursus sans en acheter un seul.",
  },
  {
    q: "Qu'est-ce qu'un problem set exactement ?",
    a: "Une évaluation pratique notée sur 100 avec sa grille de notation, à la fin de chaque module. Le modèle vient de CS50 à Harvard : chaque exercice est ancré dans un domaine réel — scoring crédit auditable, détection de fraude bancaire, imagerie médicale, prévision de demande retail. Tu ne fais pas des exercices scolaires, tu résous des problèmes que rencontrent les professionnels.",
  },
  {
    q: "Le parcours PMP est-il inclus ?",
    a: "Oui, les trois parcours sont accessibles avec le même compte : ML & Data Science, Web Full Stack et préparation PMP 2026. Le PMP couvre les trois domaines de l'ECO (People, Process, Business Environment) et se termine par un examen blanc chronométré de 180 questions.",
  },
  {
    q: "Mes données de progression sont-elles conservées ?",
    a: "Elles sont stockées sur ton compte, dans une base Supabase protégée par des politiques d'accès au niveau des lignes : personne d'autre que toi ne peut lire ta progression. Ton mot de passe n'est jamais stocké en clair — Supabase Auth le hashe avec bcrypt avant écriture, et l'application n'y a jamais accès.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {QUESTIONS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="card overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-accent/5 transition-colors"
            >
              <span className="font-semibold text-white text-sm">{item.q}</span>
              <span
                className="text-accent-light text-lg shrink-0 transition-transform duration-500"
                style={{
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transitionTimingFunction: "var(--ease-soft)",
                }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-500"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transitionTimingFunction: "var(--ease-soft)",
              }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
