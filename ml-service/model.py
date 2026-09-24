"""
model.py - Isolation Forest model wrapper, scoring, risk mapping, and signal generation.
"""

from datetime import datetime, timezone
import os
from typing import Any, Dict, List, Optional, Tuple

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

from preprocessing import (
    FEATURE_NAMES,
    extract_features,
    extract_features_batch,
)


class AnomalyDetector:
    """
    ML Anomaly Detector using scikit-learn Isolation Forest.

    Provides model lifecycle management:
    - Baseline synthetic initialization & fitting
    - Chronological batch model re-training
    - Prediction and raw score normalization
    - Configurable risk level mapping
    - Explainable signal generation based on feature deviations
    """

    def __init__(self):
        # Load hyperparameters from environment variables with sensible defaults
        self.n_estimators = int(os.getenv("IFOREST_N_ESTIMATORS", "100"))
        self.contamination = float(os.getenv("IFOREST_CONTAMINATION", "0.05"))
        self.random_state = int(os.getenv("IFOREST_RANDOM_STATE", "42"))

        # Thresholds for risk mapping
        self.threshold_low = float(os.getenv("RISK_THRESHOLD_LOW", "0.35"))
        self.threshold_medium = float(os.getenv("RISK_THRESHOLD_MEDIUM", "0.60"))
        self.threshold_high = float(os.getenv("RISK_THRESHOLD_HIGH", "0.80"))

        # Model instance & state metadata
        self.model: Optional[IsolationForest] = None
        self.is_fitted: bool = False
        self.training_sample_count: int = 0
        self.last_trained_at: Optional[str] = None
        self.is_synthetic_baseline: bool = True

        # Pre-fit on synthetic development baseline transaction data upon initialization
        self.fit_baseline()

    def fit_baseline(self, n_samples: int = 500) -> None:
        """
        Fits the Isolation Forest on a realistic synthetic baseline dataset of transactions.
        
        NOTE: This is a synthetic development baseline to ensure the service is immediately
        operational upon startup for demonstration purposes. It is NOT a model trained on
        real production financial data. Call POST /train to re-fit on actual project transaction data.
        """
        np.random.seed(self.random_state)

        # Generate realistic synthetic baseline features
        amounts = np.random.exponential(scale=75.0, size=n_samples) + 5.0
        log_amounts = np.log1p(amounts)

        raw_p = np.array([
            0.01, 0.01, 0.01, 0.01, 0.01, 0.02, 0.03, 0.05,
            0.07, 0.08, 0.08, 0.08, 0.08, 0.07, 0.07, 0.07,
            0.06, 0.05, 0.04, 0.03, 0.02, 0.02, 0.01, 0.01
        ])
        norm_p = raw_p / np.sum(raw_p)

        hours = np.random.choice(range(24), size=n_samples, p=norm_p)
        days = np.random.randint(0, 7, size=n_samples)

        user_tx_counts = np.random.randint(5, 50, size=n_samples).astype(float)
        user_mean_amounts = np.random.uniform(40.0, 150.0, size=n_samples)
        user_std_amounts = np.random.uniform(10.0, 50.0, size=n_samples)

        amount_devs = amounts - user_mean_amounts
        z_scores = amount_devs / user_std_amounts

        is_new_locations = np.random.choice([0.0, 1.0], size=n_samples, p=[0.95, 0.05])
        is_new_channels = np.random.choice([0.0, 1.0], size=n_samples, p=[0.95, 0.05])

        X_baseline = pd.DataFrame({
            "amount": amounts,
            "log_amount": log_amounts,
            "hour": hours,
            "day_of_week": days,
            "user_tx_count": user_tx_counts,
            "user_mean_amount": user_mean_amounts,
            "user_std_amount": user_std_amounts,
            "amount_dev_from_mean": amount_devs,
            "amount_zscore": z_scores,
            "is_new_location": is_new_locations,
            "is_new_channel": is_new_channels,
        })[FEATURE_NAMES]

        self.model = IsolationForest(
            n_estimators=self.n_estimators,
            contamination=self.contamination,
            random_state=self.random_state,
            n_jobs=-1,
        )
        self.model.fit(X_baseline)
        self.is_fitted = True
        self.training_sample_count = n_samples
        self.last_trained_at = datetime.now(timezone.utc).isoformat()
        self.is_synthetic_baseline = True

    def fit(self, transactions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Re-fits the Isolation Forest model on user-provided training transactions
        using chronological historical feature extraction.
        """
        if not transactions or len(transactions) < 5:
            raise ValueError("Training requires at least 5 valid transactions.")

        X_train = extract_features_batch(transactions)

        self.model = IsolationForest(
            n_estimators=self.n_estimators,
            contamination=self.contamination,
            random_state=self.random_state,
            n_jobs=-1,
        )
        self.model.fit(X_train)
        self.is_fitted = True
        self.training_sample_count = len(transactions)
        self.last_trained_at = datetime.now(timezone.utc).isoformat()
        self.is_synthetic_baseline = False

        return self.get_status()

    def normalize_raw_score(self, raw_decision_score: float) -> float:
        """
        Converts scikit-learn IsolationForest decision_function raw score into a normalized [0, 1] anomaly score.

        Formula:
            anomalyScore = 1 / (1 + exp(10 * s))
        where s is the raw decision_function score.
        In scikit-learn:
            s > 0  => inlier / normal
            s = 0  => decision boundary
            s < 0  => outlier / anomalous

        Note: anomalyScore represents a normalized anomaly/deviation metric, NOT a calibrated fraud probability.
        """
        score = 1.0 / (1.0 + np.exp(10.0 * raw_decision_score))
        return float(np.clip(score, 0.0, 1.0))

    def map_risk_level(self, anomaly_score: float) -> str:
        """
        Maps normalized anomaly score [0, 1] into a discrete risk level.
        Thresholds are configurable via environment variables.
        """
        if anomaly_score < self.threshold_low:
            return "low"
        elif anomaly_score < self.threshold_medium:
            return "medium"
        elif anomaly_score < self.threshold_high:
            return "high"
        else:
            return "critical"

    def generate_signals(
        self,
        transaction: Dict[str, Any],
        history: Optional[List[Dict[str, Any]]],
        feature_dict: Dict[str, float],
        anomaly_score: float,
    ) -> List[Dict[str, Any]]:
        """
        Derives genuine explainable signals from model features and historical comparison.
        Returns empty list [] if no specific pattern is established or anomaly score is low.
        """
        signals = []
        amount = feature_dict["amount"]
        user_mean = feature_dict["user_mean_amount"]
        z_score = feature_dict["amount_zscore"]
        is_new_loc = feature_dict["is_new_location"]
        is_new_chan = feature_dict["is_new_channel"]
        hour = feature_dict["hour"]

        # Extract transaction currency (defaults to USD if not specified)
        raw_curr = transaction.get("currency")
        currency = str(raw_curr).strip().upper() if raw_curr and str(raw_curr).strip() else "USD"

        # Signal 1: Deviation from historical amount pattern
        if history and user_mean > 0:
            if z_score >= 2.0 or (user_mean > 0 and amount >= 3.0 * user_mean):
                weight = float(np.clip(round(max(0.60, z_score / 4.0), 2), 0.60, 0.95))
                signals.append({
                    "kind": "amount_dev",
                    "label": "Historical Amount Deviation",
                    "weight": weight,
                    "detail": f"Transaction amount ({currency} {amount:.2f}) differs significantly from user's historical average ({currency} {user_mean:.2f}).",
                })

        # Signal 2: Unusually high transaction amount (global high value)
        if amount >= 5000.0 and anomaly_score >= 0.50:
            weight = float(np.clip(round(amount / 10000.0, 2), 0.65, 0.95))
            signals.append({
                "kind": "large_amount",
                "label": "High Transaction Value",
                "weight": weight,
                "detail": f"Transaction amount of {currency} {amount:.2f} exceeds high-risk value threshold.",
            })

        # Signal 3: Unseen location relative to user history
        if history and is_new_loc == 1.0:
            signals.append({
                "kind": "location_new",
                "label": "Unseen Transaction Location",
                "weight": 0.75,
                "detail": f"Location '{transaction.get('location')}' has not appeared in user's historical transactions.",
            })

        # Signal 4: Unseen channel relative to user history
        if history and is_new_chan == 1.0:
            signals.append({
                "kind": "channel_unusual",
                "label": "Unusual Payment Channel",
                "weight": 0.65,
                "detail": f"Channel '{transaction.get('channel')}' is different from user's standard payment methods.",
            })

        # Signal 5: Off-hours transaction (1 AM - 4 AM) with elevated anomaly score
        if (1.0 <= hour <= 4.0) and anomaly_score >= 0.40:
            signals.append({
                "kind": "time_pattern",
                "label": "Unusual Transaction Time",
                "weight": 0.60,
                "detail": f"Transaction initiated during off-peak hours ({int(hour)}:00 UTC).",
            })

        # If anomaly score is low (< threshold_low), return empty signals list
        if anomaly_score < self.threshold_low:
            return []

        return signals

    def predict(
        self, transaction: Dict[str, Any], history: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Main prediction method: extracts features, runs Isolation Forest scoring,
        normalizes anomaly score, maps risk level, and generates explainable signals.
        """
        if not self.is_fitted or self.model is None:
            self.fit_baseline()

        feature_dict, feature_vector = extract_features(transaction, history)
        X = pd.DataFrame([feature_vector], columns=FEATURE_NAMES)

        raw_score = float(self.model.decision_function(X)[0])
        anomaly_score = self.normalize_raw_score(raw_score)
        risk_level = self.map_risk_level(anomaly_score)
        signals = self.generate_signals(transaction, history, feature_dict, anomaly_score)

        return {
            "anomalyScore": round(anomaly_score, 4),
            "riskLevel": risk_level,
            "signals": signals,
        }

    def get_status(self) -> Dict[str, Any]:
        """Returns current model status and metadata."""
        return {
            "is_trained": self.is_fitted,
            "is_synthetic_baseline": self.is_synthetic_baseline,
            "trained_at": self.last_trained_at,
            "sample_count": self.training_sample_count,
            "hyperparameters": {
                "n_estimators": self.n_estimators,
                "contamination": self.contamination,
                "random_state": self.random_state,
            },
            "risk_thresholds": {
                "low": self.threshold_low,
                "medium": self.threshold_medium,
                "high": self.threshold_high,
            },
        }
