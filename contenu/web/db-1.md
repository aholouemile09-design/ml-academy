Prisma est l'ORM moderne pour Node.js/TypeScript. Il génère un client typé depuis ton schéma, évite les injections SQL et simplifie les migrations.

**Initialiser Prisma**
```bash
npm install @prisma/client
npm install --save-dev prisma
npx prisma init          # crée prisma/schema.prisma + .env
```

**Schéma Prisma — définir le modèle de données**
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  xp        Int      @default(0)
  createdAt DateTime @default(now())
  lessons   CompletedLesson[]
  quizzes   QuizResult[]
}

model CompletedLesson {
  id       Int    @id @default(autoincrement())
  lessonId String
  user     User   @relation(fields: [userId], references: [id])
  userId   Int
  completedAt DateTime @default(now())

  @@unique([userId, lessonId])
}
```

**Requêtes Prisma dans Express**
```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Créer un utilisateur
const user = await prisma.user.create({
  data: { email: "emile@ml.ca", name: "Emile", xp: 0 }
});

// Lire avec relations
const userWithProgress = await prisma.user.findUnique({
  where: { id: userId },
  include: { lessons: true, quizzes: true }
});

// Mettre à jour l'XP
await prisma.user.update({
  where: { id: userId },
  data: { xp: { increment: 50 } }
});
```

**Migrations**
```bash
npx prisma migrate dev --name add-xp-field
npx prisma studio                            # GUI de la BDD
```
