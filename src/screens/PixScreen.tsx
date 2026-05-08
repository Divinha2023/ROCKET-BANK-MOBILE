import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { SectionHeader } from '../components/SectionHeader';
import { MenuRow } from '../components/MenuRow';
import { PixCard } from '../components/PixCard';

const styles = StyleSheet.create({
  pixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(34,197,94,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.22)',
    padding: 16,
    marginBottom: 18,
  },
  statusText: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },
});
export function PixScreen() {
  function handlePixAction(action: string) {
    Alert.alert(action, 'Fluxo Pix simulado iniciado com sucesso.');
  }

  return (
    <>
      <ScreenTitle
        title="Pix Rocket"
        subtitle="Envie, receba e acompanhe seus Pix com segurança."
      />

      <View style={styles.statusCard}>
        <Ionicons name="shield-checkmark-outline" size={24} color={colors.green} />
        <Text style={styles.statusText}>
          Limite Pix diário disponível: R$ 6.500,00. Biometria habilitada.
        </Text>
      </View>

      <View style={styles.pixGrid}>
        <PixCard
          icon="send-outline"
          title="Enviar Pix"
          text="Transferência imediata."
          onPress={() => handlePixAction('Enviar Pix')}
        />

        <PixCard
          icon="download-outline"
          title="Receber Pix"
          text="QR Code ou chave Pix."
          onPress={() => handlePixAction('Receber Pix')}
        />

        <PixCard
          icon="copy-outline"
          title="Copia e Cola"
          text="Cole o código Pix."
          onPress={() => handlePixAction('Pix Copia e Cola')}
        />

        <PixCard
          icon="calendar-outline"
          title="Agendar Pix"
          text="Programe pagamentos."
          onPress={() => handlePixAction('Agendar Pix')}
        />
      </View>

      <SectionHeader title="Minhas chaves" />

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="mail-outline"
          title="email@rocketbank.com"
          subtitle="Chave principal"
          onPress={() =>
            Alert.alert('Chave Pix', 'email@rocketbank.com copiada para uso.')
          }
        />

        <MenuRow
          icon="call-outline"
          title="(83) 99999-0000"
          subtitle="Celular cadastrado"
          onPress={() =>
            Alert.alert('Chave Pix', '(83) 99999-0000 copiada para uso.')
          }
        />
      </View>
    </>
  );
}
