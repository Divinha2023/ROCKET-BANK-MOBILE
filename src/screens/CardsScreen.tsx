import { type Dispatch, type SetStateAction, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { RocketCard } from '../components/RocketCard';
import { MenuRow } from '../components/MenuRow';
import { availableVirtualCards, userCards } from '../data/mockData';
import type { AppScreen, UserCard } from '../types';
import { formatCurrency, parseCurrency } from '../utils/currency';

const maxCardsPerUser = 3;
const screenWidth = Dimensions.get('window').width;
const cardGap = 14;
const cardWidth = screenWidth - 40;
const snapInterval = cardWidth + cardGap;
const invoiceCashbackRate = 0.03;

function shiftInvoiceDate(dateValue: string, days: number) {
  const [day, month] = dateValue.split('/').map(Number);

  if (!day || !month) {
    return dateValue;
  }

  const date = new Date(new Date().getFullYear(), month - 1, day);
  date.setDate(date.getDate() + days);

  return `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1
  ).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  topBanner: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 22,
  },
  topBannerGradient: {
    minHeight: 96,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBannerText: {
    flex: 1,
    paddingRight: 16,
  },
  topBannerTitle: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
  },
  topBannerArt: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  topBannerOrb: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    right: -36,
    top: -38,
    backgroundColor: 'rgba(248,215,119,0.28)',
  },
  topBannerMiniCard: {
    width: 58,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#07070A',
    borderWidth: 1,
    borderColor: 'rgba(248,215,119,0.48)',
    padding: 8,
    justifyContent: 'space-between',
    transform: [{ rotate: '-8deg' }],
  },
  topBannerMiniLine: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F8D777',
  },
  topBannerMiniDots: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topBannerMiniDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.72)',
    marginLeft: -3,
  },
  carouselHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  carouselHeaderInfo: {
    flex: 1,
    marginRight: 12,
  },
  selectedTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  selectedSubtitle: {
    color: colors.mutedDark,
    fontSize: 12,
    marginTop: 4,
  },
  counterPill: {
    borderRadius: 999,
    backgroundColor: 'rgba(139,92,246,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.30)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  counterPillText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  swipeHintText: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '800',
    marginHorizontal: 8,
  },
  carousel: {
    marginHorizontal: -20,
    marginBottom: 8,
  },
  carouselContent: {
    paddingHorizontal: 20,
  },
  cardSlide: {
    width: cardWidth,
    marginRight: cardGap,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
    marginHorizontal: 4,
  },
  indicatorActive: {
    width: 22,
    backgroundColor: colors.purpleSoft,
  },
  limitAvailableCard: {
    minHeight: 72,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  limitAvailableLabel: {
    color: colors.mutedDark,
    fontSize: 13,
    flexShrink: 0,
    marginRight: 12,
  },
  limitAvailableValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    flex: 1,
    textAlign: 'right',
  },
  invoiceHighlight: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
  },
  invoiceHighlightGradient: {
    padding: 20,
  },
  invoiceHighlightTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  invoiceHighlightLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  invoiceHighlightStatus: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  invoiceHighlightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  invoiceVisibilityButton: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  invoiceHighlightStatusText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
  invoiceHighlightValue: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
  },
  invoiceHighlightCaption: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },
  invoiceInsight: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  invoiceInsightIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 13,
    height: 34,
    justifyContent: 'center',
    marginRight: 10,
    width: 34,
  },
  invoiceInsightText: {
    color: colors.white,
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  invoiceCashbackCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.22)',
    borderColor: 'rgba(134,239,172,0.42)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  invoiceCashbackIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.34)',
    borderRadius: 13,
    height: 34,
    justifyContent: 'center',
    marginRight: 10,
    width: 34,
  },
  invoiceCashbackInfo: {
    flex: 1,
    marginRight: 10,
  },
  invoiceCashbackLabel: {
    color: 'rgba(220,252,231,0.86)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  invoiceCashbackText: {
    color: 'rgba(240,253,244,0.86)',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  invoiceCashbackValue: {
    color: '#BBF7D0',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'right',
  },
  invoiceDetailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginHorizontal: -5,
  },
  invoiceDetailItem: {
    width: '50%',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  invoiceDetailBox: {
    minHeight: 62,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  invoiceDetailLabel: {
    color: 'rgba(255,255,255,0.66)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  invoiceDetailValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  invoicePayButton: {
    height: 48,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  invoicePayButtonText: {
    color: '#32105F',
    fontSize: 14,
    fontWeight: '900',
  },
});

export function CardsScreen({
  cards,
  paidInvoiceCardIds,
  setCards,
  setActiveScreen,
  setSelectedInvoiceCardId,
}: {
  cards: UserCard[];
  paidInvoiceCardIds: Record<string, boolean>;
  setCards: Dispatch<SetStateAction<UserCard[]>>;
  setActiveScreen: (screen: AppScreen) => void;
  setSelectedInvoiceCardId: (cardId: string) => void;
}) {
  const carouselRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hiddenCardIds, setHiddenCardIds] = useState<Record<string, boolean>>({
    [userCards[0].id]: true,
  });
  const [visibleInvoiceCardIds, setVisibleInvoiceCardIds] = useState<
    Record<string, boolean>
  >({});
  const [blockedCardIds, setBlockedCardIds] = useState<Record<string, boolean>>(
    {}
  );
  const selectedCard = cards[Math.min(selectedIndex, cards.length - 1)];
  const selectedCardBlocked = Boolean(blockedCardIds[selectedCard.id]);
  const selectedCardHidden =
    selectedCardBlocked || (hiddenCardIds[selectedCard.id] ?? true);
  const selectedCardInvoicePaid = Boolean(paidInvoiceCardIds[selectedCard.id]);
  const selectedCardInvoiceVisible = Boolean(
    visibleInvoiceCardIds[selectedCard.id]
  );
  const hiddenInvoiceValue = '••••••';
  const hiddenShortDate = '••/••';
  const displayedLimitValue = selectedCardHidden
    ? hiddenInvoiceValue
    : selectedCard.limit;
  const statementValue = selectedCardInvoicePaid
    ? 'R$ 0'
    : selectedCard.invoiceTotal;
  const invoiceCashbackValue =
    parseCurrency(selectedCard.invoiceTotal) * invoiceCashbackRate;
  const minimumPaymentValue = selectedCardInvoicePaid
    ? 'R$ 0'
    : formatCurrency(parseCurrency(selectedCard.invoiceTotal) * 0.15);
  const displayedStatementValue = !selectedCardInvoiceVisible
    ? hiddenInvoiceValue
    : statementValue;
  const displayedDueDate = !selectedCardInvoiceVisible
    ? hiddenShortDate
    : selectedCard.invoiceDueDate;
  const displayedClosingDate = !selectedCardInvoiceVisible
    ? hiddenShortDate
    : shiftInvoiceDate(selectedCard.invoiceDueDate, -7);
  const displayedBestPurchaseDate = !selectedCardInvoiceVisible
    ? hiddenShortDate
    : shiftInvoiceDate(selectedCard.invoiceDueDate, -6);
  const displayedMinimumPayment = !selectedCardInvoiceVisible
    ? hiddenInvoiceValue
    : minimumPaymentValue;
  const displayedInvoiceCashback = !selectedCardInvoiceVisible
    ? hiddenInvoiceValue
    : formatCurrency(invoiceCashbackValue);
  const displayedInvoiceStatus = !selectedCardInvoiceVisible
    ? hiddenInvoiceValue
    : selectedCardInvoicePaid
      ? 'Paga'
      : 'Aberta';
  const displayedInvoicePaymentHint = !selectedCardInvoiceVisible
    ? hiddenInvoiceValue
    : selectedCardInvoicePaid
      ? 'Sem valor pendente'
      : 'Pagamento disponível';
  const invoiceInsightText = !selectedCardInvoiceVisible
    ? hiddenInvoiceValue
    : selectedCardInvoicePaid
      ? 'Fatura quitada. Nenhum pagamento pendente para este cartão.'
      : `Pagamento mínimo de ${minimumPaymentValue} disponível até ${selectedCard.invoiceDueDate}.`;

  function scrollToCard(index: number) {
    carouselRef.current?.scrollTo({
      animated: true,
      x: index * snapInterval,
    });
  }

  function handleCarouselEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / snapInterval);
    setSelectedIndex(Math.min(Math.max(nextIndex, 0), cards.length - 1));
  }

  function toggleCardVisibility(cardId: string) {
    setHiddenCardIds((current) => ({
      ...current,
      [cardId]: !(current[cardId] ?? true),
    }));
  }

  function toggleInvoiceVisibility(cardId: string) {
    setVisibleInvoiceCardIds((current) => ({
      ...current,
      [cardId]: !current[cardId],
    }));
  }

  function toggleBlockCard() {
    const nextBlocked = !selectedCardBlocked;

    if (nextBlocked) {
      setHiddenCardIds((current) => ({
        ...current,
        [selectedCard.id]: true,
      }));
    }

    setBlockedCardIds((current) => ({
      ...current,
      [selectedCard.id]: nextBlocked,
    }));

    Alert.alert(
      nextBlocked ? 'Cartão bloqueado' : 'Cartão desbloqueado',
      nextBlocked
        ? `${selectedCard.title} ficou inativo para compras.`
        : `${selectedCard.title} voltou a ficar disponível.`
    );
  }

  function showWalletDetails() {
    Alert.alert(
      'Carteira Rocket',
      `${cards.length}/${maxCardsPerUser} cartões ativos.\nArraste os cartões para alternar entre eles.`
    );
  }

  function openBlackCard() {
    const blackCardIndex = cards.findIndex((card) => card.variant === 'black');

    if (blackCardIndex < 0) {
      return;
    }

    setSelectedIndex(blackCardIndex);
    scrollToCard(blackCardIndex);
  }

  function addVirtualCard() {
    if (cards.length >= maxCardsPerUser) {
      Alert.alert(
        'Limite atingido',
        'Cada usuário pode ter no máximo 3 cartões ativos.'
      );
      return;
    }

    const nextCard = availableVirtualCards.find(
      (card) => !cards.some((currentCard) => currentCard.id === card.id)
    );

    if (!nextCard) {
      Alert.alert('Cartões', 'Não há outro cartão virtual disponível agora.');
      return;
    }

    setCards((current) => [...current, nextCard]);
    setHiddenCardIds((current) => ({
      ...current,
      [nextCard.id]: true,
    }));

    const nextIndex = cards.length;
    setSelectedIndex(nextIndex);
    requestAnimationFrame(() => scrollToCard(nextIndex));
    Alert.alert('Cartão adicionado', `${nextCard.title} foi adicionado.`);
  }

  function removeSelectedCard() {
    if (selectedCard.kind === 'main') {
      Alert.alert(
        'Cartão principal',
        'O cartão principal não pode ser removido por aqui.'
      );
      return;
    }

    const nextCards = cards.filter((card) => card.id !== selectedCard.id);
    const nextIndex = Math.max(0, selectedIndex - 1);

    setCards(nextCards);
    setSelectedIndex(nextIndex);
    requestAnimationFrame(() => scrollToCard(nextIndex));
    Alert.alert('Cartão removido', `${selectedCard.title} saiu da carteira.`);
  }

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={openBlackCard}
        style={styles.topBanner}
      >
        <LinearGradient
          colors={['#07070A', '#17121F', '#3A2B12']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topBannerGradient}
        >
          <View style={styles.topBannerText}>
            <Text style={styles.topBannerTitle}>Meus Cartões</Text>
          </View>

          <View style={styles.topBannerArt}>
            <View style={styles.topBannerOrb} />
            <View style={styles.topBannerMiniCard}>
              <View style={styles.topBannerMiniLine} />
              <View style={styles.topBannerMiniDots}>
                <View style={styles.topBannerMiniDot} />
                <View style={styles.topBannerMiniDot} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      <View style={styles.carouselHeader}>
        <View style={styles.carouselHeaderInfo}>
          <Text style={styles.selectedTitle}>{selectedCard.title}</Text>
          <Text style={styles.selectedSubtitle}>
            {selectedCard.description}
          </Text>
        </View>
        <View style={styles.counterPill}>
          <Text style={styles.counterPillText}>
            {selectedIndex + 1}/{cards.length}
          </Text>
        </View>
      </View>

      <View style={styles.swipeHint}>
        <Ionicons name="chevron-back" size={16} color={colors.mutedDark} />
        <Text style={styles.swipeHintText}>arraste para trocar</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.mutedDark} />
      </View>

      <ScrollView
        ref={carouselRef}
        horizontal
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={snapInterval}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
        onMomentumScrollEnd={handleCarouselEnd}
      >
        {cards.map((card) => (
          <View key={card.id} style={styles.cardSlide}>
            <RocketCard
              blocked={Boolean(blockedCardIds[card.id])}
              cvv={card.cvv}
              dueDate={card.dueDate}
              hidden={
                Boolean(blockedCardIds[card.id]) ||
                (hiddenCardIds[card.id] ?? true)
              }
              holder={card.holder}
              number={card.number}
              onToggleVisibility={() => toggleCardVisibility(card.id)}
              selected={card.id === selectedCard.id}
              variant={card.variant}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicators}>
        {cards.map((card, index) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: index === selectedIndex }}
            key={card.id}
            onPress={() => {
              setSelectedIndex(index);
              scrollToCard(index);
            }}
            style={[
              styles.indicator,
              index === selectedIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.limitAvailableCard}>
        <Text style={styles.limitAvailableLabel}>Limite disponível</Text>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.72}
          numberOfLines={1}
          style={styles.limitAvailableValue}
        >
          {displayedLimitValue}
        </Text>
      </View>

      <View style={styles.invoiceHighlight}>
        <LinearGradient
          colors={[
            'rgba(111,44,255,0.92)',
            'rgba(168,85,247,0.70)',
            'rgba(255,123,84,0.56)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.invoiceHighlightGradient}
        >
          <View style={styles.invoiceHighlightTop}>
            <Text style={styles.invoiceHighlightLabel}>Fatura do cartão</Text>
            <View style={styles.invoiceHighlightActions}>
              <View style={styles.invoiceHighlightStatus}>
                <Text style={styles.invoiceHighlightStatusText}>
                  {displayedInvoiceStatus}
                </Text>
              </View>

              <Pressable
                accessibilityLabel={
                  selectedCardInvoiceVisible
                    ? 'Ocultar fatura'
                    : 'Mostrar fatura'
                }
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => toggleInvoiceVisibility(selectedCard.id)}
                style={styles.invoiceVisibilityButton}
              >
                <Ionicons
                  name={
                    selectedCardInvoiceVisible
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={19}
                  color={colors.white}
                />
              </Pressable>
            </View>
          </View>

          <Text style={styles.invoiceHighlightValue}>
            {displayedStatementValue}
          </Text>
          <Text style={styles.invoiceHighlightCaption}>
            {selectedCardInvoiceVisible
              ? `Fecha em ${displayedClosingDate} | mínimo ${displayedMinimumPayment}`
              : hiddenInvoiceValue}
          </Text>

          <View style={styles.invoiceInsight}>
            <View style={styles.invoiceInsightIcon}>
              <Ionicons
                name={
                  selectedCardInvoiceVisible && selectedCardInvoicePaid
                    ? 'checkmark-circle-outline'
                    : 'receipt-outline'
                }
                size={20}
                color={colors.white}
              />
            </View>
            <Text style={styles.invoiceInsightText}>{invoiceInsightText}</Text>
          </View>

          <View style={styles.invoiceCashbackCard}>
            <View style={styles.invoiceCashbackIcon}>
              <Ionicons name="sparkles-outline" size={20} color="#BBF7D0" />
            </View>
            <View style={styles.invoiceCashbackInfo}>
              <Text style={styles.invoiceCashbackLabel}>Cashback gerado</Text>
              <Text style={styles.invoiceCashbackText}>
                3% sobre o valor total da fatura
              </Text>
            </View>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.78}
              numberOfLines={1}
              style={styles.invoiceCashbackValue}
            >
              {displayedInvoiceCashback}
            </Text>
          </View>

          <View style={styles.invoiceDetailGrid}>
            <View style={styles.invoiceDetailItem}>
              <View style={styles.invoiceDetailBox}>
                <Text style={styles.invoiceDetailLabel}>Vencimento</Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  numberOfLines={1}
                  style={styles.invoiceDetailValue}
                >
                  {displayedDueDate}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceDetailItem}>
              <View style={styles.invoiceDetailBox}>
                <Text style={styles.invoiceDetailLabel}>Situação</Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  numberOfLines={1}
                  style={styles.invoiceDetailValue}
                >
                  {displayedInvoicePaymentHint}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceDetailItem}>
              <View style={styles.invoiceDetailBox}>
                <Text style={styles.invoiceDetailLabel}>Fechamento</Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  numberOfLines={1}
                  style={styles.invoiceDetailValue}
                >
                  {displayedClosingDate}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceDetailItem}>
              <View style={styles.invoiceDetailBox}>
                <Text style={styles.invoiceDetailLabel}>Mínimo</Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  numberOfLines={1}
                  style={styles.invoiceDetailValue}
                >
                  {displayedMinimumPayment}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceDetailItem}>
              <View style={styles.invoiceDetailBox}>
                <Text style={styles.invoiceDetailLabel}>Melhor dia</Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  numberOfLines={1}
                  style={styles.invoiceDetailValue}
                >
                  {displayedBestPurchaseDate}
                </Text>
              </View>
            </View>

            <View style={styles.invoiceDetailItem}>
              <View style={styles.invoiceDetailBox}>
                <Text style={styles.invoiceDetailLabel}>Cashback total</Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  numberOfLines={1}
                  style={styles.invoiceDetailValue}
                >
                  {displayedInvoiceCashback}
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setSelectedInvoiceCardId(selectedCard.id);
              setActiveScreen('invoice');
            }}
            style={styles.invoicePayButton}
          >
            <Text style={styles.invoicePayButtonText}>Abrir fatura</Text>
          </Pressable>
        </LinearGradient>
      </View>

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="wallet-outline"
          title="Carteira Rocket"
          subtitle={`${cards.length}/${maxCardsPerUser} cartões ativos. Arraste para alternar.`}
          onPress={showWalletDetails}
        />

        <MenuRow
          icon={selectedCardBlocked ? 'lock-open-outline' : 'lock-closed-outline'}
          title={selectedCardBlocked ? 'Desbloquear cartão' : 'Bloquear cartão'}
          subtitle={
            selectedCardBlocked
              ? 'O cartão selecionado está transparente e inativo.'
              : 'Bloqueie o cartão selecionado em tempo real.'
          }
          onPress={toggleBlockCard}
        />

        <MenuRow
          icon="receipt-outline"
          title="Gerar fatura"
          subtitle="Abre a fatura em uma tela própria com itens e pagamento."
          onPress={() => {
            setSelectedInvoiceCardId(selectedCard.id);
            setActiveScreen('invoice');
          }}
        />

        <MenuRow
          icon="add-circle-outline"
          title="Adicionar cartão virtual"
          subtitle="Cria outro cartão até o limite de 3 por usuário."
          onPress={addVirtualCard}
        />

        <MenuRow
          icon="trash-outline"
          title="Remover cartão selecionado"
          subtitle="Remove cartões virtuais da carteira."
          onPress={removeSelectedCard}
        />
      </View>
    </>
  );
}
