XGBoost et LightGBM dominent les compétitions Kaggle et les projets ML en production sur données tabulaires. Ils surpassent régulièrement les réseaux de neurones quand les données sont structurées (tableaux). Les maîtriser est non négociable pour un ML Engineer.

**Pourquoi le Gradient Boosting est si puissant ?**

Chaque arbre apprend à corriger les **résidus** (erreurs) de l'ensemble précédent. Au lieu d'entraîner des arbres indépendants (Random Forest), on les construit séquentiellement, chacun ciblant ce que les précédents ont raté.

```
Prédiction finale = arbre_1 + lr×arbre_2 + lr×arbre_3 + ... + lr×arbre_N
```
où lr = learning_rate (taux d'apprentissage, typiquement 0.01–0.1).

**XGBoost — installation et usage de base**
```python
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

model = xgb.XGBClassifier(
    n_estimators=1000,        # nombre max d'arbres
    learning_rate=0.05,       # faible = plus robuste mais plus lent
    max_depth=6,              # profondeur max de chaque arbre (3-10)
    subsample=0.8,            # fraction d'exemples par arbre (anti-overfit)
    colsample_bytree=0.8,     # fraction de features par arbre (anti-overfit)
    min_child_weight=1,       # poids min d'un nœud feuille (régularisation)
    gamma=0,                  # gain min pour split (régularisation)
    reg_alpha=0,              # L1 regularisation
    reg_lambda=1,             # L2 regularisation
    eval_metric="auc",
    early_stopping_rounds=50, # arrêt si pas d'amélioration pendant 50 rounds
    random_state=42,
    n_jobs=-1,
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    verbose=100,
)

print(f"Best iteration: {model.best_iteration}")
print(f"Val AUC: {roc_auc_score(y_val, model.predict_proba(X_val)[:, 1]):.4f}")
```

**Early stopping — le paramètre le plus important**
```python
# Sans early stopping : risque de surapprentissage si n_estimators trop grand
# Avec early stopping : le modèle s'arrête automatiquement quand la performance
# sur le validation set ne s'améliore plus depuis N rounds
# → n_estimators devient le maximum, pas la valeur fixe
```

**LightGBM — plus rapide, aussi performant**
```python
import lightgbm as lgb

model_lgb = lgb.LGBMClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=-1,           # -1 = pas de limite (LightGBM utilise num_leaves)
    num_leaves=31,          # paramètre clé de LightGBM (complexité de l'arbre)
    subsample=0.8,
    colsample_bytree=0.8,
    min_child_samples=20,   # équivalent min_child_weight pour LightGBM
    reg_alpha=0,
    reg_lambda=1,
    random_state=42,
    n_jobs=-1,
)

callbacks = [lgb.early_stopping(50), lgb.log_evaluation(100)]
model_lgb.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    callbacks=callbacks,
)
```

**XGBoost vs LightGBM — quand choisir lequel ?**
| | XGBoost | LightGBM |
|--|---------|----------|
| Vitesse | Plus lent | **Beaucoup plus rapide** |
| Mémoire | Plus consommatrice | **Moins gourmand** |
| Petits datasets | ✅ Très bon | Bon |
| Grands datasets | Bon | **Excellent** |
| Stratégie de split | Depth-wise | **Leaf-wise** (plus précis) |
| Défaut | LightGBM peut overfit sur petits datasets si num_leaves trop élevé | |

**Feature importance — quelles variables comptent ?**
```python
import pandas as pd
import matplotlib.pyplot as plt

# Importance par gain (recommandée)
importance = pd.Series(
    model.get_booster().get_score(importance_type="gain"),
    name="importance"
).sort_values(ascending=False)

importance.head(20).plot(kind="barh", figsize=(8, 8))
plt.title("Feature Importance (Gain)")
plt.tight_layout()
plt.show()
```

**SHAP values — aller plus loin que l'importance globale**
```python
import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_val)

# Importance globale (direction incluse)
shap.summary_plot(shap_values, X_val)

# Explication d'une prédiction individuelle
shap.waterfall_plot(explainer(X_val)[0])

# Dépendance d'une feature spécifique
shap.dependence_plot("revenu", shap_values, X_val)
```

**Hyperparameter tuning avec Optuna**

GridSearchCV est trop lent pour XGBoost (espace immense). Optuna utilise une recherche bayésienne intelligente — il apprend quelles zones sont prometteuses.

```python
import optuna

def objective(trial):
    params = {
        "n_estimators": 1000,
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3, log=True),
        "max_depth": trial.suggest_int("max_depth", 3, 10),
        "subsample": trial.suggest_float("subsample", 0.5, 1.0),
        "colsample_bytree": trial.suggest_float("colsample_bytree", 0.5, 1.0),
        "min_child_weight": trial.suggest_int("min_child_weight", 1, 10),
        "reg_alpha": trial.suggest_float("reg_alpha", 1e-8, 10, log=True),
        "reg_lambda": trial.suggest_float("reg_lambda", 1e-8, 10, log=True),
        "early_stopping_rounds": 50,
        "eval_metric": "auc",
        "random_state": 42,
        "n_jobs": -1,
    }

    model = xgb.XGBClassifier(**params)
    model.fit(
        X_train, y_train,
        eval_set=[(X_val, y_val)],
        verbose=False,
    )

    preds = model.predict_proba(X_val)[:, 1]
    return roc_auc_score(y_val, preds)

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=100, show_progress_bar=True)

print("Best params:", study.best_params)
print("Best AUC:", study.best_value)
```
