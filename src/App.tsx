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
import {
  InvestmentsScreen,
  type InvestmentAsset,
  type InvestmentPortfolio,
} from './screens/InvestmentsScreen';
import { ShoppingScreen } from './screens/ShoppingScreen';
import { CashbackScreen } from './screens/CashbackScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { SupportScreen } from './screens/SupportScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StatementScreen } from './screens/StatementScreen';
import { InvoiceScreen } from './screens/InvoiceScreen';
import { userCards } from './data/mockData';
import type { BankStatementTransaction, UserCard } from './types';
import { formatCurrency, parseCurrency } from './utils/currency';

const initialStatementTransactions: BankStatementTransaction[] = [
  {
    icon: 'briefcase-outline',
    id: 'initial-salary',
    positive: true,
    subtitle: 'Empresa',
    title: 'Salário recebido',
    type: 'entry',
    value: '+ R$ 4.500,00',
  },
  {
    icon: 'sparkles-outline',
    id: 'initial-cashback-gold',
    positive: true,
    subtitle: 'Benefícios',
    title: 'Cashback Gold',
    type: 'cashback',
    value: '+ R$ 35,00',
  },
  {
    icon: 'film-outline',
    id: 'initial-netflix',
    subtitle: 'Assinatura',
    title: 'Pagamento Netflix',
    type: 'expense',
    value: '- R$ 55,90',
  },
  {
    icon: 'basket-outline',
    id: 'initial-market',
    subtitle: 'Alimentação',
    title: 'Supermercado',
    type: 'expense',
    value: '- R$ 248,32',
  },
];

const invoiceCashbackRate = 0.03;

function formatStatementMoment() {
  return new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
  });
}

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
  const pixDailyLimit = 6500;
  const todayKey = new Date().toISOString().slice(0, 10);
  const [showSplash, setShowSplash] = useState(true);
  const [logged, setLogged] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [accountBalance, setAccountBalance] = useState(accountLimit);
  const [cashbackBalance, setCashbackBalance] = useState(248.9);
  const [cards, setCards] = useState<UserCard[]>(userCards);
  const [investmentPortfolio, setInvestmentPortfolio] =
    useState<InvestmentPortfolio>({});
  const [statementTransactions, setStatementTransactions] = useState<
    BankStatementTransaction[]
  >(initialStatementTransactions);
  const [pixDailyUsage, setPixDailyUsage] = useState({
    amount: 0,
    date: todayKey,
  });
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

  function addStatementTransaction(
    transaction: Omit<BankStatementTransaction, 'id'>
  ) {
    setStatementTransactions((current) => [
      {
        ...transaction,
        id: `transaction-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
      },
      ...current,
    ]);
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
      const cashbackAmount = amount * invoiceCashbackRate;
      if (!debitAccount(amount)) {
        return false;
      }

      setPaidInvoiceCardIds((current) => ({
        ...current,
        [card.id]: true,
      }));
      const statementMoment = formatStatementMoment();
      addStatementTransaction({
        icon: 'receipt-outline',
        subtitle: `${card.title} - ${statementMoment}`,
        title: 'Pagamento de fatura',
        type: 'expense',
        value: `- ${formatCurrency(amount)}`,
      });

      if (cashbackAmount > 0) {
        setCashbackBalance((current) => current + cashbackAmount);
        addStatementTransaction({
          icon: 'sparkles-outline',
          positive: true,
          subtitle: `${card.title} - 3% - ${statementMoment}`,
          title: 'Cashback da fatura',
          type: 'cashback',
          value: `+ ${formatCurrency(cashbackAmount)}`,
        });
      }

      return true;
    }

    const pixUsedToday =
      pixDailyUsage.date === todayKey ? pixDailyUsage.amount : 0;
    const pixDailyRemaining = Math.max(pixDailyLimit - pixUsedToday, 0);

    function sendPix(amount: number, recipientName: string) {
      const currentPixUsed =
        pixDailyUsage.date === todayKey ? pixDailyUsage.amount : 0;

      if (amount <= 0) {
        return 'invalid';
      }

      if (currentPixUsed + amount > pixDailyLimit) {
        return 'daily-limit';
      }

      if (!debitAccount(amount)) {
        return 'balance';
      }

      setPixDailyUsage({
        amount: currentPixUsed + amount,
        date: todayKey,
      });
      addStatementTransaction({
        icon: 'send-outline',
        subtitle: `Para ${recipientName} - ${formatStatementMoment()}`,
        title: 'Pix enviado',
        type: 'expense',
        value: `- ${formatCurrency(amount)}`,
      });
      return 'success';
    }

    function addShoppingCashback(amount: number) {
      if (amount <= 0) {
        return;
      }

      setCashbackBalance((current) => current + amount);
    }

    function finishShoppingPurchase({
      amount,
      cashback,
      itemCount,
      orderCode,
    }: {
      amount: number;
      cashback: number;
      itemCount: number;
      orderCode: string;
    }) {
      const statementMoment = formatStatementMoment();

      if (cashback > 0) {
        addStatementTransaction({
          icon: 'sparkles-outline',
          positive: true,
          subtitle: `Rocket Shopping - ${statementMoment}`,
          title: 'Cashback recebido',
          type: 'cashback',
          value: `+ ${formatCurrency(cashback)}`,
        });
      }

      addStatementTransaction({
        icon: 'bag-check-outline',
        subtitle: `${itemCount} ${
          itemCount === 1 ? 'item' : 'itens'
        } - Pedido ${orderCode} - ${statementMoment}`,
        title: 'Compra Rocket Shopping',
        type: 'expense',
        value: `- ${formatCurrency(amount)}`,
      });
    }

    function finishInvestment(amount: number, asset: InvestmentAsset) {
      if (!debitAccount(amount)) {
        return false;
      }

      addStatementTransaction({
        icon: 'trending-up-outline',
        subtitle: `${asset.name} - ${formatStatementMoment()}`,
        title: 'Investimento realizado',
        type: 'expense',
        value: `- ${formatCurrency(amount)}`,
      });
      return true;
    }

    switch (activeScreen) {
      case 'home':
        return (
          <HomeScreen
            accountBalance={accountBalance}
            cashbackBalance={cashbackBalance}
            statementTransactions={statementTransactions}
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
            onSendPix={sendPix}
            pixDailyRemaining={pixDailyRemaining}
          />
        );
      case 'investments':
        return (
          <InvestmentsScreen
            accountBalance={accountBalance}
            onFinishInvestment={finishInvestment}
            portfolio={investmentPortfolio}
            setPortfolio={setInvestmentPortfolio}
          />
        );
      case 'shopping':
        return (
          <ShoppingScreen
            accountBalance={accountBalance}
            onEarnCashback={addShoppingCashback}
            onDebitAccount={debitAccount}
            onRegisterPurchase={finishShoppingPurchase}
            setActiveScreen={setActiveScreen}
          />
        );
      case 'cashback':
        return <CashbackScreen cashbackBalance={cashbackBalance} />;
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
        return <StatementScreen transactions={statementTransactions} />;
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
            cashbackBalance={cashbackBalance}
            statementTransactions={statementTransactions}
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
