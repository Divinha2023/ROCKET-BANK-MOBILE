import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function SectionHeader({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {action && (
        <Pressable accessibilityRole="button" onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  sectionAction: {
    color: colors.purpleSoft,
    fontSize: 14,
    fontWeight: '800',
  },
});
