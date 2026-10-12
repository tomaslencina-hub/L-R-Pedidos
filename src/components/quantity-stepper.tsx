import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BrandFonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuantityStepperProps = {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export function QuantityStepper({ quantity, onAdd, onRemove }: QuantityStepperProps) {
  const theme = useTheme();

  if (quantity === 0) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Agregar"
        onPress={onAdd}
        hitSlop={Spacing.two}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.primary },
          pressed && styles.pressed,
        ]}>
        <ThemedText themeColor="onPrimary" style={styles.symbol}>
          +
        </ThemedText>
      </Pressable>
    );
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
          { backgroundColor: theme.backgroundSelected },
          pressed && styles.pressed,
        ]}>
        <ThemedText style={styles.symbol}>−</ThemedText>
      </Pressable>
      <ThemedText type="smallBold" style={styles.quantity}>
        {quantity}
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Agregar uno"
        onPress={onAdd}
        hitSlop={Spacing.two}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.primary },
          pressed && styles.pressed,
        ]}>
        <ThemedText themeColor="onPrimary" style={styles.symbol}>
          +
        </ThemedText>
      </Pressable>
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
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: BrandFonts.bodyBold,
  },
  quantity: {
    minWidth: 20,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
