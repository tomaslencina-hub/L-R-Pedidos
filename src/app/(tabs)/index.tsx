import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartBar } from '@/components/cart-bar';
import { EmptyState } from '@/components/empty-state';
import { RestaurantCard } from '@/components/restaurant-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { user } from '@/constants/user';
import { categories, restaurants, type Restaurant } from '@/data/restaurants';
import { useTheme } from '@/hooks/use-theme';

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
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View style={styles.header}>
              <View>
                <ThemedText type="small" themeColor="textSecondary">
                  Entregar en
                </ThemedText>
                <ThemedText type="smallBold" style={styles.address}>
                  📍 {user.address}
                </ThemedText>
              </View>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar locales y platos"
                placeholderTextColor={theme.textSecondary}
                returnKeyType="search"
                clearButtonMode="while-editing"
                style={[
                  styles.search,
                  { backgroundColor: theme.backgroundElement, color: theme.text },
                ]}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categories}>
                {categories.map((category) => {
                  const selected = category.id === categoryId;
                  return (
                    <Pressable
                      key={category.id}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => setCategoryId(selected ? null : category.id)}>
                      <ThemedView
                        type="backgroundElement"
                        style={[
                          styles.category,
                          selected && { backgroundColor: theme.primary },
                        ]}>
                        <ThemedText style={styles.categoryEmoji}>{category.emoji}</ThemedText>
                        <ThemedText type="small" themeColor={selected ? 'onPrimary' : 'text'}>
                          {category.name}
                        </ThemedText>
                      </ThemedView>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <ThemedText type="subtitle">Locales</ThemedText>
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              emoji="🔍"
              title="Sin resultados"
              message="Probá con otra búsqueda o categoría."
            />
          }
        />
        <CartBar />
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
  address: {
    fontSize: 16,
  },
  search: {
    height: 48,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  categories: {
    gap: Spacing.two,
  },
  category: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  categoryEmoji: {
    fontSize: 28,
    lineHeight: 34,
  },
});
