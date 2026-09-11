import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AddChildModal } from '@/components/screens/parent/AddChildModal';
import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export function ParentFamily() {
  const { familyChildren: children } = useApp();
  const [showAddChild, setShowAddChild] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Mes enfants</Text>
        <TouchableOpacity onPress={() => setShowAddChild(true)}>
          <Text style={{ color: Brand.blue }} className="font-semibold">
            + Ajouter
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {children.map((child) => (
          <View key={child.id} className="border border-gray-200 rounded-2xl p-4">
            <View className="flex-row items-center gap-3 mb-3">
              <Text style={{ fontSize: 28 }}>{child.avatarEmoji}</Text>
              <View>
                <Text className="font-semibold text-base">{child.firstName}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  {child.age} ans · {child.grade} · {child.school}
                </Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="flex-1 items-center">
                <Text className="text-xl font-bold">{child.storiesCount}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">Contes</Text>
              </View>
              <View className="flex-1 items-center">
                <Text style={{ color: Brand.blue }} className="text-xl font-bold">
                  {child.royaltiesFcfa} FCFA
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">Royalties</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <AddChildModal visible={showAddChild} onClose={() => setShowAddChild(false)} />
    </ScrollView>
  );
}
