import { StyleSheet, View } from 'react-native';

export function InvestIcon({
  color = '#fff',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  const stroke = Math.max(1.5, size * 0.075);
  const dotSize = size * 0.18;
  const barWidth = size * 0.15;

  return (
    <View style={[styles.icon, { height: size, width: size }]}>
      {[0.31, 0.5, 0.66, 0.82].map((height, index) => (
        <View
          key={height}
          style={[
            styles.bar,
            {
              borderColor: color,
              borderWidth: stroke,
              bottom: size * 0.04,
              height: size * height,
              left: size * (0.03 + index * 0.22),
              width: barWidth,
            },
          ]}
        />
      ))}

      {[
        { left: 0.03, top: 0.45, width: 0.36 },
        { left: 0.36, top: 0.35, width: 0.26 },
        { left: 0.55, top: 0.2, width: 0.36 },
      ].map((segment) => (
        <View
          key={`${segment.left}-${segment.top}`}
          style={[
            styles.trendSegment,
            {
              backgroundColor: color,
              height: stroke,
              left: size * segment.left,
              top: size * segment.top,
              width: size * segment.width,
            },
          ]}
        />
      ))}

      {[
        { left: 0.02, top: 0.41 },
        { left: 0.36, top: 0.31 },
        { left: 0.57, top: 0.16 },
        { left: 0.86, top: 0 },
      ].map((point) => (
        <View
          key={`${point.left}-${point.top}`}
          style={[
            styles.dot,
            {
              backgroundColor: color,
              height: dotSize,
              left: size * point.left,
              top: size * point.top,
              width: dotSize,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  dot: {
    borderRadius: 999,
    position: 'absolute',
  },
  icon: {
    position: 'relative',
  },
  trendSegment: {
    borderRadius: 999,
    position: 'absolute',
    transform: [{ rotate: '-18deg' }],
  },
});
