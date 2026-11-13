Le **tailoring** — l'adaptation — est un principe central du PMBOK 7 et 8 : il n'existe pas d'approche unique. L'exercice d'application de cette leçon fait choisir l'approche sur six projets et dégage les trois critères qui tranchent.

Cette page traite ce que l'exercice suppose connu : les **quatre cycles de vie** et la distinction que l'examen teste le plus souvent entre deux d'entre eux, les **dimensions** sur lesquelles le tailoring porte, et la façon de tracer une décision d'adaptation.

## Quatre cycles de vie, pas deux

« Prédictif ou agile » est une simplification. Le référentiel distingue quatre cycles, et la confusion entre les deux du milieu produit une famille entière de questions.

| Cycle | Le périmètre | La livraison | Quand il convient |
| --- | --- | --- | --- |
| **Prédictif** | Défini en entier au début | Une fois, à la fin | Exigences stables, changement tardif coûteux |
| **Itératif** | Défini au début, mais la **solution** se raffine | Une fois, à la fin | On sait quoi produire, pas encore comment |
| **Incrémental** | Découpé en morceaux livrables | **Plusieurs fois**, par morceaux complets | Chaque morceau a de la valeur à lui seul |
| **Adaptatif (agile)** | Évolue à chaque itération | Souvent, et le périmètre se repriorise | Exigences incertaines ou mouvantes |

**Itératif et incrémental sont la distinction la plus mal comprise**, et elle est simple quand on la prend par l'objet :

**L'itératif raffine la même chose.** On produit une maquette, on la critique, on produit une version meilleure, on recommence. À la fin, un seul livrable, mais mûri. On itère sur la **qualité de la solution**.

**L'incrémental ajoute des morceaux finis.** On livre le module de connexion, puis le catalogue, puis le panier. Chaque morceau est utilisable. On incrémente le **périmètre livré**.

```text
Iteratif    : [esquisse] -> [v2] -> [v3] -> [livrable final]
              une seule chose, de plus en plus juste

Incremental : [module A] -> [module A+B] -> [module A+B+C]
              des morceaux utilisables, qui s'ajoutent
```

L'**agile** combine les deux : il livre des incréments **et** raffine par le retour obtenu. C'est ce qui le rend adapté à l'incertitude — et ce qui le rend inutile quand il n'y a pas d'incertitude à réduire.

Deux repères d'examen : une question qui décrit des maquettes successives sur un même objet parle d'**itératif**, pas d'agile. Une question qui décrit des livraisons partielles utilisables parle d'**incrémental**, même sans sprint ni backlog.

## Approche de développement et cadence de livraison

Deux choses distinctes qu'on confond, et le référentiel les sépare explicitement.

**L'approche de développement** dit comment le travail se fait : prédictif, itératif, incrémental, adaptatif.

**La cadence de livraison** dit quand le résultat arrive chez le destinataire : une seule livraison à la fin, plusieurs livraisons périodiques, ou en continu.

Les deux ne sont pas liées mécaniquement. Une équipe peut travailler en sprints de deux semaines — approche adaptative — et ne mettre en production qu'une fois par trimestre, parce que le client ne peut pas absorber plus. Inversement, une équipe en approche prédictive peut livrer par lots successifs.

Cette distinction résout un piège fréquent : une question qui décrit des sprints et une mise en production unique n'est pas contradictoire. Elle décrit une approche adaptative avec une cadence de livraison unique, ce qui est courant dans les environnements réglementés.

## Ce qu'on adapte réellement

Le tailoring ne se limite pas au choix du cycle de vie. Il porte sur cinq dimensions, et une question peut porter sur n'importe laquelle.

**Le cycle de vie et les phases.** Combien de phases, lesquelles, et quelles portes de décision entre elles.

**Les processus.** Lesquels on applique, lesquels on allège, lesquels on ajoute. Un projet de trois semaines n'a pas besoin du même dispositif de maîtrise des modifications qu'un programme de trois ans.

**Le niveau de formalisme et la documentation.** C'est la dimension la plus concrète au quotidien. Un registre des risques peut être un document structuré révisé en comité, ou trois lignes dans un tableau partagé. Les deux sont corrects — à des contextes différents.

**L'engagement des parties prenantes.** Fréquence, canaux, niveau de détail. Un sponsor qui veut un point hebdomadaire et un sponsor qui veut un tableau de bord n'appellent pas le même plan de communication.

**Les outils, méthodes et pratiques.** Quelles cérémonies, quels artefacts, quels indicateurs.

Trois facteurs guident ces choix, et ils reviennent dans les énoncés : la **taille et la complexité** du projet, sa **criticité** — un système de santé ou de paie n'admet pas le même niveau de risque qu'un site vitrine —, et la **maturité de l'organisation**, car une pratique que personne ne sait tenir ne produit rien.

## Adapter n'est pas alléger

C'est le contresens le plus fréquent, et l'examen le sanctionne dans les deux sens.

**Vers le moins.** Supprimer le registre des risques « parce qu'on est agile » n'est pas du tailoring, c'est une suppression de garde-fou. L'agile ne dispense pas de gérer les risques, il les gère autrement — dans le backlog, en revue d'itération, par la livraison précoce qui révèle les problèmes tôt.

**Vers le plus.** Imposer un comité de maîtrise des modifications hebdomadaire sur un projet de six semaines n'est pas de la rigueur, c'est un coût sans contrepartie.

Le test à appliquer est toujours le même : **quelle question cette pratique répond-elle sur ce projet ?** Si la pratique n'a pas de réponse, elle est de la cérémonie. Si la question existe mais la pratique est trop lourde, on cherche la forme la plus légère qui y répond.

## Tracer une décision de tailoring

Une adaptation non documentée est indistinguable d'une négligence. C'est ce qui sépare une décision professionnelle d'une préférence personnelle, et c'est ce que l'examen attend quand le contexte organisationnel contredit le choix technique — la situation que travaille le cas de cette leçon.

Une décision de tailoring tient en cinq lignes :

**Le contexte**, en faits vérifiables : stabilité des exigences, échéance, criticité, contraintes réglementaires.

**L'approche retenue**, et à quel niveau de granularité — par projet, par phase, par équipe.

**Ce qu'on conserve** des pratiques du cadre de référence de l'organisation.

**Ce qu'on écarte, et la raison.** C'est la ligne la plus importante : elle montre que l'écart est délibéré.

**Le risque associé à l'adaptation**, enregistré dans le registre des risques.

Ce document d'une page a deux usages : il fait accepter l'adaptation en amont, et il protège en aval. Si le risque identifié se matérialise, la trace existe et l'organisation apprend quelque chose au lieu de chercher un responsable.

## Les pièges d'examen sur ce sujet

**Aucune approche n'est supérieure dans l'absolu.** Une réponse qui affirme qu'une méthode est meilleure qu'une autre est presque toujours un distracteur. La bonne réponse adapte au contexte décrit.

**L'hybride n'est pas un compromis mou.** C'est fréquemment la réponse juste, et c'est l'approche dominante dans les organisations réelles — donc dans l'examen.

**Le chef de projet ne décide pas seul de la gouvernance de son organisation.** Quand un cadre est imposé par la direction ou par un PMO contrôlant, la bonne réponse est de recommander, documenter le risque, puis adapter **à l'intérieur** du cadre. Imposer sa propre méthode contre une décision d'organisation n'est pas la réponse attendue.

**Faire semblant est pire que ne rien faire.** Appeler « sprints » des tranches de calendrier sans adaptabilité réelle est sanctionné par le référentiel. Les pratiques vidées de leur sens décrédibilisent la méthode auprès de l'équipe et privent l'organisation de l'information utile.

## Au clavier

1. Prends trois projets passés et classe-les dans les quatre cycles de vie. Si deux tombent dans la même case, cherche ce qui les distingue sur la cadence de livraison.
2. Identifie un projet où tu as itéré en croyant incrémenter, ou l'inverse. Qu'est-ce que la confusion a coûté ?
3. Sur ton projet actuel, liste cinq pratiques que tu appliques et demande pour chacune : à quelle question répond-elle ici ? Celles qui n'ont pas de réponse sont de la cérémonie.
4. Écris une décision de tailoring d'une page pour ce projet, avec les cinq lignes. Fais-la relire par quelqu'un qui n'y travaille pas.
5. Trouve dans ton organisation une pratique imposée qui ne sert pas ton projet. Rédige la recommandation d'adaptation, avec le risque associé.

**Ressource** : l'Agile Practice Guide, gratuit avec l'adhésion PMI — https://www.pmi.org/learning/exam-prep
