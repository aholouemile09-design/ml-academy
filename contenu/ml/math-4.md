La **Décomposition en Valeurs Singulières** (SVD) est l'une des opérations matricielles les plus fondamentales en ML. Elle sous-tend la PCA, les systèmes de recommandation, la compression d'images et le traitement du langage.

**La décomposition SVD**

Toute matrice A de dimensions (m × n) peut s'écrire :
```
A = U Σ Vᵀ
```
où :
- **U** (m × m) : vecteurs singuliers gauches (directions dans l'espace des lignes)
- **Σ** (m × n) : matrice diagonale de valeurs singulières σ₁ ≥ σ₂ ≥ ... ≥ 0
- **Vᵀ** (n × n) : vecteurs singuliers droits (directions dans l'espace des colonnes)

Les valeurs singulières σᵢ mesurent l'importance de chaque composante. En gardant seulement les k plus grandes, on obtient la meilleure approximation de rang k de A.

**SVD en Python**
```python
import numpy as np
import matplotlib.pyplot as plt

# Exemple : matrice 4x3
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12]], dtype=float)

U, sigma, Vt = np.linalg.svd(A, full_matrices=True)
print("Valeurs singulières :", sigma)  # [25.46, 1.29, ...]
print("Rang de A :", np.sum(sigma > 1e-10))

# Reconstruction approximée avec k=1
k = 1
A_approx = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]
print("Erreur de reconstruction :", np.linalg.norm(A - A_approx))
```

**Compression d'image avec SVD**
```python
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

img = np.array(Image.open("photo.jpg").convert("L"), dtype=float)  # niveaux de gris

U, sigma, Vt = np.linalg.svd(img, full_matrices=False)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, k in zip(axes, [5, 20, 50, 200]):
    img_k = U[:, :k] @ np.diag(sigma[:k]) @ Vt[:k, :]
    ax.imshow(img_k, cmap="gray")
    ratio = k * (img.shape[0] + img.shape[1] + 1) / img.size
    ax.set_title(f"k={k} ({ratio:.1%} données)")
    ax.axis("off")
plt.tight_layout()
plt.show()
```

**SVD et PCA — le lien fondamental**

La PCA (Principal Component Analysis) **est** une SVD sur la matrice des données centrées :
```python
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# PCA via sklearn (utilise SVD en interne)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

print("Variance expliquée :", pca.explained_variance_ratio_)
print("Variance cumulée  :", pca.explained_variance_ratio_.cumsum())

# Visualisation du coude (combien de composantes garder ?)
plt.figure(figsize=(8, 4))
plt.plot(np.cumsum(pca.explained_variance_ratio_), marker="o")
plt.axhline(0.95, color="red", linestyle="--", label="95% de variance")
plt.xlabel("Nombre de composantes")
plt.ylabel("Variance expliquée cumulée")
plt.legend()
plt.show()
```

**Valeurs propres et vecteurs propres**

Pour une matrice carrée symétrique A (ex. matrice de covariance) :
```
Av = λv
```
- **λ** (valeur propre) : facteur d'échelle
- **v** (vecteur propre) : direction qui ne change pas lors de la transformation

En PCA, les vecteurs propres de la matrice de covariance sont les **composantes principales**, et les valeurs propres indiquent leur importance (variance capturée).
```python
# Calculer les composantes principales manuellement
cov_matrix = np.cov(X_scaled.T)
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)
# Trier par valeur propre décroissante
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]
```

**Systèmes de recommandation (Matrix Factorization)**

Netflix, Spotify et Amazon utilisent SVD pour décomposer une matrice utilisateurs × items :
```python
# Matrice notes (utilisateurs × films), avec beaucoup de NaN
ratings = np.array([
    [5, 3, np.nan, 1],
    [4, np.nan, 4, 1],
    [np.nan, 1, 5, 5],
    [1, 2, 5, np.nan],
])
# La SVD/NMF décompose en : utilisateurs × facteurs latents × films
# → chaque facteur latent représente un "genre" caché
from sklearn.decomposition import NMF
# (remplacer NaN par 0 pour la démo)
ratings_filled = np.nan_to_num(ratings)
nmf = NMF(n_components=2, random_state=42)
W = nmf.fit_transform(ratings_filled)  # utilisateurs × facteurs
H = nmf.components_                     # facteurs × films
```
