/**
 * Les conversations avec le tuteur, côté serveur.
 *
 * Elles vivaient dans un `useState` : le fil mourait au rechargement de la
 * page, et c'était la dernière différence avec une conversation Claude qu'on
 * reprend des semaines plus tard. Elles vivent maintenant dans
 * `tutor_messages`, une ligne par message.
 *
 * Une conversation est identifiée par le couple (piste, leçon) : chaque leçon a
 * la sienne, et la page /tuteur en a une générale, où les deux sont nuls.
 */

const FENETRE = 20;
const MAX_CONTENU = 8000;

/**
 * Les derniers messages d'une conversation, du plus ancien au plus récent.
 *
 * `ponytail:` fenêtre fixe de 20 messages, sans résumé glissant. La mémoire
 * longue est déjà portée par contenu/profil-apprenant.md ; un résumé
 * coûterait un second appel au modèle pour un gain qu'on ne sait pas encore
 * mesurer. À ajouter quand une conversation dépassera vraiment la fenêtre.
 */
export async function lireHistorique(supabase, userId, piste, lecon) {
  let requete = supabase
    .from("tutor_messages")
    .select("role, contenu")
    .eq("user_id", userId)
    // `id` et non `created_at` : les deux messages d'un échange sont insérés
    // dans la même milliseconde, et seul le bigserial les départage.
    .order("id", { ascending: false })
    .limit(FENETRE);

  // En SQL, `= null` ne vaut jamais vrai. Sans ces `is null`, la conversation
  // générale de /tuteur ne se retrouverait jamais.
  requete = piste ? requete.eq("piste", piste) : requete.is("piste", null);
  requete = lecon ? requete.eq("lecon", lecon) : requete.is("lecon", null);

  const { data, error } = await requete;
  if (error || !data) return [];
  return data.reverse().map((m) => ({ role: m.role, content: m.contenu }));
}

/**
 * Enregistre la question et la réponse qui vient d'être produite.
 *
 * Un échec d'écriture ne doit pas priver l'apprenant de sa réponse : elle est
 * déjà dans son navigateur. On perd la mémoire de cet échange, pas l'échange.
 */
export async function enregistrer(supabase, userId, piste, lecon, question, reponse) {
  const { error } = await supabase.from("tutor_messages").insert([
    { user_id: userId, piste, lecon, role: "user", contenu: question.slice(0, MAX_CONTENU) },
    { user_id: userId, piste, lecon, role: "assistant", contenu: reponse.slice(0, MAX_CONTENU) },
  ]);
  if (error) console.error("tutor_messages insert:", error.message);
}
