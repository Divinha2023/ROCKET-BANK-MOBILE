import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../theme';
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
});
export function PixScreen() {
  return (
    <>
      <ScreenTitle
        title="Pix Rocket"
        subtitle="Envie, receba e acompanhe seus Pix com segurança."
      />

      <View style={styles.pixGrid}>
        <PixCard
          icon="send-outline"
          title="Enviar Pix"
          text="Transferência imediata."
        />

        <PixCard
          icon="download-outline"
          title="Receber Pix"
          text="QR Code ou chave Pix."
        />

        <PixCard
          icon="copy-outline"
          title="Copia e Cola"
          text="Cole o código Pix."
        />

        <PixCard
          icon="calendar-outline"
          title="Agendar Pix"
          text="Programe pagamentos."
        />
      </View>

      <SectionHeader title="Minhas chaves" />

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="mail-outline"
          title="email@rocketbank.com"
          subtitle="Chave principal"
        />

        <MenuRow
          icon="call-outline"
          title="(83) 99999-0000"
          subtitle="Celular cadastrado"
        />
      </View>
    </>
  );
}
