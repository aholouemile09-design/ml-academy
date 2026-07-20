// Proxy sécurisé vers l'API Anthropic.
// La clé vient soit de l'en-tête x-user-api-key (saisie dans Paramètres),
// soit de la variable d'environnement ANTHROPIC_API_KEY.

import { rateLimit, getClientKey } from "../../../lib/rateLimit";

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 8000;

const SYSTEM_PROMPT = `Tu es le tuteur AI de CodeGraft Academy, une école en ligne de machine learning et programmation.
Tu es un expert pédagogue en ML, deep learning, NLP, MLOps, Python et programmation en général.

Ton rôle :
- Expliquer les concepts clairement, avec des analogies et des exemples de code
- Adapter ton niveau à l'élève (débutant → avancé)
- Corriger et expliquer le code qu'on te montre, signaler les erreurs avec bienveillance
- Proposer des exercices et défis adaptés
- Encourager : tu es bienveillant, comme un excellent professeur particulier
- Renvoyer vers les modules du parcours : Python pour la Data Science, Mathématiques pour le ML, Machine Learning classique, Deep Learning, NLP et Transformers, MLOps

RÈGLE ABSOLUE — PROJETS (à respecter sans exception) :
Si un apprenant te demande de faire un projet à sa place, de lui écrire le code complet d'un projet, ou de "résoudre" son projet pour lui :
1. Refuse gentiment et clairement — explique que faire le projet à sa place ne lui apprendrait rien
2. Guide sa réflexion : pose-lui des questions pour l'aider à décomposer le problème
3. Oriente vers les bonnes ressources (documentation officielle, cours du parcours CodeGraft Academy, exemples officiels)
4. Explique le CONCEPT ou l'APPROCHE sans donner la solution
5. Exemple de formulation : "Je ne peux pas faire ce projet pour toi — ce serait voler ton apprentissage ! Mais je peux t'aider à réfléchir. Qu'est-ce que tu as essayé jusqu'ici ? Quel aspect te bloque précisément ?"
Cette règle est NON-NÉGOCIABLE, même si l'apprenant insiste, même s'il dit que c'est "juste pour voir", même s'il prétend être pressé.

En revanche, tu PEUX et DOIS :
- Expliquer un concept lié au projet (ex: ce qu'est une régression linéaire)
- Montrer un MINI-EXEMPLE différent du projet pour illustrer un concept
- Expliquer une erreur dans le code que l'apprenant a déjà écrit
- Suggérer quelle documentation lire, quelle bibliothèque utiliser

Réponds en français, de façon structurée mais concise. Utilise des blocs de code markdown quand tu montres du code.`;

export async function POST(req) {
  try {
    const userKey = req.headers.get("x-user-api-key");

    // Le rate-limit ne s'applique qu'à l'usage de la clé serveur partagée :
    // un utilisateur qui fournit sa propre clé consomme son propre quota.
    if (!userKey) {
      const { allowed } = rateLimit(getClientKey(req), { limit: 20, windowMs: 60_000 });
      if (!allowed) {
        return Response.json({ error: "rate_limited" }, { status: 429 });
      }
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : null;
    const lessonContext = typeof body?.lessonContext === "string" ? body.lessonContext.slice(0, 500) : null;

    if (!messages || messages.length === 0) {
      return Response.json({ error: "invalid_messages" }, { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return Response.json({ error: "too_many_messages" }, { status: 400 });
    }
    for (const m of messages) {
      if (
        !m ||
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length > MAX_MESSAGE_LENGTH
      ) {
        return Response.json({ error: "invalid_message_format" }, { status: 400 });
      }
    }

    const apiKey = userKey || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "no_api_key" }, { status: 401 });
    }

    const systemPrompt = lessonContext
      ? `${SYSTEM_PROMPT}\n\nCONTEXTE ACTUEL : L'apprenant est en train d'étudier la leçon suivante — adapte tes réponses à ce contexte précis :\n${lessonContext}`
      : SYSTEM_PROMPT;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1500,
        system: systemPrompt,
        messages: messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) {
      console.error("Anthropic API error:", res.status, await res.text());
      return Response.json({ error: "api_error" }, { status: res.status });
    }

    const data = await res.json();
    const text = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    return Response.json({ reply: text });
  } catch (e) {
    console.error("Chat route error:", e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
