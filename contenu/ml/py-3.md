NumPy est la base de tout l'écosystème ML. Son objet central : le **ndarray**, un tableau multidimensionnel ultra-rapide.

```python
import numpy as np

a = np.array([1, 2, 3])
M = np.random.randn(3, 3)     # matrice 3x3 aléatoire
a * 2                          # vectorisation : [2, 4, 6]
M @ a                          # produit matriciel
```

**Pourquoi c'est crucial** : un réseau de neurones n'est qu'une suite de produits matriciels. La vectorisation remplace les boucles Python (lentes) par du calcul C optimisé — souvent 100x plus rapide.

Le **broadcasting** permet d'opérer sur des tableaux de formes différentes :
```python
M - M.mean(axis=0)   # centre chaque colonne
```
