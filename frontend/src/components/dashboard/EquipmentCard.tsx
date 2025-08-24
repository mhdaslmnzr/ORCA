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
import { Equipment } from '@/types';

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
      p={6}
      bg="dark.card"
      borderRadius="xl"
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
        w={3}
        h={3}
        bg={`${getStatusColor(equipment.status)}.400`}
        borderRadius="full"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      />

      {/* Header */}
      <VStack spacing={3} align="stretch" mb={4}>
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Text fontSize="lg" fontWeight="700" color="dark.text" noOfLines={2}>
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
            px={3}
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

        {/* Category Badge */}
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
      <VStack spacing={3} align="stretch" mb={4}>
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="dark.muted" fontWeight="500">
              Health Status
            </Text>
            <Text fontSize="sm" color="dark.text" fontWeight="600">
              {equipment.health.toFixed(1)}%
            </Text>
          </HStack>
          <Progress
            value={equipment.health}
            colorScheme={equipment.health >= 80 ? 'green' : equipment.health >= 60 ? 'yellow' : 'red'}
            borderRadius="full"
            size="sm"
            bg="dark.sidebar"
          />
        </Box>

        <HStack justify="space-between">
          <Text fontSize="sm" color="dark.muted" fontWeight="500">
            Remaining Life
          </Text>
          <Text fontSize="sm" color="dark.accent" fontWeight="600">
            {formatRUL(equipment.rul)}
          </Text>
        </HStack>
      </VStack>

      {/* Location & Manufacturer */}
      <VStack spacing={2} align="stretch" mb={4}>
        {equipment.location && (
          <HStack spacing={2}>
            <Icon as={MapPin} boxSize={4} color="dark.muted" />
            <Text fontSize="sm" color="dark.muted" noOfLines={1}>
              {equipment.location}
            </Text>
          </HStack>
        )}
        
        {equipment.manufacturer && (
          <HStack spacing={2}>
            <Icon as={Building} boxSize={4} color="dark.muted" />
            <Text fontSize="sm" color="dark.muted" noOfLines={1}>
              {equipment.manufacturer}
            </Text>
          </HStack>
        )}
      </VStack>

      {/* Maintenance Info */}
      <VStack spacing={2} align="stretch" mb={4}>
        <HStack justify="space-between">
          <Text fontSize="xs" color="dark.muted" fontWeight="500">
            Last Maintenance
          </Text>
          <Text fontSize="xs" color="dark.text" fontWeight="500">
            {equipment.last_maintenance}
          </Text>
        </HStack>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="dark.muted" fontWeight="500">
            Next Maintenance
          </Text>
          <Text fontSize="xs" color="dark.accent" fontWeight="500">
            {equipment.next_maintenance}
          </Text>
        </HStack>
      </VStack>

      {/* Alerts */}
      {equipment.alerts && equipment.alerts.length > 0 && (
        <Box
          p={2}
          bg="rgba(239, 68, 68, 0.1)"
          border="1px solid"
          borderColor="red.400"
          borderRadius="md"
        >
          <HStack spacing={2}>
            <Icon as={AlertTriangle} boxSize={4} color="red.400" />
            <Text fontSize="xs" color="red.400" fontWeight="500">
              {equipment.alerts[0]}
              {equipment.alerts.length > 1 && ` (+${equipment.alerts.length - 1} more)`}
            </Text>
          </HStack>
        </Box>
      )}

      {/* Cycle Count */}
      {equipment.cycle_count && (
        <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="dark.border">
          <Text fontSize="xs" color="dark.muted" fontWeight="500">
            Cycles
          </Text>
          <Text fontSize="xs" color="dark.text" fontWeight="600">
            {equipment.cycle_count.toLocaleString()}
          </Text>
        </HStack>
      )}
    </Box>
  );
}