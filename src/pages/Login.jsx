// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  useColorModeValue,
  Alert,
  AlertIcon,
  Image,
  useBreakpointValue,
  Divider,
  HStack,
  Icon,
  Container,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, CheckIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiLock, FiMail } from 'react-icons/fi';

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionStack = motion(Stack);
const MotionHeading = motion(Heading);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const { login, error: authContextError } = useAuth();
  const logoSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const toast = useToast();

  // Log any authentication errors
  useEffect(() => {
    if (authContextError) {
      console.error('Auth Context Error:', authContextError);
      setLocalError(authContextError);
    }
  }, [authContextError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');
    
    try {
      console.log('Attempting login with:', email);
      
      // Use the login method from AuthContext
      const result = await login(email, password);
      
      console.log('Login result:', result);
      
      // Show success toast
      toast({
        title: 'Login Successful',
        description: 'Welcome to Samridhi Mart!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      
      // Navigate to dashboard on successful login
      navigate('/');
    } catch (loginError) {
      console.error('Login failed:', loginError);
      setLocalError(loginError.message || 'Login failed');
      
      // Show error toast
      toast({
        title: 'Login Failed',
        description: loginError.message || 'Please check your credentials and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
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

  const bgGradient = "linear-gradient(135deg, #f5f7ff 0%, #e9eeff 100%)";
  const cardBg = useColorModeValue('white', 'gray.800');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  
  return (
    <MotionBox
      minH={'100vh'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      backgroundImage={`url('/pattern-bg.png'), ${bgGradient}`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Container maxW="container.xl" py={{ base: 6, md: 12 }} px={{ base: 4, md: 8 }}>
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="center"
          align="center"
          overflow="hidden"
          borderRadius={{ base: "2xl", md: "3xl" }}
          boxShadow="2xl"
          bg={cardBg}
        >
          {/* Left Side - Login Form */}
          <MotionFlex 
            flex={1} 
            direction="column" 
            p={{ base: 8, md: 10 }}
            width={{ base: "95%", sm: "100%", md: "50%" }}
            variants={itemVariants}
          >
            <MotionStack align={'center'} mb={8} variants={itemVariants}>
              <MotionBox 
                mb={4} 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/logo-bg.png" alt="Samridhi Mart" h="70px" />
              </MotionBox>
              <MotionHeading 
                fontSize={'2xl'} 
                color="brand.500" 
                variants={itemVariants}
              >
                Admin Login
              </MotionHeading>
              <Text fontSize={'md'} color={'gray.600'} align="center">
                Sign in to manage your distribution system
              </Text>
            </MotionStack>

            {(localError || authContextError) && (
              <MotionBox 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert status="error" mb={6} borderRadius="lg">
                  <AlertIcon />
                  {localError || authContextError}
                </Alert>
              </MotionBox>
            )}

            <MotionBox
              as="form" 
              onSubmit={handleLogin}
              variants={itemVariants}
            >
              <Stack spacing={5}>
                <FormControl id="email" isRequired>
                  <FormLabel display="flex" alignItems="center">
                    <Icon as={FiMail} mr={2} color="gray.500" />
                    Email address
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      focusBorderColor="brand.500"
                      placeholder="your-email@example.com"
                      bg="white"
                      size="lg"
                      borderColor="gray.300"
                      boxShadow="sm"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{ boxShadow: "0 0 0 3px rgba(61, 82, 145, 0.2)" }}
                    />
                  </InputGroup>
                </FormControl>
                
                <FormControl id="password" isRequired>
                  <FormLabel display="flex" alignItems="center">
                    <Icon as={FiLock} mr={2} color="gray.500" />
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      focusBorderColor="brand.500"
                      placeholder="Enter your password"
                      bg="white"
                      size="lg"
                      borderColor="gray.300"
                      boxShadow="sm"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{ boxShadow: "0 0 0 3px rgba(61, 82, 145, 0.2)" }}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword(!showPassword)}
                        size='sm'
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                
                <Flex justify="space-between" align="center">
                  <HStack>
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="form-checkbox"
                    />
                    <Text fontSize="sm" color="gray.600">Remember me</Text>
                  </HStack>
                  
                  <Text
                    align={'right'}
                    color={'brand.500'}
                    fontSize="sm"
                    cursor="pointer"
                    _hover={{ textDecoration: 'underline' }}
                    fontWeight="medium"
                  >
                    Forgot password?
                  </Text>
                </Flex>
                
                <Button
                  type="submit"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{ 
                    bg: 'brand.600',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  size="lg"
                  fontSize="md"
                  fontWeight="500"
                  h="54px"
                  mt={4}
                  boxShadow="md"
                  _active={{
                    bg: 'brand.700',
                    transform: 'translateY(0)',
                    boxShadow: 'sm',
                  }}
                  transition="all 0.2s"
                >
                  Sign in
                </Button>

                <Flex align="center" justify="center" mt={4}>
                  <Text fontSize="sm" color="gray.500">
                    Demo credentials: admin@samridhimart.com / admin123
                  </Text>
                </Flex>
              </Stack>
            </MotionBox>
          </MotionFlex>
          
          {/* Right Side - Image/Information */}
          <MotionBox
            flex={1}
            bg="brand.500"
            color="white"
            p={{ base: 0, md: 10 }}
            display={{ base: 'none', md: 'flex' }}
            flexDirection="column"
            justifyContent="center"
            height="600px"
            position="relative"
            overflow="hidden"
            variants={itemVariants}
            bgGradient="linear(to-br, brand.500, brand.700)"
            borderRightRadius="3xl"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              opacity="0.1"
              backgroundImage="url('/pattern-overlay.png')"
              backgroundSize="cover"
              backgroundPosition="center"
            />
            
            <VStack spacing={8} position="relative" zIndex="1" align="flex-start" px={4}>
              <Heading size="2xl" fontWeight="bold" lineHeight="shorter">
                Welcome to Samridhi Mart
              </Heading>
              
              <Text fontSize="lg" opacity="0.9">
                Log in to access your distribution management system and grow your business.
              </Text>
              
              <Divider borderColor="whiteAlpha.300" />
              
              <VStack spacing={4} align="flex-start" width="100%">
                <HStack spacing={4}>
                  <Flex 
                    align="center" 
                    justify="center" 
                    bg="whiteAlpha.200" 
                    w="40px" 
                    h="40px" 
                    borderRadius="md"
                  >
                    <CheckIcon boxSize={4} />
                  </Flex>
                  <Text>Manage your inventory and track stock</Text>
                </HStack>
                
                <HStack spacing={4}>
                  <Flex 
                    align="center" 
                    justify="center" 
                    bg="whiteAlpha.200" 
                    w="40px" 
                    h="40px" 
                    borderRadius="md"
                  >
                    <CheckIcon boxSize={4} />
                  </Flex>
                  <Text>Track orders and monitor sales</Text>
                </HStack>
                
                <HStack spacing={4}>
                  <Flex 
                    align="center" 
                    justify="center" 
                    bg="whiteAlpha.200" 
                    w="40px" 
                    h="40px" 
                    borderRadius="md"
                  >
                    <CheckIcon boxSize={4} />
                  </Flex>
                  <Text>Manage retailers and distributors</Text>
                </HStack>
              </VStack>
            </VStack>
            
            <Text position="absolute" bottom="4" right="4" fontSize="sm" opacity="0.7">
              © 2023 Samridhi Mart. All rights reserved.
            </Text>
          </MotionBox>
        </Flex>
      </Container>
    </MotionBox>
  );
};

export default Login;