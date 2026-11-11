Les trois leçons précédentes ont posé le même problème sous trois angles : comment apprendre à fabriquer des données sans connaître leur densité. L'auto-encodeur échoue parce qu'il ignore la forme de son latent, le VAE l'impose au prix de la netteté, le GAN s'en passe au prix de la conduite. Les modèles de diffusion prennent une quatrième route, et c'est elle qui domine aujourd'hui l'image, l'audio et la vidéo.

L'idée est l'inverse de toutes les précédentes. Au lieu de chercher comment passer du bruit aux données en un saut, on construit **un chemin de destruction progressive** dont chaque pas est trivialement inversible, et on apprend à le remonter.

Les mesures de cette leçon portent sur le **même mélange de 8 gaussiennes 2D** que la leçon 3 — cercle de rayon 2, écart-type 0,10 — avec les mêmes métriques précision, modes et énergie. Les chiffres de cette leçon et ceux du GAN sont donc directement comparables, ce qui est l'intérêt principal du choix. Réseau de débruitage : `2 + 32 → 128 → 128 → 128 → 2`, SiLU, plongement sinusoïdal du pas de temps, Adam à 2·10⁻³ avec recuit cosinus, 12 000 pas.

Une limite à dire tout de suite : **un modèle de diffusion sur images ne tient pas sur ce processeur.** Entraîner de quoi calculer un FID demande des heures de GPU. Les mesures ci-dessous sont donc exactes et vérifiables, mais sur un problème jouet en deux dimensions ; les ordres de grandeur de coût d'échantillonnage se transposent, les valeurs absolues de qualité non.

## Détruire proprement, puis apprendre à défaire

Le processus direct ajoute un peu de bruit gaussien à chaque pas, selon un calendrier `β₁, …, β_T` fixé à l'avance — ici `T = 1 000` et `β` linéaire de 10⁻⁴ à 0,02. Sa propriété décisive est qu'on peut sauter directement au pas `t` sans itérer :

```
αₜ = 1 − βₜ        ᾱₜ = α₁ · α₂ · … · αₜ

xₜ = √ᾱₜ · x₀  +  √(1 − ᾱₜ) · ε       ε ~ N(0, I)

rapport signal/bruit :  SNR(t) = ᾱₜ / (1 − ᾱₜ)
```

C'est cette formule en une passe qui rend l'entraînement possible : on tire un `t` au hasard, on bruite d'un coup, on apprend. Sans elle, chaque exemple d'entraînement coûterait `t` passes.

| t | βₜ | ᾱₜ | √ᾱₜ | √(1−ᾱₜ) | SNR | SNR (dB) | corr(xₜ, x₀) |
|---|---|---|---|---|---|---|---|
| 0 | 0,00010 | 0,999900 | 0,99995 | 0,01000 | 9 997,34 | 40,00 | 0,99997 |
| 10 | 0,00030 | 0,997806 | 0,99890 | 0,04683 | 454,89 | 26,58 | 0,99945 |
| 50 | 0,00110 | 0,969951 | 0,98486 | 0,17335 | 32,28 | 15,09 | 0,99231 |
| 100 | 0,00209 | 0,895141 | 0,94612 | 0,32382 | 8,54 | 9,31 | 0,97185 |
| 200 | 0,00408 | 0,656347 | 0,81015 | 0,58622 | 1,91 | 2,81 | 0,89023 |
| 400 | 0,00807 | 0,193572 | 0,43997 | 0,89801 | 0,24 | −6,20 | 0,57164 |
| 600 | 0,01205 | 0,025567 | 0,15990 | 0,98713 | 0,026 | −15,81 | 0,22817 |
| 800 | 0,01604 | 0,001508 | 0,03883 | 0,99925 | 0,0015 | −28,21 | 0,06066 |
| 999 | 0,02000 | 0,000040 | 0,00635 | 0,99998 | 0,00004 | −43,94 | 0,01494 |

Le calendrier est **linéaire en β mais exponentiel en ᾱ** : c'est la nuance que la formule cache. βₜ ne varie que d'un facteur 200 du début à la fin, alors que ᾱₜ chute d'un facteur 25 000. Le SNR perd 84 dB sur le parcours. À t=999 la corrélation avec l'image d'origine est de 0,015 : il ne reste rien, ce qui est exactement ce qu'il faut pour pouvoir démarrer l'échantillonnage dans du bruit pur.

## Le signal disparaît bien avant la fin du calendrier

La corrélation décroît lentement, et elle est trompeuse : une corrélation de 0,22 à t=600 pourrait laisser croire qu'il reste de l'information exploitable. Vérifions avec une mesure directe. On renormalise `xₜ` par `√ᾱₜ` — c'est-à-dire qu'on annule l'atténuation et qu'on ne garde que le bruit relatif — puis on compte combien des 8 modes restent distinguables :

| t | Modes encore distinguables | Précision |
|---|---|---|
| 0 | 8/8 | 0,999 |
| 50 | 8/8 | 0,855 |
| 100 | 8/8 | 0,465 |
| 200 | 8/8 | 0,175 |
| 400 | **2/8** | 0,073 |
| 600 | **0/8** | 0,016 |
| 800 | 0/8 | 0,001 |
| 999 | 0/8 | 0,000 |

**La structure du jeu de données a disparu à t=600, pas à t=1 000.** Les quatre cents derniers pas du calendrier portent du bruit sur du bruit. Et dès t=100, la précision est tombée sous 0,5 : à peine un dixième du parcours, et la moitié des points ne sont déjà plus attribuables à leur mode.

Ce n'est pas un défaut, c'est l'information qui sert à régler un calendrier. Un calendrier mal choisi gaspille sa capacité : si ᾱ s'écrase trop vite, le modèle passe l'essentiel de son entraînement sur des pas où il n'y a rien à apprendre que « renvoie du bruit ». C'est précisément le reproche fait au calendrier linéaire, et la raison du calendrier cosinus, qui garde du signal beaucoup plus longtemps. Le diagnostic tient en une ligne : **trace ᾱₜ, pas βₜ.**

## Prédire le bruit, et le résultat comparé au GAN

La tâche d'entraînement est d'une simplicité désarmante : étant donné `xₜ` et `t`, retrouver le `ε` qui a servi à le fabriquer.

```
perte = E_{x₀, t, ε}  ‖ ε_θ(xₜ, t) − ε ‖²
```

Pas d'adversaire, pas de terme KL à pondérer, pas d'équilibre à maintenir. Une régression ordinaire, avec une perte qui **descend et qui veut dire quelque chose** — ce qui, après la leçon 3, n'est pas un détail.

La perte finale mesurée vaut **0,20270**, et il faut comprendre pourquoi elle ne tend pas vers zéro. À grand `t`, `xₜ` est presque du bruit pur : `ε` y est essentiellement imprévisible, et la meilleure prédiction possible est proche de zéro, pour une MSE proche de 1. À petit `t`, `ε` se déduit presque exactement de `xₜ`. La valeur 0,2027 est la moyenne de ces régimes, pas un entraînement inachevé. **Sur un modèle de diffusion, une perte qui stagne à une valeur élevée est normale ; c'est le plancher de l'imprévisibilité du bruit.**

Qualité obtenue, avec les métriques et le jeu de données exacts de la leçon 3 :

| Modèle | Précision | Modes | Énergie |
|---|---|---|---|
| deux échantillons du vrai mélange | 0,999 | 8/8 | 0,00113 |
| **diffusion, 1 000 pas** | **0,993** | 8/8 | **0,00041** |
| GAN (leçon 3) | 0,922 | 8/8 | 0,00644 |

L'énergie de la diffusion, 0,00041, est **inférieure au plancher vrai-contre-vrai de 0,00113** : cela ne veut pas dire qu'elle fait mieux que la réalité, mais que les deux sont indiscernables par cet estimateur, qui a sa propre variance. Le GAN, lui, reste à 0,00644 — soit six fois le plancher.

Et la reproductibilité départage encore plus nettement. Cinq graines, échantillonnage à 200 pas :

| | Précision | Énergie |
|---|---|---|
| diffusion, 5 graines | 0,992 ± 0,0030 | 0,00122 ± 0,00017 |
| GAN, 5 graines | 0,922 ± 0,010 | 0,00607 ± 0,00289 |

**Écart-type 17 fois plus faible sur l'énergie.** Et surtout, aucun réglage de diffusion ne reproduit ce que faisait le GAN avec un pas cinq fois trop grand : tomber à 0 ou 1 mode sur 8. Il n'y a pas d'équilibre à casser. C'est la vraie raison de la domination de la diffusion, plus encore que la qualité brute : **elle s'entraîne comme une régression.**

## Le prix : le coût d'échantillonnage, chiffré

Tout cela se paie à la génération, et lourdement. Chaque échantillon demande une passe du réseau **par pas de débruitage**. Mesuré sur 5 000 échantillons :

| Pas | Précision | Modes | Énergie | Temps (5 000 éch.) | Par échantillon |
|---|---|---|---|---|---|
| 1 000 | 0,993 | 8/8 | 0,00041 | 2 633,5 ms | 526,7 µs |
| 500 | 0,996 | 8/8 | 0,00098 | 1 298,5 ms | 259,7 µs |
| 200 | 0,993 | 8/8 | 0,00119 | 509,0 ms | 101,8 µs |
| 100 | 0,989 | 8/8 | 0,00071 | 255,8 ms | 51,2 µs |
| **50** | **0,982** | 8/8 | 0,00075 | 129,5 ms | **25,9 µs** |
| 20 | 0,943 | 8/8 | 0,00196 | 54,4 ms | 10,9 µs |
| 10 | 0,810 | 8/8 | 0,00482 | 29,1 ms | 5,8 µs |
| 5 | **0,271** | 8/8 | 0,10745 | 14,1 ms | 2,8 µs |
| 2 | 0,064 | **3/8** | 0,59775 | 6,8 ms | 1,4 µs |

Le temps est **exactement linéaire en nombre de pas** — 2 633,5 ms pour 1 000 pas, 129,5 ms pour 50, soit 2,6 ms par pas quelle que soit la ligne. Aucune surprise : c'est une chaîne de dépendances, le pas `t−1` a besoin du pas `t`.

La qualité, en revanche, ne décroît pas du tout linéairement. **De 1 000 à 50 pas, on divise le coût par 20 et la précision ne perd que 1,1 point** (0,993 → 0,982). Puis la falaise : à 10 pas la précision tombe à 0,810, à 5 pas elle s'effondre à 0,271. Le régime utile s'arrête ici autour de 20 pas.

Le point de comparaison avec la leçon 3 est brutal :

```
GAN,       lot de 1000 :    0,25 µs par echantillon
diffusion,     50 pas  :   25,9 µs       ->    104 x plus cher
diffusion,  1000 pas   :  526,7 µs       ->  2 100 x plus cher
```

Voilà le marché que propose la diffusion : une qualité et une stabilité nettement supérieures, contre deux à trois ordres de grandeur de coût à la génération. C'est acceptable pour fabriquer une image qu'un humain va regarder pendant dix secondes. Ce n'est pas acceptable pour un flux temps réel — et c'est tout le sujet de la recherche sur la distillation en peu de pas.

## DDIM : la promesse, et ce que la mesure dit

L'échantillonneur DDPM injecte du bruit frais à chaque pas. DDIM suit le même modèle mais **de façon déterministe**, sans bruit ajouté, et il est présenté comme nettement supérieur à petit budget de pas. Même modèle entraîné, seul l'échantillonneur change :

| Pas | DDPM précision | DDIM précision | DDPM énergie | DDIM énergie |
|---|---|---|---|---|
| 1 000 | **0,993** | 0,986 | **0,00041** | 0,00169 |
| 100 | 0,989 | 0,980 | 0,00071 | 0,00180 |
| 50 | 0,982 | 0,974 | 0,00075 | 0,00171 |
| 20 | 0,943 | 0,939 | 0,00196 | 0,00284 |
| 10 | 0,810 | **0,835** | 0,00482 | 0,00708 |
| 5 | 0,271 | **0,332** | 0,10745 | 0,08428 |
| 2 | 0,064 | 0,065 | 0,59775 | 0,59789 |

**La promesse n'est pas confirmée ici, et il faut le dire ainsi.** À 10 et 5 pas, DDIM gagne un peu en précision (0,835 contre 0,810 ; 0,332 contre 0,271) mais perd en énergie à 10 pas (0,00708 contre 0,00482). À budget élevé, il est systématiquement un peu moins bon. Aucun des deux ne domine.

L'explication la plus probable est la dimension. L'avantage de DDIM vient de ce qu'il suit une trajectoire lisse qu'on peut parcourir à grands pas sans accumuler de bruit ; en deux dimensions, avec huit modes bien séparés, la trajectoire est courte et le bruit de DDPM ne nuit pas. En haute dimension, l'écart mesuré dans la littérature est réel. **C'est une mesure dont la portée s'arrête à ce problème** — et c'est la raison pour laquelle on ne transpose pas un résultat de jouet en loi générale.

Ce que DDIM apporte en revanche sans ambiguïté, et qui ne se voit pas dans ce tableau : son échantillonnage est **déterministe**, donc un bruit de départ donne toujours la même sortie. C'est ce qui rend possibles l'interpolation entre deux échantillons et l'inversion d'une image réelle vers son bruit — la base de toute édition d'image par diffusion.

## Le lien avec le score : direction juste, norme fausse

Le réseau prédit `ε`. On démontre que cela équivaut à estimer le **score** de la loi bruitée, c'est-à-dire le gradient du log de la densité :

```
∇ log q(xₜ)  =  − ε_θ(xₜ, t) / √(1 − ᾱₜ)
```

C'est le pont entre les deux moitiés de la littérature — les modèles de diffusion débruiteurs d'un côté, l'appariement de score et les équations différentielles stochastiques de l'autre. Sur notre mélange de gaussiennes, `q(xₜ)` est analytiquement un mélange de gaussiennes, donc son score vrai est **calculable exactement**. On peut donc vérifier l'affirmation au lieu de la croire :

| t | ‖score exact‖ | ‖score du modèle‖ | Erreur relative | Cosinus |
|---|---|---|---|---|
| 1 | **572,15** | **30,56** | **0,9470** | 0,9794 |
| 10 | 62,88 | 11,38 | 0,8196 | 0,9912 |
| 50 | 8,35 | 6,19 | 0,2618 | 0,9960 |
| 100 | 3,67 | 3,38 | 0,1077 | 0,9957 |
| 200 | 1,32 | 1,30 | 0,1677 | 0,9851 |
| 400 | 1,11 | 1,12 | **0,0260** | 0,9998 |
| 600 | 1,24 | 1,24 | 0,0270 | 0,9989 |
| 800 | 1,26 | 1,26 | 0,0135 | **1,0000** |
| 999 | 1,26 | 1,26 | 0,0253 | 0,9993 |

Deux résultats très différents dans le même tableau. **La direction est juste partout** : le cosinus avec le score exact ne descend jamais sous 0,979, et atteint 1,0000 à t=800. L'identité est vérifiée.

Mais **la norme est fausse d'un facteur 19 à t=1** : 30,56 au lieu de 572,15. La cause est dans le dénominateur de la formule. À t=1, `√(1 − ᾱₜ)` vaut 0,01483, donc le score amplifie l'erreur sur `ε` par **67**. Une erreur de prédiction de 1,5 % sur le bruit devient une erreur de 100 % sur le score. Et la perte d'entraînement, qui pèse tous les `t` également sur `ε`, ne donne aucune raison au réseau d'être plus précis là.

Est-ce grave ? Dans le cadre du débruitage, non : à t=1 l'échantillonneur ne fait qu'un pas minuscule, et il ne reste presque rien à corriger. C'est pour les usages qui ont besoin du score lui-même — résolution de problèmes inverses, échantillonnage par équation différentielle à pas adaptatif, vraisemblance exacte — que cette zone compte, et c'est pourquoi les formulations en temps continu repondèrent la perte par `t` au lieu de la laisser uniforme. **Un modèle entraîné à prédire le bruit n'est pas un bon estimateur de score près de t=0**, même si le théorème qui les relie est exact.

## Au clavier

```python
import torch, torch.nn as nn, math

T = 1000
betas = torch.linspace(1e-4, 0.02, T)
ab = torch.cumprod(1 - betas, 0)             # 1. trace ab, pas betas

def pas_entrainement(modele, x0, opt):
    t = torch.randint(0, T, (len(x0),))
    eps = torch.randn_like(x0)
    xt = ab[t, None].sqrt() * x0 + (1 - ab[t, None]).sqrt() * eps   # en une passe
    perte = ((modele(xt, t) - eps) ** 2).mean()
    opt.zero_grad(); perte.backward(); opt.step()
    return perte.item()                      # ~0,20 au plancher : c'est normal

@torch.no_grad()
def echantillonne(modele, n, pas=50):         # 2. 50 pas suffisent, 1000 est du gaspillage
    x = torch.randn(n, 2)
    ts = torch.linspace(T - 1, 0, pas).long()
    for i, t in enumerate(ts):
        e = modele(x, torch.full((n,), int(t)))
        a_t = ab[t]
        a_prec = ab[ts[i + 1]] if i + 1 < len(ts) else torch.tensor(1.0)
        x0_est = (x - (1 - a_t).sqrt() * e) / a_t.sqrt()
        sig = ((1 - a_prec) / (1 - a_t) * (1 - a_t / a_prec)).clamp(min=0).sqrt()
        x = a_prec.sqrt() * x0_est + (1 - a_prec - sig ** 2).clamp(min=0).sqrt() * e
        if i + 1 < len(ts):
            x = x + sig * torch.randn(n, 2)
    return x

# 3. le budget de pas est un hyperparametre de production, a mesurer
for pas in (100, 50, 20, 10):
    ech = echantillonne(modele, 5000, pas)
    print(f"{pas:4d} pas -> {qualite(ech)}")
```

Trois réflexes :

1. **Trace ᾱₜ avant de régler un calendrier, jamais βₜ.** β ne variait que d'un facteur 200 sur le parcours, ᾱ d'un facteur 25 000, et la structure du jeu de données avait disparu dès t=600 : les 40 % derniers pas n'apprenaient rien. C'est le diagnostic qui justifie un calendrier cosinus plutôt qu'un réglage à l'aveugle.
2. **Choisis le nombre de pas d'échantillonnage par la mesure, et regarde la falaise.** De 1 000 à 50 pas, le coût tombait d'un facteur 20 pour 1,1 point de précision ; de 50 à 5 pas, la précision s'effondrait de 0,982 à 0,271. Le temps est strictement linéaire en pas, la qualité ne l'est pas du tout.
3. **N'attends pas qu'une perte de diffusion descende vers zéro, et ne compare pas son coût à celui d'un GAN sans le chiffrer.** 0,20270 est un plancher, pas un échec. Et 526,7 µs par échantillon à 1 000 pas contre 0,25 µs pour un GAN, c'est un facteur 2 100 : si ta contrainte est le temps réel, la qualité supérieure de la diffusion ne te servira à rien sans distillation.
