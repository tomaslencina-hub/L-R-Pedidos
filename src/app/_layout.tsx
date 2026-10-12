// Per-weight imports: the package index would bundle every weight of each family.
import { Fredoka_500Medium } from '@expo-google-fonts/fredoka/500Medium';
import { Fredoka_700Bold } from '@expo-google-fonts/fredoka/700Bold';
import { Nunito_400Regular } from '@expo-google-fonts/nunito/400Regular';
import { Nunito_700Bold } from '@expo-google-fonts/nunito/700Bold';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { BrandFonts, Colors } from '@/constants/theme';
import { CartProvider } from '@/context/cart';
import { OrdersProvider } from '@/context/orders';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme === 'dark' ? 'dark' : 'light';
  const baseTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  const [fontsLoaded, fontsError] = useFonts({
    Fredoka_500Medium,
    Fredoka_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });
  // If the fonts fail to load the app still opens, with the system font.
  const ready = fontsLoaded || fontsError != null;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <ThemeProvider
      value={{
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          primary: Colors[scheme].primary,
          background: Colors[scheme].background,
          card: Colors[scheme].background,
          text: Colors[scheme].text,
          border: Colors[scheme].border,
        },
      }}>
      <OrdersProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerBackTitle: 'Volver',
              headerTitleStyle: { fontFamily: BrandFonts.title },
            }}>
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
