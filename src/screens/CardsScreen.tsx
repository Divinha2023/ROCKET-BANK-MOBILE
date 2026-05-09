import { useRef, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { RocketCard } from '../components/RocketCard';
import { MetricCard } from '../components/MetricCard';
import { MenuRow } from '../components/MenuRow';
import { availableVirtualCards, cardInvoice, userCards } from '../data/mockData';
import type { AppScreen, UserCard } from '../types';

const maxCardsPerUser = 3;
const screenWidth = Dimensions.get('window').width;
const cardGap = 14;
const cardWidth = screenWidth - 40;
const snapInterval = cardWidth + cardGap;

const styles = StyleSheet.create({
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
});

export function CardsScreen({
  invoicePaid,
  setActiveScreen,
}: {
  invoicePaid: boolean;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const carouselRef = useRef<ScrollView>(null);
  const [cards, setCards] = useState<UserCard[]>(userCards);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hiddenCardIds, setHiddenCardIds] = useState<Record<string, boolean>>({
    [userCards[0].id]: true,
  });
  const [blockedCardIds, setBlockedCardIds] = useState<Record<string, boolean>>(
    {}
  );
  const selectedCard = cards[Math.min(selectedIndex, cards.length - 1)];
  const selectedCardBlocked = Boolean(blockedCardIds[selectedCard.id]);
  const selectedCardHidden = hiddenCardIds[selectedCard.id] ?? true;
  const statementValue = invoicePaid ? 'R$ 0' : cardInvoice.total;

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

  function toggleBlockCard() {
    setBlockedCardIds((current) => {
      const nextBlocked = !current[selectedCard.id];
      Alert.alert(
        nextBlocked ? 'Cartao bloqueado' : 'Cartao desbloqueado',
        nextBlocked
          ? `${selectedCard.title} ficou inativo para compras.`
          : `${selectedCard.title} voltou a ficar disponivel.`
      );

      return {
        ...current,
        [selectedCard.id]: nextBlocked,
      };
    });
  }

  function showWalletDetails() {
    Alert.alert(
      'Carteira Rocket',
      `${cards.length}/${maxCardsPerUser} cartoes ativos.\nArraste os cartoes para alternar entre eles.`
    );
  }

  function addVirtualCard() {
    if (cards.length >= maxCardsPerUser) {
      Alert.alert(
        'Limite atingido',
        'Cada usuario pode ter no maximo 3 cartoes ativos.'
      );
      return;
    }

    const nextCard = availableVirtualCards.find(
      (card) => !cards.some((currentCard) => currentCard.id === card.id)
    );

    if (!nextCard) {
      Alert.alert('Cartoes', 'Nao ha outro cartao virtual disponivel agora.');
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
    Alert.alert('Cartao adicionado', `${nextCard.title} foi adicionado.`);
  }

  function removeSelectedCard() {
    if (selectedCard.kind === 'main') {
      Alert.alert(
        'Cartao principal',
        'O cartao principal nao pode ser removido por aqui.'
      );
      return;
    }

    const nextCards = cards.filter((card) => card.id !== selectedCard.id);
    const nextIndex = Math.max(0, selectedIndex - 1);

    setCards(nextCards);
    setSelectedIndex(nextIndex);
    requestAnimationFrame(() => scrollToCard(nextIndex));
    Alert.alert('Cartao removido', `${selectedCard.title} saiu da carteira.`);
  }

  return (
    <>
      <ScreenTitle
        title="Meus cartoes"
        subtitle="Arraste para alternar entre os cartoes criados."
      />

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
              hidden={hiddenCardIds[card.id] ?? true}
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

      <View style={commonStyles.twoColumns}>
        <MetricCard label="Limite disponivel" value={cardInvoice.limit} />
        <MetricCard label="Fatura atual" value={statementValue} />
      </View>

      <View style={commonStyles.twoColumns}>
        <MetricCard label="Data de vencimento" value={cardInvoice.dueDate} />
        <MetricCard label="Status da fatura" value={invoicePaid ? 'Paga' : 'Aberta'} />
      </View>

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="wallet-outline"
          title="Carteira Rocket"
          subtitle={`${cards.length}/${maxCardsPerUser} cartoes ativos. Arraste para alternar.`}
          onPress={showWalletDetails}
        />

        <MenuRow
          icon={selectedCardBlocked ? 'lock-open-outline' : 'lock-closed-outline'}
          title={selectedCardBlocked ? 'Desbloquear cartao' : 'Bloquear cartao'}
          subtitle={
            selectedCardBlocked
              ? 'O cartao selecionado esta transparente e inativo.'
              : 'Bloqueie o cartao selecionado em tempo real.'
          }
          onPress={toggleBlockCard}
        />

        <MenuRow
          icon="receipt-outline"
          title="Gerar fatura"
          subtitle="Abre a fatura em uma tela propria com itens e pagamento."
          onPress={() => setActiveScreen('invoice')}
        />

        <MenuRow
          icon="add-circle-outline"
          title="Adicionar cartao virtual"
          subtitle="Cria outro cartao ate o limite de 3 por usuario."
          onPress={addVirtualCard}
        />

        <MenuRow
          icon="trash-outline"
          title="Remover cartao selecionado"
          subtitle="Remove cartoes virtuais da carteira."
          onPress={removeSelectedCard}
        />
      </View>
    </>
  );
}
