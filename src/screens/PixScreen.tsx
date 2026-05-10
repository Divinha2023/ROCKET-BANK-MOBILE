import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, commonStyles } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';
import { SectionHeader } from '../components/SectionHeader';
import { MenuRow } from '../components/MenuRow';
import { PixCard } from '../components/PixCard';
import { formatCurrency, formatCurrencyInput, parseCurrency } from '../utils/currency';

type FavoriteContact = {
  bank: string;
  initials: string;
  key: string;
  name: string;
};

type Receipt = {
  amount: number;
  contact: FavoriteContact;
  id: string;
  paidAt: string;
};

const favoriteContacts: FavoriteContact[] = [
  {
    bank: 'Rocket Bank',
    initials: 'PS',
    key: 'pedro.santos@email.com',
    name: 'Pedro Santos',
  },
  {
    bank: 'Nubank',
    initials: 'AM',
    key: '(83) 98888-3344',
    name: 'Ana Martins',
  },
  {
    bank: 'Banco do Brasil',
    initials: 'LC',
    key: 'lucas.costa@email.com',
    name: 'Lucas Costa',
  },
];

const styles = StyleSheet.create({
  pixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(34,197,94,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.22)',
    padding: 16,
    marginBottom: 18,
  },
  statusText: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
  },
  favoriteList: {
    marginBottom: 22,
  },
  favoriteContact: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 14,
    marginBottom: 10,
  },
  favoriteAvatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(168,85,247,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.32)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  favoriteInitials: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  favoriteKey: {
    color: colors.mutedDark,
    fontSize: 12,
    marginTop: 4,
  },
  sendCard: {
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.055)',
    padding: 18,
    marginBottom: 18,
  },
  sendContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  sendName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  sendBank: {
    color: colors.mutedDark,
    fontSize: 13,
    marginTop: 4,
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
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.11)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  noteInput: {
    minHeight: 84,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.11)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: colors.white,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
    textAlignVertical: 'top',
  },
  primaryButton: {
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.purpleStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    height: 50,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  receiptCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    padding: 18,
    marginBottom: 18,
  },
  receiptLogoBox: {
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingVertical: 16,
    marginBottom: 18,
  },
  receiptLogo: {
    width: 184,
    height: 82,
  },
  receiptSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  receiptSuccessText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 10,
  },
  receiptAmount: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 16,
  },
  receiptRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
  },
  receiptLabel: {
    color: colors.mutedDark,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  receiptValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});

export function PixScreen({
  accountBalance,
  onSendPix,
  pixDailyRemaining,
}: {
  accountBalance: number;
  onSendPix: (amount: number) => 'balance' | 'daily-limit' | 'invalid' | 'success';
  pixDailyRemaining: number;
}) {
  const [selectedContact, setSelectedContact] = useState<FavoriteContact | null>(
    null
  );
  const [amountValue, setAmountValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  function resetPixFlow() {
    setSelectedContact(null);
    setAmountValue('');
    setMessageValue('');
    setReceipt(null);
  }

  function handlePixAction(action: string) {
    Alert.alert(action, 'Fluxo Pix simulado iniciado com sucesso.');
  }

  function handleSelectContact(contact: FavoriteContact) {
    setReceipt(null);
    setAmountValue('');
    setMessageValue('');
    setSelectedContact(contact);
  }

  function handleSendPix() {
    if (!selectedContact) {
      return;
    }

    const amount = parseCurrency(amountValue);

    if (amount <= 0) {
      Alert.alert('Valor invalido', 'Informe um valor maior que zero.');
      return;
    }

    const result = onSendPix(amount);

    if (result === 'daily-limit') {
      Alert.alert(
        'Limite diário atingido',
        `Você pode transferir até ${formatCurrency(6500)} por dia. Disponível hoje: ${formatCurrency(pixDailyRemaining)}.`
      );
      return;
    }

    if (result === 'balance') {
      Alert.alert('Saldo insuficiente', 'Não há saldo suficiente para este Pix.');
      return;
    }

    setReceipt({
      amount,
      contact: selectedContact,
      id: `RB-${Date.now().toString().slice(-8)}`,
      paidAt: new Date().toLocaleString('pt-BR'),
    });
  }

  if (receipt) {
    return (
      <>
        <ScreenTitle
          title="Comprovante Pix"
          subtitle="Transferencia concluida com sucesso."
        />

        <View style={styles.receiptCard}>
          <View style={styles.receiptLogoBox}>
            <Image
              source={require('../../assets/images/card-logo.png')}
              resizeMode="contain"
              style={styles.receiptLogo}
            />
          </View>

          <View style={styles.receiptSuccess}>
            <Ionicons name="checkmark-circle" size={28} color={colors.green} />
            <Text style={styles.receiptSuccessText}>Pix enviado</Text>
          </View>

          <Text style={styles.receiptAmount}>
            {formatCurrency(receipt.amount)}
          </Text>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Favorecido</Text>
            <Text style={styles.receiptValue}>{receipt.contact.name}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Chave Pix</Text>
            <Text style={styles.receiptValue}>{receipt.contact.key}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Instituicao</Text>
            <Text style={styles.receiptValue}>{receipt.contact.bank}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Data e hora</Text>
            <Text style={styles.receiptValue}>{receipt.paidAt}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Codigo</Text>
            <Text style={styles.receiptValue}>{receipt.id}</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.primaryButton}
          onPress={resetPixFlow}
        >
          <Text style={styles.buttonText}>Fazer outro Pix</Text>
        </Pressable>
      </>
    );
  }

  if (selectedContact) {
    return (
      <>
        <ScreenTitle
          title="Enviar Pix"
          subtitle="Confira os dados e informe o valor da transferencia."
        />

        <View style={styles.sendCard}>
          <View style={styles.sendContact}>
            <View style={styles.favoriteAvatar}>
              <Text style={styles.favoriteInitials}>
                {selectedContact.initials}
              </Text>
            </View>
            <View style={styles.favoriteInfo}>
              <Text style={styles.sendName}>{selectedContact.name}</Text>
              <Text style={styles.sendBank}>
                {selectedContact.bank} - {selectedContact.key}
              </Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Valor</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={(value) => setAmountValue(formatCurrencyInput(value))}
            placeholder="R$ 0,00"
            placeholderTextColor={colors.mutedDark}
            style={styles.amountInput}
            value={amountValue}
          />

          <Text style={styles.inputLabel}>Mensagem</Text>
          <TextInput
            multiline
            onChangeText={setMessageValue}
            placeholder="Opcional"
            placeholderTextColor={colors.mutedDark}
            style={styles.noteInput}
            value={messageValue}
          />

          <Text style={styles.statusText}>
            Saldo da conta: {formatCurrency(accountBalance)}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.primaryButton}
          onPress={handleSendPix}
        >
          <Text style={styles.buttonText}>Enviar Pix</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={styles.secondaryButton}
          onPress={resetPixFlow}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </>
    );
  }

  return (
    <>
      <ScreenTitle
        title="Pix Rocket"
        subtitle="Envie, receba e acompanhe seus Pix com segurança."
      />

      <View style={styles.statusCard}>
        <Ionicons name="shield-checkmark-outline" size={24} color={colors.green} />
        <Text style={styles.statusText}>
          Limite Pix diário disponível: {formatCurrency(pixDailyRemaining)}. Saldo da conta:{' '}
          {formatCurrency(accountBalance)}.
        </Text>
      </View>

      <View style={styles.pixGrid}>
        <PixCard
          icon="send-outline"
          title="Enviar Pix"
          text="Escolha um favorito."
          onPress={() => handleSelectContact(favoriteContacts[0])}
        />

        <PixCard
          icon="download-outline"
          title="Receber Pix"
          text="QR Code ou chave Pix."
          onPress={() => handlePixAction('Receber Pix')}
        />

        <PixCard
          icon="copy-outline"
          title="Copia e Cola"
          text="Cole o codigo Pix."
          onPress={() => handlePixAction('Pix Copia e Cola')}
        />

        <PixCard
          icon="calendar-outline"
          title="Agendar Pix"
          text="Programe pagamentos."
          onPress={() => handlePixAction('Agendar Pix')}
        />
      </View>

      <SectionHeader title="Contatos favoritos" />

      <View style={styles.favoriteList}>
        {favoriteContacts.map((contact) => (
          <Pressable
            accessibilityRole="button"
            key={contact.key}
            onPress={() => handleSelectContact(contact)}
            style={styles.favoriteContact}
          >
            <View style={styles.favoriteAvatar}>
              <Text style={styles.favoriteInitials}>{contact.initials}</Text>
            </View>
            <View style={styles.favoriteInfo}>
              <Text style={styles.favoriteName}>{contact.name}</Text>
              <Text style={styles.favoriteKey}>
                {contact.bank} - {contact.key}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.mutedDark}
            />
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Minhas chaves" />

      <View style={commonStyles.listCard}>
        <MenuRow
          icon="mail-outline"
          title="email@rocketbank.com"
          subtitle="Chave principal"
          onPress={() =>
            Alert.alert('Chave Pix', 'email@rocketbank.com copiada para uso.')
          }
        />

        <MenuRow
          icon="call-outline"
          title="(83) 99999-0000"
          subtitle="Celular cadastrado"
          onPress={() =>
            Alert.alert('Chave Pix', '(83) 99999-0000 copiada para uso.')
          }
        />
      </View>
    </>
  );
}
