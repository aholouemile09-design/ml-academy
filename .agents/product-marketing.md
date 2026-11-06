# Contexte produit — CodeGraft Academy

**Document version:** v1
**Last updated:** 2026-08-21

> **Statut : plateforme personnelle, non commerciale.** CodeGraft Academy est l'outil d'apprentissage
> d'Emile Aholou, pas un produit vendu. Aucune skill marketing ne doit produire de copy de vente,
> d'argumentaire concurrentiel ou de page de prix pour ce projet sans que ce statut change d'abord ici.

## Vue d'ensemble

**One-liner :** L'école en ligne qu'Emile s'est construite pour tenir son plan Machine Learning +
Web Full Stack sur cinq ans, avec un tuteur AI qui connaît la leçon en cours.

**Ce que c'est :** une application Next.js qui réunit au même endroit le curriculum (ML, Web Full
Stack, préparation PMP), les problem sets notés, les projets de portfolio, le calendrier de discipline
2026-2031, le suivi de progression (XP, séries, temps d'étude) et un tuteur conversationnel adossé à
l'API Anthropic. Progression sauvegardée en base (Supabase) derrière un compte, donc accessible depuis
n'importe quel appareil.

**Catégorie :** plateforme d'apprentissage auto-hébergée — un LMS personnel, pas un MOOC.
**Type :** application web, gratuite, compte requis pour sauvegarder la progression.
**Modèle économique :** aucun. Pas de paiement, pas d'offre, pas de plan tarifaire. Le coût
d'exploitation se limite à Vercel (gratuit) et aux appels API du tuteur.
**Déploiement :** `codegraft.vercel.app` — repo `aholouemile09-design/ml-academy`.

## Public

**Utilisateur principal :** Emile lui-même. Toutes les décisions produit se tranchent sur « est-ce que
ça m'aide à tenir le plan ? ».

**Utilisateurs secondaires (tolérés, pas courtisés) :**
- Visiteurs francophones qui tombent sur le site et créent un compte.
- Recruteurs ou clients qui regardent le site comme preuve de compétence.

**Ce pour quoi l'outil est « embauché » :**
- Tenir la constance sur un horizon de cinq ans, là où les MOOC s'abandonnent au bout de trois semaines.
- Garder le curriculum, l'évaluation et le suivi dans un seul endroit qu'Emile contrôle.
- Produire un GitHub crédible : des projets finis, pas des notebooks de cours.

## Problèmes que ça résout

**Problème central :** l'apprentissage autodidacte du ML échoue rarement par manque de ressources —
il échoue par manque de structure, d'évaluation honnête et de continuité sur la durée.

**Pourquoi les alternatives ne suffisaient pas :**
- **Coursera / DeepLearning.AI** — bon contenu, mais progression enfermée chez le fournisseur, rythme
  imposé, et rien qui couvre à la fois ML, Web Full Stack et PMP.
- **OpenClassrooms** — parcours diplômants coûteux, exigence variable selon les cours.
- **YouTube, livres MIT / Stanford** — excellents et gratuits, mais aucun ordre, aucune évaluation,
  aucune trace de ce qui a été réellement compris.
- **Notion / tableur pour le suivi** — le plan vit à un endroit, le travail à un autre ; les deux
  divergent au bout d'un mois.

**Ce que ça coûtait :** des mois de dispersion, et l'impossibilité de répondre honnêtement à
« qu'est-ce que je sais faire, aujourd'hui, sans aide ? ».

**Tension :** la peur d'être « dépassé demain » (c'est littéralement la citation mise en avant sur la
page d'accueil) contre la lassitude des parcours commencés et jamais finis.

## Ce qui rend l'outil différent

- **Un plan daté sur cinq ans**, pas une liste de cours. Le calendrier fait partie du produit.
- **Des problem sets notés sur 100 avec grille de correction**, ancrés dans des cas réels (scoring
  crédit auditable, détection de fraude, prévision de demande, RAG, mise en production).
- **Un tuteur AI qui refuse de faire le travail à la place** — il explique et décortique les erreurs,
  règle posée explicitement dans la copy du site.
- **Trois parcours sous un même toit** : ML & Data Science, Web Full Stack, préparation PMP 2026.
- **Contrôle total** : le contenu, la progression et l'hébergement appartiennent à Emile.

## Langage

**Mots à utiliser :** parcours, module, problem set, projet, plan, constance, série, portfolio,
production, auditable.
**Mots à éviter :** « formation certifiante », « devenez data scientist en X mois », « bootcamp »,
tout vocabulaire de promesse de résultat ou d'employabilité — le site ne vend rien et ne garantit rien.

| Terme | Sens ici |
|-------|----------|
| Parcours | Une des trois filières : ML, Web Full Stack, PMP |
| Module | Unité du parcours, avec leçons + quiz |
| Problem set | Évaluation pratique notée sur 100, avec grille |
| Plan 2026-2031 | Le calendrier de discipline sur cinq ans |
| Tuteur AI | Chat adossé à l'API Anthropic, mode simulé par défaut |
| XP / série | Mécanique de suivi de constance, pas de la gamification décorative |

## Voix

**Registre :** tutoiement, partout, sans exception. Décidé le 2026-08-21 — le hero vouvoyait
(« Maîtrisez le Machine Learning ») pendant que le reste du site tutoyait. À corriger dans `app/page.js`.
**Ton :** direct, exigeant, sans esbroufe. On s'adresse à quelqu'un qui travaille, pas à un prospect.
**Personnalité :** rigoureux, sobre, concret, un peu austère, honnête sur l'effort demandé.
**Règle dure :** aucune promesse de salaire, d'emploi ou de délai. L'outil promet une structure, pas
un résultat.

## Points de preuve — et ce qui n'en est pas

**Volumes réels (vérifiés dans le code) :** 9 modules ML, 6 modules Web, 15 projets de portfolio,
12 problem sets notés, une préparation PMP alignée sur l'ECO 2026, une bibliothèque de ressources
sélectionnées (MIT, Stanford, Hugging Face) avec la raison de chaque recommandation.

**Trois écarts à corriger — le site affirme des choses que le produit ne fait pas encore :**
1. **L'examen blanc PMP chronométré de 180 questions** est annoncé sur la page d'accueil mais n'existe
   pas (déjà relevé dans `JOURNAL-TRAVAIL.md`).
2. **Le README est périmé** : il annonce 6 modules et 23 leçons, et décrit une progression en
   `localStorage` alors que le compte Supabase existe désormais.
3. **La troisième citation du hero** est attribuée à « CodeGraft Academy » et présentée au même rang
   que celles d'Andrew Ng et de Peter Sondergaard. Une marque qui se cite elle-même à côté de deux
   autorités réelles, ça se lit comme un faux témoignage. À retirer ou à assumer comme une devise.

**Témoignages :** aucun, et c'est cohérent — il n'y a pas d'utilisateurs à citer.

## Objectifs

**Objectif principal :** la constance. Le succès se mesure en jours travaillés d'affilée et en modules
réellement terminés, pas en visiteurs.
**Action visée :** reprendre la leçon du jour — pas « créer un compte ». L'inscription n'est qu'un
moyen de ne pas perdre la progression.
**Objectif secondaire :** que le site tienne comme vitrine si un recruteur ou un client le regarde.
**Métriques actuelles :** aucune. Pas d'analytics installé (limite déjà notée dans le journal de travail).

## Sections volontairement omises

Personas d'achat, objections commerciales, dynamique de changement (JTBD Four Forces), tarification :
sans objet pour une plateforme personnelle non commerciale. Ce n'est pas un oubli. À rouvrir si le
statut en tête de document change.

## Changelog
*Le plus récent en premier. Une ligne par révision : ce qui a changé, et pourquoi.*
- v1 (2026-08-21) — Contexte initial, rédigé depuis le code. Statut arrêté avec Emile : plateforme
  personnelle non commerciale (donc pas de sections de vente) ; tutoiement retenu comme registre unique.
