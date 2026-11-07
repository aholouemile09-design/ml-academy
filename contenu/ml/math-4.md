La décomposition en valeurs singulières est l'outil qui répond à une question revenant partout en ML : dans ces données à mille colonnes, combien d'information y a-t-il **vraiment** ? La SVD la mesure, et permet de jeter le reste.

## Le problème : trop de dimensions

Un jeu de données à 500 colonnes pose trois difficultés qui n'ont rien d'abstrait.

**Les colonnes se répètent.** Tu l'as vu avec le rang : la taille en centimètres et la taille en pouces, c'est une information écrite deux fois. En pratique, la redondance est rarement aussi franche — elle est partielle, diffuse, répartie sur des dizaines de colonnes corrélées.

**Le volume explose.** Avec 500 features, un modèle a 500 poids à estimer par couche. Il faut beaucoup d'exemples pour les apprendre sans mémoriser le bruit.

**La distance perd son sens.** C'est le **fléau de la dimension** : plus on ajoute d'axes, plus tous les points deviennent équidistants les uns des autres. Les méthodes qui reposent sur une notion de proximité — k plus proches voisins, clustering, recherche par similarité — se dégradent silencieusement.

Réduire la dimension, c'est trouver un espace plus petit qui garde l'essentiel. La SVD dit exactement ce qu'« essentiel » veut dire.

## L'idée : une matrice est une pile de couches

Voici la façon de voir la SVD qu'on te donne rarement et qui rend tout le reste évident.

**Toute matrice est une somme de couches très simples, rangées de la plus importante à la plus négligeable.** Chaque couche est de rang 1 — un motif élémentaire — et porte un poids. La SVD calcule ces couches et ces poids.

```
A = σ₁·(couche 1) + σ₂·(couche 2) + σ₃·(couche 3) + ...
```

avec σ₁ ≥ σ₂ ≥ σ₃ ≥ ... ≥ 0. Les premières couches portent le gros de l'information, les dernières du détail, puis du bruit, puis rien.

Écrite sous forme matricielle, cette somme devient :

```
A = U Σ Vᵀ
```

- **U** (m × m) — les directions dans l'espace des lignes
- **Σ** (m × n) — diagonale, les poids σᵢ, par ordre décroissant
- **Vᵀ** (n × n) — les directions dans l'espace des colonnes

Les trois facteurs existent pour **n'importe quelle** matrice : carrée ou pas, inversible ou pas. C'est ce qui rend la SVD plus universelle que la diagonalisation.

### Un cas minuscule, pour attraper l'intuition

```
A = [[1, 2],
     [2, 4]]
```

La seconde ligne est exactement le double de la première. Cette matrice ne contient qu'**une** direction : son rang est 1. Sa SVD donnera σ₁ > 0 et **σ₂ = 0**. Une seule couche suffit à la reconstruire parfaitement, la seconde ne porte rien.

C'est tout le principe. Le nombre de valeurs singulières non nulles **est** le rang — autrement dit, le nombre de directions réellement indépendantes. Et quand une valeur singulière n'est pas nulle mais toute petite, c'est une direction qui existe à peine : on peut la jeter sans grand dommage.

## Tronquer, et pourquoi c'est optimal

Garder les k plus grandes valeurs singulières et oublier les autres s'appelle la **troncature de rang k**.

Ce qui rend l'opération remarquable, c'est que ce n'est pas une heuristique raisonnable parmi d'autres. Le **théorème d'Eckart-Young** dit que, parmi toutes les matrices de rang k possibles, celle-là est **la plus proche de A**. Il n'existe pas de meilleure approximation de rang k. On ne fait pas « un choix correct » : on fait le choix optimal, démontré.

L'erreur commise est d'ailleurs connue à l'avance : elle vaut exactement ce que pèsent les couches jetées. Si σ₄, σ₅… sont minuscules, l'approximation à k = 3 est excellente, et on le sait **avant** de la calculer, juste en regardant le spectre.

### Ce que ça économise

Une image en niveaux de gris de 512 × 512 pixels, c'est 262 144 nombres. Sa troncature à k couches en coûte :

```
k × (512 + 512 + 1)   →   k=50 : 51 250 nombres, soit 20 % de l'original
```

Et visuellement, à k = 50, une photo ordinaire est déjà très reconnaissable. Les premières couches captent les grandes formes et les aplats ; les suivantes affinent les contours ; les dernières, celles qu'on jette, encodent surtout le grain du capteur.

C'est l'exercice de cette leçon, alors je m'arrête là — c'est beaucoup plus parlant quand on le voit apparaître soi-même.

## La PCA est une SVD sur les données centrées

L'Analyse en Composantes Principales n'est pas une méthode cousine de la SVD. C'est la même opération, appliquée à la matrice des données après **centrage**.

### Pourquoi centrer

La PCA cherche les directions de **variance maximale** — celles le long desquelles les points s'étalent le plus. La variance se mesure autour de la moyenne. Sans soustraire la moyenne de chaque colonne, la première composante pointerait simplement vers le centre de gravité du nuage, ce qui n'apprend rien sur sa forme.

### Pourquoi standardiser aussi, presque toujours

Imagine deux colonnes : un salaire en euros, de 20 000 à 90 000, et une ancienneté en années, de 0 à 40. La variance du salaire est des millions de fois plus grande — non pas parce que l'information y est plus riche, mais parce que l'unité est plus petite.

La PCA, qui ne cherche que la variance, conclurait que la première composante est « le salaire » et ignorerait l'ancienneté. **La PCA n'est pas invariante par changement d'unité.** Standardiser chaque colonne — moyenne 0, écart-type 1 — remet les features sur un pied d'égalité.

Oublier cette étape est l'erreur n° 1 sur la PCA, et elle ne provoque aucune erreur : juste un résultat qui ne veut rien dire.

### Combien de composantes garder

Chaque composante capte une part de la variance totale. On regarde la **variance expliquée cumulée** et on choisit le k qui atteint un seuil, typiquement 90 % ou 95 %.

Tracée, cette courbe monte vite puis s'aplatit. Le point d'inflexion s'appelle le **coude**, et c'est souvent là qu'on coupe. Ce n'est pas une règle mathématique, c'est une lecture : avant le coude, chaque composante apporte ; après, on achète du bruit.

## Valeurs propres et vecteurs propres

Pour une matrice carrée, un vecteur propre est une direction que la transformation se contente d'**étirer**, sans la faire tourner :

```
A v = λ v
```

λ est le facteur d'étirement, la valeur propre. Toutes les autres directions sont déviées ; celles-là restent elles-mêmes.

Le lien avec ce qui précède : les composantes principales **sont** les vecteurs propres de la matrice de covariance des données, et leurs valeurs propres sont les variances capturées. La covariance étant symétrique, ses vecteurs propres sont orthogonaux entre eux — c'est pour ça que les composantes principales sont perpendiculaires, donc non redondantes par construction.

## Ce que la réduction coûte

Elle n'est pas gratuite, et on l'oublie souvent.

**L'interprétabilité disparaît.** La composante 1 n'est pas « le salaire », c'est un mélange pondéré de toutes les colonnes. Un modèle entraîné dessus ne peut plus dire « c'est l'ancienneté qui a joué ». Dans un contexte où il faut justifier une décision — un crédit, un diagnostic —, c'est rédhibitoire.

**C'est linéaire.** La PCA ne trouve que des directions droites. Des données enroulées en spirale lui échappent complètement. Pour la visualisation, t-SNE et UMAP font mieux — mais ce sont des outils de **visualisation**, pas de prétraitement : leurs sorties ne doivent pas servir de features.

**Et l'erreur de méthode qui ruine tout** : la PCA s'ajuste sur le jeu d'entraînement, puis **transforme** validation et test avec les paramètres déjà appris. Jamais `fit` sur l'ensemble des données : les moyennes et les directions calculées contiendraient de l'information venue du test. C'est une fuite, et elle gonfle le score sans qu'aucune erreur n'apparaisse. *Fit sur le train, transform partout.*

## Les recommandations, en passant

Une matrice utilisateurs × films, remplie de notes et surtout de trous. La décomposer, c'est écrire chaque utilisateur et chaque film comme un petit vecteur de **facteurs latents** — des dimensions que personne n'a nommées et qui ressemblent après coup à des genres, des ambiances, des époques.

La note prédite d'un utilisateur pour un film devient le produit scalaire de leurs deux vecteurs. On retrouve la leçon d'algèbre linéaire : mesurer un alignement. Et comme les vecteurs sont courts, la méthode prédit des notes pour des couples jamais observés — c'est exactement ce qu'on lui demande.

Attention : la SVD classique ne sait pas traiter les valeurs manquantes, et les remplacer par zéro revient à affirmer « cet utilisateur déteste ce film », ce qui est faux. Les vrais systèmes utilisent des variantes qui n'ajustent que sur les notes observées.

## Au clavier

```python
import numpy as np

A = np.array([[1., 2.],
              [2., 4.]])

U, sigma, Vt = np.linalg.svd(A, full_matrices=False)
print(sigma.round(6))          # la seconde valeur est nulle : rang 1
```

```python
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

X_train_std = StandardScaler().fit_transform(X_train)   # fit sur le train
pca = PCA().fit(X_train_std)
print(np.cumsum(pca.explained_variance_ratio_).round(3))
```

Trois réflexes :

1. **Regarde le spectre avant de choisir k.** `sigma` décroissante te dit tout : une chute brutale signale un rang effectif bas, une décroissance lente signale que l'information est étalée et que réduire coûtera cher.
2. **Standardise avant toute PCA**, sauf si tes colonnes sont déjà dans la même unité et que leurs écarts d'échelle sont porteurs de sens.
3. **Vérifie que la variance expliquée cumulée atteint bien ce que tu crois** avant d'entraîner quoi que ce soit dessus. Garder 2 composantes parce que c'est joli en graphique, alors qu'elles ne portent que 40 % de la variance, c'est jeter plus de la moitié de ses données sans le dire.
