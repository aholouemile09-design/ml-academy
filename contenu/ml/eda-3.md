On présente souvent l'analyse exploratoire comme une liste de commandes à lancer sur un nouveau fichier. C'est un contresens : une suite de graphiques sans question produit des images, pas de la connaissance. L'EDA est une enquête, et comme toute enquête elle commence par établir de quoi on parle.

## La question qui précède toutes les autres : que représente une ligne ?

C'est la question la plus sautée de tout le métier, et elle invalide tout ce qui suit quand on y répond mal.

Un tableau de 50 000 lignes — est-ce 50 000 clients ? 50 000 commandes ? 50 000 **lignes de commande**, donc bien moins de commandes ? 50 000 couples client-mois ? On appelle ça le **grain** de la table, et il faut l'établir avant le premier calcul.

```python
print(len(df))                      # 50 000 lignes
print(df["client_id"].nunique())    # 8 200 clients
```

Les deux nombres diffèrent : le grain n'est **pas** le client. Conséquences immédiates, et elles sont graves :

- `len(df)` n'est pas « le nombre de clients ». Tout taux calculé dessus est faux.
- `df["panier"].mean()` est la moyenne par **ligne**, pas par client. Les clients qui commandent souvent pèsent plus lourd. Si ce sont justement les plus gros, la moyenne est biaisée dans la direction la plus flatteuse.
- une corrélation calculée sur ce tableau surpondère les clients à nombreuses lignes, exactement comme si on avait dupliqué leurs données.

Le réflexe : **écris en une phrase ce qu'une ligne représente**, et vérifie-le avec un `nunique`. Si tu n'arrives pas à l'écrire, tu n'as pas encore commencé l'EDA.

Et si le grain n'est pas celui dont parle la question métier, il faut agréger avant d'analyser — `df.groupby("client_id").agg(...)` — pas après.

## L'ordre des étapes n'est pas arbitraire

**Les types d'abord**, avant toute statistique. Un type faux empoisonne silencieusement tout ce qui vient après.

Une colonne numérique lue comme texte — à cause d'un séparateur de milliers, d'une virgule décimale, d'un `"N/A"` au milieu — a trois effets, tous muets :

- `df.describe()` la **saute**, parce qu'il ne traite que le numérique par défaut
- `df.corr(numeric_only=True)` l'ignore
- l'histogramme échoue, ou trace des catégories

Elle disparaît donc de ton analyse sans qu'aucun message ne le signale. Tu conclus sur neuf variables en croyant en avoir vu dix.

```python
df.info()                        # types, non-nuls, memoire
df.describe(include="all")       # inclut les colonnes non numeriques
```

`describe(include="all")` ajoute, pour les colonnes textuelles, le nombre de valeurs uniques, la modalité la plus fréquente et son effectif. C'est l'argument que presque personne n'écrit, et c'est la moitié de l'information.

## Les trous ne sont pas tous le même trou

« 19 % de manquants » ne dit pas quoi faire. Ce qui décide, c'est **pourquoi** ils manquent. La statistique distingue trois cas, et les noms sont moins importants que les exemples.

**Manquant complètement au hasard.** Un capteur qui tombe en panne au hasard, une ligne perdue à l'import. L'absence ne porte aucune information. C'est le seul cas où supprimer ou imputer sans réfléchir est à peu près sans conséquence — et c'est le cas le plus rare.

**Manquant conditionnellement.** L'absence dépend d'une **autre** variable observée : le revenu est plus souvent absent chez les jeunes, parce que le formulaire ne le demandait pas aux moins de 25 ans. L'absence est explicable par les données qu'on a, donc modélisable.

**Manquant pour une raison liée à la valeur elle-même.** Les hauts revenus refusent plus souvent de déclarer leur revenu. L'absence dépend de la valeur absente. C'est le cas dangereux : imputer par la médiane remplace systématiquement des valeurs hautes par une valeur centrale, et **écrase précisément le signal** qu'on cherchait.

D'où deux conséquences pratiques.

**Imputer est une décision, pas un réglage.** Remplacer par la médiane invente des données. Ça peut être le bon choix, mais ça doit être écrit et justifié, pas fait par défaut.

**L'absence est parfois la meilleure variable du jeu.**

```python
df["revenu_absent"] = df["revenu"].isna().astype(int)
```

Si cette colonne est corrélée à la cible, l'absence porte de l'information — et la supprimer par un `dropna()` la détruit. En crédit, en santé, en assurance, « le client n'a pas répondu » est souvent plus prédictif que la réponse.

**Et `dropna()` est l'otage de sa pire colonne.** Un `dropna()` sans argument supprime toute ligne ayant **au moins un** trou, n'importe où. Une seule colonne très trouée suffit donc à détruire le tableau entier, même si toutes les autres sont presque complètes.

```python
print(df.shape, "->", df.dropna().shape)
```

Sur le Titanic : `(891, 15) -> (182, 15)`. **Un `dropna()` naïf jette 80 % du jeu de données.** En regardant les manquants par colonne, la cause saute aux yeux : `deck` est à 77,2 %, `age` à 19,9 %, et tout le reste sous 0,3 %. Autrement dit, on perd 709 lignes pour une colonne dont on n'avait probablement pas besoin.

La bonne forme est donc presque toujours ciblée — `df.dropna(subset=["age"])`, après avoir décidé du sort de `deck` séparément. Et quand les trous sont répartis sur beaucoup de colonnes plutôt que concentrés sur une, c'est l'**intersection** qui mord : dix colonnes à 20 % chacune ne laissent pas 80 % du tableau, parce que les trous ne sont pas aux mêmes lignes.

## Les manquants qui ne sont pas des `NaN`

C'est l'erreur silencieuse la plus répandue des données réelles, et aucun `isnull()` ne l'attrape.

Les systèmes anciens n'écrivent pas `NaN`. Ils écrivent une **valeur sentinelle** : `-1`, `0`, `999`, `9999`, `-9999`, `"N/A"`, `"inconnu"`, `""`, ou une date comme `1900-01-01`. Pour pandas, ce sont des valeurs légitimes. Elles entrent donc dans les moyennes, les corrélations et les histogrammes.

Une moyenne d'âge de 31 ans sur une population où 300 personnes ont « 0 an » n'est pas une moyenne d'âge.

Le signal visuel est très reconnaissable : **un pic isolé sur une valeur ronde**, collé à un bord de l'histogramme, séparé du reste de la distribution. Le contrôle direct :

```python
df["age"].value_counts().head(10)
df["age"].describe()          # un min a 0 ou -1, un max a 999 : sentinelle
```

Regarde le `min` et le `max` de chaque variable numérique et demande-toi si cette valeur est **physiquement possible**. Un âge de 0, un salaire de −1, une température de 9999 ne sont pas des valeurs aberrantes : ce sont des codes.

## Les doublons : strict ou métier

`df.duplicated().sum()` compte les lignes **strictement** identiques sur toutes les colonnes. C'est rarement la bonne question.

Deux transactions identiques à la même seconde : deux cafés payés d'affilée, ou un double envoi du formulaire ? La réponse n'est pas dans les données, elle est dans le métier. La vraie question se pose sur une **clé** :

```python
df.duplicated(subset=["client_id", "date_commande"]).sum()
```

Et un cas qui doit déclencher une alerte immédiate : **un identifiant dupliqué**. Si `client_id` apparaît deux fois alors que tu croyais une ligne par client, le grain n'est pas celui que tu pensais — retour à la première question de cette leçon.

## Une valeur aberrante n'est pas une erreur

Le mot « outlier » fait croire à un défaut. En réalité une valeur extrême a trois origines possibles, et l'action n'est pas la même :

- **une erreur de mesure** — le capteur a déraillé. À corriger ou à retirer.
- **une erreur de saisie** — un salaire à 1 000 000 au lieu de 100 000, un âge à 150. À corriger si on peut deviner, à retirer sinon.
- **un événement rare mais réel** — la fraude, la panne, le très gros client. **À garder absolument** : c'est souvent exactement ce qu'on cherche à prédire. Supprimer les valeurs extrêmes d'un jeu de détection de fraude revient à supprimer les fraudes.

**Aucune règle statistique ne distingue ces trois cas.** Seule la connaissance du domaine le fait. C'est pour ça qu'une suppression automatique des aberrants est une mauvaise pratique, même quand elle améliore le score.

Et la règle de Tukey, celle de l'écart interquartile, a une limite qu'on oublie : elle suppose une distribution **à peu près symétrique**. Sur une variable asymétrique — un revenu, une durée —, elle signale couramment 5 à 10 % des lignes. Dix pour cent de valeurs aberrantes, ce ne sont pas des aberrations : c'est la forme de la distribution. Sur ce genre de variable, passe l'axe en logarithmique avant de parler d'aberrant.

Le réflexe : **compter, regarder, décider, écrire**. Jamais supprimer en silence.

## Le temps change tout

Dès qu'il y a une colonne de date, trois contrôles s'ajoutent.

**L'étendue et les trous.**

```python
print(df["date"].min(), "->", df["date"].max())
print(df.set_index("date").resample("MS").size())
```

Un mois à zéro ligne au milieu de la série est une panne de collecte, pas une absence d'activité — et un modèle entraîné dessus apprendra un creux qui n'a jamais existé.

**La dérive.** La moyenne d'une variable, mois par mois. Si elle se déplace, les données d'il y a deux ans ne décrivent plus le même monde.

```python
df.set_index("date")["montant"].resample("MS").mean().plot()
```

**Et la conséquence qui compte** : si les données dérivent, un découpage aléatoire train/test est un mensonge. Il met du futur dans l'entraînement et du passé dans le test, et le score obtenu est inatteignable en production, où le futur n'est jamais disponible. **Le découpage doit être temporel** : on entraîne sur avant, on teste sur après.

Dernier piège : une variation saisonnière lue comme une tendance. Trois mois de hausse en fin d'année peuvent être Noël, pas une croissance.

## Ce que l'EDA doit produire

Pas des graphiques. **Des décisions écrites.**

Le livrable d'une analyse exploratoire est une liste, et chaque entrée porte sa raison :

- cette colonne est abandonnée, parce que 94 % de manquants et aucune imputation défendable
- ces 312 lignes sont retirées, parce que l'âge y vaut 0, qui est une sentinelle
- cette variable passera en logarithme, parce que son asymétrie est de 3,4
- la métrique sera le rappel, parce que la classe positive pèse 2 %
- le découpage sera temporel, parce que la moyenne du montant a doublé sur la période
- le grain est le couple client-mois, et les totaux par client sont donc agrégés en amont

Un notebook de quarante graphiques sans une ligne de conclusion écrite n'est pas une EDA : c'est une galerie. La règle de métier : **un chiffre qu'on ne sait pas raconter est un chiffre qu'on n'a pas compris.**

Et une discipline qui coûte peu et sauve beaucoup : **l'EDA se fait sur le jeu d'entraînement.** Les contrôles de structure — types, grain, doublons, sentinelles — portent sur tout, parce qu'ils ne concernent pas le contenu. Mais tout ce qui **informe un choix de modélisation** — distributions, corrélations avec la cible, décisions sur les aberrants, choix de transformation — se fait sur le train seul. Regarder le test puis choisir ses variables est une fuite, même si aucune ligne de code ne la trahit : c'est ta tête qui a transporté l'information.

## Au clavier

```python
import pandas as pd

# 1. Le grain, avant tout
print(f"{len(df):,} lignes pour {df['client_id'].nunique():,} clients")

# 2. Les types, avant toute statistique
df.info()

# 3. Les sentinelles : min et max physiquement possibles ?
print(df.describe(include="all").T[["count", "min", "max"]])

# 4. L'intersection des trous
print(df.shape, "->", df.dropna().shape)

# 5. La derive, s'il y a une date
print(df.set_index("date")["montant"].resample("MS").mean().round(1))
```

Trois réflexes :

1. **Écris en une phrase ce qu'une ligne représente**, et vérifie-le par un `nunique`. Tant que tu ne peux pas l'écrire, aucun chiffre calculé n'est fiable.
2. **Regarde le `min` et le `max` de chaque variable numérique** et demande-toi si la valeur est physiquement possible. C'est le contrôle le plus rentable de toute l'EDA.
3. **Termine par la liste des décisions, pas par un graphique.** Si tu ne peux pas écrire six lignes de décisions justifiées, l'exploration n'est pas finie.
