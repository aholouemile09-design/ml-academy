Un modèle sans protocole d'évaluation n'est pas un modèle, c'est une opinion. Cette leçon porte sur les deux choses qui font qu'un chiffre veut dire quelque chose : la métrique qu'on choisit, et la façon dont on la mesure.

## L'AUC, dite exactement

On entend « l'AUC mesure la qualité du classement ». C'est vrai mais vague, et la définition exacte est plus utile :

> **L'AUC est la probabilité qu'un positif tiré au hasard reçoive un score plus élevé qu'un négatif tiré au hasard.**

Ce n'est pas une analogie, c'est l'égalité. Vérifiable en tirant les paires soi-même :

```python
pos, neg = proba[y_test == 1], proba[y_test == 0]
tirages = (rng.choice(pos, 200_000) > rng.choice(neg, 200_000)).mean()

# roc_auc_score = 0,9224      tirages = 0,9226
```

Trois conséquences se lisent directement dans cette définition.

**0,5 est le hasard**, puisque c'est la probabilité qu'une pièce tombe du bon côté. Une AUC de 0,5 ne signifie pas « modèle médiocre », elle signifie « aucune information ». Et une AUC *inférieure* à 0,5 signifie que le modèle a raison à l'envers — ce qui arrive, et presque toujours à cause d'un signe inversé dans le code.

**L'AUC ne dépend que de l'ordre.** Multiplie toutes les probabilités par 0,1 : l'AUC ne bouge pas d'un millième. Elle est donc totalement aveugle à la justesse des valeurs, ce qui est exactement le sujet de la section suivante.

**L'AUC ne dit rien du seuil.** Elle intègre tous les seuils possibles d'un coup. C'est sa force quand on compare des modèles sans vouloir choisir, et sa limite dès qu'il faut décider : un modèle à 0,93 d'AUC peut être inutilisable si aucun seuil ne donne un compromis acceptable.

## La calibration : une probabilité de 0,8 doit arriver 80 % du temps

Un modèle est **calibré** si, parmi toutes les lignes auxquelles il attribue 0,8, environ 80 % sont effectivement positives. C'est une propriété différente de la discrimination, et un modèle peut exceller à l'une en échouant à l'autre.

Sur une forêt aléatoire de profondeur 6, en regroupant les prédictions par tranches :

| Probabilité annoncée | Fréquence observée |
|---|---|
| 0,08 | 0,04 |
| 0,26 | 0,22 |
| 0,50 | 0,61 |
| 0,72 | 0,89 |
| 0,87 | 0,99 |

Le modèle est **systématiquement trop prudent** : quand il dit 0,87, il arrive 0,99. C'est la signature des méthodes d'ensemble, pour la raison vue à la leçon précédente — une moyenne de votes est tassée vers le centre.

### Ce que la calibration change, et ce qu'elle ne change pas

```
forêt brute     AUC = 0,9577      Brier = 0,0612
forêt calibrée  AUC = 0,9576      Brier = 0,0556
```

**L'AUC ne bouge pas** — un millième, du bruit. Normal : la calibration est une transformation monotone des scores, elle ne change aucun ordre. Le **score de Brier**, lui, s'améliore de 9 %.

Le score de Brier est simplement l'erreur quadratique moyenne sur les probabilités :

```
Brier = (1/n) Σ (pᵢ − yᵢ)²
```

C'est la métrique à regarder quand la valeur de la probabilité compte, parce qu'elle pénalise à la fois le mauvais classement et la mauvaise calibration. L'AUC ne voit que le premier.

### Comment calibrer

```python
from sklearn.calibration import CalibratedClassifierCV, calibration_curve

calibre = CalibratedClassifierCV(modele, method="isotonic", cv=5).fit(X_tr, y_tr)

frequences, annonces = calibration_curve(y_te, proba, n_bins=10)
```

Deux méthodes. `sigmoid` (dite de Platt) ajuste une sigmoïde à deux paramètres : robuste, peu gourmande en données, mais incapable de corriger une déformation qui n'a pas cette forme. `isotonic` ajuste une fonction croissante quelconque : plus souple, et elle surapprend si les données sont peu nombreuses — compte un millier d'exemples au minimum.

Dans les deux cas la calibration **s'ajuste par validation croisée interne**, sur des prédictions que le modèle n'a pas vues à l'entraînement. Calibrer sur les prédictions d'entraînement apprend à corriger le surapprentissage et produit une courbe parfaite qui ne vaut rien.

### Quand s'en soucier

Jamais, si tu n'exploites que `predict`. Toujours, dans ces quatre cas :

- un seuil issu d'un raisonnement de coût — le calcul suppose que les probabilités sont vraies
- une probabilité affichée à un utilisateur ou transmise à un autre service
- une espérance calculée à partir du score (`probabilité × montant`)
- la comparaison de modèles de familles différentes, dont les scores ne sont pas sur la même échelle

Les modèles bien calibrés par construction sont la régression logistique et, dans une moindre mesure, le boosting entraîné avec la log loss. Les forêts, les SVM et les k plus proches voisins ne le sont pas.

## La moyenne de validation croisée cache sa dispersion

Un score de validation croisée se rapporte en deux nombres, pas un.

```
logistique, 10 plis :  0,9102 ± 0,0057      pire pli 0,8975   meilleur 0,9190
```

La moyenne paraît stable à quatre décimales. Entre les plis, l'écart atteint **2,2 points**. Autrement dit, selon la partie des données sur laquelle on l'évalue, le même modèle vaut entre 0,897 et 0,919.

Deux usages immédiats :

**Comparer deux modèles.** Un écart de moyennes inférieur à la dispersion n'est pas un écart. Si A fait 0,912 ± 0,006 et B 0,908 ± 0,006, A n'est pas meilleur que B — il faut un test apparié sur les mêmes plis, comme le module Mathématiques l'établit.

**Repérer une hétérogénéité.** Un écart-type anormalement grand signale souvent que les plis ne sont pas comparables : une classe rare mal répartie, des groupes qui se chevauchent, une structure temporelle ignorée. C'est un diagnostic, pas du bruit.

```python
scores = cross_val_score(modele, X, y, cv=10, scoring="roc_auc")
print(f"{scores.mean():.4f} ± {scores.std():.4f}")
print("par pli :", scores.round(3))
```

Rapporter la moyenne seule est la façon la plus courante de présenter un résultat plus solide qu'il n'est.

## Choisir son découpage, et son k

`cross_val_score(modele, X, y, cv=5)` fait un choix par défaut à ta place. Les variantes ne sont pas interchangeables.

| Classe | À utiliser quand |
|---|---|
| `KFold` | les lignes sont indépendantes et la cible continue |
| `StratifiedKFold` | classification — conserve les proportions dans chaque pli |
| `GroupKFold` | des lignes partagent un individu (patient, client, session) |
| `TimeSeriesSplit` | les données sont datées et on prédit l'avenir |
| `RepeatedStratifiedKFold` | on veut une estimation plus fine du score et de sa dispersion |
| `LeaveOneOut` | très peu de données, et on accepte le coût |

En classification, `cross_val_score` applique déjà `StratifiedKFold`. Pour les trois autres situations, le défaut est faux et personne ne te le signalera.

**Et le choix de k est un compromis** :

- **k petit** (3) : chaque modèle s'entraîne sur peu de données, donc chaque score est pessimiste — le biais de l'estimation est élevé. Rapide.
- **k grand** (20, ou LeaveOneOut) : chaque modèle s'entraîne sur presque tout, donc le biais disparaît, mais les k modèles sont presque identiques entre eux, et la variance de l'estimation augmente. Coûteux.

5 et 10 sont les valeurs usuelles parce qu'elles sont le compromis empirique, pas parce qu'elles sont optimales. Avec peu de données, `RepeatedStratifiedKFold(5, n_repeats=10)` donne une estimation bien plus fine qu'un `KFold(50)`, pour un coût comparable.

## Les métriques de régression et leurs pièges

| Métrique | Unité | Piège principal |
|---|---|---|
| RMSE | celle de la cible | dominée par les grosses erreurs |
| MAE | celle de la cible | insensible aux grosses erreurs — parfois voulu |
| R² | sans unité | **peut être négatif** |
| MAPE | pourcentage | **explose quand la cible approche zéro** |

### R² négatif

Le R² compare ton modèle à la prédiction constante par la moyenne :

```
R² = 1 − SSE_modèle / SSE_moyenne
```

S'il est négatif, ton modèle fait **pire que de répondre toujours la moyenne**. Ce n'est pas un bug, c'est un diagnostic, et il arrive plus souvent qu'on croit : sur un jeu de test, avec un modèle surappris, ou avec une cible dont la moyenne de test diffère de celle du train.

```python
r2_score([1, 2, 3, 4], [4, 3, 2, 1])      # −3,0
```

### MAPE près de zéro

```
vraies valeurs :   0,1     1,0     10,0    100,0
prédictions   :   0,2     1,1     10,5    101,0
erreurs       :   0,1     0,1      0,5      1,0
```

Les quatre erreurs absolues sont du même ordre, et le MAPE annonce **29 %** — parce que la première ligne compte pour 100 % à elle seule, pour un écart de 0,1. Sur une cible qui passe près de zéro (une demande, un stock, une variation), le MAPE est dominé par les petites valeurs et devient ininterprétable. Il est aussi **asymétrique** : surestimer est plafonné, sous-estimer peut tendre vers l'infini.

Les alternatives selon le besoin : le MAE en unité absolue, le MAE médian pour résister aux aberrantes, ou le SMAPE si l'on veut vraiment un pourcentage.

## Plus de deux classes : macro, micro, pondéré

Les métriques binaires se généralisent par moyenne, et le choix de la moyenne change radicalement le chiffre.

Sur quatre classes très déséquilibrées — 2 507, 723, 255 et 115 individus de test —, le **même modèle** et les **mêmes prédictions** :

```
F1 micro     = 0,7617
F1 macro     = 0,4244
F1 pondéré   = 0,7191
```

Trente-quatre points d'écart entre micro et macro. L'explication est dans les rappels par classe :

```
rappel par classe : 0,966   0,379   0,157   0,061
```

- **micro** agrège tous les individus avant de calculer : la classe majoritaire pèse 70 % du total et le chiffre reflète surtout elle. En classification multiclasse simple, le F1 micro est d'ailleurs égal à l'accuracy.
- **macro** fait la moyenne non pondérée des F1 par classe : chaque classe compte autant, donc la classe à 115 individus pèse autant que celle à 2 507. C'est pour ça qu'elle s'effondre à 0,42.
- **pondéré** fait la moyenne pondérée par les effectifs : un intermédiaire qui ressemble au micro.

**Lequel ? Celui qui correspond à ce qui t'importe.** Si toutes les classes ont la même importance métier — diagnostiquer quatre maladies dont une rare —, c'est **macro**, et un chiffre bas est la vérité. Si ce qui compte est le volume d'individus bien traités, c'est **micro**. Annoncer « 0,76 de F1 » sans dire lequel, sur un problème déséquilibré, n'informe de rien.

Et dans tous les cas, `classification_report` et le rappel par classe disent plus que n'importe quelle moyenne. La moyenne est pour le tableau de bord ; la ventilation est pour comprendre.

## Au clavier

```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.metrics import roc_auc_score, brier_score_loss

X, y = make_classification(n_samples=20_000, n_features=20,
                           weights=[.7, .3], random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.4,
                                          random_state=0, stratify=y)

base = RandomForestClassifier(300, max_depth=6, random_state=0, n_jobs=-1)
brute = base.fit(X_tr, y_tr)
calib = CalibratedClassifierCV(
    RandomForestClassifier(300, max_depth=6, random_state=0, n_jobs=-1),
    method="isotonic", cv=5).fit(X_tr, y_tr)

for nom, m in [("brute", brute), ("calibrée", calib)]:
    p = m.predict_proba(X_te)[:, 1]
    print(f"{nom:9s} AUC={roc_auc_score(y_te, p):.4f}  "
          f"Brier={brier_score_loss(y_te, p):.4f}")

freq, annonce = calibration_curve(y_te, brute.predict_proba(X_te)[:, 1], n_bins=5)
for a, f in zip(annonce, freq):
    print(f"  annoncé {a:.2f}  ->  observé {f:.2f}")
```

Regarde les deux lignes d'AUC, puis les deux de Brier. Un modèle dont on améliore nettement les probabilités sans changer son AUC d'un millième : c'est la preuve que les deux propriétés sont indépendantes, et qu'une seule des deux se lit sur une courbe ROC.
