Express est le framework web Node.js le plus populaire. Simple, flexible, et au cœur de millions d'applications en production.

**Server Express de base**
```javascript
const express = require("express");
const app = express();

app.use(express.json());           // parser le JSON des requêtes
app.use(express.static("public")); // servir des fichiers statiques

// Routes CRUD pour des prédictions ML
app.get("/api/predictions", async (req, res) => {
  const predictions = await db.query("SELECT * FROM predictions LIMIT 50");
  res.json(predictions.rows);
});

app.get("/api/predictions/:id", async (req, res) => {
  const { id } = req.params;
  const pred = await db.query("SELECT * FROM predictions WHERE id = $1", [id]);
  if (!pred.rows.length) return res.status(404).json({ error: "Not found" });
  res.json(pred.rows[0]);
});

app.post("/api/predict", async (req, res) => {
  const { features } = req.body;
  const prediction = await runModel(features);
  res.status(201).json({ prediction, confidence: 0.92 });
});

app.listen(3000, () => console.log("API sur http://localhost:3000"));
```

**Middleware** — code qui s'exécute entre la requête et la réponse :
```javascript
// Logger personnalisé
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();  // passer au middleware suivant
});

// Gestion d'erreurs centralisée
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne" });
});
```

**Validation des entrées** — toujours valider côté serveur :
```javascript
app.post("/api/predict", (req, res) => {
  const { features } = req.body;
  if (!features || !Array.isArray(features)) {
    return res.status(400).json({ error: "features doit être un tableau" });
  }
  if (features.some(f => typeof f !== "number")) {
    return res.status(400).json({ error: "Toutes les features doivent être numériques" });
  }
  // ...
});
```

**Ressource** : Express.js — https://expressjs.com
