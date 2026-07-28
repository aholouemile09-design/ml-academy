/**
 * Aperçu produit du hero — maquette de l'interface de leçon.
 *
 * Volontairement construit en HTML/CSS plutôt qu'avec une capture d'écran :
 * une image serait figée dès la prochaine évolution de l'UI, floue sur les
 * écrans haute densité, lourde à charger, et ne suivrait pas le thème clair.
 * Ici tout est piloté par les variables de la palette.
 *
 * Composant serveur : aucune interactivité, donc aucun JS envoyé au client.
 */
export default function HeroPreview() {
  return (
    <div className="relative glow">
      <div
        className="relative rounded-2xl overflow-hidden border border-ink-700 shadow-2xl bg-ink-900"
        style={{
          transform: "perspective(1400px) rotateY(-7deg) rotateX(2deg)",
          transformOrigin: "center right",
        }}
      >
        {/* Chrome du navigateur */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-700 bg-ink-800/60">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-ink-950/60 text-[10px] text-slate-500 font-mono truncate">
            codegraft.academy/parcours/ml-classique
          </div>
        </div>

        {/* Corps de la leçon */}
        <div className="p-5 space-y-3">
          {/* En-tête du module */}
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🤖</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-tight">ML classique</p>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10 text-accent-light font-medium shrink-0">
              Intermédiaire
            </span>
          </div>

          {/* Objectifs d'apprentissage */}
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-3">
            <p className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">
              🎯 Objectifs d'apprentissage
            </p>
            <div className="space-y-1.5">
              {[
                "Choisir l'algorithme adapté au problème",
                "Diagnostiquer sur et sous-apprentissage",
                "Expliquer une prédiction avec SHAP",
              ].map((o, i) => (
                <div key={o} className="flex gap-2 items-start">
                  <span className="text-[8px] font-mono text-accent-light mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-300 leading-snug">{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem set */}
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-white uppercase tracking-wider">
                  🧪 Évaluation pratique
                </p>
                <p className="text-[11px] font-semibold text-emerald-400 mt-0.5 leading-tight">
                  Problem Set 6 — Scoring crédit auditable
                </p>
              </div>
              <span className="text-[9px] font-mono text-slate-500 shrink-0 mt-0.5">100 pts</span>
            </div>
          </div>

          {/* Lignes de contenu simulées */}
          <div className="space-y-1.5 pt-0.5">
            <div className="h-1.5 rounded-full bg-ink-700 w-full" />
            <div className="h-1.5 rounded-full bg-ink-700 w-[88%]" />
            <div className="h-1.5 rounded-full bg-ink-700 w-[94%]" />
          </div>

          {/* Pied : complétion + temps */}
          <div className="flex items-center justify-between pt-2.5 border-t border-ink-700">
            <span className="text-[10px] text-emerald-400 font-semibold">✅ Leçon complétée</span>
            <span className="text-[10px] text-slate-500">⏱ 1 h 12 min</span>
          </div>
        </div>
      </div>

      {/* Badge flottant */}
      <div className="absolute -bottom-4 -left-4 px-3.5 py-2 rounded-xl glass animate-float">
        <p className="text-[9px] text-slate-400">Tuteur alimenté par</p>
        <p className="text-xs font-bold gradient-text">Claude Sonnet · Anthropic</p>
      </div>

      {/* Badge streak */}
      <div
        className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl glass animate-float"
        style={{ animationDelay: "-4s" }}
      >
        <p className="text-xs font-bold text-accent-light">🔥 12 jours</p>
      </div>
    </div>
  );
}
