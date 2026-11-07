Un neurone calcule une somme pondérée puis applique une **fonction d'activation** non linéaire :
```
sortie = activation(w·x + b)
```

Sans non-linéarité, empiler des couches reviendrait à une seule transformation linéaire. Les activations courantes : **ReLU** max(0, z) — standard, rapide, évite la saturation ; sigmoïde et tanh — surtout en sortie ou dans les RNN.

Un **réseau profond** empile des couches : chaque couche apprend des représentations de plus en plus abstraites (pixels → contours → formes → objets).

**Théorème d'approximation universelle** : un réseau à une couche cachée suffisamment large peut approximer n'importe quelle fonction continue. En pratique, la profondeur est plus efficace que la largeur.

```python
import torch.nn as nn
model = nn.Sequential(
    nn.Linear(784, 128), nn.ReLU(),
    nn.Linear(128, 64), nn.ReLU(),
    nn.Linear(64, 10),
)
```
