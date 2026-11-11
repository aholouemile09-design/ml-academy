Une série temporelle est une séquence de valeurs indexées dans le temps. Ce qui la distingue d'un jeu de données classique tient en une phrase : **l'ordre est une information, et les observations ne sont pas indépendantes**. Toutes les conséquences de ce module découlent de là.

## Quatre composantes, et la confusion entre saisonnalité et cycle

| Composante | Définition | Exemple |
|---|---|---|
| **Tendance** | direction à long terme | chiffre d'affaires qui monte sur cinq ans |
| **Saisonnalité** | cycle répétitif à **période fixe et connue** | pic de ventes chaque décembre |
| **Cyclicité** | oscillation à **période variable et inconnue** | cycles économiques, 5 à 10 ans |
| **Résidu** | ce qui reste une fois les trois retirés | fluctuation imprévisible |

La ligne qui compte est la différence entre les deux du milieu, et elle est presque toujours escamotée. **La saisonnalité a une période que tu connais d'avance** — 12 mois, 7 jours, 24 heures — donc elle se modélise et se prévoit. **La cyclicité a une période qui change** à chaque occurrence, donc elle ne se prévoit pas : aucun modèle de ce module ne prédit un retournement de cycle.

Conséquence pratique : si ta série est dominée par du cyclique, la bonne réponse n'est pas un meilleur modèle, c'est un horizon plus court et un intervalle d'incertitude honnête.

## La première question n'est pas « quel modèle », c'est « à quel horizon »

Un modèle de séries temporelles ne prédit pas « la valeur » : il prédit la valeur **à h pas en avant**, et h change tout. L'erreur à un jour et l'erreur à trois mois ne se comparent pas, ne s'optimisent pas de la même façon, et n'autorisent pas les mêmes variables.

L'horizon est une donnée **métier**, pas technique. Un réapprovisionnement avec quinze jours de délai fournisseur demande une prévision à quinze jours : un modèle brillant à un jour n'a aucune valeur pour cette décision. Pose la question avant d'écrire une ligne de code, parce qu'elle détermine ensuite le découpage de validation, les variables disponibles et le choix du modèle.

Et une conséquence qu'on oublie : **une erreur agrégée sur tous les horizons ne veut rien dire**. Si tu évalues une prévision à douze mois par un seul MAE global, tu mélanges un mois facile et un douzième mois difficile en un chiffre qui ne décrit ni l'un ni l'autre. L'évaluation se fait **par horizon**, en tableau.

## Les références naïves, et pourquoi elles se calculent en premier

Avant tout modèle, il faut savoir ce qu'il doit battre. Il y a quatre références, elles coûtent une ligne chacune, et presque personne ne les calcule.

```python
naif          = np.repeat(train.iloc[-1], h)              # la derniere valeur connue
naif_saison   = train.iloc[-m:].values                    # la meme periode l'an dernier
moyenne       = np.repeat(train.mean(), h)                # la moyenne historique
derive        = train.iloc[-1] + pente * np.arange(1, h+1)  # derniere valeur + pente moyenne
```

Mesuré sur une série mensuelle de 120 points (tendance douce, saisonnalité annuelle forte), prévision à 12 mois :

| Référence | MAE |
|---|---|
| dernière valeur connue | 22,56 |
| **même mois l'an dernier** | **6,87** |
| moyenne historique | 25,14 |
| dernière valeur + dérive | 22,73 |

Le naïf saisonnier est **trois fois meilleur** que les trois autres, et il n'a aucun paramètre. C'est lui la référence à battre, et un modèle qui ne la bat pas est à jeter — peu importe sa sophistication.

**Et la bonne référence dépend de la série.** Sur une série sans saisonnalité mais à forte inertie, c'est la dernière valeur connue qui gagne. Sur une série stationnaire autour d'une valeur fixe, c'est la moyenne. D'où la règle : **calcule les quatre**, regarde laquelle gagne, et ce que ça t'apprend sur la structure de ta série. C'est un diagnostic gratuit.

## MASE : la seule métrique comparable entre séries

MAE et RMSE sont en unités métier, ce qui les rend lisibles — et incomparables. Un MAE de 42 est-il bon ? Impossible à dire sans connaître l'échelle. Et sur un portefeuille de cinq cents magasins aux volumes très différents, additionner des MAE n'a aucun sens.

Le **MASE** (*Mean Absolute Scaled Error*) résout ça en divisant le MAE par celui du naïf saisonnier **calculé en entraînement** :

```
MASE = MAE(modèle) / moyenne(|y[t] − y[t−m]|) sur le train
```

La lecture est immédiate et universelle : **MASE < 1, le modèle bat le naïf saisonnier ; MASE > 1, il perd contre lui.** Sur la même série que plus haut :

| Référence | MAE | MASE |
|---|---|---|
| dernière valeur connue | 22,56 | 3,608 |
| même mois l'an dernier | 6,87 | **1,099** |
| moyenne historique | 25,14 | 4,021 |
| dernière valeur + dérive | 22,73 | 3,635 |

Noter que le naïf saisonnier lui-même affiche 1,099 et non 1,000 : son erreur hors échantillon est légèrement plus grande que son erreur en échantillon, ce qui est normal et donne l'ordre de grandeur de l'écart attendu entre les deux régimes.

Le MASE est sans unité, défini même quand la série passe par zéro — contrairement à tout ce qui divise par `y` — et il s'agrège proprement sur plusieurs séries. C'est la métrique de référence des compétitions de prévision.

Les trois autres se calculent en deux lignes et gardent leur usage : le MAE pour parler au métier, le RMSE quand une grosse erreur coûte plus que plusieurs petites, le MAPE pour un pourcentage — avec les réserves que l'exercice de la leçon Prophet te fera constater.

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error

mae  = mean_absolute_error(y_vrai, y_prev)
rmse = np.sqrt(mean_squared_error(y_vrai, y_prev))
mape = np.mean(np.abs((y_vrai - y_prev) / y_vrai)) * 100
mase = mae / np.mean(np.abs(train.values[m:] - train.values[:-m]))
```

## Décomposer : `seasonal_decompose` ou STL, et ce n'est pas équivalent

```python
from statsmodels.tsa.seasonal import seasonal_decompose, STL

decomp = seasonal_decompose(serie, model="additive", period=12)
stl    = STL(serie, period=12).fit()
```

`seasonal_decompose` estime la tendance par une **moyenne mobile centrée** sur la période. Conséquence directe et rarement remarquée : elle ne peut rien calculer sur les `m/2` premiers et derniers points. Mesuré sur 120 points mensuels avec `period=12` :

```
seasonal_decompose : 12 NaN de tendance  (6 au début, 6 à la fin)
STL                :  0 NaN
```

Les six derniers points sont précisément ceux qui t'intéressent le plus — ce sont les plus récents. Et l'estimation de la saisonnalité y est la plus fragile.

**STL** (*Seasonal-Trend decomposition using LOESS*) n'a pas ce défaut, et il en corrige deux autres :

- il est **robuste aux valeurs aberrantes** avec `robust=True` : un pic exceptionnel ne contamine pas le profil saisonnier de toutes les autres années ;
- il autorise une **saisonnalité qui évolue** (`seasonal_deg`, `period`), alors que `seasonal_decompose` impose un profil saisonnier identique d'un cycle à l'autre — hypothèse souvent fausse sur plusieurs années.

Son prix : il ne gère qu'une seule saisonnalité (voir `MSTL` pour plusieurs) et il est plus lent. En pratique, **STL par défaut, `seasonal_decompose` pour un coup d'œil rapide.**

Et dans les deux cas, garde en tête que **la décomposition est un modèle, pas une mesure**. Changer `period` change les trois composantes. Il n'existe pas de « vraie » tendance qu'on extrairait : il existe la tendance que ce choix de lissage produit.

## Stationnarité : l'ADF seul ne suffit pas

Un processus est **stationnaire** si sa moyenne, sa variance et son autocovariance ne dépendent pas de la date. ARIMA le suppose, et c'est pour ça qu'on le teste.

Le réflexe habituel est l'ADF seul. Le problème : **l'ADF et le KPSS n'ont pas la même hypothèse nulle** — elles sont même opposées, et c'est le sujet du premier exercice. En les croisant on obtient quatre situations, dont deux appellent des remèdes différents.

```python
from statsmodels.tsa.stattools import adfuller, kpss
adfuller(s)[1]                              # p-value ADF
kpss(s, regression="c",  nlags="auto")[1]   # KPSS autour d'une constante
kpss(s, regression="ct", nlags="auto")[1]   # KPSS autour d'une tendance
```

Mesuré sur trois séries de 300 points dont on connaît la nature par construction :

| Série | ADF p | KPSS « c » p | KPSS « ct » p |
|---|---|---|---|
| bruit blanc | 0,0000 | 0,1000 | 0,1000 |
| marche aléatoire | 0,6578 | 0,0100 | 0,0117 |
| tendance déterministe | 0,9684 | 0,0100 | **0,1000** |

**La troisième ligne est celle qui compte.** L'ADF annonce une série non stationnaire et pousse à différencier. Le KPSS en version « ct », qui teste la stationnarité *autour d'une tendance*, dit que la série est parfaitement stable une fois la tendance retirée. Le bon remède ici n'est pas la différenciation mais la **suppression de la tendance** — une régression sur `t`, ou une composante de tendance explicite dans le modèle.

La distinction a un nom : **tendance déterministe** (une droite, qu'on retire) contre **tendance stochastique** (une racine unitaire, qu'on différencie). Les confondre produit des modèles sur-différenciés, dont la section suivante donne le coût.

**Détail d'implémentation à connaître** : les p-values du KPSS de statsmodels sont **tronquées à l'intervalle [0,01 ; 0,10]** par interpolation dans une table. Un `0,0100` signifie « au plus 0,01 », un `0,1000` signifie « au moins 0,10 », et statsmodels émet un `InterpolationWarning` pour le dire. Ne lis pas ces bornes comme des p-values exactes.

## Sur-différencier a un coût, et il se mesure

« Dans le doute, différencier une fois de plus » est un mauvais réflexe. La différenciation d'une série déjà stationnaire **ajoute du bruit** au lieu d'en retirer.

Mesuré sur la série mensuelle de 120 points :

| Série | variance | autocorrélation au lag 1 |
|---|---|---|
| niveau | 1 111,4 | — |
| après `diff(1)` | 140,9 | +0,244 |
| après `diff(2)` | **213,0** | **−0,540** |

Deux signaux, tous deux lisibles sans théorie :

**La variance remonte.** Elle devait baisser (c'est le but), elle augmente de 50 %. Une différenciation qui augmente la variance est une différenciation de trop.

**L'autocorrélation au lag 1 devient fortement négative.** C'est la signature mathématique de la sur-différenciation : différencier un bruit blanc produit une autocorrélation de **−0,5** exactement au lag 1. Mesurer −0,54 est l'aveu que la deuxième différenciation ne retirait plus de structure, elle en fabriquait.

**La règle pratique** : `d = 1` dans l'immense majorité des cas, `d = 2` seulement pour une série dont la *pente* elle-même dérive. Et le contrôle après coup est celui du tableau : si l'autocorrélation au lag 1 de ta série différenciée est franchement négative, reviens d'un cran.

## La fréquence doit être déclarée, sinon `rolling` compte des lignes

Piège silencieux, et il touche tout le monde au moins une fois.

```python
df = df.asfreq("D")     # declare la frequence, cree des NaN pour les dates absentes
```

Sans cette déclaration, un index de dates avec des trous reste un index valide, et **`rolling(7)` compte sept lignes, pas sept jours**. Les deux ne coïncident que si aucune date ne manque.

Mesuré sur un index quotidien de 20 jours dont trois sont absents (13 au 15 janvier), fenêtre se terminant le 20 :

```
rolling(7).mean()    = 15.14   -> 7 LIGNES, la fenetre remonte avant le trou
rolling('7D').mean() = 17.00   -> 7 JOURS, soit 5 points seulement
```

Deux valeurs différentes, aucun avertissement, et la première est fausse si ton intention était « les sept derniers jours ». La parade est double : **`asfreq` pour rendre les trous visibles**, et **une fenêtre temporelle (`'7D'`, `'30D'`) plutôt qu'un nombre de lignes** dès que la régularité n'est pas garantie.

Ce que `asfreq` fait apparaître est d'ailleurs une information en soi, et la façon de traiter ces trous n'est pas une question technique mais une question métier — le second exercice de la leçon sur Prophet y est entièrement consacré.

## La bande de l'ACF n'est pas un seuil de vérité

```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
fig, axes = plt.subplots(1, 2, figsize=(14, 4))
plot_acf(serie.dropna(),  lags=36, ax=axes[0])
plot_pacf(serie.dropna(), lags=36, ax=axes[1])
```

La bande bleue est à **±1,96/√n** : c'est l'intervalle dans lequel l'autocorrélation d'un **bruit blanc** tombe 95 fois sur 100. Une barre qui en sort n'est donc pas « significative » au sens courant — c'est une barre qui sort, et sur vingt lags il en sort une par hasard.

Vérifié sur 200 tirages de bruit blanc pur de 200 points, 20 lags chacun :

```
183 barres hors bande au total, soit 0,92 par graphique
attendu : 20 lags x 5 % = 1,00
```

**Presque une barre hors bande par graphique, sur des données qui ne contiennent rigoureusement aucune structure.** Donc : une barre isolée au lag 17 n'est pas un signal, c'est du bruit. Ce qui est interprétable, c'est un **motif** — une décroissance régulière, une coupure nette, un pic qui revient exactement tous les `m` lags. La lecture de ces motifs est le sujet du second exercice de la leçon ARIMA.

## Le découpage est chronologique, sans exception

La règle tient en une ligne : **le jeu de test est strictement postérieur au jeu d'entraînement.** Jamais de mélange, jamais de `train_test_split` avec `shuffle=True` — qui est le comportement par défaut.

```python
coupe = int(len(s) * 0.8)
train, test = s.iloc[:coupe], s.iloc[coupe:]        # chronologique

from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5, test_size=12)     # validation glissante
for i_tr, i_te in tscv.split(s):
    ...                                              # train grandit, test toujours apres
```

Le mécanisme exact par lequel un découpage aléatoire fabrique un bon score est plus subtil que « le test contient du passé », et le second exercice de cette leçon te fera construire la démonstration chiffrée. Retiens pour l'instant que l'écart n'est pas marginal : il se compte en facteurs, pas en pourcents.

## Au clavier

```python
import numpy as np, pandas as pd
from statsmodels.tsa.seasonal import STL
from statsmodels.tsa.stattools import adfuller, kpss

s = pd.read_csv("ventes.csv", parse_dates=["date"], index_col="date")["ventes"]
s = s.asfreq("MS")                                 # trous rendus visibles

h, m = 12, 12
train, test = s[:-h], s[-h:]

# 1. la reference a battre
mae = lambda p: np.mean(np.abs(test.values - np.asarray(p, float)))
echelle = np.mean(np.abs(train.values[m:] - train.values[:-m]))   # denominateur du MASE
print("MASE naif saisonnier :", round(mae(train.iloc[-m:].values) / echelle, 3))

# 2. la nature de la non-stationnarite
print("ADF       p =", round(adfuller(s.dropna())[1], 4))
print("KPSS 'ct' p =", round(kpss(s.dropna(), regression="ct", nlags="auto")[1], 4))

# 3. la decomposition, sans perdre les bords
STL(s.dropna(), period=m, robust=True).fit().plot()
```

Trois réflexes :

1. **Calcule les quatre références naïves avant tout modèle, et exprime tes scores en MASE.** Un modèle à MASE supérieur à 1 perd contre une ligne de code sans paramètre, et aucune sophistication ne rachète ça.
2. **Croise l'ADF et le KPSS « ct » avant de différencier.** Une tendance déterministe se retire, une racine unitaire se différencie — et sur-différencier se paie en variance et en autocorrélation négative au lag 1.
3. **Appelle `asfreq` dès le chargement.** Sans fréquence déclarée, `rolling(7)` compte des lignes et non des jours, et l'écart ne lève aucune erreur.
