'use client';

import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { 
  MapPin, 
  Building, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap
} from 'lucide-react';
import { Equipment } from '../../types';

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'green';
      case 'warning': return 'yellow';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return Clock;
      case 'critical': return AlertTriangle;
      default: return Zap;
    }
  };

  const formatRUL = (rul: number) => {
    if (rul >= 8760) return `${Math.round(rul / 8760)} years`;
    if (rul >= 168) return `${Math.round(rul / 168)} weeks`;
    if (rul >= 24) return `${Math.round(rul / 24)} days`;
    return `${rul} hours`;
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'blue';
    switch (category) {
      case 'sauce_ingredient': return 'orange';
      case 'dough_production': return 'yellow';
      case 'assembly_production': return 'green';
      case 'baking_cooking': return 'red';
      case 'packaging_output': return 'purple';
      default: return 'blue';
    }
  };

  const getCategoryDisplayName = (category?: string) => {
    if (!category) return 'Unknown';
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Box
      p={4}
      bg="dark.card"
      borderRadius="lg"
      border="1px solid"
      borderColor="dark.border"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        borderColor: 'dark.accent'
      }}
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
    >
      {/* Status Indicator */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w={2}
        h={2}
        bg={`${getStatusColor(equipment.status)}.400`}
        borderRadius="full"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      />

        {/* Header */}
      <VStack spacing={2} align="stretch" mb={3}>
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Text fontSize="md" fontWeight="700" color="dark.text" noOfLines={2}>
              {equipment.name}
            </Text>
            <Text fontSize="sm" color="dark.muted" fontWeight="500">
              {equipment.fd_type}
              </Text>
          </VStack>
            <Badge
            colorScheme={getStatusColor(equipment.status)}
              variant="solid"
            borderRadius="full"
            px={2}
              py={1}
              fontSize="xs"
            fontWeight="600"
            >
            <HStack spacing={1}>
              <Icon as={getStatusIcon(equipment.status)} boxSize={3} />
              <Text>{equipment.status}</Text>
            </HStack>
            </Badge>
        </HStack>
        
        {equipment.category && (
          <Badge
            colorScheme={getCategoryColor(equipment.category)}
            variant="outline"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="500"
            alignSelf="start"
          >
            {getCategoryDisplayName(equipment.category)}
          </Badge>
        )}
          </VStack>

      {/* Health & RUL */}
      <VStack spacing={3} align="stretch" mb={3}>
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" color="dark.muted" fontWeight="500">
                Health Status
              </Text>
            <Text fontSize="xs" color="dark.text" fontWeight="600">
              {equipment.health.toFixed(1)}%
            </Text>
            </HStack>
          <Progress
            value={equipment.health}
            colorScheme={equipment.health >= 80 ? 'green' : equipment.health >= 60 ? 'yellow' : 'red'}
            borderRadius="full"
            size="sm"
            height="6px"
          />
        </Box>
        
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" color="dark.muted" fontWeight="500">
              Remaining Life
            </Text>
            <Text fontSize="xs" color="dark.text" fontWeight="600">
              {formatRUL(equipment.rul)}
            </Text>
          </HStack>
          <Box
            bg="rgba(99, 102, 241, 0.1)"
            border="1px solid"
            borderColor="rgba(99, 102, 241, 0.3)"
            borderRadius="md"
            p={2}
            textAlign="center"
          >
            <Text fontSize="xs" color="dark.accent" fontWeight="600">
              {equipment.rul >= 8760 ? `${Math.round(equipment.rul / 8760)}y` :
               equipment.rul >= 168 ? `${Math.round(equipment.rul / 168)}w` :
               equipment.rul >= 24 ? `${Math.round(equipment.rul / 24)}d` :
               `${equipment.rul}h`}
            </Text>
          </Box>
        </Box>
        </VStack>

      {/* Location & Manufacturer */}
      <VStack spacing={2} align="stretch" mb={3}>
            <HStack spacing={2}>
          <Icon as={MapPin} boxSize={3} color="dark.muted" />
          <Text fontSize="xs" color="dark.muted" noOfLines={1}>
            {equipment.location || 'Production Floor'}
            </Text>
          </HStack>
          
            <HStack spacing={2}>
          <Icon as={Building} boxSize={3} color="dark.muted" />
          <Text fontSize="xs" color="dark.muted" noOfLines={1}>
            {equipment.manufacturer || 'Unknown'}
          </Text>
            </HStack>
      </VStack>

      {/* Maintenance Info */}
      <VStack spacing={2} align="stretch" mb={3}>
        <HStack spacing={2}>
          <Icon as={Clock} boxSize={3} color="dark.muted" />
          <Text fontSize="xs" color="dark.muted">
            Last: {equipment.last_maintenance || 'Unknown'}
            </Text>
          </HStack>

        <HStack spacing={2}>
          <Icon as={Zap} boxSize={3} color="dark.muted" />
          <Text fontSize="xs" color="dark.muted">
            Next: {equipment.next_maintenance || 'Unknown'}
          </Text>
        </HStack>
      </VStack>

      {/* Alerts */}
      {equipment.alerts && equipment.alerts.length > 0 && (
        <Box
          bg="rgba(239, 68, 68, 0.1)"
              border="1px solid"
          borderColor="rgba(239, 68, 68, 0.3)"
          borderRadius="md"
          p={2}
        >
          <HStack spacing={2} mb={1}>
            <Icon as={AlertTriangle} boxSize={3} color="red.400" />
            <Text fontSize="xs" color="red.400" fontWeight="600">
              {equipment.alerts.length} Alert{equipment.alerts.length > 1 ? 's' : ''}
            </Text>
                </HStack>
          <Text fontSize="xs" color="dark.muted" noOfLines={2}>
            {equipment.alerts[0]}
          </Text>
            </Box>
          )}

      {/* Cycle Count */}
      <Box
        bg="rgba(99, 102, 241, 0.05)"
        border="1px solid"
        borderColor="rgba(99, 102, 241, 0.2)"
        borderRadius="md"
        p={2}
        textAlign="center"
        mt={2}
      >
        <Text fontSize="xs" color="dark.accent" fontWeight="600">
          Cycle Count: {equipment.cycle_count?.toLocaleString() || '0'}
        </Text>
      </Box>
    </Box>
  );
}