Les generics permettent d'écrire du code réutilisable qui fonctionne avec n'importe quel type — sans perdre la sécurité des types.

**Generics — fonctions réutilisables typées**
```typescript
// Sans generics : on perd le type
function premier(tableau: any[]): any { return tableau[0]; }

// Avec generics : le type est préservé
function premier<T>(tableau: T[]): T {
  return tableau[0];
}

const premiereLeçon = premier(["py-1", "py-2"]);  // string
const premierScore = premier([95, 87, 72]);         // number
```

**Generics avec contraintes**
```typescript
interface AvecId { id: string; }

// T doit avoir une propriété id
function trouverParId<T extends AvecId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// Fonctionne avec Module, Leçon, Utilisateur — n'importe quel objet avec id
const module = trouverParId(WEB_CURRICULUM, "typescript");
```

**Types utilitaires intégrés** — les plus utiles en pratique :
```typescript
interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  xp: number;
  avatarUrl: string;
}

// Partial — toutes les propriétés deviennent optionnelles
type MiseÀJourUtilisateur = Partial<Utilisateur>;
// { id?: string; email?: string; nom?: string; ... }

// Required — toutes deviennent obligatoires
type UtilisateurComplet = Required<Utilisateur>;

// Pick — sous-ensemble de propriétés
type ProfilPublic = Pick<Utilisateur, "id" | "nom" | "avatarUrl">;

// Omit — exclure des propriétés
type SansMotDePasse = Omit<Utilisateur, "email">;

// Readonly — propriétés en lecture seule
type UtilisateurFigé = Readonly<Utilisateur>;

// Record — dictionnaire typé
type ScoresQuiz = Record<string, { score: number; total: number }>;
// équivalent à : { [moduleId: string]: { score: number; total: number } }
```

**Types conditionnels et inférence avancée**
```typescript
// Extraire le type de retour d'une fonction
type Retour<T> = T extends (...args: any[]) => infer R ? R : never;

async function fetchUser(): Promise<Utilisateur> { /* ... */ }
type TypeUser = Awaited<ReturnType<typeof fetchUser>>;  // Utilisateur

// Discriminated unions — pattern essentiel pour les états
type ÉtatRequête =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Utilisateur }
  | { status: "error"; message: string };

function gérerÉtat(état: ÉtatRequête) {
  switch (état.status) {
    case "success": return état.data;    // TypeScript sait que data existe ici
    case "error": return état.message;   // TypeScript sait que message existe ici
  }
}
```

**Enums — constantes nommées**
```typescript
enum Parcours { ML = "ml", Web = "web", PMP = "pmp" }

const parcoursCourant: Parcours = Parcours.ML;
// Préférer les string unions : type Parcours = "ml" | "web" | "pmp"
// Plus léger, pas compilé en objet JavaScript
```
