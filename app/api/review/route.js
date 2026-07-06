import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sm2 } from "@/lib/sm2";

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

// GET /api/review — cartes dues aujourd'hui + compte total
export async function GET() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("review_cards")
    .select("*")
    .eq("user_id", user.id)
    .lte("due_date", today)
    .order("due_date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cards: data ?? [] });
}

// POST /api/review — créer ou mettre à jour une carte
export async function POST(req) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { question_ref, quality } = await req.json();
  if (!question_ref || quality === undefined) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  // Récupère la carte existante si elle existe
  const { data: existing } = await supabase
    .from("review_cards")
    .select("*")
    .eq("user_id", user.id)
    .eq("question_ref", question_ref)
    .maybeSingle();

  const base = existing ?? { easiness: 2.5, interval_days: 1, repetitions: 0 };
  const updated = sm2(base, quality);

  const { error } = await supabase
    .from("review_cards")
    .upsert({ user_id: user.id, question_ref, ...updated }, { onConflict: "user_id,question_ref" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, ...updated });
}
