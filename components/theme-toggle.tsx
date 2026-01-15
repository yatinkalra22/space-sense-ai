import { useTheme } from '@/hooks/use-theme';
import { Pressable, Text, View } from 'react-native';

export function ThemeToggle() {
  const { isDark, themeMode, setThemeMode, colors, spacing, borderRadius, fontSize } = useTheme();

  const handleToggle = async () => {
    // Cycle through: auto -> light -> dark -> auto
    if (themeMode === 'auto') {
      await setThemeMode('light');
    } else if (themeMode === 'light') {
      await setThemeMode('dark');
    } else {
      await setThemeMode('auto');
    }
  };

  const getIcon = () => {
    if (themeMode === 'auto') {
      return '🔄'; // Auto/System
    }
    return isDark ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (themeMode === 'auto') {
      return 'Auto';
    }
    return isDark ? 'Dark' : 'Light';
  };

  return (
    <Pressable
      onPress={handleToggle}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        opacity: pressed ? 0.7 : 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
      })}
    >
      <Text style={{ fontSize: 18 }}>{getIcon()}</Text>
      <Text style={{
        color: colors.textSecondary,
        fontSize: fontSize.sm,
        fontWeight: '500'
      }}>
        {getLabel()}
      </Text>
    </Pressable>
  );
}