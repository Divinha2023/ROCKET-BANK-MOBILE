import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { Transaction } from '../components/Transaction';
import { FilterChip } from '../components/FilterChip';
import type {
  BankStatementTransaction,
  BankStatementTransactionType,
} from '../types';

type TransactionFilter = 'all' | BankStatementTransactionType;

const filters: { label: string; value: TransactionFilter }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Entradas', value: 'entry' },
  { label: 'Saídas', value: 'expense' },
  { label: 'Cashback', value: 'cashback' },
];

export function StatementScreen({
  transactions,
}: {
  transactions: BankStatementTransaction[];
}) {
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesFilter =
        activeFilter === 'all' ||
        transaction.type === activeFilter ||
        (activeFilter === 'entry' && transaction.positive);
      const matchesSearch =
        !normalizedSearch ||
        [transaction.title, transaction.subtitle, transaction.value]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm, transactions]);

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
            key={filter.value}
            label={filter.label}
            active={activeFilter === filter.value}
            onPress={() => setActiveFilter(filter.value)}
          />
        ))}
      </View>

      <View style={commonStyles.listCard}>
        {filteredTransactions.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma movimentação encontrada.</Text>
        ) : (
          filteredTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
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
