Les algorithmes ML travaillent avec des nombres. Encoder les variables catégorielles correctement est critique — un mauvais encodage peut introduire des biais ou faire exploser la dimensionnalité.

**One-Hot Encoding (OHE) — pour les catégories nominales sans ordre**
```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# Exemple : couleur n'a pas d'ordre naturel
df = pd.DataFrame({"couleur": ["rouge", "bleu", "vert", "rouge", "bleu"]})

# Pandas get_dummies
ohe_df = pd.get_dummies(df["couleur"], prefix="couleur", drop_first=True)
# drop_first=True évite la multicolinéarité (dummy variable trap)

# Sklearn (pour pipelines)
enc = OneHotEncoder(sparse_output=False, drop="first", handle_unknown="ignore")
X_enc = enc.fit_transform(df[["couleur"]])
# handle_unknown="ignore" : si une nouvelle catégorie apparaît en test → zéros
```

**⚠️ Quand NE PAS utiliser OHE ?**
Si une variable a > 30 catégories (villes, codes postaux), OHE crée trop de colonnes → utiliser Target Encoding.

**Ordinal Encoding — pour les catégories avec un ordre**
```python
from sklearn.preprocessing import OrdinalEncoder

# ✅ niveau d'éducation a un ordre naturel
df["éducation"] = ["Lycée", "Licence", "Master", "Doctorat", "Lycée"]

oe = OrdinalEncoder(categories=[["Lycée", "Licence", "Master", "Doctorat"]])
df["éducation_enc"] = oe.fit_transform(df[["éducation"]])
# → [0, 1, 2, 3, 0]
```

**Target Encoding — pour les catégories à haute cardinalité**
```python
# Remplace chaque catégorie par la moyenne de la cible pour cette catégorie
# Parfait pour : villes, codes postaux, produits, utilisateurs

import numpy as np

def target_encode(train_df, test_df, col, target, n_folds=5, smoothing=10):
    """Target encoding avec régularisation pour éviter le data leakage."""
    global_mean = train_df[target].mean()

    # Calculer la moyenne par catégorie avec smoothing
    stats = train_df.groupby(col)[target].agg(["mean", "count"])
    # Smoothing : pondère vers la moyenne globale si peu d'exemples
    smooth = (stats["count"] * stats["mean"] + smoothing * global_mean) / (stats["count"] + smoothing)

    train_df[f"{col}_te"] = train_df[col].map(smooth).fillna(global_mean)
    test_df[f"{col}_te"] = test_df[col].map(smooth).fillna(global_mean)

    return train_df, test_df

# ⚠️ TOUJOURS encoder sur le train uniquement, appliquer sur test
train, test = target_encode(train, test, "ville", "prix")
```

**Résumé : quel encodage choisir ?**
| Situation | Encodage recommandé |
|-----------|---------------------|
| ≤ 10 catégories, sans ordre | One-Hot Encoding |
| Catégories ordonnées | Ordinal Encoding |
| > 20 catégories | Target Encoding |
| Texte libre | TF-IDF ou embeddings |
