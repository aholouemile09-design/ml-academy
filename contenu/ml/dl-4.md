Une image a une taille fixe ; une séquence n'en a pas. Un réseau récurrent traite les pas un par un en gardant un état, et c'est ce que l'exercice de cette leçon te fera construire sur une série temporelle.

Cette leçon traite de ce qui décide si un réseau récurrent fonctionne : son coût, les deux façons dont son gradient casse, et deux pièges de manipulation qui ne lèvent aucune erreur.

## Les trois cellules, et ce qu'elles coûtent

```
paramètres = portes × (entrée + cache + 2) × cache
```

Le nombre de **portes** est la seule chose qui change d'une cellule à l'autre. Vérifié contre PyTorch, entrée 32, cache 64 :

| Cellule | Portes | Paramètres |
|---|---|---|
| `nn.RNN` | 1 | 6 272 |
| `nn.GRU` | 3 | 18 816 |
| `nn.LSTM` | 4 | 25 088 |

Le `+ 2` du cache surprend : PyTorch garde **deux** vecteurs de biais par porte, `bias_ih` et `bias_hh`. Mathématiquement un seul suffirait — c'est un héritage de l'implémentation cuDNN, et il faut le savoir quand on compare un compte de paramètres à celui d'un article.

Un LSTM coûte donc quatre fois un RNN simple, un GRU trois fois. Le GRU fusionne les portes d'entrée et d'oubli ; à qualité souvent comparable, il est 25 % moins cher. **Essaie le GRU avant le LSTM** : s'il suffit, tu as gagné un quart des paramètres et du temps.

Les variantes, et surtout **les formes qu'elles produisent** :

| `nn.LSTM(32, 64, …)` | Paramètres | `sorties` | `h` |
|---|---|---|---|
| 1 couche | 25 088 | (4, 10, 64) | (1, 4, 64) |
| 2 couches | 58 368 | (4, 10, **64**) | (**2**, 4, 64) |
| 1 couche bidirectionnelle | 50 176 | (4, 10, **128**) | (**2**, 4, 64) |
| 2 couches bidirectionnelles | 149 504 | (4, 10, 128) | (**4**, 4, 64) |

Deux choses à retenir de ce tableau. **Empiler des couches ne change pas la largeur de `sorties`** — seule la première dimension de `h` grandit, parce qu'il y a un état final par couche. **Le bidirectionnel double la largeur de `sorties`**, lui : les `cache` premières colonnes sont le sens avant, les `cache` suivantes le sens arrière. C'est la cause la plus fréquente d'une erreur de forme sur la couche `Linear` qui suit.

Et la forme de `h` n'est pas `(lot, …)` mais `(couches × sens, lot, cache)` : **le lot est en deuxième position, même avec `batch_first=True`**, qui ne concerne que `sorties`. Le `c` qui accompagne `h` dans un LSTM a la même forme : `h` est ce que la cellule expose, `c` est sa mémoire interne, celle qui traverse le temps.

## Le coût est strictement linéaire en nombre de pas

Mesuré sur un lot de 32, cache 256, un seul fil d'exécution, 20 répétitions :

| Longueur | LSTM (ms) | Conv1d (ms) | Rapport | LSTM par pas |
|---|---|---|---|---|
| 25 | 5,96 | 1,60 | 3,7× | 0,238 ms |
| 50 | 12,51 | 3,00 | 4,2× | 0,250 ms |
| 100 | 25,44 | 6,34 | 4,0× | 0,254 ms |
| 200 | 48,97 | 11,55 | 4,2× | 0,245 ms |
| 400 | 96,52 | 24,06 | 4,0× | 0,241 ms |
| 800 | 194,81 | 48,01 | 4,1× | 0,244 ms |

**Le coût par pas est constant à 0,24 ms sur deux ordres de grandeur de longueur**, et le LSTM coûte 4,1× une convolution faisant un travail comparable, à toutes les longueurs. Doubler la longueur de la séquence double le temps, sans exception.

La raison est structurelle : le pas *t* a besoin de l'état du pas *t−1*. Il y a donc **L dépendances en chaîne**, qu'aucun matériel ne peut raccourcir, alors qu'une convolution ou une attention calcule ses L positions indépendamment.

Une précision honnête : ce tableau ne *démontre* pas ce point. Sur un processeur, à un fil, la convolution est elle aussi linéaire en L — elle a simplement un facteur constant quatre fois plus petit. L'écart de parallélisme se voit sur GPU, où les L positions indépendantes se calculent de front et où le temps de la convolution cesse de croître avec L, tandis que celui du LSTM continue. C'est cette asymétrie, et non un gain de qualité, qui explique pourquoi les Transformers ont remplacé les RNN sur le texte long.

## Le même mécanisme produit l'évanouissement **et** l'explosion

L'exercice de cette leçon te fait mesurer l'évanouissement du gradient. L'autre moitié du phénomène est moins racontée et tout aussi réelle : la même chaîne de multiplications peut diverger. Ce qui décide du côté, c'est **l'échelle de la matrice récurrente `W_hh`** — ici sa plus grande valeur singulière σ, imposée exactement.

Norme du gradient par rapport au premier pas d'entrée, RNN **tanh** :

| Longueur | σ=0,9 | σ=1,1 | σ=1,5 | σ=2,0 |
|---|---|---|---|---|
| 10 | 1,56·10⁻¹ | 6,14·10⁻¹ | 3,42 | 1,04·10¹ |
| 50 | 5,37·10⁻⁷ | 6,52·10⁻⁴ | 1,72 | 1,81·10³ |
| 100 | 4,22·10⁻¹⁴ | 1,28·10⁻⁷ | 8,21·10⁻¹ | 5,36·10⁵ |
| 200 | **0,000** | 3,16·10⁻¹⁵ | 1,21·10⁻¹ | **2,37·10¹⁰** |

Le même protocole avec une récurrence **ReLU** :

| Longueur | σ=0,9 | σ=1,1 | σ=1,5 | σ=2,0 |
|---|---|---|---|---|
| 10 | 3,46·10⁻² | 3,04·10⁻¹ | 1,07·10¹ | 1,42·10³ |
| 100 | 4,21·10⁻²⁰ | 9,29·10⁻¹² | 6,19 | **`inf`** |
| 200 | **0,000** | **0,000** | 8,57·10¹ | **`nan`** |

Trois lectures.

**Le seuil n'est pas à σ = 1.** C'est le récit habituel, et la mesure le contredit : à σ=1,1 le gradient tombe quand même à 3·10⁻¹⁵ en 200 pas. La cause est que la dérivée de tanh est partout inférieure à 1 ; elle amortit la chaîne, et il faut une matrice nettement plus grande que 1 pour compenser cet amortissement.

**La fenêtre utilisable est étroite, et elle se referme avec la longueur.** Entre σ=1,5, qui garde le gradient vivant mais décroissant, et σ=2,0, qui atteint 2,4·10¹⁰, il n'y a qu'un facteur 1,3 sur une seule quantité. C'est ce que signifie « instable » pour un RNN : pas « mal réglé », mais sans réglage robuste.

**ReLU retire l'amortissement, donc aggrave les deux bords.** À σ=0,9 il s'évanouit plus vite que tanh (4·10⁻²⁰ contre 4·10⁻¹⁴ à 100 pas), et à σ=2,0 il produit `inf` puis `nan`. C'est pourquoi la récurrence reste en tanh alors que tout le reste de l'apprentissage profond est passé à ReLU : ici, la saturation est une protection.

## L'autoroute du gradient du LSTM n'est pas gratuite

L'exercice t'apprend que l'état de cellule du LSTM offre au gradient un chemin **additif** au lieu d'une chaîne multiplicative. Ce chemin existe, et il a une condition que personne n'énonce.

À chaque pas, l'état de cellule est multiplié par la porte d'oubli — une sigmoïde. Conserver la mémoire veut dire garder cette sigmoïde **près de 1**. Mesuré en imposant le biais de la porte d'oubli, norme du gradient du premier pas :

| Biais d'oubli | Conservé par pas | L=10 | L=100 | L=200 |
|---|---|---|---|---|
| défaut PyTorch | ≈ 0,5 | 2,84·10⁻³ | 1,51·10⁻²¹ | **0,000** |
| +1,0 | 0,731 | 4,86·10⁻² | 4,49·10⁻¹⁰ | 2,22·10⁻¹⁸ |
| +2,0 | 0,881 | 2,37·10⁻¹ | 2,04·10⁻³ | 1,08·10⁻⁵ |
| **+3,0** | **0,953** | **4,15·10⁻¹** | **3,18·10⁻¹** | 5,96·10⁻² |
| +5,0 | 0,993 | 5,32·10⁻¹ | 1,42 | 1,14 |

**Un LSTM fraîchement initialisé n'a aucune autoroute : son gradient est exactement nul à 200 pas, comme celui d'un RNN.** Avec le biais par défaut, la porte d'oubli vaut sigmoïde(0) ≈ 0,5, donc l'état de cellule est divisé par deux à chaque pas — 0,5¹⁰⁰ ≈ 8·10⁻³¹.

À biais +3, le gradient passe de 4,15·10⁻¹ à 10 pas à 3,18·10⁻¹ à 100 pas : **quasiment plat sur un facteur dix de longueur.** Voilà l'autoroute.

Et la mesure suit la décroissance théorique de près :

```
biais +1,0 -> conserve 0,731/pas -> 0,731^100  = 2,5e-14
biais +2,0 -> conserve 0,881/pas -> 0,881^100  = 3,1e-06
biais +3,0 -> conserve 0,953/pas -> 0,953^100  = 7,8e-03
```

Donc l'avantage du LSTM n'est pas donné, il est **appris** : l'entraînement pousse le biais d'oubli vers le haut, et c'est pour ça que l'exercice voit un LSTM gagner nettement après entraînement alors qu'au départ il ne vaut pas mieux. Initialiser ce biais à 1 est une recommandation ancienne et peu suivie — une ligne, gratuite :

```python
import torch.nn as nn

cache = 64
m = nn.LSTM(32, cache, batch_first=True)
with torch.no_grad():
    m.bias_ih_l0[cache:2 * cache].fill_(1.0)   # [entree, OUBLI, cellule, sortie]
```

L'ordre des quatre portes dans les biais PyTorch est `[entrée, oubli, cellule, sortie]` : la tranche d'oubli est donc `[cache : 2×cache]`. Se tromper de tranche ne lève aucune erreur et dégrade silencieusement.

## Le rembourrage silencieux : l'état final est faux

Un lot de séquences de longueurs différentes doit être rembourré (*padded*) de zéros. Et là, le geste évident est faux. Mesuré sur une séquence de **2 pas réels rembourrée à 5** :

| État final de la séquence courte | Trois premières valeurs | Écart à la vérité |
|---|---|---|
| vérité (séquence passée seule) | 0,1159 ; 0,0029 ; 0,0020 | — |
| `sorties[:, -1, :]` sur le lot rembourré | 0,0379 ; 0,0546 ; −0,1506 | **5,18·10⁻¹** |
| `h_n` avec `pack_padded_sequence` | 0,1159 ; 0,0029 ; 0,0020 | **9,16·10⁻⁸** |

**Prendre le dernier pas d'une sortie rembourrée donne l'état obtenu après avoir fait tourner la cellule sur des zéros.** Un zéro n'est pas « rien » pour un LSTM : c'est une entrée valide qui met à jour l'état. L'erreur est de l'ordre de grandeur du signal lui-même, et elle grandit avec le rembourrage :

```
 1 pas de rembourrage -> ecart 3,01e-01
 3 pas                -> ecart 5,18e-01
10 pas                -> ecart 5,75e-01
30 pas                -> ecart 5,74e-01
```

Elle sature, parce que l'état finit par converger vers le point fixe de la cellule nourrie de zéros — autrement dit, **toutes les séquences courtes d'un lot finissent par se ressembler**, ce qui est exactement ce qu'on voulait éviter.

Aucune erreur n'est levée. Le modèle s'entraîne, la perte descend, et les séquences courtes sont systématiquement mal représentées. La parade :

```python
from torch.nn.utils.rnn import pack_padded_sequence

emballe = pack_padded_sequence(lot, longueurs, batch_first=True, enforce_sorted=False)
_, (h_n, _) = lstm(emballe)        # h_n contient le VRAI etat final de chaque sequence
```

`longueurs` est un tenseur sur CPU des longueurs réelles. `enforce_sorted=False` évite d'avoir à trier le lot par longueur décroissante. Et si tu as besoin des sorties à tous les pas, `pad_packed_sequence` fait le chemin inverse.

## Le bidirectionnel, et pourquoi il est interdit en prévision

Un RNN bidirectionnel lit la séquence dans les deux sens et concatène. Sur du texte entier, c'est un gain net. Sur une série temporelle, c'est une fuite. Démontré en modifiant **uniquement le dernier pas** d'une séquence de 6, puis en relisant la sortie du **pas 2** :

| Moitié de la sortie | Écart après modification du pas 5 |
|---|---|
| sens avant (colonnes 0 à 7) | **0,000** |
| sens arrière (colonnes 8 à 15) | **1,15·10⁻¹** |
| le même test, modèle unidirectionnel | **0,000** |

**La représentation du pas 2 change quand on modifie le pas 5.** Elle contient donc de l'information sur le futur. Un modèle entraîné là-dessus obtient d'excellents scores de validation et ne peut rien prévoir en production, où le futur n'existe pas encore.

La règle : bidirectionnel autorisé quand la séquence entière est disponible au moment de la prédiction (classer un avis déjà écrit, étiqueter une phrase complète), interdit dès que la prédiction porte sur l'avenir.

## Au clavier

```python
import torch, torch.nn as nn
from torch.nn.utils.rnn import pack_padded_sequence

CACHE = 64

class Lecteur(nn.Module):
    def __init__(self, entree=32, classes=3):
        super().__init__()
        self.rnn = nn.GRU(entree, CACHE, batch_first=True)   # 1. le GRU d'abord
        self.tete = nn.Linear(CACHE, classes)

    def forward(self, lot, longueurs):
        emballe = pack_padded_sequence(lot, longueurs, batch_first=True,
                                       enforce_sorted=False)  # 2. jamais sorties[:, -1]
        _, h_n = self.rnn(emballe)
        return self.tete(h_n[-1])                             # h_n : (couches, lot, cache)

# et si tu passes au LSTM, la ligne qui change tout :
lstm = nn.LSTM(32, CACHE, batch_first=True)
with torch.no_grad():
    lstm.bias_ih_l0[CACHE:2 * CACHE].fill_(1.0)               # 3. biais d'oubli
```

Trois réflexes :

1. **Essaie le GRU avant le LSTM.** Trois portes au lieu de quatre, soit 25 % de paramètres en moins pour une qualité souvent équivalente — 18 816 contre 25 088 sur la configuration mesurée ici.
2. **Dès qu'un lot est rembourré, emballe-le.** Prendre `sorties[:, -1, :]` sur un lot rembourré donnait ici une erreur de 5,18·10⁻¹ sur un signal du même ordre, contre 9,16·10⁻⁸ avec `pack_padded_sequence`, et rien ne le signale.
3. **Initialise le biais d'oubli du LSTM à 1.** Au biais par défaut, le gradient du premier pas était exactement nul à 200 pas ; à biais +3 il restait à 3,18·10⁻¹ après 100 pas. L'autoroute du gradient est une initialisation, pas une propriété de l'architecture.
