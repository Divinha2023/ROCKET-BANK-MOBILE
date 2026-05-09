import { StyleSheet, View } from 'react-native';
import type { AppScreen } from '../types';
import { TabButton } from './TabButton';

const styles = StyleSheet.create({
  bottomTabsWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    height: 78,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 18,
  },
  bottomTabs: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#14141E',
    borderWidth: 1,
    borderColor: '#252535',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
});
export function BottomTabs({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  return (
    <View style={styles.bottomTabsWrapper}>
      <View style={styles.bottomTabs}>
        <TabButton
          icon="home-outline"
          label="Início"
          active={activeScreen === 'home'}
          onPress={() => setActiveScreen('home')}
        />

        <TabButton
          icon="card-outline"
          label="Cartões"
          active={activeScreen === 'cards'}
          onPress={() => setActiveScreen('cards')}
        />

        <TabButton
          icon="swap-horizontal-outline"
          label="Transferir"
          active={activeScreen === 'pix'}
          onPress={() => setActiveScreen('pix')}
        />

        <TabButton
          icon="trending-up-outline"
          label="Invest"
          active={activeScreen === 'investments'}
          onPress={() => setActiveScreen('investments')}
        />

        <TabButton
          icon="storefront-outline"
          label="Shopping"
          active={activeScreen === 'shopping'}
          onPress={() => setActiveScreen('shopping')}
        />

        <TabButton
          icon="person-outline"
          label="Perfil"
          active={activeScreen === 'profile'}
          onPress={() => setActiveScreen('profile')}
        />
      </View>
    </View>
  );
}
