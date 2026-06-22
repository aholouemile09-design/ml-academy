// ─────────────────────────────────────────────────────────────────────────────
// RÈGLE IA — TRÈS IMPORTANTE
// Le tuteur AI NE DOIT JAMAIS faire le projet à la place de l'apprenant.
// Si on lui demande du code complet : expliquer gentiment comment réfléchir,
// quelle ressource lire, quelle question se poser. Guider, jamais faire.
// ─────────────────────────────────────────────────────────────────────────────

// hint_level : "high" = débutant (beaucoup d'aide), "medium" = intermédiaire, "none" = avancé

export const PROJECTS = [

  // ══════════════════════════════════════════════════════════════════════════
  // DÉBUTANT — 6 projets — hint_level: "high"
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "p-deb-1",
    title: "Analyseur de notes de classe",
    level: "debutant",
    hint_level: "high",
    duration: "1 semaine",
    icon: "📊",
    skills: ["Python", "pandas", "matplotlib", "statistiques descriptives"],
    description: "Charge un fichier CSV de notes d'étudiants, calcule les statistiques (moyenne, médiane, écart-type), identifie les élèves en difficulté et produit un rapport visuel.",
    learning_goal: "Apprendre à manipuler des données tabulaires, calculer des statistiques et créer une visualisation utile.",
    steps: [
      "Crée un CSV fictif avec 20 étudiants et 5 matières",
      "Charge le fichier avec pandas et explore-le (head, describe, info)",
      "Calcule la moyenne par étudiant et par matière",
      "Identifie les étudiants sous la barre des 60%",
      "Crée un histogramme des moyennes avec matplotlib",
      "Génère un rapport texte avec les statistiques clés",
    ],
    hints: [
      {
        step: 0,
        title: "Comment créer ton CSV ?",
        hint: "Tu peux créer un fichier CSV manuellement dans Excel ou avec Python. Pense à tes colonnes : Nom, Math, Français, Science, Histoire, Anglais. La fonction pd.DataFrame() peut aussi générer des données de test avec des valeurs aléatoires (cherche np.random.randint).",
      },
      {
        step: 1,
        title: "Explorer un DataFrame",
        hint: "Un DataFrame pandas a des méthodes très utiles : .head() pour voir les premières lignes, .info() pour les types de colonnes, .describe() pour les statistiques automatiques. Essaie-les une par une et lis ce que chacune affiche.",
      },
      {
        step: 2,
        title: "Calculer des moyennes",
        hint: "Pandas a une méthode .mean() qui calcule la moyenne d'une colonne ou d'une ligne. Pour calculer la moyenne par étudiant (ligne), pense à l'argument axis=. Consulte la doc : pandas.pydata.org/docs/reference/api/pandas.DataFrame.mean.html",
      },
      {
        step: 3,
        title: "Filtrer des lignes selon une condition",
        hint: "En pandas, on filtre avec des conditions booléennes entre crochets : df[df['colonne'] < valeur]. C'est comme dire 'garde seulement les lignes où la condition est vraie'. Essaie d'abord avec une seule condition simple.",
      },
      {
        step: 4,
        title: "Créer un histogramme",
        hint: "matplotlib.pyplot.hist() crée un histogramme. Commence par import matplotlib.pyplot as plt, puis plt.hist(tes_données), plt.show(). Cherche comment ajouter un titre et des labels aux axes — c'est dans plt.title(), plt.xlabel().",
      },
      {
        step: 5,
        title: "Générer un rapport texte",
        hint: "Tu peux simplement écrire du texte formaté avec print() et des f-strings. Pour sauvegarder dans un fichier texte, utilise open('rapport.txt', 'w') as f: et f.write(). Pense à inclure : nombre d'étudiants, moyenne générale, meilleure/pire matière.",
      },
    ],
    resources: [
      { label: "pandas getting started", url: "https://pandas.pydata.org/docs/getting_started/index.html" },
      { label: "matplotlib tutorials", url: "https://matplotlib.org/stable/tutorials/index.html" },
    ],
    ai_guidance: "Si tu bloques, demande au tuteur de t'expliquer le concept qui te pose problème — pas de te donner le code. Ex: 'Explique-moi comment fonctionne le filtrage pandas' plutôt que 'Écris le code pour filtrer'.",
  },

  {
    id: "p-deb-2",
    title: "Prédicteur de prix de maison (régression simple)",
    level: "debutant",
    hint_level: "high",
    duration: "1 semaine",
    icon: "🏠",
    skills: ["Python", "scikit-learn", "pandas", "LinearRegression"],
    description: "Entraîne un modèle de régression linéaire pour prédire le prix d'une maison à partir de sa superficie. Visualise la droite de régression et évalue l'erreur.",
    learning_goal: "Comprendre le concept fondamental de régression linéaire, d'entraînement d'un modèle et d'évaluation.",
    steps: [
      "Crée ou télécharge un dataset superficie → prix (50-100 maisons)",
      "Explore les données : scatter plot superficie vs prix",
      "Sépare les données en train (80%) et test (20%)",
      "Entraîne un LinearRegression de scikit-learn sur le train",
      "Prédit les prix du test set et trace la droite de régression",
      "Calcule le MSE et le R² pour évaluer ton modèle",
    ],
    hints: [
      {
        step: 0,
        title: "Où trouver un dataset simple ?",
        hint: "Tu peux générer tes propres données avec numpy : superficie = np.random.uniform(50, 300, 100) et prix = superficie * 3000 + np.random.normal(0, 20000, 100). Ou télécharge le dataset 'Housing' sur Kaggle. L'important c'est de comprendre la structure : une colonne X (superficie) et une colonne y (prix).",
      },
      {
        step: 1,
        title: "Visualiser avec scatter plot",
        hint: "plt.scatter(X, y) trace un nuage de points. Regarde si tu vois une tendance linéaire — c'est ce que la régression va modéliser. Ajoute plt.xlabel('Superficie (m²)') et plt.ylabel('Prix ($)') pour rendre le graphique lisible.",
      },
      {
        step: 2,
        title: "Train/Test split",
        hint: "sklearn a une fonction toute faite : from sklearn.model_selection import train_test_split. Elle prend (X, y, test_size=0.2, random_state=42). Le random_state fixe le hasard pour que tu obtiens les mêmes résultats à chaque exécution.",
      },
      {
        step: 3,
        title: "Entraîner LinearRegression",
        hint: "from sklearn.linear_model import LinearRegression, puis model = LinearRegression(), puis model.fit(X_train, y_train). ATTENTION : sklearn attend des tableaux 2D pour X. Si tu as une seule colonne, reshape avec X.reshape(-1, 1).",
      },
      {
        step: 4,
        title: "Tracer la droite de régression",
        hint: "Après model.fit(), model.predict() donne les prédictions. Pour tracer la droite : plt.scatter(X_test, y_test) puis plt.plot(X_test, model.predict(X_test.reshape(-1,1)), color='red'). La droite rouge montre ce que ton modèle prédit.",
      },
      {
        step: 5,
        title: "MSE et R² — que signifient-ils ?",
        hint: "MSE (Mean Squared Error) mesure l'erreur moyenne au carré — plus c'est bas, mieux c'est. R² (coefficient de détermination) va de 0 à 1 — 1 = modèle parfait. sklearn les calcule avec mean_squared_error() et r2_score() dans sklearn.metrics. Cherche comment les importer et les utiliser.",
      },
    ],
    resources: [
      { label: "sklearn Linear Regression", url: "https://scikit-learn.org/stable/modules/linear_model.html" },
      { label: "Kaggle Housing dataset", url: "https://www.kaggle.com/datasets/harlfoxem/housesalesprediction" },
    ],
    ai_guidance: "Le tuteur peut t'expliquer pourquoi on utilise reshape(-1, 1), ce que signifie R², ou comment interpréter ton graphique. Il ne t'écrira pas le code — c'est toi qui apprends.",
  },

  {
    id: "p-deb-3",
    title: "Classificateur de spam email",
    level: "debutant",
    hint_level: "high",
    duration: "1-2 semaines",
    icon: "📧",
    skills: ["Python", "pandas", "scikit-learn", "NLP basique", "Naive Bayes"],
    description: "Construis un classificateur qui détecte si un email est spam ou non à partir de son texte. Utilise le dataset SMS Spam Collection de UCI.",
    learning_goal: "Introduire le NLP basique (bag of words, TF-IDF) et la classification de texte.",
    steps: [
      "Télécharge le dataset SMS Spam Collection (UCI / Kaggle)",
      "Explore les données : ratio spam/ham, longueur des messages",
      "Nettoie le texte : minuscules, suppression ponctuation",
      "Transforme le texte en vecteurs avec CountVectorizer ou TfidfVectorizer",
      "Entraîne un Naive Bayes (MultinomialNB) et évalue avec F1-score",
      "Teste ton modèle sur 3 messages que tu écris toi-même",
    ],
    hints: [
      { step: 0, title: "Télécharger le dataset", hint: "Cherche 'SMS Spam Collection UCI' sur Kaggle ou sur le site UCI Machine Learning Repository. C'est un fichier TSV (tab-separated). pandas peut le lire avec pd.read_csv('spam.tsv', sep='\\t', header=None, names=['label','text'])." },
      { step: 1, title: "Explorer les classes", hint: "value_counts() sur la colonne label te donne la distribution spam/ham. Calcule aussi la longueur moyenne des messages avec df['text'].str.len(). Est-ce que les spams sont plus longs ? Cette exploration s'appelle l'Analyse Exploratoire des Données (EDA)." },
      { step: 2, title: "Nettoyer le texte", hint: "Python str a des méthodes utiles : .lower() pour minuscules, .replace() ou re.sub() pour supprimer la ponctuation. Le module re (expressions régulières) est très pratique ici. Commence simple : juste .lower() et applique-le avec df['text'].str.lower()." },
      { step: 3, title: "TF-IDF vs CountVectorizer", hint: "CountVectorizer compte les occurrences de chaque mot. TfidfVectorizer pondère les mots rares (plus informatifs). Les deux sont dans sklearn.feature_extraction.text. Essaie d'abord CountVectorizer — c'est plus simple à comprendre avant TF-IDF." },
      { step: 4, title: "Pourquoi Naive Bayes pour le texte ?", hint: "MultinomialNB est particulièrement efficace pour la classification de texte avec des comptes de mots. Il suppose que les features sont indépendantes (d'où 'naïf'), ce qui est faux en pratique mais donne de très bons résultats sur le texte. Cherche sklearn.naive_bayes.MultinomialNB." },
      { step: 5, title: "Tester avec tes propres messages", hint: "Pour prédire sur un nouveau message, tu dois lui appliquer la même transformation que l'entraînement : vectorizer.transform(['Ton message ici']). Le modèle retourne 0 (ham) ou 1 (spam). Essaie d'écrire un vrai spam et un vrai email normal pour voir si ça marche !" },
    ],
    resources: [
      { label: "SMS Spam Collection dataset", url: "https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset" },
      { label: "sklearn text feature extraction", url: "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction" },
    ],
    ai_guidance: "Demande au tuteur d'expliquer ce qu'est TF-IDF, pourquoi Naive Bayes fonctionne bien sur le texte, ou comment interpréter ton F1-score. Pas de code complet.",
  },

  {
    id: "p-deb-4",
    title: "Visualisation de données COVID-19",
    level: "debutant",
    hint_level: "high",
    duration: "1 semaine",
    icon: "📈",
    skills: ["Python", "pandas", "matplotlib", "seaborn", "données réelles"],
    description: "Télécharge les données publiques COVID-19 et crée un tableau de bord de visualisations : évolution des cas, comparaison entre pays, courbes de tendance.",
    learning_goal: "Maîtriser les visualisations avec des données réelles imparfaites (valeurs manquantes, formats variés).",
    steps: [
      "Télécharge les données Our World in Data COVID-19",
      "Nettoie les données : gère les valeurs manquantes, convertis les dates",
      "Trace l'évolution des cas pour un pays de ton choix",
      "Compare 3 pays sur le même graphique",
      "Ajoute une moyenne mobile 7 jours pour lisser la courbe",
      "Crée un bar chart des pays les plus touchés (optionnel)",
    ],
    hints: [
      { step: 0, title: "Télécharger les données", hint: "Our World in Data publie un CSV mis à jour : github.com/owid/covid-19-data. Le fichier owid-covid-data.csv contient toutes les colonnes. Télécharge-le et ouvre-le avec pandas pour voir sa structure avec df.columns." },
      { step: 1, title: "Gérer les valeurs manquantes", hint: "df.isnull().sum() te montre combien de valeurs manquent par colonne. Pour les dates, pd.to_datetime() convertit une colonne texte en vrai format date. Pour les NaN dans les cas, .fillna(0) ou .dropna() selon le contexte — pense à ce qui est logique." },
      { step: 2, title: "Filtrer par pays", hint: "La colonne 'location' contient les noms des pays. Filtre avec df[df['location'] == 'Canada']. Ensuite trace plt.plot(df_canada['date'], df_canada['new_cases'])." },
      { step: 3, title: "Plusieurs pays sur un graphique", hint: "Utilise une boucle : for pays in ['Canada', 'France', 'Brazil']: et trace une ligne par pays dans la même figure. plt.legend() ajoute la légende automatiquement si tu passes label= à chaque plt.plot()." },
      { step: 4, title: "Moyenne mobile", hint: "pandas a .rolling(7).mean() qui calcule la moyenne glissante sur 7 jours. Applique-le sur la colonne new_cases et trace les deux courbes (brute + moyenne) sur le même graphique pour voir la différence." },
      { step: 5, title: "Bar chart des pays", hint: "Filtre sur une date précise, groupe par pays avec .groupby('location')['total_cases'].max(), trie avec .sort_values(ascending=False) et prends les 10 premiers avec .head(10). Trace avec plt.barh() pour un bar chart horizontal lisible." },
    ],
    resources: [
      { label: "Our World in Data COVID-19", url: "https://github.com/owid/covid-19-data/tree/master/public/data" },
      { label: "seaborn gallery", url: "https://seaborn.pydata.org/examples/index.html" },
    ],
    ai_guidance: "Le tuteur peut t'aider à comprendre ce qu'est une moyenne mobile, pourquoi on filtre les NaN, ou comment fonctionnent les subplots. Dis-lui exactement où tu bloques.",
  },

  {
    id: "p-deb-5",
    title: "Segmenteur d'iris — ton premier clustering",
    level: "debutant",
    hint_level: "high",
    duration: "1 semaine",
    icon: "🌸",
    skills: ["Python", "scikit-learn", "KMeans", "PCA", "matplotlib"],
    description: "Utilise le célèbre dataset Iris pour découvrir le clustering non-supervisé avec K-Means. Visualise les clusters et comprends la différence entre apprentissage supervisé et non-supervisé.",
    learning_goal: "Introduire le clustering et l'apprentissage non-supervisé. Comprendre PCA pour visualiser en 2D.",
    steps: [
      "Charge le dataset Iris depuis sklearn.datasets",
      "Explore : 4 features, 3 espèces, 150 exemples",
      "Applique KMeans avec k=3 et observe les clusters",
      "Compare les clusters trouvés avec les vraies espèces",
      "Réduis en 2D avec PCA et visualise les clusters colorés",
      "Essaie k=2 et k=4 — qu'est-ce qui change ?",
    ],
    hints: [
      { step: 0, title: "Charger Iris", hint: "from sklearn.datasets import load_iris, puis data = load_iris(). C'est un objet avec data.data (les features) et data.target (les espèces). Crée un DataFrame pandas pour mieux explorer : pd.DataFrame(data.data, columns=data.feature_names)." },
      { step: 1, title: "Explorer les features", hint: "Utilise seaborn.pairplot(df, hue='species') pour voir toutes les paires de features en même temps. C'est un outil puissant pour visualiser des données multi-dimensionnelles. C'est l'une des premières choses qu'un Data Scientist fait sur un nouveau dataset." },
      { step: 2, title: "Appliquer KMeans", hint: "from sklearn.cluster import KMeans. kmeans = KMeans(n_clusters=3, random_state=42). kmeans.fit(X). Les labels assignés sont dans kmeans.labels_. IMPORTANT : KMeans ne connaît pas les vraies espèces — il groupe juste par similarité." },
      { step: 3, title: "Comparer avec les vraies espèces", hint: "Les labels KMeans (0, 1, 2) ne correspondent pas forcément aux espèces (0, 1, 2) dans le même ordre. Crée un tableau croisé avec pd.crosstab(kmeans.labels_, data.target) pour voir comment les clusters se superposent aux espèces." },
      { step: 4, title: "Réduire avec PCA", hint: "from sklearn.decomposition import PCA. pca = PCA(n_components=2). X_2d = pca.fit_transform(X). Maintenant tu peux tracer plt.scatter(X_2d[:,0], X_2d[:,1], c=kmeans.labels_). PCA projette les 4 dimensions en 2 en gardant le maximum d'information." },
      { step: 5, title: "Choisir le bon k", hint: "Cherche 'Elbow method KMeans' — c'est une technique pour choisir le bon nombre de clusters. On trace l'inertie (kmeans.inertia_) pour différentes valeurs de k et on cherche le 'coude' de la courbe. Essaie de l'implémenter pour k de 1 à 8." },
    ],
    resources: [
      { label: "sklearn clustering guide", url: "https://scikit-learn.org/stable/modules/clustering.html" },
      { label: "sklearn PCA", url: "https://scikit-learn.org/stable/modules/decomposition.html#pca" },
    ],
    ai_guidance: "Le tuteur peut t'expliquer pourquoi PCA conserve l'information, ce qu'est l'inertie KMeans, ou la différence supervisé/non-supervisé. Pas de solution directe.",
  },

  {
    id: "p-deb-6",
    title: "Script CLI d'analyse de fichier texte",
    level: "debutant",
    hint_level: "high",
    duration: "3-4 jours",
    icon: "🖥️",
    skills: ["Python", "argparse", "collections", "fichiers", "CLI"],
    description: "Crée un outil en ligne de commande qui analyse n'importe quel fichier texte : nombre de mots, mots les plus fréquents, longueur moyenne des phrases.",
    learning_goal: "Apprendre à créer de vrais outils Python réutilisables avec argparse, manipulation de fichiers et collections.",
    steps: [
      "Crée un script qui lit un fichier .txt passé en argument",
      "Compte les mots, lignes et caractères",
      "Affiche les 10 mots les plus fréquents (hors mots vides)",
      "Calcule la longueur moyenne des phrases",
      "Ajoute des options CLI : --top N, --output fichier",
      "Gère les erreurs proprement (fichier manquant, encodage)",
    ],
    hints: [
      { step: 0, title: "Lire un argument de ligne de commande", hint: "Python a deux façons : sys.argv (basique) ou argparse (recommandé). import argparse, puis parser = argparse.ArgumentParser(), parser.add_argument('fichier'), args = parser.parse_args(). args.fichier contient le nom du fichier. Lance avec : python analyse.py mon_texte.txt" },
      { step: 1, title: "Compter mots et lignes", hint: "Lis le fichier avec open(args.fichier, 'r', encoding='utf-8') as f: content = f.read(). Puis .split() pour les mots, .split('\\n') pour les lignes, len() pour compter. Simple mais efficace." },
      { step: 2, title: "Mots les plus fréquents", hint: "collections.Counter est parfait pour ça : from collections import Counter. counter = Counter(mots). counter.most_common(10) donne les 10 plus fréquents. Pour les mots vides (le, la, de, et...), crée une liste STOP_WORDS et filtre : [m for m in mots if m not in STOP_WORDS]." },
      { step: 3, title: "Longueur moyenne des phrases", hint: "Sépare le texte en phrases avec re.split(r'[.!?]', text). Enlève les phrases vides avec [s for s in phrases if s.strip()]. Puis calcule la moyenne des len(s.split()) pour chaque phrase." },
      { step: 4, title: "Options CLI avancées", hint: "parser.add_argument('--top', type=int, default=10) ajoute une option optionnelle. parser.add_argument('--output', type=str) pour le fichier de sortie. argparse gère automatiquement l'aide avec python analyse.py --help." },
      { step: 5, title: "Gérer les erreurs", hint: "Entoure ton code d'un try/except. FileNotFoundError si le fichier n'existe pas, UnicodeDecodeError si l'encodage est mauvais. Affiche un message d'erreur clair avec sys.exit(1) pour indiquer l'échec. Un bon outil CLI ne plante jamais silencieusement." },
    ],
    resources: [
      { label: "argparse tutorial Python", url: "https://docs.python.org/3/howto/argparse.html" },
      { label: "collections.Counter", url: "https://docs.python.org/3/library/collections.html#collections.Counter" },
    ],
    ai_guidance: "Ce projet développe de vraies compétences d'ingénierie. Le tuteur peut t'expliquer argparse, les expressions régulières ou la gestion d'erreurs — mais c'est toi qui codes.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INTERMÉDIAIRE — 5 projets — hint_level: "medium"
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "p-int-1",
    title: "Prédiction de churn client",
    level: "intermediaire",
    hint_level: "medium",
    duration: "2 semaines",
    icon: "📉",
    skills: ["Python", "scikit-learn", "XGBoost", "SHAP", "feature engineering"],
    description: "Prédit quels clients vont annuler leur abonnement (churn). Pipeline complet : EDA, feature engineering, modèle XGBoost, interprétabilité avec SHAP, recommandations business.",
    learning_goal: "Mener un projet ML de bout en bout avec un dataset réel déséquilibré et présenter des insights actionnables.",
    steps: [
      "EDA sur le Telco Customer Churn dataset — distribution, corrélations, churn rate",
      "Feature engineering : tenure groups, charges par mois, contrat en numérique",
      "Pipeline sklearn : imputation → encoding → scaling → XGBoost",
      "Gérer le déséquilibre des classes (SMOTE ou class_weight)",
      "Évaluer avec AUC-ROC, précision-rappel, matrice de confusion",
      "Expliquer le modèle avec SHAP — quels features causent le churn ?",
      "Rédige 3 recommandations business basées sur les SHAP values",
    ],
    hints: [
      { step: 0, title: "Dataset et EDA", hint: "Dataset Telco sur Kaggle. Pour l'EDA : taux de churn global, distributions par type de contrat, par tenure. Cherche les patterns visuels avant de modéliser." },
      { step: 3, title: "Classes déséquilibrées", hint: "Si seulement 15% de churn, un modèle 'toujours non-churn' a 85% accuracy mais est inutile. Cherche class_weight='balanced' dans XGBClassifier ou explore SMOTE (imblearn library)." },
      { step: 5, title: "SHAP pour l'interprétabilité", hint: "pip install shap. shap.TreeExplainer(model) puis shap.summary_plot(). Chaque feature a une valeur SHAP qui indique son impact sur la prédiction. Lis la doc shap.readthedocs.io pour comprendre les graphiques." },
    ],
    resources: [
      { label: "Telco Churn Kaggle", url: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn" },
      { label: "SHAP documentation", url: "https://shap.readthedocs.io/" },
      { label: "imbalanced-learn", url: "https://imbalanced-learn.org/stable/" },
    ],
    ai_guidance: "Ce niveau demande plus d'autonomie. Le tuteur peut t'orienter vers les bonnes ressources ou t'expliquer un concept, mais tu dois chercher et coder toi-même.",
  },

  {
    id: "p-int-2",
    title: "Système de recommandation de films",
    level: "intermediaire",
    hint_level: "medium",
    duration: "2 semaines",
    icon: "🎬",
    skills: ["Python", "pandas", "surprise", "filtrage collaboratif", "similarité cosinus"],
    description: "Construis un moteur de recommandation basé sur les notes utilisateurs (collaborative filtering) et sur le contenu (content-based). Compare les deux approches.",
    learning_goal: "Comprendre les algorithmes de recommandation — la base de Netflix, Spotify, YouTube.",
    steps: [
      "Télécharge le MovieLens 100K dataset",
      "Implémente un filtrage basé sur le contenu (TF-IDF sur les genres/titres)",
      "Implémente un filtrage collaboratif user-user avec la similarité cosinus",
      "Utilise la librairie Surprise pour SVD (matrix factorization)",
      "Évalue avec RMSE sur un split train/test",
      "Compare les 3 approches sur un utilisateur test",
    ],
    hints: [
      { step: 1, title: "Content-based filtering", hint: "Calcule la similarité cosinus entre films à partir de leurs features (genres, tags). sklearn a cosine_similarity() dans sklearn.metrics.pairwise. Pour un film donné, retourne les N films les plus similaires." },
      { step: 2, title: "Collaborative filtering", hint: "Construis une matrice user×film avec les notes. La similarité cosinus entre deux utilisateurs mesure à quel point ils ont les mêmes goûts. Pour prédire la note d'un utilisateur, fais une moyenne pondérée des notes des utilisateurs similaires." },
      { step: 3, title: "Librairie Surprise", hint: "pip install scikit-surprise. from surprise import SVD, Dataset, Reader. SVD est l'algorithme derrière Netflix Prize. Lis le quickstart : surpriselib.com" },
    ],
    resources: [
      { label: "MovieLens dataset", url: "https://grouplens.org/datasets/movielens/100k/" },
      { label: "Surprise library", url: "https://surpriselib.com/" },
    ],
    ai_guidance: "Cherche d'abord à comprendre la similarité cosinus mathématiquement avant de coder. Le tuteur peut t'aider sur les concepts, pas sur le code.",
  },

  {
    id: "p-int-3",
    title: "API de détection de sentiments",
    level: "intermediaire",
    hint_level: "medium",
    duration: "2 semaines",
    icon: "💬",
    skills: ["Python", "HuggingFace Transformers", "FastAPI", "Docker"],
    description: "Fine-tune un modèle BERT pour l'analyse de sentiment sur des avis de produits, puis déploie-le comme API REST avec FastAPI et Dockerise le tout.",
    learning_goal: "Utiliser les Transformers pré-entraînés, créer une API ML et la containeriser — compétences directement employables.",
    steps: [
      "Télécharge le dataset Amazon Reviews et explore-le",
      "Fine-tune DistilBERT sur les avis (positif/négatif/neutre) avec HuggingFace Trainer",
      "Évalue : accuracy, F1 par classe, exemples d'erreurs",
      "Crée une API FastAPI avec endpoint POST /predict",
      "Dockerise l'API (Dockerfile + docker-compose)",
      "Teste l'API avec Postman ou curl avec tes propres avis",
    ],
    hints: [
      { step: 1, title: "Fine-tuning DistilBERT", hint: "HuggingFace a un tutorial officiel sur le fine-tuning : huggingface.co/docs/transformers/training. Commence par le Colab fourni avant de faire tourner en local. DistilBERT est 40% plus rapide que BERT pour des performances similaires." },
      { step: 3, title: "FastAPI endpoint ML", hint: "Charge ton modèle une seule fois au démarrage, pas à chaque requête. Utilise une variable globale ou la fonctionnalité lifespan de FastAPI. Un endpoint simple : @app.post('/predict') async def predict(text: str): ... return {'sentiment': label, 'confidence': score}." },
    ],
    resources: [
      { label: "HuggingFace fine-tuning guide", url: "https://huggingface.co/docs/transformers/training" },
      { label: "FastAPI", url: "https://fastapi.tiangolo.com/" },
    ],
    ai_guidance: "Ce projet combine plusieurs technologies. Maîtrise chaque brique séparément avant de tout assembler. Le tuteur peut t'expliquer les concepts mais pas coder pour toi.",
  },

  {
    id: "p-int-4",
    title: "Dashboard ML interactif avec Streamlit",
    level: "intermediaire",
    hint_level: "medium",
    duration: "1-2 semaines",
    icon: "📊",
    skills: ["Python", "Streamlit", "plotly", "sklearn"],
    description: "Crée une application web interactive avec Streamlit qui permet d'explorer un dataset, d'entraîner différents modèles ML et de comparer leurs performances en temps réel.",
    learning_goal: "Créer des interfaces pour tes modèles ML — compétence essentielle pour montrer ton travail.",
    steps: [
      "Installe Streamlit et crée une app de base",
      "Ajoute un file uploader pour charger n'importe quel CSV",
      "Affiche des statistiques et visualisations interactives avec Plotly",
      "Laisse l'utilisateur choisir les features et le modèle (RF, LR, XGB)",
      "Entraîne et affiche les métriques en temps réel",
      "Ajoute un onglet comparaison et un export CSV des résultats",
    ],
    hints: [
      { step: 0, title: "Démarrer Streamlit", hint: "pip install streamlit. Crée app.py avec import streamlit as st. Lance avec streamlit run app.py. st.title(), st.write(), st.dataframe() sont tes premiers outils. La doc streamlit.io/docs est excellente." },
      { step: 3, title: "Widgets Streamlit", hint: "st.selectbox() pour choisir un modèle, st.multiselect() pour les features, st.slider() pour les hyperparamètres. Chaque interaction re-run tout le script — c'est la magie de Streamlit." },
    ],
    resources: [
      { label: "Streamlit documentation", url: "https://docs.streamlit.io/" },
      { label: "Plotly Python", url: "https://plotly.com/python/" },
    ],
    ai_guidance: "Streamlit a une excellente doc avec des exemples. Construis chaque section indépendamment avant d'assembler. Le tuteur peut t'aider sur l'architecture de l'app.",
  },

  {
    id: "p-int-5",
    title: "Détection d'anomalies dans des séries temporelles",
    level: "intermediaire",
    hint_level: "medium",
    duration: "2 semaines",
    icon: "⚠️",
    skills: ["Python", "pandas", "statsmodels", "Isolation Forest", "séries temporelles"],
    description: "Détecte automatiquement les anomalies dans des données de séries temporelles (transactions financières, métriques serveur ou données IoT). Compare plusieurs approches.",
    learning_goal: "Maîtriser l'analyse de séries temporelles et les algorithmes de détection d'anomalies.",
    steps: [
      "Télécharge un dataset de séries temporelles (trafic réseau, NYSE, ou CPU metrics)",
      "Visualise et comprends la structure temporelle (tendance, saisonnalité)",
      "Implémente une méthode statistique simple (z-score ou IQR)",
      "Applique Isolation Forest pour la détection non-supervisée",
      "Compare les deux méthodes sur les mêmes données",
      "Visualise les anomalies détectées sur la série originale",
    ],
    hints: [
      { step: 1, title: "Décomposition temporelle", hint: "statsmodels.tsa.seasonal.seasonal_decompose() sépare une série en tendance + saisonnalité + résidu. Le résidu est ce qui reste après avoir enlevé les patterns réguliers — c'est là qu'on cherche les anomalies." },
      { step: 3, title: "Isolation Forest", hint: "L'idée : les anomalies sont plus faciles à isoler (moins de splits nécessaires dans un arbre). from sklearn.ensemble import IsolationForest. contamination= fixe le % attendu d'anomalies. Lis la documentation sklearn pour comprendre les paramètres." },
    ],
    resources: [
      { label: "sklearn IsolationForest", url: "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html" },
      { label: "statsmodels time series", url: "https://www.statsmodels.org/stable/tsa.html" },
    ],
    ai_guidance: "Commence par comprendre les séries temporelles avant de coder. Lis sur la décomposition STL. Le tuteur peut t'expliquer les concepts théoriques.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AVANCÉ — 4 projets — hint_level: "none"
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "p-adv-1",
    title: "RAG Chatbot sur tes propres documents",
    level: "avance",
    hint_level: "none",
    duration: "3-4 semaines",
    icon: "🤖",
    skills: ["Python", "LangChain", "ChromaDB", "HuggingFace Embeddings", "FastAPI", "Docker"],
    description: "Construis un système RAG (Retrieval-Augmented Generation) complet : ingestion de PDF/docs, embeddings vectoriels, retrieval sémantique, génération de réponses avec un LLM. Déploie en API REST.",
    learning_goal: "Maîtriser l'architecture RAG de bout en bout — la technologie derrière la majorité des chatbots d'entreprise.",
    steps: [
      "Ingestion : parse PDF/Word avec PyMuPDF, chunking stratégique",
      "Embeddings : génère des vecteurs avec sentence-transformers",
      "Vector store : stocke dans ChromaDB, implémente la recherche sémantique",
      "Generation : connecte à un LLM (Anthropic/OpenAI) avec prompt engineering",
      "API FastAPI : endpoint /query avec contexte et sources",
      "Évalue la qualité RAG : faithfulness, context relevance, answer relevance",
      "Dockerise et déploie sur un VPS ou AWS EC2",
    ],
    hints: [],
    resources: [
      { label: "LangChain docs", url: "https://docs.langchain.com/" },
      { label: "ChromaDB", url: "https://docs.trychroma.com/" },
      { label: "RAGAS — RAG evaluation", url: "https://docs.ragas.io/" },
    ],
    ai_guidance: "Niveau avancé : le tuteur ne donne pas d'astuces sur ce projet. Si tu bloques : décompose le problème en sous-problèmes, lis la doc officielle, cherche des exemples GitHub. C'est exactement ce qu'un ingénieur ML fait au travail.",
  },

  {
    id: "p-adv-2",
    title: "Pipeline MLOps de bout en bout",
    level: "avance",
    hint_level: "none",
    duration: "4 semaines",
    icon: "⚙️",
    skills: ["Python", "MLflow", "DVC", "FastAPI", "Docker", "GitHub Actions", "AWS", "Evidently AI"],
    description: "Construis un pipeline ML production-ready complet : versioning données/modèles, experiment tracking, API de serving, CI/CD automatique, monitoring du drift.",
    learning_goal: "Démontrer une maîtrise complète du cycle de vie ML en production — exactement ce qu'un ML Engineer fait au quotidien.",
    steps: [
      "Choisis un problème métier réel (churn, fraude, prédiction stock)",
      "DVC pour versionner les données + pipeline de feature engineering reproductible",
      "MLflow pour tracker toutes les expériences + model registry",
      "FastAPI pour servir le meilleur modèle sélectionné automatiquement",
      "GitHub Actions : CI (tests, lint) + CD (déploiement auto sur AWS EC2)",
      "Evidently AI : rapport de drift hebdomadaire automatique",
      "Documentation complète : README, architecture diagram, runbook",
    ],
    hints: [],
    resources: [
      { label: "MLflow", url: "https://mlflow.org/" },
      { label: "DVC", url: "https://dvc.org/" },
      { label: "Evidently AI", url: "https://www.evidentlyai.com/" },
      { label: "GitHub Actions", url: "https://docs.github.com/en/actions" },
    ],
    ai_guidance: "C'est ton projet de capstone. Aucune aide directe — tu dois assembler toutes les pièces apprises dans le parcours. Si tu bloques sur un concept spécifique (pas 'fais-le pour moi'), le tuteur peut expliquer.",
  },

  {
    id: "p-adv-3",
    title: "Agent AI autonome avec mémoire et outils",
    level: "avance",
    hint_level: "none",
    duration: "3-4 semaines",
    icon: "🧠",
    skills: ["Python", "LangChain Agents", "LLM API", "tools", "mémoire vectorielle", "FastAPI"],
    description: "Construis un agent AI capable d'utiliser des outils (recherche web, calculatrice, base de données, API externes), de mémoriser les conversations et de planifier des tâches multi-étapes.",
    learning_goal: "Comprendre et implémenter les architectures d'agents LLM : ReAct, Chain-of-Thought, tool use, mémoire persistante.",
    steps: [
      "Définis 3-5 outils personnalisés (web search, Python REPL, API météo, base de données)",
      "Implémente l'architecture ReAct (Reasoning + Acting) avec LangChain ou from scratch",
      "Ajoute la mémoire court-terme (conversation) et long-terme (vector store)",
      "Teste sur des tâches complexes multi-étapes (planification, recherche + synthèse)",
      "Gère les erreurs d'outils et les hallucinations (validation des outputs)",
      "Interface web simple avec Streamlit ou FastAPI + HTML",
    ],
    hints: [],
    resources: [
      { label: "LangChain Agents", url: "https://docs.langchain.com/docs/components/agents/" },
      { label: "ReAct paper", url: "https://arxiv.org/abs/2210.03629" },
      { label: "Anthropic Tool Use", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use" },
    ],
    ai_guidance: "Ce projet est à la frontière de la recherche et de l'ingénierie. Lis le paper ReAct avant de commencer. L'implémentation from scratch avant d'utiliser LangChain te donnera une vraie compréhension.",
  },

  {
    id: "p-adv-4",
    title: "Modèle de Computer Vision pour cas réel",
    level: "avance",
    hint_level: "none",
    duration: "4 semaines",
    icon: "👁️",
    skills: ["Python", "PyTorch", "torchvision", "transfer learning", "YOLO", "OpenCV", "déploiement"],
    description: "Choisis un problème de vision réel (détection de défauts industriels, classification de plantes, comptage d'objets, OCR) et construis un système complet : dataset, training, optimisation, déploiement.",
    learning_goal: "Mener un projet Computer Vision de la collecte de données au déploiement — du dataset au produit utilisable.",
    steps: [
      "Définis le problème et collecte/annote ton dataset (Roboflow, LabelImg)",
      "Choisis l'architecture : classification (ResNet), détection (YOLOv8), segmentation (SAM)",
      "Data augmentation : transforms PyTorch ou Albumentations",
      "Transfer learning depuis un backbone pré-entraîné sur ImageNet",
      "Optimise : quantification, pruning ou ONNX export pour l'inférence rapide",
      "Déploie : API FastAPI + interface web ou app mobile (TFLite/CoreML)",
      "Mesure les performances en conditions réelles et itère",
    ],
    hints: [],
    resources: [
      { label: "PyTorch Vision Tutorial", url: "https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html" },
      { label: "YOLOv8 Ultralytics", url: "https://docs.ultralytics.com/" },
      { label: "Roboflow — annotation", url: "https://roboflow.com/" },
    ],
    ai_guidance: "Ce projet te prépare à un rôle CV Engineer. Commence par un dataset public (Roboflow Universe) avant de collecter le tien. Le tuteur peut discuter architecture et trade-offs, pas coder.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
export const PROJECT_LEVELS = {
  debutant:      { label: "Débutant",      color: "text-emerald-400", badge: "border-emerald-500/30 bg-emerald-500/5", hint_desc: "Assistance complète — astuces détaillées à chaque étape" },
  intermediaire: { label: "Intermédiaire", color: "text-amber-400",   badge: "border-amber-500/30 bg-amber-500/5",   hint_desc: "Astuces légères — oriente sans dévoiler" },
  avance:        { label: "Avancé",         color: "text-rose-400",    badge: "border-rose-500/30 bg-rose-500/5",     hint_desc: "Autonomie totale — brief seul, pas d'astuces" },
};

export function getProjectsByLevel(level) {
  return PROJECTS.filter(p => p.level === level);
}

export function getProject(id) {
  return PROJECTS.find(p => p.id === id) || null;
}
