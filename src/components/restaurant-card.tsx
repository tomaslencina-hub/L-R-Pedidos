import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Block } from '@/components/block';
import { Tag } from '@/components/tag';
import { BrandFonts, Colors, Ink, Spacing } from '@/constants/theme';
import type { Restaurant } from '@/data/restaurants';
import { formatPrice } from '@/utils/format';

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [minTime, maxTime] = restaurant.deliveryTime;

  return (
    <Block
      color={restaurant.color}
      radius={24}
      accessibilityRole="button"
      accessibilityLabel={restaurant.name}
      onPress={() => router.push({ pathname: '/restaurant/[id]', params: { id: restaurant.id } })}
      contentStyle={styles.card}>
      <Text style={styles.emoji}>{restaurant.emoji}</Text>
      <Text style={styles.name} numberOfLines={2}>
        {restaurant.name}
      </Text>
      <View style={styles.tags}>
        <Tag label={`★ ${restaurant.rating.toFixed(1)}`} color={Colors.light.accent} />
        <Tag label={`${minTime}-${maxTime} min`} />
        <Tag label={`Envío ${formatPrice(restaurant.deliveryFee)}`} />
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 136,
    justifyContent: 'space-between',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  // Oversized and half out of the card, like a sticker
  emoji: {
    position: 'absolute',
    right: -10,
    top: 4,
    fontSize: 92,
    lineHeight: 112,
    transform: [{ rotate: '-12deg' }],
  },
  name: {
    maxWidth: '62%',
    fontFamily: BrandFonts.title,
    fontSize: 24,
    lineHeight: 28,
    color: Ink,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one + Spacing.half,
  },
});
