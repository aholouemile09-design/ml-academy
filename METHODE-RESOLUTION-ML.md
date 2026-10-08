# La méthode CADRES — squelette de résolution d’un problème de machine learning

> Fiche de référence. À relire au début de chaque problème, et à remplir dans l’ordre.
> Le gabarit vierge à recopier : [`FICHE-PROBLEME-VIERGE.md`](./FICHE-PROBLEME-VIERGE.md).

## Pourquoi cette fiche

Un data scientist débutant ouvre un notebook, charge le CSV, fait un `df.head()` et commence à
nettoyer. Trois jours plus tard il a un modèle à 0,91 d’AUC que personne n’utilisera, parce que la
colonne qui porte le signal n’existe pas au moment où la prédiction doit être faite.

Un ingénieur ML fait l’inverse : il écrit une phrase, puis une formule, puis un pseudo-code, et le
code arrive en quatrième position. Ce n’est pas de la lenteur, c’est du débit. Chaque étage filtre
les erreurs qui coûteraient dix fois plus cher à l’étage suivant : une cible mal définie se corrige
en deux minutes sur le papier et en deux semaines dans un pipeline en production.

Ce que cette fiche installe comme réflexe, et que les recruteurs et les relecteurs de code regardent
en premier :

- tu sais **traduire** un flou métier en objet mathématique sans rien perdre en route ;
- tu sais **justifier** chaque ligne de code par une ligne de maths ;
- tu sais **douter** de ton propre chiffre avant qu’un autre ne le fasse.

### L’analogie du restaurant

Garde-la en tête, elle couvre les six étapes.

| Dans le restaurant | Dans ton problème |
|---|---|
| Le client dit « j’ai faim » | Le métier dit « on perd des clients » |
| Le serveur prend une commande précise | **C** — tu cadres : qui, quoi, quand, quelle décision |
| Le chef traduit en recette chiffrée | **A** — tu abstrais : `f`, `y`, perte, contraintes |
| La recette devient une suite de gestes | **D** — tu décomposes : pseudo-code, entrées, sorties |
| On cuisine | **R** — tu réalises : pandas, SQL, numpy, python |
| On goûte avant de servir | **É** — tu évalues : baseline, découpage, erreurs |
| On note la recette dans le livre | **S** — tu scelles : trace réutilisable |

« Une pincée de sel » ne se cuisine pas. « 3 g de sel » se cuisine. Toute l’étape A consiste à
transformer les pincées en grammes.

---

## La chaîne de traduction

```
   Problème flou (langage métier)
        │
        │  C — CADRER            « de quoi parle-t-on, et qui décide ? »
        ▼
   Question décidable (une phrase)
        │
        │  A — ABSTRAIRE         « quel objet mathématique, quelle perte ? »
        ▼
   Objet mathématique (f, y, L, contraintes)
        │
        │  D — DÉCOMPOSER        « quelle suite d'opérations, sur quoi ? »
        ▼
   Algorithme (pseudo-code, E/S, complexité)
        │
        │  R — RÉALISER          « quel outil pour quelle opération ? »
        ▼
   Code (pandas / SQL / numpy / python)
        │
        │  É — ÉVALUER           « mon chiffre vaut-il quelque chose ? »
        ▼
   Chiffre + verdict (vs baseline)
        │
        │  S — SCELLER           « qu'est-ce que je garde de tout ça ? »
        ▼
   Trace réutilisable
```

**Règle d’or :** tu ne descends pas d’un étage avant d’avoir écrit la ligne de l’étage du dessus.
Pas « réfléchi à », **écrit**.

**Règle de remontée :** dès qu’un étage du bas contredit un étage du haut, tu remontes. Un modèle qui
ne bat pas la baseline n’est pas un problème de code (R), c’est presque toujours un problème de
cadrage (C) ou de cible (A).

### Budget de temps pour un problème d’une journée

| Étape | Part | Durée indicative |
|---|---|---|
| C — Cadrer | 25 % | 2 h |
| A — Abstraire | 15 % | 1 h |
| D — Décomposer | 10 % | 45 min |
| R — Réaliser | 30 % | 2 h 30 |
| É — Évaluer | 15 % | 1 h |
| S — Sceller | 5 % | 20 min |

Le code occupe moins d’un tiers du temps. Si tu passes 80 % de ta journée dans l’éditeur, tu es en
train de payer au prix fort une erreur commise dans les quinze premières minutes.

---

## C — CADRER

> Le serveur qui transforme « j’ai faim » en « steak saignant, sans sauce, pour la table 4 ».

### Les sept questions obligatoires

**1. Quelle décision change si mon modèle existe ?**
Qui regarde la sortie, et que fait-il de différent demain matin ? Si la réponse est « on saura », il
n’y a pas de projet : un tableau de bord suffit. Nomme l’acteur et l’action.

**2. Quelle est l’unité d’observation ?**
Une ligne de mon tableau final = un quoi, observé à quel instant ? Un client ? Un couple
client-mois ? Une session ? Une transaction ? C’est la question qui tue le plus de projets en
silence, parce que deux personnes dans la même réunion répondent différemment sans le savoir.

**3. Quelle est la cible `y` ?**
Définition mesurable, type (réel, binaire, catégorie, durée), et surtout **l’instant où elle devient
connue**. « Un client qui part » n’est pas une cible. « Abonnement sans renouvellement dans les
30 jours suivant la date d’échéance » est une cible.

**4. Qu’est-ce qui existe à l’instant de la prédiction `t₀` ?**
Pour chaque colonne candidate, une seule question : *cette valeur est-elle disponible, avec cette
valeur-là, à `t₀` ?* Le montant du remboursement est connu après le sinistre. Le nombre d’appels au
support est connu après la résiliation. Toute colonne qui échoue à ce test est une fuite, pas une
variable.

**5. Combien coûte chaque type d’erreur ?**
Un faux positif et un faux négatif ne coûtent presque jamais la même chose. Un dépistage manqué
coûte une vie ; une fausse alerte coûte un examen. Écris le rapport, même grossier : « rater un
fraudeur coûte 300 €, déranger un client honnête coûte 5 € » donne un rapport de 60, et ce 60
choisira ton seuil à l’étape É.

**6. Quelle est la baseline bête ?**
La règle qu’un stagiaire écrirait en dix minutes sans ML : la moyenne, le dernier état connu, le
seuil à la main, la règle métier existante. Si tu ne sais pas la chiffrer maintenant, tu ne saurais
pas dire plus tard si ton modèle sert à quelque chose.

**7. Quelles contraintes de production ?**
Fréquence (temps réel, batch quotidien), latence, volume, interprétabilité exigée, données
manquantes au moment de l’appel, coût de réentraînement.

### Le test de la phrase unique

Tant que cette phrase n’est pas complète, tu restes à l’étape C.

> Pour chaque **[unité d’observation]**, à l’instant **[t₀]**, je prédis **[y, définition
> mesurable]** à partir de **[données disponibles à t₀]**, pour aider **[acteur]** à décider
> **[action]**. Je dois battre **[baseline]**, mesuré par **[métrique]**, sur **[population
> d’évaluation]**.

Exemple rempli :

> Pour chaque **abonnement actif**, le **1er de chaque mois**, je prédis la **résiliation dans les
> 30 jours** à partir de l'**historique d’usage et de facturation antérieur au 1er**, pour aider
> l'**équipe fidélisation** à décider **quels 500 clients appeler**. Je dois battre la règle
> **« inactif depuis 30 jours »**, mesuré par la **précision sur les 500 premiers scores**, sur les
> **abonnés de plus de 3 mois**.

Cette phrase vaut dix réunions. Elle contient l’unité, l’horizon, la fuite évitée, la décision, la
baseline, la métrique et la population.

### Trois signaux qu’il faut rester à l’étape C

- Personne ne sait nommer la décision qui change.
- La cible se définit à la semaine près mais pas au jour près.
- Il n’existe aucune baseline, et personne ne trouve ça gênant.

---

## A — ABSTRAIRE

> Le chef qui transforme « une pincée de sel » en « 3 g de sel ».

### De la question métier à l’objet mathématique

| La question métier dit… | Objet | Sortie | Perte d’entraînement |
|---|---|---|---|
| « combien ? » | `f : ℝᵈ → ℝ` | un réel | MSE, MAE, Huber, quantile |
| « est-ce que ? » | `P(y=1 \| x)` | une probabilité | entropie croisée binaire |
| « lequel des K ? » | `p ∈ Δᴷ` | un vecteur de probas | entropie croisée |
| « dans quel ordre ? » | `s : (requête, item) → ℝ` | un score | perte par paires, NDCG |
| « qui ressemble à qui ? » | partition + distance `d(x, x')` | une affectation | inertie intra-classe |
| « est-ce anormal ? » | densité `p(x)` + seuil | un score | précision@k |
| « combien le mois prochain ? » | `yₜ = f(yₜ₋₁…yₜ₋ₖ, Xₜ)` | une trajectoire | MAPE par horizon |
| « combien si j’agis ? » | `E[Y\|X,T=1] − E[Y\|X,T=0]` | un effet | uplift, qini |

Le piège du débutant : partir de l’algorithme (« je vais faire du XGBoost ») au lieu de partir de
l’objet. L’objet se déduit de la question ; l’algorithme n’est qu’une façon d’approcher l’objet, et
il se choisit en dernier.

### Les cinq lignes à écrire, toujours

```
1. Entrées     X ∈ ℝⁿˣᵈ          n = ?  d = ?  types = ?
2. Cible       y ∈ ?             binaire / réel / K classes / durée
3. Hypothèse   f_θ ∈ ℱ           linéaire ? arbres ? réseau ? pourquoi ?
4. Perte       L(θ) = …          ce que la machine minimise
   Métrique    M = …             ce que tu rapportes à l'humain
5. Contraintes régularisation, monotonie, latence, budget
```

### Perte ≠ métrique

La perte est la boussole de l’entraînement : elle doit être dérivable, lisse, calculable des
millions de fois. La métrique est la note du jury : elle doit parler au métier, même si elle est
discontinue et non dérivable.

On entraîne en log-loss et on rapporte « 62 % de précision sur les 500 premiers appels ». Confondre
les deux produit le symptôme classique : un modèle optimisé sur une accuracy de 97 % sur un problème
où 97 % des cas sont négatifs, autrement dit un modèle qui dit toujours non.

### Mini-dictionnaire français → notation

Le vocabulaire métier contient des opérations mathématiques déguisées. Apprends à les voir.

| Ce qui est dit | Ce que ça veut dire |
|---|---|
| « en moyenne par segment » | `E[Y \| S = s]` → moyenne conditionnelle |
| « la part de » | proportion → `(1/n) Σᵢ 1[condᵢ]` |
| « les 5 % les pires » | quantile `q₀,₀₅` |
| « d’un mois sur l’autre » | différence première `yₜ − yₜ₋₁` |
| « depuis le début de l’année » | somme cumulée sur une fenêtre |
| « les clients qui… et qui… » | intersection d’ensembles → conditions booléennes jointes |
| « le plus proche » | `argmin_j d(x, cⱼ)` |
| « au moins une fois » | `∃` → `1[Σ > 0]`, ou `max` sur le groupe |
| « la tendance » | pente `β₁` d’une régression sur le temps |
| « à âge égal » | conditionnement → `E[Y \| X, âge]` |
| « le meilleur » | `argmax`, et il faut dire selon quel critère |
| « typique » | médiane plus souvent que moyenne — demande lequel |

« Typique » mérite une question : si la distribution est asymétrique (revenus, durées, paniers), la
moyenne ne décrit personne.

---

## D — DÉCOMPOSER

> La suite de gestes, dans l’ordre, avec le matériel sorti sur le plan de travail.

Le pseudo-code n’est pas du code en moins bien. C’est le seul endroit où tu raisonnes sur la
structure sans te battre avec la syntaxe.

### Le contrat à écrire avant la première ligne de code

```
ENTRÉES
  transactions : table (client_id, ts, montant)        ~40 M lignes
  clients      : table (client_id, date_inscription)   ~800 k lignes
  T0           : date de référence

SORTIE
  X : tableau (client_id, 7 colonnes numériques), une ligne par client actif à T0
  y : vecteur binaire aligné sur X

INVARIANTS
  client_id unique dans X
  aucune valeur de X issue d'un ts >= T0
  len(X) == len(y)

ÉTAPES
  1. socle   ← clients actifs à T0
  2. hist    ← transactions où ts < T0
  3. agrégats ← par client sur hist : compte, somme, récence, fenêtre 30 j
  4. X       ← socle JOIN agrégats, remplissage des absents par 0
  5. y       ← 1 si résiliation dans ]T0, T0+30 j], sinon 0
  6. contrôles : lignes, clés, taux de y, bornes

COMPLEXITÉ
  étape 3 : une passe sur 40 M lignes → en SQL, pas en boucle python

CAS LIMITES
  client sans aucune transaction        → agrégats absents, remplir par 0
  client inscrit après T0               → exclu du socle
  doublons de transactions              → dédoublonner sur (client_id, ts, montant)
  catégorie inédite au moment du score  → modalité « autre » prévue dès maintenant
```

### Les quatre cas limites à lister systématiquement

1. **L’ensemble vide** — un groupe sans aucune ligne. Que vaut la moyenne de rien ?
2. **Les valeurs manquantes** — absence de mesure, ou mesure à zéro ? Ce n’est pas la même chose, et
   `fillna(0)` tranche la question sans le dire.
3. **Les doublons sur la clé de jointure** — la cause numéro un des jointures qui multiplient les
   lignes.
4. **Les catégories inédites** — la modalité qui apparaît en production et que l’encodeur n’a jamais
   vue.

### Où calculer quoi

| L’opération | L’outil | Pourquoi |
|---|---|---|
| filtrer, joindre, agréger de gros volumes | SQL | les données ne traversent pas le réseau |
| fenêtres, classements, cumuls par groupe | SQL (`OVER`) ou pandas | les deux savent faire ; SQL si le volume dépasse la RAM |
| mise en forme fine, exploration, graphiques | pandas | itération rapide sur un échantillon |
| algèbre linéaire, optimisation, gradients | numpy, torch | vectorisé, compilé |
| règle métier tordue sur peu de lignes | python | la lisibilité prime sur la vitesse |

Repère d’ordre de grandeur : une boucle python traite environ 10⁶ à 10⁷ opérations simples par
seconde, numpy et pandas vectorisés environ cent fois plus. Au-delà de 10⁸ opérations, ne boucle
pas : vectorise ou pousse le calcul dans la base.

---

## R — RÉALISER

> Les gestes en cuisine. À ce stade, tu ne décides plus rien : tu exécutes une recette déjà écrite.

### Le dictionnaire de traduction

| Maths | python | pandas | SQL |
|---|---|---|---|
| `x ∈ ℝᵈ` | `list`, `tuple` | une ligne, `d` colonnes | une ligne |
| `Σᵢ xᵢ` | `sum(xs)` | `df["x"].sum()` | `SUM(x)` |
| `(1/n) Σᵢ xᵢ` | `sum(xs)/len(xs)` | `df["x"].mean()` | `AVG(x)` |
| `1[cond]` | `int(cond)` | `(df.c > 0).astype(int)` | `CASE WHEN c > 0 THEN 1 ELSE 0 END` |
| `{xᵢ : condᵢ}` | compréhension de liste | `df[df.c > 0]` | `WHERE c > 0` |
| `E[Y \| S = s]` | `defaultdict` + moyenne | `df.groupby("s")["y"].mean()` | `SELECT s, AVG(y) … GROUP BY s` |
| jointure sur clé | `dict` + lookup | `a.merge(b, on="k", how="left")` | `LEFT JOIN b USING (k)` |
| `argmax_i yᵢ` | `max(xs, key=…)` | `df["y"].idxmax()` | `ORDER BY y DESC LIMIT 1` |
| `q_α` (quantile) | `statistics.quantiles` | `df["y"].quantile(0.95)` | `PERCENTILE_CONT(0.95)` |
| rang dans un groupe | tri + `enumerate` | `df.groupby("k")["y"].rank()` | `ROW_NUMBER() OVER (PARTITION BY k ORDER BY y)` |
| `yₜ − yₜ₋₁` | `xs[i] - xs[i-1]` | `df["y"].diff()` | `y - LAG(y) OVER (ORDER BY t)` |
| `Σ` sur fenêtre glissante | boucle sur tranche | `df["y"].rolling(7).sum()` | `SUM(y) OVER (ORDER BY t ROWS 6 PRECEDING)` |
| `\|\|x\|\|₂` | `math.hypot(*xs)` | — | `SQRT(SUM(x*x))` |
| `XᵀX` | — | `X.T @ X` | — |
| `σ(z) = 1/(1+e⁻ᶻ)` | `1/(1+math.exp(-z))` | `scipy.special.expit(z)` | — |
| `Card({…})` | `len(set(xs))` | `df["k"].nunique()` | `COUNT(DISTINCT k)` |
| produit cartésien | `itertools.product` | `a.merge(b, how="cross")` | `CROSS JOIN` |

Lis ce tableau dans les deux sens. De gauche à droite pour écrire ton code. De droite à gauche pour
relire le code de quelqu’un d’autre et retrouver la formule qu’il avait en tête — y compris quand
cette formule était fausse.

### L’ordre dans lequel on écrit le code

1. **Charge un échantillon**, pas la table entière. `LIMIT 100000` ou `nrows=50_000`.
2. **Écris les assertions avant les transformations.** Ce que tu crois savoir sur les données, mets-le
   dans un `assert`. Tu en casseras un sur trois.
3. **Une cellule = une étape du pseudo-code**, et le nom de la variable reprend le nom de l’étape
   (`socle`, `hist`, `agregats`). La relecture devient triviale.
4. **Compte les lignes après chaque jointure.** Avant, après, et pourquoi c’est différent.
5. **Chaque colonne créée est lisible dans son nom** : `n_sessions_30j`, pas `feat_3`.

### Les six contrôles après chaque transformation

```python
print(df.shape)                                 # 1. combien de lignes, combien de colonnes
assert df["client_id"].is_unique                # 2. la clé est-elle encore une clé
print(df.isna().mean().sort_values().tail())    # 3. où sont les trous
print(df.describe().T[["min", "max"]])          # 4. les bornes sont-elles plausibles
print(df["y"].value_counts(normalize=True))     # 5. la cible est-elle déséquilibrée
# 6. prends UNE ligne et recalcule-la à la main
```

Le sixième est le plus important et c’est celui qu’on saute. Une ligne, un crayon, trente secondes.

### Pièges pandas et SQL qui coûtent une journée

- **`merge` qui multiplie les lignes** : la clé n’était pas unique à droite. Vérifie
  `b["k"].is_unique` avant, pas après.
- **`groupby` ignore les `NaN` de la clé** par défaut. Tes lignes disparaissent sans message.
- **Moyenne de moyennes ≠ moyenne.** `df.groupby("k")["y"].mean().mean()` n’est pas `df["y"].mean()`
  dès que les groupes ont des tailles différentes.
- **`COUNT(colonne)` ignore les `NULL`**, `COUNT(*)` les compte. Après un `LEFT JOIN`, les deux
  divergent et c’est en général `COUNT(*)` qui ment sur ce que tu voulais dire.
- **`WHERE` sur la table de droite d’un `LEFT JOIN`** le transforme en `INNER JOIN`. La condition va
  dans le `ON`.
- **Affectation chaînée** : `df[df.a > 0]["b"] = 1` ne modifie rien. Utilise `.loc`.
- **`fillna(0)` sur une variable où l’absence a un sens** : tu viens d’inventer des données.

---

## É — ÉVALUER

> On goûte avant de servir. Et on fait goûter à quelqu’un qui n’a pas cuisiné.

### 1. Le découpage imite le déploiement

C’est la règle la plus violée du métier. Un découpage aléatoire mesure la mauvaise chose dès que tes
données ont une structure.

| Situation | Découpage |
|---|---|
| Je prédis le futur | temporel : entraînement avant `T`, test après `T` |
| Une entité apparaît plusieurs fois | par groupe : un client est entièrement dans un seul pli |
| Classe rare | stratifié, pour garder le taux de positifs |
| Données géographiques ou par magasin | par site, si le modèle doit généraliser à de nouveaux sites |

Si ton AUC chute de 0,89 à 0,71 en passant d’un découpage aléatoire à un découpage temporel, ce
n’est pas le découpage temporel qui est pessimiste : c’est l’autre qui mentait.

### 2. La baseline d’abord, chiffrée

Avant d’entraîner quoi que ce soit, le score de la règle bête est dans ton carnet. Un modèle qui ne
la bat pas n’est pas un modèle, c’est une dépendance supplémentaire à maintenir.

### 3. Une métrique de décision, deux de surveillance

Une seule métrique tranche (celle qui vient de la question 5 du cadrage). Les autres surveillent les
effets de bord. Trois métriques « également importantes » signifient qu’aucune décision n’a été
prise.

### 4. Un chiffre sans dispersion ne vaut rien

Rejoue le découpage (plusieurs plis, plusieurs graines) et regarde l’écart. Sur 200 lignes de test,
un écart de 0,3 point entre deux modèles est du bruit. Annonce `0,71 ± 0,04`, jamais `0,713`.

### 5. L’analyse d’erreurs : non négociable

Trie par erreur décroissante, prends les vingt pires cas, et regarde-les un par un. Cherche le point
commun. C’est de loin le geste qui rapporte le plus par minute investie, et il ne s’automatise pas.

### 6. Les quatre questions de fuite

- Cette colonne existe-t-elle à `t₀`, avec cette valeur-là ?
- Ai-je calculé une normalisation, un encodage ou une imputation **avant** le découpage ?
- Un identifiant, une date ou un numéro de ligne porte-t-il de l’information sur `y` ?
- Mes groupes se chevauchent-ils entre entraînement et test ?

### 7. Le test « trop beau »

AUC à 0,99 sur un problème de churn, R² à 0,98 sur une prévision de ventes : la fuite est l’explication
la plus probable, devant le talent. Cherche-la avant d’annoncer le résultat. C’est moins humiliant
que de la trouver en réunion.

---

## S — SCELLER

> Noter la recette dans le livre, avec ce qui a raté.

Cinq à dix lignes, dans un fichier versionné, à la fin de chaque problème :

```
Phrase unique          : …
Objet mathématique     : …  perte : …  métrique : …
Découpage              : …
Baseline               : 0,xx     Modèle : 0,yy ± 0,zz
Décision prise         : on déploie / on abandonne / on retourne à C
Ce qui a échoué        : …  (les pistes mortes valent les pistes vives)
Prochaine question     : …
```

Un ingénieur ML n’est pas payé pour des modèles, il est payé pour des décisions reproductibles. Dans
six mois, c’est ce bloc de dix lignes que tu reliras, pas le notebook.

---

## Exemple déroulé de bout en bout

Problème tel qu’il arrive : *« on perd trop de clients, tu peux regarder ? »*

### C — Cadrer

> Pour chaque **abonnement actif**, le **1er du mois (`T0`)**, je prédis la **résiliation dans les
> 30 jours** à partir de l'**usage et de la facturation strictement antérieurs à `T0`**, pour aider
> l'**équipe fidélisation** à décider **quels 500 clients appeler ce mois-ci**. Je dois battre la
> règle **« aucune connexion depuis 30 jours »**, mesuré par la **précision sur les 500 premiers
> scores**, sur les **abonnés de plus de 3 mois**.

Coût des erreurs : un appel inutile coûte 4 € ; un client perdu coûte 180 € de marge annuelle. Le
rapport de 45 justifie de viser le rappel plutôt que la précision brute, sous contrainte de
500 appels par mois.

### A — Abstraire

```
Entrées     X ∈ ℝⁿˣ⁷,  n ≈ 120 000 abonnements actifs
Cible       y ∈ {0,1},  y = 1[résiliation ∈ ]T0, T0+30j]]
Hypothèse   gradient boosting (non-linéarités, variables hétérogènes, peu de réglage)
Perte       L(θ) = −(1/n) Σᵢ [yᵢ log pᵢ + (1−yᵢ) log(1−pᵢ)]
Métrique    précision@500 = (1/500) Σ_{i ∈ top500} yᵢ
Contrainte  batch mensuel, pas de contrainte de latence
```

### D — Décomposer

```
1. socle    ← abonnements actifs à T0, ancienneté > 3 mois
2. hist     ← événements d'usage où ts < T0
3. agregats ← par client : n_sessions_30j, n_sessions_90j, recence_j,
                           montant_moyen, n_tickets_support, variation_usage
4. X        ← socle LEFT JOIN agregats, absents remplis par 0 (sauf recence_j)
5. y        ← 1 si résiliation dans ]T0, T0+30j]
6. contrôles: unicité de client_id, aucune donnée >= T0, taux de y entre 1 % et 10 %
```

### R — Réaliser

L’étiquette, en SQL (la base fait le gros du travail) :

```sql
WITH socle AS (
    SELECT client_id
    FROM abonnements
    WHERE date_debut <= DATE '2026-01-01' - INTERVAL '3 months'
      AND (date_fin IS NULL OR date_fin > DATE '2026-01-01')
)
SELECT s.client_id,
       CASE WHEN r.client_id IS NOT NULL THEN 1 ELSE 0 END AS y
FROM socle s
LEFT JOIN resiliations r
       ON r.client_id = s.client_id
      -- la fenêtre est dans le ON, pas dans un WHERE : sinon le LEFT JOIN
      -- redevient un INNER JOIN et les non-résiliés disparaissent
      AND r.date_resiliation >  DATE '2026-01-01'
      AND r.date_resiliation <= DATE '2026-01-01' + INTERVAL '30 days';
```

Les variables, en pandas (`E[·]` par client sur l’historique antérieur à `T0`) :

```python
T0 = pd.Timestamp("2026-01-01")

hist = evenements.loc[evenements["ts"] < T0]          # garde-fou anti-fuite, une seule fois
fen30 = hist.loc[hist["ts"] >= T0 - pd.Timedelta(days=30)]

X = socle.set_index("client_id")
X["n_sessions_30j"] = fen30.groupby("client_id").size()
X["n_sessions_90j"] = hist.loc[hist["ts"] >= T0 - pd.Timedelta(days=90)].groupby("client_id").size()
X["recence_j"] = (T0 - hist.groupby("client_id")["ts"].max()).dt.days
X["montant_moyen"] = hist.groupby("client_id")["montant"].mean()

X[["n_sessions_30j", "n_sessions_90j"]] = X[["n_sessions_30j", "n_sessions_90j"]].fillna(0)
X["recence_j"] = X["recence_j"].fillna(9999)          # jamais vu ≠ vu aujourd'hui

assert X.index.is_unique
assert len(X) == len(socle)
assert hist["ts"].max() < T0
```

La baseline, en trois lignes :

```python
base = (X["recence_j"] >= 30).astype(int)
top500_base = X.loc[base == 1, "recence_j"].nlargest(500).index
precision_base = y.loc[top500_base].mean()           # 0,21
```

### É — Évaluer

Découpage temporel : entraînement sur les `T0` de janvier à septembre, test sur octobre et novembre.
Un découpage aléatoire mélangerait les mois et laisserait le modèle apprendre le futur.

```
baseline « inactif 30 j »   précision@500 = 0,21
gradient boosting           précision@500 = 0,34 ± 0,03
```

Analyse des vingt pires faux positifs : dix-sept sont des comptes professionnels à usage saisonnier.
Retour à l’étape C — ils n’appartiennent pas à la population d’évaluation, et une variable
`type_compte` manque au cadrage.

### S — Sceller

```
Baseline 0,21 → modèle 0,34 ± 0,03 sur octobre-novembre. 62 clients retenus en plus
pour 500 appels, soit ~11 000 € de marge pour 2 000 € d'appels.
Échec : le découpage aléatoire donnait 0,52, entièrement dû à la fuite temporelle.
Prochaine question : séparer les comptes professionnels des comptes particuliers.
```

---

## Les huit pièges, et l’étape qu’ils trahissent

| Symptôme | Étape sautée |
|---|---|
| « Mon modèle marche mais personne ne l’utilise » | C — aucune décision nommée |
| « Je ne sais pas si 0,78 c’est bien » | C — pas de baseline |
| « J’ai 0,99 d’AUC » | É — fuite non cherchée |
| « Le score s’écroule en production » | É — découpage qui n’imite pas le déploiement |
| « Mon accuracy est de 97 % et le modèle dit toujours non » | A — perte inadaptée au déséquilibre |
| « Ma jointure a créé 3 millions de lignes » | D — doublons sur la clé non listés |
| « Je ne sais plus pourquoi cette colonne est là » | R — code écrit avant le pseudo-code |
| « J’ai refait le même travail six mois plus tard » | S — rien de scellé |

## Les six règles courtes

1. Pas de clavier avant la phrase unique.
2. Pas de modèle avant la baseline chiffrée.
3. Pas de colonne sans le test de `t₀`.
4. Pas de chiffre sans dispersion.
5. Pas de score sans vingt erreurs regardées à la main.
6. Pas de problème clos sans dix lignes scellées.
