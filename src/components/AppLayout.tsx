import type { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
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
});
export function AppLayout({
  children,
  activeScreen,
  setActiveScreen,
}: {
  children: ReactNode;
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  return (
    <LinearGradient
      colors={['#05010F', '#090318', '#130626']}
      style={styles.appScreen}
    >
      <StatusBar barStyle="light-content" backgroundColor="#05010F" />

      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.appScroll}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        <BottomTabs
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
