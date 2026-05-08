import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { IconName } from '../types';

const styles = StyleSheet.create({
  pixCard: {
    width: '48%',
    minHeight: 146,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  pixCardTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 14,
  },
  pixCardText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
});
export function PixCard({
  icon,
  title,
  text,
}: {
  icon: IconName;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.pixCard}>
      <Ionicons name={icon} size={28} color={colors.purpleSoft} />
      <Text style={styles.pixCardTitle}>{title}</Text>
      <Text style={styles.pixCardText}>{text}</Text>
    </View>
  );
}
