"use client";

import { useState } from "react";
import { useUserProgress } from "@/lib/userProgress";
import { generatePlan, exportIcs } from "@/lib/planGenerator";
import Link from "next/link";

const TRACKS = [
  { value: "ml", label: "ML & Data Science" },
  { value: "web", label: "Web Full Stack" },
  { value: "pmp", label: "PMP 2026" },
];

const DAYS = [
  { value: 1, label: "Lun" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Mer" },
  { value: 4, label: "Jeu" },
  { value: 5, label: "Ven" },
  { value: 6, label: "Sam" },
  { value: 0, label: "Dim" },
];

const TRACK_LABELS = { ml: "ML & Data Science", web: "Web Full Stack", pmp: "PMP 2026" };

const TYPE_STYLES = {
  lesson: { icon: "📖", color: "border-accent/30 bg-accent/5", badge: "bg-accent/10 text-accent-light" },
  quiz: { icon: "✅", color: "border-emerald-500/30 bg-emerald-500/5", badge: "bg-emerald-500/10 text-emerald-400" },
  review: { icon: "🃏", color: "border-amber-500/30 bg-amber-500/5", badge: "bg-amber-500/10 text-amber-400" },
};

function formatDate(str) {
  return new Date(str).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
}

function groupByDate(items) {
  const groups = {};
  for (const item of items) {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function PlanPage() {
  const ctx = useUserProgress();
  const today = new Date().toISOString().split("T")[0];
  const defaultTarget = new Date();
  defaultTarget.setMonth(defaultTarget.getMonth() + 3);

  const [track, setTrack] = useState("ml");
  const [targetDate, setTargetDate] = useState(defaultTarget.toISOString().split("T")[0]);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [preferredDays, setPreferredDays] = useState([1, 2, 3, 4, 5]);
  const [plan, setPlan] = useState(ctx?.studyPlan || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!ctx?.loaded) return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;

  if (!ctx.user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Connecte-toi pour générer ton plan d'étude.</p>
        <Link href="/connexion" className="btn-primary">Se connecter →</Link>
      </div>
    );
  }

  const toggleDay = (day) => {
    setPreferredDays(d => d.includes(day) ? d.filter(x => x !== day) : [...d, day]);
  };

  const handleGenerate = () => {
    const result = generatePlan({
      track, targetDate, hoursPerWeek: Number(hoursPerWeek),
      preferredDays: preferredDays.length ? preferredDays : [1,2,3,4,5],
      completedLessons: ctx.completedLessons || [],
    });
    setPlan({ ...result, track, targetDate, generatedAt: today });
  };

  const handleSave = async () => {
    setSaving(true);
    await ctx.saveStudyPlan(plan);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleExportIcs = () => {
    const ics = exportIcs(plan.items, TRACK_LABELS[plan.track]);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `codegraft-plan-${plan.track}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => setPlan(null);

  const groups = plan ? groupByDate(plan.items) : [];
  const savedPlan = ctx.studyPlan;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">📅 Plan d'étude personnalisé</h1>
        <p className="text-slate-400">Génère un planning daté en fonction de ta disponibilité et de ta date cible.</p>
      </div>

      {/* Formulaire */}
      {!plan && (
        <div className="card p-6 space-y-6">
          <div>
            <label className="text-xs text-slate-500 mb-2 block">Parcours visé</label>
            <div className="flex gap-2 flex-wrap">
              {TRACKS.map(t => (
                <button key={t.value} onClick={() => setTrack(t.value)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                    track === t.value ? "border-accent bg-accent/15 text-white" : "border-ink-700 text-slate-400 hover:border-accent/40"
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Date cible (exam ou objectif)</label>
              <input type="date" value={targetDate} min={today}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Heures disponibles par semaine</label>
              <select value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)}
                className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent">
                {[1,2,3,4,5,7,10,14,20].map(h => (
                  <option key={h} value={h}>{h}h / semaine</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-2 block">Jours d'étude préférés</label>
            <div className="flex gap-2 flex-wrap">
              {DAYS.map(d => (
                <button key={d.value} onClick={() => toggleDay(d.value)}
                  className={`w-12 h-10 rounded-xl border text-xs font-medium transition-all ${
                    preferredDays.includes(d.value)
                      ? "border-accent bg-accent/15 text-white"
                      : "border-ink-700 text-slate-500 hover:border-accent/40"
                  }`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {savedPlan && (
            <div className="bg-ink-800 rounded-xl px-4 py-3 text-sm text-slate-400 flex items-center justify-between">
              <span>Tu as déjà un plan sauvegardé ({TRACK_LABELS[savedPlan.track]}, généré le {formatDate(savedPlan.generatedAt)}).</span>
              <button onClick={() => setPlan(savedPlan)} className="text-accent-light hover:underline ml-3 shrink-0">Voir →</button>
            </div>
          )}

          <button onClick={handleGenerate} disabled={preferredDays.length === 0}
            className="btn-primary w-full disabled:opacity-40">
            Générer mon plan →
          </button>
        </div>
      )}

      {/* Plan généré */}
      {plan && (
        <div className="space-y-6">
          {/* Header */}
          <div className="card p-5 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white font-semibold">{TRACK_LABELS[plan.track]} — objectif {formatDate(plan.targetDate)}</p>
              <p className="text-xs text-slate-500 mt-0.5">{plan.items.length} sessions planifiées · ~{plan.weeksNeeded} semaine(s)</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={handleExportIcs} className="btn-secondary text-sm">⬇ Export .ics</button>
              <button onClick={handleSave} disabled={saving || saved} className="btn-primary text-sm disabled:opacity-50">
                {saving ? "Sauvegarde…" : saved ? "✓ Sauvegardé !" : "💾 Sauvegarder"}
              </button>
              <button onClick={handleReset} className="btn-secondary text-sm text-slate-500">Recréer</button>
            </div>
          </div>

          {plan.warning && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-300">
              {plan.warning}
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-3">
            {groups.map(([date, items]) => (
              <div key={date}>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">{formatDate(date)}</p>
                <div className="space-y-2">
                  {items.map((item, i) => {
                    const style = TYPE_STYLES[item.type] || TYPE_STYLES.lesson;
                    return (
                      <div key={i} className={`flex items-center gap-3 card p-3 ${style.color}`}>
                        <span className="text-lg">{style.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{item.title}</p>
                          {item.moduleTitle && item.type !== "review" && (
                            <p className="text-xs text-slate-500 truncate">{item.moduleTitle}</p>
                          )}
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${style.badge}`}>
                          {item.minutes} min
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
