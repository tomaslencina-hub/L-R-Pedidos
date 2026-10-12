import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { useDockInset } from '@/components/dock';
import { EmptyState } from '@/components/empty-state';
import { Tag } from '@/components/tag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandFonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { getOrderStep, orderSteps, useOrders } from '@/context/orders';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/utils/format';

const DELIVERED_COLOR = '#BFE3A1';

export default function OrdersScreen() {
  const theme = useTheme();
  const dockInset = useDockInset();
  const { orders } = useOrders();
  const now = useNow(orders.length > 0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <FlatList
          data={orders}
          keyExtractor={(order) => order.id}
          contentContainerStyle={[styles.list, { paddingBottom: dockInset }]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ThemedText type="title">Mis pedidos</ThemedText>}
          ListEmptyComponent={
            <EmptyState
              emoji="🧾"
              title="Todavía no pediste nada"
              message="Cuando hagas un pedido, lo vas a poder seguir desde acá."
            />
          }
          renderItem={({ item }) => {
            const step = getOrderStep(item.createdAt, now);
            const delivered = step === orderSteps.length - 1;

            return (
              <Block
                accessibilityRole="button"
                onPress={() => router.push({ pathname: '/order/[id]', params: { id: item.id } })}
                contentStyle={styles.card}>
                <View style={styles.row}>
                  <Tag label={orderSteps[step]} color={delivered ? DELIVERED_COLOR : theme.accent} />
                  <Text style={[styles.total, { color: theme.text }]}>
                    {formatPrice(item.total)}
                  </Text>
                </View>
                <ThemedText type="subtitle" numberOfLines={1}>
                  {item.restaurantName}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                  {item.lines.map((line) => `${line.quantity} × ${line.product.name}`).join(', ')}
                </ThemedText>
              </Block>
            );
          }}
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
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  total: {
    fontFamily: BrandFonts.title,
    fontSize: 18,
    lineHeight: 24,
  },
});
