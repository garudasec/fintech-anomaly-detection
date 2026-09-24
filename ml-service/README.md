# Fintech Transaction Anomaly Detection ML Service

## Overview & Purpose

This Python ML service is built as part of the **Automated Anomaly Detection System for Financial Transaction Streams** project. It provides an unsupervised Machine Learning microservice built with **FastAPI**, **Pandas**, and **scikit-learn (Isolation Forest)** to evaluate financial transaction streams for behavioral anomalies.

> **Disclaimer**: This system is an anomaly detection prototype designed for educational/academic project demonstration. It evaluates statistical and behavioral deviations and is not a calibrated production fraud decision engine. `anomalyScore` represents a normalized anomaly measure in `[0, 1]`, NOT a calibrated fraud probability.

---

## Architecture & Data Flow

```
+-------------------+           +-----------------------+           +----------------------+
|   React Client    |  <----->  | Node.js / Express     |  <----->  |  Python ML Service   |
|   (Frontend)      |           | Backend (MongoDB)     |           |  (FastAPI + sklearn) |
+-------------------+           +-----------------------+           +----------------------+
                                            |                                  |
                                   Stores Transactions                Isolation Forest
                                   Source of Truth                     Inference Engine
```

The Express backend retrieves transaction data and optional historical user transactions from MongoDB and invokes the ML service. The ML service analyzes behavioral features and returns normalized anomaly scores, risk levels, and explainable signals, which the backend can store directly via `POST /api/transactions/:id/analysis`.

---

## Technical Stack

- **Python**: 3.10+
- **FastAPI**: Lightweight, high-performance web framework
- **scikit-learn**: Isolation Forest unsupervised anomaly detection
- **Pandas & NumPy**: Data processing and statistical feature engineering
- **Uvicorn**: ASGI server implementation
- **Pydantic v2**: Strict input validation and serialization

---

## Directory Structure

```
ml-service/
├── app.py              # FastAPI application, endpoint routes, security & error handlers
├── model.py            # Isolation Forest model lifecycle, scoring, risk mapping & signal logic
├── preprocessing.py    # Feature engineering, timestamp validation, and chronological training features
├── test_service.py     # Comprehensive automated test suite
├── requirements.txt    # Python package dependencies
├── .env.example        # Environment variable configuration template
└── README.md           # Comprehensive service documentation
```

---

## Installation & Setup

### 1. Prerequisites
Ensure Python 3.10+ and `pip` are installed on your machine.

### 2. Create Virtual Environment
```bash
cd ml-service
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update parameters such as `PORT`, `ML_SERVICE_SECRET`, and risk thresholds as needed.

---

## How to Run & Test

### Run Development Server:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### Run Automated Test Suite:
```bash
python3 test_service.py
```

The API documentation will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## API Documentation

### 1. Health Check
- **Endpoint**: `GET /health` or `GET /api/health`
- **Authentication**: None required
- **Description**: Returns operational status and current model state.

#### Sample Response:
```json
{
  "status": "ok",
  "model": {
    "is_trained": true,
    "is_synthetic_baseline": true,
    "trained_at": "2026-09-24T10:00:00+00:00",
    "sample_count": 500,
    "hyperparameters": {
      "n_estimators": 100,
      "contamination": 0.05,
      "random_state": 42
    },
    "risk_thresholds": {
      "low": 0.35,
      "medium": 0.60,
      "high": 0.80
    }
  }
}
```

---

### 2. Analyze Transaction
- **Endpoint**: `POST /analyze` or `POST /api/analyze`
- **Authentication**: Optional Header `x-ml-secret: <ML_SERVICE_SECRET>`
- **Description**: Evaluates a target transaction against user history and baseline patterns.

#### Sample Request:
```json
{
  "transaction": {
    "transactionId": "TXN-984123",
    "userId": "USER-402",
    "amount": 2450.00,
    "currency": "USD",
    "transactionTime": "2026-09-24T03:15:00Z",
    "location": {
      "city": "Tokyo",
      "country": "Japan",
      "countryCode": "JP"
    },
    "channel": "wire",
    "merchant": "International Electronics Store"
  },
  "history": [
    {
      "amount": 45.00,
      "transactionTime": "2026-09-20T14:30:00Z",
      "location": { "city": "New York", "country": "United States", "countryCode": "US" },
      "channel": "card",
      "merchant": "Coffee Shop"
    }
  ]
}
```

#### Sample Response (Matching Express Backend Contract):
```json
{
  "anomalyScore": 0.8549,
  "riskLevel": "critical",
  "signals": [
    {
      "kind": "amount_dev",
      "label": "Historical Amount Deviation",
      "weight": 0.95,
      "detail": "Transaction amount ($2450.00) differs significantly from user's historical average ($45.00)."
    },
    {
      "kind": "location_new",
      "label": "Unseen Transaction Location",
      "weight": 0.75,
      "detail": "Location 'Tokyo, Japan' has not appeared in user's historical transactions."
    },
    {
      "kind": "channel_unusual",
      "label": "Unusual Payment Channel",
      "weight": 0.65,
      "detail": "Channel 'wire' is different from user's standard payment methods."
    },
    {
      "kind": "time_pattern",
      "label": "Unusual Transaction Time",
      "weight": 0.60,
      "detail": "Transaction initiated during off-peak hours (3:00 UTC)."
    }
  ]
}
```

---

### 3. Model Re-Training
- **Endpoint**: `POST /train` or `POST /api/train`
- **Authentication**: Header `x-ml-secret: <ML_SERVICE_SECRET>`
- **Description**: Re-fits the Isolation Forest model on a batch of transaction records using chronological per-user historical feature construction.

---

## Machine Learning Details

### Model: Isolation Forest
We use scikit-learn's `IsolationForest` algorithm, an unsupervised anomaly detection technique that isolates anomalies by randomly selecting a feature and randomly selecting a split value between the maximum and minimum values of the selected feature.

### Behavioral Features Used
1. `amount`: Raw transaction numerical amount
2. `log_amount`: `log(1 + amount)` to stabilize high-variance transactions
3. `hour`: Hour of transaction (0–23 UTC)
4. `day_of_week`: Day of week (0–6, Mon–Sun)
5. `user_tx_count`: Number of past transactions supplied in history
6. `user_mean_amount`: Historical mean transaction amount for user
7. `user_std_amount`: Historical standard deviation of user amounts
8. `amount_dev_from_mean`: `amount - user_mean_amount`
9. `amount_zscore`: `(amount - user_mean_amount) / user_std_amount` (when std > 0)
10. `is_new_location`: Binary flag (1 if location unseen in history, else 0)
11. `is_new_channel`: Binary flag (1 if payment channel unseen in history, else 0)

---

## Training vs. Inference Feature Consistency

When training on a batch of transactions (`POST /train`), the service constructs historical context **chronologically**:
1. Transactions are sorted by `transactionTime`.
2. For each transaction $T_i$ of a user, historical context consists strictly of transactions of the same user occurring *before* $T_i$'s timestamp.
3. This prevents future data leakage and current transaction self-leakage during training, ensuring identical feature semantics during model fitting and real-time prediction.

---

## Anomaly Score Normalization

Scikit-learn's `decision_function(X)` returns raw decision scores $s$, where $s > 0$ indicates inliers (normal) and $s < 0$ indicates outliers (anomalous).

To provide a normalized score strictly bounded between `0` and `1`, we apply a deterministic sigmoid transformation:

$$\text{anomalyScore} = \frac{1}{1 + e^{10 \cdot s}}$$

---

## Risk Level Thresholds

Risk levels are mapped deterministically from `anomalyScore`:

| Anomaly Score Range | Risk Level | Description |
|---------------------|------------|-------------|
| `0.00` – `0.34` | `low` | Typical transaction behavior |
| `0.35` – `0.59` | `medium` | Mild deviation from baseline patterns |
| `0.60` – `0.79` | `high` | Significant behavioral deviation or unseen features |
| `0.80` – `1.00` | `critical` | Severe multi-feature anomaly |

Thresholds can be adjusted dynamically in `.env` via `RISK_THRESHOLD_LOW`, `RISK_THRESHOLD_MEDIUM`, and `RISK_THRESHOLD_HIGH`.

---

## Limitations & Disclaimer

1. **Unsupervised Prototype**: The model measures behavioral outlier distance rather than supervised fraud probability.
2. **Synthetic Startup Baseline**: Upon initialization, the model loads a synthetic development baseline so the service is operational out-of-the-box. Use `POST /train` to re-fit on real transaction data.
3. **Scope**: Built for a 3rd-semester college project demonstration.
