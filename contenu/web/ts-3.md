Next.js génère des projets TypeScript par défaut depuis la version 13. Voici comment typer correctement les composants React.

**Typer les props d'un composant**
```tsx
// Props simples
interface ModuleCardProps {
  id: string;
  icon: string;
  title: string;
  level: "debutant" | "intermediaire" | "avance";
  lessonsCount: number;
  isCompleted?: boolean;
  onClick?: () => void;          // fonction sans argument, sans retour
  onComplete?: (id: string) => void;  // fonction avec argument
}

export function ModuleCard({
  id, icon, title, level, lessonsCount,
  isCompleted = false,
  onClick,
  onComplete,
}: ModuleCardProps) {
  return (
    <div onClick={onClick} className="card p-6">
      <span>{icon}</span>
      <h3>{title}</h3>
      {onComplete && (
        <button onClick={() => onComplete(id)}>Terminer</button>
      )}
    </div>
  );
}
```

**Typer useState et useRef**
```tsx
import { useState, useRef } from "react";

function QuizPlayer() {
  const [score, setScore] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [réponseChoisie, setRéponseChoisie] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();  // ?. car peut être null avant le montage
  };

  return <input ref={inputRef} />;
}
```

**Typer useContext**
```tsx
interface ProgressContextType {
  xp: number;
  completedLessons: string[];
  completeLesson: (id: string) => void;
  saveQuiz: (moduleId: string, score: number, total: number) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function useProgress(): ProgressContextType {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress doit être utilisé dans ProgressProvider");
  return ctx;  // TypeScript sait que ctx n'est plus null après ce check
}
```

**Typer les Server et Client Components Next.js**
```tsx
// app/parcours/[moduleId]/page.tsx — Server Component
interface PageProps {
  params: { moduleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ModulePage({ params }: PageProps) {
  const module = getModule(params.moduleId);
  return <div>{module?.title}</div>;
}

// Générer les métadonnées dynamiques
import { Metadata } from "next";
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const module = getModule(params.moduleId);
  return { title: module?.title ?? "Module introuvable" };
}
```

**Typer les Route Handlers API**
```typescript
// app/api/progress/route.ts
import { NextRequest, NextResponse } from "next/server";

interface ProgressBody {
  lessonId: string;
  xpGained: number;
}

export async function POST(req: NextRequest) {
  const body: ProgressBody = await req.json();

  if (!body.lessonId || typeof body.xpGained !== "number") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // body est maintenant correctement typé
  return NextResponse.json({ success: true, lessonId: body.lessonId });
}
```

**Ressource** : React TypeScript Cheatsheet — https://react-typescript-cheatsheet.netlify.app
