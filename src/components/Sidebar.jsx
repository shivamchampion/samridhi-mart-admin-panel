// src/components/Sidebar.jsx
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Collapse,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Badge,
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
} from 'react-icons/fi';
import { Logo } from './Logo';

// NavItem component for sidebar menu items
const NavItem = ({ icon, children, isActive, hasSubmenu, isOpen, onToggle, ...rest }) => {
  return (
    <Box my={1} mx={2}>
      <Flex
        align="center"
        px={4}
        py={3}
        cursor="pointer"
        borderRadius="md"
        role="group"
        fontWeight={isActive ? "600" : "normal"}
        bg={isActive ? "brand.50" : "transparent"}
        color={isActive ? "brand.500" : "gray.700"}
        _hover={{
          bg: 'gray.100',
        }}
        transition="all 0.2s"
        onClick={hasSubmenu ? onToggle : undefined}
        {...rest}
      >
        {icon && (
          <Icon
            mr={3}
            fontSize="18px"
            as={icon}
            color={isActive ? "brand.500" : "gray.500"}
            _groupHover={{
              color: "brand.500",
            }}
          />
        )}
        <Text fontSize="sm">{children}</Text>
        {hasSubmenu && (
          <Icon
            as={isOpen ? FiChevronDown : FiChevronRight}
            ml="auto"
            fontSize="16px"
            transition="all 0.2s"
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
        py={2}
        borderRadius="md"
        role="group"
        cursor="pointer"
        fontWeight={isActive ? "600" : "normal"}
        bg={isActive ? "brand.50" : "transparent"}
        color={isActive ? "brand.500" : "gray.700"}
        _hover={{
          bg: 'gray.100',
          color: 'brand.500',
        }}
        transition="all 0.2s"
        fontSize="sm"
      >
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
      w={{ base: "full", md: "64" }}
      pos="fixed"
      h="full"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '24px',
        },
      }}
    >
      {/* Logo in Sidebar */}
      <Flex h="16" alignItems="center" justifyContent="center" my={2}>
        <Logo size="md" />
      </Flex>

      {/* Navigation Menu */}
      <Box mt={6}>
        {menuItems.map((item) => (
          <Box key={item.name}>
            {item.submenu ? (
              <>
                <NavItem
                  icon={item.icon}
                  isActive={isActiveSubmenu(item.submenu.map(sub => sub.path))}
                  hasSubmenu={true}
                  isOpen={openSubmenus[item.submenuKey]}
                  onToggle={() => toggleSubmenu(item.submenuKey)}
                >
                  {item.name}
                </NavItem>
                
                <Collapse in={openSubmenus[item.submenuKey]} animateOpacity>
                  <Box mt={1} mb={2}>
                    {item.submenu.map((subItem) => (
                      <SubNavItem
                        key={subItem.path}
                        to={subItem.path}
                        isActive={isActiveRoute(subItem.path)}
                      >
                        {subItem.name}
                      </SubNavItem>
                    ))}
                  </Box>
                </Collapse>
              </>
            ) : (
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                <NavItem 
                  key={item.name}
                  icon={item.icon}
                  isActive={isActiveRoute(item.path)}
                >
                  <Flex align="center" justify="space-between" width="100%">
                    <Text>{item.name}</Text>
                    {item.badge && (
                      <Badge colorScheme="red" borderRadius="full" fontSize="xs" px={2}>
                        {item.badge}
                      </Badge>
                    )}
                  </Flex>
                </NavItem>
              </Link>
            )}
          </Box>
        ))}
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
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Logo size="sm" />
          </DrawerHeader>
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
      w={'64'}
      pos="fixed"
      h="full"
      borderRightWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;