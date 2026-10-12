import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Ink, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuantityStepperProps = {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export function QuantityStepper({ quantity, onAdd, onRemove }: QuantityStepperProps) {
  const theme = useTheme();

  const addButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={quantity === 0 ? 'Agregar' : 'Agregar uno'}
      onPress={onAdd}
      hitSlop={Spacing.two}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.accent, borderColor: theme.outline },
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.symbol, { color: Ink }]}>+</Text>
    </Pressable>
  );

  if (quantity === 0) {
    return addButton;
  }

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Quitar uno"
        onPress={onRemove}
        hitSlop={Spacing.two}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.backgroundElement, borderColor: theme.outline },
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.symbol, { color: theme.text }]}>−</Text>
      </Pressable>
      <Text style={[styles.quantity, { color: theme.text }]}>{quantity}</Text>
      {addButton}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontFamily: BrandFonts.title,
    fontSize: 22,
    lineHeight: 26,
  },
  quantity: {
    minWidth: 18,
    textAlign: 'center',
    fontFamily: BrandFonts.title,
    fontSize: 18,
    lineHeight: 24,
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
});
