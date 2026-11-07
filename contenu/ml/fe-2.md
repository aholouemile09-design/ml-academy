Les features sur des échelles très différentes (0-1 vs 0-1 000 000) peuvent biaiser les algorithmes sensibles aux distances (KNN, SVM, réseaux de neurones). Le scaling corrige ça.

**StandardScaler — centrer et réduire (moyenne=0, std=1)**
```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# StandardScaler : recommandé pour les algorithmes linéaires et réseaux de neurones
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit + transform sur train
X_test_scaled = scaler.transform(X_test)         # JAMAIS fit sur test → data leakage !

# MinMaxScaler : [0, 1] — utile si tu as besoin de bornes
mms = MinMaxScaler()
X_mm = mms.fit_transform(X_train)

# RobustScaler : robuste aux outliers (utilise médiane et IQR)
# ✅ Recommandé quand les outliers sont réels et doivent rester dans les données
rs = RobustScaler()
X_rs = rs.fit_transform(X_train)
```

**Quand scaler ?**
- **Oui** : régression linéaire/logistique, SVM, KNN, réseaux de neurones, PCA
- **Non nécessaire** : arbres de décision, Random Forest, XGBoost (invariants aux transformations monotones)

**Imputation des valeurs manquantes**
```python
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

# SimpleImputer — rapide, suffisant dans la plupart des cas
imp_median = SimpleImputer(strategy="median")    # numérique : médiane > moyenne (robuste aux outliers)
imp_mode = SimpleImputer(strategy="most_frequent")  # catégorielle : valeur la plus fréquente
imp_cst = SimpleImputer(strategy="constant", fill_value=0)

X_imputed = imp_median.fit_transform(X_train)

# KNNImputer — utilise les k voisins les plus proches pour estimer la valeur
# Plus précis mais plus lent
knn_imp = KNNImputer(n_neighbors=5)
X_knn = knn_imp.fit_transform(X_train)

# IterativeImputer (MICE) — modélise chaque feature en fonction des autres
# Le plus précis pour les données complexes
iter_imp = IterativeImputer(max_iter=10, random_state=42)
X_iter = iter_imp.fit_transform(X_train)
```

**Ajouter un indicateur de valeur manquante**
```python
# Souvent, "manquant" est une information en soi (ex: champ non rempli = comportement)
df["age_missing"] = df["age"].isnull().astype(int)
df["age"] = df["age"].fillna(df["age"].median())
```

**Traitement des outliers**
```python
# Option 1 : Winsorization (clipping) — limiter aux percentiles 1% et 99%
lower = df["revenu"].quantile(0.01)
upper = df["revenu"].quantile(0.99)
df["revenu_clipped"] = df["revenu"].clip(lower, upper)

# Option 2 : Transformation log (si toutes valeurs > 0)
df["revenu_log"] = np.log1p(df["revenu"])  # log(1+x) pour éviter log(0)

# Option 3 : Supprimer les outliers (rare — seulement si clairement erronés)
df_clean = df[df["revenu"].between(0, 1_000_000)]
```
