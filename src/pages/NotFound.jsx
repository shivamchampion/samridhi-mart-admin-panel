// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Container,
  Flex,
  Image,
} from '@chakra-ui/react';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import { Logo } from '../components/Logo';

const NotFound = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  
  return (
    <Box minH="100vh" bg={bgColor} py={10} px={6}>
      <Container maxW="lg">
        <VStack spacing={8} textAlign="center">
          <Logo size="lg" />
          
          <Box>
            <Heading 
              display="inline-block"
              as="h1"
              fontSize="9xl"
              bgGradient="linear(to-r, brand.400, brand.600)"
              backgroundClip="text"
              fontWeight="extrabold"
              lineHeight="1"
            >
              404
            </Heading>
            
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              mt={3} 
              mb={2}
            >
              Page Not Found
            </Text>
            
            <Text color={'gray.500'} mb={6}>
              The page you're looking for doesn't exist or has been moved.
            </Text>
            
            <Flex justifyContent="center" gap={4} flexWrap="wrap">
              <Button
                as={Link}
                to="/"
                colorScheme="brand"
                leftIcon={<FiHome />}
              >
                Return to Dashboard
              </Button>
              
              <Button
                as="a"
                href="javascript:history.back()"
                variant="outline"
                colorScheme="brand"
                leftIcon={<FiArrowLeft />}
              >
                Go Back
              </Button>
            </Flex>
          </Box>
          
          <Box mt={10}>
            <Image
              src="/404-illustration.svg"
              alt="404 Illustration"
              maxW="400px"
              fallback={
                <Box 
                  height="200px" 
                  width="400px" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  bg="gray.100" 
                  borderRadius="md"
                >
                  <Text color="gray.500">Illustration not found</Text>
                </Box>
              }
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default NotFound;