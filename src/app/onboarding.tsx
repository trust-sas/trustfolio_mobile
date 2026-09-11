import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { Onboarding } from '@/components/screens/Onboarding';
import { ONBOARDED_KEY } from '@/data/userRepository';

export default function OnboardingRoute() {
  const handleComplete = async () => {
    await AsyncStorage.setItem(ONBOARDED_KEY, '1').catch(() => {});
    router.replace('/(tabs)/home');
  };

  return <Onboarding onComplete={handleComplete} />;
}
