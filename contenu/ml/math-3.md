Le ML raisonne sous incertitude : un classifieur ne dit pas "c'est un chat" mais "P(chat) = 0.92".

**Concepts essentiels** :
- Variable aléatoire, espérance E[X], variance Var(X)
- Loi normale 𝒩(μ, σ²) — omniprésente (initialisation des poids, bruit, hypothèses des modèles)
- **Théorème de Bayes** : P(A|B) = P(B|A)P(A) / P(B), base du classifieur Naive Bayes et du raisonnement bayésien

**Statistiques pour évaluer** :
- Moyenne vs médiane (robustesse aux valeurs aberrantes)
- Corrélation ≠ causalité
- Intervalle de confiance : votre accuracy de 94% est-elle significative ou due au hasard ?

**Maximum de vraisemblance** : la plupart des fonctions de coût (entropie croisée, erreur quadratique) dérivent de ce principe — on choisit les paramètres qui rendent les données observées les plus probables.
