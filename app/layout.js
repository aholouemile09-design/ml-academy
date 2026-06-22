import "./globals.css";
import Navbar from "@/components/Navbar";
import { ProgressProvider } from "@/lib/progress";
import { ProfileProvider } from "@/lib/profiles";
import { ThemeProvider } from "@/lib/theme";

export const metadata = {
  title: "ML Academy — Maîtrisez le Machine Learning",
  description:
    "École en ligne de machine learning et programmation avec tuteur AI personnel : parcours structuré, quiz, projets et suivi de progression.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

// Script injecté AVANT le premier rendu — évite le flash de mauvais thème
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('ml-academy-theme') || 'dark';
    document.documentElement.classList.add(t);
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <ProfileProvider>
            <ProgressProvider>
              <Navbar />
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
              <footer className="border-t border-ink-700 py-8 text-center text-sm text-slate-500">
                ML Academy — Apprenez le machine learning comme à l'école, avec votre tuteur AI personnel.
              </footer>
            </ProgressProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
