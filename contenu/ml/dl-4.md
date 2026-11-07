Texte, audio, séries temporelles : l'ordre compte. Un **RNN** traite la séquence pas à pas en maintenant un **état caché** — une mémoire :
```
hₜ = tanh(W·xₜ + U·hₜ₋₁ + b)
```

**Problème** : sur les longues séquences, les gradients s'évanouissent (vanishing gradients) — le réseau oublie le début de la phrase.

**LSTM** : ajoute des *portes* (forget, input, output) qui contrôlent explicitement ce qui est mémorisé ou oublié. Le **GRU** est une variante simplifiée.

```python
nn.LSTM(input_size=128, hidden_size=256, num_layers=2, batch_first=True)
```

Applications : prédiction de séries temporelles, traduction (seq2seq), génération de texte. Les RNN ont depuis été largement supplantés par les **Transformers** (module suivant), mais restent pertinents pour les séries temporelles et les systèmes embarqués.
