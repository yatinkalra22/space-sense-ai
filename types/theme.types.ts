import { lightTheme } from '@/constants/theme';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeColors = typeof lightTheme;

export interface ThemeContextType {
  themeMode: ThemeMode;
  activeTheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
}
