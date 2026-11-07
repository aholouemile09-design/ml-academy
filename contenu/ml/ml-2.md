**Régression linéaire** : prédire une valeur continue.
```
ŷ = w·x + b      Coût : MSE = (1/n) Σ(yᵢ - ŷᵢ)²
```

**Régression logistique** : malgré son nom, c'est un classifieur. On passe la sortie linéaire dans une sigmoïde pour obtenir une probabilité :
```
P(y=1|x) = σ(w·x + b),  σ(z) = 1/(1+e⁻ᶻ)
```
Coût : **entropie croisée** (log loss).

```python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)
model.predict_proba(X_test)
```

**Régularisation** : Ridge (L2) rétrécit les poids, Lasso (L1) en met certains à zéro (sélection de variables). Toujours commencer par un modèle linéaire : c'est votre *baseline* interprétable.
