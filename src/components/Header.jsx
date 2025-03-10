// src/components/Header.jsx
import { useState, useRef } from 'react';
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
  useColorModeValue,
  Stack,
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  BellIcon,
  SettingsIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';

const Header = ({ onSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isOpen: isNotificationsOpen, onToggle: toggleNotifications, onClose: closeNotifications } = useDisclosure();
  const [notifications] = useState([
    { id: 1, title: 'New order placed', description: 'Order #1234 has been created', time: '2 hours ago' },
    { id: 2, title: 'Stock running low', description: 'Product "Brand A - Product 1" is low on stock', time: '3 hours ago' },
    { id: 3, title: 'New retailer registration', description: 'Retailer "Shop Express" has been registered', time: '5 hours ago' },
  ]);
  
  const navigate = useNavigate();
  const { logout } = useAuth();
  const notifBtnRef = useRef();
  const searchRef = useRef();
  const btnRef = useRef();
  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}
      py={2}
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top="0"
      zIndex="sticky"
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={onSidebarOpen}
          />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Logo />
          </Box>
          
          {/* Desktop Search Bar */}
          <InputGroup maxW="sm" display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search..." 
              bg="gray.50"
              borderRadius="md"
              _focus={{ bg: 'white', borderColor: 'brand.500' }}
            />
          </InputGroup>
        </HStack>

        <Flex alignItems="center">
          {/* Mobile Search Button */}
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            size="md"
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
            mr={2}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            ref={searchRef}
          />
          
          {/* Notifications */}
          <Popover
            isOpen={isNotificationsOpen}
            onClose={closeNotifications}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Box position="relative" ref={notifBtnRef}>
                <IconButton
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  size="md"
                  variant="ghost"
                  onClick={toggleNotifications}
                  mr={2}
                />
                <Badge
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  colorScheme="red"
                  borderRadius="full"
                  h="18px"
                  minW="18px"
                  textAlign="center"
                >
                  {notifications.length}
                </Badge>
              </Box>
            </PopoverTrigger>
            <PopoverContent width="320px" maxH="400px" overflow="hidden" _focus={{ boxShadow: 'md' }}>
              <PopoverHeader fontWeight="semibold" borderBottomWidth="1px">
                Notifications
              </PopoverHeader>
              <PopoverBody p={0} overflowY="auto" maxH="300px">
                <Stack spacing={0} divider={<MenuDivider />}>
                  {notifications.map((notification) => (
                    <Box key={notification.id} px={4} py={3} _hover={{ bg: 'gray.50' }} cursor="pointer">
                      <Text fontWeight="medium" fontSize="sm">
                        {notification.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {notification.description}
                      </Text>
                      <Text fontSize="xs" color="gray.400" mt={1}>
                        {notification.time}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </PopoverBody>
              <PopoverFooter borderTopWidth="1px" p={2}>
                <Button variant="link" size="sm" colorScheme="brand" width="full">
                  View all notifications
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="ghost"
              cursor="pointer"
              minW={0}
              _hover={{ bg: 'gray.50' }}
              rightIcon={<ChevronDownIcon />}
            >
              <HStack>
                <Avatar
                  size="sm"
                  name="Admin User"
                  bg="brand.500"
                  color="white"
                />
                <Box display={{ base: 'none', md: 'block' }}>
                  <Text fontSize="sm" fontWeight="medium">Admin User</Text>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>My Profile</MenuItem>
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search..." 
              bg="gray.50"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          </InputGroup>
        </Box>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={closeDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            {/* Mobile menu content would go here */}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={closeDrawer}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;