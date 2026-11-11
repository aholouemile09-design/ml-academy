Un pipeline d'intégration continue est la machine la plus privilégiée d'un projet : elle a les droits d'écriture sur le dépôt d'images, les clés du compte infonuagique, et elle exécute du code à chaque poussée. On la conçoit comme un automate qui fait gagner du temps. C'est aussi, et surtout, une cible.

Cette leçon ne porte pas sur la structure d'un pipeline — quelles étapes, dans quel ordre, avec quel seuil de qualité. Elle porte sur les quatre endroits où un pipeline correct devient dangereux ou non reproductible : le code tiers qu'il exécute, les droits qu'il accorde aux contributions extérieures, ce que ses journaux laissent voir, et le fait qu'une construction identique au mois dernier n'est pas garantie.

## Ce qu'un workflow exécute : du code que vous n'avez pas lu

Une ligne `uses: proprietaire/action@v4` dans un workflow signifie : *télécharge le dépôt de quelqu'un d'autre à l'étiquette `v4`, et exécute-le avec mes droits et mes secrets*. Le point faible n'est pas l'auteur, c'est l'étiquette. **Une étiquette Git est un pointeur modifiable.** Rien n'empêche son propriétaire — ou quiconque obtient son jeton — de la faire désigner un autre commit, et la même ligne de workflow exécute alors un autre code.

C'est exactement ce qui s'est produit en mars 2025 avec l'action `tj-actions/changed-files`, enregistrée sous CVE-2025-30066. Un jeton d'accès trop permissif a été compromis, un commit malveillant a été poussé, puis **toutes les étiquettes existantes, de `v1` à `v45.0.7`, ont été repointées vers ce commit**. Le code injecté lisait la mémoire du processus du runner et déversait les secrets trouvés dans les journaux de construction — publics, sur un dépôt public. L'action était utilisée par plus de 20 000 dépôts ; les analyses publiées ensuite estiment à environ deux cents ceux qui ont réellement exposé des secrets pendant la fenêtre. Les chiffres et les dates exactes varient selon les sources, qui sont des publications d'éditeurs de sécurité.

La défense est d'une ligne, et elle est structurelle plutôt que vigilante :

```yaml
# modifiable : l'etiquette peut etre repointee a tout moment
uses: tj-actions/changed-files@v45

# immuable : une empreinte de commit ne peut pas etre deplacee
uses: tj-actions/changed-files@a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0
```

Une empreinte de commit est calculée sur le contenu : la déplacer demanderait de fabriquer une collision SHA-1. Le coût de cette discipline est réel — il faut un outil ou un robot de dépendances pour mettre à jour les empreintes, et un commentaire `# v45.0.7` à côté pour que le workflow reste lisible. C'est le prix de ne pas dépendre de la sécurité du compte d'un inconnu.

| référence | déplaçable ? | ce qu'elle garantit |
|---|---|---|
| `@v4` | oui | rien |
| `@v4.2.1` | oui | rien de plus : c'est aussi une étiquette |
| `@main` | oui, à chaque commit | rien |
| `@<empreinte de commit>` | non | le contenu exact qui a été relu |

La deuxième ligne est celle qui surprend. Une version sémantique complète ressemble à un verrou, mais `v4.2.1` est une étiquette comme les autres.

## Les secrets et les contributions extérieures

Par défaut, une proposition de modification venant d'un dépôt bifurqué s'exécute **sans accès aux secrets** et avec un jeton en lecture seule. C'est volontaire : le code d'un inconnu ne doit pas pouvoir publier une image ou lire une clé.

Deux manières de défaire cette protection sans s'en rendre compte. La première est le déclencheur `pull_request_target`, qui existe pour les cas légitimes où un workflow doit commenter une proposition ou lui attribuer une étiquette. Il s'exécute dans le contexte du dépôt **cible**, donc avec les secrets. Le piège est de lui faire récupérer le code de la proposition :

```yaml
# dangereux : execute le code de l'inconnu avec les secrets du depot
on: pull_request_target
jobs:
  test:
    steps:
      - uses: actions/checkout@<empreinte>
        with:
          ref: ${{ github.event.pull_request.head.sha }}   # le code propose
      - run: make test                                      # qui fait ce qu'il veut
```

Il suffit alors qu'une proposition modifie le `Makefile`, ou n'importe quel script appelé par la construction, pour exécuter du code arbitraire avec les droits complets du dépôt. La règle : `pull_request_target` ne doit jamais récupérer puis exécuter le code proposé. S'il faut tester ce code, c'est `pull_request`, sans secrets.

La seconde est plus discrète : une substitution directe dans une commande de shell. `${{ github.event.pull_request.title }}` est interpolée **avant** que le shell ne lise la ligne. Un titre de proposition contenant une substitution de commande devient donc une commande.

```yaml
# le titre de la proposition est injecte dans le shell
- run: echo "Analyse de ${{ github.event.pull_request.title }}"

# la valeur passe par l'environnement : le shell la lit comme une donnee
- run: echo "Analyse de $TITRE"
  env:
    TITRE: ${{ github.event.pull_request.title }}
```

La deuxième forme est correcte parce que la valeur n'est plus du texte de programme : elle arrive dans une variable d'environnement, et le shell ne réévalue pas son contenu. C'est le même raisonnement que les requêtes paramétrées en SQL — ne jamais construire du code par concaténation avec une donnée reçue de l'extérieur.

## Le masquage ne masque que des chaînes exactes

Un moteur d'intégration continue masque les secrets dans les journaux en remplaçant **la valeur littérale** par des astérisques. C'est un filtre de sortie, pas un suivi de la donnée. Simulé sur un jeton factice de 24 caractères, avec un masquage par remplacement littéral :

| forme écrite dans le journal | masquée ? | le secret est-il récupérable ? |
|---|---|---|
| tel quel | oui | — |
| encodé en JSON échappé | oui | — |
| encodé en base64 | **non** | oui, en une commande |
| encodé en hexadécimal | **non** | oui |
| écrit en minuscules | **non** | oui |
| écrit à l'envers | **non** | oui |
| découpé par des sauts de ligne | **non** | oui, en recollant |
| un caractère sur deux | non | non, incomplet |
| empreinte SHA-256 | non | non, à moins de forcer |

La ligne la plus importante est la dernière des « oui » : le découpage par sauts de ligne. Le masquage s'applique **ligne par ligne**, et aucune ligne ne contient la valeur complète :

```
AKIAEXEM
PLEEXEMP
LEFICTIF
```

Les trois lignes passent le filtre sans modification, et recoller les morceaux redonne le jeton à l'identique. Le mécanisme est contourné sans aucune ruse cryptographique — un retour à la ligne suffit. C'est aussi ce qui se produit accidentellement, sans attaquant : une bibliothèque qui affiche une structure de données sur plusieurs lignes, un message d'erreur qui coupe une URL, un `set -x` qui trace une commande longue.

Les deux conséquences pratiques :

- **Le masquage est un filet, pas une barrière.** On ne décide pas qu'un journal est sûr parce que les astérisques apparaissent.
- **Un secret visible dans un journal est un secret compromis**, qu'il ait été lisible une minute ou six mois, et quel que soit le nombre de personnes ayant accès au journal. La seule réaction correcte est la rotation, pas la suppression du journal — un journal supprimé a déjà été indexé, mis en cache, ou copié par un robot.

## Une construction qui ne se reproduit pas

Un pipeline qui installe ses dépendances à chaque exécution ne construit pas deux fois la même chose. Mesuré sur l'environnement de ce cours :

| paquet | dépendances obligatoires déclarées |
|---|---|
| numpy 2.3.4 | 0 |
| pandas 3.0.3 | 3 (numpy, python-dateutil, tzdata) |
| scikit-learn 1.9.0 | 5 (joblib, narwhals, numpy, scipy, threadpoolctl) |
| transformers 5.12.1 | 9 |
| torch 2.12.1 | **15** |

Et au total, **203 distributions** sont présentes dans cet environnement. Chacune est un dépôt, un mainteneur, un compte qui peut publier une version. Un fichier de dépendances qui écrit `scikit-learn>=1.9` autorise toutes les versions futures : la construction de ce soir et celle de demain matin peuvent différer sans qu'une seule ligne du dépôt ait changé.

Trois niveaux de rigueur, par ordre de garantie croissante :

| ce qu'on écrit | ce qui est garanti |
|---|---|
| `scikit-learn` | rien, la dernière version du jour |
| `scikit-learn>=1.9` | pas de régression en dessous de 1.9 |
| `scikit-learn==1.9.0` | la version directe, mais pas celles de ses 5 dépendances |
| un fichier verrouillé avec empreintes | l'arbre complet, au bit près |

La troisième ligne est celle que la plupart des projets atteignent, et c'est insuffisant : épingler `scikit-learn==1.9.0` laisse `scipy`, `joblib`, `numpy`, `narwhals` et `threadpoolctl` libres. Un fichier verrouillé — `pip-compile --generate-hashes`, `poetry.lock`, `uv.lock` — fixe l'arbre entier et, avec les empreintes, vérifie que le fichier téléchargé est bien celui qui a été relu. Une version republiée sous le même numéro est alors rejetée au lieu d'être installée.

Cela a un prix en entretien : il faut régénérer le verrou, lire ce qui a changé, et accepter que la mise à jour soit un commit visible plutôt qu'un effet de bord invisible. C'est précisément ce qu'on veut.

Pour un projet de ML, le raisonnement s'étend d'un cran. Un modèle est le produit d'un code, de données et d'un environnement. Les trois doivent être identifiables ensemble : l'empreinte du commit, l'empreinte du jeu de données, et le fichier verrouillé. Si l'un des trois manque, « reproduire l'entraînement de la semaine dernière » est une intention, pas une opération.

## S'authentifier sans secret de longue durée

Un secret stocké dans un dépôt a deux propriétés gênantes : il ne change presque jamais, et il est valide partout. Une clé d'accès copiée dans les secrets d'un dépôt en 2024 fonctionne encore aujourd'hui, depuis n'importe quelle machine du monde.

L'alternative est l'identité fédérée. Le moteur d'intégration continue émet, pour chaque exécution, un jeton signé de courte durée décrivant le contexte : le dépôt, la branche, le workflow. Le compte infonuagique est configuré pour **faire confiance à l'émetteur** et accorder un rôle aux jetons dont le sujet correspond. Aucune clé n'est stockée nulle part, et un jeton volé expire en quelques minutes.

Toute la sécurité du dispositif tient dans une condition, et c'est là que les erreurs se concentrent :

```json
{
  "Condition": {
    "StringEquals": {
      "token.actions.githubusercontent.com:sub":
        "repo:mon-org/mon-depot:ref:refs/heads/main"
    }
  }
}
```

Écrire `"repo:mon-org/*"`, ou utiliser `StringLike` avec `"repo:mon-org/mon-depot:*"`, accorde le rôle à **n'importe quelle branche et n'importe quelle référence** du dépôt — y compris des références créées par des contributions extérieures. Une condition large est un secret partagé avec plus de monde qu'on ne le croit ; la seule différence avec une clé copiée en clair est qu'elle est plus difficile à auditer.

## Au clavier

1. Épingler chaque action tierce par empreinte de commit, jamais par étiquette. `v45` et `v45.0.7` sont tous deux déplaçables : c'est précisément le mécanisme de CVE-2025-30066, qui a repointé `v1` à `v45.0.7` vers un commit malveillant en mars 2025.
2. Ne jamais faire passer une donnée extérieure par du texte de programme. Un titre de proposition interpolé dans un `run:` est une exécution de code ; la même valeur dans un `env:` est une chaîne de caractères.
3. Traiter tout secret apparu dans un journal comme compromis et le faire tourner. Le masquage par remplacement littéral tombe devant un base64, un passage en minuscules ou un simple retour à la ligne — vérifié sur neuf formes, dont sept échappent au filtre et cinq rendent le secret directement récupérable.

**Ressource** : GitHub Docs, « Security hardening for GitHub Actions » — https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
