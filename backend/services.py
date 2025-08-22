import os
import json
import joblib
import numpy as np
import tensorflow as tf
from google import genai
from dotenv import load_dotenv
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta

# Load environment variables from .env file
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Model paths for different architectures
MODEL_PATHS = {
    'xgboost': {
        'FD001': os.path.join(BASE_DIR, "models", "models", "FD001_XGBoostRegressor.pkl"),
        'FD002': os.path.join(BASE_DIR, "models", "models", "FD002_XGBoostRegressor.pkl"),
        'FD003': os.path.join(BASE_DIR, "models", "models", "FD003_XGBoostRegressor.pkl"),
        'FD004': os.path.join(BASE_DIR, "models", "models", "FD004_XGBoostRegressor.pkl")
    },
    'cnn_lstm': {
        'FD001': os.path.join(BASE_DIR, "models", "models_deep", "FD001_CNN_LSTM.h5"),
        'FD002': os.path.join(BASE_DIR, "models", "models_deep", "FD002_CNN_LSTM.h5"),
        'FD003': os.path.join(BASE_DIR, "models", "models_deep", "FD003_CNN_LSTM.h5"),
        'FD004': os.path.join(BASE_DIR, "models", "models_deep", "FD004_CNN_LSTM.h5")
    },
    'attention': {
        'FD001': os.path.join(BASE_DIR, "models", "models_attn", "FD001_CNN_BiLSTM_Attn.keras"),
        'FD002': os.path.join(BASE_DIR, "models", "models_attn", "FD002_CNN_BiLSTM_Attn.keras"),
        'FD003': os.path.join(BASE_DIR, "models", "models_attn", "FD003_CNN_BiLSTM_Attn.keras"),
        'FD004': os.path.join(BASE_DIR, "models", "models_attn", "FD004_CNN_BiLSTM_Attn.keras")
    }
}

# Scaler paths
SCALER_PATHS = {
    'FD001': os.path.join(BASE_DIR, "scalers", "scalers", "FD001_MinMaxScaler.pkl"),
    'FD002': os.path.join(BASE_DIR, "scalers", "scalers", "FD002_MinMaxScaler.pkl"),
    'FD003': os.path.join(BASE_DIR, "scalers", "scalers", "FD003_MinMaxScaler.pkl"),
    'FD004': os.path.join(BASE_DIR, "scalers", "scalers", "FD004_MinMaxScaler.pkl")
}

# Feature paths
FEATURE_PATHS = {
    'FD001': os.path.join(BASE_DIR, "meta", "meta", "FD001_features.json"),
    'FD002': os.path.join(BASE_DIR, "meta", "meta", "FD002_features.json"),
    'FD003': os.path.join(BASE_DIR, "meta", "meta", "FD003_features.json"),
    'FD004': os.path.join(BASE_DIR, "meta", "meta", "FD004_features.json")
}

# Load all models, scalers, and features
models = {}
scalers = {}
features = {}

def load_all_models():
    """Load all models, scalers, and features for all FD types"""
    global models, scalers, features
    
    for fd_id in ['FD001', 'FD002', 'FD003', 'FD004']:
        # Load XGBoost models
        try:
            models[f'{fd_id}_xgboost'] = joblib.load(MODEL_PATHS['xgboost'][fd_id])
        except Exception as e:
            print(f"Warning: Could not load XGBoost model for {fd_id}: {e}")
        
        # Load CNN+LSTM models
        try:
            models[f'{fd_id}_cnn_lstm'] = tf.keras.models.load_model(MODEL_PATHS['cnn_lstm'][fd_id])
        except Exception as e:
            print(f"Warning: Could not load CNN+LSTM model for {fd_id}: {e}")
        
        # Load Attention models
        try:
            models[f'{fd_id}_attention'] = tf.keras.models.load_model(MODEL_PATHS['attention'][fd_id])
        except Exception as e:
            print(f"Warning: Could not load Attention model for {fd_id}: {e}")
        
        # Load scalers
        try:
            scalers[fd_id] = joblib.load(SCALER_PATHS[fd_id])
        except Exception as e:
            print(f"Warning: Could not load scaler for {fd_id}: {e}")
        
        # Load features
        try:
            with open(FEATURE_PATHS[fd_id], "r") as f:
                features[fd_id] = json.load(f)["features"]
        except Exception as e:
            print(f"Warning: Could not load features for {fd_id}: {e}")

# Load models on import
load_all_models()

def preprocess_input(input_dict: Dict, fd_id: str = 'FD001') -> np.ndarray:
    """Preprocess input data for prediction"""
    if fd_id not in features:
        raise ValueError(f"Features not found for {fd_id}")
    
    input_values = [input_dict.get(feat, 0.0) for feat in features[fd_id]]
    input_array = np.array(input_values).reshape(1, -1)
    
    if fd_id in scalers:
        scaled = scalers[fd_id].transform(input_array)
        return scaled
    else:
        return input_array

def predict_rul_multi_model(input_dict: Dict, fd_id: str = 'FD001') -> Dict:
    """Get RUL predictions from all available models for a given FD type"""
    results = {}
    
    # XGBoost prediction
    model_key = f'{fd_id}_xgboost'
    if model_key in models:
        try:
            X = preprocess_input(input_dict, fd_id)
            pred = models[model_key].predict(X)
            results['xgboost'] = float(pred[0])
        except Exception as e:
            results['xgboost'] = None
            print(f"XGBoost prediction failed for {fd_id}: {e}")
    
    # CNN+LSTM prediction
    model_key = f'{fd_id}_cnn_lstm'
    if model_key in models:
        try:
            X = preprocess_input(input_dict, fd_id)
            # Reshape for CNN+LSTM (batch_size, timesteps, features)
            X_reshaped = X.reshape(1, 1, X.shape[1])
            pred = models[model_key].predict(X_reshaped)
            results['cnn_lstm'] = float(pred[0][0])
        except Exception as e:
            results['cnn_lstm'] = None
            print(f"CNN+LSTM prediction failed for {fd_id}: {e}")
    
    # Attention prediction
    model_key = f'{fd_id}_attention'
    if model_key in models:
        try:
            X = preprocess_input(input_dict, fd_id)
            # Reshape for attention model (batch_size, timesteps, features)
            X_reshaped = X.reshape(1, 1, X.shape[1])
            pred = models[model_key].predict(X_reshaped)
            results['attention'] = float(pred[0][0])
        except Exception as e:
            results['attention'] = None
            print(f"Attention prediction failed for {fd_id}: {e}")
    
    return results

def get_best_prediction(predictions: Dict) -> Tuple[str, float]:
    """Get the best prediction based on model reliability (XGBoost preferred)"""
    if 'xgboost' in predictions and predictions['xgboost'] is not None:
        return 'xgboost', predictions['xgboost']
    elif 'cnn_lstm' in predictions and predictions['cnn_lstm'] is not None:
        return 'cnn_lstm', predictions['cnn_lstm']
    elif 'attention' in predictions and predictions['attention'] is not None:
        return 'attention', predictions['attention']
    else:
        raise ValueError("No valid predictions available")

def predict_rul(input_dict: Dict, fd_id: str = 'FD001') -> float:
    """Get RUL prediction using the best available model (backward compatibility)"""
    predictions = predict_rul_multi_model(input_dict, fd_id)
    _, best_rul = get_best_prediction(predictions)
    return best_rul

# Initialize Gemini client
client = genai.Client()

def get_gemini_response(prompt: str) -> str:
    """Get response from Gemini Pro API"""
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        return f"AI response error: {str(e)}"

def generate_maintenance_tasks(sensor_data: Dict, rul_predictions: Dict, fd_id: str = 'FD001') -> List[Dict]:
    """Generate detailed maintenance tasks using Gemini Pro API"""
    
    # Create context for the AI
    sensor_summary = ", ".join([f"{k}: {v:.2f}" for k, v in sensor_data.items()])
    rul_summary = ", ".join([f"{model}: {rul:.1f} cycles" for model, rul in rul_predictions.items() if rul is not None])
    
    prompt = f"""
    You are an expert maintenance planner for industrial equipment. 
    
    Equipment Type: {fd_id} (Turbofan Engine)
    Current Sensor Readings: {sensor_summary}
    RUL Predictions: {rul_summary}
    
    Generate 3-5 detailed maintenance tasks with the following structure for each task:
    1. Task Name: Specific maintenance action
    2. Priority: Critical/High/Medium/Low (based on RUL and sensor data)
    3. Estimated Time: Hours required
    4. Required Tools: List of specific tools needed
    5. Required Parts: List of parts that may need replacement
    6. Step-by-Step Instructions: Detailed 5-8 step process
    7. Safety Notes: Important safety considerations
    8. Cost Estimate: Approximate cost in USD
    9. Risk Assessment: What happens if this task is delayed
    
    Format your response as a JSON array with each task as an object containing these fields.
    Be specific and actionable. Consider the sensor readings and RUL predictions when prioritizing tasks.
    """
    
    try:
        response = get_gemini_response(prompt)
        # Try to extract JSON from response
        if '[' in response and ']' in response:
            start = response.find('[')
            end = response.rfind(']') + 1
            json_str = response[start:end]
            tasks = json.loads(json_str)
            return tasks
        else:
            # Fallback: create structured response
            return [{
                "task_name": "AI Analysis Required",
                "priority": "High",
                "estimated_time": 2,
                "required_tools": ["AI Analysis"],
                "required_parts": ["Analysis"],
                "step_by_step_instructions": ["Review AI response", "Extract maintenance tasks"],
                "safety_notes": "AI response needs human review",
                "cost_estimate": 0,
                "risk_assessment": "Manual review required"
            }]
    except Exception as e:
        return [{
            "task_name": "Error in AI Analysis",
            "priority": "High",
            "estimated_time": 1,
            "required_tools": ["Manual Review"],
            "required_parts": ["None"],
            "step_by_step_instructions": ["Review sensor data manually", "Plan maintenance based on RUL"],
            "safety_notes": "Manual assessment required",
            "cost_estimate": 0,
            "risk_assessment": "AI system error - manual intervention needed"
        }]

def generate_orca_report(sensor_data: Dict, rul: float, fd_id: str = 'FD001') -> str:
    """Generate comprehensive ORCA report using Gemini Pro API"""
    
    sensor_summary = ", ".join([f"{k}: {v:.2f}" for k, v in sensor_data.items()])
    
    prompt = f"""
    You are ORCA (Operational Risk & Compliance Assistant), an AI-powered platform for manufacturing and industrial automation.
    
    Equipment: {fd_id} Turbofan Engine
    Current Sensor Readings: {sensor_summary}
    Predicted RUL: {rul:.1f} cycles
    
    Generate a comprehensive, actionable maintenance report that includes:
    
    1. **Equipment Health Summary**: Current status and key concerns
    2. **Risk Assessment**: Probability of failure and operational risks
    3. **Maintenance Recommendations**: Specific actions needed with priorities
    4. **Compliance Notes**: Any regulatory or safety considerations
    5. **Cost-Benefit Analysis**: ROI of recommended maintenance
    6. **Next Steps**: Immediate actions for the operations team
    
    Format as a professional report with clear sections and actionable insights.
    Use technical but understandable language for operations teams.
    """
    
    return get_gemini_response(prompt)

def chat_with_ai(user_message: str, context: Dict = None) -> str:
    """AI chatbot for maintenance Q&A"""
    
    # Build context-aware prompt
    if context:
        equipment_info = f"Equipment: {context.get('equipment_id', 'Unknown')}"
        sensor_data = f"Sensor Data: {context.get('sensor_data', 'Not available')}"
        rul_info = f"RUL: {context.get('rul', 'Not available')} cycles"
        context_str = f"{equipment_info}\n{sensor_data}\n{rul_info}\n\n"
    else:
        context_str = ""
    
    prompt = f"""
    You are ORCA AI, an intelligent maintenance assistant for industrial equipment. 
    You help operations teams with predictive maintenance, equipment analysis, and maintenance planning.
    
    {context_str}
    User Question: {user_message}
    
    Provide a helpful, technical, and actionable response. If the user is asking about:
    - Equipment health: Analyze sensor data and provide insights
    - Maintenance planning: Suggest specific actions with priorities
    - Troubleshooting: Provide step-by-step diagnostic procedures
    - General questions: Be helpful and informative
    
    Keep responses concise but comprehensive. Use bullet points for actionable items.
    """
    
    return get_gemini_response(prompt)

def analyze_uploaded_data(data: Dict, file_type: str = 'json') -> Dict:
    """Analyze uploaded JSON/CSV data for maintenance insights"""
    
    try:
        # Create analysis prompt based on data structure
        if file_type == 'json':
            data_summary = json.dumps(data, indent=2)[:1000]  # Limit length
        else:
            data_summary = str(data)[:1000]
        
        prompt = f"""
        You are ORCA AI, analyzing uploaded {file_type.upper()} data for maintenance insights.
        
        Data Summary: {data_summary}
        
        Provide a comprehensive analysis including:
        1. **Data Quality Assessment**: Is the data complete and reliable?
        2. **Pattern Recognition**: Any trends or anomalies detected?
        3. **Maintenance Insights**: What does this data tell us about equipment health?
        4. **Recommendations**: Specific actions based on this analysis
        5. **Risk Assessment**: Any immediate concerns or warnings?
        
        Format as a structured analysis report with clear sections.
        """
        
        analysis = get_gemini_response(prompt)
        
        return {
            "analysis": analysis,
            "data_summary": data_summary,
            "file_type": file_type,
            "timestamp": datetime.now().isoformat(),
            "status": "success"
        }
        
    except Exception as e:
        return {
            "analysis": f"Error analyzing data: {str(e)}",
            "data_summary": "Error occurred",
            "file_type": file_type,
            "timestamp": datetime.now().isoformat(),
            "status": "error"
        }
