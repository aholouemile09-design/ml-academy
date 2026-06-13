// Parcours complet : du débutant à l'avancé.
// Chaque module : leçons (contenu markdown simplifié) + quiz.

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
        content: `Le terminal est l'outil central de tout développeur et ingénieur ML. Savoir l'utiliser fluidement t'économise des heures chaque semaine.

**Navigation de base**
\`\`\`bash
pwd           # dossier courant
ls -la        # contenu détaillé
cd projet/    # aller dans un dossier
cd ..         # remonter d'un niveau
mkdir src     # créer un dossier
cp a.py b.py  # copier un fichier
mv a.py src/  # déplacer/renommer
rm fichier.py # supprimer (irréversible !)
\`\`\`

**Manipuler les fichiers de données**
\`\`\`bash
cat fichier.csv          # afficher le contenu
head -20 data.csv        # 20 premières lignes
wc -l data.csv           # compter les lignes
grep "erreur" logs.txt   # chercher dans un fichier
\`\`\`

**Variables d'environnement** — essentielles pour les clés API et la config :
\`\`\`bash
export ANTHROPIC_API_KEY="sk-..."
echo $ANTHROPIC_API_KEY
\`\`\`

**Ressource recommandée** : MIT Missing Semester — https://missing.csail.mit.edu/ (gratuit, excellente qualité)

**Exercice** : navigue dans ton dossier Documents, crée une arborescence \`projet/src\`, \`projet/data\`, \`projet/notebooks\`, crée un README.md vide dans chaque dossier.`,
      },
      {
        id: "setup-2",
        title: "Git & GitHub professionnel",
        duration: "55 min",
        content: `Git est le système de versioning standard. GitHub est ton portfolio public. Tout recruteur ML regardera ton GitHub.

**Commandes Git quotidiennes**
\`\`\`bash
git init                          # initialiser un repo
git clone URL                     # cloner un repo existant
git status                        # état des fichiers
git add fichier.py                # stager un fichier
git add .                         # stager tout
git commit -m "feat: add model"   # commiter
git push origin main              # envoyer sur GitHub
git pull                          # récupérer les dernières modifs
git log --oneline                 # historique compact
\`\`\`

**Structure d'un commit propre** — suit la convention Conventional Commits :
\`\`\`
feat: add logistic regression baseline
fix: correct data leakage in train/test split
docs: update README with installation steps
refactor: extract preprocessing into function
\`\`\`

**Branches** — une branche = une fonctionnalité :
\`\`\`bash
git checkout -b feature/eda       # créer + aller dans la branche
git checkout main                 # revenir sur main
git merge feature/eda             # fusionner
\`\`\`

**Le .gitignore** — ce qu'on ne versionne JAMAIS :
\`\`\`
.env
*.csv
data/
__pycache__/
.DS_Store
node_modules/
\`\`\`

**Ressource** : Pro Git (livre gratuit) — https://git-scm.com/book/en/v2

**Exercice** : crée un repo GitHub "ml-academy-projects", clone-le, crée un fichier README avec une présentation, fais 3 commits propres.`,
      },
      {
        id: "setup-3",
        title: "Environnement Python : venv, pip, PyCharm",
        duration: "45 min",
        content: `Chaque projet Python doit avoir son propre environnement virtuel. Sinon, les conflits de versions te feront perdre des heures.

**Créer et activer un environnement virtuel**
\`\`\`bash
python3 -m venv .venv            # créer (dans le dossier projet)
source .venv/bin/activate        # activer (Mac/Linux)
.venv\Scripts\activate           # activer (Windows)
deactivate                       # désactiver
\`\`\`

**Gérer les dépendances**
\`\`\`bash
pip install pandas scikit-learn   # installer
pip freeze > requirements.txt     # capturer l'état exact
pip install -r requirements.txt   # reproduire sur un autre machine
\`\`\`

**Structure de projet recommandée par ton plan**
\`\`\`
projet/
├── src/               # code Python (fonctions, modules)
├── notebooks/         # exploration Jupyter uniquement
├── data_sample/       # petit échantillon de données (versionnable)
├── tests/             # tests pytest
├── requirements.txt   # dépendances
└── README.md          # obligatoire
\`\`\`

**PyCharm** : IDE professionnel pour Python. Configure-le pour utiliser ton venv comme interpréteur : Settings → Python Interpreter → Add → Existing → .venv/bin/python.

**VS Code** : plus léger, excellent avec l'extension Python. Le terminal intégré reconnaît automatiquement le venv.

**Exercice** : crée un projet structuré, active le venv, installe pandas et pytest, crée un fichier \`src/utils.py\` avec une fonction de nettoyage, crée un test, exécute \`pytest\`.`,
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
        content: `Python est le langage de référence du machine learning grâce à sa simplicité et son écosystème.

**Variables et types**
\`\`\`python
age = 25            # int
prix = 19.99        # float
nom = "Emile"       # str
actif = True        # bool
\`\`\`

**Structures de contrôle**
\`\`\`python
for i in range(5):
    if i % 2 == 0:
        print(f"{i} est pair")
\`\`\`

**Fonctions**
\`\`\`python
def carre(x):
    return x ** 2
\`\`\`

À retenir : en ML, vous écrirez surtout des fonctions qui transforment des données. Maîtriser les listes, dictionnaires et compréhensions est essentiel.

**Exercice** : écrivez une fonction qui prend une liste de nombres et retourne la moyenne, sans utiliser de bibliothèque.`,
      },
      {
        id: "py-2",
        title: "Structures de données et compréhensions",
        duration: "40 min",
        content: `Les 4 structures clés : **listes** (ordonnées, modifiables), **tuples** (immuables), **dictionnaires** (clé→valeur), **ensembles** (uniques).

\`\`\`python
notes = {"maths": 15, "python": 18}
carres = [x**2 for x in range(10) if x % 2 == 0]
\`\`\`

Les compréhensions de listes sont omniprésentes dans le code de data science : elles remplacent des boucles entières en une ligne lisible.

**Slicing**, essentiel pour manipuler des tableaux :
\`\`\`python
data = [10, 20, 30, 40, 50]
data[1:4]   # [20, 30, 40]
data[::-1]  # liste inversée
\`\`\`

**Exercice** : à partir d'une liste de tuples (nom, note), construisez un dictionnaire ne gardant que les notes >= 10.`,
      },
      {
        id: "py-3",
        title: "NumPy : calcul vectoriel",
        duration: "50 min",
        content: `NumPy est la base de tout l'écosystème ML. Son objet central : le **ndarray**, un tableau multidimensionnel ultra-rapide.

\`\`\`python
import numpy as np

a = np.array([1, 2, 3])
M = np.random.randn(3, 3)     # matrice 3x3 aléatoire
a * 2                          # vectorisation : [2, 4, 6]
M @ a                          # produit matriciel
\`\`\`

**Pourquoi c'est crucial** : un réseau de neurones n'est qu'une suite de produits matriciels. La vectorisation remplace les boucles Python (lentes) par du calcul C optimisé — souvent 100x plus rapide.

Le **broadcasting** permet d'opérer sur des tableaux de formes différentes :
\`\`\`python
M - M.mean(axis=0)   # centre chaque colonne
\`\`\`

**Exercice** : normalisez une matrice (moyenne 0, écart-type 1 par colonne) sans aucune boucle.`,
      },
      {
        id: "py-4",
        title: "Pandas : manipulation de données",
        duration: "55 min",
        content: `Pandas fournit le **DataFrame** : un tableau étiqueté, l'équivalent d'une feuille Excel programmable.

\`\`\`python
import pandas as pd

df = pd.read_csv("ventes.csv")
df.head()                      # aperçu
df.describe()                  # statistiques
df[df["prix"] > 100]           # filtrage
df.groupby("region")["ventes"].sum()
\`\`\`

**Le workflow type d'un projet ML commence toujours ici** : charger, nettoyer (valeurs manquantes avec \`df.dropna()\` ou \`df.fillna()\`), transformer, agréger.

\`\`\`python
df["marge"] = df["prix"] - df["cout"]      # nouvelle colonne
df.pivot_table(index="mois", columns="region", values="ventes")
\`\`\`

**Exercice** : sur le dataset Titanic (disponible via seaborn), calculez le taux de survie par classe et par sexe.`,
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
        content: `SQL (Structured Query Language) est le langage universel des bases de données relationnelles. Tout ML Engineer lit et écrit du SQL quotidiennement.

**Les 4 opérations fondamentales**
\`\`\`sql
-- Lire des données
SELECT nom, age, salaire
FROM employes
WHERE departement = 'Tech' AND salaire > 60000
ORDER BY salaire DESC
LIMIT 10;

-- Insérer
INSERT INTO employes (nom, age, departement) VALUES ('Emile', 30, 'ML');

-- Modifier
UPDATE employes SET salaire = 75000 WHERE id = 42;

-- Supprimer
DELETE FROM employes WHERE actif = false;
\`\`\`

**Fonctions d'agrégation** — essentielles pour l'analyse de données :
\`\`\`sql
SELECT
  departement,
  COUNT(*)        AS nb_employes,
  AVG(salaire)    AS salaire_moyen,
  MAX(salaire)    AS salaire_max,
  MIN(salaire)    AS salaire_min
FROM employes
GROUP BY departement
HAVING COUNT(*) > 5
ORDER BY salaire_moyen DESC;
\`\`\`

**Ressource** : SQLBolt — https://sqlbolt.com/ (exercices interactifs gratuits, parfait pour débuter)

**Exercice** : sur SQLBolt, complète les 18 leçons interactives. Résultat attendu : 100% des exercices réussis.`,
      },
      {
        id: "sql-2",
        title: "Jointures & requêtes avancées",
        duration: "55 min",
        content: `Les jointures permettent de combiner plusieurs tables — au cœur de tout projet de données réel.

**Types de jointures**
\`\`\`sql
-- INNER JOIN : seulement les lignes qui matchent dans les deux tables
SELECT c.nom, o.montant, o.date
FROM clients c
INNER JOIN commandes o ON c.id = o.client_id;

-- LEFT JOIN : toutes les lignes de gauche, même sans correspondance
SELECT c.nom, COUNT(o.id) AS nb_commandes
FROM clients c
LEFT JOIN commandes o ON c.id = o.client_id
GROUP BY c.nom;
\`\`\`

**Sous-requêtes et CTEs** — pour les requêtes complexes :
\`\`\`sql
-- CTE (Common Table Expression) : lisible et réutilisable
WITH revenus_par_region AS (
  SELECT region, SUM(montant) AS total
  FROM commandes
  GROUP BY region
)
SELECT region, total,
       ROUND(total * 100.0 / SUM(total) OVER (), 2) AS pct
FROM revenus_par_region
ORDER BY total DESC;
\`\`\`

**Fonctions de fenêtre** — utilisées massivement en analytics :
\`\`\`sql
SELECT
  nom,
  salaire,
  RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang_dept,
  AVG(salaire) OVER (PARTITION BY departement) AS moy_dept
FROM employes;
\`\`\`

**Exercice** : modélise une base "répertoire santé" avec 3 tables (professionnels, spécialités, régions) et écris 10 requêtes incluant une CTE et une window function.`,
      },
      {
        id: "sql-3",
        title: "PostgreSQL & connexion Python",
        duration: "50 min",
        content: `PostgreSQL est la base de données relationnelle la plus utilisée en data science et en production. Open source, puissante, avec support JSON et extensions ML.

**Installer et créer une base**
\`\`\`bash
# Installation (macOS)
brew install postgresql@15
brew services start postgresql@15

# Créer une base
createdb ml_projects
psql ml_projects
\`\`\`

**Types de données utiles en ML**
\`\`\`sql
CREATE TABLE predictions (
  id         SERIAL PRIMARY KEY,
  model_name VARCHAR(100) NOT NULL,
  input_data JSONB,                   -- données d'entrée flexibles
  prediction FLOAT,
  confidence FLOAT CHECK (confidence BETWEEN 0 AND 1),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour accélérer les requêtes fréquentes
CREATE INDEX idx_predictions_model ON predictions(model_name);
CREATE INDEX idx_predictions_date  ON predictions(created_at);
\`\`\`

**Connexion Python avec psycopg2**
\`\`\`python
import psycopg2
import pandas as pd

conn = psycopg2.connect("dbname=ml_projects user=emile")

# Charger directement dans un DataFrame pandas
df = pd.read_sql("SELECT * FROM predictions WHERE confidence > 0.9", conn)
print(df.head())
conn.close()
\`\`\`

**SQLAlchemy** (ORM) : couche d'abstraction qui permet d'écrire du Python au lieu de SQL brut, et de changer de base sans réécrire le code.

**Exercice** : crée une base PostgreSQL locale, insère 100 prédictions fictives (Python + Faker), et écris une requête analytics qui calcule le taux de confiance moyen par modèle par semaine.`,
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
        content: `Tout en ML est vecteur ou matrice : une image est une matrice de pixels, un texte devient un vecteur d'embedding, un dataset est une matrice (lignes = exemples, colonnes = features).

**Opérations clés** : addition, produit scalaire, produit matriciel, transposée.

Le **produit scalaire** mesure la similarité entre deux vecteurs :
\`\`\`
a · b = Σ aᵢbᵢ = ||a|| ||b|| cos(θ)
\`\`\`
C'est exactement ce que fait un moteur de recherche sémantique pour comparer des documents.

Le **produit matriciel** Y = XW est l'opération centrale d'une couche de réseau de neurones : X (données) × W (poids appris).

**Notions à connaître** : rang, inverse, valeurs propres (utilisées en PCA pour réduire la dimension des données).`,
      },
      {
        id: "math-2",
        title: "Calcul différentiel et gradients",
        duration: "60 min",
        content: `Apprendre = minimiser une erreur. L'outil : la **dérivée**, qui indique dans quelle direction et à quelle vitesse une fonction change.

Pour une fonction de plusieurs variables, le **gradient** ∇f est le vecteur des dérivées partielles. Il pointe vers la plus forte montée — on descend donc dans la direction opposée :

\`\`\`
θ ← θ - α ∇L(θ)
\`\`\`

C'est la **descente de gradient**, l'algorithme qui entraîne quasiment tous les modèles modernes. α est le *learning rate* : trop grand, on diverge ; trop petit, on apprend trop lentement.

La **règle de la chaîne** permet de calculer le gradient de fonctions composées — c'est le fondement de la **rétropropagation** dans les réseaux de neurones :
\`\`\`
(f∘g)'(x) = f'(g(x)) · g'(x)
\`\`\``,
      },
      {
        id: "math-3",
        title: "Probabilités et statistiques",
        duration: "55 min",
        content: `Le ML raisonne sous incertitude : un classifieur ne dit pas "c'est un chat" mais "P(chat) = 0.92".

**Concepts essentiels** :
- Variable aléatoire, espérance E[X], variance Var(X)
- Loi normale 𝒩(μ, σ²) — omniprésente (initialisation des poids, bruit, hypothèses des modèles)
- **Théorème de Bayes** : P(A|B) = P(B|A)P(A) / P(B), base du classifieur Naive Bayes et du raisonnement bayésien

**Statistiques pour évaluer** :
- Moyenne vs médiane (robustesse aux valeurs aberrantes)
- Corrélation ≠ causalité
- Intervalle de confiance : votre accuracy de 94% est-elle significative ou due au hasard ?

**Maximum de vraisemblance** : la plupart des fonctions de coût (entropie croisée, erreur quadratique) dérivent de ce principe — on choisit les paramètres qui rendent les données observées les plus probables.`,
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
        content: `Le ML supervisé apprend une fonction f : X → y à partir d'exemples étiquetés.

**Le pipeline universel** :
1. Séparer les données : train / validation / test (ex. 70/15/15)
2. Entraîner sur train, régler les hyperparamètres sur validation, évaluer UNE FOIS sur test
3. Ne jamais laisser le test "fuiter" dans l'entraînement (*data leakage*)

**Le compromis biais-variance** — le concept le plus important du ML :
- **Sous-apprentissage** (biais élevé) : modèle trop simple, mauvais partout
- **Surapprentissage** (variance élevée) : modèle qui mémorise le train mais généralise mal

\`\`\`python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
\`\`\`

**Remèdes au surapprentissage** : plus de données, régularisation (L1/L2), modèles plus simples, validation croisée.`,
      },
      {
        id: "ml-2",
        title: "Régression linéaire et logistique",
        duration: "55 min",
        content: `**Régression linéaire** : prédire une valeur continue.
\`\`\`
ŷ = w·x + b      Coût : MSE = (1/n) Σ(yᵢ - ŷᵢ)²
\`\`\`

**Régression logistique** : malgré son nom, c'est un classifieur. On passe la sortie linéaire dans une sigmoïde pour obtenir une probabilité :
\`\`\`
P(y=1|x) = σ(w·x + b),  σ(z) = 1/(1+e⁻ᶻ)
\`\`\`
Coût : **entropie croisée** (log loss).

\`\`\`python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)
model.predict_proba(X_test)
\`\`\`

**Régularisation** : Ridge (L2) rétrécit les poids, Lasso (L1) en met certains à zéro (sélection de variables). Toujours commencer par un modèle linéaire : c'est votre *baseline* interprétable.`,
      },
      {
        id: "ml-3",
        title: "Arbres de décision et forêts aléatoires",
        duration: "55 min",
        content: `Un **arbre de décision** découpe l'espace par questions successives ("âge > 30 ?"). Interprétable mais sujet au surapprentissage.

**Random Forest** : on entraîne des centaines d'arbres sur des échantillons aléatoires (bagging) et on vote. La variance s'effondre, la performance grimpe.

**Gradient Boosting** (XGBoost, LightGBM) : les arbres sont construits séquentiellement, chacun corrigeant les erreurs du précédent. C'est l'état de l'art sur les **données tabulaires** — souvent devant le deep learning.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=300, max_depth=10)
rf.fit(X_train, y_train)
rf.feature_importances_   # quelles variables comptent ?
\`\`\`

**Hyperparamètres clés** : profondeur max, nombre d'arbres, learning rate (boosting). À régler par validation croisée (\`GridSearchCV\`).`,
      },
      {
        id: "ml-4",
        title: "Évaluation : métriques et validation",
        duration: "50 min",
        content: `L'accuracy peut mentir : sur un dataset à 99% de classe négative, prédire "négatif" partout donne 99% d'accuracy et un modèle inutile.

**Matrice de confusion** → métriques :
- **Précision** = TP/(TP+FP) : parmi mes alertes, combien sont vraies ?
- **Rappel** = TP/(TP+FN) : parmi les vrais cas, combien ai-je détectés ?
- **F1** : moyenne harmonique des deux
- **ROC-AUC** : qualité du classement des probabilités, robuste au déséquilibre

**Choisir selon le contexte** : détection de fraude → privilégier le rappel ; filtrage spam → privilégier la précision.

**Validation croisée k-fold** : on découpe en k blocs, chaque bloc sert une fois de validation. Estimation robuste de la performance :
\`\`\`python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5, scoring="f1")
\`\`\``,
      },
      {
        id: "ml-5",
        title: "Apprentissage non supervisé",
        duration: "45 min",
        content: `Pas d'étiquettes : on cherche la structure cachée des données.

**Clustering — K-means** : partitionne en k groupes en minimisant la distance aux centres. Choisir k avec la méthode du coude ou le score silhouette.
\`\`\`python
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4).fit(X)
\`\`\`
Applications : segmentation client, détection d'anomalies, compression.

**Réduction de dimension — PCA** : projette les données sur les axes de variance maximale. Sert à visualiser (2D/3D), accélérer l'entraînement, débruiter.
\`\`\`python
from sklearn.decomposition import PCA
X_2d = PCA(n_components=2).fit_transform(X)
\`\`\`

**t-SNE / UMAP** : visualisations non linéaires, excellentes pour explorer des embeddings.`,
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
        content: `Un neurone calcule une somme pondérée puis applique une **fonction d'activation** non linéaire :
\`\`\`
sortie = activation(w·x + b)
\`\`\`

Sans non-linéarité, empiler des couches reviendrait à une seule transformation linéaire. Les activations courantes : **ReLU** max(0, z) — standard, rapide, évite la saturation ; sigmoïde et tanh — surtout en sortie ou dans les RNN.

Un **réseau profond** empile des couches : chaque couche apprend des représentations de plus en plus abstraites (pixels → contours → formes → objets).

**Théorème d'approximation universelle** : un réseau à une couche cachée suffisamment large peut approximer n'importe quelle fonction continue. En pratique, la profondeur est plus efficace que la largeur.

\`\`\`python
import torch.nn as nn
model = nn.Sequential(
    nn.Linear(784, 128), nn.ReLU(),
    nn.Linear(128, 64), nn.ReLU(),
    nn.Linear(64, 10),
)
\`\`\``,
      },
      {
        id: "dl-2",
        title: "Entraînement : rétropropagation et optimisation",
        duration: "60 min",
        content: `**La boucle d'entraînement** — à connaître par cœur :
\`\`\`python
for epoch in range(epochs):
    for X_batch, y_batch in loader:
        optimizer.zero_grad()        # 1. remise à zéro des gradients
        y_pred = model(X_batch)      # 2. forward
        loss = criterion(y_pred, y_batch)  # 3. coût
        loss.backward()              # 4. rétropropagation
        optimizer.step()             # 5. mise à jour des poids
\`\`\`

**Rétropropagation** : la règle de la chaîne appliquée du coût vers l'entrée, calculant le gradient de chaque poids.

**Optimiseurs** : SGD (simple), SGD+momentum (inertie), **Adam** (learning rate adaptatif par paramètre — le choix par défaut).

**Stabiliser l'entraînement** :
- *Batch normalization* : normalise les activations, accélère la convergence
- *Dropout* : éteint des neurones au hasard → régularisation
- *Early stopping* : arrêter quand la loss de validation remonte
- *Learning rate schedule* : décroître α au fil de l'entraînement`,
      },
      {
        id: "dl-3",
        title: "Réseaux convolutifs (CNN)",
        duration: "55 min",
        content: `Une image 224×224 en couleur = 150 528 entrées. Une couche dense exploserait en paramètres. La **convolution** résout cela : un petit filtre (3×3) glisse sur l'image et détecte des motifs locaux, avec partage des poids.

**Architecture type** : [Conv → ReLU → Pooling] × N → Dense → Sortie

- **Convolution** : extrait des features locales (contours, textures)
- **Pooling** (max 2×2) : réduit la résolution, apporte une invariance aux petites translations
- Les couches profondes voient des motifs de plus en plus larges et abstraits

\`\`\`python
nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
\`\`\`

**Transfer learning** — le réflexe pratique : partir d'un modèle pré-entraîné (ResNet sur ImageNet), geler les premières couches, ré-entraîner la tête sur vos données. Excellent résultat avec peu de données.

Architectures marquantes : LeNet → AlexNet → VGG → **ResNet** (connexions résiduelles permettant 100+ couches).`,
      },
      {
        id: "dl-4",
        title: "Séquences : RNN et LSTM",
        duration: "50 min",
        content: `Texte, audio, séries temporelles : l'ordre compte. Un **RNN** traite la séquence pas à pas en maintenant un **état caché** — une mémoire :
\`\`\`
hₜ = tanh(W·xₜ + U·hₜ₋₁ + b)
\`\`\`

**Problème** : sur les longues séquences, les gradients s'évanouissent (vanishing gradients) — le réseau oublie le début de la phrase.

**LSTM** : ajoute des *portes* (forget, input, output) qui contrôlent explicitement ce qui est mémorisé ou oublié. Le **GRU** est une variante simplifiée.

\`\`\`python
nn.LSTM(input_size=128, hidden_size=256, num_layers=2, batch_first=True)
\`\`\`

Applications : prédiction de séries temporelles, traduction (seq2seq), génération de texte. Les RNN ont depuis été largement supplantés par les **Transformers** (module suivant), mais restent pertinents pour les séries temporelles et les systèmes embarqués.`,
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
        content: `Une machine ne lit pas des mots : il faut les transformer en nombres.

**Tokenisation** : découper le texte en unités (tokens). Les LLM modernes utilisent des sous-mots (BPE) : "incroyable" → ["in", "croy", "able"]. Vocabulaire typique : 30k–100k tokens.

**Embeddings** : chaque token devient un vecteur dense (ex. 768 dimensions) appris pendant l'entraînement. Propriété magique : la géométrie capture le sens.
\`\`\`
roi - homme + femme ≈ reine
\`\`\`

Les mots de sens proches ont des vecteurs proches (similarité cosinus). C'est le fondement de la **recherche sémantique** : on compare les embeddings de la requête et des documents.

\`\`\`python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
emb = model.encode(["le chat dort", "un félin se repose"])
# similarité cosinus élevée malgré zéro mot en commun
\`\`\``,
      },
      {
        id: "nlp-2",
        title: "L'attention et le Transformer",
        duration: "65 min",
        content: `Le papier "Attention Is All You Need" (2017) a tout changé.

**Self-attention** : chaque token "regarde" tous les autres tokens et pondère leur importance pour construire sa représentation contextuelle :
\`\`\`
Attention(Q, K, V) = softmax(QKᵀ/√d) V
\`\`\`
Dans "la souris mange le fromage car elle a faim", l'attention permet à "elle" de pointer vers "souris".

**Avantages sur les RNN** :
- Traitement **parallèle** de toute la séquence (entraînement massivement accéléré sur GPU)
- Dépendances longues capturées directement, sans dégradation

**Architecture Transformer** : empilement de blocs [Multi-Head Attention → Add & Norm → Feed-Forward → Add & Norm], avec des *positional encodings* pour préserver l'ordre des mots.

**Familles** : BERT (encodeur, compréhension), GPT (décodeur, génération), T5 (encodeur-décodeur). Les LLM actuels (GPT, Claude, Llama) sont des décodeurs géants entraînés à prédire le token suivant.`,
      },
      {
        id: "nlp-3",
        title: "LLM : pré-entraînement, fine-tuning, prompting",
        duration: "60 min",
        content: `**Pipeline de création d'un LLM** :
1. **Pré-entraînement** : prédire le token suivant sur des trillions de tokens. Le modèle absorbe grammaire, faits, raisonnement.
2. **Fine-tuning supervisé (SFT)** : on l'affine sur des dialogues de qualité pour le rendre conversationnel.
3. **RLHF / alignement** : optimiser selon des préférences humaines pour le rendre utile et sûr.

**Adapter un LLM à votre cas** (du moins cher au plus cher) :
- **Prompt engineering** : instructions claires, exemples (few-shot), raisonnement pas à pas
- **RAG** (Retrieval-Augmented Generation) : récupérer des documents pertinents (recherche vectorielle) et les injecter dans le prompt — la méthode standard pour donner vos données à un LLM
- **Fine-tuning** (LoRA : on n'entraîne que de petites matrices adaptatrices) : pour un style ou format spécifique
- **Pré-entraînement** : réservé aux géants du secteur

**RAG en pratique** : découper les documents en chunks → calculer les embeddings → stocker dans une base vectorielle (FAISS, Chroma) → à chaque question, retrouver les k chunks les plus proches → les fournir au LLM dans le prompt.`,
      },
      {
        id: "nlp-4",
        title: "Construire des applications LLM et agents",
        duration: "55 min",
        content: `**Appeler un LLM par API** :
\`\`\`python
import anthropic
client = anthropic.Anthropic()
msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Tu es un tuteur expert en ML.",
    messages=[{"role": "user", "content": "Explique le surapprentissage"}],
)
\`\`\`

**Paramètres clés** : *temperature* (0 = déterministe, 1 = créatif), *max_tokens*, *system prompt* (rôle et contraintes).

**Agents** : un LLM qui peut appeler des **outils** (recherche web, exécution de code, bases de données) en boucle : observer → réfléchir → agir. C'est exactement ainsi que fonctionne le tuteur AI de ce site.

**Bonnes pratiques en production** :
- Évaluer systématiquement (jeux de tests de prompts, LLM-as-judge)
- Gérer les hallucinations : RAG + citations + vérifications
- Streaming des réponses pour l'UX, cache pour les coûts
- Ne jamais exposer sa clé API côté client — toujours passer par un backend.`,
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
        content: `Docker résout le problème "ça marche sur ma machine" : un conteneur embarque ton code + ses dépendances + son environnement d'exécution.

**Concepts clés**
- **Image** : le blueprint (recette) — défini dans un Dockerfile
- **Conteneur** : une instance en cours d'exécution d'une image
- **Registry** : dépôt d'images (Docker Hub, AWS ECR)

**Dockerfile pour une API ML**
\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY model.pkl .

EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

**Commandes essentielles**
\`\`\`bash
docker build -t mon-api-ml:v1 .     # construire l'image
docker run -p 8000:8000 mon-api-ml  # lancer le conteneur
docker ps                            # conteneurs actifs
docker logs <id>                     # voir les logs
docker stop <id>                     # arrêter

# Docker Compose : orchestrer plusieurs services (API + DB)
docker-compose up -d
\`\`\`

**Multi-stage build** pour réduire la taille de l'image en production :
\`\`\`dockerfile
FROM python:3.11 AS builder
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
COPY --from=builder /root/.local /root/.local
COPY . .
\`\`\`

**Ressource** : Docker Docs — https://docs.docker.com/get-started/

**Exercice** : conteneurise ton API FastAPI ML, teste-la en local, publie l'image sur Docker Hub.`,
      },
      {
        id: "cloud-2",
        title: "AWS pour ML Engineers",
        duration: "60 min",
        content: `AWS est le cloud le plus utilisé en entreprise. Pour un ML Engineer, les services prioritaires sont S3, EC2, Lambda, ECR et SageMaker.

**S3 — stockage objet (données, modèles)**
\`\`\`python
import boto3

s3 = boto3.client("s3")

# Uploader un modèle
s3.upload_file("model.pkl", "mon-bucket-ml", "models/v1/model.pkl")

# Télécharger des données
s3.download_file("mon-bucket-ml", "data/train.csv", "local/train.csv")

# Lister les fichiers
response = s3.list_objects_v2(Bucket="mon-bucket-ml", Prefix="models/")
\`\`\`

**EC2 — machines virtuelles** : pour les entraînements GPU (p3.2xlarge, g4dn) ou les APIs.
\`\`\`bash
# SSH vers une instance EC2
ssh -i ma-cle.pem ubuntu@<ip-publique>
\`\`\`

**Lambda — fonctions serverless** : idéal pour l'inférence sur des modèles légers, facturation à la requête.

**ECR — Docker Registry AWS** : héberger tes images Docker pour les déployer sur ECS/EKS.

**SageMaker** : service ML géré d'AWS — entraînement, déploiement, monitoring intégrés. Puissant mais coûteux : réserver aux projets production.

**Estimation de coûts** — bonne pratique obligatoire :
\`\`\`
EC2 t3.medium (dev)  : ~0.05 $/h → ~36 $/mois
EC2 g4dn.xlarge (GPU): ~0.53 $/h → utiliser en spot
S3 (100 GB)          : ~2.30 $/mois
Lambda (1M req)      : ~0.20 $
\`\`\`

**Ressource** : AWS Skill Builder — https://aws.amazon.com/training/digital/ (gratuit, labs inclus)

**Exercice** : déploie ton API ML conteneurisée sur EC2, stocke ton modèle sur S3, expose un endpoint public.`,
      },
      {
        id: "cloud-3",
        title: "CI/CD avec GitHub Actions",
        duration: "45 min",
        content: `Le CI/CD (Continuous Integration / Continuous Deployment) automatise les tests et le déploiement à chaque push. Indispensable pour un profil ML Engineer.

**Workflow GitHub Actions pour un projet ML**
\`\`\`yaml
# .github/workflows/ml-pipeline.yml
name: ML Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t mon-api-ml:\${{ github.sha }} .
      - name: Push to ECR
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin $ECR_URI
          docker push $ECR_URI:\${{ github.sha }}
\`\`\`

**Secrets GitHub** : va dans Settings → Secrets → New Repository Secret pour stocker clés AWS, clés API, etc. sans les exposer dans le code.

**Stratégie typique ML** :
1. Push → tests automatiques (pytest)
2. Si tests OK sur main → build image Docker
3. Push image sur ECR
4. Déploiement auto sur EC2/ECS

**Ressource** : GitHub Actions Docs — https://docs.github.com/en/actions

**Exercice** : crée un workflow qui lance pytest, vérifie le score du modèle (ex. F1 > 0.80), et échoue si la performance régressse.`,
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
        content: `Un modèle qui marche dans un notebook n'a aucune valeur tant qu'il n'est pas utilisable de façon fiable.

**Structurer un projet ML** :
\`\`\`
projet/
├── data/            # jamais versionné dans git (DVC)
├── notebooks/       # exploration uniquement
├── src/
│   ├── features.py  # transformations réutilisables
│   ├── train.py     # entraînement reproductible
│   └── predict.py   # inférence
├── tests/
└── configs/         # hyperparamètres en YAML
\`\`\`

**Règles d'or** :
- Fixer les seeds aléatoires (reproductibilité)
- Versionner code (git), données (DVC) et modèles (MLflow)
- Tracker chaque expérience : hyperparamètres, métriques, artefacts
- Écrire des tests : sur les features, sur les formats de données, sur la non-régression du modèle

\`\`\`python
import mlflow
with mlflow.start_run():
    mlflow.log_params({"lr": 0.01, "depth": 8})
    mlflow.log_metric("f1", 0.91)
    mlflow.sklearn.log_model(model, "model")
\`\`\``,
      },
      {
        id: "ops-2",
        title: "Déployer un modèle : API et conteneurs",
        duration: "55 min",
        content: `Le pattern le plus courant : exposer le modèle derrière une **API REST**.

\`\`\`python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
def predict(features: dict):
    X = preprocess(features)
    return {"prediction": model.predict(X).tolist()}
\`\`\`

**Docker** garantit que l'environnement de production est identique au développement :
\`\`\`dockerfile
FROM python:3.11-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
\`\`\`

**Modes de serving** : temps réel (API), batch (prédictions nocturnes), streaming (Kafka), embarqué (ONNX, quantization pour mobile).

**Considérations** : latence (p95, pas seulement la moyenne), montée en charge, rollback rapide si le nouveau modèle déçoit (déploiement canari, A/B testing).`,
      },
      {
        id: "ops-3",
        title: "Monitoring et dérive des données",
        duration: "50 min",
        content: `Un modèle se dégrade silencieusement : le monde change, pas lui.

**Data drift** : la distribution des entrées change (nouveaux comportements clients, saisonnalité, crise). Détection : tests statistiques (Kolmogorov-Smirnov), distance de population (PSI).

**Concept drift** : la relation X→y elle-même change (ex. fraude : les fraudeurs s'adaptent). Plus sournois — détectable seulement quand les vraies étiquettes arrivent.

**Que monitorer en production** :
- Distribution des features d'entrée vs entraînement
- Distribution des prédictions (un classifieur qui prédit soudain 90% de positifs = alerte)
- Métriques métier réelles dès que les labels arrivent
- Latence, taux d'erreur, coûts

**Boucle de ré-entraînement** : déclenchée par calendrier ou par alerte de drift, avec validation automatique avant remplacement du modèle (champion/challenger).

Outils : Evidently, Grafana, MLflow, alerting Slack/PagerDuty.`,
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
    ],
  },
];

export function getModule(id) {
  return CURRICULUM.find((m) => m.id === id);
}

export function totalLessons() {
  return CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
