Côté serveur, TypeScript rencontre sa limite : **les types disparaissent à la compilation**, et tout ce qui entre dans le programme entre sans type. Une requête HTTP, une variable d'environnement, une réponse d'API tierce, une ligne de base de données — rien de tout cela n'est vérifié par le compilateur, quoi que dise l'annotation.

La formule à garder : **TypeScript protège le code à la compilation, un schéma protège les données à l'exécution.** Cette leçon porte sur la seconde moitié.

```typescript
import { z } from "zod";

const Inscription = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(12),
  age: z.number().int().positive().optional(),
}).strict();

type Inscription = z.infer<typeof Inscription>;   // le type, dérivé du schéma
```

## Configurer TypeScript pour Node

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "outDir": "dist"
  }
}
```

Trois options méritent une explication.

**`module: "NodeNext"`** fait coller TypeScript au comportement réel de Node, qui décide du système de modules d'après le `"type"` du `package.json`. C'est aussi ce qui impose, en mode ESM, d'écrire les extensions dans les imports : `import { x } from "./outils.js"` — avec `.js`, même si le fichier source est un `.ts`, parce que l'import est résolu après compilation. C'est contre-intuitif et c'est la première erreur de tout projet Node en ESM.

**`verbatimModuleSyntax`** oblige à distinguer les imports de types :

```typescript
import type { Utilisateur } from "./modeles.js";   // effacé à la compilation
import { creerUtilisateur } from "./modeles.js";   // conservé
```

Sans cette distinction, un import de type peut laisser un `require` vers un fichier qui n'existe qu'au niveau des types, et casser à l'exécution.

**`skipLibCheck`** saute la vérification des fichiers de déclaration des dépendances. Ce n'est pas de la paresse : les erreurs qu'on y trouve viennent du code des autres, on ne peut pas les corriger, et la compilation est nettement plus rapide.

Pour l'exécution en développement, trois approches, de la plus simple à la plus contrôlée : les versions récentes de Node savent **retirer les types nativement** et exécuter un `.ts` directement ; `tsx` fait la même chose partout avec un rechargement à chaud ; et un `tsc` en amont produit du JavaScript qu'on déploie. En production, on déploie du JavaScript compilé — pas de compilateur sur le serveur.

Enfin, les types des bibliothèques : beaucoup les embarquent, les autres passent par un paquet `@types/…` maintenu par la communauté. Si l'import échoue avec « Could not find a declaration file », c'est ce paquet qui manque.

## Zod au-delà de `z.object`

Le vocabulaire qui revient dans un vrai projet :

```typescript
const Filtre = z.object({
  // Tout ce qui vient d'une URL est une CHAÎNE : il faut convertir
  page: z.coerce.number().int().min(1).default(1),
  actif: z.coerce.boolean().optional(),

  // Trois choses différentes
  surnom: z.string().optional(),        // la clé peut être absente
  biographie: z.string().nullable(),    // la clé existe, la valeur peut être null
  tri: z.enum(["date", "nom"]).default("date"),   // absent → "date"

  // Transformation : la sortie n'a pas le même type que l'entrée
  tags: z.string().transform((s) => s.split(",").map((t) => t.trim())),
});
```

**`z.coerce` est indispensable pour une chaîne de requête.** `?page=2` donne la chaîne `"2"` : un `z.number()` la rejette, un `z.coerce.number()` la convertit puis la valide. L'oublier donne des erreurs 400 incompréhensibles sur des paramètres pourtant corrects.

La distinction `optional` / `nullable` / `default` compte au moment d'écrire en base : `undefined` veut dire « ne touche pas à ce champ », `null` veut dire « vide-le ». Les confondre efface des données.

Les règles qui portent sur **plusieurs champs** passent par un raffinement :

```typescript
const Periode = z.object({
  debut: z.coerce.date(),
  fin: z.coerce.date(),
}).refine((p) => p.debut < p.fin, {
  message: "La date de fin doit suivre la date de début",
  path: ["fin"],                      // rattache l'erreur au bon champ
});
```

Le `path` n'est pas un détail : sans lui, l'erreur est globale et l'interface ne sait pas sous quel champ l'afficher.

Et pour des formes mutuellement exclusives, le schéma suit l'union discriminée de TypeScript :

```typescript
const Paiement = z.discriminatedUnion("moyen", [
  z.object({ moyen: z.literal("carte"), jeton: z.string() }),
  z.object({ moyen: z.literal("virement"), iban: z.string() }),
]);
```

Zod choisit le bon schéma d'après le discriminant, et les messages d'erreur restent lisibles — là où un `z.union` simple renvoie l'échec de toutes les branches.

## `.strict()`, et ce qu'il révèle

Par défaut, Zod **ignore silencieusement** les champs non déclarés : un corps contenant `{ email, motDePasse, role: "admin" }` passe la validation, et `role` disparaît simplement du résultat. C'est sûr tant qu'on utilise la sortie de `parse` — et dangereux si on continue d'utiliser l'objet d'origine.

`.strict()` rejette ces champs au lieu de les ignorer. C'est préférable sur toute entrée publique : un champ inattendu est rarement innocent, et le signaler vaut mieux que le masquer. Pour les cas où des champs supplémentaires sont normaux, `.passthrough()` les conserve explicitement.

## Valider dans une route

```typescript
app.post("/api/inscriptions", async (req, res) => {
  const resultat = Inscription.safeParse(req.body);

  if (!resultat.success) {
    return res.status(400).json({
      requestId: req.id,
      erreur: "Requête invalide",
      details: resultat.error.issues.map((i) => ({
        champ: i.path.join("."),
        message: i.message,
      })),
    });
  }

  const donnees = resultat.data;        // typé Inscription, et vérifié
  const utilisateur = await creer(donnees);
  return res.status(201).json(versPublic(utilisateur));
});
```

**`safeParse` plutôt que `parse`.** Dans une API, une entrée invalide n'est pas une exception : c'est un cas nominal qui doit produire un 400 avec un message utile. `parse` lève, ce qui mélange une erreur attendue avec les vraies pannes.

**Utilise `resultat.data`, jamais `req.body`.** C'est `data` qui porte les valeurs converties, les défauts appliqués et les champs inconnus retirés. Continuer sur `req.body` rend la validation décorative.

**Le `requestId`** permet de relier la réponse de l'utilisateur à la ligne de journal du serveur. C'est ce qui rend un rapport de bug exploitable, et c'est trois lignes à mettre en place une fois.

Et en Next.js App Router, la même logique s'écrit dans une route ou une Server Action :

```typescript
export async function POST(requete: Request) {
  const resultat = Inscription.safeParse(await requete.json());
  if (!resultat.success) {
    return Response.json({ erreur: "Requête invalide" }, { status: 400 });
  }
  // …
}
```

**Une Server Action est un point d'entrée HTTP comme un autre.** Qu'elle s'écrive comme une fonction locale ne change rien : n'importe qui peut l'appeler avec n'importe quel argument. Elle se valide exactement comme une route.

## Toutes les frontières, pas seulement les requêtes

| Frontière | Ce qui arrive sans validation |
| --- | --- |
| Corps, paramètres et requête HTTP | Le cas évident |
| Variables d'environnement | `process.env.X` est `string \| undefined`. Une variable absente en production se découvre par un plantage |
| Réponses d'API tierces | Un champ renommé par le fournisseur devient `undefined`, et le bug apparaît loin de la cause |
| Lignes de base de données | Le client renvoie souvent `any` ou un type généré qui ne reflète plus le schéma réel |
| Charges utiles de webhook | Elles viennent d'un tiers, et personne ne contrôle leur version |
| `localStorage` et cookies | L'utilisateur peut les modifier, et une ancienne version de ton code a pu y écrire autre chose |

Les variables d'environnement méritent un traitement particulier : on les valide **au démarrage**, pour échouer immédiatement plutôt qu'à la première requête.

```typescript
const Env = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const env = Env.parse(process.env);   // parse, pas safeParse : on veut l'arrêt
```

Ici `parse` est le bon choix : un environnement mal configuré doit empêcher le démarrage, pas produire des 500 silencieux pendant une semaine.

Et pour un webhook, l'ordre compte : **on vérifie d'abord la signature, on analyse ensuite.** La signature se calcule sur le corps brut ; l'analyser avant la rend incalculable, et accepter une charge utile non signée revient à laisser n'importe qui déclarer un paiement réussi.

## Le type n'enlève rien de l'objet

C'est le piège qui coûte le plus cher, parce qu'il ne produit aucune erreur.

```typescript
type UtilisateurPublic = Omit<Utilisateur, "motDePasseHache">;

async function obtenir(id: string): Promise<UtilisateurPublic> {
  const u = await db.utilisateur.findUnique({ where: { id } });
  return u;         // le compilateur est content… et le hash part dans la réponse
}
```

`Omit` est une opération de type. À l'exécution, l'objet contient toujours `motDePasseHache`, et `res.json(u)` le sérialise. Le type décrit une intention que rien n'applique.

La seule protection est un **mappeur explicite**, qui construit l'objet public champ par champ :

```typescript
function versPublic(u: Utilisateur): UtilisateurPublic {
  return { id: u.id, email: u.email, nom: u.nom, creeLe: u.creeLe };
}
```

L'avantage de cette forme : ajouter une colonne sensible en base ne la fait apparaître nulle part. Avec `Omit`, chaque nouvelle colonne est exposée par défaut jusqu'à ce que quelqu'un pense à l'ajouter à la liste d'exclusion. **Le défaut sûr est la liste blanche, pas la liste noire.**

On peut aussi faire appliquer la règle par un schéma de sortie : `UtilisateurPublicSchema.parse(u)` retire réellement les champs non déclarés.

## Les erreurs, du `catch` à la réponse

Avec `useUnknownInCatchVariables` — inclus dans `strict` — la variable du `catch` est `unknown`, ce qui force à la rétrécir :

```typescript
try {
  await traiter(donnees);
} catch (e) {
  if (e instanceof ZodError)       return reponse400(e);
  if (e instanceof ErreurMetier)   return reponse(e.statut, e.message);

  // Inconnu : on journalise tout, on ne renvoie presque rien
  logger.error({ requestId, erreur: e });
  return res.status(500).json({ requestId, erreur: "Erreur interne" });
}
```

La dernière branche est la règle de sécurité : **en production, aucune trace d'appel, aucun message de base de données, aucun chemin de fichier ne sort du serveur.** Ces informations décrivent ton infrastructure à un attaquant, et elles n'aident pas l'utilisateur. Le `requestId` suffit : il permet de retrouver la trace complète dans les journaux.

Et un message d'erreur de base de données contient souvent un nom de table, un nom de colonne, parfois une valeur. Le renvoyer tel quel est une fuite d'information, pas un geste de transparence.

## La frontière, en une image

| Zone | Ce qui garantit la correction |
| --- | --- |
| À l'intérieur du programme | TypeScript. Les types sont vérifiés, le compilateur suffit |
| À la frontière | Un schéma exécuté. Zod, et rien d'autre |
| Au-delà de la frontière | Rien. Toute donnée est hostile jusqu'à preuve du contraire |

Un seul schéma couvre les deux premières colonnes, grâce à `z.infer` : une déclaration produit la validation **et** le type. Écrire une interface à côté du schéma crée deux sources de vérité qui divergeront à la première évolution, en silence — c'est précisément ce que `z.infer` existe pour éviter.

## Au clavier

1. Écris un schéma Zod pour un formulaire d'inscription, dérive son type avec `z.infer`, et vérifie que modifier le schéma change le type sans toucher à rien d'autre.
2. Envoie à ta route un corps avec un champ en trop. Compare le comportement avec et sans `.strict()`.
3. Valide tes variables d'environnement au démarrage, puis supprime-en une et constate que le serveur refuse de démarrer avec un message clair.
4. Écris une fonction qui renvoie un enregistrement de base via `Omit`, inspecte la réponse JSON réelle, et vérifie que le champ exclu y est bien présent.
5. Fais échouer une requête de base de données et regarde ce que ton API renvoie. Si le message contient un nom de table, corrige.

**Ressources** : la documentation de Zod — https://zod.dev · le manuel TypeScript pour Node, modules et résolution — https://www.typescriptlang.org/docs/handbook/modules/reference.html
