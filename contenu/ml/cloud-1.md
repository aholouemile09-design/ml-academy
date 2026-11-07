Docker résout le problème "ça marche sur ma machine" : un conteneur embarque ton code + ses dépendances + son environnement d'exécution.

**Concepts clés**
- **Image** : le blueprint (recette) — défini dans un Dockerfile
- **Conteneur** : une instance en cours d'exécution d'une image
- **Registry** : dépôt d'images (Docker Hub, AWS ECR)

**Dockerfile pour une API ML**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY model.pkl .

EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Commandes essentielles**
```bash
docker build -t mon-api-ml:v1 .     # construire l'image
docker run -p 8000:8000 mon-api-ml  # lancer le conteneur
docker ps                            # conteneurs actifs
docker logs <id>                     # voir les logs
docker stop <id>                     # arrêter

# Docker Compose : orchestrer plusieurs services (API + DB)
docker-compose up -d
```

**Multi-stage build** pour réduire la taille de l'image en production :
```dockerfile
FROM python:3.11 AS builder
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
COPY --from=builder /root/.local /root/.local
COPY . .
```

**Ressource** : Docker Docs — https://docs.docker.com/get-started/
