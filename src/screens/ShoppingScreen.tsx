import { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { AppScreen } from '../types';
import { shoppingCategories, shoppingProducts } from '../data/mockData';
import { ScreenTitle } from '../components/ScreenTitle';
import { SectionHeader } from '../components/SectionHeader';
import { ProductSection } from '../components/ProductSection';
import { CategoryCard } from '../components/CategoryCard';

const styles = StyleSheet.create({
  searchBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchText: {
    color: colors.mutedDark,
    fontSize: 15,
    marginLeft: 10,
  },
  shoppingBannerWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#F8F2E8',
  },
  shoppingBannerImage: {
    width: '100%',
    height: 220,
    borderRadius: 30,
  },
  shoppingSmallBanner: {
    minHeight: 92,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shoppingSmallBannerTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  shoppingSmallBannerText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 250,
  },
  shoppingSmallBannerBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(34,197,94,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  shoppingSmallBannerBadgeText: {
    color: colors.green,
    fontSize: 16,
    fontWeight: '900',
  },
  shoppingCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
});
export function ShoppingScreen({
  setActiveScreen,
}: {
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const productSections = useMemo(
    () => [
      {
        title: 'Destaques com cashback',
        products: shoppingProducts.slice(0, 4),
      },
      ...shoppingCategories.map((category) => ({
        title: category.label,
        products: shoppingProducts.filter(
          (product) => product.category === category.label
        ),
      })),
    ],
    []
  );

  return (
    <>
      <ScreenTitle
        title="Rocket Shopping"
        subtitle="Compre em lojas parceiras e receba cashback direto na conta."
      />

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color={colors.mutedDark} />
        <Text style={styles.searchText}>Buscar produtos, marcas ou lojas</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        style={styles.shoppingBannerWrapper}
        onPress={() => setActiveScreen('cashback')}
      >
        <Image
          source={require('../../assets/images/rocket-shopping-banner.png')}
          style={styles.shoppingBannerImage}
          resizeMode="cover"
        />
      </Pressable>

      <LinearGradient
        colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.035)']}
        style={styles.shoppingSmallBanner}
      >
        <View>
          <Text style={styles.shoppingSmallBannerTitle}>Semana Tech Rocket</Text>
          <Text style={styles.shoppingSmallBannerText}>
            Ofertas selecionadas em smartphones, notebooks, fones e relógios.
          </Text>
        </View>

        <View style={styles.shoppingSmallBannerBadge}>
          <Text style={styles.shoppingSmallBannerBadgeText}>+5%</Text>
        </View>
      </LinearGradient>

      <SectionHeader title="Categorias" />

      <View style={styles.shoppingCategoriesGrid}>
        {shoppingCategories.map((category) => (
          <CategoryCard
            key={category.label}
            icon={category.icon}
            label={category.label}
          />
        ))}
      </View>

      {productSections.map((section) => (
        <ProductSection
          key={section.title}
          title={section.title}
          products={section.products}
        />
      ))}
    </>
  );
}
