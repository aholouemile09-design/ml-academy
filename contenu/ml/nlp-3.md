**Pipeline de création d'un LLM** :
1. **Pré-entraînement** : prédire le token suivant sur des trillions de tokens. Le modèle absorbe grammaire, faits, raisonnement.
2. **Fine-tuning supervisé (SFT)** : on l'affine sur des dialogues de qualité pour le rendre conversationnel.
3. **RLHF / alignement** : optimiser selon des préférences humaines pour le rendre utile et sûr.

**Adapter un LLM à votre cas** (du moins cher au plus cher) :
- **Prompt engineering** : instructions claires, exemples (few-shot), raisonnement pas à pas
- **RAG** (Retrieval-Augmented Generation) : récupérer des documents pertinents (recherche vectorielle) et les injecter dans le prompt — la méthode standard pour donner vos données à un LLM
- **Fine-tuning** (LoRA : on n'entraîne que de petites matrices adaptatrices) : pour un style ou format spécifique
- **Pré-entraînement** : réservé aux géants du secteur

**RAG en pratique** : découper les documents en chunks → calculer les embeddings → stocker dans une base vectorielle (FAISS, Chroma) → à chaque question, retrouver les k chunks les plus proches → les fournir au LLM dans le prompt.
