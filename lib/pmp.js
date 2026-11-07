// Parcours PMP — Préparation à la certification Project Management Professional (PMI).
// Construit pour le NOUVEL examen en vigueur depuis le 9 juillet 2026 (PMBOK 8, ECO 2026).
// Indépendant des parcours ML et Web. Leçons + quiz + examen blanc.

import { PMP_EXERCISES } from "./exercises-pmp.js";

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
      },
      {
        id: "pmp-found-2",
        title: "Éligibilité, 35 heures de formation & candidature",
        duration: "35 min",
      },
      {
        id: "pmp-found-3",
        title: "Le nouvel examen 2026 : format, coût, logistique",
        duration: "30 min",
      },
      {
        id: "pmp-found-4",
        title: "ECO 2026 & PMBOK 8 : la carte du territoire",
        duration: "40 min",
      },
      {
        id: "pmp-found-5b",
        title: "Structures organisationnelles & autorité du PM",
        duration: "35 min",
      },
      {
        id: "pmp-found-5",
        title: "Plan de préparation réaliste (8 à 12 semaines)",
        duration: "30 min",
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
      },
      {
        id: "pmp-mindset-2",
        title: "Tailoring : choisir et adapter l'approche",
        duration: "25 min",
      },
      {
        id: "pmp-mindset-3",
        title: "Code d'éthique & conduite professionnelle",
        duration: "25 min",
      },
      {
        id: "pmp-mindset-4",
        title: "Répondre aux questions situationnelles",
        duration: "30 min",
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
      },
      {
        id: "pmp-people-2",
        title: "Leadership, motivation & intelligence émotionnelle",
        duration: "35 min",
      },
      {
        id: "pmp-people-3",
        title: "Gérer les conflits & négocier",
        duration: "35 min",
      },
      {
        id: "pmp-people-4",
        title: "Servant leadership : obstacles, coaching, équipes virtuelles",
        duration: "30 min",
      },
      {
        id: "pmp-people-5",
        title: "Engager les parties prenantes (côté humain)",
        duration: "30 min",
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
      },
      {
        id: "pmp-process-2",
        title: "Périmètre & exigences",
        duration: "35 min",
      },
      {
        id: "pmp-process-3",
        title: "Échéancier, coûts & valeur acquise (EVM)",
        duration: "45 min",
      },
      {
        id: "pmp-process-4",
        title: "Qualité, ressources, communications & nivellement",
        duration: "50 min",
      },
      {
        id: "pmp-process-5",
        title: "Risque & approvisionnement (procurement)",
        duration: "35 min",
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
      },
      {
        id: "pmp-agile-2",
        title: "Kanban, XP & mise à l'échelle",
        duration: "30 min",
      },
      {
        id: "pmp-agile-3",
        title: "Cérémonies, artefacts & métriques agiles",
        duration: "35 min",
      },
      {
        id: "pmp-agile-4",
        title: "Hybride : combiner prédictif et agile",
        duration: "30 min",
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
      },
      {
        id: "pmp-biz-2",
        title: "Valeur, bénéfices & alignement stratégique",
        duration: "35 min",
      },
      {
        id: "pmp-biz-3",
        title: "Changement organisationnel & culture",
        duration: "30 min",
      },
      {
        id: "pmp-biz-4",
        title: "Durabilité, IA & tendances 2026",
        duration: "25 min",
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
      },
      {
        id: "pmp-strat-2",
        title: "Lire une question situationnelle & éliminer les distracteurs",
        duration: "30 min",
      },
      {
        id: "pmp-strat-3",
        title: "Formules clés & gestion du temps",
        duration: "30 min",
      },
      {
        id: "pmp-strat-4",
        title: "Les deux dernières semaines & le jour J",
        duration: "25 min",
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
      },
      {
        id: "pmp-mock-2",
        title: "Plan des 10 derniers jours",
        duration: "15 min",
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

// ── Fusion des exercices ──────────────────────────────────────────────────
// Même mécanique que pour les parcours ML et Web : les exercices vivent dans
// lib/exercises-pmp.js et sont greffés ici une fois, au chargement.
for (const mod of PMP_CURRICULUM) {
  const extra = PMP_EXERCISES[mod.id];
  if (!extra) continue;
  for (const lesson of mod.lessons) {
    const exercises = extra.lessons?.[lesson.id];
    if (exercises) lesson.exercises = exercises;
  }
  if (extra.finalExercise) mod.finalExercise = extra.finalExercise;
  if (extra.quizExtra?.length) mod.quiz = [...mod.quiz, ...extra.quizExtra];
}

export function getPmpModule(id) {
  return PMP_CURRICULUM.find((m) => m.id === id);
}

export function totalPmpLessons() {
  return PMP_CURRICULUM.reduce((acc, m) => acc + m.lessons.length, 0);
}
