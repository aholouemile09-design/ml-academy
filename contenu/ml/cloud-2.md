AWS est le cloud le plus utilisé en entreprise. Pour un ML Engineer, les services prioritaires sont S3, EC2, Lambda, ECR et SageMaker.

**S3 — stockage objet (données, modèles)**
```python
import boto3

s3 = boto3.client("s3")

# Uploader un modèle
s3.upload_file("model.pkl", "mon-bucket-ml", "models/v1/model.pkl")

# Télécharger des données
s3.download_file("mon-bucket-ml", "data/train.csv", "local/train.csv")

# Lister les fichiers
response = s3.list_objects_v2(Bucket="mon-bucket-ml", Prefix="models/")
```

**EC2 — machines virtuelles** : pour les entraînements GPU (p3.2xlarge, g4dn) ou les APIs.
```bash
# SSH vers une instance EC2
ssh -i ma-cle.pem ubuntu@<ip-publique>
```

**Lambda — fonctions serverless** : idéal pour l'inférence sur des modèles légers, facturation à la requête.

**ECR — Docker Registry AWS** : héberger tes images Docker pour les déployer sur ECS/EKS.

**SageMaker** : service ML géré d'AWS — entraînement, déploiement, monitoring intégrés. Puissant mais coûteux : réserver aux projets production.

**Estimation de coûts** — bonne pratique obligatoire :
```
EC2 t3.medium (dev)  : ~0.05 $/h → ~36 $/mois
EC2 g4dn.xlarge (GPU): ~0.53 $/h → utiliser en spot
S3 (100 GB)          : ~2.30 $/mois
Lambda (1M req)      : ~0.20 $
```

**Ressource** : AWS Skill Builder — https://aws.amazon.com/training/digital/ (gratuit, labs inclus)
