import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../theme';
import { AppLogo } from '../components/AppLogo';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  animationFrame: {
    width: 238,
    height: 238,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    marginBottom: -18,
  },
  animation: {
    width: 250,
    height: 250,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 14,
  },
  loaderTrack: {
    width: 148,
    height: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    marginTop: 34,
  },
  loaderFill: {
    width: '72%',
    height: '100%',
    borderRadius: 99,
  },
});

export function SplashScreen() {
  return (
    <LinearGradient
      colors={['#05010F', '#0E0622', '#1D0935']}
      style={styles.screen}
    >
      <StatusBar barStyle="light-content" backgroundColor="#05010F" />
      <View style={styles.content}>
        <AppLogo size="large" />
        <View style={styles.animationFrame}>
          <LottieView
            autoPlay
            loop
            source={require('../../assets/animations/rocket-launch.json')}
            style={styles.animation}
          />
        </View>
        <Text style={styles.subtitle}>
          Segurança, cashback e controle financeiro em um só lugar.
        </Text>
        <View style={styles.loaderTrack}>
          <LinearGradient
            colors={[colors.purpleStrong, colors.purpleSoft, colors.orange]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loaderFill}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
