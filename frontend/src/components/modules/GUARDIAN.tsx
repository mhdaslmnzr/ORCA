'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Progress,
  SimpleGrid,
  Icon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function GUARDIAN() {
  // Mock compliance data
  const complianceStatus = {
    overall: 87,
    iso9001: 92,
    iso14001: 85,
    osha: 78,
    fda: 95
  };

  const complianceItems = [
    { id: 1, standard: 'ISO 9001:2015', status: 'compliant', lastAudit: '2024-01-15', nextAudit: '2024-07-15', score: 92 },
    { id: 2, standard: 'ISO 14001:2015', status: 'warning', lastAudit: '2024-02-01', nextAudit: '2024-08-01', score: 85 },
    { id: 3, standard: 'OSHA Safety', status: 'critical', lastAudit: '2024-01-30', nextAudit: '2024-04-30', score: 78 },
    { id: 4, standard: 'FDA Compliance', status: 'compliant', lastAudit: '2024-03-01', nextAudit: '2024-09-01', score: 95 },
    { id: 5, standard: 'EPA Environmental', status: 'warning', lastAudit: '2024-02-15', nextAudit: '2024-08-15', score: 82 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'dark.success';
      case 'warning': return 'dark.warning';
      case 'critical': return 'dark.danger';
      default: return 'dark.muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={2}>
          <HStack spacing={3}>
            <Box
              w={12}
              h={12}
              bg="rgba(59, 130, 246, 0.2)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Shield} boxSize={6} color="dark.info" />
            </Box>
            <VStack align="start" spacing={0}>
              <Heading size="lg" color="dark.text">
                GUARDIAN
              </Heading>
              <Text color="dark.muted" fontSize="sm">
                Regulatory Compliance Sentinel & Audit Automation
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Overall Compliance Score */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                Overall Compliance Score
              </Text>
              <Badge
                bg={complianceStatus.overall >= 90 ? 'rgba(16, 185, 129, 0.1)' : 
                     complianceStatus.overall >= 80 ? 'rgba(245, 158, 11, 0.1)' : 
                     'rgba(239, 68, 68, 0.1)'}
                color={complianceStatus.overall >= 90 ? 'dark.success' : 
                       complianceStatus.overall >= 80 ? 'dark.warning' : 'dark.danger'}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
                border="1px solid"
                borderColor={complianceStatus.overall >= 90 ? 'dark.success' : 
                            complianceStatus.overall >= 80 ? 'dark.warning' : 'dark.danger'}
              >
                {complianceStatus.overall}%
              </Badge>
            </HStack>
            <Progress 
              value={complianceStatus.overall} 
              size="lg" 
              borderRadius="full"
              bg="rgba(156, 163, 175, 0.2)"
              sx={{
                '& > div': {
                  bg: complianceStatus.overall >= 90 ? 'dark.success' : 
                       complianceStatus.overall >= 80 ? 'dark.warning' : 'dark.danger',
                }
              }}
            />
          </VStack>
        </Box>

        {/* Compliance Standards Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {Object.entries(complianceStatus).filter(([key]) => key !== 'overall').map(([standard, score]) => (
            <Box
              key={standard}
              bg="dark.card"
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="dark.border"
              shadow="sm"
              _hover={{ shadow: 'md' }}
              transition="all 0.2s"
              className="dashboard-card"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="600" color="dark.muted" textTransform="uppercase">
                    {standard.toUpperCase()}
                  </Text>
                  <Badge
                    bg={score >= 90 ? 'rgba(16, 185, 129, 0.1)' : 
                         score >= 80 ? 'rgba(245, 158, 11, 0.1)' : 
                         'rgba(239, 68, 68, 0.1)'}
                    color={score >= 90 ? 'dark.success' : 
                           score >= 80 ? 'dark.warning' : 'dark.danger'}
                    px={2}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="600"
                    border="1px solid"
                    borderColor={score >= 90 ? 'dark.success' : 
                                score >= 80 ? 'dark.warning' : 'dark.danger'}
                  >
                    {score}%
                  </Badge>
                </HStack>
                <Progress 
                  value={score} 
                  size="sm" 
                  borderRadius="full"
                  bg="rgba(156, 163, 175, 0.2)"
                  sx={{
                    '& > div': {
                      bg: score >= 90 ? 'dark.success' : 
                           score >= 80 ? 'dark.warning' : 'dark.danger',
                    }
                  }}
                />
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Compliance Table */}
        <Box
          bg="dark.card"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="dark.border"
          shadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="600" color="dark.text">
                Compliance Standards Status
              </Text>
              <Button size="sm" colorScheme="brand" variant="outline">
                Export Report
              </Button>
            </HStack>
            
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th color="dark.muted">Standard</Th>
                    <Th color="dark.muted">Status</Th>
                    <Th color="dark.muted">Last Audit</Th>
                    <Th color="dark.muted">Next Audit</Th>
                    <Th color="dark.muted">Score</Th>
                    <Th color="dark.muted">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {complianceItems.map((item) => (
                    <Tr key={item.id}>
                      <Td color="dark.text" fontWeight="500">{item.standard}</Td>
                      <Td>
                        <Badge
                          bg={`${getStatusColor(item.status)}10`}
                          color={getStatusColor(item.status)}
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                          border="1px solid"
                          borderColor={getStatusColor(item.status)}
                        >
                          <HStack spacing={1}>
                            <Icon as={getStatusIcon(item.status)} boxSize={3} />
                            <Text>{item.status}</Text>
                          </HStack>
                        </Badge>
                      </Td>
                      <Td color="dark.muted" fontSize="sm">{item.lastAudit}</Td>
                      <Td color="dark.muted" fontSize="sm">{item.nextAudit}</Td>
                      <Td>
                        <Text color={getStatusColor(item.status)} fontWeight="600">
                          {item.score}%
                        </Text>
                      </Td>
                      <Td>
                        <Button size="xs" variant="ghost" colorScheme="brand">
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
