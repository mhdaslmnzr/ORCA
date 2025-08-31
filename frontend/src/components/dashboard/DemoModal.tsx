'use client';

import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  Eye,
  Building,
  Users,
  BarChart3,
  Code2,
  Monitor,
  Server,
  Database,
  Brain,
  Package,
  Settings,
  MessageSquare,
  Bot,
  Zap,
  Globe,
  GitBranch,
  Lock,
  Cloud,
  TrendingUp,
  Shield,
  FileText,
  Cpu,
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent 
        bg="dark.background" 
        border="1px solid" 
        borderColor="dark.border"
        maxW="90vw"
        maxH="90vh"
        my="5vh"
      >
        <ModalHeader 
          bg="dark.card" 
          borderBottom="1px solid" 
          borderColor="dark.border"
          display="flex"
          alignItems="center"
          gap={3}
        >
          <Icon as={Eye} color="dark.accent" boxSize={6} />
          <Text color="dark.text">ORCA PREDATOR - Complete Project Demo</Text>
          <ModalCloseButton color="dark.muted" />
        </ModalHeader>
        
        <ModalBody p={0} bg="dark.background">
          <Box maxH="calc(90vh - 80px)" overflowY="auto">
            {/* Company Overview */}
            <Box p={6} borderBottom="1px solid" borderColor="dark.border">
              <VStack spacing={6} align="stretch">
                <HStack spacing={4} align="center">
                  <Box p={3} bg="rgba(99, 102, 241, 0.1)" borderRadius="xl">
                    <Icon as={Building} color="dark.accent" boxSize={8} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color="dark.text">Maria's Margheritas</Heading>
                    <Text color="dark.muted" fontSize="lg">Large-Scale Pizza Manufacturing Company</Text>
                    <Badge colorScheme="green" variant="outline">Production Unit Active</Badge>
                  </VStack>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Users} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Company Profile</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Large-scale pizza manufacturing operations</Text>
                      <Text fontSize="sm" color="dark.muted">• 25+ production machines across 5 categories</Text>
                      <Text fontSize="sm" color="dark.muted">• Real-time monitoring and predictive maintenance</Text>
                      <Text fontSize="sm" color="dark.muted">• AI-powered insights and task planning</Text>
                    </VStack>
                  </Box>
                  
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={BarChart3} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Production Categories</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Sauce & Ingredient Processing</Text>
                      <Text fontSize="sm" color="dark.muted">• Dough Production & Mixing</Text>
                      <Text fontSize="sm" color="dark.muted">• Assembly & Production Lines</Text>
                      <Text fontSize="sm" color="dark.muted">• Baking & Cooking Systems</Text>
                      <Text fontSize="sm" color="dark.muted">• Packaging & Output Management</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Box>

            {/* Technology Stack */}
            <Box p={6} borderBottom="1px solid" borderColor="dark.border">
              <VStack spacing={6} align="stretch">
                <HStack spacing={4} align="center">
                  <Box p={3} bg="rgba(99, 102, 241, 0.1)" borderRadius="xl">
                    <Icon as={Code2} color="dark.accent" boxSize={8} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color="dark.text">Technology Stack</Heading>
                    <Text color="dark.muted" fontSize="lg">Modern Full-Stack Architecture</Text>
                  </VStack>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Monitor} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Frontend</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Next.js 15+ (React 18)</Text>
                      <Text fontSize="sm" color="dark.muted">• TypeScript for type safety</Text>
                      <Text fontSize="sm" color="dark.muted">• Chakra UI for modern components</Text>
                      <Text fontSize="sm" color="dark.muted">• Responsive design & animations</Text>
                      <Text fontSize="sm" color="dark.muted">• Dark theme with glassmorphism</Text>
                    </VStack>
                  </Box>
                  
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Server} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Backend</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• FastAPI (Python 3.9+)</Text>
                      <Text fontSize="sm" color="dark.muted">• Async/await architecture</Text>
                      <Text fontSize="sm" color="dark.muted">• CORS middleware enabled</Text>
                      <Text fontSize="sm" color="dark.muted">• RESTful API endpoints</Text>
                      <Text fontSize="sm" color="dark.muted">• Real-time data simulation</Text>
                    </VStack>
                  </Box>
                  
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Database} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Data & AI</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Google Gemini Pro API</Text>
                      <Text fontSize="sm" color="dark.muted">• XGBoost ML models</Text>
                      <Text fontSize="sm" color="dark.muted">• Mock data generation</Text>
                      <Text fontSize="sm" color="dark.muted">• Real-time sensor simulation</Text>
                      <Text fontSize="sm" color="dark.muted">• Predictive maintenance</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Box>

            {/* ML Models & Data */}
            <Box p={6} borderBottom="1px solid" borderColor="dark.border">
              <VStack spacing={6} align="stretch">
                <HStack spacing={4} align="center">
                  <Box p={3} bg="rgba(99, 102, 241, 0.1)" borderRadius="xl">
                    <Icon as={Brain} color="dark.accent" boxSize={8} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color="dark.text">Machine Learning & Data</Heading>
                    <Text color="dark.muted" fontSize="lg">Predictive Maintenance & AI Insights</Text>
                  </VStack>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Package} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">ML Models</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• XGBoost Regressor (FD001-FD004)</Text>
                      <Text fontSize="sm" color="dark.muted">• NASA Turbofan Engine Dataset</Text>
                      <Text fontSize="sm" color="dark.muted">• Adapted for manufacturing equipment</Text>
                      <Text fontSize="sm" color="dark.muted">• RUL (Remaining Useful Life) prediction</Text>
                      <Text fontSize="sm" color="dark.muted">• Health status classification</Text>
                    </VStack>
                  </Box>
                  
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={BarChart3} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Data Sources</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Mock company data generator</Text>
                      <Text fontSize="sm" color="dark.muted">• 25 equipment with realistic parameters</Text>
                      <Text fontSize="sm" color="dark.muted">• Sensor data simulation (temp, vibration, etc.)</Text>
                      <Text fontSize="sm" color="dark.muted">• Real-time degradation modeling</Text>
                      <Text fontSize="sm" color="dark.muted">• Maintenance history tracking</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
                
                <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                  <HStack spacing={3} mb={3}>
                    <Icon as={Settings} color="dark.accent" boxSize={5} />
                    <Text fontWeight="600" color="dark.text">How ML is Used</Text>
                  </HStack>
                  <VStack spacing={3} align="start">
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Equipment Health Monitoring:</strong> Real-time analysis of sensor data to determine equipment health percentage and predict failures.
                    </Text>
                    <Text fontSize="sm" color="dark.muted">
                      <strong>RUL Prediction:</strong> Machine learning models predict remaining useful life in hours, helping schedule maintenance proactively.
                    </Text>
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Status Classification:</strong> AI categorizes equipment as healthy (≥80%), warning (60-79%), or critical (&lt;60%).
                    </Text>
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Predictive Maintenance:</strong> Combines ML insights with AI-generated task planning for optimal maintenance scheduling.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* AI Chatbot & Task Planning */}
            <Box p={6} borderBottom="1px solid" borderColor="dark.border">
              <VStack spacing={6} align="stretch">
                <HStack spacing={4} align="center">
                  <Box p={3} bg="rgba(99, 102, 241, 0.1)" borderRadius="xl">
                    <Icon as={MessageSquare} color="dark.accent" boxSize={8} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color="dark.text">AI Chatbot & Task Planning</Heading>
                    <Text color="dark.muted" fontSize="lg">Powered by Google Gemini Pro API</Text>
                  </VStack>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Bot} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">ORCA AI Chatbot</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Context-aware responses</Text>
                      <Text fontSize="sm" color="dark.muted">• Equipment-specific insights</Text>
                      <Text fontSize="sm" color="dark.muted">• File upload & analysis</Text>
                      <Text fontSize="sm" color="dark.muted">• Manufacturing expertise</Text>
                      <Text fontSize="sm" color="dark.muted">• Real-time data integration</Text>
                    </VStack>
                  </Box>
                  
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Zap} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">Agentic Task Planner</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• AI-generated maintenance tasks</Text>
                      <Text fontSize="sm" color="dark.muted">• Priority-based scheduling</Text>
                      <Text fontSize="sm" color="dark.muted">• Step-by-step instructions</Text>
                      <Text fontSize="sm" color="dark.muted">• Safety notes & risk assessment</Text>
                      <Text fontSize="sm" color="dark.muted">• Cost & time estimates</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
                
                <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                  <HStack spacing={3} mb={3}>
                    <Icon as={Globe} color="dark.accent" boxSize={5} />
                    <Text fontWeight="600" color="dark.text">How AI Works</Text>
                  </HStack>
                  <VStack spacing={3} align="start">
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Gemini Pro Integration:</strong> Uses Google's advanced AI model for natural language understanding and task generation.
                    </Text>
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Context Awareness:</strong> AI considers equipment ID, sensor data, RUL, and health status when generating responses.
                    </Text>
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Manufacturing Expertise:</strong> Trained prompts ensure AI provides industry-specific maintenance and safety guidance.
                    </Text>
                    <Text fontSize="sm" color="dark.muted">
                      <strong>Real-time Updates:</strong> AI responses update based on current equipment status and sensor readings.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* Future Enhancements */}
            <Box p={6}>
              <VStack spacing={6} align="stretch">
                <HStack spacing={4} align="center">
                  <Box p={3} bg="rgba(99, 102, 241, 0.1)" borderRadius="xl">
                    <Icon as={TrendingUp} color="dark.accent" boxSize={8} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color="dark.text">Future Enhancements</Heading>
                    <Text color="dark.muted" fontSize="lg">Roadmap & Planned Features</Text>
                  </VStack>
                </HStack>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={Shield} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">GUARDIAN Module</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Regulatory compliance monitoring</Text>
                      <Text fontSize="sm" color="dark.muted">• Industry standards enforcement</Text>
                      <Text fontSize="sm" color="dark.muted">• Audit trail management</Text>
                      <Text fontSize="sm" color="dark.muted">• Compliance reporting</Text>
                    </VStack>
                  </Box>
                  
                  <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                    <HStack spacing={3} mb={3}>
                      <Icon as={FileText} color="dark.accent" boxSize={5} />
                      <Text fontWeight="600" color="dark.text">MIRROR Module</Text>
                    </HStack>
                    <VStack spacing={2} align="start">
                      <Text fontSize="sm" color="dark.muted">• Digital twin simulation</Text>
                      <Text fontSize="sm" color="dark.muted">• 3D equipment visualization</Text>
                      <Text fontSize="sm" color="dark.muted">• Real-time performance modeling</Text>
                      <Text fontSize="sm" color="dark.muted">• Predictive scenario testing</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
                
                <Box p={4} bg="dark.card" borderRadius="lg" border="1px solid" borderColor="dark.border">
                  <HStack spacing={3} mb={3}>
                    <Icon as={Cpu} color="dark.accent" boxSize={5} />
                    <Text fontWeight="600" color="dark.text">SIREN Module</Text>
                  </HStack>
                  <VStack spacing={2} align="start">
                    <Text fontSize="sm" color="dark.muted">• Real-time alerting system</Text>
                    <Text fontSize="sm" color="dark.muted">• Multi-channel notifications</Text>
                    <Text fontSize="sm" color="dark.muted">• Escalation procedures</Text>
                    <Text fontSize="sm" color="dark.muted">• Incident management</Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
