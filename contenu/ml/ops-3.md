Un modèle se dégrade silencieusement : le monde change, pas lui. La surveillance d'un modèle en production repose sur deux tests par colonne — Kolmogorov-Smirnov pour la significativité, PSI pour l'amplitude — et sur quatre niveaux d'observation : les entrées, les sorties, les métriques métier quand les étiquettes arrivent, et le retour humain.

Cet appareillage est le bon. Cette leçon porte sur ce qu'il ne voit pas, parce qu'un tableau de bord entièrement vert n'est une bonne nouvelle que si l'on sait quelles dégradations il est incapable d'afficher. Quatre angles morts, tous mesurés.

## Angle mort 1 : la dépendance entre colonnes

Deux capteurs qui mesurent presque la même chose, corrélés à 0,90 à l'entraînement. La cible dépend de leur moyenne. Le modèle apprend des coefficients **2,935** et **2,999** — il répartit le poids entre les deux, puisque les deux disent la même chose. AUC de référence **0,9730**.

Puis un des deux capteurs est recalibré, et la corrélation tombe à 0,11. Les lois marginales, elles, sont inchangées :

| | référence | production |
|---|---|---|
| corrélation | 0,8983 | **0,1072** |
| capteur A, moyenne | 0,0047 | −0,0029 |
| capteur B, moyenne | 0,0041 | −0,0029 |
| capteur A, écart-type | 0,9960 | 0,9979 |
| capteur B, écart-type | 0,9996 | 1,0026 |

Ce que la surveillance par colonne affiche :

| colonne | PSI | KS, p-valeur | verdict |
|---|---|---|---|
| `capteur_a` | 0,0012 | 5,17e-01 | stable |
| `capteur_b` | 0,0003 | 8,81e-01 | stable |

Les deux colonnes sont déclarées stables, et elles le sont : chacune suit exactement la même loi qu'à l'entraînement. Pendant ce temps :

| | référence | production |
|---|---|---|
| AUC | 0,9730 | **0,9548** |
| exactitude | 0,9073 | **0,8763** |

Trois points d'exactitude. Ce n'est pas un effondrement, et il faut le dire ainsi : l'angle mort n'est pas spectaculaire ici, il est **inexplicable**. Aucune des deux colonnes n'a bougé, donc aucun tableau de bord par colonne ne pourra jamais rendre compte de la perte, et l'enquête commencera par chercher un bug.

Le PSI calculé sur la distribution **conjointe** — les couples discrétisés en 5 × 5 cases — vaut **0,7796**, très au-delà du seuil de 0,25. L'information existait, elle n'était simplement pas regardée.

Le prix de la surveillance conjointe est le nombre de cases : avec 8 colonnes découpées en déciles, la distribution conjointe compte 10⁸ cases et aucune donnée de production ne la remplira jamais. En pratique on surveille les quelques paires que le métier sait liées — deux capteurs redondants, un montant et sa devise, un âge et une ancienneté — et la matrice de corrélation dans son ensemble, colonne par colonne, ce qui ne coûte rien.

## Angle mort 2 : la dérive de concept ne touche ni les entrées ni les sorties

Le cas classique : la relation X → y change alors que X reste identique. Quatre colonnes normales, un modèle entraîné, puis en production la contribution d'une colonne change de signe — les clients n'ont pas changé, c'est le monde qui a changé d'avis sur eux.

| colonne | PSI | KS, p-valeur |
|---|---|---|
| `colonne_0` | 0,0008 | 4,11e-01 |
| `colonne_1` | 0,0007 | 4,86e-01 |
| `colonne_2` | 0,0002 | 9,83e-01 |
| `colonne_3` | 0,0007 | 9,79e-01 |
| **sorties du modèle** | **0,0012** | **2,14e-01** |

La dernière ligne est la raison d'être de cette section. On enseigne — et la leçon le disait — que surveiller la **distribution des prédictions** permet de détecter une dégradation sans attendre les étiquettes. C'est vrai pour une dérive des entrées : si X change, les sorties changent. Ça ne l'est pas ici. Les entrées suivent la même loi, le modèle est le même objet, donc ses sorties suivent la même loi. Le taux de positifs prédits passe de 0,5014 à 0,5037.

Et pourtant :

| | référence | production |
|---|---|---|
| AUC | 0,9827 | **0,7175** |
| exactitude | 0,9266 | **0,6553** |
| taux réel de positifs | 0,5011 | 0,5052 |

**27 points d'exactitude** perdus. Zéro signal dans les entrées, zéro signal dans les sorties, et même le taux réel de positifs est inchangé — la base n'a pas bougé, c'est l'appariement entre X et y qui a bougé.

La conclusion est désagréable et il faut l'énoncer franchement : **aucune surveillance sans étiquettes ne peut détecter une dérive de concept pure.** Ce n'est pas une limite d'outillage, c'est une limite d'information. P(X) est observable en continu, P(y|X) ne l'est qu'à l'arrivée des étiquettes. Le délai d'obtention des étiquettes — trois jours pour une fraude confirmée, trois mois pour un défaut de paiement, jamais pour une recommandation qu'on n'a pas cliquée — est donc le vrai plafond de réactivité du système, et la seule chose qui le réduise est un échantillon annoté en continu, délibérément payé.

## Angle mort 3 : cinquante colonnes alertent toutes seules

Un service surveille 50 colonnes et exécute son test chaque semaine. Simulation sur 52 semaines, avec **aucune dérive** : la production est tirée exactement de la même loi que la référence, 10 000 lignes de référence contre 2 000 de production.

| règle d'alerte | alertes par semaine | maximum | semaines avec ≥ 1 alerte |
|---|---|---|---|
| KS, p < 0,05 | **2,35** | 7 | **46 sur 52, soit 88 %** |
| KS, Bonferroni, p < 0,001 | 0,02 | 1 | — |
| PSI > 0,10 | **0,00** | 0 | — |

2,35 alertes par semaine, pour une attente théorique de 50 × 0,05 = 2,5. Le test fait exactement ce qu'il promet : il se trompe 5 % du temps, et sur 50 colonnes cela fait deux ou trois faux positifs par semaine, chaque semaine, indéfiniment. **88 % des semaines contiennent au moins une alerte** sur un système où rien ne dérive.

Les conséquences sont organisationnelles avant d'être statistiques. Une astreinte réveillée deux fois par semaine pour rien cesse de regarder les alertes au bout d'un mois, et c'est à ce moment-là que la vraie dérive arrive. Un détecteur qui crie sans raison est pire qu'un détecteur absent, parce qu'il consomme l'attention tout en donnant l'illusion de la couvrir.

Deux remèdes, mesurés dans le tableau. La correction de Bonferroni — diviser le seuil par le nombre de tests — ramène à 0,02 alerte par semaine, au prix d'une perte de sensibilité aux petites dérives réelles. Le PSI avec son seuil de 0,10 n'émet **aucune** fausse alerte ici, parce qu'il ne mesure pas la significativité mais l'amplitude, et qu'une amplitude nulle reste nulle quelle que soit la taille de l'échantillon. C'est la raison de fond pour laquelle le PSI est le standard bancaire, et elle se mesure.

## Angle mort 4 : les deux seuils dépendent de choix non documentés

### Le KS dépend du nombre de lignes

Même décalage de moyenne, p-valeur médiane de KS sur 15 tirages :

| lignes | décalage 0,02 | 0,05 | 0,10 | 0,30 |
|---|---|---|---|---|
| 500 | 5,81e-01 | 1,92e-01 | 4,58e-02 | 1,85e-07 |
| 2 000 | 3,32e-01 | 1,85e-01 | 1,20e-03 | 1,50e-25 |
| 10 000 | 9,17e-02 | 7,18e-05 | 5,95e-12 | 1,90e-107 |
| 100 000 | 7,58e-03 | 2,86e-12 | 4,38e-48 | 0,00e+00 |

Un décalage de 0,05 écart-type — invisible, sans effet mesurable sur un modèle — passe de « non significatif » (p = 0,19) à p = 2,86e-12 en multipliant l'échantillon par 50. Le seuil p < 0,05 n'est pas un seuil de dérive, c'est un seuil de détectabilité, et il se déplace avec le trafic. Un service qui grandit verra ses alertes se multiplier sans qu'aucune distribution n'ait changé.

### Le PSI en dépend beaucoup moins, mais pas à petit échantillon

Le même tableau, en PSI médian :

| lignes | décalage 0,02 | 0,05 | 0,10 | 0,30 |
|---|---|---|---|---|
| 500 | **0,0154** | **0,0206** | 0,0250 | 0,1142 |
| 2 000 | 0,0054 | 0,0074 | 0,0118 | 0,0862 |
| 10 000 | 0,0016 | 0,0036 | 0,0113 | 0,0840 |
| 100 000 | 0,0007 | 0,0028 | 0,0103 | 0,0867 |

À partir de 2 000 lignes, le PSI est stable : pour un décalage de 0,10, il vaut 0,0118 / 0,0113 / 0,0103 quelle que soit la taille. C'est la propriété annoncée, et elle se vérifie. En revanche à 500 lignes il est **gonflé** : 0,0154 pour un décalage de 0,02, soit plus que la valeur mesurée pour un décalage cinq fois plus grand à 100 000 lignes. Le bruit de découpage en classes se mélange au signal. Le PSI n'est donc pas indépendant de la taille de l'échantillon, il l'est au-dessus de quelques milliers de lignes — et une surveillance quotidienne d'un segment peu fréquenté tombe exactement sous ce seuil.

### Et le PSI dépend du nombre de classes

| classes | décalage de moyenne 0,15 | écart-type × 1,5 |
|---|---|---|
| 5 | 0,0225 | 0,1250 |
| 10 | 0,0243 | 0,1940 |
| 20 | 0,0268 | **0,2430** |
| 50 | 0,0292 | **0,2861** |
| 100 | 0,0328 | **0,3117** |

Sur la colonne de droite — un élargissement de 50 % de l'écart-type, la même dérive dans les cinq lignes — le verdict passe de « à surveiller » à « dérive significative » entre 20 et 50 classes. Le seuil universel de 0,25 ne qualifie donc pas une dérive : il qualifie un couple (dérive, découpage). Les déciles sont la convention, et c'est tout ce qu'ils sont ; ce qui compte est de ne jamais la changer en cours de route, sous peine de voir « apparaître » une dérive le jour où quelqu'un passe de 10 à 20 classes pour affiner le graphique.

## Ce que ces quatre angles morts impliquent

| le tableau de bord est vert et pourtant | ce qu'il faudrait regarder |
|---|---|
| la dépendance entre colonnes a changé | les corrélations des paires que le métier sait liées |
| la relation X → y a changé | les étiquettes, et rien d'autre : un échantillon annoté en continu |
| rien ne dérive, mais l'astreinte est réveillée | l'amplitude plutôt que la significativité ; corriger pour le nombre de tests |
| le verdict a changé sans que les données changent | la taille de l'échantillon et le nombre de classes, versionnés comme du code |

La dernière ligne mérite d'être prise au mot : le nombre de classes, la fenêtre de référence et le seuil d'alerte sont des paramètres du système de surveillance. Changés sans trace, ils fabriquent des dérives et en effacent. Ils appartiennent au fichier de configuration et à l'historique git, au même titre que les hyperparamètres du modèle.

## Au clavier

1. Avant de conclure qu'un tableau de bord vert signifie un modèle sain, vérifier qu'une dérive de concept pure aurait produit ce même tableau. Elle le produit : 27 points d'exactitude perdus avec un PSI de 0,0012 sur les entrées **et** sur les sorties.
2. Compter les tests avant de choisir un seuil. Cinquante colonnes à p < 0,05 donnent 2,35 fausses alertes par semaine et 88 % de semaines bruyantes, sans aucune dérive.
3. Versionner le nombre de classes et la fenêtre de référence avec le code. La même dérive vaut 0,1250 ou 0,3117 de PSI selon un paramètre que personne n'écrit nulle part.
