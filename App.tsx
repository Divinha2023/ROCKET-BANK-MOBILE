import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type AppScreen =
  | 'home'
  | 'cards'
  | 'pix'
  | 'shopping'
  | 'cashback'
  | 'community'
  | 'support'
  | 'profile'
  | 'statement';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HERO_SPACE = Math.min(Math.max(SCREEN_HEIGHT * 0.45, 360), 430);

const colors = {
  background: '#05010F',
  card: 'rgba(18, 18, 30, 0.58)',
  input: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.12)',
  purple: '#8B5CF6',
  purpleStrong: '#6F2CFF',
  purpleSoft: '#A855F7',
  orange: '#FF7B54',
  white: '#FFFFFF',
  muted: '#C2C2D0',
  mutedDark: '#A6A6B8',
  green: '#22C55E',
  gold: '#F8D777',
};


type ShoppingProduct = {
  id: string;
  category: string;
  name: string;
  store: string;
  price: string;
  oldPrice?: string;
  cashback: string;
  image: string;
};

const shoppingCategories = [
  { label: 'Tecnologia', icon: 'phone-portrait-outline' as IconName },
  { label: 'Moda', icon: 'shirt-outline' as IconName },
  { label: 'Casa', icon: 'home-outline' as IconName },
  { label: 'Viagens', icon: 'airplane-outline' as IconName },
  { label: 'Beleza', icon: 'sparkles-outline' as IconName },
  { label: 'Mercado', icon: 'basket-outline' as IconName },
];

const shoppingProducts: ShoppingProduct[] = [
  {
    id: 'iphone-15',
    category: 'Tecnologia',
    name: 'Smartphone premium 128GB',
    store: 'Rocket Tech',
    price: 'R$ 4.799,00',
    oldPrice: 'R$ 5.299,00',
    cashback: '8%',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'headphone',
    category: 'Tecnologia',
    name: 'Fone Bluetooth Pro com cancelamento',
    store: 'Audio Prime',
    price: 'R$ 899,90',
    oldPrice: 'R$ 1.099,90',
    cashback: '10%',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'smartwatch',
    category: 'Tecnologia',
    name: 'Smartwatch fitness AMOLED',
    store: 'Rocket Wear',
    price: 'R$ 649,90',
    oldPrice: 'R$ 799,90',
    cashback: '7%',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'notebook',
    category: 'Tecnologia',
    name: 'Notebook ultrafino 16GB RAM',
    store: 'Tech Store',
    price: 'R$ 3.999,00',
    oldPrice: 'R$ 4.499,00',
    cashback: '6%',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sneaker',
    category: 'Moda',
    name: 'Tênis urbano premium',
    store: 'Rocket Style',
    price: 'R$ 349,90',
    oldPrice: 'R$ 459,90',
    cashback: '12%',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bag',
    category: 'Moda',
    name: 'Bolsa minimalista couro sintético',
    store: 'Urban Bag',
    price: 'R$ 219,90',
    oldPrice: 'R$ 299,90',
    cashback: '9%',
    image:
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'jacket',
    category: 'Moda',
    name: 'Jaqueta casual corta vento',
    store: 'Street Club',
    price: 'R$ 279,90',
    oldPrice: 'R$ 349,90',
    cashback: '7%',
    image:
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coffee',
    category: 'Casa',
    name: 'Cafeteira espresso compacta',
    store: 'Casa Rocket',
    price: 'R$ 599,90',
    oldPrice: 'R$ 749,90',
    cashback: '8%',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'chair',
    category: 'Casa',
    name: 'Cadeira ergonômica office',
    store: 'Home Prime',
    price: 'R$ 899,90',
    oldPrice: 'R$ 1.149,90',
    cashback: '6%',
    image:
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lamp',
    category: 'Casa',
    name: 'Luminária inteligente LED',
    store: 'Smart Home',
    price: 'R$ 189,90',
    oldPrice: 'R$ 239,90',
    cashback: '5%',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hotel',
    category: 'Viagens',
    name: 'Diária em hotel premium',
    store: 'Rocket Travel',
    price: 'R$ 399,00',
    oldPrice: 'R$ 529,00',
    cashback: '10%',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'flight',
    category: 'Viagens',
    name: 'Passagem nacional promocional',
    store: 'Aero Club',
    price: 'R$ 489,00',
    oldPrice: 'R$ 699,00',
    cashback: '4%',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'perfume',
    category: 'Beleza',
    name: 'Perfume importado 100ml',
    store: 'Beauty Prime',
    price: 'R$ 299,90',
    oldPrice: 'R$ 399,90',
    cashback: '11%',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'skincare',
    category: 'Beleza',
    name: 'Kit skincare glow',
    store: 'Glow Store',
    price: 'R$ 149,90',
    oldPrice: 'R$ 199,90',
    cashback: '9%',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'market',
    category: 'Mercado',
    name: 'Combo mercado da semana',
    store: 'Market Prime',
    price: 'R$ 179,90',
    oldPrice: 'R$ 229,90',
    cashback: '5%',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
  },
];

export default function App() {
  const [logged, setLogged] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');

  if (!logged) {
    return <LoginScreen onLogin={() => setLogged(true)} />;
  }

  return (
    <AppLayout activeScreen={activeScreen} setActiveScreen={setActiveScreen}>
      {activeScreen === 'home' && (
        <HomeScreen setActiveScreen={setActiveScreen} />
      )}

      {activeScreen === 'cards' && <CardsScreen />}

      {activeScreen === 'pix' && <PixScreen />}

      {activeScreen === 'shopping' && (
        <ShoppingScreen setActiveScreen={setActiveScreen} />
      )}

      {activeScreen === 'cashback' && <CashbackScreen />}

      {activeScreen === 'community' && <CommunityScreen />}

      {activeScreen === 'support' && <SupportScreen />}

      {activeScreen === 'profile' && (
        <ProfileScreen
          setActiveScreen={setActiveScreen}
          onLogout={() => setLogged(false)}
        />
      )}

      {activeScreen === 'statement' && <StatementScreen />}
    </AppLayout>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(false);

  function handleLogin() {
    if (!emailOrCpf.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha seu Email ou CPF e sua senha.');
      return;
    }

    onLogin();
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#04010D" />

      <ImageBackground
        source={require('./assets/images/login-background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(4,1,13,0.04)',
            'rgba(4,1,13,0.12)',
            'rgba(4,1,13,0.35)',
            'rgba(4,1,13,0.92)',
          ]}
          style={styles.loginOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
              style={styles.flex}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <ScrollView
                contentContainerStyle={styles.loginScroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.heroSpace} />

                <View style={styles.loginCardWrapper}>
                  <View style={styles.loginCard}>
                    <View style={styles.loginCardGlow} />

                    <Text style={styles.loginTitle}>Bem-vindo de volta!</Text>

                    <Text style={styles.loginSubtitle}>
                      Faça login na sua conta
                    </Text>

                    <View style={styles.inputBox}>
                      <Ionicons
                        name="person-outline"
                        size={24}
                        color={colors.purple}
                      />

                      <TextInput
                        value={emailOrCpf}
                        onChangeText={setEmailOrCpf}
                        placeholder="Email ou CPF"
                        placeholderTextColor="#9A9AAA"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                      />
                    </View>

                    <View style={styles.inputBox}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color={colors.purple}
                      />

                      <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Senha"
                        placeholderTextColor="#9A9AAA"
                        secureTextEntry={hidePassword}
                        style={styles.input}
                      />

                      <Pressable
                        onPress={() => setHidePassword(!hidePassword)}
                        hitSlop={12}
                      >
                        <Ionicons
                          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                          size={24}
                          color="#C2A8FF"
                        />
                      </Pressable>
                    </View>

                    <View style={styles.optionsRow}>
                      <Pressable
                        style={styles.rememberRow}
                        onPress={() => setRemember(!remember)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            remember && styles.checkboxActive,
                          ]}
                        >
                          {remember && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color={colors.white}
                            />
                          )}
                        </View>

                        <Text style={styles.rememberText}>
                          Lembrar meus dados
                        </Text>
                      </Pressable>

                      <Pressable>
                        <Text style={styles.forgotText}>
                          Esqueci minha senha
                        </Text>
                      </Pressable>
                    </View>

                    <Pressable onPress={handleLogin}>
                      <LinearGradient
                        colors={[
                          colors.purpleStrong,
                          colors.purpleSoft,
                          colors.orange,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButton}
                      >
                        <Text style={styles.loginButtonText}>Entrar</Text>
                      </LinearGradient>
                    </Pressable>

                    <View style={styles.dividerRow}>
                      <View style={styles.divider} />
                      <Text style={styles.dividerText}>ou continue com</Text>
                      <View style={styles.divider} />
                    </View>

                    <Pressable style={styles.googleButton}>
                      <View style={styles.googleIcon}>
                        <Text style={styles.googleLetter}>G</Text>
                      </View>

                      <Text style={styles.googleText}>
                        Continuar com Google
                      </Text>
                    </Pressable>

                    <View style={styles.registerRow}>
                      <Text style={styles.registerText}>
                        Ainda não tem uma conta?
                      </Text>

                      <Pressable>
                        <Text style={styles.registerLink}> Abra sua conta</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

function AppLayout({
  children,
  activeScreen,
  setActiveScreen,
}: {
  children: React.ReactNode;
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  return (
    <LinearGradient
      colors={['#05010F', '#090318', '#130626']}
      style={styles.appScreen}
    >
      <StatusBar barStyle="light-content" backgroundColor="#05010F" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.appScroll}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        <BottomTabs
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

function BottomTabs({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: AppScreen;
  setActiveScreen: (screen: AppScreen) => void;
}) {
  return (
    <View style={styles.bottomTabsWrapper}>
      <View style={styles.bottomTabs}>
        <TabButton
          icon="home-outline"
          label="Início"
          active={activeScreen === 'home'}
          onPress={() => setActiveScreen('home')}
        />

        <TabButton
          icon="card-outline"
          label="Cartões"
          active={activeScreen === 'cards'}
          onPress={() => setActiveScreen('cards')}
        />

        <TabButton
          icon="qr-code-outline"
          label="Pix"
          active={activeScreen === 'pix'}
          onPress={() => setActiveScreen('pix')}
        />

        <TabButton
          icon="storefront-outline"
          label="Shopping"
          active={activeScreen === 'shopping'}
          onPress={() => setActiveScreen('shopping')}
        />

        <TabButton
          icon="person-outline"
          label="Perfil"
          active={activeScreen === 'profile'}
          onPress={() => setActiveScreen('profile')}
        />
      </View>
    </View>
  );
}

function TabButton({
  icon,
  label,
  active,
  onPress,
}: {
  icon: IconName;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.tabButton} onPress={onPress}>
      <View style={active ? styles.activeTabIconBg : styles.inactiveTabIconBg}>
        <Ionicons
          name={icon}
          size={22}
          color={active ? colors.white : 'rgba(255,255,255,0.55)'}
        />
      </View>

      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>

      {active && <View style={styles.tabDot} />}
    </Pressable>
  );
}

function HomeScreen({
  setActiveScreen,
}: {
  setActiveScreen: (screen: AppScreen) => void;
}) {
  return (
    <>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Olá, João 👋</Text>
          <Text style={styles.greetingSub}>Bem-vindo ao Rocket Bank</Text>
        </View>

        <View style={styles.roundButton}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.white}
          />
        </View>
      </View>

      <LinearGradient
        colors={[
          'rgba(111,44,255,0.95)',
          'rgba(168,85,247,0.76)',
          'rgba(255,123,84,0.55)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balanceValue}>R$ 8.520,00</Text>
        <Text style={styles.balanceSub}>
          + R$ 248,90 em cashback acumulado
        </Text>
      </LinearGradient>

      <View style={styles.quickGrid}>
        <QuickAction
          icon="qr-code-outline"
          label="Pix"
          onPress={() => setActiveScreen('pix')}
        />

        <QuickAction
          icon="swap-horizontal-outline"
          label="Transferir"
          onPress={() => setActiveScreen('pix')}
        />

        <QuickAction
          icon="receipt-outline"
          label="Pagar"
          onPress={() => setActiveScreen('statement')}
        />

        <QuickAction
          icon="card-outline"
          label="Cartões"
          onPress={() => setActiveScreen('cards')}
        />
      </View>

      <SectionHeader
        title="Benefícios Rocket"
        action="Ver cashback"
        onPress={() => setActiveScreen('cashback')}
      />

      <View style={styles.twoColumns}>
        <FeatureCard
          icon="storefront-outline"
          title="Rocket Shopping"
          text="Compre em parceiros e ganhe cashback."
          onPress={() => setActiveScreen('shopping')}
        />

        <FeatureCard
          icon="people-outline"
          title="Rocket Connect"
          text="Conteúdos e comunidade financeira."
          onPress={() => setActiveScreen('community')}
        />
      </View>

      <SectionHeader
        title="Últimas movimentações"
        action="Extrato"
        onPress={() => setActiveScreen('statement')}
      />

      <View style={styles.listCard}>
        <Transaction
          icon="cash-outline"
          title="Cashback recebido"
          subtitle="Rocket Shopping"
          value="+ R$ 28,90"
          positive
        />

        <Transaction
          icon="send-outline"
          title="Pix enviado"
          subtitle="Pedro Santos"
          value="- R$ 120,00"
        />

        <Transaction
          icon="cart-outline"
          title="Compra aprovada"
          subtitle="Mercado Livre"
          value="- R$ 89,90"
        />
      </View>
    </>
  );
}

function CardsScreen() {
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

      <View style={styles.twoColumns}>
        <MetricCard label="Limite disponível" value="R$ 5.200" />
        <MetricCard label="Fatura atual" value="R$ 1.340" />
      </View>

      <View style={styles.listCard}>
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

function PixScreen() {
  return (
    <>
      <ScreenTitle
        title="Pix Rocket"
        subtitle="Envie, receba e acompanhe seus Pix com segurança."
      />

      <View style={styles.pixGrid}>
        <PixCard
          icon="send-outline"
          title="Enviar Pix"
          text="Transferência imediata."
        />

        <PixCard
          icon="download-outline"
          title="Receber Pix"
          text="QR Code ou chave Pix."
        />

        <PixCard
          icon="copy-outline"
          title="Copia e Cola"
          text="Cole o código Pix."
        />

        <PixCard
          icon="calendar-outline"
          title="Agendar Pix"
          text="Programe pagamentos."
        />
      </View>

      <SectionHeader title="Minhas chaves" />

      <View style={styles.listCard}>
        <MenuRow
          icon="mail-outline"
          title="email@rocketbank.com"
          subtitle="Chave principal"
        />

        <MenuRow
          icon="call-outline"
          title="(83) 99999-0000"
          subtitle="Celular cadastrado"
        />
      </View>
    </>
  );
}

function ShoppingScreen({
  setActiveScreen,
}: {
  setActiveScreen: (screen: AppScreen) => void;
}) {
  const featuredProducts = shoppingProducts.slice(0, 4);
  const technologyProducts = shoppingProducts.filter(
    (product) => product.category === 'Tecnologia'
  );
  const fashionProducts = shoppingProducts.filter(
    (product) => product.category === 'Moda'
  );
  const homeProducts = shoppingProducts.filter(
    (product) => product.category === 'Casa'
  );
  const travelProducts = shoppingProducts.filter(
    (product) => product.category === 'Viagens'
  );
  const beautyProducts = shoppingProducts.filter(
    (product) => product.category === 'Beleza'
  );
  const marketProducts = shoppingProducts.filter(
    (product) => product.category === 'Mercado'
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
        style={styles.shoppingBannerWrapper}
        onPress={() => setActiveScreen('cashback')}
      >
        <Image
          source={require('./assets/images/rocket-shopping-banner.png')}
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

      <ProductSection title="Destaques com cashback" products={featuredProducts} />
      <ProductSection title="Tecnologia" products={technologyProducts} />
      <ProductSection title="Moda" products={fashionProducts} />
      <ProductSection title="Casa" products={homeProducts} />
      <ProductSection title="Viagens" products={travelProducts} />
      <ProductSection title="Beleza" products={beautyProducts} />
      <ProductSection title="Mercado" products={marketProducts} />
    </>
  );
}

function CashbackScreen() {
  return (
    <>
      <ScreenTitle
        title="Cashback"
        subtitle="Seu dinheiro voltando para você."
      />

      <LinearGradient
        colors={['rgba(34,197,94,0.90)', 'rgba(139,92,246,0.85)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cashbackCard}
      >
        <Text style={styles.balanceLabel}>Saldo de cashback</Text>
        <Text style={styles.balanceValue}>R$ 248,90</Text>
        <Text style={styles.balanceSub}>
          Use no shopping, abata na fatura ou transfira para sua conta.
        </Text>
      </LinearGradient>

      <View style={styles.twoColumns}>
        <MetricCard label="No cartão" value="R$ 92,40" />
        <MetricCard label="No shopping" value="R$ 156,50" />
      </View>

      <View style={styles.listCard}>
        <MenuRow
          icon="sparkles-outline"
          title="Dobro de cashback"
          subtitle="Campanha ativa em lojas selecionadas."
        />

        <MenuRow
          icon="card-outline"
          title="Rocket Gold"
          subtitle="Compras no cartão geram benefícios extras."
        />
      </View>
    </>
  );
}

function CommunityScreen() {
  return (
    <>
      <ScreenTitle
        title="Rocket Connect"
        subtitle="Comunidade, educação financeira e desafios."
      />

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>

          <View>
            <Text style={styles.postAuthor}>Rocket Educação</Text>
            <Text style={styles.postTime}>há 12 minutos</Text>
          </View>
        </View>

        <Text style={styles.postText}>
          Dica rápida: separe seu dinheiro em metas mensais e acompanhe tudo
          pelo resumo financeiro do Rocket Bank.
        </Text>

        <View style={styles.postActions}>
          <Ionicons name="heart-outline" size={22} color={colors.mutedDark} />
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={colors.mutedDark}
          />
          <Ionicons
            name="bookmark-outline"
            size={22}
            color={colors.mutedDark}
          />
        </View>
      </View>

      <View style={styles.challengeCard}>
        <Ionicons name="trophy-outline" size={34} color={colors.gold} />

        <View style={styles.challengeInfo}>
          <Text style={styles.challengeTitle}>Desafio 30 dias</Text>
          <Text style={styles.challengeText}>
            Economize R$ 300 e desbloqueie um badge Rocket.
          </Text>
        </View>
      </View>
    </>
  );
}

function SupportScreen() {
  return (
    <>
      <ScreenTitle
        title="Atendimento"
        subtitle="Resolva dúvidas e acompanhe solicitações."
      />

      <View style={styles.supportCard}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={36}
          color={colors.white}
        />

        <View style={styles.supportInfo}>
          <Text style={styles.supportTitle}>
            Falar com assistente Rocket
          </Text>

          <Text style={styles.supportText}>
            Atendimento inicial inteligente 24 horas.
          </Text>
        </View>
      </View>

      <View style={styles.listCard}>
        <MenuRow
          icon="qr-code-outline"
          title="Ajuda com Pix"
          subtitle="Chaves, comprovantes e transferências."
        />

        <MenuRow
          icon="card-outline"
          title="Cartões"
          subtitle="Bloqueio, limite e fatura."
        />

        <MenuRow
          icon="storefront-outline"
          title="Rocket Shopping"
          subtitle="Pedidos, cashback e lojas parceiras."
        />

        <MenuRow
          icon="help-circle-outline"
          title="Abrir chamado"
          subtitle="Acompanhe solicitações dentro do app."
        />
      </View>
    </>
  );
}

function ProfileScreen({
  setActiveScreen,
  onLogout,
}: {
  setActiveScreen: (screen: AppScreen) => void;
  onLogout: () => void;
}) {
  return (
    <>
      <ScreenTitle
        title="Perfil"
        subtitle="Dados, segurança e configurações."
      />

      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>JS</Text>
        </View>

        <View>
          <Text style={styles.profileName}>João Silva</Text>
          <Text style={styles.profileAccount}>
            Conta Rocket • 0001 • 123456-7
          </Text>
        </View>
      </View>

      <View style={styles.listCard}>
        <MenuRow
          icon="person-outline"
          title="Dados pessoais"
          subtitle="Nome, telefone, e-mail e documentos."
        />

        <MenuRow
          icon="shield-checkmark-outline"
          title="Segurança"
          subtitle="Biometria, senha e verificação."
        />

        <MenuRow
          icon="notifications-outline"
          title="Notificações"
          subtitle="Alertas, compras, Pix e benefícios."
        />

        <MenuRow
          icon="chatbubble-ellipses-outline"
          title="Central de atendimento"
          subtitle="Fale conosco e acompanhe chamados."
          onPress={() => setActiveScreen('support')}
        />

        <MenuRow
          icon="log-out-outline"
          title="Sair da conta"
          subtitle="Voltar para a tela de login."
          onPress={onLogout}
        />
      </View>
    </>
  );
}

function StatementScreen() {
  return (
    <>
      <ScreenTitle
        title="Extrato"
        subtitle="Acompanhe suas movimentações em tempo real."
      />

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color={colors.mutedDark} />
        <Text style={styles.searchText}>Buscar movimentação</Text>
      </View>

      <View style={styles.filterRow}>
        <FilterChip label="Todos" active />
        <FilterChip label="Entradas" />
        <FilterChip label="Saídas" />
        <FilterChip label="Cashback" />
      </View>

      <View style={styles.listCard}>
        <Transaction
          icon="briefcase-outline"
          title="Salário recebido"
          subtitle="Empresa"
          value="+ R$ 4.500,00"
          positive
        />

        <Transaction
          icon="sparkles-outline"
          title="Cashback Gold"
          subtitle="Benefícios"
          value="+ R$ 35,00"
          positive
        />

        <Transaction
          icon="film-outline"
          title="Pagamento Netflix"
          subtitle="Assinatura"
          value="- R$ 55,90"
        />

        <Transaction
          icon="basket-outline"
          title="Supermercado"
          subtitle="Alimentação"
          value="- R$ 248,32"
        />
      </View>
    </>
  );
}

function ScreenTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.screenTitleBox}>
      <Text style={styles.screenTitle}>{title}</Text>
      <Text style={styles.screenSubtitle}>{subtitle}</Text>
    </View>
  );
}

function SectionHeader({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {action && (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quickAction} onPress={onPress}>
      <LinearGradient
        colors={['rgba(139,92,246,0.24)', 'rgba(255,123,84,0.12)']}
        style={styles.quickIcon}
      >
        <Ionicons name={icon} size={24} color={colors.white} />
      </LinearGradient>

      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  onPress,
}: {
  icon: IconName;
  title: string;
  text: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.featureCard} onPress={onPress}>
      <Ionicons name={icon} size={30} color={colors.purpleSoft} />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </Pressable>
  );
}

function Transaction({
  icon,
  title,
  subtitle,
  value,
  positive,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <View style={styles.transactionRow}>
      <View style={styles.transactionIcon}>
        <Ionicons name={icon} size={22} color={colors.purpleSoft} />
      </View>

      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionSubtitle}>{subtitle}</Text>
      </View>

      <Text
        style={[
          styles.transactionValue,
          positive && styles.transactionValuePositive,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function RocketCard({
  variant,
  hidden,
  onToggleVisibility,
}: {
  variant: 'gold' | 'black';
  hidden: boolean;
  onToggleVisibility: () => void;
}) {
  const isGold = variant === 'gold';
  const textColor = isGold ? '#261400' : colors.white;
  const number = hidden ? '••••  ••••  ••••  3456' : '5412 7512 3412 3456';

  return (
    <LinearGradient
      colors={
        isGold
          ? ['#F8D777', '#C89512', '#F6C766']
          : ['#080808', '#111111', '#2A2140']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.rocketCard}
    >
      <Pressable
        style={[
          styles.cardEyeButton,
          isGold ? styles.cardEyeButtonGold : styles.cardEyeButtonBlack,
        ]}
        onPress={onToggleVisibility}
        hitSlop={12}
      >
        <Ionicons
          name={hidden ? 'eye-off-outline' : 'eye-outline'}
          size={24}
          color={textColor}
        />
      </Pressable>

      <View style={styles.rocketCardTop}>
        <View>
          <Text style={[styles.rocketCardBrand, { color: textColor }]}>
            Rocket Bank
          </Text>

          <Text style={[styles.rocketCardType, { color: textColor }]}>
            {isGold ? 'GOLD' : 'BLACK'}
          </Text>
        </View>

        <Ionicons
          name="wifi-outline"
          size={28}
          color={textColor}
        />
      </View>

      <View style={[styles.cardChip, isGold && styles.cardChipGold]} />

      <Text style={[styles.cardNumber, { color: textColor }]}>
        {number}
      </Text>

      <View style={styles.cardFooter}>
        <View>
          <Text style={[styles.cardSmall, { color: textColor }]}>
            TITULAR
          </Text>

          <Text style={[styles.cardHolder, { color: textColor }]}>
            ALEXANDER JAMES
          </Text>
        </View>

        <View>
          <Text style={[styles.cardSmall, { color: textColor }]}>
            VALIDADE
          </Text>

          <Text style={[styles.cardHolder, { color: textColor }]}>
            12/28
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function MenuRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={22} color={colors.purpleSoft} />
      </View>

      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.mutedDark} />
    </Pressable>
  );
}

function PixCard({
  icon,
  title,
  text,
}: {
  icon: IconName;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.pixCard}>
      <Ionicons name={icon} size={28} color={colors.purpleSoft} />
      <Text style={styles.pixCardTitle}>{title}</Text>
      <Text style={styles.pixCardText}>{text}</Text>
    </View>
  );
}

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: ShoppingProduct[];
}) {
  return (
    <View style={styles.productSection}>
      <SectionHeader title={title} action="Ver tudo" />
      <View style={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
}

function ProductCard({ product }: { product: ShoppingProduct }) {
  return (
    <Pressable style={styles.productCard}>
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

function CategoryCard({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable style={styles.categoryCard}>
      <LinearGradient
        colors={['rgba(139,92,246,0.25)', 'rgba(255,123,84,0.08)']}
        style={styles.categoryIconBox}
      >
        <Ionicons name={icon} size={24} color={colors.white} />
      </LinearGradient>
      <Text style={styles.categoryLabel}>{label}</Text>
    </Pressable>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.filterChip, active && styles.filterChipActive]}>
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  background: {
    flex: 1,
  },

  loginOverlay: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  loginScroll: {
    flexGrow: 1,
    paddingBottom: 34,
  },

  heroSpace: {
    height: HERO_SPACE,
  },

  loginCardWrapper: {
    marginHorizontal: 22,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOpacity: 0.28,
    shadowRadius: 26,
    elevation: 14,
  },

  loginCard: {
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 28,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
  },

  loginCardGlow: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(168,85,247,0.16)',
  },

  loginTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },

  loginSubtitle: {
    color: colors.muted,
    fontSize: 15,
    marginBottom: 24,
  },

  inputBox: {
    height: 64,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: colors.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    marginLeft: 12,
  },

  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
  },

  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },

  rememberText: {
    color: '#C8C8D4',
    fontSize: 13,
  },

  forgotText: {
    color: '#C2A8FF',
    fontSize: 13,
    fontWeight: '700',
  },

  loginButton: {
    height: 62,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A855F7',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },

  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  dividerText: {
    color: '#AAAABA',
    fontSize: 13,
    marginHorizontal: 12,
  },

  googleButton: {
    height: 62,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  googleLetter: {
    color: '#4285F4',
    fontSize: 18,
    fontWeight: '900',
  },

  googleText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 28,
  },

  registerText: {
    color: colors.muted,
    fontSize: 14,
  },

  registerLink: {
    color: '#C2A8FF',
    fontSize: 14,
    fontWeight: '800',
  },

  appScreen: {
    flex: 1,
  },

  appScroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 116,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  greeting: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
  },

  greetingSub: {
    color: colors.mutedDark,
    fontSize: 14,
    marginTop: 4,
  },

  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  balanceCard: {
    borderRadius: 30,
    padding: 24,
    marginBottom: 22,
  },

  balanceLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
  },

  balanceValue: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '900',
    marginTop: 8,
  },

  balanceSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
  },

  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  quickAction: {
    width: '23%',
    alignItems: 'center',
  },

  quickIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  quickLabel: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '700',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },

  sectionAction: {
    color: colors.purpleSoft,
    fontSize: 14,
    fontWeight: '800',
  },

  twoColumns: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },

  featureTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 12,
  },

  featureText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  listCard: {
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  transactionInfo: {
    flex: 1,
  },

  transactionTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  transactionSubtitle: {
    color: colors.mutedDark,
    fontSize: 13,
    marginTop: 3,
  },

  transactionValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },

  transactionValuePositive: {
    color: colors.green,
  },

  bottomTabsWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
    height: 78,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 22,
    elevation: 18,
  },

  bottomTabs: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'rgba(20,20,30,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTabIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inactiveTabIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '700',
  },

  tabLabelActive: {
    color: colors.white,
  },

  tabDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C2A8FF',
    marginTop: 4,
  },

  screenTitleBox: {
    marginBottom: 22,
  },

  screenTitle: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },

  screenSubtitle: {
    color: colors.mutedDark,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },

  rocketCard: {
    height: 220,
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    overflow: 'hidden',
    position: 'relative',
  },

  rocketCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rocketCardBrand: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },

  rocketCardType: {
    color: colors.white,
    letterSpacing: 7,
    fontSize: 13,
    marginTop: 4,
  },

  darkText: {
    color: '#261400',
  },

  cardChip: {
    width: 48,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginTop: 24,
  },

  cardNumber: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 18,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },

  cardSmall: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    letterSpacing: 1,
  },

  cardHolder: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 3,
  },

  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },

  metricLabel: {
    color: colors.mutedDark,
    fontSize: 13,
  },

  metricValue: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  menuIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(139,92,246,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuInfo: {
    flex: 1,
  },

  menuTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },

  menuSubtitle: {
    color: colors.mutedDark,
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },

  pixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  pixCard: {
    width: '48%',
    minHeight: 146,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },

  pixCardTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 14,
  },

  pixCardText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  promoCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
  },

  promoTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
  },

  promoText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  promoButton: {
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  promoButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },

  categoryCard: {
    width: '31.5%',
    minHeight: 104,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  categoryLabel: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '800',
  },

  cashbackCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 22,
  },

  postCard: {
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 16,
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.purpleStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },

  postAuthor: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },

  postTime: {
    color: colors.mutedDark,
    fontSize: 12,
    marginTop: 3,
  },

  postText: {
    color: '#D8D8E4',
    fontSize: 15,
    lineHeight: 23,
  },

  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    marginTop: 16,
  },

  challengeCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },

  challengeInfo: {
    flex: 1,
    marginLeft: 14,
  },

  challengeTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },

  challengeText: {
    color: colors.mutedDark,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },

  supportCard: {
    flexDirection: 'row',
    backgroundColor: colors.purpleStrong,
    borderRadius: 28,
    padding: 22,
    alignItems: 'center',
    marginBottom: 22,
  },

  supportInfo: {
    flex: 1,
    marginLeft: 14,
  },

  supportTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },

  supportText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 20,
  },

  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.purpleStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  profileAvatarText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },

  profileName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },

  profileAccount: {
    color: colors.mutedDark,
    fontSize: 13,
    marginTop: 4,
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
    color: colors.mutedDark,
    fontSize: 15,
    marginLeft: 10,
  },

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },

  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },

  filterChipActive: {
    backgroundColor: colors.purpleStrong,
    borderColor: colors.purpleStrong,
  },

  filterText: {
    color: colors.mutedDark,
    fontSize: 13,
    fontWeight: '700',
  },

  filterTextActive: {
    color: colors.white,
  },

  shoppingHeroBanner: {
    minHeight: 188,
    borderRadius: 30,
    padding: 22,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  shoppingHeroContent: {
    flex: 1,
    zIndex: 2,
  },

  shoppingHeroTag: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginBottom: 8,
  },

  shoppingHeroTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -1,
  },

  shoppingHeroText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 240,
  },

  shoppingHeroButton: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 16,
  },

  shoppingHeroButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },

  shoppingHeroIcon: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
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

  productSection: {
    marginBottom: 10,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

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

  categoryIconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  cardEyeButton: {
    position: 'absolute',
    right: 20,
    top: 68,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },

  cardEyeButtonGold: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  cardEyeButtonBlack: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  cardChipGold: {
    backgroundColor: 'rgba(255,255,255,0.42)',
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


});
