// API Configuration for ORCA Frontend
export const API_CONFIG = {
  // Backend URL - will be set from environment variables
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    EQUIPMENT: '/api/mock/equipment',
    SENSOR_DATA: '/api/mock/sensor-data',
    SUMMARY: '/api/mock/summary',
    SIMULATE: '/api/mock/simulate',
    PREDICT_RUL: '/api/predict-rul',
    PREDICT_RUL_MULTI: '/api/predict-rul-multi',
    CHAT: '/api/ai/chatbot',
    MAINTENANCE_TASKS: '/api/ai/maintenance-tasks',
    ANALYZE_FILE: '/api/ai/analyze-file',
    HEALTH: '/api/health',
    STATUS: '/api/status',
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function for API requests with error handling
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = buildApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      ...API_CONFIG.REQUEST_CONFIG,
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions
export const api = {
  // Equipment endpoints
  getEquipment: () => apiRequest(API_CONFIG.ENDPOINTS.EQUIPMENT),
  getSensorData: (equipmentId: string) => 
    apiRequest(`${API_CONFIG.ENDPOINTS.SENSOR_DATA}/${equipmentId}`),
  getSummary: () => apiRequest(API_CONFIG.ENDPOINTS.SUMMARY),
  
  // Simulation endpoints
  simulateUpdate: () => 
    apiRequest(API_CONFIG.ENDPOINTS.SIMULATE, { method: 'POST' }),
  
  // Prediction endpoints
  predictRUL: (data: any) => 
    apiRequest(API_CONFIG.ENDPOINTS.PREDICT_RUL, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  predictRULMulti: (data: any) => 
    apiRequest(API_CONFIG.ENDPOINTS.PREDICT_RUL_MULTI, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // AI endpoints
  chat: (message: string, context?: any) => 
    apiRequest(API_CONFIG.ENDPOINTS.CHAT, {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    }),
  
  getMaintenanceTasks: (equipmentId: string, sensorData?: any) => 
    apiRequest(`${API_CONFIG.ENDPOINTS.MAINTENANCE_TASKS}/${equipmentId}`, {
      method: 'POST',
      body: JSON.stringify({ sensor_data: sensorData }),
    }),
  
  analyzeFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiRequest(API_CONFIG.ENDPOINTS.ANALYZE_FILE, {
      method: 'POST',
      body: formData,
    });
  },
  
  // Health endpoints
  getHealth: () => apiRequest(API_CONFIG.ENDPOINTS.HEALTH),
  getStatus: () => apiRequest(API_CONFIG.ENDPOINTS.STATUS),
};
