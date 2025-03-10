// src/components/ChakraFormComponents.jsx
import { 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Select,
    Checkbox,
    Radio,
    Switch,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    IconButton,
    HStack,
    VStack,
    Box,
    Text,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useColorModeValue,
    useMergeRefs
  } from '@chakra-ui/react';
  import { motion } from 'framer-motion';
  import { useState, useRef, forwardRef } from 'react';
  import { Calendar, Eye, EyeOff, ChevronDown, Check } from 'lucide-react';
  
  // Animated FormControl that handles form input animations
  const AnimatedFormControl = motion(FormControl);
  
  /**
   * Enhanced Input component with animations and improved styling
   */
  export const ChakraInput = forwardRef(({ 
    name,
    label,
    helper,
    error,
    leftIcon,
    rightIcon,
    type = 'text',
    isRequired = false,
    isInvalid = false,
    isDisabled = false,
    isReadOnly = false,
    showPasswordToggle = true,
    onChange,
    onBlur,
    value,
    placeholder,
    size = 'md',
    variant = 'outline',
    autoComplete,
    ...props 
  }, ref) => {
    // For password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    
    // Calculate final input type
    const inputType = type === 'password' && showPassword ? 'text' : type;
    
    // Background and border colors
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    
    return (
      <AnimatedFormControl 
        isRequired={isRequired} 
        isInvalid={isInvalid || !!error}
        mb={4}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <FormLabel 
            fontSize="sm" 
            fontWeight="medium"
            mb={1}
          >
            {label}
          </FormLabel>
        )}
        
        <InputGroup size={size}>
          {leftIcon && (
            <InputLeftElement pointerEvents="none" color="gray.500">
              {leftIcon}
            </InputLeftElement>
          )}
          
          <Input
            name={name}
            ref={ref}
            type={inputType}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            variant={variant}
            autoComplete={autoComplete}
            borderColor={borderColor}
            bg={bg}
            _hover={{ borderColor: 'brand.400' }}
            _focus={{ boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
            {...props}
          />
          
          {type === 'password' && showPasswordToggle && (
            <InputRightElement>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          )}
          
          {rightIcon && type !== 'password' && (
            <InputRightElement pointerEvents="none" color="gray.500">
              {rightIcon}
            </InputRightElement>
          )}
        </InputGroup>
        
        {helper && !error && (
          <FormHelperText fontSize="xs" color="gray.500">
            {helper}
          </FormHelperText>
        )}
        
        {error && (
          <FormErrorMessage fontSize="xs">
            {error}
          </FormErrorMessage>
        )}
      </AnimatedFormControl>
    );
  });
  
  /**
   * Enhanced Select component with animations and improved styling
   */
  export const ChakraSelect = forwardRef(({
    name,
    label,
    helper,
    error,
    isRequired = false,
    isInvalid = false,
    isDisabled = false,
    onChange,
    onBlur,
    value,
    defaultValue,
    placeholder = "Select an option",
    size = 'md',
    variant = 'outline',
    options = [],
    ...props
  }, ref) => {
    // Background and border colors
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    
    return (
      <AnimatedFormControl 
        isRequired={isRequired} 
        isInvalid={isInvalid || !!error}
        mb={4}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <FormLabel 
            fontSize="sm" 
            fontWeight="medium"
            mb={1}
          >
            {label}
          </FormLabel>
        )}
        
        <InputGroup size={size}>
          <Select
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            isDisabled={isDisabled}
            variant={variant}
            borderColor={borderColor}
            bg={bg}
            _hover={{ borderColor: 'brand.400' }}
            _focus={{ boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
            icon={<ChevronDown size={16} />}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </InputGroup>
        
        {helper && !error && (
          <FormHelperText fontSize="xs" color="gray.500">
            {helper}
          </FormHelperText>
        )}
        
        {error && (
          <FormErrorMessage fontSize="xs">
            {error}
          </FormErrorMessage>
        )}
      </AnimatedFormControl>
    );
  });
  
  /**
   * Enhanced Textarea component with animations and improved styling
   */
  export const ChakraTextarea = forwardRef(({
    name,
    label,
    helper,
    error,
    isRequired = false,
    isInvalid = false,
    isDisabled = false,
    onChange,
    onBlur,
    value,
    placeholder,
    size = 'md',
    variant = 'outline',
    rows,...props
}, ref) => {
  // Background and border colors
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  
  return (
    <AnimatedFormControl 
      isRequired={isRequired} 
      isInvalid={isInvalid || !!error}
      mb={4}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <FormLabel 
          fontSize="sm" 
          fontWeight="medium"
          mb={1}
        >
          {label}
        </FormLabel>
      )}
      
      <Textarea
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        isDisabled={isDisabled}
        variant={variant}
        size={size}
        rows={rows}
        borderColor={borderColor}
        bg={bg}
        _hover={{ borderColor: 'brand.400' }}
        _focus={{ boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
        {...props}
      />
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500">
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs">
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

/**
 * Enhanced DatePicker component with Chakra UI styling
 */
export const ChakraDatePicker = forwardRef(({
  name,
  label,
  helper,
  error,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  onChange,
  onBlur,
  value,
  min,
  max,
  size = 'md',
  ...props
}, ref) => {
  // Background and border colors
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  
  return (
    <AnimatedFormControl 
      isRequired={isRequired} 
      isInvalid={isInvalid || !!error}
      mb={4}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <FormLabel 
          fontSize="sm" 
          fontWeight="medium"
          mb={1}
        >
          {label}
        </FormLabel>
      )}
      
      <InputGroup size={size}>
        <Input
          name={name}
          ref={ref}
          type="date"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          min={min}
          max={max}
          isDisabled={isDisabled}
          borderColor={borderColor}
          bg={bg}
          _hover={{ borderColor: 'brand.400' }}
          _focus={{ boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
          {...props}
        />
        <InputRightElement pointerEvents="none" color="gray.500">
          <Calendar size={16} />
        </InputRightElement>
      </InputGroup>
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500">
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs">
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

/**
 * Enhanced Checkbox component with animations and improved styling
 */
export const ChakraCheckbox = forwardRef(({
  name,
  label,
  helper,
  error,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  isChecked,
  defaultChecked,
  onChange,
  onBlur,
  size = 'md',
  colorScheme = 'brand',
  ...props
}, ref) => {
  return (
    <AnimatedFormControl 
      isInvalid={isInvalid || !!error}
      mb={3}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Checkbox
        name={name}
        ref={ref}
        isChecked={isChecked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
        size={size}
        colorScheme={colorScheme}
        _hover={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        {...props}
      >
        {label}
        {isRequired && <Text as="span" color="red.500" ml={1}>*</Text>}
      </Checkbox>
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500" ml={6}>
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs">
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

/**
 * Enhanced CheckboxGroup component
 */
export const ChakraCheckboxGroup = forwardRef(({
  name,
  label,
  helper,
  error,
  options = [],
  isRequired = false,
  isInvalid = false,
  value,
  defaultValue,
  onChange,
  size = 'md',
  colorScheme = 'brand',
  spacing = 2,
  direction = 'column',
  ...props
}, ref) => {
  return (
    <AnimatedFormControl 
      isRequired={isRequired} 
      isInvalid={isInvalid || !!error}
      mb={4}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <FormLabel 
          fontSize="sm" 
          fontWeight="medium"
          mb={1}
        >
          {label}
        </FormLabel>
      )}
      
      {direction === 'column' ? (
        <VStack align="flex-start" spacing={spacing}>
          {options.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              isChecked={value?.includes(option.value)}
              onChange={(e) => {
                if (onChange) {
                  const newValue = e.target.checked
                    ? [...(value || []), option.value]
                    : (value || []).filter(val => val !== option.value);
                  onChange(newValue);
                }
              }}
              size={size}
              colorScheme={colorScheme}
              {...props}
            >
              {option.label}
            </Checkbox>
          ))}
        </VStack>
      ) : (
        <HStack spacing={spacing} flexWrap="wrap">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              isChecked={value?.includes(option.value)}
              onChange={(e) => {
                if (onChange) {
                  const newValue = e.target.checked
                    ? [...(value || []), option.value]
                    : (value || []).filter(val => val !== option.value);
                  onChange(newValue);
                }
              }}
              size={size}
              colorScheme={colorScheme}
              {...props}
            >
              {option.label}
            </Checkbox>
          ))}
        </HStack>
      )}
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500">
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs">
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

/**
 * Enhanced Radio component
 */
export const ChakraRadio = forwardRef(({
  name,
  label,
  helper,
  error,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  isChecked,
  value,
  defaultChecked,
  onChange,
  onBlur,
  size = 'md',
  colorScheme = 'brand',
  ...props
}, ref) => {
  return (
    <AnimatedFormControl 
      isInvalid={isInvalid || !!error}
      mb={3}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Radio
        name={name}
        ref={ref}
        isChecked={isChecked}
        defaultChecked={defaultChecked}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
        size={size}
        colorScheme={colorScheme}
        _hover={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        {...props}
      >
        {label}
        {isRequired && <Text as="span" color="red.500" ml={1}>*</Text>}
      </Radio>
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500" ml={6}>
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs">
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

/**
 * Enhanced RadioGroup component
 */
export const ChakraRadioGroup = forwardRef(({
  name,
  label,
  helper,
  error,
  options = [],
  isRequired = false,
  isInvalid = false,
  value,
  defaultValue,
  onChange,
  size = 'md',
  colorScheme = 'brand',
  spacing = 2,
  direction = 'column',
  ...props
}, ref) => {
  return (
    <AnimatedFormControl 
      isRequired={isRequired} 
      isInvalid={isInvalid || !!error}
      mb={4}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <FormLabel 
          fontSize="sm" 
          fontWeight="medium"
          mb={1}
        >
          {label}
        </FormLabel>
      )}
      
      {direction === 'column' ? (
        <VStack align="flex-start" spacing={spacing}>
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              isChecked={value === option.value}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              size={size}
              colorScheme={colorScheme}
              name={name}
              {...props}
            >
              {option.label}
            </Radio>
          ))}
        </VStack>
      ) : (
        <HStack spacing={spacing} flexWrap="wrap">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              isChecked={value === option.value}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              size={size}
              colorScheme={colorScheme}
              name={name}
              {...props}
            >
              {option.label}
            </Radio>
          ))}
        </HStack>
      )}
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500">
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs">
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

/**
 * Enhanced Switch component
 */
export const ChakraSwitch = forwardRef(({
  name,
  label,
  helper,
  error,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  isChecked,
  defaultChecked,
  onChange,
  onBlur,
  size = 'md',
  colorScheme = 'brand',
  ...props
}, ref) => {
  return (
    <AnimatedFormControl 
      isInvalid={isInvalid || !!error}
      mb={3}
      display="flex"
      alignItems="center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Switch
        name={name}
        ref={ref}
        id={name}
        isChecked={isChecked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
        size={size}
        colorScheme={colorScheme}
        _hover={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        {...props}
      />
      
      {label && (
        <FormLabel 
          htmlFor={name}
          mb={0}
          ml={2}
          cursor="pointer"
        >
          {label}
          {isRequired && <Text as="span" color="red.500" ml={1}>*</Text>}
        </FormLabel>
      )}
      
      {helper && !error && (
        <FormHelperText fontSize="xs" color="gray.500" ml={2}>
          {helper}
        </FormHelperText>
      )}
      
      {error && (
        <FormErrorMessage fontSize="xs" ml={2}>
          {error}
        </FormErrorMessage>
      )}
    </AnimatedFormControl>
  );
});

// Export all components
export default {
  ChakraInput,
  ChakraSelect,
  ChakraTextarea,
  ChakraDatePicker,
  ChakraCheckbox,
  ChakraCheckboxGroup,
  ChakraRadio,
  ChakraRadioGroup,
  ChakraSwitch
};