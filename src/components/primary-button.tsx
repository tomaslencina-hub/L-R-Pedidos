import { StyleSheet, Text } from 'react-native';

import { Block } from '@/components/block';
import { BrandFonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PrimaryButtonProps = {
  label: string;
  /** Shown at the right edge, e.g. the total to pay */
  detail?: string;
  onPress: () => void;
};

export function PrimaryButton({ label, detail, onPress }: PrimaryButtonProps) {
  const theme = useTheme();

  return (
    <Block
      color={theme.primary}
      radius={18}
      accessibilityRole="button"
      onPress={onPress}
      contentStyle={[styles.content, !detail && styles.centered]}>
      <Text style={[styles.text, { color: theme.onPrimary }]}>{label}</Text>
      {detail && <Text style={[styles.text, { color: theme.onPrimary }]}>{detail}</Text>}
    </Block>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three - Spacing.half,
    paddingHorizontal: Spacing.four,
  },
  centered: {
    justifyContent: 'center',
  },
  text: {
    fontFamily: BrandFonts.title,
    fontSize: 18,
    lineHeight: 24,
  },
});
