Tout en ML est vecteur ou matrice : une image est une matrice de pixels, un texte devient un vecteur d'embedding, un dataset est une matrice (lignes = exemples, colonnes = features).

**Opérations clés** : addition, produit scalaire, produit matriciel, transposée.

Le **produit scalaire** mesure la similarité entre deux vecteurs :
```
a · b = Σ aᵢbᵢ = ||a|| ||b|| cos(θ)
```
C'est exactement ce que fait un moteur de recherche sémantique pour comparer des documents.

Le **produit matriciel** Y = XW est l'opération centrale d'une couche de réseau de neurones : X (données) × W (poids appris).

**Notions à connaître** : rang, inverse, valeurs propres (utilisées en PCA pour réduire la dimension des données).
