Lire quatre graphiques d'avancement et répondre à une direction qui veut comparer les vélocités de ses équipes sont l'objet des exercices de cette leçon.

Cette page traite le reste : à quoi sert réellement chaque cérémonie et comment elle se dégrade, l'événement qu'on oublie, la mécanique de l'estimation relative, et le jeu d'indicateurs à utiliser au-delà de la vélocité.

## Les cérémonies, et leur dérive typique

Chaque cérémonie répond à une question. Quand elle cesse d'y répondre, elle devient une réunion — et c'est ce que l'examen appelle une pratique vidée de son sens.

| Cérémonie | La question à laquelle elle répond | Sa dérive habituelle |
| --- | --- | --- |
| **Planification d'itération** | Quel objectif, et quel travail pour l'atteindre ? | Une répartition de tâches décidée par une seule personne |
| **Point quotidien** | Qu'est-ce qui nous empêche d'atteindre l'objectif ? | Un compte rendu d'activité adressé au chef de projet |
| **Revue d'itération** | Le produit répond-il au besoin ? | Une démonstration commerciale sans retour recueilli |
| **Rétrospective** | Comment travaillons-nous, et que changeons-nous ? | Un tour de table sans décision, répété à l'identique |
| **Affinage du backlog** | Les prochains éléments sont-ils prêts ? | Inexistant, d'où une planification qui dure trois heures |

Trois dérives méritent le détail, parce qu'elles correspondent à des questions d'examen.

**Le point quotidien n'est pas un reporting.** Il est pour l'équipe, entre les membres de l'équipe. Dès qu'il devient un rapport adressé à une autorité, chacun décrit son activité pour se justifier au lieu de signaler ce qui bloque — et le dispositif perd exactement sa fonction. C'est pourquoi la présence d'un manager y est délicate, et pourquoi la bonne réponse à « le point quotidien dure 40 minutes » est de sortir les sujets de fond de la réunion, pas de la rallonger.

**La revue d'itération sert à recueillir, pas à montrer.** Une revue dont personne ne ressort avec une information nouvelle sur le besoin n'a pas servi. La question à poser en fin de revue est « qu'est-ce qui change dans la suite ? ».

**Une rétrospective sans action est pire qu'aucune rétrospective**, parce qu'elle enseigne à l'équipe que s'exprimer ne produit rien. La règle efficace est d'en sortir avec **une seule** amélioration, nommée, avec un propriétaire, et de vérifier à la suivante qu'elle a été faite. Une seule tenue vaut mieux que cinq listées.

## L'affinage : l'événement qu'on supprime d'abord

C'est le travail de préparation des éléments à venir : clarifier, découper, estimer, identifier les dépendances. Il occupe environ un dixième de la capacité de l'équipe, en continu.

C'est aussi le premier sacrifié quand l'équipe est sous pression, et cela produit une mécanique prévisible : une planification interminable parce qu'on découvre les éléments au moment de s'engager, puis des éléments mal compris qui ne se terminent pas, puis davantage de pression — et moins de temps pour affiner.

Le dispositif qui le rend tenable est la **définition de prêt** : les conditions pour qu'un élément puisse entrer dans une itération. Typiquement : la valeur est comprise, les critères d'acceptation sont écrits, les dépendances sont identifiées, l'élément est assez petit pour tenir dans une itération, l'équipe l'a estimé.

| | Définition de **prêt** | Définition de **terminé** |
| --- | --- | --- |
| Quand elle s'applique | **Avant** d'entrer dans l'itération | **Avant** de déclarer l'élément fini |
| Ce qu'elle protège | L'engagement de l'équipe | La qualité de l'incrément |

Les deux sont des filtres, aux deux extrémités du flux. Un élément qui entre sans être prêt sort rarement terminé.

## Estimer en relatif

L'estimation agile n'estime pas une durée mais une **taille relative**, et c'est le point que les candidats comprennent le moins.

Pourquoi le relatif plutôt que l'absolu : les humains estiment mal les durées absolues et bien les rapports. Personne ne sait dire si une tâche prendra 14 ou 20 heures ; tout le monde sait dire qu'elle est à peu près deux fois plus grosse qu'une autre. On estime donc en comparant à un élément de référence connu.

**Le point d'histoire** est une unité **propre à chaque équipe**, sans conversion en jours. Deux équipes qui livrent 30 points par itération ne produisent pas la même quantité de travail, parce que leurs points ne sont pas la même unité. C'est le fondement de l'argument développé dans le cas situationnel de cette leçon.

Trois techniques :

**Le vote d'estimation.** Chacun propose simultanément une valeur, puis les écarts se discutent. L'intérêt n'est pas la moyenne mais la **discussion provoquée par l'écart** : quand une personne dit 2 et une autre 13, l'une des deux a compris quelque chose que l'autre ignore. C'est là que l'estimation produit sa vraie valeur, qui est de la compréhension partagée.

**L'estimation par affinité.** On trie rapidement un grand nombre d'éléments par taille comparative, sans chiffrer un par un. Utile pour traiter un backlog entier en une séance.

**Les tailles de vêtement.** Très petit à très grand, pour un niveau de granularité grossier, typiquement en amont d'une version.

Et une suite numérique non linéaire — 1, 2, 3, 5, 8, 13 — est utilisée volontairement : elle empêche de débattre entre 7 et 8, écart que personne ne peut estimer de façon fiable. Un élément estimé au-delà de la plage haute n'est pas estimé, il est **à découper**.

## Ce que la vélocité ne dit pas

La vélocité sert à **prévoir une date pour une équipe donnée**, et à rien d'autre. Trois usages abusifs à reconnaître :

**Comparer des équipes.** Les unités diffèrent. La comparaison n'a pas de sens mathématique.

**En faire un objectif.** Dès qu'une mesure devient une cible, elle cesse de mesurer : l'équipe gonfle ses estimations, et la vélocité monte sans qu'un seul élément supplémentaire soit livré. Le mécanisme est inévitable, pas un problème de moralité de l'équipe.

**La lire sur une seule itération.** Une vélocité utile est une moyenne sur trois à cinq itérations, avec sa dispersion. Une prévision honnête s'énonce en fourchette : « entre six et neuf itérations », pas « huit itérations ».

## Le jeu d'indicateurs utile

La vélocité seule ne décrit pas une équipe. Cinq mesures complémentaires, chacune répondant à une question que la vélocité n'aborde pas.

| Indicateur | Ce qu'il mesure | Ce qu'il révèle |
| --- | --- | --- |
| **Temps de traversée** | De la demande à la livraison, du point de vue du demandeur | La réactivité réelle perçue |
| **Temps de cycle** | Du démarrage du travail à la livraison | L'efficacité du flux |
| **Débit** | Nombre d'éléments terminés par période | Une prévision sans estimation |
| **Défauts échappés** | Défauts trouvés **après** la livraison | La qualité réelle, par opposition à la vitesse apparente |
| **Prévisibilité** | Écart entre l'engagement et le réalisé, itération après itération | La fiabilité des engagements |

Deux observations importantes.

**Le débit permet de prévoir sans estimer.** Une équipe qui termine en moyenne huit éléments par itération peut prévoir la date d'un lot de quarante éléments sans les avoir estimés. C'est plus simple et souvent plus fiable que la vélocité, et cela explique l'existence de courants qui se passent d'estimation.

**Les défauts échappés sont le contrepoids indispensable.** Toute mesure de vitesse sans mesure de qualité incite à livrer vite et mal. Suivre les deux ensemble est ce qui rend la mesure honnête.

## Agile et EVM

Question qui tombe, et qui surprend : la valeur acquise s'applique en agile, avec une traduction.

```text
valeur planifiee   = part du backlog prevue a cette date, en points
valeur acquise     = points reellement termines x cout unitaire
cout reel          = depense reelle
```

La difficulté est que le périmètre total d'un projet agile évolue, donc le budget de référence aussi. En pratique, on applique l'EVM à un **périmètre figé** — une version, un incrément de programme — et on recalcule à chaque jalon de planification. C'est le pont le plus courant entre une équipe agile et une gouvernance qui demande des indicateurs classiques, sujet traité dans la leçon suivante.

## Au clavier

1. Pour chaque cérémonie de ton équipe, écris la question à laquelle elle répond. Celles sans réponse sont à supprimer ou à réparer.
2. Assiste à un point quotidien et compte les phrases adressées à une personne en particulier plutôt qu'à l'équipe. C'est l'indice du reporting déguisé.
3. Vérifie la dernière action de rétrospective. A-t-elle été faite ? Si non, tu connais la cause de la lassitude de l'équipe.
4. Écris la définition de prêt avec l'équipe et mesure la durée de la planification suivante.
5. Calcule la vélocité moyenne et sa dispersion sur cinq itérations, puis formule ta prochaine prévision en fourchette.

**Ressource** : PMI Study Hall, questions agiles — https://studyhall.pmi.org/login
