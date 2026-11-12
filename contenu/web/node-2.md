Express est une fine couche au-dessus du module HTTP de Node : un routeur et une chaîne de fonctions. C'est peu, et c'est voulu — tout le reste, c'est toi qui le décides. Cette leçon porte donc autant sur **HTTP** que sur Express, parce que les décisions qui comptent sont celles du protocole.

```javascript
import express from "express";

const app = express();
app.use(express.json({ limit: "100kb" }));

app.get("/api/taches/:id", async (req, res, next) => {
  try {
    const tache = await trouver(req.params.id, req.utilisateur.id);
    if (!tache) return res.status(404).json({ erreur: "Introuvable" });
    res.json(tache);
  } catch (e) { next(e); }
});
```

## Les propriétés des méthodes HTTP

Deux mots définissent une méthode, et toute l'infrastructure du web en dépend.

**Sûre** : la requête ne modifie rien côté serveur. **Idempotente** : la rejouer N fois a le même effet que l'envoyer une fois.

| Méthode | Sûre | Idempotente | Usage |
| --- | --- | --- | --- |
| `GET` | Oui | Oui | Lire. Jamais d'effet de bord, jamais de corps |
| `HEAD` | Oui | Oui | Les en-têtes seuls |
| `PUT` | Non | **Oui** | Remplacer intégralement une ressource |
| `DELETE` | Non | **Oui** | Supprimer. Supprimer deux fois laisse le même état |
| `POST` | Non | **Non** | Créer, déclencher une action |
| `PATCH` | Non | Non en général | Modifier partiellement |

Ces propriétés ne sont pas de la théorie : **les navigateurs, les mandataires et les bibliothèques clientes rejouent automatiquement les méthodes idempotentes** en cas d'échec réseau. Un `GET` qui supprime quelque chose sera un jour appelé par un préchargeur de lien, et la ressource disparaîtra sans que personne ait cliqué.

L'idempotence du `DELETE` a une conséquence pratique : supprimer une ressource déjà supprimée n'est pas une erreur. Répondre `204` dans les deux cas est défendable ; répondre `404` la seconde fois l'est aussi. Ce qui ne l'est pas, c'est `{ success: true }` sans avoir rien supprimé.

## Les codes de statut

Le statut porte le **résultat**, le corps porte la **donnée**. C'est une interface que toute l'infrastructure comprend déjà.

| Code | Quand |
| --- | --- |
| `200` | Succès avec corps |
| `201` | Créé. Avec un en-tête `Location` vers la nouvelle ressource |
| `202` | Accepté, traitement asynchrone en cours |
| `204` | Succès sans corps. Typique d'un `DELETE` ou d'un `PUT` |
| `304` | Non modifié, en réponse à une requête conditionnelle |
| `400` | Requête malformée : JSON invalide, paramètre absent |
| `401` | Non authentifié. Le client doit s'identifier |
| `403` | Authentifié mais pas autorisé |
| `404` | Introuvable — **ou masquage délibéré** d'une ressource interdite |
| `409` | Conflit : doublon, version concurrente |
| `422` | Syntaxe correcte, contenu sémantiquement invalide |
| `429` | Trop de requêtes. Avec `Retry-After` |
| `500` | Bug côté serveur |
| `503` | Indisponible temporairement. Avec `Retry-After` |

Trois distinctions valent la peine d'être tenues.

**`401` contre `403`** : le premier dit « je ne sais pas qui tu es », le second « je sais, et tu n'as pas le droit ». Renvoyer `401` à un utilisateur connecté le déconnecte dans la plupart des clients.

**`400` contre `422`** : le premier pour ce qui n'est pas analysable, le second pour ce qui est bien formé mais invalide — un âge négatif, une date de fin avant la date de début. La distinction est utile côté client pour savoir s'il faut afficher sous le champ ou en haut du formulaire.

**`404` pour masquer.** Quand une ressource existe mais n'appartient pas à l'appelant, `403` confirme son existence et permet d'énumérer les identifiants des autres. `404` ne dit rien.

## La pagination, et pourquoi `offset` finit par casser

```text
GET /api/taches?page=3&limite=20       pagination par décalage
GET /api/taches?apres=cur_abc&limite=20  pagination par curseur
```

| | Décalage | Curseur |
| --- | --- | --- |
| Aller à la page 7 | Possible | Impossible, on avance de proche en proche |
| Insertion pendant la lecture | **Décale tout** : un élément vu deux fois, un autre jamais | Stable |
| Coût sur une grande table | `OFFSET 100000` fait lire et jeter cent mille lignes | Constant, via un index |

Pour une interface d'administration avec des numéros de page, le décalage convient. Pour un défilement infini, un flux ou un export, le curseur est le seul correct — et c'est ce qu'utilisent toutes les API publiques sérieuses.

Dans les deux cas, **la limite se plafonne côté serveur** :

```javascript
const limite = Math.min(Number(req.query.limite) || 20, 100);
```

Sans ce plafond, `?limite=999999` est un déni de service en une requête, et il ne demande aucune compétence.

## L'idempotence des créations

Un `POST` n'est pas idempotent, et c'est un problème réel : le client envoie une commande, le réseau coupe avant la réponse, il réessaie, et deux commandes sont créées. Ni le client ni le serveur ne peuvent le savoir seuls.

La solution standard est une **clé d'idempotence** fournie par le client :

```javascript
app.post("/api/commandes", async (req, res) => {
  const cle = req.get("Idempotency-Key");
  if (!cle) return res.status(400).json({ erreur: "Idempotency-Key requis" });

  const dejaVue = await trouverParCle(cle);
  if (dejaVue) return res.status(200).json(dejaVue.reponse);   // on rejoue la réponse

  const commande = await creer(req.body);
  await memoriser(cle, commande);
  res.status(201).json(commande);
});
```

C'est le mécanisme qu'imposent les processeurs de paiement, et pour une bonne raison : **tout ce qui touche à l'argent doit être rejouable sans dommage.** La clé est stockée avec la réponse, avec une durée de vie de quelques heures.

## Les middlewares, et l'ordre qui compte

Un middleware est une fonction `(req, res, next)` dans une chaîne. L'ordre de déclaration **est** l'ordre d'exécution, et c'est la cause de la moitié des comportements inexpliqués : un `express.json()` déclaré après les routes signifie que `req.body` vaut `undefined` dans celles-ci.

```javascript
app.use(helmet());                    // en-têtes de sécurité, en premier
app.use(cors({ origin: ORIGINES }));  // avant les routes
app.use(express.json({ limit: "100kb" }));
app.use(idRequete);                   // attribue un identifiant à chaque requête

app.use("/api", routes);

app.use((req, res) => res.status(404).json({ erreur: "Route inconnue" }));
app.use(gestionnaireErreurs);         // TOUJOURS en dernier, et quatre paramètres
```

Le gestionnaire d'erreurs se reconnaît à son **arité** : Express considère comme gestionnaire d'erreur toute fonction à quatre paramètres. En oublier un en fait un middleware ordinaire, qui ne sera jamais appelé pour une erreur.

```javascript
function gestionnaireErreurs(err, req, res, next) {
  const statut = err.statut ?? 500;
  logger.error({ requestId: req.id, err });        // tout le détail, côté serveur

  res.status(statut).json({
    requestId: req.id,
    erreur: statut < 500 ? err.message : "Erreur interne",   // générique au-delà
  });
}
```

**Le `requestId` est ce qui rend un rapport de bug exploitable** : l'utilisateur donne un identifiant, tu retrouves la trace complète. Et le message n'est détaillé que pour les erreurs du client ; au-delà de 500, le client reçoit une phrase générique.

Un piège de version : **en Express 4, une promesse rompue dans un gestionnaire `async` n'est pas attrapée** — l'erreur disparaît et la requête reste en attente jusqu'au délai du client. Il faut un `try/catch` avec `next(e)`, ou une enveloppe :

```javascript
const routeAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get("/api/x", routeAsync(async (req, res) => { /* … */ }));
```

Express 5 gère ce cas nativement. Vérifie la version avant de supposer.

## Les limites et les en-têtes qui protègent

**La taille du corps.** `express.json()` plafonne à 100 ko par défaut — ce qui est déjà une protection. Augmente-la consciemment, et jamais sans limite : un corps de 500 Mo, c'est 500 Mo de mémoire sur ton serveur, envoyés par n'importe qui.

**Les en-têtes de sécurité**, que `helmet` pose d'un coup :

| En-tête | Effet |
| --- | --- |
| `Content-Security-Policy` | Restreint d'où le navigateur peut charger scripts et styles. La meilleure défense contre le XSS |
| `Strict-Transport-Security` | Force HTTPS pour les visites suivantes |
| `X-Content-Type-Options: nosniff` | Empêche le navigateur de deviner un type MIME |
| `Referrer-Policy` | Limite ce qui fuit dans l'en-tête `Referer` |

**CORS, côté serveur cette fois.** C'est ici que se règle l'erreur vue depuis le navigateur :

```javascript
app.use(cors({
  origin: ["https://codegraft.oltavia.ca"],   // jamais "*" avec des identifiants
  credentials: true,
}));
```

`origin: "*"` combiné à `credentials: true` est **refusé par la spécification** : un navigateur n'enverra pas de cookies vers une origine universelle. C'est une protection, pas une limitation à contourner. Et une liste d'origines explicite vaut mieux qu'un reflet automatique de l'en-tête `Origin`, qui revient à tout autoriser.

## Concevoir les routes

Les ressources sont des **noms au pluriel**, les actions sont les méthodes HTTP :

```text
GET    /api/projets
POST   /api/projets
GET    /api/projets/:id
PATCH  /api/projets/:id
DELETE /api/projets/:id
GET    /api/projets/:id/taches
```

Trois conventions qui évitent des discussions sans fin. Pas de verbe dans l'URL — `/api/getProjets` et `/api/projets/42/delete` réinventent ce que la méthode exprime déjà. Pas plus de deux niveaux d'imbrication : au-delà, on expose la ressource à la racine avec un filtre, `GET /api/taches?projetId=42`. Et les filtres, tris et pages passent par la chaîne de requête, pas par le chemin.

Pour les actions qui ne sont pas des opérations CRUD — publier, annuler, relancer — deux écoles coexistent : un sous-chemin verbal assumé, `POST /api/commandes/42/annulation`, ou un `PATCH` sur un champ d'état. La seconde est plus régulière, la première plus lisible dans les journaux.

## Mettre en cache une réponse d'API

```javascript
res.set("Cache-Control", "private, max-age=60");
res.set("ETag", empreinte(donnees));
```

`Cache-Control` dit combien de temps la réponse reste valable, et `private` interdit aux caches partagés de la stocker — essentiel pour tout ce qui dépend de l'utilisateur. L'oubli de `private` sur une réponse personnalisée derrière un CDN sert les données d'un utilisateur à un autre ; c'est rare, c'est grave, et c'est arrivé à de grandes entreprises.

L'`ETag` permet au client de redemander avec `If-None-Match` et de recevoir un `304` sans corps. Sur une liste consultée en boucle, l'économie est importante.

## Tester une API

```javascript
import request from "supertest";

test("refuse un corps invalide", async () => {
  const r = await request(app).post("/api/taches").send({ titre: "" });
  expect(r.status).toBe(400);
});

test("un utilisateur ne voit pas les tâches d'un autre", async () => {
  const r = await request(app)
    .get(`/api/taches/${idDeLautre}`)
    .set("Authorization", `Bearer ${jetonUtilisateurA}`);
  expect(r.status).toBe(404);
});
```

Le second test est le plus important de l'API, et c'est celui qu'on n'écrit jamais. Il doit exister **pour chaque ressource** : c'est le seul moyen de garantir que l'isolation entre utilisateurs n'a pas été cassée par une route ajoutée à la hâte.

Les tests d'intégration sur une API valent mieux que les tests unitaires de chaque fonction : ils vérifient le contrat réel — statut, forme du corps, en-têtes — qui est ce que le client consomme.

## Au clavier

1. Écris un CRUD complet et vérifie chaque code renvoyé avec `curl -i`, y compris le `Location` du `201`.
2. Déclare `express.json()` après tes routes et observe `req.body` valoir `undefined`.
3. Écris un gestionnaire d'erreur à trois paramètres au lieu de quatre, déclenche une erreur, et constate qu'il n'est jamais appelé.
4. Appelle ta route de liste avec `?limite=999999` et mesure le temps de réponse. Ajoute le plafond.
5. Dans un gestionnaire `async` sur Express 4, lève une erreur sans `try/catch` et observe la requête rester en attente.
6. Écris le test d'isolation entre deux utilisateurs pour une de tes ressources.

**Ressources** : la référence des codes de statut — https://developer.mozilla.org/fr/docs/Web/HTTP/Status · le guide des bonnes pratiques Express en production — https://expressjs.com/fr/advanced/best-practice-security.html
