'use client';

import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  gradient?: string | boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: IconComponent,
  gradient = false,
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'dark.success';
      case 'decrease':
        return 'dark.danger';
      default:
        return 'dark.muted';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return TrendingUp;
      case 'decrease':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getIconBg = () => {
    return 'dark.accent';
  };

  const getCardGradient = () => {
    if (gradient && typeof gradient === 'string') {
      return gradient;
    }
    return 'dark.card';
  };

  return (
    <Box
      bg={getCardGradient()}
      border="1px solid"
      borderColor="dark.border"
      borderRadius="xl"
      p={4}
      shadow="sm"
      position="relative"
      overflow="hidden"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-2px)',
        borderColor: 'dark.accent',
      }}
      transition="all 0.2s"
      cursor="pointer"
    >
      {/* Subtle Background Elements */}
      <Box
        position="absolute"
        top={-6}
        right={-6}
        w="60px"
        h="60px"
        bg="rgba(99, 102, 241, 0.1)"
        borderRadius="full"
        opacity={0.3}
      />
      
      <VStack spacing={3} align="stretch" position="relative" zIndex={1}>
        <Flex align="center" justify="space-between">
          <Text 
            fontSize="xs" 
            color="dark.muted" 
            fontWeight="600" 
            textTransform="uppercase" 
            letterSpacing="wider"
            opacity={0.8}
          >
            {title}
          </Text>
          
          <Box
            p={2}
            bg={getIconBg()}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            boxShadow="0 4px 12px rgba(99, 102, 241, 0.3)"
          >
            <IconComponent size={16} />
          </Box>
        </Flex>
        
        <VStack spacing={1} align="start">
          <Text 
            fontSize="2xl" 
            fontWeight="900" 
            color="dark.text"
            lineHeight="1"
          >
            {value}
          </Text>
          
          {change && (
            <HStack spacing={1}>
              <Icon 
                as={getChangeIcon()} 
                boxSize={3} 
                color={getChangeColor()} 
              />
              <Text 
                fontSize="xs" 
                color={getChangeColor()} 
                fontWeight="600"
              >
                {change}
              </Text>
            </HStack>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}