Pandas fournit le **DataFrame** : un tableau étiqueté, l'équivalent d'une feuille Excel programmable.

```python
import pandas as pd

df = pd.read_csv("ventes.csv")
df.head()                      # aperçu
df.describe()                  # statistiques
df[df["prix"] > 100]           # filtrage
df.groupby("region")["ventes"].sum()
```

**Le workflow type d'un projet ML commence toujours ici** : charger, nettoyer (valeurs manquantes avec `df.dropna()` ou `df.fillna()`), transformer, agréger.

```python
df["marge"] = df["prix"] - df["cout"]      # nouvelle colonne
df.pivot_table(index="mois", columns="region", values="ventes")
```
