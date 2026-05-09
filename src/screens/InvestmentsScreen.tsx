import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { MetricCard } from '../components/MetricCard';
import { ScreenTitle } from '../components/ScreenTitle';
import { SectionHeader } from '../components/SectionHeader';
import type { IconName } from '../types';
import { formatCurrency, parseCurrency } from '../utils/currency';

type InvestmentAsset = {
  color: string;
  featured?: boolean;
  icon: IconName;
  id: string;
  rate: string;
  subtitle: string;
  ticker?: string;
  title: string;
};

type InvestmentOption = InvestmentAsset & {
  suggestedAmount: number;
};

type PortfolioItem = InvestmentAsset & {
  amount: number;
};

const ringSegmentCount = 72;

const fixedInvestments: InvestmentOption[] = [
  {
    color: '#22C55E',
    icon: 'trending-up-outline',
    id: 'cdi',
    rate: '115% do CDI',
    subtitle: 'Liquidez diaria e baixo risco.',
    suggestedAmount: 600,
    title: 'CDI',
  },
  {
    color: '#38BDF8',
    icon: 'business-outline',
    id: 'cdb',
    rate: '120% do CDI',
    subtitle: 'Renda fixa com prazo flexivel.',
    suggestedAmount: 800,
    title: 'CDB',
  },
  {
    color: '#F8D777',
    icon: 'shield-checkmark-outline',
    id: 'tesouro-selic',
    rate: 'Selic + custodia zero',
    subtitle: 'Tesouro direto para reserva.',
    suggestedAmount: 1000,
    title: 'Tesouro Selic',
  },
  {
    color: '#A855F7',
    icon: 'leaf-outline',
    id: 'poupanca',
    rate: 'Rendimento mensal',
    subtitle: 'Aplicacao simples e tradicional.',
    suggestedAmount: 350,
    title: 'Poupança',
  },
];

const stockAssets: InvestmentAsset[] = [
  {
    color: '#FF7B54',
    featured: true,
    icon: 'rocket-outline',
    id: 'rocket-bank',
    rate: '+18,4% no mes',
    subtitle: 'Banco digital em destaque.',
    ticker: 'ROCK3',
    title: 'ROCKET BANK',
  },
  {
    color: '#14B8A6',
    icon: 'bar-chart-outline',
    id: 'petrobras',
    rate: '+4,2% no mes',
    subtitle: 'Energia e dividendos.',
    ticker: 'PETR4',
    title: 'Petrobras',
  },
  {
    color: '#F97316',
    icon: 'stats-chart-outline',
    id: 'vale',
    rate: '+2,8% no mes',
    subtitle: 'Mineracao global.',
    ticker: 'VALE3',
    title: 'Vale',
  },
  {
    color: '#60A5FA',
    icon: 'wallet-outline',
    id: 'itau',
    rate: '+3,1% no mes',
    subtitle: 'Banco consolidado.',
    ticker: 'ITUB4',
    title: 'Itau',
  },
  {
    color: '#EC4899',
    icon: 'pie-chart-outline',
    id: 'b3',
    rate: '+5,6% no mes',
    subtitle: 'Bolsa brasileira.',
    ticker: 'B3SA3',
    title: 'B3',
  },
];

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 28,
    marginBottom: 22,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: 22,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  productCard: {
    width: '48%',
    minHeight: 176,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 16,
    marginBottom: 12,
  },
  productIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  productTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  productRate: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 6,
  },
  productText: {
    color: colors.mutedDark,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },
  applyPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 12,
  },
  applyText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
  chartCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 18,
    marginBottom: 22,
  },
  chartRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  chartSegmentArm: {
    position: 'absolute',
    left: 11,
    top: 11,
    width: 198,
    height: 198,
    alignItems: 'center',
  },
  chartSegment: {
    width: 8,
    height: 22,
    borderRadius: 99,
  },
  chartCenter: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: 'rgba(5,1,15,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  chartCenterLabel: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  chartCenterValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
    textAlign: 'center',
  },
  emptyChartText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendInfo: {
    flex: 1,
  },
  legendTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  legendValue: {
    color: colors.mutedDark,
    fontSize: 12,
    marginTop: 3,
  },
  legendPercent: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 10,
  },
  stockAmountCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.7,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  amountInput: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.11)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    paddingHorizontal: 16,
  },
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  stockCard: {
    width: '48%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 16,
    marginBottom: 12,
  },
  featuredStockCard: {
    borderColor: 'rgba(255,123,84,0.72)',
    backgroundColor: 'rgba(255,123,84,0.12)',
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stockIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredBadge: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,123,84,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,123,84,0.42)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  featuredBadgeText: {
    color: '#FFD7C8',
    fontSize: 10,
    fontWeight: '900',
  },
  tickerText: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 4,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(34,197,94,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.24)',
    padding: 14,
    marginBottom: 18,
  },
  statusText: {
    flex: 1,
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
    marginLeft: 10,
  },
  resetButton: {
    height: 50,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  resetButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
});

function formatPercent(value: number) {
  return `${value.toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
    minimumFractionDigits: value >= 10 ? 0 : 1,
  })}%`;
}

export function InvestmentsScreen() {
  const [portfolio, setPortfolio] = useState<Record<string, PortfolioItem>>({});
  const [stockAmountValue, setStockAmountValue] = useState('500');
  const [lastApplied, setLastApplied] = useState<string | null>(null);

  const portfolioEntries = Object.values(portfolio);
  const totalInvested = portfolioEntries.reduce(
    (total, item) => total + item.amount,
    0
  );

  function applyInvestment(asset: InvestmentAsset, amount: number) {
    if (amount <= 0) {
      Alert.alert('Valor invalido', 'Informe um valor maior que zero.');
      return;
    }

    setPortfolio((current) => {
      const previousAmount = current[asset.id]?.amount ?? 0;

      return {
        ...current,
        [asset.id]: {
          ...asset,
          amount: previousAmount + amount,
        },
      };
    });
    setLastApplied(`${asset.title} recebeu ${formatCurrency(amount)}.`);
  }

  function getSegmentColor(index: number) {
    if (totalInvested <= 0) {
      return 'rgba(255,255,255,0.12)';
    }

    const segmentValue = ((index + 0.5) / ringSegmentCount) * totalInvested;
    let accumulatedValue = 0;
    const segmentEntry = portfolioEntries.find((entry) => {
      accumulatedValue += entry.amount;
      return segmentValue <= accumulatedValue;
    });

    return segmentEntry?.color ?? portfolioEntries[0]?.color ?? colors.border;
  }

  function applyStockInvestment(asset: InvestmentAsset) {
    applyInvestment(asset, parseCurrency(stockAmountValue));
  }

  function resetPortfolio() {
    setPortfolio({});
    setLastApplied(null);
  }

  return (
    <>
      <ScreenTitle
        title="Investimentos"
        subtitle="Escolha produtos, aplique valores simulados e veja sua carteira por porcentagem."
      />

      <View style={styles.heroCard}>
        <LinearGradient
          colors={['rgba(34,197,94,0.88)', 'rgba(56,189,248,0.58)', 'rgba(111,44,255,0.72)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroEyebrow}>Carteira Rocket</Text>
              <Text style={styles.heroTitle}>{formatCurrency(totalInvested)}</Text>
            </View>

            <View style={styles.heroIcon}>
              <Ionicons name="pie-chart-outline" size={30} color={colors.white} />
            </View>
          </View>

          <Text style={styles.heroSubtitle}>
            O grafico redondo atualiza quando voce escolhe CDI, CDB,
            Tesouro Selic, poupanca ou acoes.
          </Text>
        </LinearGradient>
      </View>

      {lastApplied && (
        <View style={styles.statusCard}>
          <Ionicons name="checkmark-circle" size={24} color={colors.green} />
          <Text style={styles.statusText}>{lastApplied}</Text>
        </View>
      )}

      <View style={commonStyles.twoColumns}>
        <MetricCard label="Ativos escolhidos" value={String(portfolioEntries.length)} />
        <MetricCard
          label="Maior posicao"
          value={
            portfolioEntries.length
              ? portfolioEntries.reduce((leader, entry) =>
                  entry.amount > leader.amount ? entry : leader
                ).title
              : 'Nenhuma'
          }
        />
      </View>

      <SectionHeader title="Distribuicao" />

      <View style={styles.chartCard}>
        <View style={styles.chartRing}>
          {Array.from({ length: ringSegmentCount }, (_, index) => (
            <View
              key={index}
              style={[
                styles.chartSegmentArm,
                { transform: [{ rotate: `${index * (360 / ringSegmentCount)}deg` }] },
              ]}
            >
              <View
                style={[
                  styles.chartSegment,
                  { backgroundColor: getSegmentColor(index) },
                ]}
              />
            </View>
          ))}

          <View style={styles.chartCenter}>
            <Text style={styles.chartCenterLabel}>
              {totalInvested > 0 ? 'Total investido' : 'Carteira vazia'}
            </Text>
            {totalInvested > 0 ? (
              <Text style={styles.chartCenterValue}>
                {formatCurrency(totalInvested)}
              </Text>
            ) : (
              <Text style={styles.emptyChartText}>
                Escolha um investimento para gerar o grafico.
              </Text>
            )}
          </View>
        </View>

        {portfolioEntries.map((entry) => {
          const percent = (entry.amount / totalInvested) * 100;

          return (
            <View key={entry.id} style={styles.legendRow}>
              <View
                style={[styles.legendDot, { backgroundColor: entry.color }]}
              />
              <View style={styles.legendInfo}>
                <Text style={styles.legendTitle}>{entry.title}</Text>
                <Text style={styles.legendValue}>
                  {entry.ticker ? `${entry.ticker} - ` : ''}
                  {formatCurrency(entry.amount)}
                </Text>
              </View>
              <Text style={styles.legendPercent}>{formatPercent(percent)}</Text>
            </View>
          );
        })}
      </View>

      <SectionHeader title="Renda fixa" />

      <View style={styles.productGrid}>
        {fixedInvestments.map((investment) => (
          <Pressable
            accessibilityRole="button"
            key={investment.id}
            onPress={() => applyInvestment(investment, investment.suggestedAmount)}
            style={styles.productCard}
          >
            <View
              style={[
                styles.productIcon,
                { backgroundColor: `${investment.color}22` },
              ]}
            >
              <Ionicons name={investment.icon} size={24} color={investment.color} />
            </View>

            <Text style={styles.productTitle}>{investment.title}</Text>
            <Text style={styles.productRate}>{investment.rate}</Text>
            <Text style={styles.productText}>{investment.subtitle}</Text>

            <View style={styles.applyPill}>
              <Text style={styles.applyText}>
                Aplicar {formatCurrency(investment.suggestedAmount)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Acoes disponiveis" />

      <View style={styles.stockAmountCard}>
        <Text style={styles.inputLabel}>Valor para investir em acoes</Text>
        <TextInput
          keyboardType="decimal-pad"
          onChangeText={setStockAmountValue}
          placeholder="R$ 0,00"
          placeholderTextColor={colors.mutedDark}
          style={styles.amountInput}
          value={stockAmountValue}
        />
      </View>

      <View style={styles.stockGrid}>
        {stockAssets.map((stock) => (
          <Pressable
            accessibilityRole="button"
            key={stock.id}
            onPress={() => applyStockInvestment(stock)}
            style={[
              styles.stockCard,
              stock.featured && styles.featuredStockCard,
            ]}
          >
            <View style={styles.stockHeader}>
              <View
                style={[
                  styles.stockIcon,
                  { backgroundColor: `${stock.color}24` },
                ]}
              >
                <Ionicons name={stock.icon} size={23} color={stock.color} />
              </View>

              {stock.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>Destaque</Text>
                </View>
              )}
            </View>

            <Text style={styles.productTitle}>{stock.title}</Text>
            <Text style={styles.tickerText}>{stock.ticker}</Text>
            <Text style={styles.productRate}>{stock.rate}</Text>
            <Text style={styles.productText}>{stock.subtitle}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={totalInvested <= 0}
        onPress={resetPortfolio}
        style={[
          styles.resetButton,
          totalInvested <= 0 && { opacity: 0.45 },
        ]}
      >
        <Text style={styles.resetButtonText}>Limpar carteira</Text>
      </Pressable>
    </>
  );
}
