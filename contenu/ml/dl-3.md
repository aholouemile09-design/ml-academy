Une image 224×224 en couleur = 150 528 entrées. Une couche dense exploserait en paramètres. La **convolution** résout cela : un petit filtre (3×3) glisse sur l'image et détecte des motifs locaux, avec partage des poids.

**Architecture type** : [Conv → ReLU → Pooling] × N → Dense → Sortie

- **Convolution** : extrait des features locales (contours, textures)
- **Pooling** (max 2×2) : réduit la résolution, apporte une invariance aux petites translations
- Les couches profondes voient des motifs de plus en plus larges et abstraits

```python
nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
```

**Transfer learning** — le réflexe pratique : partir d'un modèle pré-entraîné (ResNet sur ImageNet), geler les premières couches, ré-entraîner la tête sur vos données. Excellent résultat avec peu de données.

Architectures marquantes : LeNet → AlexNet → VGG → **ResNet** (connexions résiduelles permettant 100+ couches).
