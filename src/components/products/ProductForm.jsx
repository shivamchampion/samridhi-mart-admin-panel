// src/components/products/ProductForm.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Divider,
  Heading,
  ButtonGroup,
  Button,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Icon,
  Badge
} from '@chakra-ui/react';
import {
  Package,
  DollarSign,
  Tag,
  Briefcase,
  Percent,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import our enhanced form components
import {
  ChakraInput,
  ChakraSelect,
  ChakraTextarea,
  ChakraSwitch
} from '../ChakraFormComponents';

// Animated components
const MotionBox = motion(Box);

const ProductForm = ({ 
  product = null, 
  onSubmit, 
  onCancel,
  isLoading = false 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    category: '',
    brand: '',
    description: '',
    
    big_unit: '',
    small_unit: '',
    smallest_unit: '',
    conversion_factor: '',
    conversion_factor_small_to_smallest: '',
    
    mrp: '',
    sp_big_unit: '',
    sp_small_unit: '',
    
    cgst: '',
    sgst: '',
    igst: '',
    
    commission: '',
    active: true
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Toast for notifications
  const toast = useToast();
  
  // Initialize form data if editing an existing product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        id: product.id || '',
        category: product.category_id || '',
        brand: product.brand_id || '',
        description: product.description || '',
        
        big_unit: product.big_unit || '',
        small_unit: product.small_unit || '',
        smallest_unit: product.smallest_unit || '',
        conversion_factor: product.conversion_factor || '',
        conversion_factor_small_to_smallest: product.conversion_factor_small_to_smallest || '',
        
        mrp: product.mrp || '',
        sp_big_unit: product.sp_big_unit || '',
        sp_small_unit: product.sp_small_unit || '',
        
        cgst: product.cgst || '',
        sgst: product.sgst || '',
        igst: product.igst || '',
        
        commission: product.commission || '',
        active: product.active !== false
      });
    }
  }, [product]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle numeric input changes with validation
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers and decimal points
    if (value === '' || /^[0-9]+\.?[0-9]*$/.test(value)) {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Clear error when field is edited
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: null
        });
      }
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'name', 'big_unit', 'small_unit', 'conversion_factor', 'mrp', 'sp_big_unit'
    ];
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Check numeric fields for valid values
    const numericFields = [
      'conversion_factor', 'conversion_factor_small_to_smallest', 
      'mrp', 'sp_big_unit', 'sp_small_unit', 
      'cgst', 'sgst', 'igst', 'commission'
    ];
    
    numericFields.forEach(field => {
      if (formData[field] && (isNaN(parseFloat(formData[field])) || parseFloat(formData[field]) < 0)) {
        newErrors[field] = 'Please enter a valid number';
      }
    });
    
    // Validate pricing logic
    if (parseFloat(formData.sp_big_unit) > parseFloat(formData.mrp)) {
      newErrors.sp_big_unit = 'Selling price cannot exceed MRP';
    }
    
    // Validate tax rates (0-100%)
    ['cgst', 'sgst', 'igst'].forEach(field => {
      if (formData[field] && (parseFloat(formData[field]) < 0 || parseFloat(formData[field]) > 100)) {
        newErrors[field] = 'Tax rate must be between 0 and 100%';
      }
    });
    
    // Validate commission rate (0-100%)
    if (formData.commission && (parseFloat(formData.commission) < 0 || parseFloat(formData.commission) > 100)) {
      newErrors.commission = 'Commission rate must be between 0 and 100%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please correct the errors in the form.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    
    // Convert numeric strings to numbers
    const formattedData = {
      ...formData,
      conversion_factor: parseFloat(formData.conversion_factor),
      conversion_factor_small_to_smallest: formData.conversion_factor_small_to_smallest 
        ? parseFloat(formData.conversion_factor_small_to_smallest) 
        : 1,
      mrp: parseFloat(formData.mrp),
      sp_big_unit: parseFloat(formData.sp_big_unit),
      sp_small_unit: formData.sp_small_unit ? parseFloat(formData.sp_small_unit) : null,
      cgst: formData.cgst ? parseFloat(formData.cgst) : 0,
      sgst: formData.sgst ? parseFloat(formData.sgst) : 0,
      igst: formData.igst ? parseFloat(formData.igst) : 0,
      commission: formData.commission ? parseFloat(formData.commission) : 0,
    };
    
    // Submit the form
    onSubmit(formattedData);
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  // Mock data for dropdowns
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
  
  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Basic Information Section */}
      <MotionBox variants={sectionVariants} mb={8}>
        <Flex align="center" mb={4}>
          <Icon as={Package} mr={2} color="brand.500" />
          <Heading size="md" fontWeight="600">Basic Information</Heading>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <ChakraInput
            name="name"
            label="Product Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            error={errors.name}
            isRequired
          />
          
          <ChakraInput
            name="id"
            label="Product ID"
            value={formData.id}
            onChange={handleChange}
            placeholder="Leave empty for auto-generation"
            helper="System will generate an ID if left blank"
            isReadOnly={!!product}
          />
        </SimpleGrid>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
          <ChakraSelect
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
            placeholder="Select a category"
            error={errors.category}
            isRequired
          />
          
          <ChakraSelect
            name="brand"
            label="Brand"
            value={formData.brand}
            onChange={handleChange}
            options={brands}
            placeholder="Select a brand"
            error={errors.brand}
            isRequired
          />
        </SimpleGrid>
        
        <Box mt={4}>
          <ChakraTextarea
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description (optional)"
            rows={3}
          />
        </Box>
      </MotionBox>
      
      <Divider my={8} />
      
      {/* Units Section */}
      <MotionBox variants={sectionVariants} mb={8}>
        <Flex align="center" mb={4}>
          <Icon as={Tag} mr={2} color="brand.500" />
          <Heading size="md" fontWeight="600">Unit Information</Heading>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <ChakraInput
            name="big_unit"
            label="Big Unit"
            value={formData.big_unit}
            onChange={handleChange}
            placeholder="e.g. Box"
            error={errors.big_unit}
            isRequired
            helper="Largest unit of measurement"
          />
          
          <ChakraInput
            name="small_unit"
            label="Small Unit"
            value={formData.small_unit}
            onChange={handleChange}
            placeholder="e.g. Mala"
            error={errors.small_unit}
            isRequired
            helper="Medium unit of measurement"
          />
          
          <ChakraInput
            name="smallest_unit"
            label="Smallest Unit"
            value={formData.smallest_unit}
            onChange={handleChange}
            placeholder="e.g. Piece"
            helper="Smallest unit of measurement (optional)"
          />
        </SimpleGrid>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
          <ChakraInput
            name="conversion_factor"
            label="Big to Small Conversion"
            value={formData.conversion_factor}
            onChange={handleNumericChange}
            placeholder="e.g. 10"
            error={errors.conversion_factor}
            isRequired
            helper="How many small units make 1 big unit"
            type="number"
            min="0.01"
            step="0.01"
          />
          
          <ChakraInput
            name="conversion_factor_small_to_smallest"
            label="Small to Smallest Conversion"
            value={formData.conversion_factor_small_to_smallest}
            onChange={handleNumericChange}
            placeholder="e.g. 12"
            error={errors.conversion_factor_small_to_smallest}
            helper="How many smallest units make 1 small unit"
            type="number"
            min="0.01"
            step="0.01"
          />
        </SimpleGrid>
      </MotionBox>
      
      <Divider my={8} />
      
      {/* Pricing Section */}
      <MotionBox variants={sectionVariants} mb={8}>
        <Flex align="center" mb={4}>
          <Icon as={DollarSign} mr={2} color="brand.500" />
          <Heading size="md" fontWeight="600">Pricing Information</Heading>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <ChakraInput
            name="mrp"
            label="MRP (₹)"
            value={formData.mrp}
            onChange={handleNumericChange}
            placeholder="Enter MRP"
            error={errors.mrp}
            isRequired
            leftIcon={<DollarSign size={16} />}
            type="number"
            min="0.01"
            step="0.01"
          />
          
          <ChakraInput
            name="sp_big_unit"
            label={`Selling Price (₹/${formData.big_unit || 'Big Unit'})`}
            value={formData.sp_big_unit}
            onChange={handleNumericChange}
            placeholder="Enter selling price"
            error={errors.sp_big_unit}
            isRequired
            leftIcon={<DollarSign size={16} />}
            type="number"
            min="0.01"
            step="0.01"
          />
          
          <ChakraInput
            name="sp_small_unit"
            label={`Selling Price (₹/${formData.small_unit || 'Small Unit'})`}
            value={formData.sp_small_unit}
            onChange={handleNumericChange}
            placeholder="Enter selling price"
            error={errors.sp_small_unit}
            leftIcon={<DollarSign size={16} />}
            type="number"
            min="0.01"
            step="0.01"
          />
        </SimpleGrid>
      </MotionBox>
      <Divider my={8} />
      
      {/* GST Section */}
      <MotionBox variants={sectionVariants} mb={8}>
        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton px={0} _hover={{ bg: "transparent" }}>
              <Flex flex="1" align="center">
                <Icon as={Percent} mr={2} color="brand.500" />
                <Heading size="md" fontWeight="600">GST Information</Heading>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} px={0}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <ChakraInput
                  name="cgst"
                  label="CGST (%)"
                  value={formData.cgst}
                  onChange={handleNumericChange}
                  placeholder="e.g. 9"
                  error={errors.cgst}
                  rightIcon={<Percent size={16} />}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                />
                
                <ChakraInput
                  name="sgst"
                  label="SGST (%)"
                  value={formData.sgst}
                  onChange={handleNumericChange}
                  placeholder="e.g. 9"
                  error={errors.sgst}
                  rightIcon={<Percent size={16} />}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                />
                
                <ChakraInput
                  name="igst"
                  label="IGST (%)"
                  value={formData.igst}
                  onChange={handleNumericChange}
                  placeholder="e.g. 18"
                  error={errors.igst}
                  rightIcon={<Percent size={16} />}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </SimpleGrid>
              
              <Box mt={4} p={3} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" color="gray.600">
                  Note: For interstate transactions, enter IGST. For intrastate transactions, enter both CGST and SGST.
                </Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </MotionBox>
      
      {/* Commission Section */}
      <MotionBox variants={sectionVariants} mb={8}>
        <Flex align="center" mb={4}>
          <Icon as={Briefcase} mr={2} color="brand.500" />
          <Heading size="md" fontWeight="600">Commission Information</Heading>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <ChakraInput
            name="commission"
            label="Distributor Commission (%)"
            value={formData.commission}
            onChange={handleNumericChange}
            placeholder="e.g. 5"
            error={errors.commission}
            helper="Fixed percentage for distributor commission calculation"
            rightIcon={<Percent size={16} />}
            type="number"
            min="0"
            max="100"
            step="0.01"
          />
          
          <Box display="flex" alignItems="flex-end">
            <ChakraSwitch
              name="active"
              label="Product Status"
              isChecked={formData.active}
              onChange={handleChange}
              size="lg"
              colorScheme="green"
              mb={2}
            />
            
            <Badge
              ml={3}
              colorScheme={formData.active ? "green" : "red"}
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="medium"
              mb={3}
            >
              {formData.active ? "Active" : "Inactive"}
            </Badge>
          </Box>
        </SimpleGrid>
      </MotionBox>
      
      {/* Summary Section - shows calculated values */}
      <MotionBox variants={sectionVariants} mb={8}>
        <Accordion allowToggle>
          <AccordionItem border="none" bg="gray.50" borderRadius="md">
            <AccordionButton _hover={{ bg: "gray.100" }}>
              <Flex flex="1" align="center">
                <Heading size="sm" fontWeight="600">View Summary</Heading>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">MRP:</Text>
                    <Text fontSize="sm" fontWeight="medium">₹{formData.mrp || '0'}</Text>
                  </HStack>
                  
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Big Unit Price:</Text>
                    <Text fontSize="sm" fontWeight="medium">₹{formData.sp_big_unit || '0'} per {formData.big_unit || 'unit'}</Text>
                  </HStack>
                  
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Small Unit Price:</Text>
                    <Text fontSize="sm" fontWeight="medium">₹{formData.sp_small_unit || '0'} per {formData.small_unit || 'unit'}</Text>
                  </HStack>
                </VStack>
                
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Big to Small Conversion:</Text>
                    <Text fontSize="sm" fontWeight="medium">1 {formData.big_unit || 'big unit'} = {formData.conversion_factor || '0'} {formData.small_unit || 'small units'}</Text>
                  </HStack>
                  
                  {formData.smallest_unit && (
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Small to Smallest Conversion:</Text>
                      <Text fontSize="sm" fontWeight="medium">1 {formData.small_unit || 'small unit'} = {formData.conversion_factor_small_to_smallest || '0'} {formData.smallest_unit || 'smallest units'}</Text>
                    </HStack>
                  )}
                  
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">GST Rate:</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {formData.igst 
                        ? `IGST: ${formData.igst}%` 
                        : `CGST: ${formData.cgst || '0'}% + SGST: ${formData.sgst || '0'}%`}
                    </Text>
                  </HStack>
                </VStack>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </MotionBox>
      
      {/* Form Actions */}
      <Flex justify="end" mt={10} borderTop="1px solid" borderColor="gray.200" pt={6}>
        <ButtonGroup spacing={4}>
          <Button 
            variant="outline" 
            onClick={onCancel}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            colorScheme="brand"
            isLoading={isLoading}
            loadingText="Saving..."
            rightIcon={<ChevronRight size={16} />}
          >
            {product ? 'Update Product' : 'Save Product'}
          </Button>
        </ButtonGroup>
      </Flex>
    </MotionBox>
  );
};

export default ProductForm;