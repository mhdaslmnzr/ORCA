from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services import predict_rul, generate_orca_report

app = FastAPI(title="ORCA Predictive Maintenance API")

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

@app.post("/predict-with-report")
async def predict_with_report(data: SensorData):
    input_data = data.dict()
    try:
        rul = predict_rul(input_data)
        report = generate_orca_report(input_data, rul)
        return {
            "RUL": rul,
            "Maintenance_Report": report
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
