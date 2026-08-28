// ─────────────────────────────────────────────────────────────────────────────
//  Exercices du parcours PMP 2026
// ─────────────────────────────────────────────────────────────────────────────
//
//  Greffé sur PMP_CURRICULUM au chargement (voir lib/pmp.js).
//  Même structure que lib/exercises.js et lib/exercises-web.js :
//
//    lessons      { [lessonId]: [exerciceA, exerciceB] }
//    finalExercise  l'exercice global qui rassemble tout le module
//    quizExtra      questions ajoutées au quiz de base
//
//  ⚠️ Le type du second exercice change ici. Sur les parcours techniques, c'est
//  kind "blanche" — page blanche, on écrit du code. Le PMP n'a rien à coder :
//  on utilise kind "situation", un cas à analyser sans grille fournie, où il
//  faut décider ET justifier. C'est l'entraînement direct aux questions
//  situationnelles, qui font la majorité de l'examen.
//
//  Rédaction : les corrections doivent expliquer POURQUOI la bonne réponse est
//  la « PMI way », et pourquoi les autres options sont plausibles mais fausses.
//  Un candidat qui ne comprend pas le piège le refera.
//
//  Référentiel : ECO 2026 (People 33 % / Process 41 % / Business 26 %),
//  examen du 9 juillet 2026 — 180 questions, 240 minutes, 60 % agile-hybride.
//
//  ⚠️ Les valeurs entre backticks sont des littéraux de gabarit JS : tout
//  backtick de code inline à l'intérieur doit être échappé. Lancer
//  `node scripts/verifier-exercices.js` après chaque ajout.
// ─────────────────────────────────────────────────────────────────────────────

export const PMP_EXERCISES = {
  // ══ FONDAMENTAUX & EXAMEN PMP 2026 ════════════════════════════════════════
  fondamentaux: {
    lessons: {
      "pmp-found-1": [
        {
          id: "pmp-found-1-a",
          kind: "application",
          title: "Ce que le PMP valide, et ce qu'il ne valide pas",
          statement: `Pour chacune de ces six affirmations, réponds **vrai ou faux**, et justifie en une phrase.

1. Le PMP s'adresse à quelqu'un qui découvre la gestion de projet.
2. La majorité des questions portent sur la restitution de définitions et de processus.
3. Le PMP couvre le prédictif, l'agile et l'hybride.
4. Une bonne mémoire des 49 processus du PMBOK 6 suffit à réussir.
5. Le PMP est reconnu à l'international, quel que soit le secteur.
6. Réussir le PMP prouve qu'on sait diriger des projets.

Puis, en trois lignes : à qui recommanderais-tu **de ne pas** passer le PMP maintenant, et pourquoi ?`,
          hint: `Reviens à la condition d'éligibilité : il faut déjà 36 ou 60 mois d'expérience à diriger des projets. Qu'est-ce que cette exigence dit sur ce que la certification cherche à valider ?`,
          solution: `**1. FAUX.** L'éligibilité exige 36 mois d'expérience (avec un diplôme de niveau licence) ou 60 mois (sans). Ce n'est pas une formation d'entrée : c'est la validation d'une expérience déjà acquise.

**2. FAUX.** La majorité des questions sont des **mises en situation** : « que fais-tu en premier ? ». Plusieurs réponses semblent correctes ; une seule correspond au raisonnement attendu.

**3. VRAI.** Et depuis l'ECO 2026, environ **60 %** des questions relèvent de l'agile ou de l'hybride, contre 40 % de prédictif. Préparer uniquement le prédictif est aujourd'hui une erreur de stratégie.

**4. FAUX.** C'est l'erreur de préparation la plus coûteuse. Le PMBOK 8 est d'ailleurs organisé autour de **6 principes et 7 domaines de performance**, pas d'une liste de processus à réciter. Un candidat qui connaît les 49 processus par cœur mais ne raisonne pas « à la PMI » échoue.

**5. VRAI.** C'est justement sa valeur principale : un langage commun compris par les employeurs de tous secteurs et de tous pays.

**6. VRAI, mais avec une nuance importante.** Il prouve que tu sais **raisonner** comme un chef de projet selon le référentiel PMI. Ce n'est pas exactement la même chose que bien diriger une équipe dans la vraie vie — mais c'est ce que l'examen mesure, et c'est ce que le marché reconnaît.

---

**À qui déconseiller le PMP maintenant** : à quelqu'un qui n'a pas encore l'expérience réelle exigée. Non pas seulement parce que la candidature sera rejetée ou échouera à l'audit, mais parce que les questions situationnelles supposent d'**avoir déjà vécu** ces situations. Sans ce vécu, chaque scénario devient un exercice de devinette.

Pour ce profil, le **CAPM** est la porte d'entrée — et il dispense en prime des 35 heures de formation lors du passage ultérieur au PMP.`,
        },
        {
          id: "pmp-found-1-b",
          kind: "situation",
          title: "Le collègue qui veut le PMP en trois semaines",
          statement: `**Cas situationnel.** Aucune grille fournie.

Un collègue t'annonce : « Je passe le PMP dans trois semaines. J'ai téléchargé un PDF des 49 processus du PMBOK 6 et les tableaux d'entrées-sorties, je vais tout apprendre par cœur. J'ai six ans d'expérience, ça devrait passer. »

Rédige ta réponse, structurée en trois parties :
1. **ce qui est juste** dans son raisonnement — il y a quelque chose
2. **ce qui va le faire échouer**, avec au moins trois raisons distinctes et précises
3. **ce que tu lui conseilles concrètement** de faire de ses trois semaines s'il maintient sa date

Puis réponds à cette question : s'il te dit « mais mon voisin a fait comme ça et il a réussi », que réponds-tu ?

**Ne te contente pas de dire « c'est une mauvaise idée ».** Un argument qui ne dit pas *pourquoi* ne convainc personne.`,
          hint: `Trois angles à distinguer : le **référentiel** sur lequel il travaille est-il le bon ? Le **type de questions** correspond-il à sa méthode ? Et la **répartition** de l'examen 2026 correspond-elle à ce qu'il révise ?`,
          solution: `**1. Ce qui est juste**

Ses six ans d'expérience sont un **vrai atout**, et probablement le facteur le plus déterminant. Les questions situationnelles supposent d'avoir vécu ces situations ; un candidat expérimenté reconnaît intuitivement les scénarios. Trois semaines pour quelqu'un d'expérimenté n'est pas absurde en soi — c'est sa **méthode** qui l'est.

**2. Ce qui va le faire échouer — quatre raisons**

**a) Il travaille sur le mauvais référentiel.** Le PMBOK 6 et ses 49 processus datent de l'examen d'avant 2021. L'examen actuel s'appuie sur l'**ECO 2026** et le **PMBOK 8**, organisé autour de 6 principes et 7 domaines de performance. Il révise un livre que l'examen ne suit plus.

**b) Il révise la mauvaise proportion.** Les tableaux entrées-sorties du PMBOK 6 sont massivement prédictifs. Or **60 % de l'examen 2026 porte sur l'agile et l'hybride**. Il consacre l'essentiel de son temps à 40 % de l'épreuve.

**c) Il révise le mauvais type de contenu.** L'examen ne demande presque jamais « quelles sont les entrées du processus X ». Il demande « le sponsor exige une fonctionnalité en plein sprint, que fais-tu en premier ? ». Le par-cœur ne produit aucune réponse à ce type de question.

**d) Il ignore le domaine qui a le plus changé.** Business Environment est passé de 8 % à **26 %** — plus du quart de l'examen. Ce domaine est presque absent des tableaux de processus qu'il a téléchargés.

**3. Ce que je lui conseille, s'il maintient sa date**

**Semaine 1** : lire l'**ECO 2026** en entier, tâche par tâche — c'est gratuit, ça fait une quarantaine de pages, et c'est littéralement le plan de l'examen. Puis faire un test diagnostique de 60 questions pour repérer ses faiblesses réelles.

**Semaine 2** : travailler le **mindset PMI** et les approches agiles/hybrides, qui sont ses deux angles morts. Faire 40 à 60 questions situationnelles par jour, et **analyser chaque erreur par écrit** — pourquoi sa réponse était plausible mais fausse.

**Semaine 3** : deux examens blancs complets chronométrés, révision ciblée sur les faiblesses mesurées, et repos la veille.

**Et lui dire clairement** : s'il n'atteint pas ~70 % de façon stable en simulation, il vaut mieux décaler. Un report coûte des frais ; un échec coûte les frais **plus** la démotivation.

**4. « Mon voisin a fait comme ça et il a réussi »**

Deux réponses. D'abord, la question du **quand** : s'il l'a passé avant 2021, ce n'était pas le même examen ; avant juillet 2026, ce n'était pas la même pondération. Ensuite, le **biais du survivant** : on entend les récits de ceux qui ont réussi, jamais ceux des 30 à 40 % qui échouent au premier passage.

Un cas isolé ne dit rien du taux de réussite d'une méthode. C'est exactement le raisonnement qu'on attend d'un chef de projet face à une décision : chercher la donnée, pas l'anecdote.`,
        },
      ],
      "pmp-found-2": [
        {
          id: "pmp-found-2-a",
          kind: "application",
          title: "Monter ton dossier de candidature",
          statement: `Prépare pour de vrai les éléments de ta candidature :

1. détermine ta **voie d'éligibilité** — diplôme de niveau licence ou secondaire — et le nombre de mois exigé
2. liste tes projets des 10 dernières années où tu as **dirigé** — pas seulement participé — avec leurs dates de début et de fin
3. calcule ton total de mois, **sans compter deux fois** les périodes qui se chevauchent
4. rédige la description d'**un** projet au format attendu par le PMI : contexte, ton rôle, ce que tu as fait, résultat obtenu
5. vérifie où en sont tes **35 heures de formation** et comment tu les justifies

Contrainte sur le point 4 : entre 200 et 500 caractères, à la première personne, avec des verbes d'action et un résultat mesurable.`,
          hint: `Le PMI compte les mois **calendaires** pendant lesquels tu dirigeais un projet, pas la somme des charges de travail. Deux projets menés en parallèle du même mois comptent pour un seul mois. C'est l'erreur de calcul la plus fréquente.`,
          solution: `**1. Les deux voies**

| Diplôme | Expérience à diriger des projets | Formation |
|---|---|---|
| Licence / bac+4 ou équivalent | **36 mois** | 35 heures |
| Secondaire / associate degree | **60 mois** | 35 heures |

Les titulaires du **CAPM** sont dispensés des 35 heures.

**3. Le calcul, avec le piège du chevauchement**

\`\`\`
Projet A : janv. 2022 → août 2022     (8 mois)
Projet B : juin 2022  → mars 2023     (10 mois)
Projet C : sept. 2023 → juin 2024     (10 mois)

❌ Faux  : 8 + 10 + 10 = 28 mois
✅ Juste : janv. 2022 → mars 2023 = 15 mois (A et B se chevauchent
           de juin à août : ces 3 mois ne comptent qu'une fois)
           + sept. 2023 → juin 2024 = 10 mois
           = 25 mois
\`\`\`

Le PMI compte les **mois calendaires** de direction de projet. Additionner les durées de projets menés en parallèle gonfle artificiellement le total — et c'est exactement ce qu'un audit vérifie.

**4. Une description au bon format**

> En tant que chef de projet, j'ai dirigé la migration du système de facturation de 12 000 clients vers une nouvelle plateforme. J'ai cadré le périmètre avec les directions Finance et IT, construit l'échéancier et le budget de 340 k€, animé une équipe de 7 personnes en approche hybride, et piloté le registre des risques en comité hebdomadaire. J'ai géré 4 demandes de changement via le processus de maîtrise des modifications. Le projet a été livré avec 3 semaines d'avance et 6 % sous budget, sans interruption de service.

**Ce qui fait qu'elle tient en audit** :
- **« J'ai »**, jamais « nous avons » — le PMI veut savoir ce que **tu** as fait
- des **verbes de direction** : cadré, construit, animé, piloté, géré
- des **chiffres** : 12 000 clients, 340 k€, 7 personnes, 4 demandes de changement
- un **résultat mesurable** : 3 semaines d'avance, 6 % sous budget
- du **vocabulaire PMI** : périmètre, échéancier, registre des risques, maîtrise des modifications

**Ce qui la ferait rejeter** : « J'ai participé à un projet de migration où j'ai aidé l'équipe. » Aucun rôle de direction, aucun chiffre, aucun résultat.

**5. Les 35 heures**

Elles doivent provenir d'une formation en gestion de projet, avec une **attestation nominative** mentionnant le nombre d'heures. Un cours en ligne reconnu, une formation d'employeur ou un organisme agréé conviennent. Garde le certificat : c'est la première pièce demandée en cas d'audit.

⚠️ **Vérifie les chiffres actuels sur pmi.org avant de déposer.** Les conditions d'éligibilité et les tarifs évoluent, et un cours — celui-ci compris — peut être en retard sur la source officielle.`,
        },
        {
          id: "pmp-found-2-b",
          kind: "situation",
          title: "Ta candidature est sélectionnée pour un audit",
          statement: `**Cas situationnel.**

Tu reçois un message du PMI : ta candidature est **sélectionnée pour un audit**. Tu dois fournir des justificatifs sous 90 jours.

Trois complications :
- l'un de tes trois projets a été mené chez un employeur que tu as quitté il y a 4 ans, et ton responsable de l'époque a changé d'entreprise
- pour un autre projet, tu avais arrondi la durée de 9 à 12 mois « parce que ça se jouait à peu près là »
- ton attestation des 35 heures est un e-mail de confirmation, sans mention du nombre d'heures

Écris ton plan d'action :
1. l'ordre dans lequel tu traites les trois problèmes, et pourquoi cet ordre
2. ce que tu fais **précisément** pour chacun
3. la décision la plus importante à prendre, et la seule réponse acceptable

**Le point 3 concerne le deuxième problème.** Prends le temps d'y réfléchir avant de répondre.`,
          hint: `L'un des trois problèmes n'est pas une difficulté administrative mais une question d'éthique. Le Code de conduite professionnelle du PMI a une valeur — l'honnêteté — qui s'applique directement, et les conséquences d'un mauvais choix ici sont bien plus lourdes qu'un refus de candidature.`,
          solution: `**1. L'ordre de traitement, et pourquoi**

**D'abord le projet à la durée gonflée** — parce que c'est le seul qui engage ton intégrité, et parce que la corriger change tout le reste du dossier (le total de mois, peut-être l'éligibilité elle-même). Traiter l'administratif avant serait travailler sur un dossier faux.

**Ensuite le contact perdu** — c'est le plus long à résoudre, il faut lancer les recherches tôt dans les 90 jours.

**Enfin l'attestation** — le plus simple, une demande à l'organisme suffit généralement.

**2. Le traitement de chacun**

**a) Le contact injoignable.** L'auditeur demande la signature d'un supérieur **ou d'un collègue** ayant connaissance du projet — ce n'est pas forcément ton ancien manager. Dans l'ordre : retrouver l'ancien responsable sur LinkedIn (il peut signer depuis sa nouvelle entreprise, ce qui est accepté) ; à défaut, un collègue senior de l'époque ; à défaut, le service RH de l'ancien employeur pour une attestation d'emploi et de fonctions. Et **commencer tout de suite** : ces démarches prennent des semaines.

**b) L'attestation des 35 heures.** Recontacter l'organisme et demander un certificat nominatif mentionnant explicitement le nombre d'heures et l'intitulé. La plupart le délivrent sur simple demande. Si l'organisme n'existe plus, il faut suivre une formation reconnue — c'est le scénario coûteux, d'où l'intérêt de s'en occuper sans attendre.

**c) Le projet à 12 mois annoncés au lieu de 9.**

**3. La décision, et la seule réponse acceptable**

**Corriger la durée. Ramener le projet à ses 9 mois réels, recalculer le total, et déposer un dossier exact.**

Il n'y a pas de zone grise. La valeur **Honnêteté** du Code d'éthique du PMI dit : dire la vérité, communiquer une information exacte. La valeur **Responsabilité** ajoute : signaler ses propres erreurs. Ce sont exactement les principes que l'examen teste — les appliquer à sa propre candidature n'est pas négociable.

**Et le calcul de risque va dans le même sens.** Un dossier corrigé qui repasse sous le seuil d'éligibilité coûte un report de quelques mois. Une falsification découverte entraîne le **rejet de la candidature, l'interdiction de se représenter pendant plusieurs années, et la révocation de toute certification PMI existante**. Le PMI publie les sanctions disciplinaires.

Si la correction fait passer sous les 36 mois : on complète avec un projet oublié, ou on attend d'avoir les mois manquants. Ce n'est pas agréable, c'est simplement la seule option.

---

**Ce que cet exercice entraîne dépasse la candidature.** À l'examen, une famille entière de questions te met dans cette position : « ton sponsor te demande d'antidater un rapport », « un fournisseur t'offre un cadeau », « tu découvres une erreur dans un chiffre déjà communiqué ». La réponse attendue est toujours la même famille : **divulguer, corriger, refuser** — même quand c'est coûteux, même sous pression hiérarchique.

Le PMI ne teste pas si tu connais le Code d'éthique. Il teste si tu l'appliques quand ça coûte quelque chose.`,
        },
      ],
      "pmp-found-3": [
        {
          id: "pmp-found-3-a",
          kind: "application",
          title: "Calculer ta stratégie de temps",
          statement: `L'examen fait **180 questions en 240 minutes**, avec **2 pauses optionnelles de 10 minutes** qui suspendent le chronomètre.

Calcule et écris ta stratégie :
1. le temps moyen disponible par question
2. les **jalons de contrôle** : à quel moment devrais-tu avoir traité 45, 90 et 135 questions ?
3. où tu places tes deux pauses, et pourquoi là
4. ta règle pour une question qui bloque : combien de temps maximum avant de marquer et passer ?
5. le temps que tu réserves à la fin, et pour quoi faire

Puis : combien de questions peux-tu te permettre de traiter à 3 minutes sans mettre le reste en danger ?`,
          hint: `240 minutes pour 180 questions. Attention : les pauses suspendent le chrono, elles ne consomment donc pas ton temps de réponse — mais elles ne t'en donnent pas non plus. Et il faut réserver du temps à la fin, pas seulement diviser.`,
          solution: `**1. Le temps par question**

\`\`\`
240 min / 180 questions = 1 min 20 par question
\`\`\`

Mais on ne joue pas à la moyenne exacte. En réservant **15 minutes de marge finale** :

\`\`\`
225 min / 180 = 1 min 15 par question
\`\`\`

**2. Les jalons de contrôle**

À 1 min 15 par question, en réservant la marge :

| Après | Temps écoulé maximal | Temps restant |
|---|---|---|
| 45 questions | 56 min | 184 min |
| 90 questions | 113 min | 127 min |
| 135 questions | 169 min | 71 min |
| 180 questions | 225 min | 15 min |

**Retiens un repère simple plutôt que ce tableau** : *à la moitié du temps, tu dois avoir dépassé la moitié des questions.* À 120 minutes écoulées, tu veux être au-delà de la question 90.

**3. Où placer les pauses**

Après les questions **60** et **120** — l'examen les propose à peu près à ces endroits. Les prendre systématiquement, même sans fatigue ressentie : elles ne coûtent rien puisque le chrono est suspendu, et la baisse de vigilance après 90 minutes de concentration est réelle et mesurable.

⚠️ **Une pause est irréversible** : une fois la section validée, on ne peut plus revenir sur les questions précédentes. Il faut donc avoir traité — ou marqué — toutes les questions de la section avant de partir en pause.

**4. La règle de blocage**

**90 secondes maximum**, puis marquer la question et passer. Sans exception.

La raison est arithmétique : trois minutes sur une question difficile, c'est deux questions faciles perdues plus loin. Et l'expérience montre qu'une réponse trouvée en s'acharnant est rarement meilleure qu'une réponse revue à tête reposée.

**5. Les 15 minutes finales**

Pour les questions marquées, uniquement. On y revient avec l'esprit plus clair, et surtout : après 170 questions, on a parfois croisé un énoncé qui éclaire une question précédente.

**Et on ne laisse jamais une question vide.** Il n'y a pas de points négatifs : une réponse au hasard vaut 25 % d'espérance, une case vide vaut 0.

**Combien de questions à 3 minutes ?**

Si la moyenne visée est 1 min 15 et qu'une question longue en prend 3, elle coûte 1 min 45 de dépassement. Avec 15 minutes de marge, cela laisse environ **8 questions longues** — ce qui correspond à peu près à un ou deux *case sets* de 2026, justement plus longs à traiter.

C'est peu. D'où la règle des 90 secondes : elle n'est pas de la rigidité, c'est ce qui rend le budget tenable.`,
        },
        {
          id: "pmp-found-3-b",
          kind: "situation",
          title: "Mi-parcours, et tu es en retard",
          statement: `**Cas situationnel.** Décision sous pression.

Tu es en plein examen. Le compteur affiche **140 minutes écoulées** et tu viens de valider la **question 95**. Il te reste 100 minutes pour 85 questions.

Tu as marqué 11 questions pour y revenir. Tu sens que tu ralentis. La question 96 est un *case set* : trois paragraphes de contexte suivis de 4 questions liées.

1. calcule ta situation exacte — es-tu en retard, et de combien ?
2. quel rythme te faut-il maintenant pour finir ?
3. que fais-tu des 11 questions marquées ?
4. comment abordes-tu ce *case set* précisément ?
5. quelles sont les deux erreurs à ne surtout pas commettre dans cette situation ?

Puis, avec du recul : qu'est-ce qui aurait dû t'alerter avant d'arriver là ?

**Le point 5 est le plus important.** Sous pression, on prend spontanément les deux mauvaises décisions.`,
          hint: `Commence par le calcul froid, avant toute décision. Le rythme requis change complètement la nature du problème — et il est peut-être moins catastrophique que ce que la sensation de retard suggère.`,
          solution: `**1. La situation exacte**

\`\`\`
Rythme tenu   : 140 min / 95 questions = 1 min 28 par question
Rythme prévu  : 1 min 15
Retard        : environ 13 secondes par question, soit ~20 minutes cumulées
\`\`\`

Tu es en retard, mais **modérément**. La sensation de panique est disproportionnée par rapport au chiffre — et c'est déjà une information utile.

**2. Le rythme requis**

\`\`\`
100 min / 85 questions = 1 min 10 par question
\`\`\`

Il faut gagner **18 secondes par question**. C'est serré mais **tout à fait faisable** : cela revient à être un peu plus décidé, pas à bâcler. Il n'y a pas de raison de paniquer, et surtout pas de changer radicalement de méthode.

**3. Les 11 questions marquées**

**Tu les abandonnes comme objectif.** Elles ne sont plus une priorité : chaque question non traitée vaut zéro à coup sûr, une question marquée a déjà une réponse enregistrée.

Vérifie simplement qu'elles ont **toutes une réponse** — même approximative. S'il te reste du temps à la fin, tu y reviendras ; sinon, tu auras au moins 25 % d'espérance sur chacune plutôt que zéro.

**4. Le *case set***

C'est justement là qu'on gagne du temps, si on l'aborde correctement.

**Lis le scénario une seule fois, attentivement**, puis réponds aux 4 questions sans y revenir en boucle. L'erreur coûteuse est de relire les trois paragraphes avant chaque question : le contexte est lu quatre fois au lieu d'une.

Un *case set* de 4 questions a un budget de 4 × 1 min 10 ≈ **4 min 40** au total, lecture comprise. C'est confortable si la lecture est faite une fois.

**5. Les deux erreurs à ne pas commettre**

**a) Accélérer brutalement en lisant en diagonale.** C'est le réflexe naturel, et c'est le pire. Les questions PMP se jouent sur un mot — « en premier », « la MEILLEURE action », « le prochain », « agile » ou « prédictif ». Une lecture rapide fait rater ce mot et transforme un retard gérable en série d'erreurs. **Le rythme se gagne en décidant plus vite, pas en lisant moins.**

**b) Sauter la deuxième pause pour rattraper.** Le chronomètre est **suspendu** pendant les pauses : elles ne coûtent littéralement rien en temps de réponse. Y renoncer ne fait gagner aucune minute et te prive de la seule chose qui améliore ta vitesse de décision sur les 60 dernières questions — un cerveau reposé.

C'est un piège classique parce que le réflexe intuitif est faux : la pause *semble* coûter du temps.

**Avec du recul : qu'est-ce qui aurait dû t'alerter ?**

Le jalon des 45 questions. À 1 min 28 par question, il était déjà atteint à **66 minutes** au lieu de 56 — un retard de 10 minutes visible dès le premier quart.

**C'est pour ça qu'on pose des jalons de contrôle avant l'examen** : corriger un dérapage de 13 secondes par question à la question 45 est indolore ; à la question 95, c'est déjà une gestion de crise.

C'est exactement le principe du suivi de projet : détecter tôt un écart de performance coûte infiniment moins cher que de le rattraper tard. Tu appliqueras la même logique à l'EVM au module Process.`,
        },
      ],
      "pmp-found-4": [
        {
          id: "pmp-found-4-a",
          kind: "application",
          title: "Classer par domaine et pondérer sa révision",
          statement: `Classe chacun de ces dix sujets dans son domaine ECO — **People**, **Process** ou **Business Environment** :

1. gérer un conflit entre deux développeurs
2. calculer l'indice de performance des coûts (CPI)
3. vérifier la conformité au RGPD d'une fonctionnalité
4. animer une rétrospective de sprint
5. construire une structure de découpage du projet (WBS)
6. évaluer si le projet crée encore de la valeur pour l'organisation
7. coacher un membre d'équipe en difficulté
8. planifier les réponses aux risques identifiés
9. adapter le projet à un changement de réglementation
10. définir les règles de fonctionnement de l'équipe (*team charter*)

Puis, avec les pondérations 2026, calcule combien d'**heures** tu consacres à chaque domaine sur un budget total de 120 heures de révision.`,
          hint: `Le critère de classement : **People** concerne les personnes et l'équipe, **Process** les aspects techniques du pilotage, **Business Environment** le lien entre le projet et son environnement — stratégie, conformité, valeur pour l'organisation.`,
          solution: `**Le classement**

| # | Sujet | Domaine |
|---|---|---|
| 1 | Conflit entre développeurs | **People** |
| 2 | Calcul du CPI | **Process** |
| 3 | Conformité RGPD | **Business** |
| 4 | Rétrospective de sprint | **People** |
| 5 | Construction du WBS | **Process** |
| 6 | Le projet crée-t-il encore de la valeur | **Business** |
| 7 | Coacher un membre d'équipe | **People** |
| 8 | Réponses aux risques | **Process** |
| 9 | Changement de réglementation | **Business** |
| 10 | Team charter | **People** |

**La rétrospective (n° 4) mérite un mot** : on la classerait spontanément en Process parce que c'est une cérémonie agile. Mais l'ECO la rattache à People — son objet est le fonctionnement de l'équipe, pas la mécanique du projet. Le critère est **l'objet de la tâche**, pas l'étiquette méthodologique.

**La répartition des 120 heures**

\`\`\`
People   33 %  ->  40 heures
Process  41 %  ->  49 heures
Business 26 %  ->  31 heures
\`\`\`

**Le chiffre qui doit te frapper : 31 heures sur Business Environment.**

Sur l'ancien ECO à 8 %, ce domaine méritait 10 heures — et la plupart des candidats le survolaient. Il en demande aujourd'hui **trois fois plus**, et c'est le domaine le moins couvert par les ressources de préparation encore en circulation, écrites pour l'ancien référentiel.

**Deux réserves sur ce calcul**, qui font la différence entre appliquer une formule et raisonner :

**La pondération dit ce que l'examen mesure, pas ce que tu dois réviser.** Si tu es déjà excellent en People — c'est ton métier quotidien — y consacrer 40 heures est du gaspillage. Le temps doit aller à l'écart entre les pondérations **et ton niveau mesuré**, pas aux pondérations seules.

**D'où l'ordre correct** : un test diagnostique **d'abord**, puis la répartition. C'est exactement le problem set du module Stratégie d'examen.

**Et 60 % de l'examen relève de l'agile ou de l'hybride**, réparti dans les trois domaines. Ce n'est pas un quatrième domaine à réviser à part : c'est une couche qui traverse tout. Une question People peut porter sur une équipe Scrum, une question Process sur un burndown.`,
        },
        {
          id: "pmp-found-4-b",
          kind: "situation",
          title: "Le plan de révision hérité de l'ancien examen",
          statement: `**Cas situationnel.**

Tu récupères le plan de révision d'un collègue qui a réussi le PMP en **2024**. Il te l'offre en disant « ça marche, j'ai eu Above Target partout ».

Son plan, sur 120 heures :

\`\`\`
People    : 50 h   (42 % de l'examen)
Process   : 60 h   (50 % de l'examen)
Business  : 10 h   ( 8 % de l'examen)
Dont agile : environ 50 % du contenu
Support   : PMBOK 6 + tableaux entrées-sorties
\`\`\`

1. identifie **tout** ce qui est périmé dans ce plan
2. recalcule la répartition correcte
3. dis ce qui change **concrètement** dans le contenu à réviser, pas seulement dans les heures
4. explique pourquoi son plan a marché pour lui et ne marchera pas pour toi
5. que gardes-tu de son plan ?

**Le point 5 compte.** Tout n'est pas à jeter, et savoir ce qui reste valable est aussi utile que repérer ce qui a changé.`,
          hint: `Trois choses ont changé le 9 juillet 2026 : les pondérations des domaines, la proportion agile/prédictif, et le référentiel de fond. Regarde aussi ce que le format de l'examen lui-même a gagné.`,
          solution: `**1. Ce qui est périmé**

**a) Les trois pondérations.** People 42 % → **33 %**, Process 50 % → **41 %**, Business **8 % → 26 %**. Le dernier écart est massif.

**b) La proportion agile.** Environ 50 % → **60 %**, avec seulement 40 % de prédictif.

**c) Le référentiel.** PMBOK 6 et ses 49 processus → **PMBOK 8**, organisé en 6 principes et 7 domaines de performance. Les tableaux entrées-sorties ne correspondent plus à la structure du référentiel.

**d) Le format.** L'examen est passé de 230 à **240 minutes**, de 175 à **170 questions notées**, d'une à **deux pauses**, et a gagné deux types de questions : les **études de cas** et les **questions visuelles**. Son plan ne prévoit aucun entraînement à ces formats.

**2. La répartition correcte**

\`\`\`
People    33 %  ->  40 h   (-10 h)
Process   41 %  ->  49 h   (-11 h)
Business  26 %  ->  31 h   (+21 h)
\`\`\`

**3. Ce qui change dans le contenu**

C'est plus important que le décompte d'heures.

**Business Environment triple.** Il ne s'agit pas de lire trois fois plus longtemps les mêmes fiches : ce domaine est **peu couvert** par les ressources d'avant 2026. Il faut y travailler la conformité et la gouvernance, la réalisation des bénéfices et l'alignement stratégique, le changement organisationnel, et les sujets récents — durabilité, IA.

**L'agile devient majoritaire.** Non pas comme un bloc séparé, mais **infusé partout** : une question People sur une équipe Scrum, une question Process sur un burndown ou un backlog priorisé.

**Le format des questions.** Il faut s'entraîner aux *case sets* — lire un scénario long une fois, bien, puis répondre à 3-5 questions liées — et à lire un tableau de bord ou un radiateur d'information.

**4. Pourquoi son plan a marché pour lui**

Parce qu'il était **exact pour l'examen de 2024**. Ce n'est pas une mauvaise méthode, c'est une méthode calibrée sur un référentiel qui n'existe plus.

Et c'est un piège classique du raisonnement : « ça a marché » est un argument d'autorité qui ne dit rien tant qu'on n'a pas vérifié que les conditions sont les mêmes. Ici, elles ne le sont pas.

**5. Ce qu'on garde — et il y a beaucoup**

**Le volume total.** 120 heures reste un ordre de grandeur juste (100 à 150 h).

**La méthode de travail** : questions situationnelles quotidiennes, analyse écrite de chaque erreur, examens blancs chronométrés en fin de préparation, seuil de 70 % stable avant de réserver. Tout cela est indépendant du référentiel.

**Le mindset PMI.** Servant leadership, comprendre avant d'agir, créer de la valeur, ne jamais escalader trop vite : ces réflexes n'ont pas changé et restent le facteur n°1 de réussite.

**Ses notes sur ses propres erreurs**, s'il les a gardées — c'est souvent la partie la plus utile d'un plan de préparation, et la seule qu'on ne peut pas retrouver ailleurs.

---

**Le principe général : quand tu hérites d'un plan, la question n'est pas « a-t-il marché ? » mais « les conditions sont-elles les mêmes ? ».**

C'est exactement le raisonnement attendu d'un chef de projet devant une leçon apprise d'un projet passé : les *lessons learned* ne se transposent jamais telles quelles, elles s'adaptent au contexte. Le tailoring, sujet du module suivant, commence ici.`,
        },
      ],
      "pmp-found-5b": [
        {
          id: "pmp-found-5b-a",
          kind: "application",
          title: "Structure et autorité du chef de projet",
          statement: `Construis le tableau comparatif des structures organisationnelles, avec pour chacune :

1. le niveau d'autorité du chef de projet
2. qui contrôle le budget
3. le rôle du PM — à temps plein ou partiel
4. qui détient les ressources
5. un avantage et un inconvénient

Couvre : **fonctionnelle**, **matricielle faible**, **matricielle équilibrée**, **matricielle forte**, **projetisée**.

Puis réponds : dans quelle structure le chef de projet a-t-il le plus de mal à obtenir des ressources, et que doit-il faire en conséquence ?`,
          hint: `Il y a un continuum, pas cinq cases indépendantes : l'autorité du PM croît régulièrement de la structure fonctionnelle à la structure projetisée. La matricielle équilibrée est le point de bascule où le PM et le responsable fonctionnel partagent le pouvoir.`,
          solution: `| Structure | Autorité du PM | Budget contrôlé par | Rôle du PM | Ressources |
|---|---|---|---|---|
| **Fonctionnelle** | Très faible à nulle | Responsable fonctionnel | Temps partiel | Départements |
| **Matricielle faible** | Faible | Responsable fonctionnel | Temps partiel | Départements |
| **Matricielle équilibrée** | Modérée | **Partagé** | Temps plein | Partagées |
| **Matricielle forte** | Forte | Chef de projet | Temps plein | Majoritairement projet |
| **Projetisée** | Quasi totale | Chef de projet | Temps plein | Dédiées au projet |

**Avantages et inconvénients**

**Fonctionnelle** — spécialisation forte, carrières lisibles, ressources mutualisées. Mais le projet passe systématiquement après l'activité courante, et le PM n'a aucun levier.

**Matricielle** — compromis : expertise conservée **et** coordination projet réelle. Mais **double hiérarchie** : chaque membre a deux chefs, source de conflits de priorités permanents.

**Projetisée** — équipe soudée, décisions rapides, PM pleinement responsable. Mais duplication des compétences entre projets, et une vraie question à la fin : que deviennent les gens quand le projet se termine ?

**Où le PM peine le plus à obtenir des ressources : la structure fonctionnelle**, et dans une moindre mesure la matricielle faible. Les ressources appartiennent aux directeurs fonctionnels, qui les affectent selon **leurs** priorités — et le projet en est rarement une.

**Ce qu'il doit faire en conséquence — c'est ce que l'examen teste** :

**Négocier explicitement** avec les responsables fonctionnels, en amont et par écrit, plutôt que de supposer une disponibilité.

**Faire porter le projet par un sponsor influent** : dans une structure fonctionnelle, l'autorité du PM est empruntée, elle vient du sponsor.

**Documenter les engagements de disponibilité** dans le plan de gestion des ressources — c'est ce qui permet de signaler un écart sans que ce soit une accusation.

**Escalader au sponsor** quand un engagement n'est pas tenu — et c'est l'un des rares cas où l'escalade est la bonne première action, parce que le problème est **hors du contrôle** du PM.

---

**Le piège d'examen à connaître** : une question qui précise « dans une organisation fonctionnelle » attend une réponse **différente** de la même situation en organisation projetisée. Le PM fonctionnel négocie et influence ; le PM projetisé décide.

Quand une question mentionne la structure, ce n'est jamais du décor.`,
        },
        {
          id: "pmp-found-5b-b",
          kind: "situation",
          title: "Quatre contextes, quatre marges de manœuvre",
          statement: `**Cas situationnel.** Quatre scénarios courts.

Pour chacun : identifie la **structure organisationnelle**, dis quelle est la **marge de manœuvre réelle** du chef de projet, et indique **quelle est sa première action**.

**A.** Tu diriges un projet de refonte du site web. Ton développeur clé t'annonce que son responsable de département vient de le réaffecter à 80 % sur une autre priorité. Tu n'as aucun pouvoir hiérarchique sur lui.

**B.** Ton équipe de 9 personnes t'est entièrement dédiée depuis 14 mois. Tu contrôles le budget et tu as recruté deux d'entre eux. Le projet se termine dans 6 semaines et l'équipe s'inquiète de la suite.

**C.** Tu partages l'autorité avec la responsable Qualité : les testeurs te rendent compte pour le projet et lui rendent compte pour leur métier. Elle veut imposer un processus de validation qui ajoute 3 semaines à ton échéancier.

**D.** On te demande de « coordonner » un projet transverse. Tu n'as ni budget, ni équipe, ni mandat écrit. Le sponsor est un directeur qui te soutient verbalement.

**Le scénario D est le plus fréquent dans la vraie vie**, et le plus mal traité.`,
          hint: `Repère à chaque fois trois indices : qui contrôle le budget, à qui les gens rendent compte, et le PM est-il à temps plein sur le projet ? Ces trois éléments suffisent à situer la structure.`,
          solution: `**A — Structure fonctionnelle (ou matricielle faible).**

*Indices* : aucun pouvoir hiérarchique, le responsable de département réaffecte unilatéralement.

*Marge réelle* : faible. Tu ne peux pas ordonner, seulement négocier et influencer.

*Première action* : **évaluer l'impact précis** sur l'échéancier et les livrables — chiffré, pas ressenti — puis aller négocier avec le responsable fonctionnel, dossier en main. Si la négociation échoue, escalader au sponsor **avec l'impact chiffré**, pas avec une plainte.

⚠️ L'erreur classique est d'escalader immédiatement. Le réflexe PMI est : comprendre, chiffrer, négocier au bon niveau, **puis** escalader si c'est hors de ton contrôle. Ici, cela l'est en partie — d'où une escalade légitime, mais en seconde intention.

**B — Structure projetisée.**

*Indices* : équipe dédiée, budget contrôlé, participation au recrutement.

*Marge réelle* : maximale sur le projet. Mais l'inquiétude de l'équipe est le **problème structurel** de cette organisation : à la fin du projet, les gens n'ont pas de département d'accueil.

*Première action* : traiter la question ouvertement et **maintenant** — plan de libération des ressources, échanges avec les RH et les autres chefs de projet, discussions individuelles sur la suite.

Ce n'est pas de la bienveillance décorative : une équipe qui s'inquiète de son avenir commence à chercher ailleurs, et un départ à six semaines de la fin met la livraison en danger. C'est du management de risque.

**C — Structure matricielle équilibrée.**

*Indices* : autorité partagée, double reporting explicite.

*Marge réelle* : réelle mais **partagée**. Ni toi ni la responsable Qualité ne pouvez trancher seuls.

*Première action* : **comprendre son besoin avant de négocier le délai**. Pourquoi ce processus ? Quel risque cherche-t-elle à couvrir ? Souvent, l'objectif peut être atteint autrement — validation en parallèle plutôt qu'en série, échantillonnage, automatisation d'une partie des contrôles.

Si le désaccord persiste, on l'escalade **conjointement** aux deux hiérarchies, en présentant l'arbitrage — pas en cherchant un arbitre qui donnerait raison à l'un contre l'autre. Le conflit de priorités est le prix structurel de la matricielle ; il se résout par la collaboration, mode de résolution privilégié par le PMI.

**D — Structure fonctionnelle, et le PM est un *coordinateur* — voire un simple *expéditeur* de projet.**

*Indices* : ni budget, ni équipe, ni mandat écrit. Le soutien est verbal.

*Marge réelle* : très faible, et surtout **non formalisée** — ce qui est pire que faible.

*Première action* : **obtenir une charte de projet signée par le sponsor.** C'est la réponse attendue, et ce n'est pas de la bureaucratie : la charte est le document qui **autorise formellement** le projet et **nomme officiellement** le chef de projet avec son niveau d'autorité. Sans elle, ton mandat n'existe que dans une conversation.

C'est le scénario le plus fréquent en entreprise, et le plus souvent mal traité : on commence à travailler en espérant que l'autorité viendra avec les résultats. Elle ne vient pas.

---

**Ce que ces quatre cas entraînent : lire le contexte avant de choisir l'action.** La même situation appelle des réponses opposées selon la structure — négocier ici, décider là. À l'examen, quand une question précise le type d'organisation, c'est toujours l'information qui départage les réponses plausibles.`,
        },
      ],
      "pmp-found-5": [
        {
          id: "pmp-found-5-a",
          kind: "application",
          title: "Ton plan de préparation, daté",
          statement: `Construis ton plan réel — pas un plan type recopié.

1. estime ta disponibilité **honnête** : combien d'heures par semaine, quels jours, à quels moments
2. déduis-en ton nombre de semaines pour atteindre 100 à 150 heures
3. répartis les modules de ce parcours sur ces semaines
4. place **trois examens blancs** complets, avec leurs dates
5. fixe ton **critère de réservation** : à quelle condition mesurée réserves-tu la date d'examen ?

Le point 1 est celui où tout le monde triche. Prends ton agenda des quatre dernières semaines et regarde ce que tu as **réellement** fait, pas ce que tu comptais faire.`,
          hint: `Une préparation demande 100 à 150 heures. À 10 h par semaine, cela fait 10 à 15 semaines ; à 5 h, 20 à 30 semaines. Le plan qui échoue est toujours celui qui suppose une disponibilité qu'on n'a pas.`,
          solution: `**Un exemple de plan sur 10 semaines à 12 h/semaine (120 h)**

| Semaines | Contenu | Heures |
|---|---|---|
| 1-2 | Fondamentaux + Mindset PMI + lecture intégrale de l'ECO 2026 | 24 h |
| 3-4 | Domaine People (33 %) | 24 h |
| 5-6 | Domaine Process (41 %) | 26 h |
| 7 | Agile et hybride — 60 % de l'examen, à traiter comme un bloc | 12 h |
| 8 | Business Environment (26 %) — le domaine sous-estimé | 14 h |
| 9 | Stratégie d'examen + **examen blanc n° 1** + analyse | 12 h |
| 10 | **Examens blancs n° 2 et 3** + révision ciblée | 8 h |

**Les trois examens blancs** : un en semaine 9 (diagnostic), deux en semaine 10 (validation). Chacun en **conditions réelles** — 240 minutes, sans interruption, avec les deux pauses.

⚠️ **Un quatrième examen blanc est souvent une mauvaise idée** : à ce stade, le temps est mieux investi dans l'analyse des erreurs des trois premiers que dans une quatrième mesure.

**Le critère de réservation**

> **Je réserve quand j'obtiens ≥ 70 % sur deux examens blancs complets consécutifs, et qu'aucun domaine ECO n'est en dessous de 65 %.**

Ce critère est écrit à l'avance, et il fait deux choses.

Il évite de réserver sur un **bon score isolé** — un examen blanc réussi peut tenir à la chance sur le tirage des questions.

Et la condition « aucun domaine sous 65 % » évite le piège d'une moyenne flatteuse qui masque un domaine faible. Avec Business Environment à 26 % de l'examen, être à 45 % dessus suffit à faire échouer un candidat qui a 80 % partout ailleurs.

**Trois principes de construction du plan**

**Une disponibilité honnête.** Un plan à 15 h/semaine chez quelqu'un qui en fait 6 ne produit pas 15 h : il produit de la culpabilité, puis l'abandon. Mieux vaut 20 semaines tenues que 10 semaines rêvées.

**Une marge.** Prévois une semaine tampon. Il y aura une semaine de travail impossible, une grippe, un imprévu.

**Un point de contrôle hebdomadaire.** Un quart d'heure le dimanche : heures réellement faites, écart au plan, ajustement. Si tu es à 60 % du plan trois semaines de suite, ce n'est pas toi qui es en retard — c'est le plan qui est faux, et il faut le refaire.

C'est exactement le suivi d'avancement que le PMP t'apprend à conduire sur un projet. Autant l'appliquer au premier projet venu : ta propre préparation.`,
        },
        {
          id: "pmp-found-5-b",
          kind: "situation",
          title: "Quatre semaines au lieu de dix",
          statement: `**Cas situationnel.** Repriorisation sous contrainte.

Tu avais un plan sur 10 semaines. Un imprévu professionnel t'a fait perdre 6 semaines de préparation, et ta date d'examen est dans **4 semaines**. Elle est réservée et payée ; la reporter coûte des frais.

Ton état actuel :
- modules Fondamentaux et Mindset : terminés
- People : à moitié fait
- Process, Agile/Hybride, Business Environment : pas commencés
- aucun examen blanc passé
- disponibilité : 12 h par semaine, soit **48 heures restantes**

1. quelle est la **première chose** à faire, avant même de replanifier ?
2. construis le plan des 4 semaines
3. qu'est-ce que tu acceptes de **ne pas faire** ?
4. à quelle condition décides-tu de reporter, et quand prends-tu cette décision ?

**Le point 3 est le cœur de l'exercice.** Un plan qui ne renonce à rien n'est pas un plan, c'est une liste de souhaits.`,
          hint: `48 heures ne permettent pas de couvrir trois modules et demi convenablement. Avant de répartir le temps, il faut savoir **où tu en es réellement** — et il existe une façon de le mesurer en trois heures.`,
          solution: `**1. La première chose : un examen blanc diagnostique complet, tout de suite.**

Avant toute replanification. Quatre heures, en conditions réelles, dès ce week-end.

La raison est décisive : **tu ne sais pas ce que tu ignores**. Ton expérience professionnelle couvre peut-être déjà une bonne partie de Process ; tu es peut-être bien meilleur en agile que tu ne le crois. Répartir 48 heures sur des modules « non commencés » suppose que non commencé égale non maîtrisé — ce qui est faux pour quelqu'un d'expérimenté.

Sans ce diagnostic, tu répartis ton temps à l'aveugle. C'est précisément l'erreur que le PMP t'apprend à ne pas commettre : **mesurer avant de planifier**.

**2. Le plan des 4 semaines (48 h)**

| Semaine | Contenu | Heures |
|---|---|---|
| 1 | **Examen blanc diagnostique** (4 h) + analyse écrite des erreurs (3 h) + Process ciblé sur les faiblesses mesurées (5 h) | 12 h |
| 2 | Agile et hybride — **60 % de l'examen**, priorité absolue (8 h) + Process, suite (4 h) | 12 h |
| 3 | Business Environment (7 h) + People, moitié restante (3 h) + **examen blanc n° 2** partiel, 90 questions (2 h) | 12 h |
| 4 | **Examen blanc n° 3 complet** (4 h) + analyse (3 h) + révision ciblée (4 h) + repos la veille (1 h de relecture légère) | 12 h |

**La logique de priorisation** : agile et hybride passent devant tout le reste après le diagnostic, parce qu'ils représentent 60 % des questions et traversent les trois domaines. Business Environment vient ensuite, à 26 % et rarement couvert par l'expérience professionnelle.

**3. Ce que tu acceptes de ne pas faire — et c'est le cœur**

**Tu ne liras pas le PMBOK 8 en entier.** 250 pages à 3 h de lecture pour un gain marginal face à des questions situationnelles.

**Tu ne feras pas les problem sets complets** de chaque module. Tu en fais **un seul**, celui d'Agile/Hybride, et tu remplaces les autres par des séries de questions.

**Tu ne viseras pas la maîtrise uniforme.** Avec 48 heures, l'objectif est de **passer le seuil**, pas d'exceller. Un domaine à 65 % qui en pesait 26 % rapporte plus que le passage de 85 à 92 % sur ton point fort.

**Tu ne feras pas de fiches.** Elles rassurent et consomment un temps considérable pour un bénéfice faible à ce stade. À la place : des questions, et l'analyse écrite des erreurs.

**4. Le critère de report, et sa date**

**La décision se prend à la fin de la semaine 3**, sur le résultat de l'examen blanc partiel — pas la veille, où l'on décide toujours de tenter quand même.

> **Si je suis en dessous de 60 % à la fin de la semaine 3, je reporte.**

Le raisonnement est économique : les frais de report sont inférieurs au coût d'un échec — frais de repassage **plus** plusieurs semaines de démotivation. Et un candidat à 55 % en semaine 3 ne franchit pas 15 points en une semaine.

Entre 60 et 70 %, c'est une zone de jugement : on tente si la progression est nette d'un blanc à l'autre, on reporte si elle stagne.

---

**Ce que cet exercice entraîne : décider quoi abandonner sous contrainte.**

C'est exactement une situation de projet — périmètre, délai et ressources ne tiennent plus ensemble, il faut arbitrer. La mauvaise réponse est de tout garder et de tout faire à moitié. La bonne est de **choisir explicitement ce qu'on sacrifie**, et de le documenter.

Un chef de projet qui ne sait pas renoncer à un livrable ne sait pas gérer un projet contraint. C'est vrai pour ta préparation comme pour ton prochain projet.`,
        },
      ],
    },
    finalExercise: {
      title: "Dossier de candidature et plan de préparation",
      duration: "3 à 5 h",
      covers: ["pmp-found-1", "pmp-found-2", "pmp-found-3", "pmp-found-4", "pmp-found-5b", "pmp-found-5"],
      brief: `Le dossier que tu déposeras réellement au PMI, et le plan que tu suivras réellement pendant 10 semaines.

Cet exercice **rassemble les 6 leçons du module** — ce qu'est le PMP (leçon 1), l'éligibilité et la candidature (leçon 2), le format de l'examen (leçon 3), l'ECO 2026 (leçon 4), les structures organisationnelles (leçon 5b), la planification de la préparation (leçon 5).

C'est le seul exercice final du parcours qui produit un livrable que tu vas **réellement utiliser**. Ne le fais pas comme un exercice : fais-le comme ton dossier.`,
      dataset: `Aucun jeu de données : ce sont **tes** projets et **ton** agenda.

Prépare avant de commencer :
- ton CV ou la liste de tes postes des 10 dernières années
- les dates de début et de fin de tes projets
- ton agenda des 4 dernières semaines, pour estimer honnêtement ta disponibilité
- l'**ECO 2026** téléchargé depuis pmi.org — c'est gratuit et c'est le document de référence`,
      steps: [
        "**Éligibilité calculée et justifiée** — voie retenue, mois d'expérience à diriger des projets sans double comptage des périodes qui se chevauchent, état des 35 heures de formation. (leçon 2)",
        "**Trois descriptions de projets au format PMI**, entre 200 et 500 caractères chacune : à la première personne, verbes de direction, chiffres, résultat mesurable, vocabulaire PMI. Écrites pour survivre à un audit. (leçon 2)",
        "**Identifie la structure organisationnelle** de chacun de ces trois projets, et dis en une phrase comment elle a limité ou élargi ton autorité. Cela nourrit tes descriptions et t'entraîne à lire un contexte. (leçon 5b)",
        "**Plan de révision daté**, pondéré par l'ECO 2026 (33 / 41 / 26), avec les 60 % agile-hybride traités comme une couche transverse et non comme un module isolé. Construit sur ta disponibilité réelle, pas souhaitée. (leçons 4 et 5)",
        "**Stratégie du jour J chiffrée** : rythme par question, jalons de contrôle à 45 / 90 / 135, placement des deux pauses, règle de blocage, marge finale. (leçon 3)",
        "**Ton critère de réservation**, écrit à l'avance : à quelle condition mesurée réserves-tu la date, et à quelle condition reportes-tu ? (leçons 1 et 5)",
      ],
      checklist: [
        "Mon calcul de mois ne compte pas deux fois les projets menés en parallèle",
        "Mes descriptions de projets sont à la première personne, avec des chiffres et un résultat",
        "Mon plan est construit sur ma disponibilité réelle des 4 dernières semaines, pas sur mes intentions",
        "Business Environment reçoit bien environ un quart de mon temps de révision",
        "Ma stratégie de temps contient des jalons de contrôle, pas seulement une moyenne",
        "Mon critère de réservation est écrit et chiffré, décidé avant d'être sous pression",
      ],
      selfCheck: `Le vrai test : **fais lire tes trois descriptions de projets à quelqu'un qui ne connaît pas ton métier**, et demande-lui de te dire ce que tu as fait exactement.

S'il répond « tu as travaillé sur un projet informatique », c'est raté. S'il répond « tu as dirigé une équipe de 7 personnes sur une migration de 340 k€, livrée en avance », c'est réussi — et c'est exactement ce qu'un auditeur du PMI doit pouvoir reconstituer.

Deuxième test, plus dur : **relis ton plan de préparation dans deux semaines.** Si tu es à moins de 70 % des heures prévues, ce n'est pas ta discipline qui est en cause, c'est ton estimation. Refais-la.`,
    },
    quizExtra: [
      {
        q: "Quels sont les deux nouveaux types de questions introduits par l'examen de juillet 2026 ?",
        options: [
          "Les questions ouvertes et les questions orales",
          "Les études de cas (un scénario long suivi de 3 à 5 questions liées) et les questions visuelles à interpréter",
          "Les questions à réponse chiffrée et les vrai/faux",
          "Les questions chronométrées individuellement",
        ],
        answer: 1,
        explain:
          "Les case sets demandent une lecture attentive du scénario UNE fois, puis les réponses aux questions liées — l'erreur coûteuse est de relire les paragraphes avant chaque question. Les questions visuelles présentent un tableau de bord, un burndown ou un radiateur d'information à interpréter. Ces deux formats ne doivent pas être découverts le jour J.",
      },
      {
        q: "Tes trois projets vont de janv. 2022 à août 2022, juin 2022 à mars 2023, et sept. 2023 à juin 2024. Combien de mois comptes-tu ?",
        options: [
          "28 mois (8 + 10 + 10)",
          "25 mois — les 3 mois de chevauchement entre les projets A et B ne comptent qu'une fois",
          "22 mois",
          "30 mois",
        ],
        answer: 1,
        explain:
          "Le PMI compte les mois CALENDAIRES pendant lesquels tu dirigeais un projet, pas la somme des durées. Deux projets menés en parallèle le même mois comptent pour un seul mois. C'est l'erreur de calcul la plus fréquente, et c'est exactement ce qu'un audit vérifie.",
      },
      {
        q: "Dans une structure fonctionnelle, un responsable de département réaffecte ton développeur clé. Quelle est ta première action ?",
        options: [
          "Escalader immédiatement au sponsor",
          "Évaluer l'impact chiffré sur l'échéancier, puis négocier avec le responsable fonctionnel, dossier en main",
          "Réaffecter le travail au reste de l'équipe sans rien dire",
          "Demander une autorité hiérarchique sur l'équipe",
        ],
        answer: 1,
        explain:
          "Le réflexe PMI est constant : comprendre, chiffrer, négocier au bon niveau, PUIS escalader si c'est hors de ton contrôle. Escalader en première intention est le distracteur le plus fréquent de l'examen. Dans une structure fonctionnelle, l'autorité du PM est empruntée au sponsor — mais on ne l'invoque qu'après avoir tenté la négociation avec des chiffres.",
      },
      {
        q: "Tu as 120 heures de révision. Combien consacres-tu à Business Environment selon l'ECO 2026 ?",
        options: [
          "Environ 10 heures, c'est le plus petit domaine",
          "Environ 31 heures — le domaine pèse 26 % et c'est celui qui a le plus changé",
          "Environ 50 heures",
          "Le temps restant après People et Process",
        ],
        answer: 1,
        explain:
          "Business Environment est passé de 8 % à 26 % : plus du quart de l'examen. C'est aussi le domaine le moins couvert par les ressources encore en circulation, écrites pour l'ancien référentiel. Réserve importante : la pondération dit ce que l'examen mesure, pas ce que TU dois réviser — le temps doit aller à l'écart entre les pondérations et ton niveau mesuré, d'où l'intérêt d'un test diagnostique AVANT de planifier.",
      },
    ],
  },

  // ══ LE PMI MINDSET & L'ÉTHIQUE ════════════════════════════════════════════
  mindset: {
    lessons: {
      "pmp-mindset-1": [
        {
          id: "pmp-mindset-1-a",
          kind: "application",
          title: "Réflexe instinctif contre réflexe PMI",
          statement: `Pour chacune de ces six situations, écris **deux** réponses :
- **A** — ce qu'un chef de projet ferait instinctivement, ou ce qu'on voit faire en entreprise
- **B** — ce que le PMI attend

Puis, en une phrase, le **principe** qui explique l'écart.

1. Un développeur n'arrive pas à résoudre un bug depuis deux jours.
2. Le sponsor demande d'ajouter une fonctionnalité en cours de projet.
3. Un membre de l'équipe est régulièrement en retard aux réunions.
4. Le projet va dépasser son délai de trois semaines.
5. Deux membres de l'équipe sont en conflit ouvert.
6. Un livrable est terminé dans les délais mais le client ne l'utilise pas.

Le n° 6 est le plus révélateur du mindset PMI. Prends-y garde.`,
          hint: `Cherche le motif commun aux six réponses attendues. Il tourne autour de trois idées : comprendre avant d'agir, faire porter la solution par les bonnes personnes, et regarder la finalité plutôt que le livrable.`,
          solution: `**1. Le développeur bloqué**
**A** — reprendre le bug soi-même, ou réaffecter la tâche à quelqu'un de plus rapide.
**B** — demander à la personne ce qui la bloque, lever l'obstacle (accès manquant, information absente, besoin d'un binôme), et laisser l'équipe résoudre le problème technique.
*Principe* : **servant leadership**. Le PM lève les obstacles, il ne fait pas le travail à la place et ne micro-gère pas.

**2. Le sponsor veut une fonctionnalité en plus**
**A** — accepter pour ne pas contrarier le sponsor, ou refuser en invoquant le périmètre figé.
**B** — évaluer l'impact sur délai, coût, qualité et risques, puis faire passer la demande par le **processus de maîtrise des modifications**, et laisser l'instance compétente décider.
*Principe* : ni « oui » réflexe ni « non » réflexe — **un processus**. Le PM apporte l'analyse d'impact, il ne décide pas seul de ce qui entre dans le projet.

**3. Le membre systématiquement en retard**
**A** — le signaler en réunion d'équipe, ou remonter au responsable hiérarchique.
**B** — lui parler **en privé** pour comprendre la cause, puis revenir aux règles de fonctionnement de l'équipe (*team charter*) et les rappeler collectivement si nécessaire.
*Principe* : on traite la cause, pas le symptôme, et on ne fait jamais perdre la face à quelqu'un devant le groupe.

**4. Le dépassement de délai**
**A** — attendre d'être sûr avant d'en parler, ajouter des ressources, ou demander à l'équipe d'accélérer.
**B** — **communiquer immédiatement** aux parties prenantes avec l'impact chiffré et les options — compression, ajout de ressources, réduction du périmètre — puis laisser décider au bon niveau.
*Principe* : **proactif, jamais réactif**. Une mauvaise nouvelle communiquée tôt est une information ; communiquée tard, c'est une faute.

⚠️ Ajouter des ressources est un distracteur classique : la loi de Brooks dit qu'ajouter du monde à un projet en retard le retarde davantage.

**5. Le conflit ouvert**
**A** — trancher soi-même, ou séparer les deux personnes.
**B** — les réunir, faire exprimer les positions, chercher une solution qui satisfasse les deux — la **collaboration / résolution de problème**, mode privilégié par le PMI.
*Principe* : un conflit traité en profondeur renforce l'équipe ; un conflit évité ou étouffé revient plus fort.

**6. Le livrable inutilisé — le plus révélateur**
**A** — considérer le projet réussi : c'était livré dans les délais et conforme à la spécification.
**B** — le considérer comme un **échec** et enquêter : le besoin réel a-t-il été compris ? La conduite du changement a-t-elle été faite ? Les bénéfices attendus sont-ils atteints ?
*Principe* : **on crée de la valeur, pas des livrables**. Un projet livré dans les délais, dans le budget, et qui ne sert à personne, n'a pas réussi.

---

**Le motif commun aux six** :

**Comprendre avant d'agir.** Presque toutes les bonnes réponses commencent par analyser, demander, évaluer.

**Agir au bon niveau.** Ni faire à la place de l'équipe, ni escalader trop vite, ni décider seul de ce qui relève d'une instance.

**Regarder la finalité.** Le livrable n'est pas le but, le bénéfice l'est.

Si tu retiens ces trois idées, tu réponds correctement à une large part des questions situationnelles — même sur des sujets que tu n'as pas révisés.`,
        },
        {
          id: "pmp-mindset-1-b",
          kind: "situation",
          title: "Quatre réponses plausibles, une seule attendue",
          statement: `**Cas situationnel.**

> Vous dirigez un projet en approche agile. Lors du *daily*, un développeur signale qu'une bibliothèque tierce utilisée par l'équipe présente une faille de sécurité connue. Il propose de la remplacer, ce qui prendrait environ une semaine. Le sprint se termine dans trois jours et l'engagement de sprint est déjà tendu.
>
> Que faites-vous **en premier** ?
>
> **A.** Escalader immédiatement au sponsor pour obtenir un délai supplémentaire.
> **B.** Demander au développeur de remplacer la bibliothèque tout de suite, la sécurité prime.
> **C.** Faire évaluer par l'équipe la gravité et l'exploitabilité de la faille dans votre contexte, puis décider avec le Product Owner.
> **D.** Reporter le sujet à la rétrospective de fin de sprint pour ne pas perturber l'engagement en cours.

1. choisis la réponse et justifie
2. pour **chacune** des trois autres, explique pourquoi elle est plausible **et** pourquoi elle est fausse
3. identifie le mot de l'énoncé qui départage les réponses
4. comment la réponse changerait-elle si le projet était **prédictif** plutôt qu'agile ?

**Le point 2 est le cœur de l'exercice.** Savoir pourquoi une réponse est fausse vaut mieux que savoir laquelle est juste — c'est ce qui te permettra de traiter une question que tu n'as jamais vue.`,
          hint: `Les quatre réponses correspondent à quatre erreurs archétypales : escalader trop vite, agir sans analyser, ignorer le problème, et… une seule qui commence par comprendre. Cherche aussi qui, en agile, décide de ce qui entre dans un sprint.`,
          solution: `**1. La réponse est C.**

Elle applique les trois réflexes en une seule action : **comprendre avant d'agir** (évaluer la gravité réelle dans *votre* contexte), **faire porter la décision par les bonnes personnes** (l'équipe évalue, le Product Owner arbitre le contenu du sprint), et **agir au bon niveau** (pas d'escalade prématurée).

Une faille « connue » n'est pas nécessairement exploitable chez vous : la fonction vulnérable n'est peut-être pas utilisée, le composant peut être inaccessible depuis l'extérieur. Cette évaluation change complètement la décision — et elle prend une heure, pas une semaine.

**2. Pourquoi les trois autres sont plausibles et fausses**

**A — escalader au sponsor.**
*Plausible* : la sécurité est un sujet sérieux, le sponsor doit être informé, et il y a un impact potentiel sur le délai.
*Fausse* : c'est le distracteur le plus fréquent de tout l'examen. On escalade quand la situation est **hors de son contrôle** — ici, elle ne l'est pas : l'équipe peut évaluer, le PO peut arbitrer. Escalader sans analyse préalable, c'est demander à quelqu'un d'autre de faire son travail, et cela arrive au sponsor sans les éléments pour décider.

**B — remplacer tout de suite.**
*Plausible* : « la sécurité prime » est un principe défendable, et l'action est décisive.
*Fausse* pour deux raisons. D'abord, on agit **sans avoir mesuré** — peut-être que la faille ne vous concerne pas, et vous venez de sacrifier un sprint pour rien. Ensuite, en agile, **le PM ne décide pas seul** d'ajouter une semaine de travail dans un sprint engagé : c'est le Product Owner qui arbitre le contenu, et l'équipe qui s'engage.

**D — reporter à la rétrospective.**
*Plausible* : protéger l'engagement de sprint est un vrai principe agile, et la rétrospective est le lieu des améliorations.
*Fausse* : c'est **ignorer un problème**, ce que le PMI ne pardonne jamais. Et la rétrospective porte sur le fonctionnement de l'équipe, pas sur les décisions produit ou les risques — ce serait le mauvais lieu même si le report était acceptable.

**3. Le mot qui départage : « en premier ».**

Les quatre actions pourraient toutes arriver à un moment. La question ne demande pas ce qu'il faut faire, mais ce qu'il faut faire **d'abord**. Et le premier geste du mindset PMI est presque toujours : **comprendre**.

Les autres mots à repérer dans une question : « la MEILLEURE action », « le PROCHAIN », « le PLUS approprié ». Chacun change la réponse attendue.

**4. Si le projet était prédictif**

La logique reste la même — évaluer d'abord — mais la suite change :

Le résultat de l'évaluation part dans le **registre des risques**, et si la correction impacte le périmètre, le délai ou le coût, elle passe par une **demande de changement** soumise au comité de maîtrise des modifications. Il n'y a pas de Product Owner : c'est le comité qui arbitre.

**En agile** : l'équipe évalue, le PO arbitre le backlog, la décision se prend dans le cadre du sprint.
**En prédictif** : l'équipe évalue, le risque est enregistré, le changement passe par le processus formel.

**Le premier geste est identique ; le circuit de décision diffère.** C'est exactement ce que teste l'examen quand il précise l'approche — et avec 60 % de questions agile ou hybride, il la précise souvent.`,
        },
      ],
      "pmp-mindset-2": [
        {
          id: "pmp-mindset-2-a",
          kind: "application",
          title: "Prédictif, agile ou hybride ?",
          statement: `Pour chacun de ces six projets, choisis l'approche — **prédictif**, **agile** ou **hybride** — et justifie en deux lignes.

1. Construction d'un pont routier.
2. Développement d'une application mobile pour un marché nouveau, sans concurrent identifié.
3. Migration du système de paie de l'entreprise vers un nouveau logiciel.
4. Mise en conformité RGPD de l'ensemble des traitements de données.
5. Refonte du site e-commerce, avec une nouvelle architecture technique puis 40 fonctionnalités.
6. Déploiement d'un ERP dans 12 filiales sur 3 ans.

Puis identifie les **trois critères** qui ont guidé tes choix, et dis lequel pèse le plus lourd.`,
          hint: `La question déterminante n'est pas « le projet est-il technique ? » mais : **les exigences sont-elles stables ou vont-elles évoluer ?** Et pour les projets longs, demande-toi si toutes les phases ont le même niveau d'incertitude.`,
          solution: `**1. Pont routier → prédictif.**
Exigences stables, normes de construction figées, contraintes réglementaires fortes, coût du changement en cours de réalisation prohibitif. On ne livre pas la moitié d'un pont pour recueillir du retour utilisateur.

**2. Application sur un marché nouveau → agile.**
Incertitude maximale sur le besoin, aucun concurrent pour se repérer, forte valeur du retour utilisateur précoce. Chaque itération réduit l'incertitude — c'est exactement ce pour quoi l'agile existe.

**3. Migration du système de paie → prédictif, ou hybride prudent.**
Périmètre bien défini — la paie fait ce qu'elle fait — et contraintes légales strictes : le résultat doit être exact au centime dès la première exécution. Une composante hybride est possible sur la conduite du changement et la formation, où le retour des utilisateurs compte.

**4. Conformité RGPD → prédictif.**
Les exigences sont fixées par un texte réglementaire, pas négociables et pas évolutives. Un livrable partiel n'a aucune valeur : on est conforme ou on ne l'est pas.

**5. Refonte e-commerce → hybride.**
C'est le cas typique. L'**architecture technique** se planifie en prédictif — on ne découvre pas son socle de façon itérative — puis les **40 fonctionnalités** se développent en sprints, priorisées selon la valeur et ajustées au retour des utilisateurs.

**6. ERP dans 12 filiales sur 3 ans → hybride.**
Le déploiement suit un séquencement prédictif — filiale après filiale, avec un calendrier et des jalons — mais l'**adaptation aux besoins locaux** de chaque filiale se traite de façon itérative. Et chaque déploiement enrichit le suivant : c'est un cycle d'apprentissage.

---

**Les trois critères, et leur poids**

**1. La stabilité des exigences — de loin le plus déterminant.** Stables → prédictif. Évolutives ou inconnues → agile. C'est le critère qui tranche à lui seul les cas 1, 2 et 4.

**2. Le coût et la faisabilité du changement tardif.** Modifier un pont coulé coûte une fortune ; modifier un écran d'application coûte une journée. Plus le changement tardif est coûteux, plus le prédictif se justifie.

**3. La valeur d'une livraison précoce.** Un demi-pont ne vaut rien ; une application avec trois fonctionnalités peut déjà servir et enseigner quelque chose. Quand la livraison partielle a de la valeur, l'agile en a aussi.

**Ce qu'il faut retenir pour l'examen** : il n'existe **pas de meilleure approche dans l'absolu**. Une question qui suggère qu'une méthode est supérieure à une autre est presque toujours un distracteur. La bonne réponse est celle qui **adapte au contexte** — c'est le *tailoring*, et c'est un des principes centraux de PMBOK 7 et 8.

Et l'hybride n'est pas un compromis mou : c'est souvent la réponse la plus juste, et c'est celle qui domine dans la réalité des entreprises — donc dans l'examen.`,
        },
        {
          id: "pmp-mindset-2-b",
          kind: "situation",
          title: "L'organisation impose Scrum, ton projet ne s'y prête pas",
          statement: `**Cas situationnel.**

Ton entreprise a décidé il y a six mois que « tous les projets passent en Scrum ». Une direction de la transformation agile suit l'adoption et publie un tableau de bord mensuel des équipes « conformes ».

On te confie un projet de **mise en conformité réglementaire** : périmètre imposé par un texte de loi, date butoir légale non négociable, exigences entièrement définies à l'avance, aucune valeur à livrer par incréments — l'organisation est conforme ou elle ne l'est pas.

Le directeur de la transformation te demande ton plan de sprints.

1. quelle est la bonne approche technique pour ce projet, et pourquoi ?
2. que fais-tu, concrètement, face à cette demande ?
3. qu'est-ce que tu **peux** légitimement garder de Scrum ici ?
4. quelle est la mauvaise réponse la plus tentante, et pourquoi elle échoue ?
5. si la direction refuse ton argumentation, que fais-tu ?

**Le point 3 est ce qui distingue une réponse mature d'une réponse rigide.**`,
          hint: `Le *tailoring* ne consiste pas à choisir un cadre dans un catalogue, mais à **adapter** les pratiques au contexte. Demande-toi quelles pratiques agiles apportent de la valeur même sur un projet à exigences figées.`,
          solution: `**1. L'approche technique juste : prédictif, ou hybride à dominante prédictive.**

Les trois critères pointent tous dans la même direction : exigences **figées par la loi**, date butoir **non négociable**, et **aucune valeur à une livraison partielle**. Une conformité à 60 % n'est pas une conformité partielle, c'est une non-conformité.

Forcer des sprints ici produirait le pire des deux mondes : la cérémonie agile sans l'adaptabilité qui la justifie.

**2. Ce que tu fais concrètement**

**Tu ne refuses pas, et tu ne te soumets pas.** Tu documentes une **décision de tailoring**.

Concrètement : préparer une note d'une page présentant les caractéristiques du projet — exigences figées, échéance légale, absence de valeur incrémentale — l'approche recommandée, et **ce que tu conserves des pratiques agiles**. Puis la présenter au directeur de la transformation comme une décision d'adaptation argumentée, pas comme une objection.

Le ton compte : « voici comment j'adapte le cadre à ce contexte » passe, « votre méthode ne marche pas ici » ne passe pas.

**3. Ce que tu gardes de Scrum — et c'est le point important**

Beaucoup de choses, en réalité :

**Les points quotidiens** (*daily*) — la synchronisation et la remontée rapide des obstacles ont de la valeur dans n'importe quelle approche.

**Un backlog priorisé des exigences réglementaires**, même si le périmètre est figé : l'**ordre** de traitement reste un choix, et traiter d'abord les exigences les plus risquées est une bonne pratique.

**Des revues régulières avec le juridique et la conformité** — l'équivalent des revues de sprint, avec les parties prenantes qui valident.

**Les rétrospectives** — améliorer le fonctionnement de l'équipe n'a aucun lien avec la stabilité des exigences.

**Un radiateur d'information** — un tableau visible de l'avancement, qui répond aussi au besoin de reporting de la direction.

Ce que tu abandonnes : l'**engagement de sprint sur un périmètre variable**, la **livraison incrémentale de valeur**, et la **replanification à chaque itération**. Ce sont précisément les pratiques que le contexte rend inapplicables.

**4. La mauvaise réponse la plus tentante**

**Faire semblant.** Appeler « sprints » des tranches de deux semaines, tenir des *dailies* pour la forme, produire un burndown qui descend en ligne droite parce que le périmètre est fixe — et cocher la case « conforme » du tableau de bord.

C'est tentant parce que ça évite le conflit et satisfait tout le monde à court terme. Cela échoue pour trois raisons : ça ne sert le projet en rien, ça décrédibilise l'agilité auprès de l'équipe qui voit bien que c'est du théâtre, et ça prive l'organisation de l'information dont elle a besoin — à savoir qu'un cadre unique ne convient pas à tous ses projets.

C'est le *cargo cult agile*, et l'examen le sanctionne.

**5. Si la direction refuse ton argumentation**

Tu appliques ce qui est demandé — c'est une **décision d'organisation**, pas une question technique, et ce n'est pas ton arbitrage.

Mais tu fais deux choses : tu **documentes** ta recommandation et le risque associé — dans le registre des risques et auprès du sponsor — et tu **adaptes à l'intérieur du cadre imposé**, en tirant le maximum des pratiques qui ont du sens.

Ce n'est pas de la résignation. Un chef de projet ne décide pas seul de la gouvernance de son organisation ; il rend les conséquences visibles et documentées, puis il exécute. Si le risque se matérialise, la trace existe — et c'est ainsi qu'une organisation apprend.

---

**Le principe : le tailoring est une décision argumentée et tracée, pas une préférence personnelle.** L'examen teste régulièrement cette nuance — la bonne réponse n'est presque jamais « imposer sa méthode », c'est « adapter et documenter ».`,
        },
      ],
      "pmp-mindset-3": [
        {
          id: "pmp-mindset-3-a",
          kind: "application",
          title: "Six situations, quatre valeurs",
          statement: `Pour chacune de ces six situations : quelle **valeur** du Code d'éthique du PMI est en jeu — Responsabilité, Respect, Équité, Honnêteté — et quelle est l'**action attendue** ?

1. Un fournisseur candidat à ton appel d'offres est dirigé par ton beau-frère.
2. Tu réalises que le chiffre d'avancement que tu as communiqué la semaine dernière était faux.
3. Un membre de l'équipe, basé à l'étranger, est systématiquement programmé pour des réunions à 23 h, heure locale.
4. Ton sponsor te demande de présenter le projet comme « dans les temps » alors qu'il a deux semaines de retard.
5. Tu reçois d'un fournisseur une invitation à un événement sportif d'une valeur de 800 €.
6. Un collègue te confie qu'il a gonflé son expérience dans sa candidature PMP.

Puis : laquelle de ces six situations est la plus difficile en pratique, et pourquoi ?`,
          hint: `Les quatre valeurs : **Responsabilité** (assumer, signaler ses erreurs), **Respect** (dignité, différences culturelles), **Équité** (impartialité, conflits d'intérêts), **Honnêteté** (vérité, information exacte). Certaines situations en engagent plusieurs.`,
          solution: `**1. Le fournisseur dirigé par ton beau-frère → Équité.**
*Action* : **divulguer immédiatement** le lien à ta hiérarchie et au service achats, puis te **retirer** du processus de décision. Tu peux rester informé, pas décisionnaire.
Le simple fait de ne pas le favoriser ne suffit pas : c'est l'**apparence** de conflit d'intérêts qui doit être traitée.

**2. Le chiffre faux déjà communiqué → Honnêteté + Responsabilité.**
*Action* : **corriger immédiatement** auprès de tous ceux qui ont reçu l'information erronée, en expliquant l'écart. Ne pas attendre le prochain point d'avancement en espérant que le chiffre se rattrape.
La valeur Responsabilité impose explicitement de signaler ses propres erreurs.

**3. Les réunions à 23 h heure locale → Respect.**
*Action* : faire **tourner** les horaires pour que la contrainte soit partagée, ou utiliser des modes asynchrones. Le respect des différences culturelles et géographiques est nommément dans le Code.
Ce n'est pas de la politesse : une équipe distribuée où toujours les mêmes subissent l'horaire finit par perdre ces personnes.

**4. Présenter un retard comme « dans les temps » → Honnêteté.**
*Action* : **refuser**, et proposer une alternative — présenter le retard avec le plan de rattrapage, ce qui est souvent ce que le sponsor cherche réellement.
La pression hiérarchique n'est pas une excuse recevable. C'est explicitement testé à l'examen.

**5. L'invitation à 800 € → Équité.**
*Action* : **divulguer** l'invitation, vérifier la politique de l'entreprise sur les cadeaux, et **refuser** si le fournisseur est en cours de sélection ou d'évaluation.
Le montant compte, mais le **moment** compte davantage : la même invitation reçue pendant un appel d'offres et hors période de décision n'a pas la même signification.

**6. Le collègue qui a gonflé son dossier → Honnêteté + Responsabilité.**
*Action* : l'**encourager à corriger** sa candidature lui-même. S'il refuse et que tu en as connaissance certaine, le Code prévoit de signaler les violations à l'éthique au PMI.
C'est la situation la plus inconfortable, et c'est voulu.

---

**La plus difficile en pratique : la n° 4**, la pression du sponsor.

Les cinq autres se règlent par une procédure — divulguer, corriger, adapter. La quatrième oppose frontalement l'intégrité à la relation avec la personne qui a le plus d'influence sur ton projet et parfois sur ta carrière.

C'est exactement pour cela qu'elle revient à l'examen sous de multiples formes. Et la réponse attendue est toujours la même : **on ne falsifie pas, quelle que soit la pression**. Ce qui se négocie, c'est la **forme** — présenter le retard accompagné d'un plan d'action, choisir le bon moment et le bon canal — jamais le fond.

**Le réflexe transposable** : face à un dilemme éthique, l'action attendue par le PMI est presque toujours l'une de ces trois — **divulguer, corriger, refuser**. Si aucune des options proposées n'en fait partie, relis les réponses : tu as probablement mal lu.`,
        },
        {
          id: "pmp-mindset-3-b",
          kind: "situation",
          title: "Trois pressions en même temps",
          statement: `**Cas situationnel.** Dilemme composite.

Tu diriges un projet stratégique de 2 M€. Trois choses arrivent la même semaine :

**a)** Ton sponsor te dit en réunion privée : « Le comité de direction est jeudi. Présente un avancement à 75 %. On est à 62 %, mais on va rattraper, et je ne veux pas qu'ils paniquent. »

**b)** Le fournisseur principal, avec qui un avenant de 300 k€ est en cours de négociation, t'invite avec ta conjointe à un week-end de séminaire dans un hôtel de luxe, « pour renforcer le partenariat ».

**c)** Tu découvres qu'un membre de ton équipe a copié une partie du code d'un projet précédent soumis à une clause de confidentialité avec un ancien client.

1. traite les trois situations : valeur en jeu, action, et dans quel ordre tu les traites
2. pour la situation **a**, écris ce que tu réponds au sponsor — les mots exacts
3. pour la situation **c**, qu'est-ce qui rend ce cas différent des deux autres ?
4. laquelle de ces trois situations peut te coûter ton emploi, et cela change-t-il ta réponse ?

**Le point 2 compte autant que le reste.** « Je refuse » est correct sur le fond et catastrophique dans la forme.`,
          hint: `Une seule des trois situations expose l'organisation à un risque **juridique immédiat**, ce qui la rend prioritaire. Et pour le point 2, cherche la formulation qui protège l'intégrité **et** l'objectif réel du sponsor, qui n'est pas de mentir mais d'éviter une réaction de panique.`,
          solution: `**1. Le traitement, dans l'ordre**

**D'abord (c) — le code sous confidentialité.** C'est le seul qui expose l'entreprise à un **risque juridique immédiat** et qui s'aggrave à chaque jour d'inaction : plus le code reste dans la base, plus il est difficile à extraire et plus la contamination est large.
*Valeurs* : Honnêteté et Responsabilité.
*Action* : arrêter l'utilisation du code, informer le service juridique et ta hiérarchie, faire retirer les portions concernées, documenter. Et traiter le membre de l'équipe séparément — probablement de bonne foi, sans conscience du problème.

**Ensuite (a) — la présentation faussée**, parce que le comité est jeudi.
*Valeur* : Honnêteté.
*Action* : refuser de présenter 75 %, et proposer une alternative.

**Enfin (b) — l'invitation.** Elle demande une réponse, mais elle n'est pas urgente au même titre.
*Valeur* : Équité.
*Action* : décliner, et divulguer l'invitation à ta hiérarchie et aux achats. Le moment la rend inacceptable : un avenant de 300 k€ est en négociation. La divulgation protège autant le fournisseur que toi.

**2. Ce que tu réponds au sponsor — les mots**

> « Je ne peux pas présenter 62 % comme 75 %, et je pense que ce n'est pas ce qui te servirait le mieux jeudi. Ce que je te propose : je présente l'avancement réel à 62 %, **avec** l'analyse de l'écart et le plan de rattrapage chiffré qui nous ramène dans les temps. Si le comité découvre le retard plus tard, il retiendra qu'on le lui a caché, et c'est là qu'il paniquera vraiment. Là, il retiendra qu'on l'a vu venir et qu'on le pilote. On peut préparer la présentation ensemble demain matin. »

**Ce que cette réponse fait, et pourquoi elle est meilleure qu'un refus sec** :

Elle **refuse clairement** — sans ambiguïté possible.
Elle **traite l'objectif réel du sponsor**, qui n'est pas de mentir mais d'éviter une réaction de panique du comité.
Elle **offre une alternative concrète** — un plan de rattrapage, pas seulement une mauvaise nouvelle.
Elle **retourne l'argument du risque** : le vrai danger pour le sponsor est la découverte tardive.
Elle **propose de faire ensemble**, ce qui maintient la relation.

Un « je refuse, c'est contraire à l'éthique » est juste sur le fond, mais il transforme un allié en adversaire et ne résout rien.

**3. Ce qui rend (c) différent**

Les deux premières situations concernent **ton propre comportement** : c'est toi qui décides de mentir ou d'accepter un cadeau, et tu peux régler la question seul.

La troisième concerne **le comportement d'un tiers** et engage la **responsabilité juridique de l'organisation**, pas seulement ton intégrité. Elle sort donc de ton périmètre de décision : tu **dois** impliquer le juridique et ta hiérarchie. Ne pas le faire serait toi-même une faute.

C'est la distinction à connaître : un dilemme personnel se tranche seul ; un risque organisationnel se remonte.

**4. Ce qui peut te coûter ton emploi**

**La situation (a)**, sans hésitation. Refuser une demande directe de son sponsor sur un projet stratégique a un coût politique réel.

**Et non, cela ne change pas la réponse.** C'est précisément le sens du Code d'éthique : il ne coûte rien de le respecter quand c'est facile. Le PMI le formule explicitement — la pression hiérarchique n'est pas une circonstance atténuante.

Ce qui change, c'est **la manière** : d'où l'importance de la formulation du point 2, qui refuse tout en préservant la relation et en servant l'intérêt réel du sponsor.

**Et un point pratique** : documente. Un compte rendu de la conversation envoyé au sponsor — « comme convenu, je présenterai l'avancement à 62 % avec le plan de rattrapage » — te protège et clarifie.

---

**À l'examen, cette famille de questions revient constamment** : falsifier un rapport, accepter un cadeau, dissimuler une erreur, couvrir un collègue. La réponse est toujours dans le triptyque **divulguer, corriger, refuser** — et l'option qui propose de « négocier un compromis » sur le fond éthique est toujours un distracteur.`,
        },
      ],
      "pmp-mindset-4": [
        {
          id: "pmp-mindset-4-a",
          kind: "application",
          title: "Appliquer la méthode en quatre temps",
          statement: `Applique la méthode — identifier le vrai problème, éliminer les distracteurs, préférer comprendre et communiquer, choisir l'action proactive au bon niveau — à ces trois questions. **Écris les quatre étapes à chaque fois**, pas seulement ta réponse.

**Q1.** Un membre de l'équipe vient vous dire qu'il pense que le projet va échouer. Que faites-vous en premier ?
A. Le rassurer et lui demander de rester concentré sur ses tâches.
B. Lui demander d'expliquer ce qui lui fait penser cela.
C. Convoquer une réunion d'équipe pour clarifier la situation.
D. En informer le sponsor.

**Q2.** En plein sprint, le Product Owner ajoute une user story « urgente » au sprint backlog sans consulter l'équipe. Quelle est la MEILLEURE action ?
A. Retirer la story et rappeler au PO qu'il n'en a pas le droit.
B. Accepter, le PO est responsable du backlog.
C. Faciliter une discussion entre le PO et l'équipe sur l'impact et l'engagement du sprint.
D. Escalader au Scrum Master.

**Q3.** Un livrable a été accepté par le client, mais vous constatez qu'il ne respecte pas une exigence de qualité documentée. Que faites-vous ?
A. Rien, le client a accepté.
B. Corriger discrètement sur la prochaine version.
C. Informer le client de l'écart et proposer un plan de correction.
D. Documenter l'écart dans les leçons apprises.`,
          hint: `Dans chacune des trois, une réponse consiste à **comprendre avant d'agir**, une à **escalader trop vite**, une à **ignorer ou minimiser**, et une à **sur-réagir**. Repère les quatre archétypes.`,
          solution: `**Q1 — la réponse est B.**

**1. Le vrai problème** : quelqu'un détient une information sur un risque, et tu ne sais pas encore laquelle.
**2. Les distracteurs** : A **minimise** — c'est le pire, on écarte un signal ; C **sur-réagit** en portant devant le groupe une inquiétude qu'on n'a pas encore comprise ; D **escalade** avant même de savoir de quoi il s'agit.
**3. Comprendre d'abord** : il peut avoir une information précise et grave, ou une inquiétude diffuse. Ce sont deux situations totalement différentes.
**4. L'action au bon niveau** : une conversation individuelle. Le niveau supérieur viendra peut-être ensuite, une fois qu'on saura.

⚠️ Note que **C n'est pas absurde** — clarifier collectivement est une bonne pratique. Mais pas **en premier**, et pas avant d'avoir compris. C'est ce qui en fait un bon distracteur.

**Q2 — la réponse est C.**

**1. Le vrai problème** : un engagement de sprint pris collectivement est modifié unilatéralement.
**2. Les distracteurs** : A est **autoritaire** et pose le PM en gardien du processus contre le PO ; B est **passif** — le PO est bien responsable du contenu du backlog, mais pas d'imposer une charge à une équipe qui s'est engagée ; D **escalade**, alors que la situation est parfaitement traitable au niveau de l'équipe.
**3. Comprendre et communiquer** : peut-être l'urgence est-elle réelle et justifie un ajustement ; peut-être l'équipe peut-elle absorber la story en en sortant une autre.
**4. L'action** : **faciliter** la discussion. C'est exactement le rôle du chef de projet en contexte agile — il ne tranche pas, il fait se parler ceux qui décident.

Le mot « MEILLEURE » signale ici qu'il faut chercher l'action la plus complète, pas seulement une action correcte.

**Q3 — la réponse est C.**

**1. Le vrai problème** : un écart de qualité documenté existe, et le client n'en a pas connaissance.
**2. Les distracteurs** : A **ignore** et s'abrite derrière l'acceptation formelle ; B est **malhonnête** — « discrètement » est le mot qui disqualifie la réponse ; D est **insuffisant** — documenter sans informer, c'est archiver un problème au lieu de le traiter.
**3. Comprendre et communiquer** : la transparence prime, et le client doit pouvoir décider en connaissance de cause.
**4. L'action** : informer **et** proposer une correction. Informer sans proposition serait se défausser.

C'est la valeur **Honnêteté** du Code d'éthique appliquée à un cas de qualité. L'acceptation du client ne dispense pas de signaler un écart connu.

---

**Les quatre archétypes de distracteurs, valables sur toute question situationnelle** :

**Ignorer ou minimiser** — « rassurer », « ne rien faire », « le client a accepté ». Presque toujours faux.
**Escalader trop vite** — juste seulement si la situation est hors de ton contrôle.
**Sur-réagir** — convoquer, arrêter, annuler, changer le périmètre avant analyse.
**Agir sans comprendre** — décider, corriger ou imposer avant d'avoir évalué.

La bonne réponse est presque toujours celle qui reste : **comprendre, puis agir au bon niveau**.

Cette grille traite correctement une large majorité des questions situationnelles, y compris sur des sujets que tu n'as pas révisés — et c'est pour cela que le mindset vaut plus que la mémorisation.`,
        },
        {
          id: "pmp-mindset-4-b",
          kind: "situation",
          title: "Ta grille personnelle de distracteurs",
          statement: `**Cas situationnel.** Construction d'un outil personnel.

Après une série de 40 questions situationnelles, tu as fait 14 erreurs. Le score n'est pas le sujet : ce qui compte est **pourquoi** tu t'es trompé.

1. reprends tes propres erreurs — ou, si tu n'as pas encore fait de série, fais-en une de 40 questions maintenant
2. pour chaque erreur, écris **trois** choses : la réponse que tu as choisie, pourquoi elle te semblait juste, et pourquoi la bonne l'est davantage
3. **classe** tes erreurs en catégories — tu vas voir apparaître des motifs récurrents
4. écris ta **grille personnelle** : les 4 ou 5 réflexes qui t'auraient évité la majorité de tes erreurs
5. teste ta grille sur une nouvelle série de 20 questions et mesure l'écart

**Le point 3 est le vrai exercice.** Quatorze erreurs isolées, c'est du bruit ; quatorze erreurs classées, ce sont trois problèmes à corriger.`,
          hint: `Les catégories qui reviennent le plus souvent : mauvaise lecture du mot-clé (« en premier », « MEILLEURE »), escalade réflexe, confusion entre le rôle du PM et celui du PO ou du Scrum Master, méconnaissance d'un point de contenu, et réponse « de terrain » plutôt que « PMI way ».`,
          solution: `**Un exemple de classement, sur 14 erreurs**

| Catégorie | Nombre | Ce que ça révèle |
|---|---|---|
| Mot-clé de l'énoncé mal lu | 5 | Problème de **lecture**, pas de connaissance |
| Escalade choisie à tort | 3 | Réflexe de terrain, pas mindset PMI |
| Rôle du PM confondu avec PO / Scrum Master | 2 | Trou de **contenu** sur l'agile |
| Réponse « pragmatique » au lieu de « PMI way » | 2 | Mindset |
| Point de contenu inconnu (EVM, procurement) | 2 | Trou de **connaissance** réel |

**La lecture de ce tableau est plus utile que le score** : 12 erreurs sur 14 ne viennent pas d'un manque de connaissances. Elles viennent de la lecture et du mindset. Réviser davantage de contenu n'aurait presque rien changé.

**Un exemple de grille personnelle**

> **1. Souligner le mot-clé avant de lire les réponses.**
> « En premier », « la MEILLEURE », « le PROCHAIN », « le PLUS approprié », « prédictif » ou « agile ». Ces mots changent la réponse. Je les repère avant de regarder les options — sinon les options orientent ma lecture.
>
> **2. Éliminer d'abord, choisir ensuite.**
> Je barre les réponses qui ignorent, minimisent, blâment ou escaladent sans analyse. Il en reste rarement plus de deux.
>
> **3. L'escalade n'est jamais la première action, sauf si c'est hors de mon contrôle.**
> Test : puis-je comprendre, évaluer ou négocier avant ? Si oui, je ne remonte pas.
>
> **4. Le PM facilite, il ne tranche pas à la place des rôles.**
> En agile : le PO arbitre le contenu, l'équipe s'engage, le Scrum Master protège le processus. Je facilite.
>
> **5. Ce que je ferais vraiment n'est pas toujours ce qu'il faut répondre.**
> Quand une réponse me semble « la plus efficace en vrai » et une autre « la plus propre », c'est presque toujours la seconde.

**5. La mesure**

Une nouvelle série de 20 questions, en appliquant la grille **explicitement** — en écrivant le mot-clé souligné et les réponses éliminées. Le gain typique après ce travail est de 10 à 20 points de pourcentage, obtenus **sans avoir révisé un seul point de contenu supplémentaire**.

---

**Pourquoi cet exercice est le plus rentable de tout le module.**

La plupart des candidats répondent à un mauvais score en révisant davantage. Or si 12 erreurs sur 14 viennent de la lecture et du mindset, réviser trois chapitres de plus ne change rien — et c'est frustrant, parce qu'on travaille beaucoup sans progresser.

**Analyser ses erreurs par catégorie transforme un score en diagnostic**, et un diagnostic en plan d'action ciblé.

Et c'est exactement la démarche que le PMP t'apprend à appliquer à un projet en difficulté : ne pas ajouter des ressources parce que ça va mal, mais **analyser les causes racines** avant de décider quoi corriger. Tu le retrouveras à l'identique au module Process, sur le diagnostic EVM.`,
        },
      ],
    },
    finalExercise: {
      title: "40 questions situationnelles commentées",
      duration: "5 à 7 h",
      covers: ["pmp-mindset-1", "pmp-mindset-2", "pmp-mindset-3", "pmp-mindset-4"],
      brief: `L'examen PMP se joue sur le raisonnement, pas sur la mémoire.

Cet exercice **rassemble les 4 leçons du module** — le mindset PMI (leçon 1), le tailoring (leçon 2), l'éthique (leçon 3), la méthode de réponse (leçon 4).

Le livrable n'est pas un score. C'est **l'analyse écrite de tes erreurs** et la grille personnelle qui en sort. Un candidat qui fait 40 questions sans les analyser a passé deux heures ; un candidat qui en analyse 14 erreurs a gagné plusieurs points à l'examen.`,
      dataset: `Utilise une banque de questions situationnelles couvrant les trois domaines :

- **PMI Study Hall** — la source la plus proche du réel, payante et recommandée si le budget le permet
- **David McLachlan** (YouTube) — des centaines de questions corrigées, gratuit, excellent sur le mindset
- Les quiz de ce parcours, module par module

Prends 40 questions couvrant People, Process et Business, avec **au moins 60 % en contexte agile ou hybride** — c'est la proportion de l'examen 2026.`,
      steps: [
        "**Traite 40 questions situationnelles** couvrant les 3 domaines, chronométrées à 1 min 15 par question pour reproduire la contrainte réelle. (leçon 4)",
        "**Pour chaque erreur, écris trois choses** : la réponse choisie, pourquoi elle semblait plausible, pourquoi la bonne l'est davantage. Écrire est indispensable — relire la correction ne suffit pas. (leçon 4)",
        "**Classe tes erreurs par catégorie** : mot-clé mal lu, escalade réflexe, confusion de rôles, réponse « de terrain », trou de contenu réel. Le classement transforme un score en diagnostic. (leçon 4)",
        "**Identifie les principes de raisonnement récurrents** que tu as violés — il y en a généralement 4 ou 5, et ils reviennent d'une erreur à l'autre. (leçons 1 et 4)",
        "**Vérifie ta cohérence sur les questions de tailoring** : as-tu proposé une approche adaptée au contexte, ou appliqué la même méthode partout ? (leçon 2)",
        "**Repère tes questions d'éthique** : les as-tu toutes traitées par divulguer, corriger ou refuser — ou as-tu cherché un compromis quelque part ? (leçon 3)",
      ],
      checklist: [
        "J'ai chronométré mes 40 questions, je ne les ai pas faites à mon rythme",
        "J'ai écrit l'analyse de chaque erreur, je ne me suis pas contenté de lire la correction",
        "Mes erreurs sont classées par catégorie, pas listées en vrac",
        "Je sais dire quelle proportion de mes erreurs vient de la lecture plutôt que du contenu",
        "Ma grille personnelle tient en 5 réflexes maximum",
        "J'ai retesté ma grille sur une nouvelle série et mesuré l'écart",
      ],
      selfCheck: `Le vrai test : **prends trois questions que tu as ratées, attends une semaine, et refais-les.**

Si tu retombes dans le même piège, ton analyse était une lecture, pas un apprentissage. Si tu les traites correctement **et que tu peux dire à voix haute pourquoi ton ancienne réponse était fausse**, c'est acquis.

Et le test qui compte vraiment : sur ta prochaine série, es-tu capable de repérer le distracteur « escalade au sponsor » **avant** d'avoir lu les quatre réponses ? Quand ce réflexe est automatique, tu as intégré le mindset.`,
    },
    quizExtra: [
      {
        q: "Un développeur bloque sur un bug depuis deux jours. Quelle est l'action attendue par le PMI ?",
        options: [
          "Reprendre le bug toi-même pour débloquer la situation",
          "Lui demander ce qui le bloque et lever l'obstacle, en laissant l'équipe résoudre le problème technique",
          "Réaffecter la tâche à quelqu'un de plus expérimenté",
          "Signaler le retard au sponsor",
        ],
        answer: 1,
        explain:
          "C'est le servant leadership : le PM lève les obstacles — accès manquant, information absente, besoin d'un binôme — mais ne fait pas le travail à la place de l'équipe et ne micro-gère pas. Reprendre le bug soi-même est le réflexe de l'expert technique promu chef de projet, et c'est systématiquement un distracteur à l'examen.",
      },
      {
        q: "Un projet est livré dans les délais et le budget, conforme à la spécification — mais le client ne l'utilise pas. Comment le PMI le considère-t-il ?",
        options: [
          "Réussi : les objectifs de délai, coût et périmètre sont atteints",
          "Échoué : la finalité d'un projet est un bénéfice réalisé, pas un livrable produit",
          "Partiellement réussi, à évaluer au cas par cas",
          "Réussi côté projet, échoué côté client",
        ],
        answer: 1,
        explain:
          "« On crée de la valeur, pas des livrables » est un des principes centraux de PMBOK 7 et 8. Un livrable inutilisé pose trois questions : le besoin réel a-t-il été compris, la conduite du changement a-t-elle été faite, les bénéfices attendus sont-ils mesurés ? C'est aussi ce qui explique la montée du domaine Business Environment à 26 % dans l'ECO 2026.",
      },
      {
        q: "Ton organisation impose Scrum à tous les projets. Le tien est une mise en conformité réglementaire à périmètre figé. Que fais-tu ?",
        options: [
          "Tu appliques Scrum comme demandé, sans commentaire",
          "Tu documentes une décision de tailoring argumentée, en conservant les pratiques agiles qui gardent du sens",
          "Tu refuses et appliques le prédictif de ton côté",
          "Tu appelles « sprints » des tranches de deux semaines pour cocher la case",
        ],
        answer: 1,
        explain:
          "Le tailoring est une décision argumentée et tracée, pas une préférence. Beaucoup de pratiques restent utiles ici : dailies, backlog priorisé, revues avec le juridique, rétrospectives, radiateur d'information. Ce qu'on abandonne, c'est l'engagement de sprint sur périmètre variable et la livraison incrémentale. La quatrième option — faire semblant — est le cargo cult agile, et l'examen le sanctionne.",
      },
      {
        q: "Ton sponsor te demande de présenter un avancement de 75 % alors que le projet est à 62 %. Que fais-tu ?",
        options: [
          "Tu acceptes, c'est sa responsabilité et il rattrapera",
          "Tu refuses de falsifier, et tu proposes de présenter le réel accompagné du plan de rattrapage chiffré",
          "Tu présentes 68 % comme compromis",
          "Tu demandes la consigne par écrit avant d'obéir",
        ],
        answer: 1,
        explain:
          "La valeur Honnêteté du Code d'éthique, et la pression hiérarchique n'est pas une circonstance atténuante. Mais la FORME compte autant que le fond : un refus sec transforme un allié en adversaire. La bonne réponse traite l'objectif réel du sponsor — éviter une panique du comité — en retournant l'argument : le vrai risque est la découverte tardive du retard.",
      },
      {
        q: "Sur 14 erreurs à une série de questions, 12 viennent de la lecture et du mindset. Que dois-tu faire ?",
        options: [
          "Réviser davantage de contenu, c'est le seul moyen de progresser",
          "Travailler la lecture des mots-clés et les réflexes d'élimination — réviser trois chapitres de plus ne changerait presque rien",
          "Refaire la même série jusqu'à obtenir un bon score",
          "Passer à un autre type de questions",
        ],
        answer: 1,
        explain:
          "C'est pourquoi il faut CLASSER ses erreurs et pas seulement compter son score : 14 erreurs isolées sont du bruit, 14 erreurs classées sont trois problèmes à corriger. Le gain typique après ce travail est de 10 à 20 points, obtenu sans réviser un seul point de contenu supplémentaire. C'est la même logique que l'analyse des causes racines avant de corriger un projet en dérive.",
      },
    ],
  },

  // ══ DOMAINE PEOPLE — DIRIGER L'ÉQUIPE (33 %) ══════════════════════════════
  people: {
    lessons: {
      "pmp-people-1": [
        {
          id: "pmp-people-1-a",
          kind: "application",
          title: "Reconnaître la phase de Tuckman",
          statement: `Pour chacune de ces cinq descriptions, identifie la **phase de Tuckman** et dis **ce que le chef de projet doit faire** à ce moment-là.

1. L'équipe est polie, chacun se présente, personne ne conteste rien, et les réunions sont plates.
2. Deux développeurs s'opposent ouvertement sur l'architecture. L'ambiance est tendue.
3. L'équipe a trouvé son rythme, les revues de code se passent bien, chacun sait à qui s'adresser.
4. L'équipe livre sans supervision, résout ses problèmes seule, et te sollicite rarement.
5. Le projet se termine dans trois semaines et la productivité baisse ; les gens parlent de leur prochaine affectation.

Puis réponds : quelle phase les chefs de projet cherchent-ils à éviter, et pourquoi est-ce une erreur ?`,
          hint: `Les cinq phases dans l'ordre : Forming, Storming, Norming, Performing, Adjourning. Le style de leadership adapté change à chaque phase — plutôt directif au début, plutôt délégatif à la fin.`,
          solution: `**1. Forming.** L'équipe se découvre, chacun reste prudent.
*Action du PM* : être **directif**. Clarifier les objectifs, les rôles, les règles. C'est le moment de co-construire la **charte d'équipe** — pas de laisser l'équipe s'auto-organiser, elle n'en a pas encore les moyens.

**2. Storming.** Les désaccords sortent.
*Action du PM* : **accompagner, ne pas étouffer**. Faciliter la confrontation des idées, ramener au problème plutôt qu'aux personnes, rappeler les règles convenues. Le style est **participatif / coaching**.

**3. Norming.** Des normes de fonctionnement se sont installées.
*Action du PM* : **renforcer** ce qui marche, laisser l'équipe prendre des décisions, commencer à s'effacer.

**4. Performing.** L'équipe est autonome et productive.
*Action du PM* : **déléguer**. Se concentrer sur les obstacles externes et la protection de l'équipe. Intervenir peu.

**5. Adjourning** (ou *Mourning*). Dissolution.
*Action du PM* : **reconnaître le travail accompli**, organiser la clôture et les leçons apprises, et traiter la question des affectations suivantes — c'est ce qui explique la baisse de productivité.

---

**La phase que les chefs de projet cherchent à éviter : le Storming.**

C'est une erreur, et une erreur coûteuse. Le Storming est **normal et nécessaire** : c'est là que les désaccords de fond se traitent, que les positions s'ajustent, que la confiance se construit sur du réel plutôt que sur de la politesse.

Une équipe qui saute le Storming — parce que le PM a étouffé les désaccords ou imposé un consensus artificiel — n'atteint jamais le Performing. Elle reste en Forming poli, avec des tensions non dites qui ressortiront plus tard, au pire moment.

**Deux points d'examen** :

Les phases ne sont **pas strictement linéaires** : l'arrivée d'un nouveau membre, un changement de périmètre ou de sponsor peut renvoyer une équipe en Storming. Ce n'est pas une régression, c'est le fonctionnement normal.

Le **style de leadership s'adapte à la phase** — directif au Forming, participatif au Storming, délégatif au Performing. Une question qui décrit une équipe autonome et propose « donner des instructions détaillées » signale un distracteur.`,
        },
        {
          id: "pmp-people-1-b",
          kind: "situation",
          title: "Lancer une équipe distribuée sur trois pays",
          statement: `**Cas situationnel.**

On te confie un projet de 8 mois avec une équipe de 9 personnes réparties sur trois sites : Montréal, Casablanca, Bangalore. Personne ne s'est jamais rencontré. Trois des neuf sont des prestataires externes. Le projet démarre lundi.

Le sponsor te dit : « Tu as une semaine pour lancer l'équipe. Après, on veut voir des livrables. »

1. quelles sont les **trois premières choses** que tu mets en place, et dans quel ordre ?
2. que contient concrètement ta charte d'équipe, sur ce contexte précis ?
3. quel est le risque n° 1 de cette configuration, et comment tu le traites ?
4. le sponsor veut des livrables dès la semaine 2 — que lui réponds-tu ?
5. qu'est-ce qui change parce que trois membres sont des prestataires ?

**Le point 3 concerne les fuseaux horaires**, mais pas de la façon qu'on croit.`,
          hint: `Une équipe distribuée perd la communication informelle — celle qui, en présentiel, résout la moitié des problèmes sans réunion. Tout ce qui était implicite doit devenir explicite. Et pense à ce qu'un fuseau horaire fait à l'équité entre les membres.`,
          solution: `**1. Les trois premières choses, dans l'ordre**

**a) Une réunion de lancement synchrone avec les neuf**, caméras allumées, malgré la contrainte horaire. Objectif : que chacun voie le visage des autres et comprenne qui fait quoi. C'est la seule chose qui ne peut pas être faite en asynchrone.

**b) La charte d'équipe, co-construite** — pas rédigée par toi puis diffusée. Le fait de la construire ensemble est ce qui crée l'adhésion ; le document seul ne vaut rien.

**c) Les canaux et les règles de communication** : quel outil pour quoi, quel délai de réponse attendu, ce qui se décide en asynchrone et ce qui exige une réunion.

**2. Le contenu de la charte, adapté à ce contexte**

Au-delà des valeurs et des règles habituelles, ce contexte impose :

**Les plages de recouvrement horaire.** Montréal, Casablanca et Bangalore ont peu d'heures communes — il faut les identifier et les protéger.

**La rotation des horaires de réunion.** Point décisif, voir le n° 3.

**Le délai de réponse attendu** sur chaque canal — sans quoi chacun invente le sien et l'un attend pendant que l'autre pense avoir répondu vite.

**Le mode de décision** : qui décide quoi, et que fait-on quand on ne peut pas attendre une réunion.

**La langue de travail**, et le droit explicite de demander de reformuler. Sur une équipe multiculturelle, ne pas oser dire « je n'ai pas compris » est un risque réel.

**3. Le risque n° 1 : l'inéquité horaire, pas la difficulté de coordination**

Avec Bangalore, Casablanca et Montréal, il n'existe presque aucun créneau confortable pour tout le monde. Le réflexe naturel est de fixer les réunions à l'heure qui arrange le site du chef de projet — et ce sont toujours les mêmes qui se connectent à 22 h ou à 6 h.

Ce n'est pas un inconfort : c'est une **inéquité systématique** qui produit du désengagement, puis des départs. Et elle est invisible depuis le site du PM.

*Le traitement* : **faire tourner** les horaires de réunion selon un calendrier annoncé, réduire au minimum les réunions synchrones à neuf, et basculer le maximum en asynchrone — comptes rendus écrits, décisions documentées, enregistrements.

Cela relève directement de la valeur **Respect** du Code d'éthique : respecter les différences culturelles et géographiques.

**4. La réponse au sponsor**

> « On aura des livrables en semaine 2, oui. Mais je te propose de considérer le lancement comme le premier livrable : une équipe de neuf personnes réparties sur trois pays qui n'a pas de règles communes produira du travail à refaire. Une semaine investie maintenant nous évite un mois de reprise. Voici ce que je livre en semaine 1 : la charte d'équipe, le plan de communication, et le premier incrément fonctionnel réduit mais réel. »

**Ce que fait cette réponse** : elle ne refuse pas, elle **requalifie**. Elle donne au sponsor ce qu'il cherche — de la visibilité sur une production — tout en protégeant l'investissement de lancement. Et elle propose un incrément réel plutôt qu'un rapport d'avancement.

**5. Ce que change la présence de prestataires**

**Trois choses** :

**L'autorité.** Tu n'as aucun lien hiérarchique avec eux, et leur employeur a ses propres priorités. Les engagements doivent être **contractuels et documentés**, pas seulement convenus oralement.

**L'appartenance.** Le risque est qu'ils se sentent — et soient traités comme — des exécutants extérieurs à l'équipe. Ils participent à la charte, aux rétrospectives et aux reconnaissances comme les autres. Une équipe à deux vitesses ne performe pas.

**La confidentialité et la propriété intellectuelle.** À cadrer explicitement dès le lancement, pas quand le problème se pose.

---

**Ce que cette situation enseigne : en distribué, tout ce qui était implicite doit devenir explicite.** En présentiel, la moitié des problèmes se règlent devant la machine à café. À distance, ce canal n'existe pas — il faut le remplacer par des règles écrites, sinon il n'est remplacé par rien.`,
        },
      ],
      "pmp-people-2": [
        {
          id: "pmp-people-2-a",
          kind: "application",
          title: "Quelle théorie explique quoi",
          statement: `Pour chacune de ces six situations, identifie la **théorie de motivation** qui l'explique le mieux et dis **ce que le chef de projet doit faire**.

1. Après une augmentation générale de 4 %, l'enthousiasme retombe au bout de trois semaines.
2. Un développeur senior s'ennuie ; il fait bien son travail mais sans énergie. Il demande à encadrer un junior.
3. Un membre de l'équipe travaille dans un open space bruyant, avec un poste lent. Il se plaint constamment.
4. Un chef de projet surveille les heures de connexion de son équipe et demande un rapport quotidien.
5. Une nouvelle recrue ne participe à aucune discussion et déjeune seule.
6. Un membre de l'équipe accepte systématiquement les tâches les plus difficiles et veut être jugé sur ses résultats.

Puis : laquelle de ces six situations un chef de projet peut-il traiter **directement**, et laquelle est hors de son pouvoir ?`,
          hint: `Herzberg distingue les facteurs d'**hygiène** — dont l'absence démotive mais dont la présence ne motive pas durablement — des facteurs **motivateurs**. McGregor oppose la théorie X (contrôle) à la théorie Y (confiance). Maslow hiérarchise les besoins, McClelland distingue accomplissement, pouvoir et affiliation.`,
          solution: `**1. Herzberg — facteur d'hygiène.** Le salaire ne motive pas durablement ; son absence ou son insuffisance démotive. Une augmentation produit un effet court puis retombe.
*Action* : ne pas compter sur la rémunération pour motiver. Chercher du côté des **motivateurs** — reconnaissance, responsabilité, accomplissement, intérêt du travail.

**2. Herzberg — motivateur, et McClelland — besoin d'accomplissement.** Il demande une responsabilité nouvelle, pas une prime.
*Action* : lui confier le mentorat. C'est gratuit, cela le remotive, et cela développe le junior. C'est le cas le plus rentable des six.

**3. Herzberg — facteur d'hygiène, et Maslow — besoins de base.** Le bruit et l'outil défaillant sont des conditions de travail.
*Action* : les corriger. Ce ne sont pas des caprices : tant qu'un facteur d'hygiène est dégradé, aucun motivateur ne fonctionne. Mais une fois corrigé, n'espère pas un gain de motivation — juste la fin de la démotivation.

**4. McGregor — théorie X.** Le PM suppose que ses gens ne travailleraient pas sans surveillance.
*Action* : c'est le **PM** qui doit changer, pas l'équipe. Le PMI penche fortement vers la **théorie Y** — les gens sont motivés et responsables — et le contrôle tatillon produit exactement le désengagement qu'il prétend prévenir.

**5. Maslow — besoin d'appartenance, et McClelland — besoin d'affiliation.**
*Action* : l'intégrer socialement — binôme d'accueil, inclusion dans les rituels d'équipe, attention à ce qu'elle ait la parole en réunion.

**6. McClelland — besoin d'accomplissement.**
*Action* : lui donner des objectifs exigeants et un retour fondé sur les résultats. Attention : ce profil supporte mal la micro-gestion et les tâches routinières.

---

**Ce que le PM peut traiter directement, et ce qui lui échappe**

**Directement traitables** : les n° 2, 4, 5 et 6 — mentorat, style de management, intégration, attribution des tâches. Aucun ne coûte d'argent, et ce sont les plus puissants.

**Partiellement** : le n° 3. Un poste de travail se remplace, un open space bruyant relève souvent des services généraux — mais le PM peut négocier, obtenir un casque, autoriser du télétravail.

**Hors de son pouvoir** : le n° 1. Les grilles salariales ne sont pas de son ressort.

**Et c'est le point à retenir** : **les leviers de motivation les plus efficaces sont ceux que le PM contrôle et qui ne coûtent rien** — reconnaissance, responsabilité, autonomie, intérêt du travail. Un chef de projet qui explique qu'il ne peut pas motiver son équipe faute de budget se trompe de théorie.

⚠️ **Piège d'examen** : une question qui propose « demander une prime » ou « augmenter les salaires » comme réponse à un problème de motivation est presque toujours un distracteur — c'est un facteur d'hygiène, et c'est rarement dans le pouvoir du PM.`,
        },
        {
          id: "pmp-people-2-b",
          kind: "situation",
          title: "L'équipe se démobilise après six mois",
          statement: `**Cas situationnel.** Diagnostic.

Ton projet dure depuis six mois. L'équipe livrait bien ; depuis six semaines, tout se dégrade : retards, qualité en baisse, réunions ternes, deux personnes ont posé des congés longs.

Ce que tu observes :
- l'équipe travaille sur la même partie du système depuis quatre mois, une maintenance sans nouveauté
- la direction a annoncé un gel des embauches et des augmentations
- tu as commencé, il y a deux mois, à demander un point d'avancement quotidien écrit, parce que le sponsor exigeait plus de visibilité
- deux membres n'ont eu aucun retour sur leur travail depuis leur arrivée
- la salle de réunion habituelle a été réattribuée ; les points se font debout dans un couloir

1. classe ces cinq observations en **facteurs d'hygiène** et **motivateurs**
2. identifie celle qui est **de ton fait**, et ce que tu en fais
3. propose un plan d'action priorisé — qu'est-ce qui produit le plus d'effet pour le moins de coût ?
4. laquelle ne peux-tu pas traiter, et comment gères-tu quand même ?
5. comment mesures-tu que ton plan a fonctionné ?

**Le point 2 est le plus inconfortable.** Une partie du problème vient de toi.`,
          hint: `Herzberg est la clé de lecture. Mais attention à l'ordre d'action : corriger un facteur d'hygiène ne remotive pas, cela arrête seulement la démotivation. Les deux types de leviers ne se substituent pas.`,
          solution: `**1. Le classement**

**Facteurs d'hygiène** (leur dégradation démotive) :
- le gel des augmentations
- la perte de la salle de réunion, les points debout dans un couloir

**Motivateurs** (leur absence empêche l'engagement) :
- quatre mois sur la même maintenance sans nouveauté — absence d'intérêt et d'accomplissement
- aucun retour sur le travail de deux membres — absence de reconnaissance

**Et un cas à part** : le point d'avancement quotidien écrit. Ce n'est ni l'un ni l'autre — c'est un **glissement vers la théorie X**, un signal de défiance.

**2. Ce qui est de ton fait**

**Le rapport quotidien écrit**, mis en place il y a deux mois — et la dégradation dure depuis six semaines. La corrélation temporelle est difficile à ignorer.

Ton intention était bonne : répondre à une demande de visibilité du sponsor. Mais l'effet perçu par l'équipe est : « il ne nous fait plus confiance ». Un contrôle quotidien individuel sur une équipe qui livrait bien est un message, quoi qu'on en dise.

*Ce que tu en fais* : tu le **supprimes**, et tu le dis explicitement en réunion — « j'ai mis ça en place pour répondre à une demande de reporting, je me suis trompé de solution ». Puis tu satisfais le besoin du sponsor autrement : un tableau d'avancement visible et alimenté automatiquement, ou un point hebdomadaire consolidé.

Reconnaître son erreur devant l'équipe n'affaiblit pas l'autorité — c'est la valeur **Responsabilité** du Code d'éthique, et c'est ce qui rebâtit la confiance le plus vite.

**3. Le plan priorisé — effet le plus fort au coût le plus faible**

**a) Supprimer le rapport quotidien.** Coût nul, effet immédiat, et c'est le signal qui débloque le reste.

**b) Donner du retour aux deux membres qui n'en ont jamais eu.** Coût : deux heures. C'est le motivateur le plus puissant et le plus négligé.

**c) Faire tourner les sujets techniques.** Sortir l'équipe de quatre mois de maintenance : rotation sur les tâches, un chantier d'amélioration choisi par l'équipe, du temps sur la dette technique qui les agace. Coût faible, effet fort sur l'intérêt du travail.

**d) Récupérer un lieu de réunion correct.** Coût faible, mais effet limité : cela arrête une irritation, cela ne remotive pas.

**e) Le gel salarial** — voir le point 4.

**Note l'ordre** : les motivateurs et le retrait du contrôle passent devant les facteurs d'hygiène. Corriger la salle de réunion sans toucher au rapport quotidien ne changerait rien.

**4. Ce que tu ne peux pas traiter : le gel des augmentations**

Il est hors de ton pouvoir. Ce que tu peux faire :

**Ne pas faire semblant.** Une équipe sait quand on lui raconte que tout va bien. Nommer la situation, dire ce que tu ne maîtrises pas.

**Remonter l'impact.** Faire savoir à ta hiérarchie que le gel a un coût sur la rétention — factuel, pas revendicatif.

**Compenser par ce que tu contrôles** : reconnaissance visible, montée en compétence, participation à des sujets valorisants, flexibilité horaire. Ce sont des motivateurs, et Herzberg dit précisément qu'ils ne se remplacent pas par du salaire — mais aussi que le salaire ne les remplace pas.

**5. La mesure**

Pas « l'ambiance semble meilleure ». Des indicateurs :

**Le retour de l'équipe elle-même** : une rétrospective avec une question directe sur ce qui a changé, ou un court sondage anonyme répété.

**Des indicateurs de livraison** : vélocité, taux de retouche, respect des engagements — en les traitant comme des symptômes, pas comme des objectifs.

**Un signal de rétention** : demandes de mutation, absences, turnover.

Et surtout, **remesurer à six semaines**. Un effet immédiat après une réunion franche est normal et ne prouve rien ; ce qui compte est ce qui tient dans la durée.

---

**Le principe : un problème de motivation se diagnostique avant de se traiter.** Le réflexe habituel — organiser un déjeuner d'équipe, demander une prime — traite un symptôme sans savoir quel facteur est en cause. Herzberg et McGregor ne sont pas de la théorie d'examen : ce sont des grilles de lecture qui disent **où** agir.`,
        },
      ],
      "pmp-people-3": [
        {
          id: "pmp-people-3-a",
          kind: "application",
          title: "Cinq modes, cinq situations",
          statement: `Associe à chacune de ces cinq situations le **mode de gestion de conflit** le plus approprié — collaborer, compromis, accommoder, forcer, éviter — et justifie.

1. Deux développeurs s'opposent sur le choix d'une bibliothèque. La décision engage l'architecture pour deux ans.
2. Un incendie est déclaré dans le bâtiment. Un membre de l'équipe conteste la consigne d'évacuation.
3. Le designer et le développeur front s'affrontent sur la teinte exacte d'un bouton, à trois jours de la livraison.
4. Deux membres de l'équipe se sont pris de bec en réunion, à chaud, sur un sujet mineur.
5. Le client veut une fonctionnalité que ton équipe juge techniquement risquée. Les deux positions se défendent.

Puis : quel mode le PMI privilégie-t-il, et quel est le plus mauvais **en général** — avec la nuance qui s'impose ?`,
          hint: `Trois critères guident le choix : l'**importance de l'enjeu**, l'**urgence**, et la **valeur de la relation**. Un enjeu majeur sans urgence appelle un mode différent d'un enjeu mineur sous pression de délai.`,
          solution: `**1. Bibliothèque engageant l'architecture → Collaborer / Résoudre le problème.**
Enjeu majeur, conséquences durables, pas d'urgence immédiate. On prend le temps : critères d'évaluation explicites, prototype comparatif si nécessaire, décision argumentée que les deux comprennent.
C'est le mode **privilégié par le PMI**, et le seul qui produise une solution durable.

**2. Consigne d'évacuation contestée → Forcer.**
Urgence vitale, aucun temps pour discuter. C'est l'un des rares cas où imposer est la bonne réponse.
Le mode « forcer » n'est pas interdit : il est **réservé aux urgences** et aux situations où la sécurité ou une contrainte non négociable est en jeu.

**3. Teinte d'un bouton à trois jours de la livraison → Compromis, ou Accommoder.**
Enjeu mineur, urgence réelle. Passer une heure à chercher la solution parfaite coûte plus que le désaccord lui-même. On tranche vite — souvent en faveur du designer, dont c'est le métier.

**4. Prise de bec à chaud sur un sujet mineur → Éviter, temporairement.**
Le seul cas où « éviter » est correct : laisser retomber la tension avant de traiter. On y revient plus tard, à froid, et alors on collabore.
⚠️ « Éviter » n'est acceptable que si **on y revient**. Éviter définitivement, c'est ignorer un problème — et le PMI ne pardonne jamais cela.

**5. Client contre équipe sur un risque technique → Collaborer.**
Les deux positions sont légitimes : le client a un besoin, l'équipe voit un risque réel. La collaboration cherche ce que le client veut **vraiment** obtenir — souvent atteignable autrement — et documente le risque s'il est accepté.

---

**Le mode privilégié : Collaborer / Résoudre le problème.** C'est le seul gagnant-gagnant, et le seul qui traite la cause.

**Le plus mauvais en général : Éviter / Se retirer**, parce qu'il ne résout rien et laisse le conflit s'aggraver.

**La nuance qui compte à l'examen** : aucun mode n'est mauvais **dans l'absolu**. Éviter est correct pour laisser retomber la tension, forcer est correct en urgence, accommoder est correct quand l'enjeu est mineur pour toi et majeur pour l'autre. La question n'est jamais « quel est le bon mode » mais « quel mode pour **cette** situation ».

Et un rappel utile : **la première source de conflit sur les projets est le désaccord sur les priorités et les ressources**, pas les personnalités. Une question qui présente un conflit comme un problème de caractère invite souvent à chercher la vraie cause ailleurs.`,
        },
        {
          id: "pmp-people-3-b",
          kind: "situation",
          title: "Deux experts, une décision, une échéance",
          statement: `**Cas situationnel.**

Ton architecte et ta responsable sécurité s'opposent frontalement. L'architecte veut déployer une nouvelle API la semaine prochaine ; la responsable sécurité refuse de valider tant qu'un audit externe n'est pas fait — soit trois semaines.

Le contexte :
- la date de mise en service a été annoncée au client il y a deux mois
- les deux ont raison dans leur domaine et te le disent chacun de leur côté
- l'architecte a commencé à te contourner en s'adressant directement au sponsor
- la responsable sécurité n'a pas d'autorité hiérarchique sur le projet, mais un droit de véto en gouvernance

1. quel mode de gestion de conflit choisis-tu, et pourquoi les autres ne conviennent pas ?
2. quelle est ta **première action** concrète ?
3. comment traites-tu le fait que l'architecte te contourne ?
4. quelles solutions intermédiaires la collaboration pourrait-elle faire émerger ?
5. si aucune solution ne se dégage, que fais-tu — et qui décide ?

**Le point 4 est celui qui distingue la collaboration du compromis.** Un compromis coupe la poire en deux ; la collaboration cherche une option que personne n'avait vue.`,
          hint: `Commence par chercher ce que chacun **protège** vraiment, plutôt que ce qu'il demande. L'architecte protège une date, la responsable sécurité protège un risque — ce ne sont pas des positions incompatibles par nature.`,
          solution: `**1. Le mode : Collaborer / Résoudre le problème.**

*Pourquoi les autres ne conviennent pas* :

**Forcer** — tu n'as l'autorité ni sur l'un ni sur l'autre, et imposer créerait un perdant qui te contournera encore.

**Compromis** — « déployons dans deux semaines avec un demi-audit » ne satisfait personne et laisse un risque de sécurité partiellement traité. Sur un enjeu de sécurité, le compromis mou est dangereux.

**Accommoder** — céder à l'un revient à sacrifier soit la date client, soit la sécurité. Aucun n'est acceptable.

**Éviter** — l'échéance approche, le conflit s'aggrave, et l'un des deux est déjà passé au-dessus de toi.

**2. La première action : les réunir, et faire exprimer ce que chacun protège.**

Pas ce qu'il demande — ce qu'il **protège**. C'est la distinction décisive.

L'architecte ne tient pas à « déployer la semaine prochaine » par principe : il protège **l'engagement pris au client** et la crédibilité de l'équipe. La responsable sécurité ne tient pas à « trois semaines d'audit » : elle protège l'organisation contre une **exposition non évaluée**.

Formulé ainsi, ce ne sont plus deux positions incompatibles mais deux objectifs qu'on peut peut-être satisfaire ensemble.

**3. L'architecte qui te contourne**

Tu le traites **en privé, et rapidement** — pas en réunion à trois, ce qui le mettrait en position défensive et rendrait la collaboration impossible.

Le message : tu comprends la pression qu'il ressent, mais contourner le PM fragmente l'information et fait décider le sponsor sans les éléments. Tu lui proposes de porter le sujet ensemble au sponsor si nécessaire.

Et tu regardes ce que ce comportement dit de toi : s'il te contourne, c'est peut-être qu'il n'a pas senti que le sujet avançait. C'est une information sur ta propre réactivité, pas seulement sur son comportement.

**4. Les solutions que la collaboration peut faire émerger**

C'est ici que la collaboration se distingue du compromis. Quelques pistes réelles :

**Déployer en accès restreint** — mise en service pour un groupe pilote interne pendant que l'audit se déroule. La date est tenue au sens « le service existe », le risque reste confiné.

**Auditer en parallèle plutôt qu'en amont**, avec un engagement de correction sous 48 h sur tout point critique.

**Réduire la surface exposée** : ne déployer que les points d'entrée à faible risque, garder les autres derrière une porte fermée jusqu'à l'audit.

**Un audit accéléré ciblé** : trois semaines pour un audit complet, peut-être cinq jours pour un audit ciblé sur les points d'exposition, complété ensuite.

**Renégocier la date avec le client** en expliquant la raison — souvent plus acceptable qu'on ne le croit, surtout quand l'argument est la sécurité de ses propres données.

Aucune de ces options n'est « la moitié de chaque position ». Ce sont des chemins que ni l'un ni l'autre ne proposait.

**5. Si rien ne se dégage**

Tu **escalades** — et c'est ici légitime, parce que la décision dépasse ton autorité : elle arbitre entre un engagement commercial et un risque de sécurité, ce qui relève de la gouvernance.

Mais tu escalades **correctement** :
- avec les deux positions présentées équitablement, pas ta préférence
- avec les options intermédiaires explorées et leur analyse d'impact
- avec une recommandation, si tu en as une, clairement identifiée comme telle
- **conjointement** avec les deux protagonistes, pas dans leur dos

Qui décide : le **sponsor**, ou le comité de gouvernance si le droit de véto sécurité y est formalisé.

---

**Ce que cet exercice entraîne : chercher l'intérêt derrière la position.** C'est le cœur de la négociation raisonnée, et c'est ce qui différencie « collaborer » de « trouver un arrangement ». Deux positions peuvent être incompatibles alors que les intérêts qu'elles protègent ne le sont pas.`,
        },
      ],
      "pmp-people-4": [
        {
          id: "pmp-people-4-a",
          kind: "application",
          title: "Ce que le servant leader lève, et ce qu'il laisse",
          statement: `Voici dix situations remontées par ton équipe. Pour chacune, décide : est-ce un **obstacle que tu lèves**, ou un **problème que l'équipe doit résoudre elle-même** ? Justifie en une ligne.

1. L'accès à l'environnement de test n'est pas accordé depuis dix jours.
2. L'équipe hésite entre deux façons d'implémenter une fonctionnalité.
3. Un autre département refuse de fournir une donnée nécessaire.
4. Une développeuse ne sait pas utiliser un outil que l'équipe a adopté.
5. Le sponsor sollicite directement deux membres de l'équipe plusieurs fois par semaine.
6. L'équipe n'arrive pas à estimer une user story complexe.
7. La licence d'un logiciel indispensable a expiré.
8. Deux membres ne sont pas d'accord sur la définition de « terminé ».
9. Les réunions imposées par la gouvernance consomment 8 h par semaine et par personne.
10. Un membre veut apprendre une technologie utile au projet mais n'a pas de temps dédié.

Puis formule la **règle** qui permet de trancher sans hésiter.`,
          hint: `Demande-toi à chaque fois : est-ce que la solution est **dans le pouvoir de l'équipe** ? Si oui, la lui retirer, c'est la déresponsabiliser. Si non, ne pas agir, c'est la laisser bloquée.`,
          solution: `**Obstacles à lever par le PM** — la solution est hors du pouvoir de l'équipe :

**1. Accès à l'environnement de test** — dépendance externe, relance et escalade si nécessaire.
**3. Département qui refuse une donnée** — négociation inter-services, ce n'est pas à un développeur de la mener.
**5. Sponsor qui court-circuite l'équipe** — protection de l'équipe, cœur du rôle. Tu discutes avec le sponsor, pas avec l'équipe.
**7. Licence expirée** — achat, budget, administratif.
**9. Huit heures de réunions de gouvernance** — négociation avec la gouvernance, l'équipe ne peut pas s'y soustraire seule.
**10. Temps de formation** — arbitrage de charge et de budget, décision de PM.

**Problèmes que l'équipe résout elle-même** — la solution est dans son pouvoir :

**2. Choix d'implémentation** — décision technique, c'est le « comment », domaine réservé de l'équipe auto-organisée.
**4. Outil mal maîtrisé** — entraide interne, binômage. Tu peux faciliter, pas résoudre à sa place.
**6. Estimation difficile** — techniques d'estimation collective, découpage de la story. C'est le travail de l'équipe.
**8. Définition de « terminé »** — l'équipe construit sa *definition of done*. Tu facilites la discussion si elle bloque, tu ne tranches pas.

---

**La règle qui permet de trancher**

> **Si la solution est dans le pouvoir de l'équipe, elle la trouve — tu facilites au besoin. Si la solution est hors de son pouvoir, tu la lèves.**

Autrement dit : **le PM traite l'extérieur, l'équipe traite l'intérieur.**

**Les deux erreurs symétriques, et elles sont aussi graves l'une que l'autre** :

**Le PM qui résout tout** — il tranche les choix techniques, réécrit le code, arbitre les estimations. Il produit une équipe passive qui attend ses décisions, et il devient le goulot d'étranglement du projet.

**Le PM qui ne lève rien** — « l'équipe est auto-organisée, elle se débrouille ». Il laisse une équipe bloquée dix jours sur un accès qu'un mail de sa part aurait débloqué. L'auto-organisation n'est pas l'abandon.

**Le cas n° 5 mérite une attention particulière** : quand le sponsor sollicite directement les membres, le réflexe est parfois de demander à l'équipe de « ne pas répondre ». C'est faux. Le sponsor est une partie prenante puissante, et c'est **au PM** d'aller lui parler — canal de communication, protection du temps de l'équipe, transparence sur ce qu'il cherche à savoir.

Protéger l'équipe est une action du PM **vers l'extérieur**, jamais une consigne donnée à l'équipe.`,
        },
        {
          id: "pmp-people-4-b",
          kind: "situation",
          title: "Le membre isolé qui décroche",
          statement: `**Cas situationnel.**

Ton équipe est répartie entre Paris (6 personnes) et Manille (2 personnes). Depuis six semaines, l'une des deux personnes de Manille :
- parle de moins en moins en réunion, caméra éteinte
- livre en retard, alors qu'elle était parmi les plus fiables
- n'a pas participé aux deux dernières rétrospectives, « à cause de l'horaire »
- a répondu « ça va » aux deux fois où tu lui as demandé

Le reste de l'équipe commence à contourner ces deux personnes : « c'est plus simple de le faire nous-mêmes ».

1. quel est le risque le plus grave ici, et ce n'est pas celui de la personne
2. quelle est ta **première action**, et ce que tu ne fais surtout pas
3. que révèle le comportement du reste de l'équipe ?
4. quelles causes possibles envisages-tu, et comment tu les distingues ?
5. quelles mesures structurelles mets-tu en place, au-delà du cas individuel ?

**Le point 1 est contre-intuitif.** Le problème le plus grave n'est pas le désengagement d'une personne.`,
          hint: `Regarde ce que fait le reste de l'équipe. Un site qui contourne l'autre est en train de créer quelque chose de bien plus difficile à réparer qu'une démotivation individuelle. Et « ça va » répété deux fois n'est jamais une réponse.`,
          solution: `**1. Le risque le plus grave : la scission de l'équipe en deux.**

Le désengagement d'une personne est un problème sérieux mais réversible. Ce qui est en train de se produire est plus grave : **le site principal exclut progressivement le site distant**, avec une justification pratique — « c'est plus simple ».

Une fois installée, cette dynamique s'auto-renforce : moins on les inclut, moins ils sont à jour, plus il devient « logique » de les contourner. Au bout de trois mois, tu n'as plus une équipe distribuée, tu as une équipe et deux prestataires isolés.

C'est le risque n° 1 de toute équipe distribuée, et il est **structurel**, pas individuel.

**2. La première action, et ce qu'il ne faut pas faire**

**Ce qu'il faut faire** : un **échange individuel, en visio, à un horaire qui lui convient à elle** — pas au tien. Sans ordre du jour de suivi de tâches. Une conversation ouverte : ce qui se passe, comment elle vit son travail, ce qui a changé depuis six semaines.

**Ce qu'il ne faut surtout pas faire** :

**Aborder le sujet en réunion d'équipe.** Cela l'humilie et garantit qu'elle ne dira rien.

**Traiter le symptôme livraison.** « Tes livraisons sont en retard, que se passe-t-il ? » transforme la conversation en entretien de performance et ferme la porte.

**Se contenter du « ça va ».** Deux « ça va » consécutifs alors que tous les signaux sont au rouge est en soi une information. La question à poser n'est pas « ça va ? » — dont la réponse polie est toujours oui — mais une question ouverte : « qu'est-ce qui est le plus difficile en ce moment ? »

**Redistribuer son travail.** C'est ce que l'équipe fait déjà, et c'est ce qui accélère l'exclusion.

**3. Ce que révèle le comportement du reste de l'équipe**

Que **le problème n'est pas seulement individuel**. Une équipe qui contourne plutôt que d'alerter signale trois choses :

Les mécanismes de collaboration à distance ne fonctionnent pas — sinon le contournement ne serait pas « plus simple ».

Personne ne s'est senti responsable de remonter le sujet, ce qui interroge la sécurité psychologique.

Et le PM ne l'a pas vu venir pendant six semaines — ce qui interroge la fréquence et la qualité de ses contacts avec le site distant.

**4. Les causes possibles, et comment les distinguer**

**Personnelles** — santé, situation familiale, épuisement. *Indice* : la baisse est globale, pas seulement au travail avec l'équipe.

**Professionnelles internes** — un conflit non dit, un travail devenu inintéressant, un manque de reconnaissance. *Indice* : le désengagement a commencé après un événement identifiable.

**Structurelles** — horaires systématiquement défavorables, exclusion des décisions, information qui n'arrive pas. *Indice* : l'autre personne de Manille montre des signes similaires, plus discrets.

**Externes** — elle cherche ailleurs, ou son employeur (si prestataire) l'affecte partiellement autre part. *Indice* : baisse de disponibilité plus que de qualité.

**La façon de distinguer** : la conversation ouverte, puis vérifier si la seconde personne de Manille présente les mêmes signaux. Si oui, la cause est structurelle et traiter le cas individuel ne servira à rien.

**5. Les mesures structurelles**

Indépendamment du cas individuel, et c'est le vrai livrable :

**Rotation des horaires de réunion**, annoncée et tenue. Une rétrospective à un horaire impossible pour deux personnes n'est pas une rétrospective d'équipe.

**Décisions documentées par écrit**, systématiquement. Une décision prise oralement à Paris n'existe pas à Manille.

**Point individuel régulier avec chaque membre distant** — pas seulement quand ça va mal. C'est ce qui aurait détecté le problème à la deuxième semaine.

**Interdire le contournement** en le nommant : le travail passe par les canaux de l'équipe, y compris quand c'est moins rapide.

**Binômes inter-sites** sur certaines tâches, pour créer du lien de travail réel plutôt que du lien de réunion.

---

**Le principe : dans une équipe distribuée, l'exclusion ne se décide jamais — elle s'installe par commodité.** Personne ne décide d'exclure le site distant ; chacun prend juste, à chaque fois, la décision individuellement raisonnable de faire au plus simple. C'est au PM de rendre l'inclusion structurelle plutôt que volontaire.`,
        },
      ],
      "pmp-people-5": [
        {
          id: "pmp-people-5-a",
          kind: "application",
          title: "La grille pouvoir/intérêt",
          statement: `Positionne ces huit parties prenantes dans la grille **pouvoir / intérêt**, et indique pour chacune la **stratégie d'engagement** correspondante.

1. Le directeur financier, qui a validé le budget mais ne suit pas le projet
2. L'utilisatrice finale qui utilisera l'outil 6 h par jour
3. Le sponsor
4. Le responsable du service juridique, qui doit valider les clauses de confidentialité
5. Un chef de projet d'un autre service, dont le projet dépend du tien
6. Le prestataire qui développe un module périphérique
7. Le délégué du personnel, qui s'inquiète de l'impact sur les postes
8. Le directeur d'une filiale non concernée mais curieuse

Puis identifie **laquelle est la plus souvent sous-estimée**, et ce que ça coûte.`,
          hint: `Les quatre quadrants : **fort pouvoir / fort intérêt** → gérer de près ; **fort pouvoir / faible intérêt** → maintenir satisfait ; **faible pouvoir / fort intérêt** → tenir informé ; **faible pouvoir / faible intérêt** → surveiller. Attention : le pouvoir n'est pas seulement hiérarchique.`,
          solution: `| # | Partie prenante | Pouvoir | Intérêt | Stratégie |
|---|---|---|---|---|
| 3 | Sponsor | Fort | Fort | **Gérer de près** |
| 4 | Juridique | Fort | Moyen à fort | **Gérer de près** — droit de blocage |
| 7 | Délégué du personnel | Fort | Fort | **Gérer de près** |
| 1 | Directeur financier | Fort | Faible | **Maintenir satisfait** |
| 5 | Chef de projet dépendant | Moyen | Fort | **Gérer de près / tenir informé** |
| 2 | Utilisatrice finale | Faible | Très fort | **Tenir informée** |
| 6 | Prestataire module | Faible | Moyen | **Tenir informé** |
| 8 | Directeur curieux | Faible | Faible | **Surveiller** |

**Trois positionnements méritent une explication** :

**Le juridique (4)** a un pouvoir fort qui n'est **pas hiérarchique** : c'est un pouvoir de **blocage**. Il peut arrêter le projet sans avoir aucune autorité sur toi. C'est l'erreur classique de la grille : confondre pouvoir et position dans l'organigramme.

**Le délégué du personnel (7)** est fréquemment mal classé. Sur un projet à impact sur l'emploi, son pouvoir est réel — capacité de mobilisation, obligation de consultation, influence sur l'acceptation. Le placer en faible pouvoir est une erreur qui se paie tard.

**Le directeur financier (1)** a un pouvoir fort mais un intérêt faible : il ne veut pas de reporting détaillé, il veut ne pas avoir de mauvaise surprise. « Maintenir satisfait » signifie ici : information synthétique, régulière, et **jamais de surprise**.

---

**La plus souvent sous-estimée : l'utilisatrice finale (2).**

Elle a peu de pouvoir formel — elle ne valide rien, ne signe rien, n'a aucune autorité sur le projet. Le réflexe est donc de la placer en « tenir informée » et d'en rester là.

**Ce que ça coûte** : c'est elle qui décide, en pratique, si l'outil sera utilisé. Un projet livré dans les délais, dans le budget, conforme à la spécification, et que personne n'utilise, est un projet **échoué** — c'est le principe « on crée de la valeur, pas des livrables ».

Et son pouvoir, faible individuellement, devient considérable collectivement : une adoption qui ne se fait pas est un échec dont personne ne peut être tenu responsable, et que tout le monde constate.

**Deux points d'examen** :

**La grille n'est pas figée.** L'engagement d'une partie prenante évolue — le directeur financier devient très intéressé le jour d'un dépassement budgétaire. On réévalue régulièrement.

**Le pouvoir a plusieurs sources** : hiérarchique, d'expertise, de blocage, de mobilisation, d'influence informelle. Une question qui décrit quelqu'un « sans autorité sur le projet » ne dit pas qu'il est sans pouvoir.`,
        },
        {
          id: "pmp-people-5-b",
          kind: "situation",
          title: "La partie prenante influente qui bloque",
          statement: `**Cas situationnel.**

Ton projet automatise un processus aujourd'hui manuel, géré par le service Comptabilité. Sa directrice, Mme Diallo, est :
- influente, respectée, en poste depuis 18 ans
- officiellement favorable au projet en comité
- systématiquement indisponible pour les ateliers de recueil des besoins
- à l'origine de trois demandes de report du planning, chacune bien argumentée
- entendue par son équipe disant que « ça ne marchera jamais »

Le sponsor te dit : « Passe outre, on n'a pas le temps. »

1. quel est le vrai problème, et pourquoi « passer outre » est une mauvaise réponse
2. positionne-la dans la grille pouvoir/intérêt, et dans une grille d'engagement
3. quelle est ta **première action** ?
4. quelles peuvent être ses raisons réelles, et comment les distinguer ?
5. construis le plan d'engagement — trois actions concrètes

**Le point 4 est le cœur.** Une résistance a toujours une raison, et ce n'est presque jamais celle qu'on suppose.`,
          hint: `Elle dit oui en public et bloque en pratique : c'est une **résistance passive**, la plus difficile à traiter parce qu'elle ne s'affronte pas. Cherche ce qu'elle a à perdre — et souvenez-vous qu'elle est en poste depuis 18 ans sur ce processus.`,
          solution: `**1. Le vrai problème, et pourquoi passer outre échoue**

Le problème n'est pas le planning : c'est une **résistance passive d'une partie prenante à fort pouvoir**. Elle ne s'oppose pas frontalement — elle dit oui et rend l'avancement impossible.

**Pourquoi « passer outre » échoue** :

Tu as besoin de son service pour le **recueil des besoins**. Sans lui, tu construis un outil sur des hypothèses, et il sera rejeté à la livraison.

Elle a l'oreille de son équipe, qui sera l'**utilisatrice finale**. Un outil dont la directrice dit qu'il ne marchera pas ne sera pas adopté, quelle que soit sa qualité.

Et son pouvoir informel — 18 ans, respectée — dépasse largement le périmètre du projet. Se la mettre à dos coûte au-delà de ce projet.

**Passer outre transforme une résistance passive en opposition ouverte.** C'est le pire échange possible.

**2. Le positionnement**

**Grille pouvoir/intérêt** : **fort pouvoir, fort intérêt** — quadrant « gérer de près ». Son pouvoir est à la fois hiérarchique sur les futurs utilisateurs, informel dans l'organisation, et de blocage sur la disponibilité de ses équipes.

**Grille d'engagement** : elle est **résistante** (*resistant*), alors que le niveau souhaité est **soutien** (*supportive*), voire **leader** si on veut réussir l'adoption.

C'est exactement l'objet de la grille d'engagement : comparer **niveau actuel** et **niveau souhaité**, puis planifier les actions pour combler l'écart.

**3. La première action : une rencontre individuelle, en tête-à-tête, sans ordre du jour projet.**

Pas un atelier, pas un comité, pas un mail de relance. Une conversation où l'objectif est **d'écouter**, pas de convaincre.

La question d'ouverture n'est pas « pourquoi n'êtes-vous pas disponible ? » — accusatoire et sans réponse utile — mais quelque chose comme : « ce processus, c'est vous qui l'avez construit. Qu'est-ce qui vous inquiète dans ce qu'on est en train de faire ? »

**4. Les raisons réelles possibles, et comment les distinguer**

**La peur pour son équipe.** Automatiser un processus manuel géré par 8 personnes soulève une question évidente : combien resteront ? Personne ne la pose, et c'est peut-être la vraie.
*Indice* : elle interroge sur le périmètre fonctionnel plutôt que sur la technique.

**La perte d'expertise et de statut.** Dix-huit ans à être **la** référence sur ce processus. L'outil rend cette expertise moins visible.
*Indice* : elle insiste sur la complexité et les cas particuliers que « personne ne connaît ».

**Une expérience passée.** Un projet similaire a échoué il y a cinq ans et son équipe en a payé le prix.
*Indice* : ses objections sont précises et opérationnelles, pas idéologiques.

**Des objections techniques légitimes.** Elle connaît des cas métier que le projet ignore, et ses trois demandes de report étaient « bien argumentées ».
*Indice* : ses arguments résistent à l'examen — et alors ce n'est pas de la résistance, c'est de l'expertise qu'on n'a pas écoutée.

**Comment distinguer** : la conversation ouverte, et prendre ses objections au sérieux plutôt que comme des prétextes. Il est très possible qu'elle ait **raison** sur le fond et que le problème soit que personne ne l'a écoutée.

**5. Le plan d'engagement — trois actions**

**a) Lui donner un rôle, pas une information.** La faire passer de sujet du projet à actrice : membre du comité de pilotage, ou responsable de la validation métier. On ne combat pas une résistance en communiquant davantage — on la retourne en donnant du pouvoir sur le résultat.

**b) Traiter explicitement la question de l'emploi**, avec le sponsor et les RH. Tant qu'elle n'est pas posée, elle empoisonne tout le reste. Si des postes évoluent, le dire ; si personne n'est menacé, l'annoncer clairement et par écrit.

**c) Valoriser son expertise dans le produit.** Faire d'elle et de son équipe la source des règles métier, avec une reconnaissance explicite. Son savoir devient une contribution au lieu d'être une compétence rendue obsolète.

**Et une action de suivi** : réévaluer son niveau d'engagement toutes les deux ou trois semaines. Une résistance qui redevient neutre puis favorable est un indicateur de projet ; une résistance qui persiste malgré ces actions signale qu'on n'a pas trouvé la vraie cause.

---

**Le principe : une partie prenante mal gérée peut faire échouer un projet techniquement réussi.** Et une résistance n'est presque jamais de l'obstruction gratuite — c'est un intérêt légitime qu'on n'a pas identifié. Chercher cet intérêt est plus efficace que renforcer la communication.`,
        },
      ],
    },
    finalExercise: {
      title: "Plan d'engagement et gestion de conflit",
      duration: "4 à 6 h",
      covers: ["pmp-people-1", "pmp-people-2", "pmp-people-3", "pmp-people-4", "pmp-people-5"],
      brief: `Une équipe en tension, des parties prenantes hostiles. Que fais-tu, et dans quel ordre ?

Cet exercice **rassemble les 5 leçons du module** — constitution d'équipe (leçon 1), leadership et motivation (leçon 2), conflits (leçon 3), servant leadership (leçon 4), engagement des parties prenantes (leçon 5).

Le domaine People pèse **33 % de l'examen** — un tiers des questions. Et c'est le domaine où l'expérience professionnelle aide le plus, à condition de traduire ses réflexes de terrain en réflexes PMI, qui ne sont pas toujours les mêmes.`,
      dataset: `Prends un projet réel — le tien, actuel ou passé — ou construis un cas : une transformation qui touche 3 services, 40 personnes impactées, une équipe projet de 10 personnes dont 3 externes, réparties sur 2 sites.

Travailler sur un cas réel vaut mieux : tu connaîtras les vraies raisons des résistances, et c'est précisément ce que l'exercice entraîne.`,
      steps: [
        "**Grille d'engagement** pour 10 parties prenantes : niveau actuel (opposant, résistant, neutre, favorable, leader) contre niveau souhaité. L'écart est ce qui définit le travail à faire. (leçon 5)",
        "**Plan d'actions concrètes pour déplacer 3 parties prenantes résistantes** — en cherchant l'intérêt derrière la position, pas en renforçant la communication. (leçon 5)",
        "**Analyse d'un conflit d'équipe** : identifie la source réelle (priorités et ressources, le plus souvent — pas les personnalités), choisis le mode de résolution et justifie pourquoi les quatre autres ne conviennent pas. (leçon 3)",
        "**Diagnostic de motivation** : sur ton équipe, distingue ce qui relève des facteurs d'hygiène et des motivateurs, et identifie les leviers qui ne coûtent rien et que tu contrôles. (leçon 2)",
        "**Plan de communication** : qui, quoi, quand, par quel canal — avec une attention explicite à l'équité horaire si l'équipe est distribuée. (leçons 1 et 4)",
        "**Liste tes obstacles à lever**, et distingue-les des problèmes que l'équipe doit résoudre elle-même. La règle : ce qui est hors de son pouvoir, tu le lèves ; ce qui est dedans, tu facilites. (leçon 4)",
      ],
      checklist: [
        "Ma grille d'engagement compare bien un niveau actuel à un niveau souhaité, pas seulement pouvoir et intérêt",
        "Pour chaque résistance, j'ai identifié l'intérêt protégé — pas seulement la position exprimée",
        "Mon mode de résolution de conflit est justifié, et je sais dire pourquoi les autres ne conviennent pas",
        "Mes leviers de motivation incluent ceux qui ne coûtent rien et que je contrôle",
        "Mon plan de communication traite l'équité horaire, pas seulement les canaux",
        "Je n'ai mis dans « obstacles à lever » que ce qui est réellement hors du pouvoir de l'équipe",
      ],
      selfCheck: `Le vrai test : **prends ta partie prenante la plus résistante et écris, à la première personne, ce qu'elle dirait si elle était totalement franche avec toi.**

Si tu écris « je ne veux pas de ce projet », tu n'as pas trouvé la raison. Si tu écris « j'ai peur que mon équipe perde son utilité, et que dix-huit ans d'expertise deviennent inutiles », tu l'as trouvée — et tu sais maintenant quoi faire.

Une résistance sans raison identifiée est une résistance qu'on n'a pas comprise. Et on ne traite pas ce qu'on ne comprend pas.`,
    },
    quizExtra: [
      {
        q: "Une équipe traverse une phase de tensions et de désaccords ouverts. Que doit faire le chef de projet ?",
        options: [
          "Intervenir pour imposer le consensus et ramener le calme",
          "Accompagner la confrontation des idées en ramenant au problème plutôt qu'aux personnes — le Storming est nécessaire",
          "Séparer les personnes en conflit dans des sous-équipes",
          "Attendre que la phase passe sans intervenir",
        ],
        answer: 1,
        explain:
          "Le Storming est normal et nécessaire : c'est là que les désaccords de fond se traitent et que la confiance se construit sur du réel. Une équipe dont le PM a étouffé les désaccords n'atteint jamais le Performing — elle reste en Forming poli, avec des tensions non dites qui ressortiront au pire moment. Le style adapté est participatif, ni directif ni absent.",
      },
      {
        q: "Ton équipe se démobilise. Un membre demande à encadrer un junior. Selon Herzberg, de quoi s'agit-il ?",
        options: [
          "D'un facteur d'hygiène : il faut y répondre par une compensation",
          "D'un motivateur — responsabilité et accomplissement — et c'est un levier gratuit que le PM contrôle",
          "D'une demande de promotion à transmettre aux RH",
          "D'un signe de désengagement à surveiller",
        ],
        answer: 1,
        explain:
          "Les motivateurs — reconnaissance, responsabilité, accomplissement, intérêt du travail — sont précisément les leviers que le PM contrôle et qui ne coûtent rien. Les facteurs d'hygiène (salaire, conditions matérielles) démotivent par leur absence mais ne motivent pas durablement par leur présence. Une question qui propose « demander une prime » comme réponse à un problème de motivation est presque toujours un distracteur.",
      },
      {
        q: "Deux membres se sont pris de bec à chaud sur un sujet mineur. Quel mode de gestion de conflit ?",
        options: [
          "Collaborer immédiatement, c'est toujours le meilleur mode",
          "Éviter temporairement pour laisser retomber la tension, puis y revenir à froid",
          "Forcer, pour trancher rapidement",
          "Accommoder en donnant raison au plus ancien",
        ],
        answer: 1,
        explain:
          "C'est le seul cas où « éviter » est correct — et à une condition stricte : qu'on y revienne. Éviter définitivement, c'est ignorer un problème, ce que le PMI ne pardonne jamais. Le principe général : aucun mode n'est mauvais dans l'absolu, la question est toujours « quel mode pour CETTE situation », selon l'enjeu, l'urgence et la valeur de la relation.",
      },
      {
        q: "Ton équipe est bloquée depuis dix jours par un accès non accordé, et hésite par ailleurs entre deux implémentations. Que fais-tu ?",
        options: [
          "Tu traites les deux : tu débloques l'accès et tu tranches le choix technique",
          "Tu lèves l'obstacle de l'accès, et tu laisses l'équipe décider de l'implémentation",
          "Tu laisses l'équipe gérer les deux, elle est auto-organisée",
          "Tu escalades les deux sujets au sponsor",
        ],
        answer: 1,
        explain:
          "La règle du servant leadership : si la solution est dans le pouvoir de l'équipe, elle la trouve — tu facilites au besoin ; si elle est hors de son pouvoir, tu la lèves. Le PM traite l'extérieur, l'équipe traite l'intérieur. Les deux erreurs symétriques sont aussi graves : le PM qui tranche tout produit une équipe passive, celui qui ne lève rien la laisse bloquée dix jours sur un mail qu'il aurait pu envoyer.",
      },
    ],
  },

  // ══ DOMAINE PROCESS — PILOTER LE PROJET (41 %) ════════════════════════════
  process: {
    lessons: {
      "pmp-process-1": [
        {
          id: "pmp-process-1-a",
          kind: "application",
          title: "Ce qui passe par le contrôle des changements",
          statement: `Pour chacune de ces huit demandes, dis si elle nécessite une **demande de changement formelle** ou non, et justifie.

1. Le client veut ajouter un écran de rapport non prévu.
2. Un développeur veut renommer une variable dans le code.
3. L'équipe veut remplacer une bibliothèque par une autre, à fonctionnalité identique et sans impact sur les délais.
4. Le sponsor veut avancer la date de livraison de trois semaines.
5. Une réglementation nouvelle impose un champ supplémentaire dans un formulaire.
6. Un membre de l'équipe est remplacé par un autre, à compétence équivalente.
7. Le client accepte de retirer une fonctionnalité pour tenir les délais.
8. Le fournisseur annonce que son composant coûtera 15 % de plus.

Puis réponds : qu'est-ce qu'on ne fait **jamais**, quelle que soit l'approbation ?`,
          hint: `Le critère est simple : la demande affecte-t-elle une **référence de base** (*baseline*) — périmètre, échéancier, coût — ou un élément du plan de management approuvé ? Une décision purement interne à l'équipe et sans impact sur ces références n'a pas à passer par le processus.`,
          solution: `**Demande de changement formelle requise**

**1. Écran de rapport non prévu** — modification du **périmètre**, donc de sa référence de base. Cas d'école.

**4. Avancer la date de trois semaines** — modification de la référence d'**échéancier**. Le fait que ce soit le sponsor qui le demande ne dispense pas du processus : il faut l'analyse d'impact avant de décider.

**5. Champ imposé par une réglementation** — modification du périmètre. Le caractère obligatoire ne change rien à la procédure : il rend simplement l'approbation quasi certaine. On documente quand même, parce que l'impact délai/coût doit être tracé.

**7. Retirer une fonctionnalité** — c'est un changement de périmètre **même si c'est une réduction**. Erreur fréquente : on croit que seuls les ajouts comptent.

**8. Composant 15 % plus cher** — modification de la référence de **coût**. Émise ici par un événement externe, mais elle suit le même circuit.

**Pas de demande de changement**

**2. Renommer une variable** — décision technique interne, aucun impact sur les références. Le « comment » appartient à l'équipe.

**3. Remplacer une bibliothèque à fonctionnalité et délai identiques** — décision technique sans impact sur les baselines. ⚠️ Attention toutefois : si elle change une contrainte de licence, de sécurité ou de support, elle peut affecter des exigences non fonctionnelles — et alors elle en devient une.

**6. Remplacement d'un membre à compétence équivalente** — gestion de ressources, pas un changement de baseline. Cela peut relever d'une mise à jour du plan de management des ressources, sans passer par le comité de contrôle des changements.

---

**Ce qu'on ne fait jamais : modifier une référence de base sans passer par le processus.**

C'est la règle absolue de la maîtrise intégrée des changements. Une baseline est un point de comparaison ; si on la déplace en silence, on perd toute capacité à mesurer l'écart — et l'EVM, la valeur acquise, n'a plus aucun sens.

**Le circuit complet, dans l'ordre** :

1. la demande est **enregistrée** (registre des changements)
2. son **impact** est évalué sur périmètre, délai, coût, qualité, risques
3. elle est **approuvée ou rejetée** — par le comité de contrôle des changements quand il existe
4. si approuvée, les **références de base sont mises à jour** et les parties prenantes informées
5. le changement est **mis en œuvre**

**Deux pièges d'examen** :

Une question où le sponsor ou le client demande directement un changement propose souvent « accepter, c'est le client » ou « refuser, le périmètre est figé ». Les deux sont faux : la bonne réponse est **évaluer l'impact et faire passer par le processus**.

Et le PM n'approuve généralement pas lui-même : il **analyse et recommande**. C'est le comité, ou le sponsor selon la gouvernance, qui décide.`,
        },
        {
          id: "pmp-process-1-b",
          kind: "situation",
          title: "Le changement déjà commencé",
          statement: `**Cas situationnel.**

Tu découvres en réunion d'avancement que ton équipe travaille depuis **deux semaines** sur une fonctionnalité qui n'est pas au périmètre. En creusant : le client l'a demandée directement à ton développeur senior lors d'un point technique, celui-ci a trouvé « que c'était logique » et s'y est mis.

Le travail est fait à 70 %. Il a consommé environ 15 jours-personnes non budgétés, et deux tâches du chemin critique ont pris du retard.

1. quelle est ta **première action** ?
2. que fais-tu du travail déjà réalisé — on le jette, on le garde ?
3. comment traites-tu le développeur, et le client ?
4. quel processus a échoué, et comment tu le répares
5. que dis-tu au sponsor, et quand ?

**Le point 2 est un piège.** La réponse instinctive — « on jette, ce n'était pas au périmètre » — n'est pas la bonne.`,
          hint: `Ne confonds pas la **décision sur le travail réalisé** et la **correction du processus**. Ce sont deux sujets distincts, et les traiter ensemble mène à une mauvaise décision sur les deux.`,
          solution: `**1. La première action : évaluer, pas réagir.**

Chiffrer précisément : combien a coûté ce travail, quel retard sur le chemin critique, que coûterait l'achèvement, que coûterait l'abandon, et **quelle valeur a réellement cette fonctionnalité** pour le client.

Tant que ces chiffres n'existent pas, toute décision est une opinion. C'est le réflexe constant : **comprendre avant d'agir**.

**2. Le travail réalisé : ni jeter, ni continuer par défaut — soumettre une demande de changement.**

Le piège est de raisonner en termes de faute. « Ce n'était pas au périmètre, donc on jette » est une réaction disciplinaire, pas une décision de gestion.

Les 15 jours-personnes sont **dépensés** : c'est un coût irrécupérable, et il ne doit pas entrer dans la décision. La seule question qui compte est **tournée vers l'avant** : cette fonctionnalité crée-t-elle assez de valeur pour justifier le coût **restant** — les 30 % à finir — plus l'impact sur le chemin critique ?

Trois issues possibles, toutes légitimes :
- la valeur est réelle → on l'intègre au périmètre par une demande de changement approuvée, avec mise à jour des baselines
- la valeur est faible → on arrête, et on documente
- la valeur est réelle mais pas maintenant → on la met au backlog pour une phase ultérieure

**Dans les trois cas, une demande de changement est enregistrée** — même celle qui aboutit à un rejet. C'est ce qui rend la décision traçable.

**3. Le développeur et le client**

**Le développeur** : en privé, et sans en faire une affaire. Il a agi de bonne foi — « ça semblait logique » est une intention de bien faire, pas une désobéissance. Ce qu'il faut établir : toute demande venant du client passe par toi, quelle qu'en soit l'apparente évidence. Et lui expliquer **pourquoi** : ce n'est pas de la bureaucratie, c'est ce qui protège l'équipe d'un périmètre qui s'étend sans ressources supplémentaires.

⚠️ Le sanctionner serait une erreur : cela lui apprendrait à cacher, pas à remonter.

**Le client** : lui rappeler le canal, sans le braquer. Il n'a probablement pas conscience d'avoir fait quoi que ce soit d'irrégulier — il a posé une question à un technicien. C'est **au PM** de tenir le canal, pas au client de le deviner.

**4. Le processus qui a échoué**

Deux, en réalité :

**La maîtrise des changements** n'a pas été appliquée — mais c'est la conséquence, pas la cause.

**La cause réelle est le contrôle du canal de communication.** Le client a un accès direct à l'équipe technique, sans que personne n'ait défini ce qui peut s'y dire. Ce n'est pas un problème de discipline individuelle, c'est un problème de dispositif.

*La réparation* : établir explicitement — dans le plan de communication et rappelé en réunion — que les points techniques avec le client sont ouverts pour **comprendre**, jamais pour **engager**. Toute demande fonctionnelle remonte au PM. Et rendre cela facile : un canal simple pour remonter une demande, sinon la règle sera contournée.

**5. Ce que tu dis au sponsor, et quand**

**Immédiatement.** Pas au prochain comité, pas quand tu auras une solution.

Ce que tu lui dis :
- le fait, sans dramatiser ni minimiser
- l'impact chiffré : 15 jours-personnes, retard sur le chemin critique
- la demande de changement soumise, avec ta recommandation argumentée
- la correction de processus mise en place

**Ce que tu ne fais pas** : attendre d'avoir tout réglé pour en parler. Un sponsor qui découvre un dérapage de périmètre par une autre voie perd confiance durablement — et c'est le réflexe **proactif, jamais réactif**.

---

**Le principe : la dérive de périmètre (*scope creep*) ne survient presque jamais par une grande décision.** Elle s'installe par des petits « c'est logique, on le fait » qui semblent chacun raisonnables. C'est pour cela que le processus existe : non pour empêcher les changements, mais pour qu'ils soient **visibles, évalués et décidés** par ceux qui en portent les conséquences.

Un projet où aucun changement n'est demandé est suspect ; un projet où les changements arrivent sans passer par le processus est en danger.`,
        },
      ],
      "pmp-process-2": [
        {
          id: "pmp-process-2-a",
          kind: "application",
          title: "Construire un WBS conforme",
          statement: `Construis le **WBS** d'un projet de refonte d'un site e-commerce, sur **trois niveaux**.

Contraintes :
1. respecter la **règle des 100 %** : tout le travail, et uniquement ce travail
2. le WBS décompose des **livrables**, pas des actions chronologiques
3. le plus bas niveau contient des **lots de travaux** (*work packages*)
4. inclure la gestion de projet elle-même

Puis identifie **trois erreurs classiques** que ton WBS aurait pu contenir, et vérifie qu'il ne les contient pas.`,
          hint: `Le test qui départage un WBS d'un planning : les éléments sont-ils des **noms** (livrables) ou des **verbes** (actions) ? « Maquettes validées » est un livrable ; « Concevoir les maquettes » est une tâche de planning.`,
          solution: `\`\`\`
1. Refonte du site e-commerce
   1.1 Gestion de projet
       1.1.1 Charte et plan de management
       1.1.2 Suivi et reporting
       1.1.3 Clôture et leçons apprises
   1.2 Conception
       1.2.1 Exigences validées
       1.2.2 Maquettes UX/UI approuvées
       1.2.3 Architecture technique documentée
   1.3 Développement
       1.3.1 Catalogue produits
       1.3.2 Panier et tunnel de commande
       1.3.3 Espace client
       1.3.4 Back-office administrateur
   1.4 Intégrations
       1.4.1 Passerelle de paiement
       1.4.2 Connecteur ERP
       1.4.3 Outil d'analyse d'audience
   1.5 Qualité
       1.5.1 Plan de tests
       1.5.2 Campagne de tests fonctionnels
       1.5.3 Recette utilisateur signée
   1.6 Mise en production
       1.6.1 Environnement de production
       1.6.2 Migration des données
       1.6.3 Documentation et formation
\`\`\`

**Les trois erreurs classiques, et pourquoi ce WBS les évite**

**a) Confondre WBS et planning.** Tous les éléments ci-dessus sont des **livrables** — « Maquettes approuvées », pas « Concevoir les maquettes ». Un WBS ne dit rien de l'ordre ni des durées ; c'est le rôle de l'échéancier, construit **après**.

**b) Oublier la gestion de projet.** C'est le manquement le plus fréquent, et il viole directement la règle des 100 % : le suivi, le reporting et la clôture consomment du travail réel, souvent 10 à 15 % de la charge. Les omettre, c'est sous-estimer le projet de 10 %.

**c) Décomposer trop ou trop peu.** Un lot de travaux doit pouvoir être **estimé, affecté et suivi**. La règle empirique dite « 8/80 » propose entre 8 et 80 heures de travail par lot : en dessous, on gère de la micro-tâche ; au-dessus, on ne sait pas où en est l'avancement.

**La règle des 100 %, dans les deux sens**

Elle est souvent comprise à moitié. Elle dit **tout le travail** — rien d'oublié — **et uniquement ce travail** — rien qui n'appartienne pas au projet.

Le second sens est celui qu'on néglige : un WBS qui contient « Formation continue de l'équipe » ou « Amélioration du processus de recrutement » a dépassé son périmètre, et c'est le point de départ d'une dérive.

**Ce que le WBS rend possible ensuite** : chaque lot de travaux devient l'unité d'estimation de coût, d'affectation de responsabilité (la matrice RACI s'y accroche), et de mesure d'avancement. **Sans WBS, il n'y a pas d'EVM** — la valeur planifiée se calcule sur les lots.

⚠️ Et le **dictionnaire du WBS** accompagne le WBS : pour chaque lot, la description, les critères d'acceptation, le responsable et l'estimation. Le WBS seul est une arborescence de titres ; c'est le dictionnaire qui la rend exploitable.`,
        },
        {
          id: "pmp-process-2-b",
          kind: "situation",
          title: "La dérive qu'on n'a pas vue venir",
          statement: `**Cas situationnel.**

Ton projet est à la semaine 14 sur 20. Le rapport d'avancement dit 68 % terminé, ce qui est cohérent avec le calendrier. Mais tu constates :

- l'équipe travaille toujours sur des tâches de la phase 2, qui devait être close en semaine 11
- le nombre de lots de travaux est passé de 34 à 41 depuis le lancement
- trois de ces sept nouveaux lots ne figurent dans aucune demande de changement
- le budget consommé est à 74 %
- personne n'a l'impression que le projet dérape

1. le projet dérape-t-il ? Prouve-le ou réfute-le, chiffres à l'appui
2. d'où viennent les 7 nouveaux lots, et comment le savoir
3. pourquoi personne ne s'en aperçoit
4. quelles sont les **deux** mesures à prendre immédiatement
5. comment empêches-tu que ça recommence

**Le point 3 est le plus intéressant.** Une dérive qui se voit est déjà à moitié traitée ; celle-ci ne se voit pas.`,
          hint: `Compare deux ratios : l'avancement annoncé et le budget consommé, puis le périmètre initial et le périmètre actuel. Et demande-toi sur quoi les 68 % sont calculés — 68 % de quoi, exactement ?`,
          solution: `**1. Oui, le projet dérape — et doublement**

**Sur les coûts** : 74 % du budget consommé pour 68 % d'avancement. L'écart de 6 points signale une consommation plus rapide que la production de valeur. En termes d'EVM, le CPI est inférieur à 1.

**Sur le périmètre, et c'est plus grave** : les 68 % sont calculés sur **41 lots**, pas sur les 34 d'origine. Rapporté au périmètre initial, l'avancement réel est plus élevé — mais le projet n'est plus le même projet.

**Sur le calendrier** : la phase 2 devait être close en semaine 11, on est en semaine 14 et elle continue. Trois semaines de retard sur 20, non reflétées dans le chiffre d'avancement.

**Le vrai problème** : le rapport d'avancement compare le projet à **lui-même tel qu'il est devenu**, pas à sa référence de base. C'est exactement pourquoi on ne modifie jamais une baseline sans passer par le processus.

**2. D'où viennent les 7 nouveaux lots**

Quatre sont couverts par des demandes de changement — donc légitimes, mais la baseline a-t-elle été mise à jour ? Si elle ne l'a pas été, l'avancement est calculé sur un périmètre étendu contre un budget d'origine.

**Trois n'ont aucune trace.** C'est la dérive de périmètre au sens strict. Pour en trouver l'origine : reprendre le registre des changements, comparer le WBS actuel au WBS de référence lot par lot, et demander à l'équipe **sans chercher de coupable** d'où viennent ces trois lots. Ils sont presque toujours nés d'une bonne intention — « le client a demandé », « c'était logique », « ça ne prenait que deux jours ».

**3. Pourquoi personne ne s'en aperçoit**

Trois mécanismes se combinent :

**Chaque ajout est individuellement raisonnable.** Personne n'a jamais décidé d'étendre le périmètre de 20 % ; sept personnes ont chacune décidé d'ajouter quelque chose de petit.

**L'indicateur d'avancement suit le périmètre.** Ajouter un lot **et** le travail correspondant ne fait pas bouger le pourcentage — le dénominateur grandit en même temps que le numérateur. **Un pourcentage d'avancement sur un périmètre mouvant ne mesure rien.**

**L'équipe est occupée et productive.** Rien ne ressemble moins à un projet en dérive qu'une équipe qui travaille dur sur des choses utiles.

C'est ce qui rend cette dérive dangereuse : tous les signaux qualitatifs sont au vert.

**4. Les deux mesures immédiates**

**a) Geler le périmètre et régulariser.** Comparer WBS actuel et WBS de référence, identifier les trois lots non tracés, et soumettre pour chacun une demande de changement rétroactive — approuvée ou rejetée. Ceux qui sont approuvés entraînent une **mise à jour formelle des baselines** de périmètre, de coût et de délai.

**b) Recalculer l'avancement sur la référence de base.** Produire le vrai chiffre : où en est-on par rapport au projet **engagé**, pas par rapport au projet devenu. C'est ce chiffre qui va au sponsor.

**5. Empêcher la récidive**

**Un point de contrôle du périmètre** à chaque revue d'avancement : le nombre de lots a-t-il changé depuis la dernière fois ? Une question, dix secondes, et la dérive devient impossible à manquer.

**Toujours rapporter l'avancement à la baseline**, jamais au périmètre courant. Et afficher les deux chiffres quand ils diffèrent.

**Rendre la demande de changement facile.** Une procédure lourde n'empêche pas les changements : elle les rend clandestins. Si soumettre une demande prend deux semaines, l'équipe fera « juste ce petit truc » sans le dire.

**Nommer la règle explicitement à l'équipe** : tout travail non prévu, même de deux jours, remonte au PM. Et expliquer pourquoi — c'est ce qui protège l'équipe d'un périmètre qui s'étend sans ressources.

---

**Le principe : la dérive de périmètre ne se voit pas dans les indicateurs qui la subissent.** Un pourcentage d'avancement, une vélocité, un budget consommé — tous se recalibrent silencieusement sur le nouveau périmètre. Le seul indicateur qui la révèle est la **comparaison à la référence de base**, et c'est précisément celui qu'on cesse de regarder quand tout semble aller bien.`,
        },
      ],
      "pmp-process-3": [
        {
          id: "pmp-process-3-a",
          kind: "application",
          title: "Le calcul EVM complet",
          statement: `Un projet de **200 000 €** sur **20 semaines**. À la fin de la **semaine 12** :

- le travail planifié à cette date représentait **60 %** du projet
- le travail réellement accompli représente **50 %** du projet
- le coût réel engagé est de **115 000 €**

Calcule et **interprète** :
1. PV, EV, AC
2. CV et SV — écarts de coût et de délai
3. CPI et SPI — indices de performance
4. EAC, en supposant que la performance actuelle se maintient
5. ETC et VAC
6. le TCPI pour tenir le budget initial

Puis rédige **une phrase de langage métier** que le sponsor comprendra, sans aucun sigle.`,
          hint: `PV = BAC × % planifié. EV = BAC × % réalisé. Retiens la logique plutôt que les formules : les **écarts** sont des soustractions (EV moins quelque chose), les **indices** sont des divisions (EV divisé par quelque chose). Et dans les deux cas, EV vient toujours en premier.`,
          solution: `\`\`\`
BAC (budget à l'achèvement) = 200 000 €

1. PV = 200 000 × 0,60 = 120 000 €
   EV = 200 000 × 0,50 = 100 000 €
   AC =                  115 000 €

2. CV = EV − AC = 100 000 − 115 000 = −15 000 €   -> dépassement de coût
   SV = EV − PV = 100 000 − 120 000 = −20 000 €   -> retard sur l'échéancier

3. CPI = EV / AC = 100 000 / 115 000 = 0,87
   SPI = EV / PV = 100 000 / 120 000 = 0,83

4. EAC = BAC / CPI = 200 000 / 0,87 = 229 885 €

5. ETC = EAC − AC = 229 885 − 115 000 = 114 885 €
   VAC = BAC − EAC = 200 000 − 229 885 = −29 885 €

6. TCPI = (BAC − EV) / (BAC − AC) = 100 000 / 85 000 = 1,18
\`\`\`

**L'interprétation, indicateur par indicateur**

**CV = −15 000 €** : on a dépensé 15 000 € de plus que la valeur produite. **Un écart négatif est toujours mauvais.**

**SV = −20 000 €** : on a produit 20 000 € de valeur de moins que prévu à cette date. Le retard est exprimé en euros, ce qui déroute — c'est la limite de l'indicateur, il ne dit pas combien de semaines.

**CPI = 0,87** : chaque euro dépensé produit 87 centimes de valeur. **Un indice inférieur à 1 est toujours mauvais.**

**SPI = 0,83** : on avance à 83 % du rythme prévu.

**EAC = 229 885 €** : si rien ne change, le projet coûtera près de 230 000 € au lieu de 200 000.

**VAC = −29 885 €** : le dépassement final prévisible, soit **15 % au-dessus du budget**.

**TCPI = 1,18** : pour tenir malgré tout les 200 000 €, il faudrait produire 1,18 € de valeur par euro dépensé sur tout le reste du projet — alors qu'on est à 0,87 aujourd'hui.

**C'est le TCPI qui porte le vrai message** : passer de 0,87 à 1,18 représente une amélioration de performance de 36 %. C'est **irréaliste** sans changement structurel du projet. Le TCPI est l'indicateur qui transforme « on va essayer de rattraper » en « voici ce qu'il faudrait, et ce n'est pas atteignable ».

**La phrase pour le sponsor, sans sigle**

> À mi-parcours, nous avons dépensé 115 000 € pour produire l'équivalent de 100 000 € de travail, et nous avons environ deux semaines de retard. Si la tendance se maintient, le projet coûtera 230 000 € au lieu de 200 000 — soit 15 % de plus. Tenir le budget initial supposerait de travailler 36 % plus efficacement sur toute la seconde moitié, ce qui n'est pas réaliste sans réduire le périmètre ou ajouter des moyens.

**Les moyens mnémotechniques qui évitent les erreurs de calcul**

**EV vient toujours en premier** dans les écarts comme dans les indices.
**Variance = soustraction, Index = division.**
**Négatif ou inférieur à 1 = mauvais**, dans tous les cas.

⚠️ **L'EAC a plusieurs formules** selon l'hypothèse retenue. Celle utilisée ici — \`BAC / CPI\` — suppose que la performance actuelle **se maintient**. Si l'écart est jugé ponctuel et non reproductible, on utilise \`EAC = AC + (BAC − EV)\`, ce qui donne ici 215 000 €. À l'examen, l'énoncé précise toujours l'hypothèse : **lis-la avant de calculer**.`,
        },
        {
          id: "pmp-process-3-b",
          kind: "situation",
          title: "Quatre projets, quatre diagnostics",
          statement: `**Cas situationnel.** Diagnostic et décision.

Tu reprends un portefeuille de quatre projets. Voici leurs indicateurs à mi-parcours :

| Projet | CPI | SPI | BAC | AC |
|---|---|---|---|---|
| **A** | 1,05 | 0,78 | 400 k€ | 180 k€ |
| **B** | 0,72 | 1,10 | 250 k€ | 160 k€ |
| **C** | 0,95 | 0,96 | 600 k€ | 300 k€ |
| **D** | 1,00 | 1,00 | 150 k€ | 75 k€ |

1. diagnostique chaque projet en une phrase
2. classe-les par **niveau d'inquiétude**, du plus au moins préoccupant
3. pour A et B, quelle est la cause la plus probable, et quelle action proposes-tu ?
4. le projet D est-il vraiment sain ? Qu'est-ce que les indicateurs ne disent pas ?
5. quelle information te manque pour décider, dans tous les cas ?

**Le point 4 est le piège.** Des indicateurs parfaits ne signifient pas un projet sain.`,
          hint: `CPI et SPI se lisent ensemble et racontent une histoire différente selon leur combinaison. Et souviens-toi que l'EVM ne mesure que trois choses : coût, délai et valeur produite. Ce qu'il ne mesure pas est souvent ce qui tue un projet.`,
          solution: `**1. Le diagnostic de chacun**

**A — CPI 1,05 / SPI 0,78** : coûts maîtrisés, voire meilleurs que prévu, mais **retard important** — 22 % en dessous du rythme planifié.

**B — CPI 0,72 / SPI 1,10** : **dépassement de coût sévère** (28 % de valeur perdue par euro dépensé), mais en avance sur le calendrier.

**C — CPI 0,95 / SPI 0,96** : légèrement en dessous sur les deux axes. Écart faible, à surveiller.

**D — CPI 1,00 / SPI 1,00** : exactement conforme au plan.

**2. Le classement par inquiétude**

**B est le plus préoccupant.** Un CPI de 0,72 est très dégradé, et l'EAC projeté donne 250 / 0,72 ≈ **347 k€** au lieu de 250 k€ — près de 40 % de dépassement. Le fait d'être en avance ne compense rien : l'avance se rattrape, un budget dépassé ne se récupère pas.

**Puis A.** Un SPI de 0,78 signale un retard sérieux. Mais le CPI supérieur à 1 laisse une marge de manœuvre : on peut envisager de **dépenser pour accélérer** (compression, ajout de ressources), ce que le projet B ne peut pas se permettre.

**Puis C.** Écarts faibles, mais ils vont dans le même sens sur les deux axes et méritent d'être compris avant qu'ils ne se creusent.

**Enfin D**, en apparence.

**3. Les causes probables et les actions**

**Projet A** — coûts bons, calendrier mauvais. Causes typiques : sous-effectif, dépendance externe bloquante, ou tâches du chemin critique mal estimées en durée.
*Action* : identifier ce qui bloque **sur le chemin critique**, puis envisager la **compression** (*crashing* — ajouter des ressources, ce que le CPI permet) ou le **fast tracking** (paralléliser, ce qui augmente le risque). Le CPI favorable est ici un actif : il finance l'accélération.

**Projet B** — en avance mais ruineux. Cause classique : on a accéléré en **achetant de la vitesse** — heures supplémentaires, ressources plus chères, sous-traitance d'urgence. Autre cause possible : une sous-estimation initiale du budget.
*Action* : arrêter l'accélération, qui n'est pas nécessaire puisqu'on est en avance. Analyser l'origine du surcoût, et surtout **calculer le TCPI** : si tenir le budget exige une performance irréaliste, il faut arbitrer maintenant — périmètre, budget complémentaire, ou acceptation du dépassement.

**4. Le projet D est-il sain ? — le piège**

**Ses indicateurs sont parfaits, ce qui devrait éveiller la méfiance.** Un CPI et un SPI exactement à 1,00 à mi-parcours est statistiquement rare. Deux hypothèses :

**Les données sont fausses ou complaisantes.** L'avancement est peut-être déclaré « conforme au plan » par habitude, sans mesure réelle. C'est extrêmement fréquent.

**Ou le projet est réellement dans les clous** — ce qui est possible et alors excellent.

**Et surtout, l'EVM ne mesure que trois choses : coût, délai, valeur produite.** Il ne dit **rien** de :
- la **qualité** — on peut être dans les temps et le budget en accumulant de la dette et des défauts
- la **satisfaction des parties prenantes**
- les **risques** — un risque majeur non traité n'apparaît dans aucun indice
- l'**équipe** — épuisement, départs à venir
- et surtout : le projet produira-t-il encore la **valeur métier** attendue ?

Un projet à CPI 1,00 dont le marché a changé et qui livrera un produit sans client est un projet à arrêter, quels que soient ses indicateurs.

**5. L'information manquante, dans tous les cas**

**La tendance.** Un CPI de 0,72 qui s'améliore depuis trois mois et un CPI de 0,72 qui se dégrade racontent deux histoires opposées. **Un indicateur ponctuel ne dit rien ; une courbe dit tout.**

Il manque aussi : le registre des risques, l'état de la qualité, la position des parties prenantes, et la **cause** des écarts — l'EVM signale un problème, il ne l'explique jamais.

---

**Le principe : l'EVM est un détecteur, pas un diagnostic.** Il dit **où** regarder et **avec quelle urgence**. Il ne dit jamais **pourquoi**, et il ignore tout ce qu'il ne mesure pas. Un chef de projet qui pilote uniquement au CPI et au SPI pilote avec deux instruments sur un tableau de bord qui en compte dix.`,
        },
      ],
      "pmp-process-4": [
        {
          id: "pmp-process-4-a",
          kind: "application",
          title: "RACI, qualité, et les deux nivellements",
          statement: `Trois exercices courts sur les points les plus testés de cette leçon.

**1. Matrice RACI.** Construis-la pour 4 activités — recueil des exigences, développement, recette, mise en production — et 5 rôles : chef de projet, développeur, testeur, sponsor, utilisateur métier. Puis énonce la règle qui rend une RACI valide.

**2. Qualité et grade.** Classe ces quatre situations : problème de qualité, problème de grade, ou ni l'un ni l'autre ?
- un logiciel gratuit avec peu de fonctions, qui ne plante jamais
- un logiciel complet avec de nombreuses fonctions, qui plante une fois par jour
- un stylo à 1 € qui écrit correctement
- une voiture haut de gamme dont la climatisation tombe en panne

**3. Nivellement.** Explique la différence entre *resource leveling* et *resource smoothing*, et dis lequel peut allonger la durée du projet.`,
          hint: `Pour la RACI, la règle porte sur le **A**. Pour qualité/grade : la qualité est la conformité aux exigences, le grade est le niveau de fonctionnalités. Pour le nivellement : l'un accepte de bouger la date de fin, l'autre non.`,
          solution: `**1. La matrice RACI**

| Activité | Chef de projet | Développeur | Testeur | Sponsor | Utilisateur métier |
|---|---|---|---|---|---|
| Recueil des exigences | **A** | C | I | I | **R** |
| Développement | **A** | **R** | C | I | I |
| Recette | **A** | C | **R** | I | C |
| Mise en production | **A** | **R** | C | **A/I** | I |

**La règle qui rend une RACI valide : un seul A par activité.**

**Accountable** = celui qui rend des comptes, qui répond du résultat. S'il y en a deux, personne ne l'est vraiment — chacun suppose que l'autre s'en occupe. C'est le point le plus testé à l'examen.

**Responsible** = celui qui **fait** le travail. Il peut y en avoir plusieurs.
**Consulted** = consulté avant, dans un échange à double sens.
**Informed** = informé après, à sens unique.

⚠️ Piège fréquent : confondre C et I. « Consulté » signifie que son avis est demandé **avant** la décision ; « informé » signifie qu'il apprend la décision **après**. Mettre en I quelqu'un qui devrait être en C est une source classique de conflit.

**2. Qualité et grade**

**Logiciel gratuit, peu de fonctions, ne plante jamais** → **grade bas, qualité haute**. Parfaitement acceptable.

**Logiciel complet qui plante une fois par jour** → **grade haut, qualité basse**. **Inacceptable.**

**Stylo à 1 € qui écrit correctement** → **grade bas, qualité haute**. Acceptable — c'est l'exemple canonique.

**Voiture haut de gamme dont la climatisation lâche** → **grade haut, qualité basse**. Inacceptable.

**La règle : un grade bas peut être acceptable, une qualité basse ne l'est jamais.** Le grade est un choix ; la qualité est une conformité aux exigences annoncées.

**3. Nivellement et lissage**

**Resource leveling (nivellement)** : on ajuste le planning pour respecter une **contrainte de disponibilité** des ressources — une personne ne peut pas être sur deux tâches à la fois, ou l'équipe ne peut pas dépasser 5 personnes.
→ **Peut allonger la durée du projet** et modifier le chemin critique. C'est le prix à payer pour tenir la contrainte.

**Resource smoothing (lissage)** : on ajuste à l'intérieur des **marges disponibles** uniquement, pour éviter les pics de charge.
→ **Ne modifie ni la date de fin ni le chemin critique**, puisqu'on ne touche qu'aux tâches qui ont du flottement.

**Le moyen de retenir** : *leveling* accepte de bouger la fin, *smoothing* ne le peut pas. Le lissage est plus doux et plus limité ; le nivellement est plus puissant et plus coûteux.

**Un dernier point sur la qualité, souvent testé** : **prévention plutôt qu'inspection**. Il coûte moins cher de concevoir sans défaut que de détecter après coup — et le coût de la non-qualité **augmente** avec le moment de la découverte. Un défaut trouvé en conception coûte une unité, en développement dix, en production cent. Une question qui propose « renforcer les tests » contre « améliorer le processus en amont » attend généralement la seconde.`,
        },
        {
          id: "pmp-process-4-b",
          kind: "situation",
          title: "Le taux de défauts qui ne baisse pas",
          statement: `**Cas situationnel.**

Depuis quatre mois, ton projet livre en moyenne 23 défauts par version en recette. Tu as déjà :
- doublé l'effectif de test
- ajouté une seconde campagne de tests avant chaque livraison
- mis en place un tableau de suivi des défauts

Le taux ne baisse pas. La recette prend de plus en plus de temps, l'équipe de développement est agacée d'être « celle qui fait des bugs », et le client commence à s'inquiéter.

1. pourquoi les trois actions déjà prises n'ont-elles rien changé ?
2. quelle démarche adoptes-tu, et quels outils qualité utilises-tu ?
3. que cherches-tu précisément dans les données de défauts existantes ?
4. quelle est l'erreur de posture à éviter avec l'équipe de développement ?
5. comment mesures-tu que ta correction fonctionne ?

**Le point 1 contient tout l'exercice.** Les trois actions ont un point commun.`,
          hint: `Les trois actions déjà prises agissent au même endroit du processus. Demande-toi si elles **empêchent** les défauts ou si elles les **trouvent**. Et rappelle-toi le principe : prévention plutôt qu'inspection.`,
          solution: `**1. Pourquoi rien n'a changé**

**Les trois actions sont de l'inspection, pas de la prévention.**

Doubler les testeurs, ajouter une campagne, suivre les défauts : tout cela améliore la **détection**. Aucune n'agit sur la **production** des défauts. On trouve mieux les mêmes bugs — mais on en fabrique toujours autant.

C'est le principe central de la qualité selon le PMI : **la prévention prime sur l'inspection**. Inspecter davantage augmente le coût sans réduire la cause, et le coût de la non-qualité croît avec le moment de la découverte.

Effet secondaire visible ici : la recette s'allonge et l'équipe se sent accusée — l'inspection renforcée dégrade la relation sans améliorer le produit.

**2. La démarche et les outils**

**Analyser les causes racines**, avec deux outils complémentaires :

**Le diagramme de Pareto (80/20)** — classer les défauts par type et par fréquence. On découvre presque toujours que **20 % des types de défauts représentent 80 % du volume**. Cela transforme « 23 défauts » en « trois problèmes à traiter ».

**Le diagramme d'Ishikawa (cause-effet)** — pour chacun de ces trois types dominants, remonter aux causes selon les grandes familles : méthode, main-d'œuvre, matériel, milieu, mesure. Ou simplement les **5 pourquoi**.

Puis **corriger en amont** : si 40 % des défauts viennent d'exigences ambiguës, la solution n'est pas de tester plus, c'est de clarifier les critères d'acceptation. Si 30 % viennent d'un même module mal conçu, la solution est de le refactoriser.

**3. Ce que tu cherches dans les données existantes**

Tu as quatre mois d'historique — c'est un actif largement sous-exploité.

**La répartition par type** : régression, exigence mal comprise, erreur d'intégration, cas limite non géré, environnement de test.

**La répartition par composant** : les défauts se concentrent-ils sur une zone du produit ?

**Le moment d'introduction** : le défaut vient-il de la conception, du développement, ou de l'intégration ? C'est l'information la plus utile et celle qu'on collecte le moins.

**Le caractère répétitif** : combien de défauts sont des **régressions** — des choses qui marchaient et qui ont cassé ? Un taux élevé de régressions pointe vers l'absence de tests automatisés, ce qui est une cause structurelle.

**4. L'erreur de posture à éviter**

**Traiter le taux de défauts comme un problème de performance de l'équipe de développement.**

Elle est déjà agacée d'être « celle qui fait des bugs ». Renforcer cette lecture produirait deux effets, tous deux mauvais : la sous-déclaration des défauts, et une opposition entre développement et test alors qu'ils ont le même objectif.

**La bonne posture** : un défaut est un problème de **processus**, pas de personne. On analyse le système qui produit les défauts, pas les individus. Et on associe l'équipe de développement à l'analyse — ce sont eux qui savent pourquoi un type de bug revient.

C'est la même logique que le post-mortem sans coupable : chercher un responsable appauvrit l'analyse.

**5. La mesure**

**Pas le nombre de défauts trouvés** — c'est un indicateur d'inspection, et il peut monter si on teste mieux.

Les bons indicateurs :

**Le taux de défauts par point de fonction ou par lot livré**, à volume comparable.

**La proportion de défauts par type dominant** : le type n° 1 du Pareto régresse-t-il ?

**Le moment de détection** : les défauts sont-ils trouvés plus tôt qu'avant ? Un défaut trouvé en conception coûte cent fois moins qu'en production.

**Le coût de la non-qualité** : temps passé en reprise, rapporté au temps de production.

Et **suivre la tendance**, pas le chiffre du mois — un indicateur ponctuel ne dit rien.

---

**Le principe : quand une action corrective ne produit rien, la question n'est pas « faut-il en faire plus » mais « agit-elle sur la bonne cause ».** Doubler les testeurs après avoir déjà doublé les testeurs est le réflexe qui coûte le plus cher en gestion de projet — c'est exactement l'équivalent d'ajouter des ressources à un projet en retard.`,
        },
      ],
      "pmp-process-5": [
        {
          id: "pmp-process-5-a",
          kind: "application",
          title: "Classifier les risques et choisir la réponse",
          statement: `Pour chacun de ces huit risques : est-ce une **menace** ou une **opportunité**, quelle **réponse** choisis-tu parmi les stratégies disponibles, et quelle **réserve** le couvre s'il se réalise ?

1. Le fournisseur du composant principal pourrait faire faillite.
2. Une nouvelle version de la bibliothèque utilisée pourrait diviser par deux le temps de traitement.
3. Un membre clé de l'équipe pourrait partir.
4. Le taux de change pourrait évoluer défavorablement sur un achat en dollars.
5. Le client pourrait vouloir étendre le contrat à deux autres filiales.
6. Un incendie pourrait détruire le centre de données.
7. La réglementation pourrait changer pendant le projet.
8. Un concurrent pourrait sortir un produit similaire avant vous.

Puis : quelle est la différence entre **réserve de contingence** et **réserve de management**, et qui peut engager chacune ?`,
          hint: `Réponses aux menaces : **éviter, transférer, atténuer, accepter**, plus **escalader**. Réponses aux opportunités : **exploiter, partager, améliorer, accepter**, plus **escalader**. Le choix dépend de la probabilité, de l'impact, et du coût de la réponse.`,
          solution: `| # | Risque | Type | Réponse | Réserve |
|---|---|---|---|---|
| 1 | Faillite fournisseur | Menace | **Atténuer** — qualifier un second fournisseur | Contingence |
| 2 | Bibliothèque plus rapide | Opportunité | **Exploiter** — planifier la migration | Contingence (positive) |
| 3 | Départ d'un membre clé | Menace | **Atténuer** — documentation, binômage | Contingence |
| 4 | Taux de change | Menace | **Transférer** — couverture de change | Contingence |
| 5 | Extension à deux filiales | Opportunité | **Améliorer** — préparer une offre, concevoir modulaire | Contingence |
| 6 | Incendie du centre de données | Menace | **Transférer** — assurance, redondance | **Management** |
| 7 | Changement de réglementation | Menace | **Escalader** ou accepter, selon le périmètre | Management |
| 8 | Concurrent plus rapide | Menace | **Escalader** — hors du périmètre du projet | Management |

**Quelques choix méritent une explication**

**Le n° 1** pourrait aussi relever de **l'évitement** si l'on change de fournisseur immédiatement — mais c'est coûteux pour un risque non certain. Atténuer en qualifiant une alternative est proportionné.

**Le n° 5** est une opportunité qu'on ne peut pas **exploiter** — on ne décide pas à la place du client. On l'**améliore** : augmenter la probabilité qu'elle se réalise, en concevant modulaire et en préparant l'offre.

**Le n° 6** est le cas type du **transfert** par assurance. Sa probabilité est très faible et son impact catastrophique : on ne l'atténue pas, on le transfère.

**Les n° 7 et 8 s'escaladent** parce qu'ils **dépassent l'autorité du chef de projet**. Un changement réglementaire ou une manœuvre concurrente relèvent de la direction, pas du projet. L'escalade est ici la bonne réponse — et c'est l'un des rares contextes où elle l'est d'emblée.

⚠️ Un risque escaladé **sort du registre des risques du projet** et est pris en charge au niveau organisationnel. Le PM ne le surveille plus ; il vérifie seulement qu'il a bien été repris.

---

**Contingence et management : la distinction, et qui engage quoi**

**La réserve de contingence** couvre les **risques identifiés** — les « inconnues connues » (*known unknowns*). Elle fait partie de la **référence de coût** du projet, et le **chef de projet peut l'engager** sans autorisation supplémentaire quand le risque prévu se matérialise.

**La réserve de management** couvre l'**imprévu** — les « inconnues inconnues » (*unknown unknowns*). Elle est **hors de la référence de coût**, incluse dans le budget total du projet, et **seul le management ou le sponsor peut l'engager**. Y recourir exige généralement une demande de changement.

**Le moyen de retenir** :
\`\`\`
Référence de coût  = estimation des lots + réserve de contingence
Budget du projet   = référence de coût  + réserve de management
\`\`\`

**Point d'examen** : une question qui demande « le PM peut-il utiliser cette réserve ? » teste exactement cette distinction. Contingence → oui. Management → non, il faut une autorisation.`,
        },
        {
          id: "pmp-process-5-b",
          kind: "situation",
          title: "Quel contrat pour quel achat",
          statement: `**Cas situationnel.** Quatre décisions d'approvisionnement.

Pour chacune, choisis le type de contrat — **prix forfaitaire**, **coûts remboursables**, ou **temps et matériel** — justifie, et dis **qui porte le risque**.

**A.** Tu achètes 200 licences d'un logiciel standard du marché.

**B.** Tu fais développer un module dont les spécifications sont complètes, stables et validées.

**C.** Tu lances un projet de recherche appliquée : personne ne sait combien de temps il faudra ni si ça marchera.

**D.** Tu as besoin de deux experts en sécurité pendant une durée indéterminée, pour renforcer ton équipe sur un audit.

Puis :
1. dans quel cas le fournisseur pourrait-il gonfler ses coûts sans que tu puisses rien y faire, et comment tu t'en protèges ?
2. dans quel cas le fournisseur pourrait-il rogner sur la qualité, et comment tu t'en protèges ?
3. pourquoi la décision « faire ou acheter » (*make-or-buy*) doit-elle précéder le choix du contrat ?`,
          hint: `Le principe qui départage : **plus l'incertitude sur le travail à faire est grande, plus le risque bascule vers l'acheteur**. Un fournisseur n'accepte un prix ferme que s'il peut estimer précisément ce qu'on lui demande.`,
          solution: `**A — Licences logicielles standard → prix forfaitaire (*firm fixed price*).**
Produit standard, quantité connue, aucune incertitude. Le prix est ferme.
*Risque* : côté **vendeur**, mais il est quasi nul ici.

**B — Module à spécifications complètes et stables → prix forfaitaire.**
C'est la condition qui rend le forfait possible : le fournisseur peut estimer précisément, donc s'engager sur un prix.
*Risque* : côté **vendeur**. S'il a sous-estimé, il absorbe le dépassement.

**C — Recherche appliquée → coûts remboursables (*cost-reimbursable*).**
Personne ne peut estimer un travail dont on ignore la faisabilité. Aucun fournisseur sérieux n'acceptera un forfait — ou il le chiffrera avec une marge de risque énorme, que tu paieras.
*Risque* : côté **acheteur**. C'est le prix de l'incertitude.
On choisit une variante avec **incitation** — *cost plus incentive fee* — pour aligner les intérêts.

**D — Deux experts pour une durée indéterminée → temps et matériel (*T&M*).**
On achète une **capacité**, pas un livrable. Ni le périmètre ni la durée ne sont définis.
*Risque* : **partagé**, mais il glisse vers l'acheteur avec le temps.

---

**1. Où le fournisseur peut gonfler ses coûts : les contrats à coûts remboursables (C), et le T&M (D).**

En coûts remboursables, tout coût engagé est remboursé : le fournisseur n'a aucune incitation naturelle à l'économie. En T&M, plus la mission dure, plus il facture.

*Les protections* :
- un **plafond** (*not-to-exceed*) sur le montant total — indispensable en T&M
- une **clause d'incitation** liée à des objectifs de coût ou de performance
- un **suivi rapproché** des heures et des dépenses, avec justificatifs
- des **jalons de réexamen** : tous les deux mois, on refait le point sur la pertinence de continuer
- pour le T&M, une **durée maximale** et une revue de renouvellement

**2. Où le fournisseur peut rogner sur la qualité : le prix forfaitaire (A, B).**

Sa marge est la différence entre le prix fixé et ses coûts réels. Toute économie qu'il réalise lui revient — y compris les économies faites sur la qualité, les tests, ou la documentation.

*Les protections* :
- des **critères d'acceptation** précis et mesurables dans l'énoncé des travaux
- des **exigences de qualité explicites**, pas seulement fonctionnelles
- une **recette formelle** avec droit de refus
- des **retenues de garantie** ou une clause de garantie après livraison
- une définition claire de « terminé »

**Le principe symétrique** : en forfait, tu surveilles la **qualité** ; en coûts remboursables, tu surveilles les **coûts**. Le type de contrat détermine où tu dois mettre ton attention.

**3. Pourquoi make-or-buy précède le choix du contrat**

Parce que le contrat est un **moyen**, pas une décision. La question première est : ce travail doit-il être fait en interne ou acheté ?

Cette décision s'appuie sur d'autres critères — compétence disponible en interne, caractère stratégique de l'activité, coût comparé, capacité, délai, et le risque de dépendance à un fournisseur.

Choisir un type de contrat avant d'avoir tranché make-or-buy revient à répondre à une question qu'on ne s'est pas posée. Et c'est un enchaînement classique à l'examen : la bonne réponse à « quel contrat ? » est parfois « aucun, ce travail ne doit pas être externalisé ».

---

**Le résumé qui tient en une ligne** : *forfait quand on sait exactement ce qu'on veut, remboursable quand on ne le sait pas, T&M quand on achète des bras plutôt qu'un résultat.*`,
        },
      ],
    },
    finalExercise: {
      title: "Diagnostic EVM d'un projet en dérive",
      duration: "5 à 8 h",
      covers: ["pmp-process-1", "pmp-process-2", "pmp-process-3", "pmp-process-4", "pmp-process-5"],
      brief: `Semaine 14 sur 26, budget déjà consommé à 68 %. Diagnostic et plan de redressement.

Cet exercice **rassemble les 5 leçons du module** — intégration et contrôle des changements (leçon 1), périmètre et WBS (leçon 2), échéancier et EVM (leçon 3), qualité et ressources (leçon 4), risques et approvisionnement (leçon 5).

Le domaine Process pèse **41 % de l'examen**. Et l'EVM est la seule partie du PMP où il faut savoir calculer — le reste se raisonne, ici il faut poser les opérations juste.`,
      dataset: `\`\`\`
Projet de refonte du système de facturation
BAC (budget à l'achèvement) : 850 000 €
Durée planifiée : 26 semaines
Situation en fin de semaine 14 :
  - travail planifié à cette date : 55 % du projet
  - travail réellement accompli   : 44 % du projet
  - coût réel engagé              : 578 000 €
  - nombre de lots de travaux     : 47 (contre 41 au lancement)
  - défauts ouverts en recette    : 34
  - un fournisseur clé a annoncé 3 semaines de retard sur son composant
\`\`\`

Tout est là pour un diagnostic complet — y compris deux informations qui n'ont rien à voir avec l'EVM et qui comptent autant.`,
      steps: [
        "**Calcule PV, EV, AC, CV, SV, CPI et SPI.** Pose les opérations, ne te contente pas des résultats — c'est le calcul qui doit être automatique le jour de l'examen. (leçon 3)",
        "**Interprète chaque indicateur en une phrase de langage métier**, sans aucun sigle. Le test : ton sponsor doit comprendre sans poser de question. (leçon 3)",
        "**Calcule l'EAC, l'ETC, le VAC et le TCPI**, et projette la date de fin révisée. Précise l'hypothèse retenue pour l'EAC et justifie-la. (leçon 3)",
        "**Analyse les causes racines** avec les 5 pourquoi ou un Ishikawa. Attention : 47 lots au lieu de 41 est une piste, les 34 défauts en sont une autre, le retard fournisseur une troisième. (leçons 1, 2, 4 et 5)",
        "**Propose 5 actions correctives** avec responsable, délai et impact attendu — chiffré. Distingue ce qui relève d'une demande de changement de ce qui n'en relève pas. (leçons 1 et 5)",
        "**Dis ce que l'EVM ne te montre pas** dans ce cas, et quelles informations tu irais chercher avant de présenter au sponsor. (leçon 3)",
      ],
      checklist: [
        "Mes calculs EVM sont posés, pas seulement leurs résultats",
        "Aucun sigle dans mes phrases d'interprétation métier",
        "J'ai précisé et justifié l'hypothèse retenue pour l'EAC",
        "J'ai traité les 6 lots supplémentaires — dérive de périmètre ou changements approuvés ?",
        "Mes actions correctives ont chacune un responsable, un délai et un impact chiffré",
        "J'ai identifié ce que l'EVM ne mesure pas : qualité, risques, parties prenantes, valeur métier",
      ],
      selfCheck: `Le vrai test : **referme tout et recalcule les sept indicateurs de mémoire, sans formulaire.**

CPI, SPI, EAC, ETC, VAC, TCPI. Si tu hésites sur l'ordre des termes — EV moins AC ou AC moins EV — tu perdras des points le jour J sur des questions qui ne demandent qu'un calcul.

Les repères qui suffisent : **EV vient toujours en premier**, **écart = soustraction, indice = division**, **négatif ou inférieur à 1 = mauvais**. Trois phrases qui remplacent une feuille de formules.`,
    },
    quizExtra: [
      {
        q: "Le client demande directement à un développeur d'ajouter une fonctionnalité, et le développeur s'y met. Que fais-tu en premier ?",
        options: [
          "Tu arrêtes le travail immédiatement, ce n'était pas au périmètre",
          "Tu évalues le coût engagé, le coût restant et la valeur de la fonctionnalité, puis tu soumets une demande de changement",
          "Tu laisses finir puisque c'est presque terminé",
          "Tu sanctionnes le développeur pour non-respect du processus",
        ],
        answer: 1,
        explain:
          "Le coût déjà engagé est irrécupérable et ne doit pas entrer dans la décision : la seule question est de savoir si la valeur justifie le coût RESTANT. Dans les trois issues possibles — intégrer, arrêter, reporter — une demande de changement est enregistrée, même celle qui aboutit à un rejet. Sanctionner le développeur lui apprendrait à cacher, pas à remonter.",
      },
      {
        q: "CPI = 0,87 sur un projet de 200 000 €. Quel sera le coût final si la performance se maintient ?",
        options: [
          "200 000 €, le budget est fixé",
          "Environ 230 000 € — EAC = BAC / CPI",
          "Environ 174 000 €",
          "Impossible à estimer sans le SPI",
        ],
        answer: 1,
        explain:
          "EAC = BAC / CPI = 200 000 / 0,87 ≈ 229 885 €. Attention : cette formule suppose que la performance actuelle se MAINTIENT. Si l'écart est jugé ponctuel et non reproductible, on utilise EAC = AC + (BAC − EV). L'énoncé d'examen précise toujours l'hypothèse — il faut la lire avant de calculer.",
      },
      {
        q: "Ton nombre de lots de travaux est passé de 34 à 41, mais le pourcentage d'avancement reste conforme au plan. Que se passe-t-il ?",
        options: [
          "Tout va bien, l'avancement suit le plan",
          "Le pourcentage se recalibre sur le périmètre courant : un avancement mesuré sur un périmètre mouvant ne mesure rien",
          "L'équipe est plus productive que prévu",
          "Il faut simplement mettre à jour le planning",
        ],
        answer: 1,
        explain:
          "Ajouter un lot ET le travail correspondant ne fait pas bouger le pourcentage — le dénominateur grandit avec le numérateur. C'est ce qui rend la dérive de périmètre invisible : tous les indicateurs qui la subissent se recalibrent silencieusement. Le seul indicateur qui la révèle est la comparaison à la référence de base, et c'est celui qu'on cesse de regarder quand tout semble aller bien.",
      },
      {
        q: "Ton taux de défauts ne baisse pas malgré un effectif de test doublé et une campagne supplémentaire. Pourquoi ?",
        options: [
          "Il faut encore renforcer les tests",
          "Ces actions améliorent la détection, pas la production : elles inspectent au lieu de prévenir",
          "L'équipe de développement manque de compétences",
          "Le nombre de défauts est normal à ce stade",
        ],
        answer: 1,
        explain:
          "La prévention prime sur l'inspection. Doubler les testeurs fait trouver mieux les mêmes bugs sans en fabriquer moins — et allonge la recette tout en dégradant la relation avec l'équipe. La bonne démarche : un Pareto pour identifier les 20 % de types de défauts qui font 80 % du volume, puis un Ishikawa ou les 5 pourquoi sur ces types, et une correction en amont.",
      },
    ],
  },

  // ══ AGILE, HYBRIDE & APPROCHES DE LIVRAISON ═══════════════════════════════
  "agile-hybride": {
    lessons: {
      "pmp-agile-1": [
        {
          id: "pmp-agile-1-a",
          kind: "application",
          title: "Qui décide quoi dans Scrum",
          statement: `Pour chacune de ces huit décisions, dis **qui décide** : le **Product Owner**, le **Scrum Master**, l'**équipe de développement**, ou **personne seul**.

1. L'ordre des éléments du backlog produit.
2. Le nombre d'éléments pris dans le sprint.
3. La façon technique d'implémenter une fonctionnalité.
4. La durée du sprint.
5. Si un incrément est « terminé » selon la *definition of done*.
6. L'annulation d'un sprint.
7. Le contenu de la *definition of done*.
8. Si une nouvelle demande urgente entre dans le sprint en cours.

Puis : quelle est l'erreur de rôle la plus fréquente chez un chef de projet qui passe à Scrum ?`,
          hint: `Une ligne de partage traverse tout Scrum : le Product Owner décide du **quoi** et du **pourquoi**, l'équipe décide du **comment** et du **combien**. Le Scrum Master ne décide de presque rien — il facilite et protège.`,
          solution: `**1. Ordre du backlog produit → Product Owner.** C'est sa responsabilité exclusive. Il peut écouter tout le monde, il décide seul.

**2. Nombre d'éléments pris dans le sprint → l'équipe de développement.** Le PO présente la priorité, l'équipe s'engage sur ce qu'elle estime pouvoir livrer. Personne ne peut lui imposer un volume.

**3. Implémentation technique → l'équipe.** Le « comment » est son domaine réservé. C'est le principe de l'auto-organisation.

**4. Durée du sprint → l'équipe, en accord avec le PO.** Elle doit rester **fixe** dans le temps ; on ne l'allonge pas parce qu'on n'a pas fini.

**5. Un incrément est-il terminé → l'équipe**, selon la *definition of done* convenue. Ce n'est pas une appréciation : c'est une vérification contre des critères écrits.

**6. Annulation d'un sprint → Product Owner.** Seul lui le peut, et uniquement si l'objectif du sprint est devenu obsolète.

**7. Contenu de la *definition of done* → l'équipe**, ou l'organisation si elle en impose une minimale. L'équipe peut la rendre plus stricte, jamais plus laxiste.

**8. Nouvelle demande urgente en cours de sprint → personne seul.** Le PO peut proposer, l'équipe évalue l'impact sur l'objectif du sprint, et l'on décide ensemble — le plus souvent en sortant un élément équivalent. Si l'objectif du sprint est menacé, la bonne réponse est de le mettre au backlog pour le sprint suivant.

---

**L'erreur de rôle la plus fréquente chez un chef de projet qui passe à Scrum : décider du contenu du sprint.**

Le réflexe est naturel — c'est ce qu'il faisait avant. Il arrive avec une liste de priorités, la présente à l'équipe, et l'équipe s'exécute. Trois choses se cassent alors :

Le PO est court-circuité et perd sa légitimité sur le backlog.

L'équipe ne s'engage plus, elle **reçoit** — et un engagement qu'on n'a pas pris n'est pas tenu de la même façon.

Le PM redevient le goulot d'étranglement des décisions, exactement ce que Scrum cherche à supprimer.

**La reformulation utile** : en Scrum, le chef de projet ne disparaît pas, mais son rôle bascule. Il **facilite, lève les obstacles, gère les parties prenantes externes et l'interface avec la gouvernance**. Il ne décide ni du quoi (PO), ni du comment (équipe), ni du combien (équipe).

⚠️ **Point d'examen** : une question qui met un PM en position de trancher un choix technique ou d'imposer un contenu de sprint attend presque toujours qu'on choisisse la réponse « faciliter la discussion entre le PO et l'équipe ».`,
        },
        {
          id: "pmp-agile-1-b",
          kind: "situation",
          title: "Le Product Owner absent depuis trois sprints",
          statement: `**Cas situationnel.**

Ton Product Owner est un directeur métier très pris. Depuis trois sprints :
- il ne vient plus au *sprint planning*, il envoie une liste par mail la veille
- il n'assiste à aucune revue de sprint
- il répond aux questions de l'équipe en 3 à 4 jours
- l'équipe a pris l'habitude de « décider à sa place » quand elle est bloquée

Résultat : deux fonctionnalités livrées ont été refusées à la revue trimestrielle, parce qu'elles ne correspondaient pas au besoin.

1. quel est le problème de fond, et ce n'est pas l'absence du PO
2. quelles sont les conséquences déjà visibles, au-delà des deux refus
3. quelle est ta **première action** ?
4. quelles options concrètes envisages-tu si son agenda ne peut pas changer ?
5. qu'est-ce que l'équipe doit arrêter de faire, et pourquoi c'est difficile ?

**Le point 5 est contre-intuitif** : ce que fait l'équipe est bien intentionné et aggrave le problème.`,
          hint: `Un PO qui n'a pas le temps n'est pas un PO. La question n'est pas de le faire venir davantage, mais de savoir **qui peut réellement porter la décision produit** — et ce rôle ne peut pas rester vacant.`,
          solution: `**1. Le problème de fond : le rôle de Product Owner n'est pas tenu.**

Ce n'est pas un problème d'assiduité. Scrum repose sur une **décision produit disponible et rapide** : le PO n'est pas un valideur qu'on consulte, c'est celui qui arbitre en continu ce qui a le plus de valeur.

Un directeur métier très pris peut être **sponsor**, il ne peut pas être Product Owner. Le rôle demande de la disponibilité, pas seulement de l'autorité.

**2. Les conséquences déjà visibles**

**Les deux refus** — les plus visibles, mais pas les plus graves.

**Le délai de réponse de 3 à 4 jours** bloque l'équipe ou la pousse à décider sans information : c'est du travail à refaire en puissance.

**L'absence en revue de sprint** supprime la boucle de retour. Sans elle, on ne découvre l'écart qu'au trimestre — c'est-à-dire qu'on a perdu le principal avantage de l'agilité.

**L'équipe décide à sa place**, et prend donc une responsabilité qui n'est pas la sienne. Le jour où ça tourne mal, elle en porte la faute alors qu'elle a comblé un vide.

**Et la démotivation qui vient** : voir son travail refusé au trimestre après trois sprints d'efforts use une équipe très vite.

**3. La première action : une conversation avec lui, factuelle et chiffrée.**

Pas une plainte sur son absence. Un constat : deux fonctionnalités refusées, X jours-personnes perdus, un délai de réponse moyen de 3,5 jours, et l'équipe qui décide sans mandat.

Puis la question ouverte : le rôle demande environ 20 à 30 % d'un temps plein — peut-il le tenir, et si non, qui peut ?

C'est une conversation sur la **faisabilité du rôle**, pas sur son engagement personnel.

**4. Les options si l'agenda ne peut pas changer**

**a) Un PO délégué à temps plein**, avec un **mandat écrit** de décision. Le directeur reste sponsor et arbitre les orientations majeures ; le délégué décide au quotidien. C'est l'option la plus fréquente et la plus efficace — à condition que la délégation soit réelle et annoncée.

**b) Un PO à temps partiel avec des créneaux garantis** : présence obligatoire au planning et à la revue, plus deux plages hebdomadaires de disponibilité pour les questions. Moins bon, mais viable si les créneaux sont tenus.

**c) Un *proxy PO*** qui prépare, filtre et documente les décisions, le PO ne tranchant que ce qui est réellement arbitrable. Fonctionne si le proxy a la confiance du PO.

**Ce qui ne fonctionne pas** : garder la situation actuelle en espérant qu'elle s'améliore, ou demander à l'équipe de « faire au mieux ».

**5. Ce que l'équipe doit arrêter : décider à la place du PO.**

C'est contre-intuitif parce que son intention est excellente — elle veut avancer plutôt que rester bloquée, et elle a raison de ne pas vouloir gaspiller trois jours d'attente.

Mais en comblant le vide, elle le **rend invisible**. Tant que ça avance à peu près, personne dans l'organisation ne voit qu'il y a un problème — jusqu'au refus au trimestre, quand le coût est déjà payé.

**Ce qu'elle doit faire à la place** : rendre le blocage **visible**. Une décision produit en attente est un **obstacle** au sens Scrum, elle doit apparaître comme tel — dans le *daily*, sur le tableau, dans le rapport d'avancement. Avec la date de la demande et le temps d'attente.

C'est inconfortable, parce que cela ressemble à de la dénonciation. Ce n'en est pas : c'est la transparence, et c'est le seul moyen d'obtenir que le rôle soit correctement pourvu.

---

**Le principe : quand un rôle n'est pas tenu, le pire service à rendre à l'organisation est de le compenser silencieusement.** L'équipe qui absorbe le manque protège le projet à court terme et empêche sa résolution à long terme. Rendre le problème visible n'est pas un manque de solidarité — c'est ce qui permet de le régler.`,
        },
      ],
      "pmp-agile-2": [
        {
          id: "pmp-agile-2-a",
          kind: "application",
          title: "Lire un tableau Kanban et poser une limite de WIP",
          statement: `Un tableau Kanban avec quatre colonnes. Voici l'état actuel et les temps observés :

\`\`\`
À faire (12)  |  En cours (9)  |  Revue (7)  |  Terminé
\`\`\`

Sur les 20 derniers éléments terminés :
- **lead time** moyen (de la demande à la livraison) : 18 jours
- **cycle time** moyen (du début du travail à la livraison) : 11 jours
- **débit** (*throughput*) : 4 éléments par semaine
- l'équipe compte 5 personnes

1. que dit l'écart entre lead time et cycle time ?
2. où est le goulot d'étranglement, et comment le vois-tu ?
3. quelle limite de WIP poses-tu sur « En cours », et pourquoi ce chiffre ?
4. applique la **loi de Little** pour vérifier la cohérence des chiffres
5. que se passe-t-il concrètement dans l'équipe le jour où la limite est atteinte ?`,
          hint: `La loi de Little : **travail en cours = débit × temps de cycle**. Et pour trouver le goulot, regarde quelle colonne accumule — un tas devant une étape signale que l'étape suivante ne suit pas.`,
          solution: `**1. L'écart lead time / cycle time : 7 jours d'attente avant même de commencer.**

18 jours au total, dont 11 de travail effectif. Les 7 jours restants sont du temps passé en file « À faire ».

C'est une information que le client vit et que l'équipe ne voit pas : de son point de vue, la demande prend 18 jours, pas 11. Améliorer le cycle time sans réduire l'attente ne change presque rien à l'expérience du demandeur.

**2. Le goulot : l'étape « Revue ».**

Deux indices convergents :

**L'accumulation** : 7 éléments en attente de revue. Un tas se forme toujours **devant** l'étape trop lente.

**Le rapport au débit** : avec 4 éléments par semaine, 7 en revue représentent près de deux semaines de stock. Les éléments y attendent plus longtemps qu'ils ne sont travaillés.

Cause probable : la revue dépend d'une ou deux personnes seulement — un architecte, un responsable qualité — pendant que 5 personnes alimentent la colonne.

**3. La limite de WIP sur « En cours »**

Une base raisonnable pour 5 personnes : **5 ou 6**. Le principe est d'être **légèrement en dessous** du nombre de personnes disponibles, pour forcer l'entraide plutôt que le travail en parallèle.

Avec 9 en cours pour 5 personnes, chacun jongle sur deux tâches — d'où du changement de contexte permanent, qui est le principal destructeur de productivité.

⚠️ **Mais la vraie limite à poser est sur « Revue »**, pas sur « En cours ». C'est là qu'est le goulot. Une limite à **3** sur la revue est plus efficace : quand elle est atteinte, personne ne peut pousser de nouvel élément, et l'équipe est obligée d'aller aider à faire les revues.

**On limite le goulot, pas ce qui le précède.**

**4. La vérification par la loi de Little**

\`\`\`
Travail en cours = débit × temps de cycle
Débit = 4 / semaine = 0,8 par jour ouvré
Temps de cycle = 11 jours
=> WIP théorique = 0,8 × 11 = 8,8 éléments
\`\`\`

Observé : 9 en cours + 7 en revue = **16 éléments**, soit près du double du théorique cohérent avec le cycle time annoncé.

**Conclusion** : les chiffres ne sont pas cohérents entre eux. Soit le cycle time réel est plus long que 11 jours — probable, si la mesure ne compte pas l'attente en revue — soit une partie du travail « en cours » est en réalité à l'arrêt.

**La loi de Little sert exactement à ça** : détecter que les indicateurs déclarés ne racontent pas la même histoire que le tableau.

**5. Ce qui se passe quand la limite est atteinte**

C'est le moment intéressant, et celui qui surprend les équipes.

**Personne ne peut démarrer de nouvelle tâche.** L'inconfort est immédiat : des gens sont disponibles et n'ont pas le droit de prendre du travail.

**Deux réactions possibles** : contourner la règle — « juste cette fois » — ou **aller aider là où ça bloque**. C'est toute la finalité du dispositif.

Le résultat attendu : des développeurs qui vont faire des revues, ou qui vont aider à débloquer un élément en cours plutôt que d'en commencer un nouveau.

**Le principe de Kanban tient en une phrase : arrêter de commencer, commencer à finir.** Une limite de WIP n'est pas une contrainte administrative — c'est un mécanisme qui rend le goulot visible et force l'équipe à s'en occuper.`,
        },
        {
          id: "pmp-agile-2-b",
          kind: "situation",
          title: "Quatorze choses en cours, rien qui se termine",
          statement: `**Cas situationnel.**

Ton équipe de 6 personnes travaille en Kanban. Le tableau affiche **14 éléments en cours**. Personne n'est inactif, tout le monde est occupé, l'ambiance est bonne.

Pourtant :
- aucun élément n'a été livré depuis 9 jours
- le client demande où en sont ses trois demandes prioritaires
- chaque personne dit être « à 80 % » sur deux ou trois sujets
- deux éléments sont bloqués depuis trois semaines en attente d'une validation externe

Le responsable métier te dit : « Il faut qu'ils travaillent plus vite. »

1. l'équipe travaille-t-elle trop lentement ? Réponds précisément
2. explique en une phrase ce qui se passe réellement
3. quelles sont tes **trois** actions immédiates ?
4. que fais-tu des deux éléments bloqués depuis trois semaines ?
5. comment expliques-tu la situation au responsable métier ?

**Le point 4 est important** : ces deux éléments faussent tout le tableau.`,
          hint: `Six personnes, quatorze éléments en cours. Chacun jongle sur deux ou trois sujets. Que coûte le passage d'un sujet à l'autre, et qu'arrive-t-il au délai de livraison quand tout avance en parallèle ?`,
          solution: `**1. Non, l'équipe ne travaille pas trop lentement.**

Tout le monde est occupé, personne n'est inactif. Le problème n'est pas la **vitesse de travail**, c'est le **débit de livraison** — deux choses différentes qu'on confond systématiquement.

Répondre « il faut travailler plus vite » à ce tableau ne peut qu'aggraver la situation : la seule façon d'aller plus vite quand on est déjà à 100 % est de commencer encore plus de choses.

**2. Ce qui se passe, en une phrase**

**L'équipe a commencé beaucoup plus de travail qu'elle ne peut en terminer, et le coût du changement de contexte consomme le temps qui devrait servir à finir.**

Quatorze éléments pour six personnes, c'est 2,3 sujets par personne. Chaque passage d'un sujet à l'autre coûte du temps de rechargement mental, et ce coût est invisible : personne ne le déclare, il apparaît seulement dans le délai de livraison.

Et quand tout avance en parallèle, **tout avance lentement**. À la fin, on a quatorze choses à 80 % — c'est-à-dire **zéro valeur livrée**. Un élément à 80 % ne vaut rien.

**3. Les trois actions immédiates**

**a) Arrêter de commencer.** Aucun nouvel élément tant que le nombre en cours n'a pas baissé. C'est la mesure qui coûte le moins et rapporte le plus.

**b) Poser une limite de WIP** — 5 ou 6 pour 6 personnes, à ajuster ensuite. Et l'afficher sur le tableau, colonne par colonne.

**c) Finir avant de commencer.** Prioriser les éléments les plus proches de la fin et y concentrer l'équipe, quitte à faire travailler deux personnes sur le même sujet. L'objectif est de **vider le tableau**, pas de le remplir.

**4. Les deux éléments bloqués depuis trois semaines**

**Ils ne doivent plus compter comme « en cours ».** Ils faussent tout : ils occupent une place dans le WIP alors que personne n'y travaille, et ils gonflent artificiellement le nombre d'éléments en cours.

Deux traitements possibles :

**Une colonne « Bloqué » distincte**, avec la date de blocage et le motif visibles. Un élément bloqué depuis trois semaines qui s'affiche en rouge sur le tableau finit par produire une action.

**Ou les remettre en attente**, hors du flux, et les relancer quand la validation arrive.

Et surtout : **la validation externe est un obstacle à lever, et c'est ton rôle**. Trois semaines de blocage sur une dépendance externe, c'est un échec de servant leadership — c'est exactement ce que le PM doit traiter pendant que l'équipe travaille.

**5. Ce que tu dis au responsable métier**

> « L'équipe ne travaille pas trop lentement : personne n'est inactif, et le problème n'est pas là. Nous avons commencé quatorze choses pour six personnes, donc chacun jongle entre deux ou trois sujets, et le temps passé à passer de l'un à l'autre mange le temps de production. Résultat : beaucoup de choses avancent, aucune n'aboutit — et une fonctionnalité à 80 % ne vaut rien pour vous.
>
> Ce que je propose : on arrête de commencer, on finit ce qui est le plus avancé, et on limite volontairement le nombre de sujets en parallèle. Vos trois demandes prioritaires seront traitées en premier et livrées, plutôt que d'avancer en même temps que onze autres. Vous verrez des livraisons dès la semaine prochaine.
>
> Deux points supplémentaires sont bloqués depuis trois semaines sur une validation externe : je m'en occupe, mais j'aurai peut-être besoin de votre appui pour la débloquer. »

**Ce que cette réponse fait** : elle **réfute** l'hypothèse « trop lents » avec un fait, elle **explique** le mécanisme sans jargon, elle **promet un résultat visible et daté**, et elle **enrôle** le responsable métier sur le blocage externe plutôt que de s'en plaindre.

---

**Le principe, valable bien au-delà de Kanban : le travail en cours est une dette, pas un actif.** Chaque élément commencé et non terminé immobilise de l'effort sans produire de valeur. C'est exactement le raisonnement qui fonde la limitation du WIP — et c'est aussi pourquoi Scrum limite l'engagement d'un sprint.`,
        },
      ],
      "pmp-agile-3": [
        {
          id: "pmp-agile-3-a",
          kind: "application",
          title: "Lire quatre burndown charts",
          statement: `Voici quatre allures de courbe de *burndown* observées sur des sprints de deux semaines. Pour chacune, dis **ce qui s'est passé** et **quelle action tu prends**.

**A.** La courbe descend régulièrement et atteint zéro le dernier jour.

**B.** La courbe reste plate pendant huit jours, puis chute brutalement les deux derniers jours.

**C.** La courbe descend, puis **remonte** au milieu du sprint, puis redescend sans atteindre zéro.

**D.** La courbe atteint zéro au bout de six jours et reste à zéro jusqu'à la fin.

Puis : quelle information un burndown **ne donne jamais**, et quel autre graphique la donne ?`,
          hint: `Une courbe plate ne signifie pas que rien ne se passe — elle signifie que rien n'est **terminé**. Et une remontée n'est possible que si quelque chose a été **ajouté** au périmètre du sprint.`,
          solution: `**A — Sprint sain.** L'équipe termine du travail régulièrement, l'estimation était juste.
*Action* : aucune. C'est le profil recherché. On peut envisager, avec l'équipe, d'augmenter légèrement l'engagement au sprint suivant.

**B — Tout se termine à la fin.** Le travail avance mais rien n'est « terminé » avant les derniers jours.
*Cause probable* : des éléments trop gros, pas découpés ; ou une *definition of done* qui exige une validation tardive ; ou l'habitude de tout tester en fin de sprint.
*Action* : découper les éléments plus finement, et intégrer les tests au fil de l'eau. **Ce profil est dangereux** : jusqu'au jour 8, personne ne sait si le sprint va réussir. Il n'y a aucune capacité d'alerte précoce.

**C — Remontée en cours de sprint.** Du travail a été **ajouté** après l'engagement — nouvelle demande acceptée, ou découverte de tâches oubliées lors de l'estimation.
*Action* : identifier laquelle des deux causes. Si c'est un ajout externe, protéger le sprint et faire passer les nouvelles demandes par le backlog. Si c'est une sous-estimation, travailler le découpage et l'estimation en planning.
*Le sprint n'atteint pas zéro* : l'objectif du sprint n'est pas tenu, à traiter en rétrospective.

**D — Engagement trop faible.** L'équipe a terminé en six jours ce qu'elle avait prévu pour dix.
*Action* : ne pas se réjouir trop vite — vérifier d'abord que la *definition of done* est réellement respectée, et pas seulement « le code est écrit ». Si tout est bien terminé, l'équipe peut tirer d'autres éléments du backlog, et augmenter son engagement au sprint suivant.

---

**Ce qu'un burndown ne donne jamais : la vue sur le périmètre.**

Il montre le travail **restant**, sur un total qu'on suppose fixe. Quand ce total change — cas C — la courbe remonte sans qu'on sache si c'est parce qu'on a ajouté du travail ou parce qu'on a mal estimé.

**Le burn-up chart donne cette information.** Il trace **deux** lignes : le travail accompli qui monte, et le périmètre total qui devrait être plat. Quand le périmètre bouge, on le voit **directement** — et l'on distingue immédiatement « l'équipe est lente » de « on n'arrête pas d'ajouter du travail ».

C'est pour cela que le burn-up est préférable au burndown dès qu'on suit un projet plutôt qu'un sprint : sur plusieurs mois, le périmètre bouge toujours, et le burndown seul rend la dérive invisible — exactement comme le pourcentage d'avancement au module Process.`,
        },
        {
          id: "pmp-agile-3-b",
          kind: "situation",
          title: "Le management veut comparer les vélocités",
          statement: `**Cas situationnel.**

Ton organisation a quatre équipes agiles. La direction met en place un tableau de bord mensuel comparant leurs **vélocités** :

\`\`\`
Équipe A : 42 points/sprint
Équipe B : 38 points/sprint
Équipe C : 51 points/sprint
Équipe D : 23 points/sprint
\`\`\`

Le directeur annonce que l'équipe C sera citée en exemple et que l'équipe D fera l'objet d'un « plan d'amélioration ».

Deux sprints plus tard, toutes les vélocités ont augmenté de 30 à 60 %. Personne ne livre plus vite.

1. explique pourquoi comparer des vélocités entre équipes n'a aucun sens
2. explique ce qui s'est passé en deux sprints
3. quelle est la seule utilisation légitime de la vélocité ?
4. quels indicateurs proposerais-tu à la direction à la place ?
5. comment présentes-tu cela au directeur sans le braquer ?

**Le point 2 illustre une loi générale du pilotage par indicateurs.** Nomme-la.`,
          hint: `Un point d'histoire (*story point*) est une unité **relative**, définie par chaque équipe pour elle-même. Et demande-toi ce que fait n'importe quel groupe humain quand on transforme sa mesure interne en critère d'évaluation.`,
          solution: `**1. Pourquoi la comparaison n'a aucun sens**

**Un story point est une unité relative, propre à chaque équipe.** L'équipe A appelle « 3 points » ce que l'équipe C appelle « 8 points ». Il n'existe aucune référence commune, et il n'y en a jamais eu : c'est le principe même de l'estimation relative.

Comparer 42 et 51 revient à comparer une distance exprimée en pas de Marie et en pas de Paul. Le chiffre plus grand ne veut rien dire.

S'y ajoutent : des tailles d'équipe différentes, des domaines techniques différents, des niveaux de dette technique différents, des proportions variables de maintenance.

**2. Ce qui s'est passé : l'inflation des points.**

Dès que la vélocité est devenue un critère d'évaluation, les équipes ont — souvent sans même le décider consciemment — commencé à estimer plus généreusement. Ce qui valait 3 points en vaut 5. La vélocité monte de 40 %, la livraison ne bouge pas.

C'est parfaitement rationnel du point de vue des équipes : on leur a demandé d'augmenter un chiffre qu'elles produisent elles-mêmes.

**La loi générale : dès qu'une mesure devient un objectif, elle cesse d'être une bonne mesure.** C'est la loi de Goodhart, et elle s'applique à tous les indicateurs auto-déclarés — vélocité, nombre de bugs remontés, taux de couverture de tests, heures saisies.

**3. La seule utilisation légitime de la vélocité**

**La prévision, par une équipe, pour elle-même.**

Une équipe qui livre 40 points par sprint depuis six sprints peut estimer qu'un backlog de 200 points prendra environ cinq sprints. C'est utile, c'est fiable, et cela ne sert qu'à elle.

**Ce à quoi la vélocité ne sert jamais** : comparer des équipes, évaluer des personnes, fixer un objectif, ou mesurer une productivité.

**4. Les indicateurs à proposer à la place**

Ceux qui mesurent la **valeur livrée** et le **flux**, et que l'équipe ne peut pas gonfler seule :

**Le lead time** — délai entre la demande d'un client et sa livraison. C'est ce que le client vit.

**Le débit** (*throughput*) — nombre d'éléments livrés par période. En nombre d'éléments, pas en points.

**La prévisibilité** — l'équipe livre-t-elle ce qu'elle a annoncé ? Un ratio engagé/livré stable vaut mieux qu'une vélocité élevée.

**La qualité** — défauts échappés en production, taux de retouche.

**La valeur métier** — fonctionnalités réellement utilisées, satisfaction des utilisateurs, bénéfices mesurés.

Et si l'on veut comparer des équipes, on compare des **tendances** : chaque équipe s'améliore-t-elle par rapport à elle-même ?

**5. Comment le présenter au directeur**

> « Je comprends le besoin : vous voulez savoir où en sont les équipes et où aider. Mais la vélocité ne peut pas y répondre, et le tableau de bord le montre déjà : les quatre vélocités ont augmenté de 30 à 60 % en deux sprints, alors que le volume livré n'a pas bougé. Ce n'est pas de la mauvaise foi, c'est mécanique — un point d'histoire est une unité que chaque équipe définit pour elle-même, donc dès qu'on la compare, elle s'ajuste.
>
> Ce que je propose : garder l'objectif — piloter et aider — avec des indicateurs que les équipes ne fabriquent pas elles-mêmes. Le délai entre une demande et sa livraison, le nombre de fonctionnalités livrées, la proportion de ce qui est annoncé et effectivement tenu. Ceux-là se comparent, et ils disent quelque chose au client. Je peux vous préparer ce tableau pour le mois prochain. »

**Ce que fait cette réponse** : elle **valide l'intention** avant de contester le moyen, elle **s'appuie sur une donnée du tableau lui-même** plutôt que sur une théorie, elle **explique le mécanisme** sans accuser les équipes, et elle **propose une alternative concrète et datée**.

---

**Et le coût de ne rien dire** : au-delà du chiffre faux, comparer des équipes sur leur vélocité détruit la confiance nécessaire à l'estimation honnête. Une équipe qui sait que ses estimations la jugent cesse d'estimer et commence à négocier. On perd alors le seul outil de prévision dont on disposait.`,
        },
      ],
      "pmp-agile-4": [
        {
          id: "pmp-agile-4-a",
          kind: "application",
          title: "Concevoir un modèle hybride",
          statement: `Un projet de **déploiement d'un nouvel outil RH** dans une entreprise de 2 000 personnes, sur 12 mois :

- le choix de l'outil est fait, le contrat est signé
- l'intégration au système d'information est complexe et les interfaces sont connues
- les besoins de configuration métier par direction sont flous et vont évoluer
- une contrainte réglementaire impose une mise en conformité paie au 1er janvier
- la conduite du changement concerne 2 000 personnes

Conçois le modèle **hybride** :
1. quelles composantes traites-tu en **prédictif**, et pourquoi
2. lesquelles en **agile**, et pourquoi
3. comment les deux s'articulent dans le temps
4. quels jalons et quelles instances de gouvernance
5. comment tu rends compte de l'avancement quand les deux coexistent`,
          hint: `Applique le critère à **chaque composante séparément** plutôt qu'au projet entier : les exigences sont-elles stables ? Une même initiative peut contenir des parties très prévisibles et des parties très incertaines.`,
          solution: `**1. En prédictif**

**L'intégration au système d'information.** Interfaces connues, contraintes techniques figées, dépendances fortes avec d'autres systèmes. On planifie, on séquence, on suit un échéancier.

**La mise en conformité paie.** Exigence réglementaire, date butoir non négociable, périmètre imposé par le texte. Aucune valeur à une livraison partielle.

**Le plan de déploiement par site ou direction.** La séquence, les jalons et la logistique se planifient.

**2. En agile**

**La configuration métier par direction.** Besoins flous et évolutifs, forte valeur du retour utilisateur. Chaque direction est un incrément : on configure, on fait tester, on ajuste.

**La conduite du changement.** Les supports de formation, la communication et l'accompagnement gagnent à être produits, testés sur un groupe pilote, puis ajustés. Ce qui fonctionne pour la Finance ne fonctionnera pas pour la Production.

**3. L'articulation dans le temps**

\`\`\`
Mois 1-2   : cadrage prédictif — architecture, plan d'intégration,
             plan de déploiement, exigences de conformité
Mois 2-8   : DEUX flux en parallèle
             → flux prédictif : intégration SI, jalons techniques
             → flux agile : configuration par direction, en itérations
                           de 3 semaines, une ou deux directions par itération
Mois 6-9   : conformité paie — flux prédictif dédié, jalon dur au 1er janvier
Mois 3-12  : conduite du changement en itérations, un groupe pilote
             puis vagues successives
Mois 10-12 : déploiement séquencé, prédictif
\`\`\`

**Le point d'articulation critique** : le flux agile de configuration **dépend** des jalons du flux prédictif d'intégration. Une itération de configuration ne peut pas démarrer sur une direction dont l'interface n'est pas livrée. Ces dépendances se planifient explicitement.

**4. Jalons et gouvernance**

**Jalons durs** (prédictifs, non négociables) : architecture validée, interfaces livrées, conformité paie recettée, mise en production.

**Instances** :
- un **comité de pilotage mensuel** — avancement global, arbitrages, risques
- une **revue d'itération toutes les 3 semaines** — démonstration aux directions concernées, ajustement du backlog de configuration
- un **point technique hebdomadaire** sur le flux d'intégration

**Et un point de synchronisation entre les deux flux**, sans quoi ils dérivent l'un par rapport à l'autre. C'est la difficulté principale de l'hybride, et elle est organisationnelle, pas méthodologique.

**5. Le reporting quand les deux coexistent**

C'est la vraie difficulté de l'hybride, et une question fréquente à l'examen.

**Ne pas convertir un flux dans l'unité de l'autre.** Traduire des story points en pourcentage d'avancement produit un chiffre faux qui rassure tout le monde.

**Rendre compte avec l'indicateur propre à chaque flux** :
- flux prédictif → jalons atteints, EVM si le suivi de coût le justifie, chemin critique
- flux agile → fonctionnalités livrées et acceptées, burn-up du périmètre de configuration, directions déployées

**Et une vue de synthèse orientée résultat**, compréhensible par le comité : « 6 directions configurées sur 14, interfaces livrées 4 sur 5, conformité paie en avance de 2 semaines ». Des faits, pas un pourcentage global inventé.

---

**Le principe : l'hybride ne se décide pas au niveau du projet, mais au niveau de chaque composante.** La question « ce projet est-il agile ou prédictif ? » est mal posée. La bonne question est : « pour **cette** partie, les exigences sont-elles stables ? » — et la réponse varie à l'intérieur d'un même projet.`,
        },
        {
          id: "pmp-agile-4-b",
          kind: "situation",
          title: "Trois équipes agiles sous une gouvernance prédictive",
          statement: `**Cas situationnel.**

Tu pilotes un programme composé de trois équipes agiles, dans une organisation dont la gouvernance est entièrement prédictive.

Le comité de direction exige :
- un planning détaillé à 12 mois, tâche par tâche
- un pourcentage d'avancement global mensuel
- un engagement ferme sur le périmètre livré au 31 décembre
- une explication à chaque écart au planning

Les équipes, elles :
- travaillent en sprints de 2 semaines
- réajustent leur backlog à chaque sprint
- refusent de s'engager à 12 mois sur un périmètre détaillé

Le directeur de programme te dit : « Trouve un moyen que ça marche. »

1. quel est le vrai conflit ? Ce n'est pas une opposition de méthodes
2. que peux-tu donner à la gouvernance sans mentir ?
3. que ne peux-tu pas donner, et comment l'expliques-tu ?
4. quel dispositif de reporting proposes-tu concrètement ?
5. quel est le piège que la plupart des chefs de projet acceptent ici ?

**Le point 5 est le cœur.** Il existe une solution qui satisfait tout le monde et qui est un mensonge.`,
          hint: `Le comité ne veut pas un planning : il veut de la **prévisibilité** et la capacité de rendre des comptes. Cherche ce que la gouvernance protège réellement, pas ce qu'elle demande — c'est la même méthode que pour un conflit entre personnes.`,
          solution: `**1. Le vrai conflit : un besoin de prévisibilité contre une incertitude réelle.**

Ce n'est pas « agile contre prédictif ». Le comité de direction n'aime pas les diagrammes de Gantt pour eux-mêmes : il doit **rendre des comptes** — à un conseil d'administration, à des clients, à des engagements budgétaires. Il a besoin de savoir ce qui sera livré et quand.

Les équipes ne refusent pas de s'engager par principe : elles refusent de s'engager sur un **détail qu'elles ne peuvent pas connaître** à 12 mois. Et elles ont raison.

Les deux positions sont légitimes. Ce qui est illégitime, c'est de faire semblant que l'incertitude n'existe pas.

**2. Ce que tu peux donner sans mentir**

**Une feuille de route par jalons et par capacités**, pas par tâches. « Au 31 mars, la gestion des demandes sera opérationnelle ; au 30 juin, le module de reporting. » C'est un engagement réel, à un niveau de granularité tenable.

**Un engagement ferme sur les éléments prioritaires**, en distinguant clairement le socle — sur lequel on s'engage — de ce qui suivra, présenté comme probable et non garanti.

**Un burn-up du programme** : périmètre total et travail accompli, avec une projection de date de fin fondée sur le rythme observé. C'est **plus prédictif** qu'un planning à 12 mois, parce que c'est fondé sur des données réelles au lieu d'estimations initiales.

**Une explication des écarts**, réelle et régulière — c'est une demande parfaitement légitime.

**Une date de fin avec fourchette** : « livraison entre le 15 novembre et le 20 décembre, avec un niveau de confiance de 80 % ». Une fourchette honnête vaut mieux qu'une date fausse.

**3. Ce que tu ne peux pas donner, et comment le dire**

**Un planning détaillé tâche par tâche à 12 mois**, et un **engagement ferme sur le périmètre détaillé**.

L'explication qui fonctionne n'est pas méthodologique, elle est factuelle :

> « Je peux produire ce planning. Mais regardons les trois derniers projets de l'organisation : le périmètre détaillé prévu à 12 mois a-t-il été livré tel quel ? Un planning détaillé à 12 mois n'est pas une prévision, c'est une hypothèse présentée comme une certitude — et c'est ce qui produit les écarts qu'on doit ensuite expliquer chaque mois. Je vous propose un engagement plus court et plus fiable, réévalué régulièrement. »

**4. Le dispositif proposé**

**Un engagement ferme à 3 mois**, détaillé, réévalué tous les trimestres.

**Une feuille de route à 12 mois par capacités**, avec des niveaux de confiance explicites — engagé, probable, envisagé.

**Un burn-up mensuel du programme**, avec projection de fin.

**Une revue de programme trimestrielle** où la feuille de route est réajustée devant le comité — ce qui transforme la replanification en événement prévu plutôt qu'en incident.

**Et une démonstration à chaque fin de sprint**, ouverte au comité. C'est l'argument le plus efficace : un directeur qui voit le produit fonctionner tous les mois cesse assez vite de réclamer un pourcentage.

**5. Le piège que la plupart acceptent**

**Produire les deux : un planning détaillé pour la gouvernance, et un fonctionnement agile pour les équipes — sans lien réel entre les deux.**

C'est tentant parce que ça satisfait tout le monde immédiatement. Le comité a son Gantt, les équipes ont leurs sprints, et le chef de projet passe deux jours par mois à maquiller la traduction de l'un vers l'autre.

**Pourquoi c'est un mensonge** : le planning affiché ne décrit pas ce qui se passe. Il produit un pourcentage d'avancement déconnecté du réel, et le comité décide sur une information fausse. Le jour où l'écart devient impossible à masquer, la confiance s'effondre d'un coup — et c'est bien pire que d'avoir négocié dès le départ.

C'est le même cargo cult que celui du module Mindset, dans l'autre sens.

---

**Le principe : on ne résout pas un conflit de gouvernance en produisant deux vérités.** On cherche ce que chaque partie protège — ici, la capacité de rendre des comptes d'un côté, l'honnêteté de l'engagement de l'autre — et on construit un dispositif qui satisfait les deux **besoins**, même s'il ne satisfait pas les deux **demandes**.`,
        },
      ],
    },
    finalExercise: {
      title: "Simulation de 4 sprints",
      duration: "5 à 8 h",
      covers: ["pmp-agile-1", "pmp-agile-2", "pmp-agile-3", "pmp-agile-4"],
      brief: `Un projet hybride : phases prédictives en amont, développement en sprints.

Cet exercice **rassemble les 4 leçons du module** — Scrum et ses rôles (leçon 1), Kanban et le flux (leçon 2), cérémonies et métriques (leçon 3), hybridation (leçon 4).

L'agile et l'hybride représentent **60 % de l'examen 2026**, répartis dans les trois domaines. C'est le module dont le poids réel dépasse largement sa place dans le parcours — et celui que les ressources de préparation antérieures à 2026 sous-traitent le plus.`,
      dataset: `Prends un produit que tu comprends bien — le tien, ou une application que tu utilises quotidiennement et dont tu peux imaginer l'évolution.

Tu vas simuler 4 sprints de 2 semaines sur un backlog de 20 user stories. Tout se fait sur papier ou dans un tableur : l'objet n'est pas de développer, c'est de **piloter**.`,
      steps: [
        "**Backlog de 20 user stories au format INVEST**, estimées en story points par une échelle relative. Chaque story a des critères d'acceptation. (leçons 1 et 3)",
        "**Simule 4 sprints** avec une vélocité qui évolue, et trace le burndown de chacun. Fais varier les profils : un sprint sain, un sprint où du travail est ajouté en cours, un sprint sous-engagé. (leçon 3)",
        "**Rédige les 4 rétrospectives** avec, pour chacune, au moins une action concrète et un responsable. Une rétrospective sans action est une conversation. (leçons 1 et 3)",
        "**Gère un blocage externe au sprint 3** : une dépendance non livrée bloque deux stories pendant trois semaines. Décide, justifie, et montre comment tu le rends visible. (leçons 2 et 4)",
        "**Reporting hybride** : produis le tableau de bord destiné à une gouvernance prédictive, sans convertir les story points en pourcentage d'avancement. Burn-up, jalons, capacités livrées. (leçon 4)",
        "**Justifie ton choix d'indicateurs** : pourquoi ceux-là, et pourquoi pas la vélocité comparée entre équipes ? (leçon 3)",
      ],
      checklist: [
        "Mes user stories respectent INVEST et ont des critères d'acceptation",
        "Mes 4 burndowns ont des profils différents et je sais lire chacun",
        "Chaque rétrospective produit une action avec un responsable, pas seulement des constats",
        "Mon blocage du sprint 3 est traité comme un obstacle à lever, pas comme un retard d'équipe",
        "Mon reporting ne convertit jamais des story points en pourcentage d'avancement",
        "Je peux expliquer pourquoi la vélocité ne sert qu'à l'équipe qui la produit",
      ],
      selfCheck: `Le vrai test : **présente ton tableau de bord de fin de sprint 4 à quelqu'un qui ne connaît rien à l'agilité**, et demande-lui de te dire où en est le projet et quand il finira.

S'il te répond « je ne sais pas, il y a des points et des courbes », ton reporting parle aux initiés et pas aux décideurs — c'est exactement le problème de l'exercice sur la gouvernance prédictive.

S'il te répond « six fonctionnalités sur vingt sont livrées, et au rythme actuel ce sera fini vers mi-mars », tu as réussi la partie la plus difficile de l'hybride.`,
    },
    quizExtra: [
      {
        q: "En Scrum, qui décide du nombre d'éléments pris dans un sprint ?",
        options: [
          "Le Product Owner, qui porte la priorité",
          "L'équipe de développement, qui s'engage sur ce qu'elle estime pouvoir livrer",
          "Le Scrum Master, qui arbitre la capacité",
          "Le chef de projet, qui connaît les engagements clients",
        ],
        answer: 1,
        explain:
          "La ligne de partage : le PO décide du QUOI et du POURQUOI, l'équipe décide du COMMENT et du COMBIEN. Personne ne peut imposer un volume à l'équipe — un engagement qu'on n'a pas pris n'est pas tenu de la même façon. L'erreur la plus fréquente d'un chef de projet qui passe à Scrum est justement de décider du contenu du sprint : il court-circuite le PO et transforme l'équipe en exécutante.",
      },
      {
        q: "Une équipe de 6 personnes a 14 éléments en cours et n'a rien livré depuis 9 jours. Que se passe-t-il ?",
        options: [
          "L'équipe travaille trop lentement, il faut renforcer l'effectif",
          "Elle a commencé plus de travail qu'elle ne peut en terminer : le changement de contexte consomme le temps, et 14 choses à 80 % valent zéro",
          "Les estimations étaient trop optimistes",
          "Le backlog est mal priorisé",
        ],
        answer: 1,
        explain:
          "Le problème n'est pas la vitesse de travail mais le débit de livraison — deux choses qu'on confond systématiquement. La réponse « travaillez plus vite » ne peut qu'aggraver la situation, puisque la seule façon d'aller plus vite quand on est déjà à 100 % est de commencer encore plus de choses. Le principe de Kanban : arrêter de commencer, commencer à finir.",
      },
      {
        q: "Le burndown d'un sprint remonte au milieu. Que s'est-il passé ?",
        options: [
          "L'équipe a pris du retard",
          "Du travail a été AJOUTÉ après l'engagement : nouvelle demande acceptée, ou tâches oubliées à l'estimation",
          "Un membre de l'équipe était absent",
          "Le graphique est mal généré",
        ],
        answer: 1,
        explain:
          "Une courbe de travail restant ne peut remonter que si le total augmente. Le burndown ne dit pas laquelle des deux causes est en jeu — c'est sa limite. Le burn-up, lui, trace deux lignes (travail accompli et périmètre total) et montre directement quand le périmètre bouge. D'où sa supériorité dès qu'on suit un projet sur plusieurs mois plutôt qu'un sprint.",
      },
      {
        q: "La direction compare les vélocités de quatre équipes. Deux sprints plus tard, toutes ont augmenté de 30 à 60 % sans livrer davantage. Pourquoi ?",
        options: [
          "Les équipes se sont améliorées grâce à l'émulation",
          "Inflation des points : dès qu'une mesure devient un objectif, elle cesse d'être une bonne mesure — c'est la loi de Goodhart",
          "Les sprints ont été rallongés",
          "Le calcul de la vélocité a changé",
        ],
        answer: 1,
        explain:
          "Un story point est une unité relative que chaque équipe définit pour elle-même : comparer 42 et 51 revient à comparer des pas de personnes différentes. Et dès que le chiffre juge les équipes, il s'ajuste. La seule utilisation légitime de la vélocité est la prévision par une équipe pour elle-même. Pour comparer, il faut des indicateurs que l'équipe ne fabrique pas : lead time, débit en nombre d'éléments, prévisibilité, qualité.",
      },
    ],
  },

  // ══ DOMAINE BUSINESS ENVIRONMENT (26 %) ═══════════════════════════════════
  business: {
    lessons: {
      "pmp-biz-1": [
        {
          id: "pmp-biz-1-a",
          kind: "application",
          title: "EEF ou OPA ?",
          statement: `Classe chacun de ces dix éléments en **EEF** (facteur environnemental de l'entreprise) ou **OPA** (actif organisationnel), et dis si tu peux le **modifier** ou seulement le **subir**.

1. Le modèle de charte de projet utilisé dans ton organisation
2. La réglementation RGPD
3. La culture hiérarchique de l'entreprise
4. La base de données des leçons apprises des projets passés
5. Le logiciel de gestion de projet imposé par la DSI
6. La procédure interne de validation des achats
7. Les conditions du marché du travail dans ton secteur
8. Le référentiel de risques types de ton organisation
9. La tolérance au risque du comité de direction
10. Le format de rapport d'avancement en vigueur

Puis : pourquoi cette distinction est-elle testée à l'examen ? Que change-t-elle en pratique ?`,
          hint: `La question qui tranche : cet élément est-il quelque chose que l'organisation **possède et que je peux réutiliser** (OPA), ou quelque chose qui **s'impose au projet** et que je dois prendre en compte (EEF) ?`,
          solution: `| # | Élément | Type | Modifiable ? |
|---|---|---|---|
| 1 | Modèle de charte | **OPA** | Réutilisable, adaptable |
| 2 | RGPD | **EEF** (externe) | Subi, non négociable |
| 3 | Culture hiérarchique | **EEF** (interne) | Subie à l'échelle d'un projet |
| 4 | Base de leçons apprises | **OPA** | Réutilisable, et à enrichir |
| 5 | Logiciel imposé par la DSI | **EEF** | Subi |
| 6 | Procédure de validation des achats | **OPA** | À suivre, éventuellement adaptable |
| 7 | Marché du travail | **EEF** (externe) | Subi |
| 8 | Référentiel de risques types | **OPA** | Réutilisable |
| 9 | Tolérance au risque de la direction | **EEF** (interne) | Subie |
| 10 | Format de rapport d'avancement | **OPA** | À suivre |

**La règle de distinction, en une phrase** :

> **Les OPA sont ce que l'organisation te donne pour travailler — modèles, procédures, historiques. Les EEF sont ce qui contraint ton travail — culture, réglementation, marché, outils imposés.**

**Deux cas qui piègent** :

**Le logiciel imposé par la DSI (5)** est un EEF interne, pas un OPA. C'est une contrainte subie, pas un actif qu'on choisit d'utiliser. Le critère n'est pas « vient de l'intérieur » mais « m'est-il donné pour m'aider, ou s'impose-t-il à moi ? »

**La culture d'entreprise (3)** est un EEF **interne**. La distinction EEF externe / EEF interne existe et est parfois testée : la réglementation et le marché viennent du dehors, la culture et la tolérance au risque viennent de l'organisation elle-même — mais dans les deux cas, ils s'imposent au projet.

---

**Pourquoi c'est testé, et ce que ça change en pratique**

**Ce sont des entrées de presque tous les processus PMBOK.** Beaucoup de questions d'examen les nomment, et confondre les deux fait rater la réponse.

**Mais la vraie utilité est pratique** : elle dit **où mettre son énergie**.

Devant un EEF — une réglementation, la culture de l'entreprise, un outil imposé — on ne le combat pas : on l'**intègre au plan** et on adapte sa façon de travailler. Un chef de projet qui passe six mois à essayer de changer la culture de son organisation ne livre pas son projet.

Devant un OPA, on **l'utilise plutôt que de réinventer**. Un modèle de charte existant, une base de leçons apprises, un référentiel de risques : les ignorer pour repartir de zéro est le gaspillage le plus courant en gestion de projet — et l'une des raisons pour lesquelles les mêmes erreurs se répètent d'un projet à l'autre.

**Et une nuance** : les OPA ne sont pas seulement à consommer, ils sont à **enrichir**. Alimenter la base de leçons apprises à la clôture est ce qui transforme un actif dormant en actif vivant.`,
        },
        {
          id: "pmp-biz-1-b",
          kind: "situation",
          title: "L'exigence réglementaire découverte au mois 7",
          statement: `**Cas situationnel.**

Ton projet de plateforme de données est au mois 7 sur 11. Le service conformité, qui n'avait pas été impliqué, découvre que la solution ne respecte pas une obligation de localisation des données personnelles : elles doivent rester sur le territoire national, or ton hébergeur les réplique à l'étranger.

Les conséquences :
- l'architecture retenue est incompatible en l'état
- corriger représente environ 6 semaines et 90 k€
- la date de mise en service est engagée auprès du client
- le sponsor te demande si « on peut passer outre en attendant »

1. réponds à la question du sponsor
2. quelle est ta **première action**, avant même de chiffrer ?
3. quel processus a échoué en amont, et comment tu le répares
4. construis les options que tu présentes en comité, avec leurs conséquences
5. dans quelle catégorie classes-tu cette obligation, et qu'est-ce que ça implique ?

**Le point 1 n'admet qu'une réponse.** Formule-la de façon utilisable en réunion.`,
          hint: `Une obligation légale n'est pas une exigence négociable dont on discute le coût. Et pour le point 3, demande-toi à quel moment le service conformité aurait dû apparaître — la réponse est dans un processus du tout début de projet.`,
          solution: `**1. La réponse au sponsor**

> « Non, et ce n'est pas une question de méthode ou de coût. C'est une obligation légale : la non-conformité nous expose à une sanction financière, à l'obligation de suspendre le traitement, et à un risque réputationnel bien supérieur à 90 k€. Passer outre en connaissance de cause engagerait aussi la responsabilité personnelle de ceux qui l'ont décidé. Ce que je peux faire, c'est te présenter les options pour limiter l'impact sur la date et le budget — et il y en a. »

**Ce que fait cette réponse** : elle refuse sans ambiguïté, elle explique **pourquoi** en termes de risque et pas de principe, elle mentionne la responsabilité — élément décisif pour un sponsor — et elle **enchaîne immédiatement sur les options**, ce qui évite de laisser la conversation sur un refus.

**2. La première action, avant de chiffrer : impliquer le service conformité, formellement et tout de suite.**

Pas pour se couvrir. Parce qu'ils sont les seuls à pouvoir dire **exactement** ce que l'obligation impose : toutes les données ou seulement certaines catégories, la réplication de sauvegarde est-elle concernée, un chiffrement avec clés localisées suffit-il ?

Ces réponses changent complètement l'ampleur du problème. Chiffrer une correction avant de savoir précisément ce qui est exigé, c'est risquer de dépenser 90 k€ pour un besoin qui en demandait 20.

**Comprendre avant d'agir**, encore une fois.

**3. Le processus qui a échoué**

**L'identification des parties prenantes et des exigences de conformité, en début de projet.**

Le service conformité est une partie prenante à **fort pouvoir** — il dispose d'un droit de blocage. Ne pas l'avoir identifié au cadrage est l'erreur d'origine, et elle s'est payée sept mois plus tard.

*La réparation, à deux niveaux* :

**Sur ce projet** : intégrer la conformité au comité de pilotage, et faire une revue complète des autres obligations applicables — il y en a probablement d'autres qu'on n'a pas vues.

**Pour l'organisation** : ajouter aux OPA une **liste de contrôle des exigences de conformité** à passer systématiquement au cadrage, et faire du service conformité une partie prenante obligatoire de toute charte de projet. C'est exactement le rôle des actifs organisationnels : transformer une erreur en dispositif.

**4. Les options à présenter en comité**

**Option A — corriger complètement avant la mise en service.**
*Conséquence* : +6 semaines, +90 k€, date client décalée. Conformité assurée.

**Option B — mise en service partielle, sur le périmètre non concerné par les données personnelles**, et correction en parallèle.
*Conséquence* : la date est tenue pour une partie de la valeur, la correction se poursuit. Faisable si l'architecture permet de séparer les flux — c'est la question technique à poser.

**Option C — solution technique alternative** : hébergement souverain, chiffrement à clés localisées, ou cantonnement des données concernées.
*Conséquence* : coût et délai à évaluer avec la conformité — potentiellement inférieurs à l'option A.

**Option D — reporter la mise en service et renégocier avec le client.**
*Conséquence* : impact commercial et relationnel, à mettre en balance.

**Ce qui n'est pas une option** : mettre en service en l'état.

**Et la présentation en comité inclut** : la demande de changement formelle, l'impact chiffré de chaque option, ta recommandation identifiée comme telle, et le fait que la décision revient au comité — pas à toi.

**5. La catégorie, et ce que ça implique**

C'est un **EEF externe** : une obligation réglementaire imposée au projet, que l'organisation ne peut ni négocier ni modifier.

**Ce que ça implique** : elle ne s'arbitre pas contre le coût ou le délai. Un EEF de ce type est une **contrainte**, pas une exigence. On adapte le projet à la contrainte, jamais l'inverse.

C'est précisément la distinction qui rend la question du sponsor irrecevable : « peut-on passer outre » est une question qu'on pose sur une exigence, pas sur une obligation légale.

---

**Le principe : les exigences de conformité s'identifient au cadrage, pas quand elles bloquent.** Le domaine Business Environment est passé de 8 % à 26 % de l'examen 2026 précisément parce que ce type de situation — conformité, gouvernance, alignement — fait échouer plus de projets que les difficultés techniques.`,
        },
      ],
      "pmp-biz-2": [
        {
          id: "pmp-biz-2-a",
          kind: "application",
          title: "Chiffrer la valeur d'un projet",
          statement: `Un projet d'automatisation coûte **400 000 €** et doit générer **150 000 €** d'économies annuelles pendant 5 ans.

1. calcule le **retour sur investissement** (ROI) sur 5 ans
2. calcule le **délai de retour** (*payback period*)
3. calcule la **valeur actuelle nette** (VAN) avec un taux d'actualisation de 8 %
4. explique pourquoi la VAN est un meilleur critère que le ROI

Puis classe ces trois situations en **projet**, **programme** ou **portefeuille** :
- **a)** refondre le site e-commerce
- **b)** l'ensemble des initiatives de transformation numérique de l'entreprise, avec leur arbitrage budgétaire
- **c)** le déploiement d'un ERP : migration des données, formation, refonte des processus, conduite du changement — quatre projets liés`,
          hint: `La VAN actualise les flux futurs : 150 000 € reçus dans 3 ans valent moins que 150 000 € aujourd'hui. Formule : \`VAN = Σ [flux_année_n / (1 + taux)^n] − investissement initial\`.`,
          solution: `**1. Le ROI sur 5 ans**

\`\`\`
Bénéfices totaux = 150 000 × 5 = 750 000 €
Gain net         = 750 000 − 400 000 = 350 000 €
ROI = 350 000 / 400 000 = 87,5 %
\`\`\`

**2. Le délai de retour**

\`\`\`
400 000 / 150 000 = 2,67 ans, soit environ 2 ans et 8 mois
\`\`\`

**3. La valeur actuelle nette à 8 %**

\`\`\`
Année 1 : 150 000 / 1,08¹ = 138 889 €
Année 2 : 150 000 / 1,08² = 128 601 €
Année 3 : 150 000 / 1,08³ = 119 075 €
Année 4 : 150 000 / 1,08⁴ = 110 254 €
Année 5 : 150 000 / 1,08⁵ = 102 087 €
                            ─────────
Somme actualisée          = 598 906 €
VAN = 598 906 − 400 000   = 198 906 €
\`\`\`

**VAN positive → le projet crée de la valeur**, même après prise en compte du coût du capital.

**4. Pourquoi la VAN est meilleure que le ROI**

**Le ROI ignore le temps.** Il traite de la même façon 150 000 € encaissés l'an prochain et 150 000 € encaissés dans cinq ans. Or l'argent a un coût : immobiliser 400 000 € pendant cinq ans a une valeur d'opportunité.

Observe l'écart : le ROI annonce 350 000 € de gain, la VAN 198 906 €. **La différence de 151 000 € est le coût du temps** — et c'est une somme réelle.

**Le ROI ne permet pas de comparer des projets de durées différentes.** Un projet à 87,5 % de ROI sur cinq ans et un autre à 60 % sur deux ans : lequel est meilleur ? Le ROI ne le dit pas, la VAN oui.

**La règle de décision** : entre plusieurs projets, on retient **la VAN la plus élevée** — pas le ROI le plus élevé, pas le délai de retour le plus court.

⚠️ Le **délai de retour** est utile comme indicateur de **risque** — plus il est court, moins on est exposé — mais il ne mesure aucune création de valeur, puisqu'il ignore tout ce qui se passe après le point d'équilibre.

---

**Projet, programme, portefeuille**

**a) Refonte du site e-commerce → projet.** Un effort temporaire, un résultat unique.

**b) Ensemble des initiatives de transformation, avec arbitrage budgétaire → portefeuille.** Le mot qui tranche est **arbitrage** : un portefeuille regroupe des projets et programmes qui ne sont pas nécessairement liés entre eux, et son objet est de **choisir** où investir en fonction de la stratégie.

**c) Déploiement ERP avec quatre projets liés → programme.** Des projets **coordonnés** pour obtenir des bénéfices qu'on n'atteindrait pas en les menant séparément. C'est ce lien de dépendance qui définit le programme.

**Le critère qui départage b et c** : un programme cherche des **bénéfices communs** issus de la coordination ; un portefeuille fait de l'**allocation de ressources** entre initiatives qui n'ont pas besoin d'être liées.`,
        },
        {
          id: "pmp-biz-2-b",
          kind: "situation",
          title: "Le projet qui ne crée plus de valeur",
          statement: `**Cas situationnel.**

Ton projet dure depuis 14 mois sur 20. Il a consommé 1,2 M€ sur un budget de 1,8 M€. Techniquement, tout se passe bien : dans les temps, dans le budget, qualité correcte.

Mais :
- le concurrent principal a sorti il y a 4 mois un produit qui couvre 80 % du besoin
- le business case initial reposait sur 15 % de parts de marché gagnées ; l'étude actualisée annonce 3 %
- le directeur commercial qui portait le projet a quitté l'entreprise
- l'équipe est motivée et fière du travail accompli

Personne ne pose la question.

1. quelle est la question que personne ne pose, et pourquoi personne ne la pose
2. que fais-tu, concrètement ?
3. comment traites-tu l'argument « on a déjà dépensé 1,2 M€ » ?
4. quelles sont les options à présenter, et laquelle recommandes-tu ?
5. comment gères-tu l'équipe si la décision est l'arrêt ?

**Le point 3 porte un nom** en économie de la décision. Trouve-le.`,
          hint: `Le business case n'est pas un document qu'on écrit au début et qu'on archive : on y revient pour vérifier que le projet reste justifié. Et 1,2 M€ déjà dépensés ne peuvent pas être récupérés, quelle que soit la décision — que faut-il en conclure ?`,
          solution: `**1. La question que personne ne pose : ce projet doit-il continuer ?**

Personne ne la pose pour des raisons humaines très ordinaires :

**Tout va bien techniquement.** Les indicateurs de projet sont au vert, donc rien n'alerte. C'est exactement ce que l'EVM ne mesure pas — le module Process le disait : un CPI de 1,00 sur un projet devenu inutile reste à 1,00.

**Le porteur du business case est parti.** Personne ne se sent propriétaire de la justification initiale.

**L'équipe est engagée et fière.** Poser la question ressemble à une remise en cause de leur travail.

**Et poser la question a un coût politique** : celui qui la pose devient celui qui « veut tuer le projet ».

**2. Ce que tu fais**

**Tu révises le business case, formellement.** C'est une responsabilité explicite du chef de projet : le business case n'est pas un document d'entrée, c'est un document **vivant** auquel on revient pour vérifier que le projet reste justifié.

Concrètement : reconstituer la justification avec les données actualisées — parts de marché réalistes, bénéfices attendus révisés, coût restant — et la porter au sponsor et au comité de pilotage.

Pas en disant « il faut arrêter ». En disant « voici la justification actualisée, il faut décider ».

**3. L'argument des 1,2 M€ déjà dépensés**

C'est le **sophisme des coûts irrécupérables** (*sunk cost fallacy*).

Ces 1,2 M€ sont dépensés. Ils le resteront que l'on continue ou que l'on arrête. Ils ne peuvent donc **pas** entrer dans la décision.

**La seule question rationnelle est tournée vers l'avant** : les 600 k€ restants produiront-ils plus de valeur qu'un autre usage de ces 600 k€ ?

Formulé ainsi devant un comité, l'argument change de nature. « On a déjà dépensé 1,2 M€, on ne va pas s'arrêter » devient « investissons-nous 600 k€ de plus pour capter 3 % de marché, ou les mettons-nous ailleurs ? ».

C'est le même raisonnement que sur la fonctionnalité déjà commencée au module Process — et c'est un des réflexes que l'examen teste régulièrement.

**4. Les options, et la recommandation**

**A — Arrêter.** On économise 600 k€ et on les réaffecte. Coût : le travail accompli n'est pas valorisé, impact sur l'équipe et sur l'image du projet.

**B — Continuer tel quel.** Cohérence avec l'engagement pris, mais 600 k€ pour 3 % de marché — le retour est probablement négatif.

**C — Réorienter.** Le concurrent couvre 80 % du besoin ; que vaut le produit sur les **20 % restants** ? Il y a peut-être une niche défendable, avec un périmètre réduit et un coût moindre.

**D — Livrer une version minimale** et arrêter là. On récupère une partie de la valeur du travail accompli sans dépenser les 600 k€ complets.

**La recommandation dépend de l'analyse du C** : c'est l'option qu'il faut instruire en priorité, parce qu'elle est la seule qui puisse transformer un actif existant en valeur. Si les 20 % restants ne constituent pas un marché, alors **D** — livrer un socle minimal et arrêter — est généralement préférable à A, parce qu'elle valorise une partie de l'investissement.

**Et la décision n'est pas la tienne.** Tu instruis, tu recommandes, le comité décide.

**5. Si la décision est l'arrêt, gérer l'équipe**

**Annoncer rapidement, clairement, et expliquer le pourquoi.** Une équipe qui apprend l'arrêt par la rumeur perd sa confiance dans l'organisation entière.

**Séparer le travail de la décision.** Le projet s'arrête parce que le marché a changé, pas parce que l'équipe a mal travaillé. Cette distinction doit être dite explicitement, et par le sponsor autant que par toi.

**Valoriser ce qui est réutilisable** : composants, apprentissages, compétences acquises. Un projet arrêté qui alimente les leçons apprises n'est pas une perte totale.

**Traiter les affectations suivantes tout de suite** — c'est la phase *Adjourning* de Tuckman, et l'incertitude sur la suite est ce qui fait le plus de dégâts.

**Et faire une clôture réelle** : rétrospective, documentation, reconnaissance du travail accompli. Un projet arrêté se clôt comme un projet livré.

---

**Le principe : savoir arrêter un projet est une compétence de gestion de projet, pas un aveu d'échec.** Le PMI est explicite là-dessus — si le business case n'est plus valide, le projet doit être arrêté, et c'est au chef de projet de rendre cette information visible. Continuer un projet qui ne crée plus de valeur coûte deux fois : l'argent dépensé, et celui qu'on n'a pas investi ailleurs.`,
        },
      ],
      "pmp-biz-3": [
        {
          id: "pmp-biz-3-a",
          kind: "application",
          title: "Appliquer ADKAR à un déploiement",
          statement: `Tu déploies un nouvel outil de gestion des congés auprès de 600 salariés. L'ancien système était un formulaire papier transmis au responsable.

Applique le modèle **ADKAR** — *Awareness, Desire, Knowledge, Ability, Reinforcement* :

1. pour chaque étape, dis **ce que tu mets en place concrètement**
2. identifie à quelle étape se produit le blocage le plus fréquent, et pourquoi
3. donne, pour chaque étape, un **indicateur** qui te dit si elle est franchie
4. que se passe-t-il si tu sautes l'étape *Desire* ?

Puis : quelle est la différence entre gérer le **projet** et gérer le **changement** ?`,
          hint: `ADKAR est séquentiel : on ne peut pas former quelqu'un qui ne veut pas changer, ni motiver quelqu'un qui ignore pourquoi le changement a lieu. Chaque étape conditionne la suivante.`,
          solution: `**1. Les cinq étapes, concrètement**

**Awareness — la conscience du besoin.**
Communiquer le **pourquoi** avant le quoi : délais de traitement actuels, erreurs de saisie, temps perdu par les responsables. Message porté par la direction, pas par l'équipe projet.

**Desire — l'envie de participer.**
Montrer le bénéfice **pour chacun** : demande en 30 secondes depuis son téléphone, solde visible en temps réel, réponse en 48 h au lieu de deux semaines. Traiter les inquiétudes — « et si je n'ai pas d'ordinateur ? », « qui verra mes données ? ».

**Knowledge — savoir comment faire.**
Formation courte adaptée aux profils, guide d'une page, vidéo de deux minutes, session de questions ouvertes.

**Ability — être capable de le faire.**
Accompagnement à la première utilisation, référents locaux dans chaque service, support réactif les premières semaines. **Savoir n'est pas pouvoir** : c'est à cette étape que se joue l'usage réel.

**Reinforcement — ancrer.**
Fermer l'ancien canal à une date annoncée, célébrer les premiers usages, mesurer et publier l'adoption, corriger vite les irritants remontés.

**2. Le blocage le plus fréquent : *Desire*.**

Parce que c'est la seule étape qu'on **ne peut pas produire** par une action directe. On peut communiquer (Awareness), former (Knowledge), accompagner (Ability), ancrer (Reinforcement) — mais on ne peut pas décréter l'envie.

Et c'est l'étape qu'on saute le plus souvent, parce qu'elle est invisible : on passe de « on a communiqué » à « on a formé » sans jamais vérifier que les gens veulent changer.

**3. Un indicateur par étape**

| Étape | Indicateur |
|---|---|
| Awareness | % de salariés capables d'expliquer pourquoi l'outil change (sondage court) |
| Desire | % d'inscriptions volontaires à une session de formation avant l'obligation |
| Knowledge | % ayant suivi la formation, et score à un quiz de vérification |
| Ability | % ayant réalisé une **première demande réussie** sans assistance |
| Reinforcement | % de demandes passant par le nouvel outil à 1 mois, puis à 3 mois |

**L'indicateur d'Ability est le plus révélateur** : il mesure l'usage réel, pas la présence en formation. Beaucoup de déploiements affichent 95 % de formés et 30 % d'utilisateurs.

**4. Si on saute *Desire***

On obtient le scénario classique : les gens sont informés, formés, capables — et n'utilisent pas l'outil. Ou l'utilisent au minimum, en contournant dès que possible.

Le symptôme typique : les demandes continuent d'arriver par mail « parce que c'est plus simple », et les responsables les acceptent. Trois mois plus tard, deux systèmes coexistent, et le projet a produit un coût sans bénéfice.

**Le réflexe qui suit — rendre l'outil obligatoire — traite le symptôme.** Il produit de la conformité de façade, pas de l'adoption.

---

**Gérer le projet contre gérer le changement**

**Le projet produit le livrable** : l'outil est développé, testé, déployé techniquement. Il se mesure en délai, coût, périmètre, qualité.

**Le changement produit l'adoption** : les gens utilisent réellement l'outil, et les bénéfices attendus se réalisent. Il se mesure en taux d'usage, en satisfaction, en bénéfices constatés.

**Les deux sont distincts, et le second est presque toujours sous-doté.** On planifie six mois de développement et deux semaines de « formation ».

C'est exactement le principe « on crée de la valeur, pas des livrables ». Un outil livré et non utilisé est un projet **échoué**, quels que soient ses indicateurs de projet — et c'est l'une des raisons pour lesquelles le domaine Business Environment pèse désormais 26 % de l'examen.`,
        },
        {
          id: "pmp-biz-3-b",
          kind: "situation",
          title: "L'outil est livré, personne ne l'utilise",
          statement: `**Cas situationnel.**

Trois mois après la mise en service, ton nouvel outil de gestion des interventions affiche :
- 22 % des interventions saisies dans l'outil
- 78 % encore traitées par mail et tableur, comme avant
- 94 % des techniciens ont suivi la formation
- le score de satisfaction de la formation était de 4,2/5

Le sponsor propose de rendre l'outil obligatoire par note de service.

1. que dit l'écart entre 94 % de formés et 22 % d'usage ?
2. la note de service est-elle une bonne idée ? Réponds précisément
3. quelle est ta **première action** pour comprendre ?
4. quelles causes possibles envisages-tu, et comment les distingues-tu ?
5. que fais-tu du fait que les responsables acceptent encore les demandes par mail ?

**Le point 5 est souvent le vrai levier**, et il n'a rien à voir avec l'outil.`,
          hint: `Un taux de formation élevé et un taux d'usage faible signalent que le blocage n'est ni sur *Knowledge* ni sur *Awareness*. Regarde les deux étapes ADKAR restantes — et cherche ce qui rend l'ancien canal encore possible.`,
          solution: `**1. Ce que dit l'écart 94 % / 22 %**

Que le problème n'est **ni la connaissance ni la conscience**. Les gens savent que l'outil existe et savent s'en servir : les étapes *Awareness* et *Knowledge* sont franchies.

Le blocage est sur **Desire** — ils ne veulent pas — ou sur **Ability** — ils ne peuvent pas dans les conditions réelles de leur travail.

Le score de satisfaction de 4,2/5 confirme : la formation était bonne. Ce n'est pas un problème de formation.

**2. La note de service : non, du moins pas seule.**

Elle traite le symptôme sans la cause, et elle produit deux effets pervers :

**De la conformité de façade** — les gens saisiront après coup, en fin de semaine, des données approximatives pour cocher la case. Le taux d'usage montera, la qualité des données sera nulle, et l'outil deviendra une corvée qui n'apporte rien.

**Une dégradation de la confiance** — si la raison du non-usage est légitime (voir point 4), contraindre sans avoir écouté transforme une réticence en ressentiment.

**Ce qui rend une obligation légitime**, c'est de venir **après** avoir traité les causes, et accompagnée d'une date annoncée et de la fermeture de l'ancien canal. C'est l'étape *Reinforcement* d'ADKAR — mais elle vient en cinquième position, pas en première.

**3. La première action : aller voir les techniciens, sur le terrain.**

Pas un sondage. Observer trois ou quatre techniciens pendant une intervention réelle, et leur demander pourquoi ils ne saisissent pas.

C'est souvent l'action la plus rentable et la moins pratiquée. En trois heures sur le terrain, on découvre généralement quelque chose qu'aucun tableau de bord ne montre.

**4. Les causes possibles, et comment les distinguer**

**L'outil est inutilisable dans les conditions réelles.** Pas de réseau dans les sous-sols, saisie impossible avec des gants, écran illisible au soleil, 12 champs obligatoires quand le mail en demandait 2.
*Indice* : les techniciens le disent immédiatement, et le taux d'usage est meilleur chez ceux qui travaillent en intérieur.
*C'est un problème d'**Ability***, et c'est la cause la plus fréquente.

**L'outil leur coûte plus qu'il ne leur rapporte.** Le bénéfice va au management — traçabilité, statistiques — et le coût aux techniciens — 5 minutes de saisie par intervention.
*Indice* : ils comprennent l'intérêt pour l'entreprise mais pas pour eux.
*C'est un problème de **Desire***.

**La saisie double.** Ils doivent remplir l'outil **et** continuer d'informer par mail parce que leur responsable lit ses mails.
*Indice* : ils utilisent les deux canaux plutôt qu'aucun.

**Une méfiance sur l'usage des données.** L'outil horodate les interventions — crainte d'un contrôle du temps de travail.
*Indice* : réticence exprimée à demi-mot, plus forte chez les plus anciens.

**Comment distinguer** : l'observation terrain répond à la première ; la conversation ouverte aux trois autres.

**5. Les responsables qui acceptent encore les mails — le vrai levier**

C'est souvent **la cause principale**, et elle n'a rien à voir avec l'outil.

Tant que l'ancien canal fonctionne, il n'y a **aucune raison** d'utiliser le nouveau. Chaque responsable qui traite une demande arrivée par mail rend l'outil facultatif pour son équipe — et il le fait par pragmatisme, sans intention de saboter quoi que ce soit.

**Ce que ça implique** : le levier n'est pas chez les techniciens, il est chez l'**encadrement**. Ce sont eux qui doivent cesser d'accepter l'ancien canal, et cela suppose qu'ils soient eux-mêmes convaincus et outillés.

**L'action** : traiter l'encadrement comme une population de changement à part entière — leur propre parcours ADKAR, avec leurs propres bénéfices et leurs propres réticences. Puis annoncer une date de fermeture du canal mail, après avoir corrigé les problèmes d'Ability identifiés au point 4.

**Dans cet ordre.** Fermer le canal avant d'avoir corrigé l'outil produirait un blocage opérationnel réel.

---

**Le principe : l'adoption ne se décrète pas, elle se conçoit.** Et quand un nouvel usage ne prend pas, la première question n'est pas « comment les obliger » mais « qu'est-ce qui rend l'ancien usage encore possible, et pourquoi le nouveau leur coûte-t-il plus qu'il ne leur rapporte ».`,
        },
      ],
      "pmp-biz-4": [
        {
          id: "pmp-biz-4-a",
          kind: "application",
          title: "Intégrer la durabilité dans quatre décisions",
          statement: `PMBOK 8 fait de la **durabilité** un principe : prendre en compte les impacts environnementaux, sociaux et économiques.

Pour chacune de ces quatre décisions de projet, dis **comment le critère de durabilité modifie l'analyse**, selon les trois dimensions du *triple bottom line* — peuple, planète, profit :

1. choisir entre deux fournisseurs, l'un 15 % moins cher, l'autre certifié et local
2. dimensionner l'infrastructure d'hébergement d'une nouvelle application
3. planifier le remplacement de 400 postes de travail
4. définir le rythme de travail de l'équipe pour tenir une échéance serrée

Puis : la durabilité est-elle toujours plus coûteuse ? Justifie avec un contre-exemple parmi les quatre.`,
          hint: `Le *triple bottom line* n'oppose pas les trois dimensions : il demande de les évaluer ensemble sur le **cycle de vie complet**, pas seulement au moment de l'achat. Un coût initial plus élevé peut produire un coût total inférieur.`,
          solution: `**1. Les deux fournisseurs**

**Planète** : le fournisseur local réduit le transport ; la certification garantit des pratiques vérifiées.
**Peuple** : conditions de travail, respect des normes sociales — le moins cher l'est parfois pour de mauvaises raisons.
**Profit** : les 15 % d'écart sont un coût **immédiat**. Mais il faut évaluer le coût **total** : risque de rupture d'approvisionnement, coût de contrôle qualité, risque réputationnel, et exposition réglementaire croissante sur la chaîne d'approvisionnement.

*Ce que change la durabilité* : elle transforme une comparaison de prix en comparaison de **coût total et de risque**.

**2. Le dimensionnement de l'hébergement**

**Planète** : la consommation énergétique d'une infrastructure surdimensionnée est un impact direct et mesurable. Le choix d'un hébergeur alimenté en énergie décarbonée compte.
**Profit** : le surdimensionnement coûte tous les mois, pendant des années.

*Ce que change la durabilité* : elle rejoint ici exactement la bonne pratique technique — dimensionner juste, prévoir l'élasticité plutôt que la marge permanente. **Écologie et économie disent la même chose.**

**3. Le remplacement de 400 postes**

**Planète** : la fabrication d'un poste de travail représente l'essentiel de son empreinte, bien avant son usage. Le reconditionnement ou l'allongement de durée de vie a un impact bien supérieur au choix du modèle.
**Peuple** : filière de recyclage, don à des associations, conditions de démantèlement.
**Profit** : reconditionner coûte moins que remplacer.

*Ce que change la durabilité* : elle pose une question que le projet ne se posait pas — **faut-il vraiment remplacer les 400 ?**

**4. Le rythme de travail de l'équipe**

**Peuple** : c'est la dimension sociale de la durabilité, celle qu'on oublie. Un rythme insoutenable produit de l'épuisement, des départs, des erreurs.
**Profit** : le coût d'un départ — recrutement, montée en compétence, perte de connaissance — dépasse largement le gain de quelques semaines d'accélération.

*Ce que change la durabilité* : elle rend explicite que le **rythme soutenable** est un critère de décision, pas un confort. C'est aussi un principe agile — « un rythme de développement soutenable indéfiniment ».

---

**La durabilité est-elle toujours plus coûteuse ? Non — et le cas 2 le montre.**

Dimensionner correctement une infrastructure réduit **simultanément** la consommation énergétique et la facture mensuelle. Il n'y a aucun arbitrage à faire : la décision durable est aussi la décision économique.

Le cas 3 va dans le même sens : reconditionner coûte moins cher que remplacer.

**Ce qui coûte, c'est le cas 1** — et encore, sur le seul horizon immédiat. Sur le cycle de vie complet, l'écart se réduit souvent, parfois s'inverse.

**L'idée à retenir** : la durabilité n'est pas une contrainte qu'on ajoute au projet, c'est un **élargissement de l'horizon d'analyse**. On cesse de décider sur le coût d'acquisition pour décider sur le coût total et l'impact complet. Et c'est précisément ce que fait déjà un bon business case — la durabilité y ajoute deux dimensions que le calcul financier ignorait.`,
        },
        {
          id: "pmp-biz-4-b",
          kind: "situation",
          title: "L'IA dans l'équipe, sans règles",
          statement: `**Cas situationnel.**

Tu découvres que dans ton équipe :
- une analyste utilise un assistant IA public pour rédiger les spécifications, en y collant des extraits du cahier des charges client
- un développeur génère du code avec un outil d'IA et le livre sans toujours le relire entièrement
- le responsable qualité a produit son plan de tests avec une IA et le trouve « meilleur que ce qu'il aurait écrit »
- personne n'a rien caché : il n'existe aucune règle sur le sujet

Le sponsor te demande soit d'interdire, soit de « laisser faire, ça va plus vite ».

1. pourquoi ni l'interdiction ni le laisser-faire ne conviennent
2. quel est le risque le plus grave parmi les trois usages décrits ?
3. quelle posture PMBOK 8 attend-il vis-à-vis de l'IA ?
4. rédige les **cinq règles** que tu proposes à l'équipe
5. qui reste responsable de la qualité d'un livrable produit avec une IA ?

**Le point 2 concerne un usage précis**, et le risque n'est pas la qualité du résultat.`,
          hint: `Regarde ce qui **sort** de l'organisation dans chacun des trois usages, et ce qui y **entre** sans contrôle. Et pour le point 5, la réponse n'a pas changé depuis qu'on utilise des outils.`,
          solution: `**1. Pourquoi ni l'un ni l'autre**

**L'interdiction ne fonctionne pas.** Les outils sont accessibles depuis n'importe quel navigateur ou téléphone personnel. Une interdiction produit un usage clandestin — donc sans contrôle, sans règles, et sans possibilité de traiter les vrais risques. C'est le pire résultat.

**Le laisser-faire non plus.** Il expose l'organisation à des risques réels de confidentialité, de propriété intellectuelle et de qualité, sans que personne ne les ait évalués.

**La bonne réponse est la troisième : encadrer.** Des règles claires, connues, et proportionnées au risque.

**2. Le risque le plus grave : l'analyste qui colle des extraits du cahier des charges client dans un assistant public.**

Ce n'est pas un problème de qualité du résultat — la spécification produite est peut-être excellente.

C'est une **fuite de données confidentielles appartenant à un tiers**. Selon le service utilisé, ces données peuvent être conservées, utilisées pour l'entraînement, ou exposées. Et il s'agit d'informations couvertes par un contrat avec le client.

Les conséquences dépassent le projet : rupture d'engagement contractuel, risque juridique, risque réputationnel. Et c'est **irréversible** — une donnée transmise ne se reprend pas.

Le développeur qui ne relit pas son code crée un risque de qualité, sérieux mais détectable et corrigeable. Le responsable qualité qui utilise l'IA pour son plan de tests ne crée presque aucun risque, à condition de le relire.

**3. La posture attendue par PMBOK 8**

Le PMBOK 8 ajoute une annexe consacrée à l'IA. La posture est claire : **l'IA est un outil d'aide à la décision, pas un décideur**.

Elle assiste l'estimation, l'analyse de risques, la rédaction, le reporting. Mais :

**Le jugement humain reste responsable.** L'IA propose, l'humain valide et assume.

**L'esprit critique est requis** : qualité des données d'entrée, biais possibles, plausibilité du résultat.

**L'éthique et la confidentialité s'appliquent** comme à tout autre traitement d'information.

**4. Les cinq règles**

> **1. Aucune donnée confidentielle dans un outil public.** Ni données client, ni données personnelles, ni secrets techniques, ni éléments contractuels. Si l'usage l'exige, on passe par une instance privée validée par la DSI.
>
> **2. Tout livrable produit avec une IA est relu et validé par un humain**, qui en devient responsable. « L'IA l'a écrit » n'est jamais une explication recevable.
>
> **3. L'usage est déclaré, pas caché.** Sur les livrables où cela compte — code, spécifications — on indique ce qui a été assisté. C'est ce qui permet d'orienter la relecture.
>
> **4. Le code généré est relu, testé et compris** avant livraison. Personne ne livre du code qu'il ne saurait pas expliquer.
>
> **5. On vérifie les faits.** Chiffres, références, citations produits par une IA sont vérifiés à la source avant de figurer dans un document.

**Et une sixième, implicite** : ces règles sont **discutées avec l'équipe**, pas imposées. Elles seront respectées si elles sont comprises.

**5. Qui reste responsable ?**

**La personne qui livre.** Sans ambiguïté, et sans que cela soit une nouveauté.

Un développeur qui copie du code d'un forum en est responsable. Un analyste qui reprend un modèle de spécification en est responsable. L'IA ne change rien à ce principe : elle change seulement la vitesse à laquelle on peut produire quelque chose qu'on n'a pas compris.

**Et c'est précisément là le risque** : la facilité de production augmente plus vite que la capacité de relecture. Un texte qui semble bon est plus difficile à relire de façon critique qu'un texte visiblement bancal.

---

**Le principe : encadrer plutôt qu'interdire ou ignorer.** C'est vrai de l'IA comme de tout usage émergent — et c'est la posture attendue à l'examen 2026, qui traite explicitement le sujet. Une organisation qui n'a pas de règles n'a pas moins d'usage : elle a le même usage, sans visibilité et sans protection.`,
        },
      ],
    },
    finalExercise: {
      title: "Business case et plan de bénéfices",
      duration: "4 à 6 h",
      covers: ["pmp-biz-1", "pmp-biz-2", "pmp-biz-3", "pmp-biz-4"],
      brief: `Justifier un projet devant un comité de direction, chiffres à l'appui.

Cet exercice **rassemble les 4 leçons du module** — conformité et gouvernance (leçon 1), valeur et bénéfices (leçon 2), changement organisationnel (leçon 3), durabilité et IA (leçon 4).

Business Environment est passé de **8 % à 26 %** de l'examen. C'est le changement le plus important de l'ECO 2026, et le domaine que les ressources de préparation antérieures couvrent le moins — donc celui où l'écart se creuse le plus vite entre candidats.`,
      dataset: `Choisis un projet réel de ton organisation, ou construis-en un : une automatisation, un déploiement d'outil, une refonte de processus. Il doit avoir un coût estimable, des bénéfices mesurables, et un impact sur des personnes.

Il te faut : un coût d'investissement, des bénéfices annuels attendus, un horizon de plusieurs années, et une population concernée par le changement.`,
      steps: [
        "**Business case chiffré** : problème, options envisagées, coûts, bénéfices, ROI, VAN avec un taux d'actualisation justifié, et délai de retour. Explique pourquoi tu retiens la VAN comme critère de décision. (leçon 2)",
        "**Plan de réalisation des bénéfices** : quels bénéfices, quand ils se concrétisent, comment ils se mesurent, et **qui en est responsable** — souvent quelqu'un d'autre que le chef de projet, et souvent après la fin du projet. (leçon 2)",
        "**Exigences de conformité applicables** : identifie-les, classe-les en EEF, et évalue leur impact sur le planning et le budget. Une obligation légale ne s'arbitre pas contre un coût. (leçon 1)",
        "**Plan de conduite du changement structuré par ADKAR**, avec un indicateur par étape — et une attention particulière à *Desire* et *Ability*, les deux étapes où les déploiements échouent. (leçon 3)",
        "**Critères de durabilité** : applique le triple bottom line à au moins deux décisions du projet, et montre un cas où la décision durable est aussi la décision économique. (leçon 4)",
        "**Note d'une page pour le comité de direction** : la décision demandée, les chiffres qui la fondent, les risques, et la recommandation. Une page, pas deux.",
      ],
      checklist: [
        "Ma VAN est calculée avec un taux justifié, et je sais dire pourquoi elle vaut mieux que le ROI",
        "Mon plan de bénéfices désigne un responsable pour chaque bénéfice, et il n'est pas toujours le chef de projet",
        "J'ai identifié les exigences de conformité au cadrage, pas après coup",
        "Mon plan de changement a un indicateur par étape ADKAR, dont un qui mesure l'usage réel",
        "J'ai un exemple où durabilité et économie disent la même chose",
        "Ma note tient en une page et un décideur peut trancher après l'avoir lue",
      ],
      selfCheck: `Le vrai test : **donne ta note d'une page à quelqu'un qui ne connaît pas le projet, et demande-lui quelle décision il prendrait.**

S'il te répond « je ne sais pas, il faudrait plus d'informations », la note est ratée — un comité de direction réagira exactement pareil, et ton projet repartira pour un tour.

S'il te répond « je financerais, parce que le retour est de 200 000 € sur cinq ans et que le principal risque est identifié », tu as écrit ce qu'un comité attend. C'est un exercice de synthèse plus que de gestion de projet, et c'est l'une des compétences les plus rares.`,
    },
    quizExtra: [
      {
        q: "Le logiciel de gestion de projet imposé par la DSI : EEF ou OPA ?",
        options: [
          "OPA, car il vient de l'organisation",
          "EEF, car il s'impose au projet — le critère n'est pas l'origine mais la contrainte",
          "Ni l'un ni l'autre, c'est un outil technique",
          "OPA s'il est documenté, EEF sinon",
        ],
        answer: 1,
        explain:
          "Les OPA sont ce que l'organisation te DONNE pour travailler — modèles, procédures, base de leçons apprises, référentiel de risques. Les EEF sont ce qui CONTRAINT ton travail — culture, réglementation, marché, outils imposés. La distinction dit où mettre son énergie : un EEF s'intègre au plan, un OPA s'utilise plutôt que de réinventer.",
      },
      {
        q: "Un projet coûte 400 k€ et rapporte 150 k€/an sur 5 ans. Pourquoi la VAN vaut-elle mieux que le ROI ?",
        options: [
          "Elle est plus simple à calculer",
          "Le ROI ignore le temps : il traite de la même façon 150 k€ encaissés l'an prochain et dans cinq ans",
          "La VAN inclut les risques du projet",
          "Le ROI ne fonctionne que sur des projets courts",
        ],
        answer: 1,
        explain:
          "Ici le ROI annonce 350 k€ de gain, la VAN à 8 % en donne 198 906 € — l'écart de 151 000 € est le coût du temps, et c'est une somme réelle. Le ROI ne permet pas non plus de comparer des projets de durées différentes. Règle de décision : entre plusieurs projets, on retient la VAN la plus élevée. Le délai de retour, lui, mesure le risque d'exposition, pas la création de valeur.",
      },
      {
        q: "Un projet a consommé 1,2 M€ sur 1,8 M€, mais son business case n'est plus valide. Comment traiter l'argument « on a déjà dépensé 1,2 M€ » ?",
        options: [
          "C'est un argument valable : arrêter gaspillerait l'investissement",
          "C'est le sophisme des coûts irrécupérables : ces 1,2 M€ sont dépensés quoi qu'on décide — la seule question est ce que produiront les 600 k€ restants",
          "Il faut continuer jusqu'à 50 % de retour sur investissement",
          "Il faut demander au sponsor de trancher sans analyse",
        ],
        answer: 1,
        explain:
          "Les coûts irrécupérables ne peuvent pas entrer dans la décision. Reformulé devant un comité, « on ne va pas s'arrêter maintenant » devient « investissons-nous 600 k€ de plus pour capter 3 % de marché, ou les mettons-nous ailleurs ? ». Le PMI est explicite : si le business case n'est plus valide, le projet doit être arrêté — et c'est au chef de projet de rendre cette information visible.",
      },
      {
        q: "94 % des utilisateurs sont formés, 22 % utilisent l'outil. Où est le blocage dans ADKAR ?",
        options: [
          "Sur Knowledge : la formation était insuffisante",
          "Sur Desire ou Ability : ils savent faire mais ne veulent pas, ou ne peuvent pas dans les conditions réelles",
          "Sur Awareness : ils ignorent que l'outil existe",
          "Sur Reinforcement : il faut rendre l'outil obligatoire",
        ],
        answer: 1,
        explain:
          "Un taux de formation élevé écarte Awareness et Knowledge. Reste Desire — le bénéfice va au management, le coût aux utilisateurs — et Ability — l'outil est inutilisable dans les conditions réelles de travail. Rendre l'outil obligatoire traite le symptôme et produit de la conformité de façade. Et le vrai levier est souvent ailleurs : tant que l'encadrement accepte encore l'ancien canal, il n'y a aucune raison d'utiliser le nouveau.",
      },
      {
        q: "Un membre de l'équipe colle des extraits du cahier des charges client dans un assistant IA public. Quel est le risque principal ?",
        options: [
          "La qualité du texte produit sera insuffisante",
          "Une fuite de données confidentielles appartenant à un tiers — rupture d'engagement contractuel, et c'est irréversible",
          "Une perte de compétence de l'équipe à long terme",
          "Aucun, tant que le résultat est relu",
        ],
        answer: 1,
        explain:
          "Le risque n'est pas la qualité du résultat mais ce qui SORT de l'organisation. Selon le service, ces données peuvent être conservées ou utilisées pour l'entraînement — et une donnée transmise ne se reprend pas. La posture attendue par PMBOK 8 est d'encadrer, ni d'interdire (ce qui produit un usage clandestin) ni de laisser faire. Et la responsabilité d'un livrable produit avec une IA reste toujours celle de la personne qui le livre.",
      },
    ],
  },

  // ══ STRATÉGIE D'EXAMEN & TYPES DE QUESTIONS ═══════════════════════════════
  "strategie-examen": {
    lessons: {
      "pmp-strat-1": [
        {
          id: "pmp-strat-1-a",
          kind: "application",
          title: "Une stratégie par type de question",
          statement: `Pour chacun des formats de l'examen 2026, écris **la stratégie de réponse** et **le piège spécifique** :

1. choix unique
2. choix multiples (« sélectionnez les 3 »)
3. appariement (*matching*)
4. points chauds (*hotspot*)
5. étude de cas (*case set*) — 3 à 5 questions liées à un scénario long
6. question visuelle — tableau de bord, burndown, radiateur d'information

Puis : lequel de ces formats fait perdre le plus de **temps**, et lequel fait perdre le plus de **points** ?`,
          hint: `Les deux derniers formats sont les nouveautés de 2026. Pour les choix multiples, souviens-toi qu'il n'y a **pas de point partiel**. Et pour les études de cas, le piège concerne la façon de lire, pas la difficulté des questions.`,
          solution: `**1. Choix unique**
*Stratégie* : lire la question **jusqu'au bout** avant les options, souligner mentalement le mot-clé (« en premier », « la MEILLEURE »), puis éliminer avant de choisir.
*Piège* : les options se lisent avant la question, et elles orientent la lecture. Deux réponses sont souvent correctes ; une seule est la meilleure.

**2. Choix multiples**
*Stratégie* : le nombre exact est **toujours donné** — « sélectionnez les 3 ». Traiter chaque option comme un vrai/faux indépendant, puis vérifier qu'on en a bien coché le bon nombre.
*Piège* : **aucun point partiel**. Deux bonnes et une mauvaise valent zéro, exactement comme trois mauvaises. Si l'on hésite entre quatre options pour trois places, on élimine la plus faible plutôt que de choisir les trois plus séduisantes.

**3. Appariement**
*Stratégie* : commencer par les associations **certaines**, ce qui réduit le champ pour les autres. Le raisonnement par élimination fonctionne particulièrement bien ici.
*Piège* : un mauvais appariement en entraîne souvent un second — les erreurs vont par paires.

**4. Points chauds**
*Stratégie* : lire la question **avant** de regarder le schéma, sinon on cherche sans savoir quoi.
*Piège* : cliquer sur la zone qui *ressemble* à la réponse plutôt que sur celle qui répond exactement à la question posée.

**5. Étude de cas — nouveauté 2026**
*Stratégie* : lire le scénario **une seule fois, attentivement**, en repérant les éléments structurants — approche prédictive ou agile, phase du projet, rôle qu'on te donne, contraintes. Puis répondre aux 3 à 5 questions **sans relire le scénario en entier** à chaque fois.
*Piège* : relire les trois paragraphes avant chaque question. Le contexte est alors lu quatre ou cinq fois au lieu d'une, et le budget temps explose.

**6. Question visuelle — nouveauté 2026**
*Stratégie* : identifier d'abord **ce que le graphique représente** — un burndown, un burn-up, un tableau Kanban, un diagramme de réseau — puis chercher l'anomalie ou la valeur demandée.
*Piège* : interpréter un graphique dont on n'a pas identifié la nature. Un burndown qui remonte et un burn-up dont le périmètre monte ne racontent pas la même histoire.

---

**Le format qui fait perdre le plus de temps : l'étude de cas.**

Non par difficulté, mais par volume de lecture. Un *case set* de 4 questions dispose d'un budget d'environ 5 minutes au total, lecture comprise. Le relire à chaque question fait tripler ce budget — et deux *case sets* mal gérés suffisent à mettre tout l'examen en retard.

**Le format qui fait perdre le plus de points : le choix multiple.**

À cause de l'absence de point partiel. Sur une question à choix unique, une hésitation entre deux options donne 50 % de chances. Sur un « sélectionnez les 3 » avec une hésitation, on a beaucoup moins — et le résultat est binaire.

**Le réflexe qui vaut pour tous les formats** : ne jamais laisser une question vide. Il n'y a **pas de pénalité** pour une mauvaise réponse. Une réponse au hasard vaut 25 % d'espérance, une case vide vaut zéro.`,
        },
        {
          id: "pmp-strat-1-b",
          kind: "situation",
          title: "Traiter une étude de cas en cinq minutes",
          statement: `**Cas situationnel.** Gestion d'un format nouveau.

Voici un *case set* tel qu'il pourrait apparaître :

> *Vous êtes chef de projet sur le déploiement d'une plateforme de commande pour un distributeur de 80 magasins. Le projet suit une approche hybride : l'infrastructure est planifiée en prédictif, les fonctionnalités développées en sprints de deux semaines par deux équipes.*
>
> *Au sprint 7 sur 14, le directeur des opérations, sponsor du projet, vous informe que 12 magasins seront fermés pour rénovation entre les mois 4 et 7. Par ailleurs, l'une des deux équipes a perdu son Product Owner, parti dans une autre société. Le service conformité vient de signaler que la gestion des données de carte bancaire doit faire l'objet d'une certification que personne n'avait identifiée.*
>
> *Le budget consommé est de 58 % pour un avancement de 51 %.*

Ce scénario est suivi de **4 questions**.

1. décris ta **méthode de lecture** de ce scénario — que repères-tu, dans quel ordre ?
2. quelles informations sont **structurantes**, et lesquelles sont du décor ?
3. quels sont les **quatre sujets** que les questions vont probablement aborder ?
4. quel est ton budget temps, et comment tu le répartis ?
5. quelle est l'erreur qui coûte le plus cher sur ce format ?`,
          hint: `Sur un scénario long, tout n'a pas le même poids. Cherche : l'**approche** (prédictif, agile, hybride), le **rôle** qu'on te donne, la **phase** du projet, et les éléments **chiffrés**. Ce sont eux qui départageront les réponses.`,
          solution: `**1. La méthode de lecture, dans l'ordre**

**a) L'approche** : hybride, prédictif pour l'infrastructure, sprints pour les fonctionnalités. C'est l'information la plus discriminante — elle change les réponses attendues sur la gouvernance des changements.

**b) Le rôle** : tu es chef de projet, pas Scrum Master ni Product Owner. Les réponses qui te font décider à leur place seront fausses.

**c) La phase** : sprint 7 sur 14, donc à mi-parcours. Pas de cadrage, pas de clôture.

**d) Les chiffres** : 58 % de budget pour 51 % d'avancement — un CPI inférieur à 1, il y aura probablement une question dessus.

**e) Les événements** : trois problèmes distincts, de natures différentes.

**2. Structurant contre décor**

**Structurant** :
- l'approche hybride
- 58 % / 51 % — les seuls chiffres exploitables
- la perte du Product Owner — un rôle Scrum non tenu
- la certification bancaire non identifiée — une exigence de conformité découverte tardivement
- la fermeture de 12 magasins — une contrainte de déploiement

**Décor** : le nombre de magasins (80), le secteur (distribution), le nombre d'équipes (2), la durée des sprints. Ces éléments plantent le contexte sans départager les réponses.

⚠️ **Attention** : le décor d'une question peut être structurant pour une autre du même *case set*. On ne l'efface pas, on le hiérarchise.

**3. Les quatre sujets probables**

**Une question EVM ou performance** : à partir du 58 % / 51 %, calculer ou interpréter un CPI.

**Une question sur la conformité** : que faire de cette certification découverte au sprint 7 ? — la réponse attendue tourne autour de l'impliquer immédiatement, évaluer, et passer par le processus de changement.

**Une question sur le rôle Scrum manquant** : que fait le chef de projet quand une équipe perd son PO ?

**Une question sur la contrainte de déploiement** : les 12 magasins fermés affectent le plan de déploiement — replanification ou séquencement.

**Anticiper les sujets pendant la lecture change tout** : on lit une fois avec une grille, au lieu de relire à chaque question.

**4. Le budget temps**

\`\`\`
4 questions × 1 min 15 = 5 minutes au total
dont lecture du scénario : ~1 min 30
soit ~50 secondes par question
\`\`\`

C'est serré, et **c'est tenable à une condition** : que la lecture soit faite une seule fois, bien. Cinquante secondes suffisent largement à traiter une question dont on a déjà le contexte en tête.

**5. L'erreur qui coûte le plus cher : relire le scénario avant chaque question.**

Elle est naturelle — on veut vérifier. Mais elle fait passer les 1 min 30 de lecture à 6 minutes, et le *case set* de 5 à 10 minutes. Deux *case sets* traités ainsi, et on a perdu 10 minutes sur un budget qui n'en compte que 15 de marge.

**La parade** : après la lecture, prendre trois secondes pour se dire mentalement — ou noter sur le brouillon si le centre l'autorise — les quatre éléments structurants. Approche, rôle, phase, chiffres. Ensuite, on ne revient au texte que pour vérifier un détail précis, jamais pour relire.

---

**Ce format est nouveau en 2026, et c'est précisément pour cela qu'il faut s'y entraîner.** Un candidat qui découvre son premier *case set* le jour de l'examen perdra du temps sur les deux premiers avant de trouver sa méthode — et ce temps ne se rattrape pas.`,
        },
      ],
      "pmp-strat-2": [
        {
          id: "pmp-strat-2-a",
          kind: "application",
          title: "Éliminer avant de choisir",
          statement: `Applique la méthode d'élimination à ces trois questions. **Pour chacune, barre d'abord les mauvaises réponses en disant pourquoi**, avant de choisir.

**Q1.** Le sponsor vous demande d'ajouter une fonctionnalité majeure. Le projet est prédictif, à 60 % d'avancement. Que faites-vous ?
A. Vous refusez : la baseline de périmètre est figée.
B. Vous acceptez : le sponsor a autorité sur le projet.
C. Vous évaluez l'impact et soumettez une demande de changement.
D. Vous demandez à l'équipe si c'est faisable dans les délais.

**Q2.** Un membre de l'équipe vous informe qu'un collègue falsifie ses relevés d'heures. Que faites-vous ?
A. Vous en parlez directement au collègue concerné.
B. Vous signalez le fait selon la procédure de l'organisation.
C. Vous surveillez discrètement pendant quelques semaines.
D. Vous demandez à celui qui vous a informé d'en parler à la hiérarchie.

**Q3.** En sprint review, une partie prenante demande une modification importante de l'incrément présenté. Que faites-vous ?
A. Vous demandez à l'équipe de l'intégrer au sprint en cours.
B. Le Product Owner l'ajoute au backlog produit et la priorise.
C. Vous refusez : le sprint est engagé.
D. Vous escaladez au sponsor pour arbitrage.`,
          hint: `Passe chaque option au filtre des quatre archétypes de distracteurs : ignorer ou minimiser, escalader trop vite, sur-réagir, agir sans comprendre. Ce qui reste est presque toujours la bonne réponse.`,
          solution: `**Q1 — la réponse est C.**

**A barrée** — refus réflexe. Une baseline n'est pas figée, elle est **protégée par un processus**. Refuser sans évaluer, c'est ignorer une demande légitime du sponsor.

**B barrée** — acceptation réflexe. L'autorité du sponsor ne dispense pas de l'analyse d'impact. Accepter sans évaluer, c'est de la dérive de périmètre.

**D barrée** — pas faux, mais **incomplet et au mauvais niveau**. La faisabilité technique n'est qu'une partie de l'impact : il faut aussi le coût, le délai, les risques. Et ce n'est pas à l'équipe de porter la décision.

**C retenue** — évaluer, puis soumettre au processus. C'est la réponse constante à toute demande de changement.

**Q2 — la réponse est B.**

**A barrée** — confronter directement le collègue est risqué et n'est pas ton rôle. Tu n'as ni les éléments ni le mandat pour instruire un soupçon de fraude.

**C barrée** — « surveiller discrètement », c'est **ignorer un problème** en attendant. La valeur Responsabilité impose d'agir.

**D barrée** — se défausser sur celui qui a signalé. C'est lui faire porter un risque qui ne lui appartient pas, et cela revient à ne rien faire.

**B retenue** — suivre la procédure de l'organisation. Le Code d'éthique du PMI impose de signaler les manquements, et par le canal prévu.

⚠️ Note la nuance : « signaler selon la procédure » et non « dénoncer à la hiérarchie ». S'il existe un dispositif — conformité, éthique, RH — c'est celui-là.

**Q3 — la réponse est B.**

**A barrée** — modifier un sprint engagé sans que l'équipe et le PO l'aient arbitré. Le chef de projet n'a pas ce pouvoir.

**C barrée** — refus réflexe. La sprint review **existe précisément pour recueillir ce retour**. Refuser une demande à ce moment revient à vider la cérémonie de son sens.

**D barrée** — escalade inutile. Le mécanisme existe et fonctionne : le backlog produit.

**B retenue** — la demande entre au backlog, le PO la priorise. C'est exactement le circuit prévu.

---

**Le schéma commun aux trois**

Dans chaque question, on trouve : un **refus réflexe**, une **acceptation réflexe** ou une **inaction**, une **escalade ou une défausse**, et **une réponse qui suit le processus prévu**.

C'est cette dernière qui est presque toujours attendue. Le PMI ne teste pas ton audace ni ta fermeté : il teste si tu connais et appliques le mécanisme qui existe pour cette situation.

**Le réflexe à automatiser** : avant de chercher la bonne réponse, **barre les trois mauvaises**. C'est plus rapide et plus fiable, parce que reconnaître un distracteur est plus facile que juger entre deux options plausibles.`,
        },
        {
          id: "pmp-strat-2-b",
          kind: "situation",
          title: "Deux réponses semblent également correctes",
          statement: `**Cas situationnel.** Le cas le plus fréquent à l'examen.

Tu as éliminé deux options. Il t'en reste deux, et **elles semblent toutes les deux correctes**. Le chronomètre tourne.

Exemple typique :

> *Un livrable ne respecte pas un critère de qualité. Le client ne l'a pas remarqué et la livraison est dans deux jours.*
>
> **B.** Vous informez le client de l'écart et proposez un plan de correction.
> **C.** Vous analysez l'impact de l'écart avant de décider de la suite.

1. les deux réponses sont-elles réellement correctes ?
2. quelles sont les **cinq questions** à se poser pour départager deux options plausibles ?
3. applique-les à cet exemple et tranche
4. combien de temps t'accordes-tu pour ce départage, et que fais-tu au-delà ?
5. quelle est l'erreur de raisonnement la plus fréquente à ce moment précis ?

**Le point 2 est le livrable de l'exercice** : une grille de départage que tu utiliseras à chaque hésitation.`,
          hint: `Quand deux réponses sont correctes, la question porte presque toujours sur l'**ordre** ou le **niveau**. Relis l'énoncé : demande-t-il ce qu'il faut faire, ou ce qu'il faut faire **en premier** ?`,
          solution: `**1. Oui, les deux sont correctes — et c'est normal.**

C'est la difficulté principale de l'examen : les distracteurs de haut niveau ne sont pas des réponses fausses, ce sont des réponses **moins bonnes** ou **mal ordonnées**.

**2. Les cinq questions de départage**

**a) Que demande exactement l'énoncé ?**
« En premier » → l'action initiale. « La MEILLEURE » → l'action la plus complète. « Le PROCHAIN » → l'étape suivante dans une séquence déjà commencée.

**b) Y a-t-il un ordre naturel entre les deux options ?**
Si l'une doit logiquement précéder l'autre, et que la question demande « en premier », c'est celle-là.

**c) Laquelle consiste à comprendre avant d'agir ?**
Face à « que faites-vous en premier », c'est presque toujours la bonne.

**d) Laquelle est au bon niveau ?**
Ni sur-réaction (tout arrêter, escalader), ni sous-réaction (ne rien faire, attendre).

**e) Laquelle correspond au rôle qu'on te donne ?**
Chef de projet, Scrum Master, membre d'équipe. Une réponse qui te fait décider à la place d'un autre rôle est fausse, même si l'action est juste.

**3. L'application à l'exemple**

L'énoncé ne contient pas « en premier ». Il faut donc regarder l'**ordre naturel** : on ne peut pas proposer un plan de correction pertinent sans avoir évalué l'impact de l'écart.

**C précède B logiquement.**

Mais si l'énoncé avait dit « quelle est la MEILLEURE action », la réponse basculerait vers **B** — parce qu'elle est plus complète : elle inclut l'information du client, qui est une obligation de la valeur Honnêteté, et elle propose une suite.

**Sans mention explicite dans l'énoncé, C est le choix le plus sûr** : analyser avant d'agir est le réflexe PMI par défaut.

**Ce que cet exemple montre : le même couple de réponses n'a pas le même vainqueur selon un seul mot de l'énoncé.** C'est pourquoi le mot-clé se repère avant de lire les options.

**4. Le temps accordé au départage**

**Trente secondes maximum**, en plus du temps déjà passé.

Au-delà : on choisit celle qui consiste à **comprendre avant d'agir**, on marque la question, et on avance. On y reviendra dans la marge finale si elle existe.

La raison est arithmétique : deux minutes supplémentaires sur une question à deux options — donc 50 % de chances de base — coûtent une question et demie ailleurs, où l'on aurait eu 100 % de chances.

**5. L'erreur de raisonnement la plus fréquente**

**Chercher ce qu'on ferait vraiment, en vrai, dans son organisation.**

C'est ce qui piège le plus les candidats expérimentés. Dans la vraie vie, on informerait peut-être le client tout de suite, ou on corrigerait discrètement en deux jours, ou on en parlerait à son responsable.

**L'examen ne demande pas ce que tu ferais. Il demande ce que le référentiel PMI prescrit.** Quand une réponse te semble « la plus efficace en pratique » et une autre « la plus propre », c'est presque toujours la seconde qui est attendue.

Ce n'est pas de l'hypocrisie : c'est que l'examen évalue la connaissance d'un référentiel commun, pas ton adaptation à ton employeur actuel.

---

**Le livrable à retenir : les cinq questions.** Écris-les, relis-les avant chaque série d'entraînement, et applique-les explicitement pendant vingt questions. Au bout d'un moment, le départage devient un réflexe de quelques secondes — et c'est exactement le gain qui fait passer un score de 65 % à 75 %.`,
        },
      ],
      "pmp-strat-3": [
        {
          id: "pmp-strat-3-a",
          kind: "application",
          title: "Les formules, sans formulaire",
          statement: `Calcule ces six situations **de tête ou sur papier**, sans consulter de formulaire.

1. PV = 80 000 €, EV = 72 000 €, AC = 90 000 €. Calcule CV, SV, CPI, SPI.
2. BAC = 500 000 €, CPI = 0,8. Calcule l'EAC.
3. Une tâche est estimée : optimiste 4 jours, probable 6 jours, pessimiste 14 jours. Calcule l'estimation à trois points.
4. Une équipe passe de 6 à 9 personnes. De combien augmente le nombre de canaux de communication ?
5. BAC = 300 000 €, EV = 120 000 €, AC = 150 000 €. Calcule le TCPI pour tenir le budget.
6. Un projet a un SPI de 1,2 et un CPI de 0,7. Décris-le en une phrase.

Puis écris les **trois repères** qui te permettent de retrouver toutes ces formules sans les mémoriser une par une.`,
          hint: `PERT à trois points : \`(O + 4P + Pe) / 6\`. Canaux de communication : \`n(n−1)/2\`. TCPI pour tenir le BAC : \`(BAC − EV) / (BAC − AC)\`.`,
          solution: `**1.**
\`\`\`
CV  = EV − AC = 72 000 − 90 000 = −18 000 €   (dépassement)
SV  = EV − PV = 72 000 − 80 000 =  −8 000 €   (retard)
CPI = EV / AC = 72 000 / 90 000 = 0,80
SPI = EV / PV = 72 000 / 80 000 = 0,90
\`\`\`

**2.**
\`\`\`
EAC = BAC / CPI = 500 000 / 0,8 = 625 000 €
\`\`\`

**3.**
\`\`\`
(4 + 4×6 + 14) / 6 = (4 + 24 + 14) / 6 = 42 / 6 = 7 jours
\`\`\`
Note que l'estimation à trois points (7 jours) dépasse l'estimation probable (6 jours) : la queue pessimiste tire la moyenne vers le haut. C'est exactement l'intérêt de la méthode.

**4.**
\`\`\`
6 personnes : 6 × 5 / 2 = 15 canaux
9 personnes : 9 × 8 / 2 = 36 canaux
Augmentation : +21 canaux, soit +140 %
\`\`\`
Trois personnes de plus multiplient les canaux par 2,4. **C'est l'argument chiffré derrière « ajouter du monde à un projet en retard le retarde davantage ».**

**5.**
\`\`\`
TCPI = (BAC − EV) / (BAC − AC) = (300 000 − 120 000) / (300 000 − 150 000)
     = 180 000 / 150 000 = 1,20
\`\`\`
Il faudrait produire 1,20 € de valeur par euro dépensé sur tout le reste, alors qu'on est actuellement à CPI = 0,80. Un écart de 50 % de performance : **irréaliste sans changement structurel**.

**6.**
> Le projet est en avance sur le calendrier mais en dépassement de coût sévère — il a probablement acheté de la vitesse par des heures supplémentaires ou des ressources plus coûteuses.

---

**Les trois repères qui remplacent le formulaire**

**1. EV vient toujours en premier.**
CV = EV − AC. SV = EV − PV. CPI = EV / AC. SPI = EV / PV.
Aucune formule EVM ne commence par autre chose.

**2. Variance = soustraction, Index = division.**
Le nom le dit. Une variance est un écart en euros, un index est un ratio sans unité.

**3. Négatif ou inférieur à 1 = mauvais.**
Vrai pour les quatre indicateurs, sans exception.

**Et deux compléments** :

**Le second terme suit la lettre** : **C**ost va avec **AC**, **S**chedule va avec **PV**. CV et CPI utilisent AC ; SV et SPI utilisent PV.

**Pour l'EAC** : la formule courante \`BAC / CPI\` répond à « si ça continue comme ça ». Si l'énoncé précise que l'écart est ponctuel et ne se reproduira pas, c'est \`AC + (BAC − EV)\`. **Lis l'hypothèse avant de calculer.**

Avec ces repères, on ne mémorise plus six formules : on en reconstruit six à partir de trois phrases.`,
        },
        {
          id: "pmp-strat-3-b",
          kind: "situation",
          title: "Ta fiche mémoire d'une page",
          statement: `**Cas situationnel.** Construction d'un outil personnel.

À J-2 avant l'examen, tu ne réviseras pas un livre. Tu reliras **une page** — celle que tu auras construite toi-même.

1. construis cette page : qu'y mets-tu, et pourquoi **ça** plutôt qu'autre chose ?
2. quels sont les **critères** de ce qui mérite d'y figurer ?
3. qu'est-ce qui n'y a **pas** sa place, même si c'est important ?
4. teste-la : cache-la et récite-la. Que reste-t-il ?
5. quand la construis-tu, et pourquoi pas à J-2 ?

**Le point 3 est le plus difficile.** Une fiche qui contient tout ne sert à rien.`,
          hint: `Le critère n'est pas « qu'est-ce qui est important » — tout l'est — mais « qu'est-ce que je risque d'oublier **sous pression**, et qui me coûterait des points ». Ce sont deux listes très différentes.`,
          solution: `**1. Un exemple de fiche**

> **MINDSET — le filtre de toute question situationnelle**
> Comprendre avant d'agir · Servant leadership, lever les obstacles · Créer de la valeur, pas des livrables · Proactif, communiquer tôt · Ne jamais ignorer un problème
> **Distracteurs à barrer** : escalader trop vite · blâmer · ignorer · agir sans analyser · sur-réagir
>
> **CHIFFRES 2026**
> 180 questions / 240 min / 2 pauses de 10 min · People 33 % · Process 41 % · Business 26 % · 60 % agile-hybride
> Rythme : 1 min 15 · jalons 45 / 90 / 135 questions
>
> **EVM**
> EV toujours en premier · Variance = soustraction, Index = division · Négatif ou < 1 = mauvais
> C va avec AC, S va avec PV · EAC = BAC / CPI · TCPI = (BAC−EV)/(BAC−AC)
> PERT = (O + 4P + Pe)/6 · Canaux = n(n−1)/2
>
> **CONFLIT** (Thomas-Kilmann)
> Collaborer = privilégié · Compromis · Accommoder · Forcer (urgence seulement) · Éviter (laisser retomber, puis revenir)
>
> **RISQUES**
> Menaces : éviter, transférer, atténuer, accepter · Opportunités : exploiter, partager, améliorer, accepter · Escalader si hors périmètre
> Contingence = risques connus, PM peut engager · Management = imprévu, sponsor seulement
>
> **ÉTHIQUE** — Responsabilité, Respect, Équité, Honnêteté
> Réponse attendue : divulguer, corriger, refuser
>
> **AGILE**
> PO = quoi et pourquoi · Équipe = comment et combien · SM = facilite
> Vélocité : prévision par l'équipe pour elle-même, jamais comparaison
> Kanban : arrêter de commencer, commencer à finir
>
> **EEF** = ce qui contraint (subi) · **OPA** = ce que l'organisation donne (réutilisable)
>
> **CONTRATS** : forfait = risque vendeur · remboursable = risque acheteur · T&M = mixte
>
> **QUESTIONS**
> Repérer le mot-clé AVANT de lire les options : en premier / MEILLEURE / prochain / prédictif ou agile
> Éliminer avant de choisir · 90 s max puis marquer · jamais de case vide

**2. Les critères d'inclusion**

**Ce que je risque d'oublier sous pression**, pas ce qui est important. Le mindset PMI est important **et** je ne l'oublierai pas — il n'a besoin que d'une ligne de rappel. Le sens du TCPI, je peux le perdre : il mérite sa formule.

**Ce qui se confond facilement** : contingence contre management, leveling contre smoothing, EEF contre OPA, qualité contre grade.

**Ce qui se calcule** — les formules ne se devinent pas.

**Ce qui départage les réponses** : les mots-clés d'énoncé, les archétypes de distracteurs.

**3. Ce qui n'y a pas sa place**

**Tout ce qui se raisonne.** Si tu peux le retrouver en réfléchissant trente secondes, ce n'est pas de la mémoire, c'est de la compréhension — et cela n'a rien à faire sur une fiche.

**Les définitions longues.** Tuckman, ADKAR, Herzberg : si tu ne les as pas comprises à J-2, une fiche ne les sauvera pas.

**Les listes exhaustives.** Les 49 processus, les 12 principes agiles, les 10 domaines de connaissance. Ils ne rentrent pas et ne servent pas.

**Ce que tu maîtrises déjà.** C'est le plus difficile à retirer : on met sur la fiche ce qu'on aime réviser, pas ce dont on a besoin.

**La règle : une page recto. Si ça déborde, c'est qu'il y a du contenu qui se raisonne.**

**4. Le test**

Cache la fiche et récite-la. Ce qui sort tout seul peut être **retiré** — c'est acquis. Ce qui manque doit rester.

Refais le test deux jours plus tard : la fiche rétrécit à chaque passage. À J-2, elle ne devrait contenir que ce qui résiste vraiment.

**5. Quand la construire : pendant toute la préparation, pas à J-2.**

**Sa valeur est dans sa construction, pas dans sa lecture.** Une fiche téléchargée ou recopiée d'un autre candidat ne sert à rien : elle contient ce que l'autre risquait d'oublier, pas ce que toi tu oublies.

La bonne méthode : ouvrir un document dès le début de la préparation, et y ajouter une ligne **à chaque fois qu'une erreur révèle un trou de mémoire**. À la fin, la fiche est le résumé exact de tes propres faiblesses — et c'est pour ça qu'elle marche.

À J-2, on la relit. On ne la fabrique pas.`,
        },
      ],
      "pmp-strat-4": [
        {
          id: "pmp-strat-4-a",
          kind: "application",
          title: "Le plan des quatorze derniers jours",
          statement: `Construis ton plan des **14 derniers jours** avant l'examen, en respectant ces contraintes :

1. au moins **deux examens blancs complets** chronométrés
2. le temps d'**analyse des erreurs** doit être au moins égal au temps passé à faire les examens
3. la révision doit être **ciblée** sur les faiblesses mesurées, pas uniforme
4. **J-1 est un jour de repos**
5. la logistique doit être vérifiée avant J-3

Puis : pourquoi l'analyse doit-elle prendre autant de temps que l'examen lui-même ?`,
          hint: `Un examen blanc de 180 questions prend 4 heures. L'analyse sérieuse de 50 erreurs — écrire pourquoi la bonne réponse est meilleure — en prend au moins autant. C'est là que le score progresse, pas en refaisant ce qu'on sait déjà.`,
          solution: `**Le plan**

| Jour | Contenu | Durée |
|---|---|---|
| **J-14** | Examen blanc n° 1, complet et chronométré | 4 h |
| **J-13** | Analyse des erreurs, écrite, classée par domaine et par type | 4 h |
| **J-12** | Révision ciblée — faiblesse n° 1 identifiée | 3 h |
| **J-11** | Révision ciblée — faiblesse n° 2 | 3 h |
| **J-10** | Série de 60 questions sur les faiblesses + analyse | 3 h |
| **J-9** | Révision ciblée — faiblesse n° 3 + mise à jour de la fiche mémoire | 3 h |
| **J-8** | Relecture de l'**ECO 2026**, tâche par tâche : sais-je traiter chacune ? | 2 h |
| **J-7** | Examen blanc n° 2, complet et chronométré | 4 h |
| **J-6** | Analyse des erreurs + comparaison avec le blanc n° 1 | 4 h |
| **J-5** | Révision ciblée sur ce qui n'a pas progressé | 3 h |
| **J-4** | Série de 60 questions, mix des trois domaines + analyse | 3 h |
| **J-3** | **Vérification logistique** + révision légère (fiche mémoire, formules) | 2 h |
| **J-2** | Relecture de la fiche mémoire, mindset PMI. Rien de nouveau. | 1 h |
| **J-1** | **Repos.** Pas de révision. Sommeil. | — |

**Total** : environ 39 heures, dont 8 d'examens blancs et 8 d'analyse.

**La vérification logistique à J-3**

**Centre Pearson VUE** : adresse exacte, temps de trajet aux heures réelles, pièce d'identité valide (nom identique à l'inscription), heure de convocation.

**En ligne surveillé** : test système effectué, webcam et micro fonctionnels, connexion stable, pièce isolée, bureau totalement dégagé, deuxième écran débranché, quelqu'un prévenu de ne pas entrer.

**À faire à J-3, pas à J-1** : s'il y a un problème, il reste du temps pour le résoudre.

---

**Pourquoi l'analyse doit prendre autant de temps que l'examen**

Parce que **l'examen mesure, l'analyse fait progresser**.

Passer un examen blanc te donne un chiffre. Ce chiffre ne t'apprend rien — sauf qu'il y a un écart. Ce qui te fait progresser, c'est de reprendre chaque erreur et d'écrire pourquoi la bonne réponse est meilleure et pourquoi la tienne était plausible.

Le rapport est très asymétrique : **quatre heures d'examen produisent de l'information, quatre heures d'analyse produisent de l'apprentissage.**

C'est aussi ce qui explique pourquoi enchaîner cinq examens blancs sans analyse ne fait pas progresser : on répète les mêmes erreurs cinq fois, et on finit par les mémoriser comme des réponses au lieu de comprendre le raisonnement.

**Et la règle de proportion en fin de préparation** : 80 % du temps sur les 20 % de faiblesses. Réviser ce qu'on maîtrise est agréable et inutile.`,
        },
        {
          id: "pmp-strat-4-b",
          kind: "situation",
          title: "La veille, et le matin",
          statement: `**Cas situationnel.** Gestion de soi.

Nous sommes à J-1. Tu constates :
- ton dernier examen blanc était à 71 %, le précédent à 68 %
- tu as encore une liste de 12 sujets « à revoir »
- tu dors mal depuis trois nuits
- ton examen est demain à 9 h, en ligne surveillé, depuis chez toi

Puis, le matin de l'examen, à 8 h 40 : le test système échoue, la webcam n'est pas détectée.

1. que fais-tu de tes 12 sujets à revoir, à J-1 ?
2. comment traites-tu le problème de sommeil ?
3. que fais-tu si à J-1 tu paniques et veux tout reporter ?
4. l'incident webcam à 8 h 40 : que fais-tu, dans l'ordre ?
5. pendant l'examen, à la question 40, tu as l'impression de tout rater. Que fais-tu ?

**Le point 3 mérite une réponse honnête.** Il y a un cas où reporter est la bonne décision, et un cas où c'est la panique qui parle.`,
          hint: `À J-1, aucune révision ne change un score de façon significative — mais une mauvaise nuit, si. Et pour le point 5, souviens-toi qu'il y a des questions non notées et que la sensation d'échec en cours d'examen est un mauvais indicateur.`,
          solution: `**1. Les 12 sujets à revoir, à J-1 : tu n'en révises aucun.**

C'est contre-intuitif et c'est la bonne décision. Douze sujets ne se révisent pas en une journée, et tenter de le faire produit trois effets, tous mauvais : de la fatigue, la découverte de nouvelles lacunes, et donc de l'anxiété la veille au soir.

**Ce que tu fais à la place** : une relecture de ta **fiche mémoire**, une heure maximum, le matin. Puis tu t'arrêtes.

Le rendement d'une révision à J-1 est quasi nul ; le coût d'une mauvaise nuit est réel et mesurable sur quatre heures d'examen.

**2. Le sommeil**

Trois nuits de mauvais sommeil avant un examen est banal, et ce n'est pas dramatique — le corps compense sur une journée.

**Ce qui aide** : une activité physique dans la journée, un repas léger le soir, pas d'écran tard, une heure de coucher normale. Ne pas essayer de dormir plus tôt que d'habitude — cela produit l'effet inverse.

**Ce qui n'aide pas** : réviser jusqu'à minuit, ou rester couché en se disant qu'il faut dormir.

**Et si la nuit est mauvaise malgré tout** : ce n'est pas rédhibitoire. Une nuit courte dégrade la concentration, elle n'efface pas ce que tu sais.

**3. Si tu paniques et veux reporter — la réponse honnête**

**Deux situations différentes, qu'il faut distinguer.**

**C'est la panique qui parle** si tes scores sont stables au-dessus de 70 % et en progression — 68 puis 71 %. Dans ce cas, reporter ne règle rien : dans deux semaines, tu seras exactement au même endroit avec les mêmes doutes, et tu auras payé des frais. **Tu y vas.**

**Reporter est justifié** si tes scores sont durablement en dessous de 60 %, ou si un domaine ECO est très bas — le module Fondamentaux fixait ce critère à l'avance, précisément pour ne pas décider sous pression.

**C'est pour cela que le critère de réservation s'écrit avant.** À J-1, on n'est plus en état de décider rationnellement : on applique la décision qu'on a prise à froid.

Ici, avec 68 puis 71 %, le critère est rempli. On y va.

**4. L'incident webcam à 8 h 40 — dans l'ordre**

**a) Ne pas paniquer et regarder l'heure.** Il reste 20 minutes ; c'est peu mais ce n'est pas rien.

**b) Les gestes de base, dans l'ordre** : débrancher/rebrancher la webcam, fermer toutes les autres applications susceptibles de l'utiliser — visioconférence, navigateur, logiciel de capture — vérifier les autorisations système, redémarrer la machine si nécessaire.

La cause la plus fréquente est une **application qui monopolise la caméra en arrière-plan**.

**c) Contacter le support Pearson VUE immédiatement**, par le canal indiqué dans la convocation. Ne pas attendre d'avoir tout essayé : le contact peut se faire en parallèle des tentatives.

**d) Avoir un plan B préparé** — c'est ce qui aurait dû être fait à J-3 : une seconde machine, ou une webcam externe.

**e) Si rien ne fonctionne**, le support gère la reprogrammation. Un incident technique documenté ne se traite pas comme une absence.

**La leçon** : le test système à J-3 sert exactement à ça. Un incident découvert à J-3 est un problème ; le même à 8 h 40 est une crise.

**5. À la question 40, la sensation de tout rater**

**C'est extrêmement fréquent, et c'est un très mauvais indicateur.**

Trois raisons de ne pas s'y fier :

**Les questions ne sont pas classées par difficulté.** Une série de questions difficiles peut arriver n'importe quand, et donne l'impression que tout l'examen est ainsi.

**Dix questions sont non notées** et souvent plus déroutantes que les autres — ce sont des questions en cours de calibrage.

**On ne peut pas s'auto-évaluer en cours d'examen.** De nombreux candidats sortent convaincus d'avoir échoué et obtiennent Above Target.

**Ce que tu fais concrètement** : tu continues, au rythme prévu, en appliquant la méthode. Tu prends la pause au moment prévu — c'est précisément le moment où elle sert le plus. Et tu te rappelles que le score n'est pas une moyenne de ton ressenti.

**Ce que tu ne fais pas** : ralentir pour « mieux faire », recommencer à douter des réponses déjà données, ou changer de méthode en cours de route.

---

**Le principe : les deux dernières semaines se jouent sur la préparation, la dernière journée se joue sur la gestion de soi.** Aucune révision de J-1 n'a jamais fait gagner de points ; une mauvaise nuit et une panique en ont fait perdre à beaucoup de candidats parfaitement prêts.`,
        },
      ],
    },
    finalExercise: {
      title: "Plan de révision personnalisé",
      duration: "3 à 4 h",
      covers: ["pmp-strat-1", "pmp-strat-2", "pmp-strat-3", "pmp-strat-4"],
      brief: `Un plan construit sur tes faiblesses mesurées, pas sur une impression.

Cet exercice **rassemble les 4 leçons du module** — les formats de questions (leçon 1), la méthode d'élimination (leçon 2), les formules et la gestion du temps (leçon 3), les dernières semaines (leçon 4).

C'est un exercice de **diagnostic avant planification** — exactement la démarche que le PMP t'apprend à appliquer à un projet, retournée sur ta propre préparation.`,
      dataset: `Il te faut un test diagnostique de **60 questions minimum**, couvrant les trois domaines dans les proportions de l'ECO 2026 — soit environ 20 questions People, 25 Process, 15 Business — et avec **60 % de contexte agile ou hybride**.

Sources : PMI Study Hall, David McLachlan sur YouTube, ou les quiz de ce parcours agrégés.`,
      steps: [
        "**Passe le test diagnostique de 60 questions**, chronométré à 1 min 15 par question. Sans cette contrainte, le résultat ne reflète pas ta performance réelle. (leçon 3)",
        "**Calcule ton score par domaine ECO** — People, Process, Business — et pas seulement ton score global. Une moyenne flatteuse peut masquer un domaine à 45 %. (leçon 4)",
        "**Classe tes erreurs par type**, pas seulement par domaine : mot-clé mal lu, escalade réflexe, confusion de rôle, réponse « de terrain », trou de contenu réel. (leçon 2)",
        "**Identifie tes 5 tâches ECO les plus faibles** en croisant le score par domaine et le classement par type. (leçon 4)",
        "**Construis un plan de 6 semaines** ciblant ces faiblesses, avec les heures allouées, les dates, et trois examens blancs positionnés. (leçon 4)",
        "**Définis ta stratégie de temps** : rythme par question, jalons de contrôle, placement des pauses, règle de blocage, marge finale. Et ton critère de réservation, écrit à l'avance. (leçons 1 et 3)",
      ],
      checklist: [
        "Mon diagnostic était chronométré, pas fait à mon rythme",
        "J'ai un score par domaine ECO, pas seulement un score global",
        "Mes erreurs sont classées par type et je sais quelle proportion vient de la lecture",
        "Mon plan alloue plus de temps aux faiblesses qu'aux points forts",
        "Ma stratégie de temps contient des jalons de contrôle, pas seulement une moyenne",
        "Mon critère de réservation est chiffré et écrit avant d'être sous pression",
      ],
      selfCheck: `Le vrai test : **compare la liste des sujets que tu croyais faibles avant le diagnostic, et celle que le diagnostic a révélée.**

Si elles coïncident, tu te connais bien. Si elles diffèrent — et c'est le cas le plus fréquent — tu viens d'éviter de passer six semaines à réviser ce que tu maîtrisais déjà.

C'est exactement pourquoi le diagnostic précède le plan, en préparation d'examen comme en gestion de projet : on mesure avant de décider où mettre les ressources.`,
    },
    quizExtra: [
      {
        q: "Sur une question « Sélectionnez les 3 réponses », tu en identifies 2 avec certitude et hésites entre 2 autres. Que fais-tu ?",
        options: [
          "Tu coches les 4, pour maximiser tes chances",
          "Tu élimines la plus faible des deux et coches 3 — il n'y a aucun point partiel, 2 bonnes et 1 mauvaise valent zéro",
          "Tu ne coches que les 2 certaines",
          "Tu passes la question et y reviens plus tard",
        ],
        answer: 1,
        explain:
          "Le nombre exact est toujours donné, et il n'y a pas de point partiel : le résultat est binaire. Cocher 4 quand on en demande 3 invalide la réponse ; n'en cocher que 2 aussi. C'est le format qui fait perdre le plus de points, alors que le case set est celui qui fait perdre le plus de temps.",
      },
      {
        q: "Face à une étude de cas de 4 questions liées à un scénario long, quelle est l'erreur qui coûte le plus cher ?",
        options: [
          "Répondre trop vite sans réfléchir",
          "Relire le scénario avant chaque question — le contexte est alors lu 4 fois au lieu d'une, et le budget de 5 minutes explose",
          "Commencer par la dernière question",
          "Prendre des notes sur le brouillon",
        ],
        answer: 1,
        explain:
          "Un case set de 4 questions dispose d'environ 5 minutes au total, lecture comprise. La méthode : lire une fois attentivement en repérant les éléments structurants — approche, rôle, phase, chiffres — puis répondre sans revenir au texte, sauf pour vérifier un détail précis. Deux case sets mal gérés suffisent à mettre tout l'examen en retard.",
      },
      {
        q: "Deux réponses te semblent également correctes. Quelle question posée à l'énoncé les départage le plus souvent ?",
        options: [
          "Laquelle est la plus détaillée ?",
          "L'énoncé demande-t-il l'action « en premier », « la MEILLEURE », ou « la prochaine » ? Le mot-clé change la réponse",
          "Laquelle mentionne le sponsor ?",
          "Laquelle est la plus longue ?",
        ],
        answer: 1,
        explain:
          "Le même couple de réponses n'a pas le même vainqueur selon un seul mot. « En premier » privilégie l'action qui consiste à comprendre ; « la MEILLEURE » privilégie l'action la plus complète. C'est pourquoi le mot-clé se repère AVANT de lire les options — sinon les options orientent la lecture. Et au-delà de 30 secondes d'hésitation : on choisit celle qui analyse, on marque, on avance.",
      },
      {
        q: "Une équipe passe de 6 à 9 personnes. De combien augmentent les canaux de communication ?",
        options: [
          "De 3 canaux",
          "De 15 à 36, soit +21 canaux — la formule est n(n−1)/2",
          "De 6 à 9 canaux",
          "Ils doublent",
        ],
        answer: 1,
        explain:
          "Trois personnes de plus multiplient les canaux par 2,4. C'est l'argument chiffré derrière la loi de Brooks : ajouter du monde à un projet en retard le retarde davantage, parce que le coût de coordination croît de façon quadratique alors que la capacité de production croît linéairement.",
      },
      {
        q: "À J-1, il te reste 12 sujets « à revoir » et tes scores sont à 68 puis 71 %. Que fais-tu ?",
        options: [
          "Tu révises les 12 sujets intensivement",
          "Tu ne révises rien de neuf : une heure de fiche mémoire le matin, puis repos — le rendement d'une révision à J-1 est nul, le coût d'une mauvaise nuit est réel",
          "Tu reportes l'examen",
          "Tu refais un examen blanc complet",
        ],
        answer: 1,
        explain:
          "Douze sujets ne se révisent pas en une journée, et tenter de le faire produit fatigue, découverte de nouvelles lacunes et anxiété la veille au soir. Sur le report : avec des scores stables au-dessus de 70 % et en progression, c'est la panique qui parle — reporter ne change rien sinon des frais. C'est précisément pour cela que le critère de réservation s'écrit à froid, plusieurs semaines avant.",
      },
    ],
  },

  // ══ EXAMEN BLANC & AUTO-ÉVALUATION ════════════════════════════════════════
  "examen-blanc": {
    lessons: {
      "pmp-mock-1": [
        {
          id: "pmp-mock-1-a",
          kind: "application",
          title: "Exploiter un résultat d'examen blanc",
          statement: `Voici le résultat d'un examen blanc de 180 questions :

\`\`\`
Score global          : 68 %  (122 / 180)
People       (60 q)   : 74 %  (44 / 60)
Process      (74 q)   : 70 %  (52 / 74)
Business     (46 q)   : 57 %  (26 / 46)

Répartition des 58 erreurs par type :
  mot-clé de l'énoncé mal lu ......... 17
  escalade choisie à tort ............ 11
  confusion de rôle (PO / SM / PM) ....  9
  réponse « de terrain » ..............  8
  trou de contenu réel ................ 13
\`\`\`

1. ce candidat est-il prêt ? Justifie avec les deux critères qui comptent
2. quel domaine traiter en priorité, et pourquoi ce n'est pas celui qu'on croit
3. quelle proportion des erreurs vient du **contenu** ? Qu'est-ce que ça implique ?
4. construis son plan des deux prochaines semaines
5. quel gain peut-il espérer, et d'où viendra-t-il principalement ?`,
          hint: `Un score global au-dessus de 70 % ne suffit pas si un domaine est très bas — et Business Environment pèse 26 % de l'examen. Regarde aussi combien d'erreurs viennent réellement d'un manque de connaissances.`,
          solution: `**1. Non, il n'est pas prêt — et pour deux raisons distinctes**

**Le score global est à 68 %**, sous le seuil de 70 % généralement retenu, et il s'agit d'un seul examen : le critère est un score **stable** sur plusieurs blancs consécutifs.

**Business Environment est à 57 %.** C'est le critère qui tranche : un domaine qui pèse **26 % de l'examen** — près d'un quart — à 57 % suffit à faire basculer le résultat, même avec de bons scores ailleurs.

Le critère complet est donc : **≥ 70 % de façon stable, et aucun domaine sous 65 %.** Ni l'un ni l'autre n'est rempli.

**2. Le domaine prioritaire : Business Environment.**

Ce n'est pas celui qu'on croit, parce que le réflexe est de travailler Process — c'est le plus gros domaine (41 %) et celui où il y a le plus d'erreurs en valeur absolue (22 erreurs).

Mais le calcul du **gain potentiel** dit autre chose :

\`\`\`
Business : 57 % -> 75 % sur 46 questions = +8 questions
Process  : 70 % -> 78 % sur 74 questions = +6 questions
\`\`\`

Business offre le meilleur rendement, parce que **l'écart au niveau cible y est le plus grand**. Et c'est logique : ce domaine est passé de 8 % à 26 % en 2026, la plupart des ressources de préparation le couvrent mal, et les candidats le sous-travaillent.

**La règle générale : on travaille l'écart, pas la taille.**

**3. La proportion venant du contenu**

\`\`\`
Trou de contenu réel : 13 erreurs sur 58 = 22 %
Le reste (45 erreurs, 78 %) : lecture, mindset, rôles
\`\`\`

**Quatre erreurs sur cinq ne viennent pas d'un manque de connaissances.**

Ce que ça implique est décisif : réviser trois chapitres de plus ne réglerait qu'un cinquième du problème. Le gain principal viendra du travail sur la **lecture des énoncés** et sur les **réflexes PMI**.

Le détail est encore plus parlant :
- **17 mots-clés mal lus** — c'est le premier poste, et il se corrige en quelques jours
- **11 escalades à tort** — un seul réflexe à automatiser
- **9 confusions de rôle** — un trou ciblé sur les rôles Scrum

**4. Le plan des deux prochaines semaines**

| Jour | Contenu |
|---|---|
| J1-J2 | **Business Environment** : conformité et gouvernance, EEF/OPA, valeur et bénéfices, changement organisationnel, durabilité et IA. C'est le plus gros bloc. |
| J3 | 40 questions Business + analyse écrite |
| J4 | **Rôles agiles** : qui décide quoi entre PO, SM et équipe. Cible les 9 confusions. |
| J5 | **Entraînement à la lecture** : 40 questions en soulignant explicitement le mot-clé avant de lire les options |
| J6 | **Réflexe escalade** : 30 questions situationnelles, en se demandant à chaque fois « est-ce hors de mon contrôle ? » |
| J7 | Repos ou révision légère |
| J8 | Examen blanc n° 2 complet, chronométré |
| J9 | Analyse comparée avec le blanc n° 1 : quels types d'erreurs ont diminué ? |
| J10-J12 | Révision ciblée sur ce qui n'a **pas** progressé |
| J13 | Examen blanc n° 3 |
| J14 | Analyse + décision de réservation |

**5. Le gain attendu, et son origine**

**Un gain de 8 à 12 points est réaliste**, ce qui amènerait autour de 76-80 %.

Et il viendra principalement de trois postes :

**La lecture des mots-clés** — 17 erreurs, dont la majorité se corrigent par un simple changement d'habitude : lire la question jusqu'au bout et repérer le mot-clé **avant** les options.

**Le réflexe d'escalade** — 11 erreurs, un seul principe à intégrer.

**Business Environment** — la seule partie qui demande vraiment de la révision de contenu.

**Ce qui ne rapportera presque rien** : refaire des questions Process, où il est déjà à 70 %. C'est pourtant ce que la plupart des candidats feraient, parce que c'est le domaine le plus visible et le plus fourni en ressources.

---

**Le principe : un score se diagnostique avant de se traiter.** Sans le classement des erreurs par type, ce candidat aurait révisé trois semaines de contenu pour régler 22 % de son problème. Avec, il sait que son gain principal tient à trois changements d'habitude et à un domaine.`,
        },
        {
          id: "pmp-mock-1-b",
          kind: "situation",
          title: "Le score qui stagne à 65 %",
          statement: `**Cas situationnel.**

Tu as passé trois examens blancs complets, espacés de dix jours :

\`\`\`
Blanc n° 1 : 64 %
Blanc n° 2 : 66 %
Blanc n° 3 : 65 %
\`\`\`

Entre chacun, tu as révisé une trentaine d'heures. Tu as l'impression de bien connaître le contenu, et tu ne comprends pas pourquoi ça ne monte pas.

1. quelle est l'hypothèse la plus probable, et comment la vérifier ?
2. cite **trois** raisons différentes pour lesquelles un score stagne malgré du travail
3. qu'est-ce que tu as probablement fait entre les examens, et pourquoi ça n'a pas marché ?
4. que changes-tu concrètement ?
5. faut-il reporter l'examen ? Sur quel critère ?

**Le point 3 décrit ce que fait presque tout le monde**, et c'est précisément ce qui ne marche pas.`,
          hint: `Un score qui stagne malgré du travail signale que le travail ne porte pas sur la bonne chose. Demande-toi ce qui est facile et agréable à réviser, et ce qui est inconfortable — les deux ne sont pas au même endroit.`,
          solution: `**1. L'hypothèse la plus probable : tu révises du contenu alors que tes erreurs viennent d'ailleurs.**

*Comment la vérifier* : reprendre les erreurs des trois examens et les **classer par type** — mot-clé mal lu, escalade réflexe, confusion de rôle, réponse « de terrain », trou de contenu.

Dans la grande majorité des cas, on découvre que 70 à 80 % des erreurs ne viennent pas d'un manque de connaissances. Réviser trente heures de contenu ne peut alors améliorer qu'un cinquième du score — ce qui donne exactement le type de progression observée : +2, puis −1.

**Et un second test** : les erreurs sont-elles **les mêmes** d'un examen à l'autre ? Si oui, elles n'ont jamais été analysées, seulement constatées.

**2. Trois raisons de stagnation**

**a) Le travail ne porte pas sur la bonne cause.** L'hypothèse principale : on révise ce qu'on sait déjà réviser.

**b) Les erreurs sont constatées, pas analysées.** Lire la correction produit un sentiment de compréhension — « ah oui, bien sûr » — qui ne laisse aucune trace. Sans écrire *pourquoi* la bonne réponse est meilleure et *pourquoi* la sienne était plausible, on refait la même erreur.

**c) On répond « en vrai » plutôt qu'« en PMI ».** C'est fréquent chez les candidats expérimentés : leurs réponses sont défendables professionnellement et ne correspondent pas au référentiel. Cette cause produit un plateau très net, parce qu'aucune révision de contenu ne la corrige.

**Une quatrième, plus rare** : la fatigue. Trois examens de quatre heures plus trente heures de révision entre chaque, sans repos, dégrade la performance en fin d'épreuve. À vérifier en comparant le score des 60 premières questions et des 60 dernières.

**3. Ce que tu as probablement fait entre les examens**

**Tu as relu des chapitres, revu des vidéos, refait des fiches.**

C'est ce que tout le monde fait, et cela ne marche pas pour trois raisons :

**C'est de la reconnaissance, pas du rappel.** Relire un chapitre donne l'impression de savoir — c'est exactement le mécanisme qui produit la fausse impression de maîtrise.

**Ce n'est pas ciblé.** On révise l'ensemble, donc majoritairement ce qu'on maîtrise déjà.

**C'est confortable.** Relire est agréable ; analyser ses erreurs par écrit ne l'est pas. On dérive naturellement vers l'activité la plus plaisante.

**4. Ce que tu changes**

**a) Tu arrêtes de relire.** Zéro heure de révision passive.

**b) Tu analyses les erreurs des trois examens, par écrit.** Pour chacune : ma réponse, pourquoi elle me semblait juste, pourquoi la bonne l'est davantage. C'est long — compte 3 à 4 heures pour 60 erreurs — et c'est le seul travail qui produit du gain à ce stade.

**c) Tu classes, et tu identifies les 3 causes dominantes.**

**d) Tu construis une grille personnelle** — les 4 ou 5 réflexes qui t'auraient évité la majorité de tes erreurs — et tu l'appliques **explicitement** sur les 100 questions suivantes, en écrivant le mot-clé souligné et les réponses éliminées.

**e) Tu ne révises du contenu que sur les trous réellement identifiés**, et sur le domaine le plus faible.

**5. Faut-il reporter ?**

**Le critère est la progression, pas le niveau.**

**Si après ce changement de méthode le prochain blanc monte nettement** — 72 % ou plus — la trajectoire est bonne, on ne reporte pas.

**Si le score reste autour de 65 % après avoir travaillé sur les vraies causes**, alors oui, il faut reporter : le problème est plus profond qu'un ajustement de méthode.

**Ce qui ne doit pas entrer dans la décision** : le fait d'avoir déjà payé, ou le nombre d'heures déjà investies. C'est le sophisme des coûts irrécupérables — le même qu'au module Business Environment, appliqué à sa propre préparation.

**Et la décision se prend sur un critère écrit à l'avance**, pas sous le coup de la déception d'un mauvais blanc.

---

**Le principe : quand une action corrective ne produit rien, la question n'est pas « faut-il en faire plus » mais « agit-elle sur la bonne cause ».** Trente heures de révision qui font gagner deux points, c'est le signal qu'on traite le mauvais problème — exactement comme doubler les testeurs sans faire baisser le taux de défauts.`,
        },
      ],
      "pmp-mock-2": [
        {
          id: "pmp-mock-2-a",
          kind: "application",
          title: "Ton plan des dix derniers jours",
          statement: `Construis ton plan des **10 derniers jours**, à partir d'un diagnostic réel — le tien si tu as passé un blanc, sinon celui-ci :

\`\`\`
Score global : 72 %
People   : 78 %   Process : 74 %   Business : 61 %
Erreurs : 40 % lecture du mot-clé, 25 % rôles agiles,
          20 % contenu Business, 15 % divers
Temps : tu as terminé l'examen avec 4 minutes de marge
\`\`\`

1. ce candidat peut-il réserver ? Applique les deux critères
2. construis les 10 jours, heure par heure
3. que fais-tu du signal « 4 minutes de marge » ?
4. combien d'examens blancs places-tu, et pourquoi pas plus ?
5. que contient ton J-1 ?`,
          hint: `Quatre minutes de marge sur 240 signifie que le rythme était juste tenu. Ce n'est pas confortable : le jour J, le stress ralentit, et une seule question longue suffit à basculer en retard.`,
          solution: `**1. Peut-il réserver ?**

**Le score global est à 72 %** — au-dessus du seuil. ✅

**Business Environment est à 61 %** — sous le plancher de 65 %. ❌

**Réponse : pas encore.** Il doit d'abord remonter Business. C'est jouable en dix jours, parce que l'écart est de 4 points seulement et qu'une partie de ses erreurs sur ce domaine relève de la lecture, pas du contenu.

**2. Le plan sur 10 jours**

| Jour | Contenu | Durée |
|---|---|---|
| **J-10** | Business Environment — conformité, gouvernance, EEF/OPA | 3 h |
| **J-9** | Business — valeur, bénéfices, business case, projet/programme/portefeuille | 3 h |
| **J-8** | Business — changement organisationnel, durabilité, IA + 30 questions Business | 3 h |
| **J-7** | **Rôles agiles** : qui décide quoi. 40 questions en contexte agile. | 3 h |
| **J-6** | **Entraînement lecture** : 50 questions en soulignant le mot-clé avant les options | 2 h |
| **J-5** | **Examen blanc complet**, chronométré, en visant 15 min de marge | 4 h |
| **J-4** | Analyse écrite des erreurs, comparaison avec le blanc précédent | 3 h |
| **J-3** | Révision ciblée sur ce qui n'a pas progressé + **vérification logistique** | 3 h |
| **J-2** | Relecture de la fiche mémoire. Rien de nouveau. | 1 h |
| **J-1** | **Repos** | — |

**Total** : environ 25 heures.

**3. Le signal des 4 minutes de marge**

C'est un **avertissement**, pas un succès.

Quatre minutes sur 240 signifie que le rythme était tenu de justesse. Le jour J, trois facteurs vont le dégrader : le stress ralentit la lecture, les *case sets* prennent plus de temps qu'en entraînement, et un incident — une question mal formulée, une hésitation longue — suffit à basculer en retard.

**Ce qu'il faut travailler** : la **décision rapide**, pas la lecture rapide. Concrètement, la règle des 90 secondes doit être appliquée strictement pendant l'entraînement — marquer et passer, sans exception. C'est l'objet du J-6.

**L'objectif au prochain blanc : 15 minutes de marge minimum.**

**4. Un seul examen blanc en dix jours**

Parce qu'à ce stade, **l'analyse rapporte davantage que la mesure**.

Un blanc de plus consomme 4 heures et produit un chiffre. Quatre heures d'analyse des erreurs déjà commises produisent de l'apprentissage.

Et enchaîner les blancs sans changer de méthode entre eux donne trois fois le même score — c'est exactement le plateau décrit dans l'exercice précédent.

**La règle : au moins autant de temps d'analyse que de temps d'examen.** Ici : 4 h de blanc, 3 h d'analyse, plus la révision ciblée qui en découle.

**5. Le contenu de J-1 : rien.**

Repos complet. Pas de questions, pas de fiche, pas de vidéo.

**La seule chose autorisée** : vérifier la logistique une dernière fois — pièce d'identité, trajet ou installation, heure de convocation — et se coucher à l'heure habituelle.

Le rendement d'une révision à J-1 est nul ; le coût d'une mauvaise nuit se paie sur quatre heures.

---

**Ce que ce plan illustre : la fin de préparation est un exercice de renoncement.** Dix jours ne permettent pas de tout revoir. On choisit trois cibles — le domaine faible, le trou de rôles, la lecture — et on accepte de ne pas toucher au reste.

C'est le même arbitrage que sur un projet contraint : la mauvaise réponse est de tout garder et de tout faire à moitié.`,
        },
        {
          id: "pmp-mock-2-b",
          kind: "situation",
          title: "À J-5, un domaine est encore à 52 %",
          statement: `**Cas situationnel.** Décision finale.

Ton examen est dans **5 jours**, réservé et payé. Ton dernier blanc, hier :

\`\`\`
Score global : 71 %
People   : 79 %   Process : 76 %   Business : 52 %
\`\`\`

Ton score global est bon. Mais Business Environment, qui pèse **26 % de l'examen**, est très bas.

1. calcule ce que donnerait ce profil le jour J, et si c'est suffisant
2. reportes-tu ? Applique ton critère
3. si tu maintiens, que fais-tu de tes 5 jours ?
4. quel est le risque de te concentrer uniquement sur Business ?
5. comment abordes-tu le jour J avec cette faiblesse connue ?

**Le point 1 demande un calcul.** Fais-le avant de décider.`,
          hint: `L'examen compte 170 questions notées, réparties selon les pondérations de l'ECO : 33 % People, 41 % Process, 26 % Business. Calcule le nombre de bonnes réponses attendues avec ce profil, et compare au seuil de réussite estimé.`,
          solution: `**1. La projection**

\`\`\`
170 questions notées, réparties selon l'ECO 2026 :
  People   : 170 × 0,33 = 56 questions
  Process  : 170 × 0,41 = 70 questions
  Business : 170 × 0,26 = 44 questions

Avec le profil actuel :
  People   : 56 × 0,79 = 44,2
  Process  : 70 × 0,76 = 53,2
  Business : 44 × 0,52 = 22,9
                        ──────
  Total               ≈ 120 / 170 = 71 %
\`\`\`

**C'est cohérent avec le score global observé — et c'est juste.**

Le PMI ne publie pas de seuil chiffré : le résultat est donné par domaine en Above / Target / Below Target, et l'algorithme tient compte de la difficulté des questions. Mais l'estimation communément retenue situe le passage autour de 65-70 %.

**À 71 %, on est dans la zone d'incertitude** — et avec **Business en Below Target**, le risque est réel : le PMI valorise une performance équilibrée, et un domaine nettement sous le niveau attendu pèse dans le résultat.

**2. Reporter ou non**

**Le critère écrit à l'avance était : ≥ 70 % de façon stable ET aucun domaine sous 65 %.**

Le premier est rempli, le second ne l'est pas — de 13 points.

**Mais la décision doit intégrer un élément supplémentaire : la faisabilité en 5 jours.**

Passer un domaine de 52 % à 65 % demande environ 15 heures de travail ciblé. Sur 5 jours, c'est faisable si l'on peut y consacrer 3 heures par jour.

**La question à trancher honnêtement** : disposes-tu réellement de ces 15 heures ? Si oui, on maintient et on travaille. Si tu ne peux dégager que 5 heures, l'écart ne se comblera pas et **il faut reporter**.

C'est une décision de faisabilité, pas de courage.

**3. Les 5 jours si tu maintiens**

| Jour | Contenu | Durée |
|---|---|---|
| **J-5** | Business : conformité, gouvernance, EEF/OPA. **Puis 20 questions ciblées.** | 3 h |
| **J-4** | Business : valeur, bénéfices, business case, ROI/VAN, projet/programme/portefeuille + 20 questions | 3 h |
| **J-3** | Business : changement organisationnel (ADKAR), durabilité, IA + 30 questions. **Vérification logistique.** | 3 h |
| **J-2** | 40 questions mixtes, dont 20 Business. Mise à jour de la fiche mémoire. | 2 h |
| **J-1** | **Repos** | — |

**Le point clé : questions après chaque bloc de révision, pas à la fin.** C'est le rappel actif qui fixe, pas la lecture.

**4. Le risque de tout miser sur Business**

**Perdre du terrain sur People et Process.**

Cinq jours sans toucher aux deux autres domaines ne les fait pas disparaître, mais ils représentent **74 % de l'examen**. Une baisse de 3 points sur Process coûte autant que le gain de 13 points sur Business :

\`\`\`
Business : +13 points sur 44 questions = +5,7 bonnes réponses
Process  :  −3 points sur 70 questions = −2,1 bonnes réponses
\`\`\`

Le gain net reste positif, mais l'exemple montre qu'il ne faut pas abandonner totalement les autres domaines.

**D'où le J-2 en questions mixtes** : il maintient les acquis tout en consolidant la cible.

**5. Le jour J avec une faiblesse connue**

**Ne pas modifier ta stratégie de temps.** La tentation est de passer plus de temps sur les questions Business, en se disant qu'on y est plus faible. C'est une erreur : on y gagnerait peu et on perdrait sur les questions où l'on est fort.

**Ne pas identifier les questions par domaine pendant l'épreuve.** Elles ne sont pas étiquetées, et essayer de deviner consomme de l'attention pour rien.

**Appliquer la même méthode partout** : mot-clé, élimination, 90 secondes maximum.

**Et se souvenir que Business Environment est le domaine le plus « mindset » des trois.** Beaucoup de ses questions se traitent par le raisonnement PMI général — alignement sur la valeur, conformité non négociable, adoption plutôt que livraison — plus que par une connaissance précise. Un candidat à 52 % en révision peut y faire nettement mieux le jour J s'il applique ses réflexes.

---

**Le principe : une décision de report se prend sur un critère écrit à froid et sur une évaluation honnête de la faisabilité — jamais sur l'envie d'en finir ni sur la peur d'échouer.** C'est exactement ce que le PMP t'apprend à faire devant un projet en dérive : mesurer, comparer au critère, et décider avec les chiffres.`,
        },
      ],
    },
    finalExercise: {
      title: "Examen blanc chronométré",
      duration: "4 h d'examen + 4 h d'analyse",
      covers: ["pmp-mock-1", "pmp-mock-2"],
      brief: `180 questions, 240 minutes, sans interruption. Comme le jour J.

Cet exercice **rassemble les 2 leçons du module** — la méthode d'auto-évaluation (leçon 1) et le plan des derniers jours (leçon 2). Et il rassemble en réalité **tout le parcours** : c'est le dernier exercice, et le seul qui mesure vraiment.

Le livrable n'est pas le score. C'est **l'analyse écrite des erreurs** et la décision de réservation qui en découle.`,
      dataset: `Il te faut un examen blanc complet de 180 questions, conforme à l'ECO 2026 :

- **PMI Study Hall** — le plus proche du réel, payant, et le seul à proposer les nouveaux formats (études de cas, questions visuelles)
- **David McLachlan** (YouTube) — gratuit, excellent sur le mindset, à compléter pour la répartition
- Les 48 questions du quiz de ce module, à agréger avec d'autres sources

Vérifie la répartition : environ 33 % People, 41 % Process, 26 % Business, et **60 % de contexte agile ou hybride**.`,
      steps: [
        "**Passe l'examen en conditions réelles** : 240 minutes, deux pauses de 10 minutes, téléphone éteint, personne dans la pièce. Sans triche sur le temps ni sur les interruptions. (leçon 1)",
        "**Calcule ton score par domaine ECO**, pas seulement le global. Un domaine sous 65 % suffit à faire échouer un candidat à 72 % de moyenne. (leçons 1 et 2)",
        "**Analyse chaque erreur par écrit** : ta réponse, pourquoi elle te semblait juste, pourquoi la bonne l'est davantage. Compte au moins autant de temps que l'examen lui-même. (leçon 1)",
        "**Classe tes erreurs par type** : mot-clé mal lu, escalade réflexe, confusion de rôle, réponse « de terrain », trou de contenu réel. C'est ce classement qui dit où agir. (leçon 1)",
        "**Note ta marge de temps finale.** Moins de 15 minutes est un signal : c'est la décision qui doit être plus rapide, pas la lecture. (leçon 2)",
        "**Établis ton plan des derniers jours** à partir de ce diagnostic, et applique ton critère de réservation — écrit à l'avance, appliqué sans négociation. (leçon 2)",
      ],
      checklist: [
        "J'ai respecté les 240 minutes et les deux pauses, sans interruption extérieure",
        "J'ai un score par domaine, pas seulement un score global",
        "J'ai écrit l'analyse de chaque erreur, je ne me suis pas contenté de lire les corrections",
        "Mes erreurs sont classées par type et je connais la part qui vient du contenu",
        "J'ai noté ma marge de temps finale et j'en tire une conclusion",
        "J'applique mon critère de réservation sans le renégocier après coup",
      ],
      selfCheck: `Le vrai test, et c'est le dernier du parcours : **reprends dix questions ratées, attends une semaine, et refais-les.**

Si tu retombes dans les mêmes pièges, ton analyse était une lecture. Si tu les traites correctement **et que tu peux dire à voix haute pourquoi ton ancienne réponse était fausse**, tu as appris quelque chose.

Et le signe que la préparation est aboutie : devant une question inédite, sur un sujet que tu n'as pas révisé, tu élimines les trois distracteurs **avant** d'avoir cherché la bonne réponse. Quand ce réflexe est automatique, tu es prêt — quel que soit ton score de la semaine dernière.`,
    },
    quizExtra: [],
  },

};
