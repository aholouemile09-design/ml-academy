Node.js exécute JavaScript hors du navigateur. npm (Node Package Manager) donne accès à 2 millions de packages.

**Modules Node.js intégrés**
```javascript
const fs = require("fs");
const path = require("path");
const http = require("http");

// Lire un fichier
const data = fs.readFileSync("data.json", "utf8");
const parsed = JSON.parse(data);

// Écrire un fichier
fs.writeFileSync("output.json", JSON.stringify(result, null, 2));

// Chemin portable (Windows/Mac/Linux)
const filePath = path.join(__dirname, "data", "train.csv");
```

**npm — gestion des dépendances**
```bash
npm init -y                    # créer package.json
npm install express            # installer
npm install --save-dev jest    # dépendance de dev
npm run start                  # exécuter le script "start"
npm test                       # exécuter les tests
```

**Package.json — le cœur du projet Node**
```json
{
  "name": "ml-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

**Asynchrone en Node.js** — tout est événementiel :
```javascript
// Éviter les callbacks imbriqués (callback hell)
// ✅ Utiliser async/await
const readData = async (filePath) => {
  const content = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(content);
};
```
