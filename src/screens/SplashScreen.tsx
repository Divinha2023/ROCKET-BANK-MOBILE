import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { colors } from '../theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020008',
    overflow: 'hidden',
  },
  animationStage: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rocketScene: {
    width: screenWidth * 2.15,
    height: screenHeight * 1.34,
  },
  fullScene: {
    width: '100%',
    height: '100%',
  },
  colorWash: {
    ...StyleSheet.absoluteFillObject,
  },
  deepSpaceGlow: {
    position: 'absolute',
    left: -screenWidth * 0.25,
    right: -screenWidth * 0.25,
    top: -screenHeight * 0.16,
    height: screenHeight * 0.62,
  },
  launchBeam: {
    position: 'absolute',
    left: -screenWidth * 0.2,
    right: -screenWidth * 0.2,
    bottom: -48,
    height: screenHeight * 0.42,
  },
  ignitionCore: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: screenHeight * 0.08,
    width: screenWidth * 0.72,
    height: screenWidth * 0.72,
    borderRadius: screenWidth * 0.36,
  },
  orbitLine: {
    position: 'absolute',
    alignSelf: 'center',
    top: screenHeight * 0.26,
    width: screenWidth * 1.05,
    height: 1,
    backgroundColor: 'rgba(168,85,247,0.16)',
  },
  orbitLineAlt: {
    top: screenHeight * 0.3,
    backgroundColor: 'rgba(255,123,84,0.13)',
  },
  starField: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.78)',
  },
  starOne: {
    left: '14%',
    top: '18%',
  },
  starTwo: {
    right: '18%',
    top: '24%',
  },
  starThree: {
    left: '22%',
    top: '53%',
  },
  starFour: {
    right: '12%',
    top: '57%',
  },
  starFive: {
    left: '52%',
    top: '13%',
  },
  starSix: {
    left: '8%',
    top: '67%',
  },
  bottomPanel: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 38,
  },
  eyebrow: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.white,
    fontSize: 33,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    maxWidth: 310,
  },
  progressShell: {
    marginTop: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 12,
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  progressValue: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  loaderTrack: {
    width: '100%',
    height: 7,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    borderRadius: 99,
    overflow: 'hidden',
  },
  loaderGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export function SplashScreen() {
  const liftAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(0)).current;
  const starAnimation = useRef(new Animated.Value(0)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const liftLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(liftAnimation, {
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(liftAnimation, {
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const starLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(starAnimation, {
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(starAnimation, {
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          toValue: 0,
          useNativeDriver: true,
        }),
      ])
    );

    liftLoop.start();
    pulseLoop.start();
    starLoop.start();
    Animated.timing(progressAnimation, {
      duration: 2600,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: false,
    }).start();

    return () => {
      liftLoop.stop();
      pulseLoop.stop();
      starLoop.stop();
      progressAnimation.stopAnimation();
    };
  }, [liftAnimation, progressAnimation, pulseAnimation, starAnimation]);

  const rocketTranslateY = liftAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenHeight * 0.055, -screenHeight * 0.085],
  });
  const rocketScale = liftAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.035],
  });
  const beamOpacity = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.42, 0.88],
  });
  const beamScale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.08],
  });
  const starOpacity = starAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.38, 1],
  });
  const starTranslateY = starAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });
  const loaderWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['12%', '100%'],
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#020008" />

      <LinearGradient
        colors={[
          'rgba(111,44,255,0.28)',
          'rgba(168,85,247,0.07)',
          'rgba(2,0,8,0)',
        ]}
        style={styles.deepSpaceGlow}
      />

      <View style={styles.animationStage}>
        <Animated.View
          style={[
            styles.rocketScene,
            {
              transform: [
                { translateY: rocketTranslateY },
                { scale: rocketScale },
              ],
            },
          ]}
        >
          <LottieView
            autoPlay
            loop
            source={require('../../assets/animations/rocket-launch.json')}
            style={styles.fullScene}
          />
        </Animated.View>
      </View>

      <LinearGradient
        colors={[
          'rgba(2,0,8,0.04)',
          'rgba(36,9,82,0.10)',
          'rgba(2,0,8,0.42)',
          'rgba(2,0,8,0.92)',
        ]}
        locations={[0, 0.34, 0.66, 1]}
        style={styles.colorWash}
      />

      <Animated.View
        style={[
          styles.launchBeam,
          {
            opacity: beamOpacity,
            transform: [{ scaleY: beamScale }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(111,44,255,0)',
            'rgba(111,44,255,0.34)',
            'rgba(255,123,84,0.24)',
          ]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.ignitionCore,
          {
            opacity: beamOpacity,
            transform: [{ scale: beamScale }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(255,123,84,0.24)',
            'rgba(111,44,255,0.12)',
            'rgba(2,0,8,0)',
          ]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View style={[styles.orbitLine, { transform: [{ rotate: '-14deg' }] }]} />
      <View
        style={[
          styles.orbitLine,
          styles.orbitLineAlt,
          { transform: [{ rotate: '14deg' }] },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.starField,
          {
            opacity: starOpacity,
            transform: [{ translateY: starTranslateY }],
          },
        ]}
      >
        <View style={[styles.star, styles.starOne]} />
        <View style={[styles.star, styles.starTwo]} />
        <View style={[styles.star, styles.starThree]} />
        <View style={[styles.star, styles.starFour]} />
        <View style={[styles.star, styles.starFive]} />
        <View style={[styles.star, styles.starSix]} />
      </Animated.View>

      <View style={styles.bottomPanel}>
        <Text style={styles.eyebrow}>Rocket Bank</Text>
        <Text style={styles.title}>Preparando sua experiencia.</Text>
        <Text style={styles.subtitle}>
          Carregando conta, cartoes, shopping e beneficios em seguranca.
        </Text>

        <View style={styles.progressShell}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>Inicializando app</Text>
            <Text style={styles.progressValue}>Online</Text>
          </View>

          <View style={styles.loaderTrack}>
            <Animated.View style={[styles.loaderFill, { width: loaderWidth }]}>
              <LinearGradient
                colors={[colors.purpleStrong, colors.purpleSoft, colors.orange]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loaderGradient}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}
