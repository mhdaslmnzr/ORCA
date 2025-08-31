'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  Avatar,
  VStack,
  Badge,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Bell,
  Wifi,
  Signal,
  Activity,
  Settings,
} from 'lucide-react';

export default function Header() {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="dark.border"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(10px)"
      bg="rgba(15, 15, 35, 0.95)"
    >
      <Flex justify="space-between" align="center">
        {/* Left Side - ORCA Platform */}
        <HStack spacing={6}>
          <VStack align="start" spacing={0}>
            <Box
              position="relative"
              cursor="pointer"
              _hover={{
                "& .orca-text": {
                  transform: 'scale(1.05)',
                  textShadow: '0 0 40px rgba(99, 102, 241, 0.5)'
                },
                "& .expanded-letters": {
                  opacity: 1,
                  transform: 'translateX(0)'
                },
                "& .hover-tagline": {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }}
            >
              <HStack spacing={0} transition="all 0.3s ease">
                <Text 
                  className="orca-text"
                  fontSize="4xl" 
                  fontWeight="900" 
                  color="dark.text" 
                  letterSpacing="wider"
                  bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)"
                  bgClip="text"
                  textShadow="0 0 30px rgba(99, 102, 241, 0.3)"
                  transition="all 0.3s ease"
                >
                  ORCA
                </Text>
                
                {/* Hover Expanded Letters */}
                <HStack 
                  className="expanded-letters"
                  spacing={2} 
                  opacity={0} 
                  transform="translateX(-20px)"
                  transition="all 0.3s ease"
                >
                  <Text 
                    fontSize="4xl" 
                    fontWeight="900" 
                    color="dark.accent"
                    letterSpacing="wider"
                  >
                    O
                  </Text>
                  <Text 
                    fontSize="4xl" 
                    fontWeight="900" 
                    color="dark.accent"
                    letterSpacing="wider"
                  >
                    R
                  </Text>
                  <Text 
                    fontSize="4xl" 
                    fontWeight="900" 
                    color="dark.accent"
                    letterSpacing="wider"
                  >
                    C
                  </Text>
                  <Text 
                    fontSize="4xl" 
                    fontWeight="900" 
                    color="dark.accent"
                    letterSpacing="wider"
                  >
                    A
                  </Text>
                </HStack>
              </HStack>
              
              {/* Hover Tagline */}
              <Text 
                className="hover-tagline"
                position="absolute"
                top="100%"
                left="0"
                fontSize="xs" 
                color="dark.accent" 
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                opacity={0}
                transform="translateY(-10px)"
                transition="all 0.3s ease"
                whiteSpace="nowrap"
              >
                Observe • Report • Comply • Alert
              </Text>
        </Box>

            <Text 
                fontSize="xs"
              color="dark.muted" 
              fontWeight="600" 
              textTransform="uppercase"
              letterSpacing="wider"
              opacity={0.8}
            >
              Operational Risk & Compliance Assistant
            </Text>
          </VStack>
        </HStack>

        {/* Center - System Status Cards */}
        <SimpleGrid columns={3} spacing={4} flex={1} maxW="600px" mx={8}>
          {/* ORCA System Status */}
          <Box
            p={3}
            bg="rgba(16, 185, 129, 0.1)"
            border="1px solid"
            borderColor="dark.success"
            borderRadius="lg"
            textAlign="center"
          >
            <HStack spacing={2} justify="center">
              <Box w={2} h={2} bg="dark.success" borderRadius="full" />
              <Text fontSize="xs" color="dark.success" fontWeight="600">
                ORCA System
              </Text>
            </HStack>
            <Text fontSize="xs" color="dark.success" fontWeight="500" mt={1}>
              Online & Active
            </Text>
          </Box>

          {/* Machines Online Status */}
          <Box
            p={3}
            bg="rgba(99, 102, 241, 0.1)"
            border="1px solid"
            borderColor="dark.accent"
            borderRadius="lg"
            textAlign="center"
          >
            <HStack spacing={2} justify="center">
              <Icon as={Activity} boxSize={3} color="dark.accent" />
              <Text fontSize="xs" color="dark.accent" fontWeight="600">
                25/25
              </Text>
            </HStack>
            <Text fontSize="xs" color="dark.accent" fontWeight="500" mt={1}>
              Machines Online
            </Text>
          </Box>

          {/* ORCA AI Status */}
          <Box
            p={3}
            bg="rgba(168, 85, 247, 0.1)"
            border="1px solid"
            borderColor="purple.400"
            borderRadius="lg"
            textAlign="center"
          >
            <HStack spacing={2} justify="center">
              <Icon as={Signal} boxSize={3} color="purple.400" />
              <Text fontSize="xs" color="purple.400" fontWeight="600">
                ORCA AI
              </Text>
            </HStack>
            <Text fontSize="xs" color="purple.400" fontWeight="500" mt={1}>
              Active
            </Text>
          </Box>
        </SimpleGrid>

        {/* Right Side - User Profile & Actions */}
        <HStack spacing={6}>
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

          {/* User Profile Card */}
          <Box
            p={3}
            bg="rgba(99, 102, 241, 0.05)"
            border="1px solid"
            borderColor="rgba(99, 102, 241, 0.2)"
            borderRadius="xl"
            backdropFilter="blur(10px)"
            >
              <HStack spacing={3}>
              <VStack align="end" spacing={0}>
                <Text fontSize="sm" fontWeight="700" color="dark.text">
                  DMJ
                </Text>
                <Text fontSize="xs" color="dark.muted" fontWeight="500">
                  Operations Manager
                </Text>
                <Text fontSize="xs" color="dark.accent" fontWeight="600">
                  Maria's Margheritas
                </Text>
              </VStack>
                <Avatar
                  size="sm"
                name="DMJ"
                bg="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                  color="white"
                fontWeight="bold"
                border="2px solid"
                borderColor="rgba(99, 102, 241, 0.3)"
              />
              </HStack>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}