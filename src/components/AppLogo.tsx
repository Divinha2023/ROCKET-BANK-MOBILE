import { Image, StyleSheet, View } from 'react-native';

type AppLogoProps = {
  size?: 'small' | 'large';
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoFrameSmall: {
    width: 174,
    height: 64,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFrameLarge: {
    width: 268,
    height: 118,
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSmall: {
    width: 174,
    height: 98,
    transform: [{ scale: 2.45 }],
  },
  logoLarge: {
    width: 268,
    height: 151,
    transform: [{ scale: 2.45 }],
  },
});

export function AppLogo({ size = 'small' }: AppLogoProps) {
  const isLarge = size === 'large';

  return (
    <View style={isLarge ? undefined : styles.row}>
      <View style={isLarge ? styles.logoFrameLarge : styles.logoFrameSmall}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={isLarge ? styles.logoLarge : styles.logoSmall}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
