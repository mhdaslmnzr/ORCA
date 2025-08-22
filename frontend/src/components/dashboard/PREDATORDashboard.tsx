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
  BarChart3
} from 'lucide-react';
import { useState } from 'react';
import { MOCK_EQUIPMENT as mockEquipment } from '@/data/mockData';
import EquipmentCard from './EquipmentCard';
import StatsCard from './StatsCard';

export default function PREDATORDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter equipment based on search and status
  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         equipment.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || equipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate overall health metrics
  const totalEquipment = mockEquipment.length;
  const healthyEquipment = mockEquipment.filter(e => e.health >= 80).length;
  const warningEquipment = mockEquipment.filter(e => e.health >= 60 && e.health < 80).length;
  const criticalEquipment = mockEquipment.filter(e => e.health < 60).length;
  const averageHealth = mockEquipment.reduce((sum, e) => sum + e.health, 0) / totalEquipment;

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
      value: criticalEquipment,
      change: '-2',
      changeType: 'decrease' as const,
      icon: AlertTriangle,
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 100%)'
    }
  ];

  return (
    <Box p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={2}>
          <HStack spacing={3}>
            <Box
              w={12}
              h={12}
              bg="rgba(99, 102, 241, 0.2)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Zap} boxSize={6} color="dark.accent" />
            </Box>
            <VStack align="start" spacing={0}>
              <Heading size="lg" color="dark.text">
                PREDATOR
              </Heading>
              <Text color="dark.muted" fontSize="sm">
                Predictive Maintenance Engine & Equipment Health Monitoring
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          ))}
        </SimpleGrid>

        {/* Controls */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                Equipment Overview
              </Text>
              <HStack spacing={3}>
                {/* Search */}
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Search} color="dark.muted" boxSize={4} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search equipment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="dark.bg"
                    borderColor="dark.border"
                    color="dark.text"
                    _placeholder={{ color: 'dark.muted' }}
                    _focus={{ borderColor: 'dark.accent' }}
                  />
                </InputGroup>

                {/* Status Filter */}
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  bg="dark.bg"
                  borderColor="dark.border"
                  color="dark.text"
                  maxW="150px"
                  _focus={{ borderColor: 'dark.accent' }}
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </Select>

                {/* View Mode Toggle */}
                <HStack spacing={1} bg="dark.bg" p={1} borderRadius="lg">
                  <Button
                    size="sm"
                    variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                    colorScheme="brand"
                    onClick={() => setViewMode('grid')}
                    borderRadius="md"
                  >
                    <Icon as={BarChart3} boxSize={4} />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'list' ? 'solid' : 'ghost'}
                    colorScheme="brand"
                    onClick={() => setViewMode('list')}
                    borderRadius="md"
                  >
                    <Icon as={Activity} boxSize={4} />
                  </Button>
                </HStack>
              </HStack>
            </HStack>

            {/* Results Count */}
            <Text fontSize="sm" color="dark.muted">
              Showing {filteredEquipment.length} of {totalEquipment} equipment
            </Text>
          </VStack>
        </Box>

        {/* Equipment Display */}
        {viewMode === 'grid' ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredEquipment.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            bg="dark.card"
            borderRadius="2xl"
            border="1px solid"
            borderColor="dark.border"
            shadow="sm"
            overflow="hidden"
          >
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr bg="dark.bg">
                    <Th color="dark.muted">Equipment</Th>
                    <Th color="dark.muted">Type</Th>
                    <Th color="dark.muted">Health</Th>
                    <Th color="dark.muted">Status</Th>
                    <Th color="dark.muted">Last Maintenance</Th>
                    <Th color="dark.muted">RUL</Th>
                    <Th color="dark.muted">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEquipment.map((equipment) => (
                    <Tr key={equipment.id} _hover={{ bg: 'dark.bg' }}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text color="dark.text" fontWeight="600" fontSize="sm">
                            {equipment.name}
                          </Text>
                          <Text color="dark.muted" fontSize="xs">
                            ID: {equipment.id}
                          </Text>
                        </VStack>
                      </Td>
                      <Td color="dark.text" fontSize="sm">
                        {equipment.type}
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text color="dark.text" fontWeight="600" fontSize="sm">
                            {equipment.health}%
                          </Text>
                          <Progress 
                            value={equipment.health} 
                            size="sm" 
                            w="100px"
                            borderRadius="full"
                            bg="rgba(156, 163, 175, 0.2)"
                            sx={{
                              '& > div': {
                                bg: equipment.health >= 80 ? 'dark.success' : 
                                     equipment.health >= 60 ? 'dark.warning' : 'dark.danger',
                              }
                            }}
                          />
                        </VStack>
                      </Td>
                      <Td>
                        <Badge
                          bg={`${equipment.status === 'healthy' ? 'dark.success' : 
                                equipment.status === 'warning' ? 'dark.warning' : 'dark.danger'}10`}
                          color={equipment.status === 'healthy' ? 'dark.success' : 
                                 equipment.status === 'warning' ? 'dark.warning' : 'dark.danger'}
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor={equipment.status === 'healthy' ? 'dark.success' : 
                                      equipment.status === 'warning' ? 'dark.warning' : 'dark.danger'}
                        >
                          {equipment.status}
                        </Badge>
                      </Td>
                      <Td color="dark.muted" fontSize="sm">
                        {equipment.lastMaintenance}
                      </Td>
                      <Td color="dark.text" fontSize="sm" fontWeight="500">
                        {equipment.rul} hours
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <Button size="xs" variant="ghost" colorScheme="brand">
                            <Icon as={BarChart3} boxSize={3} />
                          </Button>
                          <Button size="xs" variant="ghost" colorScheme="brand">
                            <Icon as={Clock} boxSize={3} />
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}

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
                AI-Powered Maintenance Insights
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
                  <Icon as={AlertTriangle} boxSize={4} color="dark.warning" />
                  <Text fontSize="sm" fontWeight="600" color="dark.text">
                    Predictive Maintenance Alert
                  </Text>
                </HStack>
                <Text fontSize="sm" color="dark.muted" lineHeight="1.6">
                  Based on current sensor data and historical patterns, Production Line A is showing 
                  early signs of bearing wear. Recommended maintenance within 48 hours to prevent 
                  unplanned downtime. Estimated cost savings: $15,000.
                </Text>
                <HStack spacing={2}>
                  <Button size="xs" colorScheme="brand" variant="outline">
                    Schedule Maintenance
                  </Button>
                  <Button size="xs" colorScheme="brand" variant="outline">
                    View Analysis
                  </Button>
                  <Button size="xs" variant="outline">
                    Dismiss
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
