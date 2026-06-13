// Propositions de projets pratiques par niveau.

export const PROJECTS = [
  {
    id: "p1",
    title: "Analyseur de données Titanic",
    level: "debutant",
    duration: "1 semaine",
    skills: ["Pandas", "Visualisation", "Statistiques"],
    description:
      "Explorez le célèbre dataset Titanic : nettoyage des données, statistiques de survie par classe/sexe/âge, visualisations avec matplotlib et seaborn.",
    steps: [
      "Charger le dataset (seaborn.load_dataset('titanic'))",
      "Traiter les valeurs manquantes (âge, port d'embarquement)",
      "Calculer les taux de survie par segment",
      "Créer 5 visualisations qui racontent une histoire",
      "Rédiger vos conclusions dans un notebook propre",
    ],
  },
  {
    id: "p2",
    title: "Prédicteur de prix immobiliers",
    level: "debutant",
    duration: "1-2 semaines",
    skills: ["scikit-learn", "Régression", "Feature engineering"],
    description:
      "Votre premier modèle supervisé : prédire le prix de maisons (dataset California Housing) avec une régression linéaire puis un Random Forest.",
    steps: [
      "Explorer les corrélations entre features et prix",
      "Créer un pipeline train/test propre",
      "Baseline : régression linéaire + métriques (MAE, RMSE)",
      "Améliorer avec Random Forest et feature engineering",
      "Comparer les modèles et analyser les feature importances",
    ],
  },
  {
    id: "p3",
    title: "Classifieur de spam",
    level: "intermediaire",
    duration: "2 semaines",
    skills: ["NLP", "TF-IDF", "Classification", "Métriques"],
    description:
      "Construisez un filtre anti-spam complet : vectorisation du texte, comparaison de modèles, et attention particulière au choix précision/rappel.",
    steps: [
      "Prétraiter les textes (nettoyage, tokenisation)",
      "Vectoriser avec TF-IDF",
      "Comparer Naive Bayes, régression logistique et SVM",
      "Optimiser le seuil de décision selon le coût des faux positifs",
      "Exposer le modèle dans une petite API FastAPI",
    ],
  },
  {
    id: "p4",
    title: "Segmentation de clientèle",
    level: "intermediaire",
    duration: "2 semaines",
    skills: ["Clustering", "K-means", "PCA", "Business"],
    description:
      "Apprentissage non supervisé sur des données clients : identifiez des segments exploitables et présentez-les comme à un comité de direction.",
    steps: [
      "Préparer et normaliser les données clients (RFM)",
      "Choisir k avec la méthode du coude et le score silhouette",
      "Visualiser les clusters via PCA",
      "Caractériser et nommer chaque segment",
      "Produire un rapport avec recommandations marketing",
    ],
  },
  {
    id: "p5",
    title: "Reconnaissance d'images avec CNN",
    level: "intermediaire",
    duration: "2-3 semaines",
    skills: ["PyTorch", "CNN", "Transfer learning", "GPU"],
    description:
      "Entraînez un CNN sur CIFAR-10, puis dépassez-le par transfer learning avec un ResNet pré-entraîné.",
    steps: [
      "Construire un CNN simple de zéro en PyTorch",
      "Mettre en place data augmentation et early stopping",
      "Fine-tuner un ResNet18 pré-entraîné",
      "Comparer les courbes d'apprentissage des deux approches",
      "Analyser les erreurs : matrice de confusion, images mal classées",
    ],
  },
  {
    id: "p6",
    title: "Chatbot RAG sur vos documents",
    level: "avance",
    duration: "3 semaines",
    skills: ["LLM", "Embeddings", "RAG", "API"],
    description:
      "Construisez un assistant qui répond à partir de VOS documents : chunking, base vectorielle, récupération et génération avec citations.",
    steps: [
      "Découper un corpus de documents en chunks",
      "Calculer les embeddings et les indexer (FAISS ou Chroma)",
      "Implémenter la récupération top-k par similarité cosinus",
      "Construire le prompt avec contexte + citations des sources",
      "Évaluer : jeu de questions-réponses test, mesure de fidélité",
    ],
  },
  {
    id: "p7",
    title: "Détection de fraude en temps réel",
    level: "avance",
    duration: "3-4 semaines",
    skills: ["Déséquilibre de classes", "XGBoost", "API", "Monitoring"],
    description:
      "Un cas industriel complet : classes très déséquilibrées, coût asymétrique des erreurs, déploiement et monitoring de drift.",
    steps: [
      "Gérer le déséquilibre (SMOTE, pondération des classes)",
      "Entraîner XGBoost et optimiser pour le rappel à précision contrainte",
      "Déployer en API avec Docker",
      "Implémenter un monitoring de drift des features",
      "Simuler un drift et déclencher un ré-entraînement",
    ],
  },
  {
    id: "p8",
    title: "Agent AI avec outils",
    level: "avance",
    duration: "3-4 semaines",
    skills: ["LLM", "Agents", "Tool use", "Évaluation"],
    description:
      "Construisez votre propre agent : un LLM qui appelle des outils (calculatrice, recherche, exécution de code) en boucle pour résoudre des tâches complexes.",
    steps: [
      "Définir 3 outils avec leurs schémas JSON",
      "Implémenter la boucle agent : appel LLM → tool use → résultat → ré-appel",
      "Ajouter une mémoire de conversation",
      "Construire un jeu d'évaluation de 20 tâches",
      "Mesurer le taux de réussite et itérer sur le system prompt",
    ],
  },
];
