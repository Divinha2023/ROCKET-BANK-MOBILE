import { useState } from 'react';
import type { AppScreen } from './types';
import { AppLayout } from './components/AppLayout';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CardsScreen } from './screens/CardsScreen';
import { PixScreen } from './screens/PixScreen';
import { ShoppingScreen } from './screens/ShoppingScreen';
import { CashbackScreen } from './screens/CashbackScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { SupportScreen } from './screens/SupportScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StatementScreen } from './screens/StatementScreen';

export default function App() {
  const [logged, setLogged] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');

  if (!logged) {
    return <LoginScreen onLogin={() => setLogged(true)} />;
  }

  function renderActiveScreen() {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'cards':
        return <CardsScreen />;
      case 'pix':
        return <PixScreen />;
      case 'shopping':
        return <ShoppingScreen setActiveScreen={setActiveScreen} />;
      case 'cashback':
        return <CashbackScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'support':
        return <SupportScreen />;
      case 'profile':
        return (
          <ProfileScreen
            setActiveScreen={setActiveScreen}
            onLogout={() => setLogged(false)}
          />
        );
      case 'statement':
        return <StatementScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  }

  return (
    <AppLayout activeScreen={activeScreen} setActiveScreen={setActiveScreen}>
      {renderActiveScreen()}
    </AppLayout>
  );
}
