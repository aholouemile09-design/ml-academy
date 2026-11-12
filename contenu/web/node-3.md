Deux questions distinctes se cachent derrière le mot « sécurité » d'une API. **L'authentification** répond à « qui es-tu ? ». **L'autorisation** répond à « as-tu le droit d'agir sur *cette* ressource ? ». La première se règle une fois, au niveau d'un middleware. La seconde se rejoue à **chaque** accès, et c'est celle qu'on rate.

```javascript
app.get("/api/projets/:id", requireAuth, async (req, res) => {
  const projet = await prisma.projet.findFirst({
    where: { id: req.params.id, proprietaireId: req.utilisateur.id },
  });
  if (!projet) return res.status(404).json({ erreur: "Introuvable" });
  res.json(projet);
});
```

## Stocker un mot de passe

Un mot de passe ne se chiffre pas : il se **hache**, avec une fonction lente et salée, conçue pour résister au craquage par force brute.

| Fonction | Verdict |
| --- | --- |
| `argon2id` | La recommandation actuelle. Coûteuse en mémoire, donc résistante aux cartes graphiques |
| `bcrypt` | Solide, très répandu, parfaitement acceptable |
| `scrypt` | Correct, disponible dans le module `crypto` de Node |
| SHA-256, MD5, même avec sel | **Non.** Ces fonctions sont rapides, c'est exactement le défaut recherché |

La lenteur est la fonctionnalité. Un SHA-256 permet d'essayer des milliards de combinaisons par seconde sur du matériel courant ; un bcrypt à coût 12 en permet quelques dizaines. Le **facteur de travail** se choisit pour que le hachage prenne environ 250 ms sur ton serveur, et il s'augmente au fil des années à mesure que le matériel progresse.

Deux pièges concrets :

**bcrypt tronque silencieusement au-delà de 72 octets.** Un mot de passe de 80 caractères et le même amputé à 72 donnent le même résultat. Avec des caractères accentués ou des émojis, qui comptent plusieurs octets, la limite arrive plus tôt qu'on ne croit. `argon2` n'a pas cette limite.

**N'impose jamais de longueur maximale basse, et n'interdis aucun caractère.** Une limite à 16 caractères ou le refus des espaces sont des signaux qu'on reconnaît : ils indiquent souvent un mot de passe stocké en clair ou tronqué. Un minimum de 12 caractères sans autre règle vaut mieux qu'une exigence de majuscule et de chiffre, qui produit surtout des variantes prévisibles.

Et le hachage est coûteux par construction : il occupe un fil du groupe libuv. Une page de connexion sans limitation de débit tombe sous quelques dizaines de requêtes par seconde — la protection est donc aussi une question de disponibilité.

## Session ou jeton

Le choix est présenté comme technique ; il est surtout une question de révocation.

| | Session côté serveur | JWT |
| --- | --- | --- |
| État | Stocké côté serveur, l'identifiant est opaque | Tout est dans le jeton |
| Révocation | Immédiate : on supprime la session | **Impossible** avant l'expiration, sauf liste de blocage |
| Passage à l'échelle | Exige un stockage partagé | Aucun état à partager |
| Taille | Quelques octets dans un cookie | Plusieurs centaines d'octets à chaque requête |
| Déconnexion | Réelle | Symbolique : on oublie le jeton côté client |

**Pour une application web classique avec ses propres utilisateurs, la session côté serveur est généralement le bon choix** — plus simple, révocable, et le stockage partagé est de toute façon déjà là. Le JWT prend l'avantage pour l'authentification entre services, pour une API consommée par des clients tiers, ou quand plusieurs domaines doivent reconnaître la même identité.

Le réflexe inverse — JWT par défaut parce que c'est moderne — produit des applications où l'on ne peut pas déconnecter un compte compromis.

Si c'est un JWT, trois règles : une **durée de vie courte** pour le jeton d'accès, quinze minutes par exemple ; un **jeton de rafraîchissement** à durée longue, stocké côté serveur et **remplacé à chaque usage**, de sorte qu'un jeton rejoué révèle le vol ; et le rappel qu'**un JWT n'est pas chiffré** — sa charge utile est simplement encodée en base64, lisible par quiconque. On n'y met jamais de donnée sensible.

## Où ranger le jeton

C'est la décision la plus souvent mal prise, parce que les deux options ont une faiblesse.

| Emplacement | Exposé à | Protection |
| --- | --- | --- |
| `localStorage` | **XSS** : tout script de la page peut le lire et l'exfiltrer | Aucune |
| Cookie `HttpOnly` | **CSRF** : le navigateur l'envoie automatiquement | `SameSite`, jeton anti-CSRF |

La réponse courante est le cookie, parce que le XSS est imparable une fois qu'il est là, tandis que le CSRF se traite par configuration :

```javascript
res.cookie("session", jeton, {
  httpOnly: true,     // invisible pour JavaScript
  secure: true,       // HTTPS uniquement
  sameSite: "lax",    // pas envoyé depuis un autre site, sauf navigation simple
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});
```

`SameSite=Lax` bloque l'envoi du cookie sur les requêtes déclenchées depuis un autre site, ce qui neutralise l'essentiel du CSRF. `Strict` est plus sûr et casse les retours depuis un lien externe — l'utilisateur arrive déconnecté. Pour les cas restants, formulaires inter-sites et anciens navigateurs, un jeton anti-CSRF reste nécessaire.

Et le point qui vaut d'être répété : **mettre un jeton dans `localStorage`, c'est accepter qu'une seule injection de script suffise à voler toutes les sessions.** C'est la raison pour laquelle `innerHTML` et les dépendances non vérifiées sont des sujets de sécurité, pas de style.

## La connexion, ligne par ligne

```javascript
app.post("/api/connexion", limiteurConnexion, async (req, res) => {
  const r = Identifiants.safeParse(req.body);
  if (!r.success) return res.status(400).json({ erreur: "Requête invalide" });

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: r.data.email },
  });

  // Comparaison factice si l'utilisateur n'existe pas : même temps de réponse
  const empreinte = utilisateur?.motDePasseHache ?? EMPREINTE_FACTICE;
  const valide = await bcrypt.compare(r.data.motDePasse, empreinte);

  if (!utilisateur || !valide) {
    return res.status(401).json({ erreur: "Identifiants invalides" });
  }
  // … création de la session
});
```

Trois précautions dans ces lignes, et chacune contre une attaque différente.

**La comparaison factice** égalise le temps de réponse. Sans elle, un email inexistant répond en 2 ms et un email existant en 250 ms : la différence est mesurable à distance, et elle permet d'énumérer les comptes.

**Le message volontairement vague.** « Mot de passe incorrect » confirme que le compte existe. Un seul message pour les deux cas, toujours.

**Et l'énumération doit être traitée sur *tous* les parcours.** L'inscription qui répond « cet email est déjà pris », et la réinitialisation qui répond « compte inconnu », annulent l'effort fait sur la connexion. Pour la réinitialisation, la réponse correcte est invariable : « si un compte existe, un message a été envoyé ».

## Limiter le débit

Sans limite, une attaque par force brute sur la connexion est triviale : quelques milliers d'essais suffisent pour un mot de passe courant.

```javascript
import rateLimit from "express-rate-limit";

const limiteurConnexion = rateLimit({
  windowMs: 60_000,
  limit: 5,
  standardHeaders: true,        // expose RateLimit-* et Retry-After
  message: { erreur: "Trop de tentatives. Réessaie dans une minute." },
});
```

Deux finesses. Les fenêtres fixes ont un effet de bord connu : dix essais passent à cheval sur deux fenêtres consécutives. Une fenêtre glissante ou un seau à jetons lisse ce comportement, et c'est ce que proposent les implémentations sérieuses.

Et **derrière un mandataire, l'adresse IP vue par Express est celle du mandataire**, pas celle du client : tous les utilisateurs partagent alors le même compteur. Il faut `app.set("trust proxy", 1)` pour qu'Express lise `X-Forwarded-For` — avec précaution, car cet en-tête est falsifiable si rien ne garantit qu'un mandataire de confiance l'a réécrit. Sur Vercel, Cloudflare ou un hébergeur similaire, la plateforme s'en charge.

Pour une limite par compte plutôt que par adresse, ajoute un compteur sur l'email et un verrouillage temporaire après N échecs — en informant l'utilisateur, sinon c'est un déni de service contre lui.

## L'autorisation au niveau de l'objet

C'est la faille numéro un du Top 10 OWASP des API, et elle est présente dans la majorité des projets débutants.

```javascript
// Vulnérable : toutes les routes exigent un jeton, et pourtant…
app.get("/api/projets/:id", requireAuth, async (req, res) => {
  const projet = await prisma.projet.findUnique({ where: { id: req.params.id } });
  res.json(projet);     // celui du voisin, si on change l'id dans l'URL
});
```

Le middleware a répondu à « qui es-tu ». Personne n'a répondu à « ce projet est-il à toi ». Un identifiant séquentiel dans l'URL suffit à parcourir la base entière, et un script de dix lignes le fait en une minute.

**La correction est structurelle : la condition de propriété entre dans le `where`.**

```javascript
const projet = await prisma.projet.findFirst({
  where: { id: req.params.id, proprietaireId: req.utilisateur.id },
});
if (!projet) return res.status(404).json({ erreur: "Introuvable" });
```

Pas un `if` après le chargement : un test qui suit la requête finit par être oublié dans une route écrite un vendredi. Dans le `where`, l'isolation fait partie de l'accès lui-même.

Et la réponse est **404, pas 403**, pour ne pas confirmer que la ressource existe.

Le même raisonnement vaut pour les écritures, et pour les relations : créer une tâche dans un projet exige de vérifier que le projet appartient à l'appelant, sinon on écrit chez quelqu'un d'autre.

## L'affectation massive

```javascript
await prisma.tache.update({ where: { id }, data: req.body });
```

Le client envoie ce qu'il veut. Avec `{"titre":"ok","projetId":999,"estAdmin":true,"creeLe":"2020-01-01"}`, il déplace la tâche dans le projet d'un autre, réécrit sa date de création, et modifie des champs qui n'existent nulle part dans l'interface.

La correction est un schéma qui n'autorise **que** les champs modifiables :

```javascript
const MiseAJourTache = z.object({
  titre: z.string().min(1).max(200).optional(),
  faite: z.boolean().optional(),
}).strict();

const r = MiseAJourTache.safeParse(req.body);
if (!r.success) return res.status(400).json({ erreur: "Requête invalide" });

await prisma.tache.update({
  where: { id, projet: { proprietaireId: req.utilisateur.id } },
  data: r.data,
});
```

**Ne passe jamais `req.body` directement à une écriture en base.** C'est la règle, sans exception, et `.strict()` la rend vérifiable : un champ inattendu produit une erreur au lieu d'être ignoré en silence.

## Réinitialiser un mot de passe correctement

Le parcours le plus souvent bâclé, alors qu'il contourne toute l'authentification.

Le jeton est **aléatoire et long** — `crypto.randomBytes(32)` — et il est **haché en base**, exactement comme un mot de passe : une fuite de la table ne doit pas permettre de prendre les comptes. Sa durée de vie est courte, quinze à soixante minutes. Il est **à usage unique** : consommé, il est supprimé.

Et au changement effectif, **toutes les sessions existantes sont invalidées**. C'est le but de l'opération quand le compte a été compromis ; l'oublier laisse l'attaquant connecté.

La comparaison du jeton se fait à temps constant — `crypto.timingSafeEqual` — pour la même raison que la comparaison factice de la connexion.

## Les secrets

```javascript
const { JWT_SECRET } = process.env;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET absent ou trop court : démarrage refusé");
}
```

Échouer au démarrage plutôt qu'à la première requête est une décision délibérée : un secret par défaut en production est une porte ouverte, et il passe inaperçu pendant des mois.

Trois règles complémentaires. Un secret ne se versionne jamais, et un secret qui a été poussé une fois est **brûlé** — l'historique Git le conserve pour toujours, même après suppression : il faut le changer, pas le retirer. Tout ce qui est préfixé `NEXT_PUBLIC_` ou `VITE_` est **public par construction** : ces valeurs sont inscrites dans le bundle envoyé au navigateur. Et une clé se change périodiquement, ce qui suppose que le code sache en accepter deux pendant la transition.

## Une revue rapide, catégorie par catégorie

| Risque OWASP (API) | Le geste minimal |
| --- | --- |
| Autorisation au niveau objet | La propriété dans le `where`, et un test par ressource |
| Authentification défaillante | Hachage lent, limitation de débit, messages uniformes |
| Autorisation au niveau propriété | Schéma `.strict()` en entrée, mappeur explicite en sortie |
| Consommation de ressources | Limites de taille, de pagination, de débit, délais d'attente |
| Autorisation au niveau fonction | Les routes d'administration vérifient le rôle, pas seulement le jeton |
| Mauvaise configuration | `helmet`, CORS explicite, pas de trace d'appel en production |
| Inventaire incomplet | Pas de route de test oubliée, pas d'ancienne version d'API en ligne |

La dernière ligne est celle qu'on néglige : une route de débogage laissée en place, ou une `v1` encore servie après la migration vers la `v2`, sont des vulnérabilités qui n'apparaissent dans aucune revue de code récente.

## Au clavier

1. Hache le même mot de passe avec bcrypt à coût 10, 12 et 14, et mesure. Choisis celui qui tient 250 ms sur ta machine.
2. Hache un mot de passe de 80 caractères, puis le même tronqué à 72, et compare les résultats avec `bcrypt.compare`.
3. Mesure le temps de réponse de ta route de connexion avec un email existant puis inexistant. Ajoute la comparaison factice et remesure.
4. Crée deux comptes, deux ressources, et essaie de lire celle de l'autre avec un jeton valide. Si ça marche, corrige, puis écris le test.
5. Envoie un champ supplémentaire dans un `PATCH` et vérifie en base s'il a été écrit. Ajoute `.strict()`.
6. Supprime `JWT_SECRET` de ton environnement et vérifie que le serveur refuse de démarrer.

**Ressources** : le Top 10 OWASP des API — https://owasp.org/API-Security/editions/2023/fr/0x11-t10 · les aide-mémoire OWASP, notamment stockage de mots de passe et JWT — https://cheatsheetseries.owasp.org
