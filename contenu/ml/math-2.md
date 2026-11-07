Un modèle qui « apprend », c'est un modèle qui corrige ses paramètres pour se tromper un peu moins à chaque passage. Tout le mécanisme tient dans une seule question : dans quelle direction bouger ? La dérivée y répond, et la descente de gradient en fait un algorithme.

## Apprendre, c'est minimiser

Pose les trois pièces :

- **Des paramètres**, notés θ — les poids du modèle, les nombres qu'on a le droit de changer.
- **Une fonction de coût** L(θ) — un seul nombre qui dit à quel point le modèle se trompe sur les données. Plus c'est bas, mieux c'est.
- **Un algorithme** qui cherche les θ rendant L(θ) minimal.

C'est tout l'apprentissage supervisé. Le modèle, la donnée, l'architecture sont des détails d'implémentation autour de ces trois lignes.

Le problème, c'est que θ peut contenir des millions de nombres. On ne peut pas essayer toutes les combinaisons, ni résoudre l'équation à la main. Il faut une méthode qui, depuis un point quelconque, sache dans quelle direction descendre.

## La dérivée : une pente

La dérivée f′(x) est la **pente** de la fonction au point x : de combien f monte quand x avance d'un tout petit peu.

```
f(x) = x²       f′(x) = 2x
```

En x = 3, la pente vaut 6 : la fonction monte fort. En x = −3, elle vaut −6 : elle descend fort. En x = 0, elle vaut 0 : c'est plat, c'est le minimum.

Deux lectures à retenir, et elles suffisent :

- Le **signe** dit de quel côté ça monte. Pente positive → la fonction monte vers la droite, donc pour descendre il faut aller à **gauche**.
- La **valeur absolue** dit à quelle vitesse. Une grosse pente, c'est une forte montée ; une pente proche de zéro, c'est un terrain plat.

D'où la règle qui fonde tout le reste : **pour descendre, va dans le sens opposé à la pente.**

## Le gradient

Avec plusieurs paramètres, la fonction n'a plus une pente mais une pente par direction. On range ces pentes dans un vecteur, et ce vecteur s'appelle le **gradient** :

```
∇L(θ) = [ ∂L/∂θ₁ , ∂L/∂θ₂ , ... , ∂L/∂θₙ ]
```

Chaque ∂L/∂θᵢ est une **dérivée partielle** : de combien le coût change si on bouge θᵢ **tout seul**, les autres restant figés.

Le gradient a une propriété géométrique remarquable, et c'est elle qui rend l'algorithme possible : **il pointe vers la direction de plus forte montée**. Pas une montée parmi d'autres — la plus raide de toutes.

L'image : tu es sur une colline dans le brouillard. Tu ne vois pas le paysage, mais tu sens sous tes pieds de quel côté ça monte le plus. Le gradient, c'est cette sensation. Pour redescendre, tu fais un pas exactement à l'opposé.

```
θ ← θ − α ∇L(θ)
```

Voilà la **descente de gradient**, en une ligne. Le signe moins, c'est « à l'opposé de la montée ». Cette ligne entraîne la quasi-totalité des modèles modernes, du plus petit régresseur au plus gros modèle de langage.

## Le pas : α, le learning rate

α est la taille du pas. C'est l'hyperparamètre le plus sensible du ML, et le premier à suspecter quand un entraînement se comporte mal.

**Trop grand** : on saute par-dessus le minimum, on atterrit plus haut de l'autre côté, on resaute. Le coût oscille ou part à l'infini. Symptôme typique : une *loss* qui monte, ou qui devient `NaN` après quelques itérations.

**Trop petit** : on descend, mais par pas minuscules. L'entraînement n'est pas faux, il est interminable — et peut s'arrêter avant d'être arrivé, ce qui ressemble à s'y méprendre à un modèle qui « ne marche pas ».

Remarque un effet élégant : près du minimum, la pente diminue, donc `α ∇L` diminue aussi. **Les pas se raccourcissent tout seuls** à l'approche du but, sans qu'on ait rien à programmer.

### Un pas, à la main

Prends la plus simple des fonctions de coût, sur un seul poids w : on veut que le modèle prédise 5 à partir d'une entrée valant 1.

```
L(w) = (w − 5)²        L′(w) = 2(w − 5)
```

Départ à w = 0, avec α = 0.1 :

```
w = 0    L′ = 2(0 − 5) = −10    w ← 0 − 0.1 × (−10) = 1.0
w = 1    L′ = 2(1 − 5) = −8     w ← 1 − 0.1 × (−8)  = 1.8
w = 1.8  L′ = 2(1.8 − 5) = −6.4 w ← 1.8 + 0.64      = 2.44
```

0 → 1 → 1.8 → 2.44… Le poids se rapproche de 5, et les pas rétrécissent. Refais ces trois lignes sur papier : c'est le seul moment de ta formation où tu verras l'algorithme en entier d'un coup d'œil.

Essaie ensuite avec α = 1.1 et regarde ce qui se passe. Tu comprendras la divergence mieux qu'avec n'importe quelle explication.

## Quand ça ne marche pas

La descente de gradient ne garantit pas de trouver **le** minimum. Elle garantit de descendre.

Si la fonction est **convexe** — une seule cuvette, comme la régression linéaire ou la régression logistique —, il n'y a qu'un minimum et on y arrive. C'est confortable et c'est rare.

Une fonction de coût de réseau de neurones ne l'est pas du tout. Son paysage comporte :

- des **minima locaux** : une cuvette qui n'est pas la plus basse ;
- des **points selles** : plat dans une direction, montant dans une autre, descendant dans une troisième. Le gradient y est presque nul, l'entraînement semble bloqué.

Contre-intuition utile : en grande dimension, les minima locaux sont **beaucoup moins problématiques** qu'on ne le dit. Pour qu'un point soit un vrai minimum local, il faut que ça remonte dans **toutes** les directions à la fois — avec un million de paramètres, c'est improbable. Les points selles, eux, sont partout. C'est contre eux que les optimiseurs modernes sont conçus.

Et une bonne nouvelle pratique : en ML, on ne cherche pas le minimum absolu. Un minimum local qui généralise bien sur des données jamais vues vaut mieux qu'un minimum global qui a appris le bruit du jeu d'entraînement par cœur.

## La règle de la chaîne

Pour dériver une fonction composée, les dérivées se **multiplient** :

```
(f∘g)′(x) = f′(g(x)) · g′(x)
```

En mots : la sensibilité totale est le produit des sensibilités de chaque étage. Si un engrenage tourne 3 fois plus vite qu'un autre, lui-même 2 fois plus vite qu'un troisième, le rapport total est 6.

C'est l'outil qui rend les réseaux profonds entraînables, parce qu'un réseau **est** une composition de fonctions : chaque couche prend la sortie de la précédente.

## La rétropropagation

Un passage d'entraînement comporte deux temps.

**La passe avant** : la donnée traverse les couches, on obtient une prédiction, on calcule le coût. On garde au passage les valeurs intermédiaires de chaque couche — on va en avoir besoin.

**La passe arrière** : on part du coût et on remonte couche par couche, en multipliant les dérivées selon la règle de la chaîne. À chaque étage, on récupère le gradient par rapport aux poids de cet étage-là.

Ce qui rend la méthode efficace, c'est qu'on ne recalcule rien. Le gradient de la couche 3 réutilise le résultat déjà calculé pour la couche 4. Sans cette réutilisation, entraîner un réseau coûterait un calcul complet par paramètre — autrement dit, ce serait impossible.

Deux pathologies découlent directement du produit de la règle de la chaîne :

- Si les dérivées de chaque couche sont inférieures à 1, leur produit sur trente couches tend vers zéro. Les premières couches ne reçoivent plus de signal : c'est le **gradient qui s'évanouit**. C'est pour ça qu'on a abandonné la sigmoïde au profit de ReLU, et inventé les connexions résiduelles.
- Si elles sont supérieures à 1, le produit explose. C'est le **gradient qui explose**, et on le traite en le tronquant — le *gradient clipping*.

Ces deux problèmes ne sont pas des accidents d'implémentation. Ce sont les conséquences arithmétiques d'une multiplication répétée, et c'est pour ça que les comprendre ici te dispensera de les redécouvrir en deep learning.

## Batch, stochastique, mini-batch

Pour calculer ∇L, il faut parcourir des données. Lesquelles ?

- **Batch** : tout le jeu de données à chaque pas. Gradient exact, trajectoire lisse, et inutilisable dès que les données sont grosses.
- **Stochastique (SGD)** : un seul exemple à la fois. Très rapide, très bruité — la trajectoire zigzague.
- **Mini-batch** : 32, 64, 256 exemples. C'est ce qu'on fait en pratique, toujours.

Le bruit du mini-batch n'est pas qu'un compromis subi : il **aide**. Un gradient légèrement faux secoue l'optimisation et lui permet de sortir des points selles et des cuvettes médiocres où un gradient exact resterait coincé.

Au-dessus de SGD, les optimiseurs modernes ajoutent de la mémoire. Le **momentum** accumule les pas précédents, comme une bille qui prend de l'élan et traverse les petits creux. **Adam** y ajoute un pas adapté à chaque paramètre individuellement. C'est le défaut raisonnable aujourd'hui ; ça ne dispense pas de régler α.

## Au clavier

```python
import numpy as np

# Le gradient de L(w) = (w - 5)², calculé à la main
grad = lambda w: 2 * (w - 5)

w, alpha = 0.0, 0.1
for i in range(5):
    w = w - alpha * grad(w)
    print(f"pas {i+1} : w = {w:.4f}")
```

Trois gestes utiles :

1. Fais tourner cette boucle, puis remplace α par `1.1`. Observe la divergence au lieu de la lire.
2. **Trace la courbe du coût** à chaque itération dès que tu entraînes quoi que ce soit. Une *loss* qui remonte, qui plafonne ou qui devient `NaN` se diagnostique en un coup d'œil sur un graphique, et en une heure sans.
3. Pour vérifier un gradient écrit à la main, compare-le à une approximation numérique : `(L(w + ε) − L(w − ε)) / (2ε)` avec ε petit, de l'ordre de 1e-5. Les deux doivent coïncider sur plusieurs décimales. C'est le *gradient checking*, et c'est le seul moyen sûr de savoir que ta dérivée est juste.
