import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Au-delà de ce délai, on considère Supabase injoignable. La valeur est très
// inférieure à la limite de 25 s d'une fonction Vercel : un projet Supabase en
// pause avait fait tomber tout le site, pages publiques comprises.
const DELAI_SESSION_MS = 3000;

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  // Rafraîchit la session — nécessaire pour que les routes serveur voient
  // l'utilisateur connecté. Si l'authentification est indisponible, on laisse
  // passer sans session : la route en aval répondra 401, ce qui vaut mieux
  // qu'une requête bloquée.
  try {
    await Promise.race([
      supabase.auth.getUser(),
      new Promise((_, rejeter) =>
        setTimeout(() => rejeter(new Error("session: délai dépassé")), DELAI_SESSION_MS)
      ),
    ]);
  } catch {
    // session non rafraîchie
  }

  return response;
}

export const config = {
  // Seules les routes serveur lisent la session : les pages du site sont des
  // composants client qui parlent à Supabase depuis le navigateur.
  matcher: ["/api/:path*", "/auth/:path*"],
};
