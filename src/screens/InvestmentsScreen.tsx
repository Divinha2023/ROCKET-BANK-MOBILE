import {
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import {
  Alert,
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
import { ScreenTitle } from '../components/ScreenTitle';
import { InvestIcon } from '../components/InvestIcon';
import { colors } from '../theme';
import type { IconName } from '../types';
import { formatCurrency, formatCurrencyInput, parseCurrency } from '../utils/currency';

type InvestmentKind = 'fixed' | 'variable';
type ChartGroup = 'fixed' | 'rocket' | 'stocks';

export type InvestmentAsset = {
  annualRate: number;
  chartGroup: ChartGroup;
  color: string;
  code?: string;
  description: string;
  id: string;
  icon: IconName;
  kind: InvestmentKind;
  minAmount?: number;
  name: string;
  price?: number;
  profitability: string;
  risk: string;
};

export type PortfolioEntry = {
  amount: number;
  asset: InvestmentAsset;
};

export type InvestmentPortfolio = Record<string, PortfolioEntry>;

type InvestmentsScreenProps = {
  accountBalance: number;
  onFinishInvestment: (amount: number, asset: InvestmentAsset) => boolean;
  portfolio: InvestmentPortfolio;
  setPortfolio: Dispatch<SetStateAction<InvestmentPortfolio>>;
};

const donutSegmentCount = 84;

const primaryStock: InvestmentAsset = {
  annualRate: 18.7,
  chartGroup: 'rocket',
  color: '#E879F9',
  code: 'RCKT3',
  description: 'Ação principal do ecossistema Rocket, com crescimento digital e risco moderado.',
  icon: 'rocket-outline',
  id: 'rocket-bank',
  kind: 'variable',
  name: 'ROCKET BANK',
  price: 42.9,
  profitability: '+18,7% ao ano',
  risk: 'Moderado',
};

const extraStocks: InvestmentAsset[] = [
  {
    annualRate: 12.4,
    chartGroup: 'stocks',
    color: '#38BDF8',
    code: 'TECH4',
    description: 'Empresa de tecnologia com foco em nuvem, dados e automação.',
    icon: 'hardware-chip-outline',
    id: 'tech-future',
    kind: 'variable',
    name: 'Tech Future',
    price: 31.2,
    profitability: '+12,4% ao ano',
    risk: 'Moderado',
  },
  {
    annualRate: 9.8,
    chartGroup: 'stocks',
    color: '#FACC15',
    code: 'SOLR3',
    description: 'Companhia de energia solar com receita previsível e expansão gradual.',
    icon: 'sunny-outline',
    id: 'solar-energy',
    kind: 'variable',
    name: 'Solar Energy',
    price: 24.5,
    profitability: '+9,8% ao ano',
    risk: 'Moderado',
  },
  {
    annualRate: 11.6,
    chartGroup: 'stocks',
    color: '#818CF8',
    code: 'DATA7',
    description: 'Infraestrutura de dados para empresas digitais em crescimento.',
    icon: 'server-outline',
    id: 'data-cloud',
    kind: 'variable',
    name: 'Data Cloud',
    price: 27.8,
    profitability: '+11,6% ao ano',
    risk: 'Moderado',
  },
  {
    annualRate: 8.9,
    chartGroup: 'stocks',
    color: '#FB7185',
    code: 'HLTH5',
    description: 'Rede de saúde e tecnologia com perfil defensivo dentro da bolsa.',
    icon: 'medkit-outline',
    id: 'health-prime',
    kind: 'variable',
    name: 'Health Prime',
    price: 19.7,
    profitability: '+8,9% ao ano',
    risk: 'Moderado',
  },
];

const fixedIncomeAssets: InvestmentAsset[] = [
  {
    annualRate: 13.5,
    chartGroup: 'fixed',
    color: '#2DD4BF',
    description: 'Produto de renda fixa com liquidez planejada e remuneração atrelada ao CDI.',
    icon: 'shield-checkmark-outline',
    id: 'cdb-rocket-plus',
    kind: 'fixed',
    minAmount: 100,
    name: 'CDB Rocket Plus',
    profitability: '115% do CDI',
    risk: 'Risco baixo',
  },
  {
    annualRate: 12.2,
    chartGroup: 'fixed',
    color: '#F97316',
    description: 'Título público indexado à inflação para objetivos de médio prazo.',
    icon: 'lock-closed-outline',
    id: 'tesouro-digital-2029',
    kind: 'fixed',
    minAmount: 50,
    name: 'Tesouro Digital 2029',
    profitability: 'IPCA + 6,2%',
    risk: 'Risco baixo',
  },
  {
    annualRate: 12.8,
    chartGroup: 'fixed',
    color: '#A3E635',
    description: 'Produto isento com foco em estabilidade e previsibilidade.',
    icon: 'business-outline',
    id: 'lci-green-2030',
    kind: 'fixed',
    minAmount: 150,
    name: 'LCI Green 2030',
    profitability: '98% do CDI',
    risk: 'Risco baixo',
  },
  {
    annualRate: 14.1,
    chartGroup: 'fixed',
    color: '#EF4444',
    description: 'Debênture de infraestrutura com retorno estimado maior e prazo alongado.',
    icon: 'bar-chart-outline',
    id: 'debenture-infra',
    kind: 'fixed',
    minAmount: 250,
    name: 'Debenture Infra Rocket',
    profitability: 'IPCA + 7,1%',
    risk: 'Risco baixo',
  },
];

const styles = StyleSheet.create({
  summaryCard: {
    borderRadius: 30,
    marginBottom: 22,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
  summaryGradient: {
    padding: 24,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  summaryTotal: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '900',
    textAlign: 'center',
  },
  summaryTotalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  summaryTotalIcon: {
    marginLeft: 10,
  },
  summaryMetrics: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  summaryMetric: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 12,
  },
  summaryMetricGap: {
    marginLeft: 10,
  },
  summaryMetricLabel: {
    color: 'rgba(255,255,255,0.63)',
    fontSize: 11,
    fontWeight: '800',
  },
  summaryMetricValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 6,
  },
  summaryButton: {
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  summaryButtonText: {
    color: '#120721',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 8,
  },
  section: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 21,
    fontWeight: '900',
  },
  sectionHint: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '800',
  },
  featuredCard: {
    borderRadius: 28,
    marginBottom: 12,
    overflow: 'hidden',
  },
  featuredGradient: {
    borderWidth: 1,
    borderColor: 'rgba(217,70,239,0.36)',
    padding: 18,
  },
  featuredTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featuredIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.13)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#FCE7F3',
    fontSize: 11,
    fontWeight: '900',
  },
  featuredCode: {
    color: '#F0ABFC',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  featuredName: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  metaPill: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  metaText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  primaryAction: {
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  primaryActionText: {
    color: '#120721',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 8,
  },
  assetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  assetCard: {
    width: '48%',
    minHeight: 172,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 15,
    marginBottom: 12,
  },
  assetCardFull: {
    width: '100%',
    minHeight: 150,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  assetCode: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  assetName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 4,
  },
  assetDetail: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
  },
  assetSecondary: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    marginTop: 6,
  },
  showMoreButton: {
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  showMoreText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  emptyPortfolio: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.045)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyPortfolioText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 12,
    flex: 1,
  },
  chartRing: {
    width: 178,
    height: 178,
    borderRadius: 89,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  chartSegmentArm: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 162,
    height: 162,
    alignItems: 'center',
  },
  chartSegment: {
    width: 6,
    height: 18,
    borderRadius: 99,
  },
  chartCenter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(5,1,15,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.11)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  chartCenterLabel: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
  chartCenterValue: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 18,
    marginTop: 6,
    textAlign: 'center',
  },
  legendGrid: {
    marginTop: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 10,
  },
  legendDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 9,
    marginTop: 3,
  },
  legendInfo: {
    flex: 1,
  },
  legendLabel: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  legendDescription: {
    color: colors.mutedDark,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  legendValueBox: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  legendValue: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  legendAmount: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 3,
  },
  listTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 10,
  },
  investmentRow: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 14,
    marginBottom: 10,
  },
  investmentRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  investmentName: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
    flex: 1,
  },
  investmentType: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 10,
  },
  investmentDescription: {
    color: colors.mutedDark,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 8,
  },
  rowMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowMetric: {
    width: '50%',
    marginTop: 6,
  },
  rowMetricLabel: {
    color: colors.mutedDark,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  rowMetricValue: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(2,0,8,0.74)',
    padding: 24,
  },
  modalCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#0B0716',
    overflow: 'hidden',
  },
  portfolioModalCard: {
    maxHeight: '88%',
  },
  modalAccent: {
    height: 5,
    width: '100%',
  },
  modalBody: {
    padding: 20,
  },
  portfolioModalBody: {
    padding: 20,
    paddingBottom: 10,
  },
  portfolioModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  portfolioModalTitleBlock: {
    flex: 1,
  },
  portfolioCloseButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  portfolioStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  portfolioMonthlyMetric: {
    marginBottom: 12,
  },
  portfolioPositionMetricValue: {
    fontSize: 13,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    flex: 1,
  },
  modalSubtitle: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 20,
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
  modalButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalCancelButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginRight: 10,
  },
  modalApplyButton: {
    backgroundColor: colors.purpleStrong,
  },
  modalApplyButtonDisabled: {
    opacity: 0.45,
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
});

function formatPercent(value: number) {
  return `${value.toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;
}

function getAssetColor(asset: InvestmentAsset) {
  return asset.color;
}

function getKindLabel(kind: InvestmentKind) {
  return kind === 'variable' ? 'Renda Variável' : 'Renda Fixa';
}

function getApproxQuantity(entry: PortfolioEntry) {
  if (entry.asset.price) {
    return `${(entry.amount / entry.asset.price).toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} ações`;
  }

  const baseAmount = entry.asset.minAmount ?? entry.amount;
  return `${(entry.amount / baseAmount).toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} aportes`;
}

export function InvestmentsScreen({
  accountBalance,
  onFinishInvestment,
  portfolio,
  setPortfolio,
}: InvestmentsScreenProps) {
  const [selectedAsset, setSelectedAsset] = useState<InvestmentAsset | null>(null);
  const [investmentValue, setInvestmentValue] = useState('');
  const [showAllStocks, setShowAllStocks] = useState(false);
  const [showAllFixed, setShowAllFixed] = useState(false);
  const [isPortfolioModalVisible, setPortfolioModalVisible] = useState(false);

  const portfolioEntries = useMemo(() => Object.values(portfolio), [portfolio]);
  const totalInvested = portfolioEntries.reduce(
    (total, entry) => total + entry.amount,
    0
  );
  const annualYield = portfolioEntries.reduce(
    (total, entry) => total + entry.amount * (entry.asset.annualRate / 100),
    0
  );
  const monthlyRate = totalInvested > 0 ? (annualYield / totalInvested / 12) * 100 : 0;
  const largestPosition = portfolioEntries.reduce<PortfolioEntry | null>(
    (largest, entry) => {
      if (!largest || entry.amount > largest.amount) {
        return entry;
      }

      return largest;
    },
    null
  );
  const visibleStocks = showAllStocks ? extraStocks : extraStocks.slice(0, 2);
  const visibleFixed = showAllFixed
    ? fixedIncomeAssets
    : fixedIncomeAssets.slice(0, 2);
  const modalAmount = parseCurrency(investmentValue);
  const canFinishInvestment = modalAmount > 0 && modalAmount <= accountBalance;

  const portfolioBreakdown = portfolioEntries.map((entry) => ({
    ...entry,
    color: getAssetColor(entry.asset),
    expectedYield: entry.amount * (entry.asset.annualRate / 100),
    percent: totalInvested > 0 ? (entry.amount / totalInvested) * 100 : 0,
  }));

  function openInvestment(asset: InvestmentAsset) {
    setSelectedAsset(asset);
    setInvestmentValue('');
  }

  function closeInvestment() {
    setSelectedAsset(null);
    setInvestmentValue('');
  }

  function finishInvestment() {
    if (!selectedAsset || modalAmount <= 0) {
      Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
      return;
    }

    if (modalAmount > accountBalance) {
      Alert.alert(
        'Saldo insuficiente',
        `O investimento máximo disponível é ${formatCurrency(accountBalance)}.`
      );
      return;
    }

    if (!onFinishInvestment(modalAmount, selectedAsset)) {
      Alert.alert('Saldo insuficiente', 'Não foi possível concluir o investimento.');
      return;
    }

    setPortfolio((current) => {
      const previous = current[selectedAsset.id]?.amount ?? 0;

      return {
        ...current,
        [selectedAsset.id]: {
          amount: previous + modalAmount,
          asset: selectedAsset,
        },
      };
    });
    closeInvestment();
  }

  function getSegmentColor(index: number) {
    if (totalInvested <= 0) {
      return 'rgba(255,255,255,0.14)';
    }

    const segmentValue = ((index + 0.5) / donutSegmentCount) * totalInvested;
    let accumulatedValue = 0;
    const item = portfolioBreakdown.find((entry) => {
      accumulatedValue += entry.amount;
      return segmentValue <= accumulatedValue;
    });

    return item?.color ?? 'rgba(255,255,255,0.14)';
  }

  return (
    <>
      <ScreenTitle
        title="Investimentos"
        subtitle="Faça seu dinheiro decolar com segurança"
      />

      <View style={styles.summaryCard}>
        <LinearGradient
          colors={['rgba(217,70,239,0.88)', 'rgba(56,189,248,0.56)', 'rgba(45,212,191,0.62)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryGradient}
        >
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Patrimônio investido</Text>
              <Text style={styles.summaryTotal}>{formatCurrency(totalInvested)}</Text>
            </View>
          </View>

          <View style={styles.summaryMetrics}>
            <View style={styles.summaryMetric}>
              <Text style={styles.summaryMetricLabel}>Rendimento aprox.</Text>
              <Text style={styles.summaryMetricValue}>{formatCurrency(annualYield)}</Text>
            </View>
            <View style={[styles.summaryMetric, styles.summaryMetricGap]}>
              <Text style={styles.summaryMetricLabel}>Rentabilidade</Text>
              <Text style={styles.summaryMetricValue}>+{formatPercent(monthlyRate)}</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => setPortfolioModalVisible(true)}
            style={styles.summaryButton}
          >
            <Ionicons name="pie-chart-outline" size={18} color="#120721" />
            <Text style={styles.summaryButtonText}>Ver carteira</Text>
          </Pressable>
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Renda Variável</Text>
          <Text style={styles.sectionHint}>Ações</Text>
        </View>

        <View style={styles.featuredCard}>
          <LinearGradient
            colors={['rgba(217,70,239,0.36)', 'rgba(111,44,255,0.20)', 'rgba(255,255,255,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredTop}>
              <View style={styles.featuredIcon}>
                <Ionicons name={primaryStock.icon} size={28} color="#F0ABFC" />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Destaque</Text>
              </View>
            </View>

            <Text style={styles.featuredCode}>{primaryStock.code}</Text>
            <Text style={styles.featuredName}>{primaryStock.name}</Text>

            <View style={styles.featuredMeta}>
              <View style={styles.metaPill}>
                <Text style={styles.metaText}>
                  Preço: {formatCurrency(primaryStock.price ?? 0)}
                </Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaText}>
                  Rendimento: {primaryStock.profitability}
                </Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaText}>Risco: {primaryStock.risk}</Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => openInvestment(primaryStock)}
              style={styles.primaryAction}
            >
              <Ionicons name="trending-up-outline" size={18} color="#120721" />
              <Text style={styles.primaryActionText}>Investir agora</Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View style={styles.assetGrid}>
          {visibleStocks.map((asset) => (
            <Pressable
              accessibilityRole="button"
              key={asset.id}
              onPress={() => openInvestment(asset)}
              style={styles.assetCard}
            >
              <View
                style={[
                  styles.assetIcon,
                  { backgroundColor: `${getAssetColor(asset)}24` },
                ]}
              >
                <Ionicons name={asset.icon} size={22} color={getAssetColor(asset)} />
              </View>
              <Text style={styles.assetCode}>{asset.code}</Text>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={styles.assetDetail}>{asset.profitability}</Text>
              <Text style={styles.assetSecondary}>
                {formatCurrency(asset.price ?? 0)}
              </Text>
            </Pressable>
          ))}
        </View>

        {extraStocks.length > 2 && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowAllStocks((current) => !current)}
            style={styles.showMoreButton}
          >
            <Text style={styles.showMoreText}>
              {showAllStocks ? 'Mostrar menos' : 'Exibir mais'}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Renda Fixa</Text>
          <Text style={styles.sectionHint}>Baixo risco</Text>
        </View>

        <View style={styles.assetGrid}>
          {visibleFixed.map((asset) => (
            <Pressable
              accessibilityRole="button"
              key={asset.id}
              onPress={() => openInvestment(asset)}
              style={[styles.assetCard, styles.assetCardFull]}
            >
              <View
                style={[
                  styles.assetIcon,
                  { backgroundColor: `${getAssetColor(asset)}24` },
                ]}
              >
                <Ionicons name={asset.icon} size={22} color={getAssetColor(asset)} />
              </View>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={styles.assetDetail}>{asset.profitability}</Text>
              <Text style={styles.assetSecondary}>
                {asset.risk} - Aplicação mínima {formatCurrency(asset.minAmount ?? 0)}
              </Text>
            </Pressable>
          ))}
        </View>

        {fixedIncomeAssets.length > 2 && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowAllFixed((current) => !current)}
            style={styles.showMoreButton}
          >
            <Text style={styles.showMoreText}>
              {showAllFixed ? 'Mostrar menos' : 'Exibir mais'}
            </Text>
          </Pressable>
        )}
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setPortfolioModalVisible(false)}
        transparent
        visible={isPortfolioModalVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, styles.portfolioModalCard]}>
            <LinearGradient
              colors={['#D946EF', '#38BDF8', '#2DD4BF']}
              style={styles.modalAccent}
            />
            <ScrollView
              contentContainerStyle={styles.portfolioModalBody}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.portfolioModalHeader}>
                <View style={styles.portfolioModalTitleBlock}>
                  <Text style={styles.modalTitle}>Carteira</Text>
                  <Text style={styles.modalSubtitle}>
                    Resumo detalhado dos seus investimentos
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setPortfolioModalVisible(false)}
                  style={styles.portfolioCloseButton}
                >
                  <Ionicons name="close-outline" size={24} color={colors.white} />
                </Pressable>
              </View>

              <View style={styles.portfolioStats}>
                <View style={styles.summaryMetric}>
                  <Text style={styles.summaryMetricLabel}>Patrimônio</Text>
                  <Text style={styles.summaryMetricValue}>
                    {formatCurrency(totalInvested)}
                  </Text>
                </View>
                <View style={[styles.summaryMetric, styles.summaryMetricGap]}>
                  <Text style={styles.summaryMetricLabel}>Rendimento</Text>
                  <Text style={styles.summaryMetricValue}>
                    {formatCurrency(annualYield)}
                  </Text>
                </View>
              </View>

              <View style={styles.portfolioStats}>
                <View style={[styles.summaryMetric, styles.portfolioMonthlyMetric]}>
                  <Text style={styles.summaryMetricLabel}>Rentabilidade</Text>
                  <Text style={styles.summaryMetricValue}>
                    +{formatPercent(monthlyRate)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.summaryMetric,
                    styles.summaryMetricGap,
                    styles.portfolioMonthlyMetric,
                  ]}
                >
                  <Text style={styles.summaryMetricLabel}>Maior posição</Text>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={[
                      styles.summaryMetricValue,
                      styles.portfolioPositionMetricValue,
                      largestPosition && {
                        color: getAssetColor(largestPosition.asset),
                      },
                    ]}
                  >
                    {largestPosition?.asset.name ?? '-'}
                  </Text>
                </View>
              </View>

              {totalInvested > 0 ? (
                <>
                  <View style={styles.chartRing}>
                    {Array.from({ length: donutSegmentCount }, (_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.chartSegmentArm,
                          {
                            transform: [
                              { rotate: `${index * (360 / donutSegmentCount)}deg` },
                            ],
                          },
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
                      <Text style={styles.chartCenterLabel}>Total investido</Text>
                      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.chartCenterValue}>
                        {formatCurrency(totalInvested)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.legendGrid}>
                    {portfolioBreakdown.map((entry) => (
                      <View key={entry.asset.id} style={styles.legendRow}>
                        <View
                          style={[
                            styles.legendDot,
                            { backgroundColor: entry.color },
                          ]}
                        />
                        <View style={styles.legendInfo}>
                          <Text style={styles.legendLabel}>
                            {entry.asset.code
                              ? `${entry.asset.code} - ${entry.asset.name}`
                              : entry.asset.name}
                          </Text>
                          <Text style={styles.legendDescription}>
                            {entry.asset.description}
                          </Text>
                        </View>
                        <View style={styles.legendValueBox}>
                          <Text style={styles.legendValue}>
                            {formatPercent(entry.percent)}
                          </Text>
                          <Text style={styles.legendAmount}>
                            {formatCurrency(entry.amount)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.listTitle}>Meus investimentos</Text>
                  {portfolioBreakdown.map((entry) => (
                      <View
                        key={entry.asset.id}
                        style={[
                          styles.investmentRow,
                          { borderColor: `${entry.color}55` },
                        ]}
                      >
                        <View style={styles.investmentRowTop}>
                          <Text style={styles.investmentName}>
                            {entry.asset.name}
                          </Text>
                          <Text style={styles.investmentType}>
                            {getKindLabel(entry.asset.kind)}
                          </Text>
                        </View>

                        <Text style={styles.investmentDescription}>
                          {entry.asset.description}
                        </Text>

                        <View style={styles.rowMetrics}>
                          <View style={styles.rowMetric}>
                            <Text style={styles.rowMetricLabel}>Quantidade</Text>
                            <Text style={styles.rowMetricValue}>
                              {getApproxQuantity(entry)}
                            </Text>
                          </View>
                          <View style={styles.rowMetric}>
                            <Text style={styles.rowMetricLabel}>
                              Valor investido
                            </Text>
                            <Text style={styles.rowMetricValue}>
                              {formatCurrency(entry.amount)}
                            </Text>
                          </View>
                          <View style={styles.rowMetric}>
                            <Text style={styles.rowMetricLabel}>Tipo</Text>
                            <Text style={styles.rowMetricValue}>
                              {getKindLabel(entry.asset.kind)}
                            </Text>
                          </View>
                          <View style={styles.rowMetric}>
                            <Text style={styles.rowMetricLabel}>Rendimento</Text>
                            <Text style={styles.rowMetricValue}>
                              {formatCurrency(entry.expectedYield)}
                            </Text>
                          </View>
                        </View>
                      </View>
                  ))}
                </>
              ) : (
                <View style={styles.emptyPortfolio}>
                  <Ionicons
                    name="pie-chart-outline"
                    size={24}
                    color={colors.purpleSoft}
                  />
                  <Text style={styles.emptyPortfolioText}>
                    Sua carteira aparecerá aqui depois do primeiro investimento.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        onRequestClose={closeInvestment}
        transparent
        visible={Boolean(selectedAsset)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <LinearGradient
              colors={[selectedAsset ? getAssetColor(selectedAsset) : colors.purpleStrong, colors.purpleSoft]}
              style={styles.modalAccent}
            />
            <View style={styles.modalBody}>
              <View style={styles.modalHeader}>
                <View
                  style={[
                    styles.modalIcon,
                    {
                      backgroundColor: selectedAsset
                        ? `${getAssetColor(selectedAsset)}24`
                        : 'rgba(168,85,247,0.18)',
                    },
                  ]}
                >
                  <Ionicons
                    name={selectedAsset?.icon ?? 'trending-up-outline'}
                    size={24}
                    color={selectedAsset ? getAssetColor(selectedAsset) : colors.purpleSoft}
                  />
                </View>
                <Text style={styles.modalTitle}>{selectedAsset?.name}</Text>
              </View>

              <Text style={styles.modalSubtitle}>
                {selectedAsset ? getKindLabel(selectedAsset.kind) : ''} -{' '}
                {selectedAsset?.profitability}
              </Text>

              <Text style={styles.inputLabel}>Valor</Text>
              <TextInput
                autoFocus
                keyboardType="decimal-pad"
                onChangeText={(value) => setInvestmentValue(formatCurrencyInput(value))}
                placeholder="R$ 0,00"
                placeholderTextColor={colors.mutedDark}
                style={styles.amountInput}
                value={investmentValue}
              />
              <Text style={styles.modalSubtitle}>
                Limite máximo: {formatCurrency(accountBalance)}
              </Text>

              <View style={styles.modalButtons}>
                <Pressable
                  accessibilityRole="button"
                  onPress={closeInvestment}
                  style={[styles.modalButton, styles.modalCancelButton]}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={!canFinishInvestment}
                  onPress={finishInvestment}
                  style={[
                    styles.modalButton,
                    styles.modalApplyButton,
                    !canFinishInvestment && styles.modalApplyButtonDisabled,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Finalizar investimento</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
