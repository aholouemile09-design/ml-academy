Les plateformes modernes rendent le déploiement simple — mais il faut connaître les bonnes pratiques.

**Vercel — la plateforme officielle de Next.js**
```bash
npm install -g vercel
vercel login
vercel                  # déploie le projet courant
vercel --prod           # déploiement en production
```

Configuration via `vercel.json` :
```json
{
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic-api-key"
  },
  "regions": ["iad1"],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

**Railway — backend Node.js + PostgreSQL**
Railway déploie automatiquement depuis GitHub et peut provisionner une base PostgreSQL.
```bash
# Via railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```
Railway détecte automatiquement Node.js et lance `npm start`.

**Variables d'environnement en production**
Toutes les plateformes proposent un gestionnaire de secrets :
- Vercel : Project Settings → Environment Variables
- Railway : Variables tab
- AWS : Systems Manager Parameter Store ou Secrets Manager

**Ne jamais faire** :
```bash
# ❌ Committer un .env
git add .env  # JAMAIS

# ✅ .gitignore doit contenir .env*
echo ".env*" >> .gitignore
```
