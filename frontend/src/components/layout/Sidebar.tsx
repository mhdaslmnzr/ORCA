'use client';

import { useState } from 'react';
import { ORCA_MODULES } from '@/data/mockData';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Flex,
  Divider,
  useColorModeValue,
  Tooltip,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { 
  ChevronLeft,
  ChevronRight,
  Bell,
  Zap,
  Shield,
  Mirror,
  Siren,
  Activity,
  Radio,
  Sparkles,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const sidebarBg = useColorModeValue('#ffffff', 'gray.900');
  const borderColor = useColorModeValue('#e2e8f0', 'gray.700');
  const textColor = useColorModeValue('#1e293b', 'white');
  const mutedColor = useColorModeValue('#64748b', 'gray.400');
  const activeBg = useColorModeValue('#eff6ff', 'brand.900');
  const activeColor = useColorModeValue('#0369a1', 'brand.300');

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId.toLowerCase()) {
      case 'predator':
        return Zap;
      case 'guardian':
        return Shield;
      case 'mirror':
        return Mirror;
      case 'siren':
        return Siren;
      default:
        return Activity;
    }
  };

  return (
    <Box
      bg={sidebarBg}
      borderRight="1px solid"
      borderColor={borderColor}
      w={isCollapsed ? '20' : '80'}
      transition="all 0.3s ease-in-out"
      position="relative"
      shadow="sm"
      h="100vh"
      overflowY="auto"
    >
      {/* Header */}
      <Box
        p={6}
        borderBottom="1px solid"
        borderColor={borderColor}
        bg="#0ea5e9"
      >
        <Flex align="center" justify="space-between">
          {!isCollapsed && (
            <HStack spacing={3}>
              <Box
                w={12}
                h={12}
                bg="rgba(255, 255, 255, 0.2)"
                borderRadius="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="900"
                fontSize="xl"
                border="2px solid rgba(255, 255, 255, 0.3)"
              >
                O
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontSize="xl" fontWeight="900" color="white">
                  ORCA
                </Text>
                <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)" fontWeight="600">
                  AI Platform
                </Text>
              </VStack>
            </HStack>
          )}
          
          <Tooltip label={isCollapsed ? "Expand" : "Collapse"} placement="right">
            <IconButton
              aria-label="Toggle sidebar"
              icon={<Icon as={isCollapsed ? ChevronRight : ChevronLeft} boxSize={4} />}
              size="sm"
              variant="ghost"
              onClick={() => setIsCollapsed(!isCollapsed)}
              color="white"
              _hover={{ 
                bg: 'rgba(255, 255, 255, 0.2)',
              }}
              borderRadius="8px"
            />
          </Tooltip>
        </Flex>
      </Box>

      {/* Navigation */}
      <VStack spacing={2} p={4} align="stretch">
        <Text
          fontSize="xs"
          fontWeight="700"
          color={mutedColor}
          textTransform="uppercase"
          letterSpacing="wider"
          mb={2}
          px={2}
        >
          AI Modules
        </Text>
        
        {ORCA_MODULES.map((module) => {
          const isActive = activeModule === module.id;
          const ModuleIcon = getModuleIcon(module.id);
          
          return (
            <Tooltip
              key={module.id}
              label={isCollapsed ? module.id : ''}
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Box
                cursor="pointer"
                onClick={() => onModuleChange(module.id)}
                bg={isActive ? activeBg : 'transparent'}
                border="1px solid"
                borderColor={isActive ? '#bfdbfe' : 'transparent'}
                borderRadius="12px"
                p={3}
                _hover={{
                  bg: isActive ? activeBg : useColorModeValue('#f8fafc', 'gray.700'),
                  borderColor: isActive ? '#93c5fd' : '#e5e7eb',
                  transform: 'translateX(2px)',
                }}
                transition="all 0.2s ease-in-out"
                position="relative"
                shadow={isActive ? 'sm' : 'none'}
              >
                {/* Active indicator */}
                {isActive && (
                  <Box
                    position="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w={1}
                    bg="#0ea5e9"
                    borderRadius="full"
                  />
                )}
                
                <HStack spacing={3}>
                  <Box
                    w={10}
                    h={10}
                    bg={isActive ? '#0ea5e9' : useColorModeValue('#f1f5f9', 'gray.700')}
                    borderRadius="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color={isActive ? 'white' : mutedColor}
                    flexShrink={0}
                  >
                    <Icon as={ModuleIcon} boxSize={5} />
                  </Box>
                  
                  {!isCollapsed && (
                    <VStack align="start" spacing={1} flex={1} minW={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        color={isActive ? activeColor : textColor}
                        noOfLines={1}
                      >
                        {module.id}
                      </Text>
                      <Text
                        fontSize="xs"
                        color={isActive ? '#0284c7' : mutedColor}
                        lineHeight="tight"
                        noOfLines={2}
                        fontWeight="500"
                      >
                        {module.description}
                      </Text>
                      <Badge
                        size="sm"
                        colorScheme={module.status === 'active' ? 'green' : 'gray'}
                        variant="subtle"
                        fontSize="xs"
                        px={2}
                        py={0.5}
                        borderRadius="6px"
                      >
                        {module.status}
                      </Badge>
                    </VStack>
                  )}
                </HStack>
              </Box>
            </Tooltip>
          );
        })}
      </VStack>

      {/* Gen AI Section */}
      <Box px={4} pb={4}>
        <Divider borderColor={borderColor} mb={4} />
        <Text
          fontSize="xs"
          fontWeight="700"
          color={mutedColor}
          textTransform="uppercase"
          letterSpacing="wider"
          mb={3}
          px={2}
        >
          AI Assistant
        </Text>
        
        {/* Gen AI Chat */}
        <Tooltip label="AI Assistant & Chat" placement="right">
          <Box
            cursor="pointer"
            onClick={() => onModuleChange('AI_ASSISTANT')}
            bg={activeModule === 'AI_ASSISTANT' 
              ? "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)" 
              : "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
            }
            borderRadius="12px"
            p={3}
            _hover={{
              transform: 'translateX(2px) scale(1.02)',
              shadow: 'lg',
            }}
            transition="all 0.2s ease-in-out"
            color="white"
            border={activeModule === 'AI_ASSISTANT' ? "2px solid #c4b5fd" : "none"}
          >
            <HStack spacing={3}>
              <Box
                w={10}
                h={10}
                bg="rgba(255, 255, 255, 0.2)"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                flexShrink={0}
              >
                <Icon as={Bot} boxSize={5} />
              </Box>
              
              {!isCollapsed && (
                <VStack align="start" spacing={1} flex={1} minW={0}>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="white"
                    noOfLines={1}
                  >
                    AI Assistant
                  </Text>
                  <Text
                    fontSize="xs"
                    color="rgba(255, 255, 255, 0.8)"
                    lineHeight="tight"
                    noOfLines={2}
                    fontWeight="500"
                  >
                    Generate insights & chat
                  </Text>
                </VStack>
              )}
            </HStack>
          </Box>
        </Tooltip>
      </Box>

      {/* System Section */}
      <Box mt="auto" p={4}>
        <Divider borderColor={borderColor} mb={4} />
        
        <VStack spacing={3} align="stretch">
          <Text
            fontSize="xs"
            fontWeight="700"
            color={mutedColor}
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
            px={2}
          >
            System
          </Text>
          
          {/* Notifications */}
          <Tooltip label="System Notifications" placement="right">
            <Box
              cursor="pointer"
              bg={useColorModeValue('#f8fafc', 'gray.800')}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="12px"
              p={3}
              _hover={{
                bg: useColorModeValue('#f1f5f9', 'gray.700'),
                borderColor: '#cbd5e1',
                transform: 'translateX(2px)',
              }}
              transition="all 0.2s ease-in-out"
            >
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  bg={useColorModeValue('#f1f5f9', 'gray.700')}
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={mutedColor}
                  flexShrink={0}
                >
                  <Icon as={Bell} boxSize={5} />
                </Box>
                
                {!isCollapsed && (
                  <VStack align="start" spacing={1} flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="700" color={textColor} noOfLines={1}>
                      Notifications
                    </Text>
                    <Text fontSize="xs" color={mutedColor} fontWeight="500" noOfLines={1}>
                      System alerts & updates
                    </Text>
                  </VStack>
                )}
              </HStack>
            </Box>
          </Tooltip>
          
          {/* System Status */}
          {!isCollapsed && (
            <Box
              bg="#f0fdf4"
              border="1px solid"
              borderColor="#bbf7d0"
              borderRadius="12px"
              p={3}
            >
              <VStack spacing={3} align="stretch">
                <HStack spacing={3}>
                  <Box
                    w={8}
                    h={8}
                    bg="#22c55e"
                    borderRadius="8px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    flexShrink={0}
                  >
                    <Icon as={Radio} boxSize={4} />
                  </Box>
                  <VStack align="start" spacing={0} flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="700" color="#15803d" noOfLines={1}>
                      All Systems Online
                    </Text>
                    <Text fontSize="xs" color="#16a34a" fontWeight="600" noOfLines={1}>
                      Status: EXCELLENT
                    </Text>
                  </VStack>
                </HStack>
                
                <VStack spacing={2} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Text fontSize="xs" color="#16a34a" fontWeight="600">Last Check</Text>
                    <Badge colorScheme="green" variant="solid" px={2} py={1} borderRadius="6px" fontSize="xs" fontWeight="700">
                      2 min ago
                    </Badge>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text fontSize="xs" color="#16a34a" fontWeight="600">Next Scan</Text>
                    <Text fontSize="xs" fontWeight="700" color="#15803d">3 min</Text>
                  </Flex>
                </VStack>
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}