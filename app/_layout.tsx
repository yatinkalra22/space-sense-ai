import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { theme } from '@/constants/theme';
import { ThemeProvider, useThemeContext } from '@/contexts/theme-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.light.primary,
    background: theme.colors.light.background,
    card: theme.colors.light.surface,
    text: theme.colors.light.text,
    border: theme.colors.light.border,
    notification: theme.colors.light.accent,
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.colors.dark.primary,
    background: theme.colors.dark.background,
    card: theme.colors.dark.surface,
    text: theme.colors.dark.text,
    border: theme.colors.dark.border,
    notification: theme.colors.dark.accent,
  },
};

function RootLayoutNav() {
  const { activeTheme } = useThemeContext();

  return (
    <NavThemeProvider value={activeTheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}