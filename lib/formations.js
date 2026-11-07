import { CURRICULUM } from "@/lib/curriculum";
import { WEB_CURRICULUM } from "@/lib/webdev";
import { PMP_CURRICULUM } from "@/lib/pmp";

const compter = (curriculum) => ({
  modules: curriculum.length,
  lecons: curriculum.reduce((total, m) => total + m.lessons.length, 0),
});

/**
 * Les trois formations, décrites une seule fois.
 *
 * L'accueil et la page de chaque parcours annoncent le même domaine, le même
 * titre et les mêmes chiffres. Tant qu'ils étaient écrits aux deux endroits,
 * ils divergeaient : /webdev affichait « Développement Web Full Stack » quand
 * l'accueil disait « Développeur web full-stack ».
 *
 * Les chiffres sont comptés sur le curriculum réel. Pas de durée en heures :
 * elle serait inventée, et c'est la promesse la plus facile à ne pas tenir.
 */
export const FORMATIONS = {
  ml: {
    href: "/parcours",
    domaine: "Machine learning & data",
    titre: "Machine learning et data science",
    resume:
      "De Python aux modèles en production : statistiques, ML classique, deep learning, NLP et MLOps.",
    chapo:
      "De Python aux modèles en production. Suivez les modules dans l'ordre — chaque module se valide par un quiz.",
    niveau: "Débutant à avancé",
    image: "photo-1551288049-bebda4e38f71",
    alt: "Courbes de performance d'un modèle sur l'écran d'un ordinateur portable",
    ...compter(CURRICULUM),
  },
  web: {
    href: "/webdev",
    domaine: "Développement web",
    titre: "Développeur web full-stack",
    resume:
      "Du HTML sémantique au déploiement supervisé, en passant par React, les bases de données et la sécurité.",
    chapo:
      "Créez vos propres applications web : portfolios, tableaux de bord, SaaS. Ce parcours est complémentaire au machine learning — ensemble, ils vous rendent autonome de bout en bout.",
    niveau: "Débutant accepté",
    image: "photo-1674483699209-25fb6d962119",
    alt: "Développeur devant deux écrans, en train d'écrire du code",
    ...compter(WEB_CURRICULUM),
  },
  pmp: {
    href: "/pmp",
    domaine: "Gestion de projet",
    titre: "Certification PMP — examen 2026",
    resume:
      "People, Process et Business Environment, prédictif et agile, avec un examen blanc de 180 questions.",
    chapo:
      "Tout ce qu'il faut pour réussir le Project Management Professional du PMI, version 2026 : PMBOK 8, 180 questions, 240 minutes. Cours par domaine, mindset PMI, quiz et examen blanc chronométré.",
    niveau: "Niveau intermédiaire",
    image: "photo-1557804506-669a67965ba0",
    alt: "Équipe projet réunie autour d'un tableau blanc, ordinateurs ouverts",
    ...compter(PMP_CURRICULUM),
  },
};

export const LISTE_FORMATIONS = [FORMATIONS.ml, FORMATIONS.web, FORMATIONS.pmp];
