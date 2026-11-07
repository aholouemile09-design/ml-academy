SQL (Structured Query Language) est le langage universel des bases de données relationnelles. Tout ML Engineer lit et écrit du SQL quotidiennement.

**Les 4 opérations fondamentales**
```sql
-- Lire des données
SELECT nom, age, salaire
FROM employes
WHERE departement = 'Tech' AND salaire > 60000
ORDER BY salaire DESC
LIMIT 10;

-- Insérer
INSERT INTO employes (nom, age, departement) VALUES ('Emile', 30, 'ML');

-- Modifier
UPDATE employes SET salaire = 75000 WHERE id = 42;

-- Supprimer
DELETE FROM employes WHERE actif = false;
```

**Fonctions d'agrégation** — essentielles pour l'analyse de données :
```sql
SELECT
  departement,
  COUNT(*)        AS nb_employes,
  AVG(salaire)    AS salaire_moyen,
  MAX(salaire)    AS salaire_max,
  MIN(salaire)    AS salaire_min
FROM employes
GROUP BY departement
HAVING COUNT(*) > 5
ORDER BY salaire_moyen DESC;
```

**Ressource** : SQLBolt — https://sqlbolt.com/ (exercices interactifs gratuits, parfait pour débuter)
