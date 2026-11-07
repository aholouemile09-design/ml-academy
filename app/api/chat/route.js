// Proxy sécurisé vers l'API Anthropic.
//
// La clé vient de l'environnement, et de là seulement. Elle était auparavant
// saisie dans Paramètres et gardée dans le localStorage du navigateur, d'où
// elle repartait dans un en-tête à chaque question : un secret côté client,
// que rien n'obligeait à être là puisque ANTHROPIC_API_KEY existe sur le
// serveur.

import { rateLimit, getClientKey } from "../../../lib/rateLimit";
import { createClient } from "@/lib/supabase/server";
import { ficheLecon, lireLecon } from "@/lib/contenuLecons";
import { lireProfil, resumerProgression } from "@/lib/memoireTuteur";
import { lireHistorique, enregistrer } from "@/lib/conversationTuteur";

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

/**
 * La session Supabase de la requête.
 *
 * Un visiteur non connecté est un cas normal, pas une erreur : le tuteur
 * répond alors sans mémoire plutôt que pas du tout. Supabase injoignable mène
 * au même endroit — une dégradation, pas une panne à montrer à l'apprenant.
 */
async function session() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return { supabase, user: user ?? null };
  } catch {
    return { supabase: null, user: null };
  }
}

/** La progression de l'apprenant, résumée, ou "" si on ne sait pas qui il est. */
async function lireProgression(supabase, user, piste, lecon) {
  if (!user) return "";
  try {
    // Le `eq("user_id", ...)` double la politique RLS : la ressource est
    // autorisée explicitement, pas seulement l'appelant authentifié.
    const { data } = await supabase
      .from("user_progress")
      .select("completed_lessons, quiz_scores, lesson_notes, track_preference")
      .eq("user_id", user.id)
      .single();

    return resumerProgression(data, piste ?? data?.track_preference ?? "ml", lecon);
  } catch {
    return "";
  }
}

/**
 * Le prompt système, assemblé à chaque question.
 *
 * Quatre couches, de la plus stable à la plus volatile : le rôle du tuteur, le
 * profil de l'apprenant, la leçon qu'il a sous les yeux, puis son avancement.
 * Tout est lu sur le serveur ; le navigateur n'envoie que des identifiants.
 */
async function assemblerPrompt(supabase, user, piste, lecon) {
  const couches = [SYSTEM_PROMPT];

  const profil = lireProfil(user);
  if (profil) {
    couches.push(
      `PROFIL DE L'APPRENANT — ces consignes viennent de lui et priment sur les tiennes :\n\n${profil}`
    );
  }

  const fiche = piste && lecon ? ficheLecon(piste, lecon) : null;
  if (fiche) {
    couches.push(
      `LEÇON OUVERTE : « ${fiche.titreLecon} », module « ${fiche.titreModule} » (${fiche.duree}).`
    );
    // Le tuteur devinait le contenu de la leçon à partir de son titre. Depuis
    // que le texte vit sur le serveur, il peut le lui donner.
    const texte = lireLecon(piste, lecon);
    if (texte) {
      couches.push(
        `LE TEXTE DE CETTE LEÇON, tel qu'il l'a sous les yeux. Appuie-toi dessus et ne le contredis pas ; s'il est trop court pour sa question, complète-le sans le lui faire remarquer.\n\n${texte}`
      );
    }
  }

  const progression = await lireProgression(supabase, user, piste, lecon);
  if (progression) {
    couches.push(`SON AVANCEMENT RÉEL, lu dans son compte à l'instant :\n\n${progression}`);
  }

  return couches.join("\n\n---\n\n");
}

export async function POST(req) {
  try {
    // Toutes les questions passent par la clé du site, donc par le même
    // quota : plus personne ne contourne la limite en apportant la sienne.
    const { allowed } = rateLimit(getClientKey(req), { limit: 20, windowMs: 60_000 });
    if (!allowed) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : null;
    // Des identifiants, pas du texte libre : le serveur retrouve lui-même le
    // titre et le contenu au catalogue. Le navigateur ne dicte plus ce que le
    // tuteur croit savoir de la leçon.
    const piste = typeof body?.piste === "string" ? body.piste : null;
    const lecon = typeof body?.lecon === "string" ? body.lecon : null;

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

    const question = messages[messages.length - 1];
    if (question.role !== "user") {
      return Response.json({ error: "invalid_messages" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "no_api_key" }, { status: 401 });
    }

    const { supabase, user } = await session();
    const systemPrompt = await assemblerPrompt(supabase, user, piste, lecon);

    // Pour un apprenant connecté, le fil vient de la base, pas du navigateur :
    // c'est le serveur qui sait ce qui s'est dit, et une conversation reprise
    // depuis un autre appareil retrouve son historique. Sans session, on garde
    // l'ancien comportement — la fenêtre envoyée par le client.
    const fil = user
      ? [...(await lireHistorique(supabase, user.id, piste, lecon)), { role: "user", content: question.content }]
      : messages.slice(-12).map((m) => ({ role: m.role, content: m.content }));

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1500,
        system: systemPrompt,
        messages: fil,
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

    if (user) await enregistrer(supabase, user.id, piste, lecon, question.content, text);

    return Response.json({ reply: text });
  } catch (e) {
    console.error("Chat route error:", e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
