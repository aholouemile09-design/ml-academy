Un modèle déployé peut discriminer, amplifier des préjugés et causer des préjudices réels. L'éthique en ML n'est pas un bonus — c'est une exigence technique et légale (RGPD, AI Act européen).

**Les sources de biais en ML**

Le biais entre dans le pipeline à plusieurs niveaux :
| Source | Exemple concret |
|--|--|
| **Données d'entraînement** | Données historiques de recrutement sur-représentant les hommes |
| **Proxy features** | Le code postal encode implicitement l'origine ethnique |
| **Labeling** | Annotateurs avec des biais culturels |
| **Feedback loop** | Modèle de police → plus de contrôles → plus de données sur quartiers défavorisés |
| **Définition de la cible** | "Bon employé" défini par des managers avec leurs propres biais |

**Exemple : COMPAS (récidive criminelle)**
Le modèle COMPAS utilisé dans des tribunaux américains avait un taux de faux positifs **2× plus élevé** pour les accusés noirs que pour les blancs. Pourtant son accuracy globale était similaire — preuve que l'accuracy globale est une métrique insuffisante.

**Métriques d'équité (fairness metrics)**

Soit A = groupe sensible (ex. sexe, ethnie), Ŷ = prédiction, Y = vraie valeur.

```python
import pandas as pd
import numpy as np
from sklearn.metrics import confusion_matrix

def fairness_report(y_true, y_pred, sensitive_attr, group_a, group_b):
    """Compare les métriques entre deux groupes."""
    results = {}
    for name, mask in [(group_a, sensitive_attr == group_a),
                       (group_b, sensitive_attr == group_b)]:
        tn, fp, fn, tp = confusion_matrix(y_true[mask], y_pred[mask]).ravel()
        results[name] = {
            "accuracy":        (tp + tn) / (tp + tn + fp + fn),
            "TPR (recall)":    tp / (tp + fn),   # True Positive Rate
            "FPR":             fp / (fp + tn),   # False Positive Rate
            "precision":       tp / (tp + fp),
            "pred_positive":   (y_pred[mask] == 1).mean(),  # taux prédit positif
        }
    df = pd.DataFrame(results).T
    print(df.round(3))
    print(f"\nRatio de parité démographique : {df['pred_positive'].min() / df['pred_positive'].max():.3f}")
    print(f"(> 0.8 = règle des 4/5 respectée)")
    return df

# Utilisation
report = fairness_report(y_true, y_pred, df["sexe"], "Femme", "Homme")
```

**Les 3 définitions de fairness (mutuellement exclusives !)**

```
1. Demographic Parity (Parité démographique)
   P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1)
   → Même taux de prédictions positives dans les deux groupes
   Problème : ne tient pas compte des différences réelles dans Y

2. Equal Opportunity (Égalité des chances)
   P(Ŷ=1 | Y=1, A=0) = P(Ŷ=1 | Y=1, A=1)
   → Même TPR (rappel) dans les deux groupes
   Favorise : prêts, recrutement — les qualifiés des deux groupes ont la même chance

3. Equalized Odds (Chances équilibrées)
   TPR ET FPR égaux entre groupes
   → Le modèle se trompe pareillement dans les deux sens pour chaque groupe
   Favorise : justice pénale, médecine — les erreurs doivent être symétriques
```

**Important** : il est mathématiquement impossible de satisfaire les 3 définitions simultanément quand les taux de base (base rates) diffèrent entre groupes (théorème de Chouldechova, 2017).

**Explicabilité avec SHAP**

SHAP (SHapley Additive exPlanations) est l'outil de référence pour expliquer les prédictions individuelles ET détecter les biais feature par feature.

```python
import shap
import matplotlib.pyplot as plt

# Explainer pour tout modèle tree-based
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 1. Importance globale avec direction
shap.summary_plot(shap_values, X_test, plot_type="bar")

# 2. Impact de chaque feature sur chaque prédiction (beeswarm)
shap.summary_plot(shap_values, X_test)

# 3. Explication d'une prédiction individuelle
shap.waterfall_plot(explainer(X_test)[0])

# 4. Dépendance feature × interaction
shap.dependence_plot("age", shap_values, X_test, interaction_index="sexe")
# → Voir si l'effet de l'âge diffère selon le sexe
```

**Explicabilité avec LIME**

LIME approche localement le modèle par un modèle linéaire interprétable :
```python
import lime
import lime.lime_tabular

explainer_lime = lime.lime_tabular.LimeTabularExplainer(
    training_data=X_train.values,
    feature_names=X_train.columns.tolist(),
    class_names=["Non", "Oui"],
    mode="classification",
)

# Expliquer une prédiction individuelle
instance = X_test.iloc[0].values
exp = explainer_lime.explain_instance(instance, model.predict_proba, num_features=10)
exp.show_in_notebook()
exp.as_pyplot_figure()
plt.tight_layout()
plt.show()
```

**SHAP vs LIME**
| | SHAP | LIME |
|--|--|--|
| Fondation théorique | Théorie des jeux (Shapley values) | Approximation locale linéaire |
| Cohérence globale | ✅ Toujours cohérent | Peut varier selon les runs |
| Vitesse | Plus lent (modèles complexes) | Rapide |
| Modèles | Tree-based natif, kernel pour autres | Tout type |
| Recommandation | Préférer SHAP si possible | Utile pour NLP et images |

**Audit de fairness avec Fairlearn**
```python
from fairlearn.metrics import MetricFrame, selection_rate, true_positive_rate, false_positive_rate
from sklearn.metrics import accuracy_score

sensitive_features = df_test["sexe"]

metrics = {
    "accuracy": accuracy_score,
    "selection_rate": selection_rate,
    "true_positive_rate": true_positive_rate,
    "false_positive_rate": false_positive_rate,
}

mf = MetricFrame(
    metrics=metrics,
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=sensitive_features,
)

print(mf.overall)
print(mf.by_group)
print("\nDifférence max entre groupes :")
print(mf.difference())  # proche de 0 = équitable
```

**Atténuation des biais (mitigation)**
```python
from fairlearn.reductions import ExponentiatedGradient, DemographicParity

# Entraîner sous contrainte de fairness
constraint = DemographicParity()
mitigator = ExponentiatedGradient(estimator=base_model, constraints=constraint)
mitigator.fit(X_train, y_train, sensitive_features=sensitive_train)

y_pred_fair = mitigator.predict(X_test)
# Vérifier que le modèle est à la fois précis ET équitable
```

**Checklist éthique avant déploiement**
- [ ] Identifier les groupes sensibles dans les données
- [ ] Mesurer les métriques de fairness par groupe (TPR, FPR, selection rate)
- [ ] Documenter les limites connues du modèle (Model Card)
- [ ] Expliquer les prédictions à risque avec SHAP
- [ ] Vérifier la conformité RGPD : droit à l'explication (Art. 22), données personnelles
- [ ] Prévoir une boucle de feedback humain pour les cas limites
- [ ] Surveiller les métriques de fairness en production (elles dérivent aussi)
