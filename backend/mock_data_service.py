import random
import time
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import numpy as np

class MockDataService:
    """Service for generating realistic mock sensor data and simulating real-time updates"""
    
    def __init__(self):
        # Base sensor values for healthy equipment (NASA C-MAPSS typical ranges)
        self.base_sensor_values = {
            'op_setting_1': (0.0, 100.0),
            'op_setting_2': (0.0, 100.0),
            'op_setting_3': (0.0, 100.0),
            'sensor_2': (518.67, 554.36),
            'sensor_3': (642.0, 1669.0),
            'sensor_4': (1488.0, 2388.0),
            'sensor_6': (1.3, 47.0),
            'sensor_7': (554.36, 1669.0),
            'sensor_8': (2388.0, 2388.0),
            'sensor_9': (9046.0, 11081.0),
            'sensor_11': (47.0, 52.0),
            'sensor_12': (521.0, 2388.0),
            'sensor_13': (2388.0, 9046.0),
            'sensor_14': (8138.0, 8138.0),
            'sensor_15': (8.4, 9.0),
            'sensor_17': (2388.0, 2388.0),
            'sensor_20': (2388.0, 2388.0),
            'sensor_21': (100.0, 100.0)
        }
        
        # Equipment degradation patterns
        self.equipment_states = {}
        
        # Initialize equipment
        self.initialize_equipment()
    
    def initialize_equipment(self):
        """Initialize mock equipment with realistic starting states"""
        equipment_ids = ['EQ001', 'EQ002', 'EQ003', 'EQ004', 'EQ005']
        
        for eq_id in equipment_ids:
            # Random starting health (70-100%)
            initial_health = random.uniform(70, 100)
            
            # Random degradation rate (0.1-0.5% per cycle)
            degradation_rate = random.uniform(0.1, 0.5)
            
            # Random starting RUL (800-1200 cycles)
            initial_rul = random.uniform(800, 1200)
            
            # Random FD type
            fd_type = random.choice(['FD001', 'FD002', 'FD003', 'FD004'])
            
            self.equipment_states[eq_id] = {
                'equipment_id': eq_id,
                'fd_type': fd_type,
                'health': initial_health,
                'degradation_rate': degradation_rate,
                'rul': initial_rul,
                'cycle_count': 0,
                'last_maintenance': datetime.now() - timedelta(days=random.randint(30, 180)),
                'next_maintenance': datetime.now() + timedelta(days=random.randint(30, 90)),
                'status': 'healthy' if initial_health >= 80 else 'warning' if initial_health >= 60 else 'critical',
                'sensor_history': [],
                'alerts': []
            }
    
    def generate_sensor_data(self, equipment_id: str) -> Dict:
        """Generate realistic sensor data for a specific equipment"""
        if equipment_id not in self.equipment_states:
            raise ValueError(f"Equipment {equipment_id} not found")
        
        eq_state = self.equipment_states[equipment_id]
        
        # Calculate current health impact on sensor values
        health_factor = eq_state['health'] / 100.0
        
        sensor_data = {}
        
        for sensor, (min_val, max_val) in self.base_sensor_values.items():
            # Add noise and degradation
            base_value = random.uniform(min_val, max_val)
            
            # Apply health degradation (sensors become more erratic as health decreases)
            if health_factor < 0.8:
                # Add more noise for unhealthy equipment
                noise_factor = (1.0 - health_factor) * 0.3
                sensor_data[sensor] = base_value + random.uniform(-noise_factor * base_value, noise_factor * base_value)
            else:
                # Healthy equipment has minimal noise
                noise_factor = 0.02
                sensor_data[sensor] = base_value + random.uniform(-noise_factor * base_value, noise_factor * base_value)
            
            # Ensure values stay within reasonable bounds
            sensor_data[sensor] = max(min_val, min(max_val, sensor_data[sensor]))
        
        return sensor_data
    
    def update_equipment_state(self, equipment_id: str):
        """Update equipment state (health, RUL, etc.)"""
        if equipment_id not in self.equipment_states:
            return
        
        eq_state = self.equipment_states[equipment_id]
        
        # Increment cycle count
        eq_state['cycle_count'] += 1
        
        # Degrade health
        eq_state['health'] -= eq_state['degradation_rate']
        eq_state['health'] = max(0, eq_state['health'])
        
        # Update RUL (roughly proportional to health)
        eq_state['rul'] = eq_state['rul'] * (eq_state['health'] / 100.0)
        eq_state['rul'] = max(0, eq_state['rul'])
        
        # Update status based on health
        if eq_state['health'] >= 80:
            eq_state['status'] = 'healthy'
        elif eq_state['health'] >= 60:
            eq_state['status'] = 'warning'
        else:
            eq_state['status'] = 'critical'
        
        # Generate sensor data
        sensor_data = self.generate_sensor_data(equipment_id)
        
        # Store sensor history (keep last 100 readings)
        eq_state['sensor_history'].append({
            'timestamp': datetime.now().isoformat(),
            'sensor_data': sensor_data,
            'health': eq_state['health'],
            'rul': eq_state['rul']
        })
        
        if len(eq_state['sensor_history']) > 100:
            eq_state['sensor_history'] = eq_state['sensor_history'][-100:]
        
        # Check for alerts
        self.check_alerts(equipment_id)
    
    def check_alerts(self, equipment_id: str):
        """Check and generate alerts based on equipment state"""
        eq_state = self.equipment_states[equipment_id]
        
        # Clear old alerts
        eq_state['alerts'] = [alert for alert in eq_state['alerts'] 
                             if datetime.fromisoformat(alert['timestamp']) > datetime.now() - timedelta(hours=24)]
        
        # Critical health alert
        if eq_state['health'] < 30 and not any(alert['type'] == 'critical_health' for alert in eq_state['alerts']):
            eq_state['alerts'].append({
                'type': 'critical_health',
                'message': f'Equipment {equipment_id} health critically low: {eq_state["health"]:.1f}%',
                'severity': 'critical',
                'timestamp': datetime.now().isoformat()
            })
        
        # Low RUL alert
        if eq_state['rul'] < 100 and not any(alert['type'] == 'low_rul' for alert in eq_state['alerts']):
            eq_state['alerts'].append({
                'type': 'low_rul',
                'message': f'Equipment {equipment_id} RUL critically low: {eq_state["rul"]:.1f} cycles',
                'severity': 'critical',
                'timestamp': datetime.now().isoformat()
            })
        
        # Maintenance due alert
        if eq_state['next_maintenance'] < datetime.now() + timedelta(days=7) and not any(alert['type'] == 'maintenance_due' for alert in eq_state['alerts']):
            eq_state['alerts'].append({
                'type': 'maintenance_due',
                'message': f'Equipment {equipment_id} maintenance due soon',
                'severity': 'warning',
                'timestamp': datetime.now().isoformat()
            })
    
    def get_equipment_status(self, equipment_id: str) -> Dict:
        """Get current status of equipment"""
        if equipment_id not in self.equipment_states:
            return None
        
        eq_state = self.equipment_states[equipment_id]
        
        return {
            'equipment_id': eq_state['equipment_id'],
            'fd_type': eq_state['fd_type'],
            'health': eq_state['health'],
            'rul': eq_state['rul'],
            'cycle_count': eq_state['cycle_count'],
            'status': eq_state['status'],
            'last_maintenance': eq_state['last_maintenance'].isoformat(),
            'next_maintenance': eq_state['next_maintenance'].isoformat(),
            'alerts': eq_state['alerts']
        }
    
    def get_all_equipment_status(self) -> List[Dict]:
        """Get status of all equipment"""
        return [self.get_equipment_status(eq_id) for eq_id in self.equipment_states.keys()]
    
    def get_sensor_data(self, equipment_id: str) -> Dict:
        """Get current sensor data for equipment"""
        if equipment_id not in self.equipment_states:
            return None
        
        return self.generate_sensor_data(equipment_id)
    
    def simulate_time_step(self):
        """Simulate one time step (update all equipment)"""
        for equipment_id in self.equipment_states.keys():
            self.update_equipment_state(equipment_id)
    
    def get_equipment_summary(self) -> Dict:
        """Get summary statistics for all equipment"""
        all_status = self.get_all_equipment_status()
        
        total_equipment = len(all_status)
        healthy_count = len([eq for eq in all_status if eq['status'] == 'healthy'])
        warning_count = len([eq for eq in all_status if eq['status'] == 'warning'])
        critical_count = len([eq for eq in all_status if eq['status'] == 'critical'])
        
        total_alerts = sum(len(eq['alerts']) for eq in all_status)
        critical_alerts = sum(len([alert for alert in eq['alerts'] if alert['severity'] == 'critical']) 
                            for eq in all_status)
        
        avg_health = sum(eq['health'] for eq in all_status) / total_equipment if total_equipment > 0 else 0
        avg_rul = sum(eq['rul'] for eq in all_status) / total_equipment if total_equipment > 0 else 0
        
        return {
            'total_equipment': total_equipment,
            'healthy_count': healthy_count,
            'warning_count': warning_count,
            'critical_count': critical_count,
            'total_alerts': total_alerts,
            'critical_alerts': critical_alerts,
            'average_health': avg_health,
            'average_rul': avg_rul,
            'timestamp': datetime.now().isoformat()
        }

# Global instance
mock_service = MockDataService()

# Functions for API endpoints
def get_mock_equipment_status(equipment_id: str = None) -> Dict:
    """Get mock equipment status for API"""
    if equipment_id:
        return mock_service.get_equipment_status(equipment_id)
    else:
        return mock_service.get_all_equipment_status()

def get_mock_sensor_data(equipment_id: str) -> Dict:
    """Get mock sensor data for API"""
    return mock_service.get_sensor_data(equipment_id)

def get_mock_equipment_summary() -> Dict:
    """Get mock equipment summary for API"""
    return mock_service.get_equipment_summary()

def simulate_mock_update():
    """Simulate one time step update"""
    mock_service.simulate_time_step()
