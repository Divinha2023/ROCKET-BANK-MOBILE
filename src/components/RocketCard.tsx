import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const styles = StyleSheet.create({
  rocketCard: {
    height: 220,
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  cardEyeButton: {
    position: 'absolute',
    right: 20,
    top: 68,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  cardEyeButtonGold: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  cardEyeButtonBlack: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  rocketCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rocketCardBrand: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  rocketCardType: {
    color: colors.white,
    letterSpacing: 7,
    fontSize: 13,
    marginTop: 4,
  },
  cardChip: {
    width: 48,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginTop: 24,
  },
  cardChipGold: {
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  cardNumber: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  cardSmall: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    letterSpacing: 1,
  },
  cardHolder: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 3,
  },
});
export function RocketCard({
  variant,
  hidden,
  onToggleVisibility,
}: {
  variant: 'gold' | 'black';
  hidden: boolean;
  onToggleVisibility: () => void;
}) {
  const isGold = variant === 'gold';
  const textColor = isGold ? '#261400' : colors.white;
  const number = hidden ? '••••  ••••  ••••  3456' : '5412 7512 3412 3456';

  return (
    <LinearGradient
      colors={
        isGold
          ? ['#F8D777', '#C89512', '#F6C766']
          : ['#080808', '#111111', '#2A2140']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.rocketCard}
    >
      <Pressable
        accessibilityLabel={hidden ? 'Revelar número do cartão' : 'Ocultar número do cartão'}
        accessibilityRole="button"
        style={[
          styles.cardEyeButton,
          isGold ? styles.cardEyeButtonGold : styles.cardEyeButtonBlack,
        ]}
        onPress={onToggleVisibility}
        hitSlop={12}
      >
        <Ionicons
          name={hidden ? 'eye-off-outline' : 'eye-outline'}
          size={24}
          color={textColor}
        />
      </Pressable>

      <View style={styles.rocketCardTop}>
        <View>
          <Text style={[styles.rocketCardBrand, { color: textColor }]}>
            Rocket Bank
          </Text>

          <Text style={[styles.rocketCardType, { color: textColor }]}>
            {isGold ? 'GOLD' : 'BLACK'}
          </Text>
        </View>

        <Ionicons
          name="wifi-outline"
          size={28}
          color={textColor}
        />
      </View>

      <View style={[styles.cardChip, isGold && styles.cardChipGold]} />

      <Text style={[styles.cardNumber, { color: textColor }]}>
        {number}
      </Text>

      <View style={styles.cardFooter}>
        <View>
          <Text style={[styles.cardSmall, { color: textColor }]}>
            TITULAR
          </Text>

          <Text style={[styles.cardHolder, { color: textColor }]}>
            ALEXANDER JAMES
          </Text>
        </View>

        <View>
          <Text style={[styles.cardSmall, { color: textColor }]}>
            VALIDADE
          </Text>

          <Text style={[styles.cardHolder, { color: textColor }]}>
            12/28
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
