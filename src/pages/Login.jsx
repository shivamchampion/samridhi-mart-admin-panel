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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const navigate = useNavigate();
  const { login, error: authContextError } = useAuth();
  const logoSize = useBreakpointValue({ base: 'md', md: 'lg' });

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
      
      // Navigate to dashboard on successful login
      navigate('/');
    } catch (loginError) {
      console.error('Login failed:', loginError);
      setLocalError(loginError.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      backgroundImage="url('/pattern-bg.png')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={{ base: "95%", sm: "400px" }}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'xl'}
          p={8}
          borderRadius="xl"
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Stack align={'center'} mb={6}>
            <Image src="/logo-bg.png" alt="Samridhi Mart" h="60px" mb={3} />
            <Heading fontSize={'2xl'} color="brand.500">Admin Login</Heading>
            <Text fontSize={'md'} color={'gray.600'} align="center">
              Sign in to manage your distribution system
            </Text>
          </Stack>

          {(localError || authContextError) && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {localError || authContextError}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="brand.500"
                  placeholder="your-email@example.com"
                  bg="white"
                  borderColor="gray.300"
                  boxShadow="sm"
                  _hover={{ borderColor: "gray.400" }}
                />
              </FormControl>
              
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    focusBorderColor="brand.500"
                    placeholder="Enter your password"
                    bg="white"
                    borderColor="gray.300"
                    boxShadow="sm"
                    _hover={{ borderColor: "gray.400" }}
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
              
              <Stack spacing={6}>
                <Text
                  align={'right'}
                  color={'brand.500'}
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Forgot password?
                </Text>
                
                <Button
                  type="submit"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{ bg: 'brand.600' }}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  size="lg"
                  fontWeight="500"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;