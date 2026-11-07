L'accuracy peut mentir : sur un dataset à 99% de classe négative, prédire "négatif" partout donne 99% d'accuracy et un modèle inutile.

**Matrice de confusion** → métriques :
- **Précision** = TP/(TP+FP) : parmi mes alertes, combien sont vraies ?
- **Rappel** = TP/(TP+FN) : parmi les vrais cas, combien ai-je détectés ?
- **F1** : moyenne harmonique des deux
- **ROC-AUC** : qualité du classement des probabilités, robuste au déséquilibre

**Choisir selon le contexte** : détection de fraude → privilégier le rappel ; filtrage spam → privilégier la précision.

**Validation croisée k-fold** : on découpe en k blocs, chaque bloc sert une fois de validation. Estimation robuste de la performance :
```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5, scoring="f1")
```
