import { ModuleInfo, Equipment, SensorData, Prediction, Alert, ComplianceRule, DashboardStats } from '@/types';

// ORCA Modules Configuration
export const ORCA_MODULES: ModuleInfo[] = [
  {
    id: 'PREDATOR',
    name: 'Predictive Maintenance Engine',
    emoji: '🦈',
    description: 'Hunts down early signs of equipment failure before they strike',
    status: 'active',
    color: 'from-blue-600 to-teal-500'
  },
  {
    id: 'GUARDIAN',
    name: 'Regulatory Compliance Sentinel',
    emoji: '🛡️',
    description: 'Shields operations by enforcing industry standards',
    status: 'active',
    color: 'from-amber-500 to-yellow-400'
  },
  {
    id: 'MIRROR',
    name: 'Digital Twin Intelligence',
    emoji: '🔮',
    description: 'Reflects your factory in a living, breathing simulation',
    status: 'inactive',
    color: 'from-purple-600 to-indigo-500'
  },
  {
    id: 'SIREN',
    name: 'Real-Time Alerting System',
    emoji: '🚨',
    description: 'Watches, listens, and screams when things go wrong',
    status: 'active',
    color: 'from-red-500 to-orange-400'
  }
];

// Mock Equipment Data
export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'EQ001',
    name: 'Turbofan Engine A',
    type: 'Jet Engine',
    location: 'Hangar 1',
    status: 'operational',
    health: 85,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: 'EQ002',
    name: 'Turbofan Engine B',
    type: 'Jet Engine',
    location: 'Hangar 2',
    status: 'warning',
    health: 65,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-03-20'
  },
  {
    id: 'EQ003',
    name: 'Hydraulic Pump System',
    type: 'Hydraulic',
    location: 'Maintenance Bay',
    status: 'critical',
    health: 25,
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-02-15'
  },
  {
    id: 'EQ004',
    name: 'Cooling Tower',
    type: 'Cooling System',
    location: 'Outdoor Area',
    status: 'operational',
    health: 92,
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-05-20'
  }
];

// Mock Sensor Data
export const MOCK_SENSOR_DATA: SensorData[] = [
  {
    id: 'S001',
    equipmentId: 'EQ001',
    timestamp: '2024-01-22T10:00:00Z',
    temperature: 85.5,
    pressure: 120.3,
    vibration: 0.15,
    rpm: 8500,
    fuelFlow: 45.2,
    oilPressure: 65.8
  },
  {
    id: 'S002',
    equipmentId: 'EQ002',
    timestamp: '2024-01-22T10:00:00Z',
    temperature: 92.1,
    pressure: 135.7,
    vibration: 0.28,
    rpm: 8200,
    fuelFlow: 48.9,
    oilPressure: 58.3
  }
];

// Mock Predictions
export const MOCK_PREDICTIONS: Prediction[] = [
  {
    equipmentId: 'EQ001',
    rul: 1200,
    confidence: 0.89,
    riskLevel: 'low',
    nextFailure: '2024-03-15',
    recommendations: [
      'Schedule routine inspection in 2 weeks',
      'Monitor oil pressure trends',
      'Check vibration levels weekly'
    ]
  },
  {
    equipmentId: 'EQ002',
    rul: 450,
    confidence: 0.76,
    riskLevel: 'medium',
    nextFailure: '2024-02-20',
    recommendations: [
      'Schedule maintenance within 1 week',
      'Replace oil filter',
      'Check bearing conditions'
    ]
  },
  {
    equipmentId: 'EQ003',
    rul: 72,
    confidence: 0.94,
    riskLevel: 'critical',
    nextFailure: '2024-01-25',
    recommendations: [
      'Immediate shutdown required',
      'Emergency maintenance team needed',
      'Check for safety hazards'
    ]
  }
];

// Mock Alerts
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'A001',
    type: 'critical',
    title: 'Equipment Failure Imminent',
    message: 'Turbofan Engine B showing critical vibration levels',
    timestamp: '2024-01-22T09:45:00Z',
    equipmentId: 'EQ002',
    acknowledged: false,
    priority: 'urgent'
  },
  {
    id: 'A002',
    type: 'warning',
    title: 'Maintenance Due Soon',
    message: 'Hydraulic Pump System requires immediate attention',
    timestamp: '2024-01-22T08:30:00Z',
    equipmentId: 'EQ003',
    acknowledged: true,
    priority: 'high'
  },
  {
    id: 'A003',
    type: 'info',
    title: 'Routine Check Completed',
    message: 'Cooling Tower inspection completed successfully',
    timestamp: '2024-01-22T07:15:00Z',
    equipmentId: 'EQ004',
    acknowledged: false,
    priority: 'low'
  }
];

// Mock Compliance Rules
export const MOCK_COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'CR001',
    name: 'ISO 9001:2015 Quality Management',
    category: 'Quality',
    status: 'compliant',
    lastCheck: '2024-01-15',
    nextCheck: '2024-04-15',
    description: 'Quality management system compliance'
  },
  {
    id: 'CR002',
    name: 'ISO 14001:2015 Environmental Management',
    category: 'Environmental',
    status: 'compliant',
    lastCheck: '2024-01-10',
    nextCheck: '2024-04-10',
    description: 'Environmental management system compliance'
  },
  {
    id: 'CR003',
    name: 'OSHA Safety Standards',
    category: 'Safety',
    status: 'pending',
    lastCheck: '2024-01-05',
    nextCheck: '2024-02-05',
    description: 'Occupational safety and health compliance'
  }
];

// Mock Dashboard Stats
export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalEquipment: 4,
  operationalEquipment: 2,
  maintenanceRequired: 1,
  criticalAlerts: 1,
  complianceScore: 87,
  uptime: 94.2
};

// Chart Data for Equipment Health
export const MOCK_HEALTH_CHART_DATA = [
  { timestamp: '2024-01-20', value: 88 },
  { timestamp: '2024-01-21', value: 85 },
  { timestamp: '2024-01-22', value: 82 },
  { timestamp: '2024-01-23', value: 79 },
  { timestamp: '2024-01-24', value: 76 }
];

// Chart Data for Temperature Trends
export const MOCK_TEMPERATURE_CHART_DATA = [
  { timestamp: '2024-01-20', value: 82 },
  { timestamp: '2024-01-21', value: 85 },
  { timestamp: '2024-01-22', value: 89 },
  { timestamp: '2024-01-23', value: 92 },
  { timestamp: '2024-01-24', value: 95 }
];
