import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

import { SplashScreen } from '@/components/screens/SplashScreen';
import { ONBOARDED_KEY } from '@/data/userRepository';

export default function SplashRoute() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const hasOnboarded = await AsyncStorage.getItem(ONBOARDED_KEY);
      router.replace(hasOnboarded ? '/(tabs)/home' : '/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return <SplashScreen />;
}
