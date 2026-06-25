// API route — création de repo GitHub via Personal Access Token utilisateur.
// Le token est envoyé dans x-github-token (jamais stocké côté serveur).

import { rateLimit, getClientKey } from "../../../lib/rateLimit";

const REPO_NAME_RE = /^[A-Za-z0-9_.-]{1,100}$/;
const SAFE_PATH_RE = /^[A-Za-z0-9_\-./]{1,255}$/;
const MAX_FILES = 30;
const MAX_FILE_CONTENT_LENGTH = 200_000;

function isSafeRelativePath(path) {
  if (!SAFE_PATH_RE.test(path)) return false;
  const segments = path.split("/");
  return !segments.includes("..") && !segments.includes(".") && !path.startsWith("/");
}

export async function POST(req) {
  try {
    const { allowed } = rateLimit(getClientKey(req), { limit: 10, windowMs: 60_000 });
    if (!allowed) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }

    const { repoName, description, readme, files } = await req.json();
    const token = req.headers.get("x-github-token");

    if (!token) return Response.json({ error: "no_token" }, { status: 401 });
    if (!repoName || !REPO_NAME_RE.test(repoName)) {
      return Response.json({ error: "invalid_repo_name" }, { status: 400 });
    }
    if (files && Array.isArray(files)) {
      if (files.length > MAX_FILES) {
        return Response.json({ error: "too_many_files" }, { status: 400 });
      }
      for (const f of files) {
        if (
          !f.path ||
          !isSafeRelativePath(f.path) ||
          typeof f.content !== "string" ||
          f.content.length > MAX_FILE_CONTENT_LENGTH
        ) {
          return Response.json({ error: "invalid_file_entry" }, { status: 400 });
        }
      }
    }

    // 1. Récupérer le login GitHub de l'utilisateur
    const meRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}`, "User-Agent": "ML-Academy" },
    });
    if (!meRes.ok) return Response.json({ error: "invalid_token" }, { status: 401 });
    const me = await meRes.json();

    // 2. Créer le repo
    const createRes = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "ML-Academy",
      },
      body: JSON.stringify({
        name: repoName,
        description: description || "Projet CodeGraft Academy",
        private: false,
        auto_init: false,
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      // Repo déjà existant → on continue (422)
      if (createRes.status !== 422) {
        console.error("GitHub create repo error:", createRes.status, err);
        return Response.json({ error: "create_failed" }, { status: createRes.status });
      }
    }

    const repoUrl = `https://github.com/${me.login}/${repoName}`;

    // 3. Pousser le README (base64)
    const readmeContent = readme || `# ${repoName}\n\nProjet réalisé dans le cadre de CodeGraft Academy.\n`;
    const readmeB64 = Buffer.from(readmeContent).toString("base64");

    await fetch(`https://api.github.com/repos/${me.login}/${repoName}/contents/README.md`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "ML-Academy",
      },
      body: JSON.stringify({
        message: "Ajout README — CodeGraft Academy",
        content: readmeB64,
      }),
    });

    // 4. Pousser les fichiers de code supplémentaires (optionnel)
    if (files && Array.isArray(files)) {
      for (const f of files) {
        if (!f.path || !f.content) continue;
        const contentB64 = Buffer.from(f.content).toString("base64");
        await fetch(`https://api.github.com/repos/${me.login}/${repoName}/contents/${f.path}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "ML-Academy",
          },
          body: JSON.stringify({
            message: `Ajout ${f.path} — CodeGraft Academy`,
            content: contentB64,
          }),
        });
      }
    }

    return Response.json({
      success: true,
      login: me.login,
      repoUrl,
      repoName,
    });
  } catch (e) {
    console.error("GitHub route error:", e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
