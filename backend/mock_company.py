"""
Maria's Margheritas Pizza Manufacturing Unit - Mock Data Generator
Generates realistic manufacturing equipment data for a medium-scale pizza company
"""

import random
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any
import numpy as np

class MariasMargheritasMockData:
    def __init__(self):
        self.equipment_categories = {
            "sauce_ingredient": {
                "count": 6,
                "machines": [
                    "Sauce Mixer #1", "Sauce Mixer #2", "Cheese Grater #1", 
                    "Cheese Grater #2", "Ingredient Dispenser", "Sauce Heater"
                ]
            },
            "dough_production": {
                "count": 5,
                "machines": [
                    "Dough Mixer", "Dough Kneader", "Dough Roller", 
                    "Proofing Chamber", "Dough Cutter"
                ]
            },
            "assembly_production": {
                "count": 8,
                "machines": [
                    "Assembly Conveyor #1", "Assembly Conveyor #2", "Assembly Conveyor #3",
                    "Sauce Applicator", "Cheese Applicator", "Topping Robot #1",
                    "Topping Robot #2", "Quality Scanner"
                ]
            },
            "baking_cooking": {
                "count": 4,
                "machines": [
                    "Tunnel Oven #1", "Tunnel Oven #2", "Temperature Controller",
                    "Heat Recovery System"
                ]
            },
            "packaging_output": {
                "count": 2,
                "machines": [
                    "Packaging Line", "Palletizer"
                ]
            }
        }
        
        self.sensor_types = {
            "temperature": {"min": 20, "max": 200, "unit": "°C"},
            "humidity": {"min": 30, "max": 80, "unit": "%"},
            "vibration": {"min": 0.1, "max": 5.0, "unit": "mm/s"},
            "pressure": {"min": 0.5, "max": 10.0, "unit": "bar"},
            "current": {"min": 5, "max": 50, "unit": "A"},
            "voltage": {"min": 200, "max": 480, "unit": "V"},
            "speed": {"min": 100, "max": 3000, "unit": "RPM"},
            "flow_rate": {"min": 10, "max": 200, "unit": "L/min"}
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
            "sauce_ingredient": "SI",
            "dough_production": "DP", 
            "assembly_production": "AP",
            "baking_cooking": "BC",
            "packaging_output": "PO"
        }
        
        # Use deterministic numbering based on machine name to ensure consistency
        machine_index = self.equipment_categories[category]["machines"].index(machine_name)
        machine_num = 100 + machine_index  # Start from 100, increment by 1
        return f"{category_code[category]}-{machine_num}"

    def generate_equipment_data(self) -> List[Dict[str, Any]]:
        """Generate complete equipment dataset for Maria's Margheritas"""
        equipment_list = []
        
        for category, details in self.equipment_categories.items():
            for machine_name in details["machines"]:
                equipment_id = self.generate_equipment_id(category, machine_name)
                
                # Generate realistic health and RUL based on machine type
                base_health = random.uniform(75, 95)
                age_factor = random.uniform(0.8, 1.2)
                health = max(60, min(100, base_health * age_factor))
                
                # RUL calculation (Remaining Useful Life in hours)
                if "Oven" in machine_name or "Heater" in machine_name:
                    max_life = 8760  # 1 year for high-heat equipment
                elif "Conveyor" in machine_name:
                    max_life = 17520  # 2 years for moving parts
                else:
                    max_life = 13140  # 1.5 years for standard equipment
                
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
            "sauce_ingredient": "Ingredient Processing Bay",
            "dough_production": "Dough Production Line",
            "assembly_production": "Assembly Floor",
            "baking_cooking": "Baking Station",
            "packaging_output": "Packaging Bay"
        }
        return locations.get(category, "Production Floor")

    def _get_manufacturer(self, category: str) -> str:
        """Get realistic manufacturer for equipment type"""
        manufacturers = {
            "sauce_ingredient": ["FoodTech Industries", "Culinary Equipment Co", "Industrial Mixing Systems"],
            "dough_production": ["DoughMaster Pro", "Bakery Equipment Ltd", "Industrial Baking Systems"],
            "assembly_production": ["AssemblyTech", "Production Line Solutions", "Automation Systems Inc"],
            "baking_cooking": ["HeatMaster Ovens", "Industrial Baking Equipment", "Thermal Systems Corp"],
            "packaging_output": ["PackMaster Systems", "Industrial Packaging", "Automation Solutions"]
        }
        return random.choice(manufacturers.get(category, ["Industrial Equipment Co"]))

    def generate_sensor_data(self, equipment_id: str, equipment_name: str) -> Dict[str, Any]:
        """Generate realistic sensor data for pizza manufacturing equipment"""
        sensor_data = {}
        
        # Base sensor values based on equipment type
        if "Oven" in equipment_name or "Heater" in equipment_name:
            sensor_data.update({
                "temperature": random.uniform(180, 220),
                "humidity": random.uniform(20, 40),
                "pressure": random.uniform(1.0, 2.0),
                "current": random.uniform(15, 35),
                "voltage": random.uniform(400, 480)
            })
        elif "Mixer" in equipment_name or "Kneader" in equipment_name:
            sensor_data.update({
                "temperature": random.uniform(25, 35),
                "vibration": random.uniform(0.5, 2.0),
                "current": random.uniform(20, 40),
                "voltage": random.uniform(400, 480),
                "speed": random.uniform(200, 800)
            })
        elif "Conveyor" in equipment_name:
            sensor_data.update({
                "temperature": random.uniform(20, 30),
                "vibration": random.uniform(0.2, 1.5),
                "current": random.uniform(8, 20),
                "voltage": random.uniform(200, 400),
                "speed": random.uniform(50, 150)
            })
        else:
            # Default sensor values for other equipment
            sensor_data.update({
                "temperature": random.uniform(20, 40),
                "humidity": random.uniform(30, 60),
                "vibration": random.uniform(0.1, 1.0),
                "pressure": random.uniform(0.5, 5.0),
                "current": random.uniform(10, 30),
                "voltage": random.uniform(200, 480),
                "speed": random.uniform(100, 1000)
            })
        
        # Add flow rate for liquid processing equipment
        if "Sauce" in equipment_name or "Dispenser" in equipment_name:
            sensor_data["flow_rate"] = random.uniform(50, 150)
        
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
            if "Oven" in equipment["name"] or "Heater" in equipment["name"]:
                max_life = 8760
            elif "Conveyor" in equipment["name"]:
                max_life = 17520
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
marias_margheritas_mock = MariasMargheritasMockData()

if __name__ == "__main__":
    # Test the mock data generation
    print("🍕 Maria's Margheritas Pizza Manufacturing Unit - Mock Data Generator")
    print("=" * 70)
    
    # Generate equipment data
    equipment = marias_margheritas_mock.generate_equipment_data()
    print(f"✅ Generated {len(equipment)} equipment items")
    
    # Show sample equipment
    print("\n📋 Sample Equipment:")
    for eq in equipment[:3]:
        print(f"  - {eq['name']} ({eq['equipment_id']}) - Health: {eq['health']}% - Status: {eq['status']}")
    
    # Generate sample sensor data
    print("\n🔌 Sample Sensor Data:")
    sample_sensor = marias_margheritas_mock.generate_sensor_data("SI-001", "Sauce Mixer #1")
    for sensor, value in sample_sensor.items():
        print(f"  - {sensor}: {value}")
    
    # Generate summary
    summary = marias_margheritas_mock.generate_summary_data()
    print(f"\n📊 Summary: {summary['total_equipment']} machines, {summary['healthy_equipment']} healthy")
