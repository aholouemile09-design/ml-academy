TypeScript côté backend + Zod pour la validation des données = une stack robuste et type-safe de bout en bout.

**Configurer TypeScript pour Node.js**
```bash
npm install typescript @types/node @types/express ts-node-dev
npx tsc --init
```
```json
// tsconfig.json — configuration recommandée
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,          // active toutes les vérifications strictes
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

**Express typé**
```typescript
import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

// Typer le body d'une requête
interface PrédictionRequest {
  features: number[];
  modelVersion?: string;
}

interface PrédictionResponse {
  prediction: number;
  confidence: number;
  modelVersion: string;
}

app.post("/api/predict", async (
  req: Request<{}, PrédictionResponse, PrédictionRequest>,
  res: Response<PrédictionResponse>
) => {
  const { features, modelVersion = "v1" } = req.body;
  // TypeScript connaît le type de features : number[]
  const result = await runModel(features);
  res.json({ prediction: result.value, confidence: result.conf, modelVersion });
});
```

**Zod — validation + inférence de type en une seule déclaration**
Zod valide les données d'entrée ET génère automatiquement les types TypeScript.

```typescript
import { z } from "zod";

// Définir le schéma une seule fois
const PrédictionSchema = z.object({
  features: z.array(z.number()).min(1, "Au moins une feature requise"),
  modelVersion: z.enum(["v1", "v2"]).default("v2"),
  userId: z.string().uuid().optional(),
});

// TypeScript infère automatiquement le type depuis le schéma
type PrédictionInput = z.infer<typeof PrédictionSchema>;
// { features: number[]; modelVersion: "v1" | "v2"; userId?: string }

app.post("/api/predict", async (req: Request, res: Response) => {
  const résultat = PrédictionSchema.safeParse(req.body);

  if (!résultat.success) {
    return res.status(400).json({
      error: "Données invalides",
      details: résultat.error.flatten()
    });
  }

  // résultat.data est parfaitement typé ici
  const { features, modelVersion } = résultat.data;
  const prédiction = await runModel(features, modelVersion);
  res.json(prédiction);
});
```

**Pattern repository typé — architecture propre**
```typescript
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, "id" | "createdAt">): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
}

class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  // ... implémenter les autres méthodes
}
```
