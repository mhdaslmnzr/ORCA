'use client';

import dynamic from 'next/dynamic';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

// Dynamically import the dashboard with SSR disabled
const PREDATOREnhanced = dynamic(
  () => import('../components/dashboard/PREDATOREnhanced'),
  {
    ssr: false,
    loading: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="dark.background"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="dark.accent" />
          <Text color="dark.text" fontSize="lg">
            Loading ORCA Dashboard...
          </Text>
        </VStack>
      </Box>
    ),
  }
);

export default function Home() {
  return <PREDATOREnhanced />;
}
