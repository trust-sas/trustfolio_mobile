import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { classById } from '@/data/teacher';
import { CreateAnthologyModal } from '@/components/screens/enseignant/CreateAnthologyModal';

const statusStyle: Record<'publie' | 'brouillon', { label: string; bg: string; color: string }> = {
  publie: { label: 'Publié', bg: '#DCFCE7', color: '#15803D' },
  brouillon: { label: 'Brouillon', bg: '#F3F4F6', color: '#4B5563' },
};

export function TeacherAnthologies() {
  const { anthologies } = useApp();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Anthologies</Text>
        <TouchableOpacity onPress={() => setShowCreate(true)}>
          <Text style={{ color: Brand.blue }} className="font-semibold">
            + Créer
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {anthologies.map((anthology) => {
          const status = statusStyle[anthology.status];
          const classNames = anthology.classIds.map((id) => classById(id)?.name).filter(Boolean).join(', ');
          return (
            <View key={anthology.id} className="border border-gray-200 rounded-2xl p-4">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="font-bold text-base flex-1 pr-2">{anthology.title}</Text>
                <View style={{ backgroundColor: status.bg }} className="rounded-full px-2 py-0.5">
                  <Text style={{ color: status.color }} className="text-xs font-semibold">
                    {status.label}
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500 mb-3">
                {classNames || 'Aucune classe'} · {anthology.storyIds.length} conte{anthology.storyIds.length > 1 ? 's' : ''}
              </Text>

              <View className="flex-row gap-2">
                <TouchableOpacity style={{ borderColor: Brand.blue }} className="flex-1 items-center rounded-xl py-2 border">
                  <Text style={{ color: Brand.blue }} className="text-sm font-semibold">
                    Aperçu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: Brand.blue }} className="flex-1 items-center rounded-xl py-2">
                  <Text className="text-white text-sm font-semibold">Commander</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <CreateAnthologyModal visible={showCreate} onClose={() => setShowCreate(false)} />
    </ScrollView>
  );
}
