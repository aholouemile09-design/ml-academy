Ton modèle B fait 86,3 % là où A faisait 84,3 %. Deux points de mieux. Est-ce que B est meilleur, ou est-ce que tu as eu de la chance sur ce découpage-là ? Les tests d'hypothèses répondent à cette question — et à une seule autre, qu'il faut bien identifier pour ne pas leur faire dire n'importe quoi.

## Le cadre

Quatre pièces, toujours les mêmes.

**H₀, l'hypothèse nulle** — « il n'y a pas de différence ». C'est l'hypothèse ennuyeuse, celle qu'on cherche à mettre en défaut.

**H₁, l'alternative** — « il y a une différence ».

**La p-value** — la probabilité d'observer un écart **au moins aussi grand** que celui qu'on a, **si H₀ était vraie**.

**Le seuil α** — fixé à 0,05 par convention pure. Si p < α, on rejette H₀.

La logique est celle du raisonnement par l'absurde : on suppose qu'il n'y a rien, on calcule à quel point nos données seraient surprenantes dans ce monde-là, et si elles sont trop surprenantes, on abandonne la supposition.

## Ce que la p-value n'est pas

Voici l'erreur la plus répandue de toute la statistique appliquée, et tu as déjà les outils pour la comprendre.

**La p-value est P(données | H₀). Ce n'est pas P(H₀ | données).**

C'est exactement l'inversion contre laquelle Bayes t'a mis en garde au cours de probabilités. « Si personne ne fraude, quelle est la probabilité de voir cette alarme ? » et « vu cette alarme, quelle est la probabilité qu'on fraude ? » sont deux questions différentes, et tu as vu qu'elles peuvent donner 99 % et 0,98 %.

Une p-value de 0,03 ne dit **pas** qu'il y a 97 % de chances que ton modèle B soit meilleur. Elle dit : si B n'était pas meilleur, un écart comme celui-ci arriverait 3 fois sur 100. Pour passer de l'une à l'autre, il faudrait connaître la probabilité a priori que B soit meilleur — ce que le test ne contient pas.

## Les quatre pièges

**Significatif ne veut pas dire important.** Avec assez de données, une amélioration de 0,01 % devient statistiquement significative. Elle reste sans intérêt. La significativité parle de la **fiabilité** de la mesure, jamais de son **ampleur**.

**Avec assez de données, tout devient significatif.** Corollaire du précédent : sur un million de lignes, à peu près toutes les différences ressortent. Si ton critère de décision est « p < 0,05 », tu ne décides plus rien — tu valides tout.

**p = 0,049 et p = 0,051 sont le même résultat.** Le seuil de 0,05 est une convention, pas une frontière de la nature. Traiter l'un comme une découverte et l'autre comme un échec est une erreur de raisonnement, pas une rigueur.

**« Non significatif » ne veut pas dire « pas de différence ».** Ça veut dire « je n'ai pas assez de données pour trancher ». Absence de preuve n'est pas preuve d'absence, et confondre les deux fait abandonner des améliorations réelles.

## La taille d'effet, qui manque toujours

Puisque la p-value ne dit rien de l'ampleur, il faut la mesurer à part. La **taille d'effet** est l'écart exprimé dans une unité interprétable : deux points d'accuracy, trois euros de panier moyen, ou un écart normalisé comme le d de Cohen.

La règle de rédaction qui en découle, et qui vaut pour tout rapport que tu écriras : **toujours donner l'écart, son intervalle de confiance, et la taille d'échantillon.** La p-value seule est le chiffre le moins informatif des quatre.

## L'intervalle de confiance en dit plus

Prends un test A/B sur une page d'inscription. Deux groupes de 2 000 visiteurs : 180 conversions d'un côté, 210 de l'autre. Soit 9,0 % contre 10,5 %.

```
écart observé    : +1,5 point
p-value          : ≈ 0,11
IC 95 % de l'écart : [−0,3 point ; +3,3 points]
```

La p-value dit « non significatif » et s'arrête là. L'intervalle dit beaucoup plus : l'effet réel est probablement compris entre une légère dégradation et une amélioration de trois points. On ne sait pas trancher, et on sait **de combien** on ne sait pas. Si trois points justifieraient le déploiement, la bonne conclusion n'est pas « ça ne marche pas » mais « continue à collecter ».

Les deux outils sont d'ailleurs équivalents : **l'IC à 95 % contient zéro exactement quand p ≥ 0,05.** Même information, mais l'intervalle la présente d'une manière qui empêche la mauvaise décision.

Un point de vocabulaire que presque tout le monde se trompe : « 95 % » décrit la **procédure**, pas l'intervalle que tu as sous les yeux. Si tu répétais l'expérience un grand nombre de fois, 95 % des intervalles ainsi construits contiendraient la vraie valeur. Celui-ci la contient ou ne la contient pas.

## La puissance, à décider avant

La **puissance** d'un test est sa probabilité de détecter un effet qui existe vraiment. On la vise habituellement à 80 %.

Une expérience sous-dimensionnée est pire qu'inutile : elle ne détecte rien, et son « non significatif » sera lu comme « pas d'effet ». Tu auras dépensé du temps pour produire une conclusion fausse.

L'ordre des opérations est donc imposé, et c'est le point que l'on saute le plus souvent :

1. décider quel écart minimal vaudrait la peine d'être détecté — une décision **métier**, pas statistique ;
2. calculer combien d'observations il faut pour l'attraper avec 80 % de chances ;
3. collecter ce nombre ;
4. tester une fois.

Le calcul de taille d'échantillon se fait **avant** l'expérience. Fait après, il ne sert qu'à se justifier.

## Choisir son test

Le critère principal tient en une question : **tes deux séries sont-elles appariées ?**

- **Test t apparié** — deux modèles évalués sur les **mêmes** folds de validation croisée. Chaque score de A a son jumeau chez B, mesuré sur exactement les mêmes données. Le test travaille sur les différences fold par fold, ce qui élimine la variabilité propre à chaque découpage. C'est le cas de loin le plus fréquent en ML, et utiliser un test indépendant ici jette de l'information et perd en puissance.
- **Test t indépendant (Welch)** — deux groupes sans correspondance, comme deux cohortes d'utilisateurs distinctes. Garde la variante de Welch par défaut : elle ne suppose pas des variances égales, hypothèse rarement vraie et jamais vérifiée.
- **McNemar** — deux classifieurs sur le **même** jeu de test. Il ne regarde que les désaccords : les exemples que A réussit et que B rate, et inversement. Les cas où les deux ont raison ou les deux ont tort n'apportent rien à la comparaison.
- **Wilcoxon** — l'alternative quand la normalité ne tient pas. Il travaille sur les rangs plutôt que sur les valeurs, donc il résiste aux valeurs aberrantes. Un peu moins puissant quand la normalité tenait vraiment.
- **Chi²** — indépendance entre deux variables catégorielles.
- **ANOVA**, ou Kruskal-Wallis en non-paramétrique, dès qu'il y a trois groupes ou plus. Surtout pas une série de tests deux à deux, pour la raison qui suit.

## Les comparaisons multiples

Tu testes 20 features pour savoir lesquelles sont liées à ta cible, à α = 0,05 chacune.

```
P(au moins un faux positif) = 1 − 0,95²⁰ ≈ 64 %
```

**Près de deux chances sur trois de « découvrir » au moins une relation qui n'existe pas.** Ce n'est pas un défaut des tests : à 5 % d'erreur par test, 20 tests produisent en moyenne un faux positif. Le problème est de les lire comme s'il n'y en avait eu qu'un.

Deux corrections :

- **Bonferroni** — divise α par le nombre de tests. Simple, très conservateur, fait rater de vrais effets quand les tests sont nombreux.
- **Benjamini-Hochberg** — contrôle la proportion de faux positifs parmi les découvertes plutôt que leur existence. Moins brutal, c'est le choix usuel dès qu'on teste beaucoup d'hypothèses.

C'est aussi, formulé autrement, la raison d'une règle que tu connais déjà : **le jeu de test ne se regarde qu'une fois.** Chaque coup d'œil est une comparaison de plus, et le meilleur score obtenu après trente essais est optimiste d'autant.

## En test A/B : ne regarde pas en cours de route

Le piège le plus coûteux en production, et le plus tentant.

Si tu consultes les résultats chaque jour et que tu t'arrêtes dès que p passe sous 0,05, ton taux d'erreur réel n'est plus 5 %. Il monte très au-dessus, parce que la p-value fluctue et finit par traverser le seuil par hasard si on la regarde assez souvent.

Le remède simple : **fixer n à l'avance et n'analyser qu'à la fin.** Si tu as vraiment besoin de surveiller en continu — pour arrêter une variante nuisible —, il existe des méthodes séquentielles conçues pour ça, qui ajustent le seuil à chaque coup d'œil. Un test classique regardé dix fois n'en est pas une.

## Au clavier

Le chiffre des comparaisons multiples mérite d'être vu tourner — c'est le plus contre-intuitif de la leçon.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(0)
faux_positifs = 0

for _ in range(2000):                       # 2000 experiences
    cible = rng.normal(size=200)
    # 20 features tirees au hasard : AUCUNE n'est liee a la cible
    p = [stats.pearsonr(rng.normal(size=200), cible)[1] for _ in range(20)]
    if min(p) < 0.05:
        faux_positifs += 1

print(f"{faux_positifs / 2000:.0%} des experiences 'decouvrent' au moins une")
print("relation... alors qu'il n'y en a aucune.")
```

Trois réflexes :

1. **Rapporte toujours quatre nombres**, jamais un seul : l'écart, son intervalle de confiance, la taille d'échantillon, et la p-value en dernier.
2. **Demande-toi si tes séries sont appariées** avant de choisir le test. En validation croisée sur les mêmes folds, elles le sont presque toujours, et c'est la question qui change la réponse.
3. **Écris la conclusion en langage métier**, sans le mot « p-value ». Si tu n'y arrives pas, c'est que tu n'as pas encore compris ce que le test a dit.
