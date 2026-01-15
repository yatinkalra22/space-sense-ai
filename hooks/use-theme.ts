import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { theme } from '@/constants/theme';
import { useThemeContext } from '@/contexts/theme-context';

export function useTheme() {
  const { activeTheme, themeMode, toggleTheme, setThemeMode } = useThemeContext();

  return {
    colors: theme.colors[activeTheme],
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    fontFamily: theme.fontFamily,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    palette: theme.palette,
    isDark: activeTheme === 'dark',
    colorScheme: activeTheme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };
}

/**
 * Hook to create theme-aware styles
 * @param stylesFn Function that takes theme and returns styles
 * @returns Memoized StyleSheet styles
 *
 * @example
 * const styles = useThemedStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   },
 * }));
 */
export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  stylesFn: (theme: ReturnType<typeof useTheme>) => T
): T {
  const theme = useTheme();
  return useMemo(() => StyleSheet.create(stylesFn(theme)), [theme]);
}