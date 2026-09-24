"""
preprocessing.py - Data preprocessing and feature extraction module for Fintech Anomaly Detection ML Service.
"""

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple
import numpy as np
import pandas as pd


FEATURE_NAMES = [
    "amount",
    "log_amount",
    "hour",
    "day_of_week",
    "user_tx_count",
    "user_mean_amount",
    "user_std_amount",
    "amount_dev_from_mean",
    "amount_zscore",
    "is_new_location",
    "is_new_channel",
]


def parse_datetime(val: Any) -> datetime:
    """
    Parse a datetime string, timestamp, or datetime object into a timezone-aware UTC datetime.
    Raises ValueError if val is invalid or malformed.
    """
    if val is None:
        # Documented deterministic fallback for missing optional timestamp: UTC Epoch (1970-01-01)
        return datetime(1970, 1, 1, 0, 0, 0, tzinfo=timezone.utc)

    if isinstance(val, datetime):
        if val.tzinfo is None:
            return val.replace(tzinfo=timezone.utc)
        return val.astimezone(timezone.utc)

    if isinstance(val, (int, float)):
        if val < 0:
            raise ValueError(f"Invalid negative timestamp value: {val}")
        if val > 1e11:
            val = val / 1000.0
        try:
            return datetime.fromtimestamp(val, tz=timezone.utc)
        except Exception as e:
            raise ValueError(f"Invalid numeric timestamp: {val}") from e

    if isinstance(val, str):
        val_str = val.strip()
        if not val_str:
            return datetime(1970, 1, 1, 0, 0, 0, tzinfo=timezone.utc)
        try:
            clean_str = val_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean_str)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)
        except Exception as e:
            raise ValueError(f"Invalid transactionTime format: '{val}'") from e

    raise ValueError(f"Unsupported transactionTime type: {type(val).__name__}")


def extract_location_key(location: Any) -> str:
    """Normalize location representation to a comparable string key."""
    if isinstance(location, str):
        return location.strip().lower()
    if isinstance(location, dict):
        city = str(location.get("city", "")).strip().lower()
        country_code = str(
            location.get("countryCode") or location.get("country") or ""
        ).strip().lower()
        if city or country_code:
            return f"{city}:{country_code}"
    return "unknown"


def extract_features(
    transaction: Dict[str, Any], history: Optional[List[Dict[str, Any]]] = None
) -> Tuple[Dict[str, float], List[float]]:
    """
    Extract behavioral and statistical features from target transaction and optional history.

    Derived Features:
    1. amount: raw transaction amount
    2. log_amount: log(1 + amount)
    3. hour: transaction hour of day (0-23)
    4. day_of_week: day of week (0-6, Monday=0)
    5. user_tx_count: number of historical transactions supplied
    6. user_mean_amount: mean amount of user's past transactions
    7. user_std_amount: std deviation of user's past transaction amounts
    8. amount_dev_from_mean: amount - user_mean_amount
    9. amount_zscore: (amount - mean) / std if std > 0 else 0.0
    10. is_new_location: 1 if location is unseen in user history, else 0
    11. is_new_channel: 1 if payment channel is unseen in user history, else 0
    """
    amount = float(transaction.get("amount", 0.0))
    if amount < 0:
        amount = 0.0

    log_amount = float(np.log1p(amount))

    tx_time = parse_datetime(transaction.get("transactionTime"))
    hour = float(tx_time.hour)
    day_of_week = float(tx_time.weekday())

    history_list = history or []
    user_tx_count = float(len(history_list))

    user_mean_amount = 0.0
    user_std_amount = 0.0
    amount_dev_from_mean = 0.0
    amount_zscore = 0.0
    is_new_location = 0.0
    is_new_channel = 0.0

    if history_list:
        amounts = [
            float(h.get("amount", 0.0))
            for h in history_list
            if float(h.get("amount", 0.0)) >= 0
        ]
        if amounts:
            user_mean_amount = float(np.mean(amounts))
            user_std_amount = (
                float(np.std(amounts, ddof=1)) if len(amounts) > 1 else 0.0
            )
            amount_dev_from_mean = amount - user_mean_amount
            if user_std_amount > 1e-6:
                amount_zscore = amount_dev_from_mean / user_std_amount

        current_loc = extract_location_key(transaction.get("location"))
        history_locs = {extract_location_key(h.get("location")) for h in history_list}
        if current_loc != "unknown" and current_loc not in history_locs:
            is_new_location = 1.0

        current_channel = str(transaction.get("channel", "")).strip().lower()
        history_channels = {
            str(h.get("channel", "")).strip().lower()
            for h in history_list
            if h.get("channel")
        }
        if current_channel and current_channel not in history_channels:
            is_new_channel = 1.0

    feature_dict = {
        "amount": amount,
        "log_amount": log_amount,
        "hour": hour,
        "day_of_week": day_of_week,
        "user_tx_count": user_tx_count,
        "user_mean_amount": user_mean_amount,
        "user_std_amount": user_std_amount,
        "amount_dev_from_mean": amount_dev_from_mean,
        "amount_zscore": amount_zscore,
        "is_new_location": is_new_location,
        "is_new_channel": is_new_channel,
    }

    feature_vector = [feature_dict[name] for name in FEATURE_NAMES]

    return feature_dict, feature_vector


def extract_features_batch(transactions: List[Dict[str, Any]]) -> pd.DataFrame:
    """
    Extract feature DataFrame for a batch of transactions for training.

    Chronological Feature Construction:
    1. Annotates each transaction with its original list index and parsed timestamp.
    2. Sorts transactions chronologically by parsed timestamp.
    3. Groups transactions by user ID to construct historical context strictly from
       prior transactions (timestamp < current timestamp or prior in sorted sequence).
       Prevents future data leakage and current transaction self-leakage.
    4. For the first transaction of a user, history is empty ([]).
    5. Extracts features for each transaction with its valid historical context.
    6. Re-sorts feature rows back to match the original input transaction order.
    7. Returns DataFrame matching FEATURE_NAMES columns.
    """
    if not transactions:
        return pd.DataFrame(columns=FEATURE_NAMES)

    indexed_txs = []
    for orig_idx, tx in enumerate(transactions):
        try:
            parsed_dt = parse_datetime(tx.get("transactionTime"))
        except Exception:
            parsed_dt = datetime(1970, 1, 1, 0, 0, 0, tzinfo=timezone.utc)
        indexed_txs.append({
            "orig_idx": orig_idx,
            "tx": tx,
            "dt": parsed_dt,
            "user_id": str(tx.get("userId", "DEFAULT_USER")),
        })

    sorted_txs = sorted(indexed_txs, key=lambda x: x["dt"])

    user_histories: Dict[str, List[Dict[str, Any]]] = {}
    extracted_rows: List[Tuple[int, List[float]]] = []

    for item in sorted_txs:
        orig_idx = item["orig_idx"]
        tx = item["tx"]
        u_id = item["user_id"]

        history_so_far = user_histories.get(u_id, [])

        # Extract features for current transaction using strictly past history
        _, feature_vector = extract_features(tx, history=history_so_far)
        extracted_rows.append((orig_idx, feature_vector))

        # Append current transaction to user history AFTER feature extraction (prevents self-leakage)
        if u_id not in user_histories:
            user_histories[u_id] = []
        user_histories[u_id].append(tx)

    # Re-sort to match original input list order
    extracted_rows.sort(key=lambda x: x[0])
    feature_matrix = [row[1] for row in extracted_rows]

    return pd.DataFrame(feature_matrix, columns=FEATURE_NAMES)
