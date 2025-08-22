from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import json
from services import (
    predict_rul_multi_model, 
    predict_rul, 
    generate_orca_report,
    generate_maintenance_tasks,
    chat_with_ai,
    analyze_uploaded_data
)
from mock_data_service import (
    get_mock_equipment_status,
    get_mock_sensor_data,
    get_mock_equipment_summary,
    simulate_mock_update
)

app = FastAPI(
    title="ORCA Predictive Maintenance API",
    description="AI-powered predictive maintenance with multi-model support and intelligent task planning",
    version="2.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SensorData(BaseModel):
    op_setting_1: float = 0.0
    op_setting_2: float = 0.0
    op_setting_3: float = 0.0
    sensor_2: float = 0.0
    sensor_3: float = 0.0
    sensor_4: float = 0.0
    sensor_6: float = 0.0
    sensor_7: float = 0.0
    sensor_8: float = 0.0
    sensor_9: float = 0.0
    sensor_11: float = 0.0
    sensor_12: float = 0.0
    sensor_13: float = 0.0
    sensor_14: float = 0.0
    sensor_15: float = 0.0
    sensor_17: float = 0.0
    sensor_20: float = 0.0
    sensor_21: float = 0.0

class ChatMessage(BaseModel):
    message: str
    equipment_id: Optional[str] = None
    sensor_data: Optional[Dict] = None
    rul: Optional[float] = None

class MaintenanceTask(BaseModel):
    task_name: str
    priority: str
    estimated_time: int
    required_tools: List[str]
    required_parts: List[str]
    step_by_step_instructions: List[str]
    safety_notes: str
    cost_estimate: float
    risk_assessment: str

@app.get("/")
async def root():
    return {
        "message": "ORCA Predictive Maintenance API",
        "version": "2.0.0",
        "status": "operational",
        "models_available": ["XGBoost", "CNN+LSTM", "Attention"],
        "fd_types": ["FD001", "FD002", "FD003", "FD004"]
    }

# Mock Data Endpoints
@app.get("/api/mock/equipment")
async def get_mock_equipment(equipment_id: str = None):
    """Get mock equipment status"""
    try:
        if equipment_id:
            return get_mock_equipment_status(equipment_id)
        else:
            return get_mock_equipment_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/mock/sensor-data/{equipment_id}")
async def get_mock_sensor_data_endpoint(equipment_id: str):
    """Get mock sensor data for equipment"""
    try:
        return get_mock_sensor_data(equipment_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/mock/summary")
async def get_mock_summary():
    """Get mock equipment summary"""
    try:
        return get_mock_equipment_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/mock/simulate")
async def simulate_mock_data():
    """Simulate one time step update"""
    try:
        simulate_mock_update()
        return {"message": "Mock data updated", "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ML Prediction Endpoints
@app.post("/api/predict-rul")
async def predict_rul_endpoint(data: SensorData, fd_id: str = 'FD001'):
    """Get RUL prediction using the best available model (backward compatibility)"""
    input_data = data.dict()
    try:
        rul = predict_rul(input_data, fd_id)
        return {
            "fd_id": fd_id,
            "rul": rul,
            "model_used": "best_available",
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict-rul-multi")
async def predict_rul_multi_endpoint(data: SensorData, fd_id: str = 'FD001'):
    """Get RUL predictions from all available models"""
    input_data = data.dict()
    try:
        predictions = predict_rul_multi_model(input_data, fd_id)
        return {
            "fd_id": fd_id,
            "predictions": predictions,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/predict-with-report")
async def predict_with_report(data: SensorData, fd_id: str = 'FD001'):
    """Get RUL prediction with comprehensive ORCA report"""
    input_data = data.dict()
    try:
        rul = predict_rul(input_data, fd_id)
        report = generate_orca_report(input_data, rul, fd_id)
        return {
            "fd_id": fd_id,
            "rul": rul,
            "maintenance_report": report,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/maintenance-tasks")
async def get_maintenance_tasks(data: SensorData, fd_id: str = 'FD001'):
    """Generate detailed maintenance tasks using AI"""
    input_data = data.dict()
    try:
        # Get predictions from all models
        predictions = predict_rul_multi_model(input_data, fd_id)
        
        # Generate maintenance tasks
        tasks = generate_maintenance_tasks(input_data, predictions, fd_id)
        
        return {
            "fd_id": fd_id,
            "rul_predictions": predictions,
            "maintenance_tasks": tasks,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AI Chatbot Endpoints
@app.post("/api/chat")
async def chat_with_ai_endpoint(chat_data: ChatMessage):
    """AI chatbot for maintenance Q&A"""
    try:
        # Build context
        context = {}
        if chat_data.equipment_id:
            context['equipment_id'] = chat_data.equipment_id
        if chat_data.sensor_data:
            context['sensor_data'] = chat_data.sensor_data
        if chat_data.rul:
            context['rul'] = chat_data.rul
        
        # Get AI response
        response = chat_with_ai(chat_data.message, context)
        
        return {
            "user_message": chat_data.message,
            "ai_response": response,
            "context": context,
            "timestamp": "2024-01-01T00:00:00Z",  # In production, use actual timestamp
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# File Analysis Endpoints
@app.post("/api/analyze-data")
async def analyze_data_endpoint(file: UploadFile = File(...)):
    """Analyze uploaded JSON/CSV data for maintenance insights"""
    try:
        # Read file content
        content = await file.read()
        
        # Determine file type
        file_type = file.filename.split('.')[-1].lower()
        if file_type not in ['json', 'csv']:
            raise HTTPException(status_code=400, detail="Only JSON and CSV files are supported")
        
        # Parse content
        if file_type == 'json':
            data = json.loads(content.decode('utf-8'))
        else:  # CSV
            # Simple CSV parsing - in production, use pandas
            lines = content.decode('utf-8').split('\n')
            headers = lines[0].split(',')
            data = []
            for line in lines[1:]:
                if line.strip():
                    values = line.split(',')
                    row = {}
                    for i, header in enumerate(headers):
                        if i < len(values):
                            try:
                                row[header.strip()] = float(values[i].strip())
                            except:
                                row[header.strip()] = values[i].strip()
                    data.append(row)
        
        # Analyze data
        analysis = analyze_uploaded_data(data, file_type)
        
        return {
            "filename": file.filename,
            "file_type": file_type,
            "analysis": analysis,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Information Endpoints
@app.get("/api/models")
async def get_available_models():
    """Get information about available models"""
    return {
        "models": {
            "FD001": ["XGBoost", "CNN+LSTM", "Attention"],
            "FD002": ["XGBoost", "CNN+LSTM", "Attention"],
            "FD003": ["XGBoost", "CNN+LSTM", "Attention"],
            "FD004": ["XGBoost", "CNN+LSTM", "Attention"]
        },
        "model_types": {
            "XGBoost": "Traditional machine learning with gradient boosting",
            "CNN+LSTM": "Deep learning with convolutional and recurrent networks",
            "Attention": "Advanced deep learning with attention mechanisms"
        },
        "status": "success"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z",
        "version": "2.0.0"
    }
