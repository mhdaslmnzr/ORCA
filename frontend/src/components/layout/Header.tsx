'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  HStack,
  VStack,
  Badge,
  useColorModeValue,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const headerBg = useColorModeValue('#ffffff', 'gray.900');
  const borderColor = useColorModeValue('#e2e8f0', 'gray.700');
  const textColor = useColorModeValue('#1e293b', 'white');
  const mutedColor = useColorModeValue('#64748b', 'gray.400');
  const searchBg = useColorModeValue('#f8fafc', 'gray.800');

  return (
    <Box
      bg={headerBg}
      borderBottom="1px solid"
      borderColor={borderColor}
      px={6}
      py={4}
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex align="center" justify="space-between">
        {/* Search Bar */}
        <Box flex={1} maxW="xl">
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none" pl={4}>
              <Icon as={Search} color={mutedColor} boxSize={5} />
            </InputLeftElement>
            <Input
              placeholder="Search equipment, alerts, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={searchBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="12px"
              pl={12}
              pr={4}
              py={2}
              fontSize="md"
              fontWeight="500"
              color={textColor}
              _focus={{
                bg: useColorModeValue('#ffffff', 'gray.700'),
                borderColor: '#0ea5e9',
                boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
              }}
              _hover={{
                borderColor: '#94a3b8',
              }}
              transition="all 0.2s"
              _placeholder={{
                color: mutedColor,
              }}
            />
          </InputGroup>
        </Box>

        {/* Right Section */}
        <HStack spacing={4}>
          {/* Notifications */}
          <Tooltip label="Notifications" placement="bottom">
            <Box position="relative">
              <IconButton
                aria-label="Notifications"
                icon={<Icon as={Bell} boxSize={5} />}
                variant="ghost"
                size="md"
                color={textColor}
                _hover={{ 
                  bg: useColorModeValue('#f1f5f9', 'gray.700'),
                }}
                borderRadius="10px"
                w={10}
                h={10}
              />
              <Badge
                position="absolute"
                top={1}
                right={1}
                colorScheme="red"
                borderRadius="full"
                fontSize="xs"
                fontWeight="700"
                px={1.5}
                py={0.5}
                minW={5}
                h={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px solid"
                borderColor={headerBg}
              >
                3
              </Badge>
            </Box>
          </Tooltip>

          {/* Profile Menu */}
          <Menu>
            <MenuButton
              as={Box}
              cursor="pointer"
              _hover={{ 
                bg: useColorModeValue('#f8fafc', 'gray.800'),
              }}
              transition="all 0.2s"
              borderRadius="12px"
              p={2}
            >
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  name="John Doe"
                  bg="#0ea5e9"
                  color="white"
                  fontWeight="700"
                  fontSize="sm"
                />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="700" color={textColor}>
                    John Doe
                  </Text>
                  <Text fontSize="xs" color={mutedColor} fontWeight="600">
                    Administrator
                  </Text>
                </VStack>
                <Icon as={ChevronDown} boxSize={4} color={mutedColor} />
              </HStack>
            </MenuButton>
            
            <MenuList
              bg={headerBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="12px"
              shadow="lg"
              py={2}
              minW="200px"
            >
              <MenuItem
                icon={<Icon as={User} boxSize={4} />}
                _hover={{ 
                  bg: useColorModeValue('#f8fafc', 'gray.700'),
                }}
                borderRadius="8px"
                mx={2}
                py={3}
                fontSize="sm"
                fontWeight="600"
                color={textColor}
              >
                Profile Settings
              </MenuItem>
              <MenuItem
                icon={<Icon as={Settings} boxSize={4} />}
                _hover={{ 
                  bg: useColorModeValue('#f8fafc', 'gray.700'),
                }}
                borderRadius="8px"
                mx={2}
                py={3}
                fontSize="sm"
                fontWeight="600"
                color={textColor}
              >
                System Settings
              </MenuItem>
              <MenuDivider borderColor={borderColor} mx={2} />
              <MenuItem
                icon={<Icon as={LogOut} boxSize={4} />}
                _hover={{ 
                  bg: '#fef2f2',
                  color: '#dc2626'
                }}
                borderRadius="8px"
                mx={2}
                py={3}
                color="#ef4444"
                fontSize="sm"
                fontWeight="600"
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}