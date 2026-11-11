Un modèle qui marche dans un notebook n'a aucune valeur tant qu'il n'est pas utilisable de façon fiable. Sortir du notebook, ce n'est pas réécrire le même code dans un fichier `.py` : c'est transformer un résultat obtenu une fois en un artefact qu'une autre machine, un autre mois, peut recharger et servir sans que personne ne le surveille.

Cette leçon porte sur l'artefact lui-même : ce que contient réellement le fichier que vous enregistrez, ce qu'il ne contient pas, et les deux façons silencieuses dont il se trompe en production.

## Où vit le code quand il n'est plus dans un notebook

```
projet/
├── data/            # jamais versionné dans git (DVC)
├── notebooks/       # exploration uniquement
├── src/
│   ├── features.py  # transformations réutilisables
│   ├── train.py     # entraînement reproductible
│   └── predict.py   # inférence
├── tests/
└── configs/         # hyperparamètres en YAML
```

La règle qui donne sa forme à cette arborescence : `features.py` est importé par `train.py` **et** par `predict.py`. Dès que le calcul d'une variable existe en deux endroits — une cellule de notebook pour l'entraînement, un bout de code d'API pour le service — les deux versions divergent, et personne ne s'en aperçoit avant plusieurs semaines. C'est le décalage entraînement/service, le sujet de la dernière moitié de cette leçon.

## Un fichier de modèle n'est pas un fichier de données

Enregistrer un modèle scikit-learn produit un pickle. On croit volontiers qu'il contient des nombres — les coefficients, les seuils des arbres. Il contient d'abord des **instructions d'import**. Voici les quatre que porte le pickle d'une régression logistique à 4 variables, 737 octets :

```
sklearn.linear_model._logistic.LogisticRegression
numpy._core.multiarray._reconstruct
numpy.ndarray
ndarray.dtype
```

Charger ce fichier exécute ces imports, puis appelle ces constructeurs. Deux conséquences qui ne sont pas des détails.

**La première est une frontière de sécurité.** Un pickle est un programme. `pickle.load` sur un fichier d'origine inconnue, c'est exécuter du code arbitraire, avec les droits du processus qui le charge. Un modèle téléchargé depuis un dépôt public non signé est à traiter comme un exécutable téléchargé depuis un dépôt public non signé.

**La seconde est une frontière de version.** La version de scikit-learn qui a produit l'objet est inscrite dans l'état du pickle — pas sur l'objet vivant :

```python
hasattr(modele, "_sklearn_version")          # False
modele.__getstate__()["_sklearn_version"]    # '1.9.0'
```

En remplaçant dans les octets du fichier `1.9.0` par `1.0.2` — même longueur, le pickle reste valide — le rechargement donne :

```
InconsistentVersionWarning: Trying to unpickle estimator LogisticRegression
from version 1.0.2 when using version 1.9.0. This might lead to breaking
code or invalid results.
```

Puis le modèle prédit. `[1]`. Un **avertissement**, pas une erreur. Rien dans la bibliothèque n'empêche de servir un modèle construit par une version qui n'est plus celle qui le charge, et en production les avertissements vont dans un journal que personne ne lit. Si le format interne a changé entre les deux versions, les prédictions sont fausses et l'application fonctionne.

## Le format d'enregistrement, mesuré

Une forêt de 300 arbres entraînée sur 2 000 lignes × 10 colonnes, écrite et relue trois fois :

| format | taille | écriture | lecture |
|---|---|---|---|
| `pickle` brut | 6,80 Mo | 9 ms | 10 ms |
| `joblib`, sans compression | 6,82 Mo | 42 ms | 38 ms |
| `joblib`, `compress=3` | 1,52 Mo | 101 ms | 49 ms |
| `joblib`, `compress=9` | 1,33 Mo | 1 741 ms | 47 ms |

La compression 3 divise la taille par 4,5 pour 60 ms d'écriture supplémentaires. La compression 9 gagne encore 0,19 Mo et coûte **1,6 seconde** : à l'entraînement c'est gratuit, mais dans une boucle qui enregistre un modèle par pli de validation croisée, c'est le pli entier qui ralentit. La lecture, elle, ne dépend presque pas du niveau de compression — c'est la décompression plus le temps de reconstruire les objets, et le second domine.

Le temps de lecture suit la taille du modèle :

| arbres | taille | lecture |
|---|---|---|
| 50 | 1,13 Mo | 5 ms |
| 200 | 4,52 Mo | 28 ms |
| 800 | 18,19 Mo | 98 ms |

Ce chiffre n'intéresse personne à l'entraînement et décide tout en production. Un modèle de 98 ms de chargement placé dans un chemin de démarrage à froid — une fonction sans serveur, un conteneur qui redémarre, un processus qui recharge le modèle à chaque requête — ajoute ces 98 ms à la latence perçue, par requête ou par démarrage. Le chargement est une décision d'architecture, pas une ligne de code.

## Le modèle seul, c'est la moitié de l'artefact

Quatre colonnes aux échelles réelles d'un dossier de crédit :

| colonne | moyenne |
|---|---|
| `age` | 48,81 |
| `revenu_annuel` | 45 362,10 |
| `anciennete_mois` | 119,97 |
| `taux_endettement` | 0,28 |

Un `StandardScaler` ajusté sur l'entraînement, puis une régression logistique : **AUC 0,9614** sur le jeu de test. Maintenant le scénario le plus banal de la mise en production — le modèle est enregistré, le scaler est resté dans le notebook, et le code de service appelle `predict_proba` sur les colonnes brutes :

```
AUC : 0,5000     (perte de 0,4614)
```

Aucune exception. Le modèle attend 4 colonnes, il en reçoit 4, il répond. Voici ce qui s'est passé exactement, parce que le mécanisme compte plus que le chiffre : les écarts-types appris par le scaler valent 17,8893 / 24 768,0627 / 68,7688 / 0,1599. Les coefficients du modèle, appris sur données centrées-réduites, valent −1,62 / 2,52 / 3,15 / −1,71. Appliqués aux valeurs brutes, le logit va de **20 421,4 à 544 434,9**. La sigmoïde sature : les 1 200 probabilités du jeu de test valent toutes exactement 1,0, **une seule valeur distincte**, et l'AUC tombe à 0,5 par égalité — pas par hasard, par écrasement.

Le pickle du modèle fait 737 octets, celui du scaler 658. Deux artefacts, presque la même taille. Enregistrer le premier sans le second, c'est enregistrer la moitié du modèle.

La réponse tient en une ligne : le prétraitement entre dans l'objet servi.

```python
from sklearn.pipeline import Pipeline

pipe = Pipeline([("echelle", StandardScaler()),
                 ("modele", LogisticRegression(max_iter=2000))])
pipe.fit(X_train, y_train)          # AUC 0,9614, identique
```

Un seul fichier, 1 350 octets, et `pipe.feature_names_in_` porte les noms des colonnes. Le prétraitement ne peut plus être oublié parce qu'il n'est plus un objet séparé qu'on pourrait oublier.

### Un résultat négatif qui mérite d'être dit

J'ai mesuré au passage la faute inverse, celle qu'on enseigne partout : ajuster le scaler sur **toutes** les données avant de découper train/test, ce qui laisse fuiter les statistiques du test vers l'entraînement. Sur ces 4 000 lignes :

| scaler ajusté sur | AUC |
|---|---|
| l'entraînement seul | 0,9614 |
| toutes les données | 0,9614 |

Écart : **−0,0000**. Les moyennes apprises diffèrent à la quatrième décimale (48,9975 contre 48,8092 pour l'âge ; 45 358,73 contre 45 362,10 pour le revenu). Avec 4 000 lignes tirées d'une même distribution, un `StandardScaler` ajusté sur tout n'apprend rien que l'entraînement ne lui apprenait déjà.

La faute reste une faute — elle casse la garantie que le score de test est une estimation honnête — mais son coût mesuré ici est nul, et prétendre le contraire serait inventer. Les fuites qui coûtent vraiment des points sont ailleurs : un encodage de cible calculé avant le découpage, une imputation de valeurs manquantes qui utilise la cible, un rééquilibrage appliqué avant la séparation, une série temporelle découpée au hasard au lieu de l'être par date. Celles-là transportent de l'information sur `y`, pas une moyenne de `x`.

## Le contrat des colonnes

Le second décalage entraînement/service est plus vicieux, parce qu'il ne vient pas d'un oubli mais d'un format. Un modèle entraîné sur un `DataFrame` de cinq colonnes, exactitude **0,9183** :

```python
modele.feature_names_in_
# ['age', 'revenu', 'anciennete', 'score', 'nb_contrats']
```

Trois façons de l'appeler en production, trois comportements :

| appel | résultat |
|---|---|
| `DataFrame`, colonnes mélangées | `ValueError: The feature names should match those that were passed during fit.` |
| `DataFrame`, une colonne manquante | `ValueError` identique |
| **tableau numpy**, mêmes valeurs mélangées | **exactitude 0,6717**, aucune erreur |

`0,9183` contre `0,6717` : **24,7 points d'exactitude** perdus, sans une ligne dans les journaux. La différence entre les deux premiers cas et le troisième n'est pas la validité des données, c'est la présence des noms. `feature_names_in_` n'existe que si le modèle a été ajusté sur un objet qui portait des noms, et la vérification n'a lieu que si l'appel en porte aussi. Un `.to_numpy()`, un `.values`, un `json` reconstruit en liste dans un gestionnaire de requêtes, et le garde-fou disparaît.

D'où la règle : **le contrat voyage avec le modèle**, et on valide avant de prédire.

```python
contrat = {
    "sklearn": sklearn.__version__,
    "colonnes": list(modele.feature_names_in_),
    "bornes": {c: [float(X_train[c].min()), float(X_train[c].max())]
               for c in X_train.columns},
}
joblib.dump({"modele": modele, "contrat": contrat}, "paquet.joblib")


def valider(df, contrat):
    """Refuse avant de prédire, au lieu de prédire faux."""
    manquantes = set(contrat["colonnes"]) - set(df.columns)
    if manquantes:
        raise ValueError("colonnes manquantes : %s" % sorted(manquantes))
    return df[contrat["colonnes"]]       # l'ordre est rétabli, pas supposé
```

Le paquet complet fait 1 499 octets. Après validation, l'ordre est rétabli et l'exactitude revient à **0,9183**. Le `df[contrat["colonnes"]]` est la ligne importante : elle ne vérifie pas l'ordre, elle l'impose. Un appelant peut envoyer ses colonnes dans n'importe quel ordre, le modèle les recevra dans le sien.

Les bornes servent à un second niveau de refus. Sur ce jeu de test, une colonne sur cinq descend sous son minimum d'entraînement — ce qui est normal pour un échantillon tiré de la même loi, et devient un signal quand c'est le revenu qui passe d'un coup sous le minimum de tout l'historique. Le seuil à partir duquel on refuse plutôt qu'on prédit relève du métier, pas de la bibliothèque.

## Ce que l'artefact n'enregistrera jamais

Le pickle contient l'objet. Il ne contient ni les données qui l'ont produit, ni le code qui a calculé ses variables, ni la version de Python, ni les versions de ses dépendances autres que celle inscrite par scikit-learn. Trois choses doivent donc voyager à côté, et c'est le minimum sous lequel « on recharge le modèle » cesse d'être vrai :

| à côté du modèle | pourquoi |
|---|---|
| `requirements.txt` aux versions épinglées | sans lui, `InconsistentVersionWarning` et format interne changé |
| le contrat de colonnes | sans lui, un tableau numpy mélangé prédit faux en silence |
| l'identifiant de l'exécution d'entraînement | sans lui, aucune réponse à « quel modèle sert en ce moment » |

## Au clavier

1. Enregistrer un `Pipeline`, jamais un modèle nu. Si le prétraitement est un objet séparé, il sera oublié un jour, et la perte sera de l'ordre de 0,46 d'AUC — pas de 0,01.
2. Mesurer le temps de chargement de l'artefact avant de choisir où il vit. 98 ms sur un modèle de 18 Mo décident entre un processus persistant et une fonction sans serveur.
3. Valider les colonnes par un contrat enregistré et les réordonner explicitement. Un modèle qui refuse une entrée invalide est un modèle correct ; un modèle qui prédit sur un tableau mélangé perd 24,7 points sans rien signaler.
