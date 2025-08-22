'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  IconButton,
  Avatar,
  Badge,
  Divider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Select,
  Progress,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  Send,
  Upload,
  FileText,
  MessageCircle,
  Bot,
  User,
  Settings,
  Download,
  Trash2,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  context?: {
    equipment_id?: string;
    sensor_data?: any;
    rul?: number;
  };
}

interface FileAnalysis {
  filename: string;
  fileType: string;
  analysis: string;
  timestamp: string;
  status: string;
}

const ORCAChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: "Hello! I'm ORCA AI, your intelligent maintenance assistant. I can help you with:\n\n• Equipment health analysis\n• Maintenance planning\n• Troubleshooting\n• Data interpretation\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis | null>(null);
  const [equipmentContext, setEquipmentContext] = useState<string>('');
  const [sensorData, setSensorData] = useState<any>(null);
  const [rul, setRul] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'user' | 'ai', message: string, context?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      context,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    addMessage('user', userMessage);

    try {
      // Prepare context for AI
      const context: any = {};
      if (equipmentContext) context.equipment_id = equipmentContext;
      if (sensorData) context.sensor_data = sensorData;
      if (rul) context.rul = rul;

      // Call AI chatbot API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          ...context,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addMessage('ai', data.ai_response, context);
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('ai', 'Sorry, I encountered an error. Please try again or check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/analyze-data', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFileAnalysis(data.analysis);
        
        // Add AI message about file analysis
        addMessage('ai', `I've analyzed your file "${selectedFile.name}". Here's what I found:\n\n${data.analysis.analysis}`);
        
        toast({
          title: 'File analyzed successfully',
          description: 'AI analysis complete',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to analyze file');
      }
    } catch (error) {
      console.error('Error analyzing file:', error);
      toast({
        title: 'Analysis failed',
        description: 'Could not analyze the uploaded file',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onOpen();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        message: "Hello! I'm ORCA AI, your intelligent maintenance assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      bg="dark.card"
      borderRadius="xl"
      border="1px solid"
      borderColor="dark.border"
      h="600px"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      className="card-hover"
    >
      {/* Header */}
      <Box
        p={4}
        borderBottom="1px solid"
        borderColor="dark.border"
        bg="dark.sidebar"
      >
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <Avatar
              size="sm"
              bg="linear-gradient(135deg, dark.accent 0%, dark.info 100%)"
              icon={<Bot size={16} />}
            />
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="700" color="dark.text">
                ORCA AI Assistant
              </Text>
              <Text fontSize="xs" color="dark.muted">
                Intelligent Maintenance Support
              </Text>
            </VStack>
          </HStack>
          
          <HStack spacing={2}>
            <IconButton
              aria-label="Upload file"
              icon={<Upload size={16} />}
              size="sm"
              variant="ghost"
              color="dark.muted"
              _hover={{ color: 'dark.text', bg: 'dark.accent' }}
              onClick={() => fileInputRef.current?.click()}
            />
            <IconButton
              aria-label="Clear chat"
              icon={<Trash2 size={16} />}
              size="sm"
              variant="ghost"
              color="dark.muted"
              _hover={{ color: 'dark.text', bg: 'dark.danger' }}
              onClick={clearChat}
            />
            <IconButton
              aria-label="Settings"
              icon={<Settings size={16} />}
              size="sm"
              variant="ghost"
              color="dark.muted"
              _hover={{ color: 'dark.text', bg: 'dark.accent' }}
            />
          </HStack>
        </HStack>
      </Box>

      {/* Context Panel */}
      <Box
        p={3}
        borderBottom="1px solid"
        borderColor="dark.border"
        bg="dark.sidebar"
        opacity={0.8}
      >
        <HStack spacing={4} fontSize="xs">
          <HStack spacing={2}>
            <Text color="dark.muted">Equipment:</Text>
            <Select
              size="xs"
              value={equipmentContext}
              onChange={(e) => setEquipmentContext(e.target.value)}
              placeholder="Select equipment"
              bg="dark.card"
              borderColor="dark.border"
              color="dark.text"
              w="120px"
            >
              <option value="EQ001">EQ001</option>
              <option value="EQ002">EQ002</option>
              <option value="EQ003">EQ003</option>
              <option value="EQ004">EQ004</option>
              <option value="EQ005">EQ005</option>
            </Select>
          </HStack>
          
          <HStack spacing={2}>
            <Text color="dark.muted">RUL:</Text>
            <Input
              size="xs"
              placeholder="RUL cycles"
              value={rul || ''}
              onChange={(e) => setRul(Number(e.target.value) || null)}
              bg="dark.card"
              borderColor="dark.border"
              color="dark.text"
              w="80px"
            />
          </HStack>
          
          <Button
            size="xs"
            variant="ghost"
            color="dark.muted"
            _hover={{ color: 'dark.text', bg: 'dark.accent' }}
            onClick={() => {
              setEquipmentContext('');
              setSensorData(null);
              setRul(null);
            }}
          >
            Clear Context
          </Button>
        </HStack>
      </Box>

      {/* Messages */}
      <Box flex={1} overflowY="auto" p={4} spacing={4}>
        <VStack spacing={4} align="stretch">
          {messages.map((message) => (
            <Box
              key={message.id}
              alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
              maxW="80%"
            >
              <HStack spacing={3} align="start">
                {message.type === 'ai' && (
                  <Avatar
                    size="sm"
                    bg="linear-gradient(135deg, dark.accent 0%, dark.info 100%)"
                    icon={<Bot size={16} />}
                  />
                )}
                
                <Box
                  bg={message.type === 'user' ? 'dark.accent' : 'dark.sidebar'}
                  color={message.type === 'user' ? 'white' : 'dark.text'}
                  p={3}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={message.type === 'user' ? 'dark.accent' : 'dark.border'}
                  maxW="100%"
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">
                    {message.message}
                  </Text>
                  <Text fontSize="xs" color="dark.muted" mt={2}>
                    {message.timestamp.toLocaleTimeString()}
                  </Text>
                </Box>
                
                {message.type === 'user' && (
                  <Avatar
                    size="sm"
                    bg="dark.info"
                    icon={<User size={16} />}
                  />
                )}
              </HStack>
            </Box>
          ))}
          
          {isLoading && (
            <Box alignSelf="flex-start" maxW="80%">
              <HStack spacing={3} align="start">
                <Avatar
                  size="sm"
                  bg="linear-gradient(135deg, dark.accent 0%, dark.info 100%)"
                  icon={<Bot size={16} />}
                />
                <Box
                  bg="dark.sidebar"
                  p={3}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="dark.border"
                >
                  <HStack spacing={2}>
                    <Spinner size="sm" color="dark.accent" />
                    <Text fontSize="sm" color="dark.muted">
                      ORCA AI is thinking...
                    </Text>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Input */}
      <Box p={4} borderTop="1px solid" borderColor="dark.border">
        <HStack spacing={3}>
          <Input
            placeholder="Ask me about maintenance, equipment health, or upload data for analysis..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            bg="dark.sidebar"
            borderColor="dark.border"
            color="dark.text"
            _placeholder={{ color: 'dark.muted' }}
            _focus={{ borderColor: 'dark.accent', boxShadow: 'none' }}
          />
          <IconButton
            aria-label="Send message"
            icon={<Send size={16} />}
            colorScheme="blue"
            bg="dark.accent"
            _hover={{ bg: 'dark.info' }}
            onClick={handleSendMessage}
            isLoading={isLoading}
            isDisabled={!inputMessage.trim()}
          />
        </HStack>
        
        <HStack spacing={2} mt={2} justify="center">
          <Text fontSize="xs" color="dark.muted">
            💡 Try: "Why is my equipment failing?" or "What maintenance should I do next?"
          </Text>
        </HStack>
      </Box>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* File Upload Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="dark.card" borderColor="dark.border">
          <ModalHeader color="dark.text">Upload File for Analysis</ModalHeader>
          <ModalCloseButton color="dark.muted" />
          <ModalBody>
            <VStack spacing={4}>
              <Box
                p={4}
                border="2px dashed"
                borderColor="dark.border"
                borderRadius="lg"
                textAlign="center"
                w="full"
              >
                <FileText size={48} color="gray" />
                <Text mt={2} color="dark.text" fontWeight="600">
                  {selectedFile?.name}
                </Text>
                <Text fontSize="sm" color="dark.muted">
                  {selectedFile?.type || 'Unknown type'}
                </Text>
              </Box>
              
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>File Analysis</AlertTitle>
                  <AlertDescription>
                    ORCA AI will analyze your {selectedFile?.name?.split('.').pop()?.toUpperCase()} file and provide maintenance insights.
                  </AlertDescription>
                </Box>
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} color="dark.muted">
              Cancel
            </Button>
            <Button
              bg="dark.accent"
              _hover={{ bg: 'dark.info' }}
              onClick={handleFileUpload}
              isLoading={isLoading}
            >
              Analyze File
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ORCAChatbot;
