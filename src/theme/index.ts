import { Dimensions, StyleSheet } from 'react-native';

export const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export const HERO_SPACE = Math.min(Math.max(SCREEN_HEIGHT * 0.45, 360), 430);

export const colors = {
  background: '#05010F',
  card: 'rgba(18, 18, 30, 0.58)',
  input: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.12)',
  purple: '#8B5CF6',
  purpleStrong: '#6F2CFF',
  purpleSoft: '#A855F7',
  orange: '#FF7B54',
  white: '#FFFFFF',
  muted: '#C2C2D0',
  mutedDark: '#A6A6B8',
  green: '#22C55E',
  gold: '#F8D777',
};

export const commonStyles = StyleSheet.create({
  listCard: {
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  twoColumns: {
    flexDirection: 'row',
    marginBottom: 24,
  },
});
