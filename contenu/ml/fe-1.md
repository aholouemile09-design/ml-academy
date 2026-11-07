Encoder une variable catégorielle n'est pas une conversion technique, c'est une **affirmation** sur cette variable. Écrire `rouge → 0, bleu → 1, vert → 2`, c'est affirmer que vert est deux fois plus loin de rouge que bleu ne l'est. Le modèle te croira. Toute la leçon consiste à savoir ce que chaque encodage affirme, et à qui il l'affirme.

## Ce que le modèle fait de tes nombres

Le même encodage n'a pas du tout le même effet selon la famille d'algorithme, et c'est le point qu'on saute toujours.

**Un modèle linéaire** multiplie chaque variable par un coefficient et additionne. Il *ne peut rien faire d'autre*. Si tu encodes `couleur` en 0/1/2, il apprend un seul coefficient `w` et prédit `w × 0`, `w × 1`, `w × 2` — trois valeurs forcément alignées et régulièrement espacées. L'affirmation d'ordre et d'écart constant n'est pas une approximation : elle est **imposée par la forme du modèle**.

**Un arbre de décision** ne multiplie rien. Il coupe : « cette variable est-elle inférieure à un seuil ? ». Sur un encodage 0/1/2, il peut découper à 0,5 puis à 1,5 et retrouver les trois catégories séparément. Il s'en sort donc — mais **au prix de la profondeur**, deux coupes là où une suffirait, et chaque coupe consomme du budget de modèle.

La conséquence pratique : un encodage ordinal sur une variable nominale est **catastrophique** pour une régression linéaire ou logistique, et seulement **coûteux** pour une forêt ou un gradient boosting. C'est pour ça que les mêmes données, mal encodées, produisent un désastre avec un modèle et un résultat médiocre avec un autre.

## Le one-hot et les arbres : un mariage malheureux

L'inverse est vrai aussi, et beaucoup moins connu.

Une colonne one-hot est binaire : elle n'offre à l'arbre **qu'une seule coupe possible**, « cette modalité, oui ou non ». Avec une variable à 40 modalités, l'arbre se retrouve devant 40 questions très déséquilibrées — chacune isole en moyenne 2,5 % des lignes.

Or un arbre choisit à chaque nœud la coupe qui réduit le plus l'impureté. Une coupe qui isole 2,5 % des données réduit peu, par construction. Donc **les colonnes one-hot perdent systématiquement** face à une variable continue qui, elle, offre des coupes équilibrées. La variable catégorielle est présente, elle est correctement encodée, et l'arbre ne l'utilise presque jamais.

D'où la pratique des praticiens du gradient boosting : pour les arbres, préférer un encodage **compact** — ordinal (même sur du nominal, puisque l'arbre peut recouper) ou par la cible — plutôt qu'un one-hot large. LightGBM et CatBoost vont plus loin et traitent nativement les catégorielles, précisément pour éviter ce problème.

**La règle qui en découle : l'encodage dépend du modèle, pas seulement de la variable.** Un même jeu de données bien préparé pour une régression logistique est mal préparé pour un LightGBM.

## `drop_first` : indispensable, puis nuisible

Supprimer une modalité sur k n'est pas un détail cosmétique, et le bon choix s'inverse selon le modèle.

**Pour une régression linéaire sans régularisation, c'est obligatoire.** Les k colonnes one-hot somment à 1 sur chaque ligne, exactement comme la colonne de constante du modèle. Il y a donc une dépendance linéaire parfaite : la matrice `XᵀX` devient **singulière**, et tu as vu au cours d'algèbre linéaire ce que ça implique — rang insuffisant, infinité de solutions équivalentes, aucune raison d'en choisir une. C'est le *dummy variable trap*, et ce n'est pas un problème statistique mais arithmétique.

**Pour un modèle régularisé — Ridge, Lasso, ElasticNet — c'est nuisible.** La régularisation pénalise la taille des coefficients, et la modalité supprimée devient la référence implicite : tous les autres coefficients expriment un écart par rapport à elle. La pénalité n'est donc plus symétrique entre modalités, et le résultat dépend de **laquelle** tu as retirée. Garde les k colonnes : la régularisation gère elle-même la redondance.

**Pour un arbre, c'est sans objet et légèrement nuisible** : supprimer une colonne retire simplement une coupe possible.

```python
# Regression lineaire simple
pd.get_dummies(df["couleur"], drop_first=True)
# Ridge / Lasso / arbres
pd.get_dummies(df["couleur"], drop_first=False)
```

## `get_dummies` n'a pas de mémoire

Voici le bug qui coûte le plus d'heures de débogage de tout le module, et il ne lève aucune exception.

`pd.get_dummies` regarde les données qu'on lui donne et crée une colonne par modalité **présente**. Appliqué séparément au train et au test, il produit donc deux jeux de colonnes différents.

```python
X_train = pd.get_dummies(train["ville"])   # Dakar, Abidjan, Lomé    -> 3 colonnes
X_test  = pd.get_dummies(test["ville"])    # Dakar, Cotonou          -> 2 colonnes
```

Le train a trois colonnes, le test en a deux, et elles ne sont **pas dans le même ordre**. Trois issues possibles, toutes mauvaises :

- une erreur de dimensions au moment de prédire, et c'est le cas chanceux ;
- pire, si le nombre de colonnes coïncide par hasard, le modèle applique le coefficient de « Lomé » aux valeurs de « Cotonou » et prédit n'importe quoi **sans aucun message** ;
- en production, une ville jamais vue à l'entraînement crée une colonne qui n'existe pas dans le modèle.

`OneHotEncoder` de scikit-learn n'a pas ce défaut : il **mémorise** les modalités au `fit` et produit toujours les mêmes colonnes, dans le même ordre, au `transform`. C'est la raison principale de le préférer, bien avant toute considération de style.

```python
enc = OneHotEncoder(handle_unknown="ignore", sparse_output=False).fit(train[["ville"]])
enc.transform(test[["ville"]])     # memes colonnes, meme ordre, toujours
```

`get_dummies` reste parfait pour explorer dans un notebook. Dès qu'il y a un train et un test, il ne doit plus apparaître.

## Creux ou plein : une question de mémoire

`OneHotEncoder` rend par défaut une matrice **creuse** (*sparse*), qui ne stocke que les positions non nulles. Ce n'est pas un détail d'implémentation.

Un million de lignes et mille modalités, en matrice pleine de flottants :

```
1 000 000 × 1 000 × 8 octets = 8 Go
```

Pour une matrice dont 99,9 % des cases valent zéro. La même en creux occupe un millionième de ça, puisqu'il n'y a qu'une valeur non nulle par ligne.

Donc : laisse `sparse_output=True` dès que la cardinalité dépasse quelques dizaines. Les modèles linéaires de scikit-learn, les SVM et XGBoost acceptent directement le format creux. Le `sparse_output=False` qu'on voit partout dans les tutoriels est une commodité d'affichage qui devient une bombe mémoire à l'échelle.

## L'encodage par fréquence

Une troisième famille, rarement citée et souvent la meilleure première tentative sur une variable à cardinalité moyenne : remplacer chaque modalité par **son effectif**, ou sa proportion.

```python
freq = train["marque"].value_counts(normalize=True)
train["marque_freq"] = train["marque"].map(freq)
test["marque_freq"]  = test["marque"].map(freq).fillna(0)   # inconnue -> rare
```

Une seule colonne, aucune fuite — l'effectif ne regarde pas la cible —, et l'hypothèse qu'il encode est souvent vraie : **la rareté est en elle-même informative**. Une marque vue trois fois sur cent mille lignes se comporte différemment d'une marque vue vingt mille fois, indépendamment de laquelle c'est.

Sa limite : deux modalités de même effectif reçoivent la même valeur et deviennent indistinguables. Sur une variable où les effectifs sont tous proches, l'encodage n'apporte rien.

## Le target encoding et sa fuite

Remplacer chaque modalité par la moyenne de la cible pour cette modalité est puissant — une seule colonne, dense, directement alignée sur ce qu'on cherche à prédire. C'est aussi le seul encodage qui regarde la cible, donc le seul qui peut fuiter.

**Le mécanisme de la fuite, précisément.** Si la moyenne d'une modalité est calculée sur toutes les lignes du train, alors la ligne *i* a contribué à la valeur qu'on lui attribue. Dans le cas extrême d'une modalité présente une seule fois, la valeur encodée **est** la cible de cette ligne : la colonne contient la réponse. Le modèle apprend à la lire, obtient un score d'entraînement superbe, et s'effondre sur des données où cette correspondance n'existe pas.

**Le remède : le calcul hors-fold.** On découpe le train, et pour chaque portion on calcule les moyennes sur **les autres** portions. Aucune ligne ne participe à sa propre valeur.

```python
from sklearn.model_selection import KFold

def encodage_cible_hors_fold(X, y, col, n_splits=5):
    """Chaque ligne recoit une moyenne calculee sans elle."""
    encode = pd.Series(index=X.index, dtype=float)
    for appr, vald in KFold(n_splits, shuffle=True, random_state=0).split(X):
        moyennes = y.iloc[appr].groupby(X[col].iloc[appr]).mean()
        encode.iloc[vald] = X[col].iloc[vald].map(moyennes).values
    return encode.fillna(y.mean())
```

Pour le jeu de test, en revanche, on utilise les moyennes calculées sur **tout** le train : le test ne contribue à rien, il n'y a donc pas de fuite, et on veut l'estimation la plus précise possible.

**Le lissage, et ce qu'il calcule.** Une modalité vue trois fois donne une moyenne très bruitée. Le lissage la tire vers la moyenne globale, d'autant plus fort que l'effectif est faible :

```
valeur = (n × moyenne_modalité + m × moyenne_globale) / (n + m)
```

`n` est l'effectif de la modalité, `m` un paramètre de force. Quand `n` est grand devant `m`, on garde la moyenne locale ; quand `n` est petit, on retombe sur la moyenne globale. C'est exactement l'a priori Beta du cours sur les distributions, écrit autrement : une croyance de départ que les données écrasent à mesure qu'elles s'accumulent.

Depuis la version 1.3, scikit-learn fournit `TargetEncoder`, qui fait le hors-fold et le lissage sans qu'on les écrive.

## L'astuce de hachage, pour les cardinalités extrêmes

Un million d'identifiants produits, des URL, des adresses IP : aucun encodage par modalité ne tient. Le *hashing trick* passe chaque modalité dans une fonction de hachage et prend le reste modulo un nombre de colonnes **fixé à l'avance**.

```python
from sklearn.feature_extraction import FeatureHasher
h = FeatureHasher(n_features=256, input_type="string")
```

Trois propriétés : la taille de sortie est décidée par toi, pas par les données ; aucune modalité n'est « inconnue », puisque tout se hache ; et aucun dictionnaire n'est à stocker, ce qui compte en production.

Le prix est la **collision** : deux modalités différentes peuvent tomber dans la même colonne et se mélanger. On l'accepte parce qu'avec assez de colonnes les collisions sont rares et surtout *aléatoires*, donc elles ajoutent du bruit sans introduire de biais systématique. En revanche l'interprétabilité disparaît complètement : la colonne 173 ne veut rien dire.

## Une modalité nouvelle n'est pas qu'un problème d'encodage

`handle_unknown="ignore"` empêche le plantage. Il ne règle pas le vrai problème.

Une modalité jamais vue à l'entraînement signifie que **le monde a changé** : un nouveau pays d'opération, un nouveau produit au catalogue, un nouveau canal d'acquisition. Encodée en zéros, la ligne est traitée comme « aucune des modalités connues », et le modèle produit une prédiction sans jamais signaler qu'il extrapole.

Le réflexe à installer : **compter les modalités inconnues en production** et déclencher une alerte au-delà d'un seuil. Un taux qui monte est le signal le plus précoce qu'un modèle est en train de se périmer — bien plus précoce qu'une baisse de performance, qui n'apparaît qu'une fois les vraies étiquettes connues, parfois des mois plus tard.

## Les variables cycliques

Un cas particulier qu'aucun encodage catégoriel ne traite correctement : le mois, l'heure, le jour de la semaine, l'angle.

Encoder le mois en 1–12 affirme que décembre (12) est très loin de janvier (1), alors qu'ils sont **adjacents**. Le one-hot, lui, les rend équidistants et perd toute la proximité : mars n'est pas plus proche d'avril que de septembre.

La solution est de placer la valeur sur un cercle, avec deux colonnes :

```python
import numpy as np
df["mois_sin"] = np.sin(2 * np.pi * df["mois"] / 12)
df["mois_cos"] = np.cos(2 * np.pi * df["mois"] / 12)
```

Décembre et janvier se retrouvent voisins sur le cercle, comme ils le sont dans le calendrier. Il faut **les deux** colonnes : le sinus seul confond deux positions symétriques, le couple sinus-cosinus identifie un point du cercle sans ambiguïté.

À utiliser pour les modèles linéaires et les réseaux de neurones, qui raisonnent en distance. Pour un arbre, c'est moins utile — il peut découper 1–12 à plusieurs endroits — et parfois contre-productif, puisqu'il doit alors combiner deux variables pour retrouver une information qui en tenait dans une.

## Au clavier

```python
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, TargetEncoder

ordre = [["Lycee", "Licence", "Master", "Doctorat"]]

prep = ColumnTransformer([
    # k colonnes gardees : on utilisera un modele regularise
    ("nominal", OneHotEncoder(handle_unknown="ignore"), ["couleur", "type_contrat"]),
    ("ordinal", OrdinalEncoder(categories=ordre),       ["education"]),
    ("cible",   TargetEncoder(),                        ["ville", "marque"]),
])
```

Trois réflexes :

1. **Jamais `get_dummies` dès qu'il y a un train et un test.** `OneHotEncoder` mémorise les modalités ; `get_dummies` les redécouvre à chaque appel, et c'est la source du bug le plus silencieux du module.
2. **Demande-toi quel modèle va consommer cet encodage.** One-hot pour le linéaire, compact pour les arbres. Ce n'est pas la même préparation.
3. **Tout encodage qui regarde la cible se calcule hors-fold.** Si tu ne sais pas prouver qu'une ligne n'a pas contribué à sa propre valeur, tu as une fuite.
