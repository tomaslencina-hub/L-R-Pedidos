import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { BagIcon } from '@/components/logo';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ink, MaxContentWidth, Spacing } from '@/constants/theme';
import { user } from '@/constants/user';
import { useOrders } from '@/context/orders';
import { useTheme } from '@/hooks/use-theme';

const AVATAR_SIZE = 96;

export default function ProfileScreen() {
  const theme = useTheme();
  const { orders } = useOrders();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.identity}>
          <Block color={theme.primary} radius={AVATAR_SIZE / 2} contentStyle={styles.avatar}>
            <BagIcon height={52} />
          </Block>
          <View style={styles.flex}>
            <ThemedText type="small" themeColor="textSecondary">
              ¡Hola!
            </ThemedText>
            <ThemedText type="title">{user.name}</ThemedText>
          </View>
        </View>

        <Block contentStyle={styles.card}>
          <ThemedText type="small" themeColor="textSecondary">
            Te lo llevamos a
          </ThemedText>
          <ThemedText>📍 {user.address}</ThemedText>
        </Block>

        <Block color={theme.accent} contentStyle={styles.card}>
          <ThemedText type="small" style={styles.onAccent}>
            Pedidos hechos
          </ThemedText>
          <ThemedText type="title" style={styles.onAccent}>
            {orders.length}
          </ThemedText>
        </Block>

        <ThemedText type="small" themeColor="textSecondary" style={styles.tagline}>
          Lo pedís, te lo llevamos.
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  flex: {
    flex: 1,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.two,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: Spacing.three,
    gap: Spacing.half,
  },
  // The accent fill is the same in both themes, so its text stays ink
  onAccent: {
    color: Ink,
  },
  tagline: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
