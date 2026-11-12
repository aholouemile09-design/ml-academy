TypeScript est deux outils en un : un **vérificateur**, qui lit ton code et signale les incohérences, et une **gomme**, qui retire les annotations pour produire du JavaScript ordinaire. Il n'ajoute aucune vérification à l'exécution, et c'est la clé pour comprendre à la fois ce qu'il attrape et ce qu'il laisse passer.

```typescript
function calculerXP(lecons: number): number {
  return lecons * 50;
}

calculerXP("trois");   // Argument of type 'string' is not assignable
                       // to parameter of type 'number'.
```

La commande utile n'est pas `tsc` mais `tsc --noEmit` : on vérifie sans produire de fichiers, parce que la compilation est déjà faite par Next.js, Vite ou le navigateur. TypeScript sert de filet, pas de chaîne de production.

## Le typage est structurel, pas nominal

Venant de Java ou de C#, c'est la différence qui déroute le plus. TypeScript ne regarde pas le **nom** d'un type, mais sa **forme**.

```typescript
interface Point   { x: number; y: number }
interface Vecteur { x: number; y: number }

const v: Vecteur = { x: 1, y: 2 };
const p: Point = v;        // accepté : même forme, donc compatible
```

Aucune déclaration de parenté n'est nécessaire. Un objet est acceptable partout où sa forme suffit — c'est du « typage canard » vérifié à la compilation, et c'est ce qui rend TypeScript utilisable sur du JavaScript existant sans tout réécrire.

Le corollaire : **un objet avec des propriétés en trop reste compatible.** Sauf dans un cas, qui déroute tout le monde la première fois :

```typescript
function dessiner(p: Point) { /* … */ }

const brut = { x: 1, y: 2, couleur: "rouge" };
dessiner(brut);                                // accepté
dessiner({ x: 1, y: 2, couleur: "rouge" });    // ERREUR
// Object literal may only specify known properties
```

La seconde ligne est un **littéral frais** : TypeScript applique alors une vérification supplémentaire des propriétés excédentaires, parce qu'un littéral écrit sur place avec une propriété inconnue est presque toujours une faute de frappe. Passé par une variable, l'objet n'est plus frais et la règle structurelle reprend. Ce n'est pas une incohérence, c'est une heuristique — et la connaître évite une demi-heure de perplexité.

## L'inférence, et l'élargissement

TypeScript devine le type de presque tout. Annoter ce qu'il infère déjà est du bruit :

```typescript
const n: number = 42;    // inutile
const n = 42;            // inféré : 42
let  m = 42;             // inféré : number
```

La différence entre les deux dernières lignes est l'**élargissement**. Une liaison `const` ne changera jamais, son type est donc le littéral exact `42`. Une liaison `let` peut changer, son type est élargi à `number`. C'est ce qui explique :

```typescript
type Methode = "GET" | "POST";

const m1 = "GET";
appeler(m1);                     // accepté : m1 est de type "GET"

let m2 = "GET";
appeler(m2);                     // ERREUR : m2 est de type string

const options = { methode: "GET" };
appeler(options.methode);        // ERREUR : les propriétés sont élargies aussi
```

La dernière ligne est le cas réel : les propriétés d'un objet sont toujours élargies, même dans un `const`. La réponse est `as const`, qui fige tout l'objet en littéraux et le rend `readonly` :

```typescript
const options = { methode: "GET" } as const;
appeler(options.methode);        // accepté : "GET"

const NIVEAUX = ["debutant", "intermediaire", "avance"] as const;
type Niveau = (typeof NIVEAUX)[number];   // "debutant" | "intermediaire" | "avance"
```

Ces deux dernières lignes sont un motif à retenir : **une seule liste sert de données à l'exécution et de type à la compilation.** On peut boucler dessus pour afficher un menu, et le type reste synchronisé automatiquement.

La règle d'annotation, en une phrase : **annote les frontières, laisse inférer l'intérieur.** Les paramètres de fonction et les types de retour publics sont des contrats, donc on les écrit ; les variables locales se déduisent, donc on se tait.

## `strict`, et l'option qui n'y est pas

`"strict": true` n'est pas une option mais un paquet. Ce qu'elle active :

| Option | Ce qu'elle impose |
| --- | --- |
| `strictNullChecks` | `null` et `undefined` ne sont plus assignables partout. **De loin la plus importante** |
| `noImplicitAny` | Un paramètre dont le type ne peut pas être déduit devient une erreur |
| `strictFunctionTypes` | Les paramètres de fonction sont vérifiés dans le bon sens |
| `strictPropertyInitialization` | Une propriété de classe non optionnelle doit être initialisée |
| `useUnknownInCatchVariables` | La variable d'un `catch` est `unknown` et non `any` |
| `alwaysStrict` | Le JavaScript produit est en mode strict |

Sans `strictNullChecks`, TypeScript accepte `null` partout et ne sert pour ainsi dire à rien : la moitié des plantages en production sont des `Cannot read properties of null`. C'est la raison d'exister de l'outil.

Et **une option majeure est en dehors de `strict`** :

```json
{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true } }
```

`noUncheckedIndexedAccess` fait que `tableau[0]` est de type `T | undefined` et non `T`. C'est la vérité : rien ne garantit qu'un tableau a un premier élément.

```typescript
const premier = lecons[0];
premier.titre;        // avec l'option : 'premier' is possibly 'undefined'
```

C'est l'option qui révèle le plus de vrais bugs, et elle est pénible les premiers jours. Elle n'est pas dans `strict` parce qu'elle casserait trop de code existant — ce qui en dit long. Active-la sur un projet neuf.

## Le rétrécissement de type

Une valeur de type `string | number` ne peut rien faire d'utile tant qu'on ne sait pas laquelle. TypeScript suit le flux de contrôle et **rétrécit** le type branche par branche.

```typescript
function formater(v: string | number | null): string {
  if (v === null) return "—";          // ici v : string | number
  if (typeof v === "number") return v.toFixed(2);   // ici v : number
  return v.trim();                     // ici v : string
}
```

Les mécanismes de rétrécissement, du plus simple au plus puissant :

| Mécanisme | Exemple |
| --- | --- |
| `typeof` | `typeof v === "string"` |
| Véracité | `if (v)` — attention, élimine aussi `0` et `""` |
| Égalité | `v === null`, `v === "GET"` |
| `in` | `if ("href" in props)` |
| `instanceof` | `if (e instanceof TypeError)` |
| Propriété discriminante | `if (etat.statut === "succes")` |
| Prédicat de type | `if (estUtilisateur(v))` |

Le dernier s'écrit à la main et sert pour tout ce que TypeScript ne peut pas déduire seul :

```typescript
function estUtilisateur(v: unknown): v is Utilisateur {
  return typeof v === "object" && v !== null && "email" in v;
}
```

Le `v is Utilisateur` est une **promesse** que tu fais au compilateur : il te croit sur parole et rétrécit le type dans la branche. Si ta fonction ment, TypeScript ne le saura jamais — c'est un point où la sécurité repose sur toi.

Et son cousin, la fonction d'assertion, qui lève au lieu de renvoyer un booléen :

```typescript
function assertDefini<T>(v: T | null | undefined, msg: string): asserts v is T {
  if (v == null) throw new Error(msg);
}

assertDefini(utilisateur, "utilisateur manquant");
utilisateur.email;        // après l'appel, le type est rétréci
```

## `never`, et le contrôle d'exhaustivité

`never` est le type de ce qui ne peut pas exister : une fonction qui ne revient jamais, une branche inatteignable, une union vide. Sa seule utilisation quotidienne vaut l'apprentissage du reste :

```typescript
type Forme =
  | { type: "cercle"; rayon: number }
  | { type: "carre"; cote: number };

function aire(f: Forme): number {
  switch (f.type) {
    case "cercle": return Math.PI * f.rayon ** 2;
    case "carre":  return f.cote ** 2;
    default: {
      const impossible: never = f;     // si une forme est oubliée, ERREUR ICI
      throw new Error(`Forme inconnue : ${impossible}`);
    }
  }
}
```

Tant que tous les cas sont traités, `f` vaut `never` dans le `default` et l'affectation passe. Le jour où quelqu'un ajoute `{ type: "triangle" }` à l'union, `f` vaut `{ type: "triangle"; … }` dans le `default`, qui n'est pas assignable à `never` : **le compilateur signale tous les endroits oubliés.**

C'est la meilleure raison de modéliser ses états avec des unions discriminées : ajouter un cas devient une liste de courses au lieu d'une chasse aux bugs.

## `void`, et le piège du retour ignoré

`void` ne veut pas dire « ne renvoie rien » mais « la valeur renvoyée ne doit pas être utilisée ». La nuance a un effet concret : **une fonction qui renvoie quelque chose est acceptée là où `void` est attendu.**

```typescript
const ids: number[] = [];
[1, 2, 3].forEach((n) => ids.push(n));   // push renvoie un nombre, et c'est accepté
```

C'est voulu, et c'est pratique. Mais c'est aussi la raison pour laquelle le compilateur ne te prévient pas quand tu passes par accident une fonction `async` là où un callback synchrone est attendu : la promesse renvoyée est simplement ignorée, et les erreurs qu'elle contient disparaissent.

## `as` est une affirmation, pas une conversion

```typescript
const el = document.querySelector("#champ") as HTMLInputElement;
```

`as` ne vérifie rien et ne convertit rien : il dit au compilateur « tais-toi, je sais ». Si le sélecteur ne trouve rien, `el` vaut `null` et la ligne suivante plante — TypeScript avait raison de douter.

Deux formes à reconnaître :

```typescript
const x = valeur as unknown as Utilisateur;   // double assertion : on force
const el = document.querySelector("#champ")!; // ! : « ce n'est pas null »
```

Le point d'exclamation est un `as` déguisé, et il a le même défaut : il supprime l'avertissement sans supprimer la cause. Chaque `!` est un endroit où ton programme plantera si tu t'es trompé. Préfère une vérification explicite ; garde le `!` pour les cas où tu peux justifier en une phrase pourquoi la valeur existe forcément.

**La bonne alternative s'appelle `satisfies`.** Elle vérifie qu'une valeur est conforme à un type **sans** élargir le type inféré :

```typescript
const COULEURS = {
  succes: "#10b981",
  erreur: "#ef4444",
} satisfies Record<string, string>;

COULEURS.succes.toUpperCase();   // le type reste "#10b981", pas string
COULEURS.inconnu;                // ERREUR : la clé n'existe pas
```

Avec une annotation `: Record<string, string>`, on aurait perdu les clés exactes et les valeurs littérales. Avec `as`, on n'aurait rien vérifié du tout. `satisfies` donne les deux : la vérification **et** l'inférence précise. C'est la réponse moderne, et elle remplace la plupart des `as`.

## Tableaux, tuples, lecture seule

```typescript
const notes: number[] = [12, 15];
const paire: [string, number] = ["py-1", 40];      // tuple : longueur et ordre fixés
const nomme: [id: string, duree: number] = ["py-1", 40];   // tuple étiqueté

const fige: readonly number[] = [1, 2];
fige.push(3);          // ERREUR : push n'existe pas sur un readonly
```

`readonly` est purement une vérification de compilation : rien n'empêche une modification à l'exécution. Son intérêt est de documenter l'intention et d'attraper les mutations accidentelles — ce qui est précisément le bug courant en React.

Les tuples servent surtout à typer un retour multiple, comme `useState` : `[valeur, setValeur]` est un tuple, pas un tableau, sinon chaque élément aurait le type de l'union des deux.

## `enum` ou union de littéraux

```typescript
enum Niveau { Debutant, Intermediaire, Avance }      // à éviter
type Niveau = "debutant" | "intermediaire" | "avance";   // préférable
```

L'union de littéraux gagne sur trois points. Elle **disparaît à la compilation**, là où un `enum` génère un objet JavaScript réel — ce qui contredit le principe « les types n'existent pas à l'exécution » et perturbe les outils de suppression du code mort. Elle se compare directement aux chaînes venues d'une API, sans conversion. Et elle s'écrit sans rien importer.

L'`enum` numérique a en plus un défaut franc : `Niveau.Debutant` vaut `0`, donc il est faux dans un test de véracité, et `Niveau[0]` renvoie `"Debutant"` par un mécanisme d'indexation inverse qui surprend.

Quand il faut à la fois des valeurs à l'exécution et un type, le motif `as const` vu plus haut fait le travail sans ces défauts.

## Lire une erreur TypeScript

Les messages sont longs parce qu'ils décrivent un chemin. La méthode : **lis la dernière ligne d'abord**, c'est la cause réelle ; les lignes du dessus ne font que situer.

```text
Type '{ id: string; duree: string; }' is not assignable to type 'Lecon'.
  Types of property 'duree' are incompatible.
    Type 'string' is not assignable to type 'number'.
```

Ici : la durée est une chaîne au lieu d'un nombre. Les deux premières lignes sont le contexte.

Trois messages fréquents et leur traduction :

| Message | Ce qu'il veut dire |
| --- | --- |
| `Object is possibly 'undefined'` | Tu lis une valeur que le type autorise à être absente. Vérifie-la, ou utilise `?.` |
| `Property 'x' does not exist on type 'never'` | Un rétrécissement a éliminé tous les cas : souvent une comparaison impossible plus haut |
| `Type 'string' is not assignable to type '"GET" \| "POST"'` | Un élargissement : il manque un `as const` ou une annotation |

Et dans l'éditeur, deux raccourcis valent une heure de lecture : survoler une valeur affiche son type inféré, et la commande « Aller à la définition » ouvre le type réel plutôt que celui qu'on imagine.

## Au clavier

1. Écris `const a = "GET"` et `let b = "GET"`, puis survole chaque variable dans l'éditeur et compare les types affichés.
2. Passe un objet littéral avec une propriété en trop à une fonction typée. Constate l'erreur, puis passe le même objet via une variable intermédiaire et constate qu'elle disparaît.
3. Écris une union discriminée de trois formes et un `switch` avec le garde `const impossible: never`. Ajoute une quatrième forme et regarde où le compilateur t'envoie.
4. Active `noUncheckedIndexedAccess` sur un projet existant et compte les erreurs. Regarde si chacune est un vrai bug possible.
5. Remplace un `as` par `satisfies` sur un objet de configuration et compare l'autocomplétion obtenue.

**Ressources** : le manuel officiel, court et bien écrit — https://www.typescriptlang.org/docs/handbook/intro.html · le bac à sable pour tester une idée sans projet — https://www.typescriptlang.org/play
