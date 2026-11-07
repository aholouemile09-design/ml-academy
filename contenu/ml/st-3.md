Prophet est une bibliothèque open-source de Meta (Facebook) conçue pour les séries temporelles métier : elle gère automatiquement les tendances, les saisonnalités multiples, les jours fériés et les données manquantes — sans expertise statistique approfondie.

**Installation et format des données**
```python
pip install prophet

import pandas as pd
from prophet import Prophet

# Prophet exige deux colonnes : 'ds' (date) et 'y' (valeur)
df = pd.read_csv("ventes.csv", parse_dates=["date"])
df = df.rename(columns={"date": "ds", "ventes": "y"})

# Split train/test chronologique
train = df[df["ds"] < "2024-01-01"]
test  = df[df["ds"] >= "2024-01-01"]
```

**Modèle de base**
```python
model = Prophet(
    yearly_seasonality=True,    # saisonnalité annuelle
    weekly_seasonality=True,    # saisonnalité hebdomadaire
    daily_seasonality=False,    # désactivé si données non-horaires
    seasonality_mode="multiplicative",  # "additive" si l'amplitude est constante
    changepoint_prior_scale=0.05,       # flexibilité de la tendance (0.001 rigide - 0.5 flexible)
    seasonality_prior_scale=10,         # force de la saisonnalité
    interval_width=0.95,                # intervalle de confiance
)

model.fit(train)
```

**Prévisions**
```python
# Créer un dataframe futur
future = model.make_future_dataframe(periods=12, freq="MS")  # 12 mois en avant

forecast = model.predict(future)
print(forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(12))

# Visualisation intégrée
fig = model.plot(forecast)
fig2 = model.plot_components(forecast)  # trend + saisonnalités séparées
```

**Jours fériés et événements spéciaux**
```python
from prophet.make_holidays import make_holidays_df

# Jours fériés d'un pays
holidays = make_holidays_df(year_list=[2022, 2023, 2024], country="FR")
model = Prophet(holidays=holidays)

# Événements personnalisés (promotions, lancements)
custom_events = pd.DataFrame({
    "ds": ["2023-11-24", "2023-12-31"],
    "holiday": ["Black Friday", "Reveillon"],
    "lower_window": [-1, 0],  # jours avant
    "upper_window": [1, 1],   # jours après
})
model = Prophet(holidays=custom_events)
```

**Saisonnalités multiples personnalisées**
```python
model = Prophet(yearly_seasonality=False)  # désactiver la défaut
model.add_seasonality(name="yearly", period=365.25, fourier_order=10)
model.add_seasonality(name="monthly", period=30.5, fourier_order=5)
model.add_seasonality(name="quarterly", period=91.25, fourier_order=3)
```

**Régresseurs exogènes (variables explicatives)**
```python
# Ajouter une variable comme le prix ou la température
model = Prophet()
model.add_regressor("prix_moyen")
model.add_regressor("temperature")

model.fit(train)  # train doit avoir les colonnes "prix_moyen" et "temperature"

# future doit aussi contenir ces colonnes pour les périodes à prévoir
future["prix_moyen"] = prix_prevus
future["temperature"] = temp_prevues
```

**Évaluation cross-validation temporelle avec Prophet**
```python
from prophet.diagnostics import cross_validation, performance_metrics

# initial : taille du train initial
# period : intervalle entre les cutoffs
# horizon : fenêtre de prévision à évaluer
cv_results = cross_validation(
    model,
    initial="730 days",   # 2 ans de train minimum
    period="90 days",     # évaluer tous les 3 mois
    horizon="180 days",   # prévoir 6 mois en avant
    parallel="processes",
)

metrics = performance_metrics(cv_results)
print(metrics[["horizon", "mae", "rmse", "mape"]])
```

**Quand utiliser Prophet vs ARIMA ?**
| Critère | ARIMA/SARIMA | Prophet |
|--|--|--|
| Saisonnalités multiples | ❌ Difficile | ✅ Natif |
| Données manquantes | ❌ Problématique | ✅ Robuste |
| Jours fériés | ❌ Manuel | ✅ Natif |
| Interprétabilité | ✅ Solide | ✅ Très bonne |
| Séries très courtes | ✅ OK | ❌ Besoin de données |
| Automation/scale | Moyen | ✅ Conçu pour |
