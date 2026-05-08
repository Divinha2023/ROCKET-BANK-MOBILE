import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { ShoppingProduct } from '../types';

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 14,
  },
  productImage: {
    width: '100%',
    height: 136,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  productContent: {
    padding: 12,
  },
  productStore: {
    color: colors.purpleSoft,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 5,
  },
  productName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
    minHeight: 38,
  },
  productOldPrice: {
    color: 'rgba(255,255,255,0.38)',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginTop: 8,
  },
  productPrice: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 2,
  },
  productCashbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34,197,94,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.24)',
    borderRadius: 99,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginTop: 10,
  },
  productCashbackText: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 5,
  },
});
type ProductCardProps = {
  product: ShoppingProduct;
  onPress?: (product: ShoppingProduct) => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={styles.productCard}
      onPress={() => onPress?.(product)}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productContent}>
        <Text style={styles.productStore}>{product.store}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        {product.oldPrice ? (
          <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
        ) : null}

        <Text style={styles.productPrice}>{product.price}</Text>

        <View style={styles.productCashbackRow}>
          <Ionicons name="cash-outline" size={15} color={colors.green} />
          <Text style={styles.productCashbackText}>
            {product.cashback} de cashback
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
