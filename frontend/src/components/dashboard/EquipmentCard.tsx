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
  Icon,
  IconButton,
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
  Wifi,
  MoreVertical,
  Eye
} from 'lucide-react';

interface EquipmentCardProps {
  equipment: Equipment;
  viewMode?: 'grid' | 'list';
  onClick?: () => void;
}

export default function EquipmentCard({ equipment, viewMode = 'grid', onClick }: EquipmentCardProps) {
  const getStatusColor = () => {
    switch (equipment.status) {
      case 'operational':
        return 'dark.success';
      case 'warning':
        return 'dark.warning';
      case 'critical':
        return 'dark.danger';
      case 'maintenance':
        return 'dark.info';
      default:
        return 'dark.muted';
    }
  };

  const getStatusBg = () => {
    switch (equipment.status) {
      case 'operational':
        return 'rgba(16, 185, 129, 0.1)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.1)';
      case 'critical':
        return 'rgba(239, 68, 68, 0.1)';
      case 'maintenance':
        return 'rgba(59, 130, 246, 0.1)';
      default:
        return 'rgba(156, 163, 175, 0.1)';
    }
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

  const getHealthColor = () => {
    if (equipment.health >= 80) return 'dark.success';
    if (equipment.health >= 60) return 'dark.warning';
    if (equipment.health >= 40) return 'dark.warning';
    return 'dark.danger';
  };

  const StatusIcon = getStatusIcon();

  if (viewMode === 'list') {
    return (
      <Box
        bg="dark.card"
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor="dark.border"
        shadow="sm"
        _hover={{ shadow: 'md', borderColor: getStatusColor() }}
        transition="all 0.2s"
        cursor="pointer"
        onClick={onClick}
        className="equipment-card"
      >
        <HStack spacing={6} align="center">
          {/* Status Icon */}
          <Box
            w={12}
            h={12}
            bg={getStatusBg()}
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor={getStatusColor()}
          >
            <Icon as={StatusIcon} boxSize={6} color={getStatusColor()} />
          </Box>

          {/* Equipment Info */}
          <VStack align="start" spacing={2} flex={1}>
            <HStack justify="space-between" w="full">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                {equipment.name}
              </Text>
              <Badge
                bg={getStatusBg()}
                color={getStatusColor()}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
                border="1px solid"
                borderColor={getStatusColor()}
              >
                {equipment.status}
              </Badge>
            </HStack>
            
            <Text fontSize="sm" color="dark.muted">
              {equipment.type} • {equipment.location}
            </Text>
            
            <HStack spacing={6}>
              <HStack spacing={2}>
                <Icon as={Gauge} boxSize={4} color="dark.muted" />
                <Text fontSize="sm" color="dark.muted">
                  Health: {equipment.health}%
                </Text>
              </HStack>
              
              <HStack spacing={2}>
                <Icon as={Clock} boxSize={4} color="dark.muted" />
                <Text fontSize="sm" color="dark.muted">
                  Updated: {formatDate(equipment.lastUpdated)}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Health Bar */}
          <VStack align="end" spacing={2} minW="120px">
            <Text fontSize="sm" fontWeight="500" color="dark.text">
              {equipment.health}%
            </Text>
            <Progress 
              value={equipment.health} 
              size="sm" 
              w="full"
              borderRadius="full"
              bg="rgba(156, 163, 175, 0.2)"
              sx={{
                '& > div': {
                  bg: getHealthColor(),
                }
              }}
            />
          </VStack>

          {/* Actions */}
          <IconButton
            aria-label="View details"
            icon={<Icon as={Eye} boxSize={4} />}
            variant="ghost"
            size="sm"
            color="dark.muted"
            _hover={{ bg: `${getStatusColor()}10`, color: getStatusColor() }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          />
        </HStack>
      </Box>
    );
  }

  // Grid view (default)
  return (
    <Box
      bg="dark.card"
      p={6}
      borderRadius="2xl"
      border="1px solid"
      borderColor="dark.border"
      shadow="sm"
      _hover={{ 
        shadow: 'lg', 
        borderColor: getStatusColor(),
        transform: 'translateY(-2px)'
      }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={onClick}
      position="relative"
      overflow="hidden"
      className="equipment-card"
    >
      {/* Status indicator line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h={1}
        bg={getStatusColor()}
      />

      {/* Header */}
      <HStack justify="space-between" mb={4}>
        <HStack spacing={3}>
          <Box
            w={10}
            h={10}
            bg={getStatusBg()}
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor={getStatusColor()}
          >
            <Icon as={StatusIcon} boxSize={5} color={getStatusColor()} />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontSize="lg" fontWeight="600" color="dark.text" noOfLines={1}>
              {equipment.name}
            </Text>
            <Text fontSize="xs" color="dark.muted" fontWeight="500">
              {equipment.type}
            </Text>
          </VStack>
        </HStack>
        
        <IconButton
          aria-label="More options"
          icon={<Icon as={MoreVertical} boxSize={4} />}
          variant="ghost"
          size="sm"
          color="dark.muted"
          _hover={{ bg: 'rgba(156, 163, 175, 0.1)' }}
          onClick={(e) => {
            e.stopPropagation();
            // Handle menu options
          }}
        />
      </HStack>

      {/* Equipment Details */}
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="sm" color="dark.muted">
            Location
          </Text>
          <Text fontSize="sm" fontWeight="500" color="dark.text">
            {equipment.location}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" color="dark.muted">
            Status
          </Text>
          <Badge
            bg={getStatusBg()}
            color={getStatusColor()}
            px={2}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="600"
            border="1px solid"
            borderColor={getStatusColor()}
          >
            {equipment.status}
          </Badge>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" color="dark.muted">
            Last Updated
          </Text>
          <Text fontSize="sm" fontWeight="500" color="dark.text">
            {formatDate(equipment.lastUpdated)}
          </Text>
        </HStack>

        {/* Health Section */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="dark.muted">
              Health
            </Text>
            <Text fontSize="sm" fontWeight="600" color={getHealthColor()}>
              {equipment.health}%
            </Text>
          </HStack>
          <Progress 
            value={equipment.health} 
            size="sm" 
            borderRadius="full"
            bg="rgba(156, 163, 175, 0.2)"
            sx={{
              '& > div': {
                bg: getHealthColor(),
              }
            }}
          />
        </Box>

        {/* Connection Status */}
        <HStack justify="space-between">
          <Text fontSize="sm" color="dark.muted">
            Connection
          </Text>
          <HStack spacing={1}>
            <Box w={2} h={2} bg="dark.success" borderRadius="full" />
            <Text fontSize="xs" color="dark.muted">
              Online
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}