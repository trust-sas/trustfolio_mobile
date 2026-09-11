import { router } from 'expo-router';
import { AlertTriangle, Upload } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { FamilyStoryStatus } from '@/data/family';

const statusStyle: Record<FamilyStoryStatus, { label: string; bg: string; color: string }> = {
  publie: { label: 'Publié', bg: '#DCFCE7', color: '#15803D' },
  en_traitement: { label: 'En traitement', bg: '#DBEAFE', color: '#1D4ED8' },
  a_verifier: { label: 'À vérifier', bg: '#FFEDD5', color: '#C2410C' },
};

export function ParentStories() {
  const { familyStories, familyChildren } = useApp();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Mes contes</Text>
        <TouchableOpacity
          onPress={() => router.push('/parent-upload' as never)}
          style={{ backgroundColor: Brand.blue }}
          className="flex-row items-center gap-2 rounded-xl px-3 py-2"
        >
          <Upload size={16} color="#ffffff" />
          <Text className="text-white text-sm font-semibold">Charger</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {familyStories.map((story) => {
          const status = statusStyle[story.status];
          const child = familyChildren.find((c) => c.id === story.childId);
          return (
            <View key={story.id} className="border border-gray-200 rounded-2xl p-4">
              <Text className="font-semibold">{story.title}</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                {child?.firstName} · {story.date}
              </Text>
              <View className="flex-row gap-2 mt-2">
                <View style={{ backgroundColor: '#F3F4F6' }} className="rounded-full px-2 py-0.5">
                  <Text className="text-xs text-gray-600">{story.category}</Text>
                </View>
                <View style={{ backgroundColor: status.bg }} className="rounded-full px-2 py-0.5">
                  <Text style={{ color: status.color }} className="text-xs font-semibold">
                    {status.label}
                  </Text>
                </View>
              </View>
              {story.status === 'a_verifier' && (
                <View style={{ backgroundColor: '#FEF3C7' }} className="flex-row items-center gap-2 rounded-xl p-3 mt-3">
                  <AlertTriangle size={16} color="#B45309" />
                  <Text style={{ color: '#B45309' }} className="text-xs flex-1">
                    Action requise : vérifier le texte extrait
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
