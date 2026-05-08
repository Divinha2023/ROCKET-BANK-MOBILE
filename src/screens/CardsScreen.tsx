import { useState } from 'react';
import { Alert, View } from 'react-native';
import { commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { RocketCard } from '../components/RocketCard';
import { MetricCard } from '../components/MetricCard';
import { MenuRow } from '../components/MenuRow';

export function CardsScreen() {
  const [hiddenCards, setHiddenCards] = useState({
    gold: true,
    black: true,
  });
  const [blocked, setBlocked] = useState(false);
  const [virtualCardCreated, setVirtualCardCreated] = useState(false);

  function toggleCardVisibility(variant: 'gold' | 'black') {
    setHiddenCards((current) => ({
      ...current,
      [variant]: !current[variant],
    }));
  }

  function toggleBlockCard() {
    setBlocked((current) => {
      const nextBlocked = !current;
      Alert.alert(
        nextBlocked ? 'Cartão bloqueado' : 'Cartão desbloqueado',
        nextBlocked
          ? 'Compras físicas e online foram pausadas.'
          : 'Seu cartão voltou a ficar disponível para uso.'
      );
      return nextBlocked;
    });
  }

  function createVirtualCard() {
    setVirtualCardCreated(true);
    Alert.alert(
      'Cartão virtual pronto',
      'Número final 8842 criado para compras online.'
    );
  }

  return (
    <>
      <ScreenTitle
        title="Meus cartões"
        subtitle="Gerencie seus cartões Rocket Gold e Rocket Black."
      />

      <RocketCard
        variant="gold"
        hidden={hiddenCards.gold}
        onToggleVisibility={() => toggleCardVisibility('gold')}
      />

      <RocketCard
        variant="black"
        hidden={hiddenCards.black}
        onToggleVisibility={() => toggleCardVisibility('black')}
      />

      <View style={commonStyles.twoColumns}>
        <MetricCard label="Limite disponível" value="R$ 5.200" />
        <MetricCard label="Fatura atual" value="R$ 1.340" />
      </View>

      <View style={commonStyles.listCard}>
        <MenuRow
          icon={blocked ? 'lock-open-outline' : 'lock-closed-outline'}
          title={blocked ? 'Desbloquear cartão' : 'Bloquear cartão'}
          subtitle={
            blocked
              ? 'Seu cartão está pausado no momento.'
              : 'Controle seu cartão em tempo real.'
          }
          onPress={toggleBlockCard}
        />

        <MenuRow
          icon="eye-outline"
          title="Ocultar ou revelar números"
          subtitle="Use o ícone de olho na lateral do cartão."
          onPress={() =>
            Alert.alert('Dica rápida', 'Toque no olho em cada cartão para alternar a visibilidade.')
          }
        />

        <MenuRow
          icon="phone-portrait-outline"
          title={virtualCardCreated ? 'Cartão virtual ativo' : 'Cartão virtual'}
          subtitle={
            virtualCardCreated
              ? 'Final 8842 pronto para compras online.'
              : 'Gere cartões virtuais para compras online.'
          }
          onPress={createVirtualCard}
        />

        <MenuRow
          icon="receipt-outline"
          title="Fatura e limite"
          subtitle="Acompanhe gastos, vencimento e limite disponível."
          onPress={() =>
            Alert.alert('Fatura atual', 'R$ 1.340,00 usados de R$ 6.540,00.')
          }
        />

        <MenuRow
          icon="color-palette-outline"
          title="Personalizar cartão"
          subtitle="Escolha uma versão premium."
          onPress={() =>
            Alert.alert('Personalização', 'Tema premium aplicado ao próximo cartão demo.')
          }
        />
      </View>
    </>
  );
}
