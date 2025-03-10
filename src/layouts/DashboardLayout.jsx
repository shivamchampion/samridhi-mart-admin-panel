// src/layouts/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen] = useState(true); // State to track sidebar visibility for desktop

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Sidebar 
        onClose={onClose} 
        isOpen={isOpen} 
        variant="drawer" 
      />
      <Sidebar
        onClose={onClose}
        isOpen={true}
        variant="sidebar"
      />
      <Box ml={{ base: 0, md: '64' }}>
        <Header 
          onSidebarOpen={onOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <Box as="main" p={6}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;