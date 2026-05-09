import { useEffect, useRef, type ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { AppScreen } from '../types';
import { BottomTabs } from './BottomTabs';

const styles = StyleSheet.create({
  appScreen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  appScroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 116,
  },
  appContent: {
    flex: 1,
  },
});
export function AppLayout({
  children,
  activeScreen,
  scrollEnabled = true,
  setActiveScreen,
}: {
  children: ReactNode;
  activeScreen: AppScreen;
  scrollEnabled?: boolean;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ animated: false, y: 0 });
  }, [activeScreen]);

  return (
    <LinearGradient
      colors={['#05010F', '#090318', '#130626']}
      style={styles.appScreen}
    >
      <StatusBar barStyle="light-content" backgroundColor="#05010F" />

      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        {scrollEnabled ? (
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.appScroll}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.appContent}>{children}</View>
        )}

        <BottomTabs
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
