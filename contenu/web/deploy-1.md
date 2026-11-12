Déployer, c'est séparer trois choses qu'on confond en développement : le **code**, la **construction** et la **configuration**. Le code est dans Git. La construction produit un artefact figé. La configuration vient de l'environnement, et c'est la seule chose qui diffère entre une préversion et la production.

Tenir cette séparation règle la plupart des surprises du premier déploiement.

```text
git push  →  construction  →  artefact  →  publication  →  exécution
             (lint, tests,     immuable,    avec la        avec les
              compilation)     versionné    config de      secrets de
                                            l'env          l'env
```

## Où ton code s'exécute réellement

Les plateformes modernes ne font pas tourner un serveur comme ta machine. Connaître le modèle évite une série de bugs incompréhensibles.

| Modèle | Caractéristiques |
| --- | --- |
| Statique | Fichiers servis par un CDN. Aucun code côté serveur, coût quasi nul |
| Fonction serverless | Démarrée à la requête, tuée après. Pas d'état, durée d'exécution plafonnée |
| Serveur persistant | Un processus qui vit. État en mémoire possible, coût permanent |
| Edge | Exécuté au plus près du visiteur, dans un environnement restreint : pas de modules Node, pas de connexion TCP directe |

Sur Vercel, une page Next.js statique part au CDN, une route d'API devient une fonction, et le middleware tourne à l'edge. Trois modèles dans le même dépôt, et trois jeux de contraintes.

Les conséquences du modèle serverless, qu'on découvre toujours en production :

**Aucun état ne survit entre deux requêtes.** Un cache en mémoire, un compteur, une file d'attente, une session stockée dans une variable : chaque invocation peut tomber sur une instance neuve. Tout état partagé va dans une base ou un cache externe.

**Rien ne continue après la réponse.** Lancer un traitement long sans l'attendre, puis répondre, fait tuer le traitement à mi-course. Ce qui doit survivre passe par une file ou une tâche planifiée.

**Il n'y a pas de tâche planifiée gratuite.** Un `setInterval` dans le code d'une fonction ne s'exécute jamais. Les plateformes proposent des crons dédiés.

**Les connexions à la base explosent.** Chaque instance ouvre son propre groupe de connexions ; une montée en charge en crée des dizaines. C'est le problème vu au module Bases de données, et il se règle par un routeur de connexions et une limite par instance.

**Le démarrage à froid** ajoute quelques centaines de millisecondes à la première requête d'une instance inactive. Visible sur une API peu sollicitée, invisible sous charge.

## Les variables d'environnement : construction ou exécution

C'est la distinction qui coûte le plus de temps, parce que le symptôme est trompeur.

| Moment | Exemple | Pour changer la valeur |
| --- | --- | --- |
| **Construction** | Tout `NEXT_PUBLIC_*`, toute valeur lue dans un composant rendu au build | Il faut **reconstruire**. Modifier le tableau de bord ne suffit pas |
| **Exécution** | Les secrets lus côté serveur dans une route ou un composant serveur | Prise en compte au prochain démarrage |

Une variable `NEXT_PUBLIC_` est **inscrite littéralement** dans le JavaScript envoyé au navigateur, au moment de la construction. La changer dans l'interface de la plateforme et recharger la page ne produit rien tant qu'un nouveau déploiement n'a pas eu lieu — et on cherche longtemps pourquoi.

Et le préfixe n'est pas une autorisation : il est une **exposition**. Une clé d'API secrète préfixée ainsi est lisible par n'importe qui dans les outils de développement. Réserve-le à ce qui est publiable : l'URL de ton API, un identifiant de mesure d'audience.

Trois règles pour le reste :

**Les secrets vivent dans la plateforme, jamais dans le dépôt.** Le `.env` est dans `.gitignore`, point.

**Le `.env.example` se versionne.** Il liste les clés attendues, sans les valeurs. C'est la documentation qui permet à quelqu'un — ou à toi dans six mois — de faire tourner le projet.

**Préversion et production ont des secrets différents.** Si la préversion partage la base de production, un script de peuplement ou une migration destructrice lancés pour essayer effacent les vraies données. C'est l'erreur qu'on n'apprend qu'une fois.

Pour vérifier plutôt que supposer, une route de santé qui rapporte un identifiant **non sensible** de l'environnement :

```javascript
export async function GET() {
  return Response.json({
    env: process.env.VERCEL_ENV ?? "local",
    base: new URL(process.env.DATABASE_URL).hostname,   // l'hôte, pas l'URL
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7),
  });
}
```

## La chaîne d'intégration continue

Une chaîne est une suite de portes : si l'une échoue, rien n'est publié.

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  verifier:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

Quatre détails font la différence entre une chaîne utile et un badge décoratif.

**`npm ci`, pas `npm install`.** Il installe exactement le contenu du fichier de verrouillage et échoue si celui-ci diverge du manifeste. C'est ce qui rend la construction reproductible.

**La version de Node est épinglée**, ici par un fichier `.nvmrc` partagé avec la machine de développement. Une version majeure différente entre ta machine et la plateforme produit des erreurs qui n'existent nulle part ailleurs.

**L'ordre va du moins cher au plus cher.** Le lint échoue en dix secondes, la construction en trois minutes : inutile de construire si le code ne compile pas.

**Un test rouge doit bloquer la mise en ligne.** Une chaîne qui signale sans empêcher ne sert qu'à produire des notifications qu'on apprend à ignorer.

Côté branches : une préversion par branche et par demande de fusion, la production sur `main`, et `main` protégée — pas de poussée directe, la chaîne doit être verte avant fusion. C'est trois clics dans les réglages du dépôt, et c'est ce qui empêche le déploiement accidentel du vendredi soir.

## Pourquoi ça casse sur la plateforme et pas chez toi

Les causes, par ordre de fréquence réelle.

**La casse des noms de fichiers.** `import Bouton from "./composants/bouton"` fonctionne sur macOS et Windows, dont les systèmes de fichiers sont insensibles à la casse, et échoue sur Linux où tournent les serveurs. Pour voir le nom réellement enregistré dans Git :

```bash
git ls-files | grep -i bouton
```

**Une dépendance rangée dans `devDependencies` alors qu'elle sert à la construction.** En local, tout est installé ; la plateforme peut omettre les dépendances de développement.

**Une version de Node différente.** Fixe-la dans `.nvmrc` et dans le champ `engines` du manifeste.

**Un fichier ignoré par Git.** Il existe chez toi, il n'existe nulle part ailleurs. Le `.gitignore` est parfois trop large — un dossier `lib/` ignoré pour de mauvaises raisons.

**Une variable absente au moment de la construction**, pour un code qui la lit à ce moment-là.

Le test qui élimine les cinq d'un coup : **cloner son propre dépôt dans un dossier vierge** et reproduire la chaîne.

```bash
git clone <url> /tmp/essai && cd /tmp/essai
npm ci
npm run build
```

Le clone neuf supprime en une commande les fichiers ignorés, les dépendances installées à la main, les `.env` locaux et les caches. Si ça passe là, ça passera sur la plateforme.

Quand le build réussit mais que l'application renvoie 500, les causes changent : une variable d'**exécution** absente, une base inaccessible depuis la plateforme — liste d'adresses autorisées, exigence de TLS —, des migrations non appliquées, ou un port codé en dur au lieu de `process.env.PORT`.

## Les migrations dans le déploiement

Une migration n'est pas du code : elle ne se défait pas en revenant à la version précédente.

```jsonc
{
  "scripts": {
    "build": "prisma generate && next build",
    "migrate": "prisma migrate deploy"   // étape distincte, pas dans le build
  }
}
```

`prisma migrate deploy` applique les migrations existantes sans en créer et sans rien demander. `migrate dev` et `migrate reset` n'ont rien à faire en production.

**Un retour arrière ne défait pas une migration.** Si la version N+1 a supprimé une colonne, revenir à la version N remet un code qui lit une colonne absente. D'où deux principes : les migrations destructrices se font en deux déploiements — ajouter, migrer les données, puis seulement supprimer — et la réparation en production se fait le plus souvent **en avant**, par un correctif, pas par un retour en arrière.

Et avant toute migration sur des données réelles : une sauvegarde dont on a **vérifié la restauration**. Une sauvegarde jamais restaurée n'est pas une sauvegarde, c'est une hypothèse.

## Domaine, DNS et certificats

| Enregistrement | Usage |
| --- | --- |
| `A` | Pointe un nom vers une adresse IPv4. Pour le domaine racine |
| `AAAA` | La même chose en IPv6 |
| `CNAME` | Pointe un nom vers un autre nom. Pour `www` et les sous-domaines |
| `TXT` | Vérification de propriété, SPF, DKIM |

Le domaine racine ne peut pas porter de `CNAME` — contrainte du protocole. Les hébergeurs contournent avec un enregistrement spécial, ou en demandant un `A` vers une adresse fixe.

La propagation DNS prend de quelques minutes à quelques heures selon la durée de vie configurée. Avant une migration de domaine, abaisser cette durée à 300 secondes quelques jours à l'avance permet de basculer vite.

Les certificats TLS sont automatiques chez Vercel, Railway et leurs équivalents. Sur une machine à toi, Let's Encrypt et un renouvellement automatique — qu'il faut tester, car un certificat expiré rend le site inaccessible, pas seulement moins sûr.

Et une fois HTTPS en place, `Strict-Transport-Security` indique au navigateur de ne plus jamais tenter le HTTP. À activer après avoir vérifié que tout fonctionne : l'en-tête est mémorisé par le navigateur pour la durée annoncée, et il est difficile à annuler.

## Avant la première mise en production

Une liste courte, à passer une fois :

| Vérification | Pourquoi |
| --- | --- |
| Aucun secret dans l'historique Git | Un secret poussé est **brûlé** : il faut le révoquer, pas le supprimer du dépôt |
| Préversion et production sur des bases distinctes | Vérifié par la route de santé, jamais supposé |
| Variables d'exécution présentes dans les deux environnements | La cause n°1 des 500 au premier déploiement |
| Migrations appliquées | Et une sauvegarde restaurée au moins une fois |
| `main` protégée, chaîne verte obligatoire | Évite la mise en ligne non testée |
| Page 404 et page d'erreur soignées | Elles seront vues |
| Un domaine et un HTTPS fonctionnels | Et la redirection entre `www` et le domaine racine |
| Supervision des erreurs branchée | Sinon on apprend les pannes par les utilisateurs |

La première ligne mérite une vérification automatique : un outil d'analyse de secrets dans la chaîne, ou `git log --all -p | grep -i "api[_-]key"` pour une première passe manuelle.

## Au clavier

1. Clone ton propre dépôt dans un dossier vierge, lance `npm ci` puis `npm run build`. Note tout ce qui manque.
2. Change une variable `NEXT_PUBLIC_` dans le tableau de bord de la plateforme, recharge la page, et constate qu'elle n'a pas bougé. Redéploie et recommence.
3. Ajoute la route de santé et vérifie d'un coup d'œil que préversion et production ne pointent pas vers la même base.
4. Renomme un fichier en changeant seulement la casse, commite, et regarde ce que `git ls-files` enregistre réellement.
5. Écris la chaîne d'intégration, casse volontairement un test, et vérifie que le déploiement est bloqué.

**Ressources** : les douze facteurs, court et toujours juste — https://12factor.net/fr · la documentation Vercel sur les variables d'environnement — https://vercel.com/docs/environment-variables
