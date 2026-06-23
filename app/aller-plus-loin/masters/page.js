"use client";

import { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES — 3 spécialisations Master
// ─────────────────────────────────────────────────────────────────────────────

const SPECIALIZATIONS = [
  // ══════════════════════════════════════════════════════════════════════════
  // 1. CLOUD
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "cloud",
    icon: "☁️",
    title: "Cloud Computing & Architecture",
    subtitle: "Master en Cloud, Systèmes Distribués ou Cloud Engineering",
    color: "from-sky-500 to-blue-600",
    border: "border-sky-500/30",
    bg: "bg-sky-500/5",
    textColor: "text-sky-400",
    tagline: "Le spécialiste qui fait tourner les infrastructures de demain.",
    description: "Le Cloud est devenu l'épine dorsale de toute organisation tech. Un Master en Cloud t'ouvre les portes des postes de Cloud Architect, DevOps Senior ou Site Reliability Engineer — avec des salaires parmi les plus élevés du secteur tech au Canada.",

    prerequisites: [
      "Maîtrise de Linux & Shell (module Setup Pro CodeGraft Academy)",
      "Docker & Kubernetes (module MLOps)",
      "Notions de réseau (TCP/IP, DNS, load balancers)",
      "AWS Cloud Practitioner ou Azure Fundamentals obtenu",
      "Un projet déployé en production sur AWS/GCP/Azure",
      "Python ou Go pour l'automatisation d'infrastructure",
    ],

    roadmapAfterMLAcademy: [
      { step: "1", label: "Compléter le module Cloud/AWS de CodeGraft Academy", duration: "4 sem.", detail: "Fondations AWS, IAM, EC2, S3, Lambda, RDS" },
      { step: "2", label: "AWS Solutions Architect Associate", duration: "2-3 mois", detail: "Certification reconnue mondialement — score minimum 720/1000" },
      { step: "3", label: "Kubernetes & Terraform", duration: "2 mois", detail: "Orchestration de conteneurs + IaC. Cours: KodeKloud ou A Cloud Guru" },
      { step: "4", label: "Projet capstone cloud", duration: "1 mois", detail: "Architecture complète (multi-tier app, CI/CD, monitoring, coûts optimisés)" },
      { step: "5", label: "Préparer le dossier Master", duration: "3-6 mois", detail: "Lettre de motivation, portfolio GitHub solide, lettre de recommandation, GRE si requis" },
    ],

    universities: [
      {
        country: "🇨🇦 Canada",
        schools: [
          {
            name: "University of Waterloo",
            program: "MEng Electrical & Computer Engineering (Cloud Systems)",
            location: "Waterloo, Ontario",
            duration: "1-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~35 000-45 000 CAD total",
            ranking: "Top 5 Canada, top 200 mondial",
            url: "https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/future-students/programs/electrical-computer-engineering-meng",
            conditions: {
              gpa: "75% minimum (B+) en licence",
              english: "IELTS 7.0 / TOEFL 90+",
              portfolio: "Portfolio GitHub fortement recommandé",
              letters: "2-3 lettres de recommandation académiques ou professionnelles",
              other: "GRE non obligatoire",
            },
            strengths: ["Co-op intégré possible", "Partenariats Google, Amazon, Microsoft", "Meilleur écosystème startup Canada"],
            scholarships: ["Entrance Scholarship", "Ontario Graduate Scholarship (OGS)", "Financement co-op pendant le programme"],
          },
          {
            name: "University of British Columbia (UBC)",
            program: "MEng Computer Science — Cloud & Distributed Systems",
            location: "Vancouver, Colombie-Britannique",
            duration: "1 an intensif",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~30 000-40 000 CAD total",
            ranking: "Top 3 Canada, top 50 mondial",
            url: "https://www.cs.ubc.ca/students/grad/prospective/grad-programs/cs-meng",
            conditions: {
              gpa: "76% (B+) en licence",
              english: "IELTS 6.5+ / TOEFL 90+",
              portfolio: "Projet GitHub avec déploiement cloud requis",
              letters: "2 lettres de recommandation",
              other: "Statement of Purpose détaillé",
            },
            strengths: ["Vancouver — hub tech (Amazon, Microsoft, Apple offices)", "Recherche forte en systèmes distribués", "Multi-cultural, francophone bienvenu"],
            scholarships: ["UBC Graduate Award", "NSERC (recherche)", "Bourses provinciales BC"],
          },
          {
            name: "Concordia University",
            program: "MEng Computer Science — Cloud & Network",
            location: "Montréal, Québec",
            duration: "1.5-2 ans",
            language: "Anglais (cours) / Montréal bilingue",
            format: "Présentiel ou hybride",
            tuition: "~22 000-28 000 CAD total (moins cher que Toronto/UBC)",
            ranking: "Top 10 Canada Engineering",
            url: "https://www.concordia.ca/ginacody/computer-science-software-eng/programs/graduate.html",
            conditions: {
              gpa: "70% en licence (plus accessible)",
              english: "IELTS 6.5 / TOEFL 86+",
              portfolio: "Recommandé mais non obligatoire",
              letters: "2 lettres de recommandation",
              other: "Option cours-seulement (sans thèse) disponible",
            },
            strengths: ["Montréal = 2e plus grand hub IA mondial", "Coût de vie moins élevé", "Francophone friendly", "Accès à l'écosystème Mila/Element AI"],
            scholarships: ["Merit Scholarship", "Aide financière provincial Québec (AFE)", "Bourse Desjardins"],
          },
          {
            name: "Carleton University",
            program: "MEng Systems & Computer Engineering — Cloud Infrastructure",
            location: "Ottawa, Ontario",
            duration: "1.5-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~25 000-32 000 CAD total",
            ranking: "Solide en engineering, proche du gouvernement fédéral",
            url: "https://graduate.carleton.ca/programs/systems-computer-engineering-master/",
            conditions: {
              gpa: "70% en licence",
              english: "IELTS 6.5 / TOEFL 86+",
              portfolio: "Optionnel",
              letters: "2 lettres de recommandation",
              other: "Partenariats gouvernement fédéral — opportunités uniques",
            },
            strengths: ["Ottawa = capitale fédérale, emplois tech gouvernement", "Coûts raisonnables", "Spécialisation sécurité cloud disponible"],
            scholarships: ["Carleton Graduate Scholarship", "OGS Ontario"],
          },
        ],
      },
      {
        country: "🌍 International (options)",
        schools: [
          {
            name: "Georgia Tech (USA — en ligne)",
            program: "MSCS — Computing Systems (Cloud Track)",
            location: "En ligne depuis le Canada",
            duration: "2-3 ans (à temps partiel)",
            language: "Anglais",
            format: "100% en ligne",
            tuition: "~10 000-12 000 USD total (exceptionnel pour un Master US)",
            ranking: "Top 10 CS mondial",
            url: "https://omscs.gatech.edu/",
            conditions: {
              gpa: "3.0/4.0 GPA",
              english: "Pas de TOEFL requis si diplôme en anglais",
              portfolio: "GitHub recommandé",
              letters: "3 lettres de recommandation",
              other: "GRE non requis depuis 2020",
            },
            strengths: ["Meilleur rapport qualité/prix Master tech mondial", "Faisable en travaillant à temps plein", "Diplôme identique au présentiel"],
            scholarships: ["Non disponible pour étudiants internationaux en ligne"],
          },
          {
            name: "ETH Zurich (Suisse)",
            program: "MSc Computer Science — Distributed Systems",
            location: "Zurich, Suisse",
            duration: "1.5-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~1 500 CHF/an (quasi gratuit !)",
            ranking: "#1 Europe, top 10 mondial",
            url: "https://www.inf.ethz.ch/studies/master.html",
            conditions: {
              gpa: "Excellent (top 10-15% de ta promotion)",
              english: "IELTS 7.0 / TOEFL 100+",
              portfolio: "Publications ou projets exceptionnels",
              letters: "2-3 lettres académiques",
              other: "Très sélectif — taux d'admission ~15%",
            },
            strengths: ["Presque gratuit", "Recherche world-class", "Réseau alumni exceptionnel"],
            scholarships: ["Excellence Scholarship ETH Foundation"],
          },
        ],
      },
    ],

    salaryTarget: "100 000 – 150 000+ CAD",
    roles: ["Cloud Architect", "Site Reliability Engineer (SRE)", "DevOps Senior", "Platform Engineer", "Cloud Security Architect"],
    certifications: [
      { name: "AWS Solutions Architect Professional", priority: "Essentielle" },
      { name: "Google Cloud Professional Cloud Architect", priority: "Très valorisée" },
      { name: "Azure Solutions Architect Expert", priority: "Pour environnements Microsoft" },
      { name: "Certified Kubernetes Administrator (CKA)", priority: "Indispensable" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. ROBOTIQUE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "robotique",
    icon: "🤖",
    title: "Robotique & Systèmes Autonomes",
    subtitle: "Master en Robotics, Autonomous Systems ou Mechatronics",
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    textColor: "text-emerald-400",
    tagline: "Construire les robots et systèmes autonomes qui vont transformer le monde réel.",
    description: "La robotique est l'intersection de l'IA, du contrôle, de la mécanique et de l'électronique. Le Canada investit massivement dans ce domaine (véhicules autonomes, drones industriels, chirurgie robotique). Un Master en robotique te positionne pour des carrières de pointe à salaires très élevés.",

    prerequisites: [
      "Deep Learning et Computer Vision (modules CodeGraft Academy)",
      "Python solide — NumPy, OpenCV",
      "Notions de physique / mécanique (cinématique)",
      "Bases Linux et systèmes embarqués",
      "Idéalement : projet avec capteurs (Raspberry Pi, Arduino, ou simulation ROS)",
      "Mathématiques : algèbre linéaire, calcul différentiel, probabilités",
    ],

    roadmapAfterMLAcademy: [
      { step: "1", label: "Maîtriser Computer Vision avancée", duration: "2-3 mois", detail: "OpenCV, détection d'objets YOLO, segmentation sémantique, depth estimation" },
      { step: "2", label: "Apprendre ROS2 (Robot Operating System)", duration: "2-3 mois", detail: "Publishers/Subscribers, navigation stack, Gazebo simulation. Tutoriels officiels ros2.org" },
      { step: "3", label: "Reinforcement Learning basique", duration: "1-2 mois", detail: "CartPole, OpenAI Gym, DQN — les fondements des agents autonomes" },
      { step: "4", label: "Projet robotique concret", duration: "2-3 mois", detail: "Simulation Gazebo d'un robot mobile, ou vrai robot (TurtleBot), ou drone autonome simulé" },
      { step: "5", label: "Maths avancées", duration: "Parallèle", detail: "Cinématique, matrices de rotation, quaternions — ressource : Modern Robotics (Northwestern, Coursera)" },
      { step: "6", label: "Préparer le dossier", duration: "3-6 mois", detail: "Vidéo démo du robot, publications si possible, contact avec des professeurs avant l'application" },
    ],

    universities: [
      {
        country: "🇨🇦 Canada",
        schools: [
          {
            name: "University of Toronto",
            program: "MSc / MEng — Robotics & Computer Vision",
            location: "Toronto, Ontario",
            duration: "1-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~35 000-50 000 CAD total",
            ranking: "#1 Canada, top 25 mondial",
            url: "https://www.engineering.utoronto.ca/graduate-programs/",
            conditions: {
              gpa: "78%+ (A-) en licence",
              english: "IELTS 6.5 / TOEFL 93+",
              portfolio: "Projet robotique ou CV démontré fortement recommandé",
              letters: "3 lettres de recommandation",
              other: "Contact avec un superviseur avant l'application (quasi obligatoire pour MSc)",
            },
            strengths: ["Centre UTIAS (Institute for Aerospace Studies) — recherche robotique d'élite", "Proximity avec Autonomy Lab, Vector Institute AI", "Toronto = 2e plus grand hub tech Amérique du Nord"],
            scholarships: ["NSERC (recherche)", "Ontario Graduate Scholarship", "Fellowships internes UofT"],
          },
          {
            name: "McGill University",
            program: "MSc Electrical & Computer Engineering — Robotics",
            location: "Montréal, Québec",
            duration: "1.5-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~28 000-38 000 CAD total",
            ranking: "Top 5 Canada, top 100 mondial",
            url: "https://www.mcgill.ca/ece/",
            conditions: {
              gpa: "75%+ en licence",
              english: "IELTS 6.5 / TOEFL 86+",
              portfolio: "Projet ROS ou simulation robotique",
              letters: "2-3 lettres de recommandation",
              other: "Contact superviseur recommandé pour financement",
            },
            strengths: ["Groupe de recherche MRASL (robotique aérienne)", "Lien avec Mila pour IA + robotique", "Montréal = ville la plus abordable parmi les grands hubs tech"],
            scholarships: ["FRQNT (Fonds Québec Science et Nature)", "NSERC", "McGill Graduate Excellence Fellowship"],
          },
          {
            name: "Université de Montréal / Polytechnique",
            program: "MSc Génie Informatique — Systèmes Intelligents",
            location: "Montréal, Québec",
            duration: "2 ans",
            language: "Français (principal)",
            format: "Présentiel",
            tuition: "~12 000-18 000 CAD total (tarif Québec) / ~25 000 international",
            ranking: "Top 150 mondial",
            url: "https://www.polymtl.ca/futur-etudiant/master",
            conditions: {
              gpa: "70%+ en licence",
              english: "Non requis si dossier en français",
              portfolio: "Portfolio technique recommandé",
              letters: "2 lettres de recommandation",
              other: "Option unique si tu parles français — frais drastiquement réduits",
            },
            strengths: ["Accès direct à Mila (plus grand labo IA monde francophone)", "Lien avec ETS Montréal robotique", "Frais très réduits si francophone"],
            scholarships: ["FRQNT", "Bourse d'excellence Polytechnique", "Bourses gouvernement Québec"],
          },
          {
            name: "University of Waterloo",
            program: "MEng Systems Design Engineering — Mechatronics & Robotics",
            location: "Waterloo, Ontario",
            duration: "1-1.5 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~30 000-40 000 CAD total",
            ranking: "Top 5 Canada Engineering",
            url: "https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/future-students/programs/systems-design-engineering-meng",
            conditions: {
              gpa: "75%+ en licence",
              english: "IELTS 6.5 / TOEFL 90+",
              portfolio: "Projet robotique ou mécatronique fortement recommandé",
              letters: "2-3 lettres",
              other: "Option MEng sans thèse = plus rapide",
            },
            strengths: ["Programme mécatronique reconnu #1 Canada", "Industrie automobile/drones voisins (Toyota, Waymo Canada)", "Co-op unique"],
            scholarships: ["OGS", "NSERC", "Bourses Waterloo Engineering"],
          },
        ],
      },
      {
        country: "🌍 International (options)",
        schools: [
          {
            name: "Carnegie Mellon University (USA)",
            program: "MSc Robotics",
            location: "Pittsburgh, PA",
            duration: "1.5-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~55 000-70 000 USD total",
            ranking: "#1 Robotique mondial",
            url: "https://www.ri.cmu.edu/education/academic-programs/master-of-science-robotics/",
            conditions: {
              gpa: "3.5/4.0 GPA",
              english: "TOEFL 100+",
              portfolio: "Publications ou projets robotiques exceptionnels",
              letters: "3 lettres académiques",
              other: "Très sélectif et cher — viser si excellence confirmée",
            },
            strengths: ["Robotics Institute — #1 mondial absolu", "Alumni: Waymo, Boston Dynamics, NASA"],
            scholarships: ["RA/TA (Research/Teaching Assistant) = frais couverts si thèse"],
          },
          {
            name: "TU Munich (Allemagne)",
            program: "MSc Robotics, Cognition, Intelligence",
            location: "Munich, Allemagne",
            duration: "2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~Gratuit (frais de vie ~1 000 €/mois)",
            ranking: "Top 50 mondial Engineering",
            url: "https://www.tum.de/en/studies/degree-programs/detail/robotics-cognition-intelligence-master-of-science-msc",
            conditions: {
              gpa: "Excellent (75%+ équivalent)",
              english: "IELTS 6.5 / TOEFL 88+",
              portfolio: "Projets robotiques ou IA requis",
              letters: "2 lettres",
              other: "Programme entièrement en anglais, frais quasi nuls",
            },
            strengths: ["Gratuit — exceptionnel", "BMW, Siemens, MAN juste à côté", "Recherche CV et robotique world-class"],
            scholarships: ["DAAD (aide voyage allemand)", "Deutschlandstipendium"],
          },
        ],
      },
    ],

    salaryTarget: "95 000 – 145 000+ CAD",
    roles: ["Robotics Software Engineer", "Autonomous Systems Engineer", "Computer Vision Engineer", "ROS Developer", "Drone Software Engineer"],
    certifications: [
      { name: "ROS2 Certifié (Robot Operating System)", priority: "Très valorisée" },
      { name: "NVIDIA Deep Learning Institute — Jetson / Robotics", priority: "Pratique" },
      { name: "AWS Robomaker Certification", priority: "Cloud + Robotique" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. PIPELINES / DATA ENGINEERING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pipelines",
    icon: "🔁",
    title: "Data Engineering & Pipelines ML",
    subtitle: "Master en Data Engineering, Big Data ou MLOps",
    color: "from-violet-500 to-purple-600",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    textColor: "text-violet-400",
    tagline: "Les ingénieurs qui font tourner les données à l'échelle de millions d'enregistrements par seconde.",
    description: "Le Data Engineer est l'un des rôles les plus demandés et les mieux payés du secteur tech. Il conçoit et maintient les pipelines qui alimentent les modèles ML, les dashboards et les décisions business. Un Master en Data Engineering te positionne pour des postes d'architecte données ou de Lead Data Engineer en 3-5 ans.",

    prerequisites: [
      "SQL avancé (module SQL de CodeGraft Academy + fenêtres, CTEs, optimisation)",
      "Python solid — pandas, PySpark basique",
      "Docker & CI/CD (module MLOps CodeGraft Academy)",
      "Notions de bases de données (relationnelles + NoSQL)",
      "Un pipeline ETL fonctionnel sur projet portfolio",
      "Algèbre relationnelle et modélisation de données",
    ],

    roadmapAfterMLAcademy: [
      { step: "1", label: "Maîtriser Apache Spark & PySpark", duration: "2-3 mois", detail: "Traitement distribué de données massives. Cours: Databricks Learning Center (gratuit)" },
      { step: "2", label: "Orchestration avec Apache Airflow", duration: "1-2 mois", detail: "Planification et monitoring de pipelines DAG. Cours: Astronomer Academy" },
      { step: "3", label: "Kafka pour le streaming temps réel", duration: "1-2 mois", detail: "Event streaming, microservices, pipelines temps réel. Confluent training (gratuit)" },
      { step: "4", label: "Data Warehouse moderne", duration: "1-2 mois", detail: "Snowflake, BigQuery ou Redshift + dbt pour la transformation. Snowflake University (gratuit)" },
      { step: "5", label: "Projet capstone pipeline complet", duration: "2 mois", detail: "Ingestion → transformation → stockage → exposition API : pipeline end-to-end sur dataset réel" },
      { step: "6", label: "Certification et dossier", duration: "3-6 mois", detail: "Databricks Associate + dossier Master avec démos GitHub" },
    ],

    universities: [
      {
        country: "🇨🇦 Canada",
        schools: [
          {
            name: "University of British Columbia (UBC)",
            program: "Master of Data Science (MDS)",
            location: "Vancouver, Colombie-Britannique",
            duration: "10 mois intensifs",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~41 700 CAD total",
            ranking: "Top 3 Canada, top 50 mondial",
            url: "https://masterdatascience.ubc.ca/",
            conditions: {
              gpa: "76%+ en licence (B+)",
              english: "IELTS 6.5 / TOEFL 90+",
              portfolio: "Projet data / pipeline GitHub très valorisé",
              letters: "2 lettres de recommandation",
              other: "10 mois — très dense et pratique, orienté industrie",
            },
            strengths: ["Programme orienté industrie #1 Canada", "Capstone project avec une vraie entreprise", "Réseau alumni très actif Vancouver", "Amazon, Microsoft, Hootsuite recrutent directement"],
            scholarships: ["Bourses d'excellence UBC MDS", "NSERC si passage en recherche", "BC Graduate Scholarship"],
          },
          {
            name: "University of Toronto",
            program: "MEng Data Science / Applied Computing",
            location: "Toronto, Ontario",
            duration: "1 an",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~38 000-48 000 CAD total",
            ranking: "#1 Canada",
            url: "https://www.sgs.utoronto.ca/programs/applied-computing/",
            conditions: {
              gpa: "78%+ en licence",
              english: "IELTS 6.5 / TOEFL 93+",
              portfolio: "Portfolio technique requis",
              letters: "3 lettres de recommandation",
              other: "Programme très compétitif — mets en avant tes projets pipelines",
            },
            strengths: ["Prestige #1 Canada", "Vector Institute (IA) à côté", "Réseau RBC, TD, Shopify, etc."],
            scholarships: ["OGS Ontario", "UofT Fellowship", "NSERC"],
          },
          {
            name: "McGill University",
            program: "MSc Computer Science — Data Systems & Engineering",
            location: "Montréal, Québec",
            duration: "1.5-2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~28 000-38 000 CAD total",
            ranking: "Top 5 Canada, top 100 mondial",
            url: "https://www.cs.mcgill.ca/academic/graduate/",
            conditions: {
              gpa: "75%+ en licence",
              english: "IELTS 6.5 / TOEFL 86+",
              portfolio: "Projets data pipeline ou systèmes distribués",
              letters: "2-3 lettres",
              other: "Option MSc recherche ou MEng professionnel disponible",
            },
            strengths: ["Groupe de recherche en systèmes de base de données reconnu", "Accès à Mila", "Montréal moins cher que Toronto/Vancouver"],
            scholarships: ["FRQNT", "NSERC", "McGill Graduate Excellence Fellowship"],
          },
          {
            name: "Simon Fraser University (SFU)",
            program: "MSc Computing Science — Big Data & Cloud Systems",
            location: "Burnaby / Vancouver, BC",
            duration: "2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~25 000-35 000 CAD total",
            ranking: "Top 10 Canada",
            url: "https://www.sfu.ca/computing/current-students/graduate-students/academic-programs.html",
            conditions: {
              gpa: "75%+ en licence",
              english: "IELTS 6.5 / TOEFL 93+",
              portfolio: "Portfolio recommandé",
              letters: "2-3 lettres",
              other: "Moins compétitif que UBC — bon point d'entrée",
            },
            strengths: ["SFU Surrey campus = hub tech croissant", "Tarifs plus accessibles que UBC", "Programmes flexibles avec options Big Data"],
            scholarships: ["SFU Graduate Fellowship", "NSERC", "BC Graduate Scholarship"],
          },
        ],
      },
      {
        country: "🌍 International (options)",
        schools: [
          {
            name: "Georgia Tech OMSA (USA — en ligne)",
            program: "MS Analytics",
            location: "En ligne depuis le Canada",
            duration: "2-3 ans (temps partiel)",
            language: "Anglais",
            format: "100% en ligne",
            tuition: "~10 000-11 000 USD total",
            ranking: "Top 10 Analytics mondial",
            url: "https://pe.gatech.edu/degrees/analytics",
            conditions: {
              gpa: "3.0/4.0",
              english: "Pas de TOEFL si diplôme anglais",
              portfolio: "SQL + Python + statistiques démontrable",
              letters: "3 lettres",
              other: "Idéal pour les gens qui travaillent — très flexible",
            },
            strengths: ["Meilleur rapport qualité/prix monde pour Analytics", "Faisable en travaillant à temps plein", "Diplôme identique au présentiel"],
            scholarships: ["Non disponible international en ligne"],
          },
          {
            name: "Delft University of Technology (Pays-Bas)",
            program: "MSc Computer Science — Data Engineering",
            location: "Delft, Pays-Bas",
            duration: "2 ans",
            language: "Anglais",
            format: "Présentiel",
            tuition: "~17 000 EUR total (EU) / ~21 000 EUR international",
            ranking: "Top 60 mondial Engineering",
            url: "https://www.tudelft.nl/onderwijs/opleidingen/masters/cs/msc-computer-science",
            conditions: {
              gpa: "Bon dossier — pas de GPA minimum strict",
              english: "IELTS 6.5 / TOEFL 90+",
              portfolio: "Projets data engineering requis",
              letters: "2 lettres",
              other: "Europe + moins cher que Canada — bonne alternative",
            },
            strengths: ["Shell, ASML, Booking.com recrutent directement", "Moins cher qu'en Amérique du Nord", "Visa post-diplôme EU facilité"],
            scholarships: ["Holland Scholarship (~5 000 EUR)", "Erasmus+"],
          },
        ],
      },
    ],

    salaryTarget: "95 000 – 145 000+ CAD",
    roles: ["Data Engineer", "MLOps Engineer", "Analytics Engineer", "Data Architect", "Platform Data Lead"],
    certifications: [
      { name: "Databricks Certified Associate Developer (PySpark)", priority: "Indispensable" },
      { name: "Google Professional Data Engineer", priority: "Très valorisée" },
      { name: "AWS Certified Data Analytics — Specialty", priority: "Pour environnements AWS" },
      { name: "dbt Certified Developer", priority: "Montée en puissance rapide" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Composants UI
// ─────────────────────────────────────────────────────────────────────────────
function ConditionRow({ label, value }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-slate-500 w-28 shrink-0">{label}</span>
      <span className="text-slate-300">{value}</span>
    </div>
  );
}

function UniversityCard({ school }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-900 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left p-5 hover:bg-ink-800 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-bold text-white">{school.name}</h4>
            <p className="text-sm text-slate-400 mt-0.5">{school.program}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
              <span>📍 {school.location}</span>
              <span>⏱ {school.duration}</span>
              <span>💰 {school.tuition}</span>
              <span>🗣 {school.language}</span>
            </div>
          </div>
          <span className="text-slate-500 shrink-0">{open ? "▲" : "▼"}</span>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">Classement : {school.ranking}</p>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-ink-700 pt-4 space-y-4">
          {/* Conditions d'admission */}
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold mb-2">📋 Conditions d'admission</p>
            <div className="space-y-1.5 bg-ink-950 rounded-xl p-4">
              <ConditionRow label="GPA requis" value={school.conditions.gpa} />
              <ConditionRow label="Langue" value={school.conditions.english} />
              <ConditionRow label="Portfolio" value={school.conditions.portfolio} />
              <ConditionRow label="Lettres" value={school.conditions.letters} />
              {school.conditions.other && <ConditionRow label="Autre" value={school.conditions.other} />}
            </div>
          </div>

          {/* Points forts */}
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold mb-2">⭐ Points forts</p>
            <ul className="space-y-1">
              {school.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-emerald-400 shrink-0">✓</span>{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Bourses */}
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold mb-2">🎓 Bourses & financement</p>
            <ul className="space-y-1">
              {school.scholarships.map((s, i) => (
                <li key={i} className="text-sm text-slate-400 flex gap-2">
                  <span className="text-amber-400 shrink-0">💰</span>{s}
                </li>
              ))}
            </ul>
          </div>

          <a href={school.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent-light text-sm font-semibold hover:bg-accent/20 transition-colors">
            Voir le programme officiel ↗
          </a>
        </div>
      )}
    </div>
  );
}

function SpecializationTab({ spec }) {
  const [section, setSection] = useState("chemin");
  const SECTIONS = [
    { id: "chemin",  label: "Chemin" },
    { id: "univs",   label: "Universités" },
    { id: "certs",   label: "Certifications" },
  ];

  return (
    <div>
      {/* Description */}
      <div className={`rounded-2xl border ${spec.border} ${spec.bg} p-6 mb-6`}>
        <p className="text-lg font-bold text-white mb-2">{spec.tagline}</p>
        <p className="text-slate-300 text-sm leading-relaxed">{spec.description}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <span className="text-slate-400">💰 Cible salariale post-Master : <strong className="text-white">{spec.salaryTarget}</strong></span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {spec.roles.map(r => (
            <span key={r} className="text-xs px-2 py-1 rounded-lg bg-black/20 text-slate-300">{r}</span>
          ))}
        </div>
      </div>

      {/* Prérequis */}
      <div className="card p-5 mb-6">
        <p className="text-xs text-slate-500 uppercase font-semibold mb-3">✅ Prérequis avant de postuler</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {spec.prerequisites.map((p, i) => (
            <div key={i} className="flex gap-2 text-sm text-slate-300">
              <span className={`${spec.textColor} shrink-0`}>→</span>{p}
            </div>
          ))}
        </div>
      </div>

      {/* Sous-tabs */}
      <div className="flex gap-1 mb-6">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              section === s.id ? "bg-accent/20 border border-accent/40 text-white" : "text-slate-400 hover:text-white border border-transparent"
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Chemin recommandé */}
      {section === "chemin" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400 mb-4">
            Itinéraire recommandé après avoir terminé le parcours CodeGraft Academy, avant de postuler au Master.
          </p>
          {spec.roadmapAfterMLAcademy.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 ${spec.border} flex items-center justify-center text-xs font-bold ${spec.textColor} shrink-0`}>
                  {step.step}
                </div>
                {i < spec.roadmapAfterMLAcademy.length - 1 && (
                  <div className="w-0.5 flex-1 bg-ink-700 mt-1" />
                )}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold text-white text-sm">{step.label}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${spec.border} ${spec.bg} ${spec.textColor}`}>
                    {step.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Universités */}
      {section === "univs" && (
        <div className="space-y-6">
          <p className="text-xs text-slate-600 bg-ink-800 border border-ink-700 rounded-xl px-4 py-3">
            ⚠️ Les conditions et frais de scolarité peuvent changer. Vérifie toujours sur le site officiel de l'université avant de postuler.
          </p>
          {spec.universities.map(group => (
            <div key={group.country}>
              <h3 className="font-bold text-white mb-3">{group.country}</h3>
              <div className="space-y-3">
                {group.schools.map(school => (
                  <UniversityCard key={school.name} school={school} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {section === "certs" && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400 mb-4">
            Ces certifications renforcent ton dossier d'admission ET ta valeur sur le marché du travail
            pendant et après le Master.
          </p>
          {spec.certifications.map((c, i) => (
            <div key={i} className="card p-4 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${spec.bg} border-2 ${spec.border}`} />
              <div className="flex-1">
                <p className="font-medium text-white text-sm">{c.name}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${spec.border} ${spec.bg} ${spec.textColor} whitespace-nowrap`}>
                {c.priority}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page principale
// ─────────────────────────────────────────────────────────────────────────────
export default function MastersPage() {
  const [activeSpec, setActiveSpec] = useState(0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/aller-plus-loin" className="text-sm text-slate-400 hover:text-white mb-4 inline-block">← Aller plus loin</Link>
        <span className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-4">
          🎓 Après le parcours CodeGraft Academy — Phase 2+
        </span>
        <h1 className="text-3xl font-bold text-white mb-3">Se spécialiser — Master</h1>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          Une fois les fondations ML/Web maîtrisées, voici 3 voies de spécialisation vers un Master.
          Chaque spécialité inclut le chemin complet, les universités recommandées au Canada (et quelques
          options internationales), les conditions d'admission et les bourses disponibles.
        </p>
      </div>

      {/* Sélecteur de spécialisation */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {SPECIALIZATIONS.map((spec, i) => (
          <button key={spec.id} onClick={() => setActiveSpec(i)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeSpec === i
                ? `${spec.border} ${spec.bg}`
                : "border-ink-700 hover:border-ink-600 bg-ink-900"
            }`}>
            <div className="text-3xl mb-2">{spec.icon}</div>
            <p className={`font-bold text-sm ${activeSpec === i ? "text-white" : "text-slate-300"}`}>{spec.title}</p>
            <p className="text-xs text-slate-500 mt-1">{spec.salaryTarget}</p>
          </button>
        ))}
      </div>

      {/* Contenu de la spécialisation active */}
      <SpecializationTab spec={SPECIALIZATIONS[activeSpec]} />

      {/* Note finale */}
      <div className="mt-10 card p-6 border-amber-500/20 bg-amber-500/5 text-center">
        <p className="text-amber-400 font-semibold mb-2">💡 Conseil du parcours</p>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          Ne postule pas au Master avant d'avoir au moins 2-3 projets solides sur GitHub dans la spécialité choisie.
          Un dossier avec des projets concrets démontrables pèse souvent plus qu'une note parfaite.
          Discute avec le tuteur AI pour valider ton niveau avant de postuler.
        </p>
        <div className="flex gap-3 justify-center mt-4 flex-wrap">
          <Link href="/tuteur" className="btn-primary text-sm">🤖 Valider mon niveau avec le tuteur</Link>
          <Link href="/projets" className="btn-secondary text-sm">🛠 Voir les projets portfolio</Link>
        </div>
      </div>
    </div>
  );
}
