Pandas ajoute à NumPy les deux choses qui lui manquent : des **étiquettes** et des **types hétérogènes**. Un `DataFrame` est un dictionnaire ordonné de colonnes, chacune étant une `Series` — un tableau NumPy muni d'un index et d'un nom.

```python
import pandas as pd

df = pd.read_csv("ventes.csv")
df.shape          # (lignes, colonnes)
df.dtypes         # le type de chaque colonne
df.head(3)
```

Cette leçon traite ce qui se passe *avant* l'analyse : charger, comprendre, nettoyer, joindre. C'est 80 % du temps réel d'un projet, et à peu près 0 % de ce qu'on montre dans les tutoriels.

## L'index est un objet, pas une décoration

Chaque `Series` et chaque `DataFrame` porte un index : les étiquettes de ses lignes. Par défaut ce sont les entiers 0, 1, 2… mais c'est un objet à part entière, et Pandas s'en sert **pour aligner les opérations**.

```python
a = pd.Series([1, 2, 3], index=["x", "y", "z"])
b = pd.Series([10, 20, 30], index=["z", "y", "x"])
a + b     # x: 31, y: 22, z: 13
```

L'addition n'a pas additionné les positions, elle a additionné les **étiquettes**. C'est le comportement le plus déroutant de Pandas quand on arrive de NumPy, et le plus utile une fois compris : il rend impossible d'additionner par erreur deux séries rangées différemment. Le revers est que deux index disjoints produisent des `NaN` partout plutôt qu'une erreur.

Trois conséquences pratiques :

**Filtrer garde les étiquettes d'origine.** Après `df[df["prix"] > 100]`, l'index saute : 0, 3, 7, 11. Ce n'est pas un défaut — c'est ce qui te permet de retrouver la ligne dans le fichier source. Mais si tu veux une numérotation continue, demande-la : `df_filtre.reset_index(drop=True)`. Sans `drop=True`, l'ancien index devient une colonne, ce qui est parfois exactement ce qu'on veut et le plus souvent une surprise.

**`set_index` fait d'une colonne l'index**, ce qui rend la recherche par cette clé immédiate et les jointures plus simples.

**Un index dupliqué est légal** et transforme la moindre sélection en source de bugs. `df.index.is_unique` est la vérification à faire après un `concat`.

## Sélectionner : trois notations qui ne font pas la même chose

| Écriture | Sélectionne | Rend |
| --- | --- | --- |
| `df["prix"]` | une colonne par son nom | une `Series` |
| `df[["prix", "cout"]]` | plusieurs colonnes | un `DataFrame` |
| `df[df["prix"] > 100]` | des lignes par masque booléen | un `DataFrame` |
| `df.loc[ligne, colonne]` | par **étiquette** | selon le découpage |
| `df.iloc[i, j]` | par **position** | selon le découpage |

Les crochets simples sont ambigus par construction : ils sélectionnent des colonnes, sauf quand on leur donne un booléen, où ils sélectionnent des lignes. C'est hérité et commode. Dès que la sélection croise lignes et colonnes, `.loc` est la seule forme lisible :

```python
df.loc[df["region"] == "Nord", "ventes"]           # lecture
df.loc[df["region"] == "Nord", "ventes"] = 0       # écriture
df.loc[:, ["region", "ventes"]]                    # toutes les lignes, deux colonnes
df.iloc[0:5, 0:2]                                   # les 5 premières lignes, 2 colonnes
```

Et un détail qui mord : **`.loc` inclut la borne de fin, `.iloc` l'exclut.** `df.loc[2:5]` rend quatre lignes (2, 3, 4, 5), `df.iloc[2:5]` en rend trois. C'est la seule exception à la convention « borne de fin exclue » de tout Python, et elle se justifie : avec des étiquettes qui ne sont pas des nombres, `df.loc["janvier":"mars"]` sans mars n'aurait aucun sens.

### Pourquoi ne jamais chaîner les crochets

```python
df[df["age"] > 60]["tension"] = 140        # ne fait rien d'utile
df.loc[df["age"] > 60, "tension"] = 140    # la forme correcte
```

La première ligne sélectionne un sous-ensemble — qui peut être une copie temporaire —, écrit dedans, puis jette l'objet. Selon le cas, Pandas modifie l'original ou pas, et il avertit par un `SettingWithCopyWarning` sans garantir lequel des deux il a fait. En Pandas 3, cet avertissement devient une règle : la copie est systématique, donc l'écriture chaînée **ne modifie plus jamais** l'original.

La règle est sans exception : **une seule paire de crochets, avec `.loc`, pour toute écriture.**

## Charger un fichier, vraiment

`pd.read_csv("f.csv")` fonctionne sur les fichiers propres, qui n'existent pas. Les arguments qui servent réellement :

```python
df = pd.read_csv(
    "consultations.csv",
    sep=";",                        # le CSV français est souvent en point-virgule
    decimal=",",                    # et ses décimales en virgule
    encoding="utf-8",               # ou "latin-1" sur un export Windows ancien
    parse_dates=["date_visite"],    # sinon les dates restent du texte
    na_values=["", "NA", "N/A", "inconnu", "-"],
    dtype={"code_postal": "string"},  # garder les zéros de tête
)
```

Deux arguments méritent une insistance.

**`parse_dates` n'est pas optionnel.** Sans lui, une colonne de dates est une colonne de chaînes : le tri est alphabétique, les soustractions impossibles, et `.dt` indisponible. Si le format n'est pas standard, `format="%d/%m/%Y"` évite une détection lente et parfois fausse — un `01/02/2026` sans format est ambigu, et Pandas ne devinera pas que tu es en France.

**`dtype` sur les identifiants.** Un code postal, un numéro de téléphone, un identifiant client ne sont pas des nombres : ce sont des étiquettes qui ressemblent à des nombres. Lus en entier, ils perdent leurs zéros de tête et subissent des additions qui n'ont aucun sens.

Les quatre inspections à faire avant toute autre chose :

```python
df.shape          # est-ce que j'ai le bon nombre de lignes ?
df.dtypes         # est-ce que les types sont ceux que je crois ?
df.isna().sum()   # où sont les trous ?
df.describe(include="all")   # les ordres de grandeur sont-ils plausibles ?
```

`describe` sur une colonne numérique donne min, max et quartiles. Un âge maximum de 999 ou une tension minimale de -5 s'y voient en une seconde, et ne se voient jamais autrement.

## Les types d'une colonne

| dtype | Contenu | Remarque |
| --- | --- | --- |
| `int64` | entiers | ne peut pas porter de `NaN` |
| `float64` | décimaux | le type des colonnes numériques incomplètes |
| `object` | n'importe quoi, souvent des chaînes | lent, et ne garantit rien |
| `string` | chaînes | type dédié, préférable à `object` |
| `category` | valeurs répétées d'un ensemble fini | économise beaucoup de mémoire |
| `bool` | vrai/faux | ne peut pas porter de `NaN` |
| `datetime64[ns]` | dates et heures | ouvre l'accesseur `.dt` |

Le comportement à connaître absolument : **une colonne d'entiers devient `float64` dès qu'elle contient une valeur manquante.** C'est une conséquence directe de NumPy, où `NaN` est une valeur flottante. D'où les identifiants qui s'affichent `1042.0` après une jointure incomplète.

```python
df["age"] = df["age"].astype("Int64")   # Int64 avec I majuscule
```

`Int64` est le type entier *nullable* de Pandas : il accepte les manquants et reste entier. C'est le bon choix pour un identifiant ou un compteur troué.

`category` mérite un mot pour les gros fichiers. Une colonne `region` de 500 000 lignes avec quatre valeurs distinctes occupe quelques mégaoctets en `object` et quelques centaines de kilooctets en `category`, parce que Pandas ne stocke que quatre chaînes et un tableau d'entiers. Sur un fichier qui ne tient pas en mémoire, c'est souvent ce qui fait la différence.

## Les valeurs manquantes

Pandas distingue trois absences : `NaN` (numérique), `None` (objet), `NaT` (date). `isna()` les attrape toutes les trois, et c'est la seule forme à utiliser.

```python
df.isna().sum()                     # par colonne
df.isna().sum(axis=1)               # par ligne
df["tension"].isna().mean()         # la proportion, pas le compte
```

Les outils de traitement, et ce qu'ils font exactement :

```python
df.dropna()                                  # jette toute ligne ayant UN trou
df.dropna(subset=["tension", "glycemie"])    # seulement sur ces colonnes
df.dropna(how="all")                         # seulement les lignes vides partout
df.dropna(axis=1, thresh=400)                # jette les colonnes trop creuses

df["tension"].fillna(df["tension"].median())  # imputation par la médiane
df["statut"].fillna("inconnu")                # catégorie explicite
df["cours"].ffill()                           # propage la dernière valeur connue
```

`dropna()` nu est presque toujours trop brutal : sur un fichier à dix colonnes dont chacune a 5 % de trous répartis au hasard, il jette environ 40 % des lignes. Précise toujours `subset`.

Deux mises en garde sur l'imputation. **Remplacer par la moyenne réduit artificiellement la variance** de la colonne, ce qui fausse tout écart-type et toute corrélation calculés ensuite ; la médiane est plus robuste mais ne corrige pas le problème de fond. Et **`ffill` suppose un ordre** : il n'a de sens que sur des données triées par temps, et produit n'importe quoi sur un fichier dans un ordre arbitraire.

Enfin, le fait qu'une valeur manque est souvent une information en soi. Avant de boucher un trou, demande-toi si une colonne `tension_manquante` ne serait pas plus honnête — un modèle saura s'en servir.

## Les doublons

```python
df.duplicated().sum()                        # combien de lignes entièrement répétées
df.duplicated(subset=["patient_id"]).sum()   # combien de clés répétées
df = df.drop_duplicates()                    # garde la PREMIÈRE occurrence
df = df.drop_duplicates(subset=["patient_id"], keep="last")
```

`duplicated()` marque les occurrences *suivantes*, pas la première : sur trois lignes identiques, il en marque deux. Le compte est donc « combien de lignes en trop », ce qui est généralement ce qu'on veut savoir.

La distinction à faire est entre un **doublon technique** — la même ligne importée deux fois, à supprimer — et une **clé répétée légitime** — un même patient venu trois fois, à conserver. `subset` sur la clé métier répond à la question ; `df["patient_id"].is_unique` la pose.

Et un rappel de la section sur l'index : après `drop_duplicates`, l'index a des trous. Enchaîne `.reset_index(drop=True)` si la suite du code suppose une numérotation continue.

## Les colonnes de texte

L'accesseur `.str` applique une méthode de chaîne à toute une colonne, en ignorant les `NaN` plutôt qu'en plantant dessus.

```python
df["sexe"].str.strip().str.upper()           # uniformise
df["email"].str.contains("@", na=False)      # masque booléen
df["nom"].str.split(" ", expand=True)        # éclate en plusieurs colonnes
df["tel"].str.replace(r"\D", "", regex=True) # ne garde que les chiffres
```

`na=False` sur `contains` est à prendre comme réflexe : sans lui, les lignes manquantes rendent `NaN`, et un masque qui contient des `NaN` n'est pas utilisable comme filtre.

Le même problème atteint les **noms de colonnes**, qui sont du texte eux aussi. Un fichier exporté depuis Excel donne couramment des colonnes nommées `"Patient ID "` avec une espace finale invisible, et un `KeyError` sur `"Patient ID"` qui paraît incompréhensible. Le nettoyage à faire dès le chargement :

```python
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
```

## apply, et pourquoi l'éviter

```python
df["tension"] * 1.1                            # vectorisé  — rapide
df["sexe"].map({"F": 0, "M": 1})               # table de correspondance
df["age"].apply(tranche_age)                    # une fonction Python par valeur
df.apply(ma_fonction, axis=1)                   # une fonction Python par LIGNE
```

Les deux premières formes descendent dans NumPy et traitent la colonne en bloc. Les deux dernières rappellent l'interpréteur Python une fois par élément, avec tout le coût décrit à la leçon 3 — et `apply(axis=1)` reconstruit en plus un objet `Series` par ligne, ce qui en fait l'opération la plus lente de Pandas.

L'ordre de préférence est toujours le même : **une opération vectorisée, sinon `np.where` ou `map`, et `apply` seulement quand la logique ne s'exprime pas autrement.** Sur quelques milliers de lignes la différence est invisible ; sur un million, elle se compte en minutes.

## Joindre deux tables

```python
resultat = commandes.merge(
    clients,
    on="client_id",
    how="left",          # inner | left | right | outer
    validate="many_to_one",
    indicator=True,
)
```

Les quatre jointures : `inner` ne garde que les clés présentes des deux côtés, `left` garde toutes les lignes de gauche, `right` l'inverse, `outer` garde tout. En analyse, `left` est le défaut raisonnable — on part de la table des faits et on enrichit.

Deux arguments transforment `merge` d'opération risquée en opération vérifiée, et presque personne ne les utilise.

**`validate`** déclare la cardinalité attendue et lève une erreur si elle est fausse. C'est la protection contre l'accident le plus coûteux de Pandas : **si la clé n'est pas unique à droite, les lignes de gauche sont dupliquées silencieusement.** Une jointure sur une table de référence qui contient par erreur deux fois le même client double le chiffre d'affaires de ce client, sans aucun message. Le réflexe minimal, à défaut de `validate` : comparer `len(df)` avant et après.

**`indicator=True`** ajoute une colonne disant, pour chaque ligne, si la clé venait de gauche, de droite ou des deux. C'est la façon de répondre à « combien de mes commandes n'ont pas trouvé leur client ? », qui est toujours la bonne question après une jointure.

## transform : une valeur de groupe, sur chaque ligne

Les agrégations que tu as écrites rendent **une ligne par groupe**. Il arrive qu'on veuille l'inverse : garder toutes les lignes, et leur coller une statistique de leur groupe.

```python
df["moyenne_region"] = df.groupby("region")["cout"].transform("mean")
df["ecart"] = df["cout"] - df["moyenne_region"]
```

`transform` rend un objet de la **même forme que l'original**, aligné sur l'index, au lieu d'un résumé. C'est ce qui permet de comparer chaque ligne à son groupe — « ce coût est-il élevé pour sa région ? » —, et c'est l'équivalent Pandas des fonctions de fenêtrage de SQL.

`filter` complète la famille : `df.groupby("region").filter(lambda g: len(g) >= 30)` garde les lignes des groupes assez peuplés, en jetant les autres. Utile quand une moyenne calculée sur trois observations n'a aucune valeur.

## Au clavier

- **`inplace=True` n'apporte rien.** Il ne fait pas d'économie de mémoire réelle, empêche le chaînage, et Pandas l'abandonne progressivement. Écris `df = df.something()`, toujours.
- **Un `SettingWithCopyWarning` se corrige, il ne se tait pas.** Il signale que tu as peut-être écrit dans une copie. La correction est un `.loc` en une seule indexation, ou un `.copy()` explicite après le filtrage.
- **`value_counts()` masque les valeurs manquantes.** `df["sexe"].value_counts(dropna=False)` les compte, et c'est la forme à utiliser pendant l'exploration — sinon un quart du fichier peut disparaître de ton comptage sans prévenir.
- **Comparer à `np.nan` ne marche pas**, ici comme en NumPy. `df[df["tension"] == np.nan]` rend zéro ligne ; c'est `df[df["tension"].isna()]`.
- **La colonne `Unnamed: 0`** d'un CSV relu est l'index écrit par un `to_csv` précédent. Écris `df.to_csv("f.csv", index=False)`, ou relis avec `index_col=0`.
