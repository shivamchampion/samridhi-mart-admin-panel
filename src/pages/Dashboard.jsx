// src/pages/Dashboard.jsx
import { useState } from 'react';
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
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatCard = ({ title, value, icon, change, isPositive, isNegative, color, suffix }) => {
  return (
    <Card 
      variant="outline"
      boxShadow="sm"
      borderRadius="lg"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
    >
      <CardBody p={6}>
        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">{title}</Text>
            <Flex mt={1} align="baseline">
              <StatNumber fontSize="2xl" fontWeight="bold">
                {value}
              </StatNumber>
              {suffix && <Text ml={1} fontSize="md" color="gray.500">{suffix}</Text>}
            </Flex>
            
            {change && (
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
          >
            <Icon as={icon} boxSize={6} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

// Sample data for charts
const salesData = [
  { name: 'Jan', current: 4000, previous: 3000 },
  { name: 'Feb', current: 3000, previous: 2800 },
  { name: 'Mar', current: 5000, previous: 4000 },
  { name: 'Apr', current: 2780, previous: 3000 },
  { name: 'May', current: 4890, previous: 3200 },
  { name: 'Jun', current: 3390, previous: 2800 },
  { name: 'Jul', current: 4490, previous: 3800 },
];

const categoryData = [
  { name: 'Category 1', value: 35 },
  { name: 'Category 2', value: 25 },
  { name: 'Category 3', value: 20 },
  { name: 'Category 4', value: 15 },
  { name: 'Category 5', value: 5 },
];

const COLORS = ['#3D5291', '#5470C6', '#91CC75', '#FFD666', '#FD7E52'];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const cardBg = useColorModeValue('white', 'gray.700');
  
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
    { name: 'Product A', category: 'Category 1', sold: 145 },
    { name: 'Product B', category: 'Category 2', sold: 132 },
    { name: 'Product C', category: 'Category 1', sold: 121 },
    { name: 'Product D', category: 'Category 3', sold: 98 },
  ];

  const zoneData = [
    { name: 'North Zone', beats: 7, retailers: 84, color: 'blue.500' },
    { name: 'South Zone', beats: 7, retailers: 56, color: 'green.500' },
    { name: 'East Zone', beats: 7, retailers: 63, color: 'yellow.500' },
    { name: 'West Zone', beats: 7, retailers: 72, color: 'purple.500' },
  ];

  const beatSchedule = [
    { name: 'Beat 1 - Larkui', salesman: 'John Doe', retailers: 12, status: 'In Progress', completion: 60 },
    { name: 'Beat 2 - Central', salesman: 'Jane Smith', retailers: 8, status: 'Pending', completion: 0 },
    { name: 'Beat 3 - Market', salesman: 'Robert Johnson', retailers: 15, status: 'Completed', completion: 100 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'green';
      case 'PENDING': return 'yellow';
      case 'CONFIRMED': return 'blue';
      case 'CREATED': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} mb={6}>
        <Heading as="h1" size="lg" mb={{ base: 4, md: 0 }}>Dashboard</Heading>
        
        <HStack spacing={2} overflow="auto" className="hide-scrollbar" py={1}>
          <Button 
            size="sm" 
            variant={timeRange === 'daily' ? 'solid' : 'outline'} 
            colorScheme={timeRange === 'daily' ? 'brand' : 'gray'}
            onClick={() => setTimeRange('daily')}
          >
            Daily
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === 'weekly' ? 'solid' : 'outline'} 
            colorScheme={timeRange === 'weekly' ? 'brand' : 'gray'} 
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === 'monthly' ? 'solid' : 'outline'} 
            colorScheme={timeRange === 'monthly' ? 'brand' : 'gray'} 
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </Button>
          <Button 
            size="sm" 
            variant={timeRange === 'yearly' ? 'solid' : 'outline'} 
            colorScheme={timeRange === 'yearly' ? 'brand' : 'gray'} 
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </Button>
        </HStack>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </SimpleGrid>

      {/* Charts Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Sales Overview Chart */}
        <Card variant="outline" boxShadow="sm" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justify="space-between" align="center">
              <Heading size="md">Sales Overview</Heading>
              <HStack spacing={4}>
                <HStack>
                  <Box h={3} w={3} borderRadius="full" bg="brand.500"></Box>
                  <Text fontSize="xs" color="gray.500">This Period</Text>
                </HStack>
                <HStack>
                  <Box h={3} w={3} borderRadius="full" bg="gray.300"></Box>
                  <Text fontSize="xs" color="gray.500">Previous Period</Text>
                </HStack>
              </HStack>
            </Flex>
          </CardHeader>
          <CardBody pt={2}>
            <Box h="300px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#d0d0d0"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#3D5291"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Category Distribution Chart */}
        <Card variant="outline" boxShadow="sm" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Sales by Category</Heading>
          </CardHeader>
          <CardBody>
            <Flex h="300px" w="100%" justify="center" align="center">
              <Box h="100%" w="60%">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <VStack spacing={2} align="start" ml={4} mt={4}>
                {categoryData.map((category, index) => (
                  <HStack key={index}>
                    <Box h={3} w={3} borderRadius="full" bg={COLORS[index % COLORS.length]}></Box>
                    <Text fontSize="sm">{category.name}</Text>
                  </HStack>
                ))}
              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Top Selling Products and Recent Orders */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} mb={8}>
        {/* Top Selling Products */}
        <Card variant="outline" boxShadow="sm" borderRadius="lg">
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Top Selling Products</Heading>
              <Link to="/products">
                <Button size="sm" variant="link" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                  View All
                </Button>
              </Link>
            </Flex>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {topProducts.map((product, index) => (
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
                  <Text fontWeight="medium">{product.sold} units</Text>
                </Flex>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Recent Orders - takes 2 column space */}
        <Card variant="outline" boxShadow="sm" borderRadius="lg" gridColumn={{ lg: 'span 2' }}>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Recent Orders</Heading>
              <Link to="/orders">
                <Button size="sm" variant="link" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
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
                  {recentOrders.map((order, index) => (
                    <Tr key={index}>
                      <Td color="brand.500" fontWeight="medium">{order.id}</Td>
                      <Td>{order.retailer}</Td>
                      <Td>{order.date}</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </Td>
                      <Td isNumeric fontWeight="medium">{order.amount}</Td>
                      <Td isNumeric>
                        <Link to={`/orders?id=${order.id}`}>
                          <Button size="sm" variant="ghost" colorScheme="brand">View</Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Zone Distribution */}
      <Card variant="outline" boxShadow="sm" borderRadius="lg" mb={8}>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md">Zone Distribution</Heading>
            <Link to="/zones">
              <Button size="sm" variant="link" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                Manage Zones
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-around" align="center">
            <Box h="300px" w={{ base: '100%', md: '50%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={zoneData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="retailers" fill="#3D5291" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <SimpleGrid columns={{ base: 2, md: 2 }} spacing={6} mt={{ base: 6, md: 0 }} maxW={{ md: '40%' }}>
              {zoneData.map((zone, index) => (
                <HStack key={index} spacing={3}>
                  <Box w={4} h={4} borderRadius="full" bg={zone.color} />
                  <Box>
                    <Text fontWeight="medium">{zone.name}</Text>
                    <Text fontSize="sm" color="gray.500">{zone.retailers} retailers</Text>
                    <Text fontSize="sm" color="gray.500">{zone.beats} beats</Text>
                  </Box>
                </HStack>
              ))}
            </SimpleGrid>
          </Flex>
        </CardBody>
      </Card>

      {/* Today's Beat Schedule */}
      <Card variant="outline" boxShadow="sm" borderRadius="lg">
        <CardHeader>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FiCalendar} color="brand.500" />
              <Heading size="md">Today's Beat Schedule</Heading>
            </HStack>
            <Link to="/beats">
              <Button size="sm" variant="link" colorScheme="brand" rightIcon={<FiExternalLink size={14} />}>
                View All Beats
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text mb={4} fontWeight="medium">Wednesday - Order Collection Day</Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {beatSchedule.map((beat, index) => (
              <Card key={index} variant="outline" size="sm">
                <CardBody>
                  <Flex justify="space-between" mb={2}>
                    <Text fontWeight="medium">{beat.name}</Text>
                    <Badge 
                      colorScheme={
                        beat.status === 'Completed' ? 'green' : 
                        beat.status === 'In Progress' ? 'blue' : 'yellow'
                      }
                    >
                      {beat.status}
                    </Badge>
                  </Flex>
                  <Text fontSize="sm" color="gray.600">Salesman: {beat.salesman}</Text>
                  <Text fontSize="sm" color="gray.600">Retailers: {beat.retailers}</Text>
                  <Box mt={3}>
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
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Dashboard;