Le schéma le plus courant : exposer le modèle derrière une API REST, dans un conteneur.

```python
from fastapi import FastAPI
import joblib

app = FastAPI()
modele = joblib.load("modele.joblib")

@app.post("/prediction")
def prediction(donnees: dict):
    X = pretraiter(donnees)
    return {"prediction": modele.predict(X).tolist()}
```

```dockerfile
FROM python:3.12-slim
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

Ces quinze lignes marchent. Elles ne disent rien de ce qui décide de la latence, et presque tout ce qu'on croit sur ce sujet est faux d'un ordre de grandeur. Cette leçon mesure quatre choses sur une machine à 6 cœurs logiques : où passe réellement le temps d'une requête, ce que coûte le découpage en lots, ce que ne coûte pas ce qu'on croit coûter, et pourquoi un modèle synchrone dans un serveur asynchrone sert les requêtes une par une.

## Les modes de service

| mode | déclencheur | latence acceptable | exemple |
|---|---|---|---|
| temps réel | une requête HTTP | 10 à 300 ms | score d'un dossier à la saisie |
| par lots | une tâche planifiée | heures | relance de tous les clients, chaque nuit |
| en flux | un message dans une file | secondes | détection de fraude sur transaction |
| embarqué | l'appareil lui-même | millisecondes | classification d'image sur téléphone |

Le choix n'est pas technique, il est dicté par le moment où la décision est prise. Si personne n'attend la réponse, le temps réel est un coût sans contrepartie — et, comme la suite le montre, un coût de deux ordres de grandeur.

## Où passe le temps d'une requête à une ligne

Une charge utile JSON de 268 octets, huit colonnes, un `Pipeline` scaler + régression logistique. Chaque étape chronométrée sur 300 répétitions :

| étape | ms |
|---|---|
| `json.loads` | 0,0029 |
| construction du `DataFrame` | 0,4132 |
| construction d'un tableau numpy | 0,0267 |
| `scaler.transform` sur le `DataFrame` | 0,4884 |
| `predict_proba`, linéaire, sur `DataFrame` | 0,6285 |
| `predict_proba`, linéaire, sur numpy | 0,1739 |
| `predict_proba`, forêt de 300 arbres | 10,3236 |
| `json.dumps` de la réponse | 0,0014 |

Total d'une requête servie avec un `DataFrame` : **1,0459 ms**, dont 0,6285 ms « dans le modèle » — 60,1 %. Ce 60,1 % est un mensonge d'attribution, et la ligne suivante le démasque : le même modèle appelé sur un tableau numpy répond en **0,1739 ms**. La différence, 0,45 ms, n'est pas du calcul.

Décomposons-la, modèle linéaire, une ligne :

| appel | ms |
|---|---|
| ajusté sur numpy, appelé en numpy | 0,1494 |
| ajusté sur `DataFrame`, appelé en `DataFrame` | 0,5970 |
| ajusté sur `DataFrame`, appelé en numpy | 0,1502 |
| le `.to_numpy()` du `DataFrame`, seul | 0,0009 |

La conversion coûte **0,9 microseconde**. Les 0,45 ms sont la vérification des noms de colonnes de scikit-learn, celle-là même qui, dans la leçon précédente, refuse un `DataFrame` mélangé. Elle coûte **trois fois le calcul du modèle**, par requête.

Il y a là une tension réelle entre les deux leçons, et la résolution n'est pas « supprimer la vérification » : c'est la déplacer. On valide une fois, explicitement, avec le contrat enregistré à côté du modèle — ce qui vérifie plus de choses que scikit-learn (colonnes manquantes, bornes métier) — puis on passe le tableau numpy dans l'ordre que le contrat impose :

```python
X = valider(donnees, contrat)          # lève une erreur si le contrat est violé
proba = modele.predict_proba(X.to_numpy())[:, 1]
```

Le garde-fou devient le nôtre. 0,0009 ms pour la conversion, et la vérification que nous écrivons est plus stricte que celle que nous avons contournée. Faire l'un sans l'autre, en revanche, c'est exactement l'erreur silencieuse de la leçon précédente — 24,7 points d'exactitude perdus sans un mot dans les journaux.

Deux chiffres à retenir de ce tableau pour plus tard : la construction d'un `DataFrame` coûte **0,4132 ms**, soit 142 fois l'analyse du JSON qui l'a produit ; et la forêt de 300 arbres coûte **10,3236 ms** pour une seule ligne. Ce second chiffre est le sujet de la section suivante.

## Les lots : le même travail, autrement découpé

La forêt de 300 arbres, même modèle, même machine, en faisant varier le nombre de lignes par appel :

| lignes par appel | temps par appel | temps par ligne | gain |
|---|---|---|---|
| 1 | 10,037 ms | 10 037 µs | 1,0× |
| 10 | 10,240 ms | 1 024 µs | 9,8× |
| 100 | 12,528 ms | 125 µs | 80,1× |
| 1 000 | 30,045 ms | 30,05 µs | 334,1× |
| 10 000 | 179,843 ms | 17,98 µs | **558,1×** |

Cent lignes coûtent 12,5 ms, une seule en coûte 10,0. Le modèle linéaire est encore plus brutal :

| lignes par appel | temps par appel | temps par ligne | gain |
|---|---|---|---|
| 1 | 0,633 ms | 632,69 µs | 1,0× |
| 10 | 0,616 ms | 61,60 µs | 10,3× |
| 100 | 0,688 ms | 6,88 µs | 91,9× |
| 1 000 | 0,649 ms | 0,65 µs | 975,3× |
| 10 000 | 0,805 ms | 0,08 µs | **7 861,0×** |

Dix mille lignes en 0,805 ms contre une ligne en 0,633 ms. Le calcul utile est un produit matriciel de 10 000 × 8 par 8 × 1 : la machine le fait en microsecondes. Tout le reste est du coût par appel.

Pour la forêt, ce coût par appel se mesure arbre par arbre :

| arbres | une ligne |
|---|---|
| 1 | 0,164 ms |
| 10 | 0,490 ms |
| 50 | 1,816 ms |
| 300 | 9,945 ms |

Tous les chronométrages de cette leçon varient de 1 à 8 % d'une exécution à l'autre : la même forêt mesurée plus haut sur une ligne donnait 10,037 ms avec son scaler, et 9,945 ms ici sans lui. Les ordres de grandeur et les rapports, eux, se reproduisent ; ce sont eux qui portent les conclusions.

C'est linéaire en nombre d'arbres, environ 0,033 ms par arbre. Et un arbre appelé directement, hors de l'ensemble, coûte 0,0436 ms pour une ligne — alors que parcourir un arbre de décision, c'est une vingtaine de comparaisons de flottants. Le temps ne part pas dans la forêt : il part dans **300 appels Python**, chacun payant sa propre vérification d'entrée. Passer `n_jobs=1` ne change rien (9,755 ms contre 9,945) : ce n'est pas un problème de parallélisme, c'est un problème de granularité.

La conséquence pratique : **un modèle qui coûte 10 ms par requête en temps réel coûte 17,98 µs par ligne en traitement par lots**. Un travail nocturne sur un million de clients prend 18 secondes par lots et 2 heures 47 en appelant l'API une ligne à la fois. Avant d'optimiser une API de prédiction, il faut vérifier qu'elle avait besoin d'exister.

## Deux choses qui ne coûtent pas ce qu'on croit

### La chauffe : un résultat négatif

On lit souvent qu'un modèle fraîchement chargé est lent aux premiers appels. Huit appels consécutifs de 100 lignes sur une forêt tout juste désérialisée :

```
13,98   13,29   13,49   12,57   12,76   13,46   14,07   12,42   ms
```

Premier appel 13,98 ms, médiane des suivants 13,29 ms : **facteur 1,1×**, soit du bruit. Pour un modèle scikit-learn sur CPU, il n'y a pas d'effet de chauffe mesurable. L'affirmation est vraie pour un modèle GPU, où le premier appel compile des noyaux CUDA et alloue le cache mémoire ; elle ne se transporte pas ici.

Ce qui coûte, c'est le chargement lui-même : **62,7 ms**, l'équivalent de 5 requêtes de 100 lignes. Le coût n'est pas dans les premiers appels, il est avant eux.

### float32 : un second résultat négatif

Réduire la précision des entrées de moitié devrait accélérer le calcul. Sur un lot de 5 000 lignes :

| | mémoire | forêt | linéaire |
|---|---|---|---|
| float64 | 0,31 Mo | 105,1 ms | 0,299 ms |
| float32 | 0,15 Mo | 102,7 ms | 0,296 ms |
| écart | ÷2 | **−2,3 %** | **−1,2 %** |

Écart maximal entre les probabilités des deux versions : **0,000e+00**. Zéro décision différente sur 5 000 au seuil 0,5. La mémoire est bien divisée par deux, et le temps ne bouge pas, pour une raison simple : scikit-learn reconvertit les entrées en float64 avant de calculer. Le gain de float32 existe — en mémoire GPU, en taille de modèle quantifié, en bande passante réseau — mais pas ici, et pas sur le temps de calcul.

Ces deux sections ne sont pas du remplissage. Une optimisation dont le gain n'a pas été mesuré est une complexité ajoutée au hasard, et `float32` partout est la complexité la plus souvent ajoutée au hasard dans un service de prédiction.

## Un appel bloquant dans une boucle d'événements

Voici ce qui décide vraiment de la latence sous charge, et ce que les quinze lignes du début font mal.

`uvicorn` exécute une boucle d'événements : un seul fil d'exécution qui passe d'une requête à l'autre à chaque `await`. Un gestionnaire déclaré `def` — pas `async def` — est exécuté par FastAPI dans un fil séparé ; un gestionnaire déclaré `async def` qui appelle `modele.predict` tourne **dans la boucle**, et rien ne peut s'y intercaler jusqu'à ce qu'il rende la main.

Mesure directe avec `asyncio` seul, sans serveur web, sur un calcul de 48,7 ms :

| requêtes simultanées | appel bloquant | par requête | via `asyncio.to_thread` | par requête |
|---|---|---|---|---|
| 1 | 49,4 ms | 49,4 ms | 47,6 ms | 47,6 ms |
| 4 | 193,0 ms | 48,2 ms | 71,5 ms | **17,9 ms** |
| 8 | 387,2 ms | 48,4 ms | 163,8 ms | **20,5 ms** |

La colonne bloquante est parfaitement linéaire : 48 ms par requête, quel que soit le nombre de requêtes simultanées. Les quatre requêtes n'ont pas été servies en parallèle, elles ont fait la queue. Le mot « simultané » n'a servi à rien.

La colonne `to_thread` monte à 2,7× sur 4 requêtes et 2,4× sur 8, avec 6 cœurs logiques. Le gain est réel mais inférieur au nombre de cœurs, parce que seules les parties en code compilé de scikit-learn libèrent le verrou global de Python ; le reste reste sérialisé.

Le second effet est celui qui fabrique les queues de distribution. Une petite tâche de 5 ms est lancée pendant le gros calcul, et on mesure son retard :

| | retard maximal de la tâche de 5 ms |
|---|---|
| gestionnaire bloquant | **45,4 ms** |
| via `asyncio.to_thread` | **11,0 ms** |

Une tâche qui devait prendre 5 ms en prend 50,4. Ce n'est pas une prédiction qui est lente : c'est **tout le reste du serveur** qui s'arrête pendant qu'une prédiction calcule — la sonde de vivacité, la réponse déjà prête d'une autre requête, l'écriture d'un journal. Un seul gestionnaire mal déclaré suffit à ce que la latence de l'ensemble du service dépende de la requête la plus lourde en cours, et c'est invisible sur une machine de développement où l'on envoie une requête à la fois.

Trois façons de ne pas avoir ce problème, par ordre de préférence :

| approche | ce qu'elle donne |
|---|---|
| gestionnaire `def` (synchrone) | FastAPI l'exécute dans son propre fil ; la boucle reste libre |
| `async def` + `await asyncio.to_thread(...)` | le calcul sort de la boucle explicitement |
| plusieurs processus (`--workers`) | parallélisme réel, au prix d'un modèle chargé par processus |

La troisième se combine avec les deux premières et rappelle le chiffre de la leçon précédente : un modèle de 18 Mo chargé par chacun des 4 processus, c'est 72 Mo de mémoire résidente et 4 × 98 ms au démarrage.

## Au clavier

1. Mesurer la décomposition avant d'optimiser. Dans une requête à 1,05 ms, le modèle en représente 0,17 ; les 0,45 ms de vérification des noms de colonnes se remplacent par une validation explicite, pas par rien.
2. Vérifier qu'une API temps réel était nécessaire. Le même modèle coûte 10,0 ms par ligne à l'unité et 17,98 µs par ligne en lots de 10 000 : un facteur 558.
3. Ne jamais appeler un modèle synchrone depuis un gestionnaire `async def` sans `to_thread`. Quatre requêtes simultanées passent de 48 ms chacune à 193 ms au total, et une tâche de 5 ms attend 45 ms derrière un seul calcul.
