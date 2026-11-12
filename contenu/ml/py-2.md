Python propose quatre structures de données intégrées, et elles ne sont pas quatre variantes du même objet : chacune fait un compromis différent entre l'ordre, la modifiabilité et le coût de la recherche.

| Structure | Ordonnée | Modifiable | Doublons | Accès par |
| --- | --- | --- | --- | --- |
| `list` | oui | oui | oui | position |
| `tuple` | oui | non | oui | position |
| `dict` | oui (insertion) | oui | clés uniques | clé |
| `set` | non | oui | non | — |

La colonne qui compte le plus est la dernière. Une liste répond à « que contient la case 3 ? », un dictionnaire à « que vaut la clé `maths` ? », un ensemble à « cet élément est-il là ? ». Choisir la structure, c'est choisir la question qu'on va poser le plus souvent.

## Les listes

L'indexation part de 0, et les indices négatifs comptent depuis la fin : `liste[-1]` est le dernier élément, `liste[-2]` l'avant-dernier. C'est plus sûr que `liste[len(liste) - 1]`, et ça évite l'`IndexError` d'un calcul raté.

### Le découpage

```python
data = [10, 20, 30, 40, 50]
data[1:4]     # [20, 30, 40]   — borne de fin exclue
data[:3]      # [10, 20, 30]   — depuis le début
data[2:]      # [30, 40, 50]   — jusqu'à la fin
data[::2]     # [10, 30, 50]   — un élément sur deux
data[::-1]    # [50, 40, 30, 20, 10]  — inversée
data[:]       # une copie de la liste entière
```

La forme complète est `[début:fin:pas]`. Trois propriétés valent d'être retenues, parce qu'elles se comportent autrement que l'indexation simple :

**Le découpage ne lève jamais d'`IndexError`.** `data[10:20]` sur une liste de 5 éléments rend `[]` au lieu de planter. Pratique, et dangereux : une tranche vide silencieuse est plus difficile à diagnostiquer qu'une erreur.

**Le découpage rend une nouvelle liste.** C'est ce qui fait de `data[:]` une copie, et c'est aussi pourquoi découper une grande liste coûte de la mémoire. NumPy fait l'inverse, et la leçon 3 y reviendra.

**On peut affecter une tranche.** `data[1:3] = [0]` remplace deux éléments par un seul et raccourcit la liste. `del data[1:3]` les supprime.

### Ce que coûtent les opérations

Une liste Python est un tableau de pointeurs redimensionnable. Cette implémentation explique ses forces et ses faiblesses, et il faut les connaître avant de traiter un million de lignes.

| Opération | Coût | Pourquoi |
| --- | --- | --- |
| `liste[i]` | constant | accès direct à la case |
| `liste.append(x)` | constant | on écrit au bout |
| `liste.pop()` | constant | on retire au bout |
| `liste.insert(0, x)` | linéaire | tout décaler d'un cran |
| `liste.pop(0)` | linéaire | idem |
| `x in liste` | linéaire | il faut comparer un à un |
| `liste.remove(x)` | linéaire | chercher, puis décaler |

Les deux lignes à retenir sont celles du début de liste. Insérer ou retirer en tête d'une liste de 100 000 éléments déplace 100 000 pointeurs ; le faire dans une boucle transforme un traitement linéaire en traitement quadratique. Quand tu as besoin d'une file, `collections.deque` fait les deux bouts en temps constant.

### Trier

```python
eleves = [("Awa", 15), ("Kofi", 8), ("Lina", 12)]
eleves.sort(key=lambda e: e[1], reverse=True)   # par note décroissante
```

`key` reçoit un élément et rend la valeur sur laquelle comparer. Le tri de Python est **stable** : deux éléments de même clé gardent leur ordre relatif d'origine. Cette garantie permet de trier en plusieurs passes — trier d'abord par note, puis par nom, donne un classement par nom avec les notes ordonnées à l'intérieur.

## Les tuples : l'immuabilité comme garantie

Un tuple s'écrit avec des virgules ; les parenthèses ne servent qu'à lever l'ambiguïté. Et le tuple d'un seul élément a besoin de sa virgule, sinon ce n'est qu'une parenthèse :

```python
point = 3, 4        # un tuple
seul = (3,)         # un tuple d'un élément
pas_un_tuple = (3)  # l'entier 3
```

L'immuabilité n'est pas une restriction gratuite, elle achète trois choses.

**Le retour multiple.** Une fonction qui rend plusieurs valeurs rend en réalité un tuple, et le déballage le défait :

```python
def bornes(data):
    return min(data), max(data)

mini, maxi = bornes([3, 9, 1])
```

**Le déballage étoilé**, pour quand on ne veut qu'une partie :

```python
premier, *reste = [10, 20, 30, 40]   # premier=10, reste=[20, 30, 40]
*debut, dernier = [10, 20, 30, 40]   # debut=[10, 20, 30], dernier=40
a, _, c = (1, 2, 3)                  # _ par convention : « je l'ignore »
```

**La hachabilité.** Un tuple peut servir de clé de dictionnaire, une liste ne peut pas — on y revient dans un instant.

Une nuance à connaître : **l'immuabilité est superficielle**. Un tuple garantit que ses étiquettes ne bougent pas, pas que les objets pointés ne changent pas. `t = ([1, 2], 3)` est un tuple ; `t[0].append(9)` fonctionne parfaitement. Et un tel tuple n'est plus hachable, donc inutilisable comme clé.

## Les dictionnaires

Un dictionnaire associe une clé à une valeur, et la recherche par clé est **quasi instantanée quelle que soit la taille** — c'est une table de hachage, pas un parcours.

```python
notes = {"maths": 15, "python": 18}
notes["sql"] = 12            # ajoute ou remplace
"maths" in notes             # True — teste les CLÉS, pas les valeurs
len(notes)                   # 3
```

L'ordre d'insertion est **garanti depuis Python 3.7**. Tu croiseras du code et des tutoriels écrits avant, qui affirment qu'un dictionnaire n'est pas ordonné : c'était vrai, ce ne l'est plus. Ne construis pas pour autant une logique sur cet ordre, mais tu peux compter sur un affichage reproductible.

### Ce qui peut être une clé

Une clé doit être **hachable** : Python doit pouvoir calculer un nombre stable à partir d'elle pour la ranger. Les objets immuables le sont — nombres, chaînes, tuples d'immuables. Les objets muables ne le sont pas, et la raison est logique : si une liste servait de clé et qu'on la modifiait ensuite, son empreinte changerait et la valeur deviendrait introuvable. Python refuse à l'entrée plutôt que de perdre les données.

```python
positions = {(0, 0): "départ", (3, 4): "arrivée"}   # tuples : légal
positions = {[0, 0]: "départ"}                       # TypeError: unhashable
```

Une clé composite en tuple est le réflexe à prendre pour indexer par deux critères — par région *et* par mois, par exemple.

### Parcourir

```python
for matiere in notes:                 # les clés
for note in notes.values():           # les valeurs
for matiere, note in notes.items():   # les deux
```

Itérer sur un dictionnaire donne ses clés, jamais ses couples : c'est la source d'un `TypeError` fréquent quand on essaie de déballer. `.items()` est ce qu'on veut dans neuf cas sur dix.

### Deux outils utiles

```python
from collections import defaultdict

par_region = defaultdict(list)          # toute clé absente naît avec []
par_region["Nord"].append("Awa")        # pas besoin de l'initialiser

defaults = {"seuil": 10, "mode": "strict"}
config = defaults | {"seuil": 20}       # fusion, la droite gagne (3.9+)
```

`defaultdict` évite le `if cle not in d` avant chaque ajout. Attention à son seul piège : **une simple lecture d'une clé absente la crée**, ce qui fait grossir le dictionnaire pendant qu'on croit seulement le consulter.

## Les ensembles

Un ensemble ne contient que des valeurs uniques, hachables, sans ordre. Il répond à une seule question — « est-ce dedans ? » — et il y répond en temps quasi constant.

Son autre usage est l'algèbre des ensembles, qui remplace des boucles entières :

```python
a = {"Awa", "Kofi", "Lina"}
b = {"Kofi", "Sam"}

a | b    # union          {'Awa', 'Kofi', 'Lina', 'Sam'}
a & b    # intersection   {'Kofi'}
a - b    # différence     {'Awa', 'Lina'}
a ^ b    # l'un ou l'autre, pas les deux
a <= b   # a est-il inclus dans b ?
```

En data science, l'intersection et la différence servent constamment : comparer les colonnes de deux fichiers, trouver les identifiants présents d'un côté et pas de l'autre, vérifier qu'une liste de clés attendues est bien couverte.

Deux pièges de notation et d'usage :

**L'ensemble vide s'écrit `set()`.** `{}` est un dictionnaire vide — la notation en accolades est partagée, et le dictionnaire a gagné l'arbitrage.

**Dédoublonner par un ensemble perd l'ordre.** `list(set(mots))` rend les mots uniques dans un ordre arbitraire, qui peut changer d'une exécution à l'autre. Si l'ordre compte, `list(dict.fromkeys(mots))` dédoublonne en gardant la première apparition — un idiome qui exploite justement l'ordre d'insertion des dictionnaires.

## Les compréhensions

Une compréhension construit une structure à partir d'un itérable, en une expression. La grammaire est la même pour les trois formes :

```python
[x**2 for x in range(10) if x % 2 == 0]    # liste
{x**2 for x in range(10)}                   # ensemble
{x: x**2 for x in range(10)}                # dictionnaire
```

L'ordre de lecture est `for` d'abord, puis `if`, puis l'expression de tête — même si l'expression s'écrit en premier. Trois précisions valent le détour.

**Le `if` de fin filtre ; le `if/else` de tête transforme.** Deux choses différentes, à la même ligne :

```python
[x for x in notes if x >= 10]                  # garde certains éléments
["admis" if x >= 10 else "refusé" for x in notes]   # garde tout, transforme
```

Si tu as besoin de filtrer *et* de transformer, les deux cohabitent : `[f(x) for x in notes if x >= 10]`.

**Les compréhensions imbriquées se lisent de gauche à droite**, comme des boucles emboîtées dans cet ordre :

```python
plat = [x for ligne in matrice for x in ligne]   # aplatit
```

C'est l'ordre inverse de ce que l'intuition suggère, et c'est l'erreur de syntaxe la plus commune sur le sujet. Le `for` externe vient d'abord.

**Les parenthèses donnent un générateur, pas un tuple.**

```python
sum(x**2 for x in range(1_000_000))     # rien n'est stocké
sum([x**2 for x in range(1_000_000)])   # une liste d'un million d'éléments
```

Un générateur produit ses valeurs à la demande. Quand tu passes une compréhension directement à `sum`, `max`, `any` ou `all`, retire les crochets : le résultat est le même et la mémoire reste plate. Le prix à payer est qu'un générateur **ne se parcourt qu'une fois** — après, il est vide.

Et une limite de lisibilité à poser maintenant : **si ta compréhension contient deux `for` et un `if`, écris la boucle.** Une compréhension doit se lire d'un coup d'œil ; au-delà, elle n'est plus concise, elle est seulement dense.

## Copier une structure

Le point suit directement le modèle de la leçon 1 : copier une structure muable n'est pas gratuit, et il y a deux niveaux.

```python
import copy

superficielle = liste[:]              # ou list(liste), ou liste.copy()
profonde = copy.deepcopy(liste)
```

Une copie **superficielle** crée un nouveau conteneur, mais les objets dedans restent partagés. Sur une liste de nombres, cela suffit toujours. Sur une liste de listes, non :

```python
grille = [[0, 0, 0]] * 3     # trois étiquettes vers LA MÊME liste
grille[0][0] = 1
print(grille)                 # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]

grille = [[0] * 3 for _ in range(3)]   # trois listes distinctes
```

L'opérateur `*` sur une liste duplique les références, pas les objets. La compréhension, elle, exécute `[0] * 3` à chaque tour et fabrique trois listes séparées. C'est le piège classique de la grille initialisée, et il se présente tel quel dès qu'on manipule une matrice en Python pur.

`copy.deepcopy` reconstruit tout l'arbre. Il est correct et lent — ne l'appelle pas dans une boucle sur de grosses structures.

## Au clavier

- **`append` ajoute un élément, `extend` en ajoute plusieurs.** `liste.append([1, 2])` met une liste *dans* la liste ; `liste.extend([1, 2])` met 1 et 2. Confondre les deux donne une structure imbriquée d'un niveau de trop, et l'erreur n'apparaît que bien plus loin.
- **Une liste s'affiche, un générateur ne s'affiche pas.** `print(zip(a, b))` affiche `<zip object at 0x...>`. C'est normal : `zip`, `map`, `filter` et `range` sont paresseux. Enveloppe dans `list()` pour regarder ce qu'il y a dedans.
- **`sorted()` sur un dictionnaire trie ses clés.** Si tu voulais trier par valeur, c'est `sorted(d.items(), key=...)`.
- **Les clés de dictionnaire sont sensibles à la casse et aux espaces.** `"Nord"` et `"nord "` sont deux clés différentes. Quand un comptage se répartit sur des clés presque identiques, uniformise à l'entrée avec `.strip().lower()` plutôt qu'à la sortie.
