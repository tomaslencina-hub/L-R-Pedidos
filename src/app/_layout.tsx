import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { CartProvider } from '@/context/cart';
import { OrdersProvider } from '@/context/orders';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === 'dark' ? 'dark' : 'light';
  const baseTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          primary: Colors[scheme].primary,
          background: Colors[scheme].background,
        },
      }}>
      <OrdersProvider>
        <CartProvider>
          <Stack screenOptions={{ headerBackTitle: 'Volver' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="restaurant/[id]" options={{ title: '' }} />
            <Stack.Screen name="cart" options={{ title: 'Tu pedido' }} />
            <Stack.Screen name="order/[id]" options={{ title: 'Seguimiento' }} />
          </Stack>
        </CartProvider>
      </OrdersProvider>
    </ThemeProvider>
  );
}
