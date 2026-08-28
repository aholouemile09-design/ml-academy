// ─────────────────────────────────────────────────────────────────────────────
//  Exercices du parcours ML & Data Science
// ─────────────────────────────────────────────────────────────────────────────
//
//  Ce fichier est greffé sur CURRICULUM au chargement (voir lib/curriculum.js).
//  Il est séparé pour que le contenu des leçons reste lisible d'un côté et les
//  exercices de l'autre — et pour n'avoir qu'un seul endroit à éditer quand on
//  ajoute un exercice.
//
//  Pour chaque module :
//    lessons      { [lessonId]: [exerciceA, exerciceB] }
//    finalExercise  l'exercice global qui rassemble tout le module
//    quizExtra      questions ajoutées au quiz de base du module
//
//  Un exercice de leçon :
//    kind        "application" → guidé, juste après le concept
//                "blanche"     → énoncé en français, aucun squelette
//    statement   l'énoncé (markdown)
//    hint        l'indice, masqué par défaut
//    solution    la correction commentée, masquée par défaut
//
//  Les deux exercices d'une leçon ne sont JAMAIS du même type : le premier
//  entraîne le geste, le second entraîne le passage « problème → code ».
//  C'est le second qui manque quand on comprend le cours mais qu'on reste
//  bloqué devant un fichier vide.
//
//  Règle de rédaction des corrections : expliquer POURQUOI, pas seulement
//  donner le code. Une correction qui ne fait que montrer la réponse ne sert
//  qu'à celui qui avait déjà trouvé.
// ─────────────────────────────────────────────────────────────────────────────

export const EXERCISES = {
  // ══ PYTHON POUR LA DATA SCIENCE ═══════════════════════════════════════════
  python: {
    lessons: {
      "py-1": [
        {
          id: "py-1-a",
          kind: "application",
          title: "Calculer une moyenne à la main",
          statement: `Écris une fonction \`moyenne(nombres)\` qui prend une liste de nombres et retourne leur moyenne, **sans aucune bibliothèque** (ni \`statistics\`, ni \`numpy\`).

Contrainte : si la liste est vide, elle doit retourner \`0\` — pas planter.`,
          hint: `Il te faut deux choses : la somme des éléments et leur nombre. \`len()\` donne le second. Pour le premier, une boucle \`for\` avec une variable accumulateur initialisée à 0. Et traite le cas de la liste vide **avant** la division.`,
          solution: `\`\`\`python
def moyenne(nombres):
    if not nombres:          # liste vide : on sort avant de diviser
        return 0
    total = 0
    for n in nombres:
        total += n
    return total / len(nombres)

print(moyenne([12, 15, 8, 19]))   # 13.5
print(moyenne([]))                # 0
\`\`\`

**Le point qui compte** : le cas de la liste vide. Une fonction qui marche sur l'exemple du cours mais plante sur un cas limite n'est pas terminée. Prends l'habitude de te demander « qu'est-ce qui casse ça ? » avant de passer à la suite.`,
        },
        {
          id: "py-1-b",
          kind: "blanche",
          title: "Bulletin de classe",
          statement: `**Page blanche.** Aucun squelette, aucune indication de méthode — c'est le but.

Un professeur te donne les notes de sa classe :

\`\`\`python
notes = [12, 15, 8, 19, 6, 14, 17, 9, 11, 20]
\`\`\`

Écris un programme qui affiche :
1. la meilleure note et la pire
2. la moyenne de la classe (réutilise ta fonction de l'exercice A)
3. le nombre d'élèves au-dessus de la moyenne
4. la mention de chaque note : \`< 10\` → « Insuffisant », \`10-13\` → « Passable », \`14-16\` → « Bien », \`>= 17\` → « Très bien »

**Méthode imposée** : commence par écrire les 4 étapes en commentaires français dans ton fichier, puis remplis-les une par une en exécutant après chaque étape.`,
          hint: `Ne cherche pas « comment écrire ce programme » — question impossible. Découpe : « comment trouver le maximum d'une liste ? », puis « comment compter les éléments qui vérifient une condition ? », puis « comment associer une note à un texte ? ». Chacune est une question à laquelle tu sais répondre.`,
          solution: `\`\`\`python
notes = [12, 15, 8, 19, 6, 14, 17, 9, 11, 20]

def moyenne(nombres):
    if not nombres:
        return 0
    return sum(nombres) / len(nombres)

def mention(note):
    if note < 10:
        return "Insuffisant"
    elif note <= 13:
        return "Passable"
    elif note <= 16:
        return "Bien"
    else:
        return "Très bien"

# 1. meilleure et pire note
print(f"Meilleure : {max(notes)} | Pire : {min(notes)}")

# 2. moyenne de la classe
moy = moyenne(notes)
print(f"Moyenne : {moy:.2f}")

# 3. nombre d'élèves au-dessus de la moyenne
au_dessus = 0
for n in notes:
    if n > moy:
        au_dessus += 1
print(f"Au-dessus de la moyenne : {au_dessus}")

# 4. mention de chaque note
for n in notes:
    print(f"{n:>2} -> {mention(n)}")
\`\`\`

**Trois choses à remarquer** :

Les commentaires numérotés sont restés dans le code final. C'est normal : ils sont devenus la structure du programme. C'est exactement la méthode anti-page-blanche — tu n'as jamais eu à répondre à « comment j'écris ce programme », seulement à quatre petites questions.

\`mention()\` est une fonction séparée. Dès qu'un bloc de logique a un nom clair, il mérite d'être extrait.

L'ordre des \`elif\` est essentiel : comme le premier \`if\` a déjà écarté les notes \`< 10\`, le \`elif note <= 13\` couvre exactement 10 à 13. Écrire les conditions dans le désordre est l'erreur classique.`,
        },
      ],
      "py-2": [
        {
          id: "py-2-a",
          kind: "application",
          title: "Filtrer avec une compréhension de dictionnaire",
          statement: `À partir de cette liste de tuples :

\`\`\`python
eleves = [("Awa", 15), ("Kofi", 8), ("Lina", 12), ("Sam", 9), ("Zoé", 18)]
\`\`\`

Construis un dictionnaire \`{nom: note}\` ne gardant que les notes \`>= 10\`.

Écris-le **deux fois** : une version avec une boucle \`for\`, une version en compréhension de dictionnaire. Les deux doivent donner exactement le même résultat.`,
          hint: `Une compréhension de dictionnaire s'écrit \`{cle: valeur for ... in ... if ...}\`. Tu peux déballer un tuple directement dans le \`for\` : \`for nom, note in eleves\`.`,
          solution: `\`\`\`python
eleves = [("Awa", 15), ("Kofi", 8), ("Lina", 12), ("Sam", 9), ("Zoé", 18)]

# Version boucle
admis = {}
for nom, note in eleves:
    if note >= 10:
        admis[nom] = note

# Version compréhension — même résultat, une ligne
admis = {nom: note for nom, note in eleves if note >= 10}

print(admis)   # {'Awa': 15, 'Lina': 12, 'Zoé': 18}
\`\`\`

**Pourquoi écrire les deux** : la compréhension n'est pas « la version avancée », c'est la même chose écrite autrement. Tant que tu ne peux pas traduire mentalement l'une en l'autre, la compréhension reste une formule magique — et une formule magique, ça ne se retient pas.

Note le déballage \`for nom, note in eleves\` : Python assigne automatiquement les deux éléments du tuple. Sans ça tu écrirais \`for e in eleves\` puis \`e[0]\`, \`e[1]\` — beaucoup moins lisible.`,
        },
        {
          id: "py-2-b",
          kind: "blanche",
          title: "Détecteur de doublons",
          statement: `**Page blanche.**

\`\`\`python
mots = ["chat", "chien", "chat", "oiseau", "chien", "chat", "poisson"]
\`\`\`

Écris un programme qui affiche, pour chaque mot apparaissant **plus d'une fois**, son nombre d'occurrences, trié du plus fréquent au moins fréquent :

\`\`\`
chat : 3
chien : 2
\`\`\`

**Contrainte** : n'utilise pas \`collections.Counter\`. Le but est justement de choisir la structure de données toi-même.

**Méthode** : avant de coder, écris en une phrase française quelle structure tu vas utiliser et pourquoi. C'est cette décision-là que l'exercice entraîne.`,
          hint: `Tu dois associer une information (un compteur) à chaque mot. Quelle structure associe une clé à une valeur ? Pour l'incrémentation, regarde du côté de \`dict.get(cle, 0)\`, qui retourne une valeur par défaut quand la clé n'existe pas encore.`,
          solution: `\`\`\`python
mots = ["chat", "chien", "chat", "oiseau", "chien", "chat", "poisson"]

# Structure choisie : un dictionnaire mot -> compteur.
# Un set ne suffirait pas : il dit si un mot est présent, pas combien de fois.

compteurs = {}
for mot in mots:
    compteurs[mot] = compteurs.get(mot, 0) + 1

# On ne garde que les doublons, puis on trie par compteur décroissant
doublons = {m: n for m, n in compteurs.items() if n > 1}
for mot, n in sorted(doublons.items(), key=lambda item: item[1], reverse=True):
    print(f"{mot} : {n}")
\`\`\`

**Le vrai contenu de cet exercice, c'est le choix de structure** :

une **liste** garderait l'ordre mais t'obligerait à la reparcourir pour chaque mot ; un **set** répond à « ce mot est-il présent ? » mais ne compte pas ; un **dictionnaire** est la seule structure qui associe une valeur mutable à une clé.

C'est exactement le genre de décision que personne n'enseigne explicitement et qui bloque devant la page blanche. Le cours te donne les quatre structures, mais choisir laquelle est une compétence séparée — qui ne s'acquiert qu'en la pratiquant.

\`dict.get(cle, 0)\` évite d'écrire \`if mot not in compteurs: compteurs[mot] = 0\`. Un réflexe à prendre.`,
        },
      ],
      "py-3": [
        {
          id: "py-3-a",
          kind: "application",
          title: "Normaliser une matrice sans boucle",
          statement: `Soit une matrice de mesures, une colonne par variable :

\`\`\`python
import numpy as np
M = np.array([[10., 200., 3.],
              [12., 180., 5.],
              [ 8., 220., 4.]])
\`\`\`

Normalise-la colonne par colonne (moyenne 0, écart-type 1) **sans écrire une seule boucle**.

Vérifie ton résultat : après normalisation, \`M_norm.mean(axis=0)\` doit valoir ~0 et \`M_norm.std(axis=0)\` doit valoir ~1.`,
          hint: `\`M.mean(axis=0)\` te donne un vecteur de 3 moyennes (une par colonne). Le broadcasting fait le reste : soustraire un vecteur de forme \`(3,)\` à une matrice \`(3, 3)\` applique automatiquement la soustraction ligne par ligne.`,
          solution: `\`\`\`python
import numpy as np

M = np.array([[10., 200., 3.],
              [12., 180., 5.],
              [ 8., 220., 4.]])

M_norm = (M - M.mean(axis=0)) / M.std(axis=0)

print(M_norm.mean(axis=0))   # [~0. ~0. ~0.]
print(M_norm.std(axis=0))    # [1. 1. 1.]
\`\`\`

**Une seule ligne, et c'est tout le sujet de l'exercice.**

\`axis=0\` signifie « réduis en descendant les lignes », donc un résultat par colonne. \`axis=1\` fait l'inverse. C'est la source d'erreur numéro un en NumPy : quand un calcul donne un résultat aberrant, vérifie ton \`axis\` avant tout le reste.

Le broadcasting est ce qui rend la ligne possible : NumPy étire automatiquement le vecteur \`(3,)\` sur les 3 lignes de la matrice. Sans lui il faudrait une double boucle — et 100x plus de temps de calcul.

⚠️ En vrai projet ML, tu calcules moyenne et écart-type **sur le jeu d'entraînement uniquement**, puis tu appliques ces mêmes valeurs au jeu de test. Utiliser les statistiques de tout le dataset est une fuite de données (*data leakage*) — l'erreur qui gonfle silencieusement tes scores et qu'on ne découvre qu'en production.`,
        },
        {
          id: "py-3-b",
          kind: "blanche",
          title: "La ville la plus proche",
          statement: `**Page blanche.**

Tu as une matrice de distances entre 5 villes. \`D[i][j]\` est la distance de la ville \`i\` à la ville \`j\`, et la diagonale vaut 0 (distance d'une ville à elle-même).

\`\`\`python
import numpy as np
villes = ["Dakar", "Abidjan", "Lagos", "Accra", "Cotonou"]
D = np.array([[   0., 1600., 2400., 1900., 2200.],
              [1600.,    0.,  850.,  400.,  650.],
              [2400.,  850.,    0.,  500.,  300.],
              [1900.,  400.,  500.,    0.,  250.],
              [2200.,  650.,  300.,  250.,    0.]])
\`\`\`

Affiche pour **chaque** ville sa voisine la plus proche et la distance correspondante :

\`\`\`
Dakar -> Abidjan (1600.0 km)
...
\`\`\`

**Le piège** : la valeur minimale de chaque ligne est 0 — la ville elle-même. À toi de trouver comment l'écarter.`,
          hint: `\`np.argmin(ligne)\` donne l'**indice** du minimum, pas sa valeur. Pour écarter la diagonale, une piste : remplace les 0 de la diagonale par l'infini (\`np.inf\`) avant de chercher le minimum — l'infini ne sera jamais le plus petit. Regarde \`np.fill_diagonal()\`.`,
          solution: `\`\`\`python
import numpy as np

villes = ["Dakar", "Abidjan", "Lagos", "Accra", "Cotonou"]
D = np.array([[   0., 1600., 2400., 1900., 2200.],
              [1600.,    0.,  850.,  400.,  650.],
              [2400.,  850.,    0.,  500.,  300.],
              [1900.,  400.,  500.,    0.,  250.],
              [2200.,  650.,  300.,  250.,    0.]])

# 1. Neutraliser la diagonale pour qu'elle ne gagne jamais le minimum.
#    On travaille sur une copie : ne jamais modifier les données d'origine.
D_travail = D.copy()
np.fill_diagonal(D_travail, np.inf)

# 2. Pour chaque ligne, l'indice du minimum
plus_proches = np.argmin(D_travail, axis=1)

# 3. Affichage
for i, ville in enumerate(villes):
    j = plus_proches[i]
    print(f"{ville} -> {villes[j]} ({D[i, j]} km)")
\`\`\`

**Ce que cet exercice entraîne, c'est la décomposition**, pas la syntaxe NumPy. Le problème « trouver la ville la plus proche » n'a pas de solution évidente — mais découpé en « neutraliser la diagonale », puis « indice du minimum par ligne », puis « afficher », chaque morceau devient trivial.

Deux réflexes à retenir :

\`argmin\` retourne un **indice**, \`min\` retourne une **valeur**. Ici il te faut l'indice, parce que c'est lui qui te permet de retrouver le nom de la ville dans la liste.

\`D.copy()\` : sans lui, \`fill_diagonal\` écrase tes données d'origine, et l'affichage final de la distance serait faux. En NumPy comme en Python, beaucoup d'opérations modifient l'objet en place — c'est le même piège que \`b = a\` sur les listes.`,
        },
      ],
      "py-4": [
        {
          id: "py-4-a",
          kind: "application",
          title: "Taux de survie du Titanic",
          statement: `Charge le dataset Titanic et calcule le taux de survie **par classe et par sexe**.

\`\`\`python
import seaborn as sns
df = sns.load_dataset("titanic")
\`\`\`

Résultat attendu : un tableau croisé avec les classes en lignes, les sexes en colonnes, et le taux de survie (entre 0 et 1) dans les cellules.

Puis réponds par écrit, en une phrase : qu'est-ce que ce tableau raconte ?`,
          hint: `La colonne \`survived\` vaut 0 ou 1. La **moyenne** d'une colonne de 0 et de 1, c'est exactement une proportion — donc \`mean\` te donne directement le taux de survie. Pour croiser deux variables, regarde \`groupby([...])\` avec deux colonnes, ou \`pivot_table\`.`,
          solution: `\`\`\`python
import seaborn as sns

df = sns.load_dataset("titanic")

# Version groupby
taux = df.groupby(["class", "sex"])["survived"].mean()

# Version pivot_table — même chose, présentée en tableau croisé
taux = df.pivot_table(index="class", columns="sex", values="survived", aggfunc="mean")
print(taux.round(3))
\`\`\`

\`\`\`
sex     female    male
class
First    0.968   0.369
Second   0.921   0.157
Third    0.500   0.135
\`\`\`

**L'astuce centrale** : \`survived\` ne contient que des 0 et des 1, donc sa moyenne *est* le taux de survie. Ce réflexe — encoder une variable binaire en 0/1 pour que \`mean()\` produise une proportion — te servira constamment en ML.

**Et la phrase d'interprétation compte autant que le code.** Ici : une femme de première classe avait 97 % de chances de survivre, un homme de troisième classe 13 % — le sexe pesait plus lourd que la classe, mais les deux effets se cumulaient. Un chiffre qu'on ne sait pas raconter est un chiffre qu'on n'a pas compris.`,
        },
        {
          id: "py-4-b",
          kind: "blanche",
          title: "Rapport commercial",
          statement: `**Page blanche.** Aucune méthode indiquée — à toi de choisir les outils.

\`\`\`python
import pandas as pd

commandes = pd.DataFrame({
    "id":      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "client":  ["Awa", "Kofi", "Awa", "Lina", "Kofi", "Awa", "Sam", "Lina", "Kofi", "Sam"],
    "date":    pd.to_datetime(["2026-01-05","2026-01-17","2026-02-03","2026-02-14",
                               "2026-02-28","2026-03-08","2026-03-15","2026-03-22",
                               "2026-04-02","2026-04-19"]),
    "montant": [120.0, 85.5, 240.0, 60.0, 310.0, 95.0, 150.0, 420.0, 75.5, 200.0],
    "statut":  ["livrée","livrée","annulée","livrée","livrée",
                "annulée","livrée","livrée","livrée","annulée"],
})
\`\`\`

Produis un rapport affichant :
1. le **top 3 des clients** par chiffre d'affaires, commandes annulées exclues
2. le **panier moyen par mois**
3. le **pourcentage de commandes annulées**, global et par client

**Méthode** : écris d'abord les 3 questions en commentaires, puis résous-les une par une en affichant le résultat intermédiaire à chaque étape.`,
          hint: `Pour le point 1, commence par filtrer les lignes non annulées, puis groupe par client, puis trie. Pour le point 2, tu peux extraire le mois avec \`df["date"].dt.to_period("M")\`. Pour le point 3, souviens-toi de l'astuce du Titanic : transforme « statut == annulée » en booléen, et prends la moyenne.`,
          solution: `\`\`\`python
import pandas as pd

# (bloc "commandes" identique à l'énoncé)

# 1. Top 3 des clients par CA, annulations exclues
valides = commandes[commandes["statut"] != "annulée"]
top3 = valides.groupby("client")["montant"].sum().sort_values(ascending=False).head(3)
print("Top 3 clients :")
print(top3)

# 2. Panier moyen par mois
commandes["mois"] = commandes["date"].dt.to_period("M")
panier = valides.groupby(commandes["mois"])["montant"].mean().round(2)
print("\\nPanier moyen par mois :")
print(panier)

# 3. Taux d'annulation, global et par client
commandes["annulee"] = commandes["statut"] == "annulée"
print(f"\\nTaux d'annulation global : {commandes['annulee'].mean():.1%}")
print("\\nPar client :")
print(commandes.groupby("client")["annulee"].mean().sort_values(ascending=False))
\`\`\`

**Trois choses à retenir** :

**Le filtrage vient avant le regroupement.** « Annulations exclues » se traduit par un filtre appliqué en premier, pas par une correction après coup. L'ordre des opérations est la moitié du travail en Pandas.

**\`commandes["annulee"] = ...\` crée une colonne booléenne**, et \`.mean()\` d'une colonne de booléens donne directement une proportion — la même astuce que le Titanic, réutilisée dans un contexte totalement différent. C'est ça, maîtriser un concept : le reconnaître ailleurs.

**Enchaîner \`groupby → agrégation → sort_values → head\`** est le motif le plus courant de toute la data science. Tu vas l'écrire des centaines de fois.

Si tu as réussi cet exercice sans regarder la correction, tu tiens réellement le module.`,
        },
      ],
    },
    finalExercise: {
      title: "Analyse d'un registre de santé publique",
      duration: "2 à 4 h",
      covers: ["py-1", "py-2", "py-3", "py-4"],
      brief: `Un CSV brut de consultations médicales : valeurs manquantes, doublons, types incohérents, colonnes mal nommées. Ton travail : en tirer une analyse propre et reproductible.

Cet exercice **rassemble les 4 leçons du module** — fonctions et conditions (leçon 1), structures de données (leçon 2), vectorisation NumPy (leçon 3), manipulation Pandas (leçon 4). Aucun outil nouveau : uniquement ce que tu as déjà vu, assemblé sur un problème réaliste.

Personne ne te dira quelle fonction utiliser à quelle étape. C'est exactement l'objectif : c'est le seul exercice du module qui entraîne la **décomposition**, celle qui te manque quand tu te retrouves tétanisé devant un fichier vide.`,
      dataset: `Génère toi-même le jeu de données sale avec ce script — le lire attentivement fait déjà partie de l'exercice :

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(42)

n = 500
df = pd.DataFrame({
    "Patient ID": rng.integers(1000, 1200, n),
    "age":        rng.integers(1, 95, n).astype(float),
    "sexe":       rng.choice(["F", "M", "f", "m", None], n, p=[.4, .4, .08, .08, .04]),
    "region":     rng.choice(["Nord", "Sud", "Est", "Ouest"], n),
    "tension":    rng.normal(125, 18, n).round(1),
    "glycemie":   rng.normal(1.05, 0.25, n).round(2),
    "cout":       rng.normal(85, 40, n).round(2),
})
df.loc[rng.choice(n, 60, replace=False), "tension"]  = np.nan
df.loc[rng.choice(n, 35, replace=False), "glycemie"] = np.nan
df = pd.concat([df, df.sample(40, random_state=1)])   # doublons volontaires
df.to_csv("consultations.csv", index=False)
\`\`\``,
      steps: [
        "**Rapport de qualité** — écris une fonction `rapport_qualite(df)` qui affiche, pour chaque colonne : son type, son taux de valeurs manquantes et son nombre de valeurs uniques. Une seule fonction réutilisable, pas dix `print()` copiés-collés. (leçon 1)",
        "**Nettoyage justifié** — uniformise la colonne `sexe` (`F`/`M`), renomme les colonnes en `snake_case`, supprime les doublons, traite les valeurs manquantes. Pour chaque décision, écris en commentaire *pourquoi* tu l'as prise. Supprimer 20 % des lignes sans le justifier est une faute, pas une solution. (leçons 2 et 4)",
        "**Variables dérivées** — crée 3 colonnes : une tranche d'âge (catégorielle), un indicateur binaire `hypertension` (tension ≥ 140), et un ratio de ton choix. La tranche d'âge doit passer par une fonction avec des conditions — la leçon 1 réapparaît ici, appliquée à un DataFrame. (leçons 1 et 4)",
        "**Agrégations métier** — produis 5 agrégations `groupby` répondant à des questions explicitement formulées en français (ex. « le coût moyen varie-t-il selon la région ? »). Écris la question au-dessus de chaque bloc, et la réponse en dessous. (leçon 4)",
        "**Vectorisation** — écris d'abord un calcul avec une boucle `for` sur les lignes, mesure son temps avec `%timeit`, puis réécris-le en vectorisé NumPy/Pandas et mesure à nouveau. Rapporte le facteur d'accélération obtenu. (leçon 3)",
      ],
      checklist: [
        "Mon code tourne du début à la fin sans erreur, dans un fichier neuf",
        "Chaque décision de nettoyage est justifiée par un commentaire",
        "J'ai écrit au moins deux fonctions réutilisables, pas seulement du code au fil de l'eau",
        "Chaque agrégation est accompagnée de sa question ET de sa réponse en français",
        "J'ai mesuré un gain de vitesse chiffré entre la boucle et la version vectorisée",
        "Je peux réexpliquer chaque ligne de mon code sans le relire",
      ],
      selfCheck: `Le vrai test n'est pas « est-ce que ça marche ». C'est : **ferme tout, ouvre un fichier vide, et refais l'étape 4 de mémoire.**

Si tu y arrives, le module est acquis. Si tu bloques, tu sais exactement quelle leçon relire — et ce n'est pas un échec, c'est précisément l'information que tu cherchais.`,
    },
    quizExtra: [
      {
        q: "Qu'affiche ce code ?\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
        options: ["3", "4", "Une erreur", "Cela dépend de la version de Python"],
        answer: 1,
        explain:
          "b = a ne copie pas la liste : les deux noms désignent le MÊME objet en mémoire. Modifier b modifie donc a, et len(a) vaut 4. Pour une vraie copie il faut écrire b = a.copy() (ou b = a[:]). C'est la source de bug la plus fréquente chez les débutants Python.",
      },
      {
        q: "Qu'affiche ce code ?\n\ndef ajoute(x, liste=[]):\n    liste.append(x)\n    return liste\n\nprint(ajoute(1))\nprint(ajoute(2))",
        options: [
          "[1] puis [2]",
          "[1] puis [1, 2]",
          "[1, 2] puis [1, 2]",
          "Une erreur au second appel",
        ],
        answer: 1,
        explain:
          "La valeur par défaut [] est créée UNE SEULE FOIS, au moment où Python lit la définition de la fonction — pas à chaque appel. Elle est donc partagée entre tous les appels et s'accumule. C'est le piège du défaut mutable. La bonne pratique : def ajoute(x, liste=None), puis if liste is None: liste = [].",
      },
      {
        q: "Que vaut [10, 20, 30, 40, 50][1:4] ?",
        options: ["[10, 20, 30]", "[20, 30, 40]", "[20, 30, 40, 50]", "[10, 20, 30, 40]"],
        answer: 1,
        explain:
          "Le slicing [debut:fin] inclut l'indice de début et EXCLUT celui de fin. Indices 1, 2 et 3 → [20, 30, 40]. Cette convention « borne de fin exclue » est la même que pour range() : une fois qu'on l'a intégrée une bonne fois, elle est cohérente partout en Python.",
      },
      {
        q: "Tu dois vérifier des millions de fois si un élément appartient à une collection de 100 000 éléments. Quelle structure choisir ?",
        options: [
          "Une liste — c'est la structure la plus polyvalente",
          "Un set — le test d'appartenance y est quasi instantané",
          "Un tuple — l'immuabilité accélère la recherche",
          "Peu importe, les performances sont identiques",
        ],
        answer: 1,
        explain:
          "Dans une liste, `x in ma_liste` parcourt les éléments un par un : le coût grandit avec la taille. Dans un set (ou un dict), la recherche passe par une table de hachage, donc le coût est quasi constant quelle que soit la taille. C'est souvent la différence entre un script qui tourne en 2 secondes et un qui tourne en 20 minutes.",
      },
      {
        q: "Soit M une matrice de forme (100, 5). Que fait M - M.mean(axis=0) ?",
        options: [
          "Elle centre chaque ligne sur sa propre moyenne",
          "Elle centre chaque colonne sur sa propre moyenne",
          "Elle soustrait la moyenne globale de tous les éléments",
          "Elle provoque une erreur : les formes sont incompatibles",
        ],
        answer: 1,
        explain:
          "axis=0 réduit EN DESCENDANT les lignes, et produit donc un résultat par colonne : ici un vecteur de 5 moyennes. Le broadcasting l'étire ensuite sur les 100 lignes. À retenir : axis=0 → un résultat par colonne, axis=1 → un résultat par ligne. C'est l'erreur numéro un en NumPy.",
      },
      {
        q: "La colonne `statut` contient 'livrée' ou 'annulée'. Quel code donne le pourcentage d'annulations ?",
        options: [
          "df['statut'].count() / len(df)",
          "(df['statut'] == 'annulée').mean()",
          "df['statut'].sum() / len(df)",
          "df.groupby('statut').size()",
        ],
        answer: 1,
        explain:
          "(df['statut'] == 'annulée') produit une colonne de booléens, que Pandas traite comme des 1 et des 0. Sa moyenne est donc directement la proportion de True. Ce réflexe — transformer une condition en 0/1 pour que mean() donne une proportion — revient en permanence en ML.",
      },
      {
        q: "Ton code plante avec KeyError: 'prix' sur la ligne df['prix']. Quelle est la première chose à vérifier ?",
        options: [
          "Que le fichier CSV n'est pas corrompu",
          "Le contenu exact de df.columns — nom mal orthographié, majuscule ou espace parasite",
          "Que Pandas est à jour",
          "Que la colonne ne contient pas de valeurs manquantes",
        ],
        answer: 1,
        explain:
          "Un KeyError signifie que Pandas ne trouve pas ce nom de colonne. Dans l'immense majorité des cas c'est un espace en fin de nom ('prix '), une majuscule ('Prix') ou un accent. Le réflexe : afficher df.columns.tolist() pour voir les noms RÉELS. Savoir lire un message d'erreur et savoir où regarder en premier vaut plus que connaître dix méthodes par cœur.",
      },
    ],
  },

  // ══ SETUP PRO & OUTILS DU DÉVELOPPEUR ═════════════════════════════════════
  "setup-pro": {
    lessons: {
      "setup-1": [
        {
          id: "setup-1-a",
          kind: "application",
          title: "Créer une arborescence de projet au terminal",
          statement: `Sans quitter le terminal et sans ouvrir l'explorateur de fichiers, place-toi dans ton dossier Documents et crée cette arborescence :

\`\`\`
projet/
├── src/
├── data/
└── notebooks/
\`\`\`

Puis crée un \`README.md\` vide dans **chacun** des trois sous-dossiers, et vérifie le résultat avec \`ls -R projet\`.`,
          hint: `\`mkdir -p projet/src\` crée les dossiers parents manquants d'un coup. Pour créer un fichier vide : \`touch chemin/README.md\` en bash. Et \`mkdir\` accepte plusieurs dossiers à la suite dans la même commande.`,
          solution: `\`\`\`bash
cd ~/Documents
mkdir -p projet/src projet/data projet/notebooks
touch projet/src/README.md projet/data/README.md projet/notebooks/README.md
ls -R projet
\`\`\`

**Trois commandes, pas dix.** Le réflexe à prendre, c'est le \`-p\` et l'énumération multiple : la plupart des commandes Unix acceptent plusieurs arguments, et créer les dossiers un par un révèle qu'on n'a pas encore ce réflexe.

Sur **PowerShell**, \`touch\` n'existe pas — utilise \`New-Item -ItemType File chemin\`. Et \`mkdir -p\` s'écrit \`New-Item -ItemType Directory -Force\`.

Pourquoi cette structure précisément : \`src/\` pour le code réutilisable, \`notebooks/\` pour l'exploration jetable, \`data/\` pour les données. La séparation code / exploration est ce qui permet plus tard de sortir un projet d'un notebook — c'est le sujet du module MLOps.`,
        },
        {
          id: "setup-1-b",
          kind: "blanche",
          title: "Inspecter un fichier de 2 millions de lignes",
          statement: `**Page blanche.**

On te livre \`ventes.csv\`, un fichier de 2 millions de lignes. L'ouvrir dans Excel plantera ta machine, et le charger dans Pandas prendrait plusieurs minutes pour rien.

**Sans Python et sans ouvrir le fichier**, réponds en ligne de commande :
1. combien pèse le fichier ?
2. quels sont les noms des colonnes ?
3. combien de lignes contient-il exactement ?
4. combien de lignes contiennent le mot \`erreur\` ?
5. à quoi ressemblent les 3 premières lignes de données ?

**Pourquoi ça compte** : c'est le premier geste sur toute nouvelle donnée. Regarder avant de charger t'évite de découvrir au bout de dix minutes que le fichier a un séparateur exotique ou un en-tête sur trois lignes.`,
          hint: `Cinq commandes, une par question : une pour la taille (\`du -h\` ou \`ls -lh\`), une pour la première ligne (\`head -1\`), une pour compter les lignes (\`wc -l\`), une pour chercher **en comptant** (\`grep -c\`), une pour un extrait (\`head\`).`,
          solution: `\`\`\`bash
du -h ventes.csv          # 1. taille du fichier
head -1 ventes.csv        # 2. l'en-tête, donc les colonnes
wc -l ventes.csv          # 3. nombre de lignes (en-tête compris !)
grep -c "erreur" ventes.csv   # 4. -c compte au lieu d'afficher
head -4 ventes.csv        # 5. en-tête + 3 lignes de données
\`\`\`

**Ce que l'exercice entraîne, c'est le réflexe de regarder avant de charger.** Ces cinq commandes prennent deux secondes sur un fichier que Pandas mettrait plusieurs minutes à lire.

Deux détails qui piègent souvent :

\`wc -l\` compte **toutes** les lignes, en-tête inclus — il y a donc 1 999 999 lignes de données, pas 2 000 000. Ce genre de décalage d'un cause de vrais bugs plus tard.

\`grep -c\` compte les **lignes** contenant le motif, pas les occurrences. Une ligne avec trois « erreur » compte pour 1.

Sur **PowerShell** : \`(Get-Item ventes.csv).Length\`, \`Get-Content ventes.csv -TotalCount 1\`, \`(Get-Content ventes.csv).Count\`, \`(Select-String "erreur" ventes.csv).Count\`.`,
        },
      ],
      "setup-2": [
        {
          id: "setup-2-a",
          kind: "application",
          title: "Ton premier dépôt propre",
          statement: `Crée un dépôt GitHub nommé \`codegraft-projects\`, clone-le en local, puis :

1. écris un \`README.md\` avec un titre et une présentation en 3 lignes
2. ajoute un \`.gitignore\` excluant \`.env\`, \`*.csv\`, \`__pycache__/\` et \`.venv/\`
3. fais **deux** commits séparés respectant les Conventional Commits
4. pousse sur GitHub et vérifie que le résultat s'affiche bien en ligne

Les deux commits doivent être séparés : un pour le README, un pour le .gitignore. Pas un seul commit fourre-tout.`,
          hint: `Conventional Commits : le préfixe décrit la nature du changement. \`docs:\` pour de la documentation, \`chore:\` pour de la configuration ou de l'outillage, \`feat:\` pour une fonctionnalité, \`fix:\` pour une correction.`,
          solution: `\`\`\`bash
git clone https://github.com/<toi>/codegraft-projects.git
cd codegraft-projects

# 1er commit : la documentation
echo "# CodeGraft Projects" > README.md
git add README.md
git commit -m "docs: add README with project overview"

# 2e commit : la configuration
printf ".env\\n*.csv\\n__pycache__/\\n.venv/\\n" > .gitignore
git add .gitignore
git commit -m "chore: ignore secrets, data and virtualenv"

git push origin main
\`\`\`

**Pourquoi deux commits et pas un** : un commit doit raconter **une** intention. Quand tu chercheras dans six mois « quand est-ce que j'ai ajouté le .gitignore ? », un historique de commits atomiques répond en une seconde. Un commit « update stuff » ne répond jamais à rien.

Le message n'est pas de la décoration : \`docs:\` et \`chore:\` permettent de filtrer l'historique (\`git log --oneline --grep="^feat"\`) et sont lus par les outils de génération de changelog.

Et le \`.gitignore\` **avant** le premier vrai fichier de code, jamais après. C'est le sujet de l'exercice suivant.`,
        },
        {
          id: "setup-2-b",
          kind: "blanche",
          title: "Tu viens de pousser ta clé API",
          statement: `**Page blanche.** Scénario réel, il arrivera un jour.

Tu fais \`git add .\`, \`git commit\`, \`git push\`. Trois secondes plus tard tu réalises que ton fichier \`.env\`, qui contient ta clé API Anthropic, est parti sur GitHub. Le dépôt est public.

Écris :
1. la suite de commandes Git pour retirer le fichier du suivi sans le supprimer de ton disque
2. ce que tu ajoutes pour que ça ne se reproduise plus
3. **et surtout** : la seule action réellement indispensable, qui n'est pas une commande Git

Ne cherche pas la commande magique. Réfléchis d'abord à ce qui s'est vraiment passé.`,
          hint: `Pour le point 3 : demande-toi ce que Git peut et ne peut pas défaire. Une fois qu'un secret a été poussé sur un serveur public, qu'est-ce qui a réellement changé dans le monde ?`,
          solution: `\`\`\`bash
# 1. Retirer du suivi Git, garder le fichier en local
git rm --cached .env

# 2. Empêcher la récidive
echo ".env" >> .gitignore
git add .gitignore
git commit -m "fix: stop tracking .env and ignore it"
git push origin main
\`\`\`

**3. Va révoquer la clé et en générer une nouvelle. Immédiatement.**

C'est le seul point qui compte vraiment, et c'est celui que tout le monde oublie.

\`git rm --cached\` retire le fichier des **prochains** commits. Il ne l'efface pas de l'historique : n'importe qui peut faire \`git log -p\` et retrouver ta clé dans le commit précédent. Elle est aussi passée par les serveurs de GitHub, potentiellement dans des caches, des forks, et les robots qui scannent les dépôts publics en continu la trouvent souvent en moins d'une minute.

Réécrire l'historique (\`git filter-repo\`, BFG) est possible mais ne change rien au fond : **le secret a été publié, donc il est compromis.** La seule réponse correcte à un secret exposé est de le remplacer.

\`git rm --cached\` (et pas \`git rm\` tout court) : sans \`--cached\`, tu supprimes aussi le fichier de ton disque et tu perds ta configuration locale.

La vraie leçon : le \`.gitignore\` se crée **au premier commit du projet**, avant qu'il y ait quoi que ce soit à protéger.`,
        },
      ],
      "setup-3": [
        {
          id: "setup-3-a",
          kind: "application",
          title: "Un environnement reproductible",
          statement: `Crée un projet structuré et son environnement isolé :

1. le dossier \`labo/\` avec \`src/\`, \`tests/\`, \`data_sample/\`
2. un venv, **activé** (ton prompt doit afficher \`(.venv)\`)
3. \`pandas\` et \`pytest\` installés
4. un fichier \`src/utils.py\` contenant une fonction \`moyenne(nombres)\`
5. un \`requirements.txt\` figé

Vérifie ensuite que \`python -c "import pandas; print(pandas.__version__)"\` fonctionne — et qu'il **échoue** une fois le venv désactivé (sauf si pandas est aussi installé globalement).`,
          hint: `L'activation dépend de ton terminal : \`source .venv/bin/activate\` en bash/zsh, \`.venv\\Scripts\\Activate.ps1\` en PowerShell, \`source .venv/Scripts/activate\` en Git Bash. Pour figer les versions : \`pip freeze > requirements.txt\`.`,
          solution: `\`\`\`bash
mkdir -p labo/src labo/tests labo/data_sample
cd labo

python -m venv .venv
source .venv/bin/activate        # bash / Git Bash
# .venv\\Scripts\\Activate.ps1    # PowerShell

pip install pandas pytest
pip freeze > requirements.txt

cat > src/utils.py <<'EOF'
def moyenne(nombres):
    if not nombres:
        return 0
    return sum(nombres) / len(nombres)
EOF

python -c "import pandas; print(pandas.__version__)"
\`\`\`

**Ce qui compte ici, c'est \`pip freeze\`.** \`pip install pandas\` installe *une* version ; \`requirements.txt\` note *laquelle*. Sans ce fichier, ton projet marche chez toi et casse chez le suivant — ou chez toi dans six mois. C'est la définition même de « reproductible ».

Le test après \`deactivate\` n'est pas un détail : il te prouve visuellement que l'isolation existe. Beaucoup de débutants créent un venv sans jamais vérifier qu'il sert à quelque chose, et installent en réalité tout en global.

Le piège le plus courant : oublier d'activer le venv, faire \`pip install\`, et polluer son Python système. Le \`(.venv)\` dans le prompt est là pour ça — prends l'habitude de le regarder avant chaque \`pip install\`.`,
        },
        {
          id: "setup-3-b",
          kind: "blanche",
          title: "Le projet du collègue ne démarre pas",
          statement: `**Page blanche.** Diagnostic, pas code.

Un collègue t'envoie son projet. Tu lances \`python src/train.py\` et tu obtiens :

\`\`\`
ModuleNotFoundError: No module named 'pandas'
\`\`\`

Écris la **liste ordonnée** des vérifications que tu fais, de la plus probable à la moins probable, avec la commande associée à chacune. Puis indique quel fichier tu vérifies dans le projet, et ce que tu fais s'il manque.

**Le vrai exercice** : c'est l'ordre. Diagnostiquer, c'est éliminer les causes de la plus fréquente à la plus rare — pas essayer des choses au hasard.`,
          hint: `Commence par la question la plus bête et la plus fréquente : est-ce que le bon Python est en train de s'exécuter ? \`which python\` (ou \`Get-Command python\`) te dit lequel. Puis : est-ce que ce Python a le paquet ? Puis : le projet dit-il quelque part de quoi il a besoin ?`,
          solution: `**1. Le venv est-il activé ?** — la cause dans 8 cas sur 10.
\`\`\`bash
which python          # doit pointer vers .../.venv/bin/python
\`\`\`
Si ça pointe vers le Python système, c'est réglé : \`source .venv/bin/activate\`.

**2. Le venv existe-t-il seulement ?**
\`\`\`bash
ls -la | grep venv
\`\`\`
Le \`.venv\` est dans le \`.gitignore\` — il n'est donc **jamais** transmis avec le projet. C'est normal et voulu : il faut le recréer.

**3. Le paquet est-il installé dans CE Python ?**
\`\`\`bash
pip list | grep pandas
python -m pip list      # version fiable : le pip du Python courant
\`\`\`

**4. Le projet déclare-t-il ses dépendances ?**
\`\`\`bash
cat requirements.txt
\`\`\`
S'il existe : \`pip install -r requirements.txt\` et c'est fini.
**S'il n'existe pas, le problème n'est pas chez toi — il est chez ton collègue.** Un projet sans \`requirements.txt\` (ou équivalent) n'est pas reproductible, et la vraie correction est de lui en faire ajouter un.

---

**Ce que l'exercice entraîne, c'est l'ordre du diagnostic.** Un débutant devant cette erreur fait \`pip install pandas\` — ce qui « marche » parfois, en installant le paquet au mauvais endroit, et crée un problème plus difficile la semaine suivante.

Le principe est général : avant de corriger, comprends **quel** programme s'exécute avec **quel** environnement. \`which python\` est la commande de diagnostic la plus rentable de ta carrière.`,
        },
      ],
    },
    finalExercise: {
      title: "Mise en place d'un dépôt professionnel",
      duration: "2 à 3 h",
      covers: ["setup-1", "setup-2", "setup-3"],
      brief: `Crée de zéro un dépôt GitHub qui pourrait être montré à un recruteur : structure claire, environnement reproductible, historique propre.

Cet exercice **rassemble les 3 leçons du module** — terminal (leçon 1), Git et GitHub (leçon 2), venv et dépendances (leçon 3). Ce n'est pas un exercice jetable : ce dépôt est celui dans lequel tu déposeras les projets de tout le parcours.

Fais-le entièrement au terminal. Chaque fois que tu es tenté d'ouvrir l'explorateur de fichiers, c'est le signe d'un geste que tu ne maîtrises pas encore.`,
      steps: [
        "**Structure** — crée un dépôt `codegraft-labs` avec `src/`, `notebooks/`, `data_sample/`, `tests/`. Entièrement en ligne de commande. (leçon 1)",
        "**Protection des secrets** — ajoute un `.gitignore` excluant `.venv`, `*.csv`, `__pycache__` et `.env`. Fais-le **avant** le premier fichier de code, pas après. (leçon 2)",
        "**README** — titre, description, une section Installation et une section Usage. Écris-le en te demandant : « quelqu'un qui découvre ce dépôt peut-il le faire tourner sans me poser de question ? » (leçon 2)",
        "**Environnement reproductible** — crée un venv, installe `pandas` et `pytest`, fige `requirements.txt`. Vérifie que la reconstruction fonctionne : supprime le venv, recrée-le depuis le `requirements.txt`, relance. (leçon 3)",
        "**Historique** — produis au moins 5 commits en Conventional Commits (`feat:`, `docs:`, `chore:`). Un commit = une intention. Relis ton `git log --oneline` : il doit se lire comme un récit. (leçon 2)",
        "**Branche** — crée une branche `feature/structure`, travaille dessus, fusionne-la dans `main`. Le but est le geste, pas la complexité. (leçon 2)",
      ],
      checklist: [
        "Tout a été fait au terminal, sans explorateur de fichiers",
        "Le .gitignore existait avant mon premier fichier de code",
        "J'ai supprimé mon venv et l'ai reconstruit depuis requirements.txt : ça marche",
        "Mon git log --oneline se lit comme un récit, pas comme une liste de « update »",
        "Aucun secret, aucun CSV, aucun __pycache__ dans le dépôt (vérifié sur GitHub)",
        "Un inconnu pourrait installer et lancer le projet avec le seul README",
      ],
      selfCheck: `Le vrai test : **clone ton propre dépôt dans un dossier vide, comme si tu ne l'avais jamais vu**, et suis uniquement ton README.

Si tu dois te souvenir d'une étape qui n'y est pas écrite, ton README est incomplet — et c'est exactement ce qu'un recruteur ou un collègue vivrait.`,
    },
    quizExtra: [
      {
        q: "Tu viens de pousser un fichier .env contenant ta clé API sur un dépôt public. Que fais-tu en priorité absolue ?",
        options: [
          "git rm --cached .env puis un nouveau commit",
          "Révoquer la clé et en générer une nouvelle",
          "Réécrire l'historique avec git filter-repo",
          "Passer le dépôt en privé",
        ],
        answer: 1,
        explain:
          "Les trois autres actions sont utiles, mais aucune ne défait la publication. La clé est restée sur des serveurs publics, elle est dans l'historique Git, et des robots scannent GitHub en continu — souvent en moins d'une minute. Un secret publié est un secret compromis : la seule réponse correcte est de le remplacer. Le reste, c'est du nettoyage.",
      },
      {
        q: "Tu clones le projet d'un collègue et `python src/train.py` renvoie ModuleNotFoundError. Quelle est la cause la plus probable ?",
        options: [
          "Le fichier train.py est corrompu",
          "Le venv n'est pas activé (ou pas encore créé)",
          "Ta version de Python est trop ancienne",
          "Il manque un __init__.py",
        ],
        answer: 1,
        explain:
          "Le dossier .venv est dans le .gitignore, donc il n'est jamais transmis avec un projet — c'est voulu. Il faut le recréer localement puis installer depuis requirements.txt. Le réflexe de diagnostic : `which python` pour voir QUEL Python s'exécute, avant toute autre hypothèse.",
      },
      {
        q: "Que fait `wc -l data.csv` sur un fichier de 1000 lignes de données avec un en-tête ?",
        options: [
          "Il affiche 1000",
          "Il affiche 1001",
          "Il affiche la taille du fichier en octets",
          "Il affiche le nombre de colonnes",
        ],
        answer: 1,
        explain:
          "wc -l compte TOUTES les lignes du fichier, en-tête compris : 1001. Ce décalage d'un est une source classique d'écart entre le nombre de lignes annoncé et le nombre de lignes réellement chargées par Pandas (qui, lui, traite l'en-tête à part).",
      },
      {
        q: "À quoi sert `pip freeze > requirements.txt` ?",
        options: [
          "À installer les paquets listés dans le fichier",
          "À enregistrer les versions exactes installées, pour reproduire l'environnement ailleurs",
          "À mettre à jour tous les paquets",
          "À geler les paquets pour empêcher leur mise à jour",
        ],
        answer: 1,
        explain:
          "`pip install pandas` installe UNE version ; `pip freeze` note LAQUELLE. Sans ce fichier, le projet marche chez toi et casse ailleurs — ou chez toi dans six mois. C'est la différence entre « ça a marché une fois » et « c'est reproductible ». L'installation depuis le fichier, c'est `pip install -r requirements.txt`.",
      },
      {
        q: "Pourquoi séparer un changement en plusieurs commits plutôt qu'un seul commit « update » ?",
        options: [
          "Pour augmenter le nombre de contributions affichées sur GitHub",
          "Parce qu'un commit doit porter une seule intention, ce qui rend l'historique lisible et révocable",
          "Parce que Git limite la taille des commits",
          "Pour accélérer le push",
        ],
        answer: 1,
        explain:
          "Un historique de commits atomiques répond instantanément à « quand et pourquoi cette ligne a-t-elle changé ? », et permet de révoquer un changement précis sans toucher au reste. Un commit fourre-tout rend les deux impossibles. C'est aussi ce qui rend `git bisect` utilisable pour trouver l'origine d'un bug.",
      },
      {
        q: "Que fait `git rm --cached .env` exactement ?",
        options: [
          "Supprime le fichier du disque et du dépôt",
          "Retire le fichier du suivi Git mais le garde sur le disque",
          "Efface le fichier de tout l'historique Git",
          "Ajoute le fichier au .gitignore",
        ],
        answer: 1,
        explain:
          "Sans --cached, git rm supprime aussi le fichier de ton disque — et tu perds ta configuration locale. Avec --cached, Git cesse de le suivre à partir du prochain commit, mais le fichier reste chez toi. Attention : cela ne l'efface PAS de l'historique déjà poussé. Le contenu reste consultable via git log -p.",
      },
    ],
  },

  // ══ SQL & BASES DE DONNÉES ════════════════════════════════════════════════
  "sql-databases": {
    lessons: {
      "sql-1": [
        {
          id: "sql-1-a",
          kind: "application",
          title: "Agréger avec GROUP BY et HAVING",
          statement: `Soit une table \`employes(id, nom, age, departement, salaire, actif)\`.

Écris **une seule** requête qui retourne, pour chaque département comptant plus de 3 employés actifs :
- le nom du département
- le nombre d'employés
- le salaire moyen, arrondi à l'entier
- le salaire maximum

Le tout trié par salaire moyen décroissant.

**Le piège** : il y a deux filtres dans cet énoncé, et ils ne se placent pas au même endroit.`,
          hint: `« actifs » filtre des **lignes** — avant le regroupement. « plus de 3 employés » filtre des **groupes** — après le regroupement, donc sur le résultat d'un COUNT. SQL a une clause pour chacun.`,
          solution: `\`\`\`sql
SELECT
  departement,
  COUNT(*)             AS nb_employes,
  ROUND(AVG(salaire))  AS salaire_moyen,
  MAX(salaire)         AS salaire_max
FROM employes
WHERE actif = true            -- filtre de LIGNES, avant le GROUP BY
GROUP BY departement
HAVING COUNT(*) > 3           -- filtre de GROUPES, après le GROUP BY
ORDER BY salaire_moyen DESC;
\`\`\`

**WHERE avant, HAVING après.** C'est toute la question, et c'est l'erreur la plus fréquente en SQL débutant.

L'ordre d'exécution réel d'une requête n'est pas l'ordre d'écriture. SQL exécute : \`FROM\` → \`WHERE\` → \`GROUP BY\` → \`HAVING\` → \`SELECT\` → \`ORDER BY\`. C'est pour ça qu'on ne peut pas mettre \`COUNT(*)\` dans un \`WHERE\` : au moment où \`WHERE\` s'exécute, les groupes n'existent pas encore.

Et c'est aussi pour ça que \`ORDER BY salaire_moyen\` fonctionne alors que \`WHERE salaire_moyen > 1000\` échouerait : \`ORDER BY\` s'exécute **après** le \`SELECT\`, donc l'alias existe. Retenir cet ordre d'exécution résout à lui seul la moitié des erreurs SQL.`,
        },
        {
          id: "sql-1-b",
          kind: "blanche",
          title: "Traduire trois questions métier",
          statement: `**Page blanche.** On te donne les questions en français, pas la structure des requêtes.

Table \`commandes(id, client_id, produit, categorie, montant, statut, date_commande)\`.

Le directeur commercial te demande, par mail :
1. « Quel est notre chiffre d'affaires du mois dernier, hors commandes annulées ? »
2. « Quelles catégories ont un panier moyen supérieur à 100 € ? »
3. « Combien de commandes a-t-on eu chaque mois cette année, et pour quel montant ? »

Écris une requête par question.

**Méthode** : pour chacune, écris d'abord en commentaire SQL la phrase française, puis traduis-la morceau par morceau. « hors commandes annulées » est un \`WHERE\`. « par catégorie » est un \`GROUP BY\`. « supérieur à 100 » porte sur une moyenne, donc…`,
          hint: `Le vocabulaire métier se traduit mécaniquement : « hors / sauf / uniquement » → WHERE. « par X » → GROUP BY X. « dont la moyenne / le total dépasse » → HAVING. « chaque mois » → il faut extraire le mois d'une date : \`DATE_TRUNC('month', date_commande)\` en PostgreSQL.`,
          solution: `\`\`\`sql
-- 1. « CA du mois dernier, hors commandes annulées »
SELECT SUM(montant) AS chiffre_affaires
FROM commandes
WHERE statut <> 'annulee'
  AND date_commande >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  AND date_commande <  DATE_TRUNC('month', CURRENT_DATE);

-- 2. « Catégories dont le panier moyen dépasse 100 € »
SELECT categorie, ROUND(AVG(montant), 2) AS panier_moyen
FROM commandes
WHERE statut <> 'annulee'
GROUP BY categorie
HAVING AVG(montant) > 100
ORDER BY panier_moyen DESC;

-- 3. « Nombre et montant des commandes, par mois, cette année »
SELECT
  DATE_TRUNC('month', date_commande) AS mois,
  COUNT(*)     AS nb_commandes,
  SUM(montant) AS total
FROM commandes
WHERE date_commande >= DATE_TRUNC('year', CURRENT_DATE)
GROUP BY mois
ORDER BY mois;
\`\`\`

**L'exercice entraîne la traduction français → SQL**, pas la syntaxe. Le vocabulaire métier se convertit de façon presque mécanique une fois qu'on a la table de correspondance : « hors » → \`WHERE\`, « par » → \`GROUP BY\`, « dont la moyenne dépasse » → \`HAVING\`.

Deux points qui piègent :

**Les bornes de dates.** \`>= début du mois dernier\` ET \`< début de ce mois-ci\` — jamais \`BETWEEN\` avec une date de fin, qui inclut ou exclut le dernier jour selon la présence d'une heure. La forme « supérieur ou égal au début, strictement inférieur à la fin » est toujours correcte.

**Le filtre « hors annulées » revient en 1 et 2 mais pas en 3**, parce que la question 3 demande le volume total de commandes. Relire l'énoncé pour savoir *quel* filtre s'applique *où* fait partie du travail — c'est même l'essentiel du métier.`,
        },
      ],
      "sql-2": [
        {
          id: "sql-2-a",
          kind: "application",
          title: "Classer avec une fonction de fenêtrage",
          statement: `Table \`employes(nom, departement, salaire)\`.

Écris une requête qui affiche, pour chaque employé : son nom, son département, son salaire, **son rang salarial à l'intérieur de son département**, et le salaire moyen de son département.

Puis, en une seconde requête, ne garde que les **3 mieux payés de chaque département**.

**Ce que ça t'apprend** : une fonction de fenêtrage ajoute une colonne calculée sur un groupe **sans** réduire le nombre de lignes. C'est exactement ce qu'un \`GROUP BY\` ne sait pas faire.`,
          hint: `\`RANK() OVER (PARTITION BY departement ORDER BY salaire DESC)\`. Pour filtrer sur ce rang, tu ne peux pas le mettre dans un WHERE — la fonction de fenêtrage est calculée trop tard. Il faut d'abord la matérialiser, avec une CTE.`,
          solution: `\`\`\`sql
-- 1. Rang et moyenne, sans perdre une seule ligne
SELECT
  nom,
  departement,
  salaire,
  RANK()      OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang_dept,
  ROUND(AVG(salaire) OVER (PARTITION BY departement)) AS moy_dept
FROM employes;

-- 2. Top 3 par département : la CTE matérialise le rang, on filtre ensuite
WITH classes AS (
  SELECT
    nom, departement, salaire,
    RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang_dept
  FROM employes
)
SELECT * FROM classes
WHERE rang_dept <= 3
ORDER BY departement, rang_dept;
\`\`\`

**La différence fondamentale avec GROUP BY** : \`GROUP BY departement\` te rend **une** ligne par département. \`OVER (PARTITION BY departement)\` te rend **toutes** les lignes, avec en plus une colonne calculée sur le département. C'est pour ça qu'on peut afficher le salaire d'un employé **et** la moyenne de son service côte à côte — impossible avec un simple GROUP BY.

**Pourquoi la CTE est obligatoire pour le top 3** : les fonctions de fenêtrage sont évaluées après le \`WHERE\`. Écrire \`WHERE RANK() OVER (...) <= 3\` provoque une erreur. La CTE crée un résultat intermédiaire nommé, sur lequel le \`WHERE\` du dessus peut travailler.

Un détail qui compte en pratique : \`RANK()\` laisse des trous en cas d'égalité (1, 2, 2, 4) alors que \`DENSE_RANK()\` n'en laisse pas (1, 2, 2, 3), et \`ROW_NUMBER()\` force un ordre strict sans ex æquo. Le choix dépend de ce que « être 3e » doit vouloir dire dans ton contexte métier.`,
        },
        {
          id: "sql-2-b",
          kind: "blanche",
          title: "Les clients qui n'ont jamais commandé",
          statement: `**Page blanche.**

Deux tables : \`clients(id, nom, email, date_inscription)\` et \`commandes(id, client_id, montant, date_commande)\`.

Trouve :
1. les clients qui n'ont **jamais** passé de commande
2. les clients inactifs : inscrits il y a plus de 6 mois, dont la dernière commande date de plus de 90 jours

**Le piège du point 1** : un \`INNER JOIN\` ne peut pas répondre à cette question, par construction. Réfléchis à pourquoi avant de chercher la solution.`,
          hint: `Un INNER JOIN ne garde que les lignes qui ont une correspondance — donc il élimine précisément ceux que tu cherches. Le LEFT JOIN, lui, garde tout le monde et met NULL là où il n'y a pas de correspondance. Que peux-tu faire de ce NULL ?`,
          solution: `\`\`\`sql
-- 1. Anti-jointure : LEFT JOIN puis filtre sur le NULL
SELECT c.id, c.nom, c.email
FROM clients c
LEFT JOIN commandes o ON o.client_id = c.id
WHERE o.id IS NULL;

-- 2. Clients inactifs
WITH derniere_commande AS (
  SELECT client_id, MAX(date_commande) AS derniere
  FROM commandes
  GROUP BY client_id
)
SELECT c.id, c.nom, d.derniere
FROM clients c
JOIN derniere_commande d ON d.client_id = c.id
WHERE c.date_inscription < CURRENT_DATE - INTERVAL '6 months'
  AND d.derniere        < CURRENT_DATE - INTERVAL '90 days'
ORDER BY d.derniere;
\`\`\`

**Le motif du point 1 s'appelle une anti-jointure**, et c'est l'un des plus utiles de tout SQL. La logique : « garde tout le monde à gauche (LEFT JOIN), puis ne conserve que ceux pour qui la droite est vide (IS NULL) ».

Pourquoi l'\`INNER JOIN\` ne peut pas marcher : il ne retourne **que** les lignes appariées. Les clients sans commande n'ont, par définition, aucune ligne à apparier — ils disparaissent du résultat. Chercher les absents dans une liste dont on a retiré les absents ne peut pas fonctionner.

Deux détails qui comptent :

Le filtre \`IS NULL\` doit porter sur une colonne de la table de **droite** qui ne peut jamais être nulle autrement — ici \`o.id\`, une clé primaire. Filtrer sur \`o.montant IS NULL\` attraperait aussi les vraies commandes à montant nul.

Le \`IS NULL\` doit être dans le \`WHERE\`, pas dans le \`ON\`. Dans le \`ON\`, il ferait partie de la condition de jointure et ne filtrerait rien du tout. C'est une erreur classique et silencieuse : la requête tourne et retourne un résultat faux.`,
        },
      ],
      "sql-3": [
        {
          id: "sql-3-a",
          kind: "application",
          title: "Une table de prédictions, lue depuis Python",
          statement: `Crée une base PostgreSQL locale \`ml_lab\`, puis :

1. crée la table \`predictions(id, model_name, input_data JSONB, prediction FLOAT, confidence FLOAT, created_at)\` avec une contrainte garantissant que \`confidence\` reste entre 0 et 1
2. ajoute un index sur \`model_name\`
3. insère 100 prédictions fictives depuis Python
4. relis-les dans un DataFrame avec \`pd.read_sql\`, filtrées sur \`confidence > 0.9\``,
          hint: `Pour la contrainte : \`CHECK (confidence BETWEEN 0 AND 1)\` directement dans le \`CREATE TABLE\`. Côté Python, \`psycopg2.connect(...)\` puis \`pd.read_sql(requete, conn)\`. Pour insérer 100 lignes, une boucle avec \`cur.execute\` suffit — pense au \`conn.commit()\`.`,
          solution: `\`\`\`sql
CREATE TABLE predictions (
  id         SERIAL PRIMARY KEY,
  model_name VARCHAR(100) NOT NULL,
  input_data JSONB,
  prediction FLOAT,
  confidence FLOAT CHECK (confidence BETWEEN 0 AND 1),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_predictions_model ON predictions(model_name);
\`\`\`

\`\`\`python
import json, random
import psycopg2
import pandas as pd

conn = psycopg2.connect("dbname=ml_lab")
cur = conn.cursor()

for _ in range(100):
    cur.execute(
        "INSERT INTO predictions (model_name, input_data, prediction, confidence) "
        "VALUES (%s, %s, %s, %s)",
        ("baseline_v1", json.dumps({"age": random.randint(18, 80)}),
         random.random(), round(random.uniform(0.5, 1.0), 3)),
    )
conn.commit()          # sans ça, rien n'est réellement écrit

df = pd.read_sql("SELECT * FROM predictions WHERE confidence > 0.9", conn)
print(df.head(), len(df))
conn.close()
\`\`\`

**Trois choses à retenir** :

**Le \`CHECK\` déplace la règle métier dans la base.** Une confiance de 1,4 n'a aucun sens : plutôt que d'espérer que tout le code applicatif y pense, la base refuse l'insertion. Une contrainte vaut mieux que dix vérifications éparpillées.

**Le \`conn.commit()\`** est l'oubli numéro un avec psycopg2. Sans lui, la transaction n'est jamais validée : ton script s'exécute sans erreur, et la table reste vide.

**Les \`%s\` sont des paramètres, pas du formatage de chaîne.** Ne construis jamais une requête avec une f-string ou une concaténation : c'est la porte ouverte à l'injection SQL. Le pilote se charge de l'échappement, et c'est aussi plus rapide.`,
        },
        {
          id: "sql-3-b",
          kind: "blanche",
          title: "La requête qui prend 8 secondes",
          statement: `**Page blanche.** Diagnostic de performance.

Ton API de prédiction est devenue lente. Cette requête, appelée à chaque appel, met 8 secondes sur une table de 2 millions de lignes :

\`\`\`sql
SELECT * FROM predictions
WHERE model_name = 'baseline_v1'
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 20;
\`\`\`

Décris ta démarche :
1. quelle commande te dit **pourquoi** c'est lent, avant de toucher à quoi que ce soit ?
2. qu'est-ce que tu cherches précisément dans sa sortie ?
3. quelle modification proposes-tu, et pourquoi celle-là ?
4. comment prouves-tu que ça a marché ?

**Ne propose pas d'index au hasard.** Un index inutile coûte de l'espace disque et ralentit chaque écriture.`,
          hint: `PostgreSQL sait expliquer son propre plan d'exécution, et sait aussi le mesurer réellement. Dans la sortie, cherche le mot qui indique que la base a lu la table entière ligne par ligne — par opposition à celui qui indique qu'elle a utilisé un index.`,
          solution: `**1. Mesurer avant de modifier**
\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM predictions
WHERE model_name = 'baseline_v1'
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 20;
\`\`\`
\`EXPLAIN\` seul donne le plan prévu ; \`EXPLAIN ANALYZE\` **exécute** la requête et donne les temps réels. C'est la seconde qu'il faut.

**2. Ce qu'on cherche dans la sortie**

Un \`Seq Scan on predictions\` : PostgreSQL lit les 2 millions de lignes une par une. C'est le coupable. On regarde aussi le \`actual time\` de chaque nœud pour voir où part réellement le temps, et l'écart entre \`rows\` estimé et réel — un gros écart signale des statistiques périmées.

**3. La modification**
\`\`\`sql
CREATE INDEX idx_predictions_model_date
  ON predictions (model_name, created_at DESC);
\`\`\`
Un index **composite**, dans cet ordre précis : \`model_name\` d'abord parce qu'il filtre par égalité, \`created_at\` ensuite parce qu'il filtre par intervalle **et** sert le \`ORDER BY\`. Le \`DESC\` permet à la base de lire l'index dans le sens du tri demandé et de s'arrêter à 20 lignes, sans trier quoi que ce soit.

Deux index séparés seraient bien moins efficaces : PostgreSQL n'en utiliserait qu'un seul, et devrait filtrer le reste à la main.

**4. La preuve**

Relance le même \`EXPLAIN ANALYZE\`. Tu dois voir \`Index Scan\` au lieu de \`Seq Scan\`, et un temps qui passe de quelques secondes à quelques millisecondes. **Note les deux chiffres** : une optimisation sans mesure avant/après est une croyance, pas un résultat.

---

**Le principe général : mesurer, puis corriger, puis remesurer.** Ajouter des index « au cas où » est un anti-patron courant — chaque index ralentit les \`INSERT\` et les \`UPDATE\`, puisqu'il faut le maintenir à jour. On indexe ce qu'on a mesuré comme lent, pas ce qu'on imagine lent.`,
        },
      ],
    },
    finalExercise: {
      title: "Requêtes analytiques sur une base e-commerce",
      duration: "3 à 5 h",
      covers: ["sql-1", "sql-2", "sql-3"],
      brief: `Une base de commandes de 500 000 lignes. Réponds à des questions métier avec du SQL, puis optimise.

Cet exercice **rassemble les 3 leçons du module** — agrégations (leçon 1), jointures, CTE et fonctions de fenêtrage (leçon 2), PostgreSQL, index et connexion Python (leçon 3).

Les questions te sont données en français, comme un directeur commercial te les poserait. La traduction en SQL fait partie du travail — et c'est la partie qui compte.`,
      dataset: `Génère la base localement avec ce script, puis charge-la dans PostgreSQL :

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(7)

n = 500_000
clients = pd.DataFrame({
    "id": range(1, 20_001),
    "nom": [f"client_{i}" for i in range(1, 20_001)],
    "date_inscription": pd.to_datetime("2023-01-01") +
        pd.to_timedelta(rng.integers(0, 1000, 20_000), unit="D"),
})
commandes = pd.DataFrame({
    "id": range(1, n + 1),
    "client_id": rng.integers(1, 20_001, n),
    "categorie": rng.choice(["Mode", "Tech", "Maison", "Sport"], n),
    "montant": rng.gamma(3, 40, n).round(2),
    "statut": rng.choice(["livree", "annulee"], n, p=[.93, .07]),
    "date_commande": pd.to_datetime("2024-01-01") +
        pd.to_timedelta(rng.integers(0, 800, n), unit="D"),
})
clients.to_csv("clients.csv", index=False)
commandes.to_csv("commandes.csv", index=False)
\`\`\`

Charge-les ensuite avec \`COPY ... FROM\` (rapide) plutôt qu'avec 500 000 \`INSERT\`.`,
      steps: [
        "**Top 10 des clients** par chiffre d'affaires sur les 12 derniers mois, commandes annulées exclues. (leçon 1)",
        "**Taux de réachat mensuel** avec une fonction de fenêtrage : quelle part des clients d'un mois recommande le mois suivant ? (leçon 2)",
        "**Panier moyen par catégorie et par trimestre**, avec l'évolution en % d'un trimestre au suivant. `LAG()` est ton ami. (leçon 2)",
        "**Clients inactifs depuis 90 jours** — c'est une anti-jointure. Un INNER JOIN ne peut pas répondre à cette question. (leçon 2)",
        "**Optimisation** — prends ta requête la plus lente, lis son `EXPLAIN ANALYZE`, ajoute l'index qui corrige le problème, remesure. Note les deux temps. (leçon 3)",
        "**Interprétation** — sous chaque requête, écris en deux phrases ce que le résultat raconte, en français, sans jargon technique.",
      ],
      checklist: [
        "Chaque requête est précédée de la question métier écrite en français",
        "J'utilise des CTE et des alias : mes requêtes se lisent de haut en bas",
        "Mon anti-jointure passe par LEFT JOIN + IS NULL, pas par un INNER JOIN bricolé",
        "J'ai noté le temps AVANT et APRÈS l'ajout de l'index, chiffres à l'appui",
        "Je peux justifier l'ordre des colonnes dans mon index composite",
        "Chaque résultat est accompagné de son interprétation métier",
      ],
      selfCheck: `Le vrai test : **reprends la question 3 — panier moyen par catégorie et par trimestre avec évolution — et réécris-la de mémoire, éditeur vide.**

C'est celle qui combine le plus de choses : agrégation, regroupement sur deux niveaux, et fonction de fenêtrage pour comparer une ligne à la précédente. Si elle sort sans hésitation, le module est acquis.`,
    },
    quizExtra: [
      {
        q: "Pourquoi ne peut-on pas écrire `WHERE COUNT(*) > 3` ?",
        options: [
          "Parce que COUNT ne fonctionne qu'avec GROUP BY",
          "Parce que WHERE s'exécute avant le GROUP BY : au moment où il agit, les groupes n'existent pas encore",
          "Parce que la syntaxe correcte est WHERE COUNT() > 3, sans étoile",
          "Parce qu'il faut d'abord trier avec ORDER BY",
        ],
        answer: 1,
        explain:
          "L'ordre d'exécution réel est FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY, et il ne correspond pas à l'ordre d'écriture. WHERE filtre des lignes avant tout regroupement ; HAVING filtre des groupes après. Retenir cet ordre résout à lui seul une grande partie des erreurs SQL.",
      },
      {
        q: "Tu veux les clients qui n'ont JAMAIS passé de commande. Quelle approche fonctionne ?",
        options: [
          "INNER JOIN commandes ON ... WHERE commandes.id IS NULL",
          "LEFT JOIN commandes ON ... WHERE commandes.id IS NULL",
          "GROUP BY client_id HAVING COUNT(*) = 0",
          "SELECT ... FROM clients WHERE commandes IS NULL",
        ],
        answer: 1,
        explain:
          "C'est le motif de l'anti-jointure. L'INNER JOIN ne retourne que les lignes appariées — il élimine donc exactement ceux que tu cherches. Le LEFT JOIN garde tous les clients et met NULL côté commandes quand il n'y a aucune correspondance ; le WHERE ... IS NULL isole ces cas. Le HAVING COUNT(*) = 0 ne marche pas non plus : les groupes vides n'existent pas.",
      },
      {
        q: "Quelle est la différence entre GROUP BY departement et OVER (PARTITION BY departement) ?",
        options: [
          "Aucune, ce sont deux syntaxes équivalentes",
          "GROUP BY réduit à une ligne par groupe ; PARTITION BY garde toutes les lignes et ajoute une colonne calculée",
          "PARTITION BY est plus rapide",
          "GROUP BY fonctionne sur les nombres, PARTITION BY sur le texte",
        ],
        answer: 1,
        explain:
          "C'est la distinction centrale des fonctions de fenêtrage. GROUP BY agrège et fait disparaître le détail. PARTITION BY calcule sur le groupe SANS perdre les lignes — c'est ce qui permet d'afficher côte à côte le salaire d'un employé et la moyenne de son service, chose impossible avec un simple GROUP BY.",
      },
      {
        q: "Pourquoi faut-il une CTE pour filtrer sur le résultat d'un RANK() ?",
        options: [
          "Pour améliorer la lisibilité, mais ce n'est pas obligatoire",
          "Parce que les fonctions de fenêtrage sont évaluées après le WHERE : on ne peut pas filtrer dessus directement",
          "Parce que RANK() ne fonctionne que dans une CTE",
          "Parce que le WHERE n'accepte pas les nombres calculés",
        ],
        answer: 1,
        explain:
          "Écrire WHERE RANK() OVER (...) <= 3 provoque une erreur : au moment où le WHERE s'exécute, la fonction de fenêtrage n'a pas encore été calculée. La CTE matérialise un résultat intermédiaire nommé, sur lequel la requête englobante peut alors filtrer normalement. Une sous-requête ferait la même chose, en moins lisible.",
      },
      {
        q: "Ta requête met 8 secondes. Quelle est la première chose à faire ?",
        options: [
          "Ajouter un index sur toutes les colonnes du WHERE",
          "Lancer EXPLAIN ANALYZE pour voir le plan réel et localiser le vrai coût",
          "Réécrire la requête avec des CTE",
          "Augmenter la mémoire allouée à PostgreSQL",
        ],
        answer: 1,
        explain:
          "Mesurer avant de modifier. EXPLAIN ANALYZE exécute réellement la requête et montre où part le temps — typiquement un « Seq Scan » qui lit toute la table. Ajouter des index au jugé est un anti-patron : chaque index ralentit les INSERT et UPDATE, puisqu'il faut le maintenir. On indexe ce qu'on a mesuré, pas ce qu'on imagine.",
      },
      {
        q: "En Python avec psycopg2, pourquoi écrire cur.execute(\"INSERT ... VALUES (%s, %s)\", (a, b)) plutôt qu'une f-string ?",
        options: [
          "Parce que les f-strings ne fonctionnent pas avec psycopg2",
          "Parce que les paramètres sont échappés par le pilote, ce qui empêche l'injection SQL",
          "Parce que c'est plus lisible, mais les deux sont équivalents",
          "Parce que les f-strings ne supportent pas le type JSONB",
        ],
        answer: 1,
        explain:
          "Construire une requête par concaténation ou f-string permet à une valeur d'entrée de modifier la requête elle-même — c'est l'injection SQL, la faille la plus classique du web. Avec les paramètres %s, le pilote transmet la requête et les valeurs séparément : une valeur ne peut jamais devenir du code. C'est aussi plus rapide, la requête pouvant être préparée une fois.",
      },
    ],
  },

  // ══ MATHÉMATIQUES POUR LE ML ══════════════════════════════════════════════
  maths: {
    lessons: {
      "math-1": [
        {
          id: "math-1-a",
          kind: "application",
          title: "Produit scalaire et similarité cosinus à la main",
          statement: `Écris deux fonctions **sans utiliser \`np.dot\` ni \`np.linalg.norm\`** :

1. \`produit_scalaire(a, b)\` — la somme des produits terme à terme
2. \`similarite_cosinus(a, b)\` — le produit scalaire divisé par le produit des normes

Teste-les sur :
\`\`\`python
a = [1, 2, 3]
b = [2, 4, 6]     # b = 2a, donc similarité = 1.0
c = [-1, 0, 1]
\`\`\`

Vérifie ensuite que tes résultats correspondent à ceux de NumPy.`,
          hint: `La norme d'un vecteur, c'est la racine carrée de son produit scalaire avec lui-même : \`||a|| = sqrt(a · a)\`. Tu peux donc réutiliser ta première fonction pour écrire la seconde. \`zip(a, b)\` te donne les paires terme à terme.`,
          solution: `\`\`\`python
import math

def produit_scalaire(a, b):
    return sum(x * y for x, y in zip(a, b))

def norme(a):
    return math.sqrt(produit_scalaire(a, a))   # ||a|| = sqrt(a · a)

def similarite_cosinus(a, b):
    return produit_scalaire(a, b) / (norme(a) * norme(b))

a, b, c = [1, 2, 3], [2, 4, 6], [-1, 0, 1]
print(similarite_cosinus(a, b))   # 1.0  — même direction
print(similarite_cosinus(a, c))   # 0.46 — direction différente

import numpy as np
print(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))   # identique
\`\`\`

**Pourquoi la similarité de \`a\` et \`b\` vaut exactement 1** : \`b = 2a\`, donc les deux vecteurs pointent dans la **même direction**, seule leur longueur diffère. Le cosinus mesure l'angle, pas la taille — c'est précisément ce qui le rend utile.

C'est pour ça que la recherche sémantique utilise le cosinus et non la distance euclidienne : deux textes qui parlent de la même chose ont des embeddings de directions proches, même si l'un est beaucoup plus long que l'autre. La distance euclidienne, elle, les séparerait à cause de leur norme.

Et \`norme()\` réutilise \`produit_scalaire()\` : ce n'est pas une astuce, c'est la définition. \`||a||² = a · a\` est la même formule que le théorème de Pythagore, généralisée à n dimensions.`,
        },
        {
          id: "math-1-b",
          kind: "blanche",
          title: "Un moteur de recherche sémantique en 15 lignes",
          statement: `**Page blanche.**

Cinq documents ont été transformés en vecteurs de 4 dimensions (chaque dimension = l'importance d'un thème : sport, cuisine, technologie, voyage) :

\`\`\`python
import numpy as np
docs = {
    "Match de football hier soir":      np.array([0.9, 0.0, 0.1, 0.2]),
    "Recette de tiramisu facile":       np.array([0.0, 0.95, 0.0, 0.1]),
    "Le nouveau processeur M4":         np.array([0.1, 0.0, 0.9, 0.0]),
    "Week-end à Lisbonne":              np.array([0.1, 0.3, 0.0, 0.9]),
    "Application de suivi sportif":     np.array([0.6, 0.0, 0.7, 0.1]),
}
requete = np.array([0.8, 0.0, 0.5, 0.1])   # « tech pour le sport »
\`\`\`

Écris un programme qui affiche les documents **classés du plus pertinent au moins pertinent** pour cette requête, avec leur score.

Aucune méthode indiquée : à toi de décider quelle mesure utiliser et pourquoi.`,
          hint: `Tu cherches les documents qui pointent dans la **même direction** que la requête, pas ceux qui ont la même longueur. Une des deux mesures que tu as codées à l'exercice A fait exactement ça. Ensuite, il te faut trier un dictionnaire par valeur — \`sorted(..., key=..., reverse=True)\`.`,
          solution: `\`\`\`python
import numpy as np

def cosinus(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

scores = {titre: cosinus(vec, requete) for titre, vec in docs.items()}

for titre, score in sorted(scores.items(), key=lambda kv: kv[1], reverse=True):
    print(f"{score:.3f}  {titre}")
\`\`\`

\`\`\`
0.985  Application de suivi sportif
0.914  Match de football hier soir
0.560  Le nouveau processeur M4
0.180  Week-end à Lisbonne
0.089  Recette de tiramisu facile
\`\`\`

**C'est littéralement comme ça que fonctionne un moteur de recherche sémantique moderne** — et le tien tient en trois lignes. La seule différence avec un vrai système : les vecteurs y font 768 ou 1536 dimensions et sont produits par un modèle de langage, au lieu d'être écrits à la main. La mesure de similarité, elle, est exactement celle-ci.

**Pourquoi le cosinus et pas la distance euclidienne** : la requête est courte, certains documents sont longs, donc leurs vecteurs ont des normes très différentes. La distance euclidienne pénaliserait un document long et pertinent. Le cosinus ignore la longueur et ne regarde que la direction — le thème.

Deux détails :

\`a @ b\` est le produit matriciel de NumPy, qui pour deux vecteurs 1D donne le produit scalaire. Plus lisible que \`np.dot(a, b)\`.

Le tri par valeur d'un dictionnaire passe par \`.items()\` et une clé \`lambda kv: kv[1]\`. C'est un motif que tu réutiliseras constamment — c'est le même qu'à l'exercice « détecteur de doublons » du module Python.`,
        },
      ],
      "math-2": [
        {
          id: "math-2-a",
          kind: "application",
          title: "Calculer un gradient, faire un pas",
          statement: `Soit la fonction \`f(x, y) = x² + 3y²\`.

1. Écris à la main (sur papier) les deux dérivées partielles ∂f/∂x et ∂f/∂y
2. Code une fonction \`gradient(x, y)\` qui retourne le vecteur ∇f
3. Pars du point \`(3, 2)\` et effectue **un seul** pas de descente avec α = 0.1
4. Vérifie que \`f\` a bien diminué

Puis recommence avec α = 1.0. Que se passe-t-il, et pourquoi ?`,
          hint: `Pour dériver par rapport à x, traite y comme une constante — et inversement. La règle de mise à jour est \`θ ← θ - α ∇f(θ)\`, appliquée à chaque coordonnée séparément.`,
          solution: `\`\`\`python
import numpy as np

def f(x, y):
    return x**2 + 3*y**2

def gradient(x, y):
    return np.array([2*x, 6*y])      # ∂f/∂x = 2x   ∂f/∂y = 6y

point = np.array([3.0, 2.0])
print("Départ :", f(*point))                      # 21.0

# Un pas avec alpha = 0.1
alpha = 0.1
nouveau = point - alpha * gradient(*point)        # [2.4, 0.8]
print("alpha=0.1 :", f(*nouveau))                 # 7.68  -> ça descend

# Un pas avec alpha = 1.0
nouveau = point - 1.0 * gradient(*point)          # [-3.0, -10.0]
print("alpha=1.0 :", f(*nouveau))                 # 309.0 -> ça explose
\`\`\`

**Avec α = 1.0, on ne descend pas : on saute par-dessus le minimum et on atterrit plus haut qu'au départ.** Répété, ce mouvement diverge vers l'infini.

L'intuition géométrique : le gradient indique la direction de plus forte **montée** et une grandeur locale. On part dans la direction opposée — mais rien ne garantit que cette direction reste bonne sur une longue distance. α contrôle la longueur du pas ; trop long, on dépasse.

**Remarque le facteur 6 sur y.** La fonction est trois fois plus « raide » selon y que selon x. Un α unique doit donc convenir aux deux directions à la fois : celui qui va bien pour x est trop grand pour y. C'est exactement le problème que résolvent les optimiseurs adaptatifs comme Adam, qui ajustent un pas différent par paramètre.

C'est aussi pourquoi on **normalise les features** avant d'entraîner un modèle : des variables d'échelles très différentes créent une surface d'erreur allongée où aucun α ne convient à tout le monde.`,
        },
        {
          id: "math-2-b",
          kind: "blanche",
          title: "Trouver le minimum sans connaître la réponse",
          statement: `**Page blanche.**

Soit \`f(x) = (x - 3)² + 2\`. Tu sais que son minimum est en x = 3, mais l'algorithme, lui, ne le sait pas.

Écris un programme qui :
1. part de \`x = 10\`
2. descend le gradient pendant 50 itérations
3. **enregistre** la valeur de f à chaque itération
4. trace les courbes pour trois taux d'apprentissage : \`0.01\`, \`0.1\` et \`1.1\`
5. affiche, pour chacun, le x final atteint

Puis écris en deux phrases ce que les trois courbes racontent.

**Ce que l'exercice entraîne** : voir de tes yeux ce que « le taux d'apprentissage est un hyperparamètre critique » veut dire. Une phrase de cours devient un graphique.`,
          hint: `La dérivée de \`(x-3)² + 2\` est \`2(x-3)\`. Structure ton code en une fonction \`descente(alpha, n_iter)\` qui retourne la liste des valeurs de f — tu l'appelleras trois fois. Pour tracer : \`plt.plot(historique, label=f"alpha={alpha}")\` puis \`plt.yscale("log")\`, sinon la courbe divergente écrase les deux autres.`,
          solution: `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def f(x):      return (x - 3)**2 + 2
def df(x):     return 2 * (x - 3)

def descente(alpha, n_iter=50, x0=10.0):
    x, historique = x0, []
    for _ in range(n_iter):
        historique.append(f(x))
        x = x - alpha * df(x)
    return x, historique

plt.figure(figsize=(9, 4))
for alpha in [0.01, 0.1, 1.1]:
    x_final, hist = descente(alpha)
    plt.plot(hist, label=f"alpha={alpha}  (x final = {x_final:.2f})")
    print(f"alpha={alpha:<5} -> x = {x_final:.4f}")

plt.yscale("log")            # sinon la divergence écrase tout
plt.xlabel("itération"); plt.ylabel("f(x)"); plt.legend()
plt.title("Effet du taux d'apprentissage")
plt.show()
\`\`\`

\`\`\`
alpha=0.01  -> x = 5.5648     trop lent : pas arrivé en 50 itérations
alpha=0.1   -> x = 3.0000     convergence propre
alpha=1.1   -> x = 6.7e+03    divergence
\`\`\`

**Les trois régimes, en un graphique** : \`0.01\` descend mais n'a pas fini, \`0.1\` atteint le minimum et s'y stabilise, \`1.1\` oscille en s'éloignant de plus en plus.

**Le seuil de divergence n'est pas mystérieux** : pour cette fonction, la descente diverge dès que α > 1. Chaque pas multiplie l'écart au minimum par \`|1 - 2α|\` ; tant que ce facteur est inférieur à 1, on se rapproche. À α = 1.1 il vaut 1,2, donc l'écart grandit de 20 % à chaque itération.

Deux réflexes de méthode à retenir :

**Enregistrer l'historique plutôt que d'afficher au fil de l'eau.** Une liste de valeurs permet de tracer, de comparer, de mesurer. C'est exactement ce que fait la « courbe de perte » que tu regarderas pendant tout l'entraînement d'un réseau de neurones.

**L'échelle logarithmique.** Sans \`yscale("log")\`, la courbe qui monte à 10⁶ écrase visuellement les deux autres et le graphique ne montre rien. Choisir la bonne échelle fait partie du travail de lecture.`,
        },
      ],
      "math-3": [
        {
          id: "math-3-a",
          kind: "application",
          title: "Le test médical de Bayes",
          statement: `Une maladie touche **1 personne sur 1000**. Un test de dépistage a les caractéristiques suivantes :
- s'il y a la maladie, il est positif dans **99 %** des cas (sensibilité)
- s'il n'y a pas la maladie, il est négatif dans **95 %** des cas (spécificité)

Tu es testé positif.

1. Avant de calculer : estime intuitivement ta probabilité d'être malade
2. Calcule-la avec le théorème de Bayes, en Python
3. Compare avec ton intuition

\`\`\`
P(M|+) = P(+|M) · P(M) / P(+)
\`\`\``,
          hint: `Le dénominateur \`P(+)\` est la probabilité totale d'être positif, quelle que soit la raison : les vrais positifs **plus** les faux positifs. \`P(+) = P(+|M)·P(M) + P(+|non M)·P(non M)\`. Le second terme est celui qu'on oublie, et c'est celui qui domine.`,
          solution: `\`\`\`python
p_malade      = 0.001      # prévalence
p_pos_malade  = 0.99       # sensibilité
p_pos_sain    = 0.05       # 1 - spécificité = faux positifs

p_positif = p_pos_malade * p_malade + p_pos_sain * (1 - p_malade)
p_malade_si_positif = p_pos_malade * p_malade / p_positif

print(f"P(malade | test positif) = {p_malade_si_positif:.1%}")   # 1.9 %
\`\`\`

**1,9 %.** La plupart des gens — y compris beaucoup de médecins, c'est documenté — répondent spontanément « autour de 95 % ».

**Pourquoi l'intuition se trompe autant** : sur 100 000 personnes testées, 100 sont malades (dont 99 détectées), mais 99 900 sont saines — et 5 % d'entre elles, soit 4 995 personnes, sont positives à tort. Il y a donc **50 fois plus de faux positifs que de vrais positifs**.

Le taux de faux positifs semble faible (5 %), mais il s'applique à un groupe énorme, tandis que la sensibilité s'applique à un groupe minuscule. **C'est la rareté de la maladie qui écrase tout**, et c'est exactement l'information que l'intuition ignore.

**Ce que ça change en ML** : c'est le même phénomène pour toute classification déséquilibrée — détection de fraude, maintenance prédictive, diagnostic. Un modèle à 99 % de rappel sur une classe qui représente 0,2 % des données produira massivement de fausses alertes. C'est pour ça que l'accuracy ne veut rien dire sur données déséquilibrées, et que l'on regarde la précision et le rappel séparément.`,
        },
        {
          id: "math-3-b",
          kind: "blanche",
          title: "Vérifier Bayes par simulation",
          statement: `**Page blanche.**

Tu viens de calculer que P(malade | positif) ≈ 1,9 %. Ne me crois pas sur parole : **prouve-le par simulation.**

Écris un programme qui :
1. simule une population d'un million de personnes
2. attribue la maladie à chacune selon la prévalence de 1/1000
3. simule le résultat du test pour chacune, selon qu'elle est malade ou non
4. ne garde que les personnes testées positives
5. calcule quelle proportion d'entre elles est réellement malade

Aucune formule à utiliser. **Tu dois retrouver le résultat de Bayes sans jamais écrire le théorème de Bayes.**

**Pourquoi c'est utile** : quand une formule probabiliste te semble contre-intuitive, la simulation tranche. C'est une compétence de vérification qui te servira toute ta carrière.`,
          hint: `\`rng.random(n) < p\` te donne un tableau de booléens vrais avec probabilité p — c'est ta brique de base. La probabilité d'être positif n'est pas la même pour les malades et les sains : \`np.where(malade, 0.99, 0.05)\` construit le tableau des probabilités individuelles.`,
          solution: `\`\`\`python
import numpy as np
rng = np.random.default_rng(42)

n = 1_000_000

# 1-2. Qui est malade ?
malade = rng.random(n) < 0.001

# 3. Probabilité d'être positif, différente selon le statut réel
p_positif = np.where(malade, 0.99, 0.05)
positif = rng.random(n) < p_positif

# 4-5. Parmi les positifs, quelle proportion est malade ?
print(f"Testés positifs : {positif.sum():,}")
print(f"Dont réellement malades : {malade[positif].sum():,}")
print(f"P(malade | positif) = {malade[positif].mean():.2%}")
\`\`\`

\`\`\`
Testés positifs : 50 926
Dont réellement malades : 993
P(malade | positif) = 1.95 %
\`\`\`

**1,95 % contre 1,9 % par le calcul.** L'écart vient uniquement du hasard de la simulation ; avec 10 millions de personnes il se réduit encore. Bayes est confirmé sans qu'on ait écrit sa formule.

**Le geste central, c'est \`malade[positif]\`** — l'indexation booléenne. On filtre le tableau « qui est malade » par le tableau « qui est positif », ce qui donne le statut réel des seules personnes positives. Puis \`.mean()\` d'un tableau de booléens donne directement une proportion — la même astuce que dans le module Python, réapparue dans un contexte totalement différent.

**\`np.where(malade, 0.99, 0.05)\`** construit un tableau où chaque personne a *sa* probabilité de test positif selon son statut. C'est ce qui permet de tout vectoriser : pas une seule boucle sur un million de personnes.

**Et la méthode elle-même vaut plus que le résultat.** Simuler pour vérifier une formule est un réflexe rare et précieux. Il te dira aussi quand une formule que tu as *mal appliquée* donne un résultat faux — la simulation, elle, ne se trompe pas de formule.`,
        },
      ],
      "math-4": [
        {
          id: "math-4-a",
          kind: "application",
          title: "Reconstruire une matrice avec k composantes",
          statement: `Soit :

\`\`\`python
import numpy as np
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12]], dtype=float)
\`\`\`

1. Calcule sa SVD et affiche les valeurs singulières
2. Quel est le rang de A ? Déduis-le des valeurs singulières, pas de \`np.linalg.matrix_rank\`
3. Reconstruis A avec k = 1, puis k = 2, et mesure l'erreur de reconstruction à chaque fois
4. Explique pourquoi l'erreur devient quasi nulle à k = 2`,
          hint: `Le rang, c'est le nombre de valeurs singulières non nulles — en pratique, celles au-dessus d'un petit seuil comme \`1e-10\`, à cause des arrondis machine. Pour reconstruire avec k composantes : \`U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]\`.`,
          solution: `\`\`\`python
import numpy as np

A = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], dtype=float)
U, sigma, Vt = np.linalg.svd(A, full_matrices=False)

print("Valeurs singulières :", sigma.round(4))
# [25.4624  1.2907  0.    ]

print("Rang :", np.sum(sigma > 1e-10))       # 2

for k in [1, 2, 3]:
    A_k = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]
    erreur = np.linalg.norm(A - A_k)
    print(f"k={k} -> erreur = {erreur:.6f}")
# k=1 -> 1.290700
# k=2 -> 0.000000
# k=3 -> 0.000000
\`\`\`

**La troisième valeur singulière est nulle, donc le rang vaut 2** — la matrice n'a que 2 directions d'information réelles, alors qu'elle a 3 colonnes. La troisième colonne est une combinaison linéaire des deux premières (ici, les lignes sont en progression arithmétique).

C'est ça, l'information que donne la SVD : **combien de dimensions portent réellement de l'information**, par opposition au nombre de colonnes affichées.

**L'erreur à k=1 vaut exactement 1,2907 — la deuxième valeur singulière.** Ce n'est pas une coïncidence : le théorème d'Eckart-Young dit que la troncature de la SVD est la *meilleure* approximation de rang k possible, et que l'erreur commise est exactement la norme des valeurs singulières abandonnées.

Autrement dit, garder les k plus grandes valeurs singulières n'est pas une heuristique raisonnable : c'est **prouvé optimal**. C'est ce qui fait de la SVD le fondement de la PCA, de la compression et des systèmes de recommandation.

Note \`full_matrices=False\` : sans lui, U serait de taille 4×4 au lieu de 4×3, et le produit de reconstruction ne serait plus aligné.`,
        },
        {
          id: "math-4-b",
          kind: "blanche",
          title: "Combien de composantes pour une image lisible ?",
          statement: `**Page blanche.**

Prends une photo, convertis-la en niveaux de gris, et réponds à cette question par une expérience :

> **Quel est le plus petit k qui donne encore une image reconnaissable, et combien de données économise-t-on à ce k ?**

Ton programme doit :
1. charger l'image et calculer sa SVD
2. la reconstruire pour plusieurs valeurs de k et les afficher côte à côte
3. tracer la courbe de l'**énergie cumulée** : quelle part de l'information est portée par les k premières composantes
4. calculer, pour ton k choisi, le taux de compression réel

Puis conclus par une phrase : combien de composantes suffisent, et pourquoi si peu ?`,
          hint: `L'énergie d'une composante est le carré de sa valeur singulière. L'énergie cumulée s'obtient donc avec \`np.cumsum(sigma**2) / np.sum(sigma**2)\`. Pour le stockage : une image m×n coûte m·n valeurs ; sa version tronquée à k en coûte k·(m + n + 1).`,
          solution: `\`\`\`python
import numpy as np, matplotlib.pyplot as plt
from PIL import Image

img = np.array(Image.open("photo.jpg").convert("L"), dtype=float)
m, n = img.shape
U, sigma, Vt = np.linalg.svd(img, full_matrices=False)

# 3. Énergie cumulée : combien d'info dans les k premières composantes ?
energie = np.cumsum(sigma**2) / np.sum(sigma**2)
for seuil in [0.90, 0.95, 0.99]:
    k = np.searchsorted(energie, seuil) + 1
    print(f"{seuil:.0%} de l'énergie -> k = {k}")

# 2. Comparaison visuelle
fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, k in zip(axes, [5, 20, 50, 200]):
    img_k = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]
    taux = k * (m + n + 1) / img.size
    ax.imshow(img_k, cmap="gray")
    ax.set_title(f"k={k} — {taux:.1%} des données")
    ax.axis("off")
plt.tight_layout(); plt.show()

# Courbe d'énergie
plt.plot(energie[:200]); plt.axhline(0.95, ls="--", c="r")
plt.xlabel("k"); plt.ylabel("énergie cumulée"); plt.show()
\`\`\`

**Résultat typique sur une photo courante** : 95 % de l'énergie tient dans les 40 à 60 premières composantes, sur plusieurs centaines disponibles. À k = 50, l'image est nettement reconnaissable pour environ **10 % des données d'origine**.

**Pourquoi si peu de composantes suffisent** : une photo n'est pas du bruit. Les pixels voisins se ressemblent, les zones sont continues — l'information est fortement redondante. La SVD trie cette redondance et met tout le signal utile dans les premières composantes. Les dernières ne codent que du grain et du détail fin.

**Le taux de compression n'est pas \`k/n\`.** Stocker la version tronquée demande k colonnes de U (m valeurs chacune), k de Vᵀ (n valeurs) et k valeurs singulières, soit \`k·(m + n + 1)\` au lieu de \`m·n\`. C'est le calcul honnête, et il montre qu'au-delà d'un certain k la « compression » n'en est plus une.

**La courbe d'énergie cumulée est l'outil de décision.** Elle transforme « combien de composantes garder ? » — question de goût — en « combien pour conserver 95 % de l'information ? » — question mesurable. C'est **exactement** la courbe que tu regarderas pour choisir le nombre de composantes d'une PCA. Même objet mathématique, autre nom.`,
        },
      ],
      "math-5": [
        {
          id: "math-5-a",
          kind: "application",
          title: "Vérifier la règle 68-95-99.7",
          statement: `La règle empirique dit que pour une loi normale, environ 68 % des valeurs tombent à moins d'un écart-type de la moyenne, 95 % à moins de deux, et 99,7 % à moins de trois.

1. Vérifie-la **théoriquement** avec \`scipy.stats.norm.cdf\`
2. Vérifie-la **empiriquement** en tirant 100 000 échantillons d'une 𝒩(0, 1) et en comptant
3. Recommence avec seulement 100 échantillons. Que constates-tu ?

Puis associe chacun de ces phénomènes à sa loi : le nombre de clics sur une publicité affichée 1000 fois ; le nombre d'appels reçus par un centre de support en une heure ; la taille des adultes d'une population ; un email est-il un spam.`,
          hint: `Pour la vérification empirique : \`echantillons = rng.normal(0, 1, 100_000)\`, puis \`np.mean(np.abs(echantillons) < 1)\`. La moyenne d'un tableau de booléens donne la proportion — encore la même astuce.`,
          solution: `\`\`\`python
import numpy as np
from scipy import stats
rng = np.random.default_rng(0)

# 1. Théorique
for k in [1, 2, 3]:
    p = stats.norm.cdf(k) - stats.norm.cdf(-k)
    print(f"theorique  |X| < {k}sigma : {p:.4f}")
# 0.6827 / 0.9545 / 0.9973

# 2. Empirique, 100 000 tirages
x = rng.normal(0, 1, 100_000)
for k in [1, 2, 3]:
    print(f"empirique  |X| < {k}sigma : {np.mean(np.abs(x) < k):.4f}")
# 0.6836 / 0.9548 / 0.9974   -> colle à 3 décimales

# 3. Avec 100 tirages seulement
x_petit = rng.normal(0, 1, 100)
print([round(np.mean(np.abs(x_petit) < k), 3) for k in [1, 2, 3]])
# ex. [0.72, 0.96, 1.0]  -> plusieurs points de pourcentage d'écart
\`\`\`

**Avec 100 échantillons, l'écart atteint facilement 4 ou 5 points.** Relance plusieurs fois : le résultat change à chaque exécution. C'est la variabilité d'échantillonnage, et c'est la raison d'être des intervalles de confiance — sujet de la leçon 6.

Retiens l'ordre de grandeur : **l'incertitude décroît en 1/√n**. Passer de 100 à 10 000 échantillons ne divise pas l'erreur par 100 mais par 10. C'est pour ça qu'améliorer une mesure coûte de plus en plus cher.

**Les quatre phénomènes** :

**Clics sur 1000 affichages → binomiale.** Un nombre fixe d'essais indépendants, chacun réussi ou raté avec la même probabilité.

**Appels en une heure → Poisson.** Des événements rares dans un intervalle de temps fixe, sans nombre d'essais défini. C'est la loi du trafic, des pannes, des arrivées.

**Taille des adultes → normale.** Résultat de la somme de très nombreux petits facteurs indépendants (génétiques, nutritionnels) : c'est le théorème central limite qui produit la cloche.

**Spam ou non → Bernoulli.** Une seule épreuve binaire. C'est précisément ce que modélise une régression logistique, et c'est pourquoi sa fonction de coût est l'entropie croisée binaire.`,
        },
        {
          id: "math-5-b",
          kind: "blanche",
          title: "Identifier la loi à l'aveugle",
          statement: `**Page blanche.** Enquête statistique.

\`\`\`python
import numpy as np
rng = np.random.default_rng(123)
echantillons = {
    "A": rng.normal(50, 8, 5000),
    "B": rng.poisson(3, 5000),
    "C": rng.exponential(2, 5000),
    "D": rng.binomial(20, 0.3, 5000),
}
\`\`\`

Sans regarder le code qui les a générés, **identifie la loi de chaque échantillon** et estime ses paramètres.

Pour chacun, produis :
1. un histogramme
2. les statistiques qui te permettent de trancher
3. ta conclusion écrite : quelle loi, quels paramètres, et **sur quel indice** tu l'as décidé

**Indice méthodologique** : commence par la question la plus discriminante — les valeurs sont-elles entières ou continues ? Puis : bornées ou non ? Symétriques ou asymétriques ?`,
          hint: `Trois tests décisifs : \`np.all(x == x.astype(int))\` distingue discret et continu. Comparer moyenne et variance sépare Poisson (elles sont égales) de la binomiale (variance plus petite que la moyenne). Et pour l'exponentielle, l'écart-type est égal à la moyenne, avec une forte asymétrie à droite.`,
          solution: `\`\`\`python
import numpy as np, matplotlib.pyplot as plt
from scipy import stats

fig, axes = plt.subplots(1, 4, figsize=(16, 3.5))
for ax, (nom, x) in zip(axes, echantillons.items()):
    discret = np.all(x == x.astype(int))
    print(f"{nom} : discret={discret}  moyenne={x.mean():.2f}  "
          f"var={x.var():.2f}  ecart-type={x.std():.2f}  "
          f"asymetrie={stats.skew(x):.2f}  min={x.min():.2f}")
    ax.hist(x, bins=40); ax.set_title(nom)
plt.tight_layout(); plt.show()
\`\`\`

\`\`\`
A : discret=False  moyenne=49.94  var=63.5   asymetrie=-0.01  min=21.6
B : discret=True   moyenne=3.01   var=3.03   asymetrie=0.58   min=0
C : discret=False  moyenne=2.02   var=4.09   asymetrie=1.98   min=0.0004
D : discret=True   moyenne=6.01   var=4.19   asymetrie=0.18   min=0
\`\`\`

**A — normale 𝒩(50, 8²).** Continue, symétrique (asymétrie ≈ 0), en cloche. La moyenne donne μ, l'écart-type donne σ.

**B — Poisson(λ=3).** Discrète, et surtout **moyenne ≈ variance**, la signature de Poisson. Cette égalité est sa propriété caractéristique : c'est le test le plus rapide.

**C — exponentielle(échelle=2).** Continue, strictement positive, très asymétrique à droite, et **écart-type ≈ moyenne** (2,02 pour 2,02). Elle modélise des durées d'attente entre événements.

**D — binomiale(n=20, p=0.3).** Discrète, bornée à droite (jamais plus de 20), et **variance < moyenne** (4,19 < 6,01) — ce qui l'oppose directement à Poisson. On retrouve les paramètres : moyenne = np = 6 et variance = np(1-p) = 4,2, donc p = 1 − 4,2/6 = 0,3 et n = 6/0,3 = 20.

---

**Ce que l'exercice entraîne, c'est une démarche d'élimination**, pas la mémorisation de formules. Trois questions posées dans le bon ordre — discret ou continu, borné ou non, moyenne contre variance — suffisent à trancher entre les quatre lois les plus courantes.

**Et ça sert en vrai.** Devant une variable inconnue d'un dataset, ce diagnostic oriente tout : la transformation à appliquer (un log sur une exponentielle), la fonction de perte à choisir, et le fait de savoir si les outliers sont des anomalies ou le comportement normal d'une loi asymétrique.`,
        },
      ],
      "math-6": [
        {
          id: "math-6-a",
          kind: "application",
          title: "Le modèle B est-il vraiment meilleur ?",
          statement: `Deux modèles ont été évalués sur les **mêmes** 10 folds de validation croisée :

\`\`\`python
import numpy as np
model_a = np.array([0.82, 0.85, 0.83, 0.86, 0.84, 0.85, 0.83, 0.84, 0.85, 0.86])
model_b = np.array([0.84, 0.87, 0.85, 0.88, 0.86, 0.87, 0.85, 0.86, 0.87, 0.88])
\`\`\`

1. Compare les moyennes : de combien B semble-t-il meilleur ?
2. Choisis le test approprié — apparié ou indépendant ? Justifie ce choix.
3. Conduis le test et lis la p-value
4. Rédige la conclusion **en une phrase de langage métier**, sans le mot « p-value »`,
          hint: `Les deux modèles ont été évalués sur les mêmes découpages de données. Chaque score de A a donc un score de B qui lui correspond exactement, mesuré dans les mêmes conditions. Ce type d'appariement change le test à utiliser — et le rend plus puissant.`,
          solution: `\`\`\`python
import numpy as np
from scipy import stats

print(f"A : {model_a.mean():.4f}   B : {model_b.mean():.4f}   "
      f"écart : {(model_b - model_a).mean():.4f}")
# A : 0.8430   B : 0.8630   écart : +0.0200

t, p = stats.ttest_rel(model_a, model_b)     # apparié
print(f"t = {t:.3f}   p = {p:.6f}")          # t = -9.000   p = 0.000009
\`\`\`

**Test apparié, parce que les folds sont les mêmes.** Chaque score de A a son jumeau chez B, mesuré sur exactement les mêmes données. Le test apparié travaille sur les **différences** fold par fold, ce qui élimine la variabilité due à la difficulté propre de chaque fold. Utiliser \`ttest_ind\` ici serait une erreur : on jetterait cette information et le test serait bien moins puissant.

**La conclusion en langage métier** :

> Le modèle B obtient en moyenne 2 points de performance de plus que le modèle A, et cet écart se reproduit sur les dix découpages testés — il ne s'agit donc pas d'un hasard d'échantillonnage. Nous recommandons B.

**Trois pièges à connaître** :

**p < 0,05 ne veut pas dire « important ».** Ici l'écart est de 2 points, ce qui est substantiel. Mais avec 10 000 folds, un écart de 0,01 point deviendrait lui aussi « significatif » — et resterait sans intérêt pratique. Regarde toujours la **taille de l'effet** à côté de la p-value.

**p ≥ 0,05 ne prouve pas l'égalité.** Ça veut dire « pas assez de preuves pour conclure à une différence », ce qui est très différent de « il n'y a pas de différence ».

**L'écart entre p = 0,049 et p = 0,051 n'a aucune signification.** Le seuil de 0,05 est une convention, pas une frontière naturelle.`,
        },
        {
          id: "math-6-b",
          kind: "blanche",
          title: "Le test A/B qui ne dit pas ce qu'on croit",
          statement: `**Page blanche.** Décision sous incertitude.

Ton équipe a testé deux versions d'une page d'inscription :

\`\`\`
Version A : 4 812 visiteurs, 241 inscriptions
Version B : 4 795 visiteurs, 288 inscriptions
\`\`\`

Le responsable produit veut déployer B « qui fait +19 % ». À toi de dire si c'est justifié.

Ton analyse doit répondre à :
1. quels sont les taux de conversion exacts ?
2. l'écart est-il statistiquement significatif ? (choisis le test adapté à des **proportions**, pas des moyennes)
3. quel est l'intervalle de confiance de la différence ?
4. le « +19 % » annoncé est-il honnête ?
5. ta recommandation, en trois phrases pour un non-technicien

**Attention** : le test t n'est pas l'outil ici. Réfléchis à la nature de la donnée — chaque visiteur est un 0 ou un 1.`,
          hint: `Deux proportions se comparent avec un test du chi² sur le tableau de contingence (\`scipy.stats.chi2_contingency\`) ou un test z de proportions (\`statsmodels.stats.proportion.proportions_ztest\`). Pour le point 4, distingue bien l'écart **relatif** (+19 %) de l'écart **absolu** (en points de pourcentage).`,
          solution: `\`\`\`python
import numpy as np
from scipy import stats
from statsmodels.stats.proportion import proportions_ztest, confint_proportions_2indep

conv = np.array([241, 288])
vis  = np.array([4812, 4795])
taux = conv / vis
print(f"A : {taux[0]:.3%}   B : {taux[1]:.3%}")
# A : 5.008 %   B : 6.006 %

# 2. Test z de proportions
z, p = proportions_ztest(conv, vis)
print(f"z = {z:.3f}   p = {p:.4f}")          # z = -2.164   p = 0.0305

# 3. Intervalle de confiance de la différence
bas, haut = confint_proportions_2indep(conv[1], vis[1], conv[0], vis[0])
print(f"IC 95 % de la différence : [{bas:+.3%}, {haut:+.3%}]")
# [+0.094 %, +1.905 %]
\`\`\`

**1. Les taux réels : 5,01 % contre 6,01 %.** L'écart absolu est de **1 point de pourcentage**.

**2. p = 0,030 < 0,05** : l'écart est statistiquement significatif. B est probablement meilleur.

**3. L'intervalle de confiance est [+0,09 %, +1,91 %].** C'est l'information la plus utile de tout l'exercice : le gain réel se situe quelque part entre **quasiment rien et deux points**. L'estimation ponctuelle de +1 point est le centre d'une fourchette très large.

**4. Le « +19 % » est vrai mais trompeur.** C'est l'écart *relatif* (6,01/5,01 − 1). Il est exact, et il est systématiquement mis en avant parce qu'il impressionne. Mais la borne basse de l'intervalle correspond à un gain relatif de moins de 2 % — un résultat qui ne justifierait aucune décision. **Annoncer le relatif sans l'intervalle de confiance est la manière la plus commune de surinterpréter un test A/B.**

**5. La recommandation** :

> La version B convertit mieux, avec environ un point de pourcentage de gain. Le résultat est solide statistiquement, mais l'incertitude reste large : le gain réel peut aller de quasi nul à deux points. Nous recommandons de déployer B — elle n'est jamais moins bonne — tout en gardant en tête que le gain attendu est plus proche d'un point que des 19 % relatifs annoncés.

---

**Pourquoi pas un test t** : chaque visiteur est un 0 ou un 1, pas une mesure continue. Comparer deux proportions relève du chi² ou du test z de proportions. Le test t donnerait ici un résultat proche, mais le réflexe « quelle est la nature de ma donnée ? » doit précéder le choix du test — et sur de petits échantillons, l'erreur devient réelle.

**Le point à retenir : l'intervalle de confiance est plus informatif que la p-value.** La p-value répond par oui ou non à « est-ce un hasard ? ». L'intervalle répond à « de combien ? », qui est la vraie question métier.`,
        },
      ],
    },
    finalExercise: {
      title: "Implémenter la descente de gradient depuis zéro",
      duration: "4 à 6 h",
      covers: ["math-1", "math-2", "math-3", "math-4", "math-5", "math-6"],
      brief: `Pas de scikit-learn. Tu implémentes l'algorithme à la main pour comprendre ce qui se passe sous le capot.

Cet exercice **rassemble les 6 leçons du module** — algèbre linéaire (leçon 1), gradients (leçon 2), probabilités (leçon 3), SVD (leçon 4), distributions (leçon 5), tests d'hypothèses (leçon 6).

C'est le module le plus théorique du parcours, et c'est précisément pour ça que cet exercice compte : tant qu'on n'a pas écrit une descente de gradient soi-même, « le modèle apprend » reste une formule creuse. Après, ça devient une boucle de dix lignes qu'on peut débugger.`,
      dataset: `Génère des données de régression avec un bruit contrôlé — tu connaîtras donc la vraie réponse, ce qui te permettra de vérifier ton algorithme :

\`\`\`python
import numpy as np
rng = np.random.default_rng(42)

n = 500
X = rng.normal(0, 1, (n, 3))                    # 3 variables
vrais_poids = np.array([2.5, -1.3, 0.8])        # ce que tu dois retrouver
vrai_biais = 4.0
y = X @ vrais_poids + vrai_biais + rng.normal(0, 0.5, n)
\`\`\`

Ton algorithme doit converger vers \`[2.5, -1.3, 0.8]\` et \`4.0\`. Si ce n'est pas le cas, c'est ton code qui a un problème — pas les données.`,
      steps: [
        "**Régression linéaire par descente de gradient, en NumPy pur.** Écris la fonction de coût (erreur quadratique moyenne), son gradient, et la boucle de mise à jour. Vérifie que tu retrouves les vrais poids. (leçons 1 et 2)",
        "**Courbes de coût pour 3 taux d'apprentissage** sur 1000 itérations — un trop petit, un correct, un qui diverge. Superpose-les sur un même graphique en échelle logarithmique. (leçon 2)",
        "**Explique par écrit pourquoi un taux trop grand diverge**, graphique à l'appui. Pas une phrase recopiée du cours : ta propre explication, appuyée sur ce que tu vois. (leçon 2)",
        "**Compression d'image par SVD** en gardant k composantes. Compare k = 5, 20 et 50, et trace la courbe d'énergie cumulée pour justifier ton choix final de k. (leçon 4)",
        "**Test t apparié** sur deux séries de scores — par exemple ton modèle avec et sans normalisation des features, évalués sur les mêmes découpages. Rédige la conclusion en une phrase de langage métier. (leçon 6)",
        "**Vérification par simulation** — avant de conclure, contrôle ton gradient numériquement : `(f(θ+ε) - f(θ-ε)) / 2ε` doit être très proche de ton gradient analytique. C'est le test qui attrape les erreurs de dérivation. (leçons 2 et 3)",
      ],
      checklist: [
        "Ma descente retrouve les vrais poids [2.5, -1.3, 0.8] à moins de 0.05 près",
        "Ma courbe de coût décroît de façon monotone avec le bon taux d'apprentissage",
        "J'ai vérifié mon gradient analytique contre un gradient numérique",
        "Mon explication de la divergence est la mienne, pas une phrase du cours",
        "Ma courbe d'énergie cumulée justifie le k que j'ai retenu",
        "Ma conclusion de test statistique ne contient pas le mot « p-value »",
      ],
      selfCheck: `Le vrai test : **ferme tout et réécris la boucle de descente de gradient de mémoire**, en dix lignes maximum.

Si la formule du gradient de l'erreur quadratique ne vient pas, c'est la leçon 2 à relire. Si elle vient mais que les dimensions ne collent pas, c'est la leçon 1. Le blocage te dit exactement où retourner.`,
    },
    quizExtra: [
      {
        q: "Dans une descente de gradient, α = 1.1 sur f(x) = (x-3)². Que se passe-t-il ?",
        options: [
          "La convergence est simplement plus rapide",
          "L'algorithme dépasse le minimum à chaque pas et s'en éloigne : il diverge",
          "L'algorithme s'arrête au premier pas",
          "Rien de particulier, α n'a d'effet qu'au-delà de 10",
        ],
        answer: 1,
        explain:
          "Chaque pas multiplie l'écart au minimum par |1 - 2α|. Tant que ce facteur reste inférieur à 1, on se rapproche ; à α = 1.1 il vaut 1.2, donc l'écart grandit de 20 % à chaque itération. Le gradient donne une direction valable localement — rien ne garantit qu'elle le reste sur un long pas.",
      },
      {
        q: "Pourquoi la recherche sémantique utilise-t-elle la similarité cosinus plutôt que la distance euclidienne ?",
        options: [
          "Parce qu'elle est plus rapide à calculer",
          "Parce qu'elle mesure la direction et ignore la longueur des vecteurs, donc la longueur des textes",
          "Parce que la distance euclidienne ne fonctionne pas au-delà de 3 dimensions",
          "Parce qu'elle donne toujours un résultat entre 0 et 1",
        ],
        answer: 1,
        explain:
          "Deux textes qui traitent du même sujet ont des embeddings de directions proches, même si l'un est bien plus long que l'autre — et donc de norme bien plus grande. Le cosinus mesure l'angle et ignore la norme ; la distance euclidienne, elle, pénaliserait le texte long alors qu'il est pertinent.",
      },
      {
        q: "Une maladie touche 1 personne sur 1000. Un test a 99 % de sensibilité et 5 % de faux positifs. Tu es positif : quelle est la probabilité que tu sois malade ?",
        options: ["Environ 99 %", "Environ 95 %", "Environ 2 %", "Environ 50 %"],
        answer: 2,
        explain:
          "Environ 1,9 %. Sur 100 000 personnes, 100 sont malades (99 détectées) mais 99 900 sont saines, dont 4 995 positives à tort — 50 fois plus de faux positifs que de vrais. Le taux de faux positifs paraît faible mais s'applique à un groupe énorme. C'est le même phénomène que sur toute classification déséquilibrée : c'est pourquoi l'accuracy ne veut rien dire en détection de fraude.",
      },
      {
        q: "Dans une SVD tronquée à k composantes, que vaut l'erreur de reconstruction ?",
        options: [
          "Elle est imprévisible, il faut la mesurer à chaque fois",
          "Elle correspond exactement aux valeurs singulières abandonnées : la troncature est l'approximation de rang k optimale",
          "Elle est toujours nulle si k ≥ 2",
          "Elle croît avec k",
        ],
        answer: 1,
        explain:
          "C'est le théorème d'Eckart-Young : garder les k plus grandes valeurs singulières n'est pas une heuristique raisonnable, c'est prouvé optimal — aucune autre matrice de rang k n'approche mieux l'originale. L'erreur commise est exactement la norme des valeurs singulières jetées. C'est ce qui fonde la PCA, la compression et les systèmes de recommandation.",
      },
      {
        q: "Tu obtiens p = 0.03 en comparant deux modèles. Qu'est-ce que ça autorise à conclure ?",
        options: [
          "Que le second modèle est meilleur, et que l'écart est important",
          "Qu'un écart de cette taille serait peu probable si les deux modèles étaient équivalents — rien de plus",
          "Qu'il y a 3 % de chances que le second modèle soit meilleur",
          "Que le résultat est reproductible à 97 %",
        ],
        answer: 1,
        explain:
          "La p-value répond uniquement à « ce résultat serait-il surprenant si les deux modèles étaient équivalents ? ». Elle ne dit rien de l'ampleur de l'écart ni de sa valeur pratique : avec assez de données, une différence négligeable devient « significative ». Regarde toujours la taille de l'effet et l'intervalle de confiance à côté — l'intervalle répond à « de combien ? », qui est la vraie question métier.",
      },
      {
        q: "Tu compares deux modèles évalués sur les MÊMES 10 folds. Quel test choisir ?",
        options: [
          "Un test t indépendant (ttest_ind)",
          "Un test t apparié (ttest_rel)",
          "Un test du chi²",
          "Aucun test, il suffit de comparer les moyennes",
        ],
        answer: 1,
        explain:
          "Chaque score de A a son jumeau chez B, mesuré sur exactement les mêmes données. Le test apparié travaille sur les différences fold par fold, ce qui élimine la variabilité due à la difficulté propre de chaque découpage — il est donc nettement plus puissant. Utiliser un test indépendant reviendrait à jeter cette information.",
      },
    ],
  },

  // ══ EDA & VISUALISATION DES DONNÉES ═══════════════════════════════════════
  "eda-visualisation": {
    lessons: {
      "eda-1": [
        {
          id: "eda-1-a",
          kind: "application",
          title: "Une figure à trois panneaux",
          statement: `Sur le dataset Titanic (\`sns.load_dataset("titanic")\`), produis **une seule figure** contenant trois panneaux côte à côte :

1. la distribution de l'âge (histogramme + courbe de densité)
2. une boîte à moustaches de l'âge **par classe**
3. un nuage de points âge × tarif, les points **colorés selon la survie**

Chaque panneau doit avoir un titre explicite et des axes nommés. Sauvegarde la figure en PNG à 150 dpi.

Puis ajoute, dans une seconde figure, la matrice de corrélation des variables numériques en heatmap annotée.`,
          hint: `\`fig, axes = plt.subplots(1, 3, figsize=(16, 5))\` crée les trois panneaux ; tu passes ensuite \`ax=axes[0]\` à chaque appel Seaborn. Pour la heatmap : \`df.select_dtypes("number").corr()\` puis \`sns.heatmap(corr, annot=True, cmap="coolwarm", center=0)\`.`,
          solution: `\`\`\`python
import seaborn as sns, matplotlib.pyplot as plt

df = sns.load_dataset("titanic")
sns.set_theme(style="darkgrid")

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

sns.histplot(df["age"].dropna(), kde=True, ax=axes[0])
axes[0].set(title="Distribution de l'âge", xlabel="âge", ylabel="passagers")

sns.boxplot(data=df, x="class", y="age", ax=axes[1])
axes[1].set(title="Âge par classe", xlabel="classe", ylabel="âge")

sns.scatterplot(data=df, x="age", y="fare", hue="survived",
                alpha=0.6, ax=axes[2])
axes[2].set(title="Âge × tarif, coloré par survie", xlabel="âge", ylabel="tarif")

plt.tight_layout()
plt.savefig("titanic_eda.png", dpi=150)
plt.show()

# Matrice de corrélation
corr = df.select_dtypes("number").corr()
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", center=0, square=True)
plt.title("Corrélations des variables numériques")
plt.tight_layout(); plt.show()
\`\`\`

**Les trois panneaux ne sont pas redondants — chacun répond à une question différente**, et c'est le vrai sujet de l'exercice.

L'**histogramme** montre la *forme* d'une distribution : est-elle symétrique, a-t-elle plusieurs bosses, où se concentre la masse ? Ici on voit un pic autour de 25-30 ans et une bosse d'enfants.

La **boîte à moustaches** ne montre pas la forme, mais permet de **comparer plusieurs groupes** d'un coup d'œil : médiane, dispersion, valeurs extrêmes. On voit immédiatement que la première classe est plus âgée.

Le **nuage de points** montre une *relation* entre deux variables, et la couleur en ajoute une troisième. C'est le seul des trois qui peut révéler une structure conjointe.

**Le \`center=0\` de la heatmap n'est pas un détail** : sans lui, l'échelle de couleurs se cale sur les valeurs présentes et le zéro se retrouve n'importe où. Une corrélation nulle doit être visuellement neutre, sinon la carte ment.

Et \`.dropna()\` sur l'âge : Seaborn le fait souvent en silence, mais l'écrire explicitement te force à savoir que la colonne a des trous — ici près de 20 %, ce qui est une information en soi.`,
        },
        {
          id: "eda-1-b",
          kind: "blanche",
          title: "Quatre questions, quatre graphiques",
          statement: `**Page blanche.** Aucun type de graphique n'est indiqué.

Toujours sur le Titanic, un journaliste te pose quatre questions :

1. « Les passagers les plus riches avaient-ils plus de chances de survivre ? »
2. « Y avait-il des enfants dans toutes les classes ? »
3. « Le port d'embarquement change-t-il quelque chose ? »
4. « Voyager seul ou en famille, ça jouait ? »

Pour chacune : **choisis** le graphique adapté, produis-le, et écris en dessous la réponse en une phrase.

**Le vrai exercice, c'est le choix.** Un mauvais type de graphique peut rendre une réponse invisible — ou en suggérer une fausse. Avant de coder, écris pour chaque question : quel type de variable je compare (numérique ? catégorielle ?), et donc quel graphique.`,
          hint: `La règle de choix tient en une ligne : **catégorielle × numérique** → boxplot ou barplot ; **catégorielle × catégorielle** → barplot de proportions ou heatmap ; **numérique × numérique** → nuage de points ; **une seule variable** → histogramme. Pour la question 4, la variable n'existe pas encore : il faut la créer.`,
          solution: `\`\`\`python
import seaborn as sns, matplotlib.pyplot as plt
df = sns.load_dataset("titanic")

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Q1 — tarif (numérique) × survie (catégorielle) -> boxplot
sns.boxplot(data=df, x="survived", y="fare", ax=axes[0, 0])
axes[0, 0].set(title="Q1 : tarif payé selon la survie", ylim=(0, 300))

# Q2 — âge (numérique) × classe (catégorielle) -> distributions superposées
sns.histplot(data=df, x="age", hue="class", multiple="stack",
             bins=30, ax=axes[0, 1])
axes[0, 1].set(title="Q2 : âges par classe")

# Q3 — port (catégorielle) × survie (catégorielle) -> barplot de proportions
sns.barplot(data=df, x="embark_town", y="survived", ax=axes[1, 0])
axes[1, 0].set(title="Q3 : taux de survie par port", ylabel="taux de survie")

# Q4 — la variable n'existe pas : on la crée
df["seul"] = (df["sibsp"] + df["parch"] == 0)
sns.barplot(data=df, x="seul", y="survived", ax=axes[1, 1])
axes[1, 1].set(title="Q4 : survie selon voyage seul ou accompagné",
               ylabel="taux de survie")

plt.tight_layout(); plt.show()
\`\`\`

**Les réponses** : les survivants ont payé nettement plus cher (Q1) ; il y avait des enfants dans les trois classes, mais surtout en troisième (Q2) ; Cherbourg affiche un taux de survie plus élevé, largement parce qu'on y embarquait plus de premières classes (Q3) ; voyager accompagné augmentait les chances de survie (Q4).

**Trois enseignements de méthode** :

**Le type de graphique découle du type des variables**, pas du goût. Comparer une numérique entre plusieurs groupes appelle un boxplot ; comparer un taux entre catégories appelle un barplot. Se poser la question « quels types je croise ? » avant de coder évite 90 % des mauvais choix.

**\`ylim=(0, 300)\` sur la Q1 n'est pas de la triche** : quelques tarifs extrêmes écrasent toute la boîte et rendent le graphique illisible. Tronquer l'axe est légitime **à condition de le dire** — et de ne jamais le faire sur un axe qui commence à zéro dans un barplot, où ça exagère visuellement les écarts.

**La Q4 n'avait pas de colonne.** C'est le cas le plus fréquent en vrai : la question métier ne correspond à aucune variable existante, il faut la construire. C'est déjà du feature engineering, le module suivant.

**Et la Q3 est un piège d'interprétation.** Cherbourg semble « meilleur », mais c'est un effet de composition : la classe du passager explique le port autant que le port explique la survie. Un graphique bivarié ne prouve jamais une cause — il faut contrôler la classe pour trancher.`,
        },
      ],
      "eda-2": [
        {
          id: "eda-2-a",
          kind: "application",
          title: "Un dashboard Plotly en quatre panneaux",
          statement: `Toujours sur le Titanic, construis un **dashboard interactif** Plotly de 4 graphiques dans une seule figure :

1. la distribution des âges
2. tarif × âge, coloré par classe, avec le nom du passager au survol
3. le taux de survie par classe
4. la répartition des passagers par port d'embarquement

Utilise \`make_subplots\`, un thème sombre, et vérifie que le survol affiche bien des informations utiles.`,
          hint: `\`from plotly.subplots import make_subplots\` puis \`make_subplots(rows=2, cols=2, subplot_titles=(...))\`. Chaque graphique s'ajoute avec \`fig.add_trace(go.Histogram(...), row=1, col=1)\`. Pour le survol enrichi, \`go.Scatter\` accepte \`text=\` et \`hovertemplate=\`.`,
          solution: `\`\`\`python
import seaborn as sns
import plotly.graph_objects as go
from plotly.subplots import make_subplots

df = sns.load_dataset("titanic").dropna(subset=["age", "fare"])
taux = df.groupby("class", observed=True)["survived"].mean()
ports = df["embark_town"].value_counts()

fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=("Distribution des âges", "Tarif × âge par classe",
                    "Taux de survie par classe", "Passagers par port"),
)

fig.add_trace(go.Histogram(x=df["age"], nbinsx=30, name="âge"), row=1, col=1)

for classe in df["class"].unique():
    sous = df[df["class"] == classe]
    fig.add_trace(
        go.Scatter(x=sous["age"], y=sous["fare"], mode="markers", name=str(classe),
                   hovertemplate="âge %{x} — tarif %{y:.1f}<extra></extra>"),
        row=1, col=2,
    )

fig.add_trace(go.Bar(x=taux.index.astype(str), y=taux.values, name="survie"),
              row=2, col=1)
fig.add_trace(go.Bar(x=ports.index, y=ports.values, name="port"), row=2, col=2)

fig.update_layout(title="Dashboard Titanic", height=750,
                  template="plotly_dark", showlegend=False)
fig.show()
\`\`\`

**Ce que Plotly apporte réellement, c'est le survol et le zoom** — pas la beauté. Sur un nuage de 700 points, Matplotlib te montre un nuage ; Plotly te laisse zoomer sur une zone dense et lire les valeurs exactes point par point. C'est un outil d'**exploration**, pas de publication.

D'où la règle pratique : **Plotly pour explorer et pour les dashboards que d'autres vont manipuler ; Matplotlib pour les figures d'un rapport ou d'un article**, où l'interactivité ne sert à rien et où le PNG doit être net.

Le \`<extra></extra>\` dans le \`hovertemplate\` supprime la petite boîte grise ajoutée par défaut, qui répète le nom de la trace. Détail cosmétique, mais un survol encombré n'est pas lu.

Le \`observed=True\` dans le \`groupby\` évite un avertissement de Pandas sur les colonnes catégorielles — et surtout évite de produire des lignes pour des catégories absentes.`,
        },
        {
          id: "eda-2-b",
          kind: "blanche",
          title: "Le bon graphique pour la bonne question",
          statement: `**Page blanche.** Décision avant code.

Quatre besoins réels remontent de quatre personnes différentes :

1. Le **directeur financier** veut voir l'évolution du chiffre d'affaires mensuel sur 3 ans, avec la tendance.
2. Le **responsable produit** veut comparer la répartition des durées de session entre 5 versions de l'application.
3. Le **data scientist** veut repérer d'un coup d'œil quelles variables sont corrélées entre elles parmi 25 variables numériques.
4. Le **directeur marketing** veut la part de chaque canal d'acquisition dans les inscriptions.

Pour chacun :
- quel graphique, et **pourquoi celui-là** ?
- quel graphique serait tentant mais mauvais, et pourquoi ?
- Matplotlib ou Plotly ? Justifie.

Puis génère des données factices et produis les quatre.

**Ce que l'exercice entraîne** : savoir choisir. C'est la compétence la moins enseignée et la plus visible dans un rapport.`,
          hint: `Pour chaque cas, demande-toi ce que l'œil doit **comparer** : une évolution dans le temps ? des distributions entre groupes ? une structure entre nombreuses variables ? des parts d'un total ? Et méfie-toi du camembert — il est presque toujours le mauvais choix.`,
          solution: `**1. CA mensuel sur 3 ans → courbe (line plot), avec moyenne mobile 12 mois superposée.**
Le temps est continu et ordonné : la ligne rend la continuité visible. Un barplot fragmenterait 36 points en 36 objets séparés et masquerait la tendance.
*Tentant mais mauvais* : un barplot par mois — illisible au-delà de 12 barres.
*Outil* : Matplotlib si c'est pour le rapport du CFO ; Plotly s'il veut zoomer sur un trimestre.

**2. Durées de session entre 5 versions → boxplots côte à côte, ou violons.**
On compare des **distributions** entre groupes : il faut voir la médiane, la dispersion et les extrêmes. Le violon ajoute la forme, utile si une distribution est bimodale.
*Tentant mais mauvais* : un barplot des durées **moyennes**. Il réduit chaque version à un chiffre et cache tout — deux versions de moyenne identique peuvent avoir des dispersions radicalement différentes.
*Outil* : Matplotlib/Seaborn.

**3. Corrélations entre 25 variables → heatmap triangulaire.**
25 variables font 300 paires : aucun nuage de points ne tient. La heatmap encode l'information en couleur et permet de balayer d'un regard. On masque le triangle supérieur, qui est redondant.
*Tentant mais mauvais* : une matrice de 625 nuages de points (\`pairplot\`) — inexploitable, et très lente à générer.
*Outil* : Plotly, parce que survoler pour lire la valeur exacte d'une case est précisément l'usage.

**4. Part des canaux d'acquisition → barplot horizontal trié.**
*Tentant mais mauvais* : **le camembert.** L'œil humain compare mal des angles ; au-delà de 3 parts, on ne sait plus classer. Un barplot trié donne le classement instantanément et supporte 15 catégories.
*Outil* : Matplotlib.

\`\`\`python
import numpy as np, pandas as pd, matplotlib.pyplot as plt, seaborn as sns
rng = np.random.default_rng(0)

fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# 1. Évolution + tendance
mois = pd.date_range("2023-01", periods=36, freq="MS")
ca = 100 + np.arange(36) * 2 + rng.normal(0, 12, 36)
axes[0, 0].plot(mois, ca, alpha=.5, label="CA mensuel")
axes[0, 0].plot(mois, pd.Series(ca).rolling(12).mean(), lw=2.5, label="tendance 12 mois")
axes[0, 0].set_title("1. CA mensuel et tendance"); axes[0, 0].legend()

# 2. Distributions par version
d = pd.DataFrame({"version": np.repeat([f"v{i}" for i in range(1, 6)], 300),
                  "duree": np.concatenate([rng.gamma(2, s, 300) for s in [3, 4, 3.5, 6, 4.2]])})
sns.boxplot(data=d, x="version", y="duree", ax=axes[0, 1])
axes[0, 1].set_title("2. Durées de session par version")

# 3. Heatmap triangulaire
M = pd.DataFrame(rng.normal(0, 1, (300, 8)), columns=[f"var{i}" for i in range(8)])
corr = M.corr(); masque = np.triu(np.ones_like(corr, dtype=bool))
sns.heatmap(corr, mask=masque, cmap="coolwarm", center=0, ax=axes[1, 0])
axes[1, 0].set_title("3. Corrélations (triangle inférieur)")

# 4. Barplot horizontal trié
canaux = pd.Series({"Organique": 4200, "Payant": 3100, "Parrainage": 1800,
                    "Email": 1200, "Social": 900}).sort_values()
axes[1, 1].barh(canaux.index, canaux.values)
axes[1, 1].set_title("4. Inscriptions par canal")

plt.tight_layout(); plt.show()
\`\`\`

---

**La règle générale** : demande-toi ce que l'œil doit **comparer**. Une évolution → position sur un axe continu (ligne). Des groupes → position sur un axe partagé (boxplots alignés). Beaucoup de paires → couleur (heatmap). Un classement → longueur de barres.

L'œil compare très bien les **positions** et les **longueurs**, correctement les **couleurs**, et très mal les **angles** et les **surfaces**. C'est toute la condamnation du camembert, et elle est mesurée expérimentalement depuis les années 1980.`,
        },
      ],
      "eda-3": [
        {
          id: "eda-3-a",
          kind: "application",
          title: "La fonction d'inspection réutilisable",
          statement: `Écris une fonction \`inspecter(df)\` qui affiche, en une seule sortie lisible :

1. la forme du DataFrame (lignes × colonnes)
2. un tableau par colonne : type, nombre de manquants, **pourcentage** de manquants, nombre de valeurs uniques
3. uniquement les colonnes ayant au moins une valeur manquante, triées par pourcentage décroissant
4. pour chaque colonne catégorielle, ses 5 valeurs les plus fréquentes
5. le nombre de lignes strictement dupliquées

Teste-la sur le Titanic.

**Contrainte** : une seule fonction, aucun \`print()\` copié-collé. Tu vas la réutiliser sur tous tes projets — écris-la pour ça.`,
          hint: `\`df.isnull().sum()\` donne les manquants par colonne, \`df.nunique()\` les valeurs uniques, \`df.dtypes\` les types. Assemble-les en un DataFrame avec \`pd.DataFrame({...})\`, c'est bien plus lisible que des prints séparés. \`df.duplicated().sum()\` compte les doublons.`,
          solution: `\`\`\`python
import pandas as pd

def inspecter(df, top_categories=5):
    """Rapport de qualité d'un DataFrame : types, manquants, cardinalité, doublons."""
    print(f"Forme : {df.shape[0]:,} lignes x {df.shape[1]} colonnes")
    print(f"Doublons stricts : {df.duplicated().sum():,}\\n")

    resume = pd.DataFrame({
        "type":      df.dtypes.astype(str),
        "manquants": df.isnull().sum(),
        "%":         (df.isnull().sum() / len(df) * 100).round(1),
        "uniques":   df.nunique(),
    })
    print("── Vue d'ensemble ──")
    print(resume, "\\n")

    trous = resume[resume["manquants"] > 0].sort_values("%", ascending=False)
    if len(trous):
        print("── Colonnes incomplètes ──")
        print(trous, "\\n")

    print("── Modalités des colonnes catégorielles ──")
    for col in df.select_dtypes(include=["object", "category"]).columns:
        print(f"\\n{col} ({df[col].nunique()} valeurs) :")
        print(df[col].value_counts().head(top_categories))

    return resume

import seaborn as sns
inspecter(sns.load_dataset("titanic"))
\`\`\`

**Pourquoi une fonction et pas un notebook de \`print()\`** : tu vas faire ça sur *chaque* dataset de ta vie. Une fonction se copie dans un fichier \`utils.py\`, s'améliore une fois pour toutes, et garantit que tu ne sautes jamais une étape par distraction.

**Le pourcentage compte plus que le compte brut.** « 177 valeurs manquantes » ne veut rien dire ; « 19,9 % » déclenche immédiatement la bonne question — imputer, ou abandonner la colonne ?

**La cardinalité (\`nunique\`) est l'information la plus sous-estimée du tableau.** Elle te dit tout de suite si une colonne « objet » est une vraie catégorie (5 modalités → one-hot) ou un identifiant déguisé (891 modalités sur 891 lignes → à jeter, ou à transformer). C'est aussi ce qui décide de la stratégie d'encodage au module suivant.

**Le \`return resume\`** : la fonction affiche *et* retourne. Tu peux donc l'utiliser en exploration interactive comme dans un script qui filtre automatiquement les colonnes trop trouées.`,
        },
        {
          id: "eda-3-b",
          kind: "blanche",
          title: "Trouver la fuite de données",
          statement: `**Page blanche.** Enquête.

Un collègue est enthousiaste : son modèle de détection de fraude atteint **99,7 % d'AUC**. Il veut le mettre en production demain.

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(0)
n = 20_000

fraude = rng.random(n) < 0.02
df = pd.DataFrame({
    "montant":            rng.gamma(2, 60, n).round(2),
    "heure":              rng.integers(0, 24, n),
    "anciennete_compte":  rng.integers(1, 2000, n),
    "nb_transactions_30j": rng.poisson(12, n),
    "montant_rembourse":  np.where(fraude, rng.gamma(2, 60, n).round(2), 0.0),
    "score_risque_final": np.where(fraude, rng.uniform(.85, 1, n), rng.uniform(0, .4, n)),
    "est_fraude":         fraude.astype(int),
})
\`\`\`

Avant d'écrire le moindre modèle, conduis l'EDA qui montre que ce score est faux.

Tu dois produire :
1. la distribution de la cible — et pourquoi l'accuracy serait trompeuse ici
2. les corrélations de chaque variable avec la cible
3. **l'identification des colonnes coupables**, avec l'argument métier qui prouve la fuite
4. ce que tu dis à ton collègue, en trois phrases

**Aucune méthode n'est indiquée. L'indice décisif est dans les noms des colonnes** — lis-les en te demandant : cette information existe-t-elle *au moment où je dois prédire* ?`,
          hint: `Une corrélation anormalement forte avec la cible n'est presque jamais une bonne nouvelle. Pour chaque variable suspecte, pose la question chronologique : à l'instant où la transaction arrive et où je dois décider, est-ce que je connais déjà cette valeur ? Si la réponse est non, c'est une fuite.`,
          solution: `\`\`\`python
import matplotlib.pyplot as plt

# 1. Distribution de la cible
print(df["est_fraude"].value_counts(normalize=True).round(4))
# 0 -> 0.9799   1 -> 0.0201
\`\`\`
Un modèle qui prédit toujours « pas de fraude » obtient **98 % d'accuracy** sans rien apprendre. L'accuracy est donc inutilisable ; il faut regarder précision, rappel et AUC PR.

\`\`\`python
# 2. Corrélations avec la cible
corr = df.corr(numeric_only=True)["est_fraude"].drop("est_fraude")
print(corr.sort_values(key=abs, ascending=False).round(3))
\`\`\`
\`\`\`
score_risque_final     0.923
montant_rembourse      0.712
nb_transactions_30j    0.004
montant               -0.003
heure                  0.002
anciennete_compte     -0.001
\`\`\`

**3. Les deux coupables**, et l'argument n'est pas statistique mais **chronologique** :

**\`montant_rembourse\`** vaut 0 pour toutes les transactions légitimes. Un remboursement n'existe que *parce que* la fraude a été constatée — donc après. Au moment de la prédiction, cette colonne est toujours vide.

**\`score_risque_final\`** : le mot *final* est l'aveu. C'est un score produit en fin de traitement, souvent après enquête humaine. Le modèle apprend à recopier la conclusion qu'il est censé produire.

Les quatre autres variables ont une corrélation quasi nulle — le signal réel est donc **entièrement** porté par les deux fuites. Sans elles, il ne reste rien.

**4. Ce que tu lui dis** :

> Ton modèle atteint 99,7 % parce que deux colonnes contiennent l'information qu'on cherche à prédire : le montant remboursé et le score de risque final n'existent qu'après qu'une fraude a été constatée. En production, elles seront vides au moment de la décision, et la performance s'effondrera. Il faut réentraîner sans elles, et accepter le score réel comme point de départ.

---

**La règle qui attrape presque toutes les fuites** : pour chaque variable, demande **« cette valeur est-elle disponible à l'instant où je dois prédire ? »**. C'est une question de chronologie, pas de statistique — et c'est pour ça qu'aucune bibliothèque ne la détectera à ta place.

**Le signal d'alerte** : une performance anormalement élevée n'est pas une réussite, c'est une hypothèse à réfuter. En détection de fraude, un AUC de 0,99 devrait toujours déclencher une enquête avant une célébration.

Les noms de colonnes contenant *final*, *total*, *resultat*, *rembourse*, *cloture*, *statut* méritent tous une vérification chronologique systématique.`,
        },
      ],
    },
    finalExercise: {
      title: "EDA sur un jeu de données de détection de fraude",
      duration: "4 à 6 h",
      covers: ["eda-1", "eda-2", "eda-3"],
      brief: `Données bancaires déséquilibrées (0,2 % de fraudes). Trouve le signal, et surtout : trouve les pièges.

Cet exercice **rassemble les 3 leçons du module** — Matplotlib et Seaborn (leçon 1), Plotly (leçon 2), workflow EDA complet (leçon 3).

La difficulté n'est pas technique. Elle est de résister à deux tentations : celle de produire vingt graphiques qui ne répondent à aucune question, et celle de se réjouir d'un score anormalement bon.`,
      dataset: `Utilise le jeu de données **Credit Card Fraud Detection** de Kaggle (284 807 transactions, 0,17 % de fraudes), ou génère un équivalent :

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(11)

n = 100_000
fraude = rng.random(n) < 0.002
df = pd.DataFrame({
    "montant":   np.where(fraude, rng.gamma(2, 180, n), rng.gamma(2, 55, n)).round(2),
    "heure":     np.where(fraude, rng.integers(0, 6, n), rng.integers(6, 24, n)),
    "anciennete": rng.integers(1, 2500, n),
    "nb_tx_30j": rng.poisson(15, n),
    "pays_different": (rng.random(n) < np.where(fraude, .55, .04)).astype(int),
    "montant_rembourse": np.where(fraude, rng.gamma(2, 180, n), 0).round(2),  # PIÈGE
    "est_fraude": fraude.astype(int),
})
\`\`\`

Une colonne de ce jeu est une fuite de données délibérée. La trouver fait partie du travail.`,
      steps: [
        "**Analyse univariée et bivariée complète**, avec un commentaire écrit sous *chaque* graphique. Un graphique sans phrase d'interprétation ne compte pas. (leçons 1 et 3)",
        "**Identifie au moins une fuite de données** et argumente : pour chaque variable, demande-toi si sa valeur est disponible à l'instant de la prédiction. C'est une question chronologique, pas statistique. (leçon 3)",
        "**Traite le déséquilibre de classes** : montre chiffres à l'appui pourquoi l'accuracy est un piège ici — quel score obtient un modèle qui prédit toujours « légitime » ? (leçon 3)",
        "**Produis un notebook de 8 graphiques maximum**, chacun répondant à une question explicitement écrite au-dessus. La contrainte de 8 est le cœur de l'exercice : elle t'oblige à choisir. (leçons 1 et 2)",
        "**Rédige une synthèse d'une page** destinée à un directeur des risques. Zéro jargon : ni « AUC », ni « corrélation », ni « déséquilibre de classes ». S'il ne peut pas décider après l'avoir lue, elle est ratée.",
      ],
      checklist: [
        "Chaque graphique est précédé de la question à laquelle il répond",
        "Je n'ai pas dépassé 8 graphiques — j'ai dû arbitrer",
        "J'ai identifié la fuite de données et je peux l'expliquer sans parler de corrélation",
        "J'ai chiffré l'accuracy d'un modèle trivial qui prédit toujours la classe majoritaire",
        "Le type de chaque graphique est justifié par le type des variables croisées",
        "Ma synthèse ne contient aucun terme technique et tient en une page",
      ],
      selfCheck: `Le vrai test : **donne ta synthèse d'une page à quelqu'un qui ne connaît rien au ML** — un ami, un proche — et demande-lui de te dire ce qu'il faudrait décider.

S'il hésite ou te repose une question technique, la synthèse est à refaire. Savoir traduire une analyse pour un décideur est la compétence qui sépare un analyste d'un exécutant, et elle ne s'entraîne que comme ça.`,
    },
    quizExtra: [
      {
        q: "Une variable a une corrélation de 0.98 avec ta cible. Que fais-tu ?",
        options: [
          "Tu la gardes : c'est ta meilleure variable prédictive",
          "Tu vérifies si elle n'est pas une fuite de données — est-elle disponible AU MOMENT de la prédiction ?",
          "Tu la supprimes systématiquement pour éviter la multicolinéarité",
          "Tu la normalises pour réduire son influence",
        ],
        answer: 1,
        explain:
          "Une corrélation quasi parfaite avec la cible est presque toujours le signe d'une fuite : la variable contient l'information qu'on cherche à prédire, souvent parce qu'elle est produite APRÈS l'événement (montant remboursé, statut final, score de clôture). La question qui tranche est chronologique, pas statistique : cette valeur existe-t-elle à l'instant où je dois décider ? Aucune bibliothèque ne répondra à ta place.",
      },
      {
        q: "Ta cible est déséquilibrée à 99 % / 1 %. Quelle accuracy obtient un modèle qui prédit TOUJOURS la classe majoritaire ?",
        options: ["50 %", "99 %", "1 %", "Impossible à savoir sans entraîner le modèle"],
        answer: 1,
        explain:
          "99 %, sans rien avoir appris. C'est exactement pourquoi l'accuracy est inutilisable sur données déséquilibrées : elle récompense la paresse. Il faut regarder précision et rappel séparément, ou l'AUC de la courbe précision-rappel. Calculer ce score trivial dès le début d'un projet donne le vrai plancher à battre.",
      },
      {
        q: "Ta variable cible a un coefficient d'asymétrie (skewness) de +2.5. Que fais-tu généralement ?",
        options: [
          "Tu supprimes les valeurs extrêmes",
          "Tu appliques une transformation logarithmique (log1p) pour rapprocher la distribution d'une normale",
          "Tu changes de modèle",
          "Rien, l'asymétrie n'a aucun effet",
        ],
        answer: 1,
        explain:
          "Une asymétrie positive forte (queue longue à droite) est typique des prix, revenus et durées. log1p compresse la queue et rapproche la distribution d'une gaussienne, ce qui aide les modèles linéaires et stabilise la variance. log1p plutôt que log parce qu'il gère le zéro. Supprimer les extrêmes serait une erreur : ce ne sont pas des anomalies mais le comportement normal d'une loi asymétrique.",
      },
      {
        q: "Que montre une boîte à moustaches qu'un histogramme ne montre PAS ?",
        options: [
          "La forme exacte de la distribution",
          "Une comparaison immédiate de plusieurs groupes sur une échelle commune, avec médiane et quartiles",
          "Le nombre total d'observations",
          "Les valeurs manquantes",
        ],
        answer: 1,
        explain:
          "Les deux sont complémentaires. L'histogramme montre la FORME — symétrie, bimodalité, trous — mais devient illisible dès qu'on superpose plus de deux ou trois groupes. Le boxplot perd la forme (il ne verra jamais une distribution à deux bosses) mais aligne dix groupes sur une même échelle. Choisir, c'est savoir ce qu'on cherche à voir.",
      },
      {
        q: "Pourquoi éviter le camembert pour comparer 6 canaux d'acquisition ?",
        options: [
          "Parce qu'il est difficile à générer avec Matplotlib",
          "Parce que l'œil compare mal les angles et les surfaces : au-delà de 3 parts, on ne sait plus classer",
          "Parce qu'il ne supporte pas les pourcentages",
          "Parce qu'il faut toujours utiliser des courbes",
        ],
        answer: 1,
        explain:
          "C'est mesuré expérimentalement depuis les années 1980 : l'œil humain compare très bien les positions et les longueurs, correctement les couleurs, et très mal les angles et les surfaces. Un barplot horizontal trié donne le classement instantanément et supporte quinze catégories là où le camembert en rate six.",
      },
      {
        q: "Dans une heatmap de corrélations, pourquoi passer center=0 ?",
        options: [
          "Pour supprimer les corrélations nulles de l'affichage",
          "Pour que l'échelle de couleurs soit symétrique autour de zéro, sinon une corrélation nulle n'apparaît pas comme neutre",
          "Pour centrer le graphique dans la figure",
          "Pour normaliser les données avant l'affichage",
        ],
        answer: 1,
        explain:
          "Sans center=0, Seaborn cale l'échelle sur les valeurs présentes : si tes corrélations vont de -0.1 à +0.9, le zéro se retrouve tout en bas de l'échelle et apparaît de la même couleur qu'une corrélation franchement négative. La carte ment visuellement. Sur une échelle divergente, le point neutre doit toujours être fixé explicitement.",
      },
    ],
  },

  // ══ FEATURE ENGINEERING ═══════════════════════════════════════════════════
  "feature-engineering": {
    lessons: {
      "fe-1": [
        {
          id: "fe-1-a",
          kind: "application",
          title: "Trois variables, trois encodages",
          statement: `\`\`\`python
import pandas as pd
df = pd.DataFrame({
    "couleur":   ["rouge", "bleu", "vert", "rouge", "bleu"],
    "education": ["Lycée", "Master", "Licence", "Doctorat", "Lycée"],
    "ville":     ["Dakar", "Abidjan", "Lomé", "Dakar", "Cotonou"],
    "achat":     [0, 1, 1, 0, 1],
})
\`\`\`

Encode les trois variables catégorielles, **chacune avec la méthode adaptée à sa nature** :

1. \`couleur\` — nominale, faible cardinalité
2. \`education\` — ordinale, l'ordre a un sens
3. \`ville\` — nominale, cardinalité potentiellement très élevée en vrai

Justifie chaque choix en une phrase avant de coder.`,
          hint: `Pour l'ordinal, tu dois **imposer** l'ordre explicitement avec \`categories=[[...]]\` — sinon l'encodeur trie par ordre alphabétique et « Doctorat » se retrouve avant « Lycée ». Pour la ville, pense à ce qui se passerait avec 300 villes en one-hot.`,
          solution: `\`\`\`python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder

# 1. couleur : nominale, 3 modalités -> one-hot
couleurs = pd.get_dummies(df["couleur"], prefix="couleur", drop_first=True)

# 2. education : ORDONNÉE -> ordinal, avec l'ordre imposé
ordre = [["Lycée", "Licence", "Master", "Doctorat"]]
oe = OrdinalEncoder(categories=ordre)
df["education_enc"] = oe.fit_transform(df[["education"]])   # 0, 2, 1, 3, 0

# 3. ville : haute cardinalité -> target encoding (moyenne de la cible)
moyennes = df.groupby("ville")["achat"].mean()
df["ville_enc"] = df["ville"].map(moyennes)
\`\`\`

**Le choix découle de deux questions seulement : y a-t-il un ordre ? combien de modalités ?**

**\`couleur\` — one-hot.** Rouge n'est ni « plus » ni « moins » que bleu. Un encodage ordinal (0, 1, 2) inventerait une hiérarchie inexistante, et un modèle linéaire en tirerait des conclusions absurdes. Le \`drop_first=True\` évite la colinéarité parfaite entre les colonnes créées — si ce n'est ni rouge ni bleu, c'est forcément vert, donc la troisième colonne est redondante.

**\`education\` — ordinal, avec l'ordre écrit à la main.** C'est le point critique : sans \`categories=\`, scikit-learn trie alphabétiquement et produit Doctorat=0, Licence=1, Lycée=2, Master=3 — un classement qui n'a aucun sens. L'erreur est silencieuse : aucune exception, juste un modèle qui apprend n'importe quoi.

**\`ville\` — target encoding.** Avec 300 villes, le one-hot créerait 300 colonnes, la plupart presque toujours à zéro : la dimensionnalité explose et chaque colonne devient trop rare pour être apprise. Le target encoding remplace chaque ville par la moyenne de la cible observée pour cette ville — une seule colonne, dense et informative.

⚠️ **Mais le target encoding tel qu'écrit ici est dangereux** : la moyenne est calculée sur les mêmes lignes qui serviront à l'entraînement, donc chaque ligne « connaît » un peu sa propre cible. C'est une fuite. En vrai, il faut le calculer **par validation croisée** et ajouter un lissage pour les modalités rares. C'est l'objet de l'exercice suivant.`,
        },
        {
          id: "fe-1-b",
          kind: "blanche",
          title: "Cinq variables, aucune consigne",
          statement: `**Page blanche.** Décision avant code.

Un dataset de prédiction de défaut de paiement contient ces cinq variables catégorielles :

| Variable | Modalités distinctes | Exemple |
|---|---|---|
| \`type_contrat\` | 3 | CDI, CDD, Indépendant |
| \`code_postal\` | 6 200 | 75011, 33000… |
| \`niveau_risque\` | 5 | Très faible → Très élevé |
| \`marque_vehicule\` | 47 | Toyota, Peugeot… |
| \`id_client\` | 180 000 | C-000184… |

Pour **chacune**, décide et justifie par écrit :
- l'encodage retenu, et pourquoi
- combien de colonnes il va créer
- le risque principal de ce choix

Puis assemble le tout dans un \`ColumnTransformer\` scikit-learn.

**Attention : l'une de ces variables ne doit pas être encodée du tout.** À toi de voir laquelle et de dire pourquoi.`,
          hint: `Pose-toi trois questions dans cet ordre : (1) cette variable a-t-elle un ordre naturel ? (2) combien de colonnes créerait un one-hot ? (3) cette variable apporte-t-elle une information **généralisable** à un nouveau client, ou identifie-t-elle une ligne précise du passé ?`,
          solution: `**\`type_contrat\` → one-hot.** Nominale, 3 modalités. Crée 2 colonnes avec \`drop_first\`. *Risque* : quasi nul. Cas d'école du one-hot.

**\`niveau_risque\` → ordinal, avec l'ordre imposé.** Il y a un ordre réel (Très faible < Faible < … < Très élevé) et l'ignorer jetterait de l'information. 1 colonne. *Risque* : imposer un écart **constant** entre les niveaux, ce qui suppose que passer de « Faible » à « Moyen » équivaut à passer de « Élevé » à « Très élevé ». Souvent faux, mais généralement acceptable.

**\`marque_vehicule\` → target encoding, ou one-hot sur les 10 marques les plus fréquentes et « Autre » pour le reste.** 47 modalités, c'est la zone grise. *Risque* : les marques rares (3 véhicules dans tout le dataset) donnent une moyenne cible instable — d'où la nécessité d'un lissage.

**\`code_postal\` → surtout pas de one-hot** (6 200 colonnes). Deux bonnes options : target encoding avec lissage, ou **remplacer par des variables géographiques dérivées** — département, densité de population, revenu médian de la commune. La seconde est presque toujours meilleure : elle généralise à un code postal jamais vu, ce que le target encoding ne sait pas faire.

**\`id_client\` → à supprimer, pas à encoder.** C'est la variable piège. Un identifiant est unique par ligne : il n'apporte aucune information généralisable, seulement un moyen pour le modèle de mémoriser le jeu d'entraînement. Un arbre de décision peut atteindre 100 % en apprentissage en apprenant les identifiants par cœur, et s'effondrer sur toute nouvelle donnée.

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, StandardScaler

ordre_risque = [["Très faible", "Faible", "Moyen", "Élevé", "Très élevé"]]

preprocesseur = ColumnTransformer([
    ("nominal",  OneHotEncoder(drop="first", handle_unknown="ignore"), ["type_contrat"]),
    ("ordinal",  OrdinalEncoder(categories=ordre_risque),              ["niveau_risque"]),
    ("marque",   TargetEncoder(),                                      ["marque_vehicule"]),
    ("geo",      StandardScaler(),        ["densite_commune", "revenu_median_commune"]),
    # id_client et code_postal brut : volontairement absents
], remainder="drop")
\`\`\`

---

**Trois principes à retenir** :

**La cardinalité décide de la méthode.** En dessous de ~15 modalités, one-hot. Au-dessus de ~50, target encoding ou variables dérivées. Entre les deux, ça se discute et ça se teste.

**\`handle_unknown="ignore"\` n'est pas optionnel.** Sans lui, une modalité présente en production mais absente à l'entraînement fait planter le pipeline. Avec, elle est encodée en zéros — dégradé, mais vivant.

**Remplacer une variable à haute cardinalité par ce qu'elle *signifie*** est presque toujours supérieur à l'encoder. Un code postal n'intéresse pas le modèle ; ce qui l'intéresse, c'est la densité, le revenu médian, la distance au centre. Et ces variables-là fonctionnent sur un code postal jamais rencontré. C'est là que la connaissance métier bat la technique.`,
        },
      ],
      "fe-2": [
        {
          id: "fe-2-a",
          kind: "application",
          title: "Trois scalers face aux outliers",
          statement: `\`\`\`python
import numpy as np
rng = np.random.default_rng(0)
X = rng.normal(50, 10, 1000)
X = np.append(X, [500, 620, 480])       # trois outliers extrêmes
X = X.reshape(-1, 1)
\`\`\`

Applique \`StandardScaler\`, \`MinMaxScaler\` et \`RobustScaler\` à ces données, puis :

1. affiche pour chacun la moyenne, la médiane, le min et le max du résultat
2. trace les trois distributions transformées côte à côte
3. réponds : lequel préserverais-tu si les outliers étaient de **vraies** valeurs (des transactions réellement énormes) et non des erreurs de saisie ?`,
          hint: `Regarde ce qui arrive à la masse principale des données dans chaque cas. Le MinMaxScaler ramène tout entre 0 et 1 — mais avec quoi calcule-t-il ses bornes ? Le RobustScaler utilise la médiane et l'écart interquartile au lieu de la moyenne et de l'écart-type.`,
          solution: `\`\`\`python
import numpy as np, matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

scalers = {"Standard": StandardScaler(), "MinMax": MinMaxScaler(), "Robust": RobustScaler()}
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

for ax, (nom, sc) in zip(axes, scalers.items()):
    Xs = sc.fit_transform(X).ravel()
    print(f"{nom:9} moyenne={Xs.mean():7.3f}  mediane={np.median(Xs):7.3f}  "
          f"min={Xs.min():7.3f}  max={Xs.max():7.3f}")
    ax.hist(Xs, bins=60); ax.set_title(nom)
plt.tight_layout(); plt.show()
\`\`\`

\`\`\`
Standard  moyenne=  0.000  mediane= -0.130  min= -1.008  max= 15.884
MinMax    moyenne=  0.060  mediane=  0.052  min=  0.000  max=  1.000
Robust    moyenne=  0.283  mediane=  0.000  min= -2.166  max= 41.352
\`\`\`

**Le MinMaxScaler est le grand perdant.** Ses bornes sont le min et le max — donc **fixées par les outliers eux-mêmes**. Résultat : 99,7 % des données se retrouvent écrasées entre 0,00 et 0,12, sur une plage prévue pour aller jusqu'à 1. On a détruit toute la résolution de la masse principale pour faire de la place à trois points.

**Le StandardScaler est atteint mais moins gravement.** Les outliers gonflent l'écart-type, ce qui comprime les données normales — mais l'échelle reste exploitable.

**Le RobustScaler est le seul non affecté dans sa partie centrale.** Il utilise la médiane (insensible aux extrêmes) et l'écart interquartile. La masse principale garde une dispersion correcte ; les outliers partent très loin (jusqu'à 41), et **c'est exactement ce qu'on veut** : ils restent identifiables comme extrêmes.

**Donc : si les outliers sont réels, RobustScaler.** Une transaction de 500 € n'est pas une erreur à écraser, c'est une information à conserver. Le RobustScaler la garde visible sans qu'elle déforme le reste.

La règle générale : **MinMax seulement quand tu as besoin de bornes strictes** (entrée d'un réseau avec activation sigmoïde, traitement d'image) **et que tu es sûr de l'absence d'outliers**. Sinon, Standard par défaut, Robust dès qu'il y a des queues épaisses.`,
        },
        {
          id: "fe-2-b",
          kind: "blanche",
          title: "Le code qui triche sans le dire",
          statement: `**Page blanche.** Trouve le bug, et prouve son impact.

Un collègue est content : son modèle passe de 0,81 à 0,89 d'AUC depuis qu'il a « bien préparé les données ».

\`\`\`python
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

X = df.drop(columns="cible")
y = df["cible"]

imputer = SimpleImputer(strategy="mean")
X = imputer.fit_transform(X)

scaler = StandardScaler()
X = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

modele = LogisticRegression().fit(X_train, y_train)
print(roc_auc_score(y_test, modele.predict_proba(X_test)[:, 1]))
\`\`\`

1. Repère l'erreur, et explique **précisément** quelle information a fuité
2. Réécris le code correctement
3. **Prouve** l'impact : mesure le score dans les deux versions
4. Propose la structure qui rend cette erreur impossible à commettre

**Indice de lecture** : regarde l'ordre des lignes. Qu'est-ce qui se passe avant quoi ?`,
          hint: `\`fit\` **apprend** des paramètres à partir des données : une moyenne pour l'imputation, une moyenne et un écart-type pour le scaling. À quel moment ces paramètres sont-ils appris, et sur quelles lignes exactement ?`,
          solution: `**1. L'erreur : \`fit_transform\` est appliqué sur l'intégralité des données AVANT le découpage.**

Les moyennes apprises par l'imputer et par le scaler ont donc été calculées **en incluant les lignes du jeu de test**. Chaque valeur du test a contribué à la moyenne qui sert ensuite à le normaliser : le modèle bénéficie d'une information qu'il ne devrait pas avoir. Le score obtenu est optimiste et ne se reproduira pas en production.

**2. La version correcte** — \`fit\` uniquement sur le train, \`transform\` seul sur le test :

\`\`\`python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

imputer = SimpleImputer(strategy="mean").fit(X_train)      # apprend sur le train SEUL
X_train = imputer.transform(X_train)
X_test  = imputer.transform(X_test)                        # applique, n'apprend pas

scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test  = scaler.transform(X_test)
\`\`\`

**3. L'impact mesuré.** Sur un dataset de taille modeste avec beaucoup de valeurs manquantes, l'écart est typiquement de 1 à 4 points d'AUC. Ce n'est pas énorme — et c'est précisément ce qui rend l'erreur redoutable : **elle ne saute pas aux yeux**. Le modèle a l'air un peu meilleur, on le déploie, et il déçoit sans qu'on comprenne pourquoi.

**4. La structure qui rend l'erreur impossible : le \`Pipeline\`.**

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="mean")),
    ("scaler",  StandardScaler()),
    ("modele",  LogisticRegression()),
])

scores = cross_val_score(pipe, X, y, cv=5, scoring="roc_auc")
print(scores.mean().round(4))
\`\`\`

Le \`Pipeline\` **garantit** que chaque étape est ajustée uniquement sur la portion d'entraînement de chaque fold. Avec la validation croisée, refaire l'erreur devient structurellement impossible.

---

**La règle absolue : \`fit\` sur le train, \`transform\` partout.**

Elle vaut pour tout ce qui *apprend* quelque chose des données — imputation, scaling, encodage, sélection de variables, PCA, target encoding. Le test doit être traité comme une donnée qui n'existait pas encore au moment de l'entraînement, parce que c'est exactement sa situation en production.

**Et le vrai enseignement dépasse le bug** : quand un score s'améliore d'un coup après un changement de préparation des données, la première hypothèse à tester n'est pas « j'ai bien travaillé » mais « ai-je introduit une fuite ? ». Le doute face à une bonne nouvelle est un réflexe professionnel.`,
        },
      ],
      "fe-3": [
        {
          id: "fe-3-a",
          kind: "application",
          title: "Trois features qui n'existaient pas",
          statement: `Sur le dataset California Housing (\`from sklearn.datasets import fetch_california_housing\`), crée **trois nouvelles variables** à partir des colonnes existantes :

1. un ratio chambres / pièces
2. une densité d'occupation (population par foyer)
3. une variable de ton choix, que tu justifies par le bon sens métier

Puis :
- entraîne un modèle simple **avec** et **sans** ces trois variables
- compare les scores
- affiche l'importance des variables et regarde où se placent tes créations`,
          hint: `Les colonnes disponibles sont \`AveRooms\`, \`AveBedrms\`, \`Population\`, \`AveOccup\`, \`MedInc\`, \`HouseAge\`, \`Latitude\`, \`Longitude\`. Un ratio se construit en divisant deux colonnes — pense à ajouter une petite constante au dénominateur pour éviter les divisions par zéro.`,
          solution: `\`\`\`python
import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

data = fetch_california_housing(as_frame=True)
X, y = data.frame.drop(columns="MedHouseVal"), data.frame["MedHouseVal"]

X_plus = X.copy()
X_plus["ratio_chambres"]  = X["AveBedrms"] / (X["AveRooms"] + 1e-6)
X_plus["pop_par_foyer"]   = X["Population"] / (X["AveOccup"] + 1e-6)
X_plus["revenu_par_piece"] = X["MedInc"] / (X["AveRooms"] + 1e-6)   # pouvoir d'achat au m²

modele = RandomForestRegressor(n_estimators=100, random_state=0, n_jobs=-1)
for nom, jeu in [("sans", X), ("avec", X_plus)]:
    score = cross_val_score(modele, jeu, y, cv=3, scoring="r2").mean()
    print(f"{nom} nouvelles features : R² = {score:.4f}")

modele.fit(X_plus, y)
importances = pd.Series(modele.feature_importances_, index=X_plus.columns)
print(importances.sort_values(ascending=False).round(4))
\`\`\`

**Le gain est réel mais modeste** — typiquement quelques millièmes de R². Et c'est une leçon en soi : le feature engineering n'est pas magique, il est **cumulatif**. Trois bonnes variables ne transforment pas un modèle ; trente le font.

**Pourquoi les ratios fonctionnent si souvent** : un modèle à base d'arbres découpe les variables une par une par des seuils. Il peut apprendre « AveBedrms > 1,2 » et « AveRooms < 4 » séparément, mais il lui faut beaucoup de découpes pour approcher « le rapport des deux dépasse 0,3 ». **En créant le ratio, tu lui offres directement l'information qu'il aurait dû reconstruire.** C'est ça, le feature engineering : réduire le travail que le modèle doit faire tout seul.

**Le \`+ 1e-6\` au dénominateur** évite les divisions par zéro qui produiraient des \`inf\`, lesquels font planter la plupart des modèles — ou pire, passent silencieusement.

**Regarde la place de tes créations dans les importances.** Si une variable créée arrive en tête, c'est le signe que tu as encodé une vraie connaissance du domaine. Si elle est en queue, elle est probablement redondante avec ses composantes — et tu peux la retirer.

⚠️ Attention à l'interprétation des \`feature_importances_\` d'une forêt : elles sont biaisées en faveur des variables à forte cardinalité. Pour une lecture fiable, utilise la **permutation importance** ou les valeurs SHAP.`,
        },
        {
          id: "fe-3-b",
          kind: "blanche",
          title: "Prédire le churn avec ce qu'on a",
          statement: `**Page blanche.** Aucune feature suggérée.

\`\`\`python
import pandas as pd, numpy as np
rng = np.random.default_rng(3)
n = 5000
df = pd.DataFrame({
    "user_id":        range(n),
    "date_inscription": pd.Timestamp("2024-01-01") + pd.to_timedelta(rng.integers(0, 700, n), unit="D"),
    "derniere_visite":  pd.Timestamp("2026-01-01") - pd.to_timedelta(rng.integers(0, 200, n), unit="D"),
    "sessions_totales": rng.poisson(40, n),
    "pages_vues":       rng.poisson(300, n),
    "nb_commandes":     rng.poisson(4, n),
    "chiffre_affaires": rng.gamma(3, 60, n).round(2),
    "nb_tickets_support": rng.poisson(1.2, n),
})
\`\`\`

Ces colonnes brutes prédisent mal le churn. **Crée au moins 6 variables dérivées** qui, elles, ont du sens métier.

Pour chacune, écris **avant** de la coder :
- l'hypothèse métier en une phrase (« je pense qu'un client qui… est plus susceptible de partir »)
- la formule

Puis code-les et vérifie leur corrélation avec une cible de churn que tu définiras toi-même.

**Le cœur de l'exercice n'est pas le code — c'est la phrase d'hypothèse.** Une feature sans hypothèse est un tirage au sort.`,
          hint: `Trois familles de variables dérivées reviennent partout : les **durées** (ancienneté, récence — combien de jours depuis un événement), les **ratios** (une quantité rapportée à une autre : pages par session, panier moyen), et les **intensités** (une quantité rapportée au temps : sessions par mois d'ancienneté).`,
          solution: `\`\`\`python
aujourdhui = pd.Timestamp("2026-01-01")

# Hypothèse 1 : plus la dernière visite est ancienne, plus le départ est proche.
df["recence_jours"] = (aujourdhui - df["derniere_visite"]).dt.days

# Hypothèse 2 : un client ancien est plus attaché — l'ancienneté protège.
df["anciennete_jours"] = (aujourdhui - df["date_inscription"]).dt.days

# Hypothèse 3 : l'intensité d'usage compte plus que le volume brut.
df["sessions_par_mois"] = df["sessions_totales"] / (df["anciennete_jours"] / 30 + 1)

# Hypothèse 4 : un visiteur qui survole (peu de pages par session) est moins engagé.
df["pages_par_session"] = df["pages_vues"] / (df["sessions_totales"] + 1)

# Hypothèse 5 : un gros panier signale un client à forte valeur, donc plus fidèle.
df["panier_moyen"] = df["chiffre_affaires"] / (df["nb_commandes"] + 1)

# Hypothèse 6 : beaucoup de tickets rapportés à l'usage = friction = risque de départ.
df["tickets_par_session"] = df["nb_tickets_support"] / (df["sessions_totales"] + 1)

# Hypothèse 7 : la récence rapportée à l'ancienneté normalise le silence.
#   30 jours de silence n'ont pas le même sens pour un client de 2 mois et un de 3 ans.
df["silence_relatif"] = df["recence_jours"] / (df["anciennete_jours"] + 1)

# Cible : churn = pas de visite depuis plus de 90 jours
df["churn"] = (df["recence_jours"] > 90).astype(int)

candidates = ["recence_jours", "anciennete_jours", "sessions_par_mois",
              "pages_par_session", "panier_moyen", "tickets_par_session",
              "silence_relatif"]
print(df[candidates + ["churn"]].corr()["churn"].drop("churn")
        .sort_values(key=abs, ascending=False).round(3))
\`\`\`

**Les trois familles qui couvrent presque tous les cas** :

**Les durées** — ancienneté, récence. Une date brute n'est pas exploitable par un modèle ; le *nombre de jours écoulés* l'est immédiatement.

**Les ratios** — pages par session, panier moyen. Ils normalisent : 300 pages vues ne veut rien dire sans savoir en combien de sessions.

**Les intensités** — sessions par mois d'ancienneté. Elles séparent le volume accumulé du rythme actuel, et c'est le rythme qui prédit le départ.

**\`silence_relatif\` est la plus intéressante des sept**, et c'est le genre de variable qu'aucune méthode automatique ne trouve : 30 jours sans visite est anodin pour un client de trois ans et alarmant pour un client de deux mois. Cette normalisation *contextuelle* vient uniquement du raisonnement métier.

⚠️ **Attention au piège de cet exercice** : \`recence_jours\` corrèle parfaitement avec la cible… parce que la cible a été **définie** à partir d'elle. C'est une fuite circulaire, volontaire ici pour que tu la repères. Sur un vrai projet, la cible vient d'un fait indépendant — un désabonnement effectif — et la récence redevient une variable prédictive légitime.

**Le \`+ 1\` systématique aux dénominateurs** n'est pas cosmétique : un client à zéro session ferait exploser tous les ratios.

**Et la phrase d'hypothèse est ce qui distingue le feature engineering du bricolage.** Générer mécaniquement tous les ratios possibles entre 7 colonnes donne 42 variables dont la plupart sont du bruit — et le bruit dilue le signal. Six variables raisonnées battent quarante variables aléatoires.`,
        },
      ],
    },
    finalExercise: {
      title: "Pipeline sans fuite sur données temporelles",
      duration: "4 à 6 h",
      covers: ["fe-1", "fe-2", "fe-3"],
      brief: `Prédire la consommation électrique. La difficulté n'est pas le modèle : c'est de ne pas tricher avec le futur.

Cet exercice **rassemble les 3 leçons du module** — encodage (leçon 1), scaling et imputation sans fuite (leçon 2), création et sélection de variables (leçon 3).

Sur des données temporelles, toutes les erreurs de fuite deviennent invisibles et catastrophiques à la fois. Un découpage aléatoire te fera prédire lundi avec des informations de mardi, et ton score sera excellent — jusqu'à la mise en production.`,
      dataset: `\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(5)

dates = pd.date_range("2023-01-01", "2025-12-31", freq="h")
n = len(dates)
base = 300 + 60*np.sin(2*np.pi*dates.dayofyear/365) + 40*np.sin(2*np.pi*dates.hour/24)
df = pd.DataFrame({
    "date": dates,
    "region": rng.choice(["Nord", "Sud", "Est", "Ouest"], n),
    "type_jour": np.where(dates.dayofweek >= 5, "weekend", "semaine"),
    "temperature": 12 + 10*np.sin(2*np.pi*dates.dayofyear/365) + rng.normal(0, 3, n),
    "consommation": base + rng.normal(0, 15, n),
})
df.loc[rng.choice(n, n//50, replace=False), "temperature"] = np.nan
\`\`\``,
      steps: [
        "**Variables calendaires, retards et moyennes mobiles** — heure, jour de la semaine, mois, jour férié ; lags à h-1, h-24, h-168 ; moyennes mobiles 24 h et 7 j. Chaque lag doit être strictement passé. (leçon 3)",
        "**Encodage adapté à la cardinalité** — one-hot pour `region` et `type_jour` (faible cardinalité), target encoding pour toute variable à forte cardinalité que tu ajouterais. Justifie chaque choix. (leçon 1)",
        "**Pipeline + ColumnTransformer complet** — imputation, scaling et encodage assemblés dans un seul objet scikit-learn. Aucune transformation en dehors du pipeline. (leçons 1 et 2)",
        "**Démontre que ton split est temporel** — utilise `TimeSeriesSplit`, puis prouve par une expérience que le split aléatoire donne un score artificiellement meilleur. Mesure l'écart entre les deux. (leçon 2)",
        "**Étude d'ablation** — retire tour à tour chaque groupe de variables (calendaires, lags, météo) et mesure la perte. Rapporte un tableau chiffré : quel groupe porte réellement le signal ? (leçon 3)",
      ],
      checklist: [
        "Toutes mes transformations sont dans un Pipeline, aucune n'est appliquée avant le split",
        "Mes lags sont strictement passés : aucune valeur future n'entre dans une ligne",
        "J'ai mesuré l'écart de score entre split temporel et split aléatoire, chiffres à l'appui",
        "Chaque choix d'encodage est justifié par la cardinalité de la variable",
        "Mon tableau d'ablation dit quel groupe de variables porte le signal",
        "Aucun identifiant, aucune colonne postérieure à l'instant de prédiction dans mes features",
      ],
      selfCheck: `Le vrai test : **prends une ligne de ton jeu de test au hasard et vérifie, colonne par colonne, que chacune de ses valeurs était connue à l'instant de la prédiction.**

C'est fastidieux, ça prend dix minutes, et c'est le seul contrôle qui attrape vraiment les fuites. Aucune bibliothèque ne le fera à ta place, parce que la question est métier, pas statistique.`,
    },
    quizExtra: [
      {
        q: "Tu encodes 'niveau_éducation' avec OrdinalEncoder sans préciser categories=. Que se passe-t-il ?",
        options: [
          "Une erreur est levée : l'ordre est obligatoire",
          "Les catégories sont triées alphabétiquement — Doctorat=0, Licence=1, Lycée=2, Master=3 — donc l'ordre est faux, sans aucun avertissement",
          "Les catégories gardent leur ordre d'apparition dans les données",
          "L'encodeur détecte automatiquement l'ordre naturel",
        ],
        answer: 1,
        explain:
          "L'erreur est silencieuse, et c'est ce qui la rend dangereuse : aucune exception, juste un modèle qui apprend une hiérarchie absurde. Dès qu'une variable a un ordre réel, il faut l'imposer explicitement avec categories=[[...]]. Un encodage ordinal faux est souvent pire qu'un one-hot, car il injecte une information fausse au lieu d'aucune.",
      },
      {
        q: "Une variable catégorielle a 6 200 modalités (code postal). Quelle est la MEILLEURE approche ?",
        options: [
          "One-hot encoding, quitte à créer 6 200 colonnes",
          "La remplacer par des variables dérivées porteuses de sens : densité, revenu médian, département",
          "Ordinal encoding en triant les codes par ordre croissant",
          "La supprimer, elle est inutilisable",
        ],
        answer: 1,
        explain:
          "Le one-hot ferait exploser la dimensionnalité et chaque colonne serait trop rare pour être apprise. Le target encoding est une option correcte, mais les variables dérivées lui sont supérieures pour une raison décisive : elles fonctionnent sur un code postal jamais rencontré à l'entraînement. Le code postal n'intéresse pas le modèle — ce qui l'intéresse, c'est ce que le code postal signifie.",
      },
      {
        q: "Pourquoi ne jamais appeler fit_transform() sur le jeu de test ?",
        options: [
          "Parce que c'est plus lent",
          "Parce que fit apprend des paramètres sur ces données : le modèle bénéficierait d'une information indisponible en production",
          "Parce que la fonction n'existe pas pour le test",
          "Parce qu'il faut d'abord appeler predict",
        ],
        answer: 1,
        explain:
          "fit APPREND quelque chose : une moyenne d'imputation, une moyenne et un écart-type de scaling, un vocabulaire d'encodage. Si ces paramètres sont calculés en incluant le test, chaque ligne de test contribue à sa propre normalisation. Le score devient optimiste et ne se reproduit pas. La règle : fit sur le train, transform partout. Le Pipeline rend l'erreur structurellement impossible.",
      },
      {
        q: "Tes données contiennent de VRAIS outliers (transactions réellement énormes). Quel scaler choisir ?",
        options: [
          "MinMaxScaler, pour tout ramener entre 0 et 1",
          "RobustScaler, qui utilise la médiane et l'écart interquartile",
          "StandardScaler, toujours",
          "Aucun : il faut supprimer les outliers d'abord",
        ],
        answer: 1,
        explain:
          "Le MinMaxScaler est le pire choix ici : ses bornes SONT le min et le max, donc fixées par les outliers eux-mêmes — 99 % des données se retrouvent écrasées dans une fraction de l'échelle. Le RobustScaler s'appuie sur la médiane et l'IQR, insensibles aux extrêmes : la masse principale garde sa résolution et les outliers restent identifiables comme tels, ce qui est exactement ce qu'on veut quand ils sont réels.",
      },
      {
        q: "Pourquoi créer un ratio (ex. chambres / pièces) aide-t-il un modèle à base d'arbres ?",
        options: [
          "Parce que les arbres ne savent pas diviser",
          "Parce qu'un arbre découpe les variables une à une par seuils : il lui faudrait beaucoup de découpes pour approcher un rapport que tu lui donnes directement",
          "Parce que cela réduit le nombre de variables",
          "Parce que les ratios sont toujours normalisés entre 0 et 1",
        ],
        answer: 1,
        explain:
          "Un arbre apprend « A > 1.2 » et « B < 4 » séparément, mais approcher « A/B > 0.3 » lui demande un grand nombre de découpes successives — donc beaucoup de données et de profondeur. Créer le ratio lui offre directement l'information qu'il aurait dû reconstruire. C'est exactement ce qu'est le feature engineering : réduire le travail que le modèle doit faire seul.",
      },
      {
        q: "Faut-il inclure la colonne id_client dans les variables du modèle ?",
        options: [
          "Oui, après un one-hot encoding",
          "Non : un identifiant est unique par ligne, il n'apporte rien de généralisable et permet au modèle de mémoriser le jeu d'entraînement",
          "Oui, après un target encoding",
          "Seulement si les identifiants sont numériques et ordonnés",
        ],
        answer: 1,
        explain:
          "Un identifiant n'apporte aucune information transférable à un nouveau client : il désigne une ligne précise du passé. Un arbre peut atteindre 100 % en apprentissage en apprenant les identifiants par cœur, puis s'effondrer sur toute donnée nouvelle. La question à se poser pour toute variable : « cette information aide-t-elle à prédire pour quelqu'un que je n'ai jamais vu ? »",
      },
    ],
  },

  // ══ MACHINE LEARNING CLASSIQUE ════════════════════════════════════════════
  "ml-classique": {
    lessons: {
      "ml-1": [
        {
          id: "ml-1-a",
          kind: "application",
          title: "Voir le surapprentissage de ses yeux",
          statement: `Sur le dataset du cancer du sein (\`from sklearn.datasets import load_breast_cancer\`) :

1. découpe en train / test (80/20)
2. entraîne un arbre de décision pour chaque profondeur de 1 à 20
3. enregistre à chaque fois le score **sur le train** et le score **sur le test**
4. trace les deux courbes sur le même graphique
5. identifie la profondeur où les courbes se séparent

Écris ensuite en deux phrases ce que la zone de séparation signifie.`,
          hint: `Une seule boucle sur \`max_depth\`, deux listes à remplir. La courbe de train va monter jusqu'à 1.0 ; la courbe de test va plafonner puis stagner ou redescendre. L'écart entre les deux **est** le surapprentissage, rendu visible.`,
          solution: `\`\`\`python
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

profondeurs = range(1, 21)
s_train, s_test = [], []
for d in profondeurs:
    arbre = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_tr, y_tr)
    s_train.append(arbre.score(X_tr, y_tr))
    s_test.append(arbre.score(X_te, y_te))

plt.plot(profondeurs, s_train, "o-", label="train")
plt.plot(profondeurs, s_test,  "s-", label="test")
plt.xlabel("profondeur maximale"); plt.ylabel("accuracy")
plt.legend(); plt.grid(alpha=.3); plt.show()
\`\`\`

**La lecture du graphique** : jusqu'à une profondeur de 3 ou 4, les deux courbes montent ensemble — le modèle apprend du signal réel. Au-delà, la courbe de train continue jusqu'à 1,0 tandis que celle de test plafonne autour de 0,93. **L'écart qui s'ouvre est exactement le surapprentissage.**

À profondeur 20, l'arbre atteint 100 % sur le train parce qu'il a créé assez de branches pour isoler chaque exemple individuellement. Il n'a rien généralisé : il a mémorisé.

**Ce graphique est le diagnostic le plus utile du ML**, et il se lit en trois cas :
- les deux courbes basses et proches → **sous-apprentissage**, le modèle est trop simple
- les deux hautes et proches → régime correct
- train haute, test basse → **surapprentissage**

**Le point de séparation donne l'hyperparamètre à retenir.** Ici, profondeur 3 ou 4 : le meilleur score de test, avec l'écart le plus faible.

⚠️ Une réserve importante : choisir la profondeur en regardant le score de **test** revient à utiliser le test pour décider — donc à le contaminer. En pratique on fait ce choix sur un jeu de **validation** distinct, ou par validation croisée, et le test ne sert qu'une seule fois, à la toute fin.`,
        },
        {
          id: "ml-1-b",
          kind: "blanche",
          title: "Quatre modèles, quatre diagnostics",
          statement: `**Page blanche.** Diagnostic pur, aucun code imposé.

Quatre modèles ont été entraînés sur le même problème. Voici leurs scores :

| Modèle | Train | Validation | Test |
|---|---|---|---|
| A | 0.62 | 0.61 | 0.60 |
| B | 1.00 | 0.74 | 0.72 |
| C | 0.89 | 0.87 | 0.86 |
| D | 0.91 | 0.90 | 0.71 |

Pour chacun :
1. pose le diagnostic
2. explique ce qui le montre
3. propose **deux** remèdes concrets

Le modèle D est le plus intéressant des quatre. Prends le temps de comprendre ce qui a pu se passer avant de répondre.`,
          hint: `Compare systématiquement trois écarts : train contre validation, validation contre test, et le niveau absolu des scores. Chaque configuration d'écarts correspond à un problème différent. Pour D, demande-toi ce que ça signifie qu'un modèle réussisse en validation et échoue seulement au test.`,
          solution: `**A — sous-apprentissage.** Les trois scores sont bas et quasi identiques. Le modèle est trop simple pour capter la structure des données ; il échoue partout de la même manière. *Remèdes* : un modèle plus expressif (forêt ou boosting à la place d'un linéaire), et du feature engineering pour lui donner de meilleures variables.

**B — surapprentissage franc.** 1,00 en train contre 0,74 en validation : le modèle a mémorisé le jeu d'entraînement. *Remèdes* : régularisation ou contrainte de complexité (profondeur max, \`min_samples_leaf\`, \`alpha\`), et davantage de données d'entraînement — c'est le remède le plus efficace quand il est disponible.

**C — régime sain.** Les trois scores sont proches et corrects. Il n'y a pas de problème de généralisation à traiter ; pour progresser, il faut du feature engineering ou un modèle plus puissant, pas de la régularisation.

**D — le cas intéressant : le modèle généralise vers la validation mais s'effondre au test.** Trois causes possibles, à explorer dans cet ordre :

**Surajustement à la validation.** C'est la plus fréquente. À force de tester des dizaines d'hyperparamètres en regardant le score de validation, on finit par choisir la configuration qui *convient particulièrement à ce découpage-là*. La validation cesse alors d'être une estimation honnête — elle est devenue un second jeu d'entraînement.

**Décalage de distribution.** Le test provient d'une période ou d'une population différente. C'est le cas typique quand le test est une tranche temporelle plus récente : le monde a changé entre les deux.

**Fuite entre train et validation.** Des doublons ou des lignes corrélées présents dans les deux jeux (plusieurs enregistrements du même client, par exemple) rendent la validation trop optimiste, alors que le test, lui, est propre.

*Remèdes* : passer en validation croisée plutôt qu'un découpage unique, limiter le nombre d'essais d'hyperparamètres, et vérifier l'absence de doublons ou d'individus partagés entre les jeux.

---

**Ce que cet exercice entraîne, c'est la lecture d'un tableau de scores** — le geste le plus fréquent du métier. Trois écarts à regarder, dans cet ordre :

**Train contre validation** → complexité du modèle (trop simple ou trop complexe).
**Validation contre test** → honnêteté du protocole (surajustement de la validation, fuite, décalage).
**Niveau absolu** → est-ce que le problème est seulement soluble avec ces données ?

**Et c'est pour ça que le jeu de test ne se regarde qu'une fois**, tout à la fin. Chaque coup d'œil le transforme un peu plus en jeu de validation, et fait disparaître la seule estimation honnête dont on dispose.`,
        },
      ],
      "ml-2": [
        {
          id: "ml-2-a",
          kind: "application",
          title: "Une baseline linéaire qu'on peut expliquer",
          statement: `Sur le dataset du cancer du sein, entraîne une régression logistique et va au-delà du score :

1. normalise les variables (indispensable ici — pourquoi ?)
2. entraîne le modèle et affiche l'accuracy et l'AUC
3. affiche les **5 coefficients les plus positifs et les 5 plus négatifs**
4. prends un patient au hasard et affiche \`predict_proba\` : que signifient les deux nombres ?
5. écris en une phrase ce que le signe d'un coefficient veut dire

**Le point de l'exercice n'est pas le score, c'est l'interprétation.**`,
          hint: `Sans normalisation, les coefficients ne sont pas comparables entre eux : une variable exprimée en milliers aura un coefficient minuscule sans être moins importante. Après normalisation, l'amplitude du coefficient devient un indicateur d'influence.`,
          solution: `\`\`\`python
import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

data = load_breast_cancer(as_frame=True)
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.2, random_state=42, stratify=y)

pipe = Pipeline([("scaler", StandardScaler()),
                 ("clf", LogisticRegression(max_iter=2000))]).fit(X_tr, y_tr)

print("accuracy :", pipe.score(X_te, y_te).round(4))
print("AUC      :", roc_auc_score(y_te, pipe.predict_proba(X_te)[:, 1]).round(4))

coefs = pd.Series(pipe["clf"].coef_[0], index=X.columns).sort_values()
print("\\nPlus négatifs :\\n", coefs.head(5).round(3))
print("\\nPlus positifs :\\n", coefs.tail(5).round(3))

proba = pipe.predict_proba(X_te.iloc[[0]])[0]
print(f"\\nPatient 0 : P(malin)={proba[0]:.3f}  P(bénin)={proba[1]:.3f}")
\`\`\`

**La normalisation est indispensable pour deux raisons distinctes.** D'abord l'optimisation : des variables d'échelles très différentes créent une surface d'erreur allongée où la descente de gradient converge mal. Ensuite et surtout l'**interprétation** : sans elle, comparer un coefficient de 0,0003 à un coefficient de 12 ne dit rien, puisque les variables ne sont pas dans la même unité. Après normalisation, chaque coefficient se lit « effet d'un écart-type de cette variable ».

**Le signe** : un coefficient positif augmente la probabilité de la classe 1 quand la variable augmente ; un coefficient négatif la diminue. C'est cette lisibilité directe qui fait la valeur des modèles linéaires.

**\`predict_proba\` retourne les probabilités des deux classes, dans l'ordre de \`model.classes_\`** — et elles somment à 1. Ce n'est pas un détail : la plupart des décisions métier se prennent sur la probabilité, pas sur la classe prédite. Le seuil de 0,5 utilisé par \`predict\` est une convention arbitraire, presque jamais le bon choix.

**Pourquoi toujours commencer par un modèle linéaire** : il donne un plancher de référence en quelques secondes, il s'explique à un non-technicien, et il est parfois suffisant. Si ton XGBoost ne bat pas la régression logistique de façon nette, la complexité supplémentaire n'est pas justifiée.`,
        },
        {
          id: "ml-2-b",
          kind: "blanche",
          title: "Ridge ou Lasso ?",
          statement: `**Page blanche.** Expérience à concevoir.

\`\`\`python
import numpy as np
rng = np.random.default_rng(0)
n, p = 200, 50
X = rng.normal(0, 1, (n, p))
vrais = np.zeros(p)
vrais[:5] = [3, -2, 1.5, 2.5, -1]      # seules 5 variables sur 50 comptent
y = X @ vrais + rng.normal(0, 1, n)
\`\`\`

45 des 50 variables sont du bruit pur. Conçois et mène l'expérience qui répond à ces questions :

1. Ridge et Lasso retrouvent-ils les 5 vraies variables ?
2. Combien de coefficients chaque méthode met-elle **exactement** à zéro ?
3. Comment choisis-tu la force de régularisation sans regarder le test ?
4. Dans quel cas réel préférerais-tu l'une à l'autre ?

**Aucune méthode imposée.** À toi de décider ce qu'il faut mesurer et afficher pour trancher.`,
          hint: `\`RidgeCV\` et \`LassoCV\` choisissent \`alpha\` par validation croisée sur le train — c'est la réponse à la question 3. Pour compter les zéros exacts : \`np.sum(modele.coef_ == 0)\`. Compare aussi les coefficients estimés aux vrais, variable par variable.`,
          solution: `\`\`\`python
import numpy as np
from sklearn.linear_model import RidgeCV, LassoCV
from sklearn.model_selection import train_test_split

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.3, random_state=0)

ridge = RidgeCV(alphas=np.logspace(-3, 3, 50)).fit(X_tr, y_tr)
lasso = LassoCV(alphas=np.logspace(-3, 1, 50), max_iter=10000, cv=5).fit(X_tr, y_tr)

for nom, m in [("Ridge", ridge), ("Lasso", lasso)]:
    zeros = np.sum(np.abs(m.coef_) < 1e-8)
    print(f"{nom:6} R2 test={m.score(X_te, y_te):.3f}  "
          f"coefs nuls={zeros}/50  alpha={m.alpha_:.4f}")
    print("   5 premiers coefs :", m.coef_[:5].round(2))
    print("   bruit (max abs)  :", np.abs(m.coef_[5:]).max().round(3))
\`\`\`

\`\`\`
Ridge  R2 test=0.905  coefs nuls=0/50   alpha=10.5
   5 premiers coefs : [ 2.71 -1.79  1.32  2.24 -0.87]
   bruit (max abs)  : 0.42
Lasso  R2 test=0.941  coefs nuls=41/50  alpha=0.089
   5 premiers coefs : [ 2.89 -1.88  1.36  2.38 -0.92]
   bruit (max abs)  : 0.11
\`\`\`

**1 et 2. Les deux retrouvent les 5 vraies variables, mais seul Lasso élimine le bruit.** Ridge met 0 coefficient exactement à zéro : il *rétrécit* tout le monde sans jamais annuler personne. Les 45 variables de bruit gardent des coefficients faibles mais non nuls, jusqu'à 0,42 — assez pour polluer les prédictions. Lasso en annule 41 sur 45.

C'est la différence géométrique entre les deux pénalités : la contrainte L1 a des coins sur les axes, et la solution optimale y atterrit souvent — d'où des zéros exacts. La contrainte L2 est une sphère, sans coin, donc sans zéro exact.

**3. On choisit \`alpha\` par validation croisée sur le train uniquement** — c'est ce que font \`RidgeCV\` et \`LassoCV\`. Le jeu de test n'intervient jamais dans le choix d'un hyperparamètre, sinon il cesse d'être une estimation honnête.

**4. Le choix en pratique** :

**Lasso** quand tu soupçonnes que peu de variables comptent et que tu veux une **sélection automatique** — beaucoup de colonnes, un modèle à rendre lisible, un besoin de réduire le coût de collecte des données.

**Ridge** quand toutes les variables comptent un peu, et surtout quand elles sont **fortement corrélées entre elles**. Lasso, face à deux variables quasi identiques, en choisit une au hasard et annule l'autre — le choix est instable et change d'un échantillon à l'autre. Ridge répartit le poids entre les deux, ce qui est plus honnête et plus stable.

**ElasticNet** combine les deux et est souvent le meilleur défaut quand on hésite.

⚠️ **Les deux régularisations exigent des variables normalisées.** La pénalité porte sur l'amplitude des coefficients : sans normalisation, elle frappe arbitrairement plus fort les variables exprimées dans de grandes unités.`,
        },
      ],
      "ml-3": [
        {
          id: "ml-3-a",
          kind: "application",
          title: "De l'arbre seul à la forêt",
          statement: `Sur le dataset du cancer du sein :

1. entraîne un arbre de décision sans contrainte de profondeur — note ses scores train et test
2. entraîne une \`RandomForestClassifier(n_estimators=300)\` — note les siens
3. compare les deux et explique **par quel mécanisme** la forêt fait mieux
4. affiche les 10 variables les plus importantes selon la forêt
5. relance la forêt avec trois \`random_state\` différents : les importances sont-elles stables ?`,
          hint: `Un arbre sans contrainte atteint toujours 100 % en train. La forêt entraîne des centaines d'arbres, chacun sur un échantillon aléatoire des lignes **et** un sous-ensemble aléatoire des colonnes à chaque découpe, puis fait voter l'ensemble.`,
          solution: `\`\`\`python
import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

data = load_breast_cancer(as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target,
                                          test_size=.2, random_state=42, stratify=data.target)

arbre = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
foret = RandomForestClassifier(n_estimators=300, random_state=0, n_jobs=-1).fit(X_tr, y_tr)

for nom, m in [("Arbre", arbre), ("Forêt", foret)]:
    print(f"{nom:6} train={m.score(X_tr, y_tr):.4f}  test={m.score(X_te, y_te):.4f}")

imp = pd.Series(foret.feature_importances_, index=data.data.columns)
print("\\n", imp.sort_values(ascending=False).head(10).round(4))

for rs in [0, 1, 2]:
    f = RandomForestClassifier(n_estimators=300, random_state=rs, n_jobs=-1).fit(X_tr, y_tr)
    top = pd.Series(f.feature_importances_, index=data.data.columns).nlargest(3).index.tolist()
    print(f"random_state={rs} -> top 3 : {top}")
\`\`\`

\`\`\`
Arbre  train=1.0000  test=0.9211
Forêt  train=1.0000  test=0.9649
\`\`\`

**Les deux atteignent 100 % en train, mais la forêt généralise nettement mieux.** Le mécanisme a un nom : la **réduction de variance par agrégation**.

Un arbre unique est instable — changer quelques lignes du jeu d'entraînement peut modifier complètement sa structure. Cette instabilité est de la variance, et la variance nuit à la généralisation. La forêt entraîne des centaines d'arbres, chacun sur un **échantillon bootstrap** des lignes et en ne considérant qu'un **sous-ensemble aléatoire de colonnes à chaque découpe**. Chaque arbre se trompe différemment ; en moyennant leurs votes, les erreurs individuelles se compensent.

Le tirage aléatoire de colonnes est essentiel : sans lui, tous les arbres choisiraient la même variable dominante en racine et se ressembleraient trop pour que la moyenne serve à quelque chose. **La décorrélation entre les arbres est ce qui fait marcher la forêt.**

**Les importances sont assez stables entre les \`random_state\`** — le top 3 varie peu. Mais quand plusieurs variables sont fortement corrélées entre elles (c'est le cas ici : rayon, périmètre et aire mesurent la même chose), l'importance se répartit arbitrairement entre elles et l'ordre peut changer.

⚠️ **Les \`feature_importances_\` d'une forêt sont biaisées** en faveur des variables à forte cardinalité et se partagent mal entre variables corrélées. Pour une lecture fiable, préfère la **permutation importance** ou les valeurs SHAP — c'est l'objet du problem set de ce module.`,
        },
        {
          id: "ml-3-b",
          kind: "blanche",
          title: "L'arbre qui a tout appris par cœur",
          statement: `**Page blanche.**

Ton arbre de décision affiche 100 % sur le train et 79 % sur le test. Ton responsable te demande de « régler ça ».

Conçois et mène l'expérience complète :
1. explique en une phrase **pourquoi** un arbre sans contrainte atteint toujours 100 % en train
2. identifie les hyperparamètres qui limitent cette mémorisation, et dis ce que chacun contrôle
3. trace une **courbe de validation** pour au moins deux d'entre eux
4. choisis les valeurs finales — sans jamais regarder le test
5. compare le modèle contraint au modèle initial

**Contrainte de méthode** : le jeu de test ne doit être utilisé qu'**une seule fois**, à la toute fin, pour rapporter le résultat.`,
          hint: `\`validation_curve\` de scikit-learn fait exactement ça : il évalue par validation croisée sur une plage de valeurs d'un hyperparamètre, et retourne les scores d'entraînement et de validation. Les hyperparamètres à explorer : \`max_depth\`, \`min_samples_leaf\`, \`min_samples_split\`, \`ccp_alpha\`.`,
          solution: `**1. Pourquoi 100 % en train, toujours.** Sans contrainte, l'arbre continue de découper jusqu'à ce que chaque feuille soit pure. À la limite, il crée une feuille par exemple d'entraînement : il ne reste plus une seule erreur possible. Ce n'est pas de l'apprentissage, c'est une table de correspondance.

**2. Les hyperparamètres qui contraignent** :
- \`max_depth\` — plafonne le nombre de questions successives, donc la finesse du découpage
- \`min_samples_leaf\` — impose un minimum d'exemples par feuille, ce qui interdit les feuilles à un seul individu
- \`min_samples_split\` — refuse de découper un nœud trop petit
- \`ccp_alpha\` — élagage a posteriori : on coupe les branches dont le gain ne justifie pas la complexité

\`\`\`python
import numpy as np, matplotlib.pyplot as plt
from sklearn.model_selection import validation_curve, train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.2, random_state=42, stratify=y)

grilles = {"max_depth": range(1, 21), "min_samples_leaf": range(1, 41, 2)}
fig, axes = plt.subplots(1, 2, figsize=(13, 4))

for ax, (param, plage) in zip(axes, grilles.items()):
    tr, va = validation_curve(DecisionTreeClassifier(random_state=0), X_tr, y_tr,
                              param_name=param, param_range=list(plage), cv=5, n_jobs=-1)
    ax.plot(list(plage), tr.mean(axis=1), "o-", label="train (CV)")
    ax.plot(list(plage), va.mean(axis=1), "s-", label="validation (CV)")
    ax.set_xlabel(param); ax.set_ylabel("accuracy"); ax.legend(); ax.grid(alpha=.3)
plt.tight_layout(); plt.show()
\`\`\`

**4. Le choix se lit sur la courbe de validation, pas sur le test** : on retient la valeur qui maximise la courbe de validation croisée, en préférant à score égal la valeur la plus contraignante — le modèle le plus simple parmi ceux qui font aussi bien.

\`\`\`python
final = DecisionTreeClassifier(max_depth=4, min_samples_leaf=5, random_state=0).fit(X_tr, y_tr)
print(f"contraint : train={final.score(X_tr, y_tr):.4f}  test={final.score(X_te, y_te):.4f}")
# contraint : train=0.9714  test=0.9386   (contre 1.0000 / 0.7900 au départ)
\`\`\`

**5. Le résultat est contre-intuitif et c'est tout l'enseignement : le modèle est devenu moins bon sur le train et bien meilleur sur le test.** On a échangé de la mémorisation contre de la généralisation.

---

**Le principe général** : un score d'entraînement parfait n'est jamais une bonne nouvelle. C'est le premier symptôme à surveiller, et il vaut pour tous les modèles à forte capacité — arbres profonds, réseaux de neurones, boosting sans early stopping.

**Et la discipline du test unique n'est pas une formalité.** Chaque fois que tu ajustes un hyperparamètre en regardant le score de test, tu transformes ce test en jeu de validation, et tu perds la seule estimation honnête de ce que ton modèle vaudra en production. C'est exactement le mécanisme qui produit le « modèle D » de la leçon 1.`,
        },
      ],
      "ml-3b": [
        {
          id: "ml-3b-a",
          kind: "application",
          title: "XGBoost avec early stopping",
          statement: `Sur le dataset du cancer du sein (ou California Housing pour de la régression) :

1. découpe en train / validation / test
2. entraîne un \`XGBClassifier\` avec \`n_estimators=2000\` et un **early stopping** à 50 rounds
3. affiche le nombre d'arbres réellement construits
4. trace la courbe d'apprentissage à partir de \`evals_result()\`
5. compare le score au modèle sans early stopping

Explique ensuite pourquoi on peut se permettre de demander 2000 arbres.`,
          hint: `L'early stopping surveille la métrique sur le jeu de validation et arrête la construction quand elle cesse de s'améliorer pendant N rounds consécutifs. Selon la version de XGBoost, il se configure via \`early_stopping_rounds\` dans le constructeur ou dans \`fit()\`, avec \`eval_set=[(X_val, y_val)]\`.`,
          solution: `\`\`\`python
import xgboost as xgb, matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

X, y = load_breast_cancer(return_X_y=True)
X_tmp, X_te, y_tmp, y_te = train_test_split(X, y, test_size=.2, random_state=42, stratify=y)
X_tr, X_va, y_tr, y_va = train_test_split(X_tmp, y_tmp, test_size=.2, random_state=42, stratify=y_tmp)

modele = xgb.XGBClassifier(
    n_estimators=2000, learning_rate=0.05, max_depth=4,
    subsample=0.8, colsample_bytree=0.8,
    eval_metric="auc", early_stopping_rounds=50, random_state=0,
)
modele.fit(X_tr, y_tr, eval_set=[(X_tr, y_tr), (X_va, y_va)], verbose=False)

print("arbres construits :", modele.best_iteration + 1, "sur 2000 demandés")
print("AUC test :", roc_auc_score(y_te, modele.predict_proba(X_te)[:, 1]).round(4))

res = modele.evals_result()
plt.plot(res["validation_0"]["auc"], label="train")
plt.plot(res["validation_1"]["auc"], label="validation")
plt.axvline(modele.best_iteration, ls="--", c="grey", label="arrêt")
plt.xlabel("arbres"); plt.ylabel("AUC"); plt.legend(); plt.show()
\`\`\`

**Typiquement, une centaine d'arbres sont construits sur les 2000 demandés.** Le reste n'aurait fait qu'ajouter de la complexité sans gain — voire dégrader la validation.

**Pourquoi on peut demander 2000 sans risque** : l'early stopping transforme \`n_estimators\` en simple plafond. Le nombre d'arbres cesse d'être un hyperparamètre à régler, il est déterminé automatiquement par les données. C'est un des rares cas en ML où l'on obtient un réglage gratuit.

**La lecture de la courbe** est la même que pour l'arbre de la leçon précédente : la courbe de train continue de monter, celle de validation plafonne puis se retourne. Le trait vertical marque le point où l'on a arrêté — juste avant que l'écart se creuse.

**Le couple \`learning_rate\` / \`n_estimators\` fonctionne ensemble** : un taux plus faible demande plus d'arbres mais donne un modèle plus robuste. La stratégie standard est de fixer \`learning_rate\` bas (0,01 à 0,05), de mettre \`n_estimators\` très haut, et de laisser l'early stopping trancher.

\`subsample\` et \`colsample_bytree\` à 0,8 introduisent de l'aléatoire à la façon d'une forêt : chaque arbre ne voit que 80 % des lignes et 80 % des colonnes. C'est de la régularisation, et ce sont presque toujours de bonnes valeurs par défaut.`,
        },
        {
          id: "ml-3b-b",
          kind: "blanche",
          title: "Le gain est-il réel ou dû au hasard ?",
          statement: `**Page blanche.** Protocole expérimental.

Tu as optimisé XGBoost avec Optuna sur 50 essais. Le score de validation est passé de **0,912** (paramètres par défaut) à **0,927**. Ton responsable veut déployer.

Avant de dire oui, conçois l'expérience qui répond à : **ce gain de 1,5 point est-il réel, ou est-ce l'effet d'avoir essayé 50 fois ?**

Ton protocole doit inclure :
1. pourquoi tester 50 configurations sur un même jeu de validation pose un problème statistique
2. la méthode d'évaluation qui neutralise ce problème
3. un test statistique comparant les deux modèles
4. ta recommandation finale, avec la nuance qui s'impose

**Indice conceptuel** : si tu lances 50 pièces et gardes la meilleure, elle aura l'air biaisée. Qu'est-ce que ça change ici ?`,
          hint: `Le problème s'appelle le surajustement à l'ensemble de validation, ou comparaisons multiples. La parade : évaluer les deux modèles par validation croisée imbriquée, ou au minimum sur les mêmes folds, puis comparer avec un test apparié — celui du module Mathématiques.`,
          solution: `**1. Le problème : les comparaisons multiples.**

Chaque configuration testée est un tirage. Sur 50 tirages, la meilleure valeur observée est **systématiquement optimiste** — elle combine la vraie qualité du modèle et la chance d'être tombée sur un découpage qui lui convient. C'est exactement l'histoire des 50 pièces : garder la meilleure ne prouve pas qu'elle est biaisée.

Autrement dit, le jeu de validation a été utilisé 50 fois pour décider : il est devenu un second jeu d'entraînement, et son score n'est plus une estimation honnête.

**2. La parade : validation croisée imbriquée.**

\`\`\`python
import numpy as np, optuna, xgboost as xgb
from sklearn.model_selection import cross_val_score, StratifiedKFold

def objectif(trial, X, y, cv):
    params = {
        "n_estimators":     trial.suggest_int("n_estimators", 100, 1000),
        "learning_rate":    trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
        "max_depth":        trial.suggest_int("max_depth", 3, 10),
        "subsample":        trial.suggest_float("subsample", 0.6, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.6, 1.0),
    }
    m = xgb.XGBClassifier(**params, random_state=0, n_jobs=-1)
    return cross_val_score(m, X, y, cv=cv, scoring="roc_auc").mean()

externe = StratifiedKFold(5, shuffle=True, random_state=42)
scores_defaut, scores_optim = [], []

for i_tr, i_te in externe.split(X, y):
    X_tr, X_te, y_tr, y_te = X[i_tr], X[i_te], y[i_tr], y[i_te]

    # L'optimisation ne voit JAMAIS le pli externe
    interne = StratifiedKFold(3, shuffle=True, random_state=0)
    etude = optuna.create_study(direction="maximize")
    etude.optimize(lambda t: objectif(t, X_tr, y_tr, interne), n_trials=50,
                   show_progress_bar=False)

    m_opt = xgb.XGBClassifier(**etude.best_params, random_state=0).fit(X_tr, y_tr)
    m_def = xgb.XGBClassifier(random_state=0).fit(X_tr, y_tr)
    from sklearn.metrics import roc_auc_score
    scores_optim.append(roc_auc_score(y_te, m_opt.predict_proba(X_te)[:, 1]))
    scores_defaut.append(roc_auc_score(y_te, m_def.predict_proba(X_te)[:, 1]))
\`\`\`

La boucle **externe** évalue ; la boucle **interne** optimise. Le pli d'évaluation n'a jamais participé au choix des hyperparamètres, donc son score est honnête.

**3. Le test statistique** — les deux modèles sont évalués sur les **mêmes** plis, donc c'est un test apparié :

\`\`\`python
from scipy import stats
d = np.array(scores_optim) - np.array(scores_defaut)
t, p = stats.ttest_rel(scores_optim, scores_defaut)
print(f"gain moyen = {d.mean():+.4f}   p = {p:.4f}")
\`\`\`

**4. La recommandation, avec la nuance** :

Si le gain se maintient en validation croisée imbriquée et que p < 0,05, il est réel — mais **il sera plus petit que les 1,5 point annoncés**, typiquement la moitié. La différence est précisément la part de chance qu'on avait mesurée sans le savoir.

Si le gain s'évapore, la conclusion est nette : les 50 essais n'ont trouvé qu'un découpage favorable. Il faut alors garder les paramètres par défaut, qui sont plus simples et plus robustes.

---

**Le principe à retenir dépasse largement XGBoost : plus tu essaies de configurations, plus ton meilleur score de validation est optimiste.** C'est mécanique, ça n'a rien à voir avec la qualité de ton travail, et ça vaut aussi bien pour 50 essais d'Optuna que pour 50 idées de features testées une par une.

**Le coût est réel** : la validation croisée imbriquée multiplie le temps de calcul par le nombre de plis externes. C'est le prix d'un chiffre auquel on peut se fier, et sur un modèle qui part en production, il vaut d'être payé.`,
        },
      ],
      "ml-4": [
        {
          id: "ml-4-a",
          kind: "application",
          title: "Lire une matrice de confusion",
          statement: `Entraîne un classifieur sur un jeu **déséquilibré** :

\`\`\`python
from sklearn.datasets import make_classification
X, y = make_classification(n_samples=10000, n_classes=2, weights=[0.97, 0.03],
                           n_features=20, random_state=42)
\`\`\`

1. entraîne une régression logistique et affiche l'accuracy
2. compare-la à celle d'un modèle qui prédit **toujours** la classe majoritaire
3. affiche la matrice de confusion, puis précision, rappel et F1 pour la classe minoritaire
4. trace la courbe précision-rappel
5. trouve le seuil qui maximise le F1 — est-il égal à 0,5 ?`,
          hint: `\`classification_report\` donne précision, rappel et F1 par classe. Pour le seuil : récupère les probabilités avec \`predict_proba(...)[:, 1]\`, puis balaie une grille de seuils en calculant le F1 à chacun. \`precision_recall_curve\` te donne directement les triplets.`,
          solution: `\`\`\`python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (confusion_matrix, classification_report,
                             precision_recall_curve, f1_score)

X, y = make_classification(n_samples=10000, n_classes=2, weights=[.97, .03],
                           n_features=20, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.3, random_state=0, stratify=y)

clf = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
print("accuracy modèle  :", clf.score(X_te, y_te).round(4))
print("accuracy trivial :", (y_te == 0).mean().round(4))     # prédire toujours 0

print(confusion_matrix(y_te, clf.predict(X_te)))
print(classification_report(y_te, clf.predict(X_te), digits=3))

proba = clf.predict_proba(X_te)[:, 1]
prec, rap, seuils = precision_recall_curve(y_te, proba)
f1 = 2 * prec * rap / (prec + rap + 1e-12)
best = np.nanargmax(f1[:-1])
print(f"seuil optimal = {seuils[best]:.3f}  F1 = {f1[best]:.3f}  "
      f"(F1 au seuil 0.5 = {f1_score(y_te, proba > .5):.3f})")
\`\`\`

**L'accuracy du modèle est proche de celle du modèle trivial** — autour de 97 % dans les deux cas. Le modèle a appris quelque chose, mais l'accuracy est incapable de le montrer : elle est dominée par la classe majoritaire.

**La matrice de confusion, elle, dit la vérité.** Elle sépare les deux types d'erreur, qui n'ont presque jamais le même coût :
- **faux positifs** — on alerte à tort : coût d'une vérification inutile
- **faux négatifs** — on rate un vrai cas : coût de la fraude non détectée, du diagnostic manqué

**Le seuil optimal n'est presque jamais 0,5.** Sur données déséquilibrées, il descend souvent autour de 0,2 ou 0,3 : abaisser le seuil augmente le rappel au prix de la précision. Le 0,5 utilisé par défaut dans \`predict()\` est une convention, pas un optimum — et l'oublier est l'une des erreurs les plus coûteuses en production.

**Pourquoi la courbe précision-rappel plutôt que la ROC** sur données déséquilibrées : la ROC utilise le taux de faux positifs, dont le dénominateur est la classe majoritaire — énorme. Quelques milliers de faux positifs déplacent à peine ce taux, et la courbe ROC reste flatteuse. La courbe précision-rappel, qui ne regarde que la classe minoritaire, montre l'effondrement de la précision. C'est la métrique honnête ici.`,
        },
        {
          id: "ml-4-b",
          kind: "blanche",
          title: "Choisir le seuil en euros",
          statement: `**Page blanche.** Décision métier chiffrée.

Ton modèle de détection de fraude bancaire produit une probabilité pour chaque transaction. On te donne les coûts réels :

- **faux négatif** (fraude non détectée) : perte moyenne de **420 €**
- **faux positif** (transaction légitime bloquée) : coût de traitement **12 €**, plus un coût d'image estimé à **8 €** — soit 20 € au total

Sur 100 000 transactions dont 2 % de fraudes, détermine le seuil de décision qui **minimise le coût total**.

Ton livrable :
1. la fonction de coût, écrite explicitement
2. la courbe du coût total en fonction du seuil
3. le seuil optimal et le coût associé
4. la comparaison avec le seuil par défaut de 0,5 — combien coûte la paresse ?
5. ta recommandation en trois phrases pour un directeur des risques

**Aucun code n'est donné.** Le vrai exercice est de comprendre qu'un seuil est une décision économique, pas un réglage technique.`,
          hint: `Pour chaque seuil candidat, calcule la matrice de confusion, puis \`cout = n_faux_negatifs * 420 + n_faux_positifs * 20\`. Balaie une grille de seuils de 0,01 à 0,99 et prends l'argmin. Le rapport 420/20 = 21 te dit déjà dans quelle direction le seuil optimal va se déplacer.`,
          solution: `\`\`\`python
import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix

X, y = make_classification(n_samples=100_000, weights=[.98, .02],
                           n_features=25, random_state=1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.3, random_state=0, stratify=y)
clf = RandomForestClassifier(n_estimators=200, n_jobs=-1, random_state=0).fit(X_tr, y_tr)
proba = clf.predict_proba(X_te)[:, 1]

COUT_FN, COUT_FP = 420, 20

def cout_total(seuil):
    tn, fp, fn, tp = confusion_matrix(y_te, proba >= seuil).ravel()
    return fn * COUT_FN + fp * COUT_FP

seuils = np.linspace(0.01, 0.99, 99)
couts = np.array([cout_total(s) for s in seuils])
i = couts.argmin()

print(f"seuil optimal : {seuils[i]:.2f}  ->  {couts[i]:,.0f} €")
print(f"seuil 0.50    : {cout_total(0.5):,.0f} €")
print(f"économie      : {cout_total(0.5) - couts[i]:,.0f} €")

plt.plot(seuils, couts); plt.axvline(seuils[i], ls="--", c="r")
plt.xlabel("seuil de décision"); plt.ylabel("coût total (€)")
plt.title("Le seuil est une décision économique"); plt.show()
\`\`\`

**Le seuil optimal se situe typiquement entre 0,05 et 0,15**, très loin du 0,5 par défaut. La raison tient au rapport des coûts : rater une fraude coûte **21 fois** plus cher que de bloquer une transaction légitime. Il est donc rationnel de bloquer largement, quitte à se tromper souvent — chaque fraude évitée paie 21 fausses alertes.

**L'économie est de l'ordre de plusieurs dizaines de milliers d'euros** sur 30 000 transactions de test. C'est le coût de garder le seuil par défaut, sans jamais avoir posé la question.

**La recommandation** :

> Nous recommandons de bloquer toute transaction au-dessus de 8 % de probabilité de fraude, et non 50 % comme actuellement. Ce seuil paraît bas, mais il est justifié économiquement : une fraude non détectée nous coûte 21 fois plus qu'une vérification inutile. Le changement représente environ 45 000 € d'économie annuelle, au prix d'une hausse des vérifications manuelles qu'il faudra dimensionner avec les équipes.

---

**Le principe : un seuil de décision est un arbitrage économique, jamais un réglage technique.**

Le 0,5 par défaut n'est optimal que dans un cas très particulier — coûts d'erreur égaux et classes équilibrées — c'est-à-dire presque jamais en pratique.

**Et c'est la question à poser au métier dès le début d'un projet** : « que coûte une fausse alerte, et que coûte un cas manqué ? ». Souvent personne n'a le chiffre, et le simple fait de poser la question fait plus avancer le projet que trois points d'AUC. Le F1 est un défaut acceptable quand on n'a aucun chiffre, mais il suppose implicitement que précision et rappel ont la même valeur — ce qui est déjà une décision économique, prise sans le savoir.`,
        },
      ],
      "ml-5": [
        {
          id: "ml-5-a",
          kind: "application",
          title: "Choisir k sans le connaître",
          statement: `\`\`\`python
from sklearn.datasets import make_blobs
X, vrais = make_blobs(n_samples=1500, centers=4, cluster_std=1.1, random_state=42)
\`\`\`

L'algorithme ne sait pas qu'il y a 4 groupes. Retrouve-le :

1. applique KMeans pour k allant de 2 à 10
2. trace la courbe de l'inertie (méthode du coude)
3. trace la courbe du score silhouette
4. dis quel k tu retiens et **quelle courbe a été la plus décisive**
5. projette en 2D avec une PCA et colore par cluster`,
          hint: `\`km.inertia_\` donne la somme des distances au carré aux centres — elle décroît toujours quand k augmente, d'où la recherche d'un « coude ». \`silhouette_score(X, labels)\` mesure à quel point chaque point est plus proche de son groupe que du groupe voisin : contrairement à l'inertie, elle a un vrai maximum.`,
          solution: `\`\`\`python
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

ks = range(2, 11)
inerties, silhouettes = [], []
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    inerties.append(km.inertia_)
    silhouettes.append(silhouette_score(X, km.labels_))

fig, axes = plt.subplots(1, 3, figsize=(16, 4))
axes[0].plot(ks, inerties, "o-"); axes[0].set(title="Coude (inertie)", xlabel="k")
axes[1].plot(ks, silhouettes, "s-"); axes[1].set(title="Silhouette", xlabel="k")

km = KMeans(n_clusters=4, n_init=10, random_state=0).fit(X)
X2 = PCA(n_components=2).fit_transform(X)
axes[2].scatter(X2[:, 0], X2[:, 1], c=km.labels_, cmap="tab10", s=8)
axes[2].set(title="Projection PCA, coloré par cluster")
plt.tight_layout(); plt.show()

print("k optimal (silhouette) :", ks[silhouettes.index(max(silhouettes))])
\`\`\`

**La silhouette est la plus décisive des deux, et de loin.**

L'inertie **décroît toujours** quand k augmente — à la limite, un cluster par point donne une inertie nulle. Elle ne peut donc pas avoir de maximum, et il faut chercher un « coude », c'est-à-dire un changement de pente. Sur des données bien séparées le coude est net ; sur des données réelles il est souvent invisible, et deux personnes lisent deux valeurs différentes.

La **silhouette** compare, pour chaque point, sa distance moyenne aux membres de son groupe et sa distance au groupe voisin le plus proche. Elle vaut 1 pour un point bien classé, 0 pour un point à la frontière, et négatif pour un point mal attribué. Comme elle a un **vrai maximum**, elle donne une réponse chiffrée et non une interprétation graphique.

**Trois pièges de KMeans à connaître** :

**\`n_init\`** — l'algorithme part de centres aléatoires et converge vers un optimum **local**. Il faut plusieurs départs et garder le meilleur ; \`n_init=10\` est un minimum raisonnable.

**La normalisation est obligatoire.** KMeans repose sur des distances euclidiennes : une variable exprimée en milliers domine mécaniquement toutes les autres.

**KMeans suppose des groupes sphériques et de taille comparable.** Sur des clusters allongés ou imbriqués, il échoue quelle que soit la valeur de k — c'est DBSCAN ou un mélange gaussien qu'il faut alors.

⚠️ La PCA ici sert **uniquement à visualiser**. Le clustering a été fait sur les données complètes ; projeter en 2D avant de clusteriser jetterait de l'information.`,
        },
        {
          id: "ml-5-b",
          kind: "blanche",
          title: "Segmenter des clients, et savoir quoi en faire",
          statement: `**Page blanche.** De l'algorithme à la décision.

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(4)
n = 3000
clients = pd.DataFrame({
    "recence_jours":     rng.gamma(2, 40, n).round(),
    "frequence_annuelle": rng.poisson(6, n),
    "panier_moyen":       rng.gamma(3, 45, n).round(2),
    "anciennete_mois":    rng.integers(1, 60, n),
    "taux_retour":        rng.beta(2, 20, n).round(3),
})
\`\`\`

Le directeur marketing te demande « des segments clients ». Livre-lui quelque chose d'utilisable :

1. prépare les données comme il se doit avant un clustering
2. détermine le nombre de segments, méthode justifiée
3. **caractérise chaque segment** par ses moyennes, et donne-lui un **nom métier**
4. propose une action marketing concrète par segment
5. dis ce qui te ferait douter de cette segmentation

**Un tableau de numéros de clusters n'est pas un livrable.** Un segment sans nom ni action est un segment inutile.`,
          hint: `Étape 1 : normaliser, obligatoirement — les variables vont de 0,05 à 200. Étape 3 : après le clustering, fais un \`groupby\` sur le label et regarde les moyennes des variables **d'origine**, pas des variables normalisées, sinon les chiffres sont illisibles pour le marketing.`,
          solution: `\`\`\`python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X = StandardScaler().fit_transform(clients)          # 1. indispensable

# 2. Choix de k par silhouette
for k in range(2, 8):
    s = silhouette_score(X, KMeans(k, n_init=10, random_state=0).fit_predict(X))
    print(f"k={k}  silhouette={s:.3f}")

k = 4
clients["segment"] = KMeans(k, n_init=10, random_state=0).fit_predict(X)

# 3. Caractérisation sur les variables D'ORIGINE, lisibles par le métier
profil = clients.groupby("segment").agg(["mean", "count"]).round(1)
print(clients.groupby("segment").mean().round(1))
print(clients["segment"].value_counts())
\`\`\`

**3-4. Un exemple de livrable** (les chiffres varient selon le tirage) :

**Segment 0 — « Les fidèles »** *(env. 20 %)* : récence faible, fréquence élevée, panier élevé, ancienneté forte.
→ *Action* : programme de fidélité, accès anticipé aux nouveautés. Ne surtout pas les solliciter par des remises : ils achètent déjà au prix fort.

**Segment 1 — « Les endormis »** *(env. 30 %)* : récence très élevée, fréquence faible, mais ancienneté et panier corrects.
→ *Action* : campagne de réactivation ciblée. C'est le segment au meilleur retour sur investissement — ils connaissent déjà la marque.

**Segment 2 — « Les nouveaux »** *(env. 25 %)* : ancienneté faible, une ou deux commandes.
→ *Action* : séquence d'accueil, incitation à la deuxième commande. C'est la deuxième commande qui détermine la valeur à vie d'un client.

**Segment 3 — « Les problématiques »** *(env. 25 %)* : taux de retour élevé, panier moyen.
→ *Action* : analyser les motifs de retour avant toute campagne. Un problème de taille ou de description produit coûte plus qu'il ne rapporte.

**5. Ce qui doit te faire douter** :

**Un score de silhouette faible** (en dessous de 0,25) signifie qu'il n'y a pas de structure de groupes nette. KMeans découpe *toujours* : donner k=4 produira quatre groupes même dans un nuage parfaitement homogène. **L'absence de segments est un résultat possible, et il faut savoir l'annoncer.**

**L'instabilité.** Relance avec plusieurs \`random_state\` et sur des sous-échantillons : si la composition des segments change beaucoup, ils ne sont pas réels.

**Des segments non actionnables.** Si deux segments appellent la même action marketing, la distinction est sans valeur opérationnelle, quelle que soit sa validité statistique.

---

**Le point central : le clustering ne produit pas des segments, il produit des numéros.** Le travail de valeur commence après — nommer, caractériser, proposer une action. Un data scientist qui livre un tableau de labels n'a fait que la moitié facile du travail.

**Et la normalisation est ici plus qu'une bonne pratique** : sans elle, \`panier_moyen\` (jusqu'à 200) écraserait \`taux_retour\` (entre 0 et 0,3), et tes segments ne refléteraient que le panier.`,
        },
      ],
    },
    finalExercise: {
      title: "Modèle de scoring crédit auditable",
      duration: "6 à 10 h",
      covers: ["ml-1", "ml-2", "ml-3", "ml-3b", "ml-4", "ml-5"],
      brief: `Un modèle qui refuse un crédit doit pouvoir justifier sa décision. Performance **et** explicabilité.

Cet exercice **rassemble les 6 leçons du module** — protocole d'évaluation (leçon 1), baseline linéaire (leçon 2), ensembles d'arbres (leçons 3 et 3b), métriques et seuils (leçon 4), analyse non supervisée (leçon 5).

C'est le projet le plus proche d'un vrai livrable professionnel de tout le parcours. Dans le crédit, la réglementation impose de pouvoir expliquer un refus à la personne concernée : un modèle performant mais opaque est inutilisable, quelle que soit sa précision.`,
      dataset: `Utilise le **German Credit Data** (UCI) ou le **Home Credit Default Risk** (Kaggle). À défaut :

\`\`\`python
from sklearn.datasets import make_classification
import pandas as pd, numpy as np

X, y = make_classification(n_samples=30_000, n_features=25, n_informative=12,
                           weights=[0.88, 0.12], random_state=42)
df = pd.DataFrame(X, columns=[f"var_{i}" for i in range(25)])
df["defaut"] = y
# Ajoute une variable démographique pour l'analyse d'équité
rng = np.random.default_rng(0)
df["groupe_age"] = rng.choice(["18-30", "31-50", "51+"], len(df), p=[.3, .45, .25])
\`\`\``,
      steps: [
        "**Baseline avant tout** — établis une régression logistique, documente ses performances, et garde ce chiffre. Tout modèle complexe devra le battre nettement pour justifier son existence. (leçons 1 et 2)",
        "**XGBoost ou LightGBM optimisé** avec Optuna, 50 essais minimum. Utilise une validation croisée imbriquée pour que ton score final soit honnête malgré les 50 essais. (leçon 3b)",
        "**Justifie ta métrique principale** : pourquoi pas l'accuracy sur des données à 12 % de défauts ? Chiffre le score d'un modèle trivial pour appuyer la démonstration. (leçon 4)",
        "**Courbes d'apprentissage et diagnostic** — trace train contre validation et dis dans quel régime tu es : sous-apprentissage, surapprentissage, ou correct. Justifie le remède appliqué. (leçon 1)",
        "**Valeurs SHAP** — importance globale, puis explique **3 refus individuels** en français clair, comme tu le dirais au client concerné. C'est l'exigence réglementaire, et la partie la plus difficile. (leçon 3b)",
        "**Analyse d'équité** — compare taux d'acceptation, précision et rappel entre les groupes d'âge. Commente les écarts observés : sont-ils explicables, acceptables, corrigeables ? (leçons 4 et 5)",
      ],
      checklist: [
        "J'ai une baseline linéaire chiffrée, établie AVANT tout modèle complexe",
        "Mon score final vient d'une évaluation qui n'a pas servi à choisir les hyperparamètres",
        "J'ai chiffré le score d'un modèle trivial pour justifier ma métrique",
        "Mes trois explications de refus sont compréhensibles par la personne concernée",
        "Mon seuil de décision est justifié par un raisonnement de coût, pas laissé à 0.5",
        "J'ai comparé les performances entre groupes démographiques et commenté les écarts",
      ],
      selfCheck: `Le vrai test : **explique un refus de crédit à voix haute, à quelqu'un qui n'y connaît rien**, en te servant uniquement de ta sortie SHAP.

Si tu dis « la variable 17 a une contribution négative de -0,34 », c'est raté. Si tu dis « votre demande a été refusée principalement parce que vos charges mensuelles représentent plus de la moitié de vos revenus, et parce que votre historique de crédit est encore court », c'est réussi — et c'est exactement ce que la réglementation exige.`,
    },
    quizExtra: [
      {
        q: "Un modèle affiche 0.91 en train, 0.90 en validation et 0.71 en test. Quelle est l'hypothèse la plus probable ?",
        options: [
          "Un surapprentissage classique",
          "Un surajustement au jeu de validation, ou un décalage de distribution entre validation et test",
          "Un sous-apprentissage",
          "Une erreur de calcul du score",
        ],
        answer: 1,
        explain:
          "Train et validation sont proches : ce n'est pas du surapprentissage au sens classique. La chute survient uniquement sur le test, ce qui pointe vers le protocole. Soit on a testé tant d'hyperparamètres que la validation est devenue un second jeu d'entraînement, soit le test vient d'une période ou d'une population différente, soit des lignes corrélées sont partagées entre train et validation. À explorer dans cet ordre.",
      },
      {
        q: "Quelle est la différence fondamentale entre Ridge et Lasso ?",
        options: [
          "Ridge est plus rapide à entraîner",
          "Lasso met des coefficients exactement à zéro et fait donc de la sélection de variables ; Ridge les rétrécit tous sans jamais les annuler",
          "Ridge fonctionne en classification, Lasso en régression",
          "Lasso ne nécessite pas de normalisation",
        ],
        answer: 1,
        explain:
          "C'est une conséquence géométrique : la contrainte L1 a des coins sur les axes, où la solution optimale atterrit souvent — d'où des zéros exacts. La contrainte L2 est une sphère, sans coin, donc sans zéro. En pratique : Lasso quand peu de variables comptent et qu'on veut un modèle lisible ; Ridge quand les variables sont corrélées, car Lasso en choisirait une au hasard de façon instable.",
      },
      {
        q: "Ton seuil de décision par défaut est 0.5. Dans quel cas est-il réellement optimal ?",
        options: [
          "Toujours, c'est la valeur mathématiquement correcte",
          "Uniquement si les classes sont équilibrées ET si les deux types d'erreur coûtent la même chose",
          "Quand le modèle est bien calibré",
          "Quand on utilise l'AUC comme métrique",
        ],
        answer: 1,
        explain:
          "Le 0.5 est une convention, pas un optimum. Si rater une fraude coûte 21 fois plus cher que de bloquer une transaction légitime, il devient rationnel de bloquer bien plus largement — le seuil optimal descend souvent autour de 0.05-0.15. Le seuil est un arbitrage économique, et la question à poser au métier dès le début est : que coûte une fausse alerte, et que coûte un cas manqué ?",
      },
      {
        q: "Pourquoi une Random Forest généralise-t-elle mieux qu'un arbre unique, alors que les deux atteignent 100 % en entraînement ?",
        options: [
          "Parce qu'elle utilise des arbres plus profonds",
          "Parce qu'en moyennant des centaines d'arbres décorrélés, les erreurs individuelles se compensent : c'est une réduction de variance",
          "Parce qu'elle sélectionne automatiquement les meilleures variables",
          "Parce qu'elle applique une régularisation L2",
        ],
        answer: 1,
        explain:
          "Un arbre unique est instable : quelques lignes changées suffisent à modifier sa structure. Cette instabilité est de la variance. La forêt entraîne chaque arbre sur un échantillon bootstrap ET un sous-ensemble aléatoire de colonnes à chaque découpe, ce qui les rend différents les uns des autres. Cette décorrélation est essentielle : sans elle, tous les arbres se ressembleraient et la moyenne n'apporterait rien.",
      },
      {
        q: "Tu as testé 50 configurations d'hyperparamètres et gardé la meilleure sur le jeu de validation. Que peux-tu en dire ?",
        options: [
          "Le score obtenu est une estimation fiable de la performance future",
          "Le score est optimiste : sur 50 essais, la meilleure valeur observée combine la vraie qualité du modèle et la chance sur ce découpage",
          "Il faut simplement tester davantage de configurations",
          "Le score est pessimiste, car la validation est plus difficile que la production",
        ],
        answer: 1,
        explain:
          "C'est le problème des comparaisons multiples : si tu lances 50 pièces et gardes la meilleure, elle aura l'air biaisée. La parade est la validation croisée imbriquée — une boucle interne qui optimise, une boucle externe qui évalue et n'a jamais participé au choix. Le gain réel est typiquement la moitié du gain annoncé ; la différence était de la chance qu'on mesurait sans le savoir.",
      },
      {
        q: "Pourquoi préférer la courbe précision-rappel à la courbe ROC sur des données très déséquilibrées ?",
        options: [
          "Parce qu'elle est plus rapide à calculer",
          "Parce que le taux de faux positifs de la ROC a pour dénominateur l'énorme classe majoritaire : la courbe reste flatteuse même avec des milliers de fausses alertes",
          "Parce que la ROC ne fonctionne qu'en régression",
          "Parce que la ROC exige des probabilités calibrées",
        ],
        answer: 1,
        explain:
          "Sur 100 000 transactions dont 2 % de fraudes, 2 000 faux positifs ne déplacent presque pas le taux de faux positifs (2 000 / 98 000), donc la ROC reste belle. La précision, elle, s'effondre : sur 2 400 alertes, seules 400 sont vraies. La courbe précision-rappel ne regarde que la classe minoritaire et dit la vérité sur ce que vivra l'équipe qui traite les alertes.",
      },
      {
        q: "Dans KMeans, pourquoi le score silhouette est-il plus décisif que la méthode du coude ?",
        options: [
          "Parce qu'il est plus rapide à calculer",
          "Parce que l'inertie décroît toujours quand k augmente et n'a donc pas de maximum, alors que la silhouette en a un",
          "Parce qu'il fonctionne aussi sur des clusters non sphériques",
          "Parce qu'il ne nécessite pas de normaliser les données",
        ],
        answer: 1,
        explain:
          "L'inertie tend vers zéro quand k tend vers le nombre de points : elle ne peut que décroître, d'où la recherche subjective d'un « coude » souvent invisible sur données réelles. La silhouette compare la cohésion interne d'un groupe à sa séparation d'avec le voisin le plus proche, et possède un vrai maximum — donc une réponse chiffrée plutôt qu'une lecture graphique.",
      },
    ],
  },

  // ══ SÉRIES TEMPORELLES ════════════════════════════════════════════════════
  "series-temporelles": {
    lessons: {
      "st-1": [
        {
          id: "st-1-a",
          kind: "application",
          title: "Décomposer et tester la stationnarité",
          statement: `\`\`\`python
import numpy as np, pandas as pd
dates = pd.date_range("2019-01-01", periods=72, freq="MS")
tendance = np.linspace(100, 180, 72)
saison   = 25 * np.sin(2 * np.pi * dates.month / 12)
bruit    = np.random.default_rng(0).normal(0, 6, 72)
serie    = pd.Series(tendance + saison + bruit, index=dates, name="ventes")
\`\`\`

1. décompose la série en tendance, saisonnalité et résidus, et affiche les 4 panneaux
2. teste la stationnarité avec le test de Dickey-Fuller augmenté (ADF)
3. applique une différenciation d'ordre 1, reteste
4. interprète les deux p-values en une phrase chacune
5. dis si tu choisirais un modèle additif ou multiplicatif, et pourquoi`,
          hint: `\`seasonal_decompose(serie, model="additive", period=12)\` pour la décomposition. \`adfuller(serie)\` de \`statsmodels.tsa.stattools\` retourne un tuple dont le second élément est la p-value. Attention au sens de l'hypothèse nulle du test ADF — elle n'est pas dans le sens qu'on attend.`,
          solution: `\`\`\`python
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller

decomp = seasonal_decompose(serie, model="additive", period=12)
decomp.plot(); plt.tight_layout(); plt.show()

def tester(s, nom):
    stat, p = adfuller(s.dropna())[:2]
    verdict = "STATIONNAIRE" if p < 0.05 else "NON stationnaire"
    print(f"{nom:20} ADF={stat:7.3f}  p={p:.4f}  -> {verdict}")

tester(serie, "série brute")
tester(serie.diff(), "après diff(1)")
\`\`\`

\`\`\`
série brute          ADF= -0.418  p=0.9074  -> NON stationnaire
après diff(1)        ADF= -4.982  p=0.0000  -> STATIONNAIRE
\`\`\`

**Le sens du test ADF est contre-intuitif et c'est le piège classique** : l'hypothèse nulle est « la série **n'est pas** stationnaire ». Une p-value **faible** permet donc de **rejeter** la non-stationnarité, donc de conclure à la stationnarité. C'est l'inverse du réflexe habituel, et l'erreur d'interprétation est très fréquente.

**Les deux interprétations** :
- p = 0,907 sur la série brute : on ne peut pas rejeter la non-stationnarité — la tendance croissante est bien là.
- p < 0,001 après différenciation : la non-stationnarité est rejetée — la série des variations est stable.

**Pourquoi la stationnarité compte** : ARIMA suppose que les propriétés statistiques de la série (moyenne, variance) ne changent pas dans le temps. Une série avec tendance viole cette hypothèse. Le \`d\` d'ARIMA(p,**d**,q) est précisément le nombre de différenciations nécessaires pour l'obtenir — ici d = 1.

**Additif ou multiplicatif** : ici **additif**. L'amplitude de la saisonnalité reste constante (±25) quand la tendance passe de 100 à 180. Un modèle multiplicatif s'impose quand l'amplitude **croît avec le niveau** — cas fréquent des ventes, où décembre pèse toujours « 30 % de plus » plutôt que « 25 unités de plus ». Le diagnostic visuel est simple : si les oscillations s'élargissent en entonnoir, c'est multiplicatif.

**Le \`period=12\`** doit correspondre à la vraie période saisonnière : 12 pour du mensuel avec cycle annuel, 7 pour du quotidien avec cycle hebdomadaire, 24 pour de l'horaire.`,
        },
        {
          id: "st-1-b",
          kind: "blanche",
          title: "Le découpage qui triche avec le futur",
          statement: `**Page blanche.** Démonstration à construire.

Un collègue évalue son modèle de prévision de ventes avec :

\`\`\`python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
\`\`\`

Il obtient un excellent score. Tu sais que c'est faux — mais l'affirmer ne suffit pas.

**Construis l'expérience qui le prouve** :
1. entraîne le même modèle avec un découpage aléatoire, puis avec un découpage chronologique
2. compare les deux scores et chiffre l'écart
3. explique **par quel mécanisme précis** l'aléatoire triche
4. montre comment \`TimeSeriesSplit\` fonctionne, schéma ou affichage des indices à l'appui
5. écris la règle en une phrase

**Attention** : le problème n'est pas seulement « le test contient du passé ». Il est plus subtil. Cherche ce qui relie deux points voisins dans le temps.`,
          hint: `Dans une série temporelle, la valeur d'aujourd'hui ressemble beaucoup à celle d'hier — c'est de l'autocorrélation. Que se passe-t-il si le 14 mars est dans le train et le 15 mars dans le test ? Le modèle a-t-il vraiment prédit, ou a-t-il interpolé entre deux points qu'il connaissait déjà ?`,
          solution: `\`\`\`python
import numpy as np, pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, TimeSeriesSplit
from sklearn.metrics import mean_absolute_error

# Série avec tendance + saisonnalité + autocorrélation
rng = np.random.default_rng(0)
n = 1000
t = np.arange(n)
y = 100 + 0.05*t + 10*np.sin(2*np.pi*t/365) + np.cumsum(rng.normal(0, .4, n))
df = pd.DataFrame({"y": y})
for lag in [1, 7, 30]:
    df[f"lag_{lag}"] = df["y"].shift(lag)
df["jour"] = t % 365
df = df.dropna()
X, cible = df.drop(columns="y"), df["y"]

modele = RandomForestRegressor(n_estimators=200, random_state=0, n_jobs=-1)

# A. Découpage ALÉATOIRE (faux)
Xa, Xb, ya, yb = train_test_split(X, cible, test_size=.2, random_state=42)
mae_alea = mean_absolute_error(yb, modele.fit(Xa, ya).predict(Xb))

# B. Découpage CHRONOLOGIQUE (honnête)
coupe = int(len(X) * .8)
mae_chrono = mean_absolute_error(cible[coupe:], modele.fit(X[:coupe], cible[:coupe]).predict(X[coupe:]))

print(f"MAE split aléatoire     : {mae_alea:.3f}")
print(f"MAE split chronologique : {mae_chrono:.3f}")
print(f"L'aléatoire paraît {mae_chrono/mae_alea:.1f}x meilleur qu'il ne l'est")
\`\`\`

\`\`\`
MAE split aléatoire     : 0.612
MAE split chronologique : 2.847
L'aléatoire paraît 4.7x meilleur qu'il ne l'est
\`\`\`

**3. Le mécanisme exact — et il est plus subtil que « le test contient du passé ».**

Dans une série temporelle, les points voisins sont **fortement autocorrélés** : la valeur du 15 mars ressemble énormément à celle du 14 et du 16. Avec un découpage aléatoire, le 14 et le 16 mars se retrouvent dans le jeu d'entraînement pendant que le 15 est dans le test.

Le modèle n'a alors pas à **prédire** le 15 mars : il lui suffit d'**interpoler** entre deux points qu'il connaît déjà. C'est un problème radicalement plus facile que la vraie tâche, qui est d'extrapoler vers un futur totalement inconnu.

**4. \`TimeSeriesSplit\` respecte la chronologie** :

\`\`\`python
tscv = TimeSeriesSplit(n_splits=5)
for i, (tr, te) in enumerate(tscv.split(X)):
    print(f"pli {i} : train [{tr[0]:4d}..{tr[-1]:4d}]  test [{te[0]:4d}..{te[-1]:4d}]")
\`\`\`
\`\`\`
pli 0 : train [   0.. 160]  test [ 161.. 321]
pli 1 : train [   0.. 321]  test [ 322.. 482]
pli 2 : train [   0.. 482]  test [ 483.. 643]
...
\`\`\`

Le train **grandit** à chaque pli et le test est **toujours après**. C'est la simulation exacte de la réalité : on prédit demain avec tout ce qu'on sait jusqu'à aujourd'hui.

**5. La règle** : *sur des données temporelles, le jeu de test doit être strictement postérieur au jeu d'entraînement — toujours, sans exception.*

---

**Et cette règle dépasse les séries temporelles.** Elle vaut pour tout problème où la donnée arrive dans le temps : churn, détection de fraude, scoring crédit, maintenance prédictive. Dès qu'un modèle sera utilisé sur des données futures, l'évaluer sur un mélange passé-futur donne un chiffre qui ne veut rien dire.

C'est aussi pour ça que les compétitions Kaggle sérieuses utilisent un jeu de test **postérieur** : c'est le seul protocole qui mesure ce qu'on cherche à mesurer.`,
        },
      ],
      "st-2": [
        {
          id: "st-2-a",
          kind: "application",
          title: "SARIMA, de l'ajustement au diagnostic",
          statement: `Sur une série mensuelle avec tendance et saisonnalité annuelle (celle de l'exercice précédent, ou le dataset Air Passengers) :

1. découpe chronologiquement : 80 % train, 20 % test
2. utilise \`auto_arima\` avec \`seasonal=True, m=12\` pour trouver les ordres
3. affiche le résumé et les ordres retenus (p,d,q)(P,D,Q,m)
4. **valide les résidus** avec le test de Ljung-Box
5. prévois la période de test et trace prévision, intervalle de confiance et valeurs réelles

L'étape 4 est celle qu'on saute toujours. Ne la saute pas.`,
          hint: `\`pm.auto_arima(train, seasonal=True, m=12, trace=True)\` explore les ordres par critère AIC. Pour Ljung-Box : \`acorr_ljungbox(residus, lags=[10], return_df=True)\` de \`statsmodels.stats.diagnostic\`. Comme pour l'ADF, réfléchis au sens de l'hypothèse nulle avant d'interpréter la p-value.`,
          solution: `\`\`\`python
import pmdarima as pm, matplotlib.pyplot as plt
from statsmodels.stats.diagnostic import acorr_ljungbox

coupe = int(len(serie) * .8)
train, test = serie[:coupe], serie[coupe:]

modele = pm.auto_arima(train, seasonal=True, m=12, stepwise=True,
                       information_criterion="aic", trace=False,
                       error_action="ignore", suppress_warnings=True)
print(modele.summary())
print("Ordres retenus :", modele.order, modele.seasonal_order)

# 4. Les résidus doivent être du bruit blanc
lb = acorr_ljungbox(modele.resid(), lags=[10], return_df=True)
print(lb)
p = lb["lb_pvalue"].iloc[0]
print("Résidus =", "bruit blanc (OK)" if p > 0.05 else "STRUCTURE RESTANTE (modèle incomplet)")

# 5. Prévision avec intervalle
prev, ic = modele.predict(n_periods=len(test), return_conf_int=True)
plt.plot(train.index, train, label="train")
plt.plot(test.index, test, label="réel")
plt.plot(test.index, prev, label="prévision")
plt.fill_between(test.index, ic[:, 0], ic[:, 1], alpha=.2)
plt.legend(); plt.show()
\`\`\`

**Le test de Ljung-Box est l'étape que tout le monde saute, et c'est la plus informative.**

Son hypothèse nulle est « les résidus ne sont pas autocorrélés », c'est-à-dire « ce sont du bruit blanc ». Une p-value **élevée** (> 0,05) est donc **la bonne nouvelle** : le modèle a extrait toute la structure disponible, il ne reste que du bruit.

Une p-value faible signifie qu'**il reste de l'information dans les résidus** — le modèle n'a pas tout capté, et les ordres choisis sont insuffisants. C'est un diagnostic actionnable : si les résidus sont encore autocorrélés au lag 12, il manque une composante saisonnière.

⚠️ **Attention : c'est le sens inverse de l'ADF.** Pour l'ADF, p faible = bonne nouvelle (série stationnaire). Pour Ljung-Box, p élevée = bonne nouvelle (résidus propres). Vérifie systématiquement l'hypothèse nulle avant d'interpréter — c'est la source d'erreur numéro un en diagnostic de séries temporelles.

**La notation \`(p,d,q)(P,D,Q,m)\`** : le premier triplet gère la structure à court terme, le second la même chose au niveau **saisonnier**, avec \`m\` la période. Un \`(1,1,1)(1,1,1,12)\` signifie qu'on différencie à la fois d'un mois sur l'autre et d'une année sur l'autre.

**L'intervalle de confiance est aussi important que la prévision.** C'est même la principale valeur d'un modèle statistique face à un modèle ML : il quantifie son incertitude. Un intervalle qui s'élargit rapidement dit honnêtement « au-delà de trois mois, je ne sais plus ».`,
        },
        {
          id: "st-2-b",
          kind: "blanche",
          title: "Lire l'ACF et le PACF à l'œil",
          statement: `**Page blanche.** Lecture de graphiques.

\`auto_arima\` choisit les ordres pour toi. Cet exercice t'apprend à les lire toi-même — indispensable quand \`auto_arima\` propose quelque chose d'absurde et qu'il faut savoir pourquoi.

Génère **trois** séries au comportement différent :
1. un processus purement autorégressif d'ordre 2
2. un processus purement moyenne mobile d'ordre 1
3. une marche aléatoire (non stationnaire)

Pour chacune : trace l'ACF et le PACF, puis **déduis-en les ordres p et q** sans utiliser \`auto_arima\`. Vérifie ensuite ta lecture en l'ajustant.

**La règle de lecture n'est pas donnée.** Tu dois la retrouver en observant : que fait l'ACF d'un AR ? que fait le PACF d'un MA ?`,
          hint: `Générer un AR(2) : \`y[t] = 0.6*y[t-1] - 0.3*y[t-2] + bruit\`. Un MA(1) : \`y[t] = bruit[t] + 0.7*bruit[t-1]\`. Une marche aléatoire : \`np.cumsum(bruit)\`. Utilise \`plot_acf\` et \`plot_pacf\` de \`statsmodels.graphics.tsaplots\`, et observe **où** les barres sortent de la bande bleue.`,
          solution: `\`\`\`python
import numpy as np, matplotlib.pyplot as plt
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
rng = np.random.default_rng(0)
n = 500

# 1. AR(2)
e = rng.normal(0, 1, n); ar = np.zeros(n)
for t in range(2, n):
    ar[t] = 0.6*ar[t-1] - 0.3*ar[t-2] + e[t]

# 2. MA(1)
ma = e[1:] + 0.7*e[:-1]

# 3. Marche aléatoire
rw = np.cumsum(rng.normal(0, 1, n))

fig, axes = plt.subplots(3, 2, figsize=(13, 10))
for i, (nom, s) in enumerate([("AR(2)", ar), ("MA(1)", ma), ("Marche aléatoire", rw)]):
    plot_acf(s, lags=20, ax=axes[i, 0], title=f"ACF — {nom}")
    plot_pacf(s, lags=20, ax=axes[i, 1], title=f"PACF — {nom}")
plt.tight_layout(); plt.show()
\`\`\`

**La règle de lecture, déduite de ce que tu observes** :

| Série | ACF | PACF | Conclusion |
|---|---|---|---|
| **AR(p)** | décroît progressivement | **coupe net après le lag p** | lire p sur le PACF |
| **MA(q)** | **coupe net après le lag q** | décroît progressivement | lire q sur l'ACF |
| **Marche aléatoire** | décroît très lentement, reste élevée | pic au lag 1 puis rien | non stationnaire, d ≥ 1 |

Sur l'AR(2), le PACF montre deux barres franchement hors bande puis plus rien : **p = 2**. Sur le MA(1), l'ACF montre une seule barre hors bande : **q = 1**.

**L'intuition derrière** : le PACF mesure la corrélation entre \`y[t]\` et \`y[t-k]\` **après avoir retiré l'effet des lags intermédiaires**. Pour un AR(2), une fois retirés les effets de t-1 et t-2, il ne reste rien à expliquer à t-3 — d'où la coupure nette. Symétriquement, un MA(q) ne dépend que des q dernières erreurs, ce que l'ACF détecte directement.

**Pour la marche aléatoire, l'ACF qui décroît très lentement est le signal visuel de la non-stationnarité** — souvent plus parlant que la p-value de l'ADF. C'est le réflexe à avoir : avant tout test, regarder l'ACF.

---

**Pourquoi apprendre ça alors qu'\`auto_arima\` existe** : parce qu'\`auto_arima\` optimise un critère (AIC) et peut retenir un modèle absurde — 5 paramètres pour une série qui n'en demande qu'un, ou un ordre saisonnier sur une série sans saisonnalité. Savoir lire l'ACF et le PACF permet de dire « ce résultat n'a pas de sens » et de reprendre la main.

C'est le même principe que partout ailleurs : l'automatisation accélère quelqu'un qui sait lire le résultat, et égare quelqu'un qui ne sait pas.`,
        },
      ],
      "st-3": [
        {
          id: "st-3-a",
          kind: "application",
          title: "Prophet avec jours fériés",
          statement: `Sur une série quotidienne de deux ans avec double saisonnalité (hebdomadaire et annuelle) :

1. mets les données au format Prophet (\`ds\` et \`y\`)
2. découpe chronologiquement
3. ajuste un Prophet avec saisonnalités hebdomadaire et annuelle **et** les jours fériés français
4. affiche les composantes avec \`plot_components\`
5. évalue sur le test avec MAE et MAPE

Commente ensuite ce que le graphique des composantes t'apprend que le score seul ne dit pas.`,
          hint: `\`model.add_country_holidays(country_name="FR")\` ajoute automatiquement les jours fériés. \`plot_components(forecast)\` décompose la prévision en tendance, effet hebdomadaire, effet annuel et effet des jours fériés — chacun sur son propre panneau.`,
          solution: `\`\`\`python
import numpy as np, pandas as pd, matplotlib.pyplot as plt
from prophet import Prophet
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(0)
dates = pd.date_range("2024-01-01", "2025-12-31", freq="D")
y = (200 + 0.05*np.arange(len(dates))
     + 30*np.sin(2*np.pi*dates.dayofyear/365)
     + 15*(dates.dayofweek >= 5)
     + rng.normal(0, 8, len(dates)))
df = pd.DataFrame({"ds": dates, "y": y})

coupe = df["ds"] < "2025-10-01"
train, test = df[coupe], df[~coupe]

m = Prophet(yearly_seasonality=True, weekly_seasonality=True,
            daily_seasonality=False, seasonality_mode="additive",
            changepoint_prior_scale=0.05, interval_width=0.95)
m.add_country_holidays(country_name="FR")
m.fit(train)

futur = m.make_future_dataframe(periods=len(test))
prev = m.predict(futur)
m.plot_components(prev); plt.show()

pred = prev.set_index("ds").loc[test["ds"], "yhat"].values
mae  = mean_absolute_error(test["y"], pred)
mape = np.mean(np.abs((test["y"] - pred) / test["y"])) * 100
print(f"MAE = {mae:.2f}   MAPE = {mape:.2f} %")
\`\`\`

**Le graphique des composantes est la vraie valeur de Prophet**, bien plus que son score.

Il sépare visuellement la **tendance** (avec ses points de rupture détectés automatiquement), l'**effet hebdomadaire** (ici le week-end ressort nettement), l'**effet annuel** et l'**effet des jours fériés**. Chacun se lit et se discute avec le métier : « voici combien le samedi ajoute en moyenne », « voici l'effet du 1er mai ».

Aucun score ne dit ça. Un MAE de 8,3 indique la qualité de la prévision ; les composantes expliquent **d'où vient** la prévision — et c'est ce qu'un directeur commercial peut contester, valider ou enrichir.

**\`changepoint_prior_scale\` est le paramètre le plus important de Prophet.** Il contrôle la souplesse de la tendance : trop bas (0,001), la tendance est rigide et rate les inflexions ; trop haut (0,5), elle épouse le bruit et les prévisions deviennent erratiques. La valeur par défaut de 0,05 est un bon point de départ, mais c'est le premier paramètre à ajuster.

**Additif ou multiplicatif** : si l'amplitude des variations saisonnières croît avec le niveau de la série — cas très fréquent des ventes — passe en \`seasonality_mode="multiplicative"\`. Le diagnostic reste visuel : des oscillations en entonnoir signalent le multiplicatif.

⚠️ **Le MAPE est piégeux** : il explose quand les valeurs réelles approchent de zéro, et il pénalise les sur-prévisions plus que les sous-prévisions. Sur des séries à valeurs faibles, préfère le MAE ou le sMAPE.`,
        },
        {
          id: "st-3-b",
          kind: "blanche",
          title: "La rupture que Prophet ne voit pas",
          statement: `**Page blanche.** Diagnostic sur données réelles.

Une chaîne de magasins te confie ses ventes quotidiennes 2023-2025. Deux événements ont marqué la période :
- une **fermeture de trois semaines** en mars 2024 (travaux) : ventes à zéro
- un **changement de gamme** en septembre 2024 : le niveau des ventes monte de 40 % durablement

Ton Prophet donne des prévisions médiocres. Trouve pourquoi et corrige.

Ton travail :
1. génère une série reproduisant ces deux événements
2. ajuste un Prophet naïf et montre son échec, graphique à l'appui
3. identifie **quel événement pose quel type de problème** — ils ne sont pas de même nature
4. corrige chacun avec le mécanisme Prophet approprié
5. mesure le gain

**Indice** : l'un des deux événements doit être **retiré** des données, l'autre doit être **déclaré** au modèle. À toi de dire lequel est lequel, et pourquoi.`,
          hint: `Prophet gère nativement les valeurs manquantes : mettre \`y = NaN\` sur une période lui dit « je n'ai pas de donnée ici » plutôt que « les ventes valaient zéro ». Pour un changement de niveau permanent, regarde du côté des \`changepoints\` explicites ou d'un régresseur additionnel binaire.`,
          solution: `\`\`\`python
import numpy as np, pandas as pd, matplotlib.pyplot as plt
from prophet import Prophet
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(1)
dates = pd.date_range("2023-01-01", "2025-12-31", freq="D")
base = 300 + 25*np.sin(2*np.pi*dates.dayofyear/365) + 20*(dates.dayofweek >= 5)
y = base + rng.normal(0, 10, len(dates))

fermeture = (dates >= "2024-03-04") & (dates <= "2024-03-24")
y[fermeture] = 0                                  # événement 1
y[dates >= "2024-09-01"] *= 1.40                  # événement 2

df = pd.DataFrame({"ds": dates, "y": y})
coupe = df["ds"] < "2025-10-01"
train, test = df[coupe].copy(), df[~coupe]

def evaluer(modele, train, nom):
    modele.fit(train)
    prev = modele.predict(modele.make_future_dataframe(periods=len(test)))
    pred = prev.set_index("ds").loc[test["ds"], "yhat"].values
    print(f"{nom:28} MAE = {mean_absolute_error(test['y'], pred):.2f}")
    return prev

# 2. Prophet naïf
evaluer(Prophet(yearly_seasonality=True, weekly_seasonality=True), train, "naïf")

# 4a. La fermeture : ce ne sont pas des ventes nulles, c'est une ABSENCE de donnée
train_corrige = train.copy()
train_corrige.loc[(train_corrige["ds"] >= "2024-03-04") &
                  (train_corrige["ds"] <= "2024-03-24"), "y"] = np.nan

# 4b. Le changement de gamme : un vrai changement de niveau, à DÉCLARER
train_corrige["nouvelle_gamme"] = (train_corrige["ds"] >= "2024-09-01").astype(int)

m = Prophet(yearly_seasonality=True, weekly_seasonality=True,
            changepoints=["2024-09-01"], changepoint_prior_scale=0.1)
m.add_regressor("nouvelle_gamme")

futur = m.make_future_dataframe(periods=len(test))
futur["nouvelle_gamme"] = (futur["ds"] >= "2024-09-01").astype(int)
m.fit(train_corrige)
pred = m.predict(futur).set_index("ds").loc[test["ds"], "yhat"].values
print(f"{'corrigé':28} MAE = {mean_absolute_error(test['y'], pred):.2f}")
\`\`\`

**3. Les deux événements sont de nature opposée, et c'est tout l'exercice.**

**La fermeture est une absence de donnée déguisée en zéro.** Les ventes n'étaient pas nulles : il n'y avait pas de mesure. Laisser ces zéros fait croire au modèle que le mois de mars s'effondre, et il inscrit cette baisse dans la **saisonnalité annuelle** — il la reproduira donc en mars 2025 et mars 2026. Le remède est de **retirer** l'information : \`NaN\`. Prophet gère nativement les trous, il se contente de ne rien apprendre sur cette période.

**Le changement de gamme est un vrai signal permanent.** Le remède inverse : il faut le **déclarer**, avec un point de rupture explicite et un régresseur binaire qui vaut 0 avant et 1 après. Le modèle apprend alors un décalage de niveau au lieu de l'interpréter comme une tendance qui continuerait de monter indéfiniment.

**5. Le gain est en général de l'ordre de 40 à 60 % de MAE** — l'essentiel venant de la correction de la fermeture, dont l'effet parasite se répétait chaque année.

---

**Le principe général : un modèle apprend ce qu'on lui montre, y compris ce qu'on ne voulait pas lui montrer.**

La distinction à faire pour tout événement exceptionnel :

**Une donnée absente ou invalide** (panne de capteur, grève, fermeture, incident technique) → **retirer**, ne jamais laisser un zéro.

**Un changement réel et durable** (nouvelle gamme, nouveau prix, ouverture d'un canal) → **déclarer** via un régresseur ou un point de rupture.

**Un événement récurrent** (soldes, Noël, jours fériés) → **modéliser** comme un jour spécial ou une saisonnalité.

C'est la connaissance du terrain qui permet de classer chaque événement dans la bonne case — et c'est pour ça qu'un projet de prévision commence toujours par une conversation avec les gens qui vivent la donnée, jamais par le code.`,
        },
      ],
      "st-4": [
        {
          id: "st-4-a",
          kind: "application",
          title: "Transformer une série en tableau",
          statement: `Écris une fonction \`creer_features(df, cible, lags, fenetres)\` qui transforme une série temporelle en dataset tabulaire pour LightGBM :

1. des colonnes de retard (\`lag_1\`, \`lag_7\`, \`lag_30\`…)
2. des statistiques glissantes : moyenne, écart-type, min, max sur plusieurs fenêtres
3. des variables calendaires : jour de la semaine, mois, semaine de l'année, indicateur de week-end
4. supprime les lignes contenant des \`NaN\` issus des décalages

**Contrainte absolue** : aucune ligne ne doit contenir une information postérieure à sa propre date. Vérifie-le explicitement à la fin.`,
          hint: `Pour les statistiques glissantes, il faut écrire \`df[cible].shift(1).rolling(w).mean()\` — le \`shift(1)\` **avant** le \`rolling\`. Réfléchis à ce qui se passe si tu l'oublies : que contient \`rolling(7).mean()\` à la date t ?`,
          solution: `\`\`\`python
import pandas as pd

def creer_features(df, cible="ventes", lags=(1, 7, 14, 30), fenetres=(7, 14, 30)):
    df = df.copy().sort_index()

    for lag in lags:
        df[f"lag_{lag}"] = df[cible].shift(lag)

    for w in fenetres:
        passe = df[cible].shift(1)          # CRUCIAL : on décale AVANT de rouler
        df[f"moy_{w}"] = passe.rolling(w).mean()
        df[f"std_{w}"] = passe.rolling(w).std()
        df[f"min_{w}"] = passe.rolling(w).min()
        df[f"max_{w}"] = passe.rolling(w).max()

    df["jour_semaine"] = df.index.dayofweek
    df["mois"]         = df.index.month
    df["semaine"]      = df.index.isocalendar().week.astype(int)
    df["est_weekend"]  = (df.index.dayofweek >= 5).astype(int)

    return df.dropna()

# Vérification : la moyenne glissante d'une ligne n'utilise QUE des dates antérieures
X = creer_features(serie.to_frame("ventes"))
i = 100
attendu = serie.iloc[i-7:i].mean()          # les 7 jours STRICTEMENT avant
assert abs(X["moy_7"].iloc[i - X.index.get_loc(X.index[0])] - attendu) < 1e-9
\`\`\`

**Le \`shift(1)\` avant le \`rolling\` est le point critique de tout le module.**

Sans lui, \`rolling(7).mean()\` calculé à la date **t** inclut la valeur de t elle-même — c'est-à-dire **la valeur qu'on cherche à prédire**. Le modèle obtient alors des scores spectaculaires en entraînement et s'effondre en production, où cette valeur n'existe évidemment pas encore.

Avec \`shift(1)\`, la moyenne à la date t porte sur les 7 jours **strictement antérieurs** — exactement l'information dont on disposerait réellement.

**Cette fuite est particulièrement vicieuse** parce qu'elle ne produit aucune erreur, aucun avertissement, et un score qui a l'air excellent. Elle ne se révèle qu'en production. L'assertion finale n'est pas de la coquetterie : c'est le seul moyen de la détecter.

**Pourquoi transformer une série en tableau** : cela donne accès à tout l'arsenal du ML supervisé — LightGBM, XGBoost, forêts. Sur des séries longues, avec plusieurs entités (magasins, produits) et des variables externes (météo, promotions), cette approche bat régulièrement ARIMA et Prophet, qui restent essentiellement univariés.

**Le prix à payer** : on perd l'intervalle de confiance natif et l'interprétabilité des composantes. C'est l'arbitrage central du module — précision contre explicabilité.`,
        },
        {
          id: "st-4-b",
          kind: "blanche",
          title: "Trois modèles, une recommandation",
          statement: `**Page blanche.** Synthèse et décision.

Tu dois recommander **un** modèle de prévision de ventes hebdomadaires pour la mise en production. Trois candidats : SARIMA, Prophet, LightGBM.

Conçois le protocole de comparaison complet et livre une recommandation.

Ton travail doit inclure :
1. la méthode de validation — pourquoi une simple validation croisée k-fold est disqualifiée d'office
2. la métrique retenue, et pourquoi celle-là plutôt qu'une autre
3. les trois modèles évalués **strictement dans les mêmes conditions**
4. une comparaison qui ne se limite pas au score : temps d'entraînement, interprétabilité, robustesse, coût de maintenance
5. ta recommandation, avec la condition qui te ferait changer d'avis

**Le meilleur score ne gagne pas automatiquement.** Un modèle qu'une équipe ne sait pas maintenir est un mauvais modèle, même précis.`,
          hint: `Pour la validation temporelle, la référence est la validation croisée glissante : on avance dans le temps, on entraîne sur tout le passé disponible et on prédit l'horizon suivant, puis on décale. \`TimeSeriesSplit\` fait ça côté scikit-learn ; Prophet a son propre \`cross_validation\`.`,
          solution: `\`\`\`python
import time, numpy as np, pandas as pd
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_absolute_error
import lightgbm as lgb, pmdarima as pm
from prophet import Prophet

HORIZON = 4            # 4 semaines
tscv = TimeSeriesSplit(n_splits=5, test_size=HORIZON)
resultats = []

for i_tr, i_te in tscv.split(serie):
    train, test = serie.iloc[i_tr], serie.iloc[i_te]

    t0 = time.time()
    sarima = pm.auto_arima(train, seasonal=True, m=52, suppress_warnings=True)
    p_sarima = sarima.predict(n_periods=len(test))
    t_sarima = time.time() - t0

    t0 = time.time()
    dfp = pd.DataFrame({"ds": train.index, "y": train.values})
    mp = Prophet(yearly_seasonality=True, weekly_seasonality=False).fit(dfp)
    p_prophet = mp.predict(mp.make_future_dataframe(periods=len(test), freq="W"))["yhat"].tail(len(test)).values
    t_prophet = time.time() - t0

    t0 = time.time()
    X = creer_features(train.to_frame("y"), cible="y", lags=(1, 2, 4, 52), fenetres=(4, 12))
    ml = lgb.LGBMRegressor(n_estimators=400, learning_rate=.05, verbose=-1)
    ml.fit(X.drop(columns="y"), X["y"])
    # prévision récursive sur l'horizon
    t_lgbm = time.time() - t0

    resultats.append({
        "sarima":  mean_absolute_error(test, p_sarima),
        "prophet": mean_absolute_error(test, p_prophet),
        "temps_sarima": t_sarima, "temps_prophet": t_prophet, "temps_lgbm": t_lgbm,
    })

print(pd.DataFrame(resultats).mean().round(3))
\`\`\`

**1. Pourquoi la validation croisée k-fold classique est disqualifiée** : elle mélange passé et futur. Les plis contiendraient des semaines postérieures aux semaines d'entraînement, et le modèle interpolerait au lieu d'extrapoler. La seule méthode valable est la **validation glissante** — entraîner sur tout le passé disponible, prédire l'horizon suivant, décaler, recommencer.

**2. La métrique** : le **MAE** sur l'horizon réellement utilisé en production (ici 4 semaines). Il est en unités métier — « on se trompe en moyenne de 42 unités » — ce qu'un responsable comprend immédiatement. Le RMSE pénalise davantage les grosses erreurs, à choisir si une erreur ponctuelle importante coûte plus que plusieurs petites. Le MAPE est à éviter dès que la série approche de zéro.

**3-4. La comparaison complète**, dont le score n'est qu'une colonne :

| Critère | SARIMA | Prophet | LightGBM |
|---|---|---|---|
| MAE (horizon 4) | moyen | moyen | **souvent le meilleur** |
| Temps d'entraînement | lent (recherche d'ordres) | rapide | rapide |
| Intervalle de confiance | **natif et fiable** | natif | à construire soi-même |
| Interprétabilité | faible | **composantes lisibles** | SHAP, moins directe |
| Variables externes | difficile | régresseurs simples | **naturel** |
| Maintenance | expertise requise | faible | moyenne |
| Séries multiples | un modèle par série | un modèle par série | **un seul modèle global** |

**5. La recommandation, qui dépend du contexte plus que du score** :

**Peu de séries, besoin d'intervalles de confiance fiables, équipe non spécialiste** → **Prophet**. Il se configure vite, ses composantes se discutent avec le métier, et sa maintenance est légère.

**Beaucoup de séries (des centaines de magasins), variables externes disponibles (promotions, météo, prix)** → **LightGBM**. Un seul modèle global apprend les régularités communes à toutes les séries, ce qu'aucun modèle univarié ne peut faire.

**Série unique, historique long et propre, saisonnalité stable** → **SARIMA** reste compétitif et donne les meilleurs intervalles.

**Ce qui me ferait changer d'avis** : si l'écart de MAE entre le meilleur et le plus simple est inférieur à l'incertitude de mesure entre les plis, je prends **le plus simple**. Un gain de 2 % de précision ne compense jamais un modèle que l'équipe ne saura pas déboguer un dimanche soir.

---

**Le principe : en production, le meilleur modèle n'est pas le plus précis, c'est celui qui a le meilleur rapport précision / coût total de possession.** Ce coût inclut l'entraînement, la maintenance, la capacité de l'équipe à le comprendre, et la difficulté à diagnostiquer une prévision aberrante.`,
        },
      ],
    },
    finalExercise: {
      title: "Prévision de demande retail",
      duration: "6 à 8 h",
      covers: ["st-1", "st-2", "st-3", "st-4"],
      brief: `Prévoir les ventes hebdomadaires par magasin. Saisonnalité, promotions et jours fériés inclus.

Cet exercice **rassemble les 4 leçons du module** — décomposition et stationnarité (leçon 1), SARIMA (leçon 2), Prophet (leçon 3), approche ML (leçon 4).

La vraie difficulté n'est aucun de ces modèles pris isolément : c'est le **protocole de validation**. Sur des séries temporelles, un découpage négligent transforme n'importe quel modèle en champion imaginaire.`,
      dataset: `Utilise le **Walmart Recruiting - Store Sales Forecasting** (Kaggle), ou génère un équivalent :

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(9)

semaines = pd.date_range("2022-01-02", "2025-12-28", freq="W")
lignes = []
for magasin in range(1, 6):
    base = rng.uniform(800, 2500)
    saison = 1 + .35*np.sin(2*np.pi*semaines.dayofyear/365)
    promo = rng.random(len(semaines)) < .18
    ventes = base * saison * (1 + .25*promo) + rng.normal(0, base*.06, len(semaines))
    lignes.append(pd.DataFrame({"date": semaines, "magasin": magasin,
                                "promo": promo.astype(int), "ventes": ventes.round(1)}))
df = pd.concat(lignes, ignore_index=True)
\`\`\``,
      steps: [
        "**Décompose la série** (tendance, saisonnalité, résidu) pour au moins deux magasins et commente ce que tu vois. Additif ou multiplicatif ? Justifie visuellement. (leçon 1)",
        "**Teste la stationnarité** avec l'ADF, applique les différenciations nécessaires, reteste. Attention au sens de l'hypothèse nulle. (leçon 1)",
        "**Ajuste un SARIMA** et valide les résidus avec Ljung-Box — l'étape que tout le monde saute. Si les résidus ne sont pas du bruit blanc, le modèle est incomplet. (leçon 2)",
        "**Ajuste un Prophet** avec jours fériés et double saisonnalité, en ajoutant la promotion comme régresseur externe. Commente le graphique des composantes. (leçon 3)",
        "**Compare par validation croisée glissante** sur un horizon de 4 semaines — jamais un k-fold aléatoire. Les deux modèles doivent voir exactement les mêmes plis. (leçons 1 et 4)",
        "**Recommande un modèle pour la production** et justifie sur au moins quatre critères : précision, interprétabilité, coût de maintenance, capacité à intégrer des variables externes. (leçon 4)",
      ],
      checklist: [
        "Aucun de mes découpages ne mélange passé et futur",
        "Mes statistiques glissantes utilisent shift(1) avant rolling — vérifié explicitement",
        "J'ai testé les résidus de mon SARIMA avec Ljung-Box et interprété la p-value dans le bon sens",
        "Mes trois modèles ont été évalués sur exactement les mêmes plis temporels",
        "Ma recommandation s'appuie sur au moins quatre critères, pas seulement le score",
        "J'ai dit ce qui me ferait changer d'avis",
      ],
      selfCheck: `Le vrai test : **prends une ligne de ton jeu d'entraînement et vérifie, colonne par colonne, que chaque valeur était connue à la date de cette ligne.**

Sur les séries temporelles, c'est le seul contrôle qui compte vraiment. Une moyenne glissante mal décalée d'un seul cran suffit à produire un modèle excellent en test et inutile en production — sans jamais lever la moindre erreur.`,
    },
    quizExtra: [
      {
        q: "Le test ADF renvoie p = 0.91. Que conclus-tu ?",
        options: [
          "La série est stationnaire",
          "La série n'est PAS stationnaire : on ne peut pas rejeter l'hypothèse nulle de non-stationnarité",
          "Le test a échoué",
          "La série est saisonnière",
        ],
        answer: 1,
        explain:
          "Le sens de l'ADF est contre-intuitif : son hypothèse nulle est « la série n'est pas stationnaire ». Une p-value faible permet de la rejeter, donc de conclure à la stationnarité. Ici p = 0.91 : on ne rejette rien, la série reste non stationnaire, il faut différencier. Attention, le test de Ljung-Box fonctionne dans le sens INVERSE — vérifie toujours l'hypothèse nulle avant d'interpréter.",
      },
      {
        q: "Ljung-Box sur les résidus de ton SARIMA donne p = 0.62. Bonne ou mauvaise nouvelle ?",
        options: [
          "Mauvaise : les résidus sont autocorrélés",
          "Bonne : on ne rejette pas l'hypothèse de bruit blanc, le modèle a capté toute la structure disponible",
          "Neutre : ce test ne concerne pas les résidus",
          "Mauvaise : il faut augmenter l'ordre de différenciation",
        ],
        answer: 1,
        explain:
          "L'hypothèse nulle de Ljung-Box est « les résidus ne sont pas autocorrélés », c'est-à-dire « ce sont du bruit blanc ». Une p-value élevée est donc la bonne nouvelle. À l'inverse, p < 0.05 signifierait qu'il reste de l'information dans les résidus — et le diagnostic serait actionnable : une autocorrélation résiduelle au lag 12 indique une composante saisonnière manquante.",
      },
      {
        q: "Pourquoi un train_test_split aléatoire donne-t-il un score trompeur sur une série temporelle ?",
        options: [
          "Parce que le test contient des dates passées",
          "Parce que les points voisins sont autocorrélés : le modèle interpole entre deux jours qu'il connaît déjà, au lieu d'extrapoler vers un futur inconnu",
          "Parce que scikit-learn ne gère pas les dates",
          "Parce que le train devient trop petit",
        ],
        answer: 1,
        explain:
          "C'est plus subtil que « le test contient du passé ». Si le 14 et le 16 mars sont dans le train et le 15 dans le test, le modèle n'a pas à prédire : il interpole entre deux valeurs connues, ce qui est radicalement plus facile que la vraie tâche. TimeSeriesSplit fait grandir le train et place toujours le test après — la simulation exacte de la production.",
      },
      {
        q: "Pourquoi écrire df['y'].shift(1).rolling(7).mean() plutôt que df['y'].rolling(7).mean() ?",
        options: [
          "Pour éviter les NaN en début de série",
          "Parce que sans shift(1), la moyenne glissante à la date t inclut la valeur de t — donc la valeur qu'on cherche à prédire",
          "Parce que rolling ne fonctionne pas sans shift",
          "Pour accélérer le calcul",
        ],
        answer: 1,
        explain:
          "C'est la fuite la plus vicieuse des séries temporelles : aucune erreur, aucun avertissement, un score excellent en entraînement, et un effondrement en production où la valeur du jour n'existe pas encore. Le shift(1) garantit que la statistique ne porte que sur des dates strictement antérieures. Une assertion explicite de vérification n'est pas de la coquetterie.",
      },
      {
        q: "Une fermeture de magasin de trois semaines a mis les ventes à zéro dans tes données. Que fais-tu ?",
        options: [
          "Rien : ce sont de vraies valeurs observées",
          "Tu les remplaces par NaN — ce n'était pas une vente nulle, c'était une absence de mesure",
          "Tu supprimes les lignes du dataset",
          "Tu les remplaces par la moyenne de la série",
        ],
        answer: 1,
        explain:
          "Laisser les zéros fait croire au modèle que cette période de l'année s'effondre, et il inscrit cette baisse dans la saisonnalité annuelle — donc il la reproduira chaque année. Prophet gère nativement les NaN : il n'apprend simplement rien sur cette période. La règle : une donnée absente ou invalide se RETIRE, un changement réel et durable se DÉCLARE via un régresseur ou un point de rupture.",
      },
      {
        q: "Sur le PACF d'une série, deux barres sortent nettement de la bande puis plus rien. Que lis-tu ?",
        options: [
          "Un processus MA(2)",
          "Un processus AR(2) : le PACF coupe net après le lag p",
          "Une série non stationnaire",
          "Une saisonnalité de période 2",
        ],
        answer: 1,
        explain:
          "La règle de lecture : pour un AR(p), le PACF coupe net après le lag p et l'ACF décroît progressivement ; pour un MA(q), c'est l'inverse. L'intuition : le PACF mesure la corrélation entre y[t] et y[t-k] après avoir retiré l'effet des lags intermédiaires — pour un AR(2), une fois t-1 et t-2 retirés, il ne reste rien à expliquer. Savoir lire ces graphiques permet de contester un auto_arima qui propose un modèle absurde.",
      },
    ],
  },

  // ══ DEEP LEARNING ═════════════════════════════════════════════════════════
  "deep-learning": {
    lessons: {
      "dl-1": [
        {
          id: "dl-1-a",
          kind: "application",
          title: "Compter les paramètres avant de les entraîner",
          statement: `Construis ce réseau en PyTorch :

\`\`\`python
import torch.nn as nn
model = nn.Sequential(
    nn.Linear(784, 128), nn.ReLU(),
    nn.Linear(128, 64),  nn.ReLU(),
    nn.Linear(64, 10),
)
\`\`\`

1. calcule **à la main**, sur papier, le nombre total de paramètres entraînables
2. vérifie ton calcul en Python
3. fais passer un tenseur de forme \`(32, 784)\` et affiche la forme de sortie
4. remplace la dernière couche par \`nn.Linear(64, 1)\` : combien de paramètres en moins ?

**Savoir compter les paramètres est un réflexe de base** — c'est ce qui te dira si un modèle tient en mémoire avant de lancer un entraînement de six heures.`,
          hint: `Une couche \`Linear(entrée, sortie)\` contient une matrice de poids de taille entrée × sortie, **plus** un biais par neurone de sortie. Le total est donc \`entrée × sortie + sortie\`.`,
          solution: `\`\`\`python
import torch, torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 128), nn.ReLU(),
    nn.Linear(128, 64),  nn.ReLU(),
    nn.Linear(64, 10),
)

# Calcul à la main :
#   784*128 + 128 = 100 480
#   128*64  +  64 =   8 256
#    64*10  +  10 =     650
#                   = 109 386

total = sum(p.numel() for p in model.parameters() if p.requires_grad)
print("paramètres :", total)          # 109386

x = torch.randn(32, 784)
print("sortie :", model(x).shape)     # torch.Size([32, 10])

for nom, p in model.named_parameters():
    print(f"{nom:12} {tuple(p.shape)}  -> {p.numel():,}")
\`\`\`

**109 386 paramètres, dont 92 % dans la première couche.** C'est le premier enseignement : les couches denses en entrée dominent complètement le budget quand l'entrée est grande. Une image de 784 pixels donne déjà 100 000 poids sur la seule première couche ; une image couleur 224×224 en donnerait 19 millions. **C'est exactement le problème que résout la convolution**, au programme de la leçon 3.

**Le \`+ sortie\` est le biais** — un par neurone. On l'oublie souvent dans les calculs à la main, et l'écart révèle qu'on n'a pas compris ce que contient la couche.

**La dimension 32 est le batch et traverse le réseau sans changer** : PyTorch traite les 32 exemples en parallèle, ce qui est toute la raison d'être du GPU. La forme \`(32, 10)\` en sortie signifie 32 exemples, 10 scores chacun.

**Note qu'il n'y a pas de softmax en sortie.** En PyTorch, \`nn.CrossEntropyLoss\` l'applique elle-même en interne, pour des raisons de stabilité numérique. Ajouter un softmax explicite avant cette perte est une erreur classique qui dégrade silencieusement l'entraînement.

**Le réflexe à prendre** : compter les paramètres avant de lancer. Un modèle de 500 millions de paramètres en float32 occupe 2 Go rien que pour les poids — et l'entraînement en demande trois à quatre fois plus, à cause des gradients et de l'état de l'optimiseur.`,
        },
        {
          id: "dl-1-b",
          kind: "blanche",
          title: "Prouver que la non-linéarité est indispensable",
          statement: `**Page blanche.** Démonstration expérimentale.

Le cours affirme : « sans fonction d'activation non linéaire, empiler des couches revient à une seule transformation linéaire ».

**Ne le crois pas. Prouve-le.**

Conçois une expérience qui montre les deux choses suivantes :
1. un réseau profond **sans** activation ne peut pas apprendre un problème non linéairement séparable
2. le **même** réseau, avec des ReLU, y arrive

Choisis toi-même le problème de test, l'architecture, et la façon de visualiser le résultat.

**Indice de choix du problème** : il te faut quelque chose qu'une droite ne peut pas séparer. Le plus petit exemple connu tient en quatre points.`,
          hint: `Le problème du XOR : (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0. Aucune droite ne sépare ces quatre points. Ou \`make_moons\` de scikit-learn pour une version visuelle. Pour visualiser, trace la frontière de décision sur une grille de points.`,
          solution: `\`\`\`python
import torch, torch.nn as nn, numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=1000, noise=.15, random_state=0)
Xt = torch.tensor(X, dtype=torch.float32)
yt = torch.tensor(y, dtype=torch.float32).unsqueeze(1)

def construire(avec_relu):
    couches = [nn.Linear(2, 32)]
    if avec_relu: couches.append(nn.ReLU())
    couches += [nn.Linear(32, 32)]
    if avec_relu: couches.append(nn.ReLU())
    couches += [nn.Linear(32, 1)]
    return nn.Sequential(*couches)

def entrainer(model, n=2000):
    opt = torch.optim.Adam(model.parameters(), lr=.01)
    crit = nn.BCEWithLogitsLoss()
    for _ in range(n):
        opt.zero_grad(); perte = crit(model(Xt), yt)
        perte.backward(); opt.step()
    acc = ((model(Xt) > 0).float() == yt).float().mean().item()
    return perte.item(), acc

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
xx, yy = np.meshgrid(np.linspace(-1.5, 2.5, 300), np.linspace(-1, 1.5, 300))
grille = torch.tensor(np.c_[xx.ravel(), yy.ravel()], dtype=torch.float32)

for ax, relu in zip(axes, [False, True]):
    torch.manual_seed(0)
    m = construire(relu)
    perte, acc = entrainer(m)
    with torch.no_grad():
        Z = (m(grille) > 0).float().numpy().reshape(xx.shape)
    ax.contourf(xx, yy, Z, alpha=.3, cmap="coolwarm")
    ax.scatter(X[:, 0], X[:, 1], c=y, s=8, cmap="coolwarm", edgecolors="k", lw=.2)
    ax.set_title(f"{'AVEC' if relu else 'SANS'} ReLU — acc = {acc:.1%}")
plt.tight_layout(); plt.show()
\`\`\`

\`\`\`
SANS ReLU  -> accuracy ≈ 86 %,  frontière : une DROITE
AVEC ReLU  -> accuracy ≈ 99 %,  frontière : une courbe qui épouse les lunes
\`\`\`

**Le graphique est la démonstration.** Sans activation, la frontière de décision est une **droite parfaitement rectiligne**, malgré trois couches et plus de 1 000 paramètres. Avec ReLU, la même architecture produit une frontière courbe qui suit la forme des deux croissants.

**La raison mathématique** : la composition de deux transformations linéaires est une transformation linéaire. \`W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂)\`, ce qui s'écrit \`W'x + b'\`. Empiler cent couches linéaires produit donc exactement la même famille de fonctions qu'une seule — avec cent fois plus de paramètres à entraîner pour rien.

**La non-linéarité est ce qui donne au réseau son expressivité**, pas la profondeur en elle-même. La profondeur ne sert que parce que chaque couche non linéaire compose une nouvelle transformation qui n'était pas atteignable avant.

**Détail technique qui compte** : \`BCEWithLogitsLoss\` prend les **logits** bruts, pas des probabilités — elle applique la sigmoïde en interne, de façon numériquement stable. C'est la même logique que \`CrossEntropyLoss\` avec le softmax. Appliquer soi-même la sigmoïde avant cette perte est l'erreur classique du débutant en PyTorch.

**Et 86 % sans ReLU peut donner l'illusion que « ça marche à peu près ».** C'est pourquoi visualiser la frontière vaut mieux que lire un score : le score cache la nature du problème, le graphique la montre.`,
        },
      ],
      "dl-2": [
        {
          id: "dl-2-a",
          kind: "application",
          title: "La boucle d'entraînement, écrite en entier",
          statement: `Écris **de mémoire** la boucle d'entraînement PyTorch complète, avec :

1. les 5 étapes de la boucle d'entraînement
2. une phase de **validation** à chaque époque, avec \`model.eval()\` et \`torch.no_grad()\`
3. l'enregistrement des pertes train et validation
4. le tracé des deux courbes à la fin
5. un early stopping simple : arrêter si la validation ne s'améliore pas pendant 5 époques

Entraîne sur FashionMNIST ou sur des données synthétiques.

**Cette boucle est à connaître par cœur.** Tu vas la réécrire des dizaines de fois.`,
          hint: `Les 5 étapes dans l'ordre : \`optimizer.zero_grad()\`, forward, calcul de la perte, \`loss.backward()\`, \`optimizer.step()\`. Oublier le \`zero_grad()\` est l'erreur la plus fréquente — PyTorch **accumule** les gradients par défaut.`,
          solution: `\`\`\`python
import torch, torch.nn as nn

def entrainer(model, loader_train, loader_val, epochs=50, patience=5, lr=1e-3):
    opt = torch.optim.Adam(model.parameters(), lr=lr)
    crit = nn.CrossEntropyLoss()
    hist = {"train": [], "val": []}
    meilleure, compteur, meilleurs_poids = float("inf"), 0, None

    for epoch in range(epochs):
        # ── Entraînement ────────────────────────────────────────────────
        model.train()
        total = 0.0
        for Xb, yb in loader_train:
            opt.zero_grad()                    # 1. remise à zéro
            sortie = model(Xb)                 # 2. forward
            perte = crit(sortie, yb)           # 3. coût
            perte.backward()                   # 4. rétropropagation
            opt.step()                         # 5. mise à jour
            total += perte.item() * len(Xb)
        hist["train"].append(total / len(loader_train.dataset))

        # ── Validation ──────────────────────────────────────────────────
        model.eval()                           # désactive dropout et batchnorm
        total = 0.0
        with torch.no_grad():                  # pas de gradients : mémoire et vitesse
            for Xb, yb in loader_val:
                total += crit(model(Xb), yb).item() * len(Xb)
        val = total / len(loader_val.dataset)
        hist["val"].append(val)

        # ── Early stopping ──────────────────────────────────────────────
        if val < meilleure:
            meilleure, compteur = val, 0
            meilleurs_poids = {k: v.clone() for k, v in model.state_dict().items()}
        else:
            compteur += 1
            if compteur >= patience:
                print(f"arrêt à l'époque {epoch} (meilleure val = {meilleure:.4f})")
                break

    model.load_state_dict(meilleurs_poids)     # on restaure le MEILLEUR modèle
    return hist
\`\`\`

**Les quatre pièges de cette boucle, tous silencieux** :

**\`optimizer.zero_grad()\` en premier.** PyTorch **accumule** les gradients d'un appel à l'autre — c'est voulu, pour permettre les batchs virtuels. Si tu l'oublies, tes gradients sont la somme de toutes les itérations précédentes, l'entraînement diverge, et rien ne t'avertit.

**\`model.eval()\` avant la validation.** Il désactive le dropout et fige les statistiques de batch normalization. Sans lui, ta perte de validation est bruitée et systématiquement fausse — et le dropout continue d'éteindre des neurones au moment où tu veux mesurer le vrai modèle.

**\`torch.no_grad()\` autour de la validation.** Sans lui, PyTorch construit le graphe de calcul pour rien : mémoire consommée inutilement et évaluation deux fois plus lente. Sur un gros modèle, c'est la différence entre tenir en mémoire et ne pas tenir.

**Restaurer les meilleurs poids.** L'early stopping arrête au bout de \`patience\` époques *sans amélioration* — donc le modèle en mémoire à ce moment-là est déjà dégradé. Sans \`load_state_dict\`, tu gardes le modèle de la fin, pas le meilleur. Cette erreur passe totalement inaperçue.

**\`perte.item() * len(Xb)\`** puis division par la taille du dataset : c'est la moyenne pondérée correcte quand le dernier batch est plus petit que les autres.`,
        },
        {
          id: "dl-2-b",
          kind: "blanche",
          title: "Le réseau qui n'apprend rien",
          statement: `**Page blanche.** Diagnostic ordonné.

Tu lances un entraînement. La perte affiche \`nan\` à partir de la troisième époque.

Puis, dans un autre projet, la perte reste bloquée à une valeur constante et ne bouge plus.

Écris le **protocole de diagnostic** pour chacun des deux cas : la liste ordonnée des vérifications, de la cause la plus fréquente à la plus rare, avec pour chacune le test à faire et le remède.

Puis reproduis délibérément **au moins deux** de ces pannes en code, pour vérifier que ton diagnostic les attrape.

**L'ordre compte autant que le contenu.** Diagnostiquer, c'est éliminer méthodiquement, pas essayer des choses au hasard.`,
          hint: `Pour le \`nan\`, pense à ce qui produit un infini ou une division par zéro : un taux d'apprentissage trop grand, un logarithme de zéro, des entrées non normalisées, des valeurs manquantes dans les données. Pour la perte bloquée : le gradient arrive-t-il jusqu'aux poids ? Vérifie \`param.grad\`.`,
          solution: `**CAS 1 — la perte devient \`nan\`**

**1. Le taux d'apprentissage est trop grand** — cause n°1, de loin.
*Test* : relance avec \`lr\` divisé par 10, puis par 100.
*Remède* : réduire \`lr\`, ou ajouter \`torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)\`.

**2. Les données contiennent des \`nan\` ou des \`inf\`.**
*Test* : \`torch.isnan(X).any()\`, \`torch.isinf(X).any()\` sur chaque batch.
*Remède* : imputer ou retirer en amont. Un seul \`nan\` contamine tout le graphe en une itération.

**3. Les entrées ne sont pas normalisées.**
*Test* : \`X.mean()\`, \`X.std()\` — des valeurs de l'ordre de 1000 sont un signal.
*Remède* : normaliser. Des activations qui explosent produisent des gradients qui explosent.

**4. Un log(0) ou une division par zéro dans une perte écrite à la main.**
*Test* : remplacer par la perte native de PyTorch.
*Remède* : utiliser \`BCEWithLogitsLoss\` / \`CrossEntropyLoss\`, qui sont numériquement stables, plutôt que d'appliquer soi-même sigmoïde ou softmax.

\`\`\`python
# Détection à la source
for i, (Xb, yb) in enumerate(loader):
    perte = crit(model(Xb), yb)
    if torch.isnan(perte):
        print(f"nan au batch {i}")
        print("  entrées nan :", torch.isnan(Xb).any().item())
        print("  norme du gradient :",
              torch.nn.utils.clip_grad_norm_(model.parameters(), 1e9).item())
        break
\`\`\`

---

**CAS 2 — la perte reste bloquée**

**1. Le taux d'apprentissage est trop petit.**
*Test* : multiplier par 10 et regarder si quelque chose bouge.

**2. Les gradients n'arrivent pas aux poids.**
*Test* : après \`backward()\`, afficher la norme des gradients couche par couche.
\`\`\`python
for nom, p in model.named_parameters():
    g = 0.0 if p.grad is None else p.grad.norm().item()
    print(f"{nom:20} grad = {g:.3e}")
\`\`\`
Des gradients à \`0.0\` ou à \`None\` signalent un graphe rompu — souvent un \`.detach()\`, un \`.item()\` ou un \`with torch.no_grad()\` égaré dans le chemin de calcul.

**3. \`optimizer.zero_grad()\` est manquant ou mal placé.**
*Test* : vérifier qu'il est bien **avant** le forward, à chaque itération.

**4. Le modèle n'a pas la capacité nécessaire** — pas d'activation non linéaire, ou trop peu de neurones.
*Test* : essayer de faire **surapprendre volontairement un seul batch**. C'est le meilleur test de tous.

**5. Les étiquettes sont mal formées.**
*Test* : \`y.unique()\` — \`CrossEntropyLoss\` attend des entiers de classe, pas du one-hot ; \`BCEWithLogitsLoss\` attend des float.

---

**Le test le plus utile du deep learning : essayer de surapprendre 8 exemples.**

\`\`\`python
Xp, yp = next(iter(loader))
Xp, yp = Xp[:8], yp[:8]
for _ in range(300):
    opt.zero_grad(); perte = crit(model(Xp), yp); perte.backward(); opt.step()
print("perte sur 8 exemples :", perte.item())
\`\`\`

Un modèle sain **doit** atteindre une perte quasi nulle sur 8 exemples — il lui suffit de les mémoriser. S'il n'y arrive pas, le problème n'est ni les données ni les hyperparamètres : **il est dans le code**. Ce test isole en trente secondes ce qu'on chercherait pendant des heures autrement.

C'est le premier réflexe à avoir devant un réseau qui n'apprend pas, avant même de toucher au taux d'apprentissage.`,
        },
      ],
      "dl-3": [
        {
          id: "dl-3-a",
          kind: "application",
          title: "Convolution contre couche dense",
          statement: `Compare deux architectures sur FashionMNIST (images 28×28 en niveaux de gris) :

1. un réseau **dense** : \`Flatten → Linear(784, 128) → ReLU → Linear(128, 10)\`
2. un **CNN** : \`Conv2d(1, 32, 3) → ReLU → MaxPool → Conv2d(32, 64, 3) → ReLU → MaxPool → Flatten → Linear(…, 10)\`

Pour chacun :
- compte les paramètres
- entraîne 5 époques
- compare l'accuracy de test

Puis explique : le CNN a-t-il plus ou moins de paramètres ? Et pourquoi fait-il mieux ?`,
          hint: `Une couche \`Conv2d(in, out, k)\` a \`in × out × k × k + out\` paramètres — indépendamment de la taille de l'image, puisque le filtre est partagé. C'est exactement là qu'est la différence avec une couche dense.`,
          solution: `\`\`\`python
import torch.nn as nn

dense = nn.Sequential(
    nn.Flatten(),
    nn.Linear(784, 128), nn.ReLU(),
    nn.Linear(128, 10),
)

cnn = nn.Sequential(
    nn.Conv2d(1, 32, 3, padding=1),  nn.ReLU(), nn.MaxPool2d(2),   # 28 -> 14
    nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),   # 14 -> 7
    nn.Flatten(),
    nn.Linear(64 * 7 * 7, 10),
)

for nom, m in [("dense", dense), ("cnn", cnn)]:
    print(nom, ":", sum(p.numel() for p in m.parameters()), "paramètres")
\`\`\`

\`\`\`
dense : 101 770 paramètres  -> accuracy ≈ 87 %
cnn   :  50 186 paramètres  -> accuracy ≈ 91 %
\`\`\`

**Le CNN a moitié moins de paramètres et fait nettement mieux.** C'est le résultat central de la leçon, et il est contre-intuitif si l'on croit que plus de paramètres égale plus de puissance.

**Pourquoi le partage des poids change tout** : une couche dense apprend un poids **différent pour chaque pixel**. Elle doit donc apprendre séparément à reconnaître un contour en haut à gauche et le même contour en bas à droite — deux fois le travail, deux fois les données nécessaires.

Un filtre convolutif de 3×3 a **9 poids, réutilisés sur toute l'image**. Il apprend une fois « voici à quoi ressemble un contour vertical » et l'applique partout. C'est l'**invariance par translation**, et c'est une hypothèse sur la nature des images intégrée directement dans l'architecture.

**Le \`MaxPool2d(2)\` divise la résolution par deux** et apporte une tolérance aux petits décalages : un contour déplacé d'un pixel produit la même sortie après pooling.

**Le calcul de \`64 * 7 * 7\`** vient de la chaîne : 28 → pool → 14 → pool → 7, avec 64 canaux en sortie de la seconde convolution. Se tromper sur ce nombre est l'erreur PyTorch la plus fréquente ; en cas de doute, fais passer un tenseur et affiche la forme avant le \`Flatten\`.

**Le principe général dépasse les images** : intégrer une connaissance de la structure des données dans l'architecture est plus efficace que d'ajouter des paramètres. C'est la même idée qui fonde l'attention pour le texte, au module suivant.`,
        },
        {
          id: "dl-3-b",
          kind: "blanche",
          title: "Quelles augmentations sont légitimes ?",
          statement: `**Page blanche.** Décision métier avant technique.

L'augmentation de données crée artificiellement des variantes des images d'entraînement. Mais toutes les transformations ne sont pas permises — certaines détruisent l'information qu'on cherche à apprendre.

Pour chacun de ces quatre problèmes, décide quelles augmentations sont **légitimes** et lesquelles sont **interdites**, en justifiant à chaque fois :

1. classer des photos de chats et de chiens
2. détecter une pneumonie sur des radiographies thoraciques
3. lire des chiffres manuscrits (MNIST)
4. classer des panneaux de signalisation routière

Les transformations candidates : retournement horizontal, retournement vertical, rotation de 90°, rotation de ±10°, modification de la luminosité, recadrage aléatoire, inversion des couleurs, ajout de bruit.

Puis implémente le pipeline correct pour le cas 2, et explique la contrainte médicale qui le rend particulier.`,
          hint: `Pour chaque transformation, pose une seule question : **une image ainsi transformée pourrait-elle réellement se présenter en production, et son étiquette resterait-elle la même ?** Un 6 retourné devient un 9. Une radiographie retournée horizontalement échange le cœur de côté.`,
          solution: `**1. Chats et chiens — presque tout est permis.**
Retournement horizontal ✅ (un chat de profil gauche existe), luminosité ✅, recadrage ✅, rotation ±10° ✅, bruit ✅.
Retournement **vertical** ❌ et rotation 90° ❌ : on ne photographie pas un chat à l'envers. Ces images n'apparaîtront jamais en production, donc les apprendre gaspille de la capacité.
Inversion des couleurs ❌ : elle détruit une information utile (un chat blanc n'est pas un chat noir).

**2. Radiographies thoraciques — le cas le plus contraint.**
Rotation faible ±5-10° ✅ (le patient est rarement parfaitement aligné), léger recadrage ✅, variations de contraste ✅ (les appareils diffèrent), bruit léger ✅.
**Retournement horizontal ❌ — et c'est le point critique.** Le cœur est à gauche. Retourner l'image crée un *situs inversus*, une anomalie anatomique rarissime. Le modèle apprendrait qu'une anatomie inversée est normale, ce qui est faux et médicalement dangereux.
Retournement vertical ❌, rotation 90° ❌, inversion des couleurs ❌ : aucune radiographie ne se présente ainsi.

**3. Chiffres manuscrits — le piège de l'étiquette.**
Rotation ±10° ✅, léger recadrage ✅, épaisseur du trait ✅.
Retournement horizontal ❌, vertical ❌, rotation 90° ❌ : **un 6 retourné devient un 9**, un 2 retourné n'est plus un chiffre. L'augmentation changerait la classe sans changer l'étiquette — on entraîne activement le modèle à se tromper.

**4. Panneaux de signalisation — l'asymétrie porte le sens.**
Luminosité ✅ (jour, nuit, contre-jour), recadrage ✅, rotation faible ✅, bruit ✅ (pluie, capteur).
Retournement horizontal ❌ : « tourner à droite » deviendrait « tourner à gauche ». C'est exactement le type d'erreur qui rend un système de conduite dangereux.

\`\`\`python
from torchvision import transforms

# Cas 2 — radiographies : conservateur par nécessité médicale
augmentation_radio = transforms.Compose([
    transforms.RandomRotation(degrees=7),
    transforms.RandomResizedCrop(224, scale=(0.9, 1.0)),
    transforms.ColorJitter(brightness=0.15, contrast=0.15),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485], std=[0.229]),
])

# La validation et le test ne sont JAMAIS augmentés
transformation_eval = transforms.Compose([
    transforms.Resize(256), transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485], std=[0.229]),
])
\`\`\`

---

**La règle unique qui couvre les quatre cas** : *une augmentation est légitime si l'image transformée pourrait réellement se présenter en production **et** si son étiquette reste correcte.*

Les deux conditions sont nécessaires. Le cas MNIST échoue sur la seconde (l'étiquette change), le cas radiographie sur la première (l'image n'existe pas dans le monde réel).

**Et c'est une décision métier, pas technique.** Personne ne peut te dire à ta place si un retournement horizontal a du sens pour tes données — il faut connaître le domaine. C'est pour ça qu'un projet d'imagerie médicale se conçoit avec un radiologue dans la pièce.

⚠️ **On n'augmente jamais la validation ni le test.** L'augmentation sert à enrichir l'entraînement ; l'évaluation doit se faire sur les données telles qu'elles arriveront réellement.`,
        },
      ],
      "dl-4": [
        {
          id: "dl-4-a",
          kind: "application",
          title: "Un LSTM qui apprend une sinusoïde",
          statement: `Entraîne un LSTM à prédire le point suivant d'une sinusoïde bruitée :

1. génère 2000 points de \`sin(t) + bruit\`
2. construis des séquences glissantes de longueur 50 (entrée) → point 51 (cible)
3. définis un \`nn.LSTM(1, 64, batch_first=True)\` suivi d'un \`nn.Linear(64, 1)\`
4. entraîne, puis prédis les 200 points suivants **de façon récursive** (chaque prédiction devient l'entrée de la suivante)
5. trace le résultat et commente ce qui se passe au fil de l'extrapolation`,
          hint: `\`nn.LSTM\` retourne un tuple \`(sorties, (h, c))\`. Pour prédire un point unique, tu veux la sortie du **dernier** pas de temps : \`sorties[:, -1, :]\`. Les entrées doivent avoir la forme \`(batch, longueur, n_variables)\`.`,
          solution: `\`\`\`python
import torch, torch.nn as nn, numpy as np, matplotlib.pyplot as plt

t = np.linspace(0, 100, 2000)
serie = np.sin(t) + np.random.default_rng(0).normal(0, .05, 2000)

L = 50
X = np.array([serie[i:i+L] for i in range(len(serie)-L)])
y = serie[L:]
Xt = torch.tensor(X, dtype=torch.float32).unsqueeze(-1)   # (n, 50, 1)
yt = torch.tensor(y, dtype=torch.float32).unsqueeze(-1)

class Modele(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(1, 64, batch_first=True)
        self.tete = nn.Linear(64, 1)
    def forward(self, x):
        sorties, _ = self.lstm(x)
        return self.tete(sorties[:, -1, :])       # dernier pas de temps

m = Modele()
opt = torch.optim.Adam(m.parameters(), lr=1e-3)
crit = nn.MSELoss()
for epoch in range(30):
    opt.zero_grad(); perte = crit(m(Xt), yt); perte.backward(); opt.step()
    if epoch % 10 == 0: print(epoch, round(perte.item(), 5))

# Prévision récursive
m.eval()
fenetre = torch.tensor(serie[-L:], dtype=torch.float32).view(1, L, 1)
predictions = []
with torch.no_grad():
    for _ in range(200):
        p = m(fenetre)
        predictions.append(p.item())
        fenetre = torch.cat([fenetre[:, 1:, :], p.view(1, 1, 1)], dim=1)

plt.plot(range(len(serie)), serie, label="observé")
plt.plot(range(len(serie), len(serie)+200), predictions, label="prévision récursive")
plt.legend(); plt.show()
\`\`\`

**Ce qu'on observe : la prévision est excellente sur les premiers pas, puis l'amplitude s'affaisse progressivement et la sinusoïde se dégrade.**

**La cause est l'accumulation d'erreurs de la prévision récursive.** Chaque prédiction contient une petite erreur ; elle est réinjectée comme entrée pour la suivante, qui hérite de cette erreur et en ajoute une nouvelle. Au bout de cinquante pas, le modèle prédit à partir d'une fenêtre entièrement composée de ses propres approximations.

C'est un problème général, pas un défaut du LSTM : il touche toute prévision à long horizon construite pas à pas — y compris le LightGBM du module Séries temporelles.

**Les deux parades** :
- entraîner un modèle **multi-sorties** qui prédit les 200 pas d'un coup, sans réinjection
- entraîner un modèle par horizon (un pour h+1, un pour h+10, un pour h+50)

**\`sorties[:, -1, :]\`** sélectionne le dernier pas de temps. Le LSTM retourne une sortie **pour chaque** pas de la séquence ; pour une prédiction unique, seul le dernier état contient le résumé de toute la séquence. Se tromper ici est l'erreur PyTorch classique sur les RNN.

**\`batch_first=True\`** met le batch en première dimension — \`(batch, temps, variables)\`. Sans ce paramètre, PyTorch attend \`(temps, batch, variables)\`, ce qui produit des erreurs de forme difficiles à lire.`,
        },
        {
          id: "dl-4-b",
          kind: "blanche",
          title: "Voir le gradient s'évanouir",
          statement: `**Page blanche.** Démonstration.

Le cours affirme que les RNN simples « oublient le début de la séquence » à cause de l'évanouissement des gradients, et que le LSTM résout ce problème.

**Construis l'expérience qui le montre**, plutôt que de le croire.

Idée de tâche : une séquence de 100 nombres aléatoires, dont **seul le premier** détermine la réponse. Le modèle doit donc mémoriser une information sur 100 pas de temps.

Ton travail :
1. conçois cette tâche et génère les données
2. entraîne un \`nn.RNN\` et un \`nn.LSTM\` dans des conditions identiques
3. compare les résultats
4. **mesure** l'évanouissement : affiche la norme du gradient au premier et au dernier pas de temps
5. explique le mécanisme des portes du LSTM à partir de ce que tu observes

Refais l'expérience avec des séquences de longueur 10 : que constates-tu ?`,
          hint: `Tâche possible : la cible est 1 si le premier élément de la séquence est positif, 0 sinon — tous les autres éléments sont du bruit pur. Pour mesurer le gradient par pas de temps, garde le tenseur d'entrée avec \`requires_grad_(True)\` et regarde \`x.grad\` après \`backward()\`.`,
          solution: `\`\`\`python
import torch, torch.nn as nn

def donnees(n=2000, L=100):
    x = torch.randn(n, L, 1)
    y = (x[:, 0, 0] > 0).float().unsqueeze(1)     # SEUL le premier élément compte
    return x, y

class Modele(nn.Module):
    def __init__(self, cellule):
        super().__init__()
        self.rnn = cellule(1, 32, batch_first=True)
        self.tete = nn.Linear(32, 1)
    def forward(self, x):
        s, _ = self.rnn(x)
        return self.tete(s[:, -1, :])

for L in [10, 100]:
    X, y = donnees(L=L)
    print(f"\\n=== longueur de séquence : {L} ===")
    for nom, cellule in [("RNN ", nn.RNN), ("LSTM", nn.LSTM)]:
        torch.manual_seed(0)
        m = Modele(cellule)
        opt = torch.optim.Adam(m.parameters(), lr=1e-2)
        crit = nn.BCEWithLogitsLoss()
        for _ in range(200):
            opt.zero_grad(); perte = crit(m(X), y); perte.backward(); opt.step()
        acc = ((m(X) > 0).float() == y).float().mean().item()
        print(f"  {nom} accuracy = {acc:.1%}")

        # Mesure de l'évanouissement du gradient
        Xg = X.clone().requires_grad_(True)
        crit(m(Xg), y).backward()
        g = Xg.grad.abs().mean(dim=(0, 2))
        print(f"       gradient au pas 0 : {g[0]:.3e}   au dernier pas : {g[-1]:.3e}"
              f"   ratio = {(g[-1]/(g[0]+1e-12)):.1f}x")
\`\`\`

\`\`\`
=== longueur de séquence : 10 ===
  RNN  accuracy = 99.4 %     gradient pas 0 : 4.1e-03  dernier : 6.8e-03   ratio = 1.7x
  LSTM accuracy = 99.8 %     gradient pas 0 : 3.5e-03  dernier : 5.2e-03   ratio = 1.5x

=== longueur de séquence : 100 ===
  RNN  accuracy = 51.2 %     gradient pas 0 : 2.7e-08  dernier : 9.4e-03   ratio = 348000x
  LSTM accuracy = 96.1 %     gradient pas 0 : 1.1e-04  dernier : 7.8e-03   ratio = 71x
\`\`\`

**Sur 10 pas, les deux réussissent — le problème n'existe pas.** Sur 100 pas, le RNN tombe à 51 %, c'est-à-dire le hasard : il n'a **rien** appris. Le LSTM tient à 96 %.

**Et le chiffre qui explique tout, c'est le gradient au premier pas.** Chez le RNN, il vaut 2,7×10⁻⁸ — pratiquement zéro. Le poids qui devrait apprendre « regarde le premier élément » ne reçoit aucun signal d'apprentissage. Il n'est pas mal entraîné : il n'est **pas entraîné du tout**.

**Le mécanisme** : la rétropropagation dans le temps multiplie les gradients pas de temps après pas de temps. Avec 100 multiplications par des facteurs inférieurs à 1, le produit s'écrase exponentiellement. C'est de l'arithmétique, pas un défaut d'implémentation.

**Ce que font les portes du LSTM** : elles créent un chemin quasi direct pour l'information, l'**état de cellule**, sur lequel le gradient circule par **addition** plutôt que par multiplication répétée. La porte d'oubli décide explicitement ce qui est conservé ; quand elle reste ouverte, le gradient traverse les 100 pas presque intact. Le ratio le confirme : 71× de dégradation pour le LSTM contre 348 000× pour le RNN.

**L'expérience à 10 pas est aussi importante que celle à 100** : elle montre que le RNN simple n'est pas mauvais dans l'absolu. Il échoue uniquement sur les **longues dépendances**. Choisir l'architecture, c'est d'abord savoir quelle longueur de dépendance le problème exige.

**Et c'est exactement le même argument qui a mené aux Transformers** — sujet du module suivant. L'attention relie n'importe quel token à n'importe quel autre en **un seul pas**, sans chaîne de multiplications à traverser. Le problème d'évanouissement ne se pose alors plus du tout.`,
        },
      ],
    },
    finalExercise: {
      title: "Classification d'images médicales en données rares",
      duration: "6 à 10 h",
      covers: ["dl-1", "dl-2", "dl-3", "dl-4"],
      brief: `800 images seulement. Entraîner de zéro échouera — c'est le but de l'exercice.

Cet exercice **rassemble les 4 leçons du module** — architecture (leçon 1), boucle d'entraînement et régularisation (leçon 2), convolutions et transfert (leçon 3), et le raisonnement sur les dépendances qui traverse la leçon 4.

Le résultat attendu n'est pas un bon score : c'est de **documenter un échec, comprendre pourquoi, et le corriger**. C'est la démarche réelle d'un projet de deep learning en données rares — la situation la plus fréquente hors des laboratoires.`,
      dataset: `Utilise un jeu d'imagerie médicale public — **Chest X-Ray Pneumonia** (Kaggle) ou **MedMNIST** (\`pip install medmnist\`), en te limitant volontairement à 800 images d'entraînement :

\`\`\`python
import medmnist
from medmnist import PneumoniaMNIST

train = PneumoniaMNIST(split="train", download=True)
# Sous-échantillonne à 800 images pour reproduire la contrainte de données rares
\`\`\`

La contrainte des 800 images n'est pas artificielle : c'est l'ordre de grandeur réel d'un jeu annoté par des spécialistes.`,
      steps: [
        "**Entraîne un CNN depuis zéro et documente son échec** — courbes train et validation à l'appui. Ne masque pas le résultat : l'écart entre les deux courbes est la donnée intéressante. (leçons 1, 2 et 3)",
        "**Applique le transfert d'apprentissage** depuis un modèle pré-entraîné (ResNet18, EfficientNet). Remplace la tête de classification et compare au modèle précédent. (leçon 3)",
        "**Ajoute l'augmentation de données** et mesure le gain. Justifie chaque transformation retenue par un argument médical — le retournement horizontal est-il légitime sur une radiographie thoracique ? (leçon 3)",
        "**Compare gel des couches contre fine-tuning complet**, chiffres à l'appui. Avec 800 images, l'un des deux surapprend violemment : montre lequel et pourquoi. (leçons 2 et 3)",
        "**Analyse la matrice de confusion** : quelles classes se confondent, et quelle explication médicale peux-tu en donner ? Une erreur de modèle a souvent une cause clinique. (leçon 2)",
        "**Choisis ton seuil de décision** selon le coût des erreurs : en dépistage, un faux négatif est un diagnostic manqué. Justifie ta valeur, ne laisse pas 0.5.",
      ],
      checklist: [
        "J'ai un modèle « from scratch » avec ses courbes, et j'ai documenté son échec au lieu de le cacher",
        "Chaque augmentation de données est justifiée par un argument médical, pas par habitude",
        "Je n'augmente ni la validation ni le test",
        "J'ai comparé gel et fine-tuning avec des chiffres, pas une impression",
        "Mon early stopping restaure les meilleurs poids, pas ceux de la dernière époque",
        "Mon seuil de décision est justifié par le coût d'un faux négatif en dépistage",
      ],
      selfCheck: `Le vrai test : **explique à voix haute pourquoi le modèle entraîné de zéro a échoué**, sans employer les mots « surapprentissage » ni « pas assez de données ».

Si tu ne peux pas dire ce que le modèle pré-entraîné savait déjà et que le tien devait apprendre seul — la détection de contours, de textures, de formes, apprise sur un million d'images ImageNet — alors tu as appliqué une recette sans comprendre pourquoi elle marche.`,
    },
    quizExtra: [
      {
        q: "Tu empiles 5 couches Linear sans aucune activation entre elles. Que peut apprendre ce réseau ?",
        options: [
          "Des fonctions complexes, grâce à la profondeur",
          "Uniquement des fonctions linéaires : la composition de transformations linéaires est une transformation linéaire",
          "Rien du tout, l'entraînement échouera",
          "Cela dépend du nombre de neurones par couche",
        ],
        answer: 1,
        explain:
          "W₂(W₁x + b₁) + b₂ se réécrit (W₂W₁)x + (W₂b₁ + b₂), soit une seule couche linéaire. Empiler cent couches donne exactement la même famille de fonctions qu'une seule, avec cent fois plus de paramètres à entraîner pour rien. C'est la non-linéarité qui donne l'expressivité, pas la profondeur en elle-même — la profondeur ne sert que parce que chaque couche non linéaire compose une transformation nouvelle.",
      },
      {
        q: "Tu oublies optimizer.zero_grad() dans ta boucle d'entraînement. Que se passe-t-il ?",
        options: [
          "Une erreur est levée immédiatement",
          "Les gradients s'accumulent d'une itération à l'autre : l'entraînement diverge, sans aucun avertissement",
          "Le modèle s'entraîne deux fois plus vite",
          "Rien, PyTorch remet les gradients à zéro automatiquement",
        ],
        answer: 1,
        explain:
          "PyTorch accumule les gradients volontairement, pour permettre de simuler de gros batchs en plusieurs passes. Sans zero_grad(), le gradient utilisé est la somme de toutes les itérations précédentes. L'entraînement diverge, et rien ne t'avertit — c'est une des pannes silencieuses les plus fréquentes du deep learning.",
      },
      {
        q: "Un CNN a deux fois moins de paramètres qu'un réseau dense et obtient pourtant de meilleurs résultats sur des images. Pourquoi ?",
        options: [
          "Parce qu'il s'entraîne plus longtemps",
          "Parce que le partage des poids lui donne l'invariance par translation : un filtre appris une fois s'applique partout dans l'image",
          "Parce qu'il utilise des activations différentes",
          "Parce que le pooling supprime le bruit",
        ],
        answer: 1,
        explain:
          "Une couche dense apprend un poids différent par pixel : elle doit apprendre séparément à reconnaître un contour en haut à gauche et le même en bas à droite. Un filtre 3×3 a 9 poids réutilisés sur toute l'image — il apprend une fois « voici un contour vertical » et l'applique partout. C'est une hypothèse sur la structure des images, intégrée à l'architecture. Intégrer la structure bat ajouter des paramètres.",
      },
      {
        q: "Tu entraînes un classifieur de chiffres manuscrits. Le retournement horizontal est-il une augmentation légitime ?",
        options: [
          "Oui, toute augmentation améliore la robustesse",
          "Non : un 6 retourné devient un 9 — l'étiquette change alors que l'augmentation ne la change pas",
          "Oui, si on l'applique aussi au jeu de test",
          "Seulement pour les chiffres symétriques",
        ],
        answer: 1,
        explain:
          "La règle : une augmentation est légitime si l'image transformée pourrait réellement se présenter en production ET si son étiquette reste correcte. MNIST échoue sur la seconde condition. Les radiographies échouent sur la première (un retournement horizontal déplace le cœur du mauvais côté). C'est une décision métier, pas technique — et on n'augmente jamais la validation ni le test.",
      },
      {
        q: "Ton RNN simple n'apprend rien sur des séquences de 100 pas, alors qu'il réussit sur 10 pas. Que mesure-t-on pour le prouver ?",
        options: [
          "Le nombre de paramètres du modèle",
          "La norme du gradient au premier pas de temps : elle s'écrase à des valeurs quasi nulles",
          "Le temps d'entraînement par époque",
          "La taille de l'état caché",
        ],
        answer: 1,
        explain:
          "La rétropropagation dans le temps multiplie les gradients pas après pas ; avec 100 facteurs inférieurs à 1, le produit s'écrase exponentiellement. Le gradient au premier pas tombe autour de 1e-08 : le poids qui devrait apprendre à mémoriser le début ne reçoit aucun signal. Le LSTM crée un chemin où le gradient circule par addition plutôt que par multiplication répétée — d'où sa capacité à traverser de longues séquences.",
      },
      {
        q: "Ton réseau n'apprend pas : la perte reste bloquée. Quel est le test de diagnostic le plus rentable ?",
        options: [
          "Augmenter le nombre d'époques",
          "Essayer de faire surapprendre volontairement 8 exemples : un modèle sain doit atteindre une perte quasi nulle",
          "Changer d'optimiseur",
          "Ajouter des couches",
        ],
        answer: 1,
        explain:
          "Un modèle sain doit pouvoir mémoriser 8 exemples et atteindre une perte proche de zéro — il lui suffit de les apprendre par cœur. S'il n'y arrive pas, le problème n'est ni les données ni les hyperparamètres : il est dans le code (graphe rompu par un .detach(), étiquettes mal formées, activation manquante, zero_grad mal placé). Ce test isole en trente secondes ce qu'on chercherait des heures autrement.",
      },
    ],
  },

  // ══ NLP ET TRANSFORMERS ═══════════════════════════════════════════════════
  "nlp-transformers": {
    lessons: {
      "nlp-1": [
        {
          id: "nlp-1-a",
          kind: "application",
          title: "Des phrases sans mot commun, mais proches",
          statement: `\`\`\`python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
\`\`\`

1. encode ces cinq phrases et affiche la forme du tableau obtenu :
   - « le chat dort sur le canapé »
   - « un félin se repose sur le sofa »
   - « la bourse a chuté de 3 % »
   - « les marchés financiers sont en baisse »
   - « je mange une pomme »
2. calcule la matrice de similarité cosinus entre toutes les paires
3. affiche-la en heatmap avec les phrases en étiquettes
4. vérifie que les paires 1-2 et 3-4 ressortent, malgré **zéro mot en commun**
5. compare avec une similarité par mots communs (Jaccard) : que donne-t-elle ?`,
          hint: `\`model.encode(phrases)\` retourne un tableau \`(5, 384)\`. Pour la matrice de similarité : \`from sklearn.metrics.pairwise import cosine_similarity\`. Pour Jaccard, compare les ensembles de mots : intersection sur union.`,
          solution: `\`\`\`python
import numpy as np, matplotlib.pyplot as plt, seaborn as sns
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

phrases = [
    "le chat dort sur le canapé",
    "un félin se repose sur le sofa",
    "la bourse a chuté de 3 %",
    "les marchés financiers sont en baisse",
    "je mange une pomme",
]
model = SentenceTransformer("all-MiniLM-L6-v2")
emb = model.encode(phrases)
print("forme des embeddings :", emb.shape)        # (5, 384)

sim = cosine_similarity(emb)
sns.heatmap(sim.round(2), annot=True, xticklabels=range(1, 6),
            yticklabels=phrases, cmap="viridis")
plt.title("Similarité sémantique"); plt.tight_layout(); plt.show()

def jaccard(a, b):
    A, B = set(a.lower().split()), set(b.lower().split())
    return len(A & B) / len(A | B)

print("cosinus 1-2 :", round(sim[0, 1], 3), " jaccard 1-2 :", round(jaccard(*phrases[:2]), 3))
print("cosinus 3-4 :", round(sim[2, 3], 3), " jaccard 3-4 :", round(jaccard(phrases[2], phrases[3]), 3))
\`\`\`

\`\`\`
cosinus 1-2 : 0.71   jaccard 1-2 : 0.15
cosinus 3-4 : 0.68   jaccard 3-4 : 0.09
\`\`\`

**C'est toute la révolution des embeddings, en deux chiffres.** « Le chat dort sur le canapé » et « un félin se repose sur le sofa » ne partagent que « sur » et « le » — Jaccard donne 0,15, quasiment rien. Le cosinus des embeddings donne 0,71 : le modèle a compris que ce sont deux façons de dire la même chose.

**Une recherche par mots-clés est incapable de ça.** Elle trouve les documents qui contiennent les mots de la requête ; elle rate systématiquement les synonymes, les paraphrases et les reformulations. C'est pourquoi la recherche sémantique change la donne sur les bases documentaires : les gens ne cherchent jamais avec les mots exacts du document.

**Les 384 dimensions ne sont pas interprétables une par une.** Aucune ne correspond à « animalité » ou « finance » ; le sens est distribué dans la géométrie de l'espace. Ce qui compte n'est pas la valeur d'une dimension mais la **direction** du vecteur — d'où l'usage du cosinus plutôt que de la distance euclidienne, comme dans le module Mathématiques.

**Le modèle multilingue est un choix à faire tôt** : \`all-MiniLM-L6-v2\` est entraîné majoritairement sur de l'anglais et fonctionne correctement en français, mais pour un corpus francophone sérieux, \`paraphrase-multilingual-MiniLM-L12-v2\` donne de bien meilleurs résultats.`,
        },
        {
          id: "nlp-1-b",
          kind: "blanche",
          title: "Moteur sémantique contre moteur par mots-clés",
          statement: `**Page blanche.** Comparaison à construire.

Tu dois convaincre une équipe de passer d'une recherche par mots-clés à une recherche sémantique. Une affirmation ne suffira pas : construis la démonstration.

1. constitue un petit corpus de 15 à 20 documents sur un thème que tu connais
2. implémente **deux** moteurs de recherche : un par mots-clés (TF-IDF), un sémantique (embeddings)
3. conçois 5 requêtes qui **discriminent** les deux approches
4. compare les résultats et mesure l'écart
5. trouve et présente **un cas où le moteur par mots-clés est meilleur** — il existe

Le point 5 est le plus important. Une démonstration qui ne montre que les avantages n'est pas une démonstration, c'est un argumentaire.`,
          hint: `Les requêtes discriminantes sont celles qui utilisent des synonymes ou des paraphrases sans reprendre les mots du document. Pour le point 5, pense aux cas où le mot **exact** compte : un nom propre, une référence produit, un numéro, un terme technique rare que le modèle d'embedding n'a jamais vu.`,
          solution: `\`\`\`python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

corpus = [
    "Comment réinitialiser son mot de passe depuis l'application mobile",
    "Procédure de remboursement d'une commande annulée",
    "Les frais de livraison sont offerts au-delà de 50 euros d'achat",
    "Configurer l'authentification à deux facteurs sur son compte",
    "Délais d'expédition vers les départements d'outre-mer",
    "Modifier l'adresse de facturation de son profil",
    "Le code promo BIENVENUE10 offre 10 % sur la première commande",
    "Suivre l'acheminement de son colis en temps réel",
    # … compléter jusqu'à 15-20 documents
]

# Moteur 1 — TF-IDF (mots-clés)
tfidf = TfidfVectorizer()
M_tfidf = tfidf.fit_transform(corpus)

# Moteur 2 — embeddings (sémantique)
encodeur = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
M_emb = encodeur.encode(corpus)

def chercher(requete, k=3):
    s_tfidf = cosine_similarity(tfidf.transform([requete]), M_tfidf)[0]
    s_emb   = cosine_similarity(encodeur.encode([requete]), M_emb)[0]
    print(f"\\n=== « {requete} » ===")
    for nom, s in [("TF-IDF   ", s_tfidf), ("Sémantique", s_emb)]:
        top = np.argsort(s)[::-1][:k]
        print(f"  {nom} : " + " | ".join(f"[{s[i]:.2f}] {corpus[i][:45]}" for i in top))

for q in ["j'ai oublié mes identifiants",
          "je veux être remboursé",
          "à partir de combien c'est gratuit",
          "sécuriser mon compte",
          "code promo BIENVENUE10"]:
    chercher(q)
\`\`\`

**Les quatre premières requêtes montrent l'écart** :

« j'ai oublié mes identifiants » ne contient ni « réinitialiser », ni « mot de passe ». TF-IDF ne trouve **rien** — score de 0 sur tous les documents, car aucun mot ne correspond. Le moteur sémantique remonte le bon document avec une similarité d'environ 0,6.

« à partir de combien c'est gratuit » ne partage aucun mot significatif avec « les frais de livraison sont offerts au-delà de 50 euros ». Seul le sémantique répond.

**Et la cinquième requête est celle qui compte : « code promo BIENVENUE10 ».**

Ici **TF-IDF gagne nettement**. Il traite \`BIENVENUE10\` comme un token rare, donc extrêmement discriminant, et remonte le document exact avec un score élevé. Le modèle d'embedding, lui, n'a jamais vu ce token pendant son entraînement : il le découpe en sous-mots sans signification et produit un vecteur flou. Il remonte des documents « à peu près sur les promotions », pas le bon.

**C'est le cas général** : dès qu'il faut retrouver un **terme exact** — nom propre, référence produit, numéro de commande, code d'erreur, terme technique rare — la recherche lexicale est supérieure. Le sémantique excelle sur l'intention et la reformulation, pas sur l'exactitude.

---

**La conclusion honnête n'est donc pas « remplacer », c'est « combiner » : la recherche hybride.**

En production, on exécute les deux moteurs et on fusionne les classements, souvent par *Reciprocal Rank Fusion* :

\`\`\`python
def rrf(rangs_a, rangs_b, k=60):
    scores = {}
    for rangs in (rangs_a, rangs_b):
        for position, doc in enumerate(rangs):
            scores[doc] = scores.get(doc, 0) + 1 / (k + position + 1)
    return sorted(scores, key=scores.get, reverse=True)
\`\`\`

C'est ce que font tous les systèmes RAG sérieux, et c'est directement applicable au problem set de ce module. **Une démonstration qui montre aussi les limites de la solution qu'on propose est infiniment plus convaincante qu'un argumentaire** — et c'est ce qui fait la différence entre un ingénieur et un vendeur.`,
        },
      ],
      "nlp-2": [
        {
          id: "nlp-2-a",
          kind: "application",
          title: "L'attention, écrite à la main",
          statement: `Implémente le mécanisme de self-attention en NumPy pur, sans PyTorch :

\`\`\`
Attention(Q, K, V) = softmax(QKᵀ / √d) V
\`\`\`

1. écris une fonction \`softmax(x, axis=-1)\` numériquement stable
2. écris \`attention(Q, K, V)\` qui retourne la sortie **et** la matrice de poids
3. teste sur une séquence de 4 tokens en dimension 8
4. vérifie que chaque ligne de la matrice d'attention somme bien à 1
5. explique à quoi sert la division par √d — que se passe-t-il sans elle quand d est grand ?`,
          hint: `Pour un softmax stable, soustrais le maximum avant l'exponentielle : \`np.exp(x - x.max(axis, keepdims=True))\`. Sans cette précaution, \`exp(1000)\` déborde en \`inf\`. Pour le point 5, calcule la variance de \`Q @ K.T\` avec d = 8 puis d = 512.`,
          solution: `\`\`\`python
import numpy as np

def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)      # stabilité numérique
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V):
    d = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d)                # (n_tokens, n_tokens)
    poids = softmax(scores, axis=-1)
    return poids @ V, poids

rng = np.random.default_rng(0)
n, d = 4, 8
Q, K, V = rng.normal(0, 1, (n, d)), rng.normal(0, 1, (n, d)), rng.normal(0, 1, (n, d))

sortie, poids = attention(Q, K, V)
print("sortie :", sortie.shape)                  # (4, 8)
print("poids  :\\n", poids.round(3))
print("somme par ligne :", poids.sum(axis=1))    # [1. 1. 1. 1.]

# 5. Effet de l'échelle
for d_test in [8, 512]:
    Qd, Kd = rng.normal(0, 1, (n, d_test)), rng.normal(0, 1, (n, d_test))
    brut = Qd @ Kd.T
    print(f"d={d_test:4} -> variance des scores : {brut.var():8.1f} | "
          f"après /sqrt(d) : {(brut/np.sqrt(d_test)).var():.2f}")
\`\`\`

\`\`\`
d=   8 -> variance des scores :      7.9 | après /sqrt(d) : 0.99
d= 512 -> variance des scores :    511.3 | après /sqrt(d) : 1.00
\`\`\`

**Chaque ligne de la matrice d'attention est une distribution de probabilité** — elle somme à 1. La ligne *i* dit : « pour construire ma représentation, le token *i* prend 40 % du token 1, 35 % du token 3, etc. ». La sortie est donc une **moyenne pondérée des valeurs V**, et les poids sont appris.

**La division par √d est ce qui rend l'attention entraînable.**

Le produit scalaire de deux vecteurs aléatoires de dimension *d* a une variance proportionnelle à *d*. À d = 512, les scores bruts ont une variance de 511 — donc des valeurs qui vont couramment de −60 à +60. Passés dans un softmax, ces écarts produisent une distribution **quasi one-hot** : un token capte 99,99 % du poids, tous les autres zéro.

Or le gradient du softmax est proche de zéro dans ses régions saturées. Sans la mise à l'échelle, **le modèle ne peut donc plus apprendre** : les gradients s'évanouissent dès la première couche d'attention.

Diviser par √d ramène la variance à 1 quelle que soit la dimension, ce qui garde le softmax dans sa zone utile. C'est une correction d'une ligne, et c'est ce qui a rendu l'architecture viable.

**Ce qu'il faut retenir de la formule** : Q (*query*) est ce que chaque token **cherche**, K (*key*) ce que chaque token **offre**, V (*value*) ce qu'il **transmet** s'il est sélectionné. Le produit QKᵀ mesure la compatibilité entre toutes les paires — d'où le coût quadratique en longueur de séquence, qui est la principale limite des Transformers.`,
        },
        {
          id: "nlp-2-b",
          kind: "blanche",
          title: "À quoi ce mot fait-il attention ?",
          statement: `**Page blanche.** Interprétation.

Le cours donne l'exemple : dans « la souris mange le fromage car elle a faim », l'attention permet à « elle » de pointer vers « souris ».

**Vérifie-le sur un vrai modèle.**

1. charge un modèle Transformer pré-entraîné avec ses poids d'attention accessibles
2. fais passer une phrase contenant une ambiguïté de référence
3. extrais et visualise la matrice d'attention en heatmap
4. cherche si un couple tête/couche fait effectivement pointer le pronom vers son antécédent
5. teste une phrase où l'antécédent change et vérifie que l'attention suit

Puis conclus honnêtement : **as-tu trouvé ce que le cours annonçait ?**

**Attention à ne pas surinterpréter.** L'attention est un mécanisme de calcul, pas une explication de la pensée du modèle. C'est un débat de recherche actif, et une conclusion nuancée vaut mieux qu'une belle image.`,
          hint: `Avec \`transformers\`, charge un modèle avec \`output_attentions=True\`. La sortie contient un tenseur par couche, de forme \`(batch, n_têtes, n_tokens, n_tokens)\`. Il y a typiquement 12 couches × 12 têtes = 144 matrices à explorer — n'espère pas que la première regardée soit la bonne.`,
          solution: `\`\`\`python
import torch, numpy as np, matplotlib.pyplot as plt, seaborn as sns
from transformers import AutoTokenizer, AutoModel

nom = "camembert-base"          # modèle français
tok = AutoTokenizer.from_pretrained(nom)
modele = AutoModel.from_pretrained(nom, output_attentions=True)

phrase = "la souris mange le fromage car elle a faim"
entrees = tok(phrase, return_tensors="pt")
with torch.no_grad():
    sortie = modele(**entrees)

tokens = tok.convert_ids_to_tokens(entrees["input_ids"][0])
attentions = sortie.attentions            # 12 couches x (1, 12 têtes, n, n)
print("couches :", len(attentions), " forme :", attentions[0].shape)

# Balayage : quelle tête fait pointer "elle" vers "souris" ?
i_elle = [i for i, t in enumerate(tokens) if "elle" in t][0]
i_souris = [i for i, t in enumerate(tokens) if "souris" in t][0]

resultats = []
for c, att in enumerate(attentions):
    for h in range(att.shape[1]):
        resultats.append((att[0, h, i_elle, i_souris].item(), c, h))
resultats.sort(reverse=True)
print("\\nTop 5 couches/têtes pour 'elle' -> 'souris' :")
for score, c, h in resultats[:5]:
    print(f"  couche {c:2}, tête {h:2} : {score:.3f}")

score, c, h = resultats[0]
sns.heatmap(attentions[c][0, h].numpy().round(2), xticklabels=tokens,
            yticklabels=tokens, cmap="viridis", annot=False)
plt.title(f"Attention — couche {c}, tête {h}"); plt.tight_layout(); plt.show()
\`\`\`

**Ce qu'on observe réellement** :

**Oui, on trouve des têtes qui font le lien** — typiquement dans les couches intermédiaires (4 à 8), avec des poids de 0,15 à 0,4 de « elle » vers « souris ». Le phénomène décrit par le cours est réel et reproductible.

**Mais il faut chercher.** Sur 144 têtes, la grande majorité ne fait rien d'interprétable. Certaines regardent systématiquement le token précédent, d'autres le token \`[CLS]\`, d'autres la ponctuation. La spécialisation par tête existe, mais elle est éparse et le lien anaphorique n'est jamais porté par une seule tête de façon nette.

**Et la nuance intellectuellement honnête** : de nombreux travaux ont montré que les poids d'attention ne constituent **pas** une explication fiable du comportement d'un modèle. On peut modifier substantiellement les poids d'attention sans changer la prédiction, et deux distributions d'attention très différentes peuvent produire la même sortie. Le débat « attention is not explanation » est ouvert depuis 2019 et n'est pas tranché.

**Ce que l'attention est vraiment** : un mécanisme de **routage d'information** — quels tokens contribuent au calcul de quels autres. Ce n'est pas une carte de ce que le modèle « comprend ».

**Un mot sur la tokenisation** : \`camembert\` découpe en sous-mots, donc « souris » peut occuper plusieurs positions. Il faut agréger les poids sur tous les sous-tokens d'un mot, sinon on lit un fragment et on conclut de travers. C'est le genre de détail qui fait qu'une visualisation d'attention est fausse sans être visiblement fausse.

---

**Ce que cet exercice entraîne dépasse les Transformers : la retenue face à un beau résultat.** Une heatmap d'attention est très convaincante visuellement, et c'est exactement pour ça qu'il faut se demander ce qu'elle prouve réellement.`,
        },
      ],
      "nlp-3": [
        {
          id: "nlp-3-a",
          kind: "application",
          title: "Un RAG minimal en 30 lignes",
          statement: `Construis un système de question-réponse documentaire complet :

1. prends 5 à 10 paragraphes sur un sujet que tu connais
2. découpe-les en chunks (300 caractères, avec 50 caractères de recouvrement)
3. calcule les embeddings de chaque chunk
4. pour une question donnée, retrouve les 3 chunks les plus proches
5. construis le prompt qui injecte ces chunks et appelle un LLM
6. affiche la réponse **et** les chunks utilisés

Teste ensuite avec une question dont la réponse **n'est pas** dans tes documents. Que se passe-t-il ?`,
          hint: `Le recouvrement entre chunks évite qu'une information soit coupée en deux au mauvais endroit. Pour la recherche, \`cosine_similarity\` puis \`np.argsort(...)[::-1][:3]\`. Dans le prompt, sépare clairement le contexte de la question — et dis explicitement au modèle de s'en tenir au contexte.`,
          solution: `\`\`\`python
import numpy as np, anthropic
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

documents = [
    "Le remboursement d'une commande annulée est effectué sous 14 jours ouvrés...",
    "Les frais de livraison sont offerts à partir de 50 euros d'achat en France...",
    # … 5 à 10 paragraphes
]

def decouper(texte, taille=300, recouvrement=50):
    pas = taille - recouvrement
    return [texte[i:i+taille] for i in range(0, len(texte), pas) if texte[i:i+taille].strip()]

chunks = [c for doc in documents for c in decouper(doc)]
encodeur = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
index = encodeur.encode(chunks)

def recuperer(question, k=3):
    scores = cosine_similarity(encodeur.encode([question]), index)[0]
    meilleurs = np.argsort(scores)[::-1][:k]
    return [(chunks[i], float(scores[i])) for i in meilleurs]

def repondre(question):
    trouves = recuperer(question)
    contexte = "\\n\\n---\\n\\n".join(c for c, _ in trouves)

    client = anthropic.Anthropic()
    msg = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=600,
        system=("Réponds UNIQUEMENT à partir du contexte fourni. "
                "Si le contexte ne contient pas la réponse, dis exactement : "
                "« Je ne trouve pas cette information dans les documents. » "
                "N'invente jamais."),
        messages=[{"role": "user",
                   "content": f"<contexte>\\n{contexte}\\n</contexte>\\n\\nQuestion : {question}"}],
    )
    print("RÉPONSE :", msg.content[0].text)
    print("\\nCHUNKS UTILISÉS :")
    for c, s in trouves:
        print(f"  [{s:.3f}] {c[:80]}…")

repondre("À partir de quel montant la livraison est-elle gratuite ?")
repondre("Quelle est la capitale de la Mongolie ?")     # hors périmètre
\`\`\`

**Sur la question hors périmètre, deux comportements sont possibles, et c'est là que tout se joue.**

Sans l'instruction du \`system\`, le modèle répond « Oulan-Bator » — la bonne réponse, mais tirée de ses connaissances générales et non de tes documents. Pour un assistant documentaire d'entreprise, c'est un échec : l'utilisateur croit lire ta base documentaire alors qu'il lit la mémoire du modèle. Le jour où le modèle se trompera, rien ne le signalera.

Avec l'instruction, il répond « Je ne trouve pas cette information dans les documents ». **C'est le comportement correct**, et c'est le cœur du problem set de ce module.

**Le recouvrement de 50 caractères n'est pas cosmétique** : sans lui, une phrase coupée exactement au milieu perd son sens dans les deux chunks, et la recherche ne la retrouve jamais. C'est une cause fréquente de « le document contient la réponse mais le RAG ne la trouve pas ».

**Les balises \`<contexte>\`** aident le modèle à distinguer nettement les données fournies de l'instruction. C'est une pratique recommandée avec Claude, et elle réduit sensiblement les confusions entre contexte et consigne.

**Afficher les chunks utilisés n'est pas du confort** : c'est la traçabilité. Un utilisateur doit pouvoir vérifier d'où vient la réponse, et un développeur doit pouvoir distinguer une erreur de **récupération** (le bon chunk n'a pas été trouvé) d'une erreur de **génération** (le bon chunk était là, le modèle l'a mal utilisé). Ce sont deux bugs différents, avec deux corrections différentes.

⚠️ Ce RAG minimal utilise une recherche exhaustive, ce qui convient jusqu'à quelques milliers de chunks. Au-delà, il faut une vraie base vectorielle — FAISS ou Chroma — avec un index approximatif.`,
        },
        {
          id: "nlp-3-b",
          kind: "blanche",
          title: "Prompting, RAG ou fine-tuning ?",
          statement: `**Page blanche.** Décision d'architecture.

Quatre demandes arrivent sur ton bureau. Pour chacune, choisis entre **prompt engineering**, **RAG**, **fine-tuning (LoRA)** ou une combinaison — et justifie.

1. « On veut un assistant qui répond aux questions sur nos 4 000 pages de documentation interne, mise à jour chaque semaine. »
2. « On veut que le modèle rédige tous nos comptes rendus dans le style et la structure exacte de notre modèle maison. »
3. « On veut extraire d'un e-mail le nom, la date et le montant, toujours au même format JSON. »
4. « On veut un modèle qui maîtrise le vocabulaire technique très spécifique de notre secteur, absent d'internet. »

Pour chaque cas, précise :
- l'approche retenue et pourquoi
- ce que coûterait le mauvais choix
- comment tu mesurerais que ça marche

**Le critère décisif n'est pas la performance, c'est la nature du besoin.** Cherche laquelle.`,
          hint: `Trois questions tranchent presque tous les cas : (1) le besoin porte-t-il sur des **connaissances** ou sur un **comportement** ? (2) l'information change-t-elle souvent ? (3) dispose-t-on d'exemples annotés en nombre ?`,
          solution: `**1. Documentation interne, 4 000 pages, mise à jour hebdomadaire → RAG, sans hésitation.**

Le besoin porte sur des **connaissances**, et elles **changent**. Le fine-tuning est disqualifié pour cette seule raison : il faudrait réentraîner à chaque mise à jour, et le modèle n'aurait aucun moyen de citer sa source. Avec le RAG, mettre à jour la base revient à réindexer les documents modifiés — quelques minutes.

*Coût du mauvais choix* : un fine-tuning coûteux, périmé dès la semaine suivante, et incapable de justifier ses réponses.
*Mesure* : recall@k sur un jeu de questions de test, plus un taux de réponses correctement refusées hors périmètre.

**2. Style et structure de compte rendu maison → fine-tuning (LoRA), éventuellement précédé de prompting.**

Le besoin porte sur un **comportement**, pas sur des connaissances. Commence par le prompting avec 3 à 5 exemples : c'est gratuit et souvent suffisant. Si le style reste inconstant sur des documents longs, ou si le prompt devient très volumineux et coûteux à chaque appel, le LoRA se justifie — il « intègre » le style dans les poids.

*Coût du mauvais choix* : un RAG serait absurde ici — il n'y a rien à récupérer, le style n'est pas une information à retrouver.
*Mesure* : évaluation humaine sur une grille de conformité au modèle maison, ou LLM-as-judge sur les critères de structure.

**3. Extraction structurée en JSON → prompt engineering, avec sortie contrainte.**

C'est une tâche que les modèles récents accomplissent très bien en zéro-shot avec un schéma explicite. Utilise l'appel d'outil (*tool use*) ou un schéma JSON pour **garantir** la structure plutôt que de l'espérer, et valide avec Pydantic ou Zod.

*Coût du mauvais choix* : fine-tuner pour ça est un gaspillage total — semaines de travail pour ce qu'un prompt bien écrit fait en une heure.
*Mesure* : taux de JSON valides, et exactitude champ par champ sur 100 e-mails annotés.

**4. Vocabulaire technique absent d'internet → RAG d'abord, fine-tuning seulement si nécessaire.**

C'est le cas le plus discuté, et l'intuition « il ne connaît pas ce vocabulaire, donc il faut le lui apprendre » est **le piège**. Un glossaire bien indexé injecté par RAG résout la plupart des situations, pour un coût très inférieur. Le fine-tuning ne devient pertinent que si le modèle doit **produire** ce vocabulaire spontanément et massivement, pas seulement le comprendre.

*Coût du mauvais choix* : un fine-tuning sur données rares provoque souvent un **oubli catastrophique** — le modèle gagne ton jargon et perd des capacités générales.
*Mesure* : jeu de test sur les termes spécifiques, **plus** un jeu de contrôle sur des tâches générales pour détecter la régression.

---

**La règle qui couvre les quatre cas** :

**Connaissances qui changent → RAG.** L'information vit dans une base, pas dans les poids.
**Comportement, style, format → prompting d'abord, fine-tuning si le prompting plafonne.**
**Tâche standard bien définie → prompting, presque toujours suffisant aujourd'hui.**

**Et l'ordre d'essai est toujours le même : prompting, puis RAG, puis fine-tuning.** Chaque étape coûte un ordre de grandeur de plus que la précédente — en argent, en temps, et surtout en maintenance. Le fine-tuning fige une version du modèle que tu devras réentraîner à chaque évolution ; c'est la solution la plus chère à faire vivre, et celle qu'on choisit trop souvent en premier parce qu'elle paraît la plus sérieuse.`,
        },
      ],
      "nlp-4": [
        {
          id: "nlp-4-a",
          kind: "application",
          title: "Ton premier appel API, bien fait",
          statement: `Écris un script qui appelle l'API Claude proprement :

1. la clé lue depuis une variable d'environnement, **jamais** en dur dans le code
2. un \`system\` qui définit un rôle précis
3. une comparaison de la même question à \`temperature=0\` et \`temperature=1\`, trois fois chacune
4. l'affichage du nombre de tokens consommés en entrée et en sortie
5. une gestion d'erreur pour les cas de limite de débit et de panne réseau

Puis calcule le coût de tes appels à partir des tokens consommés.`,
          hint: `\`os.environ["ANTHROPIC_API_KEY"]\` — et le fichier \`.env\` dans le \`.gitignore\`, comme au module Setup. La réponse contient \`msg.usage.input_tokens\` et \`msg.usage.output_tokens\`. Pour les erreurs, \`anthropic.RateLimitError\` et \`anthropic.APIConnectionError\`.`,
          solution: `\`\`\`python
import os, time
import anthropic
from dotenv import load_dotenv

load_dotenv()                                   # lit .env, qui est dans .gitignore
client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

SYSTEME = ("Tu es un tuteur en machine learning. Tu expliques avec des analogies "
           "concrètes, en trois phrases maximum, sans jargon inutile.")

def demander(question, temperature=1.0, essais=3):
    for tentative in range(essais):
        try:
            msg = client.messages.create(
                model="claude-sonnet-5",
                max_tokens=300,
                temperature=temperature,
                system=SYSTEME,
                messages=[{"role": "user", "content": question}],
            )
            return msg
        except anthropic.RateLimitError:
            attente = 2 ** tentative
            print(f"  limite de débit atteinte, nouvelle tentative dans {attente}s")
            time.sleep(attente)
        except anthropic.APIConnectionError as e:
            print(f"  problème réseau : {e}")
            time.sleep(2)
    raise RuntimeError("échec après plusieurs tentatives")

question = "Explique le surapprentissage."
total_in = total_out = 0

for temp in [0.0, 1.0]:
    print(f"\\n=== temperature = {temp} ===")
    for i in range(3):
        msg = demander(question, temperature=temp)
        total_in  += msg.usage.input_tokens
        total_out += msg.usage.output_tokens
        print(f"  [{i+1}] {msg.content[0].text[:110]}…")

print(f"\\nTokens : {total_in} en entrée, {total_out} en sortie")
\`\`\`

**Ce que tu observes sur la température** : à 0, les trois réponses sont identiques ou quasi identiques — le modèle prend systématiquement le token le plus probable. À 1, les trois diffèrent nettement dans la formulation, tout en disant la même chose sur le fond.

**Quand choisir quoi** : température 0 pour tout ce qui doit être **reproductible et vérifiable** — extraction de données, classification, réponses factuelles, RAG. Température plus élevée pour la génération d'idées, la reformulation, la création de variantes.

⚠️ **Température 0 ne garantit pas un déterminisme strict.** L'inférence distribuée introduit de légères variations numériques. C'est « aussi reproductible que possible », pas « identique bit à bit ».

**La gestion d'erreur n'est pas optionnelle en production.** Les limites de débit arrivent systématiquement dès qu'on monte en charge. Le motif standard est le **repli exponentiel** : attendre 1s, puis 2s, puis 4s. Sans lui, une rafale d'appels fait échouer toute la chaîne.

**Le comptage de tokens est ce qui rend le coût prévisible.** Tant qu'on ne le mesure pas, un prototype devient une surprise sur la facture. Les tokens d'entrée coûtent nettement moins cher que ceux de sortie, ce qui a une conséquence directe : injecter beaucoup de contexte est relativement bon marché, générer des réponses longues ne l'est pas.

**Et la clé en variable d'environnement est une règle absolue.** C'est exactement l'exercice « tu viens de pousser ta clé API » du module Setup — ici, du côté où on ne commet pas l'erreur.`,
        },
        {
          id: "nlp-4-b",
          kind: "blanche",
          title: "Le garde-fou anti-hallucination",
          statement: `**Page blanche.** Conception et évaluation.

Ton assistant documentaire répond parfois avec assurance à des questions dont la réponse n'est **pas** dans la base. C'est le défaut le plus grave d'un système RAG : un utilisateur ne peut pas distinguer une réponse fondée d'une réponse inventée.

Conçois le garde-fou complet :
1. construis un jeu de test de 20 questions, dont **5 pièges** sans réponse dans le corpus
2. mesure le comportement du système de base : combien de pièges déclenchent une réponse inventée ?
3. mets en place **au moins deux** mécanismes de protection de nature différente
4. remesure et compare
5. identifie le compromis que tu as introduit — car il y en a toujours un

**Le point 5 est celui qui distingue une vraie solution d'un bricolage.** Un garde-fou trop strict rend le système inutile.`,
          hint: `Deux familles de protection, à combiner : agir **avant** la génération (un seuil sur le score de similarité — si le meilleur chunk est trop loin, on ne génère même pas) et **pendant** la génération (une instruction système explicite, et l'obligation de citer le passage utilisé). Une troisième option consiste à faire vérifier la réponse par un second appel.`,
          solution: `\`\`\`python
import numpy as np, anthropic
from sklearn.metrics.pairwise import cosine_similarity

SEUIL = 0.35        # à calibrer sur ton corpus

def repondre_protege(question, k=3):
    # ── Protection 1 : seuil de récupération, AVANT toute génération ──
    scores = cosine_similarity(encodeur.encode([question]), index)[0]
    meilleurs = np.argsort(scores)[::-1][:k]
    if scores[meilleurs[0]] < SEUIL:
        return {"reponse": "Je ne trouve pas cette information dans les documents.",
                "source": None, "raison": "aucun document pertinent"}

    contexte = "\\n\\n".join(f"[{i}] {chunks[i]}" for i in meilleurs)

    # ── Protection 2 : instruction système + citation obligatoire ──
    client = anthropic.Anthropic()
    msg = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=500,
        temperature=0,
        system=(
            "Tu réponds UNIQUEMENT à partir des extraits fournis.\\n"
            "Règles absolues :\\n"
            "1. Si les extraits ne contiennent pas la réponse, réponds exactement : "
            "   « Je ne trouve pas cette information dans les documents. »\\n"
            "2. Toute affirmation doit être suivie du numéro d'extrait, ex. [2].\\n"
            "3. N'utilise jamais tes connaissances générales.\\n"
            "4. Dans le doute, refuse plutôt que d'approximer."
        ),
        messages=[{"role": "user",
                   "content": f"<extraits>\\n{contexte}\\n</extraits>\\n\\nQuestion : {question}"}],
    )
    texte = msg.content[0].text

    # ── Protection 3 : vérification de la présence d'une citation ──
    if "ne trouve pas" not in texte and "[" not in texte:
        return {"reponse": "Je ne trouve pas cette information dans les documents.",
                "source": None, "raison": "réponse sans citation, rejetée"}

    return {"reponse": texte, "source": [int(i) for i in meilleurs], "raison": "ok"}
\`\`\`

**2 et 4. La mesure, avant et après** :

\`\`\`python
pieges = ["Quelle est la capitale de la Mongolie ?",
          "Quel est le salaire du directeur ?",
          "Combien de salariés en 2019 ?",
          "Quelle est la politique de télétravail ?",
          "Quand a lieu la prochaine augmentation ?"]

for q in pieges:
    r = repondre_protege(q)
    refus = "ne trouve pas" in r["reponse"]
    print(f"{'REFUS OK ' if refus else 'INVENTÉ  '} | {q}  ({r['raison']})")
\`\`\`

**Typiquement : 3 à 4 pièges sur 5 déclenchent une réponse inventée sans protection, 0 à 1 après.** Les trois mécanismes agissent à des moments différents, ce qui est le point important : le seuil arrête ce qui n'aurait jamais dû arriver au modèle, l'instruction guide la génération, la vérification de citation attrape ce qui a échappé aux deux premiers.

**5. Le compromis — et il est inévitable.**

Un seuil plus strict augmente le taux de refus **corrects**, mais aussi les **faux refus** : des questions dont la réponse est bien dans le corpus, formulées de façon inhabituelle, se voient refusées. Le système devient frustrant, et les utilisateurs cessent de s'en servir.

C'est exactement le compromis précision/rappel du module ML classique, transposé au RAG. Et comme là-bas, **il n'a pas de réponse technique — il a une réponse métier** : que coûte une réponse inventée, comparé à un refus injustifié ?

Pour un assistant juridique ou médical, le seuil doit être haut : une information fausse peut avoir des conséquences graves. Pour un moteur de recherche interne, un seuil bas est préférable : un refus de trop pousse l'utilisateur à abandonner l'outil.

**Il faut donc mesurer les deux taux séparément** :

\`\`\`
taux de refus corrects   : sur les 5 pièges, combien refusés ?      (viser 100 %)
taux de faux refus       : sur les 15 vraies questions, combien refusés ? (viser 0 %)
\`\`\`

Un seul chiffre global masquerait le compromis. **C'est le jeu de test qui est le vrai livrable de cet exercice**, pas le code du garde-fou : sans lui, tu ne peux ni calibrer le seuil, ni détecter une régression le jour où tu changes de modèle.`,
        },
      ],
    },
    finalExercise: {
      title: "Assistant documentaire par RAG",
      duration: "8 à 12 h",
      covers: ["nlp-1", "nlp-2", "nlp-3", "nlp-4"],
      brief: `Un chatbot qui répond à partir d'une base documentaire — **et qui admet quand il ne sait pas**.

Cet exercice **rassemble les 4 leçons du module** — embeddings et recherche sémantique (leçon 1), compréhension du mécanisme sous-jacent (leçon 2), architecture RAG (leçon 3), appel LLM et garde-fous (leçon 4).

C'est le projet le plus proche de ce qu'on te demandera en entreprise aujourd'hui. Et la partie qui fait la différence n'est pas de le faire répondre : c'est de le faire **refuser** correctement.`,
      dataset: `Prends un corpus que tu connais vraiment — la documentation d'une bibliothèque que tu utilises, un règlement intérieur, tes propres notes de cours de ce parcours. **Connaître le corpus est indispensable** : sans ça, tu ne peux pas juger si une réponse est fondée ou inventée.

Vise 50 à 200 pages. En dessous, la récupération est triviale ; au-dessus, l'indexation devient longue sans rien t'apprendre de plus.`,
      steps: [
        "**Stratégie de découpage justifiée** — taille de chunk, recouvrement, découpage par paragraphe ou par section. Teste au moins deux stratégies et compare leur recall. (leçon 3)",
        "**Indexation dans une base vectorielle** (FAISS ou Chroma) — la recherche exhaustive suffit jusqu'à quelques milliers de chunks, au-delà il faut un index approximatif. (leçons 1 et 3)",
        "**Mesure la qualité de la récupération** avec le recall@k : sur tes questions de test, le bon chunk est-il dans les k premiers ? C'est la métrique qui sépare une erreur de récupération d'une erreur de génération. (leçon 1)",
        "**Garde-fou anti-hallucination** — au moins deux mécanismes de nature différente : un seuil avant génération, une instruction système, une citation obligatoire. Le système doit refuser hors périmètre. (leçon 4)",
        "**Évaluation sur 20 questions**, dont **5 pièges** sans réponse dans le corpus. Rapporte séparément le taux de refus corrects et le taux de faux refus. (leçon 4)",
        "**Recherche hybride** — ajoute un moteur lexical (BM25 ou TF-IDF) à côté du sémantique et fusionne les classements. Montre une requête où chacun des deux gagne. (leçon 1)",
      ],
      checklist: [
        "Ma clé API est dans une variable d'environnement, jamais dans le code ni dans Git",
        "Je peux distinguer une erreur de récupération d'une erreur de génération",
        "Mon recall@k est mesuré, pas estimé à l'œil",
        "Mon système refuse les 5 questions pièges",
        "Je rapporte le taux de faux refus, pas seulement le taux de refus corrects",
        "Chaque réponse affiche le passage source, vérifiable par l'utilisateur",
      ],
      selfCheck: `Le vrai test : **fais utiliser ton assistant par quelqu'un qui connaît le corpus mais pas ton code**, et demande-lui de tenter de le piéger.

Il trouvera des questions auxquelles tu n'avais pas pensé, et c'est exactement l'intérêt. Un système RAG évalué uniquement par son auteur est évalué sur les questions que son auteur savait déjà bien traiter.`,
    },
    quizExtra: [
      {
        q: "Deux phrases n'ont aucun mot en commun mais une similarité cosinus de 0.71. Comment est-ce possible ?",
        options: [
          "C'est une erreur de calcul",
          "Les embeddings encodent le sens dans la géométrie de l'espace, pas les mots : deux paraphrases ont des vecteurs de direction proche",
          "Le modèle a mémorisé ces deux phrases pendant son entraînement",
          "La similarité cosinus ignore les mots courts",
        ],
        answer: 1,
        explain:
          "C'est toute la différence avec une recherche par mots-clés. « Le chat dort sur le canapé » et « un félin se repose sur le sofa » ont un Jaccard de 0.15 — presque rien — mais un cosinus de 0.71. Le sens est distribué dans les 384 dimensions ; aucune ne correspond à un concept identifiable, c'est la direction du vecteur qui porte l'information.",
      },
      {
        q: "Dans l'attention, pourquoi diviser QKᵀ par √d ?",
        options: [
          "Pour normaliser les vecteurs entre 0 et 1",
          "Parce que la variance du produit scalaire croît avec d : sans cette division, le softmax sature et les gradients s'évanouissent",
          "Pour accélérer le calcul matriciel",
          "Pour que les poids d'attention somment à 1",
        ],
        answer: 1,
        explain:
          "À d = 512, les scores bruts ont une variance de ~511, donc des valeurs de -60 à +60. Passés dans un softmax, ils produisent une distribution quasi one-hot où un token capte tout le poids. Or le gradient du softmax est nul dans ses régions saturées : le modèle ne peut plus apprendre. Diviser par √d ramène la variance à 1 quelle que soit la dimension — une correction d'une ligne qui a rendu l'architecture viable.",
      },
      {
        q: "Ta documentation interne change chaque semaine. Quelle approche pour un assistant qui y répond ?",
        options: [
          "Fine-tuning hebdomadaire du modèle",
          "RAG : l'information vit dans une base réindexable, pas dans les poids du modèle",
          "Prompt engineering avec la documentation entière dans le prompt",
          "Pré-entraînement d'un modèle spécialisé",
        ],
        answer: 1,
        explain:
          "Le besoin porte sur des connaissances qui changent : c'est le critère décisif. Réentraîner à chaque mise à jour serait coûteux et le modèle ne pourrait jamais citer sa source. Avec le RAG, mettre à jour revient à réindexer les documents modifiés. La règle générale : connaissances qui changent → RAG ; comportement, style, format → prompting puis fine-tuning si le prompting plafonne.",
      },
      {
        q: "Ton RAG répond correctement à une question hors périmètre en puisant dans les connaissances générales du modèle. Est-ce acceptable ?",
        options: [
          "Oui, la réponse est juste",
          "Non : l'utilisateur croit lire la base documentaire alors qu'il lit la mémoire du modèle — le jour où celle-ci se trompe, rien ne le signale",
          "Oui, si on baisse la température",
          "Cela dépend de la longueur de la réponse",
        ],
        answer: 1,
        explain:
          "Le problème n'est pas l'exactitude de cette réponse-là, c'est la confusion de source. Un assistant documentaire fait une promesse implicite : « je réponds à partir de vos documents ». Dès qu'il puise ailleurs sans le dire, l'utilisateur ne peut plus distinguer une réponse fondée d'une réponse inventée. Le garde-fou correct combine un seuil de récupération, une instruction système explicite et une citation obligatoire.",
      },
      {
        q: "Pour retrouver une référence produit exacte comme « BIENVENUE10 », quel moteur est le meilleur ?",
        options: [
          "La recherche sémantique par embeddings",
          "La recherche lexicale (TF-IDF / BM25) : un token rare est extrêmement discriminant, alors que le modèle d'embedding ne l'a jamais vu",
          "Les deux donnent le même résultat",
          "Aucun : il faut une recherche par expression régulière",
        ],
        answer: 1,
        explain:
          "Le modèle d'embedding découpe un token inconnu en sous-mots sans signification et produit un vecteur flou — il remonte des documents « à peu près sur les promotions ». TF-IDF, lui, traite le token rare comme très discriminant et trouve le document exact. D'où la recherche hybride en production : sémantique pour l'intention et la reformulation, lexical pour les termes exacts, classements fusionnés.",
      },
      {
        q: "Tu durcis le seuil de similarité de ton RAG pour éviter les hallucinations. Quel effet secondaire dois-tu mesurer ?",
        options: [
          "L'augmentation du temps de réponse",
          "Le taux de faux refus : des questions dont la réponse EST dans le corpus mais formulées inhabituellement se voient refusées",
          "La consommation de tokens",
          "La dégradation des embeddings",
        ],
        answer: 1,
        explain:
          "C'est le compromis précision/rappel du module ML classique, transposé au RAG. Un seuil trop strict rend le système frustrant et les utilisateurs l'abandonnent. Il faut donc mesurer les deux taux séparément — refus corrects sur les pièges, faux refus sur les vraies questions — car un seul chiffre global masquerait l'arbitrage. Et cet arbitrage est métier : que coûte une réponse inventée par rapport à un refus injustifié ?",
      },
    ],
  },

  // ══ CLOUD, DOCKER & DÉPLOIEMENT AWS ═══════════════════════════════════════
  "cloud-aws": {
    lessons: {
      "cloud-1": [
        {
          id: "cloud-1-a",
          kind: "application",
          title: "Conteneuriser une API de prédiction",
          statement: `Prends une API FastAPI qui charge un modèle et expose \`/predict\`, puis :

1. écris le \`Dockerfile\`
2. écris un \`.dockerignore\`
3. construis l'image et lance le conteneur sur le port 8000
4. teste l'endpoint avec \`curl\` depuis ta machine
5. consulte les logs du conteneur, puis arrête-le proprement

Vérifie enfin que l'API répond **depuis l'extérieur du conteneur** — c'est là que la plupart des gens bloquent la première fois.`,
          hint: `Le piège classique : \`uvicorn\` écoute par défaut sur \`127.0.0.1\`, ce qui signifie « uniquement depuis l'intérieur du conteneur ». Il faut \`--host 0.0.0.0\` pour accepter les connexions venant du dehors. Et \`-p 8000:8000\` fait le lien entre le port de ta machine et celui du conteneur.`,
          solution: `\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app

# Les dépendances AVANT le code : cette couche est mise en cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY model.pkl .

EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

\`\`\`
# .dockerignore
.venv/
__pycache__/
*.csv
.git/
notebooks/
.env
\`\`\`

\`\`\`bash
docker build -t api-ml:v1 .
docker run -d -p 8000:8000 --name api api-ml:v1

curl -X POST http://localhost:8000/predict \\
     -H "Content-Type: application/json" \\
     -d '{"age": 35, "revenu": 42000}'

docker logs api
docker stop api && docker rm api
\`\`\`

**Le \`--host 0.0.0.0\` est le point qui bloque tout le monde une fois.** Par défaut, uvicorn n'écoute que sur l'interface locale du conteneur — donc l'API tourne, les logs sont propres, et \`curl\` depuis ta machine échoue sans explication. \`0.0.0.0\` signifie « accepte les connexions sur toutes les interfaces ».

**L'ordre des instructions du Dockerfile n'est pas arbitraire : il détermine le cache.** Docker met chaque couche en cache et rejoue tout ce qui suit dès qu'une couche change. En copiant \`requirements.txt\` **avant** le code, l'installation des dépendances n'est refaite que si les dépendances changent. Copier tout le projet d'abord réinstallerait tout à chaque modification d'une ligne de code — trente secondes contre trois minutes, à chaque itération.

**Le \`.dockerignore\` fait deux choses.** Il réduit la taille de l'image, et surtout il **empêche des secrets et des données d'y entrer**. Un \`.env\` copié dans une image poussée sur un registre public, c'est la même faute qu'un \`.env\` commité dans Git — avec la même conséquence : la clé est compromise.

**Le \`--no-cache-dir\`** évite que pip conserve ses archives téléchargées dans l'image : quelques dizaines de mégaoctets gagnés pour rien.`,
        },
        {
          id: "cloud-1-b",
          kind: "blanche",
          title: "L'image de 1,2 Go",
          statement: `**Page blanche.** Optimisation mesurée.

Ton image Docker fait **1,2 Go**. Le déploiement prend huit minutes et coûte cher en stockage et en bande passante.

Réduis-la, et **prouve chaque gain**.

Ton travail :
1. mesure la taille de départ et identifie **où** est le poids (quelle couche pèse quoi ?)
2. applique au moins trois optimisations de nature différente
3. mesure après chacune, séparément
4. vérifie que l'image réduite **fonctionne toujours** — une image légère qui ne démarre pas ne vaut rien
5. dis quelle optimisation a le meilleur rapport gain/complexité

**Ne te contente pas de changer l'image de base.** Il y a plus à gagner ailleurs.`,
          hint: `\`docker history <image>\` montre le poids de chaque couche — commence toujours par là. Les grandes familles d'optimisation : changer l'image de base, ne pas embarquer les outils de compilation dans l'image finale (multi-stage), exclure les fichiers inutiles, et éviter les dépendances lourdes quand une version allégée existe.`,
          solution: `\`\`\`bash
docker images api-ml:v1                 # 1.24 GB
docker history api-ml:v1 --human        # où est le poids ?
\`\`\`

**1. Le diagnostic** montre presque toujours le même classement : l'image de base Python complète (~900 Mo), puis les dépendances scientifiques (torch, scipy), puis le code et les données copiés par erreur.

**2 et 3. Les optimisations, mesurées une par une** :

**a) Image de base allégée** — \`python:3.11\` → \`python:3.11-slim\` : environ **−700 Mo**. La version complète embarque des compilateurs et des outils de build inutiles à l'exécution.

**b) Multi-stage build** — compiler dans une première étape, ne copier que le résultat dans la seconde : **−150 à −300 Mo** selon les dépendances.

\`\`\`dockerfile
# ── Étape 1 : construction ──────────────────────────────────
FROM python:3.11-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc g++
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# ── Étape 2 : exécution ─────────────────────────────────────
FROM python:3.11-slim
WORKDIR /app
COPY --from=build /root/.local /root/.local
COPY src/ ./src/
COPY model.pkl .
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

**c) \`.dockerignore\` sérieux** — exclure \`.git/\`, \`.venv/\`, \`notebooks/\`, \`data/\`, \`*.csv\` : **−50 à −400 Mo**, et parfois beaucoup plus. Un \`.git/\` d'un projet ancien pèse souvent des centaines de mégaoctets.

**d) Dépendances allégées** — sur une API d'inférence, \`torch\` en version CPU au lieu de la version CUDA fait gagner **plus de 1 Go** à lui seul :
\`\`\`
--extra-index-url https://download.pytorch.org/whl/cpu
torch==2.4.0+cpu
\`\`\`

**Résultat typique : 1,24 Go → 280 Mo**, soit un déploiement qui passe de huit minutes à moins d'une.

**4. La vérification n'est pas optionnelle** :
\`\`\`bash
docker run -d -p 8000:8000 --name test api-ml:v2
sleep 3
curl -f http://localhost:8000/predict -H "Content-Type: application/json" -d '{"age": 35}' \\
  && echo "OK" || echo "CASSÉ"
docker stop test && docker rm test
\`\`\`
Le multi-stage est précisément l'optimisation qui casse le plus souvent : on oublie de copier une bibliothèque système, et l'erreur n'apparaît qu'au démarrage.

**5. Le meilleur rapport gain/complexité, c'est le \`.dockerignore\` et l'image \`slim\`** — deux lignes chacun, aucun risque, et souvent 80 % du gain total. Le multi-stage demande plus de soin et se justifie surtout quand des dépendances doivent être compilées.

---

**Le principe : une image de production ne contient que ce qui est nécessaire à l'exécution.** Ni compilateur, ni jeu de données, ni historique Git, ni notebooks. Ce n'est pas seulement une question de taille : chaque outil superflu dans une image est une **surface d'attaque** de plus.`,
        },
      ],
      "cloud-2": [
        {
          id: "cloud-2-a",
          kind: "application",
          title: "Versionner ses modèles sur S3",
          statement: `Avec \`boto3\` :

1. crée un bucket (ou utilise-en un existant)
2. envoie un modèle sous une clé versionnée : \`models/v1/model.pkl\`
3. liste tous les objets sous le préfixe \`models/\`
4. télécharge le modèle et vérifie qu'il se charge correctement
5. écris une fonction \`charger_modele(version)\` qui récupère la version demandée depuis S3

Ajoute une gestion d'erreur pour le cas où la version demandée n'existe pas.`,
          hint: `S3 n'a pas de vrais dossiers : \`models/v1/model.pkl\` est une **clé** unique, et la hiérarchie est une convention d'affichage. C'est pourquoi \`list_objects_v2\` prend un \`Prefix\` et non un chemin de répertoire.`,
          solution: `\`\`\`python
import boto3, joblib, io
from botocore.exceptions import ClientError

s3 = boto3.client("s3")
BUCKET = "mon-bucket-ml"

def publier_modele(chemin_local, version):
    cle = f"models/{version}/model.pkl"
    s3.upload_file(chemin_local, BUCKET, cle)
    print(f"publié : s3://{BUCKET}/{cle}")

def lister_versions():
    reponse = s3.list_objects_v2(Bucket=BUCKET, Prefix="models/")
    for obj in reponse.get("Contents", []):
        print(f"  {obj['Key']:40} {obj['Size']/1024:8.1f} Ko  {obj['LastModified']:%Y-%m-%d}")

def charger_modele(version):
    cle = f"models/{version}/model.pkl"
    try:
        tampon = io.BytesIO()
        s3.download_fileobj(BUCKET, cle, tampon)   # en mémoire, pas de fichier temporaire
        tampon.seek(0)
        return joblib.load(tampon)
    except ClientError as e:
        if e.response["Error"]["Code"] in ("404", "NoSuchKey"):
            raise ValueError(f"version « {version} » introuvable dans s3://{BUCKET}/models/")
        raise

publier_modele("model.pkl", "v1")
lister_versions()
modele = charger_modele("v1")
\`\`\`

**Versionner par clé plutôt qu'écraser \`model.pkl\` est ce qui rend un retour arrière possible.** Le jour où la v3 se comporte mal en production, revenir à la v2 est une variable d'environnement à changer, pas un réentraînement. C'est la même logique que les commits Git : on n'écrase pas, on ajoute.

**\`download_fileobj\` charge en mémoire** au lieu d'écrire un fichier temporaire. Sur une fonction Lambda, où le disque est limité et éphémère, c'est souvent la seule option viable.

**La gestion d'erreur distingue « version inexistante » des autres pannes.** Un message « version v4 introuvable » se diagnostique en trois secondes ; un \`ClientError\` brut envoie chercher pendant vingt minutes.

**Le préfixe \`models/\` n'est pas un dossier.** S3 est un magasin clé-valeur plat : la barre oblique est une convention que la console affiche comme une arborescence. Comprendre ça évite de chercher une API de « création de dossier » qui n'existe pas.

⚠️ **Ne mets jamais tes identifiants AWS dans le code.** \`boto3\` les cherche automatiquement dans les variables d'environnement, dans \`~/.aws/credentials\`, ou — en production — dans le **rôle IAM** attaché à la machine. Cette dernière option est la bonne : aucune clé à gérer, aucune à faire fuiter.`,
        },
        {
          id: "cloud-2-b",
          kind: "blanche",
          title: "Le moindre privilège, et la facture",
          statement: `**Page blanche.** Sécurité et coût.

Ton API de prédiction tourne sur AWS. Elle doit :
- lire les modèles depuis \`s3://mon-bucket-ml/models/\`
- écrire ses logs de prédiction dans \`s3://mon-bucket-ml/logs/\`
- rien d'autre

Un collègue propose de lui attacher la politique \`AmazonS3FullAccess\` « pour aller plus vite ».

**Première partie — la politique** :
1. explique concrètement ce que \`AmazonS3FullAccess\` autorise, et le scénario du pire
2. écris la politique IAM minimale, **et justifie chaque action** que tu accordes
3. explique pourquoi lecture et écriture ne portent pas sur le même préfixe

**Seconde partie — le coût** :
4. compare le coût mensuel de deux architectures (Lambda et EC2) pour **1 000** puis **1 000 000** de requêtes par mois
5. dis à partir de quel volume la réponse s'inverse

**Ne te contente pas de dire « c'est dangereux ».** Décris ce qui peut réellement arriver.`,
          hint: `Une politique IAM se compose d'actions (\`s3:GetObject\`), de ressources (l'ARN, avec des jokers) et d'un effet (\`Allow\`). Pour les coûts, Lambda facture à la requête et à la durée d'exécution, EC2 facture à l'heure — que la machine serve une requête ou un million.`,
          solution: `**1. Ce que \`AmazonS3FullAccess\` autorise réellement** : lire, écrire **et supprimer** dans **tous** les buckets du compte — y compris ceux qui n'ont rien à voir avec le ML : sauvegardes, données clients, journaux d'audit.

*Le scénario du pire* : une faille d'injection dans ton API, ou une clé qui fuite, et l'attaquant a un accès complet à tout le stockage de l'entreprise. La suppression est le pire cas : \`s3:DeleteObject\` sur l'ensemble du compte peut effacer des sauvegardes irrécupérables. Ce n'est pas une hypothèse d'école — c'est le mode de propagation le plus courant d'un incident de sécurité cloud.

**2. La politique minimale** :

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LireLesModeles",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::mon-bucket-ml/models/*"
    },
    {
      "Sid": "EcrireLesLogs",
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::mon-bucket-ml/logs/*"
    },
    {
      "Sid": "ListerLesModeles",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::mon-bucket-ml",
      "Condition": { "StringLike": { "s3:prefix": ["models/*"] } }
    }
  ]
}
\`\`\`

**La justification de chaque action** :
- \`s3:GetObject\` sur \`models/*\` — nécessaire pour charger le modèle. Restreint au préfixe : l'API n'a aucune raison de lire les logs.
- \`s3:PutObject\` sur \`logs/*\` — nécessaire pour tracer les prédictions. **Pas** \`s3:DeleteObject\` : une API qui écrit des logs ne doit jamais pouvoir les effacer, sinon un attaquant efface ses traces.
- \`s3:ListBucket\` — nécessaire pour découvrir les versions disponibles, et volontairement conditionné au préfixe \`models/\`.

**3. Pourquoi lecture et écriture sur des préfixes différents** : c'est le principe de séparation des privilèges. Si l'API pouvait écrire dans \`models/\`, une compromission permettrait de **remplacer le modèle** par un modèle malveillant — attaque bien plus discrète qu'un vol de données, et qui fausserait toutes les décisions du système sans que rien ne semble anormal.

**4 et 5. Le coût, chiffré** (ordres de grandeur, région Canada) :

| | 1 000 req/mois | 1 000 000 req/mois |
|---|---|---|
| **Lambda** (512 Mo, 200 ms) | ≈ 0,01 $ | ≈ 4 $ |
| **EC2 t3.small** (24/7) | ≈ 17 $ | ≈ 17 $ |

À faible volume, **Lambda est 1 000 fois moins cher** : on ne paie rien quand personne n'appelle. À un million de requêtes, Lambda reste devant. Le basculement se produit vers **10 à 50 millions de requêtes par mois**, ou plus tôt si le modèle est lourd à charger — car chaque démarrage à froid recharge le modèle, ce qui allonge la durée facturée.

**Le vrai critère n'est d'ailleurs pas seulement le prix** : Lambda a des démarrages à froid de 1 à 10 secondes avec un gros modèle, ce qui est rédhibitoire pour une API à faible latence. EC2 garde le modèle en mémoire.

---

**Les deux principes** :

**Le moindre privilège** : n'accorde que ce qui est nécessaire, sur les ressources exactement concernées. La question à se poser pour chaque permission est « qu'est-ce qui se passe si cette machine est compromise ? ».

**Une alerte de budget avant tout déploiement.** AWS Budgets prend deux minutes à configurer, et c'est la différence entre découvrir une boucle infinie à 40 $ ou à 4 000 $.`,
        },
      ],
      "cloud-3": [
        {
          id: "cloud-3-a",
          kind: "application",
          title: "Un pipeline qui refuse de déployer un mauvais modèle",
          statement: `Écris un workflow GitHub Actions qui, à chaque push sur \`main\` :

1. installe les dépendances et lance \`pytest\`
2. entraîne le modèle
3. **vérifie que le F1 dépasse 0,80** — et fait échouer le workflow sinon
4. ne construit et ne pousse l'image Docker **que si** toutes les étapes précédentes ont réussi
5. utilise les secrets GitHub pour les identifiants AWS

Le point 3 est le cœur de l'exercice : un test de non-régression sur la performance du modèle.`,
          hint: `Un script Python qui se termine par \`sys.exit(1)\` fait échouer l'étape GitHub Actions, et donc tout le job. Le \`needs:\` entre jobs crée la dépendance : le job de déploiement ne démarre que si celui de test a réussi.`,
          solution: `\`\`\`yaml
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
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip
      - run: pip install -r requirements.txt
      - name: Tests unitaires
        run: pytest tests/ -v
      - name: Entraînement et seuil de performance
        run: python src/train.py --check-threshold 0.80

  deploy:
    needs: test                                   # ne démarre QUE si test a réussi
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build et push vers ECR
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          docker build -t api-ml:\${{ github.sha }} .
          aws ecr get-login-password --region ca-central-1 \\
            | docker login --username AWS --password-stdin \$ECR_REGISTRY
          docker push \$ECR_REGISTRY/api-ml:\${{ github.sha }}
\`\`\`

\`\`\`python
# src/train.py — la partie qui fait échouer le pipeline
import sys, argparse
from sklearn.metrics import f1_score

parser = argparse.ArgumentParser()
parser.add_argument("--check-threshold", type=float, default=None)
args = parser.parse_args()

# … entraînement …
f1 = f1_score(y_test, modele.predict(X_test))
print(f"F1 = {f1:.4f}")

if args.check_threshold is not None and f1 < args.check_threshold:
    print(f"ÉCHEC : F1 {f1:.4f} < seuil {args.check_threshold}", file=sys.stderr)
    sys.exit(1)                       # code de sortie non nul -> job en échec
\`\`\`

**Le \`sys.exit(1)\` est tout le mécanisme.** GitHub Actions considère une étape en échec dès que le code de sortie est non nul. Un modèle sous le seuil bloque donc le déploiement automatiquement, sans intervention humaine.

**C'est ce qui distingue un pipeline ML d'un pipeline logiciel classique.** En développement logiciel, les tests vérifient un comportement : la fonction retourne-t-elle la bonne valeur ? En ML, le code peut être parfaitement correct et le **modèle** mauvais — données dégradées, dérive, bug dans une transformation. Le test de non-régression sur la métrique est le seul garde-fou contre ça.

**Le \`needs: test\`** crée la dépendance entre jobs. Sans lui, les deux tournent en parallèle et l'image part en production même si les tests échouent.

**Les secrets ne sont jamais dans le YAML.** \`\${{ secrets.AWS_ACCESS_KEY_ID }}\` lit une valeur stockée chiffrée dans les paramètres du dépôt, et GitHub la masque automatiquement dans les logs. Une clé écrite en clair dans le workflow est publique dès le premier push — exactement le scénario du module Setup.

**\`cache: pip\`** met les dépendances en cache entre les exécutions : quelques minutes gagnées à chaque push, ce qui change la fréquence à laquelle on accepte de lancer le pipeline.

**Le tag \`\${{ github.sha }}\`** identifie l'image par le commit exact qui l'a produite. C'est ce qui permet de revenir en arrière avec certitude : chaque image est traçable jusqu'à une ligne de code.`,
        },
        {
          id: "cloud-3-b",
          kind: "blanche",
          title: "Le pipeline a déployé un modèle cassé",
          statement: `**Page blanche.** Post-mortem et conception.

Lundi matin, la production sert des prédictions aberrantes depuis vendredi soir. L'enquête montre que :
- les tests unitaires sont passés (le code est correct)
- le F1 mesuré était de 0,84, au-dessus du seuil de 0,80
- mais une colonne du flux de données amont a changé de format jeudi
- le pipeline a entraîné, validé et déployé sans rien remarquer

**Conçois les garde-fous qui auraient attrapé ça.**

1. explique pourquoi le seuil sur le F1 n'a pas suffi
2. propose **au moins quatre** contrôles de nature différente, et dis ce que chacun aurait détecté
3. écris le code d'au moins deux d'entre eux
4. conçois la procédure de retour arrière : combien de temps pour revenir à la version précédente ?
5. rédige le post-mortem en une page — sans désigner de coupable

**Le point 5 compte autant que les autres.** Un post-mortem qui cherche un responsable ne produit aucune amélioration.`,
          hint: `Le F1 a été mesuré sur un jeu de test **figé**, qui datait d'avant le changement de format. Demande-toi à quel moment de la chaîne le problème est apparu, et quel contrôle aurait pu se déclencher à ce moment-là plutôt qu'au moment de l'évaluation.`,
          solution: `**1. Pourquoi le F1 n'a rien vu** : il a été calculé sur un jeu de test **figé**, enregistré avant le changement de format. Le modèle a été entraîné sur des données dégradées, puis évalué sur des données propres. Le score était donc valide — et sans rapport avec ce qui allait se passer en production.

**C'est le défaut structurel d'un seuil sur la métrique seule : il valide le modèle, jamais les données qui l'ont produit.**

**2. Les quatre familles de contrôles** :

**a) Validation du schéma des données, à l'entrée du pipeline.** Types, colonnes présentes, plages de valeurs, taux de valeurs manquantes. *Aurait détecté le changement de format jeudi, avant même l'entraînement.* C'est le contrôle le plus en amont, donc le plus rentable.

**b) Comparaison des distributions entre l'entraînement précédent et le nouveau.** Test de Kolmogorov-Smirnov ou PSI sur chaque variable. *Aurait détecté un décalage massif sur la colonne concernée.*

**c) Jeu de test glissant, pas figé.** Évaluer aussi sur les données les plus récentes, pas seulement sur un instantané historique. *Aurait fait chuter le F1 et bloqué le déploiement.*

**d) Déploiement canari + surveillance de la distribution des prédictions.** Envoyer 5 % du trafic vers le nouveau modèle et comparer. *Aurait limité l'incident à 5 % des utilisateurs et déclenché une alerte en quelques minutes au lieu de trois jours.*

**3. Le code de deux d'entre eux** :

\`\`\`python
# a) Validation du schéma — à lancer AVANT l'entraînement
import pandera as pa
from pandera import Column, Check

schema = pa.DataFrameSchema({
    "age":     Column(int,   Check.between(18, 100)),
    "revenu":  Column(float, Check.greater_than(0), nullable=True),
    "region":  Column(str,   Check.isin(["Nord", "Sud", "Est", "Ouest"])),
    "montant": Column(float, Check.between(0, 100_000)),
})

def valider(df):
    try:
        schema.validate(df, lazy=True)          # lazy : remonte TOUTES les erreurs
    except pa.errors.SchemaErrors as e:
        print(e.failure_cases)
        sys.exit(1)                             # bloque le pipeline
\`\`\`

\`\`\`python
# b) Comparaison de distributions entre l'ancien et le nouveau lot
from scipy import stats

def detecter_derive(reference, nouveau, seuil=0.01):
    alertes = []
    for col in reference.select_dtypes("number").columns:
        _, p = stats.ks_2samp(reference[col].dropna(), nouveau[col].dropna())
        if p < seuil:
            alertes.append((col, p))
    if alertes:
        for col, p in alertes:
            print(f"DÉRIVE sur « {col} » : p = {p:.2e}", file=sys.stderr)
        sys.exit(1)
\`\`\`

**4. La procédure de retour arrière**. C'est la question qu'il faut se poser **avant** l'incident, pas pendant :

\`\`\`bash
# Chaque image est taguée par le SHA du commit -> chaque version est retrouvable
aws ecs update-service --cluster prod --service api-ml \\
  --task-definition api-ml:PRECEDENTE --force-new-deployment
\`\`\`

L'objectif est **moins de cinq minutes**, sans réentraînement et sans rebuild. Si revenir en arrière demande de relancer un entraînement, la procédure n'existe pas vraiment. Et elle doit être **testée régulièrement** : un retour arrière qu'on n'a jamais répété échoue le jour où on en a besoin.

**5. Le post-mortem, sans coupable** :

> **Ce qui s'est passé.** Jeudi 14 h, le format de la colonne \`montant\` du flux amont est passé de float à chaîne avec séparateur décimal virgule. Le pipeline a converti silencieusement en valeurs nulles, entraîné un modèle dégradé, et l'a validé à 0,84 sur un jeu de test figé antérieur au changement. Déploiement vendredi 19 h, détection lundi 9 h.
>
> **Pourquoi ça n'a pas été détecté.** Aucune validation de schéma en entrée de pipeline. Jeu de test figé. Aucune surveillance de la distribution des prédictions en production. Le seuil sur le F1 validait le modèle mais pas les données.
>
> **Ce que nous changeons.** Validation de schéma bloquante avant entraînement (a). Détection de dérive entre lots (b). Jeu de test glissant sur les 30 derniers jours (c). Déploiement canari à 5 % avec alerte automatique (d). Procédure de retour arrière documentée et testée mensuellement.
>
> **Ce que nous ne changeons pas.** Rien dans le processus de revue de code : le code était correct. Le problème était en amont, dans les données.

**Le post-mortem sans coupable n'est pas une politesse, c'est une méthode.** Chercher un responsable pousse chacun à minimiser son rôle, ce qui appauvrit l'analyse. Chercher la faille systémique produit des correctifs qui tiennent — et personne n'a « oublié » un contrôle qui n'existait pas.`,
        },
      ],
    },
    finalExercise: {
      title: "Déploiement d'une API de prédiction",
      duration: "6 à 10 h",
      covers: ["cloud-1", "cloud-2", "cloud-3"],
      brief: `Mettre un modèle en ligne, accessible publiquement, sans exploser le budget.

Cet exercice **rassemble les 3 leçons du module** — Docker (leçon 1), AWS et IAM (leçon 2), CI/CD (leçon 3).

C'est le module où une erreur coûte de l'argent réel. Configure une alerte de budget **avant** de commencer : deux minutes de configuration contre une facture surprise.`,
      dataset: `Reprends un modèle déjà entraîné dans un module précédent — le scoring crédit du module ML classique convient parfaitement. L'objet de cet exercice n'est pas le modèle, c'est ce qui l'entoure.

Structure de départ :
\`\`\`
api-ml/
├── src/main.py           # FastAPI avec /predict et /health
├── model.pkl
├── requirements.txt
├── Dockerfile
├── .dockerignore
└── .github/workflows/
\`\`\``,
      steps: [
        "**Conteneurise l'API FastAPI** avec Docker. Vise une image sous 400 Mo, et mesure ta taille de départ pour chiffrer le gain. (leçon 1)",
        "**Déploie sur un service cloud** — Lambda, Cloud Run ou EC2. L'API doit être joignable publiquement et répondre à un `curl` depuis ta machine. (leçon 2)",
        "**Rôle IAM au strict minimum** — écris la politique et justifie chaque action accordée. Demande-toi pour chacune : que se passe-t-il si cette machine est compromise ? (leçon 2)",
        "**Logs et alerte de budget** — au moins une alerte qui se déclenche avant que la facture ne devienne un problème. C'est la première chose à configurer, pas la dernière. (leçon 2)",
        "**Pipeline CI/CD** avec test de non-régression : le déploiement doit échouer si la métrique du modèle passe sous un seuil. (leçon 3)",
        "**Analyse de coût comparative** — chiffre le coût mensuel de deux architectures pour 1 000 puis 1 000 000 de requêtes, et dis à partir de quel volume la réponse s'inverse. (leçon 2)",
      ],
      checklist: [
        "Mon alerte de budget était configurée AVANT le premier déploiement",
        "Mon image fait moins de 400 Mo et je peux chiffrer le gain obtenu",
        "Aucun secret dans le Dockerfile, dans l'image, ni dans le workflow",
        "Ma politique IAM n'accorde aucune permission que je ne puisse justifier",
        "Mon pipeline refuse de déployer un modèle sous le seuil de performance",
        "J'ai testé mon retour arrière : je sais revenir à la version précédente en moins de 5 minutes",
      ],
      selfCheck: `Le vrai test : **casse volontairement ta production, puis reviens en arrière en te chronométrant.**

Pousse un modèle dégradé, constate l'incident, exécute ton retour arrière. Si tu dépasses cinq minutes, ou si tu dois improviser, ta procédure n'existe pas — elle est seulement écrite. La différence apparaît toujours au pire moment.`,
    },
    quizExtra: [
      {
        q: "Ton API tourne dans Docker mais curl échoue depuis ta machine. Quelle est la cause la plus probable ?",
        options: [
          "Le port n'est pas exposé dans le Dockerfile",
          "uvicorn écoute sur 127.0.0.1 : il faut --host 0.0.0.0 pour accepter les connexions extérieures au conteneur",
          "Docker n'a pas assez de mémoire",
          "Le modèle n'a pas pu être chargé",
        ],
        answer: 1,
        explain:
          "C'est le piège que tout le monde rencontre une fois : l'API tourne, les logs sont propres, et rien ne répond. Par défaut uvicorn n'écoute que sur l'interface locale du conteneur. 0.0.0.0 signifie « accepte les connexions sur toutes les interfaces ». Le EXPOSE du Dockerfile est purement documentaire — c'est le -p du docker run qui fait le lien de ports.",
      },
      {
        q: "Pourquoi copier requirements.txt AVANT le code source dans un Dockerfile ?",
        options: [
          "Pour respecter l'ordre alphabétique",
          "Pour le cache de couches : l'installation des dépendances n'est refaite que si requirements.txt change, pas à chaque modification de code",
          "Parce que pip refuse de s'exécuter après un COPY",
          "Pour réduire la taille de l'image",
        ],
        answer: 1,
        explain:
          "Docker met chaque couche en cache et rejoue tout ce qui suit dès qu'une couche change. En copiant le code d'abord, la moindre modification d'une ligne invaliderait la couche d'installation et réinstallerait tout — trois minutes au lieu de trente secondes, à chaque itération. L'ordre des instructions d'un Dockerfile est une décision de performance.",
      },
      {
        q: "Un collègue propose d'attacher AmazonS3FullAccess à ton API « pour aller plus vite ». Le vrai risque ?",
        options: [
          "Une facture plus élevée",
          "Une compromission de l'API donne un accès complet en lecture, écriture ET suppression à TOUS les buckets du compte, y compris les sauvegardes",
          "Des performances dégradées",
          "Aucun risque si le bucket est privé",
        ],
        answer: 1,
        explain:
          "La politique ne se limite ni au bucket ML ni aux actions nécessaires. Une injection ou une clé qui fuite ouvre alors tout le stockage de l'entreprise — et s3:DeleteObject peut effacer des sauvegardes irrécupérables. Le principe du moindre privilège consiste à se demander, pour chaque permission : que se passe-t-il si cette machine est compromise ? Séparer aussi lecture et écriture par préfixe : une API qui écrit des logs ne doit pas pouvoir remplacer le modèle.",
      },
      {
        q: "Pour 1 000 requêtes par mois, pourquoi Lambda est-il bien moins cher qu'EC2 ?",
        options: [
          "Parce que Lambda utilise du matériel moins puissant",
          "Parce que Lambda facture à la requête et à la durée d'exécution, alors qu'EC2 facture à l'heure, que la machine serve ou non du trafic",
          "Parce que Lambda ne facture pas le stockage",
          "Parce qu'EC2 impose un engagement annuel",
        ],
        answer: 1,
        explain:
          "À bas volume, Lambda coûte des centimes contre une vingtaine de dollars pour une EC2 allumée en permanence. Le basculement se produit vers 10 à 50 millions de requêtes par mois. Mais le prix n'est pas le seul critère : avec un gros modèle, chaque démarrage à froid Lambda recharge le modèle, ce qui ajoute plusieurs secondes de latence — rédhibitoire pour une API temps réel.",
      },
      {
        q: "Ton pipeline CI/CD a déployé un modèle cassé alors que le F1 dépassait le seuil. Comment est-ce possible ?",
        options: [
          "Le seuil était mal calculé",
          "Le F1 a été mesuré sur un jeu de test figé, antérieur au changement de format des données : le modèle était dégradé, l'évaluation ne l'était pas",
          "GitHub Actions a ignoré l'étape de test",
          "Le modèle a été corrompu pendant le transfert",
        ],
        answer: 1,
        explain:
          "C'est le défaut structurel d'un seuil sur la métrique seule : il valide le modèle, jamais les données qui l'ont produit. Les garde-fous à ajouter sont en amont — validation de schéma bloquante avant entraînement, comparaison de distributions entre lots, jeu de test glissant plutôt que figé, et déploiement canari pour limiter l'exposition.",
      },
      {
        q: "Dans un workflow GitHub Actions, pourquoi ne jamais écrire une clé AWS directement dans le YAML ?",
        options: [
          "Parce que le YAML n'accepte pas les chaînes longues",
          "Parce que le fichier est versionné dans Git : la clé devient publique dès le premier push, et reste dans l'historique",
          "Parce que GitHub Actions ne lit pas les variables en clair",
          "Parce que cela ralentit le workflow",
        ],
        answer: 1,
        explain:
          "C'est exactement le scénario « tu viens de pousser ta clé API » du module Setup, transposé au CI/CD. Les secrets GitHub sont stockés chiffrés dans les paramètres du dépôt et automatiquement masqués dans les logs. Et comme toujours avec un secret exposé : le retirer du fichier ne suffit pas, il faut le révoquer et le régénérer.",
      },
    ],
  },

  // ══ MLOPS ET PROJETS EN PRODUCTION ════════════════════════════════════════
  mlops: {
    lessons: {
      "ops-1": [
        {
          id: "ops-1-a",
          kind: "application",
          title: "Sortir un modèle de son notebook",
          statement: `Prends un notebook d'entraînement que tu as écrit dans un module précédent et transforme-le en projet de production :

1. extrais les transformations dans \`src/features.py\`
2. extrais l'entraînement dans \`src/train.py\`, pilotable par un fichier \`configs/train.yaml\`
3. fixe **toutes** les graines aléatoires
4. enregistre l'expérience avec MLflow : paramètres, métriques, modèle
5. écris un test qui vérifie qu'une fonction de transformation produit bien ce qu'on attend

Vérifie ensuite que \`python src/train.py --config configs/train.yaml\` reproduit exactement le score du notebook.`,
          hint: `Les graines à fixer sont plus nombreuses qu'on croit : \`random.seed\`, \`np.random.seed\`, celle de scikit-learn via \`random_state\`, et pour PyTorch \`torch.manual_seed\` plus \`torch.cuda.manual_seed_all\`. Le YAML se lit avec \`yaml.safe_load\`.`,
          solution: `\`\`\`yaml
# configs/train.yaml
donnees:
  chemin: data/train.csv
  test_size: 0.2
modele:
  type: xgboost
  n_estimators: 400
  learning_rate: 0.05
  max_depth: 6
seed: 42
mlflow:
  experience: scoring-credit
\`\`\`

\`\`\`python
# src/train.py
import argparse, random, yaml, numpy as np, mlflow, joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score
from features import construire_features

def fixer_graines(seed):
    random.seed(seed)
    np.random.seed(seed)
    # torch.manual_seed(seed); torch.cuda.manual_seed_all(seed)

def main(chemin_config):
    cfg = yaml.safe_load(open(chemin_config, encoding="utf-8"))
    fixer_graines(cfg["seed"])

    X, y = construire_features(cfg["donnees"]["chemin"])
    X_tr, X_te, y_tr, y_te = train_test_split(
        X, y, test_size=cfg["donnees"]["test_size"],
        random_state=cfg["seed"], stratify=y)

    mlflow.set_experiment(cfg["mlflow"]["experience"])
    with mlflow.start_run():
        mlflow.log_params(cfg["modele"] | {"seed": cfg["seed"]})

        import xgboost as xgb
        modele = xgb.XGBClassifier(
            **{k: v for k, v in cfg["modele"].items() if k != "type"},
            random_state=cfg["seed"]).fit(X_tr, y_tr)

        f1 = f1_score(y_te, modele.predict(X_te))
        mlflow.log_metric("f1", f1)
        mlflow.sklearn.log_model(modele, "model")
        joblib.dump(modele, "model.pkl")
        print(f"F1 = {f1:.4f}")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--config", default="configs/train.yaml")
    main(p.parse_args().config)
\`\`\`

\`\`\`python
# tests/test_features.py
import pandas as pd
from src.features import calculer_ratio

def test_ratio_gere_le_zero():
    df = pd.DataFrame({"a": [10, 5], "b": [2, 0]})
    resultat = calculer_ratio(df, "a", "b")
    assert resultat.iloc[0] == 5.0
    assert not resultat.isna().any()        # pas de division par zéro qui passe en silence
\`\`\`

**Pourquoi la configuration en YAML plutôt que des constantes dans le code** : les hyperparamètres deviennent des **données**, pas du code. On peut lancer trois variantes sans toucher une ligne, comparer les runs dans MLflow, et — surtout — **savoir exactement quelle configuration a produit quel modèle** six mois plus tard.

**Fixer les graines est ce qui sépare un résultat d'une anecdote.** Sans graine fixée, ton collègue relance ton script et obtient 0,83 au lieu de 0,86 : impossible de savoir si c'est le hasard du découpage ou une vraie différence.

⚠️ Même avec toutes les graines fixées, la reproductibilité stricte n'est pas garantie : le calcul GPU introduit du non-déterminisme, et les versions de bibliothèques changent les résultats. C'est pourquoi \`requirements.txt\` avec versions figées fait partie de la reproductibilité, au même titre que les graines.

**MLflow répond à la question qu'on se pose toujours trop tard** : « quelle version du modèle est en production, avec quels hyperparamètres, et quel score avait-elle ? ». Sans traçabilité des expériences, cette question n'a pas de réponse au bout de quelques semaines.

**Le test sur \`calculer_ratio\` vérifie le cas limite, pas le cas nominal.** Un test qui ne vérifie que le comportement normal n'attrape presque jamais de bug — les bugs vivent dans les cas limites, et la division par zéro est le plus fréquent en feature engineering.`,
        },
        {
          id: "ops-1-b",
          kind: "blanche",
          title: "« Chez moi ça donne 0,89 »",
          statement: `**Page blanche.** Enquête de reproductibilité.

Tu annonces un F1 de 0,89. Ton collègue clone le dépôt, lance le script, obtient **0,84**. Vous avez le même code.

Écris la **checklist de diagnostic ordonnée** : toutes les causes possibles, de la plus fréquente à la plus rare, avec pour chacune le test qui la confirme ou l'élimine.

Puis :
- implémente un script \`verifier_reproductibilite.py\` qui contrôle automatiquement les causes les plus courantes
- explique laquelle de ces causes est **impossible à éliminer complètement**, et comment on vit avec

**Une différence de 5 points n'est pas du bruit.** Quelque chose de concret diffère entre vos deux exécutions — trouve quoi.`,
          hint: `Une exécution de ML dépend de quatre choses : le code, les **données**, l'**environnement** (versions des bibliothèques), et l'**aléatoire**. Le code est identique par hypothèse — il reste trois familles à explorer, et l'une d'elles est de loin la plus fréquente.`,
          solution: `**La checklist, par ordre de fréquence** :

**1. Les données ne sont pas les mêmes.** Cause n°1, et de très loin. Le CSV n'est pas versionné, chacun a téléchargé le sien, ou l'un des deux a une version plus ancienne.
*Test* : comparer l'empreinte du fichier.
\`\`\`python
import hashlib
print(hashlib.md5(open("data/train.csv", "rb").read()).hexdigest())
\`\`\`

**2. Les versions de bibliothèques diffèrent.** Un changement de comportement par défaut entre deux versions de scikit-learn ou XGBoost suffit à déplacer un score de plusieurs points.
*Test* : \`pip freeze\` des deux côtés et comparaison.

**3. Les graines ne sont pas toutes fixées.** Il en reste souvent une oubliée — celle du découpage, celle du modèle, celle d'un sous-échantillonnage.
*Test* : relancer deux fois **sur la même machine**. Si le score bouge, une graine manque.

**4. Le prétraitement diffère.** Un fichier intermédiaire mis en cache chez l'un, régénéré chez l'autre ; un chemin relatif qui pointe ailleurs.
*Test* : afficher \`X.shape\` et \`X.describe()\` juste avant l'entraînement, comparer.

**5. Le matériel.** GPU contre CPU, ou nombre de threads différent : certaines opérations ne sont pas déterministes en parallèle.
*Test* : forcer \`n_jobs=1\` des deux côtés.

\`\`\`python
# verifier_reproductibilite.py
import hashlib, sys, json, platform
import pandas as pd, numpy as np, sklearn

def empreinte(chemin):
    h = hashlib.md5()
    with open(chemin, "rb") as f:
        for bloc in iter(lambda: f.read(8192), b""):
            h.update(bloc)
    return h.hexdigest()

rapport = {
    "donnees_md5":  empreinte("data/train.csv"),
    "python":       platform.python_version(),
    "numpy":        np.__version__,
    "pandas":       pd.__version__,
    "sklearn":      sklearn.__version__,
}

X = pd.read_csv("data/train.csv")
rapport["forme"] = list(X.shape)
rapport["colonnes"] = sorted(X.columns.tolist())
rapport["somme_numerique"] = float(X.select_dtypes("number").sum().sum().round(4))

print(json.dumps(rapport, indent=2, ensure_ascii=False))
\`\`\`

Chacun lance ce script et compare les deux sorties : la ligne qui diffère désigne la cause.

**La cause impossible à éliminer complètement, c'est le non-déterminisme matériel.**

Sur GPU, l'ordre d'accumulation des opérations en parallèle varie d'une exécution à l'autre, et les arrondis flottants ne sont pas associatifs — \`(a+b)+c\` peut différer de \`a+(b+c)\` à la quinzième décimale. Ces écarts minuscules s'amplifient au fil de l'entraînement.

PyTorch propose \`torch.use_deterministic_algorithms(True)\`, mais au prix d'un ralentissement parfois important, et certaines opérations n'ont simplement pas d'équivalent déterministe.

**Comment on vit avec** : on cesse de rapporter **un** score, et on rapporte une **moyenne et un écart-type sur plusieurs graines**.

\`\`\`python
scores = [entrainer(seed=s) for s in range(5)]
print(f"F1 = {np.mean(scores):.4f} ± {np.std(scores):.4f}")
\`\`\`

**« F1 = 0,864 ± 0,011 » est une affirmation honnête ; « F1 = 0,89 » ne l'est pas.** Et cela répond directement au problème de départ : si l'écart-type entre graines est de 0,01, un écart de 5 points entre deux personnes n'est pas du bruit — il y a une vraie cause à trouver, ce que la checklist permet de faire.`,
        },
      ],
      "ops-2": [
        {
          id: "ops-2-a",
          kind: "application",
          title: "Une API qui refuse les entrées invalides",
          statement: `Écris une API FastAPI de prédiction correcte :

1. un modèle Pydantic qui **valide** les entrées : types, plages de valeurs, champs obligatoires
2. un endpoint \`POST /predict\` retournant la prédiction **et** la probabilité
3. un endpoint \`GET /health\` qui vérifie que le modèle est bien chargé
4. la version du modèle retournée dans chaque réponse
5. des tests qui vérifient qu'une entrée invalide renvoie bien un code 422

Teste avec un âge de 300 ans et une chaîne à la place d'un nombre.`,
          hint: `Pydantic valide automatiquement à partir des annotations de type. \`Field(..., ge=18, le=100)\` impose des bornes. FastAPI transforme une erreur de validation en réponse 422 sans que tu écrives quoi que ce soit — c'est tout l'intérêt.`,
          solution: `\`\`\`python
# src/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib, numpy as np

VERSION_MODELE = "v1.3.0"
app = FastAPI(title="API de scoring", version=VERSION_MODELE)

try:
    modele = joblib.load("model.pkl")
except Exception:
    modele = None

class Demande(BaseModel):
    age:     int   = Field(..., ge=18, le=100, description="âge en années")
    revenu:  float = Field(..., gt=0, le=1_000_000)
    anciennete_mois: int = Field(..., ge=0, le=600)
    region:  str   = Field(..., pattern="^(Nord|Sud|Est|Ouest)$")

class Reponse(BaseModel):
    prediction: int
    probabilite: float
    version_modele: str

@app.get("/health")
def health():
    if modele is None:
        raise HTTPException(status_code=503, detail="modèle non chargé")
    return {"status": "ok", "version_modele": VERSION_MODELE}

@app.post("/predict", response_model=Reponse)
def predict(demande: Demande):
    if modele is None:
        raise HTTPException(status_code=503, detail="modèle non chargé")
    X = np.array([[demande.age, demande.revenu, demande.anciennete_mois,
                   ["Nord", "Sud", "Est", "Ouest"].index(demande.region)]])
    proba = float(modele.predict_proba(X)[0, 1])
    return Reponse(prediction=int(proba > 0.5),
                   probabilite=round(proba, 4),
                   version_modele=VERSION_MODELE)
\`\`\`

\`\`\`python
# tests/test_api.py
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)
VALIDE = {"age": 35, "revenu": 42000.0, "anciennete_mois": 24, "region": "Nord"}

def test_prediction_valide():
    r = client.post("/predict", json=VALIDE)
    assert r.status_code == 200
    assert 0 <= r.json()["probabilite"] <= 1

def test_age_aberrant_rejete():
    assert client.post("/predict", json={**VALIDE, "age": 300}).status_code == 422

def test_type_invalide_rejete():
    assert client.post("/predict", json={**VALIDE, "revenu": "beaucoup"}).status_code == 422

def test_region_inconnue_rejetee():
    assert client.post("/predict", json={**VALIDE, "region": "Centre"}).status_code == 422
\`\`\`

**La validation Pydantic n'est pas du confort, c'est une protection.** Sans elle, un âge de 300 ans arrive jusqu'au modèle, qui produit une prédiction — absurde, mais sans erreur. Le système renvoie une réponse fausse avec un code 200, et personne ne le sait. Une donnée hors domaine doit être **refusée**, pas prédite.

**Le \`/health\` est ce qui permet à un orchestrateur de faire son travail.** Kubernetes, ECS ou un répartiteur de charge l'appellent en continu ; s'il répond 503, l'instance est retirée du trafic et redémarrée automatiquement. Sans endpoint de santé, une instance dont le modèle n'a pas chargé continue de recevoir des requêtes et de renvoyer des erreurs.

**La version du modèle dans chaque réponse** est ce qui rend un incident diagnosticable. Quand un utilisateur signale une prédiction bizarre trois jours plus tard, la version renvoyée dit immédiatement quel modèle a produit ce résultat. Sans elle, il faut croiser des logs de déploiement et des horodatages.

**Le code 422 plutôt que 400** est la convention FastAPI pour « la requête est bien formée mais son contenu est invalide ». La distinction compte pour le client de l'API : 400 signifie « ta requête est mal construite », 422 « tes valeurs ne conviennent pas ».`,
        },
        {
          id: "ops-2-b",
          kind: "blanche",
          title: "La latence p95 à 3 secondes",
          statement: `**Page blanche.** Optimisation mesurée.

Ton API de prédiction a une latence **moyenne de 180 ms**, ce qui semble correct. Mais le contrat de service exige **p95 < 500 ms**, et le p95 mesuré est à **3 200 ms**.

1. explique pourquoi la moyenne à 180 ms et le p95 à 3 200 ms ne sont pas contradictoires
2. mets en place une mesure correcte de la latence (p50, p95, p99), pas seulement la moyenne
3. identifie les causes possibles d'une queue de distribution aussi longue
4. corrige au moins deux d'entre elles
5. remesure et prouve le gain

**Ne devine pas le goulot d'étranglement.** Mesure-le d'abord, comme pour la requête SQL du module Bases de données.`,
          hint: `Une moyenne peut être excellente alors que 5 % des requêtes sont catastrophiques. Cherche ce qui, dans une API de ML, ne se produit **pas** à chaque appel : un chargement, une allocation, une connexion, un ramasse-miettes. Pour profiler, mesure le temps de chaque étape séparément à l'intérieur du gestionnaire.`,
          solution: `**1. Pourquoi ce n'est pas contradictoire** : la moyenne est écrasée par la masse des requêtes rapides. Si 95 % des appels prennent 30 ms et 5 % prennent 3 000 ms, la moyenne vaut environ 180 ms — un chiffre qui ne décrit **aucune** requête réelle.

**Le p95 décrit l'expérience du cinquième utilisateur le plus malchanceux sur cent.** C'est celui qui se plaint, et c'est celui que mesure un contrat de service. La moyenne est presque toujours le mauvais indicateur pour de la latence.

**2. La mesure correcte** :

\`\`\`python
import time, numpy as np
from collections import deque
from fastapi import Request

latences = deque(maxlen=10_000)

@app.middleware("http")
async def mesurer(request: Request, call_next):
    debut = time.perf_counter()
    reponse = await call_next(request)
    latences.append((time.perf_counter() - debut) * 1000)
    return reponse

@app.get("/metrics")
def metrics():
    if not latences:
        return {"n": 0}
    a = np.array(latences)
    return {"n": len(a),
            "moyenne": round(a.mean(), 1),
            "p50": round(np.percentile(a, 50), 1),
            "p95": round(np.percentile(a, 95), 1),
            "p99": round(np.percentile(a, 99), 1)}
\`\`\`

**3. Les causes d'une longue queue, par fréquence** :

**a) Le modèle est rechargé à chaque requête.** \`joblib.load()\` à l'intérieur du gestionnaire au lieu du démarrage. Cause n°1, et elle produit exactement ce profil quand un cache masque une partie des appels.

**b) Démarrages à froid.** Sur Lambda ou avec autoscaling, une nouvelle instance charge le modèle avant de répondre : plusieurs secondes pour les premières requêtes qu'elle reçoit.

**c) Un appel externe non mis en cache** — base de données ou service tiers interrogé pour enrichir les features, sans délai d'expiration.

**d) Le ramasse-miettes ou un défaut de mémoire** quand chaque requête alloue de gros tableaux.

**e) Absence de traitement par lots** : mille requêtes unitaires plutôt qu'un appel groupé.

**4. Les corrections** :

\`\`\`python
# a) Charger le modèle UNE fois, au démarrage
from contextlib import asynccontextmanager

etat = {}

@asynccontextmanager
async def lifespan(app):
    etat["modele"] = joblib.load("model.pkl")     # une seule fois
    etat["scaler"] = joblib.load("scaler.pkl")
    yield
    etat.clear()

app = FastAPI(lifespan=lifespan)

# c) Cache + délai d'expiration sur l'appel externe
from functools import lru_cache
import httpx

@lru_cache(maxsize=10_000)
def enrichir(client_id: str):
    return httpx.get(f"{URL_SERVICE}/client/{client_id}", timeout=0.3).json()
\`\`\`

Le \`timeout=0.3\` est aussi important que le cache : sans délai d'expiration, un service tiers qui rame bloque **ta** requête indéfiniment. Mieux vaut une réponse dégradée rapide qu'une réponse parfaite qui n'arrive jamais.

**5. La preuve** : relancer la même charge et comparer.

\`\`\`
avant : moyenne 180 ms | p50  28 ms | p95 3 214 ms | p99 4 102 ms
après : moyenne  31 ms | p50  24 ms | p95    68 ms | p99   112 ms
\`\`\`

**Remarque que la moyenne n'a « gagné » que 150 ms alors que le p95 a été divisé par 47.** C'est exactement pourquoi il fallait mesurer les percentiles : optimiser en regardant la moyenne aurait donné l'impression d'un gain modeste, alors que l'expérience utilisateur a changé de nature.

---

**Le principe : pour de la latence, on rapporte toujours des percentiles, jamais une moyenne seule.** Et la démarche est la même qu'au module SQL — mesurer, localiser, corriger, remesurer. Deviner le goulot d'étranglement fait perdre plus de temps que le profiler.`,
        },
      ],
      "ops-3": [
        {
          id: "ops-3-a",
          kind: "application",
          title: "Détecter une dérive des données",
          statement: `Écris un détecteur de dérive comparant un lot de référence à un lot de production :

1. génère deux jeux : une référence, et une production avec une dérive volontaire sur **une seule** variable
2. applique le test de Kolmogorov-Smirnov sur chaque variable numérique
3. calcule le PSI (Population Stability Index) sur ces mêmes variables
4. compare ce que disent les deux méthodes
5. propose des seuils d'alerte et justifie-les

Vérifie que ton détecteur repère bien la variable dérivée — et **seulement** celle-là.`,
          hint: `Le PSI se calcule en découpant les deux distributions en déciles et en sommant \`(p_prod - p_ref) * ln(p_prod / p_ref)\` sur les tranches. Les seuils usuels : PSI < 0,1 stable, 0,1 à 0,25 dérive modérée, au-delà de 0,25 dérive significative.`,
          solution: `\`\`\`python
import numpy as np, pandas as pd
from scipy import stats

rng = np.random.default_rng(0)
n = 5000

reference = pd.DataFrame({
    "age":     rng.normal(40, 12, n),
    "revenu":  rng.gamma(4, 12_000, n),
    "score":   rng.beta(3, 2, n),
    "anciennete": rng.integers(0, 120, n).astype(float),
})
production = reference.copy()
production["revenu"] = rng.gamma(4, 15_500, n)      # DÉRIVE volontaire : +30 %

def psi(ref, prod, n_tranches=10):
    bornes = np.percentile(ref, np.linspace(0, 100, n_tranches + 1))
    bornes[0], bornes[-1] = -np.inf, np.inf
    p_ref  = np.histogram(ref,  bins=bornes)[0] / len(ref)
    p_prod = np.histogram(prod, bins=bornes)[0] / len(prod)
    p_ref  = np.clip(p_ref,  1e-6, None)            # évite log(0)
    p_prod = np.clip(p_prod, 1e-6, None)
    return float(np.sum((p_prod - p_ref) * np.log(p_prod / p_ref)))

lignes = []
for col in reference.columns:
    _, p_ks = stats.ks_2samp(reference[col], production[col])
    valeur_psi = psi(reference[col].values, production[col].values)
    if   valeur_psi < 0.10: verdict = "stable"
    elif valeur_psi < 0.25: verdict = "dérive modérée"
    else:                   verdict = "DÉRIVE SIGNIFICATIVE"
    lignes.append({"variable": col, "p_KS": p_ks, "PSI": round(valeur_psi, 4),
                   "verdict": verdict})

print(pd.DataFrame(lignes).to_string(index=False))
\`\`\`

\`\`\`
  variable        p_KS     PSI               verdict
       age    7.4e-01  0.0021                stable
    revenu    1.2e-31  0.3184  DÉRIVE SIGNIFICATIVE
     score    5.1e-01  0.0018                stable
 anciennete   8.8e-01  0.0009                stable
\`\`\`

**Le détecteur repère bien la seule variable dérivée.** Les trois autres restent sous 0,003 de PSI.

**Les deux méthodes ne répondent pas à la même question, et c'est pourquoi on utilise les deux.**

Le **KS** est un test statistique : il répond par oui ou non à « ces deux échantillons viennent-ils de la même loi ? ». Son défaut majeur en production est sa sensibilité à la taille d'échantillon — avec un million de lignes, **la moindre différence devient significative**, et tout se met à alerter. C'est le même piège que la p-value du module Mathématiques.

Le **PSI** mesure une **amplitude**, pas une significativité. Il ne dépend pas de la taille d'échantillon, ce qui le rend stable dans le temps et comparable d'une semaine à l'autre. C'est pour ça qu'il est la métrique standard du secteur bancaire pour la surveillance des modèles.

**Les seuils** — 0,1 et 0,25 — sont des conventions issues de la pratique du scoring crédit, pas des vérités mathématiques. Il faut les **calibrer sur son propre historique** : lance ton détecteur sur douze mois de données passées, observe la distribution normale du PSI de chaque variable, et place le seuil au-dessus de la variation habituelle. Un seuil qui alerte toutes les semaines n'est plus un seuil, c'est du bruit — et l'équipe cesse de le regarder.

**Le \`np.clip\` à 1e-6** évite un \`log(0)\` quand une tranche est vide en production. Sans lui, le PSI vaut \`inf\` et l'alerte se déclenche pour une raison purement numérique.`,
        },
        {
          id: "ops-3-b",
          kind: "blanche",
          title: "Le modèle se dégrade et personne ne le sait",
          statement: `**Page blanche.** Conception d'un système de surveillance.

Ton modèle de détection de fraude est en production depuis six mois. Les métriques d'infrastructure sont au vert : latence correcte, aucune erreur 500, disponibilité à 99,9 %.

Pourtant, le taux de fraude non détectée a doublé.

Conçois le système de surveillance qui aurait vu venir ça.

1. explique pourquoi les métriques d'infrastructure ne détectent **jamais** ce type de problème
2. distingue **data drift** et **concept drift** : lequel est en cause ici, et pourquoi c'est le plus difficile
3. liste ce qu'il faut surveiller, **au-delà** des distributions d'entrée
4. écris le code d'au moins deux indicateurs, dont un qui fonctionne **sans attendre les vraies étiquettes**
5. conçois la boucle de réentraînement : déclencheur, validation, bascule

Le point 4 est le cœur du problème : en détection de fraude, les vraies étiquettes arrivent avec des semaines de retard.`,
          hint: `Si le modèle se dégrade alors que les entrées n'ont pas changé, ce n'est pas la distribution de X qui bouge — c'est la relation entre X et y. Pense à qui, en face, a intérêt à s'adapter à ton modèle. Et pour surveiller sans étiquettes, regarde ce que produit le modèle plutôt que ce qu'il reçoit.`,
          solution: `**1. Pourquoi l'infrastructure ne voit rien** : elle mesure si le système **fonctionne**, pas s'il a **raison**. Une API qui répond en 30 ms avec des prédictions fausses affiche exactement les mêmes métriques qu'une API qui répond juste. **La dégradation d'un modèle est silencieuse par nature** — c'est ce qui la distingue de toutes les autres pannes logicielles.

**2. Data drift contre concept drift** :

Le **data drift** est un changement de la distribution des entrées P(X) : nouveaux comportements clients, saisonnalité, nouveau canal d'acquisition. Il est **détectable immédiatement**, sans étiquettes, par comparaison de distributions.

Le **concept drift** est un changement de la relation P(y|X) : les mêmes caractéristiques ne signifient plus la même chose. **C'est le cas ici** — les fraudeurs ont observé quels comportements passaient et quels comportements étaient bloqués, et ils ont adapté leurs méthodes.

**C'est un adversaire actif, pas un phénomène naturel.** La fraude est l'un des rares domaines où la distribution change *parce que* le modèle existe. Et le concept drift est bien plus difficile à détecter : il n'apparaît pleinement que quand les vraies étiquettes arrivent, c'est-à-dire ici des semaines plus tard.

**3. Les quatre niveaux à surveiller** :

**Niveau 1 — les entrées.** Distribution de chaque variable contre la référence d'entraînement (PSI, KS). Détecte le data drift, immédiatement.

**Niveau 2 — les sorties.** Distribution des probabilités prédites, taux d'alertes. **Ne demande aucune étiquette** — c'est le point clé.

**Niveau 3 — les métriques métier réelles**, dès que les étiquettes arrivent : précision, rappel, montant de fraude non détectée.

**Niveau 4 — la boucle de retour humaine.** Taux de confirmation des alertes par les analystes. C'est l'indicateur le plus précoce dont on dispose réellement.

**4. Deux indicateurs, dont un sans étiquettes** :

\`\`\`python
# a) Surveillance des SORTIES — aucune étiquette requise
import numpy as np
from scipy import stats

def surveiller_predictions(probas_reference, probas_jour, seuil_alerte=0.30):
    """Le modèle prédit-il toujours comme avant ?"""
    taux_ref  = float((probas_reference > 0.5).mean())
    taux_jour = float((probas_jour > 0.5).mean())
    variation = abs(taux_jour - taux_ref) / max(taux_ref, 1e-9)

    _, p = stats.ks_2samp(probas_reference, probas_jour)
    alerte = variation > seuil_alerte or p < 1e-4

    return {"taux_alertes_ref": round(taux_ref, 4),
            "taux_alertes_jour": round(taux_jour, 4),
            "variation_relative": round(variation, 3),
            "p_KS_distribution": p,
            "ALERTE": alerte}
\`\`\`

Un classifieur qui alertait sur 2 % des transactions et n'alerte plus que sur 0,8 % a changé de comportement — **et on le sait le jour même**, sans attendre la moindre étiquette.

\`\`\`python
# b) Surveillance de la boucle humaine — indicateur le plus précoce disponible
def surveiller_confirmations(alertes_confirmees, alertes_totales, precision_reference):
    """Parmi nos alertes, quelle proportion les analystes confirment-ils ?"""
    precision_terrain = alertes_confirmees / max(alertes_totales, 1)
    chute = (precision_reference - precision_terrain) / precision_reference
    return {"precision_terrain": round(precision_terrain, 4),
            "chute_relative": round(chute, 3),
            "ALERTE": chute > 0.15}
\`\`\`

**5. La boucle de réentraînement** :

**Déclencheur** — l'un des trois : PSI supérieur à 0,25 sur une variable importante, chute de plus de 15 % de la précision terrain, ou échéance calendaire (mensuelle en fraude, où l'adversaire s'adapte vite).

**Validation automatique** — le nouveau modèle (*challenger*) est évalué sur les **données les plus récentes**, pas sur le jeu de test historique. Il ne remplace le modèle en place (*champion*) que s'il fait strictement mieux sur cette fenêtre récente.

**Bascule progressive** — déploiement canari : 5 % du trafic, puis 25 %, puis 100 %, avec retour arrière automatique si un indicateur se dégrade. Jamais de bascule totale immédiate.

**Traçabilité** — chaque bascule enregistrée : quel modèle, quelles données, quel score, quel déclencheur. C'est ce qui permet de répondre six mois plus tard à « pourquoi ce modèle était-il en production ce jour-là ? ».

---

**Le point à retenir** : *un modèle en production n'est pas un livrable, c'est un système vivant qui se dégrade.* Le code, lui, ne pourrit pas tout seul — un modèle, si, parce que le monde qu'il décrit change. C'est la différence fondamentale entre déployer un logiciel et déployer un modèle, et c'est ce qui justifie l'existence même du MLOps.`,
        },
      ],
      "ops-4": [
        {
          id: "ops-4-a",
          kind: "application",
          title: "Mesurer l'équité, groupe par groupe",
          statement: `Sur un modèle de scoring que tu as déjà entraîné, avec une variable démographique sensible :

1. calcule le **taux d'acceptation** par groupe (parité démographique)
2. calcule le **taux de vrais positifs** par groupe (égalité des chances)
3. calcule les taux de **faux positifs** et de **faux négatifs** par groupe
4. présente le tout dans un tableau lisible
5. commente : quels écarts observes-tu, et lesquels te semblent problématiques ?

Vérifie ensuite ce qui se passe quand tu **retires** la variable sensible du modèle. Les écarts disparaissent-ils ?`,
          hint: `Toutes ces métriques se calculent à partir de la matrice de confusion **par groupe** : \`confusion_matrix(y_vrai[groupe], y_pred[groupe])\`. Un \`groupby\` sur la variable sensible avec une fonction d'agrégation personnalisée fait l'affaire.`,
          solution: `\`\`\`python
import pandas as pd
from sklearn.metrics import confusion_matrix

def rapport_equite(y_vrai, y_pred, groupes):
    lignes = []
    for g in sorted(pd.Series(groupes).unique()):
        m = (groupes == g)
        tn, fp, fn, tp = confusion_matrix(y_vrai[m], y_pred[m], labels=[0, 1]).ravel()
        lignes.append({
            "groupe": g,
            "n": int(m.sum()),
            "taux_acceptation": round((tp + fp) / m.sum(), 4),        # parité démographique
            "taux_vrais_positifs": round(tp / max(tp + fn, 1), 4),    # égalité des chances
            "taux_faux_positifs": round(fp / max(fp + tn, 1), 4),
            "taux_faux_negatifs": round(fn / max(fn + tp, 1), 4),
            "precision": round(tp / max(tp + fp, 1), 4),
        })
    return pd.DataFrame(lignes)

rapport = rapport_equite(y_test.values, modele.predict(X_test), groupe_test.values)
print(rapport.to_string(index=False))

for col in ["taux_acceptation", "taux_vrais_positifs", "taux_faux_positifs"]:
    ecart = rapport[col].max() - rapport[col].min()
    ratio = rapport[col].min() / max(rapport[col].max(), 1e-9)
    print(f"{col:22} écart = {ecart:.4f}   ratio = {ratio:.3f}")
\`\`\`

**Ce que révèle typiquement ce tableau** : l'accuracy globale est identique entre groupes, et pourtant les taux de faux positifs diffèrent nettement. **C'est exactement le cas COMPAS** — un modèle peut être « aussi précis » pour tous et se tromper d'une manière systématiquement différente selon les groupes.

**Le taux de faux négatifs est le plus important à regarder ici.** Sur un scoring crédit, un faux négatif est un refus infligé à quelqu'un qui aurait remboursé — un préjudice individuel concret. Un écart de faux négatifs entre groupes signifie que le modèle refuse à tort plus souvent certaines personnes que d'autres.

**La règle des 80 %** (issue du droit du travail américain) est un repère courant : si le ratio du taux d'acceptation entre le groupe le moins favorisé et le plus favorisé descend sous 0,8, l'écart est présumé problématique.

**Et la partie la plus instructive de l'exercice : retirer la variable sensible ne fait presque jamais disparaître les écarts.**

C'est le phénomène des **variables de substitution** (*proxy features*). Le code postal encode partiellement l'origine géographique et sociale ; le type de contrat encode partiellement l'âge ; l'historique bancaire encode le niveau de revenu du foyer d'origine. Le modèle reconstitue l'information sensible à partir de variables corrélées, **sans jamais l'avoir vue**.

**Conséquence pratique décisive** : « nous n'utilisons pas cette variable » n'est **pas** une garantie d'équité, et c'est pourtant la réponse la plus fréquente en entreprise. La seule façon de savoir est de **mesurer les écarts sur les résultats** — ce que tu viens de faire.`,
        },
        {
          id: "ops-4-b",
          kind: "blanche",
          title: "Choisir quelle équité on veut",
          statement: `**Page blanche.** Décision impossible à éviter.

Il existe plusieurs définitions mathématiques de l'équité — parité démographique, égalité des chances, égalité des cotes, calibration. **Il est démontré qu'on ne peut pas les satisfaire toutes en même temps** dès que les taux de base diffèrent entre groupes.

Tu ne peux donc pas « rendre le modèle équitable ». Tu dois **choisir** laquelle privilégier, et l'assumer.

Pour chacun de ces trois contextes, choisis un critère et argumente :
1. **recrutement** — présélection de CV pour un entretien
2. **médical** — dépistage d'une maladie où la prévalence diffère réellement entre groupes
3. **crédit** — accord d'un prêt à la consommation

Pour chaque cas :
- le critère retenu et pourquoi
- ce que ce choix sacrifie
- qui devrait prendre cette décision dans une organisation
- comment tu documenterais ce choix pour un audit

**Il n'y a pas de bonne réponse technique.** C'est le sujet de l'exercice.`,
          hint: `La parité démographique impose le même taux d'acceptation partout, quels que soient les taux de base réels. L'égalité des chances impose le même taux de vrais positifs — donc la même chance d'être détecté quand on est réellement dans la classe cible. La calibration impose qu'une probabilité de 0,7 signifie la même chose dans tous les groupes.`,
          solution: `**1. Recrutement → parité démographique (ou proche).**

Les données historiques de recrutement reflètent des décisions humaines passées, elles-mêmes biaisées. « Être un bon candidat » y est défini par ce que des recruteurs ont validé autrefois — la cible elle-même est contaminée. Chercher à reproduire fidèlement ces étiquettes revient à **automatiser le biais**.

Dans ce contexte, imposer des taux de présélection comparables est défendable : le vivier de talents n'a pas de raison biologique d'être inégalement réparti.

*Ce que ça sacrifie* : la précision apparente par rapport aux étiquettes historiques. Mais comme ces étiquettes sont douteuses, la perte est en grande partie illusoire.

**2. Médical → égalité des chances, jamais la parité démographique.**

Si une maladie touche réellement 8 % d'un groupe et 2 % d'un autre, imposer le même taux de dépistage positif serait **médicalement absurde et dangereux** : on sur-diagnostiquerait le groupe à faible prévalence et on sous-diagnostiquerait celui à forte prévalence.

Le bon critère est l'**égalité des chances** : à maladie égale, même probabilité d'être détecté. C'est ce qui compte pour un patient.

*Ce que ça sacrifie* : les taux de positifs différeront entre groupes — et il faut pouvoir l'expliquer, car cet écart sera lu comme une discrimination par quiconque ne regarde que les taux bruts.

**3. Crédit → égalité des cotes, avec un plancher réglementaire.**

C'est le cas le plus contraint juridiquement. Il faut regarder **à la fois** faux positifs et faux négatifs par groupe : un faux négatif est un refus infligé à quelqu'un de solvable, un préjudice individuel réel et opposable.

*Ce que ça sacrifie* : de la performance globale, et une part de la calibration.

*La contrainte supplémentaire* : dans le crédit, l'**explicabilité** prime souvent sur l'optimalité. Un modèle légèrement moins performant mais dont chaque refus s'explique en français clair est préférable à un modèle opaque plus précis — c'est une exigence réglementaire, pas une préférence.

---

**Qui décide ?** **Pas l'équipe technique seule.** C'est un arbitrage de valeurs, pas un problème d'optimisation. La décision revient à un comité associant le métier, le juridique, la conformité et la direction — l'équipe technique apportant les **chiffres du compromis** : « voici ce que coûte chaque option, en performance et en écart entre groupes ».

Le rôle du data scientist est de rendre l'arbitrage **explicite et chiffré**, pas de le trancher en silence dans le code. Un choix implicite est un choix quand même — simplement, personne ne l'a assumé.

**Comment le documenter — la *model card*** :

\`\`\`markdown
# Fiche modèle — Scoring crédit v2.1

## Usage prévu
Pré-qualification de demandes de crédit à la consommation, montants < 15 000 €.
**Usage exclu** : crédit immobilier, professionnel, décision finale sans revue humaine.

## Performance
AUC 0.847 (IC 95 % : 0.839–0.855) sur 12 mois de données récentes.

## Équité — critère retenu : égalité des cotes
| Groupe | Taux d'acceptation | TVP | TFP | TFN |
|---|---|---|---|---|
| A | 0.62 | 0.81 | 0.19 | 0.19 |
| B | 0.58 | 0.79 | 0.21 | 0.21 |

Écart maximal de taux de faux négatifs : 2,1 points. Seuil interne : 5 points.

## Arbitrage assumé
La parité démographique n'est PAS satisfaite (écart de 4 points d'acceptation).
Choix validé par le comité conformité du 12/03/2026 : privilégier l'égalité
des cotes, les taux de défaut réels différant entre groupes.

## Limites connues
Sous-performance sur les moins de 25 ans (n faible en apprentissage).
Non validé pour les travailleurs indépendants.

## Surveillance
PSI mensuel sur les 8 variables principales. Rapport d'équité trimestriel.
Réentraînement déclenché si PSI > 0.25 ou écart de TFN > 5 points.
\`\`\`

**La fiche modèle n'est pas de la paperasse.** C'est ce qui permet, deux ans plus tard, de répondre à un régulateur ou à un tribunal : *quel arbitrage a été fait, par qui, sur quelles données, et avec quelle justification*. Sans elle, l'organisation ne peut pas démontrer qu'elle a réfléchi — et l'AI Act européen fait précisément de cette documentation une obligation.`,
        },
      ],
    },
    finalExercise: {
      title: "Mise en production complète et auditable",
      duration: "12 à 20 h",
      covers: ["ops-1", "ops-2", "ops-3", "ops-4"],
      brief: `Le projet qui prouve que tu es ML Engineer et pas seulement data scientist.

Cet exercice **rassemble les 4 leçons du module** — code de production et reproductibilité (leçon 1), déploiement (leçon 2), surveillance et dérive (leçon 3), équité et documentation (leçon 4).

C'est le dernier exercice du parcours, et le plus complet. Il ne demande aucun modèle sophistiqué : reprends celui du module ML classique. **Tout ce qui compte ici est ce qu'il y a autour du modèle** — et c'est précisément ce qui sépare un notebook d'un système en production.`,
      dataset: `Reprends le scoring crédit du module ML classique, avec sa variable démographique pour l'analyse d'équité. Le modèle est déjà entraîné : l'objet de cet exercice est tout le reste.

Structure cible :
\`\`\`
projet-mlops/
├── data/              # versionné avec DVC, jamais dans Git
├── src/               # features.py, train.py, predict.py, monitor.py
├── tests/
├── configs/           # hyperparamètres en YAML
├── .github/workflows/
├── model_card.md
└── dvc.yaml
\`\`\``,
      steps: [
        "**Versionne données et expériences** — DVC pour les données, MLflow pour les runs. Vérifie qu'un `dvc pull` sur une machine vierge reconstitue exactement ton jeu de données. (leçon 1)",
        "**Pipeline CI/CD complet** qui teste, entraîne et déploie automatiquement, avec validation de schéma bloquante avant l'entraînement. (leçons 1 et 2)",
        "**Test de non-régression** : le déploiement échoue si la métrique chute sous un seuil. Rapporte une moyenne sur plusieurs graines, pas un score unique. (leçons 1 et 2)",
        "**Moniteur de dérive** sur les données d'entrée (PSI et KS) **et** sur la distribution des prédictions — ce second indicateur ne demande aucune étiquette, c'est ce qui le rend utilisable. (leçon 3)",
        "**Rapport d'équité** par groupe démographique : taux d'acceptation, vrais positifs, faux positifs, faux négatifs. Choisis un critère d'équité et **assume-le par écrit**. (leçon 4)",
        "**Fiche modèle (model card)** complète : usage prévu et usages exclus, performance avec intervalle de confiance, arbitrage d'équité assumé, limites connues, plan de surveillance. (leçon 4)",
      ],
      checklist: [
        "Un `git clone` + `dvc pull` + `python src/train.py` reproduit mon score à ±0.01 près",
        "Mon pipeline refuse d'entraîner sur des données dont le schéma a changé",
        "Je rapporte une moyenne ± écart-type sur plusieurs graines, pas un score unique",
        "Mon moniteur détecte une dérive sans avoir besoin des vraies étiquettes",
        "Mon rapport d'équité existe et le critère retenu est justifié par écrit",
        "Ma fiche modèle dit ce que le modèle NE doit PAS faire, pas seulement ce qu'il fait",
      ],
      selfCheck: `Le vrai test, et c'est le dernier du parcours : **donne le lien de ton dépôt à quelqu'un et demande-lui de faire tourner le projet de bout en bout sans t'écrire une seule fois.**

S'il y arrive, tu as construit un système reproductible — ce que la grande majorité des projets de ML ne sont pas. S'il te pose une question, la réponse à cette question aurait dû être dans ton README.

C'est exactement le test du module Setup, appliqué au projet le plus complexe du parcours. La boucle est bouclée.`,
    },
    quizExtra: [
      {
        q: "Ton collègue obtient 0.84 là où tu obtiens 0.89, avec le même code. Quelle est la cause la plus probable ?",
        options: [
          "Une différence de puissance machine",
          "Les données ne sont pas les mêmes : le CSV n'est pas versionné et chacun a sa propre version",
          "Une erreur dans le calcul de la métrique",
          "Le hasard de l'initialisation",
        ],
        answer: 1,
        explain:
          "C'est la cause n°1 des écarts de reproductibilité, loin devant les autres. Le test qui tranche en dix secondes : comparer l'empreinte MD5 du fichier de données des deux côtés. Viennent ensuite les versions de bibliothèques, puis les graines non fixées. Une exécution de ML dépend de quatre choses — code, données, environnement, aléatoire — et le code est ici identique par hypothèse.",
      },
      {
        q: "Ton API a une latence moyenne de 180 ms mais un p95 de 3 200 ms. Est-ce contradictoire ?",
        options: [
          "Oui, l'une des deux mesures est fausse",
          "Non : si 95 % des requêtes prennent 30 ms et 5 % prennent 3 secondes, la moyenne vaut ~180 ms — un chiffre qui ne décrit aucune requête réelle",
          "Oui, le p95 ne peut pas dépasser 10 fois la moyenne",
          "Non, mais cela signifie que le modèle est trop lourd",
        ],
        answer: 1,
        explain:
          "La moyenne est écrasée par la masse des requêtes rapides. Le p95 décrit l'expérience du cinquième utilisateur le plus malchanceux sur cent — celui qui se plaint, et celui que mesure un contrat de service. Pour de la latence on rapporte toujours des percentiles. Cause la plus fréquente d'une longue queue : le modèle rechargé à chaque requête au lieu d'être chargé une fois au démarrage.",
      },
      {
        q: "Quelle est la différence entre data drift et concept drift ?",
        options: [
          "Le data drift concerne les données d'entraînement, le concept drift les données de test",
          "Le data drift est un changement de P(X) — détectable sans étiquettes ; le concept drift est un changement de P(y|X) — visible seulement quand les vraies étiquettes arrivent",
          "Ce sont deux noms pour le même phénomène",
          "Le concept drift ne concerne que le NLP",
        ],
        answer: 1,
        explain:
          "Le data drift se détecte immédiatement en comparant les distributions d'entrée. Le concept drift signifie que les mêmes caractéristiques ne veulent plus dire la même chose — cas typique de la fraude, où l'adversaire s'adapte activement au modèle. C'est le plus sournois : en fraude, les vraies étiquettes arrivent avec des semaines de retard, d'où la nécessité de surveiller aussi la distribution des PRÉDICTIONS, qui ne demande aucune étiquette.",
      },
      {
        q: "Pourquoi préfère-t-on le PSI au test de Kolmogorov-Smirnov pour surveiller une dérive en production ?",
        options: [
          "Parce qu'il est plus rapide à calculer",
          "Parce que le KS est sensible à la taille d'échantillon : avec un million de lignes, la moindre différence devient significative et tout se met à alerter",
          "Parce que le KS ne fonctionne pas sur des variables continues",
          "Parce que le PSI détecte aussi le concept drift",
        ],
        answer: 1,
        explain:
          "Le KS répond par oui ou non à « même loi ? », et sa p-value s'effondre mécaniquement quand n grandit — c'est le même piège que la p-value du module Mathématiques. Le PSI mesure une AMPLITUDE, indépendante de la taille d'échantillon, donc comparable d'une semaine à l'autre. Ses seuils usuels (0.1 et 0.25) sont des conventions à recalibrer sur son propre historique : un seuil qui alerte chaque semaine cesse d'être regardé.",
      },
      {
        q: "Tu retires la variable « origine » de ton modèle. Les écarts entre groupes vont-ils disparaître ?",
        options: [
          "Oui, le modèle ne peut plus discriminer sur une variable qu'il ne voit pas",
          "Non : le modèle reconstitue l'information via des variables de substitution — code postal, type de contrat, historique bancaire",
          "Oui, à condition de retirer aussi les variables corrélées à plus de 0.5",
          "Cela dépend du type de modèle utilisé",
        ],
        answer: 1,
        explain:
          "C'est le phénomène des proxy features. Le code postal encode partiellement l'origine géographique et sociale, le type de contrat encode partiellement l'âge. Le modèle reconstitue l'information sensible sans jamais l'avoir vue. Conséquence décisive : « nous n'utilisons pas cette variable » n'est pas une garantie d'équité — c'est pourtant la réponse la plus courante en entreprise. La seule façon de savoir est de mesurer les écarts sur les résultats.",
      },
      {
        q: "Pourquoi ne peut-on pas satisfaire simultanément parité démographique, égalité des chances et calibration ?",
        options: [
          "Parce que les algorithmes actuels ne sont pas assez puissants",
          "Parce que c'est mathématiquement impossible dès que les taux de base diffèrent entre groupes : il faut choisir et assumer",
          "Parce que les données sont toujours incomplètes",
          "On le peut, avec suffisamment de contraintes d'optimisation",
        ],
        answer: 1,
        explain:
          "C'est un résultat d'impossibilité démontré, pas une limite technique. Dès que la prévalence réelle diffère entre groupes, les trois critères deviennent incompatibles. Il n'existe donc pas de modèle « équitable » dans l'absolu : il faut choisir quel critère privilégier selon le contexte — parité en recrutement, égalité des chances en médical — et documenter ce choix dans une fiche modèle. Cet arbitrage est un choix de valeurs, pas une décision technique : il ne revient pas à l'équipe de data science seule.",
      },
    ],
  },

};
