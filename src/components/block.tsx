import { type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type BlockProps = Pick<
  PressableProps,
  'onPress' | 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityState'
> & {
  /** Fill of the face. Defaults to the theme's element surface. */
  color?: string;
  radius?: number;
  /** Offset of the hard shadow; the face sinks this far while pressed. */
  depth?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * The app's basic surface: a face with a thick outline sitting on a hard, offset shadow.
 * The shadow is a plain view rather than a shadow style so it looks the same on every platform.
 */
export function Block({
  color,
  radius = 20,
  depth = 4,
  style,
  contentStyle,
  children,
  onPress,
  ...accessibility
}: BlockProps) {
  const theme = useTheme();

  const renderLayers = (pressed: boolean) => (
    <>
      <View
        style={[
          styles.shadow,
          { top: depth, left: depth, borderRadius: radius, backgroundColor: theme.outline },
        ]}
      />
      <View
        style={[
          styles.face,
          {
            marginRight: depth,
            marginBottom: depth,
            borderRadius: radius,
            borderColor: theme.outline,
            backgroundColor: color ?? theme.backgroundElement,
          },
          pressed && { transform: [{ translateX: depth }, { translateY: depth }] },
          contentStyle,
        ]}>
        {children}
      </View>
    </>
  );

  if (!onPress) {
    return <View style={style}>{renderLayers(false)}</View>;
  }

  return (
    <Pressable onPress={onPress} style={style} {...accessibility}>
      {({ pressed }) => renderLayers(pressed)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  face: {
    flexGrow: 1,
    borderWidth: 2,
    overflow: 'hidden',
  },
});
