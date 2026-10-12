import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { EmptyState } from '@/components/empty-state';
import { BagIcon } from '@/components/logo';
import { DashedLine, ReceiptRow } from '@/components/receipt';
import { Tag } from '@/components/tag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandFonts, MaxContentWidth, Spacing } from '@/constants/theme';
import {
  getOrderStep,
  orderSteps,
  paymentMethodEmojis,
  paymentMethodLabels,
  useOrders,
} from '@/context/orders';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/utils/format';

// One per entry of `orderSteps`
const headlines = [
  '¡Pedido recibido!',
  'Lo están preparando',
  '¡Tu pedido va en camino!',
  '¡Llegó! Buen provecho',
];

const NODE_AREA = 48;
const TRACK_HEIGHT = 4;

export default function OrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
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
  const lastStep = orderSteps.length - 1;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.scroll, { paddingBottom: Spacing.four + insets.bottom }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <Tag label={`Pedido #${order.id}`} color={theme.accent} />
          <Text style={[styles.headline, { color: theme.text }]}>{headlines[currentStep]}</Text>
          <ThemedText themeColor="textSecondary">{order.restaurantName}</ThemedText>
        </View>

        <Block contentStyle={styles.tracker}>
          <View style={styles.track}>
            <View style={[styles.trackLine, { backgroundColor: theme.border }]} />
            <View
              style={[
                styles.trackLine,
                {
                  backgroundColor: theme.primary,
                  width: `${(currentStep / lastStep) * 75}%`,
                },
              ]}
            />
            {orderSteps.map((step, index) => (
              <View key={step} style={styles.step}>
                <View style={styles.nodeArea}>
                  {index === currentStep ? (
                    <View
                      style={[
                        styles.currentNode,
                        { backgroundColor: theme.primary, borderColor: theme.outline },
                      ]}>
                      <BagIcon height={26} />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.node,
                        {
                          borderColor: theme.outline,
                          backgroundColor:
                            index < currentStep ? theme.primary : theme.backgroundElement,
                        },
                      ]}
                    />
                  )}
                </View>
                <ThemedText
                  type={index === currentStep ? 'smallBold' : 'small'}
                  themeColor={index <= currentStep ? 'text' : 'textSecondary'}
                  style={styles.stepLabel}>
                  {step}
                </ThemedText>
              </View>
            ))}
          </View>
        </Block>

        <Block contentStyle={styles.receipt}>
          {order.lines.map(({ product, quantity }) => (
            <ReceiptRow
              key={product.id}
              label={`${quantity} × ${product.name}`}
              value={formatPrice(product.price * quantity)}
            />
          ))}
          <DashedLine />
          <ReceiptRow label="Envío" value={formatPrice(order.deliveryFee)} />
          <ReceiptRow label="Total" value={formatPrice(order.total)} strong />
        </Block>

        <Block contentStyle={styles.receipt}>
          <ThemedText>📍 {order.address}</ThemedText>
          <ThemedText>
            {paymentMethodEmojis[order.paymentMethod]} {paymentMethodLabels[order.paymentMethod]}
          </ThemedText>
        </Block>
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
    gap: Spacing.four,
  },
  heading: {
    gap: Spacing.two,
  },
  headline: {
    fontFamily: BrandFonts.title,
    fontSize: 40,
    lineHeight: 42,
  },
  tracker: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  track: {
    flexDirection: 'row',
  },
  // Runs between the centers of the first and last step: each step is 25% wide
  trackLine: {
    position: 'absolute',
    top: (NODE_AREA - TRACK_HEIGHT) / 2,
    left: '12.5%',
    width: '75%',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  nodeArea: {
    height: NODE_AREA,
    alignItems: 'center',
    justifyContent: 'center',
  },
  node: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  currentNode: {
    width: NODE_AREA,
    height: NODE_AREA,
    borderRadius: NODE_AREA / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  receipt: {
    padding: Spacing.three,
    gap: Spacing.two + Spacing.one,
  },
});
