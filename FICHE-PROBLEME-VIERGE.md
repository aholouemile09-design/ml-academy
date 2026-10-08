# Fiche problème — gabarit à recopier

Recopie ce fichier au début de chaque problème (`fiches/2026-10-08-churn.md` par exemple) et
remplis-le de haut en bas. Méthode complète : [`METHODE-RESOLUTION-ML.md`](./METHODE-RESOLUTION-ML.md).

**Problème :** …
**Date :** …
**Temps que je m’accorde :** …

---

## C — CADRER ⟨25 % du temps⟩

**1. Décision qui change**
Qui regarde la sortie : …
Ce qu’il fait de différent : …

**2. Unité d’observation**
Une ligne = … observé à l’instant …

**3. Cible `y`**
Définition mesurable : …
Type : ☐ réel  ☐ binaire  ☐ K classes  ☐ durée  ☐ série
Connue à partir de quand : …

**4. Données disponibles à `t₀`**

| Colonne candidate | Disponible à `t₀` ? | Garder |
|---|---|---|
| … | ☐ oui ☐ non | ☐ |
| … | ☐ oui ☐ non | ☐ |
| … | ☐ oui ☐ non | ☐ |

**5. Coût des erreurs**
Un faux positif coûte : …
Un faux négatif coûte : …
Rapport : …

**6. Baseline bête**
Règle : …
Score attendu (avant de coder) : …

**7. Contraintes de production**
Fréquence : …   Latence : …   Volume : …   Interprétabilité : …

### Phrase unique (bloquant — ne pas descendre avant qu’elle soit complète)

> Pour chaque ⟨unité⟩ …, à l’instant ⟨t₀⟩ …, je prédis ⟨y⟩ … à partir de ⟨X⟩ …,
> pour aider ⟨acteur⟩ … à décider ⟨action⟩ ….
> Je dois battre ⟨baseline⟩ …, mesuré par ⟨métrique⟩ …, sur ⟨population⟩ ….

---

## A — ABSTRAIRE ⟨15 %⟩

```
1. Entrées     X ∈ ℝ^(n×d)    n = …   d = …   types = …
2. Cible       y ∈ …
3. Hypothèse   f_θ ∈ …        pourquoi cette famille : …
4. Perte       L(θ) = …       (entraînement, dérivable)
   Métrique    M     = …       (rapportée à l'humain, vient du point 5 du cadrage)
5. Contraintes …
```

Famille de problème : ☐ régression  ☐ classification binaire  ☐ multiclasse  ☐ ranking
☐ clustering  ☐ anomalie  ☐ série temporelle  ☐ effet causal

Opérations mathématiques repérées dans l’énoncé (moyenne conditionnelle, quantile, différence,
argmax, intersection…) : …

---

## D — DÉCOMPOSER ⟨10 %⟩

```
ENTRÉES
  …

SORTIE
  …

INVARIANTS
  …

ÉTAPES
  1. …
  2. …
  3. …

COMPLEXITÉ
  étape … : … lignes × … → outil : …

CAS LIMITES
  ensemble vide          → …
  valeurs manquantes     → absence de mesure ou zéro réel : …
  doublons sur la clé    → …
  catégorie inédite      → …
```

Répartition des calculs : SQL → …  pandas → …  numpy → …  python → …

---

## R — RÉALISER ⟨30 %⟩

☐ je travaille sur un échantillon
☐ les assertions sont écrites avant les transformations
☐ une cellule = une étape du pseudo-code, même nom de variable
☐ nombre de lignes vérifié avant et après chaque jointure
☐ chaque colonne se comprend dans son nom

Les six contrôles, après chaque transformation :

```python
print(df.shape)                                 # 1
assert df["<clé>"].is_unique                    # 2
print(df.isna().mean().sort_values().tail())    # 3
print(df.describe().T[["min", "max"]])          # 4
print(df["y"].value_counts(normalize=True))     # 5
# 6. une ligne recalculée à la main : ________
```

Surprises rencontrées dans les données : …

---

## É — ÉVALUER ⟨15 %⟩

**Découpage** ☐ temporel  ☐ par groupe  ☐ stratifié  ☐ par site  ☐ aléatoire (justifier)
Pourquoi celui-là imite le déploiement : …

| | Score | Dispersion |
|---|---|---|
| Baseline | … | … |
| Modèle | … | ± … |

Les quatre questions de fuite :
☐ chaque colonne existe à `t₀` avec cette valeur
☐ aucun prétraitement ajusté avant le découpage
☐ aucun identifiant, date ou numéro de ligne porteur de `y`
☐ aucun chevauchement de groupes entre entraînement et test

**Vingt pires erreurs** — point commun observé : …

Test « trop beau » : le résultat est-il suspect ? ☐ non  ☐ oui → fuite cherchée ici : …

---

## S — SCELLER ⟨5 %⟩

```
Phrase unique          : …
Objet mathématique     : …   perte : …   métrique : …
Découpage              : …
Baseline               : …   Modèle : … ± …
Gain traduit en métier : …
Décision               : ☐ déployer  ☐ abandonner  ☐ retourner à C
Ce qui a échoué        : …
Prochaine question     : …
```

---

## Contrôle final avant de rendre

☐ la phrase unique a été écrite avant la première ligne de code
☐ la baseline est chiffrée
☐ chaque colonne a passé le test de `t₀`
☐ le chiffre est annoncé avec sa dispersion
☐ vingt erreurs ont été regardées à la main
☐ les dix lignes de S sont écrites
