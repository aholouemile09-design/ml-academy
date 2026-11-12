JavaScript n'a qu'un seul fil d'exécution. Tout ce qui est asynchrone — une requête, un minuteur, un clic — repose donc sur un mécanisme unique, la boucle d'événements. Cette leçon explique ce mécanisme, puis les trois choses que `fetch` ne fait pas et qu'il faut écrire soi-même : le délai d'attente, l'annulation et la reprise après échec.

```javascript
const reponse = await fetch("/api/modules");
if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
const donnees = await reponse.json();
```

## La boucle d'événements

Un seul fil veut dire : **une seule chose à la fois**. Quand tu cliques pendant qu'une boucle tourne, le clic attend — il n'est pas perdu, il est mis en file, et traité quand la pile d'appels se vide. C'est pour ça qu'un calcul long fige la page entière : pas de rendu, pas de clic, pas de défilement.

Le moteur enchaîne indéfiniment trois étapes :

1. Dépiler et exécuter le code synchrone en cours, jusqu'au bout.
2. Vider **entièrement** la file des **microtâches** — les suites de promesses.
3. Prendre **une seule** **macrotâche** — un `setTimeout` échu, un événement, une réponse réseau — et revenir à l'étape 1.

La différence de priorité se voit directement :

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);     // macrotâche
Promise.resolve().then(() => console.log("3"));   // microtâche
console.log("4");

// 1 4 3 2
```

`setTimeout(fn, 0)` ne veut pas dire « tout de suite » mais « dès que la pile est vide, et après toutes les microtâches en attente ». Une chaîne de promesses qui se relance elle-même peut donc affamer les minuteurs et bloquer le rendu, alors qu'elle paraît asynchrone.

Le corollaire pratique : **`async` ne rend rien parallèle.** Une fonction asynchrone qui fait un calcul de trois secondes fige la page exactement comme une fonction normale. L'asynchrone sert à attendre sans bloquer, pas à calculer sans bloquer — pour ça, il faut un *Web Worker*, qui tourne sur un autre fil.

## Ce qu'est une promesse

Une promesse a trois états et n'en change **qu'une fois** : en attente, tenue, rompue. Une fois réglée, elle garde sa valeur pour toujours ; la rappeler avec `.then()` renvoie immédiatement le même résultat.

```javascript
const p = fetch("/api/x");    // la requête est DÉJÀ partie
await p;                      // await ne lance rien, il attend
```

C'est un détail qui change une optimisation : une promesse démarre à sa création, pas à son `await`. Ce qui rend ceci correct et parallèle :

```javascript
const a = fetch("/api/a");    // les deux requêtes partent ensemble
const b = fetch("/api/b");
const [ra, rb] = [await a, await b];   // on attend ensuite
```

Trois règles qui évitent des heures de perplexité :

**Une fonction `async` renvoie toujours une promesse**, même si elle fait `return 42`. Et `await` sur une valeur non promise fonctionne : la valeur est enveloppée, et l'exécution reprend au tour de microtâche suivant.

**Un `try/catch` ne rattrape pas ce qui se passe dans un callback.** Le `catch` ci-dessous ne verra jamais l'erreur, parce que la fonction fléchée s'exécute bien plus tard, dans un autre contexte :

```javascript
try {
  setTimeout(() => { throw new Error("perdue"); }, 100);
} catch (e) { /* jamais atteint */ }
```

**Une promesse rompue et non attendue devient une erreur globale.** Appeler une fonction `async` sans `await` ni `.catch()` — une *promesse flottante* — fait disparaître l'erreur de ton code et apparaître un `UnhandledPromiseRejection` dans la console, souvent sans rapport visible avec la ligne fautive. Si tu ne veux délibérément pas attendre, écris-le : `faireQuelqueChose().catch(console.error)`.

## Les quatre combinateurs

| Combinateur | Se règle quand | Usage |
| --- | --- | --- |
| `Promise.all` | Toutes sont tenues, ou **la première rompue** | Tout est indispensable |
| `Promise.allSettled` | Toutes sont réglées, tenues ou non | Un affichage partiel vaut mieux que rien |
| `Promise.race` | La **première réglée**, tenue ou rompue | Imposer un délai maximal |
| `Promise.any` | La première **tenue** ; ne rompt que si toutes rompent | Plusieurs sources équivalentes, on prend la plus rapide qui marche |

`race` est la façon historique de poser un délai d'attente :

```javascript
const delai = (ms) => new Promise((_, rejeter) =>
  setTimeout(() => rejeter(new Error("Délai dépassé")), ms));

const donnees = await Promise.race([fetch(url), delai(5000)]);
```

Elle a un défaut : la requête perdante **continue** en arrière-plan, consommant une connexion. La vraie annulation est ci-dessous.

## `fetch` n'a aucun délai d'attente

C'est le manque le plus coûteux de l'interface. Une requête vers un serveur qui ne répond pas — pas qui refuse, qui ne répond pas — reste en attente indéfiniment. L'indicateur de chargement tourne pour toujours, et l'utilisateur recharge la page.

```javascript
const reponse = await fetch(url, { signal: AbortSignal.timeout(8000) });
```

`AbortSignal.timeout()` annule réellement la requête, connexion comprise. L'erreur levée est une `TimeoutError`, distinguable des autres :

```javascript
try {
  const reponse = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
  return await reponse.json();
} catch (e) {
  if (e.name === "TimeoutError") throw new Error("Le serveur met trop de temps.");
  if (e.name === "AbortError")   return;                 // annulation volontaire
  if (e instanceof TypeError)    throw new Error("Pas de connexion réseau.");
  throw e;
}
```

Pour une annulation déclenchée par toi — l'utilisateur ferme le panneau, change de page, retape sa recherche — c'est `AbortController` :

```javascript
const controleur = new AbortController();
fetch(url, { signal: controleur.signal });
controleur.abort();        // la requête est coupée, le catch reçoit une AbortError
```

Et `AbortSignal.any([a, b])` combine les deux : annulable à la main **et** avec un délai maximal.

## La condition de concurrence de la recherche instantanée

Voici le bug le plus retors de cette leçon, et il arrive à tout le monde une fois.

Un champ de recherche lance une requête à chaque frappe. L'utilisateur tape « mach », puis « machine ». Deux requêtes partent. Celle de « mach » renvoie 400 résultats et met 900 ms ; celle de « machine » en renvoie 12 et met 200 ms. La seconde arrive **en premier**, s'affiche, puis la première arrive et **écrase** l'affichage avec les résultats de l'ancienne recherche.

Le réseau ne garantit aucun ordre d'arrivée. L'anti-rebond réduit la fréquence du problème sans l'éliminer.

Deux correctifs, et le second est meilleur :

```javascript
// Solution 1 : on ignore toute réponse qui n'est pas la plus récente
let dernierId = 0;

async function chercher(texte) {
  const monId = ++dernierId;
  const resultats = await fetch(`/api/q?t=${encodeURIComponent(texte)}`).then((r) => r.json());
  if (monId !== dernierId) return;       // une recherche plus récente est partie
  afficher(resultats);
}
```

```javascript
// Solution 2 : on ANNULE la requête précédente — elle ne consomme plus rien
let controleur;

async function chercher(texte) {
  controleur?.abort();                   // coupe la recherche en cours
  controleur = new AbortController();
  try {
    const r = await fetch(`/api/q?t=${encodeURIComponent(texte)}`,
                          { signal: controleur.signal });
    afficher(await r.json());
  } catch (e) {
    if (e.name !== "AbortError") afficherErreur(e);   // une annulation n'est pas une erreur
  }
}
```

La seconde libère la connexion et soulage le serveur. Le `if (e.name !== "AbortError")` est indispensable : sans lui, chaque frappe affiche un message d'erreur.

Et `encodeURIComponent` sur la saisie n'est pas décoratif : un `&` ou un `#` tapé par l'utilisateur casserait l'URL.

## Réessayer, et quand ne pas le faire

Un échec réseau sur trois est passager. Réessayer trois fois avec une attente croissante résout la plupart des cas :

```javascript
async function avecReprise(fn, essais = 3) {
  for (let i = 0; i < essais; i++) {
    try {
      return await fn();
    } catch (e) {
      const dernier = i === essais - 1;
      if (dernier || !estTemporaire(e)) throw e;
      const attente = 2 ** i * 300 + Math.random() * 200;   // 300, 600, 1200 ms + bruit
      await new Promise((r) => setTimeout(r, attente));
    }
  }
}

const estTemporaire = (e) =>
  e instanceof TypeError || e.name === "TimeoutError" ||
  [429, 502, 503, 504].includes(e.statut);
```

Trois choses à retenir de ces lignes.

**Le délai double à chaque essai** : c'est le retrait exponentiel. Réessayer immédiatement trois fois ne fait qu'aggraver la charge d'un serveur déjà en difficulté.

**Le bruit aléatoire ajouté** évite que mille clients repartent tous à la même milliseconde après une panne. Sans lui, la reprise provoque un second effondrement.

**On ne réessaie que ce qui est sûr à répéter.** Un `GET` est sans effet de bord, donc rejouable. Un `POST` qui crée une commande ne l'est pas : si la première requête a abouti mais que la réponse s'est perdue, le second essai crée une deuxième commande. Et il est inutile de réessayer un 400 ou un 404 — la requête est invalide, elle le restera.

## Les détails de `fetch` qui piègent

**Le corps d'une réponse ne se lit qu'une fois.** C'est un flux : après `await r.json()`, un second `r.json()` lève « body stream already read ». Pour lire deux fois — par exemple consigner la réponse brute avant de l'analyser — il faut `r.clone()` avant la première lecture.

**`JSON.parse` échoue sur un corps vide.** Une réponse `204 No Content` ou une erreur renvoyée en texte brut font planter `r.json()` avec un message trompeur, du genre « Unexpected end of JSON input ». Vérifie avant :

```javascript
const type = reponse.headers.get("content-type") ?? "";
const corps = type.includes("application/json") ? await reponse.json() : await reponse.text();
```

**N'écris pas `Content-Type` toi-même pour un `FormData`.** Le navigateur doit composer un en-tête contenant une frontière aléatoire ; le forcer à `multipart/form-data` sans elle rend la requête illisible côté serveur.

```javascript
await fetch("/api/upload", { method: "POST", body: formData });   // sans headers
await fetch("/api/x", {
  method: "POST",
  headers: { "Content-Type": "application/json" },                 // là, oui
  body: JSON.stringify(donnees),
});
```

**Les cookies ne partent pas automatiquement vers une autre origine.** `credentials` vaut `same-origin` par défaut ; pour une API sur un autre domaine, il faut `credentials: "include"` — et le serveur doit l'autoriser explicitement.

## CORS : l'erreur qu'on ne peut pas corriger côté client

Le message est familier : *« blocked by CORS policy »*. Trois faits le démystifient.

**C'est le navigateur qui bloque, pas le serveur.** La requête est partie, le serveur a répondu — c'est le navigateur qui refuse de livrer la réponse à ton JavaScript, parce que l'en-tête `Access-Control-Allow-Origin` manquait. D'où le fait que la même requête fonctionne parfaitement en `curl` ou depuis Postman : ils n'appliquent pas cette règle, qui protège l'utilisateur et non le serveur.

**Aucune option de `fetch` ne contourne CORS.** `mode: "no-cors"` n'est pas une solution : il laisse partir la requête mais rend la réponse illisible, « opaque ». La correction est côté serveur, toujours. Si le serveur ne t'appartient pas, il faut passer par ton propre backend, qui relaie la requête.

**Certaines requêtes déclenchent un pré-vol.** Si la méthode n'est pas `GET`, `HEAD` ou `POST`, ou si tu ajoutes un en-tête personnalisé comme `Authorization`, le navigateur envoie d'abord un `OPTIONS` pour demander la permission. Deux allers-retours au lieu d'un, et un échec possible sur la route `OPTIONS` que le serveur a oublié d'implémenter — ce qui explique les erreurs CORS qui ne touchent que les requêtes authentifiées.

## Les trois états, en pratique

Tout appel réseau a trois issues visibles. Le motif tient en un objet, et il se transpose tel quel en React :

```javascript
const etat = { statut: "inactif", donnees: null, erreur: null };

async function charger() {
  etat.statut = "chargement";  rendre();
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw Object.assign(new Error(`HTTP ${r.status}`), { statut: r.status });
    etat.donnees = await r.json();
    etat.statut = "succes";
  } catch (e) {
    etat.erreur = messageLisible(e);
    etat.statut = "erreur";
  } finally {
    rendre();
  }
}
```

Le `statut` est une **énumération**, pas deux booléens `chargement` et `erreur` : avec deux booléens, l'état « en chargement et en erreur » est représentable alors qu'il n'a aucun sens, et c'est exactement celui qui finit par arriver. Une seule variable rend l'état incohérent inexprimable — tu retrouveras ce raisonnement en TypeScript, avec les unions discriminées.

Et un quatrième état mérite d'exister : **succès mais vide**. Une liste vide n'est pas une erreur, et un écran blanc n'est pas une réponse. « Aucun résultat pour cette recherche » avec une action proposée, c'est trente secondes de travail et la différence entre une page finie et une page en chantier.

## Au clavier

1. Colle le bloc `console.log("1") / setTimeout / Promise.then / console.log("4")` dans la console et explique l'ordre obtenu avant de l'exécuter.
2. Lance un `fetch` vers `https://httpstat.us/200?sleep=30000` sans délai d'attente, puis avec `AbortSignal.timeout(3000)`. Compare.
3. Reproduis la condition de concurrence : fais deux appels à une API lente avec des temps de réponse différents, affiche le dernier arrivé, et constate l'inversion. Corrige avec l'annulation.
4. Appelle `r.json()` deux fois sur la même réponse et lis le message d'erreur.
5. Depuis une page locale, appelle une API publique qui n'autorise pas ton origine. Lis l'erreur dans la console, puis refais la même requête en ligne de commande avec `curl` et constate qu'elle passe.

**Ressources** : `fetch` sur MDN — https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch · la boucle d'événements expliquée — https://javascript.info/event-loop · CORS — https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
