import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { EmptyState } from '@/components/empty-state';
import { PrimaryButton } from '@/components/primary-button';
import { QuantityStepper } from '@/components/quantity-stepper';
import { DashedLine, ReceiptRow } from '@/components/receipt';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandFonts, Ink, MaxContentWidth, Spacing } from '@/constants/theme';
import { user } from '@/constants/user';
import { useCart } from '@/context/cart';
import {
  paymentMethodEmojis,
  paymentMethodLabels,
  useOrders,
  type PaymentMethod,
} from '@/context/orders';
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
          emoji="🛍️"
          title="Tu bolsa está vacía"
          message="Sumá algo rico de un local y volvé por acá.">
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
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Block contentStyle={styles.receipt}>
            <View style={styles.receiptHeader}>
              <View
                style={[
                  styles.restaurantTile,
                  { backgroundColor: restaurant.color, borderColor: theme.outline },
                ]}>
                <Text style={styles.restaurantEmoji}>{restaurant.emoji}</Text>
              </View>
              <View style={styles.flex}>
                <ThemedText type="small" themeColor="textSecondary">
                  Tu pedido de
                </ThemedText>
                <ThemedText type="subtitle">{restaurant.name}</ThemedText>
              </View>
            </View>

            <DashedLine />

            {cart.lines.map(({ product, quantity }) => (
              <View key={product.id} style={styles.line}>
                <View style={styles.flex}>
                  <ThemedText type="smallBold" style={styles.lineName}>
                    {product.name}
                  </ThemedText>
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

            <DashedLine />

            <ReceiptRow label="Subtotal" value={formatPrice(cart.subtotal)} />
            <ReceiptRow label="Envío" value={formatPrice(restaurant.deliveryFee)} />
            <ReceiptRow label="Total" value={formatPrice(total)} strong />
          </Block>

          <View style={styles.section}>
            <ThemedText type="subtitle">¿A dónde va?</ThemedText>
            <Block contentStyle={styles.address}>
              <ThemedText>📍 {user.address}</ThemedText>
            </Block>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle">¿Cómo pagás?</ThemedText>
            <View style={styles.paymentMethods}>
              {paymentMethods.map((method) => {
                const selected = method === paymentMethod;
                return (
                  <Block
                    key={method}
                    color={selected ? theme.accent : undefined}
                    depth={selected ? 4 : 2}
                    style={styles.flex}
                    contentStyle={styles.paymentMethod}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => setPaymentMethod(method)}>
                    <Text style={styles.paymentEmoji}>{paymentMethodEmojis[method]}</Text>
                    <Text style={[styles.paymentLabel, { color: selected ? Ink : theme.text }]}>
                      {paymentMethodLabels[method]}
                    </Text>
                  </Block>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Spacing.three + insets.bottom }]}>
          <PrimaryButton label="Hacer pedido" detail={formatPrice(total)} onPress={confirmOrder} />
        </View>
      </View>
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
  flex: {
    flex: 1,
  },
  scroll: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  emptyAction: {
    alignSelf: 'stretch',
    marginTop: Spacing.three,
  },
  receipt: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  restaurantTile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantEmoji: {
    fontSize: 30,
    lineHeight: 38,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  lineName: {
    fontSize: 16,
  },
  section: {
    gap: Spacing.two,
  },
  address: {
    padding: Spacing.three,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  paymentMethod: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  paymentEmoji: {
    fontSize: 28,
    lineHeight: 36,
  },
  paymentLabel: {
    fontFamily: BrandFonts.bodyBold,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
});
