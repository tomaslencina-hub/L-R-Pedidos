import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { Spacing } from '@/constants/theme';
import { useCart } from '@/context/cart';
import { formatPrice } from '@/utils/format';

/** Shortcut to the cart, only rendered while it has products. */
export function CartBar({ bottomInset = 0 }: { bottomInset?: number }) {
  const cart = useCart();

  if (cart.count === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingBottom: Spacing.three + bottomInset }]}>
      <PrimaryButton
        label={`Ver carrito (${cart.count})`}
        detail={formatPrice(cart.subtotal)}
        onPress={() => router.push('/cart')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
});
