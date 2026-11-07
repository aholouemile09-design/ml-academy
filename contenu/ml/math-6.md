En ML, on compare des modèles, des features, des versions A/B. Les tests statistiques permettent de savoir si une différence observée est réelle ou due au hasard. C'est la base de la décision data-driven.

**Le cadre des tests d'hypothèses**

1. **H₀** (hypothèse nulle) : "Pas de différence" — ex. les deux modèles ont la même performance
2. **H₁** (hypothèse alternative) : "Il y a une différence"
3. **p-value** : probabilité d'observer ce résultat (ou plus extrême) si H₀ était vraie
4. **Seuil α** : typiquement 0.05 — si p < α, on rejette H₀

```
p < 0.05 → résultat statistiquement significatif (on rejette H₀)
p ≥ 0.05 → pas assez de preuves pour rejeter H₀ (ne prouve pas H₀)
```

**⚠️ Erreurs classiques** :
- p < 0.05 ≠ "vrai" ni "important" — c'est juste "peu probable sous H₀"
- Avec assez de données, tout devient significatif — regarder aussi l'effet size
- p = 0.049 n'est pas très différent de p = 0.051

**Test t de Student — comparer deux moyennes**
```python
import numpy as np
from scipy import stats

# Exemple : deux modèles, scores sur 10 folds de cross-validation
model_a = np.array([0.82, 0.85, 0.83, 0.86, 0.84, 0.85, 0.83, 0.84, 0.85, 0.86])
model_b = np.array([0.84, 0.87, 0.85, 0.88, 0.86, 0.87, 0.85, 0.86, 0.87, 0.88])

# Test t apparié (même données d'évaluation → test apparié)
t_stat, p_value = stats.ttest_rel(model_a, model_b)
print(f"t-statistique : {t_stat:.4f}")
print(f"p-value : {p_value:.4f}")
print(f"Conclusion : {'modèle B significativement meilleur' if p_value < 0.05 else 'pas de différence significative'}")

# Test t indépendant (groupes différents)
t_stat, p_value = stats.ttest_ind(model_a, model_b, equal_var=False)  # Welch
```

**McNemar — comparer deux classifieurs sur le même dataset**
```python
from statsmodels.stats.contingency_tables import mcnemar

# Tableau de contingence :
# b = nbre d'exemples bien classés par A mais pas B
# c = nbre d'exemples bien classés par B mais pas A
b, c = 25, 10  # B se trompe là où A réussit 10 fois, A se trompe là où B réussit 25 fois
table = [[0, b], [c, 0]]  # on ignore les cas où les deux ont tort/raison

result = mcnemar(table, exact=True)
print(f"p-value McNemar : {result.pvalue:.4f}")
# p < 0.05 → les deux classifieurs sont significativement différents
```

**Test de Wilcoxon — alternative non-paramétrique au test t apparié**
```python
# Utiliser quand les données ne suivent pas une loi normale
stat, p_value = stats.wilcoxon(model_a, model_b)
print(f"Wilcoxon p-value : {p_value:.4f}")
# Plus robuste, moins puissant que le test t
```

**Intervalles de confiance — la p-value ne suffit pas**
```python
# IC à 95% pour la différence de performances
diff = model_b - model_a
n = len(diff)
mean_diff = np.mean(diff)
se = stats.sem(diff)  # erreur standard
t_crit = stats.t.ppf(0.975, df=n-1)  # quantile à 97.5%

ic_low  = mean_diff - t_crit * se
ic_high = mean_diff + t_crit * se
print(f"Différence moyenne : {mean_diff:.4f}")
print(f"IC 95% : [{ic_low:.4f}, {ic_high:.4f}]")
# Si l'IC ne contient pas 0 → différence significative (cohérent avec p < 0.05)
```

**Tests pour vérifier la normalité**
```python
# Shapiro-Wilk (adapté aux petits échantillons < 50)
stat, p = stats.shapiro(model_a)
print(f"Shapiro-Wilk p = {p:.4f}")
# p > 0.05 → on ne rejette pas la normalité (on peut utiliser le test t)

# QQ-plot — inspection visuelle
import matplotlib.pyplot as plt
stats.probplot(model_a, dist="norm", plot=plt)
plt.title("QQ-plot — vérification de normalité")
plt.show()
```

**Chi-² — indépendance entre variables catégorielles**
```python
# Exemple : la variable "sexe" est-elle liée à l'attrition (churn) ?
from scipy.stats import chi2_contingency
import pandas as pd

# Tableau de contingence
table = pd.crosstab(df["sexe"], df["attrition"])
chi2, p, dof, expected = chi2_contingency(table)
print(f"Chi² = {chi2:.2f}, p-value = {p:.4f}, degrés de liberté = {dof}")
# p < 0.05 → sexe et attrition sont liés (dépendants)
```

**Tests A/B en pratique ML**
```python
# Combien d'exemples faut-il pour détecter une amélioration de 1% ?
from statsmodels.stats.power import TTestIndPower

analysis = TTestIndPower()
n_needed = analysis.solve_power(
    effect_size=0.3,    # différence normalisée (Cohen's d)
    alpha=0.05,         # seuil de significativité
    power=0.80,         # puissance souhaitée (1 - P(faux négatif))
    alternative="two-sided",
)
print(f"Taille d'échantillon minimale par groupe : {n_needed:.0f}")
```

**Résumé : quel test utiliser ?**
| Situation | Test recommandé |
|--|--|
| 2 modèles, mêmes folds | Test t apparié |
| 2 classifieurs, même dataset | McNemar |
| Données non-normales | Wilcoxon |
| Feature catégorielle vs cible catégorielle | Chi-² |
| 3+ groupes | ANOVA (paramétrique) ou Kruskal-Wallis |
