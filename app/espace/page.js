"use client";

import { useState, useEffect, useRef } from "react";
import { useProfiles, getAvatarEmoji, AVATAR_COLORS } from "@/lib/profiles";
import { MODULE_PLAN, TOTAL_WEEKS_ML, TOTAL_WEEKS_WEB } from "@/lib/calendar";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Citations motivantes (ML / tech / discipline)
// ─────────────────────────────────────────────────────────────────────────────
const QUOTES = [
  { text: "La constance est la mère de l'excellence.", author: "Sénèque" },
  { text: "An expert is a person who has made all the mistakes that can be made in a very narrow field.", author: "Niels Bohr" },
  { text: "Every expert was once a beginner.", author: "Helen Hayes" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Proverbe chinois" },
  { text: "Il n'y a pas de raccourci vers un endroit qui vaut le déplacement.", author: "Beverly Sills" },
  { text: "Data is the new oil — but like oil, it needs to be refined.", author: "Clive Humby" },
  { text: "Ce qui ne se mesure pas ne peut pas être amélioré.", author: "W. Edwards Deming" },
  { text: "7 heures par semaine, 52 semaines, 5 ans. C'est comme ça qu'on change de vie.", author: "ML Academy" },
  { text: "If you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein" },
  { text: "La discipline est choisir entre ce que tu veux maintenant et ce que tu veux le plus.", author: "Abraham Lincoln" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Widget Horloge
// ─────────────────────────────────────────────────────────────────────────────
function ClockWidget() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!time) return <div className="card p-5 animate-pulse h-28" />;
  const h = String(time.getHours()).padStart(2, "0");
  const m = String(time.getMinutes()).padStart(2, "0");
  const s = String(time.getSeconds()).padStart(2, "0");
  const date = time.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div className="card p-5 text-center">
      <p className="text-4xl font-mono font-bold text-white tracking-widest">
        {h}<span className="text-accent animate-pulse">:</span>{m}<span className="text-slate-600 text-2xl">:{s}</span>
      </p>
      <p className="text-slate-400 text-sm mt-2 capitalize">{date}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Widget Météo (Open-Meteo — sans clé API)
// ─────────────────────────────────────────────────────────────────────────────
const WMO_CODES = {
  0: { label: "Ensoleillé", icon: "☀️" },
  1: { label: "Peu nuageux", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie modérée", icon: "🌧️" },
  71: { label: "Neige légère", icon: "🌨️" },
  80: { label: "Averses", icon: "🌦️" },
  95: { label: "Orage", icon: "⛈️" },
};

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity]       = useState(null);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) { setError("Géolocalisation non disponible"); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
          // Météo
          const wRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&timezone=auto`
          );
          const wData = await wRes.json();
          setWeather(wData.current);

          // Ville (reverse geocoding via Open-Meteo / nominatim)
          const gRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`
          );
          const gData = await gRes.json();
          setCity(gData.address?.city || gData.address?.town || gData.address?.village || "Ma position");
        } catch {
          setError("Impossible de charger la météo");
        }
      },
      () => setError("Autorisation de localisation refusée")
    );
  }, []);

  if (error) return (
    <div className="card p-5 text-center text-slate-500 text-sm">
      🌍 {error}
      <p className="text-xs mt-1">Active la géolocalisation dans ton navigateur</p>
    </div>
  );
  if (!weather) return <div className="card p-5 animate-pulse h-32 flex items-center justify-center text-slate-600 text-sm">Chargement météo…</div>;

  const wmo   = WMO_CODES[weather.weathercode] || { label: "Variable", icon: "🌡️" };
  const temp  = Math.round(weather.temperature_2m);
  const hum   = weather.relativehumidity_2m;
  const wind  = Math.round(weather.windspeed_10m);

  return (
    <div className="card p-5">
      <p className="text-xs text-slate-500 uppercase font-semibold mb-3">🌍 Météo — {city}</p>
      <div className="flex items-center gap-4">
        <span className="text-5xl">{wmo.icon}</span>
        <div>
          <p className="text-3xl font-bold text-white">{temp}°C</p>
          <p className="text-slate-400 text-sm">{wmo.label}</p>
        </div>
        <div className="ml-auto text-right text-xs text-slate-500 space-y-1">
          <p>💧 Humidité {hum}%</p>
          <p>💨 Vent {wind} km/h</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Widget Pomodoro Timer
// ─────────────────────────────────────────────────────────────────────────────
function PomodoroWidget() {
  const MODES = [
    { label: "Étude", duration: 25 * 60, color: "text-accent-light" },
    { label: "Pause courte", duration: 5 * 60, color: "text-emerald-400" },
    { label: "Pause longue", duration: 15 * 60, color: "text-cyan-400" },
  ];
  const [mode, setMode]       = useState(0);
  const [left, setLeft]       = useState(MODES[0].duration);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds]   = useState(0);
  const intervalRef = useRef(null);

  const switchMode = (i) => {
    setMode(i); setLeft(MODES[i].duration); setRunning(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setLeft(l => {
          if (l <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode === 0) setRounds(r => r + 1);
            return 0;
          }
          return l - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const pct = ((MODES[mode].duration - left) / MODES[mode].duration) * 100;

  return (
    <div className="card p-5">
      <p className="text-xs text-slate-500 uppercase font-semibold mb-3">⏱ Timer Pomodoro</p>
      <div className="flex gap-1 mb-4">
        {MODES.map((m, i) => (
          <button key={i} onClick={() => switchMode(i)}
            className={`flex-1 py-1 rounded-lg text-xs font-medium transition-colors ${
              mode === i ? "bg-accent/20 text-white border border-accent/40" : "text-slate-500 hover:text-white"
            }`}>
            {m.label}
          </button>
        ))}
      </div>
      {/* Barre de progression circulaire simplifiée */}
      <div className="relative mb-4">
        <div className="h-2 bg-ink-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all bg-gradient-to-r from-accent to-accent-cyan"
            style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="text-center mb-4">
        <span className={`text-4xl font-mono font-bold ${MODES[mode].color}`}>{mm}:{ss}</span>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setRunning(!running)}
          className="flex-1 py-2 rounded-xl font-semibold text-sm transition-colors bg-accent/20 border border-accent/40 text-white hover:bg-accent/30">
          {running ? "⏸ Pause" : left === MODES[mode].duration ? "▶ Démarrer" : "▶ Reprendre"}
        </button>
        <button onClick={() => { setLeft(MODES[mode].duration); setRunning(false); }}
          className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-ink-700 hover:border-ink-600 transition-colors">
          ↺
        </button>
      </div>
      {rounds > 0 && (
        <p className="text-center text-xs text-slate-500 mt-3">
          🍅 {rounds} session{rounds > 1 ? "s" : ""} complétée{rounds > 1 ? "s" : ""} — {rounds * 25} min d'étude
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Widget Citation du jour
// ─────────────────────────────────────────────────────────────────────────────
function QuoteWidget() {
  const dayIdx = new Date().getDay() + Math.floor(new Date().getDate() / 7);
  const q = QUOTES[dayIdx % QUOTES.length];
  return (
    <div className="card p-5 border-accent/20 bg-accent/5">
      <p className="text-xs text-slate-500 uppercase font-semibold mb-3">💬 Citation du jour</p>
      <blockquote className="text-white text-sm leading-relaxed italic mb-2">"{q.text}"</blockquote>
      <p className="text-xs text-slate-500">— {q.author}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Calendrier personnel par profil
// ─────────────────────────────────────────────────────────────────────────────
function addWeeks(date, weeks) {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}
function fmtDate(date) {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function PersonalCalendar({ profile, onUpdate }) {
  const stored     = profile?.calendarStart || "";
  const trackPref  = profile?.trackPreference || "ml";
  const [start, setStart]   = useState(stored);
  const [track, setTrack]   = useState(trackPref);
  const [saved, setSaved]   = useState(false);

  const modules = MODULE_PLAN.filter(m => m.track === track);

  const handleSave = () => {
    onUpdate({ calendarStart: start, trackPreference: track });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  // Calculer les dates de début et fin de chaque module
  let cursor = start ? new Date(start) : null;
  const schedule = modules.map(m => {
    const from = cursor ? new Date(cursor) : null;
    const to   = from ? addWeeks(from, m.weeks) : null;
    if (cursor && to) cursor = new Date(to);
    return { ...m, from, to };
  });

  return (
    <div className="card p-6">
      <h2 className="font-bold text-white mb-1">📆 Mon calendrier personnel</h2>
      <p className="text-xs text-slate-500 mb-4">
        Entre ta date de démarrage et le site calcule automatiquement quand tu termines chaque module.
      </p>

      <div className="flex gap-3 flex-wrap mb-5">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Date de début</label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)}
            className="bg-ink-950 border border-ink-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Parcours</label>
          <select value={track} onChange={e => setTrack(e.target.value)}
            className="bg-ink-950 border border-ink-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-accent">
            <option value="ml">🤖 ML & Data Science</option>
            <option value="web">🌐 Web Full Stack</option>
          </select>
        </div>
        <div className="self-end">
          <button onClick={handleSave}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              saved ? "bg-emerald-500 text-white" : "btn-primary"
            }`}>
            {saved ? "✓ Sauvegardé" : "Sauvegarder"}
          </button>
        </div>
      </div>

      {/* Timeline des modules */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {schedule.map((m, i) => (
          <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-ink-800 border border-ink-700">
            <span className="text-xl shrink-0">{m.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{m.title}</p>
              <p className="text-xs text-slate-500">{m.weeks} semaine{m.weeks > 1 ? "s" : ""}</p>
            </div>
            <div className="text-right text-xs shrink-0">
              {m.from && m.to ? (
                <>
                  <p className="text-slate-300">{fmtDate(m.from)}</p>
                  <p className="text-slate-500">→ {fmtDate(m.to)}</p>
                </>
              ) : (
                <p className="text-slate-600 italic">Date à définir</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {start && (
        <p className="text-xs text-slate-500 mt-4 text-center">
          Fin estimée du parcours {track === "ml" ? "ML" : "Web"} :{" "}
          <span className="text-white font-semibold">
            {fmtDate(addWeeks(new Date(start), track === "ml" ? TOTAL_WEEKS_ML : TOTAL_WEEKS_WEB))}
          </span>
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page principale Mon Espace
// ─────────────────────────────────────────────────────────────────────────────
export default function EspacePage() {
  const ctx = useProfiles();
  const { activeProfile, updateActiveProfile, ready } = ctx || {};
  const color = AVATAR_COLORS.find(c => c.id === activeProfile?.colorId) || AVATAR_COLORS[0];

  const xp      = activeProfile?.xp || 0;
  const lessons = activeProfile?.completedLessons?.length || 0;
  const level   = xp < 200 ? "Débutant" : xp < 600 ? "Intermédiaire" : xp < 1200 ? "Avancé" : "Expert";

  if (!ready) return <div className="max-w-5xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;

  if (!activeProfile) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p className="text-slate-400 mb-4">Crée un profil pour accéder à ton espace personnel.</p>
      <Link href="/profils" className="btn-primary">Créer mon profil →</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header profil */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center text-3xl`}>
          {getAvatarEmoji(activeProfile)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Mon Espace — {activeProfile.name}</h1>
          <p className="text-slate-400 text-sm">{level} · ⚡ {xp} XP · 📚 {lessons} leçons</p>
        </div>
        <Link href="/profils" className="ml-auto text-xs text-slate-400 hover:text-white">Changer de profil →</Link>
      </div>

      {/* Grille widgets */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <ClockWidget />
        <WeatherWidget />
        <QuoteWidget />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <PomodoroWidget />
        {/* Widget stats rapides */}
        <div className="card p-5">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-4">📊 Mes stats</p>
          <div className="space-y-3">
            {[
              { label: "XP total", val: `${xp} XP`, icon: "⚡" },
              { label: "Leçons complétées", val: lessons, icon: "📚" },
              { label: "Quiz réussis", val: Object.keys(activeProfile.quizScores || {}).length, icon: "✅" },
              { label: "Niveau actuel", val: level, icon: "🏆" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  {s.icon} {s.label}
                </span>
                <span className="font-bold text-white">{s.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Link href="/dashboard" className="flex-1 text-center py-2 rounded-xl text-xs text-slate-400 border border-ink-700 hover:border-accent/40 hover:text-white transition-colors">
              Dashboard complet →
            </Link>
          </div>
        </div>
      </div>

      {/* Calendrier personnel */}
      <PersonalCalendar profile={activeProfile} onUpdate={updateActiveProfile} />

      {/* Liens rapides */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/parcours",   icon: "🤖", label: "Cours ML"       },
          { href: "/webdev",     icon: "🌐", label: "Cours Web"      },
          { href: "/projets",    icon: "🛠", label: "Projets"        },
          { href: "/calendrier", icon: "📅", label: "Plan général"   },
        ].map(l => (
          <Link key={l.href} href={l.href}
            className="card p-4 text-center hover:border-accent/50 transition-colors group">
            <div className="text-2xl mb-1">{l.icon}</div>
            <p className="text-xs text-slate-400 group-hover:text-white">{l.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
