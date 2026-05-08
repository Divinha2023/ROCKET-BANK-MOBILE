import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { Transaction } from '../components/Transaction';
import { FilterChip } from '../components/FilterChip';

const styles = StyleSheet.create({
  searchBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchText: {
    color: colors.mutedDark,
    fontSize: 15,
    marginLeft: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
});
export function StatementScreen() {
  return (
    <>
      <ScreenTitle
        title="Extrato"
        subtitle="Acompanhe suas movimentações em tempo real."
      />

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color={colors.mutedDark} />
        <Text style={styles.searchText}>Buscar movimentação</Text>
      </View>

      <View style={styles.filterRow}>
        <FilterChip label="Todos" active />
        <FilterChip label="Entradas" />
        <FilterChip label="Saídas" />
        <FilterChip label="Cashback" />
      </View>

      <View style={commonStyles.listCard}>
        <Transaction
          icon="briefcase-outline"
          title="Salário recebido"
          subtitle="Empresa"
          value="+ R$ 4.500,00"
          positive
        />

        <Transaction
          icon="sparkles-outline"
          title="Cashback Gold"
          subtitle="Benefícios"
          value="+ R$ 35,00"
          positive
        />

        <Transaction
          icon="film-outline"
          title="Pagamento Netflix"
          subtitle="Assinatura"
          value="- R$ 55,90"
        />

        <Transaction
          icon="basket-outline"
          title="Supermercado"
          subtitle="Alimentação"
          value="- R$ 248,32"
        />
      </View>
    </>
  );
}
