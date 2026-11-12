JavaScript a été conçu en dix jours, en 1995. Il en garde des bizarreries qu'on ne peut pas corriger sans casser le web entier, et qui sont donc là pour toujours. Les connaître n'est pas de la culture générale : c'est ce qui sépare un développeur qui débogue en dix minutes d'un qui y passe l'après-midi.

Cette leçon couvre les mécanismes du langage. Les méthodes de tableaux, tu les pratiqueras dans les exercices — ici on regarde ce qui se passe en dessous.

```javascript
const nom = "Emile";
const { prenom, age = 0 } = utilisateur;   // déstructuration avec valeur par défaut
const [premier, ...reste] = tableau;
const message = `Bonjour ${nom}, ${age} ans`;
```

## `var`, `let`, `const` : trois portées, pas trois synonymes

| Mot-clé | Portée | Remontée | Réaffectation |
| --- | --- | --- | --- |
| `var` | La **fonction** entière, quel que soit le bloc | Remonté et initialisé à `undefined` | Oui |
| `let` | Le **bloc** `{ }` | Remonté mais inaccessible avant sa ligne | Oui |
| `const` | Le **bloc** `{ }` | Idem `let` | Non |

La zone où une variable `let` existe sans être lisible s'appelle la **zone morte temporelle**. Y accéder lève une `ReferenceError`, et c'est une bonne nouvelle : avec `var`, la même erreur donnait silencieusement `undefined`, et le bug apparaissait trois fonctions plus loin.

```javascript
console.log(a);   // undefined   — var est remontée et initialisée
var a = 1;

console.log(b);   // ReferenceError: Cannot access 'b' before initialization
let b = 1;
```

**`const` n'est pas « immuable », c'est « non réaffectable ».** La distinction est quotidienne :

```javascript
const config = { theme: "sombre" };
config.theme = "clair";     // autorisé : on modifie l'objet, pas la liaison
config = {};                // TypeError : on réaffecte la liaison
```

Pour geler réellement : `Object.freeze(config)` — mais il est superficiel, les objets imbriqués restent modifiables.

La règle pratique : **`const` par défaut, `let` quand tu réaffectes, `var` jamais.** Ce n'est pas du purisme ; `const` documente au lecteur que la liaison ne changera pas, et c'est l'information utile dans 90 % des cas.

## Valeur ou référence : la source de bugs numéro un

Les primitives — nombre, chaîne, booléen, `null`, `undefined`, symbole, grand entier — sont copiées **par valeur**. Les objets, les tableaux et les fonctions sont manipulés **par référence**.

```javascript
let a = 1, b = a;  b = 2;
console.log(a);                 // 1  — copie indépendante

const x = { n: 1 };
const y = x;  y.n = 2;
console.log(x.n);               // 2  — même objet, deux noms
```

Ça paraît théorique jusqu'au jour où une fonction « lit » un objet et le modifie en passant :

```javascript
function normaliser(options) {
  options.limite = options.limite ?? 10;   // modifie l'objet de l'APPELANT
  return options;
}
```

L'appelant voit son objet changer sans l'avoir demandé. En React, ce même réflexe empêche le re-rendu, parce que l'objet muté est **identique à lui-même** : la comparaison de référence ne détecte aucun changement.

Trois façons de copier, par profondeur croissante :

```javascript
const copie      = { ...original };             // superficielle : un niveau
const copie2     = Object.assign({}, original); // identique
const profonde   = structuredClone(original);   // récursive, native, sans bibliothèque
```

**La copie par décomposition est superficielle.** `{ ...original }` duplique le premier niveau, mais les objets imbriqués restent partagés : modifier `copie.adresse.ville` modifie aussi `original.adresse.ville`. `structuredClone` est la réponse native depuis 2022 — elle gère les dates, les `Map`, les `Set`, les références circulaires, mais pas les fonctions.

## Les comparaisons, et pourquoi `==` est interdit

JavaScript convertit les types pour comparer. Le résultat tient de la devinette :

```javascript
"5" == 5          // true
0 == ""           // true
0 == "0"          // true
"" == "0"         // false   (la transitivité n'est pas respectée)
null == undefined // true
null == 0         // false   (mais null >= 0 est true)
NaN == NaN        // false
```

**Utilise `===` toujours.** Il compare sans convertir, et toutes les lignes ci-dessus deviennent `false` — ce qui est le comportement attendu. La seule exception tolérée est `x == null`, qui teste `null` **ou** `undefined` en une fois, un raccourci répandu et sans piège.

Deux valeurs méritent leur paragraphe :

**`NaN` n'est égal à rien, pas même à lui-même.** C'est pour ça qu'on le teste avec `Number.isNaN(x)` — et non avec le vieux `isNaN(x)`, qui convertit d'abord et répond `true` pour `isNaN("abc")`.

**`typeof null` vaut `"object"`.** C'est un bug de 1995 que corriger casserait trop de sites. Pour distinguer un vrai objet : `typeof x === "object" && x !== null`.

| Expression | Résultat | Pourquoi |
| --- | --- | --- |
| `typeof []` | `"object"` | Un tableau est un objet. Utiliser `Array.isArray()` |
| `typeof null` | `"object"` | Bug historique |
| `typeof NaN` | `"number"` | `NaN` est un nombre, celui qui n'en est pas un |
| `0.1 + 0.2` | `0.30000000000000004` | Flottants IEEE 754, comme en Python |
| `[10, 9, 1].sort()` | `[1, 10, 9]` | `sort()` compare les **chaînes** par défaut |

Ce dernier point vaut une alerte : `sort()` sans comparateur convertit chaque élément en chaîne, donc `"10" < "9"`. Pour des nombres, il faut toujours `sort((a, b) => a - b)`. Et `sort()` **modifie le tableau d'origine** — depuis 2023, `toSorted()` en renvoie une copie triée.

## Ce qui est faux, et `||` contre `??`

Six valeurs sont fausses dans un test : `false`, `0`, `""`, `null`, `undefined`, `NaN`. Tout le reste est vrai, y compris `[]` et `{}` — un tableau vide est **vrai**, ce qui surprend en venant de Python.

D'où le piège le plus coûteux du langage :

```javascript
const limite = options.limite || 10;   // si limite vaut 0, on obtient 10
const limite = options.limite ?? 10;   // si limite vaut 0, on obtient 0
```

`||` se déclenche sur toute valeur fausse. `??` ne se déclenche que sur `null` et `undefined`. Pour une valeur par défaut, **c'est presque toujours `??` qu'il faut**, parce que `0`, `""` et `false` sont des valeurs légitimes qu'on ne veut pas voir remplacées. Un compteur à zéro affiché « 10 », une case décochée redevenue cochée, un champ vidé qui se remplit tout seul : c'est toujours ce `||`.

Le même raisonnement vaut pour l'affectation : `a ||= b` contre `a ??= b`.

Et l'accès optionnel évite la cascade de vérifications :

```javascript
const ville = user?.adresse?.ville ?? "Inconnue";
const n     = liste?.[0];
callback?.();                     // n'appelle que si callback existe
```

`?.` renvoie `undefined` dès qu'un maillon est `null` ou `undefined`, au lieu de lever `Cannot read properties of undefined`.

## Les fermetures, et le `debounce` que tu vas écrire

Une **fermeture** (*closure*) est une fonction qui garde accès aux variables de l'endroit où elle a été **définie**, même après que cet endroit a fini de s'exécuter. Ce n'est pas une fonctionnalité qu'on active : toute fonction en JavaScript en est une.

```javascript
function compteur() {
  let n = 0;                 // vit normalement le temps de l'appel
  return () => ++n;          // … mais la fonction retournée la garde en vie
}

const suivant = compteur();
suivant();   // 1
suivant();   // 2
```

`n` n'est accessible nulle part ailleurs : c'est un état privé, sans classe ni convention de nommage.

C'est exactement le mécanisme de l'**anti-rebond**, que l'exercice final du module te demande d'écrire à la main :

```javascript
function antiRebond(fn, delai = 300) {
  let minuteur;                                  // conservé entre les appels
  return (...args) => {
    clearTimeout(minuteur);                      // annule le précédent
    minuteur = setTimeout(() => fn(...args), delai);
  };
}

const chercher = antiRebond((texte) => lancerRecherche(texte), 300);
champ.addEventListener("input", (e) => chercher(e.target.value));
```

Trois lignes utiles, et chacune a une raison. `minuteur` est déclaré **dans** `antiRebond` et non dans la fonction retournée, sinon il serait réinitialisé à chaque frappe et n'annulerait jamais rien. `clearTimeout` annule le minuteur en attente : taper dix caractères en moins de 300 ms ne déclenche qu'un appel. Et `(...args)` transmet les arguments d'origine, pour que la fonction enveloppée reste utilisable normalement.

Le cousin, la **limitation de fréquence** (*throttle*), laisse passer un appel toutes les N millisecondes au lieu d'attendre la fin : c'est ce qu'on veut sur un défilement ou un redimensionnement, là où l'anti-rebond convient à une saisie.

Le piège historique des fermetures est lié à `var` :

```javascript
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
// 3 3 3 — une seule variable i, partagée, qui vaut 3 à la fin

for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 0);
// 0 1 2 — let crée une liaison par tour de boucle
```

C'est la raison la plus concrète de ne plus jamais écrire `var`.

## `this` : quatre règles, et pourquoi les flèches n'en ont pas

`this` ne dépend pas de l'endroit où la fonction est écrite, mais de **la façon dont elle est appelée**. Quatre cas, dans l'ordre de priorité :

| Appel | Valeur de `this` |
| --- | --- |
| `new Truc()` | L'objet fraîchement créé |
| `fn.call(o)`, `fn.apply(o)`, `fn.bind(o)` | `o`, explicitement |
| `obj.methode()` | `obj`, l'objet à gauche du point |
| `fn()` seul | `undefined` en mode strict et dans les modules, l'objet global sinon |

La troisième règle est celle qui casse, parce qu'elle regarde **le point au moment de l'appel**, pas la définition :

```javascript
const compteur = {
  n: 0,
  increment() { this.n++; },
};

const f = compteur.increment;
f();                                    // TypeError : this vaut undefined
bouton.addEventListener("click", compteur.increment);   // même problème
```

Détacher une méthode de son objet lui fait perdre son `this`. C'est l'erreur la plus fréquente avec les écouteurs d'événements et les passages de callback.

**Une fonction fléchée n'a pas de `this` à elle** : elle utilise celui du contexte où elle a été écrite, et plus rien ne peut le changer — ni `call`, ni `bind`, ni la façon de l'appeler. D'où la solution :

```javascript
bouton.addEventListener("click", () => compteur.increment());
// ou
bouton.addEventListener("click", compteur.increment.bind(compteur));
```

Et la contrepartie, qui surprend dans l'autre sens : dans un écouteur d'événement, une fonction classique reçoit l'élément dans `this`, une fonction fléchée non. Quand tu veux l'élément, prends `e.currentTarget` — il marche dans les deux cas, et il est explicite.

## Muter ou non : le tableau à connaître

La moitié des méthodes de tableau modifient l'original, l'autre moitié renvoie une copie. Confondre les deux produit des bugs silencieux, en particulier en React où muter un état empêche le re-rendu.

| Modifient l'original | Renvoient une copie |
| --- | --- |
| `push`, `pop`, `shift`, `unshift` | `concat`, `slice`, `map`, `filter` |
| `splice`, `sort`, `reverse`, `fill` | `toSpliced`, `toSorted`, `toReversed`, `with` |

Les quatre méthodes de droite sur la seconde ligne sont récentes (2023) et résolvent précisément ce problème : `liste.toSorted()` trie sans toucher à `liste`, `liste.with(2, "x")` remplace le troisième élément en renvoyant un nouveau tableau.

Sur les objets, le trio à connaître :

```javascript
Object.keys(o);      // ["a", "b"]
Object.values(o);    // [1, 2]
Object.entries(o);   // [["a", 1], ["b", 2]]   — itérable, donc filtrable et mappable
Object.fromEntries(paires);                    // l'opération inverse
```

`Object.entries` suivi de `map` puis `fromEntries` est le motif standard pour transformer un objet, puisqu'il n'existe pas de `map` sur les objets.

## Les modules ES

```javascript
// curriculum.js
export const MODULES = ["Python", "ML"];     // export nommé
export function getModule(id) { /* … */ }
export default class Parcours { }            // export par défaut, un seul par fichier

// main.js
import Parcours, { MODULES, getModule } from "./curriculum.js";
import * as curriculum from "./curriculum.js";
const { MODULES } = await import("./curriculum.js");   // import dynamique, paresseux
```

Quatre propriétés qui ne se devinent pas :

**Les imports sont remontés et évalués avant tout le reste du fichier.** Un `import` placé en bas du fichier s'exécute quand même en premier. C'est aussi pourquoi un chemin d'import ne peut pas être une variable — sauf avec `import()` dynamique, qui renvoie une promesse et sert au chargement paresseux.

**Les imports sont des liaisons vivantes, pas des copies.** Si le module exportateur réaffecte sa variable, l'importateur voit la nouvelle valeur. C'est l'inverse de `require` en CommonJS.

**Tout module est en mode strict**, et son code s'exécute dans sa propre portée : pas de variable globale accidentelle.

**Les exports nommés sont préférables aux exports par défaut.** Un export nommé se renomme mal par accident, se complète automatiquement dans l'éditeur, et se repère par recherche textuelle dans le projet. Un export par défaut peut être importé sous n'importe quel nom, ce qui rend les références incohérentes au fil du temps.

## Lever des erreurs utilement

```javascript
// Fonctionne, mais perd toute information
throw "Utilisateur introuvable";

// Correct : pile d'appels, nom, message, et possibilité de typer
throw new Error("Utilisateur introuvable");
```

Lancer autre chose qu'une `Error` prive du *stack trace*, qui est précisément ce qu'on cherche à 2 h du matin. Et pour distinguer les cas dans un `catch`, on crée ses propres types :

```javascript
class ErreurValidation extends Error {
  constructor(champ, message) {
    super(message);
    this.name = "ErreurValidation";
    this.champ = champ;
  }
}

try {
  valider(donnees);
} catch (e) {
  if (e instanceof ErreurValidation) afficherSousLeChamp(e.champ, e.message);
  else throw e;                      // ce qu'on ne sait pas traiter, on le relance
}
```

La dernière ligne compte autant que le reste : **un `catch` qui avale tout est pire que pas de `catch`**, parce qu'il transforme une erreur visible en comportement inexplicable.

Depuis 2022, `new Error("…", { cause: erreurOriginale })` permet de ré-emballer une erreur sans perdre celle d'origine, lisible ensuite dans `e.cause`.

## Au clavier

1. Dans la console, tape les six expressions du tableau des comparaisons et vérifie chaque résultat. Puis refais-les avec `===`.
2. Écris une fonction qui prend un objet de configuration et lui donne des valeurs par défaut avec `||`. Passe-lui `{ limite: 0, actif: false }` et observe ce qui arrive. Corrige avec `??`.
3. Écris `antiRebond` sans regarder la leçon, branche-la sur un champ de saisie, et compte les appels dans la console en tapant dix caractères rapidement.
4. Crée un objet avec une méthode qui utilise `this`, passe cette méthode à `setTimeout`, et observe l'erreur. Corrige de deux façons différentes.
5. Fais `const b = { ...a }` sur un objet contenant un objet imbriqué, modifie l'imbriqué dans `b`, et vérifie `a`.

**Ressources** : javascript.info, le meilleur cours gratuit et de loin — https://javascript.info · la référence JavaScript de MDN — https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference
