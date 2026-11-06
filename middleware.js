import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Au-delà de ce délai, on considère Supabase injoignable. La valeur est très
// inférieure à la limite de 25 s d'une fonction Vercel : un projet Supabase en
// pause avait fait tomber tout le site, pages publiques comprises.
const DELAI_SESSION_MS = 3000;

// Le délai doit couper la requête elle-même, pas seulement l'attente.
//
// Abandonner la promesse — un Promise.race contre un setTimeout — laissait
// l'appel continuer après l'envoi de la réponse. Supabase pouvait alors
// terminer un rafraîchissement : le jeton de rafraîchissement était consommé
// côté serveur, et les nouveaux cookies posés dans une réponse déjà partie.
// Le navigateur gardait un jeton devenu invalide et perdait sa session au
// rafraîchissement suivant — l'utilisateur se retrouvait déconnecté sans
// raison visible. Avec un signal d'abandon, la requête est coupée pour de
// bon : rien n'est consommé, la session reste celle que le navigateur a.
function fetchBorne(url, options) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(DELAI_SESSION_MS) });
}

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: { fetch: fetchBorne },
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
    await supabase.auth.getUser();
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
