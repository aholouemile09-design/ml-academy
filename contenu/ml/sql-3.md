Jusqu'ici tu as appris le **langage**. PostgreSQL est le **moteur** : le programme qui garde les données sur le disque, applique les règles, gère plusieurs clients à la fois et exécute tes requêtes. C'est la base de données la plus utilisée en data science, et celle que tu as déjà installée dans WSL.

## Ce qu'un moteur apporte en plus du langage

Trois garanties qu'un fichier CSV ne donne pas, et qui sont la raison d'être d'une base.

**Les transactions.** Un `BEGIN ... COMMIT` est atomique : soit tout passe, soit rien. Si le courant saute au milieu d'un virement, tu ne te réveilles pas avec de l'argent débité d'un côté et jamais crédité de l'autre. C'est le « A » d'ACID, et c'est non négociable dès qu'il y a de l'argent ou des comptes utilisateurs.

**La concurrence.** Dix programmes peuvent lire et écrire en même temps sans se marcher dessus. PostgreSQL donne à chaque transaction une vue cohérente des données, et une lecture ne bloque jamais une écriture. Un fichier CSV ouvert par deux processus, c'est une corruption qui attend son heure.

**Les contraintes.** La base peut refuser une donnée invalide. C'est le point le plus important pour toi, et on y revient plus bas.

## S'y connecter

PostgreSQL 18 tourne dans ta WSL. S'il ne répond pas, c'est que le service est arrêté :

```bash
sudo service postgresql start     # démarrer
sudo service postgresql status    # vérifier
psql -d coursesql -U emilelinux   # se connecter à la base
```

### Pourquoi psql ne te demande pas de mot de passe

Ça intrigue toujours, et la réponse vaut d'être comprise parce qu'elle explique aussi les refus de connexion.

PostgreSQL choisit sa **méthode d'authentification** selon qui se connecte et par où, d'après un fichier appelé `pg_hba.conf`. Pour les connexions locales, la méthode par défaut sur Ubuntu est **peer** : le serveur demande au système d'exploitation le nom de l'utilisateur Unix qui ouvre la connexion, et il l'accepte si ce nom correspond au rôle PostgreSQL demandé.

Ton utilisateur Linux s'appelle `emilelinux`, le rôle PostgreSQL aussi : le système a déjà prouvé ton identité en te connectant à la machine, la base s'en contente. Tu as bien un mot de passe sur ce rôle, mais `peer` ne le demande pas.

Deux conséquences immédiates :

- `psql -d coursesql -U quelquundautre` échoue, même avec le bon mot de passe, tant que la connexion est locale et en `peer`. Ce n'est pas le mot de passe qui est refusé, c'est la correspondance des noms.
- Une connexion **par le réseau** — depuis Python sur `localhost:5432`, par exemple — ne passe pas par `peer` mais par une méthode à mot de passe (`scram-sha-256`). C'est là que le mot de passe du rôle sert.

### Rôles et bases

Un **rôle** est un utilisateur ou un groupe. Une **base** est un ensemble de tables isolé des autres. Un rôle peut avoir accès à plusieurs bases, et une base recevoir plusieurs rôles.

```sql
\du          -- les rôles et leurs attributs
\l           -- les bases
\c autrebase -- changer de base sans quitter psql
```

En production, la règle est d'avoir un rôle par application, avec le minimum de droits : l'application qui lit un catalogue n'a aucune raison de pouvoir faire `DROP TABLE`. Ton rôle `emilelinux` est superutilisateur, ce qui est commode pour apprendre et serait une faute sur un vrai service.

## Les types qui servent vraiment en ML

Au-delà de `INT`, `TEXT`, `NUMERIC` et `BOOLEAN`, PostgreSQL en a trois qui changent la vie d'un projet de données.

**`TIMESTAMPTZ`** — un instant avec fuseau horaire. Utilise-le toujours plutôt que `TIMESTAMP` nu. Le jour où ton serveur est à Montréal, ta base à Toronto et ton utilisateur à Paris, seul le type avec fuseau donne une réponse qui a un sens. Un `TIMESTAMP` sans fuseau, c'est un nombre dont personne ne sait à quelle horloge il se rapporte.

**`JSONB`** — du JSON stocké sous forme binaire, et surtout **requêtable**. Parfait pour ce qui est irrégulier par nature : les features d'entrée d'un modèle, dont le nombre change d'une version à l'autre, ou les hyperparamètres d'un entraînement.

```sql
CREATE TABLE predictions (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  modele     TEXT        NOT NULL,
  entree     JSONB       NOT NULL,
  prediction DOUBLE PRECISION,
  confiance  NUMERIC(4,3) CHECK (confiance BETWEEN 0 AND 1),
  cree_le    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- on requête à l'intérieur du JSON
SELECT modele, entree->>'ville' AS ville, prediction
FROM predictions
WHERE (entree->>'age')::int > 40;
```

`->>` extrait une valeur en texte, `->` la garde en JSON. Le `::int` est une conversion de type — tout ce qui sort du JSON est du texte tant qu'on ne le convertit pas.

Un avertissement, parce que la facilité est un piège : `JSONB` sert à ce qui est **vraiment** variable. Y mettre des champs que tu connais à l'avance, c'est renoncer aux types, aux contraintes et aux index pour rien. Si la colonne existe toujours, fais-en une vraie colonne.

**`GENERATED ALWAYS AS IDENTITY`** remplace `SERIAL` dans le SQL moderne. Même résultat, mais c'est la forme standard, et elle interdit d'écrire la valeur à la main — ce qui évite justement de désynchroniser le compteur.

## Les contraintes : la validation qu'on ne contourne pas

Voici l'idée la plus importante de cette leçon.

Ton code Python valide ses entrées. Très bien. Mais le script d'import du collègue, lui, ne passe pas par ton code. Ni la correction manuelle faite un vendredi soir dans `psql`. Ni le prochain service écrit dans un autre langage.

**Une contrainte dans la base est la seule validation que personne ne peut contourner**, parce qu'elle est posée à l'endroit où toutes les écritures convergent.

```sql
CREATE TABLE commandes (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  client_id  INT         NOT NULL REFERENCES clients(id),
  montant    NUMERIC(10,2) NOT NULL CHECK (montant >= 0),
  statut     TEXT        NOT NULL CHECK (statut IN ('en_cours','livree','annulee')),
  email      TEXT        UNIQUE,
  date_cmd   DATE        NOT NULL DEFAULT CURRENT_DATE
);
```

Ce que chacune garantit :

- `NOT NULL` — la valeur est obligatoire.
- `CHECK` — une règle métier arbitraire. Un montant négatif devient impossible, pas simplement improbable.
- `UNIQUE` — pas de doublon. C'est la seule façon correcte d'empêcher deux comptes avec le même e-mail : un `SELECT` préalable en Python ne suffit pas, deux requêtes simultanées peuvent passer le test toutes les deux avant que l'une n'écrive.
- `REFERENCES clients(id)` — la **clé étrangère**. `client_id` doit désigner un client qui existe. Une commande orpheline devient impossible, et c'est exactement le genre de saleté qui ruine une jointure plus tard.

La clé étrangère sait aussi quoi faire quand le parent disparaît : `ON DELETE CASCADE` supprime les commandes avec le client, `ON DELETE RESTRICT` empêche de supprimer un client qui a des commandes. Choisir, c'est décider explicitement de ce qui doit arriver — au lieu de le découvrir.

> Un `CHECK` de trois mots remplace des dizaines de lignes de validation éparpillées dans le code, et il tient même quand le code se trompe.

## Les index

Sans index, répondre à `WHERE modele = 'xgboost-v3'` oblige la base à lire **toutes** les lignes. Sur mille lignes, personne ne le remarque ; sur dix millions, la requête met des secondes.

Un index est une structure triée à côté de la table, qui permet d'aller droit aux bonnes lignes.

```sql
CREATE INDEX idx_predictions_modele ON predictions(modele);
CREATE INDEX idx_predictions_date   ON predictions(cree_le);
```

Ce n'est pas gratuit, et c'est la partie qu'on oublie : chaque index occupe de la place et doit être **mis à jour à chaque écriture**. Une table couverte d'index lit vite et écrit lentement. On indexe donc ce sur quoi on filtre, trie ou joint souvent — pas « au cas où ».

Les clés primaires sont indexées automatiquement. Les clés étrangères **ne le sont pas** en PostgreSQL : si tu joins souvent sur `commandes.client_id`, ajoute l'index toi-même.

Pour savoir si un index sert, demande-le à la base plutôt que de deviner :

```sql
EXPLAIN ANALYZE
SELECT * FROM predictions WHERE modele = 'xgboost-v3';
```

Cherche dans la sortie `Seq Scan` — la base a tout lu — ou `Index Scan` — elle a utilisé l'index. `EXPLAIN ANALYZE` exécute vraiment la requête et donne les temps réels. C'est le seul moyen honnête de parler de performance : une optimisation sans mesure avant/après est une croyance.

## Se connecter depuis Python

La bibliothèque est **psycopg** (version 3), successeur de `psycopg2` qu'on croise encore partout dans les tutoriels.

```python
import psycopg

with psycopg.connect("dbname=coursesql user=emilelinux host=localhost") as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT nom, salaire FROM employes WHERE departement = %s", ("Data",))
        for nom, salaire in cur:
            print(nom, salaire)
```

Le `with` ferme la connexion quoi qu'il arrive, y compris sur une exception — et valide la transaction en sortie, ou l'annule si une erreur est remontée.

### Le paramètre, et jamais la concaténation

Regarde bien ces deux lignes. La différence entre les deux est la faille de sécurité la plus répandue de l'histoire du web.

```python
# JAMAIS. Interdit, sans exception.
cur.execute(f"SELECT * FROM employes WHERE nom = '{nom}'")

# Toujours : la valeur passe en paramètre
cur.execute("SELECT * FROM employes WHERE nom = %s", (nom,))
```

Avec la première forme, si `nom` vaut `'; DROP TABLE employes; --`, la chaîne assemblée contient deux instructions et la base exécute les deux. C'est l'**injection SQL**.

La seconde forme n'est pas « la même chose en plus propre ». Elle est différente par nature : la requête et les données partent **séparément** au serveur. La valeur n'est jamais analysée comme du SQL, donc elle ne peut pas en devenir. Il n'y a rien à échapper, rien à filtrer, rien à oublier.

Trois précisions qui évitent les erreurs classiques :

- Le marqueur est `%s` **quel que soit le type** — texte, entier, date. Ce n'est pas un format Python.
- Le second argument est un **tuple**. Pour une seule valeur, la virgule est obligatoire : `(nom,)` et non `(nom)`.
- Un paramètre remplace une **valeur**, jamais un nom de table ou de colonne. Pour un `ORDER BY` dynamique, il faut une liste blanche de noms autorisés dans ton code Python — rien d'autre n'est sûr.

### Vers pandas

```python
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine("postgresql+psycopg://emilelinux@localhost/coursesql")

df = pd.read_sql(
    "SELECT departement, salaire FROM employes WHERE actif = %(actif)s",
    engine,
    params={"actif": True},
)
```

Passe par un *engine* SQLAlchemy plutôt qu'une connexion brute : c'est ce que pandas attend officiellement, et il gère le pool de connexions.

Un réflexe à prendre tout de suite, parce qu'il sépare ceux qui savent se servir d'une base de ceux qui s'en servent comme d'un disque : **fais le travail dans la base, pas dans pandas.**

```python
# Mauvais : on rapatrie dix millions de lignes pour en agréger douze
df = pd.read_sql("SELECT * FROM commandes", engine)
resultat = df.groupby("categorie")["montant"].sum()

# Bon : la base agrège, Python reçoit douze lignes
resultat = pd.read_sql(
    "SELECT categorie, SUM(montant) AS total FROM commandes GROUP BY categorie",
    engine,
)
```

La base est écrite en C, indexée, et travaille là où les données sont déjà. Faire voyager les lignes sur le réseau pour les agréger en mémoire est le gaspillage le plus courant d'un projet data — et celui qui fait planter un script le jour où la table grossit.

Quand il faut vraiment tout lire, lis par morceaux : `pd.read_sql(..., chunksize=50_000)` rend un itérateur de DataFrames au lieu d'un bloc qui ne tient pas en mémoire.

## Au clavier, dans coursesql

Un `.env` ou une variable d'environnement pour la chaîne de connexion, jamais un mot de passe écrit dans un `.py` — un secret qui part sur GitHub est un secret compromis, et l'effacer ensuite ne l'efface pas de l'historique.

Trois choses à essayer, dans l'ordre :

1. `\d commandes` dans `psql`, pour voir les contraintes et les index que la table porte déjà.
2. `EXPLAIN ANALYZE` sur une requête filtrant `commandes.client_id`, avant puis après `CREATE INDEX`. Avec 16 lignes, le temps ne bougera pas et le plan, lui, peut changer — c'est le plan qu'il faut regarder.
3. Une connexion Python avec `psycopg`, une requête paramétrée, et le résultat dans un DataFrame.

Et le piège du jour, qui n'a rien à voir avec SQL : depuis Python tu passes par le **réseau** (`host=localhost`), donc plus par `peer`. Si la connexion est refusée alors que `psql` fonctionne, c'est normal — c'est la méthode d'authentification qui change, pas tes identifiants.
