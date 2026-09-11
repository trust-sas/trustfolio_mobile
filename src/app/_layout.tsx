import { Stack } from 'expo-router';

import '@/global.css';
import { AppProvider } from '@/context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(parent)" />
        <Stack.Screen name="(enseignant)" />
        <Stack.Screen name="(point-focal)" />
        <Stack.Screen name="story/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="school/[id]" />
        <Stack.Screen name="game/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="write" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
        <Stack.Screen name="change-space" options={{ presentation: 'modal' }} />
        <Stack.Screen name="parent-upload" options={{ presentation: 'modal' }} />
        <Stack.Screen name="parent-dashboard" options={{ presentation: 'modal' }} />
      </Stack>
    </AppProvider>
  );
}
