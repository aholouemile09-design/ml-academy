NumPy est la fondation de tout l'écosystème : Pandas, scikit-learn, PyTorch et TensorFlow stockent leurs données dans des tableaux NumPy ou dans des objets qui en copient l'interface. Son objet central est le **ndarray**, un tableau multidimensionnel à type unique.

```python
import numpy as np

a = np.array([1, 2, 3])
M = np.array([[1., 2.], [3., 4.]])
a * 2            # [2 4 6]  — l'opération s'applique à tous les éléments
M @ a[:2]        # produit matriciel
```

La convention `import numpy as np` est universelle. Ne l'écris pas autrement : tout le code que tu liras suppose ce nom.

## Pourquoi c'est rapide

La vectorisation n'est pas une astuce d'écriture, c'est un changement de structure en mémoire. Il faut comprendre lequel, sinon on écrit du NumPy qui a la lenteur de Python.

Une **liste** Python est un tableau de pointeurs. Chaque élément est un objet complet, rangé ailleurs en mémoire, avec son type, son compteur de références et sa valeur. Additionner deux listes élément par élément oblige l'interpréteur, à chaque tour, à déréférencer deux pointeurs, vérifier les types, chercher la bonne méthode d'addition, créer un objet résultat.

Un **ndarray** est un bloc de mémoire contigu, d'éléments de taille fixe et de type identique. L'addition de deux tableaux est alors une boucle en C sur deux plages d'octets adjacentes : pas de vérification de type, pas d'allocation par élément, et les données entrent dans le cache du processeur par paquets. Le facteur d'accélération se mesure habituellement entre 10 et 200 selon l'opération — l'exercice final du module te fera mesurer le tien.

Le corollaire est important : **le gain vient de l'absence de boucle Python, pas de NumPy en soi.** Écrire `for i in range(len(a)): a[i] = a[i] * 2` sur un ndarray est *plus lent* que sur une liste, parce que chaque accès indexé doit reconstruire un objet Python à partir des octets bruts. Si tu vois une boucle `for` sur un tableau NumPy, c'est presque toujours le signe qu'il manque une opération vectorisée.

## Le dtype, et ce qu'il impose

Tous les éléments d'un tableau partagent un type unique, le `dtype`, choisi à la création et modifiable seulement par recopie.

```python
np.array([1, 2, 3]).dtype          # int64   (int32 sous Windows)
np.array([1., 2., 3.]).dtype       # float64
np.array([1, 2.5]).dtype           # float64 — tout est promu
np.array([1, "a"]).dtype           # <U21  — tout devient chaîne
```

Trois conséquences à connaître avant de perdre une journée dessus.

**Les entiers débordent silencieusement.** Contrairement à l'`int` de Python, un `int64` a une taille fixe.

```python
np.array([2**62], dtype=np.int64) * 4    # résultat négatif, aucun avertissement
```

Rien ne prévient. Sur des compteurs ou des produits de grands entiers, passe en `float64` ou en `object` — ou vérifie tes ordres de grandeur.

**`NaN` n'existe que dans les flottants.** `np.nan` est une valeur flottante spéciale. Un tableau d'entiers ne peut donc pas porter de valeur manquante, et c'est la raison pour laquelle une colonne d'entiers devient `float64` dès qu'elle contient un trou — tu reverras ce comportement en Pandas à la leçon suivante.

**Le type gouverne la mémoire.** Un `float64` prend 8 octets, un `float32` en prend 4. Sur un million de lignes la différence est de 4 Mo ; sur une image de 10 millions de pixels en trois canaux, elle décide si le calcul tient dans la mémoire du GPU. En apprentissage profond, `float32` est le défaut, pas `float64`.

```python
a.astype(np.float32)    # rend un NOUVEAU tableau converti
```

## La forme est l'information la plus importante

```python
M = np.zeros((3, 4))
M.shape     # (3, 4)   — 3 lignes, 4 colonnes
M.ndim      # 2        — nombre de dimensions
M.size      # 12       — nombre d'éléments
```

La distinction suivante est la cause de plus de messages d'erreur que tout le reste réuni :

| Objet | `shape` | Ce que c'est |
| --- | --- | --- |
| `np.array([1, 2, 3])` | `(3,)` | un vecteur, sans orientation |
| `np.array([[1, 2, 3]])` | `(1, 3)` | une matrice d'une ligne |
| `np.array([[1], [2], [3]])` | `(3, 1)` | une matrice d'une colonne |

Les trois contiennent les mêmes nombres et ne se comportent pas pareil. Un tableau `(3,)` est **unidimensionnel** : il n'est ni ligne ni colonne, et NumPy l'orientera selon le contexte. C'est pratique et c'est trompeur, parce que scikit-learn, lui, exige souvent du `(n, 1)` explicite et refuse le `(n,)`.

```python
a.reshape(3, 1)     # force une colonne
a.reshape(-1, 1)    # idem, -1 = « calcule cette dimension pour moi »
a.reshape(-1)       # remet à plat
```

`-1` ne peut apparaître qu'une fois : il signifie « déduis cette dimension du nombre total d'éléments ». `reshape(-1, 1)` est l'idiome à retenir pour transformer un vecteur en colonne.

> Quand une opération NumPy échoue, affiche les `shape` des deux opérandes avant toute autre hypothèse. Le message d'erreur les donne, mais il les donne dans l'ordre interne de l'opération, pas dans celui où tu les as écrites.

## Les règles exactes du broadcasting

Le broadcasting permet d'opérer sur des tableaux de formes différentes sans les dupliquer en mémoire. Ce n'est pas de la magie : il suit deux règles, et les connaître permet de prédire le résultat au lieu de l'essayer.

NumPy aligne les formes **par la droite**, puis, dimension par dimension :

1. si les deux tailles sont égales, c'est bon ;
2. si l'une des deux vaut 1, elle est étirée à la taille de l'autre ;
3. sinon, c'est une erreur.

Les formes trop courtes sont complétées à gauche par des 1.

```
(3, 4)  et  (4,)     →  (4,) devient (1, 4), étiré en (3, 4).   OK
(3, 4)  et  (3,)     →  (3,) devient (1, 3). 4 contre 3 → erreur
(3, 4)  et  (3, 1)   →  la colonne est étirée sur 4 colonnes.    OK
(3, 1)  et  (1, 4)   →  les deux s'étirent, résultat (3, 4).     OK
```

La deuxième ligne mérite un arrêt. Centrer les *lignes* d'une matrice `(3, 4)` ne marche pas directement : la moyenne par ligne a la forme `(3,)`, que l'alignement par la droite comprend comme `(1, 3)`, donc incompatible. Il faut lui rendre sa dimension :

```python
M - M.mean(axis=1).reshape(-1, 1)      # explicite
M - M.mean(axis=1, keepdims=True)      # la forme recommandée
```

`keepdims=True` demande à la réduction de conserver la dimension réduite avec une taille de 1, ce qui donne exactement la forme qu'il faut pour que le broadcasting fasse le reste. Prends-le comme réflexe dès que tu réduis puis recombines.

## Vue ou copie : la différence qui corrompt les données

Voici le point où NumPy ne se comporte pas comme les listes de la leçon 2, et le piège attrape tout le monde une fois.

**Découper une liste Python rend une copie. Découper un tableau NumPy rend une vue.**

```python
a = np.array([1, 2, 3, 4, 5])
tranche = a[1:4]      # une VUE : les mêmes octets, vus autrement
tranche[0] = 99
print(a)              # [ 1 99  3  4  5]  — a est modifié
```

C'est un choix de performance : sur un tableau d'un gigaoctet, découper sans copier est la seule façon de travailler. Mais cela veut dire qu'une fonction qui reçoit une tranche peut altérer les données d'origine sans le savoir.

Comment s'y retrouver :

- le **découpage** rend une vue ;
- l'**indexation booléenne** et l'**indexation par liste d'indices** rendent une copie ;
- `reshape` rend une vue quand c'est possible, une copie sinon ;
- `.copy()` rend toujours une copie, et `a.base` est `None` sur un tableau qui possède ses données.

La règle de travail est simple : **quand tu modifies un tableau que tu n'as pas créé, copie-le d'abord.** Une copie inutile coûte de la mémoire ; une mutation involontaire coûte un résultat faux qu'on ne découvre pas.

## Indexer autrement que par position

### Les masques booléens

C'est l'outil le plus utilisé de tout NumPy, et le fondement du filtrage que tu écriras en Pandas.

```python
ages = np.array([12, 45, 8, 67, 33])
masque = ages >= 18            # [False True False True True]
ages[masque]                   # [45 67 33]
masque.sum()                   # 3  — un booléen vaut 1 ou 0
masque.mean()                  # 0.6 — donc la proportion
```

Une comparaison sur un tableau rend un tableau de booléens de la même forme, pas un seul booléen. Et comme un booléen vaut 1 ou 0, `.sum()` compte et `.mean()` donne une proportion — la technique annoncée à la leçon 1 sur le sous-typage de `bool`.

Attention à la combinaison : **ce sont `&`, `|` et `~`, pas `and`, `or` et `not`.**

```python
ages[(ages >= 18) & (ages < 60)]     # correct
ages[ages >= 18 and ages < 60]       # ValueError: truth value is ambiguous
```

Les mots-clés Python veulent un seul booléen et ne savent pas quoi faire d'un tableau de cinq. Les opérateurs `&` et `|` travaillent élément par élément. Et **les parenthèses sont obligatoires**, parce que `&` est plus prioritaire que `>=`.

### np.where

```python
np.where(ages >= 18, "majeur", "mineur")     # choisit selon la condition
np.where(ages >= 18)                          # les indices où c'est vrai
```

`np.where(condition, si_vrai, si_faux)` est le `if/else` vectorisé, sur trois tableaux diffusés ensemble. Appelé avec la condition seule, il rend les positions des valeurs vraies.

## Les valeurs manquantes et les comparaisons flottantes

`np.nan` se propage et ne s'égale pas à lui-même.

```python
np.nan == np.nan          # False — toujours
np.array([1, np.nan]).mean()     # nan : une seule valeur manquante contamine
```

Le second comportement est voulu : une moyenne calculée sur des données incomplètes doit se signaler. Les fonctions `nan*` ignorent explicitement les trous :

```python
np.nanmean(x), np.nansum(x), np.nanstd(x)
np.isnan(x).sum()         # combien de valeurs manquantes
```

`np.isnan` est la seule façon correcte de tester un `NaN` — `x == np.nan` rend toujours `False`.

Et pour comparer des résultats de calcul, la leçon 1 sur l'approximation des flottants s'applique avec un outil dédié :

```python
np.allclose(resultat, attendu)     # égalité à une tolérance près
(resultat == attendu).all()        # presque toujours False, et inutilisable
```

## Le hasard reproductible

```python
rng = np.random.default_rng(42)
rng.normal(0, 1, 5)
rng.integers(1, 7, 10)
rng.choice(["A", "B"], 10, p=[0.7, 0.3])
```

`default_rng` est l'interface moderne, celle à utiliser. Tu croiseras partout l'ancienne forme `np.random.seed(42)` suivie de `np.random.randn(...)` : elle fonctionne encore mais partage un état global unique, que n'importe quelle bibliothèque importée peut modifier sous tes pieds. Un générateur explicite passé en argument est reproductible pour de bon.

La graine n'est pas une coquetterie. Sans elle, deux exécutions du même entraînement donnent deux scores différents, et tu ne sais plus si ton amélioration vient de ton code ou du tirage.

## Multiplier : deux opérateurs distincts

```python
A * B      # produit élément par élément (avec broadcasting)
A @ B      # produit matriciel
A.T        # transposée — c'est une vue, pas une copie
```

`*` et `@` n'ont rien à voir. `A * B` exige des formes compatibles au sens du broadcasting ; `A @ B` exige que le nombre de **colonnes de A égale le nombre de lignes de B**, et rend une matrice `(lignes de A, colonnes de B)`.

Un réseau de neurones n'est qu'une suite de `@` entrecoupés de fonctions non linéaires. Quand une erreur de forme tombe dans du code d'apprentissage profond, elle vient à peu près toujours d'un `@` dont les dimensions intérieures ne se correspondent pas — et la lire consiste à aligner les `shape` de part et d'autre.

## Ce que NumPy ne fait pas

Un ndarray n'a **ni étiquettes de colonnes ni types mixtes**. Un jeu de données réel a les deux : une colonne de dates, une de chaînes, une d'entiers, et des noms pour s'y retrouver. C'est exactement le trou que comble Pandas, qui n'est rien d'autre qu'une couche d'étiquettes et de types hétérogènes posée sur des tableaux NumPy.

C'est aussi pourquoi tu passeras sans cesse de l'un à l'autre : `df.to_numpy()` descend vers le calcul brut, `pd.DataFrame(array)` remonte vers les étiquettes.

## Au clavier

- **`np.array` prend une seule séquence.** `np.array(1, 2, 3)` échoue ; c'est `np.array([1, 2, 3])`. L'erreur est purement mécanique et on la fait tous les jours au début.
- **`a.T` sur un tableau `(3,)` ne fait rien.** Transposer un unidimensionnel est une opération vide, sans erreur. Si tu voulais une colonne, c'est `reshape(-1, 1)`.
- **`np.zeros(3)` donne des flottants**, `np.zeros(3, dtype=int)` des entiers. Un tableau de zéros dans lequel tu écris ensuite des entiers les convertit silencieusement en flottants.
- **Afficher un grand tableau le tronque.** NumPy met des points de suspension au-delà de 1000 éléments. Pour vérifier un calcul, regarde `.shape`, `.dtype`, `.min()` et `.max()` plutôt que le contenu.
