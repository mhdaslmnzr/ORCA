'use client';

import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: string;
  gradient?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: IconComponent,
  color,
  gradient = false,
}: StatsCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'success.500';
      case 'negative':
        return 'error.500';
      default:
        return mutedColor;
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return TrendingUp;
      case 'negative':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getIconBg = () => {
    if (gradient) {
      return `linear-gradient(135deg, ${color} 0%, ${color.replace('500', '600')} 100%)`;
    }
    return color;
  };

  const getCardGradient = () => {
    if (gradient) {
      const baseColor = color.split('.')[0];
      return `linear-gradient(135deg, ${baseColor}.50 0%, ${baseColor}.100 100%)`;
    }
    return cardBg;
  };

  return (
    <Box
      bg={gradient ? getCardGradient() : cardBg}
      border="2px solid"
      borderColor={gradient ? `${color.split('.')[0]}.200` : borderColor}
      borderRadius="3xl"
      p={8}
      shadow="2xl"
      position="relative"
      overflow="hidden"
      _hover={{
        shadow: '2xl',
        transform: 'translateY(-8px) scale(1.02)',
        borderColor: gradient ? `${color.split('.')[0]}.300` : 'brand.300',
      }}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
    >
      {/* Animated Background Elements */}
      <Box
        position="absolute"
        top={-10}
        right={-10}
        w="120px"
        h="120px"
        bg={gradient ? `${color.split('.')[0]}.100` : 'gray.50'}
        borderRadius="full"
        opacity={0.3}
        animation="float 6s ease-in-out infinite"
      />
      
      <Box
        position="absolute"
        bottom={-5}
        left={-5}
        w="80px"
        h="80px"
        bg={gradient ? `${color.split('.')[0]}.200` : 'gray.100'}
        borderRadius="full"
        opacity={0.2}
        animation="float 8s ease-in-out infinite reverse"
      />
      
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
        <Flex align="center" justify="space-between">
          <Text 
            fontSize="sm" 
            fontWeight="black" 
            color={gradient ? `${color.split('.')[0]}.700` : mutedColor}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {title}
          </Text>
          <Box
            w={16}
            h={16}
            borderRadius="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={getIconBg()}
            color="white"
            shadow="xl"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '2xl',
              bg: 'white',
              opacity: 0.1,
              transform: 'scale(0.9)',
            }}
          >
            <Icon as={IconComponent} boxSize={8} />
          </Box>
        </Flex>

        <VStack align="start" spacing={4}>
          <Text 
            fontSize="5xl" 
            fontWeight="black" 
            color={gradient ? `${color.split('.')[0]}.700` : textColor}
            lineHeight="1"
            letterSpacing="tight"
          >
            {value}
          </Text>
          
          {change && (
            <HStack spacing={3}>
              <Box
                w={8}
                h={8}
                borderRadius="lg"
                bg={getChangeColor()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Icon as={getChangeIcon()} boxSize={4} />
              </Box>
              <Text
                fontSize="md"
                fontWeight="bold"
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