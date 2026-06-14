// Illustrations SVG inline — aucune dépendance externe
// Thème : sombre, indigo/cyan, style "tech moderne"

export function NeuralNetworkIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nn-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nn-line1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="nn-line2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
        </linearGradient>
        <filter id="nn-blur">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="210" cy="160" rx="180" ry="130" fill="url(#nn-glow)" />

      {/* ── Layer 1 — Input nodes (x=60) ── */}
      {[70, 130, 190, 250].map((y, i) => (
        <g key={`l1-${i}`}>
          <circle cx="60" cy={y} r="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" filter="url(#glow-strong)" />
          <circle cx="60" cy={y} r="7" fill="#6366f1" opacity="0.8" />
        </g>
      ))}

      {/* ── Layer 2 — Hidden 1 (x=160) ── */}
      {[60, 120, 180, 240, 300].map((y, i) => (
        <g key={`l2-${i}`}>
          <circle cx="160" cy={y} r="14" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" filter="url(#glow-strong)" />
          <circle cx="160" cy={y} r="7" fill="#8b5cf6" opacity="0.8" />
        </g>
      ))}

      {/* ── Layer 3 — Hidden 2 (x=260) ── */}
      {[80, 150, 220, 290].map((y, i) => (
        <g key={`l3-${i}`}>
          <circle cx="260" cy={y} r="14" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="2" filter="url(#glow-strong)" />
          <circle cx="260" cy={y} r="7" fill="#06b6d4" opacity="0.8" />
        </g>
      ))}

      {/* ── Layer 4 — Output (x=360) ── */}
      {[120, 200].map((y, i) => (
        <g key={`l4-${i}`}>
          <circle cx="360" cy={y} r="18" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="2.5" filter="url(#glow-strong)" />
          <circle cx="360" cy={y} r="9" fill="#06b6d4" opacity="0.9" />
        </g>
      ))}

      {/* ── Connections L1→L2 ── */}
      {[70, 130, 190, 250].map((y1) =>
        [60, 120, 180, 240, 300].map((y2, j) => (
          <line key={`c12-${y1}-${j}`} x1="74" y1={y1} x2="146" y2={y2}
            stroke="url(#nn-line2)" strokeWidth="1" opacity="0.35" />
        ))
      )}

      {/* ── Connections L2→L3 ── */}
      {[60, 120, 180, 240, 300].map((y1) =>
        [80, 150, 220, 290].map((y2, j) => (
          <line key={`c23-${y1}-${j}`} x1="174" y1={y1} x2="246" y2={y2}
            stroke="url(#nn-line1)" strokeWidth="1" opacity="0.35" />
        ))
      )}

      {/* ── Connections L3→L4 (highlighted) ── */}
      {[80, 150, 220, 290].map((y1) =>
        [120, 200].map((y2, j) => (
          <line key={`c34-${y1}-${j}`} x1="274" y1={y1} x2="342" y2={y2}
            stroke="url(#nn-line1)" strokeWidth="1.5" opacity="0.55" />
        ))
      )}

      {/* Floating data label */}
      <rect x="330" y="50" width="80" height="24" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" opacity="0.8" />
      <text x="370" y="66" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontFamily="monospace">output: 0.94</text>

      <rect x="10" y="155" width="64" height="24" rx="6" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1" opacity="0.8" />
      <text x="42" y="171" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="monospace">x₁...x₄</text>
    </svg>
  );
}

export function WebDevIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <defs>
        <linearGradient id="wd-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
        </linearGradient>
        <filter id="wd-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Browser window */}
      <rect x="40" y="30" width="340" height="240" rx="12" fill="#0f172a" stroke="#1e3a5f" strokeWidth="2" />
      <rect x="40" y="30" width="340" height="40" rx="12" fill="#1e293b" />
      <rect x="40" y="58" width="340" height="12" fill="#1e293b" />

      {/* Browser dots */}
      <circle cx="66" cy="50" r="6" fill="#ef4444" />
      <circle cx="86" cy="50" r="6" fill="#f59e0b" />
      <circle cx="106" cy="50" r="6" fill="#22c55e" />

      {/* URL bar */}
      <rect x="125" y="40" width="200" height="20" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <text x="225" y="54" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">ml-academy.vercel.app</text>

      {/* Code lines in browser */}
      {[
        { y: 90, w: 180, color: "#6366f1", label: "import React from 'react'" },
        { y: 110, w: 240, color: "#06b6d4", label: "export default function App() {" },
        { y: 130, w: 160, color: "#a5b4fc", label: "  return <Dashboard />" },
        { y: 150, w: 80, color: "#06b6d4", label: "}" },
        { y: 180, w: 200, color: "#34d399", label: "✓ Build successful" },
        { y: 200, w: 150, color: "#94a3b8", label: "✓ Deployed to Vercel" },
      ].map((line, i) => (
        <g key={i}>
          <text x="60" y={line.y} fill={line.color} fontSize="11" fontFamily="monospace" opacity="0.9">{line.label}</text>
        </g>
      ))}

      {/* Floating badge */}
      <rect x="290" y="170" width="80" height="32" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" filter="url(#wd-glow)" />
      <text x="330" y="188" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontFamily="monospace" fontWeight="bold">React ⚛</text>

      <rect x="55" y="215" width="88" height="28" rx="8" fill="#0c1a2e" stroke="#0891b2" strokeWidth="1.5" filter="url(#wd-glow)" />
      <text x="99" y="233" textAnchor="middle" fill="#67e8f9" fontSize="11" fontFamily="monospace">Next.js 14</text>
    </svg>
  );
}

export function TutorAvatar({ className = "" }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <defs>
        <radialGradient id="av-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </radialGradient>
        <linearGradient id="av-screen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="av-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="#0f0e1a" stroke="#6366f1" strokeWidth="2" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="8 4" opacity="0.4" />

      {/* Head */}
      <rect x="28" y="22" width="64" height="64" rx="16" fill="url(#av-bg)" stroke="#6366f1" strokeWidth="2" filter="url(#av-glow)" />

      {/* Screen/visor */}
      <rect x="34" y="32" width="52" height="34" rx="6" fill="#0a0a1a" stroke="#06b6d4" strokeWidth="1.5" />

      {/* Eyes — two glowing dots */}
      <circle cx="46" cy="49" r="7" fill="url(#av-screen)" filter="url(#av-glow)" />
      <circle cx="74" cy="49" r="7" fill="url(#av-screen)" filter="url(#av-glow)" />
      <circle cx="46" cy="49" r="3" fill="white" opacity="0.9" />
      <circle cx="74" cy="49" r="3" fill="white" opacity="0.9" />

      {/* Mouth — smile bar */}
      <rect x="42" y="62" width="36" height="3" rx="2" fill="#06b6d4" opacity="0.8" />

      {/* Antenna */}
      <line x1="60" y1="22" x2="60" y2="10" stroke="#6366f1" strokeWidth="2" />
      <circle cx="60" cy="8" r="4" fill="#6366f1" filter="url(#av-glow)" />

      {/* Ears / side panels */}
      <rect x="18" y="42" width="10" height="20" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="92" y="42" width="10" height="20" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />

      {/* Body stub */}
      <rect x="40" y="86" width="40" height="18" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="52" y="92" width="16" height="6" rx="3" fill="#6366f1" opacity="0.6" />
    </svg>
  );
}

export function CertificationIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cert-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cert-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="cert-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Certificate */}
      <rect x="60" y="20" width="280" height="200" rx="12" fill="url(#cert-bg)" stroke="#6366f1" strokeWidth="2" />
      <rect x="68" y="28" width="264" height="184" rx="8" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.4" strokeDasharray="6 3" />

      {/* Ribbon top */}
      <rect x="180" y="14" width="40" height="20" rx="4" fill="#6366f1" />
      <rect x="185" y="8" width="30" height="10" rx="3" fill="#4f46e5" />

      {/* Star / medal */}
      <circle cx="200" cy="85" r="32" fill="#1e1b4b" stroke="url(#cert-gold)" strokeWidth="3" filter="url(#cert-glow)" />
      <text x="200" y="93" textAnchor="middle" fontSize="28">🏅</text>

      {/* Lines */}
      <rect x="100" y="130" width="200" height="6" rx="3" fill="#6366f1" opacity="0.6" />
      <rect x="120" y="148" width="160" height="4" rx="2" fill="#334155" />
      <rect x="130" y="162" width="140" height="4" rx="2" fill="#334155" />

      {/* "CERTIFIÉ" badge */}
      <rect x="140" y="178" width="120" height="28" rx="6" fill="#6366f1" />
      <text x="200" y="197" textAnchor="middle" fill="white" fontSize="13" fontFamily="Arial" fontWeight="bold">CERTIFIÉ ✓</text>

      {/* Floating badges */}
      <circle cx="100" cy="210" r="20" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" filter="url(#cert-glow)" />
      <text x="100" y="216" textAnchor="middle" fontSize="14">☁️</text>
      <circle cx="300" cy="210" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" filter="url(#cert-glow)" />
      <text x="300" y="216" textAnchor="middle" fontSize="14">🤖</text>
    </svg>
  );
}

export function DashboardIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bar-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Card background */}
      <rect x="10" y="10" width="360" height="220" rx="12" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

      {/* KPI cards */}
      {[
        { x: 20, label: "XP", value: "1240", color: "#6366f1" },
        { x: 115, label: "Leçons", value: "18/32", color: "#06b6d4" },
        { x: 210, label: "Modules", value: "5/9", color: "#8b5cf6" },
        { x: 305, label: "Niveau", value: "Avancé", color: "#22c55e" },
      ].map((kpi, i) => (
        <g key={i}>
          <rect x={kpi.x} y="20" width="85" height="50" rx="8" fill="#1e293b" stroke={kpi.color} strokeWidth="1" opacity="0.8" />
          <text x={kpi.x + 42} y="42" textAnchor="middle" fill={kpi.color} fontSize="9" fontFamily="Arial">{kpi.label}</text>
          <text x={kpi.x + 42} y="60" textAnchor="middle" fill="white" fontSize="13" fontFamily="Arial" fontWeight="bold">{kpi.value}</text>
        </g>
      ))}

      {/* Bar chart */}
      {[40, 70, 55, 85, 60, 90, 75, 45, 80].map((h, i) => (
        <rect key={i} x={28 + i * 34} y={170 - h} width="24" height={h}
          rx="4" fill="url(#bar-grad)" opacity="0.85" />
      ))}

      {/* Trend line */}
      <polyline
        points="28,155 62,130 96,140 130,110 164,120 198,95 232,105 266,80 300,90"
        stroke="url(#line-grad)" strokeWidth="2.5" fill="none" strokeLinejoin="round" />

      {/* Dots on line */}
      {[[28,155],[62,130],[96,140],[130,110],[164,120],[198,95],[232,105],[266,80],[300,90]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#06b6d4" />
      ))}

      {/* Labels */}
      <text x="190" y="220" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial">Progression sur 9 modules</text>
    </svg>
  );
}
