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
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { 
  Eye, 
  Play, 
  Pause, 
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

export default function MIRROR() {
  // Mock digital twin data
  const twinMetrics = {
    accuracy: 94.2,
    latency: 12,
    uptime: 99.8,
    scenarios: 156
  };

  const activeScenarios = [
    { id: 1, name: 'Production Line Optimization', status: 'running', progress: 78, impact: 'high' },
    { id: 2, name: 'Energy Efficiency Analysis', status: 'paused', progress: 45, impact: 'medium' },
    { id: 3, name: 'Maintenance Schedule Optimization', status: 'completed', progress: 100, impact: 'high' },
    { id: 4, name: 'Quality Control Simulation', status: 'running', progress: 23, impact: 'medium' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'dark.success';
      case 'paused': return 'dark.warning';
      case 'completed': return 'dark.info';
      default: return 'dark.muted';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'dark.danger';
      case 'medium': return 'dark.warning';
      case 'low': return 'dark.success';
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
              bg="rgba(139, 92, 246, 0.2)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Eye} boxSize={6} color="purple.400" />
            </Box>
            <VStack align="start" spacing={0}>
              <Heading size="lg" color="dark.text">
                MIRROR
              </Heading>
              <Text color="dark.muted" fontSize="sm">
                Digital Twin Intelligence & Scenario Planning
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Digital Twin Metrics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
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
            <Stat>
              <StatLabel fontSize="sm" color="dark.muted">Twin Accuracy</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="700" color="dark.success">
                {twinMetrics.accuracy}%
              </StatNumber>
              <StatHelpText fontSize="xs" color="dark.muted">
                Real-time sync with physical assets
              </StatHelpText>
            </Stat>
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
            <Stat>
              <StatLabel fontSize="sm" color="dark.muted">Response Latency</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="700" color="dark.info">
                {twinMetrics.latency}ms
              </StatNumber>
              <StatHelpText fontSize="xs" color="dark.muted">
                Ultra-fast scenario execution
              </StatHelpText>
            </Stat>
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
            <Stat>
              <StatLabel fontSize="sm" color="dark.muted">System Uptime</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="700" color="dark.success">
                {twinMetrics.uptime}%
              </StatNumber>
              <StatHelpText fontSize="xs" color="dark.muted">
                Continuous monitoring & simulation
              </StatHelpText>
            </Stat>
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
            <Stat>
              <StatLabel fontSize="sm" color="dark.muted">Active Scenarios</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="700" color="dark.accent">
                {twinMetrics.scenarios}
              </StatNumber>
              <StatHelpText fontSize="xs" color="dark.muted">
                Parallel simulations running
              </StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>

        {/* Scenario Management */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                Active Scenarios
              </Text>
              <HStack spacing={2}>
                <Button size="sm" leftIcon={<Icon as={Play} boxSize={4} />} colorScheme="brand">
                  New Scenario
                </Button>
                <Button size="sm" leftIcon={<Icon as={RotateCcw} boxSize={4} />} variant="outline">
                  Reset All
                </Button>
              </HStack>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {activeScenarios.map((scenario) => (
                <Box
                  key={scenario.id}
                  bg="dark.bg"
                  p={4}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="dark.border"
                  _hover={{ borderColor: getStatusColor(scenario.status) }}
                  transition="all 0.2s"
                >
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" fontWeight="600" color="dark.text" noOfLines={1}>
                        {scenario.name}
                      </Text>
                      <HStack spacing={2}>
                        <Badge
                          bg={`${getStatusColor(scenario.status)}10`}
                          color={getStatusColor(scenario.status)}
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor={getStatusColor(scenario.status)}
                        >
                          {scenario.status}
                        </Badge>
                        <Badge
                          bg={`${getImpactColor(scenario.impact)}10`}
                          color={getImpactColor(scenario.impact)}
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor={getImpactColor(scenario.impact)}
                        >
                          {scenario.impact}
                        </Badge>
                      </HStack>
                    </HStack>

                    <Progress 
                      value={scenario.progress} 
                      size="sm" 
                      borderRadius="full"
                      bg="rgba(156, 163, 175, 0.2)"
                      sx={{
                        '& > div': {
                          bg: getStatusColor(scenario.status),
                        }
                      }}
                    />

                    <HStack justify="space-between">
                      <Text fontSize="xs" color="dark.muted">
                        Progress: {scenario.progress}%
                      </Text>
                      <HStack spacing={1}>
                        {scenario.status === 'running' && (
                          <Button size="xs" variant="ghost" colorScheme="brand">
                            <Icon as={Pause} boxSize={3} />
                          </Button>
                        )}
                        {scenario.status === 'paused' && (
                          <Button size="xs" variant="ghost" colorScheme="brand">
                            <Icon as={Play} boxSize={3} />
                          </Button>
                        )}
                        <Button size="xs" variant="ghost" colorScheme="brand">
                          <Icon as={BarChart3} boxSize={3} />
                        </Button>
                      </HStack>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>

        {/* AI Insights Panel */}
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
              <Icon as={Zap} boxSize={5} color="dark.accent" />
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                AI-Powered Insights
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
                <HStack spacing={2}>
                  <Icon as={Target} boxSize={4} color="dark.success" />
                  <Text fontSize="sm" fontWeight="600" color="dark.text">
                    Optimization Opportunity Detected
                  </Text>
                </HStack>
                <Text fontSize="sm" color="dark.muted" lineHeight="1.6">
                  Based on current production line simulation, implementing the suggested workflow changes 
                  could improve efficiency by 12.3% and reduce energy consumption by 8.7%. 
                  The digital twin predicts a 95.2% success probability for this optimization.
                </Text>
                <HStack spacing={2}>
                  <Button size="xs" colorScheme="brand" variant="outline">
                    View Simulation
                  </Button>
                  <Button size="xs" colorScheme="brand" variant="outline">
                    Apply Changes
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
