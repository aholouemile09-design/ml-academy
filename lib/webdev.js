// Parcours Full Stack Web Development
// Séparé du parcours ML — complémentaire pour créer des applications complètes.

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
        content: `HTML (HyperText Markup Language) définit la **structure** d'une page web. HTML5 introduit des balises sémantiques qui donnent du sens au contenu.

**Structure d'une page HTML5 complète**
\`\`\`html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ML Academy</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Accueil</a>
      <a href="/parcours">Parcours</a>
    </nav>
  </header>
  <main>
    <article>
      <h1>Introduction au Machine Learning</h1>
      <p>Le ML permet aux machines d'apprendre depuis les données.</p>
    </article>
    <aside>Ressources complémentaires</aside>
  </main>
  <footer>© 2026 ML Academy</footer>
</body>
</html>
\`\`\`

**Balises sémantiques clés** : \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\`.

**Formulaires** — essentiels pour les applications :
\`\`\`html
<form action="/submit" method="POST">
  <input type="email" name="email" required placeholder="ton@email.com">
  <input type="password" name="mdp" minlength="8">
  <select name="niveau">
    <option value="debutant">Débutant</option>
    <option value="avance">Avancé</option>
  </select>
  <button type="submit">S'inscrire</button>
</form>
\`\`\`

**Ressource** : MDN Web Docs (référence absolue) — https://developer.mozilla.org/fr/docs/Web/HTML

**Exercice** : crée une page HTML5 pour présenter un projet ML (titre, description, métriques, auteur, liens GitHub) — sans aucun CSS pour l'instant.`,
      },
      {
        id: "html-2",
        title: "CSS3 : Flexbox, Grid & Design",
        duration: "65 min",
        content: `CSS (Cascading Style Sheets) contrôle l'apparence. Flexbox et Grid ont révolutionné la mise en page.

**Les sélecteurs essentiels**
\`\`\`css
/* Élément */       p { color: #334155; }
/* Classe */        .card { background: #0f1525; }
/* ID */            #hero { height: 100vh; }
/* Combinaisons */  .nav a:hover { color: #818cf8; }
\`\`\`

**Flexbox** — disposition en ligne ou colonne :
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;  /* espacement horizontal */
  align-items: center;              /* alignement vertical */
  gap: 1rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;                  /* retour à la ligne auto */
  gap: 1.5rem;
}
.card { flex: 1 1 300px; }         /* taille minimale 300px */
\`\`\`

**CSS Grid** — grilles bidimensionnelles :
\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;  /* sidebar + contenu */
  grid-template-rows: auto 1fr auto; /* header + main + footer */
  min-height: 100vh;
}

/* Grille responsive sans media queries */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`

**Variables CSS & thème sombre** :
\`\`\`css
:root {
  --bg: #0a0e1a;
  --bg-card: #0f1525;
  --accent: #6366f1;
  --text: #e2e8f0;
}
body { background: var(--bg); color: var(--text); }
\`\`\`

**Ressource** : css-tricks.com/snippets/css/a-guide-to-flexbox/ + Grid Guide

**Exercice** : stylise ta page de présentation projet avec un thème sombre, une navbar Flexbox, et une grille de cartes responsive sans aucun framework.`,
      },
      {
        id: "html-3",
        title: "Design Responsive & Tailwind CSS",
        duration: "50 min",
        content: `60% du trafic web vient des mobiles. Un site responsive s'adapte à toutes les tailles d'écran.

**Media queries — approche mobile-first** :
\`\`\`css
/* Mobile par défaut */
.grid { grid-template-columns: 1fr; }

/* Tablette (≥ 768px) */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

**Tailwind CSS** — framework utility-first. Au lieu d'écrire du CSS custom, tu utilises des classes prédéfinies :
\`\`\`html
<!-- Sans Tailwind -->
<div style="background:#0f1525; border-radius:1rem; padding:1.5rem">

<!-- Avec Tailwind -->
<div class="bg-slate-900 rounded-2xl p-6">

<!-- Responsive avec Tailwind -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
\`\`\`

Tailwind est utilisé dans CE site (ML Academy) — tu peux inspecter les classes dans le code pour apprendre.

**Unités modernes** :
- \`rem\` : relatif à la taille de base (accessibilité)
- \`%\`, \`vw\`, \`vh\` : relatif au viewport
- \`clamp(1rem, 4vw, 2rem)\` : taille fluide entre min et max

**Ressource** : Tailwind CSS Docs — https://tailwindcss.com/docs

**Exercice** : convertis ta page projet en Tailwind CSS, rends-la parfaitement responsive sur mobile, tablette et desktop.`,
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
        content: `JavaScript est le seul langage natif du navigateur. Avec Node.js, il s'étend au backend. ES6+ (2015 et après) l'a rendu moderne et élégant.

**Variables modernes**
\`\`\`javascript
const nom = "Emile";          // constante (recommandé par défaut)
let score = 0;                 // variable modifiable
// var : éviter — portée ambiguë

// Destructuring
const { prenom, age } = utilisateur;
const [premier, ...reste] = tableau;

// Template literals
const message = \`Bonjour \${nom}, tu as \${age} ans\`;
\`\`\`

**Fonctions modernes**
\`\`\`javascript
// Arrow function
const carre = x => x ** 2;
const additionner = (a, b) => a + b;

// Paramètres par défaut
const saluer = (nom = "visiteur") => \`Bonjour \${nom}\`;

// Spread & rest
const fusion = [...tableau1, ...tableau2];
const somme = (...nombres) => nombres.reduce((a, b) => a + b, 0);
\`\`\`

**Tableaux modernes** — les méthodes fonctionnelles :
\`\`\`javascript
const modules = ["Python", "ML", "Deep Learning", "NLP"];

modules.map(m => m.toUpperCase())           // transformer
modules.filter(m => m.length > 5)           // filtrer
modules.find(m => m.startsWith("ML"))       // trouver
modules.reduce((acc, m) => acc + 1, 0)     // agréger
modules.sort()                              // trier
\`\`\`

**Modules ES6**
\`\`\`javascript
// curriculum.js
export const MODULES = ["Python", "ML"];
export function getModule(id) { ... }

// main.js
import { MODULES, getModule } from "./curriculum.js";
\`\`\`

**Ressource** : javascript.info — https://javascript.info (le meilleur tutoriel JS gratuit)`,
      },
      {
        id: "js-2",
        title: "DOM & interactivité",
        duration: "55 min",
        content: `Le DOM (Document Object Model) est la représentation JavaScript de la page HTML. Le manipuler = rendre la page interactive.

**Sélectionner des éléments**
\`\`\`javascript
// Moderne (recommandé)
const btn = document.querySelector("#submit-btn");
const cards = document.querySelectorAll(".card");

// Lire et modifier
btn.textContent = "Chargement...";
btn.classList.add("loading");
btn.style.opacity = "0.5";
\`\`\`

**Événements**
\`\`\`javascript
btn.addEventListener("click", (event) => {
  event.preventDefault();    // éviter la soumission du formulaire
  console.log("Cliqué !");
});

// Délégation d'événements — efficace pour les listes dynamiques
document.querySelector(".modules-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("module-btn")) {
    openModule(e.target.dataset.moduleId);
  }
});
\`\`\`

**Créer des éléments dynamiquement**
\`\`\`javascript
function createModuleCard(module) {
  const card = document.createElement("div");
  card.className = "card p-6";
  card.innerHTML = \`
    <span class="text-2xl">\${module.icon}</span>
    <h3 class="font-bold">\${module.title}</h3>
    <p>\${module.description}</p>
  \`;
  return card;
}

document.querySelector(".grid").append(createModuleCard(module));
\`\`\`

**LocalStorage** — persistance côté client :
\`\`\`javascript
// Sauvegarder la progression
localStorage.setItem("completedLessons", JSON.stringify(["py-1", "py-2"]));

// Lire
const done = JSON.parse(localStorage.getItem("completedLessons") || "[]");
\`\`\`

**Exercice** : crée un quiz interactif en JavaScript pur — affiche les questions, gère les clics sur les réponses, calcule le score et le sauvegarde en localStorage.`,
      },
      {
        id: "js-3",
        title: "Fetch API & Async/Await",
        duration: "55 min",
        content: `Les applications web communiquent avec des serveurs via HTTP. Fetch + async/await rendent ce code clair et maintenable.

**Fetch de base**
\`\`\`javascript
// GET — récupérer des données
async function fetchModules() {
  try {
    const response = await fetch("/api/modules");
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur:", error);
  }
}
\`\`\`

**POST — envoyer des données**
\`\`\`javascript
async function askTutor(question) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  });
  const { reply } = await response.json();
  return reply;
}
\`\`\`

**Gestion des états de chargement** — pattern UX essentiel :
\`\`\`javascript
async function sendQuestion() {
  btn.disabled = true;
  btn.textContent = "Chargement...";
  spinner.style.display = "block";

  try {
    const reply = await askTutor(input.value);
    appendMessage("assistant", reply);
  } catch (e) {
    appendMessage("error", "Une erreur s'est produite.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Envoyer";
    spinner.style.display = "none";
  }
}
\`\`\`

**Promise.all** — requêtes en parallèle :
\`\`\`javascript
const [user, modules, progress] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/modules").then(r => r.json()),
  fetch("/api/progress").then(r => r.json()),
]);
\`\`\`

**Exercice** : intègre l'API publique de GitHub (https://api.github.com/users/{username}/repos) pour afficher les repos d'un utilisateur sur une page HTML.`,
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
    id: "react-nextjs",
    title: "React & Next.js",
    level: "intermediaire",
    icon: "⚛️",
    description:
      "Le framework standard pour les applications web modernes. Ce site ML Academy est construit avec Next.js — apprends en lisant son code.",
    lessons: [
      {
        id: "react-1",
        title: "React : composants, props et état",
        duration: "65 min",
        content: `React décompose l'UI en **composants** réutilisables. Chaque composant = une fonction qui retourne du JSX.

**Composant fonctionnel de base**
\`\`\`jsx
// Un composant = une fonction qui retourne du JSX
function ModuleCard({ icon, title, description, level }) {
  return (
    <div className="card p-6 hover:border-accent/50 transition-colors">
      <span className="text-3xl">{icon}</span>
      <h3 className="font-bold text-white mt-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
      <span className="text-xs text-emerald-400">{level}</span>
    </div>
  );
}

// Utilisation
<ModuleCard icon="🐍" title="Python" description="Les bases" level="Débutant" />
\`\`\`

**useState — état local**
\`\`\`jsx
import { useState } from "react";

function QuizQuestion({ question, options, answer }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <div>
      <p>{question}</p>
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(i)}
          className={selected === i ? "bg-accent" : "bg-ink-800"}
        >
          {opt}
        </button>
      ))}
      <button onClick={() => setShowResult(true)}>Valider</button>
      {showResult && (
        <p>{selected === answer ? "✅ Correct !" : "❌ Incorrect"}</p>
      )}
    </div>
  );
}
\`\`\`

**useEffect — effets de bord**
\`\`\`jsx
import { useEffect, useState } from "react";

function Dashboard() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Exécuté après le rendu
    const saved = JSON.parse(localStorage.getItem("progress") || "{}");
    setProgress(saved);
  }, []); // [] = exécuté une seule fois au montage

  if (!progress) return <p>Chargement...</p>;
  return <p>XP : {progress.xp}</p>;
}
\`\`\`

**Ressource** : react.dev — https://react.dev (tutoriel officiel interactif)`,
      },
      {
        id: "react-2",
        title: "Next.js : routing, API routes, Server Components",
        duration: "65 min",
        content: `Next.js est le framework React de référence. Il ajoute routing basé sur les fichiers, rendu serveur, optimisations automatiques — et c'est ce qui fait tourner ML Academy.

**App Router — structure de fichiers = routes**
\`\`\`
app/
├── page.js           → /
├── parcours/
│   ├── page.js       → /parcours
│   └── [moduleId]/
│       └── page.js   → /parcours/python, /parcours/ml-classique...
├── tuteur/
│   └── page.js       → /tuteur
└── api/
    └── chat/
        └── route.js  → /api/chat (endpoint API)
\`\`\`

**Server Components vs Client Components**
\`\`\`jsx
// Server Component (par défaut) — s'exécute sur le serveur
// ✅ Accès direct à la BDD, pas de JS envoyé au client
export default async function Page() {
  const data = await fetch("https://api.example.com/data");  // serveur-side
  return <ul>{data.map(d => <li>{d.title}</li>)}</ul>;
}

// Client Component — "use client" en tête de fichier
"use client";
import { useState } from "react";

export default function InteractivePage() {
  const [count, setCount] = useState(0);  // useState impossible côté serveur
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

**Route API — backend intégré**
\`\`\`javascript
// app/api/predict/route.js
export async function POST(request) {
  const { features } = await request.json();
  const prediction = await runModel(features);
  return Response.json({ prediction, confidence: 0.94 });
}
\`\`\`

**Navigation et Link**
\`\`\`jsx
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavLink({ href, label }) {
  return <Link href={href} className="hover:text-accent">{label}</Link>;
}
\`\`\`

**Ressource** : Next.js Docs — https://nextjs.org/docs`,
      },
      {
        id: "react-3",
        title: "Context, hooks personnalisés et bonnes pratiques",
        duration: "55 min",
        content: `Pour les applications réelles, il faut gérer l'état partagé entre composants et organiser le code proprement.

**Context API — état global sans librairie**
\`\`\`jsx
// lib/AppContext.js
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);

  const addXp = (amount) => setXp(prev => prev + amount);

  return (
    <AppContext.Provider value={{ user, xp, addXp }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte
export function useApp() {
  return useContext(AppContext);
}

// Dans n'importe quel composant enfant
function LessonComplete() {
  const { xp, addXp } = useApp();
  return (
    <button onClick={() => addXp(50)}>
      Terminer (+50 XP) — Total : {xp}
    </button>
  );
}
\`\`\`

**Hook personnalisé — réutiliser la logique**
\`\`\`jsx
// hooks/useLocalStorage.js
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue));
  });

  const set = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, set];
}

// Utilisation
const [progress, setProgress] = useLocalStorage("progress", { xp: 0 });
\`\`\`

**Bonnes pratiques React/Next.js** :
- Un composant = une responsabilité
- Props drilling > 2 niveaux → Context ou state management
- Toujours une \`key\` stable dans les listes (\`key={item.id}\`, pas l'index)
- \`useMemo\` / \`useCallback\` uniquement quand les perfs le nécessitent vraiment
- Tester avec React Testing Library`,
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
    id: "backend-node",
    title: "Backend : Node.js, Express & API REST",
    level: "intermediaire",
    icon: "🖥️",
    description:
      "Construire des serveurs, des APIs REST et gérer l'authentification avec Node.js et Express. La base du développement côté serveur.",
    lessons: [
      {
        id: "node-1",
        title: "Node.js & npm : le runtime JavaScript serveur",
        duration: "50 min",
        content: `Node.js exécute JavaScript hors du navigateur. npm (Node Package Manager) donne accès à 2 millions de packages.

**Modules Node.js intégrés**
\`\`\`javascript
const fs = require("fs");
const path = require("path");
const http = require("http");

// Lire un fichier
const data = fs.readFileSync("data.json", "utf8");
const parsed = JSON.parse(data);

// Écrire un fichier
fs.writeFileSync("output.json", JSON.stringify(result, null, 2));

// Chemin portable (Windows/Mac/Linux)
const filePath = path.join(__dirname, "data", "train.csv");
\`\`\`

**npm — gestion des dépendances**
\`\`\`bash
npm init -y                    # créer package.json
npm install express            # installer
npm install --save-dev jest    # dépendance de dev
npm run start                  # exécuter le script "start"
npm test                       # exécuter les tests
\`\`\`

**Package.json — le cœur du projet Node**
\`\`\`json
{
  "name": "ml-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
\`\`\`

**Asynchrone en Node.js** — tout est événementiel :
\`\`\`javascript
// Éviter les callbacks imbriqués (callback hell)
// ✅ Utiliser async/await
const readData = async (filePath) => {
  const content = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(content);
};
\`\`\``,
      },
      {
        id: "node-2",
        title: "Express.js : construire une API REST",
        duration: "65 min",
        content: `Express est le framework web Node.js le plus populaire. Simple, flexible, et au cœur de millions d'applications en production.

**Server Express de base**
\`\`\`javascript
const express = require("express");
const app = express();

app.use(express.json());           // parser le JSON des requêtes
app.use(express.static("public")); // servir des fichiers statiques

// Routes CRUD pour des prédictions ML
app.get("/api/predictions", async (req, res) => {
  const predictions = await db.query("SELECT * FROM predictions LIMIT 50");
  res.json(predictions.rows);
});

app.get("/api/predictions/:id", async (req, res) => {
  const { id } = req.params;
  const pred = await db.query("SELECT * FROM predictions WHERE id = $1", [id]);
  if (!pred.rows.length) return res.status(404).json({ error: "Not found" });
  res.json(pred.rows[0]);
});

app.post("/api/predict", async (req, res) => {
  const { features } = req.body;
  const prediction = await runModel(features);
  res.status(201).json({ prediction, confidence: 0.92 });
});

app.listen(3000, () => console.log("API sur http://localhost:3000"));
\`\`\`

**Middleware** — code qui s'exécute entre la requête et la réponse :
\`\`\`javascript
// Logger personnalisé
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.url}\`);
  next();  // passer au middleware suivant
});

// Gestion d'erreurs centralisée
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne" });
});
\`\`\`

**Validation des entrées** — toujours valider côté serveur :
\`\`\`javascript
app.post("/api/predict", (req, res) => {
  const { features } = req.body;
  if (!features || !Array.isArray(features)) {
    return res.status(400).json({ error: "features doit être un tableau" });
  }
  if (features.some(f => typeof f !== "number")) {
    return res.status(400).json({ error: "Toutes les features doivent être numériques" });
  }
  // ...
});
\`\`\`

**Ressource** : Express.js — https://expressjs.com`,
      },
      {
        id: "node-3",
        title: "Authentification & sécurité API",
        duration: "60 min",
        content: `Une API sans authentification est une API publique. Voici les patterns standards de sécurisation.

**JWT (JSON Web Tokens)** — le standard pour les API sans session :
\`\`\`javascript
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// Créer un token à la connexion
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!user || !await bcrypt.compare(password, user.hashedPassword)) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// Middleware de vérification du token
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Non authentifié" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token invalide ou expiré" });
  }
}

// Route protégée
app.get("/api/my-models", requireAuth, async (req, res) => {
  const models = await getModelsByUser(req.user.userId);
  res.json(models);
});
\`\`\`

**Variables d'environnement** — JAMAIS de secrets dans le code :
\`\`\`bash
# .env (jamais versionné !)
JWT_SECRET=un_secret_tres_long_et_aleatoire
DATABASE_URL=postgresql://user:pass@localhost:5432/mldb
ANTHROPIC_API_KEY=sk-ant-...
\`\`\`
\`\`\`javascript
require("dotenv").config();
const secret = process.env.JWT_SECRET; // ✅
\`\`\`

**Bonnes pratiques sécurité** :
- Rate limiting (express-rate-limit) : max 100 req/15min
- CORS configuré (pas *)
- Sanitiser les entrées (jamais faire confiance au client)
- HTTPS en production (Let's Encrypt gratuit)
- Logs sans données personnelles`,
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
    id: "databases-web",
    title: "Bases de Données pour le Web",
    level: "intermediaire",
    icon: "🗃️",
    description:
      "PostgreSQL avec Prisma ORM, MongoDB pour les données flexibles. Concevoir et interroger des bases pour des applications full stack.",
    lessons: [
      {
        id: "db-1",
        title: "PostgreSQL avec Prisma ORM",
        duration: "60 min",
        content: `Prisma est l'ORM moderne pour Node.js/TypeScript. Il génère un client typé depuis ton schéma, évite les injections SQL et simplifie les migrations.

**Initialiser Prisma**
\`\`\`bash
npm install @prisma/client
npm install --save-dev prisma
npx prisma init          # crée prisma/schema.prisma + .env
\`\`\`

**Schéma Prisma — définir le modèle de données**
\`\`\`prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  xp        Int      @default(0)
  createdAt DateTime @default(now())
  lessons   CompletedLesson[]
  quizzes   QuizResult[]
}

model CompletedLesson {
  id       Int    @id @default(autoincrement())
  lessonId String
  user     User   @relation(fields: [userId], references: [id])
  userId   Int
  completedAt DateTime @default(now())

  @@unique([userId, lessonId])
}
\`\`\`

**Requêtes Prisma dans Express**
\`\`\`javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Créer un utilisateur
const user = await prisma.user.create({
  data: { email: "emile@ml.ca", name: "Emile", xp: 0 }
});

// Lire avec relations
const userWithProgress = await prisma.user.findUnique({
  where: { id: userId },
  include: { lessons: true, quizzes: true }
});

// Mettre à jour l'XP
await prisma.user.update({
  where: { id: userId },
  data: { xp: { increment: 50 } }
});
\`\`\`

**Migrations**
\`\`\`bash
npx prisma migrate dev --name add-xp-field
npx prisma studio                            # GUI de la BDD
\`\`\``,
      },
      {
        id: "db-2",
        title: "MongoDB : base de données document",
        duration: "50 min",
        content: `MongoDB stocke des documents JSON (BSON). Idéal pour les données flexibles, les prototypes rapides et les projets où le schéma évolue souvent.

**Quand choisir MongoDB vs PostgreSQL ?**
- **MongoDB** : données flexibles (chaque document peut avoir une structure différente), prototypage rapide, stockage de logs ML, embeddings
- **PostgreSQL** : données relationnelles avec intégrité forte (utilisateurs, commandes, transactions financières)

**Mongoose — ODM pour Node.js**
\`\`\`javascript
const mongoose = require("mongoose");

// Définir un schéma
const PredictionSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  inputData: mongoose.Schema.Types.Mixed,   // structure flexible
  prediction: Number,
  confidence: { type: Number, min: 0, max: 1 },
  metadata: {
    version: String,
    features: [String],
  },
  createdAt: { type: Date, default: Date.now }
});

const Prediction = mongoose.model("Prediction", PredictionSchema);

// CRUD
const pred = await Prediction.create({
  modelName: "fraud-detector-v2",
  inputData: { amount: 1500, country: "CA" },
  prediction: 1,
  confidence: 0.94
});

// Requêtes
const recent = await Prediction.find({ confidence: { $gt: 0.9 } })
  .sort({ createdAt: -1 })
  .limit(10);

await Prediction.updateOne({ _id: pred._id }, { $set: { confidence: 0.96 } });
\`\`\`

**Agrégation MongoDB** — pipeline de transformation :
\`\`\`javascript
const stats = await Prediction.aggregate([
  { $match: { confidence: { $gt: 0.7 } } },
  { $group: { _id: "$modelName", avgConfidence: { $avg: "$confidence" }, count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
\`\`\``,
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
        content: `Les plateformes modernes rendent le déploiement simple — mais il faut connaître les bonnes pratiques.

**Vercel — la plateforme officielle de Next.js**
\`\`\`bash
npm install -g vercel
vercel login
vercel                  # déploie le projet courant
vercel --prod           # déploiement en production
\`\`\`

Configuration via \`vercel.json\` :
\`\`\`json
{
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic-api-key"
  },
  "regions": ["iad1"],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
\`\`\`

**Railway — backend Node.js + PostgreSQL**
Railway déploie automatiquement depuis GitHub et peut provisionner une base PostgreSQL.
\`\`\`bash
# Via railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
\`\`\`
Railway détecte automatiquement Node.js et lance \`npm start\`.

**Variables d'environnement en production**
Toutes les plateformes proposent un gestionnaire de secrets :
- Vercel : Project Settings → Environment Variables
- Railway : Variables tab
- AWS : Systems Manager Parameter Store ou Secrets Manager

**Ne jamais faire** :
\`\`\`bash
# ❌ Committer un .env
git add .env  # JAMAIS

# ✅ .gitignore doit contenir .env*
echo ".env*" >> .gitignore
\`\`\``,
      },
      {
        id: "deploy-2",
        title: "Performance, HTTPS & monitoring",
        duration: "50 min",
        content: `Une application déployée doit être rapide, sécurisée et observable.

**HTTPS — obligatoire en 2026**
Vercel et Railway gèrent automatiquement les certificats TLS via Let's Encrypt. Pour un VPS :
\`\`\`bash
# Nginx + Certbot (Let's Encrypt gratuit)
sudo apt install nginx certbot python3-certbot-nginx
sudo certbot --nginx -d monsite.com
# Renouvellement automatique
sudo certbot renew --dry-run
\`\`\`

**Performance Next.js**
\`\`\`jsx
// Optimisation images automatique
import Image from "next/image";
<Image src="/hero.jpg" width={800} height={400} alt="Hero" priority />

// Chargement paresseux
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("./Chart"), { ssr: false });

// Mise en cache de l'API (Next.js 14)
const data = await fetch("/api/data", { next: { revalidate: 3600 } }); // cache 1h
\`\`\`

**Monitoring de base**
\`\`\`javascript
// Vercel Analytics (gratuit, intégré)
import { Analytics } from "@vercel/analytics/react";
// Ajoute <Analytics /> dans app/layout.js

// Logger structuré pour le backend
const log = (level, message, data = {}) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level, message, ...data
  }));
};

log("info", "Prédiction effectuée", { modelId: "v2", confidence: 0.94 });
\`\`\`

**Checklist avant mise en production**
- ✅ Variables d'env définies (pas .env committé)
- ✅ HTTPS activé
- ✅ Gestion des erreurs (try/catch + pages 404/500)
- ✅ Limites de rate sur l'API
- ✅ Tests passent (CI/CD vérifié)
- ✅ README à jour avec URL de démo`,
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

export function getWebModule(id) {
  return WEB_CURRICULUM.find((m) => m.id === id);
}

export function totalWebLessons() {
  return WEB_CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
