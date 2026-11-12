Un ORM comme Prisma écrit le SQL à ta place, il ne t'en dispense pas. Les trois choses qui décident de la tenue d'une application en production — le schéma, les contraintes et les index — sont des décisions de base de données, et aucun ORM ne les prend pour toi.

```prisma
model Lecon {
  id       String   @id @default(cuid())
  titre    String
  moduleId String
  module   Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  @@index([moduleId])
}
```

## Modéliser : les trois cardinalités

| Relation | Où va la clé étrangère |
| --- | --- |
| Un à un | Dans l'une des deux tables, avec une contrainte `UNIQUE` dessus |
| Un à plusieurs | Toujours du côté « plusieurs ». Une leçon porte son `moduleId` |
| Plusieurs à plusieurs | Dans une **table de liaison** qui porte les deux clés |

La table de liaison est celle qu'on bâcle. Dès qu'une relation plusieurs-à-plusieurs porte une information propre — une date, un rôle, un statut — elle n'est plus une simple jonction : c'est une entité à part entière.

```prisma
model LeconTerminee {
  userId    String
  leconId   String
  termineeLe DateTime @default(now())

  user  User  @relation(fields: [userId],  references: [id], onDelete: Cascade)
  lecon Lecon @relation(fields: [leconId], references: [id], onDelete: Cascade)

  @@unique([userId, leconId])
  @@index([userId])
}
```

Modéliser avec parcimonie vaut mieux que normaliser à outrance : une table par concept métier, pas une table par champ. La dénormalisation se décide **après** avoir mesuré, jamais par anticipation.

## Les types de colonne qui comptent

| Besoin | À prendre | À éviter, et pourquoi |
| --- | --- | --- |
| Texte | `text` en PostgreSQL | `varchar(n)` n'est pas plus rapide ; la longueur se vérifie dans le schéma de validation |
| Date et heure | `timestamptz` | `timestamp` sans fuseau : la valeur devient ambiguë dès le premier changement d'heure |
| Argent | Un **entier** en plus petite unité, avec sa devise à côté | `float` : `0.1 + 0.2` ne vaut pas `0.3`, et l'écart s'accumule |
| Décimal exact | `numeric` | `double precision`, même problème |
| Identifiant | `cuid`, `uuid` v7, ou un entier séquentiel | Un `uuid` v4 est aléatoire, donc mauvais pour la localité d'index |

La ligne sur l'argent n'est pas théorique : un centime perdu par transaction sur un million de transactions est une anomalie comptable que personne ne sait expliquer six mois plus tard. **Un montant est un entier de centimes, et la devise est stockée à côté** — sans elle, « 1500 » ne veut rien dire.

Et le choix de l'identifiant a un effet mesurable : un `uuid` v4 étant aléatoire, chaque insertion atterrit à un endroit différent de l'index, ce qui le fragmente. Un `cuid` ou un `uuid` v7 commence par un horodatage, donc les insertions se suivent — comme un entier séquentiel, mais sans révéler le nombre de lignes de ta table dans une URL.

## `NULL` n'est pas une valeur

`NULL` veut dire « inconnu », et la logique devient ternaire : vrai, faux, inconnu.

```sql
SELECT * FROM utilisateur WHERE pays != 'FR';
-- n'inclut PAS les lignes où pays est NULL
```

« Inconnu est différent de FR » n'est pas vrai, c'est inconnu — donc la ligne est exclue. Pour les inclure : `WHERE pays IS DISTINCT FROM 'FR'`.

Le piège le plus coûteux est `NOT IN` avec une sous-requête pouvant contenir un `NULL` : le résultat est **vide**, toujours, sans erreur. `NOT EXISTS` n'a pas ce défaut, et c'est la raison de le préférer systématiquement.

À l'inverse, `UNIQUE` autorise plusieurs `NULL`, puisque deux inconnus ne sont pas réputés égaux. Une colonne « numéro de facture unique mais optionnel » acceptera donc autant de lignes sans numéro qu'on veut, ce qui est généralement le comportement voulu — mais il faut le savoir.

## Les contraintes sont la dernière ligne de défense

Une vérification applicative est correcte tant qu'il n'y a qu'un seul chemin de code et qu'un seul utilisateur à la fois. Les deux hypothèses sont fausses.

```js
const existe = await prisma.leconTerminee.findFirst({ where: { userId, leconId } });
if (!existe) await prisma.leconTerminee.create({ data: { userId, leconId } });
```

Un double-clic envoie deux requêtes. Les deux lisent « rien », les deux insèrent, l'XP est attribuée deux fois. C'est une **condition de concurrence**, et aucune relecture du code ne la fait apparaître.

`@@unique([userId, leconId])` la rend impossible : la seconde insertion échoue au niveau de la base, quel que soit le chemin emprunté. On attrape alors l'erreur, ou on utilise l'opération atomique prévue :

```js
await prisma.leconTerminee.upsert({
  where: { userId_leconId: { userId, leconId } },
  create: { userId, leconId },
  update: {},
});
```

Les quatre contraintes à poser dès la conception : `NOT NULL` sur tout ce qui est obligatoire, `UNIQUE` sur toute unicité métier, `FOREIGN KEY` sur toute référence, et `CHECK` pour les invariants simples — un montant positif, une note entre 0 et 20, une date de fin après la date de début. Une base sans contraintes finit toujours par contenir des lignes impossibles.

## Les index, et ce qu'ils ne font pas

Un index est un arbre trié qui évite de lire toute la table. Il coûte de l'espace, ralentit chaque écriture, et ne sert que s'il correspond à la requête.

**Prisma n'indexe pas les clés étrangères.** Il indexe les clés primaires et les colonnes `@unique`, c'est tout. Tant que la table est petite, rien ne se voit ; à cent mille lignes, chaque jointure devient un balayage complet. C'est la cause de lenteur numéro un sur un projet Prisma.

Trois règles qui expliquent la plupart des index inutiles :

**La règle du préfixe le plus à gauche.** Un index sur `(userId, creeLe)` sert pour un filtre sur `userId` seul, et pour `userId` plus `creeLe`. Il ne sert **pas** pour un filtre sur `creeLe` seul. L'ordre des colonnes n'est donc pas arbitraire : on met d'abord ce sur quoi on filtre par égalité, ensuite ce sur quoi on trie ou on filtre par intervalle.

**Une fonction appliquée à la colonne désactive l'index.** `WHERE lower(email) = 'a@b.fr'` ne peut pas utiliser l'index sur `email`. Il faut soit stocker la valeur normalisée, soit créer un index sur l'expression : `CREATE INDEX ON utilisateur (lower(email))`.

**Un index partiel coûte moins cher** quand la requête porte toujours sur un sous-ensemble : `CREATE INDEX ON commande (creeLe) WHERE statut = 'en_attente'`.

Et la règle de discipline : **chaque index doit être justifié par une requête réelle de ton application.** Un index ajouté « au cas où » ralentit toutes les écritures pour rien.

## Lire un plan d'exécution

```sql
EXPLAIN ANALYZE SELECT * FROM lecon WHERE "moduleId" = 'ml' ORDER BY ordre;
```

Trois choses à regarder, et elles suffisent.

**Le type de parcours.** `Seq Scan` lit toute la table : acceptable sur mille lignes, catastrophique sur un million. `Index Scan` ou `Bitmap Index Scan` indiquent que l'index sert.

**L'écart entre estimé et réel.** La sortie affiche `rows=100` attendu contre `actual rows=85000`. Un écart d'un facteur dix signifie que les statistiques sont périmées — `ANALYZE` les recalcule — et que le planificateur a choisi une mauvaise stratégie sur de mauvaises informations.

**Le nœud le plus coûteux**, pas le total. Un plan est un arbre ; le problème est presque toujours dans une seule de ses branches.

Côté Prisma, le journal des requêtes montre ce qui part réellement :

```js
const prisma = new PrismaClient({ log: ["query"] });
```

C'est l'outil à activer avant toute optimisation : **compter les requêtes avant de supposer où est la lenteur.**

## Le N+1, et son coût réel

Le problème est connu ; ce qui l'est moins, c'est que le coût ne vient pas de la base.

```js
// 1 requête pour les leçons, puis 200 requêtes
const lecons = await prisma.lecon.findMany({ take: 200 });
for (const l of lecons) {
  const m = await prisma.module.findUnique({ where: { id: l.moduleId } });
}
```

Chaque requête prend moins d'une milliseconde côté base. Ce qui coûte, ce sont les **200 allers-retours réseau séquentiels** imposés par l'`await` dans la boucle. La correction demande une seule requête :

```js
const lecons = await prisma.lecon.findMany({ take: 200, include: { module: true } });
```

La forme la plus difficile à repérer n'a **aucune boucle visible** : chaque composant d'une liste charge lui-même sa donnée. Pris isolément, chacun est raisonnable. Affichés deux cents fois, ils déclenchent deux cents requêtes HTTP, chacune rouvrant une connexion — pire qu'un N+1 SQL.

Le réflexe : **une requête à l'intérieur d'une boucle, d'un `map`, ou d'un composant rendu en liste est un N+1**, jusqu'à preuve du contraire. Et le garde-fou durable est de journaliser le nombre de requêtes par appel d'API : un seuil dépassé devient visible sans relecture.

## Transactions et concurrence

Une transaction garantit que plusieurs écritures réussissent ou échouent ensemble :

```js
await prisma.$transaction(async (tx) => {
  await tx.compte.update({ where: { id: a }, data: { soldeCents: { decrement: 5000 } } });
  await tx.compte.update({ where: { id: b }, data: { soldeCents: { increment: 5000 } } });
});
```

Les opérations `increment` et `decrement` comptent autant que la transaction : elles sont **atomiques côté base**. La forme naïve — lire le solde, calculer, écrire — est une condition de concurrence classique :

```js
const c = await prisma.compte.findUnique({ where: { id } });
await prisma.compte.update({ where: { id }, data: { soldeCents: c.soldeCents - 5000 } });
// Deux requêtes simultanées lisent le même solde : un seul débit est appliqué
```

Lire, modifier, écrire est sûr seulement sous verrou ou dans une transaction au bon niveau d'isolation. Quand l'opération est exprimable en une seule instruction SQL, elle est sûre gratuitement — préfère-la.

## Les connexions, et le piège du serverless

Une base PostgreSQL accepte un nombre limité de connexions simultanées — souvent une centaine. Un serveur classique en ouvre quelques-unes et les réutilise.

En environnement **serverless**, chaque instance de fonction crée son propre client, donc son propre groupe de connexions. Une montée en charge instancie cinquante fonctions, qui ouvrent cinquante groupes, et la base refuse les suivantes avec `too many connections`. Le symptôme : tout fonctionne en développement et casse au premier pic de trafic.

Trois parades, cumulables : limiter le groupe par instance avec `?connection_limit=1` dans l'URL, passer par un **routeur de connexions** comme PgBouncer — c'est ce que propose Supabase sur son port dédié — et réutiliser le client entre les invocations à chaud :

```js
// lib/db.js — un seul client, même en rechargement à chaud
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

Sans cette précaution, le rechargement à chaud de Next crée un nouveau client à chaque modification de fichier, et la base sature en développement avant même la production.

## Les migrations

| Commande | Usage |
| --- | --- |
| `prisma migrate dev` | En développement : crée le fichier de migration et l'applique |
| `prisma migrate deploy` | En production : applique les migrations existantes, sans en créer |
| `prisma migrate reset` | Détruit et reconstruit. **Jamais en production** |
| `prisma db push` | Pousse le schéma sans fichier de migration. Prototypage uniquement |

Deux règles non négociables.

**Une migration déjà appliquée ne se modifie plus.** Son empreinte est enregistrée ; la changer casse tous les environnements qui l'ont déjà passée. Pour corriger, on écrit une nouvelle migration.

**Une migration destructive se fait en deux temps.** Renommer une colonne, changer son type ou la supprimer casse le code en production pendant le déploiement, parce que l'ancienne et la nouvelle version tournent un moment en parallèle. La méthode sûre est d'étendre puis de réduire : ajouter la nouvelle colonne, déployer le code qui écrit dans les deux, copier les données, déployer le code qui ne lit que la nouvelle, et seulement ensuite supprimer l'ancienne.

Et un script de peuplement reproductible fait partie du schéma : `migrate reset` suivi du *seed* doit reconstruire une base utilisable en une commande, sur n'importe quelle machine.

## Autoriser la ressource, pas seulement l'utilisateur

C'est la faille la plus répandue des API, et aucun scanner ne la voit.

```js
// Vulnérable : l'utilisateur est authentifié, mais rien ne vérifie que la
// commande lui appartient. Changer l'id dans l'URL lit celle du voisin.
const commande = await prisma.commande.findUnique({ where: { id } });
```

```js
// Correct : la propriété fait partie de la requête, pas d'un test après coup
const commande = await prisma.commande.findFirst({
  where: { id, utilisateurId: session.utilisateurId },
});
if (!commande) return reponse404();
```

Deux points dans ces quatre lignes. **La condition de propriété est dans le `where`**, pas dans un `if` qui suit — un test après coup finit toujours par être oublié dans une route. Et la réponse est **404, pas 403** : un 403 confirme que la ressource existe, ce qui permet d'énumérer les identifiants des autres.

PostgreSQL sait aussi appliquer cette règle au niveau de la base, avec la sécurité au niveau des lignes. C'est le mécanisme sur lequel repose Supabase, et il a l'avantage de s'appliquer même quand une route oublie son filtre.

## Au clavier

1. Active `log: ["query"]` sur ton client Prisma et compte les requêtes émises par une page de liste. Corrige un N+1 et recompte.
2. Insère deux fois la même paire utilisateur/leçon sans contrainte `@@unique`, puis ajoute la contrainte et réessaie.
3. Lance `EXPLAIN ANALYZE` sur une requête filtrée sur une clé étrangère non indexée, ajoute l'index, et compare `Seq Scan` et `Index Scan`.
4. Écris `WHERE pays != 'FR'` sur une table contenant des `NULL` et compte les lignes manquantes.
5. Écris un débit en lisant puis écrivant, lance deux appels simultanés, et vérifie le solde. Recommence avec `decrement`.

**Ressources** : la documentation Prisma — https://www.prisma.io/docs · « Use the Index, Luke », le meilleur texte sur les index — https://use-the-index-luke.com
