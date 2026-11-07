**Appeler un LLM par API** :
```python
import anthropic
client = anthropic.Anthropic()
msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="Tu es un tuteur expert en ML.",
    messages=[{"role": "user", "content": "Explique le surapprentissage"}],
)
```

**Paramètres clés** : *temperature* (0 = déterministe, 1 = créatif), *max_tokens*, *system prompt* (rôle et contraintes).

**Agents** : un LLM qui peut appeler des **outils** (recherche web, exécution de code, bases de données) en boucle : observer → réfléchir → agir. C'est exactement ainsi que fonctionne le tuteur AI de ce site.

**Bonnes pratiques en production** :
- Évaluer systématiquement (jeux de tests de prompts, LLM-as-judge)
- Gérer les hallucinations : RAG + citations + vérifications
- Streaming des réponses pour l'UX, cache pour les coûts
- Ne jamais exposer sa clé API côté client — toujours passer par un backend.
