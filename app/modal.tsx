import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export default function ModalScreen() {
  const { colors, fontSize, fontWeight } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text, fontSize: fontSize['4xl'], fontWeight: fontWeight.bold }}>
        This is a modal
      </Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text style={{ color: colors.primary, fontSize: fontSize.base, lineHeight: 30 }}>
          Go to home screen
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
