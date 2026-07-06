import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const FEEDBACK_SYSTEM_PROMPT = `Tu es un reviewer de code bienveillant pour CodeGraft Academy.
Tu fournis un feedback structuré selon une grille (rubrique) en 5 dimensions :
1. Correction — le code fonctionne-t-il ? Y a-t-il des bugs évidents ?
2. Lisibilité — nommage, commentaires, clarté du code
3. Structure — organisation, découpage en fonctions/classes
4. Bonnes pratiques — idiomes du langage, gestion d'erreurs, sécurité basique
5. Tests — y a-t-il des tests ? sont-ils pertinents ?

Pour chaque dimension, pose 1-2 questions de réflexion et donne une piste d'amélioration concrète.

RÈGLE ABSOLUE : Tu ne donnes JAMAIS le code de solution complet. Tu guides, tu questionnes, tu suggères des pistes — mais l'apprenant doit écrire le code lui-même. Si le code soumis est incomplet ou cassé, aide à identifier le problème sans le résoudre à la place de l'apprenant.

Réponds en français, avec un ton bienveillant et pédagogique. Structure ta réponse avec des sections claires pour chaque dimension. Termine par un encouragement et les 2-3 points les plus importants à améliorer en priorité.`;

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cs) { cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); },
      },
    }
  );
}

export async function POST(req) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { project_id, project_title, code_or_url, rubric } = await req.json();
  if (!project_id || !code_or_url?.trim()) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const userKey = req.headers.get("x-user-api-key");
  const apiKey = userKey || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Clé API Anthropic manquante." }, { status: 400 });

  const rubricSummary = Object.entries(rubric)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");

  const userMessage = `Voici mon code / URL de repo pour le projet "${project_title}" :

\`\`\`
${code_or_url}
\`\`\`

Mon auto-évaluation avant le feedback :
${rubricSummary || "(non remplie)"}

Merci de me donner un feedback structuré selon la grille en 5 dimensions.`;

  let feedback = "";
  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        system: FEEDBACK_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.json().catch(() => ({}));
      return NextResponse.json({ error: err.error?.message || "Erreur API Anthropic" }, { status: 502 });
    }

    const data = await anthropicRes.json();
    feedback = data.content?.[0]?.text || "";
  } catch {
    return NextResponse.json({ error: "Impossible de contacter l'API Anthropic." }, { status: 502 });
  }

  // Sauvegarde en base
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  await adminClient.from("project_submissions").insert({
    user_id: user.id, project_id, project_title, code_or_url, rubric, feedback,
  });

  return NextResponse.json({ feedback });
}

export async function GET(req) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const url = new URL(req.url);
  const project_id = url.searchParams.get("project_id");

  let query = supabase.from("project_submissions").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  if (project_id) query = query.eq("project_id", project_id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submissions: data ?? [] });
}
