import os
import json
import joblib
import numpy as np
from google import genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Paths for your predictive maintenance model files
MODEL_PATH = os.path.join(BASE_DIR, "models", "models", "FD001_XGBoostRegressor.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scalers", "scalers", "FD001_MinMaxScaler.pkl")
FEATURES_PATH = os.path.join(BASE_DIR, "meta", "meta", "FD001_features.json")

# Load ML model, scaler and features
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
with open(FEATURES_PATH, "r") as f:
    features = json.load(f)["features"]

def preprocess_input(input_dict):
    input_values = [input_dict.get(feat, 0.0) for feat in features]
    input_array = np.array(input_values).reshape(1, -1)
    scaled = scaler.transform(input_array)
    return scaled

def predict_rul(input_dict):
    X = preprocess_input(input_dict)
    pred = model.predict(X)
    return float(pred[0])

# Initialize Gemini client (it uses GEMINI_API_KEY from environment automatically)
client = genai.Client()

def get_gemini_response(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",  # change to your desired Gemini model
        contents=prompt
    )
    return response.text

def generate_orca_report(sensor_data: dict, rul: float) -> str:
    """
    Create a prompt incorporating sensor data and RUL to ask Gemini for a
    maintenance/compliance report.
    """
    # Create simple sensor summary - customize as needed
    sensor_summary = ", ".join([f"{k}: {v}" for k, v in sensor_data.items()])
    
    prompt = (
        f"You are an operational risk and compliance AI assistant. "
        f"The current sensor readings are: {sensor_summary}. "
        f"The predicted Remaining Useful Life (RUL) of the equipment is {rul:.2f} cycles. "
        "Based on this data, generate an actionable maintenance recommendation, "
        "risk assessment, and compliance reminder for the operations team."
    )
    
    # Get Gemini LLM response
    report = get_gemini_response(prompt)
    
    return report
