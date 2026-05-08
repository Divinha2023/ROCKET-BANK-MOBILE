import { Alert, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { MetricCard } from '../components/MetricCard';
import { MenuRow } from '../components/MenuRow';

const styles = StyleSheet.create({
  cashbackCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 22,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
  },
  balanceValue: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '900',
    marginTop: 8,
  },
  balanceSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },
});
export function CashbackScreen() {
  return (
    <>
      <ScreenTitle
        title="Cashback"
        subtitle="Seu dinheiro voltando para você."
      />

      <LinearGradient
        colors={['rgba(34,197,94,0.90)', 'rgba(139,92,246,0.85)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cashbackCard}
      >
        <Text style={styles.balanceLabel}>Saldo de cashback</Text>
        <Text style={styles.balanceValue}>R$ 248,90</Text>
        <Text style={styles.balanceSub}>
          Use no shopping, abata na fatura ou transfira para sua conta.
        </Text>
      </LinearGradient>

      <View style={commonStyles.twoColumns}>
        <MetricCard label="No cartão" value="R$ 92,40" />
        <MetricCard label="No shopping" value="R$ 156,50" />
      </View>

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="sparkles-outline"
          title="Dobro de cashback"
          subtitle="Campanha ativa em lojas selecionadas."
          onPress={() =>
            Alert.alert('Campanha ativada', 'Compras elegíveis receberão cashback em dobro.')
          }
        />

        <MenuRow
          icon="card-outline"
          title="Rocket Gold"
          subtitle="Compras no cartão geram benefícios extras."
          onPress={() =>
            Alert.alert('Benefício Gold', 'Seu cartão Gold adiciona até 2% extras em parceiros.')
          }
        />
      </View>
    </>
  );
}
