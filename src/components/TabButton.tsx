import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { IconName } from '../types';

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTabIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: colors.purpleSoft,
  },
});

export function TabButton({
  customIcon,
  icon,
  label,
  active,
  iconColor,
  onPress,
}: {
  customIcon?: ReactNode;
  icon?: IconName;
  label: string;
  active: boolean;
  iconColor?: string;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} style={styles.tabButton} onPress={onPress}>
      <View style={active ? styles.activeTabIconBg : styles.inactiveTabIconBg}>
        {customIcon ?? (
          <Ionicons
            name={icon ?? 'ellipse-outline'}
            size={22}
            color={active ? colors.white : iconColor ?? 'rgba(255,255,255,0.55)'}
          />
        )}
      </View>

      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}
