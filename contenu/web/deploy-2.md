Une application déployée doit être rapide, sécurisée et observable.

**HTTPS — obligatoire en 2026**
Vercel et Railway gèrent automatiquement les certificats TLS via Let's Encrypt. Pour un VPS :
```bash
# Nginx + Certbot (Let's Encrypt gratuit)
sudo apt install nginx certbot python3-certbot-nginx
sudo certbot --nginx -d monsite.com
# Renouvellement automatique
sudo certbot renew --dry-run
```

**Performance Next.js**
```jsx
// Optimisation images automatique
import Image from "next/image";
<Image src="/hero.jpg" width={800} height={400} alt="Hero" priority />

// Chargement paresseux
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("./Chart"), { ssr: false });

// Mise en cache de l'API (Next.js 14)
const data = await fetch("/api/data", { next: { revalidate: 3600 } }); // cache 1h
```

**Monitoring de base**
```javascript
// Vercel Analytics (gratuit, intégré)
import { Analytics } from "@vercel/analytics/react";
// Ajoute <Analytics /> dans app/layout.js

// Logger structuré pour le backend
const log = (level, message, data = {}) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level, message, ...data
  }));
};

log("info", "Prédiction effectuée", { modelId: "v2", confidence: 0.94 });
```

**Checklist avant mise en production**
- ✅ Variables d'env définies (pas .env committé)
- ✅ HTTPS activé
- ✅ Gestion des erreurs (try/catch + pages 404/500)
- ✅ Limites de rate sur l'API
- ✅ Tests passent (CI/CD vérifié)
- ✅ README à jour avec URL de démo
