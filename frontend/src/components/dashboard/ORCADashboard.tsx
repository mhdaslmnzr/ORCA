'use client';

import { useState } from 'react';
import Header from '../layout/Header';
import PREDATORDashboard from './PREDATORDashboard';
import GUARDIAN from '../modules/GUARDIAN';
import MIRROR from '../modules/MIRROR';
import SIREN from '../modules/SIREN';
import {
  Box,
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { 
  Zap,
  Shield,
  Eye,
  Bell,
  Activity,
  BarChart3,
  Settings,
  Menu
} from 'lucide-react';

type ModuleType = 'predator' | 'guardian' | 'mirror' | 'siren';

export default function ORCADashboard() {
  const [activeModule, setActiveModule] = useState<ModuleType>('predator');
  const { isOpen, onToggle } = useDisclosure();

  const modules = [
    {
      id: 'predator',
      name: 'PREDATOR',
      description: 'Predictive Maintenance Engine',
      icon: Zap,
      color: 'dark.accent',
      bgColor: 'rgba(99, 102, 241, 0.2)',
      status: 'active',
      alerts: 2
    },
    {
      id: 'guardian',
      name: 'GUARDIAN',
      description: 'Regulatory Compliance Sentinel',
      icon: Shield,
      color: 'dark.info',
      bgColor: 'rgba(59, 130, 246, 0.2)',
      status: 'warning',
      alerts: 1
    },
    {
      id: 'mirror',
      name: 'MIRROR',
      description: 'Digital Twin Intelligence',
      icon: Eye,
      color: 'purple.400',
      bgColor: 'rgba(139, 92, 246, 0.2)',
      status: 'active',
      alerts: 0
    },
    {
      id: 'siren',
      name: 'SIREN',
      description: 'Real-Time Alerting System',
      icon: Bell,
      color: 'dark.danger',
      bgColor: 'rgba(239, 68, 68, 0.2)',
      status: 'critical',
      alerts: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'dark.success';
      case 'warning': return 'dark.warning';
      case 'critical': return 'dark.danger';
      default: return 'dark.muted';
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'predator':
        return <PREDATORDashboard />;
      case 'guardian':
        return <GUARDIAN />;
      case 'mirror':
        return <MIRROR />;
      case 'siren':
        return <SIREN />;
      default:
        return <PREDATORDashboard />;
    }
  };

  return (
    <Box bg="dark.bg" minH="100vh">
      {/* Header */}
      <Header />

      <Grid templateColumns={isOpen ? "280px 1fr" : "80px 1fr"} gap={0}>
        {/* Enhanced Sidebar */}
        <Box 
          bg="dark.sidebar" 
          borderRight="1px solid" 
          borderColor="dark.border"
          position="sticky"
          top="80px"
          h="calc(100vh - 80px)"
          overflowY="auto"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          boxShadow="lg"
        >
          <VStack spacing={0} align="stretch" h="full">
            {/* Header Section */}
            <Box p={isOpen ? 6 : 4} borderBottom="1px solid" borderColor="dark.border">
              <VStack spacing={4} align="center">
                {/* Toggle Button */}
                <Button
                  onClick={onToggle}
                  variant="ghost"
                  size="sm"
                  w="full"
                  h={10}
                  borderRadius="xl"
                  bg="dark.card"
                  _hover={{ 
                    bg: 'dark.accent', 
                    color: 'white',
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.2s"
                  position="relative"
                  overflow="hidden"
                >
                  <Icon as={Menu} boxSize={4} />
                  {isOpen && (
                    <Text ml={2} fontSize="sm" fontWeight="600">
                      Collapse
                    </Text>
                  )}
                </Button>

                {/* ORCA Logo & Brand */}
                <VStack spacing={3} align="center">
                  <Box
                    w={isOpen ? 16 : 12}
                    h={isOpen ? 16 : 12}
                    bg="linear-gradient(135deg, dark.accent 0%, dark.info 100%)"
                    borderRadius="2xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="2xl"
                    className="glow-on-hover"
                    position="relative"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'inherit',
                      padding: '2px',
                      background: 'linear-gradient(135deg, dark.accent, dark.info)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  >
                    <Icon as={Activity} boxSize={isOpen ? 8 : 6} color="white" />
                  </Box>
                  {isOpen && (
                    <VStack spacing={1} align="center">
                      <Text fontSize="xl" fontWeight="900" color="dark.text" letterSpacing="tight">
                        ORCA
                      </Text>
                      <Text fontSize="xs" color="dark.muted" fontWeight="500" textAlign="center" maxW="200px">
                        AI Operations Platform
                      </Text>
                    </VStack>
                  )}
                </VStack>
              </VStack>
            </Box>

            {/* Navigation Section */}
            <Box flex={1} p={isOpen ? 6 : 4}>
              <VStack spacing={4} align="stretch">
                {/* Module Navigation */}
                <VStack spacing={3} align="stretch">
                  {isOpen && (
                    <Text fontSize="sm" fontWeight="700" color="dark.muted" textTransform="uppercase" letterSpacing="wide" textAlign="center" opacity={0.8}>
                      AI Modules
                    </Text>
                  )}
                  
                  {modules.map((module) => (
                    <Button
                      key={module.id}
                      variant="ghost"
                      size="lg"
                      justifyContent={isOpen ? "start" : "center"}
                      leftIcon={isOpen ? <Icon as={module.icon} boxSize={5} /> : undefined}
                      color={activeModule === module.id ? 'white' : 'dark.muted'}
                      bg={activeModule === module.id ? 
                        `linear-gradient(135deg, ${module.color} 0%, ${module.color}dd 100%)` : 
                        'transparent'
                      }
                      _hover={{ 
                        bg: activeModule === module.id ? 
                          `linear-gradient(135deg, ${module.color} 0%, ${module.color}dd 100%)` : 
                          'rgba(99, 102, 241, 0.15)',
                        color: activeModule === module.id ? 'white' : 'dark.text',
                        transform: 'translateX(4px)'
                      }}
                      borderRadius="xl"
                      onClick={() => setActiveModule(module.id as ModuleType)}
                      position="relative"
                      className="card-hover"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      h={isOpen ? 12 : 14}
                      px={isOpen ? 4 : 2}
                    >
                      {isOpen ? (
                        <HStack spacing={4} w="full" justify="space-between">
                          <HStack spacing={3}>
                            <Icon as={module.icon} boxSize={5} />
                            <VStack align="start" spacing={0}>
                              <Text fontSize="sm" fontWeight="600">
                                {module.name}
                              </Text>
                              <Text fontSize="xs" color="dark.muted" opacity={0.8}>
                                {module.description}
                              </Text>
                            </VStack>
                          </HStack>
                          {module.alerts > 0 && (
                            <Badge
                              bg="dark.danger"
                              color="white"
                              px={2}
                              py={1}
                              borderRadius="full"
                              fontSize="xs"
                              fontWeight="700"
                              minW={6}
                              h={6}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              shadow="md"
                            >
                              {module.alerts}
                            </Badge>
                          )}
                        </HStack>
                      ) : (
                        <VStack spacing={1}>
                          <Icon as={module.icon} boxSize={6} />
                          {module.alerts > 0 && (
                            <Badge
                              bg="dark.danger"
                              color="white"
                              px={1}
                              py={0.5}
                              borderRadius="full"
                              fontSize="xs"
                              fontWeight="700"
                              minW={5}
                              h={5}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              position="absolute"
                              top={-2}
                              right={-2}
                            >
                              {module.alerts}
                            </Badge>
                          )}
                        </VStack>
                      )}
                    </Button>
                  ))}
                </VStack>

                {/* Quick Actions */}
                {isOpen && (
                  <VStack spacing={3} align="stretch" pt={4}>
                    <Text fontSize="sm" fontWeight="700" color="dark.muted" textTransform="uppercase" letterSpacing="wide" opacity={0.8}>
                      Quick Actions
                    </Text>
                    
                    <Button
                      variant="ghost"
                      size="md"
                      justifyContent="start"
                      leftIcon={<Icon as={BarChart3} boxSize={4} />}
                      color="dark.muted"
                      _hover={{ 
                        bg: 'rgba(99, 102, 241, 0.15)', 
                        color: 'dark.text',
                        transform: 'translateX(4px)'
                      }}
                      borderRadius="xl"
                      className="card-hover"
                      transition="all 0.2s"
                    >
                      Analytics Dashboard
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="md"
                      justifyContent="start"
                      leftIcon={<Icon as={Settings} boxSize={4} />}
                      color="dark.muted"
                      _hover={{ 
                        bg: 'rgba(99, 102, 241, 0.15)', 
                        color: 'dark.text',
                        transform: 'translateX(4px)'
                      }}
                      borderRadius="xl"
                      className="card-hover"
                      transition="all 0.2s"
                    >
                      System Settings
                    </Button>
                  </VStack>
                )}
              </VStack>
            </Box>

            {/* Footer Section */}
            {isOpen && (
              <Box p={6} borderTop="1px solid" borderColor="dark.border">
                <VStack spacing={3} align="center">
                  <Text fontSize="xs" color="dark.muted" textAlign="center" opacity={0.6}>
                    ORCA v2.0
                  </Text>
                  <Text fontSize="xs" color="dark.muted" textAlign="center" opacity={0.6}>
                    Powered by AI
                  </Text>
                </VStack>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Main Content */}
        <Box>
          {renderModule()}
        </Box>
      </Grid>
    </Box>
  );
}
