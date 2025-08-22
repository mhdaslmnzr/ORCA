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
  gradient?: string;
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
    if (gradient) {
      return 'dark.accent';
    }
    return 'dark.accent';
  };

  const getCardGradient = () => {
    if (gradient) {
      return gradient;
    }
    return 'dark.card';
  };

  return (
    <Box
      bg={gradient ? getCardGradient() : 'dark.card'}
      border="1px solid"
      borderColor="dark.border"
      borderRadius="2xl"
      p={6}
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
        top={-8}
        right={-8}
        w="80px"
        h="80px"
        bg="rgba(99, 102, 241, 0.1)"
        borderRadius="full"
        opacity={0.3}
      />
      
      <VStack spacing={5} align="stretch" position="relative" zIndex={1}>
        <Flex align="center" justify="space-between">
          <Text 
            fontSize="xs" 
            fontWeight="600" 
            color="dark.muted"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            {title}
          </Text>
          <Box
            w={12}
            h={12}
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={getIconBg()}
            color="white"
            shadow="md"
          >
            <Icon as={IconComponent} boxSize={6} />
          </Box>
        </Flex>

        <VStack align="start" spacing={3}>
          <Text 
            fontSize="4xl" 
            fontWeight="700" 
            color="dark.text"
            lineHeight="1"
            letterSpacing="tight"
          >
            {value}
          </Text>
          
          {change && (
            <HStack spacing={2}>
              <Box
                w={6}
                h={6}
                borderRadius="md"
                bg={getChangeColor()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Icon as={getChangeIcon()} boxSize={3} />
              </Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color={getChangeColor()}
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