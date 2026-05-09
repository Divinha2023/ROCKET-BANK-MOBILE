import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { AppScreen } from './types';
import { AppLayout } from './components/AppLayout';
import { LoginScreen } from './screens/LoginScreen';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CardsScreen } from './screens/CardsScreen';
import { PixScreen } from './screens/PixScreen';
import { ShoppingScreen } from './screens/ShoppingScreen';
import { CashbackScreen } from './screens/CashbackScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { SupportScreen } from './screens/SupportScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StatementScreen } from './screens/StatementScreen';
import { InvoiceScreen } from './screens/InvoiceScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [logged, setLogged] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [invoicePaid, setInvoicePaid] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowSplash(false), 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!logged) {
    return <LoginScreen onLogin={() => setLogged(true)} />;
  }

  function renderActiveScreen() {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} />;
      case 'cards':
        return (
          <CardsScreen
            invoicePaid={invoicePaid}
            setActiveScreen={setActiveScreen}
          />
        );
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
      case 'invoice':
        return (
          <InvoiceScreen
            invoicePaid={invoicePaid}
            onPayInvoice={() => setInvoicePaid(true)}
            setActiveScreen={setActiveScreen}
          />
        );
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
