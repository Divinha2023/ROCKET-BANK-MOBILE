import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import type { AppScreen } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { QuickAction } from '../components/QuickAction';
import { FeatureCard } from '../components/FeatureCard';
import { Transaction } from '../components/Transaction';

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  greeting: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  greetingSub: {
    color: colors.mutedDark,
    fontSize: 14,
    marginTop: 4,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  balanceCard: {
    borderRadius: 30,
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
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
export function HomeScreen({
  setActiveScreen,
}: {
  setActiveScreen: (screen: AppScreen) => void;
}) {
  async function openRocketConnect() {
    try {
      await Linking.openURL('https://www.instagram.com/rocketbank/');
    } catch {
      Alert.alert(
        'Rocket Connect',
        'Não foi possível abrir o Instagram agora.'
      );
    }
  }

  return (
    <>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Olá, João 👋</Text>
          <Text style={styles.greetingSub}>Bem-vindo ao Rocket Bank</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.roundButton}
          onPress={() =>
            Alert.alert(
              'Notificações',
              'Você tem 3 novidades: cashback recebido, limite atualizado e campanha Tech Rocket.'
            )
          }
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.white}
          />
        </Pressable>
      </View>

      <LinearGradient
        colors={[
          'rgba(111,44,255,0.95)',
          'rgba(168,85,247,0.76)',
          'rgba(255,123,84,0.55)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balanceValue}>R$ 8.520,00</Text>
        <Text style={styles.balanceSub}>
          + R$ 248,90 em cashback acumulado
        </Text>
      </LinearGradient>

      <View style={styles.quickGrid}>
        <QuickAction
          icon="swap-horizontal-outline"
          label="Transferir"
          onPress={() => setActiveScreen('pix')}
        />

        <QuickAction
          icon="document-text-outline"
          label="Extrato"
          onPress={() => setActiveScreen('statement')}
        />

        <QuickAction
          icon="card-outline"
          label="Cartões"
          onPress={() => setActiveScreen('cards')}
        />
      </View>

      <SectionHeader
        title="Benefícios Rocket"
        action="Ver cashback"
        onPress={() => setActiveScreen('cashback')}
      />

      <View style={commonStyles.twoColumns}>
        <FeatureCard
          icon="storefront-outline"
          title="Rocket Shopping"
          text="Compre em parceiros e ganhe cashback."
          onPress={() => setActiveScreen('shopping')}
        />

        <FeatureCard
          icon="people-outline"
          title="Rocket Connect"
          text="Conteúdos e comunidade financeira."
          onPress={openRocketConnect}
        />
      </View>

      <SectionHeader
        title="Últimas movimentações"
        action="Extrato"
        onPress={() => setActiveScreen('statement')}
      />

      <View style={commonStyles.listCard}>
        <Transaction
          icon="cash-outline"
          title="Cashback recebido"
          subtitle="Rocket Shopping"
          value="+ R$ 28,90"
          positive
        />

        <Transaction
          icon="send-outline"
          title="Pix enviado"
          subtitle="Pedro Santos"
          value="- R$ 120,00"
        />

        <Transaction
          icon="cart-outline"
          title="Compra aprovada"
          subtitle="Mercado Livre"
          value="- R$ 89,90"
        />
      </View>
    </>
  );
}
