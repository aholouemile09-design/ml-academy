// Parcours complet : du débutant à l'avancé.
// Chaque module : leçons (contenu markdown simplifié) + quiz.

import { EXERCISES } from "./exercises.js";

export const LEVELS = {
  debutant: { label: "Débutant", color: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/30" },
  intermediaire: { label: "Intermédiaire", color: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/30" },
  avance: { label: "Avancé", color: "text-rose-400", badge: "bg-rose-500/10 border-rose-500/30" },
};

export const CURRICULUM = [
  // ── MODULE 0 : SETUP ─────────────────────────────────────────────────────
  {
    id: "setup-pro",
    title: "Setup Pro & Outils du Développeur",
    level: "debutant",
    icon: "⚙️",
    description:
      "Environnement professionnel dès le premier jour : terminal, Git/GitHub, venv Python, PyCharm/VS Code. Le socle de tout ce qui suit.",
    lessons: [
      {
        id: "setup-1",
        title: "Terminal & ligne de commande",
        duration: "40 min",
      },
      {
        id: "setup-2",
        title: "Git & GitHub professionnel",
        duration: "55 min",
      },
      {
        id: "setup-3",
        title: "Environnement Python : venv, pip, PyCharm",
        duration: "45 min",
      },
    ],
    quiz: [
      {
        q: "Quelle commande affiche le dossier courant dans le terminal ?",
        options: ["ls", "cd", "pwd", "mkdir"],
        answer: 2,
        explain: "pwd (print working directory) affiche le chemin absolu du dossier courant.",
      },
      {
        q: "Pourquoi utiliser un environnement virtuel Python ?",
        options: [
          "Pour aller plus vite",
          "Isoler les dépendances de chaque projet et éviter les conflits",
          "Réduire la taille des fichiers",
          "C'est obligatoire pour Python 3",
        ],
        answer: 1,
        explain: "Chaque projet peut avoir ses propres versions de bibliothèques sans conflits.",
      },
      {
        q: "Que fait git commit -m 'feat: add model' ?",
        options: [
          "Envoie le code sur GitHub",
          "Crée un point de sauvegarde local avec un message descriptif",
          "Crée une nouvelle branche",
          "Télécharge les dernières modifications",
        ],
        answer: 1,
        explain: "commit crée un snapshot local. git push est l'étape suivante pour envoyer sur GitHub.",
      },
      {
        q: "Quel fichier doit-on TOUJOURS inclure dans un repo GitHub de projet ML ?",
        options: [".venv/", "data/ complet", "requirements.txt + README.md", "Tous les .csv"],
        answer: 2,
        explain: "requirements.txt permet la reproductibilité. README explique le projet. Les données sont trop lourdes pour git.",
      },
    ],
  },
  {
    id: "python",
    title: "Python pour la Data Science",
    level: "debutant",
    icon: "🐍",
    description:
      "Les fondations : syntaxe Python, structures de données, NumPy et Pandas. Indispensable avant tout ML.",
    lessons: [
      {
        id: "py-1",
        title: "Bases de Python",
        duration: "45 min",
      },
      {
        id: "py-2",
        title: "Structures de données et compréhensions",
        duration: "40 min",
      },
      {
        id: "py-3",
        title: "NumPy : calcul vectoriel",
        duration: "50 min",
      },
      {
        id: "py-4",
        title: "Pandas : manipulation de données",
        duration: "55 min",
      },
    ],
    quiz: [
      {
        q: "Quelle structure Python associe des clés à des valeurs ?",
        options: ["Liste", "Tuple", "Dictionnaire", "Ensemble"],
        answer: 2,
        explain: "Le dictionnaire stocke des paires clé→valeur, ex. {'maths': 15}.",
      },
      {
        q: "Que retourne [x*2 for x in range(3)] ?",
        options: ["[0, 1, 2]", "[0, 2, 4]", "[2, 4, 6]", "[1, 2, 3]"],
        answer: 1,
        explain: "range(3) donne 0,1,2 — chacun multiplié par 2 : [0, 2, 4].",
      },
      {
        q: "Pourquoi la vectorisation NumPy est-elle plus rapide qu'une boucle Python ?",
        options: [
          "Elle utilise plus de mémoire",
          "Le calcul est délégué à du code C optimisé",
          "Elle compresse les données",
          "Elle s'exécute sur le GPU par défaut",
        ],
        answer: 1,
        explain: "NumPy exécute les opérations en C compilé, évitant l'interpréteur Python à chaque élément.",
      },
      {
        q: "Quelle méthode Pandas regroupe les lignes par catégorie ?",
        options: ["df.merge()", "df.groupby()", "df.sort_values()", "df.apply()"],
        answer: 1,
        explain: "groupby() segmente le DataFrame par valeurs d'une colonne pour agréger ensuite.",
      },
    ],
  },
  // ── MODULE : SQL ─────────────────────────────────────────────────────────
  {
    id: "sql-databases",
    title: "SQL & Bases de Données",
    level: "debutant",
    icon: "🗄️",
    description:
      "SQL est indispensable en Data Science et ML Engineering. Interroger, transformer et modéliser des données relationnelles avec PostgreSQL.",
    lessons: [
      {
        id: "sql-1",
        title: "Fondamentaux SQL",
        duration: "50 min",
      },
      {
        id: "sql-2",
        title: "Jointures & requêtes avancées",
        duration: "55 min",
      },
      {
        id: "sql-3",
        title: "PostgreSQL & connexion Python",
        duration: "50 min",
      },
    ],
    quiz: [
      {
        q: "Quelle clause SQL filtre APRÈS un GROUP BY ?",
        options: ["WHERE", "HAVING", "FILTER", "LIMIT"],
        answer: 1,
        explain: "WHERE filtre les lignes avant agrégation, HAVING filtre les groupes après.",
      },
      {
        q: "Qu'est-ce qu'un LEFT JOIN ?",
        options: [
          "Toutes les lignes de la table droite",
          "Toutes les lignes de la table gauche, avec NULL si pas de correspondance à droite",
          "Seulement les lignes qui matchent dans les deux tables",
          "Une jointure sur la colonne la plus à gauche",
        ],
        answer: 1,
        explain: "LEFT JOIN conserve toutes les lignes de la table de gauche, même sans correspondance.",
      },
      {
        q: "À quoi sert une CTE (WITH ... AS) ?",
        options: [
          "Créer une table permanente",
          "Sauvegarder la requête dans un fichier",
          "Nommer une sous-requête pour la rendre lisible et réutilisable",
          "Accélérer automatiquement la requête",
        ],
        answer: 2,
        explain: "La CTE est une sous-requête nommée, exécutée une fois et réutilisable dans la requête principale.",
      },
      {
        q: "Pourquoi PostgreSQL supporte-t-il le type JSONB ?",
        options: [
          "Pour stocker des images",
          "Pour stocker des données semi-structurées et les requêter efficacement",
          "Pour accélérer les jointures",
          "Pour remplacer les VARCHAR",
        ],
        answer: 1,
        explain: "JSONB permet de stocker des données flexibles (comme des features ML) tout en restant requêtable.",
      },
    ],
  },
  {
    id: "maths",
    title: "Mathématiques pour le ML",
    level: "debutant",
    icon: "📐",
    description:
      "Algèbre linéaire, calcul différentiel, probabilités et statistiques — le langage dans lequel le ML est écrit.",
    lessons: [
      {
        id: "math-1",
        title: "Algèbre linéaire : vecteurs et matrices",
        duration: "60 min",
        resources: [
          { type: "video", title: "Essence of Linear Algebra (série complète)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", author: "3Blue1Brown", description: "La meilleure introduction visuelle à l'algèbre linéaire — animée, intuitive, gratuite." },
          { type: "book", title: "Mathematics for Machine Learning", url: "https://mml-book.github.io/", author: "Deisenroth, Faisal, Ong", description: "PDF gratuit — le livre de référence mathématiques pour le ML, chapitres 2 et 3 pour l'algèbre linéaire." },
          { type: "exercise", title: "Khan Academy — Algèbre linéaire", url: "https://fr.khanacademy.org/math/linear-algebra", description: "Exercices interactifs progressifs, du vecteur à la décomposition spectrale." },
        ],
      },
      {
        id: "math-2",
        title: "Calcul différentiel et gradients",
        duration: "60 min",
        resources: [
          { type: "video", title: "What is backpropagation really doing?", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", author: "3Blue1Brown", description: "Visualisation parfaite de la rétropropagation et des gradients — 14 min." },
          { type: "video", title: "The spelled-out intro to neural networks and backpropagation", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", author: "Andrej Karpathy", description: "Implémentation micrograd from scratch — comprendre vraiment le calcul des gradients." },
        ],
      },
      {
        id: "math-3",
        title: "Probabilités et statistiques",
        duration: "55 min",
      },
      {
        id: "math-4",
        title: "Décomposition SVD et réduction de dimension",
        duration: "60 min",
        resources: [
          { type: "video", title: "Singular Value Decomposition (SVD)", url: "https://www.youtube.com/watch?v=nbBvuuNVfco", author: "Steve Brunton (UW)", description: "Cours universitaire complet sur la SVD — rigoureux et visuel." },
          { type: "video", title: "StatQuest: PCA Step-by-Step", url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", author: "StatQuest / Josh Starmer", description: "Explication pas à pas de la PCA, lien avec la SVD, sans jargon inutile." },
        ],
      },
      {
        id: "math-5",
        title: "Distributions statistiques essentielles",
        duration: "55 min",
      },
      {
        id: "math-6",
        title: "Tests d'hypothèses et intervalles de confiance",
        duration: "60 min",
        resources: [
          { type: "video", title: "StatQuest: Hypothesis Testing and p-values", url: "https://www.youtube.com/watch?v=vemZtEM63GY", author: "StatQuest / Josh Starmer", description: "L'explication la plus claire de la p-value sur YouTube — incontournable." },
          { type: "paper", title: "Statistical Comparisons of Classifiers over Multiple Data Sets", url: "https://www.jmlr.org/papers/volume7/demsar06a/demsar06a.pdf", author: "Janez Demšar (JMLR 2006)", description: "La référence académique pour comparer des algorithmes ML correctement — Wilcoxon, Friedman, Nemenyi." },
        ],
      },
    ],
    quiz: [
      {
        q: "Que représente le gradient d'une fonction de coût ?",
        options: [
          "La valeur minimale de la fonction",
          "La direction de plus forte augmentation",
          "Le nombre de paramètres du modèle",
          "L'erreur moyenne du modèle",
        ],
        answer: 1,
        explain: "Le gradient pointe vers la plus forte montée — on descend donc dans la direction opposée pour minimiser.",
      },
      {
        q: "Dans θ ← θ - α∇L(θ), que contrôle α ?",
        options: ["Le nombre d'itérations", "La taille du pas d'apprentissage", "La régularisation", "Le nombre de couches"],
        answer: 1,
        explain: "α est le learning rate : la taille du pas effectué à chaque mise à jour.",
      },
      {
        q: "Quelle règle mathématique fonde la rétropropagation ?",
        options: ["Théorème de Bayes", "Règle de la chaîne", "Loi des grands nombres", "Théorème central limite"],
        answer: 1,
        explain: "La rétropropagation applique la règle de la chaîne pour propager les gradients couche par couche.",
      },
      {
        q: "Que dit le théorème de Bayes ?",
        options: [
          "P(A|B) = P(B|A)P(A)/P(B)",
          "P(A∩B) = P(A)P(B) toujours",
          "E[X+Y] = E[X]E[Y]",
          "Var(X) = E[X]²",
        ],
        answer: 0,
        explain: "Bayes permet d'inverser une probabilité conditionnelle — fondement du raisonnement probabiliste.",
      },
      {
        q: "Dans la décomposition SVD A = UΣVᵀ, que représentent les valeurs singulières dans Σ ?",
        options: [
          "Les valeurs propres de A",
          "L'importance de chaque composante — les plus grandes capturent le plus d'information",
          "Les angles entre les vecteurs propres",
          "Les erreurs de reconstruction",
        ],
        answer: 1,
        explain: "Les valeurs singulières σ₁ ≥ σ₂ ≥ ... mesurent l'importance de chaque direction. En gardant les k plus grandes, on obtient la meilleure approximation de rang k — c'est le principe de la PCA et de la compression.",
      },
      {
        q: "Pourquoi la loi normale est-elle si omniprésente en ML ?",
        options: [
          "Parce qu'elle est toujours exacte",
          "Le Théorème Central Limite garantit que la somme de variables indépendantes converge vers elle",
          "Elle est la seule distribution continue",
          "Elle minimise l'entropie",
        ],
        answer: 1,
        explain: "Le TCL explique pourquoi la gaussienne apparaît partout : bruits, erreurs de mesure, moyennes — tous convergent vers elle. C'est pourquoi l'initialisation des poids, les hypothèses de régression et les intervalles de confiance utilisent la normale.",
      },
      {
        q: "Tu compares deux modèles sur les mêmes 10 folds de cross-validation. Quel test utiliser ?",
        options: [
          "Test Chi-²",
          "Test t indépendant (Welch)",
          "Test t apparié",
          "Test de Shapiro-Wilk",
        ],
        answer: 2,
        explain: "Les deux modèles sont évalués sur les mêmes données → les erreurs sont corrélées fold par fold → test t apparié (ou Wilcoxon si non-normal). Le test t indépendant supposerait des échantillons indépendants, ce qui est faux ici.",
      },
    ],
  },
  // ── MODULE : EDA & VISUALISATION ─────────────────────────────────────────
  {
    id: "eda-visualisation",
    title: "EDA & Visualisation des Données",
    level: "intermediaire",
    icon: "📊",
    description:
      "Avant tout modèle, il faut comprendre ses données. L'analyse exploratoire (EDA) révèle les patterns, anomalies et relations cachées. Matplotlib, Seaborn et Plotly sont les outils standard de tout data scientist.",
    lessons: [
      {
        id: "eda-1",
        title: "Matplotlib & Seaborn : visualiser pour comprendre",
        duration: "60 min",
      },
      {
        id: "eda-2",
        title: "Plotly : visualisations interactives",
        duration: "45 min",
      },
      {
        id: "eda-3",
        title: "Workflow EDA complet : de la donnée brute au rapport",
        duration: "65 min",
      },
    ],
    quiz: [
      {
        q: "Lors d'une EDA, tu remarques que ta variable cible (classification binaire) est à 95% de la classe 0. Que dois-tu faire ?",
        options: [
          "Rien, le modèle s'adaptera automatiquement",
          "Utiliser accuracy comme métrique principale",
          "Signaler le déséquilibre et envisager class_weight, SMOTE, ou des métriques comme F1/AUC-ROC",
          "Supprimer les exemples de la classe 1",
        ],
        answer: 2,
        explain: "Un dataset déséquilibré (95/5) rend accuracy trompeuse — un modèle qui prédit toujours 0 aurait 95% d'accuracy. F1 et AUC-ROC mesurent la vraie performance.",
      },
      {
        q: "Quelle visualisation est la plus utile pour identifier rapidement les corrélations entre toutes les variables numériques ?",
        options: ["Histogramme", "Scatter plot", "Heatmap de corrélation", "Violin plot"],
        answer: 2,
        explain: "La heatmap (sns.heatmap(df.corr())) montre toutes les corrélations pair-à-pair en un coup d'œil — essentielle pour détecter la multicolinéarité et les features importantes.",
      },
      {
        q: "Un skewness de +2.5 sur ta variable cible signifie :",
        options: [
          "La distribution est parfaitement symétrique",
          "La distribution est fortement asymétrique vers la droite — envisager une transformation log ou sqrt",
          "Il y a 2.5% de valeurs manquantes",
          "Les features sont trop corrélées",
        ],
        answer: 1,
        explain: "Un skewness > 1 indique une longue queue à droite. Les modèles linéaires et réseaux de neurones sont sensibles à ça — log(1+y) ou sqrt(y) normalisent souvent efficacement.",
      },
      {
        q: "Quelle est la règle IQR pour détecter les outliers ?",
        options: [
          "Valeurs à plus de 2 écarts-types de la moyenne",
          "Valeurs en dessous de Q1 - 1.5*IQR ou au-dessus de Q3 + 1.5*IQR",
          "Valeurs en dehors de [min, max]",
          "Valeurs manquantes imputées à la médiane",
        ],
        answer: 1,
        explain: "La règle IQR (Tukey) est robuste car elle utilise les quartiles plutôt que la moyenne — moins sensible aux valeurs extrêmes elles-mêmes.",
      },
    ],
  },

  // ── MODULE : FEATURE ENGINEERING ─────────────────────────────────────────
  {
    id: "feature-engineering",
    title: "Feature Engineering",
    level: "intermediaire",
    icon: "🔧",
    description:
      "Le feature engineering est la compétence qui sépare les bons data scientists des grands. Encoder, scaler, imputer, créer de nouvelles variables — c'est ici que se jouent 80% des gains de performance d'un modèle.",
    lessons: [
      {
        id: "fe-1",
        title: "Encodage des variables catégorielles",
        duration: "55 min",
      },
      {
        id: "fe-2",
        title: "Scaling, imputation et gestion des outliers",
        duration: "55 min",
      },
      {
        id: "fe-3",
        title: "Création de features et sélection de variables",
        duration: "60 min",
      },
    ],
    quiz: [
      {
        q: "Tu as une variable 'niveau_éducation' avec les valeurs : Lycée, Licence, Master, Doctorat. Quel encodage utiliser ?",
        options: [
          "One-Hot Encoding — 4 colonnes binaires",
          "Ordinal Encoding — car il y a un ordre naturel",
          "Target Encoding — car haute cardinalité",
          "Laisser en texte — les arbres gèrent ça",
        ],
        answer: 1,
        explain: "Lycée < Licence < Master < Doctorat : il y a un ordre ordinal naturel. L'Ordinal Encoding préserve cet ordre (0,1,2,3) et évite de créer 4 colonnes inutilement.",
      },
      {
        q: "Pourquoi ne jamais appeler .fit_transform() sur le jeu de test ?",
        options: [
          "C'est trop lent",
          "Sklearn l'interdit syntaxiquement",
          "Le scaler/imputer apprendrait des statistiques du test, introduisant du data leakage (fuite d'information du futur)",
          "Il faut utiliser transform() pour des raisons de mémoire",
        ],
        answer: 2,
        explain: "Le data leakage est l'ennemi n°1 en ML. Fitté sur le test, ton preprocesseur utilise des informations que le modèle ne devrait pas voir à l'inférence — les métriques sont alors trop optimistes.",
      },
      {
        q: "Parmi les algorithmes suivants, lequel nécessite impérativement un scaling des features ?",
        options: [
          "Random Forest",
          "XGBoost",
          "Support Vector Machine (SVM) avec kernel RBF",
          "Decision Tree",
        ],
        answer: 2,
        explain: "SVM (et aussi KNN, régression linéaire, réseaux de neurones) calcule des distances ou des produits scalaires — sensible aux échelles. Les arbres de décision et leurs ensembles (RF, XGBoost) sont invariants au scaling.",
      },
      {
        q: "Qu'est-ce que les SHAP values mesurent ?",
        options: [
          "La corrélation entre les features et la cible",
          "La contribution individuelle de chaque feature à chaque prédiction spécifique du modèle",
          "L'importance de feature globale par permutation",
          "Le nombre optimal de features à sélectionner",
        ],
        answer: 1,
        explain: "SHAP (SHapley Additive exPlanations) explique CHAQUE prédiction : pour cet exemple précis, chaque feature a contribué de +X ou -X à la prédiction. C'est le gold standard d'interprétabilité.",
      },
    ],
  },

  {
    id: "ml-classique",
    title: "Machine Learning classique",
    level: "intermediaire",
    icon: "🤖",
    description:
      "Régression, classification, arbres, SVM, clustering. Le socle conceptuel : scikit-learn en pratique.",
    lessons: [
      {
        id: "ml-1",
        title: "Le paradigme du ML supervisé",
        duration: "50 min",
      },
      {
        id: "ml-2",
        title: "Régression linéaire et logistique",
        duration: "55 min",
      },
      {
        id: "ml-3",
        title: "Arbres de décision et forêts aléatoires",
        duration: "55 min",
      },
      {
        id: "ml-3b",
        title: "XGBoost & LightGBM : l'état de l'art sur données tabulaires",
        duration: "65 min",
        resources: [
          { type: "paper", title: "XGBoost: A Scalable Tree Boosting System", url: "https://arxiv.org/abs/1603.02754", author: "Chen & Guestrin (KDD 2016)", description: "Le paper original de XGBoost — comprendre les fondements mathématiques du gradient boosting." },
          { type: "paper", title: "LightGBM: A Highly Efficient Gradient Boosting Decision Tree", url: "https://proceedings.neurips.cc/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html", author: "Ke et al. (NeurIPS 2017)", description: "Le paper LightGBM — GOSS et EFB expliqués, pourquoi c'est plus rapide qu'XGBoost." },
          { type: "doc", title: "Documentation officielle XGBoost", url: "https://xgboost.readthedocs.io/en/stable/parameter.html", description: "Liste complète des hyperparamètres avec explications — la référence pour le tuning." },
          { type: "doc", title: "Documentation officielle Optuna", url: "https://optuna.readthedocs.io/en/stable/", description: "Guides et exemples Optuna, notamment l'intégration avec XGBoost et LightGBM." },
          { type: "exercise", title: "Kaggle — Intermediate Machine Learning", url: "https://www.kaggle.com/learn/intermediate-machine-learning", description: "Micro-cours Kaggle gratuit avec notebooks XGBoost — validation croisée, feature engineering." },
        ],
      },
      {
        id: "ml-4",
        title: "Évaluation : métriques et validation",
        duration: "50 min",
      },
      {
        id: "ml-5",
        title: "Apprentissage non supervisé",
        duration: "45 min",
      },
    ],
    quiz: [
      {
        q: "Un modèle a 99% d'accuracy sur le train et 70% sur le test. Diagnostic ?",
        options: ["Sous-apprentissage", "Surapprentissage", "Data leakage", "Modèle optimal"],
        answer: 1,
        explain: "Grand écart train/test = le modèle mémorise au lieu de généraliser : surapprentissage.",
      },
      {
        q: "Pour détecter une maladie rare, quelle métrique privilégier ?",
        options: ["Accuracy", "Précision", "Rappel", "MSE"],
        answer: 2,
        explain: "Manquer un malade (faux négatif) est grave : on maximise le rappel.",
      },
      {
        q: "Quelle est la différence clé entre Random Forest et Gradient Boosting ?",
        options: [
          "RF utilise des réseaux de neurones",
          "RF entraîne les arbres en parallèle, le boosting séquentiellement",
          "Le boosting ne fonctionne qu'en régression",
          "RF nécessite un GPU",
        ],
        answer: 1,
        explain: "Bagging = arbres indépendants en parallèle ; boosting = chaque arbre corrige le précédent.",
      },
      {
        q: "À quoi sert la PCA ?",
        options: [
          "Classifier des images",
          "Réduire la dimension en conservant la variance maximale",
          "Augmenter le nombre de features",
          "Équilibrer les classes",
        ],
        answer: 1,
        explain: "La PCA projette sur les axes principaux de variance : moins de dimensions, information préservée.",
      },
      {
        q: "Pourquoi sépare-t-on validation et test ?",
        options: [
          "Pour aller plus vite",
          "Le test sert à régler les hyperparamètres",
          "Régler les hyperparamètres sur le test biaiserait l'estimation finale",
          "C'est une convention sans importance",
        ],
        answer: 2,
        explain: "Si on optimise sur le test, il ne mesure plus la généralisation : il faut un jeu vierge.",
      },
      {
        q: "Quelle est la différence principale entre XGBoost et LightGBM en termes de stratégie de split ?",
        options: [
          "XGBoost utilise leaf-wise, LightGBM utilise depth-wise",
          "XGBoost utilise depth-wise, LightGBM utilise leaf-wise",
          "Les deux utilisent la même stratégie",
          "LightGBM n'utilise pas d'arbres de décision",
        ],
        answer: 1,
        explain: "XGBoost = depth-wise (croissance niveau par niveau). LightGBM = leaf-wise (choisit toujours la feuille qui réduit le plus la perte), d'où sa supériorité en vitesse.",
      },
      {
        q: "Pourquoi Optuna est-il préférable à GridSearchCV pour tuner XGBoost ?",
        options: [
          "Optuna explore l'espace aléatoirement sans mémoire",
          "Optuna utilise une recherche bayésienne qui apprend des essais précédents",
          "GridSearchCV ne supporte pas XGBoost",
          "Optuna est plus simple à installer",
        ],
        answer: 1,
        explain: "La recherche bayésienne d'Optuna concentre les essais dans les zones prometteuses — bien plus efficace qu'une grille exhaustive ou qu'un random search aveugle.",
      },
    ],
  },
  {
    id: "series-temporelles",
    title: "Séries temporelles",
    level: "intermediaire",
    icon: "📈",
    description:
      "Prévisions et analyse de séries temporelles : ARIMA, Prophet, LightGBM et validation temporelle correcte.",
    lessons: [
      {
        id: "st-1",
        title: "Concepts fondamentaux des séries temporelles",
        duration: "50 min",
        resources: [
          { type: "book", title: "Forecasting: Principles and Practice — Décomposition", url: "https://otexts.com/fpp3/decomposition.html", author: "Hyndman & Athanasopoulos", description: "Le chapitre de référence sur la décomposition : moyennes mobiles, STL, saisonnalité évolutive. Gratuit en ligne." },
          { type: "book", title: "Forecasting: Principles and Practice — Évaluer une prévision", url: "https://otexts.com/fpp3/accuracy.html", author: "Hyndman & Athanasopoulos", description: "Les références naïves, le MASE et l'évaluation par horizon, par les auteurs qui ont défini la métrique." },
          { type: "paper", title: "Another look at measures of forecast accuracy", url: "https://robjhyndman.com/papers/mase.pdf", author: "Hyndman & Koehler (2006)", description: "L'article qui introduit le MASE et démonte les métriques en pourcentage. Court et décisif." },
          { type: "doc", title: "statsmodels — décomposition STL", url: "https://www.statsmodels.org/stable/examples/notebooks/generated/stl_decomposition.html", description: "Notebook officiel STL : robustesse aux aberrants, saisonnalité qui évolue, comparaison avec seasonal_decompose." },
        ],
      },
      {
        id: "st-2",
        title: "ARIMA et SARIMA : modèles statistiques",
        duration: "55 min",
        resources: [
          { type: "book", title: "Forecasting: Principles and Practice (3rd ed.)", url: "https://otexts.com/fpp3/", author: "Hyndman & Athanasopoulos", description: "Le livre de référence absolu sur les séries temporelles — entièrement gratuit en ligne, exemples en R mais les concepts sont universels." },
          { type: "doc", title: "statsmodels — Time Series Analysis", url: "https://www.statsmodels.org/stable/tsa.html", description: "Documentation officielle statsmodels pour ARIMA, SARIMA, SARIMAX et les tests de stationnarité." },
        ],
      },
      {
        id: "st-3",
        title: "Prophet : prévisions à grande échelle",
        duration: "55 min",
        resources: [
          { type: "paper", title: "Forecasting at Scale (Prophet)", url: "https://peerj.com/preprints/3190/", author: "Taylor & Letham, Meta (2017)", description: "Le paper original de Prophet — modèle, hypothèses et cas d'usage à l'échelle de Facebook." },
          { type: "doc", title: "Documentation officielle Prophet", url: "https://meta.github.io/prophet/docs/quick_start.html", description: "Quickstart et guides avancés : saisonnalités, jours fériés, régresseurs, diagnostics." },
          { type: "doc", title: "Prophet — diagnostics et validation croisée", url: "https://meta.github.io/prophet/docs/diagnostics.html", description: "cross_validation, performance_metrics et la lecture des erreurs par horizon — la page qui dit ce que vaut vraiment un modèle Prophet." },
        ],
      },
      {
        id: "st-4",
        title: "LightGBM sur séries temporelles : l'approche ML",
        duration: "60 min",
        resources: [
          { type: "doc", title: "scikit-learn — TimeSeriesSplit", url: "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html", description: "La référence du découpage glissant, et le paramètre gap qu'on oublie de régler à l'horizon de production." },
          { type: "doc", title: "LightGBM — liste des paramètres", url: "https://lightgbm.readthedocs.io/en/stable/Parameters.html", description: "Paramètres officiels, dont importance_type, linear_tree et le traitement natif des variables catégorielles." },
          { type: "exercise", title: "Kaggle — Store Sales, Time Series Forecasting", url: "https://www.kaggle.com/competitions/store-sales-time-series-forecasting", description: "Compétition d'entraînement à séries multiples : des centaines de séries magasin-produit, promotions et jours fériés. Le terrain naturel d'un modèle global." },
        ],
      },
    ],
    quiz: [
      {
        q: "Pourquoi ne faut-il jamais utiliser train_test_split aléatoire sur une série temporelle ?",
        options: [
          "Pour des raisons de performance uniquement",
          "Cela crée un data leakage : le modèle verrait des données futures pendant l'entraînement",
          "train_test_split ne supporte pas les dates",
          "Les séries temporelles ne peuvent pas être splittées",
        ],
        answer: 1,
        explain: "Un split aléatoire laisse des données du futur dans le train set : le modèle apprend à 'voir' ce qui n'est pas encore arrivé, ce qui fausse complètement l'évaluation.",
      },
      {
        q: "Dans ARIMA(p, d, q), à quoi sert le paramètre d ?",
        options: [
          "L'ordre des lags autorégressifs",
          "Le nombre de termes de moyenne mobile",
          "Le nombre de différenciations pour rendre la série stationnaire",
          "La période saisonnière",
        ],
        answer: 2,
        explain: "d est l'ordre d'intégration (Integrated dans ARIMA) : différencier d fois la série la rend stationnaire. d=1 élimine une tendance linéaire.",
      },
      {
        q: "Quel avantage principal offre Prophet par rapport à ARIMA pour des données métier ?",
        options: [
          "Prophet est plus rapide sur grandes séries",
          "Prophet gère nativement plusieurs saisonnalités et les jours fériés",
          "Prophet nécessite moins de données",
          "Prophet utilise un GPU",
        ],
        answer: 1,
        explain: "Prophet est conçu pour les cas réels : saisonnalité hebdomadaire + annuelle, jours fériés par pays, et événements spéciaux — sans configuration statistique complexe.",
      },
      {
        q: "Lors de la création de features pour LightGBM sur une série temporelle, pourquoi utilise-t-on shift(1) avant le rolling ?",
        options: [
          "Pour normaliser les données",
          "Pour éviter le data leakage : utiliser la valeur du jour même pour prédire ce même jour",
          "shift(1) est une convention de LightGBM",
          "Pour convertir les dates en entiers",
        ],
        answer: 1,
        explain: "Sans shift(1), la rolling_mean_7 inclut la valeur actuelle dans le calcul — le modèle apprend depuis le futur. Le shift garantit qu'on n'utilise que des informations disponibles au moment de la prédiction.",
      },
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    level: "intermediaire",
    icon: "🧠",
    description:
      "Réseaux de neurones, rétropropagation, CNN, RNN et l'entraînement avec PyTorch.",
    lessons: [
      {
        id: "dl-1",
        title: "Le neurone artificiel et les réseaux",
        duration: "55 min",
        resources: [
          { type: "course", title: "Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", author: "Andrej Karpathy", description: "La série la plus complète pour comprendre les réseaux de neurones from scratch — code Python pur, pas de magie." },
          { type: "video", title: "But what is a neural network?", url: "https://www.youtube.com/watch?v=aircAruvnKk", author: "3Blue1Brown", description: "Visualisation intuitive des réseaux de neurones — le meilleur point de départ absolu." },
          { type: "book", title: "Deep Learning (Goodfellow, Bengio, Courville)", url: "https://www.deeplearningbook.org/", description: "Le livre de référence académique — PDF gratuit en ligne. Chapitres 6 et 7 pour les bases des réseaux." },
        ],
      },
      {
        id: "dl-2",
        title: "Entraînement : rétropropagation et optimisation",
        duration: "60 min",
        resources: [
          { type: "video", title: "Backpropagation calculus", url: "https://www.youtube.com/watch?v=tIeHLnjs5U8", author: "3Blue1Brown", description: "La dérivation mathématique complète de la rétropropagation, visualisée." },
          { type: "paper", title: "Adam: A Method for Stochastic Optimization", url: "https://arxiv.org/abs/1412.6980", author: "Kingma & Ba (2014)", description: "Le paper d'Adam — l'optimiseur par défaut de quasiment tous les réseaux modernes." },
          { type: "doc", title: "PyTorch — Autograd: Automatic Differentiation", url: "https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html", description: "Comment PyTorch calcule les gradients automatiquement — tutorial officiel." },
        ],
      },
      {
        id: "dl-3",
        title: "Réseaux convolutifs (CNN)",
        duration: "55 min",
        resources: [
          { type: "course", title: "CS231n: Convolutional Neural Networks for Visual Recognition", url: "https://cs231n.github.io/", author: "Stanford University", description: "Le cours de référence sur les CNN — notes de cours complètes et gratuites en ligne." },
          { type: "video", title: "But what is a convolution?", url: "https://www.youtube.com/watch?v=KuXjwB4LzSA", author: "3Blue1Brown", description: "L'opération de convolution expliquée visuellement — 23 min." },
        ],
      },
      {
        id: "dl-4",
        title: "Séquences : RNN et LSTM",
        duration: "50 min",
      },
    ],
    quiz: [
      {
        q: "Pourquoi une fonction d'activation non linéaire est-elle indispensable ?",
        options: [
          "Pour accélérer le calcul",
          "Sans elle, le réseau équivaut à une seule transformation linéaire",
          "Pour réduire la mémoire utilisée",
          "Pour éviter le data leakage",
        ],
        answer: 1,
        explain: "La composition de fonctions linéaires reste linéaire : la non-linéarité donne sa puissance au réseau.",
      },
      {
        q: "Dans la boucle PyTorch, que fait loss.backward() ?",
        options: [
          "Met à jour les poids",
          "Calcule les gradients par rétropropagation",
          "Remet les gradients à zéro",
          "Évalue le modèle sur le test",
        ],
        answer: 1,
        explain: "backward() calcule les gradients ; c'est optimizer.step() qui met à jour les poids.",
      },
      {
        q: "Quel est l'avantage principal de la convolution sur une couche dense pour les images ?",
        options: [
          "Elle est plus précise mathématiquement",
          "Partage des poids et exploitation de la structure locale → beaucoup moins de paramètres",
          "Elle ne nécessite pas d'activation",
          "Elle fonctionne sans GPU",
        ],
        answer: 1,
        explain: "Un filtre 3×3 réutilisé partout détecte des motifs locaux avec très peu de paramètres.",
      },
      {
        q: "Quel problème le LSTM résout-il par rapport au RNN simple ?",
        options: [
          "Le surapprentissage",
          "L'évanouissement du gradient sur les longues séquences",
          "Le besoin de données étiquetées",
          "La lenteur des convolutions",
        ],
        answer: 1,
        explain: "Ses portes permettent de conserver l'information sur de longues distances temporelles.",
      },
      {
        q: "Qu'est-ce que le transfer learning ?",
        options: [
          "Transférer un modèle d'un GPU à un autre",
          "Réutiliser un modèle pré-entraîné comme point de départ sur une nouvelle tâche",
          "Copier les données d'entraînement",
          "Convertir un CNN en RNN",
        ],
        answer: 1,
        explain: "On réutilise les représentations apprises sur un grand dataset, puis on affine sur sa tâche.",
      },
    ],
  },
  {
    id: "nlp-transformers",
    title: "NLP et Transformers",
    level: "avance",
    icon: "💬",
    description:
      "Embeddings, attention, architecture Transformer, LLM, fine-tuning et RAG : l'IA moderne.",
    lessons: [
      {
        id: "nlp-1",
        title: "Représenter le texte : tokens et embeddings",
        duration: "50 min",
      },
      {
        id: "nlp-2",
        title: "L'attention et le Transformer",
        duration: "65 min",
        resources: [
          { type: "paper", title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", author: "Vaswani et al. (NeurIPS 2017)", description: "Le paper fondateur du Transformer — l'architecture qui a révolutionné le NLP et bien au-delà." },
          { type: "video", title: "Illustrated Transformer (article interactif)", url: "https://jalammar.github.io/illustrated-transformer/", author: "Jay Alammar", description: "L'explication visuelle la plus complète du mécanisme d'attention — animations étape par étape." },
          { type: "video", title: "Let's build GPT: from scratch, in code, spelled out", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", author: "Andrej Karpathy", description: "Implémentation complète d'un mini-GPT from scratch en PyTorch — 2h qui valent un cours entier." },
        ],
      },
      {
        id: "nlp-3",
        title: "LLM : pré-entraînement, fine-tuning, prompting",
        duration: "60 min",
      },
      {
        id: "nlp-4",
        title: "Construire des applications LLM et agents",
        duration: "55 min",
      },
    ],
    quiz: [
      {
        q: "Que capture un embedding de mot ?",
        options: [
          "La fréquence du mot",
          "Le sens, via la géométrie de l'espace vectoriel",
          "L'orthographe exacte",
          "La langue d'origine",
        ],
        answer: 1,
        explain: "Les mots de sens proches ont des vecteurs proches : la sémantique devient géométrie.",
      },
      {
        q: "Quel avantage décisif le Transformer a-t-il sur le RNN ?",
        options: [
          "Moins de paramètres",
          "Traitement parallèle de la séquence et dépendances longues directes",
          "Pas besoin de données",
          "Fonctionne sans GPU",
        ],
        answer: 1,
        explain: "L'attention traite tous les tokens en parallèle et relie directement les tokens éloignés.",
      },
      {
        q: "Pour donner les documents internes de votre entreprise à un LLM, l'approche standard est :",
        options: ["Réentraîner le modèle de zéro", "Le RAG (recherche vectorielle + injection dans le prompt)", "Augmenter la temperature", "Réduire max_tokens"],
        answer: 1,
        explain: "Le RAG retrouve les passages pertinents et les fournit au modèle : pas de réentraînement nécessaire.",
      },
      {
        q: "Qu'est-ce qui distingue un agent d'un simple appel LLM ?",
        options: [
          "Il utilise plus de tokens",
          "Il peut appeler des outils en boucle (observer, réfléchir, agir)",
          "Il est toujours plus rapide",
          "Il n'a pas besoin de prompt",
        ],
        answer: 1,
        explain: "L'agent enchaîne raisonnement et actions via des outils jusqu'à accomplir la tâche.",
      },
    ],
  },
  // ── MODULE : CLOUD & DÉPLOIEMENT ──────────────────────────────────────────
  {
    id: "cloud-aws",
    title: "Cloud, Docker & Déploiement AWS",
    level: "avance",
    icon: "☁️",
    description:
      "Déployer ses modèles dans le cloud : Docker, AWS (EC2, S3, Lambda, SageMaker), GitHub Actions CI/CD. Le profil ML Engineer vs Data Scientist.",
    lessons: [
      {
        id: "cloud-1",
        title: "Docker : conteneuriser ses applications ML",
        duration: "55 min",
      },
      {
        id: "cloud-2",
        title: "AWS pour ML Engineers",
        duration: "60 min",
      },
      {
        id: "cloud-3",
        title: "CI/CD avec GitHub Actions",
        duration: "45 min",
      },
    ],
    quiz: [
      {
        q: "Quelle est la différence entre une image Docker et un conteneur ?",
        options: [
          "Ce sont des synonymes",
          "L'image est le blueprint ; le conteneur est une instance en cours d'exécution",
          "L'image s'exécute, le conteneur est un fichier statique",
          "L'image est réservée aux GPU",
        ],
        answer: 1,
        explain: "L'image est immuable (recette), le conteneur est l'instance active créée à partir de cette image.",
      },
      {
        q: "Quel service AWS est le plus adapté pour stocker des modèles ML et des datasets ?",
        options: ["EC2", "Lambda", "S3", "SageMaker"],
        answer: 2,
        explain: "S3 est un stockage objet scalable et économique, idéal pour données et artefacts ML.",
      },
      {
        q: "Dans un workflow GitHub Actions, à quoi servent les secrets ?",
        options: [
          "Chiffrer les logs",
          "Stocker des valeurs sensibles (clés API, mots de passe) sans les exposer dans le code",
          "Accélérer le build",
          "Configurer les branches",
        ],
        answer: 1,
        explain: "Les secrets sont injectés en variables d'env lors de l'exécution sans jamais apparaître dans le code source.",
      },
      {
        q: "Pourquoi Lambda est-il préférable à EC2 pour l'inférence de modèles légers ?",
        options: [
          "Lambda supporte les GPU",
          "Lambda est plus rapide",
          "Lambda est serverless : facturation à la requête, pas de serveur à gérer en permanence",
          "Lambda a plus de mémoire",
        ],
        answer: 2,
        explain: "Serverless = tu pais uniquement ce que tu utilises, idéal pour des APIs à trafic variable.",
      },
    ],
  },
  {
    id: "mlops",
    title: "MLOps et projets en production",
    level: "avance",
    icon: "🚀",
    description:
      "Du notebook à la production : versioning, déploiement, monitoring, et les bonnes pratiques d'ingénierie ML.",
    lessons: [
      {
        id: "ops-1",
        title: "Du notebook au code de production",
        duration: "50 min",
        resources: [
          { type: "course", title: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/course/2022/", author: "UC Berkeley", description: "Le meilleur cours gratuit sur le cycle complet ML en production : data, training, deployment, monitoring." },
          { type: "doc", title: "MLflow — Getting Started", url: "https://mlflow.org/docs/latest/getting-started/index.html", description: "Tutorial officiel MLflow pour le tracking d'expériences et la gestion de modèles." },
          { type: "book", title: "Designing Machine Learning Systems", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", author: "Chip Huyen", description: "Le livre de référence sur les systèmes ML en production — architecture, data pipelines, monitoring." },
        ],
      },
      {
        id: "ops-2",
        title: "Déployer un modèle : API et conteneurs",
        duration: "55 min",
      },
      {
        id: "ops-3",
        title: "Monitoring et dérive des données",
        duration: "50 min",
      },
      {
        id: "ops-4",
        title: "Éthique, fairness et IA responsable",
        duration: "60 min",
        resources: [
          { type: "paper", title: "Fairness and Abstraction in Sociotechnical Systems", url: "https://dl.acm.org/doi/10.1145/3287560.3287598", author: "Selbst et al. (FAccT 2019)", description: "Pourquoi les solutions purement techniques au biais algorithmique sont insuffisantes — lecture essentielle." },
          { type: "doc", title: "Fairlearn — User Guide", url: "https://fairlearn.org/main/user_guide/index.html", description: "Documentation complète de Fairlearn : métriques, mitigation, visualisation des disparités." },
          { type: "doc", title: "SHAP Documentation", url: "https://shap.readthedocs.io/en/latest/", description: "Guide complet SHAP avec exemples pour tree models, deep learning et modèles linéaires." },
          { type: "paper", title: "\"Why Should I Trust You?\": Explaining the Predictions of Any Classifier (LIME)", url: "https://arxiv.org/abs/1602.04938", author: "Ribeiro, Singh, Guestrin (2016)", description: "Le paper original LIME — l'approche d'approximation locale pour l'explicabilité." },
          { type: "book", title: "Interpretable Machine Learning", url: "https://christophm.github.io/interpretable-ml-book/", author: "Christoph Molnar", description: "Livre complet et gratuit sur l'interprétabilité ML : SHAP, LIME, PDP, ICE — la référence." },
        ],
      },
    ],
    quiz: [
      {
        q: "Pourquoi versionner les données en plus du code ?",
        options: [
          "Pour économiser de l'espace disque",
          "Sans les mêmes données, impossible de reproduire un entraînement",
          "Git le fait automatiquement",
          "C'est obligatoire légalement",
        ],
        answer: 1,
        explain: "La reproductibilité exige code + données + config identiques. DVC versionne les données.",
      },
      {
        q: "Qu'est-ce que le data drift ?",
        options: [
          "Une fuite de données du test vers le train",
          "Le changement de la distribution des données d'entrée au fil du temps",
          "La perte de données lors du déploiement",
          "Un bug de Pandas",
        ],
        answer: 1,
        explain: "Le monde évolue : les données de production s'éloignent de celles de l'entraînement.",
      },
      {
        q: "Quel est l'intérêt principal de Docker pour le ML ?",
        options: [
          "Accélérer l'entraînement",
          "Garantir un environnement identique du dev à la production",
          "Réduire la taille du modèle",
          "Remplacer le GPU",
        ],
        answer: 1,
        explain: "Le conteneur fige dépendances et environnement : fini le « ça marche sur ma machine ».",
      },
      {
        q: "Un déploiement canari consiste à :",
        options: [
          "Déployer la nuit",
          "Envoyer une petite fraction du trafic vers le nouveau modèle avant de généraliser",
          "Tester uniquement en local",
          "Supprimer l'ancien modèle immédiatement",
        ],
        answer: 1,
        explain: "On limite le risque en exposant d'abord un faible pourcentage d'utilisateurs au nouveau modèle.",
      },
      {
        q: "Pourquoi est-il impossible de satisfaire simultanément Demographic Parity, Equal Opportunity et Equalized Odds ?",
        options: [
          "Les bibliothèques actuelles ne le supportent pas encore",
          "Ces métriques nécessitent trop de données",
          "Quand les taux de base diffèrent entre groupes, ces définitions entrent mathématiquement en contradiction",
          "Il faut un GPU pour calculer les trois",
        ],
        answer: 2,
        explain: "C'est le théorème de Chouldechova (2017) : lorsque les taux de base (prévalence) diffèrent entre groupes, aucun classifieur ne peut satisfaire ces trois définitions à la fois. Il faut choisir selon le contexte métier et éthique.",
      },
      {
        q: "Quelle est la principale différence entre SHAP et LIME pour l'explicabilité ?",
        options: [
          "SHAP ne fonctionne qu'avec les réseaux de neurones",
          "SHAP repose sur la théorie des jeux (Shapley values) et est globalement cohérent ; LIME approche localement le modèle par une régression linéaire",
          "LIME est plus lent que SHAP",
          "SHAP ne peut expliquer qu'une prédiction à la fois",
        ],
        answer: 1,
        explain: "SHAP garantit des propriétés mathématiques fortes (cohérence, efficacité) issues de la théorie des jeux. LIME est plus flexible mais son approximation locale peut varier d'un run à l'autre.",
      },
    ],
  },
];

// ── Fusion des exercices ──────────────────────────────────────────────────
// Les exercices de leçon, l'exercice final et les questions de quiz ajoutées
// vivent dans lib/exercises.js, pour ne pas noyer le contenu des leçons.
// On les greffe ici, une fois, au chargement du module : tous les
// consommateurs de CURRICULUM (parcours, révision, certificats) voient donc
// exactement les mêmes données.
for (const mod of CURRICULUM) {
  const extra = EXERCISES[mod.id];
  if (!extra) continue;
  for (const lesson of mod.lessons) {
    const exercises = extra.lessons?.[lesson.id];
    if (exercises) lesson.exercises = exercises;
  }
  if (extra.finalExercise) mod.finalExercise = extra.finalExercise;
  if (extra.quizExtra?.length) mod.quiz = [...mod.quiz, ...extra.quizExtra];
}

export function getModule(id) {
  return CURRICULUM.find((m) => m.id === id);
}

export function totalLessons() {
  return CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
