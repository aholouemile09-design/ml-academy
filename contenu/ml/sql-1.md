SQL est le langage des bases de données relationnelles. C'est aussi l'outil le plus durable de tout l'écosystème data : les bibliothèques Python changent tous les trois ans, SQL est à peu près le même depuis 1990 et il sera encore là à la fin de ta carrière.

## Ce qu'est une base relationnelle

Une table est une grille : des **colonnes** typées, qui décrivent la nature de l'information, et des **lignes**, qui sont les enregistrements. Ta table `employes` a six colonnes — `id`, `nom`, `age`, `departement`, `salaire`, `actif` — et onze lignes.

Deux propriétés distinguent une table d'un fichier Excel, et elles expliquent pourquoi les entreprises mettent leurs données là plutôt que dans des tableurs.

**Le type est garanti.** La colonne `age` est un `INT`. Il est impossible d'y écrire « trente-deux ans ». Dans un tableur, rien ne l'empêche, et la colonne devient un mélange de nombres et de texte que plus personne ne sait traiter. La base refuse, bruyamment, au moment de l'écriture — au lieu de laisser la saleté entrer et de la découvrir six mois plus tard pendant l'entraînement d'un modèle.

**L'identité est stable.** La colonne `id`, déclarée `SERIAL PRIMARY KEY`, attribue à chaque ligne un numéro unique qui ne change jamais. C'est ce qui permet à une autre table de pointer vers cette ligne-là, et de continuer à la désigner correctement quand on trie, qu'on ajoute ou qu'on supprime autour.

### SQL est déclaratif

Il y a une différence de nature avec Python, et elle mérite d'être comprise tout de suite.

En Python, tu écris **comment** : boucler sur les lignes, tester une condition, accumuler un total. En SQL, tu écris **ce que tu veux** : « la moyenne des salaires par département, pour les départements de plus de trois personnes ». Le moteur décide tout seul comment l'obtenir — dans quel ordre lire, quel index utiliser, comment regrouper.

Conséquence pratique : une requête SQL n'a pas de « ligne courante ». Chercher la boucle est le premier réflexe à désapprendre. Tu décris un **résultat**, pas un parcours.

## SELECT : poser une question

```sql
SELECT nom, departement, salaire
FROM employes
WHERE departement = 'Data' AND actif = true
ORDER BY salaire DESC
LIMIT 5;
```

Lis-la comme une phrase : prends la table `employes`, garde les lignes où la condition est vraie, affiche ces trois colonnes, trie par salaire décroissant, n'en montre que cinq.

`SELECT *` prend toutes les colonnes. C'est pratique pour explorer, et c'est à éviter partout ailleurs : le jour où quelqu'un ajoute une colonne à la table, ton code reçoit une colonne de plus sans prévenir. Nomme les colonnes dont tu as besoin.

### Filtrer avec WHERE

Les comparaisons habituelles fonctionnent — `=`, `<>` (différent), `<`, `>`, `<=`, `>=` — et se combinent avec `AND`, `OR`, `NOT`. Trois formes de plus valent d'être connues, parce qu'elles rendent les conditions beaucoup plus lisibles :

```sql
WHERE departement IN ('Data', 'Engineering')     -- au lieu de deux OR
WHERE salaire BETWEEN 50000 AND 80000            -- bornes incluses
WHERE nom LIKE 'A%'                              -- commence par A
```

Attention à l'**ordre d'évaluation** : `AND` est prioritaire sur `OR`, exactement comme la multiplication sur l'addition. `WHERE a OR b AND c` se lit `a OR (b AND c)`. Si tu voulais `(a OR b) AND c`, les parenthèses ne sont pas une coquetterie, elles changent le résultat. Mets-les dès qu'il y a un `OR`.

Pour `BETWEEN`, retiens que les deux bornes sont **incluses**. C'est pratique sur des entiers et dangereux sur des dates : `BETWEEN '2026-10-01' AND '2026-10-31'` laisse dehors tout ce qui s'est passé le 31 octobre après minuit, dès que la colonne porte une heure. Sur des dates, préfère toujours `>= début AND < début du mois suivant`.

## NULL n'est pas une valeur

C'est le point sur lequel tout le monde se fait avoir une fois, et il faut s'y arrêter.

`NULL` ne veut pas dire zéro, ni chaîne vide. Il veut dire **inconnu**. Et la conséquence est que SQL n'a pas deux valeurs de vérité, mais trois : vrai, faux, et **inconnu**.

```sql
SELECT * FROM employes WHERE salaire = NULL;   -- rend toujours 0 ligne
SELECT * FROM employes WHERE salaire IS NULL;  -- la bonne forme
```

La première requête ne lève aucune erreur et ne rend jamais rien. Pourquoi ? Parce que `salaire = NULL` demande « cette valeur inconnue est-elle égale à une valeur inconnue ? », et la réponse honnête est « je ne sais pas » — ni vrai, ni faux. Le `WHERE` ne garde que ce qui est **vrai**. L'inconnu est écarté comme le faux.

Les mêmes trois caractères piègent la négation. Si `actif` peut être `NULL`, alors `WHERE actif <> true` **ne rend pas** les lignes où `actif` est inconnu : la comparaison vaut inconnu, pas vrai. Pour les attraper, il faut le dire : `WHERE actif IS DISTINCT FROM true`, ou `WHERE actif <> true OR actif IS NULL`.

Deux outils pour vivre avec :

```sql
-- remplacer le NULL par une valeur de repli
SELECT nom, COALESCE(salaire, 0) AS salaire FROM employes;

-- tester explicitement
SELECT * FROM employes WHERE departement IS NOT NULL;
```

> Quand une requête rend zéro ligne alors que tu es sûr qu'il y a des données, soupçonne un `NULL` avant de soupçonner tes données.

## Trier et limiter

`ORDER BY colonne` trie, `ASC` croissant par défaut, `DESC` décroissant. On peut trier sur plusieurs colonnes : `ORDER BY departement, salaire DESC` trie d'abord par département, puis à l'intérieur de chaque département par salaire décroissant.

`LIMIT n` coupe après n lignes. Un détail qui compte : **`LIMIT` sans `ORDER BY` n'a aucun sens déterministe.** La base est libre de rendre les lignes dans l'ordre qui l'arrange, et cet ordre peut changer d'une exécution à l'autre. « Les 5 premiers » n'existe que si tu as dit selon quel critère.

Et `NULL` se range quelque part : en PostgreSQL, il arrive en dernier en tri croissant et en premier en tri décroissant. `ORDER BY salaire DESC NULLS LAST` si ça te gêne.

## Les agrégats

Un agrégat écrase plusieurs lignes en une seule valeur.

```sql
SELECT
  COUNT(*)     AS nb_lignes,
  COUNT(salaire) AS nb_salaires_connus,
  AVG(salaire) AS moyenne,
  MIN(salaire) AS mini,
  MAX(salaire) AS maxi,
  SUM(salaire) AS masse_salariale
FROM employes;
```

Sur ta table, `COUNT(*)` rend `11`.

La distinction entre les deux `COUNT` est la plus utile de toute la famille :

- `COUNT(*)` compte les **lignes**, quoi qu'elles contiennent.
- `COUNT(colonne)` compte les lignes où cette colonne **n'est pas `NULL`**.
- `COUNT(DISTINCT colonne)` compte les **valeurs différentes**.

Et une règle qui vaut pour tous les autres agrégats : **`AVG`, `SUM`, `MIN` et `MAX` ignorent les `NULL`**. Ce n'est pas un détail cosmétique. Si trois salaires sur onze sont inconnus, `AVG(salaire)` divise par huit, pas par onze. La moyenne retournée est la moyenne des salaires connus — ce qui est souvent ce qu'on veut, mais jamais ce qu'on croit avoir demandé. Vérifie avec `COUNT(salaire)` combien de lignes ont vraiment participé.

## GROUP BY : une ligne par groupe

```sql
SELECT departement,
       COUNT(*)              AS effectif,
       ROUND(AVG(salaire))   AS salaire_moyen,
       MAX(salaire)          AS salaire_max
FROM employes
WHERE actif = true
GROUP BY departement
ORDER BY salaire_moyen DESC;
```

Sur ta base, la ligne `Data` sort avec un effectif de 4, une moyenne de 68750 et un maximum de 95000. La ligne `Engineering` compte 3 actifs et non 4 : Victor est inactif, le `WHERE` l'a écarté avant le regroupement.

Il y a une règle unique à retenir, et elle est stricte : **toute colonne du `SELECT` qui n'est pas dans un agrégat doit figurer dans le `GROUP BY`.**

Écrire `SELECT departement, nom, AVG(salaire) ... GROUP BY departement` provoque une erreur, et c'est une bonne chose. Demande-toi ce que la base devrait répondre : le groupe `Data` contient quatre personnes, donc quatre noms. Il n'y a **qu'une** ligne de résultat pour `Data`. Lequel des quatre noms y mettre ? La question n'a pas de réponse, donc la base refuse plutôt que d'en inventer une.

Si tu veux voir chaque employé **et** la moyenne de son service côte à côte, `GROUP BY` est le mauvais outil — c'est une fonction de fenêtrage qu'il te faut, et tu la verras au cours suivant.

### WHERE ou HAVING

```sql
SELECT departement, COUNT(*) AS effectif
FROM employes
WHERE actif = true          -- filtre les LIGNES, avant le regroupement
GROUP BY departement
HAVING COUNT(*) > 3;        -- filtre les GROUPES, après le regroupement
```

Les deux filtrent, à deux moments différents.

`WHERE` s'applique **avant** le `GROUP BY`, sur les lignes individuelles. Il peut parler de `actif`, de `age`, de `nom` — mais pas de `COUNT(*)`, qui n'existe pas encore.

`HAVING` s'applique **après**, sur les groupes déjà formés. C'est le seul endroit où l'on peut filtrer sur un agrégat.

Le test pour choisir tient en une phrase : si la condition porte sur une seule ligne, c'est un `WHERE` ; si elle porte sur le groupe entier, c'est un `HAVING`. Mettre un filtre de ligne dans le `HAVING` donne parfois le bon résultat, mais fait travailler la base sur des données qu'elle aurait pu jeter plus tôt. Mettre un filtre de groupe dans le `WHERE` est une erreur franche.

## Écrire dans la base

```sql
-- Insérer : les tuples sont séparés par des VIRGULES
INSERT INTO employes (nom, age, departement, salaire, actif) VALUES
('Emile',  30, 'ML',   72000, true),
('Sarah',  28, 'Data', 68000, true);

-- Modifier
UPDATE employes SET salaire = 75000 WHERE id = 42;

-- Supprimer
DELETE FROM employes WHERE actif = false;
```

Remarque qu'on ne donne pas `id` dans l'`INSERT` : la colonne est `SERIAL`, la base l'attribue elle-même. Lui forcer une valeur à la main désynchronise son compteur, et la prochaine insertion automatique échoue sur un doublon.

### La règle qui évite la catastrophe

`UPDATE` et `DELETE` sans `WHERE` s'appliquent à **toute la table**. Pas de confirmation, pas de corbeille.

Prends donc ce réflexe, sans exception : **écris d'abord la requête en `SELECT`, avec exactement le même `WHERE`.** Regarde les lignes qui sortent. Ce sont précisément celles que tu vas modifier ou détruire. Si le compte te surprend, tu viens d'éviter un accident.

```sql
SELECT * FROM employes WHERE actif = false;   -- 1. je regarde
DELETE  FROM employes WHERE actif = false;    -- 2. j'agis
```

Et quand l'opération est sérieuse, enveloppe-la :

```sql
BEGIN;
UPDATE employes SET salaire = salaire * 1.05 WHERE departement = 'Data';
SELECT nom, salaire FROM employes WHERE departement = 'Data';
-- si c'est bon :  COMMIT;
-- si c'est faux : ROLLBACK;
```

Entre le `BEGIN` et le `COMMIT`, rien n'est définitif. C'est le filet de sécurité le moins cher de toute l'informatique, et presque personne ne l'utilise en apprenant.

## Les types, juste ce qu'il faut

`INT` pour les entiers, `TEXT` pour les chaînes, `BOOLEAN` pour vrai/faux, `DATE` et `TIMESTAMP` pour le temps.

Pour les montants, une seule chose à retenir et elle est non négociable : **jamais de `FLOAT`.** Un flottant est une approximation binaire ; `0.1 + 0.2` n'y vaut pas exactement `0.3`, et sur des milliers d'opérations les centimes dérivent. Utilise `NUMERIC(10,2)`, qui est un décimal exact — c'est le type de la colonne `montant` de ta table `commandes` —, ou stocke des centimes entiers. Les deux sont corrects, le flottant ne l'est pas.

`VARCHAR(n)` existe, mais en PostgreSQL il n'apporte aucun gain de performance par rapport à `TEXT`. Ne l'utilise que si la limite de longueur est une vraie règle métier.

## Au clavier, dans coursesql

Quatre pièges que tu as déjà rencontrés, à relire avant de taper :

- **`psql -d coursesql -U emilelinux` est une commande *shell*.** Si ton invite affiche déjà `coursesql=#`, tu es à l'intérieur de `psql` : n'y tape que du SQL. `\q` pour en sortir.
- **Une requête SQL se termine par `;`.** Sans lui, `psql` affiche `coursesql-#` et attend la suite. Ce n'est pas un blocage : tape le `;`, valide.
- **Les tuples d'un `INSERT` sont séparés par des virgules**, et le point-virgule ne vient qu'à la toute fin.
- **Dans SQLTools, « Run on active connection » exécute tout le fichier.** Sélectionne la requête avant de lancer, ou garde un fichier par étape.

Les commandes `psql` les plus utiles, celles qui commencent par un antislash et ne prennent pas de point-virgule :

```
\dt           la liste des tables
\d employes   la structure d'une table : colonnes, types, contraintes
\l            la liste des bases
\q            quitter
```

`\d employes` est celle à réflexe : avant d'écrire une requête sur une table que tu ne connais pas par cœur, regarde ses colonnes. Deviner le nom d'une colonne coûte plus cher que le vérifier.
