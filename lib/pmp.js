// Parcours PMP — Préparation à la certification Project Management Professional (PMI).
// Construit pour le NOUVEL examen en vigueur depuis le 9 juillet 2026 (PMBOK 8, ECO 2026).
// Indépendant des parcours ML et Web. Leçons + quiz + examen blanc.

export const PMP_LEVELS = {
  debutant: { label: "Fondations", color: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/30" },
  intermediaire: { label: "Cœur de l'examen", color: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/30" },
  avance: { label: "Préparation finale", color: "text-rose-400", badge: "bg-rose-500/10 border-rose-500/30" },
};

export const PMP_CURRICULUM = [
  // ── MODULE 1 : FONDAMENTAUX ────────────────────────────────────────────────
  {
    id: "fondamentaux",
    title: "Fondamentaux & examen PMP 2026",
    level: "debutant",
    icon: "🎯",
    description:
      "Comprendre ce qu'est le PMP, vérifier ton éligibilité, et maîtriser le format du nouvel examen 2026 (180 questions, 240 min, PMBOK 8). Le point de départ obligatoire.",
    lessons: [
      {
        id: "pmp-found-1",
        title: "Qu'est-ce que le PMP et pourquoi le passer",
        duration: "30 min",
        content: `Le **PMP (Project Management Professional)** est la certification de gestion de projet la plus reconnue au monde, délivrée par le **PMI (Project Management Institute)**. Plus d'1,4 million de professionnels la détiennent.

**Pourquoi elle a de la valeur**

→ Reconnaissance internationale : c'est souvent un prérequis dans les offres de chef de projet.

→ Impact salarial : le PMI rapporte régulièrement un écart de rémunération significatif (de l'ordre de +20 à +25 %) entre les détenteurs du PMP et les non-certifiés.

→ Cadre commun : un langage et des méthodes partagés (prédictif, agile, hybride) que tout employeur comprend.

**Ce que le PMP n'est pas** : ce n'est pas un cours pour débutant complet. Il valide une **expérience réelle** de conduite de projet. La certification prouve que tu sais diriger des projets, pas seulement réciter de la théorie.

**Le PMP teste un état d'esprit, pas du par-cœur.** La majorité des questions sont des mises en situation : « Que fais-tu en premier ? ». Il faut raisonner comme un chef de projet professionnel selon la vision du PMI — c'est l'objet de ce parcours.

**Ressource officielle** : page certification PMI — https://www.pmi.org/certifications/project-management-pmp`,
      },
      {
        id: "pmp-found-2",
        title: "Éligibilité, 35 heures de formation & candidature",
        duration: "35 min",
        content: `Avant de pouvoir passer l'examen, il faut **candidater auprès du PMI** et remplir les conditions d'éligibilité.

**Deux voies possibles (expérience acquise sur les 10 dernières années)**

→ Avec un diplôme de niveau licence (bac+4 / four-year degree) : **36 mois** d'expérience à diriger des projets.

→ Avec un diplôme de fin d'études secondaires (bac / associate degree) : **60 mois** d'expérience à diriger des projets.

**Dans les deux cas : 35 heures de formation en gestion de projet** (les « 35 contact hours »). Un cours de préparation PMP reconnu fournit cette attestation. Exception : les titulaires du **CAPM** sont dispensés de cette exigence des 35 heures.

**La candidature, étape par étape**

→ Créer un compte sur pmi.org et remplir le formulaire en décrivant tes projets (rôle, durée, livrables).

→ Le PMI peut sélectionner ta candidature pour un **audit** (vérification aléatoire) : garde des justificatifs et les coordonnées d'un supérieur/contact.

→ Une fois approuvée, tu as **1 an et jusqu'à 3 tentatives** pour passer l'examen.

**Adhésion PMI (optionnelle mais rentable)** : ~129 USD/an. Elle réduit le tarif de l'examen et donne accès gratuit au PMBOK 8 et à l'Agile Practice Guide. Elle se rembourse dès la première inscription.

**Ressource** : exigences officielles — https://www.pmi.org/certifications/project-management-pmp`,
      },
      {
        id: "pmp-found-3",
        title: "Le nouvel examen 2026 : format, coût, logistique",
        duration: "30 min",
        content: `**Changement majeur : un nouvel examen depuis le 9 juillet 2026.** Toute personne qui s'inscrit maintenant passe la nouvelle version (basée sur PMBOK 8 et l'ECO 2026). L'ancien examen n'est plus disponible.

**Format de l'examen**

→ **180 questions** au total (dont 10 questions « pré-test » non notées, impossibles à identifier).

→ **240 minutes** (4 h). C'est 10 min de plus que l'ancien examen.

→ **2 pauses optionnelles de 10 minutes** (après ~60 et ~120 questions). Le chrono est suspendu pendant les pauses, mais on ne peut pas revenir en arrière sur les questions déjà passées une fois la section validée.

**Types de questions** : choix unique (la majorité), **choix multiples** (« sélectionnez les 3 »), **appariement** (matching), **points chauds** (hotspot, cliquer sur un schéma), et quelques **textes à trous** (fill-in-the-blank).

**Coût (USD)**

→ Jusqu'en août 2026 : membre PMI ~405 $, non-membre ~555 $.

→ À partir d'août 2026 : membre ~445 $, non-membre ~675 $. Vu l'écart, prendre l'adhésion (~129 $) avant de s'inscrire est quasi toujours gagnant.

**Où le passer** : centre Pearson VUE, ou **en ligne surveillé** (online proctored) depuis chez soi. Mêmes règles strictes (pièce isolée, webcam, bureau dégagé).

**Ressource officielle sur le nouvel examen** : https://www.pmi.org/certifications/project-management-pmp/new-exam`,
      },
      {
        id: "pmp-found-4",
        title: "ECO 2026 & PMBOK 8 : la carte du territoire",
        duration: "40 min",
        content: `L'examen ne suit pas un livre, il suit l'**ECO (Examination Content Outline)** : le référentiel officiel des sujets testés. C'est LE document à connaître.

**Les 3 domaines de l'ECO 2026 (nouvelles pondérations)**

→ **People (Humain) — 33 %** : diriger et faire fonctionner l'équipe.

→ **Process (Processus) — 41 %** : les aspects techniques de la conduite du projet.

→ **Business Environment (Environnement d'affaires) — 26 %** : le lien entre le projet et la stratégie de l'organisation. Sa part a **plus que triplé** (8 % → 26 %) : c'est le grand changement 2026.

**Approches mélangées** : environ **la moitié des questions portent sur le prédictif (cycle en V / « waterfall »)** et l'autre moitié sur l'**agile ou l'hybride**. Ces approches sont réparties dans les 3 domaines, jamais isolées.

**PMBOK 8 (publié fin 2025) — la base théorique**

→ Retour à un **livre unique** réunissant principes et processus.

→ **6 principes** (au lieu de 12) et **7 domaines de performance** : Gouvernance, Périmètre, Échéancier, Finances, Parties prenantes, Ressources, Risque.

→ **40 processus** regroupés en **5 domaines d'attention (Focus Areas)** : Initiation, Planification, Exécution, Surveillance & Maîtrise, Clôture.

→ Nouveautés notables : une annexe **IA** et un **principe de durabilité** — reflet des priorités 2026.

**À retenir** : l'examen teste l'application (jugement situationnel), pas la récitation du PMBOK. Le PMBOK 8 est ta référence conceptuelle ; l'ECO est ta liste de révision.

**Ressource** : ECO 2026 (PDF officiel) — https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf`,
      },
      {
        id: "pmp-found-5b",
        title: "Structures organisationnelles & autorité du PM",
        duration: "35 min",
        content: `La structure de l'organisation dans laquelle évolue un projet détermine directement l'**autorité du chef de projet**, son accès aux ressources et le niveau de soutien dont il bénéficie. C'est un sujet systématiquement testé à l'examen.

**Les 3 grandes structures**

**1. Structure fonctionnelle**

→ L'organisation est découpée par fonctions : département Finance, département IT, département RH, etc. Chaque employé a un seul supérieur hiérarchique fonctionnel.

→ Autorité du PM : **très faible à nulle**. Le PM est souvent un coordinateur de projet sans budget ni équipe dédiée. Les ressources appartiennent aux directeurs fonctionnels.

→ Avantages : spécialisation forte, carrières claires, ressources partagées efficacement.

→ Inconvénients : le projet est souvent secondaire, peu de cohésion d'équipe projet.

**2. Structure projectisée (ou par projets)**

→ L'organisation est structurée autour des projets. Chaque chef de projet dirige une équipe dédiée.

→ Autorité du PM : **totale**. Il contrôle son budget, ses ressources et son équipe.

→ Avantages : forte loyauté envers le projet, décisions rapides.

→ Inconvénients : duplication des ressources, incertitude pour les employés après la fin du projet.

**3. Structure matricielle** — la plus fréquente et la plus testée

→ Combine la structure fonctionnelle et projectisée. Les employés ont deux supérieurs : leur directeur fonctionnel ET le chef de projet.

| Sous-type | Autorité du PM |
|-----------|---------------|
| **Matricielle faible** | Faible — proche du fonctionnel |
| **Matricielle équilibrée** | Partagée avec le directeur fonctionnel |
| **Matricielle forte** | Forte — proche du projectisé |

→ Avantages : partage des ressources, équipe projet visible.

→ Inconvénients : conflits d'autorité, ambiguïté pour les membres de l'équipe, communication complexe.

**Structure composite (hybride)**

→ La plupart des grandes organisations utilisent plusieurs structures en parallèle selon les types de projets.

**Bureau de Gestion de Projets (PMO — Project Management Office)**

→ Entité organisationnelle qui supervise et standardise la gestion de projets. Trois types :

→ **Supportif** (faible contrôle) : fournit des modèles, bonnes pratiques, formation.

→ **Contrôlant** : impose des méthodologies et outils, audite la conformité.

→ **Directif** (fort contrôle) : pilote directement les projets, PM sous l'autorité du PMO.

**Piège examen fréquent** : dans une structure fonctionnelle, si l'équipe ne coopère pas, le PM doit **négocier** avec les directeurs fonctionnels — il ne peut pas imposer. Escalader directement ou contourner la hiérarchie fonctionnelle sans accord = mauvaise réponse.

**Ressource** : PMI Study Hall — domaine People/Process https://studyhall.pmi.org/login`,
      },
      {
        id: "pmp-found-5",
        title: "Plan de préparation réaliste (8 à 12 semaines)",
        duration: "30 min",
        content: `Une préparation sérieuse demande **environ 100 à 150 heures d'étude**, soit **8 à 12 semaines** à raison de 8 à 12 h/semaine. Plus court est risqué ; plus long fait perdre l'élan.

**Plan type sur 10 semaines**

→ Semaines 1-2 : fondamentaux + mindset PMI (modules 1-2 de ce parcours).

→ Semaines 3-6 : les 3 domaines People, Process, Business + Agile/Hybride (modules 3-6).

→ Semaines 7-8 : stratégie d'examen + premières séries de questions (module 7).

→ Semaines 9-10 : **examens blancs chronométrés** + analyse des erreurs (module 8). On vise un score stable d'environ **70 %+ en simulation** avant de réserver.

**Les meilleures ressources (gratuit et premium)**

→ Officiel : **PMI Study Hall** (banque de questions et examens blancs au plus proche du réel, premium recommandé) — https://studyhall.pmi.org/login ; cours officiels PMI — https://www.pmi.org/learning/exam-prep

→ Vidéo gratuit : **David McLachlan** (YouTube, des centaines de questions corrigées + mindset) — https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg ; sa playlist d'entraînement — https://www.youtube.com/playlist?list=PLEWFSKHjyrwywWx6mri0ooX5YVjDPrgX1

→ Vidéo / cours : **Andrew Ramdayal (TIA)** — chaîne YouTube https://www.youtube.com/AndrewRamdayal et cours Udemy (35 h, mis à jour examen 2026) https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/

→ Simulateur premium : **PM PrepCast / Exam Simulator** — https://www.project-management-prepcast.com/ et https://www.pm-exam-simulator.com/pmp-exam-simulator

→ Livre de référence : Andrew Ramdayal, « PMP Exam Prep Simplified » (édition examen 2026) ; ou Rita Mulcahy, « PMP Exam Prep ».

**Conseil** : alterne théorie et questions dès la première semaine. On apprend le PMP en s'entraînant sur des mises en situation, pas en lisant passivement.`,
      },
    ],
    quiz: [
      {
        q: "Combien de questions comporte le nouvel examen PMP 2026 et en combien de temps ?",
        options: ["200 questions en 240 min", "180 questions en 240 min", "180 questions en 230 min", "175 questions en 200 min"],
        answer: 1,
        explain: "Le nouvel examen (depuis le 9 juillet 2026) comporte 180 questions (dont 10 non notées) à traiter en 240 minutes, avec 2 pauses optionnelles de 10 min.",
      },
      {
        q: "Quelles sont les pondérations des 3 domaines de l'ECO 2026 ?",
        options: [
          "People 42 %, Process 50 %, Business 8 %",
          "People 33 %, Process 41 %, Business 26 %",
          "People 50 %, Process 33 %, Business 17 %",
          "People 26 %, Process 41 %, Business 33 %",
        ],
        answer: 1,
        explain: "L'ECO 2026 rééquilibre l'examen : People 33 %, Process 41 %, Business Environment 26 %. La part du Business a plus que triplé par rapport à l'ancien examen.",
      },
      {
        q: "Quelle est la condition de formation commune aux deux voies d'éligibilité ?",
        options: [
          "Une licence universitaire obligatoire",
          "35 heures de formation en gestion de projet (sauf titulaires du CAPM)",
          "5 ans d'expérience minimum",
          "L'adhésion payante au PMI",
        ],
        answer: 1,
        explain: "Les 35 contact hours de formation sont exigées dans les deux cas. Seuls les titulaires du CAPM en sont dispensés. L'adhésion PMI, elle, est optionnelle.",
      },
      {
        q: "Quelle part de l'examen porte sur les approches agile ou hybride ?",
        options: ["Environ 10 %", "Environ un quart", "Environ la moitié", "La totalité"],
        answer: 2,
        explain: "Environ la moitié des questions concernent le prédictif et l'autre moitié l'agile/hybride, réparties dans les 3 domaines.",
      },
      {
        q: "Sur quel document faut-il aligner sa révision en priorité ?",
        options: [
          "Uniquement le PMBOK 8 lu de bout en bout",
          "L'ECO (Examination Content Outline), la liste officielle des sujets testés",
          "N'importe quel livre de préparation",
          "Les anciens sujets d'examen",
        ],
        answer: 1,
        explain: "L'examen suit l'ECO, pas un livre. Le PMBOK 8 est la référence conceptuelle, mais l'ECO 2026 est la véritable liste de révision.",
      },
      {
        q: "Quel volume d'étude est réaliste pour préparer le PMP ?",
        options: ["10-20 heures", "100-150 heures sur 8-12 semaines", "300+ heures sur un an", "Aucune, l'expérience suffit"],
        answer: 1,
        explain: "Une préparation sérieuse représente environ 100 à 150 heures réparties sur 8 à 12 semaines, en alternant théorie et entraînement sur questions.",
      },
    ],
  },

  // ── MODULE 2 : MINDSET PMI ─────────────────────────────────────────────────
  {
    id: "mindset",
    title: "Le PMI mindset & l'éthique",
    level: "debutant",
    icon: "🧭",
    description:
      "La clé pour répondre aux questions situationnelles : penser comme le PMI. Servant leadership, création de valeur, tailoring et code d'éthique.",
    lessons: [
      {
        id: "pmp-mindset-1",
        title: "Penser comme le PMI : servant leadership & valeur",
        duration: "30 min",
        content: `La plupart des candidats échouent non par manque de connaissances, mais parce qu'ils ne répondent pas « à la manière PMI ». Maîtriser ce mindset vaut plus que mémoriser 49 processus.

**Les réflexes PMI à intégrer**

→ **Le chef de projet est un servant leader** : il sert l'équipe, lève les obstacles, facilite — il ne commande pas de façon autoritaire.

→ **L'équipe est autonome et responsabilisée** : on ne micro-gère pas. Quand un problème technique survient, on laisse souvent l'équipe le résoudre.

→ **On crée de la valeur, pas seulement des livrables** : la finalité d'un projet est un bénéfice métier, pas juste « terminer à temps ».

→ **Proactif, jamais réactif** : le bon PM anticipe, communique tôt, et traite la cause racine plutôt que le symptôme.

→ **On ne fuit jamais un problème** : on ne l'ignore pas, on ne le remonte pas immédiatement à la hiérarchie sans avoir cherché à comprendre. D'abord analyser, puis agir.

**Test mental face à une question** : la bonne réponse est presque toujours celle qui consiste à **comprendre/analyser la situation, communiquer, et impliquer les bonnes personnes** — avant d'escalader, de blâmer ou d'imposer.

**Ressource** : vidéos « PMP mindset » de David McLachlan — https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg`,
      },
      {
        id: "pmp-mindset-2",
        title: "Tailoring : choisir et adapter l'approche",
        duration: "25 min",
        content: `Le **tailoring (adaptation)** est central dans PMBOK 7/8 : il n'existe pas d'approche unique. Le chef de projet **adapte** méthodes, processus et niveau de formalisme au contexte du projet.

**Prédictif, agile ou hybride ?**

→ **Prédictif (cycle en V)** : à privilégier quand les exigences sont **stables et bien comprises**, le périmètre clair (ex. construction, conformité réglementaire).

→ **Agile** : quand les exigences sont **incertaines ou évolutives**, qu'on veut livrer de la valeur tôt et souvent, avec un fort retour client (ex. produit logiciel innovant).

→ **Hybride** : combiner les deux (ex. planifier l'architecture en prédictif, développer les fonctionnalités en sprints agiles). Très fréquent dans la réalité — et très présent à l'examen.

**Ce qui guide le choix** : niveau d'incertitude, fréquence de changement attendue, criticité, maturité de l'organisation, besoin de feedback.

**Idée forte pour l'examen** : il n'y a pas de « meilleure » méthode dans l'absolu. Une bonne réponse adapte l'approche au contexte décrit dans la question.

**Ressource** : Agile Practice Guide (gratuit avec l'adhésion PMI) — https://www.pmi.org/learning/exam-prep`,
      },
      {
        id: "pmp-mindset-3",
        title: "Code d'éthique & conduite professionnelle",
        duration: "25 min",
        content: `Le PMI impose un **Code d'éthique et de conduite professionnelle** structuré autour de **4 valeurs**. Plusieurs questions de l'examen testent ces principes.

→ **Responsabilité (Responsibility)** : assumer ses décisions et leurs conséquences, signaler ses propres erreurs, respecter les lois.

→ **Respect (Respect)** : traiter chacun avec dignité, écouter, gérer les conflits de façon constructive, respecter les différences culturelles.

→ **Équité (Fairness)** : être impartial, transparent, et **déclarer tout conflit d'intérêts**. Pas de favoritisme, pas de discrimination.

→ **Honnêteté (Honesty)** : dire la vérité, ne pas tromper, communiquer une information exacte — y compris les mauvaises nouvelles.

**Réflexes attendus à l'examen**

→ Face à un conflit d'intérêts : le **divulguer** immédiatement aux parties concernées.

→ Face à une demande contraire à l'éthique ou à la loi (ex. « falsifie le rapport ») : **refuser**, même sous pression hiérarchique.

→ Face à une erreur : **la reconnaître et la corriger**, jamais la cacher.

→ Respecter la confidentialité et la propriété intellectuelle.

**Ressource** : PMI Code of Ethics (site PMI) — https://www.pmi.org/`,
      },
      {
        id: "pmp-mindset-4",
        title: "Répondre aux questions situationnelles",
        duration: "30 min",
        content: `La plupart des questions sont des scénarios : « Vous êtes chef de projet, X arrive, que faites-vous **en premier** ? ». Plusieurs réponses semblent correctes — une seule est la « PMI way ».

**Méthode en 4 temps**

→ **1. Identifier le vrai problème** : que demande réellement la question ? Repère les mots-clés (« en premier », « la MEILLEURE action », agile vs prédictif).

→ **2. Éliminer les distracteurs évidents** : écarte les réponses qui blâment, ignorent le problème, ou escaladent trop vite vers la direction/le sponsor.

→ **3. Préférer comprendre et communiquer** : analyser la situation, consulter les parties prenantes ou l'équipe, revenir au plan/processus — avant d'agir radicalement.

→ **4. Choisir l'action proactive et de niveau approprié** : la bonne réponse résout la cause, au bon niveau, sans sur-réagir.

**Pièges classiques**

→ « Escalader au sponsor » est rarement la première action (sauf hors de ton contrôle).

→ « Changer le périmètre / ajouter des ressources » sans passer par la maîtrise des changements est presque toujours faux.

→ En agile : on s'adresse d'abord à l'**équipe** et au Product Owner, on inspecte/adapte ; on ne réécrit pas un plan figé.

**Ressource** : séries de questions corrigées — David McLachlan (gratuit) https://www.youtube.com/playlist?list=PLEWFSKHjyrwywWx6mri0ooX5YVjDPrgX1 et PMI Study Hall (premium) https://studyhall.pmi.org/login`,
      },
    ],
    quiz: [
      {
        q: "Dans le mindset PMI, comment se comporte d'abord un chef de projet face à un problème d'équipe ?",
        options: [
          "Il escalade immédiatement au sponsor",
          "Il analyse/comprend la situation et facilite la résolution avec l'équipe",
          "Il remplace le membre concerné",
          "Il impose une solution autoritaire",
        ],
        answer: 1,
        explain: "Le PM est un servant leader : il cherche d'abord à comprendre la cause et facilite la résolution. L'escalade n'est pas la première action.",
      },
      {
        q: "Quand privilégier une approche prédictive plutôt qu'agile ?",
        options: [
          "Quand les exigences changent souvent",
          "Quand le périmètre est stable et bien compris",
          "Quand on veut livrer de la valeur très tôt",
          "Toujours, c'est l'approche par défaut",
        ],
        answer: 1,
        explain: "Le prédictif convient aux exigences stables et claires. L'agile convient à l'incertitude et au changement fréquent. Le choix dépend du contexte (tailoring).",
      },
      {
        q: "Quelles sont les 4 valeurs du Code d'éthique du PMI ?",
        options: [
          "Vitesse, Coût, Qualité, Portée",
          "Responsabilité, Respect, Équité, Honnêteté",
          "Leadership, Vision, Courage, Discipline",
          "Transparence, Agilité, Innovation, Performance",
        ],
        answer: 1,
        explain: "Le Code repose sur 4 valeurs : Responsabilité, Respect, Équité (Fairness) et Honnêteté.",
      },
      {
        q: "Un supérieur te demande de falsifier un rapport d'avancement. Que fais-tu ?",
        options: [
          "Tu obéis car il est ton supérieur",
          "Tu refuses : c'est contraire à l'honnêteté et à l'éthique",
          "Tu falsifies partiellement",
          "Tu démissionnes immédiatement",
        ],
        answer: 1,
        explain: "L'honnêteté prime, même sous pression hiérarchique. On refuse une demande contraire à l'éthique et on rapporte une information exacte.",
      },
      {
        q: "Face à un conflit d'intérêts personnel sur le projet, l'action attendue est :",
        options: [
          "Le garder pour soi",
          "Le divulguer aux parties concernées",
          "Quitter le projet sans explication",
          "En tirer un avantage discret",
        ],
        answer: 1,
        explain: "L'équité (fairness) impose de déclarer tout conflit d'intérêts de façon transparente aux parties concernées.",
      },
    ],
  },

  // ── MODULE 3 : DOMAINE PEOPLE (33 %) ───────────────────────────────────────
  {
    id: "people",
    title: "Domaine People — diriger l'équipe (33 %)",
    level: "intermediaire",
    icon: "👥",
    description:
      "Un tiers de l'examen. Constituer une équipe performante, motiver, gérer les conflits, pratiquer le servant leadership et engager les parties prenantes.",
    lessons: [
      {
        id: "pmp-people-1",
        title: "Constituer et lancer une équipe performante",
        duration: "35 min",
        content: `Le domaine People concerne les compétences humaines pour **diriger** une équipe. Première étape : la constituer et lui donner un cadre.

**Les 5 étapes de Tuckman** (dynamique d'équipe)

→ **Forming** : l'équipe se forme, polie et prudente.

→ **Storming** : tensions, désaccords — phase normale et nécessaire.

→ **Norming** : des règles communes émergent, la collaboration s'installe.

→ **Performing** : l'équipe est autonome et très productive.

→ **Adjourning** : dissolution en fin de projet.

**Outils de lancement**

→ **Team charter (charte d'équipe)** : document co-construit définissant valeurs, règles de fonctionnement (« ground rules »), modes de communication et de décision. Crée l'adhésion.

→ **Ground rules** : règles de comportement convenues ensemble (ponctualité aux réunions, respect, gestion des désaccords).

→ En agile : équipes **réduites, pluridisciplinaires et auto-organisées**, idéalement co-localisées ou bien outillées si distantes.

**Idée clé** : la performance d'équipe se construit. Le PM crée un environnement de sécurité psychologique où chacun peut s'exprimer.

**Ressource** : Andrew Ramdayal — People domain (YouTube) https://www.youtube.com/AndrewRamdayal`,
      },
      {
        id: "pmp-people-2",
        title: "Leadership, motivation & intelligence émotionnelle",
        duration: "35 min",
        content: `Un bon chef de projet adapte son **style de leadership** et sait **motiver** sans imposer.

**Styles de leadership** : directif, participatif, délégatif, transformationnel, et surtout **servant leadership** (le plus valorisé par le PMI : servir l'équipe). Le bon style dépend de la maturité de l'équipe et du contexte.

**Théories de la motivation à connaître**

→ **McGregor — Théorie X / Théorie Y** : X = les gens sont paresseux (management de contrôle) ; Y = les gens sont motivés et responsables (management de confiance). Le PMI penche fortement vers Y.

→ **Maslow** : pyramide des besoins (physiologiques → sécurité → appartenance → estime → accomplissement).

→ **Herzberg** : facteurs d'**hygiène** (salaire, conditions — leur absence démotive mais leur présence ne motive pas durablement) vs facteurs **motivateurs** (reconnaissance, responsabilité, accomplissement).

→ **Théorie ERG, McClelland (besoin d'accomplissement/pouvoir/affiliation)** : compléments utiles.

**Intelligence émotionnelle (IE)** : capacité à reconnaître et gérer ses émotions et celles des autres. Composantes : conscience de soi, maîtrise de soi, empathie, compétences sociales. C'est un levier majeur de leadership et de gestion de conflits.

**À l'examen** : motiver passe par la reconnaissance, l'autonomie et le sens — rarement par la seule récompense financière.

**Ressource** : David McLachlan — leadership & motivation https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg`,
      },
      {
        id: "pmp-people-3",
        title: "Gérer les conflits & négocier",
        duration: "35 min",
        content: `Le conflit est **normal et parfois sain**. Le PM le traite tôt, en privé, et en se concentrant sur le problème — pas sur les personnes.

**Les 5 modes de gestion de conflit (Thomas-Kilmann)**

→ **Collaborer / Résoudre le problème (Collaborating / Problem-solving)** : chercher une solution gagnant-gagnant. **Le meilleur mode**, privilégié par le PMI.

→ **Compromis (Compromising)** : chacun cède un peu (perdant-perdant partiel). Acceptable mais pas idéal.

→ **Accommoder / Lisser (Smoothing/Accommodating)** : minimiser les différences, céder pour préserver la relation. Temporaire.

→ **Forcer / Imposer (Forcing)** : imposer son point de vue (gagnant-perdant). À réserver aux urgences.

→ **Éviter / Se retirer (Avoiding/Withdrawing)** : reporter ou fuir. Le pire en général, mais utile pour laisser retomber la tension.

**Sources de conflit** : la cause n°1 sur les projets est souvent liée aux **plannings/priorités et ressources**, pas aux personnalités (qui arrivent en dernier).

**Négociation** : viser des intérêts communs, préparer ses arguments, écouter, et chercher une issue durable plutôt qu'une victoire ponctuelle.

**À l'examen** : la bonne réponse est presque toujours **collaborer / résoudre le problème à la source**, en parlant directement aux personnes concernées.

**Ressource** : PMI Study Hall — questions People https://studyhall.pmi.org/login`,
      },
      {
        id: "pmp-people-4",
        title: "Servant leadership : obstacles, coaching, équipes virtuelles",
        duration: "30 min",
        content: `Le **servant leadership** est le cœur du domaine People à l'examen : le PM est au service de l'équipe.

**Responsabilités concrètes**

→ **Lever les obstacles (impediments)** : identifier et éliminer ce qui bloque l'équipe (outils manquants, dépendances, interférences externes).

→ **Coacher et mentorer** : développer les compétences, encourager l'autonomie plutôt que donner les réponses.

→ **Protéger l'équipe** : la préserver des interruptions et des changements de périmètre non maîtrisés.

→ **Favoriser l'auto-organisation** : laisser l'équipe décider du « comment ».

**Équipes virtuelles / distribuées**

→ Risques : communication réduite, isolement, fuseaux horaires, perte de cohésion.

→ Leviers : outils de collaboration (visio, tableaux partagés), règles de communication claires, moments d'équipe synchrones, attention à l'inclusion de chacun.

**Reconnaissance & récompenses** : valoriser publiquement les bons comportements ; les récompenses doivent être atteignables et perçues comme justes.

**À l'examen** : un membre est bloqué ? Le PM **retire l'obstacle** ou aide l'équipe à le faire — il ne réprimande pas et ne reprend pas le travail à sa place.

**Ressource** : Agile Practice Guide & rôle de facilitateur — https://www.pmi.org/learning/exam-prep`,
      },
      {
        id: "pmp-people-5",
        title: "Engager les parties prenantes (côté humain)",
        duration: "30 min",
        content: `Les **parties prenantes (stakeholders)** sont toute personne affectée par le projet ou pouvant l'affecter. Les engager activement est décisif pour le succès.

**Démarche**

→ **Identifier** tôt et largement (sponsor, client, équipe, utilisateurs, fournisseurs, régulateurs…).

→ **Analyser** leur influence et leur intérêt — ex. matrice **pouvoir/intérêt** (power/interest grid) pour prioriser l'attention.

→ **Planifier l'engagement** : niveau souhaité (de « résistant » à « leader ») et actions pour y parvenir.

→ **Engager et communiquer** en continu : la majorité du temps d'un PM est consacrée à la communication.

→ **Surveiller** : l'engagement évolue, on réévalue régulièrement.

**Côté humain (People)** : construire la **confiance**, écouter activement, gérer les attentes, traiter les résistances par le dialogue plutôt que par l'autorité.

**Idée clé** : une partie prenante mal gérée peut faire échouer un projet techniquement réussi. L'engagement n'est pas une formalité, c'est un travail relationnel continu.

**Ressource** : David McLachlan — stakeholders https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg`,
      },
    ],
    quiz: [
      {
        q: "Dans le modèle de Tuckman, quelle phase correspond aux tensions et désaccords ?",
        options: ["Forming", "Storming", "Norming", "Performing"],
        answer: 1,
        explain: "Le « storming » est la phase de tensions — normale et nécessaire avant que l'équipe ne trouve ses règles (norming) puis sa pleine productivité (performing).",
      },
      {
        q: "Quel mode de gestion de conflit le PMI privilégie-t-il ?",
        options: ["Éviter (withdrawing)", "Forcer (forcing)", "Collaborer / résoudre le problème", "Lisser (smoothing)"],
        answer: 2,
        explain: "Collaborer (problem-solving) cherche une solution gagnant-gagnant à la source : c'est le mode privilégié. Forcer et éviter sont à réserver à des cas particuliers.",
      },
      {
        q: "Selon Herzberg, le salaire est :",
        options: [
          "Un facteur motivateur durable",
          "Un facteur d'hygiène (son absence démotive, sa présence ne motive pas durablement)",
          "Sans aucun effet",
          "Le principal levier de motivation",
        ],
        answer: 1,
        explain: "Pour Herzberg, le salaire est un facteur d'hygiène : insuffisant, il démotive ; suffisant, il ne crée pas de motivation durable. Les motivateurs sont la reconnaissance, la responsabilité, l'accomplissement.",
      },
      {
        q: "Un membre de l'équipe est bloqué par une dépendance externe. Que fait le servant leader ?",
        options: [
          "Il réprimande le membre",
          "Il fait le travail à sa place",
          "Il lève l'obstacle ou aide l'équipe à le faire",
          "Il escalade aussitôt au sponsor",
        ],
        answer: 2,
        explain: "Le rôle premier du servant leader est de lever les obstacles pour que l'équipe avance, sans réprimander ni se substituer à elle.",
      },
      {
        q: "Quel outil aide à prioriser l'attention portée aux parties prenantes ?",
        options: ["Le diagramme de Gantt", "La matrice pouvoir/intérêt", "Le chemin critique", "Le burndown chart"],
        answer: 1,
        explain: "La grille pouvoir/intérêt (power/interest) classe les parties prenantes pour adapter l'effort d'engagement et de communication.",
      },
      {
        q: "Quelle est souvent la première source de conflit sur un projet ?",
        options: ["Les personnalités", "Les plannings et priorités/ressources", "Le budget uniquement", "La météo"],
        answer: 1,
        explain: "Les conflits proviennent le plus souvent des plannings, priorités et ressources ; les conflits de personnalité arrivent en dernier.",
      },
    ],
  },

  // ── MODULE 4 : DOMAINE PROCESS (41 %) ──────────────────────────────────────
  {
    id: "process",
    title: "Domaine Process — piloter le projet (41 %)",
    level: "intermediaire",
    icon: "⚙️",
    description:
      "Le plus gros domaine. Intégration, périmètre, échéancier, coûts (avec l'EVM), qualité, ressources, communications, risque et approvisionnement.",
    lessons: [
      {
        id: "pmp-process-1",
        title: "Intégration, charte projet & valeur",
        duration: "30 min",
        content: `Le domaine Process couvre les aspects techniques de la conduite de projet. L'**intégration** est le fil rouge qui relie tout.

**La charte de projet (project charter)**

→ Document qui **autorise officiellement** le projet et nomme le chef de projet.

→ Émise par le **sponsor**. Contient les objectifs de haut niveau, le business case, les grandes contraintes et les parties prenantes clés.

→ Sans charte, le projet n'existe pas formellement : c'est le premier livrable.

**Le plan de management de projet (PMP plan)** : document intégrateur regroupant tous les plans subsidiaires (périmètre, échéancier, coûts, qualité, risques…) et les baselines de référence.

**Maîtrise intégrée des changements (Integrated Change Control)**

→ Tout changement passe par une **demande de changement** formelle, évaluée (impact coût/délai/périmètre/risque) puis approuvée ou rejetée, souvent par un **CCB (Change Control Board)**.

→ On ne modifie jamais une baseline « en douce » : c'est une faute classique sanctionnée à l'examen.

**Orientation valeur (PMBOK 8)** : on pilote vers les **bénéfices** attendus, pas seulement le respect du triangle coût/délai/périmètre.

**Ressource** : Andrew Ramdayal — Process domain https://www.youtube.com/AndrewRamdayal`,
      },
      {
        id: "pmp-process-2",
        title: "Périmètre & exigences",
        duration: "35 min",
        content: `Bien définir **ce qui est dans le projet (et hors périmètre)** évite la dérive (« scope creep »).

**Recueil des exigences (requirements)** : ateliers, interviews, prototypes, observation. Tracées dans une **matrice de traçabilité** (requirements traceability matrix).

**Énoncé du périmètre (scope statement)** : décrit livrables, critères d'acceptation, exclusions et contraintes.

**WBS (Work Breakdown Structure / organigramme des tâches)**

→ Décomposition hiérarchique du travail en éléments gérables. Le plus bas niveau = **work package**.

→ Règle des 100 % : la WBS contient **tout** le travail du projet, et **uniquement** ce travail.

→ La WBS n'est pas une liste d'actions chronologiques mais une structure de livrables.

**Priorisation (agile)** : **MoSCoW** (Must / Should / Could / Won't), backlog ordonné par valeur, **user stories** avec critères d'acceptation et « definition of done ».

**Maîtrise du périmètre** : valider les livrables avec le client (**validate scope** = acceptation formelle) et contrôler la conformité. Toute évolution passe par la maîtrise des changements.

**Piège examen** : « scope creep » = ajouts non contrôlés ; « gold plating » = en faire plus que demandé sans valeur. Les deux sont à éviter.

**Ressource** : PMI Study Hall — Process https://studyhall.pmi.org/login`,
      },
      {
        id: "pmp-process-3",
        title: "Échéancier, coûts & valeur acquise (EVM)",
        duration: "45 min",
        content: `Deux piliers techniques : construire un **échéancier** réaliste et **maîtriser les coûts**, avec la méthode de la **valeur acquise**.

**Échéancier (schedule)**

→ Séquencer les activités (dépendances), estimer les durées, puis bâtir l'échéancier.

→ **Chemin critique (critical path)** : la plus longue séquence de tâches dépendantes ; elle détermine la durée minimale du projet. Une tâche sur le chemin critique a une **marge (float) nulle** — tout retard y retarde le projet.

→ Techniques de compression : **crashing** (ajouter des ressources, coûte plus cher) et **fast tracking** (paralléliser des tâches, augmente le risque).

**Estimation** : analogique (par comparaison), paramétrique (par ratio), **à trois points** (PERT : (Optimiste + 4×Probable + Pessimiste) / 6).

**Valeur acquise (Earned Value Management)** — formules à connaître :

→ PV = valeur planifiée, EV = valeur acquise, AC = coût réel.

→ **Écart de coût** : CV = EV − AC. **Écart de délai** : SV = EV − PV.

→ **Indice de coût** : CPI = EV / AC. **Indice de délai** : SPI = EV / PV.

→ Lecture : CPI ou SPI **supérieur à 1 = bon** (en avance / sous le budget) ; **inférieur à 1 = mauvais**. CV/SV négatif = dépassement / retard.

→ **EAC** (coût final estimé) ≈ BAC / CPI (si la tendance se poursuit).

**Ressource** : David McLachlan — EVM expliqué + exercices https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg`,
      },
      {
        id: "pmp-process-4",
        title: "Qualité, ressources, communications & nivellement",
        duration: "50 min",
        content: `**Qualité**

→ **Qualité ≠ grade** : la qualité c'est la conformité aux exigences ; le grade, le niveau de fonctionnalités. Une faible qualité est toujours un problème ; un grade bas peut être acceptable.

→ **Prévention plutôt qu'inspection** : il vaut mieux concevoir sans défaut que détecter après coup. Le coût de la non-qualité augmente plus on découvre tard.

→ Outils : diagrammes cause-effet (Ishikawa), Pareto (80/20), cartes de contrôle, PDCA, Kaizen.

**Ressources humaines**

→ Estimer, obtenir, développer et diriger l'équipe tout au long du projet.

→ **Matrice RACI** (Responsible, Accountable, Consulted, Informed) : clarifie qui fait quoi. Un seul **Accountable** par activité — si deux personnes sont Accountable, personne ne l'est vraiment.

→ Gérer également les ressources matérielles (équipements, matériaux, licences).

**Resource Leveling vs Resource Smoothing — distinction fréquemment testée**

→ **Resource Leveling (nivellement des ressources)** : on ajuste le calendrier pour résoudre les **surcharges de ressources** (une même personne planifiée sur deux tâches simultanément). La date de fin du projet **peut être repoussée**. On sacrifie les délais pour respecter les contraintes de ressources.

→ **Resource Smoothing (lissage des ressources)** : on optimise l'utilisation des ressources **sans dépasser la marge disponible (float)**. La date de fin du projet est **maintenue**. On ne peut lisser que dans les limites de la marge flottante des tâches non-critiques.

| Technique | Date de fin | Contrainte respectée |
|-----------|-------------|----------------------|
| Leveling | Peut être repoussée | Ressources non surchargées |
| Smoothing | Maintenue | Date de fin fixe |

→ **Piège examen** : si la question mentionne « sans modifier la date de fin », c'est du Smoothing. Si elle mentionne « résoudre les conflits de ressources sans contrainte de délai », c'est du Leveling.

**Communications — plan et types**

→ Le PM passe environ **90 % de son temps à communiquer**. Planifier qui a besoin de quelle information, quand, sous quel format et via quel canal.

→ **Formule des canaux** : n(n−1)/2 canaux pour n personnes. Équipe de 10 → 45 canaux. Équipe de 20 → 190 canaux. La complexité explose avec la taille.

→ **3 méthodes de communication** :
  - **Interactive** (réunions, appels, ateliers) : communication bidirectionnelle en temps réel — la plus riche et la plus adaptée aux sujets complexes ou sensibles.
  - **Push** (e-mails, rapports, mémos) : envoyée à des destinataires précis. Pas de garantie qu'elle sera lue.
  - **Pull** (intranet, portail documentaire) : mise à disposition ; le destinataire va la chercher. Pour de grandes audiences ou de l'information de référence.

→ **Plan de management des communications** : qui reçoit quoi, à quelle fréquence, dans quel format, via quel canal. C'est un document vivant, mis à jour quand les parties prenantes changent.

→ **Rapports de performance** :
  - Rapport d'avancement : où en est-on par rapport au plan ?
  - Rapport de performance : comment a-t-on performé sur une période ?
  - Rapport de prévision : à quoi s'attendre à la fin (EAC, date de fin prévue) ?

→ **Communication formelle vs informelle** : les décisions importantes, les changements de périmètre et les escalades se font formellement (écrit). Les échanges quotidiens d'équipe sont informels.

→ **Communication verticale** (avec la hiérarchie), **horizontale** (entre pairs), **diagonale** (transversale entre équipes).

**Ressource** : Andrew Ramdayal — Quality/Resources/Comms https://www.youtube.com/AndrewRamdayal`,
      },
      {
        id: "pmp-process-5",
        title: "Risque & approvisionnement (procurement)",
        duration: "35 min",
        content: `**Gestion des risques**

→ Un **risque** est un événement incertain à impact positif (**opportunité**) ou négatif (**menace**).

→ Processus : identifier → analyser (qualitatif : probabilité × impact ; quantitatif : chiffrage) → planifier les réponses → surveiller.

→ **Réponses aux menaces** : éviter, transférer (assurance, sous-traitance), atténuer, accepter.

→ **Réponses aux opportunités** : exploiter, partager, améliorer, accepter.

→ **Escalader** : pour un risque hors du périmètre d'autorité du projet.

→ **Réserves** : la **réserve de contingence** couvre les risques connus (« known unknowns ») ; la **réserve de management** couvre l'imprévu (« unknown unknowns »).

**Approvisionnement (procurement)**

→ Décision **make-or-buy** (faire ou acheter).

→ Types de contrats : **prix forfaitaire (fixed price)** — risque côté vendeur ; **coûts remboursables (cost-reimbursable)** — risque côté acheteur ; **temps et matériel (T&M)** — intermédiaire, pour périmètre flou.

→ Documents : appel d'offres (RFP/RFQ), critères de sélection, énoncé des travaux (SOW), puis suivi et clôture du contrat.

**À l'examen** : choisir le type de contrat selon qui doit porter le risque et la clarté du périmètre.

**Ressource** : PMI Study Hall — Risk & Procurement https://studyhall.pmi.org/login`,
      },
    ],
    quiz: [
      {
        q: "Qui autorise officiellement le projet via la charte ?",
        options: ["Le chef de projet", "Le sponsor", "L'équipe", "Le client final"],
        answer: 1,
        explain: "La charte de projet est émise par le sponsor : elle autorise le projet et nomme le chef de projet.",
      },
      {
        q: "Une tâche sur le chemin critique a une marge (float) de :",
        options: ["Maximale", "Nulle", "Indéterminée", "Toujours 2 jours"],
        answer: 1,
        explain: "Les tâches du chemin critique ont une marge nulle : tout retard sur l'une d'elles retarde l'ensemble du projet.",
      },
      {
        q: "Le CPI d'un projet est de 0,85. Cela signifie :",
        options: [
          "Le projet est sous le budget (favorable)",
          "Le projet dépense plus que prévu pour la valeur acquise (défavorable)",
          "Le projet est en avance sur le planning",
          "Le projet est terminé",
        ],
        answer: 1,
        explain: "CPI = EV/AC. Inférieur à 1 = défavorable : on dépense plus que la valeur réellement acquise (dépassement de coût).",
      },
      {
        q: "Quelle réponse correspond à une OPPORTUNITÉ (risque positif) ?",
        options: ["Atténuer", "Éviter", "Exploiter", "Transférer"],
        answer: 2,
        explain: "Pour une opportunité : exploiter, partager, améliorer ou accepter. Éviter, atténuer et transférer concernent les menaces.",
      },
      {
        q: "Dans un contrat à prix forfaitaire (fixed price), le risque pèse surtout sur :",
        options: ["L'acheteur", "Le vendeur", "Les deux à parts égales", "Le sponsor"],
        answer: 1,
        explain: "En prix forfaitaire, le vendeur s'engage sur un prix fixe : il porte le risque de dépassement. En coûts remboursables, c'est l'acheteur qui le porte.",
      },
      {
        q: "Quelle réserve couvre les risques identifiés (« known unknowns ») ?",
        options: ["La réserve de management", "La réserve de contingence", "Le budget de base", "La marge libre"],
        answer: 1,
        explain: "La réserve de contingence couvre les risques connus et analysés. La réserve de management couvre l'imprévu non identifié (unknown unknowns).",
      },
    ],
  },

  // ── MODULE 5 : AGILE & HYBRIDE ─────────────────────────────────────────────
  {
    id: "agile-hybride",
    title: "Agile, hybride & approches de livraison",
    level: "intermediaire",
    icon: "🔁",
    description:
      "Environ la moitié de l'examen mobilise l'agile ou l'hybride. Scrum, Kanban, XP, cérémonies, métriques, et l'art de combiner prédictif et agile.",
    lessons: [
      {
        id: "pmp-agile-1",
        title: "Valeurs, principes Agile & Scrum",
        duration: "35 min",
        content: `L'**agilité** privilégie la livraison itérative de valeur et l'adaptation au changement.

**Le Manifeste Agile — 4 valeurs**

→ Les individus et leurs interactions plutôt que les processus et les outils.

→ Un logiciel/produit qui fonctionne plutôt qu'une documentation exhaustive.

→ La collaboration avec le client plutôt que la négociation contractuelle.

→ L'adaptation au changement plutôt que le suivi d'un plan figé.

(+ 12 principes : livraisons fréquentes, accueil du changement, équipes motivées et auto-organisées, simplicité, rythme soutenable, amélioration continue.)

**Scrum — le framework le plus courant**

→ **Rôles** : **Product Owner** (porte la valeur et le backlog), **Scrum Master** (servant leader, facilite, retire les obstacles), **Équipe de développement** (auto-organisée).

→ **Sprint** : itération courte et de durée fixe (1 à 4 semaines) produisant un incrément « done ».

→ **Backlog produit** : liste ordonnée des besoins, gérée par le PO. **Backlog de sprint** : ce que l'équipe s'engage à livrer.

**Rôle du chef de projet en agile** : souvent celui de **Scrum Master / facilitateur** — il sert l'équipe, il ne commande pas.

**Ressource** : Agile Practice Guide (PMI) https://www.pmi.org/learning/exam-prep ; vidéos agile — Andrew Ramdayal https://www.youtube.com/AndrewRamdayal`,
      },
      {
        id: "pmp-agile-2",
        title: "Kanban, XP & mise à l'échelle",
        duration: "30 min",
        content: `Scrum n'est pas la seule approche agile. L'examen attend une culture large.

**Kanban**

→ Flux continu (pas d'itérations fixes), visualisé sur un **tableau Kanban** (colonnes : À faire / En cours / Terminé).

→ **Limites de WIP (Work In Progress)** : limiter le travail en cours pour révéler les goulets et améliorer le flux.

→ Métriques : **lead time** (délai total), **cycle time** (durée de traitement), débit (throughput).

**Extreme Programming (XP)** : pratiques d'ingénierie — **pair programming**, **TDD** (développement piloté par les tests), intégration continue, refactoring, petites livraisons fréquentes.

**Lean** : éliminer le gaspillage (waste), maximiser la valeur, améliorer en continu.

**Mise à l'échelle (scaling)** : pour plusieurs équipes — **SAFe**, **LeSS**, **Scrum of Scrums**, **Nexus**. À connaître au niveau des grands principes (coordination de multiples équipes agiles).

**Idée clé** : on choisit le cadre selon le contexte. Kanban convient aux flux de demandes continues (support, maintenance) ; Scrum aux développements par incréments planifiés.

**Ressource** : David McLachlan — frameworks agile https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg`,
      },
      {
        id: "pmp-agile-3",
        title: "Cérémonies, artefacts & métriques agiles",
        duration: "35 min",
        content: `**Les cérémonies Scrum (events)**

→ **Sprint planning** : l'équipe planifie le travail du sprint.

→ **Daily standup (mêlée quotidienne)** : ~15 min, synchronisation et obstacles. Ce n'est pas un reporting au manager.

→ **Sprint review** : démonstration de l'incrément aux parties prenantes, recueil de feedback.

→ **Sprint retrospective** : l'équipe inspecte sa façon de travailler et s'améliore. Pilier de l'amélioration continue.

**Artefacts** : backlog produit, backlog de sprint, **incrément** livrable, et la **definition of done** (critères de complétude partagés).

**Métriques agiles**

→ **Vélocité (velocity)** : quantité de travail (story points) livrée par sprint — sert à prévoir, pas à comparer des équipes.

→ **Burndown chart** : travail restant qui décroît vers zéro au fil du sprint.

→ **Burnup chart** : travail accompli qui monte vers l'objectif (montre aussi les ajouts de périmètre).

**Estimation agile** : **story points** (taille relative), **planning poker**, suite de Fibonacci.

**À l'examen** : en agile, face à un problème, on **inspecte et adapte** ; on traite les sujets en rétrospective ; on protège la durée du sprint (pas d'ajout en cours de sprint sans accord).

**Ressource** : PMI Study Hall — questions agiles https://studyhall.pmi.org/login`,
      },
      {
        id: "pmp-agile-4",
        title: "Hybride : combiner prédictif et agile",
        duration: "30 min",
        content: `L'**hybride** mélange éléments prédictifs et agiles. C'est la réalité de beaucoup d'organisations — et très présent à l'examen 2026.

**Exemples d'hybridation**

→ Planifier l'architecture et les jalons en **prédictif**, développer les fonctionnalités en **sprints agiles**.

→ Une phase de cadrage classique, puis une exécution itérative.

→ Des équipes agiles dans un programme piloté avec des baselines globales.

**Comment choisir (tailoring)**

→ Exigences claires et stables + forte conformité → tendance prédictive.

→ Forte incertitude, besoin de feedback rapide → tendance agile.

→ Mélange des deux selon les composantes du projet → hybride.

**Facteurs à peser** : culture et maturité de l'organisation, criticité, fréquence des changements, implication du client, contraintes réglementaires.

**Continuum des cycles de vie** : prédictif → itératif → incrémental → agile. L'hybride se place n'importe où entre ces extrêmes, par composante.

**À retenir** : il n'y a pas de bonne réponse universelle. Le PM **adapte** l'approche au projet et peut faire évoluer ce choix dans le temps.

**Ressource** : Agile Practice Guide + cours TIA https://www.pmi.org/learning/exam-prep`,
      },
    ],
    quiz: [
      {
        q: "Dans Scrum, qui est responsable de la valeur et de l'ordonnancement du backlog produit ?",
        options: ["Le Scrum Master", "Le Product Owner", "L'équipe de développement", "Le sponsor"],
        answer: 1,
        explain: "Le Product Owner porte la valeur et ordonne le backlog produit. Le Scrum Master facilite ; l'équipe réalise.",
      },
      {
        q: "À quoi sert principalement une limite de WIP en Kanban ?",
        options: [
          "Accélérer en surchargeant l'équipe",
          "Limiter le travail en cours pour révéler les goulets et fluidifier",
          "Fixer la durée des sprints",
          "Calculer le budget",
        ],
        answer: 1,
        explain: "Limiter le Work In Progress met en évidence les goulets d'étranglement et améliore le flux et le lead time.",
      },
      {
        q: "La rétrospective de sprint sert à :",
        options: [
          "Démontrer l'incrément aux parties prenantes",
          "Planifier le sprint suivant en détail",
          "Améliorer la façon de travailler de l'équipe",
          "Reporter l'avancement au manager",
        ],
        answer: 2,
        explain: "La rétrospective est dédiée à l'amélioration continue de l'équipe (process, collaboration). La démo, c'est la review.",
      },
      {
        q: "La vélocité (velocity) sert surtout à :",
        options: [
          "Comparer les équipes entre elles",
          "Prévoir la capacité de livraison de l'équipe sur les prochains sprints",
          "Calculer le CPI",
          "Fixer les salaires",
        ],
        answer: 1,
        explain: "La vélocité aide une équipe à prévoir sa capacité ; elle ne doit pas servir à comparer des équipes différentes.",
      },
      {
        q: "Qu'est-ce qu'une approche hybride ?",
        options: [
          "Uniquement du Scrum",
          "Une combinaison d'éléments prédictifs et agiles selon le contexte",
          "Un projet sans aucune planification",
          "Un synonyme de Kanban",
        ],
        answer: 1,
        explain: "L'hybride mélange prédictif et agile (ex. architecture planifiée + développement en sprints), adapté composante par composante.",
      },
      {
        q: "Une nouvelle demande arrive en plein sprint. La bonne pratique est de :",
        options: [
          "L'ajouter aussitôt au sprint en cours",
          "La placer au backlog et la prioriser pour un prochain sprint (protéger le sprint en cours)",
          "Arrêter le sprint",
          "L'ignorer définitivement",
        ],
        answer: 1,
        explain: "On protège le sprint en cours : la demande va au backlog produit où le PO la priorise. On évite d'injecter du périmètre en cours de sprint.",
      },
    ],
  },

  // ── MODULE 6 : BUSINESS ENVIRONMENT (26 %) ─────────────────────────────────
  {
    id: "business",
    title: "Domaine Business Environment (26 %)",
    level: "intermediaire",
    icon: "🌍",
    description:
      "Le grand gagnant 2026 (8 % → 26 %). Conformité, gouvernance, valeur et bénéfices, alignement stratégique, changement organisationnel, durabilité et IA.",
    lessons: [
      {
        id: "pmp-biz-1",
        title: "Conformité, gouvernance & environnement organisationnel",
        duration: "30 min",
        content: `Le domaine Business Environment relie le projet à son **contexte organisationnel et externe**.

**Conformité (compliance)**

→ Identifier les exigences légales, réglementaires, contractuelles et de sécurité applicables.

→ Les intégrer au projet et **surveiller** leur respect en continu. La non-conformité est un risque majeur (juridique, financier, réputationnel).

**Gouvernance** : cadre de décision et de contrôle. Définit qui décide quoi (comités, CCB, sponsor), comment l'information remonte, et comment le projet s'aligne sur les règles de l'organisation.

**EEF & OPA** (à bien distinguer)

→ **EEF (Enterprise Environmental Factors)** : facteurs **externes ou imposés** au projet (culture d'entreprise, marché, réglementation, conditions économiques, outils existants). On les subit.

→ **OPA (Organizational Process Assets)** : **actifs internes réutilisables** (modèles, procédures, leçons apprises, archives de projets passés). On s'en sert.

**À l'examen** : reconnaître si un élément est un EEF (contrainte du contexte) ou un OPA (ressource interne) revient souvent.

**Ressource** : Andrew Ramdayal — Business Environment https://www.youtube.com/AndrewRamdayal`,
      },
      {
        id: "pmp-biz-2",
        title: "Valeur, bénéfices & alignement stratégique",
        duration: "35 min",
        content: `Un projet n'existe que pour créer de la **valeur** alignée sur la stratégie de l'organisation.

**Business case** : justification du projet (problème, options, coûts/bénéfices, ROI attendu). On y revient pour vérifier que le projet reste pertinent ; s'il ne l'est plus, on peut l'arrêter.

**Réalisation des bénéfices (benefits realization)**

→ Les bénéfices se concrétisent souvent **après** la livraison. Un **plan de gestion des bénéfices** précise quoi, quand, comment mesurer, et qui en est responsable.

→ Indicateurs : ROI, valeur actuelle nette (VAN/NPV), délai de retour, satisfaction client, parts de marché.

**Projet / Programme / Portefeuille**

→ **Projet** : un effort temporaire pour un résultat unique.

→ **Programme** : un ensemble de projets liés, gérés ensemble pour des bénéfices qu'on n'obtiendrait pas séparément.

→ **Portefeuille** : l'ensemble des projets/programmes, sélectionnés et priorisés pour servir la **stratégie** de l'organisation.

**À l'examen** : la bonne décision sert la valeur métier et la stratégie, pas seulement l'achèvement technique. Si un projet ne crée plus de valeur, le poursuivre est une erreur.

**Ressource** : PMI Study Hall — Business Environment https://studyhall.pmi.org/login`,
      },
      {
        id: "pmp-biz-3",
        title: "Changement organisationnel & culture",
        duration: "30 min",
        content: `Livrer un produit ne suffit pas : il faut que l'organisation **adopte** le changement pour que la valeur se réalise.

**Gestion du changement organisationnel (organizational change management)**

→ Préparer les personnes au changement : communication, formation, accompagnement, gestion des résistances.

→ Modèles utiles : **ADKAR** (Awareness, Desire, Knowledge, Ability, Reinforcement), les **8 étapes de Kotter**, la courbe de transition.

→ Impliquer un **sponsor visible** et des relais (champions) pour porter le changement.

**Résistance au changement** : naturelle. On la traite par l'écoute, l'explication du « pourquoi », la participation des personnes concernées — pas par la contrainte.

**Culture & contexte** : adapter sa communication et son management à la culture de l'organisation (hiérarchique vs collaborative) et aux différences interculturelles dans les équipes internationales.

**Transfert et pérennité** : prévoir la transition vers les opérations (run), la formation des utilisateurs et le support, pour que les bénéfices durent.

**À l'examen** : la réussite d'un projet inclut l'adoption par les utilisateurs ; négliger la conduite du changement fait échouer des projets pourtant « livrés ».

**Ressource** : David McLachlan — change management https://www.youtube.com/channel/UC8uqqZwyoW303ZeWyUiNdMg`,
      },
      {
        id: "pmp-biz-4",
        title: "Durabilité, IA & tendances 2026",
        duration: "25 min",
        content: `L'examen 2026 et le PMBOK 8 mettent en avant des sujets émergents. Attends-toi à des questions sur ces thèmes.

**Durabilité (sustainability)**

→ Nouveau **principe** dans PMBOK 8 : prendre en compte les impacts environnementaux, sociaux et économiques des projets.

→ Notion de **triple bottom line** (peuple, planète, profit) et de responsabilité à long terme.

→ Le chef de projet intègre des critères durables dans les décisions (choix de fournisseurs, conception, gestion des déchets).

**Intelligence artificielle (IA)**

→ Le PMBOK 8 ajoute une **annexe IA**. L'IA assiste le PM : estimation, analyse de risques, reporting automatisé, aide à la décision.

→ Posture attendue : utiliser l'IA comme un **outil d'aide**, avec esprit critique et éthique (qualité des données, biais, confidentialité) — le jugement humain reste responsable.

**Autres accents 2026** : engagement renforcé des parties prenantes, orientation **résultats et valeur** (pas seulement livrables), dynamique réelle et adaptative des projets.

**À l'examen** : privilégier les réponses qui intègrent durabilité, usage responsable de la technologie, et création de valeur à long terme.

**Ressource** : page nouvel examen PMI https://www.pmi.org/certifications/project-management-pmp/new-exam`,
      },
    ],
    quiz: [
      {
        q: "Une réglementation externe imposée au projet est un exemple de :",
        options: ["OPA (actif organisationnel)", "EEF (facteur environnemental)", "Livrable", "Risque secondaire"],
        answer: 1,
        explain: "Les EEF sont des facteurs externes/imposés (réglementation, marché, culture). Les OPA sont des actifs internes réutilisables (modèles, leçons apprises).",
      },
      {
        q: "Quand les bénéfices d'un projet se concrétisent-ils le plus souvent ?",
        options: [
          "Avant le démarrage",
          "Uniquement pendant l'exécution",
          "Souvent après la livraison, d'où un plan de réalisation des bénéfices",
          "Jamais, ils ne se mesurent pas",
        ],
        answer: 2,
        explain: "Beaucoup de bénéfices apparaissent après la livraison ; un plan de gestion des bénéfices définit quoi mesurer, quand et par qui.",
      },
      {
        q: "Qu'est-ce qui distingue un portefeuille d'un programme ?",
        options: [
          "Le portefeuille aligne l'ensemble des projets/programmes sur la stratégie",
          "Le portefeuille est un projet plus petit",
          "Il n'y a aucune différence",
          "Le programme regroupe des portefeuilles",
        ],
        answer: 0,
        explain: "Le portefeuille regroupe et priorise projets et programmes au service de la stratégie. Le programme coordonne des projets liés pour des bénéfices communs.",
      },
      {
        q: "Face à la résistance au changement des utilisateurs, le PM doit d'abord :",
        options: [
          "Imposer le changement par l'autorité",
          "Écouter, expliquer le pourquoi et impliquer les personnes",
          "Annuler le projet",
          "Ignorer la résistance",
        ],
        answer: 1,
        explain: "La résistance se traite par la communication, la participation et l'accompagnement (ex. ADKAR, Kotter), pas par la contrainte.",
      },
      {
        q: "Selon l'esprit du PMBOK 8, comment utiliser l'IA en gestion de projet ?",
        options: [
          "Lui déléguer toutes les décisions",
          "Comme un outil d'aide, avec esprit critique et éthique, le jugement humain restant responsable",
          "L'éviter totalement",
          "Uniquement pour le marketing",
        ],
        answer: 1,
        explain: "L'IA est un outil d'assistance (estimation, risques, reporting). Le PM garde le jugement et la responsabilité, en veillant à l'éthique et à la qualité des données.",
      },
    ],
  },

  // ── MODULE 7 : STRATÉGIE D'EXAMEN ──────────────────────────────────────────
  {
    id: "strategie-examen",
    title: "Stratégie d'examen & types de questions",
    level: "avance",
    icon: "🧠",
    description:
      "Maximiser ton score : décrypter les 5 types de questions, éliminer les distracteurs, connaître les formules clés et gérer les 240 minutes le jour J.",
    lessons: [
      {
        id: "pmp-strat-1",
        title: "Les 5 types de questions et comment les aborder",
        duration: "30 min",
        content: `Le nouvel examen mélange plusieurs formats. Les reconnaître évite de perdre des points bêtement.

→ **Choix unique (multiple choice)** : une seule bonne réponse parmi 4. La grande majorité des questions. Attention aux nuances (« en premier », « la meilleure »).

→ **Choix multiples (multiple response)** : « Sélectionnez les 3 ». Le nombre exact est précisé. Pas de point partiel : il faut tout bon.

→ **Appariement (matching)** : relier des éléments (ex. un terme à sa définition, un mode de conflit à sa description).

→ **Points chauds (hotspot)** : cliquer sur la bonne zone d'un schéma (ex. sur un diagramme de réseau ou un tableau Kanban).

→ **Texte à trous (fill-in-the-blank)** : rare ; taper une réponse courte.

**Bonnes pratiques**

→ Lis la question **jusqu'au bout** avant les options. Identifie ce qui est vraiment demandé.

→ Repère les mots-clés de contexte : agile vs prédictif, « premier », « suivant », « meilleur », « sauf ».

→ Pour les choix multiples, vérifie le nombre exact demandé.

→ **Aucune pénalité pour mauvaise réponse** : ne laisse jamais une question vide. Marque-la pour révision si tu hésites.

**Ressource** : exemples de tous les formats — PMI Study Hall https://studyhall.pmi.org/login`,
      },
      {
        id: "pmp-strat-2",
        title: "Lire une question situationnelle & éliminer les distracteurs",
        duration: "30 min",
        content: `Les questions-scénarios sont la difficulté principale. Souvent, 2 réponses sont « correctes » mais une seule est la **meilleure** selon le PMI.

**Méthode d'élimination**

→ Écarte d'abord les réponses **clairement non-PMI** : blâmer quelqu'un, ignorer le problème, escalader trop vite, modifier une baseline sans processus.

→ Entre les réponses restantes, choisis celle qui consiste à **comprendre / analyser / communiquer** avant d'agir radicalement.

→ Vérifie le **niveau d'action** : ni sur-réaction (tout arrêter) ni sous-réaction (ne rien faire).

**Réflexes gagnants**

→ « Que faire en PREMIER ? » → comprendre la cause / collecter l'info, pas la solution finale.

→ Problème technique d'équipe → laisser l'**équipe** résoudre (surtout en agile).

→ Changement demandé → passer par la **maîtrise intégrée des changements**.

→ Risque hors de ton autorité → **escalader** (ici c'est la bonne réponse).

→ Conflit → **collaborer / résoudre à la source**.

**Pièges fréquents** : les réponses qui semblent « efficaces » mais court-circuitent un processus, ou qui rejettent la responsabilité, sont presque toujours fausses.

**Ressource** : centaines de scénarios corrigés — David McLachlan https://www.youtube.com/playlist?list=PLEWFSKHjyrwywWx6mri0ooX5YVjDPrgX1`,
      },
      {
        id: "pmp-strat-3",
        title: "Formules clés & gestion du temps",
        duration: "30 min",
        content: `Peu de calculs, mais quelques **formules** reviennent. Mémorise-les et entraîne-toi.

**Valeur acquise (EVM)**

→ CV = EV − AC (écart de coût) ; SV = EV − PV (écart de délai).

→ CPI = EV / AC ; SPI = EV / PV. Supérieur à 1 = favorable.

→ EAC = BAC / CPI (estimation à l'achèvement, si la tendance continue).

→ Règle mémo : la métrique recherchée est toujours « quelque chose par rapport à EV ». Variance = soustraction, Index = division.

**Estimation à 3 points (PERT)** : (Optimiste + 4 × Probable + Pessimiste) / 6.

**Canaux de communication** : n(n−1)/2.

**Gestion du temps le jour J**

→ 180 questions / 240 min ≈ **1 min 20 par question**. Garde un rythme régulier.

→ Ne bloque pas : marque les questions difficiles et reviens-y. Au bout de ~90 s sur une question, tranche et avance.

→ Utilise les **2 pauses** : repose tes yeux, respire. Mais sache qu'une fois une section validée, tu ne peux plus y revenir.

→ Vise à finir avec une petite marge pour revoir les questions marquées de la section en cours.

**Ressource** : exercices EVM — Andrew Ramdayal https://www.youtube.com/AndrewRamdayal`,
      },
      {
        id: "pmp-strat-4",
        title: "Les deux dernières semaines & le jour J",
        duration: "25 min",
        content: `**Les 2 dernières semaines**

→ Enchaîne les **examens blancs complets et chronométrés** (180 questions). Vise un score stable autour de **70 %+** avant de te présenter.

→ **Analyse chaque erreur** : pourquoi la bonne réponse est meilleure ? C'est là que le score progresse, pas en refaisant ce que tu sais déjà.

→ Revois l'ECO 2026 point par point : sais-tu traiter chaque tâche ? Comble les trous ciblés.

→ Allège la veille : pas de bachotage intensif, sommeil correct.

**Logistique le jour J**

→ Centre Pearson VUE ou **online proctored** : teste ta machine à l'avance (webcam, connexion), pièce isolée, bureau dégagé, pièce d'identité valide.

→ Arrive/connecte-toi en avance. Lis bien les consignes.

→ Pendant l'examen : applique le mindset PMI, élimine les distracteurs, gère ton temps, ne laisse aucune question vide.

→ Reste calme aux questions difficiles : elles incluent 10 questions non notées — certaines « impossibles » ne comptent peut-être même pas.

**Après** : résultat souvent immédiat à l'écran. En cas d'échec, tu as droit à de nouvelles tentatives dans ta fenêtre d'éligibilité — analyse ton rapport et recible.

**Ressource** : examens blancs réalistes — PM Exam Simulator https://www.pm-exam-simulator.com/pmp-exam-simulator`,
      },
    ],
    quiz: [
      {
        q: "Pour une question « Sélectionnez les 3 réponses », que faut-il savoir ?",
        options: [
          "Il y a des points partiels",
          "Le nombre exact à sélectionner est indiqué et il faut tout bon",
          "Une seule réponse suffit",
          "On peut en cocher autant qu'on veut",
        ],
        answer: 1,
        explain: "Les questions à choix multiples précisent le nombre exact et n'accordent pas de point partiel : il faut sélectionner exactement les bonnes réponses.",
      },
      {
        q: "Face à « Que faites-vous en PREMIER ? », la bonne réponse consiste généralement à :",
        options: [
          "Escalader au sponsor",
          "Comprendre / analyser la cause avant d'agir",
          "Changer immédiatement le périmètre",
          "Blâmer le responsable",
        ],
        answer: 1,
        explain: "La première action attendue est presque toujours de comprendre la situation et collecter l'information, avant toute action radicale ou escalade.",
      },
      {
        q: "Comment calcule-t-on l'EAC (estimation à l'achèvement) la plus courante ?",
        options: ["EV − AC", "BAC / CPI", "EV / PV", "PV − AC"],
        answer: 1,
        explain: "EAC = BAC / CPI suppose que la performance de coût actuelle se poursuit. CV = EV − AC est un écart, SPI = EV/PV un indice de délai.",
      },
      {
        q: "Y a-t-il une pénalité pour une mauvaise réponse au PMP ?",
        options: [
          "Oui, on perd des points",
          "Non : il ne faut jamais laisser une question vide",
          "Oui, après 3 erreurs",
          "Seulement pour les questions agiles",
        ],
        answer: 1,
        explain: "Aucune pénalité : on répond toujours, quitte à marquer la question pour y revenir. Une réponse au hasard vaut mieux qu'un vide.",
      },
      {
        q: "Quel score en examen blanc indique qu'on est prêt à réserver ?",
        options: ["Environ 40 %", "Un score stable d'environ 70 %+", "Exactement 100 %", "Peu importe le score"],
        answer: 1,
        explain: "Un score stable autour de 70 %+ sur des examens blancs complets est un bon signal de préparation, accompagné d'une analyse systématique des erreurs.",
      },
    ],
  },

  // ── MODULE 8 : EXAMEN BLANC ────────────────────────────────────────────────
  {
    id: "examen-blanc",
    title: "Examen blanc & auto-évaluation",
    level: "avance",
    icon: "✅",
    description:
      "La partie où tu te testes. Comment t'auto-évaluer efficacement, puis une batterie de questions couvrant les 3 domaines et l'agile/hybride.",
    lessons: [
      {
        id: "pmp-mock-1",
        title: "Comment t'auto-évaluer efficacement",
        duration: "20 min",
        content: `Se tester n'a de valeur que si on **exploite** les résultats. Voici la méthode.

**Conditions réalistes**

→ Fais des séries **chronométrées**, sans interruption, comme le jour J.

→ Travaille par blocs (ex. 30 à 60 questions) puis des examens complets de 180 questions en fin de préparation.

**Analyse des erreurs (le plus important)**

→ Pour chaque erreur, écris **pourquoi** la bonne réponse est meilleure et pourquoi la tienne était un piège.

→ Classe tes erreurs par **domaine** (People / Process / Business) et par **type** (mindset, calcul, agile…). Tu verras vite tes points faibles.

→ Retravaille ciblé : 80 % de ton temps de fin de prépa doit aller sur tes 20 % de faiblesses.

**Score cible** : viser **70 %+** de façon **stable** sur plusieurs examens blancs complets avant de réserver. Un bon score isolé ne suffit pas.

**Le quiz ci-dessous** te donne un échantillon couvrant tous les domaines. Pour t'entraîner en volume, complète avec : PMI Study Hall (https://studyhall.pmi.org/login), David McLachlan (https://www.youtube.com/playlist?list=PLEWFSKHjyrwywWx6mri0ooX5YVjDPrgX1) et le PM Exam Simulator (https://www.pm-exam-simulator.com/pmp-exam-simulator).

**Passe au « Quiz de validation »** pour ton examen blanc.`,
      },
      {
        id: "pmp-mock-2",
        title: "Plan des 10 derniers jours",
        duration: "15 min",
        content: `Un micro-plan pour convertir ta préparation en réussite.

→ **J-10 à J-7** : 2 examens blancs complets. Analyse fine des erreurs par domaine.

→ **J-6 à J-3** : révision ciblée des faiblesses + relecture de l'ECO 2026 tâche par tâche. 1 examen blanc supplémentaire.

→ **J-2** : révision légère (mindset PMI, formules EVM, modes de conflit, EEF/OPA, réponses aux opportunités/menaces). Vérifie la logistique (centre ou online proctored).

→ **J-1** : repos. Pas de bachotage. Sommeil.

→ **Jour J** : applique la stratégie d'examen — lire jusqu'au bout, éliminer les distracteurs, mindset PMI, gérer le temps (~1 min 20/question), ne rien laisser vide, utiliser les pauses.

**Checklist mémoire express**

→ Servant leadership, comprendre avant d'agir, créer de la valeur.

→ EVM : variance = soustraction, index = division ; supérieur à 1 = bon.

→ Conflit → collaborer ; opportunité → exploiter/partager/améliorer/accepter.

→ Changement → maîtrise intégrée des changements ; EEF subis / OPA réutilisés.

→ Agile → inspecter & adapter, protéger le sprint, le PO priorise le backlog.

**Ressource** : récap final + free resources PrepCast https://www.project-management-prepcast.com/free/pmp-exam`,
      },
    ],
    quiz: [
      {
        q: "Un membre clé quitte l'équipe en plein projet prédictif. Quelle est la PREMIÈRE action ?",
        options: [
          "Escalader immédiatement au sponsor pour annuler le projet",
          "Évaluer l'impact sur le plan et chercher une solution (réaffectation, remplacement) via la maîtrise des changements si nécessaire",
          "Répartir le travail en secret",
          "Ignorer et continuer",
        ],
        answer: 1,
        explain: "On évalue d'abord l'impact, puis on agit au bon niveau (réaffectation, recrutement), en passant par la gestion des changements si les baselines sont affectées.",
      },
      {
        q: "SPI = 1,1 et CPI = 0,9. Le projet est :",
        options: [
          "En avance mais au-dessus du budget",
          "En retard et sous le budget",
          "En avance et sous le budget",
          "En retard et au-dessus du budget",
        ],
        answer: 0,
        explain: "SPI > 1 = en avance sur le planning ; CPI < 1 = dépassement de coût. Donc en avance mais au-dessus du budget.",
      },
      {
        q: "En agile, le client veut ajouter une fonctionnalité importante. Que fait l'équipe ?",
        options: [
          "Elle l'ajoute au sprint en cours immédiatement",
          "Le Product Owner l'ajoute au backlog et la priorise pour un prochain sprint",
          "Elle refuse tout changement",
          "Elle arrête le sprint",
        ],
        answer: 1,
        explain: "Le changement va au backlog où le PO le priorise ; on protège le sprint en cours. L'agilité accueille le changement, de façon ordonnée.",
      },
      {
        q: "Deux membres sont en conflit ouvert sur une approche technique. Le PM devrait :",
        options: [
          "Imposer sa propre solution",
          "Les laisser se débrouiller seuls",
          "Faciliter une résolution collaborative axée sur le problème",
          "Escalader directement au sponsor",
        ],
        answer: 2,
        explain: "Collaborer / résoudre le problème à la source est le mode privilégié. Le PM facilite un dialogue centré sur le problème, pas sur les personnes.",
      },
      {
        q: "Un modèle de plan de communication réutilisé d'un projet précédent est :",
        options: ["Un EEF", "Un OPA", "Un risque", "Une baseline"],
        answer: 1,
        explain: "C'est un actif organisationnel (OPA) : un modèle interne réutilisable. Les EEF sont des facteurs externes/imposés.",
      },
      // ── BLOC 2 : Structures & autorité ────────────────────────────────────
      {
        q: "Dans une organisation fonctionnelle, un chef de projet a du mal à obtenir des ressources des directeurs de département. Quelle est la MEILLEURE approche ?",
        options: [
          "Escalader immédiatement au PDG",
          "Négocier avec les directeurs fonctionnels en mettant en avant les priorités du projet",
          "Recruter des ressources externes sans concertation",
          "Réduire le périmètre du projet unilatéralement",
        ],
        answer: 1,
        explain: "Dans une structure fonctionnelle, le PM a peu d'autorité. La négociation avec les directeurs fonctionnels est la bonne approche — pas l'escalade hiérarchique directe.",
      },
      {
        q: "Quelle structure organisationnelle donne au chef de projet le plus d'autorité sur son équipe ?",
        options: ["Fonctionnelle", "Matricielle faible", "Matricielle équilibrée", "Projectisée"],
        answer: 3,
        explain: "Dans une structure projectisée, l'équipe est dédiée au projet et le PM a une autorité totale sur le budget et les ressources.",
      },
      {
        q: "Un PMO de type 'contrôlant' :",
        options: [
          "Gère directement tous les projets",
          "Fournit uniquement des modèles et des formations",
          "Impose des méthodologies et audite la conformité des projets",
          "N'a aucun rôle décisionnel",
        ],
        answer: 2,
        explain: "Le PMO contrôlant impose des standards et des outils, et vérifie leur application — entre le supportif (conseil) et le directif (direction).",
      },
      {
        q: "Dans une structure matricielle, un membre de l'équipe reçoit des instructions contradictoires du PM et de son directeur fonctionnel. Que doit faire le PM EN PREMIER ?",
        options: [
          "Envoyer un email au directeur fonctionnel pour se plaindre",
          "Discuter avec le directeur fonctionnel pour aligner les priorités",
          "Ignorer le directeur fonctionnel, le projet prime",
          "Escalader immédiatement au sponsor",
        ],
        answer: 1,
        explain: "La structure matricielle crée ce type de tension. La bonne réponse est de dialoguer avec le directeur fonctionnel pour trouver un alignement — pas d'ignorer ni d'escalader sans avoir essayé.",
      },
      // ── BLOC 3 : Resource Leveling / Smoothing ────────────────────────────
      {
        q: "Le chef de projet doit résoudre une surcharge de ressources sur une tâche sans contraindre la date de fin du projet. Il utilise :",
        options: ["Resource Leveling", "Resource Smoothing", "Crashing", "Fast tracking"],
        answer: 1,
        explain: "Resource Smoothing ajuste l'utilisation des ressources dans les limites de la marge flottante, sans toucher à la date de fin. Resource Leveling peut décaler la date de fin.",
      },
      {
        q: "Le resource leveling entraîne souvent :",
        options: [
          "Une réduction du budget",
          "Un allongement de la durée du projet",
          "Une augmentation du nombre de ressources",
          "Une réduction du périmètre",
        ],
        answer: 1,
        explain: "En nivelant les ressources pour supprimer les surcharges, on étale les tâches dans le temps, ce qui repousse souvent la date de fin du projet.",
      },
      // ── BLOC 4 : Communications ────────────────────────────────────────────
      {
        q: "L'équipe passe de 5 à 10 membres. Combien de canaux de communication supplémentaires cela crée-t-il ?",
        options: ["5", "10", "35", "45"],
        answer: 2,
        explain: "5 membres → 10 canaux. 10 membres → 45 canaux. Différence = 35 canaux supplémentaires. Formule : n(n-1)/2.",
      },
      {
        q: "Un rapport décrivant les performances passées sur la période écoulée est un :",
        options: ["Rapport d'avancement", "Rapport de performance", "Rapport de prévision", "Plan de communication"],
        answer: 1,
        explain: "Le rapport de performance analyse ce qui s'est passé sur une période. Le rapport d'avancement montre où on en est par rapport au plan. Le rapport de prévision projette la fin.",
      },
      {
        q: "Une décision importante de changement de périmètre doit être communiquée :",
        options: [
          "Verbalement en réunion, c'est plus rapide",
          "Par communication formelle écrite, pour traçabilité et référence",
          "Par message instantané à l'équipe",
          "Uniquement au sponsor, pas à l'équipe",
        ],
        answer: 1,
        explain: "Les décisions formelles (changements de périmètre, approbations) se documentent par écrit pour assurer la traçabilité et éviter les malentendus.",
      },
      // ── BLOC 5 : Parties prenantes ────────────────────────────────────────
      {
        q: "Une partie prenante ayant un fort intérêt dans le projet mais très peu de pouvoir doit être :",
        options: [
          "Maintenue satisfaite (keep satisfied)",
          "Gérée attentivement (manage closely)",
          "Tenue informée (keep informed)",
          "Ignorée (monitor)",
        ],
        answer: 2,
        explain: "Grille pouvoir/intérêt : fort intérêt + faible pouvoir = 'keep informed'. Faible intérêt + fort pouvoir = 'keep satisfied'. Fort/fort = 'manage closely'. Faible/faible = 'monitor'.",
      },
      {
        q: "En cours de projet, tu découvres une partie prenante clé qui n'a jamais été identifiée. Que fais-tu EN PREMIER ?",
        options: [
          "L'ignorer si le projet est déjà bien avancé",
          "L'ajouter au registre des parties prenantes et analyser son impact potentiel",
          "Escalader au sponsor avant toute action",
          "Réduire son influence en l'écartant des réunions",
        ],
        answer: 1,
        explain: "Une partie prenante non identifiée est un risque. Il faut l'enregistrer et analyser son impact immédiatement — l'identification des parties prenantes est un processus continu.",
      },
      {
        q: "Le registre des parties prenantes contient principalement :",
        options: [
          "Les budgets alloués à chaque partie prenante",
          "L'identification, l'évaluation (intérêt, pouvoir, attitude) et les stratégies d'engagement",
          "Les contrats avec les fournisseurs",
          "Les risques liés aux parties prenantes uniquement",
        ],
        answer: 1,
        explain: "Le registre recense qui sont les parties prenantes, leur niveau d'influence et d'intérêt, leur attitude (favorable/neutre/résistante) et la stratégie d'engagement appropriée.",
      },
      // ── BLOC 6 : Risque approfondi ────────────────────────────────────────
      {
        q: "La réserve de contingence est destinée à couvrir :",
        options: [
          "Les imprévus totalement inconnus",
          "Les risques identifiés et quantifiés (known unknowns)",
          "Les dépassements de budget du PM",
          "Les changements de périmètre approuvés",
        ],
        answer: 1,
        explain: "La réserve de contingence couvre les risques connus-inconnus (on sait qu'ils peuvent arriver mais pas quand/comment). La réserve de management couvre l'imprévu total.",
      },
      {
        q: "L'analyse qualitative des risques permet de :",
        options: [
          "Calculer précisément le coût de chaque risque",
          "Prioriser les risques selon leur probabilité et leur impact estimés",
          "Éliminer tous les risques",
          "Remplacer l'analyse quantitative",
        ],
        answer: 1,
        explain: "L'analyse qualitative (matrice probabilité × impact) permet de trier les risques pour concentrer les efforts sur les plus importants. L'analyse quantitative chiffre ensuite les risques prioritaires.",
      },
      {
        q: "Un risque se concrétise malgré les mesures d'atténuation. On déclenche alors :",
        options: [
          "Un nouveau processus d'identification des risques",
          "Le plan de repli (fallback plan)",
          "Une demande de changement pour arrêter le projet",
          "Une réunion de leçons apprises",
        ],
        answer: 1,
        explain: "Le plan de repli (fallback plan) est préparé à l'avance pour les risques dont le plan de réponse principal pourrait échouer.",
      },
      {
        q: "Une opportunité importante est identifiée mais hors des ressources disponibles. La meilleure réponse est :",
        options: [
          "Accepter passivement",
          "Partager avec un partenaire pour exploiter l'opportunité conjointement",
          "Éviter l'opportunité",
          "Transférer le risque à un assureur",
        ],
        answer: 1,
        explain: "Partager une opportunité = s'allier à un tiers qui a les capacités manquantes. Exploiter serait idéal mais nécessite les ressources. Éviter et transférer concernent les menaces.",
      },
      // ── BLOC 7 : Agile / Hybride ──────────────────────────────────────────
      {
        q: "À la fin d'un sprint, l'incrément livré ne satisfait pas la definition of done. Le Scrum Master doit :",
        options: [
          "Accepter l'incrément et le livrer quand même pour ne pas rater la date",
          "Ne pas livrer l'incrément — il n'est pas terminé selon les critères convenus",
          "Modifier la definition of done pour l'accepter",
          "Escalader au management pour une dérogation",
        ],
        answer: 1,
        explain: "La definition of done est non-négociable par sprint. Un incrément non conforme n'est pas livrable. Le travail reste dans le backlog et est replanifié.",
      },
      {
        q: "Quelle cérémonie Scrum a pour but d'inspecter le produit et de recueillir du feedback des parties prenantes ?",
        options: ["Daily Scrum", "Sprint Planning", "Sprint Review", "Sprint Retrospective"],
        answer: 2,
        explain: "La Sprint Review (revue de sprint) est dédiée à la démo du produit et au feedback des parties prenantes. La Rétrospective, elle, inspecte le processus de l'équipe.",
      },
      {
        q: "Dans Kanban, la règle des WIP limits sert à :",
        options: [
          "Limiter le nombre de membres dans l'équipe",
          "Limiter le travail en cours pour révéler les goulets d'étranglement et fluidifier le flux",
          "Fixer la durée des sprints",
          "Définir le nombre de colonnes du tableau",
        ],
        answer: 1,
        explain: "Les WIP limits (Work In Progress) forcent l'équipe à finir avant de commencer. Cela expose les blocages et améliore le débit global plutôt que de maximiser l'occupation individuelle.",
      },
      {
        q: "En approche hybride, un projet utilise des sprints pour le développement mais un plan prédictif pour la phase d'architecture. C'est :",
        options: [
          "Une mauvaise pratique selon le PMI",
          "Du tailoring — adapter l'approche au contexte de chaque phase",
          "Obligatoirement du Scrum",
          "Une violation du PMBOK 8",
        ],
        answer: 1,
        explain: "Le tailoring est central dans PMBOK 7/8. Combiner prédictif et agile selon les besoins de chaque phase est une bonne pratique — l'hybride est explicitement reconnu par le PMI.",
      },
      {
        q: "La vélocité d'une équipe Scrum mesure :",
        options: [
          "La rapidité à laquelle les membres travaillent individuellement",
          "Le nombre de story points livrés en moyenne par sprint",
          "La durée moyenne d'un sprint",
          "Le ratio bugs/fonctionnalités",
        ],
        answer: 1,
        explain: "La vélocité = story points livrés par sprint (moyenne sur plusieurs sprints). Elle sert à la planification (combien de travail peut tenir dans un sprint) — pas à mesurer la productivité individuelle.",
      },
      // ── BLOC 8 : Business Environment ────────────────────────────────────
      {
        q: "Le business case d'un projet décrit principalement :",
        options: [
          "Le détail des tâches et jalons du projet",
          "La justification économique et les bénéfices attendus qui légitiment l'investissement",
          "La liste des parties prenantes",
          "Le plan de management des risques",
        ],
        answer: 1,
        explain: "Le business case justifie pourquoi le projet mérite d'être financé — bénéfices attendus, coûts, ROI, alternatives. Il est évalué tout au long du projet pour confirmer la pertinence.",
      },
      {
        q: "Le benefit realization plan (plan de réalisation des bénéfices) est typiquement géré par :",
        options: ["Le chef de projet", "L'équipe de développement", "Le sponsor et l'organisation, souvent après la clôture du projet", "Le PMO uniquement"],
        answer: 2,
        explain: "Les bénéfices (ex. augmentation des revenus) se réalisent souvent après la livraison du projet. C'est l'organisation (sponsor, direction) qui en assure le suivi — le PM peut y contribuer mais n'en est pas responsable seul.",
      },
      {
        q: "Un facteur environnemental de l'entreprise (EEF) est :",
        options: [
          "Un modèle de document interne réutilisable",
          "Un élément externe ou organisationnel que l'équipe doit subir sans pouvoir le contrôler",
          "Une décision prise par le PM",
          "Un livrable du projet",
        ],
        answer: 1,
        explain: "Les EEF (Enterprise Environmental Factors) sont des contraintes imposées : culture d'entreprise, réglementations, marché, infrastructure IT. On les subit. Les OPA (actifs organisationnels) sont réutilisables.",
      },
      {
        q: "Lors de la phase de clôture d'un projet, quelle action est la plus importante ?",
        options: [
          "Archiver tous les documents et capturer les leçons apprises",
          "Lancer immédiatement le projet suivant",
          "Supprimer le registre des risques",
          "Réassigner l'équipe sans debriefing",
        ],
        answer: 0,
        explain: "La clôture formelle inclut : acceptation du client, archivage des documents, et surtout les leçons apprises — elles enrichissent les OPA pour les projets futurs.",
      },
      // ── BLOC 9 : Éthique & leadership ────────────────────────────────────
      {
        q: "Un fournisseur t'offre un cadeau de valeur significative après l'attribution du contrat. Tu dois :",
        options: [
          "Accepter, le contrat est déjà signé donc il n'y a pas de conflit",
          "Refuser et le signaler selon le code d'éthique PMI",
          "Accepter discrètement sans en parler",
          "Demander l'avis de l'équipe avant de décider",
        ],
        answer: 1,
        explain: "Le code d'éthique PMI exige d'éviter tout conflit d'intérêts réel ou apparent. Accepter un cadeau de valeur d'un fournisseur viole le principe d'équité, même après signature.",
      },
      {
        q: "Tu remarques qu'un collègue PM falsifie ses rapports d'avancement. Que dois-tu faire ?",
        options: [
          "Ignorer, ce n'est pas ton projet",
          "En parler directement à ton collègue, puis signaler si le problème persiste",
          "Corriger toi-même ses rapports sans l'avertir",
          "Attendre que la direction s'en aperçoive",
        ],
        answer: 1,
        explain: "Le code PMI exige honnêteté et responsabilité. Aborder le problème directement est la première étape. Si ça ne change pas, signaler est une obligation éthique.",
      },
      {
        q: "Un servant leader, selon le mindset PMI, :",
        options: [
          "Prend toutes les décisions à la place de l'équipe pour aller plus vite",
          "Sert l'équipe en levant les obstacles, facilite et responsabilise plutôt que de commander",
          "Délègue tout au sponsor",
          "Se concentre uniquement sur les livrables techniques",
        ],
        answer: 1,
        explain: "Le servant leadership est central dans PMBOK 7/8 et le mindset PMI : le PM est au service de l'équipe, crée les conditions de sa réussite, et évite le micro-management.",
      },
      // ── BLOC 10 : Intégration & pilotage ─────────────────────────────────
      {
        q: "Un changement est demandé en cours de projet mais n'est pas encore approuvé par le CCB. Le PM doit :",
        options: [
          "L'implémenter tout de suite pour gagner du temps",
          "Attendre l'approbation formelle du CCB avant tout travail",
          "Demander à l'équipe de commencer discrètement",
          "Refuser le changement sans l'évaluer",
        ],
        answer: 1,
        explain: "Aucun changement ne doit être implémenté avant approbation formelle par le processus de maîtrise intégrée des changements (CCB). Commencer avant = contournement des processus.",
      },
      {
        q: "Les leçons apprises doivent être documentées :",
        options: [
          "Uniquement à la clôture du projet",
          "Tout au long du projet, et formellement à la clôture",
          "Seulement en cas d'échec",
          "Par le sponsor, pas le PM",
        ],
        answer: 1,
        explain: "Les leçons apprises sont un processus continu — on les capture au fil du projet (pas seulement à la fin) pour pouvoir les appliquer immédiatement et les archiver pour les projets futurs.",
      },
      {
        q: "EAC = 500 000 $, BAC = 400 000 $. Que cela signifie-t-il ?",
        options: [
          "Le projet sera livré en avance",
          "Le projet va dépasser le budget d'origine de 100 000 $",
          "Le projet est sous le budget",
          "L'indice CPI est supérieur à 1",
        ],
        answer: 1,
        explain: "EAC (Estimate At Completion) > BAC (Budget At Completion) signifie un dépassement prévu. Ici +100 000 $. CPI < 1 dans ce cas (on dépense plus que prévu par unité de valeur acquise).",
      },
      {
        q: "AC = 200 000 $, EV = 150 000 $, PV = 180 000 $. Le projet est :",
        options: [
          "En avance sur le planning et sous le budget",
          "En retard sur le planning et au-dessus du budget",
          "En avance sur le planning mais au-dessus du budget",
          "En retard sur le planning et sous le budget",
        ],
        answer: 1,
        explain: "SV = EV - PV = 150k - 180k = -30k → en retard. CV = EV - AC = 150k - 200k = -50k → au-dessus du budget. Les deux indicateurs sont négatifs.",
      },
      {
        q: "Un projet est arrêté avant terme par décision du sponsor. Le PM doit :",
        options: [
          "Refuser et continuer le projet",
          "Réaliser une clôture formelle : archiver, libérer les ressources, documenter les leçons apprises",
          "Simplement arrêter le travail sans formalités",
          "Transférer le projet à un autre PM automatiquement",
        ],
        answer: 1,
        explain: "Même un projet arrêté prématurément doit être clôturé formellement. Cela inclut l'archivage, la libération des ressources, les leçons apprises et la communication aux parties prenantes.",
      },
      {
        q: "Le business case montre que le projet ne créera plus la valeur attendue. Que faire ?",
        options: [
          "Continuer coûte que coûte",
          "Le signaler : il peut être recadré ou arrêté",
          "Cacher l'information au sponsor",
          "Réduire la qualité pour finir vite",
        ],
        answer: 1,
        explain: "On pilote vers la valeur. Si le business case n'est plus valable, il faut le remonter ; recadrer ou arrêter un projet sans valeur est une décision saine.",
      },
      {
        q: "Quelle réponse traite une MENACE (risque négatif) ?",
        options: ["Exploiter", "Améliorer", "Atténuer", "Partager"],
        answer: 2,
        explain: "Pour une menace : éviter, transférer, atténuer, accepter (ou escalader). Exploiter, améliorer, partager concernent les opportunités.",
      },
      {
        q: "À quoi sert la définition de « done » (definition of done) en agile ?",
        options: [
          "À fixer la date de fin du projet",
          "À définir des critères partagés de complétude d'un incrément",
          "À calculer la vélocité",
          "À remplacer le backlog",
        ],
        answer: 1,
        explain: "La definition of done est l'ensemble des critères partagés qu'un incrément doit remplir pour être considéré terminé.",
      },
      {
        q: "Une partie prenante très influente mais peu intéressée doit être :",
        options: [
          "Ignorée",
          "Maintenue satisfaite (forte attention, communication adaptée)",
          "Submergée de détails quotidiens",
          "Retirée du projet",
        ],
        answer: 1,
        explain: "Dans la grille pouvoir/intérêt, un fort pouvoir et faible intérêt se gère en « keep satisfied » : on la tient satisfaite sans la noyer de détails.",
      },
      {
        q: "Sur le chemin critique, une tâche prend 2 jours de retard et aucune marge n'existe. Conséquence :",
        options: [
          "Aucun impact",
          "Le projet prend 2 jours de retard (sauf compression)",
          "Le budget augmente automatiquement",
          "Le périmètre diminue",
        ],
        answer: 1,
        explain: "Un retard sur le chemin critique (marge nulle) décale la fin du projet, sauf à comprimer (crashing/fast tracking).",
      },
      {
        q: "Le PMBOK 8 introduit notamment :",
        options: [
          "La suppression de l'agile",
          "Un principe de durabilité et une annexe sur l'IA",
          "Le retour à 12 principes",
          "La fin des parties prenantes",
        ],
        answer: 1,
        explain: "PMBOK 8 ajoute la durabilité comme principe et une annexe IA, avec 6 principes et 7 domaines de performance.",
      },
      {
        q: "Le sponsor demande d'accélérer en ajoutant des personnes à une tâche en retard. Cette technique s'appelle :",
        options: ["Fast tracking", "Crashing", "Scope creep", "Gold plating"],
        answer: 1,
        explain: "Ajouter des ressources pour raccourcir une tâche = crashing (coûte plus cher). Fast tracking = paralléliser des tâches (plus de risque).",
      },
      {
        q: "En réunion quotidienne (daily standup), un membre soulève un long problème technique. Le Scrum Master :",
        options: [
          "Laisse la réunion durer 1 heure",
          "Note le sujet et organise un échange dédié après le standup",
          "Ignore le problème",
          "Annule les prochains standups",
        ],
        answer: 1,
        explain: "Le standup reste court (~15 min) et axé synchronisation. Les sujets de fond sont traités juste après, avec les bonnes personnes.",
      },
      {
        q: "Quel document autorise formellement le projet et nomme le chef de projet ?",
        options: ["Le plan de management", "La charte de projet", "La WBS", "Le registre des risques"],
        answer: 1,
        explain: "La charte (project charter), émise par le sponsor, autorise le projet et donne autorité au chef de projet.",
      },
      {
        q: "Un fournisseur livre un travail conforme au contrat mais l'équipe en a ajouté « pour faire mieux » sans demande. C'est :",
        options: ["Du scope creep", "Du gold plating", "De la maîtrise des changements", "Une opportunité"],
        answer: 1,
        explain: "Ajouter des extras non demandés est du « gold plating ». Le scope creep, lui, désigne des ajouts non contrôlés au périmètre.",
      },
    ],
  },
];

export function getPmpModule(id) {
  return PMP_CURRICULUM.find((m) => m.id === id);
}

export function totalPmpLessons() {
  return PMP_CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
