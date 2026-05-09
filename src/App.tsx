import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { AppScreen } from './types';
import { AppLayout } from './components/AppLayout';
import { AppPopupProvider } from './components/AppPopup';
import { LoginScreen } from './screens/LoginScreen';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CardsScreen } from './screens/CardsScreen';
import { PixScreen } from './screens/PixScreen';
import { InvestmentsScreen } from './screens/InvestmentsScreen';
import { ShoppingScreen } from './screens/ShoppingScreen';
import { CashbackScreen } from './screens/CashbackScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { SupportScreen } from './screens/SupportScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StatementScreen } from './screens/StatementScreen';
import { InvoiceScreen } from './screens/InvoiceScreen';
import { userCards } from './data/mockData';
import type { UserCard } from './types';
import { parseCurrency } from './utils/currency';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppPopupProvider>
        <AppContent />
      </AppPopupProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const accountLimit = 50000;
  const [showSplash, setShowSplash] = useState(true);
  const [logged, setLogged] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [accountBalance, setAccountBalance] = useState(accountLimit);
  const [cards, setCards] = useState<UserCard[]>(userCards);
  const [paidInvoiceCardIds, setPaidInvoiceCardIds] = useState<
    Record<string, boolean>
  >({});
  const [selectedInvoiceCardId, setSelectedInvoiceCardId] = useState(
    userCards[0].id
  );

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
    const selectedInvoiceCard =
      cards.find((card) => card.id === selectedInvoiceCardId) ?? cards[0];
    const selectedInvoicePaid = Boolean(
      paidInvoiceCardIds[selectedInvoiceCard.id]
    );

    function debitAccount(amount: number) {
      if (amount <= 0 || amount > accountBalance) {
        return false;
      }

      setAccountBalance((current) => current - amount);
      return true;
    }

    function payInvoice(card: UserCard) {
      if (paidInvoiceCardIds[card.id]) {
        return false;
      }

      const amount = parseCurrency(card.invoiceTotal);
      if (!debitAccount(amount)) {
        return false;
      }

      setPaidInvoiceCardIds((current) => ({
        ...current,
        [card.id]: true,
      }));
      return true;
    }

    switch (activeScreen) {
      case 'home':
        return (
          <HomeScreen
            accountBalance={accountBalance}
            setActiveScreen={setActiveScreen}
          />
        );
      case 'cards':
        return (
          <CardsScreen
            cards={cards}
            paidInvoiceCardIds={paidInvoiceCardIds}
            setCards={setCards}
            setActiveScreen={setActiveScreen}
            setSelectedInvoiceCardId={setSelectedInvoiceCardId}
          />
        );
      case 'pix':
        return (
          <PixScreen
            accountBalance={accountBalance}
            onDebitAccount={debitAccount}
          />
        );
      case 'investments':
        return <InvestmentsScreen />;
      case 'shopping':
        return (
          <ShoppingScreen
            accountBalance={accountBalance}
            onDebitAccount={debitAccount}
            setActiveScreen={setActiveScreen}
          />
        );
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
            accountBalance={accountBalance}
            accountLimit={accountLimit}
            invoiceCard={selectedInvoiceCard}
            invoicePaid={selectedInvoicePaid}
            onPayInvoice={() => payInvoice(selectedInvoiceCard)}
            setActiveScreen={setActiveScreen}
          />
        );
      default:
        return (
          <HomeScreen
            accountBalance={accountBalance}
            setActiveScreen={setActiveScreen}
          />
        );
    }
  }

  return (
    <AppLayout
      activeScreen={activeScreen}
      scrollEnabled={activeScreen !== 'shopping'}
      setActiveScreen={setActiveScreen}
    >
      {renderActiveScreen()}
    </AppLayout>
  );
}
