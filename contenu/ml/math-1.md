Un modèle de machine learning ne sait pas ce qu'est une image, un mot ou un client. Il ne manipule que des nombres rangés en listes et en grilles. Toute la discipline consiste à transformer le monde en vecteurs, puis à faire de la géométrie dessus.

## Pourquoi tout devient un vecteur

Une image en niveaux de gris de 28 × 28 pixels, c'est 784 nombres. Un mot passé dans un modèle de langage devient une liste de 768 nombres. Un client, c'est son âge, son ancienneté, son panier moyen — trois nombres.

L'intérêt n'est pas le rangement. C'est que, une fois tout exprimé en nombres, **« se ressembler » devient « être proche »**. La similarité, une notion floue et humaine, devient une distance, qu'on calcule. C'est le pari central du ML, et il explique pourquoi l'algèbre linéaire est le langage du domaine plutôt qu'un prérequis administratif.

## Le vecteur : deux lectures du même objet

```
v = [3, 4]
```

**Lecture 1, une liste de nombres.** Deux coordonnées, deux *features*. C'est la lecture du programmeur.

**Lecture 2, une flèche.** Une flèche qui part de l'origine et arrive au point (3, 4). Elle a une **direction** et une **longueur**. C'est la lecture du géomètre.

Garde les deux en tête en permanence. La première te dit quoi coder, la seconde te dit ce que le calcul signifie. Quand un résultat te surprend, c'est presque toujours la lecture géométrique qui explique pourquoi.

Les deux opérations de base se lisent dans les deux langues :

```
[3, 4] + [1, 2] = [4, 6]      mettre les deux flèches bout à bout
2 · [3, 4]      = [6, 8]      doubler la longueur, garder la direction
```

Multiplier par un scalaire ne change **jamais** la direction (sauf si le scalaire est négatif : la flèche se retourne). Cette remarque anodine est le cœur de la similarité cosinus, trois sections plus bas.

## La norme : la longueur d'un vecteur

```
||v|| = √(v₁² + v₂² + ... + vₙ²)
```

C'est Pythagore, en autant de dimensions qu'on veut. Pour `[3, 4]`, la norme vaut `√(9 + 16) = 5`.

Celle-ci s'appelle la norme **L2**, ou euclidienne. Il existe aussi la norme **L1**, la somme des valeurs absolues — pour `[3, 4]`, elle vaut 7. Les deux reviendront en régularisation : L2 écrase doucement tous les poids, L1 en met beaucoup exactement à zéro, ce qui sélectionne les features. Retiens simplement que ce sont deux façons de mesurer « à quel point ce vecteur est gros ».

**Normaliser** un vecteur, c'est le diviser par sa norme pour obtenir une longueur de 1. On garde la direction, on jette l'échelle :

```
v / ||v|| = [3/5, 4/5] = [0.6, 0.8]
```

Geste très fréquent, parce que très souvent l'information est dans la direction et pas dans la taille.

## Le produit scalaire

L'opération la plus importante de toute la leçon.

```
a · b = Σ aᵢbᵢ = a₁b₁ + a₂b₂ + ... + aₙbₙ
```

Un vecteur fois un vecteur, et le résultat est **un seul nombre**, pas un vecteur. Pour `[1, 2, 3] · [4, 5, 6]` : `4 + 10 + 18 = 32`.

Son sens géométrique est tout l'intérêt :

```
a · b = ||a|| · ||b|| · cos(θ)
```

où θ est l'angle entre les deux flèches. D'où une lecture du **signe** qu'il faut connaître par cœur :

- `a · b > 0` → angle aigu, les vecteurs pointent globalement dans le même sens
- `a · b = 0` → angle droit, les vecteurs sont **orthogonaux**, sans rien en commun
- `a · b < 0` → angle obtus, ils pointent en sens opposés

Le produit scalaire est donc un **détecteur d'alignement**. C'est pour cette raison qu'un neurone calcule un produit scalaire entre ses entrées et ses poids : il mesure à quel point l'entrée ressemble au motif que le poids a appris à reconnaître.

### Pourquoi le cosinus plutôt que le produit scalaire brut

Deux documents parlant exactement du même sujet, l'un de 200 mots et l'autre de 20 000, ont des vecteurs de même direction mais de longueurs très différentes. Leur produit scalaire sera énorme simplement parce que le second document est long.

En isolant le cosinus, on supprime l'effet des longueurs :

```
cos(θ) = (a · b) / (||a|| · ||b||)
```

Le résultat vit entre −1 et 1 : 1 pour la même direction, 0 pour l'orthogonalité, −1 pour l'opposé. C'est la **similarité cosinus**, et c'est ce que calcule un moteur de recherche sémantique pour classer des documents face à une requête. Tu vas l'écrire toi-même en exercice.

## Les matrices

Une matrice est une grille de nombres — et, comme le vecteur, elle a deux lectures.

**Un tableau de données.** C'est la lecture quotidienne : un jeu de données de 1 000 clients décrits par 5 features est une matrice (1 000 × 5). **Convention à ne jamais perdre : les lignes sont les exemples, les colonnes sont les features.** Toutes les bibliothèques ML la supposent.

**Une transformation.** Une matrice prend un vecteur et en rend un autre — elle fait tourner, étire, projette, écrase l'espace. C'est cette lecture-là qui explique ce qu'une couche de réseau de neurones fabrique réellement.

### Le produit matriciel

```
(m × n) · (n × p) = (m × p)
```

Regarde bien : les deux dimensions **du milieu doivent être égales**, elles s'annulent, et il reste celles de l'extérieur. Une matrice (3 × 4) peut multiplier une (4 × 2) et donne une (3 × 2). Elle ne peut pas multiplier une (2 × 4) : 4 et 2 ne coïncident pas.

La case (i, j) du résultat est le **produit scalaire de la ligne i** de la première matrice **par la colonne j** de la seconde. Le produit matriciel n'est rien d'autre que beaucoup de produits scalaires rangés dans une grille.

Deux faits qui comptent :

**Il n'est pas commutatif.** `AB` et `BA` ne sont pas la même chose, et bien souvent l'un des deux n'a même pas de sens dimensionnel. En géométrie c'est évident : tourner puis étirer ne donne pas le même résultat qu'étirer puis tourner.

**L'erreur de dimensions est l'erreur la plus fréquente du débutant en ML.** Un message du type `shapes (64,10) and (64,10) not aligned` ne veut pas dire que ton algorithme est faux : il dit que 10 et 64 ne se touchent pas. Lis-le comme une équation à vérifier, pas comme un échec mystérieux. Le réflexe qui règle 90 % des cas : afficher les `.shape` avant la ligne qui plante.

### Y = XW + b

C'est une couche de réseau de neurones, en entier.

```
X (n × d)    les n exemples, d features chacun
W (d × k)    les poids appris, d entrées vers k sorties
XW (n × k)   les n exemples, k sorties chacun
b (k)        le biais, ajouté à chaque ligne
```

Les dimensions racontent l'histoire : `W` est la machine qui transforme un espace à d dimensions en un espace à k dimensions, et `X` passe ses n exemples dedans d'un coup. Entraîner le réseau, c'est chercher les nombres de `W` et `b`.

### La transposée

`Aᵀ` échange lignes et colonnes : une (3 × 4) devient une (4 × 3). Son usage le plus courant est très prosaïque — retourner une matrice pour que les dimensions s'alignent enfin. `XᵀX`, qui apparaît partout en régression linéaire, est un exemple : `X` est (n × d), `Xᵀ` est (d × n), le produit est (d × d) quel que soit le nombre d'exemples.

## Le broadcasting, ou pourquoi numpy accepte parfois l'impossible

```python
import numpy as np

X = np.array([[1, 2, 3],
              [4, 5, 6]])      # (2, 3)
b = np.array([10, 20, 30])     # (3,)

X + b                          # marche : [[11, 22, 33], [14, 25, 36]]
```

Additionner une (2 × 3) et un vecteur de 3 ne devrait pas marcher. numpy **étire** silencieusement le petit sur le grand : `b` est appliqué à chaque ligne. C'est le *broadcasting*, et c'est exactement ce dont on a besoin pour ajouter un biais.

C'est commode et c'est dangereux, parce que le jour où ta forme est fausse, numpy ne proteste pas toujours — il étire et rend un résultat silencieusement absurde. D'où la discipline : affiche tes `.shape`.

Le piège numpy le plus coûteux tient dans une virgule :

```python
a = np.array([1, 2, 3])        # (3,)   — un vecteur 1D
b = np.array([[1], [2], [3]])  # (3, 1) — une matrice colonne
a + b                          # (3, 3) !  pas ce que tu voulais
```

`(3,)` et `(3, 1)` ne sont pas la même chose, et leur addition produit une matrice 3 × 3 par broadcasting. Beaucoup de bugs silencieux en ML viennent de là.

## Rang et inversibilité

Le **rang** d'une matrice est le nombre de directions réellement indépendantes qu'elle contient. Une matrice (100 × 5) dont la cinquième colonne est le double de la deuxième n'a que 4 directions utiles : son rang est 4, pas 5.

En ML, c'est un diagnostic. Deux features parfaitement corrélées — la taille en centimètres et la taille en pouces — n'apportent pas deux informations, mais une seule écrite deux fois. La matrice devient **singulière**, c'est-à-dire non inversible, et une régression linéaire classique ne peut plus être résolue : elle a une infinité de solutions équivalentes, donc aucune raison d'en choisir une.

C'est la raison mathématique de deux choses que tu croiseras partout : on retire les colonnes redondantes, et on **régularise** pour que le problème redevienne soluble même quand les features sont presque colinéaires.

Les **valeurs propres**, enfin, répondent à : quelles directions cette transformation se contente d'étirer, sans les faire tourner ? Ce sont les axes naturels de la matrice. La PCA consiste exactement à trouver ces axes dans la matrice de covariance des données et à ne garder que les plus étirés. Ce sera la leçon sur la SVD.

## Au clavier

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a @ b                 # 32  — produit scalaire, l'opérateur @
np.linalg.norm(a)     # 3.741...
A = np.random.randn(3, 4)
A.T.shape             # (4, 3)
A @ np.random.randn(4, 2)   # (3, 2)
```

L'opérateur `@` est le produit matriciel. N'utilise pas `*` pour ça : `*` fait une multiplication **terme à terme**, ce qui est une opération complètement différente et ne lèvera aucune erreur si les formes sont compatibles.

Trois gestes à prendre tout de suite :

1. Avant toute multiplication, écris les deux formes à côté et vérifie que les dimensions du milieu coïncident. À la main, sur papier, au début.
2. Quand une erreur de forme tombe, affiche les `.shape` plutôt que de modifier au hasard. Le message te donne déjà les deux nombres qui ne se touchent pas.
3. Calcule un produit scalaire de deux vecteurs de taille 3 **à la main**, puis vérifie avec numpy. Les deux doivent coïncider. C'est bête et c'est le seul moyen de savoir que tu as compris l'opération plutôt que la syntaxe.
