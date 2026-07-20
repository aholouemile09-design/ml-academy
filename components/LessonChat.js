"use client";

import { useState, useRef, useEffect } from "react";
import Markdown from "@/components/Markdown";

export default function LessonChat({ moduleTitle, lessonTitle, track }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const lessonContext = `Parcours : ${track}\nModule : ${moduleTitle}\nLeçon en cours : ${lessonTitle}`;

  const greeting = `Bonjour ! 👋 Tu étudies **${lessonTitle}** dans le module *${moduleTitle}*.\nPose-moi n'importe quelle question sur cette leçon, je suis là pour t'aider !`;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: greeting }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const apiKey = typeof window !== "undefined" ? localStorage.getItem("ml-academy-api-key") : null;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(apiKey ? { "x-user-api-key": apiKey } : {}),
        },
        body: JSON.stringify({ messages: next, lessonContext }),
      });
      const data = await res.json();
      setMessages(m => [...m, {
        role: "assistant",
        content: res.ok && data.reply ? data.reply : "⚠️ Erreur. Vérifie ta connexion ou ta clé API dans Paramètres.",
      }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "⚠️ Erreur réseau. Réessaie dans un instant." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Panneau de chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col bg-ink-900 border border-ink-700 rounded-2xl shadow-2xl animate-lesson-chat-in"
          style={{ height: "420px" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-ink-700 shrink-0">
            <div>
              <p className="text-sm font-semibold text-white">Tuteur AI</p>
              <p className="text-xs text-slate-500 truncate max-w-[220px]">{lessonTitle}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors text-lg leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs shrink-0 mt-0.5">🤖</div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-accent text-white rounded-br-sm"
                    : "bg-ink-800 text-slate-200 rounded-bl-sm"
                }`}>
                  {m.role === "assistant" ? <Markdown text={m.content} /> : m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs shrink-0">🤖</div>
                <div className="bg-ink-800 rounded-2xl rounded-bl-sm px-3 py-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); send(); }}
            className="flex gap-2 px-3 py-3 border-t border-ink-700 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Je ne comprends pas…"
              disabled={loading}
              className="flex-1 bg-ink-950 border border-ink-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600 disabled:opacity-50"
            />
            <button type="submit" disabled={loading || !input.trim()}
              className="btn-primary text-sm px-3 disabled:opacity-40">
              ↑
            </button>
          </form>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Poser une question au tuteur"
        title="Poser une question au tuteur"
        className={`fixed bottom-6 right-24 z-50 h-12 px-4 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 ${
          open
            ? "bg-ink-700 border border-ink-600 text-slate-300"
            : "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
        }`}
      >
        <span>💬</span>
        <span className="hidden sm:block">{open ? "Fermer" : "Demander au tuteur"}</span>
      </button>

      <style>{`
        @keyframes lesson-chat-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-lesson-chat-in { animation: lesson-chat-in 0.2s ease-out; }
      `}</style>
    </>
  );
}
