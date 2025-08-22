'use client';

import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d3ff',
    300: '#a4b8ff',
    400: '#8193ff',
    500: '#6366f1', // Primary indigo
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
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
  // Custom dark theme colors
  dark: {
    bg: '#0a0a0a',
    sidebar: '#111111',
    card: '#1a1a1a',
    border: '#2a2a2a',
    text: '#ffffff',
    muted: '#9ca3af',
    accent: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  }
};

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
    variants: {
      ghost: {
        _hover: {
          bg: 'rgba(99, 102, 241, 0.1)',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'dark.card',
        border: '1px solid',
        borderColor: 'dark.border',
        borderRadius: '2xl',
        shadow: 'sm',
        _hover: {
          shadow: 'md',
        },
        transition: 'all 0.2s',
      },
    },
  },
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      fontWeight: '600',
      fontSize: 'xs',
    },
  },
  Progress: {
    baseStyle: {
      track: {
        bg: 'rgba(156, 163, 175, 0.2)',
        borderRadius: 'full',
      },
    },
  },
};

const styles = {
  global: () => ({
    body: {
      bg: 'dark.bg',
      color: 'dark.text',
      transition: 'all 0.2s',
    },
    '*': {
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  }),
};

const fonts = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
};

const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(99, 102, 241, 0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

const theme = extendTheme({
  config,
  colors,
  components,
  styles,
  fonts,
  fontWeights,
  radii,
  shadows,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
