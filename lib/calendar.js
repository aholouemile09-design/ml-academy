// Calendrier de discipline — rythme : 3 soirs × 75 min + samedi 3h30 ≈ 7-9h/semaine

// ── Plan générique par module (commun à tous les profils) ───────────────────
export const MODULE_PLAN = [
  // Track ML & Data Science
  { id: "setup-pro",      track: "ml",  title: "Setup Pro",                   weeks: 2,  icon: "⚙️", priority: "A",   resource: "MIT Missing Semester",               project: "Repo template Git structuré" },
  { id: "python-ds",      track: "ml",  title: "Python pour la Data Science", weeks: 6,  icon: "🐍", priority: "A",   resource: "Kaggle Python + tutoriel officiel",  project: "CLI gestionnaire de données CSV" },
  { id: "sql",            track: "ml",  title: "SQL & Bases de données",      weeks: 4,  icon: "🗄", priority: "A",   resource: "SQLBolt + PostgreSQL Docs",          project: "Schéma BDD + 15 requêtes analytiques" },
  { id: "maths-ml",       track: "ml",  title: "Mathématiques pour le ML",    weeks: 6,  icon: "📐", priority: "A",   resource: "Mathematics for ML (Deisenroth)",    project: "Notebook : matrices, régression, gradient descent" },
  { id: "ml-classique",   track: "ml",  title: "Machine Learning classique",  weeks: 8,  icon: "🤖", priority: "A",   resource: "Google ML Crash Course + sklearn",   project: "Projet ML complet avec baseline et métriques" },
  { id: "deep-learning",  track: "ml",  title: "Deep Learning",               weeks: 5,  icon: "🧠", priority: "A",   resource: "PyTorch Tutorials + D2L.ai",         project: "Image classifier FashionMNIST/CIFAR" },
  { id: "nlp",            track: "ml",  title: "NLP & Transformers",          weeks: 4,  icon: "💬", priority: "A/B", resource: "HuggingFace Learn + Transformers docs",project: "Classificateur de texte fine-tuné" },
  { id: "mlops",          track: "ml",  title: "MLOps",                       weeks: 8,  icon: "⚙️", priority: "A",   resource: "MLflow + FastAPI + Docker",          project: "API /predict avec CI/CD et monitoring" },
  { id: "cloud-aws",      track: "ml",  title: "Cloud & AWS",                 weeks: 4,  icon: "☁️", priority: "A",   resource: "AWS Skill Builder",                  project: "Déploiement ML sur AWS EC2/Lambda" },
  // Track Web Full Stack
  { id: "html-css",       track: "web", title: "HTML & CSS",                  weeks: 3,  icon: "🎨", priority: "A",   resource: "MDN Web Docs",                       project: "Page portfolio responsive" },
  { id: "javascript",     track: "web", title: "JavaScript",                  weeks: 5,  icon: "⚡", priority: "A",   resource: "javascript.info",                    project: "Application web interactive" },
  { id: "typescript",     track: "web", title: "TypeScript",                  weeks: 3,  icon: "🔷", priority: "A",   resource: "typescriptlang.org/docs",            project: "Refactor d'un projet JS en TS strict" },
  { id: "react-nextjs",   track: "web", title: "React & Next.js",             weeks: 6,  icon: "⚛️", priority: "A",   resource: "react.dev + nextjs.org/docs",        project: "Site full-stack avec API routes" },
  // Les BDD viennent AVANT le backend : l'API et l'authentification s'appuient dessus.
  { id: "databases-web",  track: "web", title: "Bases de données Web",        weeks: 3,  icon: "🗄", priority: "A",   resource: "Prisma + PostgreSQL",                project: "CRUD avec ORM et migrations" },
  { id: "backend-node",   track: "web", title: "Backend Node.js",             weeks: 4,  icon: "🟢", priority: "A",   resource: "Node.js docs + Express",             project: "API REST authentifiée" },
  { id: "deployment-web", track: "web", title: "Déploiement Web",             weeks: 2,  icon: "🚀", priority: "A",   resource: "Vercel + Docker Docs",               project: "App déployée avec CI/CD" },
];

export const TOTAL_WEEKS_ML  = MODULE_PLAN.filter(m => m.track === "ml").reduce((a, m) => a + m.weeks, 0);
export const TOTAL_WEEKS_WEB = MODULE_PLAN.filter(m => m.track === "web").reduce((a, m) => a + m.weeks, 0);

export const WEEKLY_SCHEDULE = [
  { day: "Lundi",    type: "study", sessions: [{ time: "19h00-20h15", label: "Leçon + exercices", duration: 75 }] },
  { day: "Mardi",    type: "rest",  sessions: [] },
  { day: "Mercredi", type: "study", sessions: [{ time: "19h00-20h15", label: "Leçon + exercices", duration: 75 }] },
  { day: "Jeudi",    type: "rest",  sessions: [] },
  { day: "Vendredi", type: "study", sessions: [{ time: "19h00-20h15", label: "Projet ou révision", duration: 75 }] },
  { day: "Samedi",   type: "deep",  sessions: [{ time: "09h00-12h30", label: "Projet portfolio ou nouveau module", duration: 210 }] },
  { day: "Dimanche", type: "rest",  sessions: [{ time: "20h00-20h30", label: "Révision légère (optionnel)", duration: 30 }] },
];

export const ROADMAP_5ANS = [
  {
    id: "phase1",
    period: "2026 — 2027",
    title: "Fondations & Portfolio",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    textColor: "text-emerald-400",
    icon: "🌱",
    objective: "Construire des fondations solides et un portfolio GitHub visible",
    livrables: [
      "Environnement pro configuré (venv, Git, IDE)",
      "3 projets portfolio publiés sur GitHub",
      "1 API ML déployable avec Docker",
      "Certifications Kaggle (Python, Pandas, ML)",
    ],
    milestones: [
      { month: "Juil 2026", label: "Setup pro + Python fondamental", modules: ["setup-pro", "python"] },
      { month: "Oct 2026",  label: "SQL + NumPy + Pandas maîtrisés", modules: ["sql-databases"] },
      { month: "Jan 2027",  label: "Projet ML classique terminé", modules: ["maths", "eda-visualisation", "feature-engineering", "ml-classique"] },
      { month: "Avr 2027",  label: "Deep Learning + NLP terminés", modules: ["deep-learning", "nlp-transformers"] },
      { month: "Juil 2027", label: "Capstone MLOps déployé sur AWS", modules: ["cloud-aws", "mlops"] },
    ],
  },
  {
    id: "phase2",
    period: "2027 — 2028",
    title: "Première entrée dans le domaine",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: "🚪",
    objective: "Entrer par ML Junior, MLOps Junior, Data Engineer ou Analytics Engineer",
    livrables: [
      "Expérience production réelle",
      "Réseau LinkedIn actif + candidatures ciblées",
      "AWS Cloud Practitioner obtenu",
    ],
    milestones: [
      { month: "Sept 2027", label: "Premières candidatures envoyées" },
      { month: "Jan 2028",  label: "Certification AWS obtenue" },
      { month: "Juil 2028", label: "Premier poste dans le domaine" },
    ],
    salaryTarget: "80 000 – 100 000 CAD",
  },
  {
    id: "phase3",
    period: "2028 — 2029",
    title: "Spécialisation Cloud/MLOps",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: "⚡",
    objective: "Maîtriser le cloud avancé et commencer la robotique/Computer Vision",
    livrables: [
      "Projet cloud avancé (Kubernetes, Spark)",
      "Début ROS2 et Computer Vision avancé",
      "AWS Solutions Architect ou équivalent",
    ],
    milestones: [
      { month: "2028", label: "Kubernetes + pipelines Spark/Kafka", modules: ["series-temporelles"] },
      { month: "2029", label: "ROS2 publisher/subscriber + RL CartPole" },
    ],
    salaryTarget: "95 000 – 115 000 CAD",
  },
  {
    id: "phase4",
    period: "2029 — 2030",
    title: "Master en IA / ML",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10 border-amber-500/30",
    textColor: "text-amber-400",
    icon: "🎓",
    objective: "M.Sc. ou M.Eng. en AI, ML, Computing Science, ECE ou Robotics",
    livrables: [
      "Admission dans un programme de Master",
      "Financement obtenu (bourse, RA, TA ou employeur)",
      "Projet de recherche appliqué",
    ],
    milestones: [
      { month: "2029", label: "Dossier d'admission préparé (GRE, lettre, portfolio)" },
      { month: "2030", label: "Master en cours + projet de recherche" },
    ],
  },
  {
    id: "phase5",
    period: "2030 — 2031",
    title: "Séniorisation & Leadership",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10 border-rose-500/30",
    textColor: "text-rose-400",
    icon: "👑",
    objective: "Leadership technique, architecture ML, mentoring, projets complexes",
    livrables: [
      "Rôle Senior ML Engineer ou Lead",
      "Architecture ML de production",
      "Mentoring d'équipe junior",
    ],
    milestones: [
      { month: "2031", label: "Senior ML Engineer / Lead confirmé" },
    ],
    salaryTarget: "120 000 – 160 000+ CAD",
  },
];

export const MONTHLY_PLAN_2026_2027 = [
  {
    month: "Juillet 2026",
    weeks: 2,
    priority: "A",
    bloc: "Setup pro",
    resource: "PyCharm Docs + MIT Missing Semester",
    project: "Repo template : src/, tests/, README, requirements.txt",
    validation: "Repo utilisable comme base pour tous les projets",
    color: "text-emerald-400",
  },
  {
    month: "Juillet–Août 2026",
    weeks: 6,
    priority: "A",
    bloc: "Python fondamental",
    resource: "Python Tutorial officiel + Kaggle Python",
    project: "CLI : gestionnaire de budget, fichiers CSV",
    validation: "CLI fonctionne, README clair, 10 commits propres",
    color: "text-emerald-400",
  },
  {
    month: "Août–Septembre 2026",
    weeks: 4,
    priority: "A",
    bloc: "Python avancé (OOP, tests)",
    resource: "Fluent Python (référence) + pytest docs",
    project: "Package Python structuré avec tests unitaires",
    validation: "Tests passent ; code en modules ; documentation",
    color: "text-emerald-400",
  },
  {
    month: "Septembre 2026",
    weeks: 4,
    priority: "A",
    bloc: "Git, Linux/Shell",
    resource: "Pro Git + MIT Missing Semester",
    project: "Script d'automatisation datasets",
    validation: "Workflow Git propre ; script reproductible",
    color: "text-emerald-400",
  },
  {
    month: "Octobre 2026",
    weeks: 4,
    priority: "A",
    bloc: "SQL + modélisation BDD",
    resource: "SQLBolt + PostgreSQL Docs",
    project: "Base 'répertoire santé' : 15 requêtes, export CSV",
    validation: "Schéma SQL propre + rapport court",
    color: "text-emerald-400",
  },
  {
    month: "Oct–Nov 2026",
    weeks: 5,
    priority: "A",
    bloc: "NumPy, Pandas, EDA, Visualisation",
    resource: "pandas docs + Kaggle Pandas",
    project: "EDA complet sur dataset public",
    validation: "Notebook propre + rapport 2 pages + graphiques",
    color: "text-emerald-400",
  },
  {
    month: "Nov–Déc 2026",
    weeks: 6,
    priority: "A",
    bloc: "Maths/stats pour ML",
    resource: "Mathematics for ML + OpenIntro Statistics",
    project: "Notebook 'Math for ML' : matrices, régression, gradient descent",
    validation: "Formules expliquées + implémentation sans scikit-learn",
    color: "text-emerald-400",
  },
  {
    month: "Déc 2026–Jan 2027",
    weeks: 8,
    priority: "A",
    bloc: "Machine Learning classique",
    resource: "Google ML Crash Course + scikit-learn Guide",
    project: "Projet ML #1 : régression/classification avec baseline",
    validation: "README pro, métriques, cross-validation, comparaison",
    color: "text-amber-400",
  },
  {
    month: "Février 2027",
    weeks: 5,
    priority: "A",
    bloc: "Deep Learning PyTorch",
    resource: "PyTorch Tutorials + D2L.ai",
    project: "Image classifier : FashionMNIST/CIFAR",
    validation: "Train/val/test ; modèle sauvegardé ; courbes ; inference",
    color: "text-amber-400",
  },
  {
    month: "Mars 2027",
    weeks: 4,
    priority: "A/B",
    bloc: "Computer Vision appliquée",
    resource: "PyTorch Transfer Learning + Ultralytics YOLO docs",
    project: "Détection ou classification sur images/vidéo",
    validation: "Démo courte, README, limites expliquées",
    color: "text-amber-400",
  },
  {
    month: "Avril 2027",
    weeks: 4,
    priority: "A/B",
    bloc: "NLP avec Hugging Face",
    resource: "HuggingFace Learn + Transformers docs",
    project: "Classificateur demandes santé francophone",
    validation: "Dataset propre ; modèle comparé à baseline ; prudence",
    color: "text-amber-400",
  },
  {
    month: "Mai–Juin 2027",
    weeks: 8,
    priority: "A",
    bloc: "MLOps : MLflow, FastAPI, Docker, CI/CD",
    resource: "MLflow + FastAPI + Docker + GitHub Actions Docs",
    project: "API /predict avec tracking MLflow et Docker",
    validation: "Tests auto, Dockerfile, endpoint fonctionnel",
    color: "text-rose-400",
  },
  {
    month: "Juin–Juil 2027",
    weeks: 4,
    priority: "A",
    bloc: "AWS débutant + Portfolio final",
    resource: "AWS Skill Builder + GitHub Actions",
    project: "Capstone : API ML déployable sur AWS, CV, LinkedIn",
    validation: "Lien démo ou screenshots, architecture, coûts estimés",
    color: "text-rose-400",
  },
];

export const ANTI_DECOURAGE_RULES = [
  {
    icon: "⏱",
    rule: "7-9h par semaine",
    detail: "3 soirs de 75 min + samedi 3h30. Pas plus — protège ton énergie et ta vie.",
  },
  {
    icon: "📅",
    rule: "Semaine tampon",
    detail: "La dernière semaine de chaque mois : corrections, README, repos. Pour rattraper sans culpabilité.",
  },
  {
    icon: "📚",
    rule: "1 ressource principale max",
    detail: "Choisir une ressource et aller jusqu'au bout. Pas de 'juste regarder' un autre cours.",
  },
  {
    icon: "🔨",
    rule: "1 livrable par bloc",
    detail: "Chaque apprentissage produit une trace GitHub visible. Pas de progrès sans preuve.",
  },
  {
    icon: "😴",
    rule: "Dimanche : repos protégé",
    detail: "Sauf révision légère de 30 min. La fatigue cumulative est l'ennemi n°1.",
  },
  {
    icon: "✂️",
    rule: "Règle anti-décrochage",
    detail: "Si fatigue > 2 semaines : retirer les options (bonus), jamais le cœur du programme.",
  },
];

// ── Axe Ingénierie : permis EGBC (Colombie-Britannique) + emploi ────────────
// Ajouté en octobre 2026. Cet axe tourne EN PARALLÈLE du parcours ML, par blocs
// de 8 semaines avant chaque session d'examens — jamais en simultané au quotidien.

export const ROADMAP_INGENIERIE = [
  {
    id: "ing-phase0",
    period: "Oct 2026 — Fév 2027",
    title: "Ouvrir la porte C.-B.",
    color: "from-sky-500 to-cyan-500",
    bgColor: "bg-sky-500/10 border-sky-500/30",
    textColor: "text-sky-400",
    icon: "🚪",
    objective:
      "Déposer un dossier neuf chez EGBC (évaluation par compétences) et candidater dès maintenant aux postes électriques non réglementés en Colombie-Britannique.",
    livrables: [
      "Évaluation préliminaire EGBC demandée",
      "Syllabus détaillés de l'IFTS obtenus (BT/MT, machines, électromagnétisme)",
      "Rapport de compétences démarré — 34 compétences, 7 catégories",
      "Recherche d'emploi automatisée élargie à la C.-B.",
    ],
    milestones: [
      { month: "Oct 2026", label: "Courriel EGBC : évaluation préliminaire du dossier", status: "current" },
      { month: "Oct 2026", label: "Tâche automatisée pointée sur Vancouver / Victoria", status: "current" },
      { month: "Nov 2026", label: "Demande des syllabus détaillés à l'IFTS", status: "todo" },
      { month: "Déc 2026", label: "Rapport de compétences : 7 catégories documentées", status: "todo" },
      { month: "Fév 2027", label: "Dossier EGBC déposé", status: "todo" },
    ],
  },
  {
    id: "ing-phase1",
    period: "2027",
    title: "Poste électrique + décision EGBC",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    textColor: "text-emerald-400",
    icon: "⚡",
    objective:
      "Décrocher un poste électrique en C.-B. (aucun permis requis) pour financer la suite et démarrer l'expérience canadienne, pendant que le ML continue le soir.",
    livrables: [
      "Poste Electrical Designer / Project Coordinator en C.-B.",
      "Expérience canadienne démarrée (compte pour le permis)",
      "Décision académique EGBC reçue — liste d'examens connue",
      "Capstone MLOps terminé en parallèle",
    ],
    milestones: [
      { month: "Mars 2027", label: "Premières candidatures C.-B. envoyées", status: "todo" },
      { month: "Été 2027", label: "Décision EGBC — nombre réel d'examens", status: "todo" },
      { month: "2027", label: "Installation en C.-B. (Vancouver ou Victoria)", status: "todo" },
    ],
    salaryTarget: "75 000 – 95 000 CAD",
  },
  {
    id: "ing-phase2",
    period: "2027 — 2029",
    title: "Examens par blocs",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10 border-amber-500/30",
    textColor: "text-amber-400",
    icon: "📚",
    objective:
      "Valider 2 examens par an, en blocs de 8 semaines avant chaque session. Le reste de l'année, on n'y pense pas : le ML garde la priorité.",
    livrables: [
      "Bloc 1 — Études complémentaires (économie de l'ingénieur + santé/sécurité/environnement)",
      "Bloc 2 — Mathématiques (algèbre linéaire, EDO, méthodes numériques) : compte double avec le ML",
      "Bloc 3 — Signaux + traitement numérique du signal : compte double avec le ML",
      "Bloc 4 — Électrique pur (machines, réseaux, électromagnétisme)",
    ],
    milestones: [
      { month: "2027", label: "Bloc 1 — les 2 examens les plus légers, pour lancer la dynamique", status: "todo" },
      { month: "2028", label: "Blocs 2 et 3 — ceux qui nourrissent aussi le ML", status: "todo" },
      { month: "2029", label: "Bloc 4 — le solde électrique", status: "todo" },
    ],
  },
  {
    id: "ing-phase3",
    period: "2029 — 2030",
    title: "P.Eng + créneau énergie × IA",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10 border-violet-500/30",
    textColor: "text-violet-400",
    icon: "🔑",
    objective:
      "Obtenir le P.Eng et basculer sur le seul créneau où tes deux diplômes se multiplient au lieu de s'additionner : l'énergie pour l'IA.",
    livrables: [
      "P.Eng délivré par EGBC",
      "Postes visés : centres de données, optimisation de réseau, maintenance prédictive MT",
      "Portfolio ML appliqué à des données électriques réelles",
    ],
    milestones: [
      { month: "2029", label: "4 ans d'expérience validés + rapport de compétences soumis", status: "todo" },
      { month: "2030", label: "P.Eng obtenu", status: "todo" },
    ],
    salaryTarget: "110 000 – 140 000 CAD",
  },
  {
    id: "ing-phase4",
    period: "2030 — 2031",
    title: "Consultant & Xodyia",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10 border-rose-500/30",
    textColor: "text-rose-400",
    icon: "🏢",
    objective:
      "Le permis devient la licence commerciale de Xodyia : sans lui, la branche électricité est juridiquement impossible ; avec lui, elle finance la branche IA.",
    livrables: [
      "Permit to Practice obtenu pour Xodyia (obligatoire pour vendre de l'ingénierie)",
      "Missions de consultation électrique facturées",
      "Produits IA pour les entreprises d'installation électrique et de construction",
    ],
    milestones: [
      { month: "2030", label: "Permit to Practice déposé au nom de Xodyia", status: "todo" },
      { month: "2031", label: "Premier mandat de consultation facturé", status: "todo" },
    ],
  },
];

// ── Postes accessibles DÈS MAINTENANT en C.-B., sans permis ─────────────────
export const BC_JOB_TARGETS = [
  {
    id: "sans-permis",
    label: "Sans aucun permis — candidature possible aujourd'hui",
    tone: "emerald",
    titles: [
      "Electrical Designer",
      "Electrical Project Coordinator",
      "Project Manager — Electrical",
      "Electrical Estimator",
      "Commissioning Specialist / Technologist",
      "Power Systems Studies Analyst",
      "Data Centre Facilities Coordinator",
      "Construction Project Manager (ICI)",
    ],
    note: "Ces intitulés ne contiennent pas le mot « Engineer » : ils échappent à la protection du titre et te sont ouverts immédiatement avec tes 7 ans en BT/MT et en gestion de projet.",
  },
  {
    id: "avec-eit",
    label: "Après inscription comme EIT chez EGBC",
    tone: "amber",
    titles: [
      "Engineer-in-Training — Electrical",
      "Junior Power Systems Engineer",
      "Electrical EIT — Buildings / Industrial",
    ],
    note: "L'inscription EIT se demande en parallèle du dossier d'évaluation : elle débloque les intitulés contenant « Engineer » et rend le CV lisible pour les bureaux d'études.",
  },
  {
    id: "employeurs",
    label: "Employeurs à cibler en C.-B.",
    tone: "sky",
    titles: [
      "BC Hydro", "FortisBC",
      "Stantec", "AECOM", "WSP", "Associated Engineering",
      "Houle Electric", "Western Pacific Enterprises", "Ledcor",
      "Cologix / eStruxture (centres de données)",
    ],
    note: "Les bureaux d'études recrutent des designers non licenciés en permanence ; les utilities et les centres de données sont la porte vers le créneau énergie × IA.",
  },
  {
    id: "mots-cles",
    label: "Mots-clés pour la recherche automatisée",
    tone: "violet",
    titles: [
      "electrical designer Vancouver",
      "electrical project coordinator British Columbia",
      "medium voltage BC",
      "substation design BC",
      "power systems analyst Vancouver",
      "electrical commissioning Victoria",
      "data centre electrical BC",
    ],
    note: "À ajouter à la tâche automatisée, en plus des provinces déjà suivies. Filtre géographique : Vancouver, Burnaby, Surrey, Victoria, Kelowna.",
  },
];

export const BC_JOB_WARNING =
  "Tant que tu n'es pas inscrit chez EGBC, n'utilise pas « Engineer » dans ton titre sur LinkedIn ni dans tes candidatures en C.-B. : le titre est protégé. Écris « Electrical Designer », « Project Manager — Electrical » ou « Diplôme d'Ingénieur (Togo), évaluation EGBC en cours ». Le poste et le salaire sont les mêmes ; seul le mot change.";
