"use client";

import { PASSWORD_RULES, passwordStrength } from "@/lib/passwordPolicy";

/**
 * Jauge de robustesse + checklist des règles.
 * Affiché sous le champ mot de passe de l'inscription.
 */
export default function PasswordStrength({ password }) {
  if (!password) return null;

  const { score, label, color } = passwordStrength(password);

  return (
    <div className="mt-3 space-y-3">
      {/* Jauge en 4 segments */}
      <div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < score ? color : "bg-ink-700"
              }`}
            />
          ))}
        </div>
        {label && (
          <p className="text-xs mt-1.5 text-slate-400">
            Robustesse : <span className="font-semibold text-white">{label}</span>
          </p>
        )}
      </div>

      {/* Checklist des règles */}
      <ul className="space-y-1">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.id}
              className={`text-xs flex items-center gap-2 transition-colors ${
                ok ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              <span aria-hidden="true">{ok ? "✓" : "○"}</span>
              <span>{rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
