TypeScript = JavaScript + types statiques. Le compilateur détecte les erreurs avant même d'exécuter le code.

**Pourquoi TypeScript ?**
```typescript
// ❌ JavaScript : l'erreur n'apparaît qu'à l'exécution
function calculerXP(leçons) {
  return leçons * 50;  // crash si leçons est undefined
}

// ✅ TypeScript : l'erreur est détectée à la compilation
function calculerXP(leçons: number): number {
  return leçons * 50;  // TypeScript garantit que leçons est un nombre
}

calculerXP("cinq");  // ❌ Erreur : Argument of type 'string' not assignable to 'number'
```

**Types primitifs**
```typescript
let nom: string = "Emile";
let xp: number = 250;
let estConnecté: boolean = true;
let progression: number[] = [10, 20, 30];
let tuple: [string, number] = ["py-1", 50];  // tuple : types fixes par position

// Union — plusieurs types possibles
let id: string | number = "abc123";
id = 42;  // ✅ aussi valide

// Littéral — valeurs exactes autorisées
type Niveau = "debutant" | "intermediaire" | "avance";
let niveau: Niveau = "debutant";
niveau = "expert";  // ❌ Erreur : pas dans l'union
```

**Interfaces — contrats pour les objets**
```typescript
interface Leçon {
  id: string;
  title: string;
  duration: string;
  content: string;
  completed?: boolean;  // ? = propriété optionnelle
}

interface Module {
  id: string;
  title: string;
  level: Niveau;
  icon: string;
  lessons: Leçon[];    // tableau d'interfaces imbriquées
  quiz: Question[];
}

interface Question {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

// TypeScript vérifie la structure à chaque usage
const module: Module = {
  id: "typescript",
  title: "TypeScript",
  level: "intermediaire",
  icon: "🔷",
  lessons: [],
  quiz: [],
};
```

**Type vs Interface**
```typescript
// Interface : extensible (recommandée pour les objets)
interface Utilisateur {
  id: string;
  email: string;
}
interface UtilisateurAvecXP extends Utilisateur {
  xp: number;
}

// Type : flexible, supporte les unions et intersections
type ID = string | number;
type UtilisateurComplet = Utilisateur & { xp: number };  // intersection
```

**Inférence de type** — TypeScript devine souvent le type :
```typescript
const score = 85;              // inféré : number
const modules = ["py", "ml"]; // inféré : string[]
const data = { xp: 100 };     // inféré : { xp: number }

// Plus besoin d'annoter quand c'est évident
const double = (n: number) => n * 2;  // retour inféré : number
```

**Ressource** : TypeScript Handbook — https://www.typescriptlang.org/docs/handbook/intro.html
