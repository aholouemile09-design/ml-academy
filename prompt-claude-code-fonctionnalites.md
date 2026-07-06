# Prompt pour Claude Code — 6 fonctionnalités de suivi pédagogique (CodeGraft Academy)

> **Important — déploiement :** le site sera mis en ligne sur le domaine **Oltavia.ca** (production). Tiens-en compte pour toute URL absolue, métadonnée (`metadataBase`), configuration de cookies/auth, CORS, liens de partage, e-mails transactionnels et OpenGraph. Utilise `https://oltavia.ca` comme URL de production canonique.

## Contexte du projet

CodeGraft Academy est une école en ligne (ML/Data Science, Web Full Stack, préparation PMP) avec tuteur IA.

- **Stack :** Next.js 14 (App Router), React 18, Tailwind CSS (dark mode par classe, variables CSS `--ink-*`, accent indigo/cyan), déploiement Vercel.
- **Comptes utilisateurs déjà en place :** hook `useUserProgress` dans `lib/userProgress.js` (expose `user`, `displayName`, `colorId`, `xp`, `completedLessons`, `quizScores`, `completeLesson`, …), auth avec `/auth/logout`, avatars dans `lib/avatars.js`. La progression est persistée **par utilisateur** (pas seulement en localStorage).
- **Contenu des parcours :** `lib/curriculum.js` (ML), `lib/webdev.js` (Web), `lib/pmp.js` (PMP). Chaque module = `{ id, title, level, icon, description, lessons:[{id,title,duration,content}], quiz:[{q,options,answer,explain}] }`.
- **Composants clés :** `components/QuizPlayer.js`, `components/Markdown.js`, `components/Navbar.js`. Rendu markdown maison (gras, `code`, blocs ```` ``` ````) — pas de dépendance markdown externe.
- **Providers :** ThemeProvider > (auth/user) > Navbar dans `app/layout.js`.

## Contraintes globales (à respecter pour TOUTES les fonctionnalités)

1. **Ne rien casser de l'existant.** Réutilise `useUserProgress` et la couche de persistance par utilisateur déjà en place ; n'introduis pas de régression sur les parcours, quiz, XP, thème clair/sombre.
2. **Persistance serveur par utilisateur** (cross-appareil), pas du localStorage volatile, pour toute nouvelle donnée (révisions, maîtrise, objectifs, réflexions…). Aligne-toi sur le backend/auth déjà utilisé par `userProgress`. Prévois des migrations/tables ou collections propres.
3. **UI cohérente** avec le design existant : classes Tailwind + variables `ink-*`, boutons `.btn-primary`/`.btn-secondary`, cartes `.card`, accent indigo/cyan, **lisible en mode clair ET sombre** (pas de texte `text-slate-300` pâle non surchargé ; overlays d'image en couleur foncée fixe type `slate-950`, pas `ink-*`).
4. **Interface en français**, ton pédagogique et bienveillant.
5. **Accessibilité** : contrastes suffisants, `aria-label` sur les boutons d'icône, navigation clavier.
6. **Le tuteur IA ne fait jamais le travail à la place de l'apprenant** (règle existante) — toute fonctionnalité de feedback doit guider, jamais donner la solution d'un projet.
7. Chaque fonctionnalité doit **fonctionner pour les 3 parcours** (ML, Web, PMP) quand c'est pertinent, en s'appuyant sur les structures `quiz`/`lessons` communes.
8. Vérifie que `npm run build` passe sans erreur avant de considérer une tâche terminée.

---

## Fonctionnalité 1 — Répétition espacée + rappel actif (priorité MAX)

**But :** faire retenir durablement en re-testant les items à intervalles croissants.

- Nouvelle route `/reviser` (« Réviser aujourd'hui ») + entrée dans la navbar (groupe « Outils »).
- Modèle de données par utilisateur : pour chaque question de quiz vue, stocker `{ questionRef, easiness, interval, dueDate, lastResult, repetitions }`. Algorithme **SM-2 (ou Leitner à 5 boîtes)** simple et documenté.
- Alimentation automatique : quand un utilisateur répond à un quiz (via `QuizPlayer`), les questions ratées entrent dans la file de révision ; les réussies avancent d'un intervalle.
- Page `/reviser` : présente les questions **dues aujourd'hui** (toutes matières confondues), une par une, avec correction (`explain`) ; met à jour l'intervalle selon la réponse. Affiche « X cartes à réviser aujourd'hui » et un état « tout est à jour ✅ ».
- Widget « À réviser » sur le `/dashboard` avec le compte du jour + lien.

**Critères d'acceptation :** une question ratée réapparaît le lendemain ; une question réussie plusieurs fois revient à intervalle croissant ; la file est persistée par compte et synchronisée entre appareils.

## Fonctionnalité 2 — Maîtrise par sujet + indice de préparation à l'examen

**But :** suivre la *maîtrise* et non la simple *complétion*, et estimer la préparation.

- Calculer un **score de maîtrise par thème/domaine** à partir de l'historique des quiz (pondérer les tentatives récentes ; décroissance dans le temps pour refléter l'oubli). Pour le PMP : agréger par domaine **People / Process / Business** et par approche (prédictif / agile-hybride). Pour ML et Web : par module.
- **Carte de maîtrise** visuelle (vert ≥80 %, orange 50–79 %, rouge <50 %) sur `/dashboard` et en tête de chaque parcours.
- **Indice de préparation PMP** : sur `/pmp`, afficher une jauge basée sur les scores d'examen blanc et de quiz (ex. « ~68 % — vise 70 %+ stable sur 2–3 examens blancs avant de réserver »). Recommander les 2–3 thèmes les plus faibles avec liens directs vers les modules et vers `/reviser`.

**Critères d'acceptation :** la carte reflète les résultats réels ; les recommandations pointent vers les thèmes les plus faibles ; l'indice PMP change quand on refait un examen blanc.

## Fonctionnalité 3 — Objectifs, séries (streaks) et rappels planifiés

**But :** soutenir l'assiduité sur une roadmap longue.

- **Objectif hebdomadaire** paramétrable par l'utilisateur (ex. heures d'étude ou nb de leçons/quiz) dans `/parametres` ; barre de progression de la semaine sur `/dashboard`.
- **Série (streak)** : nb de jours consécutifs avec au moins une activité (leçon, quiz ou révision) ; afficher la série courante + record ; icône dans la navbar près de l'XP. Gérer proprement le fuseau horaire.
- **Rappels automatiques** : e-mail (via le fournisseur d'e-mail du projet ; sinon proposer Resend/SMTP en variable d'env) — rappel quotidien « ta session du jour » et alerte « ta série est en jeu » en fin de journée si aucune activité. Opt-in dans `/parametres`. Prévois un déclencheur planifié (cron Vercel `vercel.json` ou route API protégée par secret).

**Critères d'acceptation :** l'objectif et la série se mettent à jour en temps réel ; les rappels sont désactivables ; aucun e-mail sans opt-in.

## Fonctionnalité 4 — Boucle de feedback sur les projets (revue guidée, sans solution)

**But :** consolider l'apprentissage via un feedback structuré sur les projets, sans jamais livrer la solution.

- Sur la page d'un projet (`/projets`), ajouter un flux « **Soumettre pour feedback** » : l'apprenant colle un extrait de code ou une URL de repo GitHub public.
- Appel à l'API du tuteur (route existante style `/api/chat`) avec un **system prompt dédié « revue orientée feedback »** : renvoie des retours selon une **grille (rubrique)** — correction, lisibilité, structure, bonnes pratiques, tests — sous forme de questions et pistes d'amélioration. **Interdiction absolue de donner le code de solution** (réutiliser la règle existante).
- **Auto-évaluation guidée** : avant le feedback IA, l'apprenant remplit une courte rubrique (cases à cocher) pour l'inciter à réfléchir d'abord.
- Historiser les soumissions et retours par utilisateur et par projet.

**Critères d'acceptation :** le feedback ne contient jamais la solution complète ; la rubrique est remplie avant l'appel IA ; l'historique est consultable.

## Fonctionnalité 5 — Métacognition : confiance + réflexion

**But :** provoquer un traitement plus profond et améliorer la calibration.

- **Niveau de confiance** dans `QuizPlayer` : avant de valider chaque question, l'apprenant indique sa confiance (ex. Faible / Moyenne / Élevée). Détecter les cas « confiant mais faux » et les prioriser dans la révision (fonctionnalité 1) + les signaler dans un mini-rapport de calibration en fin de quiz.
- **Question de réflexion** en fin de module : 1–2 prompts ouverts (« Qu'est-ce qui a été le plus difficile ? », « Où vas-tu appliquer ceci ? »). Réponses sauvegardées dans un **journal d'apprentissage** consultable (nouvelle page `/journal` ou section du dashboard).

**Critères d'acceptation :** la confiance est enregistrée par question et influence la file de révision ; les réflexions sont persistées et relisibles.

## Fonctionnalité 6 — Générateur de plan d'étude personnalisé

**But :** transformer la roadmap en tâches concrètes du jour.

- Formulaire : parcours visé (ML / Web / PMP), **date d'examen ou date cible**, **heures dispo/semaine**, jours préférés.
- Générer un **planning daté** (répartition des modules/leçons/quiz + créneaux de révision espacée), en tenant compte des durées de leçons existantes (`lesson.duration`) et de l'ordre pédagogique des modules.
- Afficher le plan dans une vue calendrier/liste ; permettre l'export **.ics** et, si un connecteur Google Calendar est disponible, l'ajout d'événements. Recalculer le plan si l'utilisateur prend du retard.
- Intégrer avec le calendrier personnel existant (`/calendrier` / « Mon Espace »).

**Critères d'acceptation :** un plan cohérent est produit à partir des entrées ; la date cible est respectée ou un avertissement s'affiche si le rythme est irréaliste ; export .ics fonctionnel.

---

## Ordre de mise en œuvre recommandé

1. Fonctionnalité **1 (répétition espacée)** — meilleur rapport impact/effort, sert les 3 parcours.
2. Fonctionnalité **2 (maîtrise + préparation)** — s'appuie sur les données de quiz/1.
3. Fonctionnalité **5 (confiance + réflexion)** — petite, alimente 1 et 2.
4. Fonctionnalité **3 (objectifs, série, rappels)**.
5. Fonctionnalité **6 (plan personnalisé)**.
6. Fonctionnalité **4 (feedback projets)**.

Travaille fonctionnalité par fonctionnalité, avec un commit clair par étape, en vérifiant `npm run build` à chaque fois. Propose d'abord un court plan technique (modèle de données + routes + composants) avant de coder chaque fonctionnalité.
