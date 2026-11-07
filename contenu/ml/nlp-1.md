Une machine ne lit pas des mots : il faut les transformer en nombres.

**Tokenisation** : découper le texte en unités (tokens). Les LLM modernes utilisent des sous-mots (BPE) : "incroyable" → ["in", "croy", "able"]. Vocabulaire typique : 30k–100k tokens.

**Embeddings** : chaque token devient un vecteur dense (ex. 768 dimensions) appris pendant l'entraînement. Propriété magique : la géométrie capture le sens.
```
roi - homme + femme ≈ reine
```

Les mots de sens proches ont des vecteurs proches (similarité cosinus). C'est le fondement de la **recherche sémantique** : on compare les embeddings de la requête et des documents.

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
emb = model.encode(["le chat dort", "un félin se repose"])
# similarité cosinus élevée malgré zéro mot en commun
```
