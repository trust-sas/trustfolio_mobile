import { Tabs } from 'expo-router';
import { BookOpen, Gamepad2, Home as HomeIcon, LucideIcon, Trophy, User } from 'lucide-react-native';
import { Text } from 'react-native';

import { Brand } from '@/constants/theme';

function makeTabOptions(title: string, Icon: LucideIcon) {
  return {
    title,
    tabBarIcon: (props: any) => (
      <Icon size={20} color={props.color} strokeWidth={2.5} fill={props.focused ? Brand.blueLightFill : 'none'} />
    ),
    tabBarLabel: (props: any) => (
      <Text style={{ color: props.color, fontSize: 12, fontWeight: props.focused ? ('600' as const) : ('400' as const) }}>
        {title}
      </Text>
    ),
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Brand.blue,
        tabBarInactiveTintColor: Brand.grayInactive,
        tabBarStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Tabs.Screen name="home" options={makeTabOptions('Home', HomeIcon)} />
      <Tabs.Screen name="stories" options={makeTabOptions('Stories', BookOpen)} />
      <Tabs.Screen name="games" options={makeTabOptions('Games', Gamepad2)} />
      <Tabs.Screen name="challenges" options={makeTabOptions('Challenges', Trophy)} />
      <Tabs.Screen name="profile" options={makeTabOptions('Profile', User)} />
    </Tabs>
  );
}
