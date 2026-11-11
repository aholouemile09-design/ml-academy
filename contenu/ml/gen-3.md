Le VAE impose une forme au nuage de codes pour pouvoir y tirer au sort, et paie ce service en netteté. Le GAN prend le chemin inverse : **aucune densité, aucun encodeur, aucune vraisemblance**. Un générateur transforme du bruit en échantillons, un second réseau essaie de les distinguer des vrais, et c'est tout l'apprentissage.

Cette leçon traite de ce qui rend un GAN difficile à conduire : le fait que sa perte ne mesure pas sa qualité, l'effondrement de modes, l'instabilité — dont la mesure donne une version plus précise que le récit habituel — et le seul avantage décisif qu'il garde sur tout le reste.

Les mesures portent sur un mélange de **8 gaussiennes 2D** disposées sur un cercle de rayon 2, écart-type 0,10. Ce choix n'est pas décoratif : les modes sont connus et dénombrables, donc l'effondrement de modes devient une quantité qu'on compte au lieu d'un jugement sur des images. Générateur et discriminateur : `2 → 128 → 128 → sortie`, ReLU, Adam à 2·10⁻⁴ avec β₁=0,5, lots de 256, 6 000 pas.

Trois métriques, toutes calculées sur 5 000 échantillons :

```
precision = part des echantillons a moins de 4 ecarts-types d'un mode
modes     = nombre de modes recevant au moins 1 % des echantillons
energie   = 2·E‖a−b‖ − E‖a−a'‖ − E‖b−b'‖      (distance en energie, 0 = lois identiques)
```

Référence indispensable : **deux échantillons du vrai mélange** donnent précision 0,999, modes 8/8 et énergie 0,00113. C'est le plancher mesurable — une énergie en dessous de ce chiffre est du bruit d'estimation, pas une victoire.

## Le jeu, et la valeur d'équilibre de sa perte

Le discriminateur apprend une classification binaire ordinaire : vrai contre faux. Le générateur apprend à faire échouer cette classification.

```
perte_D = BCE( D(x_reel), 1 ) + BCE( D(G(z)), 0 )
perte_G = BCE( D(G(z)), 1 )                         (version non saturante)
```

Si le générateur devenait parfait, le discriminateur ne pourrait plus faire mieux que répondre 0,5 partout, et sa perte vaudrait exactement :

```
perte_D optimale = −2·ln(0,5) = 2·ln 2 = 1,3863
```

Ce chiffre est la seule chose que la perte du discriminateur t'apprend : la distance à 1,3863 indique s'il gagne ou s'il perd. Elle n'indique **pas** si les échantillons sont bons, et c'est le sujet de la section suivante.

## La perte du discriminateur ne suit pas la qualité

Tracé pendant un entraînement unique, graine 0 :

| Étape | perte_D | perte_G | D(réel) | D(faux) | Précision | Modes | Énergie |
|---|---|---|---|---|---|---|---|
| 0 | 1,370 | 0,699 | 0,511 | 0,497 | 0,000 | 0/8 | 1,41680 |
| 500 | **1,078** | 0,807 | 0,655 | 0,449 | **0,098** | 3/8 | 0,45137 |
| 1 000 | 1,283 | 0,769 | 0,529 | 0,476 | 0,463 | 8/8 | 0,02563 |
| 2 000 | 1,242 | 0,815 | 0,549 | 0,449 | 0,701 | 8/8 | 0,01388 |
| 3 000 | 1,276 | 0,906 | 0,537 | 0,449 | 0,806 | 8/8 | 0,01097 |
| 4 000 | 1,301 | 0,903 | 0,526 | 0,446 | 0,853 | 8/8 | 0,01081 |
| 5 000 | 1,302 | 0,822 | 0,533 | 0,469 | 0,883 | 8/8 | 0,01040 |
| 6 000 | **1,337** | 0,819 | 0,519 | 0,467 | **0,901** | 8/8 | 0,01941 |

Corrélations sur ces treize relevés : **+0,341** entre perte_D et précision, **+0,124** entre perte_D et énergie.

Lis les colonnes extrêmes. La précision passe de 0,098 à 0,901, l'énergie est divisée par **35**, et la perte du discriminateur se promène dans l'intervalle 1,24–1,34 sans tendance. Pire, le pire moment de l'entraînement — l'étape 500, précision 0,098 — est aussi celui où la perte_D est la **plus basse** du tableau (1,078). Lue comme on lit une courbe de perte ordinaire, elle désignerait ce point comme le meilleur.

La raison est structurelle, et c'est la différence essentielle avec tout ce que tu as entraîné jusqu'ici. **La perte d'un GAN ne mesure pas une distance à une cible fixe, elle mesure l'issue d'un duel entre deux réseaux qui changent tous les deux.** Un discriminateur médiocre face à un générateur médiocre donne la même perte qu'un excellent face à un excellent. C'est un score relatif ; il n'a pas d'échelle absolue.

Conséquence pratique, et elle est dure : **tu ne peux pas faire d'arrêt précoce sur la perte, ni choisir un point de contrôle, ni comparer deux configurations sans métrique externe.** Il faut en instrumenter une — ici précision, modes et énergie ; sur des images, FID ou précision/rappel — et c'est la métrique externe, pas la perte, qui décide quand arrêter.

## « Les GAN sont instables » : la mesure est plus précise que le récit

Cinq graines, configuration rigoureusement identique, 6 000 pas :

| Graine | Précision | Modes | Énergie | perte_D finale |
|---|---|---|---|---|
| 0 | 0,922 | 8/8 | 0,00644 | 1,355 |
| 1 | 0,931 | 8/8 | 0,00489 | 1,347 |
| 2 | 0,934 | 8/8 | 0,00362 | 1,362 |
| 3 | 0,905 | 8/8 | 0,00391 | 1,322 |
| 4 | 0,917 | 8/8 | 0,01150 | 1,335 |

Moyennes : précision 0,922 ± 0,010, modes **8/8 dans les cinq cas**, énergie 0,00607 ± 0,00289.

**Sur ce problème, le GAN vanille est stable, et il bat le VAE.** Il faut le dire parce que le discours habituel annonce le contraire. Pour comparaison, le VAE de la leçon 2 variait de 0,671 ± 0,004 en confiance sur cinq graines : son écart relatif était plus faible, mais sa qualité absolue nettement moindre.

Le chiffre à garder est quand même l'énergie : 0,00362 à 0,01150 selon la graine, soit un facteur **3,2 entre la meilleure et la pire** — alors que la perte_D ne varie que de 1,322 à 1,362, soit 3 %. La perte est stable, la qualité ne l'est pas. Encore une fois, elles ne parlent pas de la même chose.

Alors d'où vient la réputation d'instabilité ? De ce que le GAN **reste stable tant qu'un équilibre tient**, et de ce que cet équilibre n'est garanti par rien. La section suivante le casse volontairement.

## L'effondrement de modes est un déséquilibre, et il se voit en deux colonnes

Même modèle, trois graines par ligne, en modifiant seulement le rapport de force entre les deux joueurs :

| Configuration | Modes (3 graines) | Précision (3 graines) | perte_D |
|---|---|---|---|
| équilibré | **8, 8, 8** | 0,922 — 0,931 — 0,934 | 1,35 — 1,35 — 1,36 |
| D : pas 5× plus grand | 7, 8, 7 | 0,935 — 0,929 — 0,927 | 1,24 — 1,18 — 1,12 |
| D : 5 mises à jour par pas de G | **6, 7, 5** | **0,941 — 0,941 — 0,947** | 1,12 — 1,07 — 1,03 |
| G : pas 5× plus grand | **1, 1, 0** | **0,146 — 0,114 — 0,000** | 1,41 — 1,43 — 0,83 |

La troisième ligne est la plus instructive du module. Quand on renforce le discriminateur, **la précision monte (0,941 à 0,947, mieux que l'équilibré) et le nombre de modes tombe à 5 sur 8**. Le générateur n'a pas empiré : il s'est spécialisé. Il a trouvé les quelques modes qu'il reproduit le mieux et a abandonné les autres, parce que rien dans sa perte ne le récompense pour la diversité — on lui demande de tromper le discriminateur, pas de couvrir les données.

```
precision haute + modes bas  =  effondrement de modes
precision basse + modes bas  =  divergence
```

Et la quatrième ligne montre l'autre bord : un générateur trop rapide gagne contre un discriminateur qui n'a pas le temps d'apprendre, et s'effondre sur **un seul mode, voire zéro** — avec une perte_D de 1,41 et 1,43, c'est-à-dire *la valeur d'équilibre théorique*, 1,3863. Les deux configurations les plus proches de la perte « idéale » sont ici les deux pires modèles du tableau.

La parade n'est pas un réglage magique mais une discipline : **mesurer séparément la fidélité et la diversité**. Une seule métrique scalaire, FID compris, mélange les deux et peut masquer un effondrement. En production, le couple précision/rappel calculé dans l'espace des caractéristiques d'un réseau pré-entraîné joue le rôle de nos colonnes « précision » et « modes ».

## La perte non saturante : un argument juste qui ne se déclenche pas toujours

La formulation d'origine donnait au générateur la perte `log(1 − D(G(z)))`, dite saturante. L'argument classique dit qu'elle ne fournit aucun gradient quand le discriminateur est confiant, et qu'il faut lui préférer `−log D(G(z))`. Vérifions les deux moitiés de l'affirmation.

D'abord le gradient. Discriminateur figé, confiance imposée, norme du gradient de la perte du générateur par rapport à ses paramètres :

| D(G(z)) | Non saturante | Saturante | Rapport |
|---|---|---|---|
| 0,5 | 1,343885 | 1,340702 | 1,0× |
| 0,1 | 2,416561 | 0,267988 | **9,0×** |
| 0,01 | 2,657733 | 0,026797 | **99,2×** |
| 10⁻³ | 2,681848 | 0,002680 | **1 000,8×** |
| 10⁻⁴ | 2,684259 | 0,000268 | **10 017,3×** |

L'argument théorique est exact, et le rapport vaut précisément `1 / D(G(z))`. Pour la perte saturante, le gradient est proportionnel à la confiance du discriminateur : dès qu'il rejette les faux avec certitude, le générateur **ne reçoit plus rien** — 0,000268, contre une norme non saturante qui, elle, se stabilise autour de 2,68.

Maintenant la pratique, trois graines par ligne :

| Perte du générateur | Modes | Précision | Énergie |
|---|---|---|---|
| non saturante | 8, 8, 8 | 0,922 — 0,931 — 0,934 | 0,0064 — 0,0049 — 0,0036 |
| saturante | 8, 8, 8 | 0,913 — 0,912 — 0,935 | 0,0054 — 0,0037 — 0,0043 |

**Aucune différence mesurable.** Et la raison est dans le tableau de la section 2 : la colonne `D(faux)` ne descend jamais sous 0,446. Le discriminateur n'est jamais confiant, donc le facteur `1/D(G(z))` ne dépasse jamais 2,2 — un rapport sans effet.

C'est une leçon de méthode plus que de GAN. **Un mécanisme réel peut rester sans effet parce que sa condition de déclenchement n'est pas réunie.** Ici la condition est « un discriminateur qui écrase le générateur », c'est-à-dire exactement l'un des déséquilibres de la section précédente. Sur un problème dur, où le discriminateur gagne facilement, la perte non saturante redevient indispensable. Sur un problème facile, les deux se valent. Garde la non saturante par défaut : elle ne coûte rien et te couvre dans le cas où le déséquilibre survient.

## Ce que le GAN garde pour lui : un échantillon, une passe

Un GAN génère en **une seule passe avant** du générateur. C'est son avantage structurel, et il est énorme. Mesuré sur CPU, générateur `2 → 128 → 128 → 2`, moyenne sur 200 répétitions :

| Taille du lot | Temps total | Par échantillon |
|---|---|---|
| 1 | 0,0264 ms | 26,37 µs |
| 64 | 0,0515 ms | 0,80 µs |
| 1 000 | 0,2491 ms | **0,25 µs** |

Générer mille échantillons coûte 0,25 ms, soit à peine dix fois le coût d'un échantillon seul : le réseau est si petit que tout le temps part dans les frais fixes d'appel, et la génération par lot les amortit presque entièrement. Retiens le chiffre de **0,25 µs par échantillon** — la leçon 4 le comparera aux 526,7 µs d'un modèle de diffusion à 1 000 pas, soit un rapport de 2 100.

C'est pourquoi les GAN n'ont pas disparu malgré la domination de la diffusion sur la qualité : partout où il faut générer en temps réel — synthèse vocale, super-résolution d'un flux vidéo, rendu interactif — une passe avant reste la seule option praticable. Et les modèles de diffusion les plus rapides d'aujourd'hui sont, pour une part, des modèles distillés en un ou quatre pas, c'est-à-dire ramenés vers ce régime.

## Au clavier

```python
import torch, torch.nn as nn

G = nn.Sequential(nn.Linear(2, 128), nn.ReLU(), nn.Linear(128, 128), nn.ReLU(), nn.Linear(128, 2))
D = nn.Sequential(nn.Linear(2, 128), nn.ReLU(), nn.Linear(128, 128), nn.ReLU(), nn.Linear(128, 1))
oG = torch.optim.Adam(G.parameters(), lr=2e-4, betas=(0.5, 0.999))   # 1. memes reglages
oD = torch.optim.Adam(D.parameters(), lr=2e-4, betas=(0.5, 0.999))   #    pour les deux
bce = nn.BCEWithLogitsLoss()
un, zero = torch.ones(256, 1), torch.zeros(256, 1)

for pas in range(6001):
    xr, z = vrai(256), torch.randn(256, 2)
    with torch.no_grad():
        xf = G(z)                                    # detache : le gradient de D
    lD = bce(D(xr), un) + bce(D(xf), zero)           # ne doit pas remonter dans G
    oD.zero_grad(); lD.backward(); oD.step()

    lG = bce(D(G(torch.randn(256, 2))), un)          # 2. perte NON saturante
    oG.zero_grad(); lG.backward(); oG.step()

    if pas % 500 == 0:                               # 3. metrique externe, jamais la perte
        with torch.no_grad():
            f = G(torch.randn(2000, 2))
        d = torch.cdist(f, centres).min(1)
        prec = (d.values < 4 * SIG).float().mean()
        modes = int((torch.bincount(d.indices[d.values < 4 * SIG],
                                    minlength=8).float() / len(f) > 0.01).sum())
        print(f"{pas:5d}  perte_D={lD:.3f}  precision={prec:.3f}  modes={modes}/8")
```

Trois réflexes :

1. **N'arrête jamais un GAN sur sa perte.** Entre l'étape 500 et l'étape 6 000, la précision est passée de 0,098 à 0,901 pendant que la perte_D restait dans 1,24–1,34 ; sa corrélation avec la précision était de +0,341, avec l'énergie de +0,124. Instrumente une métrique externe dès le premier entraînement, pas après.
2. **Mesure la fidélité et la diversité séparément.** Renforcer le discriminateur a fait *monter* la précision à 0,947 et *tomber* les modes à 5 sur 8 : un seul chiffre aurait conclu à une amélioration. Précision haute avec modes bas est la signature de l'effondrement de modes, et aucune perte ne l'affiche.
3. **Surveille le rapport de force, pas les hyperparamètres isolément.** Un pas 5× trop grand pour le générateur a réduit le modèle à 0 ou 1 mode sur 8, avec une perte_D de 1,41 — c'est-à-dire la valeur d'équilibre théorique de 1,3863. La proximité de la perte idéale ne prouve rien du tout.
