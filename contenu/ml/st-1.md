Une série temporelle est une séquence de valeurs indexées dans le temps. Ce qui la distingue d'un dataset classique : l'**ordre temporel** est une information en soi, et les observations ne sont pas indépendantes entre elles.

**Composantes d'une série temporelle**
| Composante | Description | Exemple |
|--|--|--|
| **Tendance** (Trend) | Direction à long terme | Chiffre d'affaires croissant |
| **Saisonnalité** (Seasonality) | Cycle répétitif à période fixe | Pics de ventes en décembre |
| **Résidus** (Residuals) | Bruit aléatoire | Fluctuations imprévisibles |
| **Cyclicité** | Oscillations à période variable | Cycles économiques |

**Décomposition avec statsmodels**
```python
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose

# Charger et indexer
df = pd.read_csv("ventes.csv", parse_dates=["date"], index_col="date")
df = df.asfreq("MS")  # fréquence mensuelle, début de mois

# Décomposition additive (ou multiplicative si la saisonnalité amplifie la tendance)
decomp = seasonal_decompose(df["ventes"], model="additive")
decomp.plot()
plt.tight_layout()
plt.show()

# Accéder aux composantes
trend    = decomp.trend
seasonal = decomp.seasonal
residual = decomp.resid
```

**Stationnarité — pourquoi c'est crucial**

Un processus est **stationnaire** si sa moyenne, sa variance et son autocovariance ne changent pas dans le temps. La plupart des modèles statistiques (ARIMA) supposent la stationnarité.

Test de Dickey-Fuller augmenté (ADF) :
```python
from statsmodels.tsa.stattools import adfuller

result = adfuller(df["ventes"])
print(f"ADF Statistic: {result[0]:.4f}")
print(f"p-value: {result[1]:.4f}")
# p < 0.05 → la série est stationnaire (on rejette H0 de racine unitaire)

# Si non-stationnaire → différencier
df["ventes_diff"] = df["ventes"].diff().dropna()
adfuller(df["ventes_diff"])  # re-tester après différenciation
```

**Autocorrélation — la mémoire de la série**
```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

fig, axes = plt.subplots(1, 2, figsize=(14, 4))
plot_acf(df["ventes"].dropna(), lags=36, ax=axes[0])
plot_pacf(df["ventes"].dropna(), lags=36, ax=axes[1])
plt.tight_layout()
plt.show()
# ACF : corrélation avec les lags 1, 2, ..., k
# PACF : corrélation "pure" avec lag k, en contrôlant les lags intermédiaires
```

**Validation temporelle — la règle absolue**

En séries temporelles, **on ne shuffle jamais les données** avant de splitter :
```python
# ✅ Correct : split chronologique
n = len(df)
train = df.iloc[:int(n * 0.8)]
test  = df.iloc[int(n * 0.8):]

# ❌ Interdit : shuffle aléatoire (data leakage temporel)
# from sklearn.model_selection import train_test_split
# train, test = train_test_split(df, test_size=0.2)  → FAUX
```

**Walk-forward validation (Time Series Cross-Validation)**
```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for fold, (train_idx, val_idx) in enumerate(tscv.split(df)):
    X_train, X_val = df.iloc[train_idx], df.iloc[val_idx]
    # Entraîner sur train → évaluer sur val
    # Chaque fold agrandit la fenêtre d'entraînement
    print(f"Fold {fold+1}: train={len(X_train)}, val={len(X_val)}")
```

**Métriques adaptées aux séries temporelles**
```python
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

y_true = test["ventes"].values
y_pred = model_predictions

mae  = mean_absolute_error(y_true, y_pred)
rmse = np.sqrt(mean_squared_error(y_true, y_pred))
mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100  # % d'erreur

print(f"MAE : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"MAPE : {mape:.2f}%")
```
