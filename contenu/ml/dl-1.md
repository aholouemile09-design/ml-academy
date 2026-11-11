Un neurone calcule une somme pondérée puis applique une **fonction d'activation** non linéaire :

```
sortie = activation(w·x + b)
```

Tout le reste de cette leçon porte sur trois décisions qui déterminent si un réseau s'entraîne — **l'activation, l'initialisation, la forme** — et dont deux sont presque toujours traitées comme des détails de style. Elles ne le sont pas, et chacune se mesure.

## L'activation ne se choisit pas par habitude : c'est sa dérivée qui décide

La rétropropagation multiplie les dérivées de couche en couche. La valeur qui compte pour une activation n'est donc pas sa forme mais **le maximum de sa dérivée**, parce qu'il borne ce que le gradient peut traverser.

| Activation | Dérivée maximale | Conséquence sur 12 couches |
|---|---|---|
| sigmoïde | **0,250000** (mesuré, en z = 0) | `0,25¹² ≈ 6·10⁻⁸` au mieux |
| tanh | **1,000000** (mesuré, en z = 0) | pas d'atténuation structurelle |
| ReLU | 1 pour z > 0, 0 sinon | 1 sur le chemin actif, 0 ailleurs |

Les deux premières lignes sont des mesures, pas des approximations : la dérivée de la sigmoïde vaut `σ(1−σ)`, maximale en `σ = 0,5`, donc exactement **0,25**. Et comme `0,25¹⁰ = 9,5·10⁻⁷` et `0,25²⁰ = 9,1·10⁻¹³`, une pile de couches sigmoïdes éteint son propre gradient par simple arithmétique.

Vérifié sur un réseau de 12 couches de largeur 64, **même initialisation** dans les trois cas, norme du gradient des poids :

| Activation | Couche 1 | Couche 13 | Rapport |
|---|---|---|---|
| sigmoïde | **1,94·10⁻⁷** | 1,50 | **7 751 724** |
| tanh | 1,10 | 1,89 | 2 |
| ReLU | 0,99 | 16,02 | 16 |

**La première couche d'un réseau sigmoïde reçoit un gradient sept millions de fois plus faible que la dernière.** Elle n'est pas mal entraînée, elle n'est **pas entraînée** : les premières couches, celles qui voient les données brutes, restent à leur valeur initiale pendant que les dernières apprennent.

Ce que ça fixe en pratique :

- **ReLU dans les couches cachées**, par défaut, et ses variantes modernes (GELU, SiLU) dans les architectures récentes ;
- **sigmoïde uniquement en sortie** d'une classification binaire, et **softmax** en sortie d'une multiclasse ;
- **tanh** quand on veut une sortie centrée et bornée, ce qui reste le cas dans les cellules récurrentes de la leçon 4.

## ReLU meurt, et sa mort ne se voit sur aucun score

Un neurone ReLU dont la somme pondérée est négative pour **toutes** les entrées produit zéro partout. Sa dérivée est alors zéro partout, donc il ne reçoit plus de gradient, donc ses poids ne bougeront plus jamais. Il est mort, définitivement.

Mesuré sur un réseau 2-128-128-1, SGD, 800 pas, part des neurones jamais activés sur l'intégralité du jeu de données :

| Taux d'apprentissage | Morts, couche 1 | Morts, couche 2 | Accuracy |
|---|---|---|---|
| 0,01 | 8,6 % | 12,5 % | 87,5 % |
| 0,5 | 8,6 % | 13,3 % | 99,1 % |
| 2,0 | 8,6 % | **39,8 %** | 99,2 % |
| 5,0 | 15,6 % | **68,8 %** | 98,9 % |

**Lis la dernière ligne dans les deux sens.** Deux tiers de la deuxième couche sont définitivement éteints — et l'accuracy ne bouge pas. Sur ce problème, les neurones survivants suffisaient, donc **aucun score ne signale la perte**. Ce qui a disparu, c'est la capacité : on a payé 128 neurones, on en fait tourner 40.

Je n'ai pas réussi à construire une cible où cette perte dégrade visiblement le résultat, donc je m'en tiens à ce qui est mesuré : **la mort de ReLU est une fuite de capacité silencieuse, pas une panne**. Elle devient un problème quand le problème, lui, a besoin de toute la capacité.

Les parades, par ordre de simplicité : **baisser le taux d'apprentissage** (c'est lui qui pousse les biais dans le négatif), **LeakyReLU** qui laisse passer une petite pente négative, **GELU** qui est partout dérivable. Et le contrôle, en deux lignes, qu'aucun tutoriel ne montre :

```python
with torch.no_grad():
    a = torch.relu(couche(X))            # activations sur TOUT le jeu
    print("morts :", (a.max(dim=0).values == 0).float().mean().item())
```

## À zéro, un réseau n'apprend rien — et le vrai coupable est la symétrie

L'initialisation est le paramètre qu'on ne règle jamais, parce que PyTorch en met un par défaut. Mesuré sur deux classes en croissants entrelacés, 1 000 points, réseau 2-32-32-1 avec ReLU, Adam, 1 500 pas :

| Initialisation | Perte finale | Accuracy | Diversité entre neurones |
|---|---|---|---|
| tous les poids à 0 | 0,6931 | **50,0 %** | **0,000·10⁰** |
| tous les poids à 0,5 | 0,2725 | 86,8 % | **0,000·10⁰** |
| He (le défaut de PyTorch) | 0,0190 | **99,3 %** | 0,743 |

La dernière colonne est l'explication, et c'est elle qu'il faut retenir : elle mesure **l'écart-type entre les neurones d'une même couche**. À zéro comme à 0,5, il vaut exactement zéro **après 1 500 pas d'entraînement**.

**Le mécanisme** : si deux neurones d'une couche partent avec les mêmes poids, ils calculent la même chose, reçoivent donc le même gradient, et sont mis à jour de la même façon. Ils restent identiques pour toujours. Une couche de 32 neurones initialisée uniformément **n'a qu'un seul neurone effectif**, répété 32 fois — et aucun entraînement ne brisera cette symétrie, parce que rien ne distingue les neurones les uns des autres.

`0,6931` n'est pas un nombre quelconque : c'est `ln 2`, la perte d'un modèle qui répond 0,5 à tout. Et 86,8 % avec des poids à 0,5 est le piège : un score qui a l'air de marcher, produit par un réseau dont 31 neurones sur 32 sont décoratifs à chaque couche.

**L'aléatoire de l'initialisation n'est donc pas un pis-aller, c'est la condition pour que les neurones puissent se spécialiser.** Les biais, eux, peuvent partir à zéro sans problème : ce sont les poids qui doivent différer.

## La bonne échelle d'initialisation se lit sur la variance des activations

Reste à choisir l'amplitude du tirage, et elle se mesure. Variance des activations couche par couche, réseau de 8 couches de largeur 256, ReLU, entrée de variance 1 :

| Initialisation | c0 | c1 | c2 | c4 | c6 | c8 |
|---|---|---|---|---|---|---|
| `N(0 ; 1)` | 1,0 | 87 | 1,0·10⁴ | 1,7·10⁸ | 2,8·10¹² | **3,7·10¹⁶** |
| `N(0 ; 0,01)` | 1,0 | 8,7·10⁻³ | 1,0·10⁻⁴ | 1,7·10⁻⁸ | 2,8·10⁻¹² | **3,7·10⁻¹⁶** |
| Xavier / Glorot | 1,0 | 0,34 | 0,16 | 0,040 | 9,9·10⁻³ | 2,0·10⁻³ |
| **He / Kaiming** | 1,0 | 0,68 | 0,63 | 0,64 | 0,64 | **0,51** |

Les deux premières lignes sont les deux façons de se tromper, et elles sont symétriques : **trop grand, les activations explosent de seize ordres de grandeur en huit couches ; trop petit, elles s'écrasent d'autant.** Dans les deux cas le réseau est inutilisable avant même le premier pas d'optimisation.

**Xavier perd la moitié de la variance à chaque couche** — 0,34 puis 0,16 puis 0,040. Ce n'est pas un défaut : Xavier a été dérivé pour des activations symétriques comme tanh, où la sortie moyenne est nulle. ReLU, elle, met la moitié des valeurs à zéro, donc divise la variance par deux à chaque passage. **He corrige exactement ce facteur 2** (`Var = 2/n` au lieu de `1/n`), et la mesure le confirme : la variance reste autour de 0,5 à 0,7 sur les huit couches.

```python
nn.init.kaiming_normal_(couche.weight, nonlinearity="relu")   # pour ReLU
nn.init.xavier_normal_(couche.weight)                          # pour tanh, sigmoide
```

**Et le piège de lecture, pour finir.** Avec tanh, l'initialisation `N(0 ; 1)` donne une variance remarquablement stable :

| tanh, 8 couches | c1 | c2 | c4 | c6 | c8 |
|---|---|---|---|---|---|
| `N(0 ; 1)` — variance | 0,95 | 0,95 | 0,95 | 0,95 | 0,95 |
| `N(0 ; 1)` — part de `\|a\| > 0,99` | **87 %** | 87 % | 87 % | 87 % | 87 % |
| Xavier — variance | 0,39 | 0,24 | 0,13 | 0,07 | 0,07 |
| Xavier — part de `\|a\| > 0,99` | 1 % | 0 % | 0 % | 0 % | 0 % |

**La variance est stable parce que 87 % des activations sont saturées à ±1.** C'est le pire cas possible, déguisé en stabilité : une activation saturée a une dérivée quasi nulle, donc ne transmet rien. Une seule statistique ne suffit pas à juger une initialisation — **il faut regarder la variance et la saturation ensemble.**

## Le théorème d'approximation universelle est vrai, et il ne sert à rien

**Théorème d'approximation universelle** : un réseau à une seule couche cachée suffisamment large peut approximer n'importe quelle fonction continue sur un compact, à la précision qu'on veut.

Ce qu'on en déduit d'habitude — « donc une couche suffit » — est faux, et pour trois raisons.

**Le théorème est non constructif.** Il affirme qu'il *existe* un jeu de poids qui approxime la fonction. Il ne dit pas comment le trouver, et la descente de gradient n'est pas garantie d'y arriver.

**Il ne borne pas la largeur.** « Suffisamment large » peut vouloir dire un nombre de neurones qui croît exponentiellement avec la précision demandée.

**Il ne parle pas d'apprentissage.** Approximer une fonction qu'on connaît et l'apprendre depuis un échantillon fini sont deux problèmes différents ; le théorème ne traite que le premier.

C'est un résultat d'existence, utile pour savoir qu'on ne se heurte pas à une impossibilité théorique — et sans aucune portée sur le choix d'architecture.

## Profondeur contre largeur, à budget de paramètres égal

L'affirmation « la profondeur est plus efficace que la largeur » se vérifie, à condition de comparer à **budget de paramètres constant** — sinon on mesure seulement que les gros modèles font mieux.

Cible : une fonction en dents de scie à 4 dents sur [0,1], Adam, 6 000 pas, quatre architectures d'environ 2 300 paramètres chacune :

| Architecture | Paramètres | MSE finale |
|---|---|---|
| une couche de 740 | 2 221 | 1,21·10⁻⁶ |
| deux couches de 48 | 2 497 | 3,07·10⁻⁷ |
| **trois couches de 33** | 2 344 | **3,81·10⁻⁸** |
| quatre couches de 27 | 2 350 | 9,43·10⁻⁸ |

**Trois couches étroites font trente-deux fois mieux qu'une seule large, à budget identique.** La raison est géométrique : chaque couche ReLU plie l'espace d'entrée, et les plis se **composent** d'une couche à l'autre. Une couche unique doit construire chaque dent avec ses propres neurones ; trois couches construisent un motif et le répliquent.

**Et la limite, honnêtement.** Avec la même cible portée à 32 dents et le même budget, **les quatre architectures échouent pareillement** (MSE entre 5,9·10⁻² et 6,9·10⁻²). L'avantage de la profondeur est réel mais il ne remplace pas la capacité : à budget fixé, il existe une complexité de cible au-delà de laquelle aucune forme ne sauve le réseau. Et on le voit, ici encore, en comparant à une référence — la variance de la cible — plutôt qu'en lisant une perte dans le vide.

## Au clavier

```python
import torch, torch.nn as nn

def reseau(entree, caches, sortie):
    couches, prec = [], entree
    for n in caches:
        lin = nn.Linear(prec, n)
        nn.init.kaiming_normal_(lin.weight, nonlinearity="relu")   # 1. He pour ReLU
        nn.init.zeros_(lin.bias)                                   #    biais a zero : sans danger
        couches += [lin, nn.ReLU()]
        prec = n
    couches.append(nn.Linear(prec, sortie))                        # 2. pas d'activation finale
    return nn.Sequential(*couches)

m = reseau(784, [128, 64], 10)

# 3. le controle de sante : variance des activations couche par couche
x = torch.randn(512, 784)
with torch.no_grad():
    for i, mod in enumerate(m):
        x = mod(x)
        if isinstance(mod, nn.ReLU):
            morts = (x.max(dim=0).values == 0).float().mean().item()
            print(f"couche {i//2}  variance = {x.var():.3f}  neurones morts = {morts:.1%}")
```

Trois réflexes :

1. **ReLU ou GELU dans les couches cachées, jamais sigmoïde.** La dérivée de la sigmoïde plafonne à 0,25, donc douze couches divisent le gradient par sept millions entre la dernière et la première — mesuré.
2. **He pour ReLU, Xavier pour tanh, et jamais une initialisation constante.** Des neurones identiques au départ restent identiques pour toujours : une couche de 32 neurones initialisée uniformément n'en a qu'un seul d'effectif, et le score peut rester trompeusement correct.
3. **Imprime la variance des activations et la part de neurones morts avant d'entraîner.** Une variance qui explose ou s'écrase d'un facteur 10¹⁶ en huit couches se voit en deux lignes, et une variance stable peut cacher 87 % d'activations saturées.
