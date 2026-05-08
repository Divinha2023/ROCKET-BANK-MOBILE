import { useState } from 'react';
import {
  Alert,
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
import { colors, HERO_SPACE } from '../theme';

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
});
export function LoginScreen({ onLogin }: { onLogin: () => void }) {
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
