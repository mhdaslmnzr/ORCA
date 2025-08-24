'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is a hydration error
    const isHydrationError = error.message.includes('hydration') || 
                            error.message.includes('Hydration') ||
                            error.message.includes('server rendered') ||
                            error.message.includes('client properties');
    
    if (isHydrationError) {
      console.warn('Hydration error detected, attempting recovery...');
      // Try to recover from hydration errors
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          p={8}
          textAlign="center"
          bg="dark.background"
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={6} maxW="600px">
            <Heading size="xl" color="dark.text">
              🚨 Something went wrong
            </Heading>
            <Text color="dark.muted" fontSize="lg">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Text color="dark.muted" fontSize="md">
              This might be a hydration issue. Try refreshing the page.
            </Text>
            <Button
              onClick={() => window.location.reload()}
              bg="dark.accent"
              _hover={{ bg: 'dark.info' }}
              size="lg"
            >
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
