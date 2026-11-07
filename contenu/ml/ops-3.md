Un modèle se dégrade silencieusement : le monde change, pas lui.

**Data drift** : la distribution des entrées change (nouveaux comportements clients, saisonnalité, crise). Détection : tests statistiques (Kolmogorov-Smirnov), distance de population (PSI).

**Concept drift** : la relation X→y elle-même change (ex. fraude : les fraudeurs s'adaptent). Plus sournois — détectable seulement quand les vraies étiquettes arrivent.

**Que monitorer en production** :
- Distribution des features d'entrée vs entraînement
- Distribution des prédictions (un classifieur qui prédit soudain 90% de positifs = alerte)
- Métriques métier réelles dès que les labels arrivent
- Latence, taux d'erreur, coûts

**Boucle de ré-entraînement** : déclenchée par calendrier ou par alerte de drift, avec validation automatique avant remplacement du modèle (champion/challenger).

Outils : Evidently, Grafana, MLflow, alerting Slack/PagerDuty.
