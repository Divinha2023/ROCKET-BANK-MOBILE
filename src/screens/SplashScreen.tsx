import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { colors } from '../theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export function SplashScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#020008" />

      <View style={styles.animationStage}>
        <LottieView
          autoPlay
          loop
          source={require('../../assets/animations/rocket-launch.json')}
          style={styles.fullScene}
        />
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

      <LinearGradient
        colors={[
          'rgba(111,44,255,0)',
          'rgba(111,44,255,0.25)',
          'rgba(255,123,84,0.20)',
        ]}
        style={styles.launchBeam}
      />

      <View pointerEvents="none" style={styles.starField}>
        <View style={[styles.star, styles.starOne]} />
        <View style={[styles.star, styles.starTwo]} />
        <View style={[styles.star, styles.starThree]} />
        <View style={[styles.star, styles.starFour]} />
      </View>

      <View style={styles.bottomPanel}>
        <Text style={styles.eyebrow}>Rocket Bank</Text>
        <Text style={styles.title}>Preparando sua experiência.</Text>
        <Text style={styles.subtitle}>
          Carregando conta, cartões, shopping e benefícios em segurança.
        </Text>

        <View style={styles.progressShell}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>Inicializando app</Text>
            <Text style={styles.progressValue}>84%</Text>
          </View>

          <View style={styles.loaderTrack}>
            <LinearGradient
              colors={[colors.purpleStrong, colors.purpleSoft, colors.orange]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loaderFill}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

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
  fullScene: {
    width: screenWidth * 2.15,
    height: screenHeight * 1.34,
    transform: [{ translateY: -screenHeight * 0.05 }],
  },
  colorWash: {
    ...StyleSheet.absoluteFillObject,
  },
  launchBeam: {
    position: 'absolute',
    left: -screenWidth * 0.2,
    right: -screenWidth * 0.2,
    bottom: -48,
    height: screenHeight * 0.42,
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
    width: '84%',
    height: '100%',
    borderRadius: 99,
  },
});
