// src/pages/Products.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
  useToast,
  Tooltip,
  Spinner,
  Tag,
  Collapse,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton
} from '@chakra-ui/react';
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  ChevronDown,
  ArrowUpDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import ChakraModal from '../components/ChakraModal';
import ProductForm from '../components/products/ProductForm';

// Animated components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionTr = motion(Tr);

const Products = () => {
  // State for products data
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    status: ''
  });
  
  // State for loading and pagination
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // State for modal/drawer
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
  // Disclosure hooks for modals and drawers
  const { 
    isOpen: isFormOpen, 
    onOpen: onFormOpen, 
    onClose: onFormClose 
  } = useDisclosure();
  
  const { 
    isOpen: isViewOpen, 
    onOpen: onViewOpen, 
    onClose: onViewClose 
  } = useDisclosure();
  
  const { 
    isOpen: isFilterOpen, 
    onOpen: onFilterOpen, 
    onClose: onFilterClose 
  } = useDisclosure();
  
  const { 
    isOpen: isDeleteOpen, 
    onOpen: onDeleteOpen, 
    onClose: onDeleteClose 
  } = useDisclosure();
  
  // Toast for notifications
  const toast = useToast();
  
  // Mock data for products
  const mockProducts = [
    {
      id: 'PROD001',
      name: 'Product 1',
      brand: 'Brand A',
      brand_id: 'BRD001',
      category: 'Category 1',
      category_id: 'CAT001',
      big_unit: 'Box',
      small_unit: 'Mala',
      smallest_unit: 'Piece',
      mrp: 500,
      sp_big_unit: 450,
      sp_small_unit: 45,
      conversion_factor: 10,
      conversion_factor_small_to_smallest: 12,
      stock: 25,
      active: true
    },
    {
      id: 'PROD002',
      name: 'Product 2',
      brand: 'Brand B',
      brand_id: 'BRD002',
      category: 'Category 2',
      category_id: 'CAT002',
      big_unit: 'Box',
      small_unit: 'Mala',
      smallest_unit: 'Piece',
      mrp: 800,
      sp_big_unit: 750,
      sp_small_unit: 75,
      conversion_factor: 10,
      conversion_factor_small_to_smallest: 10,
      stock: 18,
      active: true
    },
    {
      id: 'PROD003',
      name: 'Product 3',
      brand: 'Brand A',
      brand_id: 'BRD001',
      category: 'Category 1',
      category_id: 'CAT001',
      big_unit: 'Case',
      small_unit: 'Piece',
      smallest_unit: '',
      mrp: 1200,
      sp_big_unit: 1150,
      sp_small_unit: 115,
      conversion_factor: 10,
      conversion_factor_small_to_smallest: 1,
      stock: 32,
      active: true
    },
    {
      id: 'PROD004',
      name: 'Product 4',
      brand: 'Brand C',
      brand_id: 'BRD003',
      category: 'Category 3',
      category_id: 'CAT003',
      big_unit: 'Bag',
      small_unit: 'Kg',
      smallest_unit: 'Gram',
      mrp: 250,
      sp_big_unit: 230,
      sp_small_unit: 23,
      conversion_factor: 10,
      conversion_factor_small_to_smallest: 1000,
      stock: 45,
      active: false
    },
    {
      id: 'PROD005',
      name: 'Product 5',
      brand: 'Brand B',
      brand_id: 'BRD002',
      category: 'Category 2',
      category_id: 'CAT002',
      big_unit: 'Carton',
      small_unit: 'Pack',
      smallest_unit: 'Piece',
      mrp: 350,
      sp_big_unit: 330,
      sp_small_unit: 33,
      conversion_factor: 10,
      conversion_factor_small_to_smallest: 24,
      stock: 50,
      active: true
    },
  ];
  
  // Mock data for filters
  const categories = [
    { value: 'CAT001', label: 'Category 1' },
    { value: 'CAT002', label: 'Category 2' },
    { value: 'CAT003', label: 'Category 3' },
    { value: 'CAT004', label: 'Category 4' },
    { value: 'CAT005', label: 'Category 5' }
  ];
  
  const brands = [
    { value: 'BRD001', label: 'Brand A' },
    { value: 'BRD002', label: 'Brand B' },
    { value: 'BRD003', label: 'Brand C' },
    { value: 'BRD004', label: 'Brand D' },
    { value: 'BRD005', label: 'Brand E' }
  ];
  
  // Load products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
          setIsLoading(false);
          setTotalPages(Math.ceil(mockProducts.length / 10));
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch products. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Apply search and filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(search) ||
          item.id.toLowerCase().includes(search) ||
          item.brand.toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(item => item.category_id === filters.category);
    }
    
    // Apply brand filter
    if (filters.brand) {
      result = result.filter(item => item.brand_id === filters.brand);
    }
    
    // Apply status filter
    if (filters.status === 'active') {
      result = result.filter(item => item.active);
    } else if (filters.status === 'inactive') {
      result = result.filter(item => !item.active);
    }
    
    setFilteredProducts(result);
    setTotalPages(Math.ceil(result.length / 10));
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filters, products]);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      status: ''
    });
    setSearchTerm('');
  };
  
  // Handle add/edit product
  const handleAddNew = () => {
    setSelectedProduct(null);
    onFormOpen();
  };
  
  const handleEdit = (product) => {
    setSelectedProduct(product);
    onFormOpen();
  };
  
  const handleView = (product) => {
    setSelectedProduct(product);
    onViewOpen();
  };
  
  const handleDelete = (product) => {
    setSelectedProduct(product);
    onDeleteOpen();
  };
  
  // Form submission handlers
  const handleFormSubmit = (data) => {
    setIsFormSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedProduct) {
        // Update existing product
        const updatedProducts = products.map(p => 
          p.id === selectedProduct.id ? { ...p, ...data } : p
        );
        setProducts(updatedProducts);
        
        toast({
          title: 'Product Updated',
          description: `${data.name} has been updated successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      } else {
        // Add new product
        const newProduct = {
          ...data,
          id: data.id || `PROD${String(products.length + 1).padStart(3, '0')}`,
          stock: 0
        };
        
        setProducts([...products, newProduct]);
        
        toast({
          title: 'Product Added',
          description: `${data.name} has been added successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      }
      
      setIsFormSubmitting(false);
      onFormClose();
    }, 1500);
  };
  
  // Delete confirmation handler
  const confirmDelete = () => {
    if (!selectedProduct) return;
    
    // Simulate API call
    setTimeout(() => {
      const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
      setProducts(updatedProducts);
      
      toast({
        title: 'Product Deleted',
        description: `${selectedProduct.name} has been deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      
      onDeleteClose();
      setSelectedProduct(null);
    }, 1000);
  };
  
  // Row animation variants
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      transition: { duration: 0.2 }
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    return status ? 'green' : 'red';
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };
  
  // Show table skeleton while loading
  const renderTableSkeleton = () => {
    return Array(5).fill(0).map((_, i) => (
      <Tr key={i}>
        {Array(7).fill(0).map((_, j) => (
          <Td key={j}>
            <Box height="20px" width="100%" maxWidth="150px" bg="gray.200" borderRadius="md" />
          </Td>
        ))}
      </Tr>
    ));
  };
  
  return (
    <Box>
      {/* Page Header */}
      <MotionFlex 
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        mb={6}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box mb={{ base: 4, md: 0 }}>
          <Heading 
            size="lg" 
            bgGradient="linear(to-r, brand.500, brand.600)"
            bgClip="text"
          >
            Products
          </Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            Manage your inventory products
          </Text>
        </Box>
        
        <HStack spacing={3} flexWrap="wrap">
          <Button
            leftIcon={<Filter size={16} />}
            variant="outline"
            onClick={onFilterOpen}
            size="sm"
          >
            Filter
          </Button>
          
          <Button
            leftIcon={<Download size={16} />}
            variant="outline"
            size="sm"
          >
            Export
          </Button>
          
          <Button
            leftIcon={<Upload size={16} />}
            variant="outline"
            size="sm"
          >
            Import
          </Button>
          
          <Button
            leftIcon={<Plus size={16} />}
            colorScheme="brand"
            onClick={handleAddNew}
            size="sm"
          >
            Add Product
          </Button>
        </HStack>
      </MotionFlex>
      
      {/* Search Bar */}
      <MotionBox
        mb={6}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <Search size={18} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search products by name, ID, brand..."
            bg="white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            borderRadius="md"
            boxShadow="sm"
            _focus={{ boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
          />
        </InputGroup>
      </MotionBox>
      
      {/* Filter Collapse */}
      <Collapse in={isFilterOpen} animateOpacity>
        <Box 
          bg="white" 
          p={4} 
          borderRadius="md" 
          boxShadow="sm" 
          mb={6}
          border="1px"
          borderColor="gray.200"
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="sm">Filter Products</Heading>
            <IconButton 
              icon={<X size={18} />} 
              variant="ghost" 
              size="sm" 
              onClick={onFilterClose} 
              aria-label="Close filters"
            />
          </Flex>
          
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
            <Box flex="1">
              <Text fontSize="sm" fontWeight="medium" mb={1}>Category</Text>
              <Select 
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                placeholder="All Categories"
                size="sm"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </Select>
            </Box>
            
            <Box flex="1">
              <Text fontSize="sm" fontWeight="medium" mb={1}>Brand</Text>
              <Select 
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                placeholder="All Brands"
                size="sm"
              >
                {brands.map(brand => (
                  <option key={brand.value} value={brand.value}>{brand.label}</option>
                ))}
              </Select>
            </Box>
            
            <Box flex="1">
              <Text fontSize="sm" fontWeight="medium" mb={1}>Status</Text>
              <Select 
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                placeholder="All Status"
                size="sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </Box>
          </Flex>
          
          <Flex justify="flex-end">
            <Button 
              size="sm" 
              variant="outline" 
              mr={3} 
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button 
              size="sm" 
              colorScheme="brand" 
              onClick={onFilterClose}
            >
              Apply Filters
            </Button>
          </Flex>
        </Box>
      </Collapse>
      
      {/* Active Filters Display */}
      {(filters.category || filters.brand || filters.status) && (
        <MotionBox
          mb={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <HStack spacing={2} flexWrap="wrap">
            <Text fontSize="sm" color="gray.600">Active filters:</Text>
            
            {filters.category && (
              <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="blue">
                {categories.find(c => c.value === filters.category)?.label || filters.category}
                <Box as="span" ml={1} cursor="pointer" onClick={() => setFilters({...filters, category: ''})}>
                  ×
                </Box>
              </Tag>
            )}
            
            {filters.brand && (
              <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="purple">
                {brands.find(b => b.value === filters.brand)?.label || filters.brand}
                <Box as="span" ml={1} cursor="pointer" onClick={() => setFilters({...filters, brand: ''})}>
                  ×
                </Box>
              </Tag>
            )}
            
            {filters.status && (
              <Tag 
                size="sm" 
                borderRadius="full" 
                variant="subtle" 
                colorScheme={filters.status === 'active' ? 'green' : 'red'}
              >
                {filters.status}
                <Box as="span" ml={1} cursor="pointer" onClick={() => setFilters({...filters, status: ''})}>
                  ×
                </Box>
              </Tag>
            )}
            
            <Button size="xs" variant="link" onClick={resetFilters}>
              Clear all
            </Button>
          </HStack>
        </MotionBox>
      )}
      
      {/* Products Table */}
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        overflow="hidden"
        border="1px"
        borderColor="gray.200"
        position="relative"
      >
        {isLoading && (
          <Flex 
            position="absolute" 
            inset="0" 
            bg="whiteAlpha.800" 
            zIndex="1" 
            justify="center" 
            align="center"
            backdropFilter="blur(2px)"
          >
            <Spinner size="xl" color="brand.500" thickness="3px" />
          </Flex>
        )}
        
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.50">
                <Th>
                  <HStack spacing={1}>
                    <Text>Product</Text>
                    <IconButton
                      icon={<ArrowUpDown size={14} />}
                      variant="ghost"
                      size="xs"
                      aria-label="Sort by product"
                    />
                  </HStack>
                </Th>
                <Th>
                  <HStack spacing={1}>
                    <Text>Category/Brand</Text>
                    <IconButton
                      icon={<ArrowUpDown size={14} />}
                      variant="ghost"
                      size="xs"
                      aria-label="Sort by category"
                    />
                  </HStack>
                </Th>
                <Th>
                  <HStack spacing={1}>
                    <Text>Units</Text>
                    <IconButton
                      icon={<ArrowUpDown size={14} />}
                      variant="ghost"
                      size="xs"
                      aria-label="Sort by units"
                    />
                  </HStack>
                </Th>
                <Th>
                  <HStack spacing={1}>
                    <Text>Pricing</Text>
                    <IconButton
                      icon={<ArrowUpDown size={14} />}
                      variant="ghost"
                      size="xs"
                      aria-label="Sort by pricing"
                    />
                  </HStack>
                </Th>
                <Th>
                  <HStack spacing={1}>
                    <Text>Stock</Text>
                    <IconButton
                      icon={<ArrowUpDown size={14} />}
                      variant="ghost"
                      size="xs"
                      aria-label="Sort by stock"
                    />
                  </HStack>
                </Th>
                <Th>
                  <HStack spacing={1}>
                    <Text>Status</Text>
                    <IconButton
                      icon={<ArrowUpDown size={14} />}
                      variant="ghost"
                      size="xs"
                      aria-label="Sort by status"
                    />
                  </HStack>
                </Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                renderTableSkeleton()
              ) : (
                <AnimatePresence>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <MotionTr
                        key={product.id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        _hover={{ bg: 'gray.50' }}
                      >
                        <Td>
                          <Flex align="center">
                            <Flex 
                              align="center" 
                              justify="center" 
                              w="40px" 
                              h="40px" 
                              bg="gray.100" 
                              borderRadius="md" 
                              mr={3}
                            >
                              <Package size={18} color="gray.500" />
                            </Flex>
                            <Box>
                              <Text fontWeight="medium">{product.name}</Text>
                              <Text fontSize="xs" color="gray.500">{product.id}</Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{product.category}</Text>
                          <Text fontSize="xs" color="gray.500">{product.brand}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">{product.big_unit}</Text>
                          <Text fontSize="xs" color="gray.500">
                            1:{product.conversion_factor} {product.small_unit}
                            {product.smallest_unit && `, 1:${product.conversion_factor_small_to_smallest} ${product.smallest_unit}`}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">MRP: {formatCurrency(product.mrp)}</Text>
                          <Text fontSize="xs" color="gray.500">
                            SP: {formatCurrency(product.sp_big_unit)}/{product.big_unit}
                          </Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {product.stock} {product.big_unit}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {product.stock * product.conversion_factor} {product.small_unit}
                          </Text>
                        </Td>
                        <Td>
                          <Badge 
                            colorScheme={getStatusColor(product.active)} 
                            borderRadius="full" 
                            px={2} 
                            py={1}
                          >
                            {product.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </Td>
                        <Td textAlign="right">
                          <Menu placement="bottom-end">
                            <MenuButton
                              as={IconButton}
                              icon={<MoreVertical size={16} />}
                              variant="ghost"
                              size="sm"
                              aria-label="More options"
                            />
                            <MenuList shadow="lg" borderRadius="md">
                              <MenuItem 
                                icon={<Eye size={16} />} 
                                onClick={() => handleView(product)}
                              >
                                View Details
                              </MenuItem>
                              <MenuItem 
                                icon={<Edit size={16} />} 
                                onClick={() => handleEdit(product)}
                              >
                                Edit Product
                              </MenuItem>
                              <MenuDivider />
                              <MenuItem 
                                icon={<Trash2 size={16} />} 
                                onClick={() => handleDelete(product)}
                                color="red.500"
                              >
                                Delete Product
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </MotionTr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={7} textAlign="center" py={8}>
                        <Box>
                          <Text color="gray.500" mb={2}>No products found</Text>
                          <Text fontSize="sm" color="gray.400">
                            {searchTerm || (filters.category || filters.brand || filters.status) 
                              ? 'Try adjusting your search or filters' 
                              : 'Add your first product to get started'}
                          </Text>
                        </Box>
                      </Td>
                    </Tr>
                  )}
                </AnimatePresence>
              )}
            </Tbody>
          </Table>
        </Box>
        
        {/* Pagination */}
        <Flex 
          justify="space-between" 
          align="center" 
          px={6} 
          py={4} 
          borderTop="1px" 
          borderColor="gray.200"
          bg="gray.50"
        >
          <Text fontSize="sm" color="gray.600">
            Showing <Text as="span" fontWeight="medium">{filteredProducts.length}</Text> products
          </Text>
          <HStack>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<ChevronLeft size={16} />}
              isDisabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              aria-label="Previous page"
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              rightIcon={<ChevronDown size={16} />}
              isDisabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              aria-label="Next page"
            >
              Next
            </Button>
          </HStack>
        </Flex>
      </Box>
      
      {/* Product Form Modal */}
      <Drawer
        isOpen={isFormOpen}
        onClose={onFormClose}
        size="xl"
        placement="right"
      >
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent>
          <DrawerHeader 
            bgGradient="linear(to-r, brand.500, brand.600)" 
            color="white" 
            px={6} 
            py={4}
            borderBottomWidth="1px"
          >
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
            <DrawerCloseButton color="white" />
          </DrawerHeader>
          <DrawerBody px={6} py={6}>
            <ProductForm
              product={selectedProduct}
              onSubmit={handleFormSubmit}
              onCancel={onFormClose}
              isLoading={isFormSubmitting}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      {/* Product View Modal */}
      <ChakraModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        title={`Product Details: ${selectedProduct?.name || ''}`}
        size="lg"
      >
        {selectedProduct && (
          <VStack align="stretch" spacing={6}>
            {/* Basic Info */}
            <Box>
              <Heading size="sm" mb={3} color="gray.700">
                Basic Information
              </Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="xs" color="gray.500">Product Name</Text>
                  <Text fontWeight="medium">{selectedProduct.name}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Product ID</Text>
                  <Text fontWeight="medium">{selectedProduct.id}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Brand</Text>
                  <Text>{selectedProduct.brand}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Category</Text>
                  <Text>{selectedProduct.category}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Status</Text>
                  <Badge 
                    colorScheme={getStatusColor(selectedProduct.active)} 
                    borderRadius="full" 
                    px={2} 
                    py={0.5}
                  >
                    {selectedProduct.active ? 'Active' : 'Inactive'}
                  </Badge>
                </Box>
              </SimpleGrid>
            </Box>
            
            <Divider />
            
            {/* Units Info */}
            <Box>
              <Heading size="sm" mb={3} color="gray.700">
                Unit Information
              </Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="xs" color="gray.500">Big Unit</Text>
                  <Text>{selectedProduct.big_unit}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Small Unit</Text>
                  <Text>{selectedProduct.small_unit}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Smallest Unit</Text>
                  <Text>{selectedProduct.smallest_unit || '-'}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Conversion Factors</Text>
                  <Text>
                    1 {selectedProduct.big_unit} = {selectedProduct.conversion_factor} {selectedProduct.small_unit}
                    {selectedProduct.smallest_unit && (
                      <>
                        <br />
                        1 {selectedProduct.small_unit} = {selectedProduct.conversion_factor_small_to_smallest} {selectedProduct.smallest_unit}
                      </>
                    )}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
            
            <Divider />
            
            {/* Pricing Info */}
            <Box>
              <Heading size="sm" mb={3} color="gray.700">
                Pricing Information
              </Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="xs" color="gray.500">MRP</Text>
                  <Text fontWeight="medium">{formatCurrency(selectedProduct.mrp)}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Selling Price (Big Unit)</Text>
                  <Text>{formatCurrency(selectedProduct.sp_big_unit)} per {selectedProduct.big_unit}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Selling Price (Small Unit)</Text>
                  <Text>{formatCurrency(selectedProduct.sp_small_unit)} per {selectedProduct.small_unit}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">Current Stock</Text>
                  <Text>
                    {selectedProduct.stock} {selectedProduct.big_unit}
                    <Text as="span" color="gray.500" ml={1} fontSize="xs">
                      ({selectedProduct.stock * selectedProduct.conversion_factor} {selectedProduct.small_unit})
                    </Text>
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
          </VStack>
        )}
      </ChakraModal>
      
      {/* Delete Confirmation Modal */}
      <ChakraModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title="Delete Product"
        size="md"
        primaryAction={confirmDelete}
        primaryActionLabel="Delete"
        secondaryAction={onDeleteClose}
        secondaryActionLabel="Cancel"
      >
        {selectedProduct && (
          <>
            <Text mb={4}>
              Are you sure you want to delete <Text as="span" fontWeight="bold">{selectedProduct.name}</Text>?
            </Text>
            <Text color="red.500" fontSize="sm">
              This action cannot be undone.
            </Text>
          </>
        )}
      </ChakraModal>
    </Box>
  );
};

export default Products;