export const AVATAR_COLORS = [
  { id: "indigo",  bg: "bg-indigo-500",  ring: "ring-indigo-400",  hex: "#6366f1", label: "Indigo"  },
  { id: "cyan",    bg: "bg-cyan-500",    ring: "ring-cyan-400",    hex: "#06b6d4", label: "Cyan"    },
  { id: "emerald", bg: "bg-emerald-500", ring: "ring-emerald-400", hex: "#10b981", label: "Vert"    },
  { id: "rose",    bg: "bg-rose-500",    ring: "ring-rose-400",    hex: "#f43f5e", label: "Rose"    },
  { id: "amber",   bg: "bg-amber-500",   ring: "ring-amber-400",   hex: "#f59e0b", label: "Ambre"   },
  { id: "violet",  bg: "bg-violet-500",  ring: "ring-violet-400",  hex: "#8b5cf6", label: "Violet"  },
];

export const AVATAR_OPTIONS = [
  { id: "robot",      emoji: "🤖", label: "Robot"       },
  { id: "scientist",  emoji: "🧑‍🔬", label: "Chercheur"  },
  { id: "hacker",     emoji: "🧑‍💻", label: "Dev"        },
  { id: "astronaut",  emoji: "👩‍🚀", label: "Astronaute" },
  { id: "wizard",     emoji: "🧙", label: "Wizard"      },
  { id: "ninja",      emoji: "🥷", label: "Ninja"       },
  { id: "brain",      emoji: "🧠", label: "Cerveau"     },
  { id: "rocket",     emoji: "🚀", label: "Fusée"       },
  { id: "lightning",  emoji: "⚡", label: "Éclair"      },
  { id: "star",       emoji: "⭐", label: "Étoile"      },
  { id: "fire",       emoji: "🔥", label: "Feu"         },
  { id: "diamond",    emoji: "💎", label: "Diamant"     },
  { id: "owl",        emoji: "🦉", label: "Hibou"       },
  { id: "fox",        emoji: "🦊", label: "Renard"      },
  { id: "panda",      emoji: "🐼", label: "Panda"       },
  { id: "lion",       emoji: "🦁", label: "Lion"        },
];

export const DEFAULT_AVATAR = "robot";

export function getAvatarEmoji(profile) {
  const opt = AVATAR_OPTIONS.find(a => a.id === (profile?.avatarId || DEFAULT_AVATAR));
  return opt ? opt.emoji : "🤖";
}
