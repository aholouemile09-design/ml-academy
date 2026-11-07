Choisir une distribution n'est pas un geste décoratif : c'est affirmer quelque chose sur la façon dont tes données sont produites. Cette affirmation décide ensuite de ta fonction de coût, de ton initialisation et de la validité de tes tests. On la fait toujours — la seule question est de savoir si on la fait consciemment.

## Discret ou continu, d'abord

Une variable **discrète** prend des valeurs séparées qu'on peut compter : 0, 1, 2 clients. On parle de la probabilité d'une valeur précise, P(X = 3).

Une variable **continue** prend n'importe quelle valeur d'un intervalle : une durée, une température. Là, P(X = 3.000…) vaut zéro — il faut raisonner sur des intervalles, P(2.9 < X < 3.1). La courbe qu'on trace est une **densité**, et c'est l'aire sous la courbe qui est une probabilité, pas sa hauteur.

Confondre les deux mène à des absurdités discrètes, comme une « probabilité » supérieure à 1 lue sur une densité.

## Les lois de comptage

**Bernoulli** — une épreuve, deux issues, probabilité p. Une pièce tombe sur pile. C'est l'atome dont les autres sont faites.

**Binomiale** — le nombre de succès sur n épreuves indépendantes et identiques. Le nombre de pièces défectueuses dans un lot de 200, si chacune a la même probabilité d'être mauvaise. Espérance np, variance np(1−p).

Les deux hypothèses dans « indépendantes et identiques » ne sont pas de la décoration. Si les pièces sortent de la même machine qui se dérègle progressivement, elles ne sont ni l'une ni l'autre, et la binomiale sous-estimera les mauvais lots.

**Poisson** — le nombre d'événements rares dans un intervalle fixe, quand il n'y a pas de nombre d'essais identifiable. Le nombre de fautes de frappe par page d'un manuscrit. Un seul paramètre, λ, qui est le taux moyen.

Poisson a une signature que tu peux tester : **son espérance est égale à sa variance**, toutes deux valant λ. C'est un diagnostic gratuit. Calcule la moyenne et la variance de tes comptages ; si la variance est nettement plus grande, tes données sont **surdispersées** et Poisson est le mauvais modèle. En pratique c'est très fréquent, parce que le taux réel n'est pas constant — certaines pages sont plus difficiles que d'autres. La réponse habituelle est la loi binomiale négative, qui ajoute un paramètre pour absorber cet excès.

## Les lois de durée

**Exponentielle** — le temps d'attente entre deux événements de Poisson. Un seul paramètre, le taux.

Sa propriété définitoire mérite qu'on s'y arrête, parce qu'elle est contre-intuitive et souvent fausse : elle est **sans mémoire**. Sachant qu'on a déjà attendu dix minutes, la loi du temps restant est exactement la même qu'au départ. Le passé n'informe pas l'avenir.

C'est raisonnable pour un appel entrant dans un centre d'appels. C'est franchement faux pour une pièce mécanique : un roulement qui tourne depuis cinq ans est plus près de casser qu'un neuf. Utiliser une exponentielle pour modéliser de l'usure, c'est supposer que l'usure n'existe pas.

**Weibull** — la généralisation qui règle ça, avec un paramètre de forme k :

- k < 1 — le taux de panne **décroît** : c'est la mortalité infantile, les défauts de fabrication qui se révèlent tôt. Plus ça dure, plus c'est fiable.
- k = 1 — taux constant, on retombe exactement sur l'exponentielle.
- k > 1 — le taux **croît** : c'est l'usure. Plus ça dure, plus ça risque de lâcher.

C'est le socle de l'analyse de survie, et donc des modèles de **churn** : « combien de temps avant que ce client parte ? » est mathématiquement le même problème que « combien de temps avant que cette pièce casse ? ».

## Les lois à queue lourde, et pourquoi elles piègent

La normale décroît extrêmement vite dans ses extrémités : à 5σ, elle attribue une probabilité d'environ une sur trois millions. Beaucoup de phénomènes réels ne se comportent pas comme ça du tout.

Les revenus, les tailles de fichiers, le nombre d'abonnés d'un compte, les tailles de villes, les pertes financières : tous ont une **queue lourde**. Les valeurs extrêmes y sont rares mais pas négligeables, et elles sont énormes.

Trois conséquences très concrètes :

**La moyenne devient instable.** Ajoute un seul individu à l'échantillon et la moyenne bondit. Un indicateur qui change de 30 % quand on ajoute une ligne n'est pas un indicateur.

**Les tests qui supposent la normalité donnent des réponses fausses**, et confiantes. C'est le pire cas : pas d'erreur, pas d'avertissement, juste un résultat erroné.

**Les anomalies détectées « à 3σ » n'ont plus de sens.** Sur une loi à queue lourde, des points à 5 ou 10σ sont parfaitement normaux. Un détecteur réglé sur la règle gaussienne crie en permanence.

Le réflexe qui sauve : **passer l'axe en échelle logarithmique**. Beaucoup de ces distributions deviennent presque symétriques une fois le log pris — c'est la loi **log-normale** —, et redeviennent traitables par les outils usuels. Transformer la variable est souvent plus efficace que changer de modèle.

## Student, pour les petits échantillons

La loi de Student ressemble à une normale aux queues plus épaisses. Son paramètre, le nombre de **degrés de liberté**, vaut typiquement n − 1.

Elle sert quand on estime une moyenne sans connaître la vraie variance — c'est-à-dire presque toujours, puisqu'on estime aussi la variance sur l'échantillon. Cette incertitude supplémentaire doit se payer, et elle se paie en queues plus épaisses : les intervalles de confiance sont plus larges, donc plus honnêtes.

Quand n grandit, l'estimation de la variance devient fiable et Student converge vers la normale. Au-delà de 30 observations environ, la différence est négligeable. En dessous, l'ignorer donne des intervalles trop étroits et des conclusions trop assurées.

## Beta et Dirichlet

**Beta** vit entre 0 et 1, ce qui en fait la loi naturelle d'une **probabilité inconnue**. Elle sert d'a priori bayésien : avant d'observer quoi que ce soit, on décrit ce qu'on croit du taux de conversion d'une page, puis chaque observation met cette croyance à jour.

**Dirichlet** est sa généralisation à plusieurs catégories dont les probabilités somment à 1. C'est l'a priori des modèles de sujets comme LDA.

Leur intérêt pratique dépasse le bayésien : elles règlent proprement le problème du petit échantillon. Deux clics sur deux affichages donnent un taux estimé de 100 %, ce qui est manifestement absurde. Un a priori Beta tempère cette estimation vers une valeur raisonnable tant que les données sont rares, et s'efface quand elles deviennent nombreuses.

## Ce que ta loi décide pour toi

Le point à retenir de cette leçon : le choix de la distribution n'est pas une étape préliminaire, c'est une décision qui se propage dans tout le reste.

- Supposer une sortie **gaussienne** mène à l'erreur quadratique moyenne comme fonction de coût.
- Supposer une sortie **Bernoulli** mène à l'entropie croisée binaire.
- Supposer une sortie **catégorielle** mène au softmax et à l'entropie croisée multiclasse.
- Supposer un **comptage de Poisson** mène à la régression de Poisson, et pas à une régression linéaire sur le nombre.
- Supposer une **normale** pour initialiser les poids donne les schémas Xavier et He, calibrés pour que la variance du signal ne s'écroule pas en traversant les couches.

C'est la conséquence directe du maximum de vraisemblance vu au cours de probabilités. Utiliser l'erreur quadratique sur une variable de comptage n'est pas « moins adapté » : c'est supposer que le nombre de fautes par page peut être négatif et symétrique autour de sa moyenne.

## Diagnostiquer la loi de ses données

Quatre gestes, dans cet ordre.

1. **L'histogramme.** Avant tout calcul. Il révèle l'asymétrie, les modes multiples et les valeurs impossibles qu'aucune statistique résumée ne montre.
2. **Moyenne contre médiane.** Si elles s'écartent nettement, la distribution est asymétrique et la moyenne n'est pas représentative.
3. **Moyenne contre variance**, pour des comptages. Égales, Poisson tient ; variance bien plus grande, surdispersion.
4. **L'échelle logarithmique.** Si l'histogramme du log ressemble à une cloche, tu tiens une log-normale et tu sais quoi faire.

Le **QQ-plot** complète : il trace les quantiles observés contre les quantiles théoriques. Si les points suivent la diagonale, la loi supposée tient ; s'ils décrochent aux extrémités, les queues sont plus lourdes que supposé. C'est plus informatif qu'un test de normalité, qui rend un oui/non sans dire où ça cloche — et qui rejette tout dès que l'échantillon est gros.

## Au clavier

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(0)

# Le diagnostic de surdispersion, en deux lignes
comptages = rng.poisson(4, size=5000)
print(f"moyenne {comptages.mean():.2f}   variance {comptages.var():.2f}")
# proches -> Poisson tient

# Une queue lourde, et ce qu'elle fait a la moyenne
revenus = rng.lognormal(mean=10, sigma=1.2, size=5000)
print(f"moyenne {revenus.mean():,.0f}   mediane {np.median(revenus):,.0f}")
```

Trois réflexes :

1. **Trace avant de supposer.** Un histogramme coûte une ligne et invalide la moitié des hypothèses qu'on s'apprêtait à faire.
2. **Sur des comptages, compare toujours moyenne et variance.** C'est le test le moins cher de toute la statistique appliquée.
3. **Nomme ton hypothèse à voix haute.** « Je suppose que ces durées sont sans mémoire » se réfute en une seconde quand on l'énonce, et jamais quand on l'applique sans y penser.
