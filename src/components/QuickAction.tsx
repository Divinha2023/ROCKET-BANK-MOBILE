import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { IconName } from '../types';

const styles = StyleSheet.create({
  quickAction: {
    width: '23%',
    alignItems: 'center',
  },
  quickIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickLabel: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '700',
  },
});
export function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" style={styles.quickAction} onPress={onPress}>
      <LinearGradient
        colors={['rgba(139,92,246,0.24)', 'rgba(255,123,84,0.12)']}
        style={styles.quickIcon}
      >
        <Ionicons name={icon} size={24} color={colors.white} />
      </LinearGradient>

      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}
