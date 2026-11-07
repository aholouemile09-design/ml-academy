La visualisation est le premier acte de tout projet ML sérieux. Un graphique révèle en secondes ce qu'un tableau de chiffres cache.

**Matplotlib — la base de tout**
```python
import matplotlib.pyplot as plt
import numpy as np

# Graphique de base
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(epochs, train_loss, label="Train loss", color="#6366f1")
ax.plot(epochs, val_loss, label="Val loss", color="#f59e0b", linestyle="--")
ax.set_xlabel("Époque")
ax.set_ylabel("Loss")
ax.set_title("Courbes d'apprentissage")
ax.legend()
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig("learning_curves.png", dpi=150)
plt.show()
```

**Subplots — plusieurs graphiques côte à côte**
```python
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Distribution d'une variable
axes[0].hist(df["age"], bins=30, color="#6366f1", edgecolor="white")
axes[0].set_title("Distribution de l'âge")

# Boîte à moustaches
axes[1].boxplot([groupe_a, groupe_b, groupe_c], labels=["A", "B", "C"])
axes[1].set_title("Comparaison des groupes")

# Nuage de points
axes[2].scatter(df["revenus"], df["score_credit"], alpha=0.3, c=df["défaut"], cmap="RdYlGn")
axes[2].set_title("Revenus vs Score crédit")

plt.tight_layout()
```

**Seaborn — visualisations statistiques élégantes**
```python
import seaborn as sns

# Définir un thème cohérent
sns.set_theme(style="darkgrid", palette="deep")

# Distribution + courbe de densité (KDE)
sns.histplot(data=df, x="salaire", hue="département", kde=True, bins=40)

# Matrice de corrélation — ESSENTIELLE en EDA
corr = df.select_dtypes("number").corr()
plt.figure(figsize=(12, 8))
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm",
            center=0, vmin=-1, vmax=1, square=True)
plt.title("Matrice de corrélation")
plt.show()

# Pairplot — toutes les relations deux-à-deux
sns.pairplot(df[["feature1", "feature2", "feature3", "target"]], hue="target")

# Violin plot — distribution + densité
sns.violinplot(data=df, x="catégorie", y="valeur", hue="groupe")
```

**Ressource** : Seaborn Gallery — https://seaborn.pydata.org/examples/index.html
