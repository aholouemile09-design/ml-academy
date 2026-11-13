Un projet échoue rarement parce que l'équipe a mal travaillé. Il échoue parce que personne ne s'était mis d'accord sur ce qu'il fallait produire.

La construction d'un WBS sur trois niveaux — avec le test qui le distingue d'un planning et la règle des 100 % — est l'objet de l'exercice d'application de cette leçon, et le cas situationnel travaille le diagnostic d'une dérive de périmètre.

Cette page traite ce qui vient avant le WBS et après lui : comment on **obtient** des exigences, comment on les garde traçables, et la confusion entre deux processus de contrôle qui coûte des points à chaque examen.

## Recueillir des exigences : les techniques et ce qu'elles donnent

Il n'existe pas de technique universelle. Chacune révèle un type d'information différent, et la combinaison vaut mieux qu'une seule bien faite.

| Technique | Ce qu'elle donne | Sa limite |
| --- | --- | --- |
| **Entretiens individuels** | De la profondeur, les non-dits, les enjeux politiques | Lent, et biaisé par l'interlocuteur |
| **Ateliers facilités** | Un accord construit en direct entre parties prenantes | Le plus influent parle le plus |
| **Questionnaires** | Du volume, des données comparables | Pauvre : on n'obtient que ce qu'on a pensé à demander |
| **Observation** | Ce que les gens **font** vraiment | Coûteux, et modifie ce qu'on observe |
| **Prototypes et maquettes** | Des retours concrets sur quelque chose de visible | Fait discuter l'apparence avant le fond |
| **Analyse de documents** | L'existant, les règles, les contraintes | Les documents décrivent souvent un processus périmé |
| **Groupes de discussion** | Les réactions, les désaccords entre utilisateurs | Effet de groupe |
| **Techniques de créativité** | Des idées, des options qu'on n'avait pas | Produit du volume, pas des priorités |

Deux enseignements pratiques.

**L'observation révèle ce que l'entretien cache.** Les gens décrivent le processus officiel, pas celui qu'ils appliquent. L'écart entre les deux est systématique, et c'est souvent là que se trouve la vraie exigence.

**Le prototype est la technique la plus efficace quand le besoin est flou.** Devant une maquette, un utilisateur dit en trente secondes ce que trois entretiens n'auraient pas fait sortir — parce que critiquer est plus facile qu'imaginer.

## Les exigences ne sont pas d'un seul type

Les confondre fait produire des spécifications incomplètes, et l'examen distingue les catégories.

**Les exigences métier** disent pourquoi l'organisation fait le projet. Elles sont de haut niveau.

**Les exigences des parties prenantes** disent ce que chacune attend.

**Les exigences de solution** se divisent en deux, et c'est la distinction la plus utile : les **fonctionnelles** disent ce que le produit doit faire ; les **non fonctionnelles** disent dans quelles conditions — performance, sécurité, disponibilité, accessibilité, volumétrie, conformité.

**Les exigences de transition** disent ce qu'il faut pour passer de l'ancien état au nouveau : migration de données, formation, bascule, double fonctionnement.

**Les exigences de projet** et de **qualité** portent sur la façon de conduire le travail et sur les critères d'acceptation.

Les deux catégories qu'on oublie et qui coûtent le plus cher sont les **non fonctionnelles** — un système conforme mais trop lent est inutilisable — et les **exigences de transition**, découvertes la semaine de la mise en production.

Et un critère de qualité applicable à toute exigence : elle doit être **vérifiable**. « Le système doit être rapide » n'est pas une exigence, c'est un souhait. « Toute page doit s'afficher en moins de deux secondes pour 95 % des requêtes » en est une.

## La matrice de traçabilité

Elle relie chaque exigence à son origine et à sa destination. Son intérêt n'est pas documentaire, il est décisionnel.

```text
exigence <-- origine        quelle partie prenante, quel document
         --> livrable       quel element du WBS la realise
         --> test           comment on verifie qu'elle est satisfaite
         --> objectif       a quel objectif metier elle contribue
```

Trois usages concrets.

**Elle détecte les exigences orphelines.** Une exigence qui ne se rattache à aucun objectif métier est une candidate à la suppression — et c'est souvent une demande personnelle déguisée.

**Elle détecte le travail injustifié.** Un élément du WBS qui ne réalise aucune exigence est du *gold plating*, et il consomme du budget pour rien.

**Elle rend l'analyse d'impact d'un changement possible.** Sans traçabilité, l'impact d'une modification d'exigence s'estime à la louche. Avec, on sait quels livrables et quels tests sont touchés.

## L'énoncé du périmètre, et la ligne qu'on oublie

Il contient la description du périmètre, les livrables, les critères d'acceptation, les contraintes et les hypothèses. Et un élément que presque personne n'écrit : les **exclusions**.

Écrire explicitement ce qui n'est **pas** dans le projet est le dispositif anti-dérive le plus efficace qui existe, et il ne coûte qu'un paragraphe. « La reprise de l'historique antérieur à 2020 n'est pas dans le périmètre. » « La formation des utilisateurs finaux relève de la direction métier. » Ces phrases évitent des mois de malentendu.

La règle pratique : **tout ce qu'une partie prenante pourrait raisonnablement supposer inclus et qui ne l'est pas doit figurer dans les exclusions.**

## Élaboration progressive et planification par vagues

Un périmètre ne se définit pas entièrement au premier jour, même en prédictif, et le référentiel le dit explicitement.

**L'élaboration progressive** est le principe : le niveau de détail augmente à mesure que l'information devient disponible.

**La planification par vagues** en est l'application : on détaille finement le travail proche et grossièrement le travail lointain, puis on détaille la vague suivante à l'approche.

Dans le WBS, cela se matérialise par des **lots de planification** — des branches identifiées mais pas encore décomposées en lots de travail. Ce n'est pas un défaut de planification : c'est la reconnaissance qu'un détail produit trop tôt sera faux.

À retenir pour l'examen : **une planification détaillée à vingt-quatre mois n'est pas de la rigueur**, c'est une illusion coûteuse qu'il faudra entretenir.

## Valider le périmètre et contrôler la qualité

La confusion la plus fréquente du module, et elle est simple à lever.

| | **Contrôler la qualité** | **Valider le périmètre** |
| --- | --- | --- |
| La question posée | Le livrable est-il **conforme aux exigences** ? | Le client **l'accepte-t-il** ? |
| Qui le fait | L'équipe projet, la qualité | Le **client** ou le sponsor |
| Quand | Avant la présentation au client | Après le contrôle qualité |
| Ce qui en sort | Des livrables **vérifiés** | Des livrables **acceptés**, formellement |

L'ordre est obligatoire : **on contrôle, puis on fait valider.** Présenter au client un livrable qui n'a pas passé le contrôle qualité est une faute de méthode, et c'est un distracteur classique.

Et le point de vocabulaire qui va avec : **vérification** et **validation**. Vérifier, c'est s'assurer qu'on a construit le produit **conformément à la spécification**. Valider, c'est s'assurer qu'on a construit **le bon produit**. Un livrable peut être parfaitement vérifié et invalide — conforme à une spécification qui ne répondait pas au besoin.

## Dérive de périmètre et sur-qualité

Deux fautes distinctes, souvent confondues.

**La dérive de périmètre** est l'ajout progressif de travail non contrôlé. Personne ne décide, et le périmètre grossit par accumulation de petites demandes acceptées au fil de l'eau. Le symptôme est toujours le même : le budget consommé dépasse l'avancement, et personne ne sait quand le périmètre a changé.

**La sur-qualité** est le fait d'en faire plus que demandé, par conscience professionnelle. L'équipe ajoute une fonctionnalité, un raffinement, une option que personne n'a demandée. C'est tout aussi fautif : cela consomme du budget, ajoute du risque, et crée une exigence implicite qu'il faudra maintenir.

La correction est la même dans les deux cas : **tout ce qui modifie le périmètre passe par la maîtrise des changements**, y compris ce qui paraît gratuit. Un ajout « qui ne coûte rien » coûte toujours quelque chose, ne serait-ce que la maintenance.

## Le périmètre en agile

Il n'est pas absent, il est géré autrement.

**Le backlog remplace la référence de périmètre figée.** Il est ordonné par valeur, et le **Product Owner** en décide le contenu et la priorité.

**Les exigences prennent la forme de récits utilisateur** avec leurs **critères d'acceptation** — la condition de satisfaction de ce récit précis.

**La définition de « terminé »** est transverse : ce qui s'applique à tout élément pour être considéré comme fini — testé, documenté, revu, déployable. Elle se distingue des critères d'acceptation, qui sont propres à chaque élément.

Et le point qui dérange les habitudes prédictives : en agile, **changer le périmètre n'est pas un incident**. Le périmètre total est variable, et c'est le délai et le coût qui sont fixés. Une question qui décrit un ajout en contexte agile n'attend donc pas une demande de changement formelle mais une repriorisation du backlog par le Product Owner.

## Au clavier

1. Prends les exigences de ton projet et classe-les dans les catégories. Compte les non fonctionnelles et les exigences de transition : s'il y en a peu, elles manquent.
2. Prends trois exigences et réécris-les pour qu'elles soient vérifiables, avec un seuil mesurable.
3. Écris les exclusions de ton périmètre. Vise cinq lignes que quelqu'un pourrait raisonnablement supposer incluses.
4. Vérifie que chaque élément de ton WBS réalise au moins une exigence. Les orphelins sont du travail injustifié.
5. Reprends le dernier livrable que le client a refusé. Avait-il passé le contrôle qualité avant d'être présenté ?

**Ressource** : PMI Study Hall, domaine Process — https://studyhall.pmi.org/login
