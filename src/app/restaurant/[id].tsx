import { Stack, useLocalSearchParams } from 'expo-router';
import { SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CartBar } from '@/components/cart-bar';
import { EmptyState } from '@/components/empty-state';
import { QuantityStepper } from '@/components/quantity-stepper';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart';
import { getRestaurant, type Product } from '@/data/restaurants';
import { useTheme } from '@/hooks/use-theme';
import { confirm } from '@/utils/confirm';
import { formatPrice } from '@/utils/format';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const cart = useCart();
  const restaurant = getRestaurant(id);

  if (!restaurant) {
    return (
      <ThemedView style={styles.container}>
        <EmptyState emoji="🤷" title="Local no encontrado" message="Puede que ya no esté disponible." />
      </ThemedView>
    );
  }

  const [minTime, maxTime] = restaurant.deliveryTime;

  function addProduct(product: Product) {
    if (cart.restaurantId && cart.restaurantId !== restaurant!.id) {
      confirm(
        '¿Empezar un pedido nuevo?',
        'Tu carrito tiene productos de otro local. Si seguís, se vacía.',
        () => cart.add(restaurant!.id, product),
      );
      return;
    }
    cart.add(restaurant!.id, product);
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: restaurant.name }} />
      <View style={styles.content}>
        <SectionList
          sections={restaurant.menu}
          keyExtractor={(product) => product.id}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={[styles.cover, { backgroundColor: restaurant.color }]}>
                <ThemedText style={styles.coverEmoji}>{restaurant.emoji}</ThemedText>
              </View>
              <ThemedText type="title">{restaurant.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                ★ {restaurant.rating.toFixed(1)} · {minTime}-{maxTime} min · Envío{' '}
                {formatPrice(restaurant.deliveryFee)}
              </ThemedText>
            </View>
          }
          renderSectionHeader={({ section }) => (
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              {section.title}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <View style={[styles.product, { borderBottomColor: theme.border }]}>
              <ThemedText style={styles.productEmoji}>{item.emoji}</ThemedText>
              <View style={styles.productInfo}>
                <ThemedText type="smallBold" style={styles.productName}>
                  {item.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.description}
                </ThemedText>
                <ThemedText type="smallBold">{formatPrice(item.price)}</ThemedText>
              </View>
              <QuantityStepper
                quantity={cart.restaurantId === restaurant.id ? cart.quantityOf(item.id) : 0}
                onAdd={() => addProduct(item)}
                onRemove={() => cart.remove(item.id)}
              />
            </View>
          )}
        />
        <CartBar bottomInset={insets.bottom} />
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
  list: {
    padding: Spacing.three,
  },
  header: {
    gap: Spacing.one,
  },
  cover: {
    height: 160,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  coverEmoji: {
    fontSize: 72,
    lineHeight: 88,
  },
  sectionTitle: {
    marginTop: Spacing.four,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  productEmoji: {
    fontSize: 36,
    lineHeight: 44,
  },
  productInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  productName: {
    fontSize: 16,
  },
});
