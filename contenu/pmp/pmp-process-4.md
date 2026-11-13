Quatre sujets dans une leçon, reliés par une idée commune : ce qui n'est pas prévu explicitement se paie plus tard, et plus cher. La matrice RACI, la distinction qualité/grade et les deux techniques d'optimisation des ressources sont travaillées dans l'exercice d'application, et le cas situationnel traite un taux de défauts qui ne baisse pas.

## Le coût de la qualité

C'est le modèle qui justifie tout le reste, et il est régulièrement testé. Le coût de la qualité se répartit en quatre catégories, regroupées deux à deux.

| Famille | Catégorie | Ce qu'elle couvre |
| --- | --- | --- |
| **Conformité** | **Prévention** | Formation, normes, revues de conception, outillage, documentation |
| | **Évaluation** | Tests, inspections, audits, contrôles |
| **Non-conformité** | **Défaillance interne** | Reprises, correctifs, rebuts — détectés **avant** la livraison |
| | **Défaillance externe** | Garantie, support, perte de clientèle, rappel — détectés **après** |

La loi empirique du domaine : **le coût de correction d'un défaut croît d'un ordre de grandeur à chaque étape franchie.** Un défaut corrigé en conception coûte une unité, en développement dix, en test cent, chez le client mille — et le coût de réputation ne se chiffre pas.

C'est ce qui fonde le principe **la prévention plutôt que l'inspection**, et c'est la clé de lecture d'une famille entière de questions. Devant un taux de défauts qui ne baisse pas malgré davantage de tests, la réponse n'est pas d'ajouter des tests : c'est de remonter en amont — revue de conception, formation, clarification des exigences. Les tests **trouvent** les défauts, ils ne les **empêchent** pas.

## Qualité, grade, exactitude, précision

Quatre mots, deux distinctions, et l'examen les mélange volontiers.

**La qualité** est la conformité aux exigences. **Le grade** est le niveau de fonctionnalités ou de caractéristiques. Un grade faible peut être parfaitement acceptable — un utilitaire simple vendu comme tel ; une qualité faible ne l'est jamais, parce qu'elle signifie que le produit ne fait pas ce qui était spécifié.

**L'exactitude** est la proximité avec la valeur vraie. **La précision** est la reproductibilité de la mesure. Une balance qui affiche toujours 2,000 kg pour un objet d'un kilo est précise et inexacte. Une balance qui oscille entre 0,9 et 1,1 est exacte en moyenne et imprécise. Les deux problèmes se corrigent différemment, et c'est pourquoi on les distingue.

## Gérer la qualité et contrôler la qualité

Deux processus distincts, souvent confondus.

| | **Gérer la qualité** | **Contrôler la qualité** |
| --- | --- | --- |
| Objet | Le **processus** | Le **livrable** |
| Question | Nos façons de faire produisent-elles la qualité attendue ? | Ce livrable précis est-il conforme ? |
| Nature | Préventif, orienté amélioration | Correctif, orienté détection |
| Ce qui en sort | Des recommandations d'amélioration, des audits qualité | Des mesures, des livrables vérifiés |

Le contrôle qualité produit les **livrables vérifiés** qui vont ensuite à la validation du périmètre par le client — enchaînement traité dans la leçon sur le périmètre.

## Les outils de qualité et ce que chacun répond

| Outil | La question à laquelle il répond |
| --- | --- |
| **Diagramme de causes et effets** (Ishikawa) | Quelles sont les causes possibles de ce problème ? |
| **Diagramme de Pareto** | Quelles causes produisent l'essentiel des défauts ? |
| **Carte de contrôle** | Le processus est-il stable, ou dérive-t-il ? |
| **Histogramme** | Comment les valeurs se distribuent-elles ? |
| **Diagramme de dispersion** | Ces deux variables sont-elles liées ? |
| **Feuille de relevé** | Combien de défauts, de quel type, quand ? |
| **Organigramme de processus** | Où, dans le flux, le défaut apparaît-il ? |
| **Les cinq pourquoi** | Quelle est la cause **racine**, et non la cause apparente |

Deux précisions sur la **carte de contrôle**, parce qu'elles sont testées :

**Les limites de contrôle ne sont pas les tolérances.** Les limites de contrôle décrivent ce que le processus produit naturellement ; les tolérances décrivent ce que le client accepte. Un processus peut être parfaitement sous contrôle et hors tolérance — il est stable et il produit systématiquement des pièces non conformes.

**La règle des sept.** Sept points consécutifs du même côté de la moyenne signalent une dérive du processus, même si aucun point ne sort des limites. C'est le signal qu'on traite avant que les défauts apparaissent.

Et le principe de fond : **la plupart des défauts viennent du processus, pas des personnes.** Chercher qui a fait l'erreur est presque toujours la mauvaise réponse ; chercher ce qui a rendu l'erreur possible est la bonne.

## Les ressources, humaines et matérielles

Le domaine couvre les deux, et les questions portent souvent sur les ressources matérielles qu'on oublie : équipements, licences, matériaux, locaux, environnements de test. Un projet bloqué par une licence non commandée est un cas banal.

Le **histogramme des ressources** montre la charge affectée à chaque ressource dans le temps. C'est l'outil qui rend visibles les surcharges — une même personne planifiée à 180 % sur une semaine — avant qu'elles ne se traduisent en retard.

## Nivellement et lissage

La distinction la plus testée de la leçon.

| Technique | Ce qu'elle résout | La date de fin |
| --- | --- | --- |
| **Nivellement** | Les **surcharges** de ressources : quelqu'un affecté à deux tâches en même temps | **Peut être repoussée** |
| **Lissage** | Les **pics** de charge, en jouant uniquement sur les marges disponibles | **Maintenue** |

Le mécanisme : le nivellement décale des activités jusqu'à ce que personne ne soit surchargé, quitte à allonger le projet. Le lissage ne décale que dans les limites de la marge, donc seulement des activités non critiques, et ne touche pas le chemin critique.

**Le repère d'examen tient dans l'énoncé.** « Sans modifier la date de fin » signale le lissage. « Résoudre les conflits de ressources », sans contrainte de délai mentionnée, signale le nivellement.

## Communiquer : le modèle, et où ça casse

Un chef de projet consacre la majorité de son temps à communiquer. Le modèle du référentiel décompose l'opération, et chaque étape est un point de défaillance.

```text
emetteur -> encode -> transmet -> [BRUIT] -> recoit -> decode -> destinataire
                                                                      |
                     <---------- retour (feedback) ------------------+
```

Trois enseignements.

**L'encodage et le décodage sont des traductions.** Le même mot ne porte pas le même sens pour un informaticien, un financier et un juriste. Le jargon est la première source de malentendu, et le plus coûteux parce qu'il passe inaperçu : les deux parties croient s'être comprises.

**Le bruit n'est pas qu'un problème technique.** La surcharge d'information, la défiance, une mauvaise nouvelle récente, la fatigue sont du bruit. Un message parfait envoyé au mauvais moment n'arrive pas.

**Le retour est ce qui rend la communication vérifiable.** Sans retour, on a diffusé, pas communiqué. C'est pour cela qu'une annonce importante ne se fait pas par courriel : on ne sait pas si elle a été reçue ni comprise.

## Les trois méthodes

| Méthode | Comment | Pour quoi |
| --- | --- | --- |
| **Interactive** | Réunion, appel, atelier. Bidirectionnel, en temps réel | Sujets complexes, sensibles, conflictuels. La plus riche |
| **Diffusion** (*push*) | Courriel, rapport, note. Envoyé à des destinataires précis | Information à tracer. **Aucune garantie de lecture** |
| **Mise à disposition** (*pull*) | Portail, intranet, tableau de bord | Grandes audiences, information de référence consultée au besoin |

La règle de choix : **plus le sujet est sensible, plus la communication doit être interactive.** Annoncer un retard, traiter un conflit, négocier un arbitrage par courriel est une erreur de méthode — et c'est un distracteur fréquent.

Et la réciproque : utiliser une réunion pour diffuser une information que personne ne discutera est un gaspillage de la ressource la plus chère du projet.

## Écrire correctement

Le référentiel retient cinq qualités d'une communication écrite, et elles font une liste de vérification utilisable telle quelle : **correcte** dans la grammaire et l'orthographe, parce que les fautes dégradent la crédibilité du contenu ; **concise**, sans remplissage ; **claire**, centrée sur ce dont le destinataire a besoin ; **cohérente** dans son enchaînement logique ; et **contrôlée** dans son déroulement, avec des idées qui se suivent.

S'y ajoute une règle de forme qui compte : **les décisions, les changements de périmètre et les escalades se font par écrit.** Les échanges courants de l'équipe restent informels. Une décision prise en réunion et non écrite n'existera plus dans six semaines.

## Rendre compte

Trois types de rapports, trois questions différentes.

**Le rapport d'avancement** dit où on en est par rapport au plan.

**Le rapport de performance** dit comment on a performé sur une période — les écarts et leurs causes.

**Le rapport de prévision** dit à quoi s'attendre à la fin : coût final estimé, date d'achèvement probable. C'est celui qui intéresse une direction, et celui que les chefs de projet produisent le moins.

Et le nombre de canaux de communication dans un groupe croît en **n(n−1)/2** — mécanisme détaillé dans la leçon sur les parties prenantes, et raison pour laquelle la communication doit être planifiée plutôt qu'improvisée dès qu'une équipe dépasse quelques personnes.

## Au clavier

1. Classe les dépenses qualité de ton projet dans les quatre catégories. Si la prévention est à zéro, tu finances la non-conformité.
2. Prends un défaut récurrent et applique les cinq pourquoi jusqu'à une cause qui n'est pas une personne.
3. Regarde si tes limites de contrôle et tes tolérances sont les mêmes. Si tu ne sais pas les distinguer, tu ne sais pas si ton processus est capable.
4. Construis l'histogramme de charge d'une personne clé sur les huit prochaines semaines. Cherche la semaine à plus de 100 %.
5. Prends ta dernière mauvaise nouvelle annoncée par écrit et évalue si elle aurait dû être interactive.

**Ressource** : Andrew Ramdayal, qualité, ressources et communications — https://www.youtube.com/AndrewRamdayal
