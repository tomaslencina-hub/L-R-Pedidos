import { type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Block } from '@/components/block';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EmptyStateProps = PropsWithChildren<{
  emoji: string;
  title: string;
  message: string;
}>;

export function EmptyState({ emoji, title, message, children }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Block color={theme.accent} radius={28} style={styles.sticker} contentStyle={styles.face}>
        <Text style={styles.emoji}>{emoji}</Text>
      </Block>
      <ThemedText type="subtitle" style={styles.centered}>
        {title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.centered}>
        {message}
      </ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.five,
    gap: Spacing.two,
  },
  sticker: {
    marginBottom: Spacing.three,
    transform: [{ rotate: '-6deg' }],
  },
  face: {
    width: 104,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 52,
    lineHeight: 64,
  },
  centered: {
    textAlign: 'center',
  },
});
