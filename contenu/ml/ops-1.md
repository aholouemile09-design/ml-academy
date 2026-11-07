Un modèle qui marche dans un notebook n'a aucune valeur tant qu'il n'est pas utilisable de façon fiable.

**Structurer un projet ML** :
```
projet/
├── data/            # jamais versionné dans git (DVC)
├── notebooks/       # exploration uniquement
├── src/
│   ├── features.py  # transformations réutilisables
│   ├── train.py     # entraînement reproductible
│   └── predict.py   # inférence
├── tests/
└── configs/         # hyperparamètres en YAML
```

**Règles d'or** :
- Fixer les seeds aléatoires (reproductibilité)
- Versionner code (git), données (DVC) et modèles (MLflow)
- Tracker chaque expérience : hyperparamètres, métriques, artefacts
- Écrire des tests : sur les features, sur les formats de données, sur la non-régression du modèle

```python
import mlflow
with mlflow.start_run():
    mlflow.log_params({"lr": 0.01, "depth": 8})
    mlflow.log_metric("f1", 0.91)
    mlflow.sklearn.log_model(model, "model")
```
