import { Stack, useLocalSearchParams } from 'expo-router';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { CartBar } from '@/components/cart-bar';
import { EmptyState } from '@/components/empty-state';
import { QuantityStepper } from '@/components/quantity-stepper';
import { Tag } from '@/components/tag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandFonts, Colors, Ink, MaxContentWidth, Spacing } from '@/constants/theme';
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
        '¿Empezar una bolsa nueva?',
        'Tu bolsa tiene productos de otro local. Si seguís, se vacía.',
        () => cart.add(restaurant!.id, product),
      );
      return;
    }
    cart.add(restaurant!.id, product);
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: restaurant.color },
          headerTintColor: Ink,
        }}
      />
      <View style={styles.content}>
        <SectionList
          sections={restaurant.menu}
          keyExtractor={(product) => product.id}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View
              style={[
                styles.hero,
                { backgroundColor: restaurant.color, borderBottomColor: theme.outline },
              ]}>
              <Text style={styles.heroEmoji}>{restaurant.emoji}</Text>
              <Text style={styles.heroName}>{restaurant.name}</Text>
              <View style={styles.tags}>
                <Tag label={`★ ${restaurant.rating.toFixed(1)}`} color={Colors.light.accent} />
                <Tag label={`${minTime}-${maxTime} min`} />
                <Tag label={`Envío ${formatPrice(restaurant.deliveryFee)}`} />
              </View>
            </View>
          }
          renderSectionHeader={({ section }) => (
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              {section.title}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <Block style={styles.product} contentStyle={styles.productFace}>
              <View
                style={[
                  styles.productEmojiTile,
                  { backgroundColor: restaurant.color, borderColor: theme.outline },
                ]}>
                <Text style={styles.productEmoji}>{item.emoji}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={[styles.productName, { color: theme.text }]}>{item.name}</Text>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.description}
                </ThemedText>
                <View style={styles.productFooter}>
                  <Text style={[styles.productPrice, { color: theme.primary }]}>
                    {formatPrice(item.price)}
                  </Text>
                  <QuantityStepper
                    quantity={cart.restaurantId === restaurant.id ? cart.quantityOf(item.id) : 0}
                    onAdd={() => addProduct(item)}
                    onRemove={() => cart.remove(item.id)}
                  />
                </View>
              </View>
            </Block>
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
    paddingBottom: Spacing.three,
  },
  hero: {
    gap: Spacing.two,
    padding: Spacing.three,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.four,
    borderBottomWidth: 2,
    overflow: 'hidden',
  },
  heroEmoji: {
    position: 'absolute',
    right: -18,
    bottom: -22,
    fontSize: 132,
    lineHeight: 160,
    transform: [{ rotate: '-12deg' }],
  },
  heroName: {
    maxWidth: '70%',
    fontFamily: BrandFonts.title,
    fontSize: 38,
    lineHeight: 40,
    color: Ink,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one + Spacing.half,
    maxWidth: '70%',
  },
  sectionTitle: {
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
    marginHorizontal: Spacing.three,
  },
  product: {
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.two + Spacing.one,
  },
  productFace: {
    flexDirection: 'row',
    gap: Spacing.three,
    padding: Spacing.three - Spacing.one,
  },
  productEmojiTile: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 34,
    lineHeight: 42,
  },
  productInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  productName: {
    fontFamily: BrandFonts.title,
    fontSize: 18,
    lineHeight: 22,
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  productPrice: {
    fontFamily: BrandFonts.title,
    fontSize: 18,
    lineHeight: 24,
  },
});
