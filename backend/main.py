from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib
import os
import json
from datetime import datetime, timedelta
import random

# Import Gemini AI
try:
    import google.generativeai as genai
    from dotenv import load_dotenv
    load_dotenv()
    
    # Configure Gemini
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=api_key)
    
    # Try to get available models to verify API access
    try:
        available_models = genai.list_models()
        print(f"✅ Available Gemini models: {[model.name for model in available_models]}")
    except Exception as model_error:
        print(f"⚠️ Could not list models: {model_error}")
    
    # Try different model names with fallbacks
    model_names_to_try = ['gemini-1.5-pro', 'gemini-1.0-pro', 'gemini-pro']
    gemini_model = None
    
    for model_name in model_names_to_try:
        try:
            gemini_model = genai.GenerativeModel(model_name)
            print(f"✅ Successfully loaded Gemini model: {model_name}")
            break
        except Exception as model_error:
            print(f"⚠️ Failed to load {model_name}: {model_error}")
            continue
    
    if gemini_model:
        GEMINI_AVAILABLE = True
        print("✅ Gemini Pro API configured successfully")
    else:
        GEMINI_AVAILABLE = False
        print("❌ Could not load any Gemini model")
    
except Exception as e:
    print(f"⚠️ Gemini API not available: {e}")
    GEMINI_AVAILABLE = False
    gemini_model = None

# Import our new mock company data generator
from mock_company import aerotech_industries_mock

app = FastAPI(title="ORCA PREDATOR API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://orca-ochre-chi.vercel.app", "https://vercel.com/mhdaslmnzrs-projects/orca/3oWtXqD5AuhBGdjrwbSB45cfg2iU"],
    allow_origin_regex=r"^https://.*-orca-ochre-chi\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained models (NASA dataset models adapted for manufacturing)
try:
    # Load the available XGBoost models
    xgb_model_fd001 = joblib.load('models/models/FD001_XGBoostRegressor.pkl')
    xgb_model_fd002 = joblib.load('models/models/FD002_XGBoostRegressor.pkl')
    xgb_model_fd003 = joblib.load('models/models/FD003_XGBoostRegressor.pkl')
    xgb_model_fd004 = joblib.load('models/models/FD004_XGBoostRegressor.pkl')
    
    # Use FD001 as the primary model for now
    xgb_model = xgb_model_fd001
    
    print("✅ XGBoost models loaded successfully")
    print(f"   - FD001: {type(xgb_model_fd001).__name__}")
    print(f"   - FD002: {type(xgb_model_fd002).__name__}")
    print(f"   - FD003: {type(xgb_model_fd003).__name__}")
    print(f"   - FD004: {type(xgb_model_fd004).__name__}")
    
except Exception as e:
    print(f"⚠️ Warning: Could not load some models: {e}")
    xgb_model = None
    xgb_model_fd001 = None
    xgb_model_fd002 = None
    xgb_model_fd003 = None
    xgb_model_fd004 = None

# For now, we'll use mock scaler since the original one might not exist
scaler = None

# Mock data storage (will be replaced with real database)
mock_equipment = []
mock_sensor_data = {}
mock_summary = {}

def initialize_mock_data():
    """Initialize mock data using AeroTech Industries generator"""
    global mock_equipment, mock_sensor_data, mock_summary
    
    # Generate equipment data
    mock_equipment = aerotech_industries_mock.generate_equipment_data()
    
    # Generate sensor data for each equipment
    for equipment in mock_equipment:
        equipment_id = equipment['equipment_id']
        mock_sensor_data[equipment_id] = aerotech_industries_mock.generate_sensor_data(
            equipment_id, equipment['name']
        )
    
    # Generate summary data
    mock_summary = aerotech_industries_mock.generate_summary_data()
    
    print(f"✈️ Initialized AeroTech Industries manufacturing unit with {len(mock_equipment)} machines")

# Initialize mock data on startup
initialize_mock_data()

@app.get("/")
async def root():
    return {
        "message": "ORCA PREDATOR API - AeroTech Industries Manufacturing Unit",
        "version": "1.0.0",
        "status": "active",
        "equipment_count": len(mock_equipment)
    }

@app.get("/api/mock/equipment")
async def get_equipment():
    """Get all manufacturing equipment data"""
    return mock_equipment

@app.get("/api/mock/equipment/{equipment_id}")
async def get_equipment_by_id(equipment_id: str):
    """Get specific equipment by ID"""
    equipment = next((eq for eq in mock_equipment if eq['equipment_id'] == equipment_id), None)
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return equipment

@app.get("/api/mock/sensor-data/{equipment_id}")
async def get_sensor_data(equipment_id: str):
    """Get sensor data for specific equipment"""
    if equipment_id not in mock_sensor_data:
        # Generate sensor data on-demand if equipment exists but sensor data is missing
        equipment = next((eq for eq in mock_equipment if eq['equipment_id'] == equipment_id), None)
        if equipment:
            sensor_data = aerotech_industries_mock.generate_sensor_data(
                equipment_id, equipment['name']
            )
            mock_sensor_data[equipment_id] = sensor_data
            return sensor_data
        else:
            available_ids = [eq['equipment_id'] for eq in mock_equipment]
            raise HTTPException(
                status_code=404, 
                detail=f"Equipment {equipment_id} not found. Available equipment IDs: {available_ids[:10]}"
            )
    return mock_sensor_data[equipment_id]

@app.get("/api/mock/summary")
async def get_summary():
    """Get manufacturing unit summary"""
    return mock_summary

@app.post("/api/mock/simulate")
async def simulate_update():
    """Simulate real-time equipment updates and degradation"""
    global mock_equipment, mock_sensor_data, mock_summary
    
    # Simulate equipment degradation
    mock_equipment = aerotech_industries_mock.simulate_equipment_degradation(mock_equipment)
    
    # Update sensor data with some variation
    for equipment in mock_equipment:
        equipment_id = equipment['equipment_id']
        base_sensor_data = aerotech_industries_mock.generate_sensor_data(
            equipment_id, equipment['name']
        )
        
        # Add some realistic variation to simulate real-time changes
        for sensor, value in base_sensor_data.items():
            if isinstance(value, (int, float)):
                variation = random.uniform(0.95, 1.05)  # ±5% variation
                base_sensor_data[sensor] = round(value * variation, 2)
        
        mock_sensor_data[equipment_id] = base_sensor_data
    
    # Update summary
    mock_summary = aerotech_industries_mock.generate_summary_data()
    
    return {
        "message": "Simulation completed",
        "timestamp": datetime.now().isoformat(),
        "equipment_updated": len(mock_equipment)
    }

@app.post("/api/predict/rul")
async def predict_rul(sensor_data: Dict[str, Any]):
    """Predict Remaining Useful Life using ML models"""
    try:
        # Prepare sensor data for prediction
        sensor_values = []
        sensor_names = []
        
        for sensor, value in sensor_data.items():
            if isinstance(value, (int, float)):
                sensor_values.append(float(value))
                sensor_names.append(sensor)
        
        if len(sensor_values) < 5:
            raise HTTPException(status_code=400, detail="Insufficient sensor data")
        
        # Pad or truncate to match model input size
        target_size = 21  # NASA dataset size
        if len(sensor_values) < target_size:
            # Pad with zeros or repeat values
            sensor_values.extend([0.0] * (target_size - len(sensor_values)))
        elif len(sensor_values) > target_size:
            # Truncate to target size
            sensor_values = sensor_values[:target_size]
        
        # Normalize data
        sensor_array = np.array(sensor_values).reshape(1, -1)
        if scaler:
            sensor_array = scaler.transform(sensor_array)
        
        # Make predictions with different models
        predictions = {}
        
        if xgb_model:
            try:
                xgb_pred = xgb_model.predict(sensor_array)[0]
                predictions["xgboost"] = max(0, int(xgb_pred))
            except:
                predictions["xgboost"] = "Error"
        
        # The original code had CNN-LSTM and CNN-BiLSTM-Attention models commented out.
        # Since they are not loaded, we'll skip them for now.
        
        # Calculate ensemble prediction (average of successful predictions)
        successful_predictions = [v for v in predictions.values() if isinstance(v, int)]
        if successful_predictions:
            ensemble_prediction = int(np.mean(successful_predictions))
        else:
            ensemble_prediction = "No successful predictions"
        
        return {
            "predictions": predictions,
            "ensemble_prediction": ensemble_prediction,
            "sensors_used": sensor_names,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

def generate_mock_maintenance_tasks(equipment_id: str, sensor_data: Dict[str, Any], rul: int) -> List[Dict[str, Any]]:
    """Generates mock maintenance tasks based on equipment ID, sensor data, and RUL."""
    maintenance_tasks = []
    
    if "Test Stand" in equipment_id or "Engine" in equipment_id:
        maintenance_tasks.extend([
            {
                "task": "Check engine mounting bolts and connections",
                "priority": "high" if rul < 1000 else "medium",
                "estimated_duration": "3 hours",
                "required_tools": ["Torque wrench", "Inspection mirror", "Safety harness"],
                "description": "Inspect engine mounting hardware for signs of fatigue and ensure proper torque specifications"
            },
            {
                "task": "Calibrate thrust measurement sensors",
                "priority": "medium",
                "estimated_duration": "2 hours",
                "required_tools": ["Calibration kit", "Reference load cell", "Multimeter"],
                "description": "Verify thrust sensor accuracy and recalibrate if necessary"
            }
        ])
    
    if "CNC" in equipment_id or "Lathe" in equipment_id:
        maintenance_tasks.extend([
            {
                "task": "Inspect spindle bearings and lubrication",
                "priority": "high" if rul < 1000 else "medium",
                "estimated_duration": "4 hours",
                "required_tools": ["Bearing puller", "Precision grease", "Vibration analyzer"],
                "description": "Check bearing condition and replace if showing signs of wear"
            },
            {
                "task": "Calibrate tool positioning system",
                "priority": "medium",
                "estimated_duration": "2 hours",
                "required_tools": ["Calibration ball", "Dial indicator", "Precision square"],
                "description": "Verify tool positioning accuracy and recalibrate if needed"
            }
        ])
    
    if "Assembly Line" in equipment_id or "Robot" in equipment_id:
        maintenance_tasks.extend([
            {
                "task": "Check robotic arm joint lubrication",
                "priority": "medium",
                "estimated_duration": "2 hours",
                "required_tools": ["High-precision grease", "Cleaning supplies", "Safety equipment"],
                "description": "Inspect and lubricate all robotic arm joints for smooth operation"
            },
            {
                "task": "Calibrate vision system and sensors",
                "priority": "medium",
                "estimated_duration": "3 hours",
                "required_tools": ["Calibration targets", "Software tools", "Test fixtures"],
                "description": "Verify vision system accuracy and sensor calibration"
            }
        ])
    
    # Add general aerospace maintenance tasks
    maintenance_tasks.extend([
        {
            "task": "Clean equipment thoroughly",
            "priority": "medium",
            "estimated_duration": "1 hour",
            "required_tools": ["Cleaning supplies", "Safety equipment", "Compressed air"],
            "description": "Perform thorough cleaning following aerospace manufacturing protocols"
        },
        {
            "task": "Update maintenance log and documentation",
            "priority": "low",
            "estimated_duration": "15 minutes",
            "required_tools": ["Maintenance log", "Computer/tablet", "Camera"],
            "description": "Document all maintenance activities and update digital records"
        }
    ])
    
    return maintenance_tasks

@app.post("/api/ai/maintenance-tasks/{equipment_id}")
async def generate_maintenance_tasks(equipment_id: str, equipment_data: Dict[str, Any]):
    """Generate AI-powered maintenance tasks using Gemini Pro API"""
    try:
        sensor_data = equipment_data.get("sensor_data", {})
        rul = equipment_data.get("rul", 0)
        
        if GEMINI_AVAILABLE:
            try:
                # Use Gemini Pro API for intelligent maintenance task generation
                prompt = f"""
                You are ORCA AI, an expert manufacturing maintenance planner for AeroTech Industries aircraft manufacturing unit.
                
                Equipment ID: {equipment_id}
                Sensor Data: {sensor_data}
                RUL (Remaining Useful Life): {rul} hours
                
                Generate 3-5 detailed maintenance tasks with:
                - Task names that are specific and actionable
                - Priority levels (Critical, High, Medium, Low) based on equipment health
                - Estimated time in hours
                - Required tools and parts
                - Step-by-step instructions
                - Safety notes
                - Cost estimates
                - Risk assessment
                
                Format as JSON with these exact fields:
                - task_name, priority, estimated_time, required_tools, required_parts, 
                  step_by_step_instructions, safety_notes, cost_estimate, risk_assessment
                
                Focus on aerospace manufacturing equipment maintenance best practices.
                """
                
                gemini_response = gemini_model.generate_content(prompt).text
                
                # Try to parse Gemini response as JSON, fallback to mock if parsing fails
                try:
                    # Extract JSON from Gemini response (it might include markdown)
                    import re
                    json_match = re.search(r'```json\s*(.*?)\s*```', gemini_response, re.DOTALL)
                    if json_match:
                        json_str = json_match.group(1)
                    else:
                        json_str = gemini_response
                    
                    maintenance_tasks = json.loads(json_str)
                    if isinstance(maintenance_tasks, list):
                        print("✅ Gemini generated maintenance tasks successfully")
                    else:
                        raise ValueError("Gemini response is not a list")
                        
                except Exception as parse_error:
                    print(f"Failed to parse Gemini response: {parse_error}")
                    print(f"Gemini response: {gemini_response}")
                    # Fallback to mock tasks
                    maintenance_tasks = generate_mock_maintenance_tasks(equipment_id, sensor_data, rul)
                    
            except Exception as e:
                print(f"Gemini API error for maintenance tasks: {e}")
                # Fallback to mock tasks
                maintenance_tasks = generate_mock_maintenance_tasks(equipment_id, sensor_data, rul)
        else:
            # Use mock tasks if Gemini is not available
            maintenance_tasks = generate_mock_maintenance_tasks(equipment_id, sensor_data, rul)
        
        return {
            "equipment_id": equipment_id,
            "maintenance_tasks": maintenance_tasks,
            "total_tasks": len(maintenance_tasks),
            "estimated_total_duration": "8-12 hours",
            "priority_distribution": {
                "high": len([t for t in maintenance_tasks if t["priority"] == "high"]),
                "medium": len([t for t in maintenance_tasks if t["priority"] == "medium"]),
                "low": len([t for t in maintenance_tasks if t["priority"] == "low"])
            },
            "generated_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Maintenance task generation error: {str(e)}")

@app.post("/api/ai/chatbot")
async def ai_chatbot(message: Dict[str, Any]):
    """AI chatbot endpoint for ORCA AI interactions"""
    try:
        user_message = message.get("message", "")
        equipment_context = message.get("equipment_context")
        
        if not GEMINI_AVAILABLE:
            return {
                "response": "Gemini Pro API is not configured. Please check your environment variables.",
                "timestamp": datetime.now().isoformat(),
                "ai_model": "N/A",
                "context": "AeroTech Industries Manufacturing Unit",
                "equipment_context": equipment_context
            }

        if equipment_context:
            # Context-aware responses when equipment is selected
            try:
                # Use Gemini Pro API for intelligent responses
                prompt = f"""
                You are ORCA AI, an intelligent manufacturing maintenance assistant for AeroTech Industries aircraft manufacturing unit.
                
                Context: User is asking about equipment {equipment_context}
                User Question: {user_message}
                
                Provide a helpful, professional response about:
                - Equipment maintenance and health
                - Sensor data analysis
                - Predictive maintenance insights
                - Safety considerations
                - Cost-effective solutions
                
                Keep response under 200 words and be specific to aerospace manufacturing equipment.
                """
                
                response = gemini_model.generate_content(prompt).text
                
            except Exception as e:
                print(f"Gemini API error: {e}")
                # Fallback to mock responses
                if "maintenance" in user_message.lower():
                    response = f"I can help you with maintenance for equipment {equipment_context}. Would you like me to generate a maintenance task list or check the current health status?"
                elif "health" in user_message.lower() or "status" in user_message.lower():
                    response = f"Equipment {equipment_context} is currently being monitored. I can show you detailed sensor data, health metrics, and RUL predictions. What specific information do you need?"
                elif "sensor" in user_message.lower():
                    response = f"I'm monitoring real-time sensor data for {equipment_context}. I can analyze temperature, vibration, pressure, and other metrics to identify potential issues."
                else:
                    response = f"I'm here to help with equipment {equipment_context}. I can assist with maintenance planning, health monitoring, sensor analysis, and predictive insights. What would you like to know?"
        else:
            # General responses when no equipment is selected
            try:
                # Use Gemini Pro API for intelligent responses
                prompt = f"""
                You are ORCA AI, an intelligent manufacturing maintenance assistant for AeroTech Industries aircraft manufacturing unit.
                
                User Question: {user_message}
                
                Provide a helpful, professional response about:
                - Manufacturing equipment monitoring
                - Maintenance planning and scheduling
                - Production optimization
                - Quality control
                - General manufacturing insights
                
                Keep response under 200 words and be specific to aerospace manufacturing.
                """
                
                response = gemini_model.generate_content(prompt).text
                
            except Exception as e:
                print(f"Gemini API error: {e}")
                # Fallback to mock responses
                if "maintenance" in user_message.lower():
                    response = "I can help you with maintenance scheduling, equipment health monitoring, and predictive maintenance insights. Please select an equipment first to get specific recommendations."
                elif "equipment" in user_message.lower():
                    response = "I'm monitoring 25 manufacturing machines across material processing, component fabrication, aircraft assembly, engine testing, and final inspection. Please select an equipment to get detailed information."
                elif "health" in user_message.lower() or "status" in user_message.lower():
                    response = "Current equipment health overview: Most machines are operating within normal parameters. I've identified a few that need attention. Please select an equipment to see detailed health metrics."
                elif "production" in user_message.lower():
                    response = "Production is running at 92% efficiency today. We've completed 48 aircraft components with a quality score of 95.2%. How can I help optimize production further?"
                elif "alert" in user_message.lower():
                    response = "I'm monitoring 5 active alerts. The most critical is the Engine Test Stand #2 temperature variance. Please select an equipment to see detailed alerts and recommendations."
                else:
                    response = "I'm ORCA AI, your manufacturing intelligence assistant. I can help with equipment monitoring, maintenance planning, production optimization, and quality control. Please select an equipment first to get specific insights."
        
        return {
            "response": response,
            "timestamp": datetime.now().isoformat(),
            "ai_model": "ORCA AI (Gemini Pro)",
            "context": "AeroTech Industries Manufacturing Unit",
            "equipment_context": equipment_context
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")

@app.post("/api/ai/analyze-file")
async def analyze_file(file_data: Dict[str, Any]):
    """Analyze uploaded sensor data files for predictive maintenance insights"""
    try:
        # This would process uploaded JSON/CSV files
        # For now, return mock analysis
        
        file_type = file_data.get("file_type", "json")
        sensor_data = file_data.get("sensor_data", {})
        
        # Mock analysis results
        analysis_results = {
            "file_analyzed": True,
            "file_type": file_type,
            "sensors_detected": len(sensor_data),
            "anomalies_found": random.randint(0, 3),
            "health_score": round(random.uniform(75, 95), 1),
            "recommendations": [
                "Schedule preventive maintenance within 2 weeks",
                "Monitor temperature sensors more closely",
                "Check motor vibration patterns"
            ],
            "predicted_rul": random.randint(500, 2000),
            "analysis_timestamp": datetime.now().isoformat()
        }
        
        return analysis_results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File analysis error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("✈️ Starting ORCA PREDATOR API - AeroTech Industries Manufacturing Unit")
    print("=" * 70)
    uvicorn.run(app, host="0.0.0.0", port=8000)
