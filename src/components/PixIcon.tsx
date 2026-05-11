import { FontAwesome6 } from '@expo/vector-icons';

export function PixIcon({ color = '#fff', size = 24 }: { color?: string; size?: number }) {
  return <FontAwesome6 name="pix" iconStyle="brand" size={size} color={color} />;
}
