import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Récupère tous les utilisateurs avec reminder_opt_in = true
  const { data: rows, error } = await adminClient
    .from("user_progress")
    .select("user_id, activity_dates, reminder_opt_in")
    .eq("reminder_opt_in", true);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const today = new Date().toISOString().split("T")[0];
  const toRemind = (rows ?? []).filter(r => !(r.activity_dates ?? []).includes(today));

  if (toRemind.length === 0) {
    return NextResponse.json({ sent: 0, message: "Tous les utilisateurs ont déjà été actifs aujourd'hui." });
  }

  // Récupère les emails via auth.admin
  let sent = 0;
  for (const row of toRemind) {
    const { data: userData } = await adminClient.auth.admin.getUserById(row.user_id);
    const email = userData?.user?.email;
    if (!email) continue;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CodeGraft Academy <noreply@oltavia.ca>",
        to: email,
        subject: "📚 Ta session du jour t'attend !",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
            <h2 style="color:#6366f1;margin:0 0 8px">CodeGraft Academy</h2>
            <p style="color:#1e293b;font-size:16px;margin:0 0 16px">
              Bonjour 👋 Tu n'as pas encore eu d'activité aujourd'hui.
              Quelques minutes suffisent pour maintenir ta progression !
            </p>
            <a href="https://codegraft.oltavia.ca/parcours"
              style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
              Reprendre le cours →
            </a>
            <p style="color:#94a3b8;font-size:12px;margin:24px 0 0">
              Tu reçois cet email car tu as activé les rappels dans tes
              <a href="https://codegraft.oltavia.ca/parametres" style="color:#6366f1">paramètres</a>.
              Tu peux les désactiver à tout moment.
            </p>
          </div>
        `,
      }),
    }).catch(() => {});
    sent++;
  }

  return NextResponse.json({ sent, total: toRemind.length });
}
