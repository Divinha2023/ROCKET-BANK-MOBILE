import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { MetricCard } from '../components/MetricCard';
import { cardInvoice } from '../data/mockData';
import type { AppScreen } from '../types';

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
  metricRow: {
    flexDirection: 'row',
    marginBottom: 18,
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
});

export function InvoiceScreen({
  invoicePaid,
  onPayInvoice,
  setActiveScreen,
}: {
  invoicePaid: boolean;
  onPayInvoice: () => void;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  function handlePayInvoice() {
    if (invoicePaid) {
      Alert.alert('Fatura', 'Esta fatura ja esta paga.');
      return;
    }

    onPayInvoice();
    Alert.alert(
      'Fatura paga',
      'Pagamento confirmado. A fatura foi marcada como paga.'
    );
  }

  return (
    <>
      <ScreenTitle
        title="Fatura"
        subtitle="Fatura gerada com detalhes, vencimento e pagamento."
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
              {invoicePaid ? 'R$ 0' : cardInvoice.total}
            </Text>
          </View>

          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {invoicePaid ? 'Paga' : 'Aberta'}
            </Text>
          </View>
        </View>

        <View style={styles.heroBottom}>
          <Text style={styles.heroDetail}>Vencimento {cardInvoice.dueDate}</Text>
          <Ionicons name="receipt-outline" size={26} color={colors.white} />
        </View>
      </LinearGradient>

      <View style={styles.metricRow}>
        <MetricCard label="Limite disponivel" value={cardInvoice.limit} />
        <MetricCard label="Status" value={invoicePaid ? 'Paga' : 'Aberta'} />
      </View>

      <View style={styles.invoiceCard}>
        <View style={styles.invoiceHeader}>
          <Text style={styles.invoiceTitle}>Lancamentos</Text>
          <Ionicons
            name="document-text-outline"
            size={22}
            color={colors.purpleSoft}
          />
        </View>
        <Text style={styles.invoiceSubtitle}>
          Compras consolidadas no periodo atual.
        </Text>

        {cardInvoice.items.map((item) => (
          <View key={`${item.title}-${item.date}`} style={styles.invoiceRow}>
            <View>
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
          Ao pagar, a fatura atual sera baixada e o valor em aberto volta para
          zero na area de cartoes.
        </Text>

        <Pressable
          accessibilityRole="button"
          disabled={invoicePaid}
          onPress={handlePayInvoice}
          style={[
            styles.primaryButton,
            invoicePaid && styles.primaryButtonDisabled,
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
          <Text style={styles.buttonText}>Voltar para cartoes</Text>
        </Pressable>
      </View>
    </>
  );
}
