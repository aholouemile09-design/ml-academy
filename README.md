# CodeGraft Academy 🎓

École en ligne de machine learning et programmation avec **tuteur AI personnel** — un site complet construit avec Next.js et Tailwind CSS.

## Fonctionnalités

- **Parcours structuré** : 6 modules (Python, Maths, ML classique, Deep Learning, NLP/Transformers, MLOps), 23 leçons rédigées, du débutant à l'avancé
- **Quiz de validation** par module, avec corrections expliquées
- **8 projets guidés** pour construire un portfolio
- **Suivi de progression** : XP, niveaux, badges, tableau de bord (sauvegardé en localStorage)
- **Tuteur AI** à deux modes :
  - *Mode simulé* (par défaut, gratuit) : base de connaissances locale sur les concepts du parcours
  - *Mode Claude* : vraie IA conversationnelle via l'API Anthropic (clé à saisir dans Paramètres, ou variable d'env `ANTHROPIC_API_KEY`)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Activer le tuteur AI complet

Deux options :

1. **Via l'interface** : page Paramètres → coller votre clé API Anthropic (stockée dans votre navigateur uniquement)
2. **Via l'environnement** : copier `.env.local.example` en `.env.local` et renseigner `ANTHROPIC_API_KEY`

La clé n'est jamais exposée côté client lors des appels : tout passe par la route API `/api/chat`.

## Déploiement

Le projet se déploie en un clic sur [Vercel](https://vercel.com) (créateurs de Next.js) :

```bash
npx vercel
```

Pensez à ajouter `ANTHROPIC_API_KEY` dans les variables d'environnement du projet Vercel si vous voulez que le tuteur AI fonctionne pour tous les visiteurs sans clé personnelle.

## Structure

```
app/
├── page.js                  # Page d'accueil
├── dashboard/               # Tableau de bord de progression
├── parcours/                # Liste des modules
│   └── [moduleId]/          # Leçons + quiz d'un module
├── projets/                 # Projets pratiques
├── tuteur/                  # Chat avec le tuteur AI
├── parametres/              # Clé API + reset progression
└── api/chat/                # Proxy sécurisé vers l'API Anthropic
components/                  # Navbar, QuizPlayer, Markdown
lib/                         # Curriculum, projets, progression, tuteur simulé
```
