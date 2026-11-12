Typer un composant, c'est en faire un **contrat**. Celui qui l'utilise sait ce qu'il doit fournir, l'éditeur le lui rappelle, et une refonte qui casse un appel est signalée dans la seconde au lieu d'être découverte en production.

```tsx
interface CarteModuleProps {
  id: string;
  titre: string;
  niveau: "debutant" | "intermediaire" | "avance";
  nbLecons: number;
  terminee?: boolean;
  onOuvrir?: (id: string) => void;
}

export function CarteModule({ titre, niveau, terminee = false }: CarteModuleProps) {
  return <article className={terminee ? "carte finie" : "carte"}>{titre}</article>;
}
```

## Les enfants, et pourquoi `React.FC` a disparu des guides

```tsx
import type { ReactNode } from "react";

interface PanneauProps {
  titre: string;
  children: ReactNode;      // tout ce que React sait afficher
  action?: ReactNode;       // un bouton, une icône, ou rien
}
```

`ReactNode` couvre les éléments, les chaînes, les nombres, les tableaux, `null` et `undefined`. `JSX.Element` ne couvre qu'un élément unique : l'utiliser pour `children` refuse `<>{a}{b}</>` et même une simple chaîne. Pour une prop qui reçoit du contenu, c'est **toujours** `ReactNode`.

`React.FC<Props>` était le motif recommandé jusqu'en 2021. Il a été abandonné pour trois raisons : il ajoutait un `children` implicite même aux composants qui n'en voulaient pas, il se mariait mal avec les composants génériques, et il n'apportait rien qu'une annotation de paramètre ne fasse mieux. Écris simplement la fonction et annote ses props.

Pour un composant qui n'existe que pour envelopper, `PropsWithChildren` évite une ligne :

```tsx
function Carte({ titre, children }: PropsWithChildren<{ titre: string }>) { /* … */ }
```

## Étendre les props natives : le motif le plus utile

Un composant `Bouton` maison doit accepter `disabled`, `type`, `aria-label`, `onFocus` et les trente autres attributs d'un `<button>`. Les recopier serait absurde ; TypeScript sait les récupérer.

```tsx
import type { ComponentPropsWithoutRef } from "react";

type BoutonProps = ComponentPropsWithoutRef<"button"> & {
  variante?: "principal" | "discret";
};

export function Bouton({ variante = "principal", className = "", ...reste }: BoutonProps) {
  return <button className={`btn btn-${variante} ${className}`} {...reste} />;
}
```

Trois choses se jouent dans ces lignes. L'intersection `&` ajoute tes props aux props natives. Le `...reste` les transmet toutes au `<button>`, y compris celles que tu n'avais pas prévues. Et `className` est extrait séparément pour être **combiné** au lieu d'être écrasé — sans ça, l'appelant qui passe une classe supprime les tiennes.

Les variantes du type, selon le besoin :

| Type | Quand |
| --- | --- |
| `ComponentPropsWithoutRef<"button">` | Le cas normal, pour un composant sans `ref` |
| `ComponentPropsWithRef<"button">` | Quand le composant transmet une `ref` |
| `ComponentProps<typeof MonComposant>` | Pour reprendre les props d'un composant à toi |

`ComponentProps<typeof X>` sert quand on enveloppe un composant d'une bibliothèque : on récupère ses props sans les connaître ni les maintenir.

## `useState` : annoter, ou laisser inférer

```tsx
const [n, setN] = useState(0);                      // number — inféré, parfait
const [texte, setTexte] = useState("");             // string — parfait
const [lecons, setLecons] = useState<Lecon[]>([]);  // annotation NÉCESSAIRE
const [choisi, setChoisi] = useState<Lecon | null>(null);   // idem
```

TypeScript infère depuis la valeur initiale. Un tableau vide ne contient aucune information : sans annotation, l'état est `never[]` et le premier `setLecons([…])` est refusé. Même chose pour `useState(null)`, inféré `null`, qui refusera ensuite tout le reste.

**La règle : annote quand la valeur initiale est plus pauvre que ce que l'état contiendra.** Tableau vide, `null`, objet vide, chaîne vide destinée à devenir une union de littéraux.

Et la forme fonctionnelle de la mise à jour est typée elle aussi, ce qui attrape une erreur réelle :

```tsx
setN((precedent) => precedent + 1);   // precedent : number, inféré
```

## `useRef` a trois formes, et deux types différents

C'est le point le plus confus de l'intégration React/TypeScript.

```tsx
const champ = useRef<HTMLInputElement>(null);      // RefObject : current en lecture seule
const minuteur = useRef<number | undefined>(undefined);  // MutableRefObject : current modifiable
const rendu = useRef(0);                           // MutableRefObject<number>
```

Quand on passe `null` comme valeur initiale **et** qu'on annote le type de l'élément, TypeScript choisit la forme destinée à être attachée à un nœud du DOM : `current` y est en lecture seule pour toi, c'est React qui l'écrit. D'où l'accès obligatoirement prudent :

```tsx
useEffect(() => { champ.current?.focus(); }, []);
```

Le `?.` n'est pas de la superstition : au premier rendu, et après un démontage, `current` vaut bien `null`.

Pour une valeur mutable qui survit aux rendus — un identifiant de minuteur, un compteur, la dernière valeur vue — il faut passer une valeur initiale autre que `null` seul, ou inclure `undefined` dans le type comme ci-dessus.

## Les événements : laisser inférer, sauf à extraire

```tsx
<input onChange={(e) => setTexte(e.target.value)} />
```

Dans un gestionnaire écrit sur place, `e` est déjà typé : React connaît l'élément. **Ne l'annote pas**, ce serait du bruit et une source d'erreur.

L'annotation devient nécessaire quand on extrait la fonction :

```tsx
import type { ChangeEvent, FormEvent, MouseEvent } from "react";

function gererSaisie(e: ChangeEvent<HTMLInputElement>) { setTexte(e.target.value); }
function gererEnvoi(e: FormEvent<HTMLFormElement>) { e.preventDefault(); }
function gererClic(e: MouseEvent<HTMLButtonElement>) { /* … */ }
```

Deux pièges : le paramètre générique est l'élément **qui porte l'écouteur**, pas celui qui a été cliqué. Et ce sont les types de React — des événements synthétiques — pas ceux du DOM : importer `MouseEvent` depuis nulle part prend celui de la bibliothèque standard, et les deux ne sont pas compatibles. D'où l'import explicite depuis `"react"`.

## `useReducer` : là où le typage paye le plus

Un état modélisé en union discriminée plus des actions en union discriminée donnent une exhaustivité vérifiée par le compilateur. C'est le motif qui transforme un composant fragile en machine à états sûre.

```tsx
type Etat =
  | { statut: "inactif" }
  | { statut: "chargement" }
  | { statut: "succes"; lecons: Lecon[] }
  | { statut: "erreur"; message: string };

type Action =
  | { type: "demarrer" }
  | { type: "reussir"; lecons: Lecon[] }
  | { type: "echouer"; message: string };

function reducteur(etat: Etat, action: Action): Etat {
  switch (action.type) {
    case "demarrer": return { statut: "chargement" };
    case "reussir":  return { statut: "succes", lecons: action.lecons };
    case "echouer":  return { statut: "erreur", message: action.message };
    default: {
      const impossible: never = action;   // un cas oublié casse la compilation
      throw new Error(`Action inconnue : ${JSON.stringify(impossible)}`);
    }
  }
}

const [etat, envoyer] = useReducer(reducteur, { statut: "inactif" });
```

Le gain se voit au rendu : **les données n'existent que dans l'état où elles ont un sens.**

```tsx
if (etat.statut === "chargement") return <Squelette />;
if (etat.statut === "erreur")     return <Erreur message={etat.message} />;
if (etat.statut === "succes")     return <Liste lecons={etat.lecons} />;
return <Vide />;
```

`etat.lecons` est inaccessible ailleurs que dans la branche `succes` — pas par discipline, parce que le type ne le contient pas. Deux booléens `chargement` et `erreur` auraient laissé exprimable « en chargement et en erreur avec des données », l'état incohérent qui finit toujours par arriver.

Et la quatrième branche est le rappel du module précédent : **succès mais vide** n'est pas une erreur et mérite son écran.

## Les composants génériques

Une liste réutilisable doit préserver le type de ses éléments :

```tsx
interface ListeProps<T> {
  items: T[];
  cle: (item: T) => string;
  rendre: (item: T) => ReactNode;
}

export function Liste<T>({ items, cle, rendre }: ListeProps<T>) {
  return <ul>{items.map((i) => <li key={cle(i)}>{rendre(i)}</li>)}</ul>;
}

<Liste items={lecons} cle={(l) => l.id} rendre={(l) => l.titre} />
//                          ^ l est de type Lecon, déduit depuis items
```

Un détail de syntaxe coûte souvent une demi-heure : dans un fichier `.tsx`, écrire une fonction fléchée générique `const f = <T>(x: T) => x` échoue, parce que l'analyseur lit `<T>` comme une balise JSX. La solution est une virgule : `const f = <T,>(x: T) => x`. Avec une déclaration `function`, le problème ne se pose pas — une raison de plus de la préférer pour les composants.

## Un contexte sans `undefined` partout

Le défaut d'un contexte doit bien valoir quelque chose avant le premier fournisseur. Mettre `undefined` oblige ensuite chaque consommateur à le vérifier. On centralise cette vérification dans un *hook* maison :

```tsx
interface Session { utilisateur: Utilisateur | null; deconnecter: () => void }

const ContexteSession = createContext<Session | undefined>(undefined);

export function useSession(): Session {
  const valeur = useContext(ContexteSession);
  if (valeur === undefined) {
    throw new Error("useSession doit être appelé dans un <FournisseurSession>");
  }
  return valeur;            // ici, le type est Session, sans undefined
}
```

Le message d'erreur est la moitié de l'intérêt : il nomme la cause exacte, là où l'absence de vérification aurait donné un `Cannot read properties of undefined` trois composants plus loin.

## Les variantes avec `satisfies`

```tsx
const VARIANTES = {
  principal: "bg-indigo-600 text-white",
  discret:   "bg-transparent text-slate-300",
  danger:    "bg-red-600 text-white",
} satisfies Record<string, string>;

type Variante = keyof typeof VARIANTES;   // "principal" | "discret" | "danger"
```

Une seule déclaration donne les classes à l'exécution **et** l'union des noms valides à la compilation. Ajouter une variante met le type à jour tout seul, et une faute de frappe dans un appel est une erreur. C'est le même principe `as const` de la première leçon, appliqué aux composants.

## Du côté de Next.js

Les composants serveur peuvent être `async`, ce que React interdit côté client. TypeScript les accepte :

```tsx
export default async function Page({ params }: { params: { moduleId: string } }) {
  const module = await chargerModule(params.moduleId);
  return <Vue module={module} />;
}
```

**La forme de `params` dépend de la version.** Jusqu'à Next 14 inclus, `params` et `searchParams` sont des objets simples, comme ci-dessus. À partir de Next 15, ce sont des **promesses** qu'il faut attendre :

```tsx
export default async function Page({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  // …
}
```

Vérifie la version du projet avant de recopier un exemple trouvé en ligne : c'est l'incompatibilité la plus fréquente des tutoriels Next récents.

Deux autres points utiles : une route d'API typée renvoie `NextResponse.json(donnees)` sans que le type de `donnees` ne soit vérifié contre quoi que ce soit — il n'y a pas de contrat partagé entre le serveur et le client, c'est à toi de le poser. Et une prop passée d'un composant serveur à un composant client doit être **sérialisable** : une fonction ou une classe passe la vérification TypeScript et échoue à l'exécution. Le type ne t'en avertira pas.

## Au clavier

1. Écris un composant `Bouton` qui étend `ComponentPropsWithoutRef<"button">`. Vérifie que `disabled`, `aria-label` et `onFocus` sont acceptés sans que tu les aies déclarés.
2. Écris `useState([])` puis essaie d'y mettre un objet. Lis l'erreur, puis annote.
3. Convertis un composant qui a trois `useState` booléens en `useReducer` avec un état en union discriminée. Compte les états incohérents que tu viens de rendre inexprimables.
4. Crée un contexte avec son *hook* de garde, puis appelle le *hook* hors du fournisseur et lis le message obtenu.
5. Écris une fonction fléchée générique dans un fichier `.tsx` sans la virgule, et lis l'erreur de l'analyseur.

**Ressources** : l'aide-mémoire React et TypeScript — https://react-typescript-cheatsheet.netlify.app · les types de React, à lire directement — https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
