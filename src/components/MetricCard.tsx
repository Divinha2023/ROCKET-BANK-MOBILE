import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text numberOfLines={1} style={styles.metricLabel}>
        {label}
      </Text>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        numberOfLines={1}
        style={styles.metricValue}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    minHeight: 92,
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
    lineHeight: 17,
    minHeight: 17,
  },
  metricValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
  },
});
