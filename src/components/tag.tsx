import { StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Ink } from '@/constants/theme';

/** Small outlined label. Its fills are always light, so the text stays ink in both themes. */
export function Tag({ label, color = '#ffffff' }: { label: string; color?: string }) {
  return (
    <View style={[styles.tag, { backgroundColor: color }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: Ink,
  },
  label: {
    fontFamily: BrandFonts.bodyBold,
    fontSize: 13,
    lineHeight: 18,
    color: Ink,
  },
});
