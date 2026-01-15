import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

import type { ThemeContextType, ThemeMode } from '@/types/theme.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = '@space_sense_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  
  const activeTheme: 'light' | 'dark' = 
    themeMode === 'auto' 
      ? (deviceColorScheme ?? 'light')
      : themeMode;

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto')) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newMode = activeTheme === 'light' ? 'dark' : 'light';
    await setThemeMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, activeTheme, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider. Make sure your component is wrapped with <ThemeProvider>.');
  }
  return context;
}