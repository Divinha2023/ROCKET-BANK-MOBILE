import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const styles = StyleSheet.create({
  rocketCard: {
    minHeight: 206,
    borderRadius: 26,
    padding: 18,
    marginBottom: 18,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  glowCircle: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -78,
    top: -58,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  lowerGlowCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    left: -58,
    bottom: -82,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardEyeButton: {
    position: 'absolute',
    right: 16,
    top: 58,
    width: 40,
    height: 40,
    borderRadius: 20,
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
    alignItems: 'flex-start',
  },
  rocketCardBrand: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '900',
  },
  rocketCardType: {
    color: colors.white,
    letterSpacing: 4,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '800',
  },
  brandColumn: {
    flex: 1,
    paddingRight: 54,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.green,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  contactlessBox: {
    width: 38,
    height: 38,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  cardChip: {
    width: 46,
    height: 34,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.50)',
    marginBottom: 12,
  },
  cardChipGold: {
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  cardMiddle: {
    marginTop: 14,
  },
  cardNumber: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 1,
    flexShrink: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  footerBlock: {
    flex: 1,
    marginRight: 14,
  },
  footerBlockRight: {
    alignItems: 'flex-end',
    marginRight: 0,
  },
  cardSmall: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    letterSpacing: 1,
  },
  cardHolder: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 3,
    flexShrink: 1,
  },
  cardNetwork: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  networkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  networkCircleOverlap: {
    marginLeft: -8,
    backgroundColor: 'rgba(255,123,84,0.72)',
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
  const mutedTextColor = isGold ? 'rgba(38,20,0,0.68)' : 'rgba(255,255,255,0.68)';
  const number = hidden ? '•••• •••• •••• 3456' : '5412 7512 3412 3456';

  return (
    <LinearGradient
      colors={
        isGold
          ? ['#FDE68A', '#D6A21C', '#F8D777']
          : ['#050505', '#141119', '#33235C']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.rocketCard}
    >
      <View style={styles.glowCircle} />
      <View style={styles.lowerGlowCircle} />

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
          size={22}
          color={textColor}
        />
      </Pressable>

      <View style={styles.rocketCardTop}>
        <View style={styles.brandColumn}>
          <Text style={[styles.rocketCardBrand, { color: textColor }]}>
            Rocket Bank
          </Text>

          <Text style={[styles.rocketCardType, { color: textColor }]}>
            {isGold ? 'GOLD' : 'BLACK'}
          </Text>

          <View style={styles.cardStatus}>
            <View style={styles.statusDot} />
            <Text style={[styles.statusText, { color: mutedTextColor }]}>
              Cartão ativo
            </Text>
          </View>
        </View>

        <View style={styles.contactlessBox}>
          <Ionicons name="wifi-outline" size={24} color={textColor} />
        </View>
      </View>

      <View style={styles.cardMiddle}>
        <View style={[styles.cardChip, isGold && styles.cardChipGold]} />

        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          style={[styles.cardNumber, { color: textColor }]}
        >
          {number}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.footerBlock}>
          <Text style={[styles.cardSmall, { color: mutedTextColor }]}>
            TITULAR
          </Text>

          <Text
            numberOfLines={1}
            style={[styles.cardHolder, { color: textColor }]}
          >
            ALEXANDER JAMES
          </Text>
        </View>

        <View style={[styles.footerBlock, styles.footerBlockRight]}>
          <Text style={[styles.cardSmall, { color: mutedTextColor }]}>
            VALIDADE
          </Text>

          <Text style={[styles.cardHolder, { color: textColor }]}>
            12/28
          </Text>

          <View style={styles.cardNetwork}>
            <View style={styles.networkCircle} />
            <View style={[styles.networkCircle, styles.networkCircleOverlap]} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
