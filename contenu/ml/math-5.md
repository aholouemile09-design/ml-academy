Comprendre les distributions statistiques permet de choisir la bonne fonction de perte, d'initialiser correctement un réseau, et de diagnostiquer ses données. Chaque distribution modélise un type de phénomène.

**La loi normale (gaussienne) — 𝒩(μ, σ²)**

La plus importante en ML. Apparaît partout grâce au **Théorème Central Limite** : la somme de n variables aléatoires indépendantes converge vers une gaussienne (quel que soit leur distribution initiale).
```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

mu, sigma = 0, 1
x = np.linspace(-4, 4, 200)

plt.figure(figsize=(10, 4))
for mu, sigma, label in [(0, 1, "𝒩(0,1)"), (2, 1, "𝒩(2,1)"), (0, 2, "𝒩(0,4)")]:
    plt.plot(x, stats.norm.pdf(x, mu, sigma**2), label=label)
plt.title("Loi normale — différents paramètres")
plt.legend()
plt.show()

# Propriété 68-95-99.7 (règle empirique)
print(f"P(|X-μ| < σ)  = {stats.norm.cdf(1) - stats.norm.cdf(-1):.3f}")   # 68.3%
print(f"P(|X-μ| < 2σ) = {stats.norm.cdf(2) - stats.norm.cdf(-2):.3f}")   # 95.4%
print(f"P(|X-μ| < 3σ) = {stats.norm.cdf(3) - stats.norm.cdf(-3):.3f}")   # 99.7%
```

**Loi de Bernoulli et Binomiale**
```python
# Bernoulli : 0 ou 1 avec probabilité p (ex. email spam ou non)
p = 0.3
print(f"P(X=1) = {p}, P(X=0) = {1-p}")

# Binomiale : combien de succès sur n essais ?
n, p = 100, 0.3
dist = stats.binom(n=n, p=p)
print(f"E[X] = {dist.mean():.1f}, Var(X) = {dist.var():.1f}")

# La régression logistique modélise précisément des variables de Bernoulli
```

**Loi de Poisson**
```python
# Nombre d'événements rares dans un intervalle fixe
# (transactions par seconde, pannes, appels clients)
lambda_ = 4  # taux moyen

dist = stats.poisson(mu=lambda_)
x = np.arange(0, 15)
plt.bar(x, dist.pmf(x))
plt.title(f"Poisson(λ={lambda_}) — P(X=k)")
plt.xlabel("k événements")
plt.show()

print(f"P(X=0) = {dist.pmf(0):.4f}")  # probabilité de 0 événement
print(f"P(X>8) = {1 - dist.cdf(8):.4f}")
```

**Distribution de Student (t)**
```python
# Utilisée quand on ne connaît pas la variance vraie (petits échantillons)
# Plus "lourdes de queues" que la gaussienne → plus robuste aux outliers

df_values = [1, 3, 10, 30]
x = np.linspace(-5, 5, 200)

plt.figure(figsize=(10, 4))
for df in df_values:
    plt.plot(x, stats.t.pdf(x, df), label=f"t(df={df})")
plt.plot(x, stats.norm.pdf(x), label="Normal", linestyle="--", color="black")
plt.title("Distribution de Student vs Normale")
plt.legend()
plt.show()
# À df → ∞, la distribution t converge vers la normale
```

**Loi exponentielle et Weibull — modélisation de durée**
```python
# Exponentielle : temps entre événements de Poisson (durée de vie sans mémoire)
lambda_exp = 0.5  # taux de défaillance
dist_exp = stats.expon(scale=1/lambda_exp)
print(f"Durée de vie moyenne : {dist_exp.mean():.1f} heures")

# Weibull : généralise l'exponentielle, utilisée en analyse de survie (churn, défaillance)
# shape < 1 : taux de défaillance décroissant (rodage)
# shape = 1 : taux constant (exponentielle)
# shape > 1 : taux croissant (usure)
for shape in [0.5, 1.0, 2.0, 3.5]:
    dist_w = stats.weibull_min(c=shape)
    plt.plot(x[x >= 0], dist_w.pdf(x[x >= 0]), label=f"k={shape}")
plt.title("Weibull — différentes formes")
plt.legend()
```

**Applications directes en ML**
| Distribution | Utilisation ML |
|--|--|
| Normale | Initialisation poids (Xavier/He), régression gaussienne, bruit |
| Bernoulli | Classification binaire, régression logistique |
| Catégorielle | Softmax en multiclasse |
| Poisson | Régression de comptage (NLP, séries temporelles d'événements) |
| Beta | Prior bayésien pour probabilités p ∈ [0, 1] |
| Dirichlet | Prior bayésien pour distributions catégorielles (LDA) |

**Le Théorème Central Limite en pratique**
```python
# Même en partant d'une distribution uniforme, la moyenne de n échantillons
# devient gaussienne pour n assez grand
n_samples = 10000
for n in [1, 2, 10, 30]:
    means = [np.mean(np.random.uniform(0, 1, n)) for _ in range(n_samples)]
    plt.hist(means, bins=50, alpha=0.5, label=f"n={n}", density=True)
plt.title("TCL : moyenne de n tirages uniformes")
plt.legend()
plt.show()
# n=30 est déjà presque parfaitement gaussien
```
