Quand un modèle générique ne suffit pas, trois leviers existent : lui donner les bons documents au moment de la question (RAG), changer son comportement par l'exemple (prompt), ou modifier ses poids (*fine-tuning*). Les exercices de cette leçon te feront construire un RAG complet puis arbitrer entre les trois sur quatre cas réels.

Ici, on fait les calculs que ces décisions supposent — et on examine une mesure que j'ai ratée, parce que la façon de rater celle-là est la plus fréquente en RAG.

## LoRA : pourquoi un affinage ne coûte presque rien

Affiner un modèle entier, c'est entraîner tous ses poids, donc stocker un gradient et deux moments d'Adam pour chacun : environ **16 octets par paramètre**. Pour un modèle de 7 milliards, 112 Go de mémoire d'optimiseur. Inatteignable sur une carte grand public.

L'idée de LoRA : au lieu de modifier la matrice `W` de taille (d_in, d_out), on la laisse gelée et on apprend deux petites matrices `A` (d_in, r) et `B` (r, d_out) avec `r` très petit. La mise à jour effective est `W + BA`, de rang au plus `r`.

Mesuré sur GPT-2, en adaptant les 24 matrices d'attention (28 311 552 paramètres, soit 22,8 % du modèle) :

| Rang | Paramètres entraînables | Part du modèle | Réduction |
|---|---|---|---|
| 1 | 55 296 | 0,044 % | 2 250× |
| 2 | 110 592 | 0,089 % | 1 125× |
| 4 | 221 184 | 0,178 % | 563× |
| **8** | **442 368** | **0,355 %** | **281×** |
| 16 | 884 736 | 0,711 % | 141× |
| 32 | 1 769 472 | 1,422 % | 70× |
| 64 | 3 538 944 | 2,844 % | 35× |

Et pour un modèle de 7 milliards (32 couches, d=4 096, Q et V seulement) :

```
rang  8 :  4 194 304 parametres entrainables  (0,0599 % de 7 milliards)
rang 16 :  8 388 608 parametres entrainables  (0,1198 %)
rang 64 : 33 554 432 parametres entrainables  (0,4793 %)
```

**Un affinage de rang 16 sur un modèle de 7 milliards entraîne 8,4 millions de paramètres.** La mémoire d'optimiseur tombe de 112 Go à 134 Mo. C'est ce qui rend l'affinage accessible sur une seule carte.

Trois conséquences qu'on oublie souvent :

- **Un adaptateur se stocke et se partage à part.** 8,4 millions de paramètres font 34 Mo : on peut garder dix comportements différents pour le prix d'un seul modèle de base, et les charger à la demande.
- **Le rang est le seul vrai hyperparamètre.** Rang trop petit, l'adaptateur ne peut pas représenter le changement voulu ; rang trop grand, on retrouve les problèmes du *fine-tuning* complet sans son bénéfice. On commence à 8 ou 16.
- **À l'inférence, l'adaptateur peut être fusionné** (`W ← W + BA`) : le modèle fusionné a exactement la même vitesse que l'original. Si on veut garder la possibilité de changer d'adaptateur à chaud, on paie un petit surcoût de calcul.

## La quantification est de l'arithmétique, puis une mesure

Un paramètre en float32 occupe 4 octets. En float16, 2. En int8, 1. En int4, un demi.

| Modèle | float32 | float16 | int8 |
|---|---|---|---|
| GPT-2 (124 M) | 0,5 Go | 0,2 Go | 0,1 Go |
| 7 milliards | **26,1 Go** | **13,0 Go** | **6,5 Go** |
| 70 milliards | 260,8 Go | 130,4 Go | 65,2 Go |

En int4, avec la marge habituelle d'environ 20 % pour les activations et le cache :

```
7 milliards  : 3,3 Go -> 3,9 Go
70 milliards : 32,6 Go -> 39,1 Go
```

**C'est ce calcul-là qui décide ce qu'on peut faire tourner.** Une carte de 24 Go : un 7 milliards en float16 passe largement, un 70 milliards en int4 ne passe pas (39,1 Go). Pas de débat, de l'arithmétique.

Mais la question suivante est : qu'est-ce qu'on perd ? Mesuré sur une vraie matrice d'attention de GPT-2, quantification naïve min-max sur tout le tenseur :

| Bits | Erreur moyenne | Erreur max | Cosinus avec l'original |
|---|---|---|---|
| 16 | 2,15·10⁻⁵ | 4,30·10⁻⁵ | 1,000000 |
| 8 | 5,53·10⁻³ | 1,11·10⁻² | 0,999489 |
| 4 | 1,11·10⁻¹ | 1,88·10⁻¹ | **0,862885** |
| 2 | 8,04·10⁻¹ | 9,40·10⁻¹ | **0,667293** |

float16 est gratuit, int8 quasi gratuit, **int4 naïf détruit la matrice** (cosinus 0,86 : il ne reste plus grand-chose du vecteur original).

Et c'est exactement pourquoi les vrais formats ne quantifient pas en un seul bloc. En découpant par **groupes de 64 poids**, chaque groupe avec sa propre échelle :

| Bits | Naïf (un seul bloc) | Par groupes de 64 |
|---|---|---|
| 4 | 0,862885 | **0,995942** |
| 2 | 0,667293 | **0,912405** |

**L'int4 par groupes récupère presque tout** (0,9959). La différence ne vient pas du nombre de bits mais du fait qu'une seule paire min/max pour 1,7 million de poids est écrasée par quelques valeurs extrêmes, alors qu'une paire pour 64 poids suit la distribution locale.

C'est la leçon transposable : **ce qui fait la qualité d'une quantification, c'est la granularité des échelles, pas le nombre de bits.** Quand un modèle quantifié déçoit, la première question est « quelle taille de groupe » avant « combien de bits ».

## Ce qui tient dans un prompt, et ce que coûte un index

Le choix entre « tout mettre dans le prompt » et « construire un index » n'est pas philosophique. Stockage des vecteurs en float32 :

| Chunks | Dimensions | Taille de l'index |
|---|---|---|
| 1 000 | 384 | 1,5 Mo |
| 1 000 | 768 | 2,9 Mo |
| 100 000 | 768 | 293,0 Mo |
| 1 000 000 | 768 | **2 929,7 Mo** |
| 1 000 000 | 1 536 | **5 859,4 Mo** |

Jusqu'à quelques dizaines de milliers de chunks, l'index tient en mémoire vive et une recherche exhaustive en NumPy suffit — **pas besoin de base vectorielle**. Au-delà du million, il faut un index approché et le choix des dimensions devient un arbitrage de coût réel (768 contre 1 536, c'est un facteur deux sur la facture de stockage).

De l'autre côté, combien de chunks tiennent dans la fenêtre, en comptant le français à 2,26 tokens par mot et en gardant 30 % pour l'instruction et la réponse :

| Fenêtre | Chunks de 300 car. | Chunks de 1 000 car. |
|---|---|---|
| 8 000 tokens | 45 | 14 |
| 32 000 tokens | 182 | 55 |
| 128 000 tokens | **727** | **218** |
| 200 000 tokens | 1 136 | 341 |

**Donc pour un corpus de moins de 200 chunks, la récupération est presque inutile : tout rentre.** Entre 200 et quelques milliers, la récupération est le cœur du système. Au-delà, il faut aussi un index approché.

C'est la question à poser avant d'écrire une ligne de RAG : **combien de chunks fait mon corpus ?** La réponse dicte l'architecture, et une partie des systèmes de RAG existent pour des corpus qui tiendraient dans un prompt.

## Le reclassement, et pourquoi il existe

Un **bi-encodeur** encode la question et les passages séparément, puis compare par cosinus. C'est rapide : les vecteurs des passages sont calculés une fois pour toutes. Un **cross-encodeur** lit la paire (question, passage) ensemble et sort un score. C'est lent : il faut une passe par paire, à chaque requête.

Mesuré sur cinq passages et une question, « combien de jours pour obtenir un remboursement » (modèle anglais, le cross-encodeur disponible étant entraîné sur de l'anglais) :

| Passage | Bi-encodeur | Cross-encodeur |
|---|---|---|
| *Refunds are available within thirty days of purchase.* | 0,6285 | **+6,88** |
| *Our refund policy is explained in the terms of service…* | 0,6265 | −7,37 |
| *The support team answers from Monday to Friday.* | 0,6145 | −10,99 |
| *Thirty employees work in our Paris office.* | 0,5544 | −11,29 |
| *You can purchase a yearly plan for two hundred euros.* | **0,6360** | −10,66 |

**Le bi-encodeur se trompe.** Il classe premier le passage sur le tarif annuel (0,6360), qui ne répond pas du tout, et deuxième le bon passage (0,6285). Quatre millièmes les séparent. Le cross-encodeur place le bon en premier avec **+6,88 contre −7,37** pour le suivant.

Regarder l'amplitude des deux colonnes explique tout : le bi-encodeur étale ses cinq scores sur **0,08** (de 0,554 à 0,636), le cross-encodeur sur **18** (de −11,29 à +6,88). Le premier est écrasé par l'anisotropie vue à la leçon 1 ; le second est un classifieur entraîné à discriminer, donc ses scores sont séparés et comparables à un seuil.

**Le patron standard en découle directement** : le bi-encodeur récupère large (30 à 100 candidats), le cross-encodeur reclasse les meilleurs (5 à 20), et on n'envoie au modèle que le haut du classement reclassé. On paie le cross-encodeur sur quelques dizaines de paires au lieu du corpus entier.

Et la raison du partage des rôles est une asymétrie de coût mesurable : encoder 50 passages a pris **871 ms** — mais une seule fois, et les vecteurs sont réutilisables à l'infini ; à la requête il ne reste qu'un produit scalaire. Un cross-encodeur refait ce travail à chaque requête.

## L'autopsie d'une mesure ratée

J'ai voulu mesurer la question la plus posée en RAG : **quelle taille de chunk ?** Voici ce que j'ai obtenu, sur un document de 1 599 caractères contenant 8 faits à retrouver :

| Taille | Chevauchement | Chunks | Rappel@1 | Rappel@3 |
|---|---|---|---|---|
| 100 | 0 | 16 | 0 % | 0 % |
| 100 | 25 | 22 | 25 % | 38 % |
| 200 | 0 | 8 | 25 % | 62 % |
| 300 | 0 | 6 | 12 % | 38 % |
| 500 | 0 | 4 | 0 % | 50 % |
| 800 | 0 | **2** | 75 % | **100 %** |
| 1 500 | 375 | **2** | 25 % | **100 %** |

**Cette table ne démontre rien, et chaque ligne est fausse pour une raison différente.**

1. **Le rappel@3 à 800 et 1 500 caractères vaut 100 % par construction.** Le document n'y fait que 2 chunks : demander les 3 meilleurs sur 2 candidats, c'est tout demander. Le modèle n'y est pour rien.
2. **Le rappel@1 n'est pas monotone** (0 %, 25 %, 12 %, 0 %, 75 %, 25 %) : sur 8 questions, un écart d'une question vaut 12,5 points. Tout ce tableau tient dans le bruit d'échantillonnage.
3. **Le signal est trop faible pour qu'un classement veuille dire quelque chose.** Mesuré proprement, phrase contre phrase sans découpage :

```
rappel@1 question -> son propre fait : 6 / 8
cosinus du BON fait      : min 0,7611   moyenne 0,8702   max 0,9470
cosinus des MAUVAIS faits: min 0,6873   moyenne 0,8026   max 0,8919
ecart moyen : +0,0676
```

Le classement fonctionne un peu (6 sur 8), mais **les deux distributions se recouvrent** : le pire bon fait est à 0,7611 et le meilleur mauvais à 0,8919. Aucun seuil ne les sépare. C'est l'anisotropie de la leçon 1, appliquée à un cas concret — et l'encodeur utilisé est un CamemBERT brut, pas un modèle de phrases.

**Ce qu'il aurait fallu pour que la mesure tienne** :

- un corpus **assez grand** pour que le rappel@k ne soit pas trivial (plusieurs centaines de chunks au minimum) ;
- **assez de questions** pour que l'intervalle de confiance soit plus petit que l'effet cherché (8 questions donnent ±12 points, il en faut une centaine) ;
- un **encodeur de phrases** entraîné pour la similarité, pas un encodeur de tokens ;
- et le **rappel rapporté séparément de la qualité de la réponse**, parce qu'un RAG peut échouer à récupérer ou échouer à répondre, et que ce ne sont pas les mêmes correctifs.

Je laisse cette table ratée dans la leçon parce que c'est le piège le plus coûteux du RAG : **un chiffre de rappel qu'on n'a pas mis à l'épreuve conduit à régler la taille des chunks sur du bruit, pendant des semaines.** Le réflexe est le même qu'à la leçon 1 : avant de lire une mesure, vérifier qu'elle pouvait échouer.

## Ce que je ne peux pas mesurer ici

Un effet important ne se mesure pas sans appeler un modèle génératif, donc pas dans cette leçon : la position d'un passage dans le prompt change la probabilité que le modèle s'en serve. Les travaux publiés sur les longs contextes (Liu et al., 2023, *Lost in the Middle*) rapportent une performance plus élevée quand l'information utile est au début ou à la fin du contexte qu'au milieu.

Je le signale sans chiffre de mon cru, et la conséquence pratique est prudente : **ne pas empiler 50 chunks en espérant que le modèle trouve**. Reclasser, en garder peu, et placer le mieux classé en premier. Si tu veux vérifier l'effet sur ton propre cas, la mesure est simple : même question, même chunk pertinent, déplacé du début au milieu puis à la fin, et on compte les bonnes réponses.

## Au clavier

```python
def peut_tourner(milliards, bits, memoire_go, marge=1.2):
    """Est-ce que ce modele tient sur cette carte ?"""
    taille = milliards * 1e9 * (bits / 8) / 1024 ** 3
    return taille * marge, taille * marge <= memoire_go

def params_lora(couches, d, rang, matrices_par_couche=2):
    return couches * matrices_par_couche * 2 * rang * d

for bits in [16, 8, 4]:
    for n in [7, 70]:
        go, ok = peut_tourner(n, bits, 24)
        print("%2d milliards en int%-2d : %6.1f Go -> %s" % (n, bits, go, "OUI" if ok else "NON"))

print("LoRA rang 16 sur 7 milliards :", params_lora(32, 4096, 16), "parametres")
```

Trois réflexes :

1. **Compte tes chunks avant de choisir une architecture.** Moins de 200, tout tient dans une fenêtre de 128 000 tokens et la récupération est facultative ; au-delà du million, l'index approché n'est plus optionnel.
2. **En quantification, la granularité avant les bits.** Int4 naïf descend à 0,8629 de cosinus, int4 par groupes de 64 remonte à 0,9959. Quand un modèle quantifié déçoit, regarde la taille de groupe d'abord.
3. **Avant de croire un chiffre de rappel, vérifie qu'il pouvait échouer.** Un rappel@3 sur 2 chunks vaut 100 % sans rien démontrer, et 8 questions donnent ±12 points de bruit. Une mesure qui ne peut pas échouer ne mesure rien.
