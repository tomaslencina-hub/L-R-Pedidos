import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Restaurant } from '@/data/restaurants';
import { formatPrice } from '@/utils/format';

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [minTime, maxTime] = restaurant.deliveryTime;

  return (
    <Link href={{ pathname: '/restaurant/[id]', params: { id: restaurant.id } }} asChild>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={[styles.cover, { backgroundColor: restaurant.color }]}>
            <ThemedText style={styles.emoji}>{restaurant.emoji}</ThemedText>
          </View>
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <ThemedText type="smallBold" style={styles.name} numberOfLines={1}>
                {restaurant.name}
              </ThemedText>
              <ThemedText type="smallBold">★ {restaurant.rating.toFixed(1)}</ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              {minTime}-{maxTime} min · Envío {formatPrice(restaurant.deliveryFee)}
            </ThemedText>
          </View>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  cover: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
    lineHeight: 68,
  },
  info: {
    padding: Spacing.three,
    gap: Spacing.half,
  },
  titleRow: {
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
