Le ML supervisé apprend une fonction f : X → y à partir d'exemples étiquetés.

**Le pipeline universel** :
1. Séparer les données : train / validation / test (ex. 70/15/15)
2. Entraîner sur train, régler les hyperparamètres sur validation, évaluer UNE FOIS sur test
3. Ne jamais laisser le test "fuiter" dans l'entraînement (*data leakage*)

**Le compromis biais-variance** — le concept le plus important du ML :
- **Sous-apprentissage** (biais élevé) : modèle trop simple, mauvais partout
- **Surapprentissage** (variance élevée) : modèle qui mémorise le train mais généralise mal

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

**Remèdes au surapprentissage** : plus de données, régularisation (L1/L2), modèles plus simples, validation croisée.
