import { router } from 'expo-router';
import { type BottomTabBarProps } from 'expo-router/js-tabs';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block } from '@/components/block';
import { BagIcon } from '@/components/logo';
import { BrandFonts, DockHeight, Ink, MaxContentWidth, Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart';
import { useTheme } from '@/hooks/use-theme';

const tabs: Record<string, { label: string; icon: SymbolViewProps['name'] }> = {
  index: { label: 'Inicio', icon: { ios: 'house.fill', android: 'home', web: 'home' } },
  orders: {
    label: 'Pedidos',
    icon: { ios: 'list.bullet.rectangle.fill', android: 'receipt_long', web: 'receipt_long' },
  },
  profile: { label: 'Perfil', icon: { ios: 'person.fill', android: 'person', web: 'person' } },
};

const BAG_DEPTH = 4;

/** Bottom space a tab screen must leave free so its content is not covered by the dock. */
export function useDockInset() {
  const insets = useSafeAreaInsets();
  return insets.bottom + DockHeight + Spacing.three * 2;
}

/** Floating replacement for the tab bar: a pill with the tabs and the bag (cart) next to it. */
export function Dock({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const cart = useCart();

  return (
    <View style={[styles.container, { bottom: insets.bottom + Spacing.three }]}>
      <View style={styles.row}>
        <View
          style={[styles.pill, { backgroundColor: theme.dock, borderColor: theme.outline }]}
          accessibilityRole="tablist">
          {state.routes.map((route, index) => {
            const tab = tabs[route.name];
            if (!tab) {
              return null;
            }
            const focused = state.index === index;
            const color = focused ? theme.onPrimary : theme.onDock;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: focused }}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }}
                style={[
                  styles.tab,
                  focused && [styles.tabFocused, { backgroundColor: theme.primary }],
                ]}>
                <SymbolView name={tab.icon} tintColor={color} size={24} />
                {focused && <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>}
              </Pressable>
            );
          })}
        </View>

        <View>
          <Block
            color={theme.primary}
            radius={DockHeight / 2}
            depth={BAG_DEPTH}
            accessibilityRole="button"
            accessibilityLabel={`Tu bolsa, ${cart.count} productos`}
            onPress={() => router.push('/cart')}
            contentStyle={styles.bag}>
            <BagIcon height={34} happy={cart.count > 0} />
          </Block>
          {cart.count > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.accent }]}>
              <Text style={styles.badgeLabel}>{cart.count}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + Spacing.one,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    pointerEvents: 'box-none',
  },
  pill: {
    flex: 1,
    height: DockHeight - BAG_DEPTH,
    marginBottom: BAG_DEPTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.one + Spacing.half,
    borderRadius: DockHeight / 2,
    borderWidth: 2,
  },
  tab: {
    height: '100%',
    minWidth: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: DockHeight / 2,
  },
  tabFocused: {
    paddingHorizontal: Spacing.three,
  },
  tabLabel: {
    fontFamily: BrandFonts.title,
    fontSize: 16,
  },
  bag: {
    width: DockHeight - BAG_DEPTH,
    height: DockHeight - BAG_DEPTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -2,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: BrandFonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    color: Ink,
  },
});
