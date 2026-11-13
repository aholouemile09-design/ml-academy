Scrum n'est pas l'agilité. L'examen attend une culture plus large, et surtout la capacité à choisir le cadre adapté au type de travail.

Lire un tableau de flux, poser une limite de travail en cours et appliquer la loi de Little sont l'objet de l'exercice d'application de cette leçon, et le cas situationnel traite une équipe avec quatorze éléments en cours et rien qui se termine.

Cette page traite ce qui est en amont : la **logique lean** dont Kanban découle, ses pratiques au-delà du tableau, les pratiques d'ingénierie d'XP, et le vrai problème de la mise à l'échelle.

## Lean : le gaspillage comme grille de lecture

Kanban vient du lean, et le lean part d'une question unique : **qu'est-ce qui, dans ce flux de travail, ne produit aucune valeur pour le destinataire ?** Sept catégories de gaspillage, transposées au travail intellectuel :

| Gaspillage | À quoi il ressemble sur un projet |
| --- | --- |
| **Travail partiellement fait** | Du code écrit non intégré, une spécification non validée, une fonctionnalité non déployée |
| **Fonctionnalités inutiles** | Ce que personne n'utilise. Le gaspillage le plus massif et le moins visible |
| **Réapprentissage** | Refaire une analyse déjà faite, parce qu'elle n'a pas été écrite ou qu'elle est introuvable |
| **Transferts** | Chaque passage de main perd du contexte et ajoute une attente |
| **Changements de contexte** | Jongler entre trois sujets. Chaque bascule coûte un temps de remise en route |
| **Attentes** | Attendre une validation, un accès, une réponse, un environnement |
| **Défauts** | Tout ce qui doit être refait |

Deux de ces lignes expliquent presque tout ce que Kanban cherche à corriger : le **travail partiellement fait** et les **changements de contexte**. Et les deux ont la même cause — trop de choses commencées en même temps.

Le principe qui en découle est contre-intuitif et vaut d'être retenu tel quel : **arrêter de commencer, commencer à finir.** Un élément à moitié fait n'a aucune valeur, et six éléments à 80 % valent moins qu'un seul livré.

## La loi de Little, et ce qu'elle impose

```text
travail en cours = debit x temps de traversee
```

Autrement dit, à débit constant, **doubler le travail en cours double le délai de livraison** — sans rien produire de plus. C'est la justification mathématique des limites de travail en cours, et c'est la relation que l'exercice de cette leçon fait manipuler.

Ce qu'il faut en retenir hors calcul : on ne va pas plus vite en démarrant plus de choses. On va plus vite en **terminant** ce qui est commencé.

## Les pratiques de Kanban

Le tableau n'est qu'une des six pratiques, et c'est celle qui sert le moins si les autres manquent.

**Visualiser le flux.** Les colonnes doivent refléter les étapes **réelles** du travail, y compris les attentes. Un tableau à trois colonnes sur un processus qui en compte sept cache précisément ce qu'on cherche.

**Limiter le travail en cours.** Une limite par colonne, affichée. C'est la pratique qui produit l'effet, et la seule qui force à arrêter de commencer.

**Gérer le flux.** On pilote le **temps de traversée**, pas l'occupation des personnes. Une équipe occupée à 100 % avec un délai de livraison de six semaines fonctionne moins bien qu'une équipe à 80 % avec un délai d'une semaine.

**Rendre les règles explicites.** Ce qui fait qu'un élément peut passer à la colonne suivante doit être écrit. Sans cela, chacun décide, et le flux devient imprévisible.

**Mettre en place des boucles de retour.** Points quotidiens, revues de flux, revues de livraison. Kanban n'a pas de cérémonies imposées, ce qui conduit souvent à n'en avoir aucune.

**S'améliorer de façon collaborative.** L'évolution est continue plutôt que par rupture.

Deux notions complètent le dispositif et apparaissent dans les énoncés :

**Les classes de service.** Tout le travail n'a pas la même urgence. On distingue typiquement l'urgent — traité immédiatement, avec une place réservée —, la date fixe, le standard et l'amélioration. Sans ces classes, une urgence réelle désorganise tout le flux.

**L'attente de service.** Un engagement de type « 85 % des demandes standard sont livrées en moins de dix jours ». C'est l'équivalent kanban d'une date : un engagement probabiliste plutôt qu'une promesse individuelle.

## Scrum ou Kanban : le critère

| | **Scrum** | **Kanban** |
| --- | --- | --- |
| Rythme | Itérations de durée fixe | Flux continu |
| Engagement | Sur un objectif d'itération | Sur un délai de traversée |
| Entrée du travail | À la planification d'itération | Dès qu'une place se libère |
| Changement de priorité | Entre deux itérations | À tout moment |
| Convient à | Du développement par incréments planifiables | Du flux de demandes imprévisible |

Le critère est la **prévisibilité de l'arrivée du travail**. Une équipe produit qui construit des fonctionnalités choisies à l'avance s'organise bien en sprints. Une équipe de support, de maintenance ou d'exploitation, dont le travail arrive sans prévenir, ne peut pas s'engager sur un périmètre de deux semaines — et lui imposer des sprints produit un engagement systématiquement raté.

Et les deux se combinent couramment : des itérations pour le rythme et les cérémonies, des limites de travail en cours pour le flux.

## XP : les pratiques d'ingénierie

Extreme Programming apporte ce que les autres cadres ne traitent pas : **comment produire du logiciel qui reste modifiable.** C'est la condition technique de l'agilité — une base de code qu'on ne peut plus changer rend l'adaptation au changement impossible, quelles que soient les cérémonies.

**Le développement piloté par les tests.** On écrit le test avant le code. L'effet principal n'est pas la couverture de tests mais la conception : écrire le test d'abord oblige à définir le comportement attendu avant l'implémentation.

**L'intégration continue.** Chaque modification est intégrée et vérifiée immédiatement. Ce qui est évité est la fusion de trois semaines de travaux divergents, l'une des pires activités du métier.

**La programmation en binôme.** Deux personnes, un clavier. Coûteuse en apparence, elle réduit les défauts et diffuse la connaissance — ce qui supprime les points de défaillance uniques dans l'équipe.

**Le remaniement continu.** On améliore la structure du code sans changer son comportement, en permanence plutôt que par grandes opérations.

**Les petites livraisons.** Le plus souvent possible, parce que chaque livraison est une occasion d'apprendre.

Et une pratique sociale qu'XP a introduite : le **client sur place**, disponible pour répondre. C'est l'ancêtre du Product Owner, et la raison pour laquelle son indisponibilité bloque tout.

## Mettre à l'échelle : le vrai problème

Les cadres de mise à l'échelle sont nombreux, et l'examen les attend au niveau des principes.

| Cadre | Ce qu'il fait |
| --- | --- |
| **Mêlée de mêlées** | Un représentant par équipe se synchronise régulièrement. Le plus léger |
| **LeSS** | Scrum appliqué à plusieurs équipes avec **un seul** backlog et **un seul** Product Owner |
| **Nexus** | Scrum avec une équipe dédiée à l'intégration entre équipes |
| **SAFe** | Le plus structuré et le plus prescriptif : plusieurs niveaux, planification d'incrément à l'échelle de plusieurs équipes |

Ce qu'il faut comprendre derrière ces noms : **le problème de la mise à l'échelle n'est pas d'avoir plus d'équipes, c'est d'avoir des dépendances entre elles.** Dix équipes indépendantes ne posent aucun problème de coordination. Trois équipes dont chacune attend les deux autres en posent un considérable.

D'où deux réflexes attendus :

**La première réponse à un problème d'échelle est de réduire les dépendances**, en découpant le produit autrement et en rendant les équipes capables de livrer de bout en bout. Ajouter un cadre de coordination par-dessus des dépendances non traitées ajoute de la réunion, pas de la capacité.

**On ne met pas à l'échelle une pratique qui ne fonctionne pas à petite échelle.** Déployer un cadre sur dix équipes dont aucune ne tient un sprint correctement multiplie le dysfonctionnement. C'est un distracteur que l'examen propose volontiers sous la forme d'une adoption globale décidée par la direction.

## Au clavier

1. Prends ton flux de travail actuel et cherche les sept gaspillages. Compte combien d'éléments sont partiellement faits en ce moment.
2. Compte le nombre de sujets sur lesquels chaque personne de ton équipe travaille cette semaine. Au-delà de deux, mesure le temps de traversée.
3. Dessine le tableau avec les étapes **réelles**, attentes comprises. Le nombre de colonnes te surprendra.
4. Écris la règle qui autorise un élément à passer à l'étape suivante. Si personne ne la connaît, c'est que chacun a la sienne.
5. Si ton organisation parle de mise à l'échelle, liste les dépendances entre équipes. C'est le problème à traiter avant le cadre.

**Ressource** : David McLachlan, les cadres agiles — https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg
