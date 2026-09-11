import { router } from 'expo-router';
import { ChevronRight, Repeat } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { focalReferralFcfa, pipelineStages, pointFocalName, stageLabel } from '@/data/pointFocal';

export function PointFocalSchools() {
  const { schools } = useApp();
  const [stageFilter, setStageFilter] = useState<string>('tous');

  const partnersCount = schools.filter((s) => s.stage === 'partenaire' || s.stage === 'deploye').length;
  const totalRistournes = schools.reduce((sum, s) => sum + s.subscriptions * focalReferralFcfa, 0);

  const filteredSchools = stageFilter === 'tous' ? schools : schools.filter((s) => s.stage === stageFilter);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text className="text-sm text-gray-500 mb-1">Espace Point Focal</Text>
      <Text className="text-2xl font-bold mb-4">{pointFocalName} — Pipeline écoles</Text>

      <View className="flex-row gap-3 mb-4">
        {[
          { label: 'Écoles', value: String(schools.length) },
          { label: 'Partenaires', value: String(partnersCount) },
          { label: 'Ristournes (FCFA)', value: String(totalRistournes) },
        ].map((stat) => (
          <View key={stat.label} className="flex-1 items-center border border-gray-200 rounded-2xl p-3">
            <Text className="text-xl font-bold">{stat.value}</Text>
            <Text className="text-xs text-gray-500 text-center mt-1">{stat.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4" contentContainerStyle={{ gap: 8 }}>
        <TouchableOpacity
          onPress={() => setStageFilter('tous')}
          style={{
            borderWidth: 1.5,
            borderColor: stageFilter === 'tous' ? Brand.blue : '#E5E7EB',
            backgroundColor: stageFilter === 'tous' ? '#EFF6FF' : '#FFFFFF',
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '600', color: stageFilter === 'tous' ? Brand.blue : '#374151' }}>
            Tous ({schools.length})
          </Text>
        </TouchableOpacity>
        {pipelineStages.map((stage) => {
          const count = schools.filter((s) => s.stage === stage.id).length;
          const active = stageFilter === stage.id;
          return (
            <TouchableOpacity
              key={stage.id}
              onPress={() => setStageFilter(stage.id)}
              style={{
                borderWidth: 1.5,
                borderColor: active ? Brand.blue : '#E5E7EB',
                backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '600', color: active ? Brand.blue : '#374151' }}>
                {stage.label} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View className="gap-3">
        {filteredSchools.map((school) => (
          <TouchableOpacity
            key={school.id}
            onPress={() => router.push(`/school/${school.id}` as never)}
            className="border border-gray-200 rounded-2xl p-4"
          >
            <View className="flex-row items-center justify-between mb-1">
              <Text className="font-bold text-base flex-1 pr-2">{school.name}</Text>
              <View style={{ backgroundColor: '#EFF6FF' }} className="rounded-full px-2 py-0.5">
                <Text style={{ color: Brand.blue }} className="text-xs font-semibold">
                  {stageLabel(school.stage)}
                </Text>
              </View>
            </View>
            <Text className="text-xs text-gray-500 mb-1">
              {school.city} · {school.contactName}
            </Text>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-xs text-gray-500">Dernier contact : {school.lastContactDate}</Text>
              <View className="flex-row items-center gap-1">
                <Text style={{ color: Brand.blue }} className="text-xs font-semibold">
                  {school.subscriptions * focalReferralFcfa} FCFA · {school.subscriptions} abo.
                </Text>
                <ChevronRight size={16} color="#9CA3AF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.push('/change-space' as never)}
        className="flex-row items-center justify-between border border-gray-200 rounded-2xl p-4 mt-6"
      >
        <View className="flex-row items-center gap-3">
          <Repeat size={18} color={Brand.blue} />
          <Text className="font-semibold">Changer d'espace</Text>
        </View>
        <ChevronRight size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </ScrollView>
  );
}
