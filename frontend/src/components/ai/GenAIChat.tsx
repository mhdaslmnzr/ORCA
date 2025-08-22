'use client';

import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Button,
  Flex,
  Avatar,
  useColorModeValue,
  Icon,
  Badge,
  Divider,
  Textarea,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  BarChart3,
  AlertTriangle,
  Zap,
  RefreshCw,
  Copy,
  Download
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function GenAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant for the ORCA platform. I can help you analyze equipment data, generate reports, predict maintenance needs, and answer questions about your systems. What would you like to explore today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const bgMain = useColorModeValue('#f8fafc', 'gray.900');
  const cardBg = useColorModeValue('#ffffff', 'gray.800');
  const borderColor = useColorModeValue('#e2e8f0', 'gray.700');
  const textColor = useColorModeValue('#1e293b', 'white');
  const mutedColor = useColorModeValue('#64748b', 'gray.400');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you're asking about "${inputMessage}". Based on your ORCA platform data, I can help analyze equipment performance, predict maintenance needs, and generate insights. Here are some recommendations based on current system status...`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const quickActions = [
    {
      icon: BarChart3,
      title: 'Generate Report',
      description: 'Create equipment health report',
      color: '#0ea5e9',
    },
    {
      icon: AlertTriangle,
      title: 'Risk Analysis',
      description: 'Analyze critical equipment risks',
      color: '#ef4444',
    },
    {
      icon: Zap,
      title: 'Predict Failures',
      description: 'Generate failure predictions',
      color: '#8b5cf6',
    },
    {
      icon: FileText,
      title: 'Maintenance Plan',
      description: 'Create maintenance schedule',
      color: '#22c55e',
    },
  ];

  return (
    <Box bg={bgMain} minH="100vh" p={6}>
      <VStack spacing={8} align="stretch" maxW="6xl" mx="auto">
        {/* Header */}
        <Box
          bg="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
          borderRadius="24px"
          p={8}
          color="white"
          shadow="xl"
        >
          <HStack spacing={4} mb={4}>
            <Box
              w={16}
              h={16}
              bg="rgba(255, 255, 255, 0.2)"
              borderRadius="16px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid rgba(255, 255, 255, 0.3)"
            >
              <Icon as={Sparkles} boxSize={8} color="white" />
            </Box>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="900" color="white">
                AI Assistant
              </Text>
              <Text fontSize="lg" fontWeight="600" color="rgba(255, 255, 255, 0.9)">
                Generate insights, reports, and predictions
              </Text>
            </VStack>
          </HStack>
          
          <Text fontSize="lg" color="rgba(255, 255, 255, 0.8)" mb={6}>
            Your intelligent companion for equipment analysis, predictive maintenance, and operational insights.
          </Text>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {quickActions.map((action, index) => (
              <Button
                key={index}
                leftIcon={<Icon as={action.icon} boxSize={4} />}
                bg="rgba(255, 255, 255, 0.1)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                color="white"
                size="sm"
                borderRadius="12px"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
                fontWeight="600"
                fontSize="xs"
                h={12}
              >
                <VStack spacing={0} align="start">
                  <Text fontSize="xs" fontWeight="700" noOfLines={1}>
                    {action.title}
                  </Text>
                  <Text fontSize="xs" opacity={0.8} noOfLines={1}>
                    {action.description}
                  </Text>
                </VStack>
              </Button>
            ))}
          </SimpleGrid>
        </Box>

        {/* Chat Interface */}
        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="24px"
          shadow="lg"
          overflow="hidden"
        >
          {/* Chat Messages */}
          <Box
            h="500px"
            overflowY="auto"
            p={6}
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '10px',
              },
            }}
          >
            <VStack spacing={6} align="stretch">
              {messages.map((message) => (
                <Flex
                  key={message.id}
                  justify={message.type === 'user' ? 'flex-end' : 'flex-start'}
                >
                  <HStack
                    spacing={3}
                    maxW="80%"
                    flexDirection={message.type === 'user' ? 'row-reverse' : 'row'}
                  >
                    <Avatar
                      size="sm"
                      bg={message.type === 'user' ? '#0ea5e9' : '#8b5cf6'}
                      icon={<Icon as={message.type === 'user' ? User : Bot} boxSize={4} />}
                      color="white"
                    />
                    <Box
                      bg={message.type === 'user' ? '#0ea5e9' : useColorModeValue('#f8fafc', 'gray.700')}
                      color={message.type === 'user' ? 'white' : textColor}
                      p={4}
                      borderRadius="16px"
                      border="1px solid"
                      borderColor={message.type === 'user' ? 'transparent' : borderColor}
                      position="relative"
                    >
                      <Text fontSize="sm" lineHeight="1.6" fontWeight="500">
                        {message.content}
                      </Text>
                      
                      {message.type === 'assistant' && (
                        <HStack spacing={2} mt={3} justify="flex-end">
                          <IconButton
                            aria-label="Copy"
                            icon={<Icon as={Copy} boxSize={3} />}
                            size="xs"
                            variant="ghost"
                            color={mutedColor}
                            _hover={{ bg: 'gray.100' }}
                          />
                          <IconButton
                            aria-label="Regenerate"
                            icon={<Icon as={RefreshCw} boxSize={3} />}
                            size="xs"
                            variant="ghost"
                            color={mutedColor}
                            _hover={{ bg: 'gray.100' }}
                          />
                        </HStack>
                      )}
                    </Box>
                  </HStack>
                </Flex>
              ))}
              
              {isLoading && (
                <Flex justify="flex-start">
                  <HStack spacing={3}>
                    <Avatar
                      size="sm"
                      bg="#8b5cf6"
                      icon={<Icon as={Bot} boxSize={4} />}
                      color="white"
                    />
                    <Box
                      bg={useColorModeValue('#f8fafc', 'gray.700')}
                      p={4}
                      borderRadius="16px"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <HStack spacing={1}>
                        <Box w={2} h={2} bg={mutedColor} borderRadius="full" animation="pulse 1.5s infinite" />
                        <Box w={2} h={2} bg={mutedColor} borderRadius="full" animation="pulse 1.5s infinite 0.2s" />
                        <Box w={2} h={2} bg={mutedColor} borderRadius="full" animation="pulse 1.5s infinite 0.4s" />
                      </HStack>
                    </Box>
                  </HStack>
                </Flex>
              )}
            </VStack>
          </Box>

          <Divider borderColor={borderColor} />

          {/* Input Area */}
          <Box p={6}>
            <HStack spacing={4}>
              <Input
                placeholder="Ask about equipment health, generate reports, or request predictions..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                bg={useColorModeValue('#f8fafc', 'gray.700')}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="12px"
                fontSize="md"
                fontWeight="500"
                color={textColor}
                _focus={{
                  borderColor: '#8b5cf6',
                  boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
                }}
                _placeholder={{ color: mutedColor }}
                size="lg"
              />
              <IconButton
                aria-label="Send message"
                icon={<Icon as={Send} boxSize={5} />}
                onClick={handleSendMessage}
                isDisabled={!inputMessage.trim() || isLoading}
                bg="#8b5cf6"
                color="white"
                size="lg"
                borderRadius="12px"
                _hover={{
                  bg: '#7c3aed',
                  transform: 'translateY(-2px)',
                }}
                _disabled={{
                  bg: mutedColor,
                  transform: 'none',
                }}
                transition="all 0.2s"
              />
            </HStack>
            
            <Text fontSize="xs" color={mutedColor} mt={2} textAlign="center">
              AI responses are generated based on your ORCA platform data and may not always be accurate.
            </Text>
          </Box>
        </Box>

        {/* Additional Tools */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            p={6}
            shadow="lg"
            _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
            transition="all 0.3s"
          >
            <VStack spacing={4} align="stretch">
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  bg="#0ea5e9"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                >
                  <Icon as={FileText} boxSize={5} />
                </Box>
                <Text fontSize="lg" fontWeight="700" color={textColor}>
                  Report Generator
                </Text>
              </HStack>
              <Text fontSize="sm" color={mutedColor} fontWeight="500">
                Generate comprehensive equipment health and maintenance reports
              </Text>
              <Button
                size="sm"
                variant="outline"
                borderRadius="8px"
                fontWeight="600"
                leftIcon={<Icon as={Download} boxSize={4} />}
              >
                Generate Report
              </Button>
            </VStack>
          </Box>

          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            p={6}
            shadow="lg"
            _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
            transition="all 0.3s"
          >
            <VStack spacing={4} align="stretch">
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  bg="#ef4444"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                >
                  <Icon as={AlertTriangle} boxSize={5} />
                </Box>
                <Text fontSize="lg" fontWeight="700" color={textColor}>
                  Risk Analyzer
                </Text>
              </HStack>
              <Text fontSize="sm" color={mutedColor} fontWeight="500">
                Analyze potential risks and failure probabilities across equipment
              </Text>
              <Button
                size="sm"
                variant="outline"
                borderRadius="8px"
                fontWeight="600"
                leftIcon={<Icon as={BarChart3} boxSize={4} />}
              >
                Analyze Risks
              </Button>
            </VStack>
          </Box>

          <Box
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="16px"
            p={6}
            shadow="lg"
            _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
            transition="all 0.3s"
          >
            <VStack spacing={4} align="stretch">
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  bg="#8b5cf6"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                >
                  <Icon as={Zap} boxSize={5} />
                </Box>
                <Text fontSize="lg" fontWeight="700" color={textColor}>
                  Predictive Models
                </Text>
              </HStack>
              <Text fontSize="sm" color={mutedColor} fontWeight="500">
                Run AI models to predict equipment failures and maintenance needs
              </Text>
              <Button
                size="sm"
                variant="outline"
                borderRadius="8px"
                fontWeight="600"
                leftIcon={<Icon as={Sparkles} boxSize={4} />}
              >
                Run Predictions
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
