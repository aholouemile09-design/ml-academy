export const AVATAR_COLORS = [
  { id: "indigo",  bg: "bg-indigo-500",  ring: "ring-indigo-400",  hex: "#6366f1", label: "Indigo"  },
  { id: "cyan",    bg: "bg-cyan-500",    ring: "ring-cyan-400",    hex: "#06b6d4", label: "Cyan"    },
  { id: "emerald", bg: "bg-emerald-500", ring: "ring-emerald-400", hex: "#10b981", label: "Vert"    },
  { id: "rose",    bg: "bg-rose-500",    ring: "ring-rose-400",    hex: "#f43f5e", label: "Rose"    },
  { id: "amber",   bg: "bg-amber-500",   ring: "ring-amber-400",   hex: "#f59e0b", label: "Ambre"   },
  { id: "violet",  bg: "bg-violet-500",  ring: "ring-violet-400",  hex: "#8b5cf6", label: "Violet"  },
  { id: "sky",     bg: "bg-sky-500",     ring: "ring-sky-400",     hex: "#0ea5e9", label: "Ciel"    },
  { id: "pink",    bg: "bg-pink-500",    ring: "ring-pink-400",    hex: "#ec4899", label: "Rose vif"},
  { id: "teal",    bg: "bg-teal-500",    ring: "ring-teal-400",    hex: "#14b8a6", label: "Teal"    },
  { id: "orange",  bg: "bg-orange-500",  ring: "ring-orange-400",  hex: "#f97316", label: "Orange"  },
];

export const AVATAR_OPTIONS = [
  // Tech & Science
  { id: "robot",      emoji: "🤖", label: "Robot"       },
  { id: "scientist",  emoji: "🧑‍🔬", label: "Chercheur"  },
  { id: "hacker",     emoji: "🧑‍💻", label: "Dev"        },
  { id: "astronaut",  emoji: "👩‍🚀", label: "Astronaute" },
  { id: "wizard",     emoji: "🧙", label: "Wizard"      },
  { id: "ninja",      emoji: "🥷", label: "Ninja"       },
  { id: "alien",      emoji: "👾", label: "Alien"       },
  { id: "cyborg",     emoji: "🦾", label: "Cyborg"      },
  { id: "detective",  emoji: "🕵️", label: "Détective"   },
  { id: "pilot",      emoji: "🧑‍✈️", label: "Pilote"     },
  // Nature
  { id: "brain",      emoji: "🧠", label: "Cerveau"     },
  { id: "owl",        emoji: "🦉", label: "Hibou"       },
  { id: "fox",        emoji: "🦊", label: "Renard"      },
  { id: "panda",      emoji: "🐼", label: "Panda"       },
  { id: "lion",       emoji: "🦁", label: "Lion"        },
  { id: "wolf",       emoji: "🐺", label: "Loup"        },
  { id: "dragon",     emoji: "🐉", label: "Dragon"      },
  { id: "eagle",      emoji: "🦅", label: "Aigle"       },
  { id: "cat",        emoji: "🐱", label: "Chat"        },
  { id: "penguin",    emoji: "🐧", label: "Pingouin"    },
  // Symboles
  { id: "rocket",     emoji: "🚀", label: "Fusée"       },
  { id: "lightning",  emoji: "⚡", label: "Éclair"      },
  { id: "star",       emoji: "⭐", label: "Étoile"      },
  { id: "fire",       emoji: "🔥", label: "Feu"         },
  { id: "diamond",    emoji: "💎", label: "Diamant"     },
  { id: "trophy",     emoji: "🏆", label: "Trophée"     },
  { id: "target",     emoji: "🎯", label: "Cible"       },
  { id: "crystal",    emoji: "🔮", label: "Cristal"     },
  { id: "infinity",   emoji: "♾️", label: "Infini"      },
  { id: "atom",       emoji: "⚛️", label: "Atome"       },
  // Humains
  { id: "superhero",  emoji: "🦸", label: "Héros"       },
  { id: "artist",     emoji: "🧑‍🎨", label: "Artiste"    },
  { id: "teacher",    emoji: "🧑‍🏫", label: "Prof"       },
  { id: "student",    emoji: "🧑‍🎓", label: "Étudiant"   },
  { id: "chef",       emoji: "🧑‍🍳", label: "Chef"       },
];

export const DEFAULT_AVATAR = "robot";

export function getAvatarEmoji(profile) {
  const opt = AVATAR_OPTIONS.find(a => a.id === (profile?.avatarId || DEFAULT_AVATAR));
  return opt ? opt.emoji : "🤖";
}
