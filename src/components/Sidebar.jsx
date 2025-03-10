// src/components/Sidebar.jsx
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Collapse,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Badge,
  Image,
  Text,
  Tooltip,
  Divider,
  Button,
  useToken,
} from '@chakra-ui/react';
import {
  FiHome,
  FiBox,
  FiTag,
  FiShoppingBag,
  FiBriefcase,
  FiFileText,
  FiMap,
  FiMapPin,
  FiUsers,
  FiUser,
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiSettings,
  FiHelpCircle,
} from 'react-icons/fi';

// NavItem component for sidebar menu items
const NavItem = ({ icon, children, isActive, hasSubmenu, isOpen, onToggle, ...rest }) => {
  const [bgBrand50] = useToken('colors', ['brand.50']);
  
  return (
    <Box my={1} mx={2}>
      <Flex
        align="center"
        px={4}
        py={3}
        cursor="pointer"
        borderRadius="xl"
        role="group"
        fontWeight={isActive ? "600" : "normal"}
        bg={isActive ? "brand.50" : "transparent"}
        color={isActive ? "brand.600" : "gray.700"}
        _hover={{
          bg: 'gray.100',
          transform: 'translateX(4px)',
        }}
        transition="all 0.2s"
        onClick={hasSubmenu ? onToggle : undefined}
        position="relative"
        boxShadow={isActive ? `0 4px 12px -4px ${bgBrand50}` : 'none'}
        {...rest}
      >
        {isActive && (
          <Box
            position="absolute"
            left="0"
            top="50%"
            transform="translateY(-50%)"
            width="4px"
            height="60%"
            bg="brand.500"
            borderRadius="full"
          />
        )}
        
        {icon && (
          <Icon
            mr={3}
            fontSize="18px"
            as={icon}
            color={isActive ? "brand.500" : "gray.500"}
            _groupHover={{
              color: "brand.500",
            }}
            transition="all 0.2s"
          />
        )}
        <Box fontSize="sm" flex="1">{children}</Box>
        {hasSubmenu && (
          <Icon
            as={isOpen ? FiChevronDown : FiChevronRight}
            ml="auto"
            fontSize="16px"
            transition="all 0.3s"
            transform={isOpen ? "rotate(0deg)" : "rotate(0deg)"}
            color="gray.500"
          />
        )}
      </Flex>
    </Box>
  );
};

// SubNavItem component for submenu items
const SubNavItem = ({ children, isActive, ...rest }) => {
  return (
    <Link style={{ textDecoration: 'none' }} {...rest}>
      <Flex
        align="center"
        pl={12}
        pr={4}
        py={2.5}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontWeight={isActive ? "600" : "normal"}
        bg={isActive ? "brand.50" : "transparent"}
        color={isActive ? "brand.600" : "gray.600"}
        _hover={{
          bg: 'gray.100',
          color: 'brand.500',
          transform: 'translateX(4px)',
        }}
        transition="all 0.2s"
        fontSize="sm"
        position="relative"
      >
        {isActive && (
          <Box
            position="absolute"
            left="6px"
            top="50%"
            transform="translateY(-50%)"
            width="2px"
            height="60%"
            bg="brand.400"
            borderRadius="full"
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// Sidebar component
const Sidebar = ({ isOpen, onClose, variant = "drawer" }) => {
  const location = useLocation();
  
  // Set up state for tracking opened submenus
  const [openSubmenus, setOpenSubmenus] = useState({
    inventory: false,
    distribution: false,
    users: false,
  });

  // Check active route
  const isActiveRoute = (path) => location.pathname === path;
  const isActiveSubmenu = (paths) => paths.some(path => location.pathname === path);

  // Toggle submenu open/closed
  const toggleSubmenu = (menu) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  // Effect to open submenu of active item
  useEffect(() => {
    if (isActiveSubmenu(['/products', '/categories', '/brands', '/purchase-bills'])) {
      setOpenSubmenus(prev => ({ ...prev, inventory: true }));
    }
    if (isActiveSubmenu(['/zones', '/beats'])) {
      setOpenSubmenus(prev => ({ ...prev, distribution: true }));
    }
    if (isActiveSubmenu(['/distributors', '/salesmen', '/retailers'])) {
      setOpenSubmenus(prev => ({ ...prev, users: true }));
    }
  }, [location.pathname]);

  // Define menu items
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: FiHome,
    },
    { 
      name: 'Inventory',
      icon: FiBox,
      submenuKey: 'inventory',
      submenu: [
        { name: 'Products', path: '/products' },
        { name: 'Categories', path: '/categories' },
        { name: 'Brands', path: '/brands' },
        { name: 'Purchase Bills', path: '/purchase-bills' },
      ]
    },
    { 
      name: 'Distribution',
      icon: FiMap,
      submenuKey: 'distribution',
      submenu: [
        { name: 'Zones', path: '/zones' },
        { name: 'Beats', path: '/beats' },
      ]
    },
    { 
      name: 'Users',
      icon: FiUsers,
      submenuKey: 'users',
      submenu: [
        { name: 'Distributors', path: '/distributors' },
        { name: 'Salesmen', path: '/salesmen' },
        { name: 'Retailers', path: '/retailers' },
      ]
    },
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: FiShoppingBag,
      badge: '12',
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: FiBarChart2,
    },
  ];

  // Sidebar contents
  const SidebarContent = () => (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      w="260px"
      pos="fixed"
      h="full"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '24px',
        },
      }}
      boxShadow="md"
      borderRight="1px"
      borderColor="gray.100"
    >
      {/* Logo in Sidebar */}
      <Box 
        bgGradient="linear(to-r, brand.600, brand.500)"
        h="64px" 
        w="100%"
        position="sticky"
        top="0"
        zIndex="1"
      >
        <Flex 
          h="100%" 
          alignItems="center" 
          justifyContent="center"
        >
          <Box 
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image 
              src="/logo.png" 
              alt="Samridhi Mart Logo" 
              height="34px" 
              objectFit="contain"
              filter="brightness(1.2)"
            />
          </Box>
        </Flex>
      </Box>

      {/* Navigation Menu */}
      <Box pt={5} pb={8}>
        <Text px={6} mb={2} fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase">
          Main Menu
        </Text>
        
        {menuItems.map((item) => (
          <Box key={item.name}>
            {item.submenu ? (
              <>
                <Tooltip 
                  label={item.name} 
                  placement="right" 
                  hasArrow 
                  openDelay={500}
                  display={{ base: 'none', md: 'block' }}
                >
                  <Box>
                    <NavItem
                      icon={item.icon}
                      isActive={isActiveSubmenu(item.submenu.map(sub => sub.path))}
                      hasSubmenu={true}
                      isOpen={openSubmenus[item.submenuKey]}
                      onToggle={() => toggleSubmenu(item.submenuKey)}
                    >
                      {item.name}
                    </NavItem>
                  </Box>
                </Tooltip>
                
                <Collapse in={openSubmenus[item.submenuKey]} animateOpacity>
                  <Box mt={1} mb={2}>
                    {item.submenu.map((subItem) => (
                      <Tooltip 
                        key={subItem.path}
                        label={subItem.name} 
                        placement="right" 
                        hasArrow 
                        openDelay={500}
                        display={{ base: 'none', md: 'block' }}
                      >
                        <Box>
                          <SubNavItem
                            to={subItem.path}
                            isActive={isActiveRoute(subItem.path)}
                          >
                            {subItem.name}
                          </SubNavItem>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Collapse>
              </>
            ) : (
              <Tooltip 
                label={item.name} 
                placement="right" 
                hasArrow 
                openDelay={500}
                display={{ base: 'none', md: 'block' }}
              >
                <Box>
                  <Link to={item.path} style={{ textDecoration: 'none' }}>
                    <NavItem 
                      key={item.name}
                      icon={item.icon}
                      isActive={isActiveRoute(item.path)}
                    >
                      <Flex align="center" justify="space-between" width="100%">
                        <Box>{item.name}</Box>
                        {item.badge && (
                          <Badge 
                            colorScheme="red" 
                            borderRadius="full" 
                            fontSize="xs" 
                            px={2}
                            animation="pulse 2s infinite"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Flex>
                    </NavItem>
                  </Link>
                </Box>
              </Tooltip>
            )}
          </Box>
        ))}

        <Divider my={4} borderColor="gray.200" />
        
        <Text px={6} mb={2} fontSize="xs" fontWeight="medium" color="gray.500" textTransform="uppercase">
          Help & Settings
        </Text>

        <NavItem icon={FiSettings}>
          Settings
        </NavItem>
        
        <NavItem icon={FiHelpCircle}>
          Help & Support
        </NavItem>
        
        {/* System Status */}
        <Box px={4} py={4} mt={10} mx={3} bg="gray.50" borderRadius="lg">
          <Flex align="center" mb={2}>
            <Box w="2" h="2" borderRadius="full" bg="green.400" mr={2}></Box>
            <Text fontSize="xs" fontWeight="medium">System Status: Online</Text>
          </Flex>
          <Text fontSize="xs" color="gray.500">Last synced: Today, 10:24 AM</Text>
          <Button 
            size="sm"
            mt={2}
            w="full"
            variant="outline"
            colorScheme="brand"
            fontSize="xs"
            leftIcon={<Icon as={FiFileText} fontSize="xs" />}
          >
            View Report
          </Button>
        </Box>
      </Box>
    </Box>
  );

  // Return as drawer on mobile, or static sidebar on desktop
  if (variant === "drawer") {
    return (
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent maxW="260px">
          <DrawerCloseButton color="white" top="20px" right="8px" zIndex="overlay" />
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      w="260px"
      pos="fixed"
      h="100vh"
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;