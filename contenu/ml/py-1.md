Python est le langage de référence du machine learning, et ce n'est pas parce qu'il est rapide — il est lent. C'est parce qu'il sert de langue commune : les bibliothèques lourdes (NumPy, PyTorch, scikit-learn) sont écrites en C ou en C++, et Python est la couche qui les pilote. Tu passeras ta vie de praticien à écrire des fonctions courtes qui transforment des données et appellent du code compilé.

Cette leçon ne te donne pas la syntaxe — tu la trouveras partout. Elle te donne les quatre ou cinq modèles mentaux sans lesquels la syntaxe produit des bugs qu'on ne sait pas lire.

## Un nom est une étiquette, pas une boîte

C'est la décision de conception la plus lourde de conséquences dans Python, et presque personne ne l'énonce.

Dans un langage comme le C, une variable est une boîte : une zone de mémoire qui contient une valeur. En Python, l'objet existe d'abord, et le nom est une **étiquette collée dessus**. L'affectation ne copie rien : elle colle une étiquette.

```python
a = [1, 2, 3]
b = a          # une deuxième étiquette sur le MÊME objet
print(a is b)  # True  : même objet
print(a == b)  # True  : contenus égaux
```

D'où la distinction entre les deux opérateurs de comparaison, qu'on confond tant qu'on n'a pas ce modèle :

- `==` demande « ces deux objets ont-ils le même contenu ? »
- `is` demande « ces deux noms désignent-ils le même objet ? »

Tu utiliseras `==` à peu près toujours. `is` ne sert correctement que contre les singletons : `if x is None`. Jamais `if x == None`, jamais `if x is 0`.

### Muable ou non : la seule classification qui compte

Les objets Python se rangent en deux familles, et savoir dans laquelle on est détermine ce qui va se passer.

| Famille | Types | Modifiable après création |
| --- | --- | --- |
| Immuable | `int`, `float`, `str`, `bool`, `tuple` | non |
| Muable | `list`, `dict`, `set` | oui |

Sur un objet immuable, la question de l'étiquette partagée ne se pose pas : comme personne ne peut le modifier, le partager est sans danger. `x = 5; y = x; y += 1` laisse `x` à 5, non pas parce que Python a copié quelque chose, mais parce que `y += 1` a **fabriqué un nouvel entier** et déplacé l'étiquette `y` dessus.

Sur un objet muable, le partage est visible, et c'est là que naissent les bugs. La règle pratique tient en une phrase : **dès que tu passes une liste ou un dictionnaire à une fonction, cette fonction peut le modifier chez toi.** Si tu ne le veux pas, passe une copie — et le cours suivant te dira pourquoi une copie simple ne suffit pas toujours.

## Les types de base, et leurs surprises

**`int` est illimité.** Il n'y a pas de dépassement de capacité en Python : `2 ** 1000` se calcule exactement. C'est confortable, et c'est aussi un piège quand tu passeras à NumPy, où les entiers ont une taille fixe et débordent silencieusement.

**`float` est approximatif.** Un flottant est un binaire à 53 bits de mantisse, pas un décimal.

```python
0.1 + 0.2        # 0.30000000000000004
0.1 + 0.2 == 0.3 # False
```

Ce n'est pas un bug de Python, c'est la norme IEEE 754, identique dans tous les langages. Deux conséquences pour toi : **ne compare jamais deux flottants avec `==`** (compare un écart à une tolérance), et **ne stocke jamais de l'argent dans un flottant** — des centimes entiers, ou le type `Decimal`.

**`str` est immuable, et c'est une suite de caractères Unicode.** `nom[0] = "X"` est une erreur. Toute méthode de chaîne (`.upper()`, `.strip()`, `.replace()`) **retourne une nouvelle chaîne** sans toucher l'originale — un oubli classique :

```python
nom = "  Emile  "
nom.strip()          # rend "Emile", mais nom n'a pas changé
nom = nom.strip()    # la forme correcte
```

**`bool` est un sous-type d'`int`.** `True` vaut 1 et `False` vaut 0, littéralement : `True + True` donne 2, et `sum([True, False, True])` donne 2. Ce détail curieux est la base d'une technique que tu utiliseras tous les jours en data science — compter en additionnant des booléens.

### Le typage est dynamique, mais fort

Un nom peut recevoir n'importe quel type, et changer de type en cours de route : c'est le typage **dynamique**. Mais Python refuse les conversions implicites entre types incompatibles : c'est le typage **fort**.

```python
"3" + 3     # TypeError
"3" * 3     # "333"  — légal, et probablement pas ce que tu voulais
int("3") + 3   # 6
```

En JavaScript, `"3" + 3` donne `"33"` sans broncher. Python préfère s'arrêter. Prends-le comme un service rendu : une erreur bruyante à la ligne 12 coûte infiniment moins cher qu'un résultat faux à la ligne 400.

Les conversions explicites à connaître, avec leur comportement exact :

```python
int("42")      # 42
int("42.5")    # ValueError : int() ne lit pas un décimal depuis une chaîne
int(42.9)      # 42   — tronque vers zéro, n'arrondit pas
int(-42.9)     # -42  — vers zéro, donc vers le haut pour un négatif
round(42.9)    # 43   — arrondit, et rend un int
round(0.5)     # 0    — arrondi au pair le plus proche, pas au supérieur
```

La dernière ligne surprend tout le monde. `round(0.5)` vaut 0 et `round(1.5)` vaut 2 : Python applique l'arrondi *au pair*, qui est la convention statistique, parce qu'arrondir toujours vers le haut introduit un biais systématique sur un grand nombre de valeurs. Ce n'est pas une erreur à corriger, c'est un choix à connaître.

## La vérité d'une valeur

Dans un `if`, Python n'exige pas un booléen : il demande à l'objet s'il est vrai. Et toute une famille d'objets répond « faux » sans être `False`.

Sont faux : `False`, `None`, `0`, `0.0`, la chaîne vide `""`, la liste vide `[]`, le tuple vide `()`, le dictionnaire vide `{}`, l'ensemble vide. Tout le reste est vrai.

```python
if not nombres:      # vrai si la liste est vide
    return 0
```

C'est la forme idiomatique, préférée à `if len(nombres) == 0`, parce qu'elle fonctionne aussi bien sur une liste, une chaîne ou un dictionnaire.

Un avertissement, en revanche : cette commodité **efface la différence entre « vide » et « absent »**. Si une fonction peut recevoir `0` comme valeur légitime, `if not valeur` traite ce `0` comme une absence. Quand la distinction compte, teste-la pour ce qu'elle est : `if valeur is None`.

## Les opérateurs numériques

Trois divisions, et il faut les distinguer :

```python
7 / 2      # 3.5   division réelle, rend TOUJOURS un float
7 // 2     # 3     division entière (plancher)
7 % 2      # 1     reste
7 ** 2     # 49    puissance
```

`/` rend un flottant même sur des entiers qui se divisent bien : `4 / 2` vaut `2.0`, pas `2`. En Python 2 ce n'était pas le cas, ce qui explique pourquoi tu croiseras encore du code qui écrit `//` par précaution.

Et un détail qui mord : **`//` arrondit vers le bas, pas vers zéro**, et `%` suit. Sur les négatifs, Python ne fait donc pas comme le C :

```python
-7 // 2    # -4  (pas -3)
-7 % 2     #  1  (pas -1)
```

Le reste en Python a toujours le signe du diviseur. C'est en réalité la convention la plus utile — `i % n` reste un indice valide dans `range(n)` quel que soit le signe de `i`.

## Les boucles parcourent un itérable

Dans beaucoup de langages, une boucle `for` incrémente un compteur. En Python, elle parcourt les éléments d'un objet. Écrire `for i in range(len(liste))` puis `liste[i]` est la marque de quelqu'un qui traduit depuis un autre langage.

```python
for note in notes:              # on veut les éléments
for i, note in enumerate(notes):  # on veut aussi la position
for nom, note in zip(noms, notes):  # on parcourt deux listes en parallèle
```

`range(5)` produit 0, 1, 2, 3, 4 : **la borne de fin est exclue**. La raison n'est pas arbitraire — avec cette convention, `range(a, b)` contient exactement `b - a` éléments, et `range(0, n)` plus `range(n, m)` recouvre `range(0, m)` sans trou ni recouvrement. La même convention gouverne le découpage de séquences, et tu la retrouveras dans NumPy et dans Pandas.

`zip` s'arrête sur la plus courte des séquences, silencieusement. Si tes deux listes doivent avoir la même longueur, `zip(a, b, strict=True)` lève une erreur quand ce n'est pas le cas — depuis Python 3.10, et c'est à prendre comme réflexe.

`while` tourne tant qu'une condition est vraie, et sert quand on ne sait pas d'avance combien de tours il faudra. Si tu peux écrire la boucle avec un `for`, écris-la avec un `for` : une condition de `while` mal mise à jour est une boucle infinie, et un `for` ne peut pas en produire.

### Ne modifie pas ce que tu parcours

```python
for x in liste:
    if condition(x):
        liste.remove(x)    # saute un élément sur deux
```

Supprimer pendant le parcours décale les indices sous les pieds de l'itérateur. Construis une nouvelle liste à la place — c'est exactement l'usage pour lequel les compréhensions de la prochaine leçon existent.

## Les fonctions

Une fonction sans `return` explicite retourne `None`. C'est la cause de l'erreur la plus fréquente du débutant : une fonction qui `print()` au lieu de `return`.

```python
def carre(x):
    print(x ** 2)     # affiche, mais ne rend rien

y = carre(4)          # affiche 16, et y vaut None
```

`print` parle à l'humain, `return` parle au programme. Une fonction qui affiche ne se compose pas : tu ne peux ni la tester, ni réutiliser son résultat. En data science, tes fonctions doivent presque toutes rendre une valeur.

Les paramètres peuvent être passés par position ou par nom, et le nom gagne en lisibilité dès qu'il y en a plus de deux :

```python
def normaliser(x, minimum=0, maximum=1):
    ...

normaliser(donnees, maximum=100)      # explicite
normaliser(donnees, 0, 100)           # fonctionne, mais se relit mal
```

Une mise en garde sur les valeurs par défaut : **elles sont évaluées une seule fois**, au moment où Python lit la définition, pas à chaque appel. Pour un nombre ou une chaîne, c'est sans conséquence. Pour une liste ou un dictionnaire, cela crée un objet partagé entre tous les appels, et le quiz de ce module te fera rencontrer le résultat. La règle : **jamais d'objet muable comme valeur par défaut**. On écrit `def f(liste=None)` puis `if liste is None: liste = []`.

### Les méthodes qui modifient en place rendent None

```python
notes = [12, 15, 8]
notes.sort()              # trie notes sur place, rend None
triees = sorted(notes)    # ne touche pas notes, rend une nouvelle liste

notes = notes.sort()      # l'erreur : notes vaut maintenant None
```

La convention est constante dans toute la bibliothèque standard : une opération qui modifie l'objet ne le retourne pas, précisément pour t'empêcher d'écrire `x = x.sort()` et de croire que ça marche. `sort` / `sorted`, `reverse` / `reversed`, `append` / concaténation : à chaque fois, la version qui mute rend `None`, la version qui construit rend l'objet.

## Lire une erreur

Une traceback se lit **de bas en haut**. La dernière ligne donne le type d'erreur et le message ; juste au-dessus, la ligne de *ton* code qui a échoué. Tout ce qui est plus haut est la pile d'appels, utile seulement quand l'erreur vient d'une bibliothèque.

Les six erreurs qui représentent l'essentiel de tes premiers mois :

| Erreur | Ce qu'elle veut dire | Première chose à vérifier |
| --- | --- | --- |
| `NameError` | ce nom n'existe pas | faute de frappe, ou cellule non exécutée |
| `TypeError` | opération impossible sur ce type | une chaîne là où tu attendais un nombre |
| `ValueError` | bon type, valeur impossible | `int("abc")`, ou une forme incompatible |
| `IndexError` | indice hors de la séquence | une boucle qui va jusqu'à `len` inclus |
| `KeyError` | cette clé n'est pas dans le dictionnaire | un nom de colonne mal orthographié |
| `AttributeError` | cet objet n'a pas cette méthode | tu travailles sur `None` sans le savoir |

`AttributeError: 'NoneType' object has no attribute ...` mérite une mention à part : il signifie presque toujours qu'une fonction plus haut a rendu `None` au lieu d'un objet. Remonte à l'affectation, pas à la ligne qui plante.

## L'indentation est de la syntaxe

Ailleurs, les accolades délimitent les blocs et l'indentation est cosmétique. En Python, l'indentation **est** la délimitation. Un décalage n'est pas une question de style, c'est un changement de programme.

Quatre espaces par niveau, jamais de tabulations — les mélanger donne un `TabError`, et la raison est que l'œil ne peut pas voir la différence. Configure ton éditeur pour insérer des espaces quand tu appuies sur Tab, une fois, et le problème disparaît pour toujours.

## Au clavier

Quatre choses qui coûtent une demi-heure la première fois et trente secondes ensuite.

- **Ne nomme jamais un fichier comme une bibliothèque.** Un `numpy.py` ou un `random.py` dans ton dossier de travail est importé à la place de la vraie bibliothèque, et le message d'erreur ne dit pas pourquoi. Même piège avec un `pandas.py`, un `test.py` dans certains contextes, ou un fichier `csv.py`.
- **`python` et `python3` ne sont pas toujours le même interpréteur.** Sur Linux et macOS, `python` peut être absent ou pointer vers une version ancienne. Vérifie avec `python --version` avant de chercher plus loin, et préfère `python3 -m pip` à `pip` pour être sûr d'installer dans l'interpréteur que tu crois.
- **Un script se termine par un garde.** `if __name__ == "__main__":` autour du code d'exécution permet d'importer ton fichier depuis un autre sans que tout se lance. Ce n'est pas une formule magique : `__name__` vaut `"__main__"` quand le fichier est lancé directement, et le nom du module quand il est importé.
- **Écris tes fichiers en UTF-8.** C'est le défaut de Python 3, mais pas celui de tous les éditeurs sous Windows. Un accent qui s'affiche en `Ã©` dans la console est un problème d'encodage de sortie, pas de ton code.

Et une habitude qui vaut toutes les techniques de débogage : quand un résultat te surprend, **affiche le type avant d'afficher la valeur**. `print(type(x), x)` résout en une seconde la moitié des bugs du débutant, parce que la moitié de ces bugs sont une chaîne qui se faisait passer pour un nombre.
