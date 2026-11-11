Le nuage ne facture pas ce qu'on croit. On surveille le prix de la machine, qui est affiché partout et facile à comparer, et la facture arrive gonflée par trois lignes dont personne n'avait parlé : le transfert sortant, le nombre de requêtes, et une classe de stockage « économique » lue trop souvent.

Cette leçon porte sur la **structure** des coûts, pas sur le catalogue des services. Tous les tarifs qui suivent viennent de l'API de liste de prix d'AWS pour la région Canada (Central), relevés le 2026-11-11, avec la date de publication de chaque grille. Ce sont des chiffres datés, pas des ordres de grandeur : ils changent, et la méthode de cette leçon est de les vérifier plutôt que de les mémoriser.

Aucune ressource AWS n'a été créée pour préparer cette leçon. Les mesures de format et de volume sont faites en local, sur 2 000 000 de lignes et 8 colonnes ; les coûts sont de l'arithmétique sur les tarifs publiés.

## Les quatre services, et ce qu'ils facturent

| service | rôle dans un projet ML | facturé sur |
|---|---|---|
| S3 | les données, les modèles, les journaux | l'octet-mois, la requête, l'octet sortant |
| EC2 | une machine allumée | l'heure, qu'elle travaille ou non |
| Lambda | une fonction appelée | la requête et le Go-seconde consommé |
| ECR | les images de conteneurs | l'octet-mois et le transfert |

La distinction qui compte tient dans la troisième colonne. EC2 facture le **temps**, Lambda facture le **travail**, S3 facture le **volume et le mouvement**. Une erreur d'architecture coûte cher quand elle place une charge dans le modèle de facturation qui ne lui correspond pas : une machine allumée en permanence pour répondre dix fois par jour, ou une fonction appelée cent millions de fois.

### Tarifs relevés, Canada (Central)

| ligne | tarif | grille publiée le |
|---|---|---|
| S3 Standard, stockage | 0,025 $/Go-mois | 2026-11-09 |
| S3 Standard-IA, stockage | 0,0138 $/Go-mois | 2026-11-09 |
| S3 Glacier Instant Retrieval | 0,005 $/Go-mois | 2026-11-09 |
| S3 Glacier Flexible, stockage | 0,00405 $/Go-mois | 2026-11-09 |
| requêtes d'écriture (PUT, COPY, POST, LIST) | 0,0055 $/1 000 | 2026-11-09 |
| requêtes de lecture (GET, SELECT) | 0,00044 $/1 000 | 2026-11-09 |
| sortie internet, 0 à 10 To | 0,0900 $/Go | 2026-11-10 |
| sortie inter-région | 0,0200 $/Go | 2026-11-10 |
| EC2 t3.small, Linux à la demande | 0,0232 $/h | 2026-11-11 |
| EC2 t3.medium | 0,0464 $/h | 2026-11-11 |
| EC2 g4dn.xlarge (GPU) | 0,5840 $/h | 2026-11-11 |
| Lambda, requêtes | 0,0000002 $/requête | 2026-10-30 |
| Lambda, durée | 0,0000166667 $/Go-seconde | 2026-10-30 |

Un mois d'EC2 se compte en **730 heures** et non en 720 : c'est la moyenne annuelle qu'AWS applique. t3.small allumée en continu fait donc 16,94 $/mois, t3.medium 33,87 $, et g4dn.xlarge **426,32 $**. Cette dernière ligne est la raison pour laquelle on n'oublie pas d'éteindre une machine GPU : une semaine oubliée coûte 98,11 $.

## Le format du fichier décide de la facture

Le même jeu de données, écrit de six façons. 2 000 000 de lignes, 8 colonnes, 136,9 Mo en mémoire :

| format | taille | ratio | écriture | lecture |
|---|---|---|---|---|
| CSV | 100,4 Mo | 1,00× | 4,51 s | 1,43 s |
| CSV gzip | 36,1 Mo | 2,78× | 24,43 s | 1,66 s |
| Parquet sans compression | 44,1 Mo | 2,28× | 0,59 s | 0,34 s |
| Parquet snappy | 37,9 Mo | 2,65× | 0,52 s | **0,06 s** |
| Parquet gzip | **30,8 Mo** | 3,26× | 8,74 s | 0,08 s |
| Parquet zstd | 33,2 Mo | 3,03× | 0,59 s | 0,06 s |

Deux résultats méritent qu'on s'arrête. D'abord, **Parquet non compressé est déjà plus petit que du CSV compressé en gzip** — 44,1 contre 36,1 Mo, c'est presque à égalité, sans aucune compression. La raison est le stockage par colonne : une colonne de nombres entiers est encodée comme des entiers, pas comme du texte décimal, et une colonne à quatre valeurs distinctes est encodée par dictionnaire. Le CSV, lui, écrit le chiffre `7` sur un octet et la date `2026-01-01` sur dix.

Ensuite, **CSV gzip est le pire choix sur tous les axes à la fois** : 24,43 s à l'écriture — 47 fois plus lent que Parquet snappy — 1,66 s à la lecture, et une taille battue par Parquet gzip. Il n'a qu'un seul avantage, qui est réel : on peut l'ouvrir avec un tableur.

Traduit en facture, pour 1 To de données au tarif S3 Standard :

| format | volume équivalent | coût mensuel |
|---|---|---|
| CSV | 1 024,0 Go | 25,60 $ |
| CSV gzip | 368,5 Go | 9,21 $ |
| Parquet snappy | 386,1 Go | 9,65 $ |
| Parquet gzip | 314,5 Go | **7,86 $** |

L'écart entre la première et la dernière ligne est de 25,60 − 7,86 = 17,74 $ par mois et par téraoctet, soit **212,88 $ par an**. Pour une décision prise une fois, en écrivant `.to_parquet` au lieu de `.to_csv`.

## Ne lire que ce dont on a besoin

Le stockage par colonne a une seconde conséquence, plus importante que la taille : on peut lire **une colonne sans lire les autres**. Poids compressé de chacune, dans le fichier Parquet snappy de 37,85 Mo :

| colonne | poids | part |
|---|---|---|
| score (flottant, 6 décimales) | 15,57 Mo | 41,1 % |
| id_client (entier, 400 000 valeurs) | 9,61 Mo | 25,4 % |
| montant | 4,20 Mo | 11,1 % |
| remise | 3,18 Mo | 8,4 % |
| date | 2,16 Mo | 5,7 % |
| produit (120 valeurs) | 1,68 Mo | 4,4 % |
| quantite | 0,97 Mo | 2,6 % |
| region (4 valeurs) | 0,49 Mo | 1,3 % |

La répartition est très inégale, et prévisible : une colonne de flottants aléatoires à six décimales ne se compresse pas, elle fait à elle seule 41,1 % du fichier. Une colonne à quatre valeurs distinctes sur deux millions de lignes en fait 1,3 %.

Lire `montant` et `region` seules consomme 4,68 Mo, soit **12,4 % des octets**. En CSV, les deux mêmes colonnes imposent de lire les 105 258 186 octets du fichier entier — il n'y a pas d'autre moyen d'atteindre la fin d'une ligne que de la traverser. Sur ce fichier, le gain en temps n'est pas mesurable de façon fiable (0,05 s contre 0,04 s, trop court pour conclure) ; ce qui est mesuré, c'est le volume lu. Et sur S3, le volume lu est exactement ce qui est facturé en sortie.

Le partitionnement pousse la même idée plus loin : écrire un répertoire par valeur de `region` permet de ne jamais ouvrir les fichiers des autres régions.

| | taille | lignes lues |
|---|---|---|
| jeu partitionné complet, 4 fichiers | 54,2 Mo | 2 000 000 |
| partition `region=Nord` seule | 13,5 Mo | 499 792 |

75,0 % des octets évités pour une requête sur une seule région. Mais le total partitionné pèse **54,2 Mo contre 37,9 Mo** pour le fichier unique : découper coûte 43 % de volume supplémentaire, parce que chaque fichier recommence ses dictionnaires et ses statistiques, et que la compression travaille sur moins de lignes à la fois. Le partitionnement est un arbitrage, pas une amélioration : il se justifie quand les requêtes filtrent presque toujours sur la clé choisie, et il se retourne quand elles filtrent sur autre chose.

## Le problème des petits fichiers

Un jeu de 100 Go découpé en objets de 50 Ko, c'est 2 048 000 objets. Le stockage est identique dans les quatre cas ci-dessous — ce sont les mêmes 100 Go. C'est la colonne des requêtes qui change :

| découpage | objets | écriture (PUT) | stockage/mois | premier mois |
|---|---|---|---|---|
| 50 Ko | 2 048 000 | 11,26 $ | 2,50 $ | **13,76 $** |
| 1 Mo | 102 400 | 0,56 $ | 2,50 $ | 3,06 $ |
| 128 Mo | 800 | 0,00 $ | 2,50 $ | 2,50 $ |
| 1 Go | 100 | 0,00 $ | 2,50 $ | 2,50 $ |

Écrire les mêmes 100 Go coûte **4,5 fois plus cher** en petits morceaux, et le surcoût est entièrement dans les requêtes. Une relecture complète ajoute 0,90 $ en 2 048 000 GET, contre 0,00 $ en 800 GET.

Le piège se referme une seconde fois sur les classes économiques. Standard-IA, One Zone-IA et Glacier Instant Retrieval facturent une **taille minimale de 128 Ko par objet** :

| objet réel | facturé comme | surcoût |
|---|---|---|
| 8 Ko | 128 Ko | 16,0× |
| 50 Ko | 128 Ko | 2,6× |
| 128 Ko et plus | sa taille réelle | 1,0× |

Un million de fichiers de journal de 8 Ko archivés en Standard-IA sont facturés comme 128 Go au lieu de 8 Go. L'archivage « économique » a multiplié la facture par seize.

À quoi s'ajoutent les **durées minimales de facturation** : 30 jours en Standard-IA, 90 jours en Glacier Instant et Flexible, 180 jours en Deep Archive. Un objet supprimé avant terme est facturé jusqu'au terme. Un téraoctet déposé en Standard-IA puis supprimé au bout de cinq jours coûte les 30 jours, soit 14,13 $ au lieu de 14,13 × 5/30 = 2,36 $ — six fois le prix de ce qu'on a réellement utilisé.

## Stocker coûte moins cher que transférer

C'est l'asymétrie la plus coûteuse, et la seule qui ne figure sur aucun tableau de bord par défaut :

```
stockage S3 Standard   0,0250 $ / Go-mois
sortie internet        0,0900 $ / Go
```

**Télécharger un fichier une fois hors d'AWS coûte 3,6 fois le prix de le stocker un mois entier.** Pour un jeu de données de 500 Go :

| opération | coût |
|---|---|
| stocké douze mois | 150,00 $ |
| téléchargé une fois hors d'AWS | 45,00 $ |
| téléchargé par 20 collègues | **900,00 $** |

La dernière ligne, c'est six ans de stockage dépensés en une après-midi parce que l'équipe a copié le jeu de données en local. Le remède ne consiste pas à interdire les téléchargements, il consiste à placer le calcul là où sont les données : la sortie inter-région est à 0,0200 $/Go, et un transfert à l'intérieur d'une même région vers un service AWS n'est pas facturé sur cette ligne.

La même asymétrie disqualifie certaines classes d'archivage. Pour 1 To pendant un mois :

| classe | stockage | avec une relecture complète | durée minimale |
|---|---|---|---|
| Standard | 25,60 $ | 25,60 $ | — |
| Standard-IA | 14,13 $ | 24,37 $ | 30 j |
| Glacier Instant Retrieval | **5,12 $** | **35,84 $** | 90 j |
| Glacier Flexible (Bulk) | 4,15 $ | 9,27 $ | 90 j |

Glacier Instant Retrieval stocke pour cinq fois moins cher que Standard, et coûte **40 % plus cher que Standard** dès qu'on relit le jeu une fois par mois : 0,030 $/Go de restitution contre 0,025 $/Go-mois de stockage Standard. La classe n'est pas mauvaise, elle est mal nommée : « Instant » décrit la latence, pas l'usage. Elle est faite pour ce qu'on relit une ou deux fois par an.

Glacier Flexible en mode Bulk, à l'inverse, restitue à 0,005 $/Go : une relecture complète ne consomme que 2 % de l'économie annuelle. Pour des données vraiment froides, la restitution n'est pas le piège — la durée minimale de 90 jours l'est.

## Lambda ou une machine : la bascule dépend de la mémoire

Le point de bascule entre une fonction sans serveur et une machine allumée ne s'exprime pas en requêtes. Il dépend du produit durée × mémoire, parce que c'est lui qui est facturé. Contre une t3.small à 16,94 $/mois :

| profil de la fonction | bascule |
|---|---|
| 200 ms, 512 Mo (modèle linéaire, scikit-learn léger) | 9 072 840 requêtes/mois |
| 1 s, 2 Go (forêt de 800 arbres, chargement compris) | **505 048 requêtes/mois** |

Un facteur 18 entre les deux lignes, pour le même tarif. Une fonction qui garde deux gigaoctets en mémoire pendant une seconde consomme 2 Go-secondes par appel ; à ce régime, un million de requêtes par mois coûte 33,53 $, soit déjà le prix d'une t3.medium allumée en permanence. La règle habituelle — « Lambda jusqu'à quelques dizaines de millions de requêtes » — n'est vraie que pour des fonctions courtes et légères, ce qu'une inférence ML n'est presque jamais.

## Au clavier

1. Relever les tarifs à la date du jour, par région, avant tout calcul. Les arrondis de mémoire se trompent toujours dans le même sens : t3.medium est à 0,0464 $/h et non « environ 0,05 », g4dn.xlarge à 0,5840 et non « environ 0,53 », et un mois se compte en 730 heures.
2. Écrire en Parquet, et compter les objets autant que les octets. Le même téraoctet coûte de 7,86 à 25,60 $ par mois selon son format, et les mêmes 100 Go coûtent de 2,50 à 13,76 $ à écrire selon leur découpage.
3. Traiter la sortie de données comme la ligne la plus chère du devis. À 0,0900 $/Go contre 0,0250 $/Go-mois, un téléchargement vaut 3,6 mois de stockage : le calcul va vers les données, jamais l'inverse.

**Ressource** : AWS Price List Query API, et les pages de tarifs S3, EC2 et Lambda — https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html
