// Tuteur simulé : répond sans clé API grâce à une base de connaissances locale.

const KNOWLEDGE = [
  {
    keywords: ["surapprentissage", "overfitting", "surajustement"],
    answer: `Le **surapprentissage** (overfitting), c'est quand ton modèle mémorise les données d'entraînement au lieu d'apprendre des règles générales. Symptôme typique : excellente performance sur le train, mauvaise sur le test.

Remèdes principaux : plus de données, régularisation (L1/L2, dropout), modèle plus simple, early stopping, validation croisée.

👉 Approfondis ce concept dans le module **Machine Learning classique**, leçon "Le paradigme du ML supervisé".`,
  },
  {
    keywords: ["gradient", "descente", "backpropagation", "rétropropagation"],
    answer: `La **descente de gradient** est l'algorithme d'apprentissage central du ML : on calcule le gradient de l'erreur par rapport aux paramètres, puis on fait un pas dans la direction opposée :

θ ← θ - α∇L(θ)

La **rétropropagation** est l'application de la règle de la chaîne pour calculer efficacement ce gradient dans un réseau de neurones, couche par couche, de la sortie vers l'entrée.

👉 Voir le module **Mathématiques pour le ML** puis **Deep Learning**, leçon "Entraînement".`,
  },
  {
    keywords: ["transformer", "attention", "llm", "gpt", "bert", "claude"],
    answer: `Le **Transformer** est l'architecture derrière tous les LLM modernes (GPT, Claude, Llama). Son mécanisme clé est la **self-attention** : chaque token pondère l'importance de tous les autres tokens pour construire sa représentation contextuelle.

Avantages décisifs sur les RNN : traitement parallèle (entraînement rapide sur GPU) et capture directe des dépendances longues.

👉 Le module **NLP et Transformers** y consacre une leçon complète avec la formule d'attention.`,
  },
  {
    keywords: ["rag", "embedding", "vectorielle", "semantique", "sémantique"],
    answer: `Le **RAG** (Retrieval-Augmented Generation) est LA méthode standard pour donner tes propres documents à un LLM :

1. Découper les documents en chunks
2. Calculer un **embedding** (vecteur) par chunk et l'indexer dans une base vectorielle (FAISS, Chroma)
3. À chaque question : retrouver les k chunks les plus similaires (similarité cosinus)
4. Les injecter dans le prompt du LLM

👉 Détails dans **NLP et Transformers**, et mets-le en pratique avec le projet "Chatbot RAG sur vos documents".`,
  },
  {
    keywords: ["cnn", "convolution", "image", "vision"],
    answer: `Un **CNN** (réseau convolutif) est l'architecture de référence pour les images. Au lieu de connecter chaque pixel à chaque neurone (explosion de paramètres), un petit filtre 3×3 glisse sur l'image et détecte des motifs locaux : contours, textures, puis formes et objets dans les couches profondes.

Conseil pratique : pour ton propre projet, pars d'un modèle pré-entraîné (ResNet) et fais du **transfer learning** — d'excellents résultats avec peu de données.

👉 Module **Deep Learning**, leçon "Réseaux convolutifs", puis projet "Reconnaissance d'images".`,
  },
  {
    keywords: ["python", "pandas", "numpy", "commencer", "débuter", "debuter", "commence"],
    answer: `Pour bien démarrer, voici le chemin que je te recommande :

1. **Python pour la Data Science** : bases du langage, NumPy (calcul vectoriel) et Pandas (manipulation de données)
2. **Mathématiques pour le ML** : juste l'essentiel — vecteurs, gradients, probabilités
3. Premier projet : **Analyseur de données Titanic** pour consolider

Compte 2-3 semaines à raison d'1h par jour. Complète chaque leçon puis valide avec le quiz du module — ta progression est sauvegardée automatiquement.`,
  },
  {
    keywords: ["métrique", "metrique", "précision", "precision", "rappel", "f1", "accuracy", "auc"],
    answer: `Le choix de la métrique dépend du coût des erreurs :

- **Précision** = parmi mes prédictions positives, combien sont justes ? (à privilégier si les faux positifs coûtent cher, ex. filtrage spam)
- **Rappel** = parmi les vrais positifs, combien ai-je détectés ? (à privilégier si rater un cas est grave, ex. maladie, fraude)
- **F1** = compromis entre les deux
- **ROC-AUC** = qualité globale du classement, robuste au déséquilibre

⚠️ Méfie-toi de l'accuracy sur des classes déséquilibrées : 99% d'accuracy peut cacher un modèle inutile.

👉 Module **Machine Learning classique**, leçon "Évaluation".`,
  },
  {
    keywords: ["projet", "pratique", "portfolio", "exercice"],
    answer: `Excellente démarche : on apprend le ML en pratiquant ! La page **Projets** propose 8 projets progressifs, du Titanic (débutant) jusqu'à la construction d'un agent AI complet (avancé).

Mon conseil pour ton portfolio :
1. Choisis un projet de TON niveau actuel (ni trop facile, ni écrasant)
2. Va au bout : code propre, README, conclusions
3. Publie-le sur GitHub
4. Passe au niveau supérieur

Un seul projet terminé et bien documenté vaut mieux que cinq notebooks abandonnés.`,
  },
  {
    keywords: ["plan", "parcours", "roadmap", "programme", "étapes", "etapes"],
    answer: `Voici le parcours complet de CodeGraft Academy, conçu comme un cursus scolaire :

1. 🐍 **Python pour la Data Science** (débutant)
2. 📐 **Mathématiques pour le ML** (débutant)
3. 🤖 **Machine Learning classique** (intermédiaire)
4. 🧠 **Deep Learning** (intermédiaire)
5. 💬 **NLP et Transformers** (avancé)
6. 🚀 **MLOps et production** (avancé)

Chaque module = leçons + quiz de validation. Entre les modules, consolide avec les projets pratiques. Ton tableau de bord suit ta progression, ton XP et tes badges.`,
  },
];

const FALLBACK = `Bonne question ! En mode simulé (sans clé API), je réponds surtout sur les grands concepts du parcours : surapprentissage, gradients, CNN, Transformers, RAG, métriques, choix de projets, plan d'apprentissage...

Reformule avec un de ces mots-clés, ou explore directement les modules du parcours.

💡 Pour débloquer le tuteur AI complet (capable de répondre à TOUT, corriger ton code, créer des exercices sur mesure), ajoute une clé API Anthropic dans la page **Paramètres**.`;

export function simulatedReply(message) {
  const lower = message.toLowerCase();
  let best = null;
  let bestCount = 0;
  for (const entry of KNOWLEDGE) {
    const count = entry.keywords.filter((k) => lower.includes(k)).length;
    if (count > bestCount) {
      best = entry;
      bestCount = count;
    }
  }
  return best ? best.answer : FALLBACK;
}
