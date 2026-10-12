import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/empty-state';
import { PrimaryButton } from '@/components/primary-button';
import { QuantityStepper } from '@/components/quantity-stepper';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { user } from '@/constants/user';
import { useCart } from '@/context/cart';
import { paymentMethodLabels, useOrders, type PaymentMethod } from '@/context/orders';
import { getRestaurant } from '@/data/restaurants';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/utils/format';

const paymentMethods = Object.keys(paymentMethodLabels) as PaymentMethod[];

export default function CartScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const cart = useCart();
  const { placeOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const restaurant = cart.restaurantId ? getRestaurant(cart.restaurantId) : undefined;

  if (!restaurant) {
    return (
      <ThemedView style={styles.container}>
        <EmptyState
          emoji="🛒"
          title="Tu carrito está vacío"
          message="Agregá productos de un local para hacer tu pedido.">
          <View style={styles.emptyAction}>
            <PrimaryButton label="Ver locales" onPress={() => router.dismissTo('/')} />
          </View>
        </EmptyState>
      </ThemedView>
    );
  }

  const total = cart.subtotal + restaurant.deliveryFee;

  function confirmOrder() {
    const order = placeOrder({
      restaurantId: restaurant!.id,
      restaurantName: restaurant!.name,
      lines: cart.lines,
      subtotal: cart.subtotal,
      deliveryFee: restaurant!.deliveryFee,
      total,
      address: user.address,
      paymentMethod,
    });
    router.replace({ pathname: '/order/[id]', params: { id: order.id } });
    cart.clear();
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <ThemedText type="subtitle">{restaurant.name}</ThemedText>

          <View>
            {cart.lines.map(({ product, quantity }) => (
              <View key={product.id} style={[styles.line, { borderBottomColor: theme.border }]}>
                <View style={styles.lineInfo}>
                  <ThemedText type="smallBold">{product.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {formatPrice(product.price * quantity)}
                  </ThemedText>
                </View>
                <QuantityStepper
                  quantity={quantity}
                  onAdd={() => cart.add(restaurant.id, product)}
                  onRemove={() => cart.remove(product.id)}
                />
              </View>
            ))}
          </View>

          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">Entregar en</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              📍 {user.address}
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">Medio de pago</ThemedText>
            <View style={styles.paymentMethods}>
              {paymentMethods.map((method) => {
                const selected = method === paymentMethod;
                return (
                  <Pressable
                    key={method}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => setPaymentMethod(method)}
                    style={[
                      styles.paymentMethod,
                      { borderColor: selected ? theme.primary : theme.border },
                    ]}>
                    <ThemedText type="small" themeColor={selected ? 'primary' : 'text'}>
                      {paymentMethodLabels[method]}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.card}>
            <SummaryRow label="Subtotal" value={formatPrice(cart.subtotal)} />
            <SummaryRow label="Envío" value={formatPrice(restaurant.deliveryFee)} />
            <SummaryRow label="Total" value={formatPrice(total)} bold />
          </ThemedView>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Spacing.three + insets.bottom }]}>
          <PrimaryButton label="Hacer pedido" detail={formatPrice(total)} onPress={confirmOrder} />
        </View>
      </View>
    </ThemedView>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  const type = bold ? 'smallBold' : 'small';

  return (
    <View style={styles.summaryRow}>
      <ThemedText type={type} themeColor={bold ? 'text' : 'textSecondary'}>
        {label}
      </ThemedText>
      <ThemedText type={type}>{value}</ThemedText>
    </View>
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
  emptyAction: {
    alignSelf: 'stretch',
    marginTop: Spacing.three,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lineInfo: {
    flex: 1,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  paymentMethod: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1.5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
});
