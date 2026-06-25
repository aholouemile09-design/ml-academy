export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/parametres", "/dashboard", "/espace", "/profils"],
    },
    sitemap: "https://codegraft.vercel.app/sitemap.xml",
  };
}
