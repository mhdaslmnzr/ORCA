'use client';

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Zap,
  Shield,
  FileText,
  Cpu,
  Bot,
  Fish,
} from 'lucide-react';

interface NavItem {
  id: string;
  name: string;
  icon: any;
  status: 'active' | 'coming-soon' | 'beta';
}

const navItems: NavItem[] = [

  {
    id: 'predator',
    name: 'PREDATOR',
    icon: Zap,
    status: 'active',
  },
  {
    id: 'guardian',
    name: 'GUARDIAN',
    icon: Shield,
    status: 'coming-soon',
  },
  {
    id: 'mirror',
    name: 'MIRROR',
    icon: FileText,
    status: 'coming-soon',
  },
  {
    id: 'siren',
    name: 'SIREN',
    icon: Cpu,
    status: 'coming-soon',
  },
  {
    id: 'orca-ai',
    name: 'ORCA AI',
    icon: Bot,
    status: 'beta',
  },
];

interface SideNavProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ isExpanded, onToggle }) => {
  const bgColor = useColorModeValue('rgba(15, 15, 35, 0.95)', 'rgba(15, 15, 35, 0.95)');
  const borderColor = useColorModeValue('rgba(99, 102, 241, 0.2)', 'rgba(99, 102, 241, 0.2)');

  return (
    <Box
      position="fixed"
      left={4}
      top="50%"
      transform="translateY(-50%)"
      zIndex={40}
      transition="all 0.3s ease"
    >
      <Box
        bg={bgColor}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        p={isExpanded ? 4 : 3}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
        transition="all 0.3s ease"
        width={isExpanded ? '180px' : '70px'}
        overflow="hidden"
      >
        <VStack spacing={3} align="stretch">
          {/* Toggle Button - Simple Hamburger */}
          <Box
            onClick={onToggle}
            cursor="pointer"
            p={2}
            borderRadius="lg"
            _hover={{ bg: 'rgba(99, 102, 241, 0.1)' }}
            transition="all 0.2s"
            textAlign="center"
          >
            <Box
              w="20px"
              h="2px"
              bg="dark.accent"
              mb={1}
              mx="auto"
              transition="all 0.3s"
              transform={isExpanded ? 'rotate(45deg) translate(2px, 2px)' : 'none'}
            />
            <Box
              w="20px"
              h="2px"
              bg="dark.accent"
              mb={1}
              mx="auto"
              transition="all 0.3s"
              opacity={isExpanded ? 0 : 1}
            />
            <Box
              w="20px"
              h="2px"
              bg="dark.accent"
              mx="auto"
              transition="all 0.3s"
              transform={isExpanded ? 'rotate(-45deg) translate(2px, -2px)' : 'none'}
            />
          </Box>

          {/* Navigation Items */}
          {navItems.map((item) => (
            <Tooltip
              key={item.id}
              label={isExpanded ? '' : item.name}
              placement="right"
              hasArrow
              bg="dark.card"
              color="dark.text"
              borderColor="dark.border"
            >
              <Box
                p={3}
                borderRadius="xl"
                cursor="pointer"
                _hover={{ bg: 'rgba(99, 102, 241, 0.1)' }}
                transition="all 0.2s"
                border="1px solid"
                borderColor={isExpanded && item.status === 'active' ? 'dark.accent' : 'transparent'}
                position="relative"
                bg={item.status === 'active' ? 'rgba(99, 102, 241, 0.05)' : 'transparent'}
              >
                <HStack spacing={3} align="center">
                  <Icon
                    as={item.icon}
                    boxSize={isExpanded ? 6 : 7}
                    color={item.status === 'active' ? 'dark.accent' : 'dark.muted'}
                    ml={isExpanded ? 2 : 0}
                  />
                  
                  {isExpanded && (
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color={item.status === 'active' ? 'dark.text' : 'dark.muted'}
                    >
                      {item.name}
                    </Text>
                  )}
                </HStack>
              </Box>
            </Tooltip>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default SideNav;
