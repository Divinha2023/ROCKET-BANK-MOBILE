import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type AlertButton,
} from 'react-native';
import { colors } from '../theme';

type PopupTone = 'info' | 'success' | 'warning';
type IconName = ComponentProps<typeof Ionicons>['name'];

type PopupState = {
  buttons: AlertButton[];
  message?: string;
  options?: Parameters<typeof Alert.alert>[3];
  title: string;
  tone: PopupTone;
};

const toneStyles: Record<
  PopupTone,
  { glow: string; icon: IconName; stops: [string, string] }
> = {
  info: {
    glow: 'rgba(111,44,255,0.24)',
    icon: 'sparkles-outline',
    stops: [colors.purpleStrong, colors.purpleSoft],
  },
  success: {
    glow: 'rgba(34,197,94,0.2)',
    icon: 'checkmark-circle-outline',
    stops: [colors.green, '#7CFFB2'],
  },
  warning: {
    glow: 'rgba(255,123,84,0.22)',
    icon: 'alert-circle-outline',
    stops: [colors.orange, '#FFB86B'],
  },
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function resolveTone(title: string, message?: string, buttons: AlertButton[] = []) {
  const content = normalizeText(`${title} ${message ?? ''}`);
  const hasDestructiveButton = buttons.some(
    (button) => button.style === 'destructive'
  );

  if (
    hasDestructiveButton ||
    ['atencao', 'invalido', 'insuficiente', 'erro', 'incompleto'].some((word) =>
      content.includes(word)
    )
  ) {
    return 'warning';
  }

  if (
    ['sucesso', 'aprovad', 'adicionado', 'ativad', 'paga', 'enviado', 'copiada'].some(
      (word) => content.includes(word)
    )
  ) {
    return 'success';
  }

  return 'info';
}

export function AppPopupProvider({ children }: { children: ReactNode }) {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const originalAlert = useRef<typeof Alert.alert | null>(null);

  useEffect(() => {
    let mounted = true;
    const mutableAlert = Alert as typeof Alert & { alert: typeof Alert.alert };
    originalAlert.current = mutableAlert.alert;

    mutableAlert.alert = (title, message, buttons, options) => {
      const nextButtons =
        buttons && buttons.length > 0 ? buttons : [{ text: 'Entendi' }];
      const nextPopup: PopupState = {
        buttons: nextButtons,
        message,
        options,
        title: title || 'Rocket Bank',
        tone: resolveTone(title || 'Rocket Bank', message, nextButtons),
      };

      setTimeout(() => {
        if (mounted) {
          setPopup(nextPopup);
        }
      }, 0);
    };

    return () => {
      mounted = false;
      if (originalAlert.current) {
        mutableAlert.alert = originalAlert.current;
      }
    };
  }, []);

  function closePopup() {
    setPopup(null);
  }

  function handleButtonPress(button: AlertButton) {
    setPopup(null);

    if (button.onPress) {
      requestAnimationFrame(() => {
        button.onPress?.();
      });
    }
  }

  const tone = popup ? toneStyles[popup.tone] : toneStyles.info;
  const isCancelable = popup?.options?.cancelable !== false;
  const stackButtons = Boolean(popup && popup.buttons.length > 2);

  return (
    <>
      {children}

      <Modal
        animationType="fade"
        onRequestClose={isCancelable ? closePopup : undefined}
        transparent
        visible={Boolean(popup)}
      >
        {popup ? (
          <Pressable
            disabled={!isCancelable}
            onPress={closePopup}
            style={styles.backdrop}
          >
            <Pressable onPress={() => undefined} style={styles.popupCard}>
              <LinearGradient colors={tone.stops} style={styles.topAccent} />
              <View style={[styles.cardGlow, { backgroundColor: tone.glow }]} />

              <View style={styles.cardBody}>
                <View style={styles.header}>
                  <LinearGradient colors={tone.stops} style={styles.iconBadge}>
                    <Ionicons name={tone.icon} size={24} color={colors.white} />
                  </LinearGradient>
                  <Text style={styles.title}>{popup.title}</Text>
                </View>

                {popup.message ? (
                  <Text style={styles.message}>{popup.message}</Text>
                ) : null}

                <View
                  style={[
                    styles.buttonRow,
                    stackButtons && styles.buttonColumn,
                  ]}
                >
                  {popup.buttons.map((button, index) => {
                    const isCancel = button.style === 'cancel';
                    const isDestructive = button.style === 'destructive';
                    const isLast = index === popup.buttons.length - 1;

                    return (
                      <Pressable
                        key={`${button.text ?? 'button'}-${index}`}
                        onPress={() => handleButtonPress(button)}
                        style={({ pressed }) => [
                          styles.popupButton,
                          isCancel ? styles.secondaryButton : styles.primaryButton,
                          isDestructive && styles.destructiveButton,
                          !isLast &&
                            (stackButtons
                              ? styles.buttonStackGap
                              : styles.buttonSideGap),
                          pressed && styles.buttonPressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            isCancel && styles.secondaryButtonText,
                          ]}
                        >
                          {button.text ?? 'Entendi'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </Pressable>
          </Pressable>
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(2,0,8,0.72)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  popupCard: {
    backgroundColor: '#0B0716',
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 28,
    borderWidth: 1,
    maxWidth: 420,
    overflow: 'hidden',
    width: '100%',
  },
  topAccent: {
    height: 5,
    width: '100%',
  },
  cardGlow: {
    borderRadius: 120,
    height: 190,
    position: 'absolute',
    right: -82,
    top: -92,
    width: 190,
  },
  cardBody: {
    padding: 22,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBadge: {
    alignItems: 'center',
    borderRadius: 18,
    height: 44,
    justifyContent: 'center',
    marginRight: 14,
    width: 44,
  },
  title: {
    color: colors.white,
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  buttonColumn: {
    flexDirection: 'column',
  },
  popupButton: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: colors.purpleStrong,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  destructiveButton: {
    backgroundColor: '#EF4444',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  buttonSideGap: {
    marginRight: 10,
  },
  buttonStackGap: {
    marginBottom: 10,
  },
  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryButtonText: {
    color: colors.muted,
  },
});
