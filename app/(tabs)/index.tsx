import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const { colors, fontSize, fontWeight } = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={[styles.titleContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, fontSize: fontSize['4xl'], fontWeight: fontWeight.bold }}>
          Welcome!
        </Text>
        <HelloWave />
      </View>
      <View style={[styles.stepContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: fontWeight.bold }}>
          Step 1: Try it
        </Text>
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          Edit <Text style={{ fontWeight: fontWeight.semibold }}>app/(tabs)/index.tsx</Text> to see changes.
          Press{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>
      <View style={[styles.stepContainer, { backgroundColor: colors.background }]}>
        <Link href="/modal">
          <Link.Trigger>
            <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: fontWeight.bold }}>
              Step 2: Explore
            </Text>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </Text>
      </View>
      <View style={[styles.stepContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, fontSize: fontSize.xl, fontWeight: fontWeight.bold }}>
          Step 3: Get a fresh start
        </Text>
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          {`When you're ready, run `}
          <Text style={{ fontWeight: fontWeight.semibold }}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>app</Text> directory. This will move the current{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>app</Text> to{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>app-example</Text>.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
