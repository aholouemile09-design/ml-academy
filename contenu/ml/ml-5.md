Sans étiquettes, il n'y a plus de bonne réponse à comparer. C'est ce qui rend l'apprentissage non supervisé à la fois plus libre et beaucoup plus facile à rater : rien dans le code ne signale qu'on a tort.

La réduction de dimension par PCA est traitée au module Mathématiques, à la leçon sur la SVD — centrage, standardisation, variance expliquée cumulée, et l'obligation d'ajuster sur le train seul. Cette leçon porte sur le reste : les autres familles de clustering, les projections non linéaires et leurs mésusages, et la question qui gouverne tout, celle de l'évaluation.

## Les métriques internes mesurent la géométrie, pas la vérité

Commençons par là, parce que ça conditionne la lecture de tout le reste.

Prenons deux croissants entrelacés — un jeu où la vraie structure est connue, ce qui permet de noter les algorithmes. On compare KMeans et DBSCAN par l'indice de Rand ajusté, qui mesure l'accord avec la vérité, et par la silhouette, qui ne regarde que la géométrie :

| | accord avec la vérité (ARI) | silhouette |
|---|---|---|
| KMeans (k=2) | 0,255 | **0,491** |
| DBSCAN | **1,000** | 0,335 |

DBSCAN retrouve la vérité **parfaitement**. KMeans se trompe lourdement. Et la silhouette préfère KMeans.

Ce n'est pas un défaut de la silhouette, c'est sa définition : elle récompense les groupes compacts et bien séparés, c'est-à-dire sphériques. Deux croissants entrelacés ne sont pas compacts, donc la bonne réponse obtient une mauvaise note.

**La conséquence pratique est nette** : une métrique interne sert à choisir `k` à l'intérieur d'une même famille d'algorithmes, pas à choisir entre des algorithmes de géométries différentes. Pour ce second choix il n'existe pas de raccourci chiffré — il faut regarder les données et savoir ce qu'on cherche.

### Et le repère à garder

Sur 1 500 points de bruit gaussien pur, sans aucune structure :

```
k=2  silhouette = 0,139
k=3  silhouette = 0,138
k=4  silhouette = 0,139
k=6  silhouette = 0,143
```

Autour de 0,14 quel que soit `k`. C'est ton plancher : une silhouette dans ces eaux-là signifie qu'il n'y a rien à découper, et KMeans découpera quand même.

## DBSCAN : des groupes définis par la densité

KMeans demande combien de groupes et suppose qu'ils sont des boules. DBSCAN ne demande ni l'un ni l'autre. Il part d'une définition locale :

- `eps` — le rayon du voisinage
- `min_samples` — le nombre de voisins requis dans ce rayon pour être un **point cœur**

Un point cœur agrège tous ses voisins ; deux points cœurs voisins fusionnent leurs groupes. Un point qui n'est ni cœur ni voisin d'un cœur est déclaré **bruit**, et reçoit l'étiquette `-1`.

```python
from sklearn.cluster import DBSCAN
labels = DBSCAN(eps=0.18, min_samples=5).fit_predict(X)

n_groupes = len(set(labels)) - (1 if -1 in labels else 0)
n_bruit   = (labels == -1).sum()
```

Trois propriétés en découlent, et ce sont les trois raisons de le choisir.

**Le nombre de groupes est un résultat, pas une consigne.** Sur les croissants ci-dessus, DBSCAN en trouve deux sans qu'on le lui dise.

**Les formes sont quelconques.** Un groupe peut être allongé, courbé, imbriqué : tant que la densité est continue, il reste connexe.

**Le bruit a sa place.** C'est la différence la plus utile en pratique : KMeans doit affecter chaque point à un groupe, y compris les points aberrants, qui tirent les centres. DBSCAN les met de côté.

### Ce qu'il faut accepter en échange

**`eps` est difficile à choisir** et le résultat y est très sensible. La méthode usuelle est de tracer, pour chaque point, la distance à son k-ième voisin, de trier ces distances et de chercher le coude :

```python
from sklearn.neighbors import NearestNeighbors
d, _ = NearestNeighbors(n_neighbors=5).fit(X).kneighbors(X)
distances_triees = np.sort(d[:, -1])      # à tracer, et chercher le coude
```

**Une densité unique pour tout le jeu.** Si une région est dense et une autre diffuse, aucun `eps` ne convient aux deux : l'un fusionnera les groupes denses, l'autre déclarera la région diffuse entièrement bruitée. C'est la limite structurelle de la méthode, et c'est ce que **HDBSCAN** corrige en faisant varier le seuil de densité localement.

**Et DBSCAN souffre autant que KMeans de l'absence de normalisation**, pour la même raison : `eps` est un rayon euclidien.

## La classification hiérarchique et son dendrogramme

Au lieu de chercher une partition, on construit un **arbre d'emboîtements**. En ascendant : chaque point est un groupe, puis on fusionne à répétition les deux groupes les plus proches, jusqu'à n'en avoir qu'un.

L'intérêt n'est pas la partition finale, c'est l'arbre — le **dendrogramme** — qui montre à quelle distance chaque fusion a eu lieu. On le coupe à la hauteur qu'on veut et on lit le nombre de groupes correspondant.

```python
from scipy.cluster.hierarchy import dendrogram, linkage, fcluster

Z = linkage(X, method="ward")
dendrogram(Z, truncate_mode="lastp", p=30)
labels = fcluster(Z, t=4, criterion="maxclust")
```

Le paramètre qui compte est la **méthode de liaison**, c'est-à-dire la définition de « distance entre deux groupes » :

| Liaison | Distance entre groupes | Tendance |
|---|---|---|
| `ward` | augmentation de variance intra | groupes compacts et de tailles proches |
| `complete` | la paire la plus éloignée | groupes compacts, sensible aux aberrantes |
| `average` | moyenne des paires | intermédiaire |
| `single` | la paire la plus proche | groupes en chaîne, formes allongées |

`ward` est le défaut raisonnable et se comporte comme KMeans. `single` est le seul à savoir suivre une forme allongée, au prix d'un effet de chaînage qui relie deux groupes distincts par un mince filet de points.

**Quand le préférer à KMeans** : quand la hiérarchie elle-même est l'information — une taxonomie, des niveaux de regroupement successifs, des segments et des sous-segments. Et quand on veut voir plusieurs valeurs de `k` d'un seul calcul, puisqu'il suffit de couper l'arbre à différentes hauteurs.

**Le prix** : le coût est quadratique en mémoire comme en temps. Au-delà de quelques dizaines de milliers de lignes, il faut échantillonner.

## Les mélanges gaussiens : une appartenance qui peut être partielle

KMeans affecte chaque point à un groupe, point final. Un mélange gaussien ajuste des gaussiennes — avec leur centre, leur forme et leur orientation — et donne pour chaque point une **probabilité d'appartenance à chaque groupe**.

```python
from sklearn.mixture import GaussianMixture
gm = GaussianMixture(n_components=3, random_state=0).fit(X)
probas = gm.predict_proba(X)         # une ligne, trois probabilités
```

Deux gains sur KMeans.

**Les groupes peuvent être allongés et orientés.** `covariance_type="full"` autorise chaque gaussienne à prendre son ellipse propre, là où KMeans n'impose que des boules de même taille.

**L'incertitude est explicite.** Sur trois amas qui se chevauchent, 6 % des points ont une appartenance à moins de 80 % de certitude, et l'un d'eux donne `[0,000 0,506 0,494]` — il est littéralement à la frontière. KMeans l'aurait rangé dans le groupe 1 sans la moindre réserve.

C'est précieux dès qu'une décision suit : on peut écarter les cas ambigus, ou les router vers une vérification humaine, au lieu de les traiter comme les autres.

**Et un bonus de méthode** : comme le modèle est probabiliste, il a une vraisemblance, donc on peut choisir le nombre de composantes par **BIC** ou **AIC** — des critères qui pénalisent la complexité et ont un véritable minimum, là où la silhouette reste une mesure géométrique.

```python
bics = [GaussianMixture(k, random_state=0).fit(X).bic(X) for k in range(1, 11)]
k_retenu = int(np.argmin(bics)) + 1
```

## Les projections non linéaires, et les quatre erreurs de lecture

t-SNE et UMAP produisent les visualisations les plus frappantes du métier, et ce sont aussi les plus mal lues. Quatre pièges, dans l'ordre de gravité.

### Les distances entre amas ne veulent rien dire

Trois amas dont les centres réels sont à des distances très inégales, projetés par t-SNE à trois valeurs de perplexité :

```
distances réelles entre centres    ratios  1,00   2,51   1,52
projection, perplexity = 5         ratios  1,06   1,71   1,00
projection, perplexity = 30        ratios  1,00   1,05   1,00
projection, perplexity = 100       ratios  1,00   1,02   1,01
```

Le rapport réel de 2,51 est écrasé à 1,05. **Les trois amas ressortent équidistants alors que l'un est deux fois et demie plus loin que les autres.**

C'est le fonctionnement même de la méthode : t-SNE optimise la préservation des voisinages **locaux** et sacrifie délibérément la structure globale. Dire « ces deux groupes sont proches, donc ils se ressemblent » sur un graphique t-SNE n'est pas une interprétation audacieuse, c'est une lecture fausse.

### La taille et la densité des amas non plus

t-SNE égalise les densités. Un amas très dense de 20 points et un amas diffus de 2 000 peuvent occuper la même surface. On ne lit donc ni l'effectif ni la compacité sur l'image.

### La perplexité change l'image, et il n'y a pas de bonne valeur

La perplexité fixe le nombre de voisins que la méthode considère comme « locaux ». Basse, elle fragmente en petits groupes ; haute, elle fond tout. Le tableau ci-dessus le montre : les ratios changent d'un réglage à l'autre.

Le réflexe est donc de **toujours produire trois ou quatre perplexités** et de ne retenir que ce qui reste stable d'un réglage à l'autre. Une structure qui n'apparaît qu'à une seule valeur est un artefact du réglage.

### Il n'y a pas de `transform`

```python
hasattr(TSNE, "transform")        # False
hasattr(TSNE, "fit_transform")    # True
```

L'absence est volontaire. t-SNE ne construit pas une fonction de projection, il place des points les uns par rapport aux autres : ajouter un point exige de refaire le calcul, et les positions de tous les autres changent. Conséquences :

- **on ne peut pas projeter de nouvelles données** dans un espace t-SNE existant ;
- **les sorties ne peuvent pas servir de variables** pour un modèle, puisqu'on ne saura pas les produire en production ;
- deux exécutions sur les mêmes données donnent des images différentes, à moins de fixer `random_state`.

UMAP, lui, possède un `transform` et peut donc servir de prétraitement. Mais ses distances inter-amas restent tout aussi peu fiables, et les trois premiers pièges s'appliquent à l'identique.

**La règle simple** : t-SNE et UMAP sont des instruments d'exploration. Ce qu'on y voit est une hypothèse à vérifier dans l'espace d'origine, jamais un résultat.

## La détection d'anomalies est une tâche à part

On la range par commodité avec le clustering, mais la question est différente : on ne cherche pas la structure, on cherche ce qui n'y appartient pas.

Deux approches sur 1 000 points normaux et 50 anomalies dispersées :

```
IsolationForest    précision = 0,920   rappel = 0,920
distance au centre KMeans   précision = 0,940   rappel = 0,940
```

**Les deux font aussi bien, et la méthode simple gagne même d'un cheveu.** Si tu attendais que la méthode dédiée écrase l'autre, c'est le bon moment pour retenir que ça ne va pas de soi : sur des données normales bien groupées et sphériques, la distance au centre est un excellent détecteur, et elle ne coûte rien de plus qu'un clustering déjà fait.

L'écart apparaît ailleurs. La distance au centre hérite des hypothèses de KMeans : si les données normales ne sont pas sphériques, le seuil de distance rejette des points parfaitement normaux et accepte des anomalies logées dans un creux. `IsolationForest`, qui mesure la facilité à isoler un point par des découpages aléatoires, ne fait aucune hypothèse de forme — et passe donc à l'échelle en dimension, là où toute distance euclidienne se dégrade.

```python
from sklearn.ensemble import IsolationForest
iso = IsolationForest(contamination=0.02, random_state=0).fit(X)
anomalies = iso.predict(X) == -1          # -1 = anomalie
scores = iso.score_samples(X)             # plus bas = plus anormal
```

Le paramètre `contamination` est la part de points qu'on **accepte** de déclarer anormaux. Ce n'est pas une estimation du taux réel d'anomalies : c'est un budget d'alertes, et donc une décision de même nature que le seuil de la leçon sur l'évaluation.

## Choisir, en une page

| Situation | Méthode |
|---|---|
| Groupes compacts, `k` connu ou cherché | KMeans |
| Formes quelconques, bruit à écarter, `k` inconnu | DBSCAN, HDBSCAN si la densité varie |
| La hiérarchie est l'information | classification ascendante hiérarchique |
| Groupes allongés, appartenance incertaine à exploiter | mélange gaussien |
| Visualiser pour explorer | t-SNE ou UMAP, jamais comme variables |
| Réduire la dimension pour un modèle | PCA, ajustée sur le train |
| Trouver ce qui dépasse | IsolationForest, ou la distance au centre |

## Au clavier

```python
import numpy as np
from sklearn.datasets import make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score, adjusted_rand_score

X, verite = make_moons(1500, noise=.06, random_state=0)

km = KMeans(2, n_init=10, random_state=0).fit_predict(X)
db = DBSCAN(eps=.18, min_samples=5).fit_predict(X)

for nom, labels in [("KMeans", km), ("DBSCAN", db)]:
    print(f"{nom:7s} accord avec la vérité (ARI) = {adjusted_rand_score(verite, labels):.3f}"
          f"   silhouette = {silhouette_score(X, labels):.3f}")
```

Deux lignes de sortie, et la leçon entière : la métrique qu'on aurait utilisée pour décider, faute d'étiquettes, désigne le mauvais algorithme. Garde ce résultat en tête la prochaine fois que tu liras une silhouette comme une note.
