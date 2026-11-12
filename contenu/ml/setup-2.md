Git fait deux choses. Il te permet de revenir en arrière sans peur, ce qui change la façon dont on écrit du code. Et il raconte l'histoire d'un projet, ce qui est la première chose qu'un recruteur regarde — avant ton CV, souvent.

La difficulté de Git n'est pas sa syntaxe, c'est son modèle. Tant qu'on ne voit pas où vivent les fichiers, les commandes semblent arbitraires et on les applique de mémoire en espérant. Commençons donc par là.

## Les quatre endroits où vit ton code

```
répertoire de travail  →  index (staging)  →  dépôt local  →  dépôt distant
        git add              git commit          git push
```

**Le répertoire de travail** est ce que tu vois dans ton éditeur. Tes modifications y sont, et Git ne les connaît pas encore.

**L'index**, ou zone de préparation, est le brouillon du prochain commit. `git add` y dépose une photo du fichier **à cet instant**. Si tu modifies le fichier après le `git add`, la nouvelle version n'est pas dans l'index — c'est la source de surprise la plus fréquente du débutant, et `git status` la signale en affichant le même fichier dans les deux sections.

**Le dépôt local** contient l'historique des commits, dans le dossier `.git`. Il est complet : tu peux consulter tout l'historique et créer des branches sans réseau.

**Le dépôt distant** (GitHub) est une copie du dépôt local, synchronisée explicitement. Git est décentralisé : rien ne part tant que tu n'as pas poussé, et rien n'arrive tant que tu n'as pas tiré.

L'existence de l'index déroute au début — pourquoi deux étapes ? Parce qu'elle permet de **choisir** ce qui entre dans un commit. Tu as corrigé un bug et renommé trois variables ? Tu peux faire deux commits distincts à partir du même état de ton disque.

### Un commit est un instantané

Contrairement à ce que suggère l'affichage des différences, Git ne stocke pas des modifications : il stocke l'**état complet** du projet à chaque commit. Les différences sont calculées à l'affichage.

Chaque commit porte un identifiant de 40 caractères, l'empreinte de son contenu, de son message, de sa date et de son parent. Changer quoi que ce soit dans un commit en change l'empreinte, et celle de tous ses descendants — c'est ce qui rend un historique Git infalsifiable, et aussi ce qui rend la réécriture d'historique dangereuse quand d'autres ont déjà récupéré les commits.

`HEAD` désigne l'endroit où tu es : le dernier commit de la branche courante. `HEAD~1` est son parent, `HEAD~3` l'arrière-arrière-grand-parent. Cette notation sert dans la plupart des commandes d'annulation.

## Lire l'état avant d'agir

```bash
git status              # où en suis-je
git diff                # ce qui est modifié mais PAS encore ajouté
git diff --staged       # ce qui est dans l'index, donc ce que je m'apprête à commiter
git log --oneline -10   # les dix derniers commits
git log --oneline --graph --all    # l'arbre des branches
```

`git diff --staged` avant chaque commit est l'habitude la plus rentable de toutes. Elle prend trois secondes et elle attrape le fichier de données ajouté par erreur, la ligne de débogage oubliée, la clé laissée dans un fichier de configuration. Un commit se relit avant d'être écrit, exactement comme un courriel.

`git status` ne se contente pas d'informer : il **suggère la commande suivante** dans chaque section. Il dit littéralement quoi taper pour ajouter, pour retirer de l'index, pour annuler. Le lire en entier plutôt que de chercher la commande ailleurs fait gagner des mois.

## Annuler

C'est ce qu'on cherche en urgence, donc autant l'avoir lu à froid.

| Situation | Commande |
| --- | --- |
| Annuler des modifications non ajoutées | `git restore fichier` |
| Retirer un fichier de l'index, garder les modifications | `git restore --staged fichier` |
| Corriger le dernier commit, pas encore poussé | `git commit --amend` |
| Défaire le dernier commit, garder les modifications | `git reset --soft HEAD~1` |
| Défaire le dernier commit et les modifications | `git reset --hard HEAD~1` |
| Annuler un commit déjà poussé | `git revert <hash>` |

Les deux dernières lignes sont de natures opposées et il faut les distinguer.

`git reset` **réécrit l'histoire** : le commit disparaît comme s'il n'avait jamais existé. `git revert` **ajoute un commit** qui applique l'inverse du précédent ; l'histoire reste intacte et montre qu'on a annulé.

D'où la seule règle de Git qu'il faut tenir sans exception : **ne réécris jamais un historique que tu as déjà poussé.** Si quelqu'un a récupéré ces commits, les empreintes ne correspondent plus et sa copie diverge de façon pénible à réparer. En local, avant le `push`, fais ce que tu veux. Après, c'est `revert`.

Et `git reset --hard` supprime du travail sans corbeille. Avant de le taper, vérifie que c'est bien ce que tu veux — ou commite d'abord, quitte à annuler ensuite.

Un filet de sécurité peu connu : `git reflog` garde la trace de tous les déplacements de `HEAD`, y compris ceux qu'un `reset` a effacés de l'historique visible. Un commit « perdu » est presque toujours récupérable pendant plusieurs semaines.

## Les branches

Une branche est un **pointeur vers un commit**, rien de plus. Pas une copie du projet, pas un dossier : une ligne de texte dans `.git` contenant une empreinte. C'est pourquoi créer une branche est instantané, même sur un dépôt énorme.

```bash
git switch -c feature/eda     # créer et basculer (forme moderne)
git checkout -b feature/eda   # la même chose, forme historique
git switch main               # revenir
git branch                    # lister
git branch -d feature/eda     # supprimer, une fois fusionnée
```

Quand tu commites, le pointeur de la branche courante avance. Quand tu bascules, Git remplace le contenu de ton répertoire de travail par celui du commit pointé.

### Fusionner

```bash
git switch main
git merge feature/eda
```

Deux cas se présentent, et le vocabulaire des messages de Git vient de là.

**L'avance rapide.** Si `main` n'a pas bougé depuis la création de la branche, Git déplace simplement le pointeur de `main` en avant. Aucun commit de fusion n'est créé, l'historique reste linéaire.

**La fusion à trois points.** Si les deux branches ont avancé chacune de leur côté, Git compare les deux états avec leur ancêtre commun et crée un **commit de fusion** à deux parents.

Dans le second cas, si les deux branches ont modifié les mêmes lignes du même fichier, Git ne tranche pas et te laisse un **conflit** :

```
<<<<<<< HEAD
la version de main
=======
la version de la branche
>>>>>>> feature/eda
```

Il n'y a rien de magique à faire : ouvre le fichier, garde ce qui doit l'être, **supprime les trois lignes de marqueurs**, puis `git add` le fichier et `git commit`. L'erreur classique est de laisser un `=======` dans le code, qui part en production et casse tout à l'exécution. Relis le fichier entier avant d'ajouter.

`git merge --abort` remet tout comme avant si tu préfères reprendre à tête reposée.

## Travailler avec le dépôt distant

```bash
git remote -v                    # quels distants, à quelle adresse
git fetch                        # récupérer sans rien fusionner
git pull                         # = fetch + merge
git push origin main             # envoyer
git push -u origin main          # et mémoriser le lien, une seule fois
```

`git pull` est un raccourci pour deux opérations, et c'est utile de le savoir : quand un `pull` tourne mal, `git fetch` puis `git log origin/main` permet de **regarder** ce qui est arrivé avant de l'intégrer.

Le message `rejected — non-fast-forward` sur un `push` veut dire une chose : le distant contient des commits que tu n'as pas. Quelqu'un a poussé entre-temps, ou tu as réécrit ton historique. La réponse est `git pull` puis un nouveau `push` — jamais `git push --force`, qui écrase le travail de l'autre.

### S'authentifier

**Le mot de passe GitHub ne fonctionne plus depuis 2021.** Deux options le remplacent :

Un **jeton d'accès personnel** (PAT), généré dans les réglages GitHub, avec la portée `repo`, et qu'on utilise à la place du mot de passe. Il n'est affiché **qu'une fois** à la création : copie-le immédiatement. `git config --global credential.helper store` évite de le retaper, en l'écrivant en clair dans un fichier de ton dossier personnel — acceptable sur une machine personnelle, pas sur une machine partagée.

Une **clé SSH**, générée une fois avec `ssh-keygen -t ed25519`, dont la partie publique est déposée sur GitHub. L'adresse du dépôt change alors de forme : `git@github.com:toi/projet.git` au lieu de `https://...`. C'est plus confortable à l'usage et c'est ce que tu finiras par utiliser.

## Ce que Git gère mal

Git a été conçu pour du texte. Trois types de fichiers le mettent en difficulté, et il faut le savoir avant de les versionner.

**Les gros fichiers.** Chaque version d'un fichier est stockée intégralement. Un CSV de 200 Mo modifié dix fois pèse deux gigaoctets dans l'historique, pour toujours — même supprimé ensuite. GitHub refuse au-delà de 100 Mo par fichier.

**Les binaires.** Images, modèles entraînés, archives : Git ne sait pas en calculer une différence lisible, ni fusionner deux versions. Un modèle `.pkl` ou `.h5` n'a rien à faire dans un dépôt.

**Les notebooks Jupyter.** Un `.ipynb` est un JSON qui contient le code **et** les sorties, et les sorties changent à chaque exécution. Deux personnes qui lancent le même notebook produisent un conflit sur des numéros de cellules. Deux réponses : exporter la logique dans des modules `.py` dans `src/` et garder le notebook pour l'exploration, ou installer un outil de nettoyage des sorties avant commit.

C'est pourquoi un `.gitignore` de projet ML ressemble à ceci :

```
.env
.venv/
__pycache__/
*.pyc
data/
*.csv
*.parquet
models/
*.pkl
.ipynb_checkpoints/
.DS_Store
```

Et une propriété essentielle, qui surprend tout le monde une fois : **le `.gitignore` ne s'applique pas aux fichiers déjà suivis.** Ajouter `data/` au `.gitignore` alors que `data/gros.csv` est déjà dans l'historique ne change rien ; Git continue de le suivre. Il faut l'en retirer explicitement, et l'exercice de cette leçon te fera écrire la commande.

## Le dépôt comme portfolio

Pour un poste en ML, ton GitHub est regardé avant ton CV. Ce qui s'y lit en trente secondes :

**Le README.** C'est la seule chose que la plupart des visiteurs liront. Quatre éléments suffisent : ce que fait le projet en deux phrases, comment l'installer et le lancer, un résultat ou une capture, et ce que tu as appris ou ce que tu ferais différemment. Un dépôt sans README est un dépôt que personne n'ouvre.

**L'historique des commits.** Une suite de « update », « fix », « test2 » dit que tu n'as pas encore d'habitudes de travail. Une suite de messages précis dit l'inverse, et c'est gratuit.

**L'absence de bruit.** Pas de `.venv/` versionné, pas de données brutes, pas de `.env`. Un dépôt propre se remarque parce que la plupart ne le sont pas.

Mieux vaut trois dépôts finis et documentés que quinze dépôts abandonnés après le premier notebook.

## Au clavier

- **`git add .` ajoute tout, y compris ce que tu n'as pas regardé.** Prends `git status` puis `git add` par fichier tant que tu n'as pas un `.gitignore` solide. C'est deux secondes de plus et ça évite la clé poussée.
- **Un dépôt cloné n'a pas ton identité.** `git config --global user.name` et `user.email` se règlent une fois par machine. Avec une mauvaise adresse, tes commits n'apparaissent pas sur ton profil GitHub — et la correction après coup demande de réécrire l'historique.
- **`git commit` sans `-m` ouvre un éditeur**, souvent Vim, et on reste coincé dedans. `:q!` pour sortir sans valider. `git config --global core.editor "code --wait"` règle le problème pour de bon.
- **La branche par défaut s'appelle `main`**, plus `master`, depuis 2020. Un `git push origin master` sur un dépôt récent crée une deuxième branche au lieu de pousser sur la bonne.
- **`git log --follow fichier`** suit un fichier à travers ses renommages. Utile le jour où tu cherches quand une fonction a été écrite.

Pour aller plus loin, le livre Pro Git est gratuit et en français sur git-scm.com. Les trois premiers chapitres couvrent tout ce dont tu auras besoin pendant deux ans.
