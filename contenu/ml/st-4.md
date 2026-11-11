Un modèle de gradient boosting bat souvent ARIMA et Prophet sur les séries longues, multiples et riches en variables externes. Le principe est simple : transformer la série en tableau et retomber sur de l'apprentissage supervisé classique. Mais cette transformation déplace le problème sans le supprimer, et elle crée un piège que les deux autres familles n'ont pas.

## Le principe : une ligne par date, des colonnes de passé

```
date        | ventes | lag_1 | lag_7 | moy_7 | jour_sem | mois
------------|--------|-------|-------|-------|----------|-----
2025-03-10  |   150  |  140  |  130  |  135  |     0    |  3
2025-03-11  |   160  |  150  |  141  |  138  |     1    |  3
```

Trois familles de colonnes, et ce sont les mêmes que celles de la leçon de Feature Engineering : des **retards** (`shift`), des **statistiques glissantes** (`rolling`) et des **variables calendaires**. La construction de ces colonnes est l'objet du premier exercice de cette leçon, avec sa contrainte centrale — aucune ligne ne doit contenir d'information postérieure à sa propre date — et c'est là que le module se gagne ou se perd.

Ce que la transformation apporte est net : accès à tout l'arsenal supervisé, variables externes naturelles, plusieurs séries dans un seul modèle. Ce qu'elle coûte est plus discret, et la section suivante en donne le prix exact.

## Un arbre ne peut pas sortir de l'intervalle vu en entraînement

Tu as vu au cours sur les arbres qu'un arbre prédit une constante par feuille, donc qu'il ne peut pas extrapoler. Sur une série temporelle avec une tendance, cette propriété cesse d'être une curiosité théorique : **elle rend le modèle inutilisable**, et c'est l'erreur numéro un du boosting sur séries temporelles.

Mesuré sur 1 200 points quotidiens avec une tendance de +0,50 par jour, entraînement sur les 60 % premiers :

```
max de y en TRAIN = 466,2
max de y en TEST  = 723,2      -> le test depasse de 257 ce que le modele a vu
```

Trois façons de poser le problème au même LightGBM, mêmes variables, mêmes hyperparamètres :

| Cible du modèle | MAE sur le test | max prédit |
|---|---|---|
| le **niveau** `y` | **133,56** | 455,65 |
| la **variation** `y − y[t−1]` | **5,47** | 722,17 |
| le niveau, variables calendaires seules | 310,15 | 363,67 |
| pour mémoire, la référence naïve | **5,33** | — |

Lis la deuxième colonne du haut : le modèle entraîné sur le niveau **plafonne à 455,65**, c'est-à-dire sous le maximum de son entraînement, alors que la réalité monte à 723. Il ne se trompe pas un peu, il est **structurellement incapable** de prononcer un nombre qu'il n'a jamais vu. Et l'erreur grandit mécaniquement avec le temps : plus on s'éloigne, plus la vérité s'écarte du plafond.

Deux leçons de plus dans ce tableau.

**Les variables calendaires seules sont une catastrophe** (MAE 310). Sans aucun retard, le modèle n'a que le jour de la semaine et le mois : il prédit un profil moyen, et la tendance lui est complètement invisible.

**La référence naïve bat le LightGBM** — 5,33 contre 5,47. Sur un pas d'avance et une série à tendance régulière, « la valeur d'hier » est imbattable, et c'est exactement ce que la première leçon annonçait. Trois cents arbres pour perdre contre une ligne de code : c'est le genre de résultat qu'on ne découvre que si on a calculé la référence.

## Donc : modéliser la variation, ou retirer la tendance

Trois réponses, par ordre de simplicité.

**Prédire la différence**, puis recomposer. C'est la ligne gagnante du tableau et c'est une modification de deux lignes :

```python
cible = y.diff()                                  # on apprend la VARIATION
modele.fit(X_train, cible.loc[X_train.index])
prevision = y.shift(1).loc[X_test.index] + modele.predict(X_test)   # on recompose
```

La variation, elle, est stationnaire : ses valeurs futures restent dans l'intervalle observé, donc l'arbre travaille dans son domaine de validité. C'est exactement la même idée que le `d` d'un ARIMA, appliquée à un modèle qui n'en a pas.

**Retirer la tendance avant, la remettre après.** On ajuste une régression linéaire sur `t`, on modélise le résidu avec l'arbre, on additionne. Utile quand la tendance est claire et qu'on veut la garder lisible et contrôlable.

**Confier la tendance à un modèle linéaire et le reste à l'arbre** — un hybride. C'est ce que fait `LGBMRegressor(linear_tree=True)` à l'intérieur de chaque feuille : les feuilles portent une régression linéaire au lieu d'une constante, ce qui lève la limite d'extrapolation à l'intérieur de chaque région. À connaître, mais la cible différenciée reste la réponse par défaut, parce qu'elle est triviale à expliquer et à déboguer.

**Le contrôle à faire systématiquement** : comparer `max(prédictions)` à `max(y_train)`. S'ils sont presque égaux et que la série monte, tu viens de rencontrer le plafond.

## Récursif ou direct : la décision de conception du multi-pas

Un modèle entraîné à prédire un pas en avant doit produire une prévision à `h` pas. Deux stratégies, et le choix a des conséquences chiffrables.

**Récursif** : un seul modèle à un pas, rejoué `h` fois en réinjectant ses propres prédictions.

**Direct** : un modèle par horizon, chacun entraîné à prédire `h` pas en avant depuis l'information du jour.

Mesuré sur la même série, cible différenciée, 120 origines de prévision :

| Horizon | MAE direct | MAE récursif |
|---|---|---|
| 1 | 5,34 | **3,95** |
| 2 | 5,23 | 5,66 |
| 4 | 5,24 | **4,62** |
| 8 | 5,09 | 5,25 |
| 16 | 5,30 | 6,47 |
| 32 | **5,90** | 11,03 |

Le croisement se lit entre 4 et 8 pas. **À horizon court, le récursif gagne** parce qu'il part de la vraie dernière valeur. **À horizon long, il s'effondre** — l'erreur se compose : la prédiction du pas 1 devient une variable d'entrée du pas 2, son erreur entre dans celle du pas 2, et ainsi de suite. À 32 pas, l'écart est d'un facteur deux.

Le direct, lui, reste **plat** de 5,34 à 5,90 sur toute la plage. Il n'a aucune erreur à composer puisqu'il ne consomme jamais ses propres sorties, et chaque modèle apprend ce qui est prédictible à **son** horizon.

| | Récursif | Direct |
|---|---|---|
| Modèles à entraîner | 1 | h |
| Modèles à déployer et surveiller | 1 | h |
| Erreur à horizon court | la meilleure | correcte |
| Erreur à horizon long | se compose | stable |
| Cohérence de la trajectoire | garantie | aucune |

La dernière ligne est le défaut du direct qu'on oublie : les `h` modèles étant indépendants, rien ne garantit que la trajectoire prédite soit cohérente — elle peut faire des marches d'escalier. Si tu dois livrer une courbe à lire, c'est un vrai inconvénient.

**En pratique** : récursif pour un horizon de quelques pas, direct au-delà d'une dizaine, et une troisième voie quand `h` est grand — une sortie multiple (un modèle, `h` sorties) ou un modèle direct par **palier** d'horizon plutôt que par pas.

## La validation doit laisser un trou de la taille de l'horizon

```python
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=4, test_size=30, gap=30)
```

Le paramètre `gap` est presque toujours laissé à zéro, et c'est une erreur dès que l'horizon de production dépasse un pas. Mesuré :

```
gap= 0 : train finit a l'indice 514, test commence a 515  -> ecart 1
gap=30 : train finit a l'indice 484, test commence a 515  -> ecart 31
```

Avec `gap=0`, le premier point de validation suit immédiatement le dernier point d'entraînement : le modèle valide un problème **à un pas**. Si ta production demande une prévision à trente jours, tu as mesuré la performance d'une tâche que tu ne feras jamais — et la tâche mesurée est la plus facile des deux.

**La règle : `gap` égale l'horizon de production.** C'est la seule façon de reproduire la situation réelle, où les trente derniers jours de données ne sont pas encore connus au moment de prévoir.

Le même raisonnement s'applique aux variables : un `lag_1` n'existe pas quand on prévoit à trente jours. Un modèle validé avec `gap=30` mais nourri de `lag_1` est incohérent — ses variables doivent être décalées d'au moins `h`.

## L'arrêt précoce sur le jeu de test est une fuite

```python
model.fit(X_train, y_train,
          eval_set=[(X_test, y_test)],            # NE PAS FAIRE
          callbacks=[lgb.early_stopping(50)])
print(mean_absolute_error(y_test, model.predict(X_test)))
```

Ce schéma circule partout, y compris dans la version précédente de cette leçon. Le nombre d'arbres a été choisi **en regardant le jeu de test**, puis la performance est annoncée **sur ce même jeu**. C'est la fuite identifiée au cours sur le gradient boosting, dans un autre déguisement : le jeu qui sert à régler un hyperparamètre n'est plus un jeu de test.

Sur des données temporelles, la correction demande **trois blocs chronologiques** :

```python
n = len(X)
i1, i2 = int(n*0.70), int(n*0.85)
X_tr, X_val, X_te = X[:i1], X[i1:i2], X[i2:]
y_tr, y_val, y_te = y[:i1], y[i1:i2], y[i2:]

modele.fit(X_tr, y_tr, eval_set=[(X_val, y_val)],      # l'arret precoce lit la VALIDATION
           callbacks=[lgb.early_stopping(50, verbose=False)])
print("MAE test :", mean_absolute_error(y_te, modele.predict(X_te)))   # jamais vu
```

## Un seul modèle pour des centaines de séries, et le piège du `shift`

C'est l'argument décisif du boosting face aux modèles univariés : cinq cents magasins, **un** modèle. L'identifiant de série devient une variable catégorielle, et le modèle apprend les régularités **communes** à toutes les séries — un effet de week-end, un effet de jour férié — tout en se spécialisant par magasin quand les données le justifient. Les séries courtes empruntent la structure des séries longues, ce qu'aucun ARIMA par magasin ne peut faire.

Le prix à payer est un piège silencieux, et il se voit en six lignes :

```python
d["faux"]  = d["ventes"].shift(1)                        # traverse les frontieres de groupe
d["juste"] = d.groupby("magasin")["ventes"].shift(1)     # s'arrete a chaque magasin
```

```
magasin       date  ventes  faux  juste
      A 2025-01-01      10   NaN    NaN
      A 2025-01-02      11  10.0   10.0
      A 2025-01-03      12  11.0   11.0
      B 2025-01-01      90  12.0    NaN     <- 12 est la derniere vente de A
      B 2025-01-02      91  90.0   90.0
```

La première ligne du magasin B reçoit **la dernière valeur du magasin A**. Aucune erreur, aucun avertissement, et sur un tableau de cinq cents magasins ce sont cinq cents lignes corrompues — invisibles dans un score global, puisqu'elles ne représentent qu'une fraction du jeu.

**Toute construction de variable sur un tableau empilé passe par `groupby`.** `shift`, `rolling`, `cumsum`, `diff` : aucune exception. Et le tableau doit être trié par (série, date) avant, sinon `groupby` lui-même travaille sur un ordre arbitraire.

```python
d = d.sort_values(["magasin", "date"])                # avant tout : trier (serie, date)
g = d.groupby("magasin")["ventes"]
d["lag_1"] = g.shift(1)
d["lag_7"] = g.shift(7)
d["magasin"] = d["magasin"].astype("category")        # categorielle native LightGBM
```

Les statistiques glissantes se construisent sur le même `g`, avec une précaution supplémentaire que l'exercice de cette leçon te fera trouver — et c'est la précaution la plus importante du module.

## Les importances de variables : `split` ne dit rien, `gain` dit autre chose

`LGBMRegressor` utilise `importance_type="split"` par défaut, qui compte le **nombre de découpes** par variable. Sur des retards fortement corrélés entre eux, ce compte se répartit presque uniformément et n'informe sur rien. Mesuré sur le même jeu, mêmes arbres, seul le type d'importance change :

| Variable | `split` | `gain` |
|---|---|---|
| `lag_7` | 17,0 % | **38,6 %** |
| `lag_14` | 16,9 % | 31,1 % |
| `moy_7` | 17,8 % | 27,3 % |
| `lag_365` | 17,6 % | 1,5 % |
| `lag_1` | 17,7 % | **1,3 %** |
| `jour_sem` | 7,9 % | 0,1 % |
| `mois` | 5,2 % | 0,1 % |

Les cinq premières variables sont à moins d'un point les unes des autres en `split` — classement inexploitable. En `gain`, trois variables portent 97 % de la réduction d'erreur, et **`lag_1` tombe au cinquième rang avec 1,3 %** alors qu'il était deuxième dans l'autre colonne.

Le retournement s'explique : `moy_7` et `lag_7` contiennent la même information que `lag_1` en moins bruitée, donc les arbres les préfèrent dès qu'ils ont le choix. Et c'est le phénomène déjà rencontré au cours sur le gradient boosting — des définitions d'importance différentes ne classent pas les mêmes variables en tête. Sur une série temporelle, le cas est systématique parce que tous les retards sont corrélés par construction.

**Conclusion pratique** : passe `importance_type="gain"`, et pour une décision de retrait de variable, mesure par **ablation** — retirer et remesurer — plutôt que par classement.

## Au clavier

```python
import numpy as np, pandas as pd, lightgbm as lgb
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_absolute_error

H = 30                                   # l'horizon de production, decide d'abord

T = creer_features(serie)                # l'exercice de cette lecon
X, y = T.drop(columns="ventes"), T["ventes"]

# 1. cible differenciee : l'arbre travaille dans son domaine
dy = y.diff().dropna()
X = X.loc[dy.index]

# 2. trois blocs chronologiques, l'arret precoce lit la validation
i1, i2 = int(len(X)*0.70), int(len(X)*0.85)
m = lgb.LGBMRegressor(n_estimators=2000, learning_rate=0.05,
                      importance_type="gain", verbose=-1, random_state=0)
m.fit(X[:i1], dy[:i1], eval_set=[(X[i1:i2], dy[i1:i2])],
      callbacks=[lgb.early_stopping(50, verbose=False)])

# 3. recomposition du niveau, et le controle du plafond
prev = y.shift(1).loc[X.index[i2:]] + m.predict(X[i2:])
print("MAE  :", round(mean_absolute_error(y.loc[prev.index], prev), 3))
print("naif :", round(mean_absolute_error(y.loc[prev.index], y.shift(1).loc[prev.index]), 3))
print("max predit", round(prev.max(), 1), "| max train", round(y[:i1].max(), 1))

# 4. validation glissante avec un trou egal a l'horizon
for i_tr, i_te in TimeSeriesSplit(n_splits=4, test_size=H, gap=H).split(X):
    ...
```

Trois réflexes :

1. **Ne donne jamais le niveau comme cible sur une série à tendance.** Apprends la variation et recompose. Le contrôle tient en une ligne : si `max(prédictions)` colle au `max` de l'entraînement, tu as touché le plafond — 133,56 de MAE contre 5,47 dans la mesure de cette leçon.
2. **Mets `gap` égal à l'horizon de production dans ton `TimeSeriesSplit`**, et décale tes variables d'autant. Avec `gap=0` tu mesures une tâche à un pas que tu n'exécuteras jamais.
3. **Sur un tableau à plusieurs séries, tout passe par `groupby`.** Un `shift` global donne au premier jour d'un magasin la dernière valeur du magasin précédent, sans erreur ni avertissement.
