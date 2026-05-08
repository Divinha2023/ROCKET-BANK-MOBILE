import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  metricLabel: {
    color: colors.mutedDark,
    fontSize: 13,
  },
  metricValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
  },
});
export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}
