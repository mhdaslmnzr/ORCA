#!/usr/bin/env python3
"""
Simple test script for ORCA Backend API
Run this to verify all endpoints are working
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_endpoint(endpoint, method="GET", data=None):
    """Test a single API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        else:
            print(f"❌ Unknown method: {method}")
            return False
            
        if response.status_code == 200:
            print(f"✅ {method} {endpoint} - SUCCESS")
            return True
        else:
            print(f"❌ {method} {endpoint} - FAILED (Status: {response.status_code})")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"❌ {method} {endpoint} - CONNECTION ERROR (Is the backend running?)")
        return False
    except Exception as e:
        print(f"❌ {method} {endpoint} - ERROR: {str(e)}")
        return False

def test_mock_data():
    """Test mock data endpoints"""
    print("\n🔍 Testing Mock Data Endpoints...")
    
    # Test equipment status
    test_endpoint("/api/mock/equipment")
    
    # Test equipment summary
    test_endpoint("/api/mock/summary")
    
    # Test sensor data for first equipment
    test_endpoint("/api/mock/sensor-data/EQ001")
    
    # Test simulation
    test_endpoint("/api/mock/simulate", "POST")

def test_ml_endpoints():
    """Test ML prediction endpoints"""
    print("\n🤖 Testing ML Prediction Endpoints...")
    
    # Sample sensor data
    sample_data = {
        "op_setting_1": 0.0,
        "op_setting_2": 0.0,
        "op_setting_3": 0.0,
        "sensor_2": 518.67,
        "sensor_3": 642.0,
        "sensor_4": 1488.0,
        "sensor_6": 1.3,
        "sensor_7": 554.36,
        "sensor_8": 2388.0,
        "sensor_9": 9046.0,
        "sensor_11": 47.0,
        "sensor_12": 521.0,
        "sensor_13": 2388.0,
        "sensor_14": 8138.0,
        "sensor_15": 8.4,
        "sensor_17": 2388.0,
        "sensor_20": 2388.0,
        "sensor_21": 100.0
    }
    
    # Test basic RUL prediction
    test_endpoint("/api/predict-rul", "POST", sample_data)
    
    # Test multi-model prediction
    test_endpoint("/api/predict-rul-multi", "POST", sample_data)
    
    # Test maintenance tasks
    test_endpoint("/api/maintenance-tasks", "POST", sample_data)

def test_ai_endpoints():
    """Test AI chatbot endpoints"""
    print("\n🧠 Testing AI Endpoints...")
    
    # Test chat
    chat_data = {
        "message": "What maintenance should I do for my equipment?",
        "equipment_id": "EQ001"
    }
    test_endpoint("/api/chat", "POST", chat_data)

def test_info_endpoints():
    """Test information endpoints"""
    print("\n📋 Testing Information Endpoints...")
    
    # Test root
    test_endpoint("/")
    
    # Test health
    test_endpoint("/api/health")
    
    # Test models info
    test_endpoint("/api/models")

def main():
    """Run all tests"""
    print("🚀 ORCA Backend API Test Suite")
    print("=" * 50)
    
    # Check if backend is running
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running and accessible")
        else:
            print("❌ Backend responded but with error status")
            return
    except:
        print("❌ Backend is not running or not accessible")
        print("   Please start the backend with: python -m uvicorn main:app --reload")
        return
    
    # Run all tests
    test_info_endpoints()
    test_mock_data()
    test_ml_endpoints()
    test_ai_endpoints()
    
    print("\n" + "=" * 50)
    print("🎯 Test Suite Complete!")
    print("\nNext steps:")
    print("1. Start the frontend: cd frontend && npm run dev")
    print("2. Open http://localhost:3000 in your browser")
    print("3. Test the enhanced PREDATOR dashboard")

if __name__ == "__main__":
    main()
