"""
AeroTech Industries Aircraft Manufacturing Unit - Mock Data Generator
Generates realistic manufacturing equipment data for a medium-scale aerospace company
"""

import random
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any
import numpy as np

class AeroTechIndustriesMockData:
    def __init__(self):
        self.equipment_categories = {
            "material_processing": {
                "count": 6,
                "machines": [
                    "Composite Material Mixer #1", "Composite Material Mixer #2", "Metal Alloy Processor #1", 
                    "Metal Alloy Processor #2", "Chemical Dispenser", "Material Heater"
                ]
            },
            "component_fabrication": {
                "count": 5,
                "machines": [
                    "CNC Milling Machine", "Precision Lathe", "Hydraulic Press", 
                    "Heat Treatment Chamber", "Component Cutter"
                ]
            },
            "aircraft_assembly": {
                "count": 8,
                "machines": [
                    "Assembly Line #1", "Assembly Line #2", "Assembly Line #3",
                    "Rivet Applicator", "Welding Robot #1", "Welding Robot #2",
                    "Quality Inspection Scanner", "Surface Treatment Unit"
                ]
            },
            "engine_testing": {
                "count": 4,
                "machines": [
                    "Engine Test Stand #1", "Engine Test Stand #2", "Temperature Controller",
                    "Heat Recovery System"
                ]
            },
            "final_inspection": {
                "count": 2,
                "machines": [
                    "Quality Control Line", "Aircraft Positioning System"
                ]
            }
        }
        
        self.sensor_types = {
            "temperature": {"min": -40, "max": 300, "unit": "°C"},
            "humidity": {"min": 20, "max": 90, "unit": "%"},
            "vibration": {"min": 0.01, "max": 10.0, "unit": "mm/s"},
            "pressure": {"min": 0.1, "max": 50.0, "unit": "bar"},
            "current": {"min": 1, "max": 200, "unit": "A"},
            "voltage": {"min": 24, "max": 1000, "unit": "V"},
            "speed": {"min": 10, "max": 10000, "unit": "RPM"},
            "flow_rate": {"min": 0.1, "max": 1000, "unit": "L/min"},
            "torque": {"min": 1, "max": 5000, "unit": "Nm"},
            "force": {"min": 10, "max": 10000, "unit": "N"},
            "thrust": {"min": 1000, "max": 500000, "unit": "N"},
            "altitude": {"min": 0, "max": 50000, "unit": "ft"}
        }
        
        self.maintenance_types = {
            "daily": ["cleaning", "inspection", "basic_check"],
            "weekly": ["lubrication", "belt_tension", "filter_check"],
            "monthly": ["detailed_inspection", "calibration", "component_check"],
            "quarterly": ["major_inspection", "part_replacement", "system_test"],
            "annually": ["complete_overhaul", "certification", "upgrade_check"]
        }

    def generate_equipment_id(self, category: str, machine_name: str) -> str:
        """Generate unique equipment ID"""
        category_code = {
            "material_processing": "MP",
            "component_fabrication": "CF", 
            "aircraft_assembly": "AA",
            "engine_testing": "ET",
            "final_inspection": "FI"
        }
        
        # Use deterministic numbering based on machine name to ensure consistency
        machine_index = self.equipment_categories[category]["machines"].index(machine_name)
        machine_num = 100 + machine_index  # Start from 100, increment by 1
        return f"{category_code[category]}-{machine_num}"

    def generate_equipment_data(self) -> List[Dict[str, Any]]:
        """Generate complete equipment dataset for AeroTech Industries"""
        equipment_list = []
        
        for category, details in self.equipment_categories.items():
            for machine_name in details["machines"]:
                equipment_id = self.generate_equipment_id(category, machine_name)
                
                # Generate realistic health and RUL based on machine type
                base_health = random.uniform(75, 95)
                age_factor = random.uniform(0.8, 1.2)
                health = max(60, min(100, base_health * age_factor))
                
                # RUL calculation (Remaining Useful Life in hours)
                if "Test Stand" in machine_name or "Engine" in machine_name:
                    max_life = 8760  # 1 year for high-stress testing equipment
                elif "Assembly Line" in machine_name or "Robot" in machine_name:
                    max_life = 17520  # 2 years for precision assembly equipment
                elif "CNC" in machine_name or "Lathe" in machine_name:
                    max_life = 26280  # 3 years for precision machining equipment
                else:
                    max_life = 13140  # 1.5 years for standard aerospace equipment
                
                rul = int(max_life * (health / 100) * random.uniform(0.3, 0.8))
                
                # Generate realistic status based on health
                if health >= 85:
                    status = "healthy"
                elif health >= 70:
                    status = "warning"
                else:
                    status = "critical"
                
                # Generate maintenance dates
                last_maintenance = datetime.now() - timedelta(days=random.randint(1, 90))
                next_maintenance = last_maintenance + timedelta(days=random.randint(7, 30))
                
                # Generate realistic alerts
                alerts = []
                if status == "critical":
                    alerts.append("Immediate maintenance required")
                elif status == "warning":
                    alerts.append("Schedule maintenance soon")
                
                if health < 80:
                    alerts.append("Performance degradation detected")
                
                equipment_data = {
                    "equipment_id": equipment_id,
                    "name": machine_name,
                    "category": category,
                    "fd_type": machine_name,  # Keep for compatibility
                    "health": round(health, 1),
                    "rul": rul,
                    "cycle_count": random.randint(1000, 50000),
                    "status": status,
                    "last_maintenance": last_maintenance.strftime("%Y-%m-%d"),
                    "next_maintenance": next_maintenance.strftime("%Y-%m-%d"),
                    "alerts": alerts,
                    "location": self._get_location(category),
                    "manufacturer": self._get_manufacturer(category),
                    "installation_date": (datetime.now() - timedelta(days=random.randint(100, 800))).strftime("%Y-%m-%d")
                }
                
                equipment_list.append(equipment_data)
        
        return equipment_list

    def _get_location(self, category: str) -> str:
        """Get realistic location for equipment category"""
        locations = {
            "material_processing": "Material Processing Bay",
            "component_fabrication": "Precision Manufacturing Floor",
            "aircraft_assembly": "Assembly Hangar",
            "engine_testing": "Engine Test Bay",
            "final_inspection": "Quality Control Station"
        }
        return locations.get(category, "Production Floor")

    def _get_manufacturer(self, category: str) -> str:
        """Get realistic manufacturer for equipment type"""
        manufacturers = {
            "material_processing": ["Boeing Advanced Materials", "Airbus Composite Systems", "Lockheed Martin Materials"],
            "component_fabrication": ["Pratt & Whitney Precision", "General Electric Aviation", "Rolls-Royce Manufacturing"],
            "aircraft_assembly": ["Boeing Assembly Systems", "Airbus Automation", "Lockheed Martin Robotics"],
            "engine_testing": ["Pratt & Whitney Test Systems", "General Electric Test Equipment", "Rolls-Royce Testing"],
            "final_inspection": ["Boeing Quality Systems", "Airbus Inspection Tech", "Lockheed Martin QC"]
        }
        return random.choice(manufacturers.get(category, ["Aerospace Equipment Co"]))

    def generate_sensor_data(self, equipment_id: str, equipment_name: str) -> Dict[str, Any]:
        """Generate realistic sensor data for aerospace manufacturing equipment"""
        sensor_data = {}
        
        # Base sensor values based on equipment type
        if "Test Stand" in equipment_name or "Engine" in equipment_name:
            sensor_data.update({
                "temperature": random.uniform(200, 300),
                "humidity": random.uniform(20, 40),
                "pressure": random.uniform(10.0, 50.0),
                "current": random.uniform(50, 200),
                "voltage": random.uniform(400, 1000),
                "thrust": random.uniform(10000, 500000)
            })
        elif "CNC" in equipment_name or "Lathe" in equipment_name:
            sensor_data.update({
                "temperature": random.uniform(25, 45),
                "vibration": random.uniform(0.01, 2.0),
                "current": random.uniform(20, 100),
                "voltage": random.uniform(200, 600),
                "speed": random.uniform(1000, 8000),
                "torque": random.uniform(100, 5000)
            })
        elif "Assembly Line" in equipment_name or "Robot" in equipment_name:
            sensor_data.update({
                "temperature": random.uniform(20, 35),
                "vibration": random.uniform(0.1, 1.5),
                "current": random.uniform(15, 50),
                "voltage": random.uniform(200, 480),
                "speed": random.uniform(50, 500),
                "force": random.uniform(100, 10000)
            })
        else:
            # Default sensor values for other aerospace equipment
            sensor_data.update({
                "temperature": random.uniform(15, 50),
                "humidity": random.uniform(20, 60),
                "vibration": random.uniform(0.01, 1.0),
                "pressure": random.uniform(0.1, 10.0),
                "current": random.uniform(5, 100),
                "voltage": random.uniform(24, 600),
                "speed": random.uniform(10, 2000)
            })
        
        # Add specialized sensors for aerospace equipment
        if "Material" in equipment_name or "Composite" in equipment_name:
            sensor_data["flow_rate"] = random.uniform(10, 200)
            sensor_data["altitude"] = random.uniform(0, 1000)  # Manufacturing altitude
        
        # Round all values to 2 decimal places
        return {k: round(v, 2) for k, v in sensor_data.items()}

    def generate_summary_data(self) -> Dict[str, Any]:
        """Generate summary data for the manufacturing unit"""
        total_equipment = sum(details["count"] for details in self.equipment_categories.values())
        
        return {
            "total_equipment": total_equipment,
            "healthy_equipment": random.randint(18, 22),
            "warning_equipment": random.randint(2, 5),
            "critical_equipment": random.randint(0, 2),
            "total_alerts": random.randint(3, 8),
            "production_status": "active",
            "last_update": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "shift": "Day Shift",
            "batch_count": random.randint(45, 55),
            "quality_score": round(random.uniform(92, 98), 1),
            "efficiency": round(random.uniform(85, 95), 1)
        }

    def simulate_equipment_degradation(self, equipment_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Simulate realistic equipment degradation over time"""
        updated_equipment = []
        
        for equipment in equipment_list:
            # Simulate health degradation
            degradation_factor = random.uniform(0.95, 1.05)  # Small random variation
            new_health = max(60, equipment["health"] * degradation_factor)
            
            # Update RUL based on new health
            if "Test Stand" in equipment["name"] or "Engine" in equipment["name"]:
                max_life = 8760
            elif "Assembly Line" in equipment["name"] or "Robot" in equipment["name"]:
                max_life = 17520
            elif "CNC" in equipment["name"] or "Lathe" in equipment["name"]:
                max_life = 26280
            else:
                max_life = 13140
            
            new_rul = int(max_life * (new_health / 100) * random.uniform(0.3, 0.8))
            
            # Update status based on new health
            if new_health >= 85:
                new_status = "healthy"
            elif new_health >= 70:
                new_status = "warning"
            else:
                new_status = "critical"
            
            # Update alerts
            new_alerts = []
            if new_status == "critical":
                new_alerts.append("Immediate maintenance required")
            elif new_status == "warning":
                new_alerts.append("Schedule maintenance soon")
            
            if new_health < 80:
                new_alerts.append("Performance degradation detected")
            
            updated_equipment.append({
                **equipment,
                "health": round(new_health, 1),
                "rul": new_rul,
                "status": new_status,
                "alerts": new_alerts
            })
        
        return updated_equipment

# Global instance for easy access
aerotech_industries_mock = AeroTechIndustriesMockData()

if __name__ == "__main__":
    # Test the mock data generation
    print("✈️ AeroTech Industries Aircraft Manufacturing Unit - Mock Data Generator")
    print("=" * 70)
    
    # Generate equipment data
    equipment = aerotech_industries_mock.generate_equipment_data()
    print(f"✅ Generated {len(equipment)} equipment items")
    
    # Show sample equipment
    print("\n📋 Sample Equipment:")
    for eq in equipment[:3]:
        print(f"  - {eq['name']} ({eq['equipment_id']}) - Health: {eq['health']}% - Status: {eq['status']}")
    
    # Generate sample sensor data
    print("\n🔌 Sample Sensor Data:")
    sample_sensor = aerotech_industries_mock.generate_sensor_data("MP-100", "Composite Material Mixer #1")
    for sensor, value in sample_sensor.items():
        print(f"  - {sensor}: {value}")
    
    # Generate summary
    summary = aerotech_industries_mock.generate_summary_data()
    print(f"\n📊 Summary: {summary['total_equipment']} machines, {summary['healthy_equipment']} healthy")
