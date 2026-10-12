import { Tabs } from 'expo-router/js-tabs';

import { Dock } from '@/components/dock';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <Dock {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="orders" options={{ title: 'Pedidos' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
