import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { Transaction } from '../components/Transaction';
import { FilterChip } from '../components/FilterChip';
import type { IconName } from '../types';

type TransactionFilter = 'Todos' | 'Entradas' | 'Saídas' | 'Cashback';

type TransactionItem = {
  icon: IconName;
  title: string;
  subtitle: string;
  value: string;
  type: TransactionFilter;
  positive?: boolean;
};

const transactions: TransactionItem[] = [
  {
    icon: 'briefcase-outline',
    title: 'Salário recebido',
    subtitle: 'Empresa',
    value: '+ R$ 4.500,00',
    type: 'Entradas',
    positive: true,
  },
  {
    icon: 'sparkles-outline',
    title: 'Cashback Gold',
    subtitle: 'Benefícios',
    value: '+ R$ 35,00',
    type: 'Cashback',
    positive: true,
  },
  {
    icon: 'film-outline',
    title: 'Pagamento Netflix',
    subtitle: 'Assinatura',
    value: '- R$ 55,90',
    type: 'Saídas',
  },
  {
    icon: 'basket-outline',
    title: 'Supermercado',
    subtitle: 'Alimentação',
    value: '- R$ 248,32',
    type: 'Saídas',
  },
];

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
    flex: 1,
    color: colors.mutedDark,
    fontSize: 15,
    marginLeft: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  emptyText: {
    color: colors.mutedDark,
    fontSize: 14,
    lineHeight: 20,
    padding: 18,
  },
});

const filters: TransactionFilter[] = ['Todos', 'Entradas', 'Saídas', 'Cashback'];

export function StatementScreen() {
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesFilter =
        activeFilter === 'Todos' ||
        transaction.type === activeFilter ||
        (activeFilter === 'Entradas' && transaction.positive);
      const matchesSearch =
        !normalizedSearch ||
        [transaction.title, transaction.subtitle, transaction.value]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <>
      <ScreenTitle
        title="Extrato"
        subtitle="Acompanhe suas movimentações em tempo real."
      />

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color={colors.mutedDark} />
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Buscar movimentação"
          placeholderTextColor={colors.mutedDark}
          style={styles.searchText}
        />
      </View>

      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </View>

      <View style={commonStyles.listCard}>
        {filteredTransactions.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma movimentação encontrada.</Text>
        ) : (
          filteredTransactions.map((transaction) => (
            <Transaction
              key={`${transaction.title}-${transaction.value}`}
              icon={transaction.icon}
              title={transaction.title}
              subtitle={transaction.subtitle}
              value={transaction.value}
              positive={transaction.positive}
            />
          ))
        )}
      </View>
    </>
  );
}
