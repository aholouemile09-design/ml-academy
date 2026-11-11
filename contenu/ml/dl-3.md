Une image 224×224 en couleur fait 150 528 valeurs d'entrée. La convolution est la réponse à ce que coûterait une couche dense sur une telle entrée, et l'exercice de cette leçon te fera mesurer l'écart exactement.

Ce que l'exercice ne couvre pas, ce sont les **quatre quantités qui décident une architecture convolutive** : la taille de sortie, le champ réceptif, la forme de la tête, et ce qui se passe quand on empile beaucoup de couches. Chacune se calcule, et chacune a son piège.

## La taille de sortie se calcule, et c'est là que les formes cassent

```
sortie = ⌊(H + 2p − k) / s⌋ + 1
```

avec `H` la taille d'entrée, `k` le noyau, `p` le remplissage (*padding*), `s` le pas (*stride*). Vérifié contre PyTorch sur huit configurations :

| H | k | p | s | Sortie |
|---|---|---|---|---|
| 28 | 3 | 0 | 1 | 26 |
| 28 | 3 | 1 | 1 | **28** |
| 28 | 5 | 2 | 1 | **28** |
| 28 | 3 | 1 | 2 | 14 |
| 32 | 7 | 3 | 2 | 16 |
| 224 | 7 | 3 | 2 | 112 |
| 28 | 4 | 1 | 3 | 9 |

Les deux lignes en gras donnent la règle la plus utile : **`p = (k−1)/2` conserve la taille** pour un noyau impair et un pas de 1. C'est pour ça que `padding=1` accompagne systématiquement les noyaux 3×3, et `padding=2` les 5×5. Sans remplissage, chaque convolution rogne `k−1` pixels, et vingt couches rognent quarante pixels — une image 28×28 n'y survit pas.

PyTorch accepte aussi `padding="same"`, et il faut connaître ses deux limites, mesurées :

- avec un noyau **pair** (`k=4`, `s=1`), ça fonctionne mais lève un `UserWarning` : PyTorch doit fabriquer une copie remplie de l'entrée, parce que le remplissage nécessaire est asymétrique ;
- avec un **pas supérieur à 1**, c'est refusé : `ValueError: padding='same' is not supported for strided convolutions`.

**Le réflexe en cas de doute** : faire passer un tenseur et afficher la forme, couche par couche. Les erreurs de forme en PyTorch se lisent mal, et deux lignes de vérification valent mieux qu'une demi-heure de calcul mental.

## Le champ réceptif : ce qu'un neurone de sortie voit réellement

Le **champ réceptif** d'un neurone est la zone de l'image d'entrée qui influence sa valeur. C'est la quantité qui dit si une architecture *peut* reconnaître un objet : un neurone dont le champ fait 7 pixels ne verra jamais un objet de 50 pixels, quel que soit l'entraînement.

Mesuré en traçant quels pixels d'entrée influencent le pixel central de la sortie :

| Architecture | Champ réceptif | Paramètres à 64 canaux |
|---|---|---|
| une conv 3×3 | 3×3 | 36 864 |
| **deux conv 3×3 empilées** | **5×5** | **73 728** |
| une conv 5×5 | 5×5 | 102 400 |
| **trois conv 3×3 empilées** | **7×7** | **110 592** |
| une conv 7×7 | 7×7 | 200 704 |

**Deux 3×3 empilées voient exactement la même zone qu'une 5×5, pour 28 % de paramètres en moins. Trois 3×3 valent une 7×7, pour 45 % de moins.** Et l'empilement intercale deux non-linéarités de plus, donc il est strictement plus expressif à champ égal.

C'est l'argument de VGG, et c'est la raison pour laquelle **toutes les architectures modernes n'utilisent presque plus que des 3×3**. Les gros noyaux ne subsistent qu'en toute première couche, où le nombre de canaux d'entrée est petit (3) et où le coût reste donc faible.

Le champ croît linéairement avec la profondeur — `2n+1` pour `n` couches 3×3 — et c'est lent :

```
 10 couches 3x3 -> champ de  21 pixels
 50 couches     -> champ de 101 pixels
100 couches     -> champ de 201 pixels
112 couches     -> champ de 225 pixels
```

**Il faudrait 112 couches 3×3 pour qu'un neurone voie une image 224×224 en entier.** Aucune architecture ne fait ça, et c'est exactement pourquoi elles réduisent toutes la résolution. Mesuré sur trois convolutions 3×3, en changeant seulement ce qu'on intercale :

| Trois conv 3×3, avec… | Champ réceptif |
|---|---|
| rien | 7 pixels |
| deux convolutions de pas 2 | 9 pixels |
| **deux `MaxPool2d(2)`** | **15 pixels** |

**La réduction de résolution fait croître le champ multiplicativement au lieu de linéairement** : chaque pixel d'une carte réduite représente déjà deux pixels d'entrée, donc chaque convolution suivante couvre deux fois plus de terrain. C'est la vraie fonction du sous-échantillonnage dans un CNN — bien plus que l'économie de calcul.

Pooling ou convolution de pas 2 : les deux réduisent, le pooling donne un champ plus large à profondeur égale, la convolution de pas 2 **apprend** sa réduction au lieu de l'imposer. Les architectures récentes préfèrent le pas 2 ; le pooling reste plus simple et sans paramètre.

## La tête du réseau : `Flatten` contre moyenne globale

Après le tronc convolutif, il faut passer d'une carte de caractéristiques à un vecteur de classes. Deux façons, et l'écart est considérable. Mesuré sur un petit tronc à 64 canaux de sortie, entrée 32×32 :

| Tête | Paramètres du modèle | Dont la tête | Part |
|---|---|---|---|
| `Flatten` + `Linear` | 60 458 | 40 970 | **67,8 %** |
| `AdaptiveAvgPool2d(1)` + `Linear` | **20 138** | **650** | **3,2 %** |

**La tête `Flatten` pèse plus que les deux tiers du modèle.** Elle relie chaque position de chaque canal à chaque classe, donc son coût est proportionnel à la surface de la carte — alors que le tronc, lui, est indépendant de la taille de l'image.

La **moyenne globale** (*global average pooling*) réduit chaque canal à sa moyenne spatiale : 64 canaux donnent 64 nombres, quelle que soit la taille de la carte. Elle divise ici le modèle par trois.

Et elle apporte une propriété que `Flatten` n'a pas. La même architecture, sur une image deux fois plus grande :

```
Flatten  entree  32x32 -> sortie (2, 10)
Flatten  entree  64x64 -> RuntimeError: mat1 and mat2 shapes cannot be
                          multiplied (2x16384 and 4096x10)
GAP      entree  32x32 -> sortie (2, 10)
GAP      entree  64x64 -> sortie (2, 10)
```

**Un réseau à tête `Flatten` est verrouillé sur une seule taille d'image** — changer la résolution d'entrée casse le modèle, et c'est un problème concret dès qu'on veut évaluer sur des images recadrées autrement. Un réseau à moyenne globale accepte n'importe quelle taille.

Le prix de la moyenne globale : elle jette l'information de position. Pour « y a-t-il un chat », c'est sans importance. Pour « où est le chat », il faut garder la carte.

## Au-delà de trente couches, le gradient ne passe plus — et deux mécanismes le réparent

Empiler des couches a une limite, et elle n'est pas la mémoire. Mesuré sur des piles de blocs `Conv2d 3×3 → normalisation → ReLU`, norme du gradient de la **première** convolution :

| Blocs | Simple, sans norm. | Résiduel, sans norm. | Simple, avec BatchNorm | **Résiduel + BatchNorm** |
|---|---|---|---|---|
| 5 | 7,09·10⁻⁵ | 6,34·10⁻¹ | 1,46·10⁻¹ | **8,76·10⁻¹** |
| 15 | 1,32·10⁻¹² | 6,00 | 0,9995 | **2,58** |
| 30 | **0,000** | 59,3 | 14,2 | **6,04** |
| 50 | **0,000** | 3,09·10⁴ | 494 | **11,3** |

Quatre lectures, et elles se contredisent utilement.

**Première colonne : le problème est réel et brutal.** Sans normalisation ni raccourci, le gradient de la première couche atteint **exactement zéro** à 30 blocs — pas « très petit » : zéro machine en float32. Le réseau a 30 couches dont les premières ne recevront jamais rien.

**Deuxième colonne : les connexions résiduelles réparent l'évanouissement, et créent l'inverse.** `sortie = x + f(x)` donne au gradient un chemin additif qui traverse la pile sans être multiplié. Il survit — et il **explose** : 3,1·10⁴ à 50 blocs, parce que chaque bloc ajoute sa contribution à l'amplitude du signal.

**Troisième colonne : la BatchNorm seule suffit contre l'évanouissement.** Sans aucun raccourci, 494 à 50 blocs. Le récit habituel « les connexions résiduelles résolvent l'évanouissement du gradient » n'est donc pas ce que la mesure montre quand une normalisation est présente : les deux mécanismes répondent au même problème **indépendamment**.

**Quatrième colonne : c'est la combinaison qui tient.** De 0,88 à 11,3 entre 5 et 50 blocs, c'est la seule colonne qui reste dans une plage exploitable à toutes les profondeurs. Normalisation **et** raccourcis : c'est précisément la recette de ResNet, et la mesure dit pourquoi aucun des deux ne se suffit.

```python
class BlocResiduel(nn.Module):
    def __init__(self, c):
        super().__init__()
        self.conv = nn.Conv2d(c, c, 3, padding=1, bias=False)
        self.bn   = nn.BatchNorm2d(c)
    def forward(self, x):
        return torch.relu(x + self.bn(self.conv(x)))     # le + est tout l'enjeu
```

Les architectures marquantes se lisent dans cet ordre : LeNet, AlexNet, VGG (l'empilement de 3×3), **ResNet** (le raccourci), puis les familles EfficientNet et ConvNeXt qui industrialisent le compromis profondeur/largeur/résolution.

## Le goulot 1×1, pour payer moins cher la profondeur

Une convolution 1×1 ne regarde qu'un pixel — elle ne capte donc aucun motif spatial. Son rôle est de **recombiner les canaux** : passer de 256 canaux à 64 est une projection linéaire appliquée en chaque position.

C'est ce qui permet le *goulot* (*bottleneck*) de ResNet : réduire les canaux, faire le travail spatial sur peu de canaux, puis les restaurer. Mesuré à 256 canaux, même forme de sortie :

| Bloc | Paramètres |
|---|---|
| une conv 3×3 de 256 vers 256 | 589 824 |
| **1×1 vers 64, puis 3×3, puis 1×1 vers 256** | **69 632** |

**Huit fois et demie moins de paramètres pour la même forme de sortie et un champ réceptif identique.** C'est ce qui rend praticables les réseaux à 50, 101 et 152 couches : sans goulot, leur coût serait hors de portée.

## Transfert : geler les poids ne gèle pas la BatchNorm

Le transfert d'apprentissage est le réflexe pratique du module : partir d'un modèle pré-entraîné, remplacer la tête, geler le tronc. Le geste habituel pour geler :

```python
for p in tronc.parameters():
    p.requires_grad = False
```

**Il ne suffit pas.** Mesuré sur un tronc dont *tous* les paramètres sont à `requires_grad = False`, après 20 passes avant sur des données de distribution très différente :

| État de `running_mean` | Valeurs |
|---|---|
| au départ | 0,000 ; 0,000 ; 0,000 ; 0,000 |
| après 20 passes en mode `train()` | **−0,351 ; −2,493 ; 0,748 ; −2,299** |
| après 20 passes en mode `eval()` | 0,000 ; 0,000 ; 0,000 ; 0,000 |

Déplacement moyen : **2,2485 en mode `train()`, exactement 0,0000 en mode `eval()`**.

**`running_mean` et `running_var` ne sont pas des paramètres**, ce sont des tampons (*buffers*). `requires_grad` ne les concerne pas : ils sont mis à jour par la **passe avant**, pas par la rétropropagation. Un tronc « gelé » laissé en mode `train()` voit donc ses statistiques de normalisation dériver vers celles de tes données à chaque lot — c'est-à-dire que le tronc pré-entraîné dont tu voulais préserver le savoir se dénature silencieusement.

C'est l'un des bugs les plus coûteux du transfert d'apprentissage, parce qu'il ne lève rien et ne se voit que sur le score. La parade tient en une ligne, à appliquer **après** chaque `model.train()` :

```python
model.train()
tronc.eval()                      # fige les statistiques du tronc gele
```

## Au clavier

```python
import torch, torch.nn as nn

def bloc(entree, sortie, reduire=False):
    return nn.Sequential(
        nn.Conv2d(entree, sortie, 3, padding=1, stride=2 if reduire else 1, bias=False),
        nn.BatchNorm2d(sortie),                 # 1. pas de biais quand une BatchNorm suit
        nn.ReLU(),
    )

reseau = nn.Sequential(
    bloc(3, 32), bloc(32, 32, reduire=True),    # 2. des 3x3 empilees, jamais des 7x7
    bloc(32, 64), bloc(64, 64, reduire=True),
    nn.AdaptiveAvgPool2d(1), nn.Flatten(),      # 3. moyenne globale : tete legere, taille libre
    nn.Linear(64, 10),
)

# le controle de formes, avant d'entrainer
x = torch.zeros(2, 3, 64, 64)
for i, mod in enumerate(reseau):
    x = mod(x)
    print(i, type(mod).__name__, tuple(x.shape))
```

Trois réflexes :

1. **Empile des 3×3 plutôt qu'un gros noyau, et réduis la résolution tôt.** Deux 3×3 voient la même zone qu'une 5×5 pour 28 % de paramètres en moins, et sans sous-échantillonnage il faudrait 112 couches pour qu'un neurone voie une image 224×224 en entier.
2. **Moyenne globale plutôt que `Flatten`.** La tête `Flatten` pesait 67,8 % du modèle mesuré, contre 3,2 % pour la moyenne globale — qui accepte en plus n'importe quelle taille d'image, là où `Flatten` lève une erreur de forme.
3. **En transfert, mets le tronc gelé en `eval()`, pas seulement en `requires_grad = False`.** Les statistiques de BatchNorm sont mises à jour par la passe avant : un tronc « gelé » en mode `train()` a vu sa `running_mean` dériver de 2,25 en vingt lots, sans aucune erreur.
