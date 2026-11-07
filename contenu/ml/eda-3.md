L'EDA est un processus structuré. Voici le workflow utilisé dans chaque projet professionnel — de la première inspection aux insights actionnables.

**Étape 1 — Inspection initiale**
```python
import pandas as pd
import numpy as np

df = pd.read_csv("dataset.csv")

# Vue d'ensemble rapide
print(df.shape)           # (n_lignes, n_colonnes)
print(df.dtypes)          # types de chaque colonne
print(df.head(10))        # premiers exemples
print(df.describe())      # statistiques descriptives (count, mean, std, min, quartiles, max)

# Valeurs manquantes — critique !
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(2)
print(pd.DataFrame({"count": missing, "%": missing_pct}).query("count > 0").sort_values("%", ascending=False))
```

**Étape 2 — Distribution des variables**
```python
import matplotlib.pyplot as plt
import seaborn as sns

# Variables numériques : distribution + outliers
num_cols = df.select_dtypes("number").columns
fig, axes = plt.subplots(len(num_cols), 2, figsize=(12, 4*len(num_cols)))

for i, col in enumerate(num_cols):
    sns.histplot(df[col].dropna(), kde=True, ax=axes[i, 0])
    axes[i, 0].set_title(f"Distribution : {col}")
    sns.boxplot(y=df[col], ax=axes[i, 1])
    axes[i, 1].set_title(f"Outliers : {col}")

plt.tight_layout()
plt.show()

# Variables catégorielles : fréquences
cat_cols = df.select_dtypes("object").columns
for col in cat_cols:
    print(f"\n{col} ({df[col].nunique()} valeurs uniques):")
    print(df[col].value_counts().head(10))
```

**Étape 3 — Analyse de la cible (target)**
```python
# Classification : déséquilibre des classes
print("Distribution de la cible:")
print(df["target"].value_counts(normalize=True).mul(100).round(2))
# ⚠️ Si classe majoritaire > 80% : déséquilibre — penser SMOTE ou class_weight

# Régression : distribution de la cible
sns.histplot(df["target"], kde=True)
# ⚠️ Si distribution asymétrique → envisager log(target)
skewness = df["target"].skew()
print(f"Skewness: {skewness:.2f}")
# > 1 ou < -1 : distribution fortement asymétrique
```

**Étape 4 — Relations features/target**
```python
# Corrélation numérique / target (régression)
correlations = df.select_dtypes("number").corr()["target"].sort_values(key=abs, ascending=False)
print(correlations.head(15))

# Relation catégorielle / target (classification)
for col in cat_cols:
    group = df.groupby(col)["target"].mean().sort_values(ascending=False)
    print(f"\n{col} vs target (taux moyen):\n{group}")
```

**Étape 5 — Détecter les anomalies**
```python
# Règle IQR (outliers)
def detect_outliers_iqr(series):
    Q1, Q3 = series.quantile(0.25), series.quantile(0.75)
    IQR = Q3 - Q1
    lower, upper = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR
    return series[(series < lower) | (series > upper)]

for col in num_cols:
    outliers = detect_outliers_iqr(df[col].dropna())
    if len(outliers) > 0:
        print(f"{col}: {len(outliers)} outliers ({len(outliers)/len(df)*100:.1f}%)")

# Doublons
dupes = df.duplicated().sum()
print(f"\nDoublons: {dupes} ({dupes/len(df)*100:.1f}%)")
```

**Template de rapport EDA** — à utiliser systématiquement :
1. Shape + types + missing values
2. Distribution de chaque variable (histogramme + boxplot)
3. Distribution de la cible + déséquilibre
4. Matrice de corrélation
5. Analyse des outliers
6. 3 insights clés actionnables

**Ressource** : Kaggle notebooks EDA — regarder les kernels Gold Medal pour des exemples de référence.
