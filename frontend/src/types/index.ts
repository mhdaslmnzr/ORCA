// ORCA Module Types
export type ORCAModule = 'PREDATOR' | 'GUARDIAN' | 'MIRROR' | 'SIREN';

export interface ModuleInfo {
  id: ORCAModule;
  name: string;
  emoji: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  color: string;
}

// Equipment and Sensor Types
export interface Equipment {
  // Backend data structure (from mock_company.py) - EXACT MATCH
  equipment_id: string;
  name: string;
  category: string;
  fd_type: string;
  health: number;
  rul: number;
  cycle_count: number;
  status: 'healthy' | 'warning' | 'critical';
  last_maintenance: string;
  next_maintenance: string;
  alerts: string[];
  location: string;
  manufacturer: string;
  installation_date: string;
}

export interface SensorData {
  temperature?: number;
  humidity?: number;
  vibration?: number;
  pressure?: number;
  current?: number;
  voltage?: number;
  speed?: number;
  flow_rate?: number;
  // Legacy NASA sensor fields for compatibility
  op_setting_1?: number;
  op_setting_2?: number;
  op_setting_3?: number;
  sensor_2?: number;
  sensor_3?: number;
  sensor_4?: number;
  sensor_6?: number;
  sensor_7?: number;
  sensor_8?: number;
  sensor_9?: number;
  sensor_11?: number;
  sensor_12?: number;
  sensor_13?: number;
  sensor_14?: number;
  sensor_15?: number;
  sensor_17?: number;
  sensor_20?: number;
  sensor_21?: number;
}

export interface MaintenanceTask {
  task_name: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimated_time: number;
  required_tools: string[];
  required_parts: string[];
  step_by_step_instructions: string[];
  safety_notes: string;
  cost_estimate: number;
  risk_assessment: string;
  // Frontend compatibility fields
  task?: string;
  estimated_duration?: string;
  description?: string;
}

export interface SummaryData {
  total_equipment: number;
  healthy_equipment: number;
  warning_equipment: number;
  critical_equipment: number;
  total_alerts: number;
  production_status: string;
  last_update: string;
  shift: string;
  batch_count: number;
  quality_score: number;
  efficiency: number;
}

export interface Prediction {
  equipmentId: string;
  rul: number; // Remaining Useful Life in hours
  confidence: number; // 0-1
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  nextFailure: string;
  recommendations: string[];
}

// Alert Types
export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  equipmentId?: string;
  acknowledged: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

// Compliance Types
export interface ComplianceRule {
  id: string;
  name: string;
  category: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  lastCheck: string;
  nextCheck: string;
  description: string;
}

// Dashboard Types
export interface DashboardStats {
  totalEquipment: number;
  operationalEquipment: number;
  maintenanceRequired: number;
  criticalAlerts: number;
  complianceScore: number;
  uptime: number;
}

// Chart Data Types
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  color: string;
  borderColor?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'maintenance' | 'viewer';
  avatar?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
