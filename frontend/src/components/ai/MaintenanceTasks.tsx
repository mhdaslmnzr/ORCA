'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Button,
  IconButton,
  Progress,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Select,
} from '@chakra-ui/react';
import {
  Wrench,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Settings,
  FileText,
  Tool,
  Shield,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface MaintenanceTask {
  task_name: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimated_time: number;
  required_tools: string[];
  required_parts: string[];
  step_by_step_instructions: string[];
  safety_notes: string;
  cost_estimate: number;
  risk_assessment: string;
}

interface MaintenanceTasksProps {
  equipmentId?: string;
  sensorData?: any;
  rul?: number;
}

const MaintenanceTasks: React.FC<MaintenanceTasksProps> = ({
  equipmentId,
  sensorData,
  rul,
}) => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [taskStatus, setTaskStatus] = useState<Record<string, 'pending' | 'in_progress' | 'completed'>>({});
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'red';
      case 'High':
        return 'orange';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <AlertTriangle size={16} />;
      case 'High':
        return <TrendingUp size={16} />;
      case 'Medium':
        return <TrendingDown size={16} />;
      case 'Low':
        return <CheckCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const generateTasks = async () => {
    if (!sensorData) {
      toast({
        title: 'No sensor data',
        description: 'Please provide sensor data to generate maintenance tasks',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/maintenance-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sensorData,
          fd_id: 'FD001', // Default, can be made configurable
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.maintenance_tasks);
        
        // Initialize task status
        const initialStatus: Record<string, 'pending' | 'in_progress' | 'completed'> = {};
        data.maintenance_tasks.forEach((task: MaintenanceTask) => {
          initialStatus[task.task_name] = 'pending';
        });
        setTaskStatus(initialStatus);
        
        toast({
          title: 'Tasks generated successfully',
          description: `Generated ${data.maintenance_tasks.length} maintenance tasks`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to generate tasks');
      }
    } catch (error) {
      console.error('Error generating tasks:', error);
      toast({
        title: 'Task generation failed',
        description: 'Could not generate maintenance tasks',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = (taskName: string, status: 'pending' | 'in_progress' | 'completed') => {
    setTaskStatus(prev => ({
      ...prev,
      [taskName]: status,
    }));
  };

  const openTaskDetails = (task: MaintenanceTask) => {
    setSelectedTask(task);
    onOpen();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="green" />;
      case 'in_progress':
        return <Play size={16} color="blue" />;
      case 'pending':
        return <Clock size={16} color="gray" />;
      default:
        return <Clock size={16} color="gray" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in_progress':
        return 'blue';
      case 'pending':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Box
      bg="dark.card"
      borderRadius="xl"
      border="1px solid"
      borderColor="dark.border"
      p={6}
      className="card-hover"
    >
      {/* Header */}
      <HStack justify="space-between" align="center" mb={6}>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="dark.text">
            🛠️ Maintenance Tasks
          </Heading>
          <Text fontSize="sm" color="dark.muted">
            AI-generated maintenance recommendations
          </Text>
        </VStack>
        
        <Button
          leftIcon={<Wrench size={16} />}
          bg="dark.accent"
          _hover={{ bg: 'dark.info' }}
          onClick={generateTasks}
          isLoading={isLoading}
          isDisabled={!sensorData}
        >
          Generate Tasks
        </Button>
      </HStack>

      {/* Context Info */}
      {equipmentId && (
        <Alert status="info" borderRadius="lg" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Equipment Context</AlertTitle>
            <AlertDescription>
              Equipment: {equipmentId} | RUL: {rul ? `${rul.toFixed(1)} cycles` : 'Unknown'} | 
              Status: {sensorData ? 'Sensor data available' : 'No sensor data'}
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Wrench size={48} color="gray" />
          <Text mt={4} color="dark.muted" fontSize="lg">
            No maintenance tasks generated yet
          </Text>
          <Text color="dark.muted" fontSize="sm">
            Click "Generate Tasks" to get AI-powered maintenance recommendations
          </Text>
        </Box>
      ) : (
        <VStack spacing={4} align="stretch">
          {tasks.map((task, index) => (
            <Box
              key={index}
              bg="dark.sidebar"
              borderRadius="lg"
              border="1px solid"
              borderColor="dark.border"
              p={4}
              className="card-hover"
            >
              <HStack justify="space-between" align="start" mb={3}>
                <VStack align="start" spacing={1} flex={1}>
                  <HStack spacing={2}>
                    <Text fontWeight="600" color="dark.text" fontSize="lg">
                      {task.task_name}
                    </Text>
                    <Badge
                      colorScheme={getPriorityColor(task.priority)}
                      variant="solid"
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {getPriorityIcon(task.priority)}
                      <Text ml={1}>{task.priority}</Text>
                    </Badge>
                  </HStack>
                  
                  <HStack spacing={4} fontSize="sm" color="dark.muted">
                    <HStack spacing={1}>
                      <Clock size={14} />
                      <Text>{task.estimated_time}h</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <DollarSign size={14} />
                      <Text>${task.cost_estimate}</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Tool size={14} />
                      <Text>{task.required_tools.length} tools</Text>
                    </HStack>
                  </HStack>
                </VStack>
                
                <HStack spacing={2}>
                  <Tooltip label="View Details">
                    <IconButton
                      aria-label="View task details"
                      icon={<FileText size={16} />}
                      size="sm"
                      variant="ghost"
                      color="dark.muted"
                      _hover={{ color: 'dark.text', bg: 'dark.accent' }}
                      onClick={() => openTaskDetails(task)}
                    />
                  </Tooltip>
                  
                  <Select
                    size="sm"
                    value={taskStatus[task.task_name] || 'pending'}
                    onChange={(e) => updateTaskStatus(task.task_name, e.target.value as any)}
                    bg="dark.card"
                    borderColor="dark.border"
                    color="dark.text"
                    w="120px"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </HStack>
              </HStack>
              
              {/* Status Progress */}
              <Box mt={3}>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="xs" color="dark.muted">
                    Progress
                  </Text>
                  <Text fontSize="xs" color="dark.muted">
                    {taskStatus[task.task_name] === 'completed' ? '100%' : 
                     taskStatus[task.task_name] === 'in_progress' ? '50%' : '0%'}
                  </Text>
                </HStack>
                <Progress
                  value={taskStatus[task.task_name] === 'completed' ? 100 : 
                         taskStatus[task.task_name] === 'in_progress' ? 50 : 0}
                  colorScheme={getStatusColor(taskStatus[task.task_name] || 'pending')}
                  borderRadius="full"
                  size="sm"
                />
              </Box>
            </Box>
          ))}
        </VStack>
      )}

      {/* Task Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="dark.card" borderColor="dark.border">
          <ModalHeader color="dark.text">
            <HStack spacing={3}>
              <Wrench size={20} />
              <Text>Task Details</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="dark.muted" />
          
          {selectedTask && (
            <ModalBody>
              <VStack spacing={6} align="stretch">
                {/* Task Overview */}
                <Box>
                  <Heading size="sm" color="dark.text" mb={3}>
                    {selectedTask.task_name}
                  </Heading>
                  <HStack spacing={4} flexWrap="wrap">
                    <Badge colorScheme={getPriorityColor(selectedTask.priority)} variant="solid">
                      {selectedTask.priority} Priority
                    </Badge>
                    <Badge colorScheme="blue" variant="outline">
                      {selectedTask.estimated_time}h estimated
                    </Badge>
                    <Badge colorScheme="green" variant="outline">
                      ${selectedTask.cost_estimate} estimated cost
                    </Badge>
                  </HStack>
                </Box>

                <Divider borderColor="dark.border" />

                {/* Required Tools & Parts */}
                <HStack spacing={6} align="start">
                  <Box flex={1}>
                    <Text fontWeight="600" color="dark.text" mb={2}>
                      Required Tools
                    </Text>
                    <List spacing={1}>
                      {selectedTask.required_tools.map((tool, index) => (
                        <ListItem key={index} color="dark.muted" fontSize="sm">
                          <ListIcon as={Tool} color="dark.accent" />
                          {tool}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  <Box flex={1}>
                    <Text fontWeight="600" color="dark.text" mb={2}>
                      Required Parts
                    </Text>
                    <List spacing={1}>
                      {selectedTask.required_parts.map((part, index) => (
                        <ListItem key={index} color="dark.muted" fontSize="sm">
                          <ListIcon as={Wrench} color="dark.accent" />
                          {part}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </HStack>

                <Divider borderColor="dark.border" />

                {/* Step-by-Step Instructions */}
                <Box>
                  <Text fontWeight="600" color="dark.text" mb={3}>
                    Step-by-Step Instructions
                  </Text>
                  <List spacing={2}>
                    {selectedTask.step_by_step_instructions.map((step, index) => (
                      <ListItem key={index} color="dark.text" fontSize="sm">
                        <ListIcon as={CheckCircle} color="dark.accent" />
                        <Text as="span" fontWeight="500">Step {index + 1}:</Text> {step}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider borderColor="dark.border" />

                {/* Safety Notes & Risk Assessment */}
                <HStack spacing={6} align="start">
                  <Box flex={1}>
                    <Text fontWeight="600" color="dark.text" mb={2}>
                      <Shield size={16} style={{ display: 'inline', marginRight: '8px' }} />
                      Safety Notes
                    </Text>
                    <Text color="dark.muted" fontSize="sm">
                      {selectedTask.safety_notes}
                    </Text>
                  </Box>
                  
                  <Box flex={1}>
                    <Text fontWeight="600" color="dark.text" mb={2}>
                      <AlertTriangle size={16} style={{ display: 'inline', marginRight: '8px' }} />
                      Risk Assessment
                    </Text>
                    <Text color="dark.muted" fontSize="sm">
                      {selectedTask.risk_assessment}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </ModalBody>
          )}
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose} color="dark.muted">
              Close
            </Button>
            <Button
              bg="dark.accent"
              _hover={{ bg: 'dark.info' }}
              onClick={() => {
                if (selectedTask) {
                  updateTaskStatus(selectedTask.task_name, 'in_progress');
                  onClose();
                }
              }}
            >
              Start Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MaintenanceTasks;
