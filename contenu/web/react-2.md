Next.js est le framework React de référence. Il ajoute routing basé sur les fichiers, rendu serveur, optimisations automatiques — et c'est ce qui fait tourner CodeGraft Academy.

**App Router — structure de fichiers = routes**
```
app/
├── page.js           → /
├── parcours/
│   ├── page.js       → /parcours
│   └── [moduleId]/
│       └── page.js   → /parcours/python, /parcours/ml-classique...
├── tuteur/
│   └── page.js       → /tuteur
└── api/
    └── chat/
        └── route.js  → /api/chat (endpoint API)
```

**Server Components vs Client Components**
```jsx
// Server Component (par défaut) — s'exécute sur le serveur
// ✅ Accès direct à la BDD, pas de JS envoyé au client
export default async function Page() {
  const data = await fetch("https://api.example.com/data");  // serveur-side
  return <ul>{data.map(d => <li>{d.title}</li>)}</ul>;
}

// Client Component — "use client" en tête de fichier
"use client";
import { useState } from "react";

export default function InteractivePage() {
  const [count, setCount] = useState(0);  // useState impossible côté serveur
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Route API — backend intégré**
```javascript
// app/api/predict/route.js
export async function POST(request) {
  const { features } = await request.json();
  const prediction = await runModel(features);
  return Response.json({ prediction, confidence: 0.94 });
}
```

**Navigation et Link**
```jsx
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavLink({ href, label }) {
  return <Link href={href} className="hover:text-accent">{label}</Link>;
}
```

**Ressource** : Next.js Docs — https://nextjs.org/docs
