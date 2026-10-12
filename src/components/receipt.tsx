import { StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BrandFonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Tear line of a receipt. Built from views because dashed borders render unevenly across platforms. */
export function DashedLine() {
  const theme = useTheme();

  return (
    <View style={styles.dashes}>
      {Array.from({ length: 60 }, (_, index) => (
        <View key={index} style={[styles.dash, { backgroundColor: theme.outline }]} />
      ))}
    </View>
  );
}

type ReceiptRowProps = {
  label: string;
  value: string;
  /** The total: bigger and in the title font */
  strong?: boolean;
};

export function ReceiptRow({ label, value, strong }: ReceiptRowProps) {
  const theme = useTheme();

  if (strong) {
    return (
      <View style={styles.row}>
        <Text style={[styles.total, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.total, { color: theme.text }]}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  dashes: {
    flexDirection: 'row',
    gap: 6,
    height: 2,
    overflow: 'hidden',
  },
  dash: {
    width: 8,
    height: 2,
    borderRadius: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  label: {
    flex: 1,
  },
  total: {
    fontFamily: BrandFonts.title,
    fontSize: 24,
    lineHeight: 30,
  },
});
