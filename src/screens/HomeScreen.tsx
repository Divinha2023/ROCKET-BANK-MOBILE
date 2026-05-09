import { useState } from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import type { AppScreen } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { QuickAction } from '../components/QuickAction';
import { FeatureCard } from '../components/FeatureCard';
import { Transaction } from '../components/Transaction';
import { formatCurrency } from '../utils/currency';

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  customerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  customerPhotoFrame: {
    width: 58,
    height: 58,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  customerPhoto: {
    width: '100%',
    height: '100%',
  },
  customerName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginLeft: 12,
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
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
  },
  balanceVisibilityButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceValue: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '900',
    marginTop: 8,
  },
  cashbackHighlight: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(34,197,94,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.42)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 14,
  },
  cashbackText: {
    color: '#B8FFD2',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
export function HomeScreen({
  accountBalance,
  setActiveScreen,
}: {
  accountBalance: number;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

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
        <View style={styles.customerProfile}>
          <View style={styles.customerPhotoFrame}>
            <Image
              source={require('../../assets/images/customer-photo.png')}
              style={styles.customerPhoto}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.customerName}>João Silva</Text>
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
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Saldo disponível</Text>
          <Pressable
            accessibilityLabel={
              isBalanceVisible ? 'Ocultar saldo' : 'Mostrar saldo'
            }
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setIsBalanceVisible((visible) => !visible)}
            style={styles.balanceVisibilityButton}
          >
            <Ionicons
              name={isBalanceVisible ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={colors.white}
            />
          </Pressable>
        </View>
        <Text style={styles.balanceValue}>
          {isBalanceVisible ? formatCurrency(accountBalance) : 'R$ ••••••'}
        </Text>
        <View style={styles.cashbackHighlight}>
          <Ionicons name="cash-outline" size={18} color="#86EFAC" />
          <Text style={styles.cashbackText}>
            {isBalanceVisible ? 'R$ 248,90 em cashback' : 'R$ •••••• em cashback'}
          </Text>
        </View>
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
