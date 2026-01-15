import { Platform } from 'react-native';

/**
 * Design tokens - Single source of truth for your app's design system
 * Path: constants/theme.ts
 */

export const palette = {
  // Primary colors
  purple: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',  // Main purple
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',  // Main blue
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // Neutral colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Special
  white: '#FFFFFF',
  black: '#000000',
};

// Spacing system (8pt grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
} as const;

// Typography scale
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Font families by platform
export const fontFamily = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    mono: 'Menlo',
    rounded: 'SF Pro Rounded',
  },
  android: {
    sans: 'Roboto',
    serif: 'serif',
    mono: 'monospace',
    rounded: 'Roboto',
  },
  web: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "'Fira Code', 'Courier New', monospace",
    rounded: "'SF Pro Rounded', system-ui, sans-serif",
  },
  default: {
    sans: 'System',
    serif: 'serif',
    mono: 'monospace',
    rounded: 'System',
  },
});

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

// Theme definitions
export const lightTheme = {
  // Backgrounds
  background: palette.white,
  backgroundSecondary: palette.gray[50],
  backgroundTertiary: palette.gray[100],
  
  // Surfaces
  surface: palette.white,
  surfaceSecondary: palette.gray[50],
  
  // Text
  text: palette.gray[900],
  textSecondary: palette.gray[600],
  textTertiary: palette.gray[500],
  textInverse: palette.white,
  
  // Brand colors
  primary: palette.purple[600],
  primaryHover: palette.purple[700],
  primaryLight: palette.purple[100],
  
  accent: palette.blue[500],
  accentHover: palette.blue[600],
  accentLight: palette.blue[100],
  
  // Borders
  border: palette.gray[200],
  borderSecondary: palette.gray[300],
  borderFocus: palette.purple[500],
  
  // Icons & UI elements
  icon: palette.gray[600],
  iconSecondary: palette.gray[400],
  iconActive: palette.purple[600],
  
  // Tab bar
  tabIconDefault: palette.gray[500],
  tabIconSelected: palette.purple[600],
  tabBackground: palette.white,
  
  // Semantic
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,
  
  // Special
  overlay: 'rgba(0, 0, 0, 0.5)',
  disabled: palette.gray[300],
} as const;

export const darkTheme = {
  // Backgrounds
  background: palette.gray[950],
  backgroundSecondary: palette.gray[900],
  backgroundTertiary: palette.gray[800],
  
  // Surfaces
  surface: palette.gray[900],
  surfaceSecondary: palette.gray[800],
  
  // Text
  text: palette.gray[50],
  textSecondary: palette.gray[300],
  textTertiary: palette.gray[400],
  textInverse: palette.gray[900],
  
  // Brand colors
  primary: palette.purple[500],
  primaryHover: palette.purple[400],
  primaryLight: palette.purple[900],
  
  accent: palette.blue[400],
  accentHover: palette.blue[300],
  accentLight: palette.blue[900],
  
  // Borders
  border: palette.gray[700],
  borderSecondary: palette.gray[600],
  borderFocus: palette.purple[500],
  
  // Icons & UI elements
  icon: palette.gray[300],
  iconSecondary: palette.gray[500],
  iconActive: palette.purple[400],
  
  // Tab bar
  tabIconDefault: palette.gray[400],
  tabIconSelected: palette.purple[400],
  tabBackground: palette.gray[900],
  
  // Semantic
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,
  
  // Special
  overlay: 'rgba(0, 0, 0, 0.7)',
  disabled: palette.gray[700],
} as const;

// Export unified theme object
export const theme = {
  palette,
  spacing,
  fontSize,
  fontWeight,
  fontFamily,
  borderRadius,
  shadows,
  colors: {
    light: lightTheme,
    dark: darkTheme,
  },
} as const;

// Backward compatibility exports
export const Fonts = fontFamily;
export const Colors = {
  light: lightTheme,
  dark: darkTheme,
};

// Type exports for TypeScript
export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
export type Spacing = keyof typeof spacing;
export type FontSize = keyof typeof fontSize;