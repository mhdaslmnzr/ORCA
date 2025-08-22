'use client';

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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Progress,
} from '@chakra-ui/react';
import { 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Info,
  Bell,
  Volume2,
  VolumeX,
  Eye,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

export default function SIREN() {
  // Mock alert data
  const alertStats = {
    total: 24,
    critical: 3,
    warning: 8,
    info: 13,
    resolved: 18
  };

  const activeAlerts = [
    { 
      id: 1, 
      title: 'Equipment Temperature Critical', 
      severity: 'critical', 
      equipment: 'Production Line A', 
      time: '2 min ago',
      description: 'Temperature exceeded safety threshold by 15°C',
      action: 'Immediate shutdown required',
      status: 'active'
    },
    { 
      id: 2, 
      title: 'Pressure Drop Detected', 
      severity: 'warning', 
      equipment: 'Compressor Unit B', 
      time: '5 min ago',
      description: 'Pressure dropped below operational range',
      action: 'Check valve system and filters',
      status: 'active'
    },
    { 
      id: 3, 
      title: 'Vibration Anomaly', 
      severity: 'warning', 
      equipment: 'Motor Assembly C', 
      time: '8 min ago',
      description: 'Unusual vibration pattern detected',
      action: 'Schedule maintenance inspection',
      status: 'acknowledged'
    },
    { 
      id: 4, 
      title: 'Quality Control Alert', 
      severity: 'info', 
      equipment: 'QC Station D', 
      time: '12 min ago',
      description: 'Product quality metrics below standard',
      action: 'Review production parameters',
      status: 'resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'dark.danger';
      case 'warning': return 'dark.warning';
      case 'info': return 'dark.info';
      default: return 'dark.muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'dark.danger';
      case 'acknowledged': return 'dark.warning';
      case 'resolved': return 'dark.success';
      default: return 'dark.muted';
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={2}>
          <HStack spacing={3}>
            <Box
              w={12}
              h={12}
              bg="rgba(239, 68, 68, 0.2)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Bell} boxSize={6} color="dark.danger" />
            </Box>
            <VStack align="start" spacing={0}>
              <Heading size="lg" color="dark.text">
                SIREN
              </Heading>
              <Text color="dark.muted" fontSize="sm">
                Real-Time Alerting System with AI Context
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Alert Statistics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6}>
          <Box
            bg="dark.card"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="dark.border"
            shadow="sm"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
            className="dashboard-card"
          >
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="dark.muted" textTransform="uppercase">
                Total Alerts
              </Text>
              <Text fontSize="3xl" fontWeight="700" color="dark.text">
                {alertStats.total}
              </Text>
              <Progress 
                value={(alertStats.resolved / alertStats.total) * 100} 
                size="sm" 
                borderRadius="full"
                bg="rgba(156, 163, 175, 0.2)"
                sx={{
                  '& > div': {
                    bg: 'dark.success',
                  }
                }}
              />
            </VStack>
          </Box>

          <Box
            bg="dark.card"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="dark.border"
            shadow="sm"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
            className="dashboard-card"
          >
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="dark.muted" textTransform="uppercase">
                Critical
              </Text>
              <Text fontSize="3xl" fontWeight="700" color="dark.danger">
                {alertStats.critical}
              </Text>
              <Badge
                bg="rgba(239, 68, 68, 0.1)"
                color="dark.danger"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
                border="1px solid"
                borderColor="dark.danger"
                alignSelf="start"
              >
                Requires Immediate Action
              </Badge>
            </VStack>
          </Box>

          <Box
            bg="dark.card"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="dark.border"
            shadow="sm"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
            className="dashboard-card"
          >
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="dark.muted" textTransform="uppercase">
                Warning
              </Text>
              <Text fontSize="3xl" fontWeight="700" color="dark.warning">
                {alertStats.warning}
              </Text>
              <Badge
                bg="rgba(245, 158, 11, 0.1)"
                color="dark.warning"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
                border="1px solid"
                borderColor="dark.warning"
                alignSelf="start"
              >
                Monitor Closely
              </Badge>
            </VStack>
          </Box>

          <Box
            bg="dark.card"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="dark.border"
            shadow="sm"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
            className="dashboard-card"
          >
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="dark.muted" textTransform="uppercase">
                Info
              </Text>
              <Text fontSize="3xl" fontWeight="700" color="dark.info">
                {alertStats.info}
              </Text>
              <Badge
                bg="rgba(59, 130, 246, 0.1)"
                color="dark.info"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
                border="1px solid"
                borderColor="dark.info"
                alignSelf="start"
              >
                For Awareness
              </Badge>
            </VStack>
          </Box>

          <Box
            bg="dark.card"
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="dark.border"
            shadow="sm"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
            className="dashboard-card"
          >
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="600" color="dark.muted" textTransform="uppercase">
                Resolved
              </Text>
              <Text fontSize="3xl" fontWeight="700" color="dark.success">
                {alertStats.resolved}
              </Text>
              <Badge
                bg="rgba(16, 185, 129, 0.1)"
                color="dark.success"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
                border="1px solid"
                borderColor="dark.success"
                alignSelf="start"
              >
                Successfully Handled
              </Badge>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Critical Alert Banner */}
        {alertStats.critical > 0 && (
          <Alert
            status="error"
            variant="solid"
            bg="rgba(239, 68, 68, 0.1)"
            border="1px solid"
            borderColor="dark.danger"
            borderRadius="xl"
            color="dark.danger"
          >
            <AlertIcon as={XCircle} />
            <Box>
              <AlertTitle>Critical Alerts Active!</AlertTitle>
              <AlertDescription>
                {alertStats.critical} critical alerts require immediate attention. 
                Equipment safety and production continuity may be at risk.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Alert Management Controls */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                Alert Management
              </Text>
              <HStack spacing={2}>
                <Button size="sm" leftIcon={<Icon as={Volume2} boxSize={4} />} colorScheme="brand">
                  Enable Audio
                </Button>
                <Button size="sm" leftIcon={<Icon as={VolumeX} boxSize={4} />} variant="outline">
                  Mute All
                </Button>
                <Button size="sm" leftIcon={<Icon as={RotateCcw} boxSize={4} />} variant="outline">
                  Reset System
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        {/* Active Alerts Table */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                Active Alerts
              </Text>
              <Button size="sm" colorScheme="brand" variant="outline">
                View All History
              </Button>
            </HStack>
            
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th color="dark.muted">Alert</Th>
                    <Th color="dark.muted">Severity</Th>
                    <Th color="dark.muted">Equipment</Th>
                    <Th color="dark.muted">Time</Th>
                    <Th color="dark.muted">Status</Th>
                    <Th color="dark.muted">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {activeAlerts.map((alert) => (
                    <Tr key={alert.id}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text color="dark.text" fontWeight="600" fontSize="sm">
                            {alert.title}
                          </Text>
                          <Text color="dark.muted" fontSize="xs" noOfLines={2}>
                            {alert.description}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge
                          bg={`${getSeverityColor(alert.severity)}10`}
                          color={getSeverityColor(alert.severity)}
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor={getSeverityColor(alert.severity)}
                        >
                          <HStack spacing={1}>
                            <Icon as={getSeverityIcon(alert.severity)} boxSize={3} />
                            <Text>{alert.severity}</Text>
                          </HStack>
                        </Badge>
                      </Td>
                      <Td color="dark.text" fontSize="sm" fontWeight="500">
                        {alert.equipment}
                      </Td>
                      <Td color="dark.muted" fontSize="sm">
                        {alert.time}
                      </Td>
                      <Td>
                        <Badge
                          bg={`${getStatusColor(alert.status)}10`}
                          color={getStatusColor(alert.status)}
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor={getStatusColor(alert.status)}
                        >
                          {alert.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <Button size="xs" variant="ghost" colorScheme="brand">
                            <Icon as={Eye} boxSize={3} />
                          </Button>
                          {alert.status === 'active' && (
                            <Button size="xs" variant="ghost" colorScheme="brand">
                              <Icon as={CheckCircle} boxSize={3} />
                            </Button>
                          )}
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Box>

        {/* AI-Powered Recommendations */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack spacing={3}>
              <Icon as={AlertTriangle} boxSize={5} color="dark.warning" />
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                AI-Powered Recommendations
              </Text>
            </HStack>
            
            <Box
              bg="dark.bg"
              p={4}
              borderRadius="xl"
              border="1px solid"
              borderColor="dark.border"
            >
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" fontWeight="600" color="dark.text">
                  Recommended Action for Critical Temperature Alert
                </Text>
                <Text fontSize="sm" color="dark.muted" lineHeight="1.6">
                  Based on historical data and current sensor readings, the AI recommends immediate 
                  shutdown of Production Line A. This pattern has been observed 3 times in the last 
                  6 months, with 100% correlation to bearing failure within 2-4 hours.
                </Text>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Execute Recommendation
                  </Button>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    View Analysis
                  </Button>
                  <Button size="sm" variant="outline">
                    Override
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
