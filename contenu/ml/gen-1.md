Jusqu'ici, chaque modèle du parcours répondait à une question posée : quelle classe, quelle valeur, quel prochain mot. Un modèle génératif ne répond à aucune question — il apprend **à quoi ressemblent les données**, et sait en fabriquer de nouvelles.

L'auto-encodeur est la porte d'entrée de ce monde. Il est simple à écrire, il marche du premier coup, et il **ne génère rien**. Comprendre précisément pourquoi est tout l'objet de cette leçon, parce que les trois architectures suivantes du module ne sont que des réponses à cet échec.

Toutes les mesures ci-dessous portent sur `sklearn.datasets.load_digits` — 1 797 chiffres manuscrits de 8×8 pixels, 1 347 en entraînement et 450 en test, pixels ramenés dans [0, 1]. Encodeur `64 → 128 → k`, décodeur `k → 128 → 64`, ReLU, Adam à 2·10⁻³.

## Le goulot décide de tout

Un auto-encodeur est deux réseaux cousus dos à dos : un **encodeur** qui comprime l'entrée en un vecteur de dimension `k`, un **décodeur** qui tente de la reconstruire. L'erreur de reconstruction est la seule perte. Aucune étiquette n'est utilisée.

```
x  ──encodeur──▶  z  ──décodeur──▶  x̂
64 dims            k dims            64 dims

perte = moyenne( (x̂ − x)² )
```

MSE sur le jeu de test, comparée à l'ACP sur le même nombre de composantes :

| k | AE non linéaire | AE linéaire | ACP | Variance ACP cumulée |
|---|---|---|---|---|
| 2 | 0,03622 | 0,05308 | 0,05302 | 28,48 % |
| 4 | 0,02187 | 0,03897 | 0,03819 | 48,75 % |
| 8 | **0,01259** | 0,02483 | 0,02461 | 67,51 % |
| 16 | 0,00640 | 0,01154 | 0,01154 | 85,01 % |
| 32 | 0,00165 | 0,00266 | 0,00264 | 96,65 % |

Deux lectures. **La non-linéarité vaut environ un facteur deux**, à nombre de dimensions égal : 0,01259 contre 0,02461 à k=8. C'est l'argument entier de l'auto-encodeur face à l'ACP — il peut plier l'espace, pas seulement le projeter.

Et **l'auto-encodeur linéaire colle à l'ACP à moins de 1 %** : 0,02483 contre 0,02461. Ce n'est pas une coïncidence, c'est un théorème : avec des couches linéaires et une perte quadratique, la solution optimale engendre le même sous-espace que les `k` premières composantes principales. L'auto-encodeur linéaire est une ACP, écrite avec un optimiseur au lieu d'une décomposition en valeurs singulières — c'est-à-dire plus lent et moins exact.

## « C'est la même chose que l'ACP » est faux dans le détail

Même sous-espace ne veut pas dire mêmes axes, et la mesure va plus loin que la théorie. Angles principaux entre le sous-espace de l'encodeur linéaire (k=8, 6 000 pas) et celui de l'ACP :

| Direction | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Angle (degrés) | 1,23 | 1,83 | 3,07 | 3,62 | 11,01 | 13,82 | 19,78 | **41,75** |

Les quatre premières directions sont retrouvées à moins de 4°. La huitième est à **41,75°** : l'auto-encodeur a trouvé un sous-espace qui n'est pas celui de l'ACP, et sa perte est pourtant à 0,9 % de l'optimum.

C'est parce que **la perte est quasiment plate dans cette direction**. La huitième composante principale porte la plus faible variance du lot ; se tromper d'axe y coûte presque rien, donc le gradient n'y pointe presque pas. La théorie décrit l'optimum, la mesure décrit où l'optimiseur s'arrête. Le réflexe à garder : *une perte équivalente ne garantit pas une représentation équivalente*. Si tu as besoin d'axes interprétables et ordonnés par variance, prends l'ACP — l'auto-encodeur ne te les donnera pas, même en linéaire.

## Sans goulot, il n'apprend rien, mais pas rien du tout

Le discours habituel dit qu'un auto-encodeur dont le latent est aussi large que l'entrée apprend l'identité et n'apprend rien. Mesuré :

| k | MSE entraînement | MSE test |
|---|---|---|
| 64 (= dim. entrée) | 0,000037 | 0,000131 |
| 128 (> dim. entrée) | 0,000016 | 0,000087 |

L'identité, à 10⁻⁴ près. La reconstruction est parfaite et la représentation est **sans aucun intérêt** : rien n'a été résumé, le modèle a appris à recopier. C'est la différence entre une perte basse et un modèle utile, et c'est le seul cas de tout le parcours où une MSE de 10⁻⁴ est une mauvaise nouvelle.

À noter quand même, parce que personne ne le dit : l'écart train/test est d'un facteur 3,5 à 5. Même pour recopier, le réseau n'a pas trouvé la fonction identité exacte — il a appris une recopie ajustée aux données vues. Un auto-encodeur sans goulot n'est pas l'identité, c'est une identité qui surapprend.

## La raison pour laquelle il ne génère pas, en trois mesures

L'idée semble évidente : si le décodeur transforme un vecteur de dimension 8 en chiffre, tirons des vecteurs au sort et récoltons des chiffres. Elle ne marche pas, et il faut voir **à quel point** elle ne marche pas.

Latent d'un auto-encodeur k=8 entraîné 6 000 pas. Moyenne par dimension : `[-0,88 -0,10 0,58 0,16 -0,76 -0,13 -0,16 -0,61]`. Écart-type par dimension : `[0,83 0,83 0,77 0,92 0,91 0,91 0,86 0,59]`. Le nuage de codes n'est donc **ni centré, ni de variance 1** — et il n'y a aucune raison qu'il le soit, rien dans la perte ne le demande.

Trois mesures indépendantes sur 500 tirages, avec un classifieur logistique (96,89 % d'exactitude sur les vraies images) comme juge extérieur :

| Origine du code z | Distance au plus proche code réel | Écart de ré-encodage | Confiance du classifieur |
|---|---|---|---|
| code d'un vrai chiffre de test | 0,623 | 0,087 | 0,885 |
| z ~ N(0, I) | 1,978 (**3,2×**) | **0,436** | **0,599** |
| z ~ N(moyenne, écart-type) par dim. | 1,317 (2,1×) | 0,183 | 0,620 |
| vraies images de test (référence) | — | — | 0,903 |

L'**écart de ré-encodage** est la mesure la plus parlante : on décode `z`, on ré-encode le résultat, et on regarde si on retombe sur `z`. Sur un vrai code, l'écart est de 8,7 % — l'aller-retour est presque un cycle. Sur un tirage gaussien, il est de 43,6 % : le décodeur a produit quelque chose que l'encodeur ne reconnaît pas comme venant de ce point. **La sortie n'appartient pas au domaine que le modèle a appris.**

Et recaler la gaussienne sur la moyenne et l'écart-type mesurés ne sauve rien : la confiance passe de 0,599 à 0,620, contre 0,885 pour un vrai code. Le problème n'est pas l'échelle du nuage, c'est **sa forme**. Les codes occupent une région courbe et trouée, qu'aucune gaussienne par dimension ne décrit.

## Même l'interpolation sort du domaine

Dernier espoir raisonnable : ne pas tirer au hasard, mais se déplacer entre deux codes réels. Confiance moyenne du classifieur sur le décodage de `(1−t)·z_a + t·z_b`, 200 paires de chiffres de test :

| t | 0,00 | 0,25 | 0,50 | 0,75 | 1,00 |
|---|---|---|---|---|---|
| Confiance | 0,880 | 0,756 | **0,626** | 0,745 | 0,893 |

Le milieu du segment tombe à **0,626** — soit le niveau d'un tirage purement aléatoire, qui était à 0,599. Les deux extrémités sont des chiffres, le milieu n'en est pas un. Autrement dit : **le domaine appris n'est pas convexe**, et la ligne droite entre deux points valides passe par le vide.

C'est le diagnostic complet. Un auto-encodeur apprend une correspondance entre les données et un nuage de codes, mais **rien dans sa perte ne lui demande de dire à quoi ressemble ce nuage**. Il n'a pas de densité. On ne peut pas tirer au sort dans quelque chose dont on ignore la forme.

Il y a deux façons de sortir de là, et ce sont les deux leçons suivantes. **Imposer la forme du nuage** pendant l'entraînement : c'est le VAE, qui ajoute un terme de perte poussant les codes vers une gaussienne connue. Ou **renoncer à l'espace latent** et apprendre directement à fabriquer des échantillons jugés par un adversaire : c'est le GAN.

## Le débruiteur : la variante qui apprend vraiment autre chose

Un auto-encodeur reste utile pour autre chose que générer, et une modification d'une ligne change sa nature : on lui donne une entrée bruitée et on lui demande la version propre. Bruit gaussien σ=0,3 sur des pixels dans [0, 1] :

| Modèle | Entrée propre | Entrée bruitée |
|---|---|---|
| AE simple | 0,01276 | **0,08737** |
| AE débruiteur | 0,01424 | **0,02054** |
| entrée bruitée telle quelle | — | 0,05198 |

Deux choses à lire. **L'auto-encodeur simple est pire que rien face au bruit** : 0,08737, contre 0,05198 si on avait rendu l'image bruitée sans rien faire. Il amplifie la perturbation, parce que son encodeur n'a jamais vu que des entrées propres et extrapole n'importe comment.

Le débruiteur ramène l'erreur à 0,02054 — 2,5× mieux que la version simple, 2,5× mieux que l'image brute — et ne paie que 0,00148 de MSE sur les entrées propres. **Le bruit a cessé d'être une nuisance pour devenir le signal d'entraînement.** C'est la même idée qui, poussée à son terme, donne les modèles de diffusion de la leçon 4 : apprendre à retirer du bruit est une tâche d'entraînement, pas un prétraitement.

## Au clavier

```python
import torch, torch.nn as nn

K = 8                                   # 1. le goulot est l'hyperparametre

enc = nn.Sequential(nn.Linear(64, 128), nn.ReLU(), nn.Linear(128, K))
dec = nn.Sequential(nn.Linear(K, 128), nn.ReLU(), nn.Linear(128, 64))
opt = torch.optim.Adam(list(enc.parameters()) + list(dec.parameters()), lr=2e-3)

for pas in range(6000):
    x = Xtr[torch.randint(0, len(Xtr), (256,))]
    bruite = (x + 0.3 * torch.randn_like(x)).clamp(0, 1)   # 2. bruiter l'entree
    perte = ((dec(enc(bruite)) - x) ** 2).mean()           #    et viser le propre
    opt.zero_grad(); perte.backward(); opt.step()

# 3. le test qui dit si le latent est echantillonnable
with torch.no_grad():
    z = torch.randn(500, K)
    ecart = (enc(dec(z)) - z).norm(dim=1) / z.norm(dim=1)
print(f"ecart de re-encodage : {ecart.mean():.3f}")        # 0,436 ici -> non
```

Trois réflexes :

1. **Choisis `k` par la mesure, pas par principe.** Ici k=8 retient 67,5 % de la variance pour une MSE de 0,01259, et k supérieur ou égal à 64 donne une recopie inutile à 10⁻⁴. Il n'y a pas de bonne valeur par défaut : trace la courbe MSE contre k sur tes données et choisis le coude.
2. **Si l'entrée peut être bruitée en production, bruite-la à l'entraînement.** L'auto-encodeur simple montait à 0,08737 sur des entrées bruitées, soit pire que ne rien faire (0,05198) ; le débruiteur descendait à 0,02054 pour 0,00148 de MSE perdue sur les entrées propres.
3. **Avant de croire qu'un latent est échantillonnable, mesure l'écart de ré-encodage.** 0,087 sur de vrais codes contre 0,436 sur des tirages gaussiens : trois lignes de code, et la réponse est sans appel. Et souviens-toi que le milieu de deux vrais codes tombait déjà à 0,626 de confiance — l'interpolation naïve n'est pas plus sûre que le tirage au sort.
