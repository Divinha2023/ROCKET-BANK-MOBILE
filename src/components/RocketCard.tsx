import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { CardVariant } from '../types';

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

const cardExclusivityLabel: Record<CardVariant, string> = {
  standard: 'STANDARD',
  gold: 'GOLD',
  platinum: 'PLATINUM',
  black: 'BLACK',
};

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
  const isPlatinumCard = variant === 'platinum';
  const isBlackCard = variant === 'black';
  const flipAnimation = useRef(new Animated.Value(hidden ? 0 : 1)).current;
  const displayNumber = number.replace(/(.{4})/g, '$1 ').trim();
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

  useEffect(() => {
    Animated.timing(flipAnimation, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
      toValue: hidden ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }, [flipAnimation, hidden]);

  const frontRotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backRotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  function renderCardArt() {
    return (
      <>
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
      </>
    );
  }

  function renderEyeButton() {
    if (!onToggleVisibility) {
      return null;
    }

    return (
      <Pressable
        accessibilityLabel={
          hidden ? 'Virar cartão para mostrar dados' : 'Virar cartão para ocultar dados'
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
          name={hidden ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color={accentColor}
        />
      </Pressable>
    );
  }

  function renderChip() {
    if (isPlatinumCard) {
      return (
        <LinearGradient
          colors={['#F8FAFC', '#94A3B8', '#E5E7EB', '#64748B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cardChip, styles.cardChipPlatinum]}
        />
      );
    }

    if (isBlackCard) {
      return (
        <LinearGradient
          colors={['#4B5563', '#111827', '#6B7280', '#030303']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.cardChip, styles.cardChipBlack]}
        />
      );
    }

    return <View style={styles.cardChip} />;
  }

  function renderNetwork() {
    return (
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
    );
  }

  const frontFaceStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontRotateY }],
  };
  const backFaceStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backRotateY }],
  };

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
      <View style={styles.cardStage}>
        <Animated.View
          pointerEvents={hidden ? 'auto' : 'none'}
          style={[styles.cardFace, frontFaceStyle]}
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
            {renderCardArt()}
            {renderEyeButton()}

            <View style={styles.rocketCardTop}>
              <View style={styles.brandColumn}>
                <Image source={logoSource} style={logoStyle} resizeMode="contain" />
              </View>
            </View>

            <View style={styles.frontMiddle}>
              {renderChip()}
              <Text
                numberOfLines={1}
                style={[
                  styles.cardExclusivity,
                  { color: config.mutedTextColor },
                ]}
              >
                {cardExclusivityLabel[variant]}
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

              <View style={[styles.footerBlockSmall, styles.frontNetworkBlock]}>
                {renderNetwork()}
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          pointerEvents={hidden ? 'none' : 'auto'}
          style={[styles.cardFace, backFaceStyle]}
        >
          <LinearGradient
            colors={config.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.rocketCard,
              styles.rocketCardBack,
              isPlatinumCard && styles.rocketCardPlatinum,
              isBlackCard && styles.rocketCardBlack,
              blocked && styles.rocketCardBlocked,
            ]}
          >
            {renderCardArt()}
            {renderEyeButton()}

            <View style={styles.cardBackTop}>
              <Text style={[styles.cardBackTitle, { color: config.textColor }]}>
                Dados do cartão
              </Text>
              <Ionicons name="shield-checkmark-outline" size={22} color={accentColor} />
            </View>

            <View style={styles.backStripe} />

            <View style={styles.backNumberPanel}>
              <Text style={[styles.backNumberLabel, { color: config.mutedTextColor }]}>
                NÚMERO DO CARTÃO
              </Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.82}
                style={[styles.backCardNumber, { color: config.textColor }]}
              >
                {displayNumber}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.cardExclusivity,
                  styles.backExclusivity,
                  { color: config.mutedTextColor },
                ]}
              >
                {cardExclusivityLabel[variant]}
              </Text>
            </View>

            <View style={styles.backDetails}>
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
                  {cvv}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      {blocked ? (
        <View pointerEvents="none" style={styles.lockOverlay}>
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={30} color={colors.white} />
          </View>
        </View>
      ) : null}

    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardShell: {
    borderRadius: 24,
    marginBottom: 16,
  },
  cardShellSelected: {
    borderColor: 'transparent',
  },
  cardShellPlatinum: {
    shadowOpacity: 0,
    elevation: 0,
  },
  cardShellPlatinumSelected: {
    borderColor: 'transparent',
  },
  cardShellBlack: {
    shadowColor: '#000000',
    shadowOpacity: 0.38,
    shadowRadius: 20,
    elevation: 10,
  },
  cardShellBlackSelected: {
    borderColor: 'transparent',
  },
  rocketCard: {
    height: '100%',
    borderRadius: 23,
    padding: 18,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  rocketCardBlocked: {
    opacity: 0.42,
  },
  rocketCardPlatinum: {
    borderWidth: 0,
  },
  rocketCardBlack: {
    borderWidth: 0,
  },
  rocketCardBack: {
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  cardStage: {
    height: 214,
    borderRadius: 23,
    overflow: 'hidden',
    position: 'relative',
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
    borderRadius: 23,
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
    top: 58,
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
    borderWidth: 0,
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
  cardChip: {
    width: 42,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.50)',
    marginBottom: 8,
  },
  cardChipPlatinum: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  cardChipBlack: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  cardMiddle: {
    marginTop: 10,
  },
  frontMiddle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 4,
    minHeight: 76,
  },
  cardNumber: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
    flexShrink: 1,
  },
  cardExclusivity: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginTop: 7,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
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
  frontNetworkBlock: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cardBackTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 48,
  },
  cardBackTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  backStripe: {
    height: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.38)',
    marginHorizontal: -18,
  },
  backNumberPanel: {
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
    backgroundColor: 'rgba(255,255,255,0.09)',
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  backNumberLabel: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  backCardNumber: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
  },
  backExclusivity: {
    marginTop: 4,
  },
  backDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
});
