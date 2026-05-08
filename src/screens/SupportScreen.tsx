import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { MenuRow } from '../components/MenuRow';

const styles = StyleSheet.create({
  supportCard: {
    flexDirection: 'row',
    backgroundColor: colors.purpleStrong,
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 22,
  },
  supportInfo: {
    flex: 1,
    marginLeft: 14,
  },
  supportTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  supportText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
export function SupportScreen() {
  return (
    <>
      <ScreenTitle
        title="Atendimento"
        subtitle="Resolva dúvidas e acompanhe solicitações."
      />

      <View style={styles.supportCard}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={36}
          color={colors.white}
        />

        <View style={styles.supportInfo}>
          <Text style={styles.supportTitle}>
            Falar com assistente Rocket
          </Text>

          <Text style={styles.supportText}>
            Atendimento inicial inteligente 24 horas.
          </Text>
        </View>
      </View>

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="qr-code-outline"
          title="Ajuda com Pix"
          subtitle="Chaves, comprovantes e transferências."
          onPress={() =>
            Alert.alert('Ajuda com Pix', 'Abrimos a trilha de suporte para Pix.')
          }
        />

        <MenuRow
          icon="card-outline"
          title="Cartões"
          subtitle="Bloqueio, limite e fatura."
          onPress={() =>
            Alert.alert('Cartões', 'Suporte de cartões aberto para este protótipo.')
          }
        />

        <MenuRow
          icon="storefront-outline"
          title="Rocket Shopping"
          subtitle="Pedidos, cashback e lojas parceiras."
          onPress={() =>
            Alert.alert('Rocket Shopping', 'Central de compras e cashback aberta.')
          }
        />

        <MenuRow
          icon="help-circle-outline"
          title="Abrir chamado"
          subtitle="Acompanhe solicitações dentro do app."
          onPress={() =>
            Alert.alert('Chamado criado', 'Protocolo RB-2026-058 aberto com sucesso.')
          }
        />
      </View>
    </>
  );
}
