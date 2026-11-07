Créer de nouvelles variables pertinentes depuis les données brutes est souvent plus impactant que de choisir un meilleur algorithme. C'est ici que la connaissance métier fait toute la différence.

**Feature engineering métier**
```python
# Exemple : prédiction du churn client

# Features temporelles depuis une date
df["signup_date"] = pd.to_datetime(df["signup_date"])
df["ancienneté_jours"] = (pd.Timestamp.now() - df["signup_date"]).dt.days
df["mois_inscription"] = df["signup_date"].dt.month
df["jour_semaine_inscription"] = df["signup_date"].dt.dayofweek
df["est_weekend"] = df["jour_semaine_inscription"].isin([5, 6]).astype(int)

# Interactions entre variables (ratios — souvent très puissants)
df["taux_engagement"] = df["sessions_30j"] / (df["ancienneté_jours"] + 1)
df["panier_moyen"] = df["chiffre_affaires"] / (df["nb_commandes"] + 1)
df["pages_par_session"] = df["pages_vues"] / (df["sessions_30j"] + 1)

# Agrégations sur des fenêtres glissantes
df["sessions_7j"] = df.groupby("user_id")["sessions"].transform(lambda x: x.rolling(7).sum())
df["sessions_30j"] = df.groupby("user_id")["sessions"].transform(lambda x: x.rolling(30).sum())
df["tendance"] = df["sessions_7j"] / (df["sessions_30j"] / 4 + 1)  # accélération récente

# Polynomiales (pour les relations non linéaires)
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False, interaction_only=False)
X_poly = poly.fit_transform(X[["age", "revenu"]])
# Crée : age², revenu², age*revenu
```

**Sélection de variables — garder l'essentiel**
```python
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.feature_selection import RFECV
import shap

# 1. Filtre statistique (rapide, aveugle au modèle)
selector = SelectKBest(mutual_info_classif, k=20)
X_selected = selector.fit_transform(X_train, y_train)
selected_features = X_train.columns[selector.get_support()]

# 2. RFECV — élimination récursive avec validation croisée (plus précis)
from sklearn.ensemble import RandomForestClassifier
rfecv = RFECV(RandomForestClassifier(n_estimators=100), cv=5, scoring="roc_auc", n_jobs=-1)
rfecv.fit(X_train, y_train)
print(f"Optimal features: {rfecv.n_features_}")
X_optimal = X_train.iloc[:, rfecv.support_]

# 3. SHAP values — explique l'importance feature par feature (gold standard)
import shap
model = RandomForestClassifier().fit(X_train, y_train)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

shap.summary_plot(shap_values[1], X_test)  # importance globale + direction
shap.waterfall_plot(explainer(X_test)[0])  # explication d'une prédiction individuelle
```

**Pipeline sklearn — le bon réflexe**
```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Définir les transformations par type de colonne
num_features = ["age", "revenu", "ancienneté_jours"]
cat_features = ["ville", "catégorie"]

num_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

cat_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
])

preprocessor = ColumnTransformer([
    ("num", num_pipeline, num_features),
    ("cat", cat_pipeline, cat_features),
])

# Pipeline complet : preprocessing + modèle
full_pipeline = Pipeline([
    ("prep", preprocessor),
    ("model", RandomForestClassifier(n_estimators=200, random_state=42)),
])

full_pipeline.fit(X_train, y_train)
y_pred = full_pipeline.predict(X_test)
# ✅ Aucun data leakage possible — le preprocessor ne voit que le train à chaque fold
```
