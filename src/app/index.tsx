import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

import { SplashScreen } from '@/components/screens/SplashScreen';
import { ACTIVE_ROLE_KEY, Role, roleHomeHref } from '@/constants/roles';
import { ONBOARDED_KEY } from '@/data/userRepository';

export default function SplashRoute() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const hasOnboarded = await AsyncStorage.getItem(ONBOARDED_KEY);
      const storedRole = (await AsyncStorage.getItem(ACTIVE_ROLE_KEY)) as Role | null;
      router.replace(hasOnboarded ? (roleHomeHref(storedRole ?? 'enfant') as never) : '/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen />;
}
