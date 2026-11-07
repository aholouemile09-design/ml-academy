Les modèles linéaires sont les plus anciens et les plus utilisés du métier. Pas parce qu'ils sont les plus performants, mais parce qu'ils sont les seuls dont on puisse lire la décision ligne par ligne.

## Ce que « linéaire » suppose exactement

```
ŷ = w₁x₁ + w₂x₂ + ... + wₚxₚ + b
```

Cette écriture contient deux hypothèses, et une seule des deux est ce que la plupart des gens croient.

**L'additivité.** L'effet de chaque variable s'ajoute aux autres, indépendamment de leur valeur. Le modèle affirme que l'effet d'une année d'ancienneté sur le salaire est le même pour un junior et pour un cadre dirigeant. C'est l'hypothèse la plus souvent fausse, et la plus facile à lever.

**La linéarité en les paramètres**, et non en les variables. C'est la nuance qui surprend : rien n'interdit d'ajouter une colonne `x²` ou `log(x)`. Le modèle reste linéaire, parce qu'il reste linéaire en `w`. Un « modèle linéaire » peut donc représenter une parabole — à condition qu'on lui ait donné la colonne au carré.

### Le cas qui le met à genoux

Le XOR : deux variables, et la cible vaut 1 quand exactement une des deux est positive.

```python
X = rng.normal(size=(2000, 2))
y = ((X[:, 0] > 0) ^ (X[:, 1] > 0)).astype(int)
```

Aucune combinaison additive de `x₁` et `x₂` ne sépare ces points. Le modèle n'échoue pas un peu, il échoue complètement :

```
logistique sur x₁, x₂              →  0,447   (pire que le hasard)
logistique sur x₁, x₂, x₁·x₂       →  0,975
```

Une colonne de plus — le produit des deux — et le problème devient trivial. C'est toute la différence entre un modèle linéaire et un arbre : **l'arbre trouve les interactions tout seul, le linéaire les attend de toi.** Quand un boosting écrase largement ta régression logistique, la raison est presque toujours là, et elle te dit quoi faire : chercher quelles interactions lui manquent.

`PolynomialFeatures(degree=2, interaction_only=True)` génère toutes les paires d'un coup, au prix d'une explosion combinatoire que le module Feature Engineering détaille.

## La perte n'est pas un détail d'implémentation

Un modèle linéaire, c'est une forme plus une perte. Changer la perte change le modèle, même à forme identique.

### En régression : ce que le carré décide pour toi

La MSE élève l'erreur au carré. Une erreur de 10 pèse donc cent fois une erreur de 1 : le modèle accepte de se tromper souvent un peu pour éviter de se tromper rarement beaucoup.

Une seule valeur aberrante sur soixante, placée au bord du domaine, suffit à le montrer :

```
                             MSE               MAE (médiane)
sans aberrante           pente = 2,027         pente = 2,029
avec 1 aberrante         pente = 2,588         pente = 2,032
```

La MSE tord la droite de 28 % pour une ligne sur soixante. La MAE ne bouge pas de trois millièmes.

| Perte | Ce qu'elle estime | À choisir quand |
|---|---|---|
| MSE | la moyenne conditionnelle | les grosses erreurs coûtent disproportionnellement cher |
| MAE | la médiane conditionnelle | des valeurs aberrantes existent et sont légitimes |
| Huber | compromis des deux | on veut la MSE sans l'exposition aux aberrantes |
| Quantile | un quantile choisi | on veut une borne, pas un centre (stocks, capacité) |

Ce tableau est une décision métier déguisée en paramètre. Prédire un délai de livraison avec une MAE revient à annoncer « une fois sur deux ce sera moins » ; avec une perte quantile à 0,9, « neuf fois sur dix ce sera moins ». Ce n'est pas le même produit.

### En classification : pourquoi pas la MSE

La régression logistique passe la sortie linéaire dans une sigmoïde, puis mesure l'écart à l'étiquette par l'**entropie croisée** :

```
P(y=1|x) = σ(z),   z = w·x + b,   σ(z) = 1/(1+e⁻ᶻ)
perte = −[ y·log σ(z) + (1−y)·log(1−σ(z)) ]
```

Pourquoi pas simplement `(σ(z) − y)²` ? La réponse est dans la dérivée. En dérivant par rapport à `z` :

```
gradient de la MSE      :  2(σ(z) − y) · σ(z)(1 − σ(z))
gradient de la log loss :     σ(z) − y
```

Le facteur `σ(1−σ)` de la MSE s'écrase dès que la prédiction est confiante. Or une prédiction *confiante et fausse* est exactement le cas qu'il faut corriger le plus vite. Pour une vraie étiquette de 1 :

| `σ(z)` prédit | gradient MSE | gradient log loss | rapport |
|---|---|---|---|
| 0,500 | 2,5·10⁻¹ | 0,500 | 2 |
| 0,018 | 3,5·10⁻² | 0,982 | 28 |
| 0,0025 | 4,9·10⁻³ | 0,998 | 203 |
| 0,00034 | 6,7·10⁻⁴ | 1,000 | 1 492 |

Au pire de l'erreur, le gradient de la MSE est **mille cinq cents fois plus faible**. L'apprentissage s'arrête précisément là où il devrait s'accélérer. La log loss annule un des deux facteurs sigmoïdes, et son gradient reste proportionnel à l'erreur.

La même algèbre explique le choix de la perte dans tout le reste du ML : chaque perte usuelle est construite pour que son gradient reste utilisable.

## La logistique n'a pas de solution analytique

La régression linéaire a une formule fermée. On annule la dérivée de la MSE et on résout :

```
w = (XᵀX)⁻¹ Xᵀ y          l'équation normale
```

Un seul calcul, pas d'itération, pas de taux d'apprentissage. `LinearRegression` de scikit-learn ne fait rien d'autre (via une décomposition plus stable que l'inverse explicite).

La logistique, non. Annuler la dérivée de l'entropie croisée donne un système sans solution explicite, et il faut **itérer** — descente de gradient, Newton, L-BFGS selon le `solver`. D'où un paramètre qu'on voit partout sans savoir ce qu'il fait :

```
max_iter=   10   →  test = 0,9649   ConvergenceWarning
max_iter=   50   →  test = 0,9825   —
max_iter= 5000   →  test = 0,9825   —
```

`ConvergenceWarning` n'est pas cosmétique : il annonce que l'optimisation s'est arrêtée avant d'avoir trouvé le minimum. Le modèle fonctionne, il est juste moins bon que ce qu'il pouvait être — ici un point et demi perdu, sans aucune erreur apparente.

Deux causes à traiter dans cet ordre : des variables non normalisées (de loin la plus fréquente), puis un `max_iter` trop bas. Augmenter `max_iter` sans normaliser, c'est payer en temps de calcul ce qu'une standardisation réglerait gratuitement.

## Lire un coefficient logistique sans se tromper

C'est l'erreur de lecture la plus répandue du ML appliqué. En régression linéaire, un coefficient de 2 500 se lit « 2 500 € de plus par unité ». Direct.

En logistique, le coefficient agit **sur le logarithme des cotes**, pas sur la probabilité :

```
log( p / (1−p) ) = w·x + b
```

`p/(1−p)` est la **cote** : 0,8 de probabilité donne une cote de 4, soit « quatre fois plus de chances que le contraire ». Le coefficient dit de combien le *logarithme* de cette cote bouge. Pour revenir à quelque chose d'interprétable, on l'exponentie :

```
exp(w) = facteur multiplicatif de la cote, par unité de la variable
```

Sur le jeu du cancer du sein, après standardisation :

| Variable | Coefficient | exp(coef) |
|---|---|---|
| worst texture | −1,255 | 0,285 |
| worst concave points | −0,954 | 0,385 |
| mean texture | −0,553 | 0,575 |

Un écart-type de plus sur `worst texture` multiplie la cote de la classe 1 par 0,285 — donc la divise par 3,5. C'est une phrase qu'on peut dire à un médecin.

**Et la phrase à ne jamais dire** : « ça fait baisser la probabilité de 28,5 % ». Le même coefficient produit un effet énorme sur la probabilité quand on part de 0,5, et presque nul quand on part de 0,99. L'effet multiplicatif est constant sur la cote, jamais sur la probabilité. Les deux ne se confondent que lorsque les probabilités sont faibles.

## Les poids de classe

Sur des données déséquilibrées, la perte est dominée par la classe majoritaire : avec 3 % de positifs, ignorer complètement les positifs coûte peu. `class_weight="balanced"` pondère chaque classe à l'inverse de sa fréquence, ce qui revient à dire à la perte qu'une erreur sur un positif coûte trente-trois fois une erreur sur un négatif.

Sur 20 000 lignes à 3 % de positifs :

```
class_weight=None        rappel = 0,580   précision = 0,952   accuracy = 0,985
class_weight="balanced"  rappel = 0,787   précision = 0,236   accuracy = 0,904
```

Le rappel gagne vingt points, la précision en perd soixante-dix. **Ce n'est pas une amélioration, c'est un déplacement le long du même compromis** — et c'est important de le voir, parce que `class_weight="balanced"` est souvent présenté comme un correctif gratuit du déséquilibre. Il ne corrige rien : il impose un arbitrage, celui où les deux classes ont la même valeur. Si ce n'est pas ton arbitrage, c'est le seuil de décision qu'il faut régler, et c'est l'objet de la leçon sur l'évaluation.

## Plus de deux classes

Deux stratégies, et scikit-learn choisit pour toi sans le dire.

**Un contre tous** : un classifieur binaire par classe, « celle-ci ou les autres », et on garde le score le plus élevé. Simple, parallélisable, mais les scores viennent de modèles entraînés séparément et ne sont pas comparables entre eux de façon rigoureuse.

**Multinomiale** (softmax) : un seul modèle, une sortie par classe, normalisées pour sommer à 1 par la fonction softmax. C'est la généralisation propre de la logistique, et c'est désormais le comportement de `LogisticRegression` — l'ancien paramètre `multi_class`, qui permettait de choisir, a été retiré de scikit-learn.

```
softmax(z)ₖ = e^(zₖ) / Σⱼ e^(zⱼ)
```

La différence pratique : la multinomiale donne des probabilités cohérentes, l'un-contre-tous donne des scores qu'il faut renormaliser à la main. Pour des probabilités qu'on exploite ensuite — un seuil, un coût, un classement —, la multinomiale est le bon défaut.

## Au clavier

```python
import numpy as np, pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

d = load_breast_cancer(as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(d.data, d.target, test_size=.2,
                                          random_state=42, stratify=d.target)

pipe = make_pipeline(StandardScaler(),
                     LogisticRegression(max_iter=5000)).fit(X_tr, y_tr)

coefs = pd.Series(pipe[-1].coef_[0], index=d.data.columns)
table = pd.DataFrame({
    "coefficient": coefs.round(3),
    "cote ×":      np.exp(coefs).round(3),
}).sort_values("coefficient")

print(table.head(5))      # les cinq qui font le plus baisser la cote
print(table.tail(5))      # les cinq qui la font le plus monter
```

Prends la variable la plus négative et écris la phrase complète : « un écart-type de plus sur *X* divise la cote de la classe 1 par *N* ». Si tu n'arrives pas à l'écrire sans dire « la probabilité baisse de tant de pourcent », relis la section sur les cotes.
