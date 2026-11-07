Une API sans authentification est une API publique. Voici les patterns standards de sécurisation.

**JWT (JSON Web Tokens)** — le standard pour les API sans session :
```javascript
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// Créer un token à la connexion
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!user || !await bcrypt.compare(password, user.hashedPassword)) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// Middleware de vérification du token
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Non authentifié" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Token invalide ou expiré" });
  }
}

// Route protégée
app.get("/api/my-models", requireAuth, async (req, res) => {
  const models = await getModelsByUser(req.user.userId);
  res.json(models);
});
```

**Variables d'environnement** — JAMAIS de secrets dans le code :
```bash
# .env (jamais versionné !)
JWT_SECRET=un_secret_tres_long_et_aleatoire
DATABASE_URL=postgresql://user:pass@localhost:5432/mldb
ANTHROPIC_API_KEY=sk-ant-...
```
```javascript
require("dotenv").config();
const secret = process.env.JWT_SECRET; // ✅
```

**Bonnes pratiques sécurité** :
- Rate limiting (express-rate-limit) : max 100 req/15min
- CORS configuré (pas *)
- Sanitiser les entrées (jamais faire confiance au client)
- HTTPS en production (Let's Encrypt gratuit)
- Logs sans données personnelles
