// src/layouts/DashboardLayout.jsx
import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useDisclosure, Flex, Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainContentRef = useRef();

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Static sidebar for desktop */}
      <Sidebar
        variant="static"
        onClose={() => onClose}
      />
      
      {/* Mobile drawer sidebar */}
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        variant="drawer"
      />
      
      {/* Main content area */}
      <Box 
        ml={{ base: 0, md: 64 }} 
        transition="margin-left 0.3s"
        ref={mainContentRef}
      >
        {/* Header */}
        <Header onSidebarOpen={onOpen} />
        
        {/* Page Content */}
        <Box as="main" p={4} maxW="1600px" mx="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;