Un conteneur résout le problème « ça marche sur ma machine », et il en crée un autre que personne ne voit venir : une image de machine virtuelle allégée se construit en quelques secondes, mais elle se télécharge à chaque démarrage, sur chaque machine, à chaque déploiement. Une API d'inférence mal empaquetée transporte plus d'un gigaoctet de dépendances pour servir un modèle de 18 Mo. Le reste, ce sont des bibliothèques que personne n'a choisies.

Cette leçon porte sur la mécanique interne : ce qu'est réellement une image, ce que la commande de construction envoie avant même de commencer, où se trouve le poids quand on le mesure, et pourquoi la même image a deux tailles différentes selon l'endroit où on la regarde.

Docker n'est pas installé sur la machine qui a servi à préparer cette leçon. Les chiffres qui suivent sont donc de deux sortes : l'empreinte disque réelle des dépendances et du répertoire de travail, mesurée directement, et le comportement des couches, reproduit avec des archives `tar` — qui est exactement le format dans lequel une couche d'image est stockée. Chaque fois qu'une mesure est une simulation, c'est écrit.

## Une image n'est pas un dossier, c'est une pile de couches

Le modèle mental naturel est faux. On imagine une image comme un dossier dont on ajoute et retire des fichiers. En réalité, une image est une **pile d'archives empilées**, chacune contenant uniquement les différences par rapport à celle du dessous. Chaque instruction du Dockerfile produit une couche, et une couche écrite ne peut plus être modifiée : elle est identifiée par l'empreinte de son contenu.

La conséquence tient en une phrase : **supprimer un fichier n'enlève rien**. La couche qui « supprime » ajoute un marqueur — un fichier spécial nommé `.wh.<nom>` dans le format de couche — qui indique au système de fichiers d'union de masquer l'entrée des couches inférieures. Le fichier masqué est toujours là, dans la couche du dessous, et il voyage à chaque téléchargement de l'image.

Reproduit avec des archives `tar`, pour un fichier de données de 40 Mo copié puis supprimé :

| couche | contenu | taille |
|---|---|---|
| 1 | copie de `donnees.bin` | 40,0 Mo |
| 2 | ajout de `app.py` et du marqueur `.wh.donnees.bin` | 0,0098 Mo |
| image | somme des deux couches | **40,0 Mo** |
| conteneur | ce que `ls` affiche à l'intérieur | 0,0 Mo |

L'écart entre les deux dernières lignes est tout le sujet. Un conteneur dans lequel le fichier est introuvable, sur une image qui le transporte quand même. Les 40 Mo sont payés en stockage de registre, en bande passante, et en temps de démarrage à chaque mise à l'échelle.

La seule issue est de ne jamais écrire le fichier dans une couche conservée. Télécharger, décompresser et nettoyer dans une **seule** instruction `RUN` enchaînée produit une seule couche, dont le contenu final est le seul enregistré :

```dockerfile
# deux couches : l'archive reste dans la premiere, pour toujours
RUN curl -o donnees.tar.gz https://exemple.invalid/donnees.tar.gz
RUN tar -xzf donnees.tar.gz && rm donnees.tar.gz

# une seule couche : l'archive n'y figure jamais
RUN curl -o donnees.tar.gz https://exemple.invalid/donnees.tar.gz \
 && tar -xzf donnees.tar.gz \
 && rm donnees.tar.gz
```

Le même raisonnement vaut pour les caches d'outils, les fichiers temporaires de compilation et les clés privées. Une clé copiée dans une couche puis supprimée dans la suivante **reste lisible** par quiconque télécharge l'image : il suffit d'extraire les couches une à une. C'est une fuite de secret, pas un problème de taille.

## Ce que la commande de construction envoie avant de commencer

Avant d'exécuter la première instruction, le client transmet au démon le **contexte de construction** : le contenu du répertoire désigné par le dernier argument de `docker build`. Le point final n'est pas une décoration, c'est le chemin de ce qui part.

Mesuré sur le répertoire de ce projet, qui n'a rien d'exceptionnel :

| répertoire | taille | fichiers | dans l'image ? |
|---|---|---|---|
| `.next` | 501,9 Mo | 188 | non, régénéré à la construction |
| `node_modules` | 377,2 Mo | 12 315 | non, réinstallé à la construction |
| `graphify-out` | 7,3 Mo | 197 | non, outil de développement |
| `.git` | 3,6 Mo | 1 252 | non, et contient tout l'historique |
| `lib` | 1,7 Mo | 33 | oui |
| `contenu` | 0,6 Mo | 106 | oui |
| `app` | 0,4 Mo | 55 | oui |
| `components` | 0,2 Mo | 30 | oui |
| **total du répertoire** | **893,1 Mo** | | |
| dont inutile à l'image | 890,0 Mo | | **100 %** |

Le code source réel qui doit entrer dans l'image pèse 1,7 + 0,6 + 0,4 + 0,2 = 2,9 Mo dans ces quatre répertoires, et 893,1 − 890,0 = 3,1 Mo en comptant les fichiers de configuration de la racine. Sans fichier d'exclusion, **893,1 Mo sont transférés pour en utiliser 3,1** — l'arrondi à 100 % de la dernière ligne n'est pas une approximation commode, c'est ce que donne le calcul.

Deux détails que la taille seule ne montre pas. Le premier : `.next` ne contient que 188 fichiers pour 501,9 Mo, alors que `node_modules` en contient 12 315 pour 377,2 Mo. Le temps de transfert d'un contexte dépend plus du nombre de fichiers que de leur poids total, parce que chacun est traité individuellement ; les 12 315 petits fichiers coûtent plus cher que les 188 gros. Le second : `.git` fait 3,6 Mo et contient **l'historique entier**. Un secret commis puis retiré six mois plus tôt est encore dedans.

C'est une raison d'exclure qui n'a rien à voir avec la taille de l'image finale : le contexte part même pour les répertoires que le Dockerfile ne copie jamais.

## Où est le poids, mesuré paquet par paquet

« L'image est trop grosse » est un diagnostic inutile tant qu'on n'a pas regardé la répartition. Empreinte disque réelle des paquets scientifiques installés sur cette machine, en Python 3.13.9 :

| paquet | taille | fichiers |
|---|---|---|
| torch | 492,0 Mo | 13 920 |
| scipy | 108,3 Mo | 2 516 |
| xgboost | 97,0 Mo | 109 |
| transformers | 90,2 Mo | 4 919 |
| pyarrow | 84,2 Mo | 858 |
| pandas | 59,9 Mo | 2 982 |
| sklearn | 40,0 Mo | 1 708 |
| numpy | 31,9 Mo | 1 320 |
| matplotlib | 27,0 Mo | 796 |
| PIL | 14,9 Mo | 211 |
| tokenizers | 7,4 Mo | 42 |
| huggingface_hub | 5,4 Mo | 365 |
| lightgbm | 4,8 Mo | 22 |
| datasets | 4,3 Mo | 281 |
| safetensors | 0,8 Mo | 17 |
| **total mesuré** | **1 068,0 Mo** | |
| `site-packages` entier | 1 923,5 Mo | 64 426 |

La répartition est brutalement inégale. **torch seul représente 46 % des 1 068 Mo mesurés**, et plus de fichiers que les six paquets suivants réunis. Une API qui sert un modèle scikit-learn n'a besoin que de numpy, pandas, scipy et sklearn : **240,0 Mo, soit 4,4 fois moins** que l'ensemble. Le rapport ne se gagne pas en optimisant quinze paquets, il se gagne en n'installant pas celui qui pèse la moitié.

Deux lignes méritent une lecture attentive. `xgboost` pèse 97,0 Mo en seulement 109 fichiers : c'est une bibliothèque compilée, presque tout le poids est dans un binaire unique, et rien ne se « nettoie » là-dedans. À l'inverse, `transformers` fait 90,2 Mo en 4 919 fichiers, dont une grande partie est du code Python pour des architectures de modèles que l'application n'utilisera jamais — mais qu'on ne peut pas retirer sélectivement sans casser les imports.

L'écart entre les 1 068 Mo mesurés et les 1 923,5 Mo de `site-packages` entier — 855 Mo — est le reste : tous les autres paquets, dont les bibliothèques partagées installées en tant que dépendances transitives. C'est l'ordre de grandeur de ce qu'un environnement de développement accumule sans qu'on le remarque.

## Une image a deux tailles

La taille affichée localement et la taille stockée dans un registre sont deux nombres différents, et c'est le second qui détermine le temps de démarrage. Les couches sont transférées **compressées** en gzip. Mesure sur 40 Mo de deux natures :

| contenu | brut | gzip | ratio |
|---|---|---|---|
| données aléatoires | 40,0 Mo | 40,0 Mo | 1,00× |
| code source Python réel | 40,0 Mo | 8,7 Mo | 4,58× |

Le ratio de 1,00× sur les données aléatoires n'est pas un échec de mesure : du bruit n'a pas de redondance à exploiter, et gzip ne peut rien en faire. C'est exactement le cas des **poids de modèle** — un tableau de nombres flottants entraînés ressemble statistiquement à du bruit. Un fichier de modèle de 18 Mo dans une image occupe 18 Mo dans le registre. Le code Python, lui, se compresse plus de quatre fois.

D'où une asymétrie utile. Prenons deux images affichant toutes deux 1 500 Mo — l'ordre de grandeur d'une API qui installe torch sans y réfléchir, puisque ce seul paquet pèse 492,0 Mo. Celle dont la majeure partie est du code et des bibliothèques Python, compressibles à 4,58×, ne transfère peut-être que 400 à 500 Mo. Celle qui est dominée par des poids de modèle en transfère 1 500. Les deux affichent le même nombre.

Le transfert est par ailleurs **incrémental** : une couche déjà présente dans le registre n'est pas renvoyée, et une couche déjà présente sur la machine qui démarre n'est pas retéléchargée. Modifier une ligne de code dans la dernière couche d'une image de 1,5 Go ne pousse que cette couche. C'est aussi pourquoi un déploiement qui change une dépendance coûte dix fois plus cher qu'un déploiement qui change du code : il invalide une couche basse, et tout ce qui est au-dessus doit être repoussé.

L'ordre de grandeur en argent, avec le tarif de sortie internet d'AWS pour Canada (Central) relevé le 2026-11-10, **0,0900 $/Go** pour la première tranche de 10 To : télécharger une image de 1 500 Mo hors d'AWS coûte 1,5 × 0,0900 = 0,135 $. Négligeable une fois. Deux cents démarrages par mois sur une mise à l'échelle automatique, c'est 200 × 0,135 = 27,00 $ par mois de bande passante pour transporter des dépendances dont la moitié ne sert pas.

## Le modèle dans l'image, ou à côté

Reste une décision que le Dockerfile tranche sans le dire : le fichier de modèle entre-t-il dans l'image, ou est-il téléchargé au démarrage ?

| | modèle dans l'image | modèle téléchargé au démarrage |
|---|---|---|
| version servie | gravée dans l'empreinte de l'image | dépend de ce qu'il y a dans le stockage |
| ce qu'il faut annuler pour revenir en arrière | l'image entière, code compris | le fichier seul, l'image ne bouge pas |
| démarrage à froid | rien à faire, le fichier est là | une lecture réseau avant le premier service |
| changer de modèle | reconstruire et redéployer | déposer un fichier |
| taille de l'image | + la taille du modèle, non compressible | inchangée |

Il n'y a pas de bonne réponse générale, il y a une question à poser : **est-ce qu'on veut qu'un changement de modèle soit un déploiement ?** Si la réponse est oui — et c'est le cas dès que le modèle fait partie du produit testé — le modèle appartient à l'image, parce qu'une image porte alors une version unique et vérifiable de l'ensemble code + modèle. Si la réponse est non, parce que le modèle est réentraîné chaque nuit, le charger depuis un stockage externe au démarrage est la seule option praticable.

Le coût du second choix est mesurable avec les chiffres du module précédent : une forêt de 800 arbres pèse 18,19 Mo et se charge en 98 ms depuis un disque local. Ajouter la lecture réseau au démarrage allonge d'autant le temps avant la première réponse, et introduit une dépendance : si le stockage est indisponible, le conteneur démarre et ne sert rien. Un conteneur qui démarre sans son modèle est un conteneur en bonne santé aux yeux de l'orchestrateur, et cassé aux yeux des utilisateurs. L'écart entre ces deux jugements est ce qui rend l'incident long à diagnostiquer.

## Au clavier

1. Mesurer l'empreinte des dépendances avant d'optimiser quoi que ce soit. Quand un seul paquet représente 46 % du poids, les quatorze autres ne méritent pas une minute d'attention.
2. Considérer le contexte de construction comme un transfert, pas comme une liste de copies. Sur ce projet, 890,0 Mo sur 893,1 partent sans servir — et `.git` y emporte l'historique complet, secrets retirés compris.
3. N'écrire dans une couche que ce qui doit y rester. Un fichier supprimé à l'instruction suivante est encore dans l'image, lisible, et transféré à chaque téléchargement : ce qui compte comme fuite de secret, pas seulement comme poids mort.

**Ressource** : Docker Docs, « Understand image layers » et « Build context » — https://docs.docker.com/build/building/context/
