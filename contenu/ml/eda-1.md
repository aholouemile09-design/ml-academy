Un graphique est un instrument de mesure, et comme tout instrument il a une erreur de lecture. Deux personnes honnêtes qui tracent les mêmes données peuvent en tirer deux conclusions opposées, simplement parce que l'une a choisi vingt bacs d'histogramme et l'autre cinq. Cette leçon porte sur l'instrument : comment il se tient, et comment il se trompe.

## La grammaire : figure, axes, et l'état caché

Matplotlib a deux interfaces, et c'est la source de la moitié de la confusion sur cette bibliothèque.

**L'interface `plt.`** travaille sur « la figure courante ». Un appel à `plt.plot()` dessine sur une figure implicite, que Matplotlib a créée ou retrouvée pour toi.

```python
plt.plot(x, y)
plt.title("Mon graphique")
plt.show()
```

C'est court, et c'est un piège dès qu'il y a plus d'un graphique. Dans une boucle, dans un notebook qu'on réexécute, dans une fonction qui en appelle une autre, « la figure courante » n'est pas celle que tu crois. Les symptômes classiques : deux courbes qui se superposent sans raison, un titre qui atterrit sur le mauvais panneau, une figure vide.

**L'interface objet** nomme ce qu'elle manipule.

```python
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y)
ax.set_title("Mon graphique")
```

- **`fig`** est la feuille entière : sa taille, sa résolution, son enregistrement.
- **`ax`** est un système d'axes, une zone de tracé : ses données, ses étiquettes, sa légende.

Une figure contient un ou plusieurs axes. `plt.subplots(2, 3)` en rend six, dans un tableau numpy que tu indexes.

**La règle à adopter une fois pour toutes** : n'utilise `plt.` que pour quatre choses — `subplots`, `tight_layout`, `savefig`, `show`. Tout le reste passe par `ax` ou `fig`. Le code est un peu plus long et il ne te surprendra jamais.

Un détail qui fait gagner du temps : les méthodes `set_*` d'un axe s'écrivent en une seule fois.

```python
ax.set(title="Courbes d'apprentissage", xlabel="époque", ylabel="perte")
```

## Seaborn est une couche, pas un concurrent

Seaborn ne remplace pas Matplotlib : il l'appelle. Chaque graphique Seaborn finit par dessiner sur un `ax` Matplotlib, et c'est pour ça qu'on peut mélanger les deux librement — tracer un `sns.boxplot` puis ajouter une ligne horizontale avec `ax.axhline()`.

Mais Seaborn a **deux familles de fonctions**, et confondre les deux est l'erreur la plus fréquente du module.

**Les fonctions de niveau axes** dessinent dans un `ax` qu'on leur donne : `histplot`, `boxplot`, `violinplot`, `scatterplot`, `lineplot`, `barplot`, `heatmap`, `kdeplot`. Elles acceptent `ax=` et vont donc dans un panneau.

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.histplot(data=df, x="age", ax=axes[0])
sns.boxplot(data=df, x="classe", y="age", ax=axes[1])
```

**Les fonctions de niveau figure** créent leur **propre figure** : `pairplot`, `jointplot`, `displot`, `catplot`, `relplot`, `lmplot`. Elles ignorent `ax=` ou lèvent une erreur, parce qu'elles gèrent elles-mêmes une grille de panneaux.

```python
g = sns.pairplot(df, hue="target")   # ne peut PAS aller dans un subplot
g.fig.suptitle("Relations deux à deux", y=1.02)
```

Elles retournent un objet `FacetGrid` ou `JointGrid`, pas un `ax`. On atteint la figure par `g.fig` et les axes par `g.axes`.

**Le signal dans les noms** : quand deux fonctions font la même chose, celle en `-plot` court est de niveau axes et celle en `dis-`/`cat-`/`rel-` est de niveau figure. `histplot` va dans un panneau, `displot` fabrique sa figure. Même graphique, deux portées.

Quand une erreur du type `got an unexpected keyword argument 'ax'` tombe, la cause est toujours celle-là.

## L'histogramme ment avec ses bacs

Voici l'erreur de lecture la plus coûteuse, et elle ne laisse aucune trace.

Un histogramme ne montre pas les données, il montre les données **regroupées**. Le nombre de bacs est un choix, et ce choix change la conclusion. Sur un même échantillon :

```
10 bacs   →  une seule bosse, distribution « normale »
50 bacs   →  deux bosses nettes, deux populations
200 bacs  →  du bruit, plus aucune forme
```

Les trois images sont exactes. Aucune n'est la vérité.

Il existe des règles automatiques — **Sturges** (le défaut historique, qui sous-estime dès que l'échantillon est gros) et **Freedman-Diaconis**, qui tient compte de la dispersion et résiste mieux aux valeurs extrêmes. `bins="auto"` dans numpy prend le maximum des deux. Ce sont des défauts raisonnables, pas des réponses.

**La courbe de densité (KDE) n'est pas la solution**, contrairement à ce qu'on croit en la voyant si lisse. Elle remplace le choix du nombre de bacs par le choix d'une **largeur de fenêtre**, exactement aussi arbitraire. Et elle a un défaut propre : elle lisse au-delà des bornes. Une KDE sur des âges étale de la densité sous zéro, c'est-à-dire qu'elle affirme l'existence de passagers d'âge négatif. Sur des durées, des prix, des comptages — tout ce qui est positif par nature —, le bord gauche d'une KDE est faux.

**Le réflexe honnête** : avant de conclure sur une forme, regarde deux ou trois découpages. Si la bosse survit, elle existe. Si elle apparaît à 50 bacs et disparaît à 20, c'est du bruit.

Et sur un petit échantillon — moins d'une centaine de points —, ne regroupe pas du tout : montre **les points eux-mêmes**. `sns.stripplot` ou `sns.swarmplot` affichent chaque observation. Vingt points dans un histogramme ne forment aucune distribution, ils forment vingt barres mensongères.

## Le sur-tracé : cent mille points font une tache

Un nuage de points avec 100 000 observations n'est pas un nuage, c'est un aplat. Et cet aplat se lit comme « relation très forte » alors qu'il ne dit rien du tout : c'est juste de l'encre superposée.

Quatre remèdes, par ordre de coût :

- **La transparence.** `alpha=0.1` transforme l'opacité en densité : les zones sombres sont celles où les points s'empilent. Premier geste, presque toujours suffisant jusqu'à ~50 000 points.
- **Réduire le marqueur.** `s=2` au lieu du défaut. Se combine avec l'alpha.
- **Échantillonner.** 5 000 points tirés **au hasard** montrent la même structure. `df.sample(5000)`, jamais `df.head(5000)` — les premières lignes d'un fichier sont souvent triées, et un échantillon trié n'est pas un échantillon.
- **Agréger en cases.** `ax.hexbin(x, y)` ou `sns.histplot(x=.., y=..)` comptent les points par cellule et encodent le compte en couleur. C'est la seule approche qui reste lisible au million de points, et c'est un histogramme à deux dimensions.

Au-delà, Matplotlib n'est plus l'outil : il faut agréger avant de tracer.

## Les échelles

**L'échelle logarithmique** est le geste qui rend lisible une variable à queue lourde — revenus, tailles de fichiers, nombre d'abonnés. Tu as vu au cours sur les distributions pourquoi : beaucoup de ces lois deviennent presque symétriques une fois le log pris.

```python
ax.set_xscale("log")
```

Deux limites à connaître. Un axe log **ne peut pas afficher zéro** (log(0) est −∞) ni les négatifs : les points concernés disparaissent **silencieusement**. S'il y a des zéros légitimes, `set_xscale("symlog")` garde une zone linéaire autour de zéro.

**Le rapport d'aspect change la pente perçue.** La même droite paraît douce dans une figure large et raide dans une figure haute. Quand l'enjeu du graphique *est* la pente — une croissance, une dégradation —, le `figsize` n'est pas un réglage esthétique, c'est une partie de l'argument.

## Les couleurs, trois familles

Un choix de palette n'est pas décoratif : il encode de l'information, ou il en invente.

- **Séquentielle** — `viridis`, `magma`, `Blues`. Une seule direction, du clair au foncé. Pour une grandeur ordonnée : une densité, un comptage, une température.
- **Divergente** — `coolwarm`, `RdBu`, `BrBG`. Deux directions autour d'un milieu qui a un sens. Pour tout ce qui est signé : un écart à la moyenne, une corrélation, une variation.
- **Qualitative** — `tab10`, `Set2`. Des teintes distinctes sans ordre, pour des catégories.

Utiliser une séquentielle sur des catégories suggère un classement qui n'existe pas. Utiliser une qualitative sur une grandeur continue détruit l'ordre.

**Évite `jet` et les arcs-en-ciel.** Ils ne sont pas perceptuellement uniformes : la luminosité y monte et descend, ce qui crée des **frontières visuelles là où les données sont lisses**, et écrase les écarts dans les zones jaunes. Matplotlib a changé son défaut pour `viridis` en 2015 pour cette raison précise.

**Environ 8 % des hommes distinguent mal le rouge du vert.** Un graphique dont la seule distinction est rouge/vert est illisible pour une personne sur treize dans ton auditoire. Deux garde-fous : `sns.set_palette("colorblind")`, et surtout **double encodage** — la catégorie porte à la fois une couleur et un marqueur, ou un style de trait. Le test le plus simple : imprime en niveaux de gris. Si le graphique survit, il est robuste.

## Ce qui rend un graphique faux sans qu'il mente

Trois constructions qui se glissent dans des rapports sérieux.

**L'axe tronqué sur un diagramme en barres.** Une barre encode une valeur par sa **longueur** : sa base doit donc être à zéro. Un barplot qui commence à 90 transforme un écart de 2 % en un écart visuel de 70 %. Sur une courbe, en revanche, tronquer est légitime — une ligne encode une position, pas une longueur.

**Les deux axes des ordonnées.** Superposer deux séries avec deux échelles indépendantes permet de fabriquer **n'importe quelle** corrélation apparente : il suffit de choisir les échelles. Préfère deux panneaux empilés qui partagent l'axe des x (`plt.subplots(2, 1, sharex=True)`). On perd l'effet, on garde la vérité.

**Les données absentes qui ne se voient pas.** Matplotlib saute les `NaN` dans une courbe, ce qui laisse un trou — invisible si les points sont denses. Seaborn, lui, supprime souvent les lignes incomplètes sans rien dire. Dans les deux cas le graphique est beau et il manque des données. Compte les manquants **avant** de tracer, jamais après.

## Enregistrer

```python
fig.savefig("figure.png", dpi=150, bbox_inches="tight")
plt.show()
```

Quatre points qui coûtent du temps quand on les ignore :

**`savefig` avant `show`.** Selon le backend, `show()` vide la figure ; un `savefig` placé après produit alors une image blanche. L'ordre n'est pas une convention, c'est une contrainte.

**`bbox_inches="tight"`** recadre sur le contenu réel. Sans lui, une étiquette d'axe longue ou une légende déportée se retrouve coupée.

**`dpi=150`** pour un écran, `300` pour une impression. Le défaut à 100 donne une image floue dès qu'on l'agrandit.

**Vectoriel ou matriciel.** PDF et SVG restent nets à tout agrandissement : c'est le bon choix pour un rapport. Mais un nuage de 500 000 points en SVG produit un fichier qui contient 500 000 objets — des dizaines de mégaoctets qu'aucun lecteur n'ouvrira. Au-delà de quelques milliers de marqueurs, PNG.

Et dans une boucle qui génère des figures, `plt.close(fig)` à chaque tour. Sans ça la mémoire monte, et Matplotlib avertit à partir de vingt figures ouvertes.

## Au clavier

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style="whitegrid", palette="colorblind")

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Le meme echantillon, trois decoupages : la forme survit-elle ?
for ax, n in zip(axes, [10, 40, 150]):
    sns.histplot(donnees, bins=n, ax=ax)
    ax.set(title=f"{n} bacs", xlabel="", ylabel="")

fig.savefig("bacs.png", dpi=150, bbox_inches="tight")
plt.show()
```

Trois réflexes :

1. **Toujours `fig, ax = plt.subplots()`.** Jamais `plt.plot` directement. Le jour où tu auras deux graphiques dans la même cellule, tu comprendras pourquoi.
2. **Deux ou trois découpages avant de conclure sur une forme.** Une bosse qui ne survit pas au changement de bacs n'existe pas.
3. **Compte les valeurs manquantes avant de tracer.** Un graphique ne montre jamais ce qui n'est pas là, et c'est souvent l'information la plus importante.
