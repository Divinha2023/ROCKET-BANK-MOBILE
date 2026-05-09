import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { IconName } from '../types';

const styles = StyleSheet.create({
  categoryCard: {
    width: '31.5%',
    minHeight: 104,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  categoryIconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '800',
  },
  categoryCardActive: {
    backgroundColor: 'rgba(139,92,246,0.18)',
    borderColor: colors.purpleSoft,
  },
  categoryCardDisabled: {
    opacity: 0.42,
  },
  unavailableBadge: {
    color: colors.mutedDark,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
});

type CategoryCardProps = {
  active?: boolean;
  disabled?: boolean;
  icon: IconName;
  label: string;
  onPress?: () => void;
};

export function CategoryCard({
  active,
  disabled,
  icon,
  label,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: active }}
      disabled={disabled}
      style={[
        styles.categoryCard,
        active && styles.categoryCardActive,
        disabled && styles.categoryCardDisabled,
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={
          active
            ? [colors.purpleStrong, colors.purpleSoft]
            : ['rgba(139,92,246,0.25)', 'rgba(255,123,84,0.08)']
        }
        style={styles.categoryIconBox}
      >
        <Ionicons name={icon} size={24} color={colors.white} />
      </LinearGradient>
      <Text style={styles.categoryLabel}>{label}</Text>
      {disabled ? (
        <Text style={styles.unavailableBadge}>Indisponível</Text>
      ) : null}
    </Pressable>
  );
}
