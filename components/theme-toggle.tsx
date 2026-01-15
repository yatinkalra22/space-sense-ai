import { useTheme } from '@/hooks/use-theme';
import { Pressable, Text } from 'react-native';

export function ThemeToggle() {
  const { isDark, toggleTheme, colors, spacing, borderRadius } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: borderRadius.lg,
        padding: spacing.sm,
        opacity: pressed ? 0.7 : 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
      })}
    >
      <Text style={{ fontSize: 20 }}>
        {isDark ? '🌙' : '☀️'}
      </Text>
    </Pressable>
  );
}