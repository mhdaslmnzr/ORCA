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
  Grid,
  Button,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Progress,
  Icon,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { 
  Search, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye,
} from 'lucide-react';
import EquipmentCard from './EquipmentCard';
import StatsCard from './StatsCard';
import ORCAChatbot from '../ai/ORCAChatbot';
import MaintenanceTasks from '../ai/MaintenanceTasks';
import Header from '../layout/Header';
import SideNav from '../layout/SideNav';
import DemoModal from './DemoModal';
import { Equipment, SensorData } from '@/types';
import { api } from '@/lib/api';

export default function PREDATOREnhanced() {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [currentSensorData, setCurrentSensorData] = useState<Record<string, unknown> | undefined>(undefined);
  const [currentRUL, setCurrentRUL] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add demo modal state
  const { isOpen: isDemoOpen, onOpen: onDemoOpen, onClose: onDemoClose } = useDisclosure();

  const [summary, setSummary] = useState<Record<string, unknown> | undefined>(undefined);
  
  const toast = useToast();

  // Fetch equipment data
  const fetchEquipment = useCallback(async () => {
    try {
      console.log('🔍 Fetching equipment data...');
      const data = await api.getEquipment() as Equipment[];
      console.log('✅ Equipment data received:', data);
      setEquipment(data);
    } catch (error) {
      console.error('❌ Error fetching equipment:', error);
    }
  }, []);

  // Fetch sensor data for selected equipment
  const fetchSensorData = async (equipmentId: string) => {
    try {
      const data = await api.getSensorData(equipmentId) as Record<string, unknown>;
      setCurrentSensorData(data);
      
      // Get equipment status for RUL
      const eq = equipment.find(e => e.equipment_id === equipmentId);
      if (eq) {
        setCurrentRUL(eq.rul);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  // Fetch summary data
  const fetchSummary = useCallback(async () => {
    try {
      console.log('🔍 Fetching summary data...');
      const data = await api.getSummary() as Record<string, unknown>;
      console.log('✅ Summary data received:', data);
      setSummary(data);
    } catch (error) {
      console.error('❌ Error fetching summary:', error);
    }
  }, []);

  // Simulate real-time updates
  const simulateUpdate = async () => {
    try {
      await api.simulateUpdate();
      // Refresh data after simulation
      await fetchEquipment();
      await fetchSummary();
      if (selectedEquipment) {
        await fetchSensorData(selectedEquipment);
      }
    } catch (error) {
      console.error('Error simulating update:', error);
    }
  };



  // Handle equipment selection
  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);
    fetchSensorData(equipmentId);
  };



  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        // Initial data fetch
        await fetchEquipment();
        await fetchSummary();
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [fetchEquipment, fetchSummary]);

  // Calculate pagination
  const totalPages = Math.ceil(equipment.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEquipment = equipment.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
    <Box bg="dark.background" minH="100vh">
      {/* Global Header */}
      <Header />
      
      {/* Floating Side Navigation */}
      <SideNav 
        isExpanded={isSideNavExpanded}
        onToggle={() => setIsSideNavExpanded(!isSideNavExpanded)}
      />
      
      {/* Dashboard Content - Reduced padding */}
      <Box p={4} pl={isSideNavExpanded ? "180px" : "80px"}>
        {/* Dashboard Header - Reduced spacing */}
        <VStack spacing={4} align="stretch" mb={6}>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="xl" color="dark.text" fontWeight="900">
                PREDATOR
              </Heading>
              <Text fontSize="md" color="dark.muted">
                Intelligent Predictive Maintenance, Agentic Task Planning & Real-Time Insights
              </Text>
            </VStack>
            
            <HStack spacing={3}>
              <Button
                size="sm"
                leftIcon={<RefreshCw size={14} />}
                onClick={simulateUpdate}
                isLoading={isLoading}
                bg="dark.accent"
                _hover={{ bg: 'dark.info' }}
              >
                Refresh
              </Button>
              
              <Button
                size="sm"
                leftIcon={<Eye size={14} />}
                variant="outline"
                borderColor="dark.border"
                color="dark.text"
                _hover={{ bg: 'dark.accent' }}
                onClick={onDemoOpen}
              >
                Demo
              </Button>
            </HStack>
          </HStack>
        </VStack>

        {/* Main Dashboard Grid - Reduced gap */}
        <Grid templateColumns="2fr 1fr" gap={6}>
          {/* Left Column - Equipment Monitoring */}
          <VStack spacing={4} align="stretch">
            {/* Stats Cards - Reduced spacing */}
            {!isInitialized ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {[1, 2, 3, 4].map((index) => (
                  <Box
                    key={index}
                    p={4}
                    bg="dark.card"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="dark.border"
                    textAlign="center"
                  >
                    <Spinner size="md" color="dark.accent" />
                    <Text color="dark.muted" mt={2} fontSize="sm">Loading...</Text>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {stats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </SimpleGrid>
            )}

            {/* Search and Filters - Reduced spacing */}
            <HStack spacing={3} justify="space-between">
              <HStack spacing={3} flex={1}>
                <InputGroup maxW="350px">
                  <InputLeftElement>
                    <Icon as={Search} color="dark.muted" boxSize={4} />
                  </InputLeftElement>
                  <Input
                    size="sm"
                    placeholder="Search equipment..."
                    bg="dark.card"
                    borderColor="dark.border"
                    color="dark.text"
                    _placeholder={{ color: 'dark.muted' }}
                  />
                </InputGroup>
                
                <Select
                  size="sm"
                  bg="dark.card"
                  borderColor="dark.border"
                  color="dark.text"
                  w="130px"
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </Select>
              </HStack>
            </HStack>

            {/* View Mode Toggle - Reduced spacing */}
            <HStack spacing={2} justify="flex-end">
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

            {/* Equipment Display - Show only 5 items */}
            {!isInitialized ? (
              <Box
                p={6}
                bg="dark.card"
                borderRadius="lg"
                border="1px solid"
                borderColor="dark.border"
                textAlign="center"
              >
                <Spinner size="lg" color="dark.accent" />
                <Text color="dark.muted" mt={3} fontSize="sm">Loading equipment data...</Text>
              </Box>
            ) : viewMode === 'grid' ? (
              <>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {currentEquipment.map((eq) => (
                    <Box
                      key={eq.equipment_id}
                      onClick={() => handleEquipmentSelect(eq.equipment_id)}
                      cursor="pointer"
                      className="card-hover"
                    >
                      <EquipmentCard
                        equipment={eq}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <HStack spacing={2} justify="center" mt={4}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      isDisabled={currentPage === 1}
                      borderColor="dark.border"
                      color="dark.text"
                      _hover={{ bg: 'dark.accent' }}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        size="sm"
                        variant={currentPage === page ? 'solid' : 'outline'}
                        onClick={() => handlePageChange(page)}
                        bg={currentPage === page ? 'dark.accent' : 'transparent'}
                        color={currentPage === page ? 'white' : 'dark.text'}
                        borderColor="dark.border"
                        _hover={{ bg: 'dark.accent' }}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      isDisabled={currentPage === totalPages}
                      borderColor="dark.border"
                      color="dark.text"
                      _hover={{ bg: 'dark.accent' }}
                    >
                      Next
                    </Button>
                  </HStack>
                )}
                
                {/* Equipment Count Info */}
                <Text fontSize="sm" color="dark.muted" textAlign="center">
                  Showing {startIndex + 1}-{Math.min(endIndex, equipment.length)} of {equipment.length} equipment
                </Text>
              </>
            ) : (
              <>
                <TableContainer bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th color="dark.muted" fontSize="xs">Equipment ID</Th>
                        <Th color="dark.muted" fontSize="xs">Name</Th>
                        <Th color="dark.muted" fontSize="xs">Category</Th>
                        <Th color="dark.muted" fontSize="xs">Health</Th>
                        <Th color="dark.muted" fontSize="xs">RUL</Th>
                        <Th color="dark.muted" fontSize="xs">Status</Th>
                        <Th color="dark.muted" fontSize="xs">Location</Th>
                        <Th color="dark.muted" fontSize="xs">Alerts</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {currentEquipment.map((eq) => (
                        <Tr
                          key={eq.equipment_id}
                          onClick={() => handleEquipmentSelect(eq.equipment_id)}
                          cursor="pointer"
                          _hover={{ bg: 'dark.sidebar' }}
                        >
                          <Td color="dark.text" fontWeight="600" fontSize="sm">{eq.equipment_id}</Td>
                          <Td color="dark.text" fontSize="sm">{eq.name}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                eq.category === 'sauce_ingredient' ? 'orange' :
                                eq.category === 'dough_production' ? 'yellow' :
                                eq.category === 'assembly_production' ? 'green' :
                                eq.category === 'baking_cooking' ? 'red' :
                                eq.category === 'packaging_output' ? 'purple' : 'blue'
                              }
                              variant="outline"
                              borderRadius="full"
                              px={2}
                              py={1}
                              fontSize="xs"
                            >
                              {eq.category ? eq.category.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Unknown'}
                            </Badge>
                          </Td>
                          <Td>
                            <Progress
                              value={eq.health}
                              colorScheme={eq.health >= 80 ? 'green' : eq.health >= 60 ? 'yellow' : 'red'}
                              borderRadius="full"
                              size="sm"
                              height="8px"
                            />
                            <Text fontSize="xs" color="dark.muted" mt={1}>
                              {eq.health.toFixed(1)}%
                            </Text>
                          </Td>
                          <Td color="dark.text" fontSize="sm">
                            {eq.rul >= 8760 ? Math.round(eq.rul / 8760) + 'y' :
                             eq.rul >= 168 ? Math.round(eq.rul / 168) + 'w' :
                             eq.rul >= 24 ? Math.round(eq.rul / 24) + 'd' :
                             eq.rul + 'h'}
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={eq.status === 'healthy' ? 'green' : eq.status === 'warning' ? 'yellow' : 'red'}
                              variant="solid"
                              borderRadius="full"
                              px={2}
                              py={1}
                              fontSize="xs"
                            >
                              {eq.status}
                            </Badge>
                          </Td>
                          <Td color="dark.text" fontSize="sm">{eq.location || 'Production Floor'}</Td>
                          <Td>
                            {eq.alerts && eq.alerts.length > 0 ? (
                              <Badge colorScheme="red" variant="solid" borderRadius="full" fontSize="xs">
                                {eq.alerts.length}
                              </Badge>
                            ) : (
                              <Text color="dark.muted" fontSize="sm">-</Text>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                
                {/* Pagination Controls for List View */}
                {totalPages > 1 && (
                  <HStack spacing={2} justify="center" mt={4}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      isDisabled={currentPage === 1}
                      borderColor="dark.border"
                      color="dark.text"
                      _hover={{ bg: 'dark.accent' }}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        size="sm"
                        variant={currentPage === page ? 'solid' : 'outline'}
                        onClick={() => handlePageChange(page)}
                        bg={currentPage === page ? 'dark.accent' : 'transparent'}
                        color={currentPage === page ? 'white' : 'dark.text'}
                        borderColor="dark.border"
                        _hover={{ bg: 'dark.accent' }}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      isDisabled={currentPage === totalPages}
                      borderColor="dark.border"
                      color="dark.text"
                      _hover={{ bg: 'dark.accent' }}
                    >
                      Next
                    </Button>
                  </HStack>
                )}
              </>
            )}
          </VStack>

          {/* Right Column - AI Components - Reduced spacing */}
          <VStack spacing={4} align="stretch">
            {/* AI Chatbot */}
            <ORCAChatbot 
              equipmentContext={selectedEquipment}
              sensorData={currentSensorData}
              rul={currentRUL || undefined}
            />
            
            {/* Maintenance Tasks */}
            <MaintenanceTasks
              equipmentId={selectedEquipment}
              sensorData={currentSensorData}
              rul={currentRUL || undefined}
            />
          </VStack>
        </Grid>

        {/* Selected Equipment Info - Reduced spacing */}
        {selectedEquipment && (
          <Box
            mt={6}
            p={6}
            bg="dark.card"
            borderRadius="lg"
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
                  {currentSensorData && typeof currentSensorData === 'object' && 
                   Object.entries(currentSensorData).map(([sensor, value]) => (
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
                        {typeof value === 'number' ? value.toFixed(2) : String(value)}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            )}
          </Box>
        )}

        {/* Demo Modal */}
        <DemoModal isOpen={isDemoOpen} onClose={onDemoClose} />
      </Box>
    </Box>
  );
}
``