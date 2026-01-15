import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemeToggle } from '@/components/theme-toggle';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const { colors, fontFamily, fontSize, fontWeight } = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <View style={[styles.titleContainer, { backgroundColor: colors.background }]}>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize['4xl'],
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily.rounded,
          }}>
          Explore
        </Text>
        <ThemeToggle />
      </View>
      <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
        This app includes example code to help you get started.
      </Text>
      <Collapsible title="File-based routing">
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          This app has two screens:{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>app/(tabs)/index.tsx</Text> and{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>app/(tabs)/explore.tsx</Text>
        </Text>
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          The layout file in <Text style={{ fontWeight: fontWeight.semibold }}>app/(tabs)/_layout.tsx</Text>{' '}
          sets up the tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text style={{ color: colors.primary, fontSize: fontSize.base, lineHeight: 30 }}>Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>w</Text> in the terminal running this project.
        </Text>
      </Collapsible>
      <Collapsible title="Images">
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          For static images, you can use the <Text style={{ fontWeight: fontWeight.semibold }}>@2x</Text> and{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>@3x</Text> suffixes to provide files for
          different screen densities
        </Text>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text style={{ color: colors.primary, fontSize: fontSize.base, lineHeight: 30 }}>Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          This template has light and dark mode support. The{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>useTheme()</Text> hook lets you access
          theme colors, and the app automatically adapts to light/dark mode.
        </Text>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text style={{ color: colors.primary, fontSize: fontSize.base, lineHeight: 30 }}>Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
          This template includes an example of an animated component. The{' '}
          <Text style={{ fontWeight: fontWeight.semibold }}>components/HelloWave.tsx</Text> component uses
          the powerful{' '}
          <Text style={{ fontWeight: fontWeight.semibold, fontFamily: fontFamily.mono }}>
            react-native-reanimated
          </Text>{' '}
          library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <Text style={{ color: colors.text, fontSize: fontSize.base, lineHeight: 24 }}>
              The <Text style={{ fontWeight: fontWeight.semibold }}>components/ParallaxScrollView.tsx</Text>{' '}
              component provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});