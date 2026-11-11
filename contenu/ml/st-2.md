ARIMA (*AutoRegressive Integrated Moving Average*) est le modèle statistique de référence pour une série temporelle univariée. Il combine trois mécanismes, et la plupart des erreurs d'usage viennent de ce qu'on sait réciter la notation sans savoir ce que chaque lettre fait au résultat.

## Les trois mécanismes, et la différence entre AR et MA

**AR(p) — autorégression.** La valeur du moment se régresse sur ses propres valeurs passées :

```
y[t] = c + φ₁·y[t−1] + φ₂·y[t−2] + … + φₚ·y[t−p] + ε[t]
```

**MA(q) — moyenne mobile.** La valeur se régresse sur les **erreurs** passées :

```
y[t] = μ + ε[t] + θ₁·ε[t−1] + … + θ_q·ε[t−q]
```

**I(d) — intégration.** On ne modélise pas `y` mais sa différence d'ordre `d`, puis on recompose.

| Paramètre | Signification | Où le lire |
|---|---|---|
| **p** | ordre AR, combien de valeurs passées | PACF |
| **d** | nombre de différenciations | tests de stationnarité |
| **q** | ordre MA, combien d'erreurs passées | ACF |

La différence entre AR et MA n'est pas cosmétique, et elle explique un comportement qu'on rencontre vite : **les `y[t−i]` d'un AR sont observés, les `ε[t−i]` d'un MA ne le sont pas.** Une erreur passée n'est pas une donnée, c'est l'écart entre une observation et une prédiction qui dépend elle-même des paramètres qu'on cherche.

Conséquence directe : un AR pur s'estime par moindres carrés ordinaires, alors qu'un modèle contenant une partie MA **n'a pas de solution analytique** et demande un maximum de vraisemblance itératif. C'est pour ça qu'un `q` élevé coûte cher en temps, lève des avertissements de convergence, et donne parfois des coefficients instables d'un ajustement à l'autre.

## À long horizon, un ARIMA ne prévoit presque rien — et c'est `d` qui décide quoi

Voilà le point le plus utile de la leçon, et il est presque toujours absent des tutoriels.

**Avec `d = 0`, la prévision converge vers la moyenne.** Mesuré sur un AR(1) de coefficient 0,8 et de moyenne 50, ajusté sur 400 points dont la dernière vaut 50,664 :

| Horizon | Prévision |
|---|---|
| 1 | 50,482 |
| 2 | 50,339 |
| 5 | 50,070 |
| 10 | 49,893 |
| 30 | 49,819 |
| 200 | 49,818 |

À partir de l'horizon 30, le modèle répond la moyenne estimée (49,818) et rien d'autre. Ce n'est pas un défaut d'implémentation, c'est la propriété d'un processus stationnaire : la mémoire de la dernière observation décroît en `φʰ`, et `0,8³⁰ ≈ 0,001`.

**L'intervalle de confiance plafonne au même endroit** :

```
h=  1  largeur IC95 = 3,900
h=  5  largeur IC95 = 6,008
h= 20  largeur IC95 = 6,293
h=200  largeur IC95 = 6,293
```

La valeur du plateau est `2 × 1,96 × σ / √(1 − φ²)` = 6,293 avec les coefficients estimés — exactement la largeur mesurée. Autrement dit : **au-delà d'une trentaine de pas, le modèle dit « la moyenne, à plus ou moins l'écart-type historique »**, ce que n'importe qui pouvait dire sans lui.

**Avec `d = 1`, la prévision est plate au niveau de la dernière valeur.** Un ARIMA(0,1,0) est une marche aléatoire :

```
derniere observation   : 191,60
prevision h=1          : 191,60
prevision h=50         : 191,60
```

Et là, l'intervalle **ne plafonne pas** : il s'élargit exactement comme `√h`. Mesuré :

| Horizon | Largeur IC95 | Largeur / √h |
|---|---|---|
| 1 | 3,920 | 3,920 |
| 4 | 7,841 | 3,920 |
| 16 | 15,681 | 3,920 |
| 100 | 39,203 | 3,920 |

Le rapport est constant à la troisième décimale. La variance d'une marche aléatoire s'accumule linéairement, donc l'incertitude croît en racine carrée du temps, indéfiniment. C'est honnête, et c'est brutal : prévoir à 100 pas coûte dix fois l'incertitude de prévoir à 1 pas.

**Avec `d = 1` et une dérive**, la prévision est une droite :

```python
ARIMA(serie, order=(0,1,0), trend="n")   # plat   : h=1 191,60   h=50 191,60
ARIMA(serie, order=(0,1,0), trend="t")   # droite : h=1 191,90   h=50 206,93
```

**Retiens la conséquence pratique** : le choix de `d` n'est pas qu'une formalité de stationnarité, **il fixe la forme de ta prévision à long terme** — retour à la moyenne, plateau à la dernière valeur, ou droite. Si cette forme ne correspond pas à ce que tu sais de ton métier, aucun réglage de `p` et `q` ne la corrigera.

## L'AIC ne compare pas des modèles de `d` différents

Erreur fréquente, et rien ne t'avertit. Mesuré sur la même série de 400 points :

```
ARIMA(1,0,0)  AIC = 1137.99   nobs = 400
ARIMA(1,1,0)  AIC = 1174.37   nobs = 400
```

La tentation est de conclure que `d=0` est meilleur de 36 points d'AIC. C'est invalide : **la vraisemblance du second modèle est celle de la série différenciée**, pas celle de la série de départ. Les deux nombres décrivent la probabilité de deux variables aléatoires différentes, et leur écart ne mesure rien.

Le piège est d'autant plus efficace que statsmodels affiche `nobs = 400` dans les deux cas — aucun signal visible ne distingue les deux situations.

**La procédure correcte, et c'est celle qu'`auto_arima` applique en interne** : fixer `d` d'abord, par les tests de stationnarité et la lecture de l'ACF ; **ensuite seulement** comparer les `(p, q)` par AIC, à `d` constant. D'où une règle d'usage : ne donne jamais à une recherche automatique une grille qui balaie `d` en même temps que `p` et `q`.

```python
import pmdarima as pm

modele = pm.auto_arima(
    train, seasonal=True, m=12,
    test="adf",               # d choisi par test, pas par AIC
    information_criterion="aic",
    stepwise=True, suppress_warnings=True,
)
print(modele.order, modele.seasonal_order)
```

## SARIMAX et les régresseurs exogènes : il faut le futur du régresseur

SARIMAX ajoute des variables explicatives. C'est séduisant — « j'ajoute la température » — et ça bute immédiatement sur un mur que personne n'annonce.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

m = SARIMAX(train, exog=X_train, order=(1,0,0), trend="c").fit(disp=False)
m.get_forecast(steps=10)       # sans exog futur
```

```
ValueError: Out-of-sample operations in a model with a regression component
require additional exogenous values via the `exog` argument.
```

**Pour prévoir avec un régresseur, il faut la valeur future du régresseur.** Et si tu ne l'as pas, il faut la prévoir — donc empiler une prévision sur une prévision, et additionner les deux erreurs. Un modèle de ventes nourri d'une prévision météo à dix jours hérite de l'incertitude de la météo, que son intervalle de confiance **n'inclut pas** : il suppose les exogènes connus.

D'où la hiérarchie des bons régresseurs exogènes :

| Régresseur | Futur connu ? | Verdict |
|---|---|---|
| calendrier, jours fériés | oui, par construction | idéal |
| promotion planifiée, prix que tu fixes | oui, c'est une décision | idéal |
| nombre de jours ouvrés, vacances scolaires | oui, publié à l'avance | idéal |
| météo, trafic, cours d'une matière première | non, à prévoir | à éviter, ou assumer l'erreur empilée |
| une autre série de ton système | non | à éviter |

La question à se poser pour chaque variable est donc la même que pour toute fuite : **est-ce que je connaîtrai cette valeur au moment où je devrai prévoir ?** Pour un régresseur exogène, « au moment de prévoir » veut dire pour **toutes** les dates de l'horizon, pas seulement pour aujourd'hui.

## `m` est un nombre d'observations par cycle, et au-delà de 24 ça casse

`m` n'est pas « 12 parce que c'est mensuel ». C'est le **nombre d'observations qui composent un cycle** :

| Données | Cycle | m |
|---|---|---|
| mensuelles | annuel | 12 |
| trimestrielles | annuel | 4 |
| quotidiennes | hebdomadaire | 7 |
| horaires | journalier | 24 |
| hebdomadaires | annuel | 52 |
| quotidiennes | annuel | **365** |

Les deux dernières lignes sont le problème. Un `m` grand coûte deux choses, et les deux se mesurent.

**Le temps de calcul.** Mesuré sur 156 observations hebdomadaires, même série, même `order=(1,1,1)` :

```
seasonal_order=(0,0,0,0)     0,02 s   AIC = 1021,77
seasonal_order=(1,1,1,52)    8,61 s   AIC =  681,01   + UserWarning
```

Un facteur **430** sur le temps, et un avertissement. L'espace d'état d'un SARIMA a une dimension qui croît avec `m` : à `m = 365`, l'ajustement n'est plus praticable.

**Les observations perdues.** Une différenciation saisonnière `D = 1` avec `m = 52` consomme 52 observations. Sur trois ans de données hebdomadaires :

```
156 semaines, D=1 avec m=52  ->  104 observations exploitables
```

Un tiers de l'historique est parti pour estimer une saisonnalité qu'on n'a donc vue que deux fois.

**La parade : des termes de Fourier en exogène**, qui remplacent la partie saisonnière par quelques sinus et cosinus. Mesuré sur 1 095 points quotidiens avec un cycle annuel :

```python
def fourier(idx, periode, K):
    t = idx.dayofyear.to_numpy()
    return pd.DataFrame(
        {f"{f}{k}": g(2*np.pi*k*t/periode)
         for k in range(1, K+1) for f, g in (("sin", np.sin), ("cos", np.cos))},
        index=idx)

X = fourier(jours, periode=365, K=3)                        # 6 colonnes
SARIMAX(y, exog=X, order=(1,0,0), trend="c").fit(disp=False)
```

```
SARIMAX(1,0,0) + 6 termes de Fourier, m=365 : 0,12 s
```

Six colonnes et un dixième de seconde, là où un `seasonal_order` à `m = 365` est hors de portée. `K` contrôle la finesse du profil saisonnier : 1 donne une seule ondulation annuelle, 10 permet des motifs très découpés. Il se choisit par AIC, lui — à `d` constant.

## Ce que veut dire un `ConvergenceWarning`

```
ConvergenceWarning: Maximum Likelihood optimization failed to converge.
```

L'optimiseur a atteint sa limite d'itérations sans stabiliser les paramètres. Les coefficients affichés **ne sont pas ceux du maximum de vraisemblance**, et le modèle est à prendre comme non ajusté, pas comme approximativement ajusté.

Les causes, par fréquence :

- **trop de paramètres pour la quantité de données** — un `(2,1,2)(1,1,1,12)` sur 60 points mensuels demande 8 paramètres pour 48 observations utiles après différenciations ;
- **une série mal échelonnée** : des valeurs en millions font travailler l'optimiseur sur des gradients minuscules, diviser par 1 000 suffit souvent ;
- **une saisonnalité absente qu'on impose quand même** ;
- **des valeurs aberrantes** qui tirent la vraisemblance.

Deux garde-fous utiles, activés par défaut dans SARIMAX et qu'il vaut mieux laisser ainsi : `enforce_stationarity=True` et `enforce_invertibility=True` contraignent les coefficients à la région où le modèle est bien défini. Les désactiver pour « faire passer » un ajustement produit un modèle dont les prévisions peuvent diverger.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

resultat = SARIMAX(train, order=(1,1,1), seasonal_order=(1,1,1,12)).fit(
    disp=False, maxiter=200)          # plus d'iterations avant d'abandonner
print(resultat.mle_retvals["converged"])
resultat.plot_diagnostics(figsize=(14, 8))
```

Le diagnostic graphique et le test de Ljung-Box sur les résidus sont l'étape de validation, et le premier exercice de cette leçon y est entièrement consacré — n'y coupe pas.

## Prévoir, avec l'intervalle

```python
prev = resultat.get_forecast(steps=12)
moyenne = prev.predicted_mean
bornes  = prev.conf_int(alpha=0.05)          # IC 95 %

plt.plot(train.index, train, label="train")
plt.plot(test.index,  test,  label="reel")
plt.plot(moyenne.index, moyenne, label="prevision")
plt.fill_between(bornes.index, bornes.iloc[:, 0], bornes.iloc[:, 1], alpha=0.2)
plt.legend()
```

## Les limites d'ARIMA, dites honnêtement

- **Univarié par nature.** SARIMAX ajoute des exogènes, au prix décrit plus haut.
- **Linéaire.** La relation entre passé et futur est une combinaison linéaire ; un effet de seuil ou de saturation lui échappe.
- **Une seule saisonnalité praticable.** Des données horaires ont trois cycles emboîtés (24 h, 168 h, 8 766 h) ; SARIMA en gère un.
- **Un modèle par série.** Cinq cents magasins, cinq cents ajustements, cinq cents diagnostics à surveiller.
- **Sensible aux trous et aux aberrations**, qui faussent l'estimation au lieu d'être absorbées.

Et en face, ce qu'aucun des deux modèles suivants ne fait aussi bien : **un intervalle de prévision dérivé du modèle lui-même**, dont les deux tableaux de la deuxième section montrent qu'il est cohérent avec la structure de la série, et pas simulé.

## Au clavier

```python
import numpy as np, pandas as pd, warnings
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.stattools import adfuller

s = serie.asfreq("MS")
coupe = int(len(s) * 0.8)
train, test = s[:coupe], s[coupe:]

# 1. d d'abord, par test — jamais par AIC
d = 0 if adfuller(train.dropna())[1] < 0.05 else 1

# 2. (p,q) ensuite, a d constant
meilleur = min(
    ((p, q) for p in range(3) for q in range(3)),
    key=lambda pq: SARIMAX(train, order=(pq[0], d, pq[1]),
                           seasonal_order=(1, 1, 1, 12)).fit(disp=False).aic,
)
print("ordres retenus :", meilleur, "avec d =", d)

# 3. la forme de la prevision longue, a verifier avant de livrer
r = SARIMAX(train, order=(meilleur[0], d, meilleur[1]),
            seasonal_order=(1, 1, 1, 12)).fit(disp=False)
print(r.get_forecast(steps=60).predicted_mean.iloc[[0, 11, 59]].round(2).to_string())
```

Trois réflexes :

1. **Regarde la prévision à long horizon avant de livrer.** `d = 0` revient à la moyenne en une trentaine de pas, `d = 1` reste plat à la dernière valeur, `d = 1` avec dérive trace une droite. Si cette forme contredit ce que tu sais du métier, c'est `d` qu'il faut rediscuter, pas `p` ni `q`.
2. **Ne compare jamais des AIC de `d` différents.** Fixe `d` par les tests, puis compare `(p, q)` à `d` constant — rien ne t'avertira, et statsmodels affiche le même `nobs` dans les deux cas.
3. **Un régresseur exogène dont tu ne connais pas le futur n'est pas utilisable.** Calendrier, jours fériés, prix et promotions que tu décides : oui. Météo, trafic, autre série : tu empiles deux erreurs et ton intervalle n'en montre qu'une.
