import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
  cardShellPlatinum: {
    borderColor: 'rgba(226,232,240,0.28)',
    shadowColor: '#E5E7EB',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  cardShellPlatinumSelected: {
    borderColor: 'rgba(241,245,249,0.78)',
  },
  cardShellBlack: {
    borderColor: 'rgba(255,255,255,0.16)',
    shadowColor: '#000000',
    shadowOpacity: 0.38,
    shadowRadius: 20,
    elevation: 10,
  },
  cardShellBlackSelected: {
    borderColor: 'rgba(255,255,255,0.46)',
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
  rocketCardPlatinum: {
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.16)',
  },
  rocketCardBlack: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
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
  glowCirclePlatinum: {
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -78,
    top: -84,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  glowCircleBlack: {
    width: 198,
    height: 198,
    borderRadius: 99,
    right: -84,
    top: -92,
    backgroundColor: 'rgba(255,255,255,0.08)',
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
  lowerGlowCirclePlatinum: {
    width: 160,
    height: 160,
    borderRadius: 80,
    left: -66,
    bottom: -92,
    backgroundColor: 'rgba(148,163,184,0.18)',
  },
  lowerGlowCircleBlack: {
    width: 170,
    height: 170,
    borderRadius: 85,
    left: -72,
    bottom: -98,
    backgroundColor: 'rgba(75,85,99,0.18)',
  },
  reflectiveSheen: {
    position: 'absolute',
    left: -28,
    right: -28,
    top: 58,
    height: 34,
    opacity: 0.82,
    transform: [{ rotate: '-14deg' }],
  },
  reflectiveSheenLower: {
    position: 'absolute',
    left: -36,
    right: -36,
    bottom: 34,
    height: 20,
    opacity: 0.45,
    transform: [{ rotate: '-14deg' }],
  },
  blackSheen: {
    position: 'absolute',
    left: -34,
    right: -34,
    top: 48,
    height: 42,
    opacity: 0.56,
    transform: [{ rotate: '-16deg' }],
  },
  blackSheenLower: {
    position: 'absolute',
    left: -34,
    right: -34,
    bottom: 36,
    height: 24,
    opacity: 0.34,
    transform: [{ rotate: '-16deg' }],
  },
  metalAccentLine: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 14,
    height: 1,
    backgroundColor: 'rgba(226,232,240,0.22)',
  },
  blackAccentLine: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 14,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
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
  cardEyeButtonPlatinum: {
    backgroundColor: 'rgba(226,232,240,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.18)',
  },
  cardEyeButtonBlack: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
  },
  rocketCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandColumn: {
    flex: 1,
    paddingRight: 52,
  },
  cardLogo: {
    width: 116,
    height: 52,
  },
  cardLogoMark: {
    width: 42,
    height: 52,
  },
  cardLogoBlack: {
    width: 42,
    height: 52,
  },
  contactlessBox: {
    width: 36,
    height: 36,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  contactlessBoxPlatinum: {
    backgroundColor: 'rgba(226,232,240,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.18)',
  },
  contactlessBoxBlack: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
  },
  cardChip: {
    width: 42,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.50)',
    marginBottom: 10,
  },
  cardChipPlatinum: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.40)',
  },
  cardChipBlack: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
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
  networkCirclePlatinum: {
    backgroundColor: 'rgba(226,232,240,0.82)',
  },
  networkCircleBlack: {
    backgroundColor: 'rgba(209,213,219,0.72)',
  },
  networkCircleOverlap: {
    marginLeft: -8,
    backgroundColor: 'rgba(255,123,84,0.72)',
  },
  networkCircleOverlapPlatinum: {
    backgroundColor: 'rgba(100,116,139,0.82)',
  },
  networkCircleOverlapBlack: {
    backgroundColor: 'rgba(31,41,55,0.88)',
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
    textColor: colors.white,
    mutedTextColor: 'rgba(255,255,255,0.68)',
  },
  gold: {
    colors: ['#FDE68A', '#D6A21C', '#F8D777'],
    textColor: '#261400',
    mutedTextColor: 'rgba(38,20,0,0.68)',
  },
  platinum: {
    colors: ['#030406', '#12151A', '#2B3038', '#07080B'],
    textColor: '#F8FAFC',
    mutedTextColor: 'rgba(226,232,240,0.66)',
  },
  black: {
    colors: ['#000000', '#050506', '#111217', '#010101'],
    textColor: '#F9FAFB',
    mutedTextColor: 'rgba(209,213,219,0.62)',
  },
} as const;

export function RocketCard({
  blocked = false,
  cvv,
  dueDate,
  hidden,
  holder = 'JOAO SILVA',
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
  const isPlatinumCard = variant === 'platinum';
  const isBlackCard = variant === 'black';
  const displayNumber = hidden
    ? `•••• •••• •••• ${number.slice(-4)}`
    : number.replace(/(.{4})/g, '$1 ').trim();
  const displayCvv = hidden ? '•••' : cvv;
  const accentColor = isPlatinumCard
    ? '#E2E8F0'
    : isBlackCard
      ? '#D1D5DB'
      : config.textColor;
  const logoSource = isBlackCard
    ? require('../../assets/images/card-logo-black.png')
    : isPlatinumCard
      ? require('../../assets/images/card-logo-mark.png')
      : require('../../assets/images/card-logo.png');
  const logoStyle = isBlackCard
    ? styles.cardLogoBlack
    : isPlatinumCard
      ? styles.cardLogoMark
      : styles.cardLogo;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.cardShell,
        isPlatinumCard && styles.cardShellPlatinum,
        isBlackCard && styles.cardShellBlack,
        selected &&
          (isPlatinumCard
            ? styles.cardShellPlatinumSelected
            : isBlackCard
              ? styles.cardShellBlackSelected
              : styles.cardShellSelected),
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.rocketCard,
          isPlatinumCard && styles.rocketCardPlatinum,
          isBlackCard && styles.rocketCardBlack,
          blocked && styles.rocketCardBlocked,
        ]}
      >
        <View
          style={[
            styles.glowCircle,
            isPlatinumCard && styles.glowCirclePlatinum,
            isBlackCard && styles.glowCircleBlack,
          ]}
        />
        <View
          style={[
            styles.lowerGlowCircle,
            isPlatinumCard && styles.lowerGlowCirclePlatinum,
            isBlackCard && styles.lowerGlowCircleBlack,
          ]}
        />

        {isPlatinumCard ? (
          <>
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.24)',
                'rgba(255,255,255,0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.reflectiveSheen}
            />
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(148,163,184,0.28)',
                'rgba(255,255,255,0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.reflectiveSheenLower}
            />
            <View style={styles.metalAccentLine} />
          </>
        ) : null}

        {isBlackCard ? (
          <>
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.11)',
                'rgba(255,255,255,0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.blackSheen}
            />
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(107,114,128,0.20)',
                'rgba(255,255,255,0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.blackSheenLower}
            />
            <View style={styles.blackAccentLine} />
          </>
        ) : null}

        {onToggleVisibility ? (
          <Pressable
            accessibilityLabel={
              hidden ? 'Revelar numero do cartao' : 'Ocultar numero do cartao'
            }
            accessibilityRole="button"
            style={[
              styles.cardEyeButton,
              isPlatinumCard && styles.cardEyeButtonPlatinum,
              isBlackCard && styles.cardEyeButtonBlack,
            ]}
            onPress={onToggleVisibility}
            hitSlop={12}
          >
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={accentColor}
            />
          </Pressable>
        ) : null}

        <View style={styles.rocketCardTop}>
          <View style={styles.brandColumn}>
            <Image source={logoSource} style={logoStyle} resizeMode="contain" />
          </View>

          <View
            style={[
              styles.contactlessBox,
              isPlatinumCard && styles.contactlessBoxPlatinum,
              isBlackCard && styles.contactlessBoxBlack,
            ]}
          >
            <Ionicons name="wifi-outline" size={22} color={accentColor} />
          </View>
        </View>

        <View style={styles.cardMiddle}>
          {isPlatinumCard ? (
            <LinearGradient
              colors={['#F8FAFC', '#94A3B8', '#E5E7EB', '#64748B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.cardChip, styles.cardChipPlatinum]}
            />
          ) : isBlackCard ? (
            <LinearGradient
              colors={['#4B5563', '#111827', '#6B7280', '#030303']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.cardChip, styles.cardChipBlack]}
            />
          ) : (
            <View style={styles.cardChip} />
          )}

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
              <View
                style={[
                  styles.networkCircle,
                  isPlatinumCard && styles.networkCirclePlatinum,
                  isBlackCard && styles.networkCircleBlack,
                ]}
              />
              <View
                style={[
                  styles.networkCircle,
                  styles.networkCircleOverlap,
                  isPlatinumCard && styles.networkCircleOverlapPlatinum,
                  isBlackCard && styles.networkCircleOverlapBlack,
                ]}
              />
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
