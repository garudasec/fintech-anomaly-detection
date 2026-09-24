"""
app.py - FastAPI application for Fintech Anomaly Detection ML Service.
"""

import logging
import os
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator

from model import AnomalyDetector
from preprocessing import parse_datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("ml-service")

# Initialize FastAPI app
app = FastAPI(
    title="Fintech Transaction Anomaly Detection ML Service",
    description="Isolation Forest ML service for analyzing financial transactions.",
    version="1.0.0",
)

# Global model detector instance
detector = AnomalyDetector()


# ------------------------------------------------------------------
# SECURITY DEPENDENCY
# ------------------------------------------------------------------
def verify_ml_secret(x_ml_secret: Optional[str] = Header(None, alias="x-ml-secret")):
    """Validates the x-ml-secret header against ML_SERVICE_SECRET environment variable."""
    expected_secret = os.getenv("ML_SERVICE_SECRET")
    if expected_secret and expected_secret.strip():
        if not x_ml_secret or x_ml_secret != expected_secret:
            logger.warning("Unauthorized request attempt: invalid or missing x-ml-secret header")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized: Invalid or missing x-ml-secret header",
            )


# ------------------------------------------------------------------
# PYDANTIC SCHEMAS
# ------------------------------------------------------------------
class SignalSchema(BaseModel):
    kind: str = Field(..., description="Type identifier of the signal")
    label: str = Field(..., description="Human readable signal title")
    weight: float = Field(..., ge=0.0, le=1.0, description="Signal severity weight [0, 1]")
    detail: str = Field(..., description="Explanatory details for the signal")


class TransactionSchema(BaseModel):
    transactionId: Optional[str] = Field(None, description="Unique transaction ID")
    userId: Optional[str] = Field("USER-DEFAULT", description="User ID associated with transaction")
    amount: float = Field(..., description="Transaction amount (must be positive)")
    currency: Optional[str] = Field("USD", description="Currency code")
    transactionTime: Optional[Any] = Field(None, description="ISO timestamp or date string")
    location: Optional[Any] = Field(None, description="Location object or string")
    channel: Optional[str] = Field("card", description="Payment channel (card, wire, transfer, mobile, atm)")
    merchant: Optional[str] = Field("Merchant Store", description="Merchant name")

    @field_validator("amount")
    @classmethod
    def validate_amount(cls, v: float) -> float:
        if v is None or v <= 0:
            raise ValueError("Transaction amount must be a positive number greater than 0.")
        return float(v)

    @field_validator("transactionTime")
    @classmethod
    def validate_transaction_time(cls, v: Any) -> Any:
        if v is not None:
            try:
                parse_datetime(v)
            except ValueError as ve:
                raise ValueError(str(ve))
        return v


class AnalysisRequest(BaseModel):
    transaction: TransactionSchema = Field(..., description="Target transaction to evaluate")
    history: Optional[List[TransactionSchema]] = Field(
        default=[], description="Optional historical transactions for the same user"
    )


class AnalysisResponse(BaseModel):
    anomalyScore: float = Field(..., ge=0.0, le=1.0, description="Normalized anomaly score [0, 1]")
    riskLevel: str = Field(..., description="Risk category: low | medium | high | critical")
    signals: List[SignalSchema] = Field(default=[], description="Detected evidence signals")


class TrainRequest(BaseModel):
    transactions: List[TransactionSchema] = Field(..., description="Batch of transactions to train model")


class HealthResponse(BaseModel):
    status: str
    model: Dict[str, Any]


# ------------------------------------------------------------------
# CUSTOM EXCEPTION HANDLERS
# ------------------------------------------------------------------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Clean validation error response without stack traces."""
    error_messages = []
    for error in exc.errors():
        loc = " -> ".join([str(x) for x in error.get("loc", [])])
        msg = error.get("msg", "Invalid value")
        error_messages.append(f"{loc}: {msg}")

    detail_str = "; ".join(error_messages)
    logger.warning(f"Validation error on {request.url.path}: {detail_str}")
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": f"Validation Error: {detail_str}"},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Unhandled internal server error handler."""
    logger.error(f"Internal server error on {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal ML service error occurred. Please try again later."},
    )


# ------------------------------------------------------------------
# API ENDPOINTS
# ------------------------------------------------------------------
@app.get("/health", response_model=HealthResponse, tags=["Health"])
@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def get_health():
    """Health check endpoint. Returns service status and model metadata."""
    return {
        "status": "ok",
        "model": detector.get_status(),
    }


@app.post(
    "/analyze",
    response_model=AnalysisResponse,
    dependencies=[Depends(verify_ml_secret)],
    tags=["Analysis"],
)
@app.post(
    "/api/analyze",
    response_model=AnalysisResponse,
    dependencies=[Depends(verify_ml_secret)],
    tags=["Analysis"],
)
async def analyze_transaction(payload: AnalysisRequest):
    """
    Main Analysis Endpoint.
    Receives target transaction data and optional user history.
    Extracts features, runs Isolation Forest model, normalizes score, maps risk level, and derives signals.
    """
    try:
        tx_dict = payload.transaction.model_dump()
        history_dicts = [h.model_dump() for h in (payload.history or [])]

        result = detector.predict(tx_dict, history_dicts)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to analyze transaction features.",
        )


@app.post(
    "/train",
    dependencies=[Depends(verify_ml_secret)],
    tags=["Training"],
)
@app.post(
    "/api/train",
    dependencies=[Depends(verify_ml_secret)],
    tags=["Training"],
)
async def train_model(payload: TrainRequest):
    """
    Training Endpoint.
    Re-fits the Isolation Forest model on a batch of provided transaction records.
    """
    try:
        tx_dicts = [t.model_dump() for t in payload.transactions]
        status_info = detector.fit(tx_dicts)
        return {
            "status": "success",
            "message": f"Isolation Forest model successfully trained on {len(tx_dicts)} transactions.",
            "model": status_info,
        }
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        logger.error(f"Training failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to train model on provided transactions.",
        )


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("app:app", host=host, port=port, reload=True)
