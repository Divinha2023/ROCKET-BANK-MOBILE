import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { IconName } from '../types';

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  transactionSubtitle: {
    color: colors.mutedDark,
    fontSize: 13,
    marginTop: 3,
  },
  transactionValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  transactionValuePositive: {
    color: colors.green,
  },
});
export function Transaction({
  icon,
  title,
  subtitle,
  value,
  positive,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <View style={styles.transactionRow}>
      <View style={styles.transactionIcon}>
        <Ionicons name={icon} size={22} color={colors.purpleSoft} />
      </View>

      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionSubtitle}>{subtitle}</Text>
      </View>

      <Text
        style={[
          styles.transactionValue,
          positive && styles.transactionValuePositive,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}
