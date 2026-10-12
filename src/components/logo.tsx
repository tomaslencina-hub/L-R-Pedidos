import { StyleSheet, View } from 'react-native';
import Svg, { Path, Rect, Text as SvgText } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { BrandFonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Brand mark: the smiling order bag. Drawn in the brand kit's 240x280 box. */
export function LogoMark({ height = 48 }: { height?: number }) {
  const theme = useTheme();

  return (
    <Svg
      width={(height * 240) / 280}
      height={height}
      viewBox="0 0 240 280"
      fill="none"
      accessibilityLabel="L&R pedidos">
      <Path
        d="M84 74 C84 18 156 18 156 74"
        stroke={theme.text}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <Rect x={30} y={60} width={180} height={204} rx={24} fill={theme.primary} />
      <SvgText
        x={120}
        y={176}
        textAnchor="middle"
        fontFamily={BrandFonts.title}
        fontSize={64}
        fill="#FFFFFF">
        L&amp;R
      </SvgText>
      <Path d="M86 206 Q120 236 154 206" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" />
    </Svg>
  );
}

/** Horizontal lockup: mark plus the "L&R pedidos" wordmark. */
export function Logo() {
  return (
    <View style={styles.row}>
      <LogoMark height={44} />
      <View style={styles.wordmark}>
        <ThemedText style={styles.name}>L&amp;R</ThemedText>
        <ThemedText themeColor="primary" style={styles.descriptor}>
          pedidos
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one + Spacing.half,
  },
  name: {
    fontFamily: BrandFonts.title,
    fontSize: 28,
    lineHeight: 32,
  },
  descriptor: {
    fontFamily: BrandFonts.titleMedium,
    fontSize: 18,
    lineHeight: 32,
  },
});
