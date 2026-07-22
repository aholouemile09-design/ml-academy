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

> 💡 **Quel terminal utilises-tu ?** Les commandes varient selon l'environnement. Les 3 colonnes ci-dessous te donnent l'équivalent dans chaque shell.

---

## Navigation de base

| Action | bash / zsh (Mac/Linux) | PowerShell (Windows) | CMD (Windows) |
|--------|----------------------|---------------------|--------------|
| Dossier courant | \`pwd\` | \`pwd\` ou \`Get-Location\` | \`cd\` |
| Lister les fichiers | \`ls -la\` | \`ls\` ou \`Get-ChildItem\` | \`dir\` |
| Aller dans un dossier | \`cd projet/\` | \`cd projet\` | \`cd projet\` |
| Remonter d'un niveau | \`cd ..\` | \`cd ..\` | \`cd ..\` |
| Créer un dossier | \`mkdir src\` | \`mkdir src\` | \`mkdir src\` |
| Copier un fichier | \`cp a.py b.py\` | \`cp a.py b.py\` | \`copy a.py b.py\` |
| Déplacer / renommer | \`mv a.py src/\` | \`mv a.py src/\` | \`move a.py src\` |
| Supprimer un fichier | \`rm fichier.py\` | \`rm fichier.py\` | \`del fichier.py\` |
| Supprimer un dossier | \`rm -rf dossier/\` | \`rm -Recurse dossier\` | \`rmdir /s dossier\` |

---

## Manipuler les fichiers de données

| Action | bash / zsh | PowerShell | CMD |
|--------|-----------|-----------|-----|
| Afficher le contenu | \`cat data.csv\` | \`cat data.csv\` | \`type data.csv\` |
| 20 premières lignes | \`head -20 data.csv\` | \`Get-Content data.csv -TotalCount 20\` | *(pas natif)* |
| Compter les lignes | \`wc -l data.csv\` | \`(Get-Content data.csv).Count\` | *(pas natif)* |
| Chercher dans un fichier | \`grep "erreur" logs.txt\` | \`Select-String "erreur" logs.txt\` | \`findstr "erreur" logs.txt\` |

> **Conseil Windows** : PowerShell est bien plus puissant que CMD. Si tu es sur Windows, utilise toujours PowerShell (ou le terminal intégré VS Code/PyCharm qui le lance automatiquement).

---

## Variables d'environnement — essentielles pour les clés API

**bash / zsh (Mac/Linux) :**
\`\`\`bash
export ANTHROPIC_API_KEY="sk-ant-..."
echo $ANTHROPIC_API_KEY
\`\`\`

**PowerShell (Windows) :**
\`\`\`powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
echo $env:ANTHROPIC_API_KEY
\`\`\`

**CMD (Windows) :**
\`\`\`cmd
set ANTHROPIC_API_KEY=sk-ant-...
echo %ANTHROPIC_API_KEY%
\`\`\`

> ⚠️ Ces commandes définissent la variable **pour la session courante uniquement**. Pour la rendre permanente, utilise un fichier \`.env\` dans ton projet (avec python-dotenv) — ne mets jamais tes clés dans ton code !

---

**Ressource recommandée** : MIT Missing Semester — https://missing.csail.mit.edu/ (gratuit, excellente qualité)

**Exercice** : navigue dans ton dossier Documents, crée une arborescence \`projet/src\`, \`projet/data\`, \`projet/notebooks\`, crée un README.md vide dans chaque dossier — avec les commandes de **ton** terminal.`,
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

**Exercice** : crée un repo GitHub "codegraft-projects", clone-le, crée un fichier README avec une présentation, fais 3 commits propres.`,
      },
      {
        id: "setup-3",
        title: "Environnement Python : venv, pip, PyCharm",
        duration: "45 min",
        content: `Chaque projet Python doit avoir son propre environnement virtuel. Sinon, les conflits de versions te feront perdre des heures.

> 💡 **Quel terminal utilises-tu ?** Les commandes d'activation du venv sont différentes selon l'environnement.

---

## Créer et activer un environnement virtuel

**Créer le venv** (identique partout) :
\`\`\`bash
python -m venv .venv
\`\`\`
> Sur Mac/Linux, utilise \`python3\` si \`python\` ne fonctionne pas.

**Activer le venv :**

| Environnement | Commande |
|--------------|---------|
| bash / zsh (Mac/Linux) | \`source .venv/bin/activate\` |
| PowerShell (Windows) | \`.venv\\Scripts\\Activate.ps1\` |
| CMD (Windows) | \`.venv\\Scripts\\activate.bat\` |
| Git Bash (Windows) | \`source .venv/Scripts/activate\` |

**Désactiver** (identique partout) :
\`\`\`bash
deactivate
\`\`\`

> ⚠️ **PowerShell — erreur fréquente** : si tu vois *"l'exécution de scripts est désactivée"*, exécute une fois en tant qu'administrateur :
> \`\`\`powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> \`\`\`
> Ensuite relance \`.venv\\Scripts\\Activate.ps1\` normalement.

**Vérifier que le venv est actif** — ton prompt doit afficher \`(.venv)\` devant :
\`\`\`
(.venv) PS C:\\projet>    ← PowerShell
(.venv) user@machine:~/projet$    ← bash
\`\`\`

---

## Gérer les dépendances (identique dans tous les environnements)

\`\`\`bash
pip install pandas scikit-learn   # installer des paquets
pip freeze > requirements.txt     # capturer l'état exact
pip install -r requirements.txt   # reproduire sur une autre machine
pip list                          # voir ce qui est installé
pip show pandas                   # détails d'un paquet
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
        resources: [
          { type: "video", title: "Essence of Linear Algebra (série complète)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", author: "3Blue1Brown", description: "La meilleure introduction visuelle à l'algèbre linéaire — animée, intuitive, gratuite." },
          { type: "book", title: "Mathematics for Machine Learning", url: "https://mml-book.github.io/", author: "Deisenroth, Faisal, Ong", description: "PDF gratuit — le livre de référence mathématiques pour le ML, chapitres 2 et 3 pour l'algèbre linéaire." },
          { type: "exercise", title: "Khan Academy — Algèbre linéaire", url: "https://fr.khanacademy.org/math/linear-algebra", description: "Exercices interactifs progressifs, du vecteur à la décomposition spectrale." },
        ],
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
        resources: [
          { type: "video", title: "What is backpropagation really doing?", url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", author: "3Blue1Brown", description: "Visualisation parfaite de la rétropropagation et des gradients — 14 min." },
          { type: "video", title: "The spelled-out intro to neural networks and backpropagation", url: "https://www.youtube.com/watch?v=VMj-3S1tku0", author: "Andrej Karpathy", description: "Implémentation micrograd from scratch — comprendre vraiment le calcul des gradients." },
        ],
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
      {
        id: "math-4",
        title: "Décomposition SVD et réduction de dimension",
        duration: "60 min",
        resources: [
          { type: "video", title: "Singular Value Decomposition (SVD)", url: "https://www.youtube.com/watch?v=nbBvuuNVfco", author: "Steve Brunton (UW)", description: "Cours universitaire complet sur la SVD — rigoureux et visuel." },
          { type: "video", title: "StatQuest: PCA Step-by-Step", url: "https://www.youtube.com/watch?v=FgakZw6K1QQ", author: "StatQuest / Josh Starmer", description: "Explication pas à pas de la PCA, lien avec la SVD, sans jargon inutile." },
        ],
        content: `La **Décomposition en Valeurs Singulières** (SVD) est l'une des opérations matricielles les plus fondamentales en ML. Elle sous-tend la PCA, les systèmes de recommandation, la compression d'images et le traitement du langage.

**La décomposition SVD**

Toute matrice A de dimensions (m × n) peut s'écrire :
\`\`\`
A = U Σ Vᵀ
\`\`\`
où :
- **U** (m × m) : vecteurs singuliers gauches (directions dans l'espace des lignes)
- **Σ** (m × n) : matrice diagonale de valeurs singulières σ₁ ≥ σ₂ ≥ ... ≥ 0
- **Vᵀ** (n × n) : vecteurs singuliers droits (directions dans l'espace des colonnes)

Les valeurs singulières σᵢ mesurent l'importance de chaque composante. En gardant seulement les k plus grandes, on obtient la meilleure approximation de rang k de A.

**SVD en Python**
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Exemple : matrice 4x3
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12]], dtype=float)

U, sigma, Vt = np.linalg.svd(A, full_matrices=True)
print("Valeurs singulières :", sigma)  # [25.46, 1.29, ...]
print("Rang de A :", np.sum(sigma > 1e-10))

# Reconstruction approximée avec k=1
k = 1
A_approx = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]
print("Erreur de reconstruction :", np.linalg.norm(A - A_approx))
\`\`\`

**Compression d'image avec SVD**
\`\`\`python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

img = np.array(Image.open("photo.jpg").convert("L"), dtype=float)  # niveaux de gris

U, sigma, Vt = np.linalg.svd(img, full_matrices=False)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, k in zip(axes, [5, 20, 50, 200]):
    img_k = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]
    ax.imshow(img_k, cmap="gray")
    ratio = k * (img.shape[0] + img.shape[1] + 1) / img.size
    ax.set_title(f"k={k} ({ratio:.1%} données)")
    ax.axis("off")
plt.tight_layout()
plt.show()
\`\`\`

**SVD et PCA — le lien fondamental**

La PCA (Principal Component Analysis) **est** une SVD sur la matrice des données centrées :
\`\`\`python
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# PCA via sklearn (utilise SVD en interne)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

print("Variance expliquée :", pca.explained_variance_ratio_)
print("Variance cumulée  :", pca.explained_variance_ratio_.cumsum())

# Visualisation du coude (combien de composantes garder ?)
plt.figure(figsize=(8, 4))
plt.plot(np.cumsum(pca.explained_variance_ratio_), marker="o")
plt.axhline(0.95, color="red", linestyle="--", label="95% de variance")
plt.xlabel("Nombre de composantes")
plt.ylabel("Variance expliquée cumulée")
plt.legend()
plt.show()
\`\`\`

**Valeurs propres et vecteurs propres**

Pour une matrice carrée symétrique A (ex. matrice de covariance) :
\`\`\`
Av = λv
\`\`\`
- **λ** (valeur propre) : facteur d'échelle
- **v** (vecteur propre) : direction qui ne change pas lors de la transformation

En PCA, les vecteurs propres de la matrice de covariance sont les **composantes principales**, et les valeurs propres indiquent leur importance (variance capturée).
\`\`\`python
# Calculer les composantes principales manuellement
cov_matrix = np.cov(X_scaled.T)
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)
# Trier par valeur propre décroissante
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]
\`\`\`

**Systèmes de recommandation (Matrix Factorization)**

Netflix, Spotify et Amazon utilisent SVD pour décomposer une matrice utilisateurs × items :
\`\`\`python
# Matrice notes (utilisateurs × films), avec beaucoup de NaN
ratings = np.array([
    [5, 3, np.nan, 1],
    [4, np.nan, 4, 1],
    [np.nan, 1, 5, 5],
    [1, 2, 5, np.nan],
])
# La SVD/NMF décompose en : utilisateurs × facteurs latents × films
# → chaque facteur latent représente un "genre" caché
from sklearn.decomposition import NMF
# (remplacer NaN par 0 pour la démo)
ratings_filled = np.nan_to_num(ratings)
nmf = NMF(n_components=2, random_state=42)
W = nmf.fit_transform(ratings_filled)  # utilisateurs × facteurs
H = nmf.components_                     # facteurs × films
\`\`\``,
      },
      {
        id: "math-5",
        title: "Distributions statistiques essentielles",
        duration: "55 min",
        content: `Comprendre les distributions statistiques permet de choisir la bonne fonction de perte, d'initialiser correctement un réseau, et de diagnostiquer ses données. Chaque distribution modélise un type de phénomène.

**La loi normale (gaussienne) — 𝒩(μ, σ²)**

La plus importante en ML. Apparaît partout grâce au **Théorème Central Limite** : la somme de n variables aléatoires indépendantes converge vers une gaussienne (quel que soit leur distribution initiale).
\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

mu, sigma = 0, 1
x = np.linspace(-4, 4, 200)

plt.figure(figsize=(10, 4))
for mu, sigma, label in [(0, 1, "𝒩(0,1)"), (2, 1, "𝒩(2,1)"), (0, 2, "𝒩(0,4)")]:
    plt.plot(x, stats.norm.pdf(x, mu, sigma**2), label=label)
plt.title("Loi normale — différents paramètres")
plt.legend()
plt.show()

# Propriété 68-95-99.7 (règle empirique)
print(f"P(|X-μ| < σ)  = {stats.norm.cdf(1) - stats.norm.cdf(-1):.3f}")   # 68.3%
print(f"P(|X-μ| < 2σ) = {stats.norm.cdf(2) - stats.norm.cdf(-2):.3f}")   # 95.4%
print(f"P(|X-μ| < 3σ) = {stats.norm.cdf(3) - stats.norm.cdf(-3):.3f}")   # 99.7%
\`\`\`

**Loi de Bernoulli et Binomiale**
\`\`\`python
# Bernoulli : 0 ou 1 avec probabilité p (ex. email spam ou non)
p = 0.3
print(f"P(X=1) = {p}, P(X=0) = {1-p}")

# Binomiale : combien de succès sur n essais ?
n, p = 100, 0.3
dist = stats.binom(n=n, p=p)
print(f"E[X] = {dist.mean():.1f}, Var(X) = {dist.var():.1f}")

# La régression logistique modélise précisément des variables de Bernoulli
\`\`\`

**Loi de Poisson**
\`\`\`python
# Nombre d'événements rares dans un intervalle fixe
# (transactions par seconde, pannes, appels clients)
lambda_ = 4  # taux moyen

dist = stats.poisson(mu=lambda_)
x = np.arange(0, 15)
plt.bar(x, dist.pmf(x))
plt.title(f"Poisson(λ={lambda_}) — P(X=k)")
plt.xlabel("k événements")
plt.show()

print(f"P(X=0) = {dist.pmf(0):.4f}")  # probabilité de 0 événement
print(f"P(X>8) = {1 - dist.cdf(8):.4f}")
\`\`\`

**Distribution de Student (t)**
\`\`\`python
# Utilisée quand on ne connaît pas la variance vraie (petits échantillons)
# Plus "lourdes de queues" que la gaussienne → plus robuste aux outliers

df_values = [1, 3, 10, 30]
x = np.linspace(-5, 5, 200)

plt.figure(figsize=(10, 4))
for df in df_values:
    plt.plot(x, stats.t.pdf(x, df), label=f"t(df={df})")
plt.plot(x, stats.norm.pdf(x), label="Normal", linestyle="--", color="black")
plt.title("Distribution de Student vs Normale")
plt.legend()
plt.show()
# À df → ∞, la distribution t converge vers la normale
\`\`\`

**Loi exponentielle et Weibull — modélisation de durée**
\`\`\`python
# Exponentielle : temps entre événements de Poisson (durée de vie sans mémoire)
lambda_exp = 0.5  # taux de défaillance
dist_exp = stats.expon(scale=1/lambda_exp)
print(f"Durée de vie moyenne : {dist_exp.mean():.1f} heures")

# Weibull : généralise l'exponentielle, utilisée en analyse de survie (churn, défaillance)
# shape < 1 : taux de défaillance décroissant (rodage)
# shape = 1 : taux constant (exponentielle)
# shape > 1 : taux croissant (usure)
for shape in [0.5, 1.0, 2.0, 3.5]:
    dist_w = stats.weibull_min(c=shape)
    plt.plot(x[x >= 0], dist_w.pdf(x[x >= 0]), label=f"k={shape}")
plt.title("Weibull — différentes formes")
plt.legend()
\`\`\`

**Applications directes en ML**
| Distribution | Utilisation ML |
|--|--|
| Normale | Initialisation poids (Xavier/He), régression gaussienne, bruit |
| Bernoulli | Classification binaire, régression logistique |
| Catégorielle | Softmax en multiclasse |
| Poisson | Régression de comptage (NLP, séries temporelles d'événements) |
| Beta | Prior bayésien pour probabilités p ∈ [0, 1] |
| Dirichlet | Prior bayésien pour distributions catégorielles (LDA) |

**Le Théorème Central Limite en pratique**
\`\`\`python
# Même en partant d'une distribution uniforme, la moyenne de n échantillons
# devient gaussienne pour n assez grand
n_samples = 10000
for n in [1, 2, 10, 30]:
    means = [np.mean(np.random.uniform(0, 1, n)) for _ in range(n_samples)]
    plt.hist(means, bins=50, alpha=0.5, label=f"n={n}", density=True)
plt.title("TCL : moyenne de n tirages uniformes")
plt.legend()
plt.show()
# n=30 est déjà presque parfaitement gaussien
\`\`\``,
      },
      {
        id: "math-6",
        title: "Tests d'hypothèses et intervalles de confiance",
        duration: "60 min",
        resources: [
          { type: "video", title: "StatQuest: Hypothesis Testing and p-values", url: "https://www.youtube.com/watch?v=vemZtEM63GY", author: "StatQuest / Josh Starmer", description: "L'explication la plus claire de la p-value sur YouTube — incontournable." },
          { type: "paper", title: "Statistical Comparisons of Classifiers over Multiple Data Sets", url: "https://www.jmlr.org/papers/volume7/demsar06a/demsar06a.pdf", author: "Janez Demšar (JMLR 2006)", description: "La référence académique pour comparer des algorithmes ML correctement — Wilcoxon, Friedman, Nemenyi." },
        ],
        content: `En ML, on compare des modèles, des features, des versions A/B. Les tests statistiques permettent de savoir si une différence observée est réelle ou due au hasard. C'est la base de la décision data-driven.

**Le cadre des tests d'hypothèses**

1. **H₀** (hypothèse nulle) : "Pas de différence" — ex. les deux modèles ont la même performance
2. **H₁** (hypothèse alternative) : "Il y a une différence"
3. **p-value** : probabilité d'observer ce résultat (ou plus extrême) si H₀ était vraie
4. **Seuil α** : typiquement 0.05 — si p < α, on rejette H₀

\`\`\`
p < 0.05 → résultat statistiquement significatif (on rejette H₀)
p ≥ 0.05 → pas assez de preuves pour rejeter H₀ (ne prouve pas H₀)
\`\`\`

**⚠️ Erreurs classiques** :
- p < 0.05 ≠ "vrai" ni "important" — c'est juste "peu probable sous H₀"
- Avec assez de données, tout devient significatif — regarder aussi l'effet size
- p = 0.049 n'est pas très différent de p = 0.051

**Test t de Student — comparer deux moyennes**
\`\`\`python
import numpy as np
from scipy import stats

# Exemple : deux modèles, scores sur 10 folds de cross-validation
model_a = np.array([0.82, 0.85, 0.83, 0.86, 0.84, 0.85, 0.83, 0.84, 0.85, 0.86])
model_b = np.array([0.84, 0.87, 0.85, 0.88, 0.86, 0.87, 0.85, 0.86, 0.87, 0.88])

# Test t apparié (même données d'évaluation → test apparié)
t_stat, p_value = stats.ttest_rel(model_a, model_b)
print(f"t-statistique : {t_stat:.4f}")
print(f"p-value : {p_value:.4f}")
print(f"Conclusion : {'modèle B significativement meilleur' if p_value < 0.05 else 'pas de différence significative'}")

# Test t indépendant (groupes différents)
t_stat, p_value = stats.ttest_ind(model_a, model_b, equal_var=False)  # Welch
\`\`\`

**McNemar — comparer deux classifieurs sur le même dataset**
\`\`\`python
from statsmodels.stats.contingency_tables import mcnemar

# Tableau de contingence :
# b = nbre d'exemples bien classés par A mais pas B
# c = nbre d'exemples bien classés par B mais pas A
b, c = 25, 10  # B se trompe là où A réussit 10 fois, A se trompe là où B réussit 25 fois
table = [[0, b], [c, 0]]  # on ignore les cas où les deux ont tort/raison

result = mcnemar(table, exact=True)
print(f"p-value McNemar : {result.pvalue:.4f}")
# p < 0.05 → les deux classifieurs sont significativement différents
\`\`\`

**Test de Wilcoxon — alternative non-paramétrique au test t apparié**
\`\`\`python
# Utiliser quand les données ne suivent pas une loi normale
stat, p_value = stats.wilcoxon(model_a, model_b)
print(f"Wilcoxon p-value : {p_value:.4f}")
# Plus robuste, moins puissant que le test t
\`\`\`

**Intervalles de confiance — la p-value ne suffit pas**
\`\`\`python
# IC à 95% pour la différence de performances
diff = model_b - model_a
n = len(diff)
mean_diff = np.mean(diff)
se = stats.sem(diff)  # erreur standard
t_crit = stats.t.ppf(0.975, df=n-1)  # quantile à 97.5%

ic_low  = mean_diff - t_crit * se
ic_high = mean_diff + t_crit * se
print(f"Différence moyenne : {mean_diff:.4f}")
print(f"IC 95% : [{ic_low:.4f}, {ic_high:.4f}]")
# Si l'IC ne contient pas 0 → différence significative (cohérent avec p < 0.05)
\`\`\`

**Tests pour vérifier la normalité**
\`\`\`python
# Shapiro-Wilk (adapté aux petits échantillons < 50)
stat, p = stats.shapiro(model_a)
print(f"Shapiro-Wilk p = {p:.4f}")
# p > 0.05 → on ne rejette pas la normalité (on peut utiliser le test t)

# QQ-plot — inspection visuelle
import matplotlib.pyplot as plt
stats.probplot(model_a, dist="norm", plot=plt)
plt.title("QQ-plot — vérification de normalité")
plt.show()
\`\`\`

**Chi-² — indépendance entre variables catégorielles**
\`\`\`python
# Exemple : la variable "sexe" est-elle liée à l'attrition (churn) ?
from scipy.stats import chi2_contingency
import pandas as pd

# Tableau de contingence
table = pd.crosstab(df["sexe"], df["attrition"])
chi2, p, dof, expected = chi2_contingency(table)
print(f"Chi² = {chi2:.2f}, p-value = {p:.4f}, degrés de liberté = {dof}")
# p < 0.05 → sexe et attrition sont liés (dépendants)
\`\`\`

**Tests A/B en pratique ML**
\`\`\`python
# Combien d'exemples faut-il pour détecter une amélioration de 1% ?
from statsmodels.stats.power import TTestIndPower

analysis = TTestIndPower()
n_needed = analysis.solve_power(
    effect_size=0.3,    # différence normalisée (Cohen's d)
    alpha=0.05,         # seuil de significativité
    power=0.80,         # puissance souhaitée (1 - P(faux négatif))
    alternative="two-sided",
)
print(f"Taille d'échantillon minimale par groupe : {n_needed:.0f}")
\`\`\`

**Résumé : quel test utiliser ?**
| Situation | Test recommandé |
|--|--|
| 2 modèles, mêmes folds | Test t apparié |
| 2 classifieurs, même dataset | McNemar |
| Données non-normales | Wilcoxon |
| Feature catégorielle vs cible catégorielle | Chi-² |
| 3+ groupes | ANOVA (paramétrique) ou Kruskal-Wallis |`,
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
        content: `La visualisation est le premier acte de tout projet ML sérieux. Un graphique révèle en secondes ce qu'un tableau de chiffres cache.

**Matplotlib — la base de tout**
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Graphique de base
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(epochs, train_loss, label="Train loss", color="#6366f1")
ax.plot(epochs, val_loss, label="Val loss", color="#f59e0b", linestyle="--")
ax.set_xlabel("Époque")
ax.set_ylabel("Loss")
ax.set_title("Courbes d'apprentissage")
ax.legend()
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig("learning_curves.png", dpi=150)
plt.show()
\`\`\`

**Subplots — plusieurs graphiques côte à côte**
\`\`\`python
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Distribution d'une variable
axes[0].hist(df["age"], bins=30, color="#6366f1", edgecolor="white")
axes[0].set_title("Distribution de l'âge")

# Boîte à moustaches
axes[1].boxplot([groupe_a, groupe_b, groupe_c], labels=["A", "B", "C"])
axes[1].set_title("Comparaison des groupes")

# Nuage de points
axes[2].scatter(df["revenus"], df["score_credit"], alpha=0.3, c=df["défaut"], cmap="RdYlGn")
axes[2].set_title("Revenus vs Score crédit")

plt.tight_layout()
\`\`\`

**Seaborn — visualisations statistiques élégantes**
\`\`\`python
import seaborn as sns

# Définir un thème cohérent
sns.set_theme(style="darkgrid", palette="deep")

# Distribution + courbe de densité (KDE)
sns.histplot(data=df, x="salaire", hue="département", kde=True, bins=40)

# Matrice de corrélation — ESSENTIELLE en EDA
corr = df.select_dtypes("number").corr()
plt.figure(figsize=(12, 8))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm",
            center=0, vmin=-1, vmax=1, square=True)
plt.title("Matrice de corrélation")
plt.show()

# Pairplot — toutes les relations deux-à-deux
sns.pairplot(df[["feature1", "feature2", "feature3", "target"]], hue="target")

# Violin plot — distribution + densité
sns.violinplot(data=df, x="catégorie", y="valeur", hue="groupe")
\`\`\`

**Ressource** : Seaborn Gallery — https://seaborn.pydata.org/examples/index.html`,
      },
      {
        id: "eda-2",
        title: "Plotly : visualisations interactives",
        duration: "45 min",
        content: `Plotly génère des graphiques interactifs (zoom, hover, filtres) — indispensables pour les dashboards et Jupyter notebooks.

**Plotly Express — API haut niveau**
\`\`\`python
import plotly.express as px
import plotly.graph_objects as go

# Nuage de points interactif
fig = px.scatter(
    df, x="feature1", y="target",
    color="catégorie", size="importance",
    hover_data=["id", "description"],
    title="Features vs Target",
    template="plotly_dark"
)
fig.show()

# Histogramme interactif
fig = px.histogram(df, x="salaire", nbins=50, color="département",
                   marginal="box", hover_data=df.columns)
fig.show()

# Matrice de corrélation interactive
fig = px.imshow(df.corr(), text_auto=".2f", color_continuous_scale="RdBu_r",
                title="Corrélations")
fig.show()
\`\`\`

**Plotly Graph Objects — contrôle total**
\`\`\`python
# Dashboard multi-graphiques
from plotly.subplots import make_subplots

fig = make_subplots(rows=2, cols=2,
                    subplot_titles=("Distribution", "Corrélation", "Tendance", "Catégories"))

fig.add_trace(go.Histogram(x=df["age"], name="Âge"), row=1, col=1)
fig.add_trace(go.Scatter(x=df["x"], y=df["y"], mode="markers", name="Données"), row=1, col=2)
fig.add_trace(go.Scatter(x=dates, y=valeurs, mode="lines+markers", name="Trend"), row=2, col=1)
fig.add_trace(go.Bar(x=catégories, y=comptes, name="Catégories"), row=2, col=2)

fig.update_layout(title="Dashboard EDA", height=700, template="plotly_dark")
fig.show()
\`\`\`

**Exercice** : charge le dataset Titanic (\`pd.read_csv("titanic.csv")\`), crée un dashboard Plotly avec 4 graphiques : distribution des âges, survie par classe, corrélations, tarif par port d'embarquement.`,
      },
      {
        id: "eda-3",
        title: "Workflow EDA complet : de la donnée brute au rapport",
        duration: "65 min",
        content: `L'EDA est un processus structuré. Voici le workflow utilisé dans chaque projet professionnel — de la première inspection aux insights actionnables.

**Étape 1 — Inspection initiale**
\`\`\`python
import pandas as pd
import numpy as np

df = pd.read_csv("dataset.csv")

# Vue d'ensemble rapide
print(df.shape)           # (n_lignes, n_colonnes)
print(df.dtypes)          # types de chaque colonne
print(df.head(10))        # premiers exemples
print(df.describe())      # statistiques descriptives (count, mean, std, min, quartiles, max)

# Valeurs manquantes — critique !
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(2)
print(pd.DataFrame({"count": missing, "%": missing_pct}).query("count > 0").sort_values("%", ascending=False))
\`\`\`

**Étape 2 — Distribution des variables**
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Variables numériques : distribution + outliers
num_cols = df.select_dtypes("number").columns
fig, axes = plt.subplots(len(num_cols), 2, figsize=(12, 4*len(num_cols)))

for i, col in enumerate(num_cols):
    sns.histplot(df[col].dropna(), kde=True, ax=axes[i, 0])
    axes[i, 0].set_title(f"Distribution : {col}")
    sns.boxplot(y=df[col], ax=axes[i, 1])
    axes[i, 1].set_title(f"Outliers : {col}")

plt.tight_layout()
plt.show()

# Variables catégorielles : fréquences
cat_cols = df.select_dtypes("object").columns
for col in cat_cols:
    print(f"\\n{col} ({df[col].nunique()} valeurs uniques):")
    print(df[col].value_counts().head(10))
\`\`\`

**Étape 3 — Analyse de la cible (target)**
\`\`\`python
# Classification : déséquilibre des classes
print("Distribution de la cible:")
print(df["target"].value_counts(normalize=True).mul(100).round(2))
# ⚠️ Si classe majoritaire > 80% : déséquilibre — penser SMOTE ou class_weight

# Régression : distribution de la cible
sns.histplot(df["target"], kde=True)
# ⚠️ Si distribution asymétrique → envisager log(target)
skewness = df["target"].skew()
print(f"Skewness: {skewness:.2f}")
# > 1 ou < -1 : distribution fortement asymétrique
\`\`\`

**Étape 4 — Relations features/target**
\`\`\`python
# Corrélation numérique / target (régression)
correlations = df.select_dtypes("number").corr()["target"].sort_values(key=abs, ascending=False)
print(correlations.head(15))

# Relation catégorielle / target (classification)
for col in cat_cols:
    group = df.groupby(col)["target"].mean().sort_values(ascending=False)
    print(f"\\n{col} vs target (taux moyen):\\n{group}")
\`\`\`

**Étape 5 — Détecter les anomalies**
\`\`\`python
# Règle IQR (outliers)
def detect_outliers_iqr(series):
    Q1, Q3 = series.quantile(0.25), series.quantile(0.75)
    IQR = Q3 - Q1
    lower, upper = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR
    return series[(series < lower) | (series > upper)]

for col in num_cols:
    outliers = detect_outliers_iqr(df[col].dropna())
    if len(outliers) > 0:
        print(f"{col}: {len(outliers)} outliers ({len(outliers)/len(df)*100:.1f}%)")

# Doublons
dupes = df.duplicated().sum()
print(f"\\nDoublons: {dupes} ({dupes/len(df)*100:.1f}%)")
\`\`\`

**Template de rapport EDA** — à utiliser systématiquement :
1. Shape + types + missing values
2. Distribution de chaque variable (histogramme + boxplot)
3. Distribution de la cible + déséquilibre
4. Matrice de corrélation
5. Analyse des outliers
6. 3 insights clés actionnables

**Ressource** : Kaggle notebooks EDA — regarder les kernels Gold Medal pour des exemples de référence.`,
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
        content: `Les algorithmes ML travaillent avec des nombres. Encoder les variables catégorielles correctement est critique — un mauvais encodage peut introduire des biais ou faire exploser la dimensionnalité.

**One-Hot Encoding (OHE) — pour les catégories nominales sans ordre**
\`\`\`python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# Exemple : couleur n'a pas d'ordre naturel
df = pd.DataFrame({"couleur": ["rouge", "bleu", "vert", "rouge", "bleu"]})

# Pandas get_dummies
ohe_df = pd.get_dummies(df["couleur"], prefix="couleur", drop_first=True)
# drop_first=True évite la multicolinéarité (dummy variable trap)

# Sklearn (pour pipelines)
enc = OneHotEncoder(sparse_output=False, drop="first", handle_unknown="ignore")
X_enc = enc.fit_transform(df[["couleur"]])
# handle_unknown="ignore" : si une nouvelle catégorie apparaît en test → zéros
\`\`\`

**⚠️ Quand NE PAS utiliser OHE ?**
Si une variable a > 30 catégories (villes, codes postaux), OHE crée trop de colonnes → utiliser Target Encoding.

**Ordinal Encoding — pour les catégories avec un ordre**
\`\`\`python
from sklearn.preprocessing import OrdinalEncoder

# ✅ niveau d'éducation a un ordre naturel
df["éducation"] = ["Lycée", "Licence", "Master", "Doctorat", "Lycée"]

oe = OrdinalEncoder(categories=[["Lycée", "Licence", "Master", "Doctorat"]])
df["éducation_enc"] = oe.fit_transform(df[["éducation"]])
# → [0, 1, 2, 3, 0]
\`\`\`

**Target Encoding — pour les catégories à haute cardinalité**
\`\`\`python
# Remplace chaque catégorie par la moyenne de la cible pour cette catégorie
# Parfait pour : villes, codes postaux, produits, utilisateurs

import numpy as np

def target_encode(train_df, test_df, col, target, n_folds=5, smoothing=10):
    """Target encoding avec régularisation pour éviter le data leakage."""
    global_mean = train_df[target].mean()

    # Calculer la moyenne par catégorie avec smoothing
    stats = train_df.groupby(col)[target].agg(["mean", "count"])
    # Smoothing : pondère vers la moyenne globale si peu d'exemples
    smooth = (stats["count"] * stats["mean"] + smoothing * global_mean) / (stats["count"] + smoothing)

    train_df[f"{col}_te"] = train_df[col].map(smooth).fillna(global_mean)
    test_df[f"{col}_te"] = test_df[col].map(smooth).fillna(global_mean)

    return train_df, test_df

# ⚠️ TOUJOURS encoder sur le train uniquement, appliquer sur test
train, test = target_encode(train, test, "ville", "prix")
\`\`\`

**Résumé : quel encodage choisir ?**
| Situation | Encodage recommandé |
|-----------|---------------------|
| ≤ 10 catégories, sans ordre | One-Hot Encoding |
| Catégories ordonnées | Ordinal Encoding |
| > 20 catégories | Target Encoding |
| Texte libre | TF-IDF ou embeddings |`,
      },
      {
        id: "fe-2",
        title: "Scaling, imputation et gestion des outliers",
        duration: "55 min",
        content: `Les features sur des échelles très différentes (0-1 vs 0-1 000 000) peuvent biaiser les algorithmes sensibles aux distances (KNN, SVM, réseaux de neurones). Le scaling corrige ça.

**StandardScaler — centrer et réduire (moyenne=0, std=1)**
\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# StandardScaler : recommandé pour les algorithmes linéaires et réseaux de neurones
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit + transform sur train
X_test_scaled = scaler.transform(X_test)         # JAMAIS fit sur test → data leakage !

# MinMaxScaler : [0, 1] — utile si tu as besoin de bornes
mms = MinMaxScaler()
X_mm = mms.fit_transform(X_train)

# RobustScaler : robuste aux outliers (utilise médiane et IQR)
# ✅ Recommandé quand les outliers sont réels et doivent rester dans les données
rs = RobustScaler()
X_rs = rs.fit_transform(X_train)
\`\`\`

**Quand scaler ?**
- **Oui** : régression linéaire/logistique, SVM, KNN, réseaux de neurones, PCA
- **Non nécessaire** : arbres de décision, Random Forest, XGBoost (invariants aux transformations monotones)

**Imputation des valeurs manquantes**
\`\`\`python
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

# SimpleImputer — rapide, suffisant dans la plupart des cas
imp_median = SimpleImputer(strategy="median")    # numérique : médiane > moyenne (robuste aux outliers)
imp_mode = SimpleImputer(strategy="most_frequent")  # catégorielle : valeur la plus fréquente
imp_cst = SimpleImputer(strategy="constant", fill_value=0)

X_imputed = imp_median.fit_transform(X_train)

# KNNImputer — utilise les k voisins les plus proches pour estimer la valeur
# Plus précis mais plus lent
knn_imp = KNNImputer(n_neighbors=5)
X_knn = knn_imp.fit_transform(X_train)

# IterativeImputer (MICE) — modélise chaque feature en fonction des autres
# Le plus précis pour les données complexes
iter_imp = IterativeImputer(max_iter=10, random_state=42)
X_iter = iter_imp.fit_transform(X_train)
\`\`\`

**Ajouter un indicateur de valeur manquante**
\`\`\`python
# Souvent, "manquant" est une information en soi (ex: champ non rempli = comportement)
df["age_missing"] = df["age"].isnull().astype(int)
df["age"] = df["age"].fillna(df["age"].median())
\`\`\`

**Traitement des outliers**
\`\`\`python
# Option 1 : Winsorization (clipping) — limiter aux percentiles 1% et 99%
lower = df["revenu"].quantile(0.01)
upper = df["revenu"].quantile(0.99)
df["revenu_clipped"] = df["revenu"].clip(lower, upper)

# Option 2 : Transformation log (si toutes valeurs > 0)
df["revenu_log"] = np.log1p(df["revenu"])  # log(1+x) pour éviter log(0)

# Option 3 : Supprimer les outliers (rare — seulement si clairement erronés)
df_clean = df[df["revenu"].between(0, 1_000_000)]
\`\`\``,
      },
      {
        id: "fe-3",
        title: "Création de features et sélection de variables",
        duration: "60 min",
        content: `Créer de nouvelles variables pertinentes depuis les données brutes est souvent plus impactant que de choisir un meilleur algorithme. C'est ici que la connaissance métier fait toute la différence.

**Feature engineering métier**
\`\`\`python
# Exemple : prédiction du churn client

# Features temporelles depuis une date
df["signup_date"] = pd.to_datetime(df["signup_date"])
df["ancienneté_jours"] = (pd.Timestamp.now() - df["signup_date"]).dt.days
df["mois_inscription"] = df["signup_date"].dt.month
df["jour_semaine_inscription"] = df["signup_date"].dt.dayofweek
df["est_weekend"] = df["jour_semaine_inscription"].isin([5, 6]).astype(int)

# Interactions entre variables (ratios — souvent très puissants)
df["taux_engagement"] = df["sessions_30j"] / (df["ancienneté_jours"] + 1)
df["panier_moyen"] = df["chiffre_affaires"] / (df["nb_commandes"] + 1)
df["pages_par_session"] = df["pages_vues"] / (df["sessions_30j"] + 1)

# Agrégations sur des fenêtres glissantes
df["sessions_7j"] = df.groupby("user_id")["sessions"].transform(lambda x: x.rolling(7).sum())
df["sessions_30j"] = df.groupby("user_id")["sessions"].transform(lambda x: x.rolling(30).sum())
df["tendance"] = df["sessions_7j"] / (df["sessions_30j"] / 4 + 1)  # accélération récente

# Polynomiales (pour les relations non linéaires)
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False, interaction_only=False)
X_poly = poly.fit_transform(X[["age", "revenu"]])
# Crée : age², revenu², age*revenu
\`\`\`

**Sélection de variables — garder l'essentiel**
\`\`\`python
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.feature_selection import RFECV
import shap

# 1. Filtre statistique (rapide, aveugle au modèle)
selector = SelectKBest(mutual_info_classif, k=20)
X_selected = selector.fit_transform(X_train, y_train)
selected_features = X_train.columns[selector.get_support()]

# 2. RFECV — élimination récursive avec validation croisée (plus précis)
from sklearn.ensemble import RandomForestClassifier
rfecv = RFECV(RandomForestClassifier(n_estimators=100), cv=5, scoring="roc_auc", n_jobs=-1)
rfecv.fit(X_train, y_train)
print(f"Optimal features: {rfecv.n_features_}")
X_optimal = X_train.iloc[:, rfecv.support_]

# 3. SHAP values — explique l'importance feature par feature (gold standard)
import shap
model = RandomForestClassifier().fit(X_train, y_train)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

shap.summary_plot(shap_values[1], X_test)  # importance globale + direction
shap.waterfall_plot(explainer(X_test)[0])  # explication d'une prédiction individuelle
\`\`\`

**Pipeline sklearn — le bon réflexe**
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Définir les transformations par type de colonne
num_features = ["age", "revenu", "ancienneté_jours"]
cat_features = ["ville", "catégorie"]

num_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

cat_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
])

preprocessor = ColumnTransformer([
    ("num", num_pipeline, num_features),
    ("cat", cat_pipeline, cat_features),
])

# Pipeline complet : preprocessing + modèle
full_pipeline = Pipeline([
    ("prep", preprocessor),
    ("model", RandomForestClassifier(n_estimators=200, random_state=42)),
])

full_pipeline.fit(X_train, y_train)
y_pred = full_pipeline.predict(X_test)
# ✅ Aucun data leakage possible — le preprocessor ne voit que le train à chaque fold
\`\`\`

**Exercice** : sur le dataset California Housing, crée 3 nouvelles features (ratio chambres/pièces, densité population, ancienneté relative), applique un pipeline complet avec imputation + scaling, et compare le RMSE avant/après feature engineering.`,
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
        content: `XGBoost et LightGBM dominent les compétitions Kaggle et les projets ML en production sur données tabulaires. Ils surpassent régulièrement les réseaux de neurones quand les données sont structurées (tableaux). Les maîtriser est non négociable pour un ML Engineer.

**Pourquoi le Gradient Boosting est si puissant ?**

Chaque arbre apprend à corriger les **résidus** (erreurs) de l'ensemble précédent. Au lieu d'entraîner des arbres indépendants (Random Forest), on les construit séquentiellement, chacun ciblant ce que les précédents ont raté.

\`\`\`
Prédiction finale = arbre_1 + lr×arbre_2 + lr×arbre_3 + ... + lr×arbre_N
\`\`\`
où lr = learning_rate (taux d'apprentissage, typiquement 0.01–0.1).

**XGBoost — installation et usage de base**
\`\`\`python
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

model = xgb.XGBClassifier(
    n_estimators=1000,        # nombre max d'arbres
    learning_rate=0.05,       # faible = plus robuste mais plus lent
    max_depth=6,              # profondeur max de chaque arbre (3-10)
    subsample=0.8,            # fraction d'exemples par arbre (anti-overfit)
    colsample_bytree=0.8,     # fraction de features par arbre (anti-overfit)
    min_child_weight=1,       # poids min d'un nœud feuille (régularisation)
    gamma=0,                  # gain min pour split (régularisation)
    reg_alpha=0,              # L1 regularisation
    reg_lambda=1,             # L2 regularisation
    eval_metric="auc",
    early_stopping_rounds=50, # arrêt si pas d'amélioration pendant 50 rounds
    random_state=42,
    n_jobs=-1,
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    verbose=100,
)

print(f"Best iteration: {model.best_iteration}")
print(f"Val AUC: {roc_auc_score(y_val, model.predict_proba(X_val)[:, 1]):.4f}")
\`\`\`

**Early stopping — le paramètre le plus important**
\`\`\`python
# Sans early stopping : risque de surapprentissage si n_estimators trop grand
# Avec early stopping : le modèle s'arrête automatiquement quand la performance
# sur le validation set ne s'améliore plus depuis N rounds
# → n_estimators devient le maximum, pas la valeur fixe
\`\`\`

**LightGBM — plus rapide, aussi performant**
\`\`\`python
import lightgbm as lgb

model_lgb = lgb.LGBMClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=-1,           # -1 = pas de limite (LightGBM utilise num_leaves)
    num_leaves=31,          # paramètre clé de LightGBM (complexité de l'arbre)
    subsample=0.8,
    colsample_bytree=0.8,
    min_child_samples=20,   # équivalent min_child_weight pour LightGBM
    reg_alpha=0,
    reg_lambda=1,
    random_state=42,
    n_jobs=-1,
)

callbacks = [lgb.early_stopping(50), lgb.log_evaluation(100)]
model_lgb.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    callbacks=callbacks,
)
\`\`\`

**XGBoost vs LightGBM — quand choisir lequel ?**
| | XGBoost | LightGBM |
|--|---------|----------|
| Vitesse | Plus lent | **Beaucoup plus rapide** |
| Mémoire | Plus consommatrice | **Moins gourmand** |
| Petits datasets | ✅ Très bon | Bon |
| Grands datasets | Bon | **Excellent** |
| Stratégie de split | Depth-wise | **Leaf-wise** (plus précis) |
| Défaut | LightGBM peut overfit sur petits datasets si num_leaves trop élevé | |

**Feature importance — quelles variables comptent ?**
\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

# Importance par gain (recommandée)
importance = pd.Series(
    model.get_booster().get_score(importance_type="gain"),
    name="importance"
).sort_values(ascending=False)

importance.head(20).plot(kind="barh", figsize=(8, 8))
plt.title("Feature Importance (Gain)")
plt.tight_layout()
plt.show()
\`\`\`

**SHAP values — aller plus loin que l'importance globale**
\`\`\`python
import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)

# Importance globale (direction incluse)
shap.summary_plot(shap_values, X_val)

# Explication d'une prédiction individuelle
shap.waterfall_plot(explainer(X_val)[0])

# Dépendance d'une feature spécifique
shap.dependence_plot("revenu", shap_values, X_val)
\`\`\`

**Hyperparameter tuning avec Optuna**

GridSearchCV est trop lent pour XGBoost (espace immense). Optuna utilise une recherche bayésienne intelligente — il apprend quelles zones sont prometteuses.

\`\`\`python
import optuna

def objective(trial):
    params = {
        "n_estimators": 1000,
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
        "max_depth": trial.suggest_int("max_depth", 3, 10),
        "subsample": trial.suggest_float("subsample", 0.5, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.5, 1.0),
        "min_child_weight": trial.suggest_int("min_child_weight", 1, 10),
        "reg_alpha": trial.suggest_float("reg_alpha", 1e-8, 10, log=True),
        "reg_lambda": trial.suggest_float("reg_lambda", 1e-8, 10, log=True),
        "early_stopping_rounds": 50,
        "eval_metric": "auc",
        "random_state": 42,
        "n_jobs": -1,
    }

    model = xgb.XGBClassifier(**params)
    model.fit(
        X_train, y_train,
        eval_set=[(X_val, y_val)],
        verbose=False,
    )

    preds = model.predict_proba(X_val)[:, 1]
    return roc_auc_score(y_val, preds)

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=100, show_progress_bar=True)

print("Best params:", study.best_params)
print("Best AUC:", study.best_value)
\`\`\`

**Exercice** : sur le dataset Titanic ou California Housing, entraîne un XGBoost avec early stopping, analyse les SHAP values pour identifier les 5 features les plus importantes, puis lance une optimisation Optuna sur 50 trials et compare l'AUC avant/après.`,
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
        content: `Une série temporelle est une séquence de valeurs indexées dans le temps. Ce qui la distingue d'un dataset classique : l'**ordre temporel** est une information en soi, et les observations ne sont pas indépendantes entre elles.

**Composantes d'une série temporelle**
| Composante | Description | Exemple |
|--|--|--|
| **Tendance** (Trend) | Direction à long terme | Chiffre d'affaires croissant |
| **Saisonnalité** (Seasonality) | Cycle répétitif à période fixe | Pics de ventes en décembre |
| **Résidus** (Residuals) | Bruit aléatoire | Fluctuations imprévisibles |
| **Cyclicité** | Oscillations à période variable | Cycles économiques |

**Décomposition avec statsmodels**
\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose

# Charger et indexer
df = pd.read_csv("ventes.csv", parse_dates=["date"], index_col="date")
df = df.asfreq("MS")  # fréquence mensuelle, début de mois

# Décomposition additive (ou multiplicative si la saisonnalité amplifie la tendance)
decomp = seasonal_decompose(df["ventes"], model="additive")
decomp.plot()
plt.tight_layout()
plt.show()

# Accéder aux composantes
trend    = decomp.trend
seasonal = decomp.seasonal
residual = decomp.resid
\`\`\`

**Stationnarité — pourquoi c'est crucial**

Un processus est **stationnaire** si sa moyenne, sa variance et son autocovariance ne changent pas dans le temps. La plupart des modèles statistiques (ARIMA) supposent la stationnarité.

Test de Dickey-Fuller augmenté (ADF) :
\`\`\`python
from statsmodels.tsa.stattools import adfuller

result = adfuller(df["ventes"])
print(f"ADF Statistic: {result[0]:.4f}")
print(f"p-value: {result[1]:.4f}")
# p < 0.05 → la série est stationnaire (on rejette H0 de racine unitaire)

# Si non-stationnaire → différencier
df["ventes_diff"] = df["ventes"].diff().dropna()
adfuller(df["ventes_diff"])  # re-tester après différenciation
\`\`\`

**Autocorrélation — la mémoire de la série**
\`\`\`python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

fig, axes = plt.subplots(1, 2, figsize=(14, 4))
plot_acf(df["ventes"].dropna(), lags=36, ax=axes[0])
plot_pacf(df["ventes"].dropna(), lags=36, ax=axes[1])
plt.tight_layout()
plt.show()
# ACF : corrélation avec les lags 1, 2, ..., k
# PACF : corrélation "pure" avec lag k, en contrôlant les lags intermédiaires
\`\`\`

**Validation temporelle — la règle absolue**

En séries temporelles, **on ne shuffle jamais les données** avant de splitter :
\`\`\`python
# ✅ Correct : split chronologique
n = len(df)
train = df.iloc[:int(n * 0.8)]
test  = df.iloc[int(n * 0.8):]

# ❌ Interdit : shuffle aléatoire (data leakage temporel)
# from sklearn.model_selection import train_test_split
# train, test = train_test_split(df, test_size=0.2)  → FAUX
\`\`\`

**Walk-forward validation (Time Series Cross-Validation)**
\`\`\`python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for fold, (train_idx, val_idx) in enumerate(tscv.split(df)):
    X_train, X_val = df.iloc[train_idx], df.iloc[val_idx]
    # Entraîner sur train → évaluer sur val
    # Chaque fold agrandit la fenêtre d'entraînement
    print(f"Fold {fold+1}: train={len(X_train)}, val={len(X_val)}")
\`\`\`

**Métriques adaptées aux séries temporelles**
\`\`\`python
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

y_true = test["ventes"].values
y_pred = model_predictions

mae  = mean_absolute_error(y_true, y_pred)
rmse = np.sqrt(mean_squared_error(y_true, y_pred))
mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100  # % d'erreur

print(f"MAE : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"MAPE : {mape:.2f}%")
\`\`\``,
      },
      {
        id: "st-2",
        title: "ARIMA et SARIMA : modèles statistiques",
        duration: "55 min",
        resources: [
          { type: "book", title: "Forecasting: Principles and Practice (3rd ed.)", url: "https://otexts.com/fpp3/", author: "Hyndman & Athanasopoulos", description: "Le livre de référence absolu sur les séries temporelles — entièrement gratuit en ligne, exemples en R mais les concepts sont universels." },
          { type: "doc", title: "statsmodels — Time Series Analysis", url: "https://www.statsmodels.org/stable/tsa.html", description: "Documentation officielle statsmodels pour ARIMA, SARIMA, SARIMAX et les tests de stationnarité." },
        ],
        content: `ARIMA (AutoRegressive Integrated Moving Average) est le modèle statistique de référence pour les séries temporelles univariées. Il combine trois mécanismes : autorégression, différenciation, et moyennes mobiles.

**Notation ARIMA(p, d, q)**
| Paramètre | Signification | Comment le choisir |
|--|--|--|
| **p** | Ordre AR — combien de lags passés inclure | PACF : dernier lag significatif |
| **d** | Degré de différenciation | 1 si tendance, 2 si tendance dans la tendance |
| **q** | Ordre MA — combien d'erreurs passées inclure | ACF : dernier lag significatif |

**Sélection automatique avec pmdarima (auto_arima)**
\`\`\`python
import pmdarima as pm

# auto_arima cherche le meilleur (p,d,q) via AIC/BIC
model = pm.auto_arima(
    train["ventes"],
    seasonal=False,       # True si saisonnalité (utilise SARIMA)
    stepwise=True,        # plus rapide que grid search exhaustif
    information_criterion="aic",
    trace=True,           # affiche les modèles testés
    error_action="ignore",
    suppress_warnings=True,
)

print(model.summary())
\`\`\`

**ARIMA manuel**
\`\`\`python
from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(train["ventes"], order=(2, 1, 2))
result = model.fit()
print(result.summary())

# Prévision sur h périodes en avant
forecast = result.get_forecast(steps=12)
pred_mean = forecast.predicted_mean
pred_ci   = forecast.conf_int(alpha=0.05)  # intervalle de confiance 95%

# Visualisation
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 4))
plt.plot(train["ventes"], label="Train")
plt.plot(test["ventes"], label="Test", color="green")
plt.plot(pred_mean, label="Prévision", color="red")
plt.fill_between(pred_ci.index, pred_ci.iloc[:, 0], pred_ci.iloc[:, 1],
                 alpha=0.2, color="red", label="IC 95%")
plt.legend()
plt.show()
\`\`\`

**SARIMA — ARIMA avec saisonnalité**

Notation SARIMA(p, d, q)(P, D, Q, m) où m = période saisonnière (12 pour mensuel, 7 pour hebdomadaire) :
\`\`\`python
from statsmodels.tsa.statespace.sarimax import SARIMAX

model = SARIMAX(
    train["ventes"],
    order=(1, 1, 1),           # partie non-saisonnière
    seasonal_order=(1, 1, 1, 12)  # partie saisonnière, m=12 (mensuel)
)
result = model.fit(disp=False)
\`\`\`

**Auto-sélection avec saisonnalité**
\`\`\`python
model = pm.auto_arima(
    train["ventes"],
    seasonal=True,
    m=12,          # périodicité mensuelle
    stepwise=True,
    trace=True,
)
\`\`\`

**Diagnostic des résidus — valider un modèle ARIMA**
\`\`\`python
result.plot_diagnostics(figsize=(14, 8))
plt.tight_layout()
# ✅ Bon modèle : résidus ~ bruit blanc (ACF plat, distribution ~normale, Ljung-Box non significatif)
plt.show()

# Test Ljung-Box (H0 : les résidus sont du bruit blanc)
from statsmodels.stats.diagnostic import acorr_ljungbox
lb = acorr_ljungbox(result.resid, lags=10, return_df=True)
print(lb)
# p-value > 0.05 partout → pas d'autocorrélation résiduelle → ✅
\`\`\`

**Limites d'ARIMA**
- Univarié par défaut (une seule série à la fois) — SARIMAX permet d'ajouter des régresseurs exogènes
- Suppose une relation linéaire entre passé et futur
- Sensible aux données manquantes et aux outliers
- Peu adapté aux séries très longues avec plusieurs saisonnalités imbriquées → Prophet est plus adapté`,
      },
      {
        id: "st-3",
        title: "Prophet : prévisions à grande échelle",
        duration: "55 min",
        resources: [
          { type: "paper", title: "Forecasting at Scale (Prophet)", url: "https://peerj.com/preprints/3190/", author: "Taylor & Letham, Meta (2017)", description: "Le paper original de Prophet — modèle, hypothèses et cas d'usage à l'échelle de Facebook." },
          { type: "doc", title: "Documentation officielle Prophet", url: "https://facebook.github.io/prophet/docs/quick_start.html", description: "Quickstart et guides avancés : saisonnalités, jours fériés, régresseurs, diagnostics." },
        ],
        content: `Prophet est une bibliothèque open-source de Meta (Facebook) conçue pour les séries temporelles métier : elle gère automatiquement les tendances, les saisonnalités multiples, les jours fériés et les données manquantes — sans expertise statistique approfondie.

**Installation et format des données**
\`\`\`python
pip install prophet

import pandas as pd
from prophet import Prophet

# Prophet exige deux colonnes : 'ds' (date) et 'y' (valeur)
df = pd.read_csv("ventes.csv", parse_dates=["date"])
df = df.rename(columns={"date": "ds", "ventes": "y"})

# Split train/test chronologique
train = df[df["ds"] < "2024-01-01"]
test  = df[df["ds"] >= "2024-01-01"]
\`\`\`

**Modèle de base**
\`\`\`python
model = Prophet(
    yearly_seasonality=True,    # saisonnalité annuelle
    weekly_seasonality=True,    # saisonnalité hebdomadaire
    daily_seasonality=False,    # désactivé si données non-horaires
    seasonality_mode="multiplicative",  # "additive" si l'amplitude est constante
    changepoint_prior_scale=0.05,       # flexibilité de la tendance (0.001 rigide - 0.5 flexible)
    seasonality_prior_scale=10,         # force de la saisonnalité
    interval_width=0.95,                # intervalle de confiance
)

model.fit(train)
\`\`\`

**Prévisions**
\`\`\`python
# Créer un dataframe futur
future = model.make_future_dataframe(periods=12, freq="MS")  # 12 mois en avant

forecast = model.predict(future)
print(forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(12))

# Visualisation intégrée
fig = model.plot(forecast)
fig2 = model.plot_components(forecast)  # trend + saisonnalités séparées
\`\`\`

**Jours fériés et événements spéciaux**
\`\`\`python
from prophet.make_holidays import make_holidays_df

# Jours fériés d'un pays
holidays = make_holidays_df(year_list=[2022, 2023, 2024], country="FR")
model = Prophet(holidays=holidays)

# Événements personnalisés (promotions, lancements)
custom_events = pd.DataFrame({
    "ds": ["2023-11-24", "2023-12-31"],
    "holiday": ["Black Friday", "Reveillon"],
    "lower_window": [-1, 0],  # jours avant
    "upper_window": [1, 1],   # jours après
})
model = Prophet(holidays=custom_events)
\`\`\`

**Saisonnalités multiples personnalisées**
\`\`\`python
model = Prophet(yearly_seasonality=False)  # désactiver la défaut
model.add_seasonality(name="yearly", period=365.25, fourier_order=10)
model.add_seasonality(name="monthly", period=30.5, fourier_order=5)
model.add_seasonality(name="quarterly", period=91.25, fourier_order=3)
\`\`\`

**Régresseurs exogènes (variables explicatives)**
\`\`\`python
# Ajouter une variable comme le prix ou la température
model = Prophet()
model.add_regressor("prix_moyen")
model.add_regressor("temperature")

model.fit(train)  # train doit avoir les colonnes "prix_moyen" et "temperature"

# future doit aussi contenir ces colonnes pour les périodes à prévoir
future["prix_moyen"] = prix_prevus
future["temperature"] = temp_prevues
\`\`\`

**Évaluation cross-validation temporelle avec Prophet**
\`\`\`python
from prophet.diagnostics import cross_validation, performance_metrics

# initial : taille du train initial
# period : intervalle entre les cutoffs
# horizon : fenêtre de prévision à évaluer
cv_results = cross_validation(
    model,
    initial="730 days",   # 2 ans de train minimum
    period="90 days",     # évaluer tous les 3 mois
    horizon="180 days",   # prévoir 6 mois en avant
    parallel="processes",
)

metrics = performance_metrics(cv_results)
print(metrics[["horizon", "mae", "rmse", "mape"]])
\`\`\`

**Quand utiliser Prophet vs ARIMA ?**
| Critère | ARIMA/SARIMA | Prophet |
|--|--|--|
| Saisonnalités multiples | ❌ Difficile | ✅ Natif |
| Données manquantes | ❌ Problématique | ✅ Robuste |
| Jours fériés | ❌ Manuel | ✅ Natif |
| Interprétabilité | ✅ Solide | ✅ Très bonne |
| Séries très courtes | ✅ OK | ❌ Besoin de données |
| Automation/scale | Moyen | ✅ Conçu pour |`,
      },
      {
        id: "st-4",
        title: "LightGBM sur séries temporelles : l'approche ML",
        duration: "60 min",
        content: `Les modèles ML (LightGBM, XGBoost) surpassent souvent ARIMA et Prophet sur les séries longues et complexes, à condition de construire les bonnes features temporelles. L'idée : transformer le problème en apprentissage supervisé classique.

**Principe : transformer une série temporelle en dataset tabulaire**
\`\`\`
Date     | Ventes | lag_1 | lag_7 | lag_30 | rolling_mean_7 | mois | jour_semaine
---------|--------|-------|-------|--------|----------------|------|------------
2024-02  | 150    | 140   | 130   | 120    | 135            | 2    | 3
2024-03  | 160    | 150   | 140   | 125    | 148            | 3    | 6
\`\`\`

**Feature engineering temporel**
\`\`\`python
import pandas as pd
import numpy as np

def create_time_features(df, target_col="ventes", lags=[1, 7, 14, 30], windows=[7, 14, 30]):
    df = df.copy().sort_index()

    # Lags (valeurs passées)
    for lag in lags:
        df[f"lag_{lag}"] = df[target_col].shift(lag)

    # Rolling statistics
    for w in windows:
        df[f"rolling_mean_{w}"] = df[target_col].shift(1).rolling(w).mean()
        df[f"rolling_std_{w}"]  = df[target_col].shift(1).rolling(w).std()
        df[f"rolling_min_{w}"]  = df[target_col].shift(1).rolling(w).min()
        df[f"rolling_max_{w}"]  = df[target_col].shift(1).rolling(w).max()

    # Features calendaires
    df["annee"]        = df.index.year
    df["mois"]         = df.index.month
    df["trimestre"]    = df.index.quarter
    df["jour_semaine"] = df.index.dayofweek
    df["jour_annee"]   = df.index.dayofyear
    df["semaine"]      = df.index.isocalendar().week.astype(int)
    df["est_weekend"]  = (df.index.dayofweek >= 5).astype(int)

    # Encodage cyclique (mois 12 est proche de mois 1)
    df["mois_sin"] = np.sin(2 * np.pi * df["mois"] / 12)
    df["mois_cos"] = np.cos(2 * np.pi * df["mois"] / 12)
    df["jour_sin"] = np.sin(2 * np.pi * df["jour_semaine"] / 7)
    df["jour_cos"] = np.cos(2 * np.pi * df["jour_semaine"] / 7)

    df = df.dropna()  # supprimer les lignes avec NaN (dues aux lags)
    return df

df_features = create_time_features(df)
\`\`\`

**Split temporel strict — aucun shuffle**
\`\`\`python
cutoff = "2024-01-01"
train = df_features[df_features.index < cutoff]
test  = df_features[df_features.index >= cutoff]

feature_cols = [c for c in df_features.columns if c != "ventes"]
X_train, y_train = train[feature_cols], train["ventes"]
X_test,  y_test  = test[feature_cols],  test["ventes"]
\`\`\`

**Entraîner LightGBM**
\`\`\`python
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

model = lgb.LGBMRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    num_leaves=31,
    subsample=0.8,
    colsample_bytree=0.8,
    min_child_samples=20,
    random_state=42,
    n_jobs=-1,
)

callbacks = [lgb.early_stopping(50), lgb.log_evaluation(100)]
model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    callbacks=callbacks,
)

preds = model.predict(X_test)
print(f"MAE  : {mean_absolute_error(y_test, preds):.2f}")
print(f"RMSE : {np.sqrt(mean_squared_error(y_test, preds)):.2f}")
print(f"MAPE : {np.mean(np.abs((y_test - preds) / y_test)) * 100:.2f}%")
\`\`\`

**Walk-forward validation (correct pour ML sur time series)**
\`\`\`python
from sklearn.model_selection import TimeSeriesSplit
import numpy as np

tscv = TimeSeriesSplit(n_splits=5, gap=0)
mae_scores = []

for fold, (train_idx, val_idx) in enumerate(tscv.split(df_features)):
    X_tr = df_features.iloc[train_idx][feature_cols]
    y_tr = df_features.iloc[train_idx]["ventes"]
    X_vl = df_features.iloc[val_idx][feature_cols]
    y_vl = df_features.iloc[val_idx]["ventes"]

    m = lgb.LGBMRegressor(n_estimators=500, learning_rate=0.05, random_state=42)
    m.fit(X_tr, y_tr, eval_set=[(X_vl, y_vl)],
          callbacks=[lgb.early_stopping(30), lgb.log_evaluation(-1)])

    preds = m.predict(X_vl)
    mae = mean_absolute_error(y_vl, preds)
    mae_scores.append(mae)
    print(f"Fold {fold+1} MAE: {mae:.2f}")

print(f"\\nMAE moyen: {np.mean(mae_scores):.2f} ± {np.std(mae_scores):.2f}")
\`\`\`

**Comparaison des approches**
| Aspect | ARIMA/SARIMA | Prophet | LightGBM |
|--|--|--|--|
| Variables exogènes | Limité | Oui | ✅ Natif et puissant |
| Séries multiples (multi-store) | Difficile | Moyen | ✅ Excellent |
| Feature engineering | N/A | N/A | ✅ Contrôle total |
| Saisonnalités complexes | ❌ Limité | ✅ Bon | ✅ Via features |
| Interprétabilité | ✅ | ✅ | Via SHAP |
| Performance sur gros volumes | ❌ | Moyen | ✅ Très bon |

**Prévision multi-step (plusieurs périodes en avant)**
\`\`\`python
# Stratégie "recursive" : utiliser les prédictions comme features pour les prédictions suivantes
history = df["ventes"].copy()
future_preds = []

for i in range(12):  # prévoir 12 mois
    # Reconstruire les features avec les données actuelles
    features = create_time_features(history.to_frame()).iloc[-1:][feature_cols]
    pred = model.predict(features)[0]
    future_preds.append(pred)
    # Ajouter la prédiction à l'historique pour le prochain pas
    next_date = history.index[-1] + pd.DateOffset(months=1)
    history[next_date] = pred

print("Prévisions 12 mois :", future_preds)
\`\`\`

**Exercice** : sur le dataset [Air Passengers](https://raw.githubusercontent.com/jbrownlee/Datasets/master/airline-passengers.csv) (passagers mensuels 1949-1960) : (1) décompose la série, (2) ajuste un SARIMA(1,1,1)(1,1,1,12), (3) entraîne un LightGBM avec features temporelles, (4) compare les MAPE des deux approches sur les 24 derniers mois.`,
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
        resources: [
          { type: "video", title: "Backpropagation calculus", url: "https://www.youtube.com/watch?v=tIeHLnjs5U8", author: "3Blue1Brown", description: "La dérivation mathématique complète de la rétropropagation, visualisée." },
          { type: "paper", title: "Adam: A Method for Stochastic Optimization", url: "https://arxiv.org/abs/1412.6980", author: "Kingma & Ba (2014)", description: "Le paper d'Adam — l'optimiseur par défaut de quasiment tous les réseaux modernes." },
          { type: "doc", title: "PyTorch — Autograd: Automatic Differentiation", url: "https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html", description: "Comment PyTorch calcule les gradients automatiquement — tutorial officiel." },
        ],
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
        resources: [
          { type: "course", title: "CS231n: Convolutional Neural Networks for Visual Recognition", url: "https://cs231n.github.io/", author: "Stanford University", description: "Le cours de référence sur les CNN — notes de cours complètes et gratuites en ligne." },
          { type: "video", title: "But what is a convolution?", url: "https://www.youtube.com/watch?v=KuXjwB4LzSA", author: "3Blue1Brown", description: "L'opération de convolution expliquée visuellement — 23 min." },
        ],
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
        resources: [
          { type: "paper", title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", author: "Vaswani et al. (NeurIPS 2017)", description: "Le paper fondateur du Transformer — l'architecture qui a révolutionné le NLP et bien au-delà." },
          { type: "video", title: "Illustrated Transformer (article interactif)", url: "https://jalammar.github.io/illustrated-transformer/", author: "Jay Alammar", description: "L'explication visuelle la plus complète du mécanisme d'attention — animations étape par étape." },
          { type: "video", title: "Let's build GPT: from scratch, in code, spelled out", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", author: "Andrej Karpathy", description: "Implémentation complète d'un mini-GPT from scratch en PyTorch — 2h qui valent un cours entier." },
        ],
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
        resources: [
          { type: "course", title: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/course/2022/", author: "UC Berkeley", description: "Le meilleur cours gratuit sur le cycle complet ML en production : data, training, deployment, monitoring." },
          { type: "doc", title: "MLflow — Getting Started", url: "https://mlflow.org/docs/latest/getting-started/index.html", description: "Tutorial officiel MLflow pour le tracking d'expériences et la gestion de modèles." },
          { type: "book", title: "Designing Machine Learning Systems", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", author: "Chip Huyen", description: "Le livre de référence sur les systèmes ML en production — architecture, data pipelines, monitoring." },
        ],
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
        content: `Un modèle déployé peut discriminer, amplifier des préjugés et causer des préjudices réels. L'éthique en ML n'est pas un bonus — c'est une exigence technique et légale (RGPD, AI Act européen).

**Les sources de biais en ML**

Le biais entre dans le pipeline à plusieurs niveaux :
| Source | Exemple concret |
|--|--|
| **Données d'entraînement** | Données historiques de recrutement sur-représentant les hommes |
| **Proxy features** | Le code postal encode implicitement l'origine ethnique |
| **Labeling** | Annotateurs avec des biais culturels |
| **Feedback loop** | Modèle de police → plus de contrôles → plus de données sur quartiers défavorisés |
| **Définition de la cible** | "Bon employé" défini par des managers avec leurs propres biais |

**Exemple : COMPAS (récidive criminelle)**
Le modèle COMPAS utilisé dans des tribunaux américains avait un taux de faux positifs **2× plus élevé** pour les accusés noirs que pour les blancs. Pourtant son accuracy globale était similaire — preuve que l'accuracy globale est une métrique insuffisante.

**Métriques d'équité (fairness metrics)**

Soit A = groupe sensible (ex. sexe, ethnie), Ŷ = prédiction, Y = vraie valeur.

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.metrics import confusion_matrix

def fairness_report(y_true, y_pred, sensitive_attr, group_a, group_b):
    """Compare les métriques entre deux groupes."""
    results = {}
    for name, mask in [(group_a, sensitive_attr == group_a),
                       (group_b, sensitive_attr == group_b)]:
        tn, fp, fn, tp = confusion_matrix(y_true[mask], y_pred[mask]).ravel()
        results[name] = {
            "accuracy":        (tp + tn) / (tp + tn + fp + fn),
            "TPR (recall)":    tp / (tp + fn),   # True Positive Rate
            "FPR":             fp / (fp + tn),   # False Positive Rate
            "precision":       tp / (tp + fp),
            "pred_positive":   (y_pred[mask] == 1).mean(),  # taux prédit positif
        }
    df = pd.DataFrame(results).T
    print(df.round(3))
    print(f"\\nRatio de parité démographique : {df['pred_positive'].min() / df['pred_positive'].max():.3f}")
    print(f"(> 0.8 = règle des 4/5 respectée)")
    return df

# Utilisation
report = fairness_report(y_true, y_pred, df["sexe"], "Femme", "Homme")
\`\`\`

**Les 3 définitions de fairness (mutuellement exclusives !)**

\`\`\`
1. Demographic Parity (Parité démographique)
   P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1)
   → Même taux de prédictions positives dans les deux groupes
   Problème : ne tient pas compte des différences réelles dans Y

2. Equal Opportunity (Égalité des chances)
   P(Ŷ=1 | Y=1, A=0) = P(Ŷ=1 | Y=1, A=1)
   → Même TPR (rappel) dans les deux groupes
   Favorise : prêts, recrutement — les qualifiés des deux groupes ont la même chance

3. Equalized Odds (Chances équilibrées)
   TPR ET FPR égaux entre groupes
   → Le modèle se trompe pareillement dans les deux sens pour chaque groupe
   Favorise : justice pénale, médecine — les erreurs doivent être symétriques
\`\`\`

**Important** : il est mathématiquement impossible de satisfaire les 3 définitions simultanément quand les taux de base (base rates) diffèrent entre groupes (théorème de Chouldechova, 2017).

**Explicabilité avec SHAP**

SHAP (SHapley Additive exPlanations) est l'outil de référence pour expliquer les prédictions individuelles ET détecter les biais feature par feature.

\`\`\`python
import shap
import matplotlib.pyplot as plt

# Explainer pour tout modèle tree-based
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 1. Importance globale avec direction
shap.summary_plot(shap_values, X_test, plot_type="bar")

# 2. Impact de chaque feature sur chaque prédiction (beeswarm)
shap.summary_plot(shap_values, X_test)

# 3. Explication d'une prédiction individuelle
shap.waterfall_plot(explainer(X_test)[0])

# 4. Dépendance feature × interaction
shap.dependence_plot("age", shap_values, X_test, interaction_index="sexe")
# → Voir si l'effet de l'âge diffère selon le sexe
\`\`\`

**Explicabilité avec LIME**

LIME approche localement le modèle par un modèle linéaire interprétable :
\`\`\`python
import lime
import lime.lime_tabular

explainer_lime = lime.lime_tabular.LimeTabularExplainer(
    training_data=X_train.values,
    feature_names=X_train.columns.tolist(),
    class_names=["Non", "Oui"],
    mode="classification",
)

# Expliquer une prédiction individuelle
instance = X_test.iloc[0].values
exp = explainer_lime.explain_instance(instance, model.predict_proba, num_features=10)
exp.show_in_notebook()
exp.as_pyplot_figure()
plt.tight_layout()
plt.show()
\`\`\`

**SHAP vs LIME**
| | SHAP | LIME |
|--|--|--|
| Fondation théorique | Théorie des jeux (Shapley values) | Approximation locale linéaire |
| Cohérence globale | ✅ Toujours cohérent | Peut varier selon les runs |
| Vitesse | Plus lent (modèles complexes) | Rapide |
| Modèles | Tree-based natif, kernel pour autres | Tout type |
| Recommandation | Préférer SHAP si possible | Utile pour NLP et images |

**Audit de fairness avec Fairlearn**
\`\`\`python
from fairlearn.metrics import MetricFrame, selection_rate, true_positive_rate, false_positive_rate
from sklearn.metrics import accuracy_score

sensitive_features = df_test["sexe"]

metrics = {
    "accuracy": accuracy_score,
    "selection_rate": selection_rate,
    "true_positive_rate": true_positive_rate,
    "false_positive_rate": false_positive_rate,
}

mf = MetricFrame(
    metrics=metrics,
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=sensitive_features,
)

print(mf.overall)
print(mf.by_group)
print("\\nDifférence max entre groupes :")
print(mf.difference())  # proche de 0 = équitable
\`\`\`

**Atténuation des biais (mitigation)**
\`\`\`python
from fairlearn.reductions import ExponentiatedGradient, DemographicParity

# Entraîner sous contrainte de fairness
constraint = DemographicParity()
mitigator = ExponentiatedGradient(estimator=base_model, constraints=constraint)
mitigator.fit(X_train, y_train, sensitive_features=sensitive_train)

y_pred_fair = mitigator.predict(X_test)
# Vérifier que le modèle est à la fois précis ET équitable
\`\`\`

**Checklist éthique avant déploiement**
- [ ] Identifier les groupes sensibles dans les données
- [ ] Mesurer les métriques de fairness par groupe (TPR, FPR, selection rate)
- [ ] Documenter les limites connues du modèle (Model Card)
- [ ] Expliquer les prédictions à risque avec SHAP
- [ ] Vérifier la conformité RGPD : droit à l'explication (Art. 22), données personnelles
- [ ] Prévoir une boucle de feedback humain pour les cas limites
- [ ] Surveiller les métriques de fairness en production (elles dérivent aussi)`,
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

export function getModule(id) {
  return CURRICULUM.find((m) => m.id === id);
}

export function totalLessons() {
  return CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
