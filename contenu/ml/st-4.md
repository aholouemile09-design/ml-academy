Les modèles ML (LightGBM, XGBoost) surpassent souvent ARIMA et Prophet sur les séries longues et complexes, à condition de construire les bonnes features temporelles. L'idée : transformer le problème en apprentissage supervisé classique.

**Principe : transformer une série temporelle en dataset tabulaire**
```
Date     | Ventes | lag_1 | lag_7 | lag_30 | rolling_mean_7 | mois | jour_semaine
---------|--------|-------|-------|--------|----------------|------|------------
2024-02  | 150    | 140   | 130   | 120    | 135            | 2    | 3
2024-03  | 160    | 150   | 140   | 125    | 148            | 3    | 6
```

**Feature engineering temporel**
```python
import pandas as pd
import numpy as np

def create_time_features(df, target_col="ventes", lags=[1, 7, 14, 30], windows=[7, 14, 30]):
    df = df.copy().sort_index()

    # Lags (valeurs passées)
    for lag in lags:
        df[f"lag_{lag}"] = df[target_col].shift(lag)

    # Rolling statistics
    for w in windows:
        df[f"rolling_mean_{w}"] = df[target_col].shift(1).rolling(w).mean()
        df[f"rolling_std_{w}"]  = df[target_col].shift(1).rolling(w).std()
        df[f"rolling_min_{w}"]  = df[target_col].shift(1).rolling(w).min()
        df[f"rolling_max_{w}"]  = df[target_col].shift(1).rolling(w).max()

    # Features calendaires
    df["annee"]        = df.index.year
    df["mois"]         = df.index.month
    df["trimestre"]    = df.index.quarter
    df["jour_semaine"] = df.index.dayofweek
    df["jour_annee"]   = df.index.dayofyear
    df["semaine"]      = df.index.isocalendar().week.astype(int)
    df["est_weekend"]  = (df.index.dayofweek >= 5).astype(int)

    # Encodage cyclique (mois 12 est proche de mois 1)
    df["mois_sin"] = np.sin(2 * np.pi * df["mois"] / 12)
    df["mois_cos"] = np.cos(2 * np.pi * df["mois"] / 12)
    df["jour_sin"] = np.sin(2 * np.pi * df["jour_semaine"] / 7)
    df["jour_cos"] = np.cos(2 * np.pi * df["jour_semaine"] / 7)

    df = df.dropna()  # supprimer les lignes avec NaN (dues aux lags)
    return df

df_features = create_time_features(df)
```

**Split temporel strict — aucun shuffle**
```python
cutoff = "2024-01-01"
train = df_features[df_features.index < cutoff]
test  = df_features[df_features.index >= cutoff]

feature_cols = [c for c in df_features.columns if c != "ventes"]
X_train, y_train = train[feature_cols], train["ventes"]
X_test,  y_test  = test[feature_cols],  test["ventes"]
```

**Entraîner LightGBM**
```python
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

model = lgb.LGBMRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    num_leaves=31,
    subsample=0.8,
    colsample_bytree=0.8,
    min_child_samples=20,
    random_state=42,
    n_jobs=-1,
)

callbacks = [lgb.early_stopping(50), lgb.log_evaluation(100)]
model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    callbacks=callbacks,
)

preds = model.predict(X_test)
print(f"MAE  : {mean_absolute_error(y_test, preds):.2f}")
print(f"RMSE : {np.sqrt(mean_squared_error(y_test, preds)):.2f}")
print(f"MAPE : {np.mean(np.abs((y_test - preds) / y_test)) * 100:.2f}%")
```

**Walk-forward validation (correct pour ML sur time series)**
```python
from sklearn.model_selection import TimeSeriesSplit
import numpy as np

tscv = TimeSeriesSplit(n_splits=5, gap=0)
mae_scores = []

for fold, (train_idx, val_idx) in enumerate(tscv.split(df_features)):
    X_tr = df_features.iloc[train_idx][feature_cols]
    y_tr = df_features.iloc[train_idx]["ventes"]
    X_vl = df_features.iloc[val_idx][feature_cols]
    y_vl = df_features.iloc[val_idx]["ventes"]

    m = lgb.LGBMRegressor(n_estimators=500, learning_rate=0.05, random_state=42)
    m.fit(X_tr, y_tr, eval_set=[(X_vl, y_vl)],
          callbacks=[lgb.early_stopping(30), lgb.log_evaluation(-1)])

    preds = m.predict(X_vl)
    mae = mean_absolute_error(y_vl, preds)
    mae_scores.append(mae)
    print(f"Fold {fold+1} MAE: {mae:.2f}")

print(f"\nMAE moyen: {np.mean(mae_scores):.2f} ± {np.std(mae_scores):.2f}")
```

**Comparaison des approches**
| Aspect | ARIMA/SARIMA | Prophet | LightGBM |
|--|--|--|--|
| Variables exogènes | Limité | Oui | ✅ Natif et puissant |
| Séries multiples (multi-store) | Difficile | Moyen | ✅ Excellent |
| Feature engineering | N/A | N/A | ✅ Contrôle total |
| Saisonnalités complexes | ❌ Limité | ✅ Bon | ✅ Via features |
| Interprétabilité | ✅ | ✅ | Via SHAP |
| Performance sur gros volumes | ❌ | Moyen | ✅ Très bon |

**Prévision multi-step (plusieurs périodes en avant)**
```python
# Stratégie "recursive" : utiliser les prédictions comme features pour les prédictions suivantes
history = df["ventes"].copy()
future_preds = []

for i in range(12):  # prévoir 12 mois
    # Reconstruire les features avec les données actuelles
    features = create_time_features(history.to_frame()).iloc[-1:][feature_cols]
    pred = model.predict(features)[0]
    future_preds.append(pred)
    # Ajouter la prédiction à l'historique pour le prochain pas
    next_date = history.index[-1] + pd.DateOffset(months=1)
    history[next_date] = pred

print("Prévisions 12 mois :", future_preds)
```
