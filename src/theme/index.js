// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';
import { enhancedComponents, keyframes, globalStyles } from './extensions';

// Defining custom colors based on Samridhi Mart branding
const colors = {
  brand: {
    50: '#eef1fa',
    100: '#d1d9ef',
    200: '#b3c0e4',
    300: '#94a7d9',
    400: '#768ece',
    500: '#3d5291', // Primary brand color
    600: '#344784',
    700: '#2c3c78',
    800: '#23316b',
    900: '#1b2555',
  },
  accent: {
    50: '#fff8e6',
    100: '#ffedb3',
    200: '#ffe280',
    300: '#ffd74d',
    400: '#ffcc1a',
    500: '#ffc107', // Accent color
    600: '#e6ac00',
    700: '#cc9800',
    800: '#b38400',
    900: '#8f6900',
  },
  success: {
    50: '#e6f6f0',
    100: '#c3e9da',
    200: '#9fdcc4',
    300: '#7bcfae',
    400: '#57c298',
    500: '#10b981',
    600: '#0ea874',
    700: '#0c9767',
    800: '#0a865a',
    900: '#08754d',
  },
  error: {
    50: '#feebea',
    100: '#fcc7c3',
    200: '#faa49d',
    300: '#f78076',
    400: '#f55c50',
    500: '#ef4444',
    600: '#da3d3d',
    700: '#c43737',
    800: '#af3030',
    900: '#9a2a2a',
  },
  warning: {
    50: '#fff7e6',
    100: '#ffebb3',
    200: '#ffdf80',
    300: '#ffd24d',
    400: '#ffc61a',
    500: '#f59e0b',
    600: '#df8e0a',
    700: '#c67f09',
    800: '#ae6f08',
    900: '#966007',
  },
  info: {
    50: '#e6f3ff',
    100: '#b3ddff',
    200: '#80c7ff',
    300: '#4db0ff',
    400: '#1a9aff',
    500: '#3b82f6',
    600: '#1a75e0',
    700: '#1768c7',
    800: '#155bae',
    900: '#124e95',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Typography
const fonts = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

// Shadows
const shadows = {
  xs: '0 1px 2px rgba(16, 24, 40, 0.05)',
  sm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
  md: '0 4px 6px -1px rgba(16, 24, 40, 0.1), 0 2px 4px -1px rgba(16, 24, 40, 0.06)',
  lg: '0 10px 15px -3px rgba(16, 24, 40, 0.1), 0 4px 6px -2px rgba(16, 24, 40, 0.05)',
  xl: '0 20px 25px -5px rgba(16, 24, 40, 0.1), 0 10px 10px -5px rgba(16, 24, 40, 0.04)',
  '2xl': '0 25px 50px -12px rgba(16, 24, 40, 0.25)',
  card: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
  dropdown: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
};

// Define animation keyframes
const customKeyframes = keyframes;

// Bring in enhanced component styles from extensions
const components = enhancedComponents;

// Global styles
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
    },
    '*::selection': {
      bg: 'brand.100',
    },
    // Add global animation and utility classes
    ...globalStyles
  },
};

// Layer styles for reusable component styles
const layerStyles = {
  card: {
    bg: 'white',
    borderRadius: 'xl',
    boxShadow: 'card',
    overflow: 'hidden',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      boxShadow: 'lg',
      transform: 'translateY(-2px)',
    },
  },
  cardCompact: {
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: 'sm',
    p: 4,
  },
  cardStatistic: {
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: 'sm',
    p: 4,
    border: '1px solid',
    borderColor: 'gray.100',
  },
  sidebar: {
    bg: 'white',
    borderRight: '1px solid',
    borderColor: 'gray.100',
    boxShadow: 'xs',
  },
  header: {
    bg: 'white',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
    boxShadow: 'sm',
    backdropFilter: 'blur(8px)',
  },
  headerGradient: {
    bgGradient: 'linear(to-r, brand.600, brand.500)',
    color: 'white',
  },
  formInput: {
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'gray.300',
    borderRadius: 'md',
    boxShadow: 'xs',
    _hover: {
      borderColor: 'gray.400',
    },
    _focus: {
      borderColor: 'brand.500',
      boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
    },
    transition: 'all 0.2s',
  },
  glassmorphism: {
    bg: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'xl',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
};

// Custom text styles
const textStyles = {
  h1: {
    fontSize: ['2xl', '3xl'],
    fontWeight: 'bold',
    lineHeight: '110%',
    letterSpacing: '-0.01em',
  },
  h2: {
    fontSize: ['xl', '2xl'],
    fontWeight: 'semibold',
    lineHeight: '110%',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: ['lg', 'xl'],
    fontWeight: 'medium',
    lineHeight: '110%',
  },
  h4: {
    fontSize: ['md', 'lg'],
    fontWeight: 'medium',
    lineHeight: '110%',
  },
  subtitle: {
    fontSize: 'md',
    fontWeight: 'normal',
    color: 'gray.600',
    lineHeight: '140%',
  },
  formLabel: {
    fontWeight: 'medium',
    fontSize: 'sm',
    color: 'gray.700',
  },
};

// Custom breakpoints for better responsiveness
const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
};

// Create and export the extended theme
const theme = extendTheme({
  colors,
  fonts,
  shadows,
  components,
  styles,
  layerStyles,
  textStyles,
  breakpoints,
  keyframes: customKeyframes
});

export default theme;