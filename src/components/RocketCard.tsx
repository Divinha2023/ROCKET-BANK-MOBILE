import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { CardVariant } from '../types';

const styles = StyleSheet.create({
  cardShell: {
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  cardShellSelected: {
    borderColor: colors.purpleSoft,
  },
  rocketCard: {
    minHeight: 176,
    borderRadius: 23,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  rocketCardBlocked: {
    opacity: 0.42,
  },
  glowCircle: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    right: -72,
    top: -64,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  lowerGlowCircle: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    left: -54,
    bottom: -76,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardEyeButton: {
    position: 'absolute',
    right: 14,
    top: 54,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  rocketCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rocketCardBrand: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  rocketCardType: {
    color: colors.white,
    letterSpacing: 3,
    fontSize: 10,
    marginTop: 4,
    fontWeight: '800',
  },
  brandColumn: {
    flex: 1,
    paddingRight: 52,
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
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  contactlessBox: {
    width: 36,
    height: 36,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  cardChip: {
    width: 42,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.50)',
    marginBottom: 10,
  },
  cardMiddle: {
    marginTop: 10,
  },
  cardNumber: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
    flexShrink: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  footerBlock: {
    flex: 1,
    marginRight: 10,
  },
  footerBlockSmall: {
    flex: 0.55,
  },
  cardSmall: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 9,
    letterSpacing: 1,
  },
  cardHolder: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 3,
    flexShrink: 1,
  },
  cardNetwork: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 7,
  },
  networkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  networkCircleOverlap: {
    marginLeft: -8,
    backgroundColor: 'rgba(255,123,84,0.72)',
  },
  lockOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  lockBadge: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(5,1,15,0.76)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadge: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.purpleStrong,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 12,
  },
});

const cardConfig = {
  standard: {
    colors: ['#202433', '#3B4258', '#596179'],
    label: 'PADRÃO',
    textColor: colors.white,
    mutedTextColor: 'rgba(255,255,255,0.68)',
  },
  gold: {
    colors: ['#FDE68A', '#D6A21C', '#F8D777'],
    label: 'GOLD',
    textColor: '#261400',
    mutedTextColor: 'rgba(38,20,0,0.68)',
  },
  black: {
    colors: ['#050505', '#141119', '#33235C'],
    label: 'BLACK',
    textColor: colors.white,
    mutedTextColor: 'rgba(255,255,255,0.68)',
  },
} as const;

export function RocketCard({
  blocked = false,
  cvv,
  dueDate,
  hidden,
  holder = 'JOÃO SILVA',
  number,
  onPress,
  onToggleVisibility,
  selected = false,
  variant,
}: {
  blocked?: boolean;
  cvv: string;
  dueDate: string;
  hidden: boolean;
  holder?: string;
  number: string;
  onPress?: () => void;
  onToggleVisibility?: () => void;
  selected?: boolean;
  variant: CardVariant;
}) {
  const config = cardConfig[variant];
  const displayNumber = hidden
    ? `•••• •••• •••• ${number.slice(-4)}`
    : number.replace(/(.{4})/g, '$1 ').trim();
  const displayCvv = hidden ? '•••' : cvv;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.cardShell, selected && styles.cardShellSelected]}
      onPress={onPress}
    >
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.rocketCard, blocked && styles.rocketCardBlocked]}
      >
        <View style={styles.glowCircle} />
        <View style={styles.lowerGlowCircle} />

        {onToggleVisibility ? (
          <Pressable
            accessibilityLabel={
              hidden ? 'Revelar número do cartão' : 'Ocultar número do cartão'
            }
            accessibilityRole="button"
            style={styles.cardEyeButton}
            onPress={onToggleVisibility}
            hitSlop={12}
          >
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={config.textColor}
            />
          </Pressable>
        ) : null}

        <View style={styles.rocketCardTop}>
          <View style={styles.brandColumn}>
            <Text style={[styles.rocketCardBrand, { color: config.textColor }]}>
              Rocket Bank
            </Text>

            <Text style={[styles.rocketCardType, { color: config.textColor }]}>
              {config.label}
            </Text>

            <View style={styles.cardStatus}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: blocked ? colors.orange : colors.green },
                ]}
              />
              <Text
                style={[styles.statusText, { color: config.mutedTextColor }]}
              >
                {blocked ? 'Cartão bloqueado' : 'Cartão ativo'}
              </Text>
            </View>
          </View>

          <View style={styles.contactlessBox}>
            <Ionicons name="wifi-outline" size={22} color={config.textColor} />
          </View>
        </View>

        <View style={styles.cardMiddle}>
          <View style={styles.cardChip} />

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.82}
            style={[styles.cardNumber, { color: config.textColor }]}
          >
            {displayNumber}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerBlock}>
            <Text style={[styles.cardSmall, { color: config.mutedTextColor }]}>
              TITULAR
            </Text>

            <Text
              numberOfLines={1}
              style={[styles.cardHolder, { color: config.textColor }]}
            >
              {holder}
            </Text>
          </View>

          <View style={styles.footerBlockSmall}>
            <Text style={[styles.cardSmall, { color: config.mutedTextColor }]}>
              VENC.
            </Text>
            <Text style={[styles.cardHolder, { color: config.textColor }]}>
              {dueDate}
            </Text>
          </View>

          <View style={styles.footerBlockSmall}>
            <Text style={[styles.cardSmall, { color: config.mutedTextColor }]}>
              CVV
            </Text>
            <Text style={[styles.cardHolder, { color: config.textColor }]}>
              {displayCvv}
            </Text>

            <View style={styles.cardNetwork}>
              <View style={styles.networkCircle} />
              <View style={[styles.networkCircle, styles.networkCircleOverlap]} />
            </View>
          </View>
        </View>
      </LinearGradient>

      {blocked ? (
        <View pointerEvents="none" style={styles.lockOverlay}>
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={30} color={colors.white} />
          </View>
        </View>
      ) : null}

      {selected ? (
        <View pointerEvents="none" style={styles.selectedBadge}>
          <Ionicons name="checkmark" size={16} color={colors.white} />
        </View>
      ) : null}
    </Pressable>
  );
}
