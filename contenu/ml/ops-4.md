Un modèle déployé peut discriminer, amplifier des préjugés et causer des préjudices réels. L'éthique en apprentissage automatique n'est pas un supplément : c'est une exigence technique et légale, en Europe par le RGPD et l'AI Act.

Cette leçon traite trois choses : par où le biais entre dans un système, pourquoi les définitions mathématiques de l'équité s'excluent mutuellement — démontré ici par la mesure — et comment on explique une prédiction individuelle.

## Par où le biais entre

Le biais n'est pas une propriété de l'algorithme, c'est une propriété de la chaîne complète. Il entre à cinq endroits distincts, et chacun demande une vérification différente.

| source | exemple concret |
|---|---|
| données d'entraînement | un historique de recrutement où les hommes sont sur-représentés |
| variable de substitution | le code postal, qui encode partiellement l'origine sociale |
| annotation | des annotateurs porteurs de biais culturels |
| boucle de rétroaction | modèle policier → plus de contrôles → plus de données sur les mêmes quartiers |
| définition de la cible | « bon employé » défini par les évaluations de managers |

La dernière ligne est la plus difficile à voir et la plus lourde de conséquences. Les quatre premières portent sur les données ; celle-ci porte sur la question posée. Un modèle qui prédit parfaitement une cible mal définie est un modèle parfaitement biaisé, et aucune métrique calculée sur cette cible ne le signalera jamais — parce que la métrique et la cible sont la même chose.

La boucle de rétroaction a une particularité : elle rend le biais **auto-confirmant**. Les prédictions du modèle déterminent où l'on collecte les données suivantes, donc le modèle fabrique les données qui lui donneront raison. Contrairement aux autres sources, celle-ci empire avec le temps en l'absence de toute intervention.

## L'affaire COMPAS

COMPAS est un outil d'évaluation du risque de récidive utilisé par des tribunaux américains. En 2016, ProPublica publie une analyse de ses scores sur plus de 7 000 dossiers du comté de Broward, en Floride, et mesure un taux de faux positifs — des accusés classés « à risque » qui ne récidiveront pas — environ deux fois plus élevé pour les accusés noirs que pour les blancs.

Northpointe, l'éditeur, répond que son outil est **calibré** : pour un score donné, la probabilité réelle de récidive est la même dans les deux groupes. Les deux camps avaient raison sur leurs chiffres respectifs.

Ce qui a mis fin au débat n'est pas une mesure supplémentaire mais une démonstration mathématique, publiée indépendamment par Kleinberg, Mullainathan et Raghavan en 2016 et par Chouldechova en 2017 : **lorsque les taux de base diffèrent réellement entre groupes, la calibration et l'égalité des taux d'erreur sont incompatibles.** Aucun modèle ne peut avoir les deux. L'affaire COMPAS n'était donc pas un défaut d'implémentation, c'était un arbitrage non assumé.

La section suivante refait cette démonstration sur des données construites pour cela, afin que le résultat cesse d'être une citation.

## Les définitions de l'équité

Soit A le groupe sensible, Ŷ la prédiction, Y la valeur réelle.

```
Parité démographique
    P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1)
    Même taux de décisions positives dans les deux groupes,
    indépendamment des taux de base réels.

Égalité des chances
    P(Ŷ=1 | Y=1, A=0) = P(Ŷ=1 | Y=1, A=1)
    Même taux de vrais positifs : à situation réelle égale,
    même probabilité d'être détecté.

Égalité des cotes
    Taux de vrais positifs ET taux de faux positifs égaux.
    Le modèle se trompe de la même façon dans les deux sens,
    pour chaque groupe.

Calibration
    P(Y=1 | score = s, A=0) = P(Y=1 | score = s, A=1)
    Un score de 0,70 signifie la même chose dans tous les groupes.
```

Ces définitions ne sont pas quatre façons de dire la même chose. Ce sont quatre exigences différentes, et le théorème cité plus haut dit qu'on ne peut pas les satisfaire ensemble dès que les taux de base diffèrent.

## L'impossibilité, mesurée

Deux groupes, 60 000 lignes, avec des taux de base **réellement** différents — c'est l'hypothèse du théorème, et elle correspond à une situation où la différence n'est pas un artefact de mesure :

| groupe | lignes | taux réel de positifs |
|---|---|---|
| 0 | 42 074 | 0,6274 |
| 1 | 17 926 | 0,3638 |

Une régression logistique sur deux variables, **le groupe n'étant pas une variable d'entrée**. AUC globale 0,9259. Le score produit est calibré dans les deux groupes, tranche par tranche :

| tranche de score | taux réel, groupe 0 | groupe 1 | écart |
|---|---|---|---|
| [0,1 ; 0,3[ | 0,2075 | 0,2150 | 0,0075 |
| [0,3 ; 0,5[ | 0,4050 | 0,3845 | 0,0206 |
| [0,5 ; 0,7[ | 0,5893 | 0,5959 | 0,0066 |
| [0,7 ; 0,9[ | 0,8043 | 0,7887 | 0,0155 |

Maintenant, **trois règles de décision appliquées à ces mêmes scores**.

**A. Un seuil unique à 0,50.**

| critère | groupe 0 | groupe 1 | écart |
|---|---|---|---|
| taux d'acceptation | 0,6446 | 0,3434 | **0,3012** |
| taux de vrais positifs | 0,8875 | 0,7548 | 0,1327 |
| taux de faux positifs | 0,2357 | 0,1081 | 0,1276 |

Exactitude globale 0,8417. Un seul seuil, appliqué à un score calibré, et les trois écarts sont ouverts.

**B. Deux seuils calés sur la parité démographique** — même taux d'acceptation dans les deux groupes, fixé à 0,5546. Les seuils nécessaires sont **0,6681 pour le groupe 0 et 0,1646 pour le groupe 1** : la barre est quatre fois plus basse d'un côté.

| critère | groupe 0 | groupe 1 | écart |
|---|---|---|---|
| taux d'acceptation | 0,5546 | 0,5547 | **0,0000** |
| taux de vrais positifs | 0,8052 | 0,9433 | 0,1380 |
| taux de faux positifs | 0,1327 | 0,3324 | **0,1997** |

L'écart d'acceptation est annulé. L'écart de faux positifs a **augmenté**, de 0,1276 à 0,1997 : en imposant la parité, on a fait entrer dans le groupe 1 une population dont un tiers ne satisfait pas le critère. Exactitude globale 0,8103, soit 3,1 points de moins que la règle A.

**C. Deux seuils calés sur l'égalité des chances** — même taux de vrais positifs, cible 0,8875. Seuils 0,5001 et 0,2726.

| critère | groupe 0 | groupe 1 | écart |
|---|---|---|---|
| taux d'acceptation | 0,6446 | 0,4712 | **0,1734** |
| taux de vrais positifs | 0,8875 | 0,8875 | **0,0001** |
| taux de faux positifs | 0,2357 | 0,2332 | 0,0026 |

Celle-ci atteint les deux moitiés de l'égalité des cotes à la fois — écarts de 0,0001 et 0,0026 — et laisse 17 points d'écart sur les taux d'acceptation. Exactitude globale 0,8324.

Récapitulatif des trois règles sur les mêmes scores :

| règle | écart d'acceptation | écart de TVP | écart de TFP | exactitude globale |
|---|---|---|---|---|
| A, seuil unique | 0,3012 | 0,1327 | 0,1276 | 0,8417 |
| B, parité démographique | **0,0000** | 0,1380 | 0,1997 | 0,8103 |
| C, égalité des chances | 0,1734 | **0,0001** | **0,0026** | 0,8324 |

Aucune colonne n'est à zéro sur deux lignes à la fois. Ce n'est pas un défaut de réglage : c'est le théorème.

Une précision qui compte, parce qu'elle est facile à lire de travers. La calibration mesurée plus haut ne change pas d'une règle à l'autre : c'est une propriété du **score**, pas de la décision. Ce que B et C sacrifient, c'est quelque chose de plus concret — la décision cesse d'être une fonction du score seul. Avec la règle B, un dossier scoré 0,30 est accepté s'il appartient au groupe 1 et refusé s'il appartient au groupe 0. Deux personnes avec le même score, et la même probabilité réelle de succès, reçoivent une réponse différente à cause de leur groupe. C'est un choix défendable dans certains contextes et interdit dans d'autres, mais ce n'est jamais un choix neutre, et il ne peut pas être pris dans le code sans être pris par quelqu'un.

## Expliquer une prédiction

Mesurer un écart dit qu'il existe ; expliquer une prédiction dit par quoi elle est arrivée. Deux approches dominent, et la différence entre elles n'est pas cosmétique.

**SHAP** attribue à chaque variable une contribution issue des valeurs de Shapley, de la théorie des jeux coopératifs : la contribution d'une variable est sa contribution marginale moyennée sur tous les ordres d'arrivée possibles des variables. Cette construction a une propriété forte — les contributions s'additionnent exactement pour reconstituer l'écart entre la prédiction et la moyenne — et un coût : le nombre de sous-ensembles à évaluer croît exponentiellement, d'où des implémentations exactes réservées aux modèles à base d'arbres.

```python
import shap

explicateur = shap.TreeExplainer(modele)
valeurs = explicateur.shap_values(X_test)

shap.summary_plot(valeurs, X_test)                   # effet de chaque variable
shap.waterfall_plot(explicateur(X_test)[0])          # une prédiction, décomposée
shap.dependence_plot("age", valeurs, X_test, interaction_index="sexe")
```

La troisième ligne est celle qui sert à l'équité : elle montre si l'effet de l'âge diffère selon le sexe, c'est-à-dire si le modèle a appris une règle différente par groupe sans qu'on le lui demande.

**LIME** fait autre chose : il perturbe l'entrée autour du point à expliquer, observe les prédictions obtenues, et ajuste un modèle linéaire local sur ce nuage. L'explication est l'équation de ce modèle local.

```python
from lime.lime_tabular import LimeTabularExplainer

expl = LimeTabularExplainer(X_train.values, feature_names=list(X_train.columns),
                            class_names=["Non", "Oui"], mode="classification")
expl.explain_instance(X_test.iloc[0].values, modele.predict_proba, num_features=10)
```

| | SHAP | LIME |
|---|---|---|
| fondation | valeurs de Shapley | approximation linéaire locale |
| additivité garantie | oui | non |
| stabilité entre exécutions | déterministe pour les arbres | varie, le tirage est aléatoire |
| coût | élevé hors modèles à arbres | faible |
| portée | tout modèle, exact sur les arbres | tout modèle, par boîte noire |

La ligne « stabilité » est la raison pratique de préférer SHAP quand c'est possible : une explication qui change d'une exécution à l'autre ne peut pas être versée à un dossier, et le droit à l'explication n'est pas satisfait par une explication qui varie.

Ni `shap`, ni `lime`, ni `fairlearn` ne font partie des dépendances de ce cours. Les trois s'installent par `pip` et aucun n'est nécessaire pour les exercices de ce module : les métriques par groupe se calculent avec `confusion_matrix`, et c'est préférable pour comprendre ce qu'elles valent.

## Avant la mise en production

- Identifier les groupes sensibles présents dans les données, y compris ceux qui ne sont pas des colonnes.
- Mesurer les métriques par groupe : taux d'acceptation, vrais positifs, faux positifs, faux négatifs.
- Choisir explicitement un critère d'équité, écrire ce que ce choix sacrifie, et dire qui l'a pris.
- Documenter les limites connues dans une fiche de modèle : usage prévu, usage exclu, données d'entraînement, performances par groupe.
- Vérifier la conformité RGPD, en particulier l'article 22 sur les décisions automatisées.
- Prévoir une revue humaine pour les cas proches du seuil.
- Surveiller les métriques d'équité en production : elles dérivent comme les autres.

La troisième ligne est celle qu'on oublie, et c'est la seule qui ne peut pas être rattrapée après coup. Un arbitrage non documenté a quand même été fait — par le seuil qui se trouvait dans le code.

## Au clavier

1. Choisir un critère d'équité, par écrit, avant d'entraîner. Les trois règles mesurées plus haut donnent 0,8417, 0,8103 et 0,8324 d'exactitude globale et trois profils d'écarts incompatibles : le choix existe, qu'on le fasse ou non.
2. Ne jamais lire un seul chiffre global. Deux règles de décision qui donnent la même exactitude à 3 points près produisent des écarts de faux positifs de 0,1276 et 0,1997.
3. Préférer SHAP à LIME quand le modèle est à base d'arbres, pour la seule raison qui compte en production : une explication déterministe peut être versée à un dossier, une explication qui varie ne peut pas.
