Un modèle de ML ne dit jamais « c'est un chat ». Il dit « P(chat) = 0.92 ». Cette nuance n'est pas une précaution de langage : c'est la nature même de ce que la machine produit, et la source de presque toutes les erreurs d'interprétation du métier.

## Variable aléatoire, espérance, variance

Une **variable aléatoire** est une quantité dont la valeur dépend du hasard : le résultat d'un dé, la taille d'une personne tirée au sort, la prédiction d'un modèle sur un exemple inconnu.

L'**espérance** E[X] est sa moyenne à long terme — ce vers quoi tend la moyenne empirique quand on répète l'expérience une infinité de fois. Pour un dé à six faces, E[X] = 3.5, une valeur que le dé ne produit jamais. L'espérance est une propriété de la **loi**, pas un résultat possible.

La **variance** Var(X) mesure l'étalement autour de l'espérance : la moyenne des carrés des écarts. On lui préfère souvent sa racine, l'**écart-type** σ, parce qu'elle est dans la même unité que les données. Une variance en euros carrés ne parle à personne ; un écart-type en euros, si.

Ces deux nombres te suivront partout, y compris dans le nom du problème central du ML, le compromis **biais-variance** : un modèle trop simple se trompe toujours de la même façon (biais), un modèle trop complexe change d'avis selon le jeu d'entraînement qu'on lui donne (variance).

## Les lois qu'on croise vraiment

**Bernoulli** — une épreuve à deux issues, de probabilité p. C'est la loi que suit la sortie d'un classifieur binaire.

**Binomiale** — le nombre de succès sur n épreuves de Bernoulli. C'est la loi du nombre de bonnes prédictions sur un jeu de test, et c'est pour ça qu'elle sert à calculer l'incertitude d'une accuracy.

**Uniforme** — toutes les valeurs également probables. Celle des générateurs aléatoires et de l'initialisation naïve des poids.

**Normale** 𝒩(μ, σ²) — la courbe en cloche, définie par sa moyenne μ et sa variance σ². Elle est partout : initialisation des poids, modélisation du bruit, hypothèses de la plupart des tests statistiques.

Sa règle d'usage, à connaître par cœur, parce qu'elle permet de juger un écart en une seconde :

```
68 %   des valeurs dans μ ± 1σ
95 %   des valeurs dans μ ± 2σ
99.7 % des valeurs dans μ ± 3σ
```

Pourquoi est-elle si omniprésente ? À cause du **théorème central limite** : la somme d'un grand nombre de petites causes indépendantes tend vers une loi normale, **quelle que soit** la loi de ces causes. Une taille humaine résulte de milliers de facteurs génétiques et environnementaux ; leur somme est gaussienne même si aucun d'eux ne l'est. Ce n'est pas une coïncidence de la nature, c'est un théorème.

Attention toutefois au réflexe inverse : tout n'est pas normal. Les revenus, les tailles de fichiers, les durées de visite ont des distributions très asymétriques, avec une longue queue à droite. Y appliquer des outils qui supposent la normalité donne des réponses fausses et confiantes.

## Probabilité conditionnelle

P(A | B) se lit « probabilité de A **sachant que** B est vrai ». On ne regarde plus toute la population, seulement la part où B est réalisé.

```
P(A | B) = P(A et B) / P(B)
```

Le piège : **P(A|B) et P(B|A) ne sont pas la même chose**, et les confondre est l'erreur de raisonnement la plus coûteuse de tout le domaine. La probabilité qu'un chien ait quatre pattes est proche de 1 ; la probabilité qu'un animal à quatre pattes soit un chien est faible.

## Le théorème de Bayes

Il relie justement les deux :

```
P(A | B) = P(B | A) · P(A) / P(B)
```

Il permet de **retourner** une probabilité conditionnelle, et donc de passer de « ce que le test détecte » à « ce que je dois croire quand le test sonne ». C'est la base du classifieur naïf bayésien, et plus largement de toute mise à jour d'une croyance par une observation.

### Ce que ça donne en vrai

Un détecteur de fraude bancaire. Une transaction sur 10 000 est frauduleuse. Le détecteur attrape 99 % des fraudes, et se trompe sur 1 % des transactions honnêtes.

L'alarme sonne. Quelle est la probabilité que ce soit vraiment une fraude ?

Raisonne sur un million de transactions, c'est plus clair que la formule :

```
100 fraudes          → 99 détectées
999 900 honnêtes     → 9 999 fausses alarmes
                       ----------------------
total des alarmes    → 10 098
```

```
P(fraude | alarme) = 99 / 10 098 ≈ 0.98 %
```

**Moins d'une alarme sur cent correspond à une vraie fraude.** Avec un détecteur à 99 % dans les deux sens. Ce n'est pas une erreur de calcul et ce n'est pas un mauvais détecteur : c'est que les fraudes sont tellement rares que même un petit pourcentage d'erreurs sur l'énorme masse des transactions honnêtes noie les vrais cas.

## Le taux de base, l'erreur qui coûte le plus cher

Ce qui précède porte un nom, l'**oubli du taux de base**, et c'est la raison pour laquelle l'*accuracy* est une métrique dangereuse.

Sur ces mêmes données, un modèle qui répond « jamais de fraude » sans rien regarder obtient **99.99 % d'accuracy**. Il est parfaitement inutile. Son score est pourtant meilleur que celui de ton détecteur.

Retiens la conséquence pratique plus que la formule : **dès que les classes sont déséquilibrées, l'accuracy ne veut rien dire.** Il faut regarder la précision — parmi les alarmes, combien sont vraies, ici 0.98 % — et le rappel — parmi les fraudes, combien sont attrapées, ici 99 %. Les deux ensemble, jamais l'une sans l'autre.

Et une performance anormalement bonne est une hypothèse à réfuter, pas une bonne nouvelle. Les deux causes à vérifier en premier : un déséquilibre de classes comme ici, ou une fuite de données.

## Moyenne, médiane, robustesse

La **moyenne** se laisse tirer par les valeurs extrêmes ; la **médiane**, qui coupe l'échantillon en deux, ne bouge pas.

Dix salaires de 40 000 € et un de 10 millions : la moyenne dépasse 900 000 €, la médiane reste à 40 000 €. Lequel décrit la réalité du groupe ?

Règle simple : si la distribution est asymétrique ou contient des valeurs aberrantes, la médiane dit la vérité et la moyenne ment. Avant de calculer quoi que ce soit, **regarde la distribution** — un histogramme coûte une ligne de code et évite des conclusions fausses.

## Corrélation

Deux avertissements, pas un seul.

**La corrélation n'est pas la causalité.** Les ventes de glaces et les noyades augmentent ensemble ; c'est l'été qui cause les deux. Une variable cachée qui agit sur les deux suffit à créer une corrélation parfaite sans le moindre lien de cause à effet.

**Le coefficient de corrélation usuel ne voit que le linéaire.** Deux variables liées par une relation parabolique nette peuvent avoir une corrélation de 0. Un coefficient proche de zéro ne veut donc pas dire « sans rapport », il veut dire « sans rapport **linéaire** ». Là encore, le nuage de points en dit plus que le nombre.

## Un chiffre sans incertitude n'est pas un résultat

Ton modèle obtient 94 % d'accuracy. Sur combien d'exemples ?

```
sur 100 exemples    → intervalle à 95 % : environ [89 %, 99 %]
sur 10 000 exemples → intervalle à 95 % : environ [93.5 %, 94.5 %]
```

Même chiffre, deux significations complètement différentes. Dans le premier cas, un modèle concurrent à 91 % n'est **pas** distinguable du tien. Dans le second, il l'est nettement.

L'intuition à garder : l'incertitude décroît en 1/√n. **Pour diviser la marge d'erreur par deux, il faut quatre fois plus de données.** C'est pour ça qu'un jeu de test de 50 exemples ne permet de conclure sur rien du tout, quel que soit le soin mis à l'entraînement.

Annoncer « 94 % » sans dire sur combien d'exemples, c'est annoncer un chiffre qu'on n'a pas compris.

## Le maximum de vraisemblance

Dernier point, et il relie tout.

Le principe : parmi tous les paramètres possibles, choisis ceux qui rendent **les données observées les plus probables**. Formulé ainsi, c'est presque une évidence. Sa portée l'est moins.

Les fonctions de coût que tu utiliseras ne sont pas des inventions arbitraires, ce sont des conséquences de ce principe selon la loi qu'on suppose :

- Si on suppose un bruit **gaussien** autour de la prédiction, maximiser la vraisemblance revient exactement à minimiser l'**erreur quadratique moyenne**.
- Si on suppose une sortie **de Bernoulli**, ça revient exactement à minimiser l'**entropie croisée**.

Autrement dit, choisir une fonction de coût, c'est faire une hypothèse sur la distribution de tes données — que tu le saches ou non. Utiliser la MSE sur un problème de classification binaire n'est pas « moins pratique », c'est supposer quelque chose de faux sur la nature des données.

## Au clavier

```python
import numpy as np

x = np.array([40, 41, 39, 42, 38, 40, 10000])

x.mean()        # 1465.7  — tirée par la valeur extrême
np.median(x)    # 40.0    — insensible
x.std()         # grand, et c'est l'alerte

# L'incertitude d'une accuracy de 94 % selon la taille du test
for n in (100, 10_000):
    se = np.sqrt(0.94 * 0.06 / n)
    print(f"n={n:>6} : ±{1.96 * se * 100:.1f} points")
```

Trois réflexes à installer :

1. **Toujours tracer la distribution avant de calculer une moyenne.** Un histogramme révèle l'asymétrie, les valeurs aberrantes et les modes multiples que la moyenne cache.
2. **Toujours accompagner une métrique de la taille de l'échantillon.** « 94 % sur 10 000 exemples » est un résultat ; « 94 % » est une anecdote.
3. **Devant un déséquilibre de classes, calculer ce que donnerait le modèle bête** qui répond toujours la classe majoritaire. C'est ta baseline. Si ton modèle ne la bat pas franchement, il n'a rien appris.
