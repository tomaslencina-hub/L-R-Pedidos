import Svg, { Circle, Path, Rect, Text as SvgText } from 'react-native-svg';

import { BrandFonts, Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Brand mark: the order bag with the L&R letters. Drawn in the brand kit's 240x280 box. */
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

/**
 * The bag of the app icon, meant to sit on the brand orange.
 * It only smiles when `happy`, which the app uses to show the bag has something in it.
 */
export function BagIcon({ height = 32, happy = true }: { height?: number; happy?: boolean }) {
  const face = Colors.light.primary;

  return (
    <Svg width={(height * 240) / 280} height={height} viewBox="0 0 240 280" fill="none">
      <Path
        d="M84 74 C84 18 156 18 156 74"
        stroke="#FFFFFF"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <Rect x={30} y={60} width={180} height={204} rx={26} fill="#FFFFFF" />
      <Path
        d="M30 98 V86 A26 26 0 0 1 56 60 H184 A26 26 0 0 1 210 86 V98 Z"
        fill={Colors.light.accent}
      />
      <Circle cx={88} cy={150} r={14} fill={face} />
      <Circle cx={152} cy={150} r={14} fill={face} />
      {happy ? (
        <Path d="M78 190 Q120 236 162 190" stroke={face} strokeWidth={16} strokeLinecap="round" />
      ) : (
        <Path d="M92 204 H148" stroke={face} strokeWidth={16} strokeLinecap="round" />
      )}
    </Svg>
  );
}
