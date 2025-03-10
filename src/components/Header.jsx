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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  BellIcon,
  SettingsIcon,
  SearchIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ onSidebarOpen, isMobile }) => {
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      bg="#3D5291"
      px={4}
      py={0}
      position="sticky"
      top="0"
      zIndex="sticky"
      boxShadow="sm"
      color="white"
      h="64px"
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
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          />
          
          {/* Logo - Only shown on mobile or when sidebar is closed */}
          <Box display={{ base: 'flex', md: isMobile ? 'flex' : 'none' }}>
            <Image 
              src="/logo.png" 
              alt="Samridhi Mart Logo" 
              h="32px"
              objectFit="contain" 
            />
          </Box>
          
          {/* Desktop Search Bar */}
          <InputGroup maxW="320px" display={{ base: 'none', md: 'flex' }} ml={4}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="whiteAlpha.700" />
            </InputLeftElement>
            <Input 
              placeholder="Search..." 
              bg="whiteAlpha.200"
              color="white"
              borderRadius="md"
              _placeholder={{ color: 'whiteAlpha.700' }}
              _focus={{ bg: 'whiteAlpha.300', borderColor: 'white' }}
              borderColor="whiteAlpha.300"
              h="38px"
            />
          </InputGroup>
        </HStack>

        <HStack spacing={2}>
          {/* Mobile Search Button */}
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            size="md"
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            ref={searchRef}
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          />
          
          {/* Notifications */}
          <Popover
            isOpen={isNotificationsOpen}
            onClose={closeNotifications}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Box position="relative">
                <IconButton
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  size="md"
                  variant="ghost"
                  onClick={toggleNotifications}
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  ref={notifBtnRef}
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
                <Box>
                  {notifications.map((notification) => (
                    <Box 
                      key={notification.id} 
                      px={4} 
                      py={3} 
                      _hover={{ bg: 'gray.50' }} 
                      cursor="pointer"
                      borderBottomWidth="1px"
                      borderBottomColor="gray.100"
                    >
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
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="ghost"
              cursor="pointer"
              minW={0}
              _hover={{ bg: 'whiteAlpha.200' }}
              ml={2}
            >
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name="AU"
                  bg="white"
                  color="#3D5291"
                />
                <Flex direction="column" display={{ base: 'none', md: 'flex' }} alignItems="flex-start">
                  <Text fontSize="sm" fontWeight="medium" color="white" lineHeight="tight">Admin User</Text>
                </Flex>
                <ChevronDownIcon color="white" boxSize={4} />
              </HStack>
            </MenuButton>
            <MenuList color="gray.800">
              <MenuItem icon={<FiUser />}>My Profile</MenuItem>
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="whiteAlpha.700" />
            </InputLeftElement>
            <Input 
              placeholder="Search..." 
              bg="whiteAlpha.200"
              color="white"
              _placeholder={{ color: 'whiteAlpha.700' }}
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
              borderColor="whiteAlpha.300"
            />
          </InputGroup>
        </Box>
      )}
    </Box>
  );
};

export default Header;