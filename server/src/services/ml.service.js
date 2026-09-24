/**
 * ml.service.js - Node.js service client for communicating with the Python FastAPI ML Service.
 */

const getMlServiceUrl = () => {
  const url = process.env.ML_SERVICE_URL;
  if (!url || !url.trim()) {
    return "http://127.0.0.1:8000";
  }
  return url.trim().replace(/\/+$/, "");
};

/**
 * Sends a transaction and optional historical transactions to the Python ML Service for anomaly analysis.
 *
 * @param {Object} transaction - Target transaction object to evaluate
 * @param {Array} [history=[]] - Array of historical transaction records for the same user
 * @returns {Promise<Object>} ML service response containing { anomalyScore, riskLevel, signals }
 */
export async function analyzeTransaction(transaction, history = []) {
  const baseUrl = getMlServiceUrl();
  const endpoint = `${baseUrl}/api/analyze`;

  const headers = {
    "Content-Type": "application/json",
  };

  const secret = process.env.ML_SERVICE_SECRET;
  if (secret && secret.trim()) {
    headers["x-ml-secret"] = secret.trim();
  }

  const payload = {
    transaction,
    history: Array.isArray(history) ? history : [],
  };

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    throw new Error(
      `ML Service Connection Error: Failed to reach ML service at ${endpoint}. Details: ${networkError.message}`
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    if (!response.ok) {
      throw new Error(
        `ML Service Error (HTTP ${response.status}): Server returned non-JSON error response.`
      );
    }
    throw new Error(`ML Service Error: Failed to parse JSON response. Details: ${parseError.message}`);
  }

  if (!response.ok) {
    const errorMsg = data && (data.detail || data.message) ? (data.detail || data.message) : response.statusText;
    throw new Error(`ML Service HTTP ${response.status} Error: ${errorMsg}`);
  }

  return data;
}

export default {
  analyzeTransaction,
};
