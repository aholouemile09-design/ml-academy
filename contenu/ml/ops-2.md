Le pattern le plus courant : exposer le modèle derrière une **API REST**.

```python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
def predict(features: dict):
    X = preprocess(features)
    return {"prediction": model.predict(X).tolist()}
```

**Docker** garantit que l'environnement de production est identique au développement :
```dockerfile
FROM python:3.11-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

**Modes de serving** : temps réel (API), batch (prédictions nocturnes), streaming (Kafka), embarqué (ONNX, quantization pour mobile).

**Considérations** : latence (p95, pas seulement la moyenne), montée en charge, rollback rapide si le nouveau modèle déçoit (déploiement canari, A/B testing).
