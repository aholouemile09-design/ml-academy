Une machine ne lit pas des mots : elle lit des entiers. Deux conversions séparent un texte d'un modèle — le **tokeniseur**, qui découpe en unités et les numérote, puis la **table d'embeddings**, qui associe un vecteur à chaque numéro.

L'exercice de cette leçon te fera mesurer ce que les embeddings apportent face à une recherche par mots-clés. Ici, on regarde les deux conversions elles-mêmes : ce qu'elles coûtent, ce qu'elles perdent, et pourquoi un cosinus élevé ne veut rien dire tant qu'on n'a pas mesuré son plancher.

## Le français coûte deux fois plus cher que l'anglais

Un tokeniseur BPE apprend son vocabulaire sur un corpus. Les séquences fréquentes deviennent un seul token, les rares sont découpées. Le vocabulaire de GPT-2 fait **50 257 tokens**, appris majoritairement sur de l'anglais. Mesuré sur trois phrases équivalentes :

| Langue | Phrase | Mots | Tokens | Tokens/mot |
|---|---|---|---|---|
| EN | The cat sleeps on the sofa. | 6 | 7 | 1,17 |
| FR | Le chat dort sur le canapé. | 6 | **9** | **1,50** |
| EN | Machine learning requires a lot of data. | 7 | 8 | 1,14 |
| FR | L'apprentissage automatique demande beaucoup de données. | 7 | **18** | **2,57** |
| EN | I would like to understand how this works. | 8 | 9 | 1,12 |
| FR | Je voudrais comprendre comment cela fonctionne. | 6 | **16** | **2,67** |

**1,14 token par mot en anglais, 2,26 en français : le français coûte 98 % de plus.** Et ce n'est pas une fatalité du français, c'est une propriété du **tokeniseur** : les mêmes phrases passées au tokeniseur de CamemBERT, entraîné sur du français, tombent à **1,21 token par mot — 47 % de moins**.

Le découpage mot à mot montre le mécanisme :

```
GPT-2 :
  unbelievably                1 token   ['Ġunbelievably']
  incroyablement              4 tokens  ['Ġinc', 'roy', 'able', 'ment']
  anticonstitutionnellement   6 tokens  ['Ġant', 'icon', 'st', 'itution', 'nel', 'lement']
```

Un mot anglais courant est **un** token ; son équivalent français est reconstruit morceau par morceau. Le `Ġ` est la façon dont GPT-2 encode l'espace précédent : **« chat » et « chat » en début de phrase sont deux tokens différents**, ce qui surprend la première fois qu'on inspecte un découpage.

**Trois conséquences très concrètes.**

1. **Le coût.** Les API facturent au token. Le même document traité en français coûte environ deux fois le prix de sa traduction anglaise, à qualité égale.
2. **La fenêtre de contexte.** Une fenêtre de 128 000 tokens contient deux fois moins de texte français qu'anglais. Quand on calcule combien de documents tiennent dans un prompt, il faut compter en tokens mesurés, jamais en mots estimés.
3. **Le choix du modèle.** Pour un corpus francophone, un tokeniseur francophone ou multilingue n'est pas un raffinement : c'est deux fois moins de tokens à traiter, donc moins cher et plus de contexte utile.

**Le réflexe** : mesurer, jamais estimer.

```python
from transformers import AutoTokenizer
tok = AutoTokenizer.from_pretrained("gpt2")
print(len(tok.encode(mon_texte)))      # le seul chiffre qui compte
```

## Les chiffres sont découpés n'importe comment

C'est la conséquence la plus contre-intuitive de la tokenisation par sous-mots :

| Nombre | Tokens | Découpage |
|---|---|---|
| 7 | 1 | `['Ġ7']` |
| 100 | 1 | `['Ġ100']` |
| 1234 | 2 | `['Ġ12', '34']` |
| 1234567 | 3 | `['Ġ123', '45', '67']` |
| 3.14159 | 4 | `['Ġ3', '.', '14', '159']` |
| 2026-11-10 | **6** | `['Ġ20', '26', '-', '11', '-', '10']` |
| 127.0.0.1 | **7** | `['Ġ127', '.', '0', '.', '0', '.', '1']` |

**Le modèle ne voit pas « mille deux cent trente-quatre », il voit les deux symboles `12` et `34`.** Le découpage ne respecte aucune structure décimale : `1234` se coupe en 12|34, `1234567` en 123|45|67. Un modèle qui doit additionner deux nombres doit donc **apprendre l'arithmétique sur une représentation qui la cache**.

C'est la vraie raison pour laquelle les LLM se trompent sur des calculs qu'une calculatrice fait sans effort. **La parade n'est pas un meilleur prompt, c'est de ne pas demander** : appel d'outil pour tout calcul, comparaison ou tri de valeurs numériques. Et quand on extrait un montant ou une date d'un texte, on valide la sortie par un schéma plutôt que de faire confiance au format.

## L'analogie célèbre est vraie, et elle ne généralise pas

`roi − homme + femme ≈ reine` est l'exemple canonique de la « géométrie du sens ». Testé sur la matrice d'embeddings statiques de CamemBERT (**32 005 × 768**), en cherchant les plus proches voisins du vecteur calculé :

```
roi - homme + femme   (attendu : reine)
  reine 0,516 | rois 0,497 | Reine 0,443 | princesse 0,382 | royaume 0,320
  -> « reine » arrive en PREMIER
```

**L'analogie fonctionne.** Mais la même opération sur une analogie de forme identique :

```
Paris - France + Italie   (attendu : Rome)
  Naples 0,474 | Venise 0,434 | Turin 0,417 | italien 0,417 | Milan 0,416
  -> « Rome » est ABSENTE du top 5
```

**La géométrie a trouvé la bonne catégorie — des villes italiennes — mais pas le bon élément.** Elle a retenu « ville d'Italie » et perdu « capitale ».

C'est le statut réel de ces vecteurs : la direction encode des régularités utiles, mais **l'arithmétique vectorielle n'est pas un raisonnement**. L'exemple du roi et de la reine est répété partout parce qu'il marche ; les analogies qui ne marchent pas ne sont pas publiées. **Ne construis jamais une fonctionnalité sur une opération d'embedding sans l'avoir testée sur tes propres données.**

## Statique contre contextuel, et le témoin qui manque toujours

Un embedding **statique** donne un seul vecteur par token, quel que soit le contexte : « avocat » le juriste et « avocat » le fruit partagent le même vecteur. Un modèle **contextuel** calcule le vecteur en fonction de la phrase entière, donc il peut les distinguer.

Mesuré sur CamemBERT, deux phrases par sens, et — c'est le point — **avec un témoin du même sens** :

| Mot | Même sens (témoin) | Sens différents | Écart |
|---|---|---|---|
| **avocat** | 0,9461 (tribunal) / **0,7413** (fruit) | **0,7550** | +0,0887 |
| **banque** | 0,8293 (finance) / 0,7962 (données) | 0,6827 | +0,1301 |

**Oui, le contextuel sépare les sens** — 0,6827 contre 0,80 de moyenne pour « banque ». **Mais la marge est mince, et pour « avocat » elle se referme complètement** : le cosinus entre les *deux sens* (0,7550) est **plus élevé** que celui entre deux emplois du *même* sens « fruit » (0,7413).

Donc on ne peut pas décider « même sens ou pas » avec un seuil sur un cosinus absolu. Et sans le témoin, on aurait lu 0,7550 et conclu « les deux sens restent proches », ou 0,6827 et conclu « bien séparés », sans aucun moyen de savoir lequel des deux était vrai.

**C'est la leçon de méthode de cette section : un cosinus ne s'interprète que relativement à une référence mesurée sur le même modèle.** Exactement comme un MAE ne s'interprète que face à une baseline.

## Le cosinus n'a pas de zéro

La raison tient à une propriété géométrique des embeddings de Transformer : les vecteurs ne remplissent pas l'espace, ils s'entassent dans un **cône étroit**. Mesuré sur CamemBERT :

| Niveau | Paires sans aucun rapport | Minimum | Moyenne | Maximum |
|---|---|---|---|---|
| **token** | 15 paires de mots | 0,1345 | **0,4361** | 0,6934 |
| **phrase** (moyenne des tokens) | 28 paires de phrases | 0,6945 | **0,8057** | 0,8830 |

**Deux phrases qui n'ont rien à voir — « le chat dort sur le canapé » et « la bourse a chuté de trois pour cent » — ont un cosinus de 0,81 en moyenne.** Le plancher n'est pas 0, il est à 0,81. Et il est différent au niveau du token (0,44) et de la phrase (0,81), donc il dépend aussi de la façon dont on agrège.

Les conséquences sont immédiates et pratiques :

- **Un seuil absolu lu dans un tutoriel ne vaut rien sur ton modèle.** N'importe quel seuil sous 0,69 accepterait ici *tout*, y compris les paires sans aucun rapport.
- **La seule façon de calibrer un seuil est de mesurer son plancher** : encoder une vingtaine de paires délibérément sans rapport, prendre la moyenne, et placer le seuil au-dessus.
- **Un classement reste valide même quand les valeurs absolues ne le sont pas.** « Lequel de ces chunks est le plus proche » fonctionne ; « ce chunk est-il pertinent, oui ou non » demande une calibration.

```python
# A faire une fois, sur TON encodeur et TON corpus
plancher = cosinus_moyen(paires_sans_rapport)      # ici 0,81
print("tout seuil doit etre strictement au-dessus de", round(plancher, 2))
```

## Pourquoi un modèle de phrases est un autre objet

On est tenté de prendre un BERT et d'en tirer un vecteur de phrase, soit par le token `[CLS]`, soit par la moyenne des tokens. Mesuré, l'écart entre une paraphrase et une phrase sans rapport :

| Agrégation | Paire proche | Paire sans rapport | Écart |
|---|---|---|---|
| token `[CLS]` brut | 0,9656 | 0,9266 | **+0,0390** |
| moyenne des tokens | 0,8721 | 0,8143 | **+0,0577** |

**Les deux sont mauvaises.** Un écart de 0,04 entre « ces deux phrases disent la même chose » et « ces deux phrases n'ont rien à voir » n'est pas exploitable : le bruit d'une phrase à l'autre est du même ordre. La moyenne est un peu meilleure que le `[CLS]`, mais aucune des deux ne donne un espace où la distance mesure le sens.

La raison : **un BERT pré-entraîné n'a jamais été entraîné à ça.** Son objectif est de prédire des tokens masqués, pas de rapprocher des paraphrases. Le `[CLS]` n'a de signification que pour les tâches où il a été affiné.

C'est précisément ce que fait un modèle de phrases comme ceux de la famille *Sentence-BERT* : un affinage **contrastif** — rapprocher les paires de paraphrases, éloigner les paires au hasard — qui transforme l'espace pour que le cosinus devienne une mesure de similarité. **Ce n'est pas le même objet qu'un encodeur de tokens**, et c'est pourquoi on ne bricole pas une recherche sémantique avec un BERT brut.

La moyenne reste la bonne agrégation quand on n'a que `transformers`, à condition de **masquer le rembourrage** — sinon on moyenne des zéros et les phrases courtes sont diluées :

```python
import torch
from transformers import AutoTokenizer, AutoModel

tok, modele = AutoTokenizer.from_pretrained(NOM), AutoModel.from_pretrained(NOM)

def encoder(phrases):
    enc = tok(phrases, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        h = modele(**enc).last_hidden_state
    masque = enc["attention_mask"].unsqueeze(-1)            # 1. masquer le rembourrage
    moyenne = (h * masque).sum(1) / masque.sum(1)
    return torch.nn.functional.normalize(moyenne, dim=1)    # 2. normaliser : cosinus = produit scalaire
```

## Au clavier

```python
from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("gpt2")

texte = open("mon_document.txt", encoding="utf-8").read()
n = len(tok.encode(texte))
print("%d tokens, %d mots -> %.2f token/mot" % (n, len(texte.split()), n / len(texte.split())))
print("tient dans une fenetre de 128k :", n < 128_000)
```

Trois réflexes :

1. **Compte les tokens, n'estime jamais les mots.** Le français fait 2,26 tokens par mot avec un tokeniseur anglophone contre 1,14 pour l'anglais — et 1,21 avec un tokeniseur français. C'est un facteur deux sur le coût et sur le contexte utile.
2. **Ne demande jamais un calcul à un modèle de langue.** `1234` est vu comme `12`+`34` et `127.0.0.1` comme sept tokens : l'arithmétique est cachée par la représentation. Appel d'outil pour tout calcul.
3. **Mesure le plancher de ton cosinus avant de poser un seuil.** Des phrases sans aucun rapport donnaient ici 0,81 de similarité moyenne : un seuil absolu repris d'un tutoriel accepterait tout, et un classement reste fiable là où une décision binaire ne l'est pas.
