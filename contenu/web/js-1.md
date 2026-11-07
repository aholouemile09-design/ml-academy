JavaScript est le seul langage natif du navigateur. Avec Node.js, il s'étend au backend. ES6+ (2015 et après) l'a rendu moderne et élégant.

**Variables modernes**
```javascript
const nom = "Emile";          // constante (recommandé par défaut)
let score = 0;                 // variable modifiable
// var : éviter — portée ambiguë

// Destructuring
const { prenom, age } = utilisateur;
const [premier, ...reste] = tableau;

// Template literals
const message = `Bonjour ${nom}, tu as ${age} ans`;
```

**Fonctions modernes**
```javascript
// Arrow function
const carre = x => x ** 2;
const additionner = (a, b) => a + b;

// Paramètres par défaut
const saluer = (nom = "visiteur") => `Bonjour ${nom}`;

// Spread & rest
const fusion = [...tableau1, ...tableau2];
const somme = (...nombres) => nombres.reduce((a, b) => a + b, 0);
```

**Tableaux modernes** — les méthodes fonctionnelles :
```javascript
const modules = ["Python", "ML", "Deep Learning", "NLP"];

modules.map(m => m.toUpperCase())           // transformer
modules.filter(m => m.length > 5)           // filtrer
modules.find(m => m.startsWith("ML"))       // trouver
modules.reduce((acc, m) => acc + 1, 0)     // agréger
modules.sort()                              // trier
```

**Modules ES6**
```javascript
// curriculum.js
export const MODULES = ["Python", "ML"];
export function getModule(id) { ... }

// main.js
import { MODULES, getModule } from "./curriculum.js";
```

**Ressource** : javascript.info — https://javascript.info (le meilleur tutoriel JS gratuit)
