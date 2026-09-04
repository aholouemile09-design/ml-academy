/**
 * Laissez-passer de réinitialisation — partagé entre le callback qui le pose
 * et la route de changement de mot de passe qui l'exige.
 *
 * Pourquoi il existe : après un lien de récupération, l'utilisateur possède
 * une session valide, mais une session valide ne suffit pas à autoriser un
 * changement de mot de passe SANS l'ancien. Sinon, un ordinateur laissé
 * ouvert dans une bibliothèque permettrait à n'importe qui de s'approprier
 * le compte définitivement.
 *
 * Ce marqueur distingue « session issue d'un lien de récupération reçu par
 * mail » de « session ordinaire ». Il est posé uniquement côté serveur, en
 * httpOnly, et détruit dès qu'il a servi.
 *
 * Sa durée de vie est courte : le temps de choisir un mot de passe, pas le
 * temps d'aller déjeuner.
 */

export const RECOVERY_COOKIE = "cg-recovery";
export const RECOVERY_MAX_AGE_S = 15 * 60;
