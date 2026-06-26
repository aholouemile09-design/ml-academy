import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProgressProvider } from "@/lib/userProgress";
import { ThemeProvider } from "@/lib/theme";
import LegacyImportPrompt from "@/components/LegacyImportPrompt";

const SITE_URL = "https://codegraft.vercel.app";
const TITLE = "CodeGraft Academy — Machine Learning & Web Full Stack";
const DESCRIPTION =
  "École en ligne de machine learning, data science et développement web full stack, avec tuteur AI personnel : parcours structuré, quiz, projets et suivi de progression.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "CodeGraft Academy",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
          <UserProgressProvider>
            <Navbar />
            <LegacyImportPrompt />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <footer className="border-t border-ink-700 py-8 text-center text-sm text-slate-500">
              <p>
                CodeGraft Academy — Apprenez le machine learning et le développement web comme à l'école, avec votre tuteur AI personnel.
              </p>
              <nav className="mt-3 flex justify-center gap-4">
                <a href="/mentions-legales" className="hover:text-slate-300 underline">
                  Mentions légales
                </a>
                <a href="/confidentialite" className="hover:text-slate-300 underline">
                  Confidentialité
                </a>
              </nav>
            </footer>
          </UserProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
