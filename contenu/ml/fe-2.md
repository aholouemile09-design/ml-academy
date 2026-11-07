« Il faut mettre les variables à la même échelle » est vrai, et c'est une réponse de perroquet tant qu'on ne sait pas **pourquoi**. Il y a trois raisons distinctes, elles ne concernent pas les mêmes modèles, et deux d'entre elles ne sont presque jamais expliquées.

## Pourquoi l'échelle compte, trois raisons distinctes

### La descente de gradient travaille dans une vallée allongée

Reprends ce que tu sais de la descente de gradient. Le pas est le même dans toutes les directions : `θ ← θ − α ∇L(θ)`, avec un seul α.

Maintenant imagine deux variables, un âge de 20 à 80 et un revenu de 20 000 à 90 000. Le coût est très sensible au poids de l'âge — bouger ce poids de 0,1 change la prédiction de quelques unités — et très peu sensible à celui du revenu, où il faut bouger de 0,000001 pour un effet comparable.

La surface de coût n'est plus une cuvette ronde mais un **ravin allongé**. Et un α unique ne peut pas convenir aux deux directions : assez grand pour avancer le long du ravin, il fait osciller en travers ; assez petit pour ne pas osciller, il n'avance plus. C'est la cause la plus fréquente d'un entraînement qui zigzague interminablement.

Centrer et réduire rend la cuvette ronde. Un seul α convient alors à toutes les directions, et la convergence est spectaculairement plus rapide — un facteur dix n'est pas rare, sans changer une ligne du modèle.

### Les distances : la plus grosse unité gagne, toujours

Un k plus proches voisins calcule `√(Σ(xᵢ − yᵢ)²)`. Avec un âge et un revenu non normalisés :

```
écart d'âge de 40 ans      →  contribue 40²     = 1 600
écart de revenu de 10 000  →  contribue 10 000² = 100 000 000
```

L'âge pèse pour deux cent-millièmes de la distance. Il est **présent dans le calcul et absent du résultat**. Le modèle n'utilise qu'une variable sur deux, sans que rien ne le signale.

Ça vaut pour tout ce qui mesure une proximité : kNN, k-moyennes, SVM à noyau, DBSCAN, recherche par similarité. Et pour la PCA, qui cherche la variance maximale et retrouve donc la variable à la plus grande unité, comme tu l'as vu au cours sur la SVD.

### La régularisation devient injuste

Celle-là est la moins connue, et elle mord sur des modèles qu'on croit à l'abri.

Ridge et Lasso pénalisent la **taille des coefficients** : `Σwᵢ²` ou `Σ|wᵢ|`. Or la taille d'un coefficient dépend de l'unité de sa variable. Exprime un revenu en euros, son coefficient est minuscule ; exprime-le en milliers d'euros, il est mille fois plus grand — pour un modèle identique.

La pénalité frappe donc d'autant plus fort que l'unité est petite. Sans normalisation, **c'est le choix des unités qui décide quelles variables seront écrasées**, pas leur utilité. Un Lasso non normalisé ne sélectionne pas les variables informatives, il sélectionne celles qui ont une grande unité.

Conséquence : **normaliser n'est pas optionnel avec une régression régularisée.** C'est une condition de validité, pas une optimisation.

## Pourquoi les arbres s'en moquent, et ce que ça implique

Un arbre ne fait que comparer : « cette valeur dépasse-t-elle ce seuil ? ». Multiplier la variable par mille déplace le seuil et change exactement rien à la partition obtenue. Les arbres, les forêts, XGBoost, LightGBM sont **invariants à toute transformation monotone croissante**.

Le corollaire est plus utile que la règle, et on l'oublie : si une transformation est monotone, elle est **sans effet** sur un arbre. Donc sur un modèle à base d'arbres :

- `StandardScaler` ne sert à rien
- `MinMaxScaler` ne sert à rien
- `np.log1p` sur une variable très asymétrique **ne sert à rien non plus**

Ce dernier point surprend, parce qu'on passe beaucoup de temps à « corriger l'asymétrie » avant un gradient boosting. C'est du travail perdu : le log préserve l'ordre, donc l'arbre voit exactement les mêmes découpes possibles. Ce qui aide un arbre, ce sont des transformations **non monotones** — un ratio, une différence, une combinaison — pas un changement d'échelle.

## Standardiser n'est pas normaliser

Confusion de vocabulaire qui cache une confusion de fond.

`StandardScaler` soustrait la moyenne et divise par l'écart-type. C'est une transformation **affine** : elle déplace et dilate, elle ne change **pas la forme** de la distribution. Une variable fortement asymétrique reste exactement aussi asymétrique après standardisation ; ses valeurs extrêmes restent exactement aussi extrêmes en nombre d'écarts-types.

« Mes données sont standardisées, donc elles sont normales » est faux, et c'est une croyance répandue. Rien dans `StandardScaler` ne rapproche d'une gaussienne.

Les transformations qui changent réellement la forme sont ailleurs :

- **`PowerTransformer`** — Box-Cox si tout est strictement positif, **Yeo-Johnson** sinon, qui accepte zéro et les négatifs. Il cherche l'exposant qui rend la distribution la plus symétrique possible, et c'est le bon outil quand un modèle linéaire suppose des résidus gaussiens.
- **`QuantileTransformer`** — remplace chaque valeur par son rang relatif, puis le projette sur la loi voulue. Il force la distribution de sortie, donc il marche toujours. Son prix est lourd : il **écrase les écarts**. Deux valeurs très éloignées mais voisines en rang se retrouvent côte à côte, et l'information d'amplitude disparaît. À réserver aux cas où la forme bloque vraiment.

## Transformer la cible, et le piège du retour

En régression sur une cible à queue lourde — un prix, un revenu, une durée —, passer la cible en logarithme est souvent décisif. Mais ce n'est pas un changement d'échelle : **ça change ce que le modèle optimise**.

Minimiser l'erreur quadratique sur `log(y)` revient à minimiser l'erreur **relative** sur `y`. Se tromper de 10 000 € sur une maison à 100 000 € coûte alors autant que se tromper de 100 000 € sur une maison à un million. C'est souvent exactement ce qu'on veut — et il faut le décider, pas le subir.

**Et le retour n'est pas symétrique.** Le modèle prédit une moyenne dans l'espace logarithmique ; `expm1` de cette moyenne n'est **pas** la moyenne dans l'espace d'origine. Mesuré sur une loi gamma d'espérance 1 000 :

```
moyenne réelle de y          : 1 000
expm1(moyenne de log1p(y))   :   764      -> 24 % trop bas
```

L'exponentielle étant convexe, le retour sous-estime **systématiquement**. Un modèle de prix entraîné sur le log et ramené naïvement par `expm1` sous-facture de vingt pour cent, de façon invisible dans la métrique calculée en espace log.

Deux issues : corriger le biais de retour (le terme classique est `exp(σ²/2)`, avec σ² la variance des résidus en espace log), ou mesurer la performance **dans l'espace d'origine** après retour, ce qui rend le problème visible immédiatement. La seconde est plus simple et suffit presque toujours.

## Imputer, c'est modéliser

Une imputation n'est pas un remplissage, c'est une **prédiction** de la valeur manquante. Vue sous cet angle, la hiérarchie des outils devient évidente :

- **`SimpleImputer(strategy="median")`** est le modèle le plus bête possible : il prédit la même valeur pour tout le monde, en ignorant toutes les autres colonnes. C'est souvent suffisant, et c'est honnête — personne ne se méprend sur ce qu'il fait.
- **`KNNImputer`** prédit à partir des k lignes les plus ressemblantes. C'est un vrai modèle, donc il faut le normaliser avant (il calcule des distances, voir plus haut) et il coûte cher : la recherche de voisins est quadratique en nombre de lignes.
- **`IterativeImputer`** (la méthode MICE) modélise chaque colonne en fonction de toutes les autres, et itère. C'est le plus précis et le plus lent : sur 100 colonnes avec 10 itérations, ça fait **mille ajustements de modèle**.

Et puisque ce sont des modèles, ils ont les défauts des modèles : ils peuvent **surapprendre**, et ils doivent impérativement vivre à l'intérieur du pipeline, sinon ils apprennent sur des données qu'ils ne devraient pas voir.

## Ce que l'imputation casse, en chiffres

Remplacer les trous par la moyenne a un coût mesurable, et il est plus grand qu'on ne l'imagine. Sur 10 000 valeurs tirées d'une loi d'écart-type 10, avec 30 % de trous :

```
écart-type des valeurs observées   : 9,99
écart-type après imputation moyenne : 8,36      -> 16 % de dispersion perdue
```

Ce n'est pas un accident de tirage : l'écart-type est multiplié par environ `√(1 − p)`, où `p` est la proportion de trous. À 30 %, `√0,7 = 0,837`. Trois mille valeurs placées exactement au centre resserrent mécaniquement la distribution.

Et les corrélations sont touchées aussi. Deux variables de corrélation réelle 0,80, avec 30 % de trous sur l'une :

```
corrélation vraie                  : 0,798
après imputation par la moyenne    : 0,676
```

Un cinquième de la relation a disparu. Un modèle linéaire entraîné là-dessus sous-estime l'effet de la variable, et la conclusion « cette variable compte peu » est un artefact de l'imputation, pas un fait.

La leçon n'est pas « ne jamais imputer » — il faut bien remplir les trous. C'est que **l'imputation est un choix qui déforme, et que le taux de manquants décide de sa gravité**. En dessous de 5 %, la médiane ne pose aucun problème. Au-delà de 30 % sur une variable importante, il faut soit un imputeur modélisant, soit renoncer à la colonne, soit un modèle qui gère nativement les trous — XGBoost et LightGBM le font, et c'est un argument qu'on oublie en leur faveur.

## L'ordre des étapes n'est pas interchangeable

```python
Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler",  StandardScaler()),
])
```

Dans cet ordre, et pas l'inverse. `StandardScaler` calcule une moyenne et un écart-type : appliqué avant l'imputation, il les calcule sur les valeurs présentes, puis l'imputeur ajoute des valeurs qui décalent cette moyenne. Les données finales ne sont alors ni centrées ni réduites, et le scaler a travaillé pour rien.

Même logique pour l'encodage : les catégorielles s'imputent (par la modalité la plus fréquente, ou par une modalité « inconnu » explicite, souvent meilleure) **avant** d'être encodées. Un `NaN` qui arrive dans un `OneHotEncoder` lève une erreur ou crée une colonne fantôme selon la version.

## Les bornes de winsorisation sont des paramètres appris

La winsorisation — ramener les valeurs extrêmes aux centiles 1 et 99 — paraît inoffensive, et elle cache deux pièges.

**Les bornes s'apprennent sur le train.** Ce sont des quantiles, donc des paramètres estimés, exactement comme une moyenne de scaler. Les calculer sur l'ensemble des données est une fuite de même nature que celle d'un `fit` mal placé.

**Et elles créent un plafond dur.** En production, une valeur supérieure à la borne apprise sera ramenée à cette borne, quelle que soit son ampleur. Un revenu de dix millions et un revenu de deux cents mille deviennent le même nombre. Pour une détection de fraude ou d'anomalie, c'est exactement l'information qu'on vient de détruire.

```python
df["revenu_log"] = np.log1p(df["revenu"])
```

Quant à `log1p`, il calcule `log(1 + x)` et accepte donc le zéro — mais **pas les négatifs**. Sur une variable qui peut descendre sous zéro (un solde, une variation, un écart), il produit des `NaN` en silence. C'est là que Yeo-Johnson, qui accepte tout le domaine réel, est la bonne réponse.

## Faut-il normaliser les colonnes one-hot ?

Question qui revient toujours, et la réponse dépend du modèle — comme pour l'encodage.

**Pour un arbre** : non, et c'est sans effet de toute façon.

**Pour un modèle linéaire non régularisé** : sans importance, une colonne 0/1 est déjà sur une petite échelle.

**Pour un modèle régularisé** : oui, par cohérence. Si les variables continues sont réduites à un écart-type de 1 et que les indicatrices restent en 0/1 — dont l'écart-type vaut `√(p(1−p))`, souvent autour de 0,3 —, la pénalité ne frappe pas les deux familles de la même façon. C'est la même injustice que celle décrite plus haut, à l'intérieur du même modèle.

**Pour un réseau de neurones** : oui, pour la raison de la vallée allongée.

## Au clavier

```python
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

numeriques = ["age", "revenu", "anciennete"]
categorielles = ["ville", "contrat"]

prep = ColumnTransformer([
    ("num", Pipeline([                       # imputer AVANT scaler
        ("imp", SimpleImputer(strategy="median")),
        ("sca", StandardScaler()),
    ]), numeriques),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="constant", fill_value="inconnu")),
        ("enc", OneHotEncoder(handle_unknown="ignore")),
    ]), categorielles),
])
```

Trois réflexes :

1. **Demande-toi laquelle des trois raisons s'applique** avant de normaliser. Gradient, distance, régularisation. Si aucune ne s'applique — un modèle à base d'arbres —, tu peux t'en passer, et aussi te passer du `log1p`.
2. **Mesure la performance dans l'espace d'origine** dès que tu transformes la cible. Une métrique calculée en espace logarithmique cache un biais de retour de vingt pour cent.
3. **Regarde le taux de manquants avant de choisir l'imputeur.** Sous 5 %, la médiane suffit. Au-dessus de 30 %, l'imputation déforme la variable au point de rendre ses corrélations trompeuses.
