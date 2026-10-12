import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { getOrderStep, orderSteps, paymentMethodLabels, useOrders } from '@/context/orders';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/utils/format';

export default function OrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { orders } = useOrders();
  const now = useNow();
  const order = orders.find((candidate) => candidate.id === id);

  if (!order) {
    return (
      <ThemedView style={styles.container}>
        <EmptyState emoji="🤷" title="Pedido no encontrado" message="No pudimos encontrar este pedido." />
      </ThemedView>
    );
  }

  const currentStep = getOrderStep(order.createdAt, now);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scroll}>
        <View>
          <ThemedText type="small" themeColor="textSecondary">
            Pedido #{order.id}
          </ThemedText>
          <ThemedText type="title">{order.restaurantName}</ThemedText>
        </View>

        <ThemedView type="backgroundElement" style={styles.card}>
          {orderSteps.map((step, index) => {
            const reached = index <= currentStep;
            return (
              <View key={step} style={styles.step}>
                <View
                  style={[
                    styles.stepDot,
                    { backgroundColor: reached ? theme.primary : theme.backgroundSelected },
                  ]}
                />
                <ThemedText
                  type={index === currentStep ? 'smallBold' : 'small'}
                  themeColor={reached ? 'text' : 'textSecondary'}>
                  {step}
                </ThemedText>
              </View>
            );
          })}
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.card}>
          {order.lines.map(({ product, quantity }) => (
            <View key={product.id} style={styles.row}>
              <ThemedText type="small" style={styles.rowLabel}>
                {quantity} × {product.name}
              </ThemedText>
              <ThemedText type="small">{formatPrice(product.price * quantity)}</ThemedText>
            </View>
          ))}
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              Envío
            </ThemedText>
            <ThemedText type="small">{formatPrice(order.deliveryFee)}</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText type="smallBold">Total</ThemedText>
            <ThemedText type="smallBold">{formatPrice(order.total)}</ThemedText>
          </View>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="small">📍 {order.address}</ThemedText>
          <ThemedText type="small">💳 {paymentMethodLabels[order.paymentMethod]}</ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scroll: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  rowLabel: {
    flex: 1,
  },
});
