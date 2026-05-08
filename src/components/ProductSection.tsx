import { StyleSheet, View } from 'react-native';
import type { ShoppingProduct } from '../types';
import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';

const styles = StyleSheet.create({
  productSection: {
    marginBottom: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
export function ProductSection({
  onProductPress,
  onSeeAll,
  title,
  products,
}: {
  onProductPress?: (product: ShoppingProduct) => void;
  onSeeAll?: () => void;
  title: string;
  products: ShoppingProduct[];
}) {
  return (
    <View style={styles.productSection}>
      <SectionHeader title={title} action="Ver tudo" onPress={onSeeAll} />
      <View style={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={onProductPress}
          />
        ))}
      </View>
    </View>
  );
}
