La boucle d'entraînement d'un réseau tient en cinq lignes, et l'exercice de cette leçon te les fera écrire de mémoire. Ce que la boucle ne dit pas, c'est **comment choisir ce qui l'entoure** : la taille du lot, le pas, l'optimiseur, les couches de régularisation. Ces quatre décisions se mesurent, et c'est le sujet de cette leçon.

## Le gradient d'un mini-lot est une estimation, et son bruit se chiffre

La descente de gradient stochastique ne calcule jamais le vrai gradient : elle l'estime sur un échantillon. La question « quelle taille de lot » est donc la question « quelle qualité d'estimation ».

Mesuré sur 4 096 exemples, en comparant le gradient de chaque mini-lot au gradient calculé sur la totalité du jeu (norme 0,32223), moyenne sur 40 tirages :

| Taille du lot | Écart au vrai gradient | Écart × √B | Cosinus avec le vrai gradient |
|---|---|---|---|
| 8 | 0,30455 | 0,861 | **0,763** |
| 32 | 0,14104 | 0,798 | 0,912 |
| 128 | 0,08419 | 0,952 | 0,960 |
| 512 | 0,04726 | 1,069 | 0,987 |
| 2 048 | 0,02480 | 1,122 | **0,996** |

**La troisième colonne est presque constante : le bruit décroît comme `1/√B`.** Quadrupler le lot divise le bruit par deux, pas par quatre. La légère dérive de 0,86 à 1,12 vient du tirage avec remise dans un jeu fini : à B = 2 048, un lot recouvre la moitié du jeu et n'est plus un échantillon indépendant.

**La dernière colonne est la plus parlante.** À B = 8, le gradient du lot pointe dans la bonne direction avec un cosinus de **0,763** — il se trompe de près de 40 degrés. À B = 2 048, il est à 0,996. Un petit lot ne fait pas « un petit pas dans la bonne direction », il fait **un pas dans une direction approximative**.

Deux conséquences, et la seconde est contre-intuitive.

**Un gros lot n'est pas gratuitement meilleur.** Mesuré à pas constant (`lr = 0,01`, SGD avec momentum, 12 époques), la perte finale se dégrade quand le lot grandit : **0,0771 à B = 32, 0,2006 à B = 128, 0,2911 à B = 512**. Le lot de 512 donne un gradient quatre fois plus précis — et un résultat quatre fois pire, parce qu'à budget d'époques égal il fait **seize fois moins de pas**. La précision du gradient ne sert à rien si on ne s'en sert pas pour avancer.

**Donc changer la taille du lot oblige à rerégler le pas.** La règle d'échelle linéaire (`lr` proportionnel à `B`) est l'heuristique habituelle ; je ne l'ai pas reproduite proprement sur ce problème — mes meilleurs pas mesurés sont 0,01 à B = 32, 0,64 à B = 128 et 0,16 à B = 512, sans monotonie exploitable, et les écarts entre les trois meilleurs sont inférieurs à 0,001 de perte. **Retiens donc la direction, pas le facteur** : un lot plus grand demande un pas plus grand, et le bon pas se cherche après chaque changement de lot.

**Et le bruit n'est pas qu'un défaut.** C'est aussi ce qui permet de sortir des minima étroits : un gradient exact suivrait la pente jusqu'au premier creux rencontré. Le lot moyen de 32 à 256 n'est pas un compromis de mémoire, c'est un réglage de régularisation.

## Trouver le pas en une passe : le test de plage

Chercher le taux d'apprentissage par grille coûte un entraînement complet par valeur. Le **test de plage** le trouve en une seule passe : on part d'un pas minuscule et on le multiplie à chaque itération, en relevant la perte.

```python
opt = torch.optim.SGD(m.parameters(), lr=1e-6)
for i in range(300):
    lr = 1e-6 * (10 ** (6 * i / 300))          # de 1e-6 a 1e0, geometriquement
    for grp in opt.param_groups:
        grp["lr"] = lr
    opt.zero_grad(); perte = crit(m(Xb), yb); perte.backward(); opt.step()
    courbe.append((lr, perte.item()))
```

Mesuré sur 300 pas, lots de 128 :

| Pas | Perte |
|---|---|
| 1,0·10⁻⁶ | 0,6674 |
| 1,0·10⁻⁵ | 0,6740 |
| 1,0·10⁻³ | 0,6709 |
| 1,6·10⁻² | 0,6306 |
| 6,3·10⁻² | 0,5359 |
| 2,5·10⁻¹ | 0,3524 |
| 8,3·10⁻¹ | **0,1844** — minimum |
| 9,6·10⁻¹ | divergence |

La courbe a trois régions. **Un plateau** jusqu'à 10⁻³ : le pas est si petit que rien ne se passe — la perte de départ 0,6674 n'a pas bougé après deux cents itérations. **Une descente** de 1,6·10⁻² à 8,3·10⁻¹. **Une divergence** immédiatement après.

**Et le pas à retenir n'est pas celui du minimum.** À 8,3·10⁻¹ on est à un cheveu de la divergence, qui arrive à 9,6·10⁻¹ : il n'y a aucune marge pour la suite de l'entraînement, où le paysage change. On prend un pas **au milieu de la descente**, typiquement dix fois sous le minimum — ici autour de 5·10⁻² à 1·10⁻¹.

Trois cents itérations contre un entraînement complet par valeur testée : c'est le meilleur rapport information/temps de tout le réglage d'un réseau.

## Ce que coûte un optimiseur, en mémoire

Un optimiseur garde un état par paramètre, et cet état occupe la mémoire du GPU exactement comme les poids. Mesuré sur un réseau de 66 817 paramètres, en comptant les tenseurs d'état réellement alloués après trois pas :

| Optimiseur | État gardé | Mémoire totale / poids |
|---|---|---|
| SGD | 0 | **1,0×** |
| SGD + momentum | 66 816 | 2,0× |
| RMSprop | 66 816 | 2,0× |
| Adam | 133 632 | **3,0×** |
| AdamW | 133 632 | 3,0× |

**Adam garde deux tenseurs par paramètre** — la moyenne des gradients et celle de leurs carrés — donc il triple l'empreinte des poids. Sur un modèle d'un milliard de paramètres en float32, cela fait 4 Go de poids et **8 Go d'état d'optimiseur**, avant même de compter les gradients et les activations.

C'est le levier qu'on oublie quand un entraînement ne tient pas en mémoire : **passer d'Adam à SGD avec momentum libère l'équivalent d'un modèle entier**, et le passer en SGD pur en libère deux. Le prix est un réglage de pas plus délicat et une convergence plus lente — mais tenir en mémoire n'est pas négociable.

## Le `weight_decay` d'Adam n'est pas celui d'AdamW

Erreur de premier ordre, et elle est silencieuse. Mesuré sur le même réseau, 3 000 pas, `lr = 10⁻³` :

| Optimiseur | Perte finale | Norme des poids | Accuracy |
|---|---|---|---|
| Adam, `wd = 0` | 0,0686 | 16,538 | 97,5 % |
| Adam, `wd = 0,1` | 0,4427 | 2,154 | 84,3 % |
| **AdamW, `wd = 0,1`** | **0,0685** | 18,092 | **97,5 %** |
| Adam, `wd = 1,0` | 0,6931 | **0,000** | **50,0 %** |
| **AdamW, `wd = 1,0`** | **0,0700** | 15,361 | **97,5 %** |

**À `wd = 1,0`, Adam écrase tous les poids à zéro et le modèle répond au hasard.** AdamW, au même réglage, ne perd rien du tout — 97,5 % contre 50,0 %.

**La cause** : dans Adam, le terme de régularisation est ajouté **au gradient**, donc il passe ensuite dans la normalisation adaptative. Les paramètres à faible gradient historique voient leur pénalité **amplifiée**, et la régularisation ne pénalise plus uniformément : elle pénalise d'autant plus fort que le paramètre bouge peu. AdamW **découple** le terme : il le soustrait directement des poids, après la mise à jour adaptative, ce qui est la définition qu'on croyait appliquer.

**En pratique : `AdamW` par défaut, toujours.** `Adam(weight_decay=...)` n'est pas une décroissance de poids au sens usuel, et la valeur qui marche pour l'un ne marche pas pour l'autre.

## BatchNorm : trois choses que la documentation ne met pas en avant

**Un lot de 1 lève une erreur en mode entraînement.**

```
ValueError: Expected more than 1 value per channel when training,
got input size torch.Size([1, 8])
```

C'est logique — la variance d'un seul exemple n'existe pas — mais ça casse un entraînement au tout dernier lot d'une époque quand la taille du jeu n'est pas divisible par la taille du lot. La parade est `drop_last=True` dans le `DataLoader`, ou `nn.GroupNorm` / `nn.LayerNorm`, qui normalisent sur les canaux et non sur le lot.

**Le biais de la couche précédente devient inutile.** Mesuré sur une `Linear(8, 16)`, norme du gradient de son biais après une passe :

| Configuration | Norme du gradient du biais |
|---|---|
| sans BatchNorm derrière | 2,565·10⁻¹ |
| **avec BatchNorm derrière** | **2,387·10⁻⁸** |

Huit ordres de grandeur, c'est-à-dire zéro à la précision machine. BatchNorm **retire la moyenne du lot**, donc tout décalage constant ajouté juste avant est effacé avant d'atteindre la couche suivante. Le biais existe, consomme de la mémoire, reçoit un gradient numériquement nul et ne sert à rien. D'où la convention des architectures sérieuses : `nn.Conv2d(..., bias=False)` dès qu'une BatchNorm suit.

**Les statistiques courantes sont une moyenne mobile, et elles ont besoin de temps.** BatchNorm accumule `running_mean` et `running_var` avec un `momentum` de 0,1 par défaut : chaque lot ne corrige l'estimation que de 10 %. Après **une seule** passe sur une entrée de moyenne 5 et d'écart-type 3, les statistiques accumulées valent `moyenne = 0,519` et `variance = 1,816` — très loin des valeurs réelles, parce qu'elles partent de 0 et 1.

Conséquence pratique : **un modèle sauvegardé après trop peu d'itérations embarque des statistiques fausses**, et il se comportera mal en inférence alors que son entraînement se passait bien. Il faut quelques dizaines de lots pour que ces moyennes convergent.

## Dropout met à l'échelle à l'entraînement, pas à l'inférence

Naïvement, éteindre la moitié des neurones devrait diviser par deux le signal qui arrive à la couche suivante — et il faudrait corriger à l'inférence. PyTorch fait l'inverse, et c'est la bonne façon. Mesuré sur une entrée constante à 1,0 avec `p = 0,5` :

| Mode | Moyenne de sortie | Part de zéros | Valeur des survivants |
|---|---|---|---|
| `train()` | **1,0004** | 50,0 % | **2,0** |
| `eval()` | 1,0000 | 0,0 % | 1,0 |

**Les survivants sont multipliés par 2, donc la moyenne est préservée.** C'est le *dropout inversé* : le facteur correctif est `1/(1−p)` et il est appliqué à l'entraînement. L'inférence, elle, ne fait **rien du tout** — le module est l'identité en mode `eval`.

Pourquoi c'est le bon choix : l'inférence est le chemin chaud, exécuté des milliards de fois en production, et il ne doit porter aucun coût de correction. Avec `p = 0,9`, le facteur vaut 10 — ce qui dit aussi pourquoi un taux élevé déstabilise l'entraînement : les activations survivantes sont multipliées par dix, et leur variance par cent.

## L'accumulation de gradient, et le facteur qu'on oublie

PyTorch additionne les gradients d'un `backward()` à l'autre. C'est la propriété qui rend `zero_grad()` nécessaire — et c'est aussi une fonctionnalité : elle permet de simuler un gros lot qui ne tiendrait pas en mémoire.

Mesuré en comparant le gradient d'un lot de 256 à celui de quatre micro-lots de 64 accumulés :

| Méthode | Écart au gradient du lot de 256 | Rapport des normes |
|---|---|---|
| perte **non** divisée | 9,379·10⁻¹ | **4,000** |
| perte divisée par 4 | **3,498·10⁻⁸** | 1,000 |

**Sans la division, le gradient accumulé est exactement quatre fois trop grand** — le rapport mesuré est 4,000, pas 3,97. Avec la division, l'écart est de 3,5·10⁻⁸ : c'est l'équivalence exacte, à la précision du float32.

```python
N_ACC = 4                                        # lot effectif = 4 x taille du micro-lot
opt.zero_grad()
for i, (Xb, yb) in enumerate(loader):
    (crit(m(Xb), yb) / N_ACC).backward()         # la division est OBLIGATOIRE
    if (i + 1) % N_ACC == 0:
        opt.step()
        opt.zero_grad()
```

Le piège est silencieux : oublier la division multiplie le pas effectif par `N_ACC`, ce qui ressemble à un taux d'apprentissage mal réglé et se diagnostique mal.

## Les schedules, et un résultat nul qu'il faut dire

Faire décroître le pas au fil de l'entraînement est la pratique standard : un grand pas au début pour traverser le paysage, un petit pas à la fin pour se poser dans le creux. Les trois formes courantes sont le **palier** (`StepLR`, division par 10 à intervalles fixes), le **cosinus** (`CosineAnnealingLR`, décroissance douce jusqu'à zéro), et le pas **constant**.

Mesuré à budget de pas identique (1 500 pas, `lr₀ = 0,2`, SGD avec momentum) :

| Schedule | Perte finale | Accuracy |
|---|---|---|
| constant | 0,0699 | 97,41 % |
| paliers | 0,0698 | 97,53 % |
| cosinus | 0,0692 | 97,53 % |

**Aucun écart exploitable** — un dixième de point d'accuracy, soit moins que la variation entre deux graines. Sur ce problème, le schedule ne sert à rien, et je ne vais pas prétendre le contraire.

Ce que ce résultat nul apprend : **le schedule est un réglage de fin de parcours, pas un remède**. Il devient utile quand la perte stagne alors que les gradients sont encore grands, c'est-à-dire quand le pas est devenu trop grand pour le creux où l'on se trouve. Sur un problème à deux variables qui converge en mille pas, ce moment n'arrive jamais. Avant de brancher un `CosineAnnealingLR`, vérifie que le symptôme existe.

## Au clavier

```python
import torch, torch.nn as nn

# 1. trouver le pas en une passe, avant de lancer l'entrainement complet
def test_de_plage(m, lots, lr_min=1e-6, lr_max=1.0, n=300):
    opt, crit, courbe = torch.optim.SGD(m.parameters(), lr=lr_min), nn.BCEWithLogitsLoss(), []
    for i, (Xb, yb) in zip(range(n), lots):
        for grp in opt.param_groups:
            grp["lr"] = lr_min * (lr_max / lr_min) ** (i / n)
        opt.zero_grad(); p = crit(m(Xb), yb); p.backward(); opt.step()
        courbe.append((grp["lr"], p.item()))
    return courbe                                 # on lit le milieu de la descente

# 2. AdamW, pas Adam(weight_decay=...)
opt = torch.optim.AdamW(m.parameters(), lr=5e-2, weight_decay=0.01)

# 3. pas de biais quand une BatchNorm suit, et drop_last pour eviter le lot de 1
bloc = nn.Sequential(nn.Conv2d(3, 32, 3, padding=1, bias=False),
                     nn.BatchNorm2d(32), nn.ReLU())
loader = torch.utils.data.DataLoader(jeu, batch_size=128, shuffle=True, drop_last=True)
```

Trois réflexes :

1. **Un test de plage avant tout entraînement long.** Trois cents itérations donnent le plateau, la descente et le point de divergence ; on retient un pas au milieu de la descente, pas le minimum, qui est déjà au bord de la rupture.
2. **`AdamW`, et compter la mémoire de l'optimiseur.** `Adam(weight_decay=1.0)` a écrasé tous les poids à zéro et ramené l'accuracy à 50 % là où `AdamW` gardait 97,5 %. Et Adam triple l'empreinte des poids : quand un entraînement ne tient pas, c'est le premier levier.
3. **Changer la taille du lot, c'est changer deux choses.** Le bruit du gradient décroît en `1/√B` — cosinus de 0,763 à B = 8 contre 0,996 à B = 2 048 — mais à budget d'époques égal un gros lot fait beaucoup moins de pas : la perte est passée de 0,0771 à 0,2911 entre B = 32 et B = 512, à pas constant. Un nouveau lot demande un nouveau pas.
