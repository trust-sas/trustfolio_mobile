import { Tabs } from 'expo-router';
import { BookOpen, GraduationCap, LayoutDashboard, Library, LucideIcon } from 'lucide-react-native';
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

export default function EnseignantTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Brand.blue,
        tabBarInactiveTintColor: Brand.grayInactive,
        tabBarStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Tabs.Screen name="index" options={makeTabOptions('Tableau', LayoutDashboard)} />
      <Tabs.Screen name="classes" options={makeTabOptions('Classes', GraduationCap)} />
      <Tabs.Screen name="contes" options={makeTabOptions('Contes', BookOpen)} />
      <Tabs.Screen name="anthologies" options={makeTabOptions('Anthologies', Library)} />
    </Tabs>
  );
}
