import { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { AppLogo } from '../components/AppLogo';

type LoginMode = 'login' | 'register' | 'recover';

const styles = StyleSheet.create({
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
  flex: {
    flex: 1,
  },
  loginContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 18,
  },
  brandHeader: {
    paddingHorizontal: 22,
    paddingTop: 10,
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
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
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
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 6,
  },
  loginSubtitle: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 12,
  },
  helperText: {
    color: colors.mutedDark,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  benefitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  benefitPill: {
    flex: 1,
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    padding: 8,
    marginRight: 8,
  },
  benefitPillLast: {
    marginRight: 0,
  },
  benefitText: {
    color: colors.white,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    marginTop: 6,
  },
  inputBox: {
    height: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: colors.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
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
    marginTop: 2,
    marginBottom: 16,
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
    height: 52,
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
    marginVertical: 10,
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
    height: 50,
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
    marginTop: 18,
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
});

function getCopy(mode: LoginMode) {
  if (mode === 'register') {
    return {
      title: 'Abra sua conta',
      subtitle: 'Crie seu acesso digital em poucos passos.',
      button: 'Criar conta',
    };
  }

  if (mode === 'recover') {
    return {
      title: 'Recuperar acesso',
      subtitle: 'Receba um link seguro para redefinir sua senha.',
      button: 'Enviar link',
    };
  }

  return {
    title: 'Bem-vindo de volta!',
    subtitle: 'Faça login na sua conta',
    button: 'Entrar',
  };
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<LoginMode>('login');
  const [name, setName] = useState('');
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(false);
  const copy = getCopy(mode);

  function handlePrimaryAction() {
    if (mode === 'recover') {
      if (!emailOrCpf.trim()) {
        Alert.alert('Informe seu acesso', 'Digite seu Email ou CPF para recuperar a conta.');
        return;
      }

      Alert.alert(
        'Link enviado',
        'Enviamos as instruções de recuperação para seu contato cadastrado.'
      );
      setMode('login');
      return;
    }

    if (mode === 'register') {
      if (!name.trim() || !emailOrCpf.trim() || !password.trim()) {
        Alert.alert('Cadastro incompleto', 'Preencha nome, Email ou CPF e senha.');
        return;
      }

      Alert.alert(
        'Conta criada',
        'Seu acesso demo foi criado. Entrando no Rocket Bank agora.'
      );
      onLogin();
      return;
    }

    if (!emailOrCpf.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha seu Email ou CPF e sua senha.');
      return;
    }

    onLogin();
  }

  function handleGoogleLogin() {
    Alert.alert(
      'Google conectado',
      'Login social simulado com sucesso para este protótipo.'
    );
    onLogin();
  }

  function switchMode(nextMode: LoginMode) {
    setMode(nextMode);
    setPassword('');
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#04010D" />

      <ImageBackground
        source={require('../../assets/images/login-background.png')}
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
          <SafeAreaView
            edges={['top', 'bottom', 'left', 'right']}
            style={styles.safeArea}
          >
            <KeyboardAvoidingView
              style={styles.flex}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <View style={styles.loginContent}>
                <View style={styles.brandHeader}>
                  <AppLogo />
                </View>

                <View style={styles.loginCardWrapper}>
                  <View style={styles.loginCard}>
                    <View style={styles.loginCardGlow} />

                    <Text style={styles.loginTitle}>{copy.title}</Text>

                    <Text style={styles.loginSubtitle}>{copy.subtitle}</Text>

                    {mode === 'login' && (
                      <View style={styles.benefitRow}>
                        <View style={styles.benefitPill}>
                          <Ionicons
                            name="shield-checkmark-outline"
                            size={20}
                            color={colors.green}
                          />
                          <Text style={styles.benefitText}>Proteção em tempo real</Text>
                        </View>

                        <View style={styles.benefitPill}>
                          <Ionicons
                            name="cash-outline"
                            size={20}
                            color={colors.gold}
                          />
                          <Text style={styles.benefitText}>Cashback automático</Text>
                        </View>

                        <View style={[styles.benefitPill, styles.benefitPillLast]}>
                          <Ionicons
                            name="flash-outline"
                            size={20}
                            color={colors.orange}
                          />
                          <Text style={styles.benefitText}>Pix instantâneo</Text>
                        </View>
                      </View>
                    )}

                    {mode === 'recover' && (
                      <Text style={styles.helperText}>
                        Use o mesmo Email ou CPF cadastrado. Este fluxo é local e
                        demonstra a jornada de recuperação.
                      </Text>
                    )}

                    {mode === 'register' && (
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="person-add-outline"
                          size={24}
                          color={colors.purple}
                        />

                        <TextInput
                          value={name}
                          onChangeText={setName}
                          placeholder="Nome completo"
                          placeholderTextColor="#9A9AAA"
                          autoCapitalize="words"
                          style={styles.input}
                        />
                      </View>
                    )}

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

                    {mode !== 'recover' && (
                      <View style={styles.inputBox}>
                        <Ionicons
                          name="lock-closed-outline"
                          size={24}
                          color={colors.purple}
                        />

                        <TextInput
                          value={password}
                          onChangeText={setPassword}
                          placeholder={mode === 'register' ? 'Crie uma senha' : 'Senha'}
                          placeholderTextColor="#9A9AAA"
                          secureTextEntry={hidePassword}
                          style={styles.input}
                        />

                        <Pressable
                          accessibilityRole="button"
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
                    )}

                    {mode === 'login' && (
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

                      <Pressable onPress={() => switchMode('recover')}>
                        <Text style={styles.forgotText}>
                          Esqueci minha senha
                        </Text>
                      </Pressable>
                      </View>
                    )}

                    <Pressable accessibilityRole="button" onPress={handlePrimaryAction}>
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
                        <Text style={styles.loginButtonText}>{copy.button}</Text>
                      </LinearGradient>
                    </Pressable>

                    {mode !== 'recover' && (
                      <>
                        <View style={styles.dividerRow}>
                          <View style={styles.divider} />
                          <Text style={styles.dividerText}>ou continue com</Text>
                          <View style={styles.divider} />
                        </View>

                        <Pressable
                          accessibilityRole="button"
                          style={styles.googleButton}
                          onPress={handleGoogleLogin}
                        >
                          <View style={styles.googleIcon}>
                            <Text style={styles.googleLetter}>G</Text>
                          </View>

                          <Text style={styles.googleText}>
                            Continuar com Google
                          </Text>
                        </Pressable>
                      </>
                    )}

                    <View style={styles.registerRow}>
                      <Text style={styles.registerText}>
                        {mode === 'login'
                          ? 'Ainda não tem uma conta?'
                          : 'Já tem uma conta?'}
                      </Text>

                      <Pressable
                        accessibilityRole="button"
                        onPress={() => switchMode(mode === 'login' ? 'register' : 'login')}
                      >
                        <Text style={styles.registerLink}>
                          {mode === 'login' ? ' Abra sua conta' : ' Entrar'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
