MongoDB stocke des documents JSON (BSON). Idéal pour les données flexibles, les prototypes rapides et les projets où le schéma évolue souvent.

**Quand choisir MongoDB vs PostgreSQL ?**
- **MongoDB** : données flexibles (chaque document peut avoir une structure différente), prototypage rapide, stockage de logs ML, embeddings
- **PostgreSQL** : données relationnelles avec intégrité forte (utilisateurs, commandes, transactions financières)

**Mongoose — ODM pour Node.js**
```javascript
const mongoose = require("mongoose");

// Définir un schéma
const PredictionSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  inputData: mongoose.Schema.Types.Mixed,   // structure flexible
  prediction: Number,
  confidence: { type: Number, min: 0, max: 1 },
  metadata: {
    version: String,
    features: [String],
  },
  createdAt: { type: Date, default: Date.now }
});

const Prediction = mongoose.model("Prediction", PredictionSchema);

// CRUD
const pred = await Prediction.create({
  modelName: "fraud-detector-v2",
  inputData: { amount: 1500, country: "CA" },
  prediction: 1,
  confidence: 0.94
});

// Requêtes
const recent = await Prediction.find({ confidence: { $gt: 0.9 } })
  .sort({ createdAt: -1 })
  .limit(10);

await Prediction.updateOne({ _id: pred._id }, { $set: { confidence: 0.96 } });
```

**Agrégation MongoDB** — pipeline de transformation :
```javascript
const stats = await Prediction.aggregate([
  { $match: { confidence: { $gt: 0.7 } } },
  { $group: { _id: "$modelName", avgConfidence: { $avg: "$confidence" }, count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```
