Le ML supervisé apprend une fonction `f : X → y` à partir d'exemples étiquetés. La phrase est juste, et elle cache trois hypothèses qu'on ne découvre généralement qu'en production.

## L'étiquette est une mesure, pas la vérité

Dans un cours, `y` tombe du ciel : le dataset est livré étiqueté. Dans un projet, quelqu'un a dû fabriquer cette colonne, et la façon dont il l'a fabriquée détermine le plafond de tout ce que tu construiras ensuite.

### L'étiquette approchée

On veut rarement prédire ce qu'on peut mesurer. Prends le « départ client » :

| Ce qu'on veut prédire | Ce qu'on peut mesurer |
|---|---|
| Le client a décidé de partir | Aucun achat depuis 90 jours |
| Ce document est pertinent | L'utilisateur a cliqué dessus |
| Ce candidat réussira au poste | Il est encore là dans 18 mois |
| Cette transaction est frauduleuse | Elle a été signalée par la banque |

Chaque ligne du tableau est un compromis, et chaque compromis a des conséquences chiffrables. « Aucun achat depuis 90 jours » étiquette comme partis des clients saisonniers qui reviendront en novembre. « L'utilisateur a cliqué » apprend à ton modèle à prédire des titres accrocheurs plutôt que des documents utiles. « Signalée par la banque » n'étiquette que les fraudes **détectées** : ton modèle apprendra à reproduire les détections passées, pas à trouver les fraudes qui passent.

Le dernier cas porte un nom, et c'est le plus vicieux : **la rétroaction de l'étiquette**. Si l'étiquette vient d'un système de décision déjà en place, le modèle apprend ce système, pas le phénomène.

### Le bruit d'étiquetage fixe un plafond

Quand des humains étiquettent, ils se trompent. Quand une règle automatique étiquette, elle se trompe systématiquement. Dans les deux cas, le modèle ne peut pas faire mieux que l'étiquette.

En inversant un pourcentage croissant des étiquettes du jeu du cancer du sein, puis en entraînant la même forêt aléatoire :

```
  0 % d'étiquettes inversées  →  train = 1,000   test = 0,947
  5 %                         →  train = 1,000   test = 0,912
 10 %                         →  train = 1,000   test = 0,895
 20 %                         →  train = 1,000   test = 0,749
```

Le modèle atteint toujours 100 % sur le train — il mémorise le bruit sans broncher. Mais le test plafonne, et le plafond descend à mesure que les étiquettes se dégradent. **À 20 % de bruit, aucun modèle au monde ne dépassera les 80 %.**

C'est ce qu'on appelle l'**erreur irréductible**, ou erreur de Bayes : la part d'incertitude qui vient des données elles-mêmes et qu'aucune architecture ne rattrape. Elle a une conséquence pratique immédiate : avant de passer trois semaines à optimiser un modèle bloqué à 0,86, il faut se demander si 0,86 n'est pas simplement le plafond. Et la façon d'en avoir une idée n'est pas statistique, elle est humaine : fais réétiqueter cinq cents lignes par deux personnes indépendamment et mesure leur taux de désaccord.

## L'hypothèse cachée du découpage aléatoire

`train_test_split` tire les lignes au hasard. Ce geste suppose quelque chose de fort : que tes lignes sont **indépendantes et tirées de la même distribution**. C'est l'hypothèse i.i.d., et c'est elle qui rend le score de test significatif.

Dès qu'elle tombe, le score de test cesse de mesurer la généralisation. Elle tombe dans trois situations très courantes.

### Les lignes qui appartiennent au même individu

Trois visites du même patient, douze commandes du même client, quarante images du même produit : les lignes d'un même individu se ressemblent. Un découpage aléatoire en met dans le train et dans le test. Le modèle n'a plus besoin de généraliser, il lui suffit de reconnaître l'individu.

En dupliquant chaque patient trois fois avec un léger bruit de mesure, puis en comparant les deux découpages :

```
  découpage aléatoire des lignes      →  test = 0,9981
  découpage par patient (GroupKFold)  →  test = 0,9688
```

Trois points d'illusion pure, et rien ne les signale. Le remède est un découpage par groupe — `GroupShuffleSplit` ou `GroupKFold`, avec la colonne d'identité comme groupe. La règle : **si deux lignes peuvent venir du même individu, l'individu doit être entier d'un seul côté de la frontière.**

### Le temps

Si tes données sont datées et que tu prédis l'avenir, un découpage aléatoire entraîne ton modèle sur des jours postérieurs à ceux qu'il doit prédire. C'est le sujet du module Séries temporelles, et le réflexe à retenir ici est qu'une colonne de dates dans un fichier est une raison suffisante de ne pas tirer au hasard.

### Les classes rares

Avec 2 % de positifs et un test de 200 lignes, un tirage aléatoire peut livrer un test à 0,5 % de positifs — ou à 4 %. L'argument `stratify=y` force chaque jeu à conserver les proportions d'origine. Ce n'est pas une option de confort : sans lui, la variance de ton score vient autant du tirage que du modèle.

## La taille du test détermine ce que ton score veut dire

Un score sur un jeu de test est une estimation, et toute estimation a une précision. Pour une accuracy autour de 93 % :

| Taille du test | Intervalle à 95 % |
|---|---|
| 100 lignes | ± 5,0 points |
| 200 lignes | ± 3,5 points |
| 1 000 lignes | ± 1,6 points |
| 10 000 lignes | ± 0,5 point |

Sur 200 lignes de test, annoncer « 93,2 % » revient à annoncer « quelque part entre 90 et 97 ». Les décimales sont du décor.

Et la conséquence est plus dérangeante encore quand on compare deux modèles. Avec un test de 200 lignes, un modèle dont la vraie performance est **deux points inférieure** paraît meilleur dans **20 % des cas** :

```python
rng = np.random.default_rng(0)
a = rng.binomial(200, 0.93, 20_000) / 200   # vraie accuracy 93 %
b = rng.binomial(200, 0.91, 20_000) / 200   # vraie accuracy 91 %
(b > a).mean()        # 0,203
```

Un classement de modèles établi sur un petit jeu de test est en bonne partie un classement de chance. C'est pour ça qu'on compare par validation croisée, en regardant la dispersion entre les plis et pas seulement la moyenne.

**Le compromis à arbitrer** : chaque ligne versée au test est une ligne retirée à l'entraînement. Sur 500 lignes au total, un test de 20 % ne permet de distinguer que des écarts énormes, et il n'y a pas de solution — seulement la validation croisée, qui réutilise chaque ligne tour à tour pour l'entraînement et l'évaluation.

## Sous-apprentissage et surapprentissage, et le troisième cas

Les deux régimes classiques sont connus : modèle trop simple, mauvais partout ; modèle trop complexe, parfait sur le train et médiocre ailleurs. C'est l'objet de l'exercice de cette leçon, et le voir sur un graphique vaut mieux que le lire.

Ce qu'il faut ajouter ici, c'est qu'il existe un troisième cas qu'on confond souvent avec le surapprentissage : **le problème n'est pas soluble avec ces données**. Les deux courbes sont basses, l'écart est faible, et aucun modèle plus puissant n'y change rien — parce que l'information nécessaire n'est pas dans les colonnes.

La différence avec le sous-apprentissage se mesure : si passer d'un modèle linéaire à un boosting ne change rien, ce n'est pas la capacité du modèle qui manque. C'est le signal. Et le remède n'est jamais algorithmique, il est dans la collecte de données ou dans la définition du problème.

## Le compromis biais-variance, dit proprement

La formule décompose l'erreur attendue d'un modèle en trois termes :

```
erreur = biais² + variance + bruit irréductible
```

- **Le biais** mesure l'erreur systématique du modèle : ce qu'il ne peut pas représenter, quelle que soit la quantité de données. Une droite qui tente d'approcher une parabole a un biais, et mille points de plus ne l'enlèveront pas.
- **La variance** mesure la sensibilité au jeu d'entraînement : combien le modèle changerait si on lui donnait un autre échantillon de la même population.
- **Le bruit** est le plancher de la section précédente.

L'intérêt de la décomposition est qu'elle oriente le remède, et que les deux remèdes vont en sens inverse :

| Symptôme | Terme dominant | Remèdes |
|---|---|---|
| Mauvais sur train et test | biais | modèle plus expressif, meilleures variables, interactions |
| Excellent sur train, mauvais sur test | variance | régularisation, contrainte de complexité, **plus de données** |
| Médiocre partout, insensible au modèle | bruit | redéfinir le problème, collecter autre chose |

**Plus de données réduit la variance et jamais le biais.** C'est pour ça que « on va chercher plus de données » est un bon réflexe face à un surapprentissage et une perte de temps face à un sous-apprentissage.

## Ce que `random_state` fixe, et ce qu'il ne fixe pas

`random_state=42` rend un résultat reproductible. Il ne le rend pas robuste, et la confusion entre les deux coûte cher.

Ce qu'il fixe : le découpage train/test, l'initialisation des centres de K-means, les échantillons bootstrap d'une forêt, l'ordre des lots d'un réseau.

Ce qu'il ne fixe pas : la réalité. Un score de 0,94 obtenu avec `random_state=42` et de 0,89 avec `random_state=7` ne signifie pas que 42 est meilleur, mais que ton estimation est instable — et c'est une information sur ton protocole, pas sur ta graine.

Le réflexe professionnel est donc double : **fixer la graine pour que les résultats soient reproductibles, et faire varier la graine pour savoir à quel point ils sont fragiles.** Un résultat qui change beaucoup entre deux graines n'est pas un résultat, c'est un tirage.

```python
scores = [entraine_et_evalue(random_state=g) for g in range(10)]
print(f"{np.mean(scores):.3f} ± {np.std(scores):.3f}")
```

Si l'écart-type dépasse l'écart que tu cherchais à mesurer, l'expérience ne conclut rien.

## Le vocabulaire qui sert vraiment

Trois distinctions reviennent dans toutes les conversations de métier.

**Paramètres et hyperparamètres.** Les paramètres sont appris par l'entraînement : les coefficients d'une régression, les seuils d'un arbre. Les hyperparamètres sont choisis avant : la profondeur maximale, le taux d'apprentissage, la force de régularisation. La frontière est nette et elle a une conséquence : les hyperparamètres se règlent sur un jeu de validation, jamais par l'entraînement.

**Capacité.** La richesse des fonctions qu'un modèle peut représenter. Une capacité trop faible donne du biais, trop forte de la variance. La plupart des hyperparamètres de régularisation ne font qu'une chose : réduire la capacité.

**Fuite de données.** Toute information présente à l'entraînement qui ne sera pas disponible au moment de la prédiction. Les lignes du même individu de tout à l'heure en sont une. Il y en a de plus discrètes — une moyenne calculée sur l'ensemble du jeu, une colonne remplie après l'événement qu'on prédit — et le module Feature Engineering y revient en détail. La fuite est la première cause de modèles qui brillent en développement et s'effondrent en production.

## Au clavier

```python
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier

X, y = load_breast_cancer(return_X_y=True)

# 1. La fragilité d'un découpage unique
scores = []
for graine in range(20):
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.2,
                                              random_state=graine, stratify=y)
    m = RandomForestClassifier(200, random_state=0, n_jobs=-1).fit(X_tr, y_tr)
    scores.append(m.score(X_te, y_te))

print(f"découpage unique : {np.mean(scores):.4f} ± {np.std(scores):.4f}")
print(f"           pire : {min(scores):.4f}   meilleur : {max(scores):.4f}")

# 2. La même chose par validation croisée
cv = cross_val_score(RandomForestClassifier(200, random_state=0, n_jobs=-1),
                     X, y, cv=10)
print(f"validation croisée : {cv.mean():.4f} ± {cv.std():.4f}")
```

Regarde l'écart entre le pire et le meilleur découpage. Puis demande-toi combien d'articles de blog comparent deux modèles sur un seul `random_state`.
