import { useState } from 'react';
import type { ComponentProps } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

type LoginMode = 'login' | 'register' | 'recover';

type RegisterData = {
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
  cep: string;
  number: string;
  street: string;
  city: string;
  uf: string;
};

const initialRegisterData: RegisterData = {
  firstName: '',
  lastName: '',
  cpf: '',
  birthDate: '',
  email: '',
  password: '',
  cep: '',
  number: '',
  street: 'Preenchido automaticamente',
  city: '',
  uf: '',
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatCpf(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

function formatBirthDate(value: string) {
  const digits = onlyDigits(value).slice(0, 8);

  return digits
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function isValidBirthDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  const today = new Date();

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= today &&
    year >= 1900
  );
}

function isCpfInput(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 && /^[\d.-]+$/.test(trimmed);
}

function isValidAccess(value: string) {
  if (isCpfInput(value)) {
    return onlyDigits(value).length === 11;
  }

  return isValidEmail(value);
}

function getAccessValidationMessage(value: string) {
  if (isCpfInput(value)) {
    return 'Digite o CPF ';
  }

  return 'Digite um e-mail válido';
}

function getCopy(mode: LoginMode) {
  if (mode === 'recover') {
    return {
      title: 'Recuperar acesso',
      subtitle: 'Receba um link seguro para redefinir sua senha.',
      button: 'Enviar link',
    };
  }

  return {
    title: 'Bem-vindo de volta!',
    subtitle: '',
    button: 'Entrar',
  };
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<LoginMode>('login');
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterData>(
    initialRegisterData
  );
  const copy = getCopy(mode);
  const accessType = isCpfInput(emailOrCpf) ? 'cpf' : 'email';

  function handleAccessValueChange(value: string) {
    setEmailOrCpf(isCpfInput(value) ? formatCpf(value) : value.trim());
  }

  function updateRegisterField(field: keyof RegisterData, value: string) {
    const nextValue =
      field === 'cpf'
        ? formatCpf(value)
        : field === 'birthDate'
          ? formatBirthDate(value)
        : field === 'email'
          ? value.trim()
          : value;

    setRegisterData((current) => ({
      ...current,
      [field]: nextValue,
    }));
  }

  function switchMode(nextMode: LoginMode) {
    setMode(nextMode);
    setPassword('');
  }

  function handlePrimaryAction() {
    if (mode === 'recover') {
      if (!emailOrCpf.trim()) {
        Alert.alert('Informe seu acesso', 'Digite seu e-mail ou CPF para recuperar a conta.');
        return;
      }

      if (accessType === 'email' && !isValidEmail(emailOrCpf)) {
        Alert.alert('E-mail inválido', 'Digite um e-mail válido, como test@mail.com.');
        return;
      }

      if (accessType === 'cpf' && onlyDigits(emailOrCpf).length !== 11) {
        Alert.alert('CPF inválido', 'Digite o CPF no formato 000.000.000-00.');
        return;
      }

      Alert.alert(
        'Link enviado',
        'Enviamos as instruções de recuperação para seu contato cadastrado.'
      );
      switchMode('login');
      return;
    }

    if (!emailOrCpf.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha seu e-mail ou CPF e sua senha.');
      return;
    }

    if (accessType === 'email' && !isValidEmail(emailOrCpf)) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido, como test@mail.com.');
      return;
    }

    if (accessType === 'cpf' && onlyDigits(emailOrCpf).length !== 11) {
      Alert.alert('CPF inválido', 'Digite o CPF no formato 000.000.000-00.');
      return;
    }

    onLogin();
  }

  function handleRegisterAction() {
    const requiredFields: Array<keyof RegisterData> = [
      'firstName',
      'lastName',
      'cpf',
      'birthDate',
      'email',
      'password',
      'cep',
      'number',
      'city',
      'uf',
    ];
    const hasEmptyField = requiredFields.some(
      (field) => !registerData[field].trim()
    );

    if (hasEmptyField) {
      Alert.alert('Cadastro incompleto', 'Preencha os dados obrigatórios para criar sua conta.');
      return;
    }

    if (onlyDigits(registerData.cpf).length !== 11) {
      Alert.alert('CPF inválido', 'Digite o CPF no formato 000.000.000-00.');
      return;
    }

    if (!isValidBirthDate(registerData.birthDate)) {
      Alert.alert(
        'Data invalida',
        'Digite a data de nascimento no formato dd/mm/aaaa.'
      );
      return;
    }

    if (!isValidEmail(registerData.email)) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido, como test@mail.com.');
      return;
    }

    Alert.alert(
      'Conta criada',
      'Seu acesso demo foi criado. Entrando no Rocket Bank agora.'
    );
    onLogin();
  }

  function handleGoogleLogin() {
    Alert.alert(
      'Google conectado',
      'Login social simulado com sucesso para este protótipo.'
    );
    onLogin();
  }

  function renderRegisterField({
    autoCapitalize = 'none',
    editable = true,
    field,
    icon,
    keyboardType = 'default',
    label,
    maxLength,
    placeholder,
    secureTextEntry = false,
    style,
  }: {
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    editable?: boolean;
    field: keyof RegisterData;
    icon?: ComponentProps<typeof Ionicons>['name'];
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'number-pad';
    label: string;
    maxLength?: number;
    placeholder: string;
    secureTextEntry?: boolean;
    style?: StyleProp<ViewStyle>;
  }) {
    return (
      <View style={[styles.registerField, style]}>
        <Text style={styles.registerLabel}>{label}</Text>
        <View style={styles.registerInputBox}>
          <TextInput
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            editable={editable}
            keyboardType={keyboardType}
            maxLength={maxLength}
            onChangeText={(value) => updateRegisterField(field, value)}
            placeholder={placeholder}
            placeholderTextColor="#A3A0B4"
            secureTextEntry={secureTextEntry}
            style={styles.registerInput}
            value={registerData[field]}
          />

          {icon ? (
            <Ionicons
              name={icon}
              size={18}
              color="#6F6A84"
              style={styles.registerInputIcon}
            />
          ) : null}
        </View>
      </View>
    );
  }

  function renderRegister() {
    return (
      <ScrollView
        contentContainerStyle={styles.registerScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.registerTopBar}>
          <Pressable
            accessibilityLabel="Voltar para login"
            accessibilityRole="button"
            onPress={() => switchMode('login')}
            style={styles.registerBackButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.registerHeader}>
          <Text style={styles.registerTitle}>
            Crie sua conta{'\n'}
            <Text style={styles.titleAccent}>e decole.</Text>
          </Text>
          <Text style={styles.registerSubtitle}>
            Preencha os dados para criar sua conta.
          </Text>
        </View>

        <View style={styles.registerRow}>
          {renderRegisterField({
            autoCapitalize: 'words',
            field: 'firstName',
            label: 'Nome',
            placeholder: 'João',
            style: styles.registerHalfField,
          })}
          {renderRegisterField({
            autoCapitalize: 'words',
            field: 'lastName',
            label: 'Sobrenome',
            placeholder: 'Silva',
            style: styles.registerHalfField,
          })}
        </View>

        {renderRegisterField({
          field: 'cpf',
          keyboardType: 'number-pad',
          label: 'CPF',
          placeholder: '000.000.000-00',
        })}
        {renderRegisterField({
          field: 'birthDate',
          icon: 'calendar-outline',
          keyboardType: 'number-pad',
          label: 'Data de nascimento',
          maxLength: 10,
          placeholder: 'dd/mm/aaaa',
        })}
        {renderRegisterField({
          field: 'email',
          keyboardType: 'email-address',
          label: 'E-mail',
          placeholder: 'seu@email.com',
        })}
        {renderRegisterField({
          field: 'password',
          label: 'Senha',
          placeholder: 'Mínimo 8 caracteres',
          secureTextEntry: hidePassword,
        })}
        {renderRegisterField({
          field: 'cep',
          keyboardType: 'number-pad',
          label: 'CEP',
          placeholder: '00000-000',
        })}
        {renderRegisterField({
          field: 'number',
          label: 'Número',
          placeholder: 'Ex: 123, Apto 45',
        })}
        {renderRegisterField({
          editable: false,
          field: 'street',
          label: 'Rua',
          placeholder: 'Preenchido automaticamente',
        })}

        <View style={styles.registerRow}>
          {renderRegisterField({
            autoCapitalize: 'words',
            field: 'city',
            label: 'Cidade',
            placeholder: 'João Pessoa',
            style: styles.registerCityField,
          })}
          {renderRegisterField({
            autoCapitalize: 'characters',
            field: 'uf',
            label: 'UF',
            placeholder: 'PB',
            style: styles.registerUfField,
          })}
        </View>

        <View style={styles.registerActions}>
          <Pressable accessibilityRole="button" onPress={handleRegisterAction}>
            <LinearGradient
              colors={[colors.purpleStrong, colors.purpleSoft, colors.orange]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Criar conta</Text>
            </LinearGradient>
          </Pressable>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Já tem uma conta?</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => switchMode('login')}
            >
              <Text style={styles.switchLink}> Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }

  function renderLogin() {
    return (
      <ScrollView
        contentContainerStyle={styles.loginContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginCardWrapper}>
          <View style={styles.loginCard}>
            <View style={styles.loginCardGlow} />

            <Text style={styles.title}>{copy.title}</Text>
            {copy.subtitle ? (
              <Text style={styles.subtitle}>{copy.subtitle}</Text>
            ) : null}

            {mode === 'recover' ? (
              <Text style={styles.helperText}>
                Use o mesmo e-mail ou CPF cadastrado. Este fluxo é local e
                demonstra a jornada de recuperação.
              </Text>
            ) : null}

            <View style={styles.inputBox}>
              <Ionicons
                name={accessType === 'cpf' ? 'id-card-outline' : 'mail-outline'}
                size={24}
                color={colors.purple}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={handleAccessValueChange}
                placeholder="E-mail ou CPF"
                placeholderTextColor="#9A9AAA"
                style={styles.input}
                value={emailOrCpf}
              />
            </View>

            {mode !== 'recover' ? (
              <View style={styles.inputBox}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={colors.purple}
                />
                <TextInput
                  onChangeText={setPassword}
                  placeholder="Senha"
                  placeholderTextColor="#9A9AAA"
                  secureTextEntry={hidePassword}
                  style={styles.input}
                  value={password}
                />
                <Pressable
                  accessibilityRole="button"
                  hitSlop={12}
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Ionicons
                    name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                    size={24}
                    color="#C2A8FF"
                  />
                </Pressable>
              </View>
            ) : null}

            {mode === 'login' ? (
              <View style={styles.optionsRow}>
                <Pressable
                  style={styles.rememberRow}
                  onPress={() => setRemember(!remember)}
                >
                  <View
                    style={[styles.checkbox, remember && styles.checkboxActive]}
                  >
                    {remember ? (
                      <Ionicons name="checkmark" size={16} color={colors.white} />
                    ) : null}
                  </View>
                  <Text style={styles.rememberText}>Lembrar meus dados</Text>
                </Pressable>

                <Pressable
                  onPress={() => switchMode('recover')}
                  style={styles.forgotButton}
                >
                  <Text style={styles.forgotText}>Esqueci minha senha</Text>
                </Pressable>
              </View>
            ) : null}

            <Pressable accessibilityRole="button" onPress={handlePrimaryAction}>
              <LinearGradient
                colors={[colors.purpleStrong, colors.purpleSoft, colors.orange]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>{copy.button}</Text>
              </LinearGradient>
            </Pressable>

            {mode !== 'recover' ? (
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
                    <Image
                      source={require('../../assets/images/google-logo.png')}
                      style={styles.googleLogo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.googleText}>Continuar com Google</Text>
                </Pressable>
              </>
            ) : null}

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {mode === 'login' ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => switchMode(mode === 'login' ? 'register' : 'login')}
              >
                <Text style={styles.switchLink}>
                  {mode === 'login' ? ' Abra sua conta' : ' Entrar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    );
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
            'rgba(4,1,13,0.28)',
            'rgba(4,1,13,0.62)',
            'rgba(4,1,13,0.98)',
          ]}
          style={styles.overlay}
        >
          <SafeAreaView
            edges={['top', 'bottom', 'left', 'right']}
            style={styles.safeArea}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.flex}
            >
              {mode === 'register' ? renderRegister() : renderLogin()}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loginContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 18,
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
    backgroundColor: 'rgba(18,18,30,0.86)',
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
  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 18,
    textAlign: 'center',
  },
  titleAccent: {
    color: '#B86CFF',
  },
  subtitle: {
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
  fieldHint: {
    color: colors.mutedDark,
    fontSize: 12,
    lineHeight: 17,
    marginTop: -2,
    marginBottom: 10,
    marginLeft: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 16,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
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
    flexShrink: 1,
  },
  forgotButton: {
    marginLeft: 'auto',
    paddingVertical: 4,
  },
  forgotText: {
    color: '#C2A8FF',
    fontSize: 13,
    fontWeight: '700',
  },
  primaryButton: {
    height: 52,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A855F7',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  primaryButtonText: {
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
  googleLogo: {
    width: 22,
    height: 22,
  },
  googleText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 18,
  },
  switchText: {
    color: colors.muted,
    fontSize: 14,
  },
  switchLink: {
    color: '#C2A8FF',
    fontSize: 14,
    fontWeight: '800',
  },
  registerScroll: {
    paddingHorizontal: 28,
    paddingTop: 42,
    paddingBottom: 36,
  },
  registerTopBar: {
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  registerBackButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerHeader: {
    marginBottom: 22,
  },
  registerTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  registerSubtitle: {
    color: 'rgba(194,194,208,0.58)',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '700',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerField: {
    marginBottom: 14,
  },
  registerHalfField: {
    width: '48%',
  },
  registerCityField: {
    width: '68%',
  },
  registerUfField: {
    width: '28%',
  },
  registerLabel: {
    color: 'rgba(194,194,208,0.56)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  registerInputBox: {
    minHeight: 54,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(10,6,24,0.86)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  registerInput: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  registerInputIcon: {
    marginLeft: 10,
  },
  registerActions: {
    marginTop: 10,
  },
});
