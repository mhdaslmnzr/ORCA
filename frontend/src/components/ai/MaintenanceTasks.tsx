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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import {
  Wrench,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Play,
  RotateCcw,
  FileText,
  Shield,
  TrendingUp,
  TrendingDown,
  Brain,
  Lightbulb,
  Activity,
} from 'lucide-react';
import { MaintenanceTask } from '../../types';

interface MaintenanceTasksProps {
  equipmentId?: string;
  sensorData?: Record<string, unknown>;
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
  const [aiInsights, setAiInsights] = useState<string>('');
  const [taskMetrics, setTaskMetrics] = useState({
    totalTasks: 0,
    criticalTasks: 0,
    estimatedTotalTime: 0,
    estimatedTotalCost: 0,
    completionRate: 0,
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Generate mock tasks when component mounts or equipment changes
  useEffect(() => {
    if (equipmentId && sensorData) {
      generateMockTasks();
    }
  }, [equipmentId, sensorData]);

  // Generate mock tasks as fallback
  const generateMockTasks = () => {
    const mockTasks: MaintenanceTask[] = [
      {
        task_name: "Preventive Maintenance Check",
        priority: "High",
        estimated_time: 2,
        cost_estimate: 150,
        required_tools: ["Multimeter", "Screwdriver Set", "Cleaning Supplies"],
        required_parts: ["Air Filter", "Lubricant"],
        step_by_step_instructions: [
          "Inspect equipment for visible wear and tear",
          "Clean air filters and replace if necessary",
          "Check lubrication levels and top up if needed",
          "Test all safety systems and emergency stops",
          "Document findings and update maintenance log"
        ],
        safety_notes: "Ensure equipment is powered off and locked out before starting. Wear appropriate PPE including safety glasses and gloves.",
        risk_assessment: "Low risk maintenance task. Standard safety procedures apply."
      },
      {
        task_name: "Sensor Calibration",
        priority: rul && rul < 100 ? "Critical" : "Medium",
        estimated_time: 1.5,
        cost_estimate: 75,
        required_tools: ["Calibration Kit", "Reference Standards"],
        required_parts: ["Calibration Certificate"],
        step_by_step_instructions: [
          "Verify calibration standards are within tolerance",
          "Connect calibration equipment to sensors",
          "Apply known reference values",
          "Adjust sensor readings to match standards",
          "Verify calibration across full range",
          "Document calibration results"
        ],
        safety_notes: "Follow manufacturer's calibration procedures. Ensure proper grounding and electrical safety.",
        risk_assessment: "Medium risk due to electrical work. Qualified personnel required."
      },
      {
        task_name: "Performance Optimization",
        priority: "Medium",
        estimated_time: 3,
        cost_estimate: 200,
        required_tools: ["Performance Analyzer", "Data Logger"],
        required_parts: ["Performance Report"],
        step_by_step_instructions: [
          "Analyze current performance metrics",
          "Identify bottlenecks and inefficiencies",
          "Optimize operating parameters",
          "Test performance improvements",
          "Document optimization results",
          "Update operating procedures"
        ],
        safety_notes: "Monitor equipment during optimization. Stop immediately if unusual behavior is observed.",
        risk_assessment: "Low risk optimization task. Monitor equipment performance closely."
      }
    ];

    // Adjust priorities based on equipment status
    if (rul && rul < 50) {
      mockTasks[0].priority = "Critical";
      mockTasks[0].task_name = "Emergency Maintenance Required";
      mockTasks[0].estimated_time = 4;
      mockTasks[0].cost_estimate = 500;
    }

    if (sensorData) {
      const sensorValues = Object.values(sensorData);
      const avgValue = sensorValues.reduce((sum: number, val: unknown) => sum + (Number(val) || 0), 0) / sensorValues.length;
      
      if (avgValue > 80) {
        mockTasks[1].priority = "Critical";
        mockTasks[1].task_name = "Immediate Sensor Issue Resolution";
      }
    }

    setTasks(mockTasks);
    
    // Initialize task status
    const initialStatus: Record<string, 'pending' | 'in_progress' | 'completed'> = {};
    mockTasks.forEach((task: MaintenanceTask) => {
      initialStatus[task.task_name] = 'pending';
    });
    setTaskStatus(initialStatus);
    
    // Generate AI insights
    generateAIInsights(mockTasks);
    
    // Calculate metrics
    calculateTaskMetrics(mockTasks);
    
    toast({
      title: 'Intelligent Tasks Generated',
      description: `Generated ${mockTasks.length} maintenance tasks based on equipment analysis`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const generateAIInsights = (maintenanceTasks: MaintenanceTask[]) => {
    const criticalTasks = maintenanceTasks.filter(task => task.priority === 'Critical');
    const highPriorityTasks = maintenanceTasks.filter(task => task.priority === 'High');
    
    let insights = '';
    
    if (criticalTasks.length > 0) {
      insights += `🚨 **Critical Alert**: ${criticalTasks.length} critical maintenance tasks detected. Immediate attention required to prevent equipment failure.\n\n`;
    }
    
    if (highPriorityTasks.length > 0) {
      insights += `⚠️ **High Priority**: ${highPriorityTasks.length} high-priority tasks identified. Schedule these within 24-48 hours.\n\n`;
    }
    
    if (rul && rul < 100) {
      insights += `⏰ **RUL Warning**: Equipment RUL is ${rul.toFixed(1)} cycles. Consider preventive maintenance to extend lifespan.\n\n`;
    }
    
    if (sensorData) {
      const sensorValues = Object.values(sensorData);
      const avgValue = sensorValues.reduce((sum: number, val: unknown) => sum + (Number(val) || 0), 0) / sensorValues.length;
      
      if (avgValue > 80) {
        insights += `📊 **Sensor Alert**: High sensor readings detected. Monitor closely for potential issues.\n\n`;
      }
    }
    
    insights += `💡 **Recommendation**: Prioritize tasks by criticality and estimated completion time. Consider resource availability and safety requirements.`;
    
    setAiInsights(insights);
  };

  const calculateTaskMetrics = (maintenanceTasks: MaintenanceTask[]) => {
    const totalTasks = maintenanceTasks.length;
    const criticalTasks = maintenanceTasks.filter(task => task.priority === 'Critical').length;
    const estimatedTotalTime = maintenanceTasks.reduce((sum, task) => sum + task.estimated_time, 0);
    const estimatedTotalCost = maintenanceTasks.reduce((sum, task) => sum + task.cost_estimate, 0);
    
    setTaskMetrics({
      totalTasks,
      criticalTasks,
      estimatedTotalTime,
      estimatedTotalCost,
      completionRate: 0,
    });
  };

  const updateTaskStatus = (taskName: string, status: 'pending' | 'in_progress' | 'completed') => {
    setTaskStatus(prev => ({
      ...prev,
      [taskName]: status,
    }));
    
    // Update completion rate
    const completedTasks = Object.values({ ...taskStatus, [taskName]: status }).filter(s => s === 'completed').length;
    const totalTasks = Object.keys(taskStatus).length;
    setTaskMetrics(prev => ({
      ...prev,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    }));
  };

  const openTaskDetails = (task: MaintenanceTask) => {
    setSelectedTask(task);
    onOpen();
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

  const getSensorInsights = () => {
    if (!sensorData) return null;
    
    const insights = [];
    for (const [sensor, value] of Object.entries(sensorData)) {
      if (typeof value === 'number') {
        if (value > 80) {
          insights.push({ sensor, value, status: 'warning', icon: AlertTriangle });
        } else if (value > 60) {
          insights.push({ sensor, value, status: 'caution', icon: Clock });
        } else {
          insights.push({ sensor, value, status: 'normal', icon: CheckCircle });
        }
      }
    }
    return insights;
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
          <HStack spacing={2}>
            <Icon as={Brain} color="dark.accent" boxSize={6} />
            <Heading size="md" color="dark.text">
              🧠 Agentic Task Planner
            </Heading>
          </HStack>
          <Text fontSize="sm" color="dark.muted">
            AI-powered intelligent maintenance planning & execution
          </Text>
        </VStack>
        
        {isLoading && (
          <HStack spacing={2}>
            <Spinner size="sm" color="dark.accent" />
            <Text fontSize="sm" color="dark.muted">Generating AI Tasks...</Text>
          </HStack>
        )}
        
        {!isLoading && equipmentId && (
          <Button
            leftIcon={<RotateCcw size={16} />}
            variant="outline"
            borderColor="dark.border"
            color="dark.text"
            _hover={{ bg: 'dark.accent' }}
            onClick={generateMockTasks}
            size="sm"
          >
            Refresh Tasks
          </Button>
        )}
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

      {/* AI Insights Panel */}
      {aiInsights && (
        <Box
          bg="rgba(99, 102, 241, 0.1)"
          border="1px solid"
          borderColor="rgba(99, 102, 241, 0.3)"
          borderRadius="lg"
          p={4}
          mb={6}
        >
          <HStack spacing={3} mb={3}>
            <Icon as={Lightbulb} color="dark.accent" boxSize={5} />
            <Text fontWeight="600" color="dark.text">AI Insights & Recommendations</Text>
          </HStack>
          <Text fontSize="sm" color="dark.muted" whiteSpace="pre-line">
            {aiInsights}
          </Text>
        </Box>
      )}

      {/* Task Metrics Dashboard */}
      {tasks.length > 0 && (
        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4} mb={6}>
          <Stat>
            <StatLabel color="dark.muted" fontSize="xs">Total Tasks</StatLabel>
            <StatNumber color="dark.text" fontSize="lg">{taskMetrics.totalTasks}</StatNumber>
            <StatHelpText color="dark.muted" fontSize="xs">
              <StatArrow type="increase" />
              AI Generated
            </StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel color="dark.muted" fontSize="xs">Critical</StatLabel>
            <StatNumber color="red.400" fontSize="lg">{taskMetrics.criticalTasks}</StatNumber>
            <StatHelpText color="dark.muted" fontSize="xs">Immediate Action</StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel color="dark.muted" fontSize="xs">Est. Time</StatLabel>
            <StatNumber color="dark.text" fontSize="lg">{taskMetrics.estimatedTotalTime}h</StatNumber>
            <StatHelpText color="dark.muted" fontSize="xs">Total Duration</StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel color="dark.muted" fontSize="xs">Est. Cost</StatLabel>
            <StatNumber color="dark.text" fontSize="lg">${taskMetrics.estimatedTotalCost}</StatNumber>
            <StatHelpText color="dark.muted" fontSize="xs">Total Budget</StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel color="dark.muted" fontSize="xs">Progress</StatLabel>
            <StatNumber color="dark.text" fontSize="lg">{taskMetrics.completionRate.toFixed(0)}%</StatNumber>
            <StatHelpText color="dark.muted" fontSize="xs">Completion Rate</StatHelpText>
          </Stat>
        </SimpleGrid>
      )}

      {/* Sensor Data Insights */}
      {sensorData && (
        <Box mb={6}>
          <HStack spacing={3} mb={3}>
            <Icon as={Activity} color="dark.accent" boxSize={5} />
            <Text fontWeight="600" color="dark.text">Real-time Sensor Insights</Text>
          </HStack>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
            {getSensorInsights()?.map((insight, index) => (
              <Box
                key={index}
                p={3}
                bg="dark.sidebar"
                borderRadius="lg"
                border="1px solid"
                borderColor={insight.status === 'warning' ? 'red.400' : insight.status === 'caution' ? 'yellow.400' : 'green.400'}
                textAlign="center"
              >
                <Icon as={insight.icon} color={insight.status === 'warning' ? 'red.400' : insight.status === 'caution' ? 'yellow.400' : 'green.400'} boxSize={4} mb={2} />
                <Text fontSize="xs" color="dark.muted" textTransform="uppercase" fontWeight="600">
                  {insight.sensor.replace('_', ' ')}
                </Text>
                <Text fontSize="lg" color="dark.text" fontWeight="700">
                  {insight.value.toFixed(2)}
                </Text>
                <Text fontSize="xs" color="dark.muted">
                  {insight.status === 'warning' ? 'High' : insight.status === 'caution' ? 'Elevated' : 'Normal'}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Icon as={Brain} size={48} color="gray" />
          <Text mt={4} color="dark.muted" fontSize="lg">
            {equipmentId ? 'Analyzing equipment status...' : 'Select equipment to generate AI tasks'}
          </Text>
          <Text color="dark.muted" fontSize="sm">
            {equipmentId ? 'AI is analyzing sensor data and equipment health to generate intelligent maintenance recommendations' : 'Choose any equipment from the dashboard to see AI-generated maintenance tasks'}
          </Text>
        </Box>
      ) : (
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb={4}>
            <Tab color="dark.text">All Tasks</Tab>
            <Tab color="dark.text">Critical Priority</Tab>
            <Tab color="dark.text">In Progress</Tab>
            <Tab color="dark.text">Completed</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel p={0}>
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
                            <Wrench size={14} />
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
                          onChange={(e) => updateTaskStatus(task.task_name, e.target.value as 'pending' | 'in_progress' | 'completed')}
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
            </TabPanel>
            
            <TabPanel p={0}>
              <VStack spacing={4} align="stretch">
                {tasks.filter(task => task.priority === 'Critical').map((task, index) => (
                  <Box
                    key={index}
                    bg="red.900"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="red.400"
                    p={4}
                    className="card-hover"
                  >
                    <HStack spacing={2} mb={2}>
                      <Icon as={AlertTriangle} color="red.400" boxSize={5} />
                      <Text fontWeight="600" color="white" fontSize="lg">
                        {task.task_name}
                      </Text>
                    </HStack>
                    <Text color="red.100" fontSize="sm" mb={3}>
                      ⚠️ Critical priority task requiring immediate attention
                    </Text>
                    <HStack spacing={4} fontSize="sm" color="red.200">
                      <HStack spacing={1}>
                        <Clock size={14} />
                        <Text>{task.estimated_time}h</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <DollarSign size={14} />
                        <Text>${task.cost_estimate}</Text>
                      </HStack>
                    </HStack>
                    <Button
                      size="sm"
                      mt={3}
                      bg="red.500"
                      _hover={{ bg: 'red.600' }}
                      onClick={() => openTaskDetails(task)}
                    >
                      View Details
                    </Button>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            
            <TabPanel p={0}>
              <VStack spacing={4} align="stretch">
                {tasks.filter(task => taskStatus[task.task_name] === 'in_progress').map((task, index) => (
                  <Box
                    key={index}
                    bg="blue.900"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="blue.400"
                    p={4}
                    className="card-hover"
                  >
                    <HStack spacing={2} mb={2}>
                      <Icon as={Play} color="blue.400" boxSize={5} />
                      <Text fontWeight="600" color="white" fontSize="lg">
                        {task.task_name}
                      </Text>
                    </HStack>
                    <Text color="blue.100" fontSize="sm" mb={3}>
                      🔄 Task currently in progress
                    </Text>
                    <Progress value={50} colorScheme="blue" borderRadius="full" size="sm" mb={3} />
                    <Button
                      size="sm"
                      bg="blue.500"
                      _hover={{ bg: 'blue.600' }}
                      onClick={() => updateTaskStatus(task.task_name, 'completed')}
                    >
                      Mark Complete
                    </Button>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            
            <TabPanel p={0}>
              <VStack spacing={4} align="stretch">
                {tasks.filter(task => taskStatus[task.task_name] === 'completed').map((task, index) => (
                  <Box
                    key={index}
                    bg="green.900"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="green.400"
                    p={4}
                    className="card-hover"
                  >
                    <HStack spacing={2} mb={2}>
                      <Icon as={CheckCircle} color="green.400" boxSize={5} />
                      <Text fontWeight="600" color="white" fontSize="lg">
                        {task.task_name}
                      </Text>
                    </HStack>
                    <Text color="green.100" fontSize="sm" mb={3}>
                      ✅ Task completed successfully
                    </Text>
                    <Progress value={100} colorScheme="green" borderRadius="full" size="sm" />
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {/* Task Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="dark.card" borderColor="dark.border">
          <ModalHeader color="dark.text">
            <HStack spacing={3}>
              <Icon as={Brain} color="dark.accent" boxSize={6} />
              <Text>AI Task Details</Text>
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
                          <ListIcon as={Wrench} color="dark.accent" />
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
                      <Icon as={Shield} boxSize={4} style={{ display: 'inline', marginRight: '8px' }} />
                      Safety Notes
                    </Text>
                    <Text color="dark.muted" fontSize="sm">
                      {selectedTask.safety_notes}
                    </Text>
                  </Box>
                  
                  <Box flex={1}>
                    <Text fontWeight="600" color="dark.text" mb={2}>
                      <Icon as={AlertTriangle} boxSize={4} style={{ display: 'inline', marginRight: '8px' }} />
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
