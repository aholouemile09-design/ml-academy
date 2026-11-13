C'est la leçon la plus technique du parcours, et la seule où l'examen demande de calculer. Le calcul complet d'EVM sur un projet de 200 000 € et les quatre diagnostics par combinaison de CPI et SPI sont construits dans les exercices de cette leçon.

Cette page traite ce qui vient avant le calcul : la **mécanique de l'échéancier**, les techniques d'**estimation** et ce qu'elles valent, la structure du **budget** et ses réserves, puis les formules de **prévision** — celles qui regardent la fin du projet plutôt que l'instant présent.

## Construire un échéancier : l'enchaînement

```text
1. definir les activites        a partir des lots de travail du WBS
2. les sequencer                avec leurs dependances
3. estimer les durees           par activite
4. elaborer l'echeancier        le reseau produit les dates et le chemin critique
```

L'ordre importe : **on ne met pas de dates avant d'avoir les dépendances.** Un planning construit en posant des dates puis en cherchant à les tenir n'est pas un échéancier, c'est un souhait avec des barres.

## Les quatre types de dépendance

| Type | Signification | Exemple |
| --- | --- | --- |
| **Fin-début** | B commence quand A finit | Le plus courant. Couler les fondations, puis monter les murs |
| **Début-début** | B commence quand A commence | Commencer les tests dès que le développement commence |
| **Fin-fin** | B finit quand A finit | La rédaction de la documentation finit avec le développement |
| **Début-fin** | B finit quand A commence | Rare. L'ancien système s'arrête quand le nouveau démarre |

À quoi s'ajoutent les **décalages** : un **retard** impose d'attendre après la fin du prédécesseur — le séchage du béton avant de poser le carrelage ; une **avance** permet de commencer avant la fin complète du prédécesseur.

Et une classification croisée que l'examen teste :

**Les dépendances obligatoires** sont inhérentes à la nature du travail. On ne peut pas les supprimer.

**Les dépendances optionnelles** viennent d'une bonne pratique ou d'une préférence. Elles **peuvent** être remises en cause — et c'est précisément ce qu'on fait quand on comprime un échéancier.

**Les dépendances externes** dépendent de quelque chose hors du projet : une livraison fournisseur, une autorisation administrative.

**Les dépendances internes** sont sous le contrôle de l'équipe.

La distinction obligatoire/optionnelle est le premier levier quand il faut gagner du temps : **avant d'ajouter des ressources, on cherche les dépendances optionnelles.**

## Chemin critique et marges

Le **chemin critique** est la plus longue séquence d'activités dépendantes. Il détermine la durée minimale du projet, et une activité qui s'y trouve a une marge nulle : tout retard sur elle retarde le projet entier.

Deux marges à distinguer, et la confusion est fréquente :

**La marge totale** est le retard qu'une activité peut prendre **sans retarder la fin du projet**.

**La marge libre** est le retard qu'elle peut prendre **sans retarder l'activité suivante**.

La marge libre est toujours inférieure ou égale à la marge totale. Utiliser la marge totale d'une activité consomme celle de toutes les suivantes du même chemin — ce qui explique pourquoi un petit retard « sans conséquence » en début de projet fait disparaître la souplesse plus loin.

Trois précisions qui valent des points :

**Un projet peut avoir plusieurs chemins critiques.** C'est une situation à risque : chaque chemin critique est un point de défaillance supplémentaire.

**Le chemin critique change au cours du projet.** Un retard important sur un chemin non critique peut le rendre critique. D'où la nécessité de le recalculer, pas de le considérer acquis.

**Le chemin critique n'est pas le chemin des activités importantes.** Une activité stratégique peut avoir trois semaines de marge ; une activité banale peut être critique.

## Comprimer un échéancier

Deux techniques, et l'examen vérifie qu'on ne les confond pas.

| | **Compression par les ressources** | **Mise en parallèle** |
| --- | --- | --- |
| Ce qu'on fait | On ajoute des ressources sur les activités du chemin critique | On exécute en parallèle des activités prévues en séquence |
| Ce que ça coûte | De l'**argent** | Du **risque**, et des reprises |
| Sa limite | Toutes les activités ne se divisent pas | Ne fonctionne que sur des dépendances optionnelles |

Et le rappel qui accompagne la première : **ajouter des personnes à un travail en retard le retarde souvent davantage**, parce que leur intégration se prend sur le temps de ceux qui produisaient.

Deux options sont parfois meilleures que la compression, et l'examen les propose : **réduire le périmètre** après accord de l'instance compétente, ou **accepter et annoncer la nouvelle date**. Comprimer à tout prix un échéancier déjà tendu produit un projet en retard **et** de mauvaise qualité.

## Estimer : quatre techniques et ce qu'elles valent

| Technique | Comment | Précision | Quand |
| --- | --- | --- | --- |
| **Jugement d'expert** | On demande à qui sait | Variable | Toujours utile, jamais suffisant seul |
| **Analogique** | Par comparaison avec un projet similaire | Faible | Très tôt, quand on n'a presque rien |
| **Paramétrique** | Par un ratio mesuré : coût au mètre carré, jours par écran | Moyenne à bonne | Quand on a un historique fiable et un travail répétitif |
| **Ascendante** | On estime chaque lot de travail et on somme | La meilleure | Quand le WBS est détaillé. Coûteuse à produire |

L'**estimation à trois points** se superpose aux précédentes : on demande une valeur optimiste, une plus probable et une pessimiste, puis on les combine.

```text
Triangulaire :  (O + M + P) / 3            poids egal
Beta (PERT)  :  (O + 4M + P) / 6           le plus probable pese quatre fois
```

Son intérêt n'est pas la moyenne mais l'**écart entre O et P** : il mesure l'incertitude. Une activité estimée entre 2 et 20 jours n'est pas une activité de 8 jours, c'est une activité qu'on ne sait pas estimer — et c'est une information à traiter, pas à moyenner.

Trois précisions d'examen :

**Une estimation s'affine.** L'ordre de grandeur initial a une fourchette large, qui se resserre à mesure que l'information arrive. Annoncer un chiffre précis très tôt est la source la plus fréquente d'engagement intenable.

**Une estimation n'est pas un engagement.** Transformer une estimation en date promise sans ajouter de réserve est une faute de méthode courante.

**Ceux qui font le travail estiment.** Une estimation imposée par le chef de projet produit un engagement que personne ne tiendra.

## La structure du budget

L'empilement est testé régulièrement, et il se lit de bas en haut.

```text
estimations des lots de travail
        + reserves de contingence          --> comptes de controle
                                           --> REFERENCE DE BASE DES COUTS
        + reserve de management             --> BUDGET DU PROJET
```

| Réserve | Couvre | Qui l'engage | Dans la référence ? |
| --- | --- | --- | --- |
| **Contingence** | Les risques **identifiés** — les inconnues connues | Le **chef de projet** | **Oui** |
| **Management** | L'imprévu — les inconnues inconnues | La **direction** ou le sponsor | **Non** |

Cette distinction produit une famille de questions. Un risque identifié qui se matérialise se finance sur la réserve de contingence, que le chef de projet engage lui-même. Un événement totalement imprévu demande d'aller chercher la réserve de management, ce qui passe par la direction. Et puiser dans la réserve de management **modifie la référence de base des coûts**, donc demande une demande de changement.

Et les types de coûts à reconnaître : **directs** imputables au projet contre **indirects** partagés ; **fixes** indépendants du volume contre **variables** proportionnels.

## Prévoir : regarder la fin, pas le présent

Les écarts et les indices disent où on en est. Les formules de prévision disent où on va, et c'est ce qui intéresse un comité de direction.

```text
BAC   budget total initialement prevu
EAC   cout total final estime
ETC   ce qu'il reste a depenser
VAC   ecart final prevu        VAC = BAC - EAC
```

Trois façons de calculer l'EAC, selon l'hypothèse qu'on fait sur la suite :

```text
1) la tendance se poursuit             EAC = BAC / CPI
2) l'ecart etait ponctuel              EAC = AC + (BAC - EV)
3) la tendance se poursuit et on
   doit aussi rattraper le retard      EAC = AC + [(BAC - EV) / (CPI x SPI)]
```

**Le choix de la formule est la vraie question**, pas le calcul. Une question qui précise « les écarts actuels sont représentatifs du futur » attend la première. Une question qui précise « le dépassement était dû à un événement exceptionnel qui ne se reproduira pas » attend la seconde. Lire cette indication dans l'énoncé est ce qui départage les candidats.

Et un dernier indice, moins connu et régulièrement testé :

```text
TCPI = (BAC - EV) / (BAC - AC)
```

Il répond à : **quelle performance de coût faut-il tenir sur le travail restant pour finir dans le budget ?** Un TCPI de 1,15 signifie qu'il faudrait être 15 % plus efficace que prévu sur tout le reste. Au-delà de 1,10, c'est en général une information à transmettre honnêtement : le budget initial ne sera pas tenu.

## Et en agile

Les mêmes questions, d'autres instruments.

**La vélocité** mesure la quantité d'éléments terminés par itération. Elle sert à prévoir, pas à comparer des équipes — une vélocité se compare à elle-même dans le temps.

**Le graphique d'avancement descendant** montre le travail restant, par itération ou pour la version complète. Sa pente projetée donne la date d'achèvement probable.

**Le graphique d'avancement cumulé** montre le travail terminé **et** le périmètre total. C'est le seul des deux qui rend une dérive de périmètre visible : la courbe du haut monte.

Et la mesure du temps de traversée — la durée entre le moment où un élément entre dans le flux et celui où il est livré — est l'indicateur le plus utile en flux tiré, parce qu'il prédit mieux que la vélocité.

## Au clavier

1. Prends dix activités de ton projet et identifie le type de chaque dépendance. Cherche les optionnelles : ce sont tes leviers de compression.
2. Calcule le chemin critique à la main sur un réseau de huit activités. C'est le seul moyen de comprendre la marge.
3. Prends trois estimations de ton projet et demande à ceux qui font le travail une valeur optimiste et pessimiste. L'écart te dira où est le risque.
4. Vérifie si ton budget distingue une réserve de contingence et une réserve de management. Si tu n'as aucune réserve, ton budget est une estimation présentée comme un engagement.
5. Calcule le TCPI de ton projet. S'il dépasse 1,10, prépare la conversation.

**Ressource** : David McLachlan, l'EVM expliqué avec des exercices — https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg
