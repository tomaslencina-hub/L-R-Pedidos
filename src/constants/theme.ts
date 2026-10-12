/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/** Ink of the brand kit. Use it directly for text on the fixed pastel and yellow surfaces. */
export const Ink = '#1D1D1F';

export const Colors = {
  light: {
    text: Ink,
    background: '#FFF3E0',
    backgroundElement: '#ffffff',
    backgroundSelected: '#FFE2B8',
    textSecondary: '#55555B',
    border: '#E8DCC8',
    primary: '#D95F00',
    onPrimary: '#ffffff',
    accent: '#FFD166',
    /** Thick borders and hard shadows of blocks */
    outline: Ink,
    dock: Ink,
    onDock: '#FFF3E0',
  },
  dark: {
    text: '#ffffff',
    background: Ink,
    backgroundElement: '#2A2A2D',
    backgroundSelected: '#3A3A3E',
    textSecondary: '#C9C9CE',
    border: '#3A3A3E',
    primary: '#F07A1A',
    onPrimary: Ink,
    accent: '#FFD166',
    outline: '#FFF3E0',
    dock: '#2A2A2D',
    onDock: '#FFF3E0',
  },
} as const;

/** Loaded in the root layout. Each weight is its own family, so don't combine these with `fontWeight`. */
export const BrandFonts = {
  title: 'Fredoka_700Bold',
  titleMedium: 'Fredoka_500Medium',
  body: 'Nunito_400Regular',
  bodyBold: 'Nunito_700Bold',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Height of the floating dock that replaces the tab bar */
export const DockHeight = 64;
export const MaxContentWidth = 520;
