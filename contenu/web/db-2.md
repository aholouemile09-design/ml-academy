MongoDB stocke des **documents** : des objets JSON binaires, regroupés en collections, sans schéma imposé par le serveur. L'absence de schéma est souvent présentée comme la caractéristique principale ; c'est en réalité la conséquence d'un choix plus profond — **les données sont organisées par usage de lecture, pas par entité.**

```javascript
const Prediction = new mongoose.Schema({
  modele: { type: String, required: true, index: true },
  entree: mongoose.Schema.Types.Mixed,     // structure libre selon le modèle
  confiance: { type: Number, min: 0, max: 1 },
}, { timestamps: true });
```

## Imbriquer ou référencer

C'est la seule décision de modélisation vraiment propre à MongoDB, et elle se prend document par document. Trois questions tranchent :

| Question | Si oui |
| --- | --- |
| Les données sont-elles **toujours lues ensemble** ? | Imbriquer |
| La taille est-elle **bornée** et petite ? | Imbriquer |
| Les données sont-elles modifiées ou interrogées **indépendamment** ? | Référencer |

L'adresse d'un utilisateur s'imbrique : on la lit toujours avec lui, elle est petite, elle n'a pas d'existence propre. Les commandes d'un utilisateur se référencent : leur nombre est illimité, on les interroge pour elles-mêmes, et elles vivent leur vie.

L'anti-modèle à connaître est le **tableau non borné** : un document qui accumule des éléments sans limite — les messages d'une conversation, les événements d'un capteur. Deux raisons de ne jamais le faire. Un document MongoDB ne peut pas dépasser **16 Mo**, limite stricte, et l'écriture échoue le jour où elle est franchie. Et bien avant cela, chaque ajout réécrit le document entier et déplace l'index.

Pour ces cas, le document parent référence une collection d'enfants — exactement comme en relationnel.

## « Sans schéma » ne veut pas dire « sans structure »

Le schéma existe toujours : il est simplement dans le code qui lit les documents, au lieu d'être dans la base. La différence est que la base ne peut plus le faire respecter.

C'est une liberté utile pendant un prototype, et une dette quand trois versions du code ont écrit trois formes différentes dans la même collection. La discipline minimale : un schéma applicatif — Mongoose, Zod — et un champ de version dans les documents dès qu'une migration de forme est envisageable.

MongoDB sait aussi valider côté serveur, avec un validateur JSON Schema sur la collection. Peu de projets l'utilisent, et c'est dommage : c'est la seule garantie qui survit à un script écrit à la hâte.

## Les index, et le balayage silencieux

Une requête sans index adaptée fait un **balayage de collection** : tous les documents sont lus. Sur dix mille, personne ne le remarque ; sur dix millions, la base s'effondre.

```javascript
PredictionSchema.index({ modele: 1, createdAt: -1 });
```

La règle du préfixe le plus à gauche s'applique comme en SQL : cet index sert pour un filtre sur `modele`, et pour `modele` plus un tri par date. Il ne sert pas pour un tri par date seule.

Deux index propres au modèle documentaire :

**L'index multiclé**, créé automatiquement sur un champ tableau : il indexe chaque élément. Une recherche par étiquette devient instantanée, au prix d'une entrée d'index par élément.

**L'index TTL**, qui supprime les documents après un délai :

```javascript
PredictionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });
```

Pour des journaux de prédictions, c'est exactement le bon outil : la purge à 90 jours se fait toute seule, sans tâche planifiée à maintenir.

Pour vérifier qu'un index sert réellement :

```javascript
await Prediction.find({ modele: "resnet" }).explain("executionStats");
// stage: "COLLSCAN" → aucun index utilisé
// stage: "IXSCAN"   → index utilisé
// totalDocsExamined très supérieur à nReturned → l'index est mal choisi
```

Le rapport entre documents examinés et documents renvoyés est la mesure utile : proche de 1, l'index est bon ; à 10 000 pour 10 résultats, il ne sert à rien.

## Le pipeline d'agrégation

L'agrégation est une suite d'étapes, chacune transformant le flux de documents.

```javascript
const parModele = await Prediction.aggregate([
  { $match: { createdAt: { $gte: debut } } },      // D'ABORD : réduit le volume
  { $group: { _id: "$modele", moyenne: { $avg: "$confiance" }, n: { $sum: 1 } } },
  { $sort: { moyenne: -1 } },
  { $limit: 10 },
]);
```

**L'ordre des étapes détermine la performance.** Un `$match` placé en tête peut utiliser un index et réduire le volume avant tout le reste ; placé après un `$group`, il s'applique à des données déjà calculées en mémoire, sans index possible. La règle : filtrer le plus tôt possible, projeter ensuite pour ne garder que les champs utiles.

`$lookup` fait une jointure. Elle existe, elle fonctionne, et elle est nettement plus lente que l'équivalent relationnel — le moteur n'est pas conçu pour ça. Un besoin régulier de `$lookup` est le signal que le modèle est relationnel et que la base ne l'est pas.

## La durabilité n'est pas acquise

Une écriture acceptée n'est pas forcément une écriture conservée. Le **souci d'écriture** décide à quel moment le serveur répond :

| Réglage | Signification |
| --- | --- |
| `w: 1` | Le nœud principal a reçu l'écriture. S'il tombe avant réplication, elle est perdue |
| `w: "majority"` | La majorité des nœuds l'a confirmée. C'est le défaut des versions récentes |
| `j: true` | L'écriture est inscrite au journal sur disque |

Pour des journaux applicatifs, `w: 1` est un compromis raisonnable. Pour une donnée métier, non. Vérifie le réglage de ton fournisseur plutôt que de le supposer.

Les **transactions** existent depuis MongoDB 4.0, mais elles exigent un jeu de réplicas et coûtent sensiblement plus cher qu'en PostgreSQL. Elles dépannent ; elles ne sont pas le mode normal d'écriture. Si ton application en a besoin partout, le choix de base est à revoir.

## Mongoose : quatre détails qui coûtent une demi-journée

**`lean()` pour tout ce qui est en lecture seule.** Par défaut, Mongoose enveloppe chaque résultat dans un document complet, avec suivi des modifications, getters et méthodes. Pour un affichage, c'est du travail pur perte :

```javascript
const liste = await Prediction.find(filtre).lean();   // objets JavaScript simples
```

Le gain se mesure en facteur, pas en pourcentage, sur une liste de plusieurs centaines d'éléments.

**`findOneAndUpdate` renvoie l'ancien document** par défaut. Il faut `{ new: true }` pour obtenir le nouveau — et l'oubli produit un affichage qui semble avoir « un cran de retard ».

**La validation ne s'applique pas aux mises à jour.** `required`, `min`, `max` sont vérifiés à la création, pas sur un `updateOne`, sauf avec `{ runValidators: true }`. C'est ainsi que des valeurs impossibles apparaissent dans une collection pourtant « schématisée ».

**Le mode `strict`** supprime silencieusement les champs non déclarés au lieu de les refuser. Même raisonnement que `.strict()` en Zod : ce qui est inattendu mérite une erreur, pas un silence.

## L'injection NoSQL

On croit le problème réservé à SQL. Il ne l'est pas.

```javascript
// Route de connexion naïve
const utilisateur = await User.findOne({
  email: req.body.email,
  motDePasse: req.body.motDePasse,
});
```

Un corps JSON n'est pas obligé de contenir des chaînes. Si un attaquant envoie :

```json
{ "email": "victime@exemple.fr", "motDePasse": { "$ne": null } }
```

la requête devient « mot de passe différent de null », qui est vraie. La connexion réussit sans mot de passe, et il n'y a aucune concaténation de chaîne dans ce code.

Deux protections, et il faut les deux. **Valider le corps par un schéma** qui impose le type : `z.string()` rejette l'objet avant qu'il n'atteigne la base. Et **ne jamais comparer un mot de passe dans la requête** : on récupère l'utilisateur par son email, puis on compare l'empreinte en mémoire avec une fonction de comparaison à temps constant.

La règle générale est la même que partout : **toute donnée qui franchit la frontière du programme est validée à l'exécution**, et son type fait partie de la validation.

## PostgreSQL avec `jsonb` : la voie du milieu

L'opposition SQL contre NoSQL est largement dépassée, parce que PostgreSQL stocke du JSON indexable depuis longtemps.

```sql
CREATE TABLE produit (
  id          uuid PRIMARY KEY,
  prix_cents  integer NOT NULL CHECK (prix_cents >= 0),
  devise      text    NOT NULL,
  stock       integer NOT NULL,
  attributs   jsonb   NOT NULL DEFAULT '{}'
);

CREATE INDEX ON produit USING gin (attributs);

SELECT * FROM produit WHERE attributs @> '{"couleur": "rouge"}';
```

Les champs stables — prix, stock, devise — gardent leurs colonnes typées, leurs contraintes et les transactions. Les attributs variables d'une catégorie à l'autre vivent dans `jsonb`, interrogeable et indexable. L'opérateur `@>` teste l'inclusion, `->` extrait du JSON, `->>` extrait du texte.

C'est pour cette raison que PostgreSQL est redevenu le choix par défaut, même pour des données semi-structurées : on ne renonce ni à l'intégrité, ni à la souplesse, ni à une seule base à administrer.

## Choisir, pour de vrai

| Situation | Choix |
| --- | --- |
| Entités liées, transactions, intégrité — une plateforme, une boutique, une banque | PostgreSQL |
| Documents autonomes, volume élevé, forme variable — journaux, événements, télémétrie | MongoDB |
| Données stables **plus** quelques attributs variables | PostgreSQL avec `jsonb` |
| Prototype jetable dont le schéma change toutes les heures | Ce qui va le plus vite, et qu'on remplacera |

Et la réponse à « MongoDB est plus rapide » : plus rapide **sur quelle opération**. MongoDB l'est sur l'écriture de documents autonomes et la lecture par clé. PostgreSQL l'est sur les jointures et les agrégations complexes. Dans la très grande majorité des cas réels, l'écart mesuré ne vient ni de l'un ni de l'autre : il vient d'un index absent, d'un N+1, ou d'un schéma qui ne correspond pas aux requêtes.

**Le critère de choix est la forme des données et le besoin de transactions, pas la vitesse annoncée.**

## Un mot sur les vecteurs

Le sujet rejoint le parcours ML : stocker des **plongements** — des vecteurs de plusieurs centaines de dimensions — pour faire de la recherche sémantique.

Les deux options sérieuses sont `pgvector`, une extension PostgreSQL qui ajoute un type `vector` et des index de voisinage approché, et la recherche vectorielle de MongoDB Atlas. L'intérêt de `pgvector` est de garder les vecteurs **à côté** des données métier : une seule requête filtre par utilisateur, par date et par similarité, sans synchroniser deux bases. Pour un volume modeste — jusqu'à quelques millions de vecteurs — c'est suffisant, et c'est une base de moins à exploiter.

Les bases vectorielles spécialisées ne se justifient qu'au-delà, ou quand la recherche vectorielle est le produit lui-même.

## Au clavier

1. Insère un document avec un tableau, puis ajoute dix mille éléments dedans en boucle. Mesure la taille du document et le temps d'écriture au fil des ajouts.
2. Lance une recherche sans index avec `.explain("executionStats")`, lis `COLLSCAN` et `totalDocsExamined`. Ajoute l'index et recommence.
3. Écris une agrégation avec `$match` après `$group`, mesure, puis déplace-le en tête et remesure.
4. Compare `find()` et `find().lean()` sur mille documents avec `console.time`.
5. Envoie `{"motDePasse": {"$ne": null}}` à une route de connexion non validée, sur ta propre machine, et constate. Ajoute ensuite un schéma Zod et réessaie.
6. Crée une table PostgreSQL avec une colonne `jsonb`, un index GIN, et interroge-la avec `@>`.

**Ressources** : le manuel MongoDB, chapitre modélisation — https://www.mongodb.com/docs/manual/data-modeling · le type JSON de PostgreSQL — https://www.postgresql.org/docs/current/datatype-json.html
