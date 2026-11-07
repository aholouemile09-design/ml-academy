Créer des variables et en sélectionner sont deux moitiés du même geste : on ajoute pour donner au modèle ce qu'il ne peut pas déduire seul, on retire pour qu'il ne se noie pas. Cette leçon porte surtout sur la seconde moitié, parce que c'est celle où les erreurs sont invisibles.

## Les trois familles de sélection

### Le filtre : rapide, et aveugle aux combinaisons

Un filtre note chaque variable **séparément** contre la cible — corrélation, test F, information mutuelle — et garde les meilleures.

```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif
SelectKBest(mutual_info_classif, k=20)
```

C'est quasi instantané et indépendant du modèle. Mais la nature univariée du score produit deux défauts systématiques :

**Il manque les variables utiles seulement en combinaison.** Le cas d'école est le ou-exclusif : deux variables binaires dont la cible est « exactement l'une des deux ». Chacune prise seule a une corrélation nulle avec la cible — leur score est au plancher, le filtre les élimine toutes les deux —, et ensemble elles la déterminent parfaitement. Ce n'est pas un cas de laboratoire : « acheté ET pas encore livré », « connecté MAIS inactif » sont des conjonctions de ce type.

**Il garde les redondances.** Deux variables quasi identiques obtiennent deux bons scores et sont toutes les deux conservées. Le filtre ne regarde jamais les variables entre elles, donc il ne peut pas savoir qu'il garde deux fois la même information.

### L'enveloppe : coûteuse, et piégeuse

Une méthode d'enveloppe entraîne réellement le modèle sur des sous-ensembles et compare. `RFECV` retire la variable la moins utile, réentraîne, recommence.

```python
from sklearn.feature_selection import RFECV
RFECV(estimateur, cv=5, scoring="roc_auc", n_jobs=-1)
```

Elle voit donc les combinaisons et les redondances, ce que le filtre ne peut pas. Son prix est direct : avec 200 variables et une validation croisée à 5 plis, c'est de l'ordre de mille ajustements de modèle. Et surtout, elle **utilise la cible de façon répétée**, ce qui en fait la méthode la plus exposée à la fuite décrite juste après.

### L'intégrée : gratuite, parce qu'elle vient avec l'entraînement

Certains modèles sélectionnent en apprenant. Le **Lasso** (pénalité L1) met des coefficients exactement à zéro — tu as vu au cours d'algèbre linéaire que c'est la propriété qui distingue L1 de L2. Les arbres produisent des importances. Dans les deux cas la sélection ne coûte rien de plus que l'ajustement.

```python
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LassoCV
SelectFromModel(LassoCV(cv=5))
```

C'est le meilleur rapport qualité-prix pour commencer, et c'est ce qu'on fait par défaut.

## La fuite de sélection, et sa démonstration

Voici l'erreur la plus grave de la leçon, et elle a produit de vrais articles scientifiques faux.

Le geste coupable : sélectionner les variables sur **l'ensemble** des données, puis valider par validation croisée sur les variables retenues. Ça paraît innocent — la sélection n'est « que » du prétraitement.

Sauf que la sélection a regardé la cible. Elle a donc choisi les variables qui corrèlent le mieux avec la cible **y compris sur les lignes qui serviront de validation**. Quand la validation croisée arrive, ces lignes ne sont plus neuves : leur cible a déjà servi à décider quelles colonnes existent.

**La démonstration, sur des données qui ne contiennent rien.** Cinq cents variables de bruit pur, cent lignes, une cible tirée au hasard. Il n'y a, par construction, **aucun signal** : le score honnête est 0,500.

```python
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(0)
X = rng.normal(size=(100, 500))        # que du bruit
y = rng.integers(0, 2, 100)            # cible aleatoire

# Version coupable : selection sur tout, PUIS validation croisee
sel = SelectKBest(f_classif, k=10).fit(X, y)
cross_val_score(LogisticRegression(), sel.transform(X), y, cv=5).mean()

# Version correcte : la selection est une etape du pipeline
pipe = Pipeline([("sel", SelectKBest(f_classif, k=10)),
                 ("m",   LogisticRegression())])
cross_val_score(pipe, X, y, cv=5).mean()
```

```
sélection avant la CV  : 0,700
sélection dans la CV   : 0,500
vérité                 : 0,500
```

**Vingt points de performance sortis de nulle part.** Sur des données où il n'y a rien à trouver. Avec cinq cents candidates et cent lignes, dix d'entre elles corrèlent forcément avec la cible par pur hasard — c'est le problème des comparaisons multiples du cours sur les tests, appliqué à la sélection de variables.

Le remède est structurel, et il est le même que pour le scaling : **la sélection est une étape du pipeline**, jamais un prétraitement fait à côté. Et le ratio qui doit déclencher la méfiance est le nombre de variables candidates rapporté au nombre de lignes. Beaucoup de colonnes et peu de lignes, c'est la configuration où la sélection invente du signal.

## Les variables corrélées rendent la sélection instable

Deux variables quasi jumelles, un Lasso : il en met une à zéro et garde l'autre. **Laquelle ? À peu près au hasard.** Change la graine aléatoire, change les plis de la validation croisée, ajoute cinquante lignes — et c'est l'autre qui survit.

Conséquence qu'on tire rarement : une liste de variables sélectionnées **n'est pas un classement d'importance**. « Le modèle a retenu l'ancienneté et pas le nombre de commandes » ne veut pas dire que l'ancienneté compte plus ; ça peut vouloir dire que les deux disaient la même chose et que le tirage a tranché.

Le test qui le révèle en trois lignes : relance la sélection avec cinq graines différentes et compare les listes. Si elles diffèrent beaucoup, tu as des variables redondantes, et aucune interprétation individuelle n'est permise. Pour une sélection stable, il faut soit regrouper les jumelles au préalable, soit utiliser une sélection par **stabilité** — répéter sur des sous-échantillons et garder ce qui revient souvent.

## Multicolinéarité : ce qu'elle casse, et ce qu'elle ne casse pas

Le **VIF** (facteur d'inflation de la variance) mesure à quel point une variable est prédictible par les autres. Au-delà de 10, elle est largement redondante.

Mais la distinction qui compte, et qu'on ne fait presque jamais : **la multicolinéarité détruit l'interprétation des coefficients, pas la qualité des prédictions.** Avec deux variables jumelles, le modèle peut attribuer `+50` à l'une et `−48` à l'autre, ou l'inverse, ou les répartir à parts égales — toutes ces combinaisons prédisent aussi bien, parce que seule leur somme compte. Les coefficients deviennent instables et illisibles, le pouvoir prédictif ne bouge pas.

Donc : si l'objectif est de prédire, la colinéarité est un problème mineur, que la régularisation absorbe. Si l'objectif est d'**expliquer** — dire quelle variable agit et dans quel sens, justifier un refus de crédit —, c'est rédhibitoire et il faut la traiter.

C'est la même chose, vue du côté pratique, que la matrice singulière du cours d'algèbre linéaire : rang insuffisant, infinité de solutions équivalentes, aucune raison d'en préférer une.

## Le piège combinatoire des variables polynomiales

`PolynomialFeatures` est séduisant : il fabrique automatiquement tous les carrés et tous les produits croisés. Les nombres refroidissent vite.

```
degré 2,  10 variables  ->      65 colonnes
degré 2,  50 variables  ->   1 325 colonnes
degré 3,  10 variables  ->     285 colonnes
degré 3,  50 variables  ->  23 425 colonnes
```

Vingt-trois mille colonnes à partir de cinquante. Sur dix mille lignes, il y a alors deux fois plus de variables que d'observations : le modèle peut mémoriser parfaitement et ne généralise plus du tout. C'est le fléau de la dimension du cours sur la SVD, atteint volontairement en une ligne de code.

Deux usages raisonnables : `interaction_only=True`, qui retire les puissances et ne garde que les produits croisés, et surtout une application **ciblée** à trois ou quatre variables dont tu soupçonnes une interaction, pas à tout le tableau.

## Les agrégations glissantes et la fuite temporelle

Celle-ci est dans la plupart des notebooks de production, et elle est très facile à ne pas voir.

```python
# FAUX : la fenetre inclut la ligne courante
df["ventes_7j"] = df.groupby("id")["ventes"].transform(lambda s: s.rolling(7).sum())
```

À la ligne du 10 janvier, `rolling(7).sum()` additionne du 4 au **10** janvier inclus. La variable contient donc la valeur du jour qu'on cherche à prédire. Le modèle apprend à lire sa propre cible dans une variable qui porte un nom innocent.

```python
# JUSTE : on decale d'un cran, la fenetre s'arrete la veille
df["ventes_7j"] = (df.groupby("id")["ventes"]
                     .transform(lambda s: s.shift(1).rolling(7).sum()))
```

Le `shift(1)` arrive **avant** le `rolling`, et c'est tout l'enjeu : la fenêtre couvre alors du 3 au 9 janvier, c'est-à-dire exactement ce qu'on connaissait la veille au soir.

La règle générale pour toute variable construite sur le temps : **écris la date de calcul**. « Somme des sept jours précédant la date de prédiction » est non ambigu ; « somme sur sept jours » ne l'est pas, et l'ambiguïté se résout toujours dans le sens de la fuite.

Et le même raisonnement s'applique aux agrégats par groupe. Une moyenne par client calculée sur tout l'historique, appliquée à une ligne du passé, contient du futur.

## Le décalage entraînement-service

Une variable n'existe pas seulement dans le notebook : elle devra être **recalculée à l'identique** au moment de servir une prédiction. Et c'est là que les projets échouent après avoir réussi.

Le cas typique : à l'entraînement, « nombre de commandes des 30 derniers jours » est calculé en SQL sur l'entrepôt de données, avec une définition du mois civil. En production, c'est du Python qui interroge l'API transactionnelle, avec une fenêtre glissante et un fuseau horaire différent. Les deux variables portent le même nom et ne contiennent pas la même chose. Le modèle reçoit des valeurs décalées et se dégrade sans qu'aucune alerte ne se déclenche.

Deux garde-fous praticables tout de suite :

**Le pipeline est le livrable, pas le modèle.** Un `Pipeline` scikit-learn sérialisé contient les transformations *et* le modèle. Servir le pipeline garantit que les mêmes opérations s'appliquent, avec les mêmes paramètres appris.

**Pour tout ce que le pipeline ne couvre pas** — les agrégats calculés en amont, en SQL —, écris le calcul **une seule fois**, dans une fonction ou une requête partagée entre l'entraînement et le service. Deux implémentations du même concept divergeront, c'est une question de temps.

## Combien de variables garder

Il n'y a pas de nombre, mais il y a un rapport : le nombre de variables par rapport au nombre de lignes. Quelques centaines de lignes pour cinquante variables est déjà inconfortable ; cent mille lignes pour cinquante variables est très confortable.

Et un fait à garder en tête, qui explique pourquoi la sélection est nécessaire : **ajouter une variable, même du bruit pur, ne peut jamais dégrader le score d'entraînement.** Le modèle a toujours la possibilité de lui donner un poids nul, et s'il trouve la moindre corrélation fortuite il l'exploitera. Toute l'amélioration apparente d'un ajout de variables doit donc se mesurer en validation, jamais en entraînement — et un écart qui se creuse entre les deux est le signe qu'on a ajouté du bruit.

## Au clavier

```python
from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LassoCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ("prep",  prep),                                  # imputation, scaling, encodage
    ("tri",   SelectFromModel(LassoCV(cv=5))),        # la selection est DANS le pipeline
    ("model", RandomForestRegressor(n_estimators=300, random_state=0)),
])

print(cross_val_score(pipe, X, y, cv=5, scoring="r2").mean().round(4))
```

Trois réflexes :

1. **La sélection de variables est une étape du pipeline.** Jamais un prétraitement fait à côté. Cinq cents colonnes de bruit pur et cent lignes suffisent à fabriquer vingt points de performance imaginaire.
2. **Sur toute variable construite sur le temps, écris la date de calcul.** « Les sept jours précédant la prédiction », pas « sur sept jours ». Le `shift(1)` avant le `rolling` n'est pas une précaution, c'est la définition.
3. **Relance ta sélection avec trois graines différentes.** Si la liste change, tu as des variables redondantes et tu n'as pas le droit d'interpréter laquelle compte.
