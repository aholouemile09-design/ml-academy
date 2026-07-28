/**
 * Politique de mot de passe — partagée client ET serveur.
 *
 * Règle : au moins 12 caractères, avec une minuscule, une majuscule,
 * un chiffre et un caractère spécial. Le seuil de 12 suit la
 * recommandation de l'ANSSI pour un compte sans double authentification.
 *
 * Note sur le hashage : les mots de passe ne sont JAMAIS stockés par
 * l'application. Supabase Auth les hashe avec bcrypt dans `auth.users`
 * avant écriture — nous n'y avons jamais accès en clair, ni en base,
 * ni via l'API. Ce module ne valide que la robustesse.
 */

export const PASSWORD_MIN_LENGTH = 12;

export const PASSWORD_RULES = [
  {
    id: "length",
    label: `Au moins ${PASSWORD_MIN_LENGTH} caractères`,
    test: (pw) => pw.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "lowercase",
    label: "Une lettre minuscule (a-z)",
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    id: "uppercase",
    label: "Une lettre majuscule (A-Z)",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    id: "digit",
    label: "Un chiffre (0-9)",
    test: (pw) => /[0-9]/.test(pw),
  },
  {
    id: "special",
    label: "Un caractère spécial (!@#$%…)",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

/**
 * Mots de passe les plus utilisés au monde — refusés même s'ils
 * satisfont formellement les règles de composition.
 */
// NB : normalisé en minuscules à la construction — la comparaison se fait
// toujours sur `pw.toLowerCase()`, donc une entrée capitalisée ne matcherait jamais.
const COMMON_PASSWORDS = new Set(
  [
    "azerty", "azertyuiop", "qwerty", "qwertyuiop", "password", "motdepasse",
    "123456", "1234567", "12345678", "123456789", "1234567890", "azerty123",
    "password1", "password123", "qwerty123", "motdepasse1", "iloveyou",
    "admin", "administrateur", "welcome", "bienvenue", "abc123", "111111",
    "000000", "letmein", "monkey", "dragon", "sunshine", "princess",
    "football", "soleil", "bonjour", "coucou", "chouchou", "nicolas",
    "azerty1234", "p@ssw0rd", "passw0rd", "azerty@1", "azerty123!",
    "password!", "password123!", "qwerty123!", "motdepasse123!", "azerty@123",
    "admin123!", "welcome123!", "abcd1234!", "aaaaaaa1a!", "passw0rd!",
  ].map((p) => p.toLowerCase())
);

/**
 * Valide un mot de passe.
 * @returns {{ valid: boolean, failed: string[], message: string|null }}
 */
export function validatePassword(password) {
  const pw = typeof password === "string" ? password : "";

  const failed = PASSWORD_RULES.filter((r) => !r.test(pw)).map((r) => r.id);

  if (failed.length > 0) {
    return {
      valid: false,
      failed,
      message: `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères, dont une minuscule, une majuscule, un chiffre et un caractère spécial.`,
    };
  }

  if (COMMON_PASSWORDS.has(pw.toLowerCase())) {
    return {
      valid: false,
      failed: ["common"],
      message: "Ce mot de passe est trop courant et figure dans les listes utilisées par les attaquants. Choisis-en un autre.",
    };
  }

  // Un seul caractère répété (aaaaaaaa, 11111111…)
  if (/^(.)\1+$/.test(pw)) {
    return {
      valid: false,
      failed: ["repeated"],
      message: "Un mot de passe composé d'un seul caractère répété est trivial à deviner.",
    };
  }

  return { valid: true, failed: [], message: null };
}

/**
 * Score de robustesse pour l'indicateur visuel.
 * @returns {{ score: 0|1|2|3|4, label: string, color: string }}
 */
export function passwordStrength(password) {
  const pw = typeof password === "string" ? password : "";
  if (!pw) return { score: 0, label: "", color: "" };

  const passedRules = PASSWORD_RULES.filter((r) => r.test(pw)).length;
  let score = 0;

  // Le minimum acceptable (5 règles, dont 12 caractères) vaut « Fort ».
  // « Excellent » est réservé aux mots de passe nettement plus longs :
  // au-delà de 12 signes, c'est la longueur qui fait la résistance.
  if (passedRules >= 2) score = 1;
  if (passedRules >= 4) score = 2;
  if (passedRules === 5) score = 3;
  if (passedRules === 5 && pw.length >= 16) score = 4;

  // Un mot de passe courant ne dépasse jamais "Faible".
  if (COMMON_PASSWORDS.has(pw.toLowerCase())) score = Math.min(score, 1);

  const meta = [
    { label: "Très faible", color: "bg-rose-500"    },
    { label: "Faible",      color: "bg-rose-500"    },
    { label: "Moyen",       color: "bg-amber-500"   },
    { label: "Fort",        color: "bg-emerald-500" },
    { label: "Excellent",   color: "bg-emerald-400" },
  ][score];

  return { score, ...meta };
}
