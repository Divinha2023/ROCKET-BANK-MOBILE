import { useState } from 'react';
import { View } from 'react-native';
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

  function toggleCardVisibility(variant: 'gold' | 'black') {
    setHiddenCards((current) => ({
      ...current,
      [variant]: !current[variant],
    }));
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
          icon="lock-closed-outline"
          title="Bloquear cartão"
          subtitle="Controle seu cartão em tempo real."
        />

        <MenuRow
          icon="eye-outline"
          title="Ocultar ou revelar números"
          subtitle="Use o ícone de olho na lateral do cartão."
        />

        <MenuRow
          icon="phone-portrait-outline"
          title="Cartão virtual"
          subtitle="Gere cartões virtuais para compras online."
        />

        <MenuRow
          icon="receipt-outline"
          title="Fatura e limite"
          subtitle="Acompanhe gastos, vencimento e limite disponível."
        />

        <MenuRow
          icon="color-palette-outline"
          title="Personalizar cartão"
          subtitle="Escolha uma versão premium."
        />
      </View>
    </>
  );
}
