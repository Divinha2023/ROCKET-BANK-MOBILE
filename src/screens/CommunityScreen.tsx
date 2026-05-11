import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { ScreenTitle } from '../components/ScreenTitle';

export function CommunityScreen() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

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
          <Pressable
            accessibilityRole="button"
            onPress={() => setLiked((current) => !current)}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={22}
              color={liked ? colors.orange : colors.mutedDark}
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              Alert.alert('Comentários', 'Você abriu a conversa desta publicação.')
            }
          >
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={colors.mutedDark}
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => setSaved((current) => !current)}
          >
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={saved ? colors.purpleSoft : colors.mutedDark}
            />
          </Pressable>
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

const styles = StyleSheet.create({
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
});
