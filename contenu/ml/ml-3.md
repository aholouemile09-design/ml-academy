Un arbre de décision découpe l'espace par questions successives : « âge > 30 ? », puis « revenu > 2 400 ? ». Toute la famille des méthodes qui dominent les données tabulaires — forêts, XGBoost, LightGBM — n'est qu'un empilement de cette brique. Vaut mieux savoir comment elle est posée.

## Comment un découpage est choisi

À chaque nœud, l'algorithme essaie **toutes** les variables et, pour chacune, tous les seuils possibles. Il garde la combinaison qui rend les deux groupes résultants les plus homogènes en cible. « Homogène » demande une mesure, et il y en a deux.

### L'impureté de Gini

Pour un nœud où la classe *k* représente une proportion `pₖ` :

```
Gini = 1 − Σ pₖ²
```

Elle vaut 0 pour un nœud pur (une seule classe) et 0,5 au maximum en binaire (moitié-moitié). Son interprétation est jolie : c'est la probabilité de se tromper si on étiquetait un individu du nœud au hasard, en tirant selon les proportions du nœud.

### L'entropie

```
entropie = − Σ pₖ log₂(pₖ)
```

Mêmes bornes, 0 pour un nœud pur et 1 bit au maximum en binaire. C'est la quantité d'information que vaut la réponse à « de quelle classe est cet individu ? », la grandeur du cours de théorie de l'information.

### Le gain, et la décision

Dans les deux cas, le critère retenu est la **réduction** d'impureté, pondérée par la taille des groupes :

```
gain = impureté(parent) − [ (n_g/n)·impureté(gauche) + (n_d/n)·impureté(droite) ]
```

Et l'arbre choisit le découpage de gain maximal. Ce choix est **glouton** : il prend le meilleur coup immédiat sans jamais considérer qu'un découpage médiocre maintenant ouvrirait un bien meilleur découpage ensuite.

Le XOR de la leçon précédente montre ce que ça coûte. Deux découpages bien placés — `x₁ > 0` puis `x₂ > 0` — le résolvent exactement, donc un arbre de profondeur 2 en est capable *en principe*. En pratique :

```
max_depth=1  →  test = 0,491      (le hasard)
max_depth=2  →  test = 0,593
max_depth=3  →  test = 0,998
```

À la racine, aucune des deux variables ne réduit l'impureté de façon significative : elle passe de 0,5000 à 0,4998 et 0,4879. L'arbre doit donc couper quelque part sans aucun signal pour le guider, il tombe à côté du seuil utile, et il lui faut **un niveau de plus que nécessaire** pour réparer ce mauvais premier coup. La gloutonnerie ne l'empêche pas de trouver la solution, elle la lui fait payer en profondeur — et en profondeur, c'est-à-dire en surapprentissage.

**Gini ou entropie ?** En pratique, les arbres obtenus sont presque identiques ; Gini est le défaut parce que le logarithme coûte plus cher à calculer. Ce n'est pas un hyperparamètre sur lequel passer du temps.

Pour une **régression**, le critère change de nature : on minimise la variance intra-nœud (ou l'erreur absolue), et la prédiction d'une feuille est la moyenne (ou la médiane) des cibles qu'elle contient.

## La conséquence la plus sous-estimée : un arbre ne peut pas extrapoler

Une feuille prédit une constante. Donc un arbre de régression prédit, hors de la plage vue à l'entraînement, **la valeur de la feuille la plus extrême** — indéfiniment.

Entraîné sur `y = 2x + 1` pour `x` entre 0 et 10 :

| x | vraie valeur | arbre | modèle linéaire |
|---|---|---|---|
| 9,5 | 20,0 | 20,0 | 20,0 |
| 10,0 | 21,0 | 21,0 | 21,0 |
| 12,0 | 25,0 | **21,0** | 25,0 |
| 20,0 | 41,0 | **21,0** | 41,0 |
| 100,0 | 201,0 | **21,0** | 201,0 |

À `x = 100`, l'arbre répond encore 21. Pas une erreur, pas un avertissement : une prédiction parfaitement sûre d'elle et complètement fausse.

**Et ça ne s'arrange pas avec une forêt ni avec XGBoost** : moyenner des constantes donne une constante. Toute la famille des arbres est aveugle hors de son domaine d'entraînement.

Les trois conséquences pratiques :

**Une tendance à la hausse est un piège.** Un chiffre d'affaires qui croît, une inflation, une audience qui monte : un arbre entraîné sur le passé plafonnera à la dernière valeur apprise. C'est la raison de fond pour laquelle le module Séries temporelles insiste sur la différenciation — on donne au modèle des variations, qui restent dans un domaine stable, plutôt que des niveaux, qui en sortent.

**Un modèle linéaire reste utile** là où il faut extrapoler, même quand le boosting gagne sur le domaine observé. Les deux ne font pas le même métier.

**Surveille les valeurs hors domaine en production.** Une variable qui sort de l'intervalle vu à l'entraînement n'empêche aucune prédiction, elle les rend juste silencieusement constantes. Comparer les min et max de production à ceux de l'entraînement est un contrôle à trois lignes qui attrape beaucoup de dérives.

## Le score OOB : une validation qui ne coûte rien

Chaque arbre d'une forêt est entraîné sur un tirage avec remise des lignes. Mécaniquement, environ **37 %** des lignes ne sont pas tirées pour un arbre donné — `(1 − 1/n)ⁿ → 1/e ≈ 0,368`. Ces lignes sont « hors du sac » (*out of bag*) pour cet arbre, qui ne les a jamais vues.

On peut donc, pour chaque ligne, la faire prédire par les seuls arbres qui ne l'ont pas vue, et obtenir une estimation honnête sans jamais mettre de données de côté :

```python
foret = RandomForestClassifier(500, oob_score=True, n_jobs=-1).fit(X_tr, y_tr)
print(foret.oob_score_)
```

```
score OOB = 0,9673      score test = 0,9474
```

Les deux sont du même ordre, l'OOB un peu optimiste ici. C'est utile pour une estimation rapide et gratuite pendant qu'on explore, surtout quand les données sont rares. Deux réserves : l'OOB ne vaut que pour les méthodes à bootstrap — il n'existe pas en boosting —, et il ne remplace pas un jeu de test, parce qu'il partage avec l'entraînement tout le reste du pipeline.

## Bagging et boosting ne visent pas la même cible

On résume souvent la différence à « parallèle contre séquentiel ». C'est vrai et ça n'explique pas le principal : **les deux attaquent des termes différents de la décomposition de l'erreur**, et c'est ce qui dicte leurs réglages.

| | Forêt aléatoire (bagging) | Boosting |
|---|---|---|
| Terme attaqué | la variance | le biais |
| Arbre de base souhaité | **fort** : profond, à faible biais | **faible** : peu profond, à fort biais |
| `max_depth` usuel | `None` ou 10 à 30 | 3 à 8 |
| Ordre | indépendants, parallélisables | séquentiels, non parallélisables |
| Plus d'arbres | ne dégrade jamais | peut dégrader |

L'asymétrie des profondeurs étonne au premier regard et se déduit directement de la ligne du haut. Moyenner des modèles ne réduit que leur variance, jamais leur biais : une forêt d'arbres peu profonds resterait biaisée quel qu'en soit le nombre, donc on lui donne des arbres profonds, dont la variance sera annulée par l'agrégation. Le boosting, à l'inverse, réduit le biais par accumulation de corrections : il a besoin de briques volontairement faibles, sinon le premier arbre épuise déjà tout le signal et les suivants n'apprennent que du bruit.

### Vérifié sur le même jeu

```
Forêt aléatoire                      Boosting (lr=0,3, profondeur 5)
    5 arbres   test = 0,9415             5 arbres   test = 0,9240
   25 arbres   test = 0,9415            25 arbres   test = 0,9474
  100 arbres   test = 0,9415           100 arbres   test = 0,9240
  500 arbres   test = 0,9474           500 arbres   test = 0,9240
 2000 arbres   test = 0,9474          2000 arbres   test = 0,9240
```

La forêt monte puis se stabilise. Le boosting atteint son meilleur score à 25 arbres, puis **perd deux points et demi** et ne les récupère jamais.

C'est la conséquence opérationnelle la plus importante du tableau : `n_estimators` n'est pas un hyperparamètre dans une forêt — c'est un budget de calcul, qu'on règle au plus grand nombre qu'on accepte de payer. En boosting, c'est un hyperparamètre critique, et c'est exactement le problème que l'arrêt anticipé résout, à la leçon suivante.

## Les probabilités d'une forêt sont des votes, pas des probabilités

`predict_proba` d'une forêt ne sort pas d'un modèle probabiliste. C'est la moyenne, sur tous les arbres, de la proportion de chaque classe dans la feuille où la ligne atterrit.

Deux conséquences.

**Les valeurs extrêmes sont rares.** Pour que la forêt annonce 1,00, il faut que les 500 arbres aboutissent dans des feuilles pures. Les probabilités d'une forêt sont donc tassées vers le centre, et un modèle qui ne dit jamais ni 0,02 ni 0,98 est difficile à utiliser pour trier des alertes.

**Le chiffre n'est pas une fréquence.** Quand une forêt annonce 0,70, il n'arrive pas 70 % du temps que l'événement se produise. Ce décalage porte un nom — la **calibration** — et c'est l'objet de la leçon sur l'évaluation. Retiens ici que la question se pose, et qu'elle se pose pour tous les modèles d'arbres.

Pour une prédiction de classe, ça n'a aucune importance : l'ordre est préservé, et l'ordre suffit. Dès qu'on exploite la valeur — un seuil de coût, un score transmis à un autre système, un affichage client —, il faut la vérifier.

## Ce que coûte un arbre

L'entraînement examine, à chaque nœud, chaque variable et chaque seuil candidat. Le coût est donc de l'ordre de `n·p·log n` pour un arbre équilibré, et il croît avec la cardinalité des variables continues — d'où l'astuce de XGBoost et LightGBM, qui regroupent les valeurs continues en quelques centaines de paliers avant de chercher les seuils, et gagnent un ordre de grandeur sans rien perdre.

La **prédiction**, en revanche, est quasi gratuite : descendre un arbre de profondeur 10, c'est dix comparaisons. Une forêt de 500 arbres en demande 5 000, ce qui reste négligeable. Les modèles d'arbres sont lourds à entraîner et très légers à servir, ce qui est exactement le bon profil pour la production.

## Au clavier

```python
import numpy as np
from sklearn.tree import DecisionTreeRegressor, export_text
from sklearn.linear_model import LinearRegression

# 1. Voir l'arbre refuser d'extrapoler
x = np.linspace(0, 10, 200).reshape(-1, 1)
y = 2 * x.ravel() + 1

arbre = DecisionTreeRegressor(max_depth=3).fit(x, y)
droite = LinearRegression().fit(x, y)

for v in [5, 10, 20, 100]:
    print(f"x={v:5}  vrai={2*v+1:6}  arbre={arbre.predict([[v]])[0]:7.2f}"
          f"  droite={droite.predict([[v]])[0]:7.2f}")

# 2. Lire les règles apprises, en clair
print(export_text(arbre, feature_names=["x"]))
```

Le `export_text` est le geste le plus pédagogique de scikit-learn : il imprime l'arbre en texte, seuil par seuil. Sur `max_depth=3` tu verras huit feuilles et huit constantes, la dernière à 19,79 — la moyenne du dernier huitième du domaine. C'est la valeur que l'arbre répondra pour `x = 20` comme pour `x = 100`.
