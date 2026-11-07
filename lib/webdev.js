// Parcours Full Stack Web Development
// Séparé du parcours ML — complémentaire pour créer des applications complètes.

import { WEB_EXERCISES } from "./exercises-web.js";

export const WEB_LEVELS = {
  debutant: { label: "Débutant", color: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/30" },
  intermediaire: { label: "Intermédiaire", color: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/30" },
  avance: { label: "Avancé", color: "text-rose-400", badge: "bg-rose-500/10 border-rose-500/30" },
};

export const WEB_CURRICULUM = [
  {
    id: "html-css",
    title: "HTML5 & CSS3 : Structurer & Styliser",
    level: "debutant",
    icon: "🎨",
    description:
      "Les briques de base du web : HTML structure le contenu, CSS le stylise. Apprendre Flexbox, Grid et le design responsive.",
    lessons: [
      {
        id: "html-1",
        title: "HTML5 : sémantique et structure",
        duration: "50 min",
      },
      {
        id: "html-2",
        title: "CSS3 : Flexbox, Grid & Design",
        duration: "65 min",
      },
      {
        id: "html-3",
        title: "Design Responsive & Tailwind CSS",
        duration: "50 min",
      },
    ],
    quiz: [
      {
        q: "Quelle balise HTML est la plus appropriée pour le contenu principal d'une page ?",
        options: ["<div>", "<section>", "<main>", "<body>"],
        answer: 2,
        explain: "<main> est sémantique et indique au navigateur (et aux moteurs de recherche) le contenu principal.",
      },
      {
        q: "Quelle propriété CSS center des éléments sur l'axe transversal en Flexbox ?",
        options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
        answer: 1,
        explain: "align-items centre sur l'axe croisé (vertical en row, horizontal en column).",
      },
      {
        q: "Qu'est-ce que l'approche 'mobile-first' ?",
        options: [
          "Créer d'abord la version desktop, puis adapter pour mobile",
          "Écrire les styles pour mobile par défaut, puis ajouter des breakpoints pour les grands écrans",
          "Utiliser uniquement des applications mobiles natives",
          "Réduire la taille des images pour mobile",
        ],
        answer: 1,
        explain: "Mobile-first : on code la version mobile (la plus contrainte), puis on enrichit pour les grands écrans.",
      },
      {
        q: "Quel avantage principal offre Tailwind CSS ?",
        options: [
          "Il remplace JavaScript",
          "Classes utilitaires directement dans le HTML : pas de fichier CSS custom à maintenir",
          "Il génère des images automatiquement",
          "Il fonctionne sans Node.js",
        ],
        answer: 1,
        explain: "Tailwind co-localise le style dans le HTML, élimine les conflits CSS et accélère le développement.",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Moderne (ES6+)",
    level: "debutant",
    icon: "⚡",
    description:
      "Le langage du web : ES6+, manipulation du DOM, fetch API, async/await. Le JavaScript moderne est clair, puissant et omniprésent.",
    lessons: [
      {
        id: "js-1",
        title: "JavaScript ES6+ : les fondamentaux",
        duration: "60 min",
      },
      {
        id: "js-2",
        title: "DOM & interactivité",
        duration: "55 min",
      },
      {
        id: "js-3",
        title: "Fetch API & Async/Await",
        duration: "55 min",
      },
    ],
    quiz: [
      {
        q: "Quelle est la différence entre const et let en JavaScript ?",
        options: [
          "const est plus rapide",
          "const ne peut pas être réassigné après sa déclaration ; let peut",
          "let est réservé aux fonctions",
          "Il n'y a pas de différence",
        ],
        answer: 1,
        explain: "const empêche la réassignation de la variable (mais l'objet pointé peut être muté). Utiliser const par défaut.",
      },
      {
        q: "Que fait [].filter(x => x > 0) ?",
        options: [
          "Modifie le tableau en place",
          "Retourne un nouveau tableau ne contenant que les éléments positifs",
          "Compte les éléments positifs",
          "Lève une erreur si le tableau est vide",
        ],
        answer: 1,
        explain: "filter crée un nouveau tableau avec les éléments pour lesquels la fonction retourne true.",
      },
      {
        q: "Pourquoi utiliser try/catch avec await ?",
        options: [
          "Pour accélérer les requêtes",
          "Parce que await est synchrone",
          "Pour gérer les erreurs réseau ou les réponses d'erreur (4xx, 5xx)",
          "C'est obligatoire syntaxiquement",
        ],
        answer: 2,
        explain: "Les promesses peuvent être rejetées (réseau coupé, 500, timeout) — try/catch intercepte ces rejets.",
      },
      {
        q: "Que fait localStorage.setItem('key', JSON.stringify(data)) ?",
        options: [
          "Envoie les données au serveur",
          "Sauvegarde les données en JSON dans le navigateur de l'utilisateur",
          "Compresse les données",
          "Crée un cookie",
        ],
        answer: 1,
        explain: "localStorage est un stockage persistant dans le navigateur, parfait pour la progression ou les préférences.",
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript : JavaScript avec des super-pouvoirs",
    level: "intermediaire",
    icon: "🔷",
    description:
      "TypeScript est le standard de l'industrie en 2025. Il ajoute des types statiques à JavaScript, détecte les bugs avant l'exécution et rend le code auto-documenté. Next.js, Prisma et Express l'utilisent nativement.",
    lessons: [
      {
        id: "ts-1",
        title: "Types, interfaces et annotations",
        duration: "55 min",
        resources: [
          { type: "doc", title: "TypeScript Handbook officiel", url: "https://www.typescriptlang.org/docs/handbook/intro.html", description: "La documentation officielle TypeScript — claire, exhaustive, avec playground interactif." },
          { type: "exercise", title: "TypeScript Exercises", url: "https://typescript-exercises.github.io/", description: "18 exercices progressifs du niveau débutant à avancé — corriges interactifs dans le navigateur." },
          { type: "exercise", title: "Total TypeScript — Beginners Tutorial", url: "https://www.totaltypescript.com/tutorials/beginners-typescript", description: "Cours interactif gratuit de Matt Pocock, le meilleur formateur TypeScript actuellement." },
        ],
      },
      {
        id: "ts-2",
        title: "Generics, utilitaires et types avancés",
        duration: "55 min",
        resources: [
          { type: "exercise", title: "Total TypeScript — Type Transformations", url: "https://www.totaltypescript.com/workshops/type-transformations", description: "Workshop de Matt Pocock spécialement sur les types utilitaires et les transformations de types." },
          { type: "exercise", title: "Type Challenges", url: "https://github.com/type-challenges/type-challenges", description: "Collection de challenges TypeScript classés par difficulté — de easy à extreme. Le LeetCode du typage." },
        ],
      },
      {
        id: "ts-3",
        title: "TypeScript avec React et Next.js",
        duration: "60 min",
      },
      {
        id: "ts-4",
        title: "TypeScript avec Node.js, Express et Zod",
        duration: "55 min",
      },
    ],
    quiz: [
      {
        q: "Quelle est la différence principale entre `interface` et `type` en TypeScript ?",
        options: [
          "interface est plus rapide à compiler",
          "type peut définir des unions et intersections ; interface supporte l'extension avec extends et la déclaration multiple",
          "type ne fonctionne qu'avec les primitifs",
          "Il n'y a pas de différence pratique",
        ],
        answer: 1,
        explain: "Les deux se ressemblent pour les objets. Préférer interface pour les objets extensibles, type pour les unions/intersections et les alias de types complexes.",
      },
      {
        q: "Que fait le type utilitaire `Partial<T>` ?",
        options: [
          "Supprime la moitié des propriétés",
          "Rend toutes les propriétés de T optionnelles",
          "Rend toutes les propriétés de T en lecture seule",
          "Extrait les propriétés de type string",
        ],
        answer: 1,
        explain: "Partial<T> est parfait pour les fonctions de mise à jour où on ne veut envoyer que les champs modifiés.",
      },
      {
        q: "Pourquoi utiliser Zod plutôt qu'une simple interface TypeScript pour valider une requête API ?",
        options: [
          "Les interfaces TypeScript ne compilent pas en production",
          "TypeScript efface les types à l'exécution — Zod valide les données réelles au runtime ET génère les types",
          "Zod est plus rapide que TypeScript",
          "Zod remplace TypeScript",
        ],
        answer: 1,
        explain: "TypeScript disparaît après compilation. Zod tourne au runtime et rejette les données malformées avant qu'elles n'atteignent ta logique métier.",
      },
      {
        q: "Qu'est-ce qu'un generic `<T>` en TypeScript ?",
        options: [
          "Un type qui accepte uniquement des objets",
          "Un paramètre de type qui rend une fonction réutilisable tout en préservant la sécurité des types",
          "Un raccourci pour `any`",
          "Un type spécial pour les tableaux",
        ],
        answer: 1,
        explain: "Les generics permettent d'écrire du code générique qui fonctionne avec n'importe quel type sans sacrifier la vérification statique.",
      },
    ],
  },
  {
    id: "react-nextjs",
    title: "React & Next.js",
    level: "intermediaire",
    icon: "⚛️",
    description:
      "Le framework standard pour les applications web modernes. Ce site CodeGraft Academy est construit avec Next.js — apprends en lisant son code.",
    lessons: [
      {
        id: "react-1",
        title: "React : composants, props et état",
        duration: "65 min",
        resources: [
          { type: "doc", title: "Documentation officielle React", url: "https://react.dev/learn", description: "La nouvelle doc React avec le paradigme modern (hooks, Server Components) — interactive et excellente." },
          { type: "course", title: "The Odin Project — React", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/react", description: "Parcours React complet et gratuit avec projets — l'une des meilleures ressources autodidactes en ligne." },
          { type: "doc", title: "Documentation officielle Next.js", url: "https://nextjs.org/docs", description: "App Router, Server Components, routing, data fetching — la référence pour ce site." },
        ],
      },
      {
        id: "react-2",
        title: "Next.js : routing, API routes, Server Components",
        duration: "65 min",
      },
      {
        id: "react-3",
        title: "Context, hooks personnalisés et bonnes pratiques",
        duration: "55 min",
      },
    ],
    quiz: [
      {
        q: "Que se passe-t-il quand l'état d'un composant React change ?",
        options: [
          "La page se recharge entièrement",
          "Le composant et ses enfants se re-rendent pour refléter le nouvel état",
          "L'état est envoyé au serveur",
          "React supprime le composant",
        ],
        answer: 1,
        explain: "React diff le Virtual DOM et ne met à jour que les parties de la vraie page qui ont changé.",
      },
      {
        q: "À quoi sert 'use client' en tête d'un fichier Next.js ?",
        options: [
          "Activer TypeScript",
          "Indiquer que ce composant s'exécute dans le navigateur (accès aux hooks, events)",
          "Activer le cache côté client",
          "Désactiver le SSR",
        ],
        answer: 1,
        explain: "Sans 'use client', Next.js exécute le composant côté serveur : pas d'accès à useState, useEffect, localStorage.",
      },
      {
        q: "Quel est l'avantage des Server Components de Next.js ?",
        options: [
          "Ils peuvent utiliser useState",
          "Ils s'exécutent sur le serveur : accès direct BDD, zéro JS envoyé au client",
          "Ils sont plus colorés",
          "Ils remplacent les API routes",
        ],
        answer: 1,
        explain: "Les Server Components réduisent le bundle JS client et permettent d'accéder aux données serveur directement.",
      },
      {
        q: "Dans useEffect(fn, []), quand fn est-elle exécutée ?",
        options: [
          "À chaque re-rendu",
          "Uniquement quand les props changent",
          "Une seule fois après le premier rendu (montage)",
          "Jamais",
        ],
        answer: 2,
        explain: "[] (dépendances vides) = effet exécuté une seule fois au montage, équivalent à componentDidMount.",
      },
    ],
  },
  {
    id: "databases-web",
    title: "Bases de Données pour le Web",
    level: "intermediaire",
    icon: "🗃️",
    description:
      "PostgreSQL avec Prisma ORM, MongoDB pour les données flexibles. Concevoir et interroger des bases pour des applications full stack. À faire AVANT le backend : ton API et ton authentification stockeront leurs données ici.",
    lessons: [
      {
        id: "db-1",
        title: "PostgreSQL avec Prisma ORM",
        duration: "60 min",
      },
      {
        id: "db-2",
        title: "MongoDB : base de données document",
        duration: "50 min",
      },
    ],
    quiz: [
      {
        q: "Quel est l'avantage principal d'un ORM comme Prisma ?",
        options: [
          "Il remplace entièrement la base de données",
          "Il génère du code typé, évite les injections SQL et simplifie les migrations",
          "Il est plus rapide que SQL pur",
          "Il ne nécessite pas de schéma",
        ],
        answer: 1,
        explain: "Prisma génère un client typé, sécurise les requêtes et gère les migrations de schéma.",
      },
      {
        q: "Dans quelle situation MongoDB est-il préférable à PostgreSQL ?",
        options: [
          "Pour les transactions financières",
          "Pour les données dont la structure varie beaucoup d'un document à l'autre",
          "Quand on a besoin de jointures complexes",
          "Pour les données avec des contraintes d'intégrité fortes",
        ],
        answer: 1,
        explain: "MongoDB excelle pour les données semi-structurées ou dont le schéma évolue fréquemment.",
      },
      {
        q: "Que fait npx prisma migrate dev ?",
        options: [
          "Déploie la base de données en production",
          "Crée et applique une migration SQL basée sur les changements du schéma Prisma",
          "Importe des données CSV",
          "Génère le client TypeScript uniquement",
        ],
        answer: 1,
        explain: "migrate dev détecte les changements de schéma, génère un fichier SQL de migration et l'applique.",
      },
    ],
  },
  {
    id: "backend-node",
    title: "Backend : Node.js, Express & API REST",
    level: "intermediaire",
    icon: "🖥️",
    description:
      "Construire des serveurs, des APIs REST et gérer l'authentification avec Node.js et Express. S'appuie sur le module Bases de données : tes endpoints y liront et écriront leurs données.",
    lessons: [
      {
        id: "node-1",
        title: "Node.js & npm : le runtime JavaScript serveur",
        duration: "50 min",
      },
      {
        id: "node-2",
        title: "Express.js : construire une API REST",
        duration: "65 min",
      },
      {
        id: "node-3",
        title: "Authentification & sécurité API",
        duration: "60 min",
      },
    ],
    quiz: [
      {
        q: "Quelle méthode HTTP utilise-t-on pour créer une ressource ?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: 1,
        explain: "POST crée, GET lit, PUT/PATCH modifie, DELETE supprime. C'est la convention REST.",
      },
      {
        q: "À quoi sert un middleware Express ?",
        options: [
          "À créer des routes",
          "À exécuter du code entre la réception de la requête et l'envoi de la réponse",
          "À connecter la base de données",
          "À servir les fichiers statiques uniquement",
        ],
        answer: 1,
        explain: "Les middlewares forment une chaîne — chacun peut modifier req/res ou passer la main au suivant avec next().",
      },
      {
        q: "Pourquoi ne jamais mettre les secrets dans le code source ?",
        options: [
          "Ça ralentit le code",
          "Git historise tout : une clé API poussée sur GitHub peut être volée en secondes",
          "C'est une contrainte technique de Node.js",
          "Les secrets en dur fonctionnent bien en production",
        ],
        answer: 1,
        explain: "Des bots scannent GitHub en temps réel pour détecter des clés API. Toujours utiliser .env + .gitignore.",
      },
      {
        q: "Un JWT (JSON Web Token) permet de :",
        options: [
          "Chiffrer les données de la base",
          "Vérifier l'identité d'un utilisateur de manière stateless (sans session serveur)",
          "Compresser les réponses JSON",
          "Logger les requêtes",
        ],
        answer: 1,
        explain: "Le JWT est signé par le serveur et auto-porteur — le serveur n'a pas besoin de session pour l'authentifier.",
      },
    ],
  },
  {
    id: "deployment-web",
    title: "Déploiement & Production Web",
    level: "avance",
    icon: "🌐",
    description:
      "De localhost à internet : Vercel, Railway, variables d'environnement, HTTPS, performance et monitoring. Mettre un site en ligne professionnellement.",
    lessons: [
      {
        id: "deploy-1",
        title: "Déployer sur Vercel (Next.js) et Railway (Node.js)",
        duration: "50 min",
      },
      {
        id: "deploy-2",
        title: "Performance, HTTPS & monitoring",
        duration: "50 min",
      },
    ],
    quiz: [
      {
        q: "Pourquoi ne jamais committer un fichier .env ?",
        options: [
          "Git ne supporte pas les fichiers .env",
          "Les secrets (clés API, mots de passe) seraient exposés publiquement dans l'historique",
          "Ça ralentit les builds",
          "Vercel ne les lit pas",
        ],
        answer: 1,
        explain: "Git historise tous les fichiers — même supprimé, un secret dans un commit est accessible via git log.",
      },
      {
        q: "Quel service Next.js permet de mettre en cache une réponse API côté serveur ?",
        options: [
          "localStorage",
          "La prop next: { revalidate: N } dans fetch",
          "useEffect",
          "Redis uniquement",
        ],
        answer: 1,
        explain: "Next.js 14 étend fetch avec une prop next pour contrôler la durée de cache côté serveur.",
      },
      {
        q: "Qu'est-ce que Let's Encrypt ?",
        options: [
          "Un gestionnaire de packages",
          "Une autorité de certification gratuite qui fournit des certificats HTTPS",
          "Un service de monitoring",
          "Un CDN",
        ],
        answer: 1,
        explain: "Let's Encrypt fournit des certificats TLS gratuits, automatiquement renouvelables. Utilisé par Vercel, Railway, Nginx.",
      },
    ],
  },
];

// ── Fusion des exercices ──────────────────────────────────────────────────
// Même mécanique que pour le parcours ML : les exercices vivent dans
// lib/exercises-web.js et sont greffés ici une fois, au chargement, pour que
// tous les consommateurs de WEB_CURRICULUM voient les mêmes données.
for (const mod of WEB_CURRICULUM) {
  const extra = WEB_EXERCISES[mod.id];
  if (!extra) continue;
  for (const lesson of mod.lessons) {
    const exercises = extra.lessons?.[lesson.id];
    if (exercises) lesson.exercises = exercises;
  }
  if (extra.finalExercise) mod.finalExercise = extra.finalExercise;
  if (extra.quizExtra?.length) mod.quiz = [...mod.quiz, ...extra.quizExtra];
}

export function getWebModule(id) {
  return WEB_CURRICULUM.find((m) => m.id === id);
}

export function totalWebLessons() {
  return WEB_CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
