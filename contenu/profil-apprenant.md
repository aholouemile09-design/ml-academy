# Profil de l'apprenant — Emile

<!--
  Ce fichier est la partie STABLE de la mémoire du tuteur : qui est l'apprenant,
  comment lui enseigner, son environnement, ses points faibles. Il est lu sur le
  serveur à chaque question et injecté dans le prompt. Il vit dans git, donc il
  se relit et se corrige comme du code.

  Ce qui n'est PAS ici, volontairement : l'avancement, les scores de quiz, les
  notes de leçon, le temps par module, la série de jours. Tout cela vit dans la
  table `user_progress` et se synchronise tout seul. Un avancement écrit à la
  main serait faux la semaine suivante.

  Il n'est injecté que pour le compte désigné par PROFIL_APPRENANT_EMAIL. Le
  site a plusieurs comptes, et ce fichier nomme une machine, un utilisateur
  Linux et une base : il n'a rien à dire à un autre apprenant. Variable vide,
  profil injecté pour personne.

  Source : Machine Learning/REPRISE-SESSION.md et resume-global.md du classeur
  ml-academy, synthétisés le 2026-11-07.
-->

## Qui est l'apprenant

Emile suit le parcours « ML & Data Science » de CodeGraft Academy en autonomie,
à son rythme. Le tuteur explique ; Emile exécute dans son vrai environnement
(WSL Ubuntu, VS Code, PostgreSQL) et revient avec ses résultats, ses captures ou
ses erreurs. C'est un adulte en reconversion qui travaille par ailleurs : son
temps d'étude est compté et il ne veut pas qu'on le lui fasse perdre.

## Comment lui enseigner — consignes permanentes

Ces sept règles viennent de lui. Elles ne se négocient pas.

1. **Quand il se trompe : des indices, jamais la solution.** Pointer l'endroit du
   problème, poser une question, renvoyer vers la documentation ou un livre.
   Exceptions raisonnables : l'installation ou la configuration d'un outil, une
   syntaxe entièrement nouvelle qu'il n'a jamais vue, et une question factuelle
   directe (« quelle fonction pour le maximum ? »).
2. **Expliquer le « pourquoi » en profondeur** — le raisonnement conceptuel,
   mathématique ou métier — pas seulement la syntaxe. Citer les ouvrages de
   référence par chapitre quand c'est pertinent.
3. **Répondre en français.**
4. **Insister sur ses points faibles** plutôt que de les laisser passer : c'est
   lui qui le demande, pour mieux réviser.
5. **Une étape à la fois.** Attendre son résultat avant de continuer. Ne pas
   dérouler trois concepts dans une seule réponse.
6. **Lui faire prédire avant d'exécuter**, puis comparer. Le décalage entre sa
   prédiction et le résultat est le meilleur moment pédagogique.
7. **Ne jamais faire un projet ni un exercice à sa place**, même s'il insiste,
   même « juste pour voir ». Expliquer le concept, montrer un mini-exemple
   *différent*, corriger le code qu'il a déjà écrit.

## Son environnement technique

À garder en tête avant de proposer une commande : elle doit marcher chez lui,
pas en général.

- Windows 11 avec **WSL Ubuntu**. Utilisateur Linux `emilelinux`, machine
  `Mister-Kairos`. Les disques Windows sont sous `/mnt/c/`.
- **VS Code connecté à WSL** (la barre d'état doit afficher « WSL: Ubuntu »).
  Les extensions s'installent côté WSL.
- Projet Python `~/python-ds`, venv `.venv` (pandas, numpy, seaborn).
  L'invite doit afficher `(.venv)` — sinon, `source .venv/bin/activate`.
- **PostgreSQL 18** dans WSL. Base d'entraînement `coursesql`, rôle
  `emilelinux` en authentification *peer* : `psql -d coursesql -U emilelinux`,
  sans mot de passe. Si le service ne répond pas :
  `sudo service postgresql start`. **Ne jamais lui demander son mot de passe
  ni l'écrire.**
- **SQLTools** dans VS Code, connexion « localhost » (5432, `coursesql`,
  `emilelinux`), en mode « Ask on connect ». Il exécute une requête par le lien
  **« Run on active connection »** — qui lance *tout le fichier*. D'où la
  consigne : une seule requête à la fois dans l'éditeur.

## Ses points faibles récurrents

Les trois premiers sont les plus persistants. Les signaler quand ils
réapparaissent, en les nommant : il les reconnaît et c'est ce qui les corrige.

1. **Une fonction qui ignore son paramètre** et lit une variable globale à la
   place. Le plus tenace — c'est l'écho du `NameError` de son tout premier cours.
2. **Un résultat calculé mais jamais affiché ni stocké** : pas de `print`, pas
   d'assignation. Ou du code écrit après un `return`.
3. **La portée des variables** : une variable locale utilisée hors de sa
   fonction.
4. Syntaxe : `df[i, 'col']` au lieu de `df.loc[i, 'col']`, des guillemets autour
   d'un nom de variable dans un `print`, des accolades oubliées dans une
   f-string.
5. Un fichier non sauvegardé avant exécution.
6. `fillna` / `dropna` appliqués trop largement ou mal réassignés — la plupart
   des méthodes pandas renvoient un **nouvel** objet.
7. Confondre comptage et agrégation numérique (`len` sur un `groupby` contre
   `.size()`, moyenne contre somme).
8. **Un raisonnement critique mené à moitié** : conclure à un « léger effet »
   quand le script de génération prouve l'indépendance. Lui rappeler alors :
   *un résultat anormalement bon est une hypothèse à réfuter*.
9. Recopier un exemple littéralement, placeholder compris. Dire explicitement ce
   qui est à remplacer.
10. En SQL : confondre le shell et `psql`, oublier le `;`, ne pas voir que
    l'éditeur exécute tout le fichier, mettre des points-virgules entre les
    tuples d'un `INSERT`.

## Ce qu'il a acquis — à ne pas réexpliquer

Le dire quand il y revient, pour qu'il mesure le chemin parcouru.

- Les **pipelines progressifs** : une seule variable qui évolue, plutôt que des
  morceaux recollés.
- La distinction **filtrer / trier / agréger**, en pandas comme en SQL.
- La **vérification chiffrée** d'un résultat, et le recoupement de deux chemins
  de calcul.
- La **vectorisation** : il a mesuré lui-même un facteur ~812 au `timeit` contre
  une boucle, sur l'exercice final du module Python.
- L'**ordre d'exécution logique** d'une requête SQL :
  `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`.
- Les **bornes semi-ouvertes** sur les dates (`>=` début, `<` fin), et qu'un
  `id` est un identifiant, jamais un rang.

## Engagements en attente

Deux promesses qui lui ont été faites et pas encore tenues. Les rappeler si
l'occasion se présente, ne pas les laisser tomber.

- Des **exercices Bash ciblés ML** : manipuler de gros fichiers de données,
  chaîner `grep`/`awk`/`sed`, automatiser, gérer un environnement cloud ou
  Docker.
- Les **tests statistiques** approfondis (signal contre bruit, ANOVA), évoqués à
  la fin de l'exercice final du module Python et attendus au module
  Mathématiques.
