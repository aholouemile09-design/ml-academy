Le CI/CD (Continuous Integration / Continuous Deployment) automatise les tests et le déploiement à chaque push. Indispensable pour un profil ML Engineer.

**Workflow GitHub Actions pour un projet ML**
```yaml
# .github/workflows/ml-pipeline.yml
name: ML Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t mon-api-ml:${{ github.sha }} .
      - name: Push to ECR
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin $ECR_URI
          docker push $ECR_URI:${{ github.sha }}
```

**Secrets GitHub** : va dans Settings → Secrets → New Repository Secret pour stocker clés AWS, clés API, etc. sans les exposer dans le code.

**Stratégie typique ML** :
1. Push → tests automatiques (pytest)
2. Si tests OK sur main → build image Docker
3. Push image sur ECR
4. Déploiement auto sur EC2/ECS

**Ressource** : GitHub Actions Docs — https://docs.github.com/en/actions
