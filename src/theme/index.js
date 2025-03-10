// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';

// Defining custom colors based on Samridhi Mart branding
const colors = {
  brand: {
    50: '#e9ecf6',
    100: '#c7d0e8',
    200: '#a5b3d9',
    300: '#8397ca',
    400: '#617abb',
    500: '#3d5291', // Primary brand color
    600: '#344780',
    700: '#2d3e6d',
    800: '#25345c',
    900: '#1e2a4a',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#ecfdf5',
    500: '#10b981',
    700: '#047857',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    700: '#b45309',
  },
  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    700: '#1d4ed8',
  },
};

// Typography
const fonts = {
  heading: "'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 500,
      borderRadius: 'md',
    },
    variants: {
      primary: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          _disabled: {
            bg: 'brand.500',
          },
        },
        _active: { bg: 'brand.700' },
      },
      secondary: {
        bg: 'white',
        color: 'gray.700',
        border: '1px solid',
        borderColor: 'gray.200',
        _hover: {
          bg: 'gray.50',
        },
        _active: { bg: 'gray.100' },
      },
      outline: {
        bg: 'transparent',
        color: 'brand.500',
        border: '1px solid',
        borderColor: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
        _active: { bg: 'brand.100' },
      },
      ghost: {
        color: 'gray.700',
        _hover: {
          bg: 'gray.100',
        },
        _active: { bg: 'gray.200' },
      },
    },
    defaultProps: {
      variant: 'primary',
      size: 'md',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'hidden',
      },
      header: {
        p: 6,
        borderBottom: '1px solid',
        borderColor: 'gray.100',
      },
      body: {
        p: 6,
      },
      footer: {
        p: 6,
        borderTop: '1px solid',
        borderColor: 'gray.100',
        bg: 'gray.50',
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          borderRadius: 'md',
          borderColor: 'gray.200',
          _hover: {
            borderColor: 'gray.300',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
    defaultProps: {
      variant: 'outline',
    },
  },
  Table: {
    variants: {
      simple: {
        th: {
          bg: 'gray.50',
          color: 'gray.600',
          fontSize: 'xs',
          fontWeight: 'semibold',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          px: 6,
          py: 3,
        },
        td: {
          px: 6,
          py: 4,
          borderBottom: '1px solid',
          borderColor: 'gray.100',
        },
        tbody: {
          tr: {
            _hover: {
              bg: 'gray.50',
            },
          },
        },
      },
    },
  },
  Drawer: {
    baseStyle: {
      dialog: {
        borderRadius: 'md',
      },
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        borderRadius: 'lg',
      },
    },
  },
};

// Global styles
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
    },
  },
};

// Layout styles
const layerStyles = {
  card: {
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: 'sm',
    overflow: 'hidden',
  },
  sidebar: {
    bg: 'white',
    borderRight: '1px solid',
    borderColor: 'gray.100',
  },
  header: {
    bg: 'white',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
    boxShadow: 'sm',
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  styles,
  layerStyles,
});

export default theme;