Une application en ligne pose trois questions nouvelles : est-elle rapide **pour ses visiteurs réels**, sait-on ce qui s'y passe, et que se passe-t-il quand elle casse. Les trois se répondent par la mesure — et c'est la différence entre un projet d'école et un projet qu'on peut montrer.

## Les trois signaux de performance

Google mesure trois choses sur les vraies visites, et elles pèsent sur le référencement.

| Signal | Ce qu'il mesure | Seuil « bon » | Cause habituelle |
| --- | --- | --- | --- |
| **LCP** | Le temps avant l'affichage du plus grand élément visible | 2,5 s | Image non optimisée, réponse serveur lente, police bloquante |
| **INP** | Le délai entre une interaction et la réponse visible | 200 ms | Trop de JavaScript, travail long sur le fil principal |
| **CLS** | Le déplacement inattendu du contenu pendant le chargement | 0,1 | Images sans dimensions, publicités insérées, police de repli |

L'**INP** a remplacé l'ancien FID en mars 2024, et le changement est important : FID ne mesurait que le délai de la **première** interaction, INP mesure la pire de toute la visite. Beaucoup de sites bien notés auparavant ont vu leur score chuter, non parce qu'ils avaient empiré, mais parce que la mesure est devenue honnête.

Le CLS est celui qui se corrige le plus facilement : donner ses dimensions à chaque image et réserver la place de tout ce qui arrive plus tard.

## Mesure en laboratoire, mesure sur le terrain

**Lighthouse est un test de laboratoire** : une seule visite, sur un appareil simulé, avec un réseau simulé. Il est reproductible, donc utile pour comparer avant et après une modification.

**Les données de terrain** viennent des visites réelles — le rapport d'expérience utilisateur de Chrome, ou ta propre mesure en production. C'est ce que Google utilise pour classer, et c'est souvent beaucoup moins flatteur : les vrais visiteurs ont des téléphones plus lents, des réseaux moins bons, et des extensions de navigateur.

Un 95 en laboratoire avec un mauvais score de terrain est un cas courant, pas une contradiction. Les deux se lisent ensemble : le laboratoire pour itérer, le terrain pour savoir où on en est.

Et une règle qui évite de perdre une journée : **un score mesuré en mode développement ne veut rien dire.** Le serveur de développement recompile à la volée, ne minifie pas, et embarque le rechargement à chaud. Mesure sur `npm run build && npm start`, ou sur l'URL déployée.

## Par où vient réellement la lenteur

Dans l'ordre de ce qu'on trouve en pratique :

**Trop de JavaScript.** C'est de loin le premier poste. Le coût n'est pas le téléchargement mais l'analyse et l'exécution, qui monopolisent le fil principal sur un téléphone d'entrée de gamme. Le tableau affiché à la fin de `npm run build` donne le poids par route : une page à 400 ko a un problème d'architecture qu'aucune optimisation d'image ne corrigera.

**Les scripts tiers.** Une bulle de discussion, un outil de mesure d'audience, un gestionnaire de consentement pèsent souvent plus que toute ton application, et tu ne contrôles ni leur contenu ni leur performance. C'est le poste le moins regardé et le plus rentable à tailler.

**Les images.** Format moderne, dimensions déclarées, taille servie adaptée à l'affichage. Le composant `next/image` fait les trois.

**Les polices.** Une police chargée depuis un domaine tiers ajoute une résolution DNS, une connexion et un aller-retour avant le premier texte. Hébergée localement avec `font-display: swap`, elle ne bloque plus l'affichage.

**Le travail serveur.** Une requête de base non indexée ou un N+1 se voient directement dans le LCP. Avant d'optimiser le front, vérifie le temps de réponse du serveur.

Les deux leviers Next.js qui restent :

```jsx
const Graphique = dynamic(() => import("./Graphique"), { ssr: false });
```

`next/dynamic` **ne réduit pas le poids total** : il le déplace hors du chargement initial. C'est exactement ce qu'on veut pour un composant lourd invisible au premier écran — un éditeur, une carte, un graphique.

Et `priority` sur l'image principale la sort du chargement différé. À ne mettre **que** là : si tout est prioritaire, plus rien ne l'est.

## Les caches, du CDN au navigateur

```text
Cache-Control: public, max-age=31536000, immutable      → fichiers au nom haché
Cache-Control: public, max-age=0, must-revalidate       → HTML
Cache-Control: private, max-age=60                      → réponse personnalisée
```

La règle tient en une phrase : **ce dont le nom change à chaque version se met en cache pour toujours, le reste se revalide.** Un fichier `app-8f3a2b.js` ne changera jamais de contenu — un nouveau déploiement produit un nouveau nom. Le HTML, lui, doit rester frais puisqu'il référence ces noms.

`stale-while-revalidate` est l'entre-deux utile : servir immédiatement la version en cache **et** rafraîchir en arrière-plan. L'utilisateur n'attend jamais, et le contenu est à jour au chargement suivant.

Et la précaution déjà vue, qui mérite d'être répétée parce que l'erreur est grave : **une réponse personnalisée doit porter `private`.** Sans ce mot, un cache partagé peut servir les données d'un utilisateur à un autre.

## Observer : journaux, métriques, traces

Trois outils, trois questions différentes.

| Outil | Répond à |
| --- | --- |
| **Journaux** | Que s'est-il passé pour *cette* requête ? |
| **Métriques** | Comment se comporte le système *dans l'ensemble*, dans le temps ? |
| **Traces** | Où est passé le temps, étape par étape, dans un appel ? |

Les **journaux** sont structurés, en JSON sur une ligne, avec un niveau, un horodatage et surtout un **identifiant de requête** qui relie tous les messages d'un même appel. C'est ce qui transforme une trace isolée en récit : la requête reçue, la requête de base lancée, l'erreur levée, la réponse envoyée.

Pour les **métriques**, quatre suffisent à surveiller presque n'importe quel service : la latence, le trafic, le taux d'erreur, et la saturation des ressources.

Et une précision qui change tout : **on regarde des centiles, pas des moyennes.** Une latence moyenne de 200 ms peut cacher un p99 de 8 secondes — un utilisateur sur cent attend huit secondes, et c'est celui qui écrit. Le p50 dit l'expérience typique, le p95 et le p99 disent l'expérience des gens qui souffrent.

## Alerter sur ce qui se voit

Deux règles font la différence entre une supervision utile et un flux de notifications ignorées.

**Alerter sur les symptômes, pas sur les causes.** « Le taux d'erreur des requêtes dépasse 2 % » est un symptôme : l'utilisateur le ressent. « L'utilisation processeur dépasse 80 % » est une cause possible, qui peut être parfaitement normale. Alerter sur les causes produit du bruit ; alerter sur les symptômes produit de l'action.

**Une alerte sur laquelle personne n'agit doit être supprimée.** Une alerte qu'on ignore entraîne à ignorer les alertes, y compris la vraie. C'est la fatigue d'alerte, et elle est la cause indirecte de nombreux incidents longs.

Le minimum pour un projet personnel, et c'est déjà beaucoup : une supervision des erreurs — Sentry ou équivalent, gratuit à cette échelle — avec notification, et une surveillance de disponibilité qui appelle une URL toutes les cinq minutes.

Pour que la supervision des erreurs serve, deux réglages : associer chaque erreur à une **version** du code, pour savoir quel déploiement l'a introduite, et téléverser les **cartes de source** afin de lire une trace lisible au lieu de code minifié. Les cartes se téléversent à l'outil de supervision ; elles ne se servent pas publiquement, sinon n'importe qui lit ton code source.

## Éprouver sa supervision

On ne sait pas si une supervision fonctionne tant qu'on ne l'a pas éprouvée. L'exercice est de **casser volontairement** sa production — retirer une variable d'environnement, introduire une erreur sur une collection vide, faire échouer une requête de base — puis de se forcer à diagnostiquer **par les journaux seuls**, sans relire le code.

Trois questions auxquelles la supervision doit répondre sans aide : à quelle fréquence l'erreur survient-elle, sur quelle route et dans quel contexte, et quelle est la donnée qui la déclenche.

Ce qu'on découvre en le faisant est presque toujours le même : un `console.error(e)` sans contexte donne une trace sans savoir **quelle requête, quel utilisateur, quelles données**. C'est l'information manquante qui transforme dix minutes de diagnostic en deux heures.

Et le bug à provoquer en priorité est celui de la **collection vide** : le cas où il n'y a aucun élément, aucun résultat, aucun enregistrement. C'est le bug le plus universel de l'informatique, et il n'apparaît jamais sur un jeu de données de test bien rempli.

## Le post-mortem

Après un incident, une page suffit : ce qui s'est passé, la chronologie, l'impact, la cause, ce qui a permis la détection, et ce qui change.

Deux chiffres méritent d'y figurer. Le **temps de détection** compte autant que le temps de résolution : un incident réparé en dix minutes mais détecté au bout de six heures est un incident de six heures pour les utilisateurs. Et ce qui se corrige après un incident n'est pas seulement le bug : c'est aussi ce qui l'a laissé passer, et ce qui a retardé sa découverte.

**Un post-mortem qui cherche un coupable ne produit aucune amélioration.** La question n'est pas « qui a poussé ce commit » mais « comment une erreur de ce type a-t-elle pu atteindre la production sans être arrêtée ». La réponse est toujours un mécanisme manquant — un test, une revue, une validation — pas une personne.

## Sauvegardes

Une sauvegarde qui n'a jamais été restaurée n'est pas une sauvegarde. La seule vérification qui compte est d'en restaurer une, dans un environnement séparé, et de regarder si les données y sont.

Deux nombres définissent le besoin : combien de données on accepte de perdre — l'intervalle entre deux sauvegardes — et combien de temps on accepte d'être arrêté — le temps de restauration. Les énoncer prend cinq minutes et évite de découvrir après coup que la sauvegarde quotidienne de 3 h du matin signifiait perdre une journée de travail.

Et une sauvegarde stockée au même endroit que la base ne protège que des erreurs humaines, pas de la perte du compte ou de la région.

## Ce qui coûte de l'argent

Sur une plateforme gérée, trois postes font les factures surprises :

**La bande passante**, en particulier les images non optimisées servies des milliers de fois.

**Les invocations de fonctions**, et surtout leur durée. Une route qui attend cinq secondes une API lente est facturée cinq secondes, à chaque appel.

**La base de données**, au stockage et parfois à la requête.

Une boucle infinie côté client qui appelle une API, ou une fonction qui se rappelle elle-même, produit une facture en quelques heures. Le garde-fou est double : une alerte de dépassement configurée dès le premier jour, et un plafond de dépenses là où la plateforme le permet.

## Au clavier

1. Mesure Lighthouse en mode développement puis sur `npm run build && npm start`. Compare les deux scores.
2. Lis le tableau du build et repère ta route la plus lourde. Cherche ce qui pèse dedans.
3. Supprime temporairement tous les scripts tiers et remesure. Note l'écart.
4. Ajoute un identifiant de requête à tes journaux et retrouve toutes les lignes d'un même appel.
5. Casse volontairement ta production et diagnostique par les journaux seuls, sans ouvrir le code. Note ce qui t'a manqué.
6. Restaure une sauvegarde dans une base vide et vérifie que les données y sont.

**Ressources** : les signaux web essentiels — https://web.dev/articles/vitals · le chapitre « Monitoring Distributed Systems » du livre SRE de Google — https://sre.google/sre-book/monitoring-distributed-systems
