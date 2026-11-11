Prophet est une bibliothèque de Meta conçue pour les séries temporelles métier : tendances, saisonnalités multiples, jours fériés et données manquantes, sans expertise statistique préalable. Pour s'en servir correctement il faut comprendre une chose, et elle n'est presque jamais dite.

## Prophet n'est pas un modèle de série temporelle, c'est un ajustement de courbe

Le modèle de Prophet est une somme de fonctions **du temps** :

```
y(t) = g(t) + s(t) + h(t) + ε
       │      │      │
       │      │      └── effet des jours speciaux
       │      └───────── saisonnalites (series de Fourier)
       └──────────────── tendance (lineaire par morceaux, ou logistique)
```

Regarde ce qui n'est **pas** dans cette équation : il n'y a aucun `y[t−1]`, aucun `y[t−7]`, aucune erreur passée. Le membre de droite ne contient que `t`. C'est un modèle additif généralisé — une régression sur le temps — et non un modèle de la dépendance temporelle des observations, comme l'est un ARIMA.

Cinq conséquences en découlent, et elles expliquent tout le comportement de l'outil.

**Prophet n'utilise pas l'autocorrélation.** Il ne sait pas que la valeur d'hier ressemble à celle d'aujourd'hui. Toute la régularité qu'il capte passe par la date : un jour de semaine, un jour de l'année, un jour férié.

**La prévision d'une date ne dépend presque pas de la dernière valeur observée.** `predict` ne reçoit qu'un tableau de dates : il n'y a pas de place pour `y` dans son entrée. Mesuré sur quatre ans de données quotidiennes, en ajoutant brutalement +80 aux sept derniers jours avant de réajuster :

```
choc de +80 sur la derniere semaine
-> la prevision des 7 jours suivants bouge de +13,52 en moyenne
```

Un modèle à retards aurait répercuté la quasi-totalité du choc ; Prophet en absorbe un sixième, parce que ces sept points ne pèsent que sept points dans une régression qui en compte 1 461.

Conséquence directe, mesurée sur les 20 derniers jours de la même série, chaque prévision à un jour étant faite avec tout l'historique disponible :

| Modèle | MAE à 1 jour |
|---|---|
| Prophet | 8,91 |
| **la valeur de la veille** | **7,25** |

**La référence naïve de la première leçon bat Prophet à horizon 1.** Ce n'est pas un accident de tirage, c'est la conséquence de l'équation : l'information la plus prédictive de demain est aujourd'hui, et Prophet ne la regarde pas.

**Les trous ne le gênent pas.** Une régression sur `t` n'a pas besoin d'observations régulièrement espacées : il lui suffit des couples (date, valeur) qui existent. C'est la raison technique de sa robustesse aux données manquantes, souvent présentée comme une qualité magique.

**La stationnarité ne le concerne pas.** Pas de test ADF, pas de différenciation, pas de `d` à choisir : la tendance est un terme du modèle, pas une nuisance à retirer.

**Ses résidus restent autocorrélés, et ce n'est pas un défaut.** Sur la même série, dont le bruit est un AR(1) de coefficient 0,7 — exactement le genre de structure qu'un ARIMA capte :

```
autocorrelation au lag 1 des residus de Prophet : 0,674
Ljung-Box sur ces residus (lag 10)              : p = 2e-238
```

Le modèle a laissé la totalité de la mémoire courte dans ses résidus, parce qu'il n'a aucun mécanisme pour la voir. Un ARIMA dans cet état serait déclaré incomplet ; un Prophet dans cet état fait ce pour quoi il est écrit. **Les deux outils ne promettent pas la même chose** — ARIMA promet d'épuiser la structure temporelle, Prophet de décomposer lisiblement un signal calendaire — et appliquer le critère de validation de l'un à l'autre n'a pas de sens.

**Le résumé de l'arbitrage** : Prophet achète la robustesse et la lisibilité en renonçant à la mémoire courte de la série. Sur un horizon de plusieurs semaines ou mois, où la mémoire courte ne sert plus à rien, c'est un excellent marché. Sur un horizon d'un ou deux pas, c'est un mauvais marché.

## Format et modèle de base

```python
pip install prophet

import pandas as pd
from prophet import Prophet

# Prophet exige exactement deux colonnes : 'ds' (date) et 'y' (valeur)
df = pd.read_csv("ventes.csv", parse_dates=["date"]).rename(
    columns={"date": "ds", "ventes": "y"})

train = df[df["ds"] <  "2025-01-01"]
test  = df[df["ds"] >= "2025-01-01"]

modele = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    daily_seasonality=False,            # inutile hors donnees intra-journalieres
    seasonality_mode="additive",        # "multiplicative" si l'amplitude suit le niveau
    changepoint_prior_scale=0.05,       # souplesse de la tendance
    interval_width=0.80,                # c'est la valeur par defaut, pas 0.95
)
modele.fit(train)

futur = modele.make_future_dataframe(periods=180, freq="D")
prevision = modele.predict(futur)
prevision[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail()
```

Deux détails du code qui comptent : `make_future_dataframe` renvoie **l'historique plus l'horizon**, pas seulement le futur — d'où le `tail()` pour ne lire que les dates nouvelles. Et `interval_width` vaut **0,80 par défaut** : un intervalle de Prophet non paramétré n'est pas à 95 %, et comparer un « intervalle Prophet » à un « IC 95 % d'ARIMA » sans le savoir fait conclure n'importe quoi.

## Les points de rupture ne sont cherchés que dans les 80 % premiers

La tendance de Prophet est linéaire **par morceaux** : il place des points de rupture candidats et laisse la régularisation décider lesquels sont utiles. Deux valeurs par défaut, et la seconde est un piège de premier ordre :

| Paramètre | Défaut | Effet |
|---|---|---|
| `n_changepoints` | 25 | nombre de ruptures candidates |
| `changepoint_range` | **0,8** | les 25 sont placées dans les **80 % premiers** de l'historique |
| `changepoint_prior_scale` | 0,05 | force de la régularisation sur les ruptures |

Ce n'est pas une approximation de documentation, ça se lit sur le modèle ajusté. Sur quatre ans de données quotidiennes (2022-01-01 à 2025-12-31) :

```python
m.changepoints          # 25 dates, de 2022-02-17 a 2025-03-13
```

La dernière rupture candidate tombe à **79,9 % de l'historique** : les neuf derniers mois et demi n'en contiennent aucune. **Le dernier cinquième de ton historique ne peut donc contenir aucune rupture de tendance** du point de vue du modèle. C'est délibéré — la documentation l'explique par la volonté de ne pas épouser les fluctuations de fin de série et de garder une tendance projetable — mais la conséquence est claire : **une inflexion récente est invisible, et c'est précisément l'inflexion qui compte le plus pour prévoir.**

Trois réponses, par ordre de préférence :

```python
# 1. declarer la rupture qu'on connait : toujours le meilleur choix
Prophet(changepoints=["2025-09-01"])

# 2. elargir la zone de recherche, si on soupconne une inflexion recente
Prophet(changepoint_range=0.95)

# 3. assouplir la tendance — a manier avec prudence, voir l'exercice
Prophet(changepoint_prior_scale=0.5)
```

Déclarer vaut mieux que chercher : si tu sais qu'un changement de gamme a eu lieu en septembre, l'écrire évite au modèle de le deviner. Le second exercice de cette leçon porte entièrement sur ce geste, et sur la distinction entre un événement qu'il faut déclarer et un événement qu'il faut au contraire retirer des données.

## L'intervalle de Prophet n'est pas de même nature que celui d'ARIMA

C'est une source de malentendu durable. L'intervalle d'un ARIMA se déduit analytiquement de la structure du modèle — la deuxième leçon montre qu'il plafonne pour `d=0` et croît en `√h` pour `d=1`. Celui de Prophet est **simulé**, et sur une hypothèse particulière : le futur connaîtra des changements de tendance **à la même fréquence et de la même ampleur** que ceux observés dans l'historique. Prophet projette cette distribution de ruptures et en tire des trajectoires.

Deux implications concrètes.

**L'intervalle dépend de `changepoint_prior_scale`.** Augmenter ce paramètre élargit l'intervalle, parce qu'on autorise davantage de ruptures futures. Ce n'est pas une mesure indépendante de l'incertitude : c'est une conséquence d'un choix de régularisation.

**L'incertitude de saisonnalité n'y est pas**, sauf demande explicite. Par défaut (`mcmc_samples=0`), Prophet estime les paramètres par maximum a posteriori et ne propage que l'incertitude de tendance et le bruit d'observation. Pour inclure celle des composantes saisonnières, il faut passer à l'échantillonnage bayésien complet :

```python
Prophet(mcmc_samples=200)        # inference complete : intervalle plus honnete, bien plus lent
```

Mesuré sur 400 points quotidiens, largeur moyenne de l'intervalle sur 60 jours de prévision :

| Inférence | Largeur IC80 | Temps |
|---|---|---|
| MAP (`mcmc_samples=0`, défaut) | 19,58 | 0,2 s |
| MCMC (`mcmc_samples=200`) | **21,72** | 5,3 s |

Onze pour cent d'intervalle en plus, pour vingt-six fois le temps de calcul — et sur une vraie série, avec davantage d'échantillons, l'écart est plus grand. **L'intervalle par défaut est donc optimiste**, d'autant plus que la saisonnalité est estimée sur peu de cycles.

## L'ordre de Fourier est le vrai bouton de la saisonnalité

`yearly_seasonality=True` n'est pas un interrupteur, c'est un raccourci vers un ordre de Fourier. Chaque saisonnalité est une somme de sinus et cosinus, et **un ordre `N` crée `2N` régresseurs** :

| Saisonnalité | Ordre par défaut | Régresseurs |
|---|---|---|
| annuelle | 10 | 20 |
| hebdomadaire | 3 | 6 |
| journalière | 4 | 8 |

Cela se vérifie sur le modèle ajusté, `m.seasonalities` listant chaque saisonnalité active avec sa période et son ordre — utile pour constater ce que `auto` a réellement décidé d'activer, qui dépend de la longueur et du pas de la série.

Un ordre élevé permet un profil saisonnier très découpé — et donc de surapprendre le bruit saisonnier. Un ordre faible lisse. C'est le réglage à faire quand la saisonnalité détectée paraît trop ondulée ou trop plate :

```python
modele = Prophet(yearly_seasonality=False, weekly_seasonality=True)
modele.add_seasonality(name="annuelle",   period=365.25, fourier_order=6)
modele.add_seasonality(name="mensuelle",  period=30.5,   fourier_order=3)
modele.add_seasonality(name="trimestre",  period=91.25,  fourier_order=2)
```

Et c'est ici que Prophet prend sa revanche sur SARIMA : **trois saisonnalités emboîtées coûtent 22 colonnes de régression**, là où la deuxième leçon montre qu'un seul `seasonal_order` à `m = 52` coûte déjà 8,6 secondes et un avertissement de convergence.

Une saisonnalité peut aussi être **conditionnelle** — un profil hebdomadaire différent en haute et basse saison :

```python
train["haute_saison"] = train["ds"].dt.month.isin([6, 7, 8])
train["basse_saison"] = ~train["haute_saison"]
modele.add_seasonality("hebdo_haute", period=7, fourier_order=3, condition_name="haute_saison")
modele.add_seasonality("hebdo_basse", period=7, fourier_order=3, condition_name="basse_saison")
```

## Jours fériés, événements, et croissance saturante

```python
# les feries d'un pays, en une ligne
modele = Prophet()
modele.add_country_holidays(country_name="FR")

# des evenements maison, avec leur fenetre d'influence
evenements = pd.DataFrame({
    "holiday":      ["black_friday", "soldes_hiver"],
    "ds":           pd.to_datetime(["2025-11-28", "2026-01-07"]),
    "lower_window": [-2, 0],      # jours avant pris dans l'effet
    "upper_window": [ 1, 28],     # jours apres
})
modele = Prophet(holidays=evenements)
```

`lower_window` et `upper_window` sont ce qui distingue un vrai modèle d'événement d'un simple indicateur : un Black Friday influence les deux jours qui le précèdent, des soldes d'hiver durent quatre semaines. Chaque jour de la fenêtre reçoit son propre coefficient.

Pour une série qui **sature** — pénétration d'un marché, adoption d'un produit —, la tendance linéaire par morceaux extrapole une croissance infinie. La croissance logistique y répond, et elle exige une colonne de plafond **dans l'historique et dans le futur** :

```python
train["cap"] = 100_000            # plafond, dans la meme unite que y
futur["cap"] = 100_000            # obligatoire aussi ici, sinon erreur
modele = Prophet(growth="logistic").fit(train)
```

Le plafond n'est pas estimé, **il est fourni** : c'est une connaissance métier (taille du marché adressable, capacité de production), pas un paramètre. Un `floor` existe symétriquement.

## Les régresseurs exogènes, même contrainte que SARIMAX

```python
modele = Prophet()
modele.add_regressor("prix_moyen")
modele.add_regressor("temperature")
modele.fit(train)                 # train contient les deux colonnes

futur["prix_moyen"]  = prix_planifies
futur["temperature"] = temperatures_prevues    # ... et il faut bien les avoir
```

La documentation est explicite : un régresseur additionnel doit être connu **pour l'historique et pour les dates futures**. C'est exactement la contrainte vue avec SARIMAX, et la même hiérarchie s'applique — le calendrier et les prix que tu décides sont de bons régresseurs, la météo en est un mauvais parce qu'il faut la prévoir et empiler les erreurs.

## La validation croisée de Prophet, et ce qu'elle coûte

```python
from prophet.diagnostics import cross_validation, performance_metrics

cv = cross_validation(
    modele,
    initial="730 days",    # taille du premier entrainement
    period="90 days",      # pas entre deux dates de coupure
    horizon="180 days",    # profondeur de prevision evaluee
)
metriques = performance_metrics(cv)
print(metriques[["horizon", "mae", "rmse", "mape"]])
```

Trois choses à savoir avant de la lancer.

**Elle réajuste un modèle complet à chaque date de coupure.** Le nombre de coupures vaut à peu près `(longueur − initial − horizon) / period` : sur cinq ans de données quotidiennes avec ces réglages, cela fait une douzaine d'ajustements. Avec `mcmc_samples=300`, c'est une douzaine de sessions MCMC.

**Elle donne les métriques par horizon**, et c'est sa vraie valeur : la colonne `horizon` de `performance_metrics` répond à la question de la première leçon — à quel horizon ce modèle cesse-t-il d'être utile ? Ne l'agrège pas en un seul chiffre.

**`period` ne doit pas être plus petit que nécessaire.** Des coupures trop rapprochées produisent des plis qui se recouvrent largement, donc des scores corrélés : la dispersion entre plis paraît plus faible qu'elle ne l'est.

## Prophet ou ARIMA

| Critère | ARIMA / SARIMA | Prophet |
|---|---|---|
| Saisonnalités multiples | une seule praticable | natif, quelques colonnes |
| Données manquantes, pas irrégulier | problématique | sans effet |
| Jours fériés et fenêtres d'effet | à construire en exogène | natif |
| Mémoire courte de la série | **utilisée** | **ignorée** |
| Horizon 1 à 2 pas | avantage ARIMA | faible |
| Horizon long, signal calendaire | correct | avantage Prophet |
| Nature de l'intervalle | déduit du modèle | simulé, hors saisonnalité par défaut |
| Séries courtes | utilisable | demande de l'historique |
| Industrialisation sur beaucoup de séries | un diagnostic par série | conçu pour |

Le critère décisif n'est pas dans la colonne des scores, c'est la ligne « mémoire courte ». Si ton horizon est de un ou deux pas, prends un modèle qui regarde la dernière valeur. Si ton horizon est de plusieurs semaines et que ton signal est calendaire, Prophet est taillé pour.

## Au clavier

```python
import pandas as pd
from prophet import Prophet
from prophet.diagnostics import cross_validation, performance_metrics

df = donnees.rename(columns={"date": "ds", "ventes": "y"})

m = Prophet(
    changepoint_range=0.95,          # une inflexion recente reste visible
    changepoint_prior_scale=0.05,
    seasonality_mode="multiplicative",
    interval_width=0.80,
)
m.add_country_holidays(country_name="FR")
m.add_seasonality(name="annuelle", period=365.25, fourier_order=6)
m.fit(df)

# l'erreur PAR horizon, jamais agregee
cv = cross_validation(m, initial="730 days", period="180 days", horizon="90 days")
print(performance_metrics(cv)[["horizon", "mae", "mape"]].head())

m.plot_components(m.predict(m.make_future_dataframe(periods=90)))
```

Trois réflexes :

1. **Rappelle-toi qu'aucun `y[t−1]` n'entre dans le modèle.** Prophet prévoit une date, pas une suite. À horizon court, compare-le toujours à la référence naïve de la première leçon : il lui arrive de perdre.
2. **Monte `changepoint_range` ou déclare tes ruptures.** Par défaut, les 25 points de rupture candidats vivent dans les 80 % premiers de l'historique, donc toute inflexion du dernier cinquième est hors de portée du modèle.
3. **Lis les métriques par horizon, et sache ce que vaut l'intervalle.** `interval_width` est à 0,80 par défaut, l'incertitude de saisonnalité en est absente sans `mcmc_samples`, et sa largeur dépend du `changepoint_prior_scale` que tu as choisi.
