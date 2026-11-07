ARIMA (AutoRegressive Integrated Moving Average) est le modèle statistique de référence pour les séries temporelles univariées. Il combine trois mécanismes : autorégression, différenciation, et moyennes mobiles.

**Notation ARIMA(p, d, q)**
| Paramètre | Signification | Comment le choisir |
|--|--|--|
| **p** | Ordre AR — combien de lags passés inclure | PACF : dernier lag significatif |
| **d** | Degré de différenciation | 1 si tendance, 2 si tendance dans la tendance |
| **q** | Ordre MA — combien d'erreurs passées inclure | ACF : dernier lag significatif |

**Sélection automatique avec pmdarima (auto_arima)**
```python
import pmdarima as pm

# auto_arima cherche le meilleur (p,d,q) via AIC/BIC
model = pm.auto_arima(
    train["ventes"],
    seasonal=False,       # True si saisonnalité (utilise SARIMA)
    stepwise=True,        # plus rapide que grid search exhaustif
    information_criterion="aic",
    trace=True,           # affiche les modèles testés
    error_action="ignore",
    suppress_warnings=True,
)

print(model.summary())
```

**ARIMA manuel**
```python
from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(train["ventes"], order=(2, 1, 2))
result = model.fit()
print(result.summary())

# Prévision sur h périodes en avant
forecast = result.get_forecast(steps=12)
pred_mean = forecast.predicted_mean
pred_ci   = forecast.conf_int(alpha=0.05)  # intervalle de confiance 95%

# Visualisation
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 4))
plt.plot(train["ventes"], label="Train")
plt.plot(test["ventes"], label="Test", color="green")
plt.plot(pred_mean, label="Prévision", color="red")
plt.fill_between(pred_ci.index, pred_ci.iloc[:, 0], pred_ci.iloc[:, 1],
                 alpha=0.2, color="red", label="IC 95%")
plt.legend()
plt.show()
```

**SARIMA — ARIMA avec saisonnalité**

Notation SARIMA(p, d, q)(P, D, Q, m) où m = période saisonnière (12 pour mensuel, 7 pour hebdomadaire) :
```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

model = SARIMAX(
    train["ventes"],
    order=(1, 1, 1),           # partie non-saisonnière
    seasonal_order=(1, 1, 1, 12)  # partie saisonnière, m=12 (mensuel)
)
result = model.fit(disp=False)
```

**Auto-sélection avec saisonnalité**
```python
model = pm.auto_arima(
    train["ventes"],
    seasonal=True,
    m=12,          # périodicité mensuelle
    stepwise=True,
    trace=True,
)
```

**Diagnostic des résidus — valider un modèle ARIMA**
```python
result.plot_diagnostics(figsize=(14, 8))
plt.tight_layout()
# ✅ Bon modèle : résidus ~ bruit blanc (ACF plat, distribution ~normale, Ljung-Box non significatif)
plt.show()

# Test Ljung-Box (H0 : les résidus sont du bruit blanc)
from statsmodels.stats.diagnostic import acorr_ljungbox
lb = acorr_ljungbox(result.resid, lags=10, return_df=True)
print(lb)
# p-value > 0.05 partout → pas d'autocorrélation résiduelle → ✅
```

**Limites d'ARIMA**
- Univarié par défaut (une seule série à la fois) — SARIMAX permet d'ajouter des régresseurs exogènes
- Suppose une relation linéaire entre passé et futur
- Sensible aux données manquantes et aux outliers
- Peu adapté aux séries très longues avec plusieurs saisonnalités imbriquées → Prophet est plus adapté
