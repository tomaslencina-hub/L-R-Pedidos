import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PrimaryButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  /** Shown at the right edge, e.g. the total to pay */
  detail?: string;
};

export function PrimaryButton({ label, detail, ...rest }: PrimaryButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.primary },
        !detail && styles.centered,
        pressed && styles.pressed,
      ]}
      {...rest}>
      <ThemedText type="smallBold" themeColor="onPrimary" style={styles.text}>
        {label}
      </ThemedText>
      {detail && (
        <ThemedText type="smallBold" themeColor="onPrimary" style={styles.text}>
          {detail}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
  },
  centered: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});
