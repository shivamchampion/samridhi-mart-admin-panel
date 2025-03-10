// src/components/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Avatar,
  Badge,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  Image,
  useColorModeValue,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  BellIcon,
  SettingsIcon,
  SearchIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { FiLogOut, FiUser, FiHelpCircle, FiBook, FiBell } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ onSidebarOpen, isMobile }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isOpen: isNotificationsOpen, onToggle: toggleNotifications, onClose: closeNotifications } = useDisclosure();
  const { isOpen: isHelpOpen, onToggle: toggleHelp, onClose: closeHelp } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New order placed', description: 'Order #1234 has been created', time: '2 hours ago', isNew: true },
    { id: 2, title: 'Stock running low', description: 'Product "Brand A - Product 1" is low on stock', time: '3 hours ago', isNew: true },
    { id: 3, title: 'New retailer registration', description: 'Retailer "Shop Express" has been registered', time: '5 hours ago', isNew: false },
  ]);
  
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const notifBtnRef = useRef();
  const searchRef = useRef();
  const helpRef = useRef();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate unread notifications
  const unreadCount = notifications.filter(notif => notif.isNew).length;

  const headerBg = useColorModeValue(
    'rgba(255, 255, 255, 0.95)', 
    'rgba(26, 32, 44, 0.95)'
  );

  return (
    <Box
      bg={scrolled ? headerBg : "#3D5291"}
      px={4}
      py={0}
      position="sticky"
      top="0"
      zIndex="100"
      boxShadow={scrolled ? "md" : "none"}
      color={scrolled ? "gray.800" : "white"}
      h="64px"
      backdropFilter={scrolled ? "blur(10px)" : "none"}
      transition="all 0.3s ease"
    >
      <Flex h="full" alignItems="center" justifyContent="space-between">
        <HStack spacing={4} alignItems="center">
          {/* Menu Icon (mobile only) */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={onSidebarOpen}
            variant="ghost"
            color={scrolled ? "gray.700" : "white"}
            _hover={{ bg: scrolled ? "gray.100" : "whiteAlpha.200" }}
          />
          
          {/* Logo - Only shown on mobile or when sidebar is closed */}
          <Box 
            display={{ base: 'flex', md: isMobile ? 'flex' : 'none' }}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image 
              src="/logo.png" 
              alt="Samridhi Mart Logo" 
              h="38px"
              objectFit="contain" 
              filter={scrolled ? "none" : "brightness(1.2)"}
              transition="filter 0.3s ease"
            />
          </Box>
          
          {/* Desktop Search Bar */}
          <InputGroup 
            maxW="380px" 
            display={{ base: 'none', md: 'flex' }} 
            ml={4}
            transition="all 0.3s ease"
            bg={scrolled ? "white" : "whiteAlpha.200"}
            borderRadius="full"
            overflow="hidden"
            boxShadow={scrolled ? "sm" : "none"}
            _hover={{ boxShadow: "md" }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color={scrolled ? "gray.400" : "whiteAlpha.700"} />
            </InputLeftElement>
            <Input 
              placeholder="Search..." 
              borderRadius="full"
              color={scrolled ? "gray.700" : "white"}
              _placeholder={{ color: scrolled ? "gray.400" : "whiteAlpha.700" }}
              _focus={{ 
                bg: "white", 
                color: "gray.800",
                borderColor: "brand.300",
                boxShadow: `0 0 0 1px var(--chakra-colors-brand-300)`,
              }}
              borderColor="transparent"
              h="40px"
            />
          </InputGroup>
        </HStack>

        <HStack spacing={3}>
          {/* Mobile Search Button */}
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            size="md"
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            ref={searchRef}
            color={scrolled ? "gray.700" : "white"}
            _hover={{ bg: scrolled ? "gray.100" : "whiteAlpha.200" }}
          />
          
          {/* Help Button */}
          <Popover
            isOpen={isHelpOpen}
            onClose={closeHelp}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Box>
                <Tooltip label="Help & Resources" placement="bottom">
                  <IconButton
                    aria-label="Help"
                    icon={<FiHelpCircle />}
                    size="md"
                    variant="ghost"
                    onClick={toggleHelp}
                    color={scrolled ? "gray.700" : "white"}
                    _hover={{ bg: scrolled ? "gray.100" : "whiteAlpha.200" }}
                    ref={helpRef}
                  />
                </Tooltip>
              </Box>
            </PopoverTrigger>
            <PopoverContent 
              width="280px" 
              _focus={{ boxShadow: "xl" }}
              borderRadius="xl"
              boxShadow="xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <PopoverHeader fontWeight="semibold" borderBottomWidth="1px" p={4}>
                Help & Resources
              </PopoverHeader>
              <PopoverBody p={0}>
                <Box>
                  <Button 
                    variant="ghost" 
                    leftIcon={<FiBook />} 
                    justifyContent="flex-start" 
                    width="full"
                    py={3}
                    borderRadius="none"
                  >
                    User Documentation
                  </Button>
                  <Button 
                    variant="ghost" 
                    leftIcon={<FiHelpCircle />} 
                    justifyContent="flex-start" 
                    width="full"
                    py={3}
                    borderRadius="none"
                  >
                    FAQ
                  </Button>
                  <Button 
                    variant="ghost" 
                    leftIcon={<FiUser />} 
                    justifyContent="flex-start" 
                    width="full"
                    py={3}
                    borderRadius="none"
                  >
                    Contact Support
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Notifications */}
          <Popover
            isOpen={isNotificationsOpen}
            onClose={closeNotifications}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Box position="relative">
                <Tooltip label="Notifications" placement="bottom">
                  <IconButton
                    aria-label="Notifications"
                    icon={<FiBell />}
                    size="md"
                    variant="ghost"
                    onClick={toggleNotifications}
                    color={scrolled ? "gray.700" : "white"}
                    _hover={{ bg: scrolled ? "gray.100" : "whiteAlpha.200" }}
                    ref={notifBtnRef}
                  />
                </Tooltip>
                {unreadCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="red"
                    borderRadius="full"
                    h="18px"
                    minW="18px"
                    textAlign="center"
                    fontSize="xs"
                    fontWeight="bold"
                    animation="pulse 2s infinite"
                    boxShadow="0 0 0 2px white"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Box>
            </PopoverTrigger>
            <PopoverContent 
              width="350px" 
              maxH="420px" 
              overflow="hidden" 
              _focus={{ boxShadow: "xl" }}
              borderRadius="xl"
              boxShadow="xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <PopoverHeader fontWeight="semibold" borderBottomWidth="1px" p={4}>
                <Flex justify="space-between" align="center">
                  <Text>Notifications</Text>
                  {unreadCount > 0 && (
                    <Badge colorScheme="red" borderRadius="full" px={2}>
                      {unreadCount} new
                    </Badge>
                  )}
                </Flex>
              </PopoverHeader>
              <PopoverBody p={0} overflowY="auto" maxH="320px">
                <Box>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Box 
                        key={notification.id} 
                        px={4} 
                        py={3} 
                        _hover={{ bg: 'gray.50' }} 
                        cursor="pointer"
                        borderLeftWidth={notification.isNew ? '4px' : '0px'}
                        borderLeftColor="brand.500"
                        transition="all 0.2s"
                        bg={notification.isNew ? 'gray.50' : 'white'}
                        borderBottomWidth="1px"
                        borderBottomColor="gray.100"
                      >
                        <Text fontWeight={notification.isNew ? "medium" : "normal"} fontSize="sm">
                          {notification.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {notification.description}
                        </Text>
                        <Flex justify="space-between" align="center" mt={1}>
                          <Text fontSize="xs" color="gray.400">
                            {notification.time}
                          </Text>
                          {notification.isNew && (
                            <Badge size="sm" colorScheme="green" variant="subtle">
                              New
                            </Badge>
                          )}
                        </Flex>
                      </Box>
                    ))
                  ) : (
                    <Box py={6} px={4} textAlign="center">
                      <Text color="gray.500">No notifications yet</Text>
                    </Box>
                  )}
                </Box>
              </PopoverBody>
              <PopoverFooter borderTopWidth="1px" p={2}>
                <Button variant="link" size="sm" colorScheme="brand" width="full">
                  View all notifications
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rounded="full"
              variant="ghost"
              cursor="pointer"
              minW={0}
              _hover={{ bg: scrolled ? "gray.100" : "whiteAlpha.200" }}
              ml={2}
              px={2}
              py={2}
            >
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name="Admin User"
                  bg={scrolled ? "brand.500" : "white"}
                  color={scrolled ? "white" : "#3D5291"}
                  boxShadow="sm"
                  border="2px solid"
                  borderColor={scrolled ? "transparent" : "whiteAlpha.700"}
                />
                <Flex direction="column" display={{ base: 'none', md: 'flex' }} alignItems="flex-start">
                  <Text 
                    fontSize="sm" 
                    fontWeight="medium" 
                    color={scrolled ? "gray.700" : "white"} 
                    lineHeight="tight"
                  >
                    Admin User
                  </Text>
                </Flex>
                <ChevronDownIcon 
                  color={scrolled ? "gray.600" : "white"} 
                  boxSize={4}
                  transition="transform 0.3s"
                  _groupHover={{ transform: "rotate(180deg)" }}
                />
              </HStack>
            </MenuButton>
            <MenuList 
              color="gray.700" 
              shadow="xl" 
              borderRadius="xl" 
              py={2}
              borderColor="gray.100"
              minW="200px"
            >
              <Box px={4} py={2} borderBottomWidth="1px" borderColor="gray.100" mb={2}>
                <Text fontWeight="medium">Admin User</Text>
                <Text fontSize="sm" color="gray.500">admin@samridhimart.com</Text>
              </Box>
              <MenuItem icon={<FiUser size={14} />} py={3}>My Profile</MenuItem>
              <MenuItem icon={<SettingsIcon boxSize={4} />} py={3}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem 
                icon={<FiLogOut size={14} />} 
                onClick={handleLogout} 
                color="red.500" 
                _hover={{ bg: "red.50" }}
                py={3}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <Drawer isOpen={isSearchOpen} placement="top" onClose={() => setIsSearchOpen(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Search</DrawerHeader>
            <DrawerBody p={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.500" />
                </InputLeftElement>
                <Input 
                  placeholder="Search..." 
                  autoFocus
                  borderRadius="md"
                />
              </InputGroup>

              <Box mt={4}>
                <Text fontWeight="medium" mb={2}>Recent Searches</Text>
                <HStack spacing={2} flexWrap="wrap">
                  <Badge px={2} py={1} borderRadius="full" colorScheme="gray">Product 1</Badge>
                  <Badge px={2} py={1} borderRadius="full" colorScheme="gray">North Zone</Badge>
                  <Badge px={2} py={1} borderRadius="full" colorScheme="gray">Retailer X</Badge>
                </HStack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default Header;
