Node, c'est le moteur JavaScript V8 plus **libuv**, une bibliothèque d'entrées-sorties asynchrones, plus une bibliothèque standard. Cette composition explique à la fois ce que Node fait très bien — servir des milliers de connexions simultanées avec un seul fil — et ce qu'il fait très mal : du calcul.

```javascript
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const fichiers = await readdir("data");
for (const f of fichiers.filter((f) => f.endsWith(".json"))) {
  const brut = await readFile(path.join("data", f), "utf8");
  traiter(JSON.parse(brut));
}
```

Le préfixe `node:` sur les modules intégrés n'est pas décoratif : il garantit que tu charges le module du runtime et non un paquet npm du même nom installé par une dépendance. C'est une protection gratuite contre une famille d'attaques par substitution.

## La boucle d'événements de Node

Elle ressemble à celle du navigateur, avec des phases nommées qu'on rencontre dans les discussions sérieuses :

| Phase | Ce qu'elle traite |
| --- | --- |
| Timers | Les rappels de `setTimeout` et `setInterval` échus |
| Poll | Les entrées-sorties terminées : fichiers, réseau. C'est là que Node passe l'essentiel de son temps |
| Check | Les rappels de `setImmediate` |
| Close | Les événements de fermeture de socket |

Entre chaque phase, Node vide la file des microtâches — les promesses — et, avant elles, celle de `process.nextTick`, qui a la priorité la plus haute. Un `process.nextTick` qui se réappelle lui-même affame donc tout le reste du programme : c'est un outil de bibliothèque, pas de code applicatif.

**`setImmediate` s'exécute après les entrées-sorties en cours, `setTimeout(fn, 0)` au tour suivant.** À l'intérieur d'un rappel d'entrée-sortie, `setImmediate` passe toujours en premier ; au niveau du module, l'ordre des deux n'est pas garanti — un détail qui surprend dans les tests.

## Node est à un fil, sauf là où il ne l'est pas

« Node est monofilaire » est vrai pour **ton** code. Dessous, libuv maintient un groupe de fils — quatre par défaut — qui exécutent en parallèle les opérations que le système ne sait pas rendre asynchrones nativement : l'accès aux fichiers, la résolution DNS, la compression, et une partie de la cryptographie dont **bcrypt**.

C'est pour cette raison qu'une page de connexion s'écroule sous la charge : avec un coût bcrypt élevé, quatre hachages simultanés occupent tout le groupe, et les lectures de fichiers attendent. La variable `UV_THREADPOOL_SIZE` permet d'agrandir le groupe, mais la vraie réponse est de limiter le débit sur les routes coûteuses.

La distinction à retenir est ailleurs :

**Node excelle sur les opérations liées aux entrées-sorties.** Pendant qu'une requête réseau ou une lecture disque est en attente, la boucle est libre et traite d'autres requêtes. C'est tout le modèle.

**Node souffre sur les opérations liées au processeur.** Un `JSON.parse` de 400 Mo, un tri d'un million d'éléments, une boucle de calcul occupent le fil principal sans interruption : pendant ce temps, **aucune** requête n'est traitée, pas même une route de santé qui ne fait rien.

Et envelopper un calcul dans une promesse ne change rien — `async` n'a jamais déplacé de travail ailleurs. Les trois vraies réponses sont un **fil de travail** (`node:worker_threads`), un **traitement en flux** qui rend la main entre les morceaux, ou, le plus souvent le meilleur choix, **précalculer** et servir un petit fichier.

Le signal d'alarme est lexical : **le mot `Sync` dans un nom de fonction est acceptable dans un script en ligne de commande, presque toujours un bug dans un gestionnaire de requête.**

## Les flux, et pourquoi ils existent

Lire un fichier de 2 Go avec `readFile` demande 2 Go de mémoire. Un flux le traite par morceaux, avec une empreinte constante :

```javascript
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

await pipeline(
  createReadStream("gros.json"),
  createGzip(),
  createWriteStream("gros.json.gz"),
);
```

**Utilise `pipeline` plutôt que `.pipe()`.** La méthode `.pipe()` ne propage pas les erreurs et ne détruit pas les flux restants en cas d'échec : une erreur en milieu de chaîne laisse des descripteurs de fichiers ouverts. `pipeline` nettoie tout et, dans sa version promesse, s'attend avec `await`.

Le mécanisme sous-jacent s'appelle la **contre-pression** : quand la destination écrit moins vite que la source ne lit, le flux ralentit la lecture au lieu d'accumuler en mémoire. C'est automatique avec `pipeline`, et c'est précisément ce qu'on casse en gérant les morceaux à la main.

## CommonJS et ESM

Node connaît deux systèmes de modules, et la cohabitation est la source de friction numéro un.

| | CommonJS | ESM |
| --- | --- | --- |
| Import | `require()` | `import` |
| Extension | `.cjs`, ou `.js` par défaut | `.mjs`, ou `.js` si `"type": "module"` |
| Chargement | Synchrone | Asynchrone, statiquement analysable |
| `__dirname` | Disponible | Absent — utiliser `import.meta.dirname` |
| `await` au niveau racine | Non | Oui |

Le `"type": "module"` du `package.json` décide de l'interprétation des `.js`. Les deux extensions explicites permettent de mélanger quand il le faut.

Deux règles pratiques : **ESM pour tout nouveau projet**, parce que c'est le standard du langage et que l'outillage moderne le suppose. Et en ESM, les chemins relatifs demandent leur **extension** : `import { x } from "./outils.js"`, pas `"./outils"`.

## npm : ce qui compte vraiment

**Les plages de versions.** Dans `package.json`, le préfixe décide de ce qui peut changer sans que tu le demandes :

| Écriture | Accepte |
| --- | --- |
| `^1.4.2` | Toute version `1.x.y` ultérieure. Le défaut de `npm install` |
| `~1.4.2` | Les correctifs `1.4.x` seulement |
| `1.4.2` | Exactement cette version |

Le versionnage sémantique est une **promesse**, pas une garantie : une version de correctif casse régulièrement quelque chose, par accident. Épingler exactement — et mettre à jour délibérément, en lisant le journal des modifications — coûte quelques minutes par mois et évite les matinées passées à chercher ce qui a changé pendant la nuit.

**`npm ci` plutôt que `npm install` en intégration continue et en production.** `install` peut modifier le fichier de verrouillage pour satisfaire les plages ; `ci` installe exactement ce que le verrou décrit, échoue si le verrou et le manifeste divergent, et part d'un `node_modules` propre. C'est ce qui rend une construction reproductible.

**Le fichier de verrouillage se versionne**, toujours. Un dépôt sans lui n'installe pas deux fois la même chose.

**Les trois familles de dépendances.** `dependencies` est nécessaire à l'exécution ; `devDependencies` ne sert qu'au développement et n'est pas installé par `npm ci --omit=dev` ; `peerDependencies` déclare ce que l'hôte doit fournir — c'est ce qui évite deux copies de React dans un même arbre.

## Ajouter une dépendance est une décision

Chaque paquet ajoute du code que tu n'as pas écrit, que tu ne liras pas, et qui s'exécutera avec tes droits.

Trois questions avant un `npm install` :

**Quel est son poids réel, dépendances transitives comprises ?** Un paquet de 5 ko qui en tire quarante autres pèse bien plus que son annonce. Les outils d'inspection de taille de paquet donnent la réponse en dix secondes.

**Existe-t-il une solution native en une vingtaine de lignes ?** Le formatage de date, la génération d'identifiants, la copie profonde, l'anti-rebond ont tous une réponse dans la plateforme aujourd'hui. Ajouter une dépendance pour une fonction est le mauvais côté du marché.

**Le paquet est-il maintenu ?** Date du dernier commit, nombre de responsables, issues ouvertes. Un paquet abandonné est une vulnérabilité à retardement — et un paquet populaire mais à mainteneur unique est une cible de choix.

Le dernier point est une menace réelle, pas théorique. Un paquet npm peut exécuter un script `postinstall` à l'installation, avec les droits de l'utilisateur : lire les variables d'environnement, le trousseau, les clés SSH. Les attaques récentes contre la chaîne d'approvisionnement ont toutes emprunté ce chemin, souvent via une faute de frappe dans un nom de paquet. L'option `--ignore-scripts` les désactive, au prix de casser les paquets qui compilent du natif.

`npm audit` signale les vulnérabilités connues. Il produit beaucoup de bruit — des alertes sur des dépendances d'outils de développement qui ne tournent jamais en production — mais une alerte **critique** sur une dépendance d'exécution se traite le jour même.

## Les erreurs, et le droit de planter

```javascript
process.on("unhandledRejection", (raison) => {
  logger.fatal({ raison }, "promesse rompue non traitée");
  process.exit(1);
});
```

Depuis Node 15, une promesse rompue non traitée **arrête le processus**. C'est un bon comportement, et il ne faut pas le neutraliser : un programme dont l'état est inconnu doit s'arrêter, pas continuer à répondre n'importe quoi.

Même raisonnement pour `uncaughtException` : l'intercepter pour journaliser puis sortir est correct ; l'intercepter pour continuer ne l'est pas. Après une exception non attrapée, des verrous peuvent rester pris, des transactions ouvertes, des variables à moitié écrites.

La bonne architecture est donc : **laisser planter, et redémarrer**. Un gestionnaire de processus — le superviseur d'un conteneur, l'orchestrateur, la plateforme d'hébergement — relance en quelques centaines de millisecondes. C'est plus sûr qu'un processus zombie.

Et l'arrêt doit être **propre**, sans quoi les requêtes en cours sont coupées à chaque déploiement :

```javascript
const serveur = app.listen(port);

process.on("SIGTERM", async () => {
  serveur.close(async () => {      // refuse les nouvelles, termine les en cours
    await prisma.$disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();   // filet si ça traîne
});
```

`SIGTERM` est le signal envoyé par tous les orchestrateurs avant un arrêt. Le délai de sécurité évite qu'une connexion bloquée empêche le processus de mourir.

## Configuration et journalisation

Node lit un fichier d'environnement nativement dans ses versions récentes :

```bash
node --env-file=.env serveur.js
```

Les règles sont les mêmes partout : **le `.env` ne se versionne pas**, un `.env.example` versionné documente les clés attendues, et les valeurs sont validées au démarrage — un secret absent doit empêcher le démarrage, pas produire des erreurs 500 pendant une semaine.

Pour les journaux, un principe : **la sortie standard est l'interface**. Le processus écrit sur `stdout`, l'infrastructure collecte. Pas de fichier à faire tourner, pas de chemin à configurer.

Et en production, le format est le **JSON sur une ligne**, pas du texte lisible : c'est ce qui permet de filtrer, d'agréger et d'alerter. `console.log` concatène des chaînes ; une bibliothèque de journalisation structurée produit des objets avec un niveau, un horodatage et un identifiant de requête, et coûte beaucoup moins cher en charge.

Trois choses ne vont **jamais** dans un journal : un mot de passe même erroné, un jeton ou une clé, et une donnée personnelle complète. Les journaux sont copiés, indexés et conservés longtemps, souvent par des tiers.

## Au clavier

1. Écris un script qui lit cent fichiers JSON dont un est corrompu, et qui termine en signalant l'erreur sans s'interrompre.
2. Lance un serveur avec une route `/lent` contenant une boucle de calcul de cinq secondes, et une route `/sante`. Appelle les deux en même temps et mesure.
3. Compare la mémoire utilisée par `readFile` et par `createReadStream` sur un fichier de 500 Mo, avec `process.memoryUsage()`.
4. Supprime le fichier de verrouillage, réinstalle, et compare les versions obtenues avec celles d'avant.
5. Ajoute un gestionnaire `SIGTERM`, lance le serveur, envoie le signal pendant une requête longue, et vérifie qu'elle se termine.

**Ressources** : la documentation Node — https://nodejs.org/docs/latest/api · le guide officiel sur le blocage de la boucle d'événements — https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop
