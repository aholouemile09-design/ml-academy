Une base de données réelle ne range jamais tout dans une seule table. Savoir recoller les morceaux est la compétence SQL qui sépare celui qui sait lire une requête de celui qui sait en écrire une.

## Pourquoi les données sont éparpillées

Regarde la table `commandes` de ta base `coursesql`. Elle a une colonne `client_id` qui contient `1`, `2`, `3`… et rien d'autre. Pas de nom, pas de ville, pas d'adresse e-mail. Juste un nombre.

Ça peut sembler être une information manquante. C'est l'inverse : c'est une information **rangée ailleurs**, exactement une fois. Le nom du client 1 est écrit dans une seule ligne, d'une seule table. S'il déménage, on corrige un endroit et toutes ses commandes sont à jour instantanément. Si son nom était recopié dans chacune de ses quatre commandes, il faudrait corriger quatre lignes — et le jour où on en oublie une, la base se contredit elle-même.

C'est le principe de la **normalisation** : un fait est écrit à un seul endroit. Le prix à payer, c'est qu'il faut aller le chercher. Ce trajet, c'est la jointure.

Une règle découle directement de ça, et elle est absolue : **un identifiant ne se renumérote jamais**. Le `1` dans `commandes.client_id` est une référence vers l'extérieur. Renuméroter les clients pour « faire propre » casse silencieusement toutes les commandes : elles pointeraient vers quelqu'un d'autre. Un id n'est pas un numéro d'ordre, c'est une poignée permanente.

### Ce que ça change pour toi en ML

C'est précisément ta situation quotidienne de futur ingénieur ML. Tes **features** sont dans une table, tes **labels** dans une autre, les métadonnées dans une troisième. Un jeu d'entraînement n'arrive presque jamais sous forme de fichier plat : il est le **résultat d'une jointure** que tu écris toi-même.

Et c'est là que se produisent les pires bugs de ML. Une jointure mal faite ne lève pas d'erreur. Elle te rend un jeu de données avec des lignes dupliquées, ou avec 30 % des exemples disparus en silence, et tu entraînes un modèle dessus sans rien voir. Le modèle apprend, les métriques s'affichent, tout a l'air normal. Le problème est en amont.

## Le modèle mental d'une jointure

Presque tout le monde apprend les jointures comme une liste de recettes à mémoriser. C'est beaucoup plus simple que ça, et il n'y a qu'une seule idée à comprendre.

`FROM a JOIN b ON condition` veut dire : **considère tous les couples possibles** composés d'une ligne de `a` et d'une ligne de `b`, puis **ne garde que les couples pour lesquels la condition est vraie**.

C'est tout. Rien d'autre.

Avec 7 clients et 16 commandes, ça fait 7 × 16 = 112 couples envisagés, dont on ne garde que ceux où `clients.id` et `commandes.client_id` coïncident. Les 16 bons couples survivent, les 96 autres sont écartés.

> Une jointure n'est pas une opération de couture. C'est un produit, puis un filtre.

Tiens ce modèle et tu n'auras plus jamais à deviner ce qu'une jointure retourne : tu le déduiras. En particulier, la question qui compte devient toujours la même — **combien de lignes de droite correspondent à chaque ligne de gauche ?** Si la réponse est « zéro ou une », la jointure conserve le nombre de lignes. Si la réponse est « parfois plusieurs », elle en **multiplie**. Le client 1 a quatre commandes : il apparaîtra sur quatre lignes du résultat. Ce n'est pas un bug, c'est de l'arithmétique.

## INNER JOIN : l'intersection

```sql
SELECT c.nom, o.produit, o.montant
FROM clients c
INNER JOIN commandes o ON o.client_id = c.id
ORDER BY c.nom, o.date_commande;
```

Cette requête rend exactement **16 lignes** sur ta base : une par commande. Chaque commande a un client correspondant, donc aucune n'est perdue.

Deux conventions de lecture à prendre tout de suite. Les **alias** `c` et `o` ne sont pas de la coquetterie : dès qu'on manipule deux tables, préfixer chaque colonne (`c.nom`, `o.montant`) rend la requête relisable dans six mois. Et le mot `INNER` est optionnel — `JOIN` seul veut dire `INNER JOIN`. Écris-le explicitement au début, le temps que le réflexe soit pris.

## LEFT JOIN : garder tout le monde à gauche

```sql
SELECT c.nom, o.produit, o.montant
FROM clients c
LEFT JOIN commandes o ON o.client_id = c.id
ORDER BY c.id;
```

Celle-ci rend **17 lignes**. Une de plus. Pourquoi ?

Parce que tes commandes ne référencent que les clients 1 à 6. Si ta table `clients` en contient 7, le septième n'a aucune commande. L'`INNER JOIN` le faisait disparaître ; le `LEFT JOIN` le garde, et remplit toutes les colonnes de droite avec `NULL` :

```
 nom       | produit | montant
-----------+---------+---------
 ...       | Agenda  |   18.00
 <client 7>|         |
```

C'est là toute la différence entre les deux. `INNER JOIN` répond à « montre-moi les couples qui existent ». `LEFT JOIN` répond à « montre-moi tous les éléments de gauche, et ce qu'on trouve à droite quand il y a quelque chose ».

Pose-toi la question dans ce sens-là avant chaque requête — *qu'est-ce qui doit apparaître même sans correspondance ?* — et le choix de la jointure se fait tout seul.

### Le piège du COUNT

Voici l'erreur la plus fréquente de tout SQL analytique, et elle est silencieuse :

```sql
-- FAUX
SELECT c.nom, COUNT(*) AS nb_commandes
FROM clients c
LEFT JOIN commandes o ON o.client_id = c.id
GROUP BY c.nom;
```

Le client 7 ressort avec `nb_commandes = 1`. Il n'a jamais rien commandé.

La raison est limpide quand on se rappelle le modèle mental : `COUNT(*)` compte des **lignes**, et le client 7 a bien une ligne — une ligne remplie de `NULL`, mais une ligne. La correction tient en trois caractères :

```sql
-- JUSTE
SELECT c.nom, COUNT(o.id) AS nb_commandes
FROM clients c
LEFT JOIN commandes o ON o.client_id = c.id
GROUP BY c.nom;
```

`COUNT(colonne)` ignore les `NULL`. Le client 7 passe à `0`.

Retiens la règle générale : **après un LEFT JOIN, ne compte jamais avec `COUNT(*)`.** Compte une colonne de la table de droite qui ne peut pas être nulle par ailleurs — typiquement sa clé primaire, `o.id`.

Et garde cette question en tête, on y reviendra en exercice : si `COUNT(o.id)` sait repérer que le client 7 n'a rien, comment lister *tous* les clients sans aucune commande ?

### ON ou WHERE : le piège qui annule ta jointure

Celui-ci coûte des heures à tout le monde une fois dans sa vie. Ces deux requêtes se ressemblent et ne donnent pas le même résultat :

```sql
-- A : le filtre est dans le WHERE
SELECT c.nom, o.produit
FROM clients c
LEFT JOIN commandes o ON o.client_id = c.id
WHERE o.statut = 'livree';

-- B : le filtre est dans le ON
SELECT c.nom, o.produit
FROM clients c
LEFT JOIN commandes o ON o.client_id = c.id AND o.statut = 'livree';
```

La requête **A** a perdu le client 7. Sa ligne existait avec `o.statut` à `NULL`, le `WHERE` a testé `NULL = 'livree'`, ce qui n'est pas vrai — donc la ligne est écartée. Le `LEFT JOIN` est redevenu un `INNER JOIN` sans prévenir personne.

La requête **B** garde le client 7, avec `produit` à `NULL`.

L'explication est une question de moment. La condition du `ON` fait partie de la **construction** de la jointure : elle décide quels couples sont appariés, et le `LEFT JOIN` rajoute ensuite une ligne `NULL` pour toute ligne de gauche restée seule. Le `WHERE`, lui, s'applique **après** que la jointure est faite, sur le résultat, et il ne sait plus d'où vient la ligne qu'il jette.

La règle pratique : dans un `LEFT JOIN`, un filtre portant sur la table de **droite** va dans le `ON`. Un filtre sur la table de **gauche** va dans le `WHERE`. Dans un `INNER JOIN` la distinction ne change rien au résultat — raison de plus pour prendre le bon réflexe sur le `LEFT`, où elle change tout.

## Les autres jointures, brièvement

`RIGHT JOIN` est le miroir du `LEFT` : il garde tout de la table de droite. Il existe, et on ne s'en sert presque jamais — inverser l'ordre des deux tables et écrire un `LEFT JOIN` se lit mieux. Choisis un sens et tiens-t'y.

`FULL OUTER JOIN` garde les lignes orphelines des deux côtés. Utile pour **réconcilier** deux sources de données et repérer ce qui manque de part et d'autre.

`CROSS JOIN` ne prend pas de `ON` : il rend tous les couples, les 112 de notre exemple. C'est la jointure du modèle mental, sans le filtre. Rare volontairement, fréquente par accident — une jointure dont on a oublié le `ON` explose en nombre de lignes, et c'est le premier symptôme à reconnaître quand un résultat sort beaucoup trop gros.

La **self-jointure** joint une table avec elle-même, avec deux alias différents. C'est le moyen de comparer des lignes entre elles : trouver les employés qui ont le même salaire, ou chaîner un employé à son manager quand la colonne `manager_id` pointe vers la même table.

## Sous-requêtes et CTE

Une sous-requête est une requête à l'intérieur d'une autre :

```sql
SELECT nom, salaire
FROM employes
WHERE salaire > (SELECT AVG(salaire) FROM employes);
```

Ça fonctionne, et pour un seul niveau c'est parfaitement lisible. Le problème arrive à deux ou trois niveaux : il faut lire **de l'intérieur vers l'extérieur**, en partant du milieu de l'écran. Personne ne lit confortablement comme ça.

La **CTE** — *Common Table Expression*, le `WITH ... AS` — résout exactement ce problème en remettant la lecture dans l'ordre du haut vers le bas :

```sql
WITH par_client AS (
  SELECT client_id,
         SUM(montant) AS total,
         COUNT(*)     AS nb
  FROM commandes
  WHERE statut <> 'annulee'
  GROUP BY client_id
)
SELECT c.nom, p.nb, p.total,
       ROUND(p.total / p.nb, 2) AS panier_moyen
FROM clients c
JOIN par_client p ON p.client_id = c.id
ORDER BY p.total DESC;
```

On calcule d'abord un résultat intermédiaire nommé, puis on s'en sert. Une CTE est un **nom donné à une étape**, et c'est son seul rôle : elle ne crée rien de permanent, ne stocke rien sur le disque, et disparaît à la fin de la requête.

Trois raisons de la préférer systématiquement. Elle se lit dans l'ordre d'exécution. Elle est **réutilisable** : la même CTE peut être citée plusieurs fois dans la requête principale, là où une sous-requête devrait être recopiée. Et elle se **débogue** : tu peux exécuter la CTE seule pour vérifier son contenu avant de brancher la suite — réflexe à prendre pour toute requête qui ne rend pas ce que tu attendais.

Un point de vocabulaire qui revient en entretien : une CTE n'accélère rien par elle-même. Elle rend lisible. La performance, c'est l'affaire des index, pas de la mise en forme.

## Les fonctions de fenêtrage

Il y a une question à laquelle le `GROUP BY` ne sait pas répondre : « affiche-moi chaque employé **avec** le salaire moyen de son département ».

Impossible, parce que `GROUP BY departement` **écrase** les lignes : il te rend une ligne par département, et les employés individuels ont disparu. Tu as la moyenne, tu as perdu les gens.

La fonction de fenêtrage fait exactement l'inverse :

```sql
SELECT
  nom,
  departement,
  salaire,
  ROUND(AVG(salaire) OVER (PARTITION BY departement)) AS moy_dept,
  salaire - ROUND(AVG(salaire) OVER (PARTITION BY departement)) AS ecart
FROM employes
WHERE actif = true
ORDER BY departement, salaire DESC;
```

Tes 11 employés restent 11 lignes. Chacune porte en plus la moyenne de son département et son écart à cette moyenne.

La différence tient en une phrase : **`GROUP BY` réduit le nombre de lignes, `OVER` n'y touche pas.** `OVER (PARTITION BY departement)` dit : « pour cette ligne, calcule la moyenne sur le groupe de lignes qui partagent son département, et colle le résultat à côté ». Le groupe est une **fenêtre** de lecture, pas un regroupement.

C'est l'outil central de l'analytique. Toutes les questions de la forme « cette valeur, comparée à son groupe » en relèvent : l'écart à la moyenne, la part dans un total, le classement interne, l'évolution par rapport à la ligne précédente. À côté des agrégats classiques (`AVG`, `SUM`, `COUNT`) utilisables en `OVER`, il existe des fonctions qui n'existent qu'en fenêtrage : `RANK()` et `DENSE_RANK()` pour classer, `ROW_NUMBER()` pour numéroter, `LAG()` et `LEAD()` pour regarder la ligne d'avant ou d'après. Tu vas en manipuler en exercice.

## L'ordre dans lequel SQL exécute vraiment

Cette section explique d'un coup la moitié des pièges précédents, et elle vaut la peine d'être notée.

Tu **écris** une requête dans l'ordre `SELECT … FROM … WHERE … GROUP BY …`. Le moteur ne l'exécute pas du tout dans cet ordre. Il fait :

1. `FROM` et les `JOIN` — il construit l'ensemble des lignes
2. `WHERE` — il filtre les lignes
3. `GROUP BY` — il regroupe
4. `HAVING` — il filtre les groupes
5. les fonctions de fenêtrage, puis le `SELECT` — il calcule les colonnes de sortie
6. `ORDER BY` — il trie
7. `LIMIT` — il coupe

Trois conséquences qu'on comprend immédiatement à partir de là.

**`WHERE` ne peut pas filtrer un alias du `SELECT`.** `WHERE panier_moyen > 100` échoue : à l'étape 2, la colonne `panier_moyen` n'existe pas encore, elle sera calculée à l'étape 5. Il faut une CTE, ou répéter le calcul.

**`WHERE` et `HAVING` ne sont pas interchangeables.** `WHERE` agit avant le regroupement, sur les lignes ; `HAVING` agit après, sur les groupes. « Les commandes non annulées » est un `WHERE`. « Les clients dont le total dépasse 300 » est un `HAVING`. Mettre le premier dans un `HAVING` est au mieux inefficace, et mettre le second dans un `WHERE` est une erreur.

**`WHERE` ne peut pas filtrer une fonction de fenêtrage.** Même raison, étape 5 contre étape 2. Pour filtrer sur un rang, il faut d'abord le matérialiser dans une CTE, puis filtrer au niveau du dessus.

Ces trois erreurs se ressemblent, et elles ont une cause unique. L'ordre d'exécution n'est pas une anecdote à retenir : c'est le modèle qui rend les messages d'erreur de SQL prévisibles.

## Au clavier, dans coursesql

Pour pratiquer les jointures, il te manque la table de gauche. Crée-la :

```sql
CREATE TABLE clients (
  id               SERIAL PRIMARY KEY,
  nom              TEXT NOT NULL,
  ville            TEXT,
  date_inscription DATE
);
```

Puis insère **7 clients**, avec les identifiants 1 à 7 — pour que les six premiers correspondent aux `client_id` déjà présents dans `commandes`, et que le septième reste sans commande. C'est lui qui te servira à voir, de tes yeux, la différence entre `INNER JOIN` et `LEFT JOIN`.

La forme d'un `INSERT` multi-lignes, à recopier et compléter :

```sql
INSERT INTO clients (nom, ville, date_inscription) VALUES
('Awa Diop',     'Montreal', '2025-03-14'),
('Marc Tremblay', 'Quebec',  '2025-06-02');
```

Quatre points de vigilance avant de taper, tirés de tes erreurs précédentes :

- **Les tuples sont séparés par des virgules, pas par des points-virgules.** Le point-virgule ne va qu'à la toute fin, après le dernier tuple. Un `;` au milieu coupe la commande en deux et provoque une erreur de syntaxe sur la ligne suivante.
- **Une requête SQL se termine par `;`.** Sans lui, `psql` attend la suite et affiche l'invite de continuation `coursesql-#` au lieu de `coursesql=#`. Ce n'est pas un blocage : tape le `;` et valide.
- **`psql -d coursesql -U emilelinux` est une commande *shell*.** Si ton invite est déjà `coursesql=#`, tu es dans `psql` : n'y tape que du SQL. `\q` pour en sortir.
- **Dans SQLTools, « Run on active connection » exécute tout le fichier**, pas la ligne du curseur. Garde un fichier par étape, ou sélectionne la requête avant de l'exécuter.

Une fois la table peuplée, la vérification qui compte tient en deux requêtes. Compte les lignes d'un `INNER JOIN` entre `clients` et `commandes`, puis celles du même `LEFT JOIN`. Tu dois trouver 16 et 17. Si tu trouves autre chose, c'est le résultat qui a raison : relis ta condition `ON`.
