Environ **60 % des questions** de l'examen 2026 relèvent de l'agile ou de l'hybride, réparties dans les trois domaines. Le partage des décisions dans Scrum — le Product Owner décide du quoi, l'équipe du comment — est construit dans l'exercice d'application de cette leçon, et le cas situationnel traite un Product Owner absent.

Cette page traite ce qui donne du sens à ces règles : **pourquoi** l'agilité fonctionne là où elle fonctionne, ce que le Manifeste dit exactement, et la structure du cadre Scrum au-delà de la liste de ses rôles.

## Pourquoi l'itératif marche, et quand il ne sert à rien

L'agilité n'est pas une préférence culturelle. Elle répond à un problème précis : **le coût d'une erreur de compréhension du besoin croît avec le temps où elle reste invisible.**

```text
cout de correction
     |                                      /
     |                               /
     |                        /
     |              /
     |     /
     +-------------------------------------- temps
       conception  dev   test   production
```

En livrant tôt et souvent, on ne produit pas plus vite : on **raccourcit le délai avant retour**. Une erreur de besoin découverte au bout de trois semaines coûte trois semaines ; découverte au bout de dix-huit mois, elle coûte le projet.

Ce raisonnement a une conséquence que les enthousiastes oublient : **quand il n'y a rien à apprendre, l'itération ne rapporte rien.** Sur un périmètre figé par un texte réglementaire, le retour utilisateur ne modifiera aucune décision. Les cérémonies subsistent alors sans leur contrepartie, et c'est le pire des deux mondes — sujet traité au module Mindset.

## Le Manifeste, et le mot qu'on lit mal

Les quatre valeurs du Manifeste agile, de 2001 :

Les **individus et leurs interactions** plutôt que les processus et les outils.

Un **produit qui fonctionne** plutôt qu'une documentation exhaustive.

La **collaboration avec le client** plutôt que la négociation contractuelle.

L'**adaptation au changement** plutôt que le suivi d'un plan.

Le mot décisif est « plutôt que ». Le texte original précise explicitement que **les éléments de droite ont de la valeur**, et que ceux de gauche en ont davantage. Ce n'est pas une opposition mais une hiérarchie.

Cette nuance est régulièrement testée. Une réponse qui propose de supprimer la documentation, d'ignorer le contrat ou d'abandonner tout plan parce qu'« on est agile » est fausse. La documentation utile reste utile ; c'est la documentation exhaustive produite par principe qui est écartée.

Les douze principes se regroupent utilement en quatre familles :

**Sur la valeur** : satisfaire le client par des livraisons précoces et continues ; livrer fréquemment ; un produit fonctionnel est la mesure principale de l'avancement.

**Sur le changement** : accueillir le changement, même tard, comme un avantage concurrentiel.

**Sur les personnes** : construire autour de personnes motivées et leur faire confiance ; privilégier la conversation directe ; les meilleures solutions émergent d'équipes auto-organisées.

**Sur la soutenabilité** : un rythme tenable indéfiniment ; l'excellence technique et la simplicité ; une réflexion régulière de l'équipe sur son fonctionnement.

Le principe du **rythme soutenable** mérite d'être relevé, parce qu'il contredit une pratique courante : un engagement de sprint systématiquement tenu au prix d'heures supplémentaires n'est pas de la performance, c'est une dette qui se paiera en qualité puis en départs.

## Le contrôle empirique, et les trois piliers

Scrum ne repose pas sur la planification mais sur l'**empirisme** : on avance par observation plutôt que par prédiction. Trois piliers le rendent possible, et chaque cérémonie en est une application.

| Pilier | Ce qu'il exige | Ce qui le détruit |
| --- | --- | --- |
| **Transparence** | Que l'état réel du travail soit visible de tous | Un avancement enjolivé, un blocage non dit |
| **Inspection** | Qu'on regarde régulièrement le résultat et le processus | Une revue transformée en présentation commerciale |
| **Adaptation** | Qu'on change quelque chose quand l'inspection le demande | Une rétrospective sans action, répétée |

L'ordre est logique : sans transparence, l'inspection porte sur une fiction ; sans inspection, l'adaptation est aveugle. C'est pourquoi la **sécurité psychologique** n'est pas un supplément d'âme en agile : elle est la condition du premier pilier.

À quoi s'ajoutent cinq valeurs attendues de l'équipe : **engagement, concentration, ouverture, respect et courage**. Le courage est celui de dire qu'un objectif ne sera pas atteint.

## Les rôles, et la ligne de partage

| Rôle | Responsable de | Ne décide pas de |
| --- | --- | --- |
| **Product Owner** | La **valeur** : le contenu et l'ordre du backlog, l'objectif du produit | Comment l'équipe travaille, ni ses estimations |
| **Équipe de réalisation** | Le **comment** : la conception, l'estimation, l'engagement d'itération | Ce qu'il faut faire en priorité |
| **Scrum Master** | Le **processus** : facilitation, levée des obstacles, protection de l'équipe | Ni le contenu, ni la priorité, ni l'affectation |

Trois points que l'examen exploite.

**Le Product Owner est une personne, pas un comité.** La décision produit doit pouvoir être rendue rapidement, et un comité ne rend pas de décision rapide. Un Product Owner sans disponibilité ni mandat réel est le dysfonctionnement le plus fréquent, et il bloque le mécanisme entier : sans arbitrage de valeur, l'équipe travaille au hasard.

**Le Scrum Master ne décide presque rien**, et c'est volontaire. Son autorité porte sur le respect du cadre, pas sur le travail. Un Scrum Master qui affecte les tâches ou qui tranche les priorités est redevenu un chef de projet traditionnel avec un autre titre.

**L'équipe est auto-organisée, dans un cadre.** Elle décide comment produire l'objectif ; elle ne décide pas de l'objectif. Confondre les deux produit les deux erreurs opposées que l'examen propose : un chef de projet qui impose la méthode de travail, ou une équipe qui choisit ce qu'elle a envie de faire.

Et le lien avec le rôle réel du chef de projet : en contexte agile, il tient souvent la posture de **facilitateur**. Il ne commande pas, il lève les obstacles et fait se parler ceux qui décident.

## Le sprint, et ce qu'il protège

Le sprint est une itération de durée fixe, d'une à quatre semaines, qui produit un incrément utilisable. Sa durée **ne change pas** d'un sprint à l'autre : c'est ce qui rend la mesure comparable et la prévision possible.

| Événement | Durée indicative sur un sprint de 2 semaines | Son objet |
| --- | --- | --- |
| **Planification** | Jusqu'à 4 h | Définir l'objectif du sprint et sélectionner le travail |
| **Point quotidien** | 15 min | Synchroniser et faire remonter les obstacles |
| **Revue** | Jusqu'à 2 h | Montrer l'incrément aux parties prenantes et recueillir du retour |
| **Rétrospective** | Jusqu'à 1 h 30 | Améliorer la façon de travailler |
| **Affinage du backlog** | Continu, environ 10 % de la capacité | Préparer les éléments des sprints suivants |

Deux règles du sprint sont fermes et produisent des questions.

**L'objectif du sprint ne change pas en cours de sprint.** Le périmètre peut s'ajuster à la marge en accord avec le Product Owner, mais l'objectif tient. C'est ce qui permet à l'équipe de travailler sans être interrompue en permanence — et c'est ce que protège le Scrum Master.

**Seul le Product Owner peut annuler un sprint**, et seulement si son objectif est devenu obsolète. C'est rare, et c'est à connaître parce que c'est parfois la bonne réponse : un changement de contexte qui vide l'objectif de son sens ne se gère pas en continuant par discipline.

## Artefacts et engagements

Chaque artefact porte un engagement qui le rend mesurable. C'est une structure utile à retenir, parce qu'elle explique à quoi sert chaque document.

| Artefact | Son engagement | Ce que l'engagement permet |
| --- | --- | --- |
| **Backlog produit** | L'**objectif de produit** | Savoir vers quoi l'ensemble du backlog tend |
| **Backlog de sprint** | L'**objectif de sprint** | Savoir si le sprint a réussi, indépendamment du nombre d'éléments finis |
| **Incrément** | La **définition de terminé** | Savoir si un élément est fini, sans discussion |

La **définition de terminé** est celle qu'on néglige, et elle a le plus d'effet. Elle énumère ce qui s'applique à tout élément pour être considéré comme fini : testé, revu, documenté, intégré, déployable. Sans elle, « terminé » signifie quelque chose de différent pour chacun, et l'incrément n'est pas livrable. Avec elle, une bonne part des conflits de fin de sprint disparaît.

Elle se distingue des **critères d'acceptation**, qui sont propres à chaque élément : la définition de terminé est transverse, les critères d'acceptation sont spécifiques.

## Au clavier

1. Prends un projet agile auquel tu as participé et demande ce qu'il y avait à apprendre. Si la réponse est « rien », l'itération était de la cérémonie.
2. Pour les quatre valeurs du Manifeste, écris ce que la version mal lue produirait. C'est ce que l'examen propose comme distracteur.
3. Évalue les trois piliers sur ton équipe : l'état réel est-il visible, regarde-t-on, change-t-on quelque chose ensuite ?
4. Vérifie qui porte réellement la décision produit sur ton projet. Si c'est un comité, tu n'as pas de Product Owner.
5. Écris la définition de terminé de ton équipe. Si elle n'existe pas, fais-la écrire par l'équipe et compte les désaccords : c'est le coût que tu payais sans le voir.

**Ressource** : l'Agile Practice Guide du PMI — https://www.pmi.org/learning/exam-prep · vidéos agile d'Andrew Ramdayal — https://www.youtube.com/AndrewRamdayal
