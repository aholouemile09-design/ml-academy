"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { simulatedReply } from "@/lib/simulatedTutor";
import Markdown from "@/components/Markdown";
import { TutorAvatar } from "@/components/Illustrations";

const SUGGESTIONS = [
  "Par où commencer si je débute ?",
  "Explique-moi le surapprentissage",
  "C'est quoi un Transformer ?",
  "Quel projet me conseilles-tu ?",
];

export default function Tuteur() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bonjour Emile ! 👋 Je suis ton tuteur AI, expert en machine learning et programmation. Pose-moi n'importe quelle question : un concept flou, du code à corriger, un conseil de parcours… Je suis là pour t'accompagner comme un professeur particulier.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    setHasKey(Boolean(localStorage.getItem("ml-academy-api-key")));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const apiKey = localStorage.getItem("ml-academy-api-key");

    if (apiKey) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json", "x-user-api-key": apiKey },
          body: JSON.stringify({ messages: newMessages }),
        });
        const data = await res.json();
        if (res.ok && data.reply) {
          setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
        } else {
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content:
                "⚠️ L'appel à l'API a échoué (clé invalide ou quota dépassé). Vérifie ta clé dans **Paramètres**. En attendant, je passe en mode simulé :\n\n" +
                simulatedReply(content),
            },
          ]);
        }
      } catch {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "⚠️ Erreur réseau. Mode simulé :\n\n" + simulatedReply(content) },
        ]);
      }
    } else {
      // Mode simulé : petite latence pour le naturel
      await new Promise((r) => setTimeout(r, 600));
      setMessages((m) => [...m, { role: "assistant", content: simulatedReply(content) }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-4">
        <TutorAvatar className="w-14 h-14 shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-white">Tuteur AI</h1>
          <p className="text-sm text-slate-500">
            {hasKey ? (
              <span className="text-emerald-400">● Connecté à l'API Claude</span>
            ) : (
              <>
                <span className="text-amber-400">● Mode simulé</span> —{" "}
                <Link href="/parametres" className="underline hover:text-accent-light">
                  ajouter une clé API
                </Link>{" "}
                pour débloquer le tuteur complet
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <TutorAvatar className="w-8 h-8 shrink-0 mb-1" />
            )}
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "bg-accent text-white rounded-br-sm"
                  : "card rounded-bl-sm"
              }`}
            >
              {m.role === "assistant" ? <Markdown text={m.content} /> : m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="card rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-slate-400">
              <span className="animate-pulse">Le tuteur réfléchit…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-3 py-1.5 rounded-full border border-ink-700 text-xs text-slate-300 hover:border-accent transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose ta question au tuteur…"
          className="flex-1 bg-ink-900 border border-ink-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600"
        />
        <button type="submit" disabled={loading || !input.trim()} className="btn-primary disabled:opacity-40">
          Envoyer
        </button>
      </form>
    </div>
  );
}
