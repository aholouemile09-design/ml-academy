Un **arbre de décision** découpe l'espace par questions successives ("âge > 30 ?"). Interprétable mais sujet au surapprentissage.

**Random Forest** : on entraîne des centaines d'arbres sur des échantillons aléatoires (bagging) et on vote. La variance s'effondre, la performance grimpe.

**Gradient Boosting** (XGBoost, LightGBM) : les arbres sont construits séquentiellement, chacun corrigeant les erreurs du précédent. C'est l'état de l'art sur les **données tabulaires** — souvent devant le deep learning.

```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=300, max_depth=10)
rf.fit(X_train, y_train)
rf.feature_importances_   # quelles variables comptent ?
```

**Hyperparamètres clés** : profondeur max, nombre d'arbres, learning rate (boosting). À régler par validation croisée (`GridSearchCV`).
