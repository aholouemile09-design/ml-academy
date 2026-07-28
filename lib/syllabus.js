/**
 * SYLLABUS — le cadre pédagogique des grandes universités en ligne.
 *
 * Modèle repris de CS50 (Harvard), MIT OCW et des recommandations du
 * Eberly Center (Carnegie Mellon) sur l'alignement objectifs ↔ évaluation :
 *
 *   1. `outcomes`      — objectifs mesurables, formulés avec des verbes d'action
 *                        ("implémenter", "diagnostiquer"), pas "comprendre".
 *   2. `prerequisites` — ce qu'il faut maîtriser AVANT d'ouvrir le module.
 *   3. `books`         — lectures de référence, gratuites signalées comme telles.
 *   4. `problemSet`    — l'évaluation pratique notée, ancrée dans un domaine
 *                        réel (finance, santé, forensics…) comme les psets CS50,
 *                        avec une grille de notation explicite.
 *
 * Clé = id du module, tous parcours confondus.
 */

export const SYLLABUS = {
  // ═══════════════════════════════════════════════════════════════════════
  // PARCOURS ML & DATA SCIENCE
  // ═══════════════════════════════════════════════════════════════════════

  "setup-pro": {
    outcomes: [
      "Naviguer et manipuler des fichiers en ligne de commande sans souris",
      "Versionner un projet avec Git et publier un historique de commits lisible",
      "Isoler les dépendances d'un projet dans un environnement virtuel reproductible",
      "Structurer un dépôt selon les conventions attendues en entreprise",
    ],
    prerequisites: ["Aucun — c'est le point de départ du parcours."],
    books: [
      { title: "The Missing Semester of Your CS Education", author: "MIT", url: "https://missing.csail.mit.edu/", free: true, why: "Le cours que le MIT donne pour combler exactement ce que les cursus n'enseignent pas : shell, Git, débogage. Référence absolue." },
      { title: "Pro Git", author: "Chacon & Straub", url: "https://git-scm.com/book/fr/v2", free: true, why: "Le livre officiel de Git, traduit en français. Les chapitres 1 à 3 suffisent pour 95 % des usages." },
    ],
    problemSet: {
      title: "Problem Set 0 — Mise en place d'un dépôt professionnel",
      domain: "Ingénierie logicielle",
      brief: "Crée de zéro un dépôt GitHub qui pourrait être montré à un recruteur : structure claire, environnement reproductible, historique propre.",
      tasks: [
        "Crée un dépôt `codegraft-labs` avec la structure src/ notebooks/ data_sample/ tests/",
        "Ajoute un .gitignore excluant .venv, *.csv, __pycache__ et .env",
        "Écris un README avec titre, description, section Installation et section Usage",
        "Crée un venv, installe pandas et pytest, fige requirements.txt",
        "Produis au moins 5 commits en Conventional Commits (feat:, docs:, chore:)",
        "Crée une branche `feature/structure`, fusionne-la dans main",
      ],
      rubric: [
        { criterion: "Structure du dépôt conforme", points: 20 },
        { criterion: ".gitignore correct (aucun secret ni donnée versionnée)", points: 20 },
        { criterion: "README complet et lisible", points: 20 },
        { criterion: "requirements.txt reproductible", points: 20 },
        { criterion: "Historique Git propre et conventionnel", points: 20 },
      ],
    },
  },

  python: {
    outcomes: [
      "Écrire des fonctions Python idiomatiques avec typage et docstrings",
      "Choisir la bonne structure de données (list, dict, set, tuple) selon le coût algorithmique",
      "Manipuler des tableaux NumPy en vectorisé, sans boucle Python",
      "Charger, nettoyer et agréger un jeu de données réel avec Pandas",
    ],
    prerequisites: ["Module Setup Pro (terminal, venv, Git)"],
    books: [
      { title: "Python for Data Analysis (3e éd.)", author: "Wes McKinney", url: "https://wesmckinney.com/book/", free: true, why: "Écrit par le créateur de Pandas lui-même, et lisible gratuitement en ligne. LA référence sur Pandas." },
      { title: "Fluent Python (2e éd.)", author: "Luciano Ramalho", url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/", free: false, why: "Payant (~50 €) mais c'est le livre qui fait passer de « je code en Python » à « j'écris du Python ». À acheter une fois les bases acquises." },
    ],
    problemSet: {
      title: "Problem Set 1 — Analyse d'un jeu de données de santé publique",
      domain: "Santé publique",
      brief: "À partir d'un CSV brut et sale (valeurs manquantes, doublons, types incohérents), produis une analyse propre et reproductible.",
      tasks: [
        "Charge le dataset et produis un rapport de qualité (types, taux de valeurs manquantes, doublons)",
        "Nettoie : gère les manquants avec une stratégie justifiée par écrit, supprime les doublons",
        "Crée 3 variables dérivées pertinentes (ratio, tranche d'âge, indicateur binaire)",
        "Produis 5 agrégations avec groupby répondant à des questions métier explicites",
        "Réécris ta boucle la plus lente en version vectorisée NumPy et mesure le gain avec %timeit",
      ],
      rubric: [
        { criterion: "Rapport de qualité des données complet", points: 20 },
        { criterion: "Nettoyage justifié (pas de suppression aveugle)", points: 25 },
        { criterion: "Variables dérivées pertinentes", points: 20 },
        { criterion: "Agrégations correctes et interprétées", points: 20 },
        { criterion: "Vectorisation démontrée avec mesure", points: 15 },
      ],
    },
  },

  "sql-databases": {
    outcomes: [
      "Écrire des requêtes SQL avec jointures, agrégations et sous-requêtes",
      "Utiliser les fonctions de fenêtrage pour des calculs par groupe",
      "Lire un plan d'exécution et ajouter l'index qui corrige une requête lente",
      "Modéliser un schéma relationnel normalisé à partir d'un besoin métier",
    ],
    prerequisites: ["Module Python (manipulation de données tabulaires)"],
    books: [
      { title: "SQL for Data Scientists", author: "Renée Teate", url: "https://sqlfordatascientists.com/", free: false, why: "~40 €. Écrit spécifiquement pour les data scientists, pas pour les DBA — exactement le bon angle." },
      { title: "Use The Index, Luke!", author: "Markus Winand", url: "https://use-the-index-luke.com/", free: true, why: "Le meilleur contenu gratuit sur l'indexation. Comprendre ça te distinguera de 80 % des candidats." },
    ],
    problemSet: {
      title: "Problem Set 2 — Requêtes analytiques sur une base e-commerce",
      domain: "Commerce / Finance",
      brief: "Une base de commandes de 500 000 lignes. Réponds à des questions métier avec du SQL, puis optimise.",
      tasks: [
        "Top 10 des clients par chiffre d'affaires sur les 12 derniers mois",
        "Taux de réachat mensuel avec une fonction de fenêtrage",
        "Panier moyen par catégorie et par trimestre, avec évolution en %",
        "Identifie les clients inactifs depuis 90 jours (anti-jointure)",
        "Prends la requête la plus lente, lis son EXPLAIN ANALYZE, ajoute un index, remesure",
      ],
      rubric: [
        { criterion: "Exactitude des résultats", points: 30 },
        { criterion: "Usage correct des fonctions de fenêtrage", points: 20 },
        { criterion: "Lisibilité (CTE, alias, indentation)", points: 15 },
        { criterion: "Optimisation démontrée avec avant/après", points: 25 },
        { criterion: "Interprétation métier écrite", points: 10 },
      ],
    },
  },

  maths: {
    outcomes: [
      "Interpréter géométriquement un produit matriciel et une décomposition SVD",
      "Dériver la règle de mise à jour d'une descente de gradient",
      "Choisir la loi de probabilité adaptée à un phénomène observé",
      "Conduire un test d'hypothèse et interpréter correctement une p-value",
    ],
    prerequisites: ["Module Python (NumPy)"],
    books: [
      { title: "Mathematics for Machine Learning", author: "Deisenroth, Faisal & Ong", url: "https://mml-book.github.io/", free: true, why: "PDF officiel gratuit. Le livre de référence, calibré exactement sur ce dont le ML a besoin — ni plus, ni moins." },
      { title: "An Introduction to Statistical Learning (ISLP)", author: "James, Witten, Hastie & Tibshirani", url: "https://www.statlearning.com/", free: true, why: "PDF gratuit, version Python. Le pont parfait entre les maths et le ML appliqué." },
    ],
    problemSet: {
      title: "Problem Set 3 — Implémenter la descente de gradient depuis zéro",
      domain: "Optimisation numérique",
      brief: "Pas de scikit-learn. Tu implémentes l'algorithme à la main pour comprendre ce qui se passe sous le capot.",
      tasks: [
        "Implémente une régression linéaire par descente de gradient en NumPy pur",
        "Trace la courbe de coût sur 1000 itérations pour 3 taux d'apprentissage différents",
        "Explique par écrit pourquoi un taux trop grand diverge (avec le graphique à l'appui)",
        "Compresse une image via SVD en gardant k composantes, compare k=5, 20, 50",
        "Conduis un test t apparié sur deux séries et rédige la conclusion en une phrase de langage métier",
      ],
      rubric: [
        { criterion: "Descente de gradient correcte et convergente", points: 30 },
        { criterion: "Analyse du taux d'apprentissage argumentée", points: 20 },
        { criterion: "SVD appliquée et interprétée", points: 25 },
        { criterion: "Test d'hypothèse conduit et conclu correctement", points: 25 },
      ],
    },
  },

  "eda-visualisation": {
    outcomes: [
      "Conduire une analyse exploratoire structurée sur un jeu de données inconnu",
      "Choisir la représentation graphique adaptée à la question posée",
      "Détecter fuites de données, biais d'échantillonnage et valeurs aberrantes",
      "Produire un rapport d'analyse lisible par un décideur non technique",
    ],
    prerequisites: ["Modules Python et Mathématiques"],
    books: [
      { title: "Storytelling with Data", author: "Cole Nussbaumer Knaflic", url: "https://www.storytellingwithdata.com/books", free: false, why: "~30 €. Le livre qui apprend à faire des graphiques que les décideurs comprennent. Compétence sous-estimée et très bien payée." },
      { title: "Fundamentals of Data Visualization", author: "Claus O. Wilke", url: "https://clauswilke.com/dataviz/", free: true, why: "Intégralement gratuit en ligne. La théorie rigoureuse derrière le choix d'un graphique." },
    ],
    problemSet: {
      title: "Problem Set 4 — EDA sur un jeu de données de détection de fraude",
      domain: "Forensics / Finance",
      brief: "Données bancaires déséquilibrées (0,2 % de fraudes). Trouve le signal, et surtout : trouve les pièges.",
      tasks: [
        "Analyse univariée et bivariée complète, avec commentaire écrit sur chaque graphique",
        "Identifie au moins une fuite de données potentielle et argumente",
        "Traite le déséquilibre de classes : montre pourquoi l'accuracy est un piège ici",
        "Produis un notebook de 8 graphiques maximum, chacun répondant à une question explicite",
        "Rédige une synthèse d'une page destinée à un directeur des risques (zéro jargon)",
      ],
      rubric: [
        { criterion: "Profondeur de l'exploration", points: 25 },
        { criterion: "Détection de la fuite de données", points: 20 },
        { criterion: "Qualité et lisibilité des graphiques", points: 20 },
        { criterion: "Traitement du déséquilibre argumenté", points: 15 },
        { criterion: "Synthèse accessible à un non-technicien", points: 20 },
      ],
    },
  },

  "feature-engineering": {
    outcomes: [
      "Construire des variables prédictives à partir de données brutes",
      "Encoder correctement les variables catégorielles selon leur cardinalité",
      "Bâtir un pipeline scikit-learn sans fuite entre entraînement et test",
      "Mesurer l'apport réel d'une variable par ablation",
    ],
    prerequisites: ["Module EDA & Visualisation"],
    books: [
      { title: "Feature Engineering for Machine Learning", author: "Zheng & Casari", url: "https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/", free: false, why: "~45 €. Le seul livre entièrement dédié au sujet, et c'est là que se gagne la performance d'un modèle." },
      { title: "Feature Engineering A-Z", author: "Emil Hvitfeldt", url: "https://feaz-book.com/", free: true, why: "Gratuit en ligne, très visuel, catalogue quasi exhaustif des techniques." },
    ],
    problemSet: {
      title: "Problem Set 5 — Pipeline sans fuite sur données temporelles",
      domain: "Énergie",
      brief: "Prédire la consommation électrique. La difficulté n'est pas le modèle : c'est de ne pas tricher avec le futur.",
      tasks: [
        "Construis des variables calendaires, de retard (lags) et de moyenne mobile",
        "Encode les catégorielles : one-hot pour la faible cardinalité, target encoding pour la forte",
        "Assemble un Pipeline + ColumnTransformer scikit-learn complet",
        "Démontre par une expérience que ton split est temporel et non aléatoire",
        "Fais une étude d'ablation : retire chaque groupe de variables, mesure l'impact",
      ],
      rubric: [
        { criterion: "Richesse et pertinence des variables créées", points: 25 },
        { criterion: "Encodage adapté à la cardinalité", points: 20 },
        { criterion: "Pipeline propre et réutilisable", points: 20 },
        { criterion: "Absence de fuite démontrée", points: 25 },
        { criterion: "Étude d'ablation chiffrée", points: 10 },
      ],
    },
  },

  "ml-classique": {
    outcomes: [
      "Choisir l'algorithme adapté au type de problème et au volume de données",
      "Diagnostiquer sur-apprentissage et sous-apprentissage via les courbes d'apprentissage",
      "Sélectionner la métrique d'évaluation alignée sur l'enjeu métier",
      "Optimiser les hyperparamètres avec une recherche bayésienne (Optuna)",
      "Expliquer une prédiction individuelle avec SHAP",
    ],
    prerequisites: ["Modules Feature Engineering et Mathématiques"],
    books: [
      { title: "Hands-On Machine Learning (3e éd.)", author: "Aurélien Géron", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/", free: false, why: "~55 €. LE livre à acheter si tu n'en achètes qu'un. Écrit par un Français, ancien de YouTube. Standard de facto de l'industrie." },
      { title: "An Introduction to Statistical Learning (ISLP)", author: "James et al.", url: "https://www.statlearning.com/", free: true, why: "PDF gratuit. La théorie derrière ce que Géron te fait pratiquer." },
      { title: "Interpretable Machine Learning", author: "Christoph Molnar", url: "https://christophm.github.io/interpretable-ml-book/", free: true, why: "Gratuit. La référence sur SHAP, LIME et l'explicabilité — sujet devenu obligatoire en entreprise." },
    ],
    problemSet: {
      title: "Problem Set 6 — Modèle de scoring crédit auditable",
      domain: "Finance / Conformité",
      brief: "Un modèle qui refuse un crédit doit pouvoir justifier sa décision. Performance ET explicabilité.",
      tasks: [
        "Établis une baseline (régression logistique) et documente ses performances",
        "Entraîne un XGBoost ou LightGBM, optimise avec Optuna (50 essais minimum)",
        "Justifie ta métrique principale : pourquoi pas l'accuracy ? (données déséquilibrées)",
        "Trace les courbes d'apprentissage et diagnostique le régime (sur/sous-apprentissage)",
        "Produis les valeurs SHAP globales, et explique 3 refus individuels en français clair",
        "Vérifie l'équité entre groupes démographiques et commente les écarts observés",
      ],
      rubric: [
        { criterion: "Baseline établie avant modèle complexe", points: 15 },
        { criterion: "Optimisation d'hyperparamètres rigoureuse", points: 20 },
        { criterion: "Métrique justifiée et adaptée", points: 15 },
        { criterion: "Diagnostic par courbes d'apprentissage", points: 15 },
        { criterion: "Explications SHAP correctes et lisibles", points: 20 },
        { criterion: "Analyse d'équité conduite", points: 15 },
      ],
    },
  },

  "series-temporelles": {
    outcomes: [
      "Tester et obtenir la stationnarité d'une série",
      "Ajuster un modèle SARIMA et valider ses résidus",
      "Modéliser saisonnalités multiples et jours fériés avec Prophet",
      "Valider un modèle temporel par validation croisée glissante",
    ],
    prerequisites: ["Modules Mathématiques et ML classique"],
    books: [
      { title: "Forecasting: Principles and Practice (3e éd.)", author: "Hyndman & Athanasopoulos", url: "https://otexts.com/fpp3/", free: true, why: "Gratuit en ligne, écrit par le créateur de auto.arima. Référence mondiale incontestée sur la prévision." },
      { title: "Practical Time Series Analysis", author: "Aileen Nielsen", url: "https://www.oreilly.com/library/view/practical-time-series/9781492041641/", free: false, why: "~45 €. L'angle praticien Python, complémentaire du livre de Hyndman qui est orienté R." },
    ],
    problemSet: {
      title: "Problem Set 7 — Prévision de demande retail",
      domain: "Distribution",
      brief: "Prévoir les ventes hebdomadaires par magasin. Saisonnalité, promotions et jours fériés inclus.",
      tasks: [
        "Décompose la série (tendance, saisonnalité, résidu) et commente",
        "Teste la stationnarité (ADF), applique les différenciations nécessaires",
        "Ajuste un SARIMA, valide les résidus avec Ljung-Box",
        "Ajuste un Prophet avec jours fériés et double saisonnalité",
        "Compare les deux par validation croisée glissante sur horizon 4 semaines",
        "Conclus : quel modèle recommandes-tu en production, et pourquoi ?",
      ],
      rubric: [
        { criterion: "Décomposition et diagnostic de stationnarité", points: 20 },
        { criterion: "SARIMA correctement paramétré et validé", points: 25 },
        { criterion: "Prophet configuré avec les régresseurs pertinents", points: 20 },
        { criterion: "Validation croisée temporelle (pas aléatoire)", points: 25 },
        { criterion: "Recommandation argumentée", points: 10 },
      ],
    },
  },

  "deep-learning": {
    outcomes: [
      "Implémenter et entraîner un réseau de neurones avec PyTorch",
      "Diagnostiquer un entraînement qui ne converge pas",
      "Appliquer le transfert d'apprentissage sur un jeu de données restreint",
      "Régulariser efficacement (dropout, augmentation, early stopping)",
    ],
    prerequisites: ["Modules Mathématiques et ML classique"],
    books: [
      { title: "Dive into Deep Learning (D2L)", author: "Zhang, Lipton, Li & Smola", url: "https://d2l.ai/", free: true, why: "Gratuit, interactif, code exécutable. Rédigé par des scientifiques d'Amazon, utilisé dans plus de 500 universités." },
      { title: "Deep Learning with PyTorch", author: "Stevens, Antiga & Viehmann", url: "https://www.manning.com/books/deep-learning-with-pytorch", free: true, why: "PDF officiel offert par Manning. Écrit par des contributeurs de PyTorch." },
      { title: "Deep Learning", author: "Goodfellow, Bengio & Courville", url: "https://www.deeplearningbook.org/", free: true, why: "Gratuit en ligne. Le livre de fond théorique — à lire en parallèle, pas en premier." },
    ],
    problemSet: {
      title: "Problem Set 8 — Classification d'images médicales en données rares",
      domain: "Imagerie médicale",
      brief: "800 images seulement. Entraîner de zéro échouera — c'est le but de l'exercice.",
      tasks: [
        "Entraîne un CNN depuis zéro et documente son échec (courbes à l'appui)",
        "Applique le transfert d'apprentissage depuis un modèle pré-entraîné",
        "Ajoute l'augmentation de données et mesure le gain",
        "Compare gel des couches vs fine-tuning complet",
        "Analyse la matrice de confusion : quelles classes se confondent, et pourquoi médicalement ?",
      ],
      rubric: [
        { criterion: "Baseline « from scratch » et analyse de son échec", points: 20 },
        { criterion: "Transfert d'apprentissage correctement mis en œuvre", points: 25 },
        { criterion: "Augmentation pertinente pour le domaine médical", points: 20 },
        { criterion: "Comparaison gel vs fine-tuning chiffrée", points: 20 },
        { criterion: "Analyse des erreurs avec lecture métier", points: 15 },
      ],
    },
  },

  "nlp-transformers": {
    outcomes: [
      "Expliquer le mécanisme d'attention et son coût quadratique",
      "Affiner un transformer pré-entraîné sur une tâche de classification",
      "Construire un système de RAG avec base vectorielle",
      "Évaluer un système NLP au-delà de l'accuracy",
    ],
    prerequisites: ["Module Deep Learning"],
    books: [
      { title: "Natural Language Processing with Transformers", author: "Tunstall, von Werra & Wolf", url: "https://www.oreilly.com/library/view/natural-language-processing/9781098136789/", free: false, why: "~50 €. Écrit par trois ingénieurs de Hugging Face. Le livre de référence sur les transformers appliqués." },
      { title: "Speech and Language Processing (3e éd.)", author: "Jurafsky & Martin", url: "https://web.stanford.edu/~jurafsky/slp3/", free: true, why: "Brouillon gratuit de Stanford, mis à jour en continu. Le manuel académique de référence du NLP." },
    ],
    problemSet: {
      title: "Problem Set 9 — Assistant documentaire par RAG",
      domain: "Support client",
      brief: "Un chatbot qui répond à partir d'une base documentaire — et qui admet quand il ne sait pas.",
      tasks: [
        "Découpe un corpus documentaire en chunks avec une stratégie justifiée",
        "Indexe les embeddings dans une base vectorielle (FAISS ou Chroma)",
        "Implémente la récupération et mesure sa qualité (recall@k)",
        "Ajoute un garde-fou : le système doit répondre « je ne sais pas » hors périmètre",
        "Évalue sur 20 questions de test, dont 5 pièges sans réponse dans le corpus",
      ],
      rubric: [
        { criterion: "Stratégie de chunking justifiée", points: 20 },
        { criterion: "Indexation et récupération fonctionnelles", points: 25 },
        { criterion: "Recall@k mesuré", points: 20 },
        { criterion: "Garde-fou anti-hallucination efficace", points: 25 },
        { criterion: "Protocole d'évaluation rigoureux", points: 10 },
      ],
    },
  },

  "cloud-aws": {
    outcomes: [
      "Déployer une application conteneurisée sur une infrastructure cloud",
      "Configurer des accès selon le principe du moindre privilège",
      "Estimer et maîtriser le coût d'une architecture ML",
      "Choisir entre serverless et instance selon le profil de charge",
    ],
    prerequisites: ["Module Setup Pro (Docker, terminal)"],
    books: [
      { title: "AWS Skill Builder — parcours gratuits", author: "AWS", url: "https://skillbuilder.aws/", free: true, why: "Gratuit et officiel. Les parcours Cloud Practitioner et ML Specialty préparent directement aux certifications." },
      { title: "Data Science on AWS", author: "Fregly & Barth", url: "https://www.oreilly.com/library/view/data-science-on/9781492079385/", free: false, why: "~50 €. Architectures ML réelles sur AWS de bout en bout, pas des tutoriels jouets." },
    ],
    problemSet: {
      title: "Problem Set 10 — Déploiement d'une API de prédiction",
      domain: "Infrastructure",
      brief: "Mettre un modèle en ligne, accessible publiquement, sans exploser le budget.",
      tasks: [
        "Conteneurise une API de prédiction FastAPI avec Docker",
        "Déploie sur un service cloud (Lambda, Cloud Run ou EC2)",
        "Configure un rôle IAM au strict minimum nécessaire — justifie chaque permission",
        "Mets en place logs et alerte de coût",
        "Compare le coût mensuel de deux architectures pour 1 000 puis 1 000 000 requêtes",
      ],
      rubric: [
        { criterion: "Conteneurisation propre et légère", points: 20 },
        { criterion: "Déploiement fonctionnel et accessible", points: 25 },
        { criterion: "Moindre privilège respecté et argumenté", points: 25 },
        { criterion: "Observabilité et garde-fou budgétaire", points: 15 },
        { criterion: "Analyse de coût comparative", points: 15 },
      ],
    },
  },

  mlops: {
    outcomes: [
      "Versionner données, code et modèles de façon reproductible",
      "Automatiser entraînement et déploiement dans un pipeline CI/CD",
      "Détecter une dérive de données ou de concept en production",
      "Auditer un modèle sous l'angle de l'équité et de la conformité",
    ],
    prerequisites: ["Modules ML classique et Cloud"],
    books: [
      { title: "Designing Machine Learning Systems", author: "Chip Huyen", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", free: false, why: "~50 €. Le livre le plus cité pour les entretiens de ML Engineer. Chip Huyen a construit ces systèmes chez NVIDIA et Snorkel." },
      { title: "Machine Learning Engineering", author: "Andriy Burkov", url: "http://www.mlebook.com/wiki/doku.php", free: true, why: "Lecture gratuite en ligne (modèle « read first, buy later »). Très dense, très pratique." },
      { title: "Fairness and Machine Learning", author: "Barocas, Hardt & Narayanan", url: "https://fairmlbook.org/", free: true, why: "Gratuit. La référence académique sur l'équité algorithmique, par des chercheurs de Berkeley et Princeton." },
    ],
    problemSet: {
      title: "Problem Set 11 — Mise en production complète et auditable",
      domain: "Ingénierie ML",
      brief: "Le projet qui prouve que tu es ML Engineer et pas seulement data scientist.",
      tasks: [
        "Versionne les données avec DVC et suis les expériences avec MLflow",
        "Écris un pipeline CI/CD qui teste, entraîne et déploie automatiquement",
        "Implémente un test de non-régression : le déploiement échoue si la métrique chute",
        "Mets en place un moniteur de dérive sur les données d'entrée",
        "Produis un rapport d'équité (Fairlearn) et une fiche modèle (model card)",
      ],
      rubric: [
        { criterion: "Reproductibilité complète (données + code + modèle)", points: 20 },
        { criterion: "Pipeline CI/CD fonctionnel", points: 25 },
        { criterion: "Garde-fou de non-régression", points: 15 },
        { criterion: "Détection de dérive opérationnelle", points: 20 },
        { criterion: "Rapport d'équité et model card", points: 20 },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PARCOURS WEB FULL STACK
  // ═══════════════════════════════════════════════════════════════════════

  "html-css": {
    outcomes: [
      "Structurer une page avec du HTML sémantique et accessible",
      "Construire des mises en page responsives avec Flexbox et Grid",
      "Atteindre un score d'accessibilité supérieur à 90 sur Lighthouse",
    ],
    prerequisites: ["Aucun"],
    books: [
      { title: "MDN Web Docs — Learn Web Development", author: "Mozilla", url: "https://developer.mozilla.org/fr/docs/Learn", free: true, why: "Gratuit, en français, et c'est la documentation que les développeurs professionnels consultent quotidiennement." },
      { title: "Every Layout", author: "Bell & Andrew", url: "https://every-layout.dev/", free: false, why: "~60 €. Change durablement la façon de penser la mise en page CSS. Rentabilisé dès le premier projet." },
    ],
    problemSet: {
      title: "Problem Set W1 — Page produit accessible",
      domain: "E-commerce",
      brief: "Une page produit qui fonctionne au clavier, au lecteur d'écran, et sur mobile.",
      tasks: [
        "Structure sémantique complète (header, nav, main, article, footer)",
        "Grille de produits responsive sans media query (auto-fit / minmax)",
        "Formulaire avec labels associés et messages d'erreur accessibles",
        "Navigation entièrement utilisable au clavier, focus visible",
        "Score Lighthouse Accessibilité ≥ 90 — capture d'écran à l'appui",
      ],
      rubric: [
        { criterion: "Sémantique HTML correcte", points: 25 },
        { criterion: "Responsive sans régression", points: 25 },
        { criterion: "Accessibilité clavier", points: 25 },
        { criterion: "Score Lighthouse atteint", points: 25 },
      ],
    },
  },

  javascript: {
    outcomes: [
      "Manipuler le DOM et gérer les événements sans framework",
      "Maîtriser l'asynchrone : promesses, async/await, gestion d'erreurs",
      "Consommer une API REST et traiter les cas d'échec",
      "Expliquer closures, portée et le comportement de `this`",
    ],
    prerequisites: ["Module HTML & CSS"],
    books: [
      { title: "Eloquent JavaScript (4e éd.)", author: "Marijn Haverbeke", url: "https://eloquentjavascript.net/", free: true, why: "Gratuit en ligne avec exercices interactifs. Le meilleur livre JavaScript, toutes catégories confondues." },
      { title: "You Don't Know JS Yet", author: "Kyle Simpson", url: "https://github.com/getify/You-Dont-Know-JS", free: true, why: "Gratuit sur GitHub. Pour comprendre vraiment closures, portée et coercition — les sujets d'entretien classiques." },
    ],
    problemSet: {
      title: "Problem Set W2 — Tableau de bord temps réel",
      domain: "Données publiques",
      brief: "Consommer une API publique et afficher des données qui se rafraîchissent, sans framework.",
      tasks: [
        "Récupère des données depuis une API publique en async/await",
        "Gère les trois états : chargement, succès, erreur — visibles à l'écran",
        "Implémente une recherche avec anti-rebond (debounce) écrit à la main",
        "Ajoute tri et filtres sans rechargement de page",
        "Mets en cache les résultats en localStorage avec expiration",
      ],
      rubric: [
        { criterion: "Asynchrone correct, sans callback hell", points: 25 },
        { criterion: "Trois états gérés visuellement", points: 20 },
        { criterion: "Debounce implémenté sans bibliothèque", points: 20 },
        { criterion: "Tri et filtres fonctionnels", points: 20 },
        { criterion: "Cache avec expiration", points: 15 },
      ],
    },
  },

  typescript: {
    outcomes: [
      "Typer une base de code JavaScript existante en mode strict",
      "Utiliser génériques et types utilitaires à bon escient",
      "Valider des données externes à l'exécution avec Zod",
    ],
    prerequisites: ["Module JavaScript"],
    books: [
      { title: "TypeScript Handbook", author: "Microsoft", url: "https://www.typescriptlang.org/docs/handbook/intro.html", free: true, why: "Documentation officielle gratuite, exhaustive et à jour." },
      { title: "Effective TypeScript (2e éd.)", author: "Dan Vanderkam", url: "https://effectivetypescript.com/", free: false, why: "~45 €. 83 règles concrètes. C'est le livre qui fait passer du TS « any partout » au TS professionnel." },
    ],
    problemSet: {
      title: "Problem Set W3 — Migration stricte d'un projet JS",
      domain: "Ingénierie logicielle",
      brief: "Reprends ton tableau de bord du PS W2 et passe-le en TypeScript strict, sans un seul `any`.",
      tasks: [
        "Active strict: true et corrige toutes les erreurs",
        "Type les réponses API et valide-les à l'exécution avec Zod",
        "Écris une fonction générique réutilisable et justifie son intérêt",
        "Remplace tout `any` restant par `unknown` + garde de type",
        "Documente 3 bugs que le typage a révélés",
      ],
      rubric: [
        { criterion: "Mode strict sans erreur ni any", points: 30 },
        { criterion: "Validation à l'exécution avec Zod", points: 25 },
        { criterion: "Usage pertinent des génériques", points: 20 },
        { criterion: "Gardes de type correctes", points: 15 },
        { criterion: "Bugs révélés documentés", points: 10 },
      ],
    },
  },

  "react-nextjs": {
    outcomes: [
      "Construire une interface avec des composants React composables",
      "Distinguer Server et Client Components et choisir le bon",
      "Gérer l'état serveur et le cache correctement",
      "Optimiser les Core Web Vitals d'une application Next.js",
    ],
    prerequisites: ["Modules JavaScript et TypeScript"],
    books: [
      { title: "react.dev — documentation officielle", author: "Meta", url: "https://react.dev/learn", free: true, why: "Gratuit. Réécrite intégralement en 2023 autour des hooks — c'est désormais le meilleur cours React qui existe." },
      { title: "Next.js Learn", author: "Vercel", url: "https://nextjs.org/learn", free: true, why: "Cours officiel gratuit et interactif : on construit une vraie application au fil des chapitres." },
    ],
    problemSet: {
      title: "Problem Set W4 — Application Next.js performante",
      domain: "Produit web",
      brief: "Une application rendue côté serveur, rapide, avec des états de chargement soignés.",
      tasks: [
        "Construis au moins 4 routes avec l'App Router",
        "Utilise des Server Components pour la donnée, Client uniquement pour l'interactivité",
        "Ajoute loading.js et error.js sur chaque segment de route",
        "Implémente une mutation avec mise à jour optimiste",
        "Atteins un score Lighthouse Performance ≥ 90 en production",
      ],
      rubric: [
        { criterion: "Découpage Server/Client justifié", points: 25 },
        { criterion: "États de chargement et d'erreur soignés", points: 20 },
        { criterion: "Mutation avec mise à jour optimiste", points: 20 },
        { criterion: "Score Lighthouse atteint", points: 25 },
        { criterion: "Structure de projet lisible", points: 10 },
      ],
    },
  },

  "databases-web": {
    outcomes: [
      "Concevoir un schéma relationnel normalisé pour une application web",
      "Écrire des requêtes typées et des migrations avec un ORM",
      "Sécuriser l'accès aux données par des politiques au niveau des lignes",
      "Diagnostiquer et corriger une requête N+1",
    ],
    prerequisites: ["Module TypeScript"],
    books: [
      { title: "Prisma Documentation", author: "Prisma", url: "https://www.prisma.io/docs", free: true, why: "Gratuit. L'une des meilleures documentations techniques du marché, tous outils confondus." },
      { title: "SQL Antipatterns, Volume 1", author: "Bill Karwin", url: "https://pragprog.com/titles/bksap1/sql-antipatterns-volume-1/", free: false, why: "~35 €. Chaque chapitre décrit une erreur que tu allais commettre. Économise des semaines de dette technique." },
    ],
    problemSet: {
      title: "Problem Set W5 — Schéma et accès de données d'un SaaS",
      domain: "SaaS multi-utilisateurs",
      brief: "La base qui servira ton API au module suivant. Si elle est mal conçue, tout le backend en souffrira.",
      tasks: [
        "Modélise users, organisations, projets et tâches avec les bonnes cardinalités",
        "Écris les migrations et un script de peuplement (seed)",
        "Ajoute les index nécessaires — justifie chacun par une requête réelle",
        "Active la sécurité au niveau des lignes : un utilisateur ne voit que ses données",
        "Identifie une requête N+1, corrige-la, mesure avant/après",
      ],
      rubric: [
        { criterion: "Modélisation correcte et normalisée", points: 25 },
        { criterion: "Migrations et seed reproductibles", points: 20 },
        { criterion: "Index justifiés", points: 20 },
        { criterion: "Isolation des données par utilisateur vérifiée", points: 25 },
        { criterion: "N+1 corrigée avec mesure", points: 10 },
      ],
    },
  },

  "backend-node": {
    outcomes: [
      "Concevoir une API REST cohérente et versionnée",
      "Valider toute entrée utilisateur avant traitement",
      "Implémenter une authentification par jeton et une autorisation par rôle",
      "Protéger une API contre les abus (rate limiting, CORS, en-têtes)",
      "Tester une API par des tests d'intégration automatisés",
    ],
    prerequisites: ["Module Bases de données pour le Web — l'API s'appuie sur le schéma que tu y as conçu."],
    books: [
      { title: "OWASP Top 10", author: "OWASP Foundation", url: "https://owasp.org/www-project-top-ten/", free: true, why: "Gratuit. Les 10 failles les plus répandues. Un développeur backend qui ne les connaît pas est un risque pour son employeur." },
      { title: "Node.js Design Patterns (4e éd.)", author: "Casciaro & Mammino", url: "https://www.nodejsdesignpatterns.com/", free: false, why: "~45 €. L'architecture backend Node au niveau professionnel : flux, concurrence, patterns éprouvés." },
    ],
    problemSet: {
      title: "Problem Set W6 — API sécurisée et testée",
      domain: "SaaS multi-utilisateurs",
      brief: "Expose en API la base du PS W5. Elle doit résister à un utilisateur malveillant.",
      tasks: [
        "CRUD complet avec codes HTTP corrects et pagination",
        "Validation Zod sur chaque corps de requête et paramètre",
        "Authentification par JWT et autorisation par rôle",
        "Rate limiting sur la connexion — max 5 tentatives par minute",
        "Écris des tests d'intégration, dont un qui prouve qu'un utilisateur ne peut pas lire les données d'un autre",
        "Passe en revue les 10 failles de l'OWASP Top 10 et documente ta position sur chacune",
      ],
      rubric: [
        { criterion: "Design REST cohérent", points: 15 },
        { criterion: "Validation exhaustive des entrées", points: 20 },
        { criterion: "Auth et autorisation correctes", points: 20 },
        { criterion: "Rate limiting fonctionnel", points: 15 },
        { criterion: "Tests d'intégration dont isolation inter-utilisateurs", points: 20 },
        { criterion: "Revue OWASP documentée", points: 10 },
      ],
    },
  },

  "deployment-web": {
    outcomes: [
      "Déployer une application full stack avec une chaîne CI/CD",
      "Gérer secrets et variables d'environnement sans jamais les versionner",
      "Mettre en place supervision et alertes",
      "Diagnostiquer un incident de production à partir des logs",
    ],
    prerequisites: ["Module Backend Node.js"],
    books: [
      { title: "The Twelve-Factor App", author: "Adam Wiggins", url: "https://12factor.net/fr/", free: true, why: "Gratuit, en français, et se lit en une heure. Les 12 principes que suivent toutes les applications cloud sérieuses." },
      { title: "Site Reliability Engineering", author: "Google", url: "https://sre.google/sre-book/table-of-contents/", free: true, why: "Offert par Google. Comment on exploite réellement des services à grande échelle." },
    ],
    problemSet: {
      title: "Problem Set W7 — Mise en production supervisée",
      domain: "Exploitation",
      brief: "Ton application en ligne, avec la capacité de détecter et diagnostiquer un incident.",
      tasks: [
        "Chaîne CI/CD : tests puis déploiement automatique sur la branche principale",
        "Environnements séparés preview et production avec secrets distincts",
        "Vérifie qu'aucun secret n'est présent dans l'historique Git",
        "Supervision des erreurs avec alerte (Sentry ou équivalent)",
        "Provoque une panne volontaire, diagnostique-la par les logs, rédige un post-mortem d'une page",
      ],
      rubric: [
        { criterion: "CI/CD fonctionnelle", points: 25 },
        { criterion: "Séparation des environnements", points: 20 },
        { criterion: "Aucun secret versionné (vérifié)", points: 20 },
        { criterion: "Supervision et alertes actives", points: 20 },
        { criterion: "Post-mortem structuré", points: 15 },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PARCOURS PMP 2026
  // ═══════════════════════════════════════════════════════════════════════

  fondamentaux: {
    outcomes: [
      "Situer un projet dans les domaines People, Process et Business de l'ECO",
      "Rédiger une charte de projet complète",
      "Distinguer approches prédictive, agile et hybride selon le contexte",
    ],
    prerequisites: ["Aucun — module d'entrée du parcours PMP."],
    books: [
      { title: "PMBOK Guide, 7e édition", author: "PMI", url: "https://www.pmi.org/pmbok-guide-standards", free: false, why: "Inclus dans l'adhésion PMI (~120 €/an, qui réduit aussi le coût de l'examen). Le référentiel officiel — incontournable." },
      { title: "Exam Content Outline (ECO) 2026", author: "PMI", url: "https://www.pmi.org/certifications/project-management-pmp", free: true, why: "Gratuit et officiel. C'est le document sur lequel l'examen est réellement construit — à lire avant tout le reste." },
    ],
    problemSet: {
      title: "Problem Set P1 — Charte de projet et cadrage",
      domain: "Gestion de projet",
      brief: "Un cas d'entreprise réaliste à cadrer de bout en bout.",
      tasks: [
        "Rédige une charte complète : objectifs SMART, périmètre, hypothèses, contraintes",
        "Identifie 12 parties prenantes et positionne-les en grille pouvoir/intérêt",
        "Choisis l'approche (prédictive, agile ou hybride) et argumente en 10 lignes",
        "Construis un WBS à 3 niveaux respectant la règle des 100 %",
      ],
      rubric: [
        { criterion: "Charte complète et signable", points: 30 },
        { criterion: "Analyse des parties prenantes", points: 25 },
        { criterion: "Choix d'approche argumenté", points: 20 },
        { criterion: "WBS conforme à la règle des 100 %", points: 25 },
      ],
    },
  },

  mindset: {
    outcomes: [
      "Adopter le raisonnement attendu par le PMI face à une question situationnelle",
      "Identifier la réponse « servant leader » parmi des options plausibles",
    ],
    prerequisites: ["Module Fondamentaux"],
    books: [
      { title: "PMP Exam Prep (11e éd.)", author: "Rita Mulcahy", url: "https://rmcls.com/", free: false, why: "~90 €. Le livre de préparation le plus utilisé au monde. Son chapitre sur le « PMI mindset » vaut à lui seul l'achat." },
    ],
    problemSet: {
      title: "Problem Set P2 — 40 questions situationnelles commentées",
      domain: "Gestion de projet",
      brief: "L'examen PMP se joue sur le raisonnement, pas sur la mémoire.",
      tasks: [
        "Traite 40 questions situationnelles couvrant les 3 domaines",
        "Pour chaque erreur, écris pourquoi ta réponse était plausible mais fausse",
        "Dégage les 5 principes de raisonnement récurrents que tu as identifiés",
      ],
      rubric: [
        { criterion: "Score ≥ 70 % au premier passage", points: 40 },
        { criterion: "Analyse écrite de chaque erreur", points: 40 },
        { criterion: "Principes récurrents dégagés", points: 20 },
      ],
    },
  },

  people: {
    outcomes: [
      "Diagnostiquer et résoudre un conflit d'équipe selon le modèle du PMI",
      "Adapter son style de leadership au niveau de maturité de l'équipe",
      "Construire un plan d'engagement des parties prenantes",
    ],
    prerequisites: ["Module Mindset PMI"],
    books: [
      { title: "The Five Dysfunctions of a Team", author: "Patrick Lencioni", url: "https://www.tablegroup.com/books/dysfunctions/", free: false, why: "~25 €. Court, sous forme de récit. Le modèle de référence sur les dynamiques d'équipe, directement applicable aux questions People (33 % de l'examen)." },
    ],
    problemSet: {
      title: "Problem Set P3 — Plan d'engagement et gestion de conflit",
      domain: "Management d'équipe",
      brief: "Une équipe en tension, des parties prenantes hostiles. Que fais-tu, et dans quel ordre ?",
      tasks: [
        "Grille d'engagement : état actuel vs état désiré pour 10 parties prenantes",
        "Plan d'actions concrètes pour déplacer 3 parties prenantes résistantes",
        "Analyse d'un conflit d'équipe et choix de la technique de résolution, argumenté",
        "Plan de communication : qui, quoi, quand, par quel canal",
      ],
      rubric: [
        { criterion: "Grille d'engagement complète", points: 25 },
        { criterion: "Actions concrètes et réalistes", points: 25 },
        { criterion: "Technique de résolution justifiée", points: 25 },
        { criterion: "Plan de communication exploitable", points: 25 },
      ],
    },
  },

  process: {
    outcomes: [
      "Calculer et interpréter les indicateurs EVM (CPI, SPI, EAC)",
      "Identifier le chemin critique et l'impact d'un retard",
      "Conduire une analyse de risques qualitative et quantitative",
    ],
    prerequisites: ["Module Fondamentaux"],
    books: [
      { title: "PMBOK Guide, 7e édition", author: "PMI", url: "https://www.pmi.org/pmbok-guide-standards", free: false, why: "Référentiel officiel — les processus du domaine Process (41 % de l'examen) en découlent directement." },
      { title: "Practice Standard for Earned Value Management", author: "PMI", url: "https://www.pmi.org/pmbok-guide-standards/practice-guides/evm", free: false, why: "Inclus dans l'adhésion PMI. L'EVM tombe systématiquement à l'examen et se calcule, donc les points sont sûrs." },
    ],
    problemSet: {
      title: "Problem Set P4 — Diagnostic EVM d'un projet en dérive",
      domain: "Pilotage de projet",
      brief: "Semaine 14 sur 26, budget déjà consommé à 68 %. Diagnostic et plan de redressement.",
      tasks: [
        "Calcule PV, EV, AC, CV, SV, CPI, SPI",
        "Interprète chaque indicateur en une phrase de langage métier",
        "Calcule l'EAC et projette la date de fin révisée",
        "Analyse les causes racines (5 pourquoi ou Ishikawa)",
        "Propose 5 actions correctives avec responsable, délai et impact attendu",
      ],
      rubric: [
        { criterion: "Calculs EVM exacts", points: 30 },
        { criterion: "Interprétation métier juste", points: 20 },
        { criterion: "EAC et projection correctes", points: 20 },
        { criterion: "Analyse des causes racines", points: 15 },
        { criterion: "Plan d'actions réaliste", points: 15 },
      ],
    },
  },

  "agile-hybride": {
    outcomes: [
      "Choisir entre Scrum, Kanban et hybride selon le contexte projet",
      "Animer les cérémonies agiles et en tirer des décisions",
      "Adapter le reporting EVM à un contexte agile",
    ],
    prerequisites: ["Module Process"],
    books: [
      { title: "Agile Practice Guide", author: "PMI & Agile Alliance", url: "https://www.pmi.org/pmbok-guide-standards/practice-guides/agile", free: false, why: "Inclus dans l'adhésion PMI. Co-écrit avec l'Agile Alliance — c'est la vision agile que l'examen évalue." },
      { title: "Scrum Guide 2020", author: "Schwaber & Sutherland", url: "https://scrumguides.org/", free: true, why: "Gratuit, 13 pages, par les créateurs de Scrum. À lire intégralement au moins deux fois." },
    ],
    problemSet: {
      title: "Problem Set P5 — Simulation de 4 sprints",
      domain: "Delivery agile",
      brief: "Un projet hybride : phases prédictives en amont, développement en sprints.",
      tasks: [
        "Backlog de 20 user stories au format INVEST avec story points",
        "Planifie et simule 4 sprints avec vélocité et burndown",
        "Rédige les comptes-rendus de 4 rétrospectives avec actions",
        "Gère un blocage externe au sprint 3 : décision et justification",
        "Produis un reporting hybride combinant burndown et indicateurs EVM adaptés",
      ],
      rubric: [
        { criterion: "Backlog conforme INVEST", points: 20 },
        { criterion: "Simulation de sprints cohérente", points: 25 },
        { criterion: "Rétrospectives actionnables", points: 20 },
        { criterion: "Gestion du blocage argumentée", points: 20 },
        { criterion: "Reporting hybride pertinent", points: 15 },
      ],
    },
  },

  business: {
    outcomes: [
      "Relier un projet à la stratégie et aux bénéfices attendus",
      "Intégrer les exigences de conformité dans le pilotage",
      "Piloter la réalisation des bénéfices après livraison",
    ],
    prerequisites: ["Module Process"],
    books: [
      { title: "The Standard for Business Analysis", author: "PMI", url: "https://www.pmi.org/pmbok-guide-standards", free: false, why: "Inclus dans l'adhésion PMI. Couvre le domaine Business Environment (26 % de l'examen), souvent le plus négligé." },
    ],
    problemSet: {
      title: "Problem Set P6 — Business case et plan de bénéfices",
      domain: "Stratégie d'entreprise",
      brief: "Justifier un projet devant un comité de direction, chiffres à l'appui.",
      tasks: [
        "Rédige un business case avec ROI, VAN et délai de retour",
        "Construis un plan de réalisation des bénéfices avec indicateurs et échéances",
        "Identifie les exigences de conformité applicables et leur impact planning",
        "Prépare une note d'une page pour le comité de direction",
      ],
      rubric: [
        { criterion: "Business case chiffré et crédible", points: 30 },
        { criterion: "Plan de bénéfices mesurable", points: 30 },
        { criterion: "Conformité traitée", points: 20 },
        { criterion: "Note exécutive claire et concise", points: 20 },
      ],
    },
  },

  "strategie-examen": {
    outcomes: [
      "Construire un plan de révision calibré sur ton niveau réel",
      "Gérer le temps sur 180 questions en 230 minutes",
      "Appliquer une méthode d'élimination sur les questions situationnelles",
    ],
    prerequisites: ["Tous les modules de contenu PMP"],
    books: [
      { title: "PMP Exam Prep (11e éd.)", author: "Rita Mulcahy", url: "https://rmcls.com/", free: false, why: "~90 €. Ses examens blancs sont réputés plus difficiles que le vrai examen — parfait comme étalon de préparation." },
    ],
    problemSet: {
      title: "Problem Set P7 — Plan de révision personnalisé",
      domain: "Préparation à la certification",
      brief: "Un plan construit sur tes faiblesses mesurées, pas sur une impression.",
      tasks: [
        "Passe un test diagnostique de 60 questions et calcule ton score par domaine ECO",
        "Identifie tes 5 tâches ECO les plus faibles",
        "Construis un plan de révision sur 6 semaines ciblant ces faiblesses",
        "Définis ta stratégie de temps : questions par heure, moment des pauses",
      ],
      rubric: [
        { criterion: "Diagnostic chiffré par domaine", points: 30 },
        { criterion: "Faiblesses correctement identifiées", points: 25 },
        { criterion: "Plan réaliste et daté", points: 25 },
        { criterion: "Stratégie de temps définie", points: 20 },
      ],
    },
  },

  "examen-blanc": {
    outcomes: [
      "Soutenir 180 questions en conditions réelles d'examen",
      "Analyser ses erreurs pour cibler les dernières révisions",
    ],
    prerequisites: ["Tous les modules PMP"],
    books: [
      { title: "PMI Study Hall", author: "PMI", url: "https://www.pmi.org/certifications/exam-prep", free: false, why: "~50-140 €. Banque de questions officielle du PMI — les plus proches du vrai examen. À prendre dans le dernier mois." },
    ],
    problemSet: {
      title: "Problem Set P8 — Examen blanc chronométré",
      domain: "Certification",
      brief: "180 questions, 230 minutes, sans interruption. Comme le jour J.",
      tasks: [
        "Passe l'examen blanc complet en conditions réelles, sans pause hors protocole",
        "Calcule ton score par domaine ECO",
        "Analyse par écrit chaque erreur : distraction, méconnaissance ou piège de formulation ?",
        "Établis ton plan des 7 derniers jours à partir de cette analyse",
      ],
      rubric: [
        { criterion: "Examen passé en conditions réelles", points: 30 },
        { criterion: "Score ≥ 75 % (seuil de confiance)", points: 30 },
        { criterion: "Analyse d'erreurs catégorisée", points: 25 },
        { criterion: "Plan final ciblé", points: 15 },
      ],
    },
  },
};

/** Récupère le syllabus d'un module, ou null s'il n'en a pas encore. */
export function getSyllabus(moduleId) {
  return SYLLABUS[moduleId] || null;
}
