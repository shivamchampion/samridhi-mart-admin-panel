// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  Heading,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  VStack,
  Progress,
  useColorModeValue,
  Select,
  Avatar,
  Skeleton,
  useBreakpointValue,
  Alert,
  AlertIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiPackage,
  FiUsers,
  FiTrendingUp,
  FiCalendar,
  FiBarChart,
  FiMap,
  FiTag,
  FiBriefcase,
  FiExternalLink,
  FiMoreHorizontal,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiArrowRight,
  FiInfo,
  FiActivity,
  FiLayers,
  FiDownload,
  FiEye,
  FiAlertCircle,
} from 'react-icons/fi';
import { ChevronDownIcon, InfoIcon } from '@chakra-ui/icons';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionStat = motion(Stat);
const MotionCard = motion(Card);

// Fixed StatCard component for Dashboard.jsx
const StatCard = ({ title, value, icon, change, isPositive, color, suffix, isLoading = false }) => {
  return (
    <MotionCard 
      variant="outline"
      boxShadow="sm"
      borderRadius="xl"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <CardBody p={6}>
        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">{title}</Text>
            {isLoading ? (
              <Skeleton height="36px" width="100px" my={1} />
            ) : (
              <Flex mt={1} align="baseline">
                <Stat>
                  <StatNumber fontSize="2xl" fontWeight="bold">
                    {value}
                  </StatNumber>
                </Stat>
                {suffix && <Text ml={1} fontSize="md" color="gray.500">{suffix}</Text>}
              </Flex>
            )}
            
            {change && (
              <Stat>
                <StatHelpText mt={1}>
                  <Flex align="center">
                    <StatArrow type={isPositive ? 'increase' : 'decrease'} />
                    <Text fontWeight="medium" color={isPositive ? 'green.500' : 'red.500'}>
                      {change}
                    </Text>
                    <Text ml={1} color="gray.500" fontSize="sm">
                      from last period
                    </Text>
                  </Flex>
                </StatHelpText>
              </Stat>
            )}
          </Box>
          
          <Flex 
            align="center" 
            justify="center" 
            h={12} 
            w={12} 
            bg={`${color}.100`} 
            color={`${color}.500`}
            borderRadius="lg"
            boxShadow="sm"
          >
            <Icon as={icon} boxSize={6} />
          </Flex>
        </Flex>
      </CardBody>
    </MotionCard>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [isLoading, setIsLoading] = useState(true);
  const cardBg = useColorModeValue('white', 'gray.700');
  const chartGridColor = useColorModeValue('#f5f5f5', '#2D3748');
  const tooltipBg = useColorModeValue('white', 'gray.700');
  const statCardSize = useBreakpointValue({ base: "full", md: "45%", lg: "30%" });
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data - would be fetched from API in real implementation
  const stats = [
    {
      title: 'Total Orders',
      value: '512',
      change: '12%',
      isPositive: true,
      icon: FiShoppingBag,
      color: 'blue'
    },
    {
      title: 'Products',
      value: '128',
      change: '8%',
      isPositive: true,
      icon: FiPackage,
      color: 'green'
    },
    {
      title: 'Retailers',
      value: '432',
      change: '15%',
      isPositive: true,
      icon: FiUsers,
      color: 'purple'
    },
    {
      title: 'Categories',
      value: '5',
      change: '1',
      isPositive: true,
      icon: FiTag,
      color: 'brand'
    },
    {
      title: 'Brands',
      value: '5',
      change: '2',
      isPositive: true,
      icon: FiBriefcase,
      color: 'pink'
    },
    {
      title: 'Total Revenue',
      value: '₹1,24,500',
      change: '9%',
      isPositive: true,
      icon: FiTrendingUp,
      color: 'orange'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', retailer: 'Shop 1', date: '2023-03-08', status: 'DELIVERED', amount: '₹2,500' },
    { id: 'ORD-002', retailer: 'Shop 2', date: '2023-03-07', status: 'PENDING', amount: '₹1,850' },
    { id: 'ORD-003', retailer: 'Shop 3', date: '2023-03-07', status: 'CONFIRMED', amount: '₹3,200' },
    { id: 'ORD-004', retailer: 'Shop 4', date: '2023-03-06', status: 'DELIVERED', amount: '₹1,400' },
    { id: 'ORD-005', retailer: 'Shop 5', date: '2023-03-06', status: 'CREATED', amount: '₹2,100' },
  ];

  const topProducts = [
    { name: 'Product A', category: 'Category 1', sold: 145, trend: 'up', image: '' },
    { name: 'Product B', category: 'Category 2', sold: 132, trend: 'up', image: '' },
    { name: 'Product C', category: 'Category 1', sold: 121, trend: 'down', image: '' },
    { name: 'Product D', category: 'Category 3', sold: 98, trend: 'up', image: '' },
  ];

  const zoneData = [
    { name: 'North Zone', beats: 7, retailers: 84, color: 'blue.500', growth: 12 },
    { name: 'South Zone', beats: 7, retailers: 56, color: 'green.500', growth: 8 },
    { name: 'East Zone', beats: 7, retailers: 63, color: 'yellow.500', growth: 5 },
    { name: 'West Zone', beats: 7, retailers: 72, color: 'purple.500', growth: 15 },
  ];

  const beatSchedule = [
    { name: 'Beat 1 - Larkui', salesman: 'John Doe', retailers: 12, status: 'In Progress', completion: 60 },
    { name: 'Beat 2 - Central', salesman: 'Jane Smith', retailers: 8, status: 'Pending', completion: 0 },
    { name: 'Beat 3 - Market', salesman: 'Robert Johnson', retailers: 15, status: 'Completed', completion: 100 },
  ];

  // More detailed sales data
  const salesData = [
    { name: 'Jan', current: 4000, previous: 3000, target: 3500 },
    { name: 'Feb', current: 3000, previous: 2800, target: 3200 },
    { name: 'Mar', current: 5000, previous: 4000, target: 4500 },
    { name: 'Apr', current: 2780, previous: 3000, target: 3300 },
    { name: 'May', current: 4890, previous: 3200, target: 4000 },
    { name: 'Jun', current: 3390, previous: 2800, target: 3600 },
    { name: 'Jul', current: 4490, previous: 3800, target: 4200 },
  ];

  const categoryData = [
    { name: 'Category 1', value: 35 },
    { name: 'Category 2', value: 25 },
    { name: 'Category 3', value: 20 },
    { name: 'Category 4', value: 15 },
    { name: 'Category 5', value: 5 },
  ];

  const COLORS = ['#3D5291', '#5470C6', '#91CC75', '#FFD666', '#FD7E52'];

  // Low stock alerts
  const lowStockAlerts = [
    { id: 'PROD001', name: 'Product A', current: 5, threshold: 10, status: 'critical' },
    { id: 'PROD008', name: 'Product H', current: 8, threshold: 15, status: 'warning' },
    { id: 'PROD012', name: 'Product L', current: 3, threshold: 10, status: 'critical' },
  ];

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'green';
      case 'PENDING': return 'yellow';
      case 'CONFIRMED': return 'blue';
      case 'CREATED': return 'gray';
      default: return 'gray';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getAlertColor = (status) => {
    return status === 'critical' ? 'red' : 'yellow';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150
      }
    }
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page Header */}
      <MotionFlex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        align={{ base: 'flex-start', md: 'center' }} 
        mb={8}
        variants={itemVariants}
      >
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <Heading 
            as="h1" 
            size="xl" 
            fontWeight="bold" 
            bgGradient="linear(to-r, brand.600, brand.400)" 
            bgClip="text"
          >
            Dashboard
          </Heading>
          <Badge 
            colorScheme="brand" 
            fontSize="sm" 
            borderRadius="full" 
            px={3} 
            py={1}
            display={{ base: 'none', md: 'flex' }}
          >
            Home
          </Badge>
        </HStack>
        
        <HStack spacing={4} alignItems="center">
          <Tooltip label="Refresh Data" hasArrow placement="top">
            <IconButton
              icon={<FiRefreshCw size={18} />}
              aria-label="Refresh Data"
              variant="ghost"
              colorScheme="gray"
              isLoading={isLoading}
            />
          </Tooltip>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              variant="outline"
              colorScheme="brand"
              size="md"
            >
              {timeRange === 'daily' ? 'Daily' : 
               timeRange === 'weekly' ? 'Weekly' : 
               timeRange === 'monthly' ? 'Monthly' : 'Yearly'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setTimeRange('daily')}>Daily</MenuItem>
              <MenuItem onClick={() => setTimeRange('weekly')}>Weekly</MenuItem>
              <MenuItem onClick={() => setTimeRange('monthly')}>Monthly</MenuItem>
              <MenuItem onClick={() => setTimeRange('yearly')}>Yearly</MenuItem>
            </MenuList>
          </Menu>
          
          <Tooltip label="Export Report" hasArrow placement="top">
            <Button
              leftIcon={<FiDownload size={16} />}
              colorScheme="brand"
              size="md"
              display={{ base: 'none', md: 'flex' }}
            >
              Export
            </Button>
          </Tooltip>
        </HStack>
      </MotionFlex>

      {/* Alert Section */}
      {lowStockAlerts.length > 0 && (
        <MotionBox 
          mb={8} 
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Alert 
            status="warning" 
            variant="subtle" 
            borderRadius="xl" 
            boxShadow="md"
          >
            <AlertIcon />
            <Flex direction={{ base: 'column', md: 'row' }} w="full" justify="space-between" align={{ base: 'flex-start', md: 'center' }}>
              <Text fontWeight="medium">
                {lowStockAlerts.length} products are running low on stock
              </Text>
              <HStack spacing={4} mt={{ base: 2, md: 0 }}>
                {lowStockAlerts.map((alert, idx) => (
                  <Badge 
                    key={idx} 
                    colorScheme={getAlertColor(alert.status)} 
                    borderRadius="full"
                    px={2}
                    py={1}
                    display={{ base: idx < 2 ? 'flex' : 'none', md: 'flex' }}
                  >
                    {alert.name}: {alert.current} left
                  </Badge>
                ))}
                <Button 
                  size="sm" 
                  colorScheme="brand" 
                  variant="outline"
                  rightIcon={<FiArrowRight size={14} />}
                >
                  View All
                </Button>
              </HStack>
            </Flex>
          </Alert>
        </MotionBox>
      )}

      {/* Stats Cards */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 3, xl: 3 }} 
        spacing={6} 
        mb={8}
      >
        {stats.map((stat, index) => (
          <MotionBox 
            key={index}
            variants={itemVariants}
            transition={{ delay: 0.1 * index }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              icon={stat.icon}
              color={stat.color}
              isLoading={isLoading}
            />
          </MotionBox>
        ))}
      </SimpleGrid>

      {/* Charts Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Sales Overview Chart */}
        <MotionCard 
          variant="outline" 
          boxShadow="sm" 
          borderRadius="xl"
          variants={itemVariants}
          transition={{ delay: 0.3 }}
          _hover={{ boxShadow: 'md' }}
        >
          <CardHeader pb={0}>
            <Flex justify="space-between" align="center">
              <Heading size="md">Sales Overview</Heading>
              <HStack spacing={4}>
                <Tooltip label="Current Period" placement="top" hasArrow>
                  <HStack>
                    <Box h={3} w={3} borderRadius="full" bg="brand.500"></Box>
                    <Text fontSize="xs" color="gray.500">Current</Text>
                  </HStack>
                </Tooltip>
                <Tooltip label="Previous Period" placement="top" hasArrow>
                  <HStack>
                    <Box h={3} w={3} borderRadius="full" bg="gray.300"></Box>
                    <Text fontSize="xs" color="gray.500">Previous</Text>
                  </HStack>
                </Tooltip>
                <Tooltip label="Target" placement="top" hasArrow>
                  <HStack>
                    <Box h={3} w={3} borderRadius="full" bg="green.400"></Box>
                    <Text fontSize="xs" color="gray.500">Target</Text>
                  </HStack>
                </Tooltip>
              </HStack>
            </Flex>
          </CardHeader>
          <CardBody pt={2}>
            <Box h="300px" w="100%">
              {isLoading ? (
                <Flex h="100%" align="center" justify="center">
                  <Skeleton height="100%" width="100%" borderRadius="md" />
                </Flex>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3D5291" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3D5291" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: useColorModeValue('#666', '#ccc') }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: useColorModeValue('#666', '#ccc') }} 
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: 'none', boxShadow: 'lg' }} 
                      formatter={(value) => [`₹${value}`, '']}
                    />
                    <Area
                      type="monotone"
                      dataKey="previous"
                      stroke="#d0d0d0"
                      strokeWidth={2}
                      fill="none"
                      dot={false}
                      activeDot={{ r: 6, fill: '#d0d0d0' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="current"
                      stroke="#3D5291"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorCurrent)"
                      dot={false}
                      activeDot={{ r: 8, strokeWidth: 0, fill: '#3D5291' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#38A169"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={{ r: 6, fill: '#38A169' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </Box>
          </CardBody>
        </MotionCard>

        {/* Category Distribution Chart */}
        <MotionCard 
          variant="outline" 
          boxShadow="sm" 
          borderRadius="xl"
          variants={itemVariants}
          transition={{ delay: 0.4 }}
          _hover={{ boxShadow: 'md' }}
        >
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Sales by Category</Heading>
              <Tooltip label="View Details" placement="top" hasArrow>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<FiInfo />}
                  aria-label="More Information"
                />
              </Tooltip>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex h="300px" w="100%" justify="center" align="center">
              {isLoading ? (
                <Flex h="100%" align="center" justify="center" w="100%">
                  <Skeleton height="200px" width="200px" borderRadius="full" />
                </Flex>
              ) : (
                <>
                  <Box h="100%" w="60%">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          innerRadius={40}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]} 
                              stroke={useColorModeValue('white', 'gray.800')}
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: 'none', boxShadow: 'lg' }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <VStack spacing={3} align="start" ml={4} mt={4}>
                    {categoryData.map((category, index) => (
                      <HStack key={index} spacing={3}>
                        <Box h={3} w={3} borderRadius="full" bg={COLORS[index % COLORS.length]}></Box>
                        <HStack>
                          <Text fontSize="sm" fontWeight="medium">{category.name}:</Text>
                          <Text fontSize="sm">{category.value}%</Text>
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </>
              )}
            </Flex>
          </CardBody>
        </MotionCard>
      </SimpleGrid>

      {/* Top Selling Products and Recent Orders */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={8}>
        {/* Top Selling Products */}
        <MotionCard 
          variant="outline" 
          boxShadow="sm" 
          borderRadius="xl"
          variants={itemVariants}
          transition={{ delay: 0.5 }}
          _hover={{ boxShadow: 'md' }}
        >
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Top Selling Products</Heading>
              <Link to="/products">
                <Button size="sm" variant="ghost" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                  View All
                </Button>
              </Link>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <Flex key={index} justify="space-between" align="center">
                    <HStack>
                      <Skeleton height="40px" width="40px" borderRadius="md" />
                      <VStack align="start" spacing={1}>
                        <Skeleton height="20px" width="120px" />
                        <Skeleton height="16px" width="80px" />
                      </VStack>
                    </HStack>
                    <Skeleton height="20px" width="60px" />
                  </Flex>
                ))
              ) : (
                topProducts.map((product, index) => (
                  <Flex key={index} justify="space-between" align="center">
                    <HStack>
                      <Flex 
                        align="center" 
                        justify="center" 
                        w={10} 
                        h={10} 
                        bg="gray.100" 
                        borderRadius="md" 
                        mr={3}
                      >
                        <Icon as={FiPackage} color="gray.500" boxSize={5} />
                      </Flex>
                      <Box>
                        <Text fontWeight="medium">{product.name}</Text>
                        <Text fontSize="sm" color="gray.500">{product.category}</Text>
                      </Box>
                    </HStack>
                    <HStack>
                      <Text fontWeight="medium">{product.sold} units</Text>
                      <Icon 
                        as={product.trend === 'up' ? FiTrendingUp : FiTrendingUp} 
                        color={product.trend === 'up' ? 'green.500' : 'red.500'} 
                        transform={product.trend === 'down' ? 'rotate(180deg)' : 'none'}
                      />
                    </HStack>
                  </Flex>
                ))
              )}
            </VStack>
          </CardBody>
        </MotionCard>

        {/* Recent Orders - takes 2 column space */}
        <MotionCard 
          variant="outline" 
          boxShadow="sm" 
          borderRadius="xl" 
          gridColumn={{ lg: 'span 2' }}
          variants={itemVariants}
          transition={{ delay: 0.6 }}
          _hover={{ boxShadow: 'md' }}
        >
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Recent Orders</Heading>
              <Link to="/orders">
                <Button size="sm" variant="ghost" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                  View All Orders
                </Button>
              </Link>
            </Flex>
          </CardHeader>
          <CardBody p={0}>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>Retailer</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                    <Th isNumeric>Amount</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <Tr key={index}>
                        <Td><Skeleton height="20px" width="80px" /></Td>
                        <Td><Skeleton height="20px" width="100px" /></Td>
                        <Td><Skeleton height="20px" width="80px" /></Td>
                        <Td><Skeleton height="20px" width="80px" borderRadius="full" /></Td>
                        <Td isNumeric><Skeleton height="20px" width="60px" /></Td>
                        <Td isNumeric><Skeleton height="30px" width="50px" /></Td>
                      </Tr>
                    ))
                  ) : (
                    recentOrders.map((order, index) => (
                      <Tr key={index} _hover={{ bg: 'gray.50' }} transition="background-color 0.2s">
                        <Td color="brand.500" fontWeight="medium">{order.id}</Td>
                        <Td>{order.retailer}</Td>
                        <Td>{order.date}</Td>
                        <Td>
                          <Badge colorScheme={getStatusColor(order.status)} borderRadius="full" px={2} py={1}>
                            {order.status}
                          </Badge>
                        </Td>
                        <Td isNumeric fontWeight="medium">{order.amount}</Td>
                        <Td isNumeric>
                          <Link to={`/orders?id=${order.id}`}>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              colorScheme="brand"
                              leftIcon={<FiEye size={14} />}
                            >
                              View
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </MotionCard>
      </SimpleGrid>

      {/* Zone Distribution */}
      <MotionCard 
        variant="outline" 
        boxShadow="sm" 
        borderRadius="xl" 
        mb={8}
        variants={itemVariants}
        transition={{ delay: 0.7 }}
        _hover={{ boxShadow: 'md' }}
      >
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md">Zone Distribution</Heading>
            <Link to="/zones">
              <Button size="sm" variant="ghost" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                Manage Zones
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-around" align="center">
            {isLoading ? (
              <>
                <Skeleton height="300px" width={{ base: '100%', md: '50%' }} />
                <SimpleGrid columns={{ base: 2, md: 2 }} spacing={6} mt={{ base: 6, md: 0 }} maxW={{ md: '40%' }}>
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} height="60px" />
                  ))}
                </SimpleGrid>
              </>
            ) : (
              <>
                <Box h="300px" w={{ base: '100%', md: '50%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={zoneData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: useColorModeValue('#666', '#ccc') }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: useColorModeValue('#666', '#ccc') }}
                      />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: 'none', boxShadow: 'lg' }} 
                      />
                      <defs>
                        <linearGradient id="colorZone" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3D5291" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3D5291" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <Bar 
                        dataKey="retailers" 
                        fill="url(#colorZone)" 
                        radius={[4, 4, 0, 0]} 
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                <SimpleGrid columns={{ base: 2, md: 2 }} spacing={6} mt={{ base: 6, md: 0 }} maxW={{ md: '40%' }}>
                  {zoneData.map((zone, index) => (
                    <HStack 
                      key={index} 
                      spacing={3} 
                      bg="white" 
                      p={3} 
                      borderRadius="lg" 
                      boxShadow="sm" 
                      borderLeft="4px solid" 
                      borderLeftColor={zone.color}
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                      transition="all 0.2s"
                    >
                      <Box>
                        <Text fontWeight="medium">{zone.name}</Text>
                        <HStack spacing={1}>
                          <Text fontSize="sm" color="gray.500">{zone.retailers} retailers</Text>
                          <Text fontSize="sm" color="gray.500">•</Text>
                          <Text fontSize="sm" color="gray.500">{zone.beats} beats</Text>
                        </HStack>
                        <Badge 
                          colorScheme="green" 
                          variant="subtle" 
                          fontSize="xs" 
                          mt={1}
                        >
                          +{zone.growth}% growth
                        </Badge>
                      </Box>
                    </HStack>
                  ))}
                </SimpleGrid>
              </>
            )}
          </Flex>
        </CardBody>
      </MotionCard>

      {/* Today's Beat Schedule */}
      <MotionCard 
        variant="outline" 
        boxShadow="sm" 
        borderRadius="xl"
        variants={itemVariants}
        transition={{ delay: 0.8 }}
        _hover={{ boxShadow: 'md' }}
      >
        <CardHeader>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FiCalendar} color="brand.500" />
              <Heading size="md">Today's Beat Schedule</Heading>
            </HStack>
            <Link to="/beats">
              <Button size="sm" variant="ghost" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                View All Beats
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text mb={6} fontWeight="medium" color="gray.700">
            <HStack spacing={1}>
              <Icon as={FiClock} color="brand.500" />
              <Text>Wednesday - Order Collection Day</Text>
            </HStack>
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <Skeleton key={index} height="140px" borderRadius="lg" />
              ))
            ) : (
              beatSchedule.map((beat, index) => (
                <Card 
                  key={index} 
                  variant="outline" 
                  borderRadius="lg" 
                  boxShadow="sm"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                  borderTop="4px solid"
                  borderTopColor={
                    beat.status === 'Completed' ? 'green.400' : 
                    beat.status === 'In Progress' ? 'blue.400' : 'yellow.400'
                  }
                >
                  <CardBody>
                    <Flex justify="space-between" mb={2}>
                      <Text fontWeight="medium">{beat.name}</Text>
                      <Badge 
                        colorScheme={
                          beat.status === 'Completed' ? 'green' : 
                          beat.status === 'In Progress' ? 'blue' : 'yellow'
                        }
                        borderRadius="full"
                        px={2}
                        py={0.5}
                      >
                        {beat.status}
                      </Badge>
                    </Flex>
                    
                    <HStack mt={3} spacing={4}>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="xs" color="gray.500">Salesman</Text>
                        <HStack>
                          <Avatar size="xs" name={beat.salesman} bg="brand.500" color="white" />
                          <Text fontSize="sm" fontWeight="medium">{beat.salesman}</Text>
                        </HStack>
                      </VStack>
                      
                      <VStack align="start" spacing={1}>
                        <Text fontSize="xs" color="gray.500">Retailers</Text>
                        <HStack>
                          <Icon as={FiUsers} size="sm" color="gray.500" />
                          <Text fontSize="sm" fontWeight="medium">{beat.retailers}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    
                    <Box mt={4}>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="xs" color="gray.500">Completion</Text>
                        <Text fontSize="xs" fontWeight="medium">{beat.completion}%</Text>
                      </HStack>
                      <Progress 
                        value={beat.completion} 
                        size="sm" 
                        colorScheme={
                          beat.status === 'Completed' ? 'green' : 
                          beat.status === 'In Progress' ? 'blue' : 'yellow'
                        } 
                        borderRadius="full"
                      />
                    </Box>
                  </CardBody>
                </Card>
              ))
            )}
          </SimpleGrid>
        </CardBody>
      </MotionCard>
    </MotionBox>
  );
};

export default Dashboard;