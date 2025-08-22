'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PREDATORDashboard from '../dashboard/PREDATORDashboard';
import GenAIChat from '../ai/GenAIChat';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeModule, setActiveModule] = useState('PREDATOR');
  const bgMain = useColorModeValue('#f8fafc', 'gray.900');

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'PREDATOR':
        return <PREDATORDashboard />;
      case 'GUARDIAN':
        return (
          <Box p={8}>
            <Box bg="white" p={8} borderRadius="16px" textAlign="center">
              <Text fontSize="2xl" fontWeight="700" mb={4}>🛡️ GUARDIAN</Text>
              <Text fontSize="lg" color="gray.600">Regulatory Compliance Sentinel</Text>
              <Text mt={4}>This module is under development.</Text>
            </Box>
          </Box>
        );
      case 'MIRROR':
        return (
          <Box p={8}>
            <Box bg="white" p={8} borderRadius="16px" textAlign="center">
              <Text fontSize="2xl" fontWeight="700" mb={4}>🔮 MIRROR</Text>
              <Text fontSize="lg" color="gray.600">Digital Twin Intelligence</Text>
              <Text mt={4}>This module is under development.</Text>
            </Box>
          </Box>
        );
      case 'SIREN':
        return (
          <Box p={8}>
            <Box bg="white" p={8} borderRadius="16px" textAlign="center">
              <Text fontSize="2xl" fontWeight="700" mb={4}>🚨 SIREN</Text>
              <Text fontSize="lg" color="gray.600">Real-Time Alerting System</Text>
              <Text mt={4}>This module is under development.</Text>
            </Box>
          </Box>
        );
      case 'AI_ASSISTANT':
        return <GenAIChat />;
      default:
        return children || <PREDATORDashboard />;
    }
  };

  return (
    <Flex h="100vh" bg={bgMain}>
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={(module) => {
          if (module === 'AI_ASSISTANT') {
            setActiveModule('AI_ASSISTANT');
          } else {
            setActiveModule(module);
          }
        }} 
      />
      <Box flex={1} overflow="hidden">
        <Header />
        <Box 
          as="main" 
          h="calc(100vh - 80px)" 
          overflowY="auto"
          bg={bgMain}
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
          {renderModuleContent()}
        </Box>
      </Box>
    </Flex>
  );
}