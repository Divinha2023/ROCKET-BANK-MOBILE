import { Alert, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles } from '../theme';
import type { AppScreen } from '../types';
import { ScreenTitle } from '../components/ScreenTitle';
import { MenuRow } from '../components/MenuRow';

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.purpleStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  profileAvatarText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  profileName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  profileAccount: {
    color: colors.mutedDark,
    fontSize: 13,
    marginTop: 4,
  },
});

export function ProfileScreen({
  setActiveScreen,
  onLogout,
}: {
  setActiveScreen: (screen: AppScreen) => void;
  onLogout: () => void;
}) {
  return (
    <>
      <ScreenTitle
        title="Perfil"
        subtitle="Dados, notificações e configurações."
      />

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>JS</Text>
        </View>

        <View>
          <Text style={styles.profileName}>João Silva</Text>
          <Text style={styles.profileAccount}>
            Conta Rocket • 0001 • 123456-7
          </Text>
        </View>
      </View>

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="person-outline"
          title="Dados pessoais"
          subtitle="Nome, telefone, e-mail e documentos."
          onPress={() =>
            Alert.alert('Dados pessoais', 'Perfil demo: João Silva, conta 123456-7.')
          }
        />

        <MenuRow
          icon="notifications-outline"
          title="Notificações"
          subtitle="Alertas, compras, Pix e benefícios."
          onPress={() =>
            Alert.alert('Notificações', 'Todos os alertas principais estão habilitados.')
          }
        />

        <MenuRow
          icon="chatbubble-ellipses-outline"
          title="Central de atendimento"
          subtitle="Fale conosco e acompanhe solicitações."
          onPress={() => setActiveScreen('support')}
        />

        <MenuRow
          icon="log-out-outline"
          title="Sair da conta"
          subtitle="Voltar para a tela de login."
          onPress={onLogout}
        />
      </View>
    </>
  );
}
