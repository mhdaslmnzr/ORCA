'use client';

import {
  Box,
  Flex,
  HStack,
  Text,
  Avatar,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { 
  Bell, 
  Settings, 
  Search,
  Wifi,
  Signal,
  Activity
} from 'lucide-react';

export default function Header() {
  return (
    <Box 
      bg="dark.sidebar" 
      borderBottom="1px solid" 
      borderColor="dark.border"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center">
        {/* Left Side - ORCA Platform */}
        <HStack spacing={6}>
          <VStack align="start" spacing={0}>
            <Text fontSize="2xl" fontWeight="800" color="dark.text">
              ORCA
            </Text>
            <Text fontSize="sm" color="dark.muted" fontWeight="500">
              AI Operations Platform
            </Text>
          </VStack>

          {/* System Status Indicators */}
          <HStack spacing={4}>
            <HStack spacing={2}>
              <Box w={2} h={2} bg="dark.success" borderRadius="full" />
              <Text fontSize="sm" color="dark.muted" fontWeight="500">
                System Online
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={Wifi} boxSize={3} color="dark.success" />
              <Text fontSize="sm" color="dark.muted" fontWeight="500">
                All Equipment Connected
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={Signal} boxSize={3} color="dark.success" />
              <Text fontSize="sm" color="dark.muted" fontWeight="500">
                AI Models Active
              </Text>
            </HStack>
          </HStack>
        </HStack>

        {/* Right Side - Company, User & Actions */}
        <HStack spacing={6}>
          {/* Company Info */}
          <VStack align="end" spacing={0}>
            <Text fontSize="lg" fontWeight="700" color="dark.text">
              Maria's Margheritas
            </Text>
            <Text fontSize="xs" color="dark.muted">
              Portfolio Company
            </Text>
          </VStack>

          {/* Real-time Status */}
          <HStack spacing={3}>
            <Text fontSize="sm" color="dark.muted" fontWeight="500">
              Last Update: {new Date().toLocaleTimeString()}
            </Text>
            <Badge
              bg="rgba(16, 185, 129, 0.1)"
              color="dark.success"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="600"
              border="1px solid"
              borderColor="dark.success"
            >
              LIVE
            </Badge>
          </HStack>

          {/* Action Buttons */}
          <HStack spacing={2}>
            <Box
              w={8}
              h={8}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="dark.card"
              color="dark.muted"
              _hover={{ bg: 'rgba(99, 102, 241, 0.1)', color: 'dark.accent' }}
              cursor="pointer"
              transition="all 0.2s"
            >
              <Icon as={Search} boxSize={4} />
            </Box>
            <Box
              w={8}
              h={8}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="dark.card"
              color="dark.muted"
              _hover={{ bg: 'rgba(99, 102, 241, 0.1)', color: 'dark.accent' }}
              cursor="pointer"
              transition="all 0.2s"
            >
              <Icon as={Bell} boxSize={4} />
            </Box>
            <Box
              w={8}
              h={8}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="dark.card"
              color="dark.muted"
              _hover={{ bg: 'rgba(99, 102, 241, 0.1)', color: 'dark.accent' }}
              cursor="pointer"
              transition="all 0.2s"
            >
              <Icon as={Settings} boxSize={4} />
            </Box>
          </HStack>

          {/* User Profile */}
          <HStack spacing={3}>
            <VStack align="end" spacing={0}>
              <Text fontSize="sm" fontWeight="600" color="dark.text">
                DMJ
              </Text>
              <Text fontSize="xs" color="dark.muted">
                Operations Manager
              </Text>
            </VStack>
            <Avatar
              size="sm"
              name="DMJ"
              bg="dark.accent"
              color="white"
              fontWeight="bold"
            />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}