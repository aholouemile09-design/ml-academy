const BASE_URL = "https://codegraft.vercel.app";

const STATIC_ROUTES = [
  "",
  "/parcours",
  "/pmp",
  "/webdev",
  "/aller-plus-loin",
  "/aller-plus-loin/masters",
  "/certifications",
  "/projets",
  "/ressources",
  "/calendrier",
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap() {
  return STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
