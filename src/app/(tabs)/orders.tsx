import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/empty-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getOrderStep, orderSteps, useOrders } from '@/context/orders';
import { useNow } from '@/hooks/use-now';
import { formatPrice } from '@/utils/format';

export default function OrdersScreen() {
  const { orders } = useOrders();
  const now = useNow(orders.length > 0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <FlatList
          data={orders}
          keyExtractor={(order) => order.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={<ThemedText type="title">Mis pedidos</ThemedText>}
          ListEmptyComponent={
            <EmptyState
              emoji="🧾"
              title="Todavía no hiciste pedidos"
              message="Cuando hagas uno, vas a poder seguirlo desde acá."
            />
          }
          renderItem={({ item }) => (
            <Link href={{ pathname: '/order/[id]', params: { id: item.id } }} asChild>
              <Pressable style={({ pressed }) => pressed && styles.pressed}>
                <ThemedView type="backgroundElement" style={styles.card}>
                  <View style={styles.row}>
                    <ThemedText type="smallBold" style={styles.name} numberOfLines={1}>
                      {item.restaurantName}
                    </ThemedText>
                    <ThemedText type="smallBold">{formatPrice(item.total)}</ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="primary">
                    {orderSteps[getOrderStep(item.createdAt, now)]}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                    {item.lines.map((line) => `${line.quantity} × ${line.product.name}`).join(', ')}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            </Link>
          )}
        />
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
  },
  list: {
    flexGrow: 1,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.half,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});
