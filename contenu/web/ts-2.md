Un générique est un **paramètre de type** : la fonction reçoit un type comme elle reçoit un argument, et le rend. Tout le reste de cette leçon en découle — les types utilitaires, les types conditionnels, les types calculés sont des fonctions qui prennent des types et en renvoient d'autres.

```typescript
function premier<T>(tableau: T[]): T | undefined {
  return tableau[0];
}

premier(["py-1", "py-2"]);   // string | undefined
premier([95, 88]);           // number | undefined
```

Le `T` n'est pas écrit à l'appel : TypeScript le déduit de l'argument. On ne l'annote explicitement — `premier<string>(…)` — que lorsque l'inférence échoue ou donne un type trop large.

## Contraindre un générique

Un `T` libre ne permet rien : on ne peut pas lire `.id` dessus, puisqu'on ne sait pas s'il en a un. La contrainte dit le minimum exigé.

```typescript
function parId<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((i) => [i.id, i]));
}
```

`extends` ici ne veut pas dire « hérite de » mais « est assignable à ». La fonction accepte n'importe quel objet **pourvu qu'il ait** un `id`, et renvoie exactement le type reçu — pas une version appauvrie. C'est toute la différence avec `any[]`, qui aurait accepté la même chose en détruisant l'information au passage.

Deux options complètent la déclaration :

```typescript
function creerListe<T = string>(n: number, valeur: T): T[] { /* … */ }
//                   ^^^^^^^^ type par défaut si l'inférence n'a rien à se mettre sous la dent
```

## `keyof` et l'accès indexé : le duo qui rend tout typable

```typescript
interface Lecon { id: string; titre: string; duree: number }

type CleLecon = keyof Lecon;      // "id" | "titre" | "duree"
type Duree    = Lecon["duree"];   // number
```

`keyof T` produit l'union des clés, `T[K]` le type de la valeur à cette clé. Ensemble, ils permettent d'écrire des fonctions génériques qui restent précises :

```typescript
function lire<T, K extends keyof T>(objet: T, cle: K): T[K] {
  return objet[cle];
}

const l: Lecon = { id: "ts-1", titre: "Types", duree: 40 };

lire(l, "duree");    // number   — pas string | number, le type exact
lire(l, "couleur");  // ERREUR : Argument of type '"couleur"' is not assignable
```

L'autocomplétion propose les trois clés valides, et une faute de frappe est une erreur de compilation. C'est le genre de fonction qu'on écrit une fois et qu'on réutilise partout — un accès de configuration, un tri par colonne, un formulaire générique.

Attention à une confusion fréquente : `keyof` sur un tableau donne les clés d'un tableau (`"length"`, `"map"`, les indices…), pas ses valeurs. Pour les valeurs : `T[number]`.

```typescript
const NIVEAUX = ["debutant", "avance"] as const;
type Niveau = (typeof NIVEAUX)[number];   // "debutant" | "avance"
```

Et `typeof` au niveau des types n'est pas l'opérateur JavaScript : il récupère le type d'une **valeur** existante pour la réutiliser. `typeof NIVEAUX` vaut `readonly ["debutant", "avance"]`.

## Les types mappés : comment `Partial` est écrit

Un type mappé parcourt les clés d'un type pour en construire un autre. Les utilitaires fournis ne sont rien d'autre :

```typescript
type Partial<T>  = { [K in keyof T]?: T[K] };
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Record<K extends keyof any, V> = { [P in K]: V };
```

Les modificateurs `?` et `readonly` s'ajoutent, et se **retirent** avec un moins :

```typescript
type Obligatoire<T> = { [K in keyof T]-?: T[K] };   // enlève l'optionnalité
type Modifiable<T>  = { -readonly [K in keyof T]: T[K] };
```

On peut aussi renommer les clés au passage, avec `as` — qui n'a ici rien à voir avec l'assertion de la leçon précédente :

```typescript
type Ecouteurs<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (v: T[K]) => void;
};

type L = Ecouteurs<Lecon>;
// { onIdChange: (v: string) => void;
//   onTitreChange: (v: string) => void;
//   onDureeChange: (v: number) => void }
```

Les **types littéraux de gabarit** — les accents inversés dans un type — composent des chaînes à la compilation, et `Capitalize`, `Uppercase`, `Lowercase`, `Uncapitalize` les transforment. C'est ce qui permet de typer une API d'événements ou un système de variantes sans écrire une ligne à la main.

Le filtrage se fait en renvoyant `never` pour les clés à exclure :

```typescript
type SeulementChaines<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type S = SeulementChaines<Lecon>;   // { id: string; titre: string }
```

## Les types conditionnels et `infer`

```typescript
type EstTableau<T> = T extends unknown[] ? true : false;
```

Même syntaxe ternaire qu'en JavaScript, au niveau des types. Le mot-clé `infer` permet en plus de **capturer** une partie du type à l'intérieur de la condition :

```typescript
type Element<T> = T extends (infer U)[] ? U : never;
type Retour<T>  = T extends (...a: never[]) => infer R ? R : never;

type A = Element<Lecon[]>;              // Lecon
type B = Retour<() => Promise<number>>; // Promise<number>
```

C'est exactement ainsi que sont définis `ReturnType`, `Parameters` et `Awaited` dans la bibliothèque standard. Les lire une fois enlève toute impression de magie.

Une propriété surprend au début : **un type conditionnel appliqué à une union se distribue sur chaque membre.**

```typescript
type SansNull<T> = T extends null | undefined ? never : T;
type R = SansNull<string | null | number>;
// évalué membre par membre : string | never | number  →  string | number
```

C'est la définition de `NonNullable`, et le même mécanisme donne `Exclude` et `Extract`. Pour empêcher la distribution quand on ne la veut pas, on entoure de crochets : `[T] extends [U] ? … : …`.

## Les types utilitaires à connaître

| Utilitaire | Effet |
| --- | --- |
| `Partial<T>` | Toutes les propriétés optionnelles. Typique d'une mise à jour partielle |
| `Required<T>` | Toutes obligatoires |
| `Readonly<T>` | Toutes en lecture seule |
| `Pick<T, K>` | Ne garde que les clés listées |
| `Omit<T, K>` | Retire les clés listées |
| `Record<K, V>` | Un dictionnaire aux clés `K` et valeurs `V` |
| `Exclude<U, M>` | Retire de l'union `U` les membres assignables à `M` |
| `Extract<U, M>` | Ne garde que ceux-là |
| `NonNullable<T>` | Retire `null` et `undefined` |
| `ReturnType<F>` | Le type de retour d'une fonction |
| `Parameters<F>` | Les paramètres, en tuple |
| `Awaited<T>` | Le type résolu d'une promesse, même imbriquée |

La valeur de ces types n'est pas d'écrire moins : c'est que les types **dérivés** ne divergent jamais de leur source. Ajouter un champ à `Utilisateur` met automatiquement à jour `Omit<Utilisateur, "motDePasse">`. Une interface recopiée à la main, elle, se désynchronise au premier changement — en silence.

Deux pièges réels :

**`Omit` est une opération de type, pas un filtre à l'exécution.** `Omit<Utilisateur, "motDePasse">` ne retire rien de l'objet : il ment au lecteur si tu renvoies directement l'objet complet. La propriété est toujours là, et elle part dans la réponse JSON. Il faut un **mappeur explicite** qui construit le nouvel objet champ par champ.

**`Omit` ne vérifie pas que la clé existe.** `Omit<Lecon, "duree_">` ne lève aucune erreur et ne retire rien — la faute de frappe passe. `Pick`, lui, refuse une clé inconnue.

## `any`, `unknown`, et la forme de la frontière

`unknown` est le type de « quelque chose, mais je ne sais pas quoi » : tout lui est assignable, et on ne peut rien en faire avant de l'avoir rétréci. `any` désactive simplement le compilateur sur cette valeur, et la contamine tout ce qu'elle touche.

Le point que l'on mesure mal : **une seule valeur `any` peut faire disparaître la vérification sur toute une chaîne d'appels.** Le type se propage à travers les retours de fonction, les destructurations, les méthodes. Un `JSON.parse` non traité en haut d'un fichier, et dix fonctions plus bas ne sont plus vérifiées du tout.

Le réglage `noImplicitAny` interdit les `any` accidentels mais pas les volontaires. Pour traquer ceux-là, la règle ESLint `@typescript-eslint/no-explicit-any` existe, et l'option `noImplicitOverride`, `noImplicitReturns` complètent la série.

La frontière s'écrit donc ainsi : **`unknown` en entrée, puis un prédicat ou un schéma pour descendre vers un type précis.** C'est le sujet de la quatrième leçon.

## Étendre des types qu'on ne possède pas

Deux mécanismes, souvent confondus.

**La fusion de déclarations** : deux interfaces de même nom dans la même portée fusionnent. C'est ce qui permet d'ajouter une propriété à un type d'une bibliothèque tierce :

```typescript
// types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      utilisateur?: { id: string; role: "admin" | "membre" };
    }
  }
}
export {};
```

Un `type` ne fusionne pas — c'est d'ailleurs la seule différence pratique entre `interface` et `type` qui compte au quotidien. Pour le reste, prends `interface` pour une forme d'objet publique, `type` pour une union, un tuple, un alias ou un type calculé.

**L'augmentation de module** fait la même chose pour un module précis :

```typescript
declare module "ma-lib" {
  export function nouvelleFonction(x: number): string;
}
```

Et pour une bibliothèque sans types du tout, une déclaration minimale suffit à sortir de l'erreur d'import, en assumant qu'on ne gagne aucune sécurité :

```typescript
declare module "vieille-lib";   // le module est typé any
```

## Quand les génériques deviennent une mauvaise idée

Un type générique bien écrit est invisible. Un type générique de trop se paye trois fois : à l'écriture, à la lecture, et dans des messages d'erreur de quarante lignes où apparaissent `T extends infer U ? …`.

Trois signaux qu'il faut reculer :

**Le générique n'est utilisé qu'une fois.** `function f<T>(x: T): void` n'apporte rien de plus que `function f(x: unknown): void` — un paramètre de type ne sert que s'il **relie** deux endroits, l'entrée et la sortie par exemple.

**Le message d'erreur est illisible.** Si le compilateur dit `Type instantiation is excessively deep and possibly infinite`, le type récursif est allé trop loin. Un type simple et une assertion documentée valent mieux qu'une acrobatie que personne ne pourra modifier.

**La règle de trois s'applique aussi aux types.** On factorise un type au troisième usage réel, pas par anticipation. Un type abstrait écrit pour un besoin futur est de la dette avec une syntaxe élégante.

## Au clavier

1. Écris `lire<T, K extends keyof T>` et appelle-la sur un objet. Vérifie que l'autocomplétion propose les clés et que le type de retour est exact pour chacune.
2. Réécris `Partial`, `Pick` et `Omit` toi-même, sous les noms `MonPartial`, etc. Compare avec les définitions de la bibliothèque standard, accessibles par « Aller à la définition ».
3. Définis `type Element<T>` avec `infer` et teste-le sur `string[]`, `Promise<number>[]` et `number`.
4. Crée un type `Ecouteurs<T>` avec renommage de clés par gabarit et applique-le à une interface de cinq champs.
5. Prends une fonction de ton code qui utilise `any` et convertis-la en générique. Note ce que tu gagnes exactement à l'appel.

**Ressources** : les types utilitaires du manuel — https://www.typescriptlang.org/docs/handbook/utility-types.html · le type challenge pour s'entraîner — https://github.com/type-challenges/type-challenges
