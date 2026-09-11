import { View, Text } from 'react-native';

export function PhasePlaceholder({ title, phase }: { title: string; phase: string }) {
  return (
    <View className="flex-1 bg-white items-center justify-center p-8">
      <Text style={{ fontSize: 40 }} className="mb-4">
        🚧
      </Text>
      <Text className="text-lg font-bold text-center mb-2">{title}</Text>
      <Text className="text-sm text-gray-500 text-center">
        Cet écran sera construit en {phase}, voir SYNC_PLAN.md.
      </Text>
    </View>
  );
}
