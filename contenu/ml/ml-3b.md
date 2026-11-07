XGBoost et LightGBM sont, sur données tabulaires, ce qui gagne. Pas « souvent » : presque toujours, et devant les réseaux de neurones. Savoir les faire tourner prend dix minutes ; savoir pourquoi ils gagnent et où ils mentent prend cette leçon.

## Pourquoi « gradient » boosting

L'explication habituelle est que chaque arbre apprend les **résidus** du précédent. C'est vrai pour une perte quadratique, et c'est un cas particulier qui masque le mécanisme général.

Reprenons. On veut minimiser une perte `L(y, F(x))` où `F` est le modèle complet. L'idée du boosting est de construire `F` par additions successives, chaque nouveau terme allant dans la direction qui fait le plus baisser la perte — c'est-à-dire dans la direction de l'**opposé du gradient de la perte par rapport à la prédiction** :

```
rᵢ = − ∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ)
```

On entraîne alors un arbre à prédire ces `rᵢ`, et on l'ajoute au modèle avec un pas :

```
F ← F + η · arbre(x)              η = learning_rate
```

C'est une descente de gradient, mais dans l'espace des fonctions et non dans celui des paramètres. D'où le nom.

Maintenant, le cas particulier. Pour `L = ½(y − F)²`, le gradient vaut `−(y − F)`, donc `r = y − F` : **le résidu**. La formule populaire est donc exacte, mais seulement là.

Avec l'entropie croisée, `r = y − σ(F)` : un écart de probabilité, pas un résidu. Avec une perte absolue, `r = signe(y − F)` : seule la direction de l'erreur compte, son ampleur est ignorée — ce qui explique directement pourquoi cette perte résiste aux valeurs aberrantes.

**L'intérêt de comprendre ça** : n'importe quelle perte dérivable devient utilisable. Classement, survie, comptage de Poisson, quantile — le même algorithme accepte tout, à condition de pouvoir dériver. C'est ce qui a fait l'universalité de la méthode.

## Les deux stratégies de croissance

C'est la vraie différence entre les deux bibliothèques, et elle change le paramètre qu'on règle.

**XGBoost croît par niveau** (*depthwise*) : il développe tous les nœuds d'une profondeur avant de passer à la suivante. Les arbres sont équilibrés, et `max_depth` contrôle directement la complexité.

**LightGBM croît par feuille** (*leaf-wise*) : à chaque étape, il prend la feuille — n'importe laquelle dans l'arbre — qui réduit le plus la perte, et la découpe. L'arbre devient déséquilibré : très profond là où le signal est riche, très plat ailleurs.

Pour un même nombre de feuilles, la croissance par feuille obtient une perte plus basse — elle dépense son budget là où il rapporte. C'est ce qui explique sa vitesse. En revanche `max_depth` ne contrôle plus rien d'utile (il vaut `-1` par défaut), et le paramètre de complexité devient **`num_leaves`**.

### Le folklore, et ce que la mesure dit

On lit partout que LightGBM surapprend sur les petits jeux de données si `num_leaves` est trop grand. Sur les 398 lignes d'entraînement du jeu du cancer du sein, avec les valeurs par défaut :

```
num_leaves =   7   →  test = 0,9591
num_leaves =  31   →  test = 0,9591
num_leaves = 127   →  test = 0,9591
num_leaves = 511   →  test = 0,9591
```

Rien ne bouge. La raison est que `min_child_samples`, à 20 par défaut, interdit les feuilles de moins de vingt exemples : l'arbre arrête de croître bien avant d'atteindre son budget de feuilles. En abaissant cette garde à 1 :

```
num_leaves =   3   →  1er arbre : 3 feuilles    test = 0,9474
num_leaves =   7   →  1er arbre : 7 feuilles    test = 0,9591
num_leaves =  31   →  1er arbre : 23 feuilles   test = 0,9415
num_leaves = 255   →  1er arbre : 23 feuilles   test = 0,9415
```

Là, `num_leaves` mord : presque deux points perdus entre 7 et 31. Et on voit aussi que demander 255 feuilles n'en produit que 23 — les données s'épuisent avant le budget.

**Ce qu'il faut en retenir est plus utile que le folklore** : `num_leaves` est un **plafond**, pas une consigne. Sur peu de données, la contrainte qui mord réellement est `min_child_samples`, et c'est elle qu'il faut regarder en premier. Et le réglage par défaut de LightGBM est plus prudent que sa réputation.

## Les valeurs manquantes n'ont pas besoin d'être imputées

C'est le gain pratique le plus sous-exploité de la famille. À chaque découpage, XGBoost et LightGBM apprennent une **direction par défaut** : les lignes dont la valeur est absente partent toutes du même côté, et le côté est choisi par le gain, comme tout le reste.

L'absence devient donc une information que le modèle exploite, au lieu d'un trou à combler.

En perçant 20 % de valeurs manquantes au hasard dans le jeu du cancer du sein, sans aucune imputation :

```
XGBoost sur les NaN bruts   →  test = 0,9474
LogisticRegression          →  ValueError: Input X contains NaN
```

Le modèle linéaire refuse de démarrer. XGBoost ne remarque rien.

Ça ne rend pas le module Feature Engineering inutile — imputer en connaissant le métier reste souvent meilleur, et une variable indicatrice `était_absent` reste utile ailleurs dans le pipeline. Mais ça dit qu'avec un boosting, **l'imputation est un choix et non une obligation**, et que la comparer à l'absence d'imputation est une expérience à faire plutôt qu'une étape à subir.

Un piège en revanche : si tu as déjà imputé par `-1` ou par `0` avant d'arriver là, tu as détruit cette capacité. Le modèle voit une valeur, pas une absence.

## Pourquoi c'est si rapide : le découpage par paliers

Un arbre classique teste, pour chaque variable continue, chaque valeur distincte comme seuil candidat — des milliers d'essais par nœud.

XGBoost et LightGBM commencent par regrouper chaque variable continue en un nombre fixe de **paliers** (`max_bin`, 256 par défaut) construits sur les quantiles. Le nombre de seuils candidats passe de « autant que de valeurs distinctes » à 256, et l'histogramme des gradients par palier se calcule en un seul balayage des données.

```python
import json, xgboost as xgb
cfg = json.loads(modele.get_booster().save_config())
# tree_method = auto  ->  hist ;  max_bin = 256 ;  grow_policy = depthwise
```

La perte de précision est négligeable — un seuil à 0,3 % près sur une variable continue ne change pas un modèle —, et le gain est d'un ordre de grandeur. C'est l'optimisation qui a rendu le boosting praticable sur des millions de lignes.

## Les variables catégorielles, nativement

Les deux bibliothèques savent traiter une colonne catégorielle sans encodage préalable, en cherchant directement la meilleure **partition des modalités** en deux groupes — ce qu'un one-hot ne permet pas, puisqu'il ne propose que « cette modalité contre toutes les autres ».

```python
# XGBoost : le type pandas "category" suffit
df["ville"] = df["ville"].astype("category")
modele = xgb.XGBClassifier(enable_categorical=True, tree_method="hist")

# LightGBM
modele = lgb.LGBMClassifier()
modele.fit(X, y, categorical_feature=["ville", "canal"])
```

C'est souvent meilleur qu'un one-hot sur les variables à nombreuses modalités, et toujours plus économe en mémoire. À comparer, pas à adopter les yeux fermés : sur les variables à faible cardinalité, la différence est généralement nulle.

## Les importances se contredisent, et il faut savoir laquelle on lit

`get_score` accepte trois types d'importance, qui ne mesurent pas la même chose.

| Type | Ce qu'il compte |
|---|---|
| `weight` | le nombre de fois que la variable sert de seuil |
| `gain` | la réduction totale de perte qu'elle a apportée |
| `cover` | le nombre d'exemples concernés par ses découpages |

On conseille `gain`, et voici pourquoi, mesuré sur le même modèle :

```
top 5 par weight : worst texture, worst area, mean smoothness, area error, symmetry error
top 5 par gain   : worst perimeter, worst radius, worst concave points, mean perimeter, mean concave points
top 5 par cover  : smoothness error, worst perimeter, radius error, perimeter error, worst concave points
```

**Aucune variable n'est commune aux trois listes.** Pas une.

L'explication est que `weight` favorise les variables à nombreuses valeurs distinctes : elles offrent plus de seuils candidats, donc elles reviennent souvent, même pour des gains minuscules dans les branches profondes. Une variable binaire décisive peut servir une seule fois, à la racine, et disparaître du classement par `weight`.

`gain` mesure ce qui nous intéresse — la contribution à la qualité du modèle — et c'est le seul des trois à répondre à la question qu'on pose. Les trois restent biaisés entre variables corrélées, qui se partagent arbitrairement le crédit.

**Et aucune des trois ne dit le sens.** Une importance élevée indique qu'une variable compte, jamais si elle pousse la prédiction vers le haut ou vers le bas, ni pour qui.

## SHAP : de l'importance globale à l'explication individuelle

SHAP répond à la question que les importances ne traitent pas : **pour cette ligne précise, qu'est-ce qui a produit cette prédiction ?**

La valeur de Shapley vient de la théorie des jeux : pour répartir équitablement un gain entre des joueurs, on mesure la contribution moyenne de chaque joueur sur tous les ordres d'arrivée possibles. Ici, les joueurs sont les variables et le gain est l'écart entre la prédiction et la moyenne.

La propriété qui rend l'outil exploitable est l'**additivité exacte** :

```
prédiction(x) = valeur de base + Σ contribution de chaque variable
```

La valeur de base est la prédiction moyenne du modèle. Les contributions somment, au centième près, à l'écart restant. On peut donc mettre un nombre en euros ou en points de probabilité devant chaque variable, pour une ligne donnée — c'est ce que la réglementation exige quand il faut motiver un refus.

```python
import shap        # pip install shap

explainer = shap.TreeExplainer(modele)
valeurs = explainer(X_val)

shap.summary_plot(valeurs, X_val)        # global, avec le sens
shap.waterfall_plot(valeurs[0])          # une ligne, décomposée
```

Deux réserves à garder en tête. SHAP explique **le modèle**, pas le monde : une contribution n'est pas un effet causal, et un modèle qui a appris une corrélation absurde produira une explication SHAP parfaitement cohérente de cette absurdité. Et `TreeExplainer` est exact et rapide sur les arbres, là où les variantes d'approximation sur d'autres modèles coûtent cher et varient d'une exécution à l'autre.

## L'arrêt anticipé, et le piège du jeu de validation réutilisé

L'arrêt anticipé surveille une métrique sur un jeu de validation et arrête la construction quand elle cesse de progresser pendant *N* tours. `n_estimators` cesse d'être un hyperparamètre à régler : il devient un plafond.

```python
modele = xgb.XGBClassifier(
    n_estimators=2000,          # un plafond, pas une consigne
    learning_rate=0.05,         # bas = plus d'arbres, modèle plus robuste
    max_depth=4,
    subsample=0.8,              # 80 % des lignes par arbre
    colsample_bytree=0.8,       # 80 % des colonnes par arbre
    eval_metric="auc",
    early_stopping_rounds=50,
    random_state=42, n_jobs=-1,
)
modele.fit(X_tr, y_tr, eval_set=[(X_val, y_val)], verbose=False)
print("arbres retenus :", modele.best_iteration + 1)
```

Et voici l'erreur de protocole qu'on trouve dans la majorité des tutoriels, celle à ne pas reproduire :

```python
# À NE PAS FAIRE
def objectif(trial):
    modele = xgb.XGBClassifier(**params, early_stopping_rounds=50)
    modele.fit(X_tr, y_tr, eval_set=[(X_val, y_val)])        # X_val décide de l'arrêt
    return roc_auc_score(y_val, modele.predict_proba(X_val)[:, 1])   # ET du classement
```

Le même `X_val` sert à décider quand arrêter **et** à noter la configuration. Il remplit deux rôles incompatibles, et le score retourné est optimiste deux fois. Il faut trois jeux distincts — un pour entraîner, un pour l'arrêt anticipé, un pour comparer les configurations — ou une validation croisée imbriquée, qui est l'objet de l'exercice de cette leçon.

```python
import optuna

def objectif(trial):
    params = {
        "n_estimators":     2000,
        "learning_rate":    trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
        "max_depth":        trial.suggest_int("max_depth", 3, 10),
        "subsample":        trial.suggest_float("subsample", 0.5, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.5, 1.0),
        "min_child_weight": trial.suggest_int("min_child_weight", 1, 10),
        "reg_lambda":       trial.suggest_float("reg_lambda", 1e-8, 10, log=True),
    }
    m = xgb.XGBClassifier(**params, eval_metric="auc", early_stopping_rounds=50,
                          random_state=42, n_jobs=-1)
    m.fit(X_tr, y_tr, eval_set=[(X_arret, y_arret)], verbose=False)   # jeu dédié
    return roc_auc_score(y_sel, m.predict_proba(X_sel)[:, 1])         # autre jeu

etude = optuna.create_study(direction="maximize")
etude.optimize(objectif, n_trials=100)
```

Optuna est préférable à une grille exhaustive parce qu'il mène une recherche bayésienne : il modélise la relation entre paramètres et score, et concentre les essais suivants là où le gain espéré est le plus élevé. Sur un espace à sept dimensions, une grille est hors de portée et un tirage aléatoire gaspille la moitié de ses essais.

## XGBoost ou LightGBM

| | XGBoost | LightGBM |
|---|---|---|
| Vitesse d'entraînement | rapide | nettement plus rapide |
| Mémoire | plus gourmand | plus économe |
| Croissance | par niveau (`max_depth`) | par feuille (`num_leaves`) |
| Petits jeux | très sûr | sûr, en gardant `min_child_samples` |
| Très grands jeux | bon | excellent |
| Catégorielles natives | `enable_categorical` | `categorical_feature` |

En pratique les deux atteignent des performances comparables après réglage, et l'écart vient du temps qu'on peut y consacrer. LightGBM pour itérer vite sur beaucoup de données, XGBoost pour sa maturité et son écosystème. **CatBoost** mérite une mention : son encodage de cible intégré et ses défauts très solides en font souvent le meilleur premier essai sur des données à forte composante catégorielle.

## Au clavier

```python
import numpy as np, xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(0)
X, y = load_breast_cancer(return_X_y=True)

# On perce 20 % de trous, sans rien imputer
X_troue = X.copy()
X_troue[rng.random(X.shape) < 0.20] = np.nan

X_tr, X_te, y_tr, y_te = train_test_split(X_troue, y, test_size=.3,
                                          random_state=42, stratify=y)

m = xgb.XGBClassifier(n_estimators=300, max_depth=4, learning_rate=.1,
                      random_state=0).fit(X_tr, y_tr)
print("XGBoost sur NaN bruts :", round(m.score(X_te, y_te), 4))

from sklearn.linear_model import LogisticRegression
try:
    LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
except ValueError as e:
    print("LogisticRegression    :", str(e).split("\n")[0])
```

Puis compare les trois classements d'importance du même modèle et compte combien de variables leur sont communes. Le résultat est le meilleur argument contre la lecture distraite d'un graphique d'importance.
