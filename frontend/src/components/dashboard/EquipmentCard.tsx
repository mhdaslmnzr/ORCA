'use client';

import { Equipment } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Badge,
  Progress,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Wrench, 
  Activity,
  Clock,
  TrendingDown,
  Gauge,
  Wifi
} from 'lucide-react';

interface EquipmentCardProps {
  equipment: Equipment;
  onClick?: () => void;
}

export default function EquipmentCard({ equipment, onClick }: EquipmentCardProps) {
  const cardBg = useColorModeValue('#ffffff', 'gray.800');
  const borderColor = useColorModeValue('#e2e8f0', 'gray.700');
  const textColor = useColorModeValue('#1e293b', 'white');
  const mutedColor = useColorModeValue('#64748b', 'gray.400');

  const getStatusColor = () => {
    switch (equipment.status) {
      case 'operational':
        return '#22c55e'; // green.500
      case 'warning':
        return '#f59e0b'; // orange.500
      case 'critical':
        return '#ef4444'; // red.500
      case 'maintenance':
        return '#3b82f6'; // blue.500
      default:
        return '#6b7280'; // gray.500
    }
  };

  const getStatusBg = () => {
    switch (equipment.status) {
      case 'operational':
        return '#f0fdf4'; // green.50
      case 'warning':
        return '#fffbeb'; // orange.50
      case 'critical':
        return '#fef2f2'; // red.50
      case 'maintenance':
        return '#eff6ff'; // blue.50
      default:
        return '#f8fafc'; // gray.50
    }
  };

  const getStatusBorderColor = () => {
    switch (equipment.status) {
      case 'operational':
        return '#bbf7d0'; // green.200
      case 'warning':
        return '#fde68a'; // orange.200
      case 'critical':
        return '#fecaca'; // red.200
      case 'maintenance':
        return '#bfdbfe'; // blue.200
      default:
        return '#e5e7eb'; // gray.200
    }
  };

  const getHealthColor = () => {
    if (equipment.health >= 80) return '#22c55e'; // green.500
    if (equipment.health >= 60) return '#f59e0b'; // orange.500
    if (equipment.health >= 40) return '#f97316'; // orange.600
    return '#ef4444'; // red.500
  };

  const getHealthBg = () => {
    if (equipment.health >= 80) return 'green';
    if (equipment.health >= 60) return 'yellow';
    if (equipment.health >= 40) return 'orange';
    return 'red';
  };

  const getStatusIcon = () => {
    switch (equipment.status) {
      case 'operational':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'critical':
        return XCircle;
      case 'maintenance':
        return Wrench;
      default:
        return Activity;
    }
  };

  const getStatusText = () => {
    switch (equipment.status) {
      case 'operational':
        return 'Operational';
      case 'warning':
        return 'Warning';
      case 'critical':
        return 'Critical';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const getStatusBadgeColor = () => {
    switch (equipment.status) {
      case 'operational':
        return 'green';
      case 'warning':
        return 'orange';
      case 'critical':
        return 'red';
      case 'maintenance':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Box
      bg={cardBg}
      border="2px solid"
      borderColor={getStatusBorderColor()}
      borderRadius="16px"
      p={6}
      shadow="md"
      cursor={onClick ? 'pointer' : 'default'}
      position="relative"
      overflow="hidden"
      _hover={onClick ? {
        shadow: 'lg',
        transform: 'translateY(-2px)',
        borderColor: getStatusColor(),
      } : {}}
      transition="all 0.2s ease-in-out"
      onClick={onClick}
    >
      {/* Status indicator bar */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h={1}
        bg={getStatusColor()}
        borderTopRadius="16px"
      />

      <VStack spacing={5} align="stretch">
        {/* Header */}
        <Flex align="start" justify="space-between">
          <VStack align="start" spacing={2} flex={1}>
            <Text fontSize="lg" fontWeight="900" color={textColor}>
              {equipment.name}
            </Text>
            <HStack spacing={2}>
              <Icon as={Wifi} boxSize={4} color={mutedColor} />
              <Text fontSize="sm" color={mutedColor} fontWeight="600">
                {equipment.type}
              </Text>
            </HStack>
          </VStack>
          
          <VStack align="end" spacing={3}>
            <Badge
              colorScheme={getStatusBadgeColor()}
              variant="solid"
              borderRadius="8px"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="700"
              textTransform="uppercase"
            >
              {getStatusText()}
            </Badge>
            
            <Box
              w={10}
              h={10}
              borderRadius="10px"
              bg={getStatusColor()}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
            >
              <Icon as={getStatusIcon()} boxSize={5} />
            </Box>
          </VStack>
        </Flex>

        {/* Health Status */}
        <VStack spacing={3} align="stretch">
          <Flex justify="space-between" align="center">
            <HStack spacing={2}>
              <Icon as={Gauge} boxSize={4} color={getHealthColor()} />
              <Text fontSize="sm" fontWeight="700" color={textColor}>
                Health Status
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight="900" color={getHealthColor()}>
              {equipment.health}%
            </Text>
          </Flex>
          
          <Progress
            value={equipment.health}
            colorScheme={getHealthBg()}
            borderRadius="full"
            h={2}
            bg={useColorModeValue('#f1f5f9', 'gray.700')}
          />
        </VStack>

        {/* Equipment Details */}
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between" p={3} bg={useColorModeValue('#f8fafc', 'gray.700')} borderRadius="8px">
            <HStack spacing={2}>
              <Icon as={Clock} boxSize={4} color={mutedColor} />
              <Text fontSize="sm" fontWeight="600" color={mutedColor}>Last Updated</Text>
            </HStack>
            <Text fontSize="sm" fontWeight="700" color={textColor}>
              {formatDate(equipment.lastUpdated)}
            </Text>
          </HStack>
          
          <HStack justify="space-between" p={3} bg={useColorModeValue('#f8fafc', 'gray.700')} borderRadius="8px">
            <HStack spacing={2}>
              <Icon as={Activity} boxSize={4} color={mutedColor} />
              <Text fontSize="sm" fontWeight="600" color={mutedColor}>Performance</Text>
            </HStack>
            <Text fontSize="sm" fontWeight="700" color={textColor}>
              {equipment.performance}%
            </Text>
          </HStack>

          {equipment.status === 'critical' && (
            <Box
              p={3}
              bg="#fef2f2"
              border="1px solid"
              borderColor="#fecaca"
              borderRadius="8px"
            >
              <HStack justify="space-between">
                <HStack spacing={2}>
                  <Icon as={TrendingDown} boxSize={4} color="#ef4444" />
                  <Text fontSize="sm" color="#dc2626" fontWeight="700">Risk Level</Text>
                </HStack>
                <Badge 
                  colorScheme="red" 
                  variant="solid" 
                  borderRadius="6px" 
                  px={2} 
                  py={1}
                  fontSize="xs"
                  fontWeight="700"
                >
                  HIGH RISK
                </Badge>
              </HStack>
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}