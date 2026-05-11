import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function ScreenTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.screenTitleBox}>
      <Text style={styles.screenTitle}>{title}</Text>
      <Text style={styles.screenSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitleBox: {
    marginBottom: 22,
  },
  screenTitle: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  screenSubtitle: {
    color: colors.mutedDark,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
});
