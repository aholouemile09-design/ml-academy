Les formules ont été construites dans leurs modules respectifs : la valeur acquise et les estimations à trois points au module Processus, les canaux de communication au module People, la loi de Little côté agile. Les restituer sans formulaire et bâtir ta fiche mémoire d'une page sont l'objet des exercices de cette leçon.

Cette page est une **page de consolidation** : le catalogue complet avec ses règles de lecture, puis l'arithmétique du temps, qui est la partie que personne ne prépare et qui coûte le plus de points.

## Le catalogue, par famille

### Les écarts et les indices

```text
EV  valeur acquise      = % reellement termine x BAC
PV  valeur planifiee    = % prevu a cette date x BAC
AC  cout reel           = depense reelle

CV  ecart de cout       = EV - AC
SV  ecart de delai      = EV - PV
CPI indice de cout      = EV / AC
SPI indice de delai     = EV / PV
```

La règle de lecture qui évite toutes les confusions : **un écart est bon s'il est positif, un indice est bon s'il est supérieur à 1.** Et dans les deux familles, la valeur acquise vient en premier dans la formule — c'est le seul point à mémoriser, le reste se reconstruit.

### Les prévisions

```text
ETC reste a depenser    = EAC - AC
VAC ecart final prevu   = BAC - EAC
TCPI rendement requis   = (BAC - EV) / (BAC - AC)
```

Les trois formules de l'EAC, et ce qu'elles supposent :

| Formule | Hypothèse |
| --- | --- |
| `BAC / CPI` | La dérive de coût actuelle continue jusqu'au bout |
| `AC + (BAC − EV)` | La dérive était ponctuelle, le reste se fera au coût prévu |
| `AC + (BAC − EV) / (CPI × SPI)` | Les dérives de coût **et** de délai continuent |

Le point que l'examen teste réellement : **la vraie question est le choix de la formule**, pas le calcul. L'énoncé contient toujours l'indice — « cette dérive est exceptionnelle », « la tendance devrait se maintenir », « les deux écarts se dégradent ».

Et le seuil d'honnêteté du TCPI : au-delà de **1,10**, le rendement exigé pour tenir le budget n'a pratiquement jamais été atteint par un projet qui ne l'atteignait pas déjà. Annoncer qu'on va y arriver n'est plus une prévision.

### Les estimations

```text
triangulaire  = (O + M + P) / 3
beta (PERT)   = (O + 4M + P) / 6
ecart-type    = (P - O) / 6
```

`O` optimiste, `M` le plus probable, `P` pessimiste. La version beta pondère le plus probable par quatre ; la triangulaire traite les trois également. Et l'écart entre `O` et `P` **mesure l'incertitude** — c'est l'information utile, souvent plus que la moyenne elle-même.

### Les marges

```text
marge totale = LS - ES = LF - EF
```

Le retard qu'une activité peut prendre sans décaler la fin du projet. **Marge totale nulle = chemin critique.** La marge libre, elle, est le retard possible sans décaler l'activité suivante, et elle est toujours inférieure ou égale à la marge totale.

### Les autres

```text
canaux de communication = n(n - 1) / 2
valeur monetaire attendue = probabilite x impact
travail en cours = debit x temps de traversee
```

Et pour les contrats à incitation, le **point de prise en charge totale** — le coût au-delà duquel le fournisseur assume seul chaque euro supplémentaire :

```text
PTA = cout cible + (plafond - prix cible) / part acheteur
```

Celui-là est rare. Il ne vaut pas d'y passer du temps si le reste n'est pas acquis.

## Ce qui mérite d'être sur ta fiche

Le critère n'est pas l'importance, c'est le **risque d'oubli sous pression**. Les deux listes sont très différentes, et c'est le travail que l'exercice de cette leçon fait faire.

Ce qui ne mérite pas d'y être : `CV = EV − AC`, qui se reconstruit en deux secondes dès qu'on a retenu la règle de lecture. Les définitions, qui ne se calculent pas. Tout ce que tu as réussi trois fois de suite.

Ce qui mérite d'y être : les trois formules de l'EAC avec leur hypothèse, le TCPI, le choix entre triangulaire et beta, les pondérations de l'ECO, et l'ordre des étapes du circuit de changement. Plus, pour chacun, ce qui s'oublie le plus facilement — l'ordre des termes.

Une page. Si elle tient sur deux, elle ne sera pas mémorisée, et elle ne sert pas pendant l'examen puisqu'elle reste dehors.

## L'arithmétique du temps

C'est la partie opérationnelle, et elle se ramène à un seul chiffre.

```text
240 minutes / 180 questions = 1 min 20 s par question

bloc 1 : 60 questions -> 80 minutes -> il reste 160 min a la fin
bloc 2 : 60 questions -> 80 minutes -> il reste  80 min a la fin
bloc 3 : 60 questions -> 80 minutes -> il reste   0
```

Le chronomètre est suspendu pendant les pauses, donc les 240 minutes sont du temps de questions pur.

Trois points de contrôle suffisent, et un seul chiffre à retenir pour chacun : **160 à la fin du premier bloc, 80 à la fin du deuxième.** Si à la question 60 il reste moins de 150 minutes, le rythme est en retard et la correction doit être immédiate — pas au bloc suivant.

Et la répartition réelle du temps n'est jamais uniforme :

| Type de question | Temps réaliste |
| --- | --- |
| Question de connaissance directe | 20 à 30 s |
| Question situationnelle courte | 60 à 90 s |
| Question chiffrée | 2 à 3 min |
| Étude de cas (scénario + 3 à 5 questions) | 5 à 7 min pour l'ensemble |

C'est l'écart entre ces lignes qui rend la moyenne tenable : les questions rapides financent les lentes. Une personne qui passe 80 secondes sur une question de vocabulaire n'a plus de marge pour une étude de cas.

## La discipline de rythme

Quatre règles, et elles comptent plus que la connaissance des formules.

**Quatre-vingt-dix secondes maximum sur une question isolée.** Au-delà, la probabilité de trouver ne monte plus, et ce qu'on prend est le temps d'une autre question. On répond, on marque, on passe.

**Une question chiffrée s'identifie et se diffère.** Si le calcul ne vient pas en trente secondes, marque et reviens. Les calculs se font bien mieux quand les questions faciles du bloc sont derrière.

**La pause se décide à l'avance, pas sur le moment.** Dix minutes de pause avec le chronomètre suspendu sont rentables : elles restaurent l'attention pour soixante questions. La seule raison de les refuser est d'avoir des questions non traitées dans le bloc — et dans ce cas le problème est le rythme, pas la pause.

**Le dernier bloc se termine avec cinq minutes de réserve.** Pas pour réviser, pour vérifier qu'aucune question n'est vide. C'est le dernier endroit où quelques points se gagnent sans rien savoir.

Et une remarque sur la mesure : un examen blanc terminé avec quatre minutes de marge n'est pas un examen blanc réussi en temps. Le jour J, le stress ralentit la lecture, et une seule étude de cas inattendue suffit à basculer en retard. La marge à viser à l'entraînement est de l'ordre de vingt minutes.

## Au clavier

1. Reconstruis les sept formules de la valeur acquise sans les regarder, en partant de la règle de lecture. Si tu y arrives, elles n'ont pas besoin d'être sur ta fiche.
2. Écris ta fiche d'une page. Puis raye tout ce que tu as su restituer trois fois de suite.
3. Sur ton prochain lot de 60 questions, note l'heure au début et vérifie à la question 20 si tu es à 27 minutes.
4. Chronomètre-toi sur cinq questions de connaissance pure. Si tu dépasses 30 secondes, c'est là que ton temps part.
5. Fixe maintenant ta règle de pause, et écris-la. Le jour J n'est pas le moment de la décider.

**Ressource** : Andrew Ramdayal, les formules de l'examen — https://www.youtube.com/AndrewRamdayal
