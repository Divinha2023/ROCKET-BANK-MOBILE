import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { AppScreen, ShoppingProduct } from '../types';
import { shoppingCategories, shoppingProducts } from '../data/mockData';
import { ScreenTitle } from '../components/ScreenTitle';
import { SectionHeader } from '../components/SectionHeader';
import { ProductSection } from '../components/ProductSection';
import { CategoryCard } from '../components/CategoryCard';
import { formatCurrency, parseCurrency } from '../utils/currency';

const allCategoriesLabel = 'Todos';
const discountCoupon = 'ACCENTURE20';
const couponDiscountRate = 0.2;
const couponDiscountLimit = 800;

type CartItem = {
  product: ShoppingProduct;
  quantity: number;
};

type TrackingOrder = {
  cashback: number;
  code: string;
  discount: number;
  itemCount: number;
  total: number;
};

function parseCashbackRate(value: string) {
  return (Number(value.replace('%', '').replace(',', '.')) || 0) / 100;
}

const styles = StyleSheet.create({
  shoppingScreen: {
    flex: 1,
  },
  shoppingContent: {
    paddingBottom: 116,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
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
    flex: 1,
    color: colors.mutedDark,
    fontSize: 15,
    marginLeft: 10,
  },
  shoppingBannerWrapper: {
    aspectRatio: 1672 / 941,
    backgroundColor: '#050617',
    borderColor: 'rgba(168,85,247,0.28)',
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 24,
    overflow: 'hidden',
    width: '100%',
  },
  shoppingBannerImage: {
    height: '100%',
    width: '100%',
  },
  shoppingCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  emptyState: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  cartPanel: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 16,
    marginBottom: 24,
  },
  cartHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cartTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartIconBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(111,44,255,0.2)',
    borderColor: 'rgba(168,85,247,0.36)',
    borderRadius: 16,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    marginRight: 12,
    width: 42,
  },
  cartTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  cartCount: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  clearCartButton: {
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearCartText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
  },
  cartEmpty: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.045)',
    padding: 16,
  },
  cartEmptyTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  cartEmptyText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  cartItem: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    paddingBottom: 12,
    marginBottom: 12,
  },
  cartItemImage: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemStore: {
    color: colors.purpleSoft,
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 3,
  },
  cartItemName: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  cartItemPrice: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },
  quantityControl: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 8,
  },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  quantityText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    minWidth: 26,
    textAlign: 'center',
  },
  couponBox: {
    borderRadius: 20,
    backgroundColor: 'rgba(111,44,255,0.10)',
    borderColor: 'rgba(168,85,247,0.22)',
    borderWidth: 1,
    padding: 14,
    marginTop: 4,
  },
  couponLabel: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 10,
  },
  couponInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    height: 46,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.075)',
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 12,
    marginRight: 10,
  },
  applyCouponButton: {
    alignItems: 'center',
    backgroundColor: colors.purpleStrong,
    borderRadius: 15,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  applyCouponText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  cartSummary: {
    marginTop: 16,
  },
  summaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: colors.mutedDark,
    fontSize: 13,
    fontWeight: '800',
  },
  summaryValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  summaryDiscount: {
    color: colors.green,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.10)',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    color: colors.white,
    fontSize: 15,
  },
  totalValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  checkoutButton: {
    alignItems: 'center',
    borderRadius: 18,
    marginTop: 14,
    overflow: 'hidden',
  },
  checkoutGradient: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 52,
    width: '100%',
  },
  checkoutText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
  },
  floatingCartButton: {
    borderRadius: 30,
    bottom: 116,
    height: 60,
    overflow: 'hidden',
    position: 'absolute',
    right: 18,
    width: 60,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 10,
  },
  floatingCartGradient: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  floatingCartIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCartBadge: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: 'absolute',
    right: -11,
    top: -11,
  },
  floatingCartBadgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '900',
  },
  cartModalBackdrop: {
    backgroundColor: 'rgba(2,0,8,0.68)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  cartBackdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  cartSheet: {
    backgroundColor: '#090318',
    borderColor: 'rgba(255,255,255,0.12)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  cartSheetHandle: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 99,
    height: 4,
    marginBottom: 8,
    marginTop: 12,
    width: 46,
  },
  cartSheetScroll: {
    padding: 20,
    paddingBottom: 30,
  },
  cartPanelInModal: {
    marginBottom: 0,
  },
  trackingBackButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  trackingBackText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 6,
  },
  trackingHero: {
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 30,
    borderWidth: 1,
    marginBottom: 20,
    minHeight: 190,
    overflow: 'hidden',
    padding: 20,
  },
  trackingIconBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.16)',
    borderColor: 'rgba(34,197,94,0.28)',
    borderRadius: 20,
    borderWidth: 1,
    height: 52,
    justifyContent: 'center',
    marginBottom: 16,
    width: 52,
  },
  trackingEyebrow: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  trackingTitle: {
    color: colors.white,
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 32,
  },
  trackingSubtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  trackingSummary: {
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.055)',
    marginBottom: 20,
    padding: 16,
  },
  trackingSummaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  trackingSummaryLastRow: {
    marginBottom: 0,
  },
  trackingSummaryLabel: {
    color: colors.mutedDark,
    fontSize: 13,
    fontWeight: '800',
  },
  trackingSummaryValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  trackingTimeline: {
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.045)',
    padding: 18,
  },
  trackingStep: {
    flexDirection: 'row',
    minHeight: 82,
  },
  trackingStepLast: {
    minHeight: 0,
  },
  trackingStepRail: {
    alignItems: 'center',
    marginRight: 14,
    width: 24,
  },
  trackingStepDot: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 10,
    borderWidth: 1,
    height: 18,
    width: 18,
  },
  trackingStepDotActive: {
    backgroundColor: colors.green,
    borderColor: 'rgba(255,255,255,0.38)',
  },
  trackingStepLine: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    flex: 1,
    marginTop: 8,
    width: 2,
  },
  trackingStepContent: {
    flex: 1,
    paddingBottom: 22,
  },
  trackingStepTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  trackingStepText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  trackingStepMuted: {
    color: colors.mutedDark,
  },
});

export function ShoppingScreen({
  accountBalance,
  onEarnCashback,
  onDebitAccount,
  setActiveScreen,
}: {
  accountBalance: number;
  onEarnCashback: (amount: number) => void;
  onDebitAccount: (amount: number) => boolean;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const [activeCategory, setActiveCategory] = useState(allCategoriesLabel);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<TrackingOrder | null>(null);
  const trackingScrollRef = useRef<ScrollView>(null);
  const availableCategories = useMemo(
    () => shoppingCategories.filter((category) => category.available !== false),
    []
  );
  const availableCategoryLabels = useMemo(
    () => availableCategories.map((category) => category.label),
    [availableCategories]
  );

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleProducts = useMemo(
    () =>
      shoppingProducts.filter((product) => {
        const matchesAvailability = availableCategoryLabels.includes(
          product.category
        );
        const matchesCategory =
          activeCategory === allCategoriesLabel ||
          product.category === activeCategory;
        const matchesSearch =
          !normalizedSearch ||
          [product.name, product.store, product.category]
            .join(' ')
            .toLowerCase()
            .includes(normalizedSearch);

        return matchesAvailability && matchesCategory && matchesSearch;
      }),
    [activeCategory, availableCategoryLabels, normalizedSearch]
  );

  const productSections = useMemo(
    () => {
      if (activeCategory !== allCategoriesLabel || normalizedSearch) {
        return [
          {
            title:
              activeCategory === allCategoriesLabel
                ? 'Resultado da busca'
                : activeCategory,
            products: visibleProducts,
          },
        ];
      }

      return [
        {
          title: 'Destaques com cashback',
          products: visibleProducts.slice(0, 4),
        },
        ...availableCategories.map((category) => ({
          title: category.label,
          products: visibleProducts.filter(
            (product) => product.category === category.label
          ),
        })),
      ];
    },
    [activeCategory, availableCategories, normalizedSearch, visibleProducts]
  );
  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );
  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + parseCurrency(item.product.price) * item.quantity,
        0
      ),
    [cartItems]
  );
  const couponDiscount =
    appliedCoupon === discountCoupon
      ? Math.min(cartSubtotal * couponDiscountRate, couponDiscountLimit)
      : 0;
  const cartTotal = Math.max(cartSubtotal - couponDiscount, 0);
  const cartCashback = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          parseCurrency(item.product.price) *
            parseCashbackRate(item.product.cashback) *
            item.quantity,
        0
      ),
    [cartItems]
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      setAppliedCoupon(null);
      setCouponInput('');
    }
  }, [cartItems.length]);

  useEffect(() => {
    if (trackingOrder) {
      requestAnimationFrame(() => {
        trackingScrollRef.current?.scrollTo({ animated: false, y: 0 });
      });
    }
  }, [trackingOrder]);

  function handleProductPress(product: ShoppingProduct) {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.product.id === product.id);

      if (existingItem) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    Alert.alert(
      'Adicionado ao carrinho',
      `${product.name} foi adicionado ao carrinho.`,
      [
        {
          text: 'Continuar comprando',
          style: 'cancel',
        },
        {
          text: 'Finalizar pedido',
          onPress: () => setCartVisible(true),
        },
      ]
    );
  }

  function updateCartQuantity(productId: string, amount: number) {
    setCartItems((current) =>
      current.flatMap((item) => {
        if (item.product.id !== productId) {
          return [item];
        }

        const nextQuantity = item.quantity + amount;
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
      })
    );
  }

  function handleClearCart() {
    setCartItems([]);
    setCartVisible(false);
  }

  function handleApplyCoupon() {
    const normalizedCoupon = couponInput.trim().toUpperCase();

    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione um produto antes de aplicar cupom.');
      return;
    }

    if (normalizedCoupon !== discountCoupon) {
      setAppliedCoupon(null);
      Alert.alert('Cupom invalido', 'Digite ACCENTURE20 para aplicar o desconto.');
      return;
    }

    setAppliedCoupon(discountCoupon);
    setCouponInput(discountCoupon);
    Alert.alert(
      'Cupom aplicado',
      'ACCENTURE20 aplicou 20% de desconto.'
    );
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione um produto para finalizar a compra.');
      return;
    }

    if (!onDebitAccount(cartTotal)) {
      Alert.alert(
        'Saldo insuficiente',
        `Não há saldo suficiente para pagar ${formatCurrency(cartTotal)}.`
      );
      return;
    }

    setTrackingOrder({
      cashback: cartCashback,
      code: `RB${Date.now().toString().slice(-6)}`,
      discount: couponDiscount,
      itemCount: cartItemCount,
      total: cartTotal,
    });
    onEarnCashback(cartCashback);
    setCartItems([]);
    setCartVisible(false);
  }

  function handleSeeAll(title: string) {
    if (title === 'Destaques com cashback') {
      setActiveCategory(allCategoriesLabel);
      setSearchTerm('');
      Alert.alert('Destaques', 'Mostrando todos os produtos com cashback.');
      return;
    }

    setActiveCategory(title);
    setSearchTerm('');
  }

  function renderCartContent() {
    return (
      <View style={[styles.cartPanel, styles.cartPanelInModal]}>
        <View style={styles.cartHeader}>
          <View style={styles.cartTitleRow}>
            <View style={styles.cartIconBadge}>
              <Ionicons name="cart-outline" size={22} color={colors.white} />
            </View>

            <View>
              <Text style={styles.cartTitle}>Carrinho</Text>
              <Text style={styles.cartCount}>
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'itens'}
              </Text>
            </View>
          </View>

          {cartItems.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              onPress={handleClearCart}
              style={styles.clearCartButton}
            >
              <Text style={styles.clearCartText}>Limpar</Text>
            </Pressable>
          ) : null}
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.cartEmpty}>
            <Text style={styles.cartEmptyTitle}>Seu carrinho está vazio</Text>
            <Text style={styles.cartEmptyText}>
              Produtos selecionados aparecem aqui antes da finalização.
            </Text>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.product.id} style={styles.cartItem}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.cartItemImage}
                  resizeMode="cover"
                />

                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemStore}>{item.product.store}</Text>
                  <Text style={styles.cartItemName} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.cartItemPrice}>{item.product.price}</Text>
                </View>

                <View style={styles.quantityControl}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => updateCartQuantity(item.product.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Ionicons name="remove" size={18} color={colors.white} />
                  </Pressable>

                  <Text style={styles.quantityText}>{item.quantity}</Text>

                  <Pressable
                    accessibilityRole="button"
                    onPress={() => updateCartQuantity(item.product.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Ionicons name="add" size={18} color={colors.white} />
                  </Pressable>
                </View>
              </View>
            ))}

            <View style={styles.couponBox}>
              <Text style={styles.couponLabel}>Cupom de desconto</Text>

              <View style={styles.couponInputRow}>
                <TextInput
                  autoCapitalize="characters"
                  autoCorrect={false}
                  onChangeText={(value) => setCouponInput(value.toUpperCase())}
                  placeholder="Digite o cupom"
                  placeholderTextColor={colors.mutedDark}
                  style={styles.couponInput}
                  value={couponInput}
                />

                <Pressable
                  accessibilityRole="button"
                  onPress={handleApplyCoupon}
                  style={styles.applyCouponButton}
                >
                  <Text style={styles.applyCouponText}>Aplicar</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.cartSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(cartSubtotal)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Desconto</Text>
                <Text style={[styles.summaryValue, styles.summaryDiscount]}>
                  -{formatCurrency(couponDiscount)}
                </Text>
              </View>

              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={[styles.summaryLabel, styles.totalLabel]}>
                  Total
                </Text>
                <Text style={styles.totalValue}>{formatCurrency(cartTotal)}</Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            >
              <LinearGradient
                colors={[colors.purpleStrong, colors.purpleSoft, colors.orange]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.checkoutGradient}
              >
                <Ionicons
                  name="bag-check-outline"
                  size={19}
                  color={colors.white}
                />
                <Text style={styles.checkoutText}>Finalizar compra</Text>
              </LinearGradient>
            </Pressable>
          </>
        )}
      </View>
    );
  }

  if (trackingOrder) {
    return (
      <View style={styles.shoppingScreen}>
        <ScrollView
          ref={trackingScrollRef}
          contentContainerStyle={styles.shoppingContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            onPress={() => setTrackingOrder(null)}
            style={styles.trackingBackButton}
          >
            <Ionicons name="chevron-back" size={17} color={colors.muted} />
            <Text style={styles.trackingBackText}>Voltar ao shopping</Text>
          </Pressable>

          <LinearGradient
            colors={['rgba(34,197,94,0.18)', 'rgba(111,44,255,0.12)']}
            style={styles.trackingHero}
          >
            <View style={styles.trackingIconBadge}>
              <Ionicons
                name="cube-outline"
                size={28}
                color={colors.green}
              />
            </View>
            <Text style={styles.trackingEyebrow}>Pedido confirmado</Text>
            <Text style={styles.trackingTitle}>Rastreio da encomenda</Text>
            <Text style={styles.trackingSubtitle}>
              Acompanhe cada etapa do envio do seu pedido Rocket Shopping.
            </Text>
          </LinearGradient>

          <View style={styles.trackingSummary}>
            <View style={styles.trackingSummaryRow}>
              <Text style={styles.trackingSummaryLabel}>Pedido</Text>
              <Text style={styles.trackingSummaryValue}>{trackingOrder.code}</Text>
            </View>
            <View style={styles.trackingSummaryRow}>
              <Text style={styles.trackingSummaryLabel}>Itens</Text>
              <Text style={styles.trackingSummaryValue}>
                {trackingOrder.itemCount}
              </Text>
            </View>
            <View style={styles.trackingSummaryRow}>
              <Text style={styles.trackingSummaryLabel}>Desconto</Text>
              <Text style={[styles.trackingSummaryValue, styles.summaryDiscount]}>
                -{formatCurrency(trackingOrder.discount)}
              </Text>
            </View>
            <View style={styles.trackingSummaryRow}>
              <Text style={styles.trackingSummaryLabel}>Cashback gerado</Text>
              <Text style={[styles.trackingSummaryValue, styles.summaryDiscount]}>
                +{formatCurrency(trackingOrder.cashback)}
              </Text>
            </View>
            <View
              style={[
                styles.trackingSummaryRow,
                styles.trackingSummaryLastRow,
              ]}
            >
              <Text style={styles.trackingSummaryLabel}>Total pago</Text>
              <Text style={styles.trackingSummaryValue}>
                {formatCurrency(trackingOrder.total)}
              </Text>
            </View>
          </View>

          <View style={styles.trackingTimeline}>
            <View style={styles.trackingStep}>
              <View style={styles.trackingStepRail}>
                <View
                  style={[
                    styles.trackingStepDot,
                    styles.trackingStepDotActive,
                  ]}
                />
                <View style={styles.trackingStepLine} />
              </View>
              <View style={styles.trackingStepContent}>
                <Text style={styles.trackingStepTitle}>Preparação do pedido</Text>
                <Text style={styles.trackingStepText}>
                  Seu pacote está sendo embalado, em breve será enviado.
                </Text>
              </View>
            </View>

            <View style={styles.trackingStep}>
              <View style={styles.trackingStepRail}>
                <View style={styles.trackingStepDot} />
                <View style={styles.trackingStepLine} />
              </View>
              <View style={styles.trackingStepContent}>
                <Text style={styles.trackingStepTitle}>Envio</Text>
                <Text style={[styles.trackingStepText, styles.trackingStepMuted]}>
                  Atualizaremos esta etapa quando o pedido sair para transporte.
                </Text>
              </View>
            </View>

            <View style={[styles.trackingStep, styles.trackingStepLast]}>
              <View style={styles.trackingStepRail}>
                <View style={styles.trackingStepDot} />
              </View>
              <View style={styles.trackingStepContent}>
                <Text style={styles.trackingStepTitle}>Entrega</Text>
                <Text style={[styles.trackingStepText, styles.trackingStepMuted]}>
                  A previsao aparece assim que a transportadora confirmar a rota.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.shoppingScreen}>
      <ScrollView
        contentContainerStyle={styles.shoppingContent}
        showsVerticalScrollIndicator={false}
      >
      <ScreenTitle
        title="Rocket Shopping"
        subtitle="Compre em lojas parceiras e receba cashback direto na conta."
      />

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color={colors.mutedDark} />
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Buscar produtos, marcas ou lojas"
          placeholderTextColor={colors.mutedDark}
          autoCorrect={false}
          style={styles.searchText}
        />
        {searchTerm ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={() => setSearchTerm('')}
          >
            <Ionicons name="close-circle" size={20} color={colors.mutedDark} />
          </Pressable>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => setActiveScreen('cashback')}
        style={styles.shoppingBannerWrapper}
      >
        <Image
          source={require('../../assets/images/rocket-shopping-banner.png')}
          style={styles.shoppingBannerImage}
          resizeMode="contain"
        />
      </Pressable>

      {!normalizedSearch ? (
        <>
          <SectionHeader title="Categorias" />

          <View style={styles.shoppingCategoriesGrid}>
            <CategoryCard
              active={activeCategory === allCategoriesLabel}
              icon="apps-outline"
              label={allCategoriesLabel}
              onPress={() => setActiveCategory(allCategoriesLabel)}
            />

            {shoppingCategories.map((category) => (
              <CategoryCard
                active={activeCategory === category.label}
                disabled={category.available === false}
                key={category.label}
                icon={category.icon}
                label={category.label}
                onPress={() => setActiveCategory(category.label)}
              />
            ))}
          </View>
        </>
      ) : null}

      {visibleProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
          <Text style={styles.emptyText}>
            Tente buscar por outra loja, produto ou categoria.
          </Text>
        </View>
      ) : (
        productSections.map((section) => (
          <ProductSection
            key={section.title}
            title={section.title}
            products={section.products}
            onProductPress={handleProductPress}
            onSeeAll={() => handleSeeAll(section.title)}
          />
        ))
      )}
      </ScrollView>

      {cartItemCount > 0 ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => setCartVisible(true)}
          style={styles.floatingCartButton}
        >
          <LinearGradient
            colors={['rgba(111,44,255,0.96)', 'rgba(168,85,247,0.92)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.floatingCartGradient}
          >
            <View style={styles.floatingCartIcon}>
              <Ionicons name="cart" size={24} color={colors.white} />
              <View style={styles.floatingCartBadge}>
                <Text style={styles.floatingCartBadgeText}>{cartItemCount}</Text>
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      ) : null}

      <Modal
        animationType="slide"
        onRequestClose={() => setCartVisible(false)}
        transparent
        visible={cartVisible}
      >
        <View style={styles.cartModalBackdrop}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setCartVisible(false)}
            style={styles.cartBackdropPressable}
          />

          <View style={styles.cartSheet}>
            <View style={styles.cartSheetHandle} />
            <ScrollView
              contentContainerStyle={styles.cartSheetScroll}
              showsVerticalScrollIndicator={false}
            >
              {renderCartContent()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
