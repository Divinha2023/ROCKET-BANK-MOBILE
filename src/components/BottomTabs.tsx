import { StyleSheet, View } from 'react-native';
import type { AppScreen } from '../types';
import { colors } from '../theme';
import { TabButton } from './TabButton';
import { PixIcon } from './PixIcon';

export function BottomTabs({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const isPixActive = activeScreen === 'pix';

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
          customIcon={
            <PixIcon
              size={22}
              color={isPixActive ? colors.white : 'rgba(255,255,255,0.55)'}
            />
          }
          label="Transferir"
          active={isPixActive}
          onPress={() => setActiveScreen('pix')}
        />

        <TabButton
          icon="analytics-outline"
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
