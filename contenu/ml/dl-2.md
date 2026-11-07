**La boucle d'entraînement** — à connaître par cœur :
```python
for epoch in range(epochs):
    for X_batch, y_batch in loader:
        optimizer.zero_grad()        # 1. remise à zéro des gradients
        y_pred = model(X_batch)      # 2. forward
        loss = criterion(y_pred, y_batch)  # 3. coût
        loss.backward()              # 4. rétropropagation
        optimizer.step()             # 5. mise à jour des poids
```

**Rétropropagation** : la règle de la chaîne appliquée du coût vers l'entrée, calculant le gradient de chaque poids.

**Optimiseurs** : SGD (simple), SGD+momentum (inertie), **Adam** (learning rate adaptatif par paramètre — le choix par défaut).

**Stabiliser l'entraînement** :
- *Batch normalization* : normalise les activations, accélère la convergence
- *Dropout* : éteint des neurones au hasard → régularisation
- *Early stopping* : arrêter quand la loss de validation remonte
- *Learning rate schedule* : décroître α au fil de l'entraînement
