"""
test_service.py - Comprehensive test suite for ML Service endpoints and anomaly scoring.
"""

import os
import sys
from fastapi.testclient import TestClient

from app import app
from preprocessing import FEATURE_NAMES, extract_features_batch

client = TestClient(app)


def test_health_endpoint():
    print("Testing GET /health...")
    response = client.get("/health")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data["status"] == "ok"
    assert data["model"]["is_trained"] is True
    assert data["model"]["is_synthetic_baseline"] is True
    print("✓ GET /health PASSED")


def test_normal_transaction():
    print("\nTesting Normal Transaction...")
    payload = {
        "transaction": {
            "transactionId": "TXN-NORMAL-001",
            "userId": "USER-101",
            "amount": 45.0,
            "currency": "USD",
            "transactionTime": "2026-09-24T14:30:00Z",
            "location": {"city": "New York", "country": "United States", "countryCode": "US"},
            "channel": "card",
            "merchant": "Supermarket Grocery",
        },
        "history": [
            {"amount": 50.0, "channel": "card", "location": {"city": "New York", "countryCode": "US"}},
            {"amount": 42.0, "channel": "card", "location": {"city": "New York", "countryCode": "US"}},
            {"amount": 48.0, "channel": "card", "location": {"city": "New York", "countryCode": "US"}},
        ],
    }
    response = client.post("/analyze", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()

    print(f"Normal transaction response: {data}")
    assert "anomalyScore" in data
    assert 0.0 <= data["anomalyScore"] <= 1.0, f"anomalyScore {data['anomalyScore']} out of range [0, 1]"
    assert data["riskLevel"] in ["low", "medium", "high", "critical"]
    assert isinstance(data["signals"], list)
    assert data["riskLevel"] == "low"
    assert len(data["signals"]) == 0
    print("✓ Normal Transaction Test PASSED")


def test_unusual_transaction():
    print("\nTesting Intentionally Unusual Transaction...")
    payload = {
        "transaction": {
            "transactionId": "TXN-ANOMALY-001",
            "userId": "USER-101",
            "amount": 9500.0,
            "currency": "USD",
            "transactionTime": "2026-09-24T03:15:00Z",
            "location": {"city": "Tokyo", "country": "Japan", "countryCode": "JP"},
            "channel": "wire",
            "merchant": "Offshore Luxury Electronics",
        },
        "history": [
            {"amount": 35.0, "channel": "card", "location": {"city": "New York", "countryCode": "US"}},
            {"amount": 40.0, "channel": "card", "location": {"city": "New York", "countryCode": "US"}},
            {"amount": 42.0, "channel": "card", "location": {"city": "New York", "countryCode": "US"}},
        ],
    }
    response = client.post("/analyze", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()

    print(f"Unusual transaction response: {data}")
    assert "anomalyScore" in data
    assert 0.0 <= data["anomalyScore"] <= 1.0, f"anomalyScore {data['anomalyScore']} out of range [0, 1]"
    assert data["riskLevel"] in ["medium", "high", "critical"]
    assert len(data["signals"]) > 0, "Expected signals for unusual transaction"

    for signal in data["signals"]:
        assert "kind" in signal
        assert "label" in signal
        assert "weight" in signal
        assert "detail" in signal
        assert 0.0 <= signal["weight"] <= 1.0

    print("✓ Unusual Transaction Test PASSED")


def test_secret_header_authentication():
    print("\nTesting ML Secret Header Authentication...")
    os.environ["ML_SERVICE_SECRET"] = "test-secret-123"

    payload = {
        "transaction": {
            "amount": 100.0,
            "userId": "U1",
        }
    }

    # Request without secret header should fail (401)
    res_no_header = client.post("/analyze", json=payload)
    assert res_no_header.status_code == 401, f"Expected 401, got {res_no_header.status_code}"

    # Request with wrong secret header should fail (401)
    res_wrong_header = client.post("/analyze", json=payload, headers={"x-ml-secret": "wrong-secret"})
    assert res_wrong_header.status_code == 401, f"Expected 401, got {res_wrong_header.status_code}"

    # Request with correct secret header should succeed (200)
    res_correct_header = client.post("/analyze", json=payload, headers={"x-ml-secret": "test-secret-123"})
    assert res_correct_header.status_code == 200, f"Expected 200, got {res_correct_header.status_code}"

    # Clean up env var
    del os.environ["ML_SERVICE_SECRET"]
    print("✓ Secret Header Authentication Test PASSED")


def test_invalid_requests():
    print("\nTesting Invalid Requests Handling...")

    # Case 1: Missing transaction
    res1 = client.post("/analyze", json={})
    assert res1.status_code == 400, f"Expected 400 for missing transaction, got {res1.status_code}"

    # Case 2: Negative amount
    res2 = client.post(
        "/analyze",
        json={
            "transaction": {
                "amount": -50.0,
                "userId": "U1",
            }
        },
    )
    assert res2.status_code == 400, f"Expected 400 for negative amount, got {res2.status_code}"

    # Case 3: Zero amount
    res3 = client.post(
        "/analyze",
        json={
            "transaction": {
                "amount": 0.0,
                "userId": "U1",
            }
        },
    )
    assert res3.status_code == 400, f"Expected 400 for zero amount, got {res3.status_code}"

    # Case 4: Invalid transactionTime format (should return validation error)
    res4 = client.post(
        "/analyze",
        json={
            "transaction": {
                "amount": 100.0,
                "userId": "U1",
                "transactionTime": "invalid-datetime-string",
            }
        },
    )
    assert res4.status_code == 400, f"Expected 400 for invalid transactionTime, got {res4.status_code}"
    assert "transactionTime" in res4.json()["detail"]

    print("✓ Invalid Requests Test PASSED")


def test_chronological_training_history():
    print("\nTesting Chronological Training Feature Construction...")

    # 3 Transactions for USER-CHRONO sent OUT OF ORDER:
    # Tx Day 3 (amount 300)
    # Tx Day 1 (amount 100)
    # Tx Day 2 (amount 200)
    txs = [
        {
            "transactionId": "TX3",
            "userId": "USER-CHRONO",
            "amount": 300.0,
            "transactionTime": "2026-09-03T10:00:00Z",
            "channel": "card",
            "location": {"city": "New York", "countryCode": "US"},
        },
        {
            "transactionId": "TX1",
            "userId": "USER-CHRONO",
            "amount": 100.0,
            "transactionTime": "2026-09-01T10:00:00Z",
            "channel": "card",
            "location": {"city": "New York", "countryCode": "US"},
        },
        {
            "transactionId": "TX2",
            "userId": "USER-CHRONO",
            "amount": 200.0,
            "transactionTime": "2026-09-02T10:00:00Z",
            "channel": "card",
            "location": {"city": "New York", "countryCode": "US"},
        },
    ]

    df = extract_features_batch(txs)

    # Verify output columns match FEATURE_NAMES exactly
    assert list(df.columns) == FEATURE_NAMES

    # Row 0 corresponds to TX3 (orig_idx = 0). History before Day 3: TX1 (100) and TX2 (200).
    # user_mean_amount for TX3 should be mean(100, 200) = 150.0
    row_tx3 = df.iloc[0]
    assert row_tx3["user_tx_count"] == 2.0
    assert row_tx3["user_mean_amount"] == 150.0
    assert row_tx3["amount_dev_from_mean"] == 150.0  # 300 - 150

    # Row 1 corresponds to TX1 (orig_idx = 1). History before Day 1: None ([]).
    # user_mean_amount for TX1 should be 0.0
    row_tx1 = df.iloc[1]
    assert row_tx1["user_tx_count"] == 0.0
    assert row_tx1["user_mean_amount"] == 0.0

    # Row 2 corresponds to TX2 (orig_idx = 2). History before Day 2: TX1 (100).
    # user_mean_amount for TX2 should be 100.0
    row_tx2 = df.iloc[2]
    assert row_tx2["user_tx_count"] == 1.0
    assert row_tx2["user_mean_amount"] == 100.0

    print("✓ Chronological Training Feature Construction PASSED")


def test_batch_training_endpoint():
    print("\nTesting POST /train Endpoint with Multiple Transactions...")
    training_data = [
        {"transactionId": f"TX-{i}", "userId": f"USER-{i%3}", "amount": 50.0 + i * 5, "transactionTime": f"2026-09-{(i%25)+1:02d}T12:00:00Z"}
        for i in range(10)
    ]

    response = client.post("/train", json={"transactions": training_data})
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()

    assert data["status"] == "success"
    assert data["model"]["is_trained"] is True
    assert data["model"]["is_synthetic_baseline"] is False
    assert data["model"]["sample_count"] == 10
    print("✓ POST /train Endpoint PASSED")


if __name__ == "__main__":
    try:
        test_health_endpoint()
        test_normal_transaction()
        test_unusual_transaction()
        test_secret_header_authentication()
        test_invalid_requests()
        test_chronological_training_history()
        test_batch_training_endpoint()
        print("\n==========================================")
        print("ALL ML SERVICE TESTS PASSED SUCCESSFULLY!")
        print("==========================================")
    except AssertionError as ae:
        print(f"\n❌ TEST FAILED: {ae}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ UNEXPECTED ERROR: {e}")
        sys.exit(1)
