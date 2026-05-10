import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SCREEN_HEIGHT, colors } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { cardInvoice } from '../data/mockData';
import type { AppScreen, UserCard } from '../types';
import { formatCurrency } from '../utils/currency';

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 13,
    fontWeight: '800',
  },
  heroValue: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 6,
  },
  statusPill: {
    borderRadius: 999,
    backgroundColor: 'rgba(5,1,15,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  statusPillText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  heroBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroDetail: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    fontWeight: '800',
  },
  summaryRow: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 12,
    marginBottom: 18,
  },
  topPayButton: {
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purpleStrong,
    marginBottom: 18,
  },
  topPayButtonDisabled: {
    opacity: 0.48,
  },
  summaryItem: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 6,
  },
  summaryDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.08)',
  },
  summaryLabel: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  invoiceCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 16,
    marginBottom: 18,
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  invoiceTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  invoiceSubtitle: {
    color: colors.mutedDark,
    fontSize: 12,
    marginBottom: 10,
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  itemDate: {
    color: colors.mutedDark,
    fontSize: 12,
    marginTop: 3,
  },
  itemValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  paymentCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 16,
  },
  paymentTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  paymentText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 14,
  },
  primaryButton: {
    height: 50,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purpleStrong,
    marginBottom: 10,
  },
  primaryButtonDisabled: {
    opacity: 0.48,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  loadingPaymentScreen: {
    minHeight: Math.max(SCREEN_HEIGHT - 220, 430),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 64,
  },
  loadingPaymentBadge: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: 'rgba(111,44,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.34)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  loadingPaymentTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  loadingPaymentText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    textAlign: 'center',
  },
});

export function InvoiceScreen({
  accountBalance,
  accountLimit,
  invoiceCard,
  invoicePaid,
  onPayInvoice,
  setActiveScreen,
}: {
  accountBalance: number;
  accountLimit: number;
  invoiceCard: UserCard;
  invoicePaid: boolean;
  onPayInvoice: () => boolean;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const paymentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
      }
    },
    []
  );

  function handlePayInvoice() {
    if (isPaymentLoading) {
      return;
    }

    if (invoicePaid) {
      Alert.alert('Fatura', 'Esta fatura já está paga.');
      return;
    }

    if (!onPayInvoice()) {
      Alert.alert(
        'Saldo insuficiente',
        'Não há saldo suficiente para pagar esta fatura agora.'
      );
      return;
    }

    setPaymentLoading(true);

    paymentTimeoutRef.current = setTimeout(() => {
      setPaymentLoading(false);
      paymentTimeoutRef.current = null;
      Alert.alert(
        'Fatura paga',
        'Pagamento confirmado. O saldo da conta foi atualizado.'
      );
    }, 650);
  }

  if (isPaymentLoading) {
    return (
      <View style={styles.loadingPaymentScreen}>
        <View style={styles.loadingPaymentBadge}>
          <ActivityIndicator color={colors.white} size="large" />
        </View>
        <Text style={styles.loadingPaymentTitle}>Processando pagamento</Text>
        <Text style={styles.loadingPaymentText}>
          Estamos baixando a fatura e atualizando o saldo da sua conta.
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScreenTitle
        title="Fatura"
        subtitle={invoiceCard.title}
      />

      <LinearGradient
        colors={
          invoicePaid
            ? ['rgba(34,197,94,0.92)', 'rgba(13,92,48,0.78)']
            : [colors.purpleStrong, colors.purpleSoft, colors.orange]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroLabel}>Total da fatura</Text>
            <Text style={styles.heroValue}>
              {invoicePaid ? 'R$ 0' : invoiceCard.invoiceTotal}
            </Text>
          </View>

          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {invoicePaid ? 'Paga' : 'Aberta'}
            </Text>
          </View>
        </View>

        <View style={styles.heroBottom}>
          <Text style={styles.heroDetail}>
            Vencimento {invoiceCard.invoiceDueDate}
          </Text>
        </View>
      </LinearGradient>

      <Pressable
        accessibilityRole="button"
        disabled={invoicePaid || isPaymentLoading}
        onPress={handlePayInvoice}
        style={[
          styles.topPayButton,
          (invoicePaid || isPaymentLoading) && styles.topPayButtonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>
          {invoicePaid ? 'Fatura paga' : 'Pagar fatura'}
        </Text>
      </Pressable>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Saldo</Text>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            numberOfLines={1}
            style={styles.summaryValue}
          >
            {formatCurrency(accountBalance)}
          </Text>
        </View>

        <View style={[styles.summaryItem, styles.summaryDivider]}>
          <Text style={styles.summaryLabel}>Limite conta</Text>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            numberOfLines={1}
            style={styles.summaryValue}
          >
            {formatCurrency(accountLimit)}
          </Text>
        </View>

        <View style={[styles.summaryItem, styles.summaryDivider]}>
          <Text style={styles.summaryLabel}>Limite cartão</Text>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            numberOfLines={1}
            style={styles.summaryValue}
          >
            {invoiceCard.limit}
          </Text>
        </View>
      </View>

      <View style={styles.invoiceCard}>
        <View style={styles.invoiceHeader}>
          <Text style={styles.invoiceTitle}>Lançamentos</Text>
        </View>
        <Text style={styles.invoiceSubtitle}>
          Compras consolidadas no período atual.
        </Text>

        {cardInvoice.items.map((item) => (
          <View key={`${item.title}-${item.date}`} style={styles.invoiceRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={styles.itemValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.paymentCard}>
        <Text style={styles.paymentTitle}>Pagamento da fatura</Text>
        <Text style={styles.paymentText}>
          Ao pagar, a fatura atual será baixada, o saldo da conta será
          descontado e o valor em aberto volta para zero na área de cartões.
        </Text>

        <Pressable
          accessibilityRole="button"
          disabled={invoicePaid || isPaymentLoading}
          onPress={handlePayInvoice}
          style={[
            styles.primaryButton,
            (invoicePaid || isPaymentLoading) && styles.primaryButtonDisabled,
          ]}
        >
          <Text style={styles.buttonText}>
            {invoicePaid ? 'Fatura paga' : 'Pagar fatura'}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => setActiveScreen('statement')}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>Ver extrato</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => setActiveScreen('cards')}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>Voltar para cartões</Text>
        </Pressable>
      </View>
    </>
  );
}
