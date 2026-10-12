import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { useDockInset } from '@/components/dock';
import { EmptyState } from '@/components/empty-state';
import { LogoMark } from '@/components/logo';
import { RestaurantCard } from '@/components/restaurant-card';
import { Tag } from '@/components/tag';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BrandFonts, Ink, MaxContentWidth, Spacing } from '@/constants/theme';
import { user } from '@/constants/user';
import { categories, restaurants, type Restaurant } from '@/data/restaurants';
import { useTheme } from '@/hooks/use-theme';

const CATEGORY_COLUMNS = 3;
const categoryRows = Array.from(
  { length: Math.ceil(categories.length / CATEGORY_COLUMNS) },
  (_, row) => categories.slice(row * CATEGORY_COLUMNS, (row + 1) * CATEGORY_COLUMNS),
);

function matchesSearch(restaurant: Restaurant, search: string) {
  const query = search.trim().toLowerCase();
  if (!query) {
    return true;
  }
  return (
    restaurant.name.toLowerCase().includes(query) ||
    restaurant.menu.some((section) =>
      section.data.some((product) => product.name.toLowerCase().includes(query)),
    )
  );
}

export default function HomeScreen() {
  const theme = useTheme();
  const dockInset = useDockInset();
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const results = restaurants.filter(
    (restaurant) =>
      (!categoryId || restaurant.categoryIds.includes(categoryId)) &&
      matchesSearch(restaurant, search),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <FlatList
          data={results}
          keyExtractor={(restaurant) => restaurant.id}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          contentContainerStyle={[styles.list, { paddingBottom: dockInset }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.topRow}>
                <LogoMark height={46} />
                <View style={styles.address}>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.addressText}>
                    Te lo llevamos a
                  </ThemedText>
                  <ThemedText type="smallBold" numberOfLines={1} style={styles.addressText}>
                    📍 {user.address}
                  </ThemedText>
                </View>
              </View>

              <Text style={[styles.headline, { color: theme.text }]}>
                ¿Qué pedimos{'\n'}
                <Text style={{ color: theme.primary }}>hoy?</Text>
              </Text>

              <Block radius={18}>
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Buscá un local o un plato"
                  placeholderTextColor={theme.textSecondary}
                  returnKeyType="search"
                  clearButtonMode="while-editing"
                  style={[styles.search, { color: theme.text }]}
                />
              </Block>

              <View style={styles.categories}>
                {categoryRows.map((row, index) => (
                  <View key={index} style={styles.categoryRow}>
                    {row.map((category) => {
                      const selected = category.id === categoryId;
                      return (
                        <Block
                          key={category.id}
                          color={selected ? theme.primary : category.color}
                          radius={18}
                          depth={3}
                          style={styles.category}
                          contentStyle={styles.categoryFace}
                          accessibilityRole="button"
                          accessibilityLabel={category.name}
                          accessibilityState={{ selected }}
                          onPress={() => setCategoryId(selected ? null : category.id)}>
                          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                          <Text
                            style={[
                              styles.categoryName,
                              { color: selected ? theme.onPrimary : Ink },
                            ]}
                            numberOfLines={1}>
                            {category.name}
                          </Text>
                        </Block>
                      );
                    })}
                  </View>
                ))}
              </View>

              <View style={styles.sectionTitle}>
                <ThemedText type="subtitle">Locales cerca tuyo</ThemedText>
                <Tag label={String(results.length)} color={theme.accent} />
              </View>
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              emoji="🔍"
              title="Nada por acá"
              message="Probá con otra búsqueda o con otro antojo."
            />
          }
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
    padding: Spacing.three,
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  address: {
    flex: 1,
  },
  addressText: {
    textAlign: 'right',
  },
  headline: {
    fontFamily: BrandFonts.title,
    fontSize: 44,
    lineHeight: 46,
  },
  search: {
    height: 52,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
    fontFamily: BrandFonts.body,
  },
  categories: {
    gap: Spacing.two,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  category: {
    flex: 1,
  },
  categoryFace: {
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.two + Spacing.half,
    paddingHorizontal: Spacing.one,
  },
  categoryEmoji: {
    fontSize: 30,
    lineHeight: 38,
  },
  categoryName: {
    fontFamily: BrandFonts.bodyBold,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
});
