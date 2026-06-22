import "./globals.css";
import Navbar from "@/components/Navbar";
import { ProgressProvider } from "@/lib/progress";
import { ProfileProvider } from "@/lib/profiles";

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

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ProfileProvider>
          <ProgressProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <footer className="border-t border-ink-700 py-8 text-center text-sm text-slate-500">
              ML Academy — Apprenez le machine learning comme à l'école, avec votre tuteur AI personnel.
            </footer>
          </ProgressProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
