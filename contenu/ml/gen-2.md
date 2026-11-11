La leçon précédente s'est arrêtée sur un constat : l'auto-encodeur ne sait pas décrire la forme de son nuage de codes, donc on ne peut pas y tirer au sort. Le VAE répond exactement à ça. Il ajoute un terme de perte qui **impose** la forme du nuage, et il paie ce service en qualité de reconstruction.

Cette leçon traite des quatre choses qui décident si un VAE fonctionne : l'astuce qui rend l'échantillonnage dérivable, le poids du terme de régularisation — qui cache un hyperparamètre que presque personne n'écrit —, l'effondrement du posterior, et le compromis entre reconstruire et générer.

Même protocole que la leçon 1 : `load_digits`, 1 347 images d'entraînement, 450 de test, pixels dans [0, 1], encodeur `64 → 128`, deux têtes linéaires vers `k`, décodeur `k → 128 → 64`, Adam à 2·10⁻³, 8 000 pas. Le même classifieur logistique (96,89 % d'exactitude) sert de juge extérieur.

## Ce qui change, et la perte exacte

L'encodeur ne produit plus un code mais **les paramètres d'une loi** : une moyenne `μ(x)` et un log-variance `log σ²(x)`, de dimension `k` chacun. On tire `z` dans cette loi, et on décode.

```
x ──▶ μ(x), log σ²(x) ──▶ z ~ N(μ, σ²) ──▶ x̂

perte = Σᵢ (x̂ᵢ − xᵢ)²  +  β · KL( N(μ, σ²) ‖ N(0, I) )

KL = −½ Σⱼ ( 1 + log σ²ⱼ − μ²ⱼ − σ²ⱼ )
```

La somme de reconstruction porte sur les 64 pixels, le KL sur les `k` dimensions latentes. Le terme KL mesure en **nats** l'écart entre la loi produite par l'encodeur et la gaussienne standard dans laquelle on voudra tirer. Le minimiser, c'est forcer les codes à remplir cette gaussienne — précisément ce qui manquait à l'auto-encodeur.

Le `β` n'est pas dans la dérivation originale de l'ELBO, qui correspond à β=1. Il y est ici parce que, comme la suite le montre, **β=1 n'est pas un choix neutre mais un choix caché**.

## La reparamétrisation n'est pas une astuce de confort

« On tire `z` dans N(μ, σ²) » pose un problème immédiat : un tirage aléatoire n'a pas de dérivée, donc le gradient ne peut pas remonter jusqu'à l'encodeur. Deux solutions existent.

```
reparametrisation :  z = μ + σ ⊙ ε,   ε ~ N(0, I)
                     le hasard est dans ε, qui ne depend d'aucun parametre

score-function :     ∇_μ E[f(z)] = E[ f(z) · ∇_μ log q(z) ]
                     on ne derive pas f, on pondere par le score
```

Les deux donnent un estimateur **sans biais**. Mesuré sur l'objectif jouet `E[(z − 0,6)²]` avec `μ = 0,3`, dont le gradient exact vaut −0,6000 ; 200 000 tirages par ligne :

| σ | Reparamétrisation | Variance | Score-function | Variance | Rapport |
|---|---|---|---|---|---|
| 0,5 | −0,6037 | 1,0004 | −0,6073 | 5,1165 | **5,1×** |
| 1,0 | −0,6073 | 4,0015 | −0,6134 | 16,4828 | **4,1×** |
| 2,0 | −0,6146 | 16,0060 | −0,6261 | 61,9790 | **3,9×** |

Les deux moyennes tombent bien sur −0,60. La différence est entière dans la variance, et ce qu'elle coûte se lit en nombre de tirages nécessaires pour une erreur-type de 0,01 :

| σ | Reparamétrisation | Score-function |
|---|---|---|
| 0,5 | 10 003 | 51 165 |
| 1,0 | 40 015 | 164 827 |
| 2,0 | 160 060 | 619 789 |

**Quatre à cinq fois plus d'échantillons pour la même précision de gradient.** Un VAE utilise *un seul* tirage par exemple et par pas — c'est ce qui rend son entraînement aussi rapide qu'un auto-encodeur. Avec l'estimateur score-function, ce tirage unique serait quatre fois plus bruité, et le facteur grandit avec la dimension du latent.

C'est pour ça que la reparamétrisation est l'idée centrale du papier de 2013 et pas une note de bas de page : elle ne rend pas le gradient *possible*, elle le rend **assez peu bruité pour qu'un seul tirage suffise**.

## Le β cache un écart-type, et β = 1 fait s'effondrer le modèle

Voici le résultat le plus utile de cette leçon, et il contredit le discours courant. Balayage de β à k=8 ; « dims actives » compte les dimensions latentes dont le KL dépasse 0,01 nat :

| β | rec. MSE | KL (nats) | Dims actives | Confiance N(0,I) | Confiance milieu |
|---|---|---|---|---|---|
| 0 (= auto-encodeur) | 0,01344 | 40,55 | 8/8 | 0,595 | 0,623 |
| 0,01 | 0,01278 | 21,52 | 8/8 | 0,667 | 0,623 |
| **0,03** | **0,01172** | 15,49 | 8/8 | 0,671 | 0,640 |
| 0,05 | 0,01216 | 12,81 | 8/8 | 0,677 | 0,646 |
| 0,10 | 0,01292 | 9,17 | 8/8 | 0,713 | 0,654 |
| 0,20 | 0,01756 | 5,87 | 6/8 | 0,728 | 0,712 |
| **0,30** | 0,02162 | 4,40 | 4/8 | **0,762** | **0,723** |
| 0,50 | 0,02625 | 2,87 | 4/8 | 0,740 | 0,671 |
| **1,00** | **0,05338** | 0,66 | **3/8** | **0,469** | **0,324** |
| 2 et au-delà | 0,07410 | 0,00 | **0/8** | 0,295 | 0,295 |

**À β=1 — la valeur de l'ELBO canonique — le modèle est pire qu'un auto-encodeur ordinaire** : confiance 0,469 contre 0,595, et seulement 3 dimensions latentes sur 8 encore utilisées. À β≥2, le KL est exactement nul, la confiance tombe à 0,295, et la MSE se fige à 0,07410 — à comparer à **0,07403**, la MSE du prédicteur constant qui renverrait toujours l'image moyenne du jeu d'entraînement. Le décodeur a cessé de regarder son entrée.

La cause n'est pas mystérieuse, elle est dimensionnelle. Un terme de reconstruction écrit `Σ (x̂ − x)²` suppose une vraisemblance gaussienne sur les pixels, et l'ELBO exact s'écrit alors :

```
−log p(x|z) = Σ (x̂ − x)² / (2σ²)  +  constante

donc    perte = Σ (x̂ − x)²  +  2σ² · KL        ⟹    β = 2σ²,  σ = √(β/2)
```

**Le β que tu écris fixe implicitement l'écart-type du bruit de pixel que tu supposes.** β=1 déclare σ=0,707 sur des pixels qui vivent dans [0, 1] : un bruit si énorme que reconstruire ne vaut plus rien, et que le modèle a raison d'abandonner son latent. Le résidu réellement atteignable ici est de √0,01172 ≈ 0,108, soit β ≈ 0,023 — et c'est exactement la zone où la mesure place le meilleur compromis.

| β | σ implicite | Verdict mesuré |
|---|---|---|
| 0,03 | 0,122 | reconstruction optimale, 8/8 dims actives |
| 0,30 | 0,387 | meilleure génération, 4/8 dims actives |
| 1,00 | 0,707 | effondrement : pire qu'un auto-encodeur |

À retenir : **β n'est pas un bouton de réglage à tâtonner, c'est une hypothèse sur le bruit de tes données.** Calibre-le sur le résidu que ton modèle peut réellement atteindre, puis ajuste. Et note le détail amusant : à β=0,03 la reconstruction (0,01172) est *meilleure* qu'à β=0 (0,01344) — le KL agit aussi comme régularisation.

## L'effondrement du posterior n'a pas la cause qu'on lui prête

Le récit habituel attribue l'effondrement du posterior à un décodeur trop puissant : s'il peut reconstruire sans aide, il ignore le latent. C'est mesurable. Largeur du décodeur de 16 à 512, à deux valeurs de β :

| Largeur du décodeur | β=0,03 : dims actives | β=0,03 : confiance | β=1 : dims actives | β=1 : confiance |
|---|---|---|---|---|
| 16 | **8/8** | 0,640 | 2/8 | 0,382 |
| 64 | **8/8** | 0,659 | 3/8 | 0,482 |
| 128 | **8/8** | 0,671 | 3/8 | 0,469 |
| 512 | **8/8** | 0,693 | 3/8 | 0,490 |

**Multiplier la largeur du décodeur par 32 ne provoque aucun effondrement** : 8 dimensions actives sur 8 d'un bout à l'autre, et la confiance monte même légèrement (0,640 → 0,693). En revanche, passer β de 0,03 à 1 fait tomber les dimensions actives de 8 à 3, quelle que soit la largeur.

Sur ce jeu et à cette échelle, **c'est β qui décide de l'effondrement, pas la capacité du décodeur.** Le récit classique n'est pas faux en général — il décrit des décodeurs autorégressifs très expressifs, comme un PixelCNN ou un décodeur de texte, qui peuvent effectivement modéliser les données sans latent. Avec un décodeur à propagation avant ordinaire, le coupable est le poids du KL. Si ton VAE n'utilise que trois dimensions latentes, **regarde β avant de rétrécir ton décodeur.**

Le signe diagnostique à surveiller est le **KL par dimension**. À k=16 et β=1, les valeurs triées valent `0,270 ; 0,241 ; 0,145 ; 0,001 ; 0,001 ; 0 ; 0 ; …` — treize dimensions à zéro exactement. Une dimension à KL nul est une dimension où l'encodeur renvoie `μ=0, σ=1` quelle que soit l'entrée : elle ne transporte aucune information, elle coûte des paramètres et elle ment sur la taille réelle du modèle.

## Reconstruire ou générer : il faut choisir

À β calibré (0,03), balayage de la dimension latente :

| k | rec. MSE | KL (nats) | Dims actives | Confiance N(0,I) | Confiance milieu |
|---|---|---|---|---|---|
| 2 | 0,03490 | 6,84 | 2/2 | **0,791** | **0,778** |
| 4 | 0,02264 | 10,64 | 4/4 | 0,727 | 0,721 |
| 8 | 0,01172 | 15,49 | 8/8 | 0,671 | 0,640 |
| 16 | 0,00709 | 18,89 | 14/16 | 0,640 | 0,608 |
| 32 | **0,00690** | 18,98 | **15/32** | 0,649 | 0,614 |

Les deux colonnes extrêmes vont **en sens contraire**. De k=2 à k=32, la reconstruction s'améliore d'un facteur 5 (0,03490 → 0,00690) et la qualité des échantillons se dégrade de 0,791 à 0,649. Un latent étroit force le modèle à ne garder que la structure commune, donc tout point de cet espace reste plausible ; un latent large lui laisse de la place pour des régions que la gaussienne couvre mal.

Deuxième enseignement du tableau : **le VAE élague tout seul.** À k=32, seulement 15 dimensions survivent, et la MSE ne gagne que 0,00019 par rapport à k=16. Le KL total sature à 19 nats. Donner plus de dimensions qu'il n'en faut n'est pas dangereux, c'est simplement inutile — le KL par dimension te dit combien ton jeu en demande vraiment.

Et pour mesurer ce que la régularisation a acheté, le test d'interpolation de la leçon 1, qui tombait à 0,626 pour l'auto-encodeur : le VAE à β=0,3 le remonte à **0,723**. Le milieu de deux codes est redevenu un chiffre. C'est, en une seule mesure, ce qu'un VAE sait faire et qu'un auto-encodeur ne sait pas.

## Le KL analytique, et le cas où il faut l'estimer

Avec un posterior gaussien et un prior gaussien standard, le KL a une forme fermée — c'est l'expression donnée plus haut. Il existe aussi un estimateur Monte-Carlo, utile dès que l'une des deux lois n'est plus gaussienne (prior en mélange, flot normalisant, posterior discret). Mesuré sur le modèle β=1, dont le KL analytique vaut 0,6604 nat ; écart-type sur 20 répétitions :

| Tirages par exemple | Moyenne MC | Écart-type | Erreur relative |
|---|---|---|---|
| 1 | 0,6558 | 0,0473 | 7,2 % |
| 8 | 0,6672 | 0,0131 | 2,0 % |
| 64 | 0,6602 | 0,0050 | 0,8 % |
| 1 024 | 0,6603 | 0,0012 | 0,2 % |

L'estimateur est sans biais dès un seul tirage — sa moyenne est déjà à 0,7 % de la valeur exacte — mais son **bruit** à un tirage est de 7,2 %. Sur un terme de perte, ce bruit s'ajoute à celui du minilot et ralentit la convergence sans jamais lever d'erreur.

La règle : **quand la forme fermée existe, utilise-la.** Gratuite, exacte, aucun bruit ajouté. Garde l'estimateur Monte-Carlo pour les cas où tu n'as pas le choix, et sache alors que ton gradient porte un bruit supplémentaire qu'il faudra compenser par un lot plus grand ou un pas plus petit.

## Au clavier

```python
import torch, torch.nn as nn

K, BETA = 8, 0.03          # 1. beta = 2*sigma^2 : calibre-le sur le residu

class VAE(nn.Module):
    def __init__(self, k=K, h=128):
        super().__init__()
        self.tronc = nn.Sequential(nn.Linear(64, h), nn.ReLU())
        self.mu, self.lv = nn.Linear(h, k), nn.Linear(h, k)
        self.dec = nn.Sequential(nn.Linear(k, h), nn.ReLU(), nn.Linear(h, 64))

    def forward(self, x):
        t = self.tronc(x)
        mu, lv = self.mu(t), self.lv(t).clamp(-8, 8)      # clamp : evite exp() qui deborde
        z = mu + torch.exp(0.5 * lv) * torch.randn_like(mu)   # 2. reparametrisation
        return self.dec(z), mu, lv

m = VAE(); opt = torch.optim.Adam(m.parameters(), lr=2e-3)
for pas in range(8000):
    x = Xtr[torch.randint(0, len(Xtr), (256,))]
    xh, mu, lv = m(x)
    rec = ((xh - x) ** 2).sum(1).mean()                   # somme sur les pixels
    kl = (-0.5 * (1 + lv - mu ** 2 - lv.exp()).sum(1)).mean()
    perte = rec + BETA * kl
    opt.zero_grad(); perte.backward(); opt.step()

# 3. le diagnostic a lancer apres chaque entrainement
with torch.no_grad():
    t = m.tronc(Xte); mu, lv = m.mu(t), m.lv(t).clamp(-8, 8)
    kl_dim = (-0.5 * (1 + lv - mu ** 2 - lv.exp())).mean(0)
print("KL par dimension :", kl_dim.sort(descending=True).values.numpy().round(3))
print("dimensions actives :", int((kl_dim > 0.01).sum()), "/", K)
```

Trois réflexes :

1. **Traite β comme une hypothèse de bruit, pas comme un bouton.** β=2σ² : à β=1 sur des pixels dans [0, 1], tu déclares σ=0,707 et le modèle s'effondre à 3 dimensions actives sur 8, en deçà d'un auto-encodeur (confiance 0,469 contre 0,595). Calibre β ≈ 2× le carré du résidu atteignable — ici 0,03 — puis monte si tu veux privilégier la génération (0,762 de confiance à β=0,3, pour une reconstruction deux fois moins bonne).
2. **Affiche le KL par dimension à chaque entraînement.** Une dimension à KL nul est morte. À β=1 et k=16, treize des seize dimensions étaient à zéro, et aucune erreur ne le signalait. C'est le seul diagnostic qui distingue un VAE qui apprend d'un VAE qui a renoncé.
3. **Ne cherche pas l'effondrement du posterior dans la taille de ton décodeur en premier.** De 16 à 512 unités, les 8 dimensions sont restées actives à β=0,03 ; c'est β qui les a tuées. Le récit du « décodeur trop puissant » vise les décodeurs autorégressifs, pas un empilement de couches denses.
