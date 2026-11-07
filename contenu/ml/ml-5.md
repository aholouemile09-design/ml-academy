Pas d'étiquettes : on cherche la structure cachée des données.

**Clustering — K-means** : partitionne en k groupes en minimisant la distance aux centres. Choisir k avec la méthode du coude ou le score silhouette.
```python
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4).fit(X)
```
Applications : segmentation client, détection d'anomalies, compression.

**Réduction de dimension — PCA** : projette les données sur les axes de variance maximale. Sert à visualiser (2D/3D), accélérer l'entraînement, débruiter.
```python
from sklearn.decomposition import PCA
X_2d = PCA(n_components=2).fit_transform(X)
```

**t-SNE / UMAP** : visualisations non linéaires, excellentes pour explorer des embeddings.
