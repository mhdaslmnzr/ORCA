'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Icon,
  Button,
  Progress,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Spinner,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { 
  Zap, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Wifi,
  Signal,
  Eye,
  FileText,
  Download,
  Upload,
} from 'lucide-react';
import { useState as useReactState } from 'react';
import EquipmentCard from './EquipmentCard';
import StatsCard from './StatsCard';
import ORCAChatbot from '../ai/ORCAChatbot';
import MaintenanceTasks from '../ai/MaintenanceTasks';

interface Equipment {
  equipment_id: string;
  fd_type: string;
  health: number;
  rul: number;
  cycle_count: number;
  status: 'healthy' | 'warning' | 'critical';
  last_maintenance: string;
  next_maintenance: string;
  alerts: any[];
}

interface SensorData {
  op_setting_1: number;
  op_setting_2: number;
  op_setting_3: number;
  sensor_2: number;
  sensor_3: number;
  sensor_4: number;
  sensor_6: number;
  sensor_7: number;
  sensor_8: number;
  sensor_9: number;
  sensor_11: number;
  sensor_12: number;
  sensor_13: number;
  sensor_14: number;
  sensor_15: number;
  sensor_17: number;
  sensor_20: number;
  sensor_21: number;
}

export default function PREDATOREnhanced() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [currentSensorData, setCurrentSensorData] = useState<SensorData | null>(null);
  const [currentRUL, setCurrentRUL] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [realTimeInterval, setRealTimeInterval] = useState<NodeJS.Timeout | null>(null);
  const [summary, setSummary] = useState<any>(null);
  
  const toast = useToast();

  // Fetch equipment data
  const fetchEquipment = useCallback(async () => {
    try {
      console.log('🔍 Fetching equipment data...');
      const response = await fetch('http://localhost:8000/api/mock/equipment');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Equipment data received:', data);
        setEquipment(data);
      } else {
        console.error('❌ Equipment fetch failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Error fetching equipment:', error);
    }
  }, []);

  // Fetch sensor data for selected equipment
  const fetchSensorData = async (equipmentId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/mock/sensor-data/${equipmentId}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentSensorData(data);
        
        // Get equipment status for RUL
        const eq = equipment.find(e => e.equipment_id === equipmentId);
        if (eq) {
          setCurrentRUL(eq.rul);
        }
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  // Fetch summary data
  const fetchSummary = useCallback(async () => {
    try {
      console.log('🔍 Fetching summary data...');
      const response = await fetch('http://localhost:8000/api/mock/summary');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Summary data received:', data);
        setSummary(data);
      } else {
        console.error('❌ Summary fetch failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Error fetching summary:', error);
    }
  }, []);

  // Simulate real-time updates
  const simulateUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/mock/simulate', { method: 'POST' });
      if (response.ok) {
        // Refresh data after simulation
        await fetchEquipment();
        await fetchSummary();
        if (selectedEquipment) {
          await fetchSensorData(selectedEquipment);
        }
      }
    } catch (error) {
      console.error('Error simulating update:', error);
    }
  };

  // Start real-time updates
  const startRealTimeUpdates = () => {
    if (realTimeInterval) return;
    
    const interval = setInterval(() => {
      simulateUpdate();
    }, 30000); // Update every 30 seconds
    
    setRealTimeInterval(interval);
    setIsRealTimeEnabled(true);
    toast({
      title: 'Real-time updates enabled',
      description: 'Data will update every 30 seconds',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  // Stop real-time updates
  const stopRealTimeUpdates = () => {
    if (realTimeInterval) {
      clearInterval(realTimeInterval);
      setRealTimeInterval(null);
    }
    setIsRealTimeEnabled(false);
    toast({
      title: 'Real-time updates disabled',
      description: 'Data updates stopped',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle equipment selection
  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);
    fetchSensorData(equipmentId);
  };



  // Start real-time updates on mount
  useEffect(() => {
    // Initial data fetch
    fetchEquipment();
    fetchSummary();
    
    // Start real-time updates
    if (isRealTimeEnabled) {
      startRealTimeUpdates();
    }
    
    return () => {
      if (realTimeInterval) {
        clearInterval(realTimeInterval);
      }
    };
  }, [fetchEquipment, fetchSummary, isRealTimeEnabled]);

  // Filter equipment based on search and status
  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.equipment_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         eq.fd_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || eq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats from real data
  const totalEquipment = equipment.length;
  const healthyEquipment = equipment.filter(e => e.status === 'healthy').length;
  const warningEquipment = equipment.filter(e => e.status === 'warning').length;
  const criticalEquipment = equipment.filter(e => e.status === 'critical').length;
  const averageHealth = equipment.reduce((sum, e) => sum + e.health, 0) / totalEquipment || 0;
  const totalAlerts = equipment.reduce((sum, e) => sum + e.alerts.length, 0);

  const stats = [
    {
      title: 'Total Equipment',
      value: totalEquipment,
      change: '+2',
      changeType: 'increase' as const,
      icon: Activity,
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.2) 100%)'
    },
    {
      title: 'Average Health',
      value: `${averageHealth.toFixed(1)}%`,
      change: '+5.2%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 100%)'
    },
    {
      title: 'Healthy Equipment',
      value: healthyEquipment,
      change: '+1',
      changeType: 'increase' as const,
      icon: CheckCircle,
      gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 100%)'
    },
    {
      title: 'Critical Alerts',
      value: totalAlerts,
      change: '-2',
      changeType: 'decrease' as const,
      icon: AlertTriangle,
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 100%)'
    }
  ];

  return (
    <Box p={6} bg="dark.background" minH="100vh">
      {/* Header */}
      <VStack spacing={6} align="stretch" mb={8}>
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="2xl" color="dark.text" fontWeight="900">
              🦈 PREDATOR Dashboard
            </Heading>
            <Text fontSize="lg" color="dark.muted">
              Intelligent Predictive Maintenance & AI-Powered Insights
            </Text>
          </VStack>
          
          <HStack spacing={4}>
            <Button
              leftIcon={<RefreshCw size={16} />}
              onClick={simulateUpdate}
              isLoading={isLoading}
              bg="dark.accent"
              _hover={{ bg: 'dark.info' }}
            >
              Simulate Update
            </Button>
            
            <Button
              leftIcon={<RefreshCw size={16} />}
              onClick={() => {
                console.log('🔄 Manual refresh clicked');
                fetchEquipment();
                fetchSummary();
              }}
              variant="outline"
              borderColor="dark.border"
              color="dark.text"
              _hover={{ bg: 'dark.accent' }}
            >
              Manual Refresh
            </Button>
            
            <Button
              leftIcon={<RefreshCw size={16} />}
              onClick={async () => {
                console.log('🧪 Test API call...');
                try {
                  const response = await fetch('http://localhost:8000/api/mock/equipment');
                  const data = await response.json();
                  console.log('🧪 API Response:', data);
                  alert(`API Response: ${JSON.stringify(data, null, 2)}`);
                } catch (error) {
                  console.error('🧪 API Error:', error);
                  alert(`API Error: ${error}`);
                }
              }}
              variant="ghost"
              color="dark.muted"
              _hover={{ color: 'dark.text', bg: 'dark.accent' }}
            >
              Test API
            </Button>
            
            <Button
              leftIcon={isRealTimeEnabled ? <Pause size={16} /> : <Play size={16} />}
              onClick={isRealTimeEnabled ? stopRealTimeUpdates : startRealTimeUpdates}
              variant="outline"
              borderColor="dark.border"
              color="dark.text"
              _hover={{ bg: 'dark.accent' }}
            >
              {isRealTimeEnabled ? 'Stop Real-time' : 'Start Real-time'}
            </Button>
            
            <Button
              leftIcon={<Settings size={16} />}
              variant="ghost"
              color="dark.muted"
              _hover={{ color: 'dark.text', bg: 'dark.accent' }}
            >
              Settings
            </Button>
          </HStack>
        </HStack>

        {/* Real-time Status */}
        <HStack spacing={4} justify="center">
          <HStack spacing={2}>
            <Box w={3} h={3} bg="green.400" borderRadius="full" />
            <Text fontSize="sm" color="dark.muted">Real-time: {isRealTimeEnabled ? 'Active' : 'Inactive'}</Text>
          </HStack>
          <HStack spacing={2}>
            <Box w={3} h={3} bg="blue.400" borderRadius="full" />
            <Text fontSize="sm" color="dark.muted">Updates: Every 30s</Text>
          </HStack>
          <HStack spacing={2}>
            <Box w={3} h={3} bg="purple.400" borderRadius="full" />
            <Text fontSize="sm" color="dark.muted">AI Models: Active</Text>
          </HStack>
        </HStack>
      </VStack>

      {/* Main Dashboard Grid */}
      <Grid templateColumns="2fr 1fr" gap={8}>
        {/* Left Column - Equipment Monitoring */}
        <VStack spacing={6} align="stretch">
          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </SimpleGrid>

          {/* Search and Filters */}
          <HStack spacing={4} justify="space-between">
            <HStack spacing={4} flex={1}>
              <InputGroup maxW="400px">
                <InputLeftElement>
                  <Icon as={Search} color="dark.muted" />
                </InputLeftElement>
                <Input
                  placeholder="Search equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="dark.card"
                  borderColor="dark.border"
                  color="dark.text"
                  _placeholder={{ color: 'dark.muted' }}
                />
              </InputGroup>
              
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                bg="dark.card"
                borderColor="dark.border"
                color="dark.text"
                w="150px"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </Select>
            </HStack>
            
            <HStack spacing={2}>
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                onClick={() => setViewMode('grid')}
                bg={viewMode === 'grid' ? 'dark.accent' : 'transparent'}
                color={viewMode === 'grid' ? 'white' : 'dark.muted'}
              >
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'solid' : 'ghost'}
                onClick={() => setViewMode('list')}
                bg={viewMode === 'list' ? 'dark.accent' : 'transparent'}
                color={viewMode === 'list' ? 'white' : 'dark.muted'}
              >
                List
              </Button>
            </HStack>
          </HStack>

          {/* Equipment Display */}
          {viewMode === 'grid' ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {filteredEquipment.map((eq) => (
                <Box
                  key={eq.equipment_id}
                  onClick={() => handleEquipmentSelect(eq.equipment_id)}
                  cursor="pointer"
                  className="card-hover"
                >
                  <EquipmentCard
                    equipment={{
                      id: eq.equipment_id,
                      name: `${eq.fd_type} Engine`,
                      type: eq.fd_type,
                      location: 'Hangar 1',
                      status: eq.status,
                      health: eq.health,
                      lastMaintenance: eq.last_maintenance,
                      nextMaintenance: eq.next_maintenance,
                      rul: eq.rul,
                    }}
                  />
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <TableContainer bg="dark.card" borderRadius="xl" border="1px solid" borderColor="dark.border">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="dark.muted">Equipment ID</Th>
                    <Th color="dark.muted">Type</Th>
                    <Th color="dark.muted">Health</Th>
                    <Th color="dark.muted">RUL</Th>
                    <Th color="dark.muted">Status</Th>
                    <Th color="dark.muted">Alerts</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEquipment.map((eq) => (
                    <Tr
                      key={eq.equipment_id}
                      onClick={() => handleEquipmentSelect(eq.equipment_id)}
                      cursor="pointer"
                      _hover={{ bg: 'dark.sidebar' }}
                    >
                      <Td color="dark.text" fontWeight="600">{eq.equipment_id}</Td>
                      <Td color="dark.text">{eq.fd_type}</Td>
                      <Td>
                        <Progress
                          value={eq.health}
                          colorScheme={eq.health >= 80 ? 'green' : eq.health >= 60 ? 'yellow' : 'red'}
                          borderRadius="full"
                          size="sm"
                        />
                        <Text fontSize="xs" color="dark.muted" mt={1}>
                          {eq.health.toFixed(1)}%
                        </Text>
                      </Td>
                      <Td color="dark.text">{eq.rul.toFixed(0)} cycles</Td>
                      <Td>
                        <Badge
                          colorScheme={eq.status === 'healthy' ? 'green' : eq.status === 'warning' ? 'yellow' : 'red'}
                          variant="solid"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          {eq.status}
                        </Badge>
                      </Td>
                      <Td>
                        {eq.alerts.length > 0 ? (
                          <Badge colorScheme="red" variant="solid" borderRadius="full">
                            {eq.alerts.length}
                          </Badge>
                        ) : (
                          <Text color="dark.muted">-</Text>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </VStack>

        {/* Right Column - AI Components */}
        <VStack spacing={6} align="stretch">
          {/* AI Chatbot */}
          <ORCAChatbot />
          
          {/* Maintenance Tasks */}
          <MaintenanceTasks
            equipmentId={selectedEquipment}
            sensorData={currentSensorData}
            rul={currentRUL}
          />
        </VStack>
      </Grid>

      {/* Equipment Selection Alert */}
      {!selectedEquipment && (
        <Alert status="info" borderRadius="lg" mt={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Select Equipment</AlertTitle>
            <AlertDescription>
              Click on any equipment to view detailed sensor data and generate AI-powered maintenance tasks.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Debug Information */}
      <Box
        mt={6}
        p={4}
        bg="dark.sidebar"
        borderRadius="lg"
        border="1px solid"
        borderColor="dark.border"
      >
        <Heading size="md" color="dark.text" mb={4}>
          🔍 Debug Information
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box>
            <Text fontSize="sm" color="dark.muted" fontWeight="600">Equipment State:</Text>
            <Text fontSize="xs" color="dark.text" fontFamily="mono">
              {JSON.stringify(equipment, null, 2)}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="dark.muted" fontWeight="600">Calculated Stats:</Text>
            <Text fontSize="xs" color="dark.text" fontFamily="mono">
              Total: {totalEquipment} | Healthy: {healthyEquipment} | Warning: {warningEquipment} | Critical: {criticalEquipment}
            </Text>
            <Text fontSize="xs" color="dark.text" fontFamily="mono">
              Avg Health: {averageHealth.toFixed(1)}% | Total Alerts: {totalAlerts}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Selected Equipment Info */}
      {selectedEquipment && (
        <Box
          mt={6}
          p={6}
          bg="dark.card"
          borderRadius="xl"
          border="1px solid"
          borderColor="dark.border"
        >
          <HStack justify="space-between" align="center" mb={4}>
            <Heading size="md" color="dark.text">
              Selected Equipment: {selectedEquipment}
            </Heading>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedEquipment('')}
              color="dark.muted"
              _hover={{ color: 'dark.text' }}
            >
              Clear Selection
            </Button>
          </HStack>
          
          {currentSensorData && (
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="dark.muted" fontWeight="600">
                Current Sensor Data (Mock Real-time)
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {Object.entries(currentSensorData).map(([sensor, value]) => (
                  <Box
                    key={sensor}
                    p={3}
                    bg="dark.sidebar"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="dark.border"
                  >
                    <Text fontSize="xs" color="dark.muted" textTransform="uppercase" fontWeight="600">
                      {sensor.replace('_', ' ')}
                    </Text>
                    <Text fontSize="lg" color="dark.text" fontWeight="700">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
}
