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
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'healthy' | 'warning' | 'critical';
  health: number; // 0-100
  lastMaintenance: string;
  nextMaintenance: string;
  rul: number; // Remaining Useful Life in hours
}

export interface SensorData {
  id: string;
  equipmentId: string;
  timestamp: string;
  temperature: number;
  pressure: number;
  vibration: number;
  rpm: number;
  fuelFlow: number;
  oilPressure: number;
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
