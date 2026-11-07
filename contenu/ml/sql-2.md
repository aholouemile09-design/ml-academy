Les jointures permettent de combiner plusieurs tables — au cœur de tout projet de données réel.

**Types de jointures**
```sql
-- INNER JOIN : seulement les lignes qui matchent dans les deux tables
SELECT c.nom, o.montant, o.date
FROM clients c
INNER JOIN commandes o ON c.id = o.client_id;

-- LEFT JOIN : toutes les lignes de gauche, même sans correspondance
SELECT c.nom, COUNT(o.id) AS nb_commandes
FROM clients c
LEFT JOIN commandes o ON c.id = o.client_id
GROUP BY c.nom;
```

**Sous-requêtes et CTEs** — pour les requêtes complexes :
```sql
-- CTE (Common Table Expression) : lisible et réutilisable
WITH revenus_par_region AS (
  SELECT region, SUM(montant) AS total
  FROM commandes
  GROUP BY region
)
SELECT region, total,
       ROUND(total * 100.0 / SUM(total) OVER (), 2) AS pct
FROM revenus_par_region
ORDER BY total DESC;
```

**Fonctions de fenêtre** — utilisées massivement en analytics :
```sql
SELECT
  nom,
  salaire,
  RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang_dept,
  AVG(salaire) OVER (PARTITION BY departement) AS moy_dept
FROM employes;
```
