import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

const styles = StyleSheet.create({
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: colors.purpleStrong,
    borderColor: colors.purpleStrong,
  },
  filterText: {
    color: colors.mutedDark,
    fontSize: 13,
    fontWeight: '700',
  },
  filterTextActive: {
    color: colors.white,
  },
});
type FilterChipProps = {
  active?: boolean;
  label: string;
  onPress?: () => void;
};

export function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.filterChip, active && styles.filterChipActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}
