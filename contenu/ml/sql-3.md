PostgreSQL est la base de données relationnelle la plus utilisée en data science et en production. Open source, puissante, avec support JSON et extensions ML.

**Installer et créer une base**
```bash
# Installation (macOS)
brew install postgresql@15
brew services start postgresql@15

# Créer une base
createdb ml_projects
psql ml_projects
```

**Types de données utiles en ML**
```sql
CREATE TABLE predictions (
  id         SERIAL PRIMARY KEY,
  model_name VARCHAR(100) NOT NULL,
  input_data JSONB,                   -- données d'entrée flexibles
  prediction FLOAT,
  confidence FLOAT CHECK (confidence BETWEEN 0 AND 1),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour accélérer les requêtes fréquentes
CREATE INDEX idx_predictions_model ON predictions(model_name);
CREATE INDEX idx_predictions_date  ON predictions(created_at);
```

**Connexion Python avec psycopg2**
```python
import psycopg2
import pandas as pd

conn = psycopg2.connect("dbname=ml_projects user=emile")

# Charger directement dans un DataFrame pandas
df = pd.read_sql("SELECT * FROM predictions WHERE confidence > 0.9", conn)
print(df.head())
conn.close()
```

**SQLAlchemy** (ORM) : couche d'abstraction qui permet d'écrire du Python au lieu de SQL brut, et de changer de base sans réécrire le code.
