'use client';

import { useState } from 'react';
import { 
  MOCK_DASHBOARD_STATS, 
  MOCK_EQUIPMENT, 
  MOCK_PREDICTIONS,
  MOCK_ALERTS 
} from '@/data/mockData';
import { formatRUL } from '@/lib/utils';
import StatsCard from './StatsCard';
import EquipmentCard from './EquipmentCard';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Flex,
  useColorModeValue,
  Button,
  SimpleGrid,
  Icon,
  Container,
  Divider,
} from '@chakra-ui/react';
import { 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  TrendingUp,
  Zap,
  Shield,
  Activity,
  Cpu,
  Database,
  Network,
  Play,
  Settings
} from 'lucide-react';

export default function PREDATORDashboard() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const criticalEquipment = MOCK_EQUIPMENT.filter(eq => eq.status === 'critical');
  const warningEquipment = MOCK_EQUIPMENT.filter(eq => eq.status === 'warning');
  const operationalEquipment = MOCK_EQUIPMENT.filter(eq => eq.status === 'operational');

  const bgMain = useColorModeValue('#f8fafc', 'gray.900');
  const cardBg = useColorModeValue('#ffffff', 'gray.800');
  const borderColor = useColorModeValue('#e2e8f0', 'gray.700');
  const textColor = useColorModeValue('#1e293b', 'white');
  const mutedColor = useColorModeValue('#64748b', 'gray.400');

  return (
    <Box bg={bgMain} minH="100vh" p={{ base: 4, md: 6 }}>
      <Container maxW="8xl" px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          {/* Hero Section - Much Simpler and Cleaner */}
          <Box
            bg="linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)"
            borderRadius="24px"
            p={8}
            color="white"
            shadow="xl"
            border="1px solid"
            borderColor="brand.200"
          >
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} alignItems="center">
              <VStack align="start" spacing={6}>
                <HStack spacing={4}>
                  <Box
                    w={16}
                    h={16}
                    bg="rgba(255, 255, 255, 0.2)"
                    borderRadius="16px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="2px solid rgba(255, 255, 255, 0.3)"
                  >
                    <Icon as={Zap} boxSize={8} color="white" />
                  </Box>
                  <Box>
                    <Heading size="2xl" fontWeight="900" color="white">
                      PREDATOR
                    </Heading>
                    <Text fontSize="lg" fontWeight="600" color="rgba(255, 255, 255, 0.9)">
                      Predictive Maintenance Engine
                    </Text>
                  </Box>
                </HStack>
                
                <Text fontSize="lg" color="rgba(255, 255, 255, 0.8)" maxW="2xl" lineHeight="1.6">
                  Advanced AI system for equipment failure prediction and real-time monitoring.
                </Text>
                
                <HStack spacing={4}>
                  <Button
                    leftIcon={<Icon as={Play} boxSize={5} />}
                    bg="rgba(255, 255, 255, 0.9)"
                    color="brand.700"
                    size="lg"
                    px={8}
                    borderRadius="12px"
                    fontWeight="700"
                    _hover={{
                      bg: "white",
                      transform: "translateY(-2px)",
                    }}
                  >
                    Start Analysis
                  </Button>
                  <Button
                    leftIcon={<Icon as={Settings} boxSize={5} />}
                    variant="outline"
                    size="lg"
                    px={8}
                    borderRadius="12px"
                    borderColor="rgba(255, 255, 255, 0.3)"
                    color="white"
                    fontWeight="600"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    Configure
                  </Button>
                </HStack>
              </VStack>
              
              {/* System Status */}
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="700" color="white">
                  System Status
                </Text>
                <VStack spacing={3} bg="rgba(255, 255, 255, 0.1)" p={4} borderRadius="12px">
                  <HStack w="full" justify="space-between">
                    <Text color="rgba(255, 255, 255, 0.8)" fontWeight="600">Active Monitoring</Text>
                    <Badge colorScheme="green" variant="solid" px={3} py={1} borderRadius="8px" fontWeight="700">
                      LIVE
                    </Badge>
                  </HStack>
                  <HStack w="full" justify="space-between">
                    <Text color="rgba(255, 255, 255, 0.8)" fontWeight="600">ML Models</Text>
                    <Text fontWeight="700" color="white">4 Running</Text>
                  </HStack>
                  <HStack w="full" justify="space-between">
                    <Text color="rgba(255, 255, 255, 0.8)" fontWeight="600">Status</Text>
                    <Text fontWeight="700" color="white">Operational</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Grid>
          </Box>

          {/* Stats Cards - Cleaner Design */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="16px"
              shadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              transition="all 0.3s"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="700" color={mutedColor} textTransform="uppercase">
                    Total Equipment
                  </Text>
                  <Box
                    w={12}
                    h={12}
                    bg="brand.500"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    <Icon as={Database} boxSize={6} />
                  </Box>
                </HStack>
                <Text fontSize="3xl" fontWeight="900" color={textColor}>
                  {MOCK_DASHBOARD_STATS.totalEquipment}
                </Text>
              </VStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="16px"
              shadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              transition="all 0.3s"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="700" color={mutedColor} textTransform="uppercase">
                    Operational
                  </Text>
                  <Box
                    w={12}
                    h={12}
                    bg="green.500"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    <Icon as={CheckCircle} boxSize={6} />
                  </Box>
                </HStack>
                <Text fontSize="3xl" fontWeight="900" color={textColor}>
                  {MOCK_DASHBOARD_STATS.operationalEquipment}
                </Text>
                <Text fontSize="sm" fontWeight="600" color="green.600">
                  +2 from yesterday
                </Text>
              </VStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="16px"
              shadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              transition="all 0.3s"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="700" color={mutedColor} textTransform="uppercase">
                    Maintenance Required
                  </Text>
                  <Box
                    w={12}
                    h={12}
                    bg="red.500"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    <Icon as={AlertTriangle} boxSize={6} />
                  </Box>
                </HStack>
                <Text fontSize="3xl" fontWeight="900" color={textColor}>
                  {MOCK_DASHBOARD_STATS.maintenanceRequired}
                </Text>
                <Text fontSize="sm" fontWeight="600" color="red.600">
                  1 critical
                </Text>
              </VStack>
            </Box>

            <Box
              bg={cardBg}
              p={6}
              borderRadius="16px"
              shadow="lg"
              border="1px solid"
              borderColor={borderColor}
              _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              transition="all 0.3s"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="700" color={mutedColor} textTransform="uppercase">
                    System Uptime
                  </Text>
                  <Box
                    w={12}
                    h={12}
                    bg="purple.500"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    <Icon as={Cpu} boxSize={6} />
                  </Box>
                </HStack>
                <Text fontSize="3xl" fontWeight="900" color={textColor}>
                  {MOCK_DASHBOARD_STATS.uptime}%
                </Text>
                <Text fontSize="sm" fontWeight="600" color="green.600">
                  +2.1% this week
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Critical Alerts */}
          {criticalEquipment.length > 0 && (
            <Box
              bg="red.50"
              border="2px solid"
              borderColor="red.200"
              borderRadius="16px"
              p={6}
            >
              <VStack spacing={6} align="stretch">
                <HStack spacing={4}>
                  <Box
                    w={16}
                    h={16}
                    bg="red.500"
                    borderRadius="12px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    <Icon as={AlertTriangle} boxSize={8} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="xl" color="red.700" fontWeight="900">
                      Critical Alerts
                    </Heading>
                    <Text fontSize="lg" color="red.600" fontWeight="600">
                      {criticalEquipment.length} equipment requiring immediate attention
                    </Text>
                  </VStack>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {criticalEquipment.map((equipment) => (
                    <EquipmentCard
                      key={equipment.id}
                      equipment={equipment}
                      onClick={() => setSelectedEquipment(equipment.id)}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}

          {/* Main Content */}
          <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={8}>
            {/* Equipment Status */}
            <GridItem>
              <Box
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="16px"
                p={6}
                shadow="lg"
              >
                <VStack spacing={6} align="stretch">
                  <HStack spacing={4} justify="space-between">
                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        bg="brand.500"
                        borderRadius="12px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                      >
                        <Icon as={Activity} boxSize={6} />
                      </Box>
                      <VStack align="start" spacing={1}>
                        <Heading size="lg" color={textColor} fontWeight="900">
                          Equipment Status
                        </Heading>
                        <Text color={mutedColor} fontSize="md" fontWeight="600">
                          Real-time monitoring and health analytics
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <Button
                      leftIcon={<Icon as={Eye} boxSize={4} />}
                      variant="outline"
                      size="md"
                      borderRadius="8px"
                      fontWeight="600"
                    >
                      View All
                    </Button>
                  </HStack>

                  <Divider borderColor={borderColor} />

                  <VStack spacing={6} align="stretch">
                    {/* Operational Equipment */}
                    {operationalEquipment.length > 0 && (
                      <Box>
                        <HStack spacing={3} mb={4}>
                          <Box w={3} h={3} bg="green.500" borderRadius="full" />
                          <Text fontSize="md" fontWeight="700" color="green.600">
                            Operational Equipment ({operationalEquipment.length})
                          </Text>
                        </HStack>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                          {operationalEquipment.map((equipment) => (
                            <EquipmentCard
                              key={equipment.id}
                              equipment={equipment}
                              onClick={() => setSelectedEquipment(equipment.id)}
                            />
                          ))}
                        </SimpleGrid>
                      </Box>
                    )}

                    {/* Warning Equipment */}
                    {warningEquipment.length > 0 && (
                      <Box>
                        <HStack spacing={3} mb={4}>
                          <Box w={3} h={3} bg="orange.500" borderRadius="full" />
                          <Text fontSize="md" fontWeight="700" color="orange.600">
                            Warning Status ({warningEquipment.length})
                          </Text>
                        </HStack>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                          {warningEquipment.map((equipment) => (
                            <EquipmentCard
                              key={equipment.id}
                              equipment={equipment}
                              onClick={() => setSelectedEquipment(equipment.id)}
                            />
                          ))}
                        </SimpleGrid>
                      </Box>
                    )}
                  </VStack>
                </VStack>
              </Box>
            </GridItem>

            {/* Sidebar */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                {/* AI Insights */}
                <Box
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  p={6}
                  shadow="lg"
                >
                  <VStack spacing={6} align="stretch">
                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        bg="purple.500"
                        borderRadius="12px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                      >
                        <Icon as={Network} boxSize={6} />
                      </Box>
                      <Text fontSize="lg" fontWeight="900" color={textColor}>
                        AI Insights
                      </Text>
                    </HStack>
                    
                    <VStack spacing={4} align="stretch">
                      <Box p={4} bg="purple.50" borderRadius="12px" border="1px solid" borderColor="purple.200">
                        <Text fontSize="sm" fontWeight="700" color="purple.700">
                          Prediction Accuracy
                        </Text>
                        <Text fontSize="2xl" fontWeight="900" color="purple.600">
                          94.7%
                        </Text>
                      </Box>
                      
                      <Box p={4} bg="blue.50" borderRadius="12px" border="1px solid" borderColor="blue.200">
                        <Text fontSize="sm" fontWeight="700" color="blue.700">
                          Models Running
                        </Text>
                        <Text fontSize="2xl" fontWeight="900" color="blue.600">
                          4/4
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </Box>

                {/* Quick Actions */}
                <Box
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  p={6}
                  shadow="lg"
                >
                  <VStack spacing={6} align="stretch">
                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        bg="brand.500"
                        borderRadius="12px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                      >
                        <Icon as={Shield} boxSize={6} />
                      </Box>
                      <Text fontSize="lg" fontWeight="900" color={textColor}>
                        Quick Actions
                      </Text>
                    </HStack>
                    
                    <VStack spacing={3} align="stretch">
                      <Button
                        leftIcon={<Icon as={BarChart3} boxSize={4} />}
                        variant="outline"
                        size="md"
                        borderRadius="8px"
                        justifyContent="flex-start"
                        fontWeight="600"
                      >
                        Generate Report
                      </Button>
                      <Button
                        leftIcon={<Icon as={TrendingUp} boxSize={4} />}
                        variant="outline"
                        size="md"
                        borderRadius="8px"
                        justifyContent="flex-start"
                        fontWeight="600"
                      >
                        View Analytics
                      </Button>
                      <Button
                        leftIcon={<Icon as={AlertTriangle} boxSize={4} />}
                        variant="outline"
                        size="md"
                        borderRadius="8px"
                        justifyContent="flex-start"
                        fontWeight="600"
                      >
                        Alert Settings
                      </Button>
                    </VStack>
                  </VStack>
                </Box>

                {/* System Health */}
                <Box
                  bg="green.50"
                  border="2px solid"
                  borderColor="green.200"
                  borderRadius="16px"
                  p={6}
                  shadow="lg"
                >
                  <VStack spacing={6} align="stretch">
                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        bg="green.500"
                        borderRadius="12px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                      >
                        <Icon as={CheckCircle} boxSize={6} />
                      </Box>
                      <Text fontSize="lg" fontWeight="900" color="green.700">
                        System Health
                      </Text>
                    </HStack>
                    
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between" align="center">
                        <Text fontSize="md" color="green.600" fontWeight="600">Overall Status</Text>
                        <Badge colorScheme="green" variant="solid" px={3} py={1} borderRadius="8px" fontWeight="700">
                          EXCELLENT
                        </Badge>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <Text fontSize="md" color="green.600" fontWeight="600">Last Check</Text>
                        <Text fontSize="md" fontWeight="700" color="green.700">2 min ago</Text>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <Text fontSize="md" color="green.600" fontWeight="600">Next Scan</Text>
                        <Text fontSize="md" fontWeight="700" color="green.700">3 min</Text>
                      </Flex>
                    </VStack>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}