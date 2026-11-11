Le Transformer a remplacé les réseaux récurrents en six ans. Les exercices de cette leçon te feront implémenter l'attention à la main puis inspecter les têtes d'un vrai modèle. Ici, on regarde ce que le mécanisme d'attention **ne fait pas** tout seul, et où vont réellement les paramètres et la mémoire.

## L'attention ne voit pas l'ordre des mots

C'est la propriété la plus importante et la moins intuitive : l'attention est **invariante par permutation**. Mesuré sur une séquence de 8 tokens permutée par `[3, 6, 2, 0, 1, 4, 5, 7]` :

```
ecart entre attention(melangee) et attention(originale)[melangee] : 3,58e-07
```

Autrement dit, mélanger la séquence ne fait que mélanger les sorties : **c'est exactement zéro, à la précision flottante près**. Pour l'attention, « le chien mord l'homme » et « l'homme mord le chien » sont le même objet — un *sac* de vecteurs.

C'est la raison d'être de l'**encodage positionnel** : on ajoute à chaque vecteur un vecteur qui dépend de sa position. Avec un encodage sinusoïdal :

```
ecart entre attention(melangee+PE) et attention(originale+PE)[melangee] : 0,8362
norme moyenne de X : 8,38     norme moyenne de PE : 5,66
```

L'ordre compte maintenant. Et noter la deuxième ligne : **l'information de position a une norme du même ordre que le contenu lui-même** (5,66 contre 8,38). Ce n'est pas une annotation discrète ajoutée en marge, c'est un signal massif mélangé au contenu dans le même espace. Les premières couches dépensent une partie de leur capacité à les démêler.

## La position apprise plafonne brutalement

GPT-2 n'utilise pas de sinusoïdes : il a une **table apprise** de taille fixe.

```
n_positions = 1024 -> table d'embeddings positionnels de forme (1024, 768)

   1024 tokens : passe
   1025 tokens : IndexError: index out of range in self
```

**Ce n'est pas une dégradation progressive, c'est une erreur.** Il n'existe aucun vecteur pour la position 1024, donc la recherche dans la table sort du tableau. On ne peut pas « étirer un peu » le contexte d'un modèle à position apprise.

C'est pourquoi les modèles récents utilisent **RoPE** ou **ALiBi**, qui encodent la position *relative* — « combien de tokens séparent ces deux-là » — par une rotation ou un biais calculé, sans table de taille fixe. Un modèle à RoPE peut être étendu au-delà de sa longueur d'entraînement, avec une perte de qualité progressive plutôt qu'un plantage.

**En pratique** : quand on choisit un modèle pour des documents longs, la question n'est pas « quelle est sa fenêtre » mais « que se passe-t-il quand je la dépasse ». Table apprise : erreur. RoPE : dégradation. Les deux demandent une découpe, mais pas le même code.

## Le masque causal, et pourquoi il rend l'entraînement efficace

Pour un modèle qui génère, la position *t* ne doit pas voir *t+1*. On met donc les scores futurs à `-inf` avant le softmax :

```
position 0 : 1,000 0,000 0,000 0,000    somme = 1,0000
position 1 : 0,439 0,561 0,000 0,000    somme = 1,0000
position 2 : 0,007 0,475 0,518 0,000    somme = 1,0000
position 3 : 0,793 0,041 0,103 0,063    somme = 1,0000
```

Chaque ligne somme toujours à 1 : le softmax **redistribue** le poids sur le passé disponible au lieu de le perdre. La position 0 n'a qu'elle-même, donc 1,000.

La conséquence pratique est celle qu'on voit rarement énoncée. En remplaçant tout le contenu à partir de la position 5 :

```
ecart sur les positions 0-4 : 0,00e+00
ecart sur les positions 5-7 : 1,6671
```

**Les positions antérieures sont strictement inchangées.** Donc une seule passe avant sur une séquence de *n* tokens produit *n* prédictions valides, chacune n'ayant vu que son passé. Pour une séquence de 1 024 tokens, c'est **1 024 exemples d'apprentissage pour le prix d'une passe**.

C'est ce qui rend le pré-entraînement des modèles de langue économiquement possible. Un réseau récurrent doit dérouler la séquence pas à pas ; le Transformer causal calcule toutes les positions en parallèle et récupère quand même un signal par position.

## Le coût quadratique, mesuré

La matrice d'attention est de taille *n × n*. Mesuré sur une tête, d=64, CPU un fil :

| Tokens | Temps (ms) | × vs 128 | Matrice (Mo) | × vs 128 |
|---|---|---|---|---|
| 128 | 0,11 | 1,0 | 0,06 | 1,0 |
| 256 | 0,30 | 2,7 | 0,25 | 4,0 |
| 512 | 1,07 | 9,3 | 1,00 | 16,0 |
| 1 024 | 3,55 | 31,1 | 4,00 | 64,0 |
| 2 048 | 13,51 | 118,3 | 16,00 | 256,0 |
| 4 096 | **62,82** | **549,9** | **64,00** | **1 024,0** |

**La mémoire est exactement quadratique** (32 fois plus de tokens, 1 024 fois plus de mémoire). **Le temps croît un peu moins vite** — 550× au lieu de 1 024× — parce que les projections Q, K, V sont linéaires en *n* et dominent encore aux petites longueurs. À partir de 2 048, la pente est bien celle du carré.

Et à l'échelle d'un modèle réel — 12 couches × 12 têtes, float32 :

| Contexte | Mémoire des seules matrices d'attention |
|---|---|
| 1 024 tokens | 0,6 Go |
| 8 192 tokens | **36,0 Go** |
| 128 000 tokens | **8 789 Go** |

8 789 Go, soit plus de cent GPU. **Donc aucun modèle à long contexte ne matérialise cette matrice.** C'est l'intérêt de **FlashAttention** : calculer le softmax par blocs sans jamais écrire la matrice complète en mémoire, ce qui ramène le coût mémoire à linéaire (le coût en calcul reste quadratique). Et des variantes comme l'attention à fenêtre glissante abandonnent délibérément les paires lointaines.

**Ce qu'il faut en retenir pour un prompt** : doubler la taille du contexte ne double pas le coût de traitement, il le quadruple. Un prompt de 50 000 tokens dont 45 000 sont du remplissage n'est pas « un peu plus cher », il est beaucoup plus cher et plus lent.

## Les têtes ne coûtent rien

Intuition naturelle : plus de têtes, plus de paramètres. Mesuré sur `nn.MultiheadAttention(768, h)` :

| Têtes | Dimension par tête | Paramètres |
|---|---|---|
| 1 | 768 | 2 362 368 |
| 2 | 384 | 2 362 368 |
| 4 | 192 | 2 362 368 |
| 8 | 96 | 2 362 368 |
| 12 | 64 | 2 362 368 |
| 64 | 12 | 2 362 368 |

**Exactement le même nombre, toujours.** Les têtes ne sont pas des copies ajoutées côte à côte : on découpe les mêmes 768 dimensions en *h* tranches. Le compte est `4 d² + 4 d` quelle que soit la découpe — les quatre matrices Q, K, V et sortie.

Donc le choix du nombre de têtes est gratuit en mémoire, et c'est un arbitrage de **résolution** : 12 têtes de 64 dimensions peuvent apprendre 12 relations différentes, chacune dans un sous-espace de 64 dimensions ; 1 tête de 768 n'apprend qu'une relation mais très finement. En pratique on descend rarement sous 64 dimensions par tête — en dessous, le sous-espace devient trop pauvre pour porter une relation utile.

## Les paramètres ne sont pas où on croit

Pour un bloc standard, d=768, d_ff=3 072 :

| Composant | Paramètres | Part du bloc |
|---|---|---|
| Attention (Q, K, V, sortie) | 2 362 368 | **33,3 %** |
| FFN (d → 4d → d) | 4 722 432 | **66,6 %** |
| LayerNorm × 2 | 3 072 | 0,0 % |
| **Total par bloc** | **7 087 872** | |

**Les deux tiers des paramètres sont dans le réseau feed-forward, pas dans l'attention.** Le mécanisme qui a donné son nom à l'article n'occupe qu'un tiers du modèle.

Le rapport `d_ff = 4 × d_model` est une convention remarquablement stable :

```
gpt2             d_model=768  d_ff=3072  (4,0 x)  12 couches  12 tetes
camembert-base   d_model=768  d_ff=3072  (4,0 x)  12 couches  12 tetes
```

Et une dernière surprise de comptabilité : sur les 124 439 808 paramètres de GPT-2, **39 383 808 — soit 31,6 % — sont dans les tables d'embeddings** (tokens et positions), qui ne font aucun calcul. Un tiers du modèle est une table de correspondance.

**La conséquence pratique** : quand on lit « ce modèle fait 7 milliards de paramètres », le chiffre ne dit presque rien de sa capacité de raisonnement. Il faut savoir combien sont dans l'attention, combien dans le FFN, et combien dans un vocabulaire qu'on n'utilisera jamais entièrement.

## Le cache KV : ce qui rend la génération tenable

À chaque nouveau token généré, le modèle refait l'attention sur tout le contexte. Mais les clés et les valeurs des tokens déjà traités **ne changent pas** — le masque causal garantit qu'ils n'ont pas vu les tokens suivants. On les garde donc en mémoire.

Mesuré, génération de 40 tokens avec GPT-2 :

| | Total | Par token |
|---|---|---|
| Avec cache | 703,9 ms | **17,60 ms** |
| Sans cache | 3 236,1 ms | **80,90 ms** |

**4,6 fois plus rapide — et l'écart grandit avec la longueur**, puisque sans cache le coût par token est proportionnel à la longueur déjà écrite.

Le cache a un prix en mémoire, et il est facile à calculer : `2 × couches × tokens × d_model × octets` (le 2 pour K et V).

| Contexte | Cache pour GPT-2 (12 couches, d=768, float32) |
|---|---|
| 100 tokens | 7,0 Mo |
| 1 000 tokens | 70,3 Mo |
| 8 192 tokens | **576,0 Mo** |

Pour un modèle de production — plus de couches, plus large — ce chiffre devient des gigaoctets **par conversation simultanée**. C'est la contrainte qui dicte combien d'utilisateurs un serveur d'inférence peut tenir en parallèle, et la raison des techniques comme la *grouped-query attention*, qui partage les clés et les valeurs entre plusieurs têtes pour diviser le cache.

## Pré-norm contre post-norm : un résultat qui ne se reproduit pas

L'article original place le LayerNorm *après* le résiduel (`LN(x + attention(x))`, « post-norm ») ; tous les modèles depuis le placent *avant* (`x + attention(LN(x))`, « pré-norm »). L'explication habituelle est que le post-norm fait s'évanouir le gradient dans les couches basses. Mesuré, perte MSE contre une cible fixe :

| Profondeur | Schéma | Gradient couche 1 | Gradient dernière | Rapport |
|---|---|---|---|---|
| 6 blocs | pré-norm | 2,18·10⁻¹ | 1,59·10⁻¹ | 0,7× |
| 6 blocs | post-norm | 6,75·10⁻² | 6,52·10⁻² | 1,0× |
| 24 blocs | pré-norm | 1,01·10⁰ | 6,52·10⁻¹ | 0,6× |
| 24 blocs | post-norm | 9,89·10⁻² | 1,06·10⁻¹ | 1,1× |
| 48 blocs | pré-norm | 2,65·10⁰ | 1,18·10⁰ | 0,4× |
| 48 blocs | post-norm | 1,26·10⁻¹ | 1,41·10⁻¹ | 1,1× |

**Le gradient ne s'évanouit dans aucun des deux schémas.** Le profil sur 48 blocs est plat de bout en bout :

```
pre-norm   : 2,7e+00  2,5e+00  2,0e+00  1,8e+00  1,4e+00  1,1e+00
post-norm  : 1,3e-01  1,5e-01  1,2e-01  1,3e-01  1,1e-01  1,3e-01
```

**Je ne reproduis pas l'explication courante**, au moins à cette échelle (48 blocs, d=64, une passe à l'initialisation). Le post-norm a un gradient uniformément ~20 fois plus petit, mais il n'est pas plus petit *en bas* qu'*en haut*.

Ce qui se reproduit, en revanche, c'est la **sensibilité au pas d'apprentissage**. Même réseau, 120 pas d'Adam :

| Profondeur | Pas | Pré-norm | Post-norm |
|---|---|---|---|
| 6 blocs | 10⁻³ | 0,0000 | 0,0233 |
| 6 blocs | 10⁻² | 0,0000 | 0,0246 |
| 24 blocs | 10⁻³ | 0,0008 | 0,0234 |
| 24 blocs | **10⁻²** | **0,0012** | **0,9939** |

À 24 blocs, multiplier le pas par 10 fait **perdre deux ordres de grandeur au post-norm** (0,0234 → 0,9939, à peine mieux que sa perte de départ de 2,04) tandis que le pré-norm est inchangé (0,0008 → 0,0012). **C'est ça, la vraie raison du changement** : le post-norm exige un pas prudent et un rodage (*warmup*) long, le pré-norm tolère un pas agressif dès le premier pas.

Une honnêteté sur cette mesure : la sortie d'un réseau post-norm traverse un dernier LayerNorm, donc sa variance par ligne est fixée à 1 par construction et il ne peut pas atteindre une cible d'échelle arbitraire. Son plancher de 0,023 est probablement ce plafond-là, pas un échec d'optimisation. Seule la ligne à 0,9939 — bien au-dessus de son propre plancher — démontre quelque chose.

## Au clavier

```python
import torch, math

def cout_attention(n, couches=12, tetes=12, octets=4):
    """Memoire des matrices d'attention, en Go, si on les materialise."""
    return couches * tetes * n * n * octets / 1024 ** 3

def cout_cache(n, couches=12, d=768, octets=4):
    """Memoire du cache KV, en Mo."""
    return 2 * couches * n * d * octets / 1024 ** 2

for n in [1024, 8192, 32768]:
    print("%6d tokens : attention %8.1f Go   cache KV %7.1f Mo"
          % (n, cout_attention(n), cout_cache(n)))
```

Trois réflexes :

1. **Doubler le contexte quadruple le coût.** La matrice d'attention est *n × n* : 128 000 tokens demanderaient 8 789 Go si on la matérialisait. Un prompt long n'est pas un peu plus cher, il l'est au carré.
2. **Vérifie ce qui arrive au-delà de la fenêtre avant de choisir un modèle.** Position apprise, c'est `IndexError` à `n_positions + 1` ; RoPE, c'est une dégradation progressive. Les deux imposent une découpe, pas le même code de secours.
3. **Les deux tiers du modèle sont dans le FFN, et un tiers de GPT-2 est une table d'embeddings.** Un nombre de paramètres ne dit presque rien tant qu'on ne sait pas où ils sont.
