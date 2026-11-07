Le papier "Attention Is All You Need" (2017) a tout changé.

**Self-attention** : chaque token "regarde" tous les autres tokens et pondère leur importance pour construire sa représentation contextuelle :
```
Attention(Q, K, V) = softmax(QKᵀ/√d) V
```
Dans "la souris mange le fromage car elle a faim", l'attention permet à "elle" de pointer vers "souris".

**Avantages sur les RNN** :
- Traitement **parallèle** de toute la séquence (entraînement massivement accéléré sur GPU)
- Dépendances longues capturées directement, sans dégradation

**Architecture Transformer** : empilement de blocs [Multi-Head Attention → Add & Norm → Feed-Forward → Add & Norm], avec des *positional encodings* pour préserver l'ordre des mots.

**Familles** : BERT (encodeur, compréhension), GPT (décodeur, génération), T5 (encodeur-décodeur). Les LLM actuels (GPT, Claude, Llama) sont des décodeurs géants entraînés à prédire le token suivant.
